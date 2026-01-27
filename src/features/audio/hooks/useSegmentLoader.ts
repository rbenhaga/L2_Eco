import { useState, useEffect } from 'react';
import { loadSegment } from '../utils/loadSegment';
import type { SegmentMetadata } from '../types/audio';

interface UseSegmentLoaderOptions {
  /** Charger automatiquement au montage */
  autoLoad?: boolean;
  /** Callback en cas de succès */
  onLoad?: (segment: SegmentMetadata) => void;
  /** Callback en cas d'erreur */
  onError?: (error: Error) => void;
}

/**
 * Hook pour charger les métadonnées d'un segment
 */
export function useSegmentLoader(
  courseId: string,
  chapterId: string,
  segmentIndex: number,
  options: UseSegmentLoaderOptions = {}
) {
  const { autoLoad = true, onLoad, onError } = options;

  const [segment, setSegment] = useState<SegmentMetadata | null>(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadSegment(courseId, chapterId, segmentIndex);

      if (!data) {
        throw new Error('Segment not found');
      }

      setSegment(data);

      if (onLoad) {
        onLoad(data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load segment';
      setError(errorMessage);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      load();
    }
  }, [courseId, chapterId, segmentIndex, autoLoad]);

  const reload = () => {
    load();
  };

  return {
    segment,
    loading,
    error,
    reload,
  };
}
