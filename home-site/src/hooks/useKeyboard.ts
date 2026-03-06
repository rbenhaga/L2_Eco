/**
 * useKeyboard - Keyboard Shortcuts Hook
 * 
 * Notion-style keyboard shortcuts.
 * Press Cmd/Ctrl + K for command palette, etc.
 */

import { useEffect } from 'react';

type KeyHandler = () => void;

interface KeyboardShortcuts {
    [key: string]: KeyHandler;
}

export function useKeyboard(shortcuts: KeyboardShortcuts) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Build the key combination string
            const parts: string[] = [];

            if (event.ctrlKey || event.metaKey) parts.push('cmd');
            if (event.shiftKey) parts.push('shift');
            if (event.altKey) parts.push('alt');

            // Add the actual key
            const key = event.key.toLowerCase();
            if (key !== 'control' && key !== 'meta' && key !== 'shift' && key !== 'alt') {
                parts.push(key);
            }

            const combo = parts.join('+');

            // Check if this combo has a handler
            const handler = shortcuts[combo];
            if (handler) {
                event.preventDefault();
                handler();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}
