import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { PieChart } from 'lucide-react';

const chapters: ModuleChapter[] = [
  {
    id: 'micro-ch0',
    number: '00',
    title: 'Introduction à la Micro',
    description: 'Fondamentaux de la microéconomie, concepts de base.',
    path: '/micro/chapitre-0',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '20 min'
  },
  {
    id: 'micro-ch1',
    number: '01',
    title: 'Arbitrage Travail-Loisir',
    description: 'Choix du consommateur entre travail et loisir.',
    path: '/micro/chapitre-1',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '35 min'
  },
  {
    id: 'micro-ch2',
    number: '02',
    title: 'Le Consommateur',
    description: 'Théorie du consommateur, utilité, préférences, budget.',
    path: '/micro/chapitre-2',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'micro-ch3',
    number: '03',
    title: 'Demande & Variations',
    description: 'Courbe de demande, élasticités, effets prix et revenu.',
    path: '/micro/chapitre-3',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'micro-ch4',
    number: '04',
    title: 'Le Producteur',
    description: 'Théorie de la production, coûts, profit.',
    path: '/micro/chapitre-4',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'micro-ch5',
    number: '05',
    title: 'Offre & Équilibre',
    description: "Courbe d'offre et équilibre de marché.",
    path: '/micro/chapitre-5',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'micro-ch6',
    number: '06',
    title: 'Concurrence Imparfaite',
    description: 'Monopole, oligopole, concurrence monopolistique.',
    path: '/micro/chapitre-6',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '50 min'
  },
  {
    id: 'micro-ch7',
    number: '07',
    title: 'Théorie des Jeux',
    description: 'Équilibre de Nash, stratégies dominantes.',
    path: '/micro/chapitre-7',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
];

const stats: ModuleStats = {
  totalChapters: 8,
  completedCourses: 0,
  completedTDs: 0,
  overallProgress: 0
};

export function MicroHome() {
  return (
    <ModuleHub
      title="Microéconomie"
      description="Consommateur, producteur, marchés et équilibre"
      icon={<PieChart className="h-6 w-6" />}
      moduleId="micro"
      chapters={chapters}
      stats={stats}
      baseRoute="/micro"
    />
  );
}
