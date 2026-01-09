import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter4() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 04"
        title="Lois Usuelles Discrètes"
        description="Uniforme, Bernoulli, Binomiale et Poisson — les modèles fondamentaux pour les VA discrètes."
      />

      <Section type="intuition" title="I. Loi Discrète Uniforme">
        <p className="mb-4">
          La loi uniforme est la plus simple de toutes : chaque valeur a exactement la même probabilité d'être obtenue. 
          C'est le modèle du dé équilibré, où chaque face a une chance sur six d'apparaître.
        </p>

        <Callout type="insight" title="Intuition">
          La loi uniforme modélise l'équiprobabilité parfaite : aucune valeur n'est favorisée. 
          C'est le cas idéal du "tirage au hasard" où chaque résultat a exactement la même chance.
        </Callout>

        <p className="mb-4">
          On appelle <strong>loi discrète uniforme</strong> la loi d'une VA X dont les valeurs possibles sont les entiers 
          {"{1, 2, ..., n}"} auxquels sont attachées des probabilités égales.
        </p>

        <FormulaBox label="Loi uniforme">{"P(X=x) = \\frac{1}{n} \\quad \\text{pour } x \\in \\{1, 2, ..., n\\}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Exemples d'applications :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Jeux de hasard :</strong> Lancer de dé, roulette, loterie</li>
          <li><strong>Informatique :</strong> Génération de nombres pseudo-aléatoires</li>
          <li><strong>Échantillonnage :</strong> Tirage au sort dans une population</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Caractéristiques :</strong></p>
        <FormulaBox label="Fonction génératrice">{"G_X(u) = \\frac{u}{n} \\cdot \\frac{u^n - 1}{u - 1}"}</FormulaBox>
        <FormulaBox label="Espérance">{"E[X] = \\frac{n+1}{2}"}</FormulaBox>
        <FormulaBox label="Moment d'ordre 2">{"E[X^2] = \\frac{(n+1)(2n+1)}{6}"}</FormulaBox>
        <FormulaBox label="Variance">{"V[X] = \\frac{n^2-1}{12}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Moments factoriels :</strong></p>
        <FormulaBox>{"M_{[k]} = \\frac{(n+1)(n-1)!}{(k+1)(n-k)!}"}</FormulaBox>
      </Section>

      <Section type="key" title="II. Loi de Bernoulli">
        <p className="mb-4">
          La loi de Bernoulli est la brique élémentaire de nombreuses autres lois. Elle modélise une expérience 
          à deux issues possibles : <strong>succès</strong> (valeur 1) ou <strong>échec</strong> (valeur 0).
        </p>

        <Callout type="insight" title="Intuition">
          Bernoulli est la loi du "oui/non", "pile/face", "réussi/raté". C'est la plus simple des lois 
          et la brique de base pour construire la binomiale.
        </Callout>

        <p className="mb-4">
          On appelle <strong>VA de Bernoulli</strong> une VA qui ne prend que 2 valeurs :
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5">
                <th className="border border-slate-300 dark:border-white/15 p-2">x</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">0 (échec)</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">1 (succès)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2">P(X=x)</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">q = 1-p</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">p</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4"><strong>Notation :</strong> <Math>{"X \\sim \\mathcal{B}(1, p)"}</Math> ou <Math>{"X \\sim Bernoulli(p)"}</Math></p>

        <p className="mb-2"><strong>Caractéristiques :</strong></p>
        <FormulaBox label="Espérance">{"E[X] = 0 \\times (1-p) + 1 \\times p = p"}</FormulaBox>
        <FormulaBox label="Variance">{"V[X] = E[X^2] - (E[X])^2 = p - p^2 = p(1-p) = pq"}</FormulaBox>
        <FormulaBox label="Fonction génératrice">{"G_X(u) = u^0 q + u^1 p = q + up"}</FormulaBox>
        <FormulaBox label="Fonction caractéristique">{"\\varphi_X(t) = e^{it \\cdot 0} q + e^{it \\cdot 1} p = q + pe^{it}"}</FormulaBox>
      </Section>

      <Section type="key" title="III. Loi Binomiale">
        <p className="mb-4">
          La loi binomiale compte le nombre de succès dans n épreuves de Bernoulli <strong>indépendantes</strong>. 
          C'est la loi du "combien de fois" sur n essais identiques.
        </p>

        <Callout type="insight" title="Intuition">
          Pensez à la binomiale comme à un compteur de succès. Vous lancez une pièce 10 fois, vous comptez 
          le nombre de "pile" : c'est une binomiale B(10, 0.5). Vous testez 100 produits avec 5% de défauts, 
          vous comptez les défectueux : c'est une binomiale B(100, 0.05).
        </Callout>

        <p className="mb-4">
          <strong>Contexte typique :</strong> On réalise n tirages successifs <strong>avec remise</strong> dans une urne 
          contenant des boules blanches (probabilité p) et des boules noires (probabilité q = 1-p). 
          X = nombre de boules blanches obtenues.
        </p>

        <p className="mb-2"><strong>Exemples d'applications :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Contrôle qualité :</strong> nombre de pièces défectueuses sur n testées</li>
          <li><strong>Sondages :</strong> nombre de personnes favorables sur n interrogées</li>
          <li><strong>Médecine :</strong> nombre de patients guéris sur n traités</li>
          <li><strong>Marketing :</strong> nombre de clics sur n affichages publicitaires</li>
        </ul>

        <p className="mb-2"><strong>Conditions :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Les tirages sont indépendants</li>
          <li><Math>{"X \\in \\{0, 1, ..., n\\}"}</Math></li>
        </ul>

        <FormulaBox label="Loi binomiale" highlight>{"P(X=x) = C_n^x p^x q^{n-x} = \\binom{n}{x} p^x (1-p)^{n-x}"}</FormulaBox>

        <p className="mt-4 mb-4"><strong>Notation :</strong> <Math>{"X \\sim \\mathcal{B}(n, p)"}</Math></p>

        <p className="mb-4">
          <strong>Justification fondamentale :</strong> Une VA suit une loi binomiale si et seulement si elle est 
          la <strong>somme de n épreuves de Bernoulli indépendantes</strong> :
        </p>
        <FormulaBox>{"X \\sim \\mathcal{B}(n, p) \\Leftrightarrow X = \\sum_{i=1}^{n} Y_i \\text{ où } Y_i \\sim \\mathcal{B}(1, p) \\text{ indépendantes}"}</FormulaBox>
      </Section>

      <Section type="formule" title="Caractéristiques de la Binomiale">
        <p className="mb-4">Les caractéristiques se déduisent facilement du fait que X est une somme de Bernoulli.</p>

        <FormulaBox label="Espérance" highlight>{"E[X] = np"}</FormulaBox>

        <p className="mt-2 mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> <Math>{"X = \\sum_{i=1}^{n} Y_i"}</Math> avec <Math>{"E[Y_i] = p"}</Math>, 
          donc <Math>{"E[X] = \\sum E[Y_i] = np"}</Math>
        </p>

        <FormulaBox label="Variance" highlight>{"V[X] = npq = np(1-p)"}</FormulaBox>

        <p className="mt-2 mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> Les <Math>{"Y_i"}</Math> sont indépendantes avec <Math>{"V[Y_i] = pq"}</Math>, 
          donc <Math>{"V[X] = \\sum V[Y_i] = npq"}</Math>
        </p>

        <FormulaBox label="Fonction génératrice">{"G_X(u) = (up + q)^n"}</FormulaBox>
        <FormulaBox label="Fonction caractéristique">{"\\varphi_X(t) = (pe^{it} + q)^n"}</FormulaBox>

        <p className="mt-4 text-sm">
          <strong>Remarque :</strong> <Math>{"\\varphi_{\\mathcal{B}(n,p)}(t) = [\\varphi_{\\mathcal{B}(1,p)}(t)]^n"}</Math>
        </p>
      </Section>

      <Section type="key" title="Calcul des moments par φ(t) — Démonstration">
        <p className="mb-4">
          On peut retrouver les moments à partir de la fonction caractéristique. C'est une méthode élégante 
          qui utilise les développements en série.
        </p>

        <div className="p-5 bg-slate-100/50 dark:bg-white/5 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold text-blue-800 mb-4">📐 Démonstration : Retrouver E[X] et V[X] via φ(t)</p>
          
          <p className="mb-3"><strong>Point de départ :</strong></p>
          <p className="mb-4 pl-4"><Math>{"\\varphi_X(t) = (pe^{it}+q)^n"}</Math></p>
          
          <p className="mb-3"><strong>Étape 1 — Développement de e^{'{it}'} :</strong></p>
          <p className="mb-4 pl-4"><Math>{"e^{it} = 1 + it + \\frac{(it)^2}{2!} + \\frac{(it)^3}{3!} + ..."}</Math></p>
          
          <p className="mb-3"><strong>Étape 2 — Substitution dans φ(t) :</strong></p>
          <p className="mb-2 pl-4"><Math>{"pe^{it} + q = p\\left(1 + it + \\frac{(it)^2}{2!} + ...\\right) + q"}</Math></p>
          <p className="mb-4 pl-4"><Math>{"= (p+q) + p(it) + p\\frac{(it)^2}{2!} + ... = 1 + p(it) + p\\frac{(it)^2}{2!} + ..."}</Math></p>
          
          <p className="mb-3"><strong>Étape 3 — Développement de (1+A)^n :</strong></p>
          <p className="mb-2 pl-4">Posons <Math>{"A = p(it) + p\\frac{(it)^2}{2!} + ..."}</Math></p>
          <p className="mb-4 pl-4"><Math>{"(1+A)^n = 1 + nA + \\frac{n(n-1)}{2}A^2 + ..."}</Math></p>
          
          <p className="mb-3"><strong>Étape 4 — Calcul des premiers termes :</strong></p>
          <p className="mb-2 pl-4">Terme en (it) : <Math>{"np \\cdot (it)"}</Math></p>
          <p className="mb-4 pl-4">Terme en (it)² : <Math>{"np \\cdot \\frac{(it)^2}{2!} + \\frac{n(n-1)}{2} \\cdot p^2(it)^2 = \\left(np + n(n-1)p^2\\right)\\frac{(it)^2}{2!}"}</Math></p>
          
          <p className="mb-3"><strong>Étape 5 — Identification :</strong></p>
          <p className="mb-2 pl-4">On compare avec le développement général :</p>
          <p className="mb-4 pl-4"><Math>{"\\varphi_X(t) = 1 + m_1\\frac{it}{1!} + m_2\\frac{(it)^2}{2!} + ..."}</Math></p>
          
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200">
            <p className="font-semibold text-emerald-800 mb-2">Résultats :</p>
            <ul className="space-y-2">
              <li><Math>{"m_1 = np = E[X]"}</Math> ✓</li>
              <li><Math>{"m_2 = np + n(n-1)p^2"}</Math></li>
              <li><Math>{"V[X] = m_2 - m_1^2 = np + n(n-1)p^2 - n^2p^2 = np - np^2 = np(1-p) = npq"}</Math> ✓</li>
            </ul>
          </div>
        </div>

        <Callout type="insight" title="Pourquoi cette méthode ?">
          La fonction caractéristique "encode" tous les moments de la distribution. En la développant en série, 
          on peut lire directement les moments comme coefficients. C'est particulièrement utile pour des lois 
          complexes où le calcul direct de E[X²] serait fastidieux.
        </Callout>
      </Section>

      <Section type="key" title="Somme de Binomiales">
        <p className="mb-4">
          Si on additionne des binomiales indépendantes <strong>de même paramètre p</strong>, on obtient encore une binomiale.
          C'est une propriété de stabilité très utile.
        </p>

        <FormulaBox highlight>{"X_1 \\sim \\mathcal{B}(n_1, p), X_2 \\sim \\mathcal{B}(n_2, p) \\text{ indép.} \\Rightarrow X_1 + X_2 \\sim \\mathcal{B}(n_1+n_2, p)"}</FormulaBox>

        <p className="mt-4 mb-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> Par les fonctions caractéristiques :
        </p>
        <p className="pl-4 text-sm text-slate-700 dark:text-slate-300">
          <Math>{"\\varphi_{X_1+X_2}(t) = \\varphi_{X_1}(t) \\cdot \\varphi_{X_2}(t) = (pe^{it}+q)^{n_1} (pe^{it}+q)^{n_2} = (pe^{it}+q)^{n_1+n_2}"}</Math>
        </p>

        <p className="mt-4"><strong>Généralisation :</strong></p>
        <FormulaBox>{"\\sum_{i=1}^{k} X_i \\sim \\mathcal{B}\\left(\\sum_{i=1}^{k} n_i, p\\right) \\text{ si les } X_i \\sim \\mathcal{B}(n_i, p) \\text{ sont indépendantes}"}</FormulaBox>
      </Section>

      <Section type="formule" title="Mode de la Binomiale">
        <p className="mb-4">
          Le mode est la valeur la plus probable. Pour le trouver, on étudie les rapports de probabilités successives.
        </p>

        <p className="mb-4">
          Le mode <Math>{"x_{Mo}"}</Math> vérifie : <Math>{"\\frac{P(X=x_{Mo})}{P(X=x_{Mo}-1)} \\geq 1"}</Math> et 
          <Math>{"\\frac{P(X=x_{Mo})}{P(X=x_{Mo}+1)} \\geq 1"}</Math>
        </p>

        <p className="mb-4">En calculant les rapports :</p>
        <p className="mb-4 pl-4">
          <Math>{"\\frac{P_x}{P_{x-1}} = \\frac{(n-x+1)p}{xq}"}</Math> et <Math>{"\\frac{P_x}{P_{x+1}} = \\frac{(x+1)q}{(n-x)p}"}</Math>
        </p>

        <p className="mb-4">On obtient l'encadrement :</p>
        <FormulaBox highlight>{"np - q \\leq x_{Mo} \\leq np + p"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Cas pratiques :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Si np-q n'est pas entier : <strong>un seul mode</strong> (l'entier dans l'intervalle)</li>
          <li>Si np-q est entier : <strong>deux modes</strong> (np-q et np-q+1)</li>
        </ul>

        <p className="mt-4">
          <strong>Exemple :</strong> Si 2.5 ≤ x_Mo ≤ 3.5 → x_Mo = 3 (un seul mode)<br/>
          Si 2 ≤ x_Mo ≤ 3 → deux modes : 2 et 3
        </p>
      </Section>

      <Section type="formule" title="Fréquence Binomiale">
        <p className="mb-4">
          Soit <Math>{"X \\sim \\mathcal{B}(n, p)"}</Math>. La <strong>fréquence binomiale</strong> est la proportion 
          de succès observée : <Math>{"F = \\frac{X}{n}"}</Math>
        </p>

        <FormulaBox label="Espérance de F">{"E[F] = E\\left[\\frac{X}{n}\\right] = \\frac{1}{n}E[X] = \\frac{np}{n} = p"}</FormulaBox>
        <FormulaBox label="Variance de F">{"V[F] = V\\left[\\frac{X}{n}\\right] = \\frac{1}{n^2}V[X] = \\frac{npq}{n^2} = \\frac{pq}{n}"}</FormulaBox>

        <p className="mt-4">
          <strong>Interprétation :</strong> La fréquence F est un estimateur sans biais de p, et sa variance diminue 
          quand n augmente (plus on fait d'essais, plus l'estimation est précise).
        </p>
      </Section>

      <Section type="key" title="Théorème de Bernoulli">
        <p className="mb-4">
          C'est une forme de la <strong>loi des grands nombres</strong> pour les proportions. Quand n → +∞, 
          la fréquence F converge vers p en probabilité.
        </p>

        <FormulaBox highlight>{"P[|F-p| > \\varepsilon] \\rightarrow 0 \\text{ quand } n \\rightarrow +\\infty"}</FormulaBox>

        <p className="mt-4 mb-2">Autrement dit : <Math>{"F \\xrightarrow{P} p"}</Math> (convergence en probabilité)</p>

        <p className="mt-4 mb-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration (par Bienaymé-Tchebychev) :</strong>
        </p>
        <p className="pl-4 text-sm text-slate-700 dark:text-slate-300">
          <Math>{"P[|F-p| \\geq \\varepsilon] \\leq \\frac{V[F]}{\\varepsilon^2} = \\frac{pq}{n\\varepsilon^2} \\rightarrow 0 \\text{ quand } n \\rightarrow +\\infty"}</Math>
        </p>
      </Section>

      <Section type="key" title="IV. Loi de Poisson">
        <p className="mb-4">
          La loi de Poisson convient à la description d'événements dont les chances de réalisation sont faibles. 
          On l'appelle aussi la <strong>loi des faibles probabilités</strong>.
        </p>

        <Callout type="insight" title="Intuition">
          La Poisson compte les événements rares sur un intervalle de temps ou d'espace. 
          Le paramètre λ représente le nombre moyen d'événements par unité de temps. 
          Si vous recevez en moyenne 3 emails par heure, le nombre d'emails suit une Poisson(3).
        </Callout>

        <p className="mb-4">
          <strong>Exemples typiques :</strong> nombre d'appels téléphoniques par heure, nombre d'accidents par jour, 
          nombre de pannes par mois, arrivées de clients dans un magasin.
        </p>

        <p className="mb-4">
          On appelle <strong>variable de Poisson</strong> de paramètre λ {'>'} 0, la VA discrète définie sur 
          <Math>{"X = \\{0, 1, 2, ..., n, ...\\}"}</Math> avec :
        </p>

        <FormulaBox label="Loi de Poisson" highlight>{"P(X=x) = \\frac{\\lambda^x e^{-\\lambda}}{x!}"}</FormulaBox>

        <p className="mt-4 mb-4"><strong>Notation :</strong> <Math>{"X \\sim \\mathcal{P}(\\lambda)"}</Math></p>

        <p className="mb-2"><strong>Vérification :</strong></p>
        <p className="pl-4 mb-4">
          <Math>{"\\sum_{x=0}^{\\infty} P(X=x) = e^{-\\lambda} \\sum_{x=0}^{\\infty} \\frac{\\lambda^x}{x!} = e^{-\\lambda} e^{\\lambda} = 1"}</Math> ✓
        </p>

        <p className="mb-4">
          <strong>Propriété :</strong> La loi de Poisson est dissymétrique (étalée vers la droite) et tend à devenir 
          symétrique quand λ augmente. Elle se rapproche alors de la loi normale.
        </p>
      </Section>

      <Section type="formule" title="Caractéristiques de la Poisson">
        <FormulaBox label="Espérance" highlight>{"E[X] = \\lambda"}</FormulaBox>

        <p className="mt-2 mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> <Math>{"E[X] = \\sum_{x=0}^{\\infty} x \\frac{\\lambda^x e^{-\\lambda}}{x!} = e^{-\\lambda} \\lambda \\sum_{x=1}^{\\infty} \\frac{\\lambda^{x-1}}{(x-1)!} = e^{-\\lambda} \\lambda e^{\\lambda} = \\lambda"}</Math>
        </p>

        <FormulaBox label="Variance" highlight>{"V[X] = \\lambda = E[X]"}</FormulaBox>

        <p className="mt-2 mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> <Math>{"E[X(X-1)] = \\lambda^2"}</Math>, donc 
          <Math>{"E[X^2] = \\lambda^2 + \\lambda"}</Math> et <Math>{"V[X] = \\lambda^2 + \\lambda - \\lambda^2 = \\lambda"}</Math>
        </p>

        <Callout type="insight" title="Propriété remarquable">
          Pour une loi de Poisson, <strong>E[X] = V[X] = λ</strong>. C'est un critère pour reconnaître une Poisson !
        </Callout>

        <FormulaBox label="Fonction génératrice">{"G_X(u) = e^{\\lambda(u-1)}"}</FormulaBox>

        <p className="mt-2 mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong> <Math>{"G_X(u) = \\sum_{x=0}^{\\infty} u^x \\frac{\\lambda^x e^{-\\lambda}}{x!} = e^{-\\lambda} \\sum_{x=0}^{\\infty} \\frac{(\\lambda u)^x}{x!} = e^{-\\lambda} e^{\\lambda u} = e^{\\lambda(u-1)}"}</Math>
        </p>

        <FormulaBox label="Fonction caractéristique">{"\\varphi_X(t) = e^{\\lambda(e^{it}-1)}"}</FormulaBox>
      </Section>

      <Section type="formule" title="Moments factoriels de la Poisson">
        <p className="mb-4">
          En posant u = 1+v dans la fonction génératrice :
        </p>
        <p className="mb-4">
          <Math>{"G_X(1+v) = e^{\\lambda v} = 1 + \\lambda v + \\frac{\\lambda^2 v^2}{2!} + ... + \\frac{\\lambda^k v^k}{k!} + ..."}</Math>
        </p>
        <p className="mb-4">
          Par identification : <Math>{"\\mu_{[k]} = \\lambda^k"}</Math>
        </p>
      </Section>

      <Section type="formule" title="Mode de la Poisson">
        <FormulaBox highlight>{"\\lambda - 1 \\leq x_{Mo} \\leq \\lambda"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Cas pratiques :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Si λ n'est pas entier : <strong>un seul mode</strong> (la partie entière de λ)</li>
          <li>Si λ est entier : <strong>deux modes</strong> (λ-1 et λ)</li>
        </ul>
      </Section>

      <Section type="key" title="Somme de Poisson">
        <p className="mb-4">
          La somme de Poisson indépendantes est encore une Poisson. C'est une propriété de stabilité fondamentale.
        </p>

        <FormulaBox highlight>{"X_1 \\sim \\mathcal{P}(\\lambda_1), X_2 \\sim \\mathcal{P}(\\lambda_2) \\text{ indép.} \\Rightarrow X_1 + X_2 \\sim \\mathcal{P}(\\lambda_1 + \\lambda_2)"}</FormulaBox>

        <p className="mt-4 mb-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>Démonstration :</strong>
        </p>
        <p className="pl-4 text-sm text-slate-700 dark:text-slate-300">
          <Math>{"\\varphi_{X_1+X_2}(t) = \\varphi_{X_1}(t) \\cdot \\varphi_{X_2}(t) = e^{\\lambda_1(e^{it}-1)} \\cdot e^{\\lambda_2(e^{it}-1)} = e^{(\\lambda_1+\\lambda_2)(e^{it}-1)}"}</Math>
        </p>

        <p className="mt-4"><strong>Généralisation :</strong></p>
        <FormulaBox>{"\\sum_{i=1}^{k} X_i \\sim \\mathcal{P}\\left(\\sum_{i=1}^{k} \\lambda_i\\right) \\text{ si les } X_i \\sim \\mathcal{P}(\\lambda_i) \\text{ sont indépendantes}"}</FormulaBox>

        <Callout type="warning" title="Attention">
          Si la période change, λ change aussi ! Exemple : 3 appels/heure → 15 appels/5 heures.
        </Callout>
      </Section>

      <Section type="key" title="V. Approximation Binomiale → Poisson">
        <p className="mb-4">
          La loi de Poisson est la <strong>loi limite</strong> de la loi binomiale lorsque n est grand, p est petit, 
          et le produit np reste constant (égal à λ).
        </p>

        <FormulaBox highlight>{"\\mathcal{B}(n, p) \\xrightarrow[n \\to \\infty, p \\to 0]{np = \\lambda} \\mathcal{P}(\\lambda)"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Démonstration :</strong></p>
        <p className="mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          Soit <Math>{"X \\sim \\mathcal{B}(n, p)"}</Math> avec <Math>{"\\lambda = np \\Rightarrow p = \\frac{\\lambda}{n}"}</Math>
        </p>
        <p className="mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          <Math>{"P_x = C_n^x p^x (1-p)^{n-x} = \\frac{\\lambda^x}{x!} \\cdot \\frac{n(n-1)...(n-x+1)}{n^x} \\cdot \\left(1-\\frac{\\lambda}{n}\\right)^n \\cdot \\left(1-\\frac{\\lambda}{n}\\right)^{-x}"}</Math>
        </p>
        <p className="mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          Quand n → +∞ : le premier facteur → 1, le deuxième → e^(-λ), le troisième → 1.
          Donc <Math>{"P_x \\rightarrow \\frac{\\lambda^x e^{-\\lambda}}{x!}"}</Math>
        </p>

        <p className="mt-4 mb-2"><strong>Règle pratique d'application :</strong></p>
        <FormulaBox highlight>{"\\mathcal{B}(n, p) \\approx \\mathcal{P}(np) \\quad \\text{si } n > 50 \\text{ et } p < 0.1 \\text{ (ou } np < 10\\text{)}"}</FormulaBox>
      </Section>

      <Section type="intuition" title="VI. Le Processus de Poisson">
        <p className="mb-4">
          Un <strong>processus de Poisson</strong> est un processus qui rapporte des réalisations d'événements 
          aléatoires dans le temps. On dit qu'un événement suit un processus de Poisson si les 
          <strong>3 hypothèses</strong> suivantes sont vérifiées :
        </p>

        <p className="mb-2"><strong>H1 — Indépendance :</strong></p>
        <p className="mb-4 pl-4">
          Le nombre d'événements apparaissant entre t₁ et t₂ est indépendant du nombre d'événements 
          qui sont apparus entre t₀ et t₁.
        </p>

        <p className="mb-2"><strong>H2 — Homogénéité :</strong></p>
        <p className="mb-4 pl-4">
          La probabilité qu'un événement apparaisse au cours d'un petit intervalle de temps Δt 
          est proportionnelle à la durée de cette période Δt.
        </p>

        <p className="mb-2"><strong>H3 — Rareté :</strong></p>
        <p className="mb-4 pl-4">
          La probabilité de deux apparitions successives d'un événement sur un petit intervalle 
          de temps Δt est négligeable.
        </p>

        <p className="mt-4 mb-2"><strong>Exemples d'application :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Arrivées de voitures en un point d'une route (hors agglomération, hors heures de pointe)</li>
          <li>Arrivées de clients dans un magasin</li>
          <li>Appels téléphoniques à un standard</li>
          <li>Pannes de machines</li>
          <li>Nombre d'accidents</li>
          <li>Arrivées de bateaux dans un port</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Exemple détaillé — Arrivées de voitures :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>H1 satisfaite si :</strong> les arrivées sont indépendantes (pas de feu de circulation, loin d'une agglomération)</li>
          <li><strong>H2 satisfaite si :</strong> le rythme d'arrivée est constant (période homogène : matin ou après-midi)</li>
          <li><strong>H3 satisfaite si :</strong> la probabilité d'arrivée de 2+ véhicules sur un intervalle infinitésimal est négligeable</li>
        </ul>
      </Section>

      <Section type="key" title="VII. Tableau Récapitulatif">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5">
                <th className="border border-slate-300 dark:border-white/15 p-2">Loi</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">P(X=x)</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">E[X]</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">V[X]</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">G_X(u)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Uniforme</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">1/n</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">(n+1)/2</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">(n²-1)/12</td>
                <td className="border border-slate-300 dark:border-white/15 p-2 text-xs"><Math>{"\\frac{u(u^n-1)}{n(u-1)}"}</Math></td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Bernoulli</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"p^x(1-p)^{1-x}"}</Math></td>
                <td className="border border-slate-300 dark:border-white/15 p-2">p</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">pq</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">q+up</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Binomiale</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"C_n^x p^x q^{n-x}"}</Math></td>
                <td className="border border-slate-300 dark:border-white/15 p-2">np</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">npq</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">(up+q)ⁿ</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Poisson</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"\\frac{\\lambda^x e^{-\\lambda}}{x!}"}</Math></td>
                <td className="border border-slate-300 dark:border-white/15 p-2">λ</td>
                <td className="border border-slate-300 dark:border-white/15 p-2">λ</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"e^{\\lambda(u-1)}"}</Math></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section type="key" title="VIII. Sommes de VA indépendantes">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5">
                <th className="border border-slate-300 dark:border-white/15 p-2">Loi</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">Propriété</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Bernoulli</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"\\sum_{i=1}^{n} \\mathcal{B}(1,p)_{ind} = \\mathcal{B}(n,p)"}</Math></td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Binomiale</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"\\sum_{i=1}^{k} \\mathcal{B}(n_i,p)_{ind} = \\mathcal{B}(\\sum n_i, p)"}</Math></td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Poisson</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"\\sum_{i=1}^{k} \\mathcal{P}(\\lambda_i)_{ind} = \\mathcal{P}(\\sum \\lambda_i)"}</Math></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section type="key" title="IX. Encadrement des modes">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5">
                <th className="border border-slate-300 dark:border-white/15 p-2">Loi</th>
                <th className="border border-slate-300 dark:border-white/15 p-2">Encadrement du mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Binomiale B(n,p)</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"np - q \\leq x_{Mo} \\leq np + p"}</Math></td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-white/15 p-2 font-semibold">Poisson P(λ)</td>
                <td className="border border-slate-300 dark:border-white/15 p-2"><Math>{"\\lambda - 1 \\leq x_{Mo} \\leq \\lambda"}</Math></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section type="key" title="X. Justifier une loi en exercice">
        <p className="mb-4">En exercice, il faut toujours justifier pourquoi on utilise telle ou telle loi :</p>

        <p className="mb-2"><strong>Loi de Bernoulli :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Épreuve à deux issues possibles (succès/échec)</li>
          <li>Probabilité de succès p constante</li>
        </ul>

        <p className="mb-2"><strong>Loi Binomiale :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>n épreuves de Bernoulli indépendantes</li>
          <li>Même probabilité p à chaque épreuve</li>
          <li>On compte le nombre de succès</li>
        </ul>

        <p className="mb-2"><strong>Loi de Poisson :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Événements rares (faible probabilité)</li>
          <li>Processus de Poisson vérifié (H1, H2, H3)</li>
          <li>Ou approximation d'une binomiale (n grand, p petit)</li>
        </ul>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Poisson : λ change avec la période</strong> — 3/heure ≠ 3/jour, il faut multiplier λ par le rapport des durées</li>
          <li><strong>Binomiale : avec remise</strong> — Sans remise → Hypergéométrique (pas au programme)</li>
          <li><strong>Mode de la binomiale</strong> — Utiliser l'encadrement np-q ≤ x_Mo ≤ np+p</li>
          <li><strong>Poisson : E[X] = V[X] = λ</strong> — Critère de reconnaissance d'une Poisson</li>
          <li><strong>Approximation</strong> — Vérifier n {'>'} 50 et p {'<'} 0.1 avant d'approximer B(n,p) par P(np)</li>
          <li><strong>Somme de binomiales</strong> — Le paramètre p doit être le même pour toutes les VA</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/stats/chapitre-3', label: '← Chapitre 3', title: 'Caractéristiques des VA' }}
        next={{ path: '/stats/chapitre-5', label: 'Chapitre 5 →', title: 'VA 2D' }}
      />
    </main>
  );
}
