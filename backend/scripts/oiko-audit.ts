import { initializeDatabase } from '../db/database.js';
import { OIKO_FIXTURE_MODES, type OikoFixtureMode } from '../oiko/fixtures.ts';
import { runOikoAudit, runOikoAuditSuite } from '../oiko/audit.ts';
import { getEditionWindow } from '../oiko/utils.ts';

type CliArgs = {
  date: string;
  suite: boolean;
  fixtureMode: OikoFixtureMode;
  forceFallback: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    date: getEditionWindow().editionDate,
    suite: true,
    fixtureMode: 'baseline',
    forceFallback: true,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--date') {
      args.date = argv[index + 1] || args.date;
      index += 1;
    } else if (value === '--fixture') {
      const candidate = argv[index + 1] as OikoFixtureMode | undefined;
      if (candidate && OIKO_FIXTURE_MODES.includes(candidate)) {
        args.fixtureMode = candidate;
        args.suite = false;
      }
      index += 1;
    } else if (value === '--single') {
      args.suite = false;
    } else if (value === '--live-llm') {
      args.forceFallback = false;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  initializeDatabase();

  if (args.suite) {
    const report = await runOikoAuditSuite(args.date);
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.overallPassed ? 0 : 1);
  }

  const report = await runOikoAudit({
    name: `${args.fixtureMode}-${args.date}`,
    editionDate: args.date,
    fixtureMode: args.fixtureMode,
    forceFallback: args.forceFallback,
  });

  console.log(JSON.stringify(report, null, 2));
  process.exit(report.passed ? 0 : 1);
}

main().catch((error) => {
  console.error('Oiko audit failed:', error);
  process.exit(1);
});
