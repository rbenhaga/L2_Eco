export type LearningStepId = 'cours' | 'fiche' | 'qcm' | 'td' | 'corrige' | 'annale';

export type LearningStepState = 'available' | 'current' | 'completed' | 'locked' | 'soon';

export interface LearningStep {
    id: LearningStepId;
    label: string;
    description?: string;
    meta?: string;
    state: LearningStepState;
    href?: string;
}

export interface LearningResourceCard {
    id: string;
    label: string;
    title: string;
    description: string;
    meta?: string;
    href?: string;
    state?: Exclude<LearningStepState, 'current'>;
    ctaLabel?: string;
}

export interface LearningFicheSection {
    id: string;
    title: string;
    summary?: string;
    bullets: string[];
    formulas?: string[];
}

export interface LearningValidationConfig {
    minimumScore: number;
}
