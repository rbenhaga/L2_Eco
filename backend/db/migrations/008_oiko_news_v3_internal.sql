ALTER TABLE oiko_news_editions ADD COLUMN origin TEXT NOT NULL DEFAULT 'live' CHECK(origin IN ('live', 'audit', 'fixture'));
ALTER TABLE oiko_news_editions ADD COLUMN visibility TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public', 'internal'));
ALTER TABLE oiko_news_editions ADD COLUMN quality_state TEXT NOT NULL DEFAULT 'pending' CHECK(quality_state IN ('pending', 'passed', 'failed'));
ALTER TABLE oiko_news_editions ADD COLUMN archive_teaser TEXT;
ALTER TABLE oiko_news_editions ADD COLUMN publication_reason TEXT;
ALTER TABLE oiko_news_editions ADD COLUMN publication_reason_code TEXT;

UPDATE oiko_news_editions
SET origin = CASE
      WHEN COALESCE(is_audit, 0) = 1 THEN 'audit'
      ELSE 'live'
    END,
    visibility = CASE
      WHEN COALESCE(is_audit, 0) = 1 THEN 'internal'
      ELSE 'public'
    END,
    quality_state = CASE
      WHEN status IN ('ready', 'sent') THEN 'passed'
      WHEN status = 'failed' THEN 'failed'
      ELSE 'pending'
    END;

CREATE INDEX IF NOT EXISTS idx_oiko_editions_visibility_status_date
  ON oiko_news_editions(visibility, status, edition_date DESC);

CREATE TABLE IF NOT EXISTS oiko_news_raw_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  edition_date TEXT NOT NULL,
  pipeline_version TEXT NOT NULL DEFAULT 'v3',
  url TEXT NOT NULL,
  canonical_url TEXT,
  title TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_domain TEXT NOT NULL,
  provider TEXT,
  published_at TEXT NOT NULL,
  language TEXT,
  snippet_raw TEXT,
  body_raw TEXT,
  acquired_html TEXT,
  acquired_text TEXT,
  normalized_title TEXT,
  normalized_snippet TEXT,
  normalized_body TEXT,
  content_depth TEXT NOT NULL DEFAULT 'title_snippet' CHECK(content_depth IN ('title_only', 'title_snippet', 'partial_body', 'full_body')),
  acquisition_status TEXT NOT NULL DEFAULT 'partial' CHECK(acquisition_status IN ('ok', 'partial', 'blocked', 'failed')),
  acquisition_error TEXT,
  robots_allowed INTEGER NOT NULL DEFAULT 0,
  license_status TEXT NOT NULL DEFAULT 'unknown',
  paywall_detected INTEGER NOT NULL DEFAULT 0,
  topic_family TEXT,
  source_tier TEXT NOT NULL DEFAULT 'secondary',
  source_reliability_score REAL NOT NULL DEFAULT 0,
  source_type_profile TEXT NOT NULL DEFAULT 'press',
  paywall_risk REAL NOT NULL DEFAULT 0,
  snippet_only_risk REAL NOT NULL DEFAULT 0,
  raw_json TEXT,
  normalized_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edition_date, pipeline_version, url)
);

CREATE INDEX IF NOT EXISTS idx_oiko_raw_articles_edition
  ON oiko_news_raw_articles(edition_date, pipeline_version);
CREATE INDEX IF NOT EXISTS idx_oiko_raw_articles_topic
  ON oiko_news_raw_articles(topic_family);

CREATE TABLE IF NOT EXISTS oiko_news_fact_sheets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  edition_date TEXT NOT NULL,
  pipeline_version TEXT NOT NULL DEFAULT 'v3',
  raw_article_id INTEGER NOT NULL,
  article_id TEXT NOT NULL,
  recency_type TEXT NOT NULL DEFAULT 'background',
  freshness_score REAL NOT NULL DEFAULT 0,
  confidence REAL NOT NULL DEFAULT 0,
  fact_sheet_json TEXT NOT NULL,
  temporal_json TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edition_date, pipeline_version, raw_article_id)
);

CREATE INDEX IF NOT EXISTS idx_oiko_fact_sheets_edition
  ON oiko_news_fact_sheets(edition_date, pipeline_version);

CREATE TABLE IF NOT EXISTS oiko_news_topic_clusters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  edition_date TEXT NOT NULL,
  pipeline_version TEXT NOT NULL DEFAULT 'v3',
  cluster_id TEXT NOT NULL,
  topic_label TEXT NOT NULL,
  topic_family TEXT NOT NULL,
  score REAL NOT NULL DEFAULT 0,
  confidence REAL NOT NULL DEFAULT 0,
  cluster_json TEXT NOT NULL,
  freshness_json TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edition_date, pipeline_version, cluster_id)
);

CREATE INDEX IF NOT EXISTS idx_oiko_topic_clusters_edition
  ON oiko_news_topic_clusters(edition_date, pipeline_version);
CREATE INDEX IF NOT EXISTS idx_oiko_topic_clusters_score
  ON oiko_news_topic_clusters(edition_date, pipeline_version, score DESC);

CREATE TABLE IF NOT EXISTS oiko_news_editorial_packets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  edition_date TEXT NOT NULL,
  pipeline_version TEXT NOT NULL DEFAULT 'v3',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'ready', 'sent', 'short_draft', 'insufficient_material_review', 'blocked_insufficient_fresh_material', 'failed_quality')),
  visibility TEXT NOT NULL DEFAULT 'internal' CHECK(visibility IN ('public', 'internal')),
  quality_state TEXT NOT NULL DEFAULT 'pending' CHECK(quality_state IN ('pending', 'passed', 'failed')),
  packet_json TEXT,
  draft_json TEXT,
  evidence_json TEXT,
  content_json TEXT,
  market_context_json TEXT,
  asset_manifest_json TEXT,
  html TEXT,
  text TEXT,
  archive_teaser TEXT,
  publication_reason TEXT,
  publication_reason_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edition_date, pipeline_version)
);

CREATE INDEX IF NOT EXISTS idx_oiko_editorial_packets_edition
  ON oiko_news_editorial_packets(edition_date, pipeline_version);
CREATE INDEX IF NOT EXISTS idx_oiko_editorial_packets_visibility_status
  ON oiko_news_editorial_packets(visibility, status, edition_date DESC);

CREATE TABLE IF NOT EXISTS oiko_news_quality_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  edition_date TEXT NOT NULL,
  pipeline_version TEXT NOT NULL DEFAULT 'v3',
  stage TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'passed', 'failed')),
  summary_text TEXT NOT NULL,
  metrics_json TEXT,
  issues_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(edition_date, pipeline_version, stage)
);

CREATE INDEX IF NOT EXISTS idx_oiko_quality_reports_edition
  ON oiko_news_quality_reports(edition_date, pipeline_version);
