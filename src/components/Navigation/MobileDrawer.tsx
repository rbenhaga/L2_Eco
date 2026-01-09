/**
 * MobileDrawer - Slide-in Mobile Menu
 * 
 * Apple/Notion-style drawer from right side.
 * Smooth animations, overlay backdrop.
 */

import { X, Home, BookOpen, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    // Close on Esc key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-slate-900 z-50 shadow-2xl animate-in slide-in-from-right duration-200">
                {/* Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold text-slate-900 dark:text-white">RevP2</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-6">
                    {/* Modules */}
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                            Modules
                        </h3>
                        <nav className="space-y-1">
                            {[
                                { name: 'Macroéconomie', path: '/macro', icon: TrendingUp },
                                { name: 'Microéconomie', path: '/micro', icon: BarChart3 },
                                { name: 'Statistiques', path: '/stats', icon: BarChart3 },
                                { name: 'Sociologie', path: '/socio', icon: Users },
                            ].map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors no-underline group"
                                >
                                    <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                            Ressources
                        </h3>
                        <nav className="space-y-1">
                            <Link
                                to="/"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors no-underline"
                            >
                                <Home className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                <span className="font-medium">Accueil</span>
                            </Link>
                            <Link
                                to="/about"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors no-underline"
                            >
                                <BookOpen className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                <span className="font-medium">À propos</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
