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

export function Chapter9() {
  return (
    <main className="course-page course-page--paper-focus w-full flex justify-center">
      <div className="course-reader-frame w-full">
        <div className="course-reader-body">
          <div className="course-paper">
            <PageHeader
              number="Chapitre 9"
              title="Estimation ponctuelle"
              description="Méthode du maximum de vraisemblance, propriétés des estimateurs (ESB, efficacité, convergence, exhaustivité) et fonction Gamma."
            />

            <div className="course-flow space-y-16">

              {/* ── Introduction ─────────────────────────────────────── */}
              <section id="intro" data-section-title="Introduction" className="space-y-8">
                <StatsSectionHeader title="Introduction" />
                <div className="space-y-6">
                  <p className="text-base leading-relaxed">
                    Au chapitre précédent, nous avons constaté que le calcul de probabilités est dépendant
                    de certains paramètres. Par exemple, pour une loi normale{' '}
                    <Math>{`X\\sim\\mathcal{N}(m;\\sigma)`}</Math>, il est nécessaire de connaître{' '}
                    <Math>m</Math> et <Math>\sigma</Math>. Or en réalité, les populations ont des tailles
                    parfois trop grandes pour permettre un sondage exhaustif. La méthode du{' '}
                    <strong>maximum de vraisemblance</strong> permet de trouver des{' '}
                    <strong>estimateurs</strong> — qui fournissent des{' '}
                    <strong>estimations ponctuelles</strong> et non des intervalles.
                  </p>
                  <DefBox title="Estimation ponctuelle vs. par intervalle">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>Estimation ponctuelle</strong> (ce chapitre) : on assigne{' '}
                        <strong>une valeur unique</strong> au paramètre inconnu <Math>\theta</Math>.
                        L'estimateur est une statistique <Math>{`\\hat\\theta(X_1,\\ldots,X_n)`}</Math>{' '}
                        dont la valeur observée <Math>{`\\hat\\theta(x_1,\\ldots,x_n)`}</Math> est l'estimation.
                      </li>
                      <li>
                        <strong>Estimation par intervalle</strong> (Chapitre 11) : on détermine un intervalle{' '}
                        <Math>{`[a\\,;\\,b]`}</Math> dans lequel le paramètre a une forte probabilité de se trouver.
                      </li>
                    </ul>
                  </DefBox>
                  <p className="text-base leading-relaxed">
                    La méthode est intuitive : on cherche le paramètre <Math>{`\\hat\\theta`}</Math> qui maximise
                    la probabilité d'observer l'échantillon que l'on a effectivement observé. Cette probabilité
                    s'appelle la <strong>vraisemblance</strong>.
                  </p>
                </div>
              </section>

              {/* ── Section I — Fiche de synthèse ────────────────────── */}
              <section id="synthese" data-section-title="I. Propriétés · II. Méthode EMV · III. Information de Fisher" className="space-y-8">
                <StatsSectionHeader title="I. Propriétés · II. Méthode EMV · III. Information de Fisher" />

                {/* Étape 1 */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Étape 1 — La fonction de vraisemblance</h3>
                  <DefBox title="Fonction de vraisemblance L">
                    <p className="mb-3">
                      Soit <Math>\theta</Math> un paramètre inconnu d'une loi de probabilité et{' '}
                      <Math>{`(x_1,\\ldots,x_n)`}</Math> un échantillon empirique observé.
                    </p>
                    <FormulaBox label="Cas continu (f densité)">
                      {`L(x_1,\\ldots,x_n\\,;\\,\\theta) = \\prod_{i=1}^{n} f(x_i\\,;\\,\\theta)`}
                    </FormulaBox>
                    <FormulaBox label="Cas discret (p(·) fonction de probabilité)">
                      {`L(x_1,\\ldots,x_n\\,;\\,\\theta) = \\prod_{i=1}^{n} \\mathbb{P}(X=x_i\\,;\\,\\theta)`}
                    </FormulaBox>
                  </DefBox>
                  <MethBox title="Interprétation">
                    <Math>{`L(x_1,\\ldots,x_n\\,;\\,\\theta)`}</Math> mesure la probabilité d'observer
                    simultanément les valeurs <Math>{`(x_1,\\ldots,x_n)`}</Math> sous l'hypothèse que le
                    paramètre est <Math>\theta</Math>. On cherche le <Math>\theta</Math> qui rend cette
                    probabilité maximale.
                  </MethBox>
                </div>

                {/* Étape 2 */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Étape 2 — La fonction de log-vraisemblance</h3>
                  <DefBox title="Log-vraisemblance ln L">
                    <p className="mb-3">
                      Le produit de l'étape 1 est difficile à maximiser directement. On prend le{' '}
                      <strong>logarithme naturel</strong> (fonction croissante, donc le maximum est préservé) :
                    </p>
                    <FormulaBox label="Cas continu">
                      {`\\ln L(x_1,\\ldots,x_n\\,;\\,\\theta) = \\sum_{i=1}^{n} \\ln f(x_i\\,;\\,\\theta)`}
                    </FormulaBox>
                    <p className="mt-2 text-base">
                      Le produit devient une <strong>somme</strong> : la maximisation est ainsi beaucoup
                      plus maniable.
                    </p>
                  </DefBox>
                </div>

                {/* Étape 3 */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Étape 3 — Maximisation et conditions d'ordre</h3>
                  <ThmBox title="Estimateur du maximum de vraisemblance (EMV)">
                    <p className="mb-3">L'<strong>EMV</strong> <Math>{`\\hat\\theta`}</Math> est la valeur de <Math>\theta</Math> qui maximise <Math>{`\\ln L`}</Math> :</p>
                    <FormulaBox label="Condition du premier ordre (CPO)">
                      {`\\left.\\frac{\\partial}{\\partial\\theta}\\ln L(x_1,\\ldots,x_n\\,;\\,\\theta)\\right|_{\\theta=\\hat\\theta} = 0`}
                    </FormulaBox>
                    <FormulaBox label="Condition du second ordre (CSO)">
                      {`\\left.\\frac{\\partial^2}{\\partial\\theta^2}\\ln L(x_1,\\ldots,x_n\\,;\\,\\theta)\\right|_{\\theta=\\hat\\theta} \\leq 0`}
                    </FormulaBox>
                    <p className="text-base mt-2">
                      La CSO garantit que l'on est bien en présence d'un <strong>maximum</strong> (et non
                      d'un minimum ou d'un point d'inflexion). Pour plusieurs paramètres <Math>{`(\\theta_1,\\theta_2)`}</Math>,
                      on écrit un système de deux équations et on résout simultanément.
                    </p>
                  </ThmBox>
                  <AlertBox title="Échantillon empirique vs. théorique">
                    <ul className="list-disc list-inside space-y-1">
                      <li>L'EMV <Math>{`\\hat\\theta(x_1,\\ldots,x_n)`}</Math> est calculé sur l'<strong>échantillon empirique</strong> (lettres minuscules).</li>
                      <li>Les <strong>propriétés</strong> sont ensuite vérifiées sur l'<strong>échantillon théorique</strong> <Math>{`(X_1,\\ldots,X_n)`}</Math> (lettres majuscules).</li>
                    </ul>
                  </AlertBox>
                </div>

                {/* Propriétés */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Propriétés désirables d'un estimateur</h3>
                  <DefBox title="Les quatre propriétés fondamentales">
                    <p className="mb-3">Soit <Math>{`\\hat\\theta = \\hat\\theta(X_1,\\ldots,X_n)`}</Math> un estimateur de <Math>\theta</Math>.</p>
                    <div className="space-y-4">
                      <div>
                        <p><strong>(a) Sans biais (ESB) :</strong> <Math>{`\\mathbb{E}[\\hat\\theta] = \\theta`}</Math>.</p>
                      </div>
                      <div>
                        <p><strong>(b) Efficace :</strong> <Math>{`\\hat\\theta`}</Math> est sans biais et sa variance est minimale, égale à la borne inférieure de l'inégalité de Fréchet–Rao–Cramér–Darmois (FRCD) :</p>
                        <FormulaBox>{`\\mathrm{Var}(\\hat\\theta) = \\frac{1}{I(\\theta)} \\qquad I(\\theta) = -\\mathbb{E}\\!\\left[\\frac{\\partial^2\\ln L(\\cdot)}{\\partial\\theta^2}\\right]`}</FormulaBox>
                        <p className="text-base"><Math>{`I(\\theta)`}</Math> est appelée <strong>information de Fisher</strong>.</p>
                      </div>
                      <div>
                        <p><strong>(c) Convergent :</strong></p>
                        <FormulaBox>{`\\lim_{n\\to\\infty}\\mathbb{P}(|\\hat\\theta-\\theta|>\\varepsilon) = 0 \\quad \\forall\\,\\varepsilon>0`}</FormulaBox>
                        <p className="text-base">Pour un ESB, il suffit de montrer <Math>{`\\lim_{n\\to\\infty}\\mathrm{Var}(\\hat\\theta) = 0`}</Math> (convergence <em>absolue</em>).</p>
                      </div>
                      <div>
                        <p><strong>(d) Exhaustif :</strong> <Math>{`\\hat\\theta`}</Math> appartient à la famille des estimateurs exhaustifs, définie par décomposition exponentielle de la densité :</p>
                        <FormulaBox>{`\\exp(\\ln f(x\\,;\\,\\theta)) = \\exp\\!\\bigl(\\alpha(x)\\,A(\\theta)+\\beta(x)+B(\\theta)\\bigr)`}</FormulaBox>
                        <p>La famille des estimateurs exhaustifs est alors : <Math>{`\\theta^* = c\\cdot\\frac{1}{n}\\sum_{i=1}^n \\alpha(X_i)`}</Math></p>
                      </div>
                    </div>
                  </DefBox>
                  <MethBox title="Stratégie pour vérifier les propriétés">
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Calculer <Math>{`\\mathbb{E}[\\hat\\theta]`}</Math>. Si <Math>{`\\mathbb{E}[\\hat\\theta]=\\theta`}</Math> : sans biais.</li>
                      <li>Calculer <Math>{`\\mathrm{Var}(\\hat\\theta)`}</Math> par linéarité (sous i.i.d.). Tendre vers 0 : convergence.</li>
                      <li>Calculer <Math>{`I(\\theta) = -\\mathbb{E}[\\partial^2\\ln L/\\partial\\theta^2]`}</Math>. Si <Math>{`\\mathrm{Var}(\\hat\\theta)=1/I(\\theta)`}</Math> : efficace.</li>
                      <li>Identifier <Math>{`\\alpha(x)`}</Math> dans la décomposition exponentielle de <Math>{`\\ln f`}</Math>. Si <Math>{`\\hat\\theta \\propto \\sum\\alpha(X_i)`}</Math> : exhaustif.</li>
                    </ol>
                  </MethBox>
                </div>

                {/* Rappel Gamma */}
                <DefBox title="Rappel — Fonction Gamma">
                  <FormulaBox>{`\\Gamma(n) = (n-1)! \\qquad \\text{pour }n\\in\\mathbb{N}^*`}</FormulaBox>
                  <p className="mb-2">En particulier : <Math>{`\\Gamma(1)=1`}</Math>, <Math>{`\\Gamma(2)=1`}</Math>, <Math>{`\\Gamma(3)=2`}</Math>.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Changement de variable <Math>{`u=x/\\theta`}</Math> :{' '}
                      <Math>{`\\int_0^\\infty x^k \\frac{1}{\\theta}e^{-x/\\theta}\\,dx = \\theta^k\\Gamma(k+1)`}</Math>
                    </li>
                    <li>
                      Changement de variable <Math>{`u=x^2/\\theta`}</Math> :{' '}
                      <Math>{`\\int_0^\\infty x^{2k}\\frac{2}{\\theta}xe^{-x^2/\\theta}\\,dx = \\theta^k\\Gamma(k+1)`}</Math>
                    </li>
                  </ul>
                </DefBox>
              </section>

              {/* ── Section II — Exercices ────────────────────────────── */}
              <section id="exercices" data-section-title="IV. Exercices corrigés" className="space-y-8">
                <StatsSectionHeader title="IV. Exercices corrigés" />
                <div className="space-y-6">

                  {/* Ex 1 */}
                  <Exercise
                    id="ch9-ex1"
                    title="Maximum de vraisemblance pour une loi binomiale"
                    content={
                      <div className="space-y-3">
                        <p>
                          On étudie des entreprises françaises de 10 salariés. La variable <Math>{`X_i`}</Math>{' '}
                          vaut 1 si le <Math>i</Math>-ème salarié gagne plus de 3 000 € nets/mois et 0 sinon.
                          On pose <Math>{`K=\\sum_{i=1}^{10}X_i`}</Math>. On observe <Math>m</Math> entreprises
                          et un échantillon empirique <Math>{`(k_1,\\ldots,k_m)`}</Math>.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Quelle est la loi de <Math>{`X_i`}</Math> ? Quelle est celle de <Math>K</Math> ?</li>
                          <li>Déterminer l'EMV de <Math>p</Math>.</li>
                          <li>Démontrer les propriétés de cet estimateur.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) Lois de X_i et K.</strong></p>
                        <p><Math>{`X_i \\sim \\mathcal{B}(1\\,;\\,p)`}</Math>. K = somme de 10 Bernoulli i.i.d. :</p>
                        <FormulaBox>{`K \\sim \\mathcal{B}(10\\,;\\,p) \\qquad \\mathbb{P}(K=k)=\\binom{10}{k}p^k(1-p)^{10-k}`}</FormulaBox>
                        <p><Math>{`\\mathbb{E}(K_i)=10p`}</Math> et <Math>{`\\mathrm{Var}(K_i)=10p(1-p)`}</Math>.</p>
                        <p><strong>2) EMV de p.</strong></p>
                        <p>Log-vraisemblance :</p>
                        <FormulaBox>{`\\ln L(\\cdot) = \\sum_{i=1}^m\\left[\\ln\\binom{10}{k_i} + k_i\\ln p + (10-k_i)\\ln(1-p)\\right]`}</FormulaBox>
                        <p>CPO :</p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial p} = \\sum_{i=1}^m\\left(\\frac{k_i}{p}-\\frac{10-k_i}{1-p}\\right) = 0 \\quad\\Longrightarrow\\quad \\sum k_i = 10mp`}</FormulaBox>
                        <FormulaBox>{`\\boxed{\\hat p = \\frac{1}{10m}\\sum_{i=1}^m k_i = \\frac{\\bar k}{10}}`}</FormulaBox>
                        <p>Sur l'échantillon théorique : <Math>{`\\hat p(K_1,\\ldots,K_m) = \\bar K/10`}</Math>. CSO : <Math>{`\\partial^2\\ln L/\\partial p^2 \\leq 0`}</Math> ✓</p>
                        <p><strong>3) Propriétés de p̂.</strong></p>
                        <p><strong>(a) Sans biais :</strong></p>
                        <FormulaBox>{`\\mathbb{E}[\\hat p] = \\frac{1}{10m}\\cdot m\\cdot 10p = p \\quad\\checkmark`}</FormulaBox>
                        <p><strong>(b) Convergence :</strong></p>
                        <FormulaBox>{`\\mathrm{Var}(\\hat p) = \\frac{p(1-p)}{10m} \\xrightarrow[m\\to\\infty]{} 0 \\quad\\checkmark`}</FormulaBox>
                        <p><strong>(c) Efficacité — Information de Fisher :</strong></p>
                        <FormulaBox>{`I(p) = -\\mathbb{E}\\!\\left[\\frac{\\partial^2\\ln L}{\\partial p^2}\\right] = \\frac{10m}{p(1-p)} \\quad\\Rightarrow\\quad \\frac{1}{I(p)} = \\frac{p(1-p)}{10m} = \\mathrm{Var}(\\hat p) \\quad\\checkmark`}</FormulaBox>
                        <p><strong>(d) Exhaustivité :</strong> On identifie <Math>{`\\alpha(k)=k`}</Math> dans la décomposition exponentielle. La famille des estimateurs exhaustifs est <Math>{`p^* = c\\bar K`}</Math>. Pour <Math>{`c=1/10`}</Math> : <Math>{`\\hat p = \\bar K/10`}</Math> ✓</p>
                        <MethBox title="Conclusion">
                          <Math>{`\\hat p = \\bar K/10`}</Math> est <strong>ESB</strong>, <strong>convergent</strong>,{' '}
                          <strong>efficace</strong> et <strong>exhaustif</strong>.
                        </MethBox>
                      </div>
                    }
                  />

                  {/* Ex 2 */}
                  <Exercise
                    id="ch9-ex2"
                    title="Maximum de vraisemblance pour une densité quelconque"
                    content={
                      <div className="space-y-3">
                        <p>
                          Soit <Math>{`(x_1,\\ldots,x_n)`}</Math> un échantillon d'une variable <Math>X</Math>{' '}
                          de densité :
                        </p>
                        <FormulaBox>{`f(x\\,;\\,\\theta) = \\frac{1}{\\theta}(1-x)^{1/\\theta - 1} \\qquad x\\in(0,1),\\;\\theta>0`}</FormulaBox>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>En détaillant votre démarche, déterminez l'EMV de <Math>\theta</Math>.</li>
                          <li>Démontrez les propriétés via le changement de variable <Math>{`K_i=-\\ln(1-X_i)`}</Math>, en supposant <Math>{`\\mathbb{E}(K_i)=\\theta`}</Math> et <Math>{`\\mathrm{Var}(K_i)=\\theta^2`}</Math>.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) EMV de θ.</strong></p>
                        <p>Posons <Math>{`S=\\sum_{i=1}^n\\ln(1-x_i)`}</Math>. Log-vraisemblance :</p>
                        <FormulaBox>{`\\ln L(\\cdot) = -n\\ln\\theta + \\left(\\frac{1}{\\theta}-1\\right)S`}</FormulaBox>
                        <p>CPO :</p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial\\theta} = -\\frac{n}{\\theta} - \\frac{S}{\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\hat\\theta = -\\frac{S}{n}`}</FormulaBox>
                        <FormulaBox>{`\\boxed{\\hat\\theta = -\\frac{1}{n}\\sum_{i=1}^n\\ln(1-x_i)}`}</FormulaBox>
                        <p><strong>2) Propriétés via K_i = −ln(1 − X_i).</strong></p>
                        <p>On réécrit : <Math>{`\\hat\\theta = \\frac{1}{n}\\sum K_i = \\bar K`}</Math>.</p>
                        <p><strong>(a) Sans biais :</strong> <Math>{`\\mathbb{E}[\\hat\\theta] = \\mathbb{E}[\\bar K] = \\theta`}</Math> ✓</p>
                        <p><strong>(b) Convergence :</strong> <Math>{`\\mathrm{Var}(\\hat\\theta) = \\theta^2/n \\to 0`}</Math> ✓</p>
                        <p><strong>(c) Efficacité :</strong> <Math>{`I(\\theta) = n/\\theta^2`}</Math>, donc <Math>{`1/I(\\theta) = \\theta^2/n = \\mathrm{Var}(\\hat\\theta)`}</Math> ✓</p>
                        <p><strong>(d) Exhaustivité :</strong> On identifie <Math>{`\\alpha(x)=\\ln(1-x)=-K`}</Math>. Donc <Math>{`\\hat\\theta = \\bar K`}</Math> est exhaustif ✓</p>
                        <MethBox title="Conclusion"><Math>{`\\hat\\theta = -\\frac{1}{n}\\sum\\ln(1-x_i)`}</Math> est ESB, convergent, efficace et exhaustif.</MethBox>
                      </div>
                    }
                  />

                  {/* Ex 3 */}
                  <Exercise
                    id="ch9-ex3"
                    title="Densité exponentielle avec fonction Gamma"
                    content={
                      <div className="space-y-3">
                        <p>
                          Soit <Math>{`(x_1,\\ldots,x_n)`}</Math> un échantillon d'une variable <Math>X</Math>{' '}
                          de densité exponentielle :
                        </p>
                        <FormulaBox>{`f(x\\,;\\,\\theta) = \\frac{1}{\\theta}e^{-x/\\theta} \\qquad x>0,\\;\\theta>0`}</FormulaBox>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Déterminez l'EMV de <Math>\theta</Math>.</li>
                          <li>Démontrez les propriétés de l'estimateur.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) EMV de θ.</strong></p>
                        <p>Log-vraisemblance :</p>
                        <FormulaBox>{`\\ln L(\\cdot) = -n\\ln\\theta - \\frac{n\\bar x}{\\theta}`}</FormulaBox>
                        <p>CPO :</p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial\\theta} = -\\frac{n}{\\theta}+\\frac{n\\bar x}{\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\boxed{\\hat\\theta = \\bar x}`}</FormulaBox>
                        <p><strong>2) Propriétés — via la fonction Gamma.</strong></p>
                        <p><strong>(a) Sans biais :</strong> Changement de variable <Math>{`u=x/\\theta`}</Math> :</p>
                        <FormulaBox>{`\\mathbb{E}(X) = \\int_0^\\infty x\\cdot\\frac{1}{\\theta}e^{-x/\\theta}\\,dx = \\theta\\int_0^\\infty u\\,e^{-u}\\,du = \\theta\\,\\Gamma(2) = \\theta`}</FormulaBox>
                        <p>Donc <Math>{`\\mathbb{E}[\\hat\\theta] = \\mathbb{E}[\\bar X] = \\theta`}</Math> ✓</p>
                        <p><strong>(b) Calcul de Var(X) :</strong></p>
                        <FormulaBox>{`\\mathbb{E}(X^2) = \\theta^2\\Gamma(3) = 2\\theta^2 \\quad\\Rightarrow\\quad \\mathrm{Var}(X) = 2\\theta^2-\\theta^2 = \\theta^2`}</FormulaBox>
                        <FormulaBox>{`\\mathrm{Var}(\\hat\\theta) = \\frac{\\theta^2}{n} \\xrightarrow[n\\to\\infty]{} 0 \\quad\\Rightarrow\\quad \\text{convergent} \\checkmark`}</FormulaBox>
                        <p><strong>(c) Efficacité :</strong></p>
                        <FormulaBox>{`I(\\theta) = -\\mathbb{E}\\!\\left[\\frac{\\partial^2\\ln L}{\\partial\\theta^2}\\right] = \\frac{n}{\\theta^2} \\quad\\Rightarrow\\quad \\frac{1}{I(\\theta)} = \\frac{\\theta^2}{n} = \\mathrm{Var}(\\hat\\theta) \\checkmark`}</FormulaBox>
                        <p><strong>(d) Exhaustivité :</strong> <Math>{`\\ln f = -\\ln\\theta - x/\\theta`}</Math>. On identifie <Math>{`\\alpha(x)=x`}</Math>. Donc <Math>{`\\hat\\theta=\\bar X`}</Math> est exhaustif ✓</p>
                        <MethBox title="Conclusion"><Math>{`\\hat\\theta = \\bar X`}</Math> est ESB, convergent, efficace et exhaustif.</MethBox>
                      </div>
                    }
                  />

                  {/* Ex 4 */}
                  <Exercise
                    id="ch9-ex4"
                    title="Densité avec Gamma et changement de variable u = x²/θ"
                    content={
                      <div className="space-y-3">
                        <p>
                          Soit <Math>{`(x_1,\\ldots,x_n)`}</Math> un échantillon d'une variable <Math>X</Math>{' '}
                          de densité :
                        </p>
                        <FormulaBox>{`f(x\\,;\\,\\theta) = \\frac{2}{\\theta}\\,x\\,e^{-x^2/\\theta} \\qquad x>0,\\;\\theta>0`}</FormulaBox>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Déterminez l'EMV de <Math>\theta</Math>.</li>
                          <li>Démontrez les propriétés de l'estimateur.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) EMV de θ.</strong></p>
                        <p>Log-vraisemblance :</p>
                        <FormulaBox>{`\\ln L(\\cdot) = n\\ln 2 - n\\ln\\theta + \\sum\\ln x_i - \\frac{1}{\\theta}\\sum x_i^2`}</FormulaBox>
                        <p>CPO :</p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial\\theta} = -\\frac{n}{\\theta}+\\frac{\\sum x_i^2}{\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\boxed{\\hat\\theta = \\frac{1}{n}\\sum x_i^2 = \\overline{x^2}}`}</FormulaBox>
                        <p><strong>2) Propriétés — via le changement u = x²/θ.</strong></p>
                        <p><strong>(a) Sans biais :</strong></p>
                        <FormulaBox>{`\\mathbb{E}(X^2) = \\int_0^\\infty x^2\\cdot\\frac{2}{\\theta}x\\,e^{-x^2/\\theta}\\,dx = \\theta\\int_0^\\infty u\\,e^{-u}\\,du = \\theta\\,\\Gamma(2) = \\theta`}</FormulaBox>
                        <p>Donc <Math>{`\\mathbb{E}[\\hat\\theta] = \\mathbb{E}[X^2] = \\theta`}</Math> ✓</p>
                        <p><strong>(b) Variance :</strong></p>
                        <FormulaBox>{`\\mathbb{E}(X^4) = \\theta^2\\Gamma(3) = 2\\theta^2 \\quad\\Rightarrow\\quad \\mathrm{Var}(X^2) = 2\\theta^2-\\theta^2 = \\theta^2`}</FormulaBox>
                        <FormulaBox>{`\\mathrm{Var}(\\hat\\theta) = \\frac{\\theta^2}{n} \\to 0 \\quad\\checkmark`}</FormulaBox>
                        <p><strong>(c) Efficacité :</strong> <Math>{`I(\\theta) = n/\\theta^2`}</Math>, <Math>{`1/I(\\theta) = \\theta^2/n = \\mathrm{Var}(\\hat\\theta)`}</Math> ✓</p>
                        <p><strong>(d) Exhaustivité :</strong> <Math>{`\\alpha(x)=x^2`}</Math>, donc <Math>{`\\hat\\theta = \\overline{X^2}`}</Math> est exhaustif ✓</p>
                        <MethBox title="Conclusion"><Math>{`\\hat\\theta = \\overline{X^2}`}</Math> est ESB, convergent, efficace et exhaustif.</MethBox>
                      </div>
                    }
                  />

                  {/* Ex 5 */}
                  <Exercise
                    id="ch9-ex5"
                    title="Maximum de vraisemblance pour la loi de Bernoulli (Grippe)"
                    content={
                      <div className="space-y-3">
                        <p>
                          Un institut de sondage définit <Math>{`X_i=1`}</Math> si le <Math>i</Math>-ème individu
                          est atteint par la grippe en janvier 2005, et <Math>{`X_i=0`}</Math> sinon.
                          On dispose d'un échantillon <Math>{`(x_1,\\ldots,x_n)`}</Math>.
                        </p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Quelle loi proposez-vous pour <Math>{`X_i`}</Math> ? Justifiez.</li>
                          <li>Déterminez l'EMV de <Math>p</Math>.</li>
                          <li>Démontrez les propriétés de cet estimateur.</li>
                        </ol>
                      </div>
                    }
                    solution={
                      <div className="space-y-4">
                        <p><strong>1) Loi de X_i.</strong></p>
                        <p>
                          Deux événements mutuellement exclusifs (malade / sain), une seule épreuve :{' '}
                          <Math>{`X_i \\sim \\mathcal{B}(1\\,;\\,p)`}</Math> avec <Math>{`\\mathbb{P}(X_i=x_i)=p^{x_i}(1-p)^{1-x_i}`}</Math>.
                          <Math>{`\\mathbb{E}(X_i)=p`}</Math>, <Math>{`\\mathrm{Var}(X_i)=p(1-p)`}</Math>.
                        </p>
                        <p><strong>2) EMV de p.</strong></p>
                        <FormulaBox>{`L(\\cdot) = p^{\\sum x_i}(1-p)^{n-\\sum x_i}`}</FormulaBox>
                        <FormulaBox>{`\\ln L(\\cdot) = \\left(\\sum x_i\\right)\\ln p + \\left(n-\\sum x_i\\right)\\ln(1-p)`}</FormulaBox>
                        <p>CPO :</p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial p} = \\frac{\\sum x_i}{p}-\\frac{n-\\sum x_i}{1-p}=0 \\quad\\Longrightarrow\\quad \\boxed{\\hat p = \\bar x}`}</FormulaBox>
                        <p><strong>3) Propriétés sur l'échantillon théorique.</strong></p>
                        <p><strong>(a) Sans biais :</strong> <Math>{`\\mathbb{E}[\\hat p] = \\mathbb{E}[\\bar X] = p`}</Math> ✓</p>
                        <p><strong>(b) Efficacité :</strong></p>
                        <FormulaBox>{`\\mathrm{Var}(\\hat p) = \\frac{p(1-p)}{n} \\qquad I(p) = \\frac{n}{p(1-p)} \\qquad \\frac{1}{I(p)} = \\frac{p(1-p)}{n} = \\mathrm{Var}(\\hat p) \\checkmark`}</FormulaBox>
                        <p><strong>(c) Convergence :</strong> <Math>{`\\mathrm{Var}(\\hat p) \\to 0`}</Math> ✓</p>
                        <AlertBox title="Remarque : cas particulier de l'Exercice 1">
                          L'Exercice 1 portait sur <Math>{`K\\sim\\mathcal{B}(10\\,;\\,p)`}</Math> et donnait
                          <Math>{`\\hat p=\\bar K/10`}</Math>. Ici, <Math>{`X_i\\sim\\mathcal{B}(1\\,;\\,p)`}</Math>
                          donne <Math>{`\\hat p=\\bar X`}</Math>. Les deux sont cohérents.
                        </AlertBox>
                        <MethBox title="Conclusion"><Math>{`\\hat p = \\bar X`}</Math> est ESB, convergent et efficace.</MethBox>
                      </div>
                    }
                  />

                  {/* Ex 6 */}
                  <Exercise
                    id="ch9-ex6"
                    title="Loi normale — deux EMV et biais de S²"
                    content={
                      <p>
                        Soit <Math>X</Math> la variable « taille des individus » avec{' '}
                        <Math>{`X\\sim\\mathcal{N}(m\\,;\\,\\sigma)`}</Math>. Déterminez les EMV de{' '}
                        <Math>m</Math> et de <Math>{`\\sigma^2`}</Math>.
                      </p>
                    }
                    solution={
                      <div className="space-y-4">
                        <AlertBox title="But de cet exercice">
                          Cet exercice illustre deux situations nouvelles : (i) il peut y avoir{' '}
                          <strong>plusieurs EMV</strong>, et (ii) un EMV peut{' '}
                          <strong>ne pas être sans biais</strong>.
                        </AlertBox>
                        <p>Log-vraisemblance :</p>
                        <FormulaBox>{`\\ln L(\\cdot) = -n\\ln\\sigma - \\frac{n}{2}\\ln(2\\pi) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n(x_i-m)^2`}</FormulaBox>
                        <p><strong>CPO par rapport à m :</strong></p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial m} = \\frac{1}{\\sigma^2}\\sum(x_i-m)=0 \\quad\\Longrightarrow\\quad \\boxed{\\hat m = \\bar x}`}</FormulaBox>
                        <p><strong>CPO par rapport à σ² (poser τ=σ²) :</strong></p>
                        <FormulaBox>{`\\frac{\\partial\\ln L}{\\partial\\tau} = -\\frac{n}{2\\tau}+\\frac{\\sum(x_i-m)^2}{2\\tau^2}=0 \\quad\\Longrightarrow\\quad \\boxed{\\widehat{\\sigma^2} = \\frac{1}{n}\\sum(x_i-\\hat m)^2 = s^2}`}</FormulaBox>
                        <p><strong>Propriétés de m̂ = X̄ :</strong> ESB, convergent, efficace, exhaustif (mêmes calculs que les exercices précédents).</p>
                        <p><strong>Biais de Ŝ² = S² :</strong></p>
                        <p>On décompose <Math>{`(X_i-\\bar X)^2`}</Math> en utilisant <Math>{`X_i-m=(X_i-\\bar X)+(\\bar X-m)`}</Math> :</p>
                        <FormulaBox>{`\\sum(X_i-\\bar X)^2 = \\sum(X_i-m)^2 - n(\\bar X-m)^2`}</FormulaBox>
                        <p>En prenant l'espérance :</p>
                        <FormulaBox>{`\\mathbb{E}\\!\\left[\\sum(X_i-\\bar X)^2\\right] = n\\sigma^2 - n\\cdot\\frac{\\sigma^2}{n} = (n-1)\\sigma^2`}</FormulaBox>
                        <FormulaBox>{`\\mathbb{E}[S^2] = \\frac{n-1}{n}\\sigma^2 \\neq \\sigma^2 \\qquad \\text{Biais}(S^2) = -\\frac{\\sigma^2}{n}`}</FormulaBox>
                        <p><strong>Correction du biais :</strong></p>
                        <FormulaBox>{`\\hat S^2 = \\frac{n}{n-1}S^2 = \\frac{1}{n-1}\\sum(X_i-\\bar X)^2 \\quad\\Rightarrow\\quad \\mathbb{E}[\\hat S^2] = \\sigma^2 \\checkmark`}</FormulaBox>
                        <MethBox title="Conclusion">
                          <ul className="list-disc list-inside space-y-1">
                            <li><Math>{`\\hat m = \\bar X`}</Math> : EMV de <Math>m</Math>, ESB, convergent, efficace, exhaustif.</li>
                            <li><Math>{`\\widehat{\\sigma^2} = S^2`}</Math> : EMV de <Math>{`\\sigma^2`}</Math>, mais <strong>biaisé</strong> (<Math>{`\\mathbb{E}[S^2]=\\frac{n-1}{n}\\sigma^2`}</Math>).</li>
                            <li><Math>{`\\hat S^2 = \\frac{1}{n-1}\\sum(X_i-\\bar X)^2`}</Math> : estimateur corrigé, ESB de <Math>{`\\sigma^2`}</Math>.</li>
                          </ul>
                        </MethBox>
                      </div>
                    }
                  />

                </div>
              </section>

              {/* ── Section III — Méthodes & Pièges ──────────────────── */}
              <section id="methodes" data-section-title="Pièges classiques" className="space-y-8">
                <StatsSectionHeader title="Pièges classiques" />
                <div className="space-y-6">
                  <MethBox title="Démarche générale — méthode du maximum de vraisemblance">
                    <ol className="list-decimal list-inside space-y-2">
                      <li><strong>Identifier la loi</strong> de <Math>X</Math> et le(s) paramètre(s) à estimer.</li>
                      <li><strong>Écrire la vraisemblance</strong> <Math>{`L = \\prod f(x_i;\\theta)`}</Math> (continu) ou <Math>{`\\prod \\mathbb{P}(X=x_i;\\theta)`}</Math> (discret).</li>
                      <li><strong>Passer au logarithme</strong> : <Math>{`\\ln L = \\sum\\ln f(x_i;\\theta)`}</Math>.</li>
                      <li><strong>Dériver</strong> par rapport à chaque paramètre et égaliser à zéro (CPO).</li>
                      <li><strong>Vérifier la CSO</strong> (<Math>{`\\partial^2\\ln L/\\partial\\theta^2\\leq 0`}</Math>).</li>
                      <li><strong>Vérifier les propriétés</strong> sur l'échantillon théorique <Math>{`(X_1,\\ldots,X_n)`}</Math>.</li>
                    </ol>
                  </MethBox>
                  <MethBox title="Neutraliser un biais">
                    <p className="mb-2">Si <Math>{`\\mathbb{E}[\\hat\\theta]=k\\theta`}</Math> (avec <Math>{`k\\neq 1`}</Math>), l'estimateur est biaisé. Biais :</p>
                    <FormulaBox>{`\\text{Biais}(\\hat\\theta) = (k-1)\\theta`}</FormulaBox>
                    <p className="mb-2">Pour neutraliser le biais, on construit <Math>{`\\tilde\\theta = \\frac{1}{k}\\hat\\theta`}</Math> :</p>
                    <FormulaBox>{`\\mathbb{E}[\\tilde\\theta] = \\frac{1}{k}\\cdot k\\theta = \\theta \\checkmark`}</FormulaBox>
                    <p className="text-base mt-2">
                      Exemple : <Math>{`S^2`}</Math> est biaisé avec <Math>{`k=(n-1)/n`}</Math>. On pose{' '}
                      <Math>{`\\hat S^2 = \\frac{n}{n-1}S^2 = \\frac{1}{n-1}\\sum(X_i-\\bar X)^2`}</Math>.
                    </p>
                  </MethBox>

                  <AlertBox title="Piège 1 — Confondre échantillon empirique et théorique">
                    <ul className="list-disc list-inside space-y-1">
                      <li>EMV : calculé sur l'échantillon empirique <Math>{`(x_1,\\ldots,x_n)`}</Math> (minuscules).</li>
                      <li>Propriétés : vérifiées sur l'échantillon théorique <Math>{`(X_1,\\ldots,X_n)`}</Math> (majuscules).</li>
                      <li>Ne jamais écrire <Math>{`\\mathbb{E}[\\bar x]`}</Math> (l'espérance d'une constante n'a pas de sens).</li>
                    </ul>
                  </AlertBox>
                  <AlertBox title="Piège 2 — Oublier de vérifier la CSO">
                    La CPO donne les <em>points stationnaires</em>, pas nécessairement des maxima. La CSO{' '}
                    (<Math>{`\\partial^2\\ln L/\\partial\\theta^2\\leq 0`}</Math>) assure qu'il s'agit bien d'un{' '}
                    <strong>maximum</strong>.
                  </AlertBox>
                  <AlertBox title="Piège 3 — Efficacité sans biais préalable">
                    Un estimateur est efficace seulement s'il est <strong>d'abord sans biais</strong>.
                    L'inégalité de FRCD borne la variance des estimateurs <strong>sans biais</strong> uniquement.
                    Calculer <Math>{`I(\\theta)`}</Math> sans vérifier l'absence de biais est incorrect.
                  </AlertBox>
                  <AlertBox title="Piège 4 — Le signe du biais de S²">
                    <Math>{`\\mathbb{E}[S^2] = \\frac{n-1}{n}\\sigma^2 < \\sigma^2`}</Math>. L'EMV de la
                    variance <strong>sous-estime</strong> la vraie variance. Biais négatif : on obtient en
                    moyenne une variance trop petite. La correction divise par <Math>{`(n-1)`}</Math> et non
                    par <Math>n</Math>.
                  </AlertBox>
                  <AlertBox title="Piège 5 — Convergence pour un ESB">
                    Si l'estimateur est ESB, la convergence revient à montrer{' '}
                    <Math>{`\\mathrm{Var}(\\hat\\theta)\\to 0`}</Math>. Si l'estimateur est{' '}
                    <strong>biaisé</strong>, il faut montrer à la fois{' '}
                    <Math>{`\\mathrm{Var}(\\hat\\theta)\\to 0`}</Math> et Biais<Math>{`(\\hat\\theta)\\to 0`}</Math>.
                  </AlertBox>
                  <AlertBox title="Piège 6 — Utilisation de la fonction Gamma">
                    Retenir : <Math>{`\\Gamma(n)=(n-1)!`}</Math> pour <Math>{`n\\in\\mathbb{N}^*`}</Math>.
                    En pratique :
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Densité exponentielle : <Math>{`u=x/\\theta`}</Math> donne <Math>{`\\mathbb{E}(X^k)=\\theta^k\\Gamma(k+1)`}</Math>.</li>
                      <li>Densité <Math>{`f(x)=\\frac{2}{\\theta}xe^{-x^2/\\theta}`}</Math> : <Math>{`u=x^2/\\theta`}</Math> donne <Math>{`\\mathbb{E}(X^{2k})=\\theta^k\\Gamma(k+1)`}</Math>.</li>
                    </ul>
                  </AlertBox>
                </div>
              </section>

              {/* ── Fiche de synthèse finale ──────────────────────────── */}
              <section id="fiche-finale" data-section-title="V. Tableau récapitulatif EMV" className="space-y-8">
                <StatsSectionHeader title="V. Tableau récapitulatif EMV" />
                <div className="space-y-6">
                  <DefBox title="Tableau récapitulatif — Exercices 1 à 6">
                    <Table headers={['Ex.', 'Loi / Densité', 'EMV', 'Biaisé ?']}>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell><Math>{`K\\sim\\mathcal{B}(10\\,;\\,p)`}</Math>, éch. de taille <Math>m</Math></TableCell>
                        <TableCell><Math>{`\\hat p = \\bar K/10`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell><Math>{`f(x)=\\frac{1}{\\theta}(1-x)^{1/\\theta-1}`}</Math></TableCell>
                        <TableCell><Math>{`\\hat\\theta = -\\frac{1}{n}\\sum\\ln(1-x_i)`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell><Math>{`f(x)=\\frac{1}{\\theta}e^{-x/\\theta}`}</Math> (exponentielle)</TableCell>
                        <TableCell><Math>{`\\hat\\theta = \\bar x`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell><Math>{`f(x)=\\frac{2}{\\theta}xe^{-x^2/\\theta}`}</Math></TableCell>
                        <TableCell><Math>{`\\hat\\theta = \\overline{x^2}`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>5</TableCell>
                        <TableCell><Math>{`X_i\\sim\\mathcal{B}(1\\,;\\,p)`}</Math> (Bernoulli)</TableCell>
                        <TableCell><Math>{`\\hat p = \\bar x`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>6a</TableCell>
                        <TableCell><Math>{`X\\sim\\mathcal{N}(m\\,;\\,\\sigma)`}</Math></TableCell>
                        <TableCell><Math>{`\\hat m = \\bar x`}</Math></TableCell>
                        <TableCell>Non</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>6b</TableCell>
                        <TableCell><Math>{`X\\sim\\mathcal{N}(m\\,;\\,\\sigma)`}</Math></TableCell>
                        <TableCell><Math>{`\\widehat{\\sigma^2} = s^2 = \\frac{1}{n}\\sum(x_i-\\hat m)^2`}</Math></TableCell>
                        <TableCell><strong>Oui</strong></TableCell>
                      </TableRow>
                    </Table>
                  </DefBox>
                  <DefBox title="Quatre propriétés et comment les vérifier">
                    <Table headers={['Propriété', 'Démarche de vérification']}>
                      <TableRow>
                        <TableCell><strong>Sans biais</strong></TableCell>
                        <TableCell>Calculer <Math>{`\\mathbb{E}[\\hat\\theta(X_1,\\ldots,X_n)]`}</Math> et vérifier l'égalité à <Math>\theta</Math>. Utiliser linéarité de <Math>{`\\mathbb{E}`}</Math>, i.i.d.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Efficace</strong></TableCell>
                        <TableCell>(1) Vérifier ESB. (2) Calculer <Math>{`\\mathrm{Var}(\\hat\\theta)`}</Math>. (3) Calculer <Math>{`I(\\theta)=-\\mathbb{E}[\\partial^2\\ln L/\\partial\\theta^2]`}</Math>. (4) Vérifier <Math>{`\\mathrm{Var}(\\hat\\theta)=1/I(\\theta)`}</Math>.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Convergent</strong></TableCell>
                        <TableCell>Si ESB : montrer <Math>{`\\mathrm{Var}(\\hat\\theta)\\to 0`}</Math>. En général : biais→0 et variance→0.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Exhaustif</strong></TableCell>
                        <TableCell>Identifier <Math>{`\\alpha(x)`}</Math> dans la forme exponentielle de <Math>{`\\ln f(x;\\theta)`}</Math>. Vérifier que <Math>{`\\hat\\theta = c\\cdot\\frac{1}{n}\\sum\\alpha(X_i)`}</Math>.</TableCell>
                      </TableRow>
                    </Table>
                  </DefBox>
                  <MethBox title="Règle mémoire pour Γ">
                    <Table headers={['Γ(n)', 'Γ(1)', 'Γ(2)', 'Γ(3)']}>
                      <TableRow>
                        <TableCell>Valeur</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>2</TableCell>
                      </TableRow>
                    </Table>
                    <p className="mt-3 text-base">
                      Formule générale : <Math>{`\\mathbb{E}(X^k) = \\theta^{k}\\Gamma(k+1)`}</Math>{' '}
                      où on pose <Math>{`u=x/\\theta`}</Math> (densité exponentielle) ou{' '}
                      <Math>{`u=x^2/\\theta`}</Math> (densité de l'Ex. 4).
                    </p>
                  </MethBox>
                </div>
              </section>

              <ChapterNav
                prev={{ path: '/s4/stats/chapitre-8', label: 'Chapitre précédent', title: "Distributions d'échantillonnage" }}
                next={{ path: '/s4/stats/chapitre-10', label: 'Chapitre suivant', title: 'Intervalles de confiance' }}
              />
            </div>
          </div>
        </div>
      </div>
      <TableOfContents />
    </main>
  );
}

