import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { BarChart3 } from 'lucide-react';

const chapters: ModuleChapter[] = [
  {
    id: 'stats-ch1',
    number: '01',
    title: 'Algèbre de Boole & Probabilités',
    description: 'Événements, probabilités conditionnelles, Bayes.',
    path: '/stats/chapitre-1',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'stats-ch2',
    number: '02',
    title: 'Variables Aléatoires Discrètes',
    description: 'Loi binomiale, Poisson, espérance, variance.',
    path: '/stats/chapitre-2',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'stats-ch3',
    number: '03',
    title: 'Variables Aléatoires Continues',
    description: 'Loi normale, exponentielle, densité.',
    path: '/stats/chapitre-3',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '50 min'
  },
  {
    id: 'stats-ch4',
    number: '04',
    title: 'Lois Usuelles',
    description: 'Lois classiques et leurs propriétés.',
    path: '/stats/chapitre-4',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'stats-ch5',
    number: '05',
    title: 'Variables Aléatoires 2D',
    description: 'Couples de VA, covariance, corrélation.',
    path: '/stats/chapitre-5',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '55 min'
  },
];

const stats: ModuleStats = {
  totalChapters: 5,
  completedCourses: 0,
  completedTDs: 0,
  overallProgress: 0
};

export function StatsHome() {
  return (
    <ModuleHub
      title="Statistiques"
      description="Probabilités, variables aléatoires et lois usuelles"
      icon={<BarChart3 className="h-6 w-6" />}
      moduleId="stats"
      chapters={chapters}
      stats={stats}
      baseRoute="/stats"
    />
  );
}
