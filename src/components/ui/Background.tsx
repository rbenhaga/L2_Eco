

export function Background() {
    return (
        <div 
            className="fixed inset-0 -z-10 overflow-hidden transition-none" 
            style={{ 
                willChange: 'background-color',
                background: 'radial-gradient(ellipse at 50% 0%, #F8FAFC 0%, #FDFCFA 50%, #FBF9F7 100%)'
            }}
        >
            {/* Subtle top glow for depth */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08), transparent 70%)',
                    filter: 'blur(60px)'
                }}
            />

            {/* Subtle noise texture for premium feel */}
            <div
                className="absolute inset-0 opacity-[0.012] pointer-events-none transition-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    contain: 'strict'
                }}
            />
        </div>
    );
}
