import admin from 'firebase-admin';
import { pathToFileURL } from 'url';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let firebaseInitialized = false;
let initPromise = null;

function normalizePrivateKey(value) {
    return value?.replace(/\\n/g, '\n');
}

function hasManualEnvCredentials() {
    return Boolean(
        process.env.FIREBASE_PROJECT_ID
        && process.env.FIREBASE_CLIENT_EMAIL
        && process.env.FIREBASE_PRIVATE_KEY
    );
}

/**
 * Initialize Firebase Admin SDK (lazy, singleton)
 */
export async function initializeFirebaseAdmin() {
    if (firebaseInitialized) {
        return;
    }

    if (initPromise) {
        // Already initializing, wait for it
        return initPromise;
    }

    initPromise = (async () => {
        if (admin.apps.length > 0) {
            firebaseInitialized = true;
            return;
        }

        try {
            // Method 0: Full service account JSON from env (best for VPS secrets)
            if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
                const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
                if (parsed?.private_key) {
                    parsed.private_key = normalizePrivateKey(parsed.private_key);
                }

                admin.initializeApp({
                    credential: admin.credential.cert(parsed)
                });

                console.log('✅ Firebase Admin initialized with FIREBASE_SERVICE_ACCOUNT_JSON');
            }

            // Method 1: Service account file (optional)
            if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
                const configuredPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
                const candidatePaths = [
                    resolve(__dirname, configuredPath),      // relative to this file (legacy behavior)
                    resolve(process.cwd(), configuredPath),  // relative to backend cwd (common in prod)
                ];
                const serviceAccountPath = candidatePaths.find((p) => existsSync(p));

                if (serviceAccountPath) {
                    const serviceAccountUrl = pathToFileURL(serviceAccountPath).href;
                    const { default: serviceAccount } = await import(serviceAccountUrl, {
                        assert: { type: 'json' }
                    });

                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount)
                    });

                    console.log('✅ Firebase Admin initialized with service account file');
                } else {
                    console.warn(`⚠️ Firebase service account file not found from FIREBASE_SERVICE_ACCOUNT_PATH: ${configuredPath}`);
                    console.warn(`⚠️ Checked paths: ${candidatePaths.join(' | ')}`);
                }
            }

            // Method 2: Application Default Credentials
            if (!admin.apps.length && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                admin.initializeApp({
                    credential: admin.credential.applicationDefault()
                });

                console.log('✅ Firebase Admin initialized with default credentials');
            }

            // Method 3: Manual split credentials
            if (!admin.apps.length && hasManualEnvCredentials()) {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY)
                    })
                });

                console.log('✅ Firebase Admin initialized with env credentials');
            }

            if (!admin.apps.length) {
                console.warn('⚠️ Firebase Admin not initialized: missing credentials');
                console.warn('⚠️ Provide one of: FIREBASE_SERVICE_ACCOUNT_JSON, FIREBASE_SERVICE_ACCOUNT_PATH, GOOGLE_APPLICATION_CREDENTIALS, or FIREBASE_PROJECT_ID+FIREBASE_CLIENT_EMAIL+FIREBASE_PRIVATE_KEY');
            }

            firebaseInitialized = true;
        } catch (error) {
            console.error('❌ Firebase Admin initialization failed:', error);
            console.warn('⚠️ Continuing without Firebase authentication...');
            firebaseInitialized = true; // Mark as "initialized" to prevent retry loops
        }
    })();

    return initPromise;
}

export default { initializeFirebaseAdmin };
