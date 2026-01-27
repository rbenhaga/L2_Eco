import { ReactNode } from 'react';
import { RenderWithMath } from './RenderWithMath';

interface QuestionCardProps {
    questionNumber: number;
    totalQuestions: number;
    question: string;
    children: ReactNode;
    difficulty?: 'easy' | 'medium' | 'hard';
    chapterTitle?: string;
}

const difficultyStyles = {
    easy: { label: 'Facile', color: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' },
    medium: { label: 'Moyen', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/20' },
    hard: { label: 'Difficile', color: 'bg-rose-500/20 text-rose-400 border border-rose-500/20' }
};

export { RenderWithMath };

export function QuestionCard({
    questionNumber,
    totalQuestions,
    question,
    children,
    difficulty,
    chapterTitle,
}: QuestionCardProps) {
    return (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-400/20 to-transparent opacity-50" />

            {/* Header */}
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-500">
                            Question <span className="text-slate-900 font-bold text-base">{questionNumber}</span>
                            <span className="text-slate-400"> / {totalQuestions}</span>
                        </span>
                        {difficulty && (
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${difficultyStyles[difficulty].color}`}>
                                {difficultyStyles[difficulty].label}
                            </span>
                        )}
                    </div>
                    {chapterTitle && (
                        <span className="text-xs font-medium text-slate-500 truncate max-w-[150px] sm:max-w-none bg-slate-200/50 px-2 py-1 rounded-lg">
                            {chapterTitle}
                        </span>
                    )}
                </div>
            </div>

            {/* Question */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="text-slate-900 text-lg sm:text-xl leading-relaxed font-medium transition-colors duration-300">
                    <RenderWithMath text={question} />
                </div>
            </div>

            {/* Answers */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 space-y-3">
                {children}
            </div>
        </div>
    );
}
