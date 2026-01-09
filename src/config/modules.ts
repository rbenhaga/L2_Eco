import {
    TrendingUp,
    PieChart,
    BarChart3,
    Users,
    type LucideIcon
} from 'lucide-react';

/**
 * Module Configuration
 * Centralized module metadata for consistent styling across the app
 */

export type ModuleId = 'macro' | 'micro' | 'stats' | 'socio';

export interface ModuleConfig {
    id: ModuleId;
    name: string;
    icon: LucideIcon;
    iconBgLight: string;
    text: string;
}

export const MODULE_CONFIG: Record<ModuleId, ModuleConfig> = {
    macro: {
        id: 'macro',
        name: 'Macroéconomie',
        icon: TrendingUp,
        iconBgLight: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400'
    },
    micro: {
        id: 'micro',
        name: 'Microéconomie',
        icon: PieChart,
        iconBgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400'
    },
    stats: {
        id: 'stats',
        name: 'Statistiques',
        icon: BarChart3,
        iconBgLight: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400'
    },
    socio: {
        id: 'socio',
        name: 'Sociologie',
        icon: Users,
        iconBgLight: 'bg-violet-50 dark:bg-violet-500/10',
        text: 'text-violet-600 dark:text-violet-400'
    }
} as const;

/**
 * Content Type Configuration
 * Styling for different content types (Chapitre, Fiche, QCM, Annale)
 */

export type ContentType = 'Chapitre' | 'Fiche' | 'QCM' | 'Annale';

export const CONTENT_TYPE_STYLES: Record<ContentType, string> = {
    'Chapitre': 'bg-muted text-muted-foreground',
    'Fiche': 'bg-muted text-muted-foreground',
    'QCM': 'bg-muted text-muted-foreground',
    'Annale': 'bg-muted text-muted-foreground'
} as const;
