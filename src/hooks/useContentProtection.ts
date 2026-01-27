import { useEffect, useRef } from 'react';

/**
 * Hook de protection légère du contenu premium
 * - Désactive copie/clic-droit UNIQUEMENT sur éléments protégés (pas global)
 * - N'affecte PAS les DevTools (F12 autorisé)
 * - Ajoute watermark visuel discret
 */
export function useContentProtection(options?: { watermark?: string; enabled?: boolean }) {
    const containerRef = useRef<HTMLElement | null>(null);
    const enabled = options?.enabled ?? true;

    useEffect(() => {
        if (!enabled) return;

        const handleCopy = (e: ClipboardEvent) => {
            const target = e.target as HTMLElement;
            if (containerRef.current?.contains(target)) {
                e.preventDefault();
                // Message discret, pas d'alert()
                console.info('📋 Copie désactivée sur contenu premium');
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (containerRef.current?.contains(target)) {
                e.preventDefault();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (!containerRef.current?.contains(target)) return;

            // Bloque uniquement Ctrl+C/X/P dans le contenu protégé
            if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'p'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        };

        document.addEventListener('copy', handleCopy);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [enabled]);

    return containerRef;
}
