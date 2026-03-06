import { useEffect, useRef } from 'react';

/**
 * Global content protection:
 * - Blocks copy/cut/paste/select/print outside textarea
 * - Allows normal typing in forms, but clipboard only in textarea
 */
export function useContentProtection(options?: { watermark?: string; enabled?: boolean }) {
    const containerRef = useRef<HTMLElement | null>(null);
    const enabled = options?.enabled ?? true;

    useEffect(() => {
        if (!enabled) return;

        const isTextareaTarget = (target: EventTarget | null): boolean => {
            if (!(target instanceof Element)) return false;
            return Boolean(target.closest('textarea'));
        };

        const shouldBlock = (target: EventTarget | null): boolean => !isTextareaTarget(target);

        const handleCopy = (e: ClipboardEvent) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handleCut = (e: ClipboardEvent) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handlePaste = (e: ClipboardEvent) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handleContextMenu = (e: MouseEvent) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handleSelectStart = (e: Event) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handleDragStart = (e: DragEvent) => {
            if (shouldBlock(e.target)) e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!shouldBlock(e.target)) return;

            if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v', 'a', 'p', 's', 'u'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        };

        const handleBeforePrint = (e: Event) => {
            e.preventDefault();
            window.stop();
        };

        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('selectstart', handleSelectStart);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeprint', handleBeforePrint);

        return () => {
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('selectstart', handleSelectStart);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeprint', handleBeforePrint);
        };
    }, [enabled]);

    return containerRef;
}
