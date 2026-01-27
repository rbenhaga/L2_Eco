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
    <div className="min-h-screen antialiased relative" data-theme="light">
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
              className="text-9xl font-bold text-indigo-600 mb-8"
            >
              404
            </motion.h1>

            {/* Message */}
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Page introuvable
            </h2>
            <p className="text-lg text-slate-600 mb-12">
              Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
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
