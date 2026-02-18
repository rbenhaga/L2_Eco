import { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';

// ============================================
// MICRO MODULE - REAL DATA (L2 S3)
// Microéconomie complète : consommateur, producteur, marchés
// ============================================

export const microChapters: ModuleChapter[] = [
    {
        id: 'micro-ch0',
        number: '0',
        title: 'Introduction à la Microéconomie',
        description: 'Fondamentaux de la microéconomie, concepts de base et méthodologie',
        path: '/s3/micro/chapitre-0',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'débutant',
        estimatedTime: '20 min'
    },
    {
        id: 'micro-ch1',
        number: '1',
        title: 'Arbitrage Travail-Loisir',
        description: 'Choix du consommateur entre travail et loisir, contrainte budgétaire',
        path: '/s3/micro/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '35 min'
    },
    {
        id: 'micro-ch2',
        number: '2',
        title: 'Le Consommateur',
        description: 'Théorie du consommateur, utilité, préférences et contrainte budgétaire',
        path: '/s3/micro/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min'
    },
    {
        id: 'micro-ch3',
        number: '3',
        title: 'Demande & Variations',
        description: 'Courbe de demande, élasticités, effets prix et revenu',
        path: '/s3/micro/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'micro-ch4',
        number: '4',
        title: 'Le Producteur',
        description: 'Théorie de la production, fonction de production, coûts et profit',
        path: '/s3/micro/chapitre-4',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '45 min'
    },
    {
        id: 'micro-ch5',
        number: '5',
        title: 'Offre & Équilibre',
        description: "Courbe d'offre, équilibre de marché et surplus",
        path: '/s3/micro/chapitre-5',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '40 min'
    },
    {
        id: 'micro-ch6',
        number: '6',
        title: 'Concurrence Imparfaite',
        description: 'Monopole, oligopole et concurrence monopolistique',
        path: '/s3/micro/chapitre-6',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '50 min'
    },
    {
        id: 'micro-ch7',
        number: '7',
        title: 'Théorie des Jeux',
        description: 'Équilibre de Nash, stratégies dominantes et applications',
        path: '/s3/micro/chapitre-7',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '45 min'
    }
];

// Calculate statistics from chapter data
export const microStats: ModuleStats = {
    totalChapters: microChapters.length,
    completedCourses: microChapters.filter(ch => ch.isCompleted).length,
    completedTDs: microChapters.filter(ch => ch.isTDCompleted).length,
    overallProgress: Math.round(
        (microChapters.filter(ch => ch.isCompleted).length / microChapters.length) * 100
    )
};
