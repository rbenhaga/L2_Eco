import aiQueries from '../../db/aiQueries.js';
import { AdaptiveRateLimiter, BASE_RATE_LIMITS } from '../config/rateLimits.js';
import { PROVIDER_CONFIG, POOL_CONFIG } from '../config/providers.js';

/**
 * QuotaService
 *
 * Manages:
 * 1. User quotas (adaptive rate limiting)
 * 2. Provider quotas (track usage, parse headers)
 * 3. Provider health (circuit breaker)
 * 4. Global pool stats
 */
export class QuotaService {
  constructor() {
    // Use default export structure
    this.userQuotaQueries = aiQueries.userQuota;
    this.providerHealthQueries = aiQueries.providerHealth;
    this.providerQuotaQueries = aiQueries.providerQuota;
    this.activeUsersQueries = aiQueries.activeUsers;
    this.poolStatsQueries = aiQueries.poolStats;

    // In-memory rate limiting (RPM/burst detection)
    this.inMemoryCounters = new Map(); // key: userId, value: { requests: [], tokens: [] }
  }

  // ============================================
  // USER QUOTAS
  // ============================================

  /**
   * Get user quota for today
   */
  getUserQuotaToday(userId) {
    const today = this.getTodayDateString();
    let quota = this.userQuotaQueries.getByUserAndDate.get(userId, today);

    if (!quota) {
      // Create quota entry for today (5 params: firebase_uid, date, requests_count, tokens_used, last_request_at)
      this.userQuotaQueries.upsert.run(userId, today, 0, 0, null);
      quota = this.userQuotaQueries.getByUserAndDate.get(userId, today);
    }

    return quota;
  }

  /**
   * Check if user is in cooldown
   */
  checkCooldown(userId) {
    const quota = this.getUserQuotaToday(userId);
    const now = Date.now();

    if (quota.cooldown_until && quota.cooldown_until > now) {
      return {
        inCooldown: true,
        secondsRemaining: Math.ceil((quota.cooldown_until - now) / 1000),
        reason: 'Rate limit exceeded'
      };
    }

    return { inCooldown: false };
  }

  /**
   * Set cooldown for user
   */
  setCooldown(userId, minutes) {
    const cooldownUntil = Date.now() + (minutes * 60 * 1000);
    const today = this.getTodayDateString();
    // Use dedicated setCooldown query instead of upsert
    this.userQuotaQueries.setCooldown.run(cooldownUntil, userId, today);
  }

  /**
   * Increment user quota (after successful request)
   */
  incrementUserQuota(userId, tokensUsed) {
    const today = this.getTodayDateString();
    const now = Date.now();

    const quota = this.getUserQuotaToday(userId);
    const newRequestsCount = quota.requests_count + 1;
    const newTokensUsed = quota.tokens_used + tokensUsed;

    // upsert expects 5 params: firebase_uid, date, requests_count, tokens_used, last_request_at
    // Note: upsert increments counts, so we pass the delta (1 request, tokensUsed tokens)
    this.userQuotaQueries.upsert.run(
      userId,
      today,
      1,  // increment by 1 request
      tokensUsed,  // increment by tokensUsed
      now
    );

    // Keep active users table in sync for adaptive limits and admin visibility.
    this.activeUsersQueries.upsert.run(userId, Math.floor(now / 1000));

    // Update in-memory counter for RPM tracking
    this.updateInMemoryCounter(userId, tokensUsed);
  }

  /**
   * Get recent requests count (for hourly rate limiting)
   */
  getRecentRequests(userId, windowSeconds = 3600) {
    const counter = this.inMemoryCounters.get(userId);
    if (!counter) return 0;

    const now = Date.now();
    const cutoff = now - (windowSeconds * 1000);

    // Filter requests within window
    const recentRequests = counter.requests.filter(timestamp => timestamp > cutoff);

    // Update counter
    counter.requests = recentRequests;
    this.inMemoryCounters.set(userId, counter);

    return recentRequests.length;
  }

  /**
   * Check burst rate (requests per minute)
   */
  checkBurstRate(userId) {
    const recentRequests = this.getRecentRequests(userId, 60); // Last minute
    const maxBurst = BASE_RATE_LIMITS.free.maxBurst.requestsPerMinute;

    return {
      count: recentRequests,
      limit: maxBurst,
      exceeded: recentRequests >= maxBurst
    };
  }

  /**
   * Update in-memory counter
   */
  updateInMemoryCounter(userId, tokensUsed) {
    const now = Date.now();
    let counter = this.inMemoryCounters.get(userId);

    if (!counter) {
      counter = { requests: [], tokens: [] };
    }

    counter.requests.push(now);
    counter.tokens.push({ timestamp: now, count: tokensUsed });

    this.inMemoryCounters.set(userId, counter);
  }

  /**
   * Get adaptive rate limit for user
   */
  async getAdaptiveLimit(userId, tier = 'free') {
    const poolStats = this.getPoolStats();
    const activeCount = this.activeUsersQueries.getActiveCount.get();
    const activeUsers = activeCount ? activeCount.count : 1;

    // Use static method from AdaptiveRateLimiter
    const limits = AdaptiveRateLimiter.calculateDynamicLimit({
        quotaPoolRemaining: poolStats.requestsRemaining,
        activeUsersCount: activeUsers
    }, tier);

    // Add resetsIn and resetsAt
    const now = Date.now();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const resetsAt = endOfDay.getTime();

    return {
        maxRequests: limits.requestsPerDay,
        ...limits,
        resetsAt,
        resetsIn: Math.floor((resetsAt - now) / 1000) // seconds
    };
  }

  // ============================================
  // PROVIDER QUOTAS
  // ============================================

  /**
   * Get provider quota status
   */
  getProviderQuotaStatus(providerName, modelName) {
    const today = this.getTodayDateString();
    // Use 'get' instead of 'getByProviderModelDate'
    let quota = this.providerQuotaQueries.get.get(providerName, modelName, today);

    if (!quota) {
      // Initialize from config
      const config = PROVIDER_CONFIG[providerName];
      const modelKey = this.getModelKey(modelName, config);
      const quotas = config.models[modelKey]?.quotas || {};

      this.providerQuotaQueries.upsert.run(
        providerName,
        modelName,
        today,
        0, // requests_count
        0, // tokens_used
        quotas.rpd || 0, // requests_remaining
        quotas.tpd || 0, // tokens_remaining
        null // reset_at
      );

      quota = this.providerQuotaQueries.get.get(providerName, modelName, today);
    }

    return quota;
  }

  /**
   * Update provider quota from response headers
   */
  updateProviderQuotaFromHeaders(providerName, modelName, headers) {
    const config = PROVIDER_CONFIG[providerName];
    if (!config || !config.headers) return;

    const today = this.getTodayDateString();
    const headerConfig = config.headers;

    // Parse rate limit headers
    const remainingRequests = headers[headerConfig.remainingRequests];
    const remainingTokens = headers[headerConfig.remainingTokens];
    const resetRequests = headers[headerConfig.resetRequests];

    if (remainingRequests !== undefined || remainingTokens !== undefined) {
      const quota = this.getProviderQuotaStatus(providerName, modelName);

      const resetAt = resetRequests
        ? Date.now() + (parseInt(resetRequests) * 1000)
        : null;

      this.providerQuotaQueries.upsert.run(
        providerName,
        modelName,
        today,
        quota.requests_count,
        quota.tokens_used,
        remainingRequests !== undefined ? parseInt(remainingRequests) : quota.requests_remaining,
        remainingTokens !== undefined ? parseInt(remainingTokens) : quota.tokens_remaining,
        resetAt
      );
    }
  }

  /**
   * Increment provider quota
   */
  incrementProviderQuota(providerName, modelName, tokensUsed) {
    const today = this.getTodayDateString();
    const quota = this.getProviderQuotaStatus(providerName, modelName);

    this.providerQuotaQueries.upsert.run(
      providerName,
      modelName,
      today,
      quota.requests_count + 1,
      quota.tokens_used + tokensUsed,
      Math.max(0, quota.requests_remaining - 1),
      Math.max(0, quota.tokens_remaining - tokensUsed),
      quota.reset_at
    );
  }

  // ============================================
  // PROVIDER HEALTH (Circuit Breaker)
  // ============================================

  /**
   * Get provider health status
   */
  getProviderHealth(providerName, modelName) {
    // Use 'get' instead of 'getByProviderModel'
    let health = this.providerHealthQueries.get.get(providerName, modelName);

    if (!health) {
      // Initialize health tracking
      // Order: provider_name, model_name, status, success_count, failure_count,
      //        last_success, last_failure, last_error, circuit_breaker_state, consecutive_failures
      this.providerHealthQueries.upsert.run(
        providerName,
        modelName,
        'healthy',      // status
        0,              // success_count
        0,              // failure_count
        null,           // last_success
        null,           // last_failure
        null,           // last_error
        'closed',       // circuit_breaker_state
        0               // consecutive_failures
      );

      health = this.providerHealthQueries.get.get(providerName, modelName);
    }

    return health;
  }

  /**
   * Record provider success
   */
  recordProviderSuccess(providerName, modelName, tokensUsed) {
    const now = Date.now();

    // Increment quota
    this.incrementProviderQuota(providerName, modelName, tokensUsed);

    // Use dedicated recordSuccess query (params: provider_name, model_name, last_success)
    this.providerHealthQueries.recordSuccess.run(
      providerName,
      modelName,
      now
    );
  }

  /**
   * Record provider failure
   */
  recordProviderFailure(providerName, modelName, error) {
    const now = Date.now();

    // Use dedicated recordFailure query (params: provider_name, model_name, last_failure, last_error)
    this.providerHealthQueries.recordFailure.run(
      providerName,
      modelName,
      now,
      error.message || 'Unknown error'
    );

    // Check if we need to open circuit breaker
    const health = this.getProviderHealth(providerName, modelName);
    const threshold = parseInt(process.env.AI_CIRCUIT_FAILURE_THRESHOLD || '5');

    if (health.consecutive_failures >= threshold && health.circuit_breaker_state === 'closed') {
      // Open circuit breaker
      this.providerHealthQueries.updateCircuitBreaker.run(
        'open',
        now,
        'degraded',
        providerName,
        modelName
      );
      console.warn(`🔴 Circuit breaker OPENED for ${providerName}/${modelName} (${health.consecutive_failures} failures)`);
    }
  }

  /**
   * Check if circuit breaker should reset to half-open
   */
  shouldAttemptReset(providerName, modelName) {
    const health = this.getProviderHealth(providerName, modelName);

    if (health.circuit_breaker_state !== 'open') {
      return false;
    }

    const now = Date.now();
    const resetTimeout = parseInt(process.env.AI_CIRCUIT_RESET_TIMEOUT_MS || '60000');
    const timeSinceOpen = now - health.circuit_opened_at;

    if (timeSinceOpen >= resetTimeout) {
      // Reset to half-open for testing using updateCircuitBreaker query
      // Params: circuit_breaker_state, circuit_opened_at, status, provider_name, model_name
      this.providerHealthQueries.updateCircuitBreaker.run(
        'half-open',
        health.circuit_opened_at,
        health.status,
        providerName,
        modelName
      );

      console.log(`🟡 Circuit breaker HALF-OPEN for ${providerName}/${modelName} (testing...)`);
      return true;
    }

    return false;
  }

  /**
   * Is provider available? (circuit breaker check)
   */
  isProviderAvailable(providerName, modelName) {
    const health = this.getProviderHealth(providerName, modelName);

    // Check if we should attempt reset
    if (health.circuit_breaker_state === 'open') {
      this.shouldAttemptReset(providerName, modelName);
      // Re-fetch health after potential reset
      const updatedHealth = this.getProviderHealth(providerName, modelName);
      return updatedHealth.circuit_breaker_state !== 'open';
    }

    return true;
  }

  // ============================================
  // POOL STATS
  // ============================================

  /**
   * Get global pool statistics
   */
  getPoolStats() {
    const today = this.getTodayDateString();
    // Use getAllToday instead of getDailyTotal (which doesn't exist)
    const allProviderQuotas = this.providerQuotaQueries.getAllToday.all() || [];

    let totalRequestsUsed = 0;
    let totalTokensUsed = 0;
    let totalRequestsRemaining = 0;
    let totalTokensRemaining = 0;

    allProviderQuotas.forEach(quota => {
      totalRequestsUsed += quota.requests_count;
      totalTokensUsed += quota.tokens_used;
      totalRequestsRemaining += quota.requests_remaining;
      totalTokensRemaining += quota.tokens_remaining;
    });

    // Calculate pool capacity
    const poolCapacity = POOL_CONFIG.totalDailyRequests;
    const poolUsagePercent = (totalRequestsUsed / poolCapacity) * 100;

    return {
      date: today,
      requestsUsed: totalRequestsUsed,
      tokensUsed: totalTokensUsed,
      requestsRemaining: totalRequestsRemaining,
      tokensRemaining: totalTokensRemaining,
      poolCapacity,
      poolUsagePercent,
      timestamp: Date.now()
    };
  }

  /**
   * Get active users count
   */
  getActiveUsersCount(hours = 24) {
    // Use getActiveCount (not getActiveUsersCount)
    const count = this.activeUsersQueries.getActiveCount.get();
    return count?.count || 0;
  }

  /**
   * Get quota remaining percentage
   */
  getQuotaRemainingPercent() {
    const stats = this.getPoolStats();
    return (stats.requestsRemaining / stats.poolCapacity) * 100;
  }

  // ============================================
  // UTILITIES
  // ============================================

  /**
   * Get today's date as YYYY-MM-DD string
   */
  getTodayDateString() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  /**
   * Get model key from model name and config
   */
  getModelKey(modelName, config) {
    for (const [key, model] of Object.entries(config.models)) {
      if (model.id === modelName) {
        return key;
      }
    }
    return null;
  }

  /**
   * Reset daily quotas (should be called by cron job at midnight)
   */
  resetDailyQuotas() {
    // User quotas reset automatically via date-based queries
    // Provider quotas should be re-initialized from config
    const today = this.getTodayDateString();

    Object.entries(PROVIDER_CONFIG).forEach(([providerName, config]) => {
      Object.entries(config.models).forEach(([, model]) => {
        this.providerQuotaQueries.upsert.run(
          providerName,
          model.id,
          today,
          0,
          0,
          model.quotas.rpd || 0,
          model.quotas.tpd || 0,
          null
        );
      });
    });

    console.log(`✅ Daily quotas reset for ${today}`);
  }
}

// Singleton instance
export const quotaService = new QuotaService();
export default quotaService;
