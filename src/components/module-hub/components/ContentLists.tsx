import { motion } from 'framer-motion';
import { FileText, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { TD_DATA, QCM_DATA, getSemesterKey, getAnnalesData } from '../utils';
import type { ModuleId } from '../types';

const staggerItem = (index: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.33, 1, 0.68, 1] as const,
    },
});

interface TDListProps {
    moduleId: ModuleId;
    baseRoute?: string;
    isItemLocked?: (item: { id: string; route?: string }, index: number) => boolean;
    onLockedItemClick?: (item: { id: string; route?: string }) => void;
    onItemClick?: (item: { id: string; route?: string }) => void;
    onItemHover?: (item: { id: string; route?: string }) => void;
    onItemFocus?: (item: { id: string; route?: string }) => void;
}

export function TDList({ moduleId, baseRoute, isItemLocked, onLockedItemClick, onItemClick, onItemHover, onItemFocus }: TDListProps) {
    const key = baseRoute ? getSemesterKey(baseRoute, moduleId) : moduleId;
    const tdList = TD_DATA[key] || [];

    if (tdList.length === 0) {
        return (
            <div className="text-center py-16">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
                <p className="text-base font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Aucun TD disponible</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {tdList.map((td, index) => {
                const item = { id: td.id, route: td.route };
                const locked = Boolean(isItemLocked?.(item, index));
                return (
                    <motion.button
                        key={td.id}
                        onClick={() => (locked ? onLockedItemClick?.(item) : onItemClick?.(item))}
                        onMouseEnter={() => onItemHover?.(item)}
                        onFocus={() => onItemFocus?.(item)}
                        className="group w-full text-left relative overflow-hidden"
                        {...staggerItem(index)}
                        style={{ background: 'var(--color-bg-raised)', borderRadius: '12px', border: '1px solid var(--color-border-default)', opacity: locked ? 0.8 : 1 }}
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: 'var(--color-accent)', borderRadius: '12px 0 0 12px' }} />
                        <div className="flex flex-col gap-3 p-4 pl-5">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-9 h-9 shrink-0 mt-0.5" style={{ background: 'var(--color-accent-subtle)', borderRadius: '8px' }}>
                                    <FileText className="w-[18px] h-[18px]" style={{ color: 'var(--color-accent)' }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-[15px] font-semibold leading-snug" style={{ color: 'var(--color-text-primary)' }}>{td.title}</h3>
                                        {locked && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-warning)', background: 'var(--color-warning-subtle)', borderRadius: '4px' }}>
                                                <Lock className="w-3 h-3" />Premium
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[13px] line-clamp-2 mt-1" style={{ color: 'var(--color-text-muted)' }}>{td.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pl-12">
                                <span className="text-[12px] font-medium px-2 py-1" style={{ color: 'var(--color-text-secondary)', background: 'var(--color-bg-overlay)', borderRadius: '6px' }}>{td.count}</span>
                                <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            </div>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}

function ProgressRing({ count }: { count: number }) {
    const radius = 18;
    const stroke = 3;
    const circumference = 2 * Math.PI * radius;
    const visualProgress = (count % 7) * 0.04;
    const offset = circumference - visualProgress * circumference;

    return (
        <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="22" cy="22" r={radius} fill="none" strokeWidth={stroke} style={{ stroke: 'var(--color-bg-overlay)' }} />
                <circle cx="22" cy="22" r={radius} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ stroke: 'var(--color-success)' }} />
            </svg>
            <CheckCircle2 className="w-[18px] h-[18px] relative z-10" style={{ color: 'var(--color-success)' }} />
        </div>
    );
}

interface QCMListProps {
    moduleId: ModuleId;
    baseRoute?: string;
    isItemLocked?: (item: { id: string }, index: number) => boolean;
    onLockedItemClick?: (item: { id: string }) => void;
    onItemClick?: (item: { id: string }) => void;
}

export function QCMList({ moduleId, baseRoute, isItemLocked, onLockedItemClick, onItemClick }: QCMListProps) {
    const key = baseRoute ? getSemesterKey(baseRoute, moduleId) : moduleId;
    const qcmList = QCM_DATA[key] || [];

    if (qcmList.length === 0) {
        return <div className="text-center py-16" style={{ color: 'var(--color-text-secondary)' }}>Aucun QCM disponible</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {qcmList.map((qcm, index) => {
                const item = { id: qcm.id };
                const locked = Boolean(isItemLocked?.(item, index));
                return (
                    <motion.button
                        key={qcm.id}
                        onClick={() => (locked ? onLockedItemClick?.(item) : onItemClick?.(item))}
                        className="group w-full text-left relative overflow-hidden"
                        {...staggerItem(index)}
                        style={{ background: 'var(--color-bg-raised)', borderRadius: '12px', border: '1px solid var(--color-border-default)', opacity: locked ? 0.8 : 1 }}
                    >
                        <div className="flex items-center gap-4 p-4">
                            <ProgressRing count={qcm.count} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-[15px] font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{qcm.title}</h3>
                                    {locked && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-warning)', background: 'var(--color-warning-subtle)', borderRadius: '4px' }}>
                                            <Lock className="w-3 h-3" />Premium
                                        </span>
                                    )}
                                </div>
                                <p className="text-[13px] line-clamp-1" style={{ color: 'var(--color-text-muted)' }}>{qcm.subtitle}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-[20px] font-bold leading-none" style={{ color: 'var(--color-success)' }}>{qcm.count}</span>
                                <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>questions</span>
                            </div>
                            <ChevronRight className="w-4 h-4 shrink-0" style={{ color: 'var(--color-success)' }} />
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}

interface AnnalesListProps {
    moduleId?: ModuleId;
    baseRoute?: string;
    isItemLocked?: (path: string, index: number) => boolean;
    onLockedItemClick?: (path: string) => void;
    onItemClick?: (path: string) => void;
    onItemHover?: (path: string) => void;
    onItemFocus?: (path: string) => void;
}

export function AnnalesList({ moduleId, baseRoute, isItemLocked, onLockedItemClick, onItemClick, onItemHover, onItemFocus }: AnnalesListProps) {
    const annalesList = moduleId ? getAnnalesData(moduleId, baseRoute) : getAnnalesData('stats' as ModuleId);

    if (annalesList.length === 0) {
        return <div className="text-center py-16" style={{ color: 'var(--color-text-secondary)' }}>Aucune annale disponible</div>;
    }

    return (
        <div className="grid gap-3 mt-8">
            {annalesList.map((annale, index) => {
                const locked = Boolean(isItemLocked?.(annale.path, index));
                return (
                    <motion.button
                        key={annale.path}
                        onClick={() => (locked ? onLockedItemClick?.(annale.path) : onItemClick?.(annale.path))}
                        onMouseEnter={() => onItemHover?.(annale.path)}
                        onFocus={() => onItemFocus?.(annale.path)}
                        className="group w-full text-left relative overflow-hidden"
                        {...staggerItem(index)}
                        style={{ background: 'var(--color-bg-raised)', borderRadius: '12px', border: '1px solid var(--color-border-default)', opacity: locked ? 0.8 : 1 }}
                    >
                        <div className="flex items-center gap-4 p-4">
                            <div className="flex items-center justify-center w-10 h-10 shrink-0" style={{ background: 'var(--color-info-subtle)', borderRadius: '8px' }}>
                                <FileText className="w-5 h-5" style={{ color: 'var(--color-info)' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h3 className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{annale.title}</h3>
                                    {locked && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-warning)', background: 'var(--color-warning-subtle)', borderRadius: '4px' }}>
                                            <Lock className="w-3 h-3" />Premium
                                        </span>
                                    )}
                                </div>
                                <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>{annale.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-info)' }} />
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
