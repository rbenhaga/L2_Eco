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
        className={`rounded-lg p-8 text-center ${className}`}
        style={{ background: 'var(--color-bg-overlay)' }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>
          Aucun audio disponible pour ce cours
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Selecteur de mode */}
      <div
        className="flex items-center justify-center gap-2 p-2 rounded-lg"
        style={{ background: 'var(--color-bg-overlay)' }}
      >
        <button
          onClick={() => setMode('audio-only')}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all"
          style={mode === 'audio-only'
            ? {
              background: 'var(--color-accent)',
              color: 'var(--color-accent-foreground)',
              boxShadow: 'var(--shadow-md)',
            }
            : {
              background: 'var(--color-bg-raised)',
              color: 'var(--color-text-secondary)',
            }
          }
        >
          <Headphones className="w-4 h-4" />
          <span className="text-sm font-medium">Audio uniquement</span>
        </button>

        <button
          onClick={() => setMode('text-only')}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all"
          style={mode === 'text-only'
            ? {
              background: 'var(--color-accent)',
              color: 'var(--color-accent-foreground)',
              boxShadow: 'var(--shadow-md)',
            }
            : {
              background: 'var(--color-bg-raised)',
              color: 'var(--color-text-secondary)',
            }
          }
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Texte uniquement</span>
        </button>

        <button
          onClick={() => setMode('synchronized')}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all"
          style={mode === 'synchronized'
            ? {
              background: 'var(--color-accent)',
              color: 'var(--color-accent-foreground)',
              boxShadow: 'var(--shadow-md)',
            }
            : {
              background: 'var(--color-bg-raised)',
              color: 'var(--color-text-secondary)',
            }
          }
        >
          <PlayCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Audio + Texte</span>
        </button>
      </div>

      {/* Lecteur audio (si mode audio-only ou synchronized) */}
      {(mode === 'audio-only' || mode === 'synchronized') && (
        <div
          className="sticky top-0 z-10 backdrop-blur-sm pb-4"
          style={{ background: 'color-mix(in srgb, var(--color-bg-raised) 95%, transparent)' }}
        >
          <AudioPlayer segment={segment} config={config} />
        </div>
      )}

      {/* Texte avec surlignage (si mode text-only ou synchronized) */}
      {(mode === 'text-only' || mode === 'synchronized') && (
        <div
          className="rounded-lg p-6"
          style={{
            background: 'var(--color-bg-raised)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-default)',
          }}
        >
          {mode === 'synchronized' && state.isPlaying && (
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="font-medium" style={{ color: 'var(--color-info)' }}>
                En cours de lecture
              </span>
              {state.currentWordIndex !== null && (
                <span style={{ color: 'var(--color-text-secondary)' }}>
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
        <div
          className="rounded-lg p-6 text-center space-y-2"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-info-subtle), var(--color-accent-subtle))',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Mode audio uniquement
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {segment.words.length} mots
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Duree :{' '}
            {Math.round(segment.totalDuration / 1000 / 60)} minutes
          </p>
        </div>
      )}
    </div>
  );
}
