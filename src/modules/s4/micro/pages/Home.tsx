import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { PieChart } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'micro-ch1',
        number: '01',
        title: 'Chapitre 1',
        description: 'À venir',
        path: '/s4/micro/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'micro-ch2',
        number: '02',
        title: 'Chapitre 2',
        description: 'À venir',
        path: '/s4/micro/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'micro-ch3',
        number: '03',
        title: 'Chapitre 3',
        description: 'À venir',
        path: '/s4/micro/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'micro-ch4',
        number: '04',
        title: 'Chapitre 4',
        description: 'À venir',
        path: '/s4/micro/chapitre-4',
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

export function MicroHome() {
    return (
        <ModuleHub
            title="Microéconomie S4"
            description="Cours et TD de microéconomie - Semestre 4"
            icon={<PieChart className="h-6 w-6" />}
            moduleId="micro"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/micro"
        />
    );
}
