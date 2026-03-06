import db from './database.js';

// Run migration to create table if not exists
const migrationSQL = `
CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK(content_type IN ('intro_video', 'chapter_video', 'chapter', 'td', 'qcm')),
    module TEXT NOT NULL CHECK(module IN ('macro', 'micro', 'stats', 'socio', 'management')),
    content_id TEXT NOT NULL,
    watched INTEGER DEFAULT 0,
    completed INTEGER DEFAULT 0,
    progress_percent INTEGER DEFAULT 0,
    last_position INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(firebase_uid, content_type, module, content_id)
);

CREATE INDEX IF NOT EXISTS idx_user_progress_uid ON user_progress(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON user_progress(firebase_uid, module);
`;

db.exec(migrationSQL);
console.log('✅ User progress table initialized');

export const progressQueries = {
    // Get progress for a specific content
    get: db.prepare(`
        SELECT * FROM user_progress 
        WHERE firebase_uid = ? AND content_type = ? AND module = ? AND content_id = ?
    `),

    // Get all progress for a module
    getByModule: db.prepare(`
        SELECT * FROM user_progress 
        WHERE firebase_uid = ? AND module = ?
    `),

    // Get lightweight summary for all modules (for fast sync checks)
    getSummaryByModule: db.prepare(`
        SELECT
            module,
            COUNT(*) AS rows_count,
            SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS completed_count,
            SUM(CASE WHEN watched = 1 THEN 1 ELSE 0 END) AS watched_count
        FROM user_progress
        WHERE firebase_uid = ?
        GROUP BY module
    `),

    // Get all intro videos watched status
    getIntroVideos: db.prepare(`
        SELECT module, watched, completed FROM user_progress 
        WHERE firebase_uid = ? AND content_type = 'intro_video'
    `),

    // Upsert progress
    upsert: db.prepare(`
        INSERT INTO user_progress (
            firebase_uid, content_type, module, content_id, 
            watched, completed, progress_percent, last_position
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(firebase_uid, content_type, module, content_id) DO UPDATE SET
            watched = excluded.watched,
            completed = excluded.completed,
            progress_percent = excluded.progress_percent,
            last_position = excluded.last_position,
            updated_at = CURRENT_TIMESTAMP
    `),

    // Mark as watched (first time)
    markWatched: db.prepare(`
        INSERT INTO user_progress (firebase_uid, content_type, module, content_id, watched)
        VALUES (?, ?, ?, ?, 1)
        ON CONFLICT(firebase_uid, content_type, module, content_id) DO UPDATE SET
            watched = 1,
            updated_at = CURRENT_TIMESTAMP
    `),

    // Mark as completed
    markCompleted: db.prepare(`
        INSERT INTO user_progress (firebase_uid, content_type, module, content_id, watched, completed, progress_percent)
        VALUES (?, ?, ?, ?, 1, 1, 100)
        ON CONFLICT(firebase_uid, content_type, module, content_id) DO UPDATE SET
            watched = 1,
            completed = 1,
            progress_percent = 100,
            updated_at = CURRENT_TIMESTAMP
    `),

    // Upsert study time (increment)
    upsertStudyTime: db.prepare(`
        INSERT INTO user_progress (firebase_uid, content_type, module, content_id, time_spent_seconds, watched)
        VALUES (?, 'chapter', ?, ?, ?, 1)
        ON CONFLICT(firebase_uid, content_type, module, content_id) DO UPDATE SET
            time_spent_seconds = time_spent_seconds + excluded.time_spent_seconds,
            watched = 1,
            updated_at = CURRENT_TIMESTAMP
    `),
};

export default progressQueries;
