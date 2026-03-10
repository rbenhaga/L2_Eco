import { XMLParser } from 'fast-xml-parser';
import {
  ECONOMY_EXCLUDE_KEYWORDS,
  ECONOMY_INCLUDE_KEYWORDS,
  NYSE_HOLIDAYS,
  NEWSDATA_FALLBACK_DOMAINS,
  OFFICIAL_FEEDS,
  OPEN_MEDIA_FEEDS,
  OIKO_ALLOWED_DOMAINS,
  OIKO_CONDITIONAL_FAMILIES,
  OIKO_TOPIC_FAMILIES,
  VALIDATION_LIMITS,
} from './config.ts';
import {
  average,
  buildDedupeKey,
  clamp,
  getEditionWindow,
  isWithinWindow,
  marketRegimeFromChanges,
  safeJsonParse,
  titleSimilarity,
  trimText,
} from './utils.ts';
import { trackOikoApiUsage } from './usage.ts';

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

function getDomainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch (_error) {
    return '';
  }
}

function getHostnameScore(domain) {
  if (!domain) return 0;
  if (['ecb.europa.eu', 'federalreserve.gov', 'bls.gov', 'ec.europa.eu', 'bea.gov', 'imf.org', 'oecd.org', 'worldbank.org'].includes(domain)) {
    return 2;
  }
  if (OIKO_ALLOWED_DOMAINS.includes(domain)) {
    return 1.5;
  }
  return 0.5;
}

function isAllowedSourceDomain(domain) {
  return OIKO_ALLOWED_DOMAINS.includes(String(domain || '').toLowerCase());
}

function detectSourceType(domain) {
  return ['ecb.europa.eu', 'federalreserve.gov', 'bls.gov', 'ec.europa.eu', 'bea.gov', 'imf.org', 'oecd.org', 'worldbank.org'].includes(domain)
    ? 'official'
    : 'media';
}

function includesKeyword(text, keywords) {
  const haystack = String(text || '').toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword));
}

function isEconomyRelevant(item) {
  const text = `${item.title || ''} ${item.snippet_raw || ''} ${item.body_raw || ''}`.toLowerCase();
  return includesKeyword(text, ECONOMY_INCLUDE_KEYWORDS) && !includesKeyword(text, ECONOMY_EXCLUDE_KEYWORDS);
}

function isEditoriallyUsefulItem(item) {
  const title = `${item.title || ''}`;
  const domain = String(item.source_domain || '').toLowerCase();
  const text = `${item.title || ''} ${item.snippet_raw || ''}`.toLowerCase();
  const hardRetailPatterns = /(stocks to buy|stock recommendations|buy call|sell call|marketsmith|mutual fund|fund managers|podcast|prediction today|what should investors do|check targets|top analysts|bullish on these|stay out of the market)/;
  const opinionPatterns = /(editorial|opinion|commentary|the guardian view|video report)/;
  if (opinionPatterns.test(text)) {
    return false;
  }
  if (domain === 'theguardian.com') {
    const guardianMacroPatterns = /(job market|hiring|unemployment|wages|salary|pay|oil|gas|energy|price shock|prices jump|inflation|rates|tariff|trade|economy|growth|gdp|market)/;
    const guardianRejectPatterns = /(generation gap|tech oligarch|billionaires|block workers|jack dorsey|baby boomers)/;
    if (title.includes('|') || guardianRejectPatterns.test(text) || !guardianMacroPatterns.test(text)) {
      return false;
    }
  }
  if (hardRetailPatterns.test(text)) {
    const macroEscapeHatch = /(inflation|crude|oil|fuel costs|energy|rates|fed|ecb|tariff|trade|currency|gas|market sell-off|geopolitical|geopolitics|sanctions|conflict|war)/;
    return macroEscapeHatch.test(text);
  }
  return true;
}

function inferTopicFamily(item) {
  const text = `${item.title || ''} ${item.snippet_raw || ''}`.toLowerCase();
  if (/(inflation|cpi|rates|central bank|ecb|fed|monetary)/.test(text)) return 'inflation_rates';
  if (/(jobs|employment|unemployment|wages|gdp|growth|consumption|retail)/.test(text)) return 'jobs_consumption_growth';
  if (/(tariff|trade|exports|imports|manufacturing|industry|oil|gas|energy)/.test(text)) return 'trade_industry_energy';
  if (/(europe|euro area|eurozone|germany|france|italy|spain|eurostat)/.test(text)) return 'europe_euro_area';
  if (/(china|asia|yuan|yen|dollar|currency|fx)/.test(text)) return 'china_asia_fx';
  if (/(budget|deficit|debt|treasury|fiscal|tax)/.test(text)) return 'budget_debt_fiscal';
  return 'institutions';
}

function freshnessScore(publishedAt, window) {
  const publishedMs = new Date(publishedAt).getTime();
  const endMs = new Date(window.endIso).getTime();
  const ageHours = Math.max(0, (endMs - publishedMs) / (1000 * 60 * 60));
  if (ageHours <= 6) return 2;
  if (ageHours <= 18) return 1;
  return 0.5;
}

function impactScore(item) {
  const text = `${item.title || ''} ${item.snippet_raw || ''}`.toLowerCase();
  let score = 0;
  if (/(ecb|fed|central bank|inflation|cpi|rates|gdp|unemployment|payroll|budget|deficit|debt|tariff|trade)/.test(text)) score += 3;
  if (/(global|world|euro area|china|us|united states|europe)/.test(text)) score += 1;
  if (item.source_type === 'official') score += 1;
  return clamp(score, 0, 5);
}

function licenceRelevanceScore(item) {
  const text = `${item.title || ''} ${item.snippet_raw || ''}`.toLowerCase();
  let score = 0;
  if (/(inflation|rates|gdp|growth|trade|unemployment|budget|exchange rate|currency|energy)/.test(text)) score += 2;
  if (/(policy|monetary|fiscal|deflation|consumption|labou?r market)/.test(text)) score += 1;
  return clamp(score, 0, 3);
}

function noisePenalty(item) {
  const text = `${item.title || ''} ${item.snippet_raw || ''}`.toLowerCase();
  if (/(stock rises|shares jump|shares fall|earnings beat|quarterly earnings)/.test(text) && !/(macro|trade|inflation|central bank|tariff|economy)/.test(text)) {
    return -2;
  }
  if (/(crypto meme|dogecoin|memecoin|influencer)/.test(text)) {
    return -3;
  }
  return 0;
}

function computeItemScore(item, window) {
  const reliability = getHostnameScore(item.source_domain);
  const score = impactScore(item) + licenceRelevanceScore(item) + freshnessScore(item.published_at, window) + reliability + noisePenalty(item);
  return Number(score.toFixed(2));
}

function normalizeExternalItem(raw, fallback: any = {}) {
  const url = raw.url || raw.link || fallback.url;
  const sourceDomain = getDomainFromUrl(url) || fallback.source_domain || '';
  const sourceName = raw.source || raw.source_name || raw.sourceName || fallback.source_name || sourceDomain || 'Unknown source';
  const publishedAt = raw.published_at || raw.pubDate || raw.published || raw.publishedAt || raw.updated || raw.isoDate || fallback.published_at;
  const snippet = raw.description || raw.snippet || raw.summary || raw.excerpt || raw.content || raw.text || '';
  const body = raw.body || raw.content_raw || raw.content || '';
  const item: any = {
    source_name: String(sourceName),
    source_domain: sourceDomain,
    source_type: fallback.source_type || detectSourceType(sourceDomain),
    url,
    title: trimText(raw.title || fallback.title || '', 240),
    published_at: new Date(publishedAt || Date.now()).toISOString(),
    language: raw.language || fallback.language || 'en',
    snippet_raw: trimText(snippet, 800),
    body_raw: trimText(body, 5000),
    topic_family: fallback.topic_family || inferTopicFamily(raw),
  };

  item.dedupe_key = buildDedupeKey(item.title, item.source_domain);
  return item;
}

async function fetchJson(url, options = {}): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} while fetching ${url}: ${text.slice(0, 180)}`);
  }
  return response.json();
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} while fetching ${url}: ${text.slice(0, 180)}`);
  }
  return response.text();
}

function formatTheNewsApiTimestamp(isoDate) {
  return new Date(isoDate).toISOString().slice(0, 19);
}

async function fetchTheNewsApiFamily(family, window, { language = 'en,fr', limit = 3 } = {}) {
  if (!process.env.THENEWS_API_TOKEN) {
    return { items: [], diagnostics: { family: family.key, skipped: 'missing_token' } };
  }

  const searchParams = new URLSearchParams({
    api_token: process.env.THENEWS_API_TOKEN,
    language,
    categories: family.categories,
    exclude_categories: 'sports,entertainment,food,travel,health',
    search: family.search,
    published_after: formatTheNewsApiTimestamp(window.startIso),
    published_before: formatTheNewsApiTimestamp(window.endIso),
    limit: String(limit),
  });

  const url = `https://api.thenewsapi.com/v1/news/all?${searchParams.toString()}`;
  try {
    const data = await fetchJson(url);
    const articles = Array.isArray(data?.data) ? data.data : [];
    trackOikoApiUsage('thenewsapi', { usageDate: window.editionDate, requests: 1, results: articles.length });
    const items = articles
      .map((article) => normalizeExternalItem(article, { topic_family: family.key }))
      .filter((item) => item.url && item.title && isWithinWindow(item.published_at, window));

    return {
      items,
      diagnostics: {
        family: family.key,
        count: items.length,
        meta: data?.meta || null,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isQuota = /usage_limit_reached|HTTP 402/.test(message);
    return {
      items: [],
      diagnostics: {
        family: family.key,
        count: 0,
        error: message,
        skipped: isQuota ? 'quota_reached' : 'request_failed',
      },
    };
  }
}

function extractFeedEntries(parsed) {
  if (Array.isArray(parsed?.rss?.channel?.item)) return parsed.rss.channel.item;
  if (parsed?.rss?.channel?.item) return [parsed.rss.channel.item];
  if (Array.isArray(parsed?.feed?.entry)) return parsed.feed.entry;
  if (parsed?.feed?.entry) return [parsed.feed.entry];
  return [];
}

function decodeHtmlEntities(value = '') {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, '?')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toAbsoluteUrl(baseUrl, href) {
  try {
    return new URL(String(href || '').trim(), baseUrl).toString();
  } catch (_error) {
    return String(href || '').trim();
  }
}

function parseLooseDateToIso(rawDate) {
  const parsed = new Date(String(rawDate || '').trim());
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function parseEurostatDateToIso(rawDate) {
  const clean = decodeHtmlEntities(rawDate).replace(/[^\d]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const [day, month, year] = clean.split('-');
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
}

function parseEcbBlogHtml(feed, html) {
  const items = [];
  const seen = new Set();
  const pattern = /<(?:a class="content-box"|div class="content-box")\s+[^>]*href="([^"]+)"[^>]*>[\s\S]*?<h5>([^<]+)<\/h5>[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<p>([^<]*)<\/p>/g;

  for (const match of html.matchAll(pattern)) {
    const url = toAbsoluteUrl(feed.url, match[1]);
    if (!url || seen.has(url)) continue;
    const publishedAt = parseLooseDateToIso(decodeHtmlEntities(match[2]));
    const title = decodeHtmlEntities(match[3]);
    const snippet = decodeHtmlEntities(match[4]);
    if (!publishedAt || !title) continue;
    seen.add(url);
    items.push(normalizeExternalItem({
      title,
      link: url,
      description: snippet,
      pubDate: publishedAt,
      source: feed.label,
      language: 'en',
    }, { source_domain: feed.domain, source_name: feed.label, source_type: feed.sourceType }));
  }

  return items;
}

function parseEurostatIndicatorsHtml(feed, html) {
  const items = [];
  const seen = new Set();
  const pattern = /<article class="ecl-content-item ecl-content-item--divider">[\s\S]*?<a href="([^"]+)"[^>]*>[\s\S]*?<span class="ecl-content-block__title[^"]*">([\s\S]*?)<\/span>[\s\S]*?<span class="ecl-content-block__secondary-meta-label">\s*([^<]+)\s*<\/span>/g;

  for (const match of html.matchAll(pattern)) {
    const url = toAbsoluteUrl(feed.url, match[1]);
    if (!url || seen.has(url)) continue;
    const publishedAt = parseEurostatDateToIso(match[3]);
    const title = decodeHtmlEntities(match[2]);
    if (!publishedAt || !title) continue;
    seen.add(url);
    items.push(normalizeExternalItem({
      title,
      link: url,
      description: '',
      pubDate: publishedAt,
      source: feed.label,
      language: 'en',
    }, { source_domain: feed.domain, source_name: feed.label, source_type: feed.sourceType }));
  }

  return items;
}

async function fetchOfficialFeed(feed, window) {
  const body = await fetchText(feed.url);
  let items;

  if (feed.parser === 'ecb_blog_html') {
    items = parseEcbBlogHtml(feed, body);
  } else if (feed.parser === 'eurostat_html') {
    items = parseEurostatIndicatorsHtml(feed, body);
  } else {
    const parsed = xmlParser.parse(body);
    const entries = extractFeedEntries(parsed);
    items = entries.map((entry) => normalizeExternalItem({
      title: entry.title?.['#text'] || entry.title,
      link: entry.link?.href || entry.link,
      description: entry.description || entry.summary || entry.content,
      content: entry['content:encoded'] || entry.content,
      pubDate: entry.pubDate || entry.updated || entry.published,
      source: feed.label,
      language: 'en',
    }, { source_domain: feed.domain, source_name: feed.label, source_type: feed.sourceType }));
  }

  return items.filter((item) => item.url && item.title && isWithinWindow(item.published_at, window));
}

async function fetchOpenMediaFeed(feed, window) {
  const body = await fetchText(feed.url);
  const parsed = xmlParser.parse(body);
  const entries = extractFeedEntries(parsed);
  const items = entries
    .map((entry) => normalizeExternalItem({
      title: entry.title?.['#text'] || entry.title,
      link: entry.link?.href || entry.link,
      description: entry.description || entry.summary || entry.content,
      content: entry['content:encoded'] || entry.content,
      pubDate: entry.pubDate || entry.updated || entry.published,
      source: feed.label,
      language: 'en',
    }, { source_domain: feed.domain, source_name: feed.label, source_type: 'media' }))
    .filter((item) => item.url && item.title && isWithinWindow(item.published_at, window));
  return items;
}
export async function fetchTheNewsApiFamilies(window = getEditionWindow()) {
  const diagnostics = [];
  const allItems = [];

  for (const family of OIKO_TOPIC_FAMILIES) {
    const result = await fetchTheNewsApiFamily(family, window);
    diagnostics.push(result.diagnostics);
    allItems.push(...result.items);
  }

  const uniqueTopics = new Set(allItems.map((item) => item.topic_family));
  if (allItems.length < 10 || uniqueTopics.size < 4) {
    for (const family of OIKO_CONDITIONAL_FAMILIES) {
      const result = await fetchTheNewsApiFamily(family, window);
      diagnostics.push(result.diagnostics);
      allItems.push(...result.items);
    }
  }

  return { items: allItems, diagnostics };
}

export async function fetchOfficialFeedItems(window = getEditionWindow()) {
  const results = await Promise.allSettled(OFFICIAL_FEEDS.map((feed) => fetchOfficialFeed(feed, window)));
  const items = [];
  const diagnostics = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
      diagnostics.push({ feed: OFFICIAL_FEEDS[index].key, count: result.value.length });
    } else {
      diagnostics.push({ feed: OFFICIAL_FEEDS[index].key, error: result.reason?.message || 'unknown_error' });
    }
  });

  return { items, diagnostics };
}

export async function fetchOpenMediaFeedItems(window = getEditionWindow()) {
  const results = await Promise.allSettled(OPEN_MEDIA_FEEDS.map((feed) => fetchOpenMediaFeed(feed, window)));
  const items = [];
  const diagnostics = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
      diagnostics.push({ feed: OPEN_MEDIA_FEEDS[index].key, count: result.value.length });
    } else {
      diagnostics.push({ feed: OPEN_MEDIA_FEEDS[index].key, error: result.reason?.message || 'unknown_error' });
    }
  });

  return { items, diagnostics };
}

export async function fetchNewsDataFallback(window = getEditionWindow()) {
  if (!process.env.NEWSDATA_API_KEY) {
    return { items: [], diagnostics: { skipped: 'missing_key' } };
  }

  const searchParams = new URLSearchParams({
    apikey: process.env.NEWSDATA_API_KEY,
    language: 'en,fr',
    q: 'inflation OR rates OR trade OR GDP OR unemployment OR energy OR euro OR dollar',
    category: 'business',
    removeduplicate: '1',
    domainurl: NEWSDATA_FALLBACK_DOMAINS.join(','),
  });

  const url = `https://newsdata.io/api/1/news?${searchParams.toString()}`;
  try {
    const data = await fetchJson(url);
    const results = Array.isArray(data?.results) ? data.results : [];
    const items = results
      .map((article) => normalizeExternalItem(article))
      .filter((item) => item.url && item.title && isWithinWindow(item.published_at, window));

    return {
      items,
      diagnostics: { count: items.length, status: data?.status || 'unknown' },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      items: [],
      diagnostics: { count: 0, error: message, status: 'error' },
    };
  }
}

export function filterEconomyItems(items, window = getEditionWindow()) {
  return items
    .filter((item) => item?.url && item?.title)
    .filter((item) => isWithinWindow(item.published_at, window))
    .filter((item) => isAllowedSourceDomain(item.source_domain) || item.source_type === 'official')
    .filter((item) => isEconomyRelevant(item))
    .filter((item) => isEditoriallyUsefulItem(item))
    .map((item) => ({
      ...item,
      topic_family: item.topic_family || inferTopicFamily(item),
      dedupe_key: item.dedupe_key || buildDedupeKey(item.title, item.source_domain),
      score: computeItemScore(item, window),
    }));
}

export function dedupeAndScoreItems(items, window = getEditionWindow()) {
  const groups = [];

  for (const item of items) {
    const group = groups.find((entry) => entry.dedupe_key === item.dedupe_key || titleSimilarity(entry.primary.title, item.title) >= 0.72);
    if (!group) {
      groups.push({ dedupe_key: item.dedupe_key, primary: item, related: [] });
      continue;
    }

    group.related.push(item);
    if ((item.score || 0) > (group.primary.score || 0)) {
      group.related.push(group.primary);
      group.primary = item;
    }
  }

  return groups
    .map((group) => {
      const corroborations = group.related
        .filter((item) => item.url !== group.primary.url)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 3);

      const enriched = {
        ...group.primary,
        score: computeItemScore(group.primary, window),
        evidence_pack: {
          primary: group.primary,
          corroborations,
          official_support: group.primary.source_type === 'official'
            ? group.primary
            : corroborations.find((item) => item.source_type === 'official') || null,
        },
      };
      return enriched;
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}

export function selectEditionItems(rankedItems) {
  const topStories = rankedItems.slice(0, VALIDATION_LIMITS.topStoriesMax);
  const briefs = rankedItems.slice(VALIDATION_LIMITS.topStoriesMax, VALIDATION_LIMITS.topStoriesMax + VALIDATION_LIMITS.briefsMax);
  const editorialAngle = topStories[0]?.title || "L'angle du jour";
  return {
    editorialAngle,
    topStories,
    briefs,
  };
}

export function buildEvidencePacks(topStories = []) {
  return topStories.map((story) => {
    const corroborations = story?.evidence_pack?.corroborations || [];
    const officialSupport = story?.evidence_pack?.official_support;
    const coverage =
      ((story?.snippet_raw?.length || 0) >= 80 ? 25 : 0)
      + (corroborations.length >= 1 ? 25 : 0)
      + (corroborations.length >= 2 ? 25 : 0)
      + (officialSupport || (story?.body_raw?.length || 0) >= 160 ? 25 : 0);

    return {
      primary: story,
      corroborations,
      officialSupport,
      coverage,
      sources: [story.url, ...corroborations.map((item) => item.url)].filter(Boolean),
    };
  });
}

export function calculateEvidenceCoverageScore(evidencePacks = []) {
  return Number(average(evidencePacks.map((pack) => pack.coverage)).toFixed(2));
}

async function fetchAlphaVantageSeries(symbol, usageDate) {
  if (!process.env.ALPHAVANTAGE_API_KEY) return null;
  const params = new URLSearchParams({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: 'compact',
    apikey: process.env.ALPHAVANTAGE_API_KEY,
  });
  const data = await fetchJson(`https://www.alphavantage.co/query?${params.toString()}`);
  trackOikoApiUsage('alphavantage', { usageDate, requests: 1, results: data['Time Series (Daily)'] ? 1 : 0 });
  return data['Time Series (Daily)'] || null;
}

async function fetchAlphaVantageFx(fromSymbol, toSymbol, usageDate) {
  if (!process.env.ALPHAVANTAGE_API_KEY) return null;
  const params = new URLSearchParams({
    function: 'FX_DAILY',
    from_symbol: fromSymbol,
    to_symbol: toSymbol,
    outputsize: 'compact',
    apikey: process.env.ALPHAVANTAGE_API_KEY,
  });
  const data = await fetchJson(`https://www.alphavantage.co/query?${params.toString()}`);
  trackOikoApiUsage('alphavantage', { usageDate, requests: 1, results: data['Time Series FX (Daily)'] ? 1 : 0 });
  return data['Time Series FX (Daily)'] || null;
}

function parseStooqSeries(csvText) {
  const lines = String(csvText || '').trim().split(/\r?\n/);
  if (lines.length < 2) return null;

  const entries = lines
    .slice(1)
    .map((line) => line.split(','))
    .map((parts) => ({
      date: String(parts[0] || '').trim(),
      close: Number(parts[4] || 0),
    }))
    .filter((entry) => entry.date && Number.isFinite(entry.close) && entry.close > 0);

  if (entries.length < 2) return null;

  return Object.fromEntries(entries.map((entry) => [entry.date, { '4. close': entry.close }]));
}

async function fetchStooqSeries(symbol, usageDate) {
  try {
    const text = await fetchText(`https://stooq.com/q/d/l/?s=${symbol}&i=d`, {
      headers: { 'User-Agent': 'OikoNews/1.0 (+https://localhost)' },
    });
    const series = parseStooqSeries(text);
    trackOikoApiUsage('stooq', { usageDate, requests: 1, results: series ? 1 : 0 });
    return series;
  } catch (_error) {
    return null;
  }
}

function buildSeriesPayload(rawSeries, count = 5) {
  if (!rawSeries) return null;
  const entries = Object.entries(rawSeries)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-count)
    .map(([date, values]) => ({
      label: date,
      value: Number(values['4. close'] || values['4b. close (USD)'] || values['4b. close'] || 0),
    }));

  if (entries.length < 2) return null;
  const first = entries[0].value;
  const last = entries[entries.length - 1].value;
  return {
    labels: entries.map((entry) => entry.label.slice(5)),
    points: entries.map((entry) => Number(entry.value.toFixed(4))),
    latestValue: Number(last.toFixed(4)),
    changePct: first ? Number((((last - first) / first) * 100).toFixed(2)) : 0,
  };
}

async function fetchSeriesWithFallback(symbol, usageDate, fallbackSymbol) {
  const primary = await fetchAlphaVantageSeries(symbol, usageDate);
  if (primary) return primary;
  if (!fallbackSymbol) return null;
  return fetchStooqSeries(fallbackSymbol, usageDate);
}

async function fetchFxWithFallback(fromSymbol, toSymbol, usageDate, fallbackSymbol) {
  const primary = await fetchAlphaVantageFx(fromSymbol, toSymbol, usageDate);
  if (primary) return primary;
  if (!fallbackSymbol) return null;
  return fetchStooqSeries(fallbackSymbol, usageDate);
}

async function fetchCoinGeckoSnapshot(usageDate) {
  const headers = process.env.COINGECKO_API_KEY
    ? { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
    : {};
  const params = new URLSearchParams({
    ids: 'bitcoin,ethereum',
    vs_currencies: 'usd',
    include_24hr_change: 'true',
  });
  const data = await fetchJson(`https://api.coingecko.com/api/v3/simple/price?${params.toString()}`, { headers });
  trackOikoApiUsage('coingecko', { usageDate, requests: 1, results: Object.keys(data || {}).length });
  return data;
}

function buildMarketItem(label, symbol, series, chartKey, allowedExplanations = []) {
  if (!series) return null;
  return {
    key: chartKey,
    name: symbol,
    label,
    period: '5d',
    latest_value: series.latestValue,
    change_pct: series.changePct,
    labels: series.labels,
    points: series.points,
    allowed_explanations: allowedExplanations,
  };
}

export function isNyseClosedDate(editionDate) {
  const date = new Date(`${editionDate}T12:00:00Z`);
  const utcDay = date.getUTCDay();
  return utcDay === 0 || utcDay === 6 || NYSE_HOLIDAYS.has(editionDate);
}

function getEquitiesNote(editionDate) {
  if (NYSE_HOLIDAYS.has(editionDate) || [0, 6].includes(new Date(`${editionDate}T12:00:00Z`).getUTCDay())) {
    return 'March\u00e9s actions ferm\u00e9s, derni\u00e8re cl\u00f4ture disponible.';
  }
  return 'March\u00e9s actions avant ouverture, derni\u00e8re cl\u00f4ture disponible.';
}

export async function fetchMarketSnapshot(editionDate, window = getEditionWindow(editionDate)) {
  const [spySeries, qqqSeries, fezSeries, eurusdSeries, cryptoSnapshot] = await Promise.allSettled([
    fetchSeriesWithFallback('SPY', editionDate, 'spy.us'),
    fetchSeriesWithFallback('QQQ', editionDate, 'qqq.us'),
    fetchSeriesWithFallback('FEZ', editionDate, 'fez.us'),
    fetchFxWithFallback('EUR', 'USD', editionDate, 'eurusd'),
    fetchCoinGeckoSnapshot(editionDate),
  ]);

  const equityItems = [];
  const changes = [];

  const spyPayload = spySeries.status === 'fulfilled' ? buildSeriesPayload(spySeries.value) : null;
  if (spyPayload) {
    equityItems.push(buildMarketItem('S&P 500', 'SPY', spyPayload, 'actions', ['taux', 'inflation', 'g\u00e9opolitique', 'croissance']));
    changes.push(spyPayload.changePct);
  }

  const qqqPayload = qqqSeries.status === 'fulfilled' ? buildSeriesPayload(qqqSeries.value) : null;
  if (qqqPayload) {
    equityItems.push(buildMarketItem('Nasdaq 100', 'QQQ', qqqPayload, 'actions', ['taux', 'app\u00e9tit pour le risque', 'croissance']));
    changes.push(qqqPayload.changePct);
  }

  const fezPayload = fezSeries.status === 'fulfilled' ? buildSeriesPayload(fezSeries.value) : null;
  const fezItem = fezPayload
    ? buildMarketItem('Euro Stoxx', 'FEZ', fezPayload, 'actions', ['zone euro', 'BCE', '\u00e9nergie'])
    : null;
  if (fezItem) {
    equityItems.push(fezItem);
    changes.push(fezPayload.changePct);
  }

  const fxPayload = eurusdSeries.status === 'fulfilled' ? buildSeriesPayload(eurusdSeries.value) : null;
  const fxItem = fxPayload
    ? buildMarketItem('EUR/USD', 'EUR/USD', fxPayload, 'europe-fx', ['BCE', 'Fed', 'diff\u00e9rentiel de taux'])
    : null;

  const cryptoItems = [];
  if (cryptoSnapshot.status === 'fulfilled' && cryptoSnapshot.value) {
    const btc = cryptoSnapshot.value.bitcoin;
    const eth = cryptoSnapshot.value.ethereum;
    if (btc) {
      cryptoItems.push({
        key: 'crypto',
        name: 'BTC',
        label: 'Bitcoin',
        period: '24h',
        latest_value: Number(btc.usd || 0),
        change_pct: Number((btc.usd_24h_change || 0).toFixed(2)),
        labels: ['24h'],
        points: [Number(btc.usd || 0)],
        allowed_explanations: ['app\u00e9tit pour le risque', 'r\u00e9gulation', 'dollar'],
      });
      changes.push(Number(btc.usd_24h_change || 0));
    }
    if (eth) {
      cryptoItems.push({
        key: 'crypto',
        name: 'ETH',
        label: 'Ethereum',
        period: '24h',
        latest_value: Number(eth.usd || 0),
        change_pct: Number((eth.usd_24h_change || 0).toFixed(2)),
        labels: ['24h'],
        points: [Number(eth.usd || 0)],
        allowed_explanations: ['app\u00e9tit pour le risque', 'r\u00e9gulation', 'activit\u00e9 crypto'],
      });
      changes.push(Number(eth.usd_24h_change || 0));
    }
  }

  const equitiesClosed = isNyseClosedDate(editionDate);
  const marketRegime = equitiesClosed ? 'closed_equities' : marketRegimeFromChanges(changes);

  return {
    editionDate,
    window,
    generated_at: new Date().toISOString(),
    equities_open: false,
    equities_note: getEquitiesNote(editionDate),
    market_regime: marketRegime,
    items: [...equityItems.slice(0, 3), ...(fxItem ? [fxItem] : []), ...cryptoItems].slice(0, 6),
    chartCandidates: {
      actions: equityItems.slice(0, 3),
      'europe-fx': [fxItem].filter(Boolean),
      crypto: cryptoItems,
    },
  };
}

export async function collectSourceItems(editionDate) {
  const window = getEditionWindow(editionDate);
  const [theNewsResult, officialResult, openMediaResult] = await Promise.all([
    fetchTheNewsApiFamilies(window),
    fetchOfficialFeedItems(window),
    fetchOpenMediaFeedItems(window),
  ]);

  const theNewsItems = theNewsResult.items || [];
  const officialItems = officialResult.items || [];
  const openMediaItems = openMediaResult.items || [];
  const merged = [...theNewsItems, ...officialItems, ...openMediaItems];
  let filtered = filterEconomyItems(merged, window);
  const diagnostics: any = {
    window,
    theNews: theNewsResult.diagnostics,
    official: officialResult.diagnostics,
    openMedia: openMediaResult.diagnostics,
    fallbackUsed: false,
  };

  if (filtered.length < 8) {
    const fallback = await fetchNewsDataFallback(window);
    diagnostics.fallbackUsed = true;
    diagnostics.newsdata = fallback.diagnostics;
    filtered = filterEconomyItems([...merged, ...fallback.items], window);
  }

  const ranked = dedupeAndScoreItems(filtered, window);
  const selection = selectEditionItems(ranked);
  const evidencePacks = buildEvidencePacks(selection.topStories);
  const evidenceCoverageScore = calculateEvidenceCoverageScore(evidencePacks);
  const marketSnapshot = await fetchMarketSnapshot(editionDate, window);

  return {
    window,
    diagnostics,
    rankedItems: ranked,
    selection,
    evidencePacks,
    evidenceCoverageScore,
    marketSnapshot,
  };
}

export function serializeItem(item) {
  const payload = {
    ...item,
    evidence_pack: item.evidence_pack
      ? {
          ...item.evidence_pack,
          official_support: item.evidence_pack.official_support || null,
          corroborations: item.evidence_pack.corroborations || [],
        }
      : undefined,
  };
  return JSON.stringify(payload);
}

export function parseStoredItem(row) {
  const parsed = safeJsonParse(row?.item_json, null);
  if (!parsed) {
    return {
      ...row,
      evidence_pack: { primary: row, corroborations: [], official_support: null },
    };
  }
  return {
    ...row,
    ...parsed,
  };
}

export default {
  fetchOpenMediaFeedItems,
  collectSourceItems,
  fetchMarketSnapshot,
  filterEconomyItems,
  dedupeAndScoreItems,
  buildEvidencePacks,
  calculateEvidenceCoverageScore,
  serializeItem,
  parseStoredItem,
};









