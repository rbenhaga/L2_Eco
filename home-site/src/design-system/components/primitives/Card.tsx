import { ReactNode, CSSProperties } from 'react';
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
 * Design Contract v3: No hardcoded Tailwind colors - uses CSS custom properties.
 * Supports multiple visual styles and interaction states.
 */

const variantStyles: Record<string, CSSProperties> = {
    default: {
        background: 'var(--color-bg-raised)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-sm)',
    },
    outline: {
        background: 'transparent',
        border: '1px solid var(--color-border-default)',
    },
    ghost: {
        background: 'var(--color-bg-overlay)',
        border: '1px solid transparent',
    },
    glass: {
        boxShadow: 'var(--shadow-lg)',
    },
};

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

    const glassClasses = variant === 'glass' ? 'glass-effect' : '';

    const paddingClasses = {
        compact: 'p-4',
        normal: 'p-6',
        spacious: 'p-8'
    };

    const hoverClasses = hoverable
        ? 'hover:-translate-y-1'
        : '';

    const clickableClasses = clickable
        ? 'cursor-pointer active:scale-[0.98]'
        : '';

    const combinedClasses = `
    ${baseClasses}
    ${glassClasses}
    ${paddingClasses[padding]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `.trim();

    const Component = clickable || hoverable ? motion.div : 'div';

    return (
        <Component
            className={combinedClasses}
            style={variantStyles[variant]}
            onClick={onClick}
            whileHover={hoverable ? { y: -4 } : undefined}
            whileTap={clickable ? { scale: 0.98 } : undefined}
        >
            {children}
        </Component>
    );
}
