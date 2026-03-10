import OIKO_CONFIG from './config.ts';
import { oikoQueries } from './queries.ts';
import { addDays, getTodayInTimeZone, toAbsoluteUrl } from './utils.ts';

export type OikoTrackedServiceKey =
  | 'thenewsapi'
  | 'groq_llama_3_3_70b'
  | 'groq_llama_3_1_8b'
  | 'alphavantage'
  | 'stooq'
  | 'coingecko'
  | 'pixabay'
  | 'pexels'
  | 'wikimedia';

type OikoServiceMeta = {
  key: OikoTrackedServiceKey;
  label: string;
  requiresKey: boolean;
  envKey?: string;
  docsUrl: string;
  planLabel: string;
  freeLimitLabel: string;
  note: string;
};

const OIKO_SERVICE_CATALOG: OikoServiceMeta[] = [
  {
    key: 'thenewsapi',
    label: 'TheNewsAPI',
    requiresKey: true,
    envKey: 'THENEWS_API_TOKEN',
    docsUrl: 'https://www.thenewsapi.com/pricing',
    planLabel: 'Free',
    freeLimitLabel: '100 requêtes/jour • 3 articles/requête',
    note: 'Oiko interroge uniquement /news/all avec des requêtes ciblées.',
  },
  {
    key: 'groq_llama_3_3_70b',
    label: 'Groq llama-3.3-70b-versatile',
    requiresKey: true,
    envKey: 'GROQ_API_KEY',
    docsUrl: 'https://console.groq.com/docs/rate-limits',
    planLabel: 'Developer',
    freeLimitLabel: '30 RPM • 12K TPM • 100K TPD • 1K RPD',
    note: 'Modèle éditorial principal Oiko.',
  },
  {
    key: 'groq_llama_3_1_8b',
    label: 'Groq llama-3.1-8b-instant',
    requiresKey: true,
    envKey: 'GROQ_API_KEY',
    docsUrl: 'https://console.groq.com/docs/rate-limits',
    planLabel: 'Developer',
    freeLimitLabel: '30 RPM • 6K TPM • 500K TPD • 14.4K RPD',
    note: 'Utilisé pour les micro-tâches et la réparation JSON.',
  },
  {
    key: 'alphavantage',
    label: 'Alpha Vantage',
    requiresKey: true,
    envKey: 'ALPHAVANTAGE_API_KEY',
    docsUrl: 'https://www.alphavantage.co/premium/',
    planLabel: 'Free',
    freeLimitLabel: '25 requêtes/jour',
    note: 'Sert aux snapshots marchés et FX.',
  },
  {
    key: 'stooq',
    label: 'Stooq CSV',
    requiresKey: false,
    docsUrl: 'https://stooq.com/',
    planLabel: 'Public CSV',
    freeLimitLabel: 'Pas de quota journalier document?',
    note: 'Fallback actions/FX pour ?viter une section march?s vide quand Alpha Vantage manque.',
  },
  {
    key: 'coingecko',
    label: 'CoinGecko Demo',
    requiresKey: false,
    envKey: 'COINGECKO_API_KEY',
    docsUrl: 'https://docs.coingecko.com/docs/common-errors-rate-limit',
    planLabel: 'Demo',
    freeLimitLabel: '30 appels/minute • 10 000/mois',
    note: 'La clé demo reste recommandée même si certains appels passent sans.',
  },
  {
    key: 'pixabay',
    label: 'Pixabay API',
    requiresKey: true,
    envKey: 'PIXABAY_API_KEY',
    docsUrl: 'https://pixabay.com/api/docs/',
    planLabel: 'Free',
    freeLimitLabel: '100 requêtes / 60 secondes',
    note: 'Provider image primaire pour Oiko.',
  },
  {
    key: 'pexels',
    label: 'Pexels API',
    requiresKey: true,
    envKey: 'PEXELS_API_KEY',
    docsUrl: 'https://www.pexels.com/api/documentation/',
    planLabel: 'Free',
    freeLimitLabel: '200 requêtes/heure • 20 000/mois',
    note: 'Fallback image premium.',
  },
  {
    key: 'wikimedia',
    label: 'Wikimedia Commons API',
    requiresKey: false,
    envKey: 'WIKIMEDIA_USER_AGENT',
    docsUrl: 'https://www.mediawiki.org/wiki/API:Etiquette',
    planLabel: 'Public API',
    freeLimitLabel: 'Pas de quota journalier gratuit fixe documenté',
    note: 'Pas de clé requise en lecture ; User-Agent descriptif recommandé par la doc MediaWiki.',
  },
];

function getServiceMetaMap() {
  return new Map(OIKO_SERVICE_CATALOG.map((service) => [service.key, service]));
}

function isServiceConfigured(service: OikoServiceMeta) {
  if (!service.envKey) return true;
  return Boolean(process.env[service.envKey]);
}

export function getOikoUsageServiceCatalog() {
  return OIKO_SERVICE_CATALOG.map((service) => ({
    ...service,
    configured: isServiceConfigured(service),
  }));
}

export function getGroqTrackedServiceKey(model: string) {
  if (model === 'llama-3.3-70b-versatile') return 'groq_llama_3_3_70b';
  if (model === 'llama-3.1-8b-instant') return 'groq_llama_3_1_8b';
  return null;
}

export function trackOikoApiUsage(
  serviceKey: OikoTrackedServiceKey,
  {
    usageDate = getTodayInTimeZone(),
    requests = 0,
    tokens = 0,
    results = 0,
    lastRequestAt = new Date().toISOString(),
  }: {
    usageDate?: string;
    requests?: number;
    tokens?: number;
    results?: number;
    lastRequestAt?: string;
  } = {},
) {
  const meta = getServiceMetaMap().get(serviceKey);
  if (!meta) return;

  oikoQueries.usageDaily.bump.run(
    usageDate,
    serviceKey,
    Math.max(0, Number(requests || 0)),
    Math.max(0, Number(tokens || 0)),
    Math.max(0, Number(results || 0)),
    lastRequestAt,
  );
}

export function getOikoAdminOverview(targetDate = getTodayInTimeZone()) {
  const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(targetDate) ? targetDate : getTodayInTimeZone();
  const startDate = addDays(normalizedDate, -6);
  const rows = oikoQueries.usageDaily.listBetweenDates.all(startDate, normalizedDate);
  const grouped = new Map<string, any>();

  for (const row of rows) {
    grouped.set(`${row.usage_date}:${row.service_key}`, row);
  }

  const services = getOikoUsageServiceCatalog().map((service) => {
    const todayUsage = grouped.get(`${targetDate}:${service.key}`) || null;
    const history = rows
      .filter((row: any) => row.service_key === service.key)
      .sort((a: any, b: any) => a.usage_date.localeCompare(b.usage_date))
      .map((row: any) => ({
        usageDate: row.usage_date,
        requestsCount: row.requests_count,
        tokensUsed: row.tokens_used,
        resultsCount: row.results_count,
      }));

    return {
      ...service,
      usage: {
        requestsCount: todayUsage?.requests_count || 0,
        tokensUsed: todayUsage?.tokens_used || 0,
        resultsCount: todayUsage?.results_count || 0,
        lastRequestAt: todayUsage?.last_request_at || null,
      },
      history,
    };
  });

  const latestEdition = oikoQueries.editions.getLatest.get();
  const latest = latestEdition
    ? {
        editionDate: latestEdition.edition_date,
        slug: latestEdition.slug,
        status: latestEdition.status,
        siteUrl: toAbsoluteUrl(OIKO_CONFIG.frontendBaseUrl, `/oiko-news/${latestEdition.slug}`),
        compareUrl: toAbsoluteUrl(OIKO_CONFIG.frontendBaseUrl, `/oiko-news/${latestEdition.slug}/compare`),
        emailHtmlUrl: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/api/oiko-news/${latestEdition.slug}/email-html`),
      }
    : null;

  const summary = services.reduce(
    (accumulator, service) => {
      accumulator.requestsCount += service.usage.requestsCount;
      accumulator.tokensUsed += service.usage.tokensUsed;
      accumulator.resultsCount += service.usage.resultsCount;
      if (service.configured) accumulator.configuredCount += 1;
      return accumulator;
    },
    { requestsCount: 0, tokensUsed: 0, resultsCount: 0, configuredCount: 0 },
  );

  return {
    selectedDate: normalizedDate,
    windowStartDate: startDate,
    latestEdition: latest,
    summary,
    services,
  };
}

export default {
  getOikoUsageServiceCatalog,
  getGroqTrackedServiceKey,
  trackOikoApiUsage,
  getOikoAdminOverview,
};



