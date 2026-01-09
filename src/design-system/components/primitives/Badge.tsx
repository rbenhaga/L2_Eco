import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'subject';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    className?: string;
    subjectColor?: string; // For subject-specific badges
}

/**
 * Badge - Small status or category indicator
 * 
 * Used for chapter numbers, difficulty levels, content types, etc.
 */
export function Badge({
    children,
    variant = 'default',
    size = 'md',
    icon: Icon,
    className = '',
    subjectColor
}: BadgeProps) {

    const baseClasses = 'inline-flex items-center gap-1.5 font-semibold rounded-full';

    const variantClasses = {
        default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        subject: subjectColor || 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    };

    const iconSizes = {
        sm: 12,
        md: 14,
        lg: 16
    };

    const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

    return (
        <span className={combinedClasses}>
            {Icon && <Icon size={iconSizes[size]} />}
            {children}
        </span>
    );
}
