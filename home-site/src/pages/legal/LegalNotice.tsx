import { InfoPageShell } from "../../components/layout/InfoPageShell";
import { SITE_IDENTITY } from "../../config/siteIdentity";

export default function LegalNotice() {
  const mediatorConfigured = !SITE_IDENTITY.consumerMediatorName.includes("[À compléter]");

  return (
    <InfoPageShell
      kicker="Informations légales"
      title="Mentions légales"
    >
      <article className="info-page-panel">
        <p className="info-page-meta">Version en vigueur au {new Date().toLocaleDateString("fr-FR")}</p>
        <hr className="info-page-divider" />

        <section className="info-section" aria-labelledby="legal-editeur">
          <h2 id="legal-editeur" className="info-section-title">1. Éditeur</h2>
          <div className="info-legal-lines">
            <p className="info-legal-line"><strong>Nom commercial :</strong> {SITE_IDENTITY.name}</p>
            <p className="info-legal-line"><strong>Nom :</strong> {SITE_IDENTITY.legalName}</p>
            <p className="info-legal-line"><strong>Forme juridique :</strong> {SITE_IDENTITY.legalForm}</p>
            <p className="info-legal-line"><strong>SIRET :</strong> {SITE_IDENTITY.siret}</p>
            <p className="info-legal-line"><strong>Immatriculation :</strong> {SITE_IDENTITY.rcs}</p>
            <p className="info-legal-line"><strong>TVA :</strong> {SITE_IDENTITY.vatNumber}</p>
            <p className="info-legal-line"><strong>Adresse de domiciliation :</strong> {SITE_IDENTITY.headquartersAddress}</p>
            <p className="info-legal-line"><strong>Directeur de publication :</strong> {SITE_IDENTITY.publisherName}</p>
            <p className="info-legal-line">
              <strong>Contact légal :</strong>{" "}
              <a className="info-link" href={`mailto:${SITE_IDENTITY.legalEmail}`}>
                {SITE_IDENTITY.legalEmail}
              </a>
            </p>
          </div>
        </section>

        <section className="info-section" aria-labelledby="legal-host">
          <h2 id="legal-host" className="info-section-title">2. Hébergement</h2>
          <div className="info-legal-lines">
            <p className="info-legal-line"><strong>Hébergeur :</strong> {SITE_IDENTITY.hostName}</p>
            <p className="info-legal-line"><strong>Adresse :</strong> {SITE_IDENTITY.hostAddress}</p>
            <p className="info-legal-line"><strong>Téléphone :</strong> {SITE_IDENTITY.hostPhone}</p>
            <p className="info-legal-line"><strong>Nom de domaine :</strong> {SITE_IDENTITY.domain}</p>
          </div>
        </section>

        <section className="info-section" aria-labelledby="legal-mediation">
          <h2 id="legal-mediation" className="info-section-title">3. Réclamation et médiation</h2>
          <p className="info-section-text">
            Réclamation préalable par email à {" "}
            <a className="info-link" href={`mailto:${SITE_IDENTITY.supportEmail}`}>
              {SITE_IDENTITY.supportEmail}
            </a>
            .
          </p>
          <div className="info-legal-lines">
            <p className="info-legal-line"><strong>Médiateur :</strong> {SITE_IDENTITY.consumerMediatorName}</p>
            <p className="info-legal-line"><strong>Adresse :</strong> {SITE_IDENTITY.consumerMediatorAddress}</p>
            <p className="info-legal-line"><strong>Site web :</strong> {SITE_IDENTITY.consumerMediatorWebsite}</p>
          </div>
          {mediatorConfigured ? null : (
            <p className="info-section-text">
              Pour une activité B2C, le médiateur doit être renseigné avant la mise en production.
            </p>
          )}
        </section>

        <section className="info-section" aria-labelledby="legal-pi">
          <h2 id="legal-pi" className="info-section-title">4. Propriété intellectuelle</h2>
          <p className="info-section-text">
            Tous les contenus du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction
            non autorisée est interdite.
          </p>
        </section>

        <section className="info-section" aria-labelledby="legal-law">
          <h2 id="legal-law" className="info-section-title">5. Droit applicable</h2>
          <p className="info-section-text">
            Le site est soumis au droit français. En cas de litige, les juridictions françaises sont compétentes.
          </p>
        </section>
      </article>
    </InfoPageShell>
  );
}
