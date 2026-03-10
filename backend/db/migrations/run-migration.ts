import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function ensureSchemaMigrationsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function getMigrationFiles() {
  return fs.readdirSync(__dirname)
    .filter((filename) => /^\d+_.+\.sql$/i.test(filename))
    .sort((a, b) => a.localeCompare(b, 'en'));
}

function hasColumn(db, tableName, columnName) {
  try {
    const columns = db.prepare(`PRAGMA table_info(${tableName})`).all();
    return columns.some((column) => column.name === columnName);
  } catch (_error) {
    return false;
  }
}

function hasTable(db, tableName) {
  const row = db.prepare(`
    SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?
  `).get(tableName);
  return Boolean(row);
}

function shouldSkipMigration(db, filename) {
  if (filename === '003_add_management_and_time.sql') {
    return hasTable(db, 'user_progress') && hasColumn(db, 'user_progress', 'time_spent_seconds');
  }
  if (filename === '008_stripe_checkout_pass_flow.sql') {
    return hasTable(db, 'stripe_webhook_events')
      && hasColumn(db, 'subscriptions', 'offer_key')
      && hasColumn(db, 'subscriptions', 'stripe_checkout_session_id')
      && hasColumn(db, 'subscriptions', 'stripe_payment_intent_id')
      && hasColumn(db, 'subscriptions', 'stripe_price_id')
      && hasColumn(db, 'subscriptions', 'access_source');
  }
  return false;
}

function markMigrationApplied(db, filename) {
  db.prepare(`
    INSERT OR IGNORE INTO schema_migrations (filename) VALUES (?)
  `).run(filename);
}

export function runPendingMigrations(existingDb = null) {
  const ownsConnection = !existingDb;
  const dbDir = join(__dirname, '..', '..', 'database');
  const dbPath = process.env.DATABASE_PATH || join(dbDir, 'subscriptions.db');
  const db = existingDb || new Database(dbPath);

  try {
    db.pragma('foreign_keys = ON');
    ensureSchemaMigrationsTable(db);

    const applied = new Set(
      db.prepare(`SELECT filename FROM schema_migrations ORDER BY filename`).all().map((row) => row.filename)
    );

    const migrationFiles = getMigrationFiles();
    const appliedNow = [];

    for (const filename of migrationFiles) {
      if (applied.has(filename)) {
        continue;
      }

      if (shouldSkipMigration(db, filename)) {
        markMigrationApplied(db, filename);
        appliedNow.push({ filename, skipped: true });
        continue;
      }

      const migrationPath = join(__dirname, filename);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      const transaction = db.transaction(() => {
        db.exec(migrationSQL);
        markMigrationApplied(db, filename);
      });
      transaction();
      appliedNow.push({ filename, skipped: false });
    }

    return appliedNow;
  } finally {
    if (ownsConnection) {
      db.close();
    }
  }
}

function runAsScript() {
  console.log('Starting database migrations...');
  try {
    const results = runPendingMigrations();
    if (results.length === 0) {
      console.log('No pending migrations.');
      return;
    }

    for (const result of results) {
      console.log(`${result.skipped ? 'Skipped' : 'Applied'} ${result.filename}`);
    }
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runAsScript();
}
