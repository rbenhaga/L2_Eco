/**
 * ModuleHub Types
 * Centralized type definitions for the module hub system
 */

import type { LearningFicheSection, LearningResourceCard, LearningStep, LearningValidationConfig } from '../../types/learning';

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
    /** Lucide icon component for this chapter */
    icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    /** Accent color for the icon bg/text */
    iconColor?: string;
    objectives?: string[];
    steps?: LearningStep[];
    resources?: LearningResourceCard[];
    ficheSections?: LearningFicheSection[];
    validation?: LearningValidationConfig;
    qcmId?: string;
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
