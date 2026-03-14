import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getOikoEditionBySlug, type OikoEdition } from '../services/oikoNews';
import { OikoPremiumEditionSurface } from './OikoPremiumEditionSurface';
import './OikoNews.css';

const LOAD_ERROR = 'Impossible de charger cette édition.';
const BACK_LABEL = 'Retour à Oiko News';
const LOADING_LABEL = 'Chargement de l’édition…';
const MISSING_LABEL = 'Cette édition est introuvable.';

export function OikoNewsEditionPage() {
  const { slug = '' } = useParams();
  const [edition, setEdition] = useState<OikoEdition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOikoEditionBySlug(slug);
        if (!active) return;
        setEdition(data);
      } catch (_error) {
        if (active) setError(LOAD_ERROR);
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [slug]);

  const content = edition?.content ?? null;

  return (
    <div className="oiko-page-shell">
      <div className="oiko-page-top">
        <Header />

        <main className="oiko-page-main oiko-page-main-single">
          <Link to="/oiko-news" className="oiko-text-link oiko-back-link">
            <ArrowLeft className="h-4 w-4" />
            {BACK_LABEL}
          </Link>

          {loading ? <section className="oiko-panel oiko-empty">{LOADING_LABEL}</section> : null}
          {!loading && error ? <section className="oiko-panel oiko-empty">{error}</section> : null}
          {!loading && !error && !content ? <section className="oiko-panel oiko-empty">{MISSING_LABEL}</section> : null}

          {content && edition ? <OikoPremiumEditionSurface edition={edition} content={content} /> : null}
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

export default OikoNewsEditionPage;
