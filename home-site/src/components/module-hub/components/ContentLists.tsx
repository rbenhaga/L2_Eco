import { ChevronRight, Lock } from 'lucide-react';
import { TD_DATA, QCM_DATA, getSemesterKey, getAnnalesData } from '../utils';
import type { ModuleId } from '../types';

function ContentCard({
    kind,
    title,
    description,
    meta,
    locked,
    onClick,
    onMouseEnter,
    onFocus,
}: {
    kind: string;
    title: string;
    description?: string;
    meta?: string;
    locked?: boolean;
    onClick: () => void;
    onMouseEnter?: () => void;
    onFocus?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onFocus={onFocus}
            className="group w-full rounded-2xl border px-2.5 py-2.5 text-left transition-colors duration-200 sm:rounded-[18px] sm:px-4 sm:py-3.5"
            style={{
                borderColor: 'var(--color-border-default)',
                background: 'var(--color-bg-raised)',
                opacity: locked ? 0.74 : 1,
            }}
        >
            <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                    <p
                        className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] sm:mb-1 sm:text-[11px] sm:tracking-[0.16em]"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {kind}
                    </p>
                    <h3 className="text-[14px] font-semibold leading-snug sm:text-[15px]" style={{ color: 'var(--color-text-primary)' }}>
                        {title}
                    </h3>

                    {description && (
                        <p
                            className="mt-1 hidden text-sm sm:block"
                            style={{
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.45,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {description}
                        </p>
                    )}

                    {meta && (
                        <span
                            className="mt-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] sm:mt-2 sm:px-2 sm:py-1 sm:text-[11px] sm:tracking-[0.12em]"
                            style={{
                                background: 'var(--color-bg-overlay)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border-subtle)',
                            }}
                        >
                            {meta}
                        </span>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    <span
                        className="hidden text-xs font-medium sm:inline"
                        style={{ color: locked ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}
                    >
                        {locked ? 'Verrouillé' : 'Ouvrir'}
                    </span>
                    <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center sm:h-8 sm:w-8"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-hidden="true"
                    >
                        {locked ? (
                            <Lock className="h-3.5 w-3.5" />
                        ) : (
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        )}
                    </span>
                </div>
            </div>
        </button>
    );
}

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
            <div className="rounded-2xl border px-6 py-12 text-center" style={{ borderColor: 'var(--color-border-default)' }}>
                <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>Aucun TD disponible</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Les exercices corrigés apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="mt-5 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-2 md:gap-3">
            {tdList.map((td, index) => {
                const item = { id: td.id, route: td.route };
                const locked = Boolean(isItemLocked?.(item, index));

                return (
                    <ContentCard
                        key={td.id}
                        kind="TD"
                        title={td.title}
                        description={td.description}
                        meta={td.count}
                        locked={locked}
                        onMouseEnter={() => onItemHover?.(item)}
                        onFocus={() => onItemFocus?.(item)}
                        onClick={() => (locked ? onLockedItemClick?.(item) : onItemClick?.(item))}
                    />
                );
            })}
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
        return (
            <div className="rounded-2xl border px-6 py-12 text-center" style={{ borderColor: 'var(--color-border-default)' }}>
                <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>Aucun QCM disponible</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Les vérifications rapides apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="mt-5 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-2 md:gap-3">
            {qcmList.map((qcm, index) => {
                const item = { id: qcm.id };
                const locked = Boolean(isItemLocked?.(item, index));

                return (
                    <ContentCard
                        key={qcm.id}
                        kind="QCM"
                        title={qcm.title}
                        description={qcm.subtitle}
                        meta={`${qcm.count} questions`}
                        locked={locked}
                        onClick={() => (locked ? onLockedItemClick?.(item) : onItemClick?.(item))}
                    />
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
        return (
            <div className="rounded-2xl border px-6 py-12 text-center" style={{ borderColor: 'var(--color-border-default)' }}>
                <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>Aucune annale disponible</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Les sujets d'examen apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="mt-5 grid gap-2 md:mt-6 md:gap-3">
            {annalesList.map((annale, index) => {
                const locked = Boolean(isItemLocked?.(annale.path, index));

                return (
                    <ContentCard
                        key={annale.path}
                        kind="Annale"
                        title={annale.title}
                        description={annale.description}
                        meta="Sujet + correction"
                        locked={locked}
                        onMouseEnter={() => onItemHover?.(annale.path)}
                        onFocus={() => onItemFocus?.(annale.path)}
                        onClick={() => (locked ? onLockedItemClick?.(annale.path) : onItemClick?.(annale.path))}
                    />
                );
            })}
        </div>
    );
}
