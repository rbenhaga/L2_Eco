import { useState } from 'react';
import { PlayCircle, X, Video } from 'lucide-react';

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
    isWatched = false,
    compact = false,
    onPlay,
    onComplete
}: VideoPlayerProps) {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlay = () => {
        setShowVideo(true);
        onPlay?.();
    };

    const handleClose = () => {
        setShowVideo(false);
        onComplete?.();
    };

    // Compact version (after video has been watched)
    if (compact && isWatched) {
        return (
            <button
                onClick={handlePlay}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group w-full"
                style={{
                    background: 'var(--color-card)',
                    borderColor: 'var(--color-border-default)',
                    boxShadow: 'var(--shadow-sm)',
                }}
            >
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-accent-subtle)' }}
                >
                    <PlayCircle className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{title}</span>
                        {badge && (
                            <span
                                className="px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                                style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                            >
                                {badge}
                            </span>
                        )}
                    </div>
                </div>
                <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>{duration}</span>
            </button>
        );
    }

    // Full version
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border-subtle)',
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-5 pt-4 pb-3">
                <Video className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
                {badge && (
                    <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                    >
                        {badge}
                    </span>
                )}
            </div>

            {/* Video area */}
            <div className="px-5 pb-5">
                {!showVideo ? (
                    <button
                        onClick={handlePlay}
                        className="relative w-full aspect-video rounded-xl overflow-hidden group"
                        style={{
                            background: thumbnailUrl
                                ? undefined
                                : 'linear-gradient(135deg, var(--color-accent-subtle), var(--color-bg-overlay))',
                        }}
                    >
                        {thumbnailUrl ? (
                            <img src={thumbnailUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)`,
                                    backgroundSize: '24px 24px',
                                }}
                            />
                        )}

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                                style={{
                                    background: 'var(--color-accent)',
                                    boxShadow: '0 8px 32px color-mix(in srgb, var(--color-accent) 30%, transparent)',
                                }}
                            >
                                <PlayCircle className="h-8 w-8 text-[var(--color-bg-raised)]" />
                            </div>
                        </div>

                        {/* Duration badge */}
                        <div
                            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ background: 'color-mix(in srgb, var(--color-text-primary) 70%, transparent)', color: 'var(--color-bg-raised)' }}
                        >
                            {duration}
                        </div>
                    </button>
                ) : (
                    <div
                        className="relative w-full aspect-video rounded-xl overflow-hidden"
                        style={{ background: 'var(--color-bg-overlay)' }}
                    >
                        {videoUrl ? (
                            <>
                                <iframe
                                    src={videoUrl}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 p-2 rounded-lg transition-colors z-10"
                                    style={{ background: 'color-mix(in srgb, var(--color-text-primary) 70%, transparent)' }}
                                >
                                    <X className="h-4 w-4 text-[var(--color-bg-raised)]" />
                                </button>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Vidéo bientôt disponible</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
