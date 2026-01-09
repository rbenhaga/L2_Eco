import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    ArrowRight,
    Play,
    PieChart,
    BarChart3,
    Users,
    Clock,
    BookMarked
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';

// Explicit color classes for Tailwind
const moduleStyles = {
    macro: {
        iconBg: 'bg-blue-500',
        iconBgLight: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400',
    },
    micro: {
        iconBg: 'bg-emerald-500',
        iconBgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
    },
    stats: {
        iconBg: 'bg-amber-500',
        iconBgLight: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400',
    },
    socio: {
        iconBg: 'bg-violet-500',
        iconBgLight: 'bg-violet-50 dark:bg-violet-500/10',
        text: 'text-violet-600 dark:text-violet-400',
    }
} as const;

type ModuleKey = keyof typeof moduleStyles;

interface Module {
    id: ModuleKey;
    title: string;
    subtitle: string;
    href: string;
    icon: React.ElementType;
}

interface RecentActivity {
    title: string;
    href: string;
    time: string;
    module: ModuleKey;
}

const MODULES: Module[] = [
    { id: 'macro', title: 'Macroéconomie', subtitle: 'IS-LM, AS-AD, Politiques', href: '/macro', icon: TrendingUp },
    { id: 'micro', title: 'Microéconomie', subtitle: 'Consommateur, Producteur', href: '/micro', icon: PieChart },
    { id: 'stats', title: 'Statistiques', subtitle: 'Probabilités, Variables', href: '/stats', icon: BarChart3 },
    { id: 'socio', title: 'Sociologie', subtitle: 'Weber, Durkheim', href: '/socio', icon: Users },
];

// Hook to get recent activity from localStorage
function useRecentActivity(): RecentActivity[] {
    const [activity, setActivity] = useState<RecentActivity[]>([]);
    
    useEffect(() => {
        try {
            const stored = localStorage.getItem('recent_activity');
            if (stored) {
                setActivity(JSON.parse(stored));
            }
        } catch { /* silent */ }
    }, []);
    
    return activity;
}

// Hook to get last chapter from localStorage
function useLastChapter() {
    const [lastChapter, setLastChapter] = useState<{ title: string; href: string; module?: string } | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('last_chapter');
            if (stored) setLastChapter(JSON.parse(stored));
        } catch { /* silent */ }
    }, []);

    return lastChapter;
}

// Resume Hero
function ResumeHero() {
    const lastChapter = useLastChapter();
    const recentActivity = useRecentActivity();

    const displayData = lastChapter || {
        title: 'Commencer avec Macroéconomie',
        href: '/macro',
        module: 'macro'
    };

    const styles = moduleStyles[(displayData.module as ModuleKey) || 'macro'];

    // Get last activity time if available
    const lastActivityTime = recentActivity.length > 0 ? recentActivity[0].time : null;

    return (
        <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-11 h-11 rounded-xl ${styles.iconBg} flex items-center justify-center text-white shrink-0`}>
                        <Play size={18} fill="currentColor" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                            {lastChapter ? 'Reprendre' : 'Commencer'}
                        </p>
                        <p className="text-sm font-semibold text-foreground truncate">
                            {displayData.title}
                        </p>
                        {lastChapter && lastActivityTime && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Dernière activité : {lastActivityTime}
                            </p>
                        )}
                    </div>
                </div>
                
                <Link 
                    to={displayData.href}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    Continuer
                    <ArrowRight size={14} />
                </Link>
            </div>
        </Card>
    );
}

// Module card (2x2 grid)
function ModuleCard({ module }: { module: Module }) {
    const styles = moduleStyles[module.id];
    const Icon = module.icon;

    return (
        <Link to={module.href} className="no-underline group focus-visible:outline-none">
            <Card className="p-4 h-full min-h-[88px] hover:bg-muted/50 transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${styles.iconBgLight} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                        <Icon size={16} className={styles.text} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {module.title}
                            </h3>
                            <ArrowRight 
                                size={14} 
                                className="text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0 mt-0.5" 
                            />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                            {module.subtitle}
                        </p>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Recent activity item
function RecentItem({ title, href, time, module }: RecentActivity) {
    const styles = moduleStyles[module];
    
    return (
        <Link to={href} className="flex items-center gap-3 py-2.5 hover:bg-muted/50 -mx-1 px-1 rounded transition-colors no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className={`w-1.5 h-1.5 rounded-full ${styles.iconBg}`} />
            <span className="flex-1 text-sm text-foreground/80 truncate group-hover:text-foreground transition-colors">
                {title}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">{time}</span>
        </Link>
    );
}

// Empty state for sidebar widgets
function EmptyState({ message }: { message: string }) {
    return (
        <p className="text-sm text-muted-foreground py-3 text-center">
            {message}
        </p>
    );
}

// Sidebar widget wrapper
function Widget({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <Icon size={14} className="text-muted-foreground" />
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

export function Home() {
    const { user } = useAuth();
    const firstName = user?.displayName?.split(' ')[0] || 'Étudiant';
    const recentActivity = useRecentActivity();

    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    });

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Bonjour, {firstName}
                </h1>
                <p className="text-muted-foreground text-sm capitalize mt-0.5">
                    {dateStr}
                </p>
            </header>

            {/* Main grid: 8 + 4 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Resume Hero */}
                    <ResumeHero />

                    {/* Modules 2x2 */}
                    <section>
                        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                            Modules
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {MODULES.map(module => (
                                <ModuleCard key={module.id} module={module} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right column (4 cols) */}
                <aside className="lg:col-span-4 space-y-6">
                    {/* Recent Activity */}
                    <Card className="p-4">
                        <Widget title="Activité récente" icon={Clock}>
                            {recentActivity.length > 0 ? (
                                <div className="space-y-0.5">
                                    {recentActivity.slice(0, 5).map((item, i) => (
                                        <RecentItem key={i} {...item} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="Aucune activité" />
                            )}
                        </Widget>
                    </Card>

                    {/* Quick revision */}
                    <Card className="p-4">
                        <Widget title="À réviser" icon={BookMarked}>
                            <div className="space-y-2">
                                <Link 
                                    to="/macro/revision" 
                                    className="block text-sm text-foreground/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 py-0.5 -mx-1"
                                >
                                    Fiche IS-LM
                                </Link>
                                <Link 
                                    to="/stats/revision" 
                                    className="block text-sm text-foreground/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 py-0.5 -mx-1"
                                >
                                    Formules Probas
                                </Link>
                            </div>
                        </Widget>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
