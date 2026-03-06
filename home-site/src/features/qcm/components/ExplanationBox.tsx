/**
 * ExplanationBox Component
 * Shows explanation after answering with visual feedback
 */

import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { RenderWithMath } from './QuestionCard';

interface ExplanationBoxProps {
    isCorrect: boolean;
    explanation: string;
    className?: string;
}

export function ExplanationBox({ isCorrect, explanation, className = '' }: ExplanationBoxProps) {
    return (
        <div
            className={`p-4 sm:p-5 rounded-xl ${className}`}
            style={{
                background: isCorrect ? 'var(--color-success-subtle)' : 'var(--color-error-subtle)',
                border: `2px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
            }}
        >
            <div className="flex items-start gap-3">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}
                >
                    {isCorrect ? (
                        <CheckCircle size={18} style={{ color: 'var(--color-accent-foreground)' }} />
                    ) : (
                        <XCircle size={18} style={{ color: 'var(--color-accent-foreground)' }} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p
                        className="font-semibold"
                        style={{ color: isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}
                    >
                        {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
                    </p>

                    <div className="mt-2 flex items-start gap-2">
                        <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-warning)' }} />
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            <RenderWithMath text={explanation} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
