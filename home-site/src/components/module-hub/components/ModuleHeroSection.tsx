import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getModuleTheme } from '../../../design-system/tokens';
import type { ModuleId } from '../types';

const TYPING_SPEED_MS = 62;

interface ModuleHeroSectionProps {
    title: string;
    description: string;
    chaptersCount: number;
    moduleId: ModuleId;
    hasIntroVideo?: boolean;
    startButtonLabel?: string;
    startButtonMeta?: string;
    overviewTitle?: string;
    overviewDescription?: string;
    progressSummary?: string;
    resumeLabel?: string;
    overviewStateLabel?: string;
    lockedItemsCount?: number;
    resourceCounts: {
        fiches: number;
        td: number;
        qcm: number;
        annales: number;
    };
    badgeLabel: string;
    onStartClick?: () => void;
    onStartHover?: () => void;
    onStartFocus?: () => void;
    onVideoClick?: () => void;
}

export function ModuleHeroSection({
    title,
    description,
    chaptersCount,
    moduleId,
    hasIntroVideo = false,
    startButtonLabel = 'Commencer',
    startButtonMeta,
    overviewTitle,
    overviewDescription,
    progressSummary,
    resumeLabel,
    overviewStateLabel = 'Apercu',
    lockedItemsCount = 0,
    resourceCounts,
    badgeLabel,
    onStartClick,
    onStartHover,
    onStartFocus,
    onVideoClick,
}: ModuleHeroSectionProps) {
    const theme = getModuleTheme(moduleId);
    const [typedCount, setTypedCount] = useState(0);
    const availableResourceCount =
        resourceCounts.fiches + resourceCounts.td + resourceCounts.qcm + resourceCounts.annales;
    const overviewItems = [
        { label: chaptersCount > 1 ? 'chapitres' : 'chapitre', value: chaptersCount },
        {
            label: availableResourceCount > 1 ? 'ressources disponibles' : 'ressource disponible',
            value: availableResourceCount,
        },
        ...(lockedItemsCount > 0
            ? [
                  {
                      label: lockedItemsCount > 1 ? 'contenus premium' : 'contenu premium',
                      value: lockedItemsCount,
                  },
              ]
            : []),
    ];

    useEffect(() => {
        setTypedCount(0);
        const timer = window.setInterval(() => {
            setTypedCount((prev) => {
                if (prev >= title.length) {
                    window.clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, TYPING_SPEED_MS);

        return () => window.clearInterval(timer);
    }, [title]);

    return (
        <section className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-8">
            <div className="max-w-2xl">
                <div
                    className="flex w-fit items-center rounded-full px-3 py-1.5"
                    style={{
                        background: theme.subtle,
                        color: theme.color,
                    }}
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                        {badgeLabel}
                    </span>
                </div>

                <h1 className="module-hero-title">
                    {title.slice(0, typedCount).split('').map((char, index) => (
                        <span
                            key={`${char}-${index}`}
                            className={`module-hero-letter ${index === typedCount - 1 && typedCount < title.length ? 'is-fresh' : ''}`}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>

                <p
                    className="mt-4 max-w-2xl text-base sm:text-lg"
                    style={{
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.65,
                    }}
                >
                    {description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <motion.button
                        type="button"
                        onClick={onStartClick}
                        onMouseEnter={onStartHover}
                        onFocus={onStartFocus}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)',
                            boxShadow: 'none',
                        }}
                    >
                        <span>{startButtonLabel}</span>
                        {startButtonMeta && (
                            <span className="hidden items-center gap-2 text-[12px] font-medium text-white/80 sm:inline-flex">
                                <span aria-hidden="true">·</span>
                                {startButtonMeta}
                            </span>
                        )}
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>

                    {hasIntroVideo && onVideoClick && (
                        <motion.button
                            type="button"
                            onClick={onVideoClick}
                            className="inline-flex min-h-12 items-center gap-2 rounded-xl border px-5 text-sm font-semibold"
                            style={{
                                borderColor: 'var(--color-border-default)',
                                color: 'var(--color-text-primary)',
                                background: 'var(--color-bg-raised)',
                            }}
                        >
                            <PlayCircle className="h-4 w-4" />
                            Voir le cours en video
                        </motion.button>
                    )}
                </div>
            </div>

            <aside
                className="relative rounded-[28px] border p-5 sm:p-6"
                style={{
                    borderColor: 'var(--color-border-default)',
                    background: 'var(--color-bg-raised)',
                    boxShadow: 'none',
                }}
            >
                <div className="relative">
                    <div className="flex items-center justify-between gap-2">
                        <p
                            className="min-w-0 shrink text-[11px] font-bold uppercase sm:text-[11px]"
                            style={{
                                color: 'var(--color-text-secondary)',
                                letterSpacing: '0.18em',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Vue d'ensemble
                        </p>

                        {lockedItemsCount > 0 && (
                            <div
                                className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-[11px]"
                                style={{
                                    background: 'var(--color-bg-overlay)',
                                    color: 'var(--color-text-secondary)',
                                    border: '1px solid var(--color-border-subtle)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <Lock className="h-3 w-3 shrink-0" />
                                Premium · {lockedItemsCount} contenus en plus
                            </div>
                        )}
                    </div>

                    <div
                        className="mt-3.5 rounded-2xl border px-4 py-3"
                        style={{
                            borderColor: 'var(--color-border-subtle)',
                            background: 'var(--color-bg-raised)',
                        }}
                    >
                        <div
                            className="overflow-x-auto"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="inline-flex min-w-max items-center gap-2 whitespace-nowrap text-[11px] sm:text-sm">
                                {overviewItems.map((item, index) => (
                                    <div key={item.label} className="inline-flex items-center gap-1.5">
                                        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {item.value}
                                        </span>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>
                                            {item.label}
                                        </span>
                                        {index < overviewItems.length - 1 && (
                                            <span aria-hidden="true" style={{ color: 'var(--color-text-muted)' }}>
                                                ·
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-2.5">
                        <div
                            className="rounded-2xl border px-4 py-3"
                            style={{
                                borderColor: 'var(--color-border-subtle)',
                                background: 'var(--color-bg-raised)',
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.color }} />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>
                                        {overviewStateLabel}
                                    </p>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {overviewTitle ?? `${chaptersCount} chapitres`}
                                    </p>
                                    <p className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                        {overviewDescription ?? 'Toutes les ressources du module restent accessibles librement.'}
                                    </p>
                                    {progressSummary && (
                                        <p className="mt-1 text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                            {progressSummary}
                                        </p>
                                    )}
                                    {resumeLabel && (
                                        <p className="mt-1 text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                            {resumeLabel}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </section>
    );
}
