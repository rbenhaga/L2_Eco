import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';

const faqs = [
  { q: "Qu'est-ce que RevP2 ?", a: "RevP2 est une plateforme éducative pour étudiants en économie avec cours, exercices, quiz et assistant IA." },
  { q: "Quel est le prix de l'abonnement ?", a: "Abonnement semestriel : 15,99€ (paiement unique). Mensuel : 3,99€/mois × 6 (prélèvement SEPA)." },
  { q: "Y a-t-il une version gratuite ?", a: "Oui ! Compte gratuit pour découvrir avec accès aux contenus de démonstration." },
  { q: "Puis-je annuler mon abonnement ?", a: "Oui, à tout moment depuis votre espace client. L'accès reste actif jusqu'à la fin de la période payée." },
  { q: "Quels cours sont disponibles ?", a: "Macroéconomie, Microéconomie, Statistiques et Sociologie pour L1-L2 économie." },
  { q: "Comment fonctionne l'assistant IA ?", a: "L'assistant IA répond à vos questions de cours 24/7, explique les concepts et aide aux exercices." },
  { q: "Les paiements sont-ils sécurisés ?", a: "Oui, tous les paiements sont traités par Stripe (certifié PCI DSS). Aucune donnée bancaire stockée." },
  { q: "Puis-je utiliser RevP2 sur mobile ?", a: "Oui ! RevP2 est responsive et fonctionne sur smartphone, tablette et ordinateur." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
      <BackgroundBlobs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--color-accent)' }}>
                <HelpCircle className="w-8 h-8 text-[var(--color-bg-raised)]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Foire aux Questions
              </h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                Trouvez rapidement des réponses à vos questions
              </p>
            </motion.div>

            {/* FAQ List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  style={{
                    background: 'var(--color-bg-raised)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--color-border-default)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="font-medium pr-4" style={{ color: 'var(--color-text-primary)' }}>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} />
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-6 pb-4"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 rounded-2xl p-8 text-center text-[var(--color-bg-raised)]"
              style={{ background: 'var(--color-accent)' }}
            >
              <h3 className="text-xl font-semibold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="mb-6 opacity-90">Notre équipe est là pour vous aider</p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-[var(--color-bg-raised)] font-semibold rounded-xl transition-colors"
                style={{ color: 'var(--color-accent)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-raised)'}
              >
                Nous contacter
              </a>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
