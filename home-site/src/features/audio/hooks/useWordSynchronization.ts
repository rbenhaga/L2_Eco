import { useEffect, useRef, useCallback } from 'react';
import type { AudioPlayerConfig } from '../types/audio';

interface UseWordSynchronizationProps {
  currentWordIndex: number | null;
  containerRef: React.RefObject<HTMLElement>;
  config?: AudioPlayerConfig;
}

/**
 * Hook pour gérer le surlignage et le scroll synchronisé des mots
 */
export function useWordSynchronization({
  currentWordIndex,
  containerRef,
  config = {},
}: UseWordSynchronizationProps) {
  const previousWordIndexRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const {
    autoScroll = true,
    scrollDelay = 0,
    scrollBehavior = 'smooth',
  } = config;

  /**
   * Scroll vers le mot actif
   */
  const scrollToWord = useCallback(
    (wordIndex: number) => {
      if (!autoScroll || !containerRef.current) return;

      const wordElement = containerRef.current.querySelector(
        `[data-word-index="${wordIndex}"]`
      ) as HTMLElement;

      if (!wordElement) return;

      // Annuler le scroll précédent si existant
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Délai optionnel avant scroll
      scrollTimeoutRef.current = window.setTimeout(() => {
        wordElement.scrollIntoView({
          behavior: scrollBehavior,
          block: 'center',
          inline: 'nearest',
        });
      }, scrollDelay);
    },
    [autoScroll, containerRef, scrollBehavior, scrollDelay]
  );

  /**
   * Obtenir le mot actuellement actif
   */
  const getActiveWord = useCallback(() => {
    if (currentWordIndex === null || !containerRef.current) return null;

    return containerRef.current.querySelector(
      `[data-word-index="${currentWordIndex}"]`
    ) as HTMLElement | null;
  }, [currentWordIndex, containerRef]);

  /**
   * Highlight du mot actif
   */
  useEffect(() => {
    if (currentWordIndex === null) return;

    // Scroll vers le nouveau mot
    if (currentWordIndex !== previousWordIndexRef.current) {
      scrollToWord(currentWordIndex);
      previousWordIndexRef.current = currentWordIndex;
    }
  }, [currentWordIndex, scrollToWord]);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    getActiveWord,
    scrollToWord,
  };
}
