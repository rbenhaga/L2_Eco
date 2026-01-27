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
                    className="w-full p-6 sm:p-8 rounded-3xl border border-dashed border-slate-300 hover:border-slate-400 bg-white/40 hover:bg-white/60 transition-all group relative overflow-hidden"
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play size={24} fill="currentColor" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                                    Toutes les questions
                                </h3>
                                <p className="text-sm text-slate-500 font-medium">
                                    {totalQuestions} questions • Mode mélangé
                                </p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-500/30 transition-all">
                            →
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
                            className={`
                p-6 rounded-3xl border text-left transition-all duration-300 group
                ${isSelected
                                    ? 'border-blue-500/50 bg-blue-50 ring-1 ring-blue-500/20'
                                    : 'border-slate-200 bg-white/60 hover:bg-white/80 hover:border-slate-300'
                                }
              `}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
                                    style={{ backgroundColor: chapter.color || '#3b82f6' }}
                                >
                                    <BookOpen size={20} />
                                </div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {chapter.questions.length} Q
                                </div>
                            </div>

                            <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                                {chapter.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{chapter.subtitle}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
