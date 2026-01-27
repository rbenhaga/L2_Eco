import { useRef, useState, useEffect, useCallback } from 'react';
import type { AudioPlaybackState, SegmentMetadata } from '../types/audio';

/**
 * Hook personnalisé pour gérer la lecture audio avec synchronisation
 */
export function useAudioPlayback(segment: SegmentMetadata | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<AudioPlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentWordIndex: null,
    volume: 1,
    playbackRate: 1,
    isLoading: false,
    error: null,
  });

  // Initialiser l'audio element
  useEffect(() => {
    if (!segment) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const audio = new Audio(segment.audioUrl);
    audioRef.current = audio;

    // Configuration
    audio.volume = state.volume;
    audio.playbackRate = state.playbackRate;

    // Event listeners
    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration * 1000, // secondes → ms
        isLoading: false,
      }));
    };

    const handleTimeUpdate = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime * 1000, // secondes → ms
      }));
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleEnded = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        currentWordIndex: null,
      }));
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load audio',
      }));
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError as any);

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError as any);
      audio.pause();
      audioRef.current = null;
    };
  }, [segment]);

  // Mettre à jour le volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Mettre à jour la vitesse de lecture
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.playbackRate;
    }
  }, [state.playbackRate]);

  // Calculer l'index du mot actuel
  useEffect(() => {
    if (!segment || !segment.words.length) {
      return;
    }

    const currentTime = state.currentTime;

    // Trouver le mot correspondant au timestamp actuel
    const wordIndex = segment.words.findIndex((word, idx) => {
      const nextWord = segment.words[idx + 1];
      return (
        currentTime >= word.audioOffset &&
        (!nextWord || currentTime < nextWord.audioOffset)
      );
    });

    if (wordIndex !== state.currentWordIndex) {
      setState(prev => ({
        ...prev,
        currentWordIndex: wordIndex === -1 ? null : wordIndex,
      }));
    }
  }, [state.currentTime, segment]);

  // Actions de contrôle
  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((timeMs: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeMs / 1000; // ms → secondes
    }
  }, []);

  const seekToWord = useCallback((wordIndex: number) => {
    if (!segment || wordIndex < 0 || wordIndex >= segment.words.length) {
      return;
    }

    const word = segment.words[wordIndex];
    seek(word.audioOffset);
  }, [segment, seek]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const clampedRate = Math.max(0.5, Math.min(2.0, rate));
    setState(prev => ({ ...prev, playbackRate: clampedRate }));
  }, []);

  const skip = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + seconds;
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(newTime, audioRef.current.duration)
      );
    }
  }, []);

  return {
    state,
    audioRef,
    actions: {
      play,
      pause,
      togglePlay,
      seek,
      seekToWord,
      setVolume,
      setPlaybackRate,
      skip,
    },
  };
}
