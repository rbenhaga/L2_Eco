

export function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-none" style={{ willChange: 'background-color' }}>
            {/* Mesh Gradients - Subtle and elegant */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-15 transition-opacity duration-100" style={{ contain: 'layout style paint', willChange: 'opacity' }}>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/50 dark:bg-violet-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob" style={{ transform: 'translateZ(0)', willChange: 'transform' }} />
                <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-indigo-200/50 dark:bg-indigo-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" style={{ transform: 'translateZ(0)', willChange: 'transform' }} />
                <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-blue-200/50 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" style={{ transform: 'translateZ(0)', willChange: 'transform' }} />
            </div>

            {/* Subtle noise texture for premium feel */}
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none transition-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    contain: 'strict'
                }}
            />
        </div>
    );
}
