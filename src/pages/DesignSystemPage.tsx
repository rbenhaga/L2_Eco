/**
 * Agora Premium Template — Main Entry Point
 * 
 * Direction: Apple/Notion aesthetic with unified token system
 * All design tokens are centralized in index.css
 */

import { useState, useMemo } from "react";
import { cx } from "./design/helpers";
import { AppBackground } from "./design/background";
import { Topbar, Navbar, Drawer, DrawerHeader, MobileBottomNav, SearchBar } from "./design/navigation";
import { DashboardPage, LibraryPage, ActivityPage, CoursePage } from "./design/pages";
import { COURSES } from "./design/data";
import type { Page, CourseKey, Course } from "./design/types";

export default function AgoraPremiumTemplate() {
    const [page, setPage] = useState<Page>("dashboard");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [activeCourseKey, setActiveCourseKey] = useState<CourseKey>("macro");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Apply dark class to document root
    useState(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
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
                        sidebarCollapsed ? "w-[72px]" : "w-[280px]"
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
                            collapsed={sidebarCollapsed}
                            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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
                        sidebarCollapsed={sidebarCollapsed}
                    />

                    {/* Content */}
                    <main className="flex-1 overflow-auto bg-[var(--color-surface-base)]">
                        <div className="mx-auto max-w-[960px] px-6 py-10 lg:px-10">
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
                    sidebarCollapsed={false}
                />
                
                <main className="pb-16 bg-[var(--color-surface-base)]">
                    <div className="mx-auto max-w-[720px] px-6 py-8">
                        <div className="mb-6">
                            <SearchBar />
                        </div>

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
                        collapsed={false}
                        onToggleCollapse={() => {}}
                    />
                </Drawer>

                <Topbar 
                    title={title} 
                    onOpenSidebar={() => setDrawerOpen(true)} 
                    dark={dark} 
                    setDark={toggleDark}
                    sidebarCollapsed={false}
                />

                <main className="py-6 pb-24 bg-[var(--color-surface-base)] px-4">
                    <div className="mb-4">
                        <SearchBar />
                    </div>

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
                </main>

                <MobileBottomNav page={page} setPage={setPage} />
            </div>
        </div>
    );
}
