import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PremiumRouteProps {
    children: ReactNode;
    fallbackTo?: string;
}

export function PremiumRoute({ children, fallbackTo = '/pricing' }: PremiumRouteProps) {
    const { user, loading, refreshSubscription } = useAuth();
    const location = useLocation();
    const [refreshChecked, setRefreshChecked] = useState(false);

    const hasPremium = useMemo(() => {
        if (!user) return false;
        if (user.subscriptionTier !== 'premium') return false;
        if (!user.subscriptionExpiry) return true;
        return user.subscriptionExpiry > new Date();
    }, [user]);

    useEffect(() => {
        setRefreshChecked(false);
    }, [user?.uid, user?.subscriptionTier, user?.subscriptionExpiry?.getTime()]);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!user?.uid || hasPremium || refreshChecked) {
            return;
        }

        let active = true;

        const verifyPremium = async () => {
            try {
                await refreshSubscription();
            } finally {
                if (active) {
                    setRefreshChecked(true);
                }
            }
        };

        void verifyPremium();

        return () => {
            active = false;
        };
    }, [hasPremium, loading, refreshChecked, refreshSubscription, user?.uid]);

    if (loading || (user?.uid && !hasPremium && !refreshChecked)) {
        return (
            <div
                className="min-h-[40vh] flex items-center justify-center"
                style={{ background: 'var(--color-canvas)' }}
            >
                <div
                    className="animate-spin rounded-full h-10 w-10"
                    style={{
                        border: '3px solid var(--color-border-default)',
                        borderTopColor: 'var(--color-accent)',
                    }}
                />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasPremium) {
        return <Navigate to={fallbackTo} state={{ from: location, premiumRequired: true }} replace />;
    }

    return <>{children}</>;
}
