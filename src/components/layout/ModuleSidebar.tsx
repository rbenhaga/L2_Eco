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
                        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 border-r border-black/5 bg-white overflow-hidden"
                        style={{
                            zIndex: 50,
                            boxShadow: !isPinned ? '4px 0 24px rgba(0,0,0,0.1)' : 'none'
                        }}>

                        {/* MODE MINIMISÉ : Icônes seulement */}
                        {isMinimized ? (
                            <>
                                {/* Header minimisé */}
                                <div className="p-4 border-b border-black/5 flex flex-col items-center gap-3">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-10 h-10 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center transition-colors"
                                        title="Accueil">
                                        <GraduationCap className="h-5 w-5 text-indigo-600" />
                                    </button>

                                    {/* UN SEUL bouton : toggle minimize/expand */}
                                    <button
                                        onClick={toggleMinimize}
                                        className="w-10 h-10 rounded-lg bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center"
                                        title="Développer la sidebar">
                                        <ChevronRight className="h-4 w-4 text-slate-950" />
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
                                                className={`
                                                    w-full aspect-square rounded-xl
                                                    flex items-center justify-center
                                                    transition-all duration-200
                                                    ${isActive
                                                        ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-600'
                                                        : 'bg-slate-50 border-2 border-transparent text-slate-700 hover:bg-slate-100 hover:border-slate-200'
                                                    }
                                                `}>
                                                <Icon className="h-5 w-5" />
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* User minimisé */}
                                <div className="border-t border-black/5 p-3 flex justify-center">
                                    {user ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
                                            title="Déconnexion">
                                            <LogOut className="h-4 w-4 text-slate-600" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center transition-colors"
                                            title="Connexion">
                                            <UserIcon className="h-4 w-4 text-white" />
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* MODE COMPLET : Sidebar full */
                            <>
                                {/* Header complet */}
                                <div className="p-4 border-b border-black/5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                            <GraduationCap className="h-6 w-6 text-accent" />
                                            <span className="text-base font-semibold tracking-tight text-slate-950">{SITE_NAME}</span>
                                        </button>

                                        {/* UN SEUL bouton : toggle minimize/pin */}
                                        <button
                                            onClick={toggleMinimize}
                                            className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
                                            title="Minimiser la sidebar">
                                            <ChevronRight className="h-4 w-4 text-slate-950 rotate-180" />
                                        </button>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-black/3 border border-black/5 placeholder:text-slate-400 text-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600/20 transition-all"
                                        />
                                    </div>

                                    {/* Year/Semester Selector */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSelector(!showSelector)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-black/5 hover:border-black/10 bg-white hover:shadow-sm transition-all group">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                                                <Layers className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Parcours</div>
                                                <div className="text-sm font-semibold text-slate-950">
                                                    Licence {selectedLevel.charAt(1)} — Semestre {selectedSemester.charAt(1)}
                                                </div>
                                            </div>
                                            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showSelector ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {showSelector && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                                    className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-2xl border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-20">
                                                    {/* Année */}
                                                    <div className="mb-3">
                                                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Année</div>
                                                        <div className="grid grid-cols-3 gap-1.5">
                                                            {levels.map((level) => (
                                                                <button
                                                                    key={level.id}
                                                                    onClick={() => !level.disabled && setSelectedLevel(level.id)}
                                                                    disabled={level.disabled}
                                                                    className={`
                                                                        py-2 rounded-xl text-sm font-semibold transition-all
                                                                        ${selectedLevel === level.id
                                                                            ? 'bg-slate-900 text-white shadow-sm'
                                                                            : level.disabled
                                                                                ? 'bg-black/2 text-slate-300 cursor-not-allowed'
                                                                                : 'bg-black/3 text-slate-600 hover:bg-black/6'
                                                                        }
                                                                    `}>
                                                                    {level.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Semestre */}
                                                    <div>
                                                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Semestre</div>
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
                                                                    className={`
                                                                        py-2 rounded-xl text-sm font-semibold transition-all
                                                                        ${selectedSemester === semester.id
                                                                            ? 'bg-slate-900 text-white shadow-sm'
                                                                            : semester.disabled
                                                                                ? 'bg-black/2 text-slate-300 cursor-not-allowed'
                                                                                : 'bg-black/3 text-slate-600 hover:bg-black/6'
                                                                        }
                                                                    `}>
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
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 px-3 text-slate-500">
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
                                                        className={`
                                                            flex items-center gap-2 rounded-lg transition-all
                                                            ${isActive ? 'bg-indigo-50 border-l-2 border-indigo-600' : 'border-l-2 border-transparent'}
                                                        `}>
                                                        <button
                                                            onClick={() => {
                                                                navigate(module.path);
                                                                // Auto-expand this module, close others
                                                                setExpandedModules([module.id]);
                                                            }}
                                                            className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-left transition-colors hover:text-indigo-600">
                                                            <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-700'}`} />
                                                            <span className={isActive ? 'text-indigo-600' : 'text-slate-700'}>{module.name}</span>
                                                        </button>

                                                        <button
                                                            onClick={(e) => toggleModule(module.id, e)}
                                                            className="p-2 hover:bg-slate-100 rounded-md transition-colors mr-1"
                                                            aria-label={isExpanded ? 'Fermer' : 'Ouvrir'}>
                                                            <motion.div
                                                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                                                transition={{ duration: 0.15, ease: "easeOut" }}>
                                                                <ChevronRight className="h-4 w-4 text-slate-400" />
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
                                                                <div className="ml-6 mt-1 mb-2 space-y-0.5 border-l-2 border-slate-100 pl-3">
                                                                    {module.sections.map((section) => {
                                                                        const SectionIcon = section.icon;
                                                                        const isSectionActive = location.pathname === section.path;

                                                                        return (
                                                                            <button
                                                                                key={section.path}
                                                                                onClick={() => navigate(section.path)}
                                                                                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${isSectionActive
                                                                                    ? 'bg-indigo-50 text-indigo-600'
                                                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                                                    }`}>
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
                                <div className="border-t border-black/5 p-3 space-y-2">
                                    {user ? (
                                        <>
                                            <div className="p-3 rounded-lg bg-slate-50">
                                                <div className="flex items-start gap-2 mb-3">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName || 'User'}
                                                            referrerPolicy="no-referrer"
                                                            className="h-8 w-8 rounded-full border-2 border-indigo-100 shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center border-2 border-indigo-100 shrink-0">
                                                            <UserIcon className="h-4 w-4 text-indigo-600" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <p className="text-xs font-semibold truncate text-slate-900">{user.displayName}</p>
                                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium shrink-0 ${isFreeUser ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-600'
                                                                }`}>
                                                                {isFreeUser ? 'FREE' : '✨ PRO'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                                {isFreeUser && (
                                                    <button
                                                        onClick={() => navigate('/subscription')}
                                                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-linear-to-r from-accent to-indigo-600 text-white hover:from-accent/90 hover:to-indigo-600/90 transition-all mb-2">
                                                        Passer à Premium
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                                <LogOut className="h-3.5 w-3.5" />
                                                <span>Déconnexion</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
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
