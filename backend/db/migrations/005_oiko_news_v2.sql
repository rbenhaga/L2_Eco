ALTER TABLE oiko_news_editions ADD COLUMN content_version TEXT NOT NULL DEFAULT 'v1';

CREATE TABLE IF NOT EXISTS oiko_news_assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    edition_id INTEGER NOT NULL,
    section_key TEXT NOT NULL,
    asset_type TEXT NOT NULL,
    provider TEXT NOT NULL,
    source_url TEXT,
    stored_url TEXT NOT NULL,
    author TEXT,
    license TEXT,
    credit_line TEXT,
    alt_text TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    score REAL NOT NULL DEFAULT 0,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_oiko_assets_edition_id ON oiko_news_assets(edition_id);
CREATE INDEX IF NOT EXISTS idx_oiko_assets_section_key ON oiko_news_assets(section_key);
CREATE INDEX IF NOT EXISTS idx_oiko_assets_type ON oiko_news_assets(asset_type);
