import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
    children: ReactNode;
    variant?: 'default' | 'outline' | 'ghost' | 'glass';
    padding?: 'compact' | 'normal' | 'spacious';
    hoverable?: boolean;
    clickable?: boolean;
    className?: string;
    onClick?: () => void;
}

/**
 * Card - Reusable card component with variants
 * 
 * Designed for consistency across all content types (cours, QCM, TD, etc.)
 * Supports multiple visual styles and interaction states.
 */
export function Card({
    children,
    variant = 'default',
    padding = 'normal',
    hoverable = false,
    clickable = false,
    className = '',
    onClick
}: CardProps) {

    const baseClasses = 'rounded-2xl transition-all duration-300';

    const variantClasses = {
        default: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm',
        outline: 'bg-transparent border border-slate-300 dark:border-white/20',
        ghost: 'bg-slate-50/50 dark:bg-slate-800/50 border border-transparent',
        glass: 'glass-effect shadow-lg'
    };

    const paddingClasses = {
        compact: 'p-4',
        normal: 'p-6',
        spacious: 'p-8'
    };

    const hoverClasses = hoverable
        ? 'hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 dark:hover:border-white/30'
        : '';

    const clickableClasses = clickable
        ? 'cursor-pointer active:scale-[0.98]'
        : '';

    const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `.trim();

    const Component = clickable || hoverable ? motion.div : 'div';

    return (
        <Component
            className={combinedClasses}
            onClick={onClick}
            whileHover={hoverable ? { y: -4 } : undefined}
            whileTap={clickable ? { scale: 0.98 } : undefined}
        >
            {children}
        </Component>
    );
}
