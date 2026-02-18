/**
 * TabBar - Premium Redesign
 * Design: Airy Atelier (light) / Neon Scholar (dark)
 * Features:
 * - Animated active indicator with glow
 * - Theme-aware glassmorphic container
 * - Smooth transition between tabs
 */

import { BookOpen, ClipboardList, HelpCircle, Archive, LucideIcon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

type TabId = 'cours' | 'td' | 'qcm' | 'annales';

interface Tab {
    id: TabId;
    label: string;
    icon: LucideIcon;
    count: number;
}

interface TabBarProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
    coursCount: number;
    tdCount: number;
    qcmCount: number;
    annalesCount: number;
    themeColor: string;
}

export function TabBar({
    activeTab,
    onTabChange,
    coursCount,
    tdCount,
    qcmCount,
    annalesCount,
    themeColor,
}: TabBarProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const tabs: Tab[] = [
        { id: 'cours', label: 'Cours', icon: BookOpen, count: coursCount },
        { id: 'td', label: 'TD', icon: ClipboardList, count: tdCount },
        { id: 'qcm', label: 'QCM', icon: HelpCircle, count: qcmCount },
        { id: 'annales', label: 'Annales', icon: Archive, count: annalesCount },
    ];

    return (
        <div className="sticky top-14 z-10 -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6 pt-3 pb-2">
            <div
                className="inline-flex w-full gap-1 rounded-2xl p-1.5"
                style={{
                    background: isDark
                        ? 'var(--color-card)'
                        : 'var(--color-panel)',
                    boxShadow: isDark
                        ? 'inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent), 0 4px 12px color-mix(in srgb, var(--color-text-primary) 20%, transparent)'
                        : 'var(--shadow-sm)',
                    border: isDark ? '1px solid var(--color-border-subtle)' : 'none',
                }}
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === activeTab;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="group relative flex-1 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300"
                            style={{
                                background: isActive
                                    ? isDark
                                        ? `linear-gradient(135deg, color-mix(in srgb, ${themeColor} 25%, var(--color-card)) 0%, color-mix(in srgb, ${themeColor} 15%, var(--color-card)) 100%)`
                                        : 'var(--color-card)'
                                    : 'transparent',
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                boxShadow: isActive
                                    ? isDark
                                        ? `0 4px 12px color-mix(in srgb, ${themeColor} 30%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-bg-raised) 5%, transparent)`
                                        : 'var(--shadow-md)'
                                    : 'none',
                            }}
                            aria-pressed={isActive}
                        >
                            {/* Active indicator glow */}
                            {isActive && isDark && (
                                <div
                                    className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at center, color-mix(in srgb, ${themeColor} 20%, transparent) 0%, transparent 70%)`,
                                    }}
                                />
                            )}

                            <span className="relative flex items-center justify-center gap-2">
                                <Icon
                                    className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                    style={{
                                        color: isActive ? themeColor : 'var(--color-text-muted)'
                                    }}
                                />
                                <span className="hidden md:inline truncate">{tab.label}</span>
                                <span
                                    className="hidden sm:inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold flex-shrink-0 transition-all duration-200"
                                    style={{
                                        background: isActive
                                            ? isDark
                                                ? `color-mix(in srgb, ${themeColor} 25%, transparent)`
                                                : `color-mix(in srgb, ${themeColor} 12%, white)`
                                            : isDark
                                                ? 'var(--color-surface-hover)'
                                                : 'var(--color-canvas)',
                                        color: isActive ? themeColor : 'var(--color-text-muted)',
                                        border: isActive
                                            ? `1px solid color-mix(in srgb, ${themeColor} ${isDark ? '40' : '20'}%, transparent)`
                                            : 'none',
                                    }}
                                >
                                    {tab.count}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
