/**
 * Agora Premium - Pages (Dashboard, Library, Course)
 * Enhanced with Framer Motion animations
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, Lock } from "lucide-react";
import { cx, COURSE_META, TYPE_ICON, RESOURCE_ICON, isNewLabel, ICON_SIZES, ICON_STROKE } from "./helpers";
import { Chip, PremiumButton, Surface, IconPill, NewBadge } from "./primitives";
import { COURSES, UPDATES, COURSE_RESOURCES } from "./data";
import type { Course, UpdateItem, ResourceItem, ResourceType } from "./types";
import { staggerContainer, staggerItem } from "./animations";
import { INTERACTION_PRESETS } from "../../design-tokens";
import { usePerformanceMode } from "../../hooks/useReducedMotion";
function PremiumHeader({
    title,
    subtitle,
    right,
}: {
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-base)]">{title}</div>
                {subtitle && <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</div>}
            </div>
            {right}
        </div>
    );
}

// --- ContinueHero ---
function ContinueHero({ course, onContinue }: { course: Course; onContinue: () => void }) {
    const meta = COURSE_META[course.key];
    const Icon = meta.icon;

    return (
        <div className="relative group">
            <Surface hover className="p-4 sm:p-6 relative overflow-hidden">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <Chip subtle>Reprendre</Chip>
                            <span className="inline-flex items-center gap-2">
                                <IconPill>
                                    <Icon
                                        size={ICON_SIZES.sm}
                                        strokeWidth={ICON_STROKE.regular}
                                        style={{ color: meta.color }}
                                    />
                                </IconPill>
                                <span className="font-medium" style={{ color: meta.color }}>
                                    {course.title}
                                </span>
                            </span>
                        </div>

                        <div className="mt-2 text-lg sm:text-2xl font-semibold text-[var(--color-text-base)] truncate">
                            {course.nextUp}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                            <span>{course.estMin} min</span>
                            <span className="opacity-60">·</span>
                            <span>Progression {course.progress}%</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <PremiumButton variant="secondary">Changer</PremiumButton>
                        <PremiumButton variant="primary" right={<ChevronRight size={16} />} onClick={onContinue}>
                            Continuer
                        </PremiumButton>
                    </div>
                </div>
            </Surface>
        </div>
    );
}

// --- CourseCard ---
function CourseCard({ c, onOpen }: { c: Course; onOpen: () => void }) {
    const meta = COURSE_META[c.key];
    const Icon = meta.icon;
    const isLocked = c.locked;
    const { shouldReduceMotion } = usePerformanceMode();

    return (
        <motion.button
            onClick={isLocked ? undefined : onOpen}
            disabled={isLocked}
            aria-disabled={isLocked}
            tabIndex={isLocked ? -1 : 0}
            className={cx(
                "group w-full text-left relative",
                "rounded-2xl will-change-transform",
                isLocked ? "cursor-not-allowed opacity-60" : ""
            )}
            whileHover={isLocked || shouldReduceMotion ? undefined : INTERACTION_PRESETS.cardHover}
            whileTap={isLocked || shouldReduceMotion ? undefined : INTERACTION_PRESETS.buttonTap}
        >
            {/* Glow effect on hover */}
            {!isLocked && !shouldReduceMotion && (
                <motion.div
                    className="absolute inset-0 rounded-2xl -z-10"
                    style={{
                        background: meta.gradient,
                        filter: "blur(24px)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                />
            )}

            <Surface
                className={cx(
                    "p-4 sm:p-5 relative overflow-hidden h-full flex flex-col",
                    !isLocked && "group-hover:border-[var(--color-accent)]/20"
                )}
            >
                {/* Subtle gradient overlay */}
                {!shouldReduceMotion && (
                    <motion.div
                        className="absolute top-0 right-0 w-32 h-32 blur-2xl pointer-events-none"
                        style={{ background: meta.gradient }}
                        initial={{ opacity: 0 }}
                        whileHover={INTERACTION_PRESETS.glowFade}
                        aria-hidden="true"
                    />
                )}

                <div className="flex items-start gap-3 relative z-10 flex-1">
                    <motion.div
                        className="mt-0.5 h-10 w-10 rounded-2xl border flex items-center justify-center shadow-[var(--shadow-xs)]"
                        style={{
                            borderColor: isLocked ? "var(--color-border-soft)" : meta.color,
                            background: isLocked
                                ? "var(--color-surface-soft)"
                                : `linear-gradient(135deg, ${meta.colorLight}, transparent)`,
                        }}
                        whileHover={isLocked || shouldReduceMotion ? undefined : INTERACTION_PRESETS.iconBounce}
                    >
                        <Icon
                            size={ICON_SIZES.md}
                            strokeWidth={ICON_STROKE.regular}
                            style={{ color: isLocked ? "var(--color-text-secondary)" : meta.color }}
                        />
                    </motion.div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-col gap-1 min-h-[44px]">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[15px] font-semibold truncate text-[color:var(--text-base)]">
                                            {c.title}
                                        </div>
                                        {isLocked && (
                                            <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-xs font-semibold border border-[color:var(--borderSoft)] bg-[color:var(--surfaceSoft)] text-[color:var(--text-muted)]">
                                                <Lock size={12} /> Premium
                                            </span>
                                        )}
                                        {!isLocked && c.unreadUpdates > 0 && (
                                            <span 
                                                className="inline-flex h-1.5 w-1.5 rounded-full shrink-0"
                                                style={{ backgroundColor: meta.color }}
                                                title={`${c.unreadUpdates} mise(s) à jour`}
                                            />
                                        )}
                                    </div>
                                    <div className="text-[13px] text-[color:var(--text-secondary)] truncate">
                                        {c.subtitle}
                                    </div>
                                    {/* Progress bar */}
                                    {!isLocked && (
                                        <div className="mt-1 h-1 w-full bg-[var(--color-surface-soft)] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: meta.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${c.progress}%` }}
                                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className="text-sm font-semibold tabular-nums shrink-0"
                                style={{ color: meta.color }}
                            >
                                {c.progress}%
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-[13px] text-[color:var(--text-secondary)] truncate">
                                À suivre: {c.nextUp}
                            </span>
                            {isLocked ? (
                                <motion.span
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold shrink-0"
                                    style={{ color: meta.color }}
                                    whileHover={{ x: 2, transition: { duration: 0.15 } }}
                                >
                                    <Lock size={14} />
                                    Débloquer
                                </motion.span>
                            ) : (
                                <motion.span
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold shrink-0"
                                    style={{ color: meta.color }}
                                    whileHover={{ x: 2, transition: { duration: 0.15 } }}
                                >
                                    Ouvrir
                                    <ArrowRight size={14} />
                                </motion.span>
                            )}
                        </div>
                    </div>
                </div>
            </Surface>
        </motion.button>
    );
}

// --- UpdatesFeed ---
function UpdatesFeed({ items }: { items: UpdateItem[] }) {
    return (
        <Surface className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-text-base)]">Mises à jour</div>
                    <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">Le seul endroit où tu vois les nouveautés.</div>
                </div>
                <PremiumButton variant="outline" size="sm">
                    Voir tout
                </PremiumButton>
            </div>

            <div className="mt-4 divide-y divide-[var(--color-border)]">
                {items.map((it) => {
                    const CourseIcon = COURSE_META[it.courseKey].icon;
                    const TypeIcon = TYPE_ICON[it.type];
                    const showNew = isNewLabel(it.meta);
                    return (
                        <button
                            key={it.id}
                            onClick={it.locked ? undefined : () => { }}
                            disabled={it.locked}
                            aria-disabled={it.locked}
                            tabIndex={it.locked ? -1 : 0}
                            className={cx(
                                "group w-full text-left py-3 px-2 -mx-2 rounded-xl transition duration-200 ease-out",
                                it.locked ? "cursor-not-allowed opacity-60" : "hover:bg-[var(--color-surface-soft)]"
                            )}
                        >
                            <div className="flex items-start gap-3 relative z-10">
                    <div className="mt-0.5 h-9 w-9 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-center">
                        <TypeIcon size={16} className="text-[var(--color-text-base)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <Chip subtle>{it.type}</Chip>
                            <span className="inline-flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                                <span className="h-6 w-6 rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-center">
                                    <CourseIcon size={14} className="text-[var(--color-text-base)]" />
                                </span>
                                {COURSE_META[it.courseKey].short}
                            </span>
                            {showNew && <NewBadge />}
                            {it.locked && (
                                <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)]">
                                    <Lock size={12} /> Premium
                                </span>
                            )}
                        </div>

                        <div className="mt-2 text-sm font-medium text-[var(--color-text-base)] truncate">{it.title}</div>
                        <div className="mt-1 text-xs text-[var(--color-text-secondary)] truncate">{it.meta}</div>
                    </div>

                    <ChevronRight size={18} className="text-[var(--color-text-muted)] mt-2 shrink-0 group-hover:text-[var(--color-text-secondary)]" />
                </div>
                        </button>
                    );
                })}
            </div>
        </Surface>
    );
}

// --- ResourceList ---
function ResourceList({ items, onOpenContent }: { items: ResourceItem[]; onOpenContent?: () => void }) {
    return (
        <Surface className="p-4 sm:p-6">
            <div className="divide-y divide-[var(--color-border)]">
                {items.map((it) => {
                    const Icon = RESOURCE_ICON[it.type];
                    return (
                        <button
                            key={it.id}
                            onClick={it.locked ? undefined : onOpenContent}
                            disabled={it.locked}
                            aria-disabled={it.locked}
                            tabIndex={it.locked ? -1 : 0}
                            className={cx(
                                "w-full text-left py-3 px-2 -mx-2 rounded-xl transition duration-200 ease-out",
                                it.locked ? "cursor-not-allowed opacity-60" : "hover:bg-[var(--color-surface-soft)]"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 h-9 w-9 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-center">
                                    <Icon size={16} className="text-[var(--color-text-base)]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="text-sm font-medium text-[var(--color-text-base)] truncate">{it.title}</div>
                                        {it.locked && (
                                            <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)]">
                                                <Lock size={12} /> Premium
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1 text-xs text-[var(--color-text-secondary)] truncate">{it.meta}</div>
                                </div>
                                <ChevronRight size={18} className="text-[var(--color-text-muted)] mt-2 shrink-0" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </Surface>
    );
}

// --- DashboardPage ---
export function DashboardPage({ 
    onOpenCourse,
}: { 
    onOpenCourse: () => void;
}) {
    const continueCourse = COURSES[0];
    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div variants={staggerItem}>
                <PremiumHeader 
                    title="Bonjour, Rayane" 
                    subtitle="2 nouveautés aujourd'hui • Reprends Macro : 12 min"
                />
            </motion.div>

            <motion.div variants={staggerItem}>
                <ContinueHero course={continueCourse} onContinue={onOpenCourse} />
            </motion.div>

            <motion.div className="grid gap-4" variants={staggerItem}>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="text-[15px] font-semibold text-[color:var(--text-base)]">Mes cours</div>
                        <div className="text-[13px] text-[color:var(--text-secondary)]">Affordances claires pour les contenus premium.</div>
                    </div>
                    <PremiumButton variant="outline" size="sm">
                        Tout voir
                    </PremiumButton>
                </div>

                <motion.div
                    className="grid gap-3 sm:grid-cols-2"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {COURSES.map((c, idx) => (
                        <motion.div key={c.key} variants={staggerItem} custom={idx}>
                            <CourseCard c={c} onOpen={() => onOpenCourse()} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div variants={staggerItem}>
                <UpdatesFeed items={UPDATES.slice(0, 5)} />
            </motion.div>
        </motion.div>
    );
}

// --- LibraryPage ---
export function LibraryPage({ 
    onOpenCourse,
}: { 
    onOpenCourse: () => void;
}) {
    return (
        <div className="space-y-6">
            <PremiumHeader
                title="Bibliothèque"
                subtitle="Tous les contenus au même endroit — sans modes de sélection lourds."
                right={<PremiumButton variant="primary">Ajouter / Importer</PremiumButton>}
            />

            <Surface className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-semibold text-[var(--color-text-base)]">Matières</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Choisis une matière, puis navigue dans ses ressources.</div>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {COURSES.map((c) => {
                        const Icon = COURSE_META[c.key].icon;
                        return (
                            <button
                                key={c.key}
                                onClick={() => {
                                    if (c.locked) return;
                                    onOpenCourse();
                                }}
                                className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:bg-[var(--color-surface-hover)] transition duration-200 ease-out p-4 text-left active:scale-[0.99]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-center">
                                        <Icon size={18} className="text-[var(--color-text-base)]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm font-semibold truncate text-[var(--color-text-base)]">{c.title}</div>
                                            {c.locked && (
                                                <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)]">
                                                    <Lock size={12} /> Premium
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-[var(--color-text-secondary)] truncate">{c.subtitle}</div>
                                    </div>
                                    <ChevronRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </Surface>
        </div>
    );
}

// --- CoursePage (Subject/Matière page - NOT reading page) ---
export function CoursePage({ 
    course,
    onOpenContent,
}: { 
    course: Course;
    onOpenContent: () => void;
}) {
    const Icon = COURSE_META[course.key].icon;
    const items = COURSE_RESOURCES[course.key];

    const TABS: ResourceType[] = ["Cours", "TD", "QCM", "Annales", "Fiches"];
    const [tab, setTab] = useState<ResourceType>("Cours");

    const filtered = useMemo(() => items.filter((it) => it.type === tab), [items, tab]);

    return (
        <div className="space-y-5">
            <div className="pt-1">
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <span className="h-7 w-7 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-center">
                        <Icon size={14} className="text-[var(--color-text-base)]" />
                    </span>
                    {course.title}
                    <span className="opacity-60">·</span>
                    <span className="truncate">{course.subtitle}</span>
                    <span className="opacity-60">·</span>
                    <span className="tabular-nums">{course.progress}%</span>
                </div>

                <div className="mt-2 text-2xl sm:text-3xl font-semibold text-[var(--color-text-base)]">
                    {course.nextUp}
                </div>
                <div className="mt-2 max-w-[72ch] text-sm text-[var(--color-text-secondary)]">
                    Page de navigation pour accéder aux ressources du cours. Le mode Paper Canvas sera disponible quand tu ouvriras un contenu spécifique.
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-1 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.22)]">
                    {TABS.map((t) => {
                        const active = t === tab;
                        const count = items.filter((x) => x.type === t).length;
                        return (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={cx(
                                    "relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 ease-out",
                                    "border border-transparent",
                                    active
                                        ? "bg-[var(--color-surface-hover)] text-[var(--color-text-base)] border-[var(--color-border)]"
                                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)]"
                                )}
                            >
                                {t}
                                <span
                                    className={cx(
                                        "text-[11px] tabular-nums rounded-xl px-2 py-0.5 border",
                                        active
                                            ? "bg-[var(--color-surface-soft)] border-[var(--color-border-soft)] text-[var(--color-text-base)]"
                                            : "bg-[var(--color-surface-soft)] border-[var(--color-border-soft)] text-[var(--color-text-secondary)]"
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <Chip subtle>Progression {course.progress}%</Chip>
            </div>

            {filtered.length > 0 ? (
                <ResourceList items={filtered} onOpenContent={onOpenContent} />
            ) : (
                <Surface className="p-6">
                    <div className="text-sm font-semibold text-[var(--color-text-base)]">Aucun contenu</div>
                    <div className="mt-1 text-sm text-[var(--color-text-secondary)]">Il n'y a rien dans "{tab}" pour le moment.</div>
                </Surface>
            )}
        </div>
    );
}

// --- ActivityPage ---
export function ActivityPage() {
    return (
        <div className="space-y-6">
            <PremiumHeader
                title="Activité"
                subtitle="Ton historique d'apprentissage et tes statistiques de progression."
            />

            <Surface className="p-6">
                <div className="text-center py-12">
                    <div className="text-sm font-semibold text-[var(--color-text-base)]">Page Activité</div>
                    <div className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                        Cette page affichera ton historique d'apprentissage, tes statistiques de progression et tes objectifs.
                    </div>
                </div>
            </Surface>
        </div>
    );
}

// --- ReadingPage (Course Content with Paper Canvas) ---
export function ReadingPage({
    course,
    readingMode,
    onToggleReading,
    onBack,
}: {
    course: Course;
    readingMode: "dark" | "paper";
    onToggleReading: () => void;
    onBack: () => void;
}) {
    const Icon = COURSE_META[course.key].icon;
    const isPaper = readingMode === "paper";
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll in the parent container (throttled for performance)
    React.useEffect(() => {
        const scrollContainer = document.getElementById('reading-scroll-container');
        if (!scrollContainer) return;

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(scrollContainer.scrollTop > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className="space-y-6 max-w-[72ch] mx-auto"
            style={{
                color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
            }}
        >
            {/* Paper Canvas toggle - Sticky top right */}
            <div className="sticky top-6 z-20 flex justify-end -mb-12 pointer-events-none">
                <motion.button
                    onClick={onToggleReading}
                    className="pointer-events-auto flex items-center justify-center rounded-full text-sm font-semibold border backdrop-blur-md will-change-transform overflow-hidden"
                    style={{
                        background: isPaper ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)",
                        borderColor: isPaper ? "var(--paper-border)" : "rgba(255,255,255,0.15)",
                        color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                        boxShadow: isPaper ? "var(--shadow-md)" : "var(--shadow-sm)",
                        height: "40px",
                        minWidth: "40px",
                    }}
                    animate={{
                        paddingLeft: isScrolled ? "0px" : "16px",
                        paddingRight: isScrolled ? "0px" : "16px",
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="flex items-center shrink-0">
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="shrink-0"
                            style={{ display: "block" }}
                        >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                    </div>
                    <motion.div
                        animate={{
                            width: isScrolled ? 0 : "auto",
                            marginLeft: isScrolled ? 0 : 8,
                            opacity: isScrolled ? 0 : 1,
                        }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="whitespace-nowrap overflow-hidden"
                    >
                        {isPaper ? "Mode sombre" : "Feuille blanche"}
                    </motion.div>
                </motion.button>
            </div>

            {/* Back button */}
            <div>
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{
                        color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)",
                    }}
                >
                    <ChevronRight size={16} className="rotate-180" />
                    Retour au cours
                </button>
            </div>

            {/* Course header */}
            <div className="pt-1">
                <div className="flex items-center gap-2 text-xs" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                    <span 
                        className="h-7 w-7 rounded-xl border flex items-center justify-center"
                        style={{
                            borderColor: isPaper ? "var(--paper-border)" : "var(--color-border-soft)",
                            background: isPaper ? "rgba(0,0,0,0.02)" : "var(--color-surface-soft)",
                        }}
                    >
                        <Icon size={14} style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }} />
                    </span>
                    {course.title}
                    <span className="opacity-60">·</span>
                    <span className="truncate">Chapitre 5 · Modèle AS-AD</span>
                </div>

                <div className="mt-3 text-2xl sm:text-3xl font-semibold" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                    Politique Économique & Phillips
                </div>
                <div className="mt-2 text-sm leading-relaxed" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                    Les instruments de stabilisation, la dynamique de la dette et la courbe de Phillips.
                </div>
            </div>

            {/* Course content - Simplified version inspired by Chapter4.tsx */}
            <div className="space-y-8 text-[15px] leading-[1.85]">
                {/* Section 1 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div 
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold"
                            style={{
                                background: isPaper ? "rgba(0,0,0,0.04)" : "var(--color-surface-soft)",
                                color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                            }}
                        >
                            01
                        </div>
                        <h2 className="text-xl font-semibold" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Les deux leviers de politique économique
                        </h2>
                    </div>

                    <p className="mb-4" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                        Les autorités disposent de deux grands leviers pour influencer l'activité économique. Leur coordination (le "policy mix") est essentielle pour atteindre les objectifs macroéconomiques.
                    </p>

                    <div 
                        className="rounded-xl p-4 border"
                        style={{
                            background: isPaper ? "rgba(0,0,0,0.02)" : "var(--color-surface-soft)",
                            borderColor: isPaper ? "var(--paper-border)" : "var(--color-border-soft)",
                        }}
                    >
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3">
                                <div className="font-semibold w-24" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>Budgétaire</div>
                                <div className="flex-1" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                                    Gouvernement · G (dépenses), T (taxes) · Effet direct sur la demande (IS)
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="font-semibold w-24" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>Monétaire</div>
                                <div className="flex-1" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                                    Banque centrale · M (masse monétaire), i (taux) · Effet indirect via le taux d'intérêt (LM)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="mt-4 rounded-xl p-4 border-l-2"
                        style={{
                            background: isPaper ? "rgba(59, 130, 246, 0.04)" : "rgba(59, 130, 246, 0.08)",
                            borderColor: "#3B82F6",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#3B82F6" }}>
                            Le policy mix optimal
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Pour atteindre deux objectifs (plein emploi + stabilité des prix), il faut coordonner les deux instruments. 
                            Exemple : <strong>Relance sans inflation</strong> → G↑ + M↑ (les deux expansionnistes).
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div 
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold"
                            style={{
                                background: isPaper ? "rgba(0,0,0,0.04)" : "var(--color-surface-soft)",
                                color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                            }}
                        >
                            02
                        </div>
                        <h2 className="text-xl font-semibold" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Dynamique de la dette publique
                        </h2>
                    </div>

                    <p className="mb-4" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                        La politique budgétaire est contrainte par la soutenabilité de la dette. Comprendre la dynamique de la dette est essentiel pour évaluer les marges de manœuvre budgétaires.
                    </p>

                    <div 
                        className="rounded-xl p-4 border"
                        style={{
                            background: isPaper ? "rgba(139, 92, 246, 0.04)" : "rgba(139, 92, 246, 0.08)",
                            borderColor: isPaper ? "var(--paper-border)" : "rgba(139, 92, 246, 0.2)",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#8B5CF6" }}>
                            Évolution de la dette
                        </div>
                        <div className="font-mono text-base text-center py-2" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            B<sub>t</sub> = (1+r<sub>t</sub>)B<sub>t-1</sub> + (G<sub>t</sub> - T<sub>t</sub>)
                        </div>
                    </div>

                    <p className="mt-4" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                        où (G<sub>t</sub> - T<sub>t</sub>) est le <strong>déficit primaire</strong> (hors intérêts) et r<sub>t</sub>B<sub>t-1</sub> est la charge d'intérêts.
                    </p>

                    <div 
                        className="mt-4 rounded-xl p-4 border-l-2"
                        style={{
                            background: isPaper ? "rgba(239, 68, 68, 0.04)" : "rgba(239, 68, 68, 0.08)",
                            borderColor: "#EF4444",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#EF4444" }}>
                            Critères de Maastricht
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Les critères de convergence européens fixent : <strong>Déficit public</strong> maximum 3% du PIB · 
                            <strong>Dette publique</strong> maximum 60% du PIB. En 2024, la France a une dette d'environ 110% du PIB.
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div 
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold"
                            style={{
                                background: isPaper ? "rgba(0,0,0,0.04)" : "var(--color-surface-soft)",
                                color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                            }}
                        >
                            03
                        </div>
                        <h2 className="text-xl font-semibold" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            La Courbe de Phillips
                        </h2>
                    </div>

                    <p className="mb-4" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                        La courbe de Phillips est l'une des relations les plus importantes en macroéconomie. Elle établit une relation entre <strong>inflation</strong> et <strong>chômage</strong>.
                    </p>

                    <div 
                        className="rounded-xl p-4 border"
                        style={{
                            background: isPaper ? "rgba(16, 185, 129, 0.04)" : "rgba(16, 185, 129, 0.08)",
                            borderColor: isPaper ? "var(--paper-border)" : "rgba(16, 185, 129, 0.2)",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#10B981" }}>
                            Courbe de Phillips augmentée
                        </div>
                        <div className="font-mono text-base text-center py-2" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            π<sub>t</sub> = π<sup>e</sup><sub>t</sub> + (m + z) - αu<sub>t</sub>
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>π<sub>t</sub> = taux d'inflation effectif à la période t</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>π<sup>e</sup><sub>t</sub> = taux d'inflation anticipé par les agents</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>(m + z) = facteurs structurels (marge + pouvoir de négociation)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>α = sensibilité de l'inflation au chômage</span>
                        </li>
                    </ul>

                    <div 
                        className="mt-4 rounded-xl p-4 border-l-2"
                        style={{
                            background: isPaper ? "rgba(59, 130, 246, 0.04)" : "rgba(59, 130, 246, 0.08)",
                            borderColor: "#3B82F6",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#3B82F6" }}>
                            Lien avec WS-PS
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Le taux de chômage naturel de la courbe de Phillips est le même que celui du modèle WS-PS. 
                            Les deux modèles décrivent le même équilibre de moyen terme, mais sous des angles différents.
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div 
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold"
                            style={{
                                background: isPaper ? "rgba(0,0,0,0.04)" : "var(--color-surface-soft)",
                                color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                            }}
                        >
                            04
                        </div>
                        <h2 className="text-xl font-semibold" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            La spirale prix-salaires
                        </h2>
                    </div>

                    <p className="mb-4" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                        La spirale prix-salaires est le mécanisme central qui explique pourquoi l'inflation peut s'auto-entretenir et s'accélérer. 
                        C'est un cercle vicieux qui se déclenche quand le chômage est maintenu en dessous de son niveau naturel.
                    </p>

                    <div 
                        className="rounded-xl p-4 border"
                        style={{
                            background: isPaper ? "rgba(0,0,0,0.02)" : "var(--color-surface-soft)",
                            borderColor: isPaper ? "var(--paper-border)" : "var(--color-border-soft)",
                        }}
                    >
                        <div className="text-sm space-y-2" style={{ color: isPaper ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>1.</span>
                                <span>Chômage bas (u &lt; u<sub>n</sub>) → demande de travail excède l'offre</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>2.</span>
                                <span>Salaires nominaux ↑ → fort pouvoir de négociation</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>3.</span>
                                <span>Coûts de production ↑ → salaires = principal coût</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>4.</span>
                                <span>Prix ↑ → répercussion sur prix de vente</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>5.</span>
                                <span>Anticipations d'inflation ↑ → cycle recommence</span>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="mt-4 rounded-xl p-4 border-l-2"
                        style={{
                            background: isPaper ? "rgba(239, 68, 68, 0.04)" : "rgba(239, 68, 68, 0.08)",
                            borderColor: "#EF4444",
                        }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#EF4444" }}>
                            Conclusion fondamentale
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: isPaper ? "var(--paper-text)" : "var(--color-text-base)" }}>
                            Avec anticipations adaptatives, maintenir le chômage en dessous du taux naturel génère une inflation qui s'accélère indéfiniment. 
                            Il n'y a pas d'arbitrage durable entre inflation et chômage.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
