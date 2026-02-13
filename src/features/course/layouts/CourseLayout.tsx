import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/ui/Background';
import { PaywallModal } from '../../../components/PaywallModal';
import { useAuth } from '../../../context/AuthContext';
import { isFreeContent } from '../../../utils/contentAccess';

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
    const navigate = useNavigate();
    const [showPaywall, setShowPaywall] = useState(false);

    // Strict free-tier access rules
    const isFreePage = isFreeContent(location.pathname);

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

    const getFallbackPath = () => {
        const parts = location.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
            const maybeSemester = parts[0]?.toLowerCase();
            if (maybeSemester === 's3' || maybeSemester === 's4') {
                return `/${parts[0]}/${parts[1]}`;
            }
            return `/${parts[0]}`;
        }
        return '/';
    };

    return (
        <div className="min-h-screen font-sans" style={{ color: 'var(--color-text-primary)' }}>
            <Background />

            {/* Main content - full width, no horizontal padding (handled by pages) */}
            <main className="relative z-10">
                {/* Never render premium content for free users */}
                {showPaywall ? (
                    <>
                        <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
                            <div>
                                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                    Contenu Premium
                                </h2>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    {'Passe au Premium pour d\u00e9bloquer ce chapitre.'}
                                </p>
                            </div>
                        </div>

                        <PaywallModal
                            isOpen={showPaywall}
                            onClose={() => {
                                setShowPaywall(false);
                                navigate(getFallbackPath(), { replace: true });
                            }}
                            contentTitle={getCurrentPageTitle()}
                        />
                    </>
                ) : (
                    <Outlet />
                )}
            </main>
        </div>
    );
}
