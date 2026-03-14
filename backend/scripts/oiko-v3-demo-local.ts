import db, { initializeDatabase } from '../db/database.js';
import { OIKO_V3_PIPELINE_VERSION } from '../oiko/policy/v3.ts';
import { oikoQueries } from '../oiko/queries.ts';
import { applyEditorialPlan, buildDayEditorialPacket } from '../oiko/v3/editorial.ts';
import { generateFrenchEditionDraft, repairOrRegenerateDraftIfNeeded } from '../oiko/v3/generate.ts';
import { planEditorialStructure } from '../oiko/v3/planning.ts';
import { computeAssetQuality, persistQualityReports, publishEdition, renderV3Draft } from '../oiko/v3/publish.ts';
import { critiqueEditionDraft } from '../oiko/v3/quality.ts';
import type { NormalizedArticle, QualityIssue, QualityReport, SourceProfile, StructuredMarketContext, TopicCluster } from '../oiko/v3/types.ts';

type DemoArgs = {
  date: string;
};

const LOCAL_DEMO_REASON_CODE = 'local_v3_public_demo';
const LOCAL_DEMO_REASON = 'Démo locale V3 publiée depuis un packet de staging contrôlé. Aucune portée production.';
const LOCAL_DEMO_LOCK_KEY_SUFFIX = 'demo:v3:local-public';

function parseArgs(argv: string[]): DemoArgs {
  const args: DemoArgs = { date: '2026-03-11' };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--date') {
      args.date = argv[index + 1] || args.date;
      index += 1;
    }
  }
  return args;
}

function stageReport(stage: string, status: 'passed' | 'failed', summaryText: string): QualityReport {
  return {
    stage,
    status,
    summaryText,
    metrics: {
      french_only: false,
      originality_gate: false,
      traceability_gate: false,
      freshness_gate: false,
      duplication_gate: false,
      lead_cluster_fresh: false,
      distinct_cluster_count: 0,
      supported_sentence_ratio: 0,
      forbidden_residue_count: 0,
      fresh_event_count: 0,
      high_quality_source_count: 0,
      english_sentence_count: 0,
      mixed_language_sentence_count: 0,
      provider_residue_count: 0,
      duplication_ratio: 0,
      language_quality_score: 0,
      assetCoverage: 0,
      missingAssets: [],
      brokenAssetCount: 0,
    },
    issues: [] as QualityIssue[],
    publicationStatus: 'draft',
    publicationReason: summaryText,
    publicationReasonCode: stage,
    visibility: 'internal',
  };
}

function makeSourceProfile(
  sourceName: string,
  domain: string,
  sourceTier: SourceProfile['sourceTier'],
  sourceReliabilityScore: number,
  sourceType: SourceProfile['sourceType'],
): SourceProfile {
  return {
    sourceName,
    domain,
    sourceTier,
    sourceReliabilityScore,
    sourceType,
    paywallRisk: 0,
    snippetOnlyRisk: 0.1,
  };
}

function makeCluster(
  id: string,
  topicLabel: string,
  topicFamily: string,
  publishedAt: string,
  sourceProfile: SourceProfile,
  factSeed: string,
  overrides: Partial<TopicCluster> = {},
): { cluster: TopicCluster; article: NormalizedArticle } {
  const articleId = `article-${id}`;
  const cluster: TopicCluster = {
    id,
    topicLabel,
    topicFamily,
    sourceArticleIds: [articleId],
    factIds: [`fact-${id}-1`, `fact-${id}-2`],
    mergedFacts: [
      `${factSeed} Le premier mouvement se lit déjà dans les coûts, le fret et la prudence des desks européens.`,
      `${factSeed} Les desks surveillent surtout la vitesse de transmission vers l'énergie, le change et les marges.`,
    ],
    mergedNumbers: [
      { label: 'variation', value: '+1.8', unit: '%' },
    ],
    mergedCauses: [
      'Le risque géopolitique et le prix de l’énergie remontent ensemble.',
    ],
    mergedConsequences: [
      'Le marché reprice plus vite le coût de transport, le change et la politique monétaire.',
    ],
    contradictions: [],
    confidence: 0.92,
    editorialImportance: 0.8,
    freshness: {
      clusterId: id,
      clusterRecencyType: 'fresh_event',
      primaryEventTimeStart: publishedAt,
      primaryEventTimeEnd: publishedAt,
      freshnessJustification: 'Signal frais de démonstration V3.',
      qualifiesForLead: id === 'lead-oil',
      qualifiesForOpening: true,
    },
    sourceProfiles: [sourceProfile],
    ...overrides,
  };

  const article: NormalizedArticle = {
    id: articleId,
    title: `${topicLabel} : la lecture de marché se recompose`,
    sourceName: sourceProfile.sourceName,
    sourceDomain: sourceProfile.domain,
    url: `https://example.com/${id}`,
    canonicalUrl: `https://example.com/${id}`,
    publishedAt,
    language: 'fr',
    cleanTitle: `${topicLabel} oblige les desks à revoir leur lecture macro-financière.`,
    cleanSnippet: `${factSeed} Les sources décrivent une transmission progressive vers les coûts et la perception du risque.`,
    cleanBody: `${factSeed} Les opérateurs décrivent une réaction ordonnée mais rapide : l'énergie redonne un prix au risque, les marges deviennent plus sensibles et le change reste un test utile pour la séance européenne. Les analystes suivent aussi la diffusion vers l'industrie, la logistique et la trajectoire des banques centrales.`,
    provider: 'local-demo',
    topicFamily,
    contentDepth: 'full_body',
    sourceProfile,
    rawArticleId: `raw-${id}`,
  };

  return { cluster, article };
}

function makeMarketContext(editionDate: string): StructuredMarketContext {
  return {
    windowStart: `${editionDate}T05:30:00.000Z`,
    windowEnd: `${editionDate}T09:30:00.000Z`,
    generatedAt: `${editionDate}T09:30:00.000Z`,
    equities: [
      { key: 'sp500', label: 'S&P 500', latestValue: 5124, changePct: -1.1, period: '5d', points: [5190, 5178, 5155, 5140, 5124], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
      { key: 'nasdaq100', label: 'Nasdaq 100', latestValue: 17880, changePct: -0.6, period: '5d', points: [18010, 17990, 17940, 17910, 17880], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
    ],
    crypto: [
      { key: 'bitcoin', label: 'Bitcoin', latestValue: 68250, changePct: 1.4, period: '24h', points: [67120, 67480, 67910, 68140, 68250], labels: ['00h', '06h', '12h', '18h', '24h'] },
    ],
    rates: [
      { key: 'us10y', label: 'US 10Y', latestValue: 4.18, changePct: 0.05, period: '5d', points: [4.12, 4.14, 4.16, 4.17, 4.18], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
    ],
    fx: [
      { key: 'eurusd', label: 'EUR/USD', latestValue: 1.08, changePct: -0.2, period: '5d', points: [1.089, 1.087, 1.085, 1.082, 1.08], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
    ],
    commodities: [
      { key: 'brent', label: 'Brent', latestValue: 84.4, changePct: 2.8, period: '5d', points: [79.5, 80.1, 81.7, 82.9, 84.4], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
    ],
    missingDataFlags: [],
    confidence: 0.93,
    marketRegime: 'risk_off',
    narrativeHints: [
      'L’énergie redonne le ton de la matinée et rehausse le prix du risque.',
      'Le change et les valeurs cycliques servent de test de transmission.',
    ],
  };
}

function buildDemoCorpus(editionDate: string) {
  const reuters = makeSourceProfile('Reuters', 'reuters.com', 'tier1', 0.96, 'wire');
  const ecb = makeSourceProfile('ECB', 'ecb.europa.eu', 'official', 1, 'institution');
  const eurostat = makeSourceProfile('Eurostat', 'ec.europa.eu', 'official', 0.98, 'institution');
  const cnbc = makeSourceProfile('CNBC', 'cnbc.com', 'tier1', 0.86, 'press');
  const abc = makeSourceProfile('ABC Australia', 'abc.net.au', 'tier2', 0.82, 'press');
  const ft = makeSourceProfile('Financial Times', 'ft.com', 'tier1', 0.9, 'press');

  const entries = [
    makeCluster('lead-oil', 'Le pétrole remet l’énergie au centre', 'trade_industry_energy', `${editionDate}T06:10:00.000Z`, reuters, 'Le brut grimpe et les desks asiatiques reclassent la séance.', { editorialImportance: 0.96 }),
    makeCluster('gas-europe', 'Le gaz européen redevient un test de coûts', 'trade_industry_energy', `${editionDate}T06:30:00.000Z`, ft, 'Les traders européens surveillent le gaz comme second tour du choc.', { editorialImportance: 0.88 }),
    makeCluster('iran-freight', 'La prime iranienne remonte dans le fret', 'trade_industry_energy', `${editionDate}T06:45:00.000Z`, cnbc, 'Le risque régional renchérit le fret, l’assurance et la prudence des flux.', { editorialImportance: 0.84 }),
    makeCluster('ecb-wages', 'La BCE garde les salaires dans le viseur', 'europe_euro_area', `${editionDate}T07:00:00.000Z`, ecb, 'La banque centrale européenne regarde si le choc énergie complique la désinflation.', { editorialImportance: 0.8 }),
    makeCluster('copper-australia', 'Le cuivre australien protège une chaîne industrielle', 'trade_industry_energy', `${editionDate}T07:15:00.000Z`, abc, 'Le cuivre compte parce qu’il évite une rupture supplémentaire dans la chaîne industrielle.', { editorialImportance: 0.78 }),
    makeCluster('eurozone-orders', 'Les commandes européennes gardent une ligne fragile', 'europe_euro_area', `${editionDate}T07:25:00.000Z`, eurostat, 'Les signaux de production restent fragiles et rendent l’industrie plus sensible au prix de l’énergie.', { editorialImportance: 0.74 }),
  ];

  return {
    clusters: entries.map((entry) => entry.cluster),
    normalizedArticles: entries.map((entry) => entry.article),
    marketContext: makeMarketContext(editionDate),
  };
}

const promoteDemoPacket = db.prepare(`
  UPDATE oiko_news_editorial_packets
  SET visibility = 'public',
      quality_state = 'passed',
      publication_reason = ?,
      publication_reason_code = ?,
      updated_at = CURRENT_TIMESTAMP
  WHERE edition_date = ?
    AND pipeline_version = ?
`);

async function main() {
  const { date } = parseArgs(process.argv.slice(2));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('Invalid demo date, expected YYYY-MM-DD.');
  }

  initializeDatabase();

  const existingEdition = oikoQueries.editions.getByDate.get(date);
  if (existingEdition) {
    throw new Error(`Demo date ${date} already exists in oiko_news_editions; choose another date.`);
  }

  const lockKey = `${date}:${LOCAL_DEMO_LOCK_KEY_SUFFIX}`;
  const existingRun = oikoQueries.jobRuns.getByLockKey.get(lockKey);
  const startMeta = JSON.stringify({ pipelineVersion: OIKO_V3_PIPELINE_VERSION, mode: 'local-demo', editionDate: date });
  if (existingRun) {
    oikoQueries.jobRuns.restart.run('started', startMeta, lockKey);
  } else {
    oikoQueries.jobRuns.create.run(date, 'compose_v3_demo', 'started', lockKey, startMeta);
  }

  try {
    const { clusters, normalizedArticles, marketContext } = buildDemoCorpus(date);
    const reports: QualityReport[] = [stageReport('demo_setup', 'passed', 'Corpus de démonstration V3 local préparé.')];

    const basePacket = buildDayEditorialPacket(date, clusters, marketContext);
    const planning = await planEditorialStructure(basePacket, date);
    let packet = applyEditorialPlan(basePacket, planning.plan);
    packet = {
      ...packet,
      llmStages: [...planning.llmStages],
    };

    reports.push(stageReport(
      'editorial_plan',
      'passed',
      `Plan éditorial ${packet.llmStages?.some((stage) => stage.stage === 'editorial_plan' && stage.success && !stage.usedFallback) ? 'LLM' : 'déterministe'} prêt pour ${packet.editorialPlan?.leadClusterId || 'le lead courant'}.`,
    ));

    let draft = await generateFrenchEditionDraft(packet, date);
    let criticReport = critiqueEditionDraft(draft, packet, clusters, normalizedArticles);
    reports.push(criticReport);

    if (criticReport.status === 'failed') {
      draft = await repairOrRegenerateDraftIfNeeded(draft, criticReport, packet, date);
      criticReport = critiqueEditionDraft(draft, packet, clusters, normalizedArticles);
      reports.push({ ...criticReport, stage: 'critic_repair' });
    }

    const rendered = await renderV3Draft(date, draft, packet, marketContext);
    const assetQuality = computeAssetQuality(rendered);
    const finalReport = critiqueEditionDraft(draft, packet, clusters, normalizedArticles, assetQuality);
    reports.push({ ...finalReport, stage: 'final_gate' });

    if (!['ready', 'short_draft'].includes(finalReport.publicationStatus)) {
      persistQualityReports(date, OIKO_V3_PIPELINE_VERSION, reports);
      throw new Error(`Demo V3 packet is not publishable (status=${finalReport.publicationStatus}, reason=${finalReport.publicationReasonCode}).`);
    }

    const publication = publishEdition(date, OIKO_V3_PIPELINE_VERSION, packet, draft, rendered, finalReport, assetQuality);
    promoteDemoPacket.run(LOCAL_DEMO_REASON, LOCAL_DEMO_REASON_CODE, date, OIKO_V3_PIPELINE_VERSION);
    persistQualityReports(date, OIKO_V3_PIPELINE_VERSION, reports);

    const storedPacket = oikoQueries.v3.editorialPackets.getByEdition.get(date, OIKO_V3_PIPELINE_VERSION) as any;
    const storedPayload = storedPacket?.packet_json ? JSON.parse(storedPacket.packet_json) : null;
    const storedDraft = storedPacket?.draft_json ? JSON.parse(storedPacket.draft_json) : null;
    const completeMeta = JSON.stringify({
      editionDate: date,
      pipelineVersion: OIKO_V3_PIPELINE_VERSION,
      mode: 'local-demo',
      publication: {
        ...publication,
        visibility: 'public',
        publicationReason: LOCAL_DEMO_REASON,
        publicationReasonCode: LOCAL_DEMO_REASON_CODE,
      },
      planning: storedPayload?.editorialPlan || null,
      generationMeta: storedDraft,
    });
    oikoQueries.jobRuns.complete.run('success', completeMeta, lockKey);

    console.log(JSON.stringify({
      editionDate: date,
      slug: `oiko-news-${date}`,
      publication: {
        status: publication.status,
        qualityState: publication.qualityState,
        visibility: 'public',
        publicationReasonCode: LOCAL_DEMO_REASON_CODE,
      },
      planningStage: packet.llmStages?.find((stage) => stage.stage === 'editorial_plan') || null,
      draftMeta: draft.metadata,
    }, null, 2));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    oikoQueries.jobRuns.complete.run('failed', JSON.stringify({ editionDate: date, pipelineVersion: OIKO_V3_PIPELINE_VERSION, mode: 'local-demo', error: message }), lockKey);
    throw error;
  }
}

main().catch((error) => {
  console.error('Oiko V3 local demo failed:', error);
  process.exit(1);
});
