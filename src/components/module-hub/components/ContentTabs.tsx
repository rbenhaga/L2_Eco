/**
 * ContentTabs Component - SEGMENTED CONTROL
 * Premium pills with strong active state
 * Badges for counts, tap-friendly (44px)
 */

import type { ContentType } from '../types';

interface ContentTabsProps {
    activeTab: ContentType;
    onTabChange: (tab: ContentType) => void;
    coursCount: number;
    tdCount: number;
    qcmCount: number;
    annalesCount: number;
    themeColor: string;
}

export function ContentTabs({
    activeTab,
    onTabChange,
    coursCount,
    tdCount,
    qcmCount,
    annalesCount,
    themeColor
}: ContentTabsProps) {
    const tabs = [
        { id: 'cours' as ContentType, label: 'Cours', count: coursCount },
        { id: 'td' as ContentType, label: 'TD', count: tdCount },
        { id: 'qcm' as ContentType, label: 'QCM', count: qcmCount },
        { id: 'annales' as ContentType, label: 'Annales', count: annalesCount }
    ];

    return (
        <div className="mb-6">
            {/* Segmented Control Container */}
            <div
                className="inline-flex items-center gap-1 p-1.5 rounded-xl"
                style={{
                    background: "var(--color-bg-overlay)",
                    boxShadow: "inset 0 1px 3px color-mix(in srgb, var(--color-text-primary) 5%, transparent)"
                }}
                role="tablist"
            >
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className="relative min-h-[44px] px-5 py-2.5 rounded-lg font-bold text-sm inline-flex items-center gap-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                        style={activeTab === tab.id ? {
                            background: 'var(--color-bg-raised)',
                            color: themeColor,
                            boxShadow: '0 2px 8px color-mix(in srgb, var(--color-text-primary) 8%, transparent), 0 1px 2px color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
                            '--tw-ring-color': themeColor
                        } as React.CSSProperties : {
                            background: 'transparent',
                            color: 'var(--color-text-muted)',
                            '--tw-ring-color': themeColor
                        } as React.CSSProperties}
                    >
                        <span>{tab.label}</span>
                        {/* Badge count */}
                        <span
                            className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-black"
                            style={activeTab === tab.id ? {
                                background: themeColor,
                                color: 'var(--color-bg-raised)'
                            } : {
                                background: 'var(--color-bg-raised)',
                                color: 'var(--color-text-muted)'
                            }}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
