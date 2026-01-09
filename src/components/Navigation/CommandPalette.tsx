/**
 * CommandPalette - Quick Search/Navigation (Cmd+K)
 * 
 * Notion-style command palette for quick access.
 * Fuzzy search through all pages and actions.
 */

import { Search, Home, BookOpen, FileText, Calculator, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Command {
    id: string;
    label: string;
    description?: string;
    icon: typeof Home;
    action: () => void;
    keywords?: string[];
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    // Define all available commands
    const allCommands: Command[] = useMemo(() => [
        {
            id: 'home',
            label: 'Accueil',
            description: 'Retour à la page d\'accueil',
            icon: Home,
            action: () => { navigate('/'); onClose(); },
            keywords: ['home', 'accueil', 'index'],
        },
        {
            id: 'macro',
            label: 'Macroéconomie',
            description: 'Module de macroéconomie',
            icon: BookOpen,
            action: () => { navigate('/macro'); onClose(); },
            keywords: ['macro', 'économie', 'keynes'],
        },
        {
            id: 'micro',
            label: 'Microéconomie',
            description: 'Module de microéconomie',
            icon: BookOpen,
            action: () => { navigate('/micro'); onClose(); },
            keywords: ['micro', 'économie', 'marchés'],
        },
        {
            id: 'stats',
            label: 'Statistiques',
            description: 'Module de statistiques',
            icon: Calculator,
            action: () => { navigate('/stats'); onClose(); },
            keywords: ['stats', 'statistiques', 'probabilités', 'maths'],
        },
        {
            id: 'socio',
            label: 'Sociologie',
            description: 'Module de sociologie',
            icon: BookOpen,
            action: () => { navigate('/socio'); onClose(); },
            keywords: ['socio', 'sociologie', 'société'],
        },
        {
            id: 'stats-revision',
            label: 'Stats - Révision Intensive',
            description: 'Exercices ciblés pour les stats',
            icon: FileText,
            action: () => { navigate('/stats/revision-intensive'); onClose(); },
            keywords: ['révision', 'stats', 'exercices'],
        },
        {
            id: 'macro-revision',
            label: 'Macro - Fiches de Révision',
            description: 'Fiches complètes de macroéconomie',
            icon: FileText,
            action: () => { navigate('/macro/revision'); onClose(); },
            keywords: ['révision', 'macro', 'fiches'],
        },
    ], [navigate, onClose]);

    // Filter commands based on query
    const filteredCommands = useMemo(() => {
        if (!query.trim()) return allCommands;

        const lowerQuery = query.toLowerCase();
        return allCommands.filter(cmd =>
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords?.some(kw => kw.toLowerCase().includes(lowerQuery))
        );
    }, [query, allCommands]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                filteredCommands[selectedIndex]?.action();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, selectedIndex, filteredCommands]);

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 animate-in fade-in duration-150"
                onClick={onClose}
            />

            {/* Palette */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4 animate-in zoom-in-95 duration-200">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/10">
                        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Rechercher une page, un module..."
                            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none text-base"
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-96 overflow-y-auto">
                        {filteredCommands.length > 0 ? (
                            <div className="py-2">
                                {filteredCommands.map((cmd, index) => {
                                    const Icon = cmd.icon;
                                    const isSelected = index === selectedIndex;

                                    return (
                                        <button
                                            key={cmd.id}
                                            onClick={cmd.action}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`
                        w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                        ${isSelected
                                                    ? 'bg-blue-50 dark:bg-blue-950/30'
                                                    : 'hover:bg-slate-50 dark:hover:bg-white/5'
                                                }
                      `}
                                        >
                                            <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-medium text-sm ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                                    {cmd.label}
                                                </div>
                                                {cmd.description && (
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        {cmd.description}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Aucun résultat pour "{query}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer hint */}
                    <div className="px-4 py-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                            <span>↑↓ Navigation</span>
                            <span>⏎ Sélectionner</span>
                        </div>
                        <span>Esc Fermer</span>
                    </div>
                </div>
            </div>
        </>
    );
}
