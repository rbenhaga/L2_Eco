/**
 * AnswerOption Component
 * Individual answer option with touch-friendly sizing and visual feedback
 */

import { type ReactNode } from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
    index: number;
    content: ReactNode;
    isSelected: boolean;
    isCorrect?: boolean | null;
    isRevealed: boolean;
    disabled: boolean;
    onSelect: (index: number) => void;
    activeColor?: string;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function AnswerOption({
    index,
    content,
    isSelected,
    isCorrect,
    isRevealed,
    disabled,
    onSelect,
    activeColor = '#3b82f6', // Default blue
}: AnswerOptionProps) {
    const handleClick = () => {
        if (!disabled) {
            onSelect(index);
        }
    };

    // Determine visual state
    const getStateStyles = () => {
        if (!isRevealed) {
            if (isSelected) {
                // Return generic active class, but color is handled via style
                return 'bg-indigo-50 dark:bg-white/10 border-transparent ring-1 ring-indigo-200 dark:ring-white/20';
            }
            return 'border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/10 active:scale-[0.99]';
        }

        // Revealed state
        if (isSelected) {
            if (isCorrect) {
                return 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-500/20';
            }
            return 'border-rose-500/50 bg-rose-50 dark:bg-rose-500/10 ring-1 ring-rose-500/20';
        }

        // Not selected but revealed - show correct answer
        if (isCorrect) {
            return 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-500/20 opacity-80';
        }

        return 'border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 opacity-40';
    };

    const getLabelStyles = () => {
        if (!isRevealed) {
            if (isSelected) {
                return 'text-white shadow-lg';
            }
            return 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-white/5';
        }

        if (isSelected) {
            if (isCorrect) {
                return 'bg-emerald-500 text-white shadow-lg';
            }
            return 'bg-rose-500 text-white shadow-lg';
        }

        if (isCorrect) {
            return 'bg-emerald-500 text-white shadow-lg';
        }

        return 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/5';
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
        w-full p-4 sm:p-5
        flex items-start gap-4
        border rounded-2xl
        text-left
        transition-all duration-200 ease-out
        min-h-[64px]
        active:scale-[0.99]
        ${getStateStyles()}
        ${disabled && !isRevealed ? 'cursor-not-allowed opacity-50' : ''}
        ${!disabled ? 'cursor-pointer' : ''}
      `}
            style={
                (!isRevealed && isSelected) ? {
                    borderColor: `${activeColor}80`, // 50% opacity
                    backgroundColor: `${activeColor}15`, // 10% opacity
                    boxShadow: `0 0 0 1px ${activeColor}40` // ring
                } : {}
            }
        >
            {/* Option label */}
            <span
                className={`
          w-8 h-8 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-xl
          font-bold text-sm
          shrink-0
          transition-colors duration-200
          ${getLabelStyles()}
        `}
                style={
                    (!isRevealed && isSelected) ? { backgroundColor: activeColor } : {}
                }
            >
                {isRevealed && isSelected ? (
                    isCorrect ? <Check size={20} /> : <X size={20} />
                ) : isRevealed && isCorrect ? (
                    <Check size={20} />
                ) : (
                    OPTION_LABELS[index]
                )}
            </span>

            {/* Option content */}
            <span className={`flex-1 text-base leading-relaxed pt-1.5 transition-colors ${isSelected || isRevealed ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                {content}
            </span>
        </button>
    );
}
