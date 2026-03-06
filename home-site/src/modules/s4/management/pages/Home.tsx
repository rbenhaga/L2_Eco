import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { Briefcase } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'management-ch1',
        number: '01',
        title: 'Chapitre 1',
        description: 'À venir',
        path: '/s4/management/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'management-ch2',
        number: '02',
        title: 'Chapitre 2',
        description: 'À venir',
        path: '/s4/management/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'management-ch3',
        number: '03',
        title: 'Chapitre 3',
        description: 'À venir',
        path: '/s4/management/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'management-ch4',
        number: '04',
        title: 'Chapitre 4',
        description: 'À venir',
        path: '/s4/management/chapitre-4',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
];

const stats: ModuleStats = {
    totalChapters: 4,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function ManagementHome() {
    return (
        <ModuleHub
            title="Management des organisations"
            description="Cours et TD de management - Semestre 4"
            icon={<Briefcase className="h-6 w-6" />}
            moduleId="management"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/management"
        />
    );
}
