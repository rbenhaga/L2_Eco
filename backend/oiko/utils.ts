import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const OIKO_TIMEZONE = 'Europe/Paris';

export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

export function safeJsonParse(value, fallback = null) {
  if (!value || typeof value !== 'string') {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

export function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'oiko-news';
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getTokenSecret() {
  return process.env.OIKO_TOKEN_SECRET || 'oiko-news-dev-secret';
}

export function signHmac(value) {
  return crypto.createHmac('sha256', getTokenSecret()).update(String(value)).digest('hex');
}

export function buildUnsubscribeToken(subscription) {
  const payload = `${subscription.id}:${subscription.email_normalized}`;
  return `${subscription.id}.${signHmac(payload).slice(0, 32)}`;
}

export function hashUnsubscribeToken(token) {
  return signHmac(String(token));
}

export function buildStoredUnsubscribeHash(subscription) {
  return hashUnsubscribeToken(buildUnsubscribeToken(subscription));
}

export function toAbsoluteUrl(baseUrl, pathname) {
  return new URL(pathname, baseUrl).toString();
}

export function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function parseJsonArray(value) {
  const parsed = safeJsonParse(value, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  return numbers.reduce((sum, current) => sum + Number(current || 0), 0) / numbers.length;
}

export function dedupeWords(value) {
  return Array.from(new Set(String(value || '').toLowerCase().split(/\s+/).filter(Boolean)));
}

export function normalizeTitle(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function titleSimilarity(a, b) {
  const wordsA = dedupeWords(normalizeTitle(a));
  const wordsB = dedupeWords(normalizeTitle(b));
  if (!wordsA.length || !wordsB.length) {
    return 0;
  }

  const setB = new Set(wordsB);
  const intersection = wordsA.filter((word) => setB.has(word)).length;
  return intersection / Math.max(wordsA.length, wordsB.length);
}

export function buildDedupeKey(title, domain = '') {
  const normalized = normalizeTitle(title).split(' ').slice(0, 8).join('-');
  return slugify(`${domain}-${normalized}`);
}

export function toIsoString(date) {
  return new Date(date).toISOString();
}

function parseOffsetToMinutes(offsetText) {
  const cleaned = String(offsetText || '').replace('GMT', '');
  const match = cleaned.match(/^([+-])(\d{1,2})(?::?(\d{2}))?$/);
  if (!match) {
    return 0;
  }
  const sign = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
}

export function getTimeZoneOffsetMinutes(date, timeZone = OIKO_TIMEZONE) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const offsetPart = formatter.formatToParts(date).find((part) => part.type === 'timeZoneName');
  return parseOffsetToMinutes(offsetPart?.value || 'GMT+0');
}

export function zonedDateTimeToUtc(localDateTime, timeZone = OIKO_TIMEZONE) {
  const guess = new Date(`${localDateTime}Z`);
  const offsetMinutes = getTimeZoneOffsetMinutes(guess, timeZone);
  return new Date(guess.getTime() - offsetMinutes * 60 * 1000);
}

export function formatDateInTimeZone(date, timeZone = OIKO_TIMEZONE) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

export function addDays(dateString, amount) {
  const date = new Date(`${dateString}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function getTodayInTimeZone(timeZone = OIKO_TIMEZONE) {
  return formatDateInTimeZone(new Date(), timeZone);
}

export function getEditionWindow(editionDate = getTodayInTimeZone(), timeZone = OIKO_TIMEZONE) {
  const previousDate = addDays(editionDate, -1);
  const startLocal = `${previousDate}T06:30:00`;
  const endLocal = `${editionDate}T06:29:59`;
  const freezeLocal = `${editionDate}T06:30:00`;
  const sendLocal = `${editionDate}T07:00:00`;

  return {
    editionDate,
    timeZone,
    startLocal,
    endLocal,
    freezeLocal,
    sendLocal,
    startIso: zonedDateTimeToUtc(startLocal, timeZone).toISOString(),
    endIso: zonedDateTimeToUtc(endLocal, timeZone).toISOString(),
    freezeIso: zonedDateTimeToUtc(freezeLocal, timeZone).toISOString(),
    sendIso: zonedDateTimeToUtc(sendLocal, timeZone).toISOString(),
  };
}

export function isWithinWindow(isoDate, window) {
  const value = new Date(isoDate).getTime();
  return value >= new Date(window.startIso).getTime() && value <= new Date(window.endIso).getTime();
}

export function marketRegimeFromChanges(changes = []) {
  if (!changes.length) {
    return 'mixed';
  }

  const positives = changes.filter((value) => value > 0.4).length;
  const negatives = changes.filter((value) => value < -0.4).length;
  if (negatives >= positives + 1) return 'risk_off';
  if (positives >= negatives + 1) return 'risk_on';
  return 'mixed';
}

export function writeJsonFile(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
}

export function trimText(value, maxLength) {
  const text = String(value || '').trim();
  if (!maxLength || text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}
