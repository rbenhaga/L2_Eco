import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    contentTitle?: string;
}

/**
 * Paywall modal displayed when free-tier users try to access premium content.
 * Shows subscription benefits and upgrade CTA.
 */
export function PaywallModal({ isOpen, onClose, contentTitle = 'ce cours' }: PaywallModalProps) {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        navigate('/subscription');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[512px] p-8 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl pointer-events-auto"
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>

                            {/* Icon */}
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white mb-6 mx-auto">
                                <Sparkles size={32} />
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">
                                Contenu Premium
                            </h2>

                            <p className="text-center text-slate-600 mb-6">
                                L'accès à {contentTitle} nécessite un abonnement Premium
                            </p>

                            {/* Benefits */}
                            <div className="space-y-3 mb-8">
                                {[
                                    'Accès illimité à tous les cours',
                                    'QCM et exercices corrigés',
                                    'Simulations d\'examen',
                                    'Nouvelles fiches chaque semaine',
                                    'Support prioritaire',
                                ].map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Check size={14} className="text-indigo-600" />
                                        </div>
                                        <span className="text-sm text-slate-700">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleUpgrade}
                                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Passer à Premium
                            </button>

                            <p className="mt-4 text-center text-xs text-slate-500">
                                Essai gratuit de 7 jours • Sans engagement
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
