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
    activeColor = 'var(--color-info)', // Default blue
}: AnswerOptionProps) {
    const handleClick = () => {
        if (!disabled) {
            onSelect(index);
        }
    };

    // Determine visual state styles (inline)
    const getStateStyles = (): React.CSSProperties => {
        if (!isRevealed) {
            if (isSelected) {
                return {
                    borderColor: `${activeColor}80`,
                    backgroundColor: `${activeColor}15`,
                    boxShadow: `0 0 0 1px ${activeColor}40`,
                };
            }
            return {
                borderColor: 'var(--color-border-default)',
                background: 'var(--color-bg-raised)',
            };
        }

        // Revealed state
        if (isSelected) {
            if (isCorrect) {
                return {
                    borderColor: 'color-mix(in srgb, var(--color-success) 50%, transparent)',
                    background: 'var(--color-success-subtle)',
                    boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-success) 20%, transparent)',
                };
            }
            return {
                borderColor: 'color-mix(in srgb, var(--color-error) 50%, transparent)',
                background: 'var(--color-error-subtle)',
                boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-error) 20%, transparent)',
            };
        }

        // Not selected but revealed - show correct answer
        if (isCorrect) {
            return {
                borderColor: 'color-mix(in srgb, var(--color-success) 50%, transparent)',
                background: 'var(--color-success-subtle)',
                boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-success) 20%, transparent)',
                opacity: 0.8,
            };
        }

        return {
            borderColor: 'var(--color-border-default)',
            background: 'var(--color-bg-raised)',
            opacity: 0.4,
        };
    };

    const getLabelStyles = (): React.CSSProperties => {
        if (!isRevealed) {
            if (isSelected) {
                return {
                    backgroundColor: activeColor,
                    color: 'var(--color-accent-foreground)',
                    boxShadow: 'var(--shadow-lg)',
                };
            }
            return {
                background: 'var(--color-bg-overlay)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border-default)',
            };
        }

        if (isSelected) {
            if (isCorrect) {
                return {
                    background: 'var(--color-success)',
                    color: 'var(--color-accent-foreground)',
                    boxShadow: 'var(--shadow-lg)',
                };
            }
            return {
                background: 'var(--color-error)',
                color: 'var(--color-accent-foreground)',
                boxShadow: 'var(--shadow-lg)',
            };
        }

        if (isCorrect) {
            return {
                background: 'var(--color-success)',
                color: 'var(--color-accent-foreground)',
                boxShadow: 'var(--shadow-lg)',
            };
        }

        return {
            background: 'var(--color-bg-overlay)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border-default)',
        };
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
        ${disabled && !isRevealed ? 'cursor-not-allowed opacity-50' : ''}
        ${!disabled ? 'cursor-pointer' : ''}
      `}
            style={getStateStyles()}
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
        `}
                style={getLabelStyles()}
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
            <span
                className="flex-1 text-base leading-relaxed pt-1.5 transition-colors"
                style={{ color: isSelected || isRevealed ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
            >
                {content}
            </span>
        </button>
    );
}
