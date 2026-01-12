/**
 * Agora Premium - Navigation Components
 * Enhanced with collapsible sidebar and proper responsive layout
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Menu,
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

type SidebarMode = 'expanded' | 'mini';

// --- BrandIcon (Reusable - ÉTAPE 3.1) ---
/**
 * Brand icon with accent glow
 * Uses --color-accent-rgb token instead of hardcoded blue
 */
function BrandIcon({ size = "md" }: { size?: "sm" | "md" }) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
    };
    
    const iconSizes = {
        sm: ICON_SIZES.sm,
        md: ICON_SIZES.md,
    };
    
    return (
        <div className={cx(
            "relative flex items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] shadow-[var(--shadow-xs)] shrink-0",
            sizeClasses[size]
        )}>
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(var(--color-accent-rgb), 0.3), transparent 70%)",
                }}
            />
            <GraduationCap 
                size={iconSizes[size]} 
                strokeWidth={ICON_STROKE.regular} 
                className="relative text-[var(--color-text-base)]" 
            />
        </div>
    );
}

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
}: {
    title: string;
    onOpenSidebar: () => void;
}) {
    return (
        <div className="flex h-full items-center gap-4 px-5">
                    {/* Mobile: Menu button + Icon */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={onOpenSidebar}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-base)] hover:bg-[var(--color-surface-hover)] hover:scale-105 transition-all duration-200 shadow-sm"
                            aria-label="Ouvrir le menu de navigation"
                        >
                            <Menu size={20} strokeWidth={2.5} />
                        </button>

                        <BrandIcon />
                    </div>

                    {/* Mobile: Title */}
                    <div className="min-w-0 md:hidden">
                        <div className="truncate text-sm font-bold text-[var(--color-text-base)]">{title}</div>
                    </div>

                    {/* Desktop: Search bar (centered) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <SearchBar />
                    </div>

                    {/* Right actions */}
                    <div className="ml-auto flex items-center gap-2">
                        <button
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-base)] hover:bg-[var(--color-surface-hover)] hover:scale-105 transition-all duration-200 shadow-sm relative"
                            aria-label="Voir les notifications"
                        >
                            <Bell size={20} strokeWidth={2.5} />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--color-destructive)] ring-2 ring-[var(--color-surface-raised)]"></span>
                        </button>
                    </div>
                </div>
    );
}

// --- Navigation Data ---
type NavItemData = { id: Page; label: string; icon: React.ElementType };

export const NAV_PRIMARY: NavItemData[] = [
    { id: "dashboard", label: "Accueil", icon: Home },
    { id: "library", label: "Bibliothèque", icon: Layers },
    { id: "activity", label: "Activité", icon: Activity },
];

// --- NavItem (Unified Component - CHANGEMENT VISUEL MAJEUR) ---
/**
 * Navigation item - Pill style (minimal, no vertical bar)
 * Active state: subtle background + accent text
 */
function NavItem({
    active,
    icon: Icon,
    label,
    onClick,
    badge,
    sidebarMode,
    disabled,
}: {
    active?: boolean;
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    badge?: number;
    sidebarMode?: SidebarMode;
    disabled?: boolean;
}) {
    const isMini = sidebarMode === 'mini';
    
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cx(
                "relative w-full flex items-center justify-center text-sm font-medium transition-all duration-200 overflow-hidden",
                "min-h-[48px]",
                disabled && "opacity-50 cursor-not-allowed",
                active
                    ? "bg-[var(--color-surface-overlay)] text-[var(--color-accent)] scale-[1.02]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text-base)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
            )}
            style={{
                borderRadius: "var(--radius-item)"
            }}
            initial={false}
            animate={{
                paddingLeft: isMini ? "0px" : "16px",
                paddingRight: isMini ? "0px" : "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            aria-current={active ? "page" : undefined}
            aria-disabled={disabled}
            title={isMini ? label : undefined}
        >
            <Icon
                size={20}
                strokeWidth={2.5}
                className="shrink-0 transition-all duration-200"
                style={{ display: "block" }}
            />
            
            {!isMini && (
                <div className="flex items-center justify-between flex-1 min-w-0 overflow-hidden ml-3">
                    <span className="flex-1 truncate text-left whitespace-nowrap">{label}</span>
                    {badge !== undefined && badge > 0 && (
                        <span className="shrink-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-destructive)] text-white px-1.5 text-[10px] font-bold tabular-nums shadow-sm ml-2">
                            {badge}
                        </span>
                    )}
                </div>
            )}
        </motion.button>
    );
}

// --- CourseMiniRow (Refactored - ÉTAPE 3.1) ---
/**
 * Course navigation item - Icon only (like NavItem)
 * Active state: background + colored icon
 */
function CourseMiniRow({ 
    c, 
    active, 
    onOpen, 
    sidebarMode 
}: { 
    c: Course; 
    active: boolean; 
    onOpen: () => void; 
    sidebarMode?: SidebarMode 
}) {
    const meta = COURSE_META[c.key];
    const Icon = meta.icon;
    const isMini = sidebarMode === 'mini';
    
    return (
        <motion.button
            onClick={onOpen}
            disabled={c.locked}
            aria-disabled={c.locked}
            aria-label={c.locked ? `${c.title} - Contenu premium verrouillé` : `Ouvrir ${c.title}`}
            className={cx(
                "w-full rounded-[var(--nav-item-radius)] transition-all duration-200 overflow-hidden flex items-center justify-center",
                "min-h-[var(--nav-item-min-height)]",
                c.locked && "opacity-60 cursor-not-allowed",
                active
                    ? "bg-[var(--color-surface-overlay)] scale-[1.02]"
                    : "hover:bg-[var(--color-surface-soft)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-raised)]"
            )}
            initial={false}
            animate={{
                paddingLeft: isMini ? "0px" : "var(--nav-item-padding-x)",
                paddingRight: isMini ? "0px" : "var(--nav-item-padding-x)",
                paddingTop: "var(--nav-item-padding-y)",
                paddingBottom: "var(--nav-item-padding-y)",
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            title={isMini ? c.title : undefined}
        >
            <Icon
                size={20}
                strokeWidth={2.5}
                style={{ color: active ? meta.color : "var(--color-text-secondary)", display: "block" }}
                className="shrink-0 transition-colors duration-200"
            />
            
            {!isMini && (
                <div className="min-w-0 flex-1 overflow-hidden ml-2.5">
                    <div className="flex items-center justify-between gap-2">
                        <div 
                            className="truncate text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                            style={{ color: active ? meta.color : "var(--color-text-base)" }}
                        >
                            {c.title}
                        </div>
                        <div className="shrink-0 text-xs tabular-nums text-[var(--color-text-secondary)]">{c.progress}%</div>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                        {c.locked ? (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                <Lock size={12} /> Premium
                            </span>
                        ) : (
                            <span className="truncate">{c.subtitle}</span>
                        )}
                        {c.unreadUpdates > 0 && (
                            <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] px-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)] tabular-nums">
                                {c.unreadUpdates}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </motion.button>
    );
}

// --- Navbar ---
export function Navbar({
    page,
    setPage,
    activeCourseKey,
    onOpenCourse,
    courses,
    sidebarMode,
    onCycleSidebarMode,
}: {
    page: Page;
    setPage: (p: Page) => void;
    activeCourseKey: CourseKey;
    onOpenCourse: (k: CourseKey) => void;
    courses: Course[];
    sidebarMode: SidebarMode;
    onCycleSidebarMode: () => void;
}) {
    const isMini = sidebarMode === 'mini';
    
    return (
        <motion.div 
            className="h-full p-4 flex flex-col"
            initial={false}
            animate={{ 
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            {/* Header with logo + collapse toggle */}
            <motion.div 
                className="hidden lg:flex items-center justify-between mb-6"
                initial={false}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                <AnimatePresence mode="wait">
                    {!isMini ? (
                        <motion.div 
                            key="expanded"
                            className="flex items-center gap-3 min-w-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                                duration: 0.2,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <BrandIcon />
                            <div className="min-w-0">
                                <div className="text-sm font-bold text-[var(--color-text-base)] truncate">Agora</div>
                                <div className="text-xs text-[var(--color-text-muted)] truncate">Premium</div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="mini"
                            className="flex justify-center w-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                duration: 0.2,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <BrandIcon />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {!isMini && (
                    <motion.button
                        onClick={onCycleSidebarMode}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:scale-105 transition-all duration-200 shadow-sm shrink-0"
                        aria-label="Réduire la sidebar"
                        title="Réduire"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    </motion.button>
                )}
            </motion.div>

            {/* Expand button (mini mode) */}
            {isMini && (
                <motion.div 
                    className="hidden lg:flex justify-center mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: 0.2,
                        delay: 0.1,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                >
                    <motion.button
                        onClick={onCycleSidebarMode}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:scale-105 transition-all duration-200 shadow-sm"
                        aria-label="Agrandir la sidebar"
                        title="Agrandir"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </motion.button>
                </motion.div>
            )}

            <div className="mt-2 flex-shrink-0">
                <AnimatePresence mode="wait">
                    {!isMini && (
                        <motion.div 
                            key="nav-label"
                            className="mb-3 text-[10px] font-bold tracking-wider uppercase text-[var(--color-text-muted)] px-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            Navigation
                        </motion.div>
                    )}
                </AnimatePresence>
                <nav className="space-y-1.5" role="navigation" aria-label="Navigation principale">
                    {NAV_PRIMARY.map((it) => (
                        <NavItem 
                            key={it.id} 
                            active={it.id === page} 
                            icon={it.icon} 
                            label={it.label} 
                            onClick={() => setPage(it.id)} 
                            sidebarMode={sidebarMode} 
                        />
                    ))}
                </nav>
            </div>

            {/* Separator between sections (mini mode) */}
            {isMini && (
                <div className="my-4 border-t border-[var(--color-border-soft)] flex-shrink-0" />
            )}

            <div className={cx("flex-1 min-h-0 flex flex-col", isMini ? "" : "mt-8")}>
                <AnimatePresence mode="wait">
                    {!isMini && (
                        <motion.div 
                            key="courses-label"
                            className="flex items-center justify-between mb-3 px-3 flex-shrink-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-text-muted)]">Matières</div>
                            <span className="text-[10px] text-[var(--color-text-muted)] tabular-nums font-semibold">{courses.length}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="space-y-1.5 overflow-y-auto overflow-x-hidden flex-1 min-h-0" role="navigation" aria-label="Liste des cours">
                    {courses.map((c) => (
                        <CourseMiniRow key={c.key} c={c} active={c.key === activeCourseKey} onOpen={() => onOpenCourse(c.key)} sidebarMode={sidebarMode} />
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-6 flex-shrink-0">
                <div className="border-t border-[var(--color-border)] pt-4">
                    <button 
                        className={cx(
                            "w-full inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-surface-overlay)] text-sm font-semibold text-[var(--color-text-base)] hover:bg-[var(--color-surface-hover)] hover:scale-[1.02] transition-all duration-200 shadow-sm min-h-[44px]",
                            isMini ? "justify-center px-3 py-3" : "justify-center px-4 py-3"
                        )}
                        aria-label="Ouvrir les réglages"
                        title={isMini ? "Réglages" : undefined}
                    >
                        <Settings size={16} strokeWidth={2.5} className="text-[var(--color-text-muted)]" />
                        {!isMini && "Réglages"}
                    </button>
                </div>
            </div>
        </motion.div>
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
    const drawerRef = React.useRef<HTMLDivElement>(null);

    // Focus trap
    React.useEffect(() => {
        if (!open) return;

        const drawer = drawerRef.current;
        if (!drawer) return;

        // Focus first focusable element
        const focusableElements = drawer.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (firstElement) {
            firstElement.focus();
        }

        // Trap focus
        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        drawer.addEventListener('keydown', handleTab as any);
        return () => drawer.removeEventListener('keydown', handleTab as any);
    }, [open]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={drawerRef}
                        className="fixed left-0 top-0 bottom-0 z-50 w-[320px] max-w-[85vw] md:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu de navigation"
                    >
                        <div className="h-full bg-[var(--color-surface-raised)] p-3 shadow-2xl overflow-auto">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export function MobileBottomNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
    const [scrollingDown, setScrollingDown] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/95 backdrop-blur-xl md:hidden"
            initial={{ y: 0 }}
            animate={{ y: scrollingDown ? 100 : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
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
        </motion.div>
    );
}

export function DrawerHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-3">
                <BrandIcon />
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
