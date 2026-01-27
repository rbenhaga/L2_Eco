/**
 * Module Audio TTS avec synchronisation mot par mot
 * @module features/audio
 */

// Composants
export { AudioPlayer } from './components/AudioPlayer';
export { WordHighlighter } from './components/WordHighlighter';
export { AudioTextReader } from './components/AudioTextReader';

// Hooks
export { useAudioPlayback } from './hooks/useAudioPlayback';
export { useWordSynchronization } from './hooks/useWordSynchronization';
export { useSegmentLoader } from './hooks/useSegmentLoader';

// Utils
export {
  loadManifest,
  loadSegment,
  loadChapterSegments,
  hasAudio,
  listAvailableCourses,
  listCourseChapters,
  getSegmentInfo,
  clearManifestCache,
} from './utils/loadSegment';

// Types
export type {
  WordTimestamp,
  SegmentMetadata,
  AudioPlaybackState,
  AudioPlayerConfig,
  AudioManifest,
  CourseAudio,
  ChapterAudio,
  SegmentInfo,
  AudioMode,
  ExportOptions,
} from './types/audio';
