import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { runPendingMigrations } from './migrations/run-migration.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbDir = join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DATABASE_PATH || join(dbDir, 'subscriptions.db');
const db = new Database(dbPath);
let databaseClosed = false;

db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_uid TEXT UNIQUE NOT NULL,
      onboarding_completed INTEGER DEFAULT 0,
      notify_new_content INTEGER DEFAULT 1,
      notify_spaced_repetition INTEGER DEFAULT 1,
      last_seen_at INTEGER DEFAULT (strftime('%s', 'now')),
      current_semester TEXT DEFAULT 's3',
      current_year TEXT DEFAULT NULL,
      last_path TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_firebase_uid ON users(firebase_uid);

    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE NOT NULL,
      tier TEXT DEFAULT 'free' CHECK(tier IN ('free', 'premium')),
      status TEXT DEFAULT 'inactive' CHECK(status IN ('active', 'inactive', 'canceled', 'past_due')),
      offer_key TEXT DEFAULT 'pass_partiels_s4',
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT UNIQUE,
      stripe_checkout_session_id TEXT UNIQUE,
      stripe_payment_intent_id TEXT,
      stripe_price_id TEXT,
      access_source TEXT DEFAULT 'stripe',
      current_period_end INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    );

    CREATE INDEX IF NOT EXISTS idx_user_id ON subscriptions(user_id);
    CREATE INDEX IF NOT EXISTS idx_offer_key ON subscriptions(offer_key);
    CREATE INDEX IF NOT EXISTS idx_stripe_subscription_id ON subscriptions(stripe_subscription_id);
    CREATE INDEX IF NOT EXISTS idx_stripe_checkout_session_id ON subscriptions(stripe_checkout_session_id);
    CREATE INDEX IF NOT EXISTS idx_stripe_payment_intent_id ON subscriptions(stripe_payment_intent_id);
    CREATE INDEX IF NOT EXISTS idx_status ON subscriptions(status);

    CREATE TABLE IF NOT EXISTS stripe_webhook_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_event_id TEXT UNIQUE NOT NULL,
      event_type TEXT NOT NULL,
      processed_at INTEGER DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS stripe_checkout_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      offer_key TEXT NOT NULL DEFAULT 'pass_partiels_s4',
      cancel_token TEXT,
      stripe_checkout_session_id TEXT UNIQUE NOT NULL,
      stripe_payment_intent_id TEXT UNIQUE,
      stripe_customer_id TEXT,
      stripe_invoice_id TEXT,
      stripe_price_id TEXT,
      amount_total INTEGER,
      currency TEXT,
      checkout_status TEXT,
      payment_status TEXT,
      access_duration_days INTEGER,
      access_granted INTEGER DEFAULT 0,
      access_start_at INTEGER,
      access_end_at INTEGER,
      access_source TEXT,
      checkout_created_at INTEGER,
      paid_at INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    );

    CREATE INDEX IF NOT EXISTS idx_checkout_orders_user_id ON stripe_checkout_orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_checkout_orders_payment_status ON stripe_checkout_orders(payment_status);
    CREATE INDEX IF NOT EXISTS idx_checkout_orders_checkout_created_at ON stripe_checkout_orders(checkout_created_at);

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

try {
  db.exec(`ALTER TABLE users ADD COLUMN current_semester TEXT DEFAULT 's3'`);
} catch (_error) {
  // Column already exists.
}

try {
  db.exec(`ALTER TABLE users ADD COLUMN last_path TEXT DEFAULT NULL`);
} catch (_error) {
  // Column already exists.
}

try {
  db.exec(`ALTER TABLE users ADD COLUMN current_year TEXT DEFAULT NULL`);
} catch (_error) {
  // Column already exists.
}

try {
  db.exec(`ALTER TABLE users ADD COLUMN last_seen_at INTEGER`);
} catch (_error) {
  // Column already exists.
}

try {
  db.exec(`
    UPDATE users
    SET last_seen_at = COALESCE(
      last_seen_at,
      strftime('%s', updated_at),
      strftime('%s', created_at),
      strftime('%s', 'now')
    )
    WHERE last_seen_at IS NULL
  `);
} catch (_error) {
  // Ignore legacy databases missing columns during bootstrap.
}

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
} catch (error) {
  console.error('Failed to seed site settings:', error);
}

let bootstrapped = false;

function bootstrapDatabase() {
  if (bootstrapped) {
    return;
  }
  runPendingMigrations(db);
  bootstrapped = true;
}

bootstrapDatabase();

export function initializeDatabase() {
  bootstrapDatabase();
  console.log(`Database ready at ${dbPath}`);
}

export function closeDatabase() {
  if (databaseClosed) {
    return;
  }
  db.close();
  databaseClosed = true;
}

export const subscriptionQueries = {
  getByUserId: db.prepare(`
    SELECT * FROM subscriptions WHERE user_id = ?
  `),

  getByStripeId: db.prepare(`
    SELECT * FROM subscriptions WHERE stripe_subscription_id = ?
  `),

  getByCheckoutSessionId: db.prepare(`
    SELECT * FROM subscriptions WHERE stripe_checkout_session_id = ?
  `),

  create: db.prepare(`
    INSERT INTO subscriptions (
      user_id, tier, status, offer_key, stripe_customer_id,
      stripe_subscription_id, stripe_checkout_session_id, stripe_payment_intent_id,
      stripe_price_id, access_source, current_period_end
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),

  updateTier: db.prepare(`
    UPDATE subscriptions
    SET tier = ?, status = ?, current_period_end = ?, updated_at = strftime('%s', 'now')
    WHERE user_id = ?
  `),

  updateByStripeId: db.prepare(`
    UPDATE subscriptions
    SET status = ?, tier = ?, stripe_customer_id = COALESCE(?, stripe_customer_id), current_period_end = ?, updated_at = strftime('%s', 'now')
    WHERE stripe_subscription_id = ?
  `),

  upsert: db.prepare(`
    INSERT INTO subscriptions (
      user_id, tier, status, offer_key, stripe_customer_id,
      stripe_subscription_id, stripe_checkout_session_id, stripe_payment_intent_id,
      stripe_price_id, access_source, current_period_end
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      tier = excluded.tier,
      status = excluded.status,
      offer_key = excluded.offer_key,
      stripe_customer_id = excluded.stripe_customer_id,
      stripe_subscription_id = excluded.stripe_subscription_id,
      stripe_checkout_session_id = excluded.stripe_checkout_session_id,
      stripe_payment_intent_id = excluded.stripe_payment_intent_id,
      stripe_price_id = excluded.stripe_price_id,
      access_source = excluded.access_source,
      current_period_end = excluded.current_period_end,
      updated_at = strftime('%s', 'now')
  `),
};

export const stripeEventQueries = {
  getByEventId: db.prepare(`
    SELECT * FROM stripe_webhook_events WHERE stripe_event_id = ?
  `),

  markProcessed: db.prepare(`
    INSERT INTO stripe_webhook_events (stripe_event_id, event_type)
    VALUES (?, ?)
    ON CONFLICT(stripe_event_id) DO NOTHING
  `),
};

export const checkoutOrderQueries = {
  getByCheckoutSessionId: db.prepare(`
    SELECT * FROM stripe_checkout_orders WHERE stripe_checkout_session_id = ?
  `),

  getByCancelTokenAndUser: db.prepare(`
    SELECT *
    FROM stripe_checkout_orders
    WHERE cancel_token = ?
      AND user_id = ?
    ORDER BY checkout_created_at DESC
    LIMIT 1
  `),

  getMostRecentPendingByUser: db.prepare(`
    SELECT *
    FROM stripe_checkout_orders
    WHERE user_id = ?
      AND access_granted = 0
      AND (payment_status IS NULL OR payment_status != 'paid')
      AND checkout_created_at >= ?
    ORDER BY checkout_created_at DESC
    LIMIT 1
  `),

  upsert: db.prepare(`
    INSERT INTO stripe_checkout_orders (
      user_id,
      offer_key,
      cancel_token,
      stripe_checkout_session_id,
      stripe_payment_intent_id,
      stripe_customer_id,
      stripe_invoice_id,
      stripe_price_id,
      amount_total,
      currency,
      checkout_status,
      payment_status,
      access_duration_days,
      access_granted,
      access_start_at,
      access_end_at,
      access_source,
      checkout_created_at,
      paid_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(stripe_checkout_session_id) DO UPDATE SET
      user_id = excluded.user_id,
      offer_key = excluded.offer_key,
      cancel_token = COALESCE(excluded.cancel_token, stripe_checkout_orders.cancel_token),
      stripe_payment_intent_id = COALESCE(excluded.stripe_payment_intent_id, stripe_checkout_orders.stripe_payment_intent_id),
      stripe_customer_id = COALESCE(excluded.stripe_customer_id, stripe_checkout_orders.stripe_customer_id),
      stripe_invoice_id = COALESCE(excluded.stripe_invoice_id, stripe_checkout_orders.stripe_invoice_id),
      stripe_price_id = COALESCE(excluded.stripe_price_id, stripe_checkout_orders.stripe_price_id),
      amount_total = COALESCE(excluded.amount_total, stripe_checkout_orders.amount_total),
      currency = COALESCE(excluded.currency, stripe_checkout_orders.currency),
      checkout_status = COALESCE(excluded.checkout_status, stripe_checkout_orders.checkout_status),
      payment_status = COALESCE(excluded.payment_status, stripe_checkout_orders.payment_status),
      access_duration_days = COALESCE(excluded.access_duration_days, stripe_checkout_orders.access_duration_days),
      access_granted = MAX(stripe_checkout_orders.access_granted, excluded.access_granted),
      access_start_at = COALESCE(excluded.access_start_at, stripe_checkout_orders.access_start_at),
      access_end_at = COALESCE(excluded.access_end_at, stripe_checkout_orders.access_end_at),
      access_source = COALESCE(excluded.access_source, stripe_checkout_orders.access_source),
      checkout_created_at = COALESCE(excluded.checkout_created_at, stripe_checkout_orders.checkout_created_at),
      paid_at = COALESCE(excluded.paid_at, stripe_checkout_orders.paid_at),
      updated_at = strftime('%s', 'now')
  `),
};

export default db;

