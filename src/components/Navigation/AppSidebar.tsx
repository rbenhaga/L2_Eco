import { Home, TrendingUp, PieChart, BarChart3, Users, Search, Command, Moon, Sun, LogOut, User, Crown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { useState } from 'react';

interface NavItem {
    to: string;
    icon: typeof Home;
    label: string;
    subject?: 'macro' | 'micro' | 'stats' | 'socio';
}

const navItems: NavItem[] = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/macro', icon: TrendingUp, label: 'Macroéconomie', subject: 'macro' },
    { to: '/micro', icon: PieChart, label: 'Microéconomie', subject: 'micro' },
    { to: '/stats', icon: BarChart3, label: 'Statistiques', subject: 'stats' },
    { to: '/socio', icon: Users, label: 'Sociologie', subject: 'socio' }
];

const subjectColors = {
    macro: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    micro: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    stats: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20',
    socio: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
};

/**
 * ThemeToggleButton - Full width clickable theme toggle with icon and label
 */
function ThemeToggleButton({ isCollapsed }: { isCollapsed: boolean }) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else if (theme === 'light') {
            setTheme('dark');
        } else {
            const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isSystemDark ? 'light' : 'dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={`flex items-center px-2.5 py-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/4 transition-colors w-full group ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}
            title="Basculer le thème"
        >
            <div className="relative w-[18px] h-[18px] shrink-0">
                <Sun
                    size={18}
                    className="absolute top-0 left-0 transition-all duration-75 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-amber-500"
                />
                <Moon
                    size={18}
                    className="absolute top-0 left-0 transition-all duration-75 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-indigo-400"
                />
            </div>
            {!isCollapsed && (
                <span className="text-[13px] text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Thème
                </span>
            )}
        </button>
    );
}

/**
 * AppSidebar - Premium main navigation sidebar (Notion/Apple-inspired)
 */
export function AppSidebar() {
    const location = useLocation();
    const { user, signOut } = useAuth();
    const { open: openSearch } = useSearch();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const isCollapsed = false; // TODO: Add collapse functionality

    return (
        <>
            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-screen
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                border-r border-slate-200/60 dark:border-white/8
                transition-all duration-300 z-40
                ${isCollapsed ? 'w-16' : 'w-60'}
                shadow-sm
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="px-3 py-4 border-b border-slate-200/60 dark:border-white/8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 px-2 py-1.5 group no-underline rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/4 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
                                <Home className="w-4 h-4 text-white" />
                            </div>
                            {!isCollapsed && (
                                <span className="font-semibold text-base text-slate-900 dark:text-white">
                                    RevP2
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.to ||
                                (item.to !== '/' && location.pathname.startsWith(item.to));
                            const Icon = item.icon;
                            const colorClass = item.subject ? subjectColors[item.subject] : '';

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`
                                        flex items-center gap-2.5 px-2.5 py-2 rounded-lg
                                        transition-all duration-200 no-underline group
                                        ${isActive
                                            ? `${colorClass || 'bg-slate-100 dark:bg-slate-800/60'} font-medium shadow-sm`
                                            : 'hover:bg-slate-100/60 dark:hover:bg-white/4'
                                        }
                                    `}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                                        <Icon
                                            className={`
                                                w-[18px] h-[18px] transition-colors
                                                ${isActive && item.subject
                                                    ? colorClass.split(' ')[0]
                                                    : isActive
                                                        ? 'text-slate-700 dark:text-white'
                                                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                                                }
                                            `}
                                        />
                                    </div>
                                    {!isCollapsed && (
                                        <span className={`
                                            text-[13px] leading-tight transition-colors
                                            ${isActive
                                                ? item.subject
                                                    ? colorClass.split(' ')[0]
                                                    : 'text-slate-900 dark:text-white'
                                                : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                                            }
                                        `}>
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="px-3 py-3 space-y-1 border-t border-slate-200/60 dark:border-white/8">
                        <button
                            onClick={openSearch}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/4 transition-colors w-full no-underline group"
                            title="Rechercher (Cmd+K)"
                        >
                            <Search className="w-[18px] h-[18px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                            {!isCollapsed && (
                                <>
                                    <span className="text-[13px] text-slate-600 dark:text-slate-300 flex-1 text-left group-hover:text-slate-900 dark:group-hover:text-white">
                                        Rechercher
                                    </span>
                                    <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-white/10">
                                        <Command className="w-2.5 h-2.5" />
                                        <span>K</span>
                                    </kbd>
                                </>
                            )}
                        </button>

                        <ThemeToggleButton isCollapsed={isCollapsed} />
                    </div>

                    {/* User Section */}
                    <div className="px-3 py-3 border-t border-slate-200/60 dark:border-white/8">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/4 transition-colors w-full group"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-7 h-7 rounded-full shrink-0"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                                            <User className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )}
                                    {!isCollapsed && (
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-[13px] font-medium text-slate-900 dark:text-white truncate">
                                                {user.displayName || 'Utilisateur'}
                                            </p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                {user.subscriptionTier === 'premium' ? '✨ Premium' : 'Gratuit'}
                                            </p>
                                        </div>
                                    )}
                                </button>

                                {/* User Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        />
                                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-50">
                                            <div className="p-3 border-b border-slate-200/60 dark:border-white/8">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                    {user.displayName}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                    {user.email}
                                                </p>
                                                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                                                    <Crown className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                                                        {user.subscriptionTier === 'premium' ? 'Premium' : 'Free'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-1.5">
                                                <Link
                                                    to="/subscription"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-sm text-slate-700 dark:text-slate-300 no-underline"
                                                >
                                                    <Crown className="w-4 h-4" />
                                                    <span>Gérer l'abonnement</span>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setIsUserMenuOpen(false);
                                                        signOut();
                                                    }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-sm text-red-600 dark:text-red-400"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Se déconnecter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors w-full no-underline group"
                            >
                                <User className="w-[18px] h-[18px] text-white" />
                                {!isCollapsed && (
                                    <span className="text-[13px] font-medium text-white">
                                        Se connecter
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
