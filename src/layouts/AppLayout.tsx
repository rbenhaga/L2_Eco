import { ReactNode } from 'react';
import { ModuleSidebar, SIDEBAR_WIDTH, SIDEBAR_MINIMIZED_WIDTH } from '../components/layout/ModuleSidebar';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
    const { isPinned, isMinimized } = useSidebar();

    // Calculer la marge selon l'état de la sidebar
    const sidebarMargin = !isPinned ? 0 : isMinimized ? SIDEBAR_MINIMIZED_WIDTH : SIDEBAR_WIDTH;

    return (
        <div
            className="min-h-screen antialiased relative"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, #F8FAFC 0%, #FDFCFA 50%, #FBF9F7 100%)'
            }}
        >
            {/* Subtle top glow for depth */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08), transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
            </div>

            {/* Content wrapper */}
            <div className="relative" style={{ zIndex: 1 }}>
                {/* ModuleSidebar - fixed on left (desktop only) */}
                <ModuleSidebar />

                {/* Main content area - offset by sidebar on desktop ONLY when pinned */}
                <main
                    className="transition-[margin] duration-150 ease-out"
                    style={{
                        marginLeft: sidebarMargin,
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
    );
}
