import { 
    Home,
    BookOpen,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    badge?: string;
}

interface ModuleItemProps {
    to: string;
    label: string;
    dotColor: string;
    isActive?: boolean;
}

const modules = [
    { to: '/macro', label: 'Macroéconomie', dotColor: 'bg-blue-500' },
    { to: '/micro', label: 'Microéconomie', dotColor: 'bg-emerald-500' },
    { to: '/stats', label: 'Statistiques', dotColor: 'bg-amber-500' },
    { to: '/socio', label: 'Sociologie', dotColor: 'bg-violet-500' },
];



function NavItem({ to, icon: Icon, label, isActive, badge }: NavItemProps) {
    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-3 py-2 min-h-[40px] rounded-lg text-[13px] font-medium transition-colors no-underline",
                isActive 
                    ? "bg-gray-100 dark:bg-white/[0.06] text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.03]"
            )}
        >
            <Icon size={16} className={isActive ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"} />
            <span className="flex-1">{label}</span>
            {badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                    {badge}
                </span>
            )}
        </Link>
    );
}

function ModuleItem({ to, label, dotColor, isActive }: ModuleItemProps) {
    return (
        <Link
            to={to}
            className={cn(
                "group flex items-center gap-3 px-3 py-2 min-h-[40px] rounded-lg text-[13px] transition-colors no-underline",
                isActive 
                    ? "bg-gray-100 dark:bg-white/[0.06] text-gray-900 dark:text-white font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.03]"
            )}
        >
            <span className={cn(
                "w-2 h-2 rounded-full",
                dotColor,
                isActive ? "opacity-100" : "opacity-50 group-hover:opacity-80"
            )} />
            <span className="flex-1">{label}</span>
            <ChevronRight 
                size={12} 
                className={cn(
                    "text-gray-400 dark:text-gray-500 transition-opacity",
                    isActive ? "opacity-50" : "opacity-0 group-hover:opacity-50"
                )} 
            />
        </Link>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-3 py-2">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {children}
            </span>
        </div>
    );
}

export function AppSidebar() {
    const location = useLocation();
    const { user, signOut } = useAuth();

    const isHome = location.pathname === '/';
    const isCours = location.pathname.startsWith('/cours');

    return (
        <aside className="flex flex-col h-full bg-[#F7F7F8] dark:bg-[#0C0C0D] shadow-[inset_-1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]">
            {/* Logo */}
            <div className="h-14 flex items-center px-4">
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <div className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white flex items-center justify-center">
                        <span className="text-white dark:text-gray-900 font-bold text-[10px]">E</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm tracking-tight">
                        Eco<span className="text-gray-400 dark:text-gray-500">Master</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
                {/* Main */}
                <div className="space-y-0.5">
                    <SectionLabel>Menu</SectionLabel>
                    <NavItem to="/" icon={Home} label="Accueil" isActive={isHome} />
                    <NavItem to="/cours" icon={BookOpen} label="Mes Cours" isActive={isCours} badge="4" />
                </div>

                {/* Modules */}
                <div className="space-y-0.5">
                    <SectionLabel>Modules</SectionLabel>
                    {modules.map((module) => (
                        <ModuleItem
                            key={module.to}
                            to={module.to}
                            label={module.label}
                            dotColor={module.dotColor}
                            isActive={location.pathname.startsWith(module.to)}
                        />
                    ))}
                </div>


            </nav>

            {/* User Footer */}
            <div className="p-3">
                {user ? (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5 px-2 py-1.5">
                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-gray-900 dark:text-white truncate">
                                    {user.displayName || 'Étudiant'}
                                </p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-500 truncate">
                                    L2 Économie
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={signOut}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut size={14} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors no-underline"
                    >
                        Se connecter
                    </Link>
                )}
            </div>
        </aside>
    );
}
