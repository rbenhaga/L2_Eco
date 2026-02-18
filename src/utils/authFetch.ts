import { getAuth } from 'firebase/auth';

export async function getAuthHeaders(extraHeaders?: HeadersInit): Promise<HeadersInit> {
    const auth = getAuth();
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;

    const base: Record<string, string> = {};
    if (extraHeaders) {
        if (Array.isArray(extraHeaders)) {
            for (const [key, value] of extraHeaders) base[key] = value;
        } else if (extraHeaders instanceof Headers) {
            extraHeaders.forEach((value, key) => { base[key] = value; });
        } else {
            Object.assign(base, extraHeaders);
        }
    }
    if (token) {
        base.Authorization = `Bearer ${token}`;
    }
    return base;
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
    const headers = await getAuthHeaders(init.headers);
    return fetch(input, { ...init, headers });
}
