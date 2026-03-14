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

  const classes = [
    display ? 'editorial-math editorial-math--display' : 'editorial-math editorial-math--inline',
    className,
  ].filter(Boolean).join(' ');

  return <span ref={ref} className={classes} />;
}

interface FormulaBoxProps {
  children: string;
  label?: string;
  highlight?: boolean;
  variant?: 'default' | 'reference' | 'derivation';
}

export function FormulaBox({ children, label, highlight = false, variant }: FormulaBoxProps) {
  const tone = variant ?? (highlight ? 'reference' : 'default');

  return (
    <div className={`editorial-formula editorial-formula--${tone}`}>
      {label ? <p className="editorial-formula__label">{label}</p> : null}
      <div className="editorial-formula__surface">
        <Math display>{children}</Math>
      </div>
    </div>
  );
}
