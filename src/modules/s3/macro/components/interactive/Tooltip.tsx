import { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface TooltipProps {
  term: string;
  children: React.ReactNode;
  formula?: string;
}

// Composant qui rend le LaTeX de manière synchrone
function LatexFormula({ formula }: { formula: string }) {
  const html = katex.renderToString(formula, {
    throwOnError: false,
    displayMode: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Tooltip({ term, children, formula }: TooltipProps) {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    if (show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  return (
    <div className="flex items-center justify-between mb-2" ref={tooltipRef}>
      <span className="font-semibold text-sm text-[var(--color-text-primary)]">{term}</span>
      <button
        onClick={() => setShow(!show)}
        className={`p-1.5 rounded-full transition-all bg-[var(--color-bg-overlay)]/80 hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] ${show ? 'ring-2 ring-[var(--color-border-strong)]' : ''}`}
        aria-label={`Aide pour ${term}`}
      >
        <HelpCircle size={16} />
      </button>
      
      {show && (
        <div className="absolute right-0 top-full mt-2 w-80 p-4 rounded-xl border border-[var(--color-border-default)] shadow-xl z-50 bg-[var(--color-bg-raised)]">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-bold text-base text-[var(--color-text-primary)]">{term}</h4>
            <button onClick={() => setShow(false)} className="p-1 rounded hover:bg-[var(--color-bg-overlay)]/80 text-[var(--color-text-muted)]">
              <X size={16} />
            </button>
          </div>
          
          {formula && (
            <div className="mb-3 p-3 bg-[var(--color-bg-overlay)]/50 rounded-lg border border-[var(--color-border-default)] text-center">
              <LatexFormula formula={formula} />
            </div>
          )}
          
          <div className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
