import { average, normalizeTitle, titleSimilarity } from '../utils.ts';
import type { ClusterFreshness, FactSheetRecord, TopicCluster } from './types.ts';

function overlapCount(left: string[], right: string[]) {
  const setRight = new Set(right.map((value) => normalizeTitle(value)));
  return left.filter((value) => setRight.has(normalizeTitle(value))).length;
}

function factSheetSimilarity(left: FactSheetRecord, right: FactSheetRecord) {
  const titleScore = titleSimilarity(left.factSheet.mainEvent, right.factSheet.mainEvent);
  const entityScore = overlapCount(left.factSheet.entities, right.factSheet.entities) > 0 ? 0.25 : 0;
  const geoScore = overlapCount(left.factSheet.geography, right.factSheet.geography) > 0 ? 0.15 : 0;
  const familyScore = left.article.topicFamily === right.article.topicFamily ? 0.2 : 0;
  return titleScore + entityScore + geoScore + familyScore;
}

function pickRecency(records: FactSheetRecord[]): ClusterFreshness {
  const recencies = records.map((record) => record.temporal.recencyType);
  const freshEvent = recencies.includes('new_event');
  const freshUpdate = !freshEvent && recencies.includes('new_update');
  const contextOnly = !freshEvent && !freshUpdate && recencies.includes('background');
  const clusterRecencyType = freshEvent ? 'fresh_event' : freshUpdate ? 'fresh_update' : contextOnly ? 'context_only' : 'stale';
  const sortedDates = records
    .map((record) => record.temporal.primaryEventTimeStart || record.article.publishedAt)
    .filter(Boolean)
    .sort();

  return {
    clusterId: '',
    clusterRecencyType,
    primaryEventTimeStart: sortedDates[0],
    primaryEventTimeEnd: sortedDates[sortedDates.length - 1],
    freshnessJustification: clusterRecencyType === 'fresh_event'
      ? 'Le cluster contient au moins un fait principal nouveau dans la fenêtre.'
      : clusterRecencyType === 'fresh_update'
        ? 'Le cluster apporte une mise à jour nouvelle sur un dossier en cours.'
        : clusterRecencyType === 'context_only'
          ? 'Le cluster sert surtout de contexte explicatif sans fait dominant nouveau.'
          : 'Le cluster ressemble à un sujet ancien ou recyclé.',
    qualifiesForLead: clusterRecencyType === 'fresh_event' || clusterRecencyType === 'fresh_update',
    qualifiesForOpening: clusterRecencyType === 'fresh_event' || clusterRecencyType === 'fresh_update',
  };
}

function buildTopicLabel(records: FactSheetRecord[]) {
  const candidate = records
    .map((record) => record.factSheet.mainEvent)
    .sort((left, right) => left.length - right.length)[0];
  return candidate || records[0]?.article.title || 'Sujet macro';
}

export function clusterTopics(records: FactSheetRecord[]) {
  const groups: FactSheetRecord[][] = [];

  for (const record of records) {
    const matchingGroup = groups.find((group) => group.some((candidate) => factSheetSimilarity(candidate, record) >= 0.65));
    if (matchingGroup) {
      matchingGroup.push(record);
    } else {
      groups.push([record]);
    }
  }

  return groups.map((group, index) => {
    const freshness = pickRecency(group);
    const clusterId = `cluster-${index + 1}-${group[0]?.article.topicFamily || 'macro'}`;
    freshness.clusterId = clusterId;
    const sourceProfiles = group.map((item) => item.article.sourceProfile);
    const confidence = Number(average(group.map((item) => item.factSheet.confidence)).toFixed(2));
    return {
      id: clusterId,
      topicLabel: buildTopicLabel(group),
      topicFamily: group[0]?.article.topicFamily || 'institutions',
      sourceArticleIds: group.map((item) => item.article.id),
      factIds: group.flatMap((item) => item.factRecords.map((fact) => fact.factId)),
      mergedFacts: group.flatMap((item) => item.factSheet.facts).filter(Boolean).slice(0, 12),
      mergedNumbers: group.flatMap((item) => item.factSheet.numbers).slice(0, 8),
      mergedCauses: group.flatMap((item) => item.factSheet.causes).filter(Boolean).slice(0, 6),
      mergedConsequences: group.flatMap((item) => item.factSheet.consequences).filter(Boolean).slice(0, 6),
      contradictions: [],
      confidence,
      editorialImportance: 0,
      freshness,
      sourceProfiles,
    } satisfies TopicCluster;
  });
}

export default {
  clusterTopics,
};
