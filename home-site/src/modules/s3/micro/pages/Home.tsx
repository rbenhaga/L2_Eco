import ModuleHub from '../../../../components/layout/ModuleHub';
import { PieChart } from 'lucide-react';
import { microChapters, microStats } from '../data/microData';

export function MicroHome() {
  return (
    <ModuleHub
      title="Microéconomie"
      description="Consommateur, producteur, marchés et équilibre"
      icon={<PieChart className="h-6 w-6" />}
      moduleId="micro"
      chapters={microChapters}
      stats={microStats}
      baseRoute="/s3/micro"
    />
  );
}
