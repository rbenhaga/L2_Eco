/**
 * Micro Navigation Configuration
 */

import { BookOpen, PenTool, GraduationCap } from 'lucide-react';
import type { NavGroup } from '../../../../features/course';

export const microNavGroups: NavGroup[] = [
    {
        label: 'Cours',
        icon: BookOpen,
        items: [
            { path: '/s3/micro/chapitre-0', label: 'Consommateur', num: 0 },
            { path: '/s3/micro/chapitre-1', label: 'Travail-Loisir', num: 1 },
            { path: '/s3/micro/chapitre-2', label: 'Intertemporel', num: 2 },
            { path: '/s3/micro/chapitre-3', label: 'Surplus', num: 3 },
            { path: '/s3/micro/chapitre-4', label: 'Demande', num: 4 },
            { path: '/s3/micro/chapitre-5', label: 'Production', num: 5 },
            { path: '/s3/micro/chapitre-6', label: 'CPP', num: 6 },
            { path: '/s3/micro/chapitre-7', label: 'Monopole', num: 7 },
        ],
    },
    {
        label: 'Pratique',
        icon: PenTool,
        items: [
            { path: '/s3/micro/qcm', label: 'QCM' },
            { path: '/s3/micro/fiches', label: 'Fiches' },
            { path: '/s3/micro/methodes', label: 'Méthodes' },
        ],
    },
    {
        label: 'Examen',
        icon: GraduationCap,
        items: [
            { path: '/s3/micro/fiche-express', label: '⚡ Fiche Express' },
            { path: '/s3/micro/examen-blanc', label: 'Examen Blanc' },
        ],
    },
];
