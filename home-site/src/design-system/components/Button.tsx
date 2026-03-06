import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'error' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
    children: ReactNode;
}

/**
 * Button variants using CSS custom properties (Design Contract v3)
 * - No hardcoded Tailwind colors
 * - Uses --shadow-* tokens
 * - 8px spacing grid
 */
const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-[rgb(var(--text))] text-[rgb(var(--surface-1))]
        hover:bg-[rgb(var(--text)/0.85)] hover:-translate-y-px
        active:scale-[0.98] active:translate-y-0
        shadow-[var(--shadow-2)]
        hover:shadow-[var(--shadow-3)]
    `,
    secondary: `
        bg-[rgb(var(--surface-1))] text-[rgb(var(--text))]
        border border-[rgb(var(--border))]
        hover:bg-[rgb(var(--surface-2))] hover:border-[rgb(var(--border-strong))] hover:-translate-y-px
        active:scale-[0.98] active:translate-y-0
        shadow-[var(--shadow-1)]
    `,
    ghost: `
        bg-transparent text-[rgb(var(--text-secondary))]
        hover:bg-[rgb(var(--surface-2))] hover:text-[rgb(var(--text))]
        active:bg-[rgb(var(--surface-3))] active:scale-[0.98]
    `,
    success: `
        bg-[var(--color-success)] text-[var(--color-accent-foreground)]
        hover:brightness-110 hover:-translate-y-px
        active:brightness-90 active:scale-[0.98]
        shadow-[0_4px_14px_rgb(var(--color-success)/0.25)]
    `,
    error: `
        bg-[var(--color-destructive)] text-[var(--color-accent-foreground)]
        hover:brightness-110 hover:-translate-y-px
        active:brightness-90 active:scale-[0.98]
        shadow-[0_4px_14px_rgb(var(--color-destructive)/0.25)]
    `,
    accent: `
        bg-[rgb(var(--accent))] text-[var(--color-accent-foreground)]
        hover:bg-[rgb(var(--accent-hover))] hover:-translate-y-px
        active:scale-[0.98] active:translate-y-0
        shadow-[0_4px_14px_rgb(var(--accent)/0.3)]
        hover:shadow-[0_8px_20px_rgb(var(--accent)/0.35)]
    `,
};

/**
 * Size styles using 8px grid spacing
 * - sm: 8px vertical, compact
 * - md: 12px vertical, standard (default)
 * - lg: 16px vertical, prominent
 */
const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-[var(--space-3)] py-[var(--space-2)] text-sm gap-[var(--space-2)] rounded-[var(--radius-sm)]',
    md: 'px-[var(--space-4)] py-[var(--space-3)] text-sm gap-[var(--space-2)] rounded-[var(--radius-md)]',
    lg: 'px-[var(--space-6)] py-[var(--space-4)] text-base gap-[var(--space-3)] rounded-[var(--radius-md)]',
};

/**
 * Premium Button component with variants, sizes, and loading state
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties (no hardcoded colors)
 * - 8px spacing grid
 * - Tokens for shadows and radius
 * - Touch-friendly (min 44px)
 * - Accessible focus states
 */
export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    return (
        <button
            className={`
                inline-flex items-center justify-center
                font-medium
                transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--ring))]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
                min-h-[var(--touch-target,44px)]
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : leftIcon ? (
                <span className="shrink-0">{leftIcon}</span>
            ) : null}

            <span>{children}</span>

            {rightIcon && !isLoading && (
                <span className="shrink-0">{rightIcon}</span>
            )}
        </button>
    );
}
