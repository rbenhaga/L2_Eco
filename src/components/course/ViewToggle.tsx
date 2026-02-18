import { useState, type ReactNode } from 'react';
import { Zap, BookOpen } from 'lucide-react';

interface ViewToggleProps {
  quickContent: ReactNode;
  fullContent: ReactNode;
}

export function ViewToggle({ quickContent, fullContent }: ViewToggleProps) {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <div>
      {/* Toggle buttons */}
      <div
        className="flex gap-2 mb-8 p-1 rounded-lg w-fit"
        style={{ background: 'var(--color-bg-overlay)' }}
      >
        <button
          onClick={() => setView('full')}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
          style={view === 'full'
            ? { background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)', boxShadow: 'var(--shadow-sm)' }
            : { color: 'var(--color-text-secondary)' }
          }
        >
          <BookOpen className="w-4 h-4" />
          Cours complet
        </button>
        <button
          onClick={() => setView('quick')}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
          style={view === 'quick'
            ? { background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)', boxShadow: 'var(--shadow-sm)' }
            : { color: 'var(--color-text-secondary)' }
          }
        >
          <Zap className="w-4 h-4" />
          L'essentiel
        </button>
      </div>

      {/* Content */}
      {view === 'quick' ? quickContent : fullContent}
    </div>
  );
}

// Version rapide - r\u00e9sum\u00e9 en 3 points
interface QuickSummaryProps {
  points: string[];
  onViewFull: () => void;
}

export function QuickSummary({ points }: QuickSummaryProps) {
  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        background: 'var(--color-bg-overlay)',
        borderColor: 'var(--color-border-default)',
      }}
    >
      <h3
        className="font-semibold mb-4 flex items-center gap-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        <Zap className="w-5 h-5" style={{ color: 'var(--color-warning)' }} />
        En {points.length} points
      </h3>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: 'var(--color-text-primary)',
                color: 'var(--color-accent-foreground)',
              }}
            >
              {i + 1}
            </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
