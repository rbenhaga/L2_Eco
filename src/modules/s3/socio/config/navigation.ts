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
            { path: '/s3/socio/chapitre1', label: 'Naissance', num: 1 },
            { path: '/s3/socio/chapitre2', label: 'Emergence', num: 2 },
            { path: '/s3/socio/chapitre3', label: 'Durkheim/Weber', num: 3 },
            { path: '/s3/socio/chapitre4', label: 'Chicago', num: 4 },
            { path: '/s3/socio/chapitre5', label: 'Debat FR', num: 5 },
        ],
    },
    {
        label: 'Theme 2',
        icon: BookOpen,
        items: [
            { path: '/s3/socio/chapitre6', label: 'Socio eco', num: 6 },
            { path: '/s3/socio/chapitre7', label: 'Monnaie', num: 7 },
            { path: '/s3/socio/chapitre8', label: 'Consommation', num: 8 },
            { path: '/s3/socio/chapitre9', label: 'Marche', num: 9 },
            { path: '/s3/socio/chapitre10', label: 'Travail', num: 10 },
        ],
    },
    {
        label: 'Revision',
        icon: PenTool,
        items: [
            { path: '/s3/socio/revision-intensive', label: 'Intensif', icon: Flame },
            { path: '/s3/socio/qcm', label: 'QCM' },
            { path: '/s3/socio/methodologie', label: 'Dissertation' },
        ],
    },
];
