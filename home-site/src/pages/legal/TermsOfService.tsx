import { motion } from 'framer-motion';
import { FileText, CreditCard, UserCheck } from 'lucide-react';
import { useEffect } from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BackgroundBlobs } from "../../components/layout/BackgroundBlobs";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
      <BackgroundBlobs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <section className="py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{
                background: 'var(--color-bg-raised)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border-default)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />
                <h1 className="text-3xl sm:text-4xl font-bold" style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-serif)'
                }}>
                  Conditions Générales d'Utilisation
                </h1>
              </div>

              <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <div className="space-y-8" style={{ color: 'var(--color-text-secondary)' }}>
                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1. Objet</h2>
                  <p>
                    Les présentes CGU régissent l'accès et l'utilisation de la plateforme RevP2,
                    un service éducatif en ligne destiné aux étudiants en économie.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <UserCheck className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    2. Accès au Service
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>L'inscription se fait via Google OAuth</li>
                    <li>Vous devez fournir des informations exactes</li>
                    <li>Vous êtes responsable de la confidentialité de votre compte</li>
                    <li><strong>Compte Gratuit :</strong> Accès limité aux contenus de démonstration</li>
                    <li><strong>Compte Premium :</strong> Accès complet à tous les cours et fonctionnalités</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <CreditCard className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    3. Abonnement et Paiement
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Abonnement semestriel : 15,99€ (paiement unique, 6 mois d'accès)</li>
                    <li>Abonnement annuel : 29,99€ (paiement unique, 12 mois d'accès)</li>
                    <li>Les paiements sont traités par Stripe (certifié PCI DSS)</li>
                    <li>Vous pouvez annuler à tout moment depuis votre espace client</li>
                    <li>Aucun remboursement après 14 jours suivant l'achat</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4. Usages Interdits</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Partage de compte :</strong> Votre compte est strictement personnel</li>
                    <li><strong>Revente de contenu :</strong> Interdiction de commercialiser nos ressources</li>
                    <li><strong>Reproduction :</strong> Copie ou redistribution du contenu sans autorisation</li>
                    <li><strong>Abus de l'IA :</strong> Spam ou tentatives de contournement</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>5. Propriété Intellectuelle</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Tous les contenus de RevP2 sont protégés par le droit d'auteur.
                    Licence d'utilisation personnelle non transférable accordée aux utilisateurs Premium.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>6. Responsabilités</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>RevP2 est un outil d'aide à la révision, pas un substitut aux cours officiels</li>
                    <li>Nous ne garantissons pas la réussite aux examens</li>
                    <li>Les réponses de l'IA sont fournies à titre indicatif</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>7. Contact</h2>
                  <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-overlay)' }}>
                    <p className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>RevP2 - Service Client</p>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Email : <a href="mailto:support@revp2.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>support@revp2.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                  En utilisant RevP2, vous acceptez les présentes CGU.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
