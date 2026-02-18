import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter5() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 05"
        title="VA à 2 Dimensions"
        description="Couples de VA, lois conjointes, marginales, conditionnelles, covariance et corrélation."
      />

      <Section type="intuition" title="Introduction">
        <p className="mb-4">
          Jusqu'ici, on étudiait une seule variable aléatoire. Maintenant, on s'intéresse à <strong>deux variables 
          simultanément</strong>. Par exemple : la taille ET le poids d'un individu, ou le temps d'attente ET le 
          nombre de clients.
        </p>

        <Callout type="insight" title="Pourquoi étudier des couples ?">
          Dans la vraie vie, les phénomènes sont rarement isolés. Le prix d'une action dépend du marché global, 
          la note d'un étudiant dépend de son temps de révision, le poids dépend de la taille... 
          Les VA 2D permettent de modéliser ces <strong>relations entre variables</strong>.
        </Callout>

        <p className="mb-4">
          On définit une application V qui associe à chaque événement e un point du plan :
        </p>
        <FormulaBox>{"V(e) = (X(e), Y(e)) \\in \\mathbb{R}^2"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Exemples d'applications :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Médecine :</strong> (Tension systolique, Tension diastolique)</li>
          <li><strong>Finance :</strong> (Rendement action A, Rendement action B)</li>
          <li><strong>Marketing :</strong> (Âge client, Montant dépensé)</li>
          <li><strong>Météo :</strong> (Température, Humidité)</li>
        </ul>

        <p className="mt-4">
          C'est une <strong>VA à deux dimensions</strong> : une application qui, à un événement, fait correspondre 
          un élément dans ℝ².
        </p>
      </Section>

      <Section type="key" title="I. Fonction de Répartition Conjointe">
        <p className="mb-4">
          La fonction de répartition conjointe F(x,y) donne la probabilité que X soit inférieur ou égal à x 
          ET Y inférieur ou égal à y :
        </p>

        <FormulaBox label="Définition" highlight>{"F(x,y) = P[X \\leq x \\text{ et } Y \\leq y]"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Propriétés :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"0 \\leq F(x,y) \\leq 1"}</Math></li>
          <li><Math>{"F(+\\infty, +\\infty) = 1"}</Math></li>
          <li><Math>{"F(x, -\\infty) = F(-\\infty, y) = 0"}</Math></li>
          <li>F(x,y) est non décroissante par rapport à chaque variable</li>
          <li>F(x,y) est continue à droite</li>
        </ul>
      </Section>

      {/* ============ PARTIE 1 : VA DISCRÈTES 2D ============ */}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-[var(--color-text-primary)] border-b pb-2">PARTIE 1 : Variables Aléatoires Discrètes 2D</h2>

      <Section type="key" title="II. Loi de Probabilité Conjointe">
        <p className="mb-4">
          Pour un couple (X,Y) discret, la loi de probabilité est donnée par un <strong>tableau à double entrée</strong>. 
          Chaque case contient la probabilité que X prenne la valeur x_i ET Y prenne la valeur y_j.
        </p>

        <FormulaBox label="Probabilité conjointe">{"p_{ij} = P(X=x_i \\text{ et } Y=y_j)"}</FormulaBox>
        <FormulaBox label="Condition de normalisation">{"\\sum_i \\sum_j p_{ij} = 1"}</FormulaBox>
      </Section>

      <Section type="key" title="III. Distributions Marginales">
        <p className="mb-4">
          Les <strong>lois marginales</strong> sont les lois de X et Y prises séparément. On les obtient en 
          sommant sur l'autre variable. Dans le tableau, ce sont les sommes des lignes et des colonnes.
        </p>

        <Callout type="insight" title="Intuition">
          La marginale, c'est "oublier" une des deux variables. Si tu as un tableau (Âge, Salaire), 
          la marginale de l'âge te donne la distribution des âges sans te soucier du salaire.
          C'est comme projeter un nuage de points sur un axe.
        </Callout>

        <FormulaBox label="Marginale de X" highlight>{"p_{i.} = \\sum_j p_{ij} = P(X=x_i)"}</FormulaBox>
        <FormulaBox label="Marginale de Y" highlight>{"p_{.j} = \\sum_i p_{ij} = P(Y=y_j)"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Espérances marginales :</strong></p>
        <FormulaBox>{"E[X] = \\sum_i x_i \\cdot p_{i.}"}</FormulaBox>
        <FormulaBox>{"E[Y] = \\sum_j y_j \\cdot p_{.j}"}</FormulaBox>
      </Section>

      <Section type="key" title="IV. Distributions Conditionnelles">
        <p className="mb-4">
          La <strong>loi conditionnelle</strong> de Y sachant X=x_i donne la distribution de Y quand on sait 
          que X vaut x_i. C'est une application directe de la formule de Bayes.
        </p>

        <Callout type="insight" title="Intuition">
          La loi conditionnelle répond à : "Si je sais que X = 2, comment se comporte Y ?"
          Exemple : "Sachant qu'un client a 25 ans, quelle est la distribution de ses dépenses ?"
          On "zoome" sur une tranche de la population.
        </Callout>

        <FormulaBox label="Y sachant X=xᵢ" highlight>{"P(Y=y_j | X=x_i) = \\frac{p_{ij}}{p_{i.}} = p_j^i"}</FormulaBox>
        <FormulaBox label="X sachant Y=yⱼ" highlight>{"P(X=x_i | Y=y_j) = \\frac{p_{ij}}{p_{.j}} = p_i^j"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Relations importantes :</strong></p>
        <FormulaBox>{"p_{ij} = p_j^i \\cdot p_{i.} = p_i^j \\cdot p_{.j}"}</FormulaBox>
      </Section>

      <Section type="key" title="V. Indépendance">
        <p className="mb-4">
          X et Y sont <strong>indépendantes</strong> si connaître la valeur de l'une n'apporte aucune information 
          sur l'autre. Mathématiquement, cela se traduit par la factorisation de la loi conjointe.
        </p>

        <FormulaBox label="Critère d'indépendance" highlight>{"X \\perp Y \\Leftrightarrow p_{ij} = p_{i.} \\cdot p_{.j} \\quad \\forall i,j"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Conséquences de l'indépendance :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"F(x,y) = F_X(x) \\cdot F_Y(y)"}</Math></li>
          <li><Math>{"V(X+Y) = V(X) + V(Y)"}</Math></li>
          <li><Math>{"E[XY] = E[X] \\cdot E[Y]"}</Math></li>
          <li><Math>{"Cov(X,Y) = 0"}</Math></li>
        </ul>

        <Callout type="warning" title="Attention">
          Cov(X,Y) = 0 n'implique PAS l'indépendance ! La réciproque est vraie : indépendance ⟹ Cov = 0.
        </Callout>
      </Section>

      <Section type="formule" title="VI. Espérance d'un Couple">
        <p className="mb-4">
          On peut calculer l'espérance de n'importe quelle fonction W(X,Y) du couple.
        </p>

        <FormulaBox label="Espérance d'une fonction">{"E[W(X,Y)] = \\sum_i \\sum_j W(x_i, y_j) \\cdot p_{ij}"}</FormulaBox>
        <FormulaBox label="Espérance de la somme">{"E[X+Y] = E[X] + E[Y]"}</FormulaBox>
        <FormulaBox label="Espérance du produit">{"E[XY] = \\sum_i \\sum_j x_i y_j \\cdot p_{ij}"}</FormulaBox>

        <p className="mt-4">
          <strong>Si X et Y indépendantes :</strong> <Math>{"E[XY] = E[X] \\cdot E[Y]"}</Math>
        </p>
      </Section>

      <Section type="key" title="VII. Variance de la Somme">
        <FormulaBox label="Variance de X+Y" highlight>{"V[X+Y] = V(X) + V(Y) + 2Cov(X,Y)"}</FormulaBox>
        <FormulaBox label="Variance de X-Y" highlight>{"V[X-Y] = V(X) + V(Y) - 2Cov(X,Y)"}</FormulaBox>

        <p className="mt-4">
          <strong>Si X et Y indépendantes :</strong> <Math>{"V[X \\pm Y] = V(X) + V(Y)"}</Math>
        </p>
      </Section>

      <Section type="formule" title="VIII. Moments">
        <FormulaBox label="Moments non centrés d'ordre (m,n)">{"M_{mn} = E[X^m Y^n] = \\sum_i \\sum_j x_i^m y_j^n \\cdot p_{ij}"}</FormulaBox>
        <FormulaBox label="Moments centrés d'ordre (m,n)">{"\\mu_{mn} = E[(X-E[X])^m (Y-E[Y])^n]"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Cas particuliers importants :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"\\mu_{20} = V(X)"}</Math></li>
          <li><Math>{"\\mu_{02} = V(Y)"}</Math></li>
          <li><Math>{"\\mu_{11} = Cov(X,Y)"}</Math></li>
        </ul>
      </Section>

      <Section type="key" title="IX. Covariance et Corrélation">
        <FormulaBox label="Covariance" highlight>{"Cov(X,Y) = E[XY] - E[X] \\cdot E[Y] = \\mu_{11}"}</FormulaBox>
        <FormulaBox label="Coefficient de corrélation" highlight>{"\\rho_{XY} = \\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y} = \\frac{\\mu_{11}}{\\sqrt{\\mu_{20}} \\sqrt{\\mu_{02}}}"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          Le coefficient ρ est la covariance "normalisée" entre -1 et 1. 
          ρ = 0.8 signifie une forte corrélation positive (quand X augmente, Y augmente aussi).
          ρ = -0.9 signifie une forte corrélation négative (quand X augmente, Y diminue).
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemples de corrélations :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>ρ ≈ 0.9 :</strong> Taille et poids d'adultes</li>
          <li><strong>ρ ≈ -0.7 :</strong> Heures de révision et nombre d'erreurs</li>
          <li><strong>ρ ≈ 0 :</strong> Taille et QI</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Propriétés de ρ :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"-1 \\leq \\rho_{XY} \\leq 1"}</Math></li>
          <li>|ρ| = 1 ⟺ liaison linéaire parfaite (Y = aX + b)</li>
          <li>ρ = 0 ⟺ pas de liaison linéaire</li>
        </ul>
      </Section>

      <Section type="formule" title="X. Fonction Caractéristique">
        <FormulaBox>{"\\varphi_{XY}(t_1, t_2) = E[e^{i(t_1 X + t_2 Y)}] = \\sum_i \\sum_j e^{i(t_1 x_i + t_2 y_j)} \\cdot p_{ij}"}</FormulaBox>

        <p className="mt-4">
          <strong>Si X,Y indépendantes :</strong> <Math>{"\\varphi_{XY}(t_1, t_2) = \\varphi_X(t_1) \\cdot \\varphi_Y(t_2)"}</Math>
        </p>
      </Section>

      <Section type="formule" title="XI. Courbe de Régression">
        <p className="mb-4">
          La <strong>courbe de régression</strong> de Y en X donne l'espérance de Y pour chaque valeur de X.
        </p>

        <Callout type="insight" title="Intuition">
          La régression répond à : "En moyenne, quelle valeur de Y attend-on pour un X donné ?"
          Exemple : "En moyenne, quel salaire pour quelqu'un avec 5 ans d'expérience ?"
          C'est la base de la prédiction statistique.
        </Callout>

        <FormulaBox label="Régression de Y en X">{"E[Y|X=x_i] = \\sum_j y_j \\cdot p_j^i"}</FormulaBox>
        <FormulaBox label="Régression de X en Y">{"E[X|Y=y_j] = \\sum_i x_i \\cdot p_i^j"}</FormulaBox>
      </Section>

      {/* ============ PARTIE 2 : VA CONTINUES 2D ============ */}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-[var(--color-text-primary)] border-b pb-2">PARTIE 2 : Variables Aléatoires Continues 2D</h2>

      <Section type="key" title="XII. Densité de Probabilité Conjointe">
        <p className="mb-4">
          Pour un couple (X,Y) continu, on définit une <strong>densité f(x,y)</strong> sur un domaine D du plan.
        </p>

        <Callout type="insight" title="Intuition">
          La densité f(x,y) est comme une "carte de chaleur" : plus f(x,y) est grand en un point, 
          plus il est probable que (X,Y) soit proche de ce point. L'intégrale sur une région 
          donne la probabilité d'être dans cette région.
        </Callout>

        <FormulaBox label="Relation avec F(x,y)">{"f(x,y) = \\frac{\\partial^2 F(x,y)}{\\partial x \\partial y}"}</FormulaBox>
        <FormulaBox label="Condition de normalisation" highlight>{"\\iint_D f(x,y) \\, dx \\, dy = 1"}</FormulaBox>
        <FormulaBox label="Probabilité élémentaire">{"P[x \\leq X < x+dx, y \\leq Y < y+dy] = f(x,y) \\, dx \\, dy"}</FormulaBox>
      </Section>

      <Section type="key" title="XIII. Calcul des Intégrales Doubles">
        <p className="mb-4">
          Le calcul d'une intégrale double se fait en deux étapes. L'ordre d'intégration dépend du domaine.
          <strong>C'est l'étape la plus délicate du chapitre.</strong>
        </p>

        <p className="mb-2"><strong>Méthode 1 : Bloquer x, intégrer sur y</strong></p>
        <FormulaBox>{"\\int_{x_{inf}}^{x_{sup}} \\left[\\int_{y_{inf}(x)}^{y_{sup}(x)} f(x,y) \\, dy\\right] dx"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Méthode 2 : Bloquer y, intégrer sur x</strong></p>
        <FormulaBox>{"\\int_{y_{inf}}^{y_{sup}} \\left[\\int_{x_{inf}(y)}^{x_{sup}(y)} f(x,y) \\, dx\\right] dy"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Cas particulier (domaine rectangle) :</strong></p>
        <p className="mb-4">Si D = [a,b] × [c,d] et f(x,y) = g(x)·h(y) :</p>
        <FormulaBox>{"\\iint_D f(x,y) \\, dx \\, dy = \\left[\\int_a^b g(x) \\, dx\\right] \\cdot \\left[\\int_c^d h(y) \\, dy\\right]"}</FormulaBox>
      </Section>

      <Section type="formule" title="XIV. Changement de Variable">
        <p className="mb-4">
          Pour simplifier certaines intégrales, on peut changer de variables. Le <strong>Jacobien</strong> mesure 
          la "déformation" du domaine.
        </p>

        <Callout type="insight" title="Intuition">
          Le Jacobien est un "facteur de correction" quand on change de coordonnées. 
          En passant aux coordonnées polaires (r, θ), le Jacobien vaut r, d'où le fameux "r dr dθ".
          Il compense le fait que les "petits carrés" deviennent des "petits secteurs".
        </Callout>

        <FormulaBox>{"\\iint_D f(x,y) \\, dx \\, dy = \\iint_{\\Delta} g(u,v) |J| \\, du \\, dv"}</FormulaBox>

        <FormulaBox label="Jacobien" highlight>{"J = \\det \\begin{pmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{pmatrix}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Exemple — Coordonnées polaires :</strong></p>
        <p className="pl-4 text-sm">
          x = r cos(θ), y = r sin(θ) → J = r, donc dx dy = r dr dθ
        </p>
      </Section>

      <Section type="key" title="XV. Distributions Marginales (Continue)">
        <p className="mb-4">
          Pour obtenir la loi marginale de X, on "intègre" Y sur tout son domaine.
        </p>

        <FormulaBox label="Marginale de X" highlight>{"f_X(x) = \\int_{-\\infty}^{+\\infty} f(x,y) \\, dy"}</FormulaBox>
        <FormulaBox label="Marginale de Y" highlight>{"f_Y(y) = \\int_{-\\infty}^{+\\infty} f(x,y) \\, dx"}</FormulaBox>

        <Callout type="warning" title="Attention aux bornes !">
          Les bornes d'intégration dépendent du domaine D. Si le domaine est y ≤ x avec 0 ≤ x ≤ a, 
          alors pour calculer f_X(x), on intègre y de 0 à x (pas de 0 à a !).
        </Callout>
      </Section>

      <Section type="key" title="XVI. Distributions Conditionnelles (Continue)">
        <FormulaBox label="Y sachant X=x" highlight>{"f_{Y|X}(y|x) = \\frac{f(x,y)}{f_X(x)} \\quad \\text{si } f_X(x) > 0"}</FormulaBox>
        <FormulaBox label="X sachant Y=y" highlight>{"f_{X|Y}(x|y) = \\frac{f(x,y)}{f_Y(y)} \\quad \\text{si } f_Y(y) > 0"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Espérances conditionnelles :</strong></p>
        <FormulaBox>{"E[Y|X=x] = \\int_Y y \\cdot f_{Y|X}(y|x) \\, dy"}</FormulaBox>
        <FormulaBox>{"E[X|Y=y] = \\int_X x \\cdot f_{X|Y}(x|y) \\, dx"}</FormulaBox>
      </Section>

      <Section type="key" title="XVII. Indépendance (Continue)">
        <p className="mb-2"><strong>Critères équivalents d'indépendance :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><Math>{"f(x,y) = f_X(x) \\cdot f_Y(y)"}</Math></li>
          <li><Math>{"F(x,y) = F_X(x) \\cdot F_Y(y)"}</Math></li>
          <li><Math>{"f_{Y|X}(y|x) = f_Y(y)"}</Math></li>
          <li><Math>{"f_{X|Y}(x|y) = f_X(x)"}</Math></li>
          <li><Math>{"D = D_X \\times D_Y"}</Math> (domaine rectangle)</li>
        </ul>

        <Callout type="insight" title="Astuce pratique">
          Si le domaine D n'est pas un rectangle (ex: y ≤ x), alors X et Y ne sont PAS indépendantes !
        </Callout>
      </Section>

      <Section type="formule" title="XVIII. Espérance et Variance (Continue)">
        <FormulaBox label="Espérance de la somme">{"E[X+Y] = E[X] + E[Y]"}</FormulaBox>
        <FormulaBox label="Espérance du produit">{"E[XY] = \\iint_D xy \\cdot f(x,y) \\, dx \\, dy"}</FormulaBox>
        <FormulaBox label="Variance de la somme" highlight>{"V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)"}</FormulaBox>
      </Section>

      <Section type="formule" title="XIX. Moments et Covariance (Continue)">
        <FormulaBox label="Moments non-centrés">{"m_{mn} = E[X^m Y^n] = \\iint_D x^m y^n \\cdot f(x,y) \\, dx \\, dy"}</FormulaBox>
        <FormulaBox label="Moments centrés">{"\\mu_{mn} = E[(X-E[X])^m (Y-E[Y])^n]"}</FormulaBox>
        <FormulaBox label="Covariance">{"\\mu_{11} = Cov(X,Y) = E[XY] - E[X] \\cdot E[Y]"}</FormulaBox>
      </Section>

      <Section type="formule" title="XX. Fonction Caractéristique (Continue)">
        <FormulaBox>{"\\Phi_{X,Y}(t_1, t_2) = E[e^{i(t_1 X + t_2 Y)}] = \\iint_D e^{i(t_1 x + t_2 y)} \\cdot f(x,y) \\, dx \\, dy"}</FormulaBox>

        <p className="mt-4">
          <strong>Si X,Y indépendantes :</strong> <Math>{"\\Phi_{X,Y}(t_1, t_2) = \\Phi_X(t_1) \\cdot \\Phi_Y(t_2)"}</Math>
        </p>
      </Section>

      <Section type="formule" title="XXI. Courbe de Régression (Continue)">
        <FormulaBox label="Régression de Y en X">{"E[Y|X=x] = \\int_Y y \\cdot f_{Y|X}(y|x) \\, dy"}</FormulaBox>
        <FormulaBox label="Régression de X en Y">{"E[X|Y=y] = \\int_X x \\cdot f_{X|Y}(x|y) \\, dx"}</FormulaBox>
      </Section>

      {/* ============ MÉTHODES ET EXEMPLES ============ */}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-[var(--color-text-primary)] border-b pb-2">Méthodes et Exemples</h2>

      <Section type="key" title="XXII. Méthode : Trouver la constante k">
        <p className="mb-4">
          En exercice, on donne souvent f(x,y) = k·g(x,y) et on demande de trouver k. Voici la méthode :
        </p>

        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>Identifier le domaine D</strong> — Dessiner si possible !</li>
          <li><strong>Écrire la condition</strong> : <Math>{"\\iint_D f(x,y) \\, dx \\, dy = 1"}</Math></li>
          <li><strong>Déterminer les bornes</strong> — C'est l'étape critique</li>
          <li><strong>Calculer l'intégrale double</strong></li>
          <li><strong>Résoudre pour k</strong></li>
        </ol>

        <Callout type="warning" title="Piège classique">
          Si le domaine est y ≤ x avec 0 ≤ x ≤ a, alors quand tu intègres sur y d'abord, les bornes sont 0 à x (pas 0 à a !).
        </Callout>
      </Section>

      <Section type="key" title="XXIII. Exemple Résolu Type Partiel">
        <p className="mb-4">
          Soit (X, Y) de densité <Math>{"f(x, y) = kxy^2"}</Math> sur <Math>{"D = \\{0 \\leq y \\leq x, 0 \\leq x \\leq 3\\}"}</Math>
        </p>

        <p className="font-semibold mb-2">1. Trouver k :</p>
        <p className="mb-2 pl-4">Domaine D : Triangle avec sommets (0,0), (3,0), (3,3)</p>
        <p className="mb-2 pl-4">On intègre d'abord sur y (de 0 à x), puis sur x (de 0 à 3) :</p>
        <p className="mb-4 pl-4"><Math>{"\\int_0^3 \\int_0^x kxy^2 \\, dy \\, dx = k \\int_0^3 x \\cdot \\frac{x^3}{3} \\, dx = \\frac{k}{3} \\cdot \\frac{3^5}{5} = \\frac{81k}{5} = 1"}</Math></p>
        <p className="mb-4 pl-4">Donc <Math>{"k = \\frac{5}{81}"}</Math></p>

        <p className="font-semibold mb-2">2. Loi marginale de X :</p>
        <p className="mb-2 pl-4">On intègre y de 0 à x :</p>
        <p className="mb-4 pl-4"><Math>{"f_X(x) = \\int_0^x \\frac{5}{81} xy^2 \\, dy = \\frac{5x}{81} \\cdot \\frac{x^3}{3} = \\frac{5x^4}{243}"}</Math> pour 0 ≤ x ≤ 3</p>

        <p className="font-semibold mb-2">3. Loi conditionnelle Y|X=x :</p>
        <p className="mb-4 pl-4"><Math>{"f_{Y|X=x}(y) = \\frac{f(x,y)}{f_X(x)} = \\frac{\\frac{5}{81}xy^2}{\\frac{5x^4}{243}} = \\frac{3y^2}{x^3}"}</Math> pour 0 ≤ y ≤ x</p>

        <p className="font-semibold mb-2">4. Espérance conditionnelle E(Y|X=x) :</p>
        <p className="pl-4"><Math>{"E(Y|X=x) = \\int_0^x y \\cdot \\frac{3y^2}{x^3} \\, dy = \\frac{3}{x^3} \\cdot \\frac{x^4}{4} = \\frac{3x}{4}"}</Math></p>
      </Section>

      <Section type="key" title="XXIV. Tableau Récapitulatif">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] p-2">Concept</th>
                <th className="border border-[var(--color-border-strong)] p-2">Discret</th>
                <th className="border border-[var(--color-border-strong)] p-2">Continu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Loi conjointe</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"p_{ij}"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"f(x,y)"}</Math></td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Normalisation</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"\\sum_i \\sum_j p_{ij} = 1"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"\\iint f(x,y) dx dy = 1"}</Math></td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Marginale X</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"p_{i.} = \\sum_j p_{ij}"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"f_X(x) = \\int f(x,y) dy"}</Math></td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Conditionnelle Y|X</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"p_j^i = p_{ij}/p_{i.}"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"f_{Y|X} = f(x,y)/f_X(x)"}</Math></td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">Indépendance</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"p_{ij} = p_{i.} \\cdot p_{.j}"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"f = f_X \\cdot f_Y"}</Math></td>
              </tr>
              <tr>
                <td className="border border-[var(--color-border-strong)] p-2 font-semibold">E[XY]</td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"\\sum_i \\sum_j x_i y_j p_{ij}"}</Math></td>
                <td className="border border-[var(--color-border-strong)] p-2"><Math>{"\\iint xy f(x,y) dx dy"}</Math></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section type="warning" title="XXV. Pièges Classiques à Éviter">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Bornes d'intégration</strong> — Si y ≤ x, quand tu intègres sur y, les bornes sont 0 à x !</li>
          <li><strong>Domaine triangulaire</strong> — TOUJOURS dessiner le domaine D avant de calculer</li>
          <li><strong>Ordre d'intégration</strong> — Changer l'ordre change les bornes</li>
          <li><strong>Loi conditionnelle</strong> — N'oublie pas de diviser par f_X(x) !</li>
          <li><strong>Domaine de validité</strong> — Précise toujours pour quelles valeurs la marginale est définie</li>
          <li><strong>Indépendance</strong> — Domaine non-rectangle ⟹ pas indépendantes</li>
          <li><strong>Cov = 0</strong> — N'implique PAS l'indépendance !</li>
          <li><strong>Vérification</strong> — Vérifie que <Math>{"\\int f_X(x) dx = 1"}</Math> après calcul de la marginale</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/stats/chapitre-4', label: '← Chapitre 4', title: 'Lois Usuelles' }}
        next={{ path: '/td', label: 'TD Corrigés →', title: 'Exercices par année' }}
      />
    </main>
  );
}
