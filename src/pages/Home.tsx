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

// Explicit color classes for Tailwind compilation
const moduleStyles = {
    macro: {
        iconBg: 'bg-blue-500',
        iconBgLight: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400',
        ring: 'ring-blue-500/20',
    },
    micro: {
        iconBg: 'bg-emerald-500',
        iconBgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        ring: 'ring-emerald-500/20',
    },
    stats: {
        iconBg: 'bg-amber-500',
        iconBgLight: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400',
        ring: 'ring-amber-500/20',
    },
    socio: {
        iconBg: 'bg-violet-500',
        iconBgLight: 'bg-violet-50 dark:bg-violet-500/10',
        text: 'text-violet-600 dark:text-violet-400',
        ring: 'ring-violet-500/20',
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

const MODULES: Module[] = [
    { id: 'macro', title: 'Macroéconomie', subtitle: 'IS-LM, AS-AD, Politiques', href: '/macro', icon: TrendingUp },
    { id: 'micro', title: 'Microéconomie', subtitle: 'Consommateur, Producteur', href: '/micro', icon: PieChart },
    { id: 'stats', title: 'Statistiques', subtitle: 'Probabilités, Variables', href: '/stats', icon: BarChart3 },
    { id: 'socio', title: 'Sociologie', subtitle: 'Weber, Durkheim', href: '/socio', icon: Users },
];

// Resume Hero
function ResumeHero() {
    const [lastChapter, setLastChapter] = useState<{ title: string; href: string; module?: string } | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('last_chapter');
            if (stored) setLastChapter(JSON.parse(stored));
        } catch { /* silent */ }
    }, []);

    const displayData = lastChapter || {
        title: 'Commencer avec Macroéconomie',
        href: '/macro',
        module: 'macro'
    };

    const styles = moduleStyles[(displayData.module as ModuleKey) || 'macro'];

    return (
        <Card className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center text-white shrink-0`}>
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            {lastChapter ? 'Reprendre' : 'Commencer'}
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {displayData.title}
                        </p>
                    </div>
                </div>
                
                <Link 
                    to={displayData.href}
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-[0.98] transition-all no-underline"
                >
                    Continuer
                    <ArrowRight size={16} />
                </Link>
            </div>
        </Card>
    );
}

// Module card (grid style)
function ModuleCard({ module }: { module: Module }) {
    const styles = moduleStyles[module.id];
    const Icon = module.icon;

    return (
        <Link to={module.href} className="no-underline group">
            <Card className="p-4 h-full hover:ring-2 hover:ring-blue-500/10 dark:hover:ring-blue-400/10">
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${styles.iconBgLight} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                        <Icon size={18} className={styles.text} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {module.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {module.subtitle}
                        </p>
                    </div>
                    <ArrowRight 
                        size={14} 
                        className="text-gray-300 dark:text-gray-600 mt-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" 
                    />
                </div>
            </Card>
        </Link>
    );
}

// Recent activity item
function RecentItem({ title, time, module }: { title: string; time: string; module: ModuleKey }) {
    const styles = moduleStyles[module];
    
    return (
        <div className="flex items-center gap-3 py-2">
            <div className={`w-2 h-2 rounded-full ${styles.iconBg}`} />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{title}</p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{time}</span>
        </div>
    );
}

// Sidebar widget
function SidebarWidget({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
                <Icon size={14} className="text-gray-400 dark:text-gray-500" />
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {title}
                </h3>
            </div>
            {children}
        </Card>
    );
}

export function Home() {
    const { user } = useAuth();
    const firstName = user?.displayName?.split(' ')[0] || 'Étudiant';

    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    });

    // Mock recent activity (would come from localStorage in real app)
    const recentActivity = [
        { title: 'Chapitre 3 : Modèle AS-AD', time: 'Hier', module: 'macro' as ModuleKey },
        { title: 'QCM Variables aléatoires', time: '2j', module: 'stats' as ModuleKey },
        { title: 'Fiche Consommateur', time: '3j', module: 'micro' as ModuleKey },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Bonjour, {firstName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm capitalize mt-1">
                    {dateStr}
                </p>
            </header>

            {/* Main grid: 8 + 4 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Resume Hero */}
                    <ResumeHero />

                    {/* Modules */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
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
                <div className="lg:col-span-4 space-y-4">
                    {/* Recent Activity */}
                    <SidebarWidget title="Activité récente" icon={Clock}>
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                            {recentActivity.map((item, i) => (
                                <RecentItem key={i} {...item} />
                            ))}
                        </div>
                        {recentActivity.length === 0 && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 py-2">
                                Aucune activité récente
                            </p>
                        )}
                    </SidebarWidget>

                    {/* Quick revision */}
                    <SidebarWidget title="À réviser" icon={BookMarked}>
                        <div className="space-y-2">
                            <Link 
                                to="/macro/revision" 
                                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
                            >
                                Fiche IS-LM
                            </Link>
                            <Link 
                                to="/stats/revision" 
                                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
                            >
                                Formules Probas
                            </Link>
                        </div>
                    </SidebarWidget>
                </div>
            </div>
        </div>
    );
}
