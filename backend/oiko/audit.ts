import fs from 'fs';
import path from 'path';
import db from '../db/database.js';
import OIKO_CONFIG, { NYSE_HOLIDAYS } from './config.ts';
import { OIKO_FIXTURE_MODES, type OikoFixtureMode } from './fixtures.ts';
import { OikoEditionSchema } from './generate.ts';
import { getEditionPreview, getRunsByDate, runPipeline } from './pipeline.ts';
import {
  addDays,
  buildStoredUnsubscribeHash,
  ensureDir,
  normalizeEmail,
  writeJsonFile,
} from './utils.ts';
import { oikoQueries } from './queries.ts';

type AuditAssertion = {
  key: string;
  pass: boolean;
  details: string;
};

type AuditScenario = {
  name: string;
  editionDate: string;
  fixtureMode: OikoFixtureMode;
  forceFallback: boolean;
};

function isWeekendOrHoliday(editionDate: string) {
  const date = new Date(`${editionDate}T12:00:00Z`);
  const day = date.getUTCDay();
  return day === 0 || day === 6 || NYSE_HOLIDAYS.has(editionDate);
}

function ensureWeekdayDate(editionDate: string) {
  let cursor = editionDate;
  while (isWeekendOrHoliday(cursor)) {
    cursor = addDays(cursor, -1);
  }
  return cursor;
}

function nextWeekendDate(editionDate: string) {
  let cursor = editionDate;
  while (!isWeekendOrHoliday(cursor)) {
    cursor = addDays(cursor, 1);
  }
  return cursor;
}

function assertion(key: string, pass: boolean, details: string): AuditAssertion {
  return { key, pass, details };
}

const deleteSendLogsByEditionDate = db.prepare(`
  DELETE FROM oiko_news_send_logs
  WHERE edition_id IN (SELECT id FROM oiko_news_editions WHERE edition_date = ?)
`);
const deleteJobRunsByDate = db.prepare(`DELETE FROM oiko_news_job_runs WHERE job_date = ?`);
const deleteItemsByEditionDate = db.prepare(`DELETE FROM oiko_news_items WHERE edition_date = ?`);
const deleteEditionByDate = db.prepare(`DELETE FROM oiko_news_editions WHERE edition_date = ?`);
const deleteAssetsByEditionDate = db.prepare(`
  DELETE FROM oiko_news_assets
  WHERE edition_id IN (SELECT id FROM oiko_news_editions WHERE edition_date = ?)
`);
const deleteSubscriptionByEmail = db.prepare(`DELETE FROM oiko_news_subscriptions WHERE email_normalized = ?`);
const listSendLogsByEdition = db.prepare(`SELECT * FROM oiko_news_send_logs WHERE edition_id = ? ORDER BY id ASC`);

const resetAuditState = db.transaction((editionDate: string, emailNormalized: string) => {
  deleteSendLogsByEditionDate.run(editionDate);
  deleteAssetsByEditionDate.run(editionDate);
  deleteJobRunsByDate.run(editionDate);
  deleteItemsByEditionDate.run(editionDate);
  deleteEditionByDate.run(editionDate);
  deleteSubscriptionByEmail.run(emailNormalized);
});

function seedAuditSubscription(emailOriginal = 'audit.oiko@example.com') {
  const emailNormalized = normalizeEmail(emailOriginal);
  const existing = oikoQueries.subscriptions.getByEmail.get(emailNormalized);
  const seed = {
    id: existing?.id || 0,
    email_normalized: emailNormalized,
  };

  oikoQueries.subscriptions.upsert.run(
    'oiko-audit-user',
    emailOriginal,
    emailNormalized,
    'active',
    'audit',
    null,
    buildStoredUnsubscribeHash(seed),
  );

  const stored = oikoQueries.subscriptions.getByEmail.get(emailNormalized);
  if (stored && stored.unsubscribe_token_hash !== buildStoredUnsubscribeHash(stored)) {
    oikoQueries.subscriptions.upsert.run(
      'oiko-audit-user',
      emailOriginal,
      emailNormalized,
      'active',
      'audit',
      null,
      buildStoredUnsubscribeHash(stored),
    );
  }

  return oikoQueries.subscriptions.getByEmail.get(emailNormalized);
}

function hasExpectedHtmlSrc(html: string) {
  const publicBaseIsLocal = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(OIKO_CONFIG.publicBaseUrl || '');
  return publicBaseIsLocal
    ? !/src="\//i.test(html)
    : !/(localhost|127\.0\.0\.1|0\.0\.0\.0|src="\/)/i.test(html);
}

function buildAuditAssertions({
  scenario,
  preview,
  runs,
  secondCompose,
  secondSend,
  sendLogs,
}: {
  scenario: AuditScenario;
  preview: any;
  runs: any[];
  secondCompose: any;
  secondSend: any;
  sendLogs: any[];
}) {
  const assertions: AuditAssertion[] = [];
  const content = preview?.content_json;
  const schemaResult = content ? OikoEditionSchema.safeParse(content) : { success: false };
  const weekendScenario = isWeekendOrHoliday(scenario.editionDate);
  const assetTypes = new Set((preview?.assets || []).map((asset: any) => asset.asset_type));
  const srcMatches = (preview?.html || '').match(/src="([^"]+)"/g) || [];
  const hasAuditRecipient = sendLogs.some((log: any) => log.email === 'audit.oiko@example.com');
  const uniqueSubscriptionLogs = new Set(sendLogs.map((log: any) => log.subscription_id)).size === sendLogs.length;

  assertions.push(assertion('edition_exists', Boolean(preview), preview ? 'Prévisualisation disponible.' : 'Aucune édition trouvée.'));
  assertions.push(assertion('content_version_v21', preview?.content_version === 'v2.1', `content_version=${preview?.content_version || 'missing'}`));
  assertions.push(assertion('content_schema_valid', schemaResult.success, schemaResult.success ? 'Le JSON V2.1 valide le schéma Zod.' : 'Le JSON V2.1 ne valide pas le schéma.'));
  assertions.push(assertion('opening_brief_count', (content?.opening_brief?.items?.length || 0) >= 3 && (content?.opening_brief?.items?.length || 0) <= 5, `opening_brief=${content?.opening_brief?.items?.length || 0}`));
  assertions.push(assertion('radar_count', (content?.radar_section?.items?.length || 0) >= 2 && (content?.radar_section?.items?.length || 0) <= 4, `radar=${content?.radar_section?.items?.length || 0}`));
  assertions.push(assertion('carnet_count', (content?.carnet_section?.items?.length || 0) >= 2 && (content?.carnet_section?.items?.length || 0) <= 3, `carnet=${content?.carnet_section?.items?.length || 0}`));
  assertions.push(assertion('briefs_count', (content?.briefs_section?.items?.length || 0) >= 2 && (content?.briefs_section?.items?.length || 0) <= 5, `briefs=${content?.briefs_section?.items?.length || 0}`));
  assertions.push(assertion('chart_count_exactly_2', (preview?.chart_manifest_json || []).length === 2, `charts=${(preview?.chart_manifest_json || []).length || 0}`));
  assertions.push(assertion('has_header_image', assetTypes.has('header'), `asset_types=${Array.from(assetTypes).join(',')}`));
  assertions.push(assertion('has_lead_image', assetTypes.has('lead_image'), `asset_types=${Array.from(assetTypes).join(',')}`));
  assertions.push(assertion('has_radar_image', assetTypes.has('radar_image'), `asset_types=${Array.from(assetTypes).join(',')}`));
  assertions.push(assertion('has_carnet_image', assetTypes.has('carnet_image'), `asset_types=${Array.from(assetTypes).join(',')}`));
  assertions.push(assertion('render_non_empty', Boolean((preview?.html || '').length > 1200 && (preview?.text || '').length > 600), `html=${(preview?.html || '').length || 0}, text=${(preview?.text || '').length || 0}`));
  assertions.push(assertion('email_preheader_present', Boolean((preview?.html || '').includes('display:none') && (preview?.html || '').includes(content?.preview_text || '')), 'Préheader caché présent.'));
  assertions.push(assertion('email_container_600px', Boolean((preview?.html || '').includes('width="600"') || (preview?.html || '').includes('width:600px')), 'Conteneur principal 600px présent.'));
  assertions.push(assertion('html_src_public', hasExpectedHtmlSrc(preview?.html || ''), `src_count=${srcMatches.length}`));
  assertions.push(assertion('job_runs_success', ['collect', 'compose', 'send'].every((step) => runs.some((run) => run.step === step && run.status === 'success')), 'Les trois étapes principales ont été exécutées avec succès.'));
  assertions.push(assertion('compose_rerun_skips', Boolean(secondCompose?.results?.compose?.skipped), 'Un deuxième compose sur la même date est ignoré grâce au verrou de job.'));
  assertions.push(assertion('send_rerun_skips', Boolean(secondSend?.results?.send?.skipped), 'Un deuxième send sur la même date est ignoré grâce au verrou de job.'));
  assertions.push(assertion('dry_run_log_has_audit_recipient', hasAuditRecipient, `send_logs=${sendLogs.length}`));
  assertions.push(assertion('dry_run_logs_unique_per_subscription', uniqueSubscriptionLogs, `send_logs=${sendLogs.length}`));
  assertions.push(assertion('forced_fallback_status', scenario.forceFallback ? preview?.status === 'fallback' : true, `status=${preview?.status || 'missing'}`));

  if (weekendScenario) {
    assertions.push(assertion('weekend_market_regime', preview?.market_regime === 'closed_equities', `market_regime=${preview?.market_regime || 'missing'}`));
  }

  return assertions;
}

function writeSnapshotFiles(scenario: AuditScenario, preview: any) {
  if (!preview) return null;
  const snapshotDir = path.join(OIKO_CONFIG.staticDir, 'audits', 'snapshots', scenario.editionDate);
  ensureDir(snapshotDir);
  const htmlPath = path.join(snapshotDir, `${scenario.name}.html`);
  const textPath = path.join(snapshotDir, `${scenario.name}.txt`);
  const jsonPath = path.join(snapshotDir, `${scenario.name}.json`);
  fs.writeFileSync(htmlPath, preview.html || '', 'utf8');
  fs.writeFileSync(textPath, preview.text || '', 'utf8');
  fs.writeFileSync(jsonPath, JSON.stringify(preview.content_json || {}, null, 2), 'utf8');
  return { htmlPath, textPath, jsonPath };
}

export async function runOikoAudit(scenario: AuditScenario) {
  const auditEmail = 'audit.oiko@example.com';
  const auditEmailNormalized = normalizeEmail(auditEmail);
  resetAuditState(scenario.editionDate, auditEmailNormalized);
  seedAuditSubscription(auditEmail);

  try {
    const firstRun = await runPipeline({
      editionDate: scenario.editionDate,
      step: 'all',
      dryRun: true,
      fixtureMode: scenario.fixtureMode,
      forceFallback: scenario.forceFallback,
    });

    const secondCompose = await runPipeline({
      editionDate: scenario.editionDate,
      step: 'compose',
      dryRun: true,
      fixtureMode: scenario.fixtureMode,
      forceFallback: scenario.forceFallback,
    });

    const secondSend = await runPipeline({
      editionDate: scenario.editionDate,
      step: 'send',
      dryRun: true,
      fixtureMode: scenario.fixtureMode,
      forceFallback: scenario.forceFallback,
    });

    const preview = getEditionPreview(scenario.editionDate);
    const runs = getRunsByDate(scenario.editionDate);
    const sendLogs = preview ? listSendLogsByEdition.all(preview.id) : [];
    const snapshotPaths = writeSnapshotFiles(scenario, preview);
    const assertions = buildAuditAssertions({ scenario, preview, runs, secondCompose, secondSend, sendLogs });
    const passed = assertions.every((item) => item.pass);
    const report = {
      scenario,
      passed,
      summary: {
        contentVersion: preview?.content_version || null,
        marketRegime: preview?.market_regime || null,
        evidenceCoverageScore: preview?.evidence_coverage_score || 0,
        chartCount: preview?.chart_manifest_json?.length || 0,
        assetCount: preview?.assets?.length || 0,
        providerAttempts: preview?.provider_attempts_json || [],
        validationErrors: preview?.validation_errors_json || [],
        firstRun,
      },
      assertions,
      preview: preview
        ? {
            id: preview.id,
            editionDate: preview.edition_date,
            slug: preview.slug,
            status: preview.status,
            htmlLength: (preview.html || '').length,
            textLength: (preview.text || '').length,
            chartManifest: preview.chart_manifest_json,
            assets: preview.assets,
            snapshotPaths,
          }
        : null,
      runs,
      sendLogs,
      generatedAt: new Date().toISOString(),
    };

    const reportPath = path.join(OIKO_CONFIG.staticDir, 'audits', `${scenario.editionDate}-${scenario.fixtureMode}.json`);
    writeJsonFile(reportPath, report);

    return {
      ...report,
      reportPath,
    };
  } finally {
    resetAuditState(scenario.editionDate, auditEmailNormalized);
  }
}

export async function runOikoAuditSuite(baseEditionDate: string) {
  const weekdayDate = ensureWeekdayDate(baseEditionDate);
  const weekendDate = nextWeekendDate(baseEditionDate);
  const lowEvidenceDate = ensureWeekdayDate(addDays(weekdayDate, -1));

  const scenarios: AuditScenario[] = [
    { name: 'baseline-weekday', editionDate: weekdayDate, fixtureMode: 'baseline', forceFallback: true },
    { name: 'baseline-weekend', editionDate: weekendDate, fixtureMode: 'baseline', forceFallback: true },
    { name: 'low-evidence', editionDate: lowEvidenceDate, fixtureMode: 'low-evidence', forceFallback: true },
  ];

  const reports = [];
  for (const scenario of scenarios) {
    reports.push(await runOikoAudit(scenario));
  }

  const overallPassed = reports.every((report) => report.passed);
  const suiteReport = {
    baseEditionDate,
    overallPassed,
    scenarios: reports.map((report) => ({
      name: report.scenario.name,
      editionDate: report.scenario.editionDate,
      fixtureMode: report.scenario.fixtureMode,
      passed: report.passed,
      failedAssertions: report.assertions.filter((item) => !item.pass),
      reportPath: report.reportPath,
    })),
    generatedAt: new Date().toISOString(),
  };

  const suitePath = path.join(OIKO_CONFIG.staticDir, 'audits', `suite-${baseEditionDate}.json`);
  writeJsonFile(suitePath, suiteReport);

  return {
    ...suiteReport,
    reportPath: suitePath,
  };
}

export default {
  runOikoAudit,
  runOikoAuditSuite,
  OIKO_FIXTURE_MODES,
};
