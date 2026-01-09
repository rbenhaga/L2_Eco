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
            { path: '/stats/chapitre-1', label: 'Probabilités', num: 1 },
            { path: '/stats/chapitre-2', label: 'VA Discrètes', num: 2 },
            { path: '/stats/chapitre-3', label: 'VA Continues', num: 3 },
            { path: '/stats/chapitre-4', label: 'Lois Usuelles', num: 4 },
            { path: '/stats/chapitre-5', label: 'VA 2D', num: 5 },
        ],
    },
    {
        label: 'Pratique',
        icon: PenTool,
        items: [
            { path: '/stats/td', label: 'TD' },
            { path: '/stats/qcm', label: 'QCM' },
            { path: '/stats/revision', label: 'Fiches' },
            { path: '/stats/demonstrations', label: 'Démos' },
        ],
    },
    {
        label: 'Examen',
        icon: GraduationCap,
        items: [
            { path: '/stats/annales', label: 'Annales' },
            { path: '/stats/correction', label: 'Corrigés' },
            { path: '/stats/revision-intensive', label: 'Intensif', icon: Flame },
        ],
    },
];
