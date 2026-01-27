import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { TrendingUp } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'macro-ch1',
        number: '01',
        title: 'Chapitre 1',
        description: 'À venir',
        path: '/s4/macro/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'macro-ch2',
        number: '02',
        title: 'Chapitre 2',
        description: 'À venir',
        path: '/s4/macro/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'macro-ch3',
        number: '03',
        title: 'Chapitre 3',
        description: 'À venir',
        path: '/s4/macro/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
    },
    {
        id: 'macro-ch4',
        number: '04',
        title: 'Chapitre 4',
        description: 'À venir',
        path: '/s4/macro/chapitre-4',
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

export function MacroHome() {
    return (
        <ModuleHub
            title="Macroéconomie S4"
            description="Cours et TD de macroéconomie - Semestre 4"
            icon={<TrendingUp className="h-6 w-6" />}
            moduleId="macro"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/macro"
        />
    );
}
