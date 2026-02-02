import { type HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Width - can be Tailwind class or CSS value */
    width?: string;
    /** Height - can be Tailwind class or CSS value */
    height?: string;
    /** Border radius variant */
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Animate the shimmer effect */
    animate?: boolean;
}

const radiusStyles = {
    none: '',
    sm: 'rounded-[var(--radius-sm)]',
    md: 'rounded-[var(--radius-md)]',
    lg: 'rounded-[var(--radius-lg)]',
    xl: 'rounded-[var(--radius-2xl)]',
    full: 'rounded-full',
};

/**
 * Skeleton loading placeholder
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - Shimmer animation defined in index.css
 * - Respects reduced motion
 */
export function Skeleton({
    width,
    height,
    radius = 'md',
    animate = true,
    className = '',
    style,
    ...props
}: SkeletonProps) {
    return (
        <div
            className={`
                bg-[rgb(var(--surface-2))]
                ${radiusStyles[radius]}
                ${animate ? 'skeleton' : ''}
                ${width || ''}
                ${height || ''}
                ${className}
            `}
            style={{
                width: width?.startsWith('w-') ? undefined : width,
                height: height?.startsWith('h-') ? undefined : height,
                ...style
            }}
            aria-hidden="true"
            {...props}
        />
    );
}

/**
 * Skeleton for text content
 */
interface SkeletonTextProps {
    lines?: number;
    lastLineWidth?: string;
    className?: string;
}

export function SkeletonText({
    lines = 3,
    lastLineWidth = '60%',
    className = ''
}: SkeletonTextProps) {
    return (
        <div className={`space-y-[var(--space-2)] ${className}`} aria-hidden="true">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    height="h-4"
                    width={i === lines - 1 ? lastLineWidth : '100%'}
                    radius="sm"
                />
            ))}
        </div>
    );
}

/**
 * Skeleton for avatar/profile images
 */
interface SkeletonAvatarProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const avatarSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
};

export function SkeletonAvatar({ size = 'md', className = '' }: SkeletonAvatarProps) {
    return (
        <Skeleton
            className={`${avatarSizes[size]} ${className}`}
            radius="full"
        />
    );
}

/**
 * Skeleton for cards - matches Card component structure
 */
interface SkeletonCardProps {
    showHeader?: boolean;
    showFooter?: boolean;
    lines?: number;
    className?: string;
}

export function SkeletonCard({
    showHeader = true,
    showFooter = false,
    lines = 3,
    className = ''
}: SkeletonCardProps) {
    return (
        <div
            className={`
                rounded-[var(--radius-2xl)]
                bg-[rgb(var(--surface-1))]
                border border-[rgb(var(--border))]
                shadow-[var(--shadow-1)]
                p-[var(--space-6)]
                ${className}
            `}
            aria-hidden="true"
        >
            {showHeader && (
                <div className="flex items-start gap-[var(--space-3)] mb-[var(--space-4)]">
                    <SkeletonAvatar size="lg" />
                    <div className="flex-1 space-y-[var(--space-2)]">
                        <Skeleton height="h-5" width="60%" radius="sm" />
                        <Skeleton height="h-4" width="40%" radius="sm" />
                    </div>
                </div>
            )}

            <SkeletonText lines={lines} />

            {showFooter && (
                <div className="flex justify-end gap-[var(--space-3)] mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[rgb(var(--border))]">
                    <Skeleton height="h-9" width="w-20" radius="md" />
                    <Skeleton height="h-9" width="w-24" radius="md" />
                </div>
            )}
        </div>
    );
}

/**
 * Skeleton for list items
 */
interface SkeletonListProps {
    count?: number;
    showIcon?: boolean;
    className?: string;
}

export function SkeletonList({
    count = 5,
    showIcon = true,
    className = ''
}: SkeletonListProps) {
    return (
        <div className={`space-y-[var(--space-3)] ${className}`} aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="
                        flex items-center gap-[var(--space-3)]
                        p-[var(--space-3)]
                        rounded-[var(--radius-md)]
                        bg-[rgb(var(--surface-1))]
                        border border-[rgb(var(--border))]
                    "
                >
                    {showIcon && <Skeleton className="w-10 h-10" radius="md" />}
                    <div className="flex-1 space-y-[var(--space-2)]">
                        <Skeleton height="h-4" width="70%" radius="sm" />
                        <Skeleton height="h-3" width="50%" radius="sm" />
                    </div>
                </div>
            ))}
        </div>
    );
}
