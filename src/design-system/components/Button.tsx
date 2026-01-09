import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'error';
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

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-gray-900 text-white 
    hover:bg-gray-800 
    active:bg-gray-950 active:scale-[0.98]
    shadow-lg shadow-gray-900/20
  `,
    secondary: `
    bg-white text-gray-900 
    border border-gray-200
    hover:bg-gray-50 hover:border-gray-300
    active:bg-gray-100 active:scale-[0.98]
    shadow-sm
  `,
    ghost: `
    bg-transparent text-gray-600
    hover:bg-gray-100 hover:text-gray-900
    active:bg-gray-200 active:scale-[0.98]
  `,
    success: `
    bg-green-600 text-white
    hover:bg-green-700
    active:bg-green-800 active:scale-[0.98]
    shadow-lg shadow-green-600/20
  `,
    error: `
    bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800 active:scale-[0.98]
    shadow-lg shadow-red-600/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-lg',
    md: 'px-4 py-2.5 text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3.5 text-base gap-2.5 rounded-xl',
};

/**
 * Premium Button component with variants, sizes, and loading state
 * Mobile-first with touch-friendly sizing (min 44px touch target)
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
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        min-h-[44px]
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
