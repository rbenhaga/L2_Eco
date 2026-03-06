import { type ReactNode, type HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'premium' | 'list';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: CardPadding;
    hover?: boolean;
    interactive?: boolean;
    children: ReactNode;
}

/**
 * Card variants using CSS custom properties (Design Contract v3)
 * - premium: For subjects, chapters (high importance) - uses .card-premium from CSS
 * - list: For fiches, QCM items (lower importance) - uses .card-list from CSS
 * - elevated: Shadow-based depth
 * - glass: Glassmorphism effect
 */
const variantStyles: Record<CardVariant, string> = {
    default: `
        bg-[rgb(var(--surface-1))]
        border border-[rgb(var(--border))]
        shadow-[var(--shadow-1)]
    `,
    elevated: `
        bg-[rgb(var(--surface-1))]
        shadow-[var(--shadow-2)]
    `,
    outlined: `
        bg-[rgb(var(--surface-1))]
        border-2 border-[rgb(var(--border-strong))]
    `,
    glass: `
        bg-[var(--glass-panel)]
        backdrop-blur-xl backdrop-saturate-150
        border border-[var(--glass-border)]
        shadow-[var(--shadow-2)]
    `,
    premium: `
        bg-[rgb(var(--surface-1))]
        shadow-[var(--shadow-2)]
        hover:shadow-[var(--shadow-3)]
    `,
    list: `
        bg-[rgb(var(--surface-1))]
        border border-[rgb(var(--border))]
        shadow-[var(--shadow-1)]
        hover:border-[rgb(var(--border-strong))]
        hover:shadow-[var(--shadow-2)]
    `,
};

/**
 * Padding using 8px grid
 */
const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm: 'p-[var(--space-4)]',
    md: 'p-[var(--space-5)] sm:p-[var(--space-6)]',
    lg: 'p-[var(--space-6)] sm:p-[var(--space-8)]',
};

/**
 * Premium Card component with multiple variants
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties (no hardcoded colors)
 * - Token-based shadows (--shadow-1, --shadow-2, --shadow-3)
 * - Token-based radius (--radius-2xl = 24px)
 * - Supports glassmorphism effect
 * - Hover animations with proper timing
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(({
    variant = 'default',
    padding = 'md',
    hover = false,
    interactive = false,
    children,
    className = '',
    ...props
}, ref) => {
    const isClickable = interactive || props.onClick !== undefined;

    return (
        <div
            ref={ref}
            className={`
                rounded-[var(--radius-2xl)]
                ${variantStyles[variant]}
                ${paddingStyles[padding]}
                ${hover || isClickable ? `
                    transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
                    hover:-translate-y-1 hover:shadow-[var(--shadow-3)]
                ` : ''}
                ${isClickable ? 'cursor-pointer active:scale-[0.98] active:translate-y-0' : ''}
                ${className}
            `}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    action?: ReactNode;
    accentColor?: string;
    className?: string;
}

/**
 * Card header with title, optional subtitle, icon, and action
 * Supports accent colors for subject-specific theming
 */
export function CardHeader({
    title,
    subtitle,
    icon,
    action,
    accentColor,
    className = ''
}: CardHeaderProps) {
    return (
        <div className={`flex items-start justify-between gap-[var(--space-4)] ${className}`}>
            <div className="flex items-start gap-[var(--space-3)]">
                {icon && (
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: accentColor
                                ? `color-mix(in srgb, ${accentColor} 15%, transparent)`
                                : 'rgb(var(--text))',
                            color: accentColor || 'rgb(var(--surface-1))'
                        }}
                    >
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-[rgb(var(--text))] text-lg sm:text-xl">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-[rgb(var(--text-muted))] text-sm mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`
            flex items-center justify-end gap-[var(--space-3)]
            pt-[var(--space-4)] mt-[var(--space-4)]
            border-t border-[rgb(var(--border))]
            ${className}
        `}>
            {children}
        </div>
    );
}

/**
 * Subject-specific card with accent color
 * Uses the subject color palette from CSS variables
 */
interface SubjectCardProps extends Omit<CardProps, 'variant'> {
    subject: 'macro' | 'micro' | 'stats' | 'socio';
}

const subjectColors = {
    macro: 'var(--color-macro)',
    micro: 'var(--color-micro)',
    stats: 'var(--color-stats)',
    socio: 'var(--color-socio)',
};

export function SubjectCard({
    subject,
    children,
    className = '',
    ...props
}: SubjectCardProps) {
    const accentColor = subjectColors[subject];

    return (
        <Card
            variant="premium"
            className={`
                relative overflow-hidden
                before:absolute before:inset-0 before:opacity-[0.03]
                before:bg-[linear-gradient(135deg,${accentColor}_0%,transparent_50%)]
                ${className}
            `}
            {...props}
        >
            <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-[var(--radius-2xl)]"
                style={{ backgroundColor: accentColor }}
            />
            {children}
        </Card>
    );
}
