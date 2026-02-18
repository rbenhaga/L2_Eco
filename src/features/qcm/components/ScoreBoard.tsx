/**
 * ScoreBoard Component
 * Final results display with detailed breakdown
 */

import { RotateCcw, ArrowRight, Clock, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '../../../design-system';
import type { QuizResult, Chapter } from '../types';
import { getScoreMessage, formatTime } from '../utils';

interface ScoreBoardProps {
    result: QuizResult;
    chapters: Chapter[];
    subjectColor?: string;
    backLink?: string;
    onRestart: () => void;
}

export function ScoreBoard({
    result,
    chapters,
    subjectColor = 'var(--color-accent)',
    backLink,
    onRestart,
}: ScoreBoardProps) {
    const { emoji, message, color } = getScoreMessage(result.score);

    // Get variant for circular progress
    const getVariant = (): 'success' | 'error' | 'default' => {
        if (result.score >= 60) return 'success';
        if (result.score < 40) return 'error';
        return 'default';
    };

    return (
        <div className="max-w-md mx-auto">
            {/* Main Score Card */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{
                    background: 'var(--color-bg-raised)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border-default)'
                }}
            >
                {/* Header */}
                <div
                    className="py-8 px-6 text-center"
                    style={{ background: `color-mix(in srgb, ${subjectColor} 10%, transparent)` }}
                >
                    <div className="flex justify-center mb-4">
                        <CircularProgress
                            value={result.score}
                            size={120}
                            strokeWidth={10}
                            variant={getVariant()}
                        />
                    </div>

                    <div className="text-4xl mb-2">{emoji}</div>
                    <h2 className="text-xl font-bold" style={{ color }}>{message}</h2>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className="text-center p-3 rounded-xl"
                            style={{ background: 'var(--color-bg-overlay)' }}
                        >
                            <Target size={20} className="mx-auto mb-1" style={{ color: 'var(--color-text-muted)' }} />
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{result.correctAnswers}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Correct</p>
                        </div>
                        <div
                            className="text-center p-3 rounded-xl"
                            style={{ background: 'var(--color-bg-overlay)' }}
                        >
                            <TrendingUp size={20} className="mx-auto mb-1" style={{ color: 'var(--color-text-muted)' }} />
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{result.totalQuestions}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Total</p>
                        </div>
                        <div
                            className="text-center p-3 rounded-xl"
                            style={{ background: 'var(--color-bg-overlay)' }}
                        >
                            <Clock size={20} className="mx-auto mb-1" style={{ color: 'var(--color-text-muted)' }} />
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{formatTime(result.timeSpent)}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Temps</p>
                        </div>
                    </div>

                    {/* Chapter breakdown if available */}
                    {Object.keys(result.byChapter).length > 1 && (
                        <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>Par chapitre</h3>
                            <div className="space-y-2">
                                {Object.entries(result.byChapter).map(([chapterId, stats]) => {
                                    const chapter = chapters.find(c => c.id === chapterId);
                                    const chapterScore = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;

                                    return (
                                        <div key={chapterId} className="flex items-center justify-between text-sm">
                                            <span className="truncate max-w-[60%]" style={{ color: 'var(--color-text-secondary)' }}>
                                                {chapter?.title || chapterId}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-24 h-2 rounded-full overflow-hidden"
                                                    style={{ background: 'var(--color-bg-overlay)' }}
                                                >
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${chapterScore}%`,
                                                            background: chapterScore >= 60
                                                                ? 'var(--color-success)'
                                                                : chapterScore >= 40
                                                                    ? 'var(--color-warning)'
                                                                    : 'var(--color-error)'
                                                        }}
                                                    />
                                                </div>
                                                <span className="font-medium w-12 text-right" style={{ color: 'var(--color-text-primary)' }}>
                                                    {stats.correct}/{stats.total}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-3">
                    <button
                        onClick={onRestart}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-colors"
                        style={{
                            background: 'var(--color-bg-overlay)',
                            color: 'var(--color-text-secondary)'
                        }}
                    >
                        <RotateCcw size={18} />
                        <span>Recommencer</span>
                    </button>

                    {backLink && (
                        <Link
                            to={backLink}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-all no-underline"
                            style={{
                                background: 'var(--color-primary-gradient)',
                                color: 'var(--color-accent-foreground)',
                                border: '1px solid var(--color-primary-border)',
                            }}
                        >
                            <span>Continuer</span>
                            <ArrowRight size={18} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
