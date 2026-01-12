/**
 * Agora Premium - Primitives (Apple/Notion-grade components)
 * Enhanced with premium interactions and Apple-grade polish
 */

import React from "react";
import { motion } from "framer-motion";
import { cx } from "./helpers";
import { INTERACTION_PRESETS, SPRING } from "../../design-tokens";

export function Chip({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
    return (
        <span
            className={cx(
                "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200",
                subtle
                    ? "border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] text-[var(--color-text-muted)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] shadow-[var(--shadow-xs)]"
            )}
        >
            {children}
        </span>
    );
}

export function Kbd({ children }: { children: React.ReactNode }) {
    return (
        <kbd className="rounded-md border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)] font-medium shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]">
            {children}
        </kbd>
    );
}

export function PremiumButton({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled,
    left,
    right,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md";
    disabled?: boolean;
    left?: React.ReactNode;
    right?: React.ReactNode;
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 will-change-transform";
    const sizes = size === "sm" ? "px-3 py-2 text-sm min-h-[36px]" : "px-4 py-2.5 text-sm min-h-[44px]";

    const variants: Record<string, string> = {
        primary:
            "bg-[var(--color-accent)] text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] border border-[var(--color-accent)]",
        secondary:
            "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-base)] shadow-[var(--shadow-xs)] hover:bg-[var(--color-surface-hover)] hover:shadow-[var(--shadow-sm)]",
        ghost: "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text-base)]",
        outline:
            "border border-[var(--color-border)] bg-transparent text-[var(--color-text-base)] hover:bg-[var(--color-surface-overlay)] hover:border-[var(--color-accent)]/30",
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cx(base, sizes, variants[variant])}
            whileHover={disabled ? undefined : INTERACTION_PRESETS.buttonHover}
            whileTap={disabled ? undefined : INTERACTION_PRESETS.buttonTap}
        >
            {left}
            {children}
            {right}
        </motion.button>
    );
}

export function Surface({
    children,
    className,
    variant = "card",
    hover = false,
}: {
    children: React.ReactNode;
    className?: string;
    variant?: "card" | "panel" | "elevated" | "inset" | "glass";
    hover?: boolean;
}) {
    const radius = variant === "panel" ? "rounded-xl" : "rounded-2xl";
    
    // Borderless design: shadows define hierarchy, not borders
    const variantStyles = {
        card: {
            bg: "bg-[var(--color-surface-raised)]",
            shadow: "shadow-[var(--shadow-sm)]",
        },
        panel: {
            bg: "bg-[var(--color-surface-raised)]",
            shadow: "shadow-[var(--shadow-xs)]",
        },
        elevated: {
            bg: "bg-[var(--color-surface-raised)]",
            shadow: "shadow-[var(--shadow-md)]",
        },
        inset: {
            bg: "bg-[var(--color-surface-overlay)]",
            shadow: "shadow-none",
        },
        glass: {
            bg: "bg-[var(--color-surface-raised)]/80 backdrop-blur-xl",
            shadow: "shadow-[var(--shadow-sm)]",
        },
    };

    const styles = variantStyles[variant];

    return (
        <motion.div
            className={cx(
                "relative overflow-hidden will-change-transform",
                radius,
                styles.bg,
                styles.shadow,
                className
            )}
            whileHover={hover ? INTERACTION_PRESETS.cardHover : undefined}
        >
            {/* Top highlight for depth (card/elevated only) */}
            {(variant === "card" || variant === "elevated") && (
                <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/8 to-transparent pointer-events-none"
                    aria-hidden="true"
                />
            )}
            
            {/* Glass inner glow */}
            {variant === "glass" && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                    aria-hidden="true"
                />
            )}
            
            {children}
        </motion.div>
    );
}

export function IconPill({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.span
            className={cx(
                "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-overlay)] shadow-[var(--shadow-xs)] will-change-transform",
                className
            )}
            whileHover={INTERACTION_PRESETS.iconHover}
        >
            {children}
        </motion.span>
    );
}

export function NewBadge() {
    return (
        <motion.span
            className="inline-flex items-center rounded-lg border border-[var(--color-accent)]/20 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 px-2 py-0.5 text-xs font-semibold text-[var(--color-accent)] shadow-[var(--shadow-xs)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING.bouncy}
            whileHover={INTERACTION_PRESETS.iconBounce}
        >
            <span className="relative flex h-1.5 w-1.5 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]"></span>
            </span>
            Nouveau
        </motion.span>
    );
}
