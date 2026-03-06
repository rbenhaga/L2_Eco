/**
 * Adaptive Rate Limiting Configuration
 *
 * Instead of fixed limits per user, we calculate dynamic limits based on:
 * 1. Global pool quota remaining
 * 2. Number of active users
 * 3. Time of day (peak vs off-peak)
 * 4. Individual user behavior
 */

import { POOL_CONFIG } from './providers.js';

/**
 * Base rate limits (safety thresholds)
 * These are MAXIMUM caps, actual limits are often lower and adaptive
 */
export const BASE_RATE_LIMITS = {
  free: {
    // Soft limits (warning, not blocking)
    softLimits: {
      requestsPerHour: 15,      // Warning after 15 req/hour
      requestsPerMinute: 5,     // Warning after 5 req/minute
    },

    // Hard limits (blocking)
    hardLimits: {
      requestsPerDay: 100,      // Absolute maximum per user
      requestsPerHour: 30,      // Absolute maximum per hour
      requestsPerMinute: 10,    // Burst protection
      tokensPerDay: 100000,     // Token budget per day
    },

    // Cooldowns
    cooldowns: {
      afterHourlyLimit: 10,     // minutes
      afterDailyLimit: 60,      // minutes
      afterBurst: 2             // minutes
    },

    // Anti-abuse
    cooldownMinutes: 10,        // Cooldown duration if abusing
    abuseThreshold: 3,          // Number of abuse flags before extended cooldown
    burstWindow: 60,            // Seconds to track burst (1 minute)
    burstLimit: 5,              // Max requests in burst window

    // Max burst
    maxBurst: {
      requestsPerMinute: 10
    }
  },

  premium: {
    softLimits: {
      requestsPerHour: 40,
      requestsPerMinute: 10,
    },

    hardLimits: {
      requestsPerDay: 300,
      requestsPerHour: 75,
      requestsPerMinute: 20,
      tokensPerDay: 300000,
    },

    // Cooldowns
    cooldowns: {
      afterHourlyLimit: 5,
      afterDailyLimit: 30,
      afterBurst: 1
    },

    cooldownMinutes: 5,
    abuseThreshold: 5,
    burstWindow: 60,
    burstLimit: 10,

    // Max burst
    maxBurst: {
      requestsPerMinute: 20
    }
  }
};

/**
 * Adaptive rate limit calculator
 *
 * Returns dynamic per-user limit based on current system state
 */
export class AdaptiveRateLimiter {
  /**
   * Calculate current per-user request limit
   *
   * @param {Object} poolState - Current pool state from DB
   * @param {number} poolState.quotaPoolRemaining - Remaining requests in pool
   * @param {number} poolState.activeUsersCount - Number of active users
   * @param {string} userTier - 'free' or 'premium'
   * @returns {Object} Dynamic limits for this user
   */
  static calculateDynamicLimit(poolState, userTier = 'free') {
    const { quotaPoolRemaining, activeUsersCount } = poolState;
    const baseLimits = BASE_RATE_LIMITS[userTier];

    // 1. Calculate fair share per user
    const fairSharePerUser = Math.floor(quotaPoolRemaining / Math.max(activeUsersCount, 1));

    // 2. Apply time-of-day multiplier
    const timeMultiplier = this.getTimeMultiplier();

    // 3. Calculate dynamic daily limit
    let dynamicDailyLimit = Math.min(
      fairSharePerUser * timeMultiplier,
      baseLimits.hardLimits.requestsPerDay  // Never exceed hard cap
    );

    // 4. Apply pool health thresholds
    const poolHealthPercent = (quotaPoolRemaining / POOL_CONFIG.usableQuota) * 100;

    if (poolHealthPercent < 10) {
      // Critical: <10% pool remaining
      dynamicDailyLimit = Math.floor(dynamicDailyLimit * 0.3);  // Reduce to 30%
    } else if (poolHealthPercent < 25) {
      // Low: <25% pool remaining
      dynamicDailyLimit = Math.floor(dynamicDailyLimit * 0.6);  // Reduce to 60%
    } else if (poolHealthPercent < 50) {
      // Medium: <50% pool remaining
      dynamicDailyLimit = Math.floor(dynamicDailyLimit * 0.8);  // Reduce to 80%
    }
    // Else: >50% healthy, use full dynamic limit

    // 5. Calculate hourly limit (proportional to daily)
    const dynamicHourlyLimit = Math.min(
      Math.floor(dynamicDailyLimit / 16),  // Assume 16 active hours per day
      baseLimits.hardLimits.requestsPerHour
    );

    return {
      requestsPerDay: Math.max(dynamicDailyLimit, 10),  // Minimum 10 req/day
      requestsPerHour: Math.max(dynamicHourlyLimit, 3), // Minimum 3 req/hour
      requestsPerMinute: baseLimits.hardLimits.requestsPerMinute,  // Keep burst protection
      tokensPerDay: baseLimits.hardLimits.tokensPerDay,

      // Metadata for display
      poolHealthPercent,
      fairSharePerUser,
      timeMultiplier,
      isRestricted: poolHealthPercent < 25
    };
  }

  /**
   * Get time-of-day multiplier
   * Peak hours = more users = lower per-user limit
   */
  static getTimeMultiplier() {
    const now = new Date();
    const hour = now.getHours();

    const { peakHours, offPeakMultiplier } = POOL_CONFIG;

    if (hour >= peakHours.start && hour < peakHours.end) {
      // Peak hours (9 AM - 10 PM)
      return peakHours.multiplier;  // 0.8 (reduce by 20%)
    } else {
      // Off-peak hours (10 PM - 9 AM)
      return offPeakMultiplier;  // 1.2 (increase by 20%)
    }
  }

  /**
   * Check if user is in burst (too many requests too fast)
   *
   * @param {Array} recentRequests - Recent request timestamps
   * @param {number} burstWindow - Window in seconds (default 60)
   * @param {number} burstLimit - Max requests in window
   * @returns {boolean} True if bursting
   */
  static isBursting(recentRequests, burstWindow = 60, burstLimit = 5) {
    const now = Date.now();
    const windowStart = now - (burstWindow * 1000);

    const requestsInWindow = recentRequests.filter(
      timestamp => timestamp > windowStart
    ).length;

    return requestsInWindow >= burstLimit;
  }

  /**
   * Calculate cooldown duration based on abuse severity
   *
   * @param {number} abuseFlags - Number of previous abuse flags
   * @param {number} baseMinutes - Base cooldown in minutes
   * @returns {number} Cooldown duration in milliseconds
   */
  static calculateCooldown(abuseFlags, baseMinutes = 10) {
    // Exponential backoff: 10min, 20min, 40min, 80min...
    const minutes = baseMinutes * Math.pow(2, Math.min(abuseFlags, 4));
    return minutes * 60 * 1000;  // Convert to ms
  }

  /**
   * Format rate limit info for API response
   */
  static formatLimitInfo(limits, currentUsage) {
    return {
      daily: {
        limit: limits.requestsPerDay,
        used: currentUsage.requestsToday,
        remaining: Math.max(0, limits.requestsPerDay - currentUsage.requestsToday),
        resetsAt: this.getEndOfDayTimestamp()
      },
      hourly: {
        limit: limits.requestsPerHour,
        used: currentUsage.requestsLastHour,
        remaining: Math.max(0, limits.requestsPerHour - currentUsage.requestsLastHour)
      },
      poolStatus: {
        health: limits.poolHealthPercent.toFixed(1) + '%',
        restricted: limits.isRestricted
      }
    };
  }

  /**
   * Get end of day timestamp (for daily reset)
   */
  static getEndOfDayTimestamp() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.getTime();
  }
}

/**
 * Rate limit error messages
 */
export const RATE_LIMIT_MESSAGES = {
  DAILY_LIMIT: (limit) => `You've reached your daily limit of ${limit} questions. Limit resets at midnight.`,
  HOURLY_LIMIT: (limit) => `You've sent ${limit} questions in the last hour. Please slow down a bit.`,
  BURST_LIMIT: 'Too many requests in a short time. Please wait a moment.',
  COOLDOWN: (until) => `You're in cooldown until ${new Date(until).toLocaleTimeString()}. Please try again later.`,
  POOL_CRITICAL: 'Service is experiencing high demand. Limits are temporarily reduced.',
  ABUSE_DETECTED: 'Suspicious activity detected. Your account is temporarily restricted.'
};

/**
 * Helper: Get user's tier from subscription
 */
export function getUserTier(userSubscription) {
  if (!userSubscription) return 'free';
  return userSubscription.tier === 'premium' && userSubscription.status === 'active'
    ? 'premium'
    : 'free';
}

export default {
  BASE_RATE_LIMITS,
  AdaptiveRateLimiter,
  RATE_LIMIT_MESSAGES,
  getUserTier
};
