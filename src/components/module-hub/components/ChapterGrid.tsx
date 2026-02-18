/**
 * ChapterGrid Component - SCANNABLE CARDS
 * Clear hierarchy: number + title + meta + action
 * Strong hover/focus states
 * First chapter slightly emphasized
 */

import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Headphones, ChevronRight } from 'lucide-react';
import type { ModuleChapter } from '../types';

interface ChapterGridProps {
    chapters: ModuleChapter[];
    themeColor: string;
}

export function ChapterGrid({ chapters, themeColor }: ChapterGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3">
            {chapters.map((chapter, idx) => {
                const isFirst = idx === 0 && !chapter.isCompleted;

                return (
                    <Link
                        key={chapter.id}
                        to={chapter.path}
                        className="group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200 no-underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2"
                        style={{
                            background: "var(--color-card)",
                            border: isFirst ? `2px solid ${themeColor}` : `2px solid var(--color-border-default)`,
                            boxShadow: isFirst ? `0 4px 16px ${themeColor}20` : "var(--shadow-sm)",
                            '--tw-ring-color': themeColor
                        } as React.CSSProperties}
                    >
                        {/* Left Accent Bar for first chapter */}
                        {isFirst && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: themeColor }} />
                        )}

                        {/* Chapter Number Badge */}
                        <div className="relative shrink-0">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black transition-all duration-200 group-hover:scale-105"
                                style={chapter.isCompleted ? {
                                    background: themeColor,
                                    color: 'var(--color-bg-raised)',
                                    boxShadow: `0 4px 12px ${themeColor}40`
                                } : {
                                    background: 'var(--color-bg-overlay)',
                                    color: 'var(--color-text-primary)',
                                    border: `2px solid var(--color-border-strong)`
                                }}
                            >
                                {chapter.number}
                            </div>
                            {chapter.isCompleted && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: themeColor, boxShadow: '0 2px 4px color-mix(in srgb, var(--color-text-primary) 20%, transparent)' }}>
                                    <CheckCircle2 className="h-3 w-3 text-[var(--color-bg-raised)]" strokeWidth={3} />
                                </div>
                            )}
                        </div>

                        {/* Center: Title + Meta */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-bold truncate" style={{ color: "var(--color-text-primary)" }}>
                                    {chapter.title}
                                </h3>
                                {chapter.isNew && (
                                    <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shrink-0" style={{
                                        background: themeColor,
                                        color: 'var(--color-bg-raised)'
                                    }}>
                                        Nouveau
                                    </span>
                                )}
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-2.5 text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                                {chapter.hasAudio && (
                                    <span className="inline-flex items-center gap-1">
                                        <Headphones className="h-3.5 w-3.5" />
                                        Audio
                                    </span>
                                )}
                                {chapter.estimatedTime && (
                                    <>
                                        {chapter.hasAudio && <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border-strong)' }} />}
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {chapter.estimatedTime}
                                        </span>
                                    </>
                                )}
                                {chapter.isCompleted && (
                                    <>
                                        <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border-strong)' }} />
                                        <span className="inline-flex items-center gap-1 font-bold" style={{ color: themeColor }}>
                                            Terminé
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right: Chevron */}
                        <ChevronRight
                            className="h-5 w-5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                            style={{ color: themeColor }}
                            strokeWidth={2.5}
                        />
                    </Link>
                );
            })}
        </div>
    );
}
