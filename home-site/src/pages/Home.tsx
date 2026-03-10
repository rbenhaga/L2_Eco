import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { getDefaultLearningPath } from '../config/semesterAccess';
import { resolveCourseEntryPath } from '../utils/courseEntryPath';
import './Home.css';

const HERO_TITLE = 'Licence Eco';
const TYPING_SPEED_MS = 62;

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [typedCount, setTypedCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

  const openStart = async () => {
    const target = user?.uid
      ? await resolveCourseEntryPath(user.uid, apiUrl)
      : getDefaultLearningPath();

    if (user) {
      navigate(target);
      return;
    }

    navigate('/login', { state: { from: { pathname: target } } });
  };

  return (
    <div className="home-min-shell min-h-screen antialiased">
      <div className="home-min-top">
        <Header />

        <main className="home-min-main">
          <section className="home-min-hero" aria-label="Introduction">
            <p className="home-min-kicker">Licence Économie</p>
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
            <p className="home-min-lead">Cours, TD, QCM et annales organisés par semestre pour réviser les notions essentielles avant les partiels.</p>
            <p className="home-min-sublead">Retrouvez les matières du programme, les chapitres à maîtriser et les bons exercices dans un seul espace.</p>

            <div className="home-min-actions">
              <button type="button" onClick={() => { void openStart(); }} className="home-min-cta-primary">
                {user ? 'Accéder à mes cours' : 'Commencer'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}
