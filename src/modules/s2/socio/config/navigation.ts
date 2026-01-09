/**
 * Socio Navigation Configuration
 */

import { BookOpen, PenTool, Flame } from 'lucide-react';
import type { NavGroup } from '../../../../features/course';

export const socioNavGroups: NavGroup[] = [
    {
        label: 'Theme 1',
        icon: BookOpen,
        items: [
            { path: '/socio/chapitre1', label: 'Naissance', num: 1 },
            { path: '/socio/chapitre2', label: 'Emergence', num: 2 },
            { path: '/socio/chapitre3', label: 'Durkheim/Weber', num: 3 },
            { path: '/socio/chapitre4', label: 'Chicago', num: 4 },
            { path: '/socio/chapitre5', label: 'Debat FR', num: 5 },
        ],
    },
    {
        label: 'Theme 2',
        icon: BookOpen,
        items: [
            { path: '/socio/chapitre6', label: 'Socio eco', num: 6 },
            { path: '/socio/chapitre7', label: 'Monnaie', num: 7 },
            { path: '/socio/chapitre8', label: 'Consommation', num: 8 },
            { path: '/socio/chapitre9', label: 'Marche', num: 9 },
            { path: '/socio/chapitre10', label: 'Travail', num: 10 },
        ],
    },
    {
        label: 'Revision',
        icon: PenTool,
        items: [
            { path: '/socio/revision-intensive', label: 'Intensif', icon: Flame },
            { path: '/socio/qcm', label: 'QCM' },
            { path: '/socio/methodologie', label: 'Dissertation' },
        ],
    },
];
