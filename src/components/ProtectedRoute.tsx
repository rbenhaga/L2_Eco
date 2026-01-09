import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * ProtectedRoute - Now just ensures AuthProvider is initialized
 * 
 * The site is accessible without login, but premium content is gated.
 * Content gating is handled by CourseLayout's paywall logic.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { loading } = useAuth();

    if (loading) {
        // Show loading spinner while checking auth status
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
                </div>
            </div>
        );
    }

    // Allow access for both authenticated and unauthenticated users
    // Premium content gating is handled by CourseLayout
    return <>{children}</>;
}
