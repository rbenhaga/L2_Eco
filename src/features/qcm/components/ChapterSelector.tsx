/**
 * ChapterSelector Component
 * Grid of chapter cards for selecting quiz content
 * Now with free/premium tier filtering per subject
 */

import { BookOpen, Play, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Chapter } from '../types';
import { useAuth } from '../../../context/AuthContext';
import { isQcmQuestionFree } from '../../../utils/contentAccess';

interface ChapterSelectorProps {
    chapters: Chapter[];
    selectedChapterId?: string;
    onSelectChapter: (chapterId: string) => void;
    onStartAll?: () => void;
    /** Subject identifier for determining first free chapter (e.g., 'macro', 'micro') */
    subject?: string;
}

export function ChapterSelector({
    chapters,
    selectedChapterId,
    onSelectChapter,
    onStartAll,
    subject,
}: ChapterSelectorProps) {
    const { hasAccess } = useAuth();
    const navigate = useNavigate();
    const hasPremium = hasAccess('premium');

    // Filter chapters for total question count (only free ones if not premium)
    const accessibleChapters = hasPremium
        ? chapters
        : chapters.filter(c => isQcmQuestionFree(c.id, subject));

    const totalQuestions = accessibleChapters.reduce((sum, c) => sum + c.questions.length, 0);

    const handleChapterClick = (chapter: Chapter) => {
        const isFree = isQcmQuestionFree(chapter.id, subject);

        if (!hasPremium && !isFree) {
            // Redirect to subscription page
            navigate('/subscription');
            return;
        }

        onSelectChapter(chapter.id);
    };

    const handleStartAllClick = () => {
        if (!hasPremium) {
            // For free users, only start with free chapters
            navigate('/subscription');
            return;
        }
        onStartAll?.();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* All Questions Option - only for premium */}
            {onStartAll && (
                <button
                    onClick={handleStartAllClick}
                    className={`w-full p-6 sm:p-8 rounded-3xl border border-dashed transition-all group relative overflow-hidden ${hasPremium
                        ? 'border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10'
                        : 'border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 cursor-not-allowed'
                        }`}
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${hasPremium
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white group-hover:scale-110'
                                : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                }`}>
                                {hasPremium ? (
                                    <Play size={24} fill="currentColor" />
                                ) : (
                                    <Lock size={24} />
                                )}
                            </div>
                            <div className="text-left">
                                <h3 className={`text-xl font-bold mb-1 ${hasPremium
                                    ? 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                    : 'text-amber-700 dark:text-amber-400'
                                    }`}>
                                    Toutes les questions
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    {hasPremium
                                        ? `${totalQuestions} questions • Mode mélangé`
                                        : 'Premium requis'
                                    }
                                </p>
                            </div>
                        </div>
                        {hasPremium ? (
                            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                                →
                            </div>
                        ) : (
                            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                                Premium
                            </span>
                        )}
                    </div>
                </button>
            )}

            {/* Chapter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {chapters.map((chapter) => {
                    const isSelected = chapter.id === selectedChapterId;
                    const isFree = isQcmQuestionFree(chapter.id, subject);
                    const isLocked = !hasPremium && !isFree;

                    return (
                        <button
                            key={chapter.id}
                            onClick={() => handleChapterClick(chapter)}
                            className={`
                                p-6 rounded-3xl border text-left transition-all duration-300 group relative
                                ${isLocked
                                    ? 'border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 cursor-not-allowed'
                                    : isSelected
                                        ? 'border-blue-500/50 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-500/20'
                                        : 'border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-white/10'
                                }
                            `}
                        >
                            {/* Lock overlay for premium content */}
                            {isLocked && (
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                                    <Lock size={12} />
                                    <span className="text-xs font-semibold">Premium</span>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${isLocked ? 'opacity-50' : 'group-hover:scale-105'
                                        }`}
                                    style={{
                                        backgroundColor: isLocked ? '#9ca3af' : (chapter.color || '#3b82f6')
                                    }}
                                >
                                    {isLocked ? (
                                        <Lock size={20} className="text-white" />
                                    ) : (
                                        <BookOpen size={20} className="text-white" />
                                    )}
                                </div>
                                {!isLocked && (
                                    <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isSelected
                                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                                        }`}>
                                        {chapter.questions.length} Q
                                    </div>
                                )}
                            </div>

                            <h3 className={`text-lg font-bold mb-2 ${isLocked
                                ? 'text-slate-400 dark:text-slate-500'
                                : isSelected
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-900 dark:text-white'
                                }`}>
                                {chapter.title}
                            </h3>
                            <p className={`text-sm font-medium leading-relaxed ${isLocked
                                ? 'text-slate-400 dark:text-slate-600'
                                : 'text-slate-500 dark:text-slate-400'
                                }`}>
                                {chapter.subtitle}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
