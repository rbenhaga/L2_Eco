/**
 * Agora Premium - Background (Apple/Notion Premium)
 * Multi-layer depth with mesh gradients, glows, and texture
 * Keynote-grade visual richness
 */

export function AppBackground({ dark }: { dark: boolean }) {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[var(--color-surface-base)]">
            {/* Layer 1: Base gradient (warm, subtle depth) */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background: dark
                        ? "linear-gradient(135deg, #18181B 0%, #1F1F23 25%, #27272A 50%, #1F1F23 75%, #18181B 100%)"
                        : "linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 30%, #F9FAFB 60%, #FFFFFF 85%, #F5F5F7 100%)",
                }}
            />

            {/* Layer 2: Mesh gradient (multi-point radial) */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: dark
                        ? `
                            radial-gradient(at 15% 20%, rgba(96, 165, 250, 0.15) 0px, transparent 50%),
                            radial-gradient(at 85% 80%, rgba(192, 132, 252, 0.12) 0px, transparent 50%),
                            radial-gradient(at 50% 50%, rgba(34, 211, 238, 0.08) 0px, transparent 60%),
                            radial-gradient(at 30% 70%, rgba(244, 114, 182, 0.10) 0px, transparent 55%)
                          `
                        : `
                            radial-gradient(at 15% 20%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
                            radial-gradient(at 85% 80%, rgba(139, 92, 246, 0.06) 0px, transparent 50%),
                            radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.04) 0px, transparent 60%),
                            radial-gradient(at 30% 70%, rgba(236, 72, 153, 0.05) 0px, transparent 55%)
                          `,
                }}
            />

            {/* Layer 3: Primary glow (animated, subtle) */}
            <div
                aria-hidden
                className="absolute top-0 right-1/4 w-[1200px] h-[1200px] rounded-full blur-3xl opacity-30 animate-pulse"
                style={{
                    background: dark
                        ? "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.08) 40%, transparent 70%)"
                        : "radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)",
                    animationDuration: "8s",
                }}
            />

            {/* Layer 4: Secondary glow (offset, slower animation) */}
            <div
                aria-hidden
                className="absolute bottom-0 left-1/4 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-25 animate-pulse"
                style={{
                    background: dark
                        ? "radial-gradient(circle, rgba(192, 132, 252, 0.12) 0%, rgba(192, 132, 252, 0.06) 40%, transparent 70%)"
                        : "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)",
                    animationDuration: "12s",
                    animationDelay: "2s",
                }}
            />

            {/* Layer 5: Tertiary accent (cyan/teal) */}
            <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
                style={{
                    background: dark
                        ? "radial-gradient(circle, rgba(34, 211, 238, 0.10) 0%, transparent 60%)"
                        : "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 60%)",
                }}
            />

            {/* Layer 6: Noise texture (premium grain) */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Layer 7: Subtle grid pattern (Apple-style) */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: dark
                        ? `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
                        : `linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Layer 8: Vignette (focus on content) */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background: dark
                        ? "radial-gradient(ellipse at center, transparent 0%, rgba(24, 24, 27, 0.4) 100%)"
                        : "radial-gradient(ellipse at center, transparent 0%, rgba(245, 245, 247, 0.5) 100%)",
                }}
            />

            {/* Layer 9: Top highlight (Apple-style inner glow) */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                    background: dark
                        ? "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
                        : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
                }}
            />
        </div>
    );
}
