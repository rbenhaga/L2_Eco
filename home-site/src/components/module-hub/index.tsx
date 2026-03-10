import { useState, useEffect, Suspense, lazy } from 'react';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useModuleProgress } from '../../hooks/useModuleProgress';
import { progressService, type ResourceType } from '../../services/progressService';
import type { QuizResult } from '../../features/qcm';
import { useAuth } from '../../context/AuthContext';
import { getTDCount, getQCMCount, getAnnalesData, getSemesterKey, TD_DATA, QCM_DATA } from './utils';
import { preloadRouteForPath } from '../../utils/routePreload';
import {
  ModuleHubLayout,
} from './components';
import { ModuleHeroSection } from './components/ModuleHeroSection';
import { ModuleChapterList, ChapterData } from './components/ModuleChapterList';
import { ModuleTabBar, TabId } from './components/ModuleTabBar';
import { TDList, QCMList, AnnalesList } from './components/ContentLists';
import type { ModuleHubProps, ContentType } from './types';
import { PaywallModal } from '../PaywallModal';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '../../types/siteConfig';
import type { LearningStep } from '../../types/learning';

const QCMViewer = lazy(() => import('./viewers/QCMViewer').then(m => ({ default: m.QCMViewer })));
const TDViewer = lazy(() => import('./viewers/TDViewer').then(m => ({ default: m.TDViewer })));
const MODULE_SWITCH_DELAY_MS = 240;
const RESOURCE_WEIGHTS: Record<ResourceType, number> = {
  td: 0.7,
  td_correction: 0.7,
  qcm: 0.3,
  annale: 0.8,
};

const FICHE_COUNT_BY_KEY: Record<string, number> = {
  macro: 5,
  micro: 2,
  stats: 2,
  socio: 1,
};

function getChapterCourseProgressPercent(
  scrollProgress: number
): number {
  const safeScroll = Math.max(0, Math.min(100, Math.floor(scrollProgress)));
  return safeScroll;
}

function resolveModuleChapterIdFromQuizKey(
  quizKey: string,
  chapterIds: string[]
): string | null {
  if (!quizKey) return null;

  if (chapterIds.includes(quizKey)) {
    return quizKey;
  }

  const normalizedKey = quizKey.toLowerCase();
  const directMatch = chapterIds.find((id) => id.toLowerCase().endsWith(`-${normalizedKey}`));
  if (directMatch) return directMatch;

  const chapterNumberMatch = normalizedKey.match(/ch(\d+)/i);
  if (!chapterNumberMatch) return null;

  const chapterNumber = chapterNumberMatch[1];
  const bySuffix = chapterIds.find((id) => id.toLowerCase().endsWith(`-ch${chapterNumber}`));
  if (bySuffix) return bySuffix;

  const fallback = chapterIds.find((id) =>
    id.toLowerCase().includes(`ch${chapterNumber}`)
  );
  return fallback ?? null;
}

function recordChapterQCMValidation(
  result: QuizResult,
  progressModuleId: string,
  moduleChapterIds: string[],
  fallbackQcmId?: string | null
) {
  const chapterStatsEntries = Object.entries(result.byChapter || {});
  let recorded = 0;

  for (const [quizChapterId, stats] of chapterStatsEntries) {
    const chapterId = resolveModuleChapterIdFromQuizKey(quizChapterId, moduleChapterIds);
    if (!chapterId || stats.total <= 0) continue;

    const chapterScore = Math.round((stats.correct / stats.total) * 100);
    progressService.recordQCMScore(progressModuleId, chapterId, chapterScore);
    recorded += 1;
  }

  if (recorded > 0) return;
  if (!fallbackQcmId) return;

  const fallbackChapterId = resolveModuleChapterIdFromQuizKey(fallbackQcmId, moduleChapterIds);
  if (!fallbackChapterId) return;
  progressService.recordQCMScore(progressModuleId, fallbackChapterId, result.score);
}

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

function ModuleHubTransitionSkeleton() {
  return (
    <main
      className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
        <div className="max-w-2xl animate-pulse">
          <div className="h-8 w-44 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-5 h-16 w-[min(92%,520px)] rounded-2xl" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-4 h-5 w-full rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-3 h-5 w-[88%] rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-7 h-12 w-52 rounded-xl" style={{ background: 'var(--color-bg-overlay)' }} />
        </div>

        <div
          className="rounded-[28px] border p-6 sm:p-7 animate-pulse"
          style={{
            borderColor: 'var(--color-border-default)',
            background: 'var(--color-bg-raised)',
          }}
        >
          <div className="h-4 w-40 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-4 h-12 rounded-2xl" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-5 space-y-3">
            <div className="h-16 rounded-2xl" style={{ background: 'var(--color-bg-overlay)' }} />
            <div className="h-16 rounded-2xl" style={{ background: 'var(--color-bg-overlay)' }} />
          </div>
        </div>
      </div>

      <section
        className="mt-6 rounded-[30px] border p-4 sm:mt-7 sm:p-6"
        style={{
          borderColor: 'var(--color-border-default)',
          background: 'color-mix(in srgb, var(--color-bg-raised) 94%, transparent)',
        }}
      >
        <div className="animate-pulse">
          <div className="h-3 w-24 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-4 h-9 w-64 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-3 h-4 w-[min(100%,520px)] rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
          <div className="mt-6 h-10 w-full max-w-md rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
        </div>

        <div className="mt-8 grid gap-3 animate-pulse">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-xl border px-4 py-4 sm:px-5"
              style={{
                borderColor: 'var(--color-app-panel-border)',
                background: 'var(--color-bg-raised)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
                <div className="min-w-0 flex-1">
                  <div className="h-5 w-48 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
                  <div className="mt-3 h-4 w-full max-w-xl rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
                  <div className="mt-2 h-4 w-40 rounded-full" style={{ background: 'var(--color-bg-overlay)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
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
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Get real progress data - MUST be called before any conditional returns
  const chapterIds = chapters.map(ch => ch.id);
  const progressModuleId = getSemesterKey(baseRoute, moduleId);
  const moduleSurfaceKey = `${baseRoute}:${moduleId}`;
  const previousModuleSurfaceKeyRef = useRef<string | null>(null);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const {
    completedChapters,
    totalChapters,
    nextChapterId,
    getChapterProgress,
  } = useModuleProgress(progressModuleId, chapterIds);

  useEffect(() => {
    let mounted = true;
    fetch(`${API_URL}/api/site-config`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted || !data) return;
        setSiteConfig({
          courseBadges: data.courseBadges || DEFAULT_SITE_CONFIG.courseBadges,
          notifications: Array.isArray(data.notifications) ? data.notifications : [],
        });
      })
      .catch(() => {
        if (mounted) setSiteConfig(DEFAULT_SITE_CONFIG);
      });

    return () => {
      mounted = false;
    };
  }, [API_URL]);

  useEffect(() => {
    const hasChanged =
      previousModuleSurfaceKeyRef.current !== null
      && previousModuleSurfaceKeyRef.current !== moduleSurfaceKey;

    previousModuleSurfaceKeyRef.current = moduleSurfaceKey;
    setActiveChapterId(null);

    if (!hasChanged) {
      setIsSwitchLoading(false);
      return;
    }

    setIsSwitchLoading(true);

    const timer = window.setTimeout(() => {
      setIsSwitchLoading(false);
    }, MODULE_SWITCH_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [moduleSurfaceKey]);
  
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
  const semesterMatch = baseRoute.match(/^\/s(\d+)/i);
  const semesterLabel = semesterMatch ? `Semestre ${semesterMatch[1]} - ${title}` : title;
  const ficheCount = FICHE_COUNT_BY_KEY[key] ?? chapters.filter((chapter) => (chapter.ficheSections?.length ?? 0) > 0).length;
  const tdCount = getTDCount(moduleId, baseRoute);
  const qcmCount = Math.max(
    getQCMCount(moduleId, baseRoute),
    chapters.filter((chapter) => Boolean(chapter.qcmId)).length
  );
  const annalesCount = annalesItems.length;
  const lockedItemsCount = isFreeTier
    ? Math.max(0, chapters.length - 1) + Math.max(0, tdItems.length - 1) + Math.max(0, qcmItems.length - 1) + Math.max(0, annalesItems.length - 1)
    : 0;
  const firstTdId = tdItems[0]?.id;
  const firstQcmId = qcmItems[0]?.id;
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
  const startChapterProgress = startChapter
    ? getChapterCourseProgressPercent(
      getChapterProgress(startChapter.id)?.scrollProgress ?? 0
    )
    : 0;
  const startButtonLabel = startChapter
    ? `${hasModuleProgress ? 'Continuer' : 'Commencer'} le chapitre ${startChapter.number}`
    : 'Commencer le chapitre';
  const startButtonMeta = startChapter?.estimatedTime || '30 min';
  const tdCompletedCount = tdItems.filter((td) =>
    progressService.getResource(progressModuleId, `td:${td.id}`)?.isCompleted
  ).length;
  const qcmCompletedCount = qcmItems.filter((qcm) =>
    progressService.getResource(progressModuleId, `qcm:${qcm.id}`)?.isCompleted
  ).length;
  const annalesCompletedCount = annalesItems.filter((annale) =>
    progressService.getResource(progressModuleId, `annale:${annale.path}`)?.isCompleted
  ).length;
  const completedExtraResources = tdCompletedCount + qcmCompletedCount + annalesCompletedCount;
  const totalUnits = totalChapters + trackableResources.length;
  const completionUnits = completedChapters + completedExtraResources;
  const remainingResourcesCount = Math.max(0, totalUnits - completionUnits);
  const pathSteps = [
    'Cours',
    ...(ficheCount > 0 ? ['Fiche'] : []),
    ...(qcmCount > 0 ? ['QCM'] : []),
    ...(tdCount > 0 ? ['TD'] : []),
    ...(annalesCount > 0 ? ['Annales'] : []),
  ];
  const pathHintLabel = `Parcours conseillé : ${pathSteps.join(' → ')}`;

  let guidanceTitle = `${completedChapters} chapitres terminés sur ${totalChapters}`;
  let guidanceDescription = remainingResourcesCount > 0
    ? `${remainingResourcesCount} ressources à traiter pour boucler le module.`
    : 'Le module est intégralement parcouru.';

  if (completedChapters < totalChapters && startChapter) {
    guidanceTitle = hasModuleProgress ? 'Continue le cours' : 'Commence par le cours';
    guidanceDescription = `Chapitre ${startChapter.number} · ${startButtonMeta}${hasModuleProgress ? ` · ${startChapterProgress}%` : ''}`;
  } else if (qcmCount > 0 && qcmCompletedCount < qcmCount) {
    guidanceTitle = 'Teste-toi avec les QCM';
    guidanceDescription = `${qcmCount - qcmCompletedCount} QCM restants pour valider les chapitres.`;
  } else if (tdCount > 0 && tdCompletedCount < tdCount) {
    guidanceTitle = 'Passe aux TD';
    guidanceDescription = `${tdCount - tdCompletedCount} TD restants pour appliquer le cours.`;
  } else if (annalesCount > 0 && annalesCompletedCount < annalesCount) {
    guidanceTitle = 'Passe aux annales';
    guidanceDescription = `${annalesCount - annalesCompletedCount} annales pour te remettre en condition partiel.`;
  } else if (remainingResourcesCount === 0) {
    guidanceTitle = 'Module bouclé';
    guidanceDescription = 'Tu peux relire un chapitre clé ou refaire une annale pour consolider.';
  }

  const progressSummary = remainingResourcesCount > 0
    ? `${completedChapters} chapitres terminés sur ${totalChapters} · ${remainingResourcesCount} ressources restantes`
    : `${completedChapters} chapitres terminés sur ${totalChapters}`;

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
    firstQcmId,
    firstTdId,
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
          qcmId={qcmIdParam || undefined}
          onBack={handleBackToList}
          onQuizComplete={(result) => {
            if (!qcmIdParam) return;
            markResourceAndRefresh(`qcm:${qcmIdParam}`, 'qcm', {
              completed: true,
              timeSpentSeconds: Math.floor(result.timeSpent / 1000),
            });
            recordChapterQCMValidation(result, progressModuleId, chapterIds, qcmIdParam);
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
    const chapterProgressPercent = getChapterCourseProgressPercent(
      progress?.scrollProgress ?? 0
    );
    const isInProgress = !isCompleted && chapterProgressPercent > 0;
    const validationScore = ch.validation?.minimumScore ?? 70;
    const minimumReadPercent = ch.validation?.minimumReadPercent ?? 90;
    const chapterSlug = ch.path.split('/').filter(Boolean).pop() || ch.id;
    const courseBadgeKey = `${baseRoute.replace(/^\//, '').replace('/', ':')}:${chapterSlug}`;
    const configuredBadge = siteConfig.courseBadges[courseBadgeKey];
    const isComingSoonByContent = /a venir|à venir/i.test(ch.description || '');
    const badge = configuredBadge || (isComingSoonByContent ? 'soon' : '');
    const steps: LearningStep[] = (ch.steps ?? []).map((step): LearningStep => {
      if (step.id === 'cours') {
        return {
          ...step,
          state: isCompleted ? 'completed' : isInProgress ? 'current' : step.state,
          meta: chapterProgressPercent > 0 ? `${chapterProgressPercent}% lu` : step.meta,
        };
      }

      if (step.id === 'qcm') {
        if (step.state === 'soon') return step;

        if ((progress?.qcmBestScore ?? 0) >= validationScore) {
          return {
            ...step,
            state: 'completed',
            meta: `${progress?.qcmBestScore ?? 0}% obtenu`,
          };
        }

        if (!(progress?.isReadComplete ?? false)) {
          return {
            ...step,
            state: 'locked',
            meta: `Débloqué après ${minimumReadPercent}% de lecture`,
          };
        }

        return {
          ...step,
          state: 'current',
          meta: `Seuil ${validationScore}%`,
        };
      }

      if (step.id === 'td' || step.id === 'corrige' || step.id === 'annale') {
        if (step.state === 'soon') return step;

        if (!(progress?.isCompleted ?? false)) {
          return {
            ...step,
            state: 'locked',
            meta: 'Disponible après validation du chapitre',
          };
        }
      }

      return step;
    });
    void steps;

    return {
      id: ch.id,
      number: ch.number,
      title: ch.title,
      status: isCompleted ? 'Terminé' : isInProgress ? 'En cours' : 'À faire',
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
      badge: badge === 'new' || badge === 'soon' ? badge : undefined,
      progressPercent: chapterProgressPercent,
      isInProgress,
      objectives: ch.objectives,
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
  const studiedMinutes = Math.max(0, Math.round(chapters.reduce((sum, ch) => {
    const progress = getChapterProgress(ch.id);
    return sum + ((progress?.timeSpent ?? 0) / 60);
  }, 0)));
  const activeSectionMeta: Record<ContentType, { title: string; description: string }> = {
    cours: {
      title: 'Parcours par chapitre',
      description: 'Chaque chapitre devient une unité d’apprentissage complète avec cours, fiche, validation et prolongements.',
    },
    td: {
      title: 'Travaux dirigés',
      description: 'Applications corrigées pour passer du cours à la pratique.',
    },
    qcm: {
      title: 'Quiz et vérification',
      description: 'Questions rapides pour vérifier ce qui est acquis et ce qu’il faut relire.',
    },
    annales: {
      title: 'Préparation examen',
      description: 'Sujets et corrections pour travailler en vraie condition de partiel.',
    },
  };
  const currentSection = activeSectionMeta[contentType];

  return (
    <>
      <ModuleHubLayout>
        {isSwitchLoading ? (
          <ModuleHubTransitionSkeleton />
        ) : (
        <main
          className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
          style={{
            background: 'transparent',
          }}
        >
          <ModuleHeroSection
            title={title}
            description={description}
            chaptersCount={totalChapters}
            completedCoursesCount={completedChapters}
            totalDuration={String(totalMinutes)}
            studyTime={`${studiedMinutes} min`}
            todoCount={remainingResourcesCount}
            moduleId={moduleId}
            startButtonLabel={startButtonLabel}
            startButtonMeta={startButtonMeta}
            guidanceTitle={guidanceTitle}
            guidanceDescription={guidanceDescription}
            progressSummary={progressSummary}
            pathHintLabel={pathHintLabel}
            lockedItemsCount={lockedItemsCount}
            resourceCounts={{ fiches: ficheCount, td: tdCount, qcm: qcmCount, annales: annalesCount }}
            badgeLabel={semesterLabel}
            onStartClick={handleStartClick}
            onStartHover={() => preloadPath((isFreeTier ? freeChapter : activeChapter)?.path)}
            onStartFocus={() => preloadPath((isFreeTier ? freeChapter : activeChapter)?.path)}
          />

          <section
            className="mt-6 rounded-[30px] border p-4 sm:mt-7 sm:p-6"
            style={{
              borderColor: 'var(--color-app-panel-border)',
              background: 'color-mix(in srgb, var(--color-app-panel) 96%, transparent)',
            }}
          >
            <div className="mb-5 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.035em' }}>
                  {currentSection.title}
                </h2>
                <p className="max-w-2xl text-sm sm:text-[15px]" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {currentSection.description}
                </p>
              </div>

              <ModuleTabBar
                activeTab={contentType}
                onTabChange={handleTabChange}
                coursCount={totalChapters}
                tdCount={tdCount}
                qcmCount={qcmCount}
                annalesCount={annalesCount}
              />
            </div>

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

          </section>
        </main>
        )}
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















