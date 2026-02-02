/**
 * HeroSection Component
 * Module hub hero with title, description, video button, and progress card
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, PlayCircle, X } from 'lucide-react';
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
    onMarkVideoWatched
}: HeroSectionProps) {
    const [showBanner, setShowBanner] = useState(true);

    return (
        <section className="relative px-6 lg:px-10 pt-8 pb-10">
            <div className="mx-auto max-w-5xl">
                {/* Notification Banner */}
                {recentUpdate && showBanner && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 bg-white transition-all duration-200" style={{ 
                        border: `1px solid var(--color-border-soft)`,
                        boxShadow: "var(--shadow-sm)"
                    }}>
                        <span className="px-2 py-1 rounded-lg text-xs font-semibold shrink-0" style={{
                            background: theme.light,
                            color: theme.color
                        }}>
                            Nouveau
                        </span>
                        {recentUpdate.path ? (
                            <Link to={recentUpdate.path} className="flex-1 truncate no-underline hover:underline font-medium" style={{ color: "var(--color-text-primary)" }}>
                                {recentUpdate.text}
                            </Link>
                        ) : (
                            <span className="flex-1 truncate font-medium" style={{ color: "var(--color-text-primary)" }}>{recentUpdate.text}</span>
                        )}
                        <button onClick={() => setShowBanner(false)} className="p-1 rounded-lg transition-colors shrink-0" style={{ color: "var(--color-text-muted)" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-overlay)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
                
                {/* Hero Content */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: Main Info + Actions */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ 
                                background: theme.light,
                                color: theme.color
                            }}>
                                <span className="text-xl">{icon}</span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-semibold tracking-[-0.01em] mb-2" style={{ color: "var(--color-text-primary)" }}>
                                    {title}
                                </h1>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                                    {description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Video Button */}
                            {introVideoUrl && (
                                <button
                                    onClick={onMarkVideoWatched}
                                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white transition-all group"
                                    style={{ 
                                        border: `1px solid var(--color-border-default)`,
                                        boxShadow: "var(--shadow-sm)"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-border-strong)";
                                        e.currentTarget.style.boxShadow = "var(--shadow-md)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-border-default)";
                                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                                    }}
                                >
                                    <div 
                                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
                                        style={{ background: theme.light }}
                                    >
                                        <PlayCircle className="h-5 w-5" style={{ color: theme.color }} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Vidéo d'introduction</div>
                                        <div className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>5:00 min · Commencer</div>
                                    </div>
                                    {introVideoWatched && (
                                        <CheckCircle2 className="h-4 w-4 ml-1" style={{ color: theme.color }} />
                                    )}
                                </button>
                            )}
                            
                            {/* Mobile Stats */}
                            <div className="lg:hidden flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-sm" style={{ border: `1px solid var(--color-border-default)` }}>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" style={{ color: "var(--color-text-muted)" }} />
                                    <span style={{ color: "var(--color-text-secondary)" }}>{stats.totalChapters} chapitres</span>
                                </div>
                                <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-border-strong)" }} />
                                <span style={{ color: theme.color }} className="font-semibold">{stats.completedCourses} terminés</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Progress Card (Desktop) */}
                    <div className="hidden lg:block shrink-0 w-72">
                        <div className="p-6 rounded-2xl bg-white transition-all duration-300 hover:translate-y-[-2px]" style={{ 
                            border: `1px solid ${theme.subtle}`,
                            boxShadow: "var(--shadow-md)"
                        }}>
                            {/* Progress Circle */}
                            <div className="flex items-center gap-5 mb-6">
                                <div className="relative w-20 h-20 shrink-0">
                                    <svg className="w-20 h-20 -rotate-90">
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="34"
                                            fill="none"
                                            stroke="var(--color-bg-overlay)"
                                            strokeWidth="6"
                                        />
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="34"
                                            fill="none"
                                            stroke={theme.color}
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 34}`}
                                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - stats.overallProgress / 100)}`}
                                            className="transition-all duration-700"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>{stats.overallProgress}%</span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-text-muted)" }}>Progression</div>
                                    <div className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>{stats.completedCourses}/{stats.totalChapters}</div>
                                    <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>chapitres</div>
                                </div>
                            </div>
                            
                            {/* Stats Details */}
                            <div className="pt-5 border-t space-y-3" style={{ borderColor: "var(--color-border-default)" }}>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Total</span>
                                    <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{stats.totalChapters}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Terminés</span>
                                    <span className="text-sm font-bold" style={{ color: theme.color }}>{stats.completedCourses}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Restants</span>
                                    <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{stats.totalChapters - stats.completedCourses}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
