import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, CheckCircle2, Lightbulb } from 'lucide-react';

const springTransition = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
} as const;

interface ExerciseProps {
  id: string;
  title: string;
  content: ReactNode;
  solution: ReactNode;
  method?: ReactNode;
}

/**
 * Exercise — Design v4
 *
 * Carte blanche, panneaux solution/méthode avec bordure gauche accent.
 * Aucun fond coloré persistant. CSS vars existantes uniquement.
 */
export function Exercise({ title, content, solution, method }: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showMethod, setShowMethod] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-md"
      style={{
        background: 'rgb(var(--surface-1))',
        boxShadow: '0 1px 3px color-mix(in srgb, var(--color-text-primary) 4%, transparent)',
      }}
    >
      {/* Énoncé */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'var(--callout-key-icon-bg)',
              color: 'var(--callout-key-text)',
            }}
          >
            <FileText size={16} />
          </span>
          <h4
            className="font-semibold text-base leading-snug pt-1"
            style={{ color: 'rgb(var(--text))' }}
          >
            {title}
          </h4>
        </div>
        <div
          className="text-base leading-relaxed pl-11"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          {content}
        </div>
      </div>

      {/* Boutons */}
      <div className="flex">
        {method && (
          <button
            onClick={() => setShowMethod(!showMethod)}
            className="flex-1 px-5 py-3.5 flex items-center justify-center gap-2 transition-colors duration-150 focus-visible:outline-none"
            style={{ color: 'var(--callout-warning-text)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--callout-warning-icon-bg)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '';
            }}
            aria-expanded={showMethod}
          >
            <Lightbulb size={16} />
            <span className="font-medium text-sm">
              {showMethod ? 'Masquer la méthode' : 'Méthode du prof'}
            </span>
            <motion.span
              animate={{ rotate: showMethod ? 180 : 0 }}
              transition={springTransition}
            >
              <ChevronDown size={15} />
            </motion.span>
          </button>
        )}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex-1 px-5 py-3.5 flex items-center justify-center gap-2 transition-colors duration-150 focus-visible:outline-none"
          style={{ color: 'var(--callout-example-text)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--callout-example-icon-bg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '';
          }}
          aria-expanded={showSolution}
        >
          <CheckCircle2 size={16} />
          <span className="font-medium text-sm">
            {showSolution ? 'Masquer la correction' : 'Voir la correction'}
          </span>
          <motion.span
            animate={{ rotate: showSolution ? 180 : 0 }}
            transition={springTransition}
          >
            <ChevronDown size={15} />
          </motion.span>
        </button>
      </div>

      {/* Méthode du professeur */}
      <AnimatePresence initial={false}>
        {showMethod && method && (
          <motion.div
            key="method"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div
              className="p-6 border-l-4"
              style={{
                borderLeftColor: 'var(--callout-warning-text)',
                background: 'rgb(var(--surface-1))',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} style={{ color: 'var(--callout-warning-text)' }} />
                <span
                  className="font-semibold text-sm"
                  style={{ color: 'rgb(var(--text))' }}
                >
                  Méthode du professeur
                </span>
              </div>
              <div
                className="text-base leading-relaxed"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {method}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Correction */}
      <AnimatePresence initial={false}>
        {showSolution && (
          <motion.div
            key="solution"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div
              className="p-6 border-l-4"
              style={{
                borderLeftColor: 'var(--callout-example-text)',
                background: 'rgb(var(--surface-1))',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} style={{ color: 'var(--callout-example-text)' }} />
                <span
                  className="font-semibold text-sm"
                  style={{ color: 'rgb(var(--text))' }}
                >
                  Correction détaillée
                </span>
              </div>
              <div
                className="text-base leading-relaxed"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {solution}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ExerciseGroupProps {
  title: string;
  chapter: string;
  exerciseCount: number;
  children: ReactNode;
}

/**
 * ExerciseGroup — Design v4
 *
 * Groupe d'exercices collapsible.
 */
export function ExerciseGroup({ title, chapter, exerciseCount, children }: ExerciseGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 rounded-xl flex items-center justify-between transition-all duration-200 focus-visible:outline-none"
        style={{
          background: 'rgb(var(--surface-1))',
        }}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: 'var(--callout-key-icon-bg)',
              color: 'var(--callout-key-text)',
            }}
          >
            {chapter}
          </span>
          <span className="font-semibold text-base" style={{ color: 'rgb(var(--text))' }}>
            {title}
          </span>
          <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {exerciseCount} exercice{exerciseCount > 1 ? 's' : ''}
          </span>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={springTransition}
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="group-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
