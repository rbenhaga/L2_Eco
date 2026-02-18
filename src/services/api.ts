/**
 * API service for backend communication
 */

import { authFetch } from '../utils/authFetch';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Create Stripe Checkout session
 */
export async function createCheckoutSession(_userId: string, plan: 'semester' | 'annual' = 'semester') {
    const response = await authFetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
    }

    return response.json();
}

/**
 * Get user subscription status
 */
export async function getSubscription(userId: string) {
    const response = await authFetch(`${API_URL}/api/subscription/${userId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch subscription');
    }

    return response.json();
}

/**
 * Create customer portal session (for managing subscription)
 */
export async function createCustomerPortalSession(_userId: string) {
    const response = await authFetch(`${API_URL}/api/create-customer-portal-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create portal session');
    }

    return response.json();
}
