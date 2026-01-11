/**
 * Agora Premium Template — Main Entry Point
 * 
 * Direction: Apple/Notion aesthetic with unified token system
 * All design tokens are centralized in index.css
 */

import { useState, useMemo, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "./design/helpers";
import { AppBackground } from "./design/background";
import { Topbar, Navbar, Drawer, DrawerHeader, MobileBottomNav, SearchBar } from "./design/navigation";
import { LoadingState } from "./design/states";
import { COURSES } from "./design/data";
import type { Page, CourseKey, Course } from "./design/types";

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import("./design/pages").then(m => ({ default: m.DashboardPage })));
const LibraryPage = lazy(() => import("./design/pages").then(m => ({ default: m.LibraryPage })));
const ActivityPage = lazy(() => import("./design/pages").then(m => ({ default: m.ActivityPage })));
const CoursePage = lazy(() => import("./design/pages").then(m => ({ default: m.CoursePage })));

type SidebarMode = 'expanded' | 'compact' | 'mini';

export default function AgoraPremiumTemplate() {
    const [page, setPage] = useState<Page>("dashboard");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [activeCourseKey, setActiveCourseKey] = useState<CourseKey>("macro");
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>('expanded');
    const [searchOpen, setSearchOpen] = useState(false);

    // Apply dark class to document root
    useState(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    // Keyboard shortcuts
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // ⌘K or Ctrl+K to open search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            // Escape to close search or drawer
            if (e.key === 'Escape') {
                if (searchOpen) setSearchOpen(false);
                if (drawerOpen) setDrawerOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Update dark class when dark state changes
    const toggleDark = (value: boolean) => {
        setDark(value);
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Keyboard shortcuts
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Escape to close drawer
            if (e.key === 'Escape') {
                setDrawerOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const title = useMemo(() => {
        if (page === "dashboard") return "Accueil";
        if (page === "library") return "Bibliothèque";
        if (page === "activity") return "Activité";
        return "Cours";
    }, [page]);

    const activeCourse = useMemo(
        () => COURSES.find((c: Course) => c.key === activeCourseKey) ?? COURSES[0],
        [activeCourseKey]
    );

    return (
        <div className="min-h-screen">
            <AppBackground dark={dark} />

            {/* Desktop layout */}
            <div className="hidden lg:flex h-screen">
                {/* Sidebar */}
                <aside 
                    className={cx(
                        "shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[inset_-1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300",
                        sidebarMode === 'mini' ? "w-[72px]" : sidebarMode === 'compact' ? "w-[200px]" : "w-[280px]"
                    )}
                >
                    <div className="h-full overflow-auto">
                        <Navbar
                            page={page}
                            setPage={setPage}
                            activeCourseKey={activeCourseKey}
                            courses={COURSES}
                            onOpenCourse={(k) => {
                                setActiveCourseKey(k);
                                setPage("course");
                            }}
                            sidebarMode={sidebarMode}
                            onCycleSidebarMode={() => {
                                setSidebarMode(prev => 
                                    prev === 'expanded' ? 'compact' : 
                                    prev === 'compact' ? 'mini' : 'expanded'
                                );
                            }}
                        />
                    </div>
                </aside>

                {/* Main content area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Topbar */}
                    <Topbar 
                        title={title} 
                        onOpenSidebar={() => setDrawerOpen(true)} 
                        dark={dark} 
                        setDark={toggleDark}
                    />

                    {/* Content */}
                    <main className="flex-1 overflow-auto bg-[var(--color-surface-base)]">
                        <div className="mx-auto max-w-[960px] px-6 py-10 lg:px-10">
                            <Suspense fallback={<LoadingState message="Chargement..." />}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={page}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {page === "dashboard" && (
                                            <DashboardPage
                                                onOpenCourse={() => {
                                                    setPage("course");
                                                }}
                                            />
                                        )}
                                        {page === "library" && (
                                            <LibraryPage
                                                onOpenCourse={() => {
                                                    setPage("course");
                                                }}
                                            />
                                        )}
                                        {page === "activity" && <ActivityPage />}
                                        {page === "course" && <CoursePage course={activeCourse} />}
                                    </motion.div>
                                </AnimatePresence>
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>

            {/* Tablet layout (768-1024px) */}
            <div className="hidden md:block lg:hidden">
                <Topbar 
                    title={title} 
                    onOpenSidebar={() => setDrawerOpen(true)} 
                    dark={dark} 
                    setDark={toggleDark}
                />
                
                <main className="pb-16 bg-[var(--color-surface-base)]">
                    <div className="mx-auto max-w-[720px] px-6 py-8">
                        <div className="mb-6">
                            <SearchBar />
                        </div>

                        <Suspense fallback={<LoadingState message="Chargement..." />}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={page}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {page === "dashboard" && (
                                        <DashboardPage
                                            onOpenCourse={() => {
                                                setPage("course");
                                            }}
                                        />
                                    )}
                                    {page === "library" && (
                                        <LibraryPage
                                            onOpenCourse={() => {
                                                setPage("course");
                                            }}
                                        />
                                    )}
                                    {page === "activity" && <ActivityPage />}
                                    {page === "course" && <CoursePage course={activeCourse} />}
                                </motion.div>
                            </AnimatePresence>
                        </Suspense>
                    </div>
                </main>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
                <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <DrawerHeader onClose={() => setDrawerOpen(false)} />

                    <Navbar
                        page={page}
                        setPage={(p) => {
                            setPage(p);
                            setDrawerOpen(false);
                        }}
                        activeCourseKey={activeCourseKey}
                        courses={COURSES}
                        onOpenCourse={(k) => {
                            setActiveCourseKey(k);
                            setPage("course");
                            setDrawerOpen(false);
                        }}
                        sidebarMode="expanded"
                        onCycleSidebarMode={() => {}}
                    />
                </Drawer>

                <Topbar 
                    title={title} 
                    onOpenSidebar={() => setDrawerOpen(true)} 
                    dark={dark} 
                    setDark={toggleDark}
                />

                <main className="py-6 pb-24 bg-[var(--color-surface-base)] px-4">
                    <div className="mb-4">
                        <SearchBar />
                    </div>

                    <Suspense fallback={<LoadingState message="Chargement..." />}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {page === "dashboard" && (
                                    <DashboardPage
                                        onOpenCourse={() => {
                                            setPage("course");
                                        }}
                                    />
                                )}
                                {page === "library" && (
                                    <LibraryPage
                                        onOpenCourse={() => {
                                            setPage("course");
                                        }}
                                    />
                                )}
                                {page === "activity" && <ActivityPage />}
                                {page === "course" && <CoursePage course={activeCourse} />}
                            </motion.div>
                        </AnimatePresence>
                    </Suspense>
                </main>

                <MobileBottomNav page={page} setPage={setPage} />
            </div>
        </div>
    );
}
