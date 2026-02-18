import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show nothing while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ borderColor: 'var(--color-accent)' }} />
                    <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>Chargement...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect to login with return path
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is authenticated, render the protected content
    return <>{children}</>;
}
