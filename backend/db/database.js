import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure database directory exists
const dbDir = join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DATABASE_PATH || join(dbDir, 'subscriptions.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema IMMEDIATELY (before preparing statements)
const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_uid TEXT UNIQUE NOT NULL,
      onboarding_completed INTEGER DEFAULT 0,
      notify_new_content INTEGER DEFAULT 1,
      notify_spaced_repetition INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_firebase_uid ON users(firebase_uid);

    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE NOT NULL,
      tier TEXT DEFAULT 'free' CHECK(tier IN ('free', 'premium')),
      status TEXT DEFAULT 'inactive' CHECK(status IN ('active', 'inactive', 'canceled', 'past_due')),
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT UNIQUE,
      current_period_end INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    );

    CREATE INDEX IF NOT EXISTS idx_user_id ON subscriptions(user_id);
    CREATE INDEX IF NOT EXISTS idx_stripe_subscription_id ON subscriptions(stripe_subscription_id);
    CREATE INDEX IF NOT EXISTS idx_status ON subscriptions(status);

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_notification_dismissals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_uid TEXT NOT NULL,
      notification_id TEXT NOT NULL,
      dismissed_at INTEGER DEFAULT (strftime('%s', 'now')),
      UNIQUE(firebase_uid, notification_id)
    );
`;

db.exec(schema);
console.log('Database schema initialized');

// Migration: add current_semester column if missing
try {
  db.exec(`ALTER TABLE users ADD COLUMN current_semester TEXT DEFAULT 's3'`);
  console.log('Migration: current_semester column added');
} catch (_e) {
  // Column already exists
}

// Migration: add last_path column if missing
try {
  db.exec(`ALTER TABLE users ADD COLUMN last_path TEXT DEFAULT NULL`);
  console.log('Migration: last_path column added');
} catch (_e) {
  // Column already exists
}

// Migration: add current_year column if missing
try {
  db.exec(`ALTER TABLE users ADD COLUMN current_year TEXT DEFAULT NULL`);
  console.log('Migration: current_year column added');
} catch (_e) {
  // Column already exists
}

// Seed default public config for badges + notifications
const defaultSiteConfig = {
  courseBadges: {
    's4:macro:chapitre-1': 'new',
    's4:micro:chapitre-1': 'soon',
    's4:micro:chapitre-2': 'soon',
    's4:micro:chapitre-3': 'soon',
    's4:micro:chapitre-4': 'soon',
    's4:management:chapitre-1': 'soon',
    's4:management:chapitre-2': 'soon',
    's4:management:chapitre-3': 'soon',
    's4:management:chapitre-4': 'soon',
  },
  notifications: [
    {
      id: 1,
      subject: 'S4',
      chapter: 'Nouveaux contenus de macroeconomie disponibles',
      time: 'Recent',
      subjectKey: 'macro',
      createdAt: Date.now(),
      expiresInHours: 168,
    },
  ],
};

try {
  db.prepare(`
    INSERT OR IGNORE INTO site_settings (key, value, updated_at)
    VALUES ('public_config', ?, CURRENT_TIMESTAMP)
  `).run(JSON.stringify(defaultSiteConfig));
} catch (e) {
  console.error('Failed to seed site settings:', e);
}

// Initialize database function (for explicit calls if needed)
export function initializeDatabase() {
  console.log('Database ready');
}

// Subscription queries - NOW table exists
export const subscriptionQueries = {
  // Get subscription by user ID
  getByUserId: db.prepare(`
    SELECT * FROM subscriptions WHERE user_id = ?
  `),

  // Get subscription by Stripe subscription ID
  getByStripeId: db.prepare(`
    SELECT * FROM subscriptions WHERE stripe_subscription_id = ?
  `),

  // Create new subscription
  create: db.prepare(`
    INSERT INTO subscriptions (
      user_id, tier, status, stripe_customer_id, 
      stripe_subscription_id, current_period_end
    ) VALUES (?, ?, ?, ?, ?, ?)
  `),

  // Update subscription tier and status
  updateTier: db.prepare(`
    UPDATE subscriptions 
    SET tier = ?, status = ?, current_period_end = ?, updated_at = strftime('%s', 'now')
    WHERE user_id = ?
  `),

  // Update subscription by Stripe ID (for webhooks)
  updateByStripeId: db.prepare(`
    UPDATE subscriptions 
    SET status = ?, tier = ?, updated_at = strftime('%s', 'now')
    WHERE stripe_subscription_id = ?
  `),

  // Upsert subscription (insert or update)
  upsert: db.prepare(`
    INSERT INTO subscriptions (
      user_id, tier, status, stripe_customer_id, 
      stripe_subscription_id, current_period_end
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      tier = excluded.tier,
      status = excluded.status,
      stripe_customer_id = excluded.stripe_customer_id,
      stripe_subscription_id = excluded.stripe_subscription_id,
      current_period_end = excluded.current_period_end,
      updated_at = strftime('%s', 'now')
  `),
};

export default db;
