import { Check, Clock3, Headphones, Lock, MoveRight, PlayCircle } from 'lucide-react';

interface ChapterData {
    id: string;
    number: string;
    title: string;
    status: string;
    duration: string;
    iconColor: 'blue' | 'red' | 'purple';
    hasAudio?: boolean;
    hasVideo?: boolean;
    isCompleted?: boolean;
    description?: string;
    estimatedTime?: string;
    isLocked?: boolean;
    badge?: 'new' | 'soon';
    isInProgress?: boolean;
    icon?: unknown;
    accentColor?: string;
    objectives?: string[];
}

interface ModuleChapterListProps {
    chapters: ChapterData[];
    activeChapterId?: string;
    onChapterClick: (chapter: ChapterData) => void;
    onLockedChapterClick?: (chapter: ChapterData) => void;
    onChapterHover?: (chapter: ChapterData) => void;
    onChapterFocus?: (chapter: ChapterData) => void;
}

function normalizeLabel(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function StatusBadge({ label, tone }: { label: string; tone: 'default' | 'accent' | 'success' }) {
    const styles = {
        default: {
            background: 'var(--color-bg-overlay)',
            color: 'var(--color-text-secondary)',
        },
        accent: {
            background: 'var(--color-accent-subtle)',
            color: 'var(--color-accent)',
        },
        success: {
            background: 'var(--color-success-subtle)',
            color: 'var(--color-success)',
        },
    } as const;

    return (
        <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px]"
            style={styles[tone]}
        >
            {label}
        </span>
    );
}

export function ModuleChapterList({
    chapters,
    activeChapterId,
    onChapterClick,
    onLockedChapterClick,
    onChapterHover,
    onChapterFocus,
}: ModuleChapterListProps) {
    if (chapters.length === 0) {
        return (
            <div className="rounded-[24px] border px-6 py-12 text-center" style={{ borderColor: 'var(--color-border-default)' }}>
                <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Aucun cours disponible pour le moment
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Le contenu du module sera ajouté prochainement.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-5 grid gap-2 sm:mt-7 sm:gap-3">
            {chapters.map((chapter) => {
                const isActive = chapter.id === activeChapterId;
                const normalizedStatus = normalizeLabel(chapter.status);
                const isCompleted = Boolean(chapter.isCompleted || normalizedStatus.includes('termine'));
                const isLocked = Boolean(chapter.isLocked);
                const isSoon = chapter.badge === 'soon' || normalizedStatus.includes('bientot');
                const isNew = chapter.badge === 'new' || normalizedStatus.includes('nouveau');
                const isUpdated = normalizedStatus.includes('mis a jour');
                const isInProgress = Boolean(chapter.isInProgress) && !isCompleted;
                const safeDuration = (chapter.duration || chapter.estimatedTime || '30 min').trim();
                const cardBackground = isActive
                    ? 'color-mix(in srgb, var(--color-accent-subtle) 14%, var(--color-bg-raised))'
                    : 'var(--color-bg-raised)';
                const cardBorder = isActive
                    ? 'color-mix(in srgb, var(--color-accent) 24%, var(--color-border-default))'
                    : isInProgress
                        ? 'color-mix(in srgb, var(--color-accent) 14%, var(--color-border-default))'
                        : 'var(--color-border-default)';
                const cardInset = isActive
                    ? 'inset 2px 0 0 var(--color-accent)'
                    : isInProgress
                        ? 'inset 2px 0 0 color-mix(in srgb, var(--color-accent) 36%, transparent)'
                        : 'none';

                return (
                    <button
                        key={chapter.id}
                        type="button"
                        onClick={() => (isLocked ? onLockedChapterClick?.(chapter) : onChapterClick(chapter))}
                        onMouseEnter={() => onChapterHover?.(chapter)}
                        onFocus={() => onChapterFocus?.(chapter)}
                        className="group w-full rounded-2xl border px-2.5 py-2.5 text-left transition-colors duration-200 sm:rounded-[18px] sm:px-4 sm:py-3.5"
                        style={{
                            borderColor: cardBorder,
                            background: cardBackground,
                            boxShadow: cardInset,
                            opacity: isLocked ? 0.76 : 1,
                        }}
                    >
                        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-start gap-2.5 sm:gap-3">
                                    <span
                                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border text-[10px] font-semibold sm:h-9 sm:w-9 sm:rounded-2xl sm:text-[11px]"
                                        style={{
                                            background: isCompleted
                                                ? 'var(--color-success-subtle)'
                                                : isActive
                                                    ? 'color-mix(in srgb, var(--color-accent-subtle) 70%, var(--color-bg-raised))'
                                                    : 'var(--color-bg-overlay)',
                                            color: isCompleted ? 'var(--color-success)' : 'var(--color-text-primary)',
                                            borderColor: isCompleted
                                                ? 'color-mix(in srgb, var(--color-success) 18%, transparent)'
                                                : isActive
                                                    ? 'color-mix(in srgb, var(--color-accent) 18%, transparent)'
                                                    : 'var(--color-border-subtle)',
                                            fontFamily: 'var(--font-display)',
                                        }}
                                    >
                                        {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : chapter.number}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.14em] sm:mb-1 sm:text-[11px] sm:tracking-[0.16em]"
                                            style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
                                        >
                                            Chapitre {chapter.number}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                            <h3 className="text-[14px] font-semibold leading-tight sm:text-base" style={{ color: 'var(--color-text-primary)' }}>
                                                {chapter.title}
                                            </h3>
                                            {isCompleted && <StatusBadge label="Terminé" tone="success" />}
                                            {isInProgress && <StatusBadge label="En cours" tone="accent" />}
                                            {isNew && <StatusBadge label="Nouveau" tone="accent" />}
                                            {isSoon && <StatusBadge label="Bientôt" tone="default" />}
                                            {isUpdated && <StatusBadge label="Mis à jour" tone="default" />}
                                        </div>

                                        {chapter.description && (
                                            <p
                                                className="mt-2 hidden max-w-2xl text-sm sm:block"
                                                style={{
                                                    color: 'var(--color-text-secondary)',
                                                    lineHeight: 1.5,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {chapter.description}
                                            </p>
                                        )}

                                        <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-medium sm:mt-2.5 sm:gap-x-3 sm:gap-y-1.5 sm:text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                {safeDuration}
                                            </span>
                                            {chapter.hasAudio && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Headphones className="h-3.5 w-3.5" />
                                                    Audio
                                                </span>
                                            )}
                                            {chapter.hasVideo && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <PlayCircle className="h-3.5 w-3.5" />
                                                    Cours vidéo
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-1 self-start pt-0.5 sm:gap-2">
                                <span className="hidden text-sm font-medium sm:inline" style={{ color: isLocked ? 'var(--color-text-muted)' : isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                                    {isLocked ? 'Verrouillé' : isInProgress ? 'Continuer' : isCompleted ? 'Relire' : 'Commencer'}
                                </span>
                                <span className="inline-flex h-6 w-6 items-center justify-center sm:h-8 sm:w-8" style={{ color: isLocked ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}>
                                    {isLocked ? <Lock className="h-3.5 w-3.5" /> : <MoveRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />}
                                </span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export type { ChapterData };
