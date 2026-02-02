import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface SidebarContextType {
    isPinned: boolean;
    isVisible: boolean;
    isHovered: boolean;
    isMinimized: boolean;
    isMobileOpen: boolean; // ← Mobile drawer state
    setIsPinned: (pinned: boolean) => void;
    setIsHovered: (hovered: boolean) => void;
    setIsMinimized: (minimized: boolean) => void;
    setIsMobileOpen: (open: boolean) => void; // ← Mobile drawer setter
    togglePin: () => void;
    toggleMinimize: () => void;
    toggleMobile: () => void; // ← Mobile drawer toggle
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
    const [isMobileOpen, setIsMobileOpen] = useState(false);

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

    // Close mobile drawer on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileOpen]);

    const setIsPinned = useCallback((pinned: boolean) => {
        setIsPinnedState(pinned);
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

    const toggleMobile = useCallback(() => {
        setIsMobileOpen(prev => !prev);
    }, []);

    return (
        <SidebarContext.Provider value={{
            isPinned,
            isVisible,
            isHovered,
            isMinimized,
            isMobileOpen,
            setIsPinned,
            setIsHovered,
            setIsMinimized,
            setIsMobileOpen,
            togglePin,
            toggleMinimize,
            toggleMobile,
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
