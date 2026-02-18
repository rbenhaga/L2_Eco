/**
 * ContentItem - Premium Redesign
 * Design: Airy Atelier (light) / Neon Scholar (dark)
 * Features:
 * - Animated number badge with gradient
 * - Smooth hover with accent glow
 * - Status indicators with animations
 * - Theme-aware colors throughout
 */

import { CheckCircle2, Flame, Headphones, Clock, ArrowRight, Video } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

type Status = 'done' | 'inprogress' | 'todo';

interface ContentItemProps {
    number: string;
    title: string;
    metaRight?: string;
    hasAudio?: boolean;
    hasVideo?: boolean;
    status?: Status;
    accentColor: string;
    onClick?: () => void;
}

export function ContentItem({
    number,
    title,
    metaRight,
    hasAudio = false,
    hasVideo = false,
    status = 'todo',
    accentColor,
    onClick,
}: ContentItemProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const statusConfig = {
        done: {
            icon: <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--color-success)' }} />,
            badgeBg: isDark ? 'var(--color-success)' : 'var(--color-success)',
            badgeText: 'var(--color-accent-foreground)',
        },
        inprogress: {
            icon: <Flame className="h-4 w-4 animate-pulse" style={{ color: 'var(--color-warning)' }} />,
            badgeBg: isDark ? 'var(--color-surface-hover)' : 'var(--color-panel)',
            badgeText: accentColor,
        },
        todo: {
            icon: null,
            badgeBg: isDark ? 'var(--color-surface-hover)' : 'var(--color-panel)',
            badgeText: 'var(--color-text-muted)',
        },
    };

    const config = statusConfig[status];

    return (
        <button
            onClick={onClick}
            className="group w-full flex items-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 text-left relative overflow-hidden"
            style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isDark
                    ? `0 8px 24px color-mix(in srgb, var(--color-text-primary) 40%, transparent), 0 0 0 1px color-mix(in srgb, ${accentColor} 30%, transparent)`
                    : 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${accentColor} ${isDark ? '40' : '30'}%, transparent)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
            }}
        >
            {/* Subtle glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 0% 50%, color-mix(in srgb, ${accentColor} ${isDark ? '15' : '8'}%, transparent) 0%, transparent 50%)`,
                }}
            />

            <div className="relative flex items-center gap-4 min-w-0 flex-1">
                {/* Number badge */}
                <div className="relative flex-shrink-0">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 group-hover:scale-105"
                        style={{
                            background: status === 'done'
                                ? `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 70%, var(--color-text-primary)) 100%)`
                                : config.badgeBg,
                            color: status === 'done' ? 'var(--color-accent-foreground)' : config.badgeText,
                            boxShadow: status === 'done'
                                ? `0 4px 12px color-mix(in srgb, ${accentColor} 40%, transparent)`
                                : 'none',
                        }}
                    >
                        {status === 'done' ? (
                            <CheckCircle2 className="h-5 w-5" />
                        ) : (
                            number
                        )}
                    </div>

                    {/* Status icon overlay (for in-progress) */}
                    {status === 'inprogress' && (
                        <div
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
                            style={{
                                background: 'var(--color-card)',
                                boxShadow: 'var(--shadow-sm)',
                            }}
                        >
                            {config.icon}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        {/* Accent dot */}
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                            style={{ background: accentColor }}
                        />
                        <p
                            className="truncate text-base font-semibold transition-colors"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            {title}
                        </p>
                    </div>

                    {/* Meta row */}
                    <div
                        className="mt-1.5 flex items-center gap-3 text-xs font-medium"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {hasAudio && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                                style={{
                                    background: isDark ? 'var(--color-surface-hover)' : 'var(--color-panel)',
                                }}
                            >
                                <Headphones className="h-3 w-3" />
                                <span className="hidden sm:inline">Audio</span>
                            </span>
                        )}
                        {hasVideo && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                                style={{
                                    background: isDark ? 'var(--color-surface-hover)' : 'var(--color-panel)',
                                }}
                            >
                                <Video className="h-3 w-3" />
                                <span className="hidden sm:inline">Vidéo</span>
                            </span>
                        )}
                        {metaRight && (
                            <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{metaRight}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Arrow with animated container */}
            <div
                className="flex-shrink-0 h-9 w-9 rounded-lg grid place-items-center transition-all duration-300 group-hover:translate-x-1"
                style={{
                    background: isDark ? 'var(--color-surface-hover)' : 'transparent',
                }}
            >
                <ArrowRight
                    className="h-5 w-5"
                    style={{ color: 'var(--color-text-muted)' }}
                />
            </div>
        </button>
    );
}
