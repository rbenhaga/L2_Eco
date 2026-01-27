import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Headphones,
    PlayCircle,
    FileText,
    Brain,
    ClipboardList,
    ArrowRight,
    ChevronRight,
    Sparkles,
    X,
    ArrowLeft,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { Math as MathComponent } from '../index';

// Import QCM Player
import { QCMPlayer } from '../../features/qcm';
import type { QCMConfig } from '../../features/qcm';

// Import QCM data
import macroQCMData from '../../modules/s3/macro/data/qcm.json';
import { chapters as microQCMChapters } from '../../modules/s3/micro/data/chapters';
import { chapters as statsQCMChapters } from '../../modules/s3/stats/data/chapters';
import { chapters as socioQCMChapters } from '../../modules/s3/socio/data/chapters';

// Import TD data
import { tdThemes as statsTDThemes } from '../../modules/s3/stats/data/td';
import type { TDTheme } from '../../modules/s3/stats/data/td';
import { microTDSheets } from '../../modules/s3/micro/data/td';
import type { MicroTDSheet } from '../../modules/s3/micro/data/td';
import { macroTDSheets } from '../../modules/s3/macro/data/td';
import type { MacroTDSheet } from '../../modules/s3/macro/data/td';

// ============================================
// INTEGRATED VIEWERS
// ============================================

// QCM Viewer - Integrated into ModuleHub
function QCMViewerIntegrated({ moduleId, baseRoute, onBack }: { moduleId: string; baseRoute: string; onBack: () => void }) {
    // Get QCM config based on module
    const getQCMConfig = (): QCMConfig | null => {
        switch (moduleId) {
            case 'macro':
                return macroQCMData as QCMConfig;
            case 'micro':
                return {
                    subject: 'Microéconomie',
                    subjectId: 'micro',
                    description: `${microQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                    chapters: microQCMChapters.map(ch => ({
                        id: ch.id,
                        title: ch.title,
                        subtitle: ch.subtitle,
                        color: ch.color,
                        questions: ch.questions.map(q => ({
                            id: `${ch.id}-${q.id}`,
                            question: q.question,
                            options: q.options,
                            correctIndex: q.correct,
                            explanation: q.explanation
                        }))
                    }))
                } as QCMConfig;
            case 'stats':
                return {
                    subject: 'Statistiques',
                    subjectId: 'stats',
                    description: `${statsQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                    chapters: statsQCMChapters.map(ch => ({
                        id: ch.id,
                        title: ch.title,
                        subtitle: ch.subtitle,
                        color: ch.color,
                        questions: ch.questions.map(q => ({
                            id: `${ch.id}-${q.id}`,
                            question: q.question,
                            options: q.options,
                            correctIndex: q.correct,
                            explanation: q.explanation
                        }))
                    }))
                } as QCMConfig;
            case 'socio':
                return {
                    subject: 'Sociologie',
                    subjectId: 'socio',
                    description: `${socioQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                    chapters: socioQCMChapters.map(ch => ({
                        id: ch.id,
                        title: ch.title,
                        subtitle: ch.subtitle,
                        color: ch.color,
                        questions: ch.questions.map(q => ({
                            id: `${ch.id}-${q.id}`,
                            question: q.question,
                            options: q.options,
                            correctIndex: q.correct,
                            explanation: q.explanation
                        }))
                    }))
                } as QCMConfig;
            default:
                return null;
        }
    };

    const config = getQCMConfig();
    
    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-600 mb-4">QCM non disponible pour ce module</p>
                    <button onClick={onBack} className="btn-primary">Retour</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <QCMPlayer
                config={config}
                subjectColor="rgb(var(--accent))"
                backLink={baseRoute}
            />
        </div>
    );
}

// TD Viewer - Integrated into ModuleHub
function TDViewerIntegrated({ moduleId, tdId, onBack }: { moduleId: string; tdId: string; baseRoute: string; onBack: () => void }) {
    const tdContent = getTDContent(moduleId, tdId);

    if (!tdContent) {
        return (
            <div className="min-h-screen pb-16" data-theme="light">
                <div className="px-6 lg:px-10">
                    <div className="mx-auto max-w-5xl pt-6">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:text-[rgb(var(--accent))]"
                            style={{ color: 'rgb(var(--text-secondary))' }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux TD
                        </button>
                        
                        <div className="p-8 rounded-2xl border text-center" style={{ background: 'rgb(var(--surface-1))', borderColor: 'rgb(var(--border))' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                                <ClipboardList className="h-8 w-8" style={{ color: 'rgb(var(--accent))' }} />
                            </div>
                            <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                                TD non disponible
                            </h2>
                            <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                                Ce TD n'est pas encore disponible pour ce module.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16" data-theme="light">
            <div className="px-6 lg:px-10">
                <main className="mx-auto max-w-6xl pt-6">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:text-[rgb(var(--accent))]"
                        style={{ color: 'rgb(var(--text-secondary))' }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux TD
                    </button>
                    
                    {tdContent}
                </main>
            </div>
        </div>
    );
}

// Helper function to get TD content
function getTDContent(moduleId: string, tdId: string) {
    switch (moduleId) {
        case 'stats':
            return getStatsTDContent(tdId);
        case 'micro':
            return getMicroTDContent(tdId);
        case 'macro':
            return getMacroTDContent(tdId);
        case 'socio':
        default:
            return null;
    }
}

// Helper function to get Stats TD content
function getStatsTDContent(tdId: string) {
    const theme = statsTDThemes.find(t => t.id === tdId);
    if (!theme) return null;
    
    return <StatsTDViewer theme={theme} />;
}

// Helper function to get Micro TD content
function getMicroTDContent(tdId: string) {
    const td = microTDSheets.find(t => t.id === tdId);
    if (!td) return null;
    
    return <MicroTDViewer td={td} />;
}

// Helper function to get Macro TD content
function getMacroTDContent(tdId: string) {
    const td = macroTDSheets.find(t => t.id === tdId);
    if (!td) return null;
    
    return <MacroTDViewer td={td} />;
}

// Stats TD Viewer Component
function StatsTDViewer({ theme }: { theme: TDTheme }) {
    const [selectedYear, setSelectedYear] = useState(theme.years[0].year);
    const selectedTD = theme.years.find(y => y.year === selectedYear)?.td;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{ background: 'rgb(var(--accent))' }}>
                        {theme.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                        {theme.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                    TD{theme.number} — {theme.title}
                </h1>
                <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                    {theme.description}
                </p>
            </div>

            {/* Year selector */}
            {theme.years.length > 1 && (
                <div className="flex gap-2 mb-8">
                    {theme.years.map((y) => (
                        <button
                            key={y.year}
                            onClick={() => setSelectedYear(y.year)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                                selectedYear === y.year
                                    ? 'shadow-lg'
                                    : 'hover:bg-[rgb(var(--surface-2))]'
                            }`}
                            style={{
                                background: selectedYear === y.year ? 'rgb(var(--accent))' : 'rgb(var(--surface-1))',
                                color: selectedYear === y.year ? 'white' : 'rgb(var(--text-secondary))',
                                border: '1px solid',
                                borderColor: selectedYear === y.year ? 'transparent' : 'rgb(var(--border))'
                            }}
                        >
                            <Clock className="h-4 w-4" />
                            {y.year}
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                                selectedYear === y.year ? 'bg-white/20' : 'bg-[rgb(var(--surface-2))]'
                            }`}>
                                {y.td.exercises.length}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Exercises */}
            {selectedTD && selectedTD.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// Micro TD Viewer Component
function MicroTDViewer({ td }: { td: MicroTDSheet }) {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{ background: 'rgb(var(--accent))' }}>
                        {td.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                        {td.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                    TD{td.number} — {td.title}
                </h1>
                <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                    {td.description}
                </p>
            </div>

            {/* Reminders */}
            {td.reminders && td.reminders.length > 0 && (
                <div className="mb-8 border rounded-xl overflow-hidden" style={{ borderColor: 'rgb(var(--border))' }}>
                    <div className="px-5 py-4" style={{ background: 'rgb(var(--surface-1))' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="h-5 w-5" style={{ color: 'rgb(var(--text-muted))' }} />
                            <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>Rappels de cours</span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {td.reminders.map((reminder, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>{reminder.title}</div>
                                    <div className="text-sm" style={{ color: 'rgb(var(--text))' }}><MathComponent>{reminder.formula}</MathComponent></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Exercises */}
            {td.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// Macro TD Viewer Component
function MacroTDViewer({ td }: { td: MacroTDSheet }) {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{ background: 'rgb(var(--accent))' }}>
                        {td.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                        {td.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                    Exercice {td.number} — {td.title}
                </h1>
                <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                    {td.description}
                </p>
            </div>

            {/* Exercises */}
            {td.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// TD Exercise Card Component
function TDExerciseCard({ exercise, index }: { exercise: any; index: number }) {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="mb-6 rounded-xl border overflow-hidden" style={{ background: 'rgb(var(--surface-1))', borderColor: 'rgb(var(--border))', boxShadow: 'var(--shadow-1)' }}>
            <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))' }}>
                            <FileText className="h-4 w-4" />
                        </span>
                        <h4 className="font-semibold text-lg leading-tight" style={{ color: 'rgb(var(--text))' }}>
                            Exercice {index} : {exercise.title}
                        </h4>
                    </div>
                </div>
                <div className="leading-relaxed pl-11" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {exercise.content}
                </div>
            </div>
            
            <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full px-6 py-4 flex items-center justify-center gap-2 transition-colors border-t"
                style={{ 
                    color: 'rgb(var(--accent))',
                    borderColor: 'rgb(var(--border-hairline))',
                    background: showSolution ? 'rgb(var(--accent) / 0.05)' : 'transparent'
                }}
            >
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">{showSolution ? 'Masquer la correction' : 'Voir la correction'}</span>
                {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {showSolution && (
                <div className="p-6 border-t" style={{ background: 'rgb(var(--accent) / 0.05)', borderColor: 'rgb(var(--accent) / 0.2)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                        <span className="font-semibold" style={{ color: 'rgb(var(--accent))' }}>Correction détaillée</span>
                    </div>
                    <div className="leading-relaxed" style={{ color: 'rgb(var(--text))' }}>
                        {exercise.solution}
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getTDCount(moduleId: string): number {
    const counts: Record<string, number> = {
        macro: 7,
        micro: 7,
        stats: 6,
        socio: 0
    };
    return counts[moduleId] || 0;
}

function getQCMCount(moduleId: string): number {
    const counts: Record<string, number> = {
        macro: 6,
        micro: 7,
        stats: 5,
        socio: 4
    };
    return counts[moduleId] || 0;
}

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ModuleChapter {
    id: string;
    number: string;
    title: string;
    description: string;
    path: string;
    hasAudio: boolean;
    hasIntroVideo: boolean;
    isCompleted: boolean;
    isTDCompleted: boolean;
    isNew?: boolean;
    isUpdated?: boolean;
    difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
    estimatedTime?: string;
}

export interface ModuleStats {
    totalChapters: number;
    completedCourses: number;
    completedTDs: number;
    overallProgress: number;
}

export interface RecentUpdate {
    text: string;
    path?: string;
}

export type ContentType = 'cours' | 'td' | 'qcm' | 'annales';

export interface ModuleHubProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    chapters: ModuleChapter[];
    stats: ModuleStats;
    baseRoute: string;
    moduleId: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
    recentUpdate?: RecentUpdate;
    introVideoUrl?: string;
}

export default function ModuleHub({
    title,
    description,
    icon,
    chapters,
    stats,
    baseRoute,
    moduleId,
    recentUpdate,
    introVideoUrl
}: ModuleHubProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab') as ContentType | null;
    const qcmIdParam = searchParams.get('qcm');
    const tdIdParam = searchParams.get('td');
    
    const [contentType, setContentType] = useState<ContentType>(tabParam || 'cours');
    const [showBanner, setShowBanner] = useState(true);
    
    // Sync with URL params
    useEffect(() => {
        if (tabParam && ['cours', 'td', 'qcm', 'annales'].includes(tabParam)) {
            setContentType(tabParam as ContentType);
        }
    }, [tabParam]);
    
    // Update URL when tab changes
    const handleTabChange = (newTab: ContentType) => {
        setContentType(newTab);
        setSearchParams({ tab: newTab });
    };
    
    // Handle back from QCM/TD
    const handleBackToList = () => {
        const currentTab = searchParams.get('tab') || 'cours';
        setSearchParams({ tab: currentTab });
    };
    
    // Video progress tracking
    const { introVideoWatched, markIntroWatched } = useVideoProgress(moduleId);
    
    // Find next chapter to continue/start
    const nextChapter = chapters.find(ch => !ch.isCompleted);
    const hasStarted = stats.completedCourses > 0 || chapters.some(ch => ch.isCompleted);
    
    // Check if we're viewing a specific QCM or TD
    const isViewingQCM = qcmIdParam !== null;
    const isViewingTD = tdIdParam !== null;
    
    // Theme colors per module
    const getModuleTheme = () => {
        switch (moduleId) {
            case 'macro':
                return {
                    color: '#1D4ED8', // blue-700
                    colorRgb: '29, 78, 216',
                    gradient: 'from-blue-500 to-indigo-600',
                    bgGradient: 'linear-gradient(135deg, rgba(29, 78, 216, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
                    glowColor: 'rgba(29, 78, 216, 0.15)'
                };
            case 'micro':
                return {
                    color: '#7C3AED', // violet-600
                    colorRgb: '124, 58, 237',
                    gradient: 'from-violet-500 to-purple-600',
                    bgGradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(147, 51, 234, 0.04) 100%)',
                    glowColor: 'rgba(124, 58, 237, 0.15)'
                };
            case 'stats':
                return {
                    color: '#0891B2', // cyan-600
                    colorRgb: '8, 145, 178',
                    gradient: 'from-cyan-500 to-teal-600',
                    bgGradient: 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
                    glowColor: 'rgba(8, 145, 178, 0.15)'
                };
            case 'socio':
                return {
                    color: '#DC2626', // red-600
                    colorRgb: '220, 38, 38',
                    gradient: 'from-red-500 to-rose-600',
                    bgGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(225, 29, 72, 0.04) 100%)',
                    glowColor: 'rgba(220, 38, 38, 0.15)'
                };
            case 'management':
                return {
                    color: '#EA580C', // orange-600
                    colorRgb: '234, 88, 12',
                    gradient: 'from-orange-500 to-amber-600',
                    bgGradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(217, 119, 6, 0.04) 100%)',
                    glowColor: 'rgba(234, 88, 12, 0.15)'
                };
            default:
                return {
                    color: '#1D4ED8',
                    colorRgb: '29, 78, 216',
                    gradient: 'from-blue-500 to-indigo-600',
                    bgGradient: 'linear-gradient(135deg, rgba(29, 78, 216, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
                    glowColor: 'rgba(29, 78, 216, 0.15)'
                };
        }
    };
    
    const theme = getModuleTheme();
    
    // If viewing QCM, render QCM player
    if (isViewingQCM) {
        return <QCMViewerIntegrated moduleId={moduleId} baseRoute={baseRoute} onBack={handleBackToList} />;
    }
    
    // If viewing TD, render TD viewer
    if (isViewingTD) {
        return <TDViewerIntegrated moduleId={moduleId} tdId={tdIdParam} baseRoute={baseRoute} onBack={handleBackToList} />;
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Background Layer 1 - Ambiance study-grade AMÉLIORÉ */}
            <div className="fixed inset-0 -z-10">
                {/* Base gradient doux */}
                <div 
                    className="absolute inset-0"
                    style={{ 
                        background: 'linear-gradient(to bottom, #FAFBFE 0%, #F7F9FF 50%, #F5F7FA 100%)'
                    }}
                />
                
                {/* Gradient thématique très subtil (top) */}
                <div 
                    className="absolute inset-x-0 top-0 h-[400px] opacity-20"
                    style={{ 
                        background: `linear-gradient(to bottom, ${theme.color}15 0%, transparent 100%)`
                    }}
                />
                
                {/* Grain texture premium */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '180px 180px'
                    }}
                />
            </div>
            
            {/* Hero Section - Moderne, compact, professionnel */}
            <section className="relative px-6 lg:px-10 pt-6 pb-8">
                <div className="mx-auto max-w-5xl">
                    {/* Notification intégrée en haut (si présente) */}
                    {recentUpdate && showBanner && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5 bg-white/50 backdrop-blur-sm border border-black/5 text-sm text-slate-700">
                            <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: theme.color }} />
                            {recentUpdate.path ? (
                                <Link to={recentUpdate.path} className="flex-1 truncate no-underline hover:underline font-medium">
                                    {recentUpdate.text}
                                </Link>
                            ) : (
                                <span className="flex-1 truncate font-medium">{recentUpdate.text}</span>
                            )}
                            <button onClick={() => setShowBanner(false)} className="p-0.5 rounded hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                    
                    {/* Hero principal - Layout horizontal dense */}
                    <div className="flex flex-col lg:flex-row gap-5 items-start">
                        {/* Gauche : Info principale + actions */}
                        <div className="flex-1 min-w-0">
                            {/* Header avec icon + titre inline */}
                            <div className="flex items-start gap-3 mb-4">
                                <div 
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br ${theme.gradient} shrink-0`}
                                >
                                    <span className="text-white text-xl">{icon}</span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 mb-1">
                                        {title}
                                    </h1>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Actions row - Vidéo + Stats mobile */}
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Bouton vidéo intro - Plus visible */}
                                {introVideoUrl && (
                                    <button
                                        onClick={markIntroWatched}
                                        className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-black/5 hover:border-black/10 hover:shadow-md transition-all group"
                                    >
                                        <div 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
                                            style={{ background: `${theme.color}15` }}
                                        >
                                            <PlayCircle className="h-5 w-5" style={{ color: theme.color }} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs text-slate-500 font-medium">Vidéo d'introduction</div>
                                            <div className="text-sm font-semibold text-slate-950">5:00 min · Commencer</div>
                                        </div>
                                        {introVideoWatched && (
                                            <CheckCircle2 className="h-4 w-4 ml-1" style={{ color: theme.color }} />
                                        )}
                                    </button>
                                )}
                                
                                {/* Stats inline (mobile uniquement) */}
                                <div className="lg:hidden flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-black/5 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-slate-500" />
                                        <span className="text-slate-600">{stats.totalChapters} chapitres</span>
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span style={{ color: theme.color }} className="font-semibold">{stats.completedCourses} terminés</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Droite : Card de progression (desktop) */}
                        <div className="hidden lg:block shrink-0 w-60">
                            <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                                {/* Cercle de progression + pourcentage */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <svg className="w-16 h-16 -rotate-90">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                fill="none"
                                                stroke="#F1F5F9"
                                                strokeWidth="5"
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                fill="none"
                                                stroke={theme.color}
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                strokeDasharray={`${2 * Math.PI * 28}`}
                                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - stats.overallProgress / 100)}`}
                                                className="transition-all duration-700"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-bold text-slate-950">{stats.overallProgress}%</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-slate-500 mb-0.5">Progression</div>
                                        <div className="text-sm font-semibold text-slate-950">{stats.completedCourses}/{stats.totalChapters}</div>
                                        <div className="text-xs text-slate-500">chapitres</div>
                                    </div>
                                </div>
                                
                                {/* Stats détaillées */}
                                <div className="pt-4 border-t border-black/5 space-y-2.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Total</span>
                                        <span className="font-semibold text-slate-950">{stats.totalChapters}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Terminés</span>
                                        <span className="font-semibold" style={{ color: theme.color }}>{stats.completedCourses}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Restants</span>
                                        <span className="font-semibold text-slate-950">{stats.totalChapters - stats.completedCourses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Layer 2: Container principal raised */}
            <div className="px-6 lg:px-10 -mt-4">
                <div className="mx-auto max-w-5xl">
                    {/* Container principal avec surface raised subtile */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-black/5 shadow-[0_1px_0_rgba(15,23,42,0.06),0_18px_60px_rgba(15,23,42,0.10)] p-8">
                        
                        {/* Continue/Start Card - Layer 3: Bubble */}
                        {nextChapter && (
                            <div className="mb-8">
                                <Link 
                                    to={nextChapter.path} 
                                    className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-200 hover:shadow-md no-underline group border overflow-hidden bg-white"
                                    style={{ 
                                        borderColor: `${theme.color}30`,
                                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
                                    }}
                                >
                                    {/* Gradient au hover */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ background: `linear-gradient(90deg, ${theme.color}05 0%, transparent 100%)` }} 
                                    />
                                    
                                    <div className="relative flex items-center gap-4">
                                        <div 
                                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 text-white"
                                            style={{ background: theme.color }}
                                        >
                                            <PlayCircle className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold mb-0.5 text-slate-950 group-hover:text-[color:var(--color)] transition-colors" style={{ '--color': theme.color } as React.CSSProperties}>
                                                {hasStarted ? 'Reprendre' : 'Commencer'} · Chapitre {nextChapter.number}
                                            </h3>
                                            <p className="text-sm text-slate-600">{nextChapter.title}</p>
                                        </div>
                                    </div>
                                    <span 
                                        className="relative h-10 px-6 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1 text-white"
                                        style={{ background: theme.color }}
                                    >
                                        {hasStarted ? 'Continuer' : 'Commencer'} <ArrowRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            </div>
                        )}

                        {/* Tabs - Flat, intégré au container */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 p-1 bg-slate-50/50 rounded-xl border border-black/5" role="tablist">
                                <ContentTab label="Cours" icon={<BookOpen className="h-4 w-4" />} count={chapters.length} active={contentType === 'cours'} onClick={() => handleTabChange('cours')} themeColor={theme.color} />
                                <ContentTab label="TD" icon={<ClipboardList className="h-4 w-4" />} count={getTDCount(moduleId)} active={contentType === 'td'} onClick={() => handleTabChange('td')} themeColor={theme.color} />
                                <ContentTab label="QCM" icon={<Brain className="h-4 w-4" />} count={getQCMCount(moduleId)} active={contentType === 'qcm'} onClick={() => handleTabChange('qcm')} themeColor={theme.color} />
                                <ContentTab label="Annales" icon={<FileText className="h-4 w-4" />} count={3} active={contentType === 'annales'} onClick={() => handleTabChange('annales')} themeColor={theme.color} />
                            </div>
                        </div>

                        {/* Content - Layer 3: Cards bubbles */}
                        <div>
                            {contentType === 'cours' && <ChapterGridView chapters={chapters} themeColor={theme.color} />}
                            {contentType === 'td' && <TDListPlaceholder baseRoute={baseRoute} moduleId={moduleId} />}
                            {contentType === 'qcm' && <QCMListPlaceholder baseRoute={baseRoute} moduleId={moduleId} />}
                            {contentType === 'annales' && <AnnalesListInline baseRoute={baseRoute} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





function ContentTab({ label, icon, count, active, onClick, themeColor }: { label: string; icon: React.ReactNode; count: number; active: boolean; onClick: () => void; themeColor: string }) {
    return (
        <button 
            type="button" 
            onClick={onClick} 
            role="tab" 
            aria-selected={active}
            className="px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center gap-2 transition-all duration-200 border"
            style={{ 
                background: active ? `${themeColor}08` : 'transparent', 
                color: active ? themeColor : 'rgb(var(--text-secondary))',
                borderColor: active ? `${themeColor}30` : 'transparent'
            }}>
            {icon}
            <span>{label}</span>
            <span 
                className="px-1.5 py-0.5 rounded text-xs font-semibold" 
                style={{ 
                    background: active ? `${themeColor}15` : 'rgb(var(--surface-2))', 
                    color: active ? themeColor : 'rgb(var(--text-muted))' 
                }}>
                {count}
            </span>
        </button>
    );
}

// Nouveau composant : Grid de chapters premium avec bubble subtile
function ChapterGridView({ chapters, themeColor }: { chapters: ModuleChapter[]; themeColor: string }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
                <Link
                    key={chapter.id}
                    to={chapter.path}
                    className="group relative p-5 rounded-2xl border border-black/5 bg-white hover:shadow-md transition-all duration-200 no-underline overflow-hidden"
                    style={{ 
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
                    }}
                >
                    {/* Gradient subtil au hover */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${themeColor}03 0%, transparent 100%)` }}
                    />
                    
                    {/* Border colorée gauche au hover */}
                    <div 
                        className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-2xl"
                        style={{ background: themeColor }}
                    />
                    
                    <div className="relative flex items-start gap-4">
                        {/* Numéro du chapitre */}
                        <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200 group-hover:scale-105"
                            style={{ 
                                background: chapter.isCompleted ? `${themeColor}15` : '#F8FAFC',
                                color: chapter.isCompleted ? themeColor : '#64748B',
                                boxShadow: chapter.isCompleted ? `0 0 0 3px ${themeColor}08` : 'none'
                            }}
                        >
                            {chapter.number}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            {/* Titre + badges */}
                            <div className="flex items-start gap-2 mb-2">
                                <h3 className="text-base font-semibold text-slate-950 group-hover:text-[color:var(--theme)] transition-colors flex-1" style={{ '--theme': themeColor } as React.CSSProperties}>
                                    {chapter.title}
                                </h3>
                                {chapter.isNew && (
                                    <span 
                                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide shrink-0"
                                        style={{ 
                                            background: `${themeColor}15`,
                                            color: themeColor,
                                            border: `1px solid ${themeColor}30`
                                        }}
                                    >
                                        Nouveau
                                    </span>
                                )}
                                {chapter.isUpdated && !chapter.isNew && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                        Mis à jour
                                    </span>
                                )}
                            </div>
                            
                            {/* Description */}
                            <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
                                {chapter.description}
                            </p>
                            
                            {/* Meta info */}
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                {chapter.hasAudio && (
                                    <span className="inline-flex items-center gap-1">
                                        <Headphones className="h-3 w-3" />
                                        Audio
                                    </span>
                                )}
                                {chapter.estimatedTime && (
                                    <span className="inline-flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {chapter.estimatedTime}
                                    </span>
                                )}
                                {chapter.isCompleted && (
                                    <span className="inline-flex items-center gap-1 font-medium" style={{ color: themeColor }}>
                                        <CheckCircle2 className="h-3 w-3" />
                                        Terminé
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Chevron */}
                        <ChevronRight 
                            className="h-5 w-5 shrink-0 transition-all duration-200 group-hover:translate-x-1 text-slate-400 group-hover:text-[color:var(--theme)]"
                            style={{ '--theme': themeColor } as React.CSSProperties}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}

function AnnalesListInline({ baseRoute }: { baseRoute: string }) {
    const annales = [
        { title: "Partiel 2024-2025", description: "Sujet et corrigé complet", path: `${baseRoute}/annales/2024-2025`, isNew: true },
        { title: "Partiel 2023-2024", description: "Sujet et corrigé complet", path: `${baseRoute}/annales/2023-2024` },
        { title: "Session 2 - 2023-2024", description: "Sujet de rattrapage avec corrigé", path: `${baseRoute}/annales/2023-2024-s2` }
    ];
    return (
        <div>
            {annales.map((a, i) => (
                <div key={a.path}>
                    <Link to={a.path} className="group flex items-center gap-4 px-6 py-4 transition-colors duration-200 no-underline hover:bg-[rgb(var(--surface-2))]">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                            <FileText className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>{a.title}</h3>
                                {a.isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-700">Nouveau</span>}
                            </div>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>{a.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 group-hover:text-[rgb(var(--accent))]" style={{ color: 'rgb(var(--text-muted))' }} />
                    </Link>
                    {i < annales.length - 1 && <div className="mx-6" style={{ borderBottom: '1px solid rgb(var(--border-hairline))' }} />}
                </div>
            ))}
        </div>
    );
}

function TDListPlaceholder({ moduleId }: { baseRoute: string; moduleId: string }) {
    const [, setSearchParams] = useSearchParams();
    
    // TD data per module - complete lists with direct links
    const tdData: Record<string, Array<{ id: string; title: string; description: string; count: string }>> = {
        macro: [
            { id: 'ex1', title: 'Exercice 1 : Offre de travail', description: 'Modèle classique · Salaire réel, contrainte budgétaire, TMS', count: '3 questions' },
            { id: 'ex2', title: 'Exercice 2 : Modèle IS/LM complet', description: 'Équations IS et LM · Équilibre macroéconomique', count: '4 étapes' },
            { id: 'ex3', title: 'Exercice 3 : Modèle WS/PS', description: 'Salaire réel, chômage naturel, produit naturel', count: '4 questions' },
            { id: 'ex4', title: 'Exercice 4 : Courbe de Phillips', description: 'Ratio de sacrifice, anticipations adaptatives', count: '4 questions' },
            { id: 'ex5', title: 'Exercice 5 : Politique monétaire restrictive', description: 'AS/AD · Effets CT et ajustement MT', count: 'Analyse complète' },
            { id: 'ex6', title: 'Exercice 6 : Trappe à liquidité', description: 'Inefficacité de la politique monétaire', count: 'Analyse' },
            { id: 'ex7', title: 'Exercice 7 : Politique de rigueur budgétaire', description: 'Effets CT/MT · Mécanisme d\'ajustement', count: 'Analyse complète' }
        ],
        micro: [
            { id: 'td1', title: 'TD1 : Théorie du Consommateur', description: 'Contrainte budgétaire, TMS, Cobb-Douglas', count: '2 exercices' },
            { id: 'td2', title: 'TD2 : Arbitrage Travail-Loisir', description: 'Offre de travail, effet substitution/revenu', count: '1 exercice' },
            { id: 'td3', title: 'TD3 : Choix Intertemporels', description: 'Épargne, emprunt, taux réel vs nominal', count: '1 exercice' },
            { id: 'td4', title: 'TD4 : Surplus et Bien-être', description: 'Surplus consommateur/producteur, perte sèche', count: '1 exercice' },
            { id: 'td5', title: 'TD5 : Théorie du Producteur', description: 'Minimisation des coûts, TMST', count: '1 exercice' },
            { id: 'td6', title: 'TD6 : Concurrence Parfaite', description: 'Offre de la firme, seuils de fermeture', count: '1 exercice' },
            { id: 'td7', title: 'TD7 : Monopole et Oligopole', description: 'Monopole, Cournot, Bertrand, Stackelberg', count: '2 exercices' }
        ],
        stats: [
            { id: 'td1', title: 'TD1 : Algèbre de Boole et Calcul de probabilités', description: 'CH1 · Construction d\'algèbres, probabilités conditionnelles, Bayes', count: '2 années' },
            { id: 'td2', title: 'TD2 : Variables aléatoires discrètes 1D', description: 'CH2 · Lois de probabilité, espérance, variance, covariance', count: '2 années' },
            { id: 'td3', title: 'TD3 : Variables aléatoires continues 1D', description: 'CH3 · Densités, fonction de répartition, loi Gamma', count: '2 années' },
            { id: 'td4', title: 'TD4 : Lois usuelles discrètes', description: 'CH4 · Binomiale, Poisson, Hypergéométrique, approximations', count: '2 années' },
            { id: 'td5', title: 'TD5 : Variables aléatoires discrètes 2D', description: 'CH5 · Lois conjointes, marginales, conditionnelles (discret)', count: '1 année' },
            { id: 'td6', title: 'TD6 : Variables aléatoires continues 2D', description: 'CH5 · Densités conjointes, marginales, méthode des 4 bornes', count: '1 année' }
        ],
        socio: []
    };
    
    const tds = tdData[moduleId] || [];
    
    const handleTDClick = (tdId: string) => {
        setSearchParams({ tab: 'td', td: tdId });
    };
    
    if (tds.length === 0) {
        return (
            <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgb(var(--surface-2))' }}>
                    <ClipboardList className="h-8 w-8" style={{ color: 'rgb(var(--text-muted))' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                    TD bientôt disponibles
                </h3>
                <p className="text-sm max-w-md mx-auto" style={{ color: 'rgb(var(--text-muted))' }}>
                    Les travaux dirigés seront ajoutés prochainement pour vous aider à pratiquer les concepts du cours.
                </p>
            </div>
        );
    }
    
    return (
        <div>
            {tds.map((td, index) => (
                <div key={td.id}>
                    <button 
                        onClick={() => handleTDClick(td.id)}
                        className="w-full group flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[rgb(var(--surface-2))] text-left"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                            <ClipboardList className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                                {td.title}
                            </h3>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                                {td.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                                {td.count}
                            </span>
                            <ChevronRight className="h-4 w-4 group-hover:text-[rgb(var(--accent))]" style={{ color: 'rgb(var(--text-muted))' }} />
                        </div>
                    </button>
                    {index < tds.length - 1 && <div className="mx-6" style={{ borderBottom: '1px solid rgb(var(--border-hairline))' }} />}
                </div>
            ))}
        </div>
    );
}

function QCMListPlaceholder({ moduleId }: { baseRoute: string; moduleId: string }) {
    const [, setSearchParams] = useSearchParams();
    
    // QCM data per module - complete lists
    const qcmData: Record<string, Array<{ id: string; title: string; subtitle: string; count: number }>> = {
        macro: [
            { id: 'islm', title: 'IS-LM', subtitle: 'Équilibre macroéconomique de court terme', count: 15 },
            { id: 'wsps', title: 'WS-PS', subtitle: 'Marché du travail et chômage naturel', count: 17 },
            { id: 'asad', title: 'AS-AD', subtitle: 'Équilibre macroéconomique et dynamique', count: 12 },
            { id: 'phillips', title: 'Phillips & Politique', subtitle: 'Inflation, anticipations et BCE', count: 20 },
            { id: 'bonus', title: 'Bonus', subtitle: 'Notions complémentaires du cours', count: 5 },
            { id: 'annales', title: 'Annales', subtitle: 'Questions type examen et calculs', count: 10 }
        ],
        micro: [
            { id: 'ch0', title: 'Chapitre 0', subtitle: 'Théorie du consommateur', count: 16 },
            { id: 'ch1', title: 'Chapitre 1', subtitle: 'Offre de travail', count: 15 },
            { id: 'ch2', title: 'Chapitre 2', subtitle: 'Choix intertemporels', count: 12 },
            { id: 'ch3', title: 'Chapitre 3', subtitle: 'Équilibre de marché', count: 18 },
            { id: 'ch5', title: 'Chapitre 5', subtitle: 'Théorie du producteur', count: 16 },
            { id: 'ch6', title: 'Chapitre 6', subtitle: 'Concurrence parfaite', count: 14 },
            { id: 'ch7', title: 'Chapitre 7', subtitle: 'Monopole et oligopole', count: 20 }
        ],
        stats: [
            { id: 'ch1', title: 'Chapitre 1', subtitle: 'Algèbre de Boole et probabilités', count: 15 },
            { id: 'ch2', title: 'Chapitre 2', subtitle: 'Variables aléatoires discrètes', count: 22 },
            { id: 'ch3', title: 'Chapitre 3', subtitle: 'Variables aléatoires continues', count: 20 },
            { id: 'ch4', title: 'Chapitre 4', subtitle: 'Couples de variables aléatoires', count: 18 },
            { id: 'annales', title: 'Annales', subtitle: 'Questions d\'examens', count: 15 }
        ],
        socio: [
            { id: 'ch1', title: 'Chapitre 1', subtitle: 'Durkheim et le fait social', count: 12 },
            { id: 'ch2', title: 'Chapitre 2', subtitle: 'Weber et l\'action sociale', count: 14 },
            { id: 'ch3', title: 'Chapitre 3', subtitle: 'Marx et les classes sociales', count: 16 },
            { id: 'ch4', title: 'Chapitre 4', subtitle: 'Bourdieu et la reproduction', count: 18 }
        ]
    };
    
    const qcms = qcmData[moduleId] || [];
    
    const handleQCMClick = () => {
        setSearchParams({ tab: 'qcm', qcm: 'start' });
    };
    
    return (
        <div>
            {qcms.map((qcm, index) => (
                <div key={qcm.id}>
                    <button 
                        onClick={handleQCMClick}
                        className="w-full group flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[rgb(var(--surface-2))] text-left"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                            <Brain className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                                {qcm.title}
                            </h3>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                                {qcm.subtitle}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                                {qcm.count} questions
                            </span>
                            <ChevronRight className="h-4 w-4 group-hover:text-[rgb(var(--accent))]" style={{ color: 'rgb(var(--text-muted))' }} />
                        </div>
                    </button>
                    {index < qcms.length - 1 && <div className="mx-6" style={{ borderBottom: '1px solid rgb(var(--border-hairline))' }} />}
                </div>
            ))}
        </div>
    );
}
