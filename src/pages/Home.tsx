import { Link } from 'react-router-dom';
import { Play, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { MOCK_HOME_DASHBOARD } from './homeMock';
import { MODULE_CONFIG } from '../config/modules';

/**
 * Home - Focus Mode
 * 
 * 4 blocs hiérarchisés:
 * 1. Continuer (Primary CTA)
 * 2. À revoir (pédagogique, pas échéances)
 * 3. Mes matières (grid cards, pas table admin)
 * 4. Mises à jour (signal)
 */

// ============================================
// 1. CONTINUER - Primary CTA
// ============================================
function ContinueHero() {
    const lastModule = MOCK_HOME_DASHBOARD.moduleProgress.find(m => m.lastAction);

    const title = lastModule?.lastAction || 'Commencer avec Macroéconomie';
    const subtitle = lastModule?.title || 'Chapitre 1';
    const timeLeft = '12 min restantes';
    const href = lastModule?.href || '/macro';

    return (
        <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Reprendre
                    </p>
                    <h2 className="text-lg font-semibold text-foreground mb-1">
                        {title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{subtitle}</span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {timeLeft}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Changer
                    </button>
                    <Link
                        to={href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-all no-underline shadow-sm"
                    >
                        <Play size={14} fill="currentColor" />
                        Continuer
                    </Link>
                </div>
            </div>
        </Card>
    );
}

// ============================================
// 2. À REVOIR - Pédagogique (2-5 items)
// ============================================
function ToReviewSection() {
    const reviewItems = [
        { id: 1, title: 'Revoir Chapitre 3', subtitle: 'Équilibre IS-LM', time: '5 min', href: '/macro/chapitre-3' },
        { id: 2, title: 'QCM Variables aléatoires', subtitle: 'Statistiques', time: '7 min', href: '/stats/qcm' },
        { id: 3, title: 'TD Microéconomie', subtitle: 'Élasticités', time: '10 min', href: '/micro/td' },
    ];

    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <RefreshCw size={16} className="text-accent" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    À revoir aujourd'hui
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reviewItems.map(item => (
                    <Link
                        key={item.id}
                        to={item.href}
                        className="group p-4 rounded-lg bg-card border border-border hover:border-accent/30 hover:shadow-sm transition-all no-underline"
                    >
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors mb-1">
                            {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                            {item.subtitle}
                        </p>
                        <p className="text-xs text-accent flex items-center gap-1">
                            <Clock size={12} />
                            {item.time}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

// ============================================
// 3. MES MATIÈRES - Grid Cards (pas table admin)
// ============================================
function CoursesGrid() {
    const modules = MOCK_HOME_DASHBOARD.moduleProgress;

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Mes matières
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map(module => {
                    const config = MODULE_CONFIG[module.id];
                    const Icon = config.icon;

                    return (
                        <Link
                            key={module.id}
                            to={module.href}
                            className="group p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all no-underline"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${config.iconBgLight} flex items-center justify-center`}>
                                        <Icon size={18} className={config.text} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                            {module.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {module.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Progress bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Progression</span>
                                    <span className="font-medium text-accent tabular-nums">{module.progress}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent rounded-full transition-all duration-500"
                                        style={{ width: `${module.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Dernier : {module.lastAction || module.subtitle}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

// ============================================
// 4. MISES À JOUR - Signal (pas bruit)
// ============================================
function UpdatesFeed() {
    const updates = MOCK_HOME_DASHBOARD.nouveautes.slice(0, 3);

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Mises à jour
                </h3>
                <Link to="/nouveautes" className="text-sm text-accent hover:text-accent/80 no-underline font-medium">
                    Voir tout
                </Link>
            </div>

            <Card className="divide-y divide-border">
                {updates.map(item => {
                    const config = MODULE_CONFIG[item.module];

                    return (
                        <Link
                            key={item.id}
                            to={item.href}
                            className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors no-underline group"
                        >
                            <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground group-hover:text-accent transition-colors truncate font-medium">
                                    {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {config.name} · {item.date}
                                </p>
                            </div>
                            <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </Link>
                    );
                })}
            </Card>
        </section>
    );
}

// ============================================
// MAIN
// ============================================
export function Home() {
    const { user } = useAuth();
    const firstName = user?.displayName?.split(' ')[0] || 'Étudiant';

    return (
        <div className="max-w-4xl mx-auto">
            {/* Simple header */}
            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground">
                    Bonjour, {firstName}
                </h1>
            </header>

            {/* Focus Mode - 4 blocs hiérarchisés */}
            <div className="space-y-8">
                {/* 1. Continuer */}
                <ContinueHero />

                {/* 2. À revoir */}
                <ToReviewSection />

                {/* 3. Mes matières */}
                <CoursesGrid />

                {/* 4. Mises à jour */}
                <UpdatesFeed />
            </div>
        </div>
    );
}
