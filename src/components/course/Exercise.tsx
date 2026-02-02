import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, CheckCircle2, Lightbulb } from 'lucide-react';

/**
 * Spring animation preset for smooth expand/collapse
 */
const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
} as const;

const fadeSlideVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: { ...springTransition, opacity: { duration: 0.2 } }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 }
    }
};

interface ExerciseProps {
    id: string;
    title: string;
    content: ReactNode;
    solution: ReactNode;
    method?: ReactNode;
}

/**
 * Exercise — Design Contract v3 compliant
 *
 * Interactive exercise component with expandable solution and method
 * Uses CSS custom properties and spring animations
 */
export function Exercise({ title, content, solution, method }: ExerciseProps) {
    const [showSolution, setShowSolution] = useState(false);
    const [showMethod, setShowMethod] = useState(false);

    return (
        <div className="
            mb-[var(--space-8)]
            rounded-[var(--radius-lg)]
            border border-[rgb(var(--border))]
            overflow-hidden
            bg-[rgb(var(--surface-1))]
            shadow-[var(--shadow-1)]
            transition-shadow duration-[var(--duration-normal)]
            hover:shadow-[var(--shadow-2)]
        ">
            {/* Énoncé */}
            <div className="p-[var(--space-6)] border-b border-[rgb(var(--border))]">
                <div className="flex items-start gap-[var(--space-3)] mb-[var(--space-4)]">
                    <span className="
                        shrink-0 w-8 h-8
                        rounded-[var(--radius-sm)]
                        bg-[var(--color-macro-light)]
                        text-[var(--color-macro)]
                        flex items-center justify-center
                    ">
                        <FileText size={18} />
                    </span>
                    <h4 className="font-semibold text-[rgb(var(--text))] text-lg leading-tight">
                        {title}
                    </h4>
                </div>
                <div className="text-[rgb(var(--text-secondary))] leading-relaxed pl-11">
                    {content}
                </div>
            </div>

            {/* Boutons */}
            <div className="flex border-t border-[rgb(var(--border))]">
                {method && (
                    <button
                        onClick={() => setShowMethod(!showMethod)}
                        className="
                            flex-1 px-[var(--space-6)] py-[var(--space-4)]
                            flex items-center justify-center gap-[var(--space-2)]
                            text-[var(--color-warning)]
                            hover:bg-[var(--color-warning-light)]
                            transition-colors duration-[var(--duration-fast)]
                            border-r border-[rgb(var(--border))]
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-[var(--color-warning)] focus-visible:ring-inset
                        "
                        aria-expanded={showMethod}
                    >
                        <Lightbulb size={18} />
                        <span className="font-medium">
                            {showMethod ? 'Masquer la méthode' : 'Méthode du prof'}
                        </span>
                        <motion.span
                            animate={{ rotate: showMethod ? 180 : 0 }}
                            transition={springTransition}
                        >
                            <ChevronDown size={16} />
                        </motion.span>
                    </button>
                )}
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="
                        flex-1 px-[var(--space-6)] py-[var(--space-4)]
                        flex items-center justify-center gap-[var(--space-2)]
                        text-[var(--color-success)]
                        hover:bg-[var(--color-success-light)]
                        transition-colors duration-[var(--duration-fast)]
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-[var(--color-success)] focus-visible:ring-inset
                    "
                    aria-expanded={showSolution}
                >
                    <CheckCircle2 size={18} />
                    <span className="font-medium">
                        {showSolution ? 'Masquer la correction' : 'Voir la correction'}
                    </span>
                    <motion.span
                        animate={{ rotate: showSolution ? 180 : 0 }}
                        transition={springTransition}
                    >
                        <ChevronDown size={16} />
                    </motion.span>
                </button>
            </div>

            {/* Méthode du professeur */}
            <AnimatePresence>
                {showMethod && method && (
                    <motion.div
                        variants={fadeSlideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <div className="
                            p-[var(--space-6)]
                            bg-[var(--color-warning-light)]
                            border-t border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)]
                        ">
                            <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-4)]">
                                <Lightbulb size={20} className="text-[var(--color-warning)]" />
                                <span className="font-semibold text-[color-mix(in_srgb,var(--color-warning)_80%,black)]">
                                    Méthode du professeur
                                </span>
                            </div>
                            <div className="text-[color-mix(in_srgb,var(--color-warning)_70%,black)] leading-relaxed">
                                {method}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Correction */}
            <AnimatePresence>
                {showSolution && (
                    <motion.div
                        variants={fadeSlideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <div className="
                            p-[var(--space-6)]
                            bg-[var(--color-success-light)]
                            border-t border-[color-mix(in_srgb,var(--color-success)_30%,transparent)]
                        ">
                            <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-4)]">
                                <CheckCircle2 size={20} className="text-[var(--color-success)]" />
                                <span className="font-semibold text-[color-mix(in_srgb,var(--color-success)_80%,black)]">
                                    Correction détaillée
                                </span>
                            </div>
                            <div className="text-[color-mix(in_srgb,var(--color-success)_70%,black)] leading-relaxed">
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
 * ExerciseGroup — Design Contract v3 compliant
 *
 * Collapsible group of exercises with stagger animation on children
 */
export function ExerciseGroup({ title, chapter, exerciseCount, children }: ExerciseGroupProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="mb-[var(--space-6)]">
            <button
                onClick={() => setExpanded(!expanded)}
                className="
                    w-full p-[var(--space-5)]
                    bg-[rgb(var(--surface-1))]
                    rounded-[var(--radius-lg)]
                    border border-[rgb(var(--border))]
                    flex items-center justify-between
                    hover:border-[rgb(var(--border-strong))]
                    hover:shadow-[var(--shadow-1)]
                    transition-all duration-[var(--duration-normal)]
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2
                "
                aria-expanded={expanded}
            >
                <div className="flex items-center gap-[var(--space-4)]">
                    <span className="
                        px-[var(--space-3)] py-[var(--space-1)]
                        bg-[var(--color-macro-light)]
                        text-[var(--color-macro)]
                        rounded-[var(--radius-sm)]
                        text-sm font-semibold
                    ">
                        {chapter}
                    </span>
                    <span className="font-semibold text-[rgb(var(--text))] text-lg">
                        {title}
                    </span>
                    <span className="text-[rgb(var(--text-muted))] text-sm">
                        {exerciseCount} exercices
                    </span>
                </div>
                <div className="flex items-center gap-[var(--space-2)] text-[rgb(var(--text-muted))]">
                    <span className="text-sm">
                        {expanded ? 'Réduire' : 'Développer'}
                    </span>
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={springTransition}
                    >
                        <ChevronDown size={20} />
                    </motion.span>
                </div>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="mt-[var(--space-4)] space-y-[var(--space-4)]">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
