import type { ModuleChapter } from '../../../../components/layout/ModuleHub';

const BASE_PATH = '/s4/macro';
const VALIDATION = {
    minimumScore: 50,
} as const;

export const macroModuleMeta = {
    title: 'Macroéconomie',
    description: 'Économie ouverte, équilibre macroéconomique et système financier au S4.',
};

export const chapters: ModuleChapter[] = [
    {
        id: 'macro-s4-ch1',
        number: '01',
        title: "De l'économie fermée à l'économie ouverte",
        description: "Balance des paiements, taux de change et parité de pouvoir d'achat.",
        path: `${BASE_PATH}/chapitre-1`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '60 min',
        objectives: [
            "Lire une balance des paiements sans confondre comptes, soldes et financement externe.",
            'Distinguer taux de change nominal, réel et compétitivité-prix.',
            "Comprendre quand la parité de pouvoir d'achat sert d'ancrage théorique.",
        ],
        validation: VALIDATION,
        qcmId: 'macro-s4-ch1',
        ficheSections: [
            {
                id: 'bp',
                title: 'Balance des paiements',
                summary: "Le chapitre commence par la logique comptable de l'économie ouverte.",
                bullets: [
                    'Compte courant : biens, services, revenus et transferts.',
                    'Compte financier : entrées et sorties de capitaux.',
                    "Un déficit courant n'est pas une erreur comptable : il doit être financé.",
                ],
                formulas: ['Solde global = variation des réserves + ajustements de financement'],
            },
            {
                id: 'change',
                title: 'Taux de change',
                summary: 'Le change mesure un prix relatif entre monnaies.',
                bullets: [
                    'Nominal : prix d’une devise dans une autre.',
                    'Réel : taux nominal corrigé des niveaux de prix.',
                    'Une dépréciation réelle améliore la compétitivité si les volumes réagissent.',
                ],
                formulas: ['TCR = TCN × (P* / P)'],
            },
            {
                id: 'ppa',
                title: 'Parité de pouvoir d’achat',
                bullets: [
                    'PPA absolue : même panier, même prix une fois converti.',
                    'PPA relative : les écarts d’inflation pilotent le change à long terme.',
                    'À court terme, la PPA est un repère imparfait à cause des rigidités et biens non échangeables.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=macro-s4-ch1` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
        resources: [
            {
                id: 'macro-s4-ch1-qcm',
                label: 'Validation',
                title: 'QCM du chapitre 1',
                description: 'Mode pédagogique ou examen, avec validation à partir de 50%.',
                meta: 'Lecture puis validation',
                href: `${BASE_PATH}?tab=qcm&qcm=macro-s4-ch1`,
            },
            {
                id: 'macro-s4-ch1-td',
                label: 'Application',
                title: "TD d'économie ouverte",
                description: 'Sera branché sur le même chapitre dès que le TD sera intégré.',
                meta: 'Bientôt',
                state: 'soon',
            },
            {
                id: 'macro-s4-ch1-annale',
                label: 'Examen',
                title: 'Annales liées au change',
                description: 'Accès futur aux sujets ciblant balance des paiements et change.',
                meta: 'Bientôt',
                state: 'soon',
            },
        ],
    },
    {
        id: 'macro-s4-ch2',
        number: '02',
        title: "L'équilibre macroéconomique en économie ouverte",
        description: 'Modèle Mundell-Fleming (IS-LM-BP) et efficacité des politiques économiques.',
        path: `${BASE_PATH}/chapitre-2`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '75 min',
        objectives: [
            'Poser la logique du triptyque IS-LM-BP en économie ouverte.',
            'Comparer changes fixes et changes flexibles pour la politique économique.',
            'Comprendre le rôle de la mobilité internationale des capitaux.',
        ],
        validation: VALIDATION,
        qcmId: 'macro-s4-ch2',
        ficheSections: [
            {
                id: 'structure',
                title: 'Architecture du modèle',
                bullets: [
                    'IS : équilibre des biens avec demande extérieure.',
                    'LM : équilibre monétaire.',
                    'BP : équilibre externe entre compte courant et capitaux.',
                ],
                formulas: ['Équilibre global : IS ∩ LM ∩ BP'],
            },
            {
                id: 'politiques',
                title: 'Efficacité des politiques',
                bullets: [
                    'Sous changes fixes, la politique budgétaire gagne en force avec forte mobilité des capitaux.',
                    'Sous changes flexibles, la politique monétaire devient centrale.',
                    "L'effet final dépend de l'ajustement du taux de change et des capitaux.",
                ],
            },
            {
                id: 'lecture',
                title: 'Réflexes de lecture',
                bullets: [
                    'Toujours identifier le régime de change avant de conclure.',
                    'Regarder si la BP est horizontale, croissante ou très pentue.',
                    'Relier déplacement des courbes, change et balance extérieure.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=macro-s4-ch2` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
        resources: [
            {
                id: 'macro-s4-ch2-qcm',
                label: 'Validation',
                title: 'QCM Mundell-Fleming',
                description: 'Valider la logique IS-LM-BP avant de passer aux exercices.',
                meta: '50% requis',
                href: `${BASE_PATH}?tab=qcm&qcm=macro-s4-ch2`,
            },
            {
                id: 'macro-s4-ch2-td',
                label: 'Application',
                title: 'TD politique économique',
                description: 'TD lié au chapitre à venir.',
                meta: 'Bientôt',
                state: 'soon',
            },
        ],
    },
    {
        id: 'macro-s4-ch3',
        number: '03',
        title: 'Introduction au système financier et à la monnaie',
        description: 'Structure du système financier, monnaie et intermédiation.',
        path: `${BASE_PATH}/chapitre-3`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
        objectives: ['Chapter en préparation.'],
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
        id: 'macro-s4-ch4',
        number: '04',
        title: "Le temps et les taux d'intérêt",
        description: 'Valeur actuelle, obligations, courbe des taux et Gordon-Shapiro.',
        path: `${BASE_PATH}/chapitre-4`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '65 min',
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
