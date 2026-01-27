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
    <div 
      className="rounded-2xl p-6 sm:p-8 my-6 overflow-x-auto border"
      style={{
        background: highlight 
          ? 'linear-gradient(135deg, rgb(var(--accent) / 0.06), rgb(var(--accent) / 0.03))'
          : 'rgb(var(--surface-1))',
        borderColor: highlight ? 'rgb(var(--accent) / 0.25)' : 'rgb(var(--border))',
        boxShadow: highlight
          ? '0 2px 12px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          : '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {label && (
          <div 
            className="px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ 
              background: highlight ? 'rgb(var(--accent) / 0.12)' : 'rgb(var(--surface-2))',
              color: highlight ? 'rgb(var(--accent))' : 'rgb(var(--text-muted))',
              border: `1px solid ${highlight ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border))'}`
            }}
          >
            {label}
          </div>
        )}
        <div 
          className="text-xl sm:text-2xl w-full text-center"
          style={{ color: 'rgb(var(--text))' }}
        >
          <Math display>{children}</Math>
        </div>
      </div>
    </div>
  );
}
