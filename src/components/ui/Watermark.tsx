

interface WatermarkProps {
    userEmail?: string;
    userId?: string;
}

/**
 * Watermark component that overlays semi-transparent user identification
 * across the content to discourage screenshots and unauthorized sharing.
 * The watermark is subtle enough not to disrupt reading but visible in screenshots.
 */
export function Watermark({ userEmail, userId }: WatermarkProps) {
    // Use email or fallback to userId
    const displayText = userEmail || userId || 'Premium User';

    return (
        <div
            className="fixed inset-0 pointer-events-none z-50 select-none"
            style={{
                background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 200px,
          rgba(148, 163, 184, 0.03) 200px,
          rgba(148, 163, 184, 0.03) 400px
        )`,
            }}
        >
            {/* Diagonal watermark text pattern */}
            <div className="relative h-full w-full overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute whitespace-nowrap text-slate-400/4 dark:text-slate-300/4 text-2xl font-bold tracking-wider"
                        style={{
                            top: `${(i * 8) % 100}%`,
                            left: `${(i * 10) % 100}%`,
                            transform: 'rotate(-45deg)',
                        }}
                    >
                        {displayText.repeat(3)}
                    </div>
                ))}
            </div>
        </div>
    );
}
