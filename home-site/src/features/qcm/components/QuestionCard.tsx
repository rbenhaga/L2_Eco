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

const difficultyStyles: Record<string, { label: string; style: React.CSSProperties }> = {
    easy: {
        label: 'Facile',
        style: {
            background: 'var(--color-success-subtle)',
            color: 'var(--color-success)',
            border: '1px solid var(--color-success)',
        },
    },
    medium: {
        label: 'Moyen',
        style: {
            background: 'var(--color-warning-subtle)',
            color: 'var(--color-warning)',
            border: '1px solid var(--color-warning)',
        },
    },
    hard: {
        label: 'Difficile',
        style: {
            background: 'var(--color-error-subtle)',
            color: 'var(--color-error)',
            border: '1px solid var(--color-error)',
        },
    },
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
        <div
            className="backdrop-blur-md rounded-3xl border overflow-hidden relative transition-colors duration-300"
            style={{
                background: 'var(--color-bg-raised)',
                borderColor: 'var(--color-border-default)',
                boxShadow: 'var(--shadow-md)',
            }}
        >
            <div
                className="absolute top-0 left-0 w-full h-1 opacity-50"
                style={{
                    background: 'linear-gradient(to right, transparent, var(--color-border-default), transparent)',
                }}
            />

            {/* Header */}
            <div
                className="px-6 py-5 sm:px-8 sm:py-6 border-b"
                style={{
                    borderColor: 'var(--color-border-default)',
                    background: 'var(--color-bg-overlay)',
                }}
            >
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                            Question <span className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>{questionNumber}</span>
                            <span style={{ color: 'var(--color-text-muted)' }}> / {totalQuestions}</span>
                        </span>
                        {difficulty && (
                            <span
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                style={difficultyStyles[difficulty].style}
                            >
                                {difficultyStyles[difficulty].label}
                            </span>
                        )}
                    </div>
                    {chapterTitle && (
                        <span
                            className="text-xs font-medium truncate max-w-[150px] sm:max-w-none px-2 py-1 rounded-lg"
                            style={{
                                color: 'var(--color-text-muted)',
                                background: 'var(--color-bg-overlay)',
                                border: '1px solid var(--color-border-default)',
                            }}
                        >
                            {chapterTitle}
                        </span>
                    )}
                </div>
            </div>

            {/* Question */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div
                    className="text-lg sm:text-xl leading-relaxed font-medium transition-colors duration-300"
                    style={{ color: 'var(--color-text-primary)' }}
                >
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
