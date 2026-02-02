import { type ReactNode } from 'react';
import { BookOpen, Search, FileQuestion, Inbox, Zap, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

type EmptyStateVariant = 'default' | 'search' | 'course' | 'qcm' | 'inbox';

interface EmptyStateProps {
    /** Predefined variant with icon and default text */
    variant?: EmptyStateVariant;
    /** Custom icon (overrides variant icon) */
    icon?: LucideIcon;
    /** Main title */
    title: string;
    /** Description text */
    description?: string;
    /** Primary action button */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Secondary action (link style) */
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    /** Custom content below description */
    children?: ReactNode;
    /** Additional class names */
    className?: string;
}

const variantConfig: Record<EmptyStateVariant, {
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
}> = {
    default: {
        icon: Inbox,
        iconColor: 'rgb(var(--text-muted))',
        iconBg: 'rgb(var(--surface-2))',
    },
    search: {
        icon: Search,
        iconColor: 'rgb(var(--accent))',
        iconBg: 'rgb(var(--accent) / 0.1)',
    },
    course: {
        icon: BookOpen,
        iconColor: 'var(--color-macro)',
        iconBg: 'var(--color-macro-light)',
    },
    qcm: {
        icon: Zap,
        iconColor: 'var(--color-warning)',
        iconBg: 'rgba(245, 158, 11, 0.1)',
    },
    inbox: {
        icon: FileQuestion,
        iconColor: 'rgb(var(--text-secondary))',
        iconBg: 'rgb(var(--surface-2))',
    },
};

/**
 * Empty State component for when there's no data to display
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - Clear visual hierarchy
 * - Actionable with CTA buttons
 * - Accessible
 *
 * UX_SPEC.md pattern:
 * - Illustration or icon contextuelle
 * - Message explicatif (pas juste "Vide")
 * - CTA vers l'action suivante
 */
export function EmptyState({
    variant = 'default',
    icon: CustomIcon,
    title,
    description,
    action,
    secondaryAction,
    children,
    className = ''
}: EmptyStateProps) {
    const config = variantConfig[variant];
    const IconComponent = CustomIcon || config.icon;

    return (
        <div
            className={`
                flex flex-col items-center justify-center
                text-center
                py-[var(--space-12)] px-[var(--space-6)]
                ${className}
            `}
            role="status"
            aria-label={title}
        >
            {/* Icon */}
            <div
                className="
                    w-16 h-16 sm:w-20 sm:h-20
                    rounded-[var(--radius-2xl)]
                    flex items-center justify-center
                    mb-[var(--space-6)]
                "
                style={{
                    backgroundColor: config.iconBg,
                    color: config.iconColor
                }}
            >
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="
                text-lg sm:text-xl font-semibold
                text-[rgb(var(--text))]
                mb-[var(--space-2)]
            ">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="
                    text-sm sm:text-base
                    text-[rgb(var(--text-secondary))]
                    max-w-sm
                    leading-relaxed
                ">
                    {description}
                </p>
            )}

            {/* Custom content */}
            {children && (
                <div className="mt-[var(--space-4)]">
                    {children}
                </div>
            )}

            {/* Actions */}
            {(action || secondaryAction) && (
                <div className="
                    flex flex-col sm:flex-row items-center
                    gap-[var(--space-3)]
                    mt-[var(--space-6)]
                ">
                    {action && (
                        <Button
                            variant="accent"
                            size="md"
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={secondaryAction.onClick}
                        >
                            {secondaryAction.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Preset empty states for common use cases
 */

export function EmptySearchResults({
    query,
    onClear,
    className = ''
}: {
    query: string;
    onClear: () => void;
    className?: string;
}) {
    return (
        <EmptyState
            variant="search"
            title={`Aucun résultat pour "${query}"`}
            description="Essayez d'autres termes ou vérifiez l'orthographe."
            action={{
                label: "Effacer la recherche",
                onClick: onClear
            }}
            className={className}
        />
    );
}

export function EmptyCourseProgress({
    onStart,
    className = ''
}: {
    onStart: () => void;
    className?: string;
}) {
    return (
        <EmptyState
            variant="course"
            title="Commencez votre parcours"
            description="Choisissez une matière pour débuter votre révision."
            action={{
                label: "Voir les matières",
                onClick: onStart
            }}
            className={className}
        />
    );
}

export function EmptyQCMAttempts({
    onStart,
    className = ''
}: {
    onStart: () => void;
    className?: string;
}) {
    return (
        <EmptyState
            variant="qcm"
            title="Prêt à tester vos connaissances ?"
            description="Les QCM vous aident à valider votre compréhension."
            action={{
                label: "Commencer un QCM",
                onClick: onStart
            }}
            className={className}
        />
    );
}
