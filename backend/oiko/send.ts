import nodemailer, { type SendMailOptions, type Transporter } from 'nodemailer';
import OIKO_CONFIG from './config.ts';
import { renderEditionHtml, renderEditionText } from './render.ts';
import { oikoQueries } from './queries.ts';
import { buildUnsubscribeToken, safeJsonParse, toAbsoluteUrl } from './utils.ts';

type SubscriptionRecipient = {
  id: number;
  email_original: string;
};

type SendRetryError = Error & {
  code?: string;
  errno?: string;
  responseCode?: number;
};

let cachedTransporter: Transporter | null = null;

const MAX_RETRIES = Number(process.env.OIKO_SEND_MAX_RETRIES) || 2;
const RETRY_BASE_DELAY_MS = 1000;
const TRANSIENT_ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'ESOCKET', 'EPIPE']);
const TRANSIENT_SMTP_CODES = new Set([421, 450, 451, 452]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientSendError(error: unknown) {
  if (!(error instanceof Error)) return false;
  const typedError = error as SendRetryError;
  return TRANSIENT_ERROR_CODES.has(String(typedError.code || typedError.errno || ''))
    || TRANSIENT_SMTP_CODES.has(Number(typedError.responseCode || 0));
}

function withAttemptCount(error: unknown, attempts: number) {
  if (error instanceof Error) {
    const wrapped = new Error(`${error.message} (after ${attempts} attempt(s))`);
    const typedWrapped = wrapped as SendRetryError;
    const typedError = error as SendRetryError;
    typedWrapped.code = typedError.code;
    typedWrapped.errno = typedError.errno;
    typedWrapped.responseCode = typedError.responseCode;
    return wrapped;
  }
  return new Error(`${String(error)} (after ${attempts} attempt(s))`);
}

async function sendWithRetry(
  transporter: Transporter,
  mailOptions: SendMailOptions,
  maxRetries: number,
): Promise<{ messageId: string | null; attempts: number }> {
  const maxAttempts = Math.max(1, maxRetries + 1);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return {
        messageId: info.messageId || null,
        attempts: attempt,
      };
    } catch (error) {
      const shouldRetry = attempt < maxAttempts && isTransientSendError(error);
      if (!shouldRetry) {
        throw withAttemptCount(error, attempt);
      }
      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }

  throw new Error('Unexpected mail retry state.');
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

export async function sendEdition(edition: { id: number; content_json: string }, { dryRun = false } = {}) {
  assertSendablePublicBaseUrl({ dryRun });
  const transporter = getTransporter();
  const recipients = oikoQueries.subscriptions.listActiveRecipients.all() as SubscriptionRecipient[];
  const results: Array<Record<string, unknown>> = [];
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
      const reason = dryRun ? 'dry_run' : 'missing_transporter';
      oikoQueries.sendLogs.insert.run(edition.id, subscription.id, subscription.email_original, 'skipped', null, reason);
      results.push({ subscriptionId: subscription.id, status: 'skipped', reason });
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
      results.push({ subscriptionId: subscription.id, status: 'sent', messageId: info.messageId, attempts: info.attempts });
    } catch (error) {
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
