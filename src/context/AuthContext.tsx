import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from 'firebase/auth';
import firebaseConfig from '../config/firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    hasAccess: (requiredTier: 'free' | 'premium') => boolean;
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

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Initialize with basic info and free tier
                const basicUser: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    subscriptionTier: 'free',
                    subscriptionExpiry: null,
                };
                setUser(basicUser);

                // Fetch actual subscription from backend
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/subscription/${firebaseUser.uid}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser(prev => prev ? ({
                            ...prev,
                            subscriptionTier: data.tier,
                            subscriptionExpiry: data.currentPeriodEnd ? new Date(data.currentPeriodEnd) : null,
                        }) : null);
                    }
                } catch (error) {
                    console.error('Failed to fetch subscription:', error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextValue = {
        user,
        loading,
        signInWithGoogle,
        signOut,
        hasAccess,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
