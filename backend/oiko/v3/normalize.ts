import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { buildDedupeKey, titleSimilarity, trimText } from '../utils.ts';
import { cleanProviderResidue, detectLanguage, canonicalizeUrl, computeReadableQuality } from './helpers.ts';
import type { AcquiredArticle, NormalizedArticle } from './types.ts';

function compactWhitespace(value: string) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeArticleText(value: string, maxLength: number) {
  return trimText(compactWhitespace(cleanProviderResidue(value)), maxLength);
}

function normalizeArticleTitle(value: string, maxLength: number) {
  return trimText(compactWhitespace(value), maxLength);
}

function isSupportingSecondaryArticle(article: AcquiredArticle) {
  if (article.sourceProfile.sourceTier !== 'secondary') return false;
  if (article.sourceProfile.sourceReliabilityScore < OIKO_V3_POLICY.collection.supportingSecondaryMinimumReliability) return false;
  if (article.sourceProfile.snippetOnlyRisk > OIKO_V3_POLICY.collection.supportingSecondaryMaxSnippetOnlyRisk) return false;
  const text = `${article.title} ${article.snippetRaw} ${article.acquiredText}`.toLowerCase();
  if (OIKO_V3_POLICY.collection.supportingSecondaryExcludePatterns.some((pattern) => text.includes(pattern))) return false;
  return OIKO_V3_POLICY.collection.supportingSecondarySignalPatterns.some((pattern) => text.includes(pattern));
}

function chooseTopicFamily(article: AcquiredArticle) {
  if (article.topicFamily) return article.topicFamily;
  const text = `${article.title} ${article.snippetRaw} ${article.acquiredText}`.toLowerCase();
  if (/(inflation|cpi|rate|taux|ecb|fed|banque centrale)/.test(text)) return 'inflation_rates';
  if (/(jobs|emploi|payroll|wage|salaires|growth|gdp|croissance)/.test(text)) return 'jobs_consumption_growth';
  if (/(trade|tariff|commerce|energy|oil|gas|industrie|exports|import)/.test(text)) return 'trade_industry_energy';
  if (/(europe|zone euro|euro area|eurostat|germany|france|italy)/.test(text)) return 'europe_euro_area';
  if (/(china|asie|asia|yuan|yen|fx|dollar|japan|japon)/.test(text)) return 'china_asia_fx';
  return 'institutions';
}

function isNearDuplicate(left: NormalizedArticle, right: NormalizedArticle) {
  if (left.canonicalUrl && right.canonicalUrl && left.canonicalUrl === right.canonicalUrl) return true;
  return titleSimilarity(left.cleanTitle, right.cleanTitle) >= 0.8;
}

function shouldKeepArticle(article: AcquiredArticle, cleanTitle: string, cleanBody: string) {
  const titleSample = cleanTitle.toLowerCase();
  if (OIKO_V3_POLICY.collection.hardExcludeTitlePatterns.some((pattern) => titleSample.includes(pattern))) return false;
  const tierAllowed = (OIKO_V3_POLICY.collection.allowedSourceTiers as readonly string[]).includes(article.sourceProfile.sourceTier);
  const supportSecondary = !tierAllowed && isSupportingSecondaryArticle(article);
  if (!tierAllowed && !supportSecondary) return false;
  if (!supportSecondary && article.sourceProfile.sourceReliabilityScore < OIKO_V3_POLICY.collection.minimumSourceReliability) return false;
  if (!supportSecondary && article.sourceProfile.snippetOnlyRisk > OIKO_V3_POLICY.collection.maxSnippetOnlyRisk && article.sourceProfile.sourceTier !== 'official') return false;
  if (supportSecondary && article.sourceProfile.sourceReliabilityScore < OIKO_V3_POLICY.collection.supportingSecondaryMinimumReliability) return false;
  if (supportSecondary && article.sourceProfile.snippetOnlyRisk > OIKO_V3_POLICY.collection.supportingSecondaryMaxSnippetOnlyRisk) return false;
  if (article.acquisitionStatus === 'blocked' || article.acquisitionStatus === 'failed') return false;
  if (article.contentDepth === 'title_only') return false;
  const originalBody = cleanProviderResidue(article.acquiredText || article.bodyRaw || '');
  const quality = computeReadableQuality(originalBody || article.snippetRaw || cleanTitle);
  if (!quality.looksReadable && article.contentDepth === 'title_snippet') {
    return Boolean(cleanTitle && article.snippetRaw);
  }
  if (!quality.looksReadable && article.contentDepth !== 'title_snippet') return false;
  return Boolean(cleanTitle && (cleanBody || article.snippetRaw));
}

export function normalizeArticles(acquiredArticles: AcquiredArticle[]) {
  const normalized: NormalizedArticle[] = [];

  for (const article of acquiredArticles) {
    const canonicalUrl = canonicalizeUrl(article.canonicalUrl || article.url);
    const cleanTitle = normalizeArticleTitle(article.title, 240);
    const cleanSnippet = normalizeArticleText(article.snippetRaw, 800);
    const cleanBody = normalizeArticleText(article.acquiredText || article.bodyRaw || '', 9000);
    if (!shouldKeepArticle(article, cleanTitle, cleanBody)) {
      continue;
    }

    const language = detectLanguage(`${cleanTitle} ${cleanSnippet} ${cleanBody}`);
    const current: NormalizedArticle = {
      id: buildDedupeKey(cleanTitle || article.title, article.sourceDomain || canonicalUrl),
      title: cleanTitle || article.title,
      sourceName: article.sourceName,
      sourceDomain: article.sourceDomain,
      url: article.url,
      canonicalUrl,
      publishedAt: article.publishedAt,
      language,
      cleanTitle,
      cleanSnippet,
      cleanBody,
      provider: article.provider,
      topicFamily: chooseTopicFamily(article),
      contentDepth: article.contentDepth,
      sourceProfile: article.sourceProfile,
      rawArticleId: article.id,
    };

    const duplicateIndex = normalized.findIndex((existing) => isNearDuplicate(existing, current));
    if (duplicateIndex === -1) {
      normalized.push(current);
      continue;
    }

    const existing = normalized[duplicateIndex];
    const currentScore = current.cleanBody.length + current.cleanSnippet.length + current.sourceProfile.sourceReliabilityScore * 100;
    const existingScore = existing.cleanBody.length + existing.cleanSnippet.length + existing.sourceProfile.sourceReliabilityScore * 100;
    if (currentScore > existingScore) {
      normalized[duplicateIndex] = current;
    }
  }

  return normalized.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export default {
  normalizeArticles,
};