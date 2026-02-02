/**
 * ContentTabs Component
 * Tab navigation for different content types (Cours, TD, QCM, Annales)
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
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 p-1.5 rounded-xl" style={{ background: "var(--color-bg-overlay)", border: `1px solid var(--color-border-soft)` }} role="tablist">
                <Tab label="Cours" count={coursCount} active={activeTab === 'cours'} onClick={() => onTabChange('cours')} themeColor={themeColor} />
                <Tab label="TD" count={tdCount} active={activeTab === 'td'} onClick={() => onTabChange('td')} themeColor={themeColor} />
                <Tab label="QCM" count={qcmCount} active={activeTab === 'qcm'} onClick={() => onTabChange('qcm')} themeColor={themeColor} />
                <Tab label="Annales" count={annalesCount} active={activeTab === 'annales'} onClick={() => onTabChange('annales')} themeColor={themeColor} />
            </div>
        </div>
    );
}

function Tab({ label, count, active, onClick, themeColor }: { label: string; count: number; active: boolean; onClick: () => void; themeColor: string }) {
    return (
        <button 
            type="button" 
            onClick={onClick} 
            role="tab" 
            aria-selected={active}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 transition-all duration-200"
            style={{ 
                background: active ? 'var(--color-bg-raised)' : 'transparent', 
                color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                boxShadow: active ? 'var(--shadow-sm)' : 'none',
                borderBottom: active ? `2px solid ${themeColor}` : '2px solid transparent'
            }}
        >
            <span>{label}</span>
            <span className="px-1.5 py-0.5 rounded text-xs font-semibold" style={{ 
                background: active ? `${themeColor}15` : 'var(--color-bg-overlay)', 
                color: active ? themeColor : 'var(--color-text-muted)'
            }}>
                {count}
            </span>
        </button>
    );
}
