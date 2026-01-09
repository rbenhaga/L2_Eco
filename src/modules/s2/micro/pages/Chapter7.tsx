import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter7() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 07"
        title="Monopole & Oligopole"
        description="Price-maker, indice de Lerner, Cournot, Bertrand, Stackelberg, collusion."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>Le monopole est un <strong>price-maker</strong> qui contrôle le prix. Condition d'équilibre : <Math>{"Rm = Cm"}</Math> avec <Math>{"Rm = P(1 + 1/\\varepsilon)"}</Math>. Le monopole crée une <strong>perte sèche</strong>. En oligopole, les firmes interagissent stratégiquement : Cournot (quantités), Bertrand (prix), Stackelberg (leader-suiveur).</p>
      </Section>

      {/* PARTIE A : MONOPOLE */}
      <Section type="intuition" title="Le monopole : caractéristiques">
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Producteur unique</strong> face à une multitude d'acheteurs</li>
          <li><strong>Barrières à l'entrée</strong> (brevets, coûts fixes élevés...)</li>
          <li><strong>Price-maker</strong> : la firme fixe le prix</li>
        </ul>

        <Table headers={['Critère', 'CPP', 'Monopole']}>
          <TableRow>
            <TableCell><strong>Rôle</strong></TableCell>
            <TableCell>Price-taker</TableCell>
            <TableCell>Price-maker</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Demande perçue</strong></TableCell>
            <TableCell>Horizontale (Rm = P)</TableCell>
            <TableCell>Décroissante (Rm &lt; P)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Condition équilibre</strong></TableCell>
            <TableCell>P = Cm</TableCell>
            <TableCell>Rm = Cm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Profit LT</strong></TableCell>
            <TableCell>Nul</TableCell>
            <TableCell>Positif</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Recette marginale et élasticité">
        <FormulaBox label="Recette marginale" highlight>
          {"Rm(y) = P(y) \\left(1 + \\frac{1}{\\varepsilon}\\right)"}
        </FormulaBox>

        <p className="mt-4">où <Math>{"\\varepsilon = \\frac{dQ}{dP} \\cdot \\frac{P}{Q} < 0"}</Math> est l'élasticité-prix.</p>

        <Callout type="warning" title="Théorème important">
          Un monopole produit <strong>toujours</strong> dans la zone où la demande est <strong>élastique</strong> : <Math>{"|\\varepsilon| > 1"}</Math>.<br/><br/>
          Preuve : À l'optimum, <Math>{"Rm = Cm > 0"}</Math>. Or <Math>{"Rm = P(1 + 1/\\varepsilon) > 0"}</Math> implique <Math>{"\\varepsilon < -1"}</Math>.
        </Callout>
      </Section>

      <Section type="formule" title="Indice de Lerner">
        <FormulaBox label="Indice de Lerner" highlight>
          {"L = \\frac{P - Cm}{P} = -\\frac{1}{\\varepsilon}"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><Math>{"L = 0"}</Math> : Pas de pouvoir de marché (CPP)</li>
          <li><Math>L</Math> élevé : Fort pouvoir de marché</li>
        </ul>

        <Callout type="insight" title="Interprétation">
          Plus la demande est élastique (<Math>{"|\\varepsilon|"}</Math> élevé), plus <Math>L</Math> est faible. Le monopole ne peut pas fixer un prix très au-dessus de son coût marginal si les consommateurs sont sensibles au prix.
        </Callout>
      </Section>

      <Section type="intuition" title="Inefficacité du monopole">
        <p className="mb-4">Par rapport à la CPP, le monopole :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Produit moins</strong> : <Math>{"y_m < y_c"}</Math></li>
          <li><strong>Prix plus élevé</strong> : <Math>{"P_m > P_c = Cm"}</Math></li>
          <li><strong>Crée une perte sèche</strong> (deadweight loss)</li>
        </ul>

        <FormulaBox label="Perte sèche">
          {"PS = \\frac{1}{2}(P_m - Cm(y_m))(y_c - y_m)"}
        </FormulaBox>
      </Section>

      {/* PARTIE B : OLIGOPOLE */}
      <Section type="intuition" title="L'oligopole : introduction">
        <p className="mb-4">Structure intermédiaire entre monopole et CPP. Quelques grandes firmes dominent le marché avec <strong>interdépendance stratégique</strong>.</p>

        <Table headers={['Modèle', 'Variable stratégique', 'Timing']}>
          <TableRow>
            <TableCell><strong>Cournot</strong></TableCell>
            <TableCell>Quantités</TableCell>
            <TableCell>Simultané</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bertrand</strong></TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Simultané</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Stackelberg</strong></TableCell>
            <TableCell>Quantités</TableCell>
            <TableCell>Séquentiel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Collusion</strong></TableCell>
            <TableCell>Coopération</TableCell>
            <TableCell>—</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Modèle de Cournot">
        <p className="mb-4">Deux firmes choisissent <strong>simultanément</strong> leurs quantités <Math>{"q_1"}</Math> et <Math>{"q_2"}</Math>.</p>

        <p className="mb-2"><strong>Fonction de réaction :</strong> Chaque firme maximise son profit étant donné la production de l'autre.</p>

        <FormulaBox label="Équilibre de Nash-Cournot" highlight>
          {"q_1^* = R_1(q_2^*) \\quad \\text{et} \\quad q_2^* = R_2(q_1^*)"}
        </FormulaBox>

        <Callout type="tip" title="Exemple : duopole symétrique linéaire">
          Demande : <Math>{"P = a - b(q_1 + q_2)"}</Math>, Coûts : <Math>{"Cm = c"}</Math><br/><br/>
          Fonction de réaction : <Math>{"q_i = \\frac{a - c - bq_j}{2b}"}</Math><br/><br/>
          Équilibre : <Math>{"q_1^* = q_2^* = \\frac{a-c}{3b}"}</Math><br/>
          Production totale : <Math>{"Q^* = \\frac{2(a-c)}{3b}"}</Math><br/>
          Prix : <Math>{"P^* = \\frac{a + 2c}{3}"}</Math>
        </Callout>
      </Section>

      <Section type="formule" title="Modèle de Bertrand">
        <p className="mb-4">Les firmes choisissent <strong>simultanément</strong> leurs prix. Produit homogène : les consommateurs achètent chez la firme au prix le plus bas.</p>

        <FormulaBox label="Paradoxe de Bertrand" highlight>
          {"p_1^* = p_2^* = c = Cm"}
        </FormulaBox>

        <Callout type="warning" title="Résultat surprenant">
          Deux firmes suffisent pour obtenir le résultat de CPP ! Profit nul pour les deux firmes.
        </Callout>
      </Section>

      <Section type="formule" title="Modèle de Stackelberg">
        <p className="mb-4">Timing <strong>séquentiel</strong> : le leader (firme 1) choisit d'abord, le suiveur (firme 2) observe puis choisit.</p>

        <p className="mb-2"><strong>Résolution par induction à rebours :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Le suiveur maximise son profit étant donné <Math>{"q_1"}</Math></li>
          <li>Le leader anticipe la réaction et maximise</li>
        </ol>

        <Callout type="insight" title="Avantage du leader">
          <Math>{"\\pi_1^S > \\pi_1^C > \\pi_2^S"}</Math><br/>
          Le leader obtient un profit plus élevé qu'en Cournot, le suiveur moins.
        </Callout>
      </Section>

      <Section type="intuition" title="Collusion (Cartel)">
        <p className="mb-4">Si les firmes <strong>coopèrent</strong>, elles maximisent leur profit joint en se comportant comme un monopole.</p>

        <Callout type="warning" title="Instabilité">
          Chaque firme a intérêt à <strong>tricher</strong> (produire plus que son quota). C'est un <strong>dilemme du prisonnier</strong> : l'équilibre de Nash (Cournot) domine l'accord de cartel.
        </Callout>
      </Section>

      <Section type="key" title="Comparaison des structures">
        <Table headers={['Structure', 'Production', 'Prix', 'Profit']}>
          <TableRow>
            <TableCell><strong>Monopole</strong></TableCell>
            <TableCell>Minimale</TableCell>
            <TableCell>Maximal</TableCell>
            <TableCell>Maximal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Collusion</strong></TableCell>
            <TableCell>= Monopole</TableCell>
            <TableCell>= Monopole</TableCell>
            <TableCell>Maximal (instable)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Cournot</strong></TableCell>
            <TableCell>Intermédiaire</TableCell>
            <TableCell>Intermédiaire</TableCell>
            <TableCell>Positif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bertrand</strong></TableCell>
            <TableCell>= CPP</TableCell>
            <TableCell>= Cm</TableCell>
            <TableCell>Nul</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>CPP</strong></TableCell>
            <TableCell>Maximale</TableCell>
            <TableCell>= Cm</TableCell>
            <TableCell>Nul</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Spectre">
          CPP (efficace) ← Bertrand ← Cournot ← Stackelberg ← Collusion ← Monopole (inefficace)
        </Callout>
      </Section>

      <Section type="key" title="Exemple Cournot">
        <p className="mb-4">Demande : <Math>{"P = 100 - Q"}</Math>, <Math>{"Cm = 10"}</Math></p>

        <p className="mb-2"><strong>Fonctions de réaction :</strong></p>
        <p className="mb-4"><Math>{"R_i(q_j) = 45 - \\frac{q_j}{2}"}</Math></p>

        <p className="mb-2"><strong>Équilibre :</strong> <Math>{"q_1^* = q_2^* = 30"}</Math></p>
        <p className="mb-2"><strong>Production totale :</strong> <Math>{"Q^* = 60"}</Math></p>
        <p className="mb-2"><strong>Prix :</strong> <Math>{"P^* = 40"}</Math></p>
        <p><strong>Profit :</strong> <Math>{"\\pi_i = (40-10) \\times 30 = 900"}</Math></p>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre Rm et P</strong> — En monopole, <Math>{"Rm < P"}</Math></li>
          <li><strong>Oublier la zone élastique</strong> — Le monopole ne produit jamais en zone inélastique</li>
          <li><strong>Confondre Cournot et Bertrand</strong> — Quantités vs Prix</li>
          <li><strong>Oublier l'instabilité du cartel</strong> — Incitation à tricher</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-6', label: '← Chapitre précédent', title: 'Concurrence Parfaite' }}
        next={{ path: '/micro/qcm', label: 'S\'entraîner →', title: 'QCM' }}
      />
    </main>
  );
}
