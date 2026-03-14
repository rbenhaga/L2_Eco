import express from 'express';
import type { Request, Response } from 'express';
import { requireAuth } from '../ai/middleware/auth.js';
import OIKO_CONFIG from '../oiko/config.ts';
import { OIKO_V3_PIPELINE_VERSION } from '../oiko/policy/v3.ts';
import { oikoQueries } from '../oiko/queries.ts';
import {
  buildStoredUnsubscribeHash,
  buildUnsubscribeToken,
  hashUnsubscribeToken,
  normalizeEmail,
  safeJsonParse,
  toAbsoluteUrl,
  getTodayInTimeZone,
} from '../oiko/utils.ts';
import { blockToPlainText } from '../oiko/content.ts';

const router = express.Router();

type OikoRequest = Request & { user?: { uid?: string; email?: string | null } };

function extractEditionIntro(content: any) {
  if (!content) return '';
  if (typeof content.intro === 'string') return content.intro;
  if (content.content_version === 'v2.1' || content.content_version === 'v2') {
    return blockToPlainText(content.intro?.paragraphs?.[0]) || '';
  }
  return content.intro || '';
}

function extractEditionSummary(content: any) {
  if (!content) return [];
  if (content.content_version === 'v2.1') {
    return Array.isArray(content.opening_brief?.items)
      ? content.opening_brief.items.map((item: any) => `${item.label}: ${blockToPlainText({ parts: item.parts || [] })}`)
      : [];
  }
  if (content.content_version === 'v2') {
    return Array.isArray(content.menu_of_the_day)
      ? content.menu_of_the_day.map((item: any) => `${item.label}: ${blockToPlainText({ parts: item.parts || [] })}`)
      : [];
  }
  return Array.isArray(content.summary) ? content.summary : [];
}

function trimTeaserText(text: string, maxLength = 190) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= maxLength) return clean;

  const slice = clean.slice(0, maxLength + 1);
  const breakIndex = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('; '), slice.lastIndexOf(', '));
  if (breakIndex >= Math.floor(maxLength * 0.55)) {
    return `${slice.slice(0, breakIndex).trim().replace(/[.,;:!?-]+$/, '')}…`;
  }
  return `${slice.slice(0, maxLength).trim()}…`;
}

function buildArchiveTeaser(content: any, editorialAngle: string) {
  const intro = trimTeaserText(extractEditionIntro(content), 190);
  if (intro) return intro;

  const labels = extractEditionSummary(content)
    .slice(0, 3)
    .map((item: string) => String(item).split(':')[0].trim())
    .filter(Boolean);
  const leadTitle = trimTeaserText(String(content?.lead_story?.title || editorialAngle || ''), 120);

  if (leadTitle && labels.length) {
    return trimTeaserText(`${leadTitle}. Repères du matin : ${labels.join(', ')}.`, 190);
  }
  if (leadTitle) return leadTitle;
  if (labels.length) return `Repères du matin : ${labels.join(', ')}.`;
  return 'Résumé disponible dans l’édition complète.';
}
function buildEditionSlug(editionDate: string) {
  return `oiko-news-${editionDate}`;
}

function extractEditionDateFromSlug(slug: string) {
  const match = String(slug || '').match(/^oiko-news-(\d{4}-\d{2}-\d{2})$/);
  return match ? match[1] : null;
}

function buildEvidenceCoverageScore(evidence: any) {
  const paragraphMap = evidence?.paragraphEvidenceMap && typeof evidence.paragraphEvidenceMap === 'object'
    ? Object.values(evidence.paragraphEvidenceMap)
    : [];
  if (!paragraphMap.length) return 0;
  const supported = paragraphMap.filter((entry: any) => {
    const factCount = Array.isArray(entry?.factIds) ? entry.factIds.length : 0;
    const articleCount = Array.isArray(entry?.articleIds) ? entry.articleIds.length : 0;
    const clusterCount = Array.isArray(entry?.clusterIds) ? entry.clusterIds.length : 0;
    const marketCount = Array.isArray(entry?.marketKeys) ? entry.marketKeys.length : 0;
    return factCount + articleCount + clusterCount + marketCount > 0;
  }).length;
  return Number((supported / paragraphMap.length).toFixed(3));
}

function buildLegacyGenerationMeta(row: any) {
  const provider = String(row?.llm_provider || 'deterministic-reference');
  const model = String(row?.llm_model || 'deterministic-reference');
  return {
    writer: provider,
    model,
    usedFallback: provider === 'deterministic-reference' || model === 'deterministic-reference',
  };
}

function extractV3EditorialAngle(packet: any, content: any) {
  return trimTeaserText(
    String(packet?.editorialPlan?.editorialAngle || content?.lead_story?.title || packet?.leadTopic?.topicLabel || 'Oiko News'),
    190,
  );
}

function shapeLegacyEdition(row: any) {
  if (!row) return null;
  const assets = oikoQueries.assets.listByEditionId.all(row.id);
  return {
    id: row.id,
    editionDate: row.edition_date,
    slug: row.slug,
    status: row.status,
    contentVersion: row.content_version || 'v1',
    editorialAngle: row.editorial_angle,
    marketRegime: row.market_regime,
    evidenceCoverageScore: row.evidence_coverage_score,
    sentAt: row.sent_at,
    createdAt: row.created_at,
    chartManifest: safeJsonParse(row.chart_manifest_json, []),
    assetManifest: assets,
    emailHtmlUrl: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/api/oiko-news/${row.slug}/email-html`),
    content: safeJsonParse(row.content_json, null),
    sourceKind: 'legacy_edition',
    pipelineVersion: 'legacy',
    generationMeta: buildLegacyGenerationMeta(row),
    marketContext: null,
  };
}

function shapeV3Edition(row: any) {
  if (!row) return null;
  const packet = safeJsonParse(row.packet_json, null);
  const content = safeJsonParse(row.content_json, null);
  const evidence = safeJsonParse(row.evidence_json, null);
  const marketContext = safeJsonParse(row.market_context_json, {});
  const assetManifest = safeJsonParse(row.asset_manifest_json, {});
  const slug = buildEditionSlug(row.edition_date);
  return {
    id: `v3:${row.edition_date}`,
    editionDate: row.edition_date,
    slug,
    status: row.status,
    contentVersion: content?.content_version || 'v2.1',
    editorialAngle: extractV3EditorialAngle(packet, content),
    marketRegime: marketContext?.marketRegime || '',
    evidenceCoverageScore: buildEvidenceCoverageScore(evidence),
    sentAt: null,
    createdAt: row.updated_at || null,
    chartManifest: Array.isArray(assetManifest?.chartManifest) ? assetManifest.chartManifest : [],
    assetManifest: Array.isArray(assetManifest?.assets) ? assetManifest.assets : [],
    emailHtmlUrl: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/api/oiko-news/${slug}/email-html`),
    content,
    sourceKind: 'v3_packet',
    pipelineVersion: row.pipeline_version || 'oiko:v3',
    generationMeta: safeJsonParse(row.draft_json, null),
    marketContext,
  };
}

function extractDraftMetadata(row: any) {
  const draft = safeJsonParse(row?.draft_json, null);
  return draft && typeof draft === 'object' ? draft : null;
}

function extractCombinedLlmStages(packet: any, draftMetadata: any) {
  const packetStages = Array.isArray(packet?.llmStages) ? packet.llmStages : [];
  const draftStages = Array.isArray(draftMetadata?.llmStages) ? draftMetadata.llmStages : [];
  return [...packetStages, ...draftStages];
}

function buildSectionLayout(packet: any) {
  const mapIds = (section: any) => Array.isArray(section) ? section.map((cluster: any) => cluster?.id).filter(Boolean) : [];
  return {
    leadClusterId: packet?.leadTopic?.id || packet?.editorialPlan?.leadClusterId || null,
    openingClusterIds: mapIds(packet?.chosenSections?.opening),
    radarClusterIds: mapIds(packet?.chosenSections?.radar),
    carnetClusterIds: mapIds(packet?.chosenSections?.carnet),
    briefClusterIds: mapIds(packet?.chosenSections?.briefs),
  };
}

function buildPreviewBlockingReason(row: any, llmStages: any[], qualityReports: any[]) {
  const explicitReason = String(row?.publication_reason || row?.publication_reason_code || '').trim();
  if (explicitReason) return explicitReason;
  const failedStage = qualityReports.find((report: any) => report?.status === 'failed');
  if (failedStage?.summary_text) return String(failedStage.summary_text);
  const fallbackStage = llmStages.find((stage: any) => stage?.usedFallback && stage?.fallbackReason);
  return fallbackStage?.fallbackReason ? String(fallbackStage.fallbackReason) : null;
}

function shapeV3Preview(row: any, qualityReports: any[], jobRuns: any[]) {
  if (!row) return null;
  const packet = safeJsonParse(row.packet_json, null);
  const draftMetadata = extractDraftMetadata(row);
  const content = safeJsonParse(row.content_json, null);
  const llmStages = extractCombinedLlmStages(packet, draftMetadata);
  return {
    editionDate: row.edition_date,
    sourceKind: 'v3_packet_preview',
    pipelineVersion: row.pipeline_version || OIKO_V3_PIPELINE_VERSION,
    status: row.status,
    visibility: row.visibility,
    qualityState: row.quality_state,
    publicationReasonCode: row.publication_reason_code || null,
    publicationReason: row.publication_reason || null,
    updatedAt: row.updated_at || null,
    contentPresent: Boolean(content),
    editorialPlan: packet?.editorialPlan || null,
    llmStages,
    draftMetadata,
    sectionLayout: buildSectionLayout(packet),
    blockingReason: buildPreviewBlockingReason(row, llmStages, qualityReports),
    content,
    packet,
    qualityReports: qualityReports.map((report: any) => ({
      stage: report.stage,
      status: report.status,
      summaryText: report.summary_text,
      metrics: safeJsonParse(report.metrics_json, null),
      issues: safeJsonParse(report.issues_json, []),
    })),
    jobRuns: jobRuns.map((run: any) => ({
      id: run.id,
      jobDate: run.job_date,
      step: run.step,
      status: run.status,
      lockKey: run.lock_key,
      startedAt: run.started_at,
      finishedAt: run.finished_at,
      meta: safeJsonParse(run.meta_json, null),
    })),
  };
}
function shapeArchiveEntryFromLegacy(row: any) {
  const content = safeJsonParse(row.content_json, null);
  return {
    editionDate: row.edition_date,
    slug: row.slug,
    status: row.status,
    contentVersion: row.content_version || 'v1',
    editorialAngle: row.editorial_angle,
    marketRegime: row.market_regime,
    evidenceCoverageScore: row.evidence_coverage_score,
    intro: row.archive_teaser || buildArchiveTeaser(content, row.editorial_angle),
    emailSubject: content?.email_subject || '',
    summary: extractEditionSummary(content),
    sourceKind: 'legacy_edition',
    pipelineVersion: 'legacy',
  };
}

function shapeArchiveEntryFromV3(row: any) {
  const packet = safeJsonParse(row.packet_json, null);
  const content = safeJsonParse(row.content_json, null);
  const evidence = safeJsonParse(row.evidence_json, null);
  const marketContext = safeJsonParse(row.market_context_json, {});
  return {
    editionDate: row.edition_date,
    slug: buildEditionSlug(row.edition_date),
    status: row.status,
    contentVersion: content?.content_version || 'v2.1',
    editorialAngle: extractV3EditorialAngle(packet, content),
    marketRegime: marketContext?.marketRegime || '',
    evidenceCoverageScore: buildEvidenceCoverageScore(evidence),
    intro: row.archive_teaser || buildArchiveTeaser(content, extractV3EditorialAngle(packet, content)),
    emailSubject: content?.email_subject || '',
    summary: extractEditionSummary(content),
    sourceKind: 'v3_packet',
    pipelineVersion: row.pipeline_version || 'oiko:v3',
  };
}

function choosePreferredPublicRow(v3Row: any, legacyRow: any) {
  if (v3Row && !legacyRow) return { source: 'v3' as const, row: v3Row };
  if (!v3Row && legacyRow) return { source: 'legacy' as const, row: legacyRow };
  if (!v3Row && !legacyRow) return null;
  if (String(v3Row.edition_date) >= String(legacyRow.edition_date)) {
    return { source: 'v3' as const, row: v3Row };
  }
  return { source: 'legacy' as const, row: legacyRow };
}

function shapePreferredEdition(choice: { source: 'v3' | 'legacy'; row: any } | null) {
  if (!choice) return null;
  return choice.source === 'v3' ? shapeV3Edition(choice.row) : shapeLegacyEdition(choice.row);
}

function loadPreferredPublicEditionBySlug(slug: string, maxEditionDate: string) {
  const editionDate = extractEditionDateFromSlug(slug);
  const v3Row = editionDate && editionDate <= maxEditionDate
    ? oikoQueries.v3.editorialPackets.getPublicByEditionDate.get(editionDate)
    : null;
  if (v3Row) return { source: 'v3' as const, row: v3Row };
  const legacyRow = oikoQueries.editions.getPublicBySlug.get(slug, maxEditionDate);
  return legacyRow ? { source: 'legacy' as const, row: legacyRow } : null;
}

router.get('/oiko-news/latest', (_req, res) => {
  const maxEditionDate = getTodayInTimeZone();
  const latest = choosePreferredPublicRow(
    oikoQueries.v3.editorialPackets.getLatestPublic.get(maxEditionDate),
    oikoQueries.editions.getLatestPublic.get(maxEditionDate),
  );
  if (!latest) {
    return res.status(404).json({ error: 'No Oiko edition available yet' });
  }
  res.json({ edition: shapePreferredEdition(latest) });
});

router.get('/oiko-news/archive', (req, res) => {
  const maxEditionDate = getTodayInTimeZone();
  const page = Math.max(1, Number(req.query.page || 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize || 10)));
  const fetchCount = Math.max(pageSize * page, pageSize + 5);
  const v3Rows = oikoQueries.v3.editorialPackets.getArchivePublic.all(maxEditionDate, fetchCount, 0) as any[];
  const legacyRows = oikoQueries.editions.getArchivePublic.all(maxEditionDate, fetchCount, 0) as any[];
  const merged = new Map<string, { source: 'v3' | 'legacy'; row: any }>();

  v3Rows.forEach((row) => {
    merged.set(String(row.edition_date), { source: 'v3', row });
  });
  legacyRows.forEach((row) => {
    const key = String(row.edition_date);
    if (!merged.has(key)) {
      merged.set(key, { source: 'legacy', row });
    }
  });

  const editions = Array.from(merged.values())
    .sort((left, right) => String(right.row.edition_date).localeCompare(String(left.row.edition_date)))
    .slice((page - 1) * pageSize, page * pageSize)
    .map((entry) => entry.source === 'v3' ? shapeArchiveEntryFromV3(entry.row) : shapeArchiveEntryFromLegacy(entry.row));

  res.json({
    page,
    pageSize,
    editions,
  });
});

function isLocalDevPreviewRequest(req: Request) {
  if (process.env.NODE_ENV !== 'production') return true;
  const host = String(req.hostname || '').toLowerCase();
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

router.get('/oiko-news/dev/v3/:editionDate', (req, res) => {
  if (!isLocalDevPreviewRequest(req)) {
    return res.status(404).json({ error: 'Preview not available' });
  }

  const editionDate = String(req.params.editionDate || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(editionDate)) {
    return res.status(400).json({ error: 'Invalid edition date' });
  }

  const row = oikoQueries.v3.editorialPackets.getByEdition.get(editionDate, OIKO_V3_PIPELINE_VERSION);
  if (!row) {
    return res.status(404).json({ error: 'V3 packet not found' });
  }

  const qualityReports = oikoQueries.v3.qualityReports.listByEdition.all(editionDate, OIKO_V3_PIPELINE_VERSION) as any[];
  const jobRuns = oikoQueries.jobRuns.listByDate.all(editionDate) as any[];
  return res.json({ preview: shapeV3Preview(row, qualityReports, jobRuns) });
});
router.get('/oiko-news/:slug/email-html', (req, res) => {
  const row = loadPreferredPublicEditionBySlug(req.params.slug, getTodayInTimeZone());
  if (!row?.row?.html) {
    return res.status(404).json({ error: 'Email preview not found' });
  }

  res.set('Cache-Control', 'no-store');
  res.type('html').send(row.row.html);
});

router.get('/oiko-news/:slug', (req, res) => {
  const row = loadPreferredPublicEditionBySlug(req.params.slug, getTodayInTimeZone());
  if (!row) {
    return res.status(404).json({ error: 'Edition not found' });
  }

  res.json({ edition: shapePreferredEdition(row) });
});

export const __testables = {
  buildEditionSlug,
  buildLegacyGenerationMeta,
  extractEditionDateFromSlug,
  choosePreferredPublicRow,
  shapeV3Edition,
  shapeV3Preview,
};

router.get('/oiko-news/subscription/me', requireAuth, (req: OikoRequest, res: Response) => {
  const email = normalizeEmail(req.user?.email);
  if (!email) {
    return res.status(400).json({ error: 'Authenticated user has no email address' });
  }

  const row = oikoQueries.subscriptions.getByEmail.get(email);
  res.json({
    subscription: row
      ? {
          subscribed: row.status === 'active',
          status: row.status,
          consentSource: row.consent_source,
          subscribedAt: row.subscribed_at,
          email: row.email_original,
        }
      : {
          subscribed: false,
          status: 'inactive',
          consentSource: null,
          subscribedAt: null,
          email: req.user?.email || null,
        },
  });
});

router.put('/oiko-news/subscription/me', requireAuth, (req: OikoRequest, res: Response) => {
  const email = normalizeEmail(req.user?.email);
  if (!email) {
    return res.status(400).json({ error: 'Authenticated user has no email address' });
  }

  const subscribed = Boolean(req.body?.subscribed);
  const consentSource = String(req.body?.consentSource || 'page').slice(0, 60);
  const subscriptionSeed = {
    id: oikoQueries.subscriptions.getByEmail.get(email)?.id || 0,
    email_normalized: email,
  };

  oikoQueries.subscriptions.upsert.run(
    req.user?.uid || null,
    req.user?.email,
    email,
    subscribed ? 'active' : 'unsubscribed',
    consentSource,
    subscribed ? null : new Date().toISOString(),
    buildStoredUnsubscribeHash(subscriptionSeed),
  );

  const stored = oikoQueries.subscriptions.getByEmail.get(email);
  if (stored && stored.unsubscribe_token_hash !== buildStoredUnsubscribeHash(stored)) {
    oikoQueries.subscriptions.upsert.run(
      req.user?.uid || null,
      req.user?.email,
      email,
      subscribed ? 'active' : 'unsubscribed',
      consentSource,
      subscribed ? null : new Date().toISOString(),
      buildStoredUnsubscribeHash(stored),
    );
  }

  const row = oikoQueries.subscriptions.getByEmail.get(email);
  res.json({
    subscription: {
      subscribed: row.status === 'active',
      status: row.status,
      consentSource: row.consent_source,
      subscribedAt: row.subscribed_at,
      email: row.email_original,
      unsubscribeTokenPreview: buildUnsubscribeToken(row),
    },
  });
});

router.post('/oiko-news/unsubscribe', (req, res) => {
  const token = String(req.body?.token || '').trim();
  if (!token) {
    return res.status(400).json({ error: 'token is required' });
  }

  const row = oikoQueries.subscriptions.getByUnsubscribeHash.get(hashUnsubscribeToken(token));
  if (!row) {
    return res.status(404).json({ error: 'Unknown unsubscribe token' });
  }

  oikoQueries.subscriptions.updateStatusById.run('unsubscribed', new Date().toISOString(), row.id);
  res.json({ success: true });
});

export default router;
