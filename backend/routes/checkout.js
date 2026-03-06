import express from 'express';
import Stripe from 'stripe';
import { subscriptionQueries } from '../db/database.js';
import { requireAuth } from '../ai/middleware/auth.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout session for premium subscription
 */
router.post('/create-checkout-session', requireAuth, async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.user.uid;

        const normalizedPlan = plan === 'annual' ? 'annual' : 'semester';
        const priceByPlan = {
            semester: process.env.STRIPE_PRICE_ID_SEMESTER || process.env.STRIPE_PRICE_ID,
            annual: process.env.STRIPE_PRICE_ID_ANNUAL || process.env.STRIPE_PRICE_ID,
        };
        const selectedPriceId = priceByPlan[normalizedPlan];

        if (!selectedPriceId) {
            return res.status(500).json({ error: 'Stripe price ID is not configured' });
        }

        // Check if user already has an active subscription
        const existing = subscriptionQueries.getByUserId.get(userId);
        if (existing && existing.status === 'active') {
            return res.status(400).json({
                error: 'User already has an active subscription',
                tier: existing.tier
            });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: selectedPriceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing?canceled=true`,
            client_reference_id: userId, // Important: to link payment to user
            metadata: {
                userId: userId,
                tier: 'premium',
                plan: normalizedPlan,
            },
        });

        res.json({
            sessionId: session.id,
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
