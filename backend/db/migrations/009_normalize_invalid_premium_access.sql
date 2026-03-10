UPDATE subscriptions
SET
  tier = 'free',
  status = 'inactive',
  current_period_end = NULL,
  updated_at = strftime('%s', 'now')
WHERE tier = 'premium'
  AND status = 'active'
  AND stripe_subscription_id IS NULL
  AND stripe_checkout_session_id IS NULL
  AND COALESCE(current_period_end, 0) <= 0;
