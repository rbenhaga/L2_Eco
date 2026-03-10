import ModuleHub from '../../../../components/layout/ModuleHub';
import type { ModuleStats } from '../../../../components/layout/ModuleHub';
import { Briefcase } from 'lucide-react';
import { chapters, managementModuleMeta } from '../data/chapters';

const stats: ModuleStats = {
    totalChapters: chapters.length,
    completedCourses: 0,
    completedTDs: 0,
    overallProgress: 0,
};

export function ManagementHome() {
    return (
        <ModuleHub
            title={managementModuleMeta.title}
            description={managementModuleMeta.description}
            icon={<Briefcase className="h-6 w-6" />}
            moduleId="management"
            chapters={chapters}
            stats={stats}
            baseRoute="/s4/management"
        />
    );
}
