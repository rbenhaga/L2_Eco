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
    <div className="min-h-screen antialiased relative" data-theme="light">
      <BackgroundBlobs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <section className="py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-black/5 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-10 h-10 text-indigo-600" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
                  Conditions Générales d'Utilisation
                </h1>
              </div>

              <p className="text-sm text-slate-500 mb-8">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <div className="space-y-8 text-slate-700">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Objet</h2>
                  <p>
                    Les présentes CGU régissent l'accès et l'utilisation de la plateforme RevP2,
                    un service éducatif en ligne destiné aux étudiants en économie.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-indigo-600" />
                    2. Accès au Service
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
                    <li>L'inscription se fait via Google OAuth</li>
                    <li>Vous devez fournir des informations exactes</li>
                    <li>Vous êtes responsable de la confidentialité de votre compte</li>
                    <li><strong>Compte Gratuit :</strong> Accès limité aux contenus de démonstration</li>
                    <li><strong>Compte Premium :</strong> Accès complet à tous les cours et fonctionnalités</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    3. Abonnement et Paiement
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
                    <li>Abonnement semestriel : 15,99€ (paiement unique)</li>
                    <li>Abonnement mensuel : 3,99€/mois × 6 (prélèvement SEPA)</li>
                    <li>Les paiements sont traités par Stripe (certifié PCI DSS)</li>
                    <li>Vous pouvez annuler à tout moment depuis votre espace client</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Usages Interdits</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
                    <li><strong>Partage de compte :</strong> Votre compte est strictement personnel</li>
                    <li><strong>Revente de contenu :</strong> Interdiction de commercialiser nos ressources</li>
                    <li><strong>Reproduction :</strong> Copie ou redistribution du contenu sans autorisation</li>
                    <li><strong>Abus de l'IA :</strong> Spam ou tentatives de contournement</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Propriété Intellectuelle</h2>
                  <p className="text-slate-600">
                    Tous les contenus de RevP2 sont protégés par le droit d'auteur.
                    Licence d'utilisation personnelle non transférable accordée aux utilisateurs Premium.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Responsabilités</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
                    <li>RevP2 est un outil d'aide à la révision, pas un substitut aux cours officiels</li>
                    <li>Nous ne garantissons pas la réussite aux examens</li>
                    <li>Les réponses de l'IA sont fournies à titre indicatif</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Contact</h2>
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <p className="font-semibold text-slate-900 mb-2">RevP2 - Service Client</p>
                    <p className="text-slate-600">Email : <a href="mailto:support@revp2.com" className="text-indigo-600 hover:underline">support@revp2.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
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
