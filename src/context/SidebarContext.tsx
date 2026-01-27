import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface SidebarContextType {
    isPinned: boolean;
    isVisible: boolean;
    isHovered: boolean;
    isMinimized: boolean; // ← NOUVEAU: mode icônes-only
    setIsPinned: (pinned: boolean) => void;
    setIsHovered: (hovered: boolean) => void;
    setIsMinimized: (minimized: boolean) => void; // ← NOUVEAU
    togglePin: () => void;
    toggleMinimize: () => void; // ← NOUVEAU
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isPinned, setIsPinnedState] = useState(() => {
        const saved = localStorage.getItem('sidebar-pinned');
        return saved !== null ? saved === 'true' : true;
    });
    const [isMinimized, setIsMinimizedState] = useState(() => {
        const saved = localStorage.getItem('sidebar-minimized');
        return saved !== null ? saved === 'true' : false;
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(isPinned);

    // Persist pin state
    useEffect(() => {
        localStorage.setItem('sidebar-pinned', String(isPinned));
    }, [isPinned]);

    // Persist minimized state
    useEffect(() => {
        localStorage.setItem('sidebar-minimized', String(isMinimized));
    }, [isMinimized]);

    // Update visibility based on hover and pin state
    useEffect(() => {
        if (isPinned) {
            setIsVisible(true);
        } else {
            setIsVisible(isHovered);
        }
    }, [isHovered, isPinned]);

    const setIsPinned = useCallback((pinned: boolean) => {
        setIsPinnedState(pinned);
        // Si on détache, fermer immédiatement la sidebar
        if (!pinned) {
            setIsVisible(false);
        }
    }, []);

    const togglePin = useCallback(() => {
        setIsPinned(!isPinned);
    }, [isPinned, setIsPinned]);

    const setIsMinimized = useCallback((minimized: boolean) => {
        setIsMinimizedState(minimized);
    }, []);

    const toggleMinimize = useCallback(() => {
        setIsMinimized(!isMinimized);
    }, [isMinimized, setIsMinimized]);

    return (
        <SidebarContext.Provider value={{
            isPinned,
            isVisible,
            isHovered,
            isMinimized,
            setIsPinned,
            setIsHovered,
            setIsMinimized,
            togglePin,
            toggleMinimize,
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}
