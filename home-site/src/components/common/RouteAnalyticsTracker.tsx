import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../services/analytics';

export function RouteAnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        const path = `${location.pathname}${location.search}${location.hash}`;
        void trackPageView(path);
    }, [location.pathname, location.search, location.hash]);

    return null;
}