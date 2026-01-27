import { BookOpen, PenTool, GraduationCap } from 'lucide-react';
import type { NavGroup } from '../../../../features/course';

export const microNavGroups: NavGroup[] = [
    {
        label: 'Cours',
        icon: BookOpen,
        items: [
            { path: '/s4/micro/chapitre-1', label: 'Chapitre 1', num: 1 },
            { path: '/s4/micro/chapitre-2', label: 'Chapitre 2', num: 2 },
            { path: '/s4/micro/chapitre-3', label: 'Chapitre 3', num: 3 },
            { path: '/s4/micro/chapitre-4', label: 'Chapitre 4', num: 4 },
        ],
    },
    {
        label: 'Pratique',
        icon: PenTool,
        items: [
            { path: '/s4/micro/qcm', label: 'QCM' },
            { path: '/s4/micro/td', label: 'TD' },
        ],
    },
    {
        label: 'Examen',
        icon: GraduationCap,
        items: [
            { path: '/s4/micro/revision', label: 'Révisions' },
        ],
    },
];
