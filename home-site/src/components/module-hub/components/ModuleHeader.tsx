/**
 * ModuleHeader - Premium Redesign
 * Design: Airy Atelier (light) / Neon Scholar (dark)
 * Features:
 * - Large icon with theme-aware glow
 * - Outfit display typography
 * - Glassmorphic stats pills
 * - Subtle animated accent bar
 */

import { Clock, Flame, LucideIcon, BookOpen } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface ModuleHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    accentColor: string;
    chaptersCount: number;
    totalDuration: string;
    inProgressCount: number;
}

export function ModuleHeader({
    title,
    description,
    icon: Icon,
    accentColor,
    chaptersCount,
    totalDuration,
    inProgressCount,
}: ModuleHeaderProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Theme-aware gradient for icon background
    const iconBg = isDark
        ? `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 70%, var(--color-text-primary)) 100%)`
        : `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 80%, var(--color-bg-raised)) 100%)`;

    // Theme-aware glow
    const iconGlow = isDark
        ? `0 8px 32px color-mix(in srgb, ${accentColor} 50%, transparent), 0 0 60px color-mix(in srgb, ${accentColor} 25%, transparent)`
        : `0 8px 24px color-mix(in srgb, ${accentColor} 30%, transparent)`;

    return (
        <div
            className="relative rounded-3xl overflow-hidden"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, var(--color-card) 0%, color-mix(in srgb, var(--color-card) 95%, var(--color-canvas)) 100%)'
                    : 'var(--color-card)',
                boxShadow: isDark
                    ? `0 4px 24px color-mix(in srgb, var(--color-text-primary) 40%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent)`
                    : 'var(--shadow-lg)',
                border: isDark ? '1px solid var(--color-border-subtle)' : 'none',
            }}
        >
            {/* Accent bar at top */}
            <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                    background: `linear-gradient(90deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 60%, transparent) 100%)`,
                }}
            />

            {/* Subtle glow orb in background (dark mode only) */}
            {isDark && (
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 blur-3xl opacity-20 pointer-events-none"
                    style={{ background: accentColor }}
                />
            )}

            <div className="relative p-6 sm:p-8">
                <div className="flex items-start gap-5 sm:gap-6">
                    {/* Icon with glow */}
                    <div
                        className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl grid place-items-center flex-shrink-0 transition-transform duration-300 hover:scale-105"
                        style={{
                            background: iconBg,
                            boxShadow: iconGlow,
                        }}
                    >
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} style={{ color: 'var(--color-accent-foreground)' }} />

                        {/* Shine effect */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-30"
                            style={{
                                background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-bg-raised) 40%, transparent) 0%, transparent 50%)',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        {/* Title - Uses Outfit display font */}
                        <h1
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--color-text-primary)',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {title}
                        </h1>

                        {/* Description */}
                        <p
                            className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed max-w-xl"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {description}
                        </p>

                        {/* Stats Pills - Modern glassmorphic style */}
                        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                            {/* Chapters count */}
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                                style={{
                                    background: isDark
                                        ? `color-mix(in srgb, ${accentColor} 15%, transparent)`
                                        : `color-mix(in srgb, ${accentColor} 10%, white)`,
                                    border: `1px solid color-mix(in srgb, ${accentColor} ${isDark ? '30' : '20'}%, transparent)`,
                                    color: accentColor,
                                }}
                            >
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>{chaptersCount} chapitres</span>
                            </div>

                            {/* Duration */}
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                                style={{
                                    background: isDark
                                        ? 'var(--color-surface-hover)'
                                        : 'var(--color-panel)',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                <Clock className="h-3.5 w-3.5" />
                                <span>{totalDuration}</span>
                            </div>

                            {/* In progress indicator */}
                            {inProgressCount > 0 && (
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                                    style={{
                                        background: isDark
                                            ? 'color-mix(in srgb, var(--color-warning) 15%, transparent)'
                                            : 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                                        border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)',
                                        color: 'var(--color-warning)',
                                    }}
                                >
                                    <Flame className="h-3.5 w-3.5" />
                                    <span>{inProgressCount} en cours</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
