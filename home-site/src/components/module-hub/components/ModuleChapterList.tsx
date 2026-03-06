/**
 * ModuleChapterList - Scholarly Luxe Editorial Design
 */

import { motion } from 'framer-motion';
import { MoveRight, Check, Clock, BookOpen, Lock } from 'lucide-react';

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
    progressPercent?: number;
    isInProgress?: boolean;
}

interface ModuleChapterListProps {
    chapters: ChapterData[];
    activeChapterId?: string;
    onChapterClick: (chapter: ChapterData) => void;
    onLockedChapterClick?: (chapter: ChapterData) => void;
    onChapterHover?: (chapter: ChapterData) => void;
    onChapterFocus?: (chapter: ChapterData) => void;
}

function CompletionBadge({ isCompleted }: { isCompleted: boolean }) {
    if (!isCompleted) return null;

    return (
        <motion.div
            className="flex items-center justify-center w-5 h-5 rounded-full"
            style={{ background: 'var(--color-success-subtle)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            <Check className="w-3 h-3" style={{ color: 'var(--color-success)' }} strokeWidth={3} />
        </motion.div>
    );
}

function CourseStatusBadge({ type }: { type: 'new' | 'soon' }) {
    const isNew = type === 'new';
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
            style={{
                color: isNew ? 'var(--color-error)' : 'var(--color-text-secondary)',
                background: isNew
                    ? 'color-mix(in srgb, var(--color-error) 10%, var(--color-bg-raised))'
                    : 'color-mix(in srgb, var(--color-text-muted) 9%, var(--color-bg-raised))',
                border: isNew
                    ? '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)'
                    : '1px solid var(--color-border-default)',
                boxShadow: isNew
                    ? '0 1px 0 color-mix(in srgb, var(--color-error) 22%, transparent)'
                    : '0 1px 0 color-mix(in srgb, var(--color-text-muted) 18%, transparent)',
            }}
        >
            <span
                className={isNew ? 'inline-block h-1.5 w-1.5 rounded-full animate-pulse' : 'inline-block h-1.5 w-1.5 rounded-full'}
                style={{ background: isNew ? 'var(--color-error)' : 'var(--color-text-muted)' }}
            />
            {isNew ? 'Nouveau' : 'Bientot'}
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
            <div className="text-center py-16">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
                <p className="text-base font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Aucun cours disponible
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Les cours seront ajoutes prochainement
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            {chapters.map((chapter, index) => {
                const isActive = chapter.id === activeChapterId;
                const isNew = chapter.badge === 'new' || chapter.status === 'NEW' || chapter.status.toLowerCase().includes('nouveau');
                const isUpdated = chapter.status === 'UPDATED' || chapter.status.toLowerCase().includes('mis a jour');
                const isCompleted = chapter.isCompleted || chapter.status.toLowerCase().includes('termine');
                const isLocked = Boolean(chapter.isLocked);
                const isSoon = chapter.badge === 'soon' || chapter.status.toLowerCase().includes('bientot');
                const isInProgress = Boolean(chapter.isInProgress) && !isCompleted;
                const chapterProgress = Math.max(0, Math.min(100, Math.floor(chapter.progressPercent ?? 0)));
                const rawDuration = (chapter.duration || '').trim();
                const safeDuration = rawDuration && !/^x+\s*min$/i.test(rawDuration)
                    ? rawDuration
                    : (chapter.estimatedTime || '30 min');
                const mediaLabel = chapter.hasVideo || chapter.hasAudio ? 'Audio/Video - ' : '';

                return (
                    <motion.button
                        key={chapter.id}
                        onClick={() => (isLocked ? onLockedChapterClick?.(chapter) : onChapterClick(chapter))}
                        onMouseEnter={() => onChapterHover?.(chapter)}
                        onFocus={() => onChapterFocus?.(chapter)}
                        className="group w-full text-left relative"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: isInProgress ? 'var(--color-error)' : 'var(--color-accent)' }} />
                        )}

                        <div
                            className="flex items-center gap-5 py-5 px-4 transition-colors duration-200"
                            style={{
                                paddingLeft: isActive ? '20px' : '4px',
                                background: isActive
                                    ? (isInProgress
                                        ? 'color-mix(in srgb, var(--color-error-subtle) 72%, var(--color-bg-raised))'
                                        : 'var(--color-accent-subtle)')
                                    : 'transparent',
                                opacity: isLocked ? 0.85 : 1,
                            }}
                        >
                            <span
                                className="transition-colors duration-200"
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '32px',
                                    fontWeight: 400,
                                    color: isCompleted
                                        ? 'var(--color-success)'
                                        : isActive
                                            ? 'var(--color-text-primary)'
                                            : 'var(--color-text-subtle)',
                                    width: '48px',
                                    flexShrink: 0,
                                    lineHeight: 1,
                                }}
                            >
                                {isCompleted ? <Check className="w-6 h-6" strokeWidth={3} /> : chapter.number}
                            </span>

                            <div className="w-px h-8 shrink-0" style={{ background: 'var(--color-border-default)' }} />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative inline-block">
                                        <h3 className="text-[16px] font-semibold transition-colors duration-200" style={{ color: 'var(--color-text-primary)' }}>
                                            {chapter.title}
                                        </h3>
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                            style={{ background: 'var(--color-accent)' }}
                                        />
                                    </div>

                                    {isNew && <CourseStatusBadge type="new" />}
                                    {isSoon && !isNew && <CourseStatusBadge type="soon" />}
                                    {isUpdated && !isNew && (
                                        <span
                                            className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                            style={{ color: 'var(--color-info)', background: 'var(--color-info-subtle)', borderRadius: '2px' }}
                                        >
                                            Mis a jour
                                        </span>
                                    )}

                                    {isInProgress && (
                                        <span
                                            className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                            style={{
                                                color: 'var(--color-error)',
                                                background: 'var(--color-error-subtle)',
                                                borderRadius: '999px',
                                                border: '1px solid color-mix(in srgb, var(--color-error) 35%, transparent)',
                                            }}
                                        >
                                            Continuer - {chapterProgress}%
                                        </span>
                                    )}

                                    <CompletionBadge isCompleted={isCompleted} />

                                    {isLocked && (
                                        <span
                                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                            style={{ color: 'var(--color-warning)', background: 'var(--color-warning-subtle)', borderRadius: '2px' }}
                                        >
                                            <Lock className="w-3 h-3" />
                                            Premium
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 mt-1.5">
                                    {chapter.description && (
                                        <p className="text-[12px] line-clamp-1" style={{ color: 'var(--color-text-muted)' }}>
                                            {chapter.description}
                                        </p>
                                    )}
                                    {chapter.estimatedTime && (
                                        <span className="flex items-center gap-1 text-[11px] shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                                            <Clock className="w-3 h-3" />
                                            {chapter.estimatedTime}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <span className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                                    {mediaLabel}
                                    {safeDuration}
                                </span>

                                <span
                                    className="w-5 h-5 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    <MoveRight className="w-4 h-4" strokeWidth={2.5} />
                                </span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: 'var(--color-border-subtle)' }} />
                    </motion.button>
                );
            })}
        </div>
    );
}

export type { ChapterData };
