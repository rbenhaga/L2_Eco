import { InfoPageShell } from "../../components/layout/InfoPageShell";
import { SITE_IDENTITY } from "../../config/siteIdentity";

export default function TermsOfService() {
  const mediatorConfigured = !SITE_IDENTITY.consumerMediatorName.includes("[À compléter]");

  return (
    <InfoPageShell
      kicker="Cadre contractuel"
      title="Conditions générales d’utilisation"
      lead="Conditions minimales d’accès et d’usage de la plateforme."
    >
      <article className="info-page-panel">
        <p className="info-page-meta">Version en vigueur au {new Date().toLocaleDateString("fr-FR")}</p>
        <hr className="info-page-divider" />

        <section className="info-section" aria-labelledby="cgu-objet">
          <h2 id="cgu-objet" className="info-section-title">1. Objet</h2>
          <p className="info-section-text">
            Les présentes CGU encadrent l’accès et l’utilisation de la plateforme {SITE_IDENTITY.name}.
          </p>
        </section>

        <section className="info-section" aria-labelledby="cgu-compte">
          <h2 id="cgu-compte" className="info-section-title">2. Compte utilisateur</h2>
          <ul className="info-list">
            <li>Le compte est personnel et ne peut pas être cédé.</li>
            <li>L’utilisateur est responsable de ses identifiants.</li>
            <li>Les informations fournies doivent être exactes.</li>
          </ul>
        </section>

        <section className="info-section" aria-labelledby="cgu-prix">
          <h2 id="cgu-prix" className="info-section-title">3. Offres et paiement</h2>
          <p className="info-section-text">
            Les tarifs applicables sont affichés sur la page Tarifs. Le paiement est traité via un prestataire sécurisé.
          </p>
        </section>

        <section className="info-section" aria-labelledby="cgu-retractation">
          <h2 id="cgu-retractation" className="info-section-title">4. Droit de rétractation</h2>
          <p className="info-section-text">
            Le consommateur dispose d’un droit de rétractation de 14 jours, sauf exception légale applicable aux
            contenus numériques exécutés immédiatement après consentement exprès.
          </p>
        </section>

        <section className="info-section" aria-labelledby="cgu-pi">
          <h2 id="cgu-pi" className="info-section-title">5. Propriété intellectuelle</h2>
          <p className="info-section-text">
            Les contenus sont protégés et restent la propriété de {SITE_IDENTITY.legalName}. Toute réutilisation non
            autorisée est interdite.
          </p>
        </section>

        <section className="info-section" aria-labelledby="cgu-responsabilite">
          <h2 id="cgu-responsabilite" className="info-section-title">6. Responsabilité</h2>
          <p className="info-section-text">
            {SITE_IDENTITY.name} fournit un service d’accompagnement pédagogique. L’utilisateur reste responsable de
            ses décisions et de l’usage du service.
          </p>
        </section>

        <section className="info-section" aria-labelledby="cgu-mediation">
          <h2 id="cgu-mediation" className="info-section-title">7. Réclamations et médiation</h2>
          <p className="info-section-text">
            Réclamation préalable à {" "}
            <a className="info-link" href={`mailto:${SITE_IDENTITY.supportEmail}`}>
              {SITE_IDENTITY.supportEmail}
            </a>
            . En cas d’échec, le consommateur peut saisir gratuitement un médiateur.
          </p>
          <ul className="info-list">
            <li>Médiateur : {SITE_IDENTITY.consumerMediatorName}</li>
            <li>Adresse : {SITE_IDENTITY.consumerMediatorAddress}</li>
            <li>Site web : {SITE_IDENTITY.consumerMediatorWebsite}</li>
          </ul>
          {mediatorConfigured ? null : (
            <p className="info-section-text">
              Obligatoire en B2C : renseigner le médiateur avant la mise en production.
            </p>
          )}
        </section>

        <section className="info-section" aria-labelledby="cgu-law">
          <h2 id="cgu-law" className="info-section-title">8. Droit applicable</h2>
          <p className="info-section-text">
            Les CGU sont soumises au droit français. Les juridictions françaises sont compétentes.
          </p>
        </section>
      </article>
    </InfoPageShell>
  );
}