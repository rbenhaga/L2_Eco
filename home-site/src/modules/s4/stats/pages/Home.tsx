import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleStats } from '../../../../components/layout/ModuleHub';
import { BarChart3 } from 'lucide-react';
import { chapters, statsModuleMeta } from '../data/chapters';

const stats: ModuleStats = {
    totalChapters: chapters.length,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function StatsHome() {
    return (
        <ModuleHub
            title={statsModuleMeta.title}
            description={statsModuleMeta.description}
            icon={<BarChart3 className="h-6 w-6" />}
            moduleId="stats"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/stats"
        />
    );
}
