import { ReactNode, useState } from 'react';
import { Menu, Search, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { AppSidebar } from '../components/Navigation/AppSidebar';
import { MobileDrawer } from '../components/Navigation/MobileDrawer';
import { SearchModal } from '../components/SearchModal';
import { SearchProvider, useSearch } from '../context/SearchContext';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';


interface AppLayoutProps {
    children: ReactNode;
}

function TopBar({ onMobileMenuClick }: { onMobileMenuClick: () => void }) {
    const { open: openSearch } = useSearch();
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur-xl">
            {/* Mobile Toggle */}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={onMobileMenuClick}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Left: Greeting / Breadcrumb Placeholder */}
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span>Bonjour, {user?.displayName?.split(' ')[0] || 'Étudiant'}</span>
            </div>

            <div className="flex-1" />

            {/* Center/Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Search Trigger */}
                <button
                    onClick={openSearch}
                    className="flex items-center gap-2 rounded-md border border-input bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-64"
                >
                    <Search className="h-3.5 w-3.5" />
                    <span>Rechercher...</span>
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>

                <ThemeToggle />
                <UserMenu />
            </div>
        </header>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

function UserMenu() {
    const { user, signOut } = useAuth();

    if (!user) {
        return (
            <Link to="/login">
                <Button size="sm">Se connecter</Button>
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-3 pl-2">
            <div className="hidden md:block text-right">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            </div>
            <div className="relative group">
                <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                    ) : (
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>
                {/* Simple Dropdown for Logout */}
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                        onClick={signOut}
                        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-muted"
                    >
                        <LogOut className="h-4 w-4" />
                        Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    );
}


function AppLayoutContent({ children }: AppLayoutProps) {
    const { isOpen, close } = useSearch();
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-none border-r border-border bg-card z-40">
                <AppSidebar className="w-full border-none" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-noise">
                <TopBar onMobileMenuClick={() => setIsMobileDrawerOpen(true)} />

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-0 scroll-smooth">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Drawer */}
            <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />

            {/* Global Search Modal */}
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
