import assert from 'node:assert/strict';

import { buildDayEditorialPacket } from '../oiko/v3/editorial.ts';
import { __testables } from '../oiko/v3/generate.ts';
import type { DayEditorialPacket, StructuredMarketContext, TopicCluster } from '../oiko/v3/types.ts';

function makeCluster(id: string, overrides: Partial<TopicCluster> = {}): TopicCluster {
  return {
    id,
    topicLabel: `Sujet ${id}`,
    topicFamily: 'trade_industry_energy',
    sourceArticleIds: [`article-${id}`],
    factIds: [`fact-${id}-1`, `fact-${id}-2`],
    mergedFacts: [`Fait principal ${id} sur l'?nergie et les co?ts.`],
    mergedNumbers: [],
    mergedCauses: [`Cause ${id}`],
    mergedConsequences: [`Cons?quence ${id}`],
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
    topicLabel: 'Choc p?trolier',
    mergedFacts: ['Le p?trole grimpe fortement et requalifie la s?ance asiatique.'],
    freshness: {
      clusterId: 'lead-oil',
      clusterRecencyType: 'fresh_event',
      freshnessJustification: 'lead',
      qualifiesForLead: true,
      qualifiesForOpening: true,
    },
  });
  const opening = makeCluster('gas', {
    topicLabel: 'Risque gazier europ?en',
    mergedFacts: ['Le gaz europ?en redevient un sujet de co?ts industriels.'],
  });
  const radar = makeCluster('iran', {
    topicLabel: 'S?quence iranienne',
    mergedFacts: ['La s?quence iranienne rench?rit l??nergie et le fret.'],
    mergedConsequences: ['Le risque r?gional remonte.'],
  });
  const carnet = makeCluster('ecb', {
    topicLabel: 'March? du travail de la zone euro',
    topicFamily: 'europe_euro_area',
    mergedFacts: ['La BCE juge l?emploi solide et les salaires un peu moins tendus.'],
  });
  const briefCluster = makeCluster('copper', {
    topicLabel: 'Dossier cuivre australien',
    mergedFacts: ['Le dossier cuivre prot?ge la continuit? industrielle.'],
  });

  return buildDayEditorialPacket('2026-03-09', [lead, opening, radar, carnet, briefCluster], makeMarketContext());
}

function run() {
  const packet = makeThinDayPacket();
  const sections = __testables.deriveNarrativeSections(packet);
  const briefSlots = __testables.buildBriefSlots(packet, sections);
  assert.equal(packet.secondaryTopics.length, 4);
  assert.equal(sections.opening.length, 1);
  assert.equal(sections.radar.length, 1);
  assert.equal(sections.carnet.length, 1);
  assert.equal(sections.briefs.length, 1);
  assert.equal(briefSlots.length, 2);
  assert.equal(briefSlots[0]?.kind, 'cluster');
  assert.equal(briefSlots[1]?.kind, 'micro');
  assert.notEqual(briefSlots[0]?.kind === 'cluster' ? briefSlots[0].cluster.id : '', briefSlots[1]?.kind === 'micro' ? briefSlots[1].candidate.sourceClusterId : '');

  const payload = __testables.buildDeterministicPayload(packet);
  assert.equal(payload.briefs_section.items.length, 2);

  const evidence = __testables.buildEvidenceMap(payload, packet);
  assert.ok(evidence.paragraphEvidenceMap['brief-0']);
  assert.ok(evidence.paragraphEvidenceMap['brief-1']);
  assert.ok(evidence.paragraphEvidenceMap['brief-1'].factIds.length > 0);
  assert.ok(evidence.paragraphEvidenceMap['brief-1'].articleIds.length > 0);

  const cluster = makeCluster('lead-oil', {
    topicLabel: 'Choc p?trolier',
    mergedFacts: ['Russia has condemned the US and Israeli strikes on Iran.'],
    mergedConsequences: ['Le p?trole grimpe et les co?ts repartent.'],
  });
  const text = __testables.buildMicroBriefText({
    id: 'micro',
    kind: 'lead_aftershock',
    titleHint: 'Apr?s le lead',
    textHint: 'S&P 500 rappellent d?j? que le p?trole agit comme un sujet de marges.',
    factIds: ['fact-1'],
    articleIds: ['article-1'],
    clusterIds: [cluster.id],
    sourceClusterId: cluster.id,
    priority: 10,
    marketKeys: ['actions'],
  }, cluster);
  assert.equal(__testables.isAcceptableGeneratedText(text, 24), true);
  assert.equal(text.includes('S&P 500 rappellent d?j?'), false);
  assert.equal(/\b(the|with|after|from)\b/i.test(text), false);
  assert.equal(/\b(de|du|des|pour|avec|un|une)\.?$/i.test(text), false);

  console.log('Oiko V3 regression checks passed');
}

run();
