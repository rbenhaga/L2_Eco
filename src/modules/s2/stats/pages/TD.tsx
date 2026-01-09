import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileText,
  Calendar,
  ArrowLeft,
  Star,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { Math } from '../../../../components';
import {
  tdThemes,
  type TDTheme,
  type Exercise as ExerciseType,
  type TDSheet,
  type Difficulty,
} from '../data/td';

// Composant pour afficher la difficulté avec des étoiles
function DifficultyStars({ level }: { level: Difficulty }) {
  const colors = {
    1: 'text-green-500',
    2: 'text-amber-500',
    3: 'text-red-500',
  };
  const labels = {
    1: 'Facile',
    2: 'Moyen',
    3: 'Difficile',
  };

  return (
    <div className="flex items-center gap-1" title={labels[level]}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= level ? colors[level] : 'text-slate-300 dark:text-slate-700'}
          fill={i <= level ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

// Composant pour les tags de compétences
function SkillTags({ tags }: { tags: string[] }) {
  const tagColors: Record<string, string> = {
    Bayes: 'bg-purple-100 dark:bg-purple-950/30 text-purple-700',
    Espérance: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700',
    Variance: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700',
    Covariance: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700',
    Intégration: 'bg-rose-100 text-rose-700',
    Densité: 'bg-rose-100 text-rose-700',
    'Fonction de répartition': 'bg-rose-100 text-rose-700',
    'Loi Binomiale': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Loi Poisson': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Loi Normale': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Loi Exponentielle': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Loi Gamma': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Loi Uniforme': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    Approximations: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700',
    'VA 2D': 'bg-indigo-100 text-indigo-700',
    'Loi marginale': 'bg-indigo-100 text-indigo-700',
    'Loi conditionnelle': 'bg-indigo-100 text-indigo-700',
    'Méthode des 4 bornes': 'bg-indigo-100 text-indigo-700',
    Régression: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300'}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// Composant pour les rappels de cours - Design minimaliste
function CourseReminders({ td }: { td: TDSheet }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!td.reminders || td.reminders.length === 0) return null;

  return (
    <div className="mb-8 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-100/50 dark:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-slate-500 dark:text-slate-500" />
          <span className="font-medium text-slate-900 dark:text-white">Rappels de cours</span>
          <span className="text-sm text-slate-500 dark:text-slate-500">{td.reminders.length}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-500 dark:text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="grid gap-4 sm:grid-cols-2 pt-4">
            {td.reminders.map((reminder, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xs text-slate-600 dark:text-slate-400">{reminder.title}</div>
                <div className="text-slate-900 dark:text-white text-sm">
                  <Math>{reminder.formula}</Math>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: ExerciseType }) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="mb-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900/80 shadow-sm">
      <div className="p-6">
        {/* Header avec titre, difficulté et tags */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 text-blue-700 flex items-center justify-center">
              <FileText size={18} />
            </span>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight">{exercise.title}</h4>
          </div>
          {exercise.difficulty && <DifficultyStars level={exercise.difficulty} />}
        </div>

        {/* Tags de compétences */}
        {exercise.tags && exercise.tags.length > 0 && (
          <div className="pl-11 mb-4">
            <SkillTags tags={exercise.tags} />
          </div>
        )}

        {/* Contenu de l'exercice */}
        <div className="text-slate-800 dark:text-slate-200 leading-relaxed pl-11">{exercise.content}</div>
      </div>

      {/* Bouton indice (si disponible) */}
      {exercise.hint && !showSolution && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="w-full px-6 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 dark:bg-amber-950/30 transition-colors border-t border-gray-100"
        >
          <Lightbulb size={16} />
          <span className="font-medium text-sm">{showHint ? 'Masquer l\'indice' : 'Voir un indice'}</span>
        </button>
      )}

      {/* Affichage de l'indice */}
      {showHint && !showSolution && exercise.hint && (
        <div className="px-6 py-4 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-200">
          <div className="flex items-start gap-2">
            <Lightbulb size={18} className="text-amber-600 mt-0.5" />
            <p className="text-amber-800 text-sm">{exercise.hint}</p>
          </div>
        </div>
      )}

      {/* Bouton correction */}
      <button
        onClick={() => setShowSolution(!showSolution)}
        className="w-full px-6 py-4 flex items-center justify-center gap-2 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 transition-colors border-t border-gray-100"
      >
        <CheckCircle2 size={18} />
        <span className="font-medium">{showSolution ? 'Masquer la correction' : 'Voir la correction'}</span>
        {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showSolution && (
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border-t border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="font-semibold text-emerald-800">Correction détaillée</span>
          </div>
          <div className="text-emerald-900 leading-relaxed">{exercise.solution}</div>
        </div>
      )}
    </div>
  );
}

function TDThemeCard({ theme, onClick }: { theme: TDTheme; onClick: () => void }) {
  const totalExercises = theme.years.reduce((acc, y) => acc + y.td.exercises.length, 0);
  
  return (
    <button
      onClick={onClick}
      className="w-full p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-300 hover:shadow-md transition-all text-left group"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 text-blue-700 flex items-center justify-center font-bold text-lg">
          {theme.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 transition-colors">
              {theme.title}
            </h2>
            <span className="shrink-0 text-xs text-slate-500 dark:text-slate-500 bg-slate-100/80 dark:bg-white/5 px-2 py-1 rounded-full">
              {totalExercises} ex.
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{theme.description}</p>
          <span className="inline-block mt-2 text-xs text-blue-600 font-medium">{theme.chapter}</span>
        </div>
      </div>
    </button>
  );
}

function TDDetailView({ theme, onBack }: { theme: TDTheme; onBack: () => void }) {
  const [selectedYear, setSelectedYear] = useState(theme.years[0].year);
  const selectedTD = theme.years.find(y => y.year === selectedYear)?.td;

  return (
    <div>
      {/* Header avec retour */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Retour aux TD</span>
      </button>

      {/* Titre du TD */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-950/30 text-white flex items-center justify-center font-bold">
            {theme.number}
          </div>
          <span className="px-2.5 py-1 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">{theme.chapter}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">TD{theme.number} — {theme.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{theme.description}</p>
      </div>

      {/* Sélection d'année */}
      {theme.years.length > 1 && (
        <div className="flex gap-2 mb-8">
          {theme.years.map((y) => (
            <button
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                selectedYear === y.year
                  ? 'bg-blue-600 dark:bg-blue-950/30 text-white shadow-lg'
                  : 'bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-white/10'
              }`}
            >
              <Calendar size={16} />
              {y.year}
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                selectedYear === y.year ? 'bg-white/20' : 'bg-slate-200 dark:bg-white/10'
              }`}>
                {y.td.exercises.length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Info année unique */}
      {theme.years.length === 1 && (
        <div className="flex items-center gap-2 mb-8 text-slate-600 dark:text-slate-400">
          <Calendar size={16} />
          <span>{theme.years[0].year}</span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span>{theme.years[0].td.exercises.length} exercices</span>
        </div>
      )}

      {/* Rappels de cours + Liste des exercices */}
      {selectedTD && (
        <div>
          <CourseReminders td={selectedTD} />
          {selectedTD.exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TD() {
  const [selectedTheme, setSelectedTheme] = useState<TDTheme | null>(null);

  const totalExercises = tdThemes.reduce((acc, theme) => 
    acc + theme.years.reduce((yAcc, y) => yAcc + y.td.exercises.length, 0), 0
  );

  if (selectedTheme) {
    return (
      <main className="max-w-2xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6 pb-12">
        <TDDetailView theme={selectedTheme} onBack={() => setSelectedTheme(null)} />
      </main>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6 pb-12">
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">TD Corrigés</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{totalExercises} exercices · {tdThemes.length} TD</p>
      </div>
      <div className="space-y-3">
        {tdThemes.map((theme) => (
          <TDThemeCard 
            key={theme.id} 
            theme={theme}
            onClick={() => setSelectedTheme(theme)} 
          />
        ))}
      </div>
    </div>
  );
}
