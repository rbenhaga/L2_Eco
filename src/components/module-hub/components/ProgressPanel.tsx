/**
 * ProgressPanel - Premium Redesign
 * Design: Airy Atelier (light) / Neon Scholar (dark)
 * Features:
 * - Larger, more prominent progress ring with gradient
 * - Glassmorphic stats cards
 * - Animated progress with glow in dark mode
 * - Outfit typography for numbers
 */

import { TrendingUp, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface ProgressPanelProps {
    completionPercentage: number;
    completedCount: number;
    todoCount: number;
    totalDuration: string;
    streakDays: number;
}

export function ProgressPanel({
    completionPercentage,
    completedCount,
    todoCount,
    totalDuration,
}: ProgressPanelProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

    return (
        <div
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, var(--color-card) 0%, color-mix(in srgb, var(--color-card) 90%, var(--color-accent)) 100%)'
                    : 'var(--color-card)',
                boxShadow: isDark
                    ? '0 8px 32px color-mix(in srgb, var(--color-text-primary) 40%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent)'
                    : 'var(--shadow-lg)',
                border: isDark ? '1px solid var(--color-border-subtle)' : 'none',
            }}
        >
            {/* Background glow in dark mode */}
            {isDark && (
                <div
                    className="absolute -bottom-20 -right-20 w-48 h-48 blur-3xl opacity-30 pointer-events-none"
                    style={{ background: 'var(--color-accent)' }}
                />
            )}

            {/* Header */}
            <div className="relative flex items-center justify-between mb-8">
                <p
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    Progression
                </p>
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                        background: isDark
                            ? 'var(--color-success-subtle)'
                            : 'var(--color-success-subtle)',
                        color: 'var(--color-success)',
                        border: isDark ? '1px solid color-mix(in srgb, var(--color-success) 20%, transparent)' : 'none',
                    }}
                >
                    <TrendingUp className="h-3 w-3" />
                    En cours
                </div>
            </div>

            {/* Circular Progress - Larger with gradient stroke */}
            <div className="relative flex justify-center mb-8">
                <div className="relative">
                    {/* Glow behind ring in dark mode */}
                    {isDark && completionPercentage > 0 && (
                        <div
                            className="absolute inset-0 blur-xl opacity-50"
                            style={{
                                background: `conic-gradient(var(--color-accent) ${completionPercentage * 3.6}deg, transparent 0deg)`,
                                borderRadius: '50%',
                            }}
                        />
                    )}

                    <svg className="transform -rotate-90 relative" width="140" height="140">
                        {/* Background track */}
                        <circle
                            cx="70"
                            cy="70"
                            r={radius}
                            stroke={isDark ? 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)' : 'var(--color-panel)'}
                            strokeWidth="10"
                            fill="none"
                        />
                        {/* Progress arc with gradient */}
                        <circle
                            cx="70"
                            cy="70"
                            r={radius}
                            stroke="url(#progressGradient)"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--color-accent)" />
                                <stop offset="100%" stopColor="var(--color-accent-strong, var(--color-accent))" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p
                            className="text-4xl font-bold"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            {completionPercentage}%
                        </p>
                        <p
                            className="text-xs mt-1"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            complété
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Glassmorphic cards */}
            <div className="relative grid grid-cols-3 gap-3">
                {/* Completed */}
                <div
                    className="text-center p-3 rounded-xl"
                    style={{
                        background: isDark ? 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' : 'var(--color-panel)',
                    }}
                >
                    <div className="flex justify-center mb-2">
                        <div
                            className="h-8 w-8 rounded-lg grid place-items-center"
                            style={{
                                background: isDark ? 'color-mix(in srgb, var(--color-success) 20%, transparent)' : 'var(--color-success-subtle)',
                            }}
                        >
                            <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--color-success)' }} />
                        </div>
                    </div>
                    <p
                        className="text-xl font-bold"
                        style={{
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-display)',
                        }}
                    >
                        {completedCount}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        Terminés
                    </p>
                </div>

                {/* Remaining */}
                <div
                    className="text-center p-3 rounded-xl"
                    style={{
                        background: isDark ? 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' : 'var(--color-panel)',
                    }}
                >
                    <div className="flex justify-center mb-2">
                        <div
                            className="h-8 w-8 rounded-lg grid place-items-center"
                            style={{
                                background: isDark ? 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)' : 'var(--color-panel)',
                            }}
                        >
                            <Circle className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                    </div>
                    <p
                        className="text-xl font-bold"
                        style={{
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-display)',
                        }}
                    >
                        {todoCount}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        Restants
                    </p>
                </div>

                {/* Duration */}
                <div
                    className="text-center p-3 rounded-xl"
                    style={{
                        background: isDark ? 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' : 'var(--color-panel)',
                    }}
                >
                    <div className="flex justify-center mb-2">
                        <div
                            className="h-8 w-8 rounded-lg grid place-items-center"
                            style={{
                                background: isDark ? 'color-mix(in srgb, var(--color-accent) 20%, transparent)' : 'var(--color-accent-subtle)',
                            }}
                        >
                            <Clock className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                        </div>
                    </div>
                    <p
                        className="text-xl font-bold"
                        style={{
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-display)',
                        }}
                    >
                        {totalDuration}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        Durée
                    </p>
                </div>
            </div>
        </div>
    );
}
