import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import {
  getLatestOikoEdition,
  getMyOikoSubscription,
  getOikoArchive,
  richTextToPlainText,
  unsubscribeFromOiko,
  updateMyOikoSubscription,
  type OikoArchiveEntry,
  type OikoEdition,
  type OikoSubscription,
} from '../services/oikoNews';
import './OikoNews.css';

type OikoPreviewEntry = OikoEdition | OikoArchiveEntry;

function hasEditionContent(entry: OikoPreviewEntry): entry is OikoEdition {
  return 'content' in entry;
}

function getEntryHeadline(entry: OikoPreviewEntry) {
  if (hasEditionContent(entry)) {
    return entry.editorialAngle || entry.content?.lead_story?.title || entry.displayDate;
  }
  return entry.editorialAngle || entry.emailSubject || entry.displayDate;
}

function getEntryIntro(entry: OikoPreviewEntry) {
  if (hasEditionContent(entry)) {
    return entry.content?.intro?.paragraphs?.[0]
      ? richTextToPlainText(entry.content.intro.paragraphs[0])
      : 'Résumé disponible dans l’édition complète.';
  }
  return entry.intro || 'Résumé disponible dans l’édition complète.';
}

export function OikoNewsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [latestEdition, setLatestEdition] = useState<OikoEdition | null>(null);
  const [archive, setArchive] = useState<OikoArchiveEntry[]>([]);
  const [subscription, setSubscription] = useState<OikoSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const unsubscribeToken = searchParams.get('unsubscribe');

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const [latest, archiveResult] = await Promise.all([
          getLatestOikoEdition(),
          getOikoArchive(1, 12),
        ]);

        if (!active) return;
        setLatestEdition(latest);
        setArchive(archiveResult.editions);

        if (user) {
          try {
            const subscriptionState = await getMyOikoSubscription();
            if (active) setSubscription(subscriptionState);
          } catch (_error) {
            if (active) setSubscription(null);
          }
        } else if (active) {
          setSubscription(null);
        }
      } catch (_error) {
        if (active) {
          setNotice('Impossible de charger Oiko News pour le moment.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!unsubscribeToken) return;
    let active = true;

    const run = async () => {
      try {
        await unsubscribeFromOiko(unsubscribeToken);
        if (!active) return;
        setNotice('Vous avez été désinscrit de Oiko News.');
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete('unsubscribe');
          return next;
        }, { replace: true });
      } catch (_error) {
        if (active) {
          setNotice('Le lien de désinscription est invalide ou expiré.');
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [unsubscribeToken, setSearchParams]);

  const isSubscribed = subscription?.subscribed ?? false;
  const subscriptionEmail = subscription?.email || user?.email || null;

  const handleSubscriptionToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSubscriptionLoading(true);
    try {
      const nextSubscription = await updateMyOikoSubscription(!isSubscribed, 'page');
      setSubscription(nextSubscription);
      setNotice(nextSubscription.subscribed
        ? 'Envoi quotidien activé.'
        : 'Envoi quotidien désactivé.');
    } catch (_error) {
      setNotice('Impossible de mettre à jour votre abonnement pour le moment.');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  return (
    <div className="oiko-page-shell">
      <div className="oiko-page-top">
        <Header />

        <main className="oiko-page-main oiko-page-main-single">
          <section className="oiko-panel oiko-section oiko-section-stack">
            <div className="oiko-section-head">
              <div>
                <p className="oiko-section-kicker">Newsletter média</p>
                <h1>Oiko News</h1>
              </div>
            </div>
            <p className="oiko-copy">
              Une lecture du matin pensée comme un brief macro mondial: ouverture, grand angle, radar, carnet et édition complète sur le site.
            </p>
            <div className="oiko-inline-actions">
              <button type="button" className="oiko-manage-link" onClick={() => void handleSubscriptionToggle()} disabled={subscriptionLoading}>
                {subscriptionLoading ? 'Mise à jour…' : isSubscribed ? 'Désactiver l’envoi' : 'Activer l’envoi'}
              </button>
              {subscriptionEmail ? <span className="oiko-date-chip">{subscriptionEmail}</span> : null}
            </div>
          </section>

          {notice ? <section className="oiko-panel oiko-empty">{notice}</section> : null}
          {loading ? <section className="oiko-panel oiko-empty">Chargement de l’édition du jour…</section> : null}

          {!loading && latestEdition?.content ? (
            <article className="oiko-panel oiko-section oiko-section-stack">
              <div className="oiko-section-head">
                <div>
                  <p className="oiko-section-kicker">Édition du jour</p>
                  <h2>{getEntryHeadline(latestEdition)}</h2>
                </div>
                <span className="oiko-date-chip">{latestEdition.displayDate}</span>
              </div>
              {latestEdition.content.header_visual?.image_url ? (
                <img
                  className="oiko-chart oiko-landing-image"
                  src={latestEdition.content.header_visual.image_url}
                  alt={latestEdition.content.header_visual.alt_text}
                  loading="eager"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <p className="oiko-copy">{getEntryIntro(latestEdition)}</p>
              <ul className="oiko-list oiko-list-compact">
                {latestEdition.content.opening_brief.items.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label} :</strong> {richTextToPlainText({ parts: item.parts })}
                  </li>
                ))}
              </ul>
              <div className="oiko-inline-actions">
                <Link className="oiko-text-link" to={`/oiko-news/${latestEdition.slug}`}>
                  Lire l’édition complète
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ) : null}

          {!loading && !latestEdition?.content ? <section className="oiko-panel oiko-empty">Aucune édition Oiko News n’est encore disponible.</section> : null}

          <section className="oiko-panel oiko-section oiko-section-stack">
            <div className="oiko-section-head">
              <div>
                <p className="oiko-section-kicker">Archive</p>
                <h2>Dernières éditions</h2>
              </div>
            </div>
            {archive.length > 0 ? (
              <div className="oiko-archive-list">
                {archive.map((edition) => (
                  <Link key={edition.slug} to={`/oiko-news/${edition.slug}`} className="oiko-article-row">
                    <span className="oiko-article-date">{edition.displayDate}</span>
                    <div className="oiko-article-body">
                      <strong className="oiko-article-title">{getEntryHeadline(edition)}</strong>
                      <p>{getEntryIntro(edition)}</p>
                    </div>
                    <span className="oiko-article-arrow" aria-hidden="true">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="oiko-copy">Les éditions apparaîtront ici au fil des publications.</p>
            )}
          </section>
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

export default OikoNewsPage;
