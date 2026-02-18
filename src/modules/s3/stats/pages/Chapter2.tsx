import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter2() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 02"
        title="Variables Aléatoires Discrètes"
        description="Définitions, lois de probabilité, espérance, variance et fonctions génératrices."
      />

      <Section type="intuition" title="I. Qu'est-ce qu'une Variable Aléatoire ?">
        <p className="mb-4">
          Une <strong>variable aléatoire</strong> (VA) est une fonction qui transforme le résultat d'une expérience aléatoire en un nombre réel. Par exemple, si on lance deux dés, on peut définir X = "somme des deux dés". X transforme chaque résultat (1,1), (1,2), etc. en un nombre : 2, 3, etc.
        </p>

        <FormulaBox label="Variable aléatoire">{"X : e \\in \\Omega \\to X(e) \\in \\mathbb{R}"}</FormulaBox>

        <p className="mt-4 mb-4">
          L'ensemble des valeurs possibles de X s'appelle l'<strong>ensemble de définition</strong>, noté <Math>{"\\mathcal{X} = \\{x_1, x_2, ..., x_n\\}"}</Math>.
        </p>

        <div className="my-4 p-4 bg-[var(--color-bg-overlay)]/50 rounded-lg">
          <img 
            src="/stats/images/ch2_variable_aleatoire.png" 
            alt="Schéma d'une variable aléatoire X : Ω → ℝ" 
            className="w-full max-w-md mx-auto"
          />
          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-2">Une VA transforme un événement e ∈ Ω en un réel X(e) ∈ ℝ</p>
        </div>

        <p className="mb-2"><strong>Notations :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>X : la variable aléatoire (majuscule)</li>
          <li>x : une valeur particulière (minuscule)</li>
          <li><Math>{"P(X = x)"}</Math> : probabilité que X prenne la valeur x</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Définition formelle :</strong></p>
        <p className="pl-4 text-sm text-[var(--color-text-secondary)]">
          Soit <Math>{"A_x"}</Math> la partie de Ω image inverse de <Math>{"]-\\infty, x["}</Math>. 
          On dit que X est une VA si <Math>{"\\forall A, A_x \\in \\mathcal{F}"}</Math>.
        </p>

        <p className="mt-4 mb-2"><strong>Processus aléatoire :</strong></p>
        <p className="pl-4 text-sm text-[var(--color-text-secondary)]">
          Un <strong>processus aléatoire</strong> (ou stochastique) est une famille de variables aléatoires indicée par le temps.
        </p>
      </Section>

      <Section type="key" title="II. Loi de Probabilité">
        <p className="mb-4">
          La <strong>loi de probabilité</strong> d'une VA discrète associe à chaque valeur possible sa probabilité. C'est le "portrait complet" de la VA.
        </p>

        <p className="mb-4">
          On la note <Math>{"\\{x_i, P_i\\}"}</Math> où <Math>{"P_i = P(X = x_i)"}</Math>. La somme de toutes les probabilités doit valoir 1 :
        </p>

        <FormulaBox label="Condition de normalisation" highlight>{"\\sum_{i=1}^{n} P_i = 1"}</FormulaBox>

        <p className="mt-4 mb-4"><strong>Exemple :</strong> On lance une pièce 2 fois. X = "nombre de faces".</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] p-2">x</th>
                <th className="border border-[var(--color-border-strong)] p-2">0</th>
                <th className="border border-[var(--color-border-strong)] p-2">1</th>
                <th className="border border-[var(--color-border-strong)] p-2">2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"P_x"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2">1/4</td>
                <td className="border border-[var(--color-border-strong)] p-2">1/2</td>
                <td className="border border-[var(--color-border-strong)] p-2">1/4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 p-4 bg-[var(--color-bg-overlay)]/50 rounded-lg">
          <img 
            src="/stats/images/ch2_diagramme_batons.png" 
            alt="Diagramme en bâtons - Loi de probabilité" 
            className="w-full max-w-md mx-auto"
          />
          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-2">Diagramme en bâtons : chaque bâton représente P(X = xᵢ)</p>
        </div>

        <Callout type="insight" title="Important">
          Pour une VA discrète, les probabilités sont attachées à des <strong>points</strong>. Entre ces points, la probabilité est nulle.
        </Callout>
      </Section>

      <Section type="key" title="III. Fonction de Répartition">
        <p className="mb-4">
          La <strong>fonction de répartition</strong> F(x) donne la probabilité que X soit inférieure ou égale à x. Elle "cumule" les probabilités de gauche à droite.
        </p>

        <FormulaBox label="Fonction de répartition" highlight>{"F(x) = P(X \\leq x)"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Propriétés :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"0 \\leq F(x) \\leq 1"}</Math> pour tout x</li>
          <li><Math>{"\\lim_{x \\to -\\infty} F(x) = 0"}</Math> et <Math>{"\\lim_{x \\to +\\infty} F(x) = 1"}</Math></li>
          <li>F est <strong>croissante</strong> : si <Math>{"x_1 \\leq x_2"}</Math> alors <Math>{"F(x_1) \\leq F(x_2)"}</Math></li>
          <li>F est <strong>continue à droite</strong></li>
        </ul>

        <p className="mb-4">Pour une VA discrète, F est une <strong>fonction en escalier</strong> avec des sauts aux valeurs <Math>{"x_i"}</Math>. Le saut en <Math>{"x_i"}</Math> vaut <Math>{"P_i"}</Math>.</p>

        <div className="my-4 p-4 bg-[var(--color-bg-overlay)]/50 rounded-lg">
          <img 
            src="/stats/images/ch2_fonction_repartition.png" 
            alt="Fonction de répartition en escalier" 
            className="w-full max-w-md mx-auto"
          />
          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-2">Fonction de répartition F(x) : fonction en escalier de 0 à 1</p>
        </div>

        <p className="mb-2"><strong>Cas discret :</strong></p>
        <FormulaBox label="Probabilité d'intervalle (discret)">{"P(a < X \\leq b) = F(b) - F(a)"}</FormulaBox>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          ⚠️ En discret, les bornes comptent ! P(a ≤ X ≤ b) ≠ P(a &lt; X ≤ b) car P(X=a) peut être ≠ 0.
        </p>

        <p className="mb-2"><strong>Cas continu :</strong></p>
        <FormulaBox label="Probabilité d'intervalle (continu)" highlight>{"P(a \\leq X \\leq b) = P(a < X < b) = F(b) - F(a)"}</FormulaBox>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          ✓ En continu, les bornes ne changent rien car P(X=x) = 0 pour tout x.
        </p>

        <p className="mt-4 mb-2"><strong>Autres formules utiles :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"P(X > x_0) = 1 - F(x_0)"}</Math></li>
          <li><Math>{"P(X \\geq x_0) = 1 - F(x_0)"}</Math> <span className="text-sm text-[var(--color-text-secondary)]">(en continu uniquement)</span></li>
        </ul>
      </Section>

      <Section type="intuition" title="IV. Typologie des Variables Aléatoires">
        <p className="mb-4">On distingue trois types de VA selon la nature de leur ensemble de définition :</p>
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] p-2">Type</th>
                <th className="border border-[var(--color-border-strong)] p-2">Cardinalité de 𝒳</th>
                <th className="border border-[var(--color-border-strong)] p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Discrète</td>
                <td className="border border-[var(--color-border-strong)] p-2">Fini ou infini dénombrable</td>
                <td className="border border-[var(--color-border-strong)] p-2">Valeurs isolées</td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Continue</td>
                <td className="border border-[var(--color-border-strong)] p-2">Infini (non dénombrable)</td>
                <td className="border border-[var(--color-border-strong)] p-2">Intervalle ou réunion d'intervalles</td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Mixte</td>
                <td className="border border-[var(--color-border-strong)] p-2">Réunion des deux</td>
                <td className="border border-[var(--color-border-strong)] p-2">Partie discrète + partie continue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section type="formule" title="VA Indicatrice (Bernoulli)">
        <p className="mb-4">
          La <strong>variable indicatrice</strong> (ou de Bernoulli) ne prend que deux valeurs : 0 (échec) ou 1 (succès).
        </p>
        
        <Callout type="insight" title="À quoi sert la VA indicatrice ?">
          <p className="text-sm mb-2">
            La VA indicatrice <Math>{"\\mathbf{1}_A"}</Math> "transforme" un événement A en nombre : elle vaut 1 si A se réalise, 0 sinon.
          </p>
          <ul className="list-disc pl-4 text-sm space-y-1">
            <li><strong>Compter :</strong> Si X₁, X₂, ..., Xₙ sont des indicatrices, alors X₁ + X₂ + ... + Xₙ compte le nombre de succès</li>
            <li><strong>Calculer des probas :</strong> E(𝟙ₐ) = P(A), donc l'espérance d'une indicatrice = la probabilité de l'événement</li>
            <li><strong>Simplifier :</strong> Permet de passer d'un problème de probabilités à un problème de calcul d'espérance</li>
          </ul>
        </Callout>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] p-2">x</th>
                <th className="border border-[var(--color-border-strong)] p-2">0</th>
                <th className="border border-[var(--color-border-strong)] p-2">1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"P_x"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2">q = 1-p</td>
                <td className="border border-[var(--color-border-strong)] p-2">p</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-2"><strong>Fonction de répartition :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>x {"<"} 0 : F(x) = 0</li>
          <li>0 ≤ x {"<"} 1 : F(x) = q</li>
          <li>x ≥ 1 : F(x) = 1</li>
        </ul>
        
        <Callout type="warning" title="Attention aux bornes (VA discrète)">
          <p className="text-sm">
            F est <strong>continue à droite</strong> : elle "saute" en x=0 et x=1, et la valeur de F inclut le saut.
          </p>
          <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
            <li><strong>F(0) = q</strong> car on inclut le saut en 0 (P(X=0) = q)</li>
            <li><strong>F(1) = 1</strong> car on inclut le saut en 1 (P(X=1) = p)</li>
            <li><strong>F(0.5) = q</strong> car entre 0 et 1, pas de nouveau saut</li>
            <li><strong>F(0⁻) = 0</strong> (juste avant le saut en 0)</li>
          </ul>
          <p className="text-sm mt-2">
            C'est pourquoi on écrit "0 ≤ x <strong>{"<"}</strong> 1" et non "0 ≤ x ≤ 1" : si x=1, on passe à F(x)=1.
          </p>
        </Callout>
      </Section>

      <Section type="formule" title="VA Certaine">
        <p className="mb-4">
          Une <strong>VA certaine</strong> est une VA qui associe à tout élément e de Ω le même nombre a.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"P(X = a) = 1"}</Math></li>
          <li><Math>{"P(X \\neq a) = 0"}</Math></li>
        </ul>
      </Section>

      <Section type="key" title="V. Espérance Mathématique">
        <p className="mb-4">
          L'<strong>espérance</strong> E(X) est la moyenne pondérée des valeurs possibles par leurs probabilités. C'est la valeur "attendue" en moyenne si on répète l'expérience un grand nombre de fois.
        </p>

        <FormulaBox label="Espérance" highlight>{"E(X) = \\sum_{i=1}^{n} x_i \\cdot P_i"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          L'espérance est le "centre de gravité" de la distribution. Si vous jouez à un jeu de hasard 
          un million de fois, votre gain moyen par partie convergera vers l'espérance.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemples d'applications :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Assurance :</strong> Prime = E[coût des sinistres] + marge</li>
          <li><strong>Casino :</strong> Espérance négative pour le joueur → le casino gagne toujours à long terme</li>
          <li><strong>Finance :</strong> Rendement espéré d'un portefeuille</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Propriétés de l'espérance :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Linéarité</strong> : <Math>{"E(aX + b) = aE(X) + b"}</Math></li>
          <li><strong>Additivité</strong> (toujours vraie) : <Math>{"E(X + Y) = E(X) + E(Y)"}</Math></li>
          <li><strong>Produit</strong> (si indépendantes) : <Math>{"E(XY) = E(X) \\cdot E(Y)"}</Math></li>
        </ul>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          ⚠️ Si X et Y ne sont pas indépendantes, E(XY) ≠ E(X)·E(Y) en général. On verra au CH5 que E(XY) = E(X)·E(Y) + Cov(X,Y).
        </p>

        <p className="mb-4"><strong>Exemple (Bernoulli) :</strong> X ∈ {"{0, 1}"} avec P(X=1) = p</p>
        <p><Math>{"E(X) = 0 \\times (1-p) + 1 \\times p = p"}</Math></p>
      </Section>

      <Section type="key" title="VI. Variance et Écart-Type">
        <p className="mb-4">
          La <strong>variance</strong> mesure la dispersion des valeurs autour de l'espérance. Plus la variance est grande, plus les valeurs sont "étalées".
        </p>

        <FormulaBox label="Variance (définition)">{"V(X) = E[(X - E(X))^2]"}</FormulaBox>
        <FormulaBox label="Variance (formule de calcul)" highlight>{"V(X) = E(X^2) - [E(X)]^2"}</FormulaBox>
        <FormulaBox label="Écart-type">{"\\sigma(X) = \\sqrt{V(X)}"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          La variance mesure le "risque" ou l'incertitude. Deux investissements avec la même espérance 
          de gain peuvent avoir des variances très différentes : l'un stable, l'autre très volatile.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemples d'applications :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Finance :</strong> La variance mesure le risque d'un actif</li>
          <li><strong>Contrôle qualité :</strong> Variance faible = production homogène</li>
          <li><strong>Météo :</strong> Variance des températures = variabilité climatique</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Propriétés de la variance :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Math>{"V(aX + b) = a^2 V(X)"}</Math> — La constante b disparaît !</li>
          <li>Si X et Y indépendantes : <Math>{"V(X + Y) = V(X) + V(Y)"}</Math></li>
        </ul>

        <Callout type="warning" title="Piège classique">
          <Math>{"E(X^2) \\neq [E(X)]^2"}</Math> — Ne jamais confondre ! La variance est justement la différence entre les deux.
        </Callout>
      </Section>

      <Section type="formule" title="VII. Moments">
        <p className="mb-4">
          Les <strong>moments</strong> sont des caractéristiques numériques qui décrivent la forme de la distribution.
        </p>

        <p className="mb-2"><strong>Moment non centré d'ordre k :</strong></p>
        <FormulaBox>{"m_k = E(X^k) = \\sum_{i} x_i^k \\cdot P_i"}</FormulaBox>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Note : <Math>{"m_1 = E(X)"}</Math></p>

        <p className="mb-2"><strong>Moment centré d'ordre k :</strong></p>
        <FormulaBox>{"\\mu_k = E[(X - E(X))^k]"}</FormulaBox>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Note : <Math>{"\\mu_2 = V(X)"}</Math></p>

        <p className="mb-2"><strong>Relation fondamentale :</strong></p>
        <FormulaBox highlight>{"V(X) = \\mu_2 = m_2 - m_1^2"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Moment factoriel d'ordre k :</strong></p>
        <FormulaBox>{"M_{[k]} = E[X(X-1)(X-2)...(X-k+1)]"}</FormulaBox>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">Utilisé pour les VA discrètes à valeurs entières (0, 1, 2, ...).</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><Math>{"M_{[1]} = E(X) = m_1"}</Math></li>
          <li><Math>{"M_{[2]} = E[X(X-1)] = E(X^2) - E(X) = m_2 - m_1"}</Math></li>
        </ul>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
          Les moments factoriels sont obtenus facilement via la fonction génératrice : <Math>{"M_{[k]} = g_X^{(k)}(1)"}</Math>
        </p>
      </Section>

      <Section type="intuition" title="VIII. Mode et Médiane">
        <p className="mb-4">
          Le <strong>mode</strong> est la valeur la plus probable (où <Math>{"P_i"}</Math> est maximum). Une distribution peut avoir plusieurs modes.
        </p>

        <p className="mb-4">
          La <strong>médiane</strong> est la valeur qui partage la distribution en deux parties égales : <Math>{"P(X \\leq x_{med}) \\geq 0.5"}</Math> et <Math>{"P(X \\geq x_{med}) \\geq 0.5"}</Math>.
        </p>

        <Callout type="tip" title="À retenir">
          Pour une distribution symétrique : Mode = Médiane = Moyenne. Pour une distribution asymétrique, ces trois valeurs sont différentes.
        </Callout>
      </Section>

      <Section type="key" title="IX. Fonction Génératrice">
        <p className="mb-4">
          La <strong>fonction génératrice</strong> est un outil puissant pour calculer les moments. Elle "encode" toute l'information sur la VA.
        </p>

        <FormulaBox label="Fonction génératrice" highlight>{"g_X(u) = E(u^X) = \\sum_{i} P_i \\cdot u^{x_i}"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          La fonction génératrice est comme un "code-barres" de la VA : elle contient toute l'information 
          de manière compacte. En la dérivant, on "décode" les moments un par un.
        </Callout>

        <p className="mt-4 mb-2"><strong>Propriétés clés :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Math>{"g_X(1) = 1"}</Math> (normalisation)</li>
          <li><Math>{"g'_X(1) = E(X)"}</Math> — La dérivée en 1 donne l'espérance</li>
          <li><Math>{"g''_X(1) = E[X(X-1)]"}</Math> — Permet de calculer la variance</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Exemple — Bernoulli :</strong></p>
        <p className="pl-4 text-sm">
          <Math>{"g_X(u) = q + pu"}</Math>, donc <Math>{"g'_X(u) = p"}</Math> et <Math>{"g'_X(1) = p = E[X]"}</Math> ✓
        </p>
      </Section>

      <Section type="formule" title="X. Fonction Caractéristique">
        <p className="mb-4">
          La <strong>fonction caractéristique</strong> généralise la fonction génératrice aux nombres complexes. Elle identifie complètement une VA.
        </p>

        <FormulaBox label="Fonction caractéristique" highlight>{"\\varphi_X(t) = E(e^{itX}) = \\sum_{i} P_i \\cdot e^{itx_i}"}</FormulaBox>

        <p className="mt-4">où <Math>{"i"}</Math> est le nombre imaginaire (<Math>{"i^2 = -1"}</Math>).</p>
      </Section>

      <Section type="key" title="Méthode type pour un exercice">
        <ol className="list-decimal pl-6 space-y-2">
          <li>Vérifier que <Math>{"\\sum P_i = 1"}</Math> (trouver la constante si besoin)</li>
          <li>Calculer <Math>{"E(X) = \\sum x_i P_i"}</Math></li>
          <li>Calculer <Math>{"E(X^2) = \\sum x_i^2 P_i"}</Math></li>
          <li>Calculer <Math>{"V(X) = E(X^2) - [E(X)]^2"}</Math></li>
          <li>Mode : repérer le max des <Math>{"P_i"}</Math></li>
          <li>Médiane : trouver où F(x) atteint 0.5</li>
        </ol>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong><Math>{"E(X^2) \\neq [E(X)]^2"}</Math></strong> — Erreur très fréquente !</li>
          <li><strong><Math>{"V(aX + b) = a^2 V(X)"}</Math></strong> — La constante b disparaît</li>
          <li><strong><Math>{"g'_X(1) = E(X)"}</Math></strong> — C'est en u=1, pas en u=0</li>
          <li><strong>Mode ≠ Moyenne</strong> — Le mode est la valeur la plus probable</li>
          <li><strong>Fonction de répartition</strong> — C'est une fonction en escalier pour les VA discrètes</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/stats/chapitre-1', label: '← Chapitre 1', title: 'Probabilités & Algèbre de Boole' }}
        next={{ path: '/stats/chapitre-3', label: 'Chapitre 3 →', title: 'Caractéristiques des VA' }}
      />
    </main>
  );
}
