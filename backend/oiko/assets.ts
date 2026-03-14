import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Canvas } from 'skia-canvas';
import OIKO_CONFIG from './config.ts';
import { trackOikoApiUsage } from './usage.ts';
import { ensureDir, normalizeTitle, slugify, titleSimilarity, toAbsoluteUrl } from './utils.ts';

type ImageStyleHint = 'sobriety' | 'documentary' | 'business' | 'innovation';

type SectionImageSpec = {
  sectionKey: 'header_visual' | 'lead_story' | 'radar_section' | 'carnet_section';
  assetType: 'header' | 'lead_image' | 'radar_image' | 'carnet_image';
  topicFamily?: string;
  altText: string;
  geoHint?: string;
  entityHint?: string;
  imageStyleHint?: ImageStyleHint;
  titleHint?: string;
  preferDocumentary?: boolean;
};

type ImageCandidate = {
  provider: string;
  sourceUrl: string;
  imageUrl: string;
  author?: string;
  license?: string;
  creditLine: string;
  width?: number;
  height?: number;
  score: number;
};

type ResolvedAsset = {
  section_key: string;
  asset_type: string;
  provider: string;
  source_url?: string;
  stored_url: string;
  author?: string;
  license?: string;
  credit_line: string;
  alt_text: string;
  width?: number;
  height?: number;
  score: number;
  fetched_at: string;
};

const BRAND_COLORS: Record<string, { bg: string; accent: string }> = {
  header_visual: { bg: '#0f172a', accent: '#f59e0b' },
  lead_story: { bg: '#111827', accent: '#10b981' },
  radar_section: { bg: '#1f2937', accent: '#0ea5e9' },
  carnet_section: { bg: '#111827', accent: '#ef4444' },
};

function getImagesDir(editionDate: string) {
  return path.join(OIKO_CONFIG.staticDir, 'images', editionDate);
}

function buildSectionQuery(spec: SectionImageSpec) {
  const parts = [spec.entityHint, spec.geoHint, spec.titleHint, spec.topicFamily]
    .map((value) => String(value || '').trim())
    .filter(Boolean);

  const styleTail = spec.imageStyleHint === 'documentary'
    ? 'editorial documentary exterior'
    : spec.imageStyleHint === 'innovation'
      ? 'innovation business technology'
      : spec.imageStyleHint === 'sobriety'
        ? 'economic editorial sober'
        : 'business editorial';

  return `${parts.join(' ')} ${styleTail}`.trim();
}

function normalizeText(value: string) {
  return String(value || '').toLowerCase();
}

function guessLandscapeBonus(width?: number, height?: number) {
  if (!width || !height) return 0;
  return width >= height ? 12 : -18;
}

function guessSizeBonus(width?: number, height?: number) {
  if (!width || !height) return 0;
  if (width >= 1200 && height >= 630) return 12;
  if (width >= 800 && height >= 450) return 6;
  return -12;
}

function semanticScore(spec: SectionImageSpec, haystack: string) {
  const text = normalizeText(haystack);
  let score = 0;
  for (const token of [spec.entityHint, spec.geoHint, spec.titleHint, spec.topicFamily]) {
    const value = normalizeText(token || '');
    if (!value) continue;
    const words = value.split(/\s+/).filter(Boolean);
    if (words.some((word) => text.includes(word))) {
      score += 8;
    }
  }
  if (spec.preferDocumentary && /(building|headquarters|central bank|parliament|government|flag|city)/.test(text)) {
    score += 10;
  }
  if (/(watermark|shutterstock|getty)/.test(text)) {
    score -= 30;
  }
  if (/(teamwork|laptop|office meeting|handshake|smile)/.test(text) && spec.imageStyleHint === 'documentary') {
    score -= 12;
  }
  return score;
}

function scoreCandidate(spec: SectionImageSpec, candidate: Omit<ImageCandidate, 'score'>, haystack: string) {
  let score = 40;
  score += guessLandscapeBonus(candidate.width, candidate.height);
  score += guessSizeBonus(candidate.width, candidate.height);
  score += semanticScore(spec, haystack);
  if (spec.preferDocumentary && candidate.provider === 'wikimedia') score += 14;
  if (!spec.preferDocumentary && (candidate.provider === 'pixabay' || candidate.provider === 'pexels')) score += 6;
  return Number(score.toFixed(2));
}

function extensionFromContentType(contentType?: string | null) {
  const value = String(contentType || '').toLowerCase();
  if (value.includes('png')) return 'png';
  if (value.includes('webp')) return 'webp';
  if (value.includes('svg')) return 'svg';
  return 'jpg';
}

function inferAltText(spec: SectionImageSpec) {
  const text = `${spec.titleHint || ''} ${spec.entityHint || ''} ${spec.geoHint || ''}`.toLowerCase();

  if (spec.sectionKey === 'header_visual') {
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
    return 'Conteneurs, portiques douaniers et zone logistique';
  }
  if (/(allemagne|berlin|industrie|usine)/.test(text)) {
    return 'Site industriel europ\u00e9en et lignes de production';
  }
  if (spec.sectionKey === 'radar_section') {
    return '\u00c9crans de march\u00e9 et fils d\u2019actualit\u00e9 macro\u00e9conomique';
  }
  if (spec.sectionKey === 'carnet_section') {
    return 'Agenda \u00e9conomique, dossiers d\u2019entreprise et notes de march\u00e9';
  }
  return 'Dossiers \u00e9conomiques et indicateurs macro\u00e9conomiques';
}

function sanitizeAltText(spec: SectionImageSpec, rawAltText?: string) {
  const candidate = String(rawAltText || '').trim();
  const inferred = inferAltText(spec);
  if (!candidate) return inferred;
  if (titleSimilarity(candidate, spec.titleHint || '') >= 0.72) return inferred;
  if (normalizeTitle(candidate) === normalizeTitle(spec.entityHint || '')) return inferred;
  return candidate;
}

async function downloadBinary(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type');
  return { buffer, contentType };
}

async function fetchJson<T = any>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function getWikimediaHeaders() {
  const userAgent = process.env.WIKIMEDIA_USER_AGENT || 'OikoNews/1.0 (https://oiko.example; admin@oiko.example)';
  return {
    'Api-User-Agent': userAgent,
    'User-Agent': userAgent,
  };
}

async function fetchPixabayCandidates(query: string, spec: SectionImageSpec, editionDate: string): Promise<ImageCandidate[]> {
  if (!process.env.PIXABAY_API_KEY) return [];
  const params = new URLSearchParams({
    key: process.env.PIXABAY_API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '6',
  });
  const data = await fetchJson(`https://pixabay.com/api/?${params.toString()}`);
  const hits = Array.isArray(data?.hits) ? data.hits : [];
  trackOikoApiUsage('pixabay', { usageDate: editionDate, requests: 1, results: hits.length });
  return hits.map((hit: any) => {
    const candidate = {
      provider: 'pixabay',
      sourceUrl: hit.pageURL,
      imageUrl: hit.largeImageURL || hit.webformatURL,
      author: hit.user,
      license: 'Pixabay License',
      creditLine: `Cr\u00e9dit : Pixabay / ${hit.user || 'contributor'}`,
      width: Number(hit.imageWidth || hit.webformatWidth || 0),
      height: Number(hit.imageHeight || hit.webformatHeight || 0),
    };
    return {
      ...candidate,
      score: scoreCandidate(spec, candidate, `${hit.tags || ''} ${hit.user || ''}`),
    };
  });
}

async function fetchPexelsCandidates(query: string, spec: SectionImageSpec, editionDate: string): Promise<ImageCandidate[]> {
  if (!process.env.PEXELS_API_KEY) return [];
  const params = new URLSearchParams({ query, orientation: 'landscape', per_page: '6' });
  const data = await fetchJson(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: { Authorization: process.env.PEXELS_API_KEY },
  });
  const photos = Array.isArray(data?.photos) ? data.photos : [];
  trackOikoApiUsage('pexels', { usageDate: editionDate, requests: 1, results: photos.length });
  return photos.map((photo: any) => {
    const candidate = {
      provider: 'pexels',
      sourceUrl: photo.url,
      imageUrl: photo.src?.landscape || photo.src?.large2x || photo.src?.large || photo.src?.original,
      author: photo.photographer,
      license: 'Pexels License',
      creditLine: `Cr\u00e9dit : Pexels / ${photo.photographer || 'photographer'}`,
      width: Number(photo.width || 0),
      height: Number(photo.height || 0),
    };
    return {
      ...candidate,
      score: scoreCandidate(spec, candidate, `${photo.alt || ''} ${photo.photographer || ''}`),
    };
  });
}

async function fetchWikimediaCandidates(query: string, spec: SectionImageSpec, editionDate: string): Promise<ImageCandidate[]> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: query,
    gsrlimit: '6',
    gsrnamespace: '6',
    prop: 'imageinfo|info',
    inprop: 'url',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '1600',
    origin: '*',
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {
    headers: getWikimediaHeaders(),
  });
  const pages = Object.values(data?.query?.pages || {}) as any[];
  trackOikoApiUsage('wikimedia', { usageDate: editionDate, requests: 1, results: pages.length });
  return pages.map((page) => {
    const info = Array.isArray(page.imageinfo) ? page.imageinfo[0] : null;
    const metadata = info?.extmetadata || {};
    const artist = metadata.Artist?.value?.replace(/<[^>]+>/g, '') || metadata.Credit?.value?.replace(/<[^>]+>/g, '') || 'Wikimedia contributor';
    const license = metadata.LicenseShortName?.value || 'Wikimedia Commons';
    const candidate = {
      provider: 'wikimedia',
      sourceUrl: page.fullurl || info?.descriptionurl,
      imageUrl: info?.thumburl || info?.url,
      author: artist,
      license,
      creditLine: `Cr\u00e9dit : Wikimedia Commons / ${artist}`,
      width: Number(info?.thumbwidth || info?.width || 0),
      height: Number(info?.thumbheight || info?.height || 0),
    };
    return {
      ...candidate,
      score: scoreCandidate(spec, candidate, `${page.title || ''} ${artist} ${license}`),
    };
  }).filter((candidate) => Boolean(candidate.imageUrl));
}

function compactVisualText(value: string, maxLength = 180) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const slice = normalized.slice(0, maxLength + 1);
  const cut = slice.lastIndexOf(' ');
  return `${(cut > Math.max(28, maxLength - 28) ? slice.slice(0, cut) : normalized.slice(0, maxLength)).trim().replace(/[,:;]+$/, '')}…`;
}

function fallbackEyebrow(spec: SectionImageSpec) {
  switch (spec.sectionKey) {
    case 'header_visual':
      return 'Édition du jour';
    case 'lead_story':
      return 'Grand angle';
    case 'radar_section':
      return 'Sous la surface';
    case 'carnet_section':
      return "Point d'appui";
    default:
      return 'Oiko News';
  }
}

function fallbackSummary(spec: SectionImageSpec) {
  const subject = compactVisualText(spec.entityHint || spec.titleHint || '', 72);
  switch (spec.sectionKey) {
    case 'header_visual':
      return subject ? `Ouverture éditoriale sur ${subject}.` : 'Ouverture éditoriale sur les lignes de force du matin.';
    case 'lead_story':
      return subject ? `Grand angle sur ${subject}.` : 'Grand angle sur le thème qui porte réellement la séance.';
    case 'radar_section':
      return subject ? `${subject} éclaire les signaux qui gagnent en importance sous la surface.` : 'Lecture des signaux qui gagnent en importance sous la surface.';
    case 'carnet_section':
      return subject ? `${subject} sert de point d'appui pour lire ce qui s'installe dans la durée.` : "Point d'appui pour lire ce qui s'installe dans la durée.";
    default:
      return 'Carte éditoriale Oiko News.';
  }
}

function buildFallbackCardCopy(spec: SectionImageSpec) {
  const title = compactVisualText(spec.titleHint || spec.entityHint || 'Oiko News', 64);
  const summary = compactVisualText(spec.altText || fallbackSummary(spec), 190) || fallbackSummary(spec);
  return {
    eyebrow: fallbackEyebrow(spec),
    title,
    summary,
    creditLine: 'Carte éditoriale Oiko News',
  };
}

function drawWrappedText(ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 3) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) break;
  }

  if (current && lines.length < maxLines) {
    const remainingWords = words.slice(lines.join(' ').split(/\s+/).filter(Boolean).length);
    const tail = remainingWords.length && lines.length === maxLines - 1 ? compactVisualText([current, ...remainingWords].join(' '), 96) : current;
    lines.push(tail);
  }

  lines.filter(Boolean).forEach((line, index) => {
    ctx.fillText(line, x, y + (index * lineHeight), maxWidth);
  });

  return y + Math.max(0, lines.length - 1) * lineHeight;
}

async function buildFallbackVisual(editionDate: string, spec: SectionImageSpec): Promise<ResolvedAsset> {
  const imageDir = getImagesDir(editionDate);
  ensureDir(imageDir);
  const colors = BRAND_COLORS[spec.sectionKey] || BRAND_COLORS.header_visual;
  const fileName = `${spec.sectionKey}-fallback.png`;
  const filePath = path.join(imageDir, fileName);
  const altText = sanitizeAltText(spec, spec.altText);
  const copy = buildFallbackCardCopy({ ...spec, altText });

  const canvas = new Canvas(1600, 900);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, 1600, 900);

  ctx.fillStyle = `${colors.accent}18`;
  ctx.beginPath();
  ctx.arc(1260, 160, 250, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1600, 12);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 34px Arial';
  ctx.fillText(copy.eyebrow, 116, 144);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 88px Georgia';
  const titleBottom = drawWrappedText(ctx, copy.title, 110, 278, 980, 94, 3);
  ctx.fillStyle = '#dbe4f0';
  ctx.font = '400 40px Arial';
  const summaryY = titleBottom + 94;
  drawWrappedText(ctx, copy.summary, 116, summaryY, 1100, 54, 4);

  ctx.fillStyle = `${colors.accent}33`;
  ctx.fillRect(110, 720, 520, 2);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '400 28px Arial';
  ctx.fillText(copy.creditLine, 110, 786);

  const buffer = await canvas.toBuffer('png');
  fs.writeFileSync(filePath, buffer);

  return {
    section_key: spec.sectionKey,
    asset_type: spec.assetType,
    provider: 'oiko-fallback',
    stored_url: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/static/oiko-news/images/${editionDate}/${fileName}`),
    author: 'Oiko News',
    license: 'Internal editorial card',
    credit_line: copy.creditLine,
    alt_text: altText,
    width: 1600,
    height: 900,
    score: 100,
    fetched_at: new Date().toISOString(),
  };
}

async function storeExternalAsset(editionDate: string, spec: SectionImageSpec, candidate: ImageCandidate): Promise<ResolvedAsset> {
  const imageDir = getImagesDir(editionDate);
  ensureDir(imageDir);
  const download = await downloadBinary(candidate.imageUrl);
  const extension = extensionFromContentType(download.contentType);
  const fileName = `${spec.sectionKey}-${slugify(candidate.provider)}-${crypto.createHash('md5').update(candidate.imageUrl).digest('hex').slice(0, 8)}.${extension}`;
  const filePath = path.join(imageDir, fileName);
  const altText = sanitizeAltText(spec, spec.altText);
  fs.writeFileSync(filePath, download.buffer);

  return {
    section_key: spec.sectionKey,
    asset_type: spec.assetType,
    provider: candidate.provider,
    source_url: candidate.sourceUrl,
    stored_url: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/static/oiko-news/images/${editionDate}/${fileName}`),
    author: candidate.author,
    license: candidate.license,
    credit_line: candidate.creditLine,
    alt_text: altText,
    width: candidate.width,
    height: candidate.height,
    score: candidate.score,
    fetched_at: new Date().toISOString(),
  };
}

async function resolveSectionAsset(editionDate: string, spec: SectionImageSpec): Promise<ResolvedAsset> {
  const query = buildSectionQuery(spec);
  const candidates: ImageCandidate[] = [];

  if (spec.preferDocumentary) {
    try {
      candidates.push(...(await fetchWikimediaCandidates(query, spec, editionDate)));
    } catch (_error) {
      // Ignore provider errors and keep fallback chain alive.
    }
  }

  try {
    candidates.push(...(await fetchPixabayCandidates(query, spec, editionDate)));
  } catch (_error) {
    // Ignore provider errors and keep fallback chain alive.
  }

  try {
    candidates.push(...(await fetchPexelsCandidates(query, spec, editionDate)));
  } catch (_error) {
    // Ignore provider errors and keep fallback chain alive.
  }

  const best = candidates
    .filter((candidate) => candidate.imageUrl && candidate.score >= 58)
    .sort((a, b) => b.score - a.score)[0];

  if (!best) {
    return buildFallbackVisual(editionDate, spec);
  }

  try {
    return await storeExternalAsset(editionDate, spec, best);
  } catch (_error) {
    return buildFallbackVisual(editionDate, spec);
  }
}

export function buildSectionImageSpecs(editionDate: string, payload: any, context: any): SectionImageSpec[] {
  const topStories = context?.selection?.topStories || [];
  const briefs = context?.selection?.briefs || [];
  const leadStory = topStories[0] || {};
  const radarStory = topStories[1] || topStories[2] || {};
  const carnetStory = briefs[0] || topStories[3] || {};
  const editorialAngle = payload?.lead_story?.title || context?.editorialAngle || `Oiko News ${editionDate}`;

  const specs: SectionImageSpec[] = [
    {
      sectionKey: 'header_visual',
      assetType: 'header',
      topicFamily: leadStory.topic_family,
      altText: payload.header_visual?.alt_text || 'Salle de march\u00e9, presse \u00e9conomique et \u00e9crans au lever du jour',
      geoHint: payload.header_visual?.geo_hint || '',
      entityHint: payload.header_visual?.entity_hint || editorialAngle,
      imageStyleHint: payload.header_visual?.image_style_hint || 'sobriety',
      titleHint: editorialAngle,
      preferDocumentary: false,
    },
    {
      sectionKey: 'lead_story',
      assetType: 'lead_image',
      topicFamily: leadStory.topic_family,
      altText: payload.lead_story?.visual_hint?.alt_text || '',
      geoHint: payload.lead_story?.visual_hint?.geo_hint || '',
      entityHint: payload.lead_story?.visual_hint?.entity_hint || leadStory.title || payload.lead_story?.title,
      imageStyleHint: payload.lead_story?.visual_hint?.image_style_hint || 'documentary',
      titleHint: payload.lead_story?.title,
      preferDocumentary: ['inflation_rates', 'europe_euro_area', 'budget_debt_fiscal', 'institutions'].includes(leadStory.topic_family),
    },
    {
      sectionKey: 'radar_section',
      assetType: 'radar_image',
      topicFamily: radarStory.topic_family,
      altText: payload.radar_section?.visual_hint?.alt_text || '',
      geoHint: payload.radar_section?.visual_hint?.geo_hint || '',
      entityHint: payload.radar_section?.visual_hint?.entity_hint || radarStory.title || payload.radar_section?.title,
      imageStyleHint: payload.radar_section?.visual_hint?.image_style_hint || 'business',
      titleHint: radarStory.title || payload.radar_section?.title,
      preferDocumentary: false,
    },
    {
      sectionKey: 'carnet_section',
      assetType: 'carnet_image',
      topicFamily: carnetStory.topic_family,
      altText: payload.carnet_section?.visual_hint?.alt_text || '',
      geoHint: payload.carnet_section?.visual_hint?.geo_hint || '',
      entityHint: payload.carnet_section?.visual_hint?.entity_hint || carnetStory.title || payload.carnet_section?.title,
      imageStyleHint: payload.carnet_section?.visual_hint?.image_style_hint || 'innovation',
      titleHint: carnetStory.title || payload.carnet_section?.title,
      preferDocumentary: false,
    },
  ];

  return specs.map((spec): SectionImageSpec => ({
    ...spec,
    altText: sanitizeAltText(spec, spec.altText),
  }));
}

export async function resolveEditionAssets({ editionDate, payload, context }: { editionDate: string; payload: any; context: any }) {
  const specs = buildSectionImageSpecs(editionDate, payload, context);
  const resolved = await Promise.all(specs.map((spec) => resolveSectionAsset(editionDate, spec)));
  return resolved;
}

export default {
  buildSectionImageSpecs,
  resolveEditionAssets,
};