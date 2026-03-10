import { authFetch } from '../utils/authFetch';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_ORIGIN = (() => {
  try {
    return new URL(API_URL).origin;
  } catch (_error) {
    return API_URL;
  }
})();
const MOJIBAKE_PATTERN = new RegExp('(?:\u00c3.|\u00c2.|\u00e2.|\u00ef\u00bf\u00bd|\\u[0-9a-fA-F]{4})');
const UTF8_MOJIBAKE_PATTERN = new RegExp('(?:\u00c3.|\u00c2.|\u00e2.|\u00ef\u00bf\u00bd)');

export function formatOikoDisplayDate(value?: string | null) {
  const normalized = String(value || '').trim();
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return normalized;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}


export interface OikoRichTextPart {
  text: string;
  href?: string;
}

export interface OikoRichTextBlock {
  parts: OikoRichTextPart[];
}

export interface OikoSectionVisual {
  section_key: string;
  asset_type: string;
  image_url: string;
  alt_text: string;
  credit_line: string;
  provider: string;
  source_url?: string;
  width?: number;
  height?: number;
}

export interface OikoMenuItem {
  label: string;
  parts: OikoRichTextPart[];
}

export interface OikoLabeledParagraph {
  label: string;
  parts: OikoRichTextPart[];
}

export interface OikoEditionContent {
  content_version: 'v2.1';
  email_subject: string;
  preview_text: string;
  date_label: string;
  header_visual?: OikoSectionVisual | null;
  intro: {
    paragraphs: OikoRichTextBlock[];
    signature?: string;
  };
  opening_brief: {
    title: string;
    items: OikoMenuItem[];
  };
  markets_section: {
    title: string;
    charts: Array<{ key: 'actions' | 'crypto'; title: string; image_url: string; alt_text: string }>;
    paragraphs: OikoLabeledParagraph[];
  };
  lead_story: {
    kicker: string;
    title: string;
    visual?: OikoSectionVisual | null;
    paragraphs: OikoRichTextBlock[];
    signature?: string;
  };
  radar_section: {
    title: string;
    visual?: OikoSectionVisual | null;
    items: Array<{ title: string; paragraphs: OikoRichTextBlock[] }>;
  };
  carnet_section: {
    title: string;
    visual?: OikoSectionVisual | null;
    items: Array<{ title: string; paragraphs: OikoRichTextBlock[] }>;
  };
  briefs_section: {
    title: string;
    items: OikoRichTextBlock[];
  };
  footer_sources_note: OikoRichTextBlock;
  footer_disclaimer: string;
}

export interface OikoAssetManifestEntry {
  id?: number;
  section_key: string;
  asset_type: string;
  provider: string;
  stored_url: string;
  source_url?: string | null;
  author?: string | null;
  license?: string | null;
  credit_line?: string | null;
  alt_text?: string;
  width?: number | null;
  height?: number | null;
  score?: number;
  fetched_at?: string;
}

export interface OikoEdition {
  editionDate: string;
  displayDate: string;
  slug: string;
  status: string;
  contentVersion: 'v1' | 'v2' | 'v2.1';
  editorialAngle: string;
  marketRegime: string;
  evidenceCoverageScore: number;
  sentAt: string | null;
  createdAt: string | null;
  chartManifest: Array<{ key: string; fileName?: string; url: string }>;
  assetManifest: OikoAssetManifestEntry[];
  emailHtmlUrl?: string;
  content: OikoEditionContent | null;
}

export interface OikoArchiveEntry {
  editionDate: string;
  displayDate: string;
  slug: string;
  status: string;
  contentVersion: 'v1' | 'v2' | 'v2.1';
  editorialAngle: string;
  marketRegime: string;
  evidenceCoverageScore: number;
  intro: string;
  emailSubject: string;
  summary: string[];
}

export interface OikoSubscription {
  subscribed: boolean;
  status: string;
  consentSource: string | null;
  subscribedAt: string | null;
  email: string | null;
}

function decodeEscapedUnicode(text: string) {
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_match, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
}

function repairUtf8Mojibake(text: string) {
  if (!UTF8_MOJIBAKE_PATTERN.test(text)) return text;
  if (Array.from(text).some((char) => char.charCodeAt(0) > 255)) return text;

  try {
    const bytes = Uint8Array.from(Array.from(text, (char) => char.charCodeAt(0)));
    const repaired = new TextDecoder('utf-8').decode(bytes);
    return repaired.includes('\uFFFD') ? text : repaired;
  } catch (_error) {
    return text;
  }
}

function normalizeText(value?: string | null) {
  if (typeof value !== 'string') return '';
  return MOJIBAKE_PATTERN.test(value)
    ? repairUtf8Mojibake(decodeEscapedUnicode(value))
    : value;
}

function normalizeAssetUrl(url?: string | null) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith('/static/oiko-news/')) {
      return new URL(`${parsed.pathname}${parsed.search}${parsed.hash}`, API_ORIGIN).toString();
    }
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '0.0.0.0') {
      return new URL(`${parsed.pathname}${parsed.search}${parsed.hash}`, API_ORIGIN).toString();
    }
    return parsed.toString();
  } catch (_error) {
    try {
      return new URL(url, API_ORIGIN).toString();
    } catch (_innerError) {
      return url;
    }
  }
}

function normalizeParts(parts?: OikoRichTextPart[]) {
  return Array.isArray(parts)
    ? parts.filter((part) => Boolean(part?.text)).map((part) => ({
        text: normalizeText(part.text),
        ...(part.href ? { href: normalizeAssetUrl(part.href) } : {}),
      }))
    : [];
}

function normalizeBlock(block?: OikoRichTextBlock | null): OikoRichTextBlock {
  return { parts: normalizeParts(block?.parts) };
}

function normalizeVisual(visual?: any): OikoSectionVisual | null {
  if (!visual) return null;
  const imageUrl = normalizeAssetUrl(String(visual.image_url || visual.stored_url || visual.url || ''));
  if (!imageUrl) return null;

  return {
    section_key: normalizeText(String(visual.section_key || '')),
    asset_type: normalizeText(String(visual.asset_type || '')),
    image_url: imageUrl,
    alt_text: normalizeText(String(visual.alt_text || visual.alt || '')),
    credit_line: normalizeText(String(visual.credit_line || '')),
    provider: normalizeText(String(visual.provider || 'unknown')),
    source_url: visual.source_url ? normalizeAssetUrl(String(visual.source_url)) : undefined,
    width: typeof visual.width === 'number' ? visual.width : undefined,
    height: typeof visual.height === 'number' ? visual.height : undefined,
  };
}

function firstStoryParagraphs(story: any): OikoRichTextBlock[] {
  if (Array.isArray(story?.paragraphs) && story.paragraphs.length > 0) {
    if (story.paragraphs[0]?.parts) {
      return story.paragraphs.map(normalizeBlock);
    }
    return story.paragraphs.map((paragraph: string) => ({ parts: [{ text: normalizeText(paragraph) }] }));
  }

  return [story?.what_happened, story?.why_it_matters, story?.concept]
    .filter(Boolean)
    .map((paragraph: string) => ({ parts: [{ text: normalizeText(paragraph) }] }));
}

function buildArchiveIntro(raw: any, editorialAngle: string) {
  return [normalizeText(raw?.intro), normalizeText(editorialAngle)]
    .filter(Boolean)
    .slice(0, 2)
    .map((text) => ({ parts: [{ text }] }));
}

function adaptLegacyToV21(raw: any, edition: Pick<OikoEdition, 'editionDate' | 'displayDate' | 'editorialAngle' | 'chartManifest' | 'assetManifest'>): OikoEditionContent | null {
  if (!raw) return null;

  const chartMap = new Map<string, string>((edition.chartManifest || []).map((item) => [item.key, item.url]));
  const assetMap = new Map<string, OikoSectionVisual | null>((edition.assetManifest || []).map((asset) => [asset.section_key, normalizeVisual(asset)]));
  const stories = Array.isArray(raw.stories) ? raw.stories : [];
  const briefs = Array.isArray(raw.briefs) ? raw.briefs : [];
  const lead = stories[0] || { title: edition.editorialAngle || 'Le grand angle', paragraphs: [] };
  const radarStories = stories.slice(1, 5).map((story: any) => ({ title: story.title, paragraphs: firstStoryParagraphs(story).slice(0, 2) }));
  const carnetItems = briefs.slice(0, 3).map((brief: any) => ({ title: brief.title, paragraphs: [{ parts: [{ text: normalizeText(brief.text) }] }] }));
  const openingBrief = (Array.isArray(raw.summary) ? raw.summary : []).slice(0, 4).map((item: string, index: number) => ({
    label: ['BCE', '\u00c9tats-Unis', '\u00c9nergie', 'Commerce'][index] || '\u00c0 suivre',
    parts: [{ text: normalizeText(item) }],
  }));

  const sourceFootnote = Array.isArray(raw.sources_footnotes)
    ? raw.sources_footnotes.map((source: any, index: number) => ({
        text: `${normalizeText(source.source_name)}${index < raw.sources_footnotes.length - 1 ? ', ' : ''}`,
        href: source.url,
      }))
    : [{ text: 'Sources int\u00e9gr\u00e9es dans les liens du texte.' }];

  return {
    content_version: 'v2.1',
    email_subject: normalizeText(raw.email_subject) || `Oiko News \u2014 ${normalizeText(edition.editionDate)}`,
    preview_text: normalizeText(raw.intro) || 'Oiko News',
    date_label: edition.displayDate,
    header_visual: assetMap.get('header_visual') ?? null,
    intro: {
      paragraphs: buildArchiveIntro(raw, edition.editorialAngle),
      signature: 'Archives Oiko',
    },
    opening_brief: {
      title: '\u00c0 l\u2019ouverture',
      items: openingBrief,
    },
    markets_section: {
      title: 'Sur les march\u00e9s',
      charts: ['actions', 'crypto']
        .filter((key) => chartMap.has(key))
        .map((key) => ({
          key: key as 'actions' | 'crypto',
          title: key === 'actions' ? 'Bourse' : 'Crypto',
          image_url: normalizeAssetUrl(chartMap.get(key)),
          alt_text: key === 'actions' ? '\u00c9volution r\u00e9cente des march\u00e9s actions' : '\u00c9volution r\u00e9cente du march\u00e9 crypto',
        })),
      paragraphs: Array.isArray(raw.markets?.paragraphs)
        ? raw.markets.paragraphs.slice(0, 3).map((paragraph: string, index: number) => ({
            label: (['March\u00e9s', 'Valeur', 'Crypto'][index] || 'March\u00e9s') as 'March\u00e9s' | 'Valeur' | 'Crypto',
            parts: [{ text: normalizeText(paragraph) }],
          }))
        : [
            { label: 'March\u00e9s', parts: [{ text: normalizeText(raw.markets?.intro) || 'March\u00e9s actions ferm\u00e9s, derni\u00e8re cl\u00f4ture disponible.' }] },
            { label: 'Valeur', parts: [{ text: 'Le nouveau format n\u2019\u00e9tait pas encore actif sur cette \u00e9dition.' }] },
            { label: 'Crypto', parts: [{ text: 'La lecture crypto reste disponible dans l\u2019archive historique.' }] },
          ],
    },
    lead_story: {
      kicker: normalizeText(lead.kicker) || 'Le grand angle',
      title: normalizeText(lead.title),
      visual: assetMap.get('lead_story') ?? null,
      paragraphs: firstStoryParagraphs(lead).slice(0, 8),
      signature: 'Archives Oiko',
    },
    radar_section: {
      title: 'Le radar',
      visual: assetMap.get('radar_section') ?? null,
      items: radarStories,
    },
    carnet_section: {
      title: 'Le carnet',
      visual: assetMap.get('carnet_section') ?? null,
      items: carnetItems,
    },
    briefs_section: {
      title: 'En bref',
      items: briefs.slice(0, 5).map((brief: any) => ({ parts: [{ text: `${normalizeText(brief.title)} \u2014 ${normalizeText(brief.text)}` }] })),
    },
    footer_sources_note: { parts: sourceFootnote },
    footer_disclaimer: normalizeText(raw.footer_disclaimer) || 'Contenu p\u00e9dagogique. Pas de conseil en investissement.',
  };
}

function normalizeModernContent(raw: any, edition: Pick<OikoEdition, 'assetManifest'>): OikoEditionContent | null {
  if (!raw) return null;

  const assetMap = new Map<string, OikoSectionVisual | null>((edition.assetManifest || []).map((asset) => [asset.section_key, normalizeVisual(asset)]));
  const isV21 = raw.content_version === 'v2.1';

  return {
    content_version: 'v2.1',
    email_subject: normalizeText(raw.email_subject),
    preview_text: normalizeText(raw.preview_text),
    date_label: normalizeText(raw.date_label),
    header_visual: normalizeVisual(raw.header_visual) ?? assetMap.get('header_visual') ?? null,
    intro: {
      paragraphs: Array.isArray(raw.intro?.paragraphs) ? raw.intro.paragraphs.map(normalizeBlock) : [],
      signature: normalizeText(raw.intro?.signature),
    },
    opening_brief: {
      title: isV21 ? normalizeText(raw.opening_brief?.title) || '\u00c0 l\u2019ouverture' : '\u00c0 l\u2019ouverture',
      items: isV21
        ? (Array.isArray(raw.opening_brief?.items) ? raw.opening_brief.items.map((item: any) => ({ label: normalizeText(item.label), parts: normalizeParts(item.parts) })) : [])
        : (Array.isArray(raw.menu_of_the_day) ? raw.menu_of_the_day.map((item: any) => ({ label: normalizeText(item.label), parts: normalizeParts(item.parts) })) : []),
    },
    markets_section: {
      title: normalizeText(raw.markets_section?.title) || 'Sur les march\u00e9s',
      charts: Array.isArray(raw.markets_section?.charts)
        ? raw.markets_section.charts.map((chart: any) => ({
            key: chart.key,
            title: normalizeText(chart.title),
            image_url: normalizeAssetUrl(chart.image_url),
            alt_text: normalizeText(chart.alt_text),
          }))
        : [],
      paragraphs: Array.isArray(raw.markets_section?.paragraphs)
        ? raw.markets_section.paragraphs.map((paragraph: any) => ({ label: normalizeText(paragraph.label), parts: normalizeParts(paragraph.parts) }))
        : [],
    },
    lead_story: {
      kicker: normalizeText(raw.lead_story?.kicker),
      title: normalizeText(raw.lead_story?.title),
      visual: normalizeVisual(raw.lead_story?.visual) ?? assetMap.get('lead_story') ?? null,
      paragraphs: Array.isArray(raw.lead_story?.paragraphs) ? raw.lead_story.paragraphs.map(normalizeBlock) : [],
      signature: normalizeText(raw.lead_story?.signature),
    },
    radar_section: {
      title: normalizeText(raw.radar_section?.title) || 'Le radar',
      visual: normalizeVisual(raw.radar_section?.visual) ?? assetMap.get('radar_section') ?? null,
      items: Array.isArray(raw.radar_section?.items)
        ? raw.radar_section.items.map((item: any) => ({
            title: normalizeText(item.title),
            paragraphs: Array.isArray(item.paragraphs) ? item.paragraphs.map(normalizeBlock) : [],
          }))
        : [],
    },
    carnet_section: {
      title: normalizeText(raw.carnet_section?.title) || 'Le carnet',
      visual: normalizeVisual(raw.carnet_section?.visual) ?? assetMap.get('carnet_section') ?? null,
      items: Array.isArray(raw.carnet_section?.items)
        ? raw.carnet_section.items.map((item: any) => ({
            title: normalizeText(item.title),
            paragraphs: Array.isArray(item.paragraphs) ? item.paragraphs.map(normalizeBlock) : [],
          }))
        : [],
    },
    briefs_section: {
      title: isV21 ? normalizeText(raw.briefs_section?.title) || 'En bref' : 'En bref',
      items: isV21
        ? (Array.isArray(raw.briefs_section?.items) ? raw.briefs_section.items.map(normalizeBlock) : [])
        : (Array.isArray(raw.more_news_section?.items) ? raw.more_news_section.items.map(normalizeBlock) : []),
    },
    footer_sources_note: normalizeBlock(raw.footer_sources_note),
    footer_disclaimer: normalizeText(raw.footer_disclaimer) || 'Contenu p\u00e9dagogique. Pas de conseil en investissement.',
  };
}

function normalizeArchiveEntry(raw: any): OikoArchiveEntry {
  const editionDate = normalizeText(raw.editionDate);
  return {
    editionDate,
    displayDate: formatOikoDisplayDate(editionDate),
    slug: raw.slug,
    status: raw.status,
    contentVersion: raw.contentVersion || 'v1',
    editorialAngle: normalizeText(raw.editorialAngle),
    marketRegime: normalizeText(raw.marketRegime),
    evidenceCoverageScore: raw.evidenceCoverageScore || 0,
    intro: normalizeText(raw.intro),
    emailSubject: normalizeText(raw.emailSubject),
    summary: Array.isArray(raw.summary) ? raw.summary.map((item: string) => normalizeText(item)) : [],
  };
}

function normalizeEdition(raw: any): OikoEdition | null {
  if (!raw) return null;

  const chartManifest = Array.isArray(raw.chartManifest)
    ? raw.chartManifest.map((item: { key: string; fileName?: string; url: string }) => ({
        ...item,
        url: normalizeAssetUrl(item.url),
      }))
    : [];

  const assetManifest: OikoAssetManifestEntry[] = Array.isArray(raw.assetManifest)
    ? raw.assetManifest.map((asset: any) => ({
        ...asset,
        stored_url: normalizeAssetUrl(asset.stored_url),
        source_url: asset.source_url ? normalizeAssetUrl(asset.source_url) : null,
      }))
    : [];

  const editionDate = normalizeText(raw.editionDate);

  const editionBase: Pick<OikoEdition, 'editionDate' | 'displayDate' | 'editorialAngle' | 'chartManifest' | 'assetManifest'> = {
    editionDate,
    displayDate: formatOikoDisplayDate(editionDate),
    editorialAngle: normalizeText(raw.editorialAngle),
    chartManifest,
    assetManifest,
  };

  const content = raw.content?.content_version === 'v2.1' || raw.content?.content_version === 'v2'
    ? normalizeModernContent(raw.content, editionBase)
    : adaptLegacyToV21(raw.content, editionBase);

  return {
    editionDate,
    displayDate: formatOikoDisplayDate(editionDate),
    slug: raw.slug,
    status: raw.status,
    contentVersion: raw.contentVersion || 'v1',
    editorialAngle: normalizeText(raw.editorialAngle),
    marketRegime: normalizeText(raw.marketRegime),
    evidenceCoverageScore: raw.evidenceCoverageScore || 0,
    sentAt: raw.sentAt || null,
    createdAt: raw.createdAt || null,
    chartManifest,
    assetManifest,
    emailHtmlUrl: raw.emailHtmlUrl ? normalizeAssetUrl(raw.emailHtmlUrl) : undefined,
    content,
  };
}

export function getOikoEmailPreviewUrl(slug: string) {
  return `${API_URL}/api/oiko-news/${slug}/email-html`;
}

export async function getLatestOikoEdition(): Promise<OikoEdition | null> {
  const response = await fetch(`${API_URL}/api/oiko-news/latest`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch latest Oiko edition');
  const data = await response.json();
  return normalizeEdition(data.edition);
}

export async function getOikoArchive(page = 1, pageSize = 10): Promise<{ page: number; pageSize: number; editions: OikoArchiveEntry[] }> {
  const response = await fetch(`${API_URL}/api/oiko-news/archive?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Failed to fetch Oiko archive');
  const data = await response.json();
  return {
    page: data.page || page,
    pageSize: data.pageSize || pageSize,
    editions: Array.isArray(data.editions) ? data.editions.map(normalizeArchiveEntry) : [],
  };
}

export async function getOikoEditionBySlug(slug: string): Promise<OikoEdition | null> {
  const response = await fetch(`${API_URL}/api/oiko-news/${slug}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch Oiko edition');
  const data = await response.json();
  return normalizeEdition(data.edition);
}

export async function getMyOikoSubscription(): Promise<OikoSubscription | null> {
  const response = await authFetch(`${API_URL}/api/oiko-news/subscription/me`);
  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Failed to fetch Oiko subscription');
  const data = await response.json();
  return data.subscription ?? null;
}

export async function updateMyOikoSubscription(subscribed: boolean, consentSource = 'page'): Promise<OikoSubscription> {
  const response = await authFetch(`${API_URL}/api/oiko-news/subscription/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscribed, consentSource }),
  });
  if (!response.ok) throw new Error('Failed to update Oiko subscription');
  const data = await response.json();
  return data.subscription;
}

export async function unsubscribeFromOiko(token: string) {
  const response = await fetch(`${API_URL}/api/oiko-news/unsubscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  if (!response.ok) throw new Error('Failed to unsubscribe from Oiko News');
  return response.json();
}

export function richTextToPlainText(block?: OikoRichTextBlock | null) {
  return Array.isArray(block?.parts) ? block.parts.map((part) => part.text).join('').trim() : '';
}