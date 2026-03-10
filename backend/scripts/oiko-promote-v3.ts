import db, { initializeDatabase } from '../db/database.js';
import { oikoQueries } from '../oiko/queries.ts';
import { getEditionWindow, safeJsonParse } from '../oiko/utils.ts';

type PromoteArgs = {
  date?: string;
};

function parseArgs(argv: string[]): PromoteArgs {
  const args: PromoteArgs = { date: undefined };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--date') {
      args.date = argv[index + 1];
      index += 1;
    }
  }

  return args;
}

function compactText(value: unknown, maxLength = 190) {
  const clean = String(value || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trim()}…`;
}

function buildArchiveTeaser(content: any, editorialAngle: string) {
  const leadTitle = compactText(content?.lead_story?.title || editorialAngle, 140);
  const labels = Array.isArray(content?.opening_brief?.items)
    ? content.opening_brief.items
        .map((item: any) => compactText(item?.label, 30))
        .filter(Boolean)
        .slice(0, 3)
    : [];

  if (leadTitle && labels.length) {
    return compactText(`${leadTitle}. Repères du matin : ${labels.join(', ')}.`, 190);
  }
  if (leadTitle) return leadTitle;
  return 'Résumé disponible dans l’édition complète.';
}

const upsertPromotedEdition = db.prepare(`
  INSERT INTO oiko_news_editions (
    edition_date,
    slug,
    window_start,
    window_end,
    status,
    editorial_angle,
    market_regime,
    evidence_coverage_score,
    provider_attempts_json,
    validation_errors_json,
    content_json,
    html,
    text,
    chart_manifest_json,
    llm_provider,
    llm_model,
    content_version,
    is_audit,
    origin,
    visibility,
    quality_state,
    archive_teaser,
    publication_reason,
    publication_reason_code,
    updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(edition_date) DO UPDATE SET
    slug = excluded.slug,
    window_start = excluded.window_start,
    window_end = excluded.window_end,
    status = excluded.status,
    editorial_angle = excluded.editorial_angle,
    market_regime = excluded.market_regime,
    evidence_coverage_score = excluded.evidence_coverage_score,
    provider_attempts_json = excluded.provider_attempts_json,
    validation_errors_json = excluded.validation_errors_json,
    content_json = excluded.content_json,
    html = excluded.html,
    text = excluded.text,
    chart_manifest_json = excluded.chart_manifest_json,
    llm_provider = excluded.llm_provider,
    llm_model = excluded.llm_model,
    content_version = excluded.content_version,
    is_audit = excluded.is_audit,
    origin = excluded.origin,
    visibility = excluded.visibility,
    quality_state = excluded.quality_state,
    archive_teaser = excluded.archive_teaser,
    publication_reason = excluded.publication_reason,
    publication_reason_code = excluded.publication_reason_code,
    updated_at = CURRENT_TIMESTAMP
`);

const getLatestReadyPacket = db.prepare(`
  SELECT *
  FROM oiko_news_editorial_packets
  WHERE pipeline_version = 'v3'
    AND status = 'ready'
    AND quality_state = 'passed'
  ORDER BY edition_date DESC, id DESC
  LIMIT 1
`);

const getPacketByDate = db.prepare(`
  SELECT *
  FROM oiko_news_editorial_packets
  WHERE edition_date = ?
    AND pipeline_version = 'v3'
  LIMIT 1
`);

const getLatestQualityReport = db.prepare(`
  SELECT *
  FROM oiko_news_quality_reports
  WHERE edition_date = ?
    AND pipeline_version = 'v3'
  ORDER BY id DESC
  LIMIT 1
`);

const updatePacketVisibility = db.prepare(`
  UPDATE oiko_news_editorial_packets
  SET visibility = 'public',
      quality_state = 'passed',
      archive_teaser = ?,
      publication_reason = ?,
      publication_reason_code = ?,
      updated_at = CURRENT_TIMESTAMP
  WHERE edition_date = ?
    AND pipeline_version = 'v3'
`);

async function main() {
  initializeDatabase();
  const { date } = parseArgs(process.argv.slice(2));
  const packet = date ? getPacketByDate.get(date) : getLatestReadyPacket.get();

  if (!packet) {
    throw new Error(
      date
        ? `No V3 editorial packet found for ${date}.`
        : 'No ready V3 editorial packet available to promote.',
    );
  }

  if (packet.status !== 'ready' || packet.quality_state !== 'passed') {
    throw new Error(`Packet ${packet.edition_date} is not publishable (status=${packet.status}, quality=${packet.quality_state}).`);
  }

  const editionDate = String(packet.edition_date);
  const existingEdition = oikoQueries.editions.getByDate.get(editionDate);
  const qualityReport = getLatestQualityReport.get(editionDate);
  const content = safeJsonParse(packet.content_json, null);
  const assetManifest = safeJsonParse(packet.asset_manifest_json, {});
  const marketContext = safeJsonParse(packet.market_context_json, {});
  const draftMeta = safeJsonParse(packet.draft_json, {});
  const metrics = safeJsonParse(qualityReport?.metrics_json, {});

  if (!content) {
    throw new Error(`Packet ${editionDate} has no content_json.`);
  }
  if (!packet.html || !packet.text) {
    throw new Error(`Packet ${editionDate} is missing rendered html/text.`);
  }

  const window = existingEdition
    ? { startIso: existingEdition.window_start, endIso: existingEdition.window_end }
    : getEditionWindow(editionDate);
  const slug = existingEdition?.slug || `oiko-news-${editionDate}`;
  const editorialAngle = String(content?.lead_story?.title || existingEdition?.editorial_angle || 'Oiko News').trim();
  const marketRegime = String(marketContext?.marketRegime || existingEdition?.market_regime || 'mixed').trim();
  const supportedSentenceRatio = Number(metrics?.supported_sentence_ratio ?? 0);
  const evidenceCoverageScore = Number(
    (supportedSentenceRatio > 0 ? supportedSentenceRatio * 100 : Number(existingEdition?.evidence_coverage_score || 0)).toFixed(2),
  );
  const archiveTeaser = buildArchiveTeaser(content, editorialAngle);
  const publicationReason = `Promotion manuelle vers le site public d'une édition V3 validée le ${new Date().toISOString()}.`;
  const publicationReasonCode = 'manual_v3_public_promotion';
  const chartManifest = Array.isArray(assetManifest?.chartManifest) ? assetManifest.chartManifest : [];
  const assets = Array.isArray(assetManifest?.assets) ? assetManifest.assets : [];
  const providerAttempts = JSON.stringify([
    {
      provider: 'manual-promotion',
      model: 'v3-ready-packet',
      label: 'manual-public-promotion',
      sourcePipeline: 'v3',
      sourceVisibility: packet.visibility,
    },
  ]);

  upsertPromotedEdition.run(
    editionDate,
    slug,
    window.startIso,
    window.endIso,
    'ready',
    editorialAngle,
    marketRegime,
    evidenceCoverageScore,
    providerAttempts,
    '[]',
    JSON.stringify(content),
    packet.html,
    packet.text,
    JSON.stringify(chartManifest),
    draftMeta?.writer || existingEdition?.llm_provider || null,
    draftMeta?.model || existingEdition?.llm_model || null,
    String(content?.content_version || 'v2.1'),
    0,
    'live',
    'public',
    'passed',
    archiveTeaser,
    publicationReason,
    publicationReasonCode,
  );

  const promotedEdition = oikoQueries.editions.getByDate.get(editionDate);
  if (!promotedEdition) {
    throw new Error(`Failed to load promoted edition for ${editionDate}.`);
  }

  oikoQueries.assets.clearByEditionId.run(promotedEdition.id);
  for (const asset of assets) {
    oikoQueries.assets.insert.run(
      promotedEdition.id,
      asset.section_key,
      asset.asset_type,
      asset.provider || 'unknown',
      asset.source_url || null,
      asset.stored_url,
      asset.author || null,
      asset.license || null,
      asset.credit_line || null,
      asset.alt_text || editorialAngle,
      typeof asset.width === 'number' ? asset.width : null,
      typeof asset.height === 'number' ? asset.height : null,
      typeof asset.score === 'number' ? asset.score : 0,
      asset.fetched_at || new Date().toISOString(),
    );
  }

  updatePacketVisibility.run(
    archiveTeaser,
    publicationReason,
    publicationReasonCode,
    editionDate,
  );

  console.log(
    JSON.stringify(
      {
        editionDate,
        slug,
        status: 'ready',
        visibility: 'public',
        leadTitle: editorialAngle,
        chartCount: chartManifest.length,
        assetCount: assets.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error('Oiko V3 promotion failed:', error);
  process.exit(1);
});
