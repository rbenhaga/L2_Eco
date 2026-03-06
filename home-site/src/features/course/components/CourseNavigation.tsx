import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, type ComponentType } from 'react';
import { ChevronDown, Menu, X, Home } from 'lucide-react';
import type { SubjectConfig } from '../../../config/semesters';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { preloadRouteForPath } from '../../../utils/routePreload';

export interface NavItem {
    path: string;
    label: string;
    num?: number;
    icon?: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

export interface NavGroup {
    label: string;
    icon: ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
    items: NavItem[];
}

interface CourseNavigationProps {
    subject: SubjectConfig;
    navGroups: NavGroup[];
    progressColor?: string;
}

function DropdownMenu({ group, isActive, activeColor }: { group: NavGroup; isActive: boolean; activeColor: string }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => setIsOpen(false), 100);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <div
            ref={menuRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1.5"
                style={isActive
                    ? {
                        background: 'var(--color-bg-overlay)',
                        color: 'var(--color-text-primary)',
                        boxShadow: 'var(--shadow-sm)',
                        outline: '1px solid var(--color-border-default)',
                    }
                    : {
                        color: 'var(--color-text-muted)',
                    }
                }
            >
                <group.icon size={14} />
                <span className="hidden sm:inline">{group.label}</span>
                <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 py-2 backdrop-blur-xl rounded-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                        background: 'color-mix(in srgb, var(--color-bg-raised) 90%, transparent)',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--color-border-default)',
                    }}
                >
                    {group.items.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => preloadRouteForPath(item.path)}
                            onFocus={() => preloadRouteForPath(item.path)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors"
                            style={location.pathname === item.path
                                ? { backgroundColor: `${activeColor}20`, color: activeColor }
                                : { color: 'var(--color-text-muted)' }
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {item.num !== undefined && (
                                <span
                                    className="w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold"
                                    style={location.pathname === item.path
                                        ? { backgroundColor: activeColor, color: 'var(--color-bg-raised)' }
                                        : { backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }
                                    }
                                >
                                    {item.num}
                                </span>
                            )}
                            {item.icon && <item.icon size={16} style={{ color: location.pathname === item.path ? activeColor : undefined }} />}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export function CourseNavigation({ subject, navGroups, progressColor }: CourseNavigationProps) {
    const location = useLocation();
    const [progress, setProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const targetProgress = useRef(0);
    const animationFrame = useRef<number>(undefined);

    const color = progressColor || subject.color.primary;
    const Icon = subject.icon;

    useEffect(() => {
        const updateProgress = () => {
            setProgress(prev => {
                const diff = targetProgress.current - prev;
                if (Math.abs(diff) < 0.1) return targetProgress.current;
                return prev + diff * 0.15;
            });
            animationFrame.current = requestAnimationFrame(updateProgress);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress.current = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        };

        animationFrame.current = requestAnimationFrame(updateProgress);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const isGroupActive = (group: NavGroup) =>
        group.items.some(item => location.pathname === item.path);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b supports-backdrop-filter:bg-[var(--color-bg-raised)]/60"
            style={{
                background: 'color-mix(in srgb, var(--color-bg-raised) 80%, transparent)',
                borderColor: 'var(--color-border-default)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <Home size={20} />
                    </Link>
                    <div
                        className="h-6 w-px hidden sm:block"
                        style={{ background: 'var(--color-border-default)' }}
                    />
                    <Link
                        to={subject.basePath}
                        className="flex items-center gap-3 no-underline group"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                            style={{
                                backgroundColor: subject.color.primary,
                                color: 'var(--color-accent-foreground)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                        >
                            <Icon size={18} />
                        </div>
                        <span className="font-bold text-sm tracking-tight">{subject.shortName}</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    {navGroups.map((group) => (
                        <DropdownMenu
                            key={group.label}
                            group={group}
                            isActive={isGroupActive(group)}
                            activeColor={color}
                        />
                    ))}
                    <div className="w-px h-6 mx-2" style={{ background: 'var(--color-border-default)' }} />
                    <ThemeToggle />
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors border border-transparent"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-label="Menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-[2px] w-full" style={{ background: 'var(--color-bg-overlay)' }}>
                <div
                    className="h-full transition-all ease-out duration-100"
                    style={{ width: `${progress}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                />
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute left-0 right-0 top-full border-b max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-5"
                    style={{
                        background: 'var(--color-text-primary)',
                        borderColor: 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)',
                        boxShadow: 'var(--shadow-xl)',
                    }}
                >
                    <div className="p-4 space-y-6 pb-8">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <div
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-2 mb-3"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    <group.icon size={14} />
                                    {group.label}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {group.items.map((item) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onMouseEnter={() => preloadRouteForPath(item.path)}
                                                onFocus={() => preloadRouteForPath(item.path)}
                                                className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm no-underline transition-all active:scale-[0.98] border border-transparent"
                                                style={isActive
                                                    ? {
                                                        backgroundColor: subject.color.primary,
                                                        color: 'var(--color-accent-foreground)',
                                                        boxShadow: 'var(--shadow-lg)',
                                                    }
                                                    : {
                                                        background: 'color-mix(in srgb, var(--color-bg-raised) 5%, transparent)',
                                                        color: 'var(--color-text-secondary)',
                                                    }
                                                }
                                            >
                                                {item.num !== undefined && (
                                                    <span
                                                        className="w-7 h-7 rounded-lg text-xs flex items-center justify-center font-bold shrink-0"
                                                        style={isActive
                                                            ? { background: 'color-mix(in srgb, var(--color-bg-raised) 20%, transparent)', color: 'var(--color-accent-foreground)' }
                                                            : { background: 'var(--color-text-primary)', color: 'var(--color-text-muted)' }
                                                        }
                                                    >
                                                        {item.num}
                                                    </span>
                                                )}
                                                {item.icon && <item.icon size={18} style={isActive ? { color: 'color-mix(in srgb, var(--color-bg-raised) 80%, transparent)' } : { color }} />}
                                                <span className="truncate font-medium">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
