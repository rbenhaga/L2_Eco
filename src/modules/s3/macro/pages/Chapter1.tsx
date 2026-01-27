import { Section, Callout, FormulaBox, Graph, Math, Table, TableRow, TableCell } from '../../../../components';
import { ChapterLayout } from '../../../../components/course';

export function Chapter1() {
  return (
    <ChapterLayout
      moduleId="macro"
      chapterNumber="Chapitre 01"
      title="Introduction & IS-LM"
      description="Court terme, moyen terme, long terme et l'équilibre macroéconomique dans une économie fermée."
      estimatedTime="45 min"
      prev={{ path: '/macro', label: '← Retour', title: 'Macroéconomie' }}
      next={{ path: '/macro/chapitre-2', label: 'Chapitre suivant →', title: 'Le Marché du Travail' }}
    >
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
            <strong>Courbe en crosse de hockey</strong> : Pendant des millénaires, le niveau de vie est resté quasi-constant. Puis, après la révolution industrielle (vers 1800), on observe une <strong>croissance exponentielle</strong> du PIB par habitant.
          </li>
          <li>
            <strong>Inégalités mondiales</strong> : Depuis 1800, les écarts de niveau de vie entre pays riches et pauvres ont <strong>explosé</strong>. Certains pays ont décollé économiquement tandis que d'autres sont restés en retrait.
          </li>
          <li>
            <strong>Fluctuations économiques</strong> : L'économie alterne entre périodes d'<strong>expansion</strong> et de <strong>récession</strong>. Ces <strong>cycles économiques</strong> sont au cœur de l'analyse de court terme.
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
            <TableCell>Valeur de la production aux <strong>prix courants</strong></TableCell>
            <TableCell>Mesure la valeur monétaire totale</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>PIB réel</strong></TableCell>
            <TableCell>Valeur de la production aux <strong>prix constants</strong></TableCell>
            <TableCell>Mesure le volume de production</TableCell>
          </TableRow>
        </Table>

        <FormulaBox label="Déflateur du PIB" highlight>
          {"\\text{Déflateur} = \\frac{\\text{PIB nominal}}{\\text{PIB réel}} \\times 100"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          • Si le déflateur augmente de 100 à 105, les prix ont augmenté de <strong>5%</strong> en moyenne.<br/>
          • Pour passer du nominal au réel : <Math>{"\\text{PIB réel} = \\frac{\\text{PIB nominal}}{\\text{Déflateur}} \\times 100"}</Math>
        </Callout>

        <Callout type="warning" title="Piège classique en QCM">
          "Le PIB réel correspond à la valeur de la production aux prix <strong>constants</strong>" (et non courants). C'est le PIB <strong>nominal</strong> qui est aux prix courants.
        </Callout>
      </Section>

      <Section type="formule" title="Calcul du PIB nominal et réel">
        <FormulaBox label="PIB nominal (optique dépenses)" highlight>
          {"\\text{PIB nominal} = C + I + G + (X - M)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Composantes :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>C</Math> = Consommation des ménages</li>
          <li><Math>I</Math> = Investissement (FBCF)</li>
          <li><Math>G</Math> = Dépenses publiques</li>
          <li><Math>{"X - M"}</Math> = Exportations nettes</li>
        </ul>

        <FormulaBox label="PIB réel">
          {"\\text{PIB réel}_t = \\frac{\\text{PIB nominal}_t}{\\text{Déflateur}_t} \\times 100"}
        </FormulaBox>

        <Callout type="tip" title="Exemple numérique">
          Si PIB nominal 2024 = 2800 Mds€ et déflateur = 112 (base 100 en 2015) :<br/>
          <Math>{"\\text{PIB réel}_{2024} = \\frac{2800}{112} \\times 100 = 2500 \\text{ Mds€}"}</Math>
        </Callout>
      </Section>

      <Section type="formule" title="Le produit naturel Yₙ">
        <p className="mb-4">Le <strong>produit naturel</strong> <Math>Y_n</Math> est le niveau de production atteint quand le chômage est à son niveau naturel <Math>u_n</Math>.</p>

        <FormulaBox label="Produit naturel" highlight>
          {"Y_n = L(1 - u_n)"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation économique">
          <strong>Yₙ n'est PAS le PIB maximum possible</strong>. C'est le PIB compatible avec une inflation stable.<br/><br/>
          • Si <Math>{"Y > Y_n"}</Math> → tensions inflationnistes<br/>
          • Si <Math>{"Y < Y_n"}</Math> → chômage conjoncturel<br/>
          • Si <Math>{"Y = Y_n"}</Math> → équilibre de moyen terme
        </Callout>
      </Section>

      <Section type="intuition" title="Le débat Classiques vs Keynésiens">
        <Table headers={['Aspect', 'Vision Classique', 'Vision Keynésienne']}>
          <TableRow>
            <TableCell>Marché du travail</TableCell>
            <TableCell>Équilibre par flexibilité des salaires</TableCell>
            <TableCell>Rigidités, chômage involontaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chômage</TableCell>
            <TableCell>Volontaire</TableCell>
            <TableCell>Involontaire (insuffisance de demande)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Politique économique</TableCell>
            <TableCell>Neutre à moyen/long terme</TableCell>
            <TableCell>Efficace à court terme</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ajustement</TableCell>
            <TableCell>Par les prix</TableCell>
            <TableCell>Par les quantités</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Synthèse moderne">
          La macroéconomie moderne réconcilie ces deux visions : <strong>à court terme</strong>, les keynésiens ont raison (politiques efficaces). <strong>À moyen/long terme</strong>, les classiques ont raison (neutralité).
        </Callout>
      </Section>

      <Section type="formule" title="La courbe IS — Marché des biens">
        <FormulaBox label="Équilibre du marché des biens" highlight>
          {"Y = C(Y - T) + I(Y, i) + G"}
        </FormulaBox>

        <p className="mb-2"><strong>Les composantes :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Consommation</strong> : <Math>{"C = c_0 + c_1(Y - T)"}</Math></li>
          <li><strong>Investissement</strong> : <Math>{"I = b_0 - b_1 i"}</Math></li>
          <li><strong>Dépenses publiques</strong> : <Math>G</Math> exogène</li>
        </ul>

        <FormulaBox label="Multiplicateur keynésien" highlight>
          {"k = \\frac{1}{1 - c_1} = \\frac{1}{s}"}
        </FormulaBox>

        <Callout type="warning" title="À quoi sert le multiplicateur ?">
          <Math>{"\\Delta Y = k \\times \\Delta G"}</Math><br/><br/>
          Si <Math>{"c_1 = 0.8"}</Math> → <Math>{"k = 5"}</Math><br/>
          Une hausse de G de 100 → hausse de Y de 500
        </Callout>

        <p className="mt-4"><strong>Propriétés de IS :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pente <strong>négative</strong> : <Math>{"i \\uparrow \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}</Math></li>
          <li>Déplacement vers la droite : <Math>{"G \\uparrow"}</Math> ou <Math>{"T \\downarrow"}</Math></li>
        </ul>
      </Section>

      <Section type="formule" title="La courbe LM — Marché monétaire">
        <FormulaBox label="Équilibre du marché monétaire" highlight>
          {"\\frac{M^S}{P} = \\frac{M^D}{P} = L(Y, i)"}
        </FormulaBox>

        <Callout type="insight" title="Offre vs Demande de monnaie">
          <strong><Math>{"\\frac{M^S}{P}"}</Math></strong> = Offre de monnaie réelle (fixée par la BC)<br/><br/>
          <strong><Math>{"\\frac{M^D}{P}"}</Math></strong> = Demande de monnaie réelle<br/>
          • Dépend du revenu Y (motif de transaction)<br/>
          • Dépend du taux i (coût d'opportunité)
        </Callout>

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
          caption="IS décroissante, LM croissante"
        />
      </Section>

      <Section type="graphique" title="Politique budgétaire expansionniste">
        <p className="mb-4">Une hausse des dépenses publiques G déplace IS vers la droite.</p>
        <Graph
          src="/macro/assets/2.png"
          alt="Politique budgétaire IS-LM"
          figure={2}
          caption="↑G → IS vers la droite → ↑Y et ↑i"
        />
        
        <Callout type="warning" title="Effet d'éviction">
          <Math>{"G \\uparrow \\Rightarrow Y \\uparrow \\Rightarrow i \\uparrow \\Rightarrow I \\downarrow"}</Math><br/>
          La hausse du taux d'intérêt réduit l'investissement privé.
        </Callout>
      </Section>

      <Section type="graphique" title="Politique monétaire expansionniste">
        <p className="mb-4">Une hausse de la masse monétaire M déplace LM vers la droite.</p>
        <Graph
          src="/macro/assets/3.png"
          alt="Politique monétaire IS-LM"
          figure={3}
          caption="↑M → LM vers la droite → ↑Y et ↓i"
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
          caption="↑G + ↑M → Y augmente fortement, i reste stable"
        />
        
        <Callout type="insight" title="Question classique QCM">
          "Quelle politique pour maximiser l'efficacité d'une hausse de G ?" → <strong>Politique monétaire expansionniste</strong> pour compenser l'effet d'éviction.
        </Callout>
      </Section>

      <Section type="key" title="Méthode : Résoudre un modèle IS/LM">
        <p className="mb-2"><strong>Étape 1 :</strong> Écrire l'équation IS (équilibre marché des biens)</p>
        <p className="mb-2"><strong>Étape 2 :</strong> Écrire l'équation LM (équilibre marché monétaire)</p>
        <p className="mb-2"><strong>Étape 3 :</strong> Résoudre le système pour trouver <Math>{"(Y^*, i^*)"}</Math></p>
        <p><strong>Étape 4 :</strong> Calculer <Math>{"C^*"}</Math> et <Math>{"I^*"}</Math>, vérifier <Math>{"C^* + I^* + G = Y^*"}</Math></p>
      </Section>

      <Section type="warning" title="Les erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre nominal et réel</strong> — Toujours raisonner en termes réels</li>
          <li><strong>Oublier le multiplicateur</strong> — ΔG = 100 → ΔY = 100 × k, pas 100</li>
          <li><strong>Inverser les pentes</strong> — IS décroissante, LM croissante</li>
          <li><strong>Négliger l'éviction</strong> — ↑G → ↑i → ↓I</li>
          <li><strong>Multiplicateur</strong> — C'est <Math>{"\\frac{1}{1-c}"}</Math> et non <Math>{"\\frac{1}{c}"}</Math></li>
        </ul>
      </Section>
    </ChapterLayout>
  );
}
