import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { semesters, type SubjectConfig } from '../../config/semesters';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * MobileBottomNav — Fixed bottom tab bar for mobile (< lg)
 *
 * - Design Contract compliant (CSS vars, 8px grid, touch targets)
 * - Active state with accent color
 * - Safe area padding for notch devices
 * - "More" drawer for overflow subjects
 */
export function MobileBottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Detect current semester from URL
    const detectedSemester = useMemo(() => {
        if (location.pathname.startsWith('/s4/')) return 's4';
        return 's3';
    }, [location.pathname]);

    const currentSemester = semesters[detectedSemester];
    const subjects = currentSemester?.subjects || [];

    // Show first 3 subjects in bottom bar, rest in "More"
    const visibleSubjects = subjects.slice(0, 3);
    const overflowSubjects = subjects.slice(3);

    const isSubjectActive = (subject: SubjectConfig) =>
        location.pathname.startsWith(subject.basePath) ||
        // Also match legacy routes like /macro (without /s3/)
        location.pathname.startsWith(`/${subject.id}`);

    const isMoreActive = overflowSubjects.some(s => isSubjectActive(s));

    return (
        <>
            {/* "More" overlay / drawer */}
            <AnimatePresence>
                {isMoreOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="fixed inset-0 lg:hidden"
                            style={{ background: 'color-mix(in srgb, var(--color-text-primary) 30%, transparent)', zIndex: 49 }}
                            onClick={() => setIsMoreOpen(false)}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="fixed bottom-0 inset-x-0 lg:hidden rounded-t-2xl overflow-hidden"
                            style={{
                                background: 'var(--color-surface-raised)',
                                boxShadow: 'var(--shadow-xl)',
                                zIndex: 51,
                                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                            }}
                        >
                            <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-2" style={{ background: 'var(--color-border-strong)' }} />
                            <nav className="px-4 pb-4 space-y-1">
                                {overflowSubjects.map((subject) => {
                                    const Icon = subject.icon;
                                    const active = isSubjectActive(subject);
                                    return (
                                        <button
                                            key={subject.id}
                                            onClick={() => {
                                                navigate(subject.basePath);
                                                setIsMoreOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 min-h-[48px]"
                                            style={{
                                                background: active ? 'var(--color-surface-hover)' : 'transparent',
                                                color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                            }}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />
                                            <span className="text-sm font-medium">{subject.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Bottom bar */}
            <nav
                className="fixed bottom-0 left-0 right-0 lg:hidden border-t"
                style={{
                    background: 'var(--color-surface-raised)',
                    borderColor: 'var(--color-border-default)',
                    zIndex: 50,
                    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                    boxShadow: '0 -1px 8px color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
                }}
            >
                <div className="flex items-stretch justify-around">
                    {/* Home */}
                    <NavTab
                        label="Accueil"
                        icon={Home}
                        isActive={location.pathname === '/' || location.pathname === '/subscription'}
                        onClick={() => navigate('/')}
                    />

                    {/* Visible subjects */}
                    {visibleSubjects.map((subject) => (
                        <NavTab
                            key={subject.id}
                            label={subject.shortName}
                            icon={subject.icon}
                            isActive={isSubjectActive(subject)}
                            onClick={() => navigate(subject.basePath)}
                        />
                    ))}

                    {/* More */}
                    {overflowSubjects.length > 0 && (
                        <NavTab
                            label="Plus"
                            icon={MoreHorizontal}
                            isActive={isMoreActive}
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                        />
                    )}
                </div>
            </nav>
        </>
    );
}

function NavTab({
    label,
    icon: Icon,
    isActive,
    onClick,
}: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
            style={{
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
            }}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
        >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold leading-none">{label}</span>
        </button>
    );
}
