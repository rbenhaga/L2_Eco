import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { titleSimilarity } from '../utils.ts';
import { consecutiveTokenOverlap, detectLanguage, hasProviderResidue, ngramOverlapRatio, splitSentences } from './helpers.ts';
import type { DayEditorialPacket, DraftEvidence, NormalizedArticle, PublicationGateMetrics, QualityIssue, QualityReport, TopicCluster, V3Draft } from './types.ts';

type ParagraphEntry = {
  id: string;
  text: string;
  section: string;
};

type TextPart = {
  text: string;
};

type PartsContainer = {
  parts: TextPart[];
};

function partsToText(container: PartsContainer) {
  return container.parts.map((part) => part.text).join(' ');
}

function collectParagraphEntries(payload: V3Draft['payload']) {
  const entries: ParagraphEntry[] = [];

  payload.intro.paragraphs.forEach((paragraph, index) => {
    entries.push({ id: `intro-${index}`, text: partsToText(paragraph), section: 'intro' });
  });

  payload.opening_brief.items.forEach((item, index) => {
    entries.push({ id: `opening-${index}`, text: partsToText(item), section: 'opening' });
  });

  payload.lead_story.paragraphs.forEach((paragraph, index) => {
    entries.push({ id: `lead-${index}`, text: partsToText(paragraph), section: 'lead' });
  });

  payload.markets_section.paragraphs.forEach((paragraph, index) => {
    entries.push({ id: `markets-${index}`, text: partsToText(paragraph), section: 'markets' });
  });

  payload.radar_section.items.forEach((item, itemIndex) => {
    item.paragraphs.forEach((paragraph, paragraphIndex) => {
      entries.push({ id: `radar-${itemIndex}-${paragraphIndex}`, text: partsToText(paragraph), section: 'radar' });
    });
  });

  payload.carnet_section.items.forEach((item, itemIndex) => {
    item.paragraphs.forEach((paragraph, paragraphIndex) => {
      entries.push({ id: `carnet-${itemIndex}-${paragraphIndex}`, text: partsToText(paragraph), section: 'carnet' });
    });
  });

  payload.briefs_section.items.forEach((item, index) => {
    entries.push({ id: `brief-${index}`, text: partsToText(item), section: 'briefs' });
  });

  return entries;
}

function sectionHasEnglishResidue(sectionTitle: string) {
  const normalized = String(sectionTitle || '').trim().toLowerCase();
  if (!normalized) return false;
  if (detectLanguage(sectionTitle) !== 'en') return false;
  return /\b(opening|markets|market|briefs|story|live|update|watch|lead|insight|outlook)\b/.test(normalized);
}

const bannedCopyPatterns = [
  { pattern: /Le num\u00e9ro part d\u2019un fait simple/i, label: 'Le num\u00e9ro part d\u2019un fait simple' },
  { pattern: /Autour du lead/i, label: 'Autour du lead' },
  { pattern: /Autour du choc/i, label: 'Autour du choc' },
  { pattern: /Le dernier tour/i, label: 'Le dernier tour' },
  { pattern: /Il ne porte pas le num\u00e9ro/i, label: 'Il ne porte pas le num\u00e9ro' },
];

function findBannedCopyResidues(text: string) {
  return bannedCopyPatterns.filter(({ pattern }) => pattern.test(text)).map(({ label }) => label);
}

function sourceWindows(article: NormalizedArticle) {
  return [article.cleanTitle, article.cleanSnippet, article.cleanBody].filter(Boolean);
}

function computeOriginalityIssues(paragraphId: string, text: string, articles: NormalizedArticle[]) {
  const issues: QualityIssue[] = [];
  const sentences = splitSentences(text);

  for (const sentence of sentences) {
    for (const article of articles) {
      if (titleSimilarity(sentence, article.cleanTitle) >= OIKO_V3_POLICY.originality.maxSentenceTitleSimilarity) {
        issues.push({
          code: 'title_reuse',
          message: `La phrase « ${sentence} » reste trop proche d’un titre source.`,
          severity: 'high',
          target: paragraphId,
        });
        break;
      }

      for (const window of sourceWindows(article)) {
        if (consecutiveTokenOverlap(sentence, window) >= OIKO_V3_POLICY.originality.exactConsecutiveTokenOverlap) {
          issues.push({
            code: 'verbatim_overlap',
            message: `La phrase « ${sentence} » ressemble trop à un texte source.`,
            severity: 'high',
            target: paragraphId,
          });
          break;
        }
        if (ngramOverlapRatio(sentence, window) >= OIKO_V3_POLICY.originality.maxParagraphOverlapRatio) {
          issues.push({
            code: 'snippet_paraphrase',
            message: `Le paragraphe ${paragraphId} reformule trop linéairement une source.`,
            severity: 'medium',
            target: paragraphId,
          });
          break;
        }
      }
    }
  }

  return issues;
}

function computeMonoArticleIssue(
  section: string,
  paragraphIds: string[],
  evidence: DraftEvidence,
  entriesById: Map<string, { text: string }>,
  normalizedArticles: NormalizedArticle[],
) {
  if (paragraphIds.length < 2) {
    return { issue: null, ratio: 0 };
  }

  const weights = new Map<string, number>();
  paragraphIds.forEach((paragraphId) => {
    const reference = evidence.paragraphEvidenceMap[paragraphId];
    const articleIds = Array.from(new Set(reference?.articleIds || [])).filter(Boolean);
    if (!articleIds.length) return;
    const weight = 1 / articleIds.length;
    articleIds.forEach((articleId) => {
      weights.set(articleId, (weights.get(articleId) || 0) + weight);
    });
  });

  const dominantEntry = Array.from(weights.entries()).sort((left, right) => right[1] - left[1])[0];
  const maxWeight = dominantEntry?.[1] || 0;
  const ratio = paragraphIds.length ? maxWeight / paragraphIds.length : 0;
  if (ratio < OIKO_V3_POLICY.originality.maxMonoArticleSectionRatio || !dominantEntry?.[0]) {
    return { issue: null, ratio: 0 };
  }

  const dominantArticle = normalizedArticles.find((article) => article.id === dominantEntry[0]);
  if (!dominantArticle) {
    return { issue: null, ratio: 0 };
  }

  const sectionText = paragraphIds.map((paragraphId) => entriesById.get(paragraphId)?.text || '').join(' ');
  const maxOverlap = Math.max(0, ...sourceWindows(dominantArticle).map((window) => ngramOverlapRatio(sectionText, window)));
  if (maxOverlap < OIKO_V3_POLICY.originality.maxParagraphOverlapRatio) {
    return { issue: null, ratio: 0 };
  }

  return {
    issue: {
      code: 'mono_article_section',
      message: `La section ${section} dépend trop d’un seul article source.`,
      severity: 'high' as const,
      target: section,
    },
    ratio,
  };
}

function getRequiredFreshnessThreshold(packet: DayEditorialPacket) {
  if (packet.materialTier === 'premium') return OIKO_V3_POLICY.freshness;
  if (packet.materialTier === 'short') return OIKO_V3_POLICY.freshness.shortEdition;
  return null;
}

function buildPublicationReason(packet: DayEditorialPacket, metrics: PublicationGateMetrics) {
  if (packet.materialTier === 'blocked') {
    return {
      code: 'insufficient_fresh_material',
      status: 'blocked_insufficient_fresh_material' as const,
      reason: `Publication bloquée : seulement ${packet.freshEventCount} sujet(s) frais et ${packet.distinctClusterCount} cluster(s) distinct(s), ce qui reste insuffisant même pour une édition courte.`,
    };
  }

  if (!metrics.french_only) {
    return {
      code: 'language_gate_failed',
      status: 'failed_quality' as const,
      reason: `Publication bloquée : le draft contient encore ${metrics.english_sentence_count} phrase(s) non françaises ou ${metrics.mixed_language_sentence_count} phrase(s) mixtes.`,
    };
  }

  if (!metrics.originality_gate) {
    return {
      code: 'originality_gate_failed',
      status: 'failed_quality' as const,
      reason: 'Publication bloquée : le texte reste trop proche d’une ou plusieurs sources et ne passe pas le gate d’originalité.',
    };
  }

  if (!metrics.traceability_gate) {
    return {
      code: 'traceability_gate_failed',
      status: 'failed_quality' as const,
      reason: 'Publication bloquée : certaines phrases ou certains paragraphes ne sont pas suffisamment supportés par les facts extraits.',
    };
  }

  if (!metrics.freshness_gate) {
    return {
      code: 'freshness_gate_failed',
      status: 'insufficient_material_review' as const,
      reason: packet.materialTier === 'short'
        ? 'Publication bloquée : même en édition courte, la matière retenue reste trop contextuelle ou le lead n’est pas assez frais.'
        : 'Publication bloquée : la matière retenue reste trop contextuelle ou insuffisamment fraîche pour ouvrir une édition premium.',
    };
  }

  if (!metrics.duplication_gate) {
    return {
      code: 'duplication_gate_failed',
      status: 'failed_quality' as const,
      reason: 'Publication bloquée : plusieurs sections se recouvrent trop ou réutilisent les mêmes clusters.',
    };
  }

  if (metrics.high_quality_source_count < OIKO_V3_POLICY.publication.requireHighQualitySources) {
    return {
      code: 'source_quality_failed',
      status: 'insufficient_material_review' as const,
      reason: `Publication bloquée : seulement ${metrics.high_quality_source_count} source(s) de qualité élevée ont été retenues, ce qui reste trop faible pour publication.`,
    };
  }

  if (metrics.brokenAssetCount > 0) {
    return {
      code: 'asset_quality_failed',
      status: 'failed_quality' as const,
      reason: `Publication bloquée : ${metrics.brokenAssetCount} asset(s) référencé(s) sont cassés ou incomplets.`,
    };
  }

  if (packet.materialTier === 'short') {
    return {
      code: 'short_edition_quality_passed',
      status: 'ready' as const,
      reason: 'Édition courte V3 validée par les gates qualité.',
    };
  }

  return {
    code: 'quality_passed',
    status: 'ready' as const,
    reason: 'Draft V3 validé par les gates qualité.',
  };
}

export function critiqueEditionDraft(
  draft: V3Draft,
  packet: DayEditorialPacket,
  clusters: TopicCluster[],
  normalizedArticles: NormalizedArticle[],
  assetMetrics: Partial<PublicationGateMetrics> = {},
): QualityReport {
  const issues: QualityIssue[] = [];
  const entries = collectParagraphEntries(draft.payload);
  const entriesById = new Map(entries.map((entry) => [entry.id, entry]));
  const clusterById = new Map(clusters.map((cluster) => [cluster.id, cluster]));
  const englishSentenceIds: string[] = [];
  const mixedSentenceIds: string[] = [];
  let supportedSentences = 0;
  let totalSentences = 0;
  let providerResidueCount = 0;
  let copyResidueCount = 0;
  let duplicationRatio = 0;
  const sectionParagraphs = new Map<string, string[]>();

  const sectionTitles = [
    draft.payload.opening_brief.title,
    draft.payload.markets_section.title,
    draft.payload.radar_section.title,
    draft.payload.carnet_section.title,
    draft.payload.briefs_section.title,
    draft.payload.lead_story.title,
  ];

  if (sectionTitles.some(sectionHasEnglishResidue)) {
    issues.push({ code: 'english_section_title', message: 'Un titre de section contient encore de l’anglais résiduel.', severity: 'high' });
  }

  for (const entry of entries) {
    const sentences = splitSentences(entry.text);
    totalSentences += Math.max(1, sentences.length);
    sectionParagraphs.set(entry.section, [...(sectionParagraphs.get(entry.section) || []), entry.id]);

    if (hasProviderResidue(entry.text)) {
      providerResidueCount += 1;
      issues.push({
        code: 'provider_residue',
        message: `Le paragraphe ${entry.id} contient encore un résidu provider.`,
        severity: 'high',
        target: entry.id,
      });
    }

    const bannedResidues = findBannedCopyResidues(entry.text);
    if (bannedResidues.length) {
      copyResidueCount += bannedResidues.length;
      bannedResidues.forEach((label) => {
        issues.push({
          code: 'banned_copy_residue',
          message: `Le paragraphe ${entry.id} r?introduit une tournure bannie (? ${label} ?).`,
          severity: 'high',
          target: entry.id,
        });
      });
    }

    const paragraphEvidence = draft.evidence.paragraphEvidenceMap[entry.id];
    if (!paragraphEvidence || (!paragraphEvidence.factIds?.length && !paragraphEvidence.marketKeys?.length)) {
      issues.push({
        code: 'missing_paragraph_evidence',
        message: `Le paragraphe ${entry.id} n’a pas de support explicite.`,
        severity: 'high',
        target: entry.id,
      });
    }

    sentences.forEach((sentence, index) => {
      const sentenceId = `${entry.id}:s${index + 1}`;
      const sentenceEvidence = draft.evidence.sentenceEvidenceMap[sentenceId];
      const language = detectLanguage(sentence);
      if (language === 'en') englishSentenceIds.push(sentenceId);
      if (language === 'other' && /[A-Za-z]{3,}/.test(sentence) && /[àâçéèêëîïôùûüÿœ]/i.test(sentence)) {
        mixedSentenceIds.push(sentenceId);
      }
      if (sentenceEvidence && ((sentenceEvidence.factIds?.length || 0) > 0 || (sentenceEvidence.marketKeys?.length || 0) > 0)) {
        supportedSentences += 1;
      } else {
        issues.push({
          code: 'missing_sentence_evidence',
          message: `La phrase ${sentenceId} n’a pas de support explicite.`,
          severity: 'high',
          target: sentenceId,
        });
      }
    });

    issues.push(...computeOriginalityIssues(entry.id, entry.text, normalizedArticles));
  }

  sectionParagraphs.forEach((paragraphIds, section) => {
    const { issue, ratio } = computeMonoArticleIssue(section, paragraphIds, draft.evidence, entriesById, normalizedArticles);
    duplicationRatio = Math.max(duplicationRatio, issue ? ratio : 0);
    if (issue) issues.push(issue);
  });

  const leadClusterFresh = Boolean(packet.leadTopic?.freshness?.qualifiesForLead);
  const freshSentenceCount = Object.entries(draft.evidence.sentenceEvidenceMap).filter(([, ref]) => {
    const clusterIds = ref.clusterIds || [];
    return clusterIds.some((clusterId) => {
      const cluster = clusterById.get(clusterId);
      return cluster?.freshness.clusterRecencyType === 'fresh_event' || cluster?.freshness.clusterRecencyType === 'fresh_update';
    }) || Boolean(ref.marketKeys?.length);
  }).length;

  const freshnessThreshold = getRequiredFreshnessThreshold(packet);
  const metrics: PublicationGateMetrics = {
    french_only: englishSentenceIds.length === 0 && mixedSentenceIds.length === 0 && providerResidueCount === 0,
    originality_gate: !issues.some((issue) => ['title_reuse', 'verbatim_overlap', 'snippet_paraphrase', 'mono_article_section'].includes(issue.code)),
    traceability_gate: supportedSentences === totalSentences && !issues.some((issue) => issue.code.startsWith('missing_')),
    freshness_gate: Boolean(freshnessThreshold)
      && packet.freshEventCount >= freshnessThreshold.minimumFreshEventCount
      && packet.distinctClusterCount >= freshnessThreshold.minimumDistinctClusterCount
      && (freshSentenceCount / Math.max(1, totalSentences)) >= freshnessThreshold.minimumFreshSentenceShare
      && leadClusterFresh,
    duplication_gate: duplicationRatio < OIKO_V3_POLICY.originality.maxMonoArticleSectionRatio,
    lead_cluster_fresh: leadClusterFresh,
    distinct_cluster_count: packet.distinctClusterCount,
    supported_sentence_ratio: Number((supportedSentences / Math.max(1, totalSentences)).toFixed(3)),
    forbidden_residue_count: providerResidueCount + englishSentenceIds.length + mixedSentenceIds.length + copyResidueCount,
    fresh_event_count: packet.freshEventCount,
    high_quality_source_count: packet.sourceCoverage.highQualitySources,
    english_sentence_count: englishSentenceIds.length,
    mixed_language_sentence_count: mixedSentenceIds.length,
    provider_residue_count: providerResidueCount,
    duplication_ratio: Number(duplicationRatio.toFixed(3)),
    language_quality_score: Number((1 - ((englishSentenceIds.length + mixedSentenceIds.length + providerResidueCount) / Math.max(1, totalSentences))).toFixed(3)),
    assetCoverage: Number(assetMetrics.assetCoverage || 0),
    missingAssets: assetMetrics.missingAssets || [],
    brokenAssetCount: Number(assetMetrics.brokenAssetCount || 0),
  };

  const decision = buildPublicationReason(packet, metrics);

  return {
    stage: 'critic',
    status: issues.some((issue) => issue.severity === 'high') ? 'failed' : 'passed',
    summaryText: decision.reason,
    metrics,
    issues,
    publicationStatus: decision.status,
    publicationReason: decision.reason,
    publicationReasonCode: decision.code,
    visibility: 'internal',
  };
}

export default {
  critiqueEditionDraft,
};
