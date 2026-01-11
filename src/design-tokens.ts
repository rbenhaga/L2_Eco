/**
 * Design Tokens - Centralized Design System Variables
 * Single source of truth for all design values
 */

export const DESIGN_TOKENS = {
    colors: {
        surface: {
            base: 'var(--color-surface-base)',
            raised: 'var(--color-surface-raised)',
            overlay: 'var(--color-surface-overlay)',
            hover: 'var(--color-surface-hover)',
            soft: 'var(--color-surface-soft)',
        },
        text: {
            base: 'var(--color-text-base)',
            secondary: 'var(--color-text-secondary)',
            muted: 'var(--color-text-muted)',
            subtle: 'var(--color-text-subtle)',
        },
        border: {
            default: 'var(--color-border)',
            soft: 'var(--color-border-soft)',
        },
        accent: {
            default: 'var(--color-accent)',
            strong: 'var(--color-accent-strong)',
            foreground: 'var(--color-accent-foreground)',
        },
        primary: {
            default: 'var(--color-primary)',
            foreground: 'var(--color-primary-foreground)',
        },
        success: {
            default: 'var(--color-success)',
            foreground: 'var(--color-success-foreground)',
        },
        warning: {
            default: 'var(--color-warning)',
            foreground: 'var(--color-warning-foreground)',
        },
        destructive: {
            default: 'var(--color-destructive)',
            foreground: 'var(--color-destructive-foreground)',
        },
    },
    shadows: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
    },
    radius: {
        sm: 'var(--radius-sm)',
        default: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
    },
    spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
    },
} as const;

/**
 * Course Colors - Palette épurée (2-3 teintes principales)
 */
export const COURSE_COLORS = {
    macro: {
        base: '#3B82F6',      // Blue-500
        light: '#EFF6FF',     // Blue-50
        dark: '#1E40AF',      // Blue-800
        ring: '#60A5FA',      // Blue-400
    },
    micro: {
        base: '#8B5CF6',      // Purple-500
        light: '#F5F3FF',     // Purple-50
        dark: '#5B21B6',      // Purple-800
        ring: '#A78BFA',      // Purple-400
    },
    stats: {
        base: '#06B6D4',      // Cyan-500
        light: '#ECFEFF',     // Cyan-50
        dark: '#0E7490',      // Cyan-700
        ring: '#22D3EE',      // Cyan-400
    },
    socio: {
        base: '#EC4899',      // Pink-500
        light: '#FDF2F8',     // Pink-50
        dark: '#BE185D',      // Pink-700
        ring: '#F472B6',      // Pink-400
    },
} as const;

/**
 * Animation Presets - Uniformisation des interactions
 */
export const INTERACTION_PRESETS = {
    // Hover lift (cartes)
    cardHover: {
        y: -2,
        boxShadow: 'var(--shadow-md)',
        transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
    },
    
    // Tap scale (boutons)
    buttonTap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
    
    // Glow fade (backgrounds)
    glowFade: {
        opacity: 0.12,
        transition: { duration: 0.3 },
    },
    
    // Icon bounce
    iconBounce: {
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 17 },
    },
} as const;

/**
 * Typography Scale
 */
export const TYPOGRAPHY = {
    display: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
    },
    h1: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
    },
    h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
    },
    h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.005em',
    },
    h4: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: 0,
    },
    bodyLg: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: 0,
    },
    body: {
        fontSize: '0.9375rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: 0,
    },
    bodySm: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0,
    },
    caption: {
        fontSize: '0.8125rem',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.01em',
    },
} as const;

/**
 * Breakpoints
 */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

/**
 * Z-Index Scale
 */
export const Z_INDEX = {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
} as const;
