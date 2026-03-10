import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getOikoEditionBySlug, type OikoEdition, type OikoRichTextBlock, type OikoRichTextPart, type OikoSectionVisual } from '../services/oikoNews';
import './OikoNews.css';

function getSafeHref(href?: string) {
  if (!href) return null;
  try {
    const url = new URL(href);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch (_error) {
    return null;
  }
}

function RichText({ parts = [] }: { parts?: OikoRichTextPart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        const safeHref = getSafeHref(part.href);
        return safeHref ? (
          <a key={`link-${index}`} href={safeHref} target="_blank" rel="noreferrer">
            {part.text}
          </a>
        ) : (
          <span key={`text-${index}`}>{part.text}</span>
        );
      })}
    </>
  );
}

function RichParagraph({ block }: { block: OikoRichTextBlock }) {
  return (
    <p>
      <RichText parts={block.parts} />
    </p>
  );
}

function SectionImage({ visual, className = '' }: { visual?: OikoSectionVisual | null; className?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, [visual?.image_url]);

  if (!visual?.image_url || hidden) return null;
  return (
    <figure className={`oiko-section-figure ${className}`.trim()}>
      <img className="oiko-section-image" src={visual.image_url} alt={visual.alt_text} loading="lazy" onError={() => setHidden(true)} />
      {visual.credit_line && !hidden ? <figcaption>{visual.credit_line}</figcaption> : null}
    </figure>
  );
}

function ChartImage({ src, alt }: { src: string; alt: string }) {
  const [hidden, setHidden] = useState(!src);

  useEffect(() => {
    setHidden(!src);
  }, [src]);

  if (!src || hidden) return null;

  return <img className="oiko-chart oiko-chart-large" src={src} alt={alt} loading="lazy" onError={() => setHidden(true)} />;
}

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
      } catch (_err) {
        if (active) setError('Impossible de charger cette édition.');
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
  const charts = content?.markets_section?.charts?.filter((chart) => Boolean(chart.image_url)) ?? [];
  const hasRadarItems = Boolean(content?.radar_section?.items?.length);
  const hasCarnetItems = Boolean(content?.carnet_section?.items?.length);
  const hasBriefItems = Boolean(content?.briefs_section?.items?.length);

  return (
    <div className="oiko-page-shell">
      <div className="oiko-page-top">
        <Header />

        <main className="oiko-page-main oiko-page-main-single">
          <Link to="/oiko-news" className="oiko-text-link oiko-back-link">
            <ArrowLeft className="h-4 w-4" />
            Retour à Oiko News
          </Link>

          {loading ? <section className="oiko-panel oiko-empty">Chargement de l’édition…</section> : null}
          {!loading && error ? <section className="oiko-panel oiko-empty">{error}</section> : null}
          {!loading && !error && !content ? <section className="oiko-panel oiko-empty">Cette édition est introuvable.</section> : null}

          {content && edition ? (
            <article className="oiko-article-panel oiko-newsletter-article">
              <header className="oiko-article-header">
                <p className="oiko-kicker">{content.date_label}</p>
                <SectionImage visual={content.header_visual} className="oiko-header-figure" />
                <div className="oiko-article-copy">
                  {content.intro.paragraphs.map((paragraph, index) => (
                    <RichParagraph key={`intro-${index}`} block={paragraph} />
                  ))}
                </div>
                {content.intro.signature ? <p className="oiko-signature">{content.intro.signature}</p> : null}
              </header>

              <section className="oiko-article-section">
                <h2>{content.opening_brief.title}</h2>
                <ul className="oiko-menu-list">
                  {content.opening_brief.items.map((item) => (
                    <li key={`${item.label}-${item.parts.map((part) => part.text).join('')}`}>
                      <strong>{item.label} :</strong> <RichText parts={item.parts} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="oiko-article-section">
                <h2>{content.markets_section.title}</h2>
                {charts.length ? (
                  <div className="oiko-chart-row">
                    {charts.map((chart) => (
                      <figure key={chart.key} className="oiko-chart-figure">
                        <ChartImage src={chart.image_url} alt={chart.alt_text} />
                      </figure>
                    ))}
                  </div>
                ) : null}
                <div className="oiko-article-copy">
                  {content.markets_section.paragraphs.map((paragraph) => (
                    <p key={paragraph.label}>
                      <strong>{paragraph.label} :</strong> <RichText parts={paragraph.parts} />
                    </p>
                  ))}
                </div>
              </section>

              <section className="oiko-article-section">
                <p className="oiko-story-kicker">{content.lead_story.kicker}</p>
                <h2>{content.lead_story.title}</h2>
                <SectionImage visual={content.lead_story.visual} />
                <div className="oiko-article-copy">
                  {content.lead_story.paragraphs.map((paragraph, index) => (
                    <RichParagraph key={`lead-${index}`} block={paragraph} />
                  ))}
                </div>
                {content.lead_story.signature ? <p className="oiko-signature">{content.lead_story.signature}</p> : null}
              </section>
              {hasRadarItems ? (
                <section className="oiko-article-section">
                  <h2>{content.radar_section.title}</h2>
                  <SectionImage visual={content.radar_section.visual} />
                  <div className="oiko-story-stream">
                    {content.radar_section.items.map((item) => (
                      <article key={item.title} className="oiko-story-stream-item">
                        <h3>{item.title}</h3>
                        <div className="oiko-article-copy">
                          {item.paragraphs.map((paragraph, index) => (
                            <RichParagraph key={`${item.title}-${index}`} block={paragraph} />
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {hasCarnetItems ? (
                <section className="oiko-article-section">
                  <h2>{content.carnet_section.title}</h2>
                  <SectionImage visual={content.carnet_section.visual} />
                  <div className="oiko-story-stream">
                    {content.carnet_section.items.map((item) => (
                      <article key={item.title} className="oiko-story-stream-item">
                        <h3>{item.title}</h3>
                        <div className="oiko-article-copy">
                          {item.paragraphs.map((paragraph, index) => (
                            <RichParagraph key={`${item.title}-${index}`} block={paragraph} />
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {hasBriefItems ? (
                <section className="oiko-article-section">
                  <h2>{content.briefs_section.title}</h2>
                  <ul className="oiko-list oiko-list-dense">
                    {content.briefs_section.items.map((item, index) => (
                      <li key={`brief-${index}`}>
                        <RichText parts={item.parts} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="oiko-article-section oiko-article-section-last">
                <p className="oiko-sources-line">
                  <RichText parts={content.footer_sources_note.parts} />
                </p>
                <p className="oiko-disclaimer">{content.footer_disclaimer}</p>
                {edition.contentVersion === 'v1' ? <p className="oiko-legacy-note">Archive convertie automatiquement depuis le format historique.</p> : null}
              </section>
            </article>
          ) : null}
        </main>
      </div>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

export default OikoNewsEditionPage;
