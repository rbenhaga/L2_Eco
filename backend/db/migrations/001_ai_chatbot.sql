-- Migration 001: AI Chatbot Schema
-- Creates tables for AI quota management, provider health tracking, and chat history

-- ============================================
-- Table 1: AI User Quotas
-- Tracks user request/token usage with adaptive rate limiting
-- ============================================
CREATE TABLE IF NOT EXISTS ai_user_quotas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firebase_uid TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD format
  requests_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  last_request_at INTEGER DEFAULT NULL, -- Unix timestamp (for burst detection)
  cooldown_until INTEGER DEFAULT NULL, -- Unix timestamp
  abuse_flags INTEGER DEFAULT 0, -- Counter for abuse detection
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  UNIQUE(firebase_uid, date)
);

CREATE INDEX IF NOT EXISTS idx_ai_user_quotas_uid_date ON ai_user_quotas(firebase_uid, date);
CREATE INDEX IF NOT EXISTS idx_ai_user_quotas_cooldown ON ai_user_quotas(cooldown_until);
CREATE INDEX IF NOT EXISTS idx_ai_user_quotas_updated ON ai_user_quotas(updated_at);

-- ============================================
-- Table 2: AI Provider Health
-- Tracks provider/model health and circuit breaker state
-- ============================================
CREATE TABLE IF NOT EXISTS ai_provider_health (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_name TEXT NOT NULL, -- 'groq', 'gemini', 'openrouter'
  model_name TEXT NOT NULL,
  status TEXT DEFAULT 'healthy' CHECK(status IN ('healthy', 'degraded', 'down')),
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  last_success INTEGER DEFAULT NULL, -- Unix timestamp
  last_failure INTEGER DEFAULT NULL, -- Unix timestamp
  last_error TEXT DEFAULT NULL,
  circuit_breaker_state TEXT DEFAULT 'closed' CHECK(circuit_breaker_state IN ('closed', 'open', 'half-open')),
  circuit_opened_at INTEGER DEFAULT NULL, -- Unix timestamp
  consecutive_failures INTEGER DEFAULT 0, -- Reset on success
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  UNIQUE(provider_name, model_name)
);

CREATE INDEX IF NOT EXISTS idx_ai_provider_health_status ON ai_provider_health(status);
CREATE INDEX IF NOT EXISTS idx_ai_provider_health_circuit ON ai_provider_health(circuit_breaker_state);
CREATE INDEX IF NOT EXISTS idx_ai_provider_health_provider ON ai_provider_health(provider_name);

-- ============================================
-- Table 3: AI Provider Quotas
-- Tracks daily provider quota usage (RPD/TPD) with real-time remaining counts
-- ============================================
CREATE TABLE IF NOT EXISTS ai_provider_quotas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_name TEXT NOT NULL,
  model_name TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD format
  requests_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  requests_remaining INTEGER DEFAULT NULL, -- From provider headers
  tokens_remaining INTEGER DEFAULT NULL, -- From provider headers
  reset_at INTEGER DEFAULT NULL, -- Unix timestamp (daily reset)
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  UNIQUE(provider_name, model_name, date)
);

CREATE INDEX IF NOT EXISTS idx_ai_provider_quotas_date ON ai_provider_quotas(date);
CREATE INDEX IF NOT EXISTS idx_ai_provider_quotas_provider ON ai_provider_quotas(provider_name, model_name);

-- ============================================
-- Table 4: AI Chat History
-- Stores conversation history for analytics and feedback
-- ============================================
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firebase_uid TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  context_course_id TEXT NOT NULL,
  context_chapter_id TEXT DEFAULT NULL,
  context_page_id TEXT DEFAULT NULL,
  source TEXT NOT NULL CHECK(source IN ('cache', 'llm')), -- 'cache' or 'llm'
  provider_used TEXT DEFAULT NULL, -- 'groq', 'gemini', 'openrouter', or 'cache'
  model_used TEXT DEFAULT NULL, -- e.g., 'llama-3.1-8b-instant'
  complexity_category TEXT DEFAULT NULL, -- 'simple', 'medium', 'complex'
  complexity_score REAL DEFAULT NULL, -- 0-1 score
  similarity_score REAL DEFAULT NULL, -- For cache hits
  response_time_ms INTEGER NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cache_entry_id TEXT DEFAULT NULL, -- Reference to semantic cache entry
  feedback TEXT DEFAULT NULL CHECK(feedback IN ('positive', 'negative', NULL)),
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_chat_history_uid ON ai_chat_history(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_created ON ai_chat_history(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_source ON ai_chat_history(source);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_provider ON ai_chat_history(provider_used);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_course ON ai_chat_history(context_course_id);

-- ============================================
-- Table 5: AI Active Users (for adaptive rate limiting)
-- Tracks active users in rolling 24h window
-- ============================================
CREATE TABLE IF NOT EXISTS ai_active_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firebase_uid TEXT NOT NULL,
  last_active INTEGER NOT NULL, -- Unix timestamp
  request_count_24h INTEGER DEFAULT 1,
  UNIQUE(firebase_uid)
);

CREATE INDEX IF NOT EXISTS idx_ai_active_users_last_active ON ai_active_users(last_active);

-- ============================================
-- Table 6: AI Global Pool Stats (for adaptive limits)
-- Single row tracking global pool state
-- ============================================
CREATE TABLE IF NOT EXISTS ai_pool_stats (
  id INTEGER PRIMARY KEY CHECK(id = 1), -- Single row table
  date TEXT NOT NULL, -- YYYY-MM-DD
  total_requests_today INTEGER DEFAULT 0,
  total_tokens_today INTEGER DEFAULT 0,
  active_users_count INTEGER DEFAULT 0,
  quota_pool_remaining INTEGER DEFAULT 14850, -- Updated in real-time
  last_updated INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Initialize with default row
INSERT OR IGNORE INTO ai_pool_stats (id, date, quota_pool_remaining)
VALUES (1, date('now'), 14850);
