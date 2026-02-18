/**
 * ChapterProgressWrapper - Wrapper pour tracker automatiquement la progression
 * 
 * Fonctionnalités:
 * - Auto-start tracking on mount
 * - Update time every 10 seconds
 * - Track scroll progress
 * - Show QCM unlock status
 */

import { useRef } from 'react';
import { useChapterProgress } from '../../hooks/useChapterProgress';
import { Lock, CheckCircle2, Clock } from 'lucide-react';

interface ChapterProgressWrapperProps {
    moduleId: string;
    chapterId: string;
    estimatedMinutes?: number;
    children: React.ReactNode;
    onQCMClick?: () => void;
}

export function ChapterProgressWrapper({
    moduleId,
    chapterId,
    estimatedMinutes = 30,
    children,
    onQCMClick,
}: ChapterProgressWrapperProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    const {
        timeSpent,
        scrollProgress,
        isReadComplete,
        isQCMUnlocked,
        isCompleted,
        qcmBestScore,
    } = useChapterProgress({ moduleId, chapterId, estimatedMinutes });

    // Format time spent
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="relative">
            {/* Progress indicator - Fixed top right */}
            <div
                className="fixed top-20 right-6 z-50 p-4 rounded-xl border backdrop-blur-xl"
                style={{
                    background: 'color-mix(in srgb, var(--color-bg-raised) 90%, transparent)',
                    borderColor: 'var(--color-border-default)',
                    boxShadow: 'var(--shadow-md)',
                }}
            >
                <div className="flex flex-col gap-3 min-w-[200px]">
                    {/* Time spent */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                Temps
                            </span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {timeFormatted}
                        </span>
                    </div>

                    {/* Scroll progress */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                Progression
                            </span>
                            <span className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                                {Math.round(scrollProgress)}%
                            </span>
                        </div>
                        <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: 'var(--color-border-default)' }}
                        >
                            <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                    width: `${scrollProgress}%`,
                                    background: 'var(--color-accent)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Reading status */}
                    {isReadComplete && (
                        <div
                            className="flex items-center gap-2 px-2 py-1 rounded"
                            style={{ background: 'var(--color-success-bg)' }}
                        >
                            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                            <span className="text-xs font-medium" style={{ color: 'var(--color-success)' }}>
                                Lecture complète
                            </span>
                        </div>
                    )}

                    {/* QCM button */}
                    <button
                        onClick={onQCMClick}
                        disabled={!isQCMUnlocked}
                        className="w-full px-4 py-2 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: isQCMUnlocked ? 'var(--color-accent)' : 'var(--color-border-default)',
                            color: isQCMUnlocked ? 'var(--color-bg-raised)' : 'var(--color-text-muted)',
                        }}
                    >
                        {isQCMUnlocked ? (
                            <span className="flex items-center justify-center gap-2">
                                {isCompleted ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        QCM validé ({qcmBestScore}%)
                                    </>
                                ) : (
                                    'Faire le QCM'
                                )}
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Lock className="w-4 h-4" />
                                QCM verrouillé
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
}
