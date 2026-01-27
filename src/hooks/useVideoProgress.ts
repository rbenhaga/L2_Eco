import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Module = 'macro' | 'micro' | 'stats' | 'socio' | 'management';

export function useVideoProgress(module: Module) {
    const { user } = useAuth();
    const [introVideoWatched, setIntroVideoWatched] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch intro video status on mount
    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const fetchStatus = async () => {
            try {
                const res = await fetch(`${API_URL}/api/progress/${user.uid}/intro-videos`);
                if (res.ok) {
                    const data = await res.json();
                    setIntroVideoWatched(data[module]?.watched || false);
                }
            } catch (error) {
                console.error('Failed to fetch video progress:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [user?.uid, module]);

    // Mark intro video as watched
    const markIntroWatched = useCallback(async () => {
        if (!user?.uid) return;

        try {
            await fetch(`${API_URL}/api/progress/${user.uid}/watched`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contentType: 'intro_video',
                    module,
                    contentId: 'intro'
                })
            });
            setIntroVideoWatched(true);
        } catch (error) {
            console.error('Failed to mark video as watched:', error);
        }
    }, [user?.uid, module]);

    // Mark intro video as completed
    const markIntroCompleted = useCallback(async () => {
        if (!user?.uid) return;

        try {
            await fetch(`${API_URL}/api/progress/${user.uid}/completed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contentType: 'intro_video',
                    module,
                    contentId: 'intro'
                })
            });
            setIntroVideoWatched(true);
        } catch (error) {
            console.error('Failed to mark video as completed:', error);
        }
    }, [user?.uid, module]);

    return {
        introVideoWatched,
        loading,
        markIntroWatched,
        markIntroCompleted
    };
}
