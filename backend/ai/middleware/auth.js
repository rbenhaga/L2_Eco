import admin from 'firebase-admin';
import { initializeFirebaseAdmin } from '../../config/firebase.js';

/**
 * Firebase Auth Middleware
 *
 * Verifies Firebase ID token and attaches user info to req.user
 * In development mode, bypasses auth for easier testing
 */
export async function requireAuth(req, res, next) {
    // Optional dev bypass, disabled by default.
    const allowDevBypass =
        process.env.NODE_ENV === 'development'
        && process.env.ALLOW_DEV_AUTH_BYPASS === 'true';

    if (allowDevBypass) {
        req.user = {
            uid: process.env.DEV_AUTH_UID || 'dev-user-123',
            email: process.env.DEV_AUTH_EMAIL || 'dev@example.com',
            emailVerified: true,
            tier: process.env.DEV_AUTH_TIER || 'premium'
        };
        return next();
    }

    // Lazy init (non-blocking for other routes)
    await initializeFirebaseAdmin();
    if (admin.apps.length === 0) {
        return res.status(503).json({
            error: 'ServiceUnavailable',
            message: 'Authentication service misconfigured on server.'
        });
    }

    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Missing or invalid Authorization header. Expected: "Bearer <token>"'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify token
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach user info to request
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
            // Add other fields if needed
        };

        // TODO: Fetch subscription tier from database
        // For now, default to 'free'
        req.user.tier = 'free';

        next();
    } catch (error) {
        console.error('Auth error:', error.message);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                error: 'TokenExpired',
                message: 'Your session has expired. Please sign in again.'
            });
        }

        if (error.code === 'auth/argument-error') {
            return res.status(401).json({
                error: 'InvalidToken',
                message: 'Invalid authentication token.'
            });
        }

        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication failed.'
        });
    }
}

/**
 * Optional auth middleware (for public endpoints that benefit from user context)
 */
export async function optionalAuth(req, res, next) {
    // Lazy init (non-blocking for other routes)
    await initializeFirebaseAdmin();

    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            const decodedToken = await admin.auth().verifyIdToken(token);

            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                tier: 'free' // TODO: Fetch from database
            };
        }
    } catch (error) {
        // Ignore auth errors for optional auth
        console.log('Optional auth failed (non-blocking):', error.message);
    }

    next();
}

export default { requireAuth, optionalAuth };
