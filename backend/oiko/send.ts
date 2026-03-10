import nodemailer from 'nodemailer';
import OIKO_CONFIG from './config.ts';
import { renderEditionHtml, renderEditionText } from './render.ts';
import { oikoQueries } from './queries.ts';
import { buildUnsubscribeToken, safeJsonParse, toAbsoluteUrl } from './utils.ts';

let cachedTransporter: any = null;

/** Max retry attempts per recipient. Overridable via OIKO_SEND_MAX_RETRIES. */
const MAX_RETRIES = Number(process.env.OIKO_SEND_MAX_RETRIES) || 2;

/** Base delay in ms for exponential backoff between retries. */
const RETRY_BASE_DELAY_MS = 1500;

async function sendWithRetry(
  transporter: any,
  mailOptions: Record<string, unknown>,
  maxRetries: number,
): Promise<{ messageId: string | null }> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return { messageId: info.messageId || null };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

function isLocalPublicBaseUrl(url: string) {
  return /localhost|127\.0\.0\.1/i.test(String(url || ''));
}

function assertSendablePublicBaseUrl({ dryRun = false } = {}) {
  if (dryRun) return;
  if (String(process.env.NODE_ENV || '').toLowerCase() !== 'production') return;
  if (isLocalPublicBaseUrl(OIKO_CONFIG.publicBaseUrl)) {
    throw new Error('OIKO_PUBLIC_BASE_URL must be a public URL in production before sending Oiko News emails.');
  }
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  if (process.env.OIKO_SMTP_HOST) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.OIKO_SMTP_HOST,
      port: Number(process.env.OIKO_SMTP_PORT || 587),
      secure: String(process.env.OIKO_SMTP_SECURE || 'false') === 'true',
      auth: process.env.OIKO_SMTP_USER
        ? {
            user: process.env.OIKO_SMTP_USER,
            pass: process.env.OIKO_SMTP_PASS,
          }
        : undefined,
    });
    return cachedTransporter;
  }

  if (process.env.OIKO_SENDMAIL_PATH) {
    cachedTransporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: process.env.OIKO_SENDMAIL_PATH,
    });
    return cachedTransporter;
  }

  return null;
}

export async function sendEdition(edition: any, { dryRun = false } = {}) {
  assertSendablePublicBaseUrl({ dryRun });
  const transporter = getTransporter();
  const recipients = oikoQueries.subscriptions.listActiveRecipients.all();
  const results = [];
  const content = safeJsonParse(edition.content_json, null);

  if (!content) {
    throw new Error('Edition content is missing or invalid');
  }

  for (const subscription of recipients) {
    const existingLog = oikoQueries.sendLogs.getByEditionAndSubscription.get(edition.id, subscription.id);
    if (existingLog?.status === 'sent') {
      results.push({ subscriptionId: subscription.id, status: 'skipped', reason: 'already_sent' });
      continue;
    }

    const token = buildUnsubscribeToken(subscription);
    const unsubscribeUrl = toAbsoluteUrl(OIKO_CONFIG.frontendBaseUrl, `/oiko-news?unsubscribe=${encodeURIComponent(token)}`);
    const html = renderEditionHtml({ payload: content, unsubscribeUrl });
    const text = renderEditionText({ payload: content, unsubscribeUrl });

    if (dryRun || !transporter) {
      oikoQueries.sendLogs.insert.run(edition.id, subscription.id, subscription.email_original, 'skipped', null, dryRun ? 'dry_run' : 'missing_transporter');
      results.push({ subscriptionId: subscription.id, status: 'skipped', reason: dryRun ? 'dry_run' : 'missing_transporter' });
      continue;
    }

    try {
      const info = await sendWithRetry(transporter, {
        from: OIKO_CONFIG.mailFrom,
        to: subscription.email_original,
        subject: content.email_subject,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }, MAX_RETRIES);

      oikoQueries.sendLogs.insert.run(edition.id, subscription.id, subscription.email_original, 'sent', info.messageId, null);
      oikoQueries.subscriptions.updateLastSentEdition.run(edition.id, subscription.id);
      results.push({ subscriptionId: subscription.id, status: 'sent', messageId: info.messageId });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      oikoQueries.sendLogs.insert.run(edition.id, subscription.id, subscription.email_original, 'error', null, message);
      results.push({ subscriptionId: subscription.id, status: 'error', error: message });
    }
  }

  return {
    transporterConfigured: Boolean(transporter),
    totalRecipients: recipients.length,
    results,
  };
}

export default {
  sendEdition,
};
