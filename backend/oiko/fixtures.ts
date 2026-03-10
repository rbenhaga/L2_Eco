import { NYSE_HOLIDAYS } from './config.ts';
import { buildEvidencePacks, calculateEvidenceCoverageScore, selectEditionItems } from './sources.ts';
import { buildDedupeKey, getEditionWindow, marketRegimeFromChanges } from './utils.ts';

export const OIKO_FIXTURE_MODES = ['baseline', 'low-evidence'] as const;
export type OikoFixtureMode = (typeof OIKO_FIXTURE_MODES)[number];

type FixtureItemInput = {
  domain: string;
  sourceName: string;
  sourceType?: 'official' | 'media' | 'api';
  topicFamily: string;
  title: string;
  slug: string;
  snippet: string;
  body?: string;
  score: number;
  language?: string;
  publishedOffsetHours: number;
};

type FixtureSupportInput = {
  domain: string;
  sourceName: string;
  title: string;
  slug: string;
  snippet: string;
  publishedOffsetHours: number;
  sourceType?: 'official' | 'media' | 'api';
};

function buildFixtureUrl(domain: string, editionDate: string, slug: string) {
  return `https://${domain}/oiko/${editionDate}/${slug}`;
}

function buildPublishedAt(startIso: string, offsetHours: number) {
  return new Date(new Date(startIso).getTime() + offsetHours * 60 * 60 * 1000).toISOString();
}

function createSupportItem(editionDate: string, startIso: string, input: FixtureSupportInput) {
  return {
    source_name: input.sourceName,
    source_domain: input.domain,
    source_type: input.sourceType || 'media',
    url: buildFixtureUrl(input.domain, editionDate, input.slug),
    title: input.title,
    published_at: buildPublishedAt(startIso, input.publishedOffsetHours),
    language: 'fr',
    snippet_raw: input.snippet,
    body_raw: input.snippet,
    topic_family: 'institutions',
    dedupe_key: buildDedupeKey(input.title, input.domain),
    score: 0,
  };
}

function createPrimaryItem(editionDate: string, startIso: string, input: FixtureItemInput) {
  return {
    source_name: input.sourceName,
    source_domain: input.domain,
    source_type: input.sourceType || 'media',
    url: buildFixtureUrl(input.domain, editionDate, input.slug),
    title: input.title,
    published_at: buildPublishedAt(startIso, input.publishedOffsetHours),
    language: input.language || 'fr',
    snippet_raw: input.snippet,
    body_raw: input.body || input.snippet,
    topic_family: input.topicFamily,
    dedupe_key: buildDedupeKey(input.title, input.domain),
    score: input.score,
  };
}

function isNyseClosedDate(editionDate: string) {
  const date = new Date(`${editionDate}T12:00:00Z`);
  const day = date.getUTCDay();
  return day === 0 || day === 6 || NYSE_HOLIDAYS.has(editionDate);
}

function buildChartSeries(labels: string[], points: number[]) {
  const first = points[0] || 0;
  const last = points[points.length - 1] || 0;
  return {
    labels,
    points,
    latestValue: Number(last.toFixed(4)),
    changePct: first ? Number((((last - first) / first) * 100).toFixed(2)) : 0,
  };
}

function buildFixtureMarketSnapshot(editionDate: string) {
  const equitiesClosed = isNyseClosedDate(editionDate);
  const actionLabels = ['J-4', 'J-3', 'J-2', 'J-1', 'J'];
  const cryptoLabels = ['00h', '06h', '12h', '18h', '24h'];

  const spySeries = buildChartSeries(actionLabels, [528.2, 526.8, 525.4, 524.7, 523.1]);
  const qqqSeries = buildChartSeries(actionLabels, [456.4, 452.9, 450.6, 448.8, 446.7]);
  const fezSeries = buildChartSeries(actionLabels, [51.7, 51.9, 52.1, 52.3, 52.5]);
  const eurusdSeries = buildChartSeries(actionLabels, [1.079, 1.08, 1.0815, 1.083, 1.0842]);
  const btcSeries = buildChartSeries(cryptoLabels, [85500, 85100, 84620, 84340, 84180]);
  const ethSeries = buildChartSeries(cryptoLabels, [2235, 2208, 2182, 2156, 2144]);

  const allChanges = [spySeries.changePct, qqqSeries.changePct, fezSeries.changePct, btcSeries.changePct, ethSeries.changePct];

  const items = [
    {
      key: 'actions',
      name: 'SPY',
      label: 'S&P 500',
      period: '5 séances',
      latest_value: spySeries.latestValue,
      change_pct: spySeries.changePct,
      labels: spySeries.labels,
      points: spySeries.points,
      allowed_explanations: ['taux', 'inflation', 'géopolitique', 'croissance'],
      chart_url: '',
    },
    {
      key: 'actions',
      name: 'QQQ',
      label: 'Nasdaq 100',
      period: '5 séances',
      latest_value: qqqSeries.latestValue,
      change_pct: qqqSeries.changePct,
      labels: qqqSeries.labels,
      points: qqqSeries.points,
      allowed_explanations: ['taux', 'appétit pour le risque', 'croissance'],
      chart_url: '',
    },
    {
      key: 'europe-fx',
      name: 'FEZ',
      label: 'Euro Stoxx',
      period: '5 séances',
      latest_value: fezSeries.latestValue,
      change_pct: fezSeries.changePct,
      labels: fezSeries.labels,
      points: fezSeries.points,
      allowed_explanations: ['zone euro', 'BCE', 'énergie'],
      chart_url: '',
    },
    {
      key: 'europe-fx',
      name: 'EUR/USD',
      label: 'EUR/USD',
      period: '5 séances',
      latest_value: eurusdSeries.latestValue,
      change_pct: eurusdSeries.changePct,
      labels: eurusdSeries.labels,
      points: eurusdSeries.points,
      allowed_explanations: ['BCE', 'Fed', 'différentiel de taux'],
      chart_url: '',
    },
    {
      key: 'crypto',
      name: 'BTC',
      label: 'Bitcoin',
      period: '24h',
      latest_value: btcSeries.latestValue,
      change_pct: btcSeries.changePct,
      labels: btcSeries.labels,
      points: btcSeries.points,
      allowed_explanations: ['appétit pour le risque', 'régulation', 'dollar'],
      chart_url: '',
    },
    {
      key: 'crypto',
      name: 'ETH',
      label: 'Ethereum',
      period: '24h',
      latest_value: ethSeries.latestValue,
      change_pct: ethSeries.changePct,
      labels: ethSeries.labels,
      points: ethSeries.points,
      allowed_explanations: ['appétit pour le risque', 'régulation', 'activité crypto'],
      chart_url: '',
    },
  ];

  return {
    editionDate,
    window: getEditionWindow(editionDate),
    generated_at: new Date().toISOString(),
    equities_open: false,
    equities_note: equitiesClosed
      ? 'Marchés actions fermés, dernière clôture disponible.'
      : 'Marchés actions avant ouverture, dernière clôture disponible.',
    market_regime: equitiesClosed ? 'closed_equities' : marketRegimeFromChanges(allChanges),
    items,
    chartCandidates: {
      actions: items.filter((item) => item.key === 'actions').slice(0, 2),
      'europe-fx': items.filter((item) => item.key === 'europe-fx').slice(0, 2),
      crypto: items.filter((item) => item.key === 'crypto').slice(0, 2),
    },
  };
}

function buildBaselineRankedItems(editionDate: string, window: ReturnType<typeof getEditionWindow>, mode: OikoFixtureMode) {
  const lowEvidence = mode === 'low-evidence';

  const ecbPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'reuters.com',
    sourceName: 'Reuters',
    topicFamily: 'inflation_rates',
    title: 'La BCE prépare un ton plus souple face au reflux de l’inflation',
    slug: 'bce-ton-plus-souple',
    snippet: lowEvidence
      ? 'La BCE souligne un reflux progressif de l’inflation et un marché du crédit plus calme.'
      : 'La BCE insiste sur le ralentissement de l’inflation sous-jacente et sur des conditions de crédit plus calmes, ce qui nourrit l’idée d’un assouplissement graduel si les prochains indicateurs confirment la tendance.',
    body: lowEvidence
      ? 'La BCE évoque un reflux progressif de l’inflation.'
      : 'Des responsables de la BCE jugent que la désinflation progresse de façon assez large et que la demande reste modérée. Cela renforce l’idée qu’une banque centrale peut bientôt déplacer son curseur sans abandonner la prudence sur les salaires et les services.',
    score: 10.4,
    publishedOffsetHours: 2,
  });

  const payrollPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'apnews.com',
    sourceName: 'AP',
    topicFamily: 'jobs_consumption_growth',
    title: 'L’emploi américain ralentit, avec des salaires moins dynamiques',
    slug: 'emploi-americain-ralentit',
    snippet: lowEvidence
      ? 'Le marché du travail américain reste solide mais ralentit légèrement.'
      : 'Les créations d’emplois restent positives mais moins vives, tandis que la progression des salaires se tasse. Le signal alimente le débat sur un atterrissage plus doux de l’économie américaine.',
    body: lowEvidence
      ? 'Le rythme d’embauche ralentit un peu.'
      : 'Des créations d’emplois encore positives, combinées à une hausse salariale plus modérée, peuvent desserrer une partie de la pression inflationniste sans indiquer un choc brutal sur l’activité. Pour des étudiants de licence, c’est un bon cas de lecture du lien entre marché du travail, inflation et politique monétaire.',
    score: 9.7,
    publishedOffsetHours: 5,
  });

  const chinaPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'ft.com',
    sourceName: 'Financial Times',
    topicFamily: 'china_asia_fx',
    title: 'Les exportations chinoises perdent en élan malgré le soutien public',
    slug: 'exportations-chinoises-ralentissent',
    snippet: lowEvidence
      ? 'Les exportations chinoises ralentissent et la demande intérieure reste fragile.'
      : 'Le commerce extérieur chinois décélère tandis que la demande intérieure reste faible, ce qui entretient les doutes sur la solidité de la reprise malgré le soutien des autorités.',
    body: lowEvidence
      ? 'La reprise chinoise reste fragile.'
      : 'Une Chine moins dynamique pèse rapidement sur le commerce mondial, les devises asiatiques et le prix des matières premières. C’est un bon exemple de transmission internationale d’un ralentissement de croissance.',
    score: 9.3,
    publishedOffsetHours: 8,
  });

  const oilPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'bloomberg.com',
    sourceName: 'Bloomberg',
    topicFamily: 'trade_industry_energy',
    title: 'Le pétrole remonte avec les tensions sur les routes maritimes',
    slug: 'petrole-routes-maritimes',
    snippet: lowEvidence
      ? 'Les prix du pétrole repartent à la hausse sur fond de tensions logistiques.'
      : 'Les cours du pétrole repartent à la hausse alors que des tensions sur les routes maritimes alimentent les craintes sur l’offre. Le mouvement ravive les questions sur le coût de l’énergie et l’inflation importée.',
    body: lowEvidence
      ? 'Le baril monte avec les tensions.'
      : 'Une hausse durable de l’énergie peut rapidement toucher l’inflation, le revenu réel des ménages et les marges des entreprises. C’est un cas typique de choc d’offre discuté en macroéconomie.',
    score: 8.8,
    publishedOffsetHours: 11,
  });

  const germanyPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'lesechos.fr',
    sourceName: 'Les Échos',
    topicFamily: 'budget_debt_fiscal',
    title: 'L’Allemagne annonce un plan d’investissement ciblé sur l’industrie',
    slug: 'allemagne-plan-investissement-industrie',
    snippet: lowEvidence
      ? 'Berlin présente un plan d’investissement public centré sur l’industrie.'
      : 'Berlin présente un plan d’investissement public tourné vers l’industrie, l’énergie et la défense, avec l’objectif de soutenir la capacité productive dans un contexte de croissance molle.',
    body: lowEvidence
      ? 'Le plan vise l’industrie et l’énergie.'
      : 'Le sujet éclaire la différence entre soutien conjoncturel et politique de l’offre. Il permet aussi de discuter des arbitrages entre déficit public, compétitivité et croissance potentielle.',
    score: 8.4,
    publishedOffsetHours: 14,
  });

  const eurostatPrimary = createPrimaryItem(editionDate, window.startIso, {
    domain: 'ec.europa.eu',
    sourceName: 'Eurostat',
    sourceType: 'official',
    topicFamily: 'europe_euro_area',
    title: 'Les ventes de détail de la zone euro se redressent légèrement',
    slug: 'zone-euro-ventes-detail',
    snippet: lowEvidence
      ? 'Les ventes de détail se redressent légèrement dans la zone euro.'
      : 'Eurostat signale un léger redressement des ventes de détail dans la zone euro, un indicateur utile pour suivre la consommation des ménages après plusieurs mois hésitants.',
    body: lowEvidence
      ? 'La consommation repart modestement.'
      : 'Ce type de publication aide à relier données de consommation, confiance des ménages et rythme de croissance. Pour un étudiant de licence, c’est un repère simple entre demande intérieure et activité.',
    score: 8.1,
    publishedOffsetHours: 17,
  });

  const rankedItems = [
    {
      ...ecbPrimary,
      evidence_pack: {
        primary: ecbPrimary,
        corroborations: lowEvidence
          ? []
          : [
              createSupportItem(editionDate, window.startIso, {
                domain: 'apnews.com',
                sourceName: 'AP',
                title: 'La désinflation européenne conforte la BCE',
                slug: 'desinflation-europe-bce',
                snippet: 'Plusieurs indicateurs européens confirment un ralentissement de l’inflation, ce qui conforte la BCE dans une ligne plus souple.',
                publishedOffsetHours: 3,
              }),
              createSupportItem(editionDate, window.startIso, {
                domain: 'ft.com',
                sourceName: 'Financial Times',
                title: 'Les marchés anticipent une BCE moins restrictive',
                slug: 'marches-anticipent-bce-souple',
                snippet: 'Les investisseurs lisent les derniers signaux de la BCE comme la préparation d’un cycle plus souple si les données restent favorables.',
                publishedOffsetHours: 4,
              }),
            ],
        official_support: lowEvidence
          ? null
          : createSupportItem(editionDate, window.startIso, {
              domain: 'ecb.europa.eu',
              sourceName: 'ECB Press',
              sourceType: 'official',
              title: 'ECB press release on inflation and financing conditions',
              slug: 'ecb-press-inflation-financing',
              snippet: 'The ECB notes continued disinflation and tighter but stabilising financing conditions across the euro area.',
              publishedOffsetHours: 2,
            }),
      },
    },
    {
      ...payrollPrimary,
      evidence_pack: {
        primary: payrollPrimary,
        corroborations: lowEvidence
          ? []
          : [
              createSupportItem(editionDate, window.startIso, {
                domain: 'reuters.com',
                sourceName: 'Reuters',
                title: 'Les créations d’emplois américaines surprennent moins à la hausse',
                slug: 'emplois-americains-surprennent-moins',
                snippet: 'Les chiffres américains restent solides mais montrent une détente progressive sur les salaires et l’embauche.',
                publishedOffsetHours: 6,
              }),
            ],
        official_support: lowEvidence
          ? null
          : createSupportItem(editionDate, window.startIso, {
              domain: 'bls.gov',
              sourceName: 'BLS',
              sourceType: 'official',
              title: 'Employment Situation release',
              slug: 'bls-employment-situation',
              snippet: 'The Employment Situation report shows continued payroll gains with more moderate wage growth.',
              publishedOffsetHours: 5,
            }),
      },
    },
    {
      ...chinaPrimary,
      evidence_pack: {
        primary: chinaPrimary,
        corroborations: lowEvidence
          ? []
          : [
              createSupportItem(editionDate, window.startIso, {
                domain: 'reuters.com',
                sourceName: 'Reuters',
                title: 'La demande intérieure chinoise reste trop faible pour relayer l’export',
                slug: 'demande-interieure-chinoise-faible',
                snippet: 'Les observateurs jugent que la faiblesse persistante de la demande domestique freine la reprise chinoise.',
                publishedOffsetHours: 9,
              }),
            ],
        official_support: null,
      },
    },
    {
      ...oilPrimary,
      evidence_pack: {
        primary: oilPrimary,
        corroborations: lowEvidence
          ? []
          : [
              createSupportItem(editionDate, window.startIso, {
                domain: 'reuters.com',
                sourceName: 'Reuters',
                title: 'Les craintes logistiques poussent le pétrole vers de nouveaux sommets mensuels',
                slug: 'petrole-sommets-mensuels',
                snippet: 'Les risques sur l’approvisionnement et la logistique soutiennent les cours du brut.',
                publishedOffsetHours: 12,
              }),
            ],
        official_support: null,
      },
    },
    {
      ...germanyPrimary,
      evidence_pack: {
        primary: germanyPrimary,
        corroborations: lowEvidence
          ? []
          : [
              createSupportItem(editionDate, window.startIso, {
                domain: 'apnews.com',
                sourceName: 'AP',
                title: 'Berlin met l’investissement productif au centre de sa réponse économique',
                slug: 'berlin-investissement-productif',
                snippet: 'Le gouvernement allemand cherche à soutenir l’offre industrielle et la transition énergétique par l’investissement.',
                publishedOffsetHours: 15,
              }),
            ],
        official_support: null,
      },
    },
    {
      ...eurostatPrimary,
      evidence_pack: {
        primary: eurostatPrimary,
        corroborations: lowEvidence ? [] : [],
        official_support: lowEvidence ? null : eurostatPrimary,
      },
    },
    createPrimaryItem(editionDate, window.startIso, {
      domain: 'reuters.com',
      sourceName: 'Reuters',
      topicFamily: 'trade_industry_energy',
      title: 'Washington relance les discussions tarifaires sur plusieurs biens industriels',
      slug: 'washington-discussions-tarifaires',
      snippet: 'De nouvelles discussions sur les droits de douane ravivent l’incertitude pour les chaînes d’approvisionnement et les coûts à l’importation.',
      score: 7.6,
      publishedOffsetHours: 18,
    }),
    createPrimaryItem(editionDate, window.startIso, {
      domain: 'imf.org',
      sourceName: 'IMF',
      sourceType: 'official',
      topicFamily: 'institutions',
      title: 'Le FMI alerte sur une croissance mondiale encore freinée par les tensions commerciales',
      slug: 'fmi-croissance-mondiale-tensions-commerciales',
      snippet: 'Le FMI souligne que l’investissement et le commerce mondial restent fragiles dans un environnement de tensions commerciales persistantes.',
      score: 7.1,
      publishedOffsetHours: 19,
    }),
    createPrimaryItem(editionDate, window.startIso, {
      domain: 'oecd.org',
      sourceName: 'OECD',
      sourceType: 'official',
      topicFamily: 'institutions',
      title: 'L’OCDE voit une reprise de productivité encore trop inégale entre secteurs',
      slug: 'ocde-productivite-inegale',
      snippet: 'L’OCDE observe une reprise de productivité trop inégale pour soutenir durablement la croissance potentielle.',
      score: 6.8,
      publishedOffsetHours: 20,
    }),
  ];

  return rankedItems;
}

export function buildFixtureCollection(editionDate: string, mode: OikoFixtureMode = 'baseline') {
  const window = getEditionWindow(editionDate);
  const rankedItems = buildBaselineRankedItems(editionDate, window, mode);
  const selection = selectEditionItems(rankedItems);
  const evidencePacks = buildEvidencePacks(selection.topStories);
  const evidenceCoverageScore = calculateEvidenceCoverageScore(evidencePacks);
  const marketSnapshot = buildFixtureMarketSnapshot(editionDate);

  return {
    window,
    diagnostics: {
      fixtureMode: mode,
      source: 'fixture',
      itemCount: rankedItems.length,
    },
    rankedItems,
    selection,
    evidencePacks,
    evidenceCoverageScore,
    marketSnapshot,
  };
}

export default {
  OIKO_FIXTURE_MODES,
  buildFixtureCollection,
};
