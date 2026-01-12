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
import { useThemeSync } from "../hooks/useThemeSync";
import type { Page, CourseKey, Course } from "./design/types";

type SidebarMode = 'expanded' | 'mini';

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import("./design/pages").then(m => ({ default: m.DashboardPage })));
const LibraryPage = lazy(() => import("./design/pages").then(m => ({ default: m.LibraryPage })));
const ActivityPage = lazy(() => import("./design/pages").then(m => ({ default: m.ActivityPage })));
const CoursePage = lazy(() => import("./design/pages").then(m => ({ default: m.CoursePage })));
const ReadingPage = lazy(() => import("./design/pages").then(m => ({ default: m.ReadingPage })));

export default function AgoraPremiumTemplate() {
    const [page, setPage] = useState<Page>("dashboard");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeCourseKey, setActiveCourseKey] = useState<CourseKey>("macro");
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>('expanded');
    const [readingMode, setReadingMode] = useState<"dark" | "paper">("dark");

    // Force dark mode permanently
    useThemeSync(true);

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
            <AppBackground />

            {/* Desktop layout - FLOATING GLASS PANELS */}
            <div className="hidden lg:block h-screen overflow-hidden">
                <div className="h-full p-4">
                    <div className="mx-auto max-w-[1480px] h-full">
                        <div className="grid grid-cols-[auto_1fr] gap-4 h-full">
                            {/* Floating Sidebar Panel */}
                            <aside 
                                className={cx(
                                    "shrink-0 overflow-hidden",
                                    sidebarMode === 'mini' ? "w-[88px]" : "w-[296px]"
                                )}
                                style={{ 
                                    borderRadius: "var(--radius-panel)",
                                    transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                            >
                                <div className="relative h-full border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-2xl backdrop-saturate-150 dark:backdrop-brightness-110 shadow-[var(--shadow-lg)]">
                                    {/* Glass highlight (Apple signature) */}
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
                                        style={{ background: "var(--glass-highlight)" }}
                                    />
                                    <div className="relative h-full">
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
                                                setSidebarMode(prev => prev === 'expanded' ? 'mini' : 'expanded');
                                            }}
                                        />
                                    </div>
                                </div>
                            </aside>

                            {/* Floating Main Panel */}
                            <div className="flex flex-col min-w-0 h-full overflow-hidden" style={{ borderRadius: "var(--radius-panel)" }}>
                                {/* Floating Topbar */}
                                <div className="shrink-0">
                                    <div 
                                        className="relative h-16 border border-[var(--glass-border)] bg-[var(--glass-panel-strong)] backdrop-blur-2xl backdrop-saturate-150 dark:backdrop-brightness-110 shadow-[var(--shadow-lg)]"
                                        style={{ borderRadius: "var(--radius-panel)" }}
                                    >
                                        {/* Glass highlight */}
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
                                            style={{ background: "var(--glass-highlight)" }}
                                        />
                                        <div className="relative h-full">
                                            <Topbar 
                                                title={title} 
                                                onOpenSidebar={() => setDrawerOpen(true)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Panel - Becomes Paper Canvas in reading mode */}
                                <main className="flex-1 overflow-hidden mt-4">
                                    <div 
                                        id="reading-scroll-container"
                                        className="relative h-full overflow-auto border shadow-[var(--shadow-lg)] transition-all duration-300"
                                        style={{ 
                                            borderRadius: "var(--radius-panel)",
                                            background: (page === "reading" && readingMode === "paper") ? "var(--paper-bg)" : "var(--glass-panel)",
                                            borderColor: (page === "reading" && readingMode === "paper") ? "var(--paper-border)" : "var(--glass-border)",
                                            backdropFilter: (page === "reading" && readingMode === "paper") ? "none" : "blur(32px) saturate(150%)",
                                            boxShadow: (page === "reading" && readingMode === "paper") ? "var(--paper-shadow)" : "var(--shadow-lg)"
                                        }}
                                    >
                                        {/* Glass highlight (only in dark mode) */}
                                        {!(page === "reading" && readingMode === "paper") && (
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
                                                style={{ background: "var(--glass-highlight)" }}
                                            />
                                        )}
                                        <div className="relative mx-auto max-w-[960px] px-6 py-10 lg:px-10">
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
                                                        {page === "course" && (
                                                            <CoursePage 
                                                                course={activeCourse}
                                                                onOpenContent={() => setPage("reading")}
                                                            />
                                                        )}
                                                        {page === "reading" && (
                                                            <ReadingPage
                                                                course={activeCourse}
                                                                readingMode={readingMode}
                                                                onToggleReading={() => setReadingMode(prev => prev === "dark" ? "paper" : "dark")}
                                                                onBack={() => setPage("course")}
                                                            />
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </Suspense>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet layout (768-1024px) */}
            <div className="hidden md:block lg:hidden">
                <Topbar 
                    title={title} 
                    onOpenSidebar={() => setDrawerOpen(true)}
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
                                    {page === "course" && (
                                        <CoursePage 
                                            course={activeCourse}
                                            onOpenContent={() => setPage("reading")}
                                        />
                                    )}
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
                                {page === "course" && (
                                    <CoursePage 
                                        course={activeCourse}
                                        onOpenContent={() => setPage("reading")}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </Suspense>
                </main>

                <MobileBottomNav page={page} setPage={setPage} />
            </div>
        </div>
    );
}
