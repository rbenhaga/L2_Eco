import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  children: string;
  display?: boolean;
  className?: string;
}

export function Math({ children, display = false, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    }
  }, [children, display]);

  return <span ref={ref} className={className} />;
}

interface FormulaBoxProps {
  children: string;
  label?: string;
  highlight?: boolean;
}

export function FormulaBox({ children, label, highlight = false }: FormulaBoxProps) {
  return (
    <div className={`rounded-xl p-4 sm:p-6 md:p-8 my-4 sm:my-6 text-center overflow-x-auto transition-colors ${highlight
        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30'
        : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10'
      }`}>
      {label && (
        <p className={`text-xs sm:text-sm font-medium uppercase tracking-wide mb-2 sm:mb-4 ${highlight ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
          }`}>
          {label}
        </p>
      )}
      <div className={`text-base sm:text-lg md:text-xl min-w-0 ${highlight ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}`}>
        <Math display>{children}</Math>
      </div>
    </div>
  );
}
