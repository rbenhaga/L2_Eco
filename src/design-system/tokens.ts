/**
 * DESIGN TOKENS v2.0 — Single Source of Truth
 * 
 * Philosophy: Apple/Notion/Linear grade
 * - Study-grade calm (not flashy)
 * - Surface-based depth (not flat)
 * - Module identity (vibrant accents)
 * - Mobile-first (touch-friendly)
 * 
 * CRITICAL: These tokens MUST be used everywhere.
 * NO hardcoded colors, shadows, or spacing allowed.
 */

// ============================================
// SURFACE SYSTEM (3 levels)
// ============================================

export const surfaces = {
  base: 'var(--color-bg-base)',           // page background token
  raised: 'var(--color-bg-raised)',       // cards/panels token
  overlay: 'var(--color-bg-overlay)',     // dropdown/modal token
} as const;

// ============================================
// TEXT SYSTEM (Strong hierarchy)
// ============================================

export const text = {
  primary: 'var(--color-text-primary)',     // heading/body text token
  secondary: 'var(--color-text-secondary)', // secondary text token
  muted: 'var(--color-text-muted)',         // muted text token
} as const;

// ============================================
// ACCENT SYSTEM (Restrained)
// ============================================

export const accent = {
  default: 'var(--color-accent)',           // primary action token
  hover: 'var(--color-accent-hover)',       // hover token
  subtle: 'var(--color-accent-subtle)',     // subtle background token
} as const;

// ============================================
// MODULE COLORS (Vibrant identity)
// ============================================

export const modules = {
  macro: {
    color: 'var(--color-macro)',            // module color token
    light: 'var(--color-macro-light)',      // light variant token
    subtle: 'var(--color-macro-subtle)',    // subtle variant token
    gradient: 'var(--color-macro-gradient)',
    glow: 'var(--color-macro-glow)',
  },
  micro: {
    color: 'var(--color-micro)',            // module color token
    light: 'var(--color-micro-light)',
    subtle: 'var(--color-micro-subtle)',
    gradient: 'var(--color-micro-gradient)',
    glow: 'var(--color-micro-glow)',
  },
  stats: {
    color: 'var(--color-stats)',            // module color token
    light: 'var(--color-stats-light)',
    subtle: 'var(--color-stats-subtle)',
    gradient: 'var(--color-stats-gradient)',
    glow: 'var(--color-stats-glow)',
  },
  socio: {
    color: 'var(--color-socio)',            // module color token
    light: 'var(--color-socio-light)',
    subtle: 'var(--color-socio-subtle)',
    gradient: 'var(--color-socio-gradient)',
    glow: 'var(--color-socio-glow)',
  },
  management: {
    color: 'var(--color-management)',       // module color token
    light: 'var(--color-management-light)',
    subtle: 'var(--color-management-subtle)',
    gradient: 'var(--color-management-gradient)',
    glow: 'var(--color-management-glow)',
  },
} as const;

// ============================================
// SEMANTIC COLORS
// ============================================

export const semantic = {
  success: 'var(--color-success)',          // success token
  successSubtle: 'var(--color-success-subtle)',
  warning: 'var(--color-warning)',          // warning token
  warningSubtle: 'var(--color-warning-subtle)',
  error: 'var(--color-error)',              // error token
  errorSubtle: 'var(--color-error-subtle)',
  info: 'var(--color-info)',                // info token
  infoSubtle: 'var(--color-info-subtle)',
} as const;

// ============================================
// BORDER SYSTEM
// ============================================

export const borders = {
  default: 'var(--color-border-default)',   // color-mix(in srgb, var(--color-text-primary) 8%, transparent)
  soft: 'var(--color-border-soft)',         // soft border token
  strong: 'var(--color-border-strong)',     // strong border token
} as const;

// ============================================
// SHADOW SYSTEM (Keynote-style)
// ============================================

export const shadows = {
  sm: 'var(--shadow-sm)',   // Subtle lift
  md: 'var(--shadow-md)',   // Cards
  lg: 'var(--shadow-lg)',   // Elevated cards
  xl: 'var(--shadow-xl)',   // Modals, drawers
} as const;

// ============================================
// RADIUS SCALE (4 values only)
// ============================================

export const radius = {
  sm: '8px',    // Inputs, small cards
  md: '12px',   // Cards, buttons
  lg: '16px',   // Hero cards, panels
  full: '9999px', // Pills, avatars
} as const;

// ============================================
// SPACING SCALE (8px grid)
// ============================================

export const spacing = {
  1: '4px',     // Micro
  2: '8px',     // Base unit
  3: '12px',    // Tight
  4: '16px',    // Default
  6: '24px',    // Medium
  8: '32px',    // Large
  12: '48px',   // Section
  16: '64px',   // Hero
  20: '80px',   // Extra large
  24: '96px',   // Mega
} as const;

// ============================================
// TYPOGRAPHY SCALE
// ============================================

export const typography = {
  display: {
    size: 'clamp(2rem, 5vw, 4.25rem)',
    weight: '700',
    lineHeight: '1.05',
    letterSpacing: '-0.03em',
  },
  h1: {
    size: 'clamp(1.75rem, 4vw, 2rem)',
    weight: '700',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
  },
  h2: {
    size: '1.5rem',
    weight: '600',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  h3: {
    size: '1.25rem',
    weight: '600',
    lineHeight: '1.4',
    letterSpacing: '-0.005em',
  },
  h4: {
    size: '1.125rem',
    weight: '600',
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  bodyLg: {
    size: '1rem',
    weight: '400',
    lineHeight: '1.6',
  },
  body: {
    size: '0.9375rem',
    weight: '400',
    lineHeight: '1.6',
  },
  bodySm: {
    size: '0.875rem',
    weight: '400',
    lineHeight: '1.5',
  },
  caption: {
    size: '0.8125rem',
    weight: '500',
    lineHeight: '1.4',
  },
  captionSm: {
    size: '0.75rem',
    weight: '500',
    lineHeight: '1.4',
  },
} as const;

// ============================================
// MOTION TOKENS
// ============================================

export const motion = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
  },
  easing: {
    default: 'cubic-bezier(0.33, 1, 0.68, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

// ============================================
// LAYOUT CONSTANTS
// ============================================

export const layout = {
  // Container widths
  containerSm: '640px',
  containerMd: '768px',
  containerLg: '1024px',
  containerXl: '1280px',
  container2xl: '1536px',
  
  // Reading width (for long text)
  readingWidth: '680px',
  readingWidthWide: '760px',
  
  // Sidebar
  sidebarWidth: '288px',
  sidebarMinimized: '72px',
  
  // Header
  headerHeight: '64px',
  
  // Touch targets
  touchTarget: '44px',
  touchTargetLg: '48px',
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get module theme by ID
 */
export function getModuleTheme(moduleId: 'macro' | 'micro' | 'stats' | 'socio' | 'management') {
  return modules[moduleId];
}

/**
 * Get spacing value
 */
export function getSpacing(value: keyof typeof spacing): string {
  return spacing[value];
}

/**
 * Get shadow value
 */
export function getShadow(value: keyof typeof shadows): string {
  return shadows[value];
}

/**
 * Type exports for TypeScript
 */
export type ModuleId = keyof typeof modules;
export type SpacingValue = keyof typeof spacing;
export type ShadowValue = keyof typeof shadows;
export type RadiusValue = keyof typeof radius;
