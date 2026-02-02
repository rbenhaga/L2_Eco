import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, BookOpen, HelpCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchItem {
    id: string;
    title: string;
    description: string;
    path: string;
    type: 'chapter' | 'exercise' | 'qcm' | 'revision' | 'module';
    subject: 'macro' | 'micro' | 'stats' | 'socio';
    keywords: string[];
}

// Searchable content database
const searchDatabase: SearchItem[] = [
    // Macroéconomie
    { id: 'macro-home', title: 'Macroéconomie', description: 'Hub de révision macroéconomie', path: '/macro', type: 'module', subject: 'macro', keywords: ['is-lm', 'ws-ps', 'as-ad', 'phillips'] },
    { id: 'macro-ch1', title: 'Introduction & IS-LM', description: 'Court terme, équilibre macroéconomique, multiplicateur', path: '/macro/chapitre-1', type: 'chapter', subject: 'macro', keywords: ['is-lm', 'multiplicateur', 'équilibre', 'court terme', 'moyen terme'] },
    { id: 'macro-ch2', title: 'Le Marché du Travail', description: 'Modèle WS-PS, chômage naturel', path: '/macro/chapitre-2', type: 'chapter', subject: 'macro', keywords: ['ws-ps', 'chômage', 'salaire', 'emploi', 'travail'] },
    { id: 'macro-ch3', title: "L'Équilibre AS-AD", description: 'Synthèse IS-LM et WS-PS, stagflation', path: '/macro/chapitre-3', type: 'chapter', subject: 'macro', keywords: ['as-ad', 'offre globale', 'demande globale', 'stagflation'] },
    { id: 'macro-ch4', title: 'Politiques & Phillips', description: 'BCE, dette publique, courbe de Phillips', path: '/macro/chapitre-4', type: 'chapter', subject: 'macro', keywords: ['phillips', 'bce', 'politique monétaire', 'inflation', 'dette'] },
    { id: 'macro-qcm', title: 'QCM Macroéconomie', description: 'Questions à choix multiples', path: '/macro/qcm', type: 'qcm', subject: 'macro', keywords: ['qcm', 'quiz', 'exercices', 'entraînement'] },
    { id: 'macro-revision', title: 'Fiche de révision Macro', description: 'Synthèse complète du cours', path: '/macro/revision', type: 'revision', subject: 'macro', keywords: ['fiche', 'révision', 'synthèse', 'résumé'] },
    { id: 'macro-exercices', title: 'Exercices Macro', description: 'Exercices corrigés type TD', path: '/macro/exercices', type: 'exercise', subject: 'macro', keywords: ['td', 'exercices', 'corrigés'] },

    // Microéconomie
    { id: 'micro-home', title: 'Microéconomie', description: 'Hub de révision microéconomie', path: '/micro', type: 'module', subject: 'micro', keywords: ['consommateur', 'producteur', 'équilibre'] },
    { id: 'micro-ch0', title: 'Introduction à la Micro', description: 'Fondamentaux de la microéconomie', path: '/micro/chapitre-0', type: 'chapter', subject: 'micro', keywords: ['introduction', 'fondamentaux'] },
    { id: 'micro-ch1', title: 'Arbitrage Travail-Loisir', description: 'Choix du consommateur entre travail et loisir', path: '/micro/chapitre-1', type: 'chapter', subject: 'micro', keywords: ['travail', 'loisir', 'arbitrage', 'choix'] },
    { id: 'micro-ch2', title: 'Le Consommateur', description: 'Théorie du consommateur, utilité', path: '/micro/chapitre-2', type: 'chapter', subject: 'micro', keywords: ['consommateur', 'utilité', 'préférences', 'budget'] },
    { id: 'micro-ch3', title: 'Demande & Variations', description: 'Courbe de demande et élasticités', path: '/micro/chapitre-3', type: 'chapter', subject: 'micro', keywords: ['demande', 'élasticité', 'prix', 'revenu'] },
    { id: 'micro-ch4', title: 'Le Producteur', description: 'Théorie de la production', path: '/micro/chapitre-4', type: 'chapter', subject: 'micro', keywords: ['producteur', 'production', 'coûts', 'profit'] },
    { id: 'micro-ch5', title: 'Offre & Équilibre', description: "Courbe d'offre et équilibre de marché", path: '/micro/chapitre-5', type: 'chapter', subject: 'micro', keywords: ['offre', 'équilibre', 'marché', 'prix'] },
    { id: 'micro-qcm', title: 'QCM Microéconomie', description: 'Questions à choix multiples', path: '/micro/qcm', type: 'qcm', subject: 'micro', keywords: ['qcm', 'quiz'] },

    // Statistiques
    { id: 'stats-home', title: 'Statistiques', description: 'Hub de révision statistiques', path: '/stats', type: 'module', subject: 'stats', keywords: ['probabilités', 'lois', 'variables'] },
    { id: 'stats-ch1', title: 'Probabilités de base', description: 'Fondamentaux des probabilités', path: '/stats/chapitre-1', type: 'chapter', subject: 'stats', keywords: ['probabilités', 'événements', 'bayes'] },
    { id: 'stats-ch2', title: 'Variables aléatoires discrètes', description: 'Loi binomiale, Poisson', path: '/stats/chapitre-2', type: 'chapter', subject: 'stats', keywords: ['variable', 'discrète', 'binomiale', 'poisson'] },
    { id: 'stats-ch3', title: 'Variables aléatoires continues', description: 'Loi normale, exponentielle', path: '/stats/chapitre-3', type: 'chapter', subject: 'stats', keywords: ['continue', 'normale', 'gaussienne', 'exponentielle'] },
    { id: 'stats-ch4', title: 'Estimation', description: 'Estimateurs et intervalles de confiance', path: '/stats/chapitre-4', type: 'chapter', subject: 'stats', keywords: ['estimation', 'intervalle', 'confiance', 'estimateur'] },
    { id: 'stats-ch5', title: 'Tests d\'hypothèses', description: 'Tests statistiques', path: '/stats/chapitre-5', type: 'chapter', subject: 'stats', keywords: ['test', 'hypothèse', 'p-value', 'significativité'] },

    // Sociologie
    { id: 'socio-home', title: 'Sociologie', description: 'Hub de révision sociologie', path: '/socio', type: 'module', subject: 'socio', keywords: ['société', 'social', 'théories'] },
];

const subjectColors = {
    macro: 'text-blue-600',
    micro: 'text-emerald-600',
    stats: 'text-cyan-600',
    socio: 'text-violet-600'
};

const subjectLabels = {
    macro: 'Macro',
    micro: 'Micro',
    stats: 'Stats',
    socio: 'Socio'
};

const typeIcons = {
    chapter: BookOpen,
    exercise: FileText,
    qcm: HelpCircle,
    revision: FileText,
    module: GraduationCap
};

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const results = useMemo(() => {
        if (!query.trim()) return searchDatabase.slice(0, 8);

        const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return searchDatabase
            .filter(item => {
                const normalizedTitle = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const normalizedDesc = item.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const normalizedKeywords = item.keywords.map(k => k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

                return normalizedTitle.includes(normalizedQuery) ||
                    normalizedDesc.includes(normalizedQuery) ||
                    normalizedKeywords.some(k => k.includes(normalizedQuery));
            })
            .slice(0, 10);
    }, [query]);

    const handleSelect = useCallback((item: SearchItem) => {
        navigate(item.path);
        onClose();
        setQuery('');
    }, [navigate, onClose]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [results, selectedIndex, handleSelect, onClose]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-[rgb(var(--border))] overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-[rgb(var(--border))]">
                                <Search className="w-5 h-5 text-[rgb(var(--text-muted))]" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Rechercher un cours, chapitre, QCM..."
                                    className="flex-1 bg-transparent text-[rgb(var(--text))] placeholder-slate-400 outline-none text-base"
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg hover:bg-[rgb(var(--surface-2))] transition-colors"
                                >
                                    <X className="w-4 h-4 text-[rgb(var(--text-muted))]" />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[400px] overflow-y-auto py-2">
                                {results.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-[rgb(var(--text-muted))]">
                                        Aucun résultat pour "{query}"
                                    </div>
                                ) : (
                                    <div className="space-y-0.5">
                                        {results.map((item, index) => {
                                            const Icon = typeIcons[item.type];
                                            const isSelected = index === selectedIndex;

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={`
                                                        w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                                                        ${isSelected
                                                            ? 'bg-[rgb(var(--surface-2))]'
                                                            : 'hover:bg-[rgb(var(--surface-2))]'
                                                        }
                                                    `}
                                                >
                                                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[rgb(var(--surface-2))] ${subjectColors[item.subject]}`}>
                                                        <Icon size={16} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-[rgb(var(--text))] truncate">
                                                                {item.title}
                                                            </span>
                                                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${subjectColors[item.subject]} bg-[rgb(var(--surface-2))]`}>
                                                                {subjectLabels[item.subject]}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-[rgb(var(--text-muted))] truncate">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    {isSelected && (
                                                        <ArrowRight className="w-4 h-4 text-[rgb(var(--text-muted))] shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 border-t border-[rgb(var(--border))] flex items-center justify-between text-xs text-[rgb(var(--text-muted))]">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-[rgb(var(--surface-2))] rounded">↑↓</kbd>
                                        naviguer
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-[rgb(var(--surface-2))] rounded">↵</kbd>
                                        ouvrir
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-[rgb(var(--surface-2))] rounded">esc</kbd>
                                        fermer
                                    </span>
                                </div>
                                <span>{results.length} résultat{results.length > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/**
 * Hook to use the search modal with Cmd+K shortcut
 */
export function useSearchModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    };
}
