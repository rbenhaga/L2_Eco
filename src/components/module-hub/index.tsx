/**
 * ModuleHub - Main Entry Point
 * Refactored modular architecture with clean separation of concerns
 * 
 * Structure:
 * - types.ts: Type definitions
 * - utils.ts: Helper functions and data
 * - components/: UI components
 * - viewers/: QCM and TD viewers (lazy loaded for performance)
 */

import { useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getModuleTheme } from '../../design-system/tokens';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { getTDCount, getQCMCount } from './utils';
import { 
    HeroSection, 
    ContentTabs, 
    ChapterGrid, 
    ContinueCard,
    TDList,
    QCMList,
    AnnalesList
} from './components';
import type { ModuleHubProps, ContentType } from './types';

// Lazy load heavy viewers (performance boost)
const QCMViewer = lazy(() => import('./viewers/QCMViewer').then(m => ({ default: m.QCMViewer })));
const TDViewer = lazy(() => import('./viewers/TDViewer').then(m => ({ default: m.TDViewer })));

// Loading fallback component
function ViewerLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
            <div className="text-center">
                <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-accent)] border-r-transparent mb-4" />
                <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Chargement...</p>
            </div>
        </div>
    );
}

export default function ModuleHub({
    title,
    description,
    icon,
    chapters,
    stats,
    baseRoute,
    moduleId,
    recentUpdate,
    introVideoUrl
}: ModuleHubProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab') as ContentType | null;
    const qcmIdParam = searchParams.get('qcm');
    const tdIdParam = searchParams.get('td');
    
    const [contentType, setContentType] = useState<ContentType>(tabParam || 'cours');
    
    // Sync with URL params
    useEffect(() => {
        if (tabParam && ['cours', 'td', 'qcm', 'annales'].includes(tabParam)) {
            setContentType(tabParam as ContentType);
        }
    }, [tabParam]);
    
    // Update URL when tab changes
    const handleTabChange = (newTab: ContentType) => {
        setContentType(newTab);
        setSearchParams({ tab: newTab });
    };
    
    // Handle back from QCM/TD
    const handleBackToList = () => {
        const currentTab = searchParams.get('tab') || 'cours';
        setSearchParams({ tab: currentTab });
    };
    
    // Video progress tracking
    const { introVideoWatched, markIntroWatched } = useVideoProgress(moduleId);
    
    // Find next chapter to continue/start
    const nextChapter = chapters.find(ch => !ch.isCompleted);
    const hasStarted = stats.completedCourses > 0 || chapters.some(ch => ch.isCompleted);
    
    // Check if we're viewing a specific QCM or TD
    const isViewingQCM = qcmIdParam !== null;
    const isViewingTD = tdIdParam !== null;
    
    // Get module theme
    const theme = getModuleTheme(moduleId);
    
    // If viewing QCM, render QCM player
    if (isViewingQCM) {
        return (
            <Suspense fallback={<ViewerLoading />}>
                <QCMViewer moduleId={moduleId} baseRoute={baseRoute} onBack={handleBackToList} />
            </Suspense>
        );
    }
    
    // If viewing TD, render TD viewer
    if (isViewingTD) {
        return (
            <Suspense fallback={<ViewerLoading />}>
                <TDViewer moduleId={moduleId} tdId={tdIdParam} onBack={handleBackToList} />
            </Suspense>
        );
    }

    return (
        <div className="min-h-screen pb-16" style={{ background: "var(--color-bg-base)" }}>
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--color-bg-base) 0%, #F5F7FA 100%)" }} />
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '180px 180px'
                }} />
            </div>
            
            {/* Hero Section */}
            <HeroSection
                title={title}
                description={description}
                icon={icon}
                stats={stats}
                theme={theme}
                recentUpdate={recentUpdate}
                introVideoUrl={introVideoUrl}
                introVideoWatched={introVideoWatched}
                onMarkVideoWatched={markIntroWatched}
            />

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-10 -mt-6">
                <div className="mx-auto max-w-5xl">
                    <div className="bg-[var(--color-bg-raised)] rounded-3xl p-6 sm:p-8" style={{ 
                        border: `1px solid var(--color-border-default)`,
                        boxShadow: "var(--shadow-md)"
                    }}>
                        {/* Continue/Start Card */}
                        {nextChapter && (
                            <ContinueCard 
                                chapter={nextChapter} 
                                hasStarted={hasStarted} 
                                theme={theme} 
                            />
                        )}

                        {/* Content Tabs */}
                        <ContentTabs
                            activeTab={contentType}
                            onTabChange={handleTabChange}
                            coursCount={chapters.length}
                            tdCount={getTDCount(moduleId)}
                            qcmCount={getQCMCount(moduleId)}
                            annalesCount={3}
                            themeColor={theme.color}
                        />

                        {/* Content Display */}
                        <div className="mt-6">
                            {contentType === 'cours' && <ChapterGrid chapters={chapters} themeColor={theme.color} />}
                            {contentType === 'td' && <TDList moduleId={moduleId} />}
                            {contentType === 'qcm' && <QCMList moduleId={moduleId} />}
                            {contentType === 'annales' && <AnnalesList baseRoute={baseRoute} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Re-export types for convenience
export type { ModuleHubProps, ModuleChapter, ModuleStats, ContentType } from './types';
