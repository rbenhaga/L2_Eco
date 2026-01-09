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
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg w-fit">
        <button
          onClick={() => setView('full')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            view === 'full'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Cours complet
        </button>
        <button
          onClick={() => setView('quick')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            view === 'quick'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
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

// Version rapide - résumé en 3 points
interface QuickSummaryProps {
  points: string[];
  onViewFull: () => void;
}

export function QuickSummary({ points }: QuickSummaryProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500" />
        En {points.length} points
      </h3>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {i + 1}
            </span>
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
