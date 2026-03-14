import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { extractJsonCandidate, generateWithConfiguredProviders, repairJsonWithFastModelDetailed } from './llm.ts';
import { computeReadableQuality, detectLanguage, splitSentences, uniqueStrings } from './helpers.ts';
import type { ArticleRecencyType, ExtractedFactSheet, FactRecord, FactSheetExtractionResult, FactSheetRecord, LlmStageTrace, NormalizedArticle, StructuredMarketContext, TemporalFactSheet } from './types.ts';

function extractEntities(title: string) {
  const matches = String(title || '').match(/\b[A-Z][A-Za-z\u00c0-\u017f'.-]{2,}\b/g) || [];
  return uniqueStrings(matches).slice(0, 8);
}

function extractNumbers(text: string) {
  const matches = String(text || '').match(/\b\d+(?:[.,]\d+)?\s?(?:%|points?|bps|milliards?|millions?|bn|trillions?|€|\$|dollars?|euros?)?/gi) || [];
  return matches.slice(0, 8).map((value, index) => ({
    label: `chiffre_${index + 1}`,
    value: value.trim(),
  }));
}

function buildEvidenceText(article: NormalizedArticle) {
  const bodyQuality = computeReadableQuality(article.cleanBody);
  if (bodyQuality.looksReadable) {
    return bodyQuality.paragraphs.join(' ');
  }
  return article.cleanSnippet || article.cleanTitle;
}

function hasSignal(text: string, patterns: string[]) {
  return patterns.some((pattern) => text.includes(pattern));
}

function inferRecencyType(article: NormalizedArticle, usageDate: string): ArticleRecencyType {
  const title = article.cleanTitle.toLowerCase();
  const text = `${article.cleanTitle} ${article.cleanSnippet} ${article.cleanBody}`.toLowerCase();
  const lowDepth = article.contentDepth === 'title_only' || article.contentDepth === 'title_snippet';
  const strongAnalyticalTitle = /(here.?s why|more pain ahead|what does it imply|what it means|1970s-like|reminds analysts|analysis|explainer|outlook)/i.test(title);
  const directEventTitle = /(surge|surges|spike|spikes|jump|jumps|drop|drops|fall|falls|slide|slides|sheds|threatens|withdraw|appoints|approves|holds rates|names|named|halts|freeze|rally|sell-off|sell off)/i.test(title);
  const stale = hasSignal(text, OIKO_V3_POLICY.facts.staleSignalPatterns);
  const background = hasSignal(text, OIKO_V3_POLICY.facts.backgroundSignalPatterns);
  const freshSignal = hasSignal(text, OIKO_V3_POLICY.facts.freshSignalPatterns);
  const updateSignal = hasSignal(text, OIKO_V3_POLICY.facts.updateSignalPatterns);
  const publishedAt = new Date(article.publishedAt).getTime();
  const editionEnd = new Date(`${usageDate}T23:59:59.999Z`).getTime();
  const ageHours = Number.isFinite(publishedAt) ? Math.max(0, (editionEnd - publishedAt) / (1000 * 60 * 60)) : 999;
  const official = article.sourceProfile.sourceTier === 'official';

  if (stale || (strongAnalyticalTitle && !directEventTitle)) {
    return ageHours <= 30 && official ? 'background' : 'old_news_recap';
  }

  if (lowDepth && strongAnalyticalTitle) {
    return 'background';
  }

  if ((freshSignal || directEventTitle) && ageHours <= 36 && !(strongAnalyticalTitle && !official)) {
    return lowDepth && !official ? 'new_update' : 'new_event';
  }

  if ((updateSignal || official) && ageHours <= 36) {
    return lowDepth && !official ? 'background' : 'new_update';
  }

  if (background || lowDepth) {
    return ageHours <= 36 ? 'background' : 'old_news_recap';
  }

  return ageHours <= 36 ? 'new_update' : 'old_news_recap';
}

function recencyScore(recencyType: ArticleRecencyType) {
  switch (recencyType) {
    case 'new_event':
      return 0.92;
    case 'new_update':
      return 0.78;
    case 'background':
      return 0.35;
    default:
      return 0.1;
  }
}

function fallbackFactSheet(article: NormalizedArticle, usageDate: string): FactSheetRecord {
  const evidenceText = buildEvidenceText(article);
  const facts = uniqueStrings(
    splitSentences(evidenceText)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length >= 30),
  ).slice(0, OIKO_V3_POLICY.facts.maximumFactsPerArticle);
  const normalizedFacts = facts.length >= OIKO_V3_POLICY.facts.minimumFactsPerArticle
    ? facts
    : uniqueStrings([article.cleanSnippet, article.cleanTitle].filter(Boolean)).slice(0, OIKO_V3_POLICY.facts.minimumFactsPerArticle);

  const factRecords: FactRecord[] = normalizedFacts.map((statement, index) => ({
    factId: `${article.id}:fact:${index + 1}`,
    articleId: article.id,
    statement,
  }));
  const recencyType = inferRecencyType(article, usageDate);
  const temporal: TemporalFactSheet = {
    articleId: article.id,
    publishedAt: article.publishedAt,
    primaryEventTimeStart: article.publishedAt,
    primaryEventTimeEnd: article.publishedAt,
    recencyType,
    freshnessScore: recencyScore(recencyType),
    temporalJustification: recencyType === 'old_news_recap'
      ? 'Le texte ressemble davantage à une reprise ou à une analyse de fond qu’à un fait nouveau.'
      : recencyType === 'background'
        ? 'Le texte apporte surtout un contexte utile, mais pas un fait dominant suffisamment neuf.'
        : 'Le texte contient des indices explicites de nouveauté ou de mise à jour dans la fenêtre du jour.',
  };
  const factSheet: ExtractedFactSheet = {
    articleId: article.id,
    mainEvent: article.cleanTitle,
    geography: uniqueStrings((article.cleanTitle.match(/\b(?:Europe|Etats-Unis|United States|Japan|Japon|China|Chine|Asia|Asie|Euro area|zone euro|India|Inde)\b/gi) || []).map((value) => value.trim())),
    entities: extractEntities(article.cleanTitle),
    facts: normalizedFacts,
    numbers: extractNumbers(`${article.cleanTitle} ${article.cleanSnippet} ${article.cleanBody}`),
    timeline: [article.publishedAt],
    causes: [],
    consequences: [],
    uncertainties: [],
    economicAngle: article.topicFamily || 'institutions',
    confidence: article.contentDepth === 'full_body' ? 0.78 : article.contentDepth === 'partial_body' ? 0.62 : 0.4,
  };

  return {
    article,
    factSheet,
    temporal,
    factRecords,
  };
}

function buildExtractionPrompt(articles: NormalizedArticle[], marketContext: StructuredMarketContext) {
  return [
    {
      role: 'system',
      content: `Tu extrais des fiches factuelles neutres pour Oiko News.
Règles absolues :
1. Réponds uniquement en JSON valide.
2. Écris tous les champs textuels en français.
3. N'écris aucune phrase journalistique littéraire.
4. Chaque entrée doit contenir : articleId, mainEvent, geography[], entities[], facts[], numbers[], timeline[], causes[], consequences[], uncertainties[], economicAngle, confidence, temporal{primaryEventTimeStart, primaryEventTimeEnd, recencyType, freshnessScore, temporalJustification}.
5. recencyType doit valoir new_event, new_update, background ou old_news_recap.
6. Si le texte paraît surtout contextuel ou ancien, marque-le franchement.
7. N'invente ni chiffres ni causalités.
8. facts[] doit contenir au moins deux faits exploitables quand le matériau le permet.
9. mainEvent doit être un intitulé de sujet en français, pas un copier-coller du titre source.`,
    },
    {
      role: 'user',
      content: JSON.stringify({
        editionDate: articles[0]?.publishedAt?.slice(0, 10) || null,
        market_context: marketContext,
        articles: articles.map((article) => ({
          articleId: article.id,
          title: article.cleanTitle,
          snippet: article.cleanSnippet,
          body: article.cleanBody,
          sourceName: article.sourceName,
          sourceDomain: article.sourceDomain,
          publishedAt: article.publishedAt,
          contentDepth: article.contentDepth,
          topicFamily: article.topicFamily,
        })),
      }),
    },
  ];
}

function normalizeExtractionEntry(entry: any, article: NormalizedArticle, usageDate: string): FactSheetRecord {
  const fallback = fallbackFactSheet(article, usageDate);
  const facts = Array.isArray(entry?.facts)
    ? entry.facts.map((fact: any) => String(fact || '').trim()).filter(Boolean).slice(0, OIKO_V3_POLICY.facts.maximumFactsPerArticle)
    : [];
  const normalizedFacts = facts.length >= OIKO_V3_POLICY.facts.minimumFactsPerArticle ? facts : fallback.factSheet.facts;
  const factRecords: FactRecord[] = normalizedFacts.map((statement, index) => ({
    factId: `${article.id}:fact:${index + 1}`,
    articleId: article.id,
    statement,
  }));

  const entryRecency = String(entry?.temporal?.recencyType || '').trim() as ArticleRecencyType;
  const recencyType = ['new_event', 'new_update', 'background', 'old_news_recap'].includes(entryRecency)
    ? entryRecency
    : fallback.temporal.recencyType;

  return {
    article,
    factSheet: {
      articleId: article.id,
      mainEvent: String(entry?.mainEvent || fallback.factSheet.mainEvent).trim(),
      geography: Array.isArray(entry?.geography) ? entry.geography.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 6) : fallback.factSheet.geography,
      entities: Array.isArray(entry?.entities) ? entry.entities.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 8) : fallback.factSheet.entities,
      facts: normalizedFacts,
      numbers: Array.isArray(entry?.numbers)
        ? entry.numbers.map((value: any, index: number) => ({
            label: String(value?.label || `chiffre_${index + 1}`),
            value: String(value?.value || '').trim(),
            ...(value?.unit ? { unit: String(value.unit) } : {}),
          })).filter((item: any) => item.value)
        : fallback.factSheet.numbers,
      timeline: Array.isArray(entry?.timeline) && entry.timeline.length ? entry.timeline.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 5) : fallback.factSheet.timeline,
      causes: Array.isArray(entry?.causes) ? entry.causes.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : fallback.factSheet.causes,
      consequences: Array.isArray(entry?.consequences) ? entry.consequences.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : fallback.factSheet.consequences,
      uncertainties: Array.isArray(entry?.uncertainties) ? entry.uncertainties.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : fallback.factSheet.uncertainties,
      economicAngle: String(entry?.economicAngle || fallback.factSheet.economicAngle || '').trim(),
      confidence: Number(entry?.confidence ?? fallback.factSheet.confidence),
    },
    temporal: {
      articleId: article.id,
      publishedAt: article.publishedAt,
      primaryEventTimeStart: entry?.temporal?.primaryEventTimeStart || fallback.temporal.primaryEventTimeStart,
      primaryEventTimeEnd: entry?.temporal?.primaryEventTimeEnd || fallback.temporal.primaryEventTimeEnd,
      recencyType,
      freshnessScore: Number(entry?.temporal?.freshnessScore ?? fallback.temporal.freshnessScore),
      temporalJustification: String(entry?.temporal?.temporalJustification || fallback.temporal.temporalJustification).trim(),
    },
    factRecords,
  };
}

function needsFactSheetRewrite(record: FactSheetRecord) {
  const sample = [record.factSheet.mainEvent, ...record.factSheet.facts].join(' ');
  if (detectLanguage(sample) !== 'fr') return true;
  return record.factSheet.facts.some((fact) => fact.trim() === record.article.cleanTitle.trim());
}

function buildLocalizationPrompt(records: FactSheetRecord[]) {
  return [
    {
      role: 'system',
      content: `Tu réécris des fiches factuelles Oiko en français.
Règles absolues :
1. Réponds uniquement en JSON valide.
2. Garde exactement les mêmes articleId.
3. Reformule en français neutre et sobre.
4. N'utilise aucun titre brut ni snippet brut comme phrase finale.
5. N'invente aucun fait, aucun chiffre, aucune causalité.
6. facts doit rester factuel, court et exploitable éditorialement.
7. mainEvent doit devenir un intitulé de sujet en français, pas un copier-coller de titre de presse.`,
    },
    {
      role: 'user',
      content: JSON.stringify({
        articles: records.map((record) => ({
          articleId: record.article.id,
          sourceTitle: record.article.cleanTitle,
          sourceSnippet: record.article.cleanSnippet,
          current: {
            mainEvent: record.factSheet.mainEvent,
            facts: record.factSheet.facts,
            causes: record.factSheet.causes,
            consequences: record.factSheet.consequences,
            uncertainties: record.factSheet.uncertainties,
            economicAngle: record.factSheet.economicAngle,
          },
        })),
      }),
    },
  ];
}

function mergeLocalizedRecord(record: FactSheetRecord, localized: any): FactSheetRecord {
  const payload = localized?.current && typeof localized.current === 'object'
    ? localized.current
    : localized;

  const localizedFacts = Array.isArray(payload?.facts)
    ? payload.facts.map((fact: any) => String(fact || '').trim()).filter(Boolean).slice(0, OIKO_V3_POLICY.facts.maximumFactsPerArticle)
    : [];
  const localizedMainEvent = String(payload?.mainEvent || '').trim();
  const supplementalFacts = localizedMainEvent && !localizedFacts.includes(localizedMainEvent)
    ? [...localizedFacts, localizedMainEvent]
    : localizedFacts;
  const facts = supplementalFacts.length >= OIKO_V3_POLICY.facts.minimumFactsPerArticle
    ? supplementalFacts.slice(0, OIKO_V3_POLICY.facts.maximumFactsPerArticle)
    : localizedFacts.length
      ? supplementalFacts.concat(record.factSheet.facts.filter((fact) => detectLanguage(fact) === 'fr')).slice(0, OIKO_V3_POLICY.facts.maximumFactsPerArticle)
      : record.factSheet.facts;
  const factRecords: FactRecord[] = facts.map((statement, index) => ({
    factId: `${record.article.id}:fact:${index + 1}`,
    articleId: record.article.id,
    statement,
  }));

  return {
    ...record,
    factSheet: {
      ...record.factSheet,
      mainEvent: localizedMainEvent || record.factSheet.mainEvent,
      facts,
      causes: Array.isArray(payload?.causes) ? payload.causes.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : record.factSheet.causes,
      consequences: Array.isArray(payload?.consequences) ? payload.consequences.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : record.factSheet.consequences,
      uncertainties: Array.isArray(payload?.uncertainties) ? payload.uncertainties.map((value: any) => String(value || '').trim()).filter(Boolean).slice(0, 4) : record.factSheet.uncertainties,
      economicAngle: String(payload?.economicAngle || record.factSheet.economicAngle).trim() || record.factSheet.economicAngle,
    },
    factRecords,
  };
}

function buildStageTrace(
  stage: LlmStageTrace['stage'],
  result: {
    providerUsed: string | null;
    modelUsed: string | null;
    attempts: Array<{
      provider: string;
      model: string;
      label?: string;
      status: 'success' | 'failed';
      tokensUsed?: number;
      error?: string;
      timeoutMs?: number;
    }>;
  },
  options: {
    success: boolean;
    usedFallback: boolean;
    fallbackReason?: string | null;
    contentSource?: 'llm' | 'deterministic' | 'hybrid';
  },
): LlmStageTrace {
  return {
    stage,
    providerUsed: result.providerUsed,
    modelUsed: result.modelUsed,
    attempts: result.attempts.map((attempt) => ({
      provider: attempt.provider,
      model: attempt.model,
      ...(attempt.label ? { label: attempt.label } : {}),
      status: attempt.status,
      ...(typeof attempt.tokensUsed === 'number' ? { tokensUsed: attempt.tokensUsed } : {}),
      ...(attempt.error ? { error: attempt.error } : {}),
      ...(typeof attempt.timeoutMs === 'number' ? { timeoutMs: attempt.timeoutMs } : {}),
    })),
    success: options.success,
    usedFallback: options.usedFallback,
    ...(options.fallbackReason ? { fallbackReason: options.fallbackReason } : {}),
    ...(options.contentSource ? { contentSource: options.contentSource } : {}),
  };
}

async function localizeFactSheets(records: FactSheetRecord[], usageDate: string): Promise<FactSheetExtractionResult> {
  const needsRewrite = records.filter(needsFactSheetRewrite);
  if (!needsRewrite.length) return { records, llmStages: [] };

  const llmStages: LlmStageTrace[] = [];
  const generated = await generateWithConfiguredProviders(buildLocalizationPrompt(needsRewrite), usageDate, { maxTokens: 5600, temperature: 0.05 });
  let parsed = extractJsonCandidate(generated.content);
  let repairUsed = false;

  if (!parsed && generated.content) {
    const repaired = await repairJsonWithFastModelDetailed(generated.content, usageDate);
    parsed = repaired.parsed;
    repairUsed = Boolean(repaired.parsed);
    llmStages.push(buildStageTrace('facts_localize_repair', repaired, {
      success: Boolean(repaired.parsed),
      usedFallback: !repaired.parsed,
      fallbackReason: repaired.parsed ? null : 'repair_failed',
      contentSource: repaired.parsed ? 'hybrid' : 'deterministic',
    }));
  }

  const entries = Array.isArray((parsed as any)?.articles) ? (parsed as any).articles : Array.isArray(parsed) ? parsed : [];
  llmStages.unshift(buildStageTrace('facts_localize', generated, {
    success: entries.length > 0,
    usedFallback: entries.length === 0,
    fallbackReason: entries.length ? (repairUsed ? 'repaired_json_candidate' : null) : generated.content ? 'invalid_json_candidate' : 'empty_llm_response',
    contentSource: entries.length ? (repairUsed ? 'hybrid' : 'llm') : 'deterministic',
  }));

  if (!entries.length) return { records, llmStages };

  return {
    records: records.map((record) => {
      const localized = entries.find((entry: any) => String(entry?.articleId || '') === record.article.id);
      return localized ? mergeLocalizedRecord(record, localized) : record;
    }),
    llmStages,
  };
}

export async function extractFactSheets(normalizedArticles: NormalizedArticle[], marketContext: StructuredMarketContext, usageDate: string): Promise<FactSheetExtractionResult> {
  if (!normalizedArticles.length) return { records: [], llmStages: [] };

  const llmStages: LlmStageTrace[] = [];
  const messages = buildExtractionPrompt(normalizedArticles, marketContext);
  const generated = await generateWithConfiguredProviders(messages, usageDate, { maxTokens: 6800, temperature: 0.1 });
  let parsed = extractJsonCandidate(generated.content);
  let repairUsed = false;

  if (!parsed && generated.content) {
    const repaired = await repairJsonWithFastModelDetailed(generated.content, usageDate);
    parsed = repaired.parsed;
    repairUsed = Boolean(repaired.parsed);
    llmStages.push(buildStageTrace('facts_extract_repair', repaired, {
      success: Boolean(repaired.parsed),
      usedFallback: !repaired.parsed,
      fallbackReason: repaired.parsed ? null : 'repair_failed',
      contentSource: repaired.parsed ? 'hybrid' : 'deterministic',
    }));
  }

  const entries = Array.isArray((parsed as any)?.articles) ? (parsed as any).articles : Array.isArray(parsed) ? parsed : [];
  const extractedRecords = normalizedArticles.map((article) => {
    const matching = entries.find((entry: any) => String(entry?.articleId || '') === article.id);
    return matching ? normalizeExtractionEntry(matching, article, usageDate) : fallbackFactSheet(article, usageDate);
  });
  const partialCoverage = entries.length > 0 && entries.length < normalizedArticles.length;

  llmStages.unshift(buildStageTrace('facts_extract', generated, {
    success: entries.length > 0,
    usedFallback: entries.length === 0 || partialCoverage,
    fallbackReason: entries.length === 0
      ? (generated.content ? 'invalid_json_candidate' : 'empty_llm_response')
      : partialCoverage
        ? 'partial_article_coverage'
        : repairUsed
          ? 'repaired_json_candidate'
          : null,
    contentSource: entries.length === 0 ? 'deterministic' : partialCoverage || repairUsed ? 'hybrid' : 'llm',
  }));

  const localized = await localizeFactSheets(extractedRecords, usageDate);
  return {
    records: localized.records,
    llmStages: [...llmStages, ...localized.llmStages],
  };
}
export default {
  extractFactSheets,
};
