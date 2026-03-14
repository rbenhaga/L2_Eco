import { OIKO_V3_PIPELINE_VERSION, OIKO_V3_POLICY } from '../policy/v3.ts';
import { oikoQueries } from '../queries.ts';
import { safeJsonParse } from '../utils.ts';
import { acquireArticleContent } from './acquire.ts';
import { clusterTopics } from './clusters.ts';
import { collectRawSources } from './collect.ts';
import { applyEditorialPlan, buildDayEditorialPacket, scoreTopics } from './editorial.ts';
import { extractFactSheets } from './facts.ts';
import { generateFrenchEditionDraft, repairOrRegenerateDraftIfNeeded } from './generate.ts';
import { planEditorialStructure } from './planning.ts';
import { buildStructuredMarketContext } from './markets.ts';
import { normalizeArticles } from './normalize.ts';
import { computeAssetQuality, generateArchiveTeaserFromPacket, persistQualityReports, publishEdition, renderV3Draft } from './publish.ts';
import { critiqueEditionDraft } from './quality.ts';
import type { AcquiredArticle, DayEditorialPacket, FactSheetRecord, NormalizedArticle, QualityIssue, QualityReport, TopicCluster } from './types.ts';
import { upsertEditorialPacket } from './upsertEditorialPacket.ts';

function withV3JobRun<T>(editionDate: string, fn: () => Promise<T>) {
  const lockKey = `${editionDate}:compose:${OIKO_V3_PIPELINE_VERSION}:shadow`;
  const loadMeta = () => safeJsonParse(oikoQueries.jobRuns.getByLockKey.get(lockKey)?.meta_json, {});
  const existing = oikoQueries.jobRuns.getByLockKey.get(lockKey);

  if (existing?.status === 'success') {
    return Promise.resolve({ skipped: true, reason: 'already_done', meta: loadMeta() });
  }
  if (existing?.status === 'started') {
    return Promise.resolve({ skipped: true, reason: 'already_running', meta: loadMeta() });
  }

  if (existing) {
    oikoQueries.jobRuns.restart.run('started', JSON.stringify({ pipelineVersion: OIKO_V3_PIPELINE_VERSION, restarted: true }), lockKey);
  } else {
    try {
      oikoQueries.jobRuns.create.run(editionDate, 'compose_v3', 'started', lockKey, JSON.stringify({ pipelineVersion: OIKO_V3_PIPELINE_VERSION }));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('oiko_news_job_runs.lock_key')) {
        const collided = oikoQueries.jobRuns.getByLockKey.get(lockKey);
        if (collided?.status === 'success') {
          return Promise.resolve({ skipped: true, reason: 'already_done', meta: loadMeta() });
        }
        if (collided?.status === 'started') {
          return Promise.resolve({ skipped: true, reason: 'already_running', meta: loadMeta() });
        }
        oikoQueries.jobRuns.restart.run('started', JSON.stringify({ pipelineVersion: OIKO_V3_PIPELINE_VERSION, restarted: true }), lockKey);
      } else {
        throw error;
      }
    }
  }

  return fn()
    .then((result) => {
      oikoQueries.jobRuns.complete.run('success', JSON.stringify(result || {}), lockKey);
      return result;
    })
    .catch((error: Error) => {
      oikoQueries.jobRuns.complete.run('failed', JSON.stringify({ error: error.message }), lockKey);
      throw error;
    });
}

function stageReport(stage: string, status: 'passed' | 'failed', summaryText: string, metrics: Record<string, unknown> = {}, issues: QualityIssue[] = []): QualityReport {
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
      distinct_cluster_count: Number(metrics.distinct_cluster_count || 0),
      supported_sentence_ratio: Number(metrics.supported_sentence_ratio || 0),
      forbidden_residue_count: Number(metrics.forbidden_residue_count || 0),
      fresh_event_count: Number(metrics.fresh_event_count || 0),
      high_quality_source_count: Number(metrics.high_quality_source_count || 0),
      english_sentence_count: Number(metrics.english_sentence_count || 0),
      mixed_language_sentence_count: Number(metrics.mixed_language_sentence_count || 0),
      provider_residue_count: Number(metrics.provider_residue_count || 0),
      duplication_ratio: Number(metrics.duplication_ratio || 0),
      language_quality_score: Number(metrics.language_quality_score || 0),
      assetCoverage: Number(metrics.assetCoverage || 0),
      missingAssets: Array.isArray(metrics.missingAssets) ? metrics.missingAssets as string[] : [],
      brokenAssetCount: Number(metrics.brokenAssetCount || 0),
    },
    issues,
    publicationStatus: 'draft',
    publicationReason: summaryText,
    publicationReasonCode: `${stage}_report`,
    visibility: 'internal',
  };
}

function persistRawArticles(editionDate: string, acquiredArticles: AcquiredArticle[], normalizedArticles: NormalizedArticle[]) {
  const normalizedById = new Map(normalizedArticles.map((article) => [article.rawArticleId, article]));
  oikoQueries.v3.rawArticles.clearByEdition.run(editionDate, OIKO_V3_PIPELINE_VERSION);
  for (const article of acquiredArticles) {
    const normalized = normalizedById.get(article.id);
    oikoQueries.v3.rawArticles.upsert.run(
      editionDate,
      OIKO_V3_PIPELINE_VERSION,
      article.url,
      article.canonicalUrl,
      article.title,
      article.sourceName,
      article.sourceDomain,
      article.provider,
      article.publishedAt,
      article.language,
      article.snippetRaw,
      article.bodyRaw,
      article.acquiredHtml,
      article.acquiredText,
      normalized?.cleanTitle || null,
      normalized?.cleanSnippet || null,
      normalized?.cleanBody || null,
      article.contentDepth,
      article.acquisitionStatus,
      article.acquisitionError,
      article.robotsAllowed ? 1 : 0,
      article.licenseStatus,
      article.paywallDetected ? 1 : 0,
      normalized?.topicFamily || article.topicFamily || null,
      article.sourceProfile.sourceTier,
      article.sourceProfile.sourceReliabilityScore,
      article.sourceProfile.sourceType,
      article.sourceProfile.paywallRisk,
      article.sourceProfile.snippetOnlyRisk,
      JSON.stringify(article.rawJson || {}),
      JSON.stringify(normalized || {}),
    );
  }
}

function persistFactSheets(editionDate: string, factSheets: FactSheetRecord[]) {
  oikoQueries.v3.factSheets.clearByEdition.run(editionDate, OIKO_V3_PIPELINE_VERSION);
  const rawRows = oikoQueries.v3.rawArticles.listByEdition.all(editionDate, OIKO_V3_PIPELINE_VERSION) as Array<{ id: number; normalized_json: string; raw_json: string }>;
  const rawByArticleId = new Map(rawRows.map((row) => [safeJsonParse(row.normalized_json, {})?.id || safeJsonParse(row.raw_json, {})?.id, row.id]));
  for (const record of factSheets) {
    oikoQueries.v3.factSheets.insert.run(
      editionDate,
      OIKO_V3_PIPELINE_VERSION,
      rawByArticleId.get(record.article.id),
      record.article.id,
      record.temporal.recencyType,
      record.temporal.freshnessScore,
      record.factSheet.confidence,
      JSON.stringify({ factSheet: record.factSheet, factRecords: record.factRecords, article: record.article }),
      JSON.stringify(record.temporal),
    );
  }
}

function persistClusters(editionDate: string, clusters: TopicCluster[]) {
  oikoQueries.v3.topicClusters.clearByEdition.run(editionDate, OIKO_V3_PIPELINE_VERSION);
  for (const cluster of clusters) {
    oikoQueries.v3.topicClusters.insert.run(
      editionDate,
      OIKO_V3_PIPELINE_VERSION,
      cluster.id,
      cluster.topicLabel,
      cluster.topicFamily,
      cluster.editorialImportance,
      cluster.confidence,
      JSON.stringify(cluster),
      JSON.stringify(cluster.freshness),
    );
  }
}

type StoredEditorialPacketRow = {
  status: string;
  visibility: 'internal' | 'public';
  quality_state: 'passed' | 'failed';
  packet_json: string | null;
  content_json: string | null;
  html: string | null;
  text: string | null;
  market_context_json: string | null;
  publication_reason: string | null;
  publication_reason_code: string | null;
  archive_teaser: string | null;
};

type MaterialGateResult = {
  status: 'blocked_insufficient_fresh_material' | 'insufficient_material_review';
  reasonCode: string;
  reason: string;
} | {
  status: 'short_draft';
  reasonCode: string;
  reason: string;
} | null;

const KNOWN_MOJIBAKE_REPLACEMENTS: Array<[string, string]> = [
  ['\u00e2\u20ac\u2122', '\u2019'],
  ['\u00e2\u20ac\u201c', '\u2013'],
  ['\u00e2\u20ac\u201d', '\u2014'],
  ['\u00e2\u20ac\u00a6', '\u2026'],
  ['\u00c5\u201c', '\u0153'],
  ['\u00c5\u2019', '\u0152'],
  ['\u00c3\u20ac', '\u00c0'],
  ['\u00c3\u201a', '\u00c2'],
  ['\u00c3\u2021', '\u00c7'],
  ['\u00c3\u02c6', '\u00c8'],
  ['\u00c3\u2030', '\u00c9'],
  ['\u00c3\u0160', '\u00ca'],
  ['\u00c3\u017d', '\u00ce'],
  ['\u00c3\u201d', '\u00d4'],
  ['\u00c3\u2122', '\u00d9'],
  ['\u00c3\u203a', '\u00db'],
  ['\u00c3\u00a0', '\u00e0'],
  ['\u00c3\u00a2', '\u00e2'],
  ['\u00c3\u00a7', '\u00e7'],
  ['\u00c3\u00a8', '\u00e8'],
  ['\u00c3\u00a9', '\u00e9'],
  ['\u00c3\u00aa', '\u00ea'],
  ['\u00c3\u00ab', '\u00eb'],
  ['\u00c3\u00ae', '\u00ee'],
  ['\u00c3\u00af', '\u00ef'],
  ['\u00c3\u00b4', '\u00f4'],
  ['\u00c3\u00b9', '\u00f9'],
  ['\u00c3\u00bb', '\u00fb'],
  ['\u00c2 ', ' '],
  ['\u00c2', ''],
];

function repairKnownMojibakeText(value: string) {
  let repaired = String(value || '');
  for (const [source, target] of KNOWN_MOJIBAKE_REPLACEMENTS) {
    repaired = repaired.split(source).join(target);
  }
  return repaired;
}

function repairKnownMojibakeDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return repairKnownMojibakeText(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => repairKnownMojibakeDeep(entry)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, repairKnownMojibakeDeep(entry)]),
    ) as T;
  }
  return value;
}

function buildMaterialGateDecision(packet: DayEditorialPacket): MaterialGateResult {
  if (packet.materialTier === 'blocked') {
    return {
      status: 'blocked_insufficient_fresh_material',
      reasonCode: 'insufficient_fresh_material',
      reason: `Publication bloquée : seulement ${packet.freshEventCount} sujet(s) frais et ${packet.distinctClusterCount} cluster(s) distinct(s), ce qui reste insuffisant même pour une édition courte.`,
    };
  }

  if (packet.sourceCoverage.highQualitySources < OIKO_V3_POLICY.publication.requireHighQualitySources) {
    return {
      status: 'insufficient_material_review',
      reasonCode: 'source_quality_failed',
      reason: `Publication bloquée : seulement ${packet.sourceCoverage.highQualitySources} source(s) de qualité élevée ont été retenues, ce qui reste trop faible pour publication.`,
    };
  }

  if (packet.materialTier === 'short') {
    return {
      status: 'short_draft',
      reasonCode: 'short_edition',
      reason: `Édition courte : ${packet.freshEventCount} sujet(s) frais et ${packet.distinctClusterCount} cluster(s) distinct(s), en dessous du seuil premium mais suffisants pour une édition condensée.`,
    };
  }

  return null;
}

function loadPreservablePacket(editionDate: string): StoredEditorialPacketRow | null {
  const existingPacket = oikoQueries.v3.editorialPackets.getByEdition.get(editionDate, OIKO_V3_PIPELINE_VERSION) as StoredEditorialPacketRow | undefined;
  if (!existingPacket) return null;
  if (!['ready', 'short_draft'].includes(existingPacket.status)) return null;
  if (!['internal', 'public'].includes(existingPacket.visibility) || existingPacket.quality_state !== 'passed') return null;
  if (!existingPacket.packet_json || !existingPacket.content_json || !existingPacket.html || !existingPacket.text) return null;
  return existingPacket;
}

async function rerenderPreservablePacket(editionDate: string, existingPacket: StoredEditorialPacketRow, blockedDecision: { reason: string; reasonCode: string }) {
  const packet = repairKnownMojibakeDeep(safeJsonParse(existingPacket.packet_json, null)) as DayEditorialPacket | null;
  const marketContext = repairKnownMojibakeDeep(safeJsonParse(existingPacket.market_context_json, null) || packet?.marketContext || null);
  if (!packet || !marketContext) return null;

  const clusters = [packet.leadTopic, ...packet.secondaryTopics].filter(Boolean) as TopicCluster[];
  const reports: QualityReport[] = [];
  let draft = await generateFrenchEditionDraft(packet, editionDate);
  let criticReport = critiqueEditionDraft(draft, packet, clusters, []);
  reports.push(criticReport);

  if (criticReport.status === 'failed') {
    draft = await repairOrRegenerateDraftIfNeeded(draft, criticReport, packet, editionDate);
    criticReport = critiqueEditionDraft(draft, packet, clusters, []);
    reports.push({ ...criticReport, stage: 'critic_repair' });
  }

  const rendered = await renderV3Draft(editionDate, draft, packet, marketContext);
  const assetQuality = computeAssetQuality(rendered);
  const finalReport = critiqueEditionDraft(draft, packet, clusters, [], assetQuality);
  reports.push({ ...finalReport, stage: 'final_gate' });
  persistQualityReports(editionDate, OIKO_V3_PIPELINE_VERSION, reports);
  const publication = publishEdition(editionDate, OIKO_V3_PIPELINE_VERSION, packet, draft, rendered, finalReport, assetQuality);

  return {
    ...publication,
    preservedExistingPacket: true,
    refreshedExistingPacket: true,
    blockedAttemptReason: blockedDecision.reason,
    blockedAttemptReasonCode: blockedDecision.reasonCode,
  };
}

function persistBlockedPacket(editionDate: string, packet: DayEditorialPacket, reports: QualityReport[], decision: NonNullable<ReturnType<typeof buildMaterialGateDecision>>) {
  const existingPacket = loadPreservablePacket(editionDate);
  if (existingPacket) {
    return {
      status: existingPacket.status,
      visibility: existingPacket.visibility,
      qualityState: existingPacket.quality_state,
      publicationReason: existingPacket.publication_reason,
      publicationReasonCode: existingPacket.publication_reason_code,
      archiveTeaser: existingPacket.archive_teaser,
      emailHtmlPreviewUrl: null,
      preservedExistingPacket: true,
      blockedAttemptReason: decision.reason,
      blockedAttemptReasonCode: decision.reasonCode,
    };
  }

  const archiveTeaser = generateArchiveTeaserFromPacket(packet);
  upsertEditorialPacket({
    editionDate,
    pipelineVersion: OIKO_V3_PIPELINE_VERSION,
    status: decision.status,
    visibility: 'internal',
    qualityState: 'failed',
    packetJson: JSON.stringify(packet),
    draftJson: null,
    evidenceJson: null,
    contentJson: null,
    marketContextJson: JSON.stringify(packet.marketContext),
    assetManifestJson: null,
    html: null,
    text: null,
    archiveTeaser,
    publicationReason: decision.reason,
    publicationReasonCode: decision.reasonCode,
  });
  persistQualityReports(editionDate, OIKO_V3_PIPELINE_VERSION, reports);
  return {
    status: decision.status,
    visibility: 'internal' as const,
    qualityState: 'failed' as const,
    publicationReason: decision.reason,
    publicationReasonCode: decision.reasonCode,
    archiveTeaser,
    emailHtmlPreviewUrl: null,
  };
}

export const __testables = {
  loadPreservablePacket,
  persistBlockedPacket,
};

export async function runV3ShadowPipeline(editionDate: string) {
  return withV3JobRun(editionDate, async () => {
    const reports: QualityReport[] = [];
    const preservablePacket = loadPreservablePacket(editionDate);
    try {
      const rawArticles = await collectRawSources(editionDate);
      reports.push(stageReport('collect_raw', 'passed', `${rawArticles.length} article(s) bruts collectés pour V3.`, { distinct_cluster_count: rawArticles.length }));

      const acquiredArticles = await acquireArticleContent(rawArticles);
      reports.push(stageReport('acquire', 'passed', `${acquiredArticles.filter((article) => article.acquisitionStatus !== 'blocked').length} article(s) acquis avec contenu exploitable.`, {}));

      const normalizedArticles = normalizeArticles(acquiredArticles);
      persistRawArticles(editionDate, acquiredArticles, normalizedArticles);
      reports.push(stageReport('normalize', 'passed', `${normalizedArticles.length} article(s) normalisés après déduplication.`, { distinct_cluster_count: normalizedArticles.length }));

      const marketContext = await buildStructuredMarketContext(editionDate);
      reports.push(stageReport('market_context', 'passed', `Contexte marchés structuré avec confiance ${marketContext.confidence}.`, {}));

      const factExtraction = await extractFactSheets(normalizedArticles, marketContext, editionDate);
      const factSheets = factExtraction.records;
      if (factSheets.length || !preservablePacket) {
        persistFactSheets(editionDate, factSheets);
      }
      reports.push(stageReport('facts', 'passed', `${factSheets.length} fiche(s) factuelles extraites.`, {}));

      const scoredClusters = scoreTopics(clusterTopics(factSheets), factSheets, marketContext);
      if (scoredClusters.length || !preservablePacket) {
        persistClusters(editionDate, scoredClusters);
      }
      reports.push(stageReport('clusters', 'passed', `${scoredClusters.length} cluster(s) thématiques consolidés.`, { distinct_cluster_count: scoredClusters.length }));

      const basePacket = buildDayEditorialPacket(editionDate, scoredClusters, marketContext);
      const planning = await planEditorialStructure(basePacket, editionDate);
      let packet = applyEditorialPlan({ ...basePacket, llmStages: [...factExtraction.llmStages] }, planning.plan);
      packet = {
        ...packet,
        llmStages: [...factExtraction.llmStages, ...planning.llmStages],
      };
      reports.push(stageReport('packet', 'passed', `Packet éditorial prêt avec ${packet.freshEventCount} cluster(s) frais et ${packet.distinctClusterCount} cluster(s) distincts.`, {
        fresh_event_count: packet.freshEventCount,
        distinct_cluster_count: packet.distinctClusterCount,
        high_quality_source_count: packet.sourceCoverage.highQualitySources,
      }));
      reports.push(stageReport('editorial_plan', 'passed', `Plan éditorial ${packet.llmStages?.some((stage) => stage.stage === 'editorial_plan' && stage.success && !stage.usedFallback) ? 'LLM' : 'déterministe'} prêt pour ${packet.editorialPlan?.leadClusterId || 'le lead courant'}.`, {
        fresh_event_count: packet.freshEventCount,
        distinct_cluster_count: packet.distinctClusterCount,
        high_quality_source_count: packet.sourceCoverage.highQualitySources,
      }));

      const materialDecision = buildMaterialGateDecision(packet);

      // Hard block: packet is not publishable even after applying the explicit material tier.
      if (materialDecision && materialDecision.status !== 'short_draft') {
        const materialReport: QualityReport = {
          ...stageReport('material_gate', 'failed', materialDecision.reason, {
            fresh_event_count: packet.freshEventCount,
            distinct_cluster_count: packet.distinctClusterCount,
            high_quality_source_count: packet.sourceCoverage.highQualitySources,
          }),
          publicationStatus: materialDecision.status,
          publicationReason: materialDecision.reason,
          publicationReasonCode: materialDecision.reasonCode,
        };
        reports.push(materialReport);
        const publication = preservablePacket
          ? await rerenderPreservablePacket(editionDate, preservablePacket, materialDecision)
          : null;
        const finalPublication = publication || persistBlockedPacket(editionDate, packet, reports, materialDecision);

        return {
          editionDate,
          pipelineVersion: OIKO_V3_PIPELINE_VERSION,
          rawArticleCount: rawArticles.length,
          normalizedArticleCount: normalizedArticles.length,
          factSheetCount: factSheets.length,
          clusterCount: scoredClusters.length,
          publication: finalPublication,
        };
      }

      if (materialDecision?.status === 'short_draft') {
        reports.push(stageReport('material_gate', 'passed', materialDecision.reason, {
          fresh_event_count: packet.freshEventCount,
          distinct_cluster_count: packet.distinctClusterCount,
          high_quality_source_count: packet.sourceCoverage.highQualitySources,
          short_edition: true,
        }));
      }

      let draft = await generateFrenchEditionDraft(packet, editionDate);
      let criticReport = critiqueEditionDraft(draft, packet, scoredClusters, normalizedArticles);
      reports.push(criticReport);

      if (criticReport.status === 'failed') {
        draft = await repairOrRegenerateDraftIfNeeded(draft, criticReport, packet, editionDate);
        criticReport = critiqueEditionDraft(draft, packet, scoredClusters, normalizedArticles);
        reports.push({ ...criticReport, stage: 'critic_repair' });
      }

      const rendered = await renderV3Draft(editionDate, draft, packet, marketContext);
      const assetQuality = computeAssetQuality(rendered);
      const finalReport = critiqueEditionDraft(draft, packet, scoredClusters, normalizedArticles, assetQuality);
      reports.push({ ...finalReport, stage: 'final_gate' });

      persistQualityReports(editionDate, OIKO_V3_PIPELINE_VERSION, reports);
      const publication = publishEdition(editionDate, OIKO_V3_PIPELINE_VERSION, packet, draft, rendered, finalReport, assetQuality);

      return {
        editionDate,
        pipelineVersion: OIKO_V3_PIPELINE_VERSION,
        rawArticleCount: rawArticles.length,
        normalizedArticleCount: normalizedArticles.length,
        factSheetCount: factSheets.length,
        clusterCount: scoredClusters.length,
        publication,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const fatal = stageReport('fatal', 'failed', `Publication V3 bloquée : ${message}`, {});
      reports.push(fatal);
      persistQualityReports(editionDate, OIKO_V3_PIPELINE_VERSION, reports);
      upsertEditorialPacket({
        editionDate,
        pipelineVersion: OIKO_V3_PIPELINE_VERSION,
        status: 'failed_quality',
        visibility: 'internal',
        qualityState: 'failed',
        packetJson: null,
        draftJson: null,
        evidenceJson: null,
        contentJson: null,
        marketContextJson: null,
        assetManifestJson: null,
        html: null,
        text: null,
        archiveTeaser: null,
        publicationReason: `Publication bloquée : ${message}`,
        publicationReasonCode: 'fatal_pipeline_error',
      });
      throw error;
    }
  });
}

export function getV3Preview(editionDate: string) {
  const packet = oikoQueries.v3.editorialPackets.getByEdition.get(editionDate, OIKO_V3_PIPELINE_VERSION);
  if (!packet) return null;
  return {
    ...packet,
    packet_json: safeJsonParse(packet.packet_json, null),
    draft_json: safeJsonParse(packet.draft_json, null),
    evidence_json: safeJsonParse(packet.evidence_json, null),
    content_json: safeJsonParse(packet.content_json, null),
    market_context_json: safeJsonParse(packet.market_context_json, null),
    asset_manifest_json: safeJsonParse(packet.asset_manifest_json, null),
    quality_reports: oikoQueries.v3.qualityReports.listByEdition.all(editionDate, OIKO_V3_PIPELINE_VERSION).map((report: Record<string, unknown>) => ({
      ...report,
      metrics_json: safeJsonParse(report.metrics_json as string, {}),
      issues_json: safeJsonParse(report.issues_json as string, []),
    })),
  };
}

export default {
  runV3ShadowPipeline,
  getV3Preview,
};