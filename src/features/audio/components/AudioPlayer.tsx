import { useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
} from 'lucide-react';
import { useAudioPlayback } from '../hooks/useAudioPlayback';
import type { SegmentMetadata, AudioPlayerConfig } from '../types/audio';

interface AudioPlayerProps {
  segment: SegmentMetadata | null;
  config?: AudioPlayerConfig;
  className?: string;
}

/**
 * Lecteur audio avec controles complets
 */
export function AudioPlayer({
  segment,
  config: _config = {},
  className = '',
}: AudioPlayerProps) {
  void _config; // Will be used for configuration options
  const { state, actions } = useAudioPlayback(segment);
  const progressRef = useRef<HTMLDivElement>(null);

  // Formatage du temps
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Gestion du clic sur la barre de progression
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !state.duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * state.duration;

    actions.seek(newTime);
  };

  // Calcul du pourcentage de progression
  const progressPercentage = state.duration
    ? (state.currentTime / state.duration) * 100
    : 0;

  if (!segment) {
    return (
      <div
        className={`rounded-lg p-4 text-center ${className}`}
        style={{ background: 'var(--color-bg-overlay)' }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>
          Aucun audio disponible pour ce segment
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div
        className={`rounded-lg p-4 text-center ${className}`}
        style={{ background: 'var(--color-error-subtle)' }}
      >
        <p style={{ color: 'var(--color-error)' }}>{state.error}</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{
        background: 'var(--color-bg-raised)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border-default)',
      }}
    >
      {/* Barre de progression */}
      <div
        ref={progressRef}
        className="h-2 cursor-pointer hover:h-3 transition-all relative group"
        style={{ background: 'var(--color-bg-overlay)' }}
        onClick={handleProgressClick}
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${progressPercentage}%`,
            background: 'linear-gradient(to right, var(--color-info), var(--color-accent))',
          }}
        />

        {/* Indicateur de position */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${progressPercentage}%`,
            background: 'var(--color-accent)',
            boxShadow: 'var(--shadow-md)',
          }}
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Info et temps */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {state.currentWordIndex !== null &&
              segment.words[state.currentWordIndex] && (
                <span style={{ color: 'var(--color-info)' }}>
                  Mot {state.currentWordIndex + 1}/{segment.words.length}
                </span>
              )}
          </span>

          <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
            <span>{formatTime(state.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(state.duration)}</span>
          </div>
        </div>

        {/* Controles principaux */}
        <div className="flex items-center justify-center gap-4">
          {/* Reculer de 5 secondes */}
          <button
            onClick={() => actions.skip(-5)}
            className="p-2 rounded-full transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            title="Reculer de 5s"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={actions.togglePlay}
            disabled={state.isLoading}
            className="p-4 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(to right, var(--color-info), var(--color-accent))',
              color: 'var(--color-accent-foreground)',
              boxShadow: 'var(--shadow-lg)',
            }}
            title={state.isPlaying ? 'Pause' : 'Lecture'}
          >
            {state.isLoading ? (
              <div
                className="w-6 h-6 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--color-accent-foreground)', borderTopColor: 'transparent' }}
              />
            ) : state.isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Avancer de 5 secondes */}
          <button
            onClick={() => actions.skip(5)}
            className="p-2 rounded-full transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            title="Avancer de 5s"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Controles secondaires */}
        <div className="flex items-center justify-between">
          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                actions.setVolume(state.volume === 0 ? 1 : 0)
              }
              className="p-1.5 rounded transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              title={state.volume === 0 ? 'Activer le son' : 'Couper le son'}
            >
              {state.volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.volume}
              onChange={(e) => actions.setVolume(Number(e.target.value))}
              className="w-20 h-1 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'var(--color-bg-overlay)' }}
            />
          </div>

          {/* Vitesse de lecture */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
            <select
              value={state.playbackRate}
              onChange={(e) => actions.setPlaybackRate(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2"
              style={{
                background: 'transparent',
                borderColor: 'var(--color-border-default)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="1.75">1.75x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>

        {/* Barre de progression visuelle */}
        {state.isPlaying && state.duration > 0 && (
          <div className="flex items-center gap-2">
            <div
              className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: 'var(--color-bg-overlay)' }}
            >
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(to right, var(--color-info), var(--color-accent))',
                }}
              />
            </div>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
