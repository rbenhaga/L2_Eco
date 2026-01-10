import {
    Home,
    Library,
    TrendingUp,
    PieChart,
    BarChart3,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

/**  
 * AppSidebar - Simplified Navigation
 * 
 * Structure:
 * 1. Principal (Accueil, Bibliothèque)
 * 2. Matières (Macro, Micro, Stats, Socio)
 * 3. Footer (User + Settings)
 */

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
}

interface CourseItemProps {
    to: string;
    label: string;
    icon: React.ElementType;
    isActive?: boolean;
}

function NavItem({ to, icon: Icon, label, isActive }: NavItemProps) {
    return (
        <Link
            to={to}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
            )}
        >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
        </Link>
    );
}

function CourseItem({ to, label, icon: Icon, isActive }: CourseItemProps) {
    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
            )}
        >
            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
            <span>{label}</span>
        </Link>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="px-3 pt-4 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {children}
        </p>
    );
}

const courses = [
    { to: '/macro', label: 'Macroéconomie', icon: TrendingUp },
    { to: '/micro', label: 'Microéconomie', icon: PieChart },
    { to: '/stats', label: 'Statistiques', icon: BarChart3 },
    { to: '/socio', label: 'Sociologie', icon: Users },
];

export function AppSidebar() {
    const location = useLocation();
    const { user, signOut } = useAuth();

    const isHome = location.pathname === '/';
    const isLibrary = location.pathname.startsWith('/cours') || location.pathname.startsWith('/library');

    return (
        <aside className="flex flex-col h-full bg-(--color-sidebar) border-r border-border">
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-border">
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-accent-foreground font-black text-sm">R</span>
                    </div>
                    <span className="font-semibold text-foreground">RevP2</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {/* Principal */}
                <div className="space-y-1">
                    <NavItem
                        to="/"
                        icon={Home}
                        label="Accueil"
                        isActive={isHome}
                    />
                    <NavItem
                        to="/cours"
                        icon={Library}
                        label="Bibliothèque"
                        isActive={isLibrary}
                    />
                </div>

                {/* Matières */}
                <div>
                    <SectionLabel>Matières</SectionLabel>
                    <div className="space-y-1">
                        {courses.map((course) => (
                            <CourseItem
                                key={course.to}
                                to={course.to}
                                label={course.label}
                                icon={course.icon}
                                isActive={location.pathname.startsWith(course.to)}
                            />
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-border">
                {user ? (
                    <div className="space-y-2">
                        {/* User */}
                        <div className="flex items-center gap-2.5 px-2 py-1.5">
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {user.displayName || 'Étudiant'}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1.5">
                            <Link
                                to="/settings"
                                className="flex-1 flex items-center justify-center px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors no-underline"
                            >
                                <Settings size={16} />
                            </Link>
                            <button
                                onClick={signOut}
                                className="flex items-center justify-center px-2 py-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                title="Déconnexion"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors no-underline"
                    >
                        Se connecter
                    </Link>
                )}
            </div>
        </aside>
    );
}
