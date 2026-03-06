import type { SegmentMetadata, AudioManifest, SegmentInfo } from '../types/audio';

/**
 * Cache en mémoire pour le manifest
 */
let manifestCache: AudioManifest | null = null;

/**
 * Charge et cache le manifest global
 */
export async function loadManifest(): Promise<AudioManifest> {
  if (manifestCache) {
    return manifestCache;
  }

  const response = await fetch('/audio/generated/manifest.json');

  if (!response.ok) {
    throw new Error(`Failed to load manifest: ${response.statusText}`);
  }

  manifestCache = await response.json();
  return manifestCache!;
}

/**
 * Charge les métadonnées d'un segment spécifique
 */
export async function loadSegment(
  courseId: string,
  chapterId: string,
  segmentIndex: number
): Promise<SegmentMetadata | null> {
  try {
    const manifest = await loadManifest();

    const chapter = manifest.courses[courseId]?.[chapterId];

    if (!chapter) {
      console.warn(`Chapter not found: ${courseId}/${chapterId}`);
      return null;
    }

    const segmentInfo = chapter.segments[segmentIndex];

    if (!segmentInfo) {
      console.warn(
        `Segment ${segmentIndex} not found in ${courseId}/${chapterId}`
      );
      return null;
    }

    const response = await fetch(segmentInfo.metadataUrl);

    if (!response.ok) {
      throw new Error(`Failed to load segment: ${response.statusText}`);
    }

    const metadata: SegmentMetadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error loading segment:', error);
    return null;
  }
}

/**
 * Charge tous les segments d'un chapitre
 */
export async function loadChapterSegments(
  courseId: string,
  chapterId: string
): Promise<SegmentMetadata[]> {
  try {
    const manifest = await loadManifest();

    const chapter = manifest.courses[courseId]?.[chapterId];

    if (!chapter) {
      return [];
    }

    const segments = await Promise.all(
      chapter.segments.map(async (segmentInfo: SegmentInfo) => {
        const response = await fetch(segmentInfo.metadataUrl);
        return response.json();
      })
    );

    return segments;
  } catch (error) {
    console.error('Error loading chapter segments:', error);
    return [];
  }
}

/**
 * Vérifie si un cours/chapitre a de l'audio disponible
 */
export async function hasAudio(
  courseId: string,
  chapterId?: string
): Promise<boolean> {
  try {
    const manifest = await loadManifest();

    if (chapterId) {
      return !!manifest.courses[courseId]?.[chapterId];
    }

    return !!manifest.courses[courseId];
  } catch {
    return false;
  }
}

/**
 * Liste tous les cours disponibles
 */
export async function listAvailableCourses(): Promise<string[]> {
  try {
    const manifest = await loadManifest();
    return Object.keys(manifest.courses);
  } catch {
    return [];
  }
}

/**
 * Liste tous les chapitres d'un cours
 */
export async function listCourseChapters(
  courseId: string
): Promise<string[]> {
  try {
    const manifest = await loadManifest();
    const course = manifest.courses[courseId];

    if (!course) {
      return [];
    }

    return Object.keys(course);
  } catch {
    return [];
  }
}

/**
 * Récupère les infos d'un segment sans charger les métadonnées complètes
 */
export async function getSegmentInfo(
  courseId: string,
  chapterId: string,
  segmentIndex: number
): Promise<SegmentInfo | null> {
  try {
    const manifest = await loadManifest();

    const chapter = manifest.courses[courseId]?.[chapterId];

    if (!chapter) {
      return null;
    }

    return chapter.segments[segmentIndex] || null;
  } catch {
    return null;
  }
}

/**
 * Clear le cache du manifest (utile pour dev/testing)
 */
export function clearManifestCache(): void {
  manifestCache = null;
}
