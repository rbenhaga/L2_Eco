import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import "./ProgrammePage.css";

type Subject = {
  name: string;
  description: string;
};

type Semester = {
  id: string;
  title: string;
  subjects: Subject[];
};

type YearBlock = {
  id: string;
  shortLabel: string;
  title: string;
  semesters: Semester[];
};

const EXCLUDED_SUBJECTS = new Set(["Informatique", "Langue vivante"]);
const HERO_TITLE = "Programme";
const TYPING_SPEED_MS = 62;

const PROGRAMME: YearBlock[] = [
  {
    id: "l1",
    shortLabel: "L1",
    title: "Licence 1",
    semesters: [
      {
        id: "l1-s1",
        title: "Semestre 1",
        subjects: [
          { name: "Économie d'entreprise", description: "Découvrir la logique de décision des organisations et leur fonctionnement économique." },
          { name: "Principes d'économie", description: "Installer les concepts centraux de microéconomie et de macroéconomie." },
          { name: "Sciences politiques", description: "Comprendre les cadres institutionnels qui structurent l'action économique." },
          { name: "Droit", description: "Acquérir les repères juridiques utiles à l'analyse et à la pratique économique." },
          { name: "Histoire des faits économiques", description: "Relier les théories aux grandes transformations économiques historiques." },
          { name: "Mathématiques pour économistes 1", description: "Maîtriser les outils mathématiques indispensables aux modèles de base." },
          { name: "Langue vivante", description: "Renforcer l'expression écrite et orale dans un contexte académique international." }
        ]
      },
      {
        id: "l1-s2",
        title: "Semestre 2",
        subjects: [
          { name: "Macroéconomie 1", description: "Analyser les équilibres globaux et les principaux leviers de politique économique." },
          { name: "Microéconomie 1", description: "Étudier les choix des agents économiques et la formation des marchés." },
          { name: "Statistiques 1", description: "Utiliser les outils descriptifs et probabilistes pour lire les données." },
          { name: "Mathématiques et statistiques pour économistes 2", description: "Approfondir les techniques quantitatives appliquées à l'économie." },
          { name: "Comptabilité générale", description: "Lire, structurer et interpréter les documents comptables fondamentaux." },
          { name: "Problèmes économiques contemporains", description: "Relier les notions du cours aux enjeux économiques actuels." },
          { name: "Langue vivante", description: "Consolider un usage professionnel de la langue à l'écrit et à l'oral." }
        ]
      }
    ]
  },
  {
    id: "l2",
    shortLabel: "L2",
    title: "Licence 2",
    semesters: [
      {
        id: "l2-s3",
        title: "Semestre 3",
        subjects: [
          { name: "Microéconomie 2", description: "Approfondir les modèles du consommateur, du producteur et des structures de marché." },
          { name: "Macroéconomie 2", description: "Étudier les dynamiques macroéconomiques à court et moyen terme." },
          { name: "Statistiques 2", description: "Renforcer l'inférence statistique et la qualité du raisonnement empirique." },
          { name: "Mathématiques pour économistes 3", description: "Formaliser des mécanismes économiques avec des outils mathématiques avancés." },
          { name: "Sociologie", description: "Situer les comportements économiques dans leur environnement social et institutionnel." },
          { name: "Informatique", description: "Structurer les données et automatiser des traitements utiles à l'analyse." },
          { name: "Langue vivante", description: "Poursuivre la maîtrise des usages académiques et professionnels de la langue." }
        ]
      },
      {
        id: "l2-s4",
        title: "Semestre 4",
        subjects: [
          { name: "Microéconomie 3", description: "Analyser des cadres plus avancés de décision et d'équilibre de marché." },
          { name: "Macroéconomie 3", description: "Comprendre les effets des politiques conjoncturelles et des chocs économiques." },
          { name: "Statistiques 3", description: "Approfondir la modélisation probabiliste et les méthodes d'estimation." },
          { name: "Management des organisations", description: "Étudier la coordination, la stratégie et la gouvernance des organisations." },
          { name: "Informatique", description: "Appliquer les outils numériques au traitement des informations économiques." },
          { name: "Options de spécialisation", description: "Personnaliser ton parcours selon tes intérêts et ton projet d'études." },
          { name: "Langue vivante", description: "Maintenir une communication fluide pour les lectures et échanges internationaux." }
        ]
      }
    ]
  },
  {
    id: "l3",
    shortLabel: "L3",
    title: "Licence 3",
    semesters: [
      {
        id: "l3-s5",
        title: "Semestre 5",
        subjects: [
          { name: "Histoire de la pensée économique", description: "Mettre en perspective les écoles, concepts et débats majeurs de la discipline." },
          { name: "Théorie des jeux", description: "Modéliser les interactions stratégiques entre agents en situation d'interdépendance." },
          { name: "Introduction à l'économétrie", description: "Passer de la théorie aux estimations sur données réelles." },
          { name: "Organisation industrielle", description: "Étudier concurrence, pouvoir de marché et régulation sectorielle." },
          { name: "Économie de la croissance", description: "Comprendre les moteurs de la croissance à long terme." },
          { name: "Options", description: "Affiner ton profil avec des enseignements ciblés selon ton projet académique." },
          { name: "Langue vivante", description: "Consolider l'aisance linguistique requise pour le master et la mobilité." }
        ]
      },
      {
        id: "l3-s6",
        title: "Semestre 6",
        subjects: [
          { name: "Analyse financière", description: "Évaluer la performance et la structure financière d'une organisation." },
          { name: "Économie internationale", description: "Analyser échanges internationaux, politiques commerciales et finance globale." },
          { name: "Politique économique et sociale", description: "Mesurer l'effet des instruments publics sur l'activité et la redistribution." },
          { name: "Analyse de données", description: "Exploiter les données pour produire une lecture économique robuste." },
          { name: "Base de données", description: "Structurer, interroger et gérer des ensembles de données à grande échelle." },
          { name: "Projet personnel étudiant", description: "Formaliser ton orientation et valoriser tes compétences transversales." },
          { name: "Options de fin de cycle", description: "Finaliser ta spécialisation avant l'entrée en master." },
          { name: "Langue vivante", description: "Conserver un niveau opérationnel pour les contextes académiques et professionnels." }
        ]
      }
    ]
  }
];

export default function ProgrammePage() {
  const [activeYearId, setActiveYearId] = useState(PROGRAMME[1]?.id ?? PROGRAMME[0].id);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    setTypedCount(0);
    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= HERO_TITLE.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED_MS);

    return () => window.clearInterval(timer);
  }, []);

  const activeYear = useMemo(() => {
    return PROGRAMME.find((year) => year.id === activeYearId) ?? PROGRAMME[0];
  }, [activeYearId]);

  const semesters = useMemo(() => {
    return activeYear.semesters.map((semester) => {
      return {
        ...semester,
        subjects: semester.subjects.filter((subject) => !EXCLUDED_SUBJECTS.has(subject.name)),
      };
    });
  }, [activeYear]);

  return (
    <div className="programme-page-shell">
      <Header />

      <main className="programme-page-main">
        <section className="programme-hero" aria-labelledby="programme-title">
          <p className="programme-kicker">Parcours Licence Économie</p>
          <h1 id="programme-title" className="programme-title">
            {HERO_TITLE.slice(0, typedCount).split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={`programme-title-letter ${index === typedCount - 1 && typedCount < HERO_TITLE.length ? "is-fresh" : ""}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="programme-title-cursor" aria-hidden="true" />
          </h1>
          <p className="programme-lead">
            Liste des matières par semestre par année de licence.
          </p>
        </section>

        <section className="programme-layout" aria-label="Liste des matières par licence et semestre">
          <nav className="programme-toc" aria-label="Sélecteur de licence">
            {PROGRAMME.map((year) => {
              const isActive = year.id === activeYear.id;
              return (
                <button
                  key={year.id}
                  type="button"
                  className="programme-toc-button"
                  data-active={isActive ? "true" : "false"}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveYearId(year.id)}
                >
                  {year.shortLabel}
                </button>
              );
            })}
          </nav>

          <article key={activeYear.id} className="programme-license-panel" aria-live="polite">
            <h2 className="programme-license-title">{activeYear.title}</h2>

            <div className="programme-semesters-grid">
              {semesters.map((semester) => (
                <section key={semester.id} className="programme-semester-block" aria-label={semester.title}>
                  <header className="programme-semester-head">
                    <h3 className="programme-semester-title">{semester.title}</h3>                  </header>

                  <ul className="programme-subject-list">
                    {semester.subjects.map((subject) => (
                      <li key={`${semester.id}-${subject.name}`} className="programme-subject-item">
                        <p className="programme-subject-name">{subject.name}</p>
                        <p className="programme-subject-description">{subject.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>

      <Footer className="mt-0 border-t" />
    </div>
  );
}




