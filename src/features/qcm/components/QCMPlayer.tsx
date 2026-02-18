/**
 * QCMPlayer Component
 * Main orchestration component - the single entry point for all QCM instances
 *
 * Usage:
 * ```tsx
 * import { QCMPlayer } from '@/features/qcm';
 * import qcmData from '../data/qcm.json';
 *
 * function MyQCM() {
 *   return <QCMPlayer config={qcmData} />;
 * }
 * ```
 */

import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '../../../design-system';
import { useQCM } from '../hooks/useQCM';
import { QuestionCard, RenderWithMath } from './QuestionCard';
import { AnswerOption } from './AnswerOption';
import { ExplanationBox } from './ExplanationBox';
import { ScoreBoard } from './ScoreBoard';
import { ChapterSelector } from './ChapterSelector';
import type { QCMConfig, QuizResult } from '../types';

type ViewState = 'selector' | 'quiz' | 'results';

interface QCMPlayerProps {
    config: QCMConfig;
    subjectColor?: string;
    backLink?: string;
    onQuizComplete?: (result: QuizResult) => void;
}

export function QCMPlayer({
    config,
    subjectColor = 'var(--color-info)',
    backLink,
    onQuizComplete,
}: QCMPlayerProps) {
    const [viewState, setViewState] = useState<ViewState>('selector');
    const [selectedChapterId, setSelectedChapterId] = useState<string | undefined>();
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    // Quiz hook
    const {
        questions,
        currentIndex,
        currentQuestion,
        selectedAnswer,
        isAnswered,
        score,
        progress,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        restart,
        isCorrect,
        chapterInfo,
    } = useQCM({
        chapters: config.chapters,
        selectedChapterId,
        onComplete: (result) => {
            setQuizResult(result);
            setViewState('results');
            onQuizComplete?.(result);
        },
    });

    // Handlers
    const handleSelectChapter = useCallback((chapterId: string) => {
        setSelectedChapterId(chapterId);
        setViewState('quiz');
    }, []);

    const handleStartAll = useCallback(() => {
        setSelectedChapterId(undefined);
        setViewState('quiz');
    }, []);

    const handleRestart = useCallback(() => {
        restart({ chapter: selectedChapterId });
        setQuizResult(null);
        setViewState('quiz');
    }, [restart, selectedChapterId]);

    const handleBackToSelector = useCallback(() => {
        setViewState('selector');
        setSelectedChapterId(undefined);
        setQuizResult(null);
    }, []);

    // Chapter selector view
    if (viewState === 'selector') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 pt-20 sm:pt-28">
                <div className="mb-12 text-center sm:text-left">
                    {backLink && (
                        <Link
                            to={backLink}
                            className="inline-flex items-center gap-2 mb-6 no-underline text-sm transition-colors py-1 px-3 rounded-full"
                            style={{
                                color: 'var(--color-text-muted)',
                                background: 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)',
                            }}
                        >
                            <ArrowLeft size={16} />
                            Retour au cours
                        </Link>
                    )}
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--color-accent-foreground)' }}>
                        QCM <span style={{ color: subjectColor }}>{config.subject}</span>
                    </h1>
                    {config.description && (
                        <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>{config.description}</p>
                    )}
                </div>

                <ChapterSelector
                    chapters={config.chapters}
                    selectedChapterId={selectedChapterId}
                    onSelectChapter={handleSelectChapter}
                    onStartAll={handleStartAll}
                />
            </div>
        );
    }

    // Results view
    if (viewState === 'results' && quizResult) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28">
                <button
                    onClick={handleBackToSelector}
                    className="inline-flex items-center gap-2 mb-8 no-underline text-sm transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    <Home size={16} />
                    Changer de chapitre
                </button>

                <ScoreBoard
                    result={quizResult}
                    chapters={config.chapters}
                    subjectColor={subjectColor}
                    backLink={backLink}
                    onRestart={handleRestart}
                />
            </div>
        );
    }

    // Quiz view
    if (!currentQuestion) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28 text-center">
                <p style={{ color: 'var(--color-text-muted)' }}>Aucune question disponible.</p>
                <button
                    onClick={handleBackToSelector}
                    className="mt-4 hover:underline"
                    style={{ color: 'var(--color-accent-foreground)' }}
                >
                    Retour aux chapitres
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with progress */}
            <div
                className="mb-8 p-4 rounded-2xl backdrop-blur-md"
                style={{
                    background: 'color-mix(in srgb, var(--color-text-primary) 40%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-bg-raised) 5%, transparent)',
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handleBackToSelector}
                        className="inline-flex items-center gap-2 text-sm transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Chapitres</span>
                    </button>

                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        Score: <span className="font-bold ml-2 text-lg" style={{ color: 'var(--color-accent-foreground)' }}>{score}%</span>
                    </div>
                </div>

                <Progress
                    value={progress}
                    size="sm"
                    variant="gradient"
                    color={subjectColor}
                />
            </div>

            {/* Question Card */}
            <QuestionCard
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                question={currentQuestion.original.question}
                difficulty={currentQuestion.original.difficulty}
                chapterTitle={chapterInfo?.title}
            >
                {currentQuestion.shuffledOptions.map((option, index) => (
                    <AnswerOption
                        key={index}
                        index={index}
                        content={<RenderWithMath text={option} />}
                        isSelected={selectedAnswer === index}
                        isCorrect={index === currentQuestion.correctIndex}
                        isRevealed={isAnswered}
                        disabled={isAnswered}
                        onSelect={selectAnswer}
                        activeColor={subjectColor}
                    />
                ))}
            </QuestionCard>

            {/* Explanation */}
            {isAnswered && (
                <ExplanationBox
                    isCorrect={isCorrect!}
                    explanation={currentQuestion.original.explanation}
                    className="mt-6 animate-in fade-in slide-in-from-top-2"
                />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 gap-4">
                <button
                    onClick={previousQuestion}
                    disabled={currentIndex === 0}
                    className={`
            flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all
            ${currentIndex === 0
                            ? 'cursor-not-allowed'
                            : 'active:scale-[0.98]'
                        }
          `}
                    style={currentIndex === 0
                        ? { color: 'var(--color-text-muted)', background: 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' }
                        : { color: 'var(--color-text-secondary)', border: '1px solid color-mix(in srgb, var(--color-bg-raised) 5%, transparent)' }
                    }
                >
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Precedent</span>
                </button>

                {isAnswered && (
                    <button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 px-8 py-3.5 font-bold rounded-xl transition-all active:scale-[0.98]"
                        style={{
                            background: 'var(--color-bg-raised)',
                            color: 'var(--color-text-primary)',
                            boxShadow: 'var(--shadow-lg)',
                        }}
                    >
                        <span>{currentIndex + 1 >= questions.length ? 'Voir resultats' : 'Suivant'}</span>
                        <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
