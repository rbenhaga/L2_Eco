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
}

export function QCMPlayer({
    config,
    subjectColor = '#3b82f6',
    backLink,
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
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 no-underline text-sm transition-colors py-1 px-3 rounded-full bg-white/5 hover:bg-white/10"
                        >
                            <ArrowLeft size={16} />
                            Retour au cours
                        </Link>
                    )}
                    <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                        QCM <span style={{ color: subjectColor }}>{config.subject}</span>
                    </h1>
                    {config.description && (
                        <p className="text-slate-400 text-lg max-w-2xl">{config.description}</p>
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
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 no-underline text-sm transition-colors"
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
                <p className="text-slate-500">Aucune question disponible.</p>
                <button
                    onClick={handleBackToSelector}
                    className="mt-4 text-white hover:underline"
                >
                    Retour aux chapitres
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with progress */}
            <div className="mb-8 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handleBackToSelector}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Chapitres</span>
                    </button>

                    <div className="text-sm font-medium text-slate-400">
                        Score: <span className="font-bold text-white ml-2 text-lg">{score}%</span>
                    </div>
                </div>

                <Progress
                    value={progress}
                    size="sm"
                    variant="gradient"
                    color={subjectColor} // Assuming Progress component accepts color style or prop
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
                        activeColor={subjectColor} // Pass color to option if needed
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
                            ? 'text-slate-600 cursor-not-allowed bg-white/5'
                            : 'text-slate-300 hover:text-white hover:bg-white/10 active:scale-[0.98] border border-white/5'
                        }
          `}
                >
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Précédent</span>
                </button>

                {isAnswered && (
                    <button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-white/10"
                    >
                        <span>{currentIndex + 1 >= questions.length ? 'Voir résultats' : 'Suivant'}</span>
                        <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
