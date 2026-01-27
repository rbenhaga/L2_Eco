import type { ReactNode } from 'react';
import { useContentProtection } from '../../hooks/useContentProtection';

interface ContentProtectionProps {
    children: ReactNode;
}

/**
 * High-order component that wraps content with protection measures:
 * - Prevents copying, printing, screenshots
 * - Applies CSS-based selection prevention
 */
export function ContentProtection({ children }: ContentProtectionProps) {
    // Apply all protection hooks
    useContentProtection();

    return (
        <>
            {/* Protected content */}
            <div className="protected-content">
                {children}
            </div>
        </>
    );
}
