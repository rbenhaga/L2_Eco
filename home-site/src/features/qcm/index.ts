/**
 * QCM Feature
 * Unified quiz system - single source of truth for all subjects
 */

// Main component
export { QCMPlayer } from './components';
export {
    QuestionCard,
    RenderWithMath,
    AnswerOption,
    ExplanationBox,
    ScoreBoard,
    ChapterSelector
} from './components';

// Hook
export { useQCM } from './hooks/useQCM';

// Types
export type {
    Question,
    Chapter,
    QCMConfig,
    QuizMode,
    AnswerRecord,
    QuizSession,
    QuizResult,
    SubjectTheme,
} from './types';

export { SUBJECTS } from './types';

// Utilities
export {
    parseLatexSegments,
    shuffleWithSeed,
    shuffle,
    shuffleQuestionOptions,
    calculateScore,
    getScoreMessage,
    formatTime,
    generateSessionId,
    STORAGE_KEYS,
} from './utils';
