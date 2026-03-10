import { composeEditionDraft, buildGenerationContext } from './generate.ts';
import { buildFixtureCollection, type OikoFixtureMode } from './fixtures.ts';
import { OIKO_V3_POLICY } from './policy/v3.ts';
import { oikoQueries } from './queries.ts';
import { renderEditionBundle } from './render.ts';
import { sendEdition } from './send.ts';
import { collectSourceItems, fetchMarketSnapshot, parseStoredItem, serializeItem } from './sources.ts';
import { getEditionWindow, parseJsonArray, safeJsonParse, slugify } from './utils.ts';
import { getV3Preview, runV3ShadowPipeline } from './v3/pipeline.ts';

type PipelineRuntimeOptions = {
  fixtureMode?: OikoFixtureMode;
  forceFallback?: boolean;
  isAudit?: boolean;
};

type RunPipelineOptions = PipelineRuntimeOptions & {
  editionDate?: string;
  step?: string;
  dryRun?: boolean;
};

function getEditionRowOrThrow(editionDate: string) {
  const edition = oikoQueries.editions.getByDate.get(editionDate);
  if (!edition) {
    throw new Error(`Edition not found for ${editionDate}`);
  }
  return edition;
}

function withJobRun(jobDate: string, step: string, scope: 'live' | 'audit', fn: () => any) {
  const lockKey = `${jobDate}:${step}:${scope}`;
  const existing = oikoQueries.jobRuns.getByLockKey.get(lockKey);
  if (existing?.status === 'success') {
    return { skipped: true, step, jobDate, meta: safeJsonParse(existing.meta_json, {}) };
  }
  if (existing?.status === 'started') {
    return { skipped: true, step, jobDate, reason: 'already_running', meta: safeJsonParse(existing.meta_json, {}) };
  }

  if (!existing) {
    try {
      oikoQueries.jobRuns.create.run(jobDate, step, 'started', lockKey, JSON.stringify({}));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('oiko_news_job_runs.lock_key')) {
        return { skipped: true, step, jobDate, reason: 'already_running', meta: {} };
      }
      throw error;
    }
  }

  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      return result
        .then((resolved: any) => {
          oikoQueries.jobRuns.complete.run('success', JSON.stringify(resolved || {}), lockKey);
          return resolved;
        })
        .catch((error: Error) => {
          oikoQueries.jobRuns.complete.run('failed', JSON.stringify({ error: error.message }), lockKey);
          throw error;
        });
    }

    oikoQueries.jobRuns.complete.run('success', JSON.stringify(result || {}), lockKey);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    oikoQueries.jobRuns.complete.run('failed', JSON.stringify({ error: message }), lockKey);
    throw error;
  }
}

function persistCollectedItems(editionDate: string, rankedItems: any[], selection: any) {
  oikoQueries.items.clearEditionAssignments.run(editionDate);

  const topUrls = new Set(selection.topStories.map((item: any) => item.url));
  const briefUrls = new Set(selection.briefs.map((item: any) => item.url));

  for (const item of rankedItems) {
    const selectedRole = topUrls.has(item.url) ? 'top_story' : briefUrls.has(item.url) ? 'brief' : 'candidate';
    oikoQueries.items.upsert.run(
      item.source_name,
      item.source_domain,
      item.source_type,
      item.url,
      item.title,
      item.published_at,
      item.language,
      item.snippet_raw,
      item.body_raw,
      item.topic_family,
      item.dedupe_key,
      item.score,
      selectedRole,
      editionDate,
      serializeItem(item),
    );
  }
}

async function resolveCollection(editionDate: string, options: PipelineRuntimeOptions = {}) {
  if (options.fixtureMode) {
    return buildFixtureCollection(editionDate, options.fixtureMode);
  }
  return collectSourceItems(editionDate);
}

export async function collectEdition(editionDate: string, options: PipelineRuntimeOptions = {}) {
  return withJobRun(editionDate, 'collect', options.isAudit ? 'audit' : 'live', async () => {
    const collection = await resolveCollection(editionDate, options);
    const slug = `oiko-news-${slugify(editionDate)}`;

    oikoQueries.editions.upsertSkeleton.run(
      editionDate,
      slug,
      collection.window.startIso,
      collection.window.endIso,
      'draft',
      options.isAudit ? 1 : 0,
      'v2.1',
      JSON.stringify([]),
      JSON.stringify([]),
    );

    persistCollectedItems(editionDate, collection.rankedItems, collection.selection);

    return {
      itemCount: collection.rankedItems.length,
      topStories: collection.selection.topStories.length,
      briefs: collection.selection.briefs.length,
      evidenceCoverageScore: collection.evidenceCoverageScore,
      fixtureMode: options.fixtureMode || null,
      contentVersion: 'v2.1',
      isAudit: Boolean(options.isAudit),
    };
  });
}

function loadCollectedContext(editionDate: string) {
  const edition = getEditionRowOrThrow(editionDate);
  const items = oikoQueries.items.getEditionItems.all(editionDate).map(parseStoredItem);
  const topStories = items.filter((item: any) => item.selected_role === 'top_story').slice(0, 6);
  const briefs = items.filter((item: any) => item.selected_role === 'brief').slice(0, 5);

  if (topStories.length < 4) {
    throw new Error(`Not enough collected Oiko stories for ${editionDate}`);
  }

  const evidencePacks = topStories.map((story: any) => ({
    primary: story,
    corroborations: story.evidence_pack?.corroborations || [],
    officialSupport: story.evidence_pack?.official_support || null,
    coverage:
      ((story.snippet_raw?.length || 0) >= 80 ? 25 : 0)
      + ((story.evidence_pack?.corroborations || []).length >= 1 ? 25 : 0)
      + ((story.evidence_pack?.corroborations || []).length >= 2 ? 25 : 0)
      + (story.evidence_pack?.official_support || (story.body_raw?.length || 0) >= 160 ? 25 : 0),
  }));

  const evidenceCoverageScore = evidencePacks.reduce((sum: number, pack: any) => sum + pack.coverage, 0) / evidencePacks.length;
  const storedChartManifest = safeJsonParse(edition.chart_manifest_json, null);

  return {
    edition,
    window: getEditionWindow(editionDate),
    selection: {
      editorialAngle: topStories[0]?.title || 'Oiko News',
      topStories,
      briefs,
    },
    evidencePacks,
    evidenceCoverageScore: Number((evidenceCoverageScore || 0).toFixed(2)),
    storedChartManifest,
  };
}

function persistEditionAssets(editionId: number, assets: any[] = []) {
  oikoQueries.assets.clearByEditionId.run(editionId);
  for (const asset of assets) {
    oikoQueries.assets.insert.run(
      editionId,
      asset.section_key,
      asset.asset_type,
      asset.provider,
      asset.source_url || null,
      asset.stored_url,
      asset.author || null,
      asset.license || null,
      asset.credit_line || null,
      asset.alt_text,
      asset.width || null,
      asset.height || null,
      asset.score || 0,
      asset.fetched_at,
    );
  }
}

export async function composeEdition(editionDate: string, options: PipelineRuntimeOptions = {}) {
  return withJobRun(editionDate, 'compose', options.isAudit ? 'audit' : 'live', async () => {
    if (!oikoQueries.editions.getByDate.get(editionDate)) {
      await collectEdition(editionDate, options);
    }

    let loaded;
    try {
      loaded = loadCollectedContext(editionDate);
      if (!options.isAudit && loaded.edition.is_audit) {
        await collectEdition(editionDate, options);
        loaded = loadCollectedContext(editionDate);
      }
    } catch (_error) {
      await collectEdition(editionDate, options);
      loaded = loadCollectedContext(editionDate);
    }

    const fixtureCollection = options.fixtureMode ? buildFixtureCollection(editionDate, options.fixtureMode) : null;
    const marketSnapshot = fixtureCollection?.marketSnapshot || (await fetchMarketSnapshot(editionDate, loaded.window));
    const context = buildGenerationContext({
      window: loaded.window,
      selection: loaded.selection,
      evidencePacks: loaded.evidencePacks,
      evidenceCoverageScore: loaded.evidenceCoverageScore,
      marketSnapshot,
    });

    const composed = await composeEditionDraft(context, { forceFallback: options.forceFallback });
    const rendered = await renderEditionBundle({
      editionDate,
      payload: composed.payload,
      marketSnapshot,
      context,
    });

    const finalPayload = rendered.payload;
    const isAudit = options.isAudit ?? Boolean(loaded.edition.is_audit);
    oikoQueries.editions.updateComposed.run(
      composed.usedFallback ? 'fallback' : 'ready',
      isAudit ? 1 : 0,
      finalPayload.content_version,
      loaded.selection.editorialAngle,
      marketSnapshot.market_regime,
      loaded.evidenceCoverageScore,
      JSON.stringify(composed.providerAttempts || []),
      JSON.stringify(composed.validationErrors || []),
      JSON.stringify(finalPayload),
      rendered.html,
      rendered.text,
      JSON.stringify(rendered.chartManifest),
      composed.providerUsed,
      composed.modelUsed,
      editionDate,
    );

    const refreshed = getEditionRowOrThrow(editionDate);
    persistEditionAssets(refreshed.id, rendered.assets);

    return {
      editionDate,
      status: composed.usedFallback ? 'fallback' : 'ready',
      providerAttempts: composed.providerAttempts,
      validationErrors: composed.validationErrors,
      fixtureMode: options.fixtureMode || null,
      forcedFallback: Boolean(options.forceFallback),
      contentVersion: finalPayload.content_version,
      assetCount: rendered.assets.length,
      isAudit,
    };
  });
}

export async function sendEditionStep(editionDate: string, { dryRun = false }: { dryRun?: boolean } = {}) {
  return withJobRun(editionDate, 'send', 'live', async () => {
    let edition = oikoQueries.editions.getByDate.get(editionDate);
    if (!edition || !edition.content_json || !edition.html || !edition.text) {
      await composeEdition(editionDate);
      edition = getEditionRowOrThrow(editionDate);
    }

    if (edition.is_audit) {
      return {
        transporterConfigured: false,
        totalRecipients: 0,
        results: [],
        skipped: true,
        reason: 'audit_edition',
      };
    }

    const sendResult = await sendEdition(edition, { dryRun });
    if (!dryRun && sendResult.results.some((result: any) => result.status === 'sent')) {
      oikoQueries.editions.markSent.run(edition.id);
    }

    return sendResult;
  });
}

export async function runPipeline({ editionDate, step = 'all', dryRun = false, fixtureMode, forceFallback = false }: RunPipelineOptions = {}) {
  const targetDate = editionDate || getEditionWindow().editionDate;
  const results: Record<string, unknown> = {};
  const runtimeOptions: PipelineRuntimeOptions = { fixtureMode, forceFallback, isAudit: Boolean(fixtureMode) };

  if (step === 'collect' || step === 'all') {
    results.collect = await collectEdition(targetDate, runtimeOptions);
  }

  if (step === 'compose' || step === 'all') {
    results.compose = await composeEdition(targetDate, runtimeOptions);
  }

  if (step === 'v3' || ((step === 'compose' || step === 'all') && OIKO_V3_POLICY.rollout.shadowEnabled)) {
    results.v3 = await runV3ShadowPipeline(targetDate);
  }

  if (step === 'send' || step === 'all') {
    results.send = await sendEditionStep(targetDate, { dryRun });
  }

  return {
    editionDate: targetDate,
    step,
    dryRun,
    fixtureMode: fixtureMode || null,
    forceFallback,
    results,
  };
}

export function getEditionPreview(editionDate: string) {
  const edition = oikoQueries.editions.getByDate.get(editionDate);
  if (!edition) return null;
  const assets = oikoQueries.assets.listByEditionId.all(edition.id);
  return {
    ...edition,
    content_json: safeJsonParse(edition.content_json, null),
    provider_attempts_json: parseJsonArray(edition.provider_attempts_json),
    validation_errors_json: parseJsonArray(edition.validation_errors_json),
    chart_manifest_json: parseJsonArray(edition.chart_manifest_json),
    assets,
  };
}

export function getRunsByDate(editionDate: string) {
  return oikoQueries.jobRuns.listByDate.all(editionDate).map((row) => ({
    ...row,
    meta_json: safeJsonParse(row.meta_json, {}),
  }));
}

export default {
  collectEdition,
  composeEdition,
  sendEditionStep,
  runPipeline,
  getEditionPreview,
  getRunsByDate,
  getV3Preview,
};

