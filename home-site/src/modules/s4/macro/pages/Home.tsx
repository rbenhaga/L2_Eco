import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleStats } from '../../../../components/layout/ModuleHub';
import { TrendingUp } from 'lucide-react';
import { chapters, macroModuleMeta } from '../data/chapters';

const stats: ModuleStats = {
    totalChapters: chapters.length,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function MacroHome() {
    return (
        <ModuleHub
            title={macroModuleMeta.title}
            description={macroModuleMeta.description}
            icon={<TrendingUp className="h-6 w-6" />}
            moduleId="macro"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/macro"
        />
    );
}
