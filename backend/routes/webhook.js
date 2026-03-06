import express from 'express';
import Stripe from 'stripe';
import { subscriptionQueries } from '../db/database.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/webhook
 * Handles Stripe webhook events
 * IMPORTANT: This route must use express.raw() middleware, not express.json()
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('⚠️  Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                console.log('💳 Checkout session completed:', session.id);

                const userId = session.client_reference_id;
                const customerId = session.customer;
                const subscriptionId = session.subscription;

                // Get subscription details from Stripe
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                // Save to database
                subscriptionQueries.upsert.run(
                    userId,
                    'premium',
                    'active',
                    customerId,
                    subscriptionId,
                    subscription.current_period_end
                );

                console.log(`✅ User ${userId} upgraded to premium`);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                console.log('🔄 Subscription updated:', subscription.id);

                // Update subscription status
                const status = subscription.status === 'active' ? 'active' :
                    subscription.status === 'canceled' ? 'canceled' :
                        subscription.status === 'past_due' ? 'past_due' : 'inactive';

                const tier = status === 'active' ? 'premium' : 'free';

                subscriptionQueries.updateByStripeId.run(
                    status,
                    tier,
                    subscription.id
                );

                console.log(`✅ Subscription ${subscription.id} updated: ${status}`);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                console.log('❌ Subscription canceled:', subscription.id);

                // Revoke premium access
                subscriptionQueries.updateByStripeId.run(
                    'canceled',
                    'free',
                    subscription.id
                );

                console.log(`✅ Subscription ${subscription.id} canceled, reverted to free`);
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                console.log('💸 Payment failed for invoice:', invoice.id);

                // Mark subscription as past_due
                if (invoice.subscription) {
                    subscriptionQueries.updateByStripeId.run(
                        'past_due',
                        'free',
                        invoice.subscription
                    );
                }

                // TODO: Send email notification to user
                break;
            }

            default:
                console.log(`ℹ️  Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });

    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
