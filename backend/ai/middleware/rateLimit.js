import quotaService from '../services/QuotaService.js';
import { BASE_RATE_LIMITS } from '../config/rateLimits.js';
import aiQueries from '../../db/aiQueries.js';

const FREE_WEEKLY_REQUESTS_LIMIT = 5;
const WEEK_SECONDS = 7 * 24 * 60 * 60;

/**
 * Adaptive Rate Limiting Middleware
 *
 * Enforces user rate limits with adaptive logic based on:
 * - Global pool quota
 * - Number of active users
 * - Individual user behavior
 */

export async function aiRateLimiter(req, res, next) {
    const userId = req.user?.uid;
    const tier = req.user?.tier || 'free';

    if (!userId) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'User authentication required'
        });
    }

    try {
        // 0. Strict free plan cap: 5 requests per rolling 7 days
        if (tier === 'free') {
            const since = Math.floor(Date.now() / 1000) - WEEK_SECONDS;
            const weekly = aiQueries.chatHistory.getUserCountSince.get(userId, since);
            const used = weekly?.count || 0;
            if (used >= FREE_WEEKLY_REQUESTS_LIMIT) {
                return res.status(429).json({
                    error: 'WeeklyLimitExceeded',
                    message: `Free plan limit reached (${FREE_WEEKLY_REQUESTS_LIMIT} requetes IA / 7 jours). Passe en Premium pour un acces continu.`,
                    retryAfter: WEEK_SECONDS,
                    quota: {
                        used,
                        limit: FREE_WEEKLY_REQUESTS_LIMIT,
                    }
                });
            }
        }

        // 1. Check if user is in cooldown
        const cooldownStatus = quotaService.checkCooldown(userId);
        if (cooldownStatus.inCooldown) {
            return res.status(429).json({
                error: 'RateLimitExceeded',
                message: `You've exceeded the hourly rate limit. Please wait ${cooldownStatus.secondsRemaining} seconds.`,
                retryAfter: cooldownStatus.secondsRemaining,
                reason: cooldownStatus.reason
            });
        }

        // 2. Check burst rate (anti-spam)
        const burstStatus = quotaService.checkBurstRate(userId);
        if (burstStatus.exceeded) {
            // Set short cooldown
            quotaService.setCooldown(userId, 2); // 2 minutes

            return res.status(429).json({
                error: 'BurstLimitExceeded',
                message: 'Too many requests in a short time. Please slow down.',
                retryAfter: 120,
                limit: burstStatus.limit
            });
        }

        // 3. Get adaptive daily limit
        const adaptiveLimit = await quotaService.getAdaptiveLimit(userId, tier);
        const userQuota = quotaService.getUserQuotaToday(userId);

        if (userQuota.requests_count >= adaptiveLimit.maxRequests) {
            return res.status(429).json({
                error: 'DailyLimitExceeded',
                message: `Daily limit reached (${adaptiveLimit.maxRequests} requests). Try again tomorrow.`,
                retryAfter: adaptiveLimit.resetsIn,
                quota: {
                    used: userQuota.requests_count,
                    limit: adaptiveLimit.maxRequests,
                    resetsAt: adaptiveLimit.resetsAt
                }
            });
        }

        // 4. Check hourly rate
        const recentRequests = quotaService.getRecentRequests(userId, 3600); // Last hour
        const hourlyLimit = BASE_RATE_LIMITS[tier].softLimits.requestsPerHour;

        if (recentRequests >= hourlyLimit) {
            // Set cooldown
            const cooldownMinutes = BASE_RATE_LIMITS[tier].cooldowns.afterHourlyLimit;
            quotaService.setCooldown(userId, cooldownMinutes);

            return res.status(429).json({
                error: 'HourlyLimitExceeded',
                message: `Too many requests in the last hour (${recentRequests}/${hourlyLimit}). Cooldown activated.`,
                retryAfter: cooldownMinutes * 60,
                quota: {
                    used: recentRequests,
                    limit: hourlyLimit
                }
            });
        }

        // 5. Attach quota info to request
        req.quotaInfo = {
            userId,
            tier,
            requestsUsed: userQuota.requests_count,
            tokensUsed: userQuota.tokens_used,
            requestsLimit: tier === 'free' ? FREE_WEEKLY_REQUESTS_LIMIT : adaptiveLimit.maxRequests,
            requestsRemaining: tier === 'free'
                ? Math.max(0, FREE_WEEKLY_REQUESTS_LIMIT - (aiQueries.chatHistory.getUserCountSince.get(userId, Math.floor(Date.now() / 1000) - WEEK_SECONDS)?.count || 0))
                : (adaptiveLimit.maxRequests - userQuota.requests_count)
        };

        // 6. Check global pool quota (warning only)
        const poolStats = quotaService.getPoolStats();
        const quotaRemainingPercent = (poolStats.requestsRemaining / poolStats.poolCapacity) * 100;

        if (quotaRemainingPercent < 10) {
            console.warn(`⚠️ Global pool quota low: ${quotaRemainingPercent.toFixed(1)}%`);
            // Could optionally return 503 here if quota is critically low
        }

        // All checks passed
        next();
    } catch (error) {
        console.error('Rate limit middleware error:', error);

        // Fail open: allow request but log error
        next();
    }
}

/**
 * Post-request quota update middleware
 * Call this AFTER successful AI response
 */
export function updateUserQuota(userId, tokensUsed) {
    try {
        quotaService.incrementUserQuota(userId, tokensUsed);
    } catch (error) {
        console.error('Failed to update user quota:', error);
    }
}

export default { aiRateLimiter, updateUserQuota };
