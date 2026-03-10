import { collectSourceItems } from '../sources.ts';
import { buildDedupeKey } from '../utils.ts';
import { OIKO_V3_POLICY, getSourceProfile } from '../policy/v3.ts';
import { canonicalizeUrl } from './helpers.ts';
import type { RawArticle } from './types.ts';

function itemToRawArticle(item: any): RawArticle {
  return {
    id: buildDedupeKey(item.title, item.url || item.source_domain),
    url: String(item.url || '').trim(),
    title: String(item.title || '').trim(),
    sourceName: String(item.source_name || item.sourceName || item.source_domain || 'Source'),
    sourceDomain: String(item.source_domain || '').trim(),
    provider: String(item.provider || item.source_type || 'live-sources'),
    publishedAt: String(item.published_at || new Date().toISOString()),
    language: String(item.language || 'en'),
    snippetRaw: String(item.snippet_raw || ''),
    bodyRaw: String(item.body_raw || ''),
    topicFamily: item.topic_family || undefined,
    rawJson: item,
  };
}

function isHardExcludedTitle(title: string) {
  const sample = String(title || '').toLowerCase();
  return OIKO_V3_POLICY.collection.hardExcludeTitlePatterns.some((pattern) => sample.includes(pattern));
}

function isSupportingSecondaryArticle(article: RawArticle) {
  const profile = getSourceProfile(article.sourceDomain, article.sourceName);
  if (profile.sourceTier !== 'secondary') return false;
  if (profile.sourceReliabilityScore < OIKO_V3_POLICY.collection.supportingSecondaryMinimumReliability) return false;
  if (profile.snippetOnlyRisk > OIKO_V3_POLICY.collection.supportingSecondaryMaxSnippetOnlyRisk) return false;
  if (isHardExcludedTitle(article.title)) return false;
  const text = `${article.title} ${article.snippetRaw} ${article.bodyRaw}`.toLowerCase();
  if (OIKO_V3_POLICY.collection.supportingSecondaryExcludePatterns.some((pattern) => text.includes(pattern))) return false;
  return OIKO_V3_POLICY.collection.supportingSecondarySignalPatterns.some((pattern) => text.includes(pattern));
}

function isEligibleRawArticle(article: RawArticle) {
  const profile = getSourceProfile(article.sourceDomain, article.sourceName);
  const tierAllowed = (OIKO_V3_POLICY.collection.allowedSourceTiers as readonly string[]).includes(profile.sourceTier);
  const supportSecondary = !tierAllowed && isSupportingSecondaryArticle(article);
  if (!tierAllowed && !supportSecondary) return false;
  if (!supportSecondary && profile.sourceReliabilityScore < OIKO_V3_POLICY.collection.minimumSourceReliability) return false;
  if (!supportSecondary && profile.snippetOnlyRisk > OIKO_V3_POLICY.collection.maxSnippetOnlyRisk && profile.sourceTier !== 'official') return false;
  if (supportSecondary && profile.sourceReliabilityScore < OIKO_V3_POLICY.collection.supportingSecondaryMinimumReliability) return false;
  if (supportSecondary && profile.snippetOnlyRisk > OIKO_V3_POLICY.collection.supportingSecondaryMaxSnippetOnlyRisk) return false;
  if (isHardExcludedTitle(article.title)) return false;
  return Boolean(article.url && article.title);
}

function dedupeRawArticles(articles: RawArticle[]) {
  const seen = new Set<string>();
  const deduped: RawArticle[] = [];
  for (const article of articles) {
    const key = canonicalizeUrl(article.url) || article.id;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(article);
  }
  return deduped;
}

export async function collectRawSources(editionDate: string) {
  const collection = await collectSourceItems(editionDate);
  const mapped = collection.rankedItems.map((item: any) => itemToRawArticle(item));
  const eligible = dedupeRawArticles(mapped.filter(isEligibleRawArticle));

  if (eligible.length) {
    return eligible;
  }

  const conservativeFallback = dedupeRawArticles(
    mapped.filter((article) => {
      const profile = getSourceProfile(article.sourceDomain, article.sourceName);
      return (profile.sourceTier === 'official' || profile.sourceTier === 'tier1') && !isHardExcludedTitle(article.title);
    }),
  );

  return conservativeFallback;
}

export default {
  collectRawSources,
};