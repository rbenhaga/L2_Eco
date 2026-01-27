/**
 * Macro Navigation Configuration
 * Defines nav groups for the Macroéconomie subject
 */

import { BookOpen, PenTool, Gamepad2 } from 'lucide-react';
import type { NavGroup } from '../../../../features/course';

export const macroNavGroups: NavGroup[] = [
    {
        label: 'Cours',
        icon: BookOpen,
        items: [
            { path: '/s3/macro/chapitre-1', label: 'IS-LM', num: 1 },
            { path: '/s3/macro/chapitre-2', label: 'WS-PS', num: 2 },
            { path: '/s3/macro/chapitre-3', label: 'AS-AD', num: 3 },
            { path: '/s3/macro/chapitre-4', label: 'Phillips', num: 4 },
        ],
    },
    {
        label: 'Pratique',
        icon: PenTool,
        items: [
            { path: '/s3/macro/exercices', label: 'Exercices' },
            { path: '/s3/macro/qcm', label: 'QCM' },
            { path: '/s3/macro/revision', label: 'Synthèse' },
            { path: '/s3/macro/simulations', label: 'Simulations', icon: Gamepad2 },
        ],
    },
];
