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
      <span className="font-semibold text-sm text-slate-800">{term}</span>
      <button
        onClick={() => setShow(!show)}
        className={`p-1.5 rounded-full transition-all bg-slate-100/80 hover:bg-slate-200 text-slate-600 ${show ? 'ring-2 ring-gray-300' : ''}`}
        aria-label={`Aide pour ${term}`}
      >
        <HelpCircle size={16} />
      </button>
      
      {show && (
        <div className="absolute right-0 top-full mt-2 w-80 p-4 rounded-xl border border-slate-200 shadow-xl z-50 bg-white">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-bold text-base text-slate-900">{term}</h4>
            <button onClick={() => setShow(false)} className="p-1 rounded hover:bg-slate-100/80 text-slate-500">
              <X size={16} />
            </button>
          </div>
          
          {formula && (
            <div className="mb-3 p-3 bg-slate-100/50 rounded-lg border border-gray-100 text-center">
              <LatexFormula formula={formula} />
            </div>
          )}
          
          <div className="text-sm leading-relaxed text-slate-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
