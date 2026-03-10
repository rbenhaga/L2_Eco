import { useState } from 'react';
import { PlayCircle, Video, X } from 'lucide-react';

interface VideoPlayerProps {
    title: string;
    badge?: string;
    duration?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isWatched?: boolean;
    compact?: boolean;
    onPlay?: () => void;
    onComplete?: () => void;
}

export function VideoPlayer({
    title,
    badge,
    duration = '5:00',
    videoUrl,
    thumbnailUrl,
    isWatched: _isWatched = false,
    compact = false,
    onPlay,
    onComplete,
}: VideoPlayerProps) {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlay = () => {
        if (!videoUrl) return;
        setShowVideo(true);
        onPlay?.();
    };

    const handleClose = () => {
        setShowVideo(false);
        onComplete?.();
    };

    if (compact) {
        const isAvailable = Boolean(videoUrl);

        return (
            <div className={showVideo ? 'w-full' : 'flex-none'}>
                <button
                    type="button"
                    onClick={showVideo ? handleClose : handlePlay}
                    disabled={!isAvailable}
                    className="inline-flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors"
                    style={{
                        background: showVideo ? 'var(--color-bg-overlay)' : 'var(--color-bg-raised)',
                        borderColor: 'var(--color-border-default)',
                        color: isAvailable ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                        opacity: isAvailable ? 1 : 0.72,
                        cursor: isAvailable ? 'pointer' : 'default',
                    }}
                >
                    <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                            background: isAvailable ? 'var(--color-accent-subtle)' : 'var(--color-bg-overlay)',
                            color: isAvailable ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        }}
                    >
                        {isAvailable ? <PlayCircle className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0">
                        <span className="block text-sm font-semibold">Vidéo</span>
                        <span className="block text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                            {isAvailable ? (showVideo ? 'Masquer le lecteur' : duration) : 'Bientôt disponible'}
                        </span>
                    </span>
                </button>

                {showVideo && videoUrl && (
                    <div
                        className="mt-3 overflow-hidden rounded-[20px] border"
                        style={{
                            background: 'var(--color-card)',
                            borderColor: 'var(--color-border-subtle)',
                        }}
                    >
                        <div
                            className="flex items-center justify-between gap-2 border-b px-4 py-3"
                            style={{ borderColor: 'var(--color-border-subtle)' }}
                        >
                            <div className="min-w-0 flex items-center gap-2">
                                <Video className="h-4 w-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                                <h3 className="truncate text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                    {title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-lg p-2 transition-colors"
                                style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}
                                aria-label="Fermer la vidéo"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="relative aspect-video" style={{ background: 'var(--color-bg-overlay)' }}>
                            <iframe
                                src={videoUrl}
                                className="absolute inset-0 h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border-subtle)',
            }}
        >
            <div className="flex items-center gap-2 px-5 pb-3 pt-4">
                <Video className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {title}
                </h3>
                {badge && (
                    <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                    >
                        {badge}
                    </span>
                )}
            </div>

            <div className="px-5 pb-5">
                {!showVideo ? (
                    <button
                        type="button"
                        onClick={handlePlay}
                        className="group relative aspect-video w-full overflow-hidden rounded-xl"
                        style={{
                            background: thumbnailUrl
                                ? undefined
                                : 'linear-gradient(135deg, var(--color-accent-subtle), var(--color-bg-overlay))',
                        }}
                    >
                        {thumbnailUrl ? (
                            <img src={thumbnailUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)',
                                    backgroundSize: '24px 24px',
                                }}
                            />
                        )}

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                                style={{
                                    background: 'var(--color-accent)',
                                    boxShadow: '0 8px 32px color-mix(in srgb, var(--color-accent) 30%, transparent)',
                                }}
                            >
                                <PlayCircle className="h-8 w-8 text-[var(--color-bg-raised)]" />
                            </div>
                        </div>

                        <div
                            className="absolute bottom-3 right-3 rounded-lg px-2.5 py-1 text-xs font-medium"
                            style={{
                                background: 'color-mix(in srgb, var(--color-text-primary) 70%, transparent)',
                                color: 'var(--color-bg-raised)',
                            }}
                        >
                            {duration}
                        </div>
                    </button>
                ) : (
                    <div
                        className="relative aspect-video w-full overflow-hidden rounded-xl"
                        style={{ background: 'var(--color-bg-overlay)' }}
                    >
                        {videoUrl ? (
                            <>
                                <iframe
                                    src={videoUrl}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="absolute right-3 top-3 z-10 rounded-lg p-2 transition-colors"
                                    style={{ background: 'color-mix(in srgb, var(--color-text-primary) 70%, transparent)' }}
                                    aria-label="Fermer la vidéo"
                                >
                                    <X className="h-4 w-4 text-[var(--color-bg-raised)]" />
                                </button>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    Vidéo bientôt disponible
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
