import { Link } from 'react-router-dom';
import {
    TrendingUp,
    ArrowRight,
    Play,
    PieChart,
    BarChart3,
    Users,
    Calendar,
    Lightbulb,
    Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { MOCK_HOME_DASHBOARD, type ModuleProgress, type ContentItem, type DeadlineItem } from './homeMock';

// Explicit color classes for Tailwind
const moduleStyles = {
    macro: {
        iconBg: 'bg-blue-500',
        iconBgLight: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400',
        dot: 'bg-blue-500'
    },
    micro: {
        iconBg: 'bg-emerald-500',
        iconBgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500'
    },
    stats: {
        iconBg: 'bg-amber-500',
        iconBgLight: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500'
    },
    socio: {
        iconBg: 'bg-violet-500',
        iconBgLight: 'bg-violet-50 dark:bg-violet-500/10',
        text: 'text-violet-600 dark:text-violet-400',
        dot: 'bg-violet-500'
    }
} as const;

const moduleIcons = {
    macro: TrendingUp,
    micro: PieChart,
    stats: BarChart3,
    socio: Users
} as const;

const contentTypeStyles = {
    'Chapitre': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Fiche': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    'QCM': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    'Annale': 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
} as const;

// Resume Hero
function ResumeHero() {
    // Find module with most recent activity
    const lastModule = MOCK_HOME_DASHBOARD.moduleProgress.find(m => m.lastAction);
    
    if (!lastModule) {
        return (
            <Card className="p-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0">
                            <Play size={18} fill="currentColor" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                                Commencer
                            </p>
                            <p className="text-sm font-semibold text-foreground truncate">
                                Commencer avec Macroéconomie
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        to="/macro"
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Continuer
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </Card>
        );
    }

    const styles = moduleStyles[lastModule.id];

    return (
        <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-11 h-11 rounded-xl ${styles.iconBg} flex items-center justify-center text-white shrink-0`}>
                        <Play size={18} fill="currentColor" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                            Reprendre
                        </p>
                        <p className="text-sm font-semibold text-foreground truncate">
                            {lastModule.lastAction}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {lastModule.title} · {lastModule.lastActionTime}
                        </p>
                    </div>
                </div>
                
                <Link 
                    to={lastModule.href}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    Continuer
                    <ArrowRight size={14} />
                </Link>
            </div>
        </Card>
    );
}

// Module card with progress
function ModuleProgressCard({ module }: { module: ModuleProgress }) {
    const styles = moduleStyles[module.id];
    const Icon = moduleIcons[module.id];

    return (
        <Link to={module.href} className="no-underline group focus-visible:outline-none">
            <Card className="p-4 h-full min-h-[120px] hover:bg-muted/50 transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-3">
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

                    <div className="mt-auto space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{module.completed}/{module.total} chapitres</span>
                            <span className="font-medium text-foreground">{module.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${styles.iconBg} transition-all duration-300`}
                                style={{ width: `${module.progress}%` }}
                            />
                        </div>
                        {module.lastAction && (
                            <p className="text-xs text-muted-foreground truncate">
                                Dernier : {module.lastAction}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Content item (Nouveautés)
function ContentItemRow({ item }: { item: ContentItem }) {
    const styles = moduleStyles[item.module];
    const typeStyle = contentTypeStyles[item.type];

    return (
        <Link 
            to={item.href} 
            className="flex items-center gap-3 py-2.5 min-h-[44px] hover:bg-muted/50 -mx-1 px-1 rounded transition-colors no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${typeStyle} shrink-0`}>
                {item.type}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${styles.dot} shrink-0`} />
            <span className="flex-1 text-sm text-foreground/80 truncate group-hover:text-foreground transition-colors">
                {item.title}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
        </Link>
    );
}

// Deadline item
function DeadlineItemRow({ item }: { item: DeadlineItem }) {
    return (
        <Link 
            to={item.href} 
            className="flex items-center gap-3 py-2.5 min-h-[44px] hover:bg-muted/50 -mx-1 px-1 rounded transition-colors no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <Calendar size={14} className="text-muted-foreground shrink-0" />
            <span className="flex-1 text-sm text-foreground/80 truncate group-hover:text-foreground transition-colors">
                {item.title}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                {item.badge}
            </span>
        </Link>
    );
}

// Widget wrapper
function Widget({ title, icon: Icon, children, action }: { 
    title: string; 
    icon: React.ElementType; 
    children: React.ReactNode;
    action?: { label: string; href: string };
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Icon size={14} className="text-muted-foreground" />
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {title}
                    </h3>
                </div>
                {action && (
                    <Link 
                        to={action.href}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 -mx-1"
                    >
                        {action.label}
                    </Link>
                )}
            </div>
            {children}
        </div>
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

    const dashboard = MOCK_HOME_DASHBOARD;

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

                    {/* Modules with Progress */}
                    <section>
                        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                            Progression
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {dashboard.moduleProgress.map(module => (
                                <ModuleProgressCard key={module.id} module={module} />
                            ))}
                        </div>
                    </section>

                    {/* Nouveautés */}
                    <section>
                        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                            Nouveautés
                        </h2>
                        <Card className="p-4">
                            <div className="space-y-0.5">
                                {dashboard.nouveautes.map(item => (
                                    <ContentItemRow key={item.id} item={item} />
                                ))}
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Right column (4 cols) */}
                <aside className="lg:col-span-4 space-y-6">
                    {/* Échéances */}
                    <Card className="p-4">
                        <Widget 
                            title="Échéances" 
                            icon={Calendar}
                            action={{ label: 'Voir tout', href: '/deadlines' }}
                        >
                            <div className="space-y-0.5">
                                {dashboard.deadlines.map(item => (
                                    <DeadlineItemRow key={item.id} item={item} />
                                ))}
                            </div>
                        </Widget>
                    </Card>

                    {/* Annonces */}
                    <Card className="p-4">
                        <Widget title="Infos" icon={Lightbulb}>
                            <div className="space-y-3">
                                {dashboard.announcements.map(item => (
                                    <div 
                                        key={item.id}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <Sparkles size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                        <p className="text-foreground/80 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Widget>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
