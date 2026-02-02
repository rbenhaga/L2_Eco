/**
 * LAYOUT RULES v2.0 — Strict Guidelines
 * 
 * These rules define how components should be laid out
 * to create a consistent, premium feel across the app.
 */

import { spacing, layout } from './tokens';

// ============================================
// PAGE PADDING RULES
// ============================================

/**
 * Standard page padding by breakpoint
 * Use these for consistent edge spacing
 */
export const pagePadding = {
  mobile: spacing[4],      // 16px
  tablet: spacing[6],      // 24px
  desktop: spacing[8],     // 32px
} as const;

/**
 * Get responsive padding classes
 */
export function getPagePadding(): string {
  return 'px-4 sm:px-6 lg:px-8';
}

// ============================================
// CONTAINER RULES
// ============================================

/**
 * Container max-widths by context
 */
export const containers = {
  // Narrow content (blog posts, legal pages)
  narrow: layout.readingWidth,
  
  // Standard content (most pages)
  standard: layout.containerLg,
  
  // Wide content (dashboards, tables)
  wide: layout.containerXl,
  
  // Full bleed (hero sections)
  full: '100%',
} as const;

/**
 * Get container classes by type
 */
export function getContainer(type: keyof typeof containers = 'standard'): string {
  const maxWidths = {
    narrow: 'max-w-[680px]',
    standard: 'max-w-5xl',
    wide: 'max-w-6xl',
    full: 'max-w-full',
  };
  
  return `mx-auto ${maxWidths[type]} ${getPagePadding()}`;
}

// ============================================
// SECTION SPACING RULES
// ============================================

/**
 * Vertical spacing between sections
 */
export const sectionSpacing = {
  tight: spacing[8],       // 32px - Related sections
  default: spacing[12],    // 48px - Standard sections
  loose: spacing[16],      // 64px - Major sections
  hero: spacing[20],       // 80px - Hero sections
} as const;

/**
 * Get section spacing classes
 */
export function getSectionSpacing(type: keyof typeof sectionSpacing = 'default'): string {
  const classes = {
    tight: 'py-8 sm:py-10',
    default: 'py-12 sm:py-16',
    loose: 'py-16 sm:py-20',
    hero: 'py-20 sm:py-24',
  };
  
  return classes[type];
}

// ============================================
// GRID RULES
// ============================================

/**
 * Standard grid configurations
 */
export const grids = {
  // Card grids
  cards: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    gap: spacing[4], // 16px
  },
  
  // List items
  list: {
    mobile: 1,
    tablet: 1,
    desktop: 1,
    gap: spacing[3], // 12px
  },
  
  // Feature grid
  features: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
    gap: spacing[6], // 24px
  },
  
  // Stats grid
  stats: {
    mobile: 2,
    tablet: 2,
    desktop: 4,
    gap: spacing[4], // 16px
  },
} as const;

/**
 * Get grid classes by type
 */
export function getGrid(type: keyof typeof grids): string {
  const config = grids[type];
  
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };
  
  return `grid ${colClasses[config.mobile]} sm:${colClasses[config.tablet]} lg:${colClasses[config.desktop]} gap-${config.gap}`;
}

// ============================================
// STACK RULES (Vertical spacing)
// ============================================

/**
 * Vertical stack spacing
 */
export const stacks = {
  tight: spacing[2],    // 8px - Tightly related items
  default: spacing[4],  // 16px - Standard spacing
  loose: spacing[6],    // 24px - Loosely related items
  section: spacing[8],  // 32px - Section spacing
} as const;

/**
 * Get stack classes
 */
export function getStack(type: keyof typeof stacks = 'default'): string {
  const gapMap = {
    tight: 'space-y-2',
    default: 'space-y-4',
    loose: 'space-y-6',
    section: 'space-y-8',
  };
  
  return gapMap[type];
}

// ============================================
// HEADER RULES
// ============================================

/**
 * Header configuration
 */
export const header = {
  height: layout.headerHeight,
  padding: {
    x: spacing[4],
    y: spacing[4],
  },
  zIndex: 50,
} as const;

/**
 * Get header classes
 */
export function getHeaderClasses(): string {
  return `sticky top-0 z-50 h-16 px-4 sm:px-6`;
}

// ============================================
// SIDEBAR RULES
// ============================================

/**
 * Sidebar configuration
 */
export const sidebar = {
  width: layout.sidebarWidth,
  minimizedWidth: layout.sidebarMinimized,
  padding: spacing[3],
  zIndex: 50,
} as const;

/**
 * Get sidebar classes
 */
export function getSidebarClasses(isMinimized: boolean = false): string {
  const width = isMinimized ? 'w-[72px]' : 'w-[288px]';
  return `fixed left-0 top-0 bottom-0 ${width} p-3 z-50`;
}

// ============================================
// CARD SPACING RULES
// ============================================

/**
 * Card internal padding
 */
export const cardPadding = {
  sm: spacing[3],      // 12px - Compact cards
  default: spacing[4], // 16px - Standard cards
  lg: spacing[6],      // 24px - Large cards
  xl: spacing[8],      // 32px - Hero cards
} as const;

/**
 * Get card padding classes
 */
export function getCardPadding(size: keyof typeof cardPadding = 'default'): string {
  const classes = {
    sm: 'p-3',
    default: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-7',
    xl: 'p-8 sm:p-10',
  };
  
  return classes[size];
}

// ============================================
// TOUCH TARGET RULES
// ============================================

/**
 * Minimum touch target sizes
 */
export const touchTargets = {
  minimum: layout.touchTarget,     // 44px - WCAG minimum
  comfortable: layout.touchTargetLg, // 48px - Preferred
} as const;

/**
 * Get touch target classes
 */
export function getTouchTarget(size: 'minimum' | 'comfortable' = 'minimum'): string {
  return size === 'minimum' ? 'min-h-[44px] min-w-[44px]' : 'min-h-[48px] min-w-[48px]';
}

// ============================================
// RESPONSIVE UTILITIES
// ============================================

/**
 * Hide on mobile, show on desktop
 */
export function hideOnMobile(): string {
  return 'hidden lg:block';
}

/**
 * Show on mobile, hide on desktop
 */
export function showOnMobile(): string {
  return 'block lg:hidden';
}

/**
 * Responsive flex direction
 */
export function responsiveFlex(mobileDirection: 'row' | 'col' = 'col'): string {
  return mobileDirection === 'col' 
    ? 'flex flex-col lg:flex-row'
    : 'flex flex-row lg:flex-col';
}

// ============================================
// READING WIDTH RULES
// ============================================

/**
 * Optimal reading width for long text
 */
export const readingWidth = {
  standard: '65ch',  // ~680px
  wide: '75ch',      // ~760px
} as const;

/**
 * Get reading width classes
 */
export function getReadingWidth(type: keyof typeof readingWidth = 'standard'): string {
  return type === 'standard' ? 'max-w-[65ch]' : 'max-w-[75ch]';
}

// ============================================
// ASPECT RATIO RULES
// ============================================

/**
 * Common aspect ratios
 */
export const aspectRatios = {
  square: '1/1',
  video: '16/9',
  portrait: '3/4',
  landscape: '4/3',
  ultrawide: '21/9',
} as const;

/**
 * Get aspect ratio classes
 */
export function getAspectRatio(ratio: keyof typeof aspectRatios): string {
  return `aspect-[${aspectRatios[ratio]}]`;
}
