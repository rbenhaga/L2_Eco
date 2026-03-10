import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { normalizeTitle, titleSimilarity, trimText } from '../utils.ts';
import type { ArticleLanguage } from './types.ts';

const englishStopWords = ['the', 'and', 'with', 'will', 'from', 'this', 'that', 'after', 'into', 'amid', 'more', 'said', 'today'];
const frenchStopWords = ['les', 'des', 'avec', 'pour', 'dans', 'une', 'sur', 'plus', 'apres', 'entre', 'marche', 'croissance', 'taux', 'economie'];
const frenchAccentPattern = /[\u00e0\u00e2\u00e7\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u00f9\u00fb\u00fc\u00ff\u0153]/i;

export function decodeHtmlEntities(value: string) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&euro;/gi, '\u20ac')
    .replace(/&pound;/gi, '\u00a3')
    .replace(/&mdash;/gi, '\u2014')
    .replace(/&ndash;/gi, '\u2013')
    .replace(/&rsquo;|&#8217;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&#(\d+);/g, (_m, code) => {
      const numericCode = Number(code);
      return Number.isFinite(numericCode) ? String.fromCharCode(numericCode) : ' ';
    })
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => {
      const numericCode = Number.parseInt(hex, 16);
      return Number.isFinite(numericCode) ? String.fromCharCode(numericCode) : ' ';
    });
}

export function canonicalizeUrl(rawUrl: string) {
  try {
    const url = new URL(String(rawUrl || '').trim());
    url.hash = '';
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref'].forEach((key) => url.searchParams.delete(key));
    if ((url.protocol === 'https:' && url.port === '443') || (url.protocol === 'http:' && url.port === '80')) {
      url.port = '';
    }
    url.hostname = url.hostname.replace(/^www\./i, '').toLowerCase();
    return url.toString();
  } catch (_error) {
    return String(rawUrl || '').trim();
  }
}

export function stripHtml(html: string) {
  return decodeHtmlEntities(
    String(html || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--([\s\S]*?)-->/g, ' ')
      .replace(/<(?:br|\/p|\/div|\/article|\/section|\/li|\/h[1-6])\b[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function countBoilerplateMarkers(text: string) {
  const sample = String(text || '').toLowerCase();
  return OIKO_V3_POLICY.acquisition.boilerplateMarkers.filter((marker) => sample.includes(marker)).length;
}

export function isProbablyBoilerplateLine(text: string) {
  const line = String(text || '').trim();
  if (!line) return true;
  const markerHits = countBoilerplateMarkers(line);
  const alphaChars = (line.match(/[A-Za-z\u00c0-\u017f]/g) || []).length;
  const words = line.split(/\s+/).filter(Boolean);
  const uppercaseRatio = alphaChars ? ((line.match(/[A-Z]/g) || []).length / alphaChars) : 0;
  const punctuationRatio = line.length ? ((line.match(/[|>\u00bb]/g) || []).length / line.length) : 0;
  const manyMenuTokens = /\b(home|market news|ipo|sports|privacy policy|terms of use|cookie policy|view more|view less|dashboard|newsletter|watchlist)\b/i.test(line);
  return markerHits >= 1 || manyMenuTokens || uppercaseRatio > 0.45 || punctuationRatio > 0.08;
}

export function cleanProviderResidue(text: string) {
  let clean = String(text || '');
  for (const pattern of OIKO_V3_POLICY.residuePatterns) {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    clean = clean.replace(new RegExp(escaped, 'gi'), ' ');
  }
  clean = clean
    .replace(/subscribe to continue(?: reading)?/gi, ' ')
    .replace(/click here to continue/gi, ' ')
    .replace(/all rights reserved/gi, ' ')
    .replace(/privacy policy/gi, ' ')
    .replace(/terms of use/gi, ' ')
    .replace(/cookie policy/gi, ' ')
    .replace(/market dashboard/gi, ' ')
    .replace(/today's paper/gi, ' ')
    .replace(/view more|view less/gi, ' ');

  const lines = stripHtml(clean)
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((line) => !isProbablyBoilerplateLine(line));

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function normalizeReadableText(text: string, maxLength = 12000) {
  return trimText(cleanProviderResidue(text).replace(/[ ]{2,}/g, ' ').trim(), maxLength);
}

export function splitSentences(text: string) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z\u00c0-\u017f0-9])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function extractReadableParagraphs(text: string) {
  const paragraphs = cleanProviderResidue(text)
    .split(/\n{2,}|\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((line) => !isProbablyBoilerplateLine(line))
    .filter((line) => line.length >= 50);

  return uniqueStrings(paragraphs).slice(0, 24);
}

export function computeReadableQuality(text: string) {
  const paragraphs = extractReadableParagraphs(text);
  const sentences = splitSentences(paragraphs.join(' '));
  const lines = String(text || '').split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const boilerplateLines = lines.filter((line) => isProbablyBoilerplateLine(line)).length;
  const boilerplateRatio = lines.length ? boilerplateLines / lines.length : 0;
  const looksReadable = paragraphs.length >= OIKO_V3_POLICY.acquisition.minimumReadableParagraphs
    && sentences.length >= OIKO_V3_POLICY.acquisition.minimumReadableSentences
    && paragraphs.join(' ').length >= OIKO_V3_POLICY.acquisition.minimumReadableChars
    && boilerplateRatio <= OIKO_V3_POLICY.acquisition.maxBoilerplateRatio;

  return {
    paragraphs,
    sentences,
    paragraphCount: paragraphs.length,
    sentenceCount: sentences.length,
    boilerplateRatio: Number(boilerplateRatio.toFixed(3)),
    looksReadable,
  };
}

export function detectLanguage(text: string): ArticleLanguage {
  const sample = String(text || '').toLowerCase();
  if (!sample.trim()) return 'other';

  const englishHits = englishStopWords.filter((word) => sample.includes(` ${word} `) || sample.startsWith(`${word} `)).length;
  const frenchHits = frenchStopWords.filter((word) => sample.includes(` ${word} `) || sample.startsWith(`${word} `)).length;
  const hasFrenchAccents = frenchAccentPattern.test(sample);

  if (hasFrenchAccents || frenchHits >= englishHits + 1) return 'fr';
  if (englishHits >= frenchHits + 1) return 'en';
  return 'other';
}

export function normalizedTokens(text: string) {
  return normalizeTitle(text).split(/\s+/).filter(Boolean);
}

export function consecutiveTokenOverlap(a: string, b: string) {
  const tokensA = normalizedTokens(a);
  const tokensB = normalizedTokens(b);
  if (!tokensA.length || !tokensB.length) return 0;
  let longest = 0;
  for (let indexA = 0; indexA < tokensA.length; indexA += 1) {
    for (let indexB = 0; indexB < tokensB.length; indexB += 1) {
      let cursor = 0;
      while (tokensA[indexA + cursor] && tokensA[indexA + cursor] === tokensB[indexB + cursor]) {
        cursor += 1;
      }
      if (cursor > longest) longest = cursor;
    }
  }
  return longest;
}

export function ngramOverlapRatio(a: string, b: string, size = 3) {
  const tokensA = normalizedTokens(a);
  const tokensB = normalizedTokens(b);
  if (tokensA.length < size || tokensB.length < size) {
    return titleSimilarity(a, b);
  }

  const buildNgrams = (tokens: string[]) => {
    const grams = new Set<string>();
    for (let index = 0; index <= tokens.length - size; index += 1) {
      grams.add(tokens.slice(index, index + size).join(' '));
    }
    return grams;
  };

  const gramsA = buildNgrams(tokensA);
  const gramsB = buildNgrams(tokensB);
  let shared = 0;
  gramsA.forEach((gram) => {
    if (gramsB.has(gram)) shared += 1;
  });
  return shared / Math.max(1, Math.min(gramsA.size, gramsB.size));
}

export function safeJoin(values: string[], maxLength = 500) {
  return trimText(values.filter(Boolean).join(' '), maxLength);
}

export function uniqueStrings(values: string[]) {
  return values.filter((value, index, array) => Boolean(value) && array.indexOf(value) === index);
}

export function hasProviderResidue(text: string) {
  const sample = String(text || '').toLowerCase();
  return OIKO_V3_POLICY.residuePatterns.some((pattern) => sample.includes(pattern)) || countBoilerplateMarkers(sample) > 0;
}

export function pickParagraphTextCandidates(...values: string[]) {
  return uniqueStrings(
    values
      .map((value) => normalizeReadableText(value))
      .filter(Boolean)
      .flatMap((value) => {
        const quality = computeReadableQuality(value);
        return quality.looksReadable ? [quality.paragraphs.join('\n\n')] : [];
      }),
  );
}

export function buildHumanList(values: string[]) {
  if (!values.length) return '';
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} et ${values[1]}`;
  return `${values.slice(0, -1).join(', ')} et ${values[values.length - 1]}`;
}