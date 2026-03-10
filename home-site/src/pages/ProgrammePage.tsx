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
          { name: "Économie d'entreprise", description: "Introduction à l'entreprise, à ses choix d'organisation et à ses mécanismes économiques." },
          { name: "Principes d'économie", description: "Premiers repères en micro et macro pour comprendre agents, marchés et équilibres." },
          { name: "Sciences politiques", description: "Institutions, acteurs publics et cadres politiques qui influencent l'activité économique." },
          { name: "Droit", description: "Bases juridiques utiles aux contrats, aux organisations et à l'environnement économique." },
          { name: "Histoire des faits économiques", description: "Grandes transformations économiques et sociales, de l'industrialisation aux crises." },
          { name: "Mathématiques pour économistes 1", description: "Outils de calcul et fonctions utiles aux premiers raisonnements économiques." },
          { name: "Langue vivante", description: "Renforcer l'expression écrite et orale dans un contexte académique international." }
        ]
      },
      {
        id: "l1-s2",
        title: "Semestre 2",
        subjects: [
          { name: "Macroéconomie 1", description: "Équilibres globaux, inflation, chômage et premiers instruments de politique économique." },
          { name: "Microéconomie 1", description: "Choix du consommateur et du producteur, prix et fonctionnement des marchés." },
          { name: "Statistiques 1", description: "Statistique descriptive, probabilités de base et lecture rigoureuse des données." },
          { name: "Mathématiques et statistiques pour économistes 2", description: "Approfondissement quantitatif avec calcul, statistiques et modélisation simple." },
          { name: "Comptabilité générale", description: "Lecture du bilan, du compte de résultat et des mécanismes comptables essentiels." },
          { name: "Problèmes économiques contemporains", description: "Grands enjeux actuels relus à partir des notions économiques du semestre." },
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
          { name: "Microéconomie 2", description: "Approfondissement du consommateur, du producteur et des structures de marché." },
          { name: "Macroéconomie 2", description: "Analyse conjoncturelle, fluctuations et effets des politiques budgétaires et monétaires." },
          { name: "Statistiques 2", description: "Variables aléatoires, lois usuelles, estimation et premiers raisonnements inférentiels." },
          { name: "Mathématiques pour économistes 3", description: "Outils mathématiques plus avancés pour formaliser les mécanismes économiques." },
          { name: "Sociologie", description: "Lecture des comportements économiques à travers normes, groupes sociaux et institutions." },
          { name: "Informatique", description: "Structurer les données et automatiser des traitements utiles à l'analyse." },
          { name: "Langue vivante", description: "Poursuivre la maîtrise des usages académiques et professionnels de la langue." }
        ]
      },
      {
        id: "l2-s4",
        title: "Semestre 4",
        subjects: [
          { name: "Microéconomie 3", description: "Cadres plus avancés de décision, d'équilibre et d'analyse des marchés." },
          { name: "Macroéconomie 3", description: "Politiques conjoncturelles, chocs macroéconomiques et arbitrages publics." },
          { name: "Statistiques 3", description: "Estimation, tests et méthodes quantitatives appliquées à l'analyse économique." },
          { name: "Management des organisations", description: "Fonctionnement des organisations, coordination, stratégie et prise de décision." },
          { name: "Informatique", description: "Appliquer les outils numériques au traitement des informations économiques." },
          { name: "Options d'ouverture", description: "Premi\u00E8res options pour ouvrir le parcours vers le droit, les institutions et l'\u00E9conomie appliqu\u00E9e." },
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
          { name: "Histoire de la pensée économique", description: "Grandes écoles de pensée, auteurs majeurs et évolution des idées économiques." },
          { name: "Théorie des jeux", description: "Interactions stratégiques, équilibres et décisions en situation d'interdépendance." },
          { name: "Introduction à l'économétrie", description: "Premiers modèles économétriques et lecture empirique des relations entre variables." },
          { name: "Organisation industrielle", description: "Concurrence imparfaite, pouvoir de marché, stratégie des firmes et régulation." },
          { name: "Économie de la croissance", description: "Mécanismes de croissance à long terme, innovation, capital et productivité." },
          { name: "Options d'approfondissement", description: "Choix d'approfondissement en optimisation, comptabilit\u00E9 analytique et \u00E9conomie appliqu\u00E9e." },
          { name: "Langue vivante", description: "Consolider l'aisance linguistique requise pour le master et la mobilité." }
        ]
      },
      {
        id: "l3-s6",
        title: "Semestre 6",
        subjects: [
          { name: "Analyse financière", description: "Diagnostic financier, rentabilité, solvabilité et lecture des comptes." },
          { name: "Économie internationale", description: "Commerce international, ouverture des économies et grands déséquilibres mondiaux." },
          { name: "Politique économique et sociale", description: "Instruments publics, emploi, redistribution et effets sur l'activité." },
          { name: "Analyse de données", description: "Méthodes de traitement, de synthèse et d'interprétation des données quantitatives." },
          { name: "Base de données", description: "Structurer, interroger et exploiter des bases utiles à l'analyse économique." },
          { name: "Projet personnel étudiant", description: "Clarification du projet d'études ou d'insertion, avec mise en forme du parcours." },
          { name: "Options de sp\u00E9cialisation", description: "Derniers choix de sp\u00E9cialisation en micro\u00E9conomie appliqu\u00E9e, finance et \u00E9conomie publique." },
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
          <p className="programme-kicker">Structure de la licence</p>
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
          <p className="programme-lead">{"Une vue synth\u00E9tique des enseignements centraux, du tronc commun aux premi\u00E8res sp\u00E9cialisations."}</p>
          <p className="programme-note">{"Vue simplifi\u00E9e du programme officiel : nous gardons les mati\u00E8res structurantes et les options utiles pour comprendre la progression de la licence."}</p>
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
                    <h3 className="programme-semester-title">{semester.title}</h3>
                  </header>

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



