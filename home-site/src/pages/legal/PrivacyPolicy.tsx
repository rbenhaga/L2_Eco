import { InfoPageShell } from "../../components/layout/InfoPageShell";
import { SITE_IDENTITY } from "../../config/siteIdentity";

export default function PrivacyPolicy() {
  return (
    <InfoPageShell
      kicker="Protection des données"
      title="Politique de confidentialité"
      lead="Cadre de traitement des données personnelles conformément au RGPD et à la réglementation française."
    >
      <article className="info-page-panel">
        <p className="info-page-meta">Version en vigueur au {new Date().toLocaleDateString("fr-FR")}</p>
        <hr className="info-page-divider" />

        <section className="info-section" aria-labelledby="privacy-responsable">
          <h2 id="privacy-responsable" className="info-section-title">1. Responsable du traitement</h2>
          <p className="info-section-text">
            Le responsable du traitement est {SITE_IDENTITY.legalName}, joignable à{" "}
            <a className="info-link" href={`mailto:${SITE_IDENTITY.privacyEmail}`}>
              {SITE_IDENTITY.privacyEmail}
            </a>
            .
          </p>
        </section>

        <section className="info-section" aria-labelledby="privacy-donnees">
          <h2 id="privacy-donnees" className="info-section-title">2. Données collectées</h2>
          <ul className="info-list">
            <li>Données de compte: identité, email, identifiants techniques d’authentification.</li>
            <li>Données d’abonnement: statut, historique de souscription, justificatifs de transaction.</li>
            <li>Données d’usage: progression pédagogique, interactions et préférences de navigation.</li>
            <li>Données de support: messages envoyés via les formulaires de contact et suivi des demandes.</li>
            <li>Données techniques: logs de sécurité, adresse IP, terminal et métadonnées de connexion.</li>
            <li>Données de mesure d’audience (si consentement): pages vues et événements de navigation pseudonymisés.</li>
          </ul>
        </section>

        <section className="info-section" aria-labelledby="privacy-finalites">
          <h2 id="privacy-finalites" className="info-section-title">3. Finalités et bases légales</h2>
          <ul className="info-list">
            <li>Exécution du contrat: fournir l’accès aux fonctionnalités, contenus et services premium.</li>
            <li>Intérêt légitime: sécuriser la plateforme, prévenir la fraude et améliorer la qualité de service.</li>
            <li>Obligation légale: conservation des pièces comptables et respect des obligations fiscales.</li>
            <li>Consentement: mesure d’audience via Google Analytics uniquement après acceptation explicite.</li>
          </ul>
        </section>

        <section className="info-section" aria-labelledby="privacy-duree">
          <h2 id="privacy-duree" className="info-section-title">4. Durées de conservation</h2>
          <ul className="info-list">
            <li>Données de compte: pendant la relation contractuelle puis archivage limité.</li>
            <li>Données de facturation: durée légale comptable et fiscale applicable.</li>
            <li>Données de support: le temps de traitement puis conservation probatoire raisonnable.</li>
            <li>Logs de sécurité: durée strictement nécessaire aux objectifs de sécurité.</li>
          </ul>
        </section>

        <section className="info-section" aria-labelledby="privacy-destinataires">
          <h2 id="privacy-destinataires" className="info-section-title">5. Destinataires et sous-traitants</h2>
          <p className="info-section-text">
            Les données sont accessibles aux seules personnes habilitées. Des sous-traitants techniques peuvent
            intervenir selon les services activés, notamment l’hébergement, l’authentification (Firebase), le paiement
            (Stripe), et la mesure d’audience (Google Analytics, uniquement avec consentement).
          </p>
        </section>

        <section className="info-section" aria-labelledby="privacy-transferts">
          <h2 id="privacy-transferts" className="info-section-title">6. Transferts hors UE</h2>
          <p className="info-section-text">
            Certains sous-traitants peuvent traiter des données hors de l’Espace économique européen. Dans ce cas,
            {" "}{SITE_IDENTITY.name} met en place les mécanismes requis (clauses contractuelles types et mesures
            complémentaires) afin d’assurer un niveau de protection approprié.
          </p>
        </section>

        <section className="info-section" aria-labelledby="privacy-droits">
          <h2 id="privacy-droits" className="info-section-title">7. Droits des personnes</h2>
          <ul className="info-list">
            <li>Droit d’accès, de rectification et d’effacement.</li>
            <li>Droit à la limitation du traitement et droit d’opposition.</li>
            <li>Droit à la portabilité des données, lorsque applicable.</li>
            <li>Droit de retirer votre consentement à tout moment pour les traitements concernés.</li>
            <li>Droit d’introduire une réclamation auprès de la CNIL.</li>
          </ul>
          <p className="info-section-text">
            Exercice des droits:{" "}
            <a className="info-link" href={`mailto:${SITE_IDENTITY.privacyEmail}`}>
              {SITE_IDENTITY.privacyEmail}
            </a>
            .
          </p>
        </section>

        <section className="info-section" aria-labelledby="privacy-cookies">
          <h2 id="privacy-cookies" className="info-section-title">8. Cookies et traceurs</h2>
          <ul className="info-list">
            <li>Les traceurs strictement nécessaires au fonctionnement du site sont activés par défaut.</li>
            <li>Un bandeau de consentement est affiché lors de votre première visite pour votre choix de mesure d’audience.</li>
            <li>La mesure d’audience (Google Analytics) n’est activée qu’après votre consentement explicite.</li>
            <li>En cas de refus, aucune donnée de mesure d’audience n’est transmise.</li>
            <li>Votre choix est conservé localement dans votre navigateur.</li>
            <li>Vous pouvez modifier ce choix en supprimant les données du site puis en rechargeant la page.</li>
          </ul>
        </section>

        <section className="info-section" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact" className="info-section-title">9. Contact</h2>
          <p className="info-section-text">
            Référent protection des données: {SITE_IDENTITY.dpoName}. Contact:{" "}
            <a className="info-link" href={`mailto:${SITE_IDENTITY.privacyEmail}`}>
              {SITE_IDENTITY.privacyEmail}
            </a>
            .
          </p>
        </section>
      </article>
    </InfoPageShell>
  );
}
