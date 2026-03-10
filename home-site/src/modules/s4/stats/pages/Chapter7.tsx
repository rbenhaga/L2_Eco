import {
  PageHeader,
  ChapterNav,
  Math,
  FormulaBox,
  DefBox,
  ThmBox,
  MethBox,
  AlertBox,
  Exercise,
  Table,
  TableRow,
  TableCell,
  StatsSectionHeader,
} from '../../../../components';
import { TableOfContents } from '../../../../components/course/TableOfContents';

export function Chapter7() {
  return (
    <main className="course-page course-page--paper-focus w-full flex justify-center">
      <div className="course-reader-frame w-full">
        <div className="course-reader-body">
          <div className="course-paper">
            <PageHeader
              number="Chapitre 7"
              title="Convergence en loi"
              description="Approximations de la binomiale (Poisson, normale) et de la Poisson (normale) : conditions, formules, corrections et exercices corrigés."
            />

            <div className="course-flow space-y-16">

              {/* ── INTRODUCTION ── */}
              <section id="introduction" data-section-title="Introduction" className="space-y-8">
                <StatsSectionHeader title="Introduction" />
                <div className="space-y-4 text-base leading-relaxed">
                  <p>
                    En pratique, les lois discrètes (binomiale, Poisson) peuvent être difficiles à calculer
                    pour de grandes valeurs de paramètres. Les théorèmes de convergence en loi permettent
                    d'utiliser des lois continues plus simples comme approximation.
                  </p>
                  <p>
                    Il existe trois convergences fondamentales : <strong>Binomiale → Poisson</strong> (événements rares),
                    <strong> Binomiale → Normale</strong> (Théorème Central Limite pour la binomiale) et
                    <strong> Poisson → Normale</strong>.
                  </p>
                </div>
              </section>

              {/* ── I. NOTION DE CONVERGENCE ── */}
              <section id="convergence" data-section-title="I. Convergence en loi" className="space-y-8">
                <StatsSectionHeader title="I. Convergence en loi" />

                <div className="space-y-8">
                  <DefBox title="Définition — Convergence en loi">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Une suite de variables aléatoires <Math>{"(X_n)_{n\\geq 1}"}</Math> converge en loi vers <Math>{"X"}</Math>
                        si pour tout <Math>{"x"}</Math> point de continuité de la fonction de répartition <Math>{"F"}</Math> de <Math>{"X"}</Math> :
                      </p>
                      <FormulaBox>{"F_n(x) = \\mathbb{P}(X_n \\leq x) \\xrightarrow[n\\to+\\infty]{} F(x) = \\mathbb{P}(X \\leq x)"}</FormulaBox>
                      <p>
                        On note <Math>{"X_n \\xrightarrow{\\mathcal{L}} X"}</Math>. La convergence en loi ne dit rien sur les valeurs
                        individuelles, seulement sur la distribution.
                      </p>
                    </div>
                  </DefBox>

                  <ThmBox title="Théorème Central Limite (rappel)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Soient <Math>{"X_1, \\ldots, X_n"}</Math> i.i.d. d'espérance <Math>{"m"}</Math> et de variance{" "}
                        <Math>{"\\sigma^2 < +\\infty"}</Math>. Alors :
                      </p>
                      <FormulaBox>{"\\frac{\\bar X_n - m}{\\sigma/\\sqrt{n}} \\xrightarrow[n\\to+\\infty]{\\mathcal{L}} \\mathcal{N}(0,1)"}</FormulaBox>
                    </div>
                  </ThmBox>
                </div>
              </section>

              {/* ── II. BINOMIALE → POISSON ── */}
              <section id="bin-poisson" data-section-title="II. Binomiale → Poisson" className="space-y-8">
                <StatsSectionHeader title="II. Binomiale → Poisson (événements rares)" />

                <div className="space-y-8">
                  <ThmBox title="Théorème de Poisson">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Si <Math>{"X_n \\sim \\mathcal{B}(n, p_n)"}</Math> avec <Math>{"n \\to +\\infty"}</Math>,
                        <Math>{"\\; p_n \\to 0"}</Math> et <Math>{"np_n \\to \\lambda > 0"}</Math>, alors :
                      </p>
                      <FormulaBox>{"X_n \\xrightarrow{\\mathcal{L}} \\mathcal{P}(\\lambda), \\quad \\lambda = np"}</FormulaBox>
                    </div>
                  </ThmBox>

                  <MethBox title="Conditions pratiques Binomiale → Poisson">
                    <div className="space-y-3 text-base leading-relaxed">
                      <p>On utilise l'approximation Poisson quand les <strong>trois conditions</strong> sont réunies :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><Math>{"n > 50"}</Math> (grand nombre d'épreuves)</li>
                        <li><Math>{"p < 0{,}10"}</Math> (probabilité faible — événement rare)</li>
                        <li><Math>{"np < 18"}</Math> (paramètre Poisson modéré)</li>
                      </ul>
                      <p className="mt-2">
                        Approximation : <Math>{"X \\sim \\mathcal{B}(n, p) \\approx \\mathcal{P}(\\lambda)"}</Math> avec <Math>{"\\lambda = np"}</Math>.
                      </p>
                      <FormulaBox>{"\\mathbb{P}(X = k) \\approx e^{-\\lambda}\\frac{\\lambda^k}{k!}"}</FormulaBox>
                    </div>
                  </MethBox>
                </div>
              </section>

              {/* ── III. BINOMIALE → NORMALE ── */}
              <section id="bin-normale" data-section-title="III. Binomiale → Normale" className="space-y-8">
                <StatsSectionHeader title="III. Binomiale → Normale (TCL)" />

                <div className="space-y-8">
                  <ThmBox title="Théorème de Moivre-Laplace">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Si <Math>{"X_n \\sim \\mathcal{B}(n, p)"}</Math>, alors :</p>
                      <FormulaBox>{"\\frac{X_n - np}{\\sqrt{np(1-p)}} \\xrightarrow[n\\to+\\infty]{\\mathcal{L}} \\mathcal{N}(0,1)"}</FormulaBox>
                      <p>En pratique, on dit <Math>{"X \\approx \\mathcal{N}(np,\\, \\sqrt{np(1-p)})"}</Math>.</p>
                    </div>
                  </ThmBox>

                  <MethBox title="Conditions pratiques Binomiale → Normale">
                    <div className="space-y-3 text-base leading-relaxed">
                      <p>On utilise l'approximation normale quand :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><Math>{"np > 18"}</Math> (ou : <Math>{"np \\geq 5"}</Math> et <Math>{"n(1-p) \\geq 5"}</Math>)</li>
                      </ul>
                      <p>
                        Paramètres : <Math>{"\\mu = np"}</Math> et <Math>{"\\sigma = \\sqrt{np(1-p)}"}</Math>.
                      </p>
                    </div>
                  </MethBox>

                  <DefBox title="Correction de continuité de Yates">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Comme on approxime une loi discrète par une loi continue, on améliore la précision
                        avec la correction de Yates (± 0,5) :
                      </p>
                      <FormulaBox>{"\\mathbb{P}(a \\leq X \\leq b) \\approx \\mathbb{P}(a - 0{,}5 \\leq X_{app} \\leq b + 0{,}5)"}</FormulaBox>
                      <p>
                        Pour <Math>{"\\mathbb{P}(X = k)"}</Math> : <Math>{"\\approx \\mathbb{P}(k-0{,}5 \\leq X_{app} \\leq k+0{,}5)"}</Math>.
                      </p>
                    </div>
                  </DefBox>
                </div>
              </section>

              {/* ── IV. POISSON → NORMALE ── */}
              <section id="poisson-normale" data-section-title="IV. Poisson → Normale" className="space-y-8">
                <StatsSectionHeader title="IV. Poisson → Normale" />

                <div className="space-y-8">
                  <ThmBox title="Convergence de Poisson vers Normale">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Si <Math>{"X \\sim \\mathcal{P}(\\lambda)"}</Math> avec <Math>{"\\lambda"}</Math> grand :</p>
                      <FormulaBox>{"\\frac{X - \\lambda}{\\sqrt{\\lambda}} \\xrightarrow[\\lambda\\to+\\infty]{\\mathcal{L}} \\mathcal{N}(0,1)"}</FormulaBox>
                      <p>En pratique : <Math>{"X \\approx \\mathcal{N}(\\lambda, \\sqrt{\\lambda})"}</Math> dès que <Math>{"\\lambda > 18"}</Math>.</p>
                    </div>
                  </ThmBox>

                  <ThmBox title="Additivité de la loi de Poisson (rappel)">
                    <div className="space-y-3 text-base leading-relaxed">
                      <p>
                        Si <Math>{"X \\sim \\mathcal{P}(\\lambda_1)"}</Math> et <Math>{"Y \\sim \\mathcal{P}(\\lambda_2)"}</Math> indépendantes :
                      </p>
                      <FormulaBox>{"X + Y \\sim \\mathcal{P}(\\lambda_1 + \\lambda_2)"}</FormulaBox>
                    </div>
                  </ThmBox>
                </div>
              </section>

              {/* ── V. ARBRE DE DÉCISION ── */}
              <section id="arbre" data-section-title="V. Arbre de décision" className="space-y-8">
                <StatsSectionHeader title="V. Arbre de décision" />

                <Table headers={['Loi initiale', 'Condition', 'Approximation', 'Paramètres']}>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{B}(n,p)"}</Math></TableCell>
                    <TableCell><Math>{"n>50,\\ p{<}0{,}1,\\ np{<}18"}</Math></TableCell>
                    <TableCell><Math>{"\\mathcal{P}(\\lambda)"}</Math></TableCell>
                    <TableCell><Math>{"\\lambda = np"}</Math></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{B}(n,p)"}</Math></TableCell>
                    <TableCell><Math>{"np > 18"}</Math></TableCell>
                    <TableCell><Math>{"\\mathcal{N}(\\mu,\\sigma)"}</Math></TableCell>
                    <TableCell><Math>{"\\mu=np,\\ \\sigma=\\sqrt{np(1-p)}"}</Math></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{P}(\\lambda)"}</Math></TableCell>
                    <TableCell><Math>{"\\lambda > 18"}</Math></TableCell>
                    <TableCell><Math>{"\\mathcal{N}(\\mu,\\sigma)"}</Math></TableCell>
                    <TableCell><Math>{"\\mu=\\lambda,\\ \\sigma=\\sqrt{\\lambda}"}</Math></TableCell>
                  </TableRow>
                </Table>
              </section>

              {/* ── VI. EXERCICES ── */}
              <section id="exercices" data-section-title="VI. Exercices corrigés" className="space-y-8">
                <StatsSectionHeader title="VI. Exercices corrigés" />

                <div className="space-y-6">
                  <Exercise
                    id="ch7-ex1"
                    title="Exercice 1 — Tissu anti-tiques (Bin → Poisson)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Un tissu est traité avec un produit anti-parasitaire. La probabilité qu'une tique
                          survive sur un carré de <Math>{"1\\ \\text{cm}^2"}</Math> est <Math>{"p = 0{,}004"}</Math>.
                          On observe un tissu de <Math>{"n = 400"}</Math> mailles.
                        </p>
                        <p>Calculer <Math>{"\\mathbb{P}(X = 0)"}</Math>, <Math>{"\\mathbb{P}(X = 1)"}</Math> et <Math>{"\\mathbb{P}(X \\geq 2)"}</Math>.</p>
                      </div>
                    }
                    method={
                      <div className="space-y-2 text-base leading-relaxed">
                        <p>Vérifier les conditions Bin → Poisson : <Math>{"n = 400 > 50"}</Math>, <Math>{"p = 0{,}004 < 0{,}1"}</Math>, <Math>{"np = 1{,}6 < 18"}</Math>. ✓</p>
                        <p>Poser <Math>{"\\lambda = np = 1{,}6"}</Math> et utiliser <Math>{"\\mathbb{P}(X=k) = e^{-\\lambda}\\lambda^k/k!"}</Math>.</p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{"\\lambda = 400 \\times 0{,}004 = 1{,}6"}</Math></p>
                        <FormulaBox>{"\\mathbb{P}(X=0) = e^{-1{,}6} \\approx 0{,}2019"}</FormulaBox>
                        <FormulaBox>{"\\mathbb{P}(X=1) = 1{,}6\\,e^{-1{,}6} \\approx 0{,}3230"}</FormulaBox>
                        <FormulaBox>{"\\mathbb{P}(X \\geq 2) = 1 - \\mathbb{P}(X=0) - \\mathbb{P}(X=1) \\approx 1 - 0{,}5249 = 0{,}4751"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch7-ex2"
                    title="Exercice 2 — Surbooking SNCF (Bin → Normale)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Un train de <Math>{"n = 500"}</Math> places est surréservé. La probabilité qu'un voyageur
                          ne se présente pas est <Math>{"p = 0{,}08"}</Math>. Soit <Math>{"X"}</Math> le nombre d'absents.
                        </p>
                        <p>Calculer <Math>{"\\mathbb{P}(X \\geq 45)"}</Math>.</p>
                      </div>
                    }
                    method={
                      <div className="space-y-2 text-base leading-relaxed">
                        <p>Vérifier : <Math>{"np = 40 > 18"}</Math> → approximation normale.</p>
                        <p>Calculer <Math>{"\\mu = np"}</Math>, <Math>{"\\sigma = \\sqrt{np(1-p)}"}</Math>, standardiser et lire la table.</p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{"\\mu = 500 \\times 0{,}08 = 40"}</Math>, <Math>{"\\sigma = \\sqrt{40 \\times 0{,}92} \\approx 6{,}07"}</Math></p>
                        <p>Avec correction de Yates :</p>
                        <FormulaBox>{"\\mathbb{P}(X \\geq 45) \\approx \\mathbb{P}\\!\\left(U \\geq \\frac{44{,}5 - 40}{6{,}07}\\right) = \\mathbb{P}(U \\geq 0{,}74) = 1 - \\Phi(0{,}74) \\approx 0{,}2296"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch7-ex3"
                    title="Exercice 3 — Affluence hypermarché (Bin → Poisson → Normale)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Un hypermarché reçoit en moyenne <Math>{"\\lambda = 25"}</Math> clients par heure.
                          On modélise les arrivées par une loi de Poisson.
                        </p>
                        <p>Calculer <Math>{"\\mathbb{P}(20 \\leq X \\leq 30)"}</Math>.</p>
                      </div>
                    }
                    method={
                      <div className="space-y-2 text-base leading-relaxed">
                        <p><Math>{"\\lambda = 25 > 18"}</Math> → approximation normale <Math>{"X \\approx \\mathcal{N}(25, \\sqrt{25})"}</Math>.</p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{"\\mu = 25"}</Math>, <Math>{"\\sigma = \\sqrt{25} = 5"}</Math></p>
                        <p>Avec correction de Yates :</p>
                        <FormulaBox>{"u_1 = \\frac{19{,}5-25}{5} = -1{,}10, \\qquad u_2 = \\frac{30{,}5-25}{5} = 1{,}10"}</FormulaBox>
                        <FormulaBox>{"\\mathbb{P}(20 \\leq X \\leq 30) \\approx \\Phi(1{,}10) - \\Phi(-1{,}10) = 2\\Phi(1{,}10) - 1 \\approx 0{,}7286"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch7-ex4"
                    title="Exercice 4 — Abonnements revues (Bin → Poisson)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Une revue scientifique envoie <Math>{"n = 2000"}</Math> numéros. La probabilité qu'un
                          abonné passe une commande supplémentaire est <Math>{"p = 0{,}003"}</Math>.
                        </p>
                        <p>
                          Calculer la probabilité qu'il y ait <strong>exactement 5 commandes</strong> supplémentaires.
                        </p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{"n=2000>50"}</Math>, <Math>{"p=0{,}003<0{,}1"}</Math>, <Math>{"np=6<18"}</Math> → Poisson avec <Math>{"\\lambda=6"}</Math>.</p>
                        <FormulaBox>{"\\mathbb{P}(X=5) = e^{-6}\\frac{6^5}{5!} = e^{-6}\\frac{7776}{120} \\approx 0{,}1606"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch7-ex5"
                    title="Exercice 5 — Station-service (Bin → Normale)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Sur une autoroute, 60 % des véhicules sont des voitures particulières.
                          On observe <Math>{"n = 200"}</Math> véhicules. Soit <Math>{"X"}</Math> le nombre de voitures particulières.
                        </p>
                        <p>Calculer <Math>{"\\mathbb{P}(110 \\leq X \\leq 130)"}</Math>.</p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{"np = 120 > 18"}</Math> → normale. <Math>{"\\mu=120"}</Math>, <Math>{"\\sigma=\\sqrt{200\\times0{,}6\\times0{,}4}=\\sqrt{48}\\approx6{,}93"}</Math></p>
                        <p>Avec correction de Yates :</p>
                        <FormulaBox>{"u_1 = \\frac{109{,}5-120}{6{,}93} \\approx -1{,}52, \\qquad u_2 = \\frac{130{,}5-120}{6{,}93} \\approx 1{,}52"}</FormulaBox>
                        <FormulaBox>{"\\mathbb{P}(110 \\leq X \\leq 130) \\approx 2\\Phi(1{,}52)-1 \\approx 2\\times0{,}9357-1 = 0{,}8714"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch7-ex6"
                    title="Exercice 6 — Pièces non conformes (Bin → Poisson ou Normale)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Une machine produit des pièces dont 2 % sont non conformes.
                          On prélève <Math>{"n = 300"}</Math> pièces.
                        </p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Quelle approximation utiliser ? Justifier.</li>
                          <li>Calculer <Math>{"\\mathbb{P}(X \\leq 10)"}</Math>.</li>
                        </ol>
                      </div>
                    }
                    method={
                      <div className="space-y-2 text-base leading-relaxed">
                        <p>Vérifier les conditions : <Math>{"n=300>50"}</Math>, <Math>{"p=0{,}02<0{,}1"}</Math>, <Math>{"np=6<18"}</Math> → Poisson.</p>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> Les trois conditions Bin → Poisson sont satisfaites. On pose <Math>{"\\lambda = np = 6"}</Math>.</p>
                        <p><strong>2)</strong></p>
                        <FormulaBox>{"\\mathbb{P}(X \\leq 10) = \\sum_{k=0}^{10} e^{-6}\\frac{6^k}{k!} \\approx 0{,}9574"}</FormulaBox>
                        <p className="text-base">(valeur lue dans la table de la loi de Poisson)</p>
                      </div>
                    }
                  />
                </div>
              </section>

              {/* ── VII. PIÈGES ── */}
              <section id="pieges" data-section-title="VII. Pièges classiques" className="space-y-8">
                <StatsSectionHeader title="VII. Pièges classiques" />

                <div className="space-y-4">
                  <AlertBox title="Piège 1 — Vérifier les conditions avant d'approximer">
                    <p className="text-base leading-relaxed">
                      Ne jamais approximer sans vérifier les conditions numériques.
                      La condition <Math>{"np < 18"}</Math> distingue Poisson de Normale pour la binomiale.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 2 — Oublier la correction de Yates">
                    <p className="text-base leading-relaxed">
                      Quand on approxime une loi discrète par une loi continue, la correction de continuité
                      (± 0,5) améliore significativement la précision. Sans correction, on peut se tromper
                      de plusieurs points de pourcentage.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 3 — Confondre p avec 1-p dans la variance">
                    <p className="text-base leading-relaxed">
                      Pour <Math>{"\\mathcal{B}(n,p)"}</Math> : <Math>{"\\sigma = \\sqrt{np(1-p)}"}</Math>.
                      Si <Math>{"p"}</Math> est proche de 1, ne pas mettre <Math>{"\\sqrt{np^2}"}</Math>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 4 — Poisson → Normale : le paramètre joue deux rôles">
                    <p className="text-base leading-relaxed">
                      Pour <Math>{"X \\sim \\mathcal{P}(\\lambda)"}</Math> : <Math>{"\\mathbb{E}(X) = \\lambda"}</Math>{" "}
                      <strong>et</strong> <Math>{"\\mathrm{Var}(X) = \\lambda"}</Math>.
                      Donc <Math>{"\\sigma = \\sqrt{\\lambda}"}</Math>, pas <Math>{"\\lambda"}</Math>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 5 — L'ordre des approximations">
                    <p className="text-base leading-relaxed">
                      Si <Math>{"n > 50"}</Math>, <Math>{"p < 0{,}1"}</Math> et <Math>{"np < 18"}</Math> : aller vers Poisson.
                      Si en plus <Math>{"\\lambda > 18"}</Math> : on peut encore approximer par normale.
                      Ne pas sauter une étape.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 6 — np et non n×p avec arrondi">
                    <p className="text-base leading-relaxed">
                      Le paramètre <Math>{"\\lambda = np"}</Math> ou la moyenne <Math>{"\\mu = np"}</Math> peuvent
                      ne pas être entiers — c'est normal. Ne pas arrondir prématurément.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 7 — Conditions insuffisantes : np > 5 vs np > 18">
                    <p className="text-base leading-relaxed">
                      Certains ouvrages donnent <Math>{"np \\geq 5"}</Math> comme condition. En L2, on utilise la règle
                      plus stricte <Math>{"np > 18"}</Math> pour garantir la qualité de l'approximation.
                    </p>
                  </AlertBox>
                </div>
              </section>

              {/* ── FICHE DE SYNTHÈSE ── */}
              <section id="synthese" data-section-title="Fiche de synthèse" className="space-y-8">
                <StatsSectionHeader title="Fiche de synthèse" />

                <Table headers={['Convergence', 'Condition', 'Paramètre(s)', 'Correction Yates']}>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{B}(n,p) \\to \\mathcal{P}(\\lambda)"}</Math></TableCell>
                    <TableCell><Math>{"n>50,\\ p<0{,}1,\\ np<18"}</Math></TableCell>
                    <TableCell><Math>{"\\lambda = np"}</Math></TableCell>
                    <TableCell>Non (loi discrète)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{B}(n,p) \\to \\mathcal{N}(\\mu,\\sigma)"}</Math></TableCell>
                    <TableCell><Math>{"np > 18"}</Math></TableCell>
                    <TableCell><Math>{"\\mu=np,\\ \\sigma=\\sqrt{np(1-p)}"}</Math></TableCell>
                    <TableCell>Oui (±0,5)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{P}(\\lambda) \\to \\mathcal{N}(\\mu,\\sigma)"}</Math></TableCell>
                    <TableCell><Math>{"\\lambda > 18"}</Math></TableCell>
                    <TableCell><Math>{"\\mu=\\lambda,\\ \\sigma=\\sqrt{\\lambda}"}</Math></TableCell>
                    <TableCell>Oui (±0,5)</TableCell>
                  </TableRow>
                </Table>
              </section>

            </div>

            <ChapterNav
              prev={{ path: '/s4/stats/chapitre-6', label: '← Chapitre 6', title: 'Tables statistiques' }}
              next={{ path: '/s4/stats/chapitre-8', label: 'Chapitre 8 →', title: "Distributions d'échantillonnage" }}
            />
          </div>
        </div>
      </div>

      <TableOfContents />
    </main>
  );
}

