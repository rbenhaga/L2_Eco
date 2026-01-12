/**
 * Agora Premium - Reduced Motion Hook
 * Performance-aware animations with accessibility support
 */

import { useState, useEffect } from 'react';

// Check if user prefers reduced motion
export function useReducedMotion(): boolean {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setShouldReduceMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setShouldReduceMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return shouldReduceMotion;
}

// Performance mode hook - detects low-end devices
export function usePerformanceMode() {
    const [isLowEnd, setIsLowEnd] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // Check for low-end device indicators
        const checkPerformance = () => {
            // Check memory (if available)
            const memory = (navigator as any).deviceMemory;
            const isLowMemory = memory && memory <= 4;

            // Check connection (if available)
            const connection = (navigator as any).connection;
            const isSlowConnection = connection && 
                (connection.effectiveType === 'slow-2g' || 
                 connection.effectiveType === '2g' ||
                 connection.effectiveType === '3g');

            // Check hardware concurrency
            const isLowConcurrency = navigator.hardwareConcurrency <= 2;

            setIsLowEnd(isLowMemory || isSlowConnection || isLowConcurrency);
        };

        checkPerformance();
    }, []);

    return {
        shouldReduceMotion: shouldReduceMotion || isLowEnd,
        isLowEndDevice: isLowEnd,
        shouldUseSimpleAnimations: shouldReduceMotion || isLowEnd,
    };
}

// Animation config based on performance
export function getAnimationConfig(forceSimple = false) {
    const { shouldReduceMotion } = usePerformanceMode();
    
    if (shouldReduceMotion || forceSimple) {
        return {
            duration: 0.1,
            ease: 'linear',
            reduce: true,
        };
    }

    return {
        duration: 0.3,
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        reduce: false,
    };
}