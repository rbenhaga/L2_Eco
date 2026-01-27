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
 * Lecteur audio avec contrôles complets
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
        className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}
      >
        <p className="text-gray-500">
          Aucun audio disponible pour ce segment
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div
        className={`bg-red-50 rounded-lg p-4 text-center ${className}`}
      >
        <p className="text-red-600">{state.error}</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Barre de progression */}
      <div
        ref={progressRef}
        className="h-2 bg-gray-200 cursor-pointer hover:h-3 transition-all relative group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
          style={{ width: `${progressPercentage}%` }}
        />

        {/* Indicateur de position */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progressPercentage}%` }}
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Info et temps */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            {state.currentWordIndex !== null &&
              segment.words[state.currentWordIndex] && (
                <span className="text-blue-600">
                  Mot {state.currentWordIndex + 1}/{segment.words.length}
                </span>
              )}
          </span>

          <div className="flex items-center gap-2 text-gray-600">
            <span>{formatTime(state.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(state.duration)}</span>
          </div>
        </div>

        {/* Contrôles principaux */}
        <div className="flex items-center justify-center gap-4">
          {/* Reculer de 5 secondes */}
          <button
            onClick={() => actions.skip(-5)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Reculer de 5s"
          >
            <SkipBack className="w-5 h-5 text-gray-700" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={actions.togglePlay}
            disabled={state.isLoading}
            className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title={state.isPlaying ? 'Pause' : 'Lecture'}
          >
            {state.isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : state.isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Avancer de 5 secondes */}
          <button
            onClick={() => actions.skip(5)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Avancer de 5s"
          >
            <SkipForward className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Contrôles secondaires */}
        <div className="flex items-center justify-between">
          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                actions.setVolume(state.volume === 0 ? 1 : 0)
              }
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title={state.volume === 0 ? 'Activer le son' : 'Couper le son'}
            >
              {state.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-gray-700" />
              ) : (
                <Volume2 className="w-4 h-4 text-gray-700" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.volume}
              onChange={(e) => actions.setVolume(Number(e.target.value))}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Vitesse de lecture */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <select
              value={state.playbackRate}
              onChange={(e) => actions.setPlaybackRate(Number(e.target.value))}
              className="text-sm bg-transparent border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
