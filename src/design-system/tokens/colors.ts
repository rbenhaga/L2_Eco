/**
 * Color Tokens - Semantic color system for subjects
 * 
 * Each subject has a unique color identity used throughout the app
 * for icons, badges, gradients, and visual hierarchy.
 */

export const subjectColors = {
    macro: {
        light: 'blue-600',
        dark: 'blue-400',
        gradient: 'from-blue-500 to-indigo-600',
        hover: 'blue-700',
        bg: 'blue-50',
        bgDark: 'blue-950'
    },
    micro: {
        light: 'emerald-600',
        dark: 'emerald-400',
        gradient: 'from-emerald-500 to-teal-600',
        hover: 'emerald-700',
        bg: 'emerald-50',
        bgDark: 'emerald-950'
    },
    stats: {
        light: 'cyan-600',
        dark: 'cyan-400',
        gradient: 'from-cyan-500 to-blue-500',
        hover: 'cyan-700',
        bg: 'cyan-50',
        bgDark: 'cyan-950'
    },
    socio: {
        light: 'violet-600',
        dark: 'violet-400',
        gradient: 'from-violet-500 to-purple-600',
        hover: 'violet-700',
        bg: 'violet-50',
        bgDark: 'violet-950'
    }
} as const;

export type SubjectKey = keyof typeof subjectColors;

/**
 * Get subject color class for a given subject and variant
 */
export function getSubjectColor(
    subject: SubjectKey,
    variant: 'light' | 'dark' | 'gradient' | 'hover' | 'bg' | 'bgDark' = 'light'
): string {
    return subjectColors[subject][variant];
}

/**
 * Content type colors - for different learning materials
 */
export const contentTypeColors = {
    cours: {
        icon: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    qcm: {
        icon: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-100 dark:bg-green-900/20'
    },
    td: {
        icon: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-100 dark:bg-amber-900/20'
    },
    fiche: {
        icon: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-100 dark:bg-purple-900/20'
    },
    annale: {
        icon: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-100 dark:bg-rose-900/20'
    }
} as const;
