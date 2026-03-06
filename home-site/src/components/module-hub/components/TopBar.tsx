/**
 * TopBar - Navigation supérieure sticky full-width
 * Design: Glass effect with backdrop blur (theme-aware)
 */

import { Bell, FileText, Search, Menu, X, Clock3 } from 'lucide-react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
  const notifRef = useRef<HTMLDivElement>(null);
  const zoomCurrentRef = useRef(100);
  const zoomTargetRef = useRef(100);
  const zoomLastAppliedRef = useRef<number>(100);
  const zoomRafRef = useRef<number | null>(null);
  const zoomPersistTimeoutRef = useRef<number | null>(null);
  const zoomScopesRef = useRef<HTMLElement[]>([]);
  const location = useLocation();

  // Dynamic breadcrumb from URL
  const breadcrumb = useMemo(() => {
    const path = location.pathname;
    // Match /s3/macro, /s4/stats, etc.
    const match = path.match(/^\/(s\d+)\/(\w+)/);
    if (!match) return { year: 'L2', semester: 'S3', subject: '' };
    const [, semId, subjectId] = match;
    const semConfig = semesters[semId];
    if (!semConfig) return { year: 'L2', semester: semId.toUpperCase(), subject: '' };
    const subject = semConfig.subjects.find(s => s.id === subjectId);
    return {
      year: semConfig.year.includes('2025') ? 'L2' : 'L2',
      semester: semConfig.shortName,
      subject: subject?.name || subjectId,
    };
  }, [location.pathname]);

  // Detect if we're on a chapter page
  const isChapterPage = /\/chapitre-/.test(location.pathname);

  // Current course (chapter) progression/time
  const [courseProgress, setCourseProgress] = useState<number | null>(null);
  const [baseCourseTimeSeconds, setBaseCourseTimeSeconds] = useState(0);
  const [activeVisibleSeconds, setActiveVisibleSeconds] = useState(0);
  const isVisibleRef = useRef<boolean>(document.visibilityState === 'visible');
  const activeTimeLabel = useMemo(
    () => formatSeconds(baseCourseTimeSeconds + activeVisibleSeconds),
    [baseCourseTimeSeconds, activeVisibleSeconds]
  );

  const applyCourseZoom = useCallback((next: number, force = false) => {
    const clamped = Math.max(80, Math.min(140, next));
    if (!force && Math.abs(clamped - zoomLastAppliedRef.current) < 0.01) return;
    zoomCurrentRef.current = clamped;
    zoomLastAppliedRef.current = clamped;
    const scale = clamped / 100;
    const scaleValue = scale.toFixed(4);
    const zoomScopes = zoomScopesRef.current;
    if (zoomScopes.length > 0) {
      zoomScopes.forEach((node) => {
        node.style.setProperty('--course-content-scale', scaleValue);
        const layer = node.querySelector<HTMLElement>(':scope > .course-zoom-layer');
        if (!layer) return;
        const cachedBaseHeight = Number(node.dataset.baseHeight || '0');
        const baseHeight = cachedBaseHeight > 0 ? cachedBaseHeight : layer.offsetHeight;
        if (cachedBaseHeight <= 0) {
          node.dataset.baseHeight = String(baseHeight);
        }
        node.style.height = `${Math.ceil(baseHeight * scale)}px`;
      });
      return;
    }
    document.documentElement.style.setProperty('--course-content-scale', scaleValue);
  }, []);

  const persistCourseZoom = useCallback((next: number) => {
    if (typeof window === 'undefined') return;
    const clamped = Math.max(80, Math.min(140, Math.round(next)));
    window.localStorage.setItem('course-content-zoom', String(clamped));
  }, []);

  const startZoomAnimation = useCallback(() => {
    if (zoomRafRef.current !== null) return;

    const tick = () => {
      const current = zoomCurrentRef.current;
      const target = zoomTargetRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.04) {
        applyCourseZoom(target);
        zoomRafRef.current = null;
        return;
      }

      applyCourseZoom(current + delta * 0.16);
      zoomRafRef.current = window.requestAnimationFrame(tick);
    };

    zoomRafRef.current = window.requestAnimationFrame(tick);
  }, [applyCourseZoom]);
  
  useEffect(() => {
    if (!isChapterPage) {
      setCourseProgress(null);
      setBaseCourseTimeSeconds(0);
      setActiveVisibleSeconds(0);
      return;
    }
    
    const updateCompletion = () => {
      const match = location.pathname.match(/^\/(s\d+)\/(\w+)/);
      if (!match) {
        setCourseProgress(null);
        return;
      }
      
      const [, semId, subjectIdRaw] = match;
      const subjectId = subjectIdRaw as ModuleId;
      const validModuleIds: ModuleId[] = ['macro', 'micro', 'stats', 'socio', 'management'];
      if (!validModuleIds.includes(subjectId)) {
        setCourseProgress(0);
        return;
      }

      const moduleKey = getSemesterKey(`/${semId}/${subjectId}`, subjectId);
      const moduleProgress = progressService.getModule(moduleKey);
      const currentChapter = resolveCurrentChapterProgress(moduleProgress, location.pathname, subjectId, semId);
      if (!currentChapter) {
        setCourseProgress(0);
        return;
      }

      const scrollPct = clampPercent(currentChapter.scrollProgress ?? 0);
      setCourseProgress(scrollPct);
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
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = Number(window.localStorage.getItem('course-content-zoom') || '100');
    const next = Number.isFinite(saved) ? Math.max(80, Math.min(140, saved)) : 100;
    zoomCurrentRef.current = next;
    zoomTargetRef.current = next;
    zoomLastAppliedRef.current = next;
    applyCourseZoom(next, true);
  }, [applyCourseZoom]);

  useEffect(() => {
    if (!isChapterPage) {
      zoomScopesRef.current = [];
      return;
    }

    const refreshScopes = () => {
      zoomScopesRef.current = Array.from(document.querySelectorAll<HTMLElement>('.course-zoom-scope'));
      const scale = zoomCurrentRef.current / 100;
      const scaleValue = scale.toFixed(4);
      zoomScopesRef.current.forEach((node) => {
        node.style.setProperty('--course-content-scale', scaleValue);
        const layer = node.querySelector<HTMLElement>(':scope > .course-zoom-layer');
        if (!layer) return;
        const baseHeight = layer.offsetHeight;
        node.dataset.baseHeight = String(baseHeight);
        node.style.height = `${Math.ceil(baseHeight * scale)}px`;
      });
    };

    const rafId = window.requestAnimationFrame(refreshScopes);
    return () => window.cancelAnimationFrame(rafId);
  }, [isChapterPage, location.pathname]);

  useEffect(() => {
    if (!isChapterPage) return;

    const handleResize = () => {
      zoomScopesRef.current.forEach((node) => {
        const layer = node.querySelector<HTMLElement>(':scope > .course-zoom-layer');
        if (!layer) return;
        node.dataset.baseHeight = String(layer.offsetHeight);
      });
      applyCourseZoom(zoomCurrentRef.current, true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isChapterPage, applyCourseZoom]);

  useEffect(() => {
    if (!isChapterPage) return;

    const handleWheelZoom = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const normalized = event.deltaY / unit;
      const factor = Math.exp(-normalized * 0.0018);
      const nextTarget = Math.max(80, Math.min(140, zoomTargetRef.current * factor));
      zoomTargetRef.current = nextTarget;
      startZoomAnimation();

      if (zoomPersistTimeoutRef.current !== null) {
        window.clearTimeout(zoomPersistTimeoutRef.current);
      }
      zoomPersistTimeoutRef.current = window.setTimeout(() => {
        persistCourseZoom(zoomTargetRef.current);
      }, 160);
    };

    window.addEventListener('wheel', handleWheelZoom, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheelZoom);
      if (zoomPersistTimeoutRef.current !== null) {
        window.clearTimeout(zoomPersistTimeoutRef.current);
      }
    };
  }, [isChapterPage, persistCourseZoom, startZoomAnimation]);

  useEffect(() => {
    return () => {
      if (zoomRafRef.current !== null) {
        window.cancelAnimationFrame(zoomRafRef.current);
      }
      if (zoomPersistTimeoutRef.current !== null) {
        window.clearTimeout(zoomPersistTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="sticky top-0 z-20 glass-premium"
        style={{
          width: '100%',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: `1px solid var(--glass-border)`,
          boxShadow: 'none',
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
          <div className="flex h-14 items-center gap-2 sm:gap-4">
            {/* Left side - Hamburger (mobile) + Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0 shrink-0">
              {/* Mobile hamburger menu */}
              {toggleMobile && (
                <button
                  onClick={toggleMobile}
                  className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl transition-all"
                  style={{
                    background: 'var(--color-surface)',
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
                <span style={{ color: 'var(--color-text-muted)' }}>{breadcrumb.year}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{breadcrumb.semester}</span>
                {breadcrumb.subject && (
                  <>
                    <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{breadcrumb.subject}</span>
                  </>
                )}
              </div>
            </div>

            <div className="hidden lg:flex shrink-0 justify-start" style={{ width: 'clamp(132px, calc((100vw - var(--sidebar-width, 256px)) * 0.14), 176px)' }}>
              {isChapterPage && courseProgress !== null && (
                <span
                  className="inline-flex w-full items-center justify-center shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: courseProgress >= 100 ? 'var(--color-success-subtle)' : 'var(--color-accent-subtle)',
                    color: courseProgress >= 100 ? 'var(--color-success)' : 'var(--color-accent)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  Progression du cours : {courseProgress}%
                </span>
              )}
            </div>

            {/* Center - Search bar (prominent) */}
            <div className="flex-1 max-w-2xl mx-auto">
              <button
                onClick={() => onSearchClick?.()}
                className="hidden sm:flex w-full items-center gap-3 h-10 px-4 rounded-xl transition-all duration-200
                         border shadow-sm"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-accent) 14%, transparent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-default)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                title="Rechercher (Ctrl+K)"
              >
                <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <span
                  className="flex-1 text-sm text-left truncate"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  Rechercher un chapitre, une matière...
                </span>
                <kbd
                  className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded shrink-0"
                  style={{
                    background: 'var(--color-bg-overlay)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  Ctrl+K
                </kbd>
              </button>

              <button
                onClick={() => onSearchClick?.()}
                className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border-default)',
                }}
                title="Rechercher"
                aria-label="Rechercher"
              >
                <Search className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
              </button>
            </div>

            <div className="hidden lg:flex shrink-0 justify-end" style={{ width: 'clamp(132px, calc((100vw - var(--sidebar-width, 256px)) * 0.14), 176px)' }}>
              {isChapterPage && courseProgress !== null && (
                <span
                  className="inline-flex w-full items-center justify-center gap-1.5 shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: 'var(--color-bg-overlay)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-default)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  Temps actif : {activeTimeLabel}
                </span>
              )}
            </div>

            {/* Right side - Theme, Bell (NO SCROLL %) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-150"
                  style={{
                    color: notifications.length > 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    background: notifications.length > 0 ? 'var(--color-accent-subtle)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (notifications.length === 0) {
                      e.currentTarget.style.background = 'var(--color-bg-overlay)';
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
                      className="absolute top-full right-0 mt-3 w-[min(92vw,24rem)] sm:w-96 rounded-2xl overflow-hidden"
                      style={{
                        background: 'var(--color-canvas)',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--color-border-strong)'
                      }}
                      role="menu"
                    >
                      {/* Header */}
                      <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
                        <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
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
                        {notifications.length > 0 ? (
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
                                {/* Icon */}
                                <div
                                  className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center"
                                  style={{
                                    background: 'var(--color-rose-50)',
                                  }}
                                >
                                  <FileText className="h-5 w-5" style={{ color: 'var(--color-rose-600)' }} />
                                </div>
                                {/* Content */}
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
                        )}
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



