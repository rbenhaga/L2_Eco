import express from 'express';
import { subscriptionQueries } from '../db/database.js';
import { requireAuth } from '../ai/middleware/auth.js';
import { isAdminUser } from '../utils/adminAccess.js';

const router = express.Router();

function isAdmin(req) {
    return isAdminUser(req.user);
}

function ensureOwnUser(req, res, next) {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    if (req.user?.uid !== userId && !isAdmin(req)) {
        return res.status(403).json({ error: 'Forbidden', message: 'Access denied' });
    }
    next();
}

/**
 * GET /api/subscription/:userId
 * Gets subscription status for a user
 */
router.get('/subscription/:userId', requireAuth, ensureOwnUser, (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const subscription = subscriptionQueries.getByUserId.get(userId);

        // No subscription found = free tier
        if (!subscription) {
            return res.json({
                tier: 'free',
                status: 'inactive',
                currentPeriodEnd: null,
            });
        }

        // Check if subscription is expired (if current_period_end is set)
        const now = Math.floor(Date.now() / 1000);
        if (subscription.current_period_end && subscription.current_period_end < now) {
            // Expired premium → revert to free
            subscriptionQueries.updateTier.run('free', 'inactive', null, userId);

            return res.json({
                tier: 'free',
                status: 'inactive',
                currentPeriodEnd: null,
            });
        }

        // Active subscription
        res.json({
            tier: subscription.tier,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end
                ? new Date(subscription.current_period_end * 1000).toISOString()
                : null,
        });

    } catch (error) {
        console.error('Get subscription error:', error);
        res.status(500).json({
            error: 'Failed to get subscription'
        });
    }
});

/**
 * GET /api/subscriptions/stats
 * Get subscription statistics (admin only in production)
 */
router.get('/subscriptions/stats', requireAuth, (req, res) => {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({ error: 'Forbidden', message: 'Admin access required' });
        }
        const db = subscriptionQueries.getByUserId.database;

        const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN tier = 'premium' AND status = 'active' THEN 1 ELSE 0 END) as premium_users,
        SUM(CASE WHEN tier = 'free' THEN 1 ELSE 0 END) as free_users
      FROM subscriptions
    `).get();

        res.json(stats);
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

export default router;
