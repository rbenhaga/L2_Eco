import { ReactNode, useState } from 'react';
import { Menu, Search, Sun, Moon, Command, ChevronRight } from 'lucide-react';
import { AppSidebar } from '../components/Navigation/AppSidebar';
import { MobileDrawer } from '../components/Navigation/MobileDrawer';
import { SearchModal } from '../components/SearchModal';
import { SearchProvider, useSearch } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
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
                <span className="text-muted-foreground">Espace étudiant</span>
                <ChevronRight size={12} className="text-muted-foreground/50" />
                <span className="text-foreground font-medium">Accueil</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
                Espace étudiant
            </Link>
            {segments.map((segment, idx) => {
                const path = '/' + segments.slice(0, idx + 1).join('/');
                const isLast = idx === segments.length - 1;
                const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                
                return (
                    <span key={path} className="flex items-center gap-1.5">
                        <ChevronRight size={12} className="text-muted-foreground/50" />
                        {isLast ? (
                            <span className="text-foreground font-medium">{label}</span>
                        ) : (
                            <Link to={path} className="text-muted-foreground hover:text-foreground transition-colors no-underline">
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

    return (
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 bg-card/95 backdrop-blur-md border-b border-border">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={onMobileMenuClick} 
                    className="lg:hidden p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Menu"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:block">
                    <Breadcrumb />
                </div>
            </div>

            {/* Center: Search */}
            <div className="hidden sm:flex flex-1 justify-center max-w-md mx-4">
                <button
                    onClick={openSearch}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground text-sm transition-colors"
                >
                    <Search size={14} />
                    <span className="flex-1 text-left">Rechercher...</span>
                    <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background text-[10px] font-medium text-muted-foreground">
                        <Command size={9} />K
                    </kbd>
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1">
                <button
                    onClick={openSearch}
                    className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Rechercher"
                >
                    <Search size={20} />
                </button>

                <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
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
