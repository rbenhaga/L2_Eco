/**
 * BackgroundBlobs - Study-grade background with subtle colored blobs
 * Design contract: glow subtil indigo top-right + cyan bottom-left (blur-3xl, opacity faible)
 */
export function BackgroundBlobs() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* Base color */}
            <div className="absolute inset-0 bg-[#F7F9FF]" />
            
            {/* Indigo blob - top right (ABOVE base) */}
            <div
                className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
                style={{ background: "#6366F1", opacity: 0.15 }}
            />
            
            {/* Cyan blob - bottom left (ABOVE base) */}
            <div
                className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
                style={{ background: "#06B6D4", opacity: 0.12 }}
            />
            
            {/* Subtle purple blob - center (ABOVE base) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
                style={{ background: "#8B5CF6", opacity: 0.08 }}
            />
        </div>
    );
}
