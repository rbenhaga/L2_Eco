const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function checkBackendHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (response.ok) {
            const data = await response.json();
            return data.status === 'ok';
        }

        return false;
    } catch (error) {
        console.error('Backend health check failed:', error);
        return false;
    }
}
