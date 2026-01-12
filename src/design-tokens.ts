/**
 * Agora Premium - Design Tokens (Apple/Notion Grade)
 * Centralized system for animations, interactions, and premium effects
 */

/* ============================================
   SPRING ANIMATIONS (Apple-Grade Physics)
   ============================================ */
export const SPRING = {
    // Gentle - For page transitions, large movements
    gentle: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
    },
    
    // Smooth - For cards, surfaces, medium elements
    smooth: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        mass: 0.6,
    },
    
    // Snappy - For buttons, small interactions
    snappy: {
        type: "spring" as const,
        stiffness: 500,
        damping: 20,
        mass: 0.4,
    },
    
    // Bouncy - For icons, badges, playful elements
    bouncy: {
        type: "spring" as const,
        stiffness: 600,
        damping: 15,
        mass: 0.3,
    },
} as const;

/* ============================================
   INTERACTION PRESETS (Premium Micro-interactions)
   ============================================ */
export const INTERACTION_PRESETS = {
    // Button interactions
    buttonHover: {
        y: -1,
        scale: 1.02,
        transition: SPRING.snappy,
    },
    
    buttonTap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
    
    // Card interactions
    cardHover: {
        y: -4,
        scale: 1.01,
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--color-accent)/20",
        transition: SPRING.smooth,
    },
    
    cardTap: {
        scale: 0.99,
        transition: { duration: 0.1 },
    },
    
    // Icon interactions
    iconBounce: {
        scale: 1.1,
        rotate: 5,
        transition: SPRING.bouncy,
    },
    
    iconHover: {
        scale: 1.05,
        transition: SPRING.snappy,
    },
    
    // Glow effects
    glowFade: {
        opacity: 0.1,
        transition: { duration: 0.3 },
    },
    
    // Focus states
    focusRing: {
        boxShadow: "0 0 0 3px var(--color-ring), 0 0 20px rgba(0, 122, 255, 0.3)",
        transition: { duration: 0.2 },
    },
} as const;

/* ============================================
   STAGGER ANIMATIONS (List & Grid Animations)
   ============================================ */
export const STAGGER = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    },
    
    item: {
        hidden: { 
            opacity: 0, 
            y: 10,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: SPRING.smooth,
        },
    },
    
    // Faster stagger for small elements
    fast: {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.05,
                },
            },
        },
        item: {
            hidden: { opacity: 0, y: 5 },
            visible: {
                opacity: 1,
                y: 0,
                transition: SPRING.snappy,
            },
        },
    },
} as const;

/* ============================================
   PAGE TRANSITIONS (Smooth Navigation)
   ============================================ */
export const PAGE_TRANSITIONS = {
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: SPRING.gentle,
    },
    
    scaleIn: {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.04 },
        transition: SPRING.smooth,
    },
    
    slideInRight: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: SPRING.smooth,
    },
} as const;

/* ============================================
   LOADING STATES (Premium Skeletons)
   ============================================ */
export const LOADING = {
    skeleton: {
        animate: {
            backgroundPosition: ["200% 0", "-200% 0"],
        },
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
    
    spinner: {
        animate: { rotate: 360 },
        transition: {
            duration: 0.8,
            ease: "linear",
            repeat: Infinity,
        },
    },
    
    pulse: {
        animate: { opacity: [1, 0.5, 1] },
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
} as const;

/* ============================================
   FOCUS MANAGEMENT (Accessibility)
   ============================================ */
export const FOCUS = {
    ring: {
        boxShadow: "0 0 0 3px var(--color-ring), 0 0 0 1px var(--color-background)",
        borderRadius: "0.5rem",
        transition: "box-shadow 0.2s ease-out",
    },
    
    ringInset: {
        boxShadow: "inset 0 0 0 2px var(--color-ring)",
        transition: "box-shadow 0.2s ease-out",
    },
    
    glow: {
        boxShadow: "0 0 0 3px var(--color-ring), 0 0 20px rgba(0, 122, 255, 0.3)",
        transition: "box-shadow 0.2s ease-out",
    },
} as const;

/* ============================================
   RESPONSIVE BREAKPOINTS (Apple-Style)
   ============================================ */
export const BREAKPOINTS = {
    sm: 640,   // Mobile landscape
    md: 768,   // Tablet portrait
    lg: 1024,  // Tablet landscape / Small desktop
    xl: 1280,  // Desktop
    xxl: 1536, // Large desktop
} as const;

/* ============================================
   Z-INDEX SCALE (Layering System)
   ============================================ */
export const Z_INDEX = {
    background: -10,
    base: 0,
    surface: 10,
    overlay: 20,
    dropdown: 30,
    modal: 40,
    toast: 50,
    tooltip: 60,
} as const;

/* ============================================
   TIMING FUNCTIONS (Easing Curves)
   ============================================ */
export const EASING = {
    // Apple's standard easing
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    
    // Accelerated (entering)
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    
    // Decelerated (exiting)
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    
    // Sharp (quick transitions)
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    
    // Bounce (playful)
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;