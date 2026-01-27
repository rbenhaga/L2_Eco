import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BackgroundBlobs } from "../../components/layout/BackgroundBlobs";

export default function PrivacyPolicy() {
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
          <Shield className="w-10 h-10 text-indigo-600" />
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Politique de Confidentialité
          </h1>
        </div>

        <p className="text-sm text-slate-500 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              1. Données Collectées
            </h2>
            <p className="mb-4">
              RevP2 collecte et traite les données suivantes dans le cadre de l'utilisation de notre plateforme :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li><strong>Données d'authentification :</strong> Email, nom, photo de profil (via Google OAuth)</li>
              <li><strong>Données de navigation :</strong> Pages visitées, temps passé, interactions</li>
              <li><strong>Données de paiement :</strong> Gérées exclusivement par Stripe (nous ne stockons aucune donnée bancaire)</li>
              <li><strong>Données d'abonnement :</strong> Statut d'abonnement, date d'expiration</li>
              <li><strong>Données d'utilisation :</strong> Questions posées à l'IA, quiz réalisés, progression</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              2. Utilisation des Données
            </h2>
            <p className="mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li>Fournir et améliorer nos services éducatifs</li>
              <li>Personnaliser votre expérience d'apprentissage</li>
              <li>Gérer votre abonnement et vos paiements</li>
              <li>Communiquer avec vous (mises à jour, notifications)</li>
              <li>Analyser l'utilisation de la plateforme (anonymisé)</li>
              <li>Assurer la sécurité et prévenir les abus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              3. Protection des Données
            </h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures de sécurité strictes :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li>Chiffrement SSL/TLS pour toutes les communications</li>
              <li>Base de données sécurisée avec accès restreint</li>
              <li>Authentification Firebase avec Google OAuth 2.0</li>
              <li>Paiements sécurisés via Stripe (certifié PCI DSS)</li>
              <li>Sauvegardes régulières et redondance des données</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              4. Vos Droits (RGPD)
            </h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li><strong>Droit d'accès :</strong> Consulter vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger vos informations</li>
              <li><strong>Droit à l'effacement :</strong> Supprimer votre compte et vos données</li>
              <li><strong>Droit à la portabilité :</strong> Exporter vos données</li>
              <li><strong>Droit d'opposition :</strong> Refuser certains traitements</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits : <a href="mailto:privacy@revp2.com" className="text-indigo-600 hover:underline">privacy@revp2.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              5. Contact
            </h2>
            <div className="bg-slate-50 p-6 rounded-xl">
              <p className="font-semibold text-slate-900 mb-2">RevP2 - Protection des Données</p>
              <p className="text-slate-600">Email : <a href="mailto:privacy@revp2.com" className="text-indigo-600 hover:underline">privacy@revp2.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            Cette politique est conforme au RGPD (Règlement UE 2016/679).
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
