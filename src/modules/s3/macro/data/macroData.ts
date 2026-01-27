import { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';

// ============================================
// MACRO MODULE - REAL DATA (L2 S3)
// Macroéconomie complète : IS-LM, WS-PS, politique économique
// ============================================

export const macroChapters: ModuleChapter[] = [
    {
        id: 'macro-ch1',
        number: '1',
        title: 'Introduction à la macroéconomie',
        description: 'Les grands agrégats macroéconomiques, le circuit économique et la comptabilité nationale',
        path: '/macro/chapitre-1',
        hasAudio: true,
        hasIntroVideo: true,
        isCompleted: true,
        isTDCompleted: true,
        difficulty: 'débutant',
        estimatedTime: '45 min'
    },
    {
        id: 'macro-ch2',
        number: '2',
        title: 'Le marché des biens et services',
        description: 'Consommation, investissement, dépenses publiques et équilibre du marché des biens',
        path: '/macro/chapitre-2',
        hasAudio: true,
        hasIntroVideo: true,
        isCompleted: true,
        isTDCompleted: true,
        difficulty: 'intermédiaire',
        estimatedTime: '60 min'
    },
    {
        id: 'macro-ch3',
        number: '3',
        title: 'Le marché financier',
        description: 'Demande de monnaie, offre de monnaie et équilibre du marché financier',
        path: '/macro/chapitre-3',
        hasAudio: true,
        hasIntroVideo: false,
        isCompleted: true,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '55 min'
    },
    {
        id: 'macro-ch4',
        number: '4',
        title: 'Le modèle IS-LM',
        description: 'Équilibre simultané sur le marché des biens et le marché financier',
        path: '/macro/chapitre-4',
        hasAudio: true,
        hasIntroVideo: true,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '75 min'
    },
    {
        id: 'macro-ch5',
        number: '5',
        title: 'Le marché du travail',
        description: 'Détermination des salaires, fixation des prix et taux de chômage naturel',
        path: '/macro/chapitre-5',
        hasAudio: true,
        hasIntroVideo: true,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '70 min'
    },
    {
        id: 'macro-ch6',
        number: '6',
        title: 'Le modèle WS-PS',
        description: 'Équation de fixation des salaires (WS) et équation de fixation des prix (PS)',
        path: '/macro/chapitre-6',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '65 min'
    },
    {
        id: 'macro-ch7',
        number: '7',
        title: 'La courbe de Phillips et inflation',
        description: 'Relation inflation-chômage, courbe de Phillips augmentée et anticipations',
        path: '/macro/chapitre-7',
        hasAudio: true,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '60 min'
    },
    {
        id: 'macro-ch8',
        number: '8',
        title: 'Politique monétaire',
        description: 'Instruments, transmission et efficacité de la politique monétaire',
        path: '/macro/chapitre-8',
        hasAudio: true,
        hasIntroVideo: true,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '55 min'
    },
    {
        id: 'macro-ch9',
        number: '9',
        title: 'Politique budgétaire',
        description: 'Multiplicateur budgétaire, déficit public et dette publique',
        path: '/macro/chapitre-9',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'intermédiaire',
        estimatedTime: '50 min'
    },
    {
        id: 'macro-ch10',
        number: '10',
        title: 'Économie ouverte : taux de change',
        description: 'Régimes de change, parité des taux d\'intérêt et balance des paiements',
        path: '/macro/chapitre-10',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '65 min'
    },
    {
        id: 'macro-ch11',
        number: '11',
        title: 'Le modèle IS-LM en économie ouverte',
        description: 'IS-LM-BP, mobilité des capitaux et trilemme de Mundell',
        path: '/macro/chapitre-11',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '70 min'
    },
    {
        id: 'macro-ch12',
        number: '12',
        title: 'Croissance économique',
        description: 'Modèle de Solow, accumulation du capital et croissance à long terme',
        path: '/macro/chapitre-12',
        hasAudio: true,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        difficulty: 'avancé',
        estimatedTime: '75 min'
    }
];

// Calculate statistics from chapter data
export const macroStats: ModuleStats = {
    totalChapters: macroChapters.length,
    completedCourses: macroChapters.filter(ch => ch.isCompleted).length,
    completedTDs: macroChapters.filter(ch => ch.isTDCompleted).length,
    overallProgress: Math.round(
        (macroChapters.filter(ch => ch.isCompleted).length / macroChapters.length) * 100
    )
};
