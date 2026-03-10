CREATE TABLE IF NOT EXISTS oiko_news_api_usage_daily (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usage_date TEXT NOT NULL,
    service_key TEXT NOT NULL,
    requests_count INTEGER NOT NULL DEFAULT 0,
    tokens_used INTEGER NOT NULL DEFAULT 0,
    results_count INTEGER NOT NULL DEFAULT 0,
    last_request_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usage_date, service_key)
);

CREATE INDEX IF NOT EXISTS idx_oiko_api_usage_date ON oiko_news_api_usage_daily(usage_date);
CREATE INDEX IF NOT EXISTS idx_oiko_api_usage_service ON oiko_news_api_usage_daily(service_key);
