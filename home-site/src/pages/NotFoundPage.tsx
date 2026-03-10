import { useEffect, useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import './Home.css';

const HERO_TITLE = 'Page introuvable';
const TYPING_SPEED_MS = 62;

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [typedCount, setTypedCount] = useState(0);

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

  return (
    <div className="home-min-shell min-h-screen antialiased">
      <div className="home-min-top">
        <Header />

        <main className="home-min-main">
          <section className="home-min-hero" aria-label="Page introuvable">
            <p className="home-min-kicker">Navigation</p>
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
            <p className="home-min-lead">La page demandée n'est pas disponible.</p>
            <p className="home-min-sublead">Vérifiez l'adresse ou retournez à l'accueil pour continuer.</p>

            <div className="home-min-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="home-min-cta-secondary"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
              <Link to="/" className="home-min-cta-primary">
                <Home className="h-4 w-4" />
                Accueil
              </Link>
            </div>
          </section>
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

