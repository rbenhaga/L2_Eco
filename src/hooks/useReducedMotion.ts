/**
 * Hook to detect reduced motion preference and low-end devices
 * Automatically disables complex animations for better performance
 */

import { useState, useEffect } from 'react';

export function useReducedMotion() {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

    useEffect(() => {
        // Check user preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setShouldReduceMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setShouldReduceMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return shouldReduceMotion;
}

export function usePerformanceMode() {
    const [isLowEnd, setIsLowEnd] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        // Detect low-end devices
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
        const hasSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                                   (navigator as any).connection?.effectiveType === '2g';

        setIsLowEnd(isMobile && (hasLowMemory || hasSlowConnection));
    }, []);

    return {
        shouldReduceMotion: reducedMotion || isLowEnd,
        isLowEnd,
    };
}
