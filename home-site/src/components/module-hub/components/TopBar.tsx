/**
 * TopBar - Navigation supérieure sticky full-width
 * Design: Glass effect with backdrop blur (theme-aware)
 */

import { Bell, FileText, Search, Menu, X, CheckCircle2, Clock3 } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../../ThemeToggle';
import { useSidebar } from '../../../context/SidebarContext';
import { semesters } from '../../../config/semesters';
import { progressService } from '../../../services/progressService';
import { getSemesterKey } from '../utils';
import type { ModuleId } from '../types';
import type { ChapterProgress, ModuleProgress } from '../../../services/progressService';

interface Notification {
  id: number | string;
  subject: string;
  chapter: string;
  time: string;
  subjectKey: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
}

interface TopBarProps {
  notifications?: Notification[];
  onSearchClick?: () => void;
  scrollProgress?: number;
  onDismissNotification?: (notificationId: number | string) => void | Promise<void>;
}

const dropdownAnimation = {
  initial: { opacity: 0, y: -8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.96 },
  transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] as const }
};

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.floor(value)));
}

function getChapterNumberFromPath(pathname: string): number | null {
  const match = pathname.match(/\/chapitre-?(\d+)/i);
  if (!match) return null;
  const num = Number(match[1]);
  return Number.isFinite(num) ? num : null;
}

function resolveCurrentChapterProgress(
  moduleProgress: ModuleProgress | null,
  pathname: string,
  subjectId: string,
  semesterId: string
): ChapterProgress | null {
  if (!moduleProgress) return null;

  const chapterEntries = Object.entries(moduleProgress.chapters ?? {});
  if (chapterEntries.length === 0) return null;

  const chapterNumber = getChapterNumberFromPath(pathname);
  if (chapterNumber !== null) {
    const suffix = `ch${chapterNumber}`;
    const candidates = [
      `${subjectId}-ch${chapterNumber}`,
      `${subjectId}-${semesterId}-ch${chapterNumber}`,
      `${subjectId}-s4-ch${chapterNumber}`,
      `chapitre-${chapterNumber}`,
      suffix,
    ];

    for (const key of candidates) {
      const direct = moduleProgress.chapters[key];
      if (direct) return direct;
    }

    const fuzzyMatch = chapterEntries.find(([key]) =>
      key.toLowerCase().endsWith(suffix.toLowerCase())
    );
    if (fuzzyMatch) return fuzzyMatch[1];
  }

  // Fallback: most recently accessed chapter in this module
  const latest = chapterEntries
    .map(([, chapter]) => chapter)
    .sort((a, b) => (b.lastReadAt?.getTime() ?? 0) - (a.lastReadAt?.getTime() ?? 0))[0];

  return latest ?? null;
}

function formatSeconds(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function TopBar({ notifications = [], onSearchClick, scrollProgress: externalScrollProgress, onDismissNotification }: TopBarProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const desktopNotifRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Dynamic breadcrumb from URL
  const breadcrumb = useMemo(() => {
    const path = location.pathname;
    // Match /s3/macro, /s4/stats, etc.
    const match = path.match(/^\/(s\d+)\/(\w+)/);
    if (!match) return { year: 'L2', semester: 'S3', subject: '', subjectPath: '' };
    const [, semId, subjectId] = match;
    const semConfig = semesters[semId];
    if (!semConfig) return { year: 'L2', semester: semId.toUpperCase(), subject: '', subjectPath: '' };
    const subject = semConfig.subjects.find(s => s.id === subjectId);
    return {
      year: semConfig.year.includes('2025') ? 'L2' : 'L2',
      semester: semConfig.shortName,
      subject: subject?.name || subjectId,
      subjectPath: `/${semId}/${subjectId}`,
    };
  }, [location.pathname]);

  // Detect if we're on a chapter page
  const isChapterPage = /\/chapitre-/.test(location.pathname);

  // Current course (chapter) progression/time
  const [courseProgress, setCourseProgress] = useState<number | null>(null);
  const [courseValidated, setCourseValidated] = useState(false);
  const [baseCourseTimeSeconds, setBaseCourseTimeSeconds] = useState(0);
  const [activeVisibleSeconds, setActiveVisibleSeconds] = useState(0);
  const isVisibleRef = useRef<boolean>(document.visibilityState === 'visible');
  const activeTimeLabel = useMemo(
    () => formatSeconds(baseCourseTimeSeconds + activeVisibleSeconds),
    [baseCourseTimeSeconds, activeVisibleSeconds]
  );

useEffect(() => {
    if (!isChapterPage) {
      setCourseProgress(null);
      setCourseValidated(false);
      setBaseCourseTimeSeconds(0);
      setActiveVisibleSeconds(0);
      return;
    }
    
    const updateCompletion = () => {
      const match = location.pathname.match(/^\/(s\d+)\/(\w+)/);
      if (!match) {
        setCourseProgress(null);
        setCourseValidated(false);
        return;
      }
      
      const [, semId, subjectIdRaw] = match;
      const subjectId = subjectIdRaw as ModuleId;
      const validModuleIds: ModuleId[] = ['macro', 'micro', 'stats', 'socio', 'management'];
      if (!validModuleIds.includes(subjectId)) {
        setCourseProgress(0);
        setCourseValidated(false);
        return;
      }

      const moduleKey = getSemesterKey(`/${semId}/${subjectId}`, subjectId);
      const moduleProgress = progressService.getModule(moduleKey);
      const currentChapter = resolveCurrentChapterProgress(moduleProgress, location.pathname, subjectId, semId);
      if (!currentChapter) {
        setCourseProgress(0);
        setCourseValidated(false);
        return;
      }

      const scrollPct = clampPercent(currentChapter.scrollProgress ?? 0);
      setCourseProgress(scrollPct);
      setCourseValidated(Boolean(currentChapter.isCompleted));
      setBaseCourseTimeSeconds(currentChapter.timeSpent ?? 0);
    };

    updateCompletion();

    const unsubscribe = progressService.subscribe(updateCompletion);
    return unsubscribe;
  }, [location.pathname, isChapterPage]);

  useEffect(() => {
    if (!isChapterPage) return;

    isVisibleRef.current = document.visibilityState === 'visible';

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    const interval = window.setInterval(() => {
      if (!isVisibleRef.current) return;
      setActiveVisibleSeconds((prev) => prev + 1);
    }, 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isChapterPage, location.pathname]);

  // Get sidebar control for mobile menu (optional - may not be in SidebarProvider context)
  let toggleMobile: (() => void) | undefined;
  try {
    const sidebar = useSidebar();
    toggleMobile = sidebar.toggleMobile;
  } catch {
    // Not in SidebarProvider context, that's ok
    toggleMobile = undefined;
  }


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedDesktopNotif = desktopNotifRef.current?.contains(target) ?? false;
      if (!clickedDesktopNotif) {
        setIsNotifOpen(false);
      }
    }
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isNotifOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Scroll progress tracking
  const [internalScrollProgress, setInternalScrollProgress] = useState(0);
  const scrollProgress = externalScrollProgress ?? internalScrollProgress;

  useEffect(() => {
    if (externalScrollProgress !== undefined) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setInternalScrollProgress(Math.floor(Math.min(progress, 100)));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [externalScrollProgress]);

  useEffect(() => {
    if (!isChapterPage) return;
    setCourseProgress(clampPercent(scrollProgress));
  }, [isChapterPage, scrollProgress]);

  const notificationsPanelContent = notifications.length > 0 ? (
    notifications.map((notif) => (
      <div
        key={notif.id}
        className="block px-6 py-4 transition-all duration-200 border-b last:border-0"
        style={{ borderColor: 'var(--color-border-subtle)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        role="menuitem"
      >
        <div className="flex items-start gap-4">
          <div
            className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center"
            style={{
              background: 'var(--color-rose-50)',
            }}
          >
            <FileText className="h-5 w-5" style={{ color: 'var(--color-rose-600)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-rose-600)', letterSpacing: '0.05em' }}>
              {notif.subject}
            </p>
            <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
              {notif.chapter}
            </p>
            <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              {notif.time}
            </p>
          </div>
          {onDismissNotification && (
            <button
              onClick={() => {
                void onDismissNotification(notif.id);
              }}
              className="h-8 w-8 shrink-0 rounded-lg grid place-items-center transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              title="Supprimer pour moi"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className="p-12 text-center">
      <Bell className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-border-strong)', strokeWidth: 1.5 }} />
      <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
        Aucune notification
      </p>
    </div>
  );

  const studyStatusLabel = isChapterPage && courseProgress !== null
    ? `${courseProgress}% · ${activeTimeLabel}`
    : null;
  const hasStudyStatus = studyStatusLabel !== null && courseProgress !== null;
  const displayStudyStatusLabel = hasStudyStatus
    ? courseValidated
      ? 'Cours validé'
      : `${courseProgress}% · ${activeTimeLabel}`
    : null;

  return (
    <>
      <div
        className="sticky top-0 z-20 app-chrome-surface"
        style={{
          width: '100%',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: '1px solid var(--color-app-chrome-border)',
        }}
      >
        {/* Scroll progress bar - chapter pages only */}
        {isChapterPage && (
          <div
            className="absolute bottom-0 h-[2px] transition-all duration-75 z-20"
            style={{
              left: 0,
              right: 0,
              width: `${scrollProgress}%`,
              background: 'var(--color-accent)',
              opacity: scrollProgress > 0 ? 1 : 0,
            }}
          />
        )}

        <div className="w-full px-4 sm:px-6">
          <div className="flex h-12 items-center gap-2 sm:h-14 sm:gap-4">
            {/* Left side - Hamburger (mobile) + Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0 shrink-0">
              {/* Mobile hamburger menu */}
              {toggleMobile && (
                <button
                  onClick={toggleMobile}
                  className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl transition-all"
                  style={{
                    background: 'var(--color-app-panel)',
                    borderColor: 'var(--color-border-default)',
                    border: '1px solid',
                  }}
                  title="Menu"
                >
                  <Menu className="h-5 w-5" style={{ color: 'var(--color-text-primary)' }} />
                </button>
              )}

              {/* Breadcrumb - Always visible on desktop */}
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span style={{ color: 'var(--color-text-muted)' }}>{breadcrumb.semester}</span>
                {breadcrumb.subject && (
                  <>
                    <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                    <Link
                      to={breadcrumb.subjectPath}
                      className="font-semibold no-underline transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {breadcrumb.subject}
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Center - Search bar (prominent) */}
            <div className="flex-1 max-w-xl mx-auto">
              <button
                onClick={() => onSearchClick?.()}
                className="hidden sm:flex w-full items-center gap-3 h-9 px-4 rounded-xl transition-all duration-200 border"
                style={{
                  background: 'var(--color-app-panel)',
                  borderColor: 'var(--color-border-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--color-accent) 12%, transparent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                title="Rechercher (Ctrl+K)"
              >
                <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <span
                  className="flex-1 text-sm text-left truncate"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Rechercher un chapitre, un TD ou une annale
                </span>
                <kbd
                  className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded shrink-0"
                  style={{
                    background: 'var(--color-app-overlay)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  Ctrl+K
                </kbd>
              </button>

              <button
                onClick={() => onSearchClick?.()}
                className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200"
                style={{
                  background: 'var(--color-app-panel)',
                  borderColor: 'var(--color-border-default)',
                }}
                title="Rechercher"
                aria-label="Rechercher"
              >
                <Search className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
              </button>
            </div>

            {hasStudyStatus && (
              <div className="hidden lg:flex shrink-0 justify-end" style={{ width: '132px', flex: '0 0 132px' }}>
                <span
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap"
                  style={{
                    background: courseValidated ? 'var(--color-success-subtle)' : 'var(--color-app-panel)',
                    color: courseValidated ? 'var(--color-success)' : 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-default)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {courseValidated ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
                  {displayStudyStatusLabel}
                </span>
              </div>
            )}

            {/* Right side - Theme, Bell */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <div className="relative" ref={desktopNotifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-150"
                  style={{
                    color: notifications.length > 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    background: notifications.length > 0 ? 'var(--color-accent-subtle)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (notifications.length === 0) {
                      e.currentTarget.style.background = 'var(--color-app-panel)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (notifications.length === 0) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                  aria-label="Notifications"
                  aria-expanded={isNotifOpen}
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <span
                      className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full animate-pulse"
                      style={{
                        background: 'var(--color-accent)',
                        boxShadow: '0 0 8px var(--color-ring)',

                      }}
                    />
                  )}
                </button>

                {/* Notifications Dropdown - Premium Masterclass */}
                <AnimatePresence>
                  {isNotifOpen && (
                    <motion.div
                      {...dropdownAnimation}
                      className="absolute top-full right-0 mt-3 w-[min(92vw,24rem)] sm:w-96 rounded-2xl overflow-hidden app-overlay-surface"
                      style={{
                        background: 'var(--color-app-overlay)',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--color-app-overlay-border)'
                      }}
                      role="menu"
                    >
                      {/* Header */}
                      <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
                        <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                          Nouveautés
                        </h3>
                        {notifications.length > 0 && (
                          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                            {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
                          </p>
                        )}
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notificationsPanelContent}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}



