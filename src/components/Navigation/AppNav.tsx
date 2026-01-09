/**
 * AppNav - Premium Navigation Bar
 * 
 * Notion/Apple-inspired top navigation with glassmorphism.
 * Features:
 * - Fixed position with backdrop blur
 * - Module selector pills
 * - Command palette (Cmd+K)
 * - Mobile drawer
 * - User menu with sign out
 */

import { Home, Search, Menu, LogOut, User, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { ModuleSelector } from './ModuleSelector';
import { ModuleDropdown } from './ModuleDropdown';
import { MobileDrawer } from './MobileDrawer';
import { CommandPalette } from './CommandPalette';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useAuth } from '../../context/AuthContext';

export function AppNav() {
    const { user, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Keyboard shortcuts
    useKeyboard({
        'cmd+k': () => setIsCommandPaletteOpen(true),
        'cmd+\\': () => setIsMobileMenuOpen(prev => !prev),
    });

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/50 dark:border-white/5">
                <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
                    {/* Left: Logo + Module Dropdown */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex items-center gap-2 group no-underline shrink-0"
                        >
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <Home className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white text-lg hidden sm:block">
                                RevP2
                            </span>
                        </Link>

                        {/* Module-specific dropdown (shows when in a module) */}
                        <div className="hidden md:block">
                            <ModuleDropdown />
                        </div>
                    </div>

                    {/* Center: Module Selector */}
                    <div className="flex-1 flex justify-center px-4">
                        <ModuleSelector />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search (desktop) */}
                        <button
                            onClick={() => setIsCommandPaletteOpen(true)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4" />
                            <span className="text-xs opacity-70">Ctrl+K</span>
                        </button>

                        {/* User Menu or Login Button */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    aria-label="User menu"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        />

                                        {/* Menu */}
                                        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-50">
                                            {/* User Info */}
                                            <div className="p-4 border-b border-slate-200 dark:border-white/10">
                                                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                                    {user.displayName || 'Utilisateur'}
                                                </p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                                    {user.email}
                                                </p>

                                                {/* Subscription Badge */}
                                                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-linear-to-r from-indigo-500/10 to-violet-600/10 border border-indigo-500/20">
                                                    <Crown className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                                        {user.subscriptionTier === 'premium' ? 'Premium' : 'Free'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="p-2">
                                                <Link
                                                    to="/subscription"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 no-underline"
                                                >
                                                    <Crown className="w-4 h-4" />
                                                    <span className="text-sm">Gérer l'abonnement</span>
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        setIsUserMenuOpen(false);
                                                        signOut();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-600 dark:text-red-400"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span className="text-sm">Se déconnecter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors no-underline"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Se connecter</span>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <MobileDrawer
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Command Palette */}
            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
            />
        </>
    );
}
