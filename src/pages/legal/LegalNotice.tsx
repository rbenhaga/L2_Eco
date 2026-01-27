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
                <Scale className="w-10 h-10 text-indigo-600" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
                  Mentions Légales
                </h1>
              </div>

              <p className="text-sm text-slate-500 mb-8">
                Conformément à la Loi n°2004-575 du 21 juin 2004 (LCEN).
              </p>

              <div className="space-y-8 text-slate-700">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    1. Éditeur du Site
                  </h2>
                  <div className="bg-slate-50 p-6 rounded-xl space-y-2 text-slate-600">
                    <p><strong>Nom :</strong> RevP2</p>
                    <p><strong>Statut :</strong> [Micro-entreprise / SARL / etc.]</p>
                    <p><strong>SIRET :</strong> [Votre numéro SIRET]</p>
                    <p><strong>Siège social :</strong> [Adresse complète]</p>
                    <p><strong>Email :</strong> <a href="mailto:contact@revp2.com" className="text-indigo-600 hover:underline">contact@revp2.com</a></p>
                    <p><strong>Directeur de la publication :</strong> [Votre nom]</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    2. Hébergement
                  </h2>
                  <div className="bg-slate-50 p-6 rounded-xl space-y-2 text-slate-600">
                    <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
                    <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
                    <p><strong>Site :</strong> [URL hébergeur]</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Propriété Intellectuelle</h2>
                  <p className="text-slate-600">
                    L'ensemble des contenus présents sur RevP2 est la propriété exclusive de RevP2.
                    Toute reproduction sans autorisation écrite préalable est interdite.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Limitation de Responsabilité</h2>
                  <p className="text-slate-600">
                    RevP2 s'efforce d'assurer l'exactitude des informations mais ne peut garantir
                    l'exhaustivité des contenus. RevP2 ne pourra être tenue responsable des dommages
                    directs ou indirects résultant de l'utilisation du site.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Cookies</h2>
                  <p className="text-slate-600">
                    Le site utilise des cookies pour améliorer l'expérience utilisateur.
                    Consultez notre <a href="/privacy" className="text-indigo-600 hover:underline">Politique de Confidentialité</a> pour plus d'informations.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Droit Applicable</h2>
                  <p className="text-slate-600">
                    Les présentes mentions légales sont régies par le droit français.
                    Tout litige sera soumis à la compétence des tribunaux français.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Contact</h2>
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <p className="text-slate-600">Email : <a href="mailto:legal@revp2.com" className="text-indigo-600 hover:underline">legal@revp2.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
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
