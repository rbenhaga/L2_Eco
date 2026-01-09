/**
 * QCM System Types
 * Centralized type definitions for the unified quiz system
 */

/**
 * Single question in a QCM
 */
export interface Question {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
}

/**
 * Chapter/category grouping questions
 */
export interface Chapter {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    gradient?: string;
    icon?: string;
    questions: Question[];
}

/**
 * Complete QCM configuration for a subject
 */
export interface QCMConfig {
    subject: string;
    subjectId: string;
    description?: string;
    chapters: Chapter[];
}

/**
 * Quiz modes
 */
export type QuizMode = 'byChapter' | 'allQuestions' | 'random' | 'weakPoints';

/**
 * User's answer record
 */
export interface AnswerRecord {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
    timestamp: number;
}

/**
 * Quiz session state
 */
export interface QuizSession {
    mode: QuizMode;
    chapterId?: string;
    questions: Question[];
    currentIndex: number;
    answers: Map<string, AnswerRecord>;
    startedAt: number;
    completedAt?: number;
}

/**
 * Quiz result summary
 */
export interface QuizResult {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number; // 0-100
    timeSpent: number; // milliseconds
    byChapter: Record<string, { correct: number; total: number }>;
}

/**
 * Subject configuration for theming
 */
export interface SubjectTheme {
    id: string;
    name: string;
    primaryColor: string;
    lightColor: string;
    darkColor: string;
    icon: string;
}

/**
 * Subjects available
 */
export const SUBJECTS: Record<string, SubjectTheme> = {
    macro: {
        id: 'macro',
        name: 'Macroéconomie',
        primaryColor: '#3b82f6',
        lightColor: '#dbeafe',
        darkColor: '#1e40af',
        icon: 'TrendingUp',
    },
    micro: {
        id: 'micro',
        name: 'Microéconomie',
        primaryColor: '#ec4899',
        lightColor: '#fce7f3',
        darkColor: '#9d174d',
        icon: 'PieChart',
    },
    stats: {
        id: 'stats',
        name: 'Statistiques',
        primaryColor: '#10b981',
        lightColor: '#d1fae5',
        darkColor: '#065f46',
        icon: 'BarChart3',
    },
    socio: {
        id: 'socio',
        name: 'Sociologie',
        primaryColor: '#f59e0b',
        lightColor: '#fef3c7',
        darkColor: '#92400e',
        icon: 'Users',
    },
} as const;
