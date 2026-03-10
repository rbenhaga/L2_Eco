import express from 'express';
import { randomUUID } from 'crypto';
import Stripe from 'stripe';
import { checkoutOrderQueries, subscriptionQueries } from '../db/database.js';
import { requireAuth } from '../ai/middleware/auth.js';
import {
    PASS_PARTIELS_OFFER_KEY,
    getCheckoutSessionMaxAgeSeconds,
    getPassDurationDays,
    getPassPriceId,
    getVerifiedCheckoutSession,
    isSubscriptionActive,
    serializeSubscription,
    syncCheckoutSessionAccess,
} from '../utils/stripeAccess.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const INVOICE_LOOKUP_TIMEOUT_MS = 4000;
const PENDING_CHECKOUT_REUSE_WINDOW_SECONDS = 30 * 60;
const CHECKOUT_CONFIG_CACHE_TTL_MS = 5 * 60 * 1000;
const CHECKOUT_CANCEL_TOKEN_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
});

let checkoutConfigCache = {
    expiresAt: 0,
    data: null,
};

function normalizeNullableInteger(value) {
    if (value === null || value === undefined || value === '') return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? Math.floor(numeric) : null;
}

function normalizeCurrency(value) {
    return typeof value === 'string' && value.trim() ? value.trim().toUpperCase() : null;
}

function normalizeStripeReference(value) {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && typeof value.id === 'string') return value.id;
    return null;
}

function formatPriceLabel(amountTotal, currency) {
    if (!Number.isFinite(amountTotal) || !currency) {
        return null;
    }

    try {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
        }).format(amountTotal / 100);
    } catch (_error) {
        return null;
    }
}

function formatAccessEndDate(unixSeconds) {
    const numeric = Number(unixSeconds);
    if (!Number.isFinite(numeric) || numeric <= 0) {
        return null;
    }

    return DATE_FORMATTER.format(new Date(numeric * 1000));
}

async function getCheckoutOfferConfig() {
    const now = Date.now();
    if (checkoutConfigCache.data && checkoutConfigCache.expiresAt > now) {
        return checkoutConfigCache.data;
    }

    const priceId = getPassPriceId();
    const durationDays = getPassDurationDays();
    if (!priceId) {
        throw new Error('Stripe price ID is not configured');
    }

    const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
    const productName = typeof price.product === 'object' && typeof price.product?.name === 'string'
        ? price.product.name
        : 'Pass Partiels S4';
    const amountTotal = normalizeNullableInteger(price.unit_amount);
    const currency = normalizeCurrency(price.currency) || 'EUR';
    const data = {
        offerKey: PASS_PARTIELS_OFFER_KEY,
        offerLabel: productName,
        amountTotal,
        amountLabel: formatPriceLabel(amountTotal, currency) || '7,99 €',
        currency,
        durationDays,
    };

    checkoutConfigCache = {
        expiresAt: now + CHECKOUT_CONFIG_CACHE_TTL_MS,
        data,
    };

    return data;
}

function isCheckoutCancelToken(value) {
    return typeof value === 'string' && CHECKOUT_CANCEL_TOKEN_PATTERN.test(value.trim());
}

function serializePaymentAttempt(paymentIntent) {
    if (!paymentIntent || typeof paymentIntent !== 'object') {
        return null;
    }

    const lastError = paymentIntent.last_payment_error && typeof paymentIntent.last_payment_error === 'object'
        ? paymentIntent.last_payment_error
        : null;

    return {
        id: typeof paymentIntent.id === 'string' ? paymentIntent.id : null,
        status: typeof paymentIntent.status === 'string' ? paymentIntent.status : null,
        declineCode: typeof lastError?.decline_code === 'string' ? lastError.decline_code : null,
        code: typeof lastError?.code === 'string' ? lastError.code : null,
        message: typeof lastError?.message === 'string' ? lastError.message : null,
        type: typeof lastError?.type === 'string' ? lastError.type : null,
    };
}

function serializeInvoice(invoice) {
    if (!invoice || typeof invoice !== 'object') {
        return null;
    }

    return {
        id: typeof invoice.id === 'string' ? invoice.id : null,
        number: typeof invoice.number === 'string' ? invoice.number : null,
        status: typeof invoice.status === 'string' ? invoice.status : null,
        hostedInvoiceUrl: typeof invoice.hosted_invoice_url === 'string' ? invoice.hosted_invoice_url : null,
        invoicePdf: typeof invoice.invoice_pdf === 'string' ? invoice.invoice_pdf : null,
    };
}

async function getInvoiceForSession(session) {
    const invoiceRef = session?.invoice;
    const invoiceId = typeof invoiceRef === 'string'
        ? invoiceRef
        : invoiceRef && typeof invoiceRef === 'object' && typeof invoiceRef.id === 'string'
            ? invoiceRef.id
            : null;

    if (!invoiceId) {
        return null;
    }

    try {
        const invoice = await Promise.race([
            stripe.invoices.retrieve(invoiceId),
            new Promise((resolve) => setTimeout(() => resolve(null), INVOICE_LOOKUP_TIMEOUT_MS)),
        ]);

        return serializeInvoice(invoice);
    } catch (error) {
        console.warn(`Invoice lookup skipped for ${invoiceId}:`, error.message);
        return null;
    }
}

async function getPaymentAttemptForSession(session) {
    const paymentIntentRef = session?.payment_intent;
    const paymentIntentId = typeof paymentIntentRef === 'string'
        ? paymentIntentRef
        : paymentIntentRef && typeof paymentIntentRef === 'object' && typeof paymentIntentRef.id === 'string'
            ? paymentIntentRef.id
            : null;

    if (!paymentIntentId) {
        return null;
    }

    try {
        const paymentIntent = await Promise.race([
            stripe.paymentIntents.retrieve(paymentIntentId),
            new Promise((resolve) => setTimeout(() => resolve(null), INVOICE_LOOKUP_TIMEOUT_MS)),
        ]);

        return serializePaymentAttempt(paymentIntent);
    } catch (error) {
        console.warn(`PaymentIntent lookup skipped for ${paymentIntentId}:`, error.message);
        return null;
    }
}

router.get('/checkout-config', async (_req, res) => {
    try {
        const config = await getCheckoutOfferConfig();
        res.json(config);
    } catch (error) {
        console.error('Checkout config error:', error);
        res.status(500).json({
            error: 'Failed to load checkout configuration',
        });
    }
});

router.get('/checkout-cancel-context/:cancelToken', requireAuth, (req, res) => {
    try {
        const { cancelToken } = req.params;
        if (!isCheckoutCancelToken(cancelToken)) {
            return res.status(400).json({ error: 'Invalid cancel token' });
        }

        const order = checkoutOrderQueries.getByCancelTokenAndUser.get(cancelToken, req.user.uid);
        if (!order) {
            return res.status(404).json({ error: 'Checkout context not found' });
        }

        const maxAgeSeconds = getCheckoutSessionMaxAgeSeconds();
        const createdAt = normalizeNullableInteger(order.checkout_created_at);
        const nowUnix = Math.floor(Date.now() / 1000);
        if (createdAt && maxAgeSeconds > 0 && nowUnix - createdAt > maxAgeSeconds) {
            return res.status(410).json({ error: 'Checkout context expired' });
        }

        return res.json({
            sessionId: order.stripe_checkout_session_id,
            userId: order.user_id,
            createdAt: createdAt ? createdAt * 1000 : Date.now(),
            verifiedAt: null,
        });
    } catch (error) {
        console.error('Checkout cancel context error:', error);
        res.status(500).json({
            error: 'Failed to load checkout cancel context',
        });
    }
});

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout session for premium subscription
 */
router.post('/create-checkout-session', requireAuth, async (req, res) => {
    try {
        const userId = req.user.uid;
        const existing = subscriptionQueries.getByUserId.get(userId);
        const selectedPriceId = getPassPriceId();
        const durationDays = getPassDurationDays();
        const nowUnix = Math.floor(Date.now() / 1000);

        if (!selectedPriceId) {
            return res.status(500).json({ error: 'Stripe price ID is not configured' });
        }

        if (isSubscriptionActive(existing, nowUnix)) {
            const accessEndLabel = formatAccessEndDate(existing.current_period_end);
            return res.status(409).json({
                error: 'Premium access already active',
                message: accessEndLabel
                    ? `Votre pass est déjà actif jusqu'au ${accessEndLabel}.`
                    : 'Votre pass est déjà actif.',
                subscription: serializeSubscription(existing, nowUnix),
            });
        }

        const pendingThreshold = nowUnix - PENDING_CHECKOUT_REUSE_WINDOW_SECONDS;
        const recentPendingOrder = checkoutOrderQueries.getMostRecentPendingByUser.get(userId, pendingThreshold);
        if (recentPendingOrder?.stripe_checkout_session_id) {
            try {
                const pendingSession = await getVerifiedCheckoutSession(
                    stripe,
                    recentPendingOrder.stripe_checkout_session_id,
                    userId,
                    [],
                    0
                );

                if (pendingSession.status === 'open' && pendingSession.payment_status !== 'paid' && pendingSession.url) {
                    return res.json({
                        sessionId: pendingSession.id,
                        cancelToken: recentPendingOrder.cancel_token,
                        url: pendingSession.url,
                        reused: true,
                    });
                }
            } catch (_error) {
                // Ignore stale pending sessions and create a fresh one.
            }
        }

        const customerId = existing?.stripe_customer_id || null;
        const cancelToken = randomUUID();

        const sessionPayload = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price: selectedPriceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            invoice_creation: {
                enabled: true,
            },
            success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout/canceled?cancel_token=${cancelToken}`,
            client_reference_id: userId,
            metadata: {
                userId,
                tier: 'premium',
                offerKey: 'pass_partiels_s4',
                accessDurationDays: String(durationDays),
                priceId: selectedPriceId,
                cancelToken,
            },
        };

        if (customerId) {
            sessionPayload.customer = customerId;
        } else {
            sessionPayload.customer_creation = 'always';
            if (req.user.email) {
                sessionPayload.customer_email = req.user.email;
            }
        }

        const session = await stripe.checkout.sessions.create(sessionPayload);

        checkoutOrderQueries.upsert.run(
            userId,
            PASS_PARTIELS_OFFER_KEY,
            cancelToken,
            session.id,
            normalizeStripeReference(session.payment_intent),
            normalizeStripeReference(session.customer) || customerId,
            normalizeStripeReference(session.invoice),
            selectedPriceId,
            normalizeNullableInteger(session.amount_total),
            normalizeCurrency(session.currency),
            typeof session.status === 'string' ? session.status : null,
            typeof session.payment_status === 'string' ? session.payment_status : null,
            durationDays,
            0,
            null,
            null,
            'checkout_session_created',
            normalizeNullableInteger(session.created) || nowUnix,
            null
        );

        res.json({
            sessionId: session.id,
            cancelToken,
            url: session.url,
        });

    } catch (error) {
        console.error('Checkout session error:', error);
        res.status(500).json({
            error: 'Failed to create checkout session'
        });
    }
});

/**
 * GET /api/checkout-session-status/:sessionId
 * Confirms a Checkout session belongs to the current user and synchronizes access.
 */
router.get('/checkout-session-status/:sessionId', requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ error: 'sessionId is required' });
        }

        const session = await getVerifiedCheckoutSession(stripe, sessionId, req.user.uid);
        const syncResult = await syncCheckoutSessionAccess(stripe, session, 'checkout_status_poll');
        const subscription = syncResult.subscription || subscriptionQueries.getByUserId.get(req.user.uid);
        const invoice = await getInvoiceForSession(session);
        const paymentAttempt = await getPaymentAttemptForSession(session);

        res.json({
            sessionId: session.id,
            sessionStatus: session.status,
            paymentStatus: session.payment_status,
            accessActivated: Boolean(syncResult.activated),
            invoice,
            paymentAttempt,
            ...serializeSubscription(subscription),
        });
    } catch (error) {
        console.error('Checkout session status error:', error);
        res.status(400).json({
            error: 'Failed to confirm checkout session',
            message: error.message,
        });
    }
});

/**
 * POST /api/create-customer-portal-session
 * Creates a Stripe Customer Portal session for managing subscription
 */
router.post('/create-customer-portal-session', requireAuth, async (req, res) => {
    try {
        const userId = req.user.uid;

        const subscription = subscriptionQueries.getByUserId.get(userId);

        if (!subscription || !subscription.stripe_customer_id) {
            return res.status(404).json({ error: 'No active subscription found' });
        }

        // Create portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: subscription.stripe_customer_id,
            return_url: `${process.env.FRONTEND_URL}/subscription`,
        });

        res.json({ url: portalSession.url });

    } catch (error) {
        console.error('Portal session error:', error);
        res.status(500).json({
            error: 'Failed to create portal session'
        });
    }
});

export default router;
