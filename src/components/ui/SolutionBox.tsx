/**
 * Centralized SolutionBox Component
 * Light-first design (study-grade)
 */

import { CheckCircle, XCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

export type SolutionBoxVariant = 'success' | 'error' | 'info' | 'warning' | 'neutral';

interface SolutionBoxProps {
    variant?: SolutionBoxVariant;
    title?: string;
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
}

const variantConfig = {
    success: {
        bgColor: 'var(--color-success-subtle)',
        borderColor: 'var(--color-success)',
        textColor: 'var(--color-success)',
        iconBgColor: 'var(--color-success)',
        icon: CheckCircle,
    },
    error: {
        bgColor: 'var(--color-error-subtle)',
        borderColor: 'var(--color-error)',
        textColor: 'var(--color-error)',
        iconBgColor: 'var(--color-error)',
        icon: XCircle,
    },
    info: {
        bgColor: 'var(--color-info-subtle)',
        borderColor: 'var(--color-info)',
        textColor: 'var(--color-info)',
        iconBgColor: 'var(--color-info)',
        icon: Info,
    },
    warning: {
        bgColor: 'var(--color-warning-subtle)',
        borderColor: 'var(--color-warning)',
        textColor: 'var(--color-warning)',
        iconBgColor: 'var(--color-warning)',
        icon: AlertTriangle,
    },
    neutral: {
        bgColor: 'var(--color-bg-overlay)',
        borderColor: 'var(--color-border-default)',
        textColor: 'var(--color-text-primary)',
        iconBgColor: 'var(--color-text-muted)',
        icon: Lightbulb,
    },
};

export function SolutionBox({
    variant = 'neutral',
    title,
    children,
    icon,
    className = '',
}: SolutionBoxProps) {
    const config = variantConfig[variant];
    const IconComponent = config.icon;

    return (
        <div
            className={`p-4 rounded-lg border ${className}`}
            style={{
                background: config.bgColor,
                borderColor: config.borderColor,
            }}
        >
            {(title || icon) && (
                <div className="flex items-start gap-3 mb-3">
                    {icon !== undefined ? (
                        icon
                    ) : (
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: config.iconBgColor }}
                        >
                            <IconComponent size={14} style={{ color: 'var(--color-accent-foreground)' }} />
                        </div>
                    )}
                    {title && (
                        <h4 className="font-semibold text-sm" style={{ color: config.textColor }}>
                            {title}
                        </h4>
                    )}
                </div>
            )}

            <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {children}
            </div>
        </div>
    );
}
