import { initializeDatabase } from '../db/database.js';
import { runPipeline } from '../oiko/pipeline.ts';
import { OIKO_FIXTURE_MODES, type OikoFixtureMode } from '../oiko/fixtures.ts';

function parseArgs(argv: string[]) {
  const args: { step: string; date?: string; dryRun: boolean; fixtureMode?: OikoFixtureMode; forceFallback: boolean } = {
    step: 'all',
    date: undefined,
    dryRun: false,
    fixtureMode: undefined,
    forceFallback: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--step') {
      args.step = argv[index + 1] || 'all';
      index += 1;
    } else if (value === '--date') {
      args.date = argv[index + 1];
      index += 1;
    } else if (value === '--dry-run') {
      args.dryRun = true;
    } else if (value === '--fixture') {
      const candidate = argv[index + 1] as OikoFixtureMode | undefined;
      if (candidate && OIKO_FIXTURE_MODES.includes(candidate)) {
        args.fixtureMode = candidate;
      }
      index += 1;
    } else if (value === '--force-fallback') {
      args.forceFallback = true;
    }
  }

  return args;
}

async function main() {
  const { step, date, dryRun, fixtureMode, forceFallback } = parseArgs(process.argv.slice(2));
  initializeDatabase();
  const result = await runPipeline({
    editionDate: date,
    step,
    dryRun,
    fixtureMode,
    forceFallback,
  });
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch((error) => {
  console.error('Oiko run failed:', error);
  process.exit(1);
});
