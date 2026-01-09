import { ReactNode, useState } from 'react';
import { Menu, Search, Sun, Moon, Command, ChevronRight } from 'lucide-react';
import { AppSidebar } from '../components/Navigation/AppSidebar';
import { MobileDrawer } from '../components/Navigation/MobileDrawer';
import { SearchModal } from '../components/SearchModal';
import { SearchProvider, useSearch } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface AppLayoutProps {
    children: ReactNode;
}

const pathLabels: Record<string, string> = {
    '': 'Accueil',
    'macro': 'Macroéconomie',
    'micro': 'Microéconomie',
    'stats': 'Statistiques',
    'socio': 'Sociologie',
    'cours': 'Mes Cours',
    'qcm': 'QCM',
    'exercices': 'Exercices',
    'revision': 'Révision',
};

function Breadcrumb() {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
        return (
            <div className="flex items-center gap-1.5 text-sm">
                <span className="text-gray-400 dark:text-gray-500">Espace étudiant</span>
                <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
                <span className="text-gray-900 dark:text-white font-medium">Accueil</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5 text-sm">
            <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors no-underline">
                Espace étudiant
            </Link>
            {segments.map((segment, idx) => {
                const path = '/' + segments.slice(0, idx + 1).join('/');
                const isLast = idx === segments.length - 1;
                const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                
                return (
                    <span key={path} className="flex items-center gap-1.5">
                        <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
                        {isLast ? (
                            <span className="text-gray-900 dark:text-white font-medium">{label}</span>
                        ) : (
                            <Link to={path} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors no-underline">
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

function TopBar({ onMobileMenuClick }: { onMobileMenuClick: () => void }) {
    const { open: openSearch } = useSearch();
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 bg-background/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_0_rgba(255,255,255,0.03)]">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={onMobileMenuClick} 
                    className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Menu"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:block">
                    <Breadcrumb />
                </div>
            </div>

            {/* Center: Search */}
            <div className="hidden sm:flex flex-1 justify-center max-w-sm mx-4">
                <button
                    onClick={openSearch}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/[0.08] text-gray-400 dark:text-gray-500 text-sm transition-colors"
                >
                    <Search size={14} />
                    <span className="flex-1 text-left text-gray-500 dark:text-gray-400">Rechercher...</span>
                    <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-[10px] font-medium text-gray-400 dark:text-gray-500 shadow-sm">
                        <Command size={9} />K
                    </kbd>
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1">
                <button
                    onClick={openSearch}
                    className="sm:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Rechercher"
                >
                    <Search size={20} />
                </button>

                <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {user ? (
                    <div className="ml-1 w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                {user.displayName?.charAt(0) || 'U'}
                            </span>
                        )}
                    </div>
                ) : (
                    <Link 
                        to="/login"
                        className="ml-2 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors no-underline"
                    >
                        Connexion
                    </Link>
                )}
            </div>
        </header>
    );
}

function AppLayoutContent({ children }: AppLayoutProps) {
    const { isOpen, close } = useSearch();
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 w-[240px] hidden lg:block">
                <AppSidebar />
            </aside>

            {/* Main Content */}
            <div className="lg:ml-[240px] min-h-screen flex flex-col">
                <TopBar onMobileMenuClick={() => setIsMobileDrawerOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
            <SearchModal isOpen={isOpen} onClose={close} />
        </div>
    );
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SearchProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SearchProvider>
    );
}
