import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleChapter, ModuleStats } from '../../../../components/layout/ModuleHub';
import { Users } from 'lucide-react';

const chapters: ModuleChapter[] = [
  {
    id: 'socio-ch1',
    number: '01',
    title: 'Introduction à la Sociologie',
    description: 'Fondements et méthodes de la sociologie.',
    path: '/socio/chapitre1',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '30 min'
  },
  {
    id: 'socio-ch2',
    number: '02',
    title: 'Durkheim',
    description: 'Le fait social, solidarité mécanique et organique.',
    path: '/socio/chapitre2',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'socio-ch3',
    number: '03',
    title: 'Weber',
    description: 'Action sociale, idéaux-types, rationalisation.',
    path: '/socio/chapitre3',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'socio-ch4',
    number: '04',
    title: 'Marx',
    description: 'Classes sociales, lutte des classes, aliénation.',
    path: '/socio/chapitre4',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'socio-ch5',
    number: '05',
    title: 'Bourdieu',
    description: 'Capital culturel, habitus, reproduction sociale.',
    path: '/socio/chapitre5',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    isNew: true,
    estimatedTime: '50 min'
  },
  {
    id: 'socio-ch6',
    number: '06',
    title: 'Stratification Sociale',
    description: 'Classes, mobilité sociale, inégalités.',
    path: '/socio/chapitre6',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'socio-ch7',
    number: '07',
    title: 'Socialisation',
    description: 'Primaire, secondaire, agents de socialisation.',
    path: '/socio/chapitre7',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '35 min'
  },
  {
    id: 'socio-ch8',
    number: '08',
    title: 'Déviance & Contrôle Social',
    description: 'Normes, déviance, institutions de contrôle.',
    path: '/socio/chapitre8',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '40 min'
  },
  {
    id: 'socio-ch9',
    number: '09',
    title: 'Sociologie Économique',
    description: 'Marché, travail, consommation.',
    path: '/socio/chapitre9',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min'
  },
  {
    id: 'socio-ch10',
    number: '10',
    title: 'Sociologie Politique',
    description: 'Pouvoir, État, participation politique.',
    path: '/socio/chapitre10',
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    isUpdated: true,
    estimatedTime: '40 min'
  },
];

const stats: ModuleStats = {
  totalChapters: 10,
  completedCourses: 0,
  completedTDs: 0,
  overallProgress: 0
};

export default function SocioHome() {
  return (
    <ModuleHub
      title="Sociologie"
      description="De Durkheim à Bourdieu, les fondements de la sociologie"
      icon={<Users className="h-6 w-6" />}
      moduleId="socio"
      chapters={chapters}
      stats={stats}
      baseRoute="/socio"
    />
  );
}
