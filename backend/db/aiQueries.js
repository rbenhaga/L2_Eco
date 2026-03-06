import db from './database.js';

/**
 * Prepared statements for AI chatbot operations
 * Organized by table for clarity
 */

// ============================================
// AI User Quotas
// ============================================

export const aiUserQuotaQueries = {
  // Get user quota for a specific date
  getByUserAndDate: db.prepare(`
    SELECT * FROM ai_user_quotas
    WHERE firebase_uid = ? AND date = ?
  `),

  // Get user quota for today
  getToday: db.prepare(`
    SELECT * FROM ai_user_quotas
    WHERE firebase_uid = ? AND date = date('now')
  `),

  // Upsert user quota (increment requests/tokens)
  upsert: db.prepare(`
    INSERT INTO ai_user_quotas (firebase_uid, date, requests_count, tokens_used, last_request_at, updated_at)
    VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'))
    ON CONFLICT(firebase_uid, date) DO UPDATE SET
      requests_count = requests_count + excluded.requests_count,
      tokens_used = tokens_used + excluded.tokens_used,
      last_request_at = excluded.last_request_at,
      updated_at = strftime('%s', 'now')
  `),

  // Set cooldown for a user
  setCooldown: db.prepare(`
    UPDATE ai_user_quotas
    SET cooldown_until = ?, abuse_flags = abuse_flags + 1, updated_at = strftime('%s', 'now')
    WHERE firebase_uid = ? AND date = ?
  `),

  // Clear expired cooldowns (called periodically)
  clearExpiredCooldowns: db.prepare(`
    UPDATE ai_user_quotas
    SET cooldown_until = NULL, updated_at = strftime('%s', 'now')
    WHERE cooldown_until IS NOT NULL AND cooldown_until < strftime('%s', 'now')
  `),

  // Get recent requests count (for hourly rate limiting)
  getRecentRequestsCount: db.prepare(`
    SELECT COUNT(*) as count
    FROM ai_chat_history
    WHERE firebase_uid = ? AND created_at > ?
  `),

  // Clean old records (retention policy: 90 days)
  cleanOldRecords: db.prepare(`
    DELETE FROM ai_user_quotas
    WHERE date < date('now', '-90 days')
  `)
};

// ============================================
// AI Provider Health
// ============================================

export const aiProviderHealthQueries = {
  // Get health for specific provider/model
  get: db.prepare(`
    SELECT * FROM ai_provider_health
    WHERE provider_name = ? AND model_name = ?
  `),

  // Get all provider health statuses
  getAll: db.prepare(`
    SELECT * FROM ai_provider_health
    ORDER BY provider_name, model_name
  `),

  // Upsert provider health (for initialization)
  upsert: db.prepare(`
    INSERT INTO ai_provider_health (
      provider_name, model_name, status, success_count, failure_count,
      last_success, last_failure, last_error, circuit_breaker_state,
      consecutive_failures, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
    ON CONFLICT(provider_name, model_name) DO UPDATE SET
      status = excluded.status,
      success_count = excluded.success_count,
      failure_count = excluded.failure_count,
      last_success = excluded.last_success,
      last_failure = excluded.last_failure,
      last_error = excluded.last_error,
      circuit_breaker_state = excluded.circuit_breaker_state,
      consecutive_failures = excluded.consecutive_failures,
      updated_at = strftime('%s', 'now')
  `),

  // Record success (increment success_count, reset consecutive_failures)
  recordSuccess: db.prepare(`
    INSERT INTO ai_provider_health (provider_name, model_name, success_count, last_success, consecutive_failures, circuit_breaker_state, updated_at)
    VALUES (?, ?, 1, ?, 0, 'closed', strftime('%s', 'now'))
    ON CONFLICT(provider_name, model_name) DO UPDATE SET
      success_count = success_count + 1,
      last_success = excluded.last_success,
      consecutive_failures = 0,
      circuit_breaker_state = CASE
        WHEN circuit_breaker_state = 'half-open' THEN 'closed'
        ELSE circuit_breaker_state
      END,
      status = 'healthy',
      updated_at = strftime('%s', 'now')
  `),

  // Record failure (increment failure_count, consecutive_failures)
  recordFailure: db.prepare(`
    INSERT INTO ai_provider_health (provider_name, model_name, failure_count, last_failure, last_error, consecutive_failures, updated_at)
    VALUES (?, ?, 1, ?, ?, 1, strftime('%s', 'now'))
    ON CONFLICT(provider_name, model_name) DO UPDATE SET
      failure_count = failure_count + 1,
      last_failure = excluded.last_failure,
      last_error = excluded.last_error,
      consecutive_failures = consecutive_failures + 1,
      updated_at = strftime('%s', 'now')
  `),

  // Update circuit breaker state
  updateCircuitBreaker: db.prepare(`
    UPDATE ai_provider_health
    SET circuit_breaker_state = ?, circuit_opened_at = ?, status = ?, updated_at = strftime('%s', 'now')
    WHERE provider_name = ? AND model_name = ?
  `),

  // Reset circuit breaker (for half-open → closed transition)
  resetCircuitBreaker: db.prepare(`
    UPDATE ai_provider_health
    SET circuit_breaker_state = 'closed', circuit_opened_at = NULL, consecutive_failures = 0, status = 'healthy', updated_at = strftime('%s', 'now')
    WHERE provider_name = ? AND model_name = ?
  `)
};

// ============================================
// AI Provider Quotas
// ============================================

export const aiProviderQuotaQueries = {
  // Get quota for specific provider/model/date
  get: db.prepare(`
    SELECT * FROM ai_provider_quotas
    WHERE provider_name = ? AND model_name = ? AND date = ?
  `),

  // Get quota for today
  getToday: db.prepare(`
    SELECT * FROM ai_provider_quotas
    WHERE provider_name = ? AND model_name = ? AND date = date('now')
  `),

  // Upsert quota (increment usage, update remaining from headers)
  upsert: db.prepare(`
    INSERT INTO ai_provider_quotas (
      provider_name, model_name, date, requests_count, tokens_used,
      requests_remaining, tokens_remaining, reset_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
    ON CONFLICT(provider_name, model_name, date) DO UPDATE SET
      requests_count = requests_count + excluded.requests_count,
      tokens_used = tokens_used + excluded.tokens_used,
      requests_remaining = excluded.requests_remaining,
      tokens_remaining = excluded.tokens_remaining,
      reset_at = excluded.reset_at,
      updated_at = strftime('%s', 'now')
  `),

  // Update only remaining counts (from headers)
  updateRemaining: db.prepare(`
    INSERT INTO ai_provider_quotas (
      provider_name, model_name, date, requests_remaining, tokens_remaining, reset_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
    ON CONFLICT(provider_name, model_name, date) DO UPDATE SET
      requests_remaining = excluded.requests_remaining,
      tokens_remaining = excluded.tokens_remaining,
      reset_at = excluded.reset_at,
      updated_at = strftime('%s', 'now')
  `),

  // Get all quotas for today
  getAllToday: db.prepare(`
    SELECT * FROM ai_provider_quotas
    WHERE date = date('now')
  `),

  // Clean old records (retention policy: 90 days)
  cleanOldRecords: db.prepare(`
    DELETE FROM ai_provider_quotas
    WHERE date < date('now', '-90 days')
  `)
};

// ============================================
// AI Chat History
// ============================================

export const aiChatHistoryQueries = {
  // Insert new chat entry
  insert: db.prepare(`
    INSERT INTO ai_chat_history (
      firebase_uid, question, answer, context_course_id, context_chapter_id,
      context_page_id, source, provider_used, model_used, complexity_category,
      complexity_score, similarity_score, response_time_ms, tokens_used, cache_entry_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),

  // Update feedback
  updateFeedback: db.prepare(`
    UPDATE ai_chat_history
    SET feedback = ?
    WHERE id = ? AND firebase_uid = ?
  `),

  // Get chat by ID
  getById: db.prepare(`
    SELECT * FROM ai_chat_history
    WHERE id = ?
  `),

  // Get user's recent chats
  getUserRecent: db.prepare(`
    SELECT * FROM ai_chat_history
    WHERE firebase_uid = ?
    ORDER BY created_at DESC
    LIMIT ?
  `),

  // Get user's requests count since a timestamp (unix seconds)
  getUserCountSince: db.prepare(`
    SELECT COUNT(*) as count
    FROM ai_chat_history
    WHERE firebase_uid = ? AND created_at >= ?
  `),

  // Get chats by course
  getByCourse: db.prepare(`
    SELECT * FROM ai_chat_history
    WHERE context_course_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `),

  // Analytics: Get cache hit rate for period
  getCacheHitRate: db.prepare(`
    SELECT
      source,
      COUNT(*) as count,
      AVG(response_time_ms) as avg_response_time
    FROM ai_chat_history
    WHERE created_at > ?
    GROUP BY source
  `),

  // Analytics: Get provider usage
  getProviderUsage: db.prepare(`
    SELECT
      provider_used,
      COUNT(*) as count,
      SUM(tokens_used) as total_tokens,
      AVG(response_time_ms) as avg_response_time
    FROM ai_chat_history
    WHERE created_at > ? AND source = 'llm'
    GROUP BY provider_used
  `),

  // Clean old records (retention policy: 365 days)
  cleanOldRecords: db.prepare(`
    DELETE FROM ai_chat_history
    WHERE created_at < strftime('%s', 'now', '-365 days')
  `)
};

// ============================================
// AI Active Users (for adaptive rate limiting)
// ============================================

export const aiActiveUsersQueries = {
  // Upsert active user
  upsert: db.prepare(`
    INSERT INTO ai_active_users (firebase_uid, last_active, request_count_24h)
    VALUES (?, ?, 1)
    ON CONFLICT(firebase_uid) DO UPDATE SET
      last_active = excluded.last_active,
      request_count_24h = request_count_24h + 1
  `),

  // Get active users count (last 24 hours)
  getActiveCount: db.prepare(`
    SELECT COUNT(*) as count
    FROM ai_active_users
    WHERE last_active > strftime('%s', 'now', '-24 hours')
  `),

  // Get all active users
  getActive: db.prepare(`
    SELECT * FROM ai_active_users
    WHERE last_active > strftime('%s', 'now', '-24 hours')
  `),

  // Clean inactive users (>24h)
  cleanInactive: db.prepare(`
    DELETE FROM ai_active_users
    WHERE last_active < strftime('%s', 'now', '-24 hours')
  `)
};

// ============================================
// AI Pool Stats (global pool state)
// ============================================

export const aiPoolStatsQueries = {
  // Get current pool stats
  get: db.prepare(`
    SELECT * FROM ai_pool_stats WHERE id = 1
  `),

  // Update pool stats
  update: db.prepare(`
    UPDATE ai_pool_stats
    SET total_requests_today = ?,
        total_tokens_today = ?,
        active_users_count = ?,
        quota_pool_remaining = ?,
        last_updated = strftime('%s', 'now')
    WHERE id = 1
  `),

  // Increment requests
  incrementRequests: db.prepare(`
    UPDATE ai_pool_stats
    SET total_requests_today = total_requests_today + ?,
        total_tokens_today = total_tokens_today + ?,
        quota_pool_remaining = quota_pool_remaining - ?,
        last_updated = strftime('%s', 'now')
    WHERE id = 1
  `),

  // Reset daily (called by cron or on date change)
  resetDaily: db.prepare(`
    UPDATE ai_pool_stats
    SET date = date('now'),
        total_requests_today = 0,
        total_tokens_today = 0,
        quota_pool_remaining = 14850,
        last_updated = strftime('%s', 'now')
    WHERE id = 1 AND date < date('now')
  `)
};

// ============================================
// Utility: Transaction helper
// ============================================

export function runInTransaction(callback) {
  const transaction = db.transaction(callback);
  return transaction();
}

// ============================================
// Cleanup job (should be run daily via cron)
// ============================================

export function runDailyCleanup() {
  return runInTransaction(() => {
    aiUserQuotaQueries.cleanOldRecords.run();
    aiProviderQuotaQueries.cleanOldRecords.run();
    aiChatHistoryQueries.cleanOldRecords.run();
    aiActiveUsersQueries.cleanInactive.run();
    aiUserQuotaQueries.clearExpiredCooldowns.run();
    aiPoolStatsQueries.resetDaily.run();

    console.log('[DB Cleanup] Daily cleanup completed');
  });
}

export default {
  userQuota: aiUserQuotaQueries,
  providerHealth: aiProviderHealthQueries,
  providerQuota: aiProviderQuotaQueries,
  chatHistory: aiChatHistoryQueries,
  activeUsers: aiActiveUsersQueries,
  poolStats: aiPoolStatsQueries,
  runInTransaction,
  runDailyCleanup
};
