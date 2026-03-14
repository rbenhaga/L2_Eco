import { OIKO_V3_POLICY, isHighQualitySource } from '../policy/v3.ts';
import { average } from '../utils.ts';
import type { DayEditorialPacket, EditorialPlan, FactSheetRecord, MaterialTier, MicroBriefCandidate, StructuredMarketContext, TopicCluster } from './types.ts';

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

type SectionName = 'opening' | 'radar' | 'carnet' | 'briefs';

function sectionPriority(section: SectionName, cluster: TopicCluster) {
  const bucket = sectionBucket(cluster);
  const editorialBase = Math.round(cluster.editorialImportance * 100);
  const freshnessBase = cluster.freshness.clusterRecencyType === 'fresh_event'
    ? 12
    : cluster.freshness.clusterRecencyType === 'fresh_update'
      ? 8
      : cluster.freshness.clusterRecencyType === 'context_only'
        ? 6
        : 0;
  const sourceBase = Math.min(6, cluster.sourceArticleIds.length * 2);
  const familyBase = section === 'carnet' && ['europe_euro_area', 'institutions', 'jobs_consumption_growth'].includes(cluster.topicFamily)
    ? 10
    : section === 'opening' && cluster.topicFamily === 'trade_industry_energy'
      ? 8
      : 0;

  const bucketBase = section === 'opening'
    ? bucket === 'energy_prices' ? 22 : bucket === 'gas_supply' ? 20 : bucket === 'iran_risk' ? 18 : bucket === 'industrial_supply' ? 14 : bucket === 'labour' ? 10 : 8
    : section === 'radar'
      ? bucket === 'iran_risk' ? 22 : bucket === 'gas_supply' ? 18 : bucket === 'energy_prices' ? 16 : bucket === 'industrial_supply' ? 15 : bucket === 'labour' ? 12 : 8
      : section === 'carnet'
        ? bucket === 'labour' ? 22 : bucket === 'industrial_supply' ? 16 : bucket === 'gas_supply' ? 10 : bucket === 'iran_risk' ? 8 : bucket === 'energy_prices' ? 6 : 10
        : bucket === 'industrial_supply' ? 20 : bucket === 'labour' ? 18 : bucket === 'gas_supply' ? 16 : bucket === 'iran_risk' ? 14 : bucket === 'energy_prices' ? 12 : 10;

  return editorialBase + freshnessBase + sourceBase + familyBase + bucketBase;
}

function sortSectionCandidates(section: SectionName, clusters: TopicCluster[]) {
  return [...clusters].sort((left, right) => {
    const priorityDiff = sectionPriority(section, right) - sectionPriority(section, left);
    if (priorityDiff !== 0) return priorityDiff;
    return right.editorialImportance - left.editorialImportance;
  });
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
          ? { opening: 1, radar: 1, carnet: 1, briefs: 1 }
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

function buildLeadMicroBriefCandidate(leadTopic: TopicCluster | null, marketContext: StructuredMarketContext): MicroBriefCandidate | null {
  if (!leadTopic) return null;
  const bucket = sectionBucket(leadTopic);
  if (bucket === 'energy_prices') {
    return {
      id: `micro-brief-${leadTopic.id}-aftershock`,
      kind: 'lead_aftershock',
      titleHint: 'Après le choc pétrole',
      textHint: 'En actions, le choc pétrolier agit déjà comme un sujet de marges, de fret et de coût du capital bien au-delà d’un simple mouvement boursier.',
      factIds: leadTopic.factIds.slice(0, 8),
      articleIds: leadTopic.sourceArticleIds,
      clusterIds: [leadTopic.id],
      marketKeys: ['actions'],
      sourceClusterId: leadTopic.id,
      priority: 10,
    };
  }
  return {
    id: `micro-brief-${leadTopic.id}-context`,
    kind: 'lead_aftershock',
    titleHint: 'Après le lead',
    textHint: 'Le sujet principal reste utile surtout parce qu’il requalifie la lecture des coûts, du risque et du tempo de marché au-delà du seul titre du jour.',
    factIds: leadTopic.factIds.slice(0, 8),
    articleIds: leadTopic.sourceArticleIds,
    clusterIds: [leadTopic.id],
    sourceClusterId: leadTopic.id,
    priority: 8,
  };
}

function buildClusterMicroBriefCandidate(cluster: TopicCluster, occupiedIds: Set<string>): MicroBriefCandidate | null {
  if (!cluster || occupiedIds.has(cluster.id)) return null;
  const bucket = sectionBucket(cluster);
  if (bucket === 'labour') {
    return {
      id: `micro-brief-${cluster.id}-labour`,
      kind: 'context_pulse',
      titleHint: 'Signal travail',
      textHint: 'Travail : le signal compte moins pour son détail que pour ce qu’il dit du rythme réel de désinflation et de croissance en Europe.',
      factIds: cluster.factIds.slice(0, 6),
      articleIds: cluster.sourceArticleIds,
      clusterIds: [cluster.id],
      sourceClusterId: cluster.id,
      priority: 6,
    };
  }
  if (bucket === 'industrial_supply') {
    return {
      id: `micro-brief-${cluster.id}-industry`,
      kind: 'context_pulse',
      titleHint: 'Signal industriel',
      textHint: 'Industrie : le dossier vaut surtout comme test de continuité productive et de discipline d’investissement quand les coûts repartent.',
      factIds: cluster.factIds.slice(0, 6),
      articleIds: cluster.sourceArticleIds,
      clusterIds: [cluster.id],
      sourceClusterId: cluster.id,
      priority: 5,
    };
  }
  return null;
}

function buildMicroBriefCandidates(
  leadTopic: TopicCluster | null,
  remaining: TopicCluster[],
  chosenSections: { opening: TopicCluster[]; radar: TopicCluster[]; carnet: TopicCluster[]; briefs: TopicCluster[] },
  marketContext: StructuredMarketContext,
): MicroBriefCandidate[] {
  const occupiedIds = new Set(chosenSections.briefs.map((cluster) => cluster.id));
  const candidates: MicroBriefCandidate[] = [];
  const seen = new Set<string>();

  const push = (candidate: MicroBriefCandidate | null) => {
    if (!candidate || seen.has(candidate.id)) return;
    seen.add(candidate.id);
    candidates.push(candidate);
  };

  push(buildLeadMicroBriefCandidate(leadTopic, marketContext));
  for (const cluster of remaining) {
    push(buildClusterMicroBriefCandidate(cluster, occupiedIds));
    if (candidates.length >= 2) break;
  }

  return candidates.sort((left, right) => right.priority - left.priority);
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

  const opening = takeSectionCandidates(sortSectionCandidates('opening', remainingFresh), targets.opening, usedIds, usedBuckets, (cluster) => cluster.freshness.qualifiesForOpening);
  const radar = takeSectionCandidates(sortSectionCandidates('radar', remaining), targets.radar, usedIds, usedBuckets, (cluster) => isSecondarySignalCandidate(cluster));
  const carnet = takeSectionCandidates(sortSectionCandidates('carnet', remaining), targets.carnet, usedIds, usedBuckets, (cluster) => isCarnetCandidate(cluster));
  const briefs = takeSectionCandidates(sortSectionCandidates('briefs', remaining), targets.briefs, usedIds, usedBuckets, (cluster) => cluster.freshness.clusterRecencyType !== 'stale');
  const microBriefCandidates = buildMicroBriefCandidates(leadTopic, remaining, { opening, radar, carnet, briefs }, marketContext);

  const freshEventCount = usable.filter((cluster) => isFreshCluster(cluster)).length;
  const materialTier: MaterialTier = freshEventCount >= OIKO_V3_POLICY.freshness.minimumFreshEventCount
    && usable.length >= OIKO_V3_POLICY.freshness.minimumDistinctClusterCount
    ? 'premium'
    : freshEventCount >= OIKO_V3_POLICY.freshness.shortEdition.minimumFreshEventCount
      && usable.length >= OIKO_V3_POLICY.freshness.shortEdition.minimumDistinctClusterCount
      ? 'short'
      : 'blocked';

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
    microBriefCandidates,
    sourceCoverage: accumulateSourceCoverage(usable),
    freshEventCount,
    distinctClusterCount: usable.length,
    materialTier,
  };
}

function uniqueClusters(clusters: Array<TopicCluster | null | undefined>) {
  const seen = new Set<string>();
  return clusters.filter((cluster): cluster is TopicCluster => Boolean(cluster)).filter((cluster) => {
    if (seen.has(cluster.id)) return false;
    seen.add(cluster.id);
    return true;
  });
}

function orderedClustersFromIds(clusterIds: string[], clusterById: Map<string, TopicCluster>) {
  return uniqueClusters(clusterIds.map((clusterId) => clusterById.get(clusterId) || null));
}

function fillSectionFromPlan(
  plannedIds: string[],
  fallbackSection: TopicCluster[],
  fallbackPool: TopicCluster[],
  targetCount: number,
  usedIds: Set<string>,
  clusterById: Map<string, TopicCluster>,
) {
  const picked: TopicCluster[] = [];

  const push = (cluster?: TopicCluster | null) => {
    if (!cluster || usedIds.has(cluster.id) || picked.length >= targetCount) return;
    usedIds.add(cluster.id);
    picked.push(cluster);
  };

  orderedClustersFromIds(plannedIds, clusterById).forEach(push);
  fallbackSection.forEach(push);
  fallbackPool.forEach(push);

  return picked;
}

export function applyEditorialPlan(packet: DayEditorialPacket, plan: EditorialPlan): DayEditorialPacket {
  const allClusters = uniqueClusters([packet.leadTopic, ...packet.secondaryTopics]);
  const clusterById = new Map(allClusters.map((cluster) => [cluster.id, cluster]));
  const fallbackLead = packet.leadTopic || allClusters[0] || null;
  const leadTopic = (plan.leadClusterId ? clusterById.get(plan.leadClusterId) : null) || fallbackLead;
  const usedIds = new Set<string>(leadTopic ? [leadTopic.id] : []);
  const fallbackPool = uniqueClusters([
    ...orderedClustersFromIds(plan.selectedClusterIds, clusterById),
    ...packet.chosenSections.opening,
    ...packet.chosenSections.radar,
    ...packet.chosenSections.carnet,
    ...packet.chosenSections.briefs,
    ...packet.secondaryTopics,
  ]).filter((cluster) => cluster.id !== leadTopic?.id);

  const opening = fillSectionFromPlan(plan.openingClusterIds, packet.chosenSections.opening, fallbackPool, packet.chosenSections.opening.length, usedIds, clusterById);
  const radar = fillSectionFromPlan(plan.radarClusterIds, packet.chosenSections.radar, fallbackPool, packet.chosenSections.radar.length, usedIds, clusterById);
  const carnet = fillSectionFromPlan(plan.carnetClusterIds, packet.chosenSections.carnet, fallbackPool, packet.chosenSections.carnet.length, usedIds, clusterById);
  const briefs = fillSectionFromPlan(plan.briefClusterIds, packet.chosenSections.briefs, fallbackPool, packet.chosenSections.briefs.length, usedIds, clusterById);

  const secondaryTopics = uniqueClusters([
    ...opening,
    ...radar,
    ...carnet,
    ...briefs,
    ...fallbackPool,
    ...allClusters,
  ]).filter((cluster) => cluster.id !== leadTopic?.id).slice(0, 10);
  const chosenSections = { opening, radar, carnet, briefs };

  return {
    ...packet,
    leadTopic,
    secondaryTopics,
    chosenSections,
    microBriefCandidates: buildMicroBriefCandidates(leadTopic, secondaryTopics, chosenSections, packet.marketContext),
    editorialPlan: plan,
  };
}
export default {
  scoreTopics,
  buildDayEditorialPacket,
};
