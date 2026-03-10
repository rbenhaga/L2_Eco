import path from 'path';
import { fileURLToPath } from 'url';
import { OIKO_TIMEZONE } from './utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.join(__dirname, '..');

export const OIKO_ALLOWED_DOMAINS = [
  'reuters.com',
  'apnews.com',
  'ft.com',
  'bloomberg.com',
  'wsj.com',
  'cnbc.com',
  'marketwatch.com',
  'economist.com',
  'nytimes.com',
  'bbc.com',
  'bbc.co.uk',
  'theguardian.com',
  'politico.eu',
  'lemonde.fr',
  'lesechos.fr',
  'abc.net.au',
  'dawn.com',
  'english.kyodonews.net',
  'economictimes.indiatimes.com',
  'livemint.com',
  'thehindubusinessline.com',
  'ecb.europa.eu',
  'federalreserve.gov',
  'bls.gov',
  'ec.europa.eu',
  'bea.gov',
  'imf.org',
  'oecd.org',
  'worldbank.org',
];

export const OIKO_TOPIC_FAMILIES = [
  {
    key: 'inflation_rates',
    label: 'Inflation, banques centrales et taux',
    search: 'inflation central bank rates ECB Fed monetary',
    categories: 'business,politics,general',
  },
  {
    key: 'jobs_consumption_growth',
    label: 'Emploi, consommation et croissance',
    search: 'jobs unemployment wages payrolls GDP growth consumption',
    categories: 'business,politics,general',
  },
  {
    key: 'trade_industry_energy',
    label: 'Commerce, industrie et énergie',
    search: 'trade tariffs exports manufacturing oil gas energy',
    categories: 'business,politics,general',
  },
  {
    key: 'europe_euro_area',
    label: 'Europe et zone euro',
    search: 'Europe euro area eurozone ECB Germany France Italy',
    categories: 'business,politics,general',
  },
  {
    key: 'china_asia_fx',
    label: 'Chine, Asie et changes',
    search: 'China Asia yuan yen dollar currency FX',
    categories: 'business,politics,general',
  },
];

export const OIKO_CONDITIONAL_FAMILIES = [
  {
    key: 'budget_debt_fiscal',
    label: 'Budget, dette et fiscalité',
    search: 'budget deficit debt bonds treasury fiscal taxation',
    categories: 'business,politics,general',
  },
  {
    key: 'institutions',
    label: 'Institutions économiques',
    search: 'IMF OECD World Bank Eurostat BLS BEA',
    categories: 'business,general',
  },
];

export const NEWSDATA_FALLBACK_DOMAINS = [
  'english.kyodonews.net',
  'economictimes.indiatimes.com',
  'livemint.com',
  'abc.net.au',
  'thehindubusinessline.com',
];

export const OFFICIAL_FEEDS = [
  { key: 'ecb-press', label: 'ECB Press', url: 'https://www.ecb.europa.eu/rss/press.html', domain: 'ecb.europa.eu', sourceType: 'official' },
  { key: 'ecb-blogs', label: 'ECB Blog', url: 'https://www.ecb.europa.eu/press/blog/html/index.en.html', domain: 'ecb.europa.eu', sourceType: 'official', parser: 'ecb_blog_html' },
  { key: 'fed-monetary', label: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_monetary.xml', domain: 'federalreserve.gov', sourceType: 'official' },
  { key: 'bls-latest', label: 'BLS', url: 'https://www.bls.gov/feed/bls_latest.rss', domain: 'bls.gov', sourceType: 'official' },
  { key: 'eurostat-news', label: 'Eurostat', url: 'https://ec.europa.eu/eurostat/web/products-euro-indicators', domain: 'ec.europa.eu', sourceType: 'official', parser: 'eurostat_html' },
  { key: 'bea-rss', label: 'BEA', url: 'https://www.bea.gov/rss/rss.xml', domain: 'bea.gov', sourceType: 'official' },
];

export const OPEN_MEDIA_FEEDS = [
  { key: 'bbc-business', label: 'BBC Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml', domain: 'bbc.com', sourceType: 'media' },
  { key: 'abc-business', label: 'ABC Business', url: 'https://www.abc.net.au/news/feed/51892/rss.xml', domain: 'abc.net.au', sourceType: 'media' },
  { key: 'cnbc-open', label: 'CNBC Open Feed', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', domain: 'cnbc.com', sourceType: 'media' },
  { key: 'cnbc-world', label: 'CNBC World', url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html', domain: 'cnbc.com', sourceType: 'media' },
  { key: 'guardian-business', label: 'Guardian Business', url: 'https://www.theguardian.com/business/rss', domain: 'theguardian.com', sourceType: 'media' },
];

export const MARKET_SYMBOLS = {
  equities: [
    { symbol: 'SPY', label: 'S&P 500', provider: 'alphavantage', series: 'TIME_SERIES_DAILY', periodLabel: '5 séances' },
    { symbol: 'QQQ', label: 'Nasdaq 100', provider: 'alphavantage', series: 'TIME_SERIES_DAILY', periodLabel: '5 séances' },
    { symbol: 'FEZ', label: 'Euro Stoxx', provider: 'alphavantage', series: 'TIME_SERIES_DAILY', periodLabel: '5 séances' },
  ],
  fx: [
    { symbol: 'EURUSD', label: 'EUR/USD', provider: 'alphavantage', fromSymbol: 'EUR', toSymbol: 'USD', periodLabel: '5 séances' },
  ],
  crypto: [
    { symbol: 'bitcoin', label: 'BTC', provider: 'coingecko', periodLabel: '24h' },
    { symbol: 'ethereum', label: 'ETH', provider: 'coingecko', periodLabel: '24h' },
  ],
};

export const ECONOMY_INCLUDE_KEYWORDS = [
  'inflation', 'cpi', 'interest rate', 'rates', 'ecb', 'fed', 'central bank', 'gdp', 'growth', 'recession',
  'budget', 'deficit', 'debt', 'tariff', 'trade', 'unemployment', 'jobs', 'wages', 'oil', 'crude', 'gas', 'energy',
  'euro', 'dollar', 'currency', 'fx', 'consumption', 'retail', 'production', 'manufacturing', 'treasury',
  'boj', 'bank of japan', 'safe haven', 'market sell-off', 'sell-off', 'oil shock', 'energy supplies', 'gas supplies',
  'bonds', 'fiscal', 'bea', 'bls', 'eurostat', 'oecd', 'imf', 'world bank', 'china', 'yuan', 'yen',
];

export const ECONOMY_EXCLUDE_KEYWORDS = [
  'celebrity', 'sport', 'football', 'soccer', 'nba', 'tennis', 'movie', 'music', 'fashion', 'travel', 'food',
  'weather', 'crime', 'murder', 'arrest', 'wedding', 'iphone', 'android phone', 'gaming', 'esports', 'tiktok',
  'rumor', 'viral', 'meme', 'crypto meme', 'dogecoin', 'nft', 'altcoin season',
  'stocks to buy', 'stock recommendations', 'buy call', 'sell call', 'mutual fund', 'fund managers', 'marketsmith', 'podcast',
  'what should investors do', 'check targets', 'prediction today', 'stay out of the market', 'top analysts', 'bullish on these',
];

export const VALIDATION_LIMITS = {
  topStoriesMin: 4,
  topStoriesMax: 6,
  briefsMin: 3,
  briefsMax: 5,
  summaryMin: 3,
  summaryMax: 5,
  maxStorySources: 4,
  maxCharts: 2,
  analysisShortThreshold: 50,
  requestBudgetPerDay: 14,
  requestBudgetCore: 5,
  requestBudgetConditional: 2,
};

export const NYSE_HOLIDAYS = new Set([
  '2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25', '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25',
  '2027-01-01', '2027-01-18', '2027-02-15', '2027-03-26', '2027-05-31', '2027-06-18', '2027-07-05', '2027-09-06', '2027-11-25', '2027-12-24',
  '2028-01-17', '2028-02-21', '2028-04-14', '2028-05-29', '2028-06-19', '2028-07-04', '2028-09-04', '2028-11-23', '2028-12-25'
]);

export const OIKO_CONFIG = {
  timeZone: OIKO_TIMEZONE,
  publicBaseUrl: process.env.OIKO_PUBLIC_BASE_URL || process.env.API_URL || process.env.BACKEND_URL || 'http://localhost:3001',
  frontendBaseUrl: process.env.OIKO_FRONTEND_BASE_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
  primaryProvider: process.env.OIKO_PRIMARY_PROVIDER || 'groq',
  primaryModel: process.env.OIKO_PRIMARY_MODEL || 'llama-3.3-70b-versatile',
  secondaryProvider: process.env.OIKO_SECONDARY_PROVIDER || '',
  secondaryModel: process.env.OIKO_SECONDARY_MODEL || '',
  mailFrom: process.env.OIKO_MAIL_FROM || 'Oiko News <newsletter@example.com>',
  requestBudgetPerDay: VALIDATION_LIMITS.requestBudgetPerDay,
  chartsDir: path.join(backendRoot, 'public', 'oiko-news', 'charts'),
  staticDir: path.join(backendRoot, 'public', 'oiko-news'),
  editionPath: '/oiko-news',
  archivePageSize: 20,
  minimumStoryCount: VALIDATION_LIMITS.topStoriesMin,
};

export default OIKO_CONFIG;



