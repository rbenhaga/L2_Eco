/**
 * Types pour le système TTS avec word boundaries
 */

/**
 * Représente un mot avec ses métadonnées de synchronisation
 */
export interface WordTimestamp {
  /** Le mot prononcé */
  word: string;
  /** Timestamp audio en millisecondes depuis le début */
  audioOffset: number;
  /** Position du mot dans le texte (offset en caractères) */
  textOffset: number;
  /** Durée de prononciation du mot en millisecondes */
  duration: number;
  /** Longueur du mot en caractères */
  wordLength: number;
}

/**
 * Métadonnées complètes d'un segment audio
 */
export interface SegmentMetadata {
  /** Identifiant unique du segment */
  segmentId: string;
  /** Texte complet du segment */
  text: string;
  /** Hash SHA-256 du texte (pour cache) */
  textHash: string;
  /** URL du fichier audio MP3 */
  audioUrl: string;
  /** Timestamps mot par mot */
  words: WordTimestamp[];
  /** Durée totale de l'audio en millisecondes */
  totalDuration: number;
  /** Nombre de caractères du segment */
  charactersUsed: number;
  /** ISO timestamp de génération */
  generatedAt: string;
}

/**
 * État de lecture audio
 */
export interface AudioPlaybackState {
  /** L'audio est-il en cours de lecture ? */
  isPlaying: boolean;
  /** Temps actuel de lecture en millisecondes */
  currentTime: number;
  /** Durée totale en millisecondes */
  duration: number;
  /** Index du mot actuellement lu */
  currentWordIndex: number | null;
  /** Volume (0-1) */
  volume: number;
  /** Vitesse de lecture (0.5-2.0) */
  playbackRate: number;
  /** Chargement en cours */
  isLoading: boolean;
  /** Erreur éventuelle */
  error: string | null;
}

/**
 * Configuration du lecteur audio
 */
export interface AudioPlayerConfig {
  /** Activer l'auto-scroll vers le mot actif */
  autoScroll?: boolean;
  /** Activer le surlignage mot par mot */
  wordHighlight?: boolean;
  /** Activer le surlignage de phrase */
  sentenceHighlight?: boolean;
  /** Délai de scroll en ms */
  scrollDelay?: number;
  /** Comportement de scroll */
  scrollBehavior?: ScrollBehavior;
  /** Précharger les segments adjacents */
  preloadAdjacent?: boolean;
}

/**
 * Manifest global des cours audio disponibles
 */
export interface AudioManifest {
  /** Timestamp de génération */
  generatedAt: string;
  /** Nombre total de segments */
  totalSegments: number;
  /** Nombre total de caractères */
  totalCharacters: number;
  /** Cours disponibles */
  courses: Record<string, CourseAudio>;
}

/**
 * Audio disponible pour un cours
 */
export interface CourseAudio {
  /** Chapitres du cours */
  [chapterId: string]: ChapterAudio;
}

/**
 * Audio disponible pour un chapitre
 */
export interface ChapterAudio {
  /** Segments du chapitre */
  segments: SegmentInfo[];
}

/**
 * Informations sur un segment
 */
export interface SegmentInfo {
  /** Identifiant du segment */
  segmentId: string;
  /** URL du fichier audio */
  audioUrl: string;
  /** URL des métadonnées JSON */
  metadataUrl: string;
  /** Nombre de caractères */
  charactersUsed: number;
  /** Timestamp de génération */
  generatedAt: string;
}

/**
 * Mode de lecture
 */
export type AudioMode = 'audio-only' | 'text-only' | 'synchronized';

/**
 * Options d'export
 */
export interface ExportOptions {
  /** Format d'export */
  format: 'json' | 'csv' | 'srt';
  /** Inclure les timestamps */
  includeTimestamps?: boolean;
  /** Inclure le texte */
  includeText?: boolean;
}
