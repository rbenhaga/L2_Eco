import { ServerOff, RefreshCw } from 'lucide-react';

// Logo component matching Home.tsx
function Logo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" fill="url(#logo-grad)" />
            <path d="M22 10v6" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
            <defs>
                <linearGradient id="logo-grad" x1="2" y1="5" x2="22" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
        </svg>
    );
}

const SITE_NAME = "Οἰκονομία";

export function BackendError() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen antialiased relative" style={{ background: "#FAFBFE", color: "rgb(var(--text))" }}>
            {/* Background - subtle single gradient (matching Home.tsx) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3"
                    style={{
                        background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative" style={{ zIndex: 1 }}>
                {/* Header with logo */}
                <header className="border-b border-slate-200/60 backdrop-blur-xl" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="flex h-14 sm:h-16 items-center">
                            <div className="flex items-center gap-2">
                                <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
                                <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">{SITE_NAME}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Error content */}
                <div className="flex items-center justify-center px-4 py-24 sm:py-32">
                    <div className="max-w-lg w-full text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-2xl mb-8" style={{ background: "rgba(239, 68, 68, 0.08)" }}>
                            <ServerOff className="h-10 w-10 sm:h-12 sm:w-12" style={{ color: "#DC2626" }} />
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mb-4 text-slate-900">
                            Service temporairement indisponible
                        </h1>

                        {/* Description - generic public message */}
                        <p className="text-base sm:text-lg leading-relaxed mb-10 text-slate-600 max-w-md mx-auto">
                            Le service est actuellement inaccessible. Nous travaillons à rétablir la connexion.
                        </p>

                        {/* CTA */}
                        <button
                            onClick={handleRefresh}
                            className="btn-primary h-12 sm:h-14 px-8 sm:px-10 rounded-xl text-sm sm:text-base font-semibold inline-flex items-center gap-2.5 transition-all active:scale-[0.98]"
                        >
                            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                            Réessayer
                        </button>

                        {/* Help text */}
                        <p className="text-xs sm:text-sm mt-8 text-slate-500">
                            Si le problème persiste, veuillez réessayer dans quelques instants.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
