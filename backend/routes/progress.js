import express from 'express';
import progressQueries from '../db/progress.js';
import db from '../db/database.js';
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

router.use('/progress/:userId', requireAuth, ensureOwnUser);

// GET /api/progress/:userId/intro-videos - Get intro video status for all modules
router.get('/progress/:userId/intro-videos', (req, res) => {
    try {
        const { userId } = req.params;
        const videos = progressQueries.getIntroVideos.all(userId);

        // Convert to object keyed by module
        const result = {};
        for (const v of videos) {
            result[v.module] = { watched: v.watched === 1, completed: v.completed === 1 };
        }
        res.json(result);
    } catch (error) {
        console.error('Error getting intro videos:', error);
        res.status(500).json({ error: 'Failed to get intro videos status' });
    }
});

// GET /api/progress/:userId/summary - Fast summary across all modules
router.get('/progress/:userId/summary', (req, res) => {
    try {
        const { userId } = req.params;
        const rows = progressQueries.getSummaryByModule.all(userId);
        const normalized = rows.map((row) => ({
            module: row.module,
            rowsCount: Number(row.rows_count || 0),
            completedCount: Number(row.completed_count || 0),
            watchedCount: Number(row.watched_count || 0),
        }));
        const totalRows = normalized.reduce((sum, row) => sum + row.rowsCount, 0);

        res.json({ totalRows, modules: normalized });
    } catch (error) {
        console.error('Error getting progress summary:', error);
        res.status(500).json({ error: 'Failed to get progress summary' });
    }
});

// GET /api/progress/:userId/:module - Get all progress for a module
router.get('/progress/:userId/:module', (req, res) => {
    try {
        const { userId, module } = req.params;
        const progress = progressQueries.getByModule.all(userId, module);
        res.json({ progress });
    } catch (error) {
        console.error('Error getting progress:', error);
        res.status(500).json({ error: 'Failed to get progress' });
    }
});

// POST /api/progress/:userId/watched - Mark content as watched
router.post('/progress/:userId/watched', (req, res) => {
    try {
        const { userId } = req.params;
        const { contentType, module, contentId } = req.body;

        progressQueries.markWatched.run(userId, contentType, module, contentId);
        res.json({ success: true });
    } catch (error) {
        console.error('Error marking watched:', error);
        res.status(500).json({ error: 'Failed to mark as watched' });
    }
});

// POST /api/progress/:userId/completed - Mark content as completed
router.post('/progress/:userId/completed', (req, res) => {
    try {
        const { userId } = req.params;
        const { contentType, module, contentId } = req.body;

        progressQueries.markCompleted.run(userId, contentType, module, contentId);
        res.json({ success: true });
    } catch (error) {
        console.error('Error marking completed:', error);
        res.status(500).json({ error: 'Failed to mark as completed' });
    }
});

// POST /api/progress/:userId/update - Update progress with position
router.post('/progress/:userId/update', (req, res) => {
    try {
        const { userId } = req.params;
        const { contentType, module, contentId, progressPercent, lastPosition } = req.body;

        const watched = 1;
        const completed = contentType === 'chapter'
            ? 0
            : progressPercent >= 90 ? 1 : 0;

        progressQueries.upsert.run(
            userId, contentType, module, contentId,
            watched, completed, progressPercent, lastPosition
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// POST /api/progress/:userId/study-time - Add study time for a chapter
router.post('/progress/:userId/study-time', (req, res) => {
    try {
        const { userId } = req.params;
        const { module, contentId, seconds } = req.body;

        if (!module || !contentId || !seconds || seconds <= 0) {
            return res.status(400).json({ error: 'Missing or invalid parameters' });
        }

        progressQueries.upsertStudyTime.run(userId, module, contentId, seconds);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating study time:', error);
        res.status(500).json({ error: 'Failed to update study time' });
    }
});

// GET /api/progress/:userId/learning - Get normalized learning state (chapters + resources)
router.get('/progress/:userId/learning', (req, res) => {
    try {
        const { userId } = req.params;
        const rows = progressQueries.getLearningAll.all(userId);
        res.json({ rows });
    } catch (error) {
        console.error('Error getting learning progress:', error);
        res.status(500).json({ error: 'Failed to get learning progress' });
    }
});

// POST /api/progress/:userId/learning/sync - Bulk upsert learning state
router.post('/progress/:userId/learning/sync', (req, res) => {
    try {
        const { userId } = req.params;
        const rows = Array.isArray(req.body?.rows) ? req.body.rows : null;
        if (!rows) {
            return res.status(400).json({ error: 'rows array is required' });
        }
        if (rows.length > 5000) {
            return res.status(413).json({ error: 'Too many rows in one sync request' });
        }

        const upsertMany = db.transaction((items) => {
            for (const row of items) {
                const entryKind = String(row?.entryKind || '');
                if (entryKind !== 'chapter' && entryKind !== 'resource') continue;
                const moduleKey = String(row?.moduleKey || '').trim();
                const entryId = String(row?.entryId || '').trim();
                if (!moduleKey || !entryId) continue;

                progressQueries.upsertLearning.run(
                    userId,
                    moduleKey,
                    entryKind,
                    entryId,
                    row?.chapterStartedAt ?? null,
                    row?.chapterLastReadAt ?? null,
                    Number(row?.chapterTimeSpentSeconds || 0),
                    Number(row?.chapterScrollProgress || 0),
                    row?.chapterIsReadComplete ? 1 : 0,
                    Number(row?.chapterQcmAttempts || 0),
                    Number(row?.chapterQcmBestScore || 0),
                    row?.chapterQcmCompletedAt ?? null,
                    row?.chapterIsCompleted ? 1 : 0,
                    row?.chapterCompletedAt ?? null,
                    row?.resourceType ?? null,
                    Number(row?.resourceVisits || 0),
                    Number(row?.resourceTimeSpentSeconds || 0),
                    row?.resourceIsCompleted ? 1 : 0,
                    row?.resourceFirstAccessedAt ?? null,
                    row?.resourceLastAccessedAt ?? null,
                    row?.resourceCompletedAt ?? null
                );
            }
        });

        upsertMany(rows);
        res.json({ success: true, upserted: rows.length });
    } catch (error) {
        console.error('Error syncing learning progress:', error);
        res.status(500).json({ error: 'Failed to sync learning progress' });
    }
});

// POST /api/progress/:userId/qcm/attempt - Save one QCM attempt
router.post('/progress/:userId/qcm/attempt', (req, res) => {
    try {
        const { userId } = req.params;
        const moduleKey = String(req.body?.moduleKey || '').trim();
        const qcmId = String(req.body?.qcmId || '').trim();
        const modeRaw = String(req.body?.mode || '').trim().toLowerCase();
        const mode = modeRaw === 'exam' ? 'exam' : 'learning';

        const score = Math.max(0, Math.min(100, Number(req.body?.score || 0)));
        const timeSpentMs = Math.max(0, Math.floor(Number(req.body?.timeSpentMs || 0)));
        const totalQuestions = Math.max(0, Math.floor(Number(req.body?.totalQuestions || 0)));
        const correctAnswers = Math.max(0, Math.floor(Number(req.body?.correctAnswers || 0)));
        const completedAt = String(req.body?.completedAt || '').trim() || new Date().toISOString();

        if (!moduleKey || !qcmId) {
            return res.status(400).json({ error: 'moduleKey and qcmId are required' });
        }
        if (!/^[a-z0-9:-]{2,64}$/i.test(moduleKey)) {
            return res.status(400).json({ error: 'Invalid moduleKey format' });
        }
        if (!/^[a-z0-9:_-]{2,120}$/i.test(qcmId)) {
            return res.status(400).json({ error: 'Invalid qcmId format' });
        }
        if (!Number.isFinite(score) || !Number.isFinite(timeSpentMs) || !Number.isFinite(totalQuestions) || !Number.isFinite(correctAnswers)) {
            return res.status(400).json({ error: 'Invalid numeric values' });
        }

        progressQueries.insertQcmAttempt.run(
            userId,
            moduleKey,
            qcmId,
            score,
            timeSpentMs,
            totalQuestions,
            correctAnswers,
            mode,
            completedAt
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving QCM attempt:', error);
        res.status(500).json({ error: 'Failed to save QCM attempt' });
    }
});

// GET /api/progress/:userId/qcm/stats?moduleKey=... - Aggregated QCM stats for module
router.get('/progress/:userId/qcm/stats', (req, res) => {
    try {
        const { userId } = req.params;
        const moduleKey = String(req.query?.moduleKey || '').trim();
        if (!moduleKey) {
            return res.status(400).json({ error: 'moduleKey is required' });
        }
        if (!/^[a-z0-9:-]{2,64}$/i.test(moduleKey)) {
            return res.status(400).json({ error: 'Invalid moduleKey format' });
        }

        const attempts = progressQueries.getQcmAttemptsByModule.all(userId, moduleKey);
        const statsById = {};

        for (const row of attempts) {
            const qcmId = String(row.qcm_id || '');
            if (!qcmId) continue;

            if (!statsById[qcmId]) {
                statsById[qcmId] = {
                    attempts: 0,
                    averageScore: null,
                    lastScore: null,
                    lastFiveScores: [],
                    bestScore: null,
                    sumScores: 0,
                };
            }

            const stats = statsById[qcmId];
            const score = Math.max(0, Math.min(100, Number(row.score || 0)));

            stats.attempts += 1;
            stats.sumScores += score;
            if (stats.lastScore === null) stats.lastScore = score;
            if (stats.bestScore === null || score > stats.bestScore) stats.bestScore = score;
            if (stats.lastFiveScores.length < 5) stats.lastFiveScores.push(score);
        }

        for (const stats of Object.values(statsById)) {
            stats.averageScore = stats.attempts > 0
                ? Math.round((stats.sumScores / stats.attempts) * 10) / 10
                : null;
            delete stats.sumScores;
        }

        res.json({ statsById });
    } catch (error) {
        console.error('Error getting QCM stats:', error);
        res.status(500).json({ error: 'Failed to get QCM stats' });
    }
});

export default router;
