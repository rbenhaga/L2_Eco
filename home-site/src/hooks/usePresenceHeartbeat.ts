import { useEffect } from 'react';
import { authFetch } from '../utils/authFetch';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const PRESENCE_INTERVAL_MS = 60_000;
const PRESENCE_MIN_GAP_MS = 45_000;

export function usePresenceHeartbeat(userId?: string | null) {
    useEffect(() => {
        if (!userId) return;

        let cancelled = false;
        let inFlight = false;
        let lastPingAt = 0;

        const sendPresence = async (force = false) => {
            if (cancelled || inFlight) return;

            const now = Date.now();
            if (!force && now - lastPingAt < PRESENCE_MIN_GAP_MS) return;
            if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;

            inFlight = true;
            lastPingAt = now;

            try {
                await authFetch(`${API_URL}/api/user/${userId}/presence`, {
                    method: 'POST',
                    keepalive: true,
                });
            } catch (_error) {
                // Presence updates are best-effort only.
            } finally {
                inFlight = false;
            }
        };

        const interval = window.setInterval(() => {
            void sendPresence(false);
        }, PRESENCE_INTERVAL_MS);

        const handleVisible = () => {
            if (document.visibilityState === 'visible') {
                void sendPresence(true);
            }
        };

        const handleFocus = () => {
            void sendPresence(true);
        };

        const handleInteraction = () => {
            void sendPresence(false);
        };

        void sendPresence(true);

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisible);
        window.addEventListener('pointerdown', handleInteraction, { passive: true });
        window.addEventListener('scroll', handleInteraction, { passive: true });
        window.addEventListener('keydown', handleInteraction);

        return () => {
            cancelled = true;
            window.clearInterval(interval);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisible);
            window.removeEventListener('pointerdown', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [userId]);
}
