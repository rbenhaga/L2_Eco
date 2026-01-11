/**
 * Agora Premium - Loading Components
 * Skeleton screens, spinners, and progress indicators
 */

import { motion } from "framer-motion";
import { cx } from "./helpers";
import { SPRING } from "./animations";

/* ============================================
   SKELETON COMPONENTS
   ============================================ */

export function SkeletonText({ className, width = "100%" }: { className?: string; width?: string }) {
    return (
        <div
            className={cx("skeleton skeleton-text", className)}
            style={{ width }}
            aria-label="Loading..."
        />
    );
}

export function SkeletonCircle({ size = 40, className }: { size?: number; className?: string }) {
    return (
        <div
            className={cx("skeleton skeleton-circle", className)}
            style={{ width: size, height: size }}
            aria-label="Loading..."
        />
    );
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div
            className={cx(
                "relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 sm:p-5",
                className
            )}
        >
            <div className="flex items-start gap-3">
                <SkeletonCircle size={40} />
                <div className="min-w-0 flex-1 space-y-3">
                    <SkeletonText width="60%" />
                    <SkeletonText width="40%" />
                    <SkeletonText width="80%" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonCourseCard({ className }: { className?: string }) {
    return (
        <motion.div
            className={cx(
                "relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 sm:p-5 shadow-[var(--shadow-sm)]",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={SPRING.smooth}
        >
            <div className="flex items-start gap-3">
                <SkeletonCircle size={40} />
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <SkeletonText width="50%" />
                        <SkeletonText width="15%" />
                    </div>
                    <SkeletonText width="70%" />
                    <SkeletonText width="60%" />
                    <div className="flex items-center justify-between pt-2">
                        <SkeletonText width="30%" />
                        <SkeletonText width="20%" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ============================================
   SPINNER COMPONENTS
   ============================================ */

export function Spinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-5 h-5 border-2",
        lg: "w-8 h-8 border-3",
    };

    return (
        <div
            className={cx(
                "inline-block rounded-full border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin",
                sizeClasses[size],
                className
            )}
            role="status"
            aria-label="Loading..."
        />
    );
}

export function SpinnerOverlay({ message }: { message?: string }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-8 shadow-[var(--shadow-xl)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING.smooth}
            >
                <Spinner size="lg" />
                {message && (
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">{message}</p>
                )}
            </motion.div>
        </motion.div>
    );
}

/* ============================================
   PROGRESS BAR
   ============================================ */

export function ProgressBar({
    value,
    max = 100,
    className,
    showLabel = false,
}: {
    value: number;
    max?: number;
    className?: string;
    showLabel?: boolean;
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={cx("space-y-2", className)}>
            {showLabel && (
                <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
                    <span>Progression</span>
                    <span className="tabular-nums">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className="relative h-2 overflow-hidden rounded-full bg-[var(--color-surface-overlay)]">
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-strong)] shadow-[0_0_8px_var(--color-accent)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={SPRING.smooth}
                />
            </div>
        </div>
    );
}

/* ============================================
   LOADING STATES
   ============================================ */

export function LoadingDots({ className }: { className?: string }) {
    return (
        <div className={cx("flex items-center gap-1", className)}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}

export function PulseLoader({ className }: { className?: string }) {
    return (
        <motion.div
            className={cx(
                "h-12 w-12 rounded-full border-2 border-[var(--color-accent)] opacity-75",
                className
            )}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.75, 0.25, 0.75],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

/* ============================================
   SHIMMER EFFECT
   ============================================ */

export function ShimmerCard({ className }: { className?: string }) {
    return (
        <div
            className={cx(
                "relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 sm:p-5 shadow-[var(--shadow-sm)]",
                className
            )}
        >
            {/* Shimmer overlay */}
            <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
                }}
            />

            <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[var(--color-surface-overlay)]" />
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-3/5 rounded bg-[var(--color-surface-overlay)]" />
                    <div className="h-3 w-2/5 rounded bg-[var(--color-surface-overlay)]" />
                    <div className="h-3 w-4/5 rounded bg-[var(--color-surface-overlay)]" />
                </div>
            </div>
        </div>
    );
}
