import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    contentTitle?: string;
}

export function PaywallModal({ isOpen, onClose, contentTitle = 'ce contenu' }: PaywallModalProps) {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 backdrop-blur-sm z-50"
                        style={{ background: 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)' }}
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.22 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[560px] p-8 rounded-3xl border pointer-events-auto overflow-hidden"
                            style={{
                                borderColor: 'var(--color-border-default)',
                                background: 'var(--color-bg-raised)',
                                boxShadow: 'var(--shadow-xl)',
                            }}
                        >
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(120% 80% at 0% 0%, var(--color-accent-subtle) 0%, transparent 50%)',
                                }}
                            />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-xl transition-colors"
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    background: 'var(--color-bg-overlay)',
                                    border: '1px solid var(--color-border-default)',
                                }}
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 mb-5 flex items-center justify-center">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                                    style={{
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-accent-foreground)',
                                    }}
                                >
                                    <GraduationCap size={24} />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                {'D\u00e9bloque ton acc\u00e8s Premium'}
                            </h2>
                            <p className="text-center mb-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {"L'abonnement Premium est requis pour acc\u00e9der \u00e0 "}{contentTitle}{'.'}
                            </p>
                            <p className="text-center mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {"D\u00e9bloque tout le programme, r\u00e9vise plus vite et maximise tes chances le jour de l'examen."}
                            </p>

                            <div className="space-y-3 mb-7">
                                {[
                                    'Tous les CM, TD, QCM, annales et corrections en illimit\u00e9',
                                    'Parcours complet sans blocage pour garder ton rythme',
                                    'Gain de temps avec un plan de r\u00e9vision centralis\u00e9',
                                    'Acc\u00e8s imm\u00e9diat, sans attente',
                                ].map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.04 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                                            style={{ background: 'var(--color-accent-subtle)' }}
                                        >
                                            <Check size={14} style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                onClick={() => navigate('/pricing')}
                                whileHover={{ y: -2 }}
                                className="w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200"
                                style={{
                                    background: 'var(--color-accent)',
                                    color: 'var(--color-accent-foreground)',
                                    boxShadow: 'var(--shadow-lg)',
                                }}
                            >
                                Voir les offres Premium
                            </motion.button>

                            <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                {'Plus tu commences t\u00f4t, plus ta progression est rapide.'}
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
