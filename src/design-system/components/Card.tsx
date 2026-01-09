import { type ReactNode, type HTMLAttributes } from 'react';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white border border-gray-100',
    elevated: 'bg-white shadow-lg shadow-gray-200/50',
    outlined: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl',
};

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
};

/**
 * Premium Card component with multiple variants
 * Supports glassmorphism effect and hover animations
 */
export function Card({
    variant = 'default',
    padding = 'md',
    hover = false,
    children,
    className = '',
    ...props
}: CardProps) {
    return (
        <div
            className={`
        rounded-2xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? 'transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:border-gray-200' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
}

/**
 * Card header with title, optional subtitle, icon, and action
 */
export function CardHeader({ title, subtitle, icon, action, className = '' }: CardHeaderProps) {
    return (
        <div className={`flex items-start justify-between gap-4 ${className}`}>
            <div className="flex items-start gap-3">
                {icon && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">{title}</h3>
                    {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
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
        <div className={`flex items-center justify-end gap-3 pt-4 mt-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}
