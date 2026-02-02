import { ReactNode, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ModuleSidebar, SIDEBAR_WIDTH, SIDEBAR_MINIMIZED_WIDTH } from '../components/layout/ModuleSidebar';
import { MobileDrawer, MobileNavButton } from '../components/layout/MobileDrawer';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
    const { isPinned, isMinimized } = useSidebar();
    const location = useLocation();
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    // Calculer la marge selon l'état de la sidebar
    const sidebarMargin = !isPinned ? 0 : isMinimized ? SIDEBAR_MINIMIZED_WIDTH : SIDEBAR_WIDTH;

    // Detect current module and semester from URL
    const { currentModule, currentSemester } = useMemo(() => {
        const path = location.pathname;
        
        // Extract semester (s3 or s4)
        const semesterMatch = path.match(/\/(s[34])\//);
        const semester = semesterMatch ? semesterMatch[1] : 's3';
        
        // Extract module (macro, micro, stats, socio, management)
        const moduleMatch = path.match(/\/(macro|micro|stats|socio|management)/);
        const module = moduleMatch ? moduleMatch[1] : undefined;
        
        return { currentModule: module, currentSemester: semester };
    }, [location.pathname]);

    return (
        <div
            className="min-h-screen antialiased relative"
            style={{ background: 'var(--color-bg-base)' }}
        >
            {/* Study-grade calm background */}
            <div className="fixed inset-0 -z-10">
                {/* Simple gradient bleuté calme */}
                <div 
                    className="absolute inset-0" 
                    style={{ background: "linear-gradient(to bottom, #F7F9FF 0%, #F5F7FA 100%)" }} 
                />
                
                {/* Grain texture subtil */}
                <div 
                    className="absolute inset-0 opacity-[0.015]" 
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '180px 180px'
                    }} 
                />
            </div>

            {/* Content wrapper */}
            <div className="relative" style={{ zIndex: 1 }}>
                {/* ModuleSidebar - fixed on left (desktop only) */}
                <ModuleSidebar />

                {/* Main content area - offset by sidebar on desktop ONLY when pinned */}
                <main
                    className="transition-[margin] duration-150 ease-out min-h-screen pb-20 lg:pb-0"
                    style={{ marginLeft: sidebarMargin }}
                >
                    {children}
                </main>

                {/* Mobile Navigation - Bottom drawer + FAB */}
                <MobileNavButton onClick={() => setIsMobileDrawerOpen(true)} />
                <MobileDrawer 
                    isOpen={isMobileDrawerOpen}
                    onClose={() => setIsMobileDrawerOpen(false)}
                    currentModule={currentModule}
                    currentSemester={currentSemester}
                />
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
