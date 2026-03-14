import type { ModuleChapter } from '../../../../components/layout/ModuleHub';

const BASE_PATH = '/s4/stats';
const VALIDATION = {
    minimumScore: 50,
} as const;

export const statsModuleMeta = {
    title: 'Statistiques',
    description: "Convergences, distributions d'échantillonnage, estimation et tests au S4.",
};

export const chapters: ModuleChapter[] = [
    {
        id: 'stats-ch6',
        number: '06',
        title: 'Tables statistiques: lois continues',
        description: 'Normale, khi-deux, Student et Fisher-Snedecor.',
        path: `${BASE_PATH}/chapitre-6`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '40 min',
        objectives: [
            'Savoir lire correctement les tables usuelles.',
            'Relier les lois continues entre elles par leurs constructions.',
            'Choisir la bonne table selon la statistique et les degrés de liberté.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch6',
        ficheSections: [
            {
                id: 'normale',
                title: 'Loi normale',
                bullets: [
                    'Standardiser avant toute lecture de table.',
                    'La loi normale centrée réduite sert de pivot pour les autres tables.',
                    'Retenir les quantiles usuels 1,96 et 2,576.',
                ],
            },
            {
                id: 'famille',
                title: 'Famille χ², Student, Fisher',
                bullets: [
                    'χ² : somme de carrés de normales centrées réduites.',
                    'Student : normale divisée par une racine de χ² indépendante.',
                    'Fisher : rapport de deux χ² normalisées.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch6` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
        resources: [
            {
                id: 'stats-ch6-qcm',
                label: 'Validation',
                title: 'QCM tables statistiques',
                description: 'Valider les bons réflexes de table avant les tests.',
                meta: '50% requis',
                href: `${BASE_PATH}?tab=qcm&qcm=stats-ch6`,
            },
        ],
    },
    {
        id: 'stats-ch7',
        number: '07',
        title: 'Convergence en loi',
        description: 'Convergences, approximations et théorèmes limites.',
        path: `${BASE_PATH}/chapitre-7`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '40 min',
        objectives: [
            'Distinguer convergence en probabilité, en loi et presque sûre.',
            'Mobiliser Slutsky et les approximations asymptotiques.',
            'Préparer la logique des distributions d’échantillonnage.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch7',
        ficheSections: [
            {
                id: 'types',
                title: 'Types de convergence',
                bullets: [
                    'Convergence en loi : comportement de la distribution.',
                    'Convergence en probabilité : concentration autour de la vraie valeur.',
                    'Les implications ne sont pas symétriques.',
                ],
            },
            {
                id: 'outils',
                title: 'Outils clés',
                bullets: [
                    'Théorème central limite pour la moyenne.',
                    'Théorème de Slutsky pour combiner des convergences.',
                    'Approximation normale comme réflexe de grande taille d’échantillon.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch7` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
    {
        id: 'stats-ch8',
        number: '08',
        title: "Distributions d'échantillonnage",
        description: "Lois de la moyenne, de la variance et des statistiques usuelles d'échantillon.",
        path: `${BASE_PATH}/chapitre-8`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '45 min',
        difficulty: 'intermédiaire',
        objectives: [
            'Associer chaque statistique d’échantillon à sa loi.',
            'Différencier cas σ connu, σ inconnu et comparaison de moyennes.',
            'Préparer les futurs tests et intervalles de confiance.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch8',
        ficheSections: [
            {
                id: 'moyenne',
                title: "Moyenne d'échantillon",
                bullets: [
                    'Si la population est normale, la moyenne d’échantillon est normale.',
                    'Sinon, le TCL justifie une approximation normale pour grand n.',
                    'La variance décroît comme 1/n.',
                ],
            },
            {
                id: 'variance',
                title: "Variance et statistiques dérivées",
                bullets: [
                    "La variance empirique corrigée conduit à une loi du χ² sous normalité.",
                    'Les statistiques centrées-réduites changent selon que σ est connu ou non.',
                    'Les comparaisons de moyennes exigent de bien poser l’hypothèse d’égalité des variances.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch8` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
    {
        id: 'stats-ch9',
        number: '09',
        title: 'Estimation ponctuelle',
        description: 'Estimateurs, biais, convergence, efficacité et exhaustivité.',
        path: `${BASE_PATH}/chapitre-9`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
        difficulty: 'avancé',
        objectives: [
            'Comparer estimateur sans biais, convergent et efficace.',
            'Lire un exercice en identifiant rapidement le paramètre ciblé.',
            'Mobiliser l’EMV et les propriétés théoriques attendues.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch9',
        ficheSections: [
            {
                id: 'qualites',
                title: "Qualités d'un estimateur",
                bullets: [
                    'Sans biais : espérance égale au paramètre.',
                    'Convergent : l’estimateur se rapproche du paramètre quand n augmente.',
                    'Efficace : variance minimale dans une classe donnée.',
                ],
            },
            {
                id: 'emv',
                title: 'Maximum de vraisemblance',
                bullets: [
                    'Écrire la vraisemblance, puis le log pour simplifier.',
                    'Dériver, résoudre et vérifier les conditions.',
                    'Toujours interpréter le résultat économiquement/statistiquement.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch9` },
            { id: 'td', label: 'TD', state: 'available', href: `${BASE_PATH}?tab=td` },
            { id: 'corrige', label: 'Corrigé', state: 'available', href: `${BASE_PATH}/correction-td-3` },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
        resources: [
            {
                id: 'stats-ch9-qcm',
                label: 'Validation',
                title: "QCM estimation ponctuelle",
                description: 'Contrôler immédiatement les notions de biais, convergence et EMV.',
                meta: '50% requis',
                href: `${BASE_PATH}?tab=qcm&qcm=stats-ch9`,
            },
            {
                id: 'stats-ch9-correction',
                label: 'Corrigé',
                title: 'Correction TD 3',
                description: 'Cinq exercices complets pour appliquer les critères de qualité d’un estimateur.',
                meta: '5 exercices',
                href: `${BASE_PATH}/correction-td-3`,
            },
        ],
    },
    {
        id: 'stats-ch10',
        number: '10',
        title: "Tests du khi-deux d'homogénéité, d'indépendance et d'adéquation",
        description: 'Construction du tableau théorique, statistique du test et décision.',
        path: `${BASE_PATH}/chapitre-10`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
        objectives: [
            'Choisir le bon test du χ² selon la question posée.',
            'Calculer les effectifs théoriques sans erreur de structure.',
            'Lire correctement la région de rejet et les degrés de liberté.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch10',
        ficheSections: [
            {
                id: 'chi2',
                title: 'Réflexes χ²',
                bullets: [
                    'Toujours comparer effectifs observés et théoriques.',
                    'Les ddl dépendent de la structure du tableau.',
                    'Le test ne mesure pas une causalité mais une compatibilité statistique.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch10` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
    {
        id: 'stats-ch11',
        number: '11',
        title: 'Estimation par intervalle, tests de signification et de comparaison',
        description: 'Intervalles de confiance, tests unilatéraux/bilatéraux et comparaison.',
        path: `${BASE_PATH}/chapitre-11`,
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
        objectives: [
            'Relier intervalle de confiance et test d’hypothèse.',
            'Choisir le bon quantile selon le risque et la statistique.',
            'Rédiger une conclusion statistique propre et interprétable.',
        ],
        validation: VALIDATION,
        qcmId: 'stats-ch11',
        ficheSections: [
            {
                id: 'ic',
                title: 'Intervalles et tests',
                bullets: [
                    'Un intervalle de confiance donne un encadrement plausible du paramètre.',
                    'Un test formalise H0, H1, la statistique et la règle de rejet.',
                    'Bilatéral ou unilatéral change la zone critique et le quantile.',
                ],
            },
        ],
        steps: [
            { id: 'cours', label: 'Cours', state: 'available' },
            { id: 'fiche', label: 'Fiche', state: 'available' },
            { id: 'qcm', label: 'QCM', state: 'locked', href: `${BASE_PATH}?tab=qcm&qcm=stats-ch11` },
            { id: 'td', label: 'TD', state: 'soon' },
            { id: 'corrige', label: 'Corrigé', state: 'soon' },
            { id: 'annale', label: 'Annale', state: 'soon' },
        ],
    },
];

export function getChapterById(chapterId: string) {
    return chapters.find((chapter) => chapter.id === chapterId);
}
