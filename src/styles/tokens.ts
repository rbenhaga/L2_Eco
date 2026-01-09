/**
 * Design Tokens - Color Palette
 * 
 * Centralized color definitions with dark mode support.
 * Use these constants instead of inline Tailwind classes for consistency.
 */

export const colors = {
    // Base backgrounds
    bg: {
        base: 'bg-white dark:bg-slate-900/80',
        subtle: 'bg-slate-100/50 dark:bg-white/5',
        hover: 'bg-slate-100 dark:bg-white/10',
        card: 'bg-white dark:bg-slate-900/60',
    },

    // Text colors
    text: {
        primary: 'text-slate-900 dark:text-white',
        secondary: 'text-slate-800 dark:text-slate-200',
        tertiary: 'text-slate-700 dark:text-slate-300',
        muted: 'text-slate-600 dark:text-slate-400',
        disabled: 'text-slate-500 dark:text-slate-500',
    },

    // Border colors
    border: {
        default: 'border-slate-200 dark:border-white/10',
        hover: 'border-slate-300 dark:border-white/15',
        focus: 'border-slate-400 dark:border-white/20',
    },

    // Semantic colors
    success: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        bgHover: 'hover:bg-green-100 dark:hover:bg-green-950/40',
        border: 'border-green-200 dark:border-green-500/30',
        text: 'text-green-800 dark:text-green-400',
        icon: 'text-green-600 dark:text-green-400',
    },

    error: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        bgHover: 'hover:bg-red-100 dark:hover:bg-red-950/40',
        border: 'border-red-200 dark:border-red-500/30',
        text: 'text-red-800 dark:text-red-400',
        icon: 'text-red-600 dark:text-red-400',
    },

    info: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        bgHover: 'hover:bg-blue-100 dark:hover:bg-blue-950/40',
        border: 'border-blue-200 dark:border-blue-500/30',
        text: 'text-blue-800 dark:text-blue-400',
        icon: 'text-blue-600 dark:text-blue-400',
    },

    warning: {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        bgHover: 'hover:bg-amber-100 dark:hover:bg-amber-950/40',
        border: 'border-amber-200 dark:border-amber-500/30',
        text: 'text-amber-800 dark:text-amber-400',
        icon: 'text-amber-600 dark:text-amber-400',
    },

    purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        border: 'border-purple-200 dark:border-purple-500/30',
        text: 'text-purple-800 dark:text-purple-400',
    },

    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-emerald-200 dark:border-emerald-500/30',
        text: 'text-emerald-800 dark:text-emerald-400',
    },
};

/**
 * Helper function to combine Tailwind classes
 * Useful when you need to merge multiple token strings
 */
export function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
