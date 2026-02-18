/**
 * ModuleTabBar - Masterclass Editorial Design
 *
 * Minimal border-bottom style with accent color,
 * count badges for each tab
 */

import { motion } from 'framer-motion';

export type TabId = 'cours' | 'td' | 'qcm' | 'annales';

interface Tab {
    id: TabId;
    label: string;
    count?: number;
}

interface ModuleTabBarProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
    coursCount: number;
    tdCount: number;
    qcmCount: number;
    annalesCount: number;
}

export function ModuleTabBar({
    activeTab,
    onTabChange,
    coursCount,
    tdCount,
    qcmCount,
    annalesCount,
}: ModuleTabBarProps) {
    const tabs: Tab[] = [
        { id: 'cours', label: 'Cours', count: coursCount },
        { id: 'td', label: 'Ressources TD', count: tdCount > 0 ? tdCount : undefined },
        { id: 'qcm', label: 'Quiz & QCM', count: qcmCount > 0 ? qcmCount : undefined },
        { id: 'annales', label: 'Annales', count: annalesCount > 0 ? annalesCount : undefined },
    ];

    return (
        <div
            className="flex items-center gap-6 sm:gap-10 mb-10 overflow-x-auto"
            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className="pb-4 relative shrink-0 transition-colors hover:text-[var(--color-text-primary)]"
                        style={{
                            color: isActive
                                ? 'var(--color-text-primary)'
                                : 'var(--color-text-muted)',
                        }}
                    >
                        <span
                            className="text-sm"
                            style={{
                                fontWeight: isActive ? 700 : 500,
                            }}
                        >
                            {tab.label}
                        </span>

                        {/* Count badge */}
                        {tab.count !== undefined && (
                            <span
                                className="ml-2 px-2 py-0.5 rounded-md text-[10px]"
                                style={{
                                    background: isActive ? 'var(--color-accent-subtle)' : 'var(--color-bg-overlay)',
                                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                    fontWeight: 700,
                                }}
                            >
                                {tab.count}
                            </span>
                        )}

                        {/* Active border */}
                        {isActive && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0"
                                style={{
                                    height: '2px',
                                    background: 'var(--color-accent)',
                                }}
                                layoutId="activeTabIndicator"
                                transition={{
                                    type: 'tween',
                                    ease: [0.25, 0.1, 0.25, 1],
                                    duration: 0.3,
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
