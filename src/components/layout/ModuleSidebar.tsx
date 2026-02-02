import { ChevronRight, BookOpen, Brain, Calendar, LogOut, User as UserIcon, GraduationCap, Search, ChevronDown, Layers } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { semesters, type SubjectConfig } from '../../config/semesters';

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
                        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 overflow-hidden"
                        style={{
                            zIndex: 50,
                            background: 'var(--color-bg-raised)',
                            borderRight: '1px solid var(--color-border-default)',
                            boxShadow: !isPinned ? 'var(--shadow-lg)' : 'none'
                        }}>

                        {/* MODE MINIMISÉ : Icônes seulement */}
                        {isMinimized ? (
                            <>
                                {/* Header minimisé */}
                                <div className="p-4 flex flex-col items-center gap-3" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                        style={{ background: 'var(--color-accent-subtle)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                        title="Accueil">
                                        <GraduationCap className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                    </button>

                                    {/* UN SEUL bouton : toggle minimize/expand */}
                                    <button
                                        onClick={toggleMinimize}
                                        className="w-10 h-10 rounded-lg transition-colors flex items-center justify-center"
                                        style={{ background: 'var(--color-bg-overlay)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                        title="Développer la sidebar">
                                        <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-text-primary)' }} />
                                    </button>
                                </div>

                                {/* Modules icônes */}
                                <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                                    {modules.map((module) => {
                                        const isActive = location.pathname.startsWith(module.path);
                                        const Icon = module.icon;

                                        return (
                                            <button
                                                key={module.id}
                                                onClick={() => navigate(module.path)}
                                                title={module.name}
                                                className="w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200"
                                                style={{
                                                    background: isActive ? 'var(--color-accent-subtle)' : 'var(--color-bg-overlay)',
                                                    border: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                        e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                        e.currentTarget.style.borderColor = 'transparent';
                                                    }
                                                }}>
                                                <Icon className="h-5 w-5" />
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* User minimisé */}
                                <div className="p-3 flex justify-center" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                                    {user ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ background: 'var(--color-bg-overlay)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                            title="Déconnexion">
                                            <LogOut className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg-raised)' }}
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
                                <div className="p-4 space-y-3" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                            <GraduationCap className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
                                            <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{SITE_NAME}</span>
                                        </button>

                                        {/* UN SEUL bouton : toggle minimize/pin */}
                                        <button
                                            onClick={toggleMinimize}
                                            className="p-2 rounded-lg transition-colors"
                                            style={{ background: 'var(--color-bg-overlay)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                            title="Minimiser la sidebar">
                                            <ChevronRight className="h-4 w-4 rotate-180" style={{ color: 'var(--color-text-primary)' }} />
                                        </button>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl transition-all focus:outline-none"
                                            style={{
                                                background: 'var(--color-bg-overlay)',
                                                border: '1px solid var(--color-border-default)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--color-accent)';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-subtle)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>

                                    {/* Year/Semester Selector */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSelector(!showSelector)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                                            style={{
                                                background: 'var(--color-bg-raised)',
                                                border: '1px solid var(--color-border-default)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}>
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
                                                <Layers className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Parcours</div>
                                                <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                    Licence {selectedLevel.charAt(1)} — Semestre {selectedSemester.charAt(1)}
                                                </div>
                                            </div>
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showSelector ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} />
                                        </button>

                                        <AnimatePresence>
                                            {showSelector && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                                    className="absolute top-full left-0 right-0 mt-2 p-3 rounded-2xl z-20"
                                                    style={{
                                                        background: 'var(--color-bg-raised)',
                                                        border: '1px solid var(--color-border-default)',
                                                        boxShadow: 'var(--shadow-lg)',
                                                    }}>
                                                    {/* Année */}
                                                    <div className="mb-3">
                                                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Année</div>
                                                        <div className="grid grid-cols-3 gap-1.5">
                                                            {levels.map((level) => (
                                                                <button
                                                                    key={level.id}
                                                                    onClick={() => !level.disabled && setSelectedLevel(level.id)}
                                                                    disabled={level.disabled}
                                                                    className="py-2 rounded-xl text-sm font-semibold transition-all"
                                                                    style={{
                                                                        background: selectedLevel === level.id
                                                                            ? 'var(--color-text-primary)'
                                                                            : level.disabled
                                                                                ? 'var(--color-bg-overlay)'
                                                                                : 'var(--color-bg-overlay)',
                                                                        color: selectedLevel === level.id
                                                                            ? 'var(--color-bg-raised)'
                                                                            : level.disabled
                                                                                ? 'var(--color-text-muted)'
                                                                                : 'var(--color-text-secondary)',
                                                                        cursor: level.disabled ? 'not-allowed' : 'pointer',
                                                                        boxShadow: selectedLevel === level.id ? 'var(--shadow-sm)' : 'none',
                                                                    }}>
                                                                    {level.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Semestre */}
                                                    <div>
                                                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Semestre</div>
                                                        <div className="grid grid-cols-2 gap-1.5">
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
                                                                    className="py-2 rounded-xl text-sm font-semibold transition-all"
                                                                    style={{
                                                                        background: selectedSemester === semester.id
                                                                            ? 'var(--color-text-primary)'
                                                                            : semester.disabled
                                                                                ? 'var(--color-bg-overlay)'
                                                                                : 'var(--color-bg-overlay)',
                                                                        color: selectedSemester === semester.id
                                                                            ? 'var(--color-bg-raised)'
                                                                            : semester.disabled
                                                                                ? 'var(--color-text-muted)'
                                                                                : 'var(--color-text-secondary)',
                                                                        cursor: semester.disabled ? 'not-allowed' : 'pointer',
                                                                        boxShadow: selectedSemester === semester.id ? 'var(--shadow-sm)' : 'none',
                                                                    }}>
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
                                <div className="flex-1 overflow-y-auto p-3">
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 px-3" style={{ color: 'var(--color-text-muted)' }}>
                                        Matières
                                    </h2>
                                    <nav className="space-y-1">
                                        {modules.map((module) => {
                                            const isActive = location.pathname.startsWith(module.path);
                                            const isExpanded = expandedModules.includes(module.id);
                                            const Icon = module.icon;

                                            return (
                                                <div key={module.id}>
                                                    <div
                                                        className="flex items-center gap-2 rounded-lg transition-all"
                                                        style={{
                                                            background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                                                            borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                        }}>
                                                        <button
                                                            onClick={() => {
                                                                navigate(module.path);
                                                                setExpandedModules([module.id]);
                                                            }}
                                                            className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-left transition-colors"
                                                            style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                                                            onMouseEnter={(e) => {
                                                                if (!isActive) e.currentTarget.style.color = 'var(--color-accent)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                            }}>
                                                            <Icon className="h-4 w-4 shrink-0" />
                                                            <span>{module.name}</span>
                                                        </button>

                                                        <button
                                                            onClick={(e) => toggleModule(module.id, e)}
                                                            className="p-2 rounded-md transition-colors mr-1"
                                                            style={{ color: 'var(--color-text-muted)' }}
                                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
                                                                <div className="ml-6 mt-1 mb-2 space-y-0.5 pl-3" style={{ borderLeft: '2px solid var(--color-border-soft)' }}>
                                                                    {module.sections.map((section) => {
                                                                        const SectionIcon = section.icon;
                                                                        const isSectionActive = location.pathname === section.path;

                                                                        return (
                                                                            <button
                                                                                key={section.path}
                                                                                onClick={() => navigate(section.path)}
                                                                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium transition-colors"
                                                                                style={{
                                                                                    background: isSectionActive ? 'var(--color-accent-subtle)' : 'transparent',
                                                                                    color: isSectionActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                                                }}
                                                                                onMouseEnter={(e) => {
                                                                                    if (!isSectionActive) {
                                                                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                                                                    }
                                                                                }}
                                                                                onMouseLeave={(e) => {
                                                                                    if (!isSectionActive) {
                                                                                        e.currentTarget.style.background = 'transparent';
                                                                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                                                    }
                                                                                }}>
                                                                                <SectionIcon className="h-3.5 w-3.5 shrink-0" />
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
                                <div className="p-3 space-y-2" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                                    {user ? (
                                        <>
                                            <div className="p-3 rounded-lg" style={{ background: 'var(--color-bg-overlay)' }}>
                                                <div className="flex items-start gap-2 mb-3">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName || 'User'}
                                                            referrerPolicy="no-referrer"
                                                            className="h-8 w-8 rounded-full shrink-0"
                                                            style={{ border: '2px solid var(--color-accent-subtle)' }}
                                                        />
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                                                            style={{
                                                                background: 'var(--color-accent-subtle)',
                                                                border: '2px solid var(--color-accent-subtle)',
                                                            }}>
                                                            <UserIcon className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{user.displayName}</p>
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium shrink-0"
                                                                style={{
                                                                    background: isFreeUser ? 'var(--color-bg-overlay)' : 'var(--color-accent-subtle)',
                                                                    color: isFreeUser ? 'var(--color-text-muted)' : 'var(--color-accent)',
                                                                }}>
                                                                {isFreeUser ? 'FREE' : 'PRO'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] truncate" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
                                                    </div>
                                                </div>
                                                {isFreeUser && (
                                                    <button
                                                        onClick={() => navigate('/subscription')}
                                                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all mb-2"
                                                        style={{
                                                            background: 'var(--color-accent)',
                                                            color: 'var(--color-accent-foreground)',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                                                        Passer à Premium
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                }}>
                                                <LogOut className="h-3.5 w-3.5" />
                                                <span>Déconnexion</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
                                            style={{
                                                background: 'var(--color-text-primary)',
                                                color: 'var(--color-bg-raised)',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
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
