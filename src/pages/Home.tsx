import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Play,
    Calendar,
    Lightbulb,
    Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { MOCK_HOME_DASHBOARD, type ModuleProgress, type ContentItem, type DeadlineItem } from './homeMock';
import { MODULE_CONFIG, CONTENT_TYPE_STYLES } from '../config/modules';

// Resume Hero
function ResumeHero() {
    // Find module with most recent activity
    const lastModule = MOCK_HOME_DASHBOARD.moduleProgress.find(m => m.lastAction);
    
    if (!lastModule) {
        return (
            <Card className="p-6 xl:p-7">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                            <Play size={20} fill="currentColor" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                Commencer
                            </p>
                            <p className="text-base xl:text-lg font-semibold text-foreground truncate">
                                Commencer avec Macroéconomie
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        to="/macro"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 active:scale-[0.98] transition-all no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                        Continuer
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 xl:p-7">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Reprendre
                        </p>
                        <p className="text-base xl:text-lg font-semibold text-foreground truncate">
                            {lastModule.lastAction}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {lastModule.title} · {lastModule.lastActionTime}
                        </p>
                    </div>
                </div>
                
                <Link 
                    to={lastModule.href}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 active:scale-[0.98] transition-all no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                    Continuer
                    <ArrowRight size={16} />
                </Link>
            </div>
        </Card>
    );
}

// Module card with progress
function ModuleProgressCard({ module }: { module: ModuleProgress }) {
    const config = MODULE_CONFIG[module.id];
    const Icon = config.icon;

    return (
        <Link to={module.href} className="no-underline group focus-visible:outline-none">
            <Card className="p-5 xl:p-6 h-full min-h-[140px] hover:bg-muted/30 transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg ${config.iconBgLight} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                            <Icon size={18} className={config.text} />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-base xl:text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                                    {module.title}
                                </h3>
                                <ArrowRight 
                                    size={16} 
                                    className="text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0 mt-1" 
                                />
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {module.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{module.completed}/{module.total} chapitres</span>
                            <span className="font-semibold text-foreground">{module.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-foreground/80 transition-all duration-300"
                                style={{ width: `${module.progress}%` }}
                            />
                        </div>
                        {module.lastAction && (
                            <p className="text-sm text-muted-foreground truncate pt-1">
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
    const config = MODULE_CONFIG[item.module];
    const typeStyle = CONTENT_TYPE_STYLES[item.type];

    return (
        <Link 
            to={item.href} 
            className="flex items-center gap-3 py-3.5 min-h-[52px] hover:bg-muted/30 -mx-1 px-1 rounded-lg transition-colors no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${typeStyle} shrink-0`}>
                {item.type}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
                {config.name}
            </span>
            <span className="flex-1 text-sm xl:text-base text-foreground/80 truncate group-hover:text-foreground transition-colors">
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
            className="flex items-center gap-3 py-3 min-h-[48px] hover:bg-muted/30 -mx-1 px-1 rounded-lg transition-colors no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <Calendar size={16} className="text-muted-foreground shrink-0" />
            <span className="flex-1 text-sm xl:text-base text-foreground/80 truncate group-hover:text-foreground transition-colors">
                {item.title}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground shrink-0">
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
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon size={16} className="text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                        {title}
                    </h3>
                </div>
                {action && (
                    <Link 
                        to={action.href}
                        className="text-xs text-accent hover:text-accent/80 hover:underline no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 -mx-1"
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl xl:text-4xl font-bold text-foreground tracking-tight">
                    Bonjour, {firstName}
                </h1>
                <p className="text-muted-foreground text-base capitalize mt-1">
                    {dateStr}
                </p>
            </header>

            {/* Main grid: 8 + 4 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
                {/* Left column (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Resume Hero */}
                    <ResumeHero />

                    {/* Modules with Progress */}
                    <section>
                        <h2 className="text-base xl:text-lg font-semibold text-foreground mb-4">
                            Progression
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {dashboard.moduleProgress.map(module => (
                                <ModuleProgressCard key={module.id} module={module} />
                            ))}
                        </div>
                    </section>

                    {/* Nouveautés */}
                    <section>
                        <h2 className="text-base xl:text-lg font-semibold text-foreground mb-4">
                            Nouveautés
                        </h2>
                        <Card className="p-5 xl:p-6">
                            <div className="space-y-1">
                                {dashboard.nouveautes.slice(0, 4).map(item => (
                                    <ContentItemRow key={item.id} item={item} />
                                ))}
                            </div>
                            {dashboard.nouveautes.length > 4 && (
                                <div className="mt-4 pt-4 border-t border-border">
                                    <Link 
                                        to="/nouveautes"
                                        className="text-sm text-accent hover:text-accent/80 hover:underline no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 -mx-1"
                                    >
                                        Voir tout ({dashboard.nouveautes.length})
                                    </Link>
                                </div>
                            )}
                        </Card>
                    </section>
                </div>

                {/* Right column (4 cols) */}
                <aside className="lg:col-span-4 space-y-6">
                    {/* Échéances */}
                    <Card className="p-5 xl:p-6">
                        <Widget 
                            title="Échéances" 
                            icon={Calendar}
                            action={{ label: 'Voir tout', href: '/deadlines' }}
                        >
                            <div className="space-y-1">
                                {dashboard.deadlines.map(item => (
                                    <DeadlineItemRow key={item.id} item={item} />
                                ))}
                            </div>
                        </Widget>
                    </Card>

                    {/* Annonces */}
                    <Card className="p-5 xl:p-6">
                        <Widget title="Infos" icon={Lightbulb}>
                            <div className="space-y-4">
                                {dashboard.announcements.map(item => (
                                    <div 
                                        key={item.id}
                                        className="flex items-start gap-2.5 text-sm xl:text-base"
                                    >
                                        <Sparkles size={16} className="text-accent/60 shrink-0 mt-0.5" />
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
