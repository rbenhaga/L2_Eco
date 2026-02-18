import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { TrendingUp } from 'lucide-react';

const chapters: ModuleChapter[] = [
    {
        id: 'macro-s4-ch1',
        number: '01',
        title: "De l'économie fermée à l'économie ouverte",
        description: 'Balance des paiements, taux de change et Parité de Pouvoir d\'Achat (PPA)',
        path: '/s4/macro/chapitre-1',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '60 min',
    },
    {
        id: 'macro-s4-ch2',
        number: '02',
        title: "L'équilibre macroéconomique en économie ouverte",
        description: 'Modèle Mundell-Fleming (IS-LM-BP) et efficacité des politiques économiques',
        path: '/s4/macro/chapitre-2',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '75 min',
    },
    {
        id: 'macro-s4-ch3',
        number: '03',
        title: 'Introduction au système financier et à la monnaie',
        description: 'Structure du système financier, la monnaie et ses fonctions',
        path: '/s4/macro/chapitre-3',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '50 min',
    },
    {
        id: 'macro-s4-ch4',
        number: '04',
        title: "Le temps et les taux d'intérêt",
        description: 'Valeur actuelle, obligations, courbe des taux et modèle de Gordon-Shapiro',
        path: '/s4/macro/chapitre-4',
        hasAudio: false,
        hasIntroVideo: false,
        isCompleted: false,
        isTDCompleted: false,
        estimatedTime: '65 min',
    },
];

const stats: ModuleStats = {
    totalChapters: 4,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function MacroHome() {
    return (
        <ModuleHub
            title="Macroéconomie"
            description="Économie ouverte, système financier et taux d'intérêt"
            icon={<TrendingUp className="h-6 w-6" />}
            moduleId="macro"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/macro"
        />
    );
}
