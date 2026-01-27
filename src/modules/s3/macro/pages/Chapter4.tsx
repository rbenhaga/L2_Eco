import { Section, Callout, FormulaBox, Graph, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter4() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 04"
        title="Politique Économique & Phillips"
        description="Les instruments de stabilisation, la dynamique de la dette et la courbe de Phillips."
      />

      <Section type="intuition" title="Les deux leviers de politique économique">
        <p className="mb-4">Les autorités disposent de deux grands leviers pour influencer l'activité économique. Leur coordination (le "policy mix") est essentielle pour atteindre les objectifs macroéconomiques.</p>

        <Table headers={['Politique', 'Acteur', 'Instruments', 'Effet principal']}>
          <TableRow>
            <TableCell><strong>Budgétaire</strong></TableCell>
            <TableCell>Gouvernement</TableCell>
            <TableCell>G (dépenses), T (taxes)</TableCell>
            <TableCell>Effet direct sur la demande (IS)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Monétaire</strong></TableCell>
            <TableCell>Banque centrale</TableCell>
            <TableCell>M (masse monétaire), i (taux directeurs)</TableCell>
            <TableCell>Effet indirect via le taux d'intérêt (LM)</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Différences fondamentales :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Délai d'action</strong> : La politique monétaire agit plus rapidement (décisions immédiates de la BC) que la politique budgétaire (processus législatif long)</li>
          <li><strong>Mécanisme</strong> : La politique budgétaire a un effet direct sur Y (G entre dans Y=C+I+G). La politique monétaire passe par i puis I.</li>
          <li><strong>Contraintes</strong> : La politique budgétaire est contrainte par la dette. La politique monétaire est contrainte par la borne zéro des taux.</li>
          <li><strong>Indépendance</strong> : La BC est indépendante du gouvernement (pour éviter le financement monétaire des déficits)</li>
        </ul>

        <Callout type="insight" title="Le policy mix optimal">
          Pour atteindre deux objectifs (plein emploi + stabilité des prix), il faut coordonner les deux instruments. Exemples :<br/><br/>
          • <strong>Relance sans inflation</strong> : G↑ + M↑ (les deux expansionnistes)<br/>
          • <strong>Lutte contre l'inflation</strong> : G↓ + M↓ (les deux restrictives)<br/>
          • <strong>Relance avec contrainte budgétaire</strong> : G neutre + M↑
        </Callout>
      </Section>

      <Section type="formule" title="La Banque Centrale et la politique monétaire">
        <p className="mb-4">La <strong>Banque Centrale Européenne (BCE)</strong> est l'institution responsable de la politique monétaire dans la zone euro. Son indépendance vis-à-vis des gouvernements est garantie par les traités européens.</p>

        <p className="mb-2"><strong>Objectifs de la BCE (par ordre de priorité) :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Objectif principal</strong> : Stabilité des prix (inflation proche mais inférieure à 2% à moyen terme)</li>
          <li><strong>Objectifs secondaires</strong> : Soutenir la croissance économique et l'emploi, <em>sans compromettre</em> la stabilité des prix</li>
        </ul>

        <Callout type="insight" title="Pourquoi 2% et pas 0% ?">
          Un objectif de 2% (et non 0%) permet :<br/>
          • D'avoir une marge de manœuvre pour baisser les taux réels (r = i - π)<br/>
          • D'éviter le risque de déflation (spirale déflationniste)<br/>
          • De faciliter l'ajustement des salaires réels (rigidité nominale à la baisse)
        </Callout>

        <p className="mt-4 mb-2"><strong>Les 3 taux directeurs de la BCE :</strong></p>
        <p className="mb-4">La BCE fixe trois taux qui encadrent le taux du marché interbancaire (€STR) :</p>
        
        <FormulaBox label="Corridor des taux">
          {"\\text{Taux dépôt} < \\text{Taux MRO} < \\text{Taux prêt marginal}"}
        </FormulaBox>

        <Table headers={['Taux', 'Description', 'Rôle']}>
          <TableRow>
            <TableCell><strong>Taux de dépôt</strong></TableCell>
            <TableCell>Rémunération des dépôts des banques à la BCE (24h)</TableCell>
            <TableCell>Plancher du taux interbancaire (aucune banque ne prête moins cher)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Taux MRO</strong></TableCell>
            <TableCell>Opérations principales de refinancement (prêts hebdomadaires)</TableCell>
            <TableCell>Taux directeur principal, référence pour le marché</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Taux de prêt marginal</strong></TableCell>
            <TableCell>Prêts d'urgence aux banques (24h)</TableCell>
            <TableCell>Plafond du taux interbancaire (aucune banque n'emprunte plus cher)</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Opérations REPO (prise en pension) :</strong></p>
        <p className="mb-4">C'est le mécanisme principal par lequel la BCE injecte de la liquidité dans le système bancaire :</p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>La BCE <strong>achète</strong> des titres (obligations) à une banque commerciale au prix <Math>{"P_t"}</Math></li>
          <li>La banque s'engage à <strong>racheter</strong> ces mêmes titres à une date future au prix <Math>{"P_{t+\\Delta}"}</Math></li>
          <li>La différence de prix correspond au <strong>taux d'intérêt implicite</strong> : <Math>{"i^{REPO} = \\frac{P_{t+\\Delta} - P_t}{P_t}"}</Math></li>
        </ol>

        <Callout type="tip" title="Pourquoi REPO et pas prêt direct ?">
          Le REPO est un prêt <strong>garanti</strong> par des titres (collatéral). Si la banque fait défaut, la BCE garde les titres. Cela réduit le risque pour la BCE et permet des taux plus bas.
        </Callout>

        <p className="mt-4 mb-2"><strong>Autres instruments conventionnels :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Réserves obligatoires</strong> : Les banques doivent déposer un % de leurs dépôts à la BCE. ↑ réserves = moins de crédit possible = politique restrictive.</li>
          <li><strong>Opérations d'open market</strong> : Achats/ventes de titres sur le marché secondaire pour ajuster la liquidité.</li>
        </ul>

        <p className="mt-4 mb-2"><strong>Politiques non conventionnelles (quand les taux sont à zéro) :</strong></p>
        <p className="mb-4">Quand les taux directeurs atteignent leur borne inférieure, la BCE utilise des outils non conventionnels :</p>
        
        <Table headers={['Politique', 'Description', 'Mécanisme']}>
          <TableRow>
            <TableCell><strong>QE (Quantitative Easing)</strong></TableCell>
            <TableCell>Achats massifs de titres (obligations d'État, d'entreprises)</TableCell>
            <TableCell>Injecte de la liquidité, fait baisser les taux longs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Forward Guidance</strong></TableCell>
            <TableCell>Communication sur les intentions futures de la BCE</TableCell>
            <TableCell>Ancre les anticipations, réduit l'incertitude</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Taux négatifs</strong></TableCell>
            <TableCell>Taux de dépôt négatif (ex: -0.5% en 2019)</TableCell>
            <TableCell>Pénalise les banques qui gardent des réserves, les incite à prêter</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>TLTRO</strong></TableCell>
            <TableCell>Prêts à long terme ciblés aux banques</TableCell>
            <TableCell>Encourage le crédit aux entreprises et ménages</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Multiplicateurs et effet d'éviction">
        <FormulaBox label="Multiplicateur keynésien simple">
          {"k = \\frac{1}{1 - c_1}"}
        </FormulaBox>

        <FormulaBox label="Multiplicateur IS-LM (avec éviction)">
          {"k' = \\frac{k}{1 + k \\cdot \\frac{b_1 k_1}{k_2}} < k"}
        </FormulaBox>

        <p className="mb-2 mt-4"><strong>Cas extrêmes :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Trappe à liquidité</strong> — LM horizontale → pas d'éviction → <Math>{"k' = k"}</Math></li>
          <li><strong>LM très pentue</strong> — Éviction forte → <Math>{"k'"}</Math> très faible</li>
        </ul>
      </Section>

      <Section type="formule" title="Dynamique de la dette publique">
        <p className="mb-4">La politique budgétaire est contrainte par la <strong>soutenabilité de la dette</strong>. Comprendre la dynamique de la dette est essentiel pour évaluer les marges de manœuvre budgétaires.</p>

        <p className="mb-2"><strong>Contrainte budgétaire de l'État :</strong></p>
        <p className="mb-4">Chaque année, l'État doit financer ses dépenses (G), payer les intérêts sur sa dette existante (rB), et reçoit des recettes fiscales (T) :</p>
        
        <FormulaBox label="Évolution de la dette" highlight>
          {"B_t = (1+r_t)B_{t-1} + (G_t - T_t)"}
        </FormulaBox>

        <p className="mb-4">où <Math>{"(G_t - T_t)"}</Math> est le <strong>déficit primaire</strong> (hors intérêts) et <Math>{"r_t B_{t-1}"}</Math> est la charge d'intérêts.</p>

        <p className="mb-2"><strong>Dynamique du ratio dette/PIB :</strong></p>
        <p className="mb-4">Ce qui compte pour la soutenabilité, c'est le ratio dette/PIB (pas le niveau absolu de dette) :</p>
        
        <FormulaBox label="Variation du ratio dette/PIB">
          {"\\Delta \\left(\\frac{B}{Y}\\right) = (r - g) \\frac{B}{Y} + \\frac{G - T}{Y}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Le terme (r - g) est crucial :</strong></p>
        <Table headers={['Situation', 'Effet', 'Interprétation']}>
          <TableRow>
            <TableCell><Math>{"r > g"}</Math></TableCell>
            <TableCell>Effet "boule de neige"</TableCell>
            <TableCell>La dette s'auto-alimente : même avec un budget équilibré (G=T), le ratio dette/PIB augmente car les intérêts croissent plus vite que le PIB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"r < g"}</Math></TableCell>
            <TableCell>Effet stabilisateur</TableCell>
            <TableCell>La croissance "dilue" la dette : le ratio dette/PIB peut diminuer même avec un déficit modéré</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"r = g"}</Math></TableCell>
            <TableCell>Neutre</TableCell>
            <TableCell>Le ratio dette/PIB évolue uniquement en fonction du solde primaire</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Condition de stabilisation du ratio dette/PIB :</strong></p>
        <p className="mb-4">Pour que le ratio reste constant, il faut :</p>
        
        <FormulaBox label="Solde primaire requis">
          {"\\frac{T - G}{Y} = (r - g) \\frac{B}{Y}"}
        </FormulaBox>

        <p className="mb-4"><strong>Exemple</strong> : Si r = 3%, g = 1%, et dette/PIB = 100%, il faut un excédent primaire de (3%-1%) × 100% = <strong>2% du PIB</strong> juste pour stabiliser la dette.</p>

        <Callout type="warning" title="Critères de Maastricht">
          Les critères de convergence européens fixent :<br/>
          • <strong>Déficit public</strong> : maximum 3% du PIB<br/>
          • <strong>Dette publique</strong> : maximum 60% du PIB<br/><br/>
          Ces seuils sont arbitraires mais servent de référence. En 2024, la France a une dette d'environ 110% du PIB.
        </Callout>

        <Callout type="insight" title="Contexte actuel (2020-2024)">
          Depuis la crise COVID, les taux d'intérêt sont restés très bas (r &lt; g dans de nombreux pays), ce qui a permis de financer des déficits massifs sans explosion du ratio dette/PIB. Mais la remontée des taux depuis 2022 change la donne.
        </Callout>
      </Section>

      <Section type="graphique" title="Dynamique de la dette (r > g)">
        <Graph
          src="/macro/assets/14.png"
          alt="Dynamique dette"
          figure={14}
          caption="Quand r > g, la dette explose (effet boule de neige). Le seuil de Maastricht est à 60%."
        />
      </Section>

      <Section type="formule" title="La Courbe de Phillips">
        <p className="mb-4">La courbe de Phillips est l'une des relations les plus importantes en macroéconomie. Découverte empiriquement par A.W. Phillips en 1958, elle établit une relation entre <strong>inflation</strong> et <strong>chômage</strong>.</p>

        <p className="mb-2"><strong>Origine historique :</strong></p>
        <p className="mb-4">Phillips a observé une relation négative entre le taux de chômage et le taux de croissance des salaires nominaux au Royaume-Uni (1861-1957). Cette relation a ensuite été reformulée en termes d'inflation.</p>

        <FormulaBox label="Courbe de Phillips augmentée des anticipations" highlight>
          {"\\pi_t = \\pi^e_t + (m + z) - \\alpha u_t"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Interprétation des termes :</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><Math>{"\\pi_t"}</Math> = taux d'inflation effectif à la période t</li>
          <li><Math>{"\\pi^e_t"}</Math> = taux d'inflation <strong>anticipé</strong> par les agents. C'est le terme clé qui distingue les différentes versions de la courbe.</li>
          <li><Math>{"(m + z)"}</Math> = constante positive. Représente les facteurs structurels : marge des entreprises (m) et pouvoir de négociation des travailleurs (z).</li>
          <li><Math>{"\\alpha"}</Math> = sensibilité de l'inflation au chômage. Plus α est grand, plus l'inflation réagit fortement aux variations du chômage.</li>
          <li><Math>{"u_t"}</Math> = taux de chômage effectif</li>
        </ul>

        <p className="mb-2"><strong>Exemple numérique du cours :</strong></p>
        <FormulaBox label="Courbe de Phillips (exemple)">
          {"\\pi_t = \\pi^e_t + 0.4 - 4u_t"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Dérivation du taux de chômage naturel :</strong></p>
        <p className="mb-4">À l'équilibre de moyen terme, les anticipations sont correctes : <Math>{"\\pi_t = \\pi^e_t"}</Math>. En substituant :</p>
        <p className="mb-2"><Math>{"\\pi_t = \\pi_t + (m + z) - \\alpha u_n"}</Math></p>
        <p className="mb-2"><Math>{"0 = (m + z) - \\alpha u_n"}</Math></p>
        
        <FormulaBox label="Taux de chômage naturel">
          {"u_n = \\frac{m + z}{\\alpha}"}
        </FormulaBox>

        <p className="mt-4"><strong>Application numérique :</strong> Avec m+z = 0.4 et α = 4 :</p>
        <p><Math>{"u_n = \\frac{0.4}{4} = 0.10 = 10\\%"}</Math></p>

        <Callout type="insight" title="Lien avec WS-PS">
          Le taux de chômage naturel de la courbe de Phillips est <strong>le même</strong> que celui du modèle WS-PS. C'est logique : les deux modèles décrivent le même équilibre de moyen terme, mais sous des angles différents (niveau des prix vs taux d'inflation).
        </Callout>
      </Section>

      <Section type="formule" title="Le ratio de sacrifice">
        <p className="mb-4">Le <strong>ratio de sacrifice</strong> mesure le coût, en termes de chômage, d'une politique de désinflation. C'est un concept crucial pour évaluer le coût des politiques anti-inflationnistes.</p>

        <FormulaBox label="Ratio de sacrifice" highlight>
          {"\\text{Ratio de sacrifice} = \\frac{1}{\\alpha}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Interprétation :</strong></p>
        <p className="mb-4">Le ratio de sacrifice indique de combien le chômage doit augmenter (en points de %) pour réduire l'inflation de 1 point de %.</p>

        <Callout type="insight" title="Exemple numérique">
          Si <Math>{"\\alpha = 4"}</Math> → Ratio de sacrifice = <Math>{"\\frac{1}{4} = 0.25"}</Math><br/><br/>
          <strong>Signification</strong> : Pour réduire l'inflation de 1 point de pourcentage, le taux de chômage doit augmenter de 0.25 point de pourcentage.<br/><br/>
          <strong>Application</strong> : Si on veut passer d'une inflation de 10% à 2% (réduction de 8 points), il faudra accepter une hausse du chômage de 8 × 0.25 = 2 points de % au-dessus du taux naturel.
        </Callout>

        <p className="mt-4 mb-2"><strong>Implications pour la politique économique :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Plus α est grand</strong> (inflation très sensible au chômage) → ratio de sacrifice faible → désinflation "peu coûteuse"</li>
          <li><strong>Plus α est petit</strong> (inflation peu sensible au chômage) → ratio de sacrifice élevé → désinflation très coûteuse en emplois</li>
          <li>Le ratio de sacrifice est un argument pour des politiques de désinflation <strong>graduelles</strong> plutôt que brutales</li>
        </ul>
      </Section>

      <Section type="key" title="Types d'anticipations">
        <p className="mb-4">La façon dont les agents forment leurs anticipations d'inflation est <strong>cruciale</strong> pour comprendre la dynamique de l'inflation. Deux cas polaires sont étudiés :</p>

        <p className="mb-2"><strong>1. Anticipations nulles</strong> (<Math>{"\\pi^e_t = 0"}</Math>) :</p>
        <p className="mb-4">Les agents n'anticipent pas d'inflation. C'est une hypothèse simplificatrice, correspondant à une économie où l'inflation a été nulle pendant longtemps.</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>La courbe devient : <Math>{"\\pi_t = 0.4 - 4u_t"}</Math></li>
          <li>L'inflation est <strong>constante</strong> si le chômage est maintenu constant</li>
          <li>Pas de spirale inflationniste : l'inflation ne s'auto-entretient pas</li>
        </ul>

        <Callout type="tip" title="Exemple avec anticipations nulles">
          Si <Math>{"u_t = 4\\%"}</Math> est maintenu constant :<br/>
          <Math>{"\\pi_t = 0 + 0.4 - 4 \\times 0.04 = 0.4 - 0.16 = 0.24 = 24\\%"}</Math><br/><br/>
          L'inflation reste à <strong>24% chaque année</strong>, elle ne s'accélère pas.
        </Callout>

        <p className="mb-2 mt-6"><strong>2. Anticipations adaptatives</strong> (<Math>{"\\pi^e_t = \\pi_{t-1}"}</Math>) :</p>
        <p className="mb-4">Les agents anticipent que l'inflation future sera égale à l'inflation passée. C'est une hypothèse plus réaliste : les agents "apprennent" de l'expérience récente.</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>La courbe devient : <Math>{"\\pi_t = \\pi_{t-1} + 0.4 - 4u_t"}</Math></li>
          <li>L'inflation <strong>s'accélère</strong> si <Math>{"u_t < u_n"}</Math></li>
          <li><strong>Spirale prix-salaires</strong> : l'inflation passée nourrit l'inflation future</li>
        </ul>

        <p className="mb-2 mt-4"><strong>Exemple complet avec anticipations adaptatives :</strong></p>
        <p className="mb-4">Supposons que le gouvernement maintient <Math>{"u_t = 4\\%"}</Math> (en dessous de <Math>{"u_n = 10\\%"}</Math>) :</p>
        
        <Table headers={['Année t', 'uₜ (%)', 'πₜᵉ (%)', 'πₜ (%)', 'Calcul']}>
          <TableRow><TableCell>0</TableCell><TableCell>10</TableCell><TableCell>0</TableCell><TableCell>0</TableCell><TableCell>Équilibre initial</TableCell></TableRow>
          <TableRow><TableCell>1</TableCell><TableCell>4</TableCell><TableCell>0</TableCell><TableCell>24</TableCell><TableCell>0 + 0.4 - 4×0.04 = 0.24</TableCell></TableRow>
          <TableRow><TableCell>2</TableCell><TableCell>4</TableCell><TableCell>24</TableCell><TableCell>48</TableCell><TableCell>24 + 0.4 - 0.16 = 48</TableCell></TableRow>
          <TableRow><TableCell>3</TableCell><TableCell>4</TableCell><TableCell>48</TableCell><TableCell>72</TableCell><TableCell>48 + 24 = 72</TableCell></TableRow>
          <TableRow><TableCell>4</TableCell><TableCell>4</TableCell><TableCell>72</TableCell><TableCell>96</TableCell><TableCell>72 + 24 = 96</TableCell></TableRow>
          <TableRow><TableCell>5</TableCell><TableCell>4</TableCell><TableCell>96</TableCell><TableCell>120</TableCell><TableCell>96 + 24 = 120</TableCell></TableRow>
          <TableRow><TableCell>...</TableCell><TableCell>...</TableCell><TableCell>...</TableCell><TableCell>...</TableCell><TableCell>...</TableCell></TableRow>
          <TableRow><TableCell>10</TableCell><TableCell>4</TableCell><TableCell>216</TableCell><TableCell>240</TableCell><TableCell>216 + 24 = 240</TableCell></TableRow>
        </Table>
        
        <p className="mt-2 text-sm text-slate-700">
          <strong>Formule générale :</strong> <Math>{"\\pi_t = \\pi_{t-1} + 0.4 - 4 \\times 0.04 = \\pi_{t-1} + 0.24"}</Math><br/>
          L'inflation augmente de <strong>24 points de pourcentage chaque année</strong> !
        </p>

        <p className="mt-6 mb-2"><strong>Comparaison des deux types d'anticipations :</strong></p>
        <Table headers={['Aspect', 'Anticipations nulles', 'Anticipations adaptatives']}>
          <TableRow>
            <TableCell>Hypothèse sur πᵉ</TableCell>
            <TableCell><Math>{"\\pi^e = 0"}</Math></TableCell>
            <TableCell><Math>{"\\pi^e_t = \\pi_{t-1}"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Évolution de l'inflation (si u &lt; uₙ)</TableCell>
            <TableCell><strong>Constante</strong></TableCell>
            <TableCell><strong>Accélération constante</strong></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pression inflationniste</TableCell>
            <TableCell>Stable</TableCell>
            <TableCell>Cumulative (effet boule de neige)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Spirale prix-salaires</TableCell>
            <TableCell>Non</TableCell>
            <TableCell><strong>Oui</strong></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Réalisme</TableCell>
            <TableCell>Faible</TableCell>
            <TableCell>Plus réaliste</TableCell>
          </TableRow>
        </Table>

        <Callout type="warning" title="Conclusion fondamentale">
          Avec anticipations adaptatives, maintenir le chômage en dessous du taux naturel génère une <strong>inflation qui s'accélère indéfiniment</strong>. Il n'y a pas d'arbitrage durable entre inflation et chômage.
        </Callout>
      </Section>

      <Section type="key" title="La spirale prix-salaires">
        <p className="mb-4">La spirale prix-salaires est le mécanisme central qui explique pourquoi l'inflation peut s'auto-entretenir et s'accélérer. C'est un cercle vicieux qui se déclenche quand le chômage est maintenu en dessous de son niveau naturel.</p>

        <p className="mb-2"><strong>Mécanisme détaillé :</strong></p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>Chômage bas</strong> (<Math>{"u < u_n"}</Math>) : La demande de travail excède l'offre disponible. Les entreprises peinent à recruter.</li>
          <li><strong>Salaires nominaux ↑</strong> : Les travailleurs ont un fort pouvoir de négociation (peu de chômeurs pour les remplacer). Ils obtiennent des hausses de salaires.</li>
          <li><strong>Coûts de production ↑</strong> : Les salaires étant le principal coût des entreprises, leurs coûts augmentent.</li>
          <li><strong>Prix ↑</strong> : Les entreprises répercutent la hausse des coûts sur leurs prix de vente. L'inflation apparaît.</li>
          <li><strong>Anticipations d'inflation ↑</strong> : Les travailleurs observent la hausse des prix et anticipent qu'elle va continuer.</li>
          <li><strong>Nouvelles revendications salariales</strong> : Pour maintenir leur pouvoir d'achat, les travailleurs demandent des hausses de salaires nominaux encore plus importantes.</li>
          <li><strong>Retour à l'étape 2</strong> : Le cycle recommence, mais à un niveau d'inflation plus élevé.</li>
        </ol>

        <FormulaBox label="La spirale en une formule">
          {"u < u_n \\Rightarrow W \\uparrow \\Rightarrow \\text{Coûts} \\uparrow \\Rightarrow P \\uparrow \\Rightarrow \\pi^e \\uparrow \\Rightarrow W \\uparrow \\Rightarrow ..."}
        </FormulaBox>

        <Callout type="warning" title="Implications majeures pour la politique économique">
          <strong>1. Pas d'arbitrage à long terme</strong><br/>
          La courbe de Phillips de <strong>long terme est verticale</strong> au niveau <Math>{"u_n"}</Math>. On ne peut pas "acheter" durablement moins de chômage avec plus d'inflation.<br/><br/>
          
          <strong>2. Coût de la désinflation</strong><br/>
          Pour casser une spirale inflationniste, il faut accepter une période de chômage élevé (<Math>{"u > u_n"}</Math>). C'est le "ratio de sacrifice".<br/><br/>
          
          <strong>3. Crédibilité de la banque centrale</strong><br/>
          Si la BC est crédible dans son engagement anti-inflation, les anticipations s'ajustent plus vite et le coût de la désinflation est réduit.
        </Callout>

        <Callout type="insight" title="Exemple historique : la désinflation Volcker (1979-1982)">
          Aux États-Unis, l'inflation atteignait 13% en 1979. Le président de la Fed, Paul Volcker, a drastiquement augmenté les taux d'intérêt (jusqu'à 20%). Résultat :<br/>
          • L'inflation est tombée à 3% en 1983<br/>
          • Mais le chômage a atteint 10.8% (contre 6% avant)<br/>
          • Récession sévère en 1981-1982<br/><br/>
          C'est l'illustration parfaite du ratio de sacrifice.
        </Callout>
      </Section>

      <Section type="graphique" title="La courbe de Phillips">
        <Graph
          src="/macro/assets/16.png"
          alt="Phillips CT"
          figure={16}
          caption="Court terme : arbitrage possible entre chômage et inflation (courbe décroissante)."
        />

        <Graph
          src="/macro/assets/17.png"
          alt="Phillips LT"
          figure={17}
          caption="Long terme : pas d'arbitrage, la courbe est verticale en uₙ."
        />

        <Graph
          src="/macro/assets/18.png"
          alt="Phillips CT+LT"
          figure={18}
          caption="Synthèse : les courbes CT se déplacent vers le haut quand πᵉ augmente."
        />
      </Section>

      <Section type="warning" title="Les erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Oublier l'effet d'éviction</strong> — <Math>{"k' < k"}</Math> toujours</li>
          <li><strong>Confondre dette et déficit</strong> — Déficit = flux, Dette = stock</li>
          <li><strong>Négliger (r - g)</strong> — Crucial pour la soutenabilité</li>
          <li><strong>Oublier la borne zéro</strong> — Politique monétaire inefficace quand i = 0</li>
          <li><strong>Confondre CT et LT</strong> — Politiques efficaces à CT, neutres à MT</li>
          <li><strong>Confondre anticipations nulles et adaptatives</strong> — Résultats très différents</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/macro/chapitre-3', label: '← Chapitre précédent', title: "L'Équilibre AS-AD" }}
        next={{ path: '/exercices', label: 'Exercices →', title: 'Exercices et Méthodes' }}
      />
    </main>
  );
}
