-- Migration: Add user progress tracking for videos and chapters
-- Run: sqlite3 database/subscriptions.db < db/migrations/002_user_progress.sql

CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK(content_type IN ('intro_video', 'chapter_video', 'chapter', 'td', 'qcm')),
    module TEXT NOT NULL CHECK(module IN ('macro', 'micro', 'stats', 'socio')),
    content_id TEXT NOT NULL,
    watched INTEGER DEFAULT 0,
    completed INTEGER DEFAULT 0,
    progress_percent INTEGER DEFAULT 0,
    last_position INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(firebase_uid, content_type, module, content_id)
);

CREATE INDEX IF NOT EXISTS idx_user_progress_uid ON user_progress(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON user_progress(firebase_uid, module);
CREATE INDEX IF NOT EXISTS idx_user_progress_content ON user_progress(firebase_uid, content_type, module);
