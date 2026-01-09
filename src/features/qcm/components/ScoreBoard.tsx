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
    subjectColor = '#3b82f6',
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                {/* Header */}
                <div
                    className="py-8 px-6 text-center"
                    style={{ background: `linear-gradient(135deg, ${subjectColor}10, ${subjectColor}05)` }}
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
                    <h2 className={`text-xl font-bold ${color}`}>{message}</h2>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <Target size={20} className="mx-auto mb-1 text-gray-400" />
                            <p className="text-2xl font-bold text-gray-900">{result.correctAnswers}</p>
                            <p className="text-xs text-gray-500">Correct</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <TrendingUp size={20} className="mx-auto mb-1 text-gray-400" />
                            <p className="text-2xl font-bold text-gray-900">{result.totalQuestions}</p>
                            <p className="text-xs text-gray-500">Total</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <Clock size={20} className="mx-auto mb-1 text-gray-400" />
                            <p className="text-2xl font-bold text-gray-900">{formatTime(result.timeSpent)}</p>
                            <p className="text-xs text-gray-500">Temps</p>
                        </div>
                    </div>

                    {/* Chapter breakdown if available */}
                    {Object.keys(result.byChapter).length > 1 && (
                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Par chapitre</h3>
                            <div className="space-y-2">
                                {Object.entries(result.byChapter).map(([chapterId, stats]) => {
                                    const chapter = chapters.find(c => c.id === chapterId);
                                    const chapterScore = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;

                                    return (
                                        <div key={chapterId} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 truncate max-w-[60%]">
                                                {chapter?.title || chapterId}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${chapterScore >= 60 ? 'bg-green-500' : chapterScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${chapterScore}%` }}
                                                    />
                                                </div>
                                                <span className="font-medium text-gray-900 w-12 text-right">
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
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                    >
                        <RotateCcw size={18} />
                        <span>Recommencer</span>
                    </button>

                    {backLink && (
                        <Link
                            to={backLink}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors no-underline"
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
