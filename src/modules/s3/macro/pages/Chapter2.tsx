import { Section, Callout, FormulaBox, Graph, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter2() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 02"
        title="Le Marché du Travail"
        description="Définitions, modèle classique et modèle WS-PS pour comprendre le chômage."
      />

      <Section type="intuition" title="Définitions clés">
        <FormulaBox label="Population">
          {"\\text{Pop. en âge de travailler} = \\text{Pop. active} + \\text{Inactifs}"}
        </FormulaBox>
        <FormulaBox label="Population active">
          {"\\text{Pop. active} = \\text{Employés} + \\text{Chômeurs}"}
        </FormulaBox>

        <p className="mb-2"><strong>Notations :</strong> <Math>{"L"}</Math> = population active, <Math>{"N"}</Math> = employés, <Math>{"U"}</Math> = chômeurs</p>

        <Table headers={['Taux', 'Formule', 'Avec notations']}>
          <TableRow>
            <TableCell><strong>Taux d'activité</strong></TableCell>
            <TableCell><Math>{"\\frac{\\text{Pop. active}}{\\text{Pop. en âge de travailler}}"}</Math></TableCell>
            <TableCell><Math>{"\\frac{L}{\\text{Pop. en âge de travailler}}"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Taux d'emploi</strong></TableCell>
            <TableCell><Math>{"\\frac{\\text{Employés}}{\\text{Pop. en âge de travailler}}"}</Math></TableCell>
            <TableCell><Math>{"\\frac{N}{\\text{Pop. en âge de travailler}}"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Taux de chômage</strong></TableCell>
            <TableCell><Math>{"u = \\frac{\\text{Chômeurs}}{\\text{Pop. active}}"}</Math></TableCell>
            <TableCell><Math>{"u = \\frac{U}{L} = \\frac{L-N}{L} = 1 - \\frac{N}{L}"}</Math></TableCell>
          </TableRow>
        </Table>

        <FormulaBox label="Relation fondamentale">
          {"L = N + U \\quad \\Leftrightarrow \\quad N = L(1-u)"}
        </FormulaBox>

        <Callout type="insight" title="Définition du chômage (BIT)">
          3 conditions simultanées :<br/>
          1. Être <strong>sans emploi</strong> (pas travaillé au moins 1h dans la semaine)<br/>
          2. Être <strong>disponible</strong> pour travailler dans les 15 jours<br/>
          3. Avoir <strong>cherché activement</strong> un emploi dans le mois précédent
        </Callout>
      </Section>

      <Section type="intuition" title="Types de chômage">
        <p className="mb-4">Comprendre les différents types de chômage est essentiel car ils appellent des politiques différentes :</p>
        
        <Table headers={['Type', 'Description', 'Politique adaptée']}>
          <TableRow>
            <TableCell><strong>Frictionnel</strong></TableCell>
            <TableCell>Temps d'appariement emplois/travailleurs dû à l'information imparfaite. Les travailleurs mettent du temps à trouver un emploi correspondant à leurs compétences.</TableCell>
            <TableCell>Améliorer l'information (Pôle Emploi, plateformes)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Structurel</strong></TableCell>
            <TableCell>Inadéquation durable entre offre et demande de travail : compétences obsolètes, rigidités salariales, réglementations.</TableCell>
            <TableCell>Formation, flexibilité du marché du travail</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Naturel</strong></TableCell>
            <TableCell>Frictionnel + Structurel. C'est le taux de chômage "normal" vers lequel l'économie converge à moyen terme. Noté <Math>{"u_n"}</Math>.</TableCell>
            <TableCell>Réformes structurelles</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Conjoncturel</strong></TableCell>
            <TableCell>Écart entre chômage courant et chômage naturel. Lié aux fluctuations du cycle économique (récessions).</TableCell>
            <TableCell>Politiques de relance (budgétaire, monétaire)</TableCell>
          </TableRow>
        </Table>

        <Callout type="warning" title="Distinction cruciale">
          Le chômage <strong>conjoncturel</strong> peut être combattu par des politiques de demande (<Math>{"G \\uparrow"}</Math>, <Math>{"M \\uparrow"}</Math>). Le chômage <strong>naturel</strong> ne peut être réduit que par des réformes structurelles (formation, concurrence, flexibilité).
        </Callout>

        <p className="mt-6 mb-2"><strong>Concepts complémentaires :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Halo du chômage</strong> : Personnes qui souhaitent travailler mais ne remplissent pas tous les critères BIT (pas de recherche active, pas disponibles immédiatement). Elles sont comptées comme "inactives" mais sont proches du chômage.
          </li>
          <li>
            <strong>Sous-emploi</strong> : Personnes en emploi mais qui travaillent moins qu'elles ne le souhaiteraient. Inclut le temps partiel subi et le chômage technique (activité partielle).
          </li>
          <li>
            <strong>Marché dual</strong> : Le marché du travail est segmenté en deux :
            <ul className="list-disc pl-6 mt-1">
              <li><strong>Marché primaire</strong> : Emplois stables, bien rémunérés, avec perspectives de carrière (CDI, grandes entreprises)</li>
              <li><strong>Marché secondaire</strong> : Emplois précaires, mal payés, peu de formation (CDD, intérim, temps partiel subi)</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section type="formule" title="Le modèle classique du marché du travail">
        <p className="mb-4">Le modèle classique est le point de départ de l'analyse du marché du travail. Il repose sur des hypothèses fortes qui conduisent à des conclusions optimistes sur le fonctionnement de l'économie.</p>

        <p className="mb-2"><strong>Hypothèses du modèle :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Concurrence pure et parfaite</strong> : Nombreux offreurs et demandeurs, aucun n'a de pouvoir de marché</li>
          <li><strong>Flexibilité parfaite des salaires réels</strong> : Les salaires s'ajustent instantanément pour équilibrer le marché</li>
          <li><strong>Information parfaite</strong> : Tous les agents connaissent les conditions du marché</li>
        </ul>

        <p className="mb-2"><strong>Demande de travail (firmes) :</strong></p>
        <p className="mb-4">La firme représentative maximise son profit. Avec une fonction de production <Math>{"Y = F(K, L)"}</Math> :</p>
        <FormulaBox label="Profit de la firme">
          {"\\pi = PY - wL - cK"}
        </FormulaBox>
        <p className="mb-2">où P = prix de vente, w = salaire nominal, c = coût du capital.</p>
        <p className="mb-2">La condition du premier ordre donne :</p>
        <FormulaBox label="Condition d'optimalité" highlight>
          {"F'_L = \\frac{w}{P}"}
        </FormulaBox>
        <p className="mb-4"><strong>Interprétation</strong> : La firme embauche jusqu'à ce que la <strong>productivité marginale du travail</strong> égale le <strong>salaire réel</strong>. Comme la productivité marginale est décroissante (rendements décroissants), la demande de travail est <strong>décroissante</strong> avec le salaire réel.</p>

        <p className="mb-2"><strong>Offre de travail (ménages) :</strong></p>
        <p className="mb-4">Le ménage arbitre entre consommation et loisir. S'il dispose de 24h (hors sommeil), avec Z heures de loisir :</p>
        <FormulaBox label="Contrainte budgétaire">
          {"C = \\frac{w}{P}(24 - Z)"}
        </FormulaBox>
        
        <p className="mb-2"><strong>Deux effets d'une hausse du salaire réel :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Effet substitution</strong> : Le loisir devient relativement plus "cher" (son coût d'opportunité augmente). Le travailleur substitue du loisir par du travail <Math>{"\\Rightarrow"}</Math> <strong>Offre de travail <Math>{"\\uparrow"}</Math></strong>
          </li>
          <li>
            <strong>Effet revenu</strong> : Le travailleur est plus riche, il peut "s'offrir" plus de loisir <Math>{"\\Rightarrow"}</Math> <strong>Offre de travail <Math>{"\\downarrow"}</Math></strong>
          </li>
        </ul>
        
        <Callout type="insight" title="Quel effet domine ?">
          <strong>Généralement</strong>, l'effet substitution domine l'effet revenu <Math>{"\\Rightarrow"}</Math> l'offre de travail est <strong>croissante</strong> avec le salaire réel.<br/><br/>
          <strong>Exception</strong> : À très hauts salaires, l'effet revenu peut dominer (les très riches travaillent moins). C'est pourquoi la courbe d'offre peut se "recourber" (backward-bending).
        </Callout>

        <p className="mt-4 mb-2"><strong>Équilibre classique :</strong></p>
        <p className="mb-4">L'intersection de l'offre et de la demande de travail détermine le salaire réel d'équilibre et le niveau d'emploi.</p>

        <Callout type="warning" title="Résultat fondamental du modèle classique">
          À l'équilibre : <strong>Plein emploi</strong>. Tout le chômage est <strong>volontaire</strong> (refus de travailler au salaire d'équilibre).<br/><br/>
          <strong>Seule cause de chômage involontaire</strong> : une rigidité des salaires qui empêche l'ajustement. Exemple : si le SMIC est fixé au-dessus du salaire d'équilibre, il y aura un excès d'offre de travail (chômage).
        </Callout>
      </Section>

      <Section type="intuition" title="Pourquoi le modèle WS/PS ?">
        <p className="mb-4">Le modèle classique, malgré son élégance, ne correspond pas à la réalité observée. Il ignore plusieurs caractéristiques essentielles du marché du travail :</p>
        
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Le pouvoir de marché des travailleurs</strong> : Les syndicats, les conventions collectives, et le pouvoir de négociation individuel permettent aux travailleurs d'obtenir des salaires supérieurs au salaire d'équilibre concurrentiel.
          </li>
          <li>
            <strong>Le pouvoir de marché des firmes</strong> : Les entreprises ne sont pas en concurrence parfaite. Elles ont du pouvoir de marché (monopole, oligopole) et peuvent fixer des prix avec une <strong>marge</strong> (markup) sur leurs coûts.
          </li>
          <li>
            <strong>Les imperfections du marché</strong> : Information imparfaite, coûts de recherche d'emploi, discrimination, segmentation du marché.
          </li>
          <li>
            <strong>Le chômage involontaire</strong> : Dans la réalité, des personnes veulent travailler au salaire en vigueur mais ne trouvent pas d'emploi. Le modèle classique ne peut pas expliquer ce phénomène.
          </li>
        </ul>

        <Callout type="insight" title="L'apport du modèle WS/PS">
          Le modèle WS/PS (Wage Setting / Price Setting) corrige ces lacunes en modélisant explicitement :<br/>
          • <strong>WS</strong> : Comment les salaires sont négociés (pouvoir des travailleurs)<br/>
          • <strong>PS</strong> : Comment les prix sont fixés (pouvoir des firmes, structures de marché)<br/><br/>
          Ce modèle permet d'expliquer l'existence d'un <strong>chômage d'équilibre</strong> (chômage naturel) même quand l'économie fonctionne "normalement".
        </Callout>
      </Section>

      <Section type="formule" title="L'équation WS — Wage Setting">
        <p className="mb-4">Le modèle classique ignore le pouvoir de marché et le chômage involontaire. WS-PS corrige cela.</p>

        <FormulaBox label="Négociation salariale" highlight>
          {"W = P^e \\cdot F(u, z)"}
        </FormulaBox>

        <p className="mb-4">Forme linéaire courante :</p>
        <FormulaBox label="WS linéaire">
          {"\\frac{W}{P^e} = z(1 - \\alpha u)"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"P^e"}</Math> = niveau des prix anticipé</li>
          <li><Math>u</Math> = taux de chômage (effet <strong>négatif</strong> sur W)</li>
          <li><Math>z</Math> = facteurs institutionnels : allocations, syndicats (effet <strong>positif</strong> sur W)</li>
          <li><Math>{"\\alpha"}</Math> = sensibilité du salaire au chômage</li>
        </ul>

        <Callout type="insight" title="Interprétation">
          Plus le chômage est faible, plus le pouvoir de négociation des travailleurs est fort <Math>{"\\Rightarrow"}</Math> salaires plus élevés.
        </Callout>
      </Section>

      <Section type="formule" title="L'équation PS — Price Setting">
        <p className="mb-4">L'équation PS décrit comment les entreprises fixent leurs prix. En situation de concurrence imparfaite, les firmes ont du <strong>pouvoir de marché</strong> et peuvent fixer un prix supérieur à leur coût marginal.</p>

        <FormulaBox label="Fixation des prix" highlight>
          {"P = (1 + \\mu)W"}
        </FormulaBox>

        <p className="mb-4">où <Math>{"\\mu"}</Math> est le <strong>taux de marge</strong> (markup). En réarrangeant, on obtient le salaire réel :</p>
        
        <FormulaBox label="Salaire réel PS">
          {"\\frac{W}{P} = \\frac{1}{1 + \\mu}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Le taux de marge μ et les structures de marché :</strong></p>
        <p className="mb-4">Le taux de marge dépend du <strong>degré de concurrence</strong> sur le marché des biens :</p>
        
        <Table headers={['Structure de marché', 'Taux de marge μ', 'Salaire réel W/P', 'Interprétation']}>
          <TableRow>
            <TableCell><strong>Concurrence parfaite</strong></TableCell>
            <TableCell><Math>{"\\mu = 0"}</Math></TableCell>
            <TableCell><Math>{"W/P = 1"}</Math></TableCell>
            <TableCell>Prix = coût marginal, tout le revenu va aux travailleurs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Concurrence monopolistique</strong></TableCell>
            <TableCell><Math>{"\\mu"}</Math> faible</TableCell>
            <TableCell><Math>{"W/P"}</Math> proche de 1</TableCell>
            <TableCell>Différenciation des produits, marges modérées</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Oligopole</strong></TableCell>
            <TableCell><Math>{"\\mu"}</Math> moyen</TableCell>
            <TableCell><Math>{"W/P"}</Math> intermédiaire</TableCell>
            <TableCell>Quelques grandes firmes, pouvoir de marché significatif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Monopole</strong></TableCell>
            <TableCell><Math>{"\\mu"}</Math> élevé</TableCell>
            <TableCell><Math>{"W/P"}</Math> faible</TableCell>
            <TableCell>Une seule firme, marge maximale</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Interprétation économique">
          Plus le marché est <strong>concentré</strong> (moins de concurrence), plus les firmes peuvent imposer des marges élevées. Cela se traduit par un salaire réel plus faible pour les travailleurs : une partie de la valeur créée est captée par les profits.
        </Callout>

        <Callout type="warning" title="Point crucial pour les graphiques">
          PS ne dépend <strong>PAS</strong> du chômage. C'est une droite <strong>horizontale</strong> dans le graphique <Math>{"(W/P, u)"}</Math>. Le salaire réel offert par les firmes est fixé par la structure du marché, indépendamment du niveau de chômage.
        </Callout>
      </Section>

      <Section type="graphique" title="L'équilibre WS-PS">
        <Graph
          src="/macro/assets/5.png"
          alt="Équilibre WS-PS"
          figure={5}
          caption="WS décroissante, PS horizontale. L'intersection détermine le chômage naturel uₙ."
        />
        
        <p className="mt-4">À l'équilibre (<Math>{"P = P^e"}</Math>) :</p>
        <FormulaBox label="Taux de chômage naturel">
          {"F(u_n, z) = \\frac{1}{1 + \\mu}"}
        </FormulaBox>

        <p className="mt-4">Avec la forme linéaire :</p>
        <FormulaBox label="Calcul de uₙ">
          {"u_n = \\frac{1}{\\alpha}\\left(1 - \\frac{1}{z(1+\\mu)}\\right)"}
        </FormulaBox>
      </Section>

      <Section type="graphique" title="Hausse des allocations chômage (↑z)">
        <Graph
          src="/macro/assets/6.png"
          alt="Effet hausse z"
          figure={6}
          caption="↑z déplace WS vers le haut → uₙ augmente. Plus d'allocations = plus de pouvoir de négociation."
        />
      </Section>

      <Section type="graphique" title="Hausse du taux de marge (↑μ)">
        <Graph
          src="/macro/assets/7.png"
          alt="Effet hausse μ"
          figure={7}
          caption="↑μ (baisse de concurrence) déplace PS vers le bas → uₙ augmente, W/P diminue."
        />
      </Section>

      <Section type="graphique" title="Progrès technique (↑A)">
        <Graph
          src="/macro/assets/8.png"
          alt="Effet progrès technique"
          figure={8}
          caption="↑A déplace PS vers le haut → uₙ diminue, W/P augmente. Le progrès technique est bénéfique."
        />
      </Section>

      <Section type="key" title="Effets des paramètres sur uₙ">
        <Table headers={['Variation', 'Effet sur uₙ', 'Mécanisme']}>
          <TableRow>
            <TableCell><Math>{"z \\uparrow"}</Math> (allocations)</TableCell>
            <TableCell><Math>{"u_n \\uparrow"}</Math></TableCell>
            <TableCell>WS se déplace vers la droite</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"\\mu \\uparrow"}</Math> (moins de concurrence)</TableCell>
            <TableCell><Math>{"u_n \\uparrow"}</Math></TableCell>
            <TableCell>PS se déplace vers le bas</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Productivité <Math>{"\\uparrow"}</Math> (à <Math>{"\\mu"}</Math> constant)</TableCell>
            <TableCell><Math>{"u_n \\downarrow"}</Math></TableCell>
            <TableCell>PS se déplace vers le haut</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Concurrence <Math>{"\\uparrow"}</Math></TableCell>
            <TableCell><Math>{"u_n \\downarrow"}</Math></TableCell>
            <TableCell><Math>{"\\mu \\downarrow \\Rightarrow"}</Math> PS se déplace vers le haut</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="Du chômage naturel au produit naturel">
        <FormulaBox label="Emploi naturel">
          {"N_n = L(1 - u_n)"}
        </FormulaBox>
        <FormulaBox label="Produit naturel (si Y = N)">
          {"Y_n = N_n = L(1 - u_n)"}
        </FormulaBox>

        <Callout type="tip" title="Méthode de calcul">
          1. Calculer le salaire réel PS : <Math>{"\\frac{W}{P} = \\frac{1}{1+\\mu}"}</Math><br/>
          2. Égaliser <Math>{"WS = PS"}</Math> pour trouver <Math>{"u_n"}</Math><br/>
          3. Calculer <Math>{"Y_n = L(1-u_n)"}</Math>
        </Callout>
      </Section>

      <Section type="warning" title="Les erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre WS et offre de travail</strong> — <Math>{"WS"}</Math> = négociations, pas offre walrasienne</li>
          <li><strong>Penser que PS dépend de u</strong> — PS est HORIZONTALE</li>
          <li><strong>Oublier les anticipations</strong> — <Math>{"WS"}</Math> dépend de <Math>{"P^e"}</Math>, <Math>{"PS"}</Math> de <Math>P</Math></li>
          <li><strong>Mal interpréter les déplacements</strong> — <Math>{"z \\uparrow \\Rightarrow WS"}</Math> vers le HAUT (pas la droite)</li>
          <li><strong>Confondre P et <Math>{"P^e"}</Math></strong> dans les équations WS/PS</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/macro/chapitre-1', label: '← Chapitre précédent', title: 'Introduction & IS-LM' }}
        next={{ path: '/macro/chapitre-3', label: 'Chapitre suivant →', title: "L'Équilibre AS-AD" }}
      />
    </main>
  );
}
