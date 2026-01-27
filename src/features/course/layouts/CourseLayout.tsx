import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/ui/Background';
import { ContentProtection } from '../../../components/ContentProtection';
import { PaywallModal } from '../../../components/PaywallModal';
import { useAuth } from '../../../context/AuthContext';

/**
 * CourseLayout - Simplified layout for course content
 * 
 * Navigation is now handled by AppLayout's two-tier sidebar system.
 * This layout only handles content protection and paywall logic.
 * 
 * Note: subject, navGroups, and progressColor are kept for backwards compatibility
 * but are no longer used since CourseNavigation was removed.
 */
export function CourseLayout() {
    const { hasAccess, loading } = useAuth();
    const location = useLocation();
    const [showPaywall, setShowPaywall] = useState(false);

    // Define which pages are free (for demo: Chapter 1 is free)
    const isFreePage = location.pathname.includes('/chapitre-1') ||
        location.pathname.split('/').filter(Boolean).length <= 2; // Home page detection

    // Check if user needs premium access
    const needsPremium = !isFreePage;
    const hasPremium = hasAccess('premium');

    useEffect(() => {
        // Don't evaluate paywall while auth is loading
        if (loading) return;

        // Show paywall if user tries to access premium content without subscription
        if (needsPremium && !hasPremium) {
            setShowPaywall(true);
        } else {
            setShowPaywall(false);
        }
    }, [needsPremium, hasPremium, location.pathname, loading]);

    const getCurrentPageTitle = () => {
        const parts = location.pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('chapitre')) {
            return 'ce chapitre';
        }
        return 'ce contenu';
    };

    return (
        <ContentProtection>
            <div className="min-h-screen text-slate-900 font-sans">
                <Background />

                {/* Main content - full width with generous padding */}
                <main className="relative z-10 py-8 px-8 lg:px-12 max-w-7xl mx-auto">
                    {/* Show paywall modal if user doesn't have access */}
                    {showPaywall ? (
                        <>
                            {/* Blurred content preview */}
                            <div className="filter blur-sm pointer-events-none select-none">
                                <Outlet />
                            </div>

                            {/* Paywall modal */}
                            <PaywallModal
                                isOpen={showPaywall}
                                onClose={() => setShowPaywall(false)}
                                contentTitle={getCurrentPageTitle()}
                            />
                        </>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </ContentProtection>
    );
}
