import { getAnalytics, isSupported, logEvent, setAnalyticsCollectionEnabled, type Analytics } from 'firebase/analytics';

export type AnalyticsConsent = 'granted' | 'denied';

type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

const ANALYTICS_CONSENT_STORAGE_KEY = 'oikonomia_analytics_consent';
const DEFAULT_ANALYTICS_CONSENT: AnalyticsConsent =
    String(import.meta.env.VITE_ANALYTICS_DEFAULT_CONSENT || 'denied').toLowerCase() === 'denied'
        ? 'denied'
        : 'granted';

let analyticsInstance: Analytics | null = null;
let analyticsInitPromise: Promise<Analytics | null> | null = null;

function isClientEnvironment() {
    return typeof window !== 'undefined';
}

function isAnalyticsFeatureEnabled() {
    return String(import.meta.env.VITE_ENABLE_ANALYTICS || 'true').toLowerCase() !== 'false';
}

function readStoredConsent(): AnalyticsConsent | null {
    if (!isClientEnvironment()) return null;
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
}

export function getAnalyticsConsentChoice(): AnalyticsConsent | null {
    return readStoredConsent();
}
function getEffectiveConsent(): AnalyticsConsent {
    return readStoredConsent() ?? DEFAULT_ANALYTICS_CONSENT;
}

function isTrackingAllowed() {
    return isAnalyticsFeatureEnabled() && getEffectiveConsent() === 'granted';
}

function sanitizeEventParams(params?: AnalyticsEventParams) {
    if (!params) return undefined;

    const normalized: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) continue;
        if (typeof value === 'boolean') {
            normalized[key] = value;
            continue;
        }
        if (typeof value === 'number') {
            if (Number.isFinite(value)) normalized[key] = value;
            continue;
        }
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed) normalized[key] = trimmed.slice(0, 100);
        }
    }

    return Object.keys(normalized).length > 0 ? normalized : undefined;
}

async function getAnalyticsInstance() {
    if (!isClientEnvironment() || !isAnalyticsFeatureEnabled()) return null;
    if (analyticsInstance) return analyticsInstance;
    if (analyticsInitPromise) return analyticsInitPromise;

    analyticsInitPromise = (async () => {
        const supported = await isSupported();
        if (!supported) return null;

        const instance = getAnalytics();
        analyticsInstance = instance;
        return instance;
    })()
        .catch(() => null)
        .finally(() => {
            analyticsInitPromise = null;
        });

    return analyticsInitPromise;
}

export async function initializeAnalyticsCollection() {
    if (!isAnalyticsFeatureEnabled()) return;
    if (!isTrackingAllowed()) {
        if (analyticsInstance) {
            setAnalyticsCollectionEnabled(analyticsInstance, false);
        }
        return;
    }

    const analytics = await getAnalyticsInstance();
    if (!analytics) return;
    setAnalyticsCollectionEnabled(analytics, true);
}

export async function setAnalyticsConsent(consent: AnalyticsConsent) {
    if (!isClientEnvironment()) return;
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
    await initializeAnalyticsCollection();
}

export async function trackPageView(path: string) {
    if (!isTrackingAllowed() || !isClientEnvironment()) return;
    const analytics = await getAnalyticsInstance();
    if (!analytics) return;

    logEvent(analytics, 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title || 'Oikonomia',
    });
}

export async function trackEvent(eventName: string, params?: AnalyticsEventParams) {
    if (!isTrackingAllowed()) return;
    const analytics = await getAnalyticsInstance();
    if (!analytics) return;

    const normalizedParams = sanitizeEventParams(params);
    if (normalizedParams) {
        logEvent(analytics, eventName, normalizedParams);
        return;
    }

    logEvent(analytics, eventName);
}