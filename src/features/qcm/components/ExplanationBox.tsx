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
            className={`
        p-4 sm:p-5 rounded-xl border-2
        ${isCorrect
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-500/30'
                    : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-500/30'
                }
        ${className}
      `}
        >
            <div className="flex items-start gap-3">
                <div className={`
          w-8 h-8 rounded-full flex items-center justify-center shrink-0
          ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
        `}>
                    {isCorrect ? (
                        <CheckCircle size={18} className="text-white" />
                    ) : (
                        <XCircle size={18} className="text-white" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${isCorrect ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                        {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse'}
                    </p>

                    <div className="mt-2 flex items-start gap-2">
                        <Lightbulb size={16} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                            <RenderWithMath text={explanation} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
