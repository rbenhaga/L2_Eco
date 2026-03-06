import { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';

// ============================================
// STATS MODULE - REAL DATA (L2 S3)
// Statistiques : probabilités, variables aléatoires, lois usuelles
// ============================================

export const statsChapters: ModuleChapter[] = [
    {
        id: 'stats-ch1',
        number: '1',
        title: 'Algèbre de Boole & Probabilités',
        description: 'Événements, probabilités conditionnelles, théorème de Bayes',
        path: '/s3/stats/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'stats-ch2',
        number: '2',
        title: 'Variables Aléatoires Discrètes',
        description: 'Loi binomiale, Poisson, espérance et variance',
        path: '/s3/stats/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min'
    },
    {
        id: 'stats-ch3',
        number: '3',
        title: 'Variables Aléatoires Continues',
        description: 'Loi normale, exponentielle, fonction de densité',
        path: '/s3/stats/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '50 min'
    },
    {
        id: 'stats-ch4',
        number: '4',
        title: 'Lois Usuelles',
        description: 'Lois classiques et leurs propriétés',
        path: '/s3/stats/chapitre-4',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'stats-ch5',
        number: '5',
        title: 'Variables Aléatoires 2D',
        description: 'Couples de variables aléatoires, covariance et corrélation',
        path: '/s3/stats/chapitre-5',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '55 min'
    }
];

// Calculate statistics from chapter data
export const statsStats: ModuleStats = {
    totalChapters: statsChapters.length,
    completedCourses: statsChapters.filter(ch => ch.isCompleted).length,
    completedTDs: statsChapters.filter(ch => ch.isTDCompleted).length,
    overallProgress: Math.round(
        (statsChapters.filter(ch => ch.isCompleted).length / statsChapters.length) * 100
    )
};
