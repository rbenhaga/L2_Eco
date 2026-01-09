/**
 * ModuleDropdown - Smart Module-Specific Navigation
 * 
 * Displays relevant links based on current module.
 * Appears when user is in a module (not on home page).
 */

import { ChevronDown, BookOpen, FileText, Calculator, CheckSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface ModuleLink {
    label: string;
    path: string;
    icon: typeof BookOpen;
}

interface ModuleConfig {
    name: string;
    basePath: string;
    links: ModuleLink[];
}

const moduleConfigs: Record<string, ModuleConfig> = {
    macro: {
        name: 'Macro',
        basePath: '/macro',
        links: [
            { label: 'Accueil', path: '/macro', icon: BookOpen },
            { label: 'Chapitres', path: '/macro/chapitre-1', icon: BookOpen },
            { label: 'Révisions', path: '/macro/revision', icon: FileText },
            { label: 'QCM', path: '/macro/qcm', icon: CheckSquare },
        ],
    },
    micro: {
        name: 'Micro',
        basePath: '/micro',
        links: [
            { label: 'Accueil', path: '/micro', icon: BookOpen },
            { label: 'Chapitres', path: '/micro/chapitre-1', icon: BookOpen },
            { label: 'TD', path: '/micro/td', icon: Calculator },
            { label: 'QCM', path: '/micro/qcm', icon: CheckSquare },
        ],
    },
    stats: {
        name: 'Stats',
        basePath: '/stats',
        links: [
            { label: 'Accueil', path: '/stats', icon: BookOpen },
            { label: 'Chapitres', path: '/stats/chapter-1', icon: BookOpen },
            { label: 'Révision Intensive', path: '/stats/revision-intensive', icon: FileText },
            { label: 'TD', path: '/stats/td', icon: Calculator },
            { label: 'QCM', path: '/stats/qcm', icon: CheckSquare },
            { label: 'Annales', path: '/stats/annales', icon: FileText },
        ],
    },
    socio: {
        name: 'Socio',
        basePath: '/socio',
        links: [
            { label: 'Accueil', path: '/socio', icon: BookOpen },
            { label: 'Chapitres', path: '/socio/chapitre-1', icon: BookOpen },
            { label: 'QCM', path: '/socio/qcm', icon: CheckSquare },
            { label: 'Méthodologie', path: '/socio/methodologie', icon: FileText },
        ],
    },
};

export function ModuleDropdown() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Detect current module from path
    const currentModule = Object.keys(moduleConfigs).find(key =>
        location.pathname.startsWith(`/${key}`)
    );

    const config = currentModule ? moduleConfigs[currentModule] : null;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    // Don't show if not in a module
    if (!config) return null;

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm font-medium"
            >
                <span>{config.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {config.links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors
                  ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                                    }
                `}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
