import type { ReactNode } from 'react';

interface ModuleHubLayoutProps {
    children: ReactNode;
}

export function ModuleHubLayout({ children }: ModuleHubLayoutProps) {
    return (
        <div className="min-h-screen w-full app-stage-shell">
            {children}
        </div>
    );
}