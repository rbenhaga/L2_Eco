import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authFetch } from '../../utils/authFetch';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const ONBOARDING_STORAGE_KEY = 'agora_onboarding_completed';

/**
 * ProtectedRoute - Requires authentication and completed onboarding for protected app routes.
 */
export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();
    const [onboardingChecked, setOnboardingChecked] = useState(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const verifyOnboarding = async () => {
            if (!user) {
                if (!cancelled) {
                    setOnboardingChecked(false);
                    setOnboardingCompleted(false);
                }
                return;
            }

            if (!cancelled) {
                setOnboardingChecked(false);
            }

            const localCompleted = localStorage.getItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`) === 'true';
            if (localCompleted) {
                if (!cancelled) {
                    setOnboardingCompleted(true);
                    setOnboardingChecked(true);
                }
                return;
            }

            try {
                const response = await authFetch(`${API_URL}/api/user/${user.uid}/onboarding`);
                const data = response.ok ? await response.json() : null;
                const completed = Boolean(data?.completed);

                if (completed) {
                    localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
                }

                if (!cancelled) {
                    setOnboardingCompleted(completed);
                    setOnboardingChecked(true);
                }
            } catch (_e) {
                if (!cancelled) {
                    setOnboardingCompleted(false);
                    setOnboardingChecked(true);
                }
            }
        };

        void verifyOnboarding();

        return () => {
            cancelled = true;
        };
    }, [user]);

    if (loading || (user && !onboardingChecked)) {
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

    if (!onboardingCompleted) {
        return <Navigate to="/login" state={{ from: location, forceOnboarding: true }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
