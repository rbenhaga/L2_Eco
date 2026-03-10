import type { QCMConfig } from '../../../features/qcm';

function toQCMList(config: QCMConfig) {
    return config.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        subtitle: chapter.subtitle,
        count: chapter.questions.length,
    }));
}

export const macroS4QCMConfig: QCMConfig = {
    subject: 'Macroéconomie',
    subjectId: 'macro',
    description: 'Validation des chapitres de macroéconomie du semestre 4.',
    validationScore: 50,
    chapters: [
        {
            id: 'macro-s4-ch1',
            title: "Chapitre 1",
            subtitle: "Économie ouverte, balance des paiements et change",
            color: 'var(--color-info)',
            questions: [
                {
                    id: 'macro-s4-ch1-q1',
                    question: "Un déficit du compte courant signifie principalement que :",
                    options: [
                        "l'économie doit être financée par des entrées nettes de capitaux",
                        'la balance des paiements est nécessairement fausse',
                        "la banque centrale doit toujours dévaluer immédiatement",
                        "les exportations sont forcément nulles",
                    ],
                    correctIndex: 0,
                    explanation: "Un déficit courant doit être compensé par un financement externe, généralement via le compte financier.",
                    difficulty: 'easy',
                },
                {
                    id: 'macro-s4-ch1-q2',
                    question: 'Le taux de change réel se lit comme :',
                    options: [
                        'le taux de change nominal corrigé des niveaux de prix',
                        "le seul prix d'une devise sur le marché",
                        "le taux d'intérêt domestique converti en monnaie étrangère",
                        'le niveau général des prix domestiques',
                    ],
                    correctIndex: 0,
                    explanation: "Le taux de change réel corrige le change nominal par les prix domestiques et étrangers pour mesurer la compétitivité.",
                    difficulty: 'easy',
                },
                {
                    id: 'macro-s4-ch1-q3',
                    question: "La parité de pouvoir d'achat relative affirme surtout qu'à long terme :",
                    options: [
                        "les différentiels d'inflation influencent l'évolution du change nominal",
                        'les balances commerciales sont toujours équilibrées',
                        'les capitaux cessent de circuler',
                        'les taux de change réels restent toujours fixes à court terme',
                    ],
                    correctIndex: 0,
                    explanation: "La PPA relative relie les écarts d'inflation aux mouvements du taux de change sur longue période.",
                    difficulty: 'medium',
                },
                {
                    id: 'macro-s4-ch1-q4',
                    question: "Une dépréciation réelle améliore la compétitivité-prix si :",
                    options: [
                        'les volumes réagissent suffisamment aux prix relatifs',
                        'les importations sont interdites',
                        'les prix étrangers deviennent identiques aux prix domestiques',
                        'le compte financier disparaît',
                    ],
                    correctIndex: 0,
                    explanation: "La compétitivité s'améliore seulement si la demande réagit effectivement à la variation des prix relatifs.",
                    difficulty: 'medium',
                },
            ],
        },
        {
            id: 'macro-s4-ch2',
            title: "Chapitre 2",
            subtitle: 'IS-LM-BP, changes fixes et changes flexibles',
            color: 'var(--color-info)',
            questions: [
                {
                    id: 'macro-s4-ch2-q1',
                    question: 'Sous changes flexibles et forte mobilité des capitaux, la politique la plus puissante est généralement :',
                    options: [
                        'la politique monétaire',
                        'la politique budgétaire',
                        "la politique de blocage des salaires",
                        "la suppression du compte financier",
                    ],
                    correctIndex: 0,
                    explanation: "Avec changes flexibles, la politique monétaire agit via le taux d'intérêt puis le taux de change.",
                    difficulty: 'medium',
                },
                {
                    id: 'macro-s4-ch2-q2',
                    question: 'Sous changes fixes avec forte mobilité des capitaux, la politique budgétaire est renforcée car :',
                    options: [
                        "la banque centrale doit défendre la parité et accompagne l'ajustement monétaire",
                        'la courbe LM disparaît',
                        'le taux de change devient réel',
                        'la balance des paiements ne compte plus',
                    ],
                    correctIndex: 0,
                    explanation: "Le maintien de la parité force la banque centrale à ajuster la monnaie, ce qui amplifie souvent la relance budgétaire.",
                    difficulty: 'medium',
                },
                {
                    id: 'macro-s4-ch2-q3',
                    question: 'Avant de conclure sur un exercice Mundell-Fleming, le premier réflexe est de repérer :',
                    options: [
                        'le régime de change et la mobilité des capitaux',
                        'le seul niveau des prix domestiques',
                        "le nombre d'agents représentatifs",
                        'la durée du chapitre',
                    ],
                    correctIndex: 0,
                    explanation: "Le régime de change et la mobilité des capitaux structurent toute la lecture des déplacements IS-LM-BP.",
                    difficulty: 'easy',
                },
                {
                    id: 'macro-s4-ch2-q4',
                    question: 'Une courbe BP très plate traduit en général :',
                    options: [
                        'une forte mobilité internationale des capitaux',
                        'une absence totale de commerce extérieur',
                        'un marché monétaire fermé',
                        'une inflation nulle',
                    ],
                    correctIndex: 0,
                    explanation: "Plus la mobilité des capitaux est forte, plus un petit écart de taux d'intérêt suffit à déclencher de gros flux.",
                    difficulty: 'medium',
                },
            ],
        },
    ],
};

export const microS4QCMConfig: QCMConfig = {
    subject: 'Microéconomie',
    subjectId: 'micro',
    description: 'Validation du chapitre de théorie du consommateur du semestre 4.',
    validationScore: 50,
    chapters: [
        {
            id: 'micro-s4-ch1',
            title: 'Chapitre 1',
            subtitle: 'Dualité, Slutsky et variations de bien-être',
            color: 'var(--color-socio)',
            questions: [
                {
                    id: 'micro-s4-ch1-q1',
                    question: "Le programme dual du consommateur consiste à :",
                    options: [
                        'minimiser la dépense pour atteindre un niveau d’utilité donné',
                        'maximiser la dépense sous contrainte budgétaire',
                        'maximiser le profit du producteur',
                        'minimiser le taux marginal de substitution',
                    ],
                    correctIndex: 0,
                    explanation: "Le dual inverse le problème primal: on fixe l'utilité et on cherche la dépense minimale.",
                    difficulty: 'easy',
                },
                {
                    id: 'micro-s4-ch1-q2',
                    question: "L'identité de Roy permet d'obtenir :",
                    options: [
                        "les demandes marshalliennes à partir de l'utilité indirecte",
                        'les demandes hicksiennes à partir de la fonction de production',
                        "le surplus du producteur à partir des prix d'équilibre",
                        "la variance d'un estimateur",
                    ],
                    correctIndex: 0,
                    explanation: "Roy relie les dérivées de la fonction d'utilité indirecte aux demandes marshalliennes.",
                    difficulty: 'medium',
                },
                {
                    id: 'micro-s4-ch1-q3',
                    question: "L'équation de Slutsky décompose l'effet d'une variation de prix en :",
                    options: [
                        'effet substitution + effet revenu',
                        'effet revenu + effet offre',
                        'effet capital + effet travail',
                        'effet inflation + effet chômage',
                    ],
                    correctIndex: 0,
                    explanation: "La variation totale de demande se sépare en substitution pure et variation liée au pouvoir d'achat.",
                    difficulty: 'easy',
                },
                {
                    id: 'micro-s4-ch1-q4',
                    question: 'Le lemme de Shephard relie la fonction de dépense à :',
                    options: [
                        'la demande hicksienne',
                        "la demande d'offre de travail",
                        "la fonction d'utilité indirecte",
                        'la loi de Student',
                    ],
                    correctIndex: 0,
                    explanation: "La dérivée de la fonction de dépense par rapport au prix donne la demande compensée correspondante.",
                    difficulty: 'medium',
                },
                {
                    id: 'micro-s4-ch1-q5',
                    question: "Pour une baisse de prix d'un bien normal, l'ordre classique est :",
                    options: [
                        'VC < variation du surplus < VE',
                        'VE < variation du surplus < VC',
                        'VC = VE dans tous les cas',
                        'aucune hiérarchie n’est possible',
                    ],
                    correctIndex: 0,
                    explanation: "Pour un bien normal, la variation compensatrice, le surplus et la variation équivalente s'ordonnent classiquement ainsi.",
                    difficulty: 'hard',
                },
            ],
        },
    ],
};

export const statsS4QCMConfig: QCMConfig = {
    subject: 'Statistiques',
    subjectId: 'stats',
    description: 'Validation des chapitres de statistiques du semestre 4.',
    validationScore: 50,
    chapters: [
        {
            id: 'stats-ch6',
            title: 'Chapitre 6',
            subtitle: 'Tables statistiques et lois continues',
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch6-q1',
                    question: 'Si X suit une loi normale $\\mathcal{N}(m,\\sigma)$, la variable standardisée est :',
                    options: [
                        '$U=(X-m)/\\sigma$',
                        '$U=(X-\\sigma)/m$',
                        '$U=X/(m+\\sigma)$',
                        '$U=(X-m)/\\sigma^2$',
                    ],
                    correctIndex: 0,
                    explanation: "On centre par m puis on réduit par l'écart-type σ.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch6-q2',
                    question: 'Une loi du khi-deux à $\\nu$ degrés de liberté se construit comme :',
                    options: [
                        'une somme de carrés de normales centrées réduites indépendantes',
                        'une somme de variables de Poisson',
                        'une moyenne de lois uniformes',
                        'un rapport de deux lois normales',
                    ],
                    correctIndex: 0,
                    explanation: "Par définition, $\\chi^2(\\nu)$ est la somme de ν carrés de variables $\\mathcal{N}(0,1)$ indépendantes.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch6-q3',
                    question: 'La loi de Student apparaît typiquement lorsque :',
                    options: [
                        "l'écart-type de la population est inconnu",
                        'la taille de population est finie',
                        'la variable suit une loi uniforme',
                        'le paramètre λ est supérieur à 18',
                    ],
                    correctIndex: 0,
                    explanation: "Quand σ est inconnu, on remplace σ par son estimateur empirique et la statistique suit une loi de Student.",
                    difficulty: 'medium',
                },
            ],
        },
        {
            id: 'stats-ch7',
            title: 'Chapitre 7',
            subtitle: 'Convergence en loi et approximations',
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch7-q1',
                    question: "L'approximation binomiale vers Poisson est pertinente quand :",
                    options: [
                        'n est grand, p faible et np modéré',
                        'p est proche de 1',
                        'n est petit et p élevé',
                        'la variance est nulle',
                    ],
                    correctIndex: 0,
                    explanation: "On vise le cadre des événements rares: beaucoup d'épreuves, faible probabilité et λ=np raisonnable.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch7-q2',
                    question: 'Pour approximer une binomiale par une normale, le réflexe standard du cours est :',
                    options: [
                        'vérifier que np est suffisamment grand puis appliquer la correction de Yates',
                        'prendre automatiquement une loi uniforme',
                        'remplacer p par q',
                        'ignorer la continuité',
                    ],
                    correctIndex: 0,
                    explanation: "La condition sur np et la correction de continuité sécurisent l'approximation normale.",
                    difficulty: 'medium',
                },
                {
                    id: 'stats-ch7-q3',
                    question: 'Une loi de Poisson peut être approchée par une normale lorsque :',
                    options: [
                        'λ est suffisamment grand',
                        'p tend vers 0',
                        'n vaut 2',
                        'la variable est toujours centrée réduite',
                    ],
                    correctIndex: 0,
                    explanation: "Quand λ grandit, la loi de Poisson se rapproche d'une loi normale de moyenne λ et d'écart-type $\\sqrt{\\lambda}$.",
                    difficulty: 'easy',
                },
            ],
        },
        {
            id: 'stats-ch8',
            title: 'Chapitre 8',
            subtitle: "Distributions d'échantillonnage",
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch8-q1',
                    question: "Si la population est normale et σ connu, la moyenne d'échantillon suit :",
                    options: [
                        "une loi normale d'espérance m et d'écart-type $\\sigma/\\sqrt{n}$",
                        'une loi de Poisson',
                        'une loi uniforme',
                        'une loi de Fisher',
                    ],
                    correctIndex: 0,
                    explanation: "La moyenne empirique d'un échantillon normal reste normale, avec une dispersion divisée par $\\sqrt{n}$.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch8-q2',
                    question: 'Si σ est inconnu dans un problème de moyenne à un échantillon, on utilise :',
                    options: [
                        'une statistique de Student',
                        'une statistique de Poisson',
                        'une statistique de Bernoulli',
                        'une statistique de Cauchy',
                    ],
                    correctIndex: 0,
                    explanation: "La studentisation compense l'inconnue sur σ grâce à l'écart-type empirique.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch8-q3',
                    question: "Sous normalité, la variance empirique corrigée mène à :",
                    options: [
                        'une loi du khi-deux',
                        'une loi exponentielle',
                        'une loi logistique',
                        'une loi uniforme',
                    ],
                    correctIndex: 0,
                    explanation: "Le théorème de Fisher relie la variance d'échantillon normalisée à une loi $\\chi^2$.",
                    difficulty: 'medium',
                },
            ],
        },
        {
            id: 'stats-ch9',
            title: 'Chapitre 9',
            subtitle: 'Estimation ponctuelle',
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch9-q1',
                    question: 'Un estimateur sans biais vérifie :',
                    options: [
                        "son espérance est égale au paramètre à estimer",
                        'sa variance est toujours nulle',
                        'il est toujours efficace',
                        'il converge en loi vers 0',
                    ],
                    correctIndex: 0,
                    explanation: "L'absence de biais signifie que l'estimateur vise correctement le paramètre en moyenne.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch9-q2',
                    question: 'La convergence dun estimateur signifie que :',
                    options: [
                        "l'estimateur se rapproche du vrai paramètre quand la taille de l'échantillon augmente",
                        "sa valeur devient constante après un exercice",
                        'il est forcément sans biais pour tout n',
                        'sa densité devient uniforme',
                    ],
                    correctIndex: 0,
                    explanation: "La convergence est une propriété asymptotique: plus n augmente, plus l'estimateur se concentre autour du paramètre.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch9-q3',
                    question: 'En maximum de vraisemblance, le bon réflexe calculatoire est souvent :',
                    options: [
                        'passer au log de la vraisemblance avant de dériver',
                        'intégrer la vraisemblance entre 0 et 1',
                        'normaliser systématiquement par n²',
                        'remplacer le paramètre par sa variance',
                    ],
                    correctIndex: 0,
                    explanation: 'Le logarithme simplifie les produits et conserve le même optimum sous des hypothèses usuelles.',
                    difficulty: 'medium',
                },
                {
                    id: 'stats-ch9-q4',
                    question: 'Un estimateur efficace est recherché car il possède :',
                    options: [
                        'la plus faible variance dans une classe donnée',
                        'le plus grand biais possible',
                        'obligatoirement une loi uniforme',
                        'une espérance égale à zéro',
                    ],
                    correctIndex: 0,
                    explanation: "L'efficacité renvoie à la précision: on préfère l'estimateur le moins dispersé à propriétés comparables.",
                    difficulty: 'medium',
                },
            ],
        },
        {
            id: 'stats-ch10',
            title: 'Chapitre 10',
            subtitle: "Tests du khi-deux d'homogénéité, d'indépendance et d'adéquation",
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch10-q1',
                    question: 'Le test du khi-deux compare principalement :',
                    options: [
                        'des effectifs observés à des effectifs théoriques',
                        'des moyennes à des médianes',
                        'des variances à des covariances',
                        'des quantiles à des espérances',
                    ],
                    correctIndex: 0,
                    explanation: "Le cœur du test est l'écart entre tableau observé et tableau attendu sous H0.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch10-q2',
                    question: "Pour un test d'indépendance sur un tableau r x c, les degrés de liberté valent :",
                    options: [
                        '$(r-1)(c-1)$',
                        '$r+c$',
                        '$rc$',
                        '$r-c$',
                    ],
                    correctIndex: 0,
                    explanation: "Les ddl d'un test d'indépendance proviennent du nombre de cellules libres après contraintes de marges.",
                    difficulty: 'medium',
                },
                {
                    id: 'stats-ch10-q3',
                    question: "Rejeter H0 dans un test d'indépendance signifie :",
                    options: [
                        "les données sont incompatibles avec l'hypothèse d'indépendance au seuil retenu",
                        'une causalité certaine est démontrée',
                        'les variables sont parfaitement corrélées',
                        'les effectifs théoriques sont observés exactement',
                    ],
                    correctIndex: 0,
                    explanation: "Le test conclut sur une compatibilité statistique, pas sur une causalité économique ou sociale.",
                    difficulty: 'medium',
                },
            ],
        },
        {
            id: 'stats-ch11',
            title: 'Chapitre 11',
            subtitle: 'Estimation par intervalle, tests de signification et de comparaison',
            color: 'var(--color-success)',
            questions: [
                {
                    id: 'stats-ch11-q1',
                    question: 'Un intervalle de confiance à 95 % se lit comme :',
                    options: [
                        "un intervalle construit par une procédure qui couvre le vrai paramètre avec probabilité 95 %",
                        'la probabilité que H0 soit vraie vaut 95 %',
                        'une garantie de réussite à 95 % au partiel',
                        'une zone où la statistique vaut exactement 0,95',
                    ],
                    correctIndex: 0,
                    explanation: "La probabilité porte sur la procédure d'échantillonnage, pas sur la vérité de H0 elle-même.",
                    difficulty: 'medium',
                },
                {
                    id: 'stats-ch11-q2',
                    question: 'Dans un test bilatéral, on rejette H0 lorsque :',
                    options: [
                        'la statistique tombe dans une des deux queues critiques',
                        'la statistique vaut exactement zéro',
                        "l'échantillon est pair",
                        'le risque vaut toujours 10 %',
                    ],
                    correctIndex: 0,
                    explanation: "Un test bilatéral répartit le risque α dans les deux extrémités de la loi sous H0.",
                    difficulty: 'easy',
                },
                {
                    id: 'stats-ch11-q3',
                    question: 'Au même niveau de risque, une valeur nulle située hors de l’intervalle de confiance implique en général :',
                    options: [
                        'le rejet de H0 correspondante',
                        "l'acceptation automatique de toutes les hypothèses",
                        "l'impossibilité de conclure",
                        'une variance nulle',
                    ],
                    correctIndex: 0,
                    explanation: "Il existe une correspondance classique entre tests et intervalles de confiance au même seuil.",
                    difficulty: 'medium',
                },
            ],
        },
    ],
};

export const managementS4QCMConfig: QCMConfig | null = null;

export const S4_QCM_CONFIGS: Record<'macro' | 'micro' | 'stats' | 'management', QCMConfig | null> = {
    macro: macroS4QCMConfig,
    micro: microS4QCMConfig,
    stats: statsS4QCMConfig,
    management: managementS4QCMConfig,
};

export const S4_QCM_LISTS = {
    's4:macro': toQCMList(macroS4QCMConfig),
    's4:micro': toQCMList(microS4QCMConfig),
    's4:stats': toQCMList(statsS4QCMConfig),
    's4:management': [] as Array<{ id: string; title: string; subtitle: string; count: number }>,
};

export function getS4QCMConfig(moduleId: 'macro' | 'micro' | 'stats' | 'management') {
    return S4_QCM_CONFIGS[moduleId];
}
