import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter3() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 03"
        title="Caractéristiques des Variables Aléatoires"
        description="Espérance, variance, moments, inégalités et fonctions génératrices."
      />

      <Section type="intuition" title="I. L'Espérance Mathématique">
        <p className="mb-4">
          L'<strong>espérance</strong> est la valeur moyenne qu'on obtiendrait si on répétait l'expérience un très grand nombre de fois. C'est le "centre de gravité" de la distribution.
        </p>

        <p className="mb-2"><strong>Cas discret :</strong></p>
        <FormulaBox>{"E[X] = \\sum_{i} x_i \\cdot P(X=x_i)"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Cas continu :</strong></p>
        <FormulaBox>{"E[X] = \\int_{-\\infty}^{+\\infty} x \\cdot f(x) dx"}</FormulaBox>

        <p className="mt-4 mb-4">
          <strong>Exemple :</strong> Soit f(x) = 2x pour x ∈ [0,1]. Alors :
        </p>
        <p className="pl-4"><Math>{"E[X] = \\int_0^1 x \\cdot 2x \\, dx = \\int_0^1 2x^2 \\, dx = \\frac{2}{3}"}</Math></p>
      </Section>

      <Section type="key" title="Propriétés de l'Espérance">
        <p className="mb-4">Ces propriétés sont fondamentales et très utilisées en exercice :</p>

        <p className="mb-2"><strong>P1 — Constante :</strong> <Math>{"E[c] = c"}</Math></p>
        
        <p className="mb-2"><strong>P2 — Linéarité :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"E[aX + b] = aE[X] + b"}</Math></li>
          <li><Math>{"E[X + Y] = E[X] + E[Y]"}</Math> (toujours vraie !)</li>
        </ul>

        <p className="mb-2"><strong>P3 — Variable centrée :</strong> <Math>{"E[X - E[X]] = 0"}</Math></p>
        
        <p className="mb-2"><strong>P4 — Produit (si indépendantes) :</strong> <Math>{"E[XY] = E[X] \\cdot E[Y]"}</Math></p>

        <p className="mb-2"><strong>P5 — Moyenne de VA :</strong></p>
        <p className="pl-4">Si <Math>{"\\bar{X} = \\frac{1}{n}\\sum X_i"}</Math> avec <Math>{"E[X_i] = m"}</Math>, alors <Math>{"E[\\bar{X}] = m"}</Math></p>
      </Section>

      <Section type="intuition" title="II. Les Quantiles">
        <p className="mb-4">
          Un <strong>quantile d'ordre p</strong> est la valeur <Math>{"x_p"}</Math> telle que <Math>{"F(x_p) = p"}</Math>. C'est la valeur en dessous de laquelle se trouve une proportion p de la distribution.
        </p>

        <p className="mb-2"><strong>La médiane</strong> (quantile d'ordre 1/2) :</p>
        <FormulaBox>{"F(x_{med}) = \\frac{1}{2}"}</FormulaBox>
        <p className="mt-2 mb-4">Elle partage la distribution en deux parties égales.</p>

        <p className="mb-2"><strong>Les quartiles</strong> (partagent en 4) :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"Q_1"}</Math> : F(Q₁) = 1/4</li>
          <li><Math>{"Q_2 = x_{med}"}</Math> : F(Q₂) = 1/2</li>
          <li><Math>{"Q_3"}</Math> : F(Q₃) = 3/4</li>
        </ul>

        <p className="mb-2"><strong>Les déciles</strong> (partagent en 10) :</p>
        <p className="pl-4"><Math>{"F(D_i) = \\frac{i}{10}"}</Math> pour i = 1, ..., 9</p>

        <p className="mt-4 mb-2"><strong>Écart interquartile :</strong></p>
        <p className="pl-4"><Math>{"[Q_1, Q_3]"}</Math> avec <Math>{"P(Q_1 < X < Q_3) = 0.5"}</Math></p>

        <p className="mt-4 mb-2"><strong>Cas discret (intervalle médian) :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Si <Math>{"F(x_k) = 1/2"}</Math>, alors <Math>{"x_{med} = x_k"}</Math></li>
          <li>Si <Math>{"F(x_k) < 1/2"}</Math> et <Math>{"F(x_{k+1}) > 1/2"}</Math>, alors <Math>{"x_{med} = x_{k+1}"}</Math></li>
          <li>L'intervalle <Math>{"[x_i, x_{i+1}]"}</Math> où se trouve la médiane est l'<strong>intervalle médian</strong></li>
        </ul>
      </Section>

      <Section type="intuition" title="III. Le Mode">
        <p className="mb-4">
          Le <strong>mode</strong> est la valeur la plus probable (VA discrète) ou le maximum de la densité (VA continue).
        </p>

        <p className="mb-2"><strong>VA discrète :</strong> <Math>{"x_k"}</Math> tel que <Math>{"P(X=x_k)"}</Math> est maximum.</p>
        
        <p className="mb-2"><strong>VA continue :</strong> <Math>{"x_{mo}"}</Math> tel que <Math>{"f'(x_{mo}) = 0"}</Math> et <Math>{"f''(x_{mo}) < 0"}</Math>.</p>

        <p className="mt-4 mb-2"><strong>Mode local vs global :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Mode local</strong> : <Math>{"P(X=x_k) > P(X=x_{k-1})"}</Math> et <Math>{"P(X=x_k) > P(X=x_{k+1})"}</Math></li>
          <li><strong>Mode global</strong> : <Math>{"P(X=x_k)"}</Math> est le maximum de toutes les probabilités</li>
        </ul>

        <p className="mb-2"><strong>Typologie des distributions :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Unimodale</strong> : un seul mode</li>
          <li><strong>Bimodale</strong> : deux modes</li>
          <li><strong>Multimodale</strong> : plusieurs modes (modes relatifs)</li>
          <li><strong>Symétrique</strong> : mode = médiane = moyenne</li>
          <li><strong>Asymétrique</strong> : mode ≠ médiane ≠ moyenne</li>
        </ul>
      </Section>

      <Section type="key" title="IV. Les Moments">
        <p className="mb-4">
          Les moments sont des caractéristiques numériques qui décrivent la forme de la distribution. Ils généralisent l'espérance et la variance.
        </p>

        <p className="mb-2"><strong>Moment non centré d'ordre k :</strong></p>
        <FormulaBox>{"m_k = E[X^k]"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4"><Math>{"m_1 = E[X]"}</Math>, <Math>{"m_2 = E[X^2]"}</Math></p>

        <p className="mb-2"><strong>Moment centré d'ordre k :</strong></p>
        <FormulaBox>{"\\mu_k = E[(X - E[X])^k]"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4"><Math>{"\\mu_1 = 0"}</Math>, <Math>{"\\mu_2 = V(X)"}</Math></p>

        <p className="mb-2"><strong>Relations importantes :</strong></p>
        <FormulaBox highlight>{"\\mu_2 = m_2 - m_1^2 \\quad \\text{(c'est la variance !)}"}</FormulaBox>
        <FormulaBox>{"\\mu_3 = m_3 - 3m_2 m_1 + 2m_1^3"}</FormulaBox>
      </Section>

      <Section type="formule" title="Moments Factoriels">
        <p className="mb-4">
          Les <strong>moments factoriels</strong> sont surtout utilisés pour les VA discrètes à valeurs entières non négatives.
        </p>

        <FormulaBox label="Moment factoriel d'ordre k">{"M_{[k]} = E[X(X-1)(X-2)...(X-k+1)]"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Relations avec les moments non-centrés :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"M_{[1]} = E[X] = m_1"}</Math></li>
          <li><Math>{"M_{[2]} = E[X(X-1)] = m_2 - m_1"}</Math></li>
          <li><Math>{"M_{[3]} = m_3 - 3m_2 + 2m_1"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Relations inverses :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"m_1 = M_{[1]}"}</Math></li>
          <li><Math>{"m_2 = M_{[2]} + M_{[1]}"}</Math></li>
          <li><Math>{"m_3 = M_{[3]} + 3M_{[2]} + M_{[1]}"}</Math></li>
        </ul>
      </Section>

      <Section type="key" title="V. La Variance">
        <p className="mb-4">
          La <strong>variance</strong> mesure la dispersion autour de la moyenne. C'est le moment centré d'ordre 2.
        </p>

        <FormulaBox label="Variance" highlight>{"V(X) = E[(X-E[X])^2] = E[X^2] - (E[X])^2"}</FormulaBox>
        <FormulaBox label="Écart-type">{"\\sigma = \\sqrt{V(X)}"}</FormulaBox>
      </Section>

      <Section type="key" title="Propriétés de la Variance">
        <p className="mb-2"><strong>P1 — Transformation linéaire :</strong></p>
        <FormulaBox highlight>{"V(aX + b) = a^2 V(X)"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">La constante b disparaît ! Seul le coefficient a compte (au carré).</p>

        <p className="mb-2"><strong>P2 — Variable centrée réduite :</strong></p>
        <p className="mb-4 pl-4">
          Si on pose <Math>{"Y = \\frac{X - m}{\\sigma}"}</Math>, alors <Math>{"E[Y] = 0"}</Math> et <Math>{"V(Y) = 1"}</Math>.
        </p>

        <p className="mb-2"><strong>P3 — Somme de VA :</strong></p>
        <FormulaBox>{"V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Si X et Y indépendantes : <Math>{"V(X+Y) = V(X) + V(Y)"}</Math></p>

        <p className="mb-2"><strong>P4 — La variance minimise E[(X-c)²] :</strong></p>
        <FormulaBox>{"E[(X-c)^2] = V(X) + (m-c)^2 \\geq V(X)"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">L'égalité est atteinte quand c = m = E[X].</p>

        <p className="mb-2"><strong>P5 — Variance d'une moyenne :</strong></p>
        <p className="pl-4">Si <Math>{"X_1, ..., X_n"}</Math> indépendantes avec <Math>{"V(X_i) = \\sigma^2"}</Math> :</p>
        <FormulaBox>{"V(\\bar{X}) = \\frac{\\sigma^2}{n}"}</FormulaBox>
      </Section>

      <Section type="formule" title="VI. La Covariance">
        <p className="mb-4">
          La <strong>covariance</strong> mesure le lien linéaire entre deux VA. Si elle est positive, X et Y varient dans le même sens.
        </p>

        <FormulaBox label="Covariance" highlight>{"Cov(X,Y) = E[XY] - E[X]E[Y]"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          La covariance détecte si deux variables "bougent ensemble". 
          Cov {'>'} 0 : quand X augmente, Y tend à augmenter aussi.
          Cov {'<'} 0 : quand X augmente, Y tend à diminuer.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemples :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Cov {'>'} 0 :</strong> Taille et poids d'une personne</li>
          <li><strong>Cov {'<'} 0 :</strong> Heures de révision et nombre d'erreurs</li>
          <li><strong>Cov ≈ 0 :</strong> Taille et note à un examen</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Propriétés :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"Cov(aX, bY) = ab \\cdot Cov(X,Y)"}</Math></li>
          <li>Si X et Y indépendantes : <Math>{"Cov(X,Y) = 0"}</Math></li>
        </ul>

        <Callout type="warning" title="Attention">
          Cov(X,Y) = 0 n'implique PAS que X et Y sont indépendantes ! L'implication inverse est fausse.
        </Callout>

        <p className="mt-4 mb-2"><strong>P3 — Additivité :</strong></p>
        <FormulaBox>{"Cov(X+Z, Y) = Cov(X,Y) + Cov(Z,Y)"}</FormulaBox>
      </Section>

      <Section type="formule" title="Écart Absolu Moyen">
        <p className="mb-4">
          L'<strong>écart absolu moyen</strong> est une autre mesure de dispersion, moins sensible aux valeurs extrêmes que la variance.
        </p>

        <p className="mb-2"><strong>Par rapport à la moyenne :</strong> <Math>{"E[|X - E[X]|]"}</Math></p>
        <p className="mb-2"><strong>Par rapport à la médiane :</strong> <Math>{"E[|X - x_{med}|]"}</Math></p>

        <p className="mt-4">
          L'écart absolu moyen par rapport à la médiane minimise <Math>{"E[|X-a|]"}</Math> :
        </p>
        <FormulaBox>{"E[|X-a|] \\geq E[|X-x_{med}|]"}</FormulaBox>
      </Section>

      <Section type="key" title="VII. Inégalité de Markov">
        <p className="mb-4">
          Cette inégalité donne une borne supérieure sur la probabilité qu'une VA positive dépasse un seuil. Elle ne nécessite que la connaissance de l'espérance.
        </p>

        <FormulaBox label="Inégalité de Markov" highlight>{"P(X \\geq t) \\leq \\frac{E[X]}{t} \\quad \\text{pour } X \\geq 0, t > 0"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          Si la moyenne d'une classe est 10/20, alors au plus 50% des élèves peuvent avoir 20/20. 
          Markov dit que la proportion au-dessus d'un seuil est limitée par le rapport moyenne/seuil.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemple :</strong></p>
        <p className="pl-4 text-sm mb-4">
          Le temps moyen d'attente à un guichet est 5 min. Quelle est la probabilité d'attendre plus de 20 min ?
          <br/>Par Markov : <Math>{"P(X \\geq 20) \\leq \\frac{5}{20} = 25\\%"}</Math>
        </p>

        <p className="mt-4"><strong>Condition :</strong> X doit être à valeurs positives.</p>
      </Section>

      <Section type="key" title="VIII. Inégalité de Bienaymé-Tchebychev">
        <p className="mb-4">
          Cette inégalité est plus précise que Markov car elle utilise aussi la variance. Elle borne la probabilité de s'écarter de la moyenne.
        </p>

        <p className="mb-2"><strong>Forme majorant :</strong></p>
        <FormulaBox highlight>{"P(|X - E[X]| \\geq \\varepsilon) \\leq \\frac{V(X)}{\\varepsilon^2}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Forme minorant :</strong></p>
        <FormulaBox>{"P(|X - E[X]| < \\varepsilon) \\geq 1 - \\frac{V(X)}{\\varepsilon^2}"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          Plus la variance est petite, plus les valeurs sont concentrées autour de la moyenne. 
          Bienaymé-Tchebychev quantifie cette concentration : avec k écarts-types, au moins 1-1/k² des valeurs sont dans l'intervalle.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemple — Contrôle qualité :</strong></p>
        <p className="pl-4 text-sm mb-4">
          Une machine produit des pièces de 10 cm en moyenne avec σ = 0.1 cm. 
          Quelle proportion de pièces est dans l'intervalle [9.8, 10.2] cm ?
          <br/>ε = 0.2 = 2σ, donc <Math>{"P(|X-10| < 0.2) \\geq 1 - \\frac{0.01}{0.04} = 75\\%"}</Math>
        </p>

        <p className="mt-4 mb-4">
          <strong>Démonstration :</strong> On applique Markov à <Math>{"Y = (X - E[X])^2"}</Math> avec <Math>{"t = \\varepsilon^2"}</Math>.
        </p>

        <Callout type="tip" title="Utilisation">
          Bienaymé-Tchebychev est utile quand on ne connaît pas la loi exacte mais seulement E[X] et V(X). La borne est souvent pessimiste mais toujours valide.
        </Callout>
      </Section>

      <Section type="formule" title="IX. Fonction Génératrice">
        <p className="mb-4">
          La <strong>fonction génératrice</strong> encode toute l'information sur une VA discrète à valeurs entières. Ses dérivées donnent les moments factoriels.
        </p>

        <FormulaBox label="Fonction génératrice" highlight>{"G_X(u) = E[u^X] = \\sum_x u^x P(X=x)"}</FormulaBox>

        <Callout type="insight" title="Pourquoi utiliser G(u) ?">
          La fonction génératrice transforme des sommes compliquées en produits simples. 
          Pour une somme de VA indépendantes : <Math>{"G_{X+Y}(u) = G_X(u) \\cdot G_Y(u)"}</Math>. 
          C'est beaucoup plus simple que de calculer la convolution des lois !
        </Callout>

        <p className="mt-4 mb-2"><strong>Obtention des moments factoriels :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"G_X(1) = 1"}</Math></li>
          <li><Math>{"G'_X(1) = M_{[1]} = E[X]"}</Math></li>
          <li><Math>{"G''_X(1) = M_{[2]} = E[X(X-1)]"}</Math></li>
          <li><Math>{"G^{(k)}_X(1) = M_{[k]}"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Développement en série :</strong></p>
        <p className="mb-4">En posant u = 1+v avec v voisin de 0 :</p>
        <FormulaBox>{"G_X(1+v) = 1 + \\frac{v}{1!}M_{[1]} + \\frac{v^2}{2!}M_{[2]} + ... + \\frac{v^k}{k!}M_{[k]} + ..."}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Le coefficient de <Math>{"\\frac{v^k}{k!}"}</Math> est le moment factoriel d'ordre k.</p>
      </Section>

      <Section type="formule" title="X. Fonction Caractéristique">
        <p className="mb-4">
          La <strong>fonction caractéristique</strong> généralise la fonction génératrice. Elle identifie complètement une VA et est très utile pour les sommes de VA indépendantes.
        </p>

        <FormulaBox label="Fonction caractéristique" highlight>{"\\varphi_X(t) = E[e^{itX}]"}</FormulaBox>

        <Callout type="insight" title="Pourquoi les nombres complexes ?">
          La fonction caractéristique existe toujours (contrairement à G qui peut diverger). 
          Elle est comme une "empreinte digitale" de la loi : deux VA ont la même loi si et seulement si 
          elles ont la même fonction caractéristique.
        </Callout>

        <p className="mt-4 mb-2"><strong>Propriétés clés :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"\\varphi_X(t) = G_X(e^{it})"}</Math> (généralisation de G)</li>
          <li>Si X et Y indépendantes : <Math>{"\\varphi_{X+Y}(t) = \\varphi_X(t) \\cdot \\varphi_Y(t)"}</Math></li>
          <li><Math>{"\\varphi_{aX+b}(t) = e^{itb} \\varphi_X(at)"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Obtention des moments non-centrés :</strong></p>
        <FormulaBox>{"\\varphi_X(t) = 1 + itm_1 + \\frac{(it)^2}{2!}m_2 + ... + \\frac{(it)^k}{k!}m_k + ..."}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Le coefficient de <Math>{"\\frac{(it)^k}{k!}"}</Math> est le moment non-centré d'ordre k.</p>

        <p className="mt-4 mb-2"><strong>Deuxième fonction caractéristique :</strong></p>
        <FormulaBox>{"\\psi_X(t) = \\ln(\\varphi_X(t))"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300">Utile quand φ se présente sous forme de produit ou puissance.</p>
      </Section>

      <Section type="key" title="XI. Intégrales Eulériennes">
        <p className="mb-4">
          Ces fonctions spéciales apparaissent souvent dans les calculs de moments et les lois continues.
        </p>

        <p className="mb-2"><strong>Fonction Gamma :</strong></p>
        <FormulaBox highlight>{"\\Gamma(a) = \\int_0^{\\infty} t^{a-1} e^{-t} dt \\quad (a > 0)"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Propriétés de Gamma :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"\\Gamma(a) = (a-1) \\cdot \\Gamma(a-1)"}</Math> (récurrence)</li>
          <li><Math>{"\\Gamma(n) = (n-1)!"}</Math> pour n entier</li>
          <li><Math>{"\\Gamma(1) = 1"}</Math>, <Math>{"\\Gamma(1/2) = \\sqrt{\\pi}"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Forme alternative (Forme 2) :</strong></p>
        <FormulaBox>{"\\Gamma(a) = 2 \\int_0^{\\infty} x^{2a-1} e^{-x^2} dx"}</FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Obtenue par le changement de variable t = x²</p>

        <p className="mb-2"><strong>Exemple d'application :</strong></p>
        <p className="pl-4 mb-4">
          <Math>{"\\int_0^{\\infty} x^5 e^{-x^2} dx"}</Math> : On a 2a-1 = 5 ⟹ a = 3, donc 
          <Math>{"= \\frac{1}{2}\\Gamma(3) = \\frac{1}{2}(2!) = 1"}</Math>
        </p>

        <p className="mb-2"><strong>Fonction Beta :</strong></p>
        <FormulaBox>{"B(p,q) = \\int_0^1 t^{p-1}(1-t)^{q-1} dt"}</FormulaBox>
        <FormulaBox highlight>{"B(p,q) = \\frac{\\Gamma(p) \\cdot \\Gamma(q)}{\\Gamma(p+q)}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Exemple d'application :</strong></p>
        <p className="pl-4 mb-4">
          <Math>{"\\int_0^1 t^2(1-t)^4 dt"}</Math> : On a p-1=2 ⟹ p=3 et q-1=4 ⟹ q=5<br/>
          <Math>{"= B(3,5) = \\frac{\\Gamma(3)\\Gamma(5)}{\\Gamma(8)} = \\frac{2! \\times 4!}{7!} = \\frac{1}{105}"}</Math>
        </p>

        <Callout type="warning" title="Piège classique">
          <Math>{"\\Gamma(n) = (n-1)!"}</Math> et non pas n! C'est une erreur très fréquente.
        </Callout>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong><Math>{"V(aX+b) = a^2 V(X)"}</Math></strong> — La constante b disparaît</li>
          <li><strong><Math>{"\\Gamma(n) = (n-1)!"}</Math></strong> — Pas n!</li>
          <li><strong>Bienaymé-Tchebychev</strong> — Attention au sens de l'inégalité</li>
          <li><strong>Cov = 0 ≠ Indépendance</strong> — L'implication inverse est fausse</li>
          <li><strong>Variable centrée réduite</strong> — E[Y] = 0 et V(Y) = 1</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/stats/chapitre-2', label: '← Chapitre 2', title: 'VA Discrètes' }}
        next={{ path: '/stats/chapitre-4', label: 'Chapitre 4 →', title: 'Lois Usuelles' }}
      />
    </main>
  );
}
