import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats, RecentUpdate } from '../../../../components/layout/ModuleHub';
import { TrendingUp } from 'lucide-react';

const chapters: ModuleChapter[] = [
  {
    id: 'macro-ch1',
    number: '01',
    title: 'Introduction & IS-LM',
    description: 'Court/moyen/long terme, équilibre macroéconomique, multiplicateur.',
    path: '/macro/chapitre-1',
    hasAudio: true,
    hasIntroVideo: true,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'macro-ch2',
    number: '02',
    title: 'Le Marché du Travail',
    description: 'Modèle classique, WS-PS, chômage naturel et ses déterminants.',
    path: '/macro/chapitre-2',
    hasAudio: true,
    hasIntroVideo: true,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'macro-ch3',
    number: '03',
    title: "L'Équilibre AS-AD",
    description: 'Synthèse IS-LM et WS-PS, dynamique CT/MT, stagflation.',
    path: '/macro/chapitre-3',
    hasAudio: true,
    hasIntroVideo: true,
    isCompleted: false,
    isTDCompleted: false,
    isNew: true,
    estimatedTime: '50 min'
  },
  {
    id: 'macro-ch4',
    number: '04',
    title: 'Politiques & Phillips',
    description: 'BCE, dette publique, courbe de Phillips, anticipations.',
    path: '/macro/chapitre-4',
    hasAudio: true,
    hasIntroVideo: true,
    isCompleted: false,
    isTDCompleted: false,
    isUpdated: true,
    estimatedTime: '45 min'
  },
];

const stats: ModuleStats = {
  totalChapters: 4,
  completedCourses: 0,
  completedTDs: 0,
  overallProgress: 0
};

const recentUpdate: RecentUpdate = {
  text: 'Simulations interactives IS-LM et AS-AD disponibles',
  path: '/macro/simulations'
};

export function MacroHome() {
  return (
    <ModuleHub
      title="Macroéconomie"
      description="IS-LM, WS-PS, AS-AD et courbe de Phillips"
      icon={<TrendingUp className="h-6 w-6" />}
      moduleId="macro"
      chapters={chapters}
      stats={stats}
      baseRoute="/macro"
      recentUpdate={recentUpdate}
    />
  );
}
