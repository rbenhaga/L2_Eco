import { useEffect, useState } from 'react';

import {
  type OikoEdition,
  type OikoEditionContent,
  type OikoRichTextPart,
  type OikoSectionVisual,
} from '../services/oikoNews';
import {
  buildBriefRows,
  buildHeroDek,
  buildHeroIntroParagraphs,
  buildLeadSections,
  buildMarketFallbackRows,
  buildMarketSectionMeta,
  buildMarketSectionSummary,
  buildMenuRows,
  polishDisplayedCopy,
  buildStableMarketLines,
  buildStorySummary,
  formatMarketRegimeLabel,
  getEditionSurfaceLabel,
  type OikoMarketLineModel,
} from './oikoEditionSurface';

const MENU_LABEL = 'Menu du jour';
const MARKETS_LABEL = 'Sur les march\u00e9s';
const SOURCES_LABEL = 'Sources du jour';
const LEGACY_NOTE = "Archive convertie automatiquement depuis le format historique.";

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

function InlineSectionVisual({ visual, alt }: { visual?: OikoSectionVisual | null; alt: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, [visual?.image_url]);

  if (!visual?.image_url || hidden || visual.provider === 'oiko-fallback') return null;

  return (
    <figure className="oiko-newsletter-inline-visual">
      <img src={visual.image_url} alt={visual.alt_text || alt} loading="lazy" onError={() => setHidden(true)} />
      {visual.credit_line ? <figcaption>{visual.credit_line}</figcaption> : null}
    </figure>
  );
}

function MarketSeriesRow({ line }: { line: OikoMarketLineModel }) {
  return (
    <article className={`oiko-market-line oiko-market-line--series is-${line.delta.direction}`}>
      <div className="oiko-market-line__identity">
        <p className="oiko-market-line__label">{line.label}</p>
      </div>
      <div className="oiko-market-line__pricing">
        <p className="oiko-market-line__value">
          <strong>{line.valueText}</strong>
          {line.unitText ? <span>{line.unitText}</span> : null}
        </p>
        <p className={`oiko-market-line__delta is-${line.delta.tone}`}>
          <span aria-hidden="true">{line.delta.arrow}</span>
          {line.delta.text}
        </p>
        <p className="oiko-market-line__period">{line.period}</p>
      </div>
    </article>
  );
}

function MarketFallbackRow({ label, text }: { label: string; text: string }) {
  return (
    <article className="oiko-market-line oiko-market-line--fallback">
      <div className="oiko-market-line__identity">
        <p className="oiko-market-line__label">{label}</p>
      </div>
      <p className="oiko-market-line__fallback-copy">{text}</p>
    </article>
  );
}

function StoryListSection({
  title,
  summary,
  visual,
  items,
}: {
  title: string;
  summary?: string;
  visual?: OikoSectionVisual | null;
  items: Array<{ title: string; paragraphs: Array<{ parts: OikoRichTextPart[] }> }>;
}) {
  if (!items.length) return null;

  return (
    <section className="oiko-newsletter-section">
      <div className="oiko-newsletter-section__head">
        <h2>{title}</h2>
        {summary ? <p className="oiko-newsletter-section__summary">{summary}</p> : null}
      </div>
      <InlineSectionVisual visual={visual} alt={title} />
      <div className="oiko-story-list">
        {items.map((item) => (
          <article key={`${title}-${item.title}`} className="oiko-story-row">
            <h3>{item.title}</h3>
            <div className="oiko-story-row__copy">
              {item.paragraphs
                .map((paragraph) => polishDisplayedCopy(paragraph.parts.map((part) => part.text).join('').trim()))
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={`${item.title}-${index}`}>{paragraph}</p>
                ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function OikoPremiumEditionSurface({ edition, content }: { edition: OikoEdition; content: OikoEditionContent }) {
  const sourceLabel = getEditionSurfaceLabel(edition);
  const regimeLabel = formatMarketRegimeLabel(edition.marketRegime);
  const heroIntro = buildHeroIntroParagraphs(edition, content);
  const heroDek = buildHeroDek(edition, content);
  const menuRows = buildMenuRows(content);
  const marketLines = buildStableMarketLines(edition);
  const marketFallbackRows = buildMarketFallbackRows(content);
  const marketSummary = buildMarketSectionSummary(edition, content);
  const marketMeta = buildMarketSectionMeta(edition);
  const leadSections = buildLeadSections(content);
  const leadSignature = content.lead_story?.signature || content.intro.signature;
  const heroTitle = content.lead_story?.title || edition.editorialAngle;
  const leadKicker = content.lead_story?.kicker || 'Le point de bascule';
  const briefRows = buildBriefRows(content);
  const radarSummary = buildStorySummary(content.radar_section.items);
  const carnetSummary = buildStorySummary(content.carnet_section.items);

  return (
    <article
      className="oiko-article-panel oiko-newsletter-article oiko-newsletter-premium oiko-newsletter-premium--linear"
      data-source-kind={edition.sourceKind || ''}
      data-pipeline-version={edition.pipelineVersion || ''}
    >
      <header className="oiko-newsletter-hero">
        <div className="oiko-newsletter-hero__meta">
          <span className="oiko-meta-pill">{content.date_label}</span>
          <span className={`oiko-meta-pill ${edition.sourceKind === 'v3_packet' ? 'is-v3' : 'is-legacy'}`}>{sourceLabel}</span>
          {regimeLabel ? <span className="oiko-meta-pill">{regimeLabel}</span> : null}
        </div>
        <p className="oiko-newsletter-hero__kicker">{content.lead_story?.kicker || 'Oiko News'}</p>
        <h1 className="oiko-newsletter-hero__title">{heroTitle}</h1>
        {heroDek ? <p className="oiko-newsletter-hero__dek">{heroDek}</p> : null}
        <div className="oiko-newsletter-hero__intro">
          {heroIntro.map((paragraph, index) => (
            <p key={`hero-${index}`} className={index === 0 ? 'is-hero-first' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
        {content.intro.signature ? <p className="oiko-signature oiko-newsletter-hero__signature">{content.intro.signature}</p> : null}
      </header>

      <section className="oiko-newsletter-section">
        <div className="oiko-newsletter-section__head">
          <h2>{MENU_LABEL}</h2>
        </div>
        <ol className="oiko-menu-list">
          {menuRows.map((item, index) => (
            <li key={`${item.label}-${index}`} className="oiko-menu-row">
              <div className="oiko-menu-row__index">{String(index + 1).padStart(2, '0')}</div>
              <div className="oiko-menu-row__body">
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="oiko-newsletter-section">
        <div className="oiko-newsletter-section__head">
          <h2>{MARKETS_LABEL}</h2>
          {marketSummary ? <p className="oiko-newsletter-section__summary">{marketSummary}</p> : null}
          {marketMeta ? <p className="oiko-newsletter-section__meta-note">{marketMeta}</p> : null}
        </div>

        {marketLines.length ? (
          <div className="oiko-market-lines">
            {marketLines.map((line) => (
              <MarketSeriesRow key={line.id} line={line} />
            ))}
          </div>
        ) : (
          <div className="oiko-market-lines oiko-market-lines--fallback">
            {marketFallbackRows.map((row) => (
              <MarketFallbackRow key={row.label} label={row.label} text={row.text} />
            ))}
          </div>
        )}
      </section>

      <section className="oiko-newsletter-section oiko-newsletter-section--lead">
        <div className="oiko-newsletter-section__head">
          <p className="oiko-kicker">{leadKicker}</p>
        </div>
        <InlineSectionVisual visual={content.lead_story?.visual} alt={heroTitle} />
        <div className="oiko-lead-sections">
          {leadSections.map((section) => (
            <section key={section.label} className="oiko-lead-section">
              <h3>{section.label}</h3>
              <div className="oiko-lead-section__copy">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.label}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        {leadSignature ? <p className="oiko-signature oiko-newsletter-lead__signature">{leadSignature}</p> : null}
      </section>

      <StoryListSection
        title={content.radar_section.title || 'Sous la surface'}
        summary={radarSummary}
        visual={content.radar_section.visual}
        items={content.radar_section.items}
      />

      <StoryListSection
        title={content.carnet_section.title || 'Ligne de force'}
        summary={carnetSummary}
        visual={content.carnet_section.visual}
        items={content.carnet_section.items}
      />

      {briefRows.length ? (
        <section className="oiko-newsletter-section">
          <div className="oiko-newsletter-section__head">
            <h2>En bref</h2>
          </div>
          <ul className="oiko-brief-list">
            {briefRows.map((item, index) => (
              <li key={`brief-${index}`} className="oiko-brief-row">
                <span className="oiko-brief-row__index">{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="oiko-premium-footer">
        <div className="oiko-premium-footer__source">
          <p className="oiko-kicker">{SOURCES_LABEL}</p>
          <p>
            <RichText parts={content.footer_sources_note.parts} />
          </p>
        </div>
        <div className="oiko-premium-footer__notes">
          {edition.sourceKind === 'legacy_edition' ? <p>{LEGACY_NOTE}</p> : null}
          <p>{content.footer_disclaimer}</p>
        </div>
      </footer>
    </article>
  );
}

export default OikoPremiumEditionSurface;
