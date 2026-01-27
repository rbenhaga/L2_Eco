import { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';

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
                className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-md group w-full"
                style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
            >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                    <PlayCircle className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate" style={{ color: 'rgb(var(--text))' }}>{title}</span>
                        {badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0" style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))' }}>{badge}</span>
                        )}
                    </div>
                </div>
                <span className="text-xs shrink-0" style={{ color: 'rgb(var(--text-muted))' }}>{duration}</span>
            </button>
        );
    }

    // Full version (first time / not watched)
    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>{title}</h3>
                {badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))' }}>{badge}</span>
                )}
            </div>

            {!showVideo ? (
                <button
                    onClick={handlePlay}
                    className="relative w-full aspect-video rounded-xl overflow-hidden group"
                    style={{ background: thumbnailUrl ? undefined : 'linear-gradient(135deg, rgb(var(--accent) / 0.1), rgb(var(--accent) / 0.05))' }}
                >
                    {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <>
                            {/* Placeholder pattern */}
                            <div className="absolute inset-0 opacity-30" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(var(--accent) / 0.3) 1px, transparent 0)',
                                backgroundSize: '24px 24px'
                            }} />
                        </>
                    )}

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ background: 'rgb(var(--accent))', boxShadow: '0 8px 32px rgb(var(--accent) / 0.4)' }}>
                            <PlayCircle className="h-8 w-8 text-white fill-white" />
                        </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>
                        {duration}
                    </div>
                </button>
            ) : (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
                    {videoUrl ? (
                        <>
                            <iframe
                                src={videoUrl}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            {/* Close/minimize button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 p-2 rounded-lg transition-colors z-10"
                                style={{ background: 'rgba(0,0,0,0.7)' }}
                            >
                                <X className="h-4 w-4 text-white" />
                            </button>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>Vidéo bientôt disponible</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
