import { Section, Callout, FormulaBox, Graph, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter1() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 01"
        title="Introduction & IS-LM"
        description="Court terme, moyen terme, long terme et l'équilibre macroéconomique dans une économie fermée."
      />

      <Section type="intuition" title="Les trois horizons temporels">
        <p className="mb-4">La macroéconomie distingue trois horizons temporels, chacun avec ses propres mécanismes d'ajustement et ses variables clés. Cette distinction est <strong>fondamentale</strong> pour comprendre pourquoi les politiques économiques ont des effets différents selon l'horizon considéré.</p>
        
        <Table headers={['Horizon', 'Durée', 'Focus principal']}>
          <TableRow>
            <TableCell><strong>Court terme</strong></TableCell>
            <TableCell>Quelques trimestres</TableCell>
            <TableCell>Fluctuations du PIB, emploi, prix (demande globale)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Moyen terme</strong></TableCell>
            <TableCell>1 à plusieurs années</TableCell>
            <TableCell>Ajustement des prix et salaires, contraintes d'offre</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Long terme</strong></TableCell>
            <TableCell>Plusieurs décennies</TableCell>
            <TableCell>Croissance du niveau de vie (PIB/habitant), innovation</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Déterminants du niveau d'activité selon l'horizon :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Court terme</strong> : Principalement la <strong>demande globale</strong> (consommation, investissement, dépenses publiques, exportations nettes). Les entreprises ajustent leur production pour répondre à la demande.</li>
          <li><strong>Moyen terme</strong> : Les ressources productives et les conditions des marchés des facteurs deviennent déterminantes. L'offre contraint progressivement la production.</li>
          <li><strong>Long terme</strong> : La capacité à investir (capital humain et physique) et à innover détermine la croissance du niveau de vie.</li>
        </ul>

        <Callout type="insight" title="Comportement des prix et salaires">
          <strong>Court terme</strong> : Prix et salaires sont <strong>rigides</strong> (contrats, coûts de menu, information imparfaite). L'ajustement se fait par les <strong>quantités</strong> (production, emploi).<br/><br/>
          <strong>Moyen terme</strong> : Prix et salaires <strong>s'ajustent</strong> progressivement aux conditions d'offre et de demande. L'économie converge vers son niveau naturel.
        </Callout>
      </Section>

      <Section type="intuition" title="Faits stylisés importants">
        <p className="mb-4">Avant d'entrer dans les modèles, il est essentiel de comprendre les grandes tendances historiques que la macroéconomie cherche à expliquer :</p>
        
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Courbe en crosse de hockey</strong> : Pendant des millénaires, le niveau de vie est resté quasi-constant. Puis, après la révolution industrielle (vers 1800), on observe une <strong>croissance exponentielle</strong> du PIB par habitant. Cette rupture historique est l'un des phénomènes les plus importants à expliquer.
          </li>
          <li>
            <strong>Inégalités mondiales</strong> : Depuis 1800, les écarts de niveau de vie entre pays riches et pauvres ont <strong>explosé</strong>. Certains pays ont décollé économiquement tandis que d'autres sont restés en retrait. Comprendre ces divergences est un enjeu majeur.
          </li>
          <li>
            <strong>Fluctuations économiques</strong> : L'économie alterne entre périodes d'<strong>expansion</strong> (croissance, baisse du chômage) et de <strong>récession</strong> (contraction, hausse du chômage). Ces <strong>cycles économiques</strong> sont au cœur de l'analyse de court terme.
          </li>
        </ul>

        <Callout type="tip" title="Pourquoi c'est important">
          Ces faits stylisés guident la construction des modèles. Le modèle IS-LM explique les fluctuations de court terme, WS-PS le chômage structurel, et les modèles de croissance le long terme.
        </Callout>
      </Section>

      <Section type="formule" title="PIB nominal, PIB réel et déflateur">
        <p className="mb-4">Pour mesurer correctement l'activité économique et l'inflation, il est essentiel de distinguer les grandeurs <strong>nominales</strong> (en valeur courante) des grandeurs <strong>réelles</strong> (en volume).</p>

        <Table headers={['Concept', 'Définition', 'Utilité']}>
          <TableRow>
            <TableCell><strong>PIB nominal</strong></TableCell>
            <TableCell>Valeur de la production aux <strong>prix courants</strong> (prix de l'année en cours)</TableCell>
            <TableCell>Mesure la valeur monétaire totale, mais mélange effet prix et effet volume</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>PIB réel</strong></TableCell>
            <TableCell>Valeur de la production aux <strong>prix constants</strong> (prix d'une année de base)</TableCell>
            <TableCell>Mesure le volume de production, permet les comparaisons dans le temps</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Le déflateur du PIB :</strong></p>
        <p className="mb-4">Le déflateur permet de mesurer l'évolution du niveau général des prix. C'est le rapport entre PIB nominal et PIB réel :</p>

        <FormulaBox label="Déflateur du PIB" highlight>
          {"\\text{Déflateur} = \\frac{\\text{PIB nominal}}{\\text{PIB réel}} \\times 100"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          • Si le déflateur augmente de 100 à 105, cela signifie que les prix ont augmenté de <strong>5%</strong> en moyenne.<br/>
          • Le déflateur est une mesure de l'<strong>inflation</strong> (comme l'IPC, mais basé sur tous les biens produits, pas seulement consommés).<br/>
          • Pour passer du nominal au réel : <Math>{"\\text{PIB réel} = \\frac{\\text{PIB nominal}}{\\text{Déflateur}} \\times 100"}</Math>
        </Callout>

        <Callout type="warning" title="Piège classique en QCM">
          "Le PIB réel correspond à la valeur de la production aux prix <strong>constants</strong>" (et non courants). C'est le PIB <strong>nominal</strong> qui est aux prix courants.
        </Callout>
      </Section>

      <Section type="formule" title="Calcul du PIB nominal et réel">
        <p className="mb-4">Le PIB peut être calculé de trois façons équivalentes (optique production, revenus, dépenses). En pratique, on utilise souvent l'<strong>optique dépenses</strong> :</p>

        <FormulaBox label="PIB nominal (optique dépenses)" highlight>
          {"\\text{PIB nominal} = C + I + G + (X - M)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Composantes :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>C</Math> = Consommation des ménages (aux prix courants)</li>
          <li><Math>I</Math> = Investissement (FBCF) aux prix courants</li>
          <li><Math>G</Math> = Dépenses publiques aux prix courants</li>
          <li><Math>X</Math> = Exportations (ventes à l'étranger)</li>
          <li><Math>M</Math> = Importations (achats à l'étranger)</li>
          <li><Math>{"X - M"}</Math> = Exportations nettes (balance commerciale)</li>
        </ul>

        <FormulaBox label="PIB réel">
          {"\\text{PIB réel}_t = \\frac{\\text{PIB nominal}_t}{\\text{Déflateur}_t} \\times 100"}
        </FormulaBox>

        <Callout type="tip" title="Exemple numérique">
          Si le PIB nominal en 2024 = 2800 Mds€ et le déflateur = 112 (base 100 en 2015), alors :<br/>
          <Math>{"\\text{PIB réel}_{2024} = \\frac{2800}{112} \\times 100 = 2500 \\text{ Mds€ (en euros de 2015)}"}</Math>
        </Callout>
      </Section>

      <Section type="formule" title="Le produit naturel Yₙ">
        <p className="mb-4">Le <strong>produit naturel</strong> (ou PIB potentiel) <Math>Y_n</Math> est le niveau de production atteint quand le chômage est à son niveau naturel <Math>u_n</Math>. C'est le niveau de production de <strong>moyen terme</strong>.</p>

        <FormulaBox label="Relation emploi-production" highlight>
          {"Y = N \\quad \\text{(si productivité = 1)}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Lien avec le chômage :</strong></p>
        <p className="mb-4">Si <Math>L</Math> = population active et <Math>N</Math> = emploi, alors :</p>
        
        <FormulaBox label="Taux de chômage">
          {"u = \\frac{L - N}{L} = 1 - \\frac{N}{L}"}
        </FormulaBox>

        <p className="mt-4 mb-2">Donc l'emploi s'écrit : <Math>{"N = L(1 - u)"}</Math></p>
        <p className="mb-4">Et le produit : <Math>{"Y = L(1 - u)"}</Math> (si productivité = 1)</p>

        <FormulaBox label="Produit naturel" highlight>
          {"Y_n = L(1 - u_n)"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation économique">
          <strong>Yₙ n'est PAS le PIB maximum possible</strong>. C'est le PIB compatible avec une inflation stable.<br/><br/>
          • Si <Math>{"Y > Y_n"}</Math> → <Math>{"u < u_n"}</Math> → tensions inflationnistes (spirale prix-salaires)<br/>
          • Si <Math>{"Y < Y_n"}</Math> → <Math>{"u > u_n"}</Math> → chômage conjoncturel, désinflation<br/>
          • Si <Math>{"Y = Y_n"}</Math> → <Math>{"u = u_n"}</Math> → équilibre de moyen terme, inflation stable
        </Callout>

        <Callout type="warning" title="Ce qui fait varier Yₙ">
          <Math>Y_n</Math> dépend de :<br/>
          • La population active <Math>L</Math> (démographie, taux d'activité)<br/>
          • Le chômage naturel <Math>u_n</Math> (institutions, allocations, marges)<br/>
          • La productivité (technologie, capital humain)<br/><br/>
          Les politiques de demande (G, M) ne modifient PAS <Math>Y_n</Math>. Seules les politiques structurelles (réformes du marché du travail, concurrence) peuvent le faire.
        </Callout>
      </Section>

      <Section type="intuition" title="Le débat Classiques vs Keynésiens">
        <p className="mb-4">Ce débat fondamental structure toute la macroéconomie. Il oppose deux visions du fonctionnement de l'économie, avec des implications majeures pour la politique économique.</p>

        <Table headers={['Aspect', 'Vision Classique', 'Vision Keynésienne']}>
          <TableRow>
            <TableCell>Marché du travail</TableCell>
            <TableCell>Marché comme les autres, équilibre par flexibilité des salaires</TableCell>
            <TableCell>Rigidités, chômage involontaire possible</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chômage</TableCell>
            <TableCell>Volontaire (refus de travailler au salaire d'équilibre)</TableCell>
            <TableCell>Involontaire (insuffisance de demande)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Politique économique</TableCell>
            <TableCell>Neutre à moyen/long terme</TableCell>
            <TableCell>Efficace à court terme</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ajustement</TableCell>
            <TableCell>Par les prix (flexibles)</TableCell>
            <TableCell>Par les quantités (prix rigides)</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Synthèse moderne">
          La macroéconomie moderne réconcilie ces deux visions : <strong>à court terme</strong>, les rigidités donnent raison aux keynésiens (les politiques sont efficaces). <strong>À moyen/long terme</strong>, les prix s'ajustent et les classiques ont raison (neutralité des politiques sur le réel).
        </Callout>
      </Section>

      <Section type="formule" title="La courbe IS — Marché des biens">
        <p className="mb-4">IS représente l'équilibre sur le marché des biens. Elle relie le revenu Y au taux d'intérêt i.</p>
        
        <FormulaBox label="Équilibre du marché des biens" highlight>
          {"Y = C(Y - T) + I(Y, i) + G"}
        </FormulaBox>

        <p className="mb-2"><strong>Les composantes :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Consommation</strong> : <Math>{"C = c_0 + c_1(Y - T)"}</Math></li>
          <li><strong>Investissement</strong> : <Math>{"I = b_0 - b_1 i"}</Math></li>
          <li><strong>Dépenses publiques</strong> : <Math>G</Math> exogène</li>
        </ul>

        <Callout type="insight" title="Signification des paramètres">
          <strong>Fonction de consommation</strong> <Math>{"C = c_0 + c_1(Y - T)"}</Math> :<br/>
          • <Math>{"c_0"}</Math> = consommation autonome (indépendante du revenu)<br/>
          • <Math>{"c_1"}</Math> = propension marginale à consommer (PMC) : part de chaque € supplémentaire qui est consommée<br/>
          • <Math>{"1 - c_1"}</Math> = propension marginale à épargner (PMS) : part de chaque € supplémentaire qui est épargnée<br/><br/>
          <strong>Exemple</strong> : Si <Math>{"c_1 = 0.8"}</Math>, sur 100€ de revenu en plus, 80€ sont consommés et 20€ sont épargnés.<br/><br/>
          <strong>Fonction d'investissement</strong> <Math>{"I = b_0 - b_1 i"}</Math> :<br/>
          • <Math>{"b_0"}</Math> = investissement autonome (indépendant du taux d'intérêt)<br/>
          • <Math>{"b_1"}</Math> = sensibilité de l'investissement au taux d'intérêt<br/><br/>
          Plus <Math>{"b_1"}</Math> est grand, plus l'investissement réagit fortement aux variations de i.
        </Callout>

        <FormulaBox label="Multiplicateur keynésien" highlight>
          {"k = \\frac{1}{1 - c_1} = \\frac{1}{s}"}
        </FormulaBox>

        <Callout type="warning" title="À quoi sert le multiplicateur ?">
          Le multiplicateur permet de calculer l'<strong>effet total</strong> d'une variation de la demande autonome (G, I₀, C₀) sur le revenu Y :<br/><br/>
          <Math>{"\\Delta Y = k \\times \\Delta G"}</Math><br/><br/>
          <strong>Pourquoi l'effet est-il multiplié ?</strong> Parce qu'une dépense initiale génère des revenus, qui génèrent de la consommation, qui génère des revenus, etc. C'est un effet en cascade.
        </Callout>

        <p className="mt-4 mb-2"><strong>Interprétation du multiplicateur :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Si <Math>{"c_1 = 0.8"}</Math> → <Math>{"k = \\frac{1}{0.2} = 5"}</Math></li>
          <li>Une hausse de G de 100 → hausse de Y de <Math>{"100 \\times 5 = 500"}</Math></li>
          <li>Plus les gens consomment (<Math>{"c_1"}</Math> proche de 1), plus le multiplicateur est grand</li>
          <li>Plus les gens épargnent (<Math>{"s = 1 - c_1"}</Math> grand), plus le multiplicateur est faible</li>
        </ul>

        <Callout type="tip" title="Origine mathématique">
          Le multiplicateur vient de la série géométrique : <Math>{"1 + c_1 + c_1^2 + ... = \\frac{1}{1-c_1}"}</Math>.<br/><br/>
          <strong>Mécanisme</strong> : L'État dépense 100€ → les ménages reçoivent 100€ de revenu → ils consomment 80€ (si c₁=0.8) → ces 80€ deviennent le revenu de quelqu'un d'autre → qui consomme 64€ → etc.<br/>
          Total : <Math>{"100 + 80 + 64 + ... = 100 \\times \\frac{1}{1-0.8} = 500"}</Math>
        </Callout>

        <p className="mt-4"><strong>Propriétés de IS :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pente <strong>négative</strong> : <Math>{"i \\uparrow \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}</Math></li>
          <li>Déplacement vers la droite : <Math>{"G \\uparrow"}</Math> ou <Math>{"T \\downarrow"}</Math></li>
        </ul>
      </Section>

      <Section type="formule" title="La courbe LM — Marché monétaire">
        <p className="mb-4">LM représente l'équilibre sur le marché de la monnaie.</p>
        
        <FormulaBox label="Équilibre du marché monétaire" highlight>
          {"\\frac{M^S}{P} = \\frac{M^D}{P} = L(Y, i)"}
        </FormulaBox>

        <Callout type="insight" title="Offre vs Demande de monnaie">
          <strong><Math>{"\\frac{M^S}{P}"}</Math> = Offre de monnaie réelle</strong><br/>
          • <Math>M^S</Math> = masse monétaire nominale, fixée par la Banque Centrale<br/>
          • Divisée par P pour obtenir le pouvoir d'achat réel de cette monnaie<br/>
          • C'est une variable <strong>exogène</strong> (décidée par la BC)<br/><br/>
          <strong><Math>{"\\frac{M^D}{P}"}</Math> = Demande de monnaie réelle</strong><br/>
          • <Math>{"M^D = L(Y, i)"}</Math> = quantité de monnaie que les agents veulent détenir<br/>
          • Dépend du revenu Y (motif de transaction) et du taux i (coût d'opportunité)<br/>
          • C'est une variable <strong>endogène</strong> (dépend du comportement des agents)
        </Callout>

        <p className="mt-4 mb-2"><strong>Pourquoi diviser par P ?</strong></p>
        <p className="mb-4">On raisonne en termes <strong>réels</strong> : ce qui compte n'est pas le nombre de billets, mais ce qu'on peut acheter avec. Si les prix doublent, il faut deux fois plus de monnaie nominale pour les mêmes transactions.</p>

        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Motif de transaction</strong> : <Math>{"Y \\uparrow \\Rightarrow"}</Math> demande de monnaie ↑ (plus de transactions)</li>
          <li><strong>Coût d'opportunité</strong> : <Math>{"i \\uparrow \\Rightarrow"}</Math> demande de monnaie ↓ (mieux vaut placer en obligations)</li>
        </ul>

        <p><strong>Propriétés de LM :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pente <strong>positive</strong> : <Math>{"Y \\uparrow \\Rightarrow L \\uparrow \\Rightarrow i \\uparrow"}</Math></li>
          <li>Déplacement vers la droite : <Math>{"M \\uparrow"}</Math></li>
        </ul>
      </Section>

      <Section type="graphique" title="L'équilibre IS-LM">
        <p className="mb-4">L'intersection des deux courbes détermine le couple d'équilibre <Math>{"(Y^*, i^*)"}</Math>.</p>
        <Graph
          src="/macro/assets/1.png"
          alt="Équilibre IS-LM"
          figure={1}
          caption="IS est décroissante (↑i → ↓I → ↓Y), LM est croissante (↑Y → ↑demande de monnaie → ↑i)"
        />

        <Callout type="insight" title="Équilibre de court terme">
          L'équilibre IS-LM correspond à une situation où les marchés des biens et monétaire sont <strong>simultanément à l'équilibre</strong>.
        </Callout>
      </Section>

      <Section type="graphique" title="Politique budgétaire expansionniste">
        <p className="mb-4">Une hausse des dépenses publiques G déplace IS vers la droite.</p>
        <Graph
          src="/macro/assets/2.png"
          alt="Politique budgétaire IS-LM"
          figure={2}
          caption="↑G → IS vers la droite → ↑Y et ↑i. L'effet d'éviction réduit partiellement l'impact."
        />
        
        <Table headers={['Variable', 'Variation', 'Effet sur IS', 'Résultat']}>
          <TableRow>
            <TableCell>G (dépenses)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>→ Droite</TableCell>
            <TableCell>↑Y, ↑i</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>T (taxes)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>→ Gauche</TableCell>
            <TableCell>↓Y, ↓i</TableCell>
          </TableRow>
        </Table>

        <Callout type="warning" title="Effet d'éviction">
          <Math>{"G \\uparrow \\Rightarrow Y \\uparrow \\Rightarrow i \\uparrow \\Rightarrow I \\downarrow"}</Math><br/>
          La hausse du taux d'intérêt réduit l'investissement privé, atténuant l'effet de la relance.
        </Callout>
      </Section>

      <Section type="graphique" title="Politique monétaire expansionniste">
        <p className="mb-4">Une hausse de la masse monétaire M déplace LM vers la droite.</p>
        <Graph
          src="/macro/assets/3.png"
          alt="Politique monétaire IS-LM"
          figure={3}
          caption="↑M → LM vers la droite → ↑Y et ↓i. Stimule l'investissement."
        />

        <p className="mt-4"><strong>Mécanisme de transmission :</strong></p>
        <p><Math>{"M \\uparrow \\Rightarrow \\frac{M}{P} \\uparrow \\Rightarrow i \\downarrow \\Rightarrow I \\uparrow \\Rightarrow Y \\uparrow"}</Math></p>
      </Section>

      <Section type="graphique" title="Le Policy Mix optimal">
        <p className="mb-4">Combiner politique budgétaire et monétaire permet de maximiser l'effet sur Y tout en contrôlant i.</p>
        <Graph
          src="/macro/assets/4.png"
          alt="Policy Mix IS-LM"
          figure={4}
          caption="↑G + ↑M simultanément → Y augmente fortement, i reste stable. L'éviction est neutralisée."
        />
        
        <Callout type="insight" title="Question classique QCM">
          "Quelle politique pour maximiser l'efficacité d'une hausse de G ?" → <strong>Politique monétaire expansionniste</strong> pour compenser l'effet d'éviction.
        </Callout>

        <Table headers={['Objectif', 'Politique budgétaire', 'Politique monétaire']}>
          <TableRow>
            <TableCell>Relance sans inflation</TableCell>
            <TableCell>Expansionniste</TableCell>
            <TableCell>Accommodante</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lutte contre l'inflation</TableCell>
            <TableCell>Restrictive</TableCell>
            <TableCell>Restrictive</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Relance avec contrainte budgétaire</TableCell>
            <TableCell>Neutre</TableCell>
            <TableCell>Expansionniste</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="Méthode : Résoudre un modèle IS/LM">
        <p className="mb-2"><strong>Étape 1 : Écrire l'équation IS</strong></p>
        <p className="mb-4">Équilibre marché des biens : <Math>{"Y = C + I + G"}</Math>, remplacer et résoudre pour Y en fonction de i.</p>

        <p className="mb-2"><strong>Étape 2 : Écrire l'équation LM</strong></p>
        <p className="mb-4">Équilibre marché monétaire : <Math>{"\\frac{M^S}{P} = \\frac{M^D}{P}"}</Math>, résoudre pour i en fonction de Y.</p>

        <p className="mb-2"><strong>Étape 3 : Trouver l'équilibre</strong></p>
        <p className="mb-4">Substituer LM dans IS (ou résoudre le système).</p>

        <p className="mb-2"><strong>Étape 4 : Calculer C* et I*</strong></p>
        <p>Vérifier : <Math>{"C^* + I^* + G = Y^*"}</Math></p>
      </Section>

      <Section type="warning" title="Les erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre nominal et réel</strong> — Toujours raisonner en termes réels</li>
          <li><strong>Oublier le multiplicateur</strong> — ΔG = 100 → ΔY = 100 × k, pas 100</li>
          <li><strong>Inverser les pentes</strong> — IS décroissante, LM croissante</li>
          <li><strong>Négliger l'éviction</strong> — ↑G → ↑i → ↓I (effet indirect)</li>
          <li><strong>Multiplicateur</strong> — C'est <Math>{"\\frac{1}{1-c}"}</Math> et non <Math>{"\\frac{1}{c}"}</Math></li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/macro', label: '← Retour', title: 'Accueil' }}
        next={{ path: '/macro/chapitre-2', label: 'Chapitre suivant →', title: 'Le Marché du Travail' }}
      />
    </main>
  );
}
