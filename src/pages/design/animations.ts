/**
 * Agora Premium - Animation Presets (Framer Motion)
 * Apple-grade spring animations and transitions
 */

import type { Transition, Variants } from "framer-motion";

/* ============================================
   SPRING PRESETS (Apple-Grade)
   ============================================ */

export const SPRING = {
    // Snappy (buttons, small elements)
    snappy: {
        type: "spring" as const,
        stiffness: 400,
        damping: 17,
        mass: 0.5,
    },
    // Smooth (cards, modals)
    smooth: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        mass: 0.8,
    },
    // Bouncy (playful interactions)
    bouncy: {
        type: "spring" as const,
        stiffness: 500,
        damping: 15,
        mass: 0.6,
    },
    // Gentle (large elements, page transitions)
    gentle: {
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
        mass: 1,
    },
} as const;

/* ============================================
   EASING PRESETS (Cubic Bezier)
   ============================================ */

export const EASING = {
    // Apple standard easing
    apple: [0.4, 0, 0.2, 1] as [number, number, number, number],
    // Ease out (most common)
    easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
    // Ease in out
    easeInOut: [0.4, 0, 0.6, 1] as [number, number, number, number],
    // Sharp (quick actions)
    sharp: [0.4, 0, 1, 1] as [number, number, number, number],
} as const;

/* ============================================
   ANIMATION VARIANTS
   ============================================ */

// Fade In (simple)
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

// Fade In Up (cards, content)
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Fade In Down (dropdowns, tooltips)
export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

// Scale In (modals, popovers)
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

// Slide In Right (drawers, sidebars)
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

// Slide In Left
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

/* ============================================
   STAGGER CONTAINER
   ============================================ */

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING.smooth,
    },
};

/* ============================================
   HOVER/TAP ANIMATIONS
   ============================================ */

export const hoverLift = {
    scale: 1.02,
    y: -2,
    transition: SPRING.snappy,
};

export const hoverScale = {
    scale: 1.05,
    transition: SPRING.snappy,
};

export const tapScale = {
    scale: 0.98,
    transition: SPRING.snappy,
};

/* ============================================
   PAGE TRANSITIONS
   ============================================ */

export const pageTransition: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    mass: 0.8,
};

export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Create stagger delay for list items
export function getStaggerDelay(index: number, baseDelay = 0.05): number {
    return index * baseDelay;
}

// Create transition with custom duration
export function createTransition(duration: number, easing = EASING.apple): Transition {
    return {
        duration,
        ease: easing,
    };
}
