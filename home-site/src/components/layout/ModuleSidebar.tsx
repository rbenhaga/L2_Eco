/**
 * ModuleSidebar - Rail Sidebar avec design propre
 * 
 * Rail mode: 64px (icônes only)
 * Expanded: 280px (hover ou pin)
 * Design: Ton style propre avec tokens
 */

import { GraduationCap, ArrowRight, X, Pin, Settings, LogOut, ChevronDown, Check } from 'lucide-react';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { semesters } from '../../config/semesters';
import { authFetch } from '../../utils/authFetch';

const SITE_NAME = "Oikonomia";
const RAIL_WIDTH = 64;
const EXPANDED_WIDTH = 256;
const SIDEBAR_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MODULE_LABEL_BY_ID: Record<string, string> = {
    macro: 'Macroeconomie',
    micro: 'Microeconomie',
    stats: 'Statistiques',
    socio: 'Sociologie',
    management: 'Management',
};

// Modules are now derived dynamically from semesters.ts config

interface SelectOption {
    value: string;
    label: string;
}

interface FancySelectProps {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (nextValue: string) => void;
}

function FancySelect({ label, value, options, onChange }: FancySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleOutside);
            return () => document.removeEventListener('mousedown', handleOutside);
        }
    }, [isOpen]);

    const selected = options.find((option) => option.value === value);

    return (
        <div className={`relative flex-1 ${isOpen ? "z-[120]" : "z-0"}`} ref={containerRef}>
            <label className="block px-1 mb-1.5 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full h-[42px] px-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between"
                    style={{
                        background: 'var(--color-bg-overlay)',
                        color: 'var(--color-text-primary)',
                        border: `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                        boxShadow: isOpen
                            ? '0 0 0 3px color-mix(in srgb, var(--color-accent) 16%, transparent)'
                            : 'var(--shadow-sm)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isOpen) e.currentTarget.style.borderColor = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                        if (!isOpen) e.currentTarget.style.borderColor = 'var(--color-border-default)';
                    }}
                >
                    <span>{selected?.label ?? value}</span>
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: 'var(--color-accent)' }}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.14 }}
                            className="absolute left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-50"
                            style={{
                                background: 'var(--color-bg-raised)',
                                border: '1px solid var(--color-border-default)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                        >
                            {options.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-3 py-2.5 text-sm font-medium flex items-center justify-between transition-colors"
                                        style={{
                                            background: isSelected ? 'var(--color-accent-subtle)' : 'transparent',
                                            color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && <Check className="h-4 w-4" />}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function ModuleSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOut } = useAuth();
    const { isExpanded, isPinned, setIsHovered, togglePin, isMobileOpen, setIsMobileOpen } = useSidebar();
    const hoverLeaveTimeoutRef = useRef<number | null>(null);

    const [selectedYear, setSelectedYear] = useState('L2');
    const [selectedSemester, setSelectedSemester] = useState('S3');

    // Mapping année → semestres disponibles
    const semestersByYear: Record<string, string[]> = {
        'L1': ['S1', 'S2'],
        'L2': ['S3', 'S4'],
        'L3': ['S5', 'S6'],
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const currentSemesterFromUrl = useMemo(() => {
        const match = location.pathname.match(/^\/(s[34])\//i);
        return match?.[1]?.toUpperCase() || null;
    }, [location.pathname]);

    // Keep sidebar semester in sync with URL after reload/direct navigation
    useEffect(() => {
        if (!currentSemesterFromUrl) return;
        setSelectedSemester(currentSemesterFromUrl);
        for (const [year, sems] of Object.entries(semestersByYear)) {
            if (sems.includes(currentSemesterFromUrl)) {
                setSelectedYear(year);
                break;
            }
        }
    }, [currentSemesterFromUrl]);

    // Load saved semester from backend on mount when URL does not force one
    useEffect(() => {
        if (!user?.uid) return;
        if (currentSemesterFromUrl) return;
        authFetch(`${API_URL}/api/user/${user.uid}/semester`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data?.semester) {
                    const sem = data.semester.toUpperCase();
                    setSelectedSemester(sem);
                    // Also set the correct year
                    for (const [year, sems] of Object.entries(semestersByYear)) {
                        if (sems.includes(sem)) {
                            setSelectedYear(year);
                            break;
                        }
                    }
                }
            })
            .catch(() => { /* use default */ });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid, currentSemesterFromUrl]);

    // Handle semester change: navigate + persist
    const handleSemesterChange = useCallback((newSemester: string) => {
        const prev = selectedSemester.toLowerCase();
        const next = newSemester.toLowerCase();
        setSelectedSemester(newSemester);

        // If user is currently on a subject page, navigate to the equivalent in the new semester
        const currentPath = location.pathname;
        if (currentPath.startsWith(`/${prev}/`)) {
            const rest = currentPath.slice(`/${prev}`.length); // e.g. "/macro" or "/macro/ch1"
            navigate(`/${next}${rest}`);
        } else if (currentPath === `/${prev}`) {
            navigate(`/${next}`);
        }

        // Persist to backend (fire-and-forget)
        if (user?.uid) {
            authFetch(`${API_URL}/api/user/${user.uid}/semester`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ semester: next }),
            }).catch(() => { /* silent */ });
        }
    }, [selectedSemester, location.pathname, navigate, user?.uid, API_URL]);

    // Gérer le changement d'année
    const handleYearChange = (newYear: string) => {
        setSelectedYear(newYear);
        // Auto-sélectionner le premier semestre de l'année
        const availableSemesters = semestersByYear[newYear];
        if (availableSemesters && !availableSemesters.includes(selectedSemester)) {
            handleSemesterChange(availableSemesters[0]);
        }
    };

    // Semestres disponibles pour l'année sélectionnée
    const availableSemesters = semestersByYear[selectedYear] || ['S3', 'S4'];
    const yearOptions: SelectOption[] = [
        { value: 'L1', label: 'L1' },
        { value: 'L2', label: 'L2' },
        { value: 'L3', label: 'L3' },
    ];
    const semesterOptions: SelectOption[] = availableSemesters.map((semester) => ({
        value: semester,
        label: semester,
    }));
    // Build modules dynamically from semesters.ts config
    const modules = useMemo(() => {
        const semKey = selectedSemester.toLowerCase();
        const semConfig = semesters[semKey];
        if (!semConfig) return [];
        return semConfig.subjects.map(s => ({
            id: s.id,
            label: MODULE_LABEL_BY_ID[s.id] ?? s.name ?? s.shortName,
            icon: s.icon,
            path: s.basePath,
        }));
    }, [selectedSemester]);

    // Detect active module from URL
    const activeModuleId = useMemo(() => {
        const module = modules.find(m => location.pathname.startsWith(m.path));
        return module?.id;
    }, [location.pathname, modules]);

    const clearHoverLeaveTimeout = useCallback(() => {
        if (hoverLeaveTimeoutRef.current !== null) {
            window.clearTimeout(hoverLeaveTimeoutRef.current);
            hoverLeaveTimeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (hoverLeaveTimeoutRef.current !== null) {
                window.clearTimeout(hoverLeaveTimeoutRef.current);
            }
        };
    }, []);

    const handleDesktopHoverEnter = useCallback(() => {
        clearHoverLeaveTimeout();
        setIsHovered(true);
    }, [clearHoverLeaveTimeout, setIsHovered]);

    const handleDesktopHoverLeave = useCallback(() => {
        if (isPinned) return;
        if (hoverLeaveTimeoutRef.current !== null) return;
        hoverLeaveTimeoutRef.current = window.setTimeout(() => {
            setIsHovered(false);
            hoverLeaveTimeoutRef.current = null;
        }, 90);
    }, [isPinned, setIsHovered]);

    const handleUpgrade = () => {
        navigate('/pricing');
    };

    const isFreeUser = !user?.subscriptionTier || user.subscriptionTier === 'free';
    return (
        <>
            {/* Mobile drawer overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{ background: 'color-mix(in srgb, var(--color-text-primary) 22%, transparent)' }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.aside
                        initial={{ x: -EXPANDED_WIDTH }}
                        animate={{ x: 0 }}
                        exit={{ x: -EXPANDED_WIDTH }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed left-0 top-0 bottom-0 z-50 lg:hidden overflow-y-auto"
                        style={{
                            width: `${EXPANDED_WIDTH}px`,
                            background: 'var(--color-card)',
                            borderRight: '1px solid var(--color-border-default)',
                        }}
                    >
                        {/* Mobile content - same as expanded desktop */}
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div
                                className="p-3 shrink-0"
                                style={{ borderBottom: '1px solid var(--color-border-default)' }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-10 w-10 rounded-2xl grid place-items-center"
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid var(--color-border-default)',
                                            }}
                                        >
                                            <GraduationCap className="h-5 w-5" style={{ color: 'var(--color-text-primary)' }} />
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigate('/');
                                                setIsMobileOpen(false);
                                            }}
                                            className="text-sm font-semibold transition-colors"
                                            style={{ color: 'var(--color-text-primary)' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--color-accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--color-text-primary)';
                                            }}
                                            title="Retour a l'accueil"
                                        >
                                            {SITE_NAME}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileOpen(false)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--color-panel)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                {/* Year/Semester selector - Modern dropdowns */}
                                <div className="mt-3 flex items-center gap-2">
                                    <FancySelect
                                        label="ANNEE"
                                        value={selectedYear}
                                        options={yearOptions}
                                        onChange={handleYearChange}
                                    />
                                    <FancySelect
                                        label="SEMESTRE"
                                        value={selectedSemester}
                                        options={semesterOptions}
                                        onChange={handleSemesterChange}
                                    />
                                </div>
                            </div>

                            {/* Modules */}
                            <div className="flex-1 overflow-y-auto p-3">
                                <p className="px-2 py-2 text-xs font-semibold tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                    MATIERES
                                </p>
                                <nav className="space-y-1">
                                    {modules.map((module) => {
                                        const Icon = module.icon;
                                        const isActive = activeModuleId === module.id;
                                        return (
                                            <button
                                                key={module.id}
                                                onClick={() => {
                                                    navigate(module.path);
                                                    setIsMobileOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200"
                                                style={{
                                                    background: isActive ? 'var(--color-bg-raised)' : 'transparent',
                                                    color: 'var(--color-text-primary)',
                                                    border: isActive ? '1px solid var(--color-border-default)' : 'none',
                                                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'var(--color-bg-raised)';
                                                    }
                                                    // Change text color to red on hover
                                                    const textSpan = e.currentTarget.querySelector('span > span:last-child') as HTMLElement;
                                                    if (textSpan) {
                                                        textSpan.style.color = 'var(--color-accent)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'transparent';
                                                    }
                                                    // Reset text color
                                                    const textSpan = e.currentTarget.querySelector('span > span:last-child') as HTMLElement;
                                                    if (textSpan) {
                                                        textSpan.style.color = 'var(--color-text-primary)';
                                                    }
                                                }}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Icon className="h-4 w-4" style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }} />
                                                    <span className="transition-colors duration-200">{module.label}</span>
                                                </span>
                                                <ArrowRight className="h-4 w-4" style={{ color: isActive ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }} />
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* User section */}
                            <div
                                className="shrink-0 p-3"
                                style={{
                                    borderTop: '1px solid var(--color-border-default)',
                                    background: 'var(--color-card)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            referrerPolicy="no-referrer"
                                            className="h-10 w-10 rounded-full border-2"
                                            style={{ borderColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}
                                        />
                                    ) : (
                                        <div
                                            className="h-10 w-10 rounded-full flex items-center justify-center"
                                            style={{
                                                background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                                                border: '2px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
                                            }}
                                        >
                                            <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                                                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                                            {user?.displayName || 'Utilisateur'}
                                        </p>
                                        <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                                            {user?.email || user?.subscriptionTier || 'FREE'}
                                        </p>
                                    </div>
                                </div>
                                {isFreeUser && (
                                    <button
                                        onClick={handleUpgrade}
                                        className="w-full mt-2 inline-flex items-center justify-center gap-2 h-9 px-3 text-sm font-semibold rounded-xl transition"
                                        style={{
                                            background: 'var(--color-accent)',
                                            color: 'var(--color-accent-foreground)',
                                            border: '1px solid var(--color-accent)',
                                            boxShadow: 'var(--shadow-sm)',
                                        }}
                                    >
                                        <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ background: 'color-mix(in srgb, var(--color-accent-foreground) 80%, transparent)' }} />
                                        <span>Passer a Premium</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop hover trigger rail (fixed hit area) */}
            <div
                className="hidden lg:block fixed left-0 top-0 bottom-0 z-30"
                style={{ width: `${RAIL_WIDTH}px` }}
                onMouseEnter={handleDesktopHoverEnter}
            />

            {/* Desktop Rail Sidebar */}
            <aside
                onMouseEnter={handleDesktopHoverEnter}
                onMouseLeave={handleDesktopHoverLeave}
                className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 overflow-hidden z-40 glass-premium relative"
                style={{
                    width: 'var(--sidebar-width)',
                    borderRight: '1px solid var(--glass-border)',
                    boxSizing: 'border-box',
                    willChange: 'width',
                    backfaceVisibility: 'hidden',
                    transition: 'width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), background 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                    background: isExpanded
                        ? 'color-mix(in srgb, var(--color-card) 94%, var(--color-canvas) 6%)'
                        : 'color-mix(in srgb, var(--color-card) 88%, var(--color-canvas) 12%)',
                    boxShadow: isExpanded
                        ? 'inset -1px 0 0 color-mix(in srgb, var(--color-text-primary) 7%, transparent), 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 55%, transparent), 0 10px 24px color-mix(in srgb, var(--color-text-primary) 8%, transparent)'
                        : 'inset -1px 0 0 color-mix(in srgb, var(--color-text-primary) 6%, transparent), 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 45%, transparent), 0 6px 14px color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
                }}
            >
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-bg-raised) 38%, transparent) 0%, color-mix(in srgb, var(--color-bg-raised) 5%, transparent) 34%, transparent 100%)',
                        opacity: isExpanded ? 1 : 0.58,
                        transform: isExpanded ? 'translateX(0)' : 'translateX(-3px)',
                        transition: `opacity 300ms ${SIDEBAR_EASE}, transform 300ms ${SIDEBAR_EASE}`,
                    }}
                />
                {/* Header */}
                <div
                    className="p-3 flex items-center gap-3 shrink-0 relative z-10"
                    style={{ borderBottom: '1px solid var(--color-border-default)' }}
                >
                    {/* Logo - always visible */}
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors"
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--color-border-default)',
                        }}
                        title="Accueil"
                    >
                        <GraduationCap
                            className="h-5 w-5"
                            style={{
                                color: 'var(--color-text-primary)',
                                transform: isExpanded ? 'translateX(0)' : 'translateX(-1.5px)',
                                transition: `transform 300ms ${SIDEBAR_EASE}`,
                                willChange: 'transform',
                            }}
                        />
                    </button>

                    <div
                        className="flex-1 flex items-center justify-between min-w-0 overflow-hidden"
                        style={{
                            opacity: isExpanded ? 1 : 0,
                            maxWidth: isExpanded ? '240px' : '0px',
                            transform: isExpanded ? 'translateX(0)' : 'translateX(-8px)',
                            pointerEvents: isExpanded ? 'auto' : 'none',
                            transition: `opacity 240ms ${SIDEBAR_EASE}, max-width 300ms ${SIDEBAR_EASE}, transform 240ms ${SIDEBAR_EASE}`,
                            transitionDelay: isExpanded ? '40ms' : '0ms',
                            willChange: 'opacity, transform, max-width',
                        }}
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm font-semibold truncate transition-colors"
                            style={{ color: 'var(--color-text-primary)' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--color-accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--color-text-primary)';
                            }}
                            title="Retour a l'accueil"
                        >
                            {SITE_NAME}
                        </button>
                        <button
                            onClick={togglePin}
                            className="p-2 rounded-lg transition-colors shrink-0"
                            style={{
                                background: isPinned ? 'var(--color-bg-overlay)' : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                                if (!isPinned) {
                                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isPinned) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                            title={isPinned ? "Desepingler" : "Epingler"}
                        >
                            <Pin
                                className={`h-4 w-4 transition-transform ${isPinned ? 'rotate-45' : ''}`}
                                style={{
                                    color: isPinned ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                }}
                            />
                        </button>
                    </div>
                </div>

                <div
                    className="relative z-30 px-3 overflow-visible"
                    style={{
                        borderBottom: '1px solid var(--color-border-default)',
                        maxHeight: isExpanded ? '120px' : '0px',
                        opacity: isExpanded ? 1 : 0,
                        paddingTop: isExpanded ? '12px' : '0px',
                        paddingBottom: isExpanded ? '12px' : '0px',
                        pointerEvents: isExpanded ? 'auto' : 'none',
                        transition: `max-height 300ms ${SIDEBAR_EASE}, opacity 220ms ${SIDEBAR_EASE}, padding 260ms ${SIDEBAR_EASE}`,
                        transitionDelay: isExpanded ? '60ms' : '0ms',
                        willChange: 'max-height, opacity, padding',
                    }}
                >
                    {/* Modern dropdowns with year-semester logic */}
                    <div className="flex items-center gap-2">
                        <FancySelect
                            label="ANNEE"
                            value={selectedYear}
                            options={yearOptions}
                            onChange={handleYearChange}
                        />
                        <FancySelect
                            label="SEMESTRE"
                            value={selectedSemester}
                            options={semesterOptions}
                            onChange={handleSemesterChange}
                        />
                    </div>
                </div>

                {/* Modules navigation */}
                <nav className="flex-1 overflow-y-auto p-3 relative z-10">
                    <p
                        className="px-2 py-2 text-xs font-semibold tracking-wider overflow-hidden whitespace-nowrap"
                        style={{
                            color: 'var(--color-text-muted)',
                            opacity: isExpanded ? 1 : 0,
                            maxWidth: isExpanded ? '180px' : '0px',
                            transform: isExpanded ? 'translateX(0)' : 'translateX(-8px)',
                            transition: `opacity 220ms ${SIDEBAR_EASE}, max-width 280ms ${SIDEBAR_EASE}, transform 220ms ${SIDEBAR_EASE}`,
                            transitionDelay: isExpanded ? '80ms' : '0ms',
                            willChange: 'opacity, transform, max-width',
                        }}
                    >
                        MATIERES
                    </p>
                    <div className="space-y-1">
                        {modules.map((module, index) => {
                            const Icon = module.icon;
                            const isActive = activeModuleId === module.id;
                            const itemDelay = isExpanded ? `${Math.min(120 + index * 18, 220)}ms` : '0ms';

                            return (
                                <button
                                    key={module.id}
                                    onClick={() => navigate(module.path)}
                                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200"
                                    style={{
                                        background: isActive ? 'var(--color-bg-raised)' : 'transparent',
                                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                        border: isActive ? '1px solid var(--color-border-default)' : '1px solid transparent',
                                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                                        justifyContent: isExpanded ? 'space-between' : 'center',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'var(--color-bg-raised)';
                                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                        }
                                        // Change text color on hover
                                        const textSpan = e.currentTarget.querySelector('span > span') as HTMLElement;
                                        if (textSpan) {
                                            textSpan.style.color = 'var(--color-accent)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'transparent';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }
                                        // Reset text color
                                        const textSpan = e.currentTarget.querySelector('span > span') as HTMLElement;
                                        if (textSpan) {
                                            textSpan.style.color = isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)';
                                        }
                                    }}
                                    title={!isExpanded ? module.label : undefined}
                                >
                                    <span className="flex items-center gap-3 min-w-0">
                                        <Icon
                                            className="h-4 w-4 shrink-0"
                                            style={{
                                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                                transform: isExpanded ? 'translateX(0)' : 'translateX(-1.5px)',
                                                transition: `transform 260ms ${SIDEBAR_EASE}`,
                                                transitionDelay: itemDelay,
                                                willChange: 'transform',
                                            }}
                                        />
                                        <span
                                            className="whitespace-nowrap overflow-hidden"
                                            style={{
                                                opacity: isExpanded ? 1 : 0,
                                                maxWidth: isExpanded ? '180px' : '0px',
                                                transform: isExpanded ? 'translateX(0)' : 'translateX(-8px)',
                                                transition: `opacity 220ms ${SIDEBAR_EASE}, max-width 280ms ${SIDEBAR_EASE}, transform 220ms ${SIDEBAR_EASE}`,
                                                transitionDelay: itemDelay,
                                                willChange: 'opacity, transform, max-width',
                                            }}
                                        >
                                            {module.label}
                                        </span>
                                    </span>
                                    <ArrowRight
                                        className="h-4 w-4 shrink-0"
                                        style={{
                                            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                            opacity: isExpanded ? 1 : 0,
                                            transform: isExpanded ? 'translateX(0)' : 'translateX(-6px)',
                                            width: isExpanded ? '16px' : '0px',
                                            transition: `opacity 200ms ${SIDEBAR_EASE}, transform 220ms ${SIDEBAR_EASE}, width 280ms ${SIDEBAR_EASE}`,
                                            transitionDelay: itemDelay,
                                            willChange: 'opacity, transform, width',
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* User section */}
                <div
                    className="shrink-0 p-3 relative z-10"
                    style={{
                        borderTop: '1px solid var(--color-border-default)',
                        background: 'var(--color-card)',
                    }}
                >
                    {isExpanded ? (
                        <>
                            <div className="flex items-center gap-3 mb-3">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        referrerPolicy="no-referrer"
                                        className="h-10 w-10 rounded-full border-2 shrink-0 object-cover"
                                        style={{ borderColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}
                                    />
                                ) : (
                                    <div
                                        className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                                        style={{
                                            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                                            border: '2px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
                                        }}
                                    >
                                        <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                                            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                                            {user?.displayName || 'Utilisateur'}
                                        </p>
                                        <button
                                            onClick={() => navigate('/settings')}
                                            className="p-1 rounded-lg transition-colors shrink-0"
                                            style={{ color: 'var(--color-text-muted)' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                e.currentTarget.style.color = 'var(--color-text-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'var(--color-text-muted)';
                                            }}
                                            title="Parametres"
                                        >
                                            <Settings className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                                        {user?.email || user?.subscriptionTier || 'FREE'}
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-2">
                                {isFreeUser && (
                                    <button
                                        onClick={handleUpgrade}
                                        className="w-full inline-flex items-center justify-center gap-2 h-9 px-3 text-sm font-semibold rounded-xl transition"
                                        style={{
                                            background: 'var(--color-accent)',
                                            color: 'var(--color-accent-foreground)',
                                            border: '1px solid var(--color-accent)',
                                            boxShadow: 'var(--shadow-sm)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                        }}
                                    >
                                        <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ background: 'color-mix(in srgb, var(--color-accent-foreground) 80%, transparent)' }} />
                                        <span>Passer a Premium</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => signOut()}
                                    className="w-full inline-flex items-center justify-center gap-2 h-9 px-3 text-sm font-semibold rounded-xl transition"
                                    style={{
                                        background: 'transparent',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Se deconnecter</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        // Rail mode: Just avatar with fixed size
                        <button
                            onClick={() => navigate('/settings')}
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{
                                background: user?.photoURL ? 'transparent' : 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                                border: `2px solid color-mix(in srgb, var(--color-accent) 20%, transparent)`,
                            }}
                            title={user?.displayName || 'Utilisateur'}
                        >
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || 'User'}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                                    {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}

export { RAIL_WIDTH as SIDEBAR_RAIL_WIDTH, EXPANDED_WIDTH as SIDEBAR_EXPANDED_WIDTH };


