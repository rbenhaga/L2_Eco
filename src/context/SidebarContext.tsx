import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface SidebarContextType {
    // Core states
    isExpanded: boolean;         // Visual state: rail (false) or expanded (true)
    isPinned: boolean;           // Lock state: stays expanded when true
    isHovered: boolean;          // Hover state
    isMobileOpen: boolean;       // Mobile drawer state

    // Derived state for convenience  
    isVisible: boolean;          // Always true on desktop (rail always shows)

    // Setters
    setIsHovered: (hovered: boolean) => void;
    setIsMobileOpen: (open: boolean) => void;

    // Actions
    togglePin: () => void;       // Click to pin/unpin (lock expanded state)
    toggleMobile: () => void;    // Toggle mobile drawer
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SIDEBAR_RAIL_WIDTH = 64;
export const SIDEBAR_EXPANDED_WIDTH = 280;  // Matches ModuleSidebar

export function SidebarProvider({ children }: { children: ReactNode }) {
    // Pin state persisted - determines if sidebar stays expanded
    const [isPinned, setIsPinnedState] = useState(() => {
        const saved = localStorage.getItem('sidebar-pinned');
        // Default to NOT pinned (rail mode)
        return saved !== null ? saved === 'true' : false;
    });

    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Expanded = pinned OR hovered
    const isExpanded = isPinned || isHovered;

    // Desktop sidebar always visible (rail mode minimum)
    const isVisible = true;

    // Persist pin state
    useEffect(() => {
        localStorage.setItem('sidebar-pinned', String(isPinned));
    }, [isPinned]);

    // Close mobile drawer on resize
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

    const togglePin = useCallback(() => {
        setIsPinnedState(prev => !prev);
    }, []);

    const toggleMobile = useCallback(() => {
        setIsMobileOpen(prev => !prev);
    }, []);

    return (
        <SidebarContext.Provider value={{
            isExpanded,
            isPinned,
            isHovered,
            isMobileOpen,
            isVisible,
            setIsHovered,
            setIsMobileOpen,
            togglePin,
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
