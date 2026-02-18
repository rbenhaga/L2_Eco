import ModuleHub from '../../../../components/layout/ModuleHub';
import { BarChart3 } from 'lucide-react';
import { statsChapters, statsStats } from '../data/statsData';

export function StatsHome() {
  return (
    <ModuleHub
      title="Statistiques"
      description="Probabilités, variables aléatoires et lois usuelles"
      icon={<BarChart3 className="h-6 w-6" />}
      moduleId="stats"
      chapters={statsChapters}
      stats={statsStats}
      baseRoute="/s3/stats"
    />
  );
}
