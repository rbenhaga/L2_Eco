/**
 * AI API Security Middleware
 *
 * Multi-layer security to prevent unauthorized access to AI endpoints:
 * 1. IP whitelisting (localhost + VPS IP)
 * 2. Origin/Referer verification
 */

const ALLOWED_IPS = [
    '127.0.0.1',
    '::1',
    '::ffff:127.0.0.1',
    process.env.VPS_IP
];

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_WWW
].filter(Boolean);

function getClientIP(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = req.headers['x-real-ip'];
    if (realIP) {
        return realIP;
    }

    return req.ip || req.connection.remoteAddress;
}

function normalizeIP(ip) {
    if (!ip) return null;
    if (ip.startsWith('::ffff:')) {
        return ip.substring(7);
    }
    return ip;
}

function isIPAllowed(ip) {
    const normalizedIP = normalizeIP(ip);

    for (const allowedIP of ALLOWED_IPS) {
        if (!allowedIP) continue;

        const normalizedAllowed = normalizeIP(allowedIP);
        if (normalizedIP === normalizedAllowed) {
            return true;
        }
    }

    return false;
}

function isOriginAllowed(origin) {
    if (!origin) return false;

    const normalizedOrigin = origin.replace(/\/$/, '');

    for (const allowedOrigin of ALLOWED_ORIGINS) {
        if (!allowedOrigin) continue;

        const normalizedAllowed = allowedOrigin.replace(/\/$/, '');
        if (normalizedOrigin === normalizedAllowed) {
            return true;
        }
    }

    return false;
}

export function aiSecurityMiddleware(req, res, next) {
    const clientIP = getClientIP(req);
    const origin = req.headers.origin || req.headers.referer;

    console.log(`[AI Security] IP: ${clientIP}, Origin: ${origin}`);

    if (isIPAllowed(clientIP)) {
        console.log(`[AI Security] allowed by IP: ${clientIP}`);
        return next();
    }

    if (origin && isOriginAllowed(origin)) {
        console.log(`[AI Security] allowed by origin: ${origin}`);
        return next();
    }

    console.warn(`[AI Security] blocked request from IP: ${clientIP}, Origin: ${origin}`);

    return res.status(403).json({
        error: 'Forbidden',
        message: 'Access to AI endpoints is restricted to authorized clients only.'
    });
}

export function aiCorsMiddleware(req, res, next) {
    const origin = req.headers.origin;

    if (origin && isOriginAllowed(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Max-Age', '3600');
    }

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
}

export function generateNginxConfig() {
    return `
# Add this to your nginx server block for additional protection

# Rate limiting zone for AI endpoints
limit_req_zone $binary_remote_addr zone=ai_limit:10m rate=10r/m;

location /api/ai/ {
    # Apply rate limit
    limit_req zone=ai_limit burst=5 nodelay;

    # Only allow specific IPs (adjust as needed)
    allow 127.0.0.1;
    allow ::1;
    ${process.env.VPS_IP ? `allow ${process.env.VPS_IP};` : '# allow YOUR_VPS_IP;'}
    deny all;

    # Proxy to backend
    proxy_pass http://localhost:3001;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
}
  `.trim();
}

export function isDevelopment() {
    return process.env.NODE_ENV === 'development';
}

export function aiSecurityMiddlewareDev(req, res, next) {
    if (isDevelopment()) {
        console.log('[AI Security] development mode - security relaxed');
        return next();
    }

    return aiSecurityMiddleware(req, res, next);
}

export default {
    aiSecurityMiddleware,
    aiSecurityMiddlewareDev,
    aiCorsMiddleware,
    generateNginxConfig,
    getClientIP,
    isIPAllowed,
    isOriginAllowed
};
