/**
 * Agora Premium - Background (Keynote-grade Glassmorphism)
 * 100% token-driven (Design Contract compliant)
 * 
 * Philosophy: Rich, contrasted background for visible glass effect
 * - Layer 1: Diagonal gradient (depth + direction)
 * - Layer 2: Accent glow (top-right, VISIBLE)
 * - Layer 3: Secondary glow (bottom-left, VISIBLE)
 * - Layer 4: Mesh gradient (blend between glows)
 * - Layer 5: Noise texture (premium feel)
 * - Layer 6: Vignette (focus center)
 */

export function AppBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Layer 1: Base diagonal gradient */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "var(--bg-base)" }}
            />

            {/* Layer 2: Accent glow (top-right, LARGE and VISIBLE) */}
            <div
                aria-hidden
                className="absolute -top-[10%] -right-[5%] w-[1100px] h-[1100px]"
                style={{ 
                    background: "var(--bg-glow-1)",
                    filter: "blur(140px)",
                }}
            />

            {/* Layer 3: Secondary glow (bottom-left, LARGE and VISIBLE) */}
            <div
                aria-hidden
                className="absolute -bottom-[10%] -left-[5%] w-[950px] h-[950px]"
                style={{ 
                    background: "var(--bg-glow-2)",
                    filter: "blur(130px)",
                }}
            />

            {/* Layer 4: Mesh gradient (center blend) */}
            <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
                style={{ 
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
                    filter: "blur(80px)",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Layer 5: Noise texture */}
            <div
                aria-hidden
                className="absolute inset-0 mix-blend-overlay"
                style={{
                    opacity: "var(--bg-noise-opacity)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "280px 280px",
                }}
            />

            {/* Layer 6: Vignette */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "var(--bg-vignette)" }}
            />
        </div>
    );
}
