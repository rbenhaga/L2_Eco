import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getOikoEditionBySlug, getOikoEmailPreviewUrl, type OikoEdition } from '../services/oikoNews';
import './OikoNews.css';

export function OikoNewsComparePage() {
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
        if (active) setError('Impossible de charger cette comparaison.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [slug]);

  const sitePreviewUrl = useMemo(() => `/oiko-news/${slug}?embed=1`, [slug]);
  const emailPreviewUrl = useMemo(() => getOikoEmailPreviewUrl(slug), [slug]);

  return (
    <div className="oiko-page-shell">
      <div className="oiko-page-top">
        <Header />

        <main className="oiko-page-main oiko-page-main-wide">
          <div className="oiko-compare-toolbar">
            <Link to={`/oiko-news/${slug}`} className="oiko-text-link oiko-back-link">
              <ArrowLeft className="h-4 w-4" />
              Retour à l’édition
            </Link>
            <div className="oiko-inline-actions">
              <a className="oiko-text-link" href={sitePreviewUrl} target="_blank" rel="noreferrer">
                Ouvrir le site
                <ExternalLink className="h-4 w-4" />
              </a>
              <a className="oiko-text-link" href={emailPreviewUrl} target="_blank" rel="noreferrer">
                Ouvrir le mail
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <section className="oiko-panel oiko-section oiko-section-stack">
            <div className="oiko-section-head">
              <div>
                <p className="oiko-section-kicker">Comparaison</p>
                <h1>{edition?.editorialAngle || edition?.content?.lead_story?.title || 'Site vs email'}</h1>
              </div>
              {edition?.displayDate ? <span className="oiko-date-chip">{edition.displayDate}</span> : null}
            </div>
            <p className="oiko-copy">
              Cette page affiche à gauche le rendu site de l’édition et à droite le HTML réellement stocké pour l’email.
            </p>
          </section>

          {loading ? <section className="oiko-panel oiko-empty">Chargement de la comparaison…</section> : null}
          {!loading && error ? <section className="oiko-panel oiko-empty">{error}</section> : null}
          {!loading && !error && !edition ? <section className="oiko-panel oiko-empty">Cette édition est introuvable.</section> : null}

          {!loading && !error && edition ? (
            <section className="oiko-compare-grid" aria-label="Comparaison site et email Oiko News">
              <article className="oiko-compare-card">
                <div className="oiko-compare-card__header">
                  <div>
                    <p className="oiko-section-kicker">Rendu site</p>
                    <h2>Article web</h2>
                  </div>
                </div>
                <iframe
                  className="oiko-compare-frame"
                  title="Prévisualisation de l’article sur le site"
                  src={sitePreviewUrl}
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts"
                />
              </article>

              <article className="oiko-compare-card">
                <div className="oiko-compare-card__header">
                  <div>
                    <p className="oiko-section-kicker">Rendu email</p>
                    <h2>HTML du mail envoyé</h2>
                  </div>
                </div>
                <iframe
                  className="oiko-compare-frame"
                  title="Prévisualisation HTML de l’email Oiko"
                  src={emailPreviewUrl}
                  loading="lazy"
                  sandbox="allow-same-origin"
                />
              </article>
            </section>
          ) : null}
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

export default OikoNewsComparePage;
