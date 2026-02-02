import { motion } from 'framer-motion';
import { Scale, Building2, Globe } from 'lucide-react';
import { useEffect } from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BackgroundBlobs } from "../../components/layout/BackgroundBlobs";

export default function LegalNotice() {
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
                <Scale className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />
                <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Mentions Légales
                </h1>
              </div>

              <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Conformément à la Loi n°2004-575 du 21 juin 2004 (LCEN).
              </p>

              <div className="space-y-8" style={{ color: 'var(--color-text-secondary)' }}>
                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Building2 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    1. Éditeur du Site
                  </h2>
                  <div className="p-6 rounded-xl space-y-2" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                    <p><strong>Nom :</strong> RevP2</p>
                    <p><strong>Statut :</strong> [Micro-entreprise / SARL / etc.]</p>
                    <p><strong>SIRET :</strong> [Votre numéro SIRET]</p>
                    <p><strong>Siège social :</strong> [Adresse complète]</p>
                    <p><strong>Email :</strong> <a href="mailto:contact@revp2.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>contact@revp2.com</a></p>
                    <p><strong>Directeur de la publication :</strong> [Votre nom]</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <Globe className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    2. Hébergement
                  </h2>
                  <div className="p-6 rounded-xl space-y-2" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                    <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
                    <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
                    <p><strong>Site :</strong> [URL hébergeur]</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3. Propriété Intellectuelle</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    L'ensemble des contenus présents sur RevP2 est la propriété exclusive de RevP2.
                    Toute reproduction sans autorisation écrite préalable est interdite.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4. Limitation de Responsabilité</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    RevP2 s'efforce d'assurer l'exactitude des informations mais ne peut garantir
                    l'exhaustivité des contenus. RevP2 ne pourra être tenue responsable des dommages
                    directs ou indirects résultant de l'utilisation du site.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>5. Cookies</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Le site utilise des cookies pour améliorer l'expérience utilisateur.
                    Consultez notre <a href="/privacy" className="hover:underline" style={{ color: 'var(--color-accent)' }}>Politique de Confidentialité</a> pour plus d'informations.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>6. Droit Applicable</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Les présentes mentions légales sont régies par le droit français.
                    Tout litige sera soumis à la compétence des tribunaux français.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>7. Contact</h2>
                  <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-overlay)' }}>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Email : <a href="mailto:legal@revp2.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>legal@revp2.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Mentions légales mises à jour le {new Date().toLocaleDateString('fr-FR')}
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
