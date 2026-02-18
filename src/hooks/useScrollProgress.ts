/**
 * useScrollProgress – Returns the current scroll progress (0–100)
 * Can track either window scroll or a specific container element
 * Uses requestAnimationFrame for throttling.
 */

import { useState, useEffect, useRef } from 'react';

interface UseScrollProgressOptions {
    /** CSS selector for the container to track (e.g., '.module-hub-content'). If not provided, tracks window scroll. */
    containerSelector?: string;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
    const [scrollPercent, setScrollPercent] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const container = options.containerSelector 
            ? document.querySelector(options.containerSelector) 
            : null;

        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                let percent = 0;
                
                if (container) {
                    // Track container scroll
                    const scrollTop = container.scrollTop;
                    const scrollHeight = container.scrollHeight - container.clientHeight;
                    percent = scrollHeight > 0 ? Math.floor(Math.min(100, (scrollTop / scrollHeight) * 100)) : 0;
                } else {
                    // Track window scroll
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    percent = docHeight > 0 ? Math.floor(Math.min(100, (scrollTop / docHeight) * 100)) : 0;
                }
                
                setScrollPercent(percent);
                ticking.current = false;
            });
        };

        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        } else {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
        
        handleScroll(); // initial value

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [options.containerSelector]);

    return scrollPercent;
}
