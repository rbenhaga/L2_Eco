/**
 * ChapterGrid Component
 * Grid display of course chapters with completion status
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
                <Link
                    key={chapter.id}
                    to={chapter.path}
                    className="group relative p-5 rounded-xl bg-white transition-all duration-200 hover:translate-y-[-1px] no-underline"
                    style={{ 
                        border: `1px solid var(--color-border-soft)`,
                        boxShadow: "var(--shadow-sm)"
                    }}
                >
                    <div className="relative flex items-start gap-4">
                        {/* Chapter Number Badge */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0" style={{ 
                            background: chapter.isCompleted ? `${themeColor}15` : 'var(--color-bg-overlay)',
                            color: chapter.isCompleted ? themeColor : 'var(--color-text-muted)'
                        }}>
                            {chapter.number}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            {/* Title + Badges */}
                            <div className="flex items-start gap-2 mb-2">
                                <h3 className="text-base font-semibold flex-1" style={{ color: "var(--color-text-primary)" }}>
                                    {chapter.title}
                                </h3>
                                {chapter.isNew && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide shrink-0" style={{ 
                                        background: `${themeColor}15`,
                                        color: themeColor
                                    }}>
                                        Nouveau
                                    </span>
                                )}
                            </div>
                            
                            {/* Description */}
                            <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                                {chapter.description}
                            </p>
                            
                            {/* Meta Info */}
                            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                {chapter.hasAudio && (
                                    <span className="inline-flex items-center gap-1">
                                        <Headphones className="h-3 w-3" />
                                        Audio
                                    </span>
                                )}
                                {chapter.estimatedTime && (
                                    <span className="inline-flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {chapter.estimatedTime}
                                    </span>
                                )}
                                {chapter.isCompleted && (
                                    <span className="inline-flex items-center gap-1 font-semibold" style={{ color: themeColor }}>
                                        <CheckCircle2 className="h-3 w-3" />
                                        Terminé
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Chevron */}
                        <ChevronRight className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "var(--color-border-strong)" }} />
                    </div>
                </Link>
            ))}
        </div>
    );
}
