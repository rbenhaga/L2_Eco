import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/Navigation/AppSidebar';
import { SubjectSidebar } from '../components/Navigation/SubjectSidebar';
import { SearchModal } from '../components/SearchModal';
import { SearchProvider, useSearch } from '../context/SearchContext';

interface AppLayoutProps {
    children: ReactNode;
}

/**
 * AppLayout - Main application layout with two-tier sidebar navigation
 * 
 * Structure:
 * - AppSidebar (always visible, 60px/240px width, global nav)
 * - SubjectSidebar (conditional, 56px/224px width, subject-specific nav)
 * - Main content area (with correct margin-left to account for sidebars)
 * 
 * Note: Sidebars are fixed position, so content needs left margin
 * - Home page: margin-left = 60px (240px AppSidebar only)
 * - Subject pages: margin-left = 116px (460px both sidebars)
 */
function AppLayoutContent({ children }: AppLayoutProps) {
    const location = useLocation();
    const { isOpen, close } = useSearch();

    // Determine which subject sidebar to show based on current route
    const getCurrentSubject = (): 'macro' | 'micro' | 'stats' | 'socio' | null => {
        if (location.pathname.startsWith('/macro')) return 'macro';
        if (location.pathname.startsWith('/micro')) return 'micro';
        if (location.pathname.startsWith('/stats')) return 'stats';
        if (location.pathname.startsWith('/socio')) return 'socio';
        return null;
    };

    const currentSubject = getCurrentSubject();
    const hasSubjectSidebar = currentSubject !== null;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Main Sidebar (always visible) */}
            <AppSidebar />

            {/* Subject Sidebar (conditional) */}
            {hasSubjectSidebar && <SubjectSidebar subject={currentSubject} />}

            {/* Main Content - margin matches sidebar widths (60 + 56 = 116) */}
            <main className={`
                flex-1 min-w-0
                transition-all duration-300
                ${hasSubjectSidebar ? 'ml-[464px]' : 'ml-60'}
            `}>
                {children}
            </main>

            {/* Global Search Modal */}
            <SearchModal isOpen={isOpen} onClose={close} />
        </div>
    );
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SearchProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SearchProvider>
    );
}
