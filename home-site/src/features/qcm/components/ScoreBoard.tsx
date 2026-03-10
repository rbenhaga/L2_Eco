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
    backLink?: string;
    minimumScore?: number;
    modeLabel?: string;
    compact?: boolean;
    onRestart: () => void;
}

export function ScoreBoard({
    result,
    chapters,
    backLink,
    minimumScore,
    modeLabel,
    compact = false,
    onRestart,
}: ScoreBoardProps) {
    const { emoji, message, color } = getScoreMessage(result.score);
    const isValidated = minimumScore === undefined ? null : result.score >= minimumScore;
    const restartLabel = isValidated === false ? 'Refaire le QCM' : 'Recommencer';

    if (compact) {
        return (
            <div className="w-full border-t pt-5" style={{ borderColor: 'var(--color-border-default)' }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold" style={{ color: isValidated ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                            {isValidated ? 'Cours validé' : 'Résultat du QCM'}
                        </h3>
                        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            {isValidated
                                ? 'Le seuil est atteint. Le chapitre est désormais validé.'
                                : "Le seuil n'est pas atteint. Il faut relancer le QCM pour valider le cours."}
                        </p>
                    </div>

                    <div className="text-left sm:text-right">
                        <p className="text-3xl font-semibold" style={{ color }}>
                            {result.score}%
                        </p>
                        {modeLabel && (
                            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {modeLabel}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>{result.correctAnswers}/{result.totalQuestions} bonnes réponses</span>
                    <span>{formatTime(result.timeSpent)}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                        onClick={onRestart}
                        className="inline-flex min-h-[2.95rem] items-center gap-2 rounded-[10px] px-4 text-sm font-semibold transition-colors"
                        style={{
                            background: 'var(--color-bg-overlay)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        <RotateCcw size={16} />
                        <span>{restartLabel}</span>
                    </button>

                    {backLink && isValidated && (
                        <Link
                            to={backLink}
                            className="inline-flex min-h-[2.95rem] items-center gap-2 rounded-[10px] px-4 text-sm font-semibold no-underline"
                            style={{
                                background: 'var(--color-accent)',
                                color: 'var(--color-accent-foreground)',
                            }}
                        >
                            <span>Continuer</span>
                            <ArrowRight size={16} />
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    // Get variant for circular progress
    const getVariant = (): 'success' | 'error' | 'default' => {
        if (result.score >= 60) return 'success';
        if (result.score < 40) return 'error';
        return 'default';
    };

    return (
        <div className={`${compact ? 'w-full' : 'max-w-md mx-auto'}`}>
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
                    className={`${compact ? 'px-5 py-6' : 'px-6 py-8'} text-center`}
                    style={{ background: 'var(--color-accent-subtle)' }}
                >
                    <div className="flex justify-center mb-4">
                        <CircularProgress
                            value={result.score}
                            size={compact ? 104 : 120}
                            strokeWidth={10}
                            variant={getVariant()}
                        />
                    </div>

                    <div className="text-4xl mb-2">{emoji}</div>
                    <h2 className="text-xl font-bold" style={{ color }}>{message}</h2>
                </div>

                {/* Stats */}
                <div className={`${compact ? 'p-5' : 'p-6'} space-y-4`}>
                    {(minimumScore !== undefined || modeLabel) && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {modeLabel && (
                                <div
                                    className="rounded-xl p-3"
                                    style={{ background: 'var(--color-bg-overlay)' }}
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-text-muted)' }}>
                                        Mode
                                    </p>
                                    <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {modeLabel}
                                    </p>
                                </div>
                            )}
                            {minimumScore !== undefined && (
                                <div
                                    className="rounded-xl p-3"
                                    style={{
                                        background: isValidated ? 'var(--color-success-subtle)' : 'var(--color-bg-overlay)',
                                    }}
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-text-muted)' }}>
                                        Validation
                                    </p>
                                    <p
                                        className="mt-1 text-sm font-semibold"
                                        style={{ color: isValidated ? 'var(--color-success)' : 'var(--color-text-primary)' }}
                                    >
                                        {isValidated ? `Chapitre validé (${minimumScore}%)` : `Seuil non atteint (${minimumScore}%)`}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {isValidated === false && (
                        <div
                            className="rounded-xl px-4 py-3"
                            style={{
                                background: 'var(--color-error-subtle)',
                                border: '1px solid color-mix(in srgb, var(--color-error) 28%, transparent)',
                            }}
                        >
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-error)' }}>
                                Cours non validé
                            </p>
                            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                                Le seuil de validation n&apos;est pas atteint. Refais le QCM pour débloquer la suite du cours.
                            </p>
                        </div>
                    )}

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
                <div className={`${compact ? 'px-5 pb-5 pt-0' : 'p-6 pt-0'} flex gap-3`}>
                    <button
                        onClick={onRestart}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-colors"
                        style={{
                            background: 'var(--color-bg-overlay)',
                            color: 'var(--color-text-secondary)'
                        }}
                    >
                        <RotateCcw size={18} />
                        <span>{restartLabel}</span>
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
