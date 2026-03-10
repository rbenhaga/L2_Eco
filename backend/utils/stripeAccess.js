import { checkoutOrderQueries, subscriptionQueries } from '../db/database.js';

export const PASS_PARTIELS_OFFER_KEY = 'pass_partiels_s4';
export const PREMIUM_TIER = 'premium';

const DEFAULT_PASS_DURATION_DAYS = 30;
const DEFAULT_CHECKOUT_SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;
const SECONDS_PER_DAY = 24 * 60 * 60;

function getUnixNow() {
  return Math.floor(Date.now() / 1000);
}

function normalizePositiveInteger(value, fallback) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
}

function normalizeStripeReference(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && typeof value.id === 'string') return value.id;
  return null;
}

function normalizeNullableInteger(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.floor(numeric) : null;
}

function normalizeCurrency(value) {
  return typeof value === 'string' && value.trim() ? value.trim().toLowerCase() : null;
}

function toIsoOrNull(unixSeconds) {
  const numeric = Number(unixSeconds);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return new Date(numeric * 1000).toISOString();
}

export function getPassDurationDays() {
  return normalizePositiveInteger(process.env.STRIPE_PASS_DURATION_DAYS, DEFAULT_PASS_DURATION_DAYS);
}

export function getPassPriceId() {
  return String(
    process.env.STRIPE_PRICE_ID_PASS_PARTIELS_S4
    || process.env.STRIPE_PRICE_ID_SEMESTER
    || process.env.STRIPE_PRICE_ID
    || ''
  ).trim();
}

export function getCheckoutSessionMaxAgeSeconds() {
  return normalizePositiveInteger(
    process.env.STRIPE_CHECKOUT_SESSION_MAX_AGE_SECONDS,
    DEFAULT_CHECKOUT_SESSION_MAX_AGE_SECONDS
  );
}

export function isSubscriptionActive(subscription, nowUnix = getUnixNow()) {
  if (!subscription) return false;
  if (subscription.tier !== PREMIUM_TIER || subscription.status !== 'active') return false;
  if (!subscription.current_period_end) return true;
  return Number(subscription.current_period_end) > nowUnix;
}

export function isIncompletePremiumGrant(subscription) {
  if (!subscription) return false;
  return subscription.tier === PREMIUM_TIER
    && subscription.status === 'active'
    && !subscription.current_period_end
    && !subscription.stripe_subscription_id
    && !subscription.stripe_checkout_session_id;
}

function computePassAccessEnd(durationDays, nowUnix = getUnixNow()) {
  return nowUnix + durationDays * SECONDS_PER_DAY;
}

async function resolveInvoicePaidAtUnix(stripe, invoiceRef) {
  if (!invoiceRef) return null;

  const embeddedPaidAt = normalizeNullableInteger(invoiceRef?.status_transitions?.paid_at);
  if (embeddedPaidAt) {
    return embeddedPaidAt;
  }

  const invoiceId = normalizeStripeReference(invoiceRef);
  if (!invoiceId) {
    return null;
  }

  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return normalizeNullableInteger(invoice?.status_transitions?.paid_at);
  } catch (_error) {
    return null;
  }
}

async function resolvePaymentIntentCreatedAtUnix(stripe, paymentIntentRef) {
  if (!paymentIntentRef) return null;

  const embeddedCreatedAt = normalizeNullableInteger(paymentIntentRef?.created);
  if (embeddedCreatedAt) {
    return embeddedCreatedAt;
  }

  const paymentIntentId = normalizeStripeReference(paymentIntentRef);
  if (!paymentIntentId) {
    return null;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return normalizeNullableInteger(paymentIntent?.created);
  } catch (_error) {
    return null;
  }
}

async function resolveCheckoutPaidAtUnix(stripe, session) {
  const invoicePaidAt = await resolveInvoicePaidAtUnix(stripe, session.invoice);
  if (invoicePaidAt) {
    return invoicePaidAt;
  }

  const paymentIntentCreatedAt = await resolvePaymentIntentCreatedAtUnix(stripe, session.payment_intent);
  if (paymentIntentCreatedAt) {
    return paymentIntentCreatedAt;
  }

  return normalizePositiveInteger(session.created, getUnixNow());
}

function getExistingAccessStartUnix(subscription, durationDays, paidAtUnix) {
  const currentEnd = normalizeNullableInteger(subscription?.current_period_end);
  if (!currentEnd) {
    return paidAtUnix;
  }

  const priorStart = currentEnd - durationDays * SECONDS_PER_DAY;
  return Math.max(paidAtUnix, priorStart);
}

function recordCheckoutOrder({
  userId,
  session,
  durationDays,
  cancelToken,
  accessGranted,
  accessStartAt,
  accessEndAt,
  accessSource,
  paidAt,
}) {
  checkoutOrderQueries.upsert.run(
    userId,
    PASS_PARTIELS_OFFER_KEY,
    cancelToken,
    session.id,
    normalizeStripeReference(session.payment_intent),
    normalizeStripeReference(session.customer),
    normalizeStripeReference(session.invoice),
    String(session.metadata?.priceId || getPassPriceId() || '').trim() || null,
    normalizeNullableInteger(session.amount_total),
    normalizeCurrency(session.currency),
    typeof session.status === 'string' ? session.status : null,
    typeof session.payment_status === 'string' ? session.payment_status : null,
    durationDays,
    accessGranted ? 1 : 0,
    accessStartAt,
    accessEndAt,
    accessSource,
    normalizePositiveInteger(session.created, getUnixNow()),
    paidAt
  );
}

export function serializeSubscription(subscription, nowUnix = getUnixNow()) {
  const active = isSubscriptionActive(subscription, nowUnix);
  if (!subscription || !active) {
    return {
      tier: 'free',
      status: 'inactive',
      currentPeriodEnd: null,
      offerKey: PASS_PARTIELS_OFFER_KEY,
      canManageBilling: Boolean(subscription?.stripe_customer_id),
    };
  }

  return {
    tier: subscription.tier,
    status: subscription.status,
    currentPeriodEnd: toIsoOrNull(subscription.current_period_end),
    offerKey: subscription.offer_key || PASS_PARTIELS_OFFER_KEY,
    canManageBilling: Boolean(subscription.stripe_customer_id),
  };
}

export async function activatePassAccessFromCheckoutSession(stripe, session, source = 'stripe_checkout_payment') {
  const userId = String(session.client_reference_id || session.metadata?.userId || '').trim();
  if (!userId) {
    throw new Error('Checkout session is missing the user identifier');
  }

  if (session.mode !== 'payment') {
    throw new Error(`Unsupported checkout mode for pass access: ${session.mode}`);
  }

  if (session.payment_status !== 'paid') {
    recordCheckoutOrder({
      userId,
      session,
      durationDays: normalizePositiveInteger(session.metadata?.accessDurationDays, getPassDurationDays()),
      cancelToken: typeof session.metadata?.cancelToken === 'string' ? session.metadata.cancelToken : null,
      accessGranted: false,
      accessStartAt: null,
      accessEndAt: null,
      accessSource: source,
      paidAt: null,
    });

    return {
      activated: false,
      reason: session.payment_status || 'unpaid',
      subscription: subscriptionQueries.getByUserId.get(userId),
    };
  }

  const durationDays = normalizePositiveInteger(session.metadata?.accessDurationDays, getPassDurationDays());
  const paidAtUnix = await resolveCheckoutPaidAtUnix(stripe, session);
  const customerId = normalizeStripeReference(session.customer);
  const paymentIntentId = normalizeStripeReference(session.payment_intent);
  const priceId = String(session.metadata?.priceId || getPassPriceId() || '').trim() || null;
  const cancelToken = typeof session.metadata?.cancelToken === 'string' ? session.metadata.cancelToken : null;
  const existingOrder = checkoutOrderQueries.getByCheckoutSessionId.get(session.id);
  const existingSubscription = subscriptionQueries.getByUserId.get(userId);
  const sameSessionAlreadyApplied = existingSubscription?.stripe_checkout_session_id === session.id
    && isSubscriptionActive(existingSubscription, paidAtUnix);

  if (existingOrder?.access_granted || sameSessionAlreadyApplied) {
    const subscription = existingSubscription || subscriptionQueries.getByCheckoutSessionId.get(session.id);
    const accessEndAt = normalizeNullableInteger(subscription?.current_period_end);
    recordCheckoutOrder({
      userId,
      session,
      durationDays,
      cancelToken,
      accessGranted: true,
      accessStartAt: subscription ? getExistingAccessStartUnix(subscription, durationDays, paidAtUnix) : paidAtUnix,
      accessEndAt,
      accessSource: existingOrder?.access_source || source,
      paidAt: existingOrder?.paid_at || paidAtUnix,
    });

    return {
      activated: true,
      reason: 'already_processed',
      subscription,
    };
  }

  const accessStartAt = isSubscriptionActive(existingSubscription, paidAtUnix)
    && normalizeNullableInteger(existingSubscription?.current_period_end)
    && Number(existingSubscription.current_period_end) > paidAtUnix
    ? Number(existingSubscription.current_period_end)
    : paidAtUnix;
  const expiresAt = computePassAccessEnd(durationDays, accessStartAt);

  subscriptionQueries.upsert.run(
    userId,
    PREMIUM_TIER,
    'active',
    PASS_PARTIELS_OFFER_KEY,
    customerId,
    null,
    session.id,
    paymentIntentId,
    priceId,
    source,
    expiresAt
  );

  recordCheckoutOrder({
    userId,
    session,
    durationDays,
    cancelToken,
    accessGranted: true,
    accessStartAt,
    accessEndAt: expiresAt,
    accessSource: source,
    paidAt: paidAtUnix,
  });

  return {
    activated: true,
    reason: accessStartAt > paidAtUnix ? 'extended' : 'paid',
    subscription: subscriptionQueries.getByUserId.get(userId),
  };
}

export async function activateLegacySubscriptionFromCheckoutSession(stripe, session, source = 'stripe_subscription_checkout') {
  const userId = String(session.client_reference_id || session.metadata?.userId || '').trim();
  const customerId = normalizeStripeReference(session.customer);
  const subscriptionId = normalizeStripeReference(session.subscription);

  if (!userId || !subscriptionId) {
    throw new Error('Legacy subscription checkout session is missing identifiers');
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  subscriptionQueries.upsert.run(
    userId,
    PREMIUM_TIER,
    subscription.status === 'active' ? 'active' : 'inactive',
    'legacy_subscription',
    customerId,
    subscriptionId,
    session.id,
    normalizeStripeReference(session.payment_intent),
    String(session.metadata?.priceId || getPassPriceId() || '').trim() || null,
    source,
    subscription.current_period_end
  );

  return {
    activated: subscription.status === 'active',
    reason: subscription.status,
    subscription: subscriptionQueries.getByUserId.get(userId),
  };
}

export async function syncCheckoutSessionAccess(stripe, session, source) {
  if (session.mode === 'payment') {
    return activatePassAccessFromCheckoutSession(stripe, session, source);
  }

  if (session.mode === 'subscription') {
    return activateLegacySubscriptionFromCheckoutSession(stripe, session, source);
  }

  throw new Error(`Unsupported checkout mode: ${session.mode}`);
}

export async function getVerifiedCheckoutSession(stripe, sessionId, expectedUserId, expand = [], maxAgeSeconds = getCheckoutSessionMaxAgeSeconds()) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, expand.length > 0 ? { expand } : undefined);
  const ownerId = String(session.client_reference_id || session.metadata?.userId || '').trim();

  if (!ownerId || ownerId !== expectedUserId) {
    throw new Error('Checkout session does not belong to the current user');
  }

  const createdAt = Number(session.created || 0);
  const nowUnix = getUnixNow();

  if (Number.isFinite(createdAt) && createdAt > 0 && maxAgeSeconds > 0) {
    if (nowUnix - createdAt > maxAgeSeconds) {
      throw new Error('Checkout session is no longer valid');
    }
  }

  return session;
}
