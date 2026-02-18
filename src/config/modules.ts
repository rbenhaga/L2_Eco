import {
    TrendingUp,
    PieChart,
    BarChart3,
    Users,
    Briefcase,
    type LucideIcon
} from 'lucide-react';

/**
 * Module Configuration
 * Centralized module metadata for consistent styling across the app
 * Uses CSS variables from design system instead of hardcoded Tailwind classes
 */

export type ModuleId = 'macro' | 'micro' | 'stats' | 'socio' | 'management';

export interface ModuleConfig {
    id: ModuleId;
    name: string;
    icon: LucideIcon;
    /** CSS variable for icon background */
    iconBgStyle: React.CSSProperties;
    /** CSS variable for text color */
    textStyle: React.CSSProperties;
    /** @deprecated Use iconBgStyle instead */
    iconBgLight: string;
    /** @deprecated Use textStyle instead */
    text: string;
}

export const MODULE_CONFIG: Record<ModuleId, ModuleConfig> = {
    macro: {
        id: 'macro',
        name: 'Macroéconomie',
        icon: TrendingUp,
        iconBgStyle: { background: 'var(--color-info-subtle)' },
        textStyle: { color: 'var(--color-info)' },
        iconBgLight: '',
        text: ''
    },
    micro: {
        id: 'micro',
        name: 'Microéconomie',
        icon: PieChart,
        iconBgStyle: { background: 'var(--color-success-subtle)' },
        textStyle: { color: 'var(--color-success)' },
        iconBgLight: '',
        text: ''
    },
    stats: {
        id: 'stats',
        name: 'Statistiques',
        icon: BarChart3,
        iconBgStyle: { background: 'var(--color-warning-subtle)' },
        textStyle: { color: 'var(--color-warning)' },
        iconBgLight: '',
        text: ''
    },
    socio: {
        id: 'socio',
        name: 'Sociologie',
        icon: Users,
        iconBgStyle: { background: 'var(--callout-formula-bg, color-mix(in srgb, var(--color-accent) 8%, transparent))' },
        textStyle: { color: 'var(--callout-formula-text, var(--color-micro))' },
        iconBgLight: '',
        text: ''
    },
    management: {
        id: 'management',
        name: 'Management',
        icon: Briefcase,
        iconBgStyle: { background: 'var(--callout-formula-bg, color-mix(in srgb, var(--color-accent) 8%, transparent))' },
        textStyle: { color: 'var(--callout-formula-text, var(--color-micro))' },
        iconBgLight: '',
        text: ''
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
