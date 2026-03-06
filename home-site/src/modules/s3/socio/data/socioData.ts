import { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';

// ============================================
// SOCIO MODULE - REAL DATA (L2 S3)
// Sociologie : de Durkheim à Bourdieu, fondements de la sociologie
// ============================================

export const socioChapters: ModuleChapter[] = [
    {
        id: 'socio-ch1',
        number: '1',
        title: 'Introduction à la Sociologie',
        description: 'Fondements et méthodes de la sociologie',
        path: '/s3/socio/chapitre1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'débutant',
        estimatedTime: '30 min'
    },
    {
        id: 'socio-ch2',
        number: '2',
        title: 'Durkheim',
        description: 'Le fait social, solidarité mécanique et organique',
        path: '/s3/socio/chapitre2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'socio-ch3',
        number: '3',
        title: 'Weber',
        description: 'Action sociale, idéaux-types et rationalisation',
        path: '/s3/socio/chapitre3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min'
    },
    {
        id: 'socio-ch4',
        number: '4',
        title: 'Marx',
        description: 'Classes sociales, lutte des classes et aliénation',
        path: '/s3/socio/chapitre4',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'socio-ch5',
        number: '5',
        title: 'Bourdieu',
        description: 'Capital culturel, habitus et reproduction sociale',
        path: '/s3/socio/chapitre5',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '50 min'
    },
    {
        id: 'socio-ch6',
        number: '6',
        title: 'Stratification Sociale',
        description: 'Classes, mobilité sociale et inégalités',
        path: '/s3/socio/chapitre6',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min'
    },
    {
        id: 'socio-ch7',
        number: '7',
        title: 'Socialisation',
        description: 'Socialisation primaire, secondaire et agents de socialisation',
        path: '/s3/socio/chapitre7',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '35 min'
    },
    {
        id: 'socio-ch8',
        number: '8',
        title: 'Déviance & Contrôle Social',
        description: 'Normes, déviance et institutions de contrôle',
        path: '/s3/socio/chapitre8',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'socio-ch9',
        number: '9',
        title: 'Sociologie Économique',
        description: 'Marché, travail et consommation',
        path: '/s3/socio/chapitre9',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '45 min'
    },
    {
        id: 'socio-ch10',
        number: '10',
        title: 'Sociologie Politique',
        description: 'Pouvoir, État et participation politique',
        path: '/s3/socio/chapitre10',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '40 min'
    }
];

// Calculate statistics from chapter data
export const socioStats: ModuleStats = {
    totalChapters: socioChapters.length,
    completedCourses: socioChapters.filter(ch => ch.isCompleted).length,
    completedTDs: socioChapters.filter(ch => ch.isTDCompleted).length,
    overallProgress: Math.round(
        (socioChapters.filter(ch => ch.isCompleted).length / socioChapters.length) * 100
    )
};
