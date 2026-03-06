/**
 * QCM Utilities
 * Helper functions for quiz logic
 */

import type { Question } from './types';

/**
 * Parse text and identify LaTeX formulas between $ signs
 * Returns segments with type indicators for rendering
 */
export function parseLatexSegments(text: string): Array<{ type: 'text' | 'latex'; content: string }> {
    const segments: Array<{ type: 'text' | 'latex'; content: string }> = [];
    const regex = /\$([^$]+)\$/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
            segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        // LaTeX content
        segments.push({ type: 'latex', content: match[1] });
        lastIndex = regex.lastIndex;
    }

    // Remaining text after last match
    if (lastIndex < text.length) {
        segments.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return segments;
}

/**
 * Deterministic shuffle using a seed
 * Ensures consistent ordering for the same seed
 */
export function shuffleWithSeed<T>(array: T[], seed: number): T[] {
    const result = [...array];
    let currentSeed = seed;

    const seededRandom = () => {
        currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
        return currentSeed / 0x7fffffff;
    };

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

/**
 * Fisher-Yates shuffle (random)
 */
export function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Shuffle question options and return new correct index
 */
export function shuffleQuestionOptions(question: Question): { shuffledOptions: string[]; correctIndex: number } {
    const indexedOptions = question.options.map((opt, idx) => ({ opt, originalIndex: idx }));
    const shuffled = shuffle(indexedOptions);

    return {
        shuffledOptions: shuffled.map(item => item.opt),
        correctIndex: shuffled.findIndex(item => item.originalIndex === question.correctIndex),
    };
}

/**
 * Calculate percentage score with one decimal
 */
export function calculateScore(correct: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((correct / total) * 1000) / 10;
}

/**
 * Get encouraging message based on score
 * Returns CSS variable references instead of hardcoded Tailwind color classes
 */
export function getScoreMessage(score: number): { emoji: string; message: string; color: string } {
    if (score >= 90) return { emoji: '\u{1F3C6}', message: 'Excellent !', color: 'var(--color-warning)' };
    if (score >= 75) return { emoji: '\u{1F31F}', message: 'Tres bien !', color: 'var(--color-success)' };
    if (score >= 60) return { emoji: '\u{1F44D}', message: 'Bien joue !', color: 'var(--color-info)' };
    if (score >= 40) return { emoji: '\u{1F4AA}', message: 'Continue !', color: 'var(--color-warning)' };
    return { emoji: '\u{1F4DA}', message: 'Revise encore !', color: 'var(--color-error)' };
}

/**
 * Format time in mm:ss or hh:mm:ss
 */
export function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * LocalStorage keys for QCM persistence
 */
export const STORAGE_KEYS = {
    SESSION_PREFIX: 'qcm_session_',
    HISTORY_PREFIX: 'qcm_history_',
    STATS_PREFIX: 'qcm_stats_',
} as const;
