import { Clock, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface ModuleStatsCardsProps {
    progress: number; // 0-100 (global progress)
    engagement: number; // percentage
    engagementTrend: number; // +/- percentage
    studyTime: string; // e.g. "12h40"
    targetTime: string; // e.g. "20h"
}

export function ModuleStatsCards({
    progress,
    engagement,
    engagementTrend,
    studyTime,
    targetTime,
}: ModuleStatsCardsProps) {
    const isTrendUp = engagementTrend >= 0;

    return (
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-6xl mx-auto">
            {/* Card 1: Global progress (percentage only) */}
            <div
                className="p-4 rounded-2xl border group transition-all duration-300 flex flex-col items-center justify-center text-center"
                style={{
                    background: 'var(--color-bg-raised)',
                    borderColor: 'var(--color-border-subtle)',
                    minHeight: '170px',
                }}
            >
                <div
                    className="text-5xl font-serif leading-none"
                    style={{
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {progress}%
                </div>
                <p
                    className="text-xs font-bold tracking-widest uppercase mt-4"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    Progression globale
                </p>
                <div className="h-1.5 w-full rounded-full overflow-hidden mt-4" style={{ background: 'var(--color-border-strong)' }}>
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                            background: 'var(--color-accent)',
                        }}
                    />
                </div>
            </div>

            {/* Card 2: Engagement */}
            <div
                className="p-4 rounded-2xl border group transition-all duration-300"
                style={{
                    background: 'var(--color-bg-raised)',
                    borderColor: 'var(--color-border-subtle)',
                }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        Engagement moyen
                    </span>
                    <InfoTooltip />
                </div>

                <div className="flex items-center gap-3">
                    <div
                        className="text-3xl font-serif"
                        style={{
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        {engagement}%
                    </div>
                    <div
                        className="flex flex-col -space-y-1"
                        style={{ color: isTrendUp ? 'var(--color-success)' : 'var(--color-error)' }}
                    >
                        {isTrendUp ? <TrendingUp className="h-5 w-5" strokeWidth={3} /> : <TrendingDown className="h-5 w-5" strokeWidth={3} />}
                        <span className="text-[10px] font-bold">
                            {isTrendUp ? '+' : ''}{engagementTrend}%
                        </span>
                    </div>
                </div>
                <p
                    className="text-xs mt-2 font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    Temps réel vs temps cible
                </p>
            </div>

            {/* Card 3: Study time */}
            <div
                className="p-4 rounded-2xl relative overflow-hidden group"
                style={{
                    background: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xl)',
                }}
            >
                <div className="relative z-10">
                    <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
                        Temps d'étude total
                    </div>
                    <div
                        className="text-3xl font-serif mb-1"
                        style={{
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--color-canvas)',
                        }}
                    >
                        {studyTime}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                        Objectif : {targetTime}
                    </p>
                </div>
                <div
                    className="absolute -bottom-4 -right-4 transform rotate-12 scale-150"
                    style={{ color: 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' }}
                >
                    <Clock className="w-24 h-24" strokeWidth={1} />
                </div>
            </div>
        </div>
    );
}

function InfoTooltip() {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-4 w-4"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Aide: engagement moyen"
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            >
                <Info className="h-3.5 w-3.5" />
            </button>

            {open && (
                <div
                    className="absolute left-0 top-6 z-20 w-64 p-3 rounded-lg text-xs leading-relaxed"
                    style={{
                        background: 'var(--color-bg-raised)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-lg)',
                    }}
                >
                    L'engagement mesure le rapport entre ton temps d'étude réel et le temps cible estimé sur la matière.
                    <br />
                    <strong style={{ color: 'var(--color-text-primary)' }}>100%</strong> signifie que tu es exactement sur le rythme cible.
                </div>
            )}
        </div>
    );
}
