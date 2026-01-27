import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { BarChart3 } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'stats-ch1',
        number: '01',
        title: 'Chapitre 1',
        description: 'À venir',
        path: '/s4/stats/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'stats-ch2',
        number: '02',
        title: 'Chapitre 2',
        description: 'À venir',
        path: '/s4/stats/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'stats-ch3',
        number: '03',
        title: 'Chapitre 3',
        description: 'À venir',
        path: '/s4/stats/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'stats-ch4',
        number: '04',
        title: 'Chapitre 4',
        description: 'À venir',
        path: '/s4/stats/chapitre-4',
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

export function StatsHome() {
    return (
        <ModuleHub
            title="Statistiques S4"
            description="Cours et TD de statistiques - Semestre 4"
            icon={<BarChart3 className="h-6 w-6" />}
            moduleId="stats"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/stats"
        />
    );
}
