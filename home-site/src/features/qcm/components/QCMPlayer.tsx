import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck, Home, ShieldCheck } from 'lucide-react';
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
type DeliveryMode = 'pedagogical' | 'exam';

interface QCMPlayerProps {
    config: QCMConfig;
    backLink?: string;
    onQuizComplete?: (result: QuizResult) => void;
    embedded?: boolean;
    initialChapterId?: string;
    initialDeliveryMode?: DeliveryMode;
}

export function QCMPlayer({
    config,
    backLink,
    onQuizComplete,
    embedded = false,
    initialChapterId,
    initialDeliveryMode = 'pedagogical',
}: QCMPlayerProps) {
    const resolvedInitialChapterId = initialChapterId ?? (config.chapters.length === 1 ? config.chapters[0]?.id : undefined);
    const [viewState, setViewState] = useState<ViewState>(resolvedInitialChapterId ? 'quiz' : 'selector');
    const [selectedChapterId, setSelectedChapterId] = useState<string | undefined>(resolvedInitialChapterId);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>(initialDeliveryMode);
    const validationScore = config.validationScore ?? 50;

    useEffect(() => {
        if (!resolvedInitialChapterId) return;

        setSelectedChapterId((current) => current ?? resolvedInitialChapterId);
        setViewState((current) => (current === 'selector' ? 'quiz' : current));
    }, [resolvedInitialChapterId]);

    useEffect(() => {
        setDeliveryMode(initialDeliveryMode);
    }, [initialDeliveryMode]);

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

    const handleSelectChapter = useCallback((chapterId: string) => {
        setSelectedChapterId(chapterId);
        setQuizResult(null);
        setViewState('quiz');
    }, []);

    const handleStartAll = useCallback(() => {
        setSelectedChapterId(undefined);
        setQuizResult(null);
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

    const embeddedMetaLabel = deliveryMode === 'exam' ? 'Mode examen' : 'Mode pédagogique';

    if (viewState === 'selector') {
        return (
            <div className={embedded ? 'w-full' : 'max-w-4xl mx-auto px-4 py-8 pt-20 sm:pt-28'}>
                <div className={`${embedded ? 'mb-6' : 'mb-12'} text-center sm:text-left`}>
                    {backLink && !embedded && (
                        <Link
                            to={backLink}
                            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm no-underline transition-colors"
                            style={{
                                color: 'var(--color-text-muted)',
                                background: 'var(--color-bg-overlay)',
                                border: '1px solid var(--color-border-default)',
                            }}
                        >
                            <ArrowLeft size={16} />
                            Retour au cours
                        </Link>
                    )}
                    <h1 className={`${embedded ? 'mb-3 text-2xl sm:text-3xl' : 'mb-4 text-3xl sm:text-5xl'} font-bold`} style={{ color: 'var(--color-text-primary)' }}>
                        QCM <span style={{ color: 'var(--color-accent)' }}>{config.subject}</span>
                    </h1>
                    <p className={`${embedded ? 'text-sm sm:text-base' : 'text-lg'} max-w-2xl`} style={{ color: 'var(--color-text-muted)' }}>
                        {config.description || 'Choisis ton chapitre et ton mode pour lancer la validation.'}
                    </p>
                </div>

                <div className={`${embedded ? 'mb-5 grid gap-3 md:grid-cols-2' : 'mb-8 grid gap-4 md:grid-cols-2'}`}>
                    <button
                        type="button"
                        onClick={() => setDeliveryMode('pedagogical')}
                        className={`${embedded ? 'rounded-2xl p-4' : 'rounded-3xl p-6'} border text-left transition-all`}
                        style={deliveryMode === 'pedagogical'
                            ? {
                                borderColor: 'color-mix(in srgb, var(--color-accent) 35%, transparent)',
                                background: 'var(--color-accent-subtle)',
                            }
                            : {
                                borderColor: 'var(--color-border-default)',
                                background: 'var(--color-bg-raised)',
                            }}
                    >
                        <div className="flex items-center gap-3">
                            <BookOpenCheck className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                            <span className={`${embedded ? 'text-sm' : 'text-base'} font-semibold`} style={{ color: 'var(--color-text-primary)' }}>
                                Mode pédagogique
                            </span>
                        </div>
                        <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: embedded ? 1.5 : 1.6 }}>
                            Correction immédiate, explications après chaque question et rythme guidé pour apprendre.
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => setDeliveryMode('exam')}
                        className={`${embedded ? 'rounded-2xl p-4' : 'rounded-3xl p-6'} border text-left transition-all`}
                        style={deliveryMode === 'exam'
                            ? {
                                borderColor: 'color-mix(in srgb, var(--color-success) 35%, transparent)',
                                background: 'var(--color-success-subtle)',
                            }
                            : {
                                borderColor: 'var(--color-border-default)',
                                background: 'var(--color-bg-raised)',
                            }}
                    >
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5" style={{ color: 'var(--color-success)' }} />
                            <span className={`${embedded ? 'text-sm' : 'text-base'} font-semibold`} style={{ color: 'var(--color-text-primary)' }}>
                                Mode examen
                            </span>
                        </div>
                        <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: embedded ? 1.5 : 1.6 }}>
                            Pas de correction immédiate, résultat final à la fin, idéal pour valider réellement le chapitre.
                        </p>
                    </button>
                </div>

                <div
                    className={`${embedded ? 'mb-5 rounded-2xl px-4 py-3.5' : 'mb-8 rounded-3xl px-5 py-4'} border`}
                    style={{
                        borderColor: 'var(--color-border-default)',
                        background: 'var(--color-bg-raised)',
                    }}
                >
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        Validation du chapitre à {validationScore}%
                    </p>
                    <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Le mode pédagogique sert à progresser, le mode examen sert à se mesurer dans les mêmes conditions de décision.
                    </p>
                </div>

                <ChapterSelector
                    chapters={config.chapters}
                    selectedChapterId={selectedChapterId}
                    onSelectChapter={handleSelectChapter}
                    onStartAll={config.chapters.length > 1 ? handleStartAll : undefined}
                />
            </div>
        );
    }

    if (viewState === 'results' && quizResult) {
        return (
            <div className={embedded ? 'w-full' : 'max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28'}>
                {!embedded && (
                    <button
                        onClick={handleBackToSelector}
                        className="mb-8 inline-flex items-center gap-2 text-sm transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <Home size={16} />
                        Changer de chapitre
                    </button>
                )}

                <ScoreBoard
                    result={quizResult}
                    chapters={config.chapters}
                    backLink={embedded ? undefined : backLink}
                    minimumScore={validationScore}
                    modeLabel={deliveryMode === 'exam' ? 'Mode examen' : 'Mode pédagogique'}
                    compact={embedded}
                    onRestart={handleRestart}
                />
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className={embedded ? 'w-full py-4 text-center' : 'max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28 text-center'}>
                <p style={{ color: 'var(--color-text-muted)' }}>Aucune question disponible.</p>
                {!embedded && (
                    <button
                        onClick={handleBackToSelector}
                        className="mt-4 hover:underline"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        Retour aux chapitres
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={embedded ? 'w-full animate-in fade-in slide-in-from-bottom-2 duration-300' : 'max-w-3xl mx-auto px-4 py-8 pt-20 sm:pt-28 animate-in fade-in slide-in-from-bottom-4 duration-500'}>
            <div
                className={embedded ? 'mb-4' : 'mb-8 rounded-2xl p-4 backdrop-blur-md'}
                style={embedded
                    ? undefined
                    : {
                        background: 'var(--color-bg-raised)',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-sm)',
                    }}
            >
                <div className={`flex items-center justify-between ${embedded ? 'mb-2' : 'mb-4'}`}>
                    {!embedded ? (
                        <button
                            onClick={handleBackToSelector}
                            className="inline-flex items-center gap-2 text-sm transition-colors"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">Chapitres</span>
                        </button>
                    ) : (
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {embeddedMetaLabel}
                        </span>
                    )}

                    {deliveryMode === 'pedagogical' ? (
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                            Score: <span className="ml-2 text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{score}%</span>
                        </div>
                    ) : (
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Réponse modifiable avant « Suivant »
                        </span>
                    )}
                </div>

                <Progress
                    value={progress}
                    size="sm"
                    variant="gradient"
                    color="var(--color-accent)"
                />
            </div>

            <QuestionCard
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                question={currentQuestion.original.question}
                difficulty={embedded ? undefined : currentQuestion.original.difficulty}
                chapterTitle={embedded ? undefined : chapterInfo?.title}
            >
                {currentQuestion.shuffledOptions.map((option, index) => (
                    <AnswerOption
                        key={index}
                        index={index}
                        content={<RenderWithMath text={option} />}
                        isSelected={selectedAnswer === index}
                        isCorrect={index === currentQuestion.correctIndex}
                        isRevealed={isAnswered && deliveryMode === 'pedagogical'}
                        disabled={deliveryMode === 'pedagogical' && isAnswered}
                        onSelect={(answerIndex) => selectAnswer(answerIndex, { replace: deliveryMode === 'exam' })}
                    />
                ))}
            </QuestionCard>

            {deliveryMode === 'pedagogical' && isAnswered && (
                <ExplanationBox
                    isCorrect={isCorrect!}
                    explanation={currentQuestion.original.explanation}
                    className="mt-6 animate-in fade-in slide-in-from-top-2"
                />
            )}

            <div className={`mt-8 flex items-center justify-between gap-4 ${embedded ? 'pb-1' : ''}`}>
                <button
                    onClick={previousQuestion}
                    disabled={currentIndex === 0}
                    className={`
                        flex items-center gap-2 rounded-xl font-bold transition-all
                        ${embedded ? 'px-4 py-3' : 'px-6 py-3.5'}
                        ${currentIndex === 0 ? 'cursor-not-allowed' : 'active:scale-[0.98]'}
                    `}
                    style={currentIndex === 0
                        ? { color: 'var(--color-text-muted)', background: 'var(--color-bg-overlay)' }
                        : { color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)' }}
                >
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Précédent</span>
                </button>

                {isAnswered && (
                    <button
                        onClick={nextQuestion}
                        className={`flex items-center gap-2 rounded-xl font-bold transition-all active:scale-[0.98] ${embedded ? 'px-5 py-3' : 'px-8 py-3.5'}`}
                        style={{
                            background: deliveryMode === 'exam' ? 'var(--color-success)' : 'var(--color-bg-raised)',
                            color: deliveryMode === 'exam' ? 'var(--color-accent-foreground)' : 'var(--color-text-primary)',
                            boxShadow: 'var(--shadow-lg)',
                        }}
                    >
                        <span>{currentIndex + 1 >= questions.length ? 'Voir les résultats' : 'Suivant'}</span>
                        <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
