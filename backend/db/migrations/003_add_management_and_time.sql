-- Migration 003: Add management module + time_spent_seconds column
-- The existing table uses a CHECK constraint on module that only allows
-- 'macro', 'micro', 'stats', 'socio'. We need to add 'management'.
-- SQLite doesn't support ALTER TABLE ... DROP CONSTRAINT / ADD CONSTRAINT,
-- so we recreate the table with the new constraint.

-- Step 1: Rename old table
ALTER TABLE user_progress RENAME TO user_progress_old;

-- Step 2: Create new table with updated constraint and new column
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

-- Step 3: Copy data from old table
INSERT INTO user_progress (
    id, firebase_uid, content_type, module, content_id,
    watched, completed, progress_percent, last_position,
    created_at, updated_at
)
SELECT
    id, firebase_uid, content_type, module, content_id,
    watched, completed, progress_percent, last_position,
    created_at, updated_at
FROM user_progress_old;

-- Step 4: Drop old table
DROP TABLE user_progress_old;

-- Step 5: Recreate indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_uid ON user_progress(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON user_progress(firebase_uid, module);
