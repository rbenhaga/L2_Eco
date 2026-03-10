import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Mail, Newspaper, RefreshCw } from 'lucide-react';
import { authFetch } from '../../utils/authFetch';
import { formatOikoDisplayDate } from '../../services/oikoNews';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type OikoAdminUsagePoint = {
  usageDate: string;
  requestsCount: number;
  tokensUsed: number;
  resultsCount: number;
};

type OikoAdminService = {
  key: string;
  label: string;
  configured: boolean;
  requiresKey: boolean;
  envKey?: string;
  docsUrl: string;
  planLabel: string;
  freeLimitLabel: string;
  note: string;
  usage: {
    requestsCount: number;
    tokensUsed: number;
    resultsCount: number;
    lastRequestAt: string | null;
  };
  history: OikoAdminUsagePoint[];
};

type OikoAdminOverview = {
  selectedDate: string;
  windowStartDate: string;
  latestEdition: {
    editionDate: string;
    slug: string;
    status: string;
    siteUrl: string;
    compareUrl: string;
    emailHtmlUrl: string;
  } | null;
  summary: {
    requestsCount: number;
    tokensUsed: number;
    resultsCount: number;
    configuredCount: number;
  };
  services: OikoAdminService[];
};

function formatCompact(value: number) {
  return new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0);
}

function extractIsoDate(value?: string | null) {
  const match = String(value || '').match(/\b(\d{4}-\d{2}-\d{2})\b/);
  return match?.[1] || '';
}

function formatDateTime(value?: string | null) {
  if (!value) return 'Jamais';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return formatOikoDisplayDate(extractIsoDate(value) || String(value || '').slice(0, 10));
  }

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return `${formattedDate} ${formattedTime}`;
}

export function OikoNewsAdminModule() {
  const [selectedDate, setSelectedDate] = useState(() => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
  const [overview, setOverview] = useState<OikoAdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authFetch(`${API_URL}/api/admin/oiko-news/overview?date=${selectedDate}`);
        if (!response.ok) throw new Error('overview_failed');
        const data = await response.json();
        if (!active) return;
        setOverview(data.overview ?? null);
      } catch (_error) {
        if (active) setError('Impossible de charger le module Oiko News.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [selectedDate]);

  const configuredServices = useMemo(
    () => overview?.services.filter((service) => service.configured).length || 0,
    [overview],
  );

  if (loading) {
    return <section className="admin-panel">Chargement du module Oiko News…</section>;
  }

  if (error || !overview) {
    return <section className="admin-panel">{error || 'Module Oiko indisponible.'}</section>;
  }

  return (
    <div className="admin-main-stack">
      <article className="admin-panel admin-panel--sticky">
        <div className="admin-section-header">
          <div className="admin-section-copy">
            <h2 className="admin-section-title">Oiko News</h2>
            <p className="admin-section-description">
              Suivi quotidien des APIs Oiko, quotas gratuits documentés et accès rapide au rendu site / mail.
            </p>
          </div>
          <div className="admin-section-actions">
            <label className="oiko-admin-date-field">
              <span>Date</span>
              <input type="date" className="admin-input" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="admin-inline-stats">
          <div className="admin-inline-stat admin-inline-stat--accent">
            <span className="admin-inline-stat__label">Services configurés</span>
            <strong className="admin-inline-stat__value">{configuredServices}/{overview.services.length}</strong>
          </div>
          <div className="admin-inline-stat admin-inline-stat--success">
            <span className="admin-inline-stat__label">Requêtes du jour</span>
            <strong className="admin-inline-stat__value">{formatCompact(overview.summary.requestsCount)}</strong>
          </div>
          <div className="admin-inline-stat admin-inline-stat--warning">
            <span className="admin-inline-stat__label">Tokens du jour</span>
            <strong className="admin-inline-stat__value">{formatCompact(overview.summary.tokensUsed)}</strong>
          </div>
          <div className="admin-inline-stat admin-inline-stat--accent">
            <span className="admin-inline-stat__label">Résultats utiles</span>
            <strong className="admin-inline-stat__value">{formatCompact(overview.summary.resultsCount)}</strong>
          </div>
        </div>
      </article>

      {overview.latestEdition ? (
        <article className="admin-panel">
          <div className="admin-section-header">
            <div className="admin-section-copy">
              <h2 className="admin-section-title">Dernière édition publiée</h2>
              <p className="admin-section-description">
                Compare directement le rendu site et le HTML email stocké pour l’édition du {formatOikoDisplayDate(overview.latestEdition.editionDate)}.
              </p>
            </div>
            <div className="admin-section-actions">
              <button type="button" className="admin-button admin-button--ghost" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4" />
                Recharger
              </button>
            </div>
          </div>

          <div className="oiko-admin-preview-links">
            <a className="oiko-admin-preview-link" href={overview.latestEdition.siteUrl} target="_blank" rel="noreferrer">
              <Newspaper className="h-4 w-4" />
              Ouvrir l’article
            </a>
            <a className="oiko-admin-preview-link" href={overview.latestEdition.compareUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Comparer site / mail
            </a>
            <a className="oiko-admin-preview-link" href={overview.latestEdition.emailHtmlUrl} target="_blank" rel="noreferrer">
              <Mail className="h-4 w-4" />
              Ouvrir le HTML email
            </a>
          </div>
        </article>
      ) : null}

      <article className="admin-panel">
        <div className="admin-section-header">
          <div className="admin-section-copy">
            <h2 className="admin-section-title">Quotas et usage Oiko</h2>
            <p className="admin-section-description">
              Limites gratuites documentées et consommation enregistrée pour la date du {formatOikoDisplayDate(overview.selectedDate)}.
            </p>
          </div>
        </div>

        <div className="oiko-admin-service-grid">
          {overview.services.map((service) => (
            <article key={service.key} className="oiko-admin-service-card">
              <div className="oiko-admin-service-card__header">
                <div>
                  <h3>{service.label}</h3>
                  <p>{service.planLabel}</p>
                </div>
                <span className={`admin-status-pill ${service.configured ? 'admin-status-pill--healthy' : 'admin-status-pill--watch'}`}>
                  {service.configured ? 'Configuré' : service.requiresKey ? 'Clé manquante' : 'Optionnel'}
                </span>
              </div>

              <p className="oiko-admin-service-card__quota">{service.freeLimitLabel}</p>
              <p className="oiko-admin-service-card__note">{service.note}</p>

              <div className="oiko-admin-service-card__stats">
                <div>
                  <span>Requêtes</span>
                  <strong>{formatCompact(service.usage.requestsCount)}</strong>
                </div>
                <div>
                  <span>Tokens</span>
                  <strong>{formatCompact(service.usage.tokensUsed)}</strong>
                </div>
                <div>
                  <span>Résultats</span>
                  <strong>{formatCompact(service.usage.resultsCount)}</strong>
                </div>
              </div>

              <div className="oiko-admin-service-card__footer">
                <span>Dernier appel : {formatDateTime(service.usage.lastRequestAt)}</span>
                <a href={service.docsUrl} target="_blank" rel="noreferrer">Doc officielle</a>
              </div>

              {service.history.length > 0 ? (
                <div className="oiko-admin-history-line">
                  {service.history.map((point) => (
                    <span key={`${service.key}-${point.usageDate}`}>
                      {formatOikoDisplayDate(point.usageDate)}: {point.requestsCount}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}

export default OikoNewsAdminModule;

