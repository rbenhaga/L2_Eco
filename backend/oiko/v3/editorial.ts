import { OIKO_V3_POLICY, isHighQualitySource } from '../policy/v3.ts';
import { average } from '../utils.ts';
import type { DayEditorialPacket, FactSheetRecord, StructuredMarketContext, TopicCluster } from './types.ts';

function freshnessScore(cluster: TopicCluster) {
  switch (cluster.freshness.clusterRecencyType) {
    case 'fresh_event':
      return 1;
    case 'fresh_update':
      return 0.82;
    case 'context_only':
      return 0.32;
    default:
      return 0.05;
  }
}

function depthPenalty(cluster: TopicCluster, recordsByArticleId: Map<string, FactSheetRecord>) {
  const depthScores = cluster.sourceArticleIds.map((articleId) => {
    const record = recordsByArticleId.get(articleId);
    switch (record?.article.contentDepth) {
      case 'full_body':
        return 1;
      case 'partial_body':
        return 0.8;
      case 'title_snippet':
        return 0.45;
      default:
        return 0.2;
    }
  });
  const score = average(depthScores);
  return score >= 0.75 ? 0 : OIKO_V3_POLICY.scoring.lowDepthPenalty;
}

export function scoreTopics(clusters: TopicCluster[], records: FactSheetRecord[], marketContext: StructuredMarketContext) {
  const recordsByArticleId = new Map(records.map((record) => [record.article.id, record]));

  return clusters
    .map((cluster) => {
      const sourceQuality = average(cluster.sourceProfiles.map((profile) => profile.sourceReliabilityScore));
      const diversityBonus = cluster.sourceArticleIds.length >= 2 ? 0.2 : 0;
      const importance = cluster.topicFamily === 'inflation_rates' || cluster.topicFamily === 'trade_industry_energy' ? 0.95
        : cluster.topicFamily === 'jobs_consumption_growth' || cluster.topicFamily === 'europe_euro_area' ? 0.82
          : 0.68;
      const marketBonus = /(rates|inflation|trade|energy|currency|fx|euro|dollar|oil|gas)/i.test(cluster.topicLabel)
        ? Math.min(0.2, marketContext.confidence * 0.2)
        : 0;
      const penalty = cluster.freshness.clusterRecencyType === 'context_only' ? OIKO_V3_POLICY.scoring.contextOnlyPenalty : 0;
      const lowDepthPenalty = depthPenalty(cluster, recordsByArticleId);
      const score = (
        (freshnessScore(cluster) * OIKO_V3_POLICY.scoring.freshnessWeight)
        + (importance * OIKO_V3_POLICY.scoring.importanceWeight)
        + (sourceQuality * OIKO_V3_POLICY.scoring.sourceQualityWeight)
        + (cluster.confidence * OIKO_V3_POLICY.scoring.confidenceWeight)
        + ((diversityBonus + marketBonus) * OIKO_V3_POLICY.scoring.diversityWeight)
      ) - penalty - lowDepthPenalty;

      return {
        ...cluster,
        editorialImportance: Number(score.toFixed(3)),
      };
    })
    .sort((left, right) => right.editorialImportance - left.editorialImportance);
}

function sectionBucket(cluster: TopicCluster) {
  const sample = `${cluster.topicLabel} ${cluster.mergedFacts.join(' ')} ${cluster.mergedCauses.join(' ')} ${cluster.mergedConsequences.join(' ')}`.toLowerCase();
  if (/(all ordinaries|asx|oil|crude|baril|petrol|essence|gas prices)/.test(sample)) return 'energy_prices';
  if (/(gaz|gas)/.test(sample) && /(russ|russia|europe)/.test(sample)) return 'gas_supply';
  if (/(iran|khamenei|tehran|gulf|gulf countries|middle east|moyen-orient)/.test(sample)) return 'iran_risk';
  if (/(labour|labor|job market|hiring|unemployment|wage|salary|salaires|chômage|emploi)/.test(sample)) return 'labour';
  if (/(copper|cuivre|phosphate hill|smelter|mount isa|minier|mine)/.test(sample)) return 'industrial_supply';
  return cluster.topicFamily;
}

function takeSectionCandidates(
  clusters: TopicCluster[],
  count: number,
  usedIds = new Set<string>(),
  usedBuckets = new Set<string>(),
  predicate: (cluster: TopicCluster) => boolean = () => true,
) {
  const picked: TopicCluster[] = [];
  for (const cluster of clusters) {
    if (picked.length >= count) break;
    if (usedIds.has(cluster.id) || !predicate(cluster)) continue;
    const bucket = sectionBucket(cluster);
    const hasUnusedAlternative = clusters.some((candidate) => {
      if (usedIds.has(candidate.id) || !predicate(candidate) || candidate.id === cluster.id) return false;
      return !usedBuckets.has(sectionBucket(candidate));
    });
    if (usedBuckets.has(bucket) && hasUnusedAlternative) continue;
    usedIds.add(cluster.id);
    usedBuckets.add(bucket);
    picked.push(cluster);
  }
  return picked;
}

function chooseSectionTargets(remainingCount: number, freshRemainingCount: number) {
  const desired = remainingCount >= 7
    ? { opening: 3, radar: 2, carnet: 1, briefs: 1 }
    : remainingCount >= 6
      ? { opening: 2, radar: 2, carnet: 1, briefs: 1 }
      : remainingCount >= 5
        ? { opening: 2, radar: 1, carnet: 1, briefs: 1 }
        : remainingCount >= 4
          ? { opening: 2, radar: 1, carnet: 1, briefs: 0 }
          : remainingCount >= 3
            ? { opening: 1, radar: 1, carnet: 1, briefs: 0 }
            : remainingCount >= 2
              ? { opening: 1, radar: 1, carnet: 0, briefs: 0 }
              : { opening: Math.min(1, remainingCount), radar: 0, carnet: 0, briefs: 0 };

  const reserveFreshForRadar = freshRemainingCount >= 2 ? Math.min(desired.radar, 1) : 0;
  const opening = Math.min(desired.opening, Math.max(0, freshRemainingCount - reserveFreshForRadar));
  const radar = Math.min(desired.radar, Math.max(0, remainingCount - opening));
  const remainingSlots = Math.max(0, remainingCount - opening - radar);
  const carnet = Math.min(desired.carnet, remainingSlots);
  const briefs = Math.min(desired.briefs, Math.max(0, remainingSlots - carnet));

  return { opening, radar, carnet, briefs };
}

function pickLeadTopic(clusters: TopicCluster[]) {
  return clusters.find((cluster) => cluster.freshness.clusterRecencyType === 'fresh_event' && cluster.freshness.qualifiesForLead)
    || clusters.find((cluster) => cluster.freshness.qualifiesForLead)
    || clusters[0]
    || null;
}

function isFreshCluster(cluster: TopicCluster) {
  return cluster.freshness.clusterRecencyType === 'fresh_event' || cluster.freshness.clusterRecencyType === 'fresh_update';
}

function isSecondarySignalCandidate(cluster: TopicCluster) {
  return isFreshCluster(cluster)
    || cluster.topicFamily === 'trade_industry_energy'
    || cluster.topicFamily === 'china_asia_fx'
    || cluster.topicFamily === 'institutions'
    || cluster.topicFamily === 'budget_debt_fiscal';
}

function isCarnetCandidate(cluster: TopicCluster) {
  return cluster.freshness.clusterRecencyType === 'context_only'
    || cluster.topicFamily === 'trade_industry_energy'
    || cluster.topicFamily === 'china_asia_fx'
    || cluster.topicFamily === 'institutions'
    || cluster.topicFamily === 'jobs_consumption_growth';
}

function accumulateSourceCoverage(clusters: TopicCluster[]) {
  const distinctSourceNames = new Set<string>();
  const distinctDomains = new Set<string>();
  const officialDomains = new Set<string>();
  const highQualityDomains = new Set<string>();

  clusters.forEach((cluster) => {
    cluster.sourceProfiles.forEach((profile) => {
      distinctSourceNames.add(profile.sourceName);
      distinctDomains.add(profile.domain);
      if (profile.sourceTier === 'official') officialDomains.add(profile.domain);
      if (isHighQualitySource(profile)) highQualityDomains.add(profile.domain);
    });
  });

  return {
    distinctSources: distinctSourceNames.size,
    distinctDomains: distinctDomains.size,
    officialSources: officialDomains.size,
    highQualitySources: highQualityDomains.size,
  };
}

export function buildDayEditorialPacket(editionDate: string, clusters: TopicCluster[], marketContext: StructuredMarketContext): DayEditorialPacket {
  const usable = clusters.filter((cluster) => cluster.freshness.clusterRecencyType !== 'stale');
  const usedIds = new Set<string>();
  const usedBuckets = new Set<string>();
  const leadTopic = pickLeadTopic(usable);
  if (leadTopic) {
    usedIds.add(leadTopic.id);
    usedBuckets.add(sectionBucket(leadTopic));
  }

  const remaining = usable.filter((cluster) => cluster.id !== leadTopic?.id);
  const remainingFresh = remaining.filter((cluster) => cluster.freshness.qualifiesForOpening);
  const targets = chooseSectionTargets(remaining.length, remainingFresh.length);

  const opening = takeSectionCandidates(remainingFresh, targets.opening, usedIds, usedBuckets, (cluster) => cluster.freshness.qualifiesForOpening);
  const radar = takeSectionCandidates(remaining, targets.radar, usedIds, usedBuckets, (cluster) => isSecondarySignalCandidate(cluster));
  const carnet = takeSectionCandidates(remaining, targets.carnet, usedIds, usedBuckets, (cluster) => isCarnetCandidate(cluster));
  const briefs = takeSectionCandidates(remaining, targets.briefs, usedIds, usedBuckets, (cluster) => cluster.freshness.clusterRecencyType !== 'stale');

  const freshEventCount = usable.filter((cluster) => isFreshCluster(cluster)).length;

  return {
    editionDate,
    leadTopic,
    secondaryTopics: usable.filter((cluster) => cluster.id !== leadTopic?.id).slice(0, 10),
    marketContext,
    chosenSections: {
      opening,
      radar,
      carnet,
      briefs,
    },
    sourceCoverage: accumulateSourceCoverage(usable),
    freshEventCount,
    distinctClusterCount: usable.length,
  };
}

export default {
  scoreTopics,
  buildDayEditorialPacket,
};
