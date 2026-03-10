import groqProvider from '../ai/providers/GroqProvider.js';
import geminiProvider from '../ai/providers/GeminiProvider.js';
import openRouterProvider from '../ai/providers/OpenRouterProvider.js';
import OIKO_CONFIG from './config.ts';
import { buildEvidencePacks } from './sources.ts';
import { getGroqTrackedServiceKey, trackOikoApiUsage } from './usage.ts';
import {
  GeneratedOikoEditionV21Schema,
  OikoEditionV21Schema,
  blockToPlainText,
  partsToPlainText,
  textToBlock,
  type RichTextBlock,
  type RichTextPart,
} from './content.ts';
import { normalizeTitle, titleSimilarity, trimText } from './utils.ts';

const providerRegistry = {
  groq: groqProvider,
  gemini: geminiProvider,
  openrouter: openRouterProvider,
};

const conceptHints: Record<string, string> = {
  inflation_rates: 'Banques centrales',
  jobs_consumption_growth: 'Croissance',
  trade_industry_energy: '\u00c9nergie et commerce',
  europe_euro_area: 'Europe',
  china_asia_fx: 'Chine et Asie',
  budget_debt_fiscal: 'Finances publiques',
  institutions: 'Institutions',
};

const introMetaPatterns = [
  /oiko news/i,
  /cette \u00e9dition/i,
  /newsletter/i,
  /lecture du matin/i,
  /produite automatiquement/i,
  /cadence/i,
  /rassemble ce matin/i,
  /format/i,
];

const placeholderTitlePattern = /(\u00e0 retenir\s+\d+|signal compl\u00e9mentaire\s+\d+|carnet\s+\d+|en compl\u00e9ment)/i;

export const OikoEditionSchema = OikoEditionV21Schema;

function inferKicker(topicFamily?: string) {
  if (!topicFamily) return 'Macro';
  return conceptHints[topicFamily] || 'Macro';
}

function storyKey(story: any) {
  return String(story?.url || normalizeTitle(story?.title || story?.snippet_raw || '')).trim();
}

function uniqStories(candidates: any[], maxCount: number, excluded = new Set<string>()) {
  const picked: any[] = [];
  const seen = new Set<string>(excluded);

  for (const story of candidates || []) {
    const key = storyKey(story);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    picked.push(story);
    if (picked.length >= maxCount) break;
  }

  return picked;
}

function buildAllowedLinks(context: any) {
  const allowed = new Map<string, { title: string; source: string }>();
  for (const pack of context.evidencePacks || []) {
    const candidates = [
      pack?.primary,
      ...(pack?.corroborations || []),
      pack?.officialSupport,
      pack?.official_support,
    ].filter(Boolean);

    for (const item of candidates) {
      if (!item?.url || allowed.has(item.url)) continue;
      allowed.set(item.url, {
        title: item.title,
        source: item.source_name || item.source_domain || 'Source',
      });
    }
  }
  return allowed;
}

function detectOpeningLabel(story: any) {
  const text = `${story?.title || ''} ${story?.snippet_raw || ''}`.toLowerCase();
  if (/(bce|ecb|banque centrale)/.test(text)) return 'BCE';
  if (/(fed|federal reserve)/.test(text)) return 'Fed';
  if (/(emploi|payroll|jobs|ch\u00f4mage|wages|salaires|\u00e9tats-unis|us )/.test(text)) return '\u00c9tats-Unis';
  if (/(p\u00e9trole|oil|\u00e9nergie|gas|gaz)/.test(text)) return '\u00c9nergie';
  if (/(tarif|tariff|commerce|trade|douane|washington)/.test(text)) return 'Commerce';
  if (/(chine|chinese|yuan|asia|asie|export)/.test(text)) return 'Chine';
  if (/(allemagne|berlin|industrie)/.test(text)) return 'Allemagne';
  if (/(zone euro|eurostat|euro area|eurozone)/.test(text)) return 'Zone euro';
  if (/(fmi|imf)/.test(text)) return 'FMI';
  if (/(ocde|oecd)/.test(text)) return 'OCDE';
  return trimText(String(story?.title || 'Signal').split(/[,:-]/)[0], 22);
}

function buildOpeningLine(story: any) {
  return trimText(story?.snippet_raw || story?.title || '', 220);
}

function buildVisualAltText(sectionKey: string, story?: any) {
  const text = `${story?.title || ''} ${story?.snippet_raw || ''}`.toLowerCase();

  if (sectionKey === 'header_visual') {
    return 'Salle de march\u00e9, presse \u00e9conomique et \u00e9crans au lever du jour';
  }
  if (/(bce|ecb|banque centrale europ\u00e9enne)/.test(text)) {
    return 'Si\u00e8ge de la Banque centrale europ\u00e9enne \u00e0 Francfort';
  }
  if (/(fed|federal reserve)/.test(text)) {
    return 'B\u00e2timent de la R\u00e9serve f\u00e9d\u00e9rale \u00e0 Washington';
  }
  if (/(p\u00e9trole|oil|\u00e9nergie|routes maritimes|shipping)/.test(text)) {
    return 'Navires-citernes et terminaux p\u00e9troliers sur une route maritime';
  }
  if (/(emploi|jobs|payroll|salaires|ch\u00f4mage)/.test(text)) {
    return 'Fa\u00e7ade d\u2019une institution \u00e9conomique am\u00e9ricaine \u00e0 Washington';
  }
  if (/(chine|asia|asie|export)/.test(text)) {
    return 'Port \u00e0 conteneurs en Asie et flux du commerce ext\u00e9rieur';
  }
  if (/(tarif|tariff|commerce|douane|washington)/.test(text)) {
    return 'Portiques douaniers et conteneurs dans une zone logistique';
  }
  if (/(allemagne|berlin|industrie|usine)/.test(text)) {
    return 'Site industriel europ\u00e9en et lignes de production';
  }
  if (sectionKey === 'radar_section') {
    return '\u00c9crans de march\u00e9 et fils d\u2019actualit\u00e9 macro\u00e9conomique';
  }
  if (sectionKey === 'carnet_section') {
    return 'Dossiers \u00e9conomiques et agenda d\u2019entreprise sur un bureau';
  }
  return 'Dossiers \u00e9conomiques et indicateurs macro\u00e9conomiques';
}

function buildPromptContext(context: any) {
  return {
    brand: 'Oiko News',
    edition_date: context.window.editionDate,
    date_label: context.window.editionDate,
    audience: '\u00c9tudiants de licence \u00e9conomie',
    evidence_coverage_score: context.evidenceCoverageScore,
    editorial_angle_hint: context.editorialAngle,
    allowed_links: Array.from(buildAllowedLinks(context).entries()).map(([url, item]) => ({ url, ...item })),
    market_context: {
      equities_open: context.marketSnapshot.equities_open,
      equities_note: context.marketSnapshot.equities_note,
      market_regime: context.marketSnapshot.market_regime,
      preferred_chart_keys: ['actions', 'crypto'],
      market_items: (context.marketSnapshot.items || []).map((item: any) => ({
        key: item.key,
        name: item.name,
        label: item.label,
        period: item.period,
        latest_value: item.latest_value,
        change_pct: item.change_pct,
        allowed_explanations: item.allowed_explanations,
      })),
    },
    top_stories: context.topStories.map((story: any, index: number) => ({
      rank: index + 1,
      title: story.title,
      source: story.source_name,
      source_domain: story.source_domain,
      url: story.url,
      published_at: story.published_at,
      summary_raw: story.snippet_raw,
      body_raw: trimText(story.body_raw || '', 2200),
      topic_family: story.topic_family,
      kicker_hint: inferKicker(story.topic_family),
      corroborations: (story.evidence_pack?.corroborations || []).map((item: any) => ({
        title: item.title,
        source: item.source_name,
        url: item.url,
        summary_raw: item.snippet_raw,
      })),
      official_support: story.evidence_pack?.official_support || story.evidence_pack?.officialSupport
        ? {
            title: story.evidence_pack?.official_support?.title || story.evidence_pack?.officialSupport?.title,
            source: story.evidence_pack?.official_support?.source_name || story.evidence_pack?.officialSupport?.source_name,
            url: story.evidence_pack?.official_support?.url || story.evidence_pack?.officialSupport?.url,
            summary_raw: story.evidence_pack?.official_support?.snippet_raw || story.evidence_pack?.officialSupport?.snippet_raw,
          }
        : null,
    })),
    briefs: context.briefs.map((story: any) => ({
      title: story.title,
      source: story.source_name,
      topic_family: story.topic_family,
      url: story.url,
      summary_raw: story.snippet_raw,
    })),
    output_schema: {
      content_version: 'v2.1',
      email_subject: 'string',
      preview_text: 'string',
      date_label: 'string',
      header_visual: { alt_text: 'string', geo_hint: 'string', entity_hint: 'string', image_style_hint: 'sobriety|documentary|business|innovation' },
      intro: {
        paragraphs: [{ parts: [{ text: 'string', href: 'optional url' }] }],
        signature: 'optional string',
      },
      opening_brief: {
        title: '\u00c0 l\u2019ouverture',
        items: [{ label: 'string', parts: [{ text: 'string' }] }],
      },
      markets_section: {
        title: 'Sur les march\u00e9s',
        charts: [
          { key: 'actions', title: 'Bourse', image_url: '', alt_text: 'string' },
          { key: 'crypto', title: 'Crypto', image_url: '', alt_text: 'string' },
        ],
        paragraphs: [
          { label: 'March\u00e9s', parts: [{ text: 'string', href: 'optional url' }] },
          { label: 'Valeur', parts: [{ text: 'string', href: 'optional url' }] },
          { label: 'Crypto', parts: [{ text: 'string', href: 'optional url' }] },
        ],
      },
      lead_story: {
        kicker: 'string',
        title: 'string',
        visual_hint: { alt_text: 'string', geo_hint: 'string', entity_hint: 'string', image_style_hint: 'documentary|business|innovation|sobriety' },
        paragraphs: [{ parts: [{ text: 'string', href: 'optional url' }] }],
        signature: 'optional string',
      },
      radar_section: {
        title: 'Le radar',
        visual_hint: { alt_text: 'string', geo_hint: 'string', entity_hint: 'string', image_style_hint: 'business|documentary|innovation|sobriety' },
        items: [{ title: 'string', paragraphs: [{ parts: [{ text: 'string', href: 'optional url' }] }] }],
      },
      carnet_section: {
        title: 'Le carnet',
        visual_hint: { alt_text: 'string', geo_hint: 'string', entity_hint: 'string', image_style_hint: 'innovation|business|documentary|sobriety' },
        items: [{ title: 'string', paragraphs: [{ parts: [{ text: 'string', href: 'optional url' }] }] }],
      },
      briefs_section: {
        title: 'En bref',
        items: [{ parts: [{ text: 'string', href: 'optional url' }] }],
      },
      footer_sources_note: { parts: [{ text: 'string', href: 'optional url' }] },
      footer_disclaimer: 'string',
    },
  };
}

function buildMessages(context: any) {
  const systemPrompt = `Tu es le redacteur en chef de Oiko News, une newsletter quotidienne d'economie mondiale au ton premium, dense et naturel.
Regles absolues :
1. Utilise uniquement les informations fournies.
2. N'invente aucun fait, aucun chiffre, aucune causalite.
3. Le texte doit ressembler a une vraie newsletter media, jamais a une fiche de cours.
4. Interdiction d'expliquer la newsletter elle-meme.
   Interdits :
   - "Oiko News rassemble..."
   - "Cette edition..."
   - "Notre newsletter..."
   - toute phrase meta sur le format, la cadence ou la production.
5. L'intro doit entrer directement dans la tension macro du jour en 2 paragraphes denses.
6. Les rubriques et leur ordre sont fixes :
   - A l'ouverture
   - Sur les marches
   - Le grand angle
   - Le radar
   - Le carnet
   - En bref
7. "A l'ouverture" n'est pas un sommaire scolaire :
   - 3 a 5 items courts
   - une vraie formulation editoriale
   - pas de resume tronque maladroit
8. "Sur les marches" contient exactement :
   - 2 charts : actions et crypto
   - 3 paragraphes : Marches, Valeur, Crypto
9. "Le grand angle" doit comporter 6 a 8 paragraphes reels, chacun avec une fonction informative distincte.
10. "Le radar" contient 2 a 4 items reels.
11. "Le carnet" contient 2 a 3 items reels.
12. "En bref" contient 2 a 5 lignes reelles.
13. Aucun placeholder, aucun titre vide, aucun padding artificiel.
14. Deduplique les sujets entre rubriques. Un sujet deja traite fortement ne doit pas revenir ailleurs sans angle distinct.
15. Interdiction d'utiliser de maniere mecanique des formules comme : "Bref", "Un peu de recul", "Resultat", "Dans les faits".
16. Les textes riches doivent etre renvoyes sous forme d'AST parts[] et jamais en HTML.
17. Les liens href ne peuvent pointer que vers les URL fournies dans allowed_links.
18. N'insere pas des liens partout : seulement quand ils sont naturels.
19. Les alt_text des visuels doivent decrire une scene ou un lieu, jamais recopier le titre de l'article.
20. Reponds exclusivement en JSON valide conforme au contrat V2.1.`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: JSON.stringify(buildPromptContext(context)) },
  ];
}

function extractJsonCandidate(rawText?: string | null) {
  if (!rawText) return null;
  const trimmed = rawText.trim();
  try {
    return JSON.parse(trimmed);
  } catch (_error) {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) {
      const slice = trimmed.slice(start, end + 1);
      try {
        return JSON.parse(slice);
      } catch (_innerError) {
        return null;
      }
    }
    return null;
  }
}

async function callConfiguredProvider(providerName: string, model: string, messages: Array<{ role: string; content: string }>, options: { maxTokens?: number; temperature?: number } = {}, usageDate?: string) {
  const provider = providerRegistry[providerName as keyof typeof providerRegistry] as any;
  if (!provider || !model) {
    throw new Error(`Unknown provider/model combination: ${providerName}/${model}`);
  }

  const trackedServiceKey = providerName === 'groq' ? getGroqTrackedServiceKey(model) : null;

  try {
    const result = await provider.generate({
      model,
      messages,
      maxTokens: options.maxTokens || 7200,
      temperature: options.temperature ?? 0.2,
    });

    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1, tokens: result.tokensUsed || 0 });
    }

    return result;
  } catch (error) {
    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1 });
    }
    throw error;
  }
}

async function repairJsonWithFastModel(rawText: string, usageDate?: string) {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  const repairMessages = [
    {
      role: 'system',
      content: 'Repare uniquement le JSON fourni. Reponds avec un JSON valide, sans ajouter ni supprimer de sens.',
    },
    {
      role: 'user',
      content: rawText,
    },
  ];

  try {
    const repaired = await callConfiguredProvider('groq', 'llama-3.1-8b-instant', repairMessages, { maxTokens: 4096, temperature: 0 }, usageDate);
    return extractJsonCandidate(repaired.content);
  } catch (_error) {
    return null;
  }
}

function collectHrefValues(value: any, hrefs: Set<string>) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach((item) => collectHrefValues(item, hrefs));
    return;
  }
  if (typeof value === 'object') {
    if (typeof value.href === 'string' && value.href) {
      hrefs.add(value.href);
    }
    Object.values(value).forEach((item) => collectHrefValues(item, hrefs));
  }
}

function hasForbiddenIntroMeta(text: string) {
  return introMetaPatterns.some((pattern) => pattern.test(text));
}

function collectEditorialTitles(payload: any) {
  return [
    payload?.lead_story?.title,
    ...(payload?.radar_section?.items || []).map((item: any) => item.title),
    ...(payload?.carnet_section?.items || []).map((item: any) => item.title),
  ].filter(Boolean);
}

function hasDuplicateEditorialTitles(payload: any) {
  const titles = collectEditorialTitles(payload);
  for (let index = 0; index < titles.length; index += 1) {
    for (let cursor = index + 1; cursor < titles.length; cursor += 1) {
      if (titleSimilarity(titles[index], titles[cursor]) >= 0.72) {
        return true;
      }
    }
  }
  return false;
}

function validateGeneratedPayload(payload: any, context: any) {
  const errors: string[] = [];
  const allowedSources = buildAllowedLinks(context);
  const hrefs = new Set<string>();
  collectHrefValues(payload, hrefs);

  for (const href of hrefs) {
    if (!allowedSources.has(href)) {
      errors.push(`Unknown href in AST: ${href}`);
    }
  }

  const chartKeys = payload.markets_section?.charts?.map((chart: any) => chart.key) || [];
  if (!chartKeys.includes('actions') || !chartKeys.includes('crypto') || chartKeys.length !== 2) {
    errors.push('markets_section must expose exactly actions and crypto charts');
  }

  if ((payload.intro?.paragraphs?.length || 0) !== 2) {
    errors.push('intro must contain exactly 2 paragraphs');
  }

  for (const paragraph of payload.intro?.paragraphs || []) {
    const text = blockToPlainText(paragraph);
    if (hasForbiddenIntroMeta(text)) {
      errors.push('intro contains forbidden meta language');
    }
  }

  if ((payload.opening_brief?.items?.length || 0) < 3 || (payload.opening_brief?.items?.length || 0) > 5) {
    errors.push('opening_brief must contain 3 to 5 items');
  }

  if ((payload.lead_story?.paragraphs?.length || 0) < 6 || (payload.lead_story?.paragraphs?.length || 0) > 8) {
    errors.push('lead_story must contain 6 to 8 paragraphs');
  }

  if ((payload.radar_section?.items?.length || 0) < 2 || (payload.radar_section?.items?.length || 0) > 4) {
    errors.push('radar_section must contain 2 to 4 items');
  }

  if ((payload.carnet_section?.items?.length || 0) < 2 || (payload.carnet_section?.items?.length || 0) > 3) {
    errors.push('carnet_section must contain 2 to 3 items');
  }

  if ((payload.briefs_section?.items?.length || 0) < 2 || (payload.briefs_section?.items?.length || 0) > 5) {
    errors.push('briefs_section must contain 2 to 5 items');
  }

  for (const title of collectEditorialTitles(payload)) {
    if (placeholderTitlePattern.test(title)) {
      errors.push(`placeholder title detected: ${title}`);
    }
  }

  if (hasDuplicateEditorialTitles(payload)) {
    errors.push('duplicate stories detected across lead/radar/carnet');
  }

  return errors;
}

const fallbackTopicLabels: Record<string, string> = {
  inflation_rates: 'Taux',
  jobs_consumption_growth: 'Croissance',
  trade_industry_energy: 'Commerce',
  europe_euro_area: 'Zone euro',
  china_asia_fx: 'Asie',
  budget_debt_fiscal: 'Budget',
  institutions: 'Institutions',
};

function uniqueStrings(values: string[]) {
  return values.filter((value, index, array) => Boolean(value) && array.indexOf(value) === index);
}

function sourceLabelFromStory(story: any) {
  const source = String(story?.source_name || story?.source_domain || '').trim();
  if (!source) return '';
  return trimText(source.replace(/^www\./i, '').replace(/\.(com|org|eu|fr)$/i, ''), 24);
}

function titleLabelFromStory(story: any) {
  const segments = String(story?.title || '')
    .split(/[,:;–—-]/)
    .map((segment) => trimText(segment.trim(), 24))
    .filter(Boolean);
  return segments[0] || '';
}

function buildCompoundOpeningLabel(story: any) {
  const primary = detectOpeningLabel(story);
  const source = sourceLabelFromStory(story);
  if (source && source !== primary) {
    return trimText(`${primary} / ${source}`, 24);
  }
  return trimText(`${primary} macro`, 24);
}

function chooseOpeningLabel(story: any, used: Set<string>) {
  const candidates = uniqueStrings([
    detectOpeningLabel(story),
    fallbackTopicLabels[story?.topic_family] || '',
    titleLabelFromStory(story),
    sourceLabelFromStory(story),
    buildCompoundOpeningLabel(story),
    'Signal macro',
  ].map((label) => trimText(String(label || '').trim(), 24)));

  return candidates.find((candidate) => !used.has(candidate)) || buildCompoundOpeningLabel(story);
}

function hashSeed(value: string) {
  let hash = 0;
  for (const char of String(value || '')) {
    hash = ((hash * 31) + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function pickVariant(seed: string, options: string[]) {
  if (!options.length) return '';
  return options[hashSeed(seed) % options.length];
}

function formatSignedChange(value: any) {
  const amount = Number(value || 0);
  return `${amount > 0 ? '+' : ''}${amount.toFixed(2)} %`;
}

function listWithConjunction(values: string[]) {
  if (!values.length) return '';
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} et ${values[1]}`;
  return `${values.slice(0, -1).join(', ')} et ${values[values.length - 1]}`;
}

function describeMarketMove(item: any) {
  return `${item.label} ${formatSignedChange(item.change_pct)} sur ${item.period}`;
}

function describeMarketRegime(regime?: string) {
  if (regime === 'risk_on') return 'plutôt porteur pour le risque';
  if (regime === 'risk_off') return 'plus défensif';
  if (regime === 'closed_equities') return 'de fermeture actions';
  return 'partagé';
}

function buildMarketsParagraphs(context: any) {
  const marketItems = Array.isArray(context.marketSnapshot?.items) ? context.marketSnapshot.items : [];
  const equities = marketItems.filter((item: any) => item.key === 'actions').slice(0, 2);
  const fx = marketItems.find((item: any) => item.key === 'europe-fx');
  const crypto = marketItems.filter((item: any) => item.key === 'crypto').slice(0, 2);

  const equitiesText = equities.length
    ? `${listWithConjunction(equities.map(describeMarketMove))}. Le climat reste ${describeMarketRegime(context.marketSnapshot?.market_regime)}.`
    : 'La fenêtre disponible reste trop mince pour tirer une lecture directionnelle solide sur les indices.';
  const valueText = fx
    ? `${fx.label} ${formatSignedChange(fx.change_pct)} sur ${fx.period}. Ce repère garde la pression sur les dossiers sensibles aux taux, au change et à l'énergie.`
    : "Sans repère change exploitable, la lecture reste centrée sur les valeurs sensibles aux taux, à l’énergie et au commerce extérieur.";
  const cryptoText = crypto.length
    ? `${listWithConjunction(crypto.map(describeMarketMove))}. Le segment reste surtout un thermomètre de liquidité et d'appétit pour le risque.`
    : 'Le segment crypto ne livre pas de signal autonome robuste ce matin et reste un baromètre secondaire du climat de risque.';

  return [
    {
      label: 'Marchés' as const,
      parts: [{ text: `${context.marketSnapshot.equities_note} ${equitiesText}` }],
    },
    {
      label: 'Valeur' as const,
      parts: [{ text: valueText }],
    },
    {
      label: 'Crypto' as const,
      parts: [{ text: cryptoText }],
    },
  ];
}

function normalizeSourceReferenceUrl(rawUrl: string) {
  const clean = String(rawUrl || '').trim();
  if (!clean) return '';

  try {
    const parsed = new URL(clean);
    parsed.protocol = 'https:';
    parsed.hash = '';
    return parsed.toString().replace(/\/$/, '');
  } catch (_error) {
    return clean.replace(/\/$/, '');
  }
}

function buildFooterSourcesNote(stories: any[]) {
  const refs: Array<{ label: string; url: string }> = [];
  const seen = new Set<string>();

  for (const story of stories) {
    const candidates = [
      story,
      story?.evidence_pack?.official_support,
      story?.evidence_pack?.officialSupport,
      ...(story?.evidence_pack?.corroborations || []),
    ].filter(Boolean);

    for (const candidate of candidates) {
      const url = normalizeSourceReferenceUrl(String(candidate?.url || '').trim());
      if (!url || seen.has(url)) continue;
      seen.add(url);
      refs.push({
        label: trimText(String(candidate?.source_name || candidate?.source_domain || 'Source'), 32),
        url,
      });
      if (refs.length >= 6) break;
    }

    if (refs.length >= 6) break;
  }

  if (!refs.length) {
    return {
      parts: [{ text: 'Sources vérifiées dans l’édition complète.' }],
    };
  }

  const parts: Array<{ text: string; href?: string }> = [{ text: 'Sources du jour : ' }];
  refs.forEach((ref, index) => {
    parts.push({ text: ref.label, href: ref.url });
    if (index < refs.length - 1) {
      parts.push({ text: index === refs.length - 2 ? ' et ' : ', ' });
    }
  });

  return { parts };
}

function buildPlainBlock(text: string) {
  return { parts: [{ text: trimText(text, 760) }] };
}

function buildBlockWithOptionalLink(text: string, _url?: string, _label?: string) {
  return buildPlainBlock(text);
}

function buildOpeningBriefItems(stories: any[]) {
  const used = new Set<string>();
  return stories.map((story) => {
    const label = chooseOpeningLabel(story, used);
    used.add(label);

    return {
      label,
      parts: [{ text: buildOpeningLine(story) }],
    };
  });
}

function fillSectionStories(stories: any[], minCount: number, fallbackPool: any[]) {
  const filled = [...stories];
  const seen = new Set(filled.map((story) => storyKey(story)));

  for (const story of fallbackPool) {
    if (filled.length >= minCount) break;
    const key = storyKey(story);
    if (seen.has(key)) continue;
    filled.push(story);
    seen.add(key);
  }

  for (const story of fallbackPool) {
    if (filled.length >= minCount) break;
    if (!story?.title) continue;
    filled.push(story);
  }

  return filled;
}

function buildParagraphsFromLead(context: any, leadStory: any, relatedStories: any[]) {
  const support = leadStory?.evidence_pack?.official_support || leadStory?.evidence_pack?.officialSupport || null;
  const corroboration = leadStory?.evidence_pack?.corroborations?.[0] || null;
  const marketTone = context.marketSnapshot?.equities_note || 'Les marchés restent sans direction nette ce matin.';
  const relatedA = relatedStories[0];
  const relatedB = relatedStories[1];
  const relatedC = relatedStories[2];
  const leadSeed = storyKey(leadStory);

  return [
    buildBlockWithOptionalLink(
      `${leadStory?.snippet_raw || leadStory?.title}. ${pickVariant(`${leadSeed}:opening`, [
        'Le signal compte parce qu’il rebat la lecture des taux, de la croissance et des coûts.',
        'Ce dossier pèse déjà sur la hiérarchie du matin entre inflation, activité et énergie.',
        'Le sujet prend de l’ampleur car il déplace la lecture conjointe des taux, du commerce et des prix.',
      ])}`,
      leadStory?.url,
      leadStory?.source_name,
    ),
    textToBlock(
      corroboration?.snippet_raw
        ? `${corroboration.snippet_raw} ${pickVariant(`${leadSeed}:corroboration`, [
            'Le recoupement évite de lire la séance à partir d’un seul titre et donne plus de poids au scénario central.',
            'Ce deuxième point ancre le dossier dans une séquence plus large qu’une réaction de marché isolée.',
            'Ce complément donne de la consistance au sujet principal et réduit le risque de surinterprétation.',
          ])}`
        : `${leadStory?.body_raw || leadStory?.snippet_raw || leadStory?.title} ${pickVariant(`${leadSeed}:body`, [
            'La matière disponible suffit déjà à passer du fait brut à une lecture plus construite du matin.',
            'La densité du dossier permet d’aller au-delà du simple signal de séance.',
            'Le sujet gagne en relief dès qu’on le replace dans la séquence macro récente.',
          ])}`,
    ),
    textToBlock(
      `${marketTone} ${pickVariant(`${leadSeed}:market`, [
        'Le grand angle sert surtout à distinguer ce qui relève d’un vrai changement de cadence et ce qui tient encore à une nervosité de court terme.',
        'L’enjeu est de séparer le bruit de marché du déplacement durable des anticipations.',
        'Le point clé est de savoir si le dossier change la trajectoire attendue ou seulement le ton de la séance.',
      ])}`,
    ),
    textToBlock(
      relatedA?.snippet_raw
        ? `${relatedA.snippet_raw} ${pickVariant(`${leadSeed}:relatedA`, [
            'Ce contrechamp rappelle que la journée se joue aussi dans les frottements entre activité, coûts et commerce.',
            'Ce signal adjacent empêche une lecture trop linéaire du dossier principal.',
            'Ce point oblige à relire le sujet avec le reste du flux macro, pas en vase clos.',
          ])}`
        : `${pickVariant(`${leadSeed}:fallbackA`, [
            'Le sujet n’évolue pas seul; il faut le relire avec le reste du flux macro pour distinguer un tournant durable d’une respiration passagère.',
            'Le dossier doit être replacé dans un ensemble plus large où commerce, activité et énergie continuent de peser.',
            'L’intérêt du sujet tient aussi à ce qu’il entre en résonance avec d’autres signaux du jour.',
          ])}`,
    ),
    textToBlock(
      relatedB?.snippet_raw
        ? `${relatedB.snippet_raw} ${pickVariant(`${leadSeed}:relatedB`, [
            'C’est là que le scénario reste fragile: un facteur extérieur peut vite réinjecter de la tension.',
            'Le point rappelle que la séquence reste exposée à un retour rapide des frictions.',
            'Le scénario central tient encore à peu de chose dès qu’un facteur externe se réactive.',
          ])}`
        : `${pickVariant(`${leadSeed}:fallbackB`, [
            'La fragilité du scénario reste visible: énergie, commerce et activité peuvent encore contrarier une lecture trop lisse de la conjoncture.',
            'Le dossier reste vulnérable à un regain de tension sur l’énergie, le commerce ou les taux.',
            'Rien ne garantit encore une lecture apaisée de la conjoncture au-delà de la première réaction.',
          ])}`,
    ),
    textToBlock(
      support?.snippet_raw
        ? `${support.snippet_raw} ${pickVariant(`${leadSeed}:support`, [
            'La prochaine étape sera de voir si les publications officielles prolongent le mouvement aperçu ce matin.',
            'Le test suivant sera la confirmation, ou non, du signal par les données officielles.',
            'Tout se jouera désormais dans la capacité des chiffres publics à confirmer cette inflexion.',
          ])}`
        : relatedC?.snippet_raw
          ? `${relatedC.snippet_raw} ${pickVariant(`${leadSeed}:relatedC`, [
              'La suite dépendra donc de la capacité des prochaines données à confirmer l’orientation qui se dessine.',
              'Le sujet demandera une confirmation rapide pour passer du signal au scénario.',
              'La prochaine salve de données dira si le marché a raison d’y voir plus qu’un mouvement de séance.',
            ])}`
          : `${pickVariant(`${leadSeed}:closing`, [
              'La suite dépendra surtout des prochaines données officielles, parce qu’elles diront si le marché fait face à un vrai pivot ou à une simple détente de quelques heures.',
              'Le point d’atterrissage dépend maintenant d’une confirmation macro plus robuste que le flux du matin.',
              'La question reste la même: changement de régime ou simple respiration de marché.',
            ])}`,
    ),
  ].slice(0, 6);
}

function buildFallbackPayload(context: any) {
  const topStories = context.topStories || [];
  const briefs = context.briefs || [];
  const leadStory = topStories[0] || {};
  const initialPool = uniqStories(topStories.slice(1).concat(briefs), 10, new Set<string>([storyKey(leadStory)]));
  const desiredBriefCount = Math.min(5, Math.max(2, initialPool.length - 4));
  const desiredRadarCount = Math.min(4, Math.max(2, initialPool.length - desiredBriefCount - 2));

  const usedKeys = new Set<string>([storyKey(leadStory)]);
  const radarStories = fillSectionStories(
    uniqStories(topStories.slice(1).concat(briefs), desiredRadarCount, usedKeys),
    2,
    initialPool,
  ).slice(0, Math.max(2, desiredRadarCount));
  radarStories.forEach((story) => usedKeys.add(storyKey(story)));

  const remainingAfterRadar = uniqStories(briefs.concat(topStories.slice(1)), 10, usedKeys);
  const desiredCarnetCount = Math.min(3, Math.max(2, remainingAfterRadar.length - desiredBriefCount));
  const carnetStories = fillSectionStories(
    uniqStories(briefs.concat(topStories.slice(1)), desiredCarnetCount, usedKeys).slice(0, desiredCarnetCount),
    2,
    initialPool.concat(radarStories),
  ).slice(0, Math.max(2, desiredCarnetCount));
  carnetStories.forEach((story) => usedKeys.add(storyKey(story)));

  let briefStories = uniqStories(briefs.concat(topStories.slice(1)), desiredBriefCount, usedKeys).slice(0, desiredBriefCount);
  briefStories = fillSectionStories(briefStories, 2, initialPool.concat(radarStories, carnetStories)).slice(0, Math.max(2, desiredBriefCount));

  const openingSources = uniqStories([leadStory, ...radarStories, ...carnetStories], 4).slice(0, 4);
  const openingBriefItems = buildOpeningBriefItems(openingSources);
  const relatedForLead = uniqStories([...radarStories, ...carnetStories, ...briefStories], 3);
  const introSubjects = uniqStories([leadStory, ...radarStories], 3);
  const introFirst = trimText(
    introSubjects
      .map((story) => trimText(story?.snippet_raw || story?.title || '', 140))
      .filter(Boolean)
      .join(' '),
    280,
  );
  const introThemeText = Array.from(new Set([
    leadStory,
    ...radarStories.slice(0, 2),
  ]
    .map((story) => detectOpeningLabel(story).toLowerCase())
    .filter(Boolean))).join(', ') || 'taux, croissance et commerce';

  return {
    content_version: 'v2.1' as const,
    email_subject: `Oiko News — ${context.window.editionDate}`,
    preview_text: trimText('Taux, croissance, énergie et commerce: les signaux qui structurent vraiment la matinée macro.', 150),
    date_label: context.window.editionDate,
    header_visual: {
      alt_text: buildVisualAltText('header_visual', leadStory),
      geo_hint: '',
      entity_hint: leadStory?.title || context.editorialAngle,
      image_style_hint: 'sobriety' as const,
    },
    intro: {
      paragraphs: [
        textToBlock(introFirst || 'La séance s’ouvre sur des signaux macro qui redessinent l’équilibre entre taux, activité et prix.'),
        textToBlock(`Le marché lit la même matinée sous plusieurs angles à la fois: ${introThemeText}. C’est ce croisement, plus que l’empilement des titres, qui donne la vraie hiérarchie du jour.`),
      ],
      signature: 'La rédaction Oiko',
    },
    opening_brief: {
      title: "À l'ouverture" as const,
      items: openingBriefItems.slice(0, 4),
    },
    markets_section: {
      title: 'Sur les marchés' as const,
      charts: [
        { key: 'actions' as const, title: 'Bourse', image_url: '', alt_text: 'Évolution récente des marchés actions' },
        { key: 'crypto' as const, title: 'Crypto', image_url: '', alt_text: 'Évolution récente du marché crypto' },
      ],
      paragraphs: buildMarketsParagraphs(context),
    },
    lead_story: {
      kicker: inferKicker(leadStory?.topic_family),
      title: leadStory?.title || context.editorialAngle,
      visual_hint: {
        alt_text: buildVisualAltText('lead_story', leadStory),
        geo_hint: '',
        entity_hint: leadStory?.title || context.editorialAngle,
        image_style_hint: ['inflation_rates', 'europe_euro_area', 'budget_debt_fiscal', 'institutions'].includes(leadStory?.topic_family) ? 'documentary' : 'business',
      },
      paragraphs: buildParagraphsFromLead(context, leadStory, relatedForLead),
      signature: 'Rédaction Oiko',
    },
    radar_section: {
      title: 'Le radar' as const,
      visual_hint: {
        alt_text: buildVisualAltText('radar_section', radarStories[0]),
        geo_hint: '',
        entity_hint: radarStories[0]?.title || 'Radar Oiko',
        image_style_hint: 'business',
      },
      items: radarStories.slice(0, 4).map((story: any) => ({
        title: story.title,
        paragraphs: [
          buildBlockWithOptionalLink(
            `${story.snippet_raw || story.title} ${pickVariant(`${storyKey(story)}:radar`, [
              'Le point mérite sa place ici parce qu’il infléchit la lecture du scénario central sans l’épuiser à lui seul.',
              'Le signal reste secondaire dans la hiérarchie du jour, mais il change le décor macro.',
              'Le dossier élargit la lecture de la séance sans prendre tout le devant de la scène.',
            ])}`,
            story.url,
            story.source_name,
          ),
        ],
      })),
    },
    carnet_section: {
      title: 'Le carnet' as const,
      visual_hint: {
        alt_text: buildVisualAltText('carnet_section', carnetStories[0]),
        geo_hint: '',
        entity_hint: carnetStories[0]?.title || 'Carnet Oiko',
        image_style_hint: 'innovation',
      },
      items: carnetStories.slice(0, 3).map((story: any) => ({
        title: story.title,
        paragraphs: [
          buildBlockWithOptionalLink(
            `${story.snippet_raw || story.title} ${pickVariant(`${storyKey(story)}:carnet`, [
              'Ce point compte surtout pour les coûts, l’investissement ou l’allocation sectorielle à surveiller dans la journée.',
              'Le sujet sert avant tout de repère pour les coûts, la stratégie des entreprises ou les arbitrages sectoriels.',
              'Le dossier mérite d’être gardé au carnet parce qu’il peut déplacer les décisions d’investissement et de production.',
            ])}`,
            story.url,
            story.source_name,
          ),
        ],
      })),
    },
    briefs_section: {
      title: 'En bref' as const,
      items: briefStories.slice(0, 5).map((story: any) => ({
        parts: [
          { text: `${trimText(story.title, 120)} — ` },
          { text: trimText(story.snippet_raw || story.title, 220), ...(story.url ? { href: story.url } : {}) },
        ],
      })),
    },
    footer_sources_note: buildFooterSourcesNote([
      leadStory,
      ...radarStories.slice(0, 2),
      ...carnetStories.slice(0, 2),
      ...briefStories.slice(0, 2),
    ]),
    footer_disclaimer: 'Contenu pédagogique. Pas de conseil en investissement.',
  };
}

function isPlainObject(value: any) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function clampItems<T>(primary: T[], fallback: T[], minCount: number, maxCount: number, keyFn?: (item: T) => string) {
  const result: T[] = [];
  const seen = new Set<string>();
  const add = (item: T) => {
    if (!item || result.length >= maxCount) return;
    const key = keyFn ? keyFn(item) : '';
    if (key && seen.has(key)) return;
    if (key) seen.add(key);
    result.push(item);
  };

  primary.forEach(add);
  fallback.forEach(add);

  for (const item of fallback) {
    if (result.length >= minCount || result.length >= maxCount) break;
    result.push(item);
  }

  return result.slice(0, maxCount);
}

function sanitizeRichTextParts(parts: any, fallbackParts: RichTextPart[], allowedLinks: Map<string, any>) {
  const cleaned = Array.isArray(parts)
    ? parts
        .map((part) => {
          const text = trimText(String(part?.text || ''), 760);
          if (!text) return null;
          const href = typeof part?.href === 'string' && allowedLinks.has(part.href) ? part.href : undefined;
          return href ? { text, href } : { text };
        })
        .filter(Boolean)
    : [];

  return cleaned.length ? cleaned : fallbackParts;
}

function sanitizeRichTextBlock(block: any, fallbackBlock: RichTextBlock, allowedLinks: Map<string, any>): RichTextBlock {
  return {
    parts: sanitizeRichTextParts(block?.parts, fallbackBlock.parts, allowedLinks) as RichTextPart[],
  };
}

function sanitizeBlocks(blocks: any, fallbackBlocks: RichTextBlock[], minCount: number, maxCount: number, allowedLinks: Map<string, any>) {
  const primary = Array.isArray(blocks)
    ? blocks
        .map((block, index) => sanitizeRichTextBlock(block, fallbackBlocks[Math.min(index, fallbackBlocks.length - 1)] || fallbackBlocks[0], allowedLinks))
        .filter((block) => block.parts.length)
    : [];

  return clampItems(primary, fallbackBlocks, minCount, maxCount, (block) => blockToPlainText(block));
}

function sanitizeMenuItems(items: any, fallbackItems: any[], minCount: number, maxCount: number, allowedLinks: Map<string, any>) {
  const primary = Array.isArray(items)
    ? items
        .map((item, index) => {
          const fallbackItem = fallbackItems[Math.min(index, fallbackItems.length - 1)] || fallbackItems[0];
          const label = trimText(String(item?.label || fallbackItem?.label || ''), 24);
          const parts = sanitizeRichTextParts(item?.parts, fallbackItem.parts, allowedLinks);
          return label && parts.length ? { label, parts } : null;
        })
        .filter(Boolean)
    : [];

  return clampItems(primary, fallbackItems, minCount, maxCount, (item: any) => String(item.label || ''));
}

function sanitizeTitledItems(items: any, fallbackItems: any[], minCount: number, maxCount: number, allowedLinks: Map<string, any>) {
  const primary = Array.isArray(items)
    ? items
        .map((item, index) => {
          const fallbackItem = fallbackItems[Math.min(index, fallbackItems.length - 1)] || fallbackItems[0];
          const title = trimText(String(item?.title || fallbackItem?.title || ''), 180);
          const paragraphs = sanitizeBlocks(item?.paragraphs, fallbackItem.paragraphs, 1, 2, allowedLinks);
          return title ? { title, paragraphs } : null;
        })
        .filter(Boolean)
    : [];

  return clampItems(primary, fallbackItems, minCount, maxCount, (item: any) => String(item.title || ''));
}

function sanitizeBriefItems(items: any, fallbackItems: any[], minCount: number, maxCount: number, allowedLinks: Map<string, any>) {
  const primary = Array.isArray(items)
    ? items
        .map((item, index) => {
          const fallbackItem = fallbackItems[Math.min(index, fallbackItems.length - 1)] || fallbackItems[0];
          const parts = sanitizeRichTextParts(item?.parts, fallbackItem.parts, allowedLinks);
          return parts.length ? { parts } : null;
        })
        .filter(Boolean)
    : [];

  return clampItems(primary, fallbackItems, minCount, maxCount, (item: any) => partsToPlainText(item.parts));
}

function normalizeOpeningBriefTitle(value: any) {
  const clean = String(value || '').trim();
  return clean === '? l?ouverture' ? '? l?ouverture' : "? l'ouverture";
}

function normalizeCharts(charts: any, fallbackCharts: any[]) {
  const byKey = new Map(fallbackCharts.map((chart) => [chart.key, { ...chart }]));

  if (Array.isArray(charts)) {
    for (const chart of charts) {
      const key = chart?.key;
      if (!byKey.has(key)) continue;
      const fallbackChart = byKey.get(key);
      byKey.set(key, {
        ...fallbackChart,
        title: trimText(String(chart?.title || fallbackChart.title || ''), 40) || fallbackChart.title,
        image_url: typeof chart?.image_url === 'string' ? chart.image_url : fallbackChart.image_url,
        alt_text: trimText(String(chart?.alt_text || fallbackChart.alt_text || ''), 180) || fallbackChart.alt_text,
      });
    }
  }

  return ['actions', 'crypto'].map((key) => byKey.get(key));
}

function pickDistinctTitledItems(primary: any[], fallback: any[], minCount: number, maxCount: number, blockedTitles: string[] = []) {
  const result: any[] = [];
  const usedTitles = [...blockedTitles.filter(Boolean)];
  const add = (item: any) => {
    const title = String(item?.title || '').trim();
    if (!title || result.length >= maxCount) return;
    if (usedTitles.some((existing) => titleSimilarity(existing, title) >= 0.72)) return;
    result.push(item);
    usedTitles.push(title);
  };

  primary.forEach(add);
  fallback.forEach(add);

  for (const item of fallback) {
    if (result.length >= minCount || result.length >= maxCount) break;
    result.push(item);
  }

  return result.slice(0, maxCount);
}

function normalizeGeneratedPayload(rawPayload: any, context: any) {
  const fallbackPayload = buildFallbackPayload(context);
  const allowedLinks = buildAllowedLinks(context);
  const raw = isPlainObject(rawPayload) ? rawPayload : {};

  const leadStory = {
    ...fallbackPayload.lead_story,
    ...(isPlainObject(raw.lead_story) ? raw.lead_story : {}),
    kicker: trimText(String(raw.lead_story?.kicker || fallbackPayload.lead_story.kicker || ''), 40) || fallbackPayload.lead_story.kicker,
    title: trimText(String(raw.lead_story?.title || fallbackPayload.lead_story.title || ''), 180) || fallbackPayload.lead_story.title,
    paragraphs: sanitizeBlocks(raw.lead_story?.paragraphs, fallbackPayload.lead_story.paragraphs, 6, 8, allowedLinks),
    visual_hint: isPlainObject(raw.lead_story?.visual_hint) ? { ...fallbackPayload.lead_story.visual_hint, ...raw.lead_story.visual_hint } : fallbackPayload.lead_story.visual_hint,
    signature: trimText(String(raw.lead_story?.signature || fallbackPayload.lead_story.signature || ''), 80) || fallbackPayload.lead_story.signature,
  };

  const radarItems = sanitizeTitledItems(raw.radar_section?.items, fallbackPayload.radar_section.items, 2, 4, allowedLinks);
  const radarDistinct = pickDistinctTitledItems(radarItems, fallbackPayload.radar_section.items, 2, 4, [leadStory.title]);
  const carnetItems = sanitizeTitledItems(raw.carnet_section?.items, fallbackPayload.carnet_section.items, 2, 3, allowedLinks);
  const carnetDistinct = pickDistinctTitledItems(carnetItems, fallbackPayload.carnet_section.items, 2, 3, [leadStory.title, ...radarDistinct.map((item: any) => item.title)]);

  const rawMarketsParagraphs = Array.isArray(raw.markets_section?.paragraphs)
    ? raw.markets_section.paragraphs.map((paragraph: any, index: number) => {
        const fallbackParagraph = fallbackPayload.markets_section.paragraphs.find((item: any) => item.label === paragraph?.label)
          || fallbackPayload.markets_section.paragraphs[index]
          || fallbackPayload.markets_section.paragraphs[0];
        const label = ['March?s', 'Valeur', 'Crypto'].includes(paragraph?.label) ? paragraph.label : fallbackParagraph.label;
        return {
          label,
          parts: sanitizeRichTextParts(paragraph?.parts, fallbackParagraph.parts, allowedLinks),
        };
      })
    : [];

  return {
    ...fallbackPayload,
    ...raw,
    content_version: 'v2.1',
    email_subject: trimText(String(raw.email_subject || fallbackPayload.email_subject || ''), 180) || fallbackPayload.email_subject,
    preview_text: trimText(String(raw.preview_text || fallbackPayload.preview_text || ''), 160) || fallbackPayload.preview_text,
    date_label: trimText(String(raw.date_label || fallbackPayload.date_label || ''), 64) || fallbackPayload.date_label,
    header_visual: isPlainObject(raw.header_visual) ? { ...fallbackPayload.header_visual, ...raw.header_visual } : fallbackPayload.header_visual,
    intro: {
      paragraphs: sanitizeBlocks(raw.intro?.paragraphs, fallbackPayload.intro.paragraphs, 2, 2, allowedLinks),
      signature: trimText(String(raw.intro?.signature || fallbackPayload.intro.signature || ''), 80) || fallbackPayload.intro.signature,
    },
    opening_brief: {
      title: normalizeOpeningBriefTitle(raw.opening_brief?.title),
      items: sanitizeMenuItems(raw.opening_brief?.items, fallbackPayload.opening_brief.items, 3, 5, allowedLinks),
    },
    markets_section: {
      ...fallbackPayload.markets_section,
      ...(isPlainObject(raw.markets_section) ? raw.markets_section : {}),
      title: trimText(String(raw.markets_section?.title || fallbackPayload.markets_section.title || ''), 80) || fallbackPayload.markets_section.title,
      charts: normalizeCharts(raw.markets_section?.charts, fallbackPayload.markets_section.charts),
      paragraphs: clampItems(rawMarketsParagraphs, fallbackPayload.markets_section.paragraphs, 3, 3, (item: any) => item.label),
    },
    lead_story: leadStory,
    radar_section: {
      ...fallbackPayload.radar_section,
      ...(isPlainObject(raw.radar_section) ? raw.radar_section : {}),
      title: trimText(String(raw.radar_section?.title || fallbackPayload.radar_section.title || ''), 80) || fallbackPayload.radar_section.title,
      visual_hint: isPlainObject(raw.radar_section?.visual_hint) ? { ...fallbackPayload.radar_section.visual_hint, ...raw.radar_section.visual_hint } : fallbackPayload.radar_section.visual_hint,
      items: radarDistinct,
    },
    carnet_section: {
      ...fallbackPayload.carnet_section,
      ...(isPlainObject(raw.carnet_section) ? raw.carnet_section : {}),
      title: trimText(String(raw.carnet_section?.title || fallbackPayload.carnet_section.title || ''), 80) || fallbackPayload.carnet_section.title,
      visual_hint: isPlainObject(raw.carnet_section?.visual_hint) ? { ...fallbackPayload.carnet_section.visual_hint, ...raw.carnet_section.visual_hint } : fallbackPayload.carnet_section.visual_hint,
      items: carnetDistinct,
    },
    briefs_section: {
      ...fallbackPayload.briefs_section,
      ...(isPlainObject(raw.briefs_section) ? raw.briefs_section : {}),
      title: trimText(String(raw.briefs_section?.title || fallbackPayload.briefs_section.title || ''), 80) || fallbackPayload.briefs_section.title,
      items: sanitizeBriefItems(raw.briefs_section?.items, fallbackPayload.briefs_section.items, 2, 5, allowedLinks),
    },
    footer_sources_note: sanitizeRichTextBlock(raw.footer_sources_note, fallbackPayload.footer_sources_note, allowedLinks),
    footer_disclaimer: trimText(String(raw.footer_disclaimer || fallbackPayload.footer_disclaimer || ''), 220) || fallbackPayload.footer_disclaimer,
  };
}

export async function composeEditionDraft(context: any, options: { forceFallback?: boolean } = {}) {
  const attempts: Array<Record<string, unknown>> = [];

  if (options.forceFallback) {
    const fallbackPayload = GeneratedOikoEditionV21Schema.parse(buildFallbackPayload(context));
    return {
      payload: fallbackPayload,
      providerAttempts: [{ label: 'forced_fallback', status: 'skipped' }],
      validationErrors: [],
      providerUsed: null,
      modelUsed: null,
      usedFallback: true,
    };
  }

  const messages = buildMessages(context);
  const configuredAttempts = [
    { provider: OIKO_CONFIG.primaryProvider, model: OIKO_CONFIG.primaryModel, label: 'primary' },
    ...(OIKO_CONFIG.secondaryProvider && OIKO_CONFIG.secondaryModel
      ? [{ provider: OIKO_CONFIG.secondaryProvider, model: OIKO_CONFIG.secondaryModel, label: 'secondary' }]
      : []),
  ];

  for (const attempt of configuredAttempts) {
    try {
      const result = await callConfiguredProvider(attempt.provider, attempt.model, messages, { maxTokens: 7200, temperature: 0.2 }, context.window.editionDate);
      attempts.push({ ...attempt, status: 'success', tokensUsed: result.tokensUsed || 0 });

      let payload = extractJsonCandidate(result.content);
      if (!payload) {
        payload = await repairJsonWithFastModel(result.content, context.window.editionDate);
      }
      if (!payload) {
        throw new Error('Invalid JSON payload');
      }

      const normalizedPayload = normalizeGeneratedPayload(payload, context);
      const parsed = GeneratedOikoEditionV21Schema.parse(normalizedPayload);
      const validationErrors = validateGeneratedPayload(parsed, context);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('; '));
      }

      return {
        payload: parsed,
        providerAttempts: attempts,
        validationErrors: [],
        providerUsed: attempt.provider,
        modelUsed: attempt.model,
        usedFallback: false,
      };
    } catch (error) {
      attempts.push({ ...attempt, status: 'failed', error: error instanceof Error ? error.message : 'unknown_error' });
    }
  }

  const fallbackPayload = GeneratedOikoEditionV21Schema.parse(buildFallbackPayload(context));
  return {
    payload: fallbackPayload,
    providerAttempts: attempts,
    validationErrors: attempts.filter((attempt) => attempt.status === 'failed').map((attempt) => String(attempt.error || 'unknown_error')),
    providerUsed: null,
    modelUsed: null,
    usedFallback: true,
  };
}

export function buildGenerationContext({ window, selection, evidencePacks, evidenceCoverageScore, marketSnapshot }: any) {
  const normalizedTopStories = selection.topStories.map((story: any, index: number) => ({
    ...story,
    rank: index + 1,
    evidence_pack: story.evidence_pack || evidencePacks[index] || { primary: story, corroborations: [], official_support: null },
  }));

  return {
    window,
    editorialAngle: selection.editorialAngle,
    topStories: normalizedTopStories,
    briefs: selection.briefs,
    evidencePacks: evidencePacks.length ? evidencePacks : buildEvidencePacks(normalizedTopStories),
    evidenceCoverageScore,
    marketSnapshot,
    selection,
  };
}

export default {
  OikoEditionSchema,
  composeEditionDraft,
  buildGenerationContext,
};
