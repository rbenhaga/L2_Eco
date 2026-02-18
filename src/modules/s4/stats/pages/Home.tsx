import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { BarChart3 } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'stats-ch6',
        number: '06',
        title: 'Tables Statistiques : Lois Continues',
        description: 'Tables et lois continues',
        path: '/s4/stats/chapitre-6',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '40 min',
    },
    {
        id: 'stats-ch7',
        number: '07',
        title: 'Convergence en loi',
        description: 'Convergence et approximations',
        path: '/s4/stats/chapitre-7',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '40 min',
    },
    {
        id: 'stats-ch8',
        number: '08',
        title: 'Distributions d\'echantillonnage',
        description: 'Lois des estimateurs d\'echantillon',
        path: '/s4/stats/chapitre-8',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min',
    },
    {
        id: 'stats-ch9',
        number: '09',
        title: 'Estimation Poncutelle',
        description: 'Estimateurs ponctuels et proprietes',
        path: '/s4/stats/chapitre-9',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '50 min',
    },
    {
        id: 'stats-ch10',
        number: '10',
        title: 'Tests du Xhi^2 d\'homogeneite, d\'independance et d\'adequation',
        description: 'Tests du Chi-deux',
        path: '/s4/stats/chapitre-10',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
    },
    {
        id: 'stats-ch11',
        number: '11',
        title: 'Estimation par intervalle, tests de signification et de comparaison',
        description: 'Intervalles et tests de comparaison',
        path: '/s4/stats/chapitre-11',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
    },
];

const stats: ModuleStats = {
    totalChapters: 6,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function StatsHome() {
    return (
        <ModuleHub
            title="Statistiques"
            description="Cours et TD de statistiques - Semestre 4"
            icon={<BarChart3 className="h-6 w-6" />}
            moduleId="stats"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/stats"
        />
    );
}
