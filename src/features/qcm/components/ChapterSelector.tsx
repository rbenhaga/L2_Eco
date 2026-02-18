/**
 * ChapterSelector Component
 * Grid of chapter cards for selecting quiz content
 */

import { BookOpen, Play } from 'lucide-react';
import type { Chapter } from '../types';

interface ChapterSelectorProps {
    chapters: Chapter[];
    selectedChapterId?: string;
    onSelectChapter: (chapterId: string) => void;
    onStartAll?: () => void;
}

export function ChapterSelector({
    chapters,
    selectedChapterId,
    onSelectChapter,
    onStartAll,
}: ChapterSelectorProps) {
    const totalQuestions = chapters.reduce((sum, c) => sum + c.questions.length, 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* All Questions Option */}
            {onStartAll && (
                <button
                    onClick={onStartAll}
                    className="w-full p-6 sm:p-8 rounded-3xl border border-dashed transition-all group relative overflow-hidden"
                    style={{
                        borderColor: 'var(--color-border-default)',
                        background: 'color-mix(in srgb, var(--color-bg-raised) 40%, transparent)',
                    }}
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                style={{
                                    background: 'var(--color-bg-overlay)',
                                    color: 'var(--color-text-secondary)',
                                    boxShadow: 'var(--shadow-lg)',
                                }}
                            >
                                <Play size={24} fill="currentColor" />
                            </div>
                            <div className="text-left">
                                <h3
                                    className="text-xl font-bold transition-colors mb-1"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    Toutes les questions
                                </h3>
                                <p
                                    className="text-sm font-medium"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    {totalQuestions} questions - Mode melange
                                </p>
                            </div>
                        </div>
                        <div
                            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                            style={{
                                borderColor: 'var(--color-border-default)',
                                color: 'var(--color-text-muted)',
                            }}
                        >
                            &rarr;
                        </div>
                    </div>
                </button>
            )}

            {/* Chapter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {chapters.map((chapter) => {
                    const isSelected = chapter.id === selectedChapterId;

                    return (
                        <button
                            key={chapter.id}
                            onClick={() => onSelectChapter(chapter.id)}
                            className="p-6 rounded-3xl border text-left transition-all duration-300 group"
                            style={isSelected
                                ? {
                                    borderColor: 'color-mix(in srgb, var(--color-info) 50%, transparent)',
                                    background: 'var(--color-info-subtle)',
                                    boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-info) 20%, transparent)',
                                }
                                : {
                                    borderColor: 'var(--color-border-default)',
                                    background: 'color-mix(in srgb, var(--color-bg-raised) 60%, transparent)',
                                }
                            }
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
                                    style={{
                                        backgroundColor: chapter.color || 'var(--color-info)',
                                        color: 'var(--color-accent-foreground)',
                                        boxShadow: 'var(--shadow-lg)',
                                    }}
                                >
                                    <BookOpen size={20} />
                                </div>
                                <div
                                    className="text-xs font-bold px-2 py-1 rounded-lg"
                                    style={isSelected
                                        ? { background: 'var(--color-info-subtle)', color: 'var(--color-info)' }
                                        : { background: 'var(--color-bg-overlay)', color: 'var(--color-text-muted)' }
                                    }
                                >
                                    {chapter.questions.length} Q
                                </div>
                            </div>

                            <h3
                                className="text-lg font-bold mb-2"
                                style={{ color: isSelected ? 'var(--color-info)' : 'var(--color-text-primary)' }}
                            >
                                {chapter.title}
                            </h3>
                            <p
                                className="text-sm font-medium leading-relaxed"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                {chapter.subtitle}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
