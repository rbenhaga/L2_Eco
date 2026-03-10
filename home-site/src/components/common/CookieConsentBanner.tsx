import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    getAnalyticsConsentChoice,
    setAnalyticsConsent,
    trackEvent,
    type AnalyticsConsent,
} from '../../services/analytics';

export function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const bannerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const choice = getAnalyticsConsentChoice();
        setIsVisible(choice === null);
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (!isVisible || !bannerRef.current) {
            root.style.setProperty('--cookie-banner-height', '0px');
            return () => {
                root.style.setProperty('--cookie-banner-height', '0px');
            };
        }

        const banner = bannerRef.current;
        const updateOffset = () => {
            const bottomGap = window.innerWidth >= 640 ? 16 : 12;
            const nextHeight = Math.ceil(banner.getBoundingClientRect().height + bottomGap);
            root.style.setProperty('--cookie-banner-height', `${nextHeight}px`);
        };

        updateOffset();

        const observer = new ResizeObserver(() => {
            updateOffset();
        });

        observer.observe(banner);
        window.addEventListener('resize', updateOffset);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateOffset);
            root.style.setProperty('--cookie-banner-height', '0px');
        };
    }, [isVisible]);

    const handleChoice = async (consent: AnalyticsConsent) => {
        if (isSaving) return;

        setIsSaving(true);
        await setAnalyticsConsent(consent);

        if (consent === 'granted') {
            void trackEvent('cookie_consent_granted', { source: 'banner' });
        }

        setIsVisible(false);
        setIsSaving(false);
    };

    if (!isVisible) return null;

    return (
        <aside
            ref={bannerRef}
            className="fixed bottom-3 left-3 right-3 z-[90] sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-xl"
            aria-live="polite"
            role="dialog"
            aria-label="Gestion des cookies"
        >
            <div
                className="rounded-2xl border p-4 sm:p-5 shadow-lg"
                style={{
                    background: 'color-mix(in srgb, var(--color-bg-raised) 96%, var(--color-canvas) 4%)',
                    borderColor: 'var(--color-border-default)',
                    boxShadow: 'var(--shadow-lg)',
                }}
            >
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Cookies de mesure d'audience
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Nous utilisons Google Analytics pour mesurer l'utilisation du site et améliorer votre expérience.
                    Vous pouvez accepter ou refuser ces cookies.
                </p>
                <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Link to="/privacy#privacy-cookies" className="underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                        En savoir plus
                    </Link>
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => { void handleChoice('denied'); }}
                        disabled={isSaving}
                        className="h-10 rounded-xl px-4 text-sm font-semibold disabled:opacity-60"
                        style={{
                            border: '1px solid var(--color-border-default)',
                            color: 'var(--color-text-secondary)',
                            background: 'var(--color-bg-overlay)',
                        }}
                    >
                        Refuser
                    </button>
                    <button
                        type="button"
                        onClick={() => { void handleChoice('granted'); }}
                        disabled={isSaving}
                        className="h-10 rounded-xl px-4 text-sm font-semibold disabled:opacity-60"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)',
                        }}
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </aside>
    );
}
