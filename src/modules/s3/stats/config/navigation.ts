/**
 * Stats Navigation Configuration
 */

import { BookOpen, PenTool, GraduationCap, Flame } from 'lucide-react';
import type { NavGroup } from '../../../../features/course';

export const statsNavGroups: NavGroup[] = [
    {
        label: 'Cours',
        icon: BookOpen,
        items: [
            { path: '/s3/stats/chapitre-1', label: 'Probabilités', num: 1 },
            { path: '/s3/stats/chapitre-2', label: 'VA Discrètes', num: 2 },
            { path: '/s3/stats/chapitre-3', label: 'VA Continues', num: 3 },
            { path: '/s3/stats/chapitre-4', label: 'Lois Usuelles', num: 4 },
            { path: '/s3/stats/chapitre-5', label: 'VA 2D', num: 5 },
        ],
    },
    {
        label: 'Pratique',
        icon: PenTool,
        items: [
            { path: '/s3/stats/td', label: 'TD' },
            { path: '/s3/stats/qcm', label: 'QCM' },
            { path: '/s3/stats/revision', label: 'Fiches' },
            { path: '/s3/stats/demonstrations', label: 'Démos' },
        ],
    },
    {
        label: 'Examen',
        icon: GraduationCap,
        items: [
            { path: '/s3/stats/annales', label: 'Annales' },
            { path: '/s3/stats/correction', label: 'Corrigés' },
            { path: '/s3/stats/revision-intensive', label: 'Intensif', icon: Flame },
        ],
    },
];
