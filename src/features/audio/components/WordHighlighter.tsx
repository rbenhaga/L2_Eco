import { useRef, useCallback } from 'react';
import { useWordSynchronization } from '../hooks/useWordSynchronization';
import type { SegmentMetadata, AudioPlayerConfig } from '../types/audio';

interface WordHighlighterProps {
  segment: SegmentMetadata;
  currentWordIndex: number | null;
  onWordClick?: (wordIndex: number) => void;
  config?: AudioPlayerConfig;
  className?: string;
}

/**
 * Composant pour afficher le texte avec surlignage mot par mot synchronisé
 */
export function WordHighlighter({
  segment,
  currentWordIndex,
  onWordClick,
  config = {},
  className = '',
}: WordHighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cast for useWordSynchronization which expects HTMLElement
  const syncRef = containerRef as React.RefObject<HTMLElement>;

  useWordSynchronization({
    currentWordIndex,
    containerRef: syncRef,
    config,
  });

  const handleWordClick = useCallback(
    (wordIndex: number) => {
      if (onWordClick) {
        onWordClick(wordIndex);
      }
    },
    [onWordClick]
  );

  if (!segment.words.length) {
    return (
      <div
        className={`text-center p-8 text-gray-500 ${className}`}
      >
        <p>Aucun contenu disponible pour ce segment</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`text-lg leading-relaxed select-none ${className}`}
      style={{ userSelect: 'none' }}
    >
      {segment.words.map((word, idx) => {
        const isActive = idx === currentWordIndex;

        return (
          <span
            key={idx}
            data-word-index={idx}
            onClick={() => handleWordClick(idx)}
            className={`
              inline-block cursor-pointer transition-all duration-150
              px-1 py-0.5 rounded mx-0.5 my-0.5
              ${
                isActive
                  ? 'bg-yellow-300 font-semibold scale-110 shadow-sm text-gray-900'
                  : 'hover:bg-gray-100 text-gray-800'
              }
            `}
            style={{
              transformOrigin: 'center',
            }}
          >
            {word.word}
          </span>
        );
      })}
    </div>
  );
}
