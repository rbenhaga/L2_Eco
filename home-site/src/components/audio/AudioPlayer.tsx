import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2, Headphones } from 'lucide-react';

interface WordBoundary {
    word: string;
    offset: number; // ms
    duration: number; // ms
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
    compact = false
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

    // Fetch word boundaries metadata
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

    // Update current word based on playback time
    useEffect(() => {
        if (!isPlaying || wordBoundaries.length === 0) return;

        const currentMs = currentTime * 1000;
        let newIndex = -1;

        for (let i = 0; i < wordBoundaries.length; i++) {
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
    }, [currentTime, isPlaying, wordBoundaries, currentWordIndex, onWordHighlight]);

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
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                setIsLoading(true);
                audioRef.current.play().then(() => setIsLoading(false));
            }
            setIsPlaying(!isPlaying);
        }
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

    // No audio URL — placeholder
    if (!audioUrl) {
        return (
            <div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border-default)',
                    boxShadow: 'var(--shadow-sm)',
                }}
            >
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-bg-overlay)' }}
                >
                    <Headphones className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Audio bientôt disponible
                </span>
            </div>
        );
    }

    // Compact version
    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
                <button
                    onClick={handlePlay}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-bg-raised)' }}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                    )}
                </button>
                <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
        );
    }

    // Full version — premium card
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border-subtle)',
            }}
        >
            {/* Accent top bar */}
            <div
                className="h-1"
                style={{ background: 'var(--callout-intuition-border)' }}
            />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
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

                {/* Progress bar */}
                <div className="mb-4">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, var(--color-accent) ${progressPercent}%, var(--color-border-default) ${progressPercent}%)`,
                        }}
                    />
                    <div className="flex justify-between mt-1">
                        <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                            {formatTime(currentTime)}
                        </span>
                        <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => skip(-10)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <SkipBack className="h-5 w-5" />
                    </button>

                    <button
                        onClick={handlePlay}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-bg-raised)',
                            boxShadow: '0 4px 16px color-mix(in srgb, var(--color-accent) 25%, transparent)',
                        }}
                    >
                        {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="h-6 w-6" />
                        ) : (
                            <Play className="h-6 w-6 ml-1" />
                        )}
                    </button>

                    <button
                        onClick={() => skip(10)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <SkipForward className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-lg transition-colors ml-2"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
