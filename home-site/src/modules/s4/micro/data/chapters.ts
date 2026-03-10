import type { ModuleChapter } from '../../../../components/layout/ModuleHub';

const BASE_PATH = '/s4/micro';
const VALIDATION = {
    minimumScore: 50,
    minimumReadPercent: 90,
} as const;

export const microModuleMeta = {
    title: 'Microéconomie',
    description: 'Compléments de théorie du consommateur et approfondissements analytiques du S4.',
};

export const chapters: ModuleChapter[] = [
    {
        id: 'micro-s4-ch1',
        number: '01',
        title: 'Théorie du consommateur: compléments',
        description: "Dualité, équations de Slutsky et variations de bien-être.",
        path: `${BASE_PATH}/chapitre-1`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '80 min',
        objectives: [
            'Relier programme primal et programme dual du consommateur.',
            'Maîtriser Roy, Shephard et la logique des demandes hicksiennes.',
            'Comprendre la décomposition de Slutsky et les mesures monétaires de bien-être.',
        ],
        validation: VALIDATION,
        qcmId: 'micro-s4-ch1',
        ficheSections: [
            {
                id: 'dualite',
                title: 'Dualité',
                bullets: [
                    'Programme primal : maximiser l’utilité sous contrainte budgétaire.',
                    'Programme dual : minimiser la dépense pour un niveau d’utilité donné.',
                    'Marshalliennes et hicksiennes décrivent le même comportement sous deux angles.',
                ],
                formulas: ['x_i(p,R)=h_i(p,v(p,R))', 'h_i(p,u)=x_i(p,e(p,u))'],
            },
            {
                id: 'slutsky',
                title: 'Équation de Slutsky',
                bullets: [
                    'Effet total = effet substitution + effet revenu.',
                    'Le signe de l’effet revenu dépend de la nature du bien.',
                    'La matrice de substitution est symétrique et semi-définie négative.',
                ],
                formulas: ['∂x_i/∂p_j = ∂h_i/∂p_j - (∂x_i/∂R) x_j'],
            },
            {
                id: 'bienetre',
                title: 'Bien-être',
                bullets: [
                    'VE et VC donnent une mesure monétaire rigoureuse des variations de bien-être.',
                    'Le surplus du consommateur est un raccourci utile mais pas toujours exact.',
                    'Toujours préciser l’hypothèse de quasi-linéarité ou d’utilité marginale du revenu constante.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=micro-s4-ch1` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
        resources: [
            {
                id: 'micro-s4-ch1-qcm',
                label: 'Validation',
                title: 'QCM théorie du consommateur',
                description: 'Vérification immédiate des équivalences primal/dual et de Slutsky.',
                meta: '50% requis',
                href: `${BASE_PATH}?tab=qcm&qcm=micro-s4-ch1`,
            },
            {
                id: 'micro-s4-ch1-td',
                label: 'Application',
                title: 'TD associé au chapitre',
                description: 'Branché ultérieurement sur le même parcours.',
                meta: 'Bientôt',
                state: 'soon',
            },
        ],
    },
    {
        id: 'micro-s4-ch2',
        number: '02',
        title: 'Chapitre 2',
        description: 'À venir',
        path: `${BASE_PATH}/chapitre-2`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '55 min',
        objectives: ['Chapitre en préparation.'],
        validation: VALIDATION,
        steps: [
            { id: 'cours', label: 'Cours', state: 'soon' },
            { id: 'fiche', label: 'Fiche', state: 'soon' },
            { id: 'qcm', label: 'QCM', state: 'soon' },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
    {
        id: 'micro-s4-ch3',
        number: '03',
        title: 'Chapitre 3',
        description: 'À venir',
        path: `${BASE_PATH}/chapitre-3`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '55 min',
        objectives: ['Chapitre en préparation.'],
        validation: VALIDATION,
        steps: [
            { id: 'cours', label: 'Cours', state: 'soon' },
            { id: 'fiche', label: 'Fiche', state: 'soon' },
            { id: 'qcm', label: 'QCM', state: 'soon' },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
    {
        id: 'micro-s4-ch4',
        number: '04',
        title: 'Chapitre 4',
        description: 'À venir',
        path: `${BASE_PATH}/chapitre-4`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '55 min',
        objectives: ['Chapitre en préparation.'],
        validation: VALIDATION,
        steps: [
            { id: 'cours', label: 'Cours', state: 'soon' },
            { id: 'fiche', label: 'Fiche', state: 'soon' },
            { id: 'qcm', label: 'QCM', state: 'soon' },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
];

export function getChapterById(chapterId: string) {
    return chapters.find((chapter) => chapter.id === chapterId);
}
