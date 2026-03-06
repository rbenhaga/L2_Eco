import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('404 - Page not found:', window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
      <BackgroundBlobs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <section className="py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
          >
            {/* 404 */}
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="text-9xl font-bold mb-8"
              style={{ color: 'var(--color-accent)' }}
            >
              404
            </motion.h1>

            {/* Message */}
            <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Page introuvable
            </h2>
            <p className="text-lg mb-12" style={{ color: 'var(--color-text-secondary)' }}>
              Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
                style={{
                  background: 'var(--color-bg-overlay)',
                  color: 'var(--color-text-secondary)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-raised)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[var(--color-bg-raised)] rounded-xl font-medium transition-all"
                style={{ background: 'var(--color-accent)' }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <Home className="w-5 h-5" />
                Accueil
              </Link>
            </div>
          </motion.div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
