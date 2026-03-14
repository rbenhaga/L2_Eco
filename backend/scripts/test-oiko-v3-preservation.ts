import assert from 'node:assert/strict';

import db from '../db/database.js';
import { __testables } from '../oiko/v3/pipeline.ts';

const editionDate = '2099-01-09';
const packetContentJson = JSON.stringify({
  content_version: 'v2.1',
  preview_text: 'Packet public intact',
  intro: { paragraphs: [{ parts: [{ text: 'Packet public intact.' }] }] },
});
const publicEditionContentJson = JSON.stringify({
  content_version: 'v2.1',
  preview_text: 'Edition publique intacte',
  intro: { paragraphs: [{ parts: [{ text: 'Edition publique intacte.' }] }] },
});

const upsertPacket = db.prepare(`
  INSERT INTO oiko_news_editorial_packets (
    edition_date,
    pipeline_version,
    status,
    visibility,
    quality_state,
    packet_json,
    draft_json,
    evidence_json,
    content_json,
    market_context_json,
    asset_manifest_json,
    html,
    text,
    archive_teaser,
    publication_reason,
    publication_reason_code,
    updated_at
  ) VALUES (?, 'v3', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(edition_date, pipeline_version) DO UPDATE SET
    status = excluded.status,
    visibility = excluded.visibility,
    quality_state = excluded.quality_state,
    packet_json = excluded.packet_json,
    draft_json = excluded.draft_json,
    evidence_json = excluded.evidence_json,
    content_json = excluded.content_json,
    market_context_json = excluded.market_context_json,
    asset_manifest_json = excluded.asset_manifest_json,
    html = excluded.html,
    text = excluded.text,
    archive_teaser = excluded.archive_teaser,
    publication_reason = excluded.publication_reason,
    publication_reason_code = excluded.publication_reason_code,
    updated_at = CURRENT_TIMESTAMP
`);

const upsertEdition = db.prepare(`
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

const readPacket = db.prepare(`
  SELECT status, visibility, quality_state, content_json, publication_reason_code
  FROM oiko_news_editorial_packets
  WHERE edition_date = ? AND pipeline_version = 'v3'
`);

const readEdition = db.prepare(`
  SELECT status, visibility, quality_state, content_json, publication_reason_code
  FROM oiko_news_editions
  WHERE edition_date = ?
`);

upsertPacket.run(
  editionDate,
  'ready',
  'public',
  'passed',
  JSON.stringify({ editionDate, marketContext: {}, chosenSections: {}, microBriefCandidates: [] }),
  JSON.stringify({ writer: 'fixture', model: 'fixture' }),
  JSON.stringify({}),
  packetContentJson,
  JSON.stringify({ generatedAt: '2099-01-09T06:00:00Z' }),
  JSON.stringify({ assets: [], chartManifest: [] }),
  '<p>packet public intact</p>',
  'packet public intact',
  'Packet public intact',
  'Fixture packet public',
  'manual_v3_public_promotion',
);

upsertEdition.run(
  editionDate,
  `oiko-news-${editionDate}`,
  `${editionDate}T05:00:00.000Z`,
  `${editionDate}T09:00:00.000Z`,
  'ready',
  'Edition publique intacte',
  'mixed',
  95,
  '[]',
  '[]',
  publicEditionContentJson,
  '<p>edition publique intacte</p>',
  'edition publique intacte',
  '[]',
  'fixture',
  'fixture',
  'v2.1',
  0,
  'live',
  'public',
  'passed',
  'Edition publique intacte',
  'Fixture edition publique',
  'manual_v3_public_promotion',
);

const packetBefore = readPacket.get(editionDate);
const editionBefore = readEdition.get(editionDate);
assert.ok(packetBefore, 'fixture packet should exist before blocked rerun');
assert.ok(editionBefore, 'fixture public edition should exist before blocked rerun');

const publication = __testables.persistBlockedPacket(
  editionDate,
  { marketContext: {} } as any,
  [],
  {
    status: 'blocked_insufficient_fresh_material',
    reasonCode: 'insufficient_fresh_material',
    reason: 'Fixture blocked rerun for preservation checks.',
  },
);

const packetAfter = readPacket.get(editionDate);
const editionAfter = readEdition.get(editionDate);

assert.equal(publication.preservedExistingPacket, true);
assert.equal(packetAfter?.status, 'ready');
assert.equal(packetAfter?.visibility, 'public');
assert.equal(packetAfter?.quality_state, 'passed');
assert.equal(packetAfter?.content_json, packetBefore.content_json);
assert.notEqual(packetAfter?.content_json, null);
assert.equal(packetAfter?.publication_reason_code, packetBefore.publication_reason_code);
assert.deepEqual(editionAfter, editionBefore);

db.close();
console.log('Oiko V3 preservation fixture checks passed');
