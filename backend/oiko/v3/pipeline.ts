import { OIKO_V3_PIPELINE_VERSION, OIKO_V3_POLICY } from '../policy/v3.ts';
import { oikoQueries } from '../queries.ts';
import { safeJsonParse } from '../utils.ts';
import { acquireArticleContent } from './acquire.ts';
import { clusterTopics } from './clusters.ts';
import { collectRawSources } from './collect.ts';
import { buildDayEditorialPacket, scoreTopics } from './editorial.ts';
import { extractFactSheets } from './facts.ts';
import { generateFrenchEditionDraft, repairOrRegenerateDraftIfNeeded } from './generate.ts';
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

type MaterialGateResult = {
  status: 'blocked_insufficient_fresh_material' | 'insufficient_material_review';
  reasonCode: string;
  reason: string;
} | {
  status: 'short_draft';
  reasonCode: string;
  reason: string;
} | null;

function buildMaterialGateDecision(packet: DayEditorialPacket): MaterialGateResult {
  const full = OIKO_V3_POLICY.freshness;
  const short = full.shortEdition;

  const meetsFullThreshold = packet.freshEventCount >= full.minimumFreshEventCount
    && packet.distinctClusterCount >= full.minimumDistinctClusterCount;

  if (meetsFullThreshold) {
    // Source quality gate still applies for full editions.
    if (packet.sourceCoverage.highQualitySources < OIKO_V3_POLICY.publication.requireHighQualitySources) {
      return {
        status: 'insufficient_material_review',
        reasonCode: 'source_quality_failed',
        reason: `Publication bloquée : seulement ${packet.sourceCoverage.highQualitySources} source(s) de qualité élevée ont été retenues, ce qui reste trop faible pour une édition premium.`,
      };
    }
    return null;
  }

  // Not enough for a full edition — check if short edition is viable.
  const meetsShortThreshold = packet.freshEventCount >= short.minimumFreshEventCount
    && packet.distinctClusterCount >= short.minimumDistinctClusterCount;

  if (meetsShortThreshold) {
    return {
      status: 'short_draft',
      reasonCode: 'short_edition',
      reason: `Édition courte : ${packet.freshEventCount} sujet(s) frais et ${packet.distinctClusterCount} cluster(s) distinct(s) — en dessous du seuil premium mais suffisant pour une édition condensée.`,
    };
  }

  // Not enough for any edition.
  return {
    status: 'blocked_insufficient_fresh_material',
    reasonCode: 'insufficient_fresh_material',
    reason: `Publication bloquée : seulement ${packet.freshEventCount} sujet(s) frais et ${packet.distinctClusterCount} cluster(s) distinct(s), ce qui reste insuffisant même pour une édition courte.`,
  };
}

function loadPreservablePacket(editionDate: string) {
  const existingPacket = oikoQueries.v3.editorialPackets.getByEdition.get(editionDate, OIKO_V3_PIPELINE_VERSION);
  if (!existingPacket) return null;
  if (existingPacket.status !== 'ready' || existingPacket.visibility !== 'internal' || existingPacket.quality_state !== 'passed') return null;
  if (!existingPacket.packet_json || !existingPacket.content_json || !existingPacket.html || !existingPacket.text) return null;
  return existingPacket;
}

async function rerenderPreservablePacket(editionDate: string, existingPacket: any, blockedDecision: { reason: string; reasonCode: string }) {
  const packet = safeJsonParse(existingPacket.packet_json, null) as DayEditorialPacket | null;
  const marketContext = safeJsonParse(existingPacket.market_context_json, null) || packet?.marketContext || null;
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

      const factSheets = await extractFactSheets(normalizedArticles, marketContext, editionDate);
      if (factSheets.length || !preservablePacket) {
        persistFactSheets(editionDate, factSheets);
      }
      reports.push(stageReport('facts', 'passed', `${factSheets.length} fiche(s) factuelles extraites.`, {}));

      const scoredClusters = scoreTopics(clusterTopics(factSheets), factSheets, marketContext);
      if (scoredClusters.length || !preservablePacket) {
        persistClusters(editionDate, scoredClusters);
      }
      reports.push(stageReport('clusters', 'passed', `${scoredClusters.length} cluster(s) thématiques consolidés.`, { distinct_cluster_count: scoredClusters.length }));

      const packet = buildDayEditorialPacket(editionDate, scoredClusters, marketContext);
      reports.push(stageReport('packet', 'passed', `Packet éditorial prêt avec ${packet.freshEventCount} cluster(s) frais et ${packet.distinctClusterCount} cluster(s) distincts.`, {
        fresh_event_count: packet.freshEventCount,
        distinct_cluster_count: packet.distinctClusterCount,
        high_quality_source_count: packet.sourceCoverage.highQualitySources,
      }));

      const materialDecision = buildMaterialGateDecision(packet);
      const isShortEdition = materialDecision?.status === 'short_draft';

      // Hard block: not enough material even for a short edition.
      if (materialDecision && !isShortEdition) {
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

      if (isShortEdition && materialDecision) {
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
      const publication = publishEdition(editionDate, OIKO_V3_PIPELINE_VERSION, packet, draft, rendered, finalReport, assetQuality, { isShortEdition });

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