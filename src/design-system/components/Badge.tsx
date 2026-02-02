import { type ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' | 'accent';
type BadgeSize = 'sm' | 'md' | 'lg';
type SubjectVariant = 'macro' | 'micro' | 'stats' | 'socio';

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

/**
 * Badge variants using CSS custom properties (Design Contract v3)
 * - Uses semantic color tokens
 * - Subtle backgrounds with strong text
 */
const variantStyles: Record<BadgeVariant, string> = {
    default: `
        bg-[rgb(var(--surface-2))]
        text-[rgb(var(--text-secondary))]
    `,
    primary: `
        bg-[rgb(var(--text)/0.08)]
        text-[rgb(var(--text))]
    `,
    success: `
        bg-[var(--color-success-subtle,rgba(34,197,94,0.1))]
        text-[var(--color-success)]
    `,
    error: `
        bg-[var(--color-error-subtle,rgba(239,68,68,0.1))]
        text-[var(--color-destructive)]
    `,
    warning: `
        bg-[var(--color-warning-subtle,rgba(245,158,11,0.1))]
        text-[var(--color-warning)]
    `,
    info: `
        bg-[var(--color-info-subtle,rgba(59,130,246,0.1))]
        text-[var(--color-info,#3b82f6)]
    `,
    accent: `
        bg-[rgb(var(--accent)/0.1)]
        text-[rgb(var(--accent))]
    `,
};

/**
 * Size styles using 8px grid
 */
const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-[var(--space-2)] py-[2px] text-xs gap-1',
    md: 'px-[var(--space-3)] py-[var(--space-1)] text-sm gap-1.5',
    lg: 'px-[var(--space-4)] py-[var(--space-2)] text-sm gap-2',
};

/**
 * Badge component for labels, tags, and status indicators
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - 8px grid spacing
 * - Semantic color variants
 * - Optional icon support
 */
export function Badge({
    variant = 'default',
    size = 'sm',
    icon,
    children,
    className = ''
}: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center justify-center
                font-medium rounded-full
                whitespace-nowrap
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
        >
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
        </span>
    );
}

/**
 * Subject-specific badge using course color palette
 */
interface SubjectBadgeProps {
    subject: SubjectVariant;
    size?: BadgeSize;
    children: ReactNode;
    className?: string;
}

const subjectStyles: Record<SubjectVariant, { bg: string; text: string; label: string }> = {
    macro: {
        bg: 'var(--color-macro-light)',
        text: 'var(--color-macro)',
        label: 'Macro'
    },
    micro: {
        bg: 'var(--color-micro-light)',
        text: 'var(--color-micro)',
        label: 'Micro'
    },
    stats: {
        bg: 'var(--color-stats-light)',
        text: 'var(--color-stats)',
        label: 'Stats'
    },
    socio: {
        bg: 'var(--color-socio-light)',
        text: 'var(--color-socio)',
        label: 'Socio'
    },
};

export function SubjectBadge({
    subject,
    size = 'sm',
    children,
    className = ''
}: SubjectBadgeProps) {
    const style = subjectStyles[subject];

    return (
        <span
            className={`
                inline-flex items-center justify-center
                font-medium rounded-full
                whitespace-nowrap
                ${sizeStyles[size]}
                ${className}
            `}
            style={{
                backgroundColor: style.bg,
                color: style.text
            }}
        >
            {children || style.label}
        </span>
    );
}

/**
 * Status badge for progress indicators
 */
interface StatusBadgeProps {
    status: 'not_started' | 'in_progress' | 'completed';
    size?: BadgeSize;
    showLabel?: boolean;
    className?: string;
}

const statusConfig = {
    not_started: {
        variant: 'default' as const,
        label: 'Non commencé',
        dot: 'bg-[rgb(var(--text-muted))]'
    },
    in_progress: {
        variant: 'warning' as const,
        label: 'En cours',
        dot: 'bg-[var(--color-warning)]'
    },
    completed: {
        variant: 'success' as const,
        label: 'Terminé',
        dot: 'bg-[var(--color-success)]'
    },
};

export function StatusBadge({
    status,
    size = 'sm',
    showLabel = true,
    className = ''
}: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge variant={config.variant} size={size} className={className}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {showLabel && config.label}
        </Badge>
    );
}

/**
 * Difficulty badge for QCM/exercises
 */
interface DifficultyBadgeProps {
    level: 1 | 2 | 3;
    size?: BadgeSize;
    className?: string;
}

const difficultyConfig = {
    1: { variant: 'success' as const, label: 'Facile' },
    2: { variant: 'warning' as const, label: 'Moyen' },
    3: { variant: 'error' as const, label: 'Difficile' },
};

export function DifficultyBadge({
    level,
    size = 'sm',
    className = ''
}: DifficultyBadgeProps) {
    const config = difficultyConfig[level];

    return (
        <Badge variant={config.variant} size={size} className={className}>
            {config.label}
        </Badge>
    );
}
