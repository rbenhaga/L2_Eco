import { ReactNode, CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ContentSectionProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    badge?: {
        text: string;
        variant?: 'default' | 'success' | 'warning' | 'info';
    };
    children: ReactNode;
    className?: string;
}

/**
 * ContentSection - Standardized section header with content
 *
 * Design Contract v3: No hardcoded Tailwind colors - uses CSS custom properties.
 * Used throughout the app for consistent section styling in cours, TD, QCM pages.
 * Provides icon + title + description pattern with optional badge.
 */

const badgeVariantStyles: Record<string, CSSProperties> = {
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
    info: {
        background: 'var(--color-info-subtle)',
        color: 'var(--color-info)',
    },
};

export function ContentSection({
    icon: Icon,
    title,
    description,
    badge,
    children,
    className = ''
}: ContentSectionProps) {

    return (
        <section className={`space-y-6 ${className}`}>
            {/* Section Header */}
            <div className="flex items-start gap-4">
                {Icon && (
                    <div
                        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                            background: 'var(--color-accent-subtle)',
                        }}
                    >
                        <Icon
                            className="w-6 h-6"
                            style={{ color: 'var(--color-accent)' }}
                        />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2
                            className="text-2xl font-bold"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {title}
                        </h2>
                        {badge && (
                            <span
                                className="px-2.5 py-1 text-xs font-semibold rounded-full"
                                style={badgeVariantStyles[badge.variant || 'default']}
                            >
                                {badge.text}
                            </span>
                        )}
                    </div>

                    {description && (
                        <p
                            className="mt-1 text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Section Content */}
            <div>
                {children}
            </div>
        </section>
    );
}
