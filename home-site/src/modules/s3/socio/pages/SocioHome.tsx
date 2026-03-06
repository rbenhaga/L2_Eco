import ModuleHub from '../../../../components/layout/ModuleHub';
import { Users } from 'lucide-react';
import { socioChapters, socioStats } from '../data/socioData';

export default function SocioHome() {
  return (
    <ModuleHub
      title="Sociologie"
      description="De Durkheim à Bourdieu, les fondements de la sociologie"
      icon={<Users className="h-6 w-6" />}
      moduleId="socio"
      chapters={socioChapters}
      stats={socioStats}
      baseRoute="/s3/socio"
    />
  );
}
