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

export function Chapter8() {
  return (
    <main className="course-page course-page--scoped-zoom w-full flex justify-center px-6">
      <div className="course-zoom-scope w-full max-w-[760px]">
        <div className="course-zoom-layer">
          <div className="course-paper">
            <PageHeader
              number="Chapitre 8"
              title="Distributions d'échantillonnage"
              description="Lois de la moyenne, des proportions et de la variance empirique. Statistiques pivot : Normale, Student, Khi-deux, Fisher."
            />

            <div className="course-flow space-y-16">

              {/* ── Introduction ─────────────────────────────────────── */}
              <section id="intro" data-section-title="Introduction" className="space-y-8">
                <StatsSectionHeader title="Introduction" />
                <div className="space-y-6">
                  <p className="text-base leading-relaxed">
                    Ce chapitre porte sur les <strong>distributions d'échantillonnage</strong> — les lois
                    de probabilité suivies par les statistiques calculées à partir d'un échantillon issu
                    d'une population mère. Ces statistiques comprennent la moyenne empirique{' '}
                    <Math>{`\\bar{X}`}</Math>, la proportion empirique <Math>F</Math> et la variance
                    empirique <Math>S^2</Math>. La question centrale est : si l'on prélève un échantillon
                    aléatoire d'une population normale, quelle loi suit la moyenne de cet échantillon ?
                    La réponse dépend crucialement de la connaissance ou non de l'écart-type de la population.
                  </p>
                  <DefBox title="Vocabulaire fondamental : population vs. échantillon">
                    <Table headers={['Caractéristique', 'Population (paramètre)', 'Échantillon (statistique)']}>
                      <TableRow>
                        <TableCell>Moyenne</TableCell>
                        <TableCell><Math>{`m = \\mathbb{E}[X]`}</Math></TableCell>
                        <TableCell><Math>{`\\bar{x}`}</Math> [VA : <Math>{`\\bar{X}`}</Math>]</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Écart-type</TableCell>
                        <TableCell><Math>\sigma</Math></TableCell>
                        <TableCell><Math>s</Math> [VA : <Math>S</Math>]</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Variance</TableCell>
                        <TableCell><Math>{`\\sigma^2 = \\mathrm{Var}(X)`}</Math></TableCell>
                        <TableCell><Math>{`s^2`}</Math> [VA : <Math>{`S^2`}</Math>]</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Proportion</TableCell>
                        <TableCell><Math>p</Math></TableCell>
                        <TableCell><Math>f</Math> [VA : <Math>F</Math>]</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taille de l'échantillon</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell><Math>n</Math></TableCell>
                      </TableRow>
                    </Table>
                    <p className="text-base mt-3">
                      Convention : la lettre majuscule (<Math>{`\\bar{X}`}</Math>, <Math>{`S^2`}</Math>,
                      <Math>F</Math>) désigne la variable aléatoire ; la lettre minuscule désigne la valeur
                      observée sur un échantillon particulier.
                    </p>
                  </DefBox>
                  <AlertBox title="Pourquoi ne pas travailler directement sur la population ?">
                    Deux raisons : (1) les statistiques exhaustives de la population ne sont pas toujours
                    disponibles ; (2) collecter des informations sur un échantillon de taille <Math>n</Math>{' '}
                    est moins coûteux et plus rapide qu'un sondage exhaustif.
                  </AlertBox>
                </div>
              </section>

              {/* ── Section I — Fiche de synthèse ────────────────────── */}
              <section id="synthese" data-section-title="I. Lois liées à la moyenne · II. Proportions · III. Différences · IV. Démonstrations" className="space-y-8">
                <StatsSectionHeader title="I. Lois liées à la moyenne · II. Proportions · III. Différences · IV. Démonstrations" />

                {/* Définition échantillon i.i.d. */}
                <DefBox title="Échantillon i.i.d.">
                  Un <strong>n-échantillon théorique aléatoire</strong> de <Math>X</Math> est un vecteur{' '}
                  <Math>{`(X_1,\\ldots,X_n)`}</Math> où les <Math>{`X_i`}</Math> sont{' '}
                  <strong>indépendantes</strong> et suivent <strong>toutes la même loi</strong> que <Math>X</Math>.
                  On dit que les <Math>{`X_i`}</Math> sont <strong>i.i.d.</strong> (indépendantes et identiquement
                  distribuées). L'échantillon <strong>empirique ou observé</strong> est l'ensemble des <Math>n</Math>{' '}
                  valeurs numériques <Math>{`(x_1,\\ldots,x_n)`}</Math>.
                </DefBox>

                {/* Statistiques d'échantillon */}
                <DefBox title="Statistiques d'échantillon">
                  <div className="space-y-2">
                    <FormulaBox label="Moyenne empirique">
                      {`\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i`}
                    </FormulaBox>
                    <FormulaBox label="Variance empirique (diviseur n)">
                      {`S^2 = \\frac{1}{n}\\sum_{i=1}^n (X_i - \\bar{X})^2`}
                    </FormulaBox>
                    <FormulaBox label="Variance corrigée (diviseur n-1)">
                      {`\\hat{S}^2 = \\frac{n}{n-1}S^2 = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2`}
                    </FormulaBox>
                    <FormulaBox label="Proportion empirique">
                      {`F = \\frac{X}{n} \\quad (X = \\text{nombre d'individus vérifiant la caractéristique})`}
                    </FormulaBox>
                  </div>
                </DefBox>
                <AlertBox title="Convention sur S² vs Ŝ²">
                  Le cours utilise la <strong>variance empirique non corrigée</strong>{' '}
                  <Math>{`S^2 = \\frac{1}{n}\\sum(X_i-\\bar{X})^2`}</Math> (diviseur <Math>n</Math>).
                  La variance corrigée <Math>{`\\hat{S}^2`}</Math> utilise le diviseur{' '}
                  <Math>{`(n-1)`}</Math> et vérifie <Math>{`\\hat{S}^2 = \\frac{n}{n-1}S^2`}</Math>.
                  Les deux formules sont utilisées selon les résultats : <strong>vérifier l'énoncé</strong>.
                </AlertBox>

                {/* Cas 1 — σ connu */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">
                    Cas 1 — Écart-type σ connu
                  </h3>
                  <ThmBox title="Lois d'échantillonnage (σ connu)">
                    <p className="mb-3">Soit <Math>{`X \\sim \\mathcal{N}(m;\\sigma)`}</Math> et{' '}
                    <Math>{`(X_1,\\ldots,X_n)`}</Math> un n-échantillon i.i.d. Alors :</p>
                    <FormulaBox label="Loi de la moyenne">
                      {`\\bar{X} \\sim \\mathcal{N}\\!\\left(m\\,;\\,\\frac{\\sigma}{\\sqrt{n}}\\right)`}
                    </FormulaBox>
                    <FormulaBox label="Loi de la proportion (si X_i ~ B(1;p))">
                      {`F \\sim \\mathcal{N}\\!\\left(p\\,;\\,\\sqrt{\\frac{pq}{n}}\\right) \\qquad q=1-p`}
                    </FormulaBox>
                    <FormulaBox label="Loi de la variance empirique (Théorème de Fisher)">
                      {`K = \\frac{nS^2}{\\sigma^2} = \\frac{(n-1)\\hat{S}^2}{\\sigma^2} \\sim \\chi^2(n-1)`}
                    </FormulaBox>
                    <p className="text-base mt-2">
                      Propriété cruciale : <Math>K</Math> est <strong>indépendante</strong> de <Math>{`\\bar{X}`}</Math>.
                    </p>
                  </ThmBox>
                  <MethBox title="Démonstration : loi de X̄">
                    <p className="mb-2">On utilise deux propriétés :</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Toute combinaison linéaire de variables normales indépendantes est normale.</li>
                      <li><Math>{`\\bar{X} = \\frac{1}{n}\\sum X_i`}</Math> est une combinaison linéaire des <Math>{`X_i`}</Math>.</li>
                    </ol>
                    <FormulaBox>
                      {`\\mathbb{E}[\\bar{X}] = \\frac{1}{n}\\sum_{i=1}^n \\mathbb{E}[X_i] = m \\qquad \\mathrm{Var}(\\bar{X}) = \\frac{1}{n^2}\\cdot n\\sigma^2 = \\frac{\\sigma^2}{n}`}
                    </FormulaBox>
                  </MethBox>
                </div>

                {/* Cas 2 — σ inconnu */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">
                    Cas 2 — Écart-type σ inconnu
                  </h3>
                  <p className="text-base leading-relaxed">
                    Lorsque <Math>\sigma</Math> est inconnu, on ne peut pas former la variable centrée réduite{' '}
                    <Math>{`U = (\\bar{X}-m)/(\\sigma/\\sqrt{n})`}</Math>. La technique de{' '}
                    <strong>Studentisation</strong> remplace <Math>\sigma</Math> par son estimateur empirique.
                  </p>
                  <ThmBox title="Studentisation — Loi de Student (Théorème de Fisher-Student)">
                    <FormulaBox>
                      {`T = \\frac{\\bar{X}-m}{S/\\sqrt{n-1}} = \\frac{\\bar{X}-m}{\\hat{S}/\\sqrt{n}} \\;\\sim\\; T(n-1)`}
                    </FormulaBox>
                    <p className="text-base mt-2">
                      La statistique <Math>T</Math> suit une loi de Student à <Math>{`(n-1)`}</Math> degrés de liberté.
                      Le paramètre <Math>\sigma</Math> se simplifie au numérateur et au dénominateur.
                    </p>
                  </ThmBox>
                  <AlertBox title="Subtilité : T = (X̄ − m) / (S/√(n−1))">
                    Attention à ne pas écrire <Math>{`S/\\sqrt{n}`}</Math>. Le dénominateur est{' '}
                    <Math>{`S/\\sqrt{n-1}`}</Math> (ou de façon équivalente <Math>{`\\hat{S}/\\sqrt{n}`}</Math>{' '}
                    car <Math>{`\\hat{S}=S\\sqrt{n/(n-1)}`}</Math>). C'est le diviseur <Math>{`(n-1)`}</Math>{' '}
                    qui apparaît dans la variable de khi-deux <Math>{`K = nS^2/\\sigma^2 \\sim \\chi^2(n-1)`}</Math>.
                  </AlertBox>
                </div>

                {/* Deux échantillons indépendants */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">
                    Deux échantillons indépendants
                  </h3>
                  <p className="text-base leading-relaxed">
                    On dispose de deux populations normales <strong>indépendantes</strong> :{' '}
                    <Math>{`X_1 \\sim \\mathcal{N}(m_1;\\sigma_1)`}</Math>,{' '}
                    <Math>{`X_2 \\sim \\mathcal{N}(m_2;\\sigma_2)`}</Math>, et de deux échantillons de tailles{' '}
                    <Math>{`n_1`}</Math> et <Math>{`n_2`}</Math>.
                  </p>
                  <ThmBox title="Lois à deux échantillons (σᵢ connus)">
                    <FormulaBox label="Différence de moyennes">
                      {`\\bar{X}_1 - \\bar{X}_2 \\;\\sim\\; \\mathcal{N}\\!\\left(m_1-m_2\\;; \\sqrt{\\frac{\\sigma_1^2}{n_1}+\\frac{\\sigma_2^2}{n_2}}\\right)`}
                    </FormulaBox>
                    <FormulaBox label="Différence de proportions">
                      {`F_1 - F_2 \\;\\sim\\; \\mathcal{N}\\!\\left(p_1-p_2\\;;\\sqrt{\\frac{p_1q_1}{n_1}+\\frac{p_2q_2}{n_2}}\\right)`}
                    </FormulaBox>
                    <FormulaBox label="Rapport de variances">
                      {`\\frac{\\hat{S}_1^2/\\hat{S}_2^2}{\\sigma_1^2/\\sigma_2^2} \\;\\sim\\; F(n_1-1\\,;\\,n_2-1)`}
                    </FormulaBox>
                  </ThmBox>
                  <ThmBox title="Différence de deux moyennes (σ inconnu, σ₁ = σ₂)">
                    <p className="mb-2">Sous l'hypothèse <Math>{`\\sigma_1=\\sigma_2=\\sigma`}</Math> (inconnu) :</p>
                    <FormulaBox>
                      {`T = \\frac{(\\bar{X}_1-\\bar{X}_2)-(m_1-m_2)}{\\sqrt{\\dfrac{1}{n_1}+\\dfrac{1}{n_2}}\\cdot\\sqrt{\\dfrac{n_1S_1^2+n_2S_2^2}{n_1+n_2-2}}} \\;\\sim\\; T(n_1+n_2-2)`}
                    </FormulaBox>
                  </ThmBox>
                  <AlertBox title="Hypothèse σ₁ = σ₂ : condition nécessaire">
                    L'égalité des écarts-types est une condition <strong>nécessaire</strong> à l'application
                    de la loi de Student dans le cas à deux échantillons. Sans elle, on ne peut pas
                    construire la statistique de khi-deux commune <Math>K</Math>.
                  </AlertBox>
                </div>

                {/* Tableau de synthèse */}
                <DefBox title="Tableau de synthèse — Quelle loi utiliser ?">
                  <Table headers={['Situation', 'Statistique pivot', 'Loi']}>
                    <TableRow>
                      <TableCell>1 éch. — σ connu</TableCell>
                      <TableCell><Math>{`U = (\\bar{X}-m)/(\\sigma/\\sqrt{n})`}</Math></TableCell>
                      <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 éch. — σ inconnu</TableCell>
                      <TableCell><Math>{`T = (\\bar{X}-m)/(S/\\sqrt{n-1})`}</Math></TableCell>
                      <TableCell><Math>{`T(n-1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 éch. — proportion</TableCell>
                      <TableCell><Math>{`U = (F-p)/\\sqrt{pq/n}`}</Math></TableCell>
                      <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 éch. — variance</TableCell>
                      <TableCell><Math>{`K = nS^2/\\sigma^2`}</Math></TableCell>
                      <TableCell><Math>{`\\chi^2(n-1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 éch. — σᵢ connus</TableCell>
                      <TableCell><Math>{`U = \\frac{(\\bar{X}_1-\\bar{X}_2)-(m_1-m_2)}{\\sqrt{\\sigma_1^2/n_1+\\sigma_2^2/n_2}}`}</Math></TableCell>
                      <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 éch. — σ₁=σ₂ inconnus</TableCell>
                      <TableCell><Math>{`T`}</Math> (formule pooled)</TableCell>
                      <TableCell><Math>{`T(n_1+n_2-2)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 éch. — proportions</TableCell>
                      <TableCell><Math>{`U = \\frac{(F_1-F_2)-(p_1-p_2)}{\\sqrt{p_1q_1/n_1+p_2q_2/n_2}}`}</Math></TableCell>
                      <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 éch. — variances</TableCell>
                      <TableCell><Math>{`\\hat{S}_1^2\\sigma_2^2/(\\hat{S}_2^2\\sigma_1^2)`}</Math></TableCell>
                      <TableCell><Math>{`F(n_1-1;n_2-1)`}</Math></TableCell>
                    </TableRow>
                  </Table>
                </DefBox>
                <MethBox title="Convergence Student → Normale">
                  Lorsque le degré de liberté dépasse 30, la loi de Student converge vers la loi normale
                  centrée réduite : <Math>{`T(\\nu) \\approx \\mathcal{N}(0;1)`}</Math>. On remplace
                  alors <Math>{`F_T`}</Math> par <Math>{`F_U`}</Math> dans les calculs de probabilité.
                </MethBox>
              </section>

              {/* ── Section II — Exercices ────────────────────────────── */}
              <section id="exercices" data-section-title="V. Exercice type · VI. Exercices corrigés" className="space-y-8">
                <StatsSectionHeader title="V. Exercice type · VI. Exercices corrigés" />
                <div className="space-y-6">

                  {/* Ex 1 */}
                  <Exercise
                    id="ch8-ex1"
                    title="Loi de la moyenne — σ connu puis inconnu (Arène de Montpellier)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Une étude statistique à l'Arène de Montpellier montre que l'affluence des spectateurs
                          est une VA <Math>X</Math> suivant une loi normale d'espérance <Math>m = 13\,500</Math>.
                        </p>
                        <ol className="list-[lower-alpha] list-inside space-y-2">
                          <li>
                            Si l'on choisit aléatoirement un échantillon de 50 spectacles, quelle est la
                            probabilité que l'affluence moyenne soit strictement supérieure à 13 500 spectateurs,
                            sachant que <Math>{`\\sigma = 1\\,000`}</Math> ?
                          </li>
                          <li>
                            Déterminer cette même probabilité si <Math>\sigma</Math> est inconnu mais l'écart-type
                            empirique est <Math>{`s = 990`}</Math>.
                          </li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>Identification :</strong> <Math>{`X \\sim \\mathcal{N}(13\\,500\\,;\\,1\\,000)`}</Math>, échantillon i.i.d. de taille <Math>{`n=50`}</Math>.</p>
                        <p><strong>a) σ = 1 000 connu.</strong></p>
                        <p>Loi de la moyenne :</p>
                        <FormulaBox>{`\\bar{X} \\sim \\mathcal{N}\\!\\left(13\\,500\\,;\\,\\frac{1\\,000}{\\sqrt{50}}\\right)`}</FormulaBox>
                        <p>Centrage-réduction et calcul :</p>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X} > 13\\,500) = \\mathbb{P}\\!\\left(U > \\frac{13\\,500-13\\,500}{1\\,000/\\sqrt{50}}\\right) = \\mathbb{P}(U>0) = \\mathbf{0{,}5}`}</FormulaBox>
                        <p className="text-base italic">
                          Résultat attendu : la loi normale est symétrique autour de son espérance.
                        </p>
                        <p><strong>b) σ inconnu, s = 990.</strong></p>
                        <p>Studentisation avec <Math>{`T \\sim T(n-1) = T(49)`}</Math> :</p>
                        <FormulaBox>{`T = \\frac{\\bar{X}-m}{S/\\sqrt{n-1}} = \\frac{\\bar{X}-13\\,500}{990/\\sqrt{49}} \\qquad \\text{Dénominateur} = \\frac{990}{7} = 141{,}43`}</FormulaBox>
                        <p><Math>{`\\mathbb{P}(\\bar{X}>13\\,500) = \\mathbb{P}(T>0) = 0{,}5`}</Math> par symétrie de la loi de Student.</p>
                        <MethBox title="Convergence">
                          <Math>{`n-1=49>30`}</Math> donc <Math>{`T(49)\\approx\\mathcal{N}(0;1)`}</Math> et <Math>{`\\mathbb{P}(T>0) = \\mathbf{0{,}5}`}</Math>.
                        </MethBox>
                      </div>
                    }
                  />

                  {/* Ex 2 */}
                  <Exercise
                    id="ch8-ex2"
                    title="Loi de la moyenne — σ inconnu (CROUS)"
                    content={
                      <p>
                        Le CROUS estime que l'affluence hebdomadaire des étudiants au restaurant
                        universitaire est une VA <Math>{`X \\sim \\mathcal{N}(2\\,000\\,;\\,\\sigma)`}</Math>.
                        Un échantillon de 52 semaines est choisi ; l'écart-type empirique est <Math>{`s=500`}</Math>.
                        Calculer <Math>{`\\mathbb{P}(\\bar{X} > 2\\,050)`}</Math>.
                      </p>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{`n=52`}</Math>, <Math>\sigma</Math> inconnu, <Math>{`s=500`}</Math>. Studentisation avec <Math>{`T \\sim T(51)`}</Math> :</p>
                        <FormulaBox>{`T = \\frac{\\bar{X}-2\\,000}{500/\\sqrt{51}} \\sim T(51)`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X}>2\\,050) = \\mathbb{P}\\!\\left(T > \\frac{50\\sqrt{51}}{500}\\right) = \\mathbb{P}(T > 0{,}71)`}</FormulaBox>
                        <MethBox title="Convergence">
                          <Math>{`\\nu = 51 > 30`}</Math> : <Math>{`T(51) \\approx \\mathcal{N}(0;1)`}</Math>.
                          <br />
                          <Math>{`\\mathbb{P}(T>0{,}71) = 1-F_U(0{,}71) = 1-0{,}76115 = \\mathbf{0{,}23885}`}</Math>
                        </MethBox>
                        <p>Il y a environ 23,9 % de chances d'observer une affluence hebdomadaire moyenne supérieure à 2 050 étudiants.</p>
                      </div>
                    }
                  />

                  {/* Ex 3 */}
                  <Exercise
                    id="ch8-ex3"
                    title="Différence de VA normales et de proportions (Aspirateurs)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Une firme sous-traite sa production d'aspirateurs à deux fabricants. Le taux de
                          défectuosité est de 6 % chez A et de 5 % chez B. On prélève 500 aspirateurs chez chacun.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Quelles sont les lois de probabilité des nombres d'aspirateurs défectueux <Math>{`X_A`}</Math> et <Math>{`X_B`}</Math> ?</li>
                          <li>Probabilité que A produise au moins 1 aspirateur défectueux de plus que B.</li>
                          <li>Probabilité que le <strong>taux</strong> de défectuosité de A soit supérieur de plus de 2 % strictement à celui de B.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) Lois de X_A et X_B.</strong></p>
                        <p><Math>{`X_A \\sim \\mathcal{B}(500\\,;\\,0{,}06)`}</Math>, <Math>{`X_B \\sim \\mathcal{B}(500\\,;\\,0{,}05)`}</Math>.</p>
                        <p>Convergence (<Math>{`n=500>50`}</Math>, <Math>{`np_A=30>18`}</Math>, <Math>{`np_B=25>18`}</Math>) :</p>
                        <FormulaBox>{`X_A \\approx \\mathcal{N}(30\\,;\\,5{,}31) \\qquad X_B \\approx \\mathcal{N}(25\\,;\\,4{,}87)`}</FormulaBox>
                        <p><strong>2) P(X_A − X_B ≥ 1).</strong></p>
                        <p>Espérance : <Math>{`\\mathbb{E}[X_A-X_B]=5`}</Math>. Variance : <Math>{`\\mathrm{Var}(X_A-X_B)=5{,}31^2+4{,}87^2=51{,}92`}</Math>.</p>
                        <FormulaBox>{`\\mathbb{P}(X_A-X_B \\geq 1) = \\mathbb{P}\\!\\left(U \\geq \\frac{1-5}{7{,}21}\\right) = \\mathbb{P}(U\\geq-0{,}55) = F_U(0{,}55) = \\mathbf{0{,}7088}`}</FormulaBox>
                        <p><strong>3) P(F_A − F_B {'>'} 0,02).</strong></p>
                        <p>Lois des proportions empiriques :</p>
                        <FormulaBox>{`F_A \\sim \\mathcal{N}(0{,}06\\,;\\,0{,}0106) \\qquad F_B \\sim \\mathcal{N}(0{,}05\\,;\\,0{,}00975)`}</FormulaBox>
                        <p><Math>{`F_A-F_B \\sim \\mathcal{N}(0{,}01\\,;\\,0{,}0144)`}</Math> (indépendance des échantillons).</p>
                        <FormulaBox>{`\\mathbb{P}(F_A-F_B>0{,}02) = \\mathbb{P}\\!\\left(U>\\frac{0{,}02-0{,}01}{0{,}0144}\\right) = \\mathbb{P}(U>0{,}69) = 1-0{,}7549 = \\mathbf{0{,}2451}`}</FormulaBox>
                      </div>
                    }
                  />

                  {/* Ex 4 */}
                  <Exercise
                    id="ch8-ex4"
                    title="Différence de deux moyennes — σᵢ connus puis inconnus (Revenus)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Les habitants de la région A ont un revenu moyen de 2 500 € et un écart-type de
                          1 100 €. La région B enregistre un revenu moyen de 3 200 € et un écart-type de
                          1 000 €. Des échantillons de taille <Math>{`n_A=n_B=62`}</Math> sont prélevés.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Probabilité que le revenu moyen de l'échantillon B excède celui de A d'au moins 900 €.</li>
                          <li>Même question si les écarts-types sont inconnus et les écarts-types empiriques valent <Math>{`s_A=s_B=1\\,000`}</Math>.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) σᵢ connus.</strong></p>
                        <p>Loi de <Math>{`\\bar{X}_B - \\bar{X}_A`}</Math> :</p>
                        <FormulaBox>{`\\mathbb{E}[\\bar{X}_B-\\bar{X}_A] = 700 \\qquad \\sigma_{\\bar{X}_B-\\bar{X}_A} = \\sqrt{\\frac{1\\,000^2+1\\,100^2}{62}} = 188{,}8`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X}_B-\\bar{X}_A>900) = \\mathbb{P}\\!\\left(U > \\frac{900-700}{188{,}8}\\right) = \\mathbb{P}(U>1{,}06) = \\mathbf{0{,}1446}`}</FormulaBox>
                        <p><strong>2) σ₁=σ₂ inconnus, s_A=s_B=1 000.</strong></p>
                        <p>Studentisation à deux échantillons : <Math>{`T \\sim T(n_A+n_B-2)=T(122)`}</Math></p>
                        <p>Calcul du dénominateur :</p>
                        <FormulaBox>{`\\sqrt{\\frac{1}{62}+\\frac{1}{62}} = 0{,}1796 \\qquad \\sqrt{\\frac{62\\times10^6+62\\times10^6}{122}} = 1\\,008{,}2`}</FormulaBox>
                        <FormulaBox>{`\\text{Dénominateur} = 0{,}1796 \\times 1\\,008{,}2 \\approx 181{,}07`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X}_B-\\bar{X}_A>900) = \\mathbb{P}\\!\\left(T > \\frac{900-700}{181{,}07}\\right) = \\mathbb{P}(T>1{,}10)`}</FormulaBox>
                        <MethBox title="Convergence">
                          <Math>{`\\nu = 122 > 30`}</Math> : <Math>{`T(122)\\approx\\mathcal{N}(0;1)`}</Math>.
                          <br />
                          <Math>{`\\mathbb{P}(T>1{,}10) = 1-0{,}86433 = \\mathbf{0{,}1357}`}</Math>
                        </MethBox>
                      </div>
                    }
                  />

                  {/* Ex 5 */}
                  <Exercise
                    id="ch8-ex5"
                    title="Loi d'une proportion et différence de deux proportions (Voitures)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Deux usines A et B fabriquent des voitures de même marque. L'usine A produit
                          4 % de voitures défectueuses ; un concessionnaire reçoit 600 voitures de A.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Probabilité de moins de 1 % de voitures défectueuses.</li>
                          <li>Probabilité de plus de 5 % de voitures défectueuses.</li>
                          <li>Le concessionnaire commande en plus 500 voitures à l'usine B (taux : 11 %).
                            Probabilité que le taux de défectueux de B soit strictement supérieur à celui de A de 10 points.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><Math>{`X_A \\sim \\mathcal{B}(600\\,;\\,0{,}04)`}</Math>, <Math>{`X_B \\sim \\mathcal{B}(500\\,;\\,0{,}11)`}</Math>.</p>
                        <p>Lois des proportions empiriques (<Math>{`np_A=24>18`}</Math>, <Math>{`np_B=55>18`}</Math>) :</p>
                        <FormulaBox>{`F_A \\sim \\mathcal{N}(0{,}04\\,;\\,0{,}008) \\qquad F_B \\sim \\mathcal{N}(0{,}11\\,;\\,0{,}014)`}</FormulaBox>
                        <p><strong>1)</strong> <Math>{`\\mathbb{P}(F_A < 0{,}01) = \\mathbb{P}\\!\\left(U < \\frac{0{,}01-0{,}04}{0{,}008}\\right) = \\mathbb{P}(U<-3{,}75) \\approx \\mathbf{0}`}</Math></p>
                        <p><strong>2)</strong> <Math>{`\\mathbb{P}(F_A > 0{,}05) = \\mathbb{P}(U>1{,}25) = 1-0{,}8944 = \\mathbf{0{,}1057}`}</Math></p>
                        <p><strong>3) P(F_B − F_A {'>'} 0,10).</strong></p>
                        <p><Math>{`\\mathbb{E}[F_B-F_A]=0{,}07`}</Math> ; <Math>{`\\mathrm{Var}(F_B-F_A) = 6{,}4\\times10^{-5}+1{,}958\\times10^{-4}=2{,}598\\times10^{-4}`}</Math>.</p>
                        <FormulaBox>{`F_B-F_A \\sim \\mathcal{N}(0{,}07\\,;\\,0{,}01612)`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(F_B-F_A>0{,}10) = \\mathbb{P}\\!\\left(U>\\frac{0{,}10-0{,}07}{0{,}01612}\\right) = \\mathbb{P}(U>1{,}861) = \\mathbf{0{,}0331}`}</FormulaBox>
                      </div>
                    }
                  />

                  {/* Ex 6 */}
                  <Exercise
                    id="ch8-ex6"
                    title="Différence de deux moyennes — σᵢ connus puis inconnus (Ampoules)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Un fabricant A annonce une durée de vie moyenne de 2 300 h avec <Math>{`\\sigma_A=40`}</Math> h ;
                          un fabricant B annonce 2 310 h avec <Math>{`\\sigma_B=50`}</Math> h. Des échantillons
                          de <Math>{`n=200`}</Math> ampoules sont prélevés chez chacun.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Probabilité que la durée de vie moyenne des ampoules de A soit supérieure à celle de B (<Math>{`\\sigma_i`}</Math> connus).</li>
                          <li>Même question si <Math>{`\\sigma_i`}</Math> inconnus, avec <Math>{`s_A=30`}</Math> h et <Math>{`s_B=40`}</Math> h.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) σᵢ connus.</strong></p>
                        <FormulaBox>{`\\mathbb{E}[\\bar{X}_A-\\bar{X}_B] = -10 \\qquad \\sigma = \\sqrt{\\frac{40^2+50^2}{200}} = \\sqrt{20{,}5} = 4{,}528`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X}_A\\geq\\bar{X}_B) = \\mathbb{P}\\!\\left(U\\geq\\frac{0-(-10)}{4{,}528}\\right) = \\mathbb{P}(U\\geq 2{,}21) = 1-0{,}9865 = \\mathbf{0{,}0135}`}</FormulaBox>
                        <p><strong>2) σᵢ inconnus, s_A=30, s_B=40. Hypothèse : σ_A=σ_B.</strong></p>
                        <FormulaBox>{`T \\sim T(n_A+n_B-2)=T(398)`}</FormulaBox>
                        <p>Calcul du dénominateur :</p>
                        <FormulaBox>{`\\sqrt{\\frac{1}{200}+\\frac{1}{200}} = 0{,}1 \\qquad \\sqrt{\\frac{200(900+1\\,600)}{398}} = 35{,}44 \\qquad \\text{Dénominateur} = 3{,}544`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{P}(\\bar{X}_A-\\bar{X}_B\\geq0) = \\mathbb{P}\\!\\left(T\\geq\\frac{10}{3{,}544}\\right) = \\mathbb{P}(T\\geq2{,}82)`}</FormulaBox>
                        <MethBox title="Convergence">
                          <Math>{`\\nu=398>30`}</Math> : <Math>{`\\mathbb{P}(T\\geq2{,}82) = 1-F_U(2{,}82) = \\mathbf{0{,}0023}`}</Math>
                        </MethBox>
                      </div>
                    }
                  />

                  {/* Ex 7 */}
                  <Exercise
                    id="ch8-ex7"
                    title="Loi du Khi-deux — variance empirique (Inégalités salariales)"
                    content={
                      <p>
                        Un gouvernement évalue les inégalités de salaires. Il prélève un échantillon de{' '}
                        <Math>{`n=30`}</Math> salariés (variance empirique <Math>{`s^2=1\\,000`}</Math> €² ;
                        variance de la population <Math>{`\\sigma^2=1\\,334{,}81`}</Math> €²).
                        Il interviendra si la probabilité que la variance empirique dépasse 1 000 €² est
                        au moins de 20 %. Le gouvernement interviendra-t-il ?
                      </p>
                    }
                    solution={
                      <div className="space-y-4">
                        <p>On cherche <Math>{`\\mathbb{P}(S^2 \\geq 1\\,000)`}</Math>. D'après le théorème de Fisher :</p>
                        <FormulaBox>{`K = \\frac{nS^2}{\\sigma^2} \\sim \\chi^2(n-1) = \\chi^2(29)`}</FormulaBox>
                        <p>Transformation de la condition :</p>
                        <FormulaBox>{`\\mathbb{P}(S^2\\geq1\\,000) = \\mathbb{P}\\!\\left(K\\geq\\frac{30\\times1\\,000}{1\\,334{,}81}\\right) = \\mathbb{P}(K\\geq22{,}475)`}</FormulaBox>
                        <p>Dans la table du khi-deux (<Math>{`\\nu=29`}</Math>), le fractile 22,475 correspond à une probabilité de queue droite de 0,8 :</p>
                        <FormulaBox>{`\\mathbb{P}(S^2\\geq1\\,000) = \\mathbf{0{,}8}`}</FormulaBox>
                        <AlertBox title="Remarque">
                          Le TCL garantit la normalité de <Math>{`\\bar{X}`}</Math>, mais <strong>pas</strong> celle
                          de <Math>{`S^2`}</Math>. La construction <Math>{`K=nS^2/\\sigma^2\\sim\\chi^2(n-1)`}</Math>{' '}
                          nécessite que les <Math>{`X_i`}</Math> eux-mêmes soient normaux.
                        </AlertBox>
                        <p><strong>Décision :</strong> <Math>{`0{,}8 > 0{,}2`}</Math> (seuil de 20 %) : le gouvernement <strong>interviendra</strong>.</p>
                      </div>
                    }
                  />

                  {/* Ex 8 */}
                  <Exercise
                    id="ch8-ex8"
                    title="Loi du Khi-deux — variance de la population (NASA Météorites)"
                    content={
                      <p>
                        Des chercheurs de la NASA observent <Math>{`n=20`}</Math> météorites et mesurent une variance
                        de <Math>{`s^2=74`}</Math> dam². On suppose que la taille suit une loi normale. Quelle est
                        la probabilité que la variance de la <strong>population</strong> soit inférieure
                        à 107,9 dam² ?
                      </p>
                    }
                    solution={
                      <div className="space-y-4">
                        <p>On cherche <Math>{`\\mathbb{P}(\\sigma^2 \\leq 107{,}9)`}</Math>.</p>
                        <p><strong>Astuce d'inversion.</strong> On utilise <Math>{`K = nS^2/\\sigma^2 \\sim \\chi^2(n-1)`}</Math> et on exprime l'événement <Math>{`\\{\\sigma^2\\leq 107{,}9\\}`}</Math> :</p>
                        <FormulaBox>{`\\sigma^2 \\leq 107{,}9 \\iff \\frac{1}{\\sigma^2} \\geq \\frac{1}{107{,}9} \\iff \\frac{nS^2}{\\sigma^2} \\geq \\frac{nS^2}{107{,}9} \\iff K \\geq \\frac{ns^2}{107{,}9}`}</FormulaBox>
                        <p>On substitue <Math>{`n=20`}</Math> et <Math>{`s^2=74`}</Math> :</p>
                        <FormulaBox>{`\\mathbb{P}(\\sigma^2\\leq107{,}9) = \\mathbb{P}\\!\\left(K \\geq \\frac{20\\times74}{107{,}9}\\right) = \\mathbb{P}(K\\geq13{,}716)`}</FormulaBox>
                        <p><Math>{`K\\sim\\chi^2(19)`}</Math>. Dans la table (<Math>{`\\nu=19`}</Math>), le fractile 13,716 correspond à <Math>{`\\mathbb{P}=0{,}8`}</Math> :</p>
                        <FormulaBox>{`\\mathbb{P}(\\sigma^2\\leq107{,}9) = \\mathbf{0{,}8}`}</FormulaBox>
                        <AlertBox title="Attention : inversion de l'inégalité">
                          L'inégalité <strong>s'inverse</strong> quand on multiplie par <Math>{`1/\\sigma^2`}</Math> :{' '}
                          <Math>{`\\sigma^2 \\leq c \\iff K \\geq ns^2/c`}</Math>. Ne pas confondre avec{' '}
                          <Math>{`\\mathbb{P}(S^2\\geq c) = \\mathbb{P}(K\\geq nc/\\sigma^2)`}</Math>.
                        </AlertBox>
                      </div>
                    }
                  />

                </div>
              </section>

              {/* ── Section III — Méthodes ────────────────────────────── */}
              <section id="methodes" data-section-title="VII. Checklist examen" className="space-y-8">
                <StatsSectionHeader title="VII. Checklist examen" />
                <div className="space-y-6">
                  <MethBox title="Démarche générale pour un exercice de distributions d'échantillonnage">
                    <ol className="list-decimal list-inside space-y-2">
                      <li><strong>Définir la variable aléatoire</strong> sous-jacente à la question.</li>
                      <li><strong>Distinguer</strong> population (paramètres exacts : <Math>m</Math>, <Math>\sigma</Math>, <Math>p</Math>) et échantillon (écart-type empirique <Math>s</Math>, proportion observée <Math>f</Math>).</li>
                      <li><strong>Déterminer la loi</strong> de la statistique d'intérêt :
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li><Math>\sigma</Math> connu ⇒ Normale centrée réduite</li>
                          <li><Math>\sigma</Math> inconnu ⇒ Student <Math>{`T(n-1)`}</Math> (puis convergence si <Math>{`n-1>30`}</Math>)</li>
                          <li>Variance <Math>{`S^2`}</Math> ⇒ Khi-deux <Math>{`\\chi^2(n-1)`}</Math> (normalité requise)</li>
                        </ul>
                      </li>
                      <li><strong>Formaliser</strong> la question en inégalité.</li>
                      <li><strong>Centrer-réduire</strong> pour se ramener à une variable pivot.</li>
                      <li><strong>Lire</strong> la probabilité dans la table appropriée.</li>
                    </ol>
                  </MethBox>
                  <MethBox title="Identifier σ connu vs σ inconnu dans l'énoncé">
                    <ul className="list-disc list-inside space-y-1">
                      <li><Math>\sigma</Math> <strong>connu</strong> : l'énoncé dit « écart-type de la population est σ » ou « écart-type historique ».</li>
                      <li><Math>\sigma</Math> <strong>inconnu</strong> : l'énoncé dit « écart-type <em>empirique</em> » ou « écart-type <em>mesuré sur l'échantillon</em> ».</li>
                      <li>En cas de doute : si la valeur vient d'une enquête ou mesure, c'est l'écart-type empirique.</li>
                    </ul>
                  </MethBox>
                  <MethBox title="Formulaire — Dénominateurs numériques des statistiques de Student">
                    <FormulaBox label="1 échantillon">
                      {`\\frac{S}{\\sqrt{n-1}} = \\frac{\\hat{S}}{\\sqrt{n}} \\qquad [\\hat{S}^2 = nS^2/(n-1)]`}
                    </FormulaBox>
                    <FormulaBox label="2 échantillons quelconques">
                      {`\\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}}\\cdot\\sqrt{\\frac{n_1S_1^2+n_2S_2^2}{n_1+n_2-2}}`}
                    </FormulaBox>
                  </MethBox>
                </div>
              </section>

              {/* ── Section IV — Pièges ───────────────────────────────── */}
              <section id="pieges" data-section-title="IV. Pièges classiques" className="space-y-8">
                <StatsSectionHeader title="IV. Pièges classiques" />
                <div className="space-y-4">
                  <AlertBox title="Piège 1 — Confondre σ (population) et s (échantillon)">
                    Un énoncé peut donner les deux valeurs. La variable de khi-deux utilise <Math>\sigma</Math>{' '}
                    (population) au dénominateur : <Math>{`K = nS^2/\\sigma^2 \\sim \\chi^2(n-1)`}</Math>.
                    Utiliser <Math>{`s^2`}</Math> au dénominateur est une erreur.
                  </AlertBox>
                  <AlertBox title="Piège 2 — Oublier la normalité pour le khi-deux">
                    Le TCL garantit la normalité de <Math>{`\\bar{X}`}</Math> (en grande taille), mais{' '}
                    <strong>pas</strong> la normalité de <Math>{`S^2`}</Math>. La construction{' '}
                    <Math>{`K=nS^2/\\sigma^2\\sim\\chi^2(n-1)`}</Math> nécessite que les <Math>{`X_i`}</Math>{' '}
                    eux-mêmes suivent une loi normale.
                  </AlertBox>
                  <AlertBox title="Piège 3 — Dénominateur de la statistique de Student">
                    <FormulaBox>{`T = \\frac{\\bar{X}-m}{S/\\sqrt{n-1}} \\neq \\frac{\\bar{X}-m}{S/\\sqrt{n}}`}</FormulaBox>
                    Mémoire : la khi-deux a degré <Math>{`n-1`}</Math>, donc le Student aussi, donc le dénominateur contient <Math>{`\\sqrt{n-1}`}</Math>.
                  </AlertBox>
                  <AlertBox title="Piège 4 — Hypothèse σ₁=σ₂ oubliée pour le Student à 2 échantillons">
                    La formule <Math>{`T \\sim T(n_1+n_2-2)`}</Math> n'est valide que si{' '}
                    <Math>{`\\sigma_1=\\sigma_2`}</Math>. Sans cette hypothèse, on ne peut pas fusionner
                    les deux statistiques de khi-deux. En pratique, cette égalité se teste via Fisher.
                  </AlertBox>
                  <AlertBox title="Piège 5 — Inversion de l'événement pour la variance de la population">
                    L'inégalité <strong>s'inverse</strong> quand on multiplie par <Math>{`1/\\sigma^2`}</Math> :{' '}
                    <Math>{`\\sigma^2 \\leq c \\iff K \\geq ns^2/c`}</Math>.
                    Ne pas confondre avec <Math>{`\\mathbb{P}(S^2\\geq c) = \\mathbb{P}(K\\geq nc/\\sigma^2)`}</Math>.
                  </AlertBox>
                  <AlertBox title="Piège 6 — Convergence Student à deux échantillons">
                    Le degré de liberté est <Math>{`\\nu = n_1+n_2-2`}</Math>, pas <Math>{`\\min(n_1,n_2)-1`}</Math>.
                    La convergence vers la normale s'applique quand <Math>{`\\nu>30`}</Math>.
                  </AlertBox>
                  <AlertBox title="Piège 7 — Variance de la différence (rappel)">
                    Pour des échantillons <strong>indépendants</strong> :{' '}
                    <Math>{`\\mathrm{Var}(\\bar{X}_A-\\bar{X}_B) = \\mathrm{Var}(\\bar{X}_A)+\\mathrm{Var}(\\bar{X}_B)`}</Math>.
                    La variance de la différence est la <strong>somme</strong> des variances (jamais la différence).
                  </AlertBox>
                </div>
              </section>

              {/* ── Fiche de synthèse finale ──────────────────────────── */}
              <section id="fiche-finale" data-section-title="Fiche de synthèse" className="space-y-8">
                <StatsSectionHeader title="Fiche de synthèse (statistiques pivot)" />
                <div className="space-y-6">
                  <DefBox title="Arbre de décision — Quelle statistique et quelle loi ?">
                    <Table headers={['Contexte', 'Information', 'Statistique pivot', 'Loi']}>
                      <TableRow>
                        <TableCell>1 éch. (moyenne)</TableCell>
                        <TableCell><Math>\sigma</Math> connu</TableCell>
                        <TableCell><Math>{`U = (\\bar{X}-m)/(\\sigma/\\sqrt{n})`}</Math></TableCell>
                        <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>1 éch. (moyenne)</TableCell>
                        <TableCell><Math>\sigma</Math> inconnu</TableCell>
                        <TableCell><Math>{`T = (\\bar{X}-m)/(S/\\sqrt{n-1})`}</Math></TableCell>
                        <TableCell><Math>{`T(n-1)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>1 éch. (proportion)</TableCell>
                        <TableCell><Math>{`n>50,\\,np>18`}</Math></TableCell>
                        <TableCell><Math>{`U = (F-p)/\\sqrt{pq/n}`}</Math></TableCell>
                        <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>1 éch. (variance)</TableCell>
                        <TableCell><Math>{`X_i`}</Math> normaux</TableCell>
                        <TableCell><Math>{`K = nS^2/\\sigma^2`}</Math></TableCell>
                        <TableCell><Math>{`\\chi^2(n-1)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2 éch. (moyennes)</TableCell>
                        <TableCell><Math>{`\\sigma_i`}</Math> connus</TableCell>
                        <TableCell><Math>{`U`}</Math> (diff. normales)</TableCell>
                        <TableCell><Math>{`\\mathcal{N}(0;1)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2 éch. (moyennes)</TableCell>
                        <TableCell><Math>{`\\sigma_1=\\sigma_2`}</Math> inconnus</TableCell>
                        <TableCell><Math>T</Math> (pooled)</TableCell>
                        <TableCell><Math>{`T(n_1+n_2-2)`}</Math></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2 éch. (variances)</TableCell>
                        <TableCell><Math>{`X_i`}</Math> normaux</TableCell>
                        <TableCell><Math>{`\\hat{S}_1^2\\sigma_2^2/(\\hat{S}_2^2\\sigma_1^2)`}</Math></TableCell>
                        <TableCell><Math>{`F(n_1-1;n_2-1)`}</Math></TableCell>
                      </TableRow>
                    </Table>
                  </DefBox>
                  <MethBox title="Quantiles de la loi normale (convergence Student → Normale, ν > 30)">
                    <Table headers={['Risque bilatéral P', '10 %', '5 %', '2 %', '1 %']}>
                      <TableRow>
                        <TableCell>Quantile <Math>{`u_{1-P/2}`}</Math></TableCell>
                        <TableCell>1,6449</TableCell>
                        <TableCell>1,96</TableCell>
                        <TableCell>2,3263</TableCell>
                        <TableCell>2,5758</TableCell>
                      </TableRow>
                    </Table>
                  </MethBox>
                </div>
              </section>

              <ChapterNav
                prev={{ path: '/s4/stats/chapitre-7', label: 'Chapitre précédent', title: 'Convergence en loi' }}
                next={{ path: '/s4/stats/chapitre-9', label: 'Chapitre suivant', title: 'Estimation ponctuelle' }}
              />
            </div>
          </div>
        </div>
      </div>
      <TableOfContents />
    </main>
  );
}

