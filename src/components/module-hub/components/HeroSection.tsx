/**
 * HeroSection Component - MODERN & BEAUTIFUL
 * Inspired by: Stripe, Linear, Vercel
 * Clean, asymmetric, premium design
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, X, Bell, TrendingUp } from 'lucide-react';
import type { ModuleStats, RecentUpdate } from '../types';

interface HeroSectionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    stats: ModuleStats;
    theme: {
        color: string;
        light: string;
        subtle: string;
    };
    recentUpdate?: RecentUpdate;
    introVideoUrl?: string;
    introVideoWatched: boolean;
    onMarkVideoWatched: () => void;
    completionPercentage: number;
}

export function HeroSection({
    title,
    description,
    icon,
    stats,
    theme,
    recentUpdate,
    introVideoUrl,
    introVideoWatched,
    onMarkVideoWatched,
    completionPercentage
}: HeroSectionProps) {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            {/* Modern Hero - Asymmetric Layout */}
            <section className="relative overflow-hidden" style={{ background: 'var(--color-bg-base)' }}>
                {/* Subtle gradient overlay - top right */}
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.15] blur-3xl pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${theme.color} 0%, transparent 70%)`
                    }}
                />

                <div className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    {/* Notification Button - Floating top right */}
                    {recentUpdate && (
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={() => setShowNotification(!showNotification)}
                                className="relative p-3 rounded-2xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '2px solid var(--color-border-default)',
                                    boxShadow: 'var(--shadow-lg)',
                                    '--tw-ring-color': theme.color
                                } as React.CSSProperties}
                            >
                                <Bell className="h-5 w-5" style={{ color: theme.color }} />
                                <span className="absolute top-0 right-0 w-3 h-3 rounded-full" style={{ background: theme.color }} />
                            </button>
                        </div>
                    )}

                    {/* Main Grid - Asymmetric 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

                        {/* Left Column - Content */}
                        <div>
                            {/* Icon Badge */}
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
                                style={{
                                    background: theme.light,
                                    boxShadow: `0 8px 24px ${theme.color}20`
                                }}
                            >
                                <span className="text-4xl">{icon}</span>
                            </div>

                            {/* Title */}
                            <h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
                                style={{
                                    color: 'var(--color-text-primary)',
                                    lineHeight: '1.1'
                                }}
                            >
                                {title}
                            </h1>

                            {/* Description */}
                            <p
                                className="text-lg sm:text-xl mb-8 max-w-xl"
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {description}
                            </p>

                            {/* Quick Stats Row */}
                            <div className="flex items-center gap-6 mb-8">
                                <div>
                                    <div className="text-3xl font-black mb-1" style={{ color: theme.color }}>
                                        {stats.totalChapters}
                                    </div>
                                    <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                        Chapitres
                                    </div>
                                </div>
                                <div className="w-px h-12" style={{ background: 'var(--color-border-default)' }} />
                                <div>
                                    <div className="text-3xl font-black mb-1" style={{ color: theme.color }}>
                                        {stats.completedCourses}
                                    </div>
                                    <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                        Complétés
                                    </div>
                                </div>
                                <div className="w-px h-12" style={{ background: 'var(--color-border-default)' }} />
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <TrendingUp className="h-5 w-5" style={{ color: theme.color }} />
                                        <span className="text-3xl font-black" style={{ color: theme.color }}>
                                            {completionPercentage}%
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                        Progression
                                    </div>
                                </div>
                            </div>

                            {/* Video CTA */}
                            {introVideoUrl && (
                                <button
                                    onClick={onMarkVideoWatched}
                                    className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                    style={{
                                        background: introVideoWatched ? `${theme.color}20` : theme.color,
                                        color: introVideoWatched ? theme.color : 'var(--color-accent-foreground)',
                                        border: introVideoWatched ? `2px solid ${theme.color}` : 'none',
                                        boxShadow: `0 8px 24px ${theme.color}40`,
                                        '--tw-ring-color': theme.color
                                    } as React.CSSProperties}
                                >
                                    <PlayCircle className="h-6 w-6" strokeWidth={2.5} />
                                    <div className="text-left">
                                        <div className="text-base font-black">
                                            {introVideoWatched ? 'Vidéo vue' : 'Vidéo d\'introduction'}
                                        </div>
                                        <div className="text-sm opacity-90">5 min · Vue d'ensemble</div>
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Right Column - Visual Progress Card */}
                        <div className="lg:pl-12">
                            <div
                                className="relative p-8 rounded-3xl"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '2px solid var(--color-border-default)',
                                    boxShadow: 'var(--shadow-xl)'
                                }}
                            >
                                {/* Accent border top */}
                                <div
                                    className="absolute top-0 left-8 right-8 h-1 rounded-full"
                                    style={{ background: theme.color }}
                                />

                                {/* Title */}
                                <div className="text-sm font-black uppercase tracking-wider mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                    Votre progression
                                </div>

                                {/* Large Circular Progress */}
                                <div className="flex items-center justify-center mb-8">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full transform -rotate-90">
                                            {/* Background circle */}
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="88"
                                                fill="none"
                                                stroke="var(--color-border-default)"
                                                strokeWidth="8"
                                            />
                                            {/* Progress circle */}
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="88"
                                                fill="none"
                                                stroke={theme.color}
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={`${(completionPercentage / 100) * 553} 553`}
                                                style={{
                                                    transition: 'stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="text-6xl font-black mb-2" style={{ color: theme.color }}>
                                                {completionPercentage}%
                                            </div>
                                            <div className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>
                                                complété
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-3 rounded-full overflow-hidden mb-4" style={{ background: 'var(--color-bg-overlay)' }}>
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${completionPercentage}%`,
                                            background: `linear-gradient(90deg, ${theme.color} 0%, ${theme.color}CC 100%)`
                                        }}
                                    />
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-xl" style={{ background: theme.light }}>
                                        <div className="text-2xl font-black mb-1" style={{ color: theme.color }}>
                                            {stats.completedCourses}
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                            Terminés
                                        </div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl" style={{ background: theme.light }}>
                                        <div className="text-2xl font-black mb-1" style={{ color: theme.color }}>
                                            {stats.totalChapters - stats.completedCourses}
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                            Restants
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notification Modal */}
            {showNotification && recentUpdate && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        style={{ background: 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)' }}
                        onClick={() => setShowNotification(false)}
                    />

                    <div
                        className="relative max-w-md w-full rounded-2xl p-6"
                        style={{
                            background: 'var(--color-bg-raised)',
                            boxShadow: '0 24px 64px color-mix(in srgb, var(--color-text-primary) 30%, transparent)'
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: theme.light }}
                            >
                                <Bell className="h-6 w-6" style={{ color: theme.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.color }}>
                                    Nouveau
                                </div>
                                {recentUpdate.path ? (
                                    <Link
                                        to={recentUpdate.path}
                                        className="text-base font-bold no-underline hover:underline"
                                        style={{ color: "var(--color-text-primary)" }}
                                        onClick={() => setShowNotification(false)}
                                    >
                                        {recentUpdate.text}
                                    </Link>
                                ) : (
                                    <p className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>
                                        {recentUpdate.text}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => setShowNotification(false)}
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: "var(--color-text-muted)" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
