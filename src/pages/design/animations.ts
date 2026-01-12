/**
 * Agora Premium - Animation Variants (Apple-Grade)
 * Framer Motion variants with premium physics and timing
 */

import { Variants } from "framer-motion";

/* ============================================
   SPRING CONFIGURATIONS (Apple Physics)
   ============================================ */
export const SPRING_CONFIGS = {
    gentle: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
    },
    smooth: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        mass: 0.6,
    },
    snappy: {
        type: "spring" as const,
        stiffness: 500,
        damping: 20,
        mass: 0.4,
    },
    bouncy: {
        type: "spring" as const,
        stiffness: 600,
        damping: 15,
        mass: 0.3,
    },
};

/* ============================================
   HOVER & TAP INTERACTIONS
   ============================================ */
export const hoverLift = {
    y: -2,
    scale: 1.01,
    transition: SPRING_CONFIGS.smooth,
};

export const hoverScale = {
    scale: 1.05,
    transition: SPRING_CONFIGS.snappy,
};

export const tapScale = {
    scale: 0.98,
    transition: { duration: 0.1 },
};

export const iconBounce = {
    scale: 1.1,
    rotate: 5,
    transition: SPRING_CONFIGS.bouncy,
};

/* ============================================
   ENTRANCE ANIMATIONS
   ============================================ */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const slideInUp: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: SPRING_CONFIGS.smooth,
    },
};

/* ============================================
   STAGGER ANIMATIONS
   ============================================ */
export const staggerContainer: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: SPRING_CONFIGS.smooth,
    },
};

export const staggerFast: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

export const staggerItemFast: Variants = {
    hidden: {
        opacity: 0,
        y: 5,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING_CONFIGS.snappy,
    },
};

/* ============================================
   MODAL & OVERLAY ANIMATIONS
   ============================================ */
export const modalBackdrop: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

export const modalContent: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: SPRING_CONFIGS.smooth,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

export const drawerSlide: Variants = {
    hidden: {
        x: "-100%",
    },
    visible: {
        x: 0,
        transition: SPRING_CONFIGS.smooth,
    },
    exit: {
        x: "-100%",
        transition: SPRING_CONFIGS.smooth,
    },
};

/* ============================================
   LOADING ANIMATIONS
   ============================================ */
export const pulseAnimation: Variants = {
    pulse: {
        opacity: [1, 0.5, 1],
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

export const spinAnimation: Variants = {
    spin: {
        rotate: 360,
        transition: {
            duration: 0.8,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

export const skeletonShimmer: Variants = {
    shimmer: {
        backgroundPosition: ["200% 0", "-200% 0"],
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

/* ============================================
   NAVIGATION ANIMATIONS
   ============================================ */
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: SPRING_CONFIGS.gentle,
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

export const tabTransition: Variants = {
    initial: {
        opacity: 0,
        x: 10,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: SPRING_CONFIGS.snappy,
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: {
            duration: 0.1,
            ease: "easeIn",
        },
    },
};

/* ============================================
   CARD & SURFACE ANIMATIONS
   ============================================ */
export const cardHover: Variants = {
    rest: {
        y: 0,
        scale: 1,
        boxShadow: "var(--shadow-sm)",
        borderColor: "var(--color-border)",
    },
    hover: {
        y: -4,
        scale: 1.01,
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--color-accent)/20",
        transition: SPRING_CONFIGS.smooth,
    },
    tap: {
        scale: 0.99,
        transition: { duration: 0.1 },
    },
};

export const surfaceGlow: Variants = {
    rest: {
        boxShadow: "var(--shadow-sm)",
    },
    hover: {
        boxShadow: "var(--shadow-md), 0 0 20px var(--color-accent)/10",
        transition: SPRING_CONFIGS.smooth,
    },
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
export function createStaggerVariants(
    staggerDelay = 0.08,
    childDelay = 0.1
): Variants {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: childDelay,
            },
        },
    };
}

export function createSlideVariants(
    direction: "up" | "down" | "left" | "right" = "up",
    distance = 20
): Variants {
    const getInitialPosition = () => {
        switch (direction) {
            case "up": return { y: distance };
            case "down": return { y: -distance };
            case "left": return { x: distance };
            case "right": return { x: -distance };
        }
    };

    const getFinalPosition = () => {
        switch (direction) {
            case "up":
            case "down": return { y: 0 };
            case "left":
            case "right": return { x: 0 };
        }
    };

    return {
        hidden: {
            opacity: 0,
            ...getInitialPosition(),
        },
        visible: {
            opacity: 1,
            ...getFinalPosition(),
            transition: SPRING_CONFIGS.smooth,
        },
    };
}