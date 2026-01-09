// Mock data for Home dashboard
// Future-proof types for API/localStorage integration

export type ModuleKey = 'macro' | 'micro' | 'stats' | 'socio';

export interface ModuleProgress {
    id: ModuleKey;
    title: string;
    subtitle: string;
    href: string;
    progress: number; // 0-100
    completed: number;
    total: number;
    lastAction: string | null;
    lastActionTime: string | null;
}

export interface ContentItem {
    id: string;
    type: 'Chapitre' | 'Fiche' | 'QCM' | 'Annale';
    module: ModuleKey;
    title: string;
    date: string; // relative: "Aujourd'hui", "Hier", "3j"
    href: string;
}

export interface DeadlineItem {
    id: string;
    title: string;
    date: string;
    badge: string; // "J-3", "Cette semaine", etc.
    href: string;
}

export interface AnnouncementItem {
    id: string;
    type: 'announcement' | 'tip';
    content: string;
}

export interface HomeDashboard {
    moduleProgress: ModuleProgress[];
    nouveautes: ContentItem[];
    deadlines: DeadlineItem[];
    announcements: AnnouncementItem[];
}

// Mock data
export const MOCK_HOME_DASHBOARD: HomeDashboard = {
    moduleProgress: [
        {
            id: 'macro',
            title: 'Macroéconomie',
            subtitle: 'IS-LM, AS-AD, Politiques',
            href: '/macro',
            progress: 65,
            completed: 13,
            total: 20,
            lastAction: 'Chapitre 5 : Modèle AS-AD',
            lastActionTime: 'il y a 2j'
        },
        {
            id: 'micro',
            title: 'Microéconomie',
            subtitle: 'Consommateur, Producteur',
            href: '/micro',
            progress: 45,
            completed: 9,
            total: 20,
            lastAction: 'Chapitre 3 : Équilibre du consommateur',
            lastActionTime: 'il y a 5j'
        },
        {
            id: 'stats',
            title: 'Statistiques',
            subtitle: 'Probabilités, Variables',
            href: '/stats',
            progress: 80,
            completed: 16,
            total: 20,
            lastAction: 'QCM Variables aléatoires',
            lastActionTime: 'Hier'
        },
        {
            id: 'socio',
            title: 'Sociologie',
            subtitle: 'Weber, Durkheim',
            href: '/socio',
            progress: 30,
            completed: 6,
            total: 20,
            lastAction: null,
            lastActionTime: null
        }
    ],
    nouveautes: [
        {
            id: '1',
            type: 'Chapitre',
            module: 'macro',
            title: 'Chapitre 6 : Politique monétaire et inflation',
            date: 'Aujourd\'hui',
            href: '/macro/chapitre-6'
        },
        {
            id: '2',
            type: 'Annale',
            module: 'stats',
            title: 'Sujet Partiel 2024 + Corrigé',
            date: 'Aujourd\'hui',
            href: '/stats/annales/2024'
        },
        {
            id: '3',
            type: 'Fiche',
            module: 'micro',
            title: 'Fiche : Élasticités prix et revenu',
            date: 'Hier',
            href: '/micro/fiches/elasticites'
        },
        {
            id: '4',
            type: 'QCM',
            module: 'socio',
            title: 'QCM Weber : Domination et légitimité',
            date: 'Hier',
            href: '/socio/qcm/weber'
        },
        {
            id: '5',
            type: 'Chapitre',
            module: 'stats',
            title: 'Chapitre 8 : Tests d\'hypothèses',
            date: '3j',
            href: '/stats/chapitre-8'
        },
        {
            id: '6',
            type: 'Fiche',
            module: 'macro',
            title: 'Fiche : Courbe de Phillips',
            date: '3j',
            href: '/macro/fiches/phillips'
        }
    ],
    deadlines: [
        {
            id: '1',
            title: 'TD Microéconomie à rendre',
            date: '15 janvier',
            badge: 'J-6',
            href: '/micro/td'
        },
        {
            id: '2',
            title: 'QCM Statistiques (en ligne)',
            date: '18 janvier',
            badge: 'J-9',
            href: '/stats/qcm'
        },
        {
            id: '3',
            title: 'Partiel Macroéconomie',
            date: '25 janvier',
            badge: 'J-16',
            href: '/macro'
        },
        {
            id: '4',
            title: 'Lire chapitre 4 Sociologie',
            date: 'Cette semaine',
            badge: 'À faire',
            href: '/socio/chapitre-4'
        }
    ],
    announcements: [
        {
            id: '1',
            type: 'announcement',
            content: 'Nouveaux corrigés d\'annales 2024 disponibles'
        },
        {
            id: '2',
            type: 'tip',
            content: 'Méthode : 25 min focus + 5 min pause + fiches actives'
        }
    ]
};
