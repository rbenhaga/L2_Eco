import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleStats } from '../../../../components/layout/ModuleHub';
import { PieChart } from 'lucide-react';
import { chapters, microModuleMeta } from '../data/chapters';

const stats: ModuleStats = {
    totalChapters: chapters.length,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function MicroHome() {
    return (
        <ModuleHub
            title={microModuleMeta.title}
            description={microModuleMeta.description}
            icon={<PieChart className="h-6 w-6" />}
            moduleId="micro"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/micro"
        />
    );
}
