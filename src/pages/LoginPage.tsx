import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Background } from '../components/ui/Background';
import { useState } from 'react';

export function LoginPage() {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get the page user was trying to access
    const from = (location.state as { from?: Location })?.from?.pathname || '/';

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await signInWithGoogle();
            // Redirect to intended destination after successful login
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <Background />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[450px]"
                >
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white mb-4"
                        >
                            <GraduationCap size={32} />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            Hub de Révision L2
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Économie • Premium
                        </p>
                    </div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="relative p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md shadow-xl"
                    >
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                            Connexion requise
                        </h2>

                        {/* Features list */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                                    <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <span>Contenu protégé et sécurisé</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                                    <Zap size={16} className="text-violet-600 dark:text-violet-400" />
                                </div>
                                <span>Accès instantané à vos cours</span>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600" />
                                    <span>Connexion en cours...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span>Se connecter avec Google</span>
                                </>
                            )}
                        </button>

                        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                            En vous connectant, vous acceptez nos conditions d'utilisation
                        </p>
                    </motion.div>

                    {/* Footer info */}
                    <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                        Connexion sécurisée via Google • Aucun mot de passe requis
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
