import { ChevronRight, BookOpen, Brain, Calendar, LogOut, User as UserIcon, GraduationCap, Search, ChevronDown, Layers } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { semesters, type SubjectConfig } from '../../config/semesters';
import { cn } from '../../utils/cn';

const SITE_NAME = "Οἰκονομία";
export const SIDEBAR_WIDTH = 288;
export const SIDEBAR_MINIMIZED_WIDTH = 72;
const HOVER_ZONE_WIDTH = 16;

const levels = [
    { id: 'l1', name: 'L1', disabled: true },
    { id: 'l2', name: 'L2', disabled: false },
    { id: 'l3', name: 'L3', disabled: true },
];

export function ModuleSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOut } = useAuth();
    const [selectedLevel, setSelectedLevel] = useState('l2');

    // Detect semester from URL
    const detectedSemester = useMemo(() => {
        if (location.pathname.startsWith('/s4/')) return 's4';
        if (location.pathname.startsWith('/s3/')) return 's3';
        // Legacy paths without /sX/ prefix default to S3
        return 's3';
    }, [location.pathname]);

    const [selectedSemester, setSelectedSemester] = useState(detectedSemester);
    const [showSelector, setShowSelector] = useState(false);

    const { isPinned, isVisible, setIsHovered, isMinimized, toggleMinimize } = useSidebar();

    // Get current semester config
    const currentSemester = useMemo(() => semesters[selectedSemester], [selectedSemester]);

    // Build modules from semester subjects
    const modules = useMemo(() => {
        if (!currentSemester) return [];

        return currentSemester.subjects.map((subject: SubjectConfig) => ({
            id: subject.id,
            name: subject.name,
            icon: subject.icon,
            path: subject.basePath,
            sections: [
                { name: 'Cours', icon: BookOpen, path: `${subject.basePath}?tab=cours` },
                { name: 'TD', icon: Layers, path: `${subject.basePath}?tab=td` },
                { name: 'QCM', icon: Brain, path: `${subject.basePath}?tab=qcm` },
                { name: 'Annales', icon: Calendar, path: `${subject.basePath}?tab=annales` },
            ]
        }));
    }, [currentSemester]);

    // Auto-expand active module
    const activeModuleId = modules.find(m => location.pathname.startsWith(m.path))?.id;
    const [expandedModules, setExpandedModules] = useState<string[]>(
        activeModuleId ? [activeModuleId] : []
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    const toggleModule = (moduleId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedModules(prev =>
            prev.includes(moduleId) ? [] : [moduleId]
        );
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const isFreeUser = !user?.subscriptionTier || user.subscriptionTier === 'free';

    // Available semesters for L2
    const availableSemesters = [
        { id: 's3', label: 'S3', disabled: false },
        { id: 's4', label: 'S4', disabled: false },
    ];

    // Calculer la width dynamique
    const sidebarWidth = isMinimized ? SIDEBAR_MINIMIZED_WIDTH : SIDEBAR_WIDTH;

    return (
        <>
            {/* Zone de détection invisible quand sidebar auto-hide */}
            {!isPinned && !isVisible && (
                <div
                    className="fixed left-0 top-0 bottom-0 z-50 cursor-e-resize"
                    style={{ width: HOVER_ZONE_WIDTH }}
                    onMouseEnter={handleMouseEnter}
                />
            )}

            {/* Sidebar unique avec width dynamique */}
            <AnimatePresence>
                {isVisible && (
                    <motion.aside
                        initial={{ x: -SIDEBAR_WIDTH, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            width: sidebarWidth
                        }}
                        exit={{ x: -SIDEBAR_WIDTH, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                            mass: 0.8,
                            width: { duration: 0.2, ease: "easeOut" }
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 overflow-hidden bg-[var(--color-bg-raised)] border-r border-[var(--color-border-default)]"
                        style={{
                            zIndex: 50,
                            boxShadow: !isPinned ? 'var(--shadow-lg)' : 'none'
                        }}>

                        {/* MODE MINIMISÉ : Icônes seulement */}
                        {isMinimized ? (
                            <>
                                {/* Header minimisé */}
                                <div className="p-4 flex flex-col items-center gap-4 border-b border-[var(--color-border-default)]">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-accent-subtle)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                        title="Accueil">
                                        <GraduationCap className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                    </button>

                                    {/* UN SEUL bouton : toggle minimize/expand */}
                                    <button
                                        onClick={toggleMinimize}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                        title="Développer la sidebar">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Modules icônes */}
                                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                                    {modules.map((module) => {
                                        const isActive = location.pathname.startsWith(module.path);
                                        const Icon = module.icon;

                                        return (
                                            <button
                                                key={module.id}
                                                onClick={() => navigate(module.path)}
                                                title={module.name}
                                                className={cn(
                                                    "w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 border-2",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]",
                                                    isActive
                                                        ? "bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]"
                                                        : "bg-[var(--color-bg-overlay)] border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)]"
                                                )}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* User minimisé */}
                                <div className="p-4 flex justify-center border-t border-[var(--color-border-default)]">
                                    {user ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                            title="Déconnexion">
                                            <LogOut className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                            title="Connexion">
                                            <UserIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* MODE COMPLET : Sidebar full */
                            <>
                                {/* Header complet */}
                                <div className="p-4 space-y-4 border-b border-[var(--color-border-default)]">
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => navigate('/')}
                                            className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                        >
                                            <GraduationCap className="h-6 w-6 text-[var(--color-accent)]" />
                                            <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">{SITE_NAME}</span>
                                        </button>

                                        {/* UN SEUL bouton : toggle minimize/pin */}
                                        <button
                                            onClick={toggleMinimize}
                                            className="p-2 rounded-lg bg-[var(--color-bg-overlay)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                            title="Minimiser la sidebar"
                                        >
                                            <ChevronRight className="h-4 w-4 rotate-180 text-[var(--color-text-primary)]" />
                                        </button>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] transition-all focus-visible:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-subtle)]"
                                        />
                                    </div>

                                    {/* Year/Semester Selector */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSelector(!showSelector)}
                                            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-raised)] transition-all hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent-subtle)]">
                                                <Layers className="h-4 w-4 text-[var(--color-accent)]" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">Parcours</div>
                                                <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                                                    Licence {selectedLevel.charAt(1)} — Semestre {selectedSemester.charAt(1)}
                                                </div>
                                            </div>
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 text-[var(--color-text-muted)] ${showSelector ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {showSelector && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                                    className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl z-20 border border-[var(--color-border-default)] bg-[var(--color-bg-raised)] shadow-[var(--shadow-lg)]"
                                                >
                                                    {/* Année */}
                                                    <div className="mb-4">
                                                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-muted)]">Année</div>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {levels.map((level) => (
                                                                <button
                                                                    key={level.id}
                                                                    onClick={() => !level.disabled && setSelectedLevel(level.id)}
                                                                    disabled={level.disabled}
                                                                    className={cn(
                                                                        "py-2 rounded-xl text-sm font-semibold transition-all border border-transparent",
                                                                        "disabled:cursor-not-allowed disabled:opacity-60",
                                                                        selectedLevel === level.id
                                                                            ? "bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] shadow-[var(--shadow-sm)]"
                                                                            : "bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)]"
                                                                    )}
                                                                >
                                                                    {level.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Semestre */}
                                                    <div>
                                                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-[var(--color-text-muted)]">Semestre</div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {availableSemesters.map((semester) => (
                                                                <button
                                                                    key={semester.id}
                                                                    onClick={() => {
                                                                        if (!semester.disabled) {
                                                                            setSelectedSemester(semester.id);
                                                                            setShowSelector(false);
                                                                            const newSemester = semesters[semester.id];
                                                                            if (newSemester?.subjects[0]) {
                                                                                navigate(newSemester.subjects[0].basePath);
                                                                            }
                                                                        }
                                                                    }}
                                                                    disabled={semester.disabled}
                                                                    className={cn(
                                                                        "py-2 rounded-xl text-sm font-semibold transition-all border border-transparent",
                                                                        "disabled:cursor-not-allowed disabled:opacity-60",
                                                                        selectedSemester === semester.id
                                                                            ? "bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] shadow-[var(--shadow-sm)]"
                                                                            : "bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)]"
                                                                    )}
                                                                >
                                                                    {semester.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Modules List */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 text-[var(--color-text-muted)]">
                                        Matières
                                    </h2>
                                    <nav className="space-y-2">
                                        {modules.map((module) => {
                                            const isActive = location.pathname.startsWith(module.path);
                                            const isExpanded = expandedModules.includes(module.id);
                                            const Icon = module.icon;

                                            return (
                                                <div key={module.id}>
                                                    <div
                                                        className={cn(
                                                            "flex items-center gap-2 rounded-xl transition-all border-l-2",
                                                            isActive
                                                                ? "bg-[var(--color-accent-subtle)] border-[var(--color-accent)]"
                                                                : "border-transparent"
                                                        )}
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                navigate(module.path);
                                                                setExpandedModules([module.id]);
                                                            }}
                                                            className={cn(
                                                                "flex-1 flex items-center gap-2 px-4 py-2 text-sm font-medium text-left transition-colors",
                                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]",
                                                                isActive
                                                                    ? "text-[var(--color-accent)]"
                                                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                                                            )}
                                                        >
                                                            <Icon className="h-4 w-4 shrink-0" />
                                                            <span>{module.name}</span>
                                                        </button>

                                                        <button
                                                            onClick={(e) => toggleModule(module.id, e)}
                                                            className="p-2 rounded-lg transition-colors mr-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-overlay)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                                            aria-label={isExpanded ? 'Fermer' : 'Ouvrir'}>
                                                            <motion.div
                                                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                                                transition={{ duration: 0.15, ease: "easeOut" }}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </motion.div>
                                                        </button>
                                                    </div>

                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{
                                                                    height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                                                                    opacity: { duration: 0.15, ease: "easeOut" }
                                                                }}
                                                                className="overflow-hidden">
                                                                <div className="ml-6 mt-2 mb-2 space-y-2 pl-4 border-l-2 border-[var(--color-border-soft)]">
                                                                    {module.sections.map((section) => {
                                                                        const SectionIcon = section.icon;
                                                                        const isSectionActive = location.pathname === section.path;

                                                                        return (
                                                                            <button
                                                                                key={section.path}
                                                                                onClick={() => navigate(section.path)}
                                                                                className={cn(
                                                                                    "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                                                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]",
                                                                                    isSectionActive
                                                                                        ? "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
                                                                                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-overlay)] hover:text-[var(--color-text-primary)]"
                                                                                )}
                                                                            >
                                                                                <SectionIcon className="h-4 w-4 shrink-0" />
                                                                                <span>{section.name}</span>
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </nav>
                                </div>

                                {/* User Section */}
                                <div className="p-4 space-y-2 border-t border-[var(--color-border-default)]">
                                    {user ? (
                                        <>
                                            <div className="p-4 rounded-xl bg-[var(--color-bg-overlay)]">
                                                <div className="flex items-start gap-2 mb-4">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName || 'User'}
                                                            referrerPolicy="no-referrer"
                                                            className="h-8 w-8 rounded-full shrink-0 border-2 border-[var(--color-accent-subtle)]"
                                                        />
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 border-[var(--color-accent-subtle)] bg-[var(--color-accent-subtle)]">
                                                            <UserIcon className="h-4 w-4 text-[var(--color-accent)]" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <p className="text-xs font-semibold truncate text-[var(--color-text-primary)]">{user.displayName}</p>
                                                            <span className={cn(
                                                                "inline-flex items-center px-2 py-2 rounded text-[8px] font-medium shrink-0",
                                                                isFreeUser
                                                                    ? "bg-[var(--color-bg-overlay)] text-[var(--color-text-muted)]"
                                                                    : "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
                                                            )}>
                                                                {isFreeUser ? 'FREE' : 'PRO'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] truncate text-[var(--color-text-muted)]">{user.email}</p>
                                                    </div>
                                                </div>
                                                {isFreeUser && (
                                                    <button
                                                        onClick={() => navigate('/subscription')}
                                                        className="w-full py-2 px-4 rounded-lg text-xs font-semibold transition-opacity mb-2 bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-overlay)]"
                                                    >
                                                        Passer à Premium
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-overlay)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Déconnexion</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-opacity bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                                        >
                                            Connexion
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
