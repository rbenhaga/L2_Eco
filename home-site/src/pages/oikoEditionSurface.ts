import type {
  OikoEdition,
  OikoEditionContent,
  OikoLabeledParagraph,
  OikoMarketSeries,
  OikoMenuItem,
  OikoRichTextBlock,
} from '../services/oikoNews.ts';

export type OikoMarketDirection = 'up' | 'down' | 'flat';
export type OikoMarketTone = 'positive' | 'negative' | 'neutral';
export type OikoMarketCategory = 'commodities' | 'equities' | 'fx' | 'rates' | 'crypto';

export interface OikoMarketDeltaPresentation {
  direction: OikoMarketDirection;
  tone: OikoMarketTone;
  arrow: string;
  text: string;
  rawValue: number;
}

export interface OikoMarketLineModel {
  id: string;
  stableKey: string;
  category: OikoMarketCategory;
  label: string;
  valueText: string;
  unitText: string;
  period: string;
  delta: OikoMarketDeltaPresentation;
}

export interface OikoSummaryLine {
  label: string;
  text: string;
}

export interface OikoLeadSectionModel {
  label: string;
  paragraphs: string[];
}

const CATEGORY_NOTE_FALLBACK: Record<OikoMarketCategory, string> = {
  commodities: "Le p\u00e9trole fixe le prix du risque et de l'\u00e9nergie.",
  equities: 'Les indices disent si le choc diffuse vers les marges.',
  fx: 'Le change mesure le refuge dollar et la pression import\u00e9e.',
  rates: 'Les taux disent si la trajectoire mon\u00e9taire doit \u00eatre revue.',
  crypto: 'La crypto reste un signal secondaire du go\u00fbt du risque.',
};

const STABLE_MARKET_ORDER = [
  'brent',
  'sp500',
  'cac40',
  'nasdaq100',
  'eurusd',
  'us10y',
  'oat10y',
  'bitcoin',
  'ethereum',
  'vix',
] as const;

const STABLE_MARKET_MATCHERS: Record<string, RegExp> = {
  brent: /\b(brent|oil)\b/i,
  sp500: /\b(sp500|s&p500|s&p 500)\b/i,
  cac40: /\b(cac40|cac 40)\b/i,
  nasdaq100: /\b(nasdaq100|nasdaq 100)\b/i,
  eurusd: /\b(eurusd|eur\/usd)\b/i,
  us10y: /\b(us10y|us 10y|treasury 10y|u\.s\. 10y)\b/i,
  oat10y: /\b(oat10|oat 10|oat 10y|oat 10 ans)\b/i,
  bitcoin: /\b(bitcoin|btc)\b/i,
  ethereum: /\b(ethereum|ether|eth)\b/i,
  vix: /\bvix\b/i,
};

const EDITORIAL_COPY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/sert de porte d['\u2019]entr\u00e9e pour lire/gi, 'cadre la lecture'],
  [/sert de porte d['\u2019]entr\u00e9e/gi, 'cadre la lecture'],
  [/sert de point d['\u2019]entr\u00e9e/gi, 'cadre la lecture'],
  [/ce dossier sert \u00e0 lire/gi, 'ce dossier suit'],
  [/ce dossier sert \u00e0/gi, 'ce dossier suit'],
  [/la suite du num\u00e9ro dit/gi, 'la suite mesure'],
  [/ouvre la lecture de lire/gi, 'cadre la lecture'],
  [/\s+,/g, ','],
];

function richTextToPlainText(block?: OikoRichTextBlock | null) {
  return Array.isArray(block?.parts) ? block.parts.map((part) => part.text).join('').trim() : '';
}

function normalizeWhitespace(text: string) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

export function polishDisplayedCopy(text: string) {
  const replaced = EDITORIAL_COPY_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    String(text || ''),
  );

  return normalizeWhitespace(replaced);
}

function clampText(text: string, maxLength = 180) {
  const clean = polishDisplayedCopy(text);
  if (!clean || clean.length <= maxLength) return clean;
  const slice = clean.slice(0, maxLength + 1);
  const breakIndex = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('; '), slice.lastIndexOf(', '));
  if (breakIndex >= Math.floor(maxLength * 0.6)) {
    return `${slice.slice(0, breakIndex).trim().replace(/[.,;:!?-]+$/, '')}\u2026`;
  }
  return `${slice.slice(0, maxLength).trim()}\u2026`;
}

function blockToText(block?: OikoRichTextBlock | null) {
  return polishDisplayedCopy(richTextToPlainText(block));
}

function labeledParagraphToText(paragraph?: OikoLabeledParagraph | null) {
  return paragraph ? blockToText({ parts: paragraph.parts || [] }) : '';
}

function formatCompactNumber(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function formatPeriodLabel(period?: string | null) {
  const normalized = String(period || '').trim().toLowerCase();
  if (!normalized || normalized === 'session') return 'S\u00e9ance';
  if (normalized === '24h') return '24 h';
  if (normalized === '1d') return '1 s\u00e9ance';
  if (/^\d+d$/.test(normalized)) return `${normalized.slice(0, -1)} s\u00e9ances`;
  if (/^\d+h$/.test(normalized)) return `${normalized.slice(0, -1)} h`;
  return String(period || 'S\u00e9ance');
}

function formatTimeLabel(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}h${minutes} UTC`;
}

function formatMarketValue(category: OikoMarketCategory, series: OikoMarketSeries) {
  const value = series.latestValue;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return { valueText: 'n.d.', unitText: '' };
  }

  if (category === 'rates') {
    return { valueText: formatCompactNumber(value, 2), unitText: '%' };
  }

  if (category === 'fx') {
    return { valueText: formatCompactNumber(value, value >= 10 ? 2 : 4), unitText: 'spot' };
  }

  if (category === 'commodities') {
    const unitText = /brent|wti|oil/i.test(series.label) ? '$/b' : '$';
    return { valueText: formatCompactNumber(value, value >= 100 ? 0 : 1), unitText };
  }

  if (category === 'crypto') {
    return { valueText: formatCompactNumber(value, value >= 1000 ? 0 : 2), unitText: '$' };
  }

  return { valueText: formatCompactNumber(value, 0), unitText: 'pts' };
}

export function getMarketDeltaPresentation(changePct?: number | null): OikoMarketDeltaPresentation {
  const rawValue = typeof changePct === 'number' && Number.isFinite(changePct) ? changePct : 0;
  const direction: OikoMarketDirection = rawValue > 0 ? 'up' : rawValue < 0 ? 'down' : 'flat';
  const tone: OikoMarketTone = rawValue > 0 ? 'positive' : rawValue < 0 ? 'negative' : 'neutral';
  const arrow = rawValue > 0 ? '\u2191' : rawValue < 0 ? '\u2193' : '\u2192';
  const absoluteValue = Math.abs(rawValue);
  const signedNumber = `${rawValue > 0 ? '+' : rawValue < 0 ? '-' : ''}${formatCompactNumber(absoluteValue, 1)}`;

  return {
    direction,
    tone,
    arrow,
    text: `${signedNumber}%`,
    rawValue,
  };
}

function getSeriesEntries(edition: OikoEdition | null) {
  const marketContext = edition?.marketContext;
  if (!marketContext) return [] as Array<{ category: OikoMarketCategory; series: OikoMarketSeries }>;

  return (['commodities', 'equities', 'fx', 'rates', 'crypto'] as OikoMarketCategory[]).flatMap((category) => {
    const bucket = marketContext[category];
    return Array.isArray(bucket)
      ? bucket.map((series) => ({ category, series }))
      : [];
  });
}

function identifyStableSeriesKey(series: OikoMarketSeries) {
  const normalized = `${series.key} ${series.label}`.toLowerCase();
  return STABLE_MARKET_ORDER.find((stableKey) => STABLE_MARKET_MATCHERS[stableKey].test(normalized)) || null;
}

function toMarketLineModel(category: OikoMarketCategory, series: OikoMarketSeries, stableKey?: string | null): OikoMarketLineModel {
  const delta = getMarketDeltaPresentation(series.changePct);
  const formattedValue = formatMarketValue(category, series);

  return {
    id: `${category}:${series.key}`,
    stableKey: stableKey || series.key,
    category,
    label: series.label,
    valueText: formattedValue.valueText,
    unitText: formattedValue.unitText,
    period: formatPeriodLabel(series.period),
    delta,
  };
}

export function buildStableMarketLines(edition: OikoEdition | null) {
  const entries = getSeriesEntries(edition);
  if (!entries.length) return [] as OikoMarketLineModel[];

  const stableMap = new Map<string, OikoMarketLineModel>();
  const contextual: OikoMarketLineModel[] = [];

  for (const entry of entries) {
    const stableKey = identifyStableSeriesKey(entry.series);
    const model = toMarketLineModel(entry.category, entry.series, stableKey);
    if (stableKey && !stableMap.has(stableKey)) {
      stableMap.set(stableKey, model);
      continue;
    }
    if (!stableKey) {
      contextual.push(model);
    }
  }

  const stable = STABLE_MARKET_ORDER
    .map((stableKey) => stableMap.get(stableKey))
    .filter((line): line is OikoMarketLineModel => Boolean(line));

  const extras = contextual
    .sort((left, right) => Math.abs(right.delta.rawValue) - Math.abs(left.delta.rawValue))
    .slice(0, 3);

  return [...stable, ...extras];
}

export function buildHeroIntroParagraphs(edition: OikoEdition | null, content: OikoEditionContent | null) {
  const intro = (content?.intro?.paragraphs || [])
    .map((block) => blockToText(block))
    .filter(Boolean)
    .slice(0, 2);

  if (intro.length) return intro;

  return [content?.preview_text, edition?.editorialAngle]
    .map((item) => polishDisplayedCopy(String(item || '')))
    .filter(Boolean)
    .slice(0, 2);
}

export function buildHeroDek(edition: OikoEdition | null, content: OikoEditionContent | null) {
  const preview = polishDisplayedCopy(content?.preview_text || '');
  if (preview && preview !== content?.lead_story?.title) return preview;
  return clampText(edition?.editorialAngle || '', 200);
}

export function buildMenuRows(content: OikoEditionContent | null): OikoSummaryLine[] {
  return (content?.opening_brief?.items || []).slice(0, 4).map((item: OikoMenuItem) => ({
    label: item.label,
    text: clampText(richTextToPlainText({ parts: item.parts || [] }), 170),
  }));
}

export function buildMarketSectionSummary(edition: OikoEdition | null, content: OikoEditionContent | null) {
  return clampText(
    edition?.marketContext?.narrativeHints?.[0]
      || labeledParagraphToText(content?.markets_section?.paragraphs?.[0])
      || CATEGORY_NOTE_FALLBACK.commodities,
    190,
  );
}

export function buildMarketSectionMeta(edition: OikoEdition | null) {
  const context = edition?.marketContext;
  if (!context) return "Lecture reconstruite a partir de l'archive historique.";

  const windowStart = formatTimeLabel(context.windowStart);
  const windowEnd = formatTimeLabel(context.windowEnd);
  if (windowStart && windowEnd) {
    return `Donn\u00e9es de la fen\u00eatre ${windowStart} - ${windowEnd}.`;
  }

  const generatedAt = formatTimeLabel(context.generatedAt);
  return generatedAt ? `Donn\u00e9es mises \u00e0 jour ${generatedAt}.` : '';
}

export function buildMarketFallbackRows(content: OikoEditionContent | null): OikoSummaryLine[] {
  return (content?.markets_section?.paragraphs || [])
    .map((paragraph) => ({
      label: paragraph.label,
      text: clampText(labeledParagraphToText(paragraph), 180),
    }))
    .filter((row) => Boolean(row.text));
}

export function buildLeadSections(content: OikoEditionContent | null): OikoLeadSectionModel[] {
  const paragraphs = (content?.lead_story?.paragraphs || [])
    .map((block) => blockToText(block))
    .filter(Boolean);

  if (!paragraphs.length) return [];

  if (paragraphs.length === 1) {
  return [{ label: 'Pourquoi on en parle ?', paragraphs }];
  }

  if (paragraphs.length === 2) {
    return [
      { label: 'Pourquoi on en parle ?', paragraphs: [paragraphs[0]] },
      { label: 'Bref', paragraphs: [paragraphs[1]] },
    ];
  }

  if (paragraphs.length === 3) {
    return [
      { label: 'Pourquoi on en parle ?', paragraphs: [paragraphs[0]] },
      { label: 'Contexte', paragraphs: [paragraphs[1]] },
      { label: 'Bref', paragraphs: [paragraphs[2]] },
    ];
  }

  const sections: OikoLeadSectionModel[] = [
    { label: 'Pourquoi on en parle ?', paragraphs: paragraphs.slice(0, 2) },
    { label: 'Contexte', paragraphs: paragraphs.slice(2, 4) },
  ];

  const tail = paragraphs.slice(4);
  if (tail.length > 1) {
    sections.push({ label: 'Le probl\u00e8me', paragraphs: tail.slice(0, tail.length - 1) });
    sections.push({ label: 'Bref', paragraphs: tail.slice(-1) });
  } else if (tail.length === 1) {
    sections.push({ label: 'Bref', paragraphs: tail });
  }

  return sections.filter((section) => section.paragraphs.length > 0);
}

export function buildStorySummary(items?: Array<{ paragraphs: OikoRichTextBlock[] }> | null) {
  const firstParagraph = items?.[0]?.paragraphs?.[0];
  return clampText(blockToText(firstParagraph), 180);
}

export function buildBriefRows(content: OikoEditionContent | null) {
  return (content?.briefs_section?.items || [])
    .map((block) => clampText(blockToText(block), 180))
    .filter(Boolean);
}

export function formatMarketRegimeLabel(regime?: string | null) {
  const normalized = String(regime || '').trim().toLowerCase();
  if (!normalized) return '';
  if (normalized === 'risk_off') return 'Risk-off';
  if (normalized === 'risk_on') return 'Risk-on';
  return normalized.replace(/_/g, ' ');
}

export function getEditionSurfaceLabel(edition: OikoEdition | null) {
  if (edition?.sourceKind === 'v3_packet') return '\u00c9dition V3';
  if (edition?.sourceKind === 'legacy_edition') return 'Archive';
  return '\u00c9dition Oiko';
}
