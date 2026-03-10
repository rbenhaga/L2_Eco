import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { normalizeTitle, titleSimilarity, trimText } from '../utils.ts';
import type { ArticleLanguage } from './types.ts';

// ── Language detection word lists ──────────────────────────────────────
// Unigrams: high-signal function words that almost never appear in the other language.
const englishUnigrams = new Set([
  'the', 'and', 'with', 'will', 'from', 'this', 'that', 'after', 'into', 'amid',
  'more', 'said', 'today', 'also', 'which', 'about', 'been', 'have', 'were', 'their',
  'would', 'could', 'should', 'while', 'than', 'other', 'between', 'during', 'being',
  'those', 'these', 'they', 'what', 'when', 'where', 'there', 'some', 'only', 'over',
]);
const frenchUnigrams = new Set([
  'les', 'des', 'avec', 'pour', 'dans', 'une', 'sur', 'plus', 'entre', 'cette',
  'sont', 'par', 'mais', 'qui', 'aux', 'ses', 'ont', 'leur', 'selon', 'aussi',
  'dont', 'ces', 'peut', 'comme', 'tout', 'elle', 'soit', 'encore', 'vers', 'donc',
  'depuis', 'chez', 'sans', 'sous', 'nous', 'fait', 'deux', 'notre', 'moins', 'alors',
]);

// Bigrams: two-word pairs that are overwhelmingly language-specific.
const englishBigrams = new Set([
  'of the', 'in the', 'to the', 'on the', 'for the', 'at the', 'by the',
  'has been', 'will be', 'is expected', 'it is', 'that the', 'said the',
  'which is', 'would be', 'could be', 'such as', 'as well', 'there is',
  'according to', 'more than', 'as the', 'from the', 'with the',
]);
const frenchBigrams = new Set([
  'de la', 'de le', 'de les', 'dans le', 'dans la', 'sur le', 'sur la',
  'pour le', 'pour la', 'qui a', 'qui est', 'il est', 'elle est', 'ce qui',
  'en ce', 'par le', 'par la', 'selon le', 'selon la', 'avec le', 'avec la',
  'a été', 'ont été', 'est un', 'est une', 'au cours', 'il y',
]);


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

/**
 * Detect whether a text is French, English, or other.
 *
 * Uses three complementary signals:
 * 1. **Unigram hits** — common function words exclusive to each language.
 * 2. **Bigram hits** — two-word collocations that are very language-specific.
 * 3. **Accent density** — proportion of accented characters (strong French signal).
 *
 * The approach is intentionally conservative for the Oiko pipeline:
 * French text with a few English proper nouns or loan words should never
 * be misclassified as English, because that blocks the edition via the
 * language gate (`maxEnglishSentences = 0`).
 */
export function detectLanguage(text: string): ArticleLanguage {
  const sample = String(text || '').toLowerCase();
  if (!sample.trim()) return 'other';

  const words = sample.split(/\s+/).filter(Boolean);
  if (words.length < 2) return 'other';

  // ── 1. Unigram scoring ────────────────────────────────────────────
  let enUnigramHits = 0;
  let frUnigramHits = 0;
  for (const word of words) {
    if (englishUnigrams.has(word)) enUnigramHits += 1;
    if (frenchUnigrams.has(word)) frUnigramHits += 1;
  }

  // ── 2. Bigram scoring ─────────────────────────────────────────────
  let enBigramHits = 0;
  let frBigramHits = 0;
  for (let i = 0; i < words.length - 1; i += 1) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (englishBigrams.has(bigram)) enBigramHits += 1;
    if (frenchBigrams.has(bigram)) frBigramHits += 1;
  }

  // ── 3. Accent density (strong French signal) ──────────────────────
  const accentMatches = sample.match(/[\u00e0\u00e2\u00e7\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u00f9\u00fb\u00fc\u00ff\u0153]/g);
  const accentCount = accentMatches ? accentMatches.length : 0;
  const alphaCount = (sample.match(/[a-z\u00e0-\u017f]/g) || []).length;
  const accentDensity = alphaCount > 0 ? accentCount / alphaCount : 0;

  // ── Composite score ───────────────────────────────────────────────
  // Bigrams count double because they are more discriminative.
  const enScore = enUnigramHits + enBigramHits * 2;
  const frScore = frUnigramHits + frBigramHits * 2;

  // Accent density > 1% is a strong French signal (typical FR text ≈ 3-5%).
  const accentBonus = accentDensity > 0.01 ? 3 : accentCount > 0 ? 1 : 0;
  const frAdjusted = frScore + accentBonus;

  // French wins on tie or near-tie (conservative: avoid false 'en' on FR text).
  if (frAdjusted > enScore) return 'fr';
  if (frAdjusted === enScore && accentCount > 0) return 'fr';
  if (enScore > frAdjusted + 2) return 'en';

  // Not enough signal — if there are any accents, lean French.
  if (accentCount > 0) return 'fr';
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