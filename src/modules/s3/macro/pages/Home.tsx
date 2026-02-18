import ModuleHub from '../../../../components/layout/ModuleHub';
import type { RecentUpdate } from '../../../../components/layout/ModuleHub';
import { TrendingUp } from 'lucide-react';
import { macroChapters, macroStats } from '../data/macroData';

const recentUpdate: RecentUpdate = {
  text: 'Simulations interactives IS-LM et AS-AD disponibles',
  path: '/s3/macro/simulations'
};

export function MacroHome() {
  return (
    <ModuleHub
      title="Macroéconomie"
      description="IS-LM, WS-PS, AS-AD et courbe de Phillips"
      icon={<TrendingUp className="h-6 w-6" />}
      moduleId="macro"
      chapters={macroChapters}
      stats={macroStats}
      baseRoute="/s3/macro"
      recentUpdate={recentUpdate}
    />
  );
}
