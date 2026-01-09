import { Home, TrendingUp, PieChart, BarChart3, Users, ChevronRight, BookOpen, CheckSquare, FileCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

// --- Types ---
interface NavItem {
    to: string;
    icon: typeof Home;
    label: string;
    subject?: 'macro' | 'micro' | 'stats' | 'socio';
}

interface NavGroup {
    title: string;
    icon: typeof BookOpen;
    items: { to: string; label: string }[];
    defaultOpen?: boolean;
}

// --- Config ---
const navItems: NavItem[] = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/macro', icon: TrendingUp, label: 'Macroéconomie', subject: 'macro' },
    { to: '/micro', icon: PieChart, label: 'Microéconomie', subject: 'micro' },
    { to: '/stats', icon: BarChart3, label: 'Statistiques', subject: 'stats' },
    { to: '/socio', icon: Users, label: 'Sociologie', subject: 'socio' }
];

const subjectConfig = {
    macro: {
        name: 'Macroéconomie',
        color: 'text-blue-600 dark:text-blue-400',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/macro/chapitre-1', label: 'Ch1: IS-LM' },
                    { to: '/macro/chapitre-2', label: 'Ch2: Marché du Travail' },
                    { to: '/macro/chapitre-3', label: 'Ch3: AS-AD' },
                    { to: '/macro/chapitre-4', label: 'Ch4: Phillips' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/macro/qcm', label: 'QCM' },
                    { to: '/macro/exercices', label: 'TD & Exercices' },
                    { to: '/macro/simulations', label: 'Simulations' }
                ]
            },
            {
                title: 'Révisions',
                icon: FileCheck,
                items: [
                    { to: '/macro/revision', label: 'Fiche de synthèse' },
                    { to: '/macro/revision-ch1', label: 'Fiche Ch1' },
                    { to: '/macro/revision-ch2', label: 'Fiche Ch2' },
                    { to: '/macro/revision-ch3', label: 'Fiche Ch3' },
                    { to: '/macro/revision-ch4', label: 'Fiche Ch4' }
                ]
            }
        ]
    },
    micro: {
        name: 'Microéconomie',
        color: 'text-emerald-600 dark:text-emerald-400',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/micro/chapitre-1', label: 'Ch1: Consommateur' },
                    { to: '/micro/chapitre-2', label: 'Ch2: Producteur' },
                    { to: '/micro/chapitre-3', label: 'Ch3: Équilibre' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/micro/qcm', label: 'QCM' },
                    { to: '/micro/exercices', label: 'TD & Exercices' }
                ]
            }
        ]
    },
    stats: {
        name: 'Statistiques',
        color: 'text-cyan-600 dark:text-cyan-400',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/stats/chapitre-1', label: 'Ch1: Probabilités' },
                    { to: '/stats/chapitre-2', label: 'Ch2: Variables aléatoires' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/stats/qcm', label: 'QCM' },
                    { to: '/stats/td', label: 'TD' }
                ]
            }
        ]
    },
    socio: {
        name: 'Sociologie',
        color: 'text-violet-600 dark:text-violet-400',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/socio/chapitre-1', label: 'Ch1: Introduction' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/socio/qcm', label: 'QCM' },
                    { to: '/socio/revision-intensive', label: 'Révision Intensive' }
                ]
            }
        ]
    }
};

// --- Sub-components ---
function NavGroupComponent({ group, defaultOpen }: { group: NavGroup; defaultOpen?: boolean }) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(defaultOpen || false);
    const Icon = group.icon;

    // Auto-expand if child active
    useEffect(() => {
        if (group.items.some(item => location.pathname === item.to)) {
            setIsExpanded(true);
        }
    }, [location.pathname, group.items]);

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center w-full gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
                <Icon className="w-3.5 h-3.5" />
                <span>{group.title}</span>
                <ChevronRight className={cn("ml-auto w-3 h-3 transition-transform opacity-50", isExpanded && "rotate-90")} />
            </button>
            {isExpanded && (
                <div className="space-y-0.5 mt-0.5">
                    {group.items.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    "flex items-center relative pl-8 pr-3 py-2 text-sm transition-all no-underline",
                                    isActive
                                        ? "text-primary font-medium bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-full bg-primary" />
                                )}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// --- Main Sidebar Component ---
export function AppSidebar({ className }: { className?: string }) {
    const location = useLocation();

    // Determine current subject
    const currentSubjectKey = (['macro', 'micro', 'stats', 'socio'] as const).find(k => location.pathname.startsWith(`/${k}`));
    const activeConfig = currentSubjectKey ? subjectConfig[currentSubjectKey] : null;

    return (
        <aside className={cn("flex flex-col h-full bg-card border-r border-border", className)}>
            {/* Header / Logo */}
            <div className="h-14 flex items-center px-4 shrink-0">
                <Link to="/" className="flex items-center gap-2 font-semibold text-foreground no-underline">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                        <Home className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight">RevP2</span>
                </Link>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-2">
                {/* Main Navigation */}
                <div className="mb-6">
                    <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Menu Principal
                    </div>
                    <nav className="space-y-0.5">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2 text-sm transition-all no-underline relative",
                                        isActive
                                            ? "text-primary font-medium bg-primary/5"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                                    )}
                                    <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Subject Specific Navigation */}
                {activeConfig && (
                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="px-4 mb-2">
                            <h3 className={cn("text-xs font-bold uppercase tracking-wider opacity-90", activeConfig.color)}>
                                {activeConfig.name}
                            </h3>
                        </div>
                        <div>
                            {activeConfig.groups.map(group => (
                                <NavGroupComponent key={group.title} group={group} defaultOpen={group.defaultOpen} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* No Footer - Moved to TopBar */}
        </aside>
    );
}
