/**
 * useQCM Hook
 * Core hook for managing quiz state and logic
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Question, Chapter, QuizMode, AnswerRecord, QuizResult } from '../types';
import { shuffle, shuffleQuestionOptions, calculateScore, generateSessionId } from '../utils';

interface ShuffledQuestion {
    original: Question;
    shuffledOptions: string[];
    correctIndex: number;
}

interface UseQCMOptions {
    chapters: Chapter[];
    mode?: QuizMode;
    selectedChapterId?: string;
    shuffleQuestions?: boolean;
    shuffleOptions?: boolean;
    onComplete?: (result: QuizResult) => void;
}

interface UseQCMReturn {
    // State
    questions: ShuffledQuestion[];
    currentIndex: number;
    currentQuestion: ShuffledQuestion | null;
    selectedAnswer: number | null;
    isAnswered: boolean;
    isComplete: boolean;

    // Stats
    score: number;
    correctCount: number;
    incorrectCount: number;
    progress: number;
    answers: Map<string, AnswerRecord>;

    // Actions
    selectAnswer: (index: number) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    restart: (options?: { chapter?: string; mode?: QuizMode }) => void;

    // Meta
    sessionId: string;
    startTime: number;
    isCorrect: boolean | null;
    chapterInfo: Chapter | null;
}

export function useQCM({
    chapters,
    mode = 'byChapter',
    selectedChapterId,
    shuffleQuestions = true,
    shuffleOptions = true,
    onComplete,
}: UseQCMOptions): UseQCMReturn {
    const [sessionId, setSessionId] = useState(() => generateSessionId());
    const [startTime] = useState(() => Date.now());
    const [currentChapterId, setCurrentChapterId] = useState(selectedChapterId);
    const [currentMode, setCurrentMode] = useState(mode);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Map<string, AnswerRecord>>(new Map());
    const [questionsOrder, setQuestionsOrder] = useState<string[]>([]);

    // Get questions based on mode
    const baseQuestions = useMemo(() => {
        if (currentMode === 'byChapter' && currentChapterId) {
            const chapter = chapters.find(c => c.id === currentChapterId);
            return chapter?.questions || [];
        }
        return chapters.flatMap(c => c.questions);
    }, [chapters, currentMode, currentChapterId]);

    // Initialize questions order
    useEffect(() => {
        const ids = baseQuestions.map(q => q.id);
        setQuestionsOrder(shuffleQuestions ? shuffle(ids) : ids);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setAnswers(new Map());
    }, [baseQuestions, shuffleQuestions, sessionId]);

    // Build shuffled questions array
    const questions: ShuffledQuestion[] = useMemo(() => {
        return questionsOrder.map(id => {
            const original = baseQuestions.find(q => q.id === id)!;
            if (!original) return null;

            if (shuffleOptions) {
                const { shuffledOptions, correctIndex } = shuffleQuestionOptions(original);
                return { original, shuffledOptions, correctIndex };
            }

            return {
                original,
                shuffledOptions: original.options,
                correctIndex: original.correctIndex,
            };
        }).filter((q): q is ShuffledQuestion => q !== null);
    }, [questionsOrder, baseQuestions, shuffleOptions]);

    // Current question
    const currentQuestion = questions[currentIndex] || null;
    const isAnswered = selectedAnswer !== null;
    const isComplete = currentIndex >= questions.length && questions.length > 0;
    const isCorrect = isAnswered && currentQuestion
        ? selectedAnswer === currentQuestion.correctIndex
        : null;

    // Stats
    const correctCount = useMemo(() =>
        Array.from(answers.values()).filter(a => a.isCorrect).length
        , [answers]);

    const incorrectCount = answers.size - correctCount;
    const score = calculateScore(correctCount, answers.size);
    const progress = questions.length > 0
        ? (Math.min(currentIndex + (isAnswered ? 1 : 0), questions.length) / questions.length) * 100
        : 0;

    // Chapter info
    const chapterInfo = useMemo(() => {
        if (!currentChapterId) return null;
        return chapters.find(c => c.id === currentChapterId) || null;
    }, [chapters, currentChapterId]);

    // Actions
    const selectAnswer = useCallback((index: number) => {
        if (isAnswered || !currentQuestion) return;

        setSelectedAnswer(index);
        const isCorrect = index === currentQuestion.correctIndex;

        setAnswers(prev => {
            const newAnswers = new Map(prev);
            newAnswers.set(currentQuestion.original.id, {
                questionId: currentQuestion.original.id,
                selectedIndex: index,
                isCorrect,
                timestamp: Date.now(),
            });
            return newAnswers;
        });
    }, [isAnswered, currentQuestion]);

    const nextQuestion = useCallback(() => {
        if (!isAnswered) return;

        if (currentIndex + 1 >= questions.length) {
            // Quiz complete
            if (onComplete) {
                const byChapter: Record<string, { correct: number; total: number }> = {};

                answers.forEach((answer) => {
                    const question = baseQuestions.find(q => q.id === answer.questionId);
                    if (!question) return;

                    const chapter = chapters.find(c => c.questions.some(q => q.id === question.id));
                    if (!chapter) return;

                    if (!byChapter[chapter.id]) {
                        byChapter[chapter.id] = { correct: 0, total: 0 };
                    }
                    byChapter[chapter.id].total++;
                    if (answer.isCorrect) byChapter[chapter.id].correct++;
                });

                onComplete({
                    totalQuestions: questions.length,
                    correctAnswers: correctCount,
                    incorrectAnswers: incorrectCount,
                    score,
                    timeSpent: Date.now() - startTime,
                    byChapter,
                });
            }
        }

        setCurrentIndex(prev => Math.min(prev + 1, questions.length));
        setSelectedAnswer(null);
    }, [isAnswered, currentIndex, questions.length, onComplete, answers, baseQuestions, chapters, correctCount, incorrectCount, score, startTime]);

    const previousQuestion = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            const prevQuestion = questions[currentIndex - 1];
            const prevAnswer = answers.get(prevQuestion?.original.id || '');
            setSelectedAnswer(prevAnswer?.selectedIndex ?? null);
        }
    }, [currentIndex, questions, answers]);

    const goToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            const q = questions[index];
            const answer = answers.get(q?.original.id || '');
            setSelectedAnswer(answer?.selectedIndex ?? null);
        }
    }, [questions, answers]);

    const restart = useCallback((options?: { chapter?: string; mode?: QuizMode }) => {
        setSessionId(generateSessionId());
        if (options?.chapter !== undefined) setCurrentChapterId(options.chapter);
        if (options?.mode) setCurrentMode(options.mode);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setAnswers(new Map());
    }, []);

    return {
        questions,
        currentIndex,
        currentQuestion,
        selectedAnswer,
        isAnswered,
        isComplete,
        score,
        correctCount,
        incorrectCount,
        progress,
        answers,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        restart,
        sessionId,
        startTime,
        isCorrect,
        chapterInfo,
    };
}
