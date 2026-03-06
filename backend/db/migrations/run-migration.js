import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Migration runner for AI chatbot schema
 * Run with: node db/migrations/run-migration.js
 */

async function runMigration() {
  console.log('🚀 Starting AI Chatbot Migration...\n');

  try {
    // Get database path
    const dbDir = join(__dirname, '..', '..', 'database');
    const dbPath = process.env.DATABASE_PATH || join(dbDir, 'subscriptions.db');

    console.log(`📂 Database path: ${dbPath}`);

    // Connect to database
    const db = new Database(dbPath);
    db.pragma('foreign_keys = ON');

    // Read migration SQL
    const migrationPath = join(__dirname, '001_ai_chatbot.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Executing migration SQL...\n');

    // Execute migration
    db.exec(migrationSQL);

    console.log('✅ Migration completed successfully!\n');

    // Verify tables were created
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name LIKE 'ai_%'
      ORDER BY name
    `).all();

    console.log('📊 Created tables:');
    tables.forEach(table => {
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
      console.log(`   - ${table.name} (${count.count} rows)`);
    });

    console.log('\n✨ Database is ready for AI chatbot operations!');

    db.close();

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
runMigration();
