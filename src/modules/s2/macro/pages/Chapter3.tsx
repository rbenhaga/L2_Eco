import { Section, Callout, FormulaBox, Graph, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter3() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 03"
        title="L'Équilibre AS-AD"
        description="La synthèse de IS-LM et WS-PS pour analyser la dynamique court terme / moyen terme."
      />

      <Section type="intuition" title="Combiner les deux blocs">
        <p className="mb-4">Jusqu'ici, nous avons étudié deux modèles séparés :</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>IS-LM</strong> — Équilibre simultané des marchés des biens et de la monnaie. Mais ce modèle suppose que le niveau des prix P est <strong>fixe</strong>.</li>
          <li><strong>WS-PS</strong> — Détermination du salaire réel et du taux de chômage naturel. Ce modèle explique comment P est déterminé via les négociations salariales et les marges.</li>
        </ul>

        <p className="mb-4"><strong>Question centrale :</strong> Comment ces deux blocs interagissent-ils ? Que se passe-t-il quand le niveau des prix P varie ?</p>

        <p className="mb-4">Le modèle <strong>AS-AD</strong> (Aggregate Supply - Aggregate Demand) répond à cette question en combinant les deux approches. Il permet d'analyser :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Les effets de <strong>court terme</strong> des politiques économiques</li>
          <li>La <strong>dynamique d'ajustement</strong> vers le moyen terme</li>
          <li>Les <strong>chocs d'offre</strong> (ex: crise pétrolière) et leurs conséquences</li>
        </ul>

        <Callout type="insight" title="Analogie">
          IS-LM décrit le comportement de l'économie à niveau de prix fixe (comme une photo instantanée). AS-AD lève cette contrainte et montre comment l'économie évolue dans le temps quand les prix s'ajustent (comme un film).
        </Callout>

        <Table headers={['Courbe', 'Origine', 'Pente', 'Ce qu\'elle capture']}>
          <TableRow>
            <TableCell><strong>AD</strong> (Demande Agrégée)</TableCell>
            <TableCell>Dérivée de IS-LM</TableCell>
            <TableCell>Négative</TableCell>
            <TableCell>Effet de P sur Y via le marché monétaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>AS</strong> (Offre Agrégée)</TableCell>
            <TableCell>Dérivée de WS-PS</TableCell>
            <TableCell>Positive</TableCell>
            <TableCell>Effet de Y sur P via le marché du travail</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="La courbe AD — Demande Agrégée">
        <p className="mb-4">La courbe AD représente l'ensemble des combinaisons (Y, P) qui assurent l'équilibre simultané sur les marchés des biens et de la monnaie. Elle est dérivée du modèle IS-LM en faisant varier P.</p>

        <FormulaBox label="Demande Agrégée (forme réduite)" highlight>
          {"Y = \\gamma \\left(G - cT + \\frac{M}{P}\\right)"}
        </FormulaBox>

        <p className="mb-4">où <Math>{"\\gamma"}</Math> est un paramètre positif qui dépend des sensibilités de la consommation, de l'investissement et de la demande de monnaie.</p>

        <p className="mb-2"><strong>Pourquoi AD est-elle décroissante ?</strong></p>
        <p className="mb-4">Le mécanisme passe par le marché monétaire (effet Keynes) :</p>
        
        <FormulaBox label="Mécanisme de transmission">
          {"P \\uparrow \\Rightarrow \\frac{M}{P} \\downarrow \\Rightarrow i \\uparrow \\text{ (LM)} \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}
        </FormulaBox>

        <p className="mb-4"><strong>Explication détaillée :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Quand P augmente, l'offre réelle de monnaie <Math>{"M/P"}</Math> diminue (M nominal est fixe)</li>
          <li>Sur le marché monétaire, cela crée un excès de demande de monnaie</li>
          <li>Pour rétablir l'équilibre, le taux d'intérêt i doit augmenter (LM se déplace vers le haut)</li>
          <li>La hausse de i réduit l'investissement I (coût du crédit plus élevé)</li>
          <li>La baisse de I réduit la demande globale et donc la production Y</li>
        </ol>

        <p className="mb-2"><strong>Déplacements de AD :</strong></p>
        <Table headers={['Choc', 'Effet sur AD', 'Mécanisme']}>
          <TableRow>
            <TableCell><Math>{"G \\uparrow"}</Math></TableCell>
            <TableCell>AD → <strong>droite</strong></TableCell>
            <TableCell>Hausse directe de la demande</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"T \\uparrow"}</Math></TableCell>
            <TableCell>AD → <strong>gauche</strong></TableCell>
            <TableCell>Baisse du revenu disponible → C↓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"M \\uparrow"}</Math></TableCell>
            <TableCell>AD → <strong>droite</strong></TableCell>
            <TableCell>i↓ → I↑ → Y↑</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="La courbe AS">
        <p className="mb-4">Dérivation à partir de WS/PS avec <Math>{"u = 1 - \\frac{Y}{L}"}</Math> :</p>

        <FormulaBox label="Offre Agrégée" highlight>
          {"P = P^e (1+\\mu) F\\left(1 - \\frac{Y}{L}, z\\right)"}
        </FormulaBox>

        <p className="mb-4"><strong>Propriété cruciale :</strong> <Math>{"\\frac{\\partial P}{\\partial Y} > 0"}</Math> → Pente positive</p>
        
        <p className="mb-2"><strong>Mécanisme :</strong></p>
        <p className="mb-4"><Math>{"Y \\uparrow \\Rightarrow u \\downarrow \\Rightarrow W \\uparrow \\text{ (via WS)} \\Rightarrow P \\uparrow \\text{ (via PS)}"}</Math></p>

        <p className="mb-2"><strong>Propriétés importantes :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>AS passe par le point <Math>{"(Y_n, P^e)"}</Math> : Quand <Math>{"Y = Y_n"}</Math>, alors <Math>{"P = P^e"}</Math></li>
          <li><Math>{"P^e \\uparrow"}</Math> → AS se déplace vers le <strong>haut</strong></li>
          <li><Math>{"\\mu \\uparrow"}</Math> ou <Math>{"z \\uparrow"}</Math> → AS vers la <strong>gauche</strong> (car <Math>{"Y_n \\downarrow"}</Math>)</li>
        </ul>

        <Callout type="insight" title="Court terme vs Moyen terme">
          <strong>Court terme</strong> : <Math>{"P^e"}</Math> fixe → AS a une pente positive<br/>
          <strong>Moyen terme</strong> : <Math>{"P = P^e"}</Math> → AS devient <strong>verticale</strong> en <Math>{"Y_n"}</Math>
        </Callout>
      </Section>

      <Section type="graphique" title="L'équilibre AS-AD">
        <Graph
          src="/macro/assets/9.png"
          alt="Équilibre AS-AD"
          figure={9}
          caption="AD décroissante, AS croissante. L'intersection détermine (Y*, P*)."
        />

        <Table headers={['', 'Court terme', 'Moyen terme']}>
          <TableRow>
            <TableCell><strong>Y</strong></TableCell>
            <TableCell><Math>{"\\neq Y_n"}</Math> possible</TableCell>
            <TableCell><Math>{"= Y_n"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>P</strong></TableCell>
            <TableCell><Math>{"\\neq P^e"}</Math> possible</TableCell>
            <TableCell><Math>{"= P^e"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Anticipations</strong></TableCell>
            <TableCell>Peuvent être fausses</TableCell>
            <TableCell>Correctes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Marché du travail</strong></TableCell>
            <TableCell>Pas nécessairement à l'équilibre</TableCell>
            <TableCell>À l'équilibre (<Math>{"u = u_n"}</Math>)</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Équilibre de moyen terme">
          À moyen terme, <strong>tous les marchés sont à l'équilibre</strong> :<br/>
          • Marché des biens : <Math>{"Y = C + I + G"}</Math><br/>
          • Marché monétaire : <Math>{"M/P = L(Y, i)"}</Math><br/>
          • Marché du travail : <Math>{"u = u_n"}</Math>, <Math>{"Y = Y_n"}</Math><br/>
          • Anticipations correctes : <Math>{"P = P^e"}</Math>
        </Callout>
      </Section>

      <Section type="graphique" title="Politique budgétaire — Court terme">
        <Graph
          src="/macro/assets/10.png"
          alt="Politique budgétaire CT"
          figure={10}
          caption="↑G déplace AD vers la droite → Y₁ > Yₙ et P₁ > P₀. L'économie est en surchauffe."
        />
      </Section>

      <Section type="graphique" title="La convergence vers le moyen terme">
        <Graph
          src="/macro/assets/11.png"
          alt="Dynamique CT vers MT"
          figure={11}
          caption="Après un choc, AS se déplace progressivement jusqu'au retour à Yₙ."
        />

        <p className="mb-2 mt-4"><strong>Mécanisme d'ajustement (anticipations adaptatives) :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Choc de demande positif : AD → droite</li>
          <li>Court terme : <Math>{"Y_1 > Y_n"}</Math>, <Math>{"P_1 > P_0"}</Math></li>
          <li><Math>{"P_1 > P^e"}</Math> → Agents révisent anticipations : <Math>{"P^e \\uparrow"}</Math></li>
          <li>AS se déplace vers le haut</li>
          <li>Moyen terme : retour à <Math>{"Y_n"}</Math> avec <Math>{"P_2 > P_1"}</Math></li>
        </ol>

        <Callout type="tip" title="Résultat fondamental">
          À moyen terme, la politique budgétaire n'affecte pas Y (<strong>neutralité</strong>), mais augmente durablement P (<strong>effet inflationniste</strong>).
        </Callout>
      </Section>

      <Section type="graphique" title="Choc d'offre négatif — Stagflation">
        <p className="mb-4">Un choc d'offre négatif est une perturbation qui réduit la capacité de production de l'économie ou augmente les coûts de production. Contrairement aux chocs de demande, il affecte directement la courbe AS.</p>

        <Graph
          src="/macro/assets/12.png"
          alt="Stagflation"
          figure={12}
          caption="↑μ (crise énergétique) déplace AS vers le haut-gauche → ↑P ET ↓Y simultanément."
        />

        <p className="mt-4 mb-2"><strong>Exemples de chocs d'offre négatifs :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Hausse du prix du pétrole</strong> : Augmente les coûts de production (μ↑)</li>
          <li><strong>Catastrophe naturelle</strong> : Détruit du capital productif</li>
          <li><strong>Hausse du pouvoir syndical</strong> : z↑ → salaires plus élevés</li>
          <li><strong>Réglementation plus stricte</strong> : Augmente les coûts</li>
        </ul>

        <Callout type="warning" title="La stagflation : le pire des deux mondes">
          La <strong>stagflation</strong> est une situation où l'inflation augmente ET la production diminue simultanément. C'est le cauchemar des décideurs car :<br/><br/>
          • Une politique de relance (G↑, M↑) réduirait le chômage mais aggraverait l'inflation<br/>
          • Une politique restrictive réduirait l'inflation mais aggraverait le chômage<br/><br/>
          <strong>Exemple historique</strong> : Les chocs pétroliers de 1973 et 1979 ont provoqué une stagflation mondiale. Le prix du pétrole a quadruplé, augmentant les coûts de production (AS→gauche) tout en réduisant le pouvoir d'achat des consommateurs.
        </Callout>
      </Section>

      <Section type="graphique" title="La trappe à liquidité">
        <p className="mb-4">La trappe à liquidité est une situation exceptionnelle où la politique monétaire perd toute efficacité. Elle se produit quand le taux d'intérêt nominal atteint sa borne inférieure (zéro ou proche de zéro).</p>

        <Graph
          src="/macro/assets/13.png"
          alt="Trappe à liquidité"
          figure={13}
          caption="Quand i = 0, AD devient verticale. La politique monétaire est inefficace."
        />

        <p className="mt-4 mb-2"><strong>Pourquoi le taux ne peut-il pas descendre sous zéro ?</strong></p>
        <p className="mb-4">Si le taux d'intérêt était négatif, les agents préféreraient détenir de la monnaie (qui rapporte 0%) plutôt que des obligations (qui rapporteraient moins que 0%). La demande de monnaie devient alors <strong>infiniment élastique</strong> : toute injection de monnaie est absorbée sans effet sur le taux.</p>

        <p className="mb-2"><strong>Conséquences de la trappe à liquidité :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Politique monétaire inefficace</strong> : Augmenter M ne fait pas baisser i (déjà à 0), donc n'augmente pas I ni Y</li>
          <li><strong>Courbe AD verticale</strong> : Le mécanisme P→M/P→i→I→Y est bloqué</li>
          <li><strong>Politique budgétaire très efficace</strong> : Pas d'effet d'éviction car i ne peut pas monter</li>
          <li><strong>Risque de déflation</strong> : Si P baisse, la dette réelle augmente (effet Fisher), aggravant la récession</li>
        </ul>

        <Callout type="warning" title="Politiques non conventionnelles">
          Face à la trappe à liquidité, les banques centrales ont développé des outils non conventionnels :<br/><br/>
          • <strong>Quantitative Easing (QE)</strong> : Achats massifs de titres pour injecter de la liquidité<br/>
          • <strong>Forward Guidance</strong> : Engagement à maintenir les taux bas longtemps<br/>
          • <strong>Taux négatifs</strong> : Certaines BC (BCE, BoJ) ont testé des taux légèrement négatifs<br/>
          • <strong>Helicopter money</strong> : Distribution directe de monnaie aux ménages (théorique)
        </Callout>

        <Callout type="insight" title="Applications historiques">
          • <strong>Japon (années 1990-2000)</strong> : Première trappe à liquidité moderne, "décennie perdue"<br/>
          • <strong>Crise de 2008</strong> : Taux à 0% aux USA, en Europe, au Japon → QE massif<br/>
          • <strong>COVID-19 (2020)</strong> : Retour à la borne zéro, politiques budgétaires massives
        </Callout>
      </Section>

      <Section type="key" title="Méthode : Analyser un choc dans AS/AD">
        <p className="mb-2"><strong>Étape 1 : Identifier le type de choc</strong></p>
        <Table headers={['Choc', 'Courbe affectée', 'Direction']}>
          <TableRow>
            <TableCell><Math>{"G \\uparrow"}</Math> ou <Math>{"M \\uparrow"}</Math></TableCell>
            <TableCell>AD</TableCell>
            <TableCell>Droite</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"T \\uparrow"}</Math></TableCell>
            <TableCell>AD</TableCell>
            <TableCell>Gauche</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"P^e \\uparrow"}</Math></TableCell>
            <TableCell>AS</TableCell>
            <TableCell>Haut</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"\\mu \\uparrow"}</Math> ou <Math>{"z \\uparrow"}</Math></TableCell>
            <TableCell>AS</TableCell>
            <TableCell>Gauche (car <Math>{"Y_n \\downarrow"}</Math>)</TableCell>
          </TableRow>
        </Table>

        <p className="mb-2 mt-4"><strong>Étape 2 : Analyser l'effet de court terme</strong></p>
        <p className="mb-4">Tracer le déplacement, identifier le nouvel équilibre CT, comparer <Math>{"Y_1"}</Math> à <Math>{"Y_n"}</Math>.</p>

        <p className="mb-2"><strong>Étape 3 : Analyser l'ajustement vers le moyen terme</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Si <Math>{"Y_1 > Y_n"}</Math> (surchauffe) : <Math>{"P^e \\uparrow"}</Math> → AS ↑ → Y ↓ vers <Math>{"Y_n"}</Math></li>
          <li>Si <Math>{"Y_1 < Y_n"}</Math> (récession) : <Math>{"P^e \\downarrow"}</Math> → AS ↓ → Y ↑ vers <Math>{"Y_n"}</Math></li>
        </ul>
      </Section>

      <Section type="warning" title="Les erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre les pentes</strong> — AD négative, AS positive</li>
          <li><strong>Oublier les anticipations</strong> — AS dépend de <Math>{"P^e"}</Math></li>
          <li><strong>Penser que les politiques sont efficaces à MT</strong> — Convergence vers <Math>{"Y_n"}</Math></li>
          <li><strong>Négliger les déplacements de AS</strong> — Choc sur μ ou z déplace AS</li>
          <li><strong>Confondre effets CT et MT</strong> — Ils peuvent être opposés !</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/macro/chapitre-2', label: '← Chapitre précédent', title: 'Le Marché du Travail' }}
        next={{ path: '/macro/chapitre-4', label: 'Chapitre suivant →', title: 'La Politique Économique' }}
      />
    </main>
  );
}
