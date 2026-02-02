interface ProgressProps {
    value: number; // 0-100
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'error' | 'gradient';
    showLabel?: boolean;
    animated?: boolean;
    className?: string;
    color?: string;
}

const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
};

const variantStyles = {
    default: 'bg-[rgb(var(--accent))]',
    success: 'bg-[var(--color-success)]',
    error: 'bg-[var(--color-destructive)]',
    gradient: 'bg-gradient-to-r from-[rgb(var(--accent))] via-[var(--color-micro)] to-[var(--color-stats)]',
};

/**
 * Progress bar component with smooth animations
 * 
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - Token-based colors
 * - Smooth animations with proper duration
 */
export function Progress({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    animated = true,
    className = '',
    color,
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-[var(--space-2)]">
                    <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">Progression</span>
                    <span className="text-sm font-semibold text-[rgb(var(--text))]">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-[rgb(var(--surface-2))] rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <div
                    className={`
            ${sizeStyles[size]} rounded-full
            ${!color ? variantStyles[variant] : ''}
            ${animated ? 'transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]' : ''}
          `}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
}

interface CircularProgressProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    variant?: 'default' | 'success' | 'error';
    showLabel?: boolean;
    className?: string;
}

const circularVariantColors = {
    default: 'rgb(var(--accent))',
    success: 'var(--color-success)',
    error: 'var(--color-destructive)',
};

/**
 * Circular progress indicator - perfect for score displays
 * 
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - Token-based colors
 * - Smooth animations
 */
export function CircularProgress({
    value,
    max = 100,
    size = 80,
    strokeWidth = 8,
    variant = 'default',
    showLabel = true,
    className = '',
}: CircularProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgb(var(--surface-2))"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={circularVariantColors[variant]}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-[var(--duration-slower)] ease-[var(--ease-default)]"
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[rgb(var(--text))]">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
}
