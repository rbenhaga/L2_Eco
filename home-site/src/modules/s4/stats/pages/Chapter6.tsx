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

export function Chapter6() {
  return (
    <main className="course-page course-page--paper-focus w-full flex justify-center">
      <div className="course-reader-frame w-full">
        <div className="course-reader-body">
          <div className="course-paper">
            <PageHeader
              number="Chapitre 6"
              title="Tables statistiques — Lois continues"
              description="Loi normale, khi-deux, Student et Fisher-Snedecor : définitions, lecture des tables, propriétés et exercices corrigés."
            />

            <div className="course-flow space-y-16">

              {/* ── INTRODUCTION ── */}
              <section id="introduction" data-section-title="Introduction" className="space-y-8">
                <StatsSectionHeader title="Introduction" />
                <div className="space-y-4 text-base leading-relaxed">
                  <p>
                    Ce chapitre présente les quatre lois de probabilité continues fondamentales en statistique
                    inférentielle. Maîtriser leur définition, leurs propriétés et la lecture de leurs tables
                    est indispensable pour les tests d'hypothèses et les intervalles de confiance.
                  </p>
                  <p>
                    Toutes ces lois sont reliées à la loi normale : la loi du Khi-deux, la loi de Student
                    et la loi de Fisher-Snedecor se construisent à partir de variables normales indépendantes.
                  </p>
                </div>
              </section>

              {/* ── I. LOI NORMALE ── */}
              <section id="normale" data-section-title="I. Loi Normale" className="space-y-8">
                <StatsSectionHeader title="I. Loi Normale" />

                <div className="space-y-8">
                  <DefBox title="Densité de la loi normale N(m ; σ)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Une variable aléatoire <Math>{"X"}</Math> suit une loi normale de moyenne <Math>{"m"}</Math>{" "}
                        et d'écart-type <Math>{"\\sigma > 0"}</Math> si sa densité est :
                      </p>
                      <FormulaBox>{"f(x\\,;\\,m,\\sigma) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\!\\left(-\\frac{(x-m)^2}{2\\sigma^2}\\right), \\quad x\\in\\mathbb{R}"}</FormulaBox>
                      <p>
                        La loi normale centrée réduite <Math>{"\\mathcal{N}(0\\,;\\,1)"}</Math> a pour densité :
                      </p>
                      <FormulaBox>{"\\varphi(u) = \\frac{1}{\\sqrt{2\\pi}}e^{-u^2/2}"}</FormulaBox>
                    </div>
                  </DefBox>

                  <MethBox title="Standardisation (centrage-réduction)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Si <Math>{"X \\sim \\mathcal{N}(m\\,;\\,\\sigma)"}</Math>, on pose :
                      </p>
                      <FormulaBox>{"U = \\frac{X - m}{\\sigma} \\sim \\mathcal{N}(0\\,;\\,1)"}</FormulaBox>
                      <p>
                        Pour calculer <Math>{"\\mathbb{P}(a \\leq X \\leq b)"}</Math>, on standardise :
                      </p>
                      <FormulaBox>{"\\mathbb{P}(a \\leq X \\leq b) = \\mathbb{P}\\!\\left(\\frac{a-m}{\\sigma} \\leq U \\leq \\frac{b-m}{\\sigma}\\right)"}</FormulaBox>
                    </div>
                  </MethBox>

                  <ThmBox title="Lecture des tables N(0;1) — Tables 1, 2 et 3">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p><strong>Table 1 (densité) :</strong> donne <Math>{"\\varphi(u)"}</Math> pour <Math>{"u \\geq 0"}</Math>.</p>
                      <p><strong>Table 2 (fonction de répartition) :</strong> donne <Math>{"\\Phi(u) = \\mathbb{P}(U \\leq u)"}</Math>. Pour <Math>{"u < 0"}</Math> :</p>
                      <FormulaBox>{"\\Phi(u) = 1 - \\Phi(-u)"}</FormulaBox>
                      <p>
                        <strong>Table 3 (quantiles) :</strong> donne <Math>{"u_\\alpha"}</Math> tel que{" "}
                        <Math>{"\\mathbb{P}(U \\leq u_\\alpha) = 1-\\alpha"}</Math>. Valeurs à mémoriser :
                      </p>
                      <p className="text-base">
                        <Math>{"u_{0{,}025} = 1{,}96"}</Math> (risque bilatéral 5 %),{" "}
                        <Math>{"u_{0{,}005} = 2{,}576"}</Math> (risque bilatéral 1 %)
                      </p>
                    </div>
                  </ThmBox>

                  <ThmBox title="Additivité de la loi normale">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Si <Math>{"X_1 \\sim \\mathcal{N}(m_1, \\sigma_1)"}</Math> et{" "}
                        <Math>{"X_2 \\sim \\mathcal{N}(m_2, \\sigma_2)"}</Math> indépendantes :
                      </p>
                      <FormulaBox>{"X_1 + X_2 \\sim \\mathcal{N}(m_1+m_2,\\; \\sqrt{\\sigma_1^2+\\sigma_2^2})"}</FormulaBox>
                      <p>
                        Pour <Math>{"X_1,\\ldots,X_n"}</Math> i.i.d. <Math>{"\\mathcal{N}(m,\\sigma)"}</Math> :
                      </p>
                      <FormulaBox>{"\\bar X = \\frac{1}{n}\\sum_{i=1}^n X_i \\sim \\mathcal{N}\\!\\left(m,\\, \\frac{\\sigma}{\\sqrt{n}}\\right)"}</FormulaBox>
                    </div>
                  </ThmBox>
                </div>
              </section>

              {/* ── II. LOI KHI-DEUX ── */}
              <section id="khideux" data-section-title="II. Loi du Khi-deux" className="space-y-8">
                <StatsSectionHeader title="II. Loi du Khi-deux" />

                <div className="space-y-8">
                  <DefBox title="Définition et construction de χ²(ν)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Soient <Math>{"U_1, \\ldots, U_\\nu"}</Math> des variables <Math>{"\\mathcal{N}(0,1)"}</Math> i.i.d. La variable :
                      </p>
                      <FormulaBox>{"\\chi^2_\\nu = \\sum_{i=1}^\\nu U_i^2 \\sim \\chi^2(\\nu)"}</FormulaBox>
                      <p>
                        suit une loi du Khi-deux à <Math>{"\\nu"}</Math> degrés de liberté.
                        On a <Math>{"\\mathbb{E}[\\chi^2_\\nu] = \\nu"}</Math> et <Math>{"\\mathrm{Var}(\\chi^2_\\nu) = 2\\nu"}</Math>.
                      </p>
                    </div>
                  </DefBox>

                  <ThmBox title="Lecture de la Table 4 — χ²(ν)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        La table donne <Math>{"\\chi^2_{\\alpha,\\nu}"}</Math> tel que{" "}
                        <Math>{"\\mathbb{P}(\\chi^2(\\nu) \\leq \\chi^2_{\\alpha,\\nu}) = 1 - \\alpha"}</Math>.
                      </p>
                      <p>Pour une probabilité bilatérale <Math>{"\\mathbb{P}(a \\leq \\chi^2(\\nu) \\leq b) = 1-\\alpha"}</Math> :</p>
                      <FormulaBox>{"a = \\chi^2_{1-\\alpha/2,\\,\\nu}, \\qquad b = \\chi^2_{\\alpha/2,\\,\\nu}"}</FormulaBox>
                    </div>
                  </ThmBox>

                  <ThmBox title="Additivité et convergence du χ²">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>Si <Math>{"X \\sim \\chi^2(p)"}</Math> et <Math>{"Y \\sim \\chi^2(q)"}</Math> indépendantes :</p>
                      <FormulaBox>{"X + Y \\sim \\chi^2(p+q)"}</FormulaBox>
                      <p>Convergence vers la normale pour <Math>{"\\nu > 30"}</Math> :</p>
                      <FormulaBox>{"\\frac{\\chi^2(\\nu) - \\nu}{\\sqrt{2\\nu}} \\xrightarrow{\\mathcal{L}} \\mathcal{N}(0,1)"}</FormulaBox>
                    </div>
                  </ThmBox>
                </div>
              </section>

              {/* ── III. LOI DE STUDENT ── */}
              <section id="student" data-section-title="III. Loi de Student" className="space-y-8">
                <StatsSectionHeader title="III. Loi de Student" />

                <div className="space-y-8">
                  <DefBox title="Définition et construction de T(ν)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Soient <Math>{"U \\sim \\mathcal{N}(0,1)"}</Math> et{" "}
                        <Math>{"V \\sim \\chi^2(\\nu)"}</Math> indépendantes. La variable :
                      </p>
                      <FormulaBox>{"T(\\nu) = \\frac{U}{\\sqrt{V/\\nu}} \\sim t(\\nu)"}</FormulaBox>
                      <p>
                        suit une loi de Student à <Math>{"\\nu"}</Math> degrés de liberté.
                        La loi de Student est <strong>symétrique autour de 0</strong>.
                      </p>
                    </div>
                  </DefBox>

                  <ThmBox title="Lecture de la Table 5 — Student bilatérale">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        La table donne <Math>{"t_{\\alpha/2,\\,\\nu}"}</Math> tel que{" "}
                        <Math>{"\\mathbb{P}(|T(\\nu)| \\leq t_{\\alpha/2,\\nu}) = 1-\\alpha"}</Math>.
                      </p>
                      <p>Par symétrie : <Math>{"\\mathbb{P}(T(\\nu) \\leq t_{\\alpha/2,\\nu}) = 1 - \\alpha/2"}</Math>.</p>
                      <p>Convergence : pour <Math>{"\\nu > 30"}</Math>, <Math>{"T(\\nu) \\approx \\mathcal{N}(0,1)"}</Math>.</p>
                    </div>
                  </ThmBox>

                  <MethBox title="Quand utiliser la loi de Student ?">
                    <div className="space-y-3 text-base leading-relaxed">
                      <p>La statistique de Student apparaît quand <strong>σ est inconnu</strong> :</p>
                      <FormulaBox>{"T = \\frac{\\bar X - m}{S/\\sqrt{n}} \\sim t(n-1), \\quad S^2 = \\frac{1}{n-1}\\sum_{i=1}^n(X_i-\\bar X)^2"}</FormulaBox>
                    </div>
                  </MethBox>
                </div>
              </section>

              {/* ── IV. LOI DE FISHER-SNEDECOR ── */}
              <section id="fisher" data-section-title="IV. Loi de Fisher-Snedecor" className="space-y-8">
                <StatsSectionHeader title="IV. Loi de Fisher-Snedecor" />

                <div className="space-y-8">
                  <DefBox title="Définition et construction de F(p, q)">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        Soient <Math>{"V_1 \\sim \\chi^2(p)"}</Math> et <Math>{"V_2 \\sim \\chi^2(q)"}</Math> indépendantes. La variable :
                      </p>
                      <FormulaBox>{"F(p,q) = \\frac{V_1/p}{V_2/q} \\sim \\mathcal{F}(p,q)"}</FormulaBox>
                      <p>suit une loi de Fisher-Snedecor à <Math>{"p"}</Math> et <Math>{"q"}</Math> degrés de liberté. <Math>{"F(p,q)"}</Math> est toujours positive.</p>
                    </div>
                  </DefBox>

                  <ThmBox title="Table 6 — Propriété d'inversion et lien Student">
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Lecture de la Table 6 :</strong> donne <Math>{"F_{\\alpha}(p,q)"}</Math> tel que{" "}
                        <Math>{"\\mathbb{P}(F(p,q) \\leq F_\\alpha(p,q)) = 1-\\alpha"}</Math>.
                      </p>
                      <p><strong>Propriété d'inversion (queue gauche) :</strong></p>
                      <FormulaBox>{"F_{1-\\alpha}(p,q) = \\frac{1}{F_\\alpha(q,p)}"}</FormulaBox>
                      <p><strong>Lien Student-Fisher :</strong> si <Math>{"T \\sim t(\\nu)"}</Math>, alors <Math>{"T^2 \\sim \\mathcal{F}(1,\\nu)"}</Math>.</p>
                    </div>
                  </ThmBox>
                </div>
              </section>

              {/* ── V. FICHE DE SYNTHÈSE ── */}
              <section id="synthese" data-section-title="V. Fiche de synthèse" className="space-y-8">
                <StatsSectionHeader title="V. Fiche de synthèse" />

                <Table headers={['Loi', 'Paramètres', 'Construction', 'Table', 'Convergence → N']}>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{N}(m,\\sigma)"}</Math></TableCell>
                    <TableCell><Math>{"m\\in\\mathbb{R},\\ \\sigma>0"}</Math></TableCell>
                    <TableCell>Axiomatique</TableCell>
                    <TableCell>Tables 1, 2, 3</TableCell>
                    <TableCell>Référence</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\chi^2(\\nu)"}</Math></TableCell>
                    <TableCell><Math>{"\\nu \\in \\mathbb{N}^*"}</Math></TableCell>
                    <TableCell><Math>{"\\sum_{i=1}^\\nu U_i^2"}</Math></TableCell>
                    <TableCell>Table 4</TableCell>
                    <TableCell><Math>{"\\nu > 30"}</Math></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"t(\\nu)"}</Math></TableCell>
                    <TableCell><Math>{"\\nu \\in \\mathbb{N}^*"}</Math></TableCell>
                    <TableCell><Math>{"U / \\sqrt{V/\\nu}"}</Math></TableCell>
                    <TableCell>Table 5</TableCell>
                    <TableCell><Math>{"\\nu > 30"}</Math></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell header><Math>{"\\mathcal{F}(p,q)"}</Math></TableCell>
                    <TableCell><Math>{"p,q \\in \\mathbb{N}^*"}</Math></TableCell>
                    <TableCell><Math>{"(V_1/p)/(V_2/q)"}</Math></TableCell>
                    <TableCell>Table 6</TableCell>
                    <TableCell><Math>{"T^2(\\nu) = F(1,\\nu)"}</Math></TableCell>
                  </TableRow>
                </Table>
              </section>

              {/* ── VI. MÉTHODES ── */}
              <section id="methodes" data-section-title="VI. Méthodes indispensables" className="space-y-8">
                <StatsSectionHeader title="VI. Méthodes indispensables" />

                <div className="space-y-8">
                  <MethBox title="Méthode 1 — Lecture de la table normale">
                    <ol className="list-decimal pl-6 space-y-3 text-base leading-relaxed">
                      <li>Standardiser : <Math>{"U = (X-m)/\\sigma"}</Math>.</li>
                      <li>Ramener à <Math>{"u > 0"}</Math> par symétrie si nécessaire.</li>
                      <li>Lire <Math>{"\\Phi(u)"}</Math> dans la Table 2.</li>
                      <li>Calculer la probabilité par différence de CDF si intervalle.</li>
                    </ol>
                  </MethBox>

                  <MethBox title="Méthode 2 — Utilisation de la table χ²">
                    <ol className="list-decimal pl-6 space-y-3 text-base leading-relaxed">
                      <li>Identifier les degrés de liberté <Math>{"\\nu"}</Math>.</li>
                      <li>Pour une probabilité <Math>{"1-\\alpha"}</Math>, lire la colonne <Math>{"\\alpha"}</Math> à la ligne <Math>{"\\nu"}</Math>.</li>
                      <li>Probabilité bilatérale : trouver deux bornes distinctes.</li>
                    </ol>
                  </MethBox>

                  <MethBox title="Méthode 3 — Utilisation de la table Student">
                    <ol className="list-decimal pl-6 space-y-3 text-base leading-relaxed">
                      <li>Table 5 généralement <strong>bilatérale</strong> : chercher le risque global <Math>{"\\alpha"}</Math>.</li>
                      <li>Identifier les degrés de liberté <Math>{"n-1"}</Math>.</li>
                      <li>Par symétrie : <Math>{"\\mathbb{P}(|T| \\leq t_{\\alpha/2,n-1}) = 1-\\alpha"}</Math>.</li>
                    </ol>
                  </MethBox>

                  <MethBox title="Méthode 4 — Utilisation de la table Fisher">
                    <ol className="list-decimal pl-6 space-y-3 text-base leading-relaxed">
                      <li>Identifier <Math>{"(p, q)"}</Math> — l'ordre est important !</li>
                      <li>Lire <Math>{"F_\\alpha(p,q)"}</Math> dans la Table 6.</li>
                      <li>Queue gauche : <Math>{"F_{1-\\alpha}(p,q) = 1/F_\\alpha(q,p)"}</Math> (ddl inversés).</li>
                    </ol>
                  </MethBox>
                </div>
              </section>

              {/* ── VII. EXERCICES ── */}
              <section id="exercices" data-section-title="VII. Exercices corrigés" className="space-y-8">
                <StatsSectionHeader title="VII. Exercices corrigés" />

                <div className="space-y-6">
                  <Exercise
                    id="ch6-ex1"
                    title="Exercice 1 — Probabilités sur la loi normale N(12 ; 3)"
                    content={
                      <div className="space-y-3">
                        <p>Soit <Math>{"X \\sim \\mathcal{N}(12\\,;\\,3)"}</Math>. Calculer :</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li><Math>{"\\mathbb{P}(X \\leq 15)"}</Math></li>
                          <li><Math>{"\\mathbb{P}(9 \\leq X \\leq 18)"}</Math></li>
                          <li><Math>{"\\mathbb{P}(X \\geq 10)"}</Math></li>
                        </ol>
                      </div>
                    }
                    method={
                      <ol className="list-decimal pl-6 space-y-2 text-base leading-relaxed">
                        <li>Standardiser : <Math>{"U = (X-12)/3"}</Math>.</li>
                        <li>Calculer les valeurs réduites correspondantes.</li>
                        <li>Lire <Math>{"\\Phi(u)"}</Math> (Table 2) ; utiliser <Math>{"\\Phi(-u) = 1-\\Phi(u)"}</Math>.</li>
                      </ol>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> <Math>{"u = (15-12)/3 = 1"}</Math></p>
                        <FormulaBox>{"\\mathbb{P}(X \\leq 15) = \\Phi(1) = 0{,}8413"}</FormulaBox>
                        <p><strong>2)</strong> <Math>{"u_1 = -1"}</Math>, <Math>{"u_2 = 2"}</Math></p>
                        <FormulaBox>{"\\mathbb{P}(9 \\leq X \\leq 18) = \\Phi(2) - \\Phi(-1) = 0{,}9772 - 0{,}1587 = 0{,}8185"}</FormulaBox>
                        <p><strong>3)</strong> <Math>{"u = (10-12)/3 \\approx -0{,}67"}</Math></p>
                        <FormulaBox>{"\\mathbb{P}(X \\geq 10) = 1 - \\Phi(-0{,}67) = \\Phi(0{,}67) \\approx 0{,}7486"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch6-ex2"
                    title="Exercice 2 — Quantile et intervalle de confiance"
                    content={
                      <div className="space-y-3">
                        <p>Soit <Math>{"X \\sim \\mathcal{N}(100\\,;\\,15)"}</Math> (distribution du QI).</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Trouver <Math>{"x_0"}</Math> tel que <Math>{"\\mathbb{P}(X \\leq x_0) = 0{,}95"}</Math>.</li>
                          <li>Trouver l'intervalle symétrique centré en 100 contenant 90 % de la population.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> <Math>{"\\Phi(u_0) = 0{,}95 \\Rightarrow u_0 = 1{,}645"}</Math> (Table 3).</p>
                        <FormulaBox>{"x_0 = 100 + 1{,}645 \\times 15 = 124{,}7"}</FormulaBox>
                        <p><strong>2)</strong> <Math>{"\\mathbb{P}(100-c \\leq X \\leq 100+c) = 0{,}90 \\Rightarrow \\Phi(u) = 0{,}95 \\Rightarrow u = 1{,}645"}</Math>.</p>
                        <FormulaBox>{"c = 1{,}645 \\times 15 = 24{,}7 \\quad\\Rightarrow\\quad [75{,}3\\,;\\,124{,}7]"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch6-ex3"
                    title="Exercice 3 — Loi du Khi-deux χ²(10)"
                    content={
                      <div className="space-y-3">
                        <p>Soit <Math>{"V \\sim \\chi^2(10)"}</Math>. Calculer :</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li><Math>{"\\mathbb{P}(V \\leq 18{,}31)"}</Math></li>
                          <li><Math>{"a"}</Math> tel que <Math>{"\\mathbb{P}(V \\leq a) = 0{,}025"}</Math>.</li>
                          <li>L'intervalle <Math>{"[a, b]"}</Math> tel que <Math>{"\\mathbb{P}(a \\leq V \\leq b) = 0{,}95"}</Math>.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> Table 4, <Math>{"\\nu=10"}</Math>, colonne <Math>{"\\alpha=0{,}05"}</Math> : <Math>{"\\chi^2_{0{,}05,10} = 18{,}31"}</Math>.</p>
                        <FormulaBox>{"\\mathbb{P}(V \\leq 18{,}31) = 0{,}95"}</FormulaBox>
                        <p><strong>2)</strong> Colonne <Math>{"\\alpha=0{,}975"}</Math> : <Math>{"a = \\chi^2_{0{,}975,10} = 3{,}25"}</Math>.</p>
                        <p><strong>3)</strong> Intervalle à 95 % :</p>
                        <FormulaBox>{"\\mathbb{P}(3{,}25 \\leq V \\leq 20{,}48) = 0{,}95"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch6-ex4"
                    title="Exercice 4 — Loi de Student t(15)"
                    content={
                      <div className="space-y-3">
                        <p>Soit <Math>{"T \\sim t(15)"}</Math>. Calculer :</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li><Math>{"\\mathbb{P}(|T| \\leq 2{,}131)"}</Math></li>
                          <li>Le quantile <Math>{"t_{0{,}025,15}"}</Math>.</li>
                          <li><Math>{"\\mathbb{P}(T \\leq -1{,}753)"}</Math>.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> Table 5, <Math>{"\\nu=15"}</Math> :</p>
                        <FormulaBox>{"\\mathbb{P}(|T| \\leq 2{,}131) = 0{,}95"}</FormulaBox>
                        <p><strong>2)</strong> <Math>{"t_{0{,}025,15} = 2{,}131"}</Math>.</p>
                        <p><strong>3)</strong> Par symétrie <Math>{"t_{0{,}05,15} = 1{,}753"}</Math> :</p>
                        <FormulaBox>{"\\mathbb{P}(T \\leq -1{,}753) = 0{,}05"}</FormulaBox>
                      </div>
                    }
                  />

                  <Exercise
                    id="ch6-ex5"
                    title="Exercice 5 — Loi de Fisher F(5, 10) et inversion"
                    content={
                      <div className="space-y-3">
                        <p>Soit <Math>{"F \\sim \\mathcal{F}(5, 10)"}</Math>.</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Lire <Math>{"F_{0{,}05}(5, 10)"}</Math> dans la Table 6.</li>
                          <li>Calculer <Math>{"F_{0{,}95}(5, 10)"}</Math> par la formule d'inversion.</li>
                          <li>En déduire <Math>{"\\mathbb{P}(F_{0{,}95}(5,10) \\leq F \\leq F_{0{,}05}(5,10))"}</Math>.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1)</strong> Table 6, <Math>{"p=5"}</Math>, <Math>{"q=10"}</Math> : <Math>{"F_{0{,}05}(5,10) = 3{,}33"}</Math>.</p>
                        <p><strong>2)</strong> Inversion (ddl inversés) :</p>
                        <FormulaBox>{"F_{0{,}95}(5,10) = \\frac{1}{F_{0{,}05}(10,5)} = \\frac{1}{4{,}74} \\approx 0{,}211"}</FormulaBox>
                        <p><strong>3)</strong></p>
                        <FormulaBox>{"\\mathbb{P}(0{,}211 \\leq F \\leq 3{,}33) = 0{,}90"}</FormulaBox>
                      </div>
                    }
                  />
                </div>
              </section>

              {/* ── VIII. PIÈGES ── */}
              <section id="pieges" data-section-title="VIII. Pièges classiques" className="space-y-8">
                <StatsSectionHeader title="VIII. Pièges classiques" />

                <div className="space-y-4">
                  <AlertBox title="Piège 1 — Confondre σ et σ²">
                    <p className="text-base leading-relaxed">
                      La loi normale s'écrit <Math>{"\\mathcal{N}(m\\,;\\,\\sigma)"}</Math> avec l'écart-type.
                      Standardiser avec <Math>{"\\sigma"}</Math>, pas <Math>{"\\sigma^2"}</Math>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 2 — Table Student bilatérale vs χ² unilatérale">
                    <p className="text-base leading-relaxed">
                      La Table 5 Student est en général <strong>bilatérale</strong> (risque partagé <Math>{"\\alpha/2"}</Math> de chaque côté).
                      La Table 4 Khi-deux est <strong>unilatérale</strong> (distribution non symétrique).
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 3 — Inversion Fisher : l'ordre des ddl s'inverse">
                    <p className="text-base leading-relaxed">
                      <Math>{"F_{1-\\alpha}(p,q) = 1/F_\\alpha(q,p)"}</Math> — bien inverser <Math>{"p"}</Math> et <Math>{"q"}</Math>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 4 — Convergence vers N(0,1)">
                    <p className="text-base leading-relaxed">
                      La règle <Math>{"\\nu > 30"}</Math> autorise la table normale à la place de χ² ou Student.
                      Ne pas oublier de centrer-réduire la statistique.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 5 — Additivité et indépendance obligatoires">
                    <p className="text-base leading-relaxed">
                      <Math>{"\\chi^2(p)+\\chi^2(q) = \\chi^2(p+q)"}</Math> seulement si les deux variables sont <strong>indépendantes</strong>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 6 — Lien T² = F(1, ν)">
                    <p className="text-base leading-relaxed">
                      Si valeur critique Student = <Math>{"t"}</Math>, la valeur critique Fisher correspondante est <Math>{"t^2"}</Math>.
                    </p>
                  </AlertBox>
                  <AlertBox title="Piège 7 — Degrés de liberté de la variance corrigée">
                    <p className="text-base leading-relaxed">
                      <Math>{"(n-1)S^2/\\sigma^2 \\sim \\chi^2(n-1)"}</Math> — les ddl valent <Math>{"n-1"}</Math>, non <Math>{"n"}</Math>.
                    </p>
                  </AlertBox>
                </div>
              </section>

            </div>

            <ChapterNav
              prev={{ path: '/s4/stats/chapitre-5', label: '← Chapitre 5', title: 'Lois discrètes usuelles' }}
              next={{ path: '/s4/stats/chapitre-7', label: 'Chapitre 7 →', title: 'Convergence en loi' }}
            />
          </div>
        </div>
      </div>

      <TableOfContents />
    </main>
  );
}
