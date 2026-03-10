/**
 * Admin Routes
 * Accessible to emails listed in ADMIN_EMAILS.
 */

import express from 'express';
import { requireAuth } from '../ai/middleware/auth.js';
import db from '../db/database.js';
import '../db/progress.js';
import admin from 'firebase-admin';
import { initializeFirebaseAdmin } from '../config/firebase.js';
import { aiRouter } from '../ai/core/AIRouter.js';
import { isAdminUser } from '../utils/adminAccess.js';
import { getEditionPreview, getRunsByDate, runPipeline } from '../oiko/pipeline.ts';
import { getOikoAdminOverview } from '../oiko/usage.ts';

const router = express.Router();

const DEFAULT_PUBLIC_CONFIG = {
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
    notifications: [],
};

function normalizePublicConfig(input = {}) {
    const safeBadges = {};
    const rawBadges = input?.courseBadges && typeof input.courseBadges === 'object' ? input.courseBadges : {};
    for (const [key, value] of Object.entries(rawBadges)) {
        if (!/^s[34]:[a-z0-9-]+:[a-z0-9-]+$/i.test(key)) continue;
        const normalized = String(value || '').toLowerCase();
        if (normalized === 'new' || normalized === 'soon' || normalized === '') {
            safeBadges[key.toLowerCase()] = normalized;
        }
    }

    const safeNotifications = Array.isArray(input?.notifications)
        ? input.notifications
            .slice(0, 50)
            .map((notif, index) => ({
                id: Number(notif?.id) || index + 1,
                subject: String(notif?.subject || '').trim().slice(0, 60),
                chapter: String(notif?.chapter || '').trim().slice(0, 180),
                time: String(notif?.time || '').trim().slice(0, 40),
                subjectKey: ['macro', 'micro', 'stats', 'socio', 'management'].includes(String(notif?.subjectKey || '').toLowerCase())
                    ? String(notif?.subjectKey || '').toLowerCase()
                    : 'macro',
                createdAt: Number(notif?.createdAt) > 0 ? Number(notif.createdAt) : Date.now(),
                expiresInHours: Number(notif?.expiresInHours) >= 0 ? Number(notif.expiresInHours) : 168,
            }))
            .filter((notif) => notif.subject && notif.chapter)
        : [];

    return {
        courseBadges: safeBadges,
        notifications: safeNotifications,
    };
}

function getPublicConfig() {
    try {
        const row = db.prepare(`SELECT value FROM site_settings WHERE key = 'public_config'`).get();
        if (!row?.value) return DEFAULT_PUBLIC_CONFIG;
        const parsed = JSON.parse(row.value);
        return {
            ...DEFAULT_PUBLIC_CONFIG,
            ...normalizePublicConfig(parsed),
        };
    } catch (_e) {
        return DEFAULT_PUBLIC_CONFIG;
    }
}

function sendPublicConfig(res) {
    res.set('Cache-Control', 'no-store');
    res.json(getPublicConfig());
}

// Middleware to check admin access
function requireAdmin(req, res, next) {
    if (!isAdminUser(req.user)) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Admin access required'
        });
    }
    next();
}

/**
 * GET /api/site-config
 * Public config for frontend (course badges + topbar notifications)
 */
router.get('/site-config', (_req, res) => {
    sendPublicConfig(res);
});

/**
 * GET /api/admin/site-config
 * Admin-only read of public config
 */
router.get('/admin/site-config', requireAuth, requireAdmin, (_req, res) => {
    sendPublicConfig(res);
});

/**
 * PUT /api/admin/site-config
 * Admin-only update of public config
 */
router.put('/admin/site-config', requireAuth, requireAdmin, (req, res) => {
    try {
        const nextConfig = normalizePublicConfig(req.body || {});
        db.prepare(`
            INSERT INTO site_settings (key, value, updated_at)
            VALUES ('public_config', ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET
              value = excluded.value,
              updated_at = CURRENT_TIMESTAMP
        `).run(JSON.stringify(nextConfig));

        res.json({ success: true, config: nextConfig });
    } catch (error) {
        console.error('Admin site config update error:', error);
        res.status(500).json({ error: 'Failed to update site config' });
    }
});

/**
 * GET /api/admin/stats
 * Get comprehensive admin statistics with real user data
 */
router.get('/admin/stats', requireAuth, requireAdmin, async (req, res) => {
    try {
        let firebaseUsers = [];
        const isDev = process.env.NODE_ENV === 'development';

        try {
            // Fetch all users (with pagination) when Firebase Admin is available.
            await initializeFirebaseAdmin();
            let pageToken;
            do {
                const listUsersResult = await admin.auth().listUsers(1000, pageToken);
                firebaseUsers.push(...listUsersResult.users);
                pageToken = listUsersResult.pageToken;
            } while (pageToken);
        } catch (firebaseError) {
            if (!isDev) {
                throw firebaseError;
            }
            // Dev fallback: keep dashboard usable even without Admin SDK credentials.
            firebaseUsers = [{
                uid: req.user.uid,
                email: req.user.email,
                displayName: (req.user.email || 'admin').split('@')[0],
                photoURL: null,
                metadata: {
                    creationTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                }
            }];
        }

        // 2. Get AI usage data
        const usersAIUsage = db.prepare(`
            SELECT
                firebase_uid as uid,
                SUM(requests_count) as requests_used,
                SUM(tokens_used) as tokens_used,
                MAX(last_request_at) as last_activity_at
            FROM ai_user_quotas
            GROUP BY firebase_uid
        `).all();

        // 3. Get subscription data
        const subscriptions = db.prepare(`SELECT * FROM subscriptions`).all();
        const subscriptionMap = {};
        subscriptions.forEach(sub => {
            subscriptionMap[sub.user_id] = sub;
        });

        // 4. Get today's requests per user
        const todayRequests = db.prepare(`
            SELECT
                firebase_uid,
                COUNT(*) as today_count
            FROM ai_chat_history
            WHERE DATE(created_at, 'unixepoch') = DATE('now')
            GROUP BY firebase_uid
        `).all();
        const todayRequestsMap = {};
        todayRequests.forEach(tr => {
            todayRequestsMap[tr.firebase_uid] = tr.today_count;
        });

        // 4b. Get study progress aggregates
        const studyProgress = db.prepare(`
            SELECT
                firebase_uid as uid,
                COALESCE(SUM(time_spent_seconds), 0) as study_time_seconds,
                SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_items,
                MAX(strftime('%s', updated_at)) as last_study_at
            FROM user_progress
            GROUP BY firebase_uid
        `).all();
        const studyProgressMap = {};
        studyProgress.forEach(entry => {
            studyProgressMap[entry.uid] = entry;
        });

        const userPresenceRows = db.prepare(`
            SELECT
                firebase_uid as uid,
                COALESCE(last_seen_at, strftime('%s', updated_at)) as last_seen_at
            FROM users
        `).all();
        const userPresenceMap = {};
        userPresenceRows.forEach(entry => {
            userPresenceMap[entry.uid] = entry;
        });

        // 5. Merge all user data
        const aiUsageMap = {};
        usersAIUsage.forEach(u => {
            aiUsageMap[u.uid] = u;
        });

        const normalizeTimestampMs = (value) => {
            const numeric = Number(value);
            if (!Number.isFinite(numeric) || numeric <= 0) return null;
            return numeric < 1e12 ? numeric * 1000 : numeric;
        };

        const users = firebaseUsers.map(fbUser => {
            const aiUsage = aiUsageMap[fbUser.uid] || { requests_used: 0, tokens_used: 0, last_activity_at: null };
            const studyStats = studyProgressMap[fbUser.uid] || { study_time_seconds: 0, completed_items: 0, last_study_at: null };
            const presenceStats = userPresenceMap[fbUser.uid] || { last_seen_at: null };
            const subscription = subscriptionMap[fbUser.uid];
            const tier = subscription?.tier || 'free';
            const requestsLimit = tier === 'premium' ? 200 : 50;
            const aiLastActive = normalizeTimestampMs(aiUsage.last_activity_at);
            const studyLastActive = normalizeTimestampMs(studyStats.last_study_at);
            const presenceLastActive = normalizeTimestampMs(presenceStats.last_seen_at);
            const mergedLastActive = [presenceLastActive, aiLastActive, studyLastActive]
                .filter((value) => Number.isFinite(value) && value > 0)
                .reduce((latest, value) => Math.max(latest, value), 0) || null;

            return {
                uid: fbUser.uid,
                email: fbUser.email || 'unknown@example.com',
                displayName: fbUser.displayName || 'Unknown User',
                photoURL: fbUser.photoURL || null,
                createdAt: new Date(fbUser.metadata.creationTime).getTime(),
                lastActive: mergedLastActive,
                tier: tier,
                studyTimeSeconds: studyStats.study_time_seconds || 0,
                completedLessons: studyStats.completed_items || 0,
                aiUsage: {
                    requestsToday: todayRequestsMap[fbUser.uid] || 0,
                    requestsLimit: requestsLimit,
                    tokensUsed: aiUsage.tokens_used || 0
                }
            };
        });

        // 6. Get AI stats from chat history
        const aiStats = db.prepare(`
            SELECT
                COUNT(*) as total_requests,
                SUM(tokens_used) as total_tokens,
                SUM(CASE WHEN DATE(created_at, 'unixepoch') = DATE('now') THEN 1 ELSE 0 END) as today_requests
            FROM ai_chat_history
        `).get();

        console.log('ðŸ“Š AI Stats from DB:', aiStats);

        // 7. Get provider stats from AIRouter (real-time data with quotas)
        const providerStatsFromRouter = await aiRouter.getProviderStats();

        // Transform to match frontend format
        const providers = [];
        for (const [providerName, providerData] of Object.entries(providerStatsFromRouter)) {
            for (const modelData of providerData.models) {
                providers.push({
                    provider: providerName,
                    model: modelData.model,
                    status: modelData.health.status,
                    circuitState: modelData.health.circuitBreaker,
                    successCount: modelData.health.successCount,
                    failureCount: modelData.health.failureCount,
                    quota: {
                        requestsUsed: modelData.quota.requestsCount || 0,
                        requestsRemaining: modelData.quota.requestsRemaining || 0,
                        tokensUsed: modelData.quota.tokensUsed || 0,
                        tokensRemaining: modelData.quota.tokensRemaining || 0
                    }
                });
            }
        }

        // 9. Get daily stats (last 30 days)
        const dailyStats = db.prepare(`
            SELECT
                DATE(created_at, 'unixepoch') as date,
                COUNT(*) as requests,
                SUM(tokens_used) as tokens
            FROM ai_chat_history
            WHERE created_at >= strftime('%s', 'now', '-30 days')
            GROUP BY DATE(created_at, 'unixepoch')
            ORDER BY date DESC
        `).all();

        // 9b. Lifetime stats (all-time totals)
        const lifetimeStats = db.prepare(`
            SELECT
                COUNT(*) as total_requests,
                COALESCE(SUM(tokens_used), 0) as total_tokens,
                MIN(created_at) as first_request_at,
                COUNT(DISTINCT firebase_uid) as unique_users,
                COUNT(DISTINCT DATE(created_at, 'unixepoch')) as active_days
            FROM ai_chat_history
        `).get();

        // 9c. Weekly stats (last 12 weeks)
        const weeklyStats = db.prepare(`
            SELECT
                strftime('%Y-W%W', created_at, 'unixepoch') as week,
                COUNT(*) as requests,
                COALESCE(SUM(tokens_used), 0) as tokens,
                COUNT(DISTINCT firebase_uid) as unique_users
            FROM ai_chat_history
            WHERE created_at >= strftime('%s', 'now', '-12 weeks')
            GROUP BY strftime('%Y-W%W', created_at, 'unixepoch')
            ORDER BY week ASC
        `).all();

        // 9d. Monthly stats (last 12 months)
        const monthlyStats = db.prepare(`
            SELECT
                strftime('%Y-%m', created_at, 'unixepoch') as month,
                COUNT(*) as requests,
                COALESCE(SUM(tokens_used), 0) as tokens,
                COUNT(DISTINCT firebase_uid) as unique_users
            FROM ai_chat_history
            WHERE created_at >= strftime('%s', 'now', '-12 months')
            GROUP BY strftime('%Y-%m', created_at, 'unixepoch')
            ORDER BY month ASC
        `).all();

        // 9e. Recent activity (last 100 requests with details including answer)
        const recentActivity = db.prepare(`
            SELECT
                id,
                firebase_uid,
                question,
                answer,
                provider_used,
                model_used,
                tokens_used,
                response_time_ms,
                complexity_category,
                created_at
            FROM ai_chat_history
            ORDER BY created_at DESC
            LIMIT 100
        `).all();

        // 9f. Today's stats by provider/model
        const todayByProvider = db.prepare(`
            SELECT
                provider_used,
                model_used,
                COUNT(*) as requests,
                COALESCE(SUM(tokens_used), 0) as tokens,
                AVG(response_time_ms) as avg_latency
            FROM ai_chat_history
            WHERE DATE(created_at, 'unixepoch') = DATE('now')
            GROUP BY provider_used, model_used
        `).all();

        // 10. Get hourly stats (last 24 hours) for detailed view
        const hourlyStats = db.prepare(`
            SELECT
                strftime('%Y-%m-%d %H:00', created_at, 'unixepoch') as datetime,
                COUNT(*) as requests,
                SUM(tokens_used) as tokens
            FROM ai_chat_history
            WHERE created_at >= strftime('%s', 'now', '-24 hours')
            GROUP BY strftime('%Y-%m-%d %H:00', created_at, 'unixepoch')
            ORDER BY datetime ASC
        `).all();

        // Generate complete hourly timeline (fill missing hours with 0)
        const now = new Date();
        const hourlyTimeline = [];
        for (let i = 23; i >= 0; i--) {
            const hourDate = new Date(now.getTime() - i * 60 * 60 * 1000);
            hourDate.setMinutes(0, 0, 0);
            const dateStr = hourDate.toISOString().slice(0, 13) + ':00';
            const localDateStr = `${hourDate.getFullYear()}-${String(hourDate.getMonth() + 1).padStart(2, '0')}-${String(hourDate.getDate()).padStart(2, '0')} ${String(hourDate.getHours()).padStart(2, '0')}:00`;

            const existing = hourlyStats.find(h => h.datetime === localDateStr);
            hourlyTimeline.push({
                datetime: dateStr,
                hour: hourDate.getHours(),
                requests: existing?.requests || 0,
                tokens: existing?.tokens || 0
            });
        }

        // 10. Get pool quota stats
        const poolStats = db.prepare(`
            SELECT * FROM ai_pool_stats WHERE id = 1
        `).get();

        // 11. Count active users
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        const activeUsers = users.filter((u) => u.lastActive && u.lastActive >= fiveMinAgo).length;

        // 12. Count premium users
        const premiumCount = subscriptions.filter(s => s.status === 'active').length;

        // Calculate total tokens used and limits from all providers
        let totalTokensUsed = 0;
        let totalTokensLimit = 0;
        let totalRequestsUsed = 0;
        let totalRequestsLimit = 0;

        providers.forEach(p => {
            totalTokensUsed += p.quota.tokensUsed || 0;
            totalRequestsUsed += p.quota.requestsUsed || 0;
        });

        // Token limits per day from config
        const tokenLimits = {
            'groq': {
                'llama-3.1-8b-instant': 500000,
                'llama-3.3-70b-versatile': 100000
            },
            'gemini': {
                'gemini-2.0-flash-exp': 10000000
            },
            'openrouter': {
                'meta-llama/llama-3.1-8b-instruct:free': 1000000
            }
        };

        // Request limits per day
        const requestLimits = {
            'groq': {
                'llama-3.1-8b-instant': 14400,
                'llama-3.3-70b-versatile': 1000
            },
            'gemini': {
                'gemini-2.0-flash-exp': 250
            },
            'openrouter': {
                'meta-llama/llama-3.1-8b-instruct:free': 200
            }
        };

        // Calculate totals from config
        Object.values(tokenLimits).forEach(models => {
            Object.values(models).forEach(limit => {
                totalTokensLimit += limit;
            });
        });
        Object.values(requestLimits).forEach(models => {
            Object.values(models).forEach(limit => {
                totalRequestsLimit += limit;
            });
        });

        // Add limits to each provider
        const providersWithLimits = providers.map(p => ({
            ...p,
            quota: {
                ...p.quota,
                tokensLimit: tokenLimits[p.provider]?.[p.model] || 0,
                requestsLimit: requestLimits[p.provider]?.[p.model] || 0
            }
        }));

        res.json({
            stats: {
                users: {
                    total: users.length,
                    active: activeUsers,
                    premium: premiumCount
                },
                ai: {
                    totalRequests: aiStats?.total_requests || 0,
                    todayRequests: aiStats?.today_requests || 0,
                    totalTokens: aiStats?.total_tokens || 0
                },
                subscriptions: {
                    active: premiumCount,
                    mrr: 0
                }
            },
            users: users.sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0)),
            providers: providersWithLimits,
            dailyStats: dailyStats,
            hourlyStats: hourlyTimeline,
            weeklyStats: weeklyStats,
            monthlyStats: monthlyStats,
            lifetimeStats: {
                totalRequests: lifetimeStats?.total_requests || 0,
                totalTokens: lifetimeStats?.total_tokens || 0,
                firstRequestAt: lifetimeStats?.first_request_at || null,
                uniqueUsers: lifetimeStats?.unique_users || 0,
                activeDays: lifetimeStats?.active_days || 0
            },
            recentActivity: recentActivity.map(r => ({
                id: r.id,
                userId: r.firebase_uid,
                question: r.question || '',
                answer: r.answer || '',
                provider: r.provider_used,
                model: r.model_used,
                tokens: r.tokens_used || 0,
                latencyMs: r.response_time_ms || 0,
                complexity: r.complexity_category,
                createdAt: r.created_at
            })),
            todayByProvider: todayByProvider.map(p => ({
                provider: p.provider_used,
                model: p.model_used,
                requests: p.requests,
                tokens: p.tokens,
                avgLatency: Math.round(p.avg_latency || 0)
            })),
            poolQuota: {
                requestsTotal: totalRequestsLimit,
                requestsUsed: totalRequestsUsed,
                requestsRemaining: totalRequestsLimit - totalRequestsUsed,
                tokensTotal: totalTokensLimit,
                tokensUsed: totalTokensUsed,
                tokensRemaining: totalTokensLimit - totalTokensUsed,
                resetsAt: 'daily', // Clear label that quotas reset daily
                note: 'Quotas reset at midnight UTC each day'
            }
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({
            error: 'InternalError',
            message: 'Failed to fetch admin statistics',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});


router.post('/admin/oiko-news/run', requireAuth, requireAdmin, async (req, res) => {
    try {
        const step = ['collect', 'compose', 'send', 'all'].includes(String(req.body?.step || 'all'))
            ? String(req.body?.step || 'all')
            : 'all';
        const editionDate = typeof req.body?.date === 'string' ? req.body.date : undefined;
        const dryRun = Boolean(req.body?.dryRun);
        const result = await runPipeline({ editionDate, step, dryRun });
        res.json({ success: true, result });
    } catch (error) {
        console.error('Admin Oiko run error:', error);
        res.status(500).json({ error: 'Failed to run Oiko pipeline', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
});

router.get('/admin/oiko-news/preview/:date', requireAuth, requireAdmin, (req, res) => {
    try {
        const preview = getEditionPreview(req.params.date);
        if (!preview) {
            return res.status(404).json({ error: 'Edition not found' });
        }
        res.json({ preview });
    } catch (error) {
        console.error('Admin Oiko preview error:', error);
        res.status(500).json({ error: 'Failed to fetch Oiko preview' });
    }
});

router.get('/admin/oiko-news/runs/:date', requireAuth, requireAdmin, (req, res) => {
    try {
        const runs = getRunsByDate(req.params.date);
        res.json({ runs });
    } catch (error) {
        console.error('Admin Oiko runs error:', error);
        res.status(500).json({ error: 'Failed to fetch Oiko runs' });
    }
});

router.get('/admin/oiko-news/overview', requireAuth, requireAdmin, (req, res) => {
    try {
        const requestedDate = typeof req.query?.date === 'string' ? req.query.date : undefined;
        const overview = getOikoAdminOverview(requestedDate);
        res.json({ overview });
    } catch (error) {
        console.error('Admin Oiko overview error:', error);
        res.status(500).json({ error: 'Failed to fetch Oiko overview', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
});
export default router;


