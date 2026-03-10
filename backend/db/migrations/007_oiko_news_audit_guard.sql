ALTER TABLE oiko_news_editions ADD COLUMN is_audit INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_oiko_editions_is_audit_date
  ON oiko_news_editions(is_audit, edition_date DESC);

UPDATE oiko_news_editions
SET is_audit = 1
WHERE edition_date IN (
  SELECT DISTINCT job_date
  FROM oiko_news_job_runs
  WHERE COALESCE(meta_json, '') LIKE '%"fixtureMode"%'
)
   OR edition_date IN (
     SELECT DISTINCT e.edition_date
     FROM oiko_news_editions e
     JOIN oiko_news_send_logs l ON l.edition_id = e.id
     WHERE l.email = 'audit.oiko@example.com'
   );
