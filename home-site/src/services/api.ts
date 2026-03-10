/**
 * API service for backend communication
 */

import { authFetch } from '../utils/authFetch';
import { rememberCheckoutSessionStart } from '../utils/checkoutReturnGuard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface SubscriptionStatus {
    tier: 'free' | 'premium';
    status: 'active' | 'inactive' | 'canceled' | 'past_due';
    currentPeriodEnd: string | null;
    offerKey: string | null;
    canManageBilling: boolean;
}

export interface CheckoutInvoice {
    id: string | null;
    number: string | null;
    status: string | null;
    hostedInvoiceUrl: string | null;
    invoicePdf: string | null;
}

export interface CheckoutPaymentAttempt {
    id: string | null;
    status: string | null;
    declineCode: string | null;
    code: string | null;
    message: string | null;
    type: string | null;
}

export interface CheckoutSessionStatus extends SubscriptionStatus {
    sessionId: string;
    sessionStatus: string | null;
    paymentStatus: string | null;
    accessActivated: boolean;
    invoice: CheckoutInvoice | null;
    paymentAttempt: CheckoutPaymentAttempt | null;
}

export interface CheckoutSessionCreation {
    sessionId: string;
    cancelToken: string;
    url: string;
    reused?: boolean;
}

export interface CheckoutCancelContext {
    sessionId: string;
    userId: string;
    createdAt: number;
    verifiedAt: number | null;
}

export class ApiRequestError extends Error {
    status: number;
    details: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.name = 'ApiRequestError';
        this.status = status;
        this.details = details;
    }
}

async function parseApiError(response: Response, fallbackMessage: string): Promise<never> {
    const contentType = response.headers.get('content-type') || '';
    let details: unknown = null;
    let message = fallbackMessage;

    try {
        if (contentType.includes('application/json')) {
            details = await response.json();
            if (details && typeof details === 'object') {
                const candidate = (details as { message?: string; error?: string }).message
                    || (details as { message?: string; error?: string }).error;
                if (candidate) {
                    message = candidate;
                }
            }
        } else {
            const text = await response.text();
            if (text) {
                details = text;
                message = text;
            }
        }
    } catch {
        details = null;
    }

    throw new ApiRequestError(response.status, message, details);
}

/**
 * Create Stripe Checkout session
 */
export async function createCheckoutSession(userId: string, plan: 'semester' | 'annual' = 'semester'): Promise<CheckoutSessionCreation> {
    const response = await authFetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
        await parseApiError(response, 'Failed to create checkout session');
    }

    const data = await response.json() as CheckoutSessionCreation;

    if (data?.sessionId && userId) {
        rememberCheckoutSessionStart(data.sessionId, userId, data.cancelToken);
    }

    return data;
}

export interface CheckoutConfig {
    offerKey: string;
    offerLabel: string;
    amountTotal: number | null;
    amountLabel: string;
    currency: string;
    durationDays: number;
}

export async function getCheckoutConfig(): Promise<CheckoutConfig> {
    const response = await fetch(`${API_URL}/api/checkout-config`);

    if (!response.ok) {
        await parseApiError(response, 'Failed to load checkout configuration');
    }

    return response.json();
}

export async function getCheckoutCancelContext(cancelToken: string): Promise<CheckoutCancelContext> {
    const response = await authFetch(`${API_URL}/api/checkout-cancel-context/${cancelToken}`);

    if (!response.ok) {
        await parseApiError(response, 'Failed to load checkout cancel context');
    }

    return response.json();
}

/**
 * Confirm a Stripe Checkout session and sync premium access.
 */
export async function confirmCheckoutSession(sessionId: string): Promise<CheckoutSessionStatus> {
    const response = await authFetch(`${API_URL}/api/checkout-session-status/${sessionId}`);

    if (!response.ok) {
        await parseApiError(response, 'Failed to confirm checkout session');
    }

    return response.json();
}

/**
 * Get user subscription status
 */
export async function getSubscription(userId: string): Promise<SubscriptionStatus> {
    const response = await authFetch(`${API_URL}/api/subscription/${userId}`);

    if (!response.ok) {
        await parseApiError(response, 'Failed to fetch subscription');
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
        await parseApiError(response, 'Failed to create portal session');
    }

    return response.json();
}
