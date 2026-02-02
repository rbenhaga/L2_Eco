/**
 * ModuleHub Types
 * Centralized type definitions for the module hub system
 */

export interface ModuleChapter {
    id: string;
    number: string;
    title: string;
    description: string;
    path: string;
    hasAudio: boolean;
    hasIntroVideo: boolean;
    isCompleted: boolean;
    isTDCompleted: boolean;
    isNew?: boolean;
    isUpdated?: boolean;
    difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
    estimatedTime?: string;
}

export interface ModuleStats {
    totalChapters: number;
    completedCourses: number;
    completedTDs: number;
    overallProgress: number;
}

export interface RecentUpdate {
    text: string;
    path?: string;
}

export type ContentType = 'cours' | 'td' | 'qcm' | 'annales';

export type ModuleId = 'macro' | 'micro' | 'stats' | 'socio' | 'management';

export interface ModuleHubProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    chapters: ModuleChapter[];
    stats: ModuleStats;
    baseRoute: string;
    moduleId: ModuleId;
    recentUpdate?: RecentUpdate;
    introVideoUrl?: string;
}
