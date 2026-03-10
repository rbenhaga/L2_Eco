import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User as FirebaseAuthUser,
} from 'firebase/auth';
import firebaseConfig from '../config/firebase.config';
import { initializeAnalyticsCollection } from '../services/analytics';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const OWNER_PREMIUM_EMAIL = 'rayanebenhaga@gmail.com';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const SUBSCRIPTION_FETCH_TIMEOUT_MS = 7000;
const ADMIN_EMAILS = new Set(
    [
        OWNER_PREMIUM_EMAIL,
        ...String(import.meta.env.VITE_ADMIN_EMAILS || '')
            .split(',')
            .map((value) => value.trim().toLowerCase())
            .filter(Boolean),
    ].filter(Boolean)
);


// User interface with subscription info
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    subscriptionTier: 'free' | 'premium';
    subscriptionExpiry: Date | null;
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    hasAccess: (requiredTier: 'free' | 'premium') => boolean;
    refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const userRef = useRef<User | null>(null);
    const isAdmin = user?.email ? ADMIN_EMAILS.has(user.email.toLowerCase()) : false;

    useEffect(() => {
        void initializeAnalyticsCollection();
    }, []);

    useEffect(() => {
        userRef.current = user;
    }, [user]);



    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // State update is handled by onAuthStateChanged listener
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    // Check if user has access to a specific tier
    const hasAccess = (requiredTier: 'free' | 'premium'): boolean => {
        if (!user) return false;

        // Premium users have access to everything
        if (user.subscriptionTier === 'premium') {
            // Check if subscription is still valid
            if (!user.subscriptionExpiry) return true; // Lifetime subscription
            return user.subscriptionExpiry > new Date();
        }

        // Free users only have access to free content
        return requiredTier === 'free';
    };

    const syncUserSubscription = useCallback(async (firebaseUser: FirebaseAuthUser, fallbackUser?: User) => {
        const isOwnerPremium =
            (firebaseUser.email || '').toLowerCase() === OWNER_PREMIUM_EMAIL;

        if (fallbackUser) {
            setUser(fallbackUser);
        }

        try {
            const token = await firebaseUser.getIdToken();
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), SUBSCRIPTION_FETCH_TIMEOUT_MS);
            const response = await fetch(`${API_URL}/api/subscription/${firebaseUser.uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            }).finally(() => {
                window.clearTimeout(timeoutId);
            });

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setUser((prev) => {
                const source = prev && prev.uid === firebaseUser.uid ? prev : fallbackUser;
                if (!source) return prev;

                return {
                    ...source,
                    subscriptionTier: isOwnerPremium ? 'premium' : data.tier,
                    subscriptionExpiry: data.currentPeriodEnd ? new Date(data.currentPeriodEnd) : null,
                };
            });
        } catch (error) {
            console.error('Failed to fetch subscription:', error);
        }
    }, []);

    const refreshSubscription = useCallback(async () => {
        const firebaseUser = auth.currentUser;
        if (!firebaseUser) return;

        const isOwnerPremium =
            (firebaseUser.email || '').toLowerCase() === OWNER_PREMIUM_EMAIL;
        const currentUser = userRef.current;

        const fallbackUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            subscriptionTier: isOwnerPremium ? 'premium' : (currentUser?.subscriptionTier || 'free'),
            subscriptionExpiry: currentUser?.subscriptionExpiry || null,
        };

        await syncUserSubscription(firebaseUser, fallbackUser);
    }, [syncUserSubscription]);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const isOwnerPremium =
                    (firebaseUser.email || '').toLowerCase() === OWNER_PREMIUM_EMAIL;

                const basicUser: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    subscriptionTier: isOwnerPremium ? 'premium' : 'free',
                    subscriptionExpiry: null,
                };

                setUser(basicUser);
                setLoading(false);
                void syncUserSubscription(firebaseUser, basicUser);
                return;
            }

            setUser(null);
            setLoading(false);
        });

        return unsubscribe;
    }, [syncUserSubscription]);

    const value: AuthContextValue = {
        user,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut,
        hasAccess,
        refreshSubscription,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
