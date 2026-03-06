import { useEffect, useRef } from 'react';
import katex from 'katex';
import { sanitizeLatexInput } from '../utils/latexSanitizer';

interface MathProps {
  children: string;
  display?: boolean;
  className?: string;
}

export function Math({ children, display = false, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const latex = sanitizeLatexInput(children);
      katex.render(latex, ref.current, {
        displayMode: display,
        throwOnError: true,
        strict: 'error',
        trust: false,
      });
    }
  }, [children, display]);

  return <span ref={ref} className={className} />;
}

interface FormulaBoxProps {
  children: string;
  label?: string;
  /** highlight est conservé pour compatibilité API mais ne change plus le fond */
  highlight?: boolean;
}

/**
 * FormulaBox — Design v4
 *
 * Aucun fond coloré. Centrage pur avec bordures horizontales discrètes.
 * Lisible, aéré, neutre.
 */
export function FormulaBox({ children, label }: FormulaBoxProps) {
  return (
    <div className="my-5 overflow-x-auto">
      {label && (
        <p
          className="text-center text-[11px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </p>
      )}
      <div
        className="py-3 text-center border-y"
        style={{
          borderColor: 'rgb(var(--border))',
          color: 'var(--color-text-primary)',
        }}
      >
        <Math display>{children}</Math>
      </div>
    </div>
  );
}
