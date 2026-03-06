/**
 * ContinueCard - Premium Redesign
 * Design: Airy Atelier (light) / Neon Scholar (dark)
 * Features:
 * - Gradient accent background with glow
 * - Animated play button with pulse
 * - Progress ring visualization
 * - Glassmorphic secondary card
 */

import { Play, ArrowRight, Video, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface ContinueCardProps {
    chapterNumber: string;
    chapterTitle: string;
    lastSession?: string;
    progress: number;
    accentColor: string;
    onIntroVideoClick?: () => void;
}

export function ContinueCard({
    chapterNumber,
    chapterTitle,
    lastSession,
    progress,
    accentColor,
    onIntroVideoClick,
}: ContinueCardProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const isStarting = progress === 0;

    // Progress ring calculations
    const circumference = 2 * Math.PI * 18; // radius 18
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="space-y-3">
            {/* PRIMARY CTA - Continuer/Commencer */}
            <button
                className="group relative w-full rounded-2xl overflow-hidden text-left transition-all duration-300"
                style={{
                    background: isDark
                        ? `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 20%, var(--color-card)) 0%, color-mix(in srgb, ${accentColor} 10%, var(--color-card)) 100%)`
                        : `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 8%, white) 0%, color-mix(in srgb, ${accentColor} 4%, white) 100%)`,
                    border: isDark
                        ? `1px solid color-mix(in srgb, ${accentColor} 30%, transparent)`
                        : `1px solid color-mix(in srgb, ${accentColor} 15%, transparent)`,
                    boxShadow: isDark
                        ? `0 4px 20px color-mix(in srgb, ${accentColor} 20%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent)`
                        : 'var(--shadow-md)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = isDark
                        ? `0 8px 32px color-mix(in srgb, ${accentColor} 35%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 8%, transparent)`
                        : `0 8px 24px color-mix(in srgb, ${accentColor} 25%, transparent)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = isDark
                        ? `0 4px 20px color-mix(in srgb, ${accentColor} 20%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent)`
                        : 'var(--shadow-md)';
                }}
            >
                {/* Background glow on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 30% 50%, color-mix(in srgb, ${accentColor} ${isDark ? '25' : '15'}%, transparent) 0%, transparent 70%)`,
                    }}
                />

                <div className="relative p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* Play button with optional progress ring */}
                            <div className="relative shrink-0">
                                <div
                                    className="h-14 w-14 rounded-xl grid place-items-center transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 80%, var(--color-text-primary)) 100%)`,
                                        boxShadow: isDark
                                            ? `0 4px 16px color-mix(in srgb, ${accentColor} 50%, transparent)`
                                            : `0 4px 12px color-mix(in srgb, ${accentColor} 35%, transparent)`,
                                    }}
                                >
                                    <Play className="h-6 w-6 ml-0.5" style={{ color: 'var(--color-accent-foreground)' }} fill="currentColor" />
                                </div>

                                {/* Progress ring (when progress > 0) */}
                                {progress > 0 && (
                                    <svg
                                        className="absolute -inset-1 -rotate-90"
                                        width="64"
                                        height="64"
                                        viewBox="0 0 44 44"
                                    >
                                        <circle
                                            cx="22"
                                            cy="22"
                                            r="18"
                                            fill="none"
                                            stroke={isDark ? 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)' : 'color-mix(in srgb, var(--color-text-primary) 8%, transparent)'}
                                            strokeWidth="3"
                                        />
                                        <circle
                                            cx="22"
                                            cy="22"
                                            r="18"
                                            fill="none"
                                            stroke="var(--color-accent-foreground)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            className="transition-all duration-500"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{ color: accentColor }}
                                    >
                                        {isStarting ? 'Commencer' : 'Reprendre'}
                                    </span>
                                    {isStarting && (
                                        <Sparkles
                                            className="h-3 w-3 animate-pulse"
                                            style={{ color: accentColor }}
                                        />
                                    )}
                                </div>
                                <p
                                    className="text-base sm:text-lg font-semibold truncate"
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        fontFamily: 'var(--font-display)',
                                    }}
                                >
                                    {chapterNumber} · {chapterTitle}
                                </p>
                                {lastSession && (
                                    <p
                                        className="mt-1 text-sm hidden sm:block"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        {lastSession}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right side - Progress + Arrow */}
                        <div className="flex items-center gap-4 shrink-0">
                            {progress > 0 && (
                                <div className="hidden md:flex flex-col items-end">
                                    <span
                                        className="text-xl font-bold"
                                        style={{
                                            color: accentColor,
                                            fontFamily: 'var(--font-display)',
                                        }}
                                    >
                                        {progress}%
                                    </span>
                                    <span
                                        className="text-xs"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        terminé
                                    </span>
                                </div>
                            )}
                            <div
                                className="h-10 w-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:translate-x-1"
                                style={{
                                    background: isDark
                                        ? 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)'
                                        : `color-mix(in srgb, ${accentColor} 15%, white)`,
                                }}
                            >
                                <ArrowRight
                                    className="h-5 w-5"
                                    style={{ color: accentColor }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </button>

            {/* SECONDARY - Vidéo d'introduction */}
            {onIntroVideoClick && (
                <button
                    onClick={onIntroVideoClick}
                    className="group w-full rounded-xl text-left transition-all duration-200 flex items-center justify-between gap-3"
                    style={{
                        background: 'var(--color-card)',
                        padding: '1rem',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        e.currentTarget.style.borderColor = accentColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        e.currentTarget.style.borderColor = 'var(--color-border-default)';
                    }}
                >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                            className="h-10 w-10 rounded-xl grid place-items-center shrink-0"
                            style={{
                                background: isDark
                                    ? 'var(--color-surface-hover)'
                                    : 'var(--color-panel)',
                            }}
                        >
                            <Video className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p
                                className="text-sm font-medium"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                Vidéo d'introduction
                            </p>
                            <p
                                className="text-xs mt-0.5"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                5 min · Présentation de la matière
                            </p>
                        </div>
                    </div>
                    <ArrowRight
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: 'var(--color-text-muted)' }}
                    />
                </button>
            )}
        </div>
    );
}
