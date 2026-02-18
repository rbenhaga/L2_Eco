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
                <Shield className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />
                <h1 className="text-3xl sm:text-4xl font-bold" style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-serif)'
                }}>
                  Politique de Confidentialité
                </h1>
              </div>

              <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <div className="space-y-8" style={{ color: 'var(--color-text-secondary)' }}>
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Database className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    1. Données Collectées
                  </h2>
                  <p className="mb-4">
                    RevP2 collecte et traite les données suivantes dans le cadre de l'utilisation de notre plateforme :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Données d'authentification :</strong> Email, nom, photo de profil (via Google OAuth)</li>
                    <li><strong>Données de navigation :</strong> Pages visitées, temps passé, interactions</li>
                    <li><strong>Données de paiement :</strong> Gérées exclusivement par Stripe (nous ne stockons aucune donnée bancaire)</li>
                    <li><strong>Données d'abonnement :</strong> Statut d'abonnement, date d'expiration</li>
                    <li><strong>Données d'utilisation :</strong> Questions posées à l'IA, quiz réalisés, progression</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Eye className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    2. Utilisation des Données
                  </h2>
                  <p className="mb-4">Vos données sont utilisées pour :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Fournir et améliorer nos services éducatifs</li>
                    <li>Personnaliser votre expérience d'apprentissage</li>
                    <li>Gérer votre abonnement et vos paiements</li>
                    <li>Communiquer avec vous (mises à jour, notifications)</li>
                    <li>Analyser l'utilisation de la plateforme (anonymisé)</li>
                    <li>Assurer la sécurité et prévenir les abus</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Lock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    3. Protection des Données
                  </h2>
                  <p className="mb-4">
                    Nous mettons en œuvre des mesures de sécurité strictes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Chiffrement SSL/TLS pour toutes les communications</li>
                    <li>Base de données sécurisée avec accès restreint</li>
                    <li>Authentification Firebase avec Google OAuth 2.0</li>
                    <li>Paiements sécurisés via Stripe (certifié PCI DSS)</li>
                    <li>Sauvegardes régulières et redondance des données</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    4. Vos Droits (RGPD)
                  </h2>
                  <p className="mb-4">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Droit d'accès :</strong> Consulter vos données personnelles</li>
                    <li><strong>Droit de rectification :</strong> Corriger vos informations</li>
                    <li><strong>Droit à l'effacement :</strong> Supprimer votre compte et vos données</li>
                    <li><strong>Droit à la portabilité :</strong> Exporter vos données</li>
                    <li><strong>Droit d'opposition :</strong> Refuser certains traitements</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits : <a href="mailto:privacy@revp2.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>privacy@revp2.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Mail className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    5. Contact
                  </h2>
                  <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-overlay)' }}>
                    <p className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>RevP2 - Protection des Données</p>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Email : <a href="mailto:privacy@revp2.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>privacy@revp2.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
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
