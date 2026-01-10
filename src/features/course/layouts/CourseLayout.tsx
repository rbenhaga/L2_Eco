import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/ui/Background';
import { ContentProtection } from '../../../components/ContentProtection';
import { TeaserView } from '../../../components/TeaserView';
import { PaywallModal } from '../../../components/PaywallModal';
import { useAuth } from '../../../context/AuthContext';
import { isFreeContent, getContentTitle } from '../../../utils/contentAccess';
import type { SubjectConfig } from '../../../config/semesters';
import type { NavGroup } from '../components/CourseNavigation';

interface CourseLayoutProps {
    subject: SubjectConfig;
    navGroups: NavGroup[];
    progressColor?: string;
    footerText?: string;
}

/**
 * CourseLayout - Two-step premium content protection:
 * 
 * 1. First visit: PaywallModal appears over blurred content
 * 2. After closing modal: TeaserView shows (partial content + upsell banner)
 * 3. Full content only accessible with premium subscription
 */
export function CourseLayout({ footerText }: CourseLayoutProps) {
    const { hasAccess, loading } = useAuth();
    const location = useLocation();
    const [showModal, setShowModal] = useState(true); // Modal starts open
    const [hasSeenModal, setHasSeenModal] = useState(false);

    // Use centralized content access rules
    const isFreePage = isFreeContent(location.pathname);
    const needsPremium = !isFreePage;
    const hasPremium = hasAccess('premium');

    // Reset modal state when navigating to a new page
    useEffect(() => {
        if (needsPremium && !hasPremium) {
            setShowModal(true);
            setHasSeenModal(false);
        }
    }, [location.pathname, needsPremium, hasPremium]);

    // Get content title for modal/teaser
    const contentTitle = getContentTitle(location.pathname);

    // Handle modal close - switch to teaser view
    const handleModalClose = () => {
        setShowModal(false);
        setHasSeenModal(true);
    };

    // Determine what to show
    const showPaywall = needsPremium && !hasPremium && !loading && showModal && !hasSeenModal;
    const showTeaser = needsPremium && !hasPremium && !loading && !showModal;

    return (
        <ContentProtection>
            <div className="min-h-screen text-slate-900 dark:text-slate-50 font-sans">
                <Background />

                <main className="relative z-10 py-8 px-8 lg:px-12 max-w-7xl">
                    {showPaywall ? (
                        <>
                            {/* Blurred content preview behind modal */}
                            <div className="filter blur-sm pointer-events-none select-none opacity-60">
                                <Outlet />
                            </div>

                            {/* PaywallModal overlay */}
                            <PaywallModal
                                isOpen={true}
                                onClose={handleModalClose}
                                contentTitle={contentTitle}
                            />
                        </>
                    ) : showTeaser ? (
                        /* After modal close: show teaser view with upsell */
                        <TeaserView contentTitle={contentTitle}>
                            <Outlet />
                        </TeaserView>
                    ) : (
                        /* Premium users or free content: full access */
                        <Outlet />
                    )}
                </main>

                <footer className="relative z-10 py-8 text-center text-slate-500 dark:text-slate-400 text-xs border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
                    <p>{footerText || "L2 Économie"}</p>
                </footer>
            </div>
        </ContentProtection>
    );
}
