import express from 'express';
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

router.use('/user/:userId', requireAuth, ensureOwnUser);

function normalizeSemester(input) {
    return String(input || '').toLowerCase() === 's4' ? 's4' : 's3';
}

function defaultYearForSemester(semester) {
    return semester === 's4' ? '2025-2026' : '2024-2025';
}

function normalizeAcademicYear(input, semester) {
    const value = String(input || '').trim().toUpperCase();
    if (/^L[1-3]$/.test(value)) return value;
    if (/^\d{4}-\d{4}$/.test(value)) return value;
    if (semester === 's3' || semester === 's4') return 'L2';
    return defaultYearForSemester(semester);
}

function getPublicConfig() {
    try {
        const row = db.prepare(`SELECT value FROM site_settings WHERE key = 'public_config'`).get();
        if (!row?.value) return { courseBadges: {}, notifications: [] };
        const parsed = JSON.parse(row.value);
        return {
            courseBadges: parsed?.courseBadges || {},
            notifications: Array.isArray(parsed?.notifications) ? parsed.notifications : [],
        };
    } catch (_e) {
        return { courseBadges: {}, notifications: [] };
    }
}

function getActiveNotifications(notifications = []) {
    const now = Date.now();
    return notifications.filter((notif) => {
        const createdAt = Number(notif?.createdAt) > 0 ? Number(notif.createdAt) : now;
        const expiresInHours = Number(notif?.expiresInHours);
        if (!Number.isFinite(expiresInHours) || expiresInHours < 0) return true;
        if (expiresInHours === 0) return false;
        const expiresAt = createdAt + expiresInHours * 60 * 60 * 1000;
        return now <= expiresAt;
    });
}

// GET /api/user/:userId/onboarding - Check if user has completed onboarding
router.get('/user/:userId/onboarding', (req, res) => {
    try {
        const { userId } = req.params;

        const user = db.prepare(
            'SELECT onboarding_completed, current_semester, current_year FROM users WHERE firebase_uid = ?'
        ).get(userId);

        if (!user) {
            // New user, onboarding not completed
            return res.json({
                completed: false,
                semester: 's3',
                year: 'L2',
            });
        }

        const semester = normalizeSemester(user.current_semester);
        const year = normalizeAcademicYear(user.current_year, semester);
        res.json({
            completed: user.onboarding_completed === 1,
            semester,
            year,
        });
    } catch (error) {
        console.error('Error checking onboarding:', error);
        res.status(500).json({ error: 'Failed to check onboarding status' });
    }
});

// POST /api/user/:userId/onboarding - Mark onboarding as completed
router.post('/user/:userId/onboarding', (req, res) => {
    try {
        const { userId } = req.params;
        const completed = Boolean(req.body?.completed);
        const semester = normalizeSemester(req.body?.semester);
        const year = normalizeAcademicYear(req.body?.year, semester);
        const lastPathRaw = String(req.body?.lastPath || '');
        const isValidPath = /^\/s[34]\/[a-z0-9-]+(?:\/[a-z0-9-_/]*)?$/i.test(lastPathRaw);
        const lastPath = isValidPath ? lastPathRaw : `/${semester}/macro`;

        // Upsert user with onboarding status
        db.prepare(
            `INSERT INTO users (firebase_uid, onboarding_completed, current_semester, current_year, last_path, updated_at)
             VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(firebase_uid) 
             DO UPDATE SET 
                onboarding_completed = ?,
                current_semester = ?,
                current_year = ?,
                last_path = ?,
                updated_at = CURRENT_TIMESTAMP`
        ).run(
            userId,
            completed ? 1 : 0,
            semester,
            year,
            lastPath,
            completed ? 1 : 0,
            semester,
            year,
            lastPath
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving onboarding:', error);
        res.status(500).json({ error: 'Failed to save onboarding status' });
    }
});

// POST /api/user/:userId/preferences - Save user notification preferences
router.post('/user/:userId/preferences', (req, res) => {
    try {
        const { userId } = req.params;
        const { newContent, spacedRepetition } = req.body;

        // Upsert user preferences
        db.prepare(
            `INSERT INTO users (
                firebase_uid, 
                notify_new_content, 
                notify_spaced_repetition,
                updated_at
            )
             VALUES (?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(firebase_uid) 
             DO UPDATE SET 
                notify_new_content = ?,
                notify_spaced_repetition = ?,
                updated_at = CURRENT_TIMESTAMP`
        ).run(
            userId,
            newContent ? 1 : 0,
            spacedRepetition ? 1 : 0,
            newContent ? 1 : 0,
            spacedRepetition ? 1 : 0
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).json({ error: 'Failed to save preferences' });
    }
});

// GET /api/user/:userId/preferences - Get user notification preferences
router.get('/user/:userId/preferences', (req, res) => {
    try {
        const { userId } = req.params;

        const user = db.prepare(
            'SELECT notify_new_content, notify_spaced_repetition FROM users WHERE firebase_uid = ?'
        ).get(userId);

        if (!user) {
            // Default preferences
            return res.json({
                newContent: true,
                spacedRepetition: true
            });
        }

        res.json({
            newContent: user.notify_new_content === 1,
            spacedRepetition: user.notify_spaced_repetition === 1
        });
    } catch (error) {
        console.error('Error getting preferences:', error);
        res.status(500).json({ error: 'Failed to get preferences' });
    }
});

// GET /api/user/:userId/semester - Get user's current semester
router.get('/user/:userId/semester', (req, res) => {
    try {
        const { userId } = req.params;

        const user = db.prepare(
            'SELECT current_semester, current_year FROM users WHERE firebase_uid = ?'
        ).get(userId);

        if (!user) {
            return res.json({ semester: 's3', year: 'L2' });
        }

        const semester = normalizeSemester(user.current_semester);
        const year = normalizeAcademicYear(user.current_year, semester);
        res.json({ semester, year });
    } catch (error) {
        console.error('Error getting semester:', error);
        res.status(500).json({ error: 'Failed to get semester' });
    }
});

// PUT /api/user/:userId/semester - Save user's selected semester
router.put('/user/:userId/semester', (req, res) => {
    try {
        const { userId } = req.params;
        const { semester, year } = req.body;

        if (!semester || !['s3', 's4'].includes(semester.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid semester. Must be s3 or s4.' });
        }

        const normalizedSemester = normalizeSemester(semester);
        const normalizedYear = normalizeAcademicYear(year, normalizedSemester);

        db.prepare(
            `INSERT INTO users (firebase_uid, current_semester, current_year, updated_at)
             VALUES (?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(firebase_uid)
             DO UPDATE SET
                current_semester = ?,
                current_year = ?,
                updated_at = CURRENT_TIMESTAMP`
        ).run(userId, normalizedSemester, normalizedYear, normalizedSemester, normalizedYear);

        res.json({ success: true, semester: normalizedSemester, year: normalizedYear });
    } catch (error) {
        console.error('Error saving semester:', error);
        res.status(500).json({ error: 'Failed to save semester' });
    }
});

// GET /api/user/:userId/navigation - Get user's current semester + last route
router.get('/user/:userId/navigation', (req, res) => {
    try {
        const { userId } = req.params;
        const user = db.prepare(
            'SELECT current_semester, current_year, last_path FROM users WHERE firebase_uid = ?'
        ).get(userId);

        if (!user) {
            return res.json({
                semester: 's3',
                year: 'L2',
                lastPath: '/s3/macro',
            });
        }

        const semester = normalizeSemester(user.current_semester);
        const year = normalizeAcademicYear(user.current_year, semester);
        const lastPath = user.last_path || `/${semester}/macro`;
        res.json({ semester, year, lastPath });
    } catch (error) {
        console.error('Error getting navigation:', error);
        res.status(500).json({ error: 'Failed to get navigation' });
    }
});

// PUT /api/user/:userId/navigation - Save user's current semester + last route
router.put('/user/:userId/navigation', (req, res) => {
    try {
        const { userId } = req.params;
        const semesterRaw = String(req.body?.semester || '').toLowerCase();
        const yearRaw = req.body?.year;
        const lastPathRaw = String(req.body?.lastPath || '');

        const semester = semesterRaw === 's4' ? 's4' : 's3';
        const year = normalizeAcademicYear(yearRaw, semester);
        const isValidPath = /^\/s[34]\/[a-z0-9-]+(?:\/[a-z0-9-_/]*)?$/i.test(lastPathRaw);
        const lastPath = isValidPath ? lastPathRaw : `/${semester}/macro`;

        db.prepare(
            `INSERT INTO users (firebase_uid, current_semester, current_year, last_path, updated_at)
             VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(firebase_uid)
             DO UPDATE SET
                current_semester = ?,
                current_year = ?,
                last_path = ?,
                updated_at = CURRENT_TIMESTAMP`
        ).run(userId, semester, year, lastPath, semester, year, lastPath);

        res.json({ success: true, semester, year, lastPath });
    } catch (error) {
        console.error('Error saving navigation:', error);
        res.status(500).json({ error: 'Failed to save navigation' });
    }
});

// GET /api/user/:userId/notifications - Get active notifications not dismissed by this user
router.get('/user/:userId/notifications', (req, res) => {
    try {
        const { userId } = req.params;
        const config = getPublicConfig();
        const activeNotifications = getActiveNotifications(config.notifications || []);

        if (activeNotifications.length === 0) {
            return res.json({ notifications: [] });
        }

        const dismissedRows = db.prepare(
            'SELECT notification_id FROM user_notification_dismissals WHERE firebase_uid = ?'
        ).all(userId);
        const dismissedSet = new Set(dismissedRows.map((row) => String(row.notification_id)));

        const notifications = activeNotifications.filter(
            (notif) => !dismissedSet.has(String(notif.id))
        );

        res.json({ notifications });
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({ error: 'Failed to get notifications' });
    }
});

// POST /api/user/:userId/notifications/:notificationId/dismiss - Dismiss notification for this user
router.post('/user/:userId/notifications/:notificationId/dismiss', (req, res) => {
    try {
        const { userId, notificationId } = req.params;
        if (!notificationId) {
            return res.status(400).json({ error: 'notificationId is required' });
        }

        db.prepare(`
            INSERT INTO user_notification_dismissals (firebase_uid, notification_id, dismissed_at)
            VALUES (?, ?, strftime('%s', 'now'))
            ON CONFLICT(firebase_uid, notification_id) DO NOTHING
        `).run(userId, String(notificationId));

        res.json({ success: true });
    } catch (error) {
        console.error('Error dismissing notification:', error);
        res.status(500).json({ error: 'Failed to dismiss notification' });
    }
});

export default router;
