import express from 'express';
import { requireAuth } from '../ai/middleware/auth.js';
import { aiRateLimiter, updateUserQuota } from '../ai/middleware/rateLimit.js';
import { validateChatRequest, validateFeedbackRequest } from '../ai/middleware/validate.js';
import { aiSecurityMiddlewareDev, aiCorsMiddleware } from '../ai/middleware/security.js';
import aiRouter from '../ai/core/AIRouter.js';
import semanticCacheService from '../ai/services/SemanticCacheService.js';
import quotaService from '../ai/services/QuotaService.js';
import aiQueries from '../db/aiQueries.js';

const router = express.Router();

// Apply security middleware to ALL AI routes
router.use('/ai/*', aiCorsMiddleware);        // Strict CORS
router.use('/ai/*', aiSecurityMiddlewareDev); // IP/Origin/API Key check

/**
 * POST /api/ai/chat
 * Main chat endpoint with intelligent routing and semantic caching
 */
router.post('/ai/chat', requireAuth, aiRateLimiter, validateChatRequest, async (req, res) => {
    const startTime = Date.now();
    const { question, context, conversationHistory } = req.body;
    const userId = req.user.uid;

    try {
        console.log(`\n🤖 AI Chat Request from user ${userId}`);
        console.log(`Question length: ${question.length} chars`);
        console.log(`Conversation history: ${conversationHistory?.length || 0} messages`);

        // 1. Check semantic cache
        const cacheDecision = await semanticCacheService.checkCache(question, context);

        if (cacheDecision.useCache) {
            // Cache hit! Return cached answer
            const responseTime = Date.now() - startTime;

            // Log to chat history (non-blocking)
            try {
                aiQueries.chatHistory.insert.run(
                    userId,
                    question,
                    cacheDecision.entry.answer,
                    context.courseId || null,
                    context.chapterId || null,
                    context.pageId || null,
                    'cache',
                    'cache',
                    null,
                    null,
                    null,
                    cacheDecision.similarity,
                    responseTime,
                    0,
                    cacheDecision.cacheId
                );
            } catch (error) {
                console.error('Failed to log cache hit to chat history:', error.message);
            }

            return res.json({
                answer: cacheDecision.entry.answer,
                source: 'cache',
                provider: 'cache',
                model: null,
                responseTime,
                tokensUsed: 0,
                similarity: cacheDecision.similarity,
                cacheId: cacheDecision.cacheId,
                quotaRemaining: {
                    requests: req.quotaInfo.requestsRemaining,
                    limit: req.quotaInfo.requestsLimit,
                    resetsAt: getTodayEndTimestamp()
                }
            });
        }

        // 2. Cache miss → Route to LLM with conversation history
        const llmResponse = await aiRouter.route(question, context, conversationHistory || [], userId);

        // 3. Update user quota
        updateUserQuota(userId, llmResponse.tokensUsed);

        // 4. Store in cache (async, don't wait)
        semanticCacheService.storeInCache(
            question,
            llmResponse.content,
            context,
            {
                provider: llmResponse.provider,
                model: llmResponse.model,
                tokensUsed: llmResponse.tokensUsed,
                userId
            }
        ).catch(error => {
            console.error('Failed to store in cache (non-blocking):', error.message);
        });

        // 5. Log to chat history (non-blocking)
        const responseTime = Date.now() - startTime;
        try {
            aiQueries.chatHistory.insert.run(
                userId,
                question,
                llmResponse.content,
                context.courseId || null,
                context.chapterId || null,
                context.pageId || null,
                'llm',
                llmResponse.provider,
                llmResponse.model,
                llmResponse.complexity,
                llmResponse.complexityScore,
                null,
                responseTime,
                llmResponse.tokensUsed,
                null
            );
        } catch (error) {
            console.error('Failed to log LLM response to chat history:', error.message);
        }

        // 6. Return response
        res.json({
            answer: llmResponse.content,
            source: 'llm',
            provider: llmResponse.provider,
            model: llmResponse.model,
            responseTime,
            tokensUsed: llmResponse.tokensUsed,
            complexity: llmResponse.complexity,
            complexityScore: llmResponse.complexityScore,
            quotaRemaining: {
                requests: req.quotaInfo.requestsRemaining - 1, // Subtract current request
                limit: req.quotaInfo.requestsLimit,
                resetsAt: getTodayEndTimestamp()
            }
        });
    } catch (error) {
        console.error('Chat error:', error);

        // Handle specific error types
        if (error.name === 'RateLimitError') {
            return res.status(429).json({
                error: 'ProviderRateLimitError',
                message: 'AI provider temporarily rate limited. Please try again in a moment.',
                retryAfter: error.retryAfter || 60
            });
        }

        if (error.message.includes('All providers failed')) {
            return res.status(503).json({
                error: 'ServiceUnavailable',
                message: 'AI service temporarily unavailable. Our team has been notified.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }

        // Generic error
        res.status(500).json({
            error: 'InternalError',
            message: 'An error occurred while processing your request.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * POST /api/ai/feedback
 * Submit feedback for a chat response
 */
router.post('/ai/feedback', requireAuth, validateFeedbackRequest, async (req, res) => {
    const { chatHistoryId, feedback } = req.body;
    const userId = req.user.uid;

    try {
        // Update cache entry with feedback
        const isPositive = feedback === 'positive';
        await semanticCacheService.submitFeedback(chatHistoryId, isPositive);

        // TODO: Store feedback in chat history table

        res.json({
            success: true,
            message: 'Feedback recorded. Thank you!'
        });
    } catch (error) {
        console.error('Feedback error:', error);

        res.status(500).json({
            error: 'InternalError',
            message: 'Failed to record feedback.'
        });
    }
});

/**
 * GET /api/ai/quota
 * Get current user's quota status
 */
router.get('/ai/quota', requireAuth, async (req, res) => {
    const userId = req.user.uid;
    const tier = req.user.tier || 'free';

    try {
        const userQuota = quotaService.getUserQuotaToday(userId);
        const adaptiveLimit = await quotaService.getAdaptiveLimit(userId, tier);
        const cooldownStatus = quotaService.checkCooldown(userId);
        const weekSeconds = 7 * 24 * 60 * 60;
        const weeklySince = Math.floor(Date.now() / 1000) - weekSeconds;
        const weeklyUsed = aiQueries.chatHistory.getUserCountSince.get(userId, weeklySince)?.count || 0;
        const freeWeeklyLimit = 5;
        const requestsLimit = tier === 'free' ? freeWeeklyLimit : adaptiveLimit.maxRequests;
        const requestsUsed = tier === 'free' ? weeklyUsed : userQuota.requests_count;
        const requestsRemaining = Math.max(0, requestsLimit - requestsUsed);
        const resetsAt = tier === 'free' ? (Date.now() + weekSeconds * 1000) : getTodayEndTimestamp();

        res.json({
            userId,
            tier,
            quota: {
                requestsUsed,
                requestsLimit,
                requestsRemaining,
                tokensUsed: userQuota.tokens_used,
                resetsAt
            },
            cooldown: cooldownStatus.inCooldown ? {
                active: true,
                secondsRemaining: cooldownStatus.secondsRemaining,
                reason: cooldownStatus.reason
            } : {
                active: false
            },
            poolStats: {
                quotaRemaining: quotaService.getQuotaRemainingPercent().toFixed(1) + '%'
            }
        });
    } catch (error) {
        console.error('Quota error:', error);

        res.status(500).json({
            error: 'InternalError',
            message: 'Failed to retrieve quota information.'
        });
    }
});

/**
 * GET /api/ai/health
 * Public endpoint for AI service health check
 */
router.get('/ai/health', requireAuth, async (req, res) => {
    try {
        const providerStats = await aiRouter.getProviderStats();
        const poolStats = quotaService.getPoolStats();
        const cacheAvailable = await semanticCacheService.isAvailable();

        // Determine overall health
        const healthyProviders = Object.values(providerStats).filter(p =>
            p.models.some(m => m.health.circuitBreaker === 'closed')
        ).length;

        const status = healthyProviders > 0 ? 'healthy' : 'degraded';

        res.json({
            status,
            timestamp: Date.now(),
            providers: providerStats,
            pool: {
                capacity: poolStats.poolCapacity,
                used: poolStats.requestsUsed,
                remaining: poolStats.requestsRemaining,
                usagePercent: poolStats.poolUsagePercent.toFixed(2) + '%'
            },
            cache: {
                available: cacheAvailable
            }
        });
    } catch (error) {
        console.error('Health check error:', error);

        res.status(500).json({
            status: 'error',
            message: 'Health check failed',
            error: error.message
        });
    }
});

/**
 * Utility: Get end of today timestamp
 */
function getTodayEndTimestamp() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return endOfDay.getTime();
}

export default router;
