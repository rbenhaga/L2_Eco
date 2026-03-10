import {
  AlertBox,
  ChapterNav,
  CourseText,
  CourseTextArrowItem,
  CourseTextArrowList,
  CourseTextList,
  CourseTextQuote,
  DefBox,
  Exercise,
  ExBox,
  FormulaBox,
  Math,
  MethBox,
  PageHeader,
  StatsSectionHeader,
  Table,
  TableCell,
  TableRow,
  ThmBox,
} from '../components';
import { TableOfContents } from '../components/course/TableOfContents';

export default function CourseBlocksLabPage() {
  return (
    <main className="course-page course-page--paper-focus w-full flex justify-center">
      <div className="course-reader-frame w-full">
        <div className="course-reader-body">
          <div className="course-paper">
            <PageHeader
              number="LAB"
              title="Course Blocks Lab"
              description="Bac à sable des composants de cours pour vérifier le rendu, la hiérarchie visuelle et les interactions."
            />

            <div className="course-flow space-y-16">
              <section id="texte-narratif" data-section-title="Texte narratif" className="space-y-8">
                <StatsSectionHeader title="Texte narratif" />
                <CourseText title="Bloc de texte principal" lead="Ce composant sert à porter le cours rédigé sans décor spécial.">
                  <p>
                    Utilise <strong>CourseText</strong> pour la majorité du contenu, puis réserve les callouts,
                    méthodes et alertes aux points vraiment importants.
                  </p>
                  <p>
                    L&apos;objectif est d&apos;éviter l&apos;effet « suite de boîtes » et de revenir à une progression
                    pédagogique naturelle.
                  </p>

                  <CourseTextList>
                    <li>Point clé avec texte simple.</li>
                    <li>
                      Point clé avec LaTeX inline : <Math>{`\\mathbb{E}(X)=\\sum_i x_i p_i`}</Math>.
                    </li>
                  </CourseTextList>

                  <CourseTextArrowList>
                    <CourseTextArrowItem>Étape 1 : poser les hypothèses.</CourseTextArrowItem>
                    <CourseTextArrowItem>Étape 2 : appliquer la formule adaptée.</CourseTextArrowItem>
                    <CourseTextArrowItem>Étape 3 : interpréter le résultat.</CourseTextArrowItem>
                  </CourseTextArrowList>

                  <CourseTextQuote author="Méthode de rédaction">
                    Ne pas transformer tout le chapitre en callouts. Le texte narratif doit rester dominant.
                  </CourseTextQuote>
                </CourseText>
              </section>

              <section id="callouts" data-section-title="Callouts" className="space-y-8">
                <StatsSectionHeader title="Callouts" />
                <div className="space-y-8">
                  <DefBox title="Définition">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Un callout doit rester lisible, aéré, avec un fond blanc et un badge visible.</p>
                    </div>
                  </DefBox>
                  <ThmBox title="Théorème">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Si les hypothèses sont vérifiées, la conclusion s&apos;applique sans ambiguïté.</p>
                    </div>
                  </ThmBox>
                  <MethBox title="Méthode">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>1. Identifier les données. 2. Choisir la formule. 3. Conclure proprement.</p>
                    </div>
                  </MethBox>
                  <ExBox title="Exemple">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Exemple de bloc appliqué avec une explication courte.</p>
                    </div>
                  </ExBox>
                  <AlertBox title="Piège fréquent">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Ne pas confondre la variable aléatoire et sa valeur observée.</p>
                    </div>
                  </AlertBox>
                </div>
              </section>

              <section id="math" data-section-title="Math & Tableaux" className="space-y-8">
                <StatsSectionHeader title="Math & Tableaux" />
                <div className="space-y-8">
                  <DefBox title="Formules">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Inline : <Math>{`\\mathbb{E}(X)=\\sum_i x_i p_i`}</Math>
                      </p>
                      <FormulaBox>{`\\mathrm{Var}(X)=\\mathbb{E}(X^2)-\\left(\\mathbb{E}(X)\\right)^2`}</FormulaBox>
                    </div>
                  </DefBox>

                  <Table headers={['Bloc', 'Objectif', 'Rendu attendu']}>
                    <TableRow>
                      <TableCell>Callout</TableCell>
                      <TableCell>Contextualiser une info</TableCell>
                      <TableCell>Carte blanche + badge coloré</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>FormulaBox</TableCell>
                      <TableCell>Isoler une formule clé</TableCell>
                      <TableCell>Math centrée sans fond gris</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Exercise</TableCell>
                      <TableCell>Question + correction</TableCell>
                      <TableCell>Panneau ouvrable stable</TableCell>
                    </TableRow>
                  </Table>
                </div>
              </section>

              <section id="exercise" data-section-title="Exercice interactif" className="space-y-8">
                <StatsSectionHeader title="Exercice interactif" />
                <div className="space-y-6">
                  <Exercise
                    id="lab-ex-1"
                    title="Calcul d'espérance"
                    content={
                      <div className="space-y-4 text-base leading-relaxed">
                        <p>
                          Soit <Math>{`X`}</Math> telle que{' '}
                          <Math>{`\\mathbb{P}(X=0)=0{,}2,\\ \\mathbb{P}(X=1)=0{,}5,\\ \\mathbb{P}(X=2)=0{,}3`}</Math>.
                        </p>
                        <p>Calculer l&apos;espérance de X.</p>
                      </div>
                    }
                    method={
                      <div className="space-y-4 text-base leading-relaxed">
                        <p>
                          Appliquer la définition : <Math>{`\\mathbb{E}(X)=\\sum_i x_i p_i`}</Math>.
                        </p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4 text-base leading-relaxed">
                        <FormulaBox>{`\\mathbb{E}(X)=0\\times0{,}2 + 1\\times0{,}5 + 2\\times0{,}3 = 1{,}1`}</FormulaBox>
                      </div>
                    }
                  />
                </div>
              </section>
            </div>

            <ChapterNav
              prev={{ path: '/', label: 'Accueil', title: 'Retour accueil' }}
              next={{ path: '/s4/stats', label: 'Module Stats', title: 'Aller au module' }}
            />
          </div>
        </div>
      </div>
      <TableOfContents />
    </main>
  );
}
