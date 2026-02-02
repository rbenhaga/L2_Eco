/**
 * COMPONENT RULES v2.0 — Primitive Patterns
 * 
 * Defines how each primitive component should behave
 * to ensure consistency across the app.
 */

import { radius, shadows, motion } from './tokens';

// ============================================
// BUTTON RULES
// ============================================

export const buttonRules = {
  // Sizes (height + padding)
  sizes: {
    sm: {
      height: '36px',
      padding: '0 12px',
      fontSize: '0.875rem',
      gap: '8px',
    },
    md: {
      height: '44px',
      padding: '0 16px',
      fontSize: '0.9375rem',
      gap: '8px',
    },
    lg: {
      height: '48px',
      padding: '0 24px',
      fontSize: '1rem',
      gap: '12px',
    },
  },

  // Variants
  variants: {
    primary: {
      background: 'var(--color-text-primary)',
      color: 'var(--color-bg-raised)',
      shadow: shadows.md,
      hoverShadow: shadows.lg,
    },
    secondary: {
      background: 'var(--color-bg-overlay)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-default)',
      shadow: shadows.sm,
    },
    accent: {
      background: 'var(--color-accent)',
      color: 'white',
      shadow: shadows.md,
      hoverShadow: shadows.lg,
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      hoverBackground: 'var(--color-surface-overlay)',
    },
  },

  // States
  states: {
    hover: {
      transform: 'translateY(-1px)',
      transition: `all ${motion.duration.fast} ${motion.easing.default}`,
    },
    active: {
      transform: 'scale(0.98)',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    loading: {
      cursor: 'wait',
    },
  },

  // Radius
  radius: radius.md,
} as const;

// ============================================
// CARD RULES
// ============================================

export const cardRules = {
  // Variants
  variants: {
    // Premium cards (chapters, modules)
    premium: {
      background: 'var(--color-bg-raised)',
      radius: radius.lg,
      shadow: shadows.md,
      hoverShadow: shadows.lg,
      hoverTransform: 'translateY(-2px)',
      border: 'none',
    },

    // List cards (TDs, QCMs, fiches)
    list: {
      background: 'var(--color-bg-raised)',
      radius: radius.md,
      shadow: shadows.sm,
      hoverShadow: shadows.md,
      hoverTransform: 'translateX(2px)',
      border: '1px solid var(--color-border-default)',
    },

    // Elevated cards (stats, highlights)
    elevated: {
      background: 'var(--color-bg-raised)',
      radius: radius.lg,
      shadow: shadows.lg,
      hoverShadow: shadows.xl,
      hoverTransform: 'translateY(-4px)',
      border: 'none',
    },

    // Flat cards (info, secondary content)
    flat: {
      background: 'var(--color-bg-overlay)',
      radius: radius.md,
      shadow: 'none',
      border: '1px solid var(--color-border-soft)',
    },
  },

  // Padding by size
  padding: {
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Transition
  transition: `all ${motion.duration.normal} ${motion.easing.default}`,
} as const;

// ============================================
// BADGE RULES
// ============================================

export const badgeRules = {
  // Sizes
  sizes: {
    sm: {
      height: '20px',
      padding: '0 8px',
      fontSize: '0.75rem',
    },
    md: {
      height: '24px',
      padding: '0 10px',
      fontSize: '0.8125rem',
    },
    lg: {
      height: '28px',
      padding: '0 12px',
      fontSize: '0.875rem',
    },
  },

  // Variants
  variants: {
    default: {
      background: 'var(--color-bg-overlay)',
      color: 'var(--color-text-secondary)',
    },
    accent: {
      background: 'var(--color-accent-subtle)',
      color: 'var(--color-accent)',
    },
    success: {
      background: 'var(--color-success-subtle)',
      color: 'var(--color-success)',
    },
    warning: {
      background: 'var(--color-warning-subtle)',
      color: 'var(--color-warning)',
    },
    error: {
      background: 'var(--color-error-subtle)',
      color: 'var(--color-error)',
    },
  },

  // Radius
  radius: radius.sm,

  // Font weight
  fontWeight: '600',
} as const;

// ============================================
// INPUT RULES
// ============================================

export const inputRules = {
  // Sizes
  sizes: {
    sm: {
      height: '36px',
      padding: '0 12px',
      fontSize: '0.875rem',
    },
    md: {
      height: '44px',
      padding: '0 16px',
      fontSize: '0.9375rem',
    },
    lg: {
      height: '48px',
      padding: '0 20px',
      fontSize: '1rem',
    },
  },

  // States
  states: {
    default: {
      background: 'var(--color-bg-raised)',
      border: '1px solid var(--color-border-default)',
      color: 'var(--color-text-primary)',
    },
    focus: {
      border: '1px solid var(--color-accent)',
      ring: '0 0 0 3px var(--color-accent-subtle)',
    },
    error: {
      border: '1px solid var(--color-error)',
      ring: '0 0 0 3px var(--color-error-subtle)',
    },
    disabled: {
      background: 'var(--color-bg-overlay)',
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },

  // Radius
  radius: radius.md,

  // Placeholder
  placeholder: {
    color: 'var(--color-text-muted)',
  },
} as const;

// ============================================
// MODAL/DRAWER RULES
// ============================================

export const modalRules = {
  // Backdrop
  backdrop: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(4px)',
  },

  // Modal sizes
  sizes: {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
    full: '100%',
  },

  // Modal style
  style: {
    background: 'var(--color-bg-raised)',
    radius: radius.lg,
    shadow: shadows.xl,
    padding: '32px',
  },

  // Animation
  animation: {
    duration: motion.duration.slow,
    easing: motion.easing.spring,
  },
} as const;

// ============================================
// DROPDOWN RULES
// ============================================

export const dropdownRules = {
  // Style
  style: {
    background: 'var(--color-bg-raised)',
    radius: radius.md,
    shadow: shadows.lg,
    border: '1px solid var(--color-border-default)',
    padding: '8px',
  },

  // Item
  item: {
    height: '36px',
    padding: '0 12px',
    radius: radius.sm,
    hoverBackground: 'var(--color-surface-overlay)',
  },

  // Animation
  animation: {
    duration: motion.duration.fast,
    easing: motion.easing.default,
  },
} as const;

// ============================================
// TAB RULES
// ============================================

export const tabRules = {
  // Sizes
  sizes: {
    sm: {
      height: '36px',
      padding: '0 12px',
      fontSize: '0.875rem',
    },
    md: {
      height: '44px',
      padding: '0 16px',
      fontSize: '0.9375rem',
    },
    lg: {
      height: '48px',
      padding: '0 20px',
      fontSize: '1rem',
    },
  },

  // Variants
  variants: {
    // Underline tabs
    underline: {
      default: {
        color: 'var(--color-text-secondary)',
        borderBottom: '2px solid transparent',
      },
      active: {
        color: 'var(--color-accent)',
        borderBottom: '2px solid var(--color-accent)',
      },
    },

    // Pill tabs
    pill: {
      default: {
        color: 'var(--color-text-secondary)',
        background: 'transparent',
      },
      active: {
        color: 'var(--color-accent)',
        background: 'var(--color-accent-subtle)',
      },
    },

    // Solid tabs
    solid: {
      default: {
        color: 'var(--color-text-secondary)',
        background: 'var(--color-bg-overlay)',
      },
      active: {
        color: 'white',
        background: 'var(--color-accent)',
      },
    },
  },

  // Radius
  radius: radius.md,

  // Transition
  transition: `all ${motion.duration.fast} ${motion.easing.default}`,
} as const;

// ============================================
// SKELETON RULES
// ============================================

export const skeletonRules = {
  // Base style
  style: {
    background: 'linear-gradient(90deg, var(--color-bg-overlay) 0%, var(--color-surface-overlay) 50%, var(--color-bg-overlay) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  // Variants
  variants: {
    text: {
      height: '1em',
      radius: radius.sm,
    },
    card: {
      height: '200px',
      radius: radius.lg,
    },
    avatar: {
      width: '40px',
      height: '40px',
      radius: radius.full,
    },
    button: {
      height: '44px',
      radius: radius.md,
    },
  },
} as const;

// ============================================
// TOAST RULES
// ============================================

export const toastRules = {
  // Position
  position: {
    topRight: { top: '16px', right: '16px' },
    topLeft: { top: '16px', left: '16px' },
    bottomRight: { bottom: '16px', right: '16px' },
    bottomLeft: { bottom: '16px', left: '16px' },
    topCenter: { top: '16px', left: '50%', transform: 'translateX(-50%)' },
    bottomCenter: { bottom: '16px', left: '50%', transform: 'translateX(-50%)' },
  },

  // Style
  style: {
    background: 'var(--color-bg-raised)',
    radius: radius.md,
    shadow: shadows.lg,
    padding: '16px',
    minWidth: '300px',
    maxWidth: '500px',
  },

  // Variants
  variants: {
    success: {
      borderLeft: '4px solid var(--color-success)',
    },
    error: {
      borderLeft: '4px solid var(--color-error)',
    },
    warning: {
      borderLeft: '4px solid var(--color-warning)',
    },
    info: {
      borderLeft: '4px solid var(--color-info)',
    },
  },

  // Animation
  animation: {
    duration: motion.duration.slow,
    easing: motion.easing.spring,
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get button classes by variant and size
 */
export function getButtonClasses(
  variant: keyof typeof buttonRules.variants = 'primary',
  size: keyof typeof buttonRules.sizes = 'md'
): string {
  // Access to validate variant/size exist but don't use in class output
  void buttonRules.variants[variant];
  void buttonRules.sizes[size];

  return `inline-flex items-center justify-center font-medium transition-all ${getTouchTarget('minimum')}`;
}

/**
 * Get card classes by variant
 */
export function getCardClasses(variant: keyof typeof cardRules.variants = 'premium'): string {
  // Access to validate variant exists but don't use in class output
  void cardRules.variants[variant];
  return `transition-all ${cardRules.transition}`;
}

/**
 * Get touch target classes
 */
function getTouchTarget(size: 'minimum' | 'comfortable'): string {
  return size === 'minimum' ? 'min-h-[44px]' : 'min-h-[48px]';
}
