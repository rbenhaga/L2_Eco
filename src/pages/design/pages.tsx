/**
 * Agora Premium - Pages (Dashboard, Library, Course)
 * Enhanced with Framer Motion animations
 */

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Lock } from "lucide-react";
import { cx, COURSE_META, TYPE_ICON, RESOURCE_ICON, isNewLabel, ICON_SIZES, ICON_STROKE } from "./helpers";
import { Chip, PremiumButton, Surface, IconPill, NewBadge } from "./primitives";
import { COURSES, UPDATES, COURSE_RESOURCES } from "./data";
import type { Course, UpdateItem, ResourceItem, ResourceType } from "./types";
import { staggerContainer, staggerItem } from "./animations";
import { INTERACTION_PRESETS } from "../../design-tokens";
import { shouldReduceAnimations } from "./performance";
import { usePerformanceMode } from "../../hooks/useReducedMotion";

// --- PremiumHeader ---
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
                <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-zinc-50">{title}</div>
                {subtitle && <div className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{subtitle}</div>}
            </div>
            {right}
        </div>
    );
}

// --- ContinueHero ---
function ContinueHero({ course, onContinue }: { course: Course; onContinue: () => void }) {
    const meta = COURSE_META[course.key];
    const Icon = meta.icon;
    const reduceAnimations = shouldReduceAnimations();

    return (
        <div className="relative group">
            {/* Ambient glow - disabled on low-end devices */}
            {!reduceAnimations && (
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
                    style={{
                        background: meta.gradient,
                        filter: "blur(32px)",
                    }}
                    aria-hidden="true"
                />
            )}

            <Surface hover className="p-4 sm:p-6 relative overflow-hidden">
                {/* Gradient overlay - disabled on low-end devices */}
                {!reduceAnimations && (
                    <div
                        className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity duration-700 blur-3xl pointer-events-none"
                        style={{ background: meta.gradient }}
                        aria-hidden="true"
                    />
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
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

                        <div className="mt-2 text-lg sm:text-2xl font-semibold text-slate-900 dark:text-zinc-50 truncate">
                            {course.nextUp}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
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
                    "p-4 sm:p-5 relative overflow-hidden",
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

                <div className="flex items-start gap-3 relative z-10">
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
                            <div className="min-w-0">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[15px] font-semibold truncate text-[color:var(--text-base)]">
                                            {c.title}
                                        </div>
                                        {isLocked && (
                                            <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-xs font-semibold border border-[color:var(--borderSoft)] bg-[color:var(--surfaceSoft)] text-[color:var(--text-muted)]">
                                                <Lock size={12} /> Premium
                                            </span>
                                        )}
                                    </div>
                                    {isLocked && (
                                        <div className="text-xs text-[color:var(--text-muted)] flex items-center gap-1">
                                            🔒 Accès Premium requis
                                        </div>
                                    )}
                                </div>
                                <div className="text-[13px] text-[color:var(--text-secondary)] truncate mt-1">
                                    {c.subtitle}
                                </div>
                            </div>
                            <div
                                className="text-sm font-semibold tabular-nums transition-colors duration-300"
                                style={{
                                    color: !isLocked && c.progress > 50 ? meta.color : "var(--color-text-base)",
                                }}
                            >
                                {c.progress}%
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-[13px] text-[color:var(--text-secondary)]">
                            <span className="truncate">À suivre: {c.nextUp}</span>
                            {c.unreadUpdates > 0 && (
                                <span className="shrink-0 inline-flex items-center rounded-xl border border-[color:var(--borderSoft)] bg-[color:var(--surfaceSoft)] px-2 py-0.5 text-xs font-semibold">
                                    {c.unreadUpdates} maj
                                </span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            {isLocked ? (
                                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--accentStrong)]">
                                    <Lock size={14} />
                                    Débloquer
                                    <ArrowRight size={14} />
                                </span>
                            ) : (
                                <>
                                    <span className="text-xs text-[color:var(--text-muted)]">Ouvrir</span>
                                    <motion.span
                                        className="inline-flex items-center gap-2 text-xs font-semibold"
                                        style={{ color: meta.color }}
                                        whileHover={{ x: 2, transition: { duration: 0.15 } }}
                                    >
                                        Aller
                                        <ArrowRight size={14} />
                                    </motion.span>
                                </>
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
                    <div className="text-sm font-semibold text-slate-900 dark:text-zinc-50">Mises à jour</div>
                    <div className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">Le seul endroit où tu vois les nouveautés.</div>
                </div>
                <PremiumButton variant="outline" size="sm">
                    Voir tout
                </PremiumButton>
            </div>

            <div className="mt-4 divide-y divide-(--border)">
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
                                it.locked ? "cursor-not-allowed opacity-60" : "hover:bg-(--surfaceSoft)"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 h-9 w-9 rounded-xl border border-(--borderSoft) bg-(--surfaceSoft) flex items-center justify-center">
                                    <TypeIcon size={16} className="text-slate-700 dark:text-zinc-200" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Chip subtle>{it.type}</Chip>
                                        <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                                            <span className="h-6 w-6 rounded-lg border border-(--borderSoft) bg-(--surfaceSoft) flex items-center justify-center">
                                                <CourseIcon size={14} className="text-slate-700 dark:text-zinc-200" />
                                            </span>
                                            {COURSE_META[it.courseKey].short}
                                        </span>
                                        {showNew && <NewBadge />}
                                        {it.locked && (
                                            <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-(--borderSoft) bg-(--surfaceSoft) text-slate-600 dark:text-zinc-200">
                                                <Lock size={12} /> Premium
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-zinc-50 truncate">{it.title}</div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-zinc-400 truncate">{it.meta}</div>
                                </div>

                                <ChevronRight size={18} className="text-slate-400 mt-2 shrink-0 dark:text-zinc-400 group-hover:text-slate-500" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </Surface>
    );
}

// --- ResourceList ---
function ResourceList({ items }: { items: ResourceItem[] }) {
    return (
        <Surface className="p-4 sm:p-6">
            <div className="divide-y divide-(--border)">
                {items.map((it) => {
                    const Icon = RESOURCE_ICON[it.type];
                    return (
                        <button
                            key={it.id}
                            onClick={it.locked ? undefined : () => { }}
                            disabled={it.locked}
                            aria-disabled={it.locked}
                            tabIndex={it.locked ? -1 : 0}
                            className={cx(
                                "w-full text-left py-3 px-2 -mx-2 rounded-xl transition duration-200 ease-out",
                                it.locked ? "cursor-not-allowed opacity-60" : "hover:bg-(--surfaceSoft)"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 h-9 w-9 rounded-xl border border-(--borderSoft) bg-(--surfaceSoft) flex items-center justify-center">
                                    <Icon size={16} className="text-slate-700 dark:text-zinc-200" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="text-sm font-medium text-slate-900 dark:text-zinc-50 truncate">{it.title}</div>
                                        {it.locked && (
                                            <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-(--borderSoft) bg-(--surfaceSoft) text-slate-600 dark:text-zinc-200">
                                                <Lock size={12} /> Premium
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-zinc-400 truncate">{it.meta}</div>
                                </div>
                                <ChevronRight size={18} className="text-slate-400 mt-2 shrink-0 dark:text-zinc-400" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </Surface>
    );
}

// --- DashboardPage ---
export function DashboardPage({ onOpenCourse }: { onOpenCourse: () => void }) {
    const continueCourse = COURSES[0];
    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div variants={staggerItem}>
                <PremiumHeader title="Bonjour, Rayane" subtitle="2 nouveautés aujourd'hui • Reprends Macro : 12 min" />
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
export function LibraryPage({ onOpenCourse }: { onOpenCourse: () => void }) {
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
                        <div className="text-sm font-semibold text-slate-900 dark:text-zinc-50">Matières</div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400">Choisis une matière, puis navigue dans ses ressources.</div>
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
                                className="group rounded-2xl border border-(--border) bg-(--surfaceSoft) hover:bg-(--surfaceHover) transition duration-200 ease-out p-4 text-left active:scale-[0.99]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl border border-(--borderSoft) bg-(--surfaceSoft) flex items-center justify-center">
                                        <Icon size={18} className="text-slate-700 dark:text-zinc-200" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm font-semibold truncate text-slate-900 dark:text-zinc-50">{c.title}</div>
                                            {c.locked && (
                                                <span className="inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-semibold border border-(--borderSoft) bg-(--surfaceSoft) text-slate-600 dark:text-zinc-200">
                                                    <Lock size={12} /> Premium
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate dark:text-zinc-400">{c.subtitle}</div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-400 dark:text-zinc-400 group-hover:text-slate-500" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </Surface>
        </div>
    );
}

// --- CoursePage ---
export function CoursePage({ course }: { course: Course }) {
    const Icon = COURSE_META[course.key].icon;
    const items = COURSE_RESOURCES[course.key];

    const TABS: ResourceType[] = ["Cours", "TD", "QCM", "Annales", "Fiches"];
    const [tab, setTab] = useState<ResourceType>("Cours");

    const filtered = useMemo(() => items.filter((it) => it.type === tab), [items, tab]);

    return (
        <div className="space-y-5">
            <div className="pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="h-7 w-7 rounded-xl border border-(--borderSoft) bg-(--surfaceSoft) flex items-center justify-center">
                        <Icon size={14} className="text-slate-700 dark:text-zinc-200" />
                    </span>
                    {course.title}
                    <span className="opacity-60">·</span>
                    <span className="truncate">{course.subtitle}</span>
                    <span className="opacity-60">·</span>
                    <span className="tabular-nums">{course.progress}%</span>
                </div>

                <div className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-zinc-50">{course.nextUp}</div>
                <div className="mt-2 max-w-[72ch] text-sm text-slate-500 dark:text-zinc-400">
                    Une seule catégorie affichée à la fois via des onglets (switch). "Nouveau" reste dans le Dashboard.
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl border border-(--border) bg-(--surface) p-1 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.22)]">
                    {TABS.map((t) => {
                        const active = t === tab;
                        const count = items.filter((x) => x.type === t).length;
                        return (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={cx(
                                    "relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 ease-out",
                                    "border border-transparent", // always present to avoid layout shift
                                    active
                                        ? "bg-(--surfaceHover) text-slate-900 border-(--border) dark:text-zinc-50"
                                        : "text-slate-600 hover:bg-(--surfaceSoft) dark:text-zinc-300"
                                )}
                            >
                                {t}
                                <span
                                    className={cx(
                                        "text-[11px] tabular-nums rounded-xl px-2 py-0.5 border",
                                        active
                                            ? "bg-(--surfaceSoft) border-(--borderSoft) text-slate-700 dark:text-zinc-200"
                                            : "bg-(--surfaceSoft) border-(--borderSoft) text-slate-600 dark:text-zinc-300"
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
                <ResourceList items={filtered} />
            ) : (
                <Surface className="p-6">
                    <div className="text-sm font-semibold text-slate-900 dark:text-zinc-50">Aucun contenu</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Il n'y a rien dans "{tab}" pour le moment.</div>
                </Surface>
            )}

            <div className="text-xs text-slate-500 dark:text-zinc-400">Les mises à jour restent dans le Dashboard (badge "Nouveau").</div>
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
