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
      className="rounded-xl p-4 sm:p-5 my-4 overflow-x-auto"
      style={{
        background: highlight
          ? 'var(--callout-formula-bg)'
          : 'var(--color-bg-overlay)',
        border: `1px solid ${highlight ? 'var(--callout-formula-border)' : 'var(--color-border-default)'}`,
        boxShadow: highlight
          ? '0 2px 12px color-mix(in srgb, var(--color-accent) 8%, transparent)'
          : 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {label && (
          <span
            className="text-[11px] font-semibold uppercase tracking-wider shrink-0 px-2.5 py-0.5 rounded-full"
            style={{
              background: highlight ? 'var(--callout-formula-icon-bg)' : 'var(--color-bg-overlay)',
              color: highlight ? 'var(--callout-formula-text)' : 'var(--color-text-muted)',
              border: `1px solid ${highlight ? 'var(--callout-formula-border)' : 'var(--color-border-default)'}`,
            }}
          >
            {label}
          </span>
        )}
        <div
          className="text-base sm:text-lg w-full text-center py-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <Math display>{children}</Math>
        </div>
      </div>
    </div>
  );
}
