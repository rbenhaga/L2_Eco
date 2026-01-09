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
    default: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    gradient: 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500',
};

/**
 * Progress bar component with smooth animations
 * Great for QCM progress, reading progress, etc.
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
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-gray-600">Progression</span>
                    <span className="text-sm font-semibold text-gray-900">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <div
                    className={`
            ${sizeStyles[size]} rounded-full
            ${!color ? variantStyles[variant] : ''}
            ${animated ? 'transition-all duration-500 ease-out' : ''}
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
    default: '#3b82f6',
    success: '#22c55e',
    error: '#ef4444',
};

/**
 * Circular progress indicator - perfect for score displays
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
                    stroke="#e5e7eb"
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
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
}
