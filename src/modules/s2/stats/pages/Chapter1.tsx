import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter1() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 01"
        title="Calcul des Probabilités et Algèbre de Boole"
        description="Fondements du calcul des probabilités, axiomes et structures algébriques."
      />

      <Section type="intuition" title="I. Définition d'une Probabilité">
        <p className="mb-4">
          Imaginons un univers Ω qui contient tous les résultats possibles d'une expérience aléatoire. Par exemple, si on lance un dé, Ω = {"{1, 2, 3, 4, 5, 6}"}. Un événement A est simplement un sous-ensemble de cet univers : "obtenir un nombre pair" correspond à A = {"{2, 4, 6}"}.
        </p>
        
        <p className="mb-4">
          Une <strong>probabilité</strong> est une fonction qui associe à chaque événement A un nombre entre 0 et 1, représentant la "chance" que cet événement se réalise. Cette fonction doit respecter certaines règles logiques appelées <strong>axiomes</strong>.
        </p>

        <div className="my-4 p-4 bg-slate-100/50 dark:bg-white/5 rounded-lg">
          <img 
            src="/stats/images/ch1_venn_simple.png" 
            alt="Diagramme de Venn - Ensemble A dans l'univers Ω" 
            className="w-full max-w-md mx-auto"
          />
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">Diagramme de Venn : A ⊂ Ω avec un élément e ∈ A</p>
        </div>

        <FormulaBox label="Application probabilité">{"P : A \\subset \\Omega \\to P(A) \\in [0,1]"}</FormulaBox>
      </Section>

      <Section type="key" title="Les trois axiomes fondamentaux">
        <p className="mb-4">
          Toute la théorie des probabilités repose sur trois axiomes simples mais puissants. À partir de ces trois règles, on peut déduire toutes les propriétés des probabilités.
        </p>

        <p className="mb-2"><strong>Axiome 1 — Positivité :</strong></p>
        <p className="mb-4 pl-4"><Math>{"P(A) \\geq 0"}</Math> — Une probabilité est toujours positive ou nulle.</p>

        <p className="mb-2"><strong>Axiome 2 — Normalisation :</strong></p>
        <p className="mb-4 pl-4"><Math>{"P(\\Omega) = 1"}</Math> — L'événement certain a une probabilité de 1.</p>

        <p className="mb-2"><strong>Axiome 3 — Additivité restreinte :</strong></p>
        <p className="mb-2 pl-4">Si A et B sont <strong>disjoints</strong> (incompatibles, c'est-à-dire <Math>{"A \\cap B = \\emptyset"}</Math>), alors :</p>
        <FormulaBox>{"P(A \\cup B) = P(A) + P(B)"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          L'additivité dit simplement que si deux événements ne peuvent pas se produire en même temps, la probabilité d'avoir l'un OU l'autre est la somme des probabilités individuelles.
        </Callout>
      </Section>

      <Section type="intuition" title="II. Algèbre de Boole">
        <p className="mb-4">
          Une <strong>algèbre de Boole</strong> est une structure mathématique qui organise les événements de manière cohérente. C'est l'ensemble des événements sur lesquels on peut calculer des probabilités.
        </p>

        <p className="mb-4">
          Pour qu'une famille d'événements <Math>{"\\mathcal{F}"}</Math> forme une algèbre de Boole, elle doit vérifier deux propriétés :
        </p>

        <p className="mb-2"><strong>Propriété 1 — Fermeture par complémentarité :</strong></p>
        <p className="mb-4 pl-4">Si A est dans <Math>{"\\mathcal{F}"}</Math>, alors son complémentaire <Math>{"\\bar{A}"}</Math> aussi.</p>

        <p className="mb-2"><strong>Propriété 2 — Fermeture par union finie :</strong></p>
        <p className="mb-4 pl-4">Si <Math>{"A_1, A_2, ..., A_n"}</Math> sont dans <Math>{"\\mathcal{F}"}</Math>, alors leur union <Math>{"\\bigcup A_i"}</Math> aussi.</p>

        <p className="mb-4">
          Si on ajoute la fermeture par union <strong>infinie</strong>, on obtient un <strong>corps de Borel</strong> (ou σ-algèbre), qui est la structure utilisée en probabilités avancées.
        </p>

        <Callout type="tip" title="À retenir">
          Une algèbre de Boole a toujours un nombre <strong>pair</strong> d'éléments. En exercice, il faut donner la définition à la fois littéraire ET mathématique.
        </Callout>
      </Section>

      <Section type="formule" title="Conséquences de la définition">
        <p className="mb-2"><strong>Conséquence 1 :</strong> <Math>{"\\Omega \\in \\mathcal{F}"}</Math></p>
        <p className="mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          Démonstration : <Math>{"A \\in \\mathcal{F} \\Rightarrow \\bar{A} \\in \\mathcal{F}"}</Math>, donc <Math>{"A \\cup \\bar{A} = \\Omega \\in \\mathcal{F}"}</Math>
        </p>

        <p className="mb-2"><strong>Conséquence 2 :</strong> <Math>{"\\emptyset \\in \\mathcal{F}"}</Math></p>
        <p className="mb-4 pl-4 text-sm text-slate-700 dark:text-slate-300">
          Démonstration : <Math>{"\\Omega \\in \\mathcal{F} \\Rightarrow \\bar{\\Omega} = \\emptyset \\in \\mathcal{F}"}</Math>
        </p>

        <p className="mb-2"><strong>Conséquence 3 :</strong> <Math>{"\\mathcal{F}"}</Math> est fermée par rapport à l'intersection</p>
        <p className="pl-4 text-sm text-slate-700 dark:text-slate-300 mb-2">
          Cela signifie que si <Math>{"A \\in \\mathcal{F}"}</Math> et <Math>{"B \\in \\mathcal{F}"}</Math>, alors <Math>{"A \\cap B \\in \\mathcal{F}"}</Math>.
        </p>
        <p className="pl-4 text-sm text-slate-700 dark:text-slate-300">
          Démonstration via l'identité de Morgan : <Math>{"A \\cap B = \\overline{\\bar{A} \\cup \\bar{B}}"}</Math>. Comme <Math>{"\\mathcal{F}"}</Math> est fermée par complémentarité et par union, on a bien <Math>{"A \\cap B \\in \\mathcal{F}"}</Math>.
        </p>
      </Section>

      <Section type="formule" title="Identité de Morgan">
        <p className="mb-4">
          Cette identité permet de transformer une union en intersection (et vice-versa) en passant au complémentaire. Elle est très utile pour simplifier les calculs.
        </p>

        <FormulaBox label="Identité de Morgan" highlight>{"\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}"}</FormulaBox>
        
        <p className="mt-4">En version généralisée :</p>
        <FormulaBox>{"\\overline{\\bigcup_{i=1}^{n} A_i} = \\bigcap_{i=1}^{n} \\bar{A_i}"}</FormulaBox>
      </Section>

      <Section type="formule" title="Exemple : Construction d'une Algèbre de Boole">
        <p className="mb-4">
          Soit <Math>{"\\Omega = \\{a, b, c, d\\}"}</Math> et <Math>{"\\mathcal{F} = \\{(a), (bc)\\}"}</Math>. 
          Construisons la plus petite algèbre de Boole contenant ces éléments :
        </p>

        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"(a)"}</Math> → complémentaire = <Math>{"(bcd)"}</Math></li>
          <li><Math>{"(bc)"}</Math> → complémentaire = <Math>{"(ad)"}</Math></li>
          <li><Math>{"(a) \\cup (bc) = (abc)"}</Math> → complémentaire = <Math>{"(d)"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Résultat :</strong></p>
        <FormulaBox>{"\\mathcal{F} = \\{\\emptyset, (a), (d), (bc), (ad), (bcd), (abc), \\Omega\\}"}</FormulaBox>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">8 éléments (nombre pair ✓)</p>
      </Section>

      <Section type="intuition" title="III. Espace Probabilisé">
        <p className="mb-4">
          Un <strong>espace probabilisé</strong> est le cadre mathématique complet pour faire des probabilités. Il se note <Math>{"(\\Omega, \\mathcal{F}, P)"}</Math> et comprend :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Ω</strong> : l'univers (tous les résultats possibles)</li>
          <li><strong><Math>{"\\mathcal{F}"}</Math></strong> : l'algèbre de Boole (les événements mesurables)</li>
          <li><strong>P</strong> : la fonction de probabilité</li>
        </ul>
      </Section>

      <Section type="key" title="Propriétés déduites des axiomes">
        <p className="mb-4">À partir des trois axiomes, on peut démontrer plusieurs propriétés importantes :</p>

        <p className="mb-2"><strong>Axiome d'additivité totale (pour l'infini) :</strong></p>
        <FormulaBox>{"P\\left(\\bigcup_{i=1}^{+\\infty} A_i\\right) = \\sum_{i=1}^{+\\infty} P(A_i) \\quad \\text{(si } A_i \\text{ disjoints)}"}</FormulaBox>

        <FormulaBox label="P4 — Croissance">{"A \\subset B \\Rightarrow P(A) \\leq P(B)"}</FormulaBox>
        <FormulaBox label="P5 — Ensemble vide">{"P(\\emptyset) = 0"}</FormulaBox>
        <FormulaBox label="P6 — Complémentaire" highlight>{"P(\\bar{A}) = 1 - P(A)"}</FormulaBox>
        <FormulaBox label="P7 — Bornes">{"0 \\leq P(A) \\leq 1"}</FormulaBox>
      </Section>

      <Section type="key" title="P4 — Démonstration (EXIGIBLE)">
        <p className="mb-4">
          <strong>Théorème :</strong> Si <Math>{"A \\subset B"}</Math> alors <Math>{"P(A) \\leq P(B)"}</Math>
        </p>

        <div className="p-5 bg-slate-100/50 dark:bg-white/5 rounded-lg border-l-4 border-blue-500">
          <p className="mb-3"><strong>Hypothèses :</strong> <Math>{"A, B \\in \\mathcal{F}"}</Math> avec <Math>{"A \\subset B"}</Math></p>
          
          <p className="mb-3"><strong>Raisonnement :</strong></p>
          <p className="mb-2 pl-4">On décompose B en deux parties disjointes :</p>
          <p className="mb-2 pl-4"><Math>{"B = A \\cup (B \\cap \\bar{A})"}</Math></p>
          
          <p className="mb-2 pl-4">Ces ensembles sont disjoints car <Math>{"A \\cap (B \\cap \\bar{A}) = \\emptyset"}</Math></p>
          
          <p className="mb-2 pl-4">Par l'axiome d'additivité (P3) :</p>
          <p className="mb-2 pl-4"><Math>{"P(B) = P(A) + P(B \\cap \\bar{A})"}</Math></p>
          
          <p className="mb-2 pl-4">Or <Math>{"P(B \\cap \\bar{A}) \\geq 0"}</Math> par l'axiome de positivité (P1)</p>
          
          <p className="mb-2"><strong>Conclusion :</strong> <Math>{"P(B) \\geq P(A)"}</Math> ∎</p>
        </div>
      </Section>

      <Section type="key" title="IV. Théorème des Probabilités Totales (EXIGIBLE)">
        <p className="mb-4">
          Ce théorème généralise l'additivité au cas où les événements ne sont pas disjoints. Il faut soustraire l'intersection pour ne pas la compter deux fois.
        </p>

        <FormulaBox label="Probabilités totales" highlight>{"P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"}</FormulaBox>

        <div className="p-5 bg-slate-100/50 dark:bg-white/5 rounded-lg border-l-4 border-rose-500 mt-4">
          <p className="font-semibold text-rose-800 mb-3">⚠️ Démonstration EXIGIBLE :</p>
          
          <p className="mb-2"><strong>Étape 1 :</strong> On écrit <Math>{"A \\cup B = A \\cup (B \\cap \\bar{A})"}</Math> (disjoints)</p>
          <p className="mb-2 pl-4">Donc <Math>{"P(A \\cup B) = P(A) + P(B \\cap \\bar{A})"}</Math> ... (①)</p>
          
          <p className="mb-2"><strong>Étape 2 :</strong> On décompose B : <Math>{"B = (B \\cap A) \\cup (B \\cap \\bar{A})"}</Math></p>
          <p className="mb-2 pl-4">Donc <Math>{"P(B) = P(B \\cap A) + P(B \\cap \\bar{A})"}</Math></p>
          <p className="mb-2 pl-4">D'où <Math>{"P(B \\cap \\bar{A}) = P(B) - P(A \\cap B)"}</Math> ... (②)</p>
          
          <p className="mb-2"><strong>Conclusion :</strong> En substituant ② dans ① :</p>
          <p className="pl-4"><Math>{"P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"}</Math> ∎</p>
        </div>
      </Section>

      <Section type="intuition" title="V. Probabilités Conditionnelles">
        <p className="mb-4">
          La probabilité conditionnelle répond à la question : "Quelle est la probabilité de B <strong>sachant que</strong> A s'est déjà produit ?" On restreint l'univers à A et on regarde quelle proportion de A est aussi dans B.
        </p>

        <FormulaBox label="Probabilité conditionnelle" highlight>{"P(B|A) = \\frac{P(A \\cap B)}{P(A)} \\quad \\text{si } P(A) \\neq 0"}</FormulaBox>

        <p className="mt-4 mb-4"><strong>Exemple :</strong> Dans un jeu de 52 cartes, quelle est la probabilité de tirer un roi sachant qu'on a tiré un cœur ?</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"P(\\text{cœur}) = 13/52"}</Math></li>
          <li><Math>{"P(\\text{roi} \\cap \\text{cœur}) = 1/52"}</Math></li>
          <li><Math>{"P(\\text{roi}|\\text{cœur}) = \\frac{1/52}{13/52} = \\frac{1}{13}"}</Math></li>
        </ul>
      </Section>

      <Section type="formule" title="Formule des probabilités composées">
        <p className="mb-4">En réarrangeant la formule de la probabilité conditionnelle, on obtient :</p>
        
        <FormulaBox highlight>{"P(A \\cap B) = P(A) \\times P(B|A) = P(B) \\times P(A|B)"}</FormulaBox>
        
        <p className="mt-4">Cette formule est très utile pour calculer la probabilité d'une intersection quand on connaît les probabilités conditionnelles.</p>

        <p className="mt-4 mb-2"><strong>Généralisation :</strong> Pour des événements <Math>{"C_i"}</Math> disjoints :</p>
        <FormulaBox>{"P\\left(\\bigcup_{i=1}^{m} C_i | A\\right) = \\sum_{i=1}^{m} P(C_i | A)"}</FormulaBox>
      </Section>

      <Section type="key" title="VI. Indépendance">
        <p className="mb-4">
          Deux événements sont <strong>indépendants</strong> si la réalisation de l'un n'affecte pas la probabilité de l'autre. Mathématiquement, cela signifie que <Math>{"P(B|A) = P(B)"}</Math>.
        </p>

        <FormulaBox label="Condition d'indépendance" highlight>{"P(A \\cap B) = P(A) \\times P(B)"}</FormulaBox>

        <Callout type="insight" title="Intuition">
          L'indépendance signifie que "savoir A" ne change rien à la probabilité de B. 
          Exemple : le résultat d'un lancer de dé n'influence pas le suivant.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemples :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Indépendants :</strong> Deux lancers de dé successifs</li>
          <li><strong>Dépendants :</strong> Tirage sans remise dans une urne</li>
          <li><strong>Incompatibles mais dépendants :</strong> "Obtenir 1" et "Obtenir 6" sur un même lancer</li>
        </ul>

        <Callout type="warning" title="Piège classique">
          <strong>Indépendant ≠ Incompatible !</strong> Deux événements incompatibles (<Math>{"A \\cap B = \\emptyset"}</Math>) ne sont généralement PAS indépendants. Au contraire, si l'un se produit, l'autre ne peut pas se produire.
        </Callout>
      </Section>

      <Section type="intuition" title="VII. Définition Classique de la Probabilité">
        <p className="mb-4">
          Quand tous les résultats sont <strong>équiprobables</strong> (même chance de se produire), la probabilité se calcule simplement par un rapport de dénombrement :
        </p>

        <FormulaBox label="Probabilité classique" highlight>{"P(A) = \\frac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}} = \\frac{n}{N}"}</FormulaBox>

        <p className="mt-4">C'est la définition de Laplace, valable uniquement quand l'équiprobabilité est vérifiée (dé équilibré, tirage au hasard, etc.).</p>
      </Section>

      <Section type="key" title="VIII. Théorème de Bayes">
        <p className="mb-4">
          Le théorème de Bayes permet d'<strong>inverser le conditionnement</strong> : connaissant P(B|A), on calcule P(A|B). C'est la "probabilité des causes" — on remonte de l'effet à la cause.
        </p>

        <FormulaBox label="Formule simple" highlight>{"P(A|B) = \\frac{P(A) \\times P(B|A)}{P(B)}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Formule généralisée (avec partition) :</strong></p>
        <FormulaBox label="Formule de Bayes">{"P(A_k|B) = \\frac{P(A_k) \\times P(B|A_k)}{\\sum_{i=1}^{n} P(A_i) \\times P(B|A_i)}"}</FormulaBox>

        <p className="mt-4 mb-2"><strong>Conditions d'application :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Les <Math>{"A_i"}</Math> forment une <strong>partition</strong> de Ω (disjoints et couvrent tout Ω)</li>
          <li><Math>{"P(A_i) \\neq 0"}</Math> et <Math>{"P(B) \\neq 0"}</Math></li>
        </ul>

        <Callout type="insight" title="Intuition">
          Bayes répond à la question : "Sachant qu'un effet B s'est produit, quelle est la probabilité que ce soit la cause Aₖ ?" 
          On pondère la probabilité a priori P(Aₖ) par la vraisemblance P(B|Aₖ), puis on normalise.
        </Callout>

        <p className="mt-4 mb-2"><strong>Exemple — Test médical :</strong></p>
        <p className="mb-2 pl-4 text-sm">
          Une maladie touche 1% de la population. Un test détecte 95% des malades (sensibilité) mais donne 3% de faux positifs.
          Si le test est positif, quelle est la probabilité d'être malade ?
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>P(Malade) = 0.01, P(Sain) = 0.99</li>
          <li>P(+|Malade) = 0.95, P(+|Sain) = 0.03</li>
          <li><Math>{"P(Malade|+) = \\frac{0.01 \\times 0.95}{0.01 \\times 0.95 + 0.99 \\times 0.03} = \\frac{0.0095}{0.0392} \\approx 24\\%"}</Math></li>
        </ul>
        <p className="mt-2 pl-4 text-sm text-slate-700 dark:text-slate-300">
          Même avec un test positif, il n'y a que 24% de chances d'être malade ! C'est le paradoxe des tests de dépistage.
        </p>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Incompatible ≠ Indépendant</strong> — Ce sont deux notions complètement différentes !</li>
          <li><strong>Partition</strong> — Vérifier que les événements sont disjoints ET couvrent Ω</li>
          <li><strong>Algèbre de Boole</strong> — Nombre pair d'éléments, inclure ∅ et Ω</li>
          <li><strong>Probabilité conditionnelle</strong> — Le dénominateur est P(A), pas P(B)</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/stats', label: '← Accueil', title: 'Page d\'accueil' }}
        next={{ path: '/stats/chapitre-2', label: 'Chapitre 2 →', title: 'VA Discrètes' }}
      />
    </main>
  );
}
