import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Loader2, ReceiptText, RotateCcw } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { InfoPageShell } from '../components/layout/InfoPageShell';
import { useAuth } from '../context/AuthContext';
import { useCheckoutConfig } from '../hooks/useCheckoutConfig';
import {
  ApiRequestError,
  type CheckoutInvoice,
  type CheckoutSessionStatus,
  createCustomerPortalSession,
  confirmCheckoutSession,
  getSubscription,
} from '../services/api';
import { trackEvent } from '../services/analytics';
import {
  clearCheckoutSessionAttempt,
  isStripeCheckoutSessionId,
  markCheckoutSessionVerified,
} from '../utils/checkoutReturnGuard';
import { resolveCourseEntryPath } from '../utils/courseEntryPath';
import './CheckoutResultPage.css';

const DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const CHECKOUT_CONFIRM_TIMEOUT_MS = 9000;
const SUBSCRIPTION_FALLBACK_TIMEOUT_MS = 5000;

type CheckoutPhase = 'checking' | 'success' | 'error';

function resolveInvoiceUrl(invoice: CheckoutInvoice | null | undefined) {
  return invoice?.invoicePdf || invoice?.hostedInvoiceUrl || null;
}

function getFirstName(displayName: string | null | undefined) {
  if (!displayName) return null;
  const [firstName] = displayName.trim().split(/\s+/);
  return firstName || null;
}

function isHardInvalidSessionError(message: string) {
  return message === 'Checkout session does not belong to the current user'
    || message === 'Checkout session is no longer valid';
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

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, refreshSubscription } = useAuth();
  const checkoutConfig = useCheckoutConfig();
  const [phase, setPhase] = useState<CheckoutPhase>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<CheckoutSessionStatus | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [isOpeningBilling, setIsOpeningBilling] = useState(false);
  const [isOpeningCourses, setIsOpeningCourses] = useState(false);
  const [isRouteAuthorized, setIsRouteAuthorized] = useState(false);
  const handledAttemptRef = useRef<string | null>(null);

  const rawSessionId = searchParams.get('session_id');
  const sessionId = isStripeCheckoutSessionId(rawSessionId) ? rawSessionId : null;
  const firstName = getFirstName(user?.displayName);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (!sessionId) {
      navigate('/pricing', { replace: true });
      return;
    }

    if (loading) {
      return;
    }

    if (!user?.uid) {
      navigate('/login', {
        replace: true,
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
          },
        },
      });
      return;
    }

    setIsRouteAuthorized(true);
  }, [loading, location.pathname, location.search, navigate, sessionId, user?.uid]);

  useEffect(() => {
    if (phase !== 'success') return;
    void trackEvent('checkout_success_page_viewed', {
      source: 'checkout_success',
      offer: 'pass_partiels_s4',
    });
  }, [phase]);

  useEffect(() => {
    if (!isRouteAuthorized || loading || !sessionId || !user?.uid) {
      return;
    }

    const attemptKey = `${sessionId}:${attempt}:${user.uid}`;
    if (handledAttemptRef.current === attemptKey) {
      return;
    }
    handledAttemptRef.current = attemptKey;

    let active = true;

    const confirmPayment = async () => {
      setPhase('checking');
      setErrorMessage(null);

      try {
        const result = await withTimeout(
          confirmCheckoutSession(sessionId),
          CHECKOUT_CONFIRM_TIMEOUT_MS,
          'La vérification Stripe a pris trop de temps.'
        );

        void refreshSubscription().catch(() => {});

        if (!active) return;

        setSessionData(result);
        if (result.paymentStatus === 'paid' || result.tier === 'premium') {
          markCheckoutSessionVerified(sessionId, user.uid);
          setPhase('success');
          return;
        }

        setPhase('error');
        setErrorMessage("Le paiement n'a pas encore été confirmé.");
      } catch (error) {
        void refreshSubscription().catch(() => {});
        const fallbackSubscription = await withTimeout(
          getSubscription(user.uid).catch(() => null),
          SUBSCRIPTION_FALLBACK_TIMEOUT_MS,
          'Le contrôle de votre abonnement a expiré.'
        ).catch(() => null);

        if (!active) return;

        if (fallbackSubscription?.tier === 'premium') {
          setSessionData({
            sessionId,
            sessionStatus: 'complete',
            paymentStatus: 'paid',
            accessActivated: true,
            invoice: null,
            paymentAttempt: null,
            ...fallbackSubscription,
          });
          markCheckoutSessionVerified(sessionId, user.uid);
          setPhase('success');
          return;
        }

        const resolvedMessage =
          error instanceof ApiRequestError || error instanceof Error
            ? error.message
            : 'Confirmation du paiement impossible.';

        if (isHardInvalidSessionError(resolvedMessage)) {
          clearCheckoutSessionAttempt(sessionId, user.uid);
          navigate('/pricing', { replace: true });
          return;
        }

        setPhase('error');
        setErrorMessage(resolvedMessage);
      }
    };

    void confirmPayment();

    return () => {
      active = false;
    };
  }, [attempt, isRouteAuthorized, loading, navigate, refreshSubscription, sessionId, user?.uid]);

  const invoiceUrl = useMemo(() => resolveInvoiceUrl(sessionData?.invoice), [sessionData?.invoice]);
  const passDurationLabel = useMemo(() => `${checkoutConfig.durationDays || 30} jours`, [checkoutConfig.durationDays]);
  const expiryLabel = useMemo(() => {
    const rawDate = sessionData?.currentPeriodEnd || (user?.subscriptionExpiry ? user.subscriptionExpiry.toISOString() : null);
    if (!rawDate) return null;
    return DATE_FORMATTER.format(new Date(rawDate));
  }, [sessionData?.currentPeriodEnd, user?.subscriptionExpiry]);

  const title = phase === 'success'
    ? firstName
      ? `Merci ${firstName}`
      : 'Paiement réussi'
    : phase === 'checking'
      ? 'Confirmation du paiement'
      : 'Paiement à vérifier';

  const lead = phase === 'success'
    ? 'Votre paiement a été validé. Vous pouvez accéder immédiatement à votre contenu premium.'
    : phase === 'checking'
      ? 'Nous finalisons la confirmation de votre paiement.'
      : "Le paiement est revenu, mais la confirmation automatique n'a pas abouti.";

  const handleRetry = () => {
    if (!sessionId || !user?.uid) {
      navigate('/pricing', { replace: true });
      return;
    }

    handledAttemptRef.current = null;
    setAttempt((current) => current + 1);
  };

  const handleOpenInvoice = () => {
    if (!invoiceUrl) return;
    window.open(invoiceUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenBilling = async () => {
    if (!user?.uid) return;

    setIsOpeningBilling(true);
    setErrorMessage(null);

    try {
      const { url } = await createCustomerPortalSession(user.uid);
      window.location.href = url;
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'ouvrir l'espace Stripe."
      );
    } finally {
      setIsOpeningBilling(false);
    }
  };

  const handleOpenCourses = async () => {
    if (!user?.uid) return;

    setIsOpeningCourses(true);

    try {
      const targetPath = await resolveCourseEntryPath(user.uid, apiUrl);
      navigate(targetPath);
    } finally {
      setIsOpeningCourses(false);
    }
  };

  if (!sessionId || !isRouteAuthorized) {
    return null;
  }

  return (
    <InfoPageShell kicker="Paiement Stripe" title={title} lead={lead}>
      <div className="checkout-result-layout checkout-result-layout--simple">
        <section className="checkout-result-card checkout-result-card--simple">
          <div className="checkout-result-card__body">
            {phase === 'success' ? (
              <div className="checkout-result-success-mark" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="checkout-result-success-mark__svg" role="presentation">
                  <circle cx="60" cy="60" r="42" className="checkout-result-success-mark__circle" />
                  <path d="M38 61.5 53 76 83 45" className="checkout-result-success-mark__tick" />
                </svg>
              </div>
            ) : phase === 'checking' ? (
              <div className="checkout-result-status-line">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Confirmation en cours...</span>
              </div>
            ) : null}

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

            {phase === 'success' && expiryLabel ? (
              <p className="checkout-result-terms">
                Votre accès premium prendra fin le <strong>{expiryLabel}</strong>. Aucun prélèvement automatique ne sera effectué après cette date.
              </p>
            ) : null}

            {phase === 'error' && errorMessage ? (
              <div className="checkout-result-note" role="alert">
                {errorMessage}
              </div>
            ) : null}

            <div className="checkout-result-actions checkout-result-actions--simple">
              {phase === 'success' ? (
                <>
                  <button
                    type="button"
                    onClick={() => { void handleOpenCourses(); }}
                    disabled={isOpeningCourses}
                    className="checkout-result-button checkout-result-button--primary"
                  >
                    {isOpeningCourses ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Ouverture...
                      </>
                    ) : (
                      <>
                        Accéder à mes cours
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {invoiceUrl ? (
                    <button
                      type="button"
                      onClick={handleOpenInvoice}
                      className="checkout-result-button checkout-result-button--secondary"
                    >
                      <ReceiptText className="h-4 w-4" />
                      Voir la facture Stripe
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenBilling}
                      disabled={isOpeningBilling}
                      className="checkout-result-button checkout-result-button--secondary"
                    >
                      {isOpeningBilling ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Ouverture...
                        </>
                      ) : (
                        <>
                          <ReceiptText className="h-4 w-4" />
                          Ouvrir Stripe
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : phase === 'checking' ? null : (
                <>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="checkout-result-button checkout-result-button--primary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Réessayer
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/pricing')}
                    className="checkout-result-button checkout-result-button--secondary"
                  >
                    Revenir aux tarifs
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </InfoPageShell>
  );
}
