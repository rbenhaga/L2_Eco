import { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { useModuleProgress } from '../../hooks/useModuleProgress';
import { progressService, type ResourceType } from '../../services/progressService';
import { useAuth } from '../../context/AuthContext';
import { getTDCount, getQCMCount, getAnnalesData, getSemesterKey, TD_DATA, QCM_DATA } from './utils';
import { preloadRouteForPath } from '../../utils/routePreload';
import {
  ModuleHubLayout,
} from './components';
import { ModuleHeroSection } from './components/ModuleHeroSection';
import { ModuleChapterList, ChapterData } from './components/ModuleChapterList';
import { ModuleTabBar, TabId } from './components/ModuleTabBar';
import { ModuleStatsCards } from './components/ModuleStatsCards';
import { TDList, QCMList, AnnalesList } from './components/ContentLists';
import type { ModuleHubProps, ContentType } from './types';
import { PaywallModal } from '../PaywallModal';

const QCMViewer = lazy(() => import('./viewers/QCMViewer').then(m => ({ default: m.QCMViewer })));
const TDViewer = lazy(() => import('./viewers/TDViewer').then(m => ({ default: m.TDViewer })));
const CHAPTER_WEIGHT = 1;
const RESOURCE_WEIGHTS: Record<ResourceType, number> = {
  td: 0.7,
  td_correction: 0.7,
  qcm: 0.3,
  annale: 0.8,
};

function ViewerLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
      <div className="text-center">
        <div
          className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent mb-4"
          style={{
            borderColor: 'var(--color-accent)',
            borderRightColor: 'transparent',
          }}
        />
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          Chargement...
        </p>
      </div>
    </div>
  );
}

export default function ModuleHub({
  title,
  description,
  chapters,
  baseRoute,
  moduleId,
}: ModuleHubProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as ContentType | null;
  const qcmIdParam = searchParams.get('qcm');
  const tdIdParam = searchParams.get('td');

  const [contentType, setContentType] = useState<ContentType>(tabParam || 'cours');
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [lockedContentTitle, setLockedContentTitle] = useState('ce contenu');
  const [, setLastActionTick] = useState(0);

  // Get real progress data - MUST be called before any conditional returns
  const chapterIds = chapters.map(ch => ch.id);
  const progressModuleId = getSemesterKey(baseRoute, moduleId);
  const {
    completedChapters,
    totalChapters,
    nextChapterId,
    totalTimeFormatted,
    getChapterProgress,
  } = useModuleProgress(progressModuleId, chapterIds);

  // All hooks must be called before any conditional returns
  useVideoProgress(moduleId);
  
  useEffect(() => {
    if (tabParam && ['cours', 'td', 'qcm', 'annales'].includes(tabParam)) {
      setContentType(tabParam as ContentType);
    }
  }, [tabParam]);

  // Backward-compat migration for S4 progress keys.
  useEffect(() => {
    if (progressModuleId === moduleId) return;

    chapters.forEach((ch, index) => {
      const legacyChapterId = `chapitre-${index + 1}`;

      // Old module key + old chapter id
      progressService.migrateChapterProgress(moduleId, legacyChapterId, progressModuleId, ch.id);
      // New module key + old chapter id
      progressService.migrateChapterProgress(progressModuleId, legacyChapterId, progressModuleId, ch.id);
      // Old module key + new chapter id
      progressService.migrateChapterProgress(moduleId, ch.id, progressModuleId, ch.id);
    });
  }, [chapters, moduleId, progressModuleId]);

  // NOW we can do conditional logic and returns
  const isViewingQCM = qcmIdParam !== null;
  const isViewingTD = tdIdParam !== null;
  const computedActiveChapterId = activeChapterId
    ?? chapters.find(ch => ch.id === nextChapterId)?.id
    ?? chapters[0]?.id
    ?? null;
  const key = getSemesterKey(baseRoute, moduleId);
  const isFreeTier = user?.subscriptionTier !== 'premium';
  const freeChapter = chapters[0];
  const tdItems = TD_DATA[key] || [];
  const qcmItems = QCM_DATA[key] || [];
  const annalesItems = getAnnalesData(moduleId, baseRoute);
  const firstTdId = tdItems[0]?.id;
  const firstQcmId = qcmItems[0]?.id;
  const firstAnnalePath = annalesItems[0]?.path;
  const lockedItemsCount = isFreeTier
    ? Math.max(0, chapters.length - 1) + Math.max(0, tdItems.length - 1) + Math.max(0, qcmItems.length - 1) + Math.max(0, annalesItems.length - 1)
    : 0;
  const trackableResources = [
    ...tdItems.map((td) => ({
      id: `td:${td.id}`,
      type: 'td' as ResourceType,
      estimatedSeconds: 25 * 60,
      weight: RESOURCE_WEIGHTS.td,
    })),
    ...qcmItems.map((qcm) => ({
      id: `qcm:${qcm.id}`,
      type: 'qcm' as ResourceType,
      estimatedSeconds: 15 * 60,
      weight: RESOURCE_WEIGHTS.qcm,
    })),
    ...annalesItems.map((annale) => ({
      id: `annale:${annale.path}`,
      type: 'annale' as ResourceType,
      estimatedSeconds: 30 * 60,
      weight: RESOURCE_WEIGHTS.annale,
    })),
  ];
  const activeChapter = chapters.find(ch => ch.id === computedActiveChapterId) ?? chapters[0];
  const hasModuleProgress = chapterIds.some(id => {
    const progress = getChapterProgress(id);
    return (progress?.timeSpent ?? 0) > 0 || (progress?.scrollProgress ?? 0) > 0;
  });
  const startChapter = isFreeTier ? freeChapter : activeChapter;
  const startButtonLabel = startChapter
    ? `${hasModuleProgress ? 'Reprendre' : 'Commencer'} le cours ${startChapter.number}`
    : 'Commencer le cours';
  const startDetailText = startChapter
    ? `${hasModuleProgress ? 'Continuer' : 'Commencer'} le cours ${startChapter.number} - ${startChapter.title}`
    : undefined;
  const completedExtraResources = trackableResources.filter((resource) =>
    progressService.getResource(progressModuleId, resource.id)?.isCompleted
  ).length;
  const totalUnits = totalChapters + trackableResources.length;
  const completionUnits = completedChapters + completedExtraResources;
  const totalWeightedUnits = (totalChapters * CHAPTER_WEIGHT)
    + trackableResources.reduce((sum, resource) => sum + resource.weight, 0);
  const chapterProgressWeight = chapterIds.reduce((sum, id) => {
    const progress = getChapterProgress(id);
    const hasProgress = (progress?.timeSpent ?? 0) > 0 || (progress?.scrollProgress ?? 0) > 0;
    return sum + (hasProgress ? CHAPTER_WEIGHT : 0);
  }, 0);
  const resourceProgressWeight = trackableResources.reduce((sum, resource) => {
    const progress = progressService.getResource(progressModuleId, resource.id);
    const hasProgress = (progress?.visits ?? 0) > 0 || (progress?.timeSpent ?? 0) > 0;
    return sum + (hasProgress ? resource.weight : 0);
  }, 0);
  const overallProgressPercentage = totalWeightedUnits > 0
    ? Math.floor(((chapterProgressWeight + resourceProgressWeight) / totalWeightedUnits) * 100)
    : 0;
  const handleTabChange = (newTab: TabId) => {
    setContentType(newTab);
    setSearchParams({ tab: newTab });
  };

  const handleBackToList = () => {
    const currentTab = searchParams.get('tab') || 'cours';
    setSearchParams({ tab: currentTab });
  };

  const openPremiumModal = (title: string) => {
    setLockedContentTitle(title);
    setShowPremiumModal(true);
  };

  useEffect(() => {
    if (!isFreeTier) return;

    if (qcmIdParam && qcmIdParam !== firstQcmId) {
      setSearchParams({ tab: 'qcm' });
      openPremiumModal('ce QCM');
      return;
    }

    if (tdIdParam && tdIdParam !== firstTdId) {
      setSearchParams({ tab: 'td' });
      openPremiumModal('ce TD');
      return;
    }
  }, [
    isFreeTier,
    qcmIdParam,
    tdIdParam,
    tabParam,
    contentType,
    firstQcmId,
    firstTdId,
    firstAnnalePath,
    setSearchParams,
  ]);

  const markResourceAndRefresh = (
    resourceId: string,
    type: ResourceType,
    options?: { completed?: boolean; timeSpentSeconds?: number }
  ) => {
    progressService.recordResourceAccess(progressModuleId, resourceId, type, options);
    setLastActionTick((prev) => prev + 1);
  };

  if (isViewingQCM) {
    return (
      <Suspense fallback={<ViewerLoading />}>
        <QCMViewer
          moduleId={moduleId}
          baseRoute={baseRoute}
          onBack={handleBackToList}
          onQuizComplete={(result) => {
            if (!qcmIdParam) return;
            markResourceAndRefresh(`qcm:${qcmIdParam}`, 'qcm', {
              completed: true,
              timeSpentSeconds: Math.floor(result.timeSpent / 1000),
            });
          }}
        />
      </Suspense>
    );
  }

  if (isViewingTD) {
    return (
      <Suspense fallback={<ViewerLoading />}>
        <TDViewer moduleId={moduleId} tdId={tdIdParam} onBack={handleBackToList} />
      </Suspense>
    );
  }

  // Convert chapters to new ChapterData format with real progress
  const chapterDataList: ChapterData[] = chapters.map((ch, index) => {
    const progress = getChapterProgress(ch.id);
    const isCompleted = progress?.isCompleted ?? false;

    return {
      id: ch.id,
      number: String(index + 1).padStart(2, '0'),
      title: ch.title,
      status: isCompleted ? 'Termin\u00e9' : completedChapters > 0 ? 'En cours' : 'Chapitre',
      duration: ch.estimatedTime || '30 min',
      iconColor: (['blue', 'red', 'purple'] as const)[index % 3],
      hasAudio: ch.hasAudio,
      hasVideo: ch.hasIntroVideo,
      description: ch.description,
      estimatedTime: ch.estimatedTime,
      isCompleted,
      isLocked: isFreeTier && index > 0,
      icon: ch.icon,
      accentColor: ch.iconColor,
    };
  });

  const handleChapterClick = (chapter: ChapterData) => {
    if (chapter.isLocked) {
      openPremiumModal(`le cours ${chapter.number}`);
      return;
    }
    setActiveChapterId(chapter.id);
    // Navigate to chapter
    const originalChapter = chapters.find(c => c.id === chapter.id);
    if (originalChapter) {
      navigate(originalChapter.path);
    }
  };

  const handleStartClick = () => {
    if (isFreeTier && freeChapter) {
      navigate(freeChapter.path);
      return;
    }
    if (activeChapter) {
      navigate(activeChapter.path);
    }
  };

  const preloadPath = (path?: string) => {
    if (!path) return;
    preloadRouteForPath(path);
  };

  // Calculate total duration in minutes
  const totalMinutes = chapters.reduce((sum, ch) => {
    const time = parseInt(ch.estimatedTime || '30');
    return sum + time;
  }, 0);

  // Calculate engagement (based on time spent vs estimated)
  const chapterEstimatedSeconds = totalMinutes * 60;
  const resourceEstimatedSeconds = trackableResources.reduce(
    (sum, resource) => sum + (resource.estimatedSeconds * resource.weight),
    0
  );
  const estimatedTotalSeconds = chapterEstimatedSeconds + resourceEstimatedSeconds;
  const chapterTimeSpentSeconds = chapterIds.reduce((sum, id) => {
    const progress = getChapterProgress(id);
    return sum + (progress?.timeSpent ?? 0);
  }, 0);
  const resourceTimeSpentSeconds = trackableResources.reduce((sum, resource) => {
    const progress = progressService.getResource(progressModuleId, resource.id);
    return sum + ((progress?.timeSpent ?? 0) * resource.weight);
  }, 0);
  const totalTimeSpentSeconds = chapterTimeSpentSeconds + resourceTimeSpentSeconds;
  const engagement = estimatedTotalSeconds > 0
    ? Math.min(100, Math.round((totalTimeSpentSeconds / estimatedTotalSeconds) * 100))
    : 0;

  return (
    <>
      <ModuleHubLayout>
        {/* Main content */}
        <main
          className="w-full px-6 sm:px-12 py-10 sm:py-16"
          style={{ 
            background: 'var(--color-canvas)',
          }}
        >

        {/* Hero Section */}
        <ModuleHeroSection
          title={title}
          description={description}
          chaptersCount={totalChapters}
          totalDuration={String(totalMinutes)}
          todoCount={Math.max(0, totalUnits - completionUnits)}
          moduleId={moduleId}
          startButtonLabel={startButtonLabel}
          startDetailText={startDetailText}
          onStartClick={handleStartClick}
          onStartHover={() => preloadPath((isFreeTier ? freeChapter : activeChapter)?.path)}
          onStartFocus={() => preloadPath((isFreeTier ? freeChapter : activeChapter)?.path)}
        />

        {/* Stats Cards - Real data */}
        <ModuleStatsCards
          progress={overallProgressPercentage}
          engagement={engagement}
          engagementTrend={engagement > 50 ? 4 : -2}
          studyTime={totalTimeFormatted}
          targetTime={`${Math.ceil((totalMinutes + Math.round(resourceEstimatedSeconds / 60)) / 60)}h`}
        />

        {/* Tab Bar - More generous spacing */}
        <div className="mt-12">
          {isFreeTier && lockedItemsCount > 0 && (
            <div
              className="mb-5 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 border"
              style={{
                background: 'linear-gradient(135deg, var(--color-bg-raised) 0%, color-mix(in srgb, var(--color-accent-subtle) 45%, var(--color-bg-raised)) 100%)',
                borderColor: 'color-mix(in srgb, var(--color-accent) 22%, var(--color-border-default))',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {lockedItemsCount}{' contenus Premium verrouillés'}
                </p>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {"Continue sans interruption avec l'accès complet aux cours, TD, QCM et annales."}
                </p>
              </div>
              <motion.button
                onClick={() => openPremiumModal('les contenus Premium')}
                whileHover={{ y: -1 }}
                className="shrink-0 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-foreground)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                Voir Premium
              </motion.button>
            </div>
          )}
          <ModuleTabBar
            activeTab={contentType}
            onTabChange={handleTabChange}
            coursCount={totalChapters}
            tdCount={getTDCount(moduleId, baseRoute)}
            qcmCount={getQCMCount(moduleId, baseRoute)}
            annalesCount={getAnnalesData(moduleId, baseRoute).length}
          />

          {/* Content */}
          {contentType === 'cours' && (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ModuleChapterList
                  chapters={chapterDataList}
                  activeChapterId={computedActiveChapterId || undefined}
                  onChapterClick={handleChapterClick}
                  onLockedChapterClick={(chapter) => openPremiumModal(`le cours ${chapter.number}`)}
                  onChapterHover={(chapter) => preloadPath(chapters.find((c) => c.id === chapter.id)?.path)}
                  onChapterFocus={(chapter) => preloadPath(chapters.find((c) => c.id === chapter.id)?.path)}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {contentType === 'td' && (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TDList
                  moduleId={moduleId}
                  baseRoute={baseRoute}
                  isItemLocked={(_, index) => isFreeTier && index > 0}
                  onLockedItemClick={() => openPremiumModal('ce TD')}
                  onItemHover={(item) => preloadPath(item.route)}
                  onItemFocus={(item) => preloadPath(item.route)}
                  onItemClick={(item) => {
                    markResourceAndRefresh(`td:${item.id}`, 'td', {
                      completed: true,
                      timeSpentSeconds: 25 * 60,
                    });
                    if (item.route) {
                      navigate(item.route);
                      return;
                    }
                    setSearchParams({ tab: 'td', td: item.id });
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {contentType === 'qcm' && (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <QCMList
                  moduleId={moduleId}
                  baseRoute={baseRoute}
                  isItemLocked={(_, index) => isFreeTier && index > 0}
                  onLockedItemClick={() => openPremiumModal('ce QCM')}
                  onItemClick={(item) => {
                    markResourceAndRefresh(`qcm:${item.id}`, 'qcm', { completed: false, timeSpentSeconds: 60 });
                    setSearchParams({ tab: 'qcm', qcm: item.id });
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {contentType === 'annales' && (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AnnalesList
                  moduleId={moduleId}
                  baseRoute={baseRoute}
                  isItemLocked={(_, index) => isFreeTier && index > 0}
                  onLockedItemClick={() => openPremiumModal('cette annale')}
                  onItemHover={(path) => preloadPath(path)}
                  onItemFocus={(path) => preloadPath(path)}
                  onItemClick={(path) => {
                    markResourceAndRefresh(`annale:${path}`, 'annale', {
                      completed: true,
                      timeSpentSeconds: 30 * 60,
                    });
                    navigate(path);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <div className="h-10" />
    </ModuleHubLayout>
    <PaywallModal
      isOpen={showPremiumModal}
      onClose={() => setShowPremiumModal(false)}
      contentTitle={lockedContentTitle}
    />
    </>
  );
}

export type { ModuleHubProps, ModuleChapter, ModuleStats, ContentType } from './types';

