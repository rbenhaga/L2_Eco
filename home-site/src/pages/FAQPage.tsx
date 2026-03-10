import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { InfoPageShell } from "../components/layout/InfoPageShell";
import { SITE_IDENTITY } from "../config/siteIdentity";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: `Qu'est-ce que ${SITE_IDENTITY.name} ?`,
    answer:
      `${SITE_IDENTITY.name} est une plateforme d’apprentissage en économie qui centralise contenus de cours, exercices, annales et outils de révision.`,
  },
  {
    question: "L’accès premium est-il obligatoire ?",
    answer:
      "Non. Des contenus peuvent rester accessibles sans abonnement, tandis que certaines fonctionnalités avancées nécessitent une offre premium.",
  },
  {
    question: "Comment sont gérés les paiements ?",
    answer:
      "Les paiements sont traités par un prestataire spécialisé. Les informations bancaires ne sont pas stockées directement par la plateforme.",
  },
  {
    question: "Puis-je résilier mon abonnement ?",
    answer:
      "Oui. La résiliation est possible selon les modalités précisées dans les CGU et les conditions commerciales affichées sur la page Tarifs.",
  },
  {
    question: "Comment exercer mes droits RGPD ?",
    answer:
      `Vous pouvez écrire à ${SITE_IDENTITY.privacyEmail} pour toute demande d’accès, rectification, suppression ou portabilité de vos données.`,
  },
  {
    question: "Quels navigateurs et appareils sont compatibles ?",
    answer:
      "La plateforme est conçue pour desktop et mobile récents, avec une expérience optimisée sur les navigateurs modernes.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <InfoPageShell
      kicker="Aide"
      title="FAQ"
      lead="Réponses aux questions fréquentes sur l’utilisation, les abonnements et la conformité de la plateforme."
    >
      <article className="info-page-panel">
        <div className="info-faq-list" role="list" aria-label="Questions fréquentes">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="info-faq-item" role="listitem">
                <button
                  type="button"
                  className="info-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown className="info-faq-chevron" data-open={isOpen ? "true" : "false"} />
                </button>
                {isOpen ? (
                  <div id={`faq-answer-${index}`} className="info-faq-content">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </article>

      <article className="info-page-panel">
        <h2 className="info-section-title">Besoin d’une réponse spécifique ?</h2>
        <p className="info-section-text">
          Écrivez à {" "}
          <a className="info-link" href={`mailto:${SITE_IDENTITY.supportEmail}`}>
            {SITE_IDENTITY.supportEmail}
          </a>
          {" "}ou utilisez la page Contact.
        </p>
      </article>
    </InfoPageShell>
  );
}
