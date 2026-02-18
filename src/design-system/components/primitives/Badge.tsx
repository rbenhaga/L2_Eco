import { ReactNode, CSSProperties } from 'react';
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
 * Design Contract v3: No hardcoded Tailwind colors - uses CSS custom properties.
 */

const variantStyles: Record<string, CSSProperties> = {
    default: {
        background: 'var(--color-bg-overlay)',
        color: 'var(--color-text-secondary)',
    },
    success: {
        background: 'var(--color-success-subtle)',
        color: 'var(--color-success)',
    },
    warning: {
        background: 'var(--color-warning-subtle)',
        color: 'var(--color-warning)',
    },
    error: {
        background: 'var(--color-error-subtle)',
        color: 'var(--color-error)',
    },
    info: {
        background: 'var(--color-info-subtle)',
        color: 'var(--color-info)',
    },
};

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    icon: Icon,
    className = '',
    subjectColor
}: BadgeProps) {

    const baseClasses = 'inline-flex items-center gap-1.5 font-semibold rounded-full';

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
    ${sizeClasses[size]}
    ${className}
  `.trim();

    // Subject variant uses the provided subjectColor
    const style: CSSProperties = variant === 'subject' && subjectColor
        ? {
            background: `color-mix(in srgb, ${subjectColor} 12%, transparent)`,
            color: subjectColor,
        }
        : variant === 'subject'
            ? {
                background: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
            }
            : variantStyles[variant] || variantStyles.default;

    return (
        <span className={combinedClasses} style={style}>
            {Icon && <Icon size={iconSizes[size]} />}
            {children}
        </span>
    );
}
