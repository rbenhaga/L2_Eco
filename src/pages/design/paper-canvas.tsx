/**
 * Paper Canvas - Reading mode wrapper
 * Dark Shell + Light Paper for optimal reading
 */

import React from "react";
import type { ReadingMode } from "../../hooks/useReadingMode";

export function PaperCanvas({
    mode,
    children,
}: {
    mode: ReadingMode;
    children: React.ReactNode;
}) {
    const isPaper = mode === "paper";

    return (
        <div
            className="relative h-full overflow-auto border shadow-[var(--shadow-lg)] transition-colors duration-300"
            style={{
                borderRadius: "var(--radius-panel)",
                background: isPaper ? "var(--paper-bg)" : "var(--glass-panel)",
                borderColor: isPaper ? "var(--paper-border)" : "var(--glass-border)",
                boxShadow: isPaper ? "var(--paper-shadow)" : "var(--shadow-lg)",
            }}
        >
            {/* Glass highlight (only in dark mode) */}
            {!isPaper && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
                    style={{ background: "var(--glass-highlight)" }}
                />
            )}

            {/* Content with optimal typography */}
            <div className="relative">
                <div
                    className="mx-auto max-w-[72ch] px-6 py-10 lg:px-10 text-[15px] leading-[1.85]"
                    style={{
                        color: isPaper ? "var(--paper-text)" : "var(--color-text-base)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
