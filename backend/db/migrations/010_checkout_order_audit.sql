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
CREATE INDEX IF NOT EXISTS idx_stripe_payment_intent_id ON subscriptions(stripe_payment_intent_id);
