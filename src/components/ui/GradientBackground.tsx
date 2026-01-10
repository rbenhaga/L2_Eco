/**
 * GradientBackground - Premium "Spotlight" approach
 * 
 * Central/top gradient like Stripe, Linear, Vercel
 * Much higher opacity for light mode visibility
 */

export function GradientBackground() {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {/* ===== LIGHT MODE ===== */}
            <div className="dark:hidden absolute inset-0">
                {/* Main spotlight - top center (most visible) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-200px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1000px',
                        height: '600px',
                        background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />

                {/* Secondary left accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />

                {/* Secondary right accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        right: '-100px',
                        width: '350px',
                        height: '350px',
                        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />

                {/* Bottom ambient */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '800px',
                        height: '300px',
                        background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.12) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* ===== DARK MODE ===== */}
            <div className="hidden dark:block absolute inset-0">
                {/* Main spotlight - top center */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-200px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1200px',
                        height: '700px',
                        background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />

                {/* Left accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '-150px',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                {/* Right accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '35%',
                        right: '-150px',
                        width: '450px',
                        height: '450px',
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                {/* Bottom glow */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-150px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1000px',
                        height: '400px',
                        background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                        filter: 'blur(70px)',
                    }}
                />
            </div>
        </div>
    );
}
