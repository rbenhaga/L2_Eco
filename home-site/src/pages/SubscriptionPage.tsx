import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ReceiptText, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createCustomerPortalSession } from '../services/api';

const DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

export function SubscriptionPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }
        if (user.subscriptionTier !== 'premium') {
            navigate('/pricing', { replace: true });
        }
    }, [loading, navigate, user]);

    const handleManageBilling = async () => {
        if (!user) return;

        setIsProcessing(true);
        setError(null);

        try {
            const { url } = await createCustomerPortalSession(user.uid);
            window.location.href = url;
        } catch (err) {
            console.error('Portal error:', err);
            setError("Impossible d'accéder au portail Stripe pour le moment.");
            setIsProcessing(false);
        }
    };

    if (loading || !user || user.subscriptionTier !== 'premium') {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Chargement...
                </div>
            </div>
        );
    }

    const expiryLabel = user.subscriptionExpiry
        ? DATE_FORMATTER.format(user.subscriptionExpiry)
        : null;

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-base)' }}>
            <div className="mx-auto max-w-2xl px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    <ArrowLeft size={16} />
                    Retour
                </button>

                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: 'var(--color-bg-raised)',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                >
                    <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--color-text-primary)' }}>
                        <Settings className="h-5 w-5" />
                        <h1 className="text-2xl font-semibold">Mon accès Premium</h1>
                    </div>
                    <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                        {expiryLabel
                            ? `Votre Pass Partiels S4 est actif jusqu'au ${expiryLabel}.`
                            : "Votre accès Premium est actif."}
                    </p>

                    <div
                        className="mb-6 rounded-2xl p-4"
                        style={{
                            border: '1px solid var(--color-border-default)',
                            background: 'var(--color-bg-overlay)',
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-text-primary)' }}>
                            <ReceiptText className="h-4 w-4" />
                            <p className="text-sm font-semibold">Facture et moyens de paiement</p>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Le portail Stripe permet de consulter la facture du paiement test et les informations de facturation associées à votre accès.
                        </p>
                    </div>

                    {error && (
                        <div
                            className="mb-4 rounded-lg px-3 py-2 text-sm"
                            style={{
                                background: 'var(--color-error-subtle)',
                                color: 'var(--color-error)',
                                border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleManageBilling}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
                        style={{
                            background: 'var(--color-text-primary)',
                            color: 'var(--color-canvas)',
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Redirection...
                            </>
                        ) : (
                            'Ouvrir le portail Stripe'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
