import { useEffect } from 'react';

/**
 * Custom hook to protect content from being copied, printed, or downloaded as PDF.
 * Implements multiple layers of protection:
 * - Prevents copy/paste operations
 * - Blocks right-click context menu
 * - Disables print functionality
 * - Prevents common screenshot shortcuts
 */
export function useContentProtection() {
    useEffect(() => {
        // Prevent context menu (right-click)
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Prevent copy operations
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Prevent cut operations
        const handleCut = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Prevent keyboard shortcuts for copy, paste, print, and screenshots
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Ctrl+C, Cmd+C (copy)
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                return false;
            }
            // Prevent Ctrl+X, Cmd+X (cut)
            if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
                e.preventDefault();
                return false;
            }
            // Prevent Ctrl+P, Cmd+P (print)
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                return false;
            }
            // Prevent Ctrl+S, Cmd+S (save)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                return false;
            }
            // Prevent PrintScreen key
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                return false;
            }
            // Prevent Windows screenshot shortcuts (Win+Shift+S)
            if (e.key === 's' && e.shiftKey && e.metaKey) {
                e.preventDefault();
                return false;
            }
            // Prevent F12 (DevTools) - optional, can be intrusive
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
        };

        // Prevent printing via window.print()
        const handleBeforePrint = (e: Event) => {
            e.preventDefault();
            alert('L\'impression de ce contenu n\'est pas autorisée. Merci de respecter les droits d\'auteur.');
            return false;
        };

        // Prevent default paste behavior (though this is less critical)
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable drag-start (prevents dragging images/text)
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        // Add all event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('beforeprint', handleBeforePrint);
        document.addEventListener('dragstart', handleDragStart);

        // Disable text selection using JavaScript
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';

        // Cleanup function to remove all listeners
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('beforeprint', handleBeforePrint);
            document.removeEventListener('dragstart', handleDragStart);

            // Re-enable text selection
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
        };
    }, []);
}
