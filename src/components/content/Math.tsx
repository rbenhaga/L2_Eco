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
        ? 'bg-blue-50 border border-blue-200'
        : 'bg-slate-50 border border-slate-200'
      }`}>
      {label && (
        <p className={`text-xs sm:text-sm font-medium uppercase tracking-wide mb-2 sm:mb-4 ${highlight ? 'text-blue-600' : 'text-slate-500'
          }`}>
          {label}
        </p>
      )}
      <div className={`text-base sm:text-lg md:text-xl min-w-0 ${highlight ? 'text-blue-900' : 'text-slate-900'}`}>
        <Math display>{children}</Math>
      </div>
    </div>
  );
}
