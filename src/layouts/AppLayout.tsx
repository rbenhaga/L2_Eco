import { ReactNode, useState } from 'react';
import { Menu, Search, Sun, Moon, Command } from 'lucide-react';
import { AppSidebar } from '../components/Navigation/AppSidebar';
import { MobileDrawer } from '../components/Navigation/MobileDrawer';
import { SearchModal } from '../components/SearchModal';
import { GradientBackground } from '../components/ui/GradientBackground';
import { SearchProvider, useSearch } from '../context/SearchContext';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface AppLayoutProps {
    children: ReactNode;
}

// Page titles
const pathLabels: Record<string, string> = {
    '': 'Accueil',
    'macro': 'Macroéconomie',
    'micro': 'Microéconomie',
    'stats': 'Statistiques',
    'socio': 'Sociologie',
    'cours': 'Bibliothèque',
};

function TopBar({ onMobileMenuClick }: { onMobileMenuClick: () => void }) {
    const { open: openSearch } = useSearch();
    const { theme, setTheme } = useTheme();
    const location = useLocation();

    // Get page title
    const segments = location.pathname.split('/').filter(Boolean);
    const firstSegment = segments[0] || '';
    const pageTitle = pathLabels[firstSegment] || 'RevP2';

    return (
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 bg-card/95 backdrop-blur-md border-b border-border">
            {/* Left: Menu + Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMobileMenuClick}
                    className="lg:hidden p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Menu"
                >
                    <Menu size={20} />
                </button>
                <h1 className="text-base font-semibold text-foreground">
                    {pageTitle}
                </h1>
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

            {/* Right: Theme + Search (mobile) */}
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
        <>
            {/* Premium gradient background - at root level */}
            <GradientBackground />

            <div className="min-h-screen text-foreground relative" style={{ backgroundColor: 'var(--color-background)' }}>
                {/* Desktop Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-40 w-[240px] hidden lg:block">
                    <AppSidebar />
                </aside>

                {/* Main Content */}
                <div className="lg:ml-[240px] min-h-screen flex flex-col relative z-10">
                    <TopBar onMobileMenuClick={() => setIsMobileDrawerOpen(true)} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>

                <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
                <SearchModal isOpen={isOpen} onClose={close} />
            </div>
        </>
    );
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SearchProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SearchProvider>
    );
}
