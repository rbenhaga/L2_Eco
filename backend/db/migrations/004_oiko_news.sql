CREATE TABLE IF NOT EXISTS schema_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS oiko_news_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT NULL,
    email_original TEXT NOT NULL,
    email_normalized TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'unsubscribed', 'bounced')),
    consent_source TEXT NOT NULL DEFAULT 'page',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    unsubscribe_token_hash TEXT NOT NULL UNIQUE,
    last_sent_edition_id INTEGER NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_oiko_subscriptions_firebase_uid ON oiko_news_subscriptions(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_oiko_subscriptions_status ON oiko_news_subscriptions(status);

CREATE TABLE IF NOT EXISTS oiko_news_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_name TEXT NOT NULL,
    source_domain TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'media' CHECK(source_type IN ('official', 'media', 'api')),
    url TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    published_at TEXT NOT NULL,
    language TEXT,
    snippet_raw TEXT,
    body_raw TEXT,
    topic_family TEXT,
    dedupe_key TEXT,
    score REAL NOT NULL DEFAULT 0,
    selected_role TEXT,
    edition_date TEXT,
    item_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_oiko_items_published_at ON oiko_news_items(published_at);
CREATE INDEX IF NOT EXISTS idx_oiko_items_topic_family ON oiko_news_items(topic_family);
CREATE INDEX IF NOT EXISTS idx_oiko_items_edition_date ON oiko_news_items(edition_date);
CREATE INDEX IF NOT EXISTS idx_oiko_items_selected_role ON oiko_news_items(selected_role);
CREATE INDEX IF NOT EXISTS idx_oiko_items_dedupe_key ON oiko_news_items(dedupe_key);

CREATE TABLE IF NOT EXISTS oiko_news_editions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    edition_date TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    window_start TEXT NOT NULL,
    window_end TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'ready', 'sent', 'fallback', 'failed')),
    editorial_angle TEXT,
    market_regime TEXT,
    evidence_coverage_score REAL NOT NULL DEFAULT 0,
    provider_attempts_json TEXT,
    validation_errors_json TEXT,
    content_json TEXT,
    html TEXT,
    text TEXT,
    chart_manifest_json TEXT,
    llm_provider TEXT,
    llm_model TEXT,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_oiko_editions_status ON oiko_news_editions(status);
CREATE INDEX IF NOT EXISTS idx_oiko_editions_sent_at ON oiko_news_editions(sent_at);

CREATE TABLE IF NOT EXISTS oiko_news_send_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    edition_id INTEGER NOT NULL,
    subscription_id INTEGER NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('sent', 'skipped', 'error')),
    smtp_message_id TEXT,
    error_message TEXT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(edition_id, subscription_id)
);

CREATE INDEX IF NOT EXISTS idx_oiko_send_logs_edition ON oiko_news_send_logs(edition_id);
CREATE INDEX IF NOT EXISTS idx_oiko_send_logs_subscription ON oiko_news_send_logs(subscription_id);

CREATE TABLE IF NOT EXISTS oiko_news_job_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_date TEXT NOT NULL,
    step TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'started' CHECK(status IN ('started', 'success', 'failed', 'skipped')),
    lock_key TEXT NOT NULL UNIQUE,
    meta_json TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP NULL
);

CREATE INDEX IF NOT EXISTS idx_oiko_job_runs_job_date ON oiko_news_job_runs(job_date);
CREATE INDEX IF NOT EXISTS idx_oiko_job_runs_step ON oiko_news_job_runs(step);
