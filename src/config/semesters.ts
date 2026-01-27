/**
 * Semester Configuration
 * Centralized configuration for all semesters and their subjects
 */

import { TrendingUp, PieChart, BarChart3, Users, Calculator, Briefcase } from 'lucide-react';
import type { ComponentType } from 'react';

export interface SubjectConfig {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: ComponentType<{ size?: number; className?: string }>;
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
        color: { primary: '#3b82f6', light: '#dbeafe', dark: '#1e40af' },
        available: true,
    },
    micro: {
        id: 'micro',
        name: 'Microéconomie',
        shortName: 'Micro',
        description: 'Théorie du consommateur, du producteur et équilibre',
        icon: PieChart,
        color: { primary: '#ec4899', light: '#fce7f3', dark: '#9d174d' },
        available: true,
    },
    stats: {
        id: 'stats',
        name: 'Statistiques',
        shortName: 'Stats',
        description: 'Probabilités, variables aléatoires et lois usuelles',
        icon: BarChart3,
        color: { primary: '#10b981', light: '#d1fae5', dark: '#065f46' },
        available: true,
    },
    socio: {
        id: 'socio',
        name: 'Sociologie',
        shortName: 'Socio',
        description: 'Concepts fondamentaux et théories sociologiques',
        icon: Users,
        color: { primary: '#f59e0b', light: '#fef3c7', dark: '#92400e' },
        available: true,
    },
    maths: {
        id: 'maths',
        name: 'Mathématiques',
        shortName: 'Maths',
        description: 'Analyse, algèbre linéaire et optimisation',
        icon: Calculator,
        color: { primary: '#6366f1', light: '#e0e7ff', dark: '#3730a3' },
        available: false,
    },
    management: {
        id: 'management',
        name: 'Management des organisations',
        shortName: 'Management',
        description: 'Théories et pratiques du management',
        icon: Briefcase,
        color: { primary: '#8b5cf6', light: '#ede9fe', dark: '#5b21b6' },
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
