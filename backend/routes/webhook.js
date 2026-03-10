import express from 'express';
import Stripe from 'stripe';
import { stripeEventQueries, subscriptionQueries } from '../db/database.js';
import { syncCheckoutSessionAccess } from '../utils/stripeAccess.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const QUIET_STRIPE_EVENT_TYPES = new Set([
    'customer.created',
    'charge.succeeded',
    'charge.updated',
    'payment_intent.created',
    'payment_intent.succeeded',
    'invoice.created',
    'invoice.finalized',
    'invoice.sent',
    'invoice.paid',
    'invoice.payment_succeeded',
    'invoice_payment.paid',
]);

function normalizeStripeReference(value) {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && typeof value.id === 'string') return value.id;
    return null;
}

/**
 * POST /api/webhook
 * Handles Stripe webhook events.
 * IMPORTANT: This route must use express.raw() middleware, not express.json().
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Stripe webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        const alreadyProcessed = stripeEventQueries.getByEventId.get(event.id);
        if (alreadyProcessed) {
            return res.json({ received: true, duplicate: true });
        }

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                console.log('Stripe checkout session completed:', session.id);
                const result = await syncCheckoutSessionAccess(stripe, session, 'stripe_webhook');
                console.log(`Stripe access sync result for ${session.id}: ${result.reason}`);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                console.log('Stripe subscription updated:', subscription.id);

                const status = subscription.status === 'active'
                    ? 'active'
                    : subscription.status === 'canceled'
                        ? 'canceled'
                        : subscription.status === 'past_due'
                            ? 'past_due'
                            : 'inactive';
                const tier = status === 'active' ? 'premium' : 'free';

                subscriptionQueries.updateByStripeId.run(
                    status,
                    tier,
                    normalizeStripeReference(subscription.customer),
                    subscription.current_period_end || null,
                    subscription.id
                );
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                console.log('Stripe subscription deleted:', subscription.id);

                subscriptionQueries.updateByStripeId.run(
                    'canceled',
                    'free',
                    normalizeStripeReference(subscription.customer),
                    subscription.current_period_end || null,
                    subscription.id
                );
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                console.log('Stripe invoice payment failed:', invoice.id);

                if (invoice.subscription) {
                    subscriptionQueries.updateByStripeId.run(
                        'past_due',
                        'free',
                        normalizeStripeReference(invoice.customer),
                        null,
                        invoice.subscription
                    );
                }
                break;
            }

            default:
                if (!QUIET_STRIPE_EVENT_TYPES.has(event.type)) {
                    console.log(`Unhandled Stripe event type: ${event.type}`);
                }
        }

        stripeEventQueries.markProcessed.run(event.id, event.type);
        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
