/**
 * ContentPanel - Container for content lists
 * Design: Soft Focus - Clean card container
 */

import { ReactNode } from 'react';

interface ContentPanelProps {
    children: ReactNode;
}

export function ContentPanel({ children }: ContentPanelProps) {
    return (
        <div
            className="rounded-2xl p-4 sm:p-5 lg:p-6"
            style={{
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-md)',
            }}
        >
            {children}
        </div>
    );
}
