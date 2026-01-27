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
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        iconBg: 'bg-green-500',
        icon: CheckCircle,
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        iconBg: 'bg-red-500',
        icon: XCircle,
    },
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        iconBg: 'bg-blue-500',
        icon: Info,
    },
    warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        iconBg: 'bg-amber-500',
        icon: AlertTriangle,
    },
    neutral: {
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        text: 'text-slate-800',
        iconBg: 'bg-slate-500',
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
            className={`
                p-4 rounded-lg border
                ${config.bg}
                ${config.border}
                ${className}
            `}
        >
            {(title || icon) && (
                <div className="flex items-start gap-3 mb-3">
                    {icon !== undefined ? (
                        icon
                    ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${config.iconBg}`}>
                            <IconComponent size={14} className="text-white" />
                        </div>
                    )}
                    {title && (
                        <h4 className={`font-semibold text-sm ${config.text}`}>
                            {title}
                        </h4>
                    )}
                </div>
            )}

            <div className="text-slate-700 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
