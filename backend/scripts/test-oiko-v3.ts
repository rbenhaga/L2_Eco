import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import { applyEditorialPlan, buildDayEditorialPacket } from '../oiko/v3/editorial.ts';
import { __testables as generateTestables } from '../oiko/v3/generate.ts';
import { __testables as planningTestables } from '../oiko/v3/planning.ts';
import { __testables as routeTestables } from '../routes/oikoNews.ts';
import type { DayEditorialPacket, StructuredMarketContext, TopicCluster } from '../oiko/v3/types.ts';

const mojibakePattern = /\u00C3|\u00C2|\u00E2\u20AC\u2122|\u00E2\u20AC\u201D|\u00E2\u20AC\u201C|\u00C5\u201C/;
const bannedCopyFragments = [
  'Le num\u00e9ro part d\u2019un fait simple',
  'Autour du lead',
  'Autour du choc',
  'Le dernier tour',
  'Il ne porte pas le num\u00e9ro',
];

function makeCluster(id: string, overrides: Partial<TopicCluster> = {}): TopicCluster {
  return {
    id,
    topicLabel: `Sujet ${id}`,
    topicFamily: 'trade_industry_energy',
    sourceArticleIds: [`article-${id}`],
    factIds: [`fact-${id}-1`, `fact-${id}-2`],
    mergedFacts: [`Fait principal ${id} sur l’énergie et les coûts.`],
    mergedNumbers: [],
    mergedCauses: [`Cause ${id}`],
    mergedConsequences: [`Conséquence ${id}`],
    contradictions: [],
    confidence: 0.9,
    editorialImportance: 0.8,
    freshness: {
      clusterId: id,
      clusterRecencyType: 'fresh_event',
      freshnessJustification: 'test',
      qualifiesForLead: false,
      qualifiesForOpening: true,
    },
    sourceProfiles: [{
      sourceName: 'Source test',
      domain: 'example.com',
      sourceTier: 'tier1',
      sourceReliabilityScore: 0.9,
      sourceType: 'press',
      paywallRisk: 0,
      snippetOnlyRisk: 0,
    }],
    ...overrides,
  };
}

function makeMarketContext(): StructuredMarketContext {
  return {
    windowStart: '2026-03-09T06:00:00Z',
    windowEnd: '2026-03-09T09:00:00Z',
    generatedAt: '2026-03-09T09:00:00Z',
    equities: [{ key: 'actions', label: 'S&P 500', latestValue: 1, changePct: -1.2, period: '1j', points: [1, 2], labels: ['a', 'b'] }],
    crypto: [{ key: 'crypto', label: 'Bitcoin', latestValue: 1, changePct: 0.3, period: '1j', points: [1, 2], labels: ['a', 'b'] }],
    rates: [],
    fx: [],
    commodities: [],
    missingDataFlags: [],
    confidence: 0.9,
    marketRegime: 'risk_off',
    narrativeHints: ['Test'],
  };
}

function makeThinDayPacket(): DayEditorialPacket {
  const lead = makeCluster('lead-oil', {
    topicLabel: 'Choc pétrolier',
    mergedFacts: ['Le pétrole grimpe fortement et requalifie la séance asiatique.'],
    freshness: {
      clusterId: 'lead-oil',
      clusterRecencyType: 'fresh_event',
      freshnessJustification: 'lead',
      qualifiesForLead: true,
      qualifiesForOpening: true,
    },
  });
  const opening = makeCluster('gas', {
    topicLabel: 'Risque gazier européen',
    mergedFacts: ['Le gaz européen redevient un sujet de coûts industriels.'],
  });
  const radar = makeCluster('iran', {
    topicLabel: 'Séquence iranienne',
    mergedFacts: ['La séquence iranienne renchérit l’énergie et le fret.'],
    mergedConsequences: ['Le risque régional remonte.'],
  });
  const carnet = makeCluster('ecb', {
    topicLabel: 'Marché du travail de la zone euro',
    topicFamily: 'europe_euro_area',
    mergedFacts: ['La BCE juge l’emploi solide et les salaires un peu moins tendus.'],
  });
  const briefCluster = makeCluster('copper', {
    topicLabel: 'Dossier cuivre australien',
    mergedFacts: ['Le dossier cuivre protège la continuité industrielle.'],
  });

  return buildDayEditorialPacket('2026-03-09', [lead, opening, radar, carnet, briefCluster], makeMarketContext());
}

function makeShortDayPacket(): DayEditorialPacket {
  const lead = makeCluster('short-lead', {
    topicLabel: 'Choc pétrolier condensé',
    mergedFacts: ['Le pétrole requalifie la séance sans produire assez de matière pour une édition premium.'],
    freshness: {
      clusterId: 'short-lead',
      clusterRecencyType: 'fresh_event',
      freshnessJustification: 'short-lead',
      qualifiesForLead: true,
      qualifiesForOpening: true,
    },
  });
  const support = makeCluster('short-support', {
    topicLabel: 'Risque gazier condensé',
    mergedFacts: ['Le gaz européen prolonge le choc des coûts dans une édition courte.'],
    freshness: {
      clusterId: 'short-support',
      clusterRecencyType: 'fresh_event',
      freshnessJustification: 'short-support',
      qualifiesForLead: false,
      qualifiesForOpening: true,
    },
  });

  return buildDayEditorialPacket('2026-03-08', [lead, support], makeMarketContext());
}
async function runPreservationFixtureTest() {
  const dbRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'oiko-v3-preserve-'));
  const tempDbPath = path.join(dbRoot, 'subscriptions.db');
  const sourceDbPath = path.resolve(process.cwd(), 'database', 'subscriptions.db');
  fs.copyFileSync(sourceDbPath, tempDbPath);

  try {
    execFileSync(process.execPath, ['--experimental-strip-types', path.resolve(process.cwd(), 'scripts', 'test-oiko-v3-preservation.ts')], {
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_PATH: tempDbPath },
      stdio: 'inherit',
    });
  } finally {
    fs.rmSync(dbRoot, { recursive: true, force: true });
  }
}

async function run() {
  await runPreservationFixtureTest();
  const packet = makeThinDayPacket();
  assert.equal(mojibakePattern.test(JSON.stringify(packet.microBriefCandidates)), false);
  const sections = generateTestables.deriveNarrativeSections(packet);
  const briefSlots = generateTestables.buildBriefSlots(packet, sections);
  assert.equal(packet.secondaryTopics.length, 4);
  assert.equal(sections.opening.length, 1);
  assert.equal(sections.radar.length, 1);
  assert.equal(sections.carnet.length, 1);
  assert.equal(sections.briefs.length, 1);
  assert.equal(briefSlots.length, 2);
  assert.equal(briefSlots[0]?.kind, 'cluster');
  assert.equal(briefSlots[1]?.kind, 'micro');
  assert.notEqual(briefSlots[0]?.kind === 'cluster' ? briefSlots[0].cluster.id : '', briefSlots[1]?.kind === 'micro' ? briefSlots[1].candidate.sourceClusterId : '');

  const payload = generateTestables.buildDeterministicPayload(packet);
  const deterministicPlan = planningTestables.buildDeterministicEditorialPlan(packet);
  planningTestables.planSchema.parse(deterministicPlan);
  assert.equal(deterministicPlan.leadClusterId, packet.leadTopic?.id || null);

  const swappedPlan = {
    ...deterministicPlan,
    openingClusterIds: packet.chosenSections.radar.map((cluster) => cluster.id),
    radarClusterIds: packet.chosenSections.opening.map((cluster) => cluster.id),
    selectedClusterIds: Array.from(new Set([
      deterministicPlan.leadClusterId,
      ...packet.chosenSections.radar.map((cluster) => cluster.id),
      ...packet.chosenSections.opening.map((cluster) => cluster.id),
      ...deterministicPlan.carnetClusterIds,
      ...deterministicPlan.briefClusterIds,
    ].filter(Boolean))),
  };
  const plannedPacket = applyEditorialPlan(packet, swappedPlan);
  assert.equal(plannedPacket.editorialPlan?.leadClusterId, deterministicPlan.leadClusterId);
  assert.equal(plannedPacket.chosenSections.opening[0]?.id, packet.chosenSections.radar[0]?.id);
  assert.equal(plannedPacket.chosenSections.radar[0]?.id, packet.chosenSections.opening[0]?.id);

  const publicV3Row = {
    edition_date: '2026-03-09',
    status: 'ready',
    updated_at: '2026-03-11T09:00:00Z',
    pipeline_version: 'oiko:v3',
    packet_json: JSON.stringify({ editorialPlan: deterministicPlan, leadTopic: { topicLabel: 'Lead V3' } }),
    draft_json: JSON.stringify({ writer: 'groq', model: 'llama-3.3-70b-versatile', usedFallback: false, planningSource: 'llm', llmStages: [{ stage: 'editorial_plan', success: true }] }),
    evidence_json: JSON.stringify({ paragraphEvidenceMap: { 'lead-0': { factIds: ['fact-1'], articleIds: ['article-1'] } } }),
    content_json: JSON.stringify(payload),
    market_context_json: JSON.stringify({ marketRegime: 'risk_off' }),
    asset_manifest_json: JSON.stringify({ chartManifest: [], assets: [] }),
    html: '<html></html>',
  };
  const legacyRow = {
    id: -1,
    edition_date: '2026-03-09',
    slug: 'oiko-news-2026-03-09',
    status: 'ready',
    content_version: 'v2.1',
    editorial_angle: 'Legacy angle',
    market_regime: 'risk_off',
    evidence_coverage_score: 0.25,
    sent_at: null,
    created_at: '2026-03-10T09:00:00Z',
    chart_manifest_json: '[]',
    content_json: JSON.stringify(payload),
    llm_provider: 'deterministic-reference',
    llm_model: 'deterministic-reference',
  };
  assert.equal(routeTestables.buildEditionSlug('2026-03-09'), 'oiko-news-2026-03-09');
  assert.equal(routeTestables.extractEditionDateFromSlug('oiko-news-2026-03-09'), '2026-03-09');
  assert.equal(routeTestables.choosePreferredPublicRow(publicV3Row, legacyRow)?.source, 'v3');
  const shapedV3 = routeTestables.shapeV3Edition(publicV3Row);
  const preview = routeTestables.shapeV3Preview({
    ...publicV3Row,
    visibility: 'internal',
    quality_state: 'failed',
    publication_reason_code: 'insufficient_fresh_material',
    publication_reason: 'Matière fraîche insuffisante pour publier.',
  }, [{ stage: 'material_gate', status: 'failed', summary_text: 'Matière fraîche insuffisante.', metrics_json: '{}', issues_json: '[]' }], [{ id: 42, job_date: '2026-03-09', step: 'compose_v3', status: 'success', lock_key: '2026-03-09:compose:v3:shadow', started_at: '2026-03-09T09:00:00Z', finished_at: '2026-03-09T09:00:01Z', meta_json: '{}' }]);
  const legacyGenerationMeta = routeTestables.buildLegacyGenerationMeta(legacyRow);
  assert.equal(shapedV3?.sourceKind, 'v3_packet');
  assert.equal(shapedV3?.generationMeta?.usedFallback, false);
  assert.equal(shapedV3?.generationMeta?.planningSource, 'llm');
  assert.equal(preview?.sourceKind, 'v3_packet_preview');
  assert.equal(preview?.editorialPlan?.leadClusterId, deterministicPlan.leadClusterId);
  assert.equal(preview?.draftMetadata?.planningSource, 'llm');
  assert.equal(preview?.contentPresent, true);
  assert.equal(preview?.blockingReason, 'Matière fraîche insuffisante pour publier.');
  assert.equal(preview?.jobRuns?.length, 1);
  assert.equal(legacyGenerationMeta.usedFallback, true);

  assert.equal(payload.opening_brief.items.length, 3);
  const openingLabels = payload.opening_brief.items.map((item) => item.label);
  assert.equal(new Set(openingLabels).size, 3);
  assert.equal(openingLabels.includes('Gaz'), true);
  assert.equal(openingLabels.includes('Iran'), true);
  assert.equal(JSON.stringify(payload).includes('\u00c0 suivre surtout pour'), false);
  assert.equal(payload.markets_section.paragraphs[1]?.label, 'Change');
  assert.equal(payload.lead_story.paragraphs[0]?.parts[0]?.text.includes(bannedCopyFragments[0]), false);
  assert.equal(payload.briefs_section.title, 'En bref');
  assert.equal(payload.briefs_section.items.length, 2);
  const payloadText = JSON.stringify(payload);
  bannedCopyFragments.forEach((fragment) => {
    assert.equal(payloadText.includes(fragment), false, `Banned copy fragment found: ${fragment}`);
  });

  const evidence = generateTestables.buildEvidenceMap(payload, packet);
  assert.ok(evidence.paragraphEvidenceMap['brief-0']);
  assert.ok(evidence.paragraphEvidenceMap['brief-1']);
  assert.ok(evidence.paragraphEvidenceMap['brief-1'].factIds.length > 0);
  assert.ok(evidence.paragraphEvidenceMap['brief-1'].articleIds.length > 0);

  const shortPacket = makeShortDayPacket();
  assert.equal(shortPacket.materialTier, 'short');
  const shortPayload = generateTestables.buildDeterministicPayload(shortPacket);
  assert.equal(shortPayload.opening_brief.items.length, 2);
  const shortEvidence = generateTestables.buildEvidenceMap(shortPayload, shortPacket);
  assert.ok(shortEvidence.paragraphEvidenceMap['opening-0']);
  assert.ok(shortEvidence.paragraphEvidenceMap['opening-1']);

  const cluster = makeCluster('lead-oil', {
    topicLabel: 'Choc pétrolier',
    mergedFacts: ['Russia has condemned the US and Israeli strikes on Iran.'],
    mergedConsequences: ['Le pétrole grimpe et les coûts repartent.'],
  });
  const text = generateTestables.buildMicroBriefText({
    id: 'micro',
    kind: 'lead_aftershock',
    titleHint: 'Après le lead',
    textHint: 'S&P 500 rappellent déjà que le pétrole agit comme un sujet de marges.',
    factIds: ['fact-1'],
    articleIds: ['article-1'],
    clusterIds: [cluster.id],
    sourceClusterId: cluster.id,
    priority: 10,
    marketKeys: ['actions'],
  }, cluster);
  assert.equal(generateTestables.isAcceptableGeneratedText(text, 24), true);
  assert.equal(text.includes('S&P 500 rappellent d?j?'), false);
  assert.equal(/\b(the|with|after|from)\b/i.test(text), false);
  assert.equal(/\b(de|du|des|pour|avec|un|une)\.?$/i.test(text), false);

  console.log('Oiko V3 regression checks passed');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
