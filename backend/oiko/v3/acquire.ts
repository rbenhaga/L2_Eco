import pLimit from 'p-limit';
import { OIKO_V3_POLICY, getSourceProfile } from '../policy/v3.ts';
import { canonicalizeUrl, cleanProviderResidue, computeReadableQuality, detectLanguage, pickParagraphTextCandidates, stripHtml } from './helpers.ts';
import type { AcquiredArticle, ContentDepth, RawArticle, SourceProfile } from './types.ts';

const robotsCache = new Map<string, { fetched: boolean; rules: string[]; allowedByDefault: boolean }>();

function buildAbortSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, done: () => clearTimeout(timeout) };
}

async function fetchText(url: string) {
  const { signal, done } = buildAbortSignal(OIKO_V3_POLICY.acquisition.requestTimeoutMs);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal,
      headers: {
        'User-Agent': OIKO_V3_POLICY.acquisition.userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.text();
  } finally {
    done();
  }
}

function parseRobotsRules(robotsText: string) {
  const lines = String(robotsText || '').split(/\r?\n/);
  const genericRules: string[] = [];
  let currentUserAgent = '';

  for (const rawLine of lines) {
    const line = rawLine.split('#')[0].trim();
    if (!line) continue;
    const [directiveRaw, ...rest] = line.split(':');
    const directive = directiveRaw.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (directive === 'user-agent') {
      currentUserAgent = value.toLowerCase();
      continue;
    }
    if (directive === 'disallow' && (currentUserAgent === '*' || currentUserAgent.includes('oikonews'))) {
      genericRules.push(value || '/');
    }
  }

  return genericRules.filter(Boolean);
}

async function getRobotsPolicy(url: string) {
  const parsedUrl = new URL(url);
  const cacheKey = `${parsedUrl.protocol}//${parsedUrl.host}`;
  if (robotsCache.has(cacheKey)) {
    return robotsCache.get(cacheKey)!;
  }

  try {
    const robotsText = await fetchText(`${cacheKey}/robots.txt`);
    const policy = {
      fetched: true,
      rules: parseRobotsRules(robotsText),
      allowedByDefault: true,
    };
    robotsCache.set(cacheKey, policy);
    return policy;
  } catch (_error) {
    const policy = {
      fetched: false,
      rules: [],
      allowedByDefault: !OIKO_V3_POLICY.acquisition.allowUnknownRobotsAsBlocked,
    };
    robotsCache.set(cacheKey, policy);
    return policy;
  }
}

async function isRobotsAllowed(url: string) {
  try {
    const parsedUrl = new URL(url);
    const policy = await getRobotsPolicy(url);
    if (!policy.rules.length) return policy.allowedByDefault;
    return !policy.rules.some((rule) => rule !== '/' && parsedUrl.pathname.startsWith(rule));
  } catch (_error) {
    return false;
  }
}

function detectPaywall(html: string) {
  const sample = String(html || '').toLowerCase();
  return /(subscribe to continue|subscriber only|sign in to continue|register to keep reading|paid plans|paywall|premium content|subscription required)/.test(sample);
}

function extractJsonLdObjects(html: string) {
  const objects: any[] = [];
  const matches = String(html || '').match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const match of matches) {
    const payload = match.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
    if (!payload) continue;
    try {
      const parsed = JSON.parse(payload);
      objects.push(parsed);
    } catch (_error) {
      continue;
    }
  }
  return objects;
}

function flattenJsonLdObjects(input: any): any[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap((item) => flattenJsonLdObjects(item));
  if (typeof input !== 'object') return [];
  const direct = [input];
  const graph = Array.isArray(input['@graph']) ? input['@graph'].flatMap((item: any) => flattenJsonLdObjects(item)) : [];
  return [...direct, ...graph];
}

function extractJsonLdCandidateText(html: string) {
  const objects = extractJsonLdObjects(html).flatMap((item) => flattenJsonLdObjects(item));
  const candidates: string[] = [];
  for (const object of objects) {
    const type = String(object?.['@type'] || '').toLowerCase();
    if (/(article|newsarticle|blogposting|report)/.test(type)) {
      const articleBody = String(object.articleBody || '').trim();
      const description = String(object.description || '').trim();
      if (articleBody) candidates.push(articleBody);
      if (description) candidates.push(description);
    }
  }
  return candidates;
}

function extractMetaContent(html: string, attribute: string, value: string) {
  const pattern = new RegExp(`<meta[^>]*${attribute}=["']${value}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
  const match = String(html || '').match(pattern);
  return match?.[1] || '';
}

function extractArticleBlocks(html: string) {
  const blocks: string[] = [];
  const articleMatch = String(html || '').match(/<article[\s\S]*?<\/article>/i);
  if (articleMatch) blocks.push(articleMatch[0]);
  const mainMatch = String(html || '').match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) blocks.push(mainMatch[0]);
  const paragraphMatches = String(html || '').match(/<p\b[\s\S]*?<\/p>/gi) || [];
  if (paragraphMatches.length) blocks.push(paragraphMatches.join('\n\n'));
  blocks.push(String(html || ''));
  return blocks;
}

function scoreReadableText(text: string) {
  const quality = computeReadableQuality(text);
  const lengthScore = Math.min(5, Math.floor(quality.paragraphs.join(' ').length / 280));
  const score = (quality.sentenceCount * 2) + quality.paragraphCount + lengthScore - (quality.boilerplateRatio * 10);
  return { text: quality.paragraphs.join('\n\n').trim(), quality, score };
}

function chooseBestReadableText(html: string) {
  const candidates = [
    ...extractJsonLdCandidateText(html),
    extractMetaContent(html, 'property', 'og:description'),
    extractMetaContent(html, 'name', 'description'),
    ...extractArticleBlocks(html).map((block) => cleanProviderResidue(stripHtml(block))),
  ]
    .map((candidate) => cleanProviderResidue(candidate))
    .filter(Boolean);

  const scored = candidates
    .map((candidate) => scoreReadableText(candidate))
    .filter((candidate) => candidate.text)
    .sort((left, right) => right.score - left.score);

  return scored[0] || { text: '', quality: computeReadableQuality(''), score: 0 };
}

function classifyContentDepth(acquiredText: string, snippetRaw: string, quality: ReturnType<typeof computeReadableQuality>): ContentDepth {
  const bodyLength = String(acquiredText || '').length;
  const snippetLength = String(snippetRaw || '').length;
  if (quality.looksReadable && bodyLength >= OIKO_V3_POLICY.acquisition.minimumFullBodyChars) return 'full_body';
  if (quality.looksReadable && bodyLength >= OIKO_V3_POLICY.acquisition.minimumPartialBodyChars) return 'partial_body';
  if (snippetLength > 0) return 'title_snippet';
  return 'title_only';
}

function maybeOverrideSourceProfile(profile: SourceProfile, article: RawArticle, acquiredText: string) {
  const sample = `${article.title} ${article.snippetRaw} ${acquiredText}`.toLowerCase();
  if (profile.sourceTier === 'secondary') {
    if (/\breuters\b/.test(sample)) return getSourceProfile('reuters.com', 'Reuters');
    if (/associated press|\bap\b/.test(sample)) return getSourceProfile('apnews.com', 'AP');
    if (/wall street journal|\bwsj\b/.test(sample)) return getSourceProfile('wsj.com', 'Wall Street Journal');
  }
  return profile;
}

async function acquireSingleArticle(article: RawArticle): Promise<AcquiredArticle> {
  const canonicalUrl = canonicalizeUrl(article.url);
  const initialProfile = getSourceProfile(article.sourceDomain, article.sourceName);
  const base: AcquiredArticle = {
    ...article,
    canonicalUrl,
    acquiredHtml: '',
    acquiredText: '',
    contentDepth: article.snippetRaw ? 'title_snippet' : 'title_only',
    acquisitionStatus: 'partial',
    acquisitionError: null,
    robotsAllowed: false,
    licenseStatus: 'unknown',
    paywallDetected: false,
    sourceProfile: initialProfile,
  };

  if (!article.url || initialProfile.paywallRisk >= OIKO_V3_POLICY.acquisition.blockedPaywallScore) {
    return {
      ...base,
      acquisitionStatus: 'blocked',
      acquisitionError: initialProfile.paywallRisk >= OIKO_V3_POLICY.acquisition.blockedPaywallScore ? 'source_paywall_risk' : 'missing_url',
      licenseStatus: initialProfile.paywallRisk >= OIKO_V3_POLICY.acquisition.blockedPaywallScore ? 'blocked' : 'unknown',
    };
  }

  const robotsAllowed = await isRobotsAllowed(article.url);
  if (!robotsAllowed) {
    return {
      ...base,
      robotsAllowed: false,
      acquisitionStatus: 'blocked',
      acquisitionError: 'robots_disallow',
      licenseStatus: 'blocked',
    };
  }

  try {
    const html = await fetchText(article.url);
    const paywallDetected = detectPaywall(html);
    const best = chooseBestReadableText(html);
    const contentDepth = classifyContentDepth(best.text, article.snippetRaw, best.quality);
    const acquisitionStatus = best.quality.looksReadable ? 'ok' : (article.snippetRaw ? 'partial' : 'failed');
    const sourceProfile = maybeOverrideSourceProfile(initialProfile, article, best.text);

    return {
      ...base,
      acquiredHtml: html,
      acquiredText: best.text,
      contentDepth,
      acquisitionStatus,
      robotsAllowed: true,
      licenseStatus: paywallDetected && !best.quality.looksReadable ? 'unknown' : 'allowed',
      paywallDetected,
      sourceProfile,
      acquisitionError: best.quality.looksReadable ? null : 'low_readability_body',
    };
  } catch (error) {
    return {
      ...base,
      robotsAllowed: true,
      acquisitionStatus: 'failed',
      acquisitionError: error instanceof Error ? error.message : String(error),
      licenseStatus: 'unknown',
    };
  }
}

export async function acquireArticleContent(rawArticles: RawArticle[]): Promise<AcquiredArticle[]> {
  const limit = pLimit(4);
  const results = await Promise.all(rawArticles.map((article) => limit(() => acquireSingleArticle(article))));

  return results.map((article) => {
    const fallbackText = pickParagraphTextCandidates(article.acquiredText, article.bodyRaw, article.snippetRaw)[0] || '';
    const quality = computeReadableQuality(fallbackText || article.snippetRaw || article.title);
    return {
      ...article,
      acquiredText: fallbackText,
      contentDepth: classifyContentDepth(fallbackText, article.snippetRaw, quality),
      acquisitionStatus: article.acquisitionStatus === 'failed' && fallbackText ? 'partial' : article.acquisitionStatus,
      language: detectLanguage(`${article.title} ${fallbackText}`),
    };
  });
}

export default {
  acquireArticleContent,
};