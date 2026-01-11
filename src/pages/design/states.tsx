/**
 * Agora Premium - Loading & Empty States
 * Micro-interactions premium pour feedback utilisateur
 */

import React from "react";
import { motion } from "framer-motion";
import { Loader2, Inbox, Search, AlertCircle } from "lucide-react";
import { cx } from "./helpers";
import { Surface } from "./primitives";

// --- LoadingSkeleton ---
export function LoadingSkeleton({ className }: { className?: string }) {
    return (
        <motion.div
            className={cx(
                "bg-gradient-to-r from-[var(--color-surface-overlay)] via-[var(--color-surface-hover)] to-[var(--color-surface-overlay)] bg-[length:200%_100%] rounded-lg",
                className
            )}
            animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

// --- CardSkeleton ---
export function CardSkeleton() {
    return (
        <Surface className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
                <LoadingSkeleton className="h-10 w-10 rounded-2xl" />
                <div className="flex-1 space-y-3">
                    <LoadingSkeleton className="h-4 w-3/4" />
                    <LoadingSkeleton className="h-3 w-1/2" />
                    <div className="flex items-center gap-2">
                        <LoadingSkeleton className="h-3 w-20" />
                        <LoadingSkeleton className="h-5 w-12 rounded-full" />
                    </div>
                </div>
            </div>
        </Surface>
    );
}

// --- LoadingSpinner ---
export function LoadingSpinner({ size = 24 }: { size?: number }) {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <Loader2 size={size} className="text-[var(--color-accent)]" />
        </motion.div>
    );
}

// --- LoadingState ---
export function LoadingState({ message = "Chargement..." }: { message?: string }) {
    return (
        <Surface className="p-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <LoadingSpinner size={32} />
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">{message}</div>
            </div>
        </Surface>
    );
}

// --- EmptyState ---
export function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    action,
}: {
    icon?: React.ElementType;
    title: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <Surface className="p-12">
            <motion.div
                className="flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="h-16 w-16 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <Icon size={32} className="text-[var(--color-text-muted)]" />
                </motion.div>
                
                <div>
                    <div className="text-base font-semibold text-[var(--color-text-base)]">{title}</div>
                    {description && (
                        <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{description}</div>
                    )}
                </div>
                
                {action && <div className="mt-2">{action}</div>}
            </motion.div>
        </Surface>
    );
}

// --- ErrorState ---
export function ErrorState({
    title = "Une erreur est survenue",
    description,
    onRetry,
}: {
    title?: string;
    description?: string;
    onRetry?: () => void;
}) {
    return (
        <Surface className="p-12">
            <motion.div
                className="flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="h-16 w-16 rounded-2xl border border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/10 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <AlertCircle size={32} className="text-[var(--color-destructive)]" />
                </motion.div>
                
                <div>
                    <div className="text-base font-semibold text-[var(--color-text-base)]">{title}</div>
                    {description && (
                        <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{description}</div>
                    )}
                </div>
                
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-primary)]/90 transition-colors duration-200"
                    >
                        Réessayer
                    </button>
                )}
            </motion.div>
        </Surface>
    );
}

// --- SearchEmptyState ---
export function SearchEmptyState({ query }: { query: string }) {
    return (
        <EmptyState
            icon={Search}
            title="Aucun résultat"
            description={`Aucun résultat pour "${query}". Essayez avec d'autres mots-clés.`}
        />
    );
}

// --- SuccessFeedback ---
export function SuccessFeedback({ message }: { message: string }) {
    return (
        <motion.div
            className="fixed top-4 right-4 z-50 max-w-sm"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <Surface className="p-4 border-[var(--color-success)]/20 bg-[var(--color-success)]/10">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="h-8 w-8 rounded-full bg-[var(--color-success)] flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.1 }}
                    >
                        <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <motion.path
                                d="M3 8L6 11L13 4"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    </motion.div>
                    <div className="text-sm font-medium text-[var(--color-text-base)]">{message}</div>
                </div>
            </Surface>
        </motion.div>
    );
}
