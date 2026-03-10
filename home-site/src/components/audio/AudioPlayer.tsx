import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Headphones,
    Loader2,
    Pause,
    Play,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
} from 'lucide-react';

interface WordBoundary {
    word: string;
    offset: number;
    duration: number;
}

interface AudioPlayerProps {
    audioUrl?: string;
    segmentId: string;
    onWordHighlight?: (wordIndex: number, word: string) => void;
    onTimeUpdate?: (currentTime: number) => void;
    compact?: boolean;
}

export function AudioPlayer({
    audioUrl,
    segmentId,
    onWordHighlight,
    onTimeUpdate,
    compact = false,
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [wordBoundaries, setWordBoundaries] = useState<WordBoundary[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    useEffect(() => {
        if (!segmentId) return;

        const fetchMetadata = async () => {
            try {
                const res = await fetch(`${API_URL}/api/tts/metadata/${segmentId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data?.wordBoundaries) {
                        setWordBoundaries(data.data.wordBoundaries);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch audio metadata:', error);
            }
        };

        fetchMetadata();
    }, [segmentId, API_URL]);

    useEffect(() => {
        if (!isPlaying || wordBoundaries.length === 0) return;

        const currentMs = currentTime * 1000;
        let newIndex = -1;

        for (let i = 0; i < wordBoundaries.length; i += 1) {
            const wb = wordBoundaries[i];
            if (currentMs >= wb.offset && currentMs < wb.offset + wb.duration) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== currentWordIndex) {
            setCurrentWordIndex(newIndex);
            if (newIndex >= 0 && onWordHighlight) {
                onWordHighlight(newIndex, wordBoundaries[newIndex].word);
            }
        }
    }, [currentTime, currentWordIndex, isPlaying, onWordHighlight, wordBoundaries]);

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            const time = audioRef.current.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
        }
    }, [onTimeUpdate]);

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsLoading(false);
        }
    };

    const handlePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setIsPlaying(false);
            });
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const skip = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!audioUrl) {
        return compact ? (
            <span
                className="inline-flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5"
                style={{
                    background: 'var(--color-bg-raised)',
                    borderColor: 'var(--color-border-default)',
                    color: 'var(--color-text-muted)',
                    opacity: 0.72,
                }}
            >
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: 'var(--color-bg-overlay)' }}
                >
                    <Headphones className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                    <span className="block text-sm font-semibold">Audio</span>
                    <span className="block text-[11px]">Bientôt disponible</span>
                </span>
            </span>
        ) : (
            <div
                className="flex items-center gap-3 rounded-xl border p-4"
                style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border-default)',
                    boxShadow: 'var(--shadow-sm)',
                }}
            >
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: 'var(--color-bg-overlay)' }}
                >
                    <Headphones className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Audio indisponible
                </span>
            </div>
        );
    }

    if (compact) {
        return (
            <div
                className="inline-flex min-h-11 items-center gap-3 rounded-xl border px-2.5 py-2"
                style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-bg-raised)' }}
            >
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    muted={isMuted}
                />
                <button
                    type="button"
                    onClick={handlePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                    aria-label={isPlaying ? 'Mettre en pause l’audio' : 'Lancer l’audio'}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="ml-0.5 h-4 w-4" />
                    )}
                </button>
                <span className="min-w-0">
                    <span className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        Audio
                    </span>
                    <span className="block text-[11px] tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                        {duration > 0 ? `${formatTime(currentTime)} / ${formatTime(duration)}` : 'Chargement...'}
                    </span>
                </span>
            </div>
        );
    }

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border-subtle)',
            }}
        >
            <div className="h-1" style={{ background: 'var(--callout-intuition-border)' }} />

            <div className="p-5">
                <div className="mb-4 flex items-center gap-2">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ background: 'var(--callout-intuition-bg)' }}
                    >
                        <Headphones className="h-4 w-4" style={{ color: 'var(--callout-intuition-text)' }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        Écouter le cours
                    </span>
                </div>

                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    muted={isMuted}
                />

                <div className="mb-4">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
                        style={{
                            background: `linear-gradient(to right, var(--color-accent) ${progressPercent}%, var(--color-border-default) ${progressPercent}%)`,
                        }}
                    />
                    <div className="mt-1 flex justify-between">
                        <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                            {formatTime(currentTime)}
                        </span>
                        <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => skip(-10)}
                        className="rounded-lg p-2 transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <SkipBack className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={handlePlay}
                        className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)',
                            boxShadow: '0 4px 16px color-mix(in srgb, var(--color-accent) 25%, transparent)',
                        }}
                    >
                        {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="h-6 w-6" />
                        ) : (
                            <Play className="ml-1 h-6 w-6" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => skip(10)}
                        className="rounded-lg p-2 transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <SkipForward className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="ml-2 rounded-lg p-2 transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
