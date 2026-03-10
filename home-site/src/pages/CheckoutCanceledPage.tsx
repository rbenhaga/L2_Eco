import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { InfoPageShell } from '../components/layout/InfoPageShell';
import { useAuth } from '../context/AuthContext';
import { useCheckoutConfig } from '../hooks/useCheckoutConfig';
import { confirmCheckoutSession, createCheckoutSession, getCheckoutCancelContext } from '../services/api';
import { trackEvent } from '../services/analytics';
import {
  getPendingCheckoutAttemptByCancelToken,
  isCheckoutCancelToken,
} from '../utils/checkoutReturnGuard';
import './CheckoutResultPage.css';

const CHECKOUT_STATUS_TIMEOUT_MS = 7000;

interface CheckoutAttemptSummary {
  sessionId: string;
  userId: string;
  createdAt: number;
  verifiedAt: number | null;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export default function CheckoutCanceledPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const checkoutConfig = useCheckoutConfig();
  const [attempt, setAttempt] = useState<CheckoutAttemptSummary | null>(null);
  const [isRouteAuthorized, setIsRouteAuthorized] = useState(false);
  const [isLoadingRouteContext, setIsLoadingRouteContext] = useState(true);
  const [isResolvingStripeContext, setIsResolvingStripeContext] = useState(false);
  const [isRestartingCheckout, setIsRestartingCheckout] = useState(false);
  const [restartError, setRestartError] = useState<string | null>(null);

  const rawCancelToken = searchParams.get('cancel_token');
  const cancelToken = isCheckoutCancelToken(rawCancelToken) ? rawCancelToken : null;
  const passDurationLabel = `${checkoutConfig.durationDays || 30} jours`;

  useEffect(() => {
    void trackEvent('checkout_canceled_page_viewed', { source: 'checkout_canceled' });
  }, []);

  useEffect(() => {
    if (!cancelToken) {
      navigate('/pricing', { replace: true });
      return;
    }

    if (loading) {
      return;
    }

    if (!user?.uid) {
      navigate('/login', { replace: true });
      return;
    }

    let active = true;
    setIsLoadingRouteContext(true);

    const resolveRouteContext = async () => {
      const localAttempt = getPendingCheckoutAttemptByCancelToken(cancelToken, user.uid);
      if (localAttempt) {
        if (!active) return;
        setAttempt({
          sessionId: localAttempt.sessionId,
          userId: localAttempt.userId,
          createdAt: localAttempt.createdAt,
          verifiedAt: localAttempt.verifiedAt,
        });
        setIsRouteAuthorized(true);
        setIsLoadingRouteContext(false);
        return;
      }

      try {
        const context = await getCheckoutCancelContext(cancelToken);
        if (!active) return;
        setAttempt(context);
        setIsRouteAuthorized(true);
      } catch {
        if (!active) return;
        navigate('/pricing', { replace: true });
        return;
      }

      if (active) {
        setIsLoadingRouteContext(false);
      }
    };

    void resolveRouteContext();

    return () => {
      active = false;
    };
  }, [cancelToken, loading, navigate, user?.uid]);

  useEffect(() => {
    if (!loading && user?.uid && attempt?.userId && attempt.userId !== user.uid) {
      navigate('/pricing', { replace: true });
    }
  }, [attempt?.userId, loading, navigate, user?.uid]);

  useEffect(() => {
    if (!isRouteAuthorized || !attempt?.sessionId || loading || !user?.uid) {
      return;
    }

    let active = true;
    setIsResolvingStripeContext(true);

    const resolveStripeContext = async () => {
      try {
        const result = await withTimeout(
          confirmCheckoutSession(attempt.sessionId),
          CHECKOUT_STATUS_TIMEOUT_MS,
          'Le contrôle Stripe a pris trop de temps.'
        );

        if (!active) return;

        if (result.paymentStatus === 'paid' || result.tier === 'premium') {
          navigate(`/checkout/success?session_id=${result.sessionId}`, { replace: true });
          return;
        }
      } catch {
        if (!active) return;
      } finally {
        if (active) {
          setIsResolvingStripeContext(false);
        }
      }
    };

    void resolveStripeContext();

    return () => {
      active = false;
    };
  }, [attempt?.sessionId, isRouteAuthorized, loading, navigate, user?.uid]);

  const handleRestartCheckout = async () => {
    if (!user?.uid) {
      navigate('/login', { replace: true });
      return;
    }

    setRestartError(null);
    setIsRestartingCheckout(true);

    try {
      void trackEvent('checkout_restarted', { source: 'checkout_canceled' });
      const { url } = await createCheckoutSession(user.uid, 'semester');
      if (!url) {
        throw new Error('URL de paiement non reçue.');
      }

      window.location.href = url;
    } catch (error) {
      setRestartError(
        error instanceof Error
          ? error.message
          : 'Impossible de relancer le paiement.'
      );
      setIsRestartingCheckout(false);
    }
  };

  if (!cancelToken || !isRouteAuthorized) {
    return null;
  }

  return (
    <InfoPageShell
      kicker="Paiement Stripe"
      title="Paiement interrompu"
      lead="Le règlement n’a pas été finalisé. Vous pouvez reprendre le paiement à tout moment."
    >
      <div className="checkout-result-layout checkout-result-layout--simple">
        <section className="checkout-result-card checkout-result-card--simple">
          <div className="checkout-result-card__body">
            <div className="checkout-result-warning-mark" aria-hidden="true">
              <AlertTriangle className="checkout-result-warning-mark__icon" />
            </div>

            <dl className="checkout-result-meta" aria-label="Résumé de la commande">
              <div className="checkout-result-meta__row">
                <dt className="checkout-result-meta__label">Offre</dt>
                <dd className="checkout-result-meta__value">{checkoutConfig.offerLabel}</dd>
              </div>
              <div className="checkout-result-meta__row">
                <dt className="checkout-result-meta__label">Montant</dt>
                <dd className="checkout-result-meta__value checkout-result-meta__value--price">{checkoutConfig.amountLabel}</dd>
              </div>
              <div className="checkout-result-meta__row">
                <dt className="checkout-result-meta__label">Durée</dt>
                <dd className="checkout-result-meta__value">{passDurationLabel}</dd>
              </div>
            </dl>

            <p className="checkout-result-terms">
              Aucun débit n’a été confirmé. Vous pouvez relancer le paiement quand vous le souhaitez.
            </p>

            {restartError ? (
              <div className="checkout-result-note" role="alert">
                {restartError}
              </div>
            ) : null}

            {isLoadingRouteContext || isResolvingStripeContext ? (
              <div className="checkout-result-status-line">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Récupération des informations Stripe...</span>
              </div>
            ) : null}

            <div className="checkout-result-actions checkout-result-actions--simple">
              <button
                type="button"
                onClick={() => { void handleRestartCheckout(); }}
                disabled={isRestartingCheckout}
                className="checkout-result-button checkout-result-button--primary"
              >
                {isRestartingCheckout ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    Réessayer le paiement
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </InfoPageShell>
  );
}
