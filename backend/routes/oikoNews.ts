import express from 'express';
import type { Request, Response } from 'express';
import { requireAuth } from '../ai/middleware/auth.js';
import OIKO_CONFIG from '../oiko/config.ts';
import { oikoQueries } from '../oiko/queries.ts';
import {
  buildStoredUnsubscribeHash,
  buildUnsubscribeToken,
  hashUnsubscribeToken,
  normalizeEmail,
  safeJsonParse,
  toAbsoluteUrl,
  getTodayInTimeZone,
} from '../oiko/utils.ts';
import { blockToPlainText } from '../oiko/content.ts';

const router = express.Router();

type OikoRequest = Request & { user?: { uid?: string; email?: string | null } };

function extractEditionIntro(content: any) {
  if (!content) return '';
  if (typeof content.intro === 'string') return content.intro;
  if (content.content_version === 'v2.1' || content.content_version === 'v2') {
    return blockToPlainText(content.intro?.paragraphs?.[0]) || '';
  }
  return content.intro || '';
}

function extractEditionSummary(content: any) {
  if (!content) return [];
  if (content.content_version === 'v2.1') {
    return Array.isArray(content.opening_brief?.items)
      ? content.opening_brief.items.map((item: any) => `${item.label}: ${blockToPlainText({ parts: item.parts || [] })}`)
      : [];
  }
  if (content.content_version === 'v2') {
    return Array.isArray(content.menu_of_the_day)
      ? content.menu_of_the_day.map((item: any) => `${item.label}: ${blockToPlainText({ parts: item.parts || [] })}`)
      : [];
  }
  return Array.isArray(content.summary) ? content.summary : [];
}

function trimTeaserText(text: string, maxLength = 190) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= maxLength) return clean;

  const slice = clean.slice(0, maxLength + 1);
  const breakIndex = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('; '), slice.lastIndexOf(', '));
  if (breakIndex >= Math.floor(maxLength * 0.55)) {
    return `${slice.slice(0, breakIndex).trim().replace(/[.,;:!?-]+$/, '')}…`;
  }
  return `${slice.slice(0, maxLength).trim()}…`;
}

function buildArchiveTeaser(content: any, editorialAngle: string) {
  const intro = trimTeaserText(extractEditionIntro(content), 190);
  if (intro) return intro;

  const labels = extractEditionSummary(content)
    .slice(0, 3)
    .map((item: string) => String(item).split(':')[0].trim())
    .filter(Boolean);
  const leadTitle = trimTeaserText(String(content?.lead_story?.title || editorialAngle || ''), 120);

  if (leadTitle && labels.length) {
    return trimTeaserText(`${leadTitle}. Repères du matin : ${labels.join(', ')}.`, 190);
  }
  if (leadTitle) return leadTitle;
  if (labels.length) return `Repères du matin : ${labels.join(', ')}.`;
  return 'Résumé disponible dans l’édition complète.';
}
function shapeEdition(row: any) {
  if (!row) return null;
  const assets = oikoQueries.assets.listByEditionId.all(row.id);
  return {
    id: row.id,
    editionDate: row.edition_date,
    slug: row.slug,
    status: row.status,
    contentVersion: row.content_version || 'v1',
    editorialAngle: row.editorial_angle,
    marketRegime: row.market_regime,
    evidenceCoverageScore: row.evidence_coverage_score,
    sentAt: row.sent_at,
    createdAt: row.created_at,
    chartManifest: safeJsonParse(row.chart_manifest_json, []),
    assetManifest: assets,
    emailHtmlUrl: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/api/oiko-news/${row.slug}/email-html`),
    content: safeJsonParse(row.content_json, null),
  };
}

router.get('/oiko-news/latest', (_req, res) => {
  const maxEditionDate = getTodayInTimeZone();
  const latest = oikoQueries.editions.getLatestPublic.get(maxEditionDate);
  if (!latest) {
    return res.status(404).json({ error: 'No Oiko edition available yet' });
  }
  res.json({ edition: shapeEdition(latest) });
});

router.get('/oiko-news/archive', (req, res) => {
  const maxEditionDate = getTodayInTimeZone();
  const page = Math.max(1, Number(req.query.page || 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize || 10)));
  const rows = oikoQueries.editions.getArchivePublic.all(maxEditionDate, pageSize, (page - 1) * pageSize);
  res.json({
    page,
    pageSize,
    editions: rows.map((row: any) => {
      const content = safeJsonParse(row.content_json, null);
      return {
        editionDate: row.edition_date,
        slug: row.slug,
        status: row.status,
        contentVersion: row.content_version || 'v1',
        editorialAngle: row.editorial_angle,
        marketRegime: row.market_regime,
        evidenceCoverageScore: row.evidence_coverage_score,
        intro: row.archive_teaser || buildArchiveTeaser(content, row.editorial_angle),
        emailSubject: content?.email_subject || '',
        summary: extractEditionSummary(content),
      };
    }),
  });
});

router.get('/oiko-news/subscription/me', requireAuth, (req: OikoRequest, res: Response) => {
  const email = normalizeEmail(req.user?.email);
  if (!email) {
    return res.status(400).json({ error: 'Authenticated user has no email address' });
  }

  const row = oikoQueries.subscriptions.getByEmail.get(email);
  res.json({
    subscription: row
      ? {
          subscribed: row.status === 'active',
          status: row.status,
          consentSource: row.consent_source,
          subscribedAt: row.subscribed_at,
          email: row.email_original,
        }
      : {
          subscribed: false,
          status: 'inactive',
          consentSource: null,
          subscribedAt: null,
          email: req.user?.email || null,
        },
  });
});

router.put('/oiko-news/subscription/me', requireAuth, (req: OikoRequest, res: Response) => {
  const email = normalizeEmail(req.user?.email);
  if (!email) {
    return res.status(400).json({ error: 'Authenticated user has no email address' });
  }

  const subscribed = Boolean(req.body?.subscribed);
  const consentSource = String(req.body?.consentSource || 'page').slice(0, 60);
  const subscriptionSeed = {
    id: oikoQueries.subscriptions.getByEmail.get(email)?.id || 0,
    email_normalized: email,
  };

  oikoQueries.subscriptions.upsert.run(
    req.user?.uid || null,
    req.user?.email,
    email,
    subscribed ? 'active' : 'unsubscribed',
    consentSource,
    subscribed ? null : new Date().toISOString(),
    buildStoredUnsubscribeHash(subscriptionSeed),
  );

  const stored = oikoQueries.subscriptions.getByEmail.get(email);
  if (stored && stored.unsubscribe_token_hash !== buildStoredUnsubscribeHash(stored)) {
    oikoQueries.subscriptions.upsert.run(
      req.user?.uid || null,
      req.user?.email,
      email,
      subscribed ? 'active' : 'unsubscribed',
      consentSource,
      subscribed ? null : new Date().toISOString(),
      buildStoredUnsubscribeHash(stored),
    );
  }

  const row = oikoQueries.subscriptions.getByEmail.get(email);
  res.json({
    subscription: {
      subscribed: row.status === 'active',
      status: row.status,
      consentSource: row.consent_source,
      subscribedAt: row.subscribed_at,
      email: row.email_original,
      unsubscribeTokenPreview: buildUnsubscribeToken(row),
    },
  });
});

router.post('/oiko-news/unsubscribe', (req, res) => {
  const token = String(req.body?.token || '').trim();
  if (!token) {
    return res.status(400).json({ error: 'token is required' });
  }

  const row = oikoQueries.subscriptions.getByUnsubscribeHash.get(hashUnsubscribeToken(token));
  if (!row) {
    return res.status(404).json({ error: 'Unknown unsubscribe token' });
  }

  oikoQueries.subscriptions.updateStatusById.run('unsubscribed', new Date().toISOString(), row.id);
  res.json({ success: true });
});

router.get('/oiko-news/:slug/email-html', (req, res) => {
  const row = oikoQueries.editions.getPublicBySlug.get(req.params.slug, getTodayInTimeZone());
  if (!row?.html) {
    return res.status(404).json({ error: 'Email preview not found' });
  }

  res.set('Cache-Control', 'no-store');
  res.type('html').send(row.html);
});

router.get('/oiko-news/:slug', (req, res) => {
  const row = oikoQueries.editions.getPublicBySlug.get(req.params.slug, getTodayInTimeZone());
  if (!row) {
    return res.status(404).json({ error: 'Edition not found' });
  }

  res.json({ edition: shapeEdition(row) });
});

export default router;
