import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * ProtectedRoute - Requires authentication for protected app routes.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Show loading spinner while checking auth status
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: 'var(--color-canvas)' }}
            >
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 mx-auto mb-4"
                        style={{
                            border: '3px solid var(--color-border-default)',
                            borderTopColor: 'var(--color-accent)',
                        }}
                    />
                    <p style={{ color: 'var(--color-text-secondary)' }}>Chargement...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
