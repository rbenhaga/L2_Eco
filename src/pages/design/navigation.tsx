/**
 * Agora Premium - Navigation Components
 * Enhanced with collapsible sidebar and proper responsive layout
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Menu,
    Sun,
    Moon,
    Bell,
    Home,
    Layers,
    Activity,
    GraduationCap,
    Settings,
    Lock,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cx, COURSE_META, ICON_SIZES, ICON_STROKE } from "./helpers";
import { Kbd } from "./primitives";
import type { Page, Course, CourseKey } from "./types";

// --- SearchBar ---
export function SearchBar() {
    return (
        <div className="w-full max-w-[640px]">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2.5 shadow-[var(--shadow-xs)] focus-within:ring-2 focus-within:ring-[var(--color-ring)] focus-within:shadow-[var(--shadow-sm)] transition-all duration-200">
                <Search size={ICON_SIZES.sm} strokeWidth={ICON_STROKE.regular} className="text-[var(--color-text-muted)] shrink-0" />
                <input
                    type="search"
                    aria-label="Rechercher un cours, TD, annale"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]"
                    placeholder="Rechercher un cours, TD, annale…"
                />
                <div className="hidden md:flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </div>
            </div>
        </div>
    );
}

// --- Topbar ---
export function Topbar({
    title,
    onOpenSidebar,
    dark,
    setDark,
}: {
    title: string;
    onOpenSidebar: () => void;
    dark: boolean;
    setDark: (d: boolean) => void;
    sidebarCollapsed?: boolean;
}) {
    return (
        <div className="sticky top-0 z-40 bg-[var(--color-surface-raised)]/95 backdrop-blur-xl border-b border-[var(--color-border)]">
            <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
                {/* Mobile: Menu button + Icon */}
                <div className="flex items-center gap-3 md:hidden">
                    <button
                        onClick={onOpenSidebar}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:shadow-[var(--shadow-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] transition-all duration-200 active:scale-95"
                        aria-label="Ouvrir le menu de navigation"
                    >
                        <Menu size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} />
                    </button>

                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] shadow-[var(--shadow-xs)] shrink-0">
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), transparent 70%)",
                            }}
                        />
                        <GraduationCap size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} className="relative text-[var(--color-text-base)]" />
                    </div>
                </div>

                {/* Mobile: Title */}
                <div className="min-w-0 md:hidden">
                    <div className="truncate text-sm font-semibold text-[var(--color-text-base)]">{title}</div>
                </div>

                {/* Desktop: Search bar (centered) */}
                <div className="hidden md:flex flex-1 justify-center">
                    <SearchBar />
                </div>

                {/* Right actions */}
                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={() => setDark(!dark)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:shadow-[var(--shadow-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] transition-all duration-200 active:scale-95"
                        aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
                    >
                        {dark ? <Sun size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} /> : <Moon size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} />}
                    </button>

                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:shadow-[var(--shadow-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] transition-all duration-200 active:scale-95"
                        aria-label="Voir les notifications"
                    >
                        <Bell size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- NavLink ---
type NavItem = { id: Page; label: string; icon: React.ElementType };

export const NAV_PRIMARY: NavItem[] = [
    { id: "dashboard", label: "Accueil", icon: Home },
    { id: "library", label: "Bibliothèque", icon: Layers },
    { id: "activity", label: "Activité", icon: Activity },
];

function NavLink({
    active,
    icon: Icon,
    label,
    onClick,
    collapsed,
}: {
    active?: boolean;
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    collapsed?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cx(
                "relative w-full flex items-center gap-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                "min-h-[44px]",
                active
                    ? "bg-[var(--color-surface-hover)] text-[var(--color-text-base)] shadow-[var(--shadow-xs)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text-base)]"
            )}
            aria-current={active ? "page" : undefined}
            title={collapsed ? label : undefined}
        >
            <Icon
                size={ICON_SIZES.md}
                strokeWidth={ICON_STROKE.regular}
                className={cx(
                    "transition-colors duration-200",
                    active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                )}
            />
            {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
            
            {/* Active indicator - More visible and animated */}
            {active && (
                <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-accent)] rounded-r-full"
                    style={{
                        boxShadow: `
                            0 0 12px var(--color-accent),
                            0 0 24px rgba(37, 99, 235, 0.4)
                        `,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    }}
                    initial={false}
                />
            )}
        </button>
    );
}

// --- CourseMiniRow ---
function CourseMiniRow({ c, active, onOpen, collapsed }: { c: Course; active: boolean; onOpen: () => void; collapsed?: boolean }) {
    const meta = COURSE_META[c.key];
    const Icon = meta.icon;
    
    return (
        <button
            onClick={onOpen}
            disabled={c.locked}
            aria-disabled={c.locked}
            aria-label={c.locked ? `${c.title} - Contenu premium verrouillé` : `Ouvrir ${c.title}`}
            className={cx(
                "w-full rounded-lg text-left transition-all duration-200 min-h-[44px]",
                collapsed ? "px-2 py-3 flex justify-center" : "px-3 py-2.5",
                c.locked && "opacity-60 cursor-not-allowed",
                active
                    ? "bg-[var(--color-surface-hover)] shadow-[var(--shadow-xs)]"
                    : "hover:bg-[var(--color-surface-overlay)]"
            )}
            style={{
                ...(active && { borderLeft: `2px solid ${meta.color}` }),
            }}
            title={collapsed ? c.title : undefined}
        >
            {collapsed ? (
                <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border shadow-[var(--shadow-xs)] transition-all duration-200"
                    style={{
                        borderColor: active ? meta.color : "var(--color-border-soft)",
                        background: active
                            ? `linear-gradient(135deg, ${meta.colorLight}, transparent)`
                            : "var(--color-surface-overlay)",
                    }}
                >
                    <Icon
                        size={ICON_SIZES.sm}
                        strokeWidth={ICON_STROKE.regular}
                        style={{ color: active ? meta.color : "var(--color-text-secondary)" }}
                    />
                </span>
            ) : (
                <div className="flex items-center gap-2.5">
                    <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border shadow-[var(--shadow-xs)] transition-all duration-200"
                        style={{
                            borderColor: active ? meta.color : "var(--color-border-soft)",
                            background: active
                                ? `linear-gradient(135deg, ${meta.colorLight}, transparent)`
                                : "var(--color-surface-overlay)",
                        }}
                    >
                        <Icon
                            size={ICON_SIZES.sm}
                            strokeWidth={ICON_STROKE.regular}
                            style={{ color: active ? meta.color : "var(--color-text-secondary)" }}
                        />
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <div className="truncate text-sm font-medium text-[var(--color-text-base)]">{c.title}</div>
                            <div className="shrink-0 text-xs tabular-nums text-[var(--color-text-secondary)]">{c.progress}%</div>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                            {c.locked ? (
                                <span className="inline-flex items-center gap-1">
                                    <Lock size={12} /> Premium
                                </span>
                            ) : (
                                <span className="truncate">{c.subtitle}</span>
                            )}
                            {c.unreadUpdates > 0 && (
                                <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] px-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
                                    {c.unreadUpdates}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </button>
    );
}

// --- Navbar ---
export function Navbar({
    page,
    setPage,
    activeCourseKey,
    onOpenCourse,
    courses,
    collapsed,
    onToggleCollapse,
}: {
    page: Page;
    setPage: (p: Page) => void;
    activeCourseKey: CourseKey;
    onOpenCourse: (k: CourseKey) => void;
    courses: Course[];
    collapsed: boolean;
    onToggleCollapse: () => void;
}) {
    return (
        <div className="flex h-full flex-col px-4 py-6">
            {/* Collapse toggle (desktop only) */}
            {!collapsed && (
                <div className="hidden lg:flex items-center justify-between mb-6">
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] shadow-[var(--shadow-xs)]">
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), transparent 70%)",
                            }}
                        />
                        <GraduationCap size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} className="relative text-[var(--color-text-base)]" />
                    </div>
                    <button
                        onClick={onToggleCollapse}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        aria-label="Réduire la sidebar"
                    >
                        <ChevronLeft size={16} />
                    </button>
                </div>
            )}

            {collapsed && (
                <div className="hidden lg:flex justify-center mb-6">
                    <button
                        onClick={onToggleCollapse}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                        aria-label="Agrandir la sidebar"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <div className="mt-2">
                {!collapsed && <div className="mb-2 text-[11px] font-semibold tracking-wide uppercase text-[var(--color-text-muted)]">Navigation</div>}
                <nav className="space-y-1" role="navigation" aria-label="Navigation principale">
                    {NAV_PRIMARY.map((it) => (
                        <NavLink key={it.id} active={it.id === page} icon={it.icon} label={it.label} onClick={() => setPage(it.id)} collapsed={collapsed} />
                    ))}
                </nav>
            </div>

            <div className="mt-7">
                {!collapsed && (
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] font-semibold tracking-wide uppercase text-[var(--color-text-muted)]">Matières</div>
                        <span className="text-[11px] text-[var(--color-text-muted)] tabular-nums">{courses.length}</span>
                    </div>
                )}
                <div className="space-y-1" role="navigation" aria-label="Liste des cours">
                    {courses.map((c) => (
                        <CourseMiniRow key={c.key} c={c} active={c.key === activeCourseKey} onOpen={() => onOpenCourse(c.key)} collapsed={collapsed} />
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-5">
                <div className="-mx-4 border-t border-[var(--color-border)] px-4 py-4">
                    <button 
                        className={cx(
                            "w-full inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-xs font-medium text-[var(--color-text-base)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[44px]",
                            collapsed ? "justify-center px-2 py-2.5" : "justify-center px-3 py-2.5"
                        )}
                        aria-label="Ouvrir les réglages"
                        title={collapsed ? "Réglages" : undefined}
                    >
                        <Settings size={14} className="text-[var(--color-text-secondary)]" />
                        {!collapsed && "Réglages"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Mobile Drawer ---
export function Drawer({
    open,
    onClose,
    children,
}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
            
            <motion.div
                className="fixed left-0 top-0 bottom-0 z-50 w-[320px] max-w-[90vw] md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: open ? 0 : "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
            >
                <div className="h-full bg-[var(--color-surface-raised)] p-3 shadow-2xl overflow-auto">
                    {children}
                </div>
            </motion.div>
        </>
    );
}

export function MobileBottomNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto max-w-[1440px] px-2">
                <div className="grid grid-cols-3">
                    {NAV_PRIMARY.map((it) => {
                        const Icon = it.icon;
                        const active = it.id === page;
                        return (
                            <button
                                key={it.id}
                                onClick={() => setPage(it.id)}
                                className={cx(
                                    "flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors min-h-[56px]",
                                    active ? "text-[var(--color-text-base)]" : "text-[var(--color-text-secondary)]"
                                )}
                                aria-current={active ? "page" : undefined}
                                aria-label={it.label}
                            >
                                <Icon size={20} />
                                <span className="text-[11px]">{it.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function DrawerHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] shadow-[var(--shadow-xs)]">
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), transparent 70%)",
                        }}
                    />
                    <GraduationCap size={ICON_SIZES.md} strokeWidth={ICON_STROKE.regular} className="relative text-[var(--color-text-base)]" />
                </div>
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[var(--color-text-base)]">Agora</div>
                    <div className="truncate text-xs text-[var(--color-text-secondary)]">Cours · TD · corrigés</div>
                </div>
            </div>
            <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-base)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label="Fermer le menu"
            >
                <X size={18} />
            </button>
        </div>
    );
}
