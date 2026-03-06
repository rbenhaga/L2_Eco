import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ModuleSidebar } from '../components/layout/ModuleSidebar';
import { GlobalSearchModal } from '../components/search/GlobalSearchModal';
import { MobileNav } from '../components/mobile/MobileNav';
import { TopBar } from '../components/module-hub/components/TopBar';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { authFetch } from '../utils/authFetch';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '../types/siteConfig';

export function AppLayout() {
  const { isExpanded } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const PROGRESS_STORAGE_KEY = 'agora_user_progress';

  // Calculate sidebar width
  const sidebarWidth = isExpanded ? 256 : 64;

  // Global search shortcut (Ctrl+K)
  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    }
    document.addEventListener('keydown', handleSearchShortcut);
    return () => document.removeEventListener('keydown', handleSearchShortcut);
  }, []);

  // Keep local progress in sync with backend:
  // if backend has no progress rows for the current user, clear stale local cache.
  useEffect(() => {
    if (!user?.uid) return;

    const localRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const hasLocalProgress = Boolean(localRaw && localRaw !== '{}' && localRaw !== 'null');
    if (!hasLocalProgress) return;

    let active = true;

    const syncProgressState = async () => {
      try {
        const response = await authFetch(`${API_URL}/api/progress/${user.uid}/summary`);
        if (!response.ok) return;
        const payload = await response.json();
        const backendRows = Number(payload?.totalRows || 0);

        if (!active) return;

        if (backendRows === 0) {
          progressService.reset();
          setScrollProgress(0);
        }
      } catch {
        // Silent fail: keep current local state if backend check is unavailable.
      }
    };

    void syncProgressState();

    return () => {
      active = false;
    };
  }, [API_URL, user?.uid]);

  // Prevent rubber-band overscroll so sticky top bar never drifts down at scroll top
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverscroll = html.style.overscrollBehaviorY;
    const prevBodyOverscroll = body.style.overscrollBehaviorY;
    html.style.overscrollBehaviorY = 'none';
    body.style.overscrollBehaviorY = 'none';

    return () => {
      html.style.overscrollBehaviorY = prevHtmlOverscroll;
      body.style.overscrollBehaviorY = prevBodyOverscroll;
    };
  }, []);

  // Scroll progress tracking for the main content area
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const docHeight = target.scrollHeight - target.clientHeight;
    // Prevent division by zero
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
  };

  // Fetch public config (course badges + topbar notifications)
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

  // Fetch notifications (per-user when authenticated, public fallback otherwise)
  useEffect(() => {
    let mounted = true;

    const loadNotifications = async () => {
      try {
        if (user?.uid) {
          const response = await authFetch(`${API_URL}/api/user/${user.uid}/notifications`);
          if (!response.ok) return;
          const data = await response.json();
          if (!mounted) return;
          setSiteConfig((prev) => ({
            ...prev,
            notifications: Array.isArray(data?.notifications) ? data.notifications : [],
          }));
          return;
        }

        const response = await fetch(`${API_URL}/api/site-config`);
        if (!response.ok) return;
        const data = await response.json();
        const now = Date.now();
        const activeNotifications = Array.isArray(data?.notifications)
          ? data.notifications.filter((notif: any) => {
              const createdAt = Number(notif?.createdAt) > 0 ? Number(notif.createdAt) : now;
              const expiresInHours = Number(notif?.expiresInHours);
              if (!Number.isFinite(expiresInHours) || expiresInHours < 0) return true;
              if (expiresInHours === 0) return false;
              return now <= createdAt + expiresInHours * 60 * 60 * 1000;
            })
          : [];
        if (!mounted) return;
        setSiteConfig((prev) => ({
          ...prev,
          notifications: activeNotifications,
        }));
      } catch (_e) {
        // Silent fallback.
      }
    };

    void loadNotifications();
    return () => {
      mounted = false;
    };
  }, [API_URL, user?.uid]);

  // Persist last learning location (semester + path) for authenticated users
  useEffect(() => {
    if (!user?.uid) return;

    const path = location.pathname;
    const match = path.match(/^\/(s[34])\/[a-z0-9-]+/i);
    if (!match) return;

    const semester = match[1].toLowerCase();
    const cacheKey = `last-nav-${user.uid}`;
    const payload = JSON.stringify({ semester, path });

    if (localStorage.getItem(cacheKey) === payload) return;
    localStorage.setItem(cacheKey, payload);

    authFetch(`${API_URL}/api/user/${user.uid}/navigation`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ semester, lastPath: path }),
    }).catch(() => {
      // Silent fail, local fallback already persisted.
    });
  }, [API_URL, location.pathname, user?.uid]);

  return (
    <div
      className="relative flex h-screen overflow-hidden"
      style={{
        background: 'var(--color-canvas)',
        ['--sidebar-width' as string]: `${sidebarWidth}px`,
        overscrollBehaviorY: 'none',
      }}
    >
      {/* Global Search Modal - Unified */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation - Bottom drawer */}
      <MobileNav onSearchClick={() => setIsSearchOpen(true)} />

      {/* ModuleSidebar - Desktop Rail */}
      <ModuleSidebar />

      {/* Content area - with TopBar + dynamic margin for sidebar */}
      <div
        className="app-content flex-1 min-w-0 flex flex-col overflow-hidden"
      >
        {/* TopBar - Always visible, receives scroll progress */}
        <TopBar
          onSearchClick={() => setIsSearchOpen(true)}
          scrollProgress={scrollProgress}
          notifications={siteConfig.notifications}
          onDismissNotification={async (notificationId) => {
            if (!user?.uid) return;
            setSiteConfig((prev) => ({
              ...prev,
              notifications: prev.notifications.filter((notif) => String(notif.id) !== String(notificationId)),
            }));
            try {
              await authFetch(`${API_URL}/api/user/${user.uid}/notifications/${notificationId}/dismiss`, {
                method: 'POST',
              });
            } catch (_e) {
              // Ignore network failure, optimistic UI kept.
            }
          }}
        />

        {/* Page content - scrollable */}
        <div
          className="flex-1 overflow-y-auto pb-20 lg:pb-0 scroll-smooth"
          onScroll={handleScroll}
          style={{
            overscrollBehaviorY: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .app-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: var(--sidebar-width);
            width: auto;
            margin-left: 0;
            transition: left 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          }
        }
      `}</style>
    </div>
  );
}
