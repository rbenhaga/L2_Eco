import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Clock3, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { createCheckoutSession } from '../services/api';
import { trackEvent } from '../services/analytics';
import { useAuth } from '../context/AuthContext';
import { useCheckoutConfig } from '../hooks/useCheckoutConfig';
import './Home.css';
import './PricingPage.css';

const HERO_TITLE = 'Tarifs';
const TYPING_SPEED_MS = 62;
const FUTURE_SEMESTER_PRICE = 9.99;
const FUTURE_ANNUAL_PRICE = 16.99;
const PRICING_SLIDES = [0, 1, 2] as const;

export default function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const checkoutConfig = useCheckoutConfig();
  const [typedCount, setTypedCount] = useState(0);
  const [isPassLoading, setIsPassLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const carouselRef = useRef<HTMLElement | null>(null);
  const mobileCarouselInitialized = useRef(false);
  const passPrice = typeof checkoutConfig.amountTotal === 'number'
    ? checkoutConfig.amountTotal / 100
    : 7.99;
  const passDurationDays = checkoutConfig.durationDays || 30;

  useEffect(() => {
    setTypedCount(0);
    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= HERO_TITLE.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED_MS);

    return () => window.clearInterval(timer);
  }, []);

  const handleCheckout = async () => {
    if (!user?.uid) {
      navigate('/login');
      return;
    }

    setCheckoutError(null);
    setIsPassLoading(true);
    void trackEvent('checkout_started', {
      source: 'pricing',
      plan: 'semester',
      price: passPrice,
    });

    try {
      const { url } = await createCheckoutSession(user.uid, 'semester');
      if (!url) throw new Error('URL de paiement non reçue');
      void trackEvent('checkout_redirect', { source: 'pricing', plan: 'semester' });
      window.location.href = url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Impossible de lancer le paiement';
      void trackEvent('checkout_failed', { source: 'pricing', plan: 'semester' });
      setCheckoutError(message);
      setIsPassLoading(false);
    }
  };

  const handleContinueFree = () => {
    void trackEvent('continue_free_click', { source: 'pricing' });
    navigate('/login');
  };

  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-pricing-slide]'));
    if (cards.length === 0) return;

    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  const scrollToSlide = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`[data-pricing-slide="${index}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  useEffect(() => {
    if (mobileCarouselInitialized.current) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;

    mobileCarouselInitialized.current = true;
    requestAnimationFrame(() => {
      scrollToSlide(1);
      setActiveSlide(1);
    });
  }, []);

  return (
    <div className="home-min-shell min-h-screen antialiased">
      <Header />

      <main className="pricing-min-main">
        <section className="pricing-min-hero" aria-label="Tarifs">
          <p className="home-min-kicker">Accès Premium</p>
          <h1 className="home-min-title">
            {HERO_TITLE.slice(0, typedCount).split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={`home-min-letter ${index === typedCount - 1 && typedCount < HERO_TITLE.length ? 'is-fresh' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <span className="home-min-cursor" aria-hidden="true" />
          </h1>
          <p className="home-min-lead">{`${passDurationDays} jours d'accès complet pour réviser les matières essentielles du semestre 4 de L2.`}</p>
          {checkoutError && (
            <div className="pricing-min-alert" data-state="error" role="alert">
              {checkoutError}
            </div>
          )}
        </section>

        <section ref={carouselRef} className="pricing-min-grid" aria-label="Plans" onScroll={handleCarouselScroll}>
          <article className="pricing-min-card pricing-min-card-free" data-pricing-slide="0">
            <p className="pricing-min-card-name">Gratuit</p>
            <p className="pricing-min-card-sub">Accès découverte</p>
            <p className="pricing-min-price">0€</p>
            <ul className="pricing-min-list">
              {[
                'Aperçu des matières et du parcours',
                'Sélection de chapitres, fiches et QCM',
                'Accès immédiat sans paiement',
              ].map((feature) => (
                <li key={feature}>
                  <Check className="h-4 w-4" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleContinueFree} className="home-min-cta-secondary pricing-min-btn">
              Continuer en gratuit
            </button>
          </article>

          <article className="pricing-min-card pricing-min-card-semester" data-pricing-slide="1">
            <div className="pricing-min-badge">
              <Users className="h-3 w-3" />
              Offre actuelle
            </div>
            <p className="pricing-min-card-name">{checkoutConfig.offerLabel}</p>
            <p className="pricing-min-card-sub">{`${passDurationDays} jours d'accès complet`}</p>
            <p className="pricing-min-price">{checkoutConfig.amountLabel}</p>
            <ul className="pricing-min-list">
              {[
                'Accès complet au contenu du semestre 4 de L2',
                'Cours, TD corrigés, fiches, QCM et annales',
                'Cours en vidéo, audios et aide Oiko',
                'Oiko pour poser vos questions pendant la révision',
                `Accès complet pendant ${passDurationDays} jours`,
              ].map((feature) => (
                <li key={feature}>
                  <Check className="h-4 w-4" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isPassLoading}
              className="home-min-cta-primary pricing-min-btn"
            >
              {isPassLoading ? 'Redirection...' : 'Activer le Pass Partiels'}
              {!isPassLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </article>

          <article className="pricing-min-card pricing-min-card-roadmap" data-pricing-slide="2">
            <div className="pricing-min-badge pricing-min-badge-accent">
              <Sparkles className="h-3 w-3" />
              Rentrée
            </div>
            <p className="pricing-min-card-name">Formules de rentrée</p>
            <p className="pricing-min-card-sub">À partir de la prochaine rentrée</p>
            <div className="pricing-min-future-prices">
              <p>{`Pass Semestre: ${FUTURE_SEMESTER_PRICE.toFixed(2).replace('.', ',')}€`}</p>
              <p>{`Pass Année: ${FUTURE_ANNUAL_PRICE.toFixed(2).replace('.', ',')}€`}</p>
            </div>
            <ul className="pricing-min-list">
              {[
                'Pass Semestre et Pass Année',
                'Même bibliothèque complète de contenus',
                'Cours en vidéo, audios et Oiko inclus',
                'Choix selon votre année et votre rythme de travail',
              ].map((feature) => (
                <li key={feature}>
                  <Clock3 className="h-4 w-4" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button type="button" disabled className="home-min-cta-secondary pricing-min-btn">
              Disponible à la rentrée
            </button>
          </article>
        </section>

        <div className="pricing-min-carousel-nav md:hidden" aria-label="Navigation des offres">
          {PRICING_SLIDES.map((index) => (
            <button
              key={index}
              type="button"
              className="pricing-min-carousel-dot"
              data-active={activeSlide === index ? 'true' : 'false'}
              onClick={() => scrollToSlide(index)}
              aria-label={`Voir l'offre ${index + 1}`}
              aria-pressed={activeSlide === index}
            />
          ))}
        </div>
      </main>

      <Footer className="mt-0 border-t" />
    </div>
  );
}
