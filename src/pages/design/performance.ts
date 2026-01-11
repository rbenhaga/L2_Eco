/**
 * Performance utilities
 * Detect device capabilities and optimize animations accordingly
 */

// Detect if device is low-end (mobile with limited resources)
export function isLowEndDevice(): boolean {
    // Check if running on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    if (!isMobile) return false;

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 2) return true;

    // Check device memory (if available)
    const memory = (navigator as any).deviceMemory;
    if (memory && memory <= 2) return true;

    // Check connection speed (if available)
    const connection = (navigator as any).connection;
    if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') return true;
    }

    return false;
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Should disable complex animations
export function shouldReduceAnimations(): boolean {
    return isLowEndDevice() || prefersReducedMotion();
}

// Get animation config based on device capabilities
export function getAnimationConfig() {
    const reduce = shouldReduceAnimations();

    return {
        // Disable complex animations on low-end devices
        enableGlows: !reduce,
        enableParticles: !reduce,
        enableBlurs: !reduce,
        
        // Reduce animation duration on low-end devices
        durationMultiplier: reduce ? 0.5 : 1,
        
        // Simplify spring animations
        springConfig: reduce
            ? { stiffness: 300, damping: 30 }
            : { stiffness: 400, damping: 25 },
    };
}

// Preload critical resources
export function preloadRoute(route: string) {
    // Preload route on hover for instant navigation
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
