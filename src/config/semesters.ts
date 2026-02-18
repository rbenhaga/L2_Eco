/**
 * Semester Configuration
 * Centralized configuration for all semesters and their subjects
 */

import { TrendingUp, PieChart, BarChart3, Users, Calculator, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SubjectConfig {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: LucideIcon;
    color: {
        primary: string;
        light: string;
        dark: string;
    };
    available: boolean;
    basePath: string;
}

export interface SemesterConfig {
    id: string;
    name: string;
    shortName: string;
    subtitle: string;
    year: string;
    subjects: SubjectConfig[];
}

// Subject definitions
const subjectDefinitions: Record<string, Omit<SubjectConfig, 'basePath'>> = {
    macro: {
        id: 'macro',
        name: 'Macroéconomie',
        shortName: 'Macro',
        description: 'Modèles IS-LM, WS-PS, AS-AD et politiques économiques',
        icon: TrendingUp,
        color: { primary: 'var(--color-info)', light: 'var(--color-info-subtle)', dark: 'var(--color-info)' },
        available: true,
    },
    micro: {
        id: 'micro',
        name: 'Microéconomie',
        shortName: 'Micro',
        description: 'Théorie du consommateur, du producteur et équilibre',
        icon: PieChart,
        color: { primary: 'var(--color-socio)', light: 'var(--color-socio-subtle)', dark: 'var(--color-socio)' },
        available: true,
    },
    stats: {
        id: 'stats',
        name: 'Statistiques',
        shortName: 'Stats',
        description: 'Probabilités, variables aléatoires et lois usuelles',
        icon: BarChart3,
        color: { primary: 'var(--color-success)', light: 'var(--color-success-subtle)', dark: 'var(--color-success)' },
        available: true,
    },
    socio: {
        id: 'socio',
        name: 'Sociologie',
        shortName: 'Socio',
        description: 'Concepts fondamentaux et théories sociologiques',
        icon: Users,
        color: { primary: 'var(--color-warning)', light: 'var(--color-warning-subtle)', dark: 'var(--color-warning)' },
        available: true,
    },
    maths: {
        id: 'maths',
        name: 'Mathématiques',
        shortName: 'Maths',
        description: 'Analyse, algèbre linéaire et optimisation',
        icon: Calculator,
        color: { primary: 'var(--color-accent)', light: 'var(--color-info-subtle)', dark: 'var(--color-accent)' },
        available: false,
    },
    management: {
        id: 'management',
        name: 'Management des organisations',
        shortName: 'Management',
        description: 'Théories et pratiques du management',
        icon: Briefcase,
        color: { primary: 'var(--color-micro)', light: 'var(--color-micro-subtle)', dark: 'var(--color-micro)' },
        available: true,
    },
};

// Helper to create subject config with base path
function createSubject(id: string, semesterId: string): SubjectConfig {
    const def = subjectDefinitions[id];
    if (!def) throw new Error(`Unknown subject: ${id}`);
    return {
        ...def,
        basePath: `/${semesterId}/${id}`,
    };
}

// Semester configurations
export const semesters: Record<string, SemesterConfig> = {
    s3: {
        id: 's3',
        name: 'Semestre 3',
        shortName: 'S3',
        subtitle: 'L2 Économie · Partiel 2024-2025',
        year: '2024-2025',
        subjects: [
            createSubject('macro', 's3'),
            createSubject('micro', 's3'),
            createSubject('stats', 's3'),
            createSubject('socio', 's3'),
        ],
    },
    s4: {
        id: 's4',
        name: 'Semestre 4',
        shortName: 'S4',
        subtitle: 'L2 Économie · 2025-2026',
        year: '2025-2026',
        subjects: [
            createSubject('macro', 's4'),
            createSubject('micro', 's4'),
            createSubject('stats', 's4'),
            createSubject('management', 's4'),
        ],
    },
};

// Export default semester (current)
export const currentSemester = semesters.s3;

// Get all available semesters
export function getAvailableSemesters(): SemesterConfig[] {
    return Object.values(semesters).filter(s => s.subjects.length > 0);
}

// Get semester by ID
export function getSemester(id: string): SemesterConfig | undefined {
    return semesters[id];
}

// Get subject by ID within a semester
export function getSubject(semesterId: string, subjectId: string): SubjectConfig | undefined {
    const semester = semesters[semesterId];
    return semester?.subjects.find(s => s.id === subjectId);
}
