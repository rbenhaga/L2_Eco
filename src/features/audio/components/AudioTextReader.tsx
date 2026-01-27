import { useState } from 'react';
import { AudioPlayer } from './AudioPlayer';
import { WordHighlighter } from './WordHighlighter';
import { useAudioPlayback } from '../hooks/useAudioPlayback';
import type { SegmentMetadata, AudioPlayerConfig, AudioMode } from '../types/audio';
import { Headphones, BookOpen, PlayCircle } from 'lucide-react';

interface AudioTextReaderProps {
  segment: SegmentMetadata | null;
  config?: AudioPlayerConfig;
  defaultMode?: AudioMode;
  className?: string;
}

/**
 * Composant principal combinant le lecteur audio et le surlignage de texte
 */
export function AudioTextReader({
  segment,
  config = {},
  defaultMode = 'synchronized',
  className = '',
}: AudioTextReaderProps) {
  const [mode, setMode] = useState<AudioMode>(defaultMode);
  const { state, actions } = useAudioPlayback(segment);

  if (!segment) {
    return (
      <div
        className={`bg-gray-50 rounded-lg p-8 text-center ${className}`}
      >
        <p className="text-gray-500">
          Aucun audio disponible pour ce cours
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Sélecteur de mode */}
      <div className="flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-lg">
        <button
          onClick={() => setMode('audio-only')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all
            ${
              mode === 'audio-only'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <Headphones className="w-4 h-4" />
          <span className="text-sm font-medium">Audio uniquement</span>
        </button>

        <button
          onClick={() => setMode('text-only')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all
            ${
              mode === 'text-only'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Texte uniquement</span>
        </button>

        <button
          onClick={() => setMode('synchronized')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all
            ${
              mode === 'synchronized'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <PlayCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Audio + Texte</span>
        </button>
      </div>

      {/* Lecteur audio (si mode audio-only ou synchronized) */}
      {(mode === 'audio-only' || mode === 'synchronized') && (
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm pb-4">
          <AudioPlayer segment={segment} config={config} />
        </div>
      )}

      {/* Texte avec surlignage (si mode text-only ou synchronized) */}
      {(mode === 'text-only' || mode === 'synchronized') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {mode === 'synchronized' && state.isPlaying && (
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-blue-600 font-medium">
                🎧 En cours de lecture
              </span>
              {state.currentWordIndex !== null && (
                <span className="text-gray-600">
                  Progression :{' '}
                  {Math.round(
                    (state.currentWordIndex / segment.words.length) * 100
                  )}
                  %
                </span>
              )}
            </div>
          )}

          <WordHighlighter
            segment={segment}
            currentWordIndex={
              mode === 'synchronized' ? state.currentWordIndex : null
            }
            onWordClick={
              mode === 'synchronized' ? actions.seekToWord : undefined
            }
            config={config}
          />
        </div>
      )}

      {/* Mode audio-only : afficher quelques stats */}
      {mode === 'audio-only' && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Mode audio uniquement
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {segment.words.length} mots
          </p>
          <p className="text-sm text-gray-500">
            Durée :{' '}
            {Math.round(segment.totalDuration / 1000 / 60)} minutes
          </p>
        </div>
      )}
    </div>
  );
}
