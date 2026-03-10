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
        { id: 'cours', label: 'Parcours', count: coursCount },
        { id: 'td', label: 'TD', count: tdCount > 0 ? tdCount : undefined },
        { id: 'qcm', label: 'QCM', count: qcmCount > 0 ? qcmCount : undefined },
        { id: 'annales', label: 'Annales', count: annalesCount > 0 ? annalesCount : undefined },
    ];

    return (
        <div className="flex items-center gap-3 overflow-x-auto border-b pb-1 sm:gap-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className="relative shrink-0 rounded-full px-2.5 py-2 pb-3 text-[13px] font-medium sm:px-3 sm:text-sm"
                        style={{
                            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            background: isActive ? 'color-mix(in srgb, var(--color-accent-subtle) 68%, transparent)' : 'transparent',
                            fontWeight: isActive ? 600 : 500,
                        }}
                    >
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                            <span
                                className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:ml-2 sm:min-w-6 sm:px-2 sm:text-[11px]"
                                style={{
                                    background: isActive ? 'var(--color-bg-raised)' : 'var(--color-bg-overlay)',
                                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                    border: isActive ? '1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)' : '1px solid transparent',
                                }}
                            >
                                {tab.count}
                            </span>
                        )}

                        {isActive && (
                            <motion.div
                                layoutId="module-tab-active"
                                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full"
                                style={{ background: 'var(--color-accent)' }}
                                transition={{ duration: 0.24, ease: [0.33, 1, 0.68, 1] }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
