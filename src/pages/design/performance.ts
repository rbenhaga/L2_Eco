/**
 * Agora Premium - Performance Utilities
 * Smart animation and rendering optimizations
 */

// Check if animations should be reduced
export function shouldReduceAnimations(): boolean {
    // Check user preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const memory = (navigator as any).deviceMemory;
    const isLowMemory = memory && memory <= 4;
    
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g');
    
    const isLowConcurrency = navigator.hardwareConcurrency <= 2;
    
    return prefersReduced || isLowMemory || isSlowConnection || isLowConcurrency;
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return (...args: Parameters<T>) => {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func(...args);
            lastExecTime = currentTime;
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for resize events
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Check if element is in viewport (for lazy loading)
export function isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
    };
    
    return new IntersectionObserver(callback, defaultOptions);
}

// Request animation frame with fallback
export function requestAnimationFrame(callback: FrameRequestCallback): number {
    return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame || 
           ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60));
}

// Cancel animation frame with fallback
export function cancelAnimationFrame(id: number): void {
    const cancel = window.cancelAnimationFrame || 
                   window.webkitCancelAnimationFrame || 
                   window.clearTimeout;
    cancel(id);
}