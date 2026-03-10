ALTER TABLE subscriptions ADD COLUMN offer_key TEXT DEFAULT 'pass_partiels_s4';
ALTER TABLE subscriptions ADD COLUMN stripe_checkout_session_id TEXT;
ALTER TABLE subscriptions ADD COLUMN stripe_payment_intent_id TEXT;
ALTER TABLE subscriptions ADD COLUMN stripe_price_id TEXT;
ALTER TABLE subscriptions ADD COLUMN access_source TEXT DEFAULT 'stripe';

CREATE INDEX IF NOT EXISTS idx_offer_key ON subscriptions(offer_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_stripe_checkout_session_id ON subscriptions(stripe_checkout_session_id);

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed_at INTEGER DEFAULT (strftime('%s', 'now'))
);

UPDATE subscriptions
SET offer_key = CASE
  WHEN stripe_subscription_id IS NOT NULL THEN 'legacy_subscription'
  ELSE 'pass_partiels_s4'
END
WHERE offer_key IS NULL OR TRIM(offer_key) = '';

UPDATE subscriptions
SET access_source = CASE
  WHEN stripe_subscription_id IS NOT NULL THEN 'stripe_subscription'
  ELSE 'stripe'
END
WHERE access_source IS NULL OR TRIM(access_source) = '';
