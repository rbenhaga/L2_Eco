import { type ReactNode } from 'react';
import { AlertCircle, WifiOff, ServerCrash, FileX, RefreshCw, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

type ErrorType = 'generic' | 'network' | 'server' | 'notFound' | 'custom';

interface ErrorStateProps {
    /** Type of error for appropriate messaging */
    type?: ErrorType;
    /** Custom icon (overrides type icon) */
    icon?: LucideIcon;
    /** Error title */
    title?: string;
    /** Error message/description */
    message?: string;
    /** Technical error details (shown in smaller text) */
    details?: string;
    /** Retry action */
    onRetry?: () => void;
    /** Custom retry label */
    retryLabel?: string;
    /** Secondary action */
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    /** Is retrying in progress */
    isRetrying?: boolean;
    /** Custom content */
    children?: ReactNode;
    /** Additional class names */
    className?: string;
}

const errorConfig: Record<ErrorType, {
    icon: LucideIcon;
    title: string;
    message: string;
}> = {
    generic: {
        icon: AlertCircle,
        title: "Une erreur s'est produite",
        message: "Quelque chose n'a pas fonctionné. Réessayez dans quelques instants.",
    },
    network: {
        icon: WifiOff,
        title: "Problème de connexion",
        message: "Vérifiez votre connexion internet et réessayez.",
    },
    server: {
        icon: ServerCrash,
        title: "Erreur du serveur",
        message: "Nos serveurs rencontrent un problème. Réessayez plus tard.",
    },
    notFound: {
        icon: FileX,
        title: "Contenu introuvable",
        message: "Cette page n'existe pas ou a été déplacée.",
    },
    custom: {
        icon: AlertCircle,
        title: "Erreur",
        message: "",
    },
};

/**
 * Error State component for displaying errors with retry functionality
 *
 * Design Contract v3 compliant:
 * - Uses CSS custom properties
 * - Clear error messaging (no technical jargon)
 * - Always provides retry when applicable
 * - Accessible
 *
 * UX_SPEC.md pattern:
 * - Icône d'erreur visible
 * - Message compréhensible
 * - Suggestion de solution
 * - Bouton retry TOUJOURS présent si applicable
 */
export function ErrorState({
    type = 'generic',
    icon: CustomIcon,
    title,
    message,
    details,
    onRetry,
    retryLabel = "Réessayer",
    secondaryAction,
    isRetrying = false,
    children,
    className = ''
}: ErrorStateProps) {
    const config = errorConfig[type];
    const IconComponent = CustomIcon || config.icon;
    const displayTitle = title || config.title;
    const displayMessage = message || config.message;

    return (
        <div
            className={`
                flex flex-col items-center justify-center
                text-center
                py-[var(--space-12)] px-[var(--space-6)]
                ${className}
            `}
            role="alert"
            aria-live="assertive"
        >
            {/* Icon */}
            <div
                className="
                    w-16 h-16 sm:w-20 sm:h-20
                    rounded-[var(--radius-2xl)]
                    flex items-center justify-center
                    mb-[var(--space-6)]
                    bg-[var(--color-error-subtle,rgba(239,68,68,0.1))]
                "
            >
                <IconComponent
                    className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-destructive)]"
                    strokeWidth={1.5}
                />
            </div>

            {/* Title */}
            <h3 className="
                text-lg sm:text-xl font-semibold
                text-[rgb(var(--text))]
                mb-[var(--space-2)]
            ">
                {displayTitle}
            </h3>

            {/* Message */}
            {displayMessage && (
                <p className="
                    text-sm sm:text-base
                    text-[rgb(var(--text-secondary))]
                    max-w-sm
                    leading-relaxed
                ">
                    {displayMessage}
                </p>
            )}

            {/* Technical details (collapsed by default in production) */}
            {details && (
                <details className="
                    mt-[var(--space-4)]
                    text-xs text-[rgb(var(--text-muted))]
                    max-w-md
                ">
                    <summary className="cursor-pointer hover:text-[rgb(var(--text-secondary))]">
                        Détails techniques
                    </summary>
                    <pre className="
                        mt-[var(--space-2)]
                        p-[var(--space-3)]
                        bg-[rgb(var(--surface-2))]
                        rounded-[var(--radius-sm)]
                        overflow-x-auto
                        text-left
                    ">
                        {details}
                    </pre>
                </details>
            )}

            {/* Custom content */}
            {children && (
                <div className="mt-[var(--space-4)]">
                    {children}
                </div>
            )}

            {/* Actions */}
            {(onRetry || secondaryAction) && (
                <div className="
                    flex flex-col sm:flex-row items-center
                    gap-[var(--space-3)]
                    mt-[var(--space-6)]
                ">
                    {onRetry && (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={onRetry}
                            isLoading={isRetrying}
                            leftIcon={!isRetrying && <RefreshCw className="w-4 h-4" />}
                        >
                            {retryLabel}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={secondaryAction.onClick}
                            disabled={isRetrying}
                        >
                            {secondaryAction.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Inline error message for forms and smaller contexts
 */
interface InlineErrorProps {
    message: string;
    className?: string;
}

export function InlineError({ message, className = '' }: InlineErrorProps) {
    return (
        <div
            className={`
                flex items-center gap-[var(--space-2)]
                text-sm text-[var(--color-destructive)]
                ${className}
            `}
            role="alert"
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
        </div>
    );
}

/**
 * Error boundary fallback component
 */
interface ErrorBoundaryFallbackProps {
    error: Error;
    resetErrorBoundary?: () => void;
}

export function ErrorBoundaryFallback({
    error,
    resetErrorBoundary
}: ErrorBoundaryFallbackProps) {
    return (
        <ErrorState
            type="generic"
            title="Oups, quelque chose s'est mal passé"
            message="L'application a rencontré une erreur inattendue."
            details={error.message}
            onRetry={resetErrorBoundary}
            retryLabel="Recharger"
            secondaryAction={{
                label: "Retour à l'accueil",
                onClick: () => window.location.href = '/'
            }}
        />
    );
}
