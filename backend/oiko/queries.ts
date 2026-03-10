import db from '../db/database.js';

export const oikoQueries = {
  subscriptions: {
    getByFirebaseUid: db.prepare(`
      SELECT * FROM oiko_news_subscriptions WHERE firebase_uid = ?
    `),
    getByEmail: db.prepare(`
      SELECT * FROM oiko_news_subscriptions WHERE email_normalized = ?
    `),
    getByUnsubscribeHash: db.prepare(`
      SELECT * FROM oiko_news_subscriptions WHERE unsubscribe_token_hash = ?
    `),
    upsert: db.prepare(`
      INSERT INTO oiko_news_subscriptions (
        firebase_uid,
        email_original,
        email_normalized,
        status,
        consent_source,
        subscribed_at,
        unsubscribed_at,
        unsubscribe_token_hash,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(email_normalized) DO UPDATE SET
        firebase_uid = excluded.firebase_uid,
        email_original = excluded.email_original,
        status = excluded.status,
        consent_source = excluded.consent_source,
        unsubscribed_at = excluded.unsubscribed_at,
        unsubscribe_token_hash = excluded.unsubscribe_token_hash,
        updated_at = CURRENT_TIMESTAMP,
        subscribed_at = CASE
          WHEN excluded.status = 'active' THEN CURRENT_TIMESTAMP
          ELSE oiko_news_subscriptions.subscribed_at
        END
    `),
    updateStatusById: db.prepare(`
      UPDATE oiko_news_subscriptions
      SET status = ?, unsubscribed_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `),
    updateLastSentEdition: db.prepare(`
      UPDATE oiko_news_subscriptions
      SET last_sent_edition_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `),
    listActiveRecipients: db.prepare(`
      SELECT * FROM oiko_news_subscriptions
      WHERE status = 'active'
      ORDER BY id ASC
    `),
  },

  items: {
    upsert: db.prepare(`
      INSERT INTO oiko_news_items (
        source_name,
        source_domain,
        source_type,
        url,
        title,
        published_at,
        language,
        snippet_raw,
        body_raw,
        topic_family,
        dedupe_key,
        score,
        selected_role,
        edition_date,
        item_json,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(url) DO UPDATE SET
        source_name = excluded.source_name,
        source_domain = excluded.source_domain,
        source_type = excluded.source_type,
        title = excluded.title,
        published_at = excluded.published_at,
        language = excluded.language,
        snippet_raw = excluded.snippet_raw,
        body_raw = excluded.body_raw,
        topic_family = excluded.topic_family,
        dedupe_key = excluded.dedupe_key,
        score = excluded.score,
        selected_role = excluded.selected_role,
        edition_date = excluded.edition_date,
        item_json = excluded.item_json,
        updated_at = CURRENT_TIMESTAMP
    `),
    getWindowItems: db.prepare(`
      SELECT * FROM oiko_news_items
      WHERE published_at >= ? AND published_at <= ?
      ORDER BY published_at DESC, score DESC
    `),
    getEditionItems: db.prepare(`
      SELECT * FROM oiko_news_items
      WHERE edition_date = ?
      ORDER BY score DESC, published_at DESC
    `),
    clearEditionAssignments: db.prepare(`
      UPDATE oiko_news_items
      SET selected_role = NULL,
          edition_date = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE edition_date = ?
    `),
  },

  editions: {
    getLatestPublic: db.prepare(`
      SELECT * FROM oiko_news_editions
      WHERE status IN ('ready', 'sent', 'fallback')
        AND COALESCE(is_audit, 0) = 0
        AND COALESCE(visibility, 'public') = 'public'
        AND edition_date <= ?
      ORDER BY edition_date DESC
      LIMIT 1
    `),
    getArchivePublic: db.prepare(`
      SELECT id, edition_date, slug, status, editorial_angle, market_regime, evidence_coverage_score, content_version, created_at, sent_at, content_json, archive_teaser, publication_reason
      FROM oiko_news_editions
      WHERE status IN ('ready', 'sent', 'fallback')
        AND COALESCE(is_audit, 0) = 0
        AND COALESCE(visibility, 'public') = 'public'
        AND edition_date <= ?
      ORDER BY edition_date DESC
      LIMIT ? OFFSET ?
    `),
    getPublicBySlug: db.prepare(`
      SELECT * FROM oiko_news_editions
      WHERE slug = ?
        AND COALESCE(is_audit, 0) = 0
        AND COALESCE(visibility, 'public') = 'public'
        AND edition_date <= ?
      LIMIT 1
    `),
    getLatest: db.prepare(`
      SELECT * FROM oiko_news_editions
      WHERE status IN ('ready', 'sent', 'fallback')
      ORDER BY edition_date DESC
      LIMIT 1
    `),
    getArchive: db.prepare(`
      SELECT id, edition_date, slug, status, editorial_angle, market_regime, evidence_coverage_score, content_version, created_at, sent_at, content_json
      FROM oiko_news_editions
      WHERE status IN ('ready', 'sent', 'fallback')
      ORDER BY edition_date DESC
      LIMIT ? OFFSET ?
    `),
    getBySlug: db.prepare(`
      SELECT * FROM oiko_news_editions WHERE slug = ?
    `),
    getByDate: db.prepare(`
      SELECT * FROM oiko_news_editions WHERE edition_date = ?
    `),
    upsertSkeleton: db.prepare(`
      INSERT INTO oiko_news_editions (
        edition_date,
        slug,
        window_start,
        window_end,
        status,
        is_audit,
        content_version,
        provider_attempts_json,
        validation_errors_json,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(edition_date) DO UPDATE SET
        slug = excluded.slug,
        window_start = excluded.window_start,
        window_end = excluded.window_end,
        status = excluded.status,
        is_audit = excluded.is_audit,
        content_version = excluded.content_version,
        provider_attempts_json = excluded.provider_attempts_json,
        validation_errors_json = excluded.validation_errors_json,
        updated_at = CURRENT_TIMESTAMP
    `),
    updateComposed: db.prepare(`
      UPDATE oiko_news_editions
      SET status = ?,
          is_audit = ?,
          content_version = ?,
          editorial_angle = ?,
          market_regime = ?,
          evidence_coverage_score = ?,
          provider_attempts_json = ?,
          validation_errors_json = ?,
          content_json = ?,
          html = ?,
          text = ?,
          chart_manifest_json = ?,
          llm_provider = ?,
          llm_model = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE edition_date = ?
    `),
    markSent: db.prepare(`
      UPDATE oiko_news_editions
      SET status = 'sent', sent_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `),
  },

  assets: {
    clearByEditionId: db.prepare(`
      DELETE FROM oiko_news_assets WHERE edition_id = ?
    `),
    insert: db.prepare(`
      INSERT INTO oiko_news_assets (
        edition_id,
        section_key,
        asset_type,
        provider,
        source_url,
        stored_url,
        author,
        license,
        credit_line,
        alt_text,
        width,
        height,
        score,
        fetched_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),
    listByEditionId: db.prepare(`
      SELECT * FROM oiko_news_assets
      WHERE edition_id = ?
      ORDER BY id ASC
    `),
  },

  usageDaily: {
    bump: db.prepare(`
      INSERT INTO oiko_news_api_usage_daily (
        usage_date,
        service_key,
        requests_count,
        tokens_used,
        results_count,
        last_request_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(usage_date, service_key) DO UPDATE SET
        requests_count = oiko_news_api_usage_daily.requests_count + excluded.requests_count,
        tokens_used = oiko_news_api_usage_daily.tokens_used + excluded.tokens_used,
        results_count = oiko_news_api_usage_daily.results_count + excluded.results_count,
        last_request_at = excluded.last_request_at,
        updated_at = CURRENT_TIMESTAMP
    `),
    listBetweenDates: db.prepare(`
      SELECT * FROM oiko_news_api_usage_daily
      WHERE usage_date >= ? AND usage_date <= ?
      ORDER BY usage_date ASC, service_key ASC
    `),
  },

  sendLogs: {
    getByEditionAndSubscription: db.prepare(`
      SELECT * FROM oiko_news_send_logs WHERE edition_id = ? AND subscription_id = ?
    `),
    insert: db.prepare(`
      INSERT INTO oiko_news_send_logs (
        edition_id,
        subscription_id,
        email,
        status,
        smtp_message_id,
        error_message,
        attempted_at
      ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(edition_id, subscription_id) DO UPDATE SET
        email = excluded.email,
        status = excluded.status,
        smtp_message_id = excluded.smtp_message_id,
        error_message = excluded.error_message,
        attempted_at = CURRENT_TIMESTAMP
    `),
  },

  jobRuns: {
    getByLockKey: db.prepare(`
      SELECT * FROM oiko_news_job_runs WHERE lock_key = ?
    `),
    create: db.prepare(`
      INSERT INTO oiko_news_job_runs (job_date, step, status, lock_key, meta_json, started_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `),
    complete: db.prepare(`
      UPDATE oiko_news_job_runs
      SET status = ?, meta_json = ?, finished_at = CURRENT_TIMESTAMP
      WHERE lock_key = ?
    `),
    restart: db.prepare(`
      UPDATE oiko_news_job_runs
      SET status = ?, meta_json = ?, started_at = CURRENT_TIMESTAMP, finished_at = NULL
      WHERE lock_key = ?
    `),
    listByDate: db.prepare(`
      SELECT * FROM oiko_news_job_runs
      WHERE job_date = ?
      ORDER BY started_at DESC, id DESC
    `),
  },

  v3: {
    rawArticles: {
      clearByEdition: db.prepare(`
        DELETE FROM oiko_news_raw_articles
        WHERE edition_date = ? AND pipeline_version = ?
      `),
      upsert: db.prepare(`
        INSERT INTO oiko_news_raw_articles (
          edition_date,
          pipeline_version,
          url,
          canonical_url,
          title,
          source_name,
          source_domain,
          provider,
          published_at,
          language,
          snippet_raw,
          body_raw,
          acquired_html,
          acquired_text,
          normalized_title,
          normalized_snippet,
          normalized_body,
          content_depth,
          acquisition_status,
          acquisition_error,
          robots_allowed,
          license_status,
          paywall_detected,
          topic_family,
          source_tier,
          source_reliability_score,
          source_type_profile,
          paywall_risk,
          snippet_only_risk,
          raw_json,
          normalized_json,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(edition_date, pipeline_version, url) DO UPDATE SET
          canonical_url = excluded.canonical_url,
          title = excluded.title,
          source_name = excluded.source_name,
          source_domain = excluded.source_domain,
          provider = excluded.provider,
          published_at = excluded.published_at,
          language = excluded.language,
          snippet_raw = excluded.snippet_raw,
          body_raw = excluded.body_raw,
          acquired_html = excluded.acquired_html,
          acquired_text = excluded.acquired_text,
          normalized_title = excluded.normalized_title,
          normalized_snippet = excluded.normalized_snippet,
          normalized_body = excluded.normalized_body,
          content_depth = excluded.content_depth,
          acquisition_status = excluded.acquisition_status,
          acquisition_error = excluded.acquisition_error,
          robots_allowed = excluded.robots_allowed,
          license_status = excluded.license_status,
          paywall_detected = excluded.paywall_detected,
          topic_family = excluded.topic_family,
          source_tier = excluded.source_tier,
          source_reliability_score = excluded.source_reliability_score,
          source_type_profile = excluded.source_type_profile,
          paywall_risk = excluded.paywall_risk,
          snippet_only_risk = excluded.snippet_only_risk,
          raw_json = excluded.raw_json,
          normalized_json = excluded.normalized_json,
          updated_at = CURRENT_TIMESTAMP
      `),
      listByEdition: db.prepare(`
        SELECT * FROM oiko_news_raw_articles
        WHERE edition_date = ? AND pipeline_version = ?
        ORDER BY published_at DESC, id ASC
      `),
      /** Fetch canonical URLs and normalized titles from recent past editions for cross-edition dedup. */
      listRecentForDedup: db.prepare(`
        SELECT canonical_url, normalized_title, edition_date
        FROM oiko_news_raw_articles
        WHERE edition_date >= ? AND edition_date < ?
          AND pipeline_version = ?
          AND acquisition_status != 'blocked'
        ORDER BY edition_date DESC
      `),
    },
    factSheets: {
      clearByEdition: db.prepare(`
        DELETE FROM oiko_news_fact_sheets
        WHERE edition_date = ? AND pipeline_version = ?
      `),
      insert: db.prepare(`
        INSERT INTO oiko_news_fact_sheets (
          edition_date,
          pipeline_version,
          raw_article_id,
          article_id,
          recency_type,
          freshness_score,
          confidence,
          fact_sheet_json,
          temporal_json,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(edition_date, pipeline_version, raw_article_id) DO UPDATE SET
          article_id = excluded.article_id,
          recency_type = excluded.recency_type,
          freshness_score = excluded.freshness_score,
          confidence = excluded.confidence,
          fact_sheet_json = excluded.fact_sheet_json,
          temporal_json = excluded.temporal_json,
          updated_at = CURRENT_TIMESTAMP
      `),
      listByEdition: db.prepare(`
        SELECT * FROM oiko_news_fact_sheets
        WHERE edition_date = ? AND pipeline_version = ?
        ORDER BY id ASC
      `),
    },
    topicClusters: {
      clearByEdition: db.prepare(`
        DELETE FROM oiko_news_topic_clusters
        WHERE edition_date = ? AND pipeline_version = ?
      `),
      insert: db.prepare(`
        INSERT INTO oiko_news_topic_clusters (
          edition_date,
          pipeline_version,
          cluster_id,
          topic_label,
          topic_family,
          score,
          confidence,
          cluster_json,
          freshness_json,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(edition_date, pipeline_version, cluster_id) DO UPDATE SET
          topic_label = excluded.topic_label,
          topic_family = excluded.topic_family,
          score = excluded.score,
          confidence = excluded.confidence,
          cluster_json = excluded.cluster_json,
          freshness_json = excluded.freshness_json,
          updated_at = CURRENT_TIMESTAMP
      `),
      listByEdition: db.prepare(`
        SELECT * FROM oiko_news_topic_clusters
        WHERE edition_date = ? AND pipeline_version = ?
        ORDER BY score DESC, id ASC
      `),
    },
    editorialPackets: {
      getByEdition: db.prepare(`
        SELECT * FROM oiko_news_editorial_packets
        WHERE edition_date = ? AND pipeline_version = ?
        LIMIT 1
      `),
      upsert: db.prepare(`
        INSERT INTO oiko_news_editorial_packets (
          edition_date,
          pipeline_version,
          status,
          visibility,
          quality_state,
          packet_json,
          draft_json,
          evidence_json,
          content_json,
          market_context_json,
          asset_manifest_json,
          html,
          text,
          archive_teaser,
          publication_reason,
          publication_reason_code,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(edition_date, pipeline_version) DO UPDATE SET
          status = excluded.status,
          visibility = excluded.visibility,
          quality_state = excluded.quality_state,
          packet_json = excluded.packet_json,
          draft_json = excluded.draft_json,
          evidence_json = excluded.evidence_json,
          content_json = excluded.content_json,
          market_context_json = excluded.market_context_json,
          asset_manifest_json = excluded.asset_manifest_json,
          html = excluded.html,
          text = excluded.text,
          archive_teaser = excluded.archive_teaser,
          publication_reason = excluded.publication_reason,
          publication_reason_code = excluded.publication_reason_code,
          updated_at = CURRENT_TIMESTAMP
      `),
      listRecent: db.prepare(`
        SELECT * FROM oiko_news_editorial_packets
        WHERE pipeline_version = ?
        ORDER BY edition_date DESC
        LIMIT ?
      `),
    },
    qualityReports: {
      clearByEdition: db.prepare(`
        DELETE FROM oiko_news_quality_reports
        WHERE edition_date = ? AND pipeline_version = ?
      `),
      upsert: db.prepare(`
        INSERT INTO oiko_news_quality_reports (
          edition_date,
          pipeline_version,
          stage,
          status,
          summary_text,
          metrics_json,
          issues_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(edition_date, pipeline_version, stage) DO UPDATE SET
          status = excluded.status,
          summary_text = excluded.summary_text,
          metrics_json = excluded.metrics_json,
          issues_json = excluded.issues_json
      `),
      listByEdition: db.prepare(`
        SELECT * FROM oiko_news_quality_reports
        WHERE edition_date = ? AND pipeline_version = ?
        ORDER BY id ASC
      `),
    },
  },
};

export default oikoQueries;
