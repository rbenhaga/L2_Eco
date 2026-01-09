import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, FileText, CheckCircle2, Lightbulb } from 'lucide-react';

interface ExerciseProps {
  id: string;
  title: string;
  content: ReactNode;
  solution: ReactNode;
  method?: ReactNode;
}

export function Exercise({ title, content, solution, method }: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showMethod, setShowMethod] = useState(false);

  return (
    <div className="mb-8 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {/* Énoncé */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-3 mb-4">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText size={18} />
          </span>
          <h4 className="font-semibold text-gray-900 text-lg leading-tight">{title}</h4>
        </div>
        <div className="text-gray-700 leading-relaxed pl-11">{content}</div>
      </div>

      {/* Boutons */}
      <div className="flex border-t border-gray-100">
        {method && (
          <button
            onClick={() => setShowMethod(!showMethod)}
            className="flex-1 px-6 py-4 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 transition-colors border-r border-gray-100"
          >
            <Lightbulb size={18} />
            <span className="font-medium">{showMethod ? 'Masquer la méthode' : 'Méthode du prof'}</span>
            {showMethod ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex-1 px-6 py-4 flex items-center justify-center gap-2 text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          <CheckCircle2 size={18} />
          <span className="font-medium">{showSolution ? 'Masquer la correction' : 'Voir la correction'}</span>
          {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Méthode du professeur */}
      {showMethod && method && (
        <div className="p-6 bg-amber-50 border-t border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={20} className="text-amber-600" />
            <span className="font-semibold text-amber-800">Méthode du professeur</span>
          </div>
          <div className="text-amber-900 leading-relaxed">{method}</div>
        </div>
      )}

      {/* Correction */}
      {showSolution && (
        <div className="p-6 bg-emerald-50 border-t border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="font-semibold text-emerald-800">Correction détaillée</span>
          </div>
          <div className="text-emerald-900 leading-relaxed">{solution}</div>
        </div>
      )}
    </div>
  );
}

interface ExerciseGroupProps {
  title: string;
  chapter: string;
  exerciseCount: number;
  children: ReactNode;
}

export function ExerciseGroup({ title, chapter, exerciseCount, children }: ExerciseGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 bg-white rounded-xl border border-gray-200 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all"
      >
        <div className="flex items-center gap-4">
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">{chapter}</span>
          <span className="font-semibold text-gray-900 text-lg">{title}</span>
          <span className="text-gray-400 text-sm">{exerciseCount} exercices</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-sm">{expanded ? 'Réduire' : 'Développer'}</span>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {expanded && (
        <div className="mt-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
