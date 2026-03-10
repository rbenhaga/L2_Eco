import { FormEvent, useState } from "react";
import { InfoPageShell } from "../components/layout/InfoPageShell";
import { SITE_IDENTITY } from "../config/siteIdentity";

type ContactForm = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  topic: "support",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setForm(INITIAL_FORM);
  };

  return (
    <InfoPageShell
      kicker="Assistance"
      title="Contact"
      lead="Une question de support, de facturation ou de conformité ? Contactez l’équipe via le formulaire ou par email."
    >
      <article className="info-page-panel">
        <div className="info-contact-grid">
          <form className="info-contact-form" onSubmit={handleSubmit} noValidate>
            <div className="info-contact-field">
              <label className="info-contact-label" htmlFor="contact-name">Nom complet</label>
              <input
                id="contact-name"
                className="info-contact-input"
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Votre nom"
              />
            </div>

            <div className="info-contact-field">
              <label className="info-contact-label" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                className="info-contact-input"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="vous@exemple.fr"
              />
            </div>

            <div className="info-contact-field">
              <label className="info-contact-label" htmlFor="contact-topic">Sujet</label>
              <select
                id="contact-topic"
                className="info-contact-select"
                value={form.topic}
                onChange={(event) => setForm((prev) => ({ ...prev, topic: event.target.value }))}
              >
                <option value="support">Support technique</option>
                <option value="billing">Facturation</option>
                <option value="legal">Juridique et conformité</option>
                <option value="partnership">Partenariats</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className="info-contact-field">
              <label className="info-contact-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="info-contact-textarea"
                required
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Décrivez précisément votre demande."
              />
            </div>

            <button className="info-contact-submit" type="submit">Envoyer la demande</button>

            {sent ? (
              <p className="info-section-text">
                Message enregistré. En production, ce formulaire devra être relié à un service d’envoi ou à une API.
              </p>
            ) : null}
          </form>

          <div>
            <section className="info-section" aria-labelledby="contact-direct">
              <h2 id="contact-direct" className="info-section-title">Contacts directs</h2>
              <ul className="info-list">
                <li>
                  Support: {" "}
                  <a className="info-link" href={`mailto:${SITE_IDENTITY.supportEmail}`}>
                    {SITE_IDENTITY.supportEmail}
                  </a>
                </li>
                <li>
                  Juridique: {" "}
                  <a className="info-link" href={`mailto:${SITE_IDENTITY.legalEmail}`}>
                    {SITE_IDENTITY.legalEmail}
                  </a>
                </li>
                <li>
                  Données personnelles: {" "}
                  <a className="info-link" href={`mailto:${SITE_IDENTITY.privacyEmail}`}>
                    {SITE_IDENTITY.privacyEmail}
                  </a>
                </li>
              </ul>
            </section>

            <section className="info-section" aria-labelledby="contact-delais">
              <h2 id="contact-delais" className="info-section-title">Délais de réponse</h2>
              <p className="info-section-text">
                Délai indicatif: 24h à 48h ouvrées. Les demandes juridiques et RGPD sont traitées prioritairement.
              </p>
            </section>

            <section className="info-section" aria-labelledby="contact-preuve">
              <h2 id="contact-preuve" className="info-section-title">Traçabilité</h2>
              <p className="info-section-text">
                Pour les demandes sensibles (droit d’accès, suppression de compte), merci d’indiquer un moyen
                d’identification associé à votre compte afin d’accélérer la vérification.
              </p>
            </section>
          </div>
        </div>
      </article>
    </InfoPageShell>
  );
}
