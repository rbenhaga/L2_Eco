/**
 * ModuleHubLayout - Layout wrapper for ModuleHub
 * Design: Soft Focus - Clean container
 */

import { ReactNode } from 'react';

interface ModuleHubLayoutProps {
    children: ReactNode;
}

export function ModuleHubLayout({ children }: ModuleHubLayoutProps) {
    return (
        <div
            className="min-h-screen w-full"
            style={{
                background: 'var(--color-canvas)',
            }}
        >
            {children}
        </div>
    );
}
