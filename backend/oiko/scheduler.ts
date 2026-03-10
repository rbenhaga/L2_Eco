import cron from 'node-cron';
import { oikoQueries } from './queries.ts';
import { runPipeline } from './pipeline.ts';
import { getTodayInTimeZone } from './utils.ts';

let scheduledTask: cron.ScheduledTask | null = null;
let runInFlight = false;

function withSchedulerLock(editionDate: string, fn: () => Promise<void>) {
  const lockKey = `${editionDate}:scheduler:live`;
  const existing = oikoQueries.jobRuns.getByLockKey.get(lockKey);
  if (existing?.status === 'success') {
    console.log('[oiko-scheduler] Run skipped because this date was already processed by another scheduler instance.');
    return Promise.resolve();
  }
  if (existing?.status === 'started') {
    console.log('[oiko-scheduler] Run skipped because another scheduler instance is already working on this date.');
    return Promise.resolve();
  }

  try {
    oikoQueries.jobRuns.create.run(editionDate, 'scheduler', 'started', lockKey, JSON.stringify({ source: 'node-cron' }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('oiko_news_job_runs.lock_key')) {
      console.log('[oiko-scheduler] Run skipped because the scheduler lock already exists.');
      return Promise.resolve();
    }
    throw error;
  }

  return fn()
    .then(() => {
      oikoQueries.jobRuns.complete.run('success', JSON.stringify({ source: 'node-cron' }), lockKey);
    })
    .catch((error: Error) => {
      oikoQueries.jobRuns.complete.run('failed', JSON.stringify({ error: error.message, source: 'node-cron' }), lockKey);
      throw error;
    });
}

export function startOikoScheduler() {
  if (scheduledTask) return scheduledTask;

  scheduledTask = cron.schedule('0 7 * * *', async () => {
    if (runInFlight) {
      console.warn('[oiko-scheduler] Run skipped because the previous execution is still in flight.');
      return;
    }

    runInFlight = true;
    const editionDate = getTodayInTimeZone();
    console.log(`[oiko-scheduler] Starting Oiko pipeline for ${editionDate}`);

    try {
      await withSchedulerLock(editionDate, async () => {
        const result = await runPipeline({
          editionDate,
          step: 'all',
          dryRun: false,
        });
        console.log('[oiko-scheduler] Oiko pipeline completed', JSON.stringify(result.results || {}, null, 2));
      });
    } catch (error) {
      console.error('[oiko-scheduler] Oiko pipeline failed', error);
    } finally {
      runInFlight = false;
    }
  }, {
    timezone: 'Europe/Paris',
  });

  console.log('[oiko-scheduler] Daily schedule armed for 07:00 Europe/Paris with database-backed scheduler lock.');
  return scheduledTask;
}

export function stopOikoScheduler() {
  scheduledTask?.stop();
  scheduledTask = null;
  runInFlight = false;
}

export default {
  startOikoScheduler,
  stopOikoScheduler,
};
