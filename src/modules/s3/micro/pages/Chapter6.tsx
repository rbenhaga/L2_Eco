import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter6() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 06"
        title="Concurrence Parfaite"
        description="Price-taker, offre de court et long terme, équilibre de long terme, surplus du producteur."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>En concurrence parfaite (CPP), les firmes sont <strong>price-takers</strong>. <strong>Court terme</strong> : la firme produit si <Math>{"P \\geq \\min CVM"}</Math>, ferme sinon. <strong>Long terme</strong> : libre entrée/sortie → profit nul → <Math>{"P = \\min CM"}</Math>. L'offre de la branche est la somme horizontale des offres individuelles.</p>
      </Section>

      <Section type="intuition" title="Les 5 hypothèses de la CPP">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Atomicité</strong> : Grand nombre de petits producteurs et consommateurs</li>
          <li><strong>Homogénéité</strong> : Produit parfaitement identique</li>
          <li><strong>Libre entrée/sortie</strong> : Aucune barrière</li>
          <li><strong>Information parfaite</strong> : Tous connaissent les prix</li>
          <li><strong>Mobilité parfaite</strong> : Facteurs parfaitement mobiles</li>
        </ul>

        <Callout type="insight" title="Conséquence">
          La firme est <strong>price-taker</strong> : elle subit le prix du marché <Math>P</Math> et ne peut pas l'influencer. La demande perçue est horizontale : <Math>{"Rm = P"}</Math>.
        </Callout>
      </Section>

      <Section type="formule" title="Maximisation du profit">
        <FormulaBox label="Profit">
          {"\\pi(q) = P \\cdot q - C(q)"}
        </FormulaBox>

        <FormulaBox label="Condition d'équilibre" highlight>
          {"P = Cm(q)"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          La firme produit jusqu'à ce que le prix égalise le coût de production de la dernière unité.
        </Callout>
      </Section>

      <Section type="formule" title="Offre de court terme">
        <p className="mb-4">Au court terme, la firme a des <strong>coûts fixes</strong> <Math>CF</Math> qui ne peuvent être évités.</p>

        <Table headers={['Situation', 'Condition', 'Décision']}>
          <TableRow>
            <TableCell><strong>Profit positif</strong></TableCell>
            <TableCell><Math>{"P > CM"}</Math></TableCell>
            <TableCell>Produire <Math>{"q^*"}</Math> tel que <Math>{"P = Cm"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Perte &lt; CF</strong></TableCell>
            <TableCell><Math>{"CVM < P < CM"}</Math></TableCell>
            <TableCell>Produire (minimiser la perte)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Perte &gt; CF</strong></TableCell>
            <TableCell><Math>{"P < CVM"}</Math></TableCell>
            <TableCell>Fermer temporairement</TableCell>
          </TableRow>
        </Table>

        <FormulaBox label="Prix de fermeture" highlight>
          {"P_f = \\min CVM"}
        </FormulaBox>

        <Callout type="insight" title="Courbe d'offre CT">
          C'est la portion de la courbe <Math>Cm</Math> <strong>au-dessus</strong> du minimum de <Math>CVM</Math>.
        </Callout>
      </Section>

      <Section type="formule" title="Offre de long terme">
        <p className="mb-4">Au long terme, tous les facteurs sont variables. Il n'y a plus de coûts fixes.</p>

        <Table headers={['Situation', 'Condition', 'Décision']}>
          <TableRow>
            <TableCell><strong>Profit ≥ 0</strong></TableCell>
            <TableCell><Math>{"P \\geq CM_{LT}"}</Math></TableCell>
            <TableCell>Produire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Perte</strong></TableCell>
            <TableCell><Math>{"P < CM_{LT}"}</Math></TableCell>
            <TableCell>Sortir du marché</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Courbe d'offre LT">
          C'est la portion de la courbe <Math>{"Cm_{LT}"}</Math> <strong>au-dessus</strong> du minimum de <Math>{"CM_{LT}"}</Math>.
        </Callout>

        <Callout type="warning" title="Fermeture ≠ Sortie">
          <strong>Fermeture</strong> (CT) : ne produit plus mais reste dans l'industrie<br/>
          <strong>Sortie</strong> (LT) : quitte définitivement l'industrie
        </Callout>
      </Section>

      <Section type="formule" title="Équilibre de long terme">
        <p className="mb-4">À l'équilibre de long terme en CPP :</p>

        <FormulaBox label="Profit nul" highlight>
          {"\\pi = 0 \\quad \\Rightarrow \\quad P^* = \\min CM_{LT}"}
        </FormulaBox>

        <Callout type="insight" title="Mécanisme">
          <strong>Si π {'>'} 0</strong> → Entrée de nouvelles firmes → Offre ↑ → Prix ↓ → π ↓<br/>
          <strong>Si π {'<'} 0</strong> → Sortie de firmes → Offre ↓ → Prix ↑ → π ↑<br/>
          <strong>À l'équilibre</strong> : π = 0, plus d'incitation à entrer ou sortir
        </Callout>

        <p className="mt-4">Conditions d'équilibre :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"P = Cm_{LT}(q^*)"}</Math> (maximisation du profit)</li>
          <li><Math>{"P = CM_{LT}(q^*)"}</Math> (profit nul)</li>
          <li><Math>{"Q^D(P^*) = Q^S(P^*)"}</Math> (équilibre offre = demande)</li>
        </ul>
      </Section>

      <Section type="formule" title="Surplus du producteur">
        <FormulaBox label="Surplus du producteur" highlight>
          {"SP = P^* Q^* - CV(Q^*) = \\pi + CF"}
        </FormulaBox>

        <p className="mt-4">Graphiquement : aire entre le prix de marché et la courbe d'offre.</p>

        <Callout type="insight" title="Long terme">
          À l'équilibre de long terme : <Math>{"SP = \\pi + CF = 0 + 0 = 0"}</Math>
        </Callout>
      </Section>

      <Section type="key" title="Exemple numérique">
        <p className="mb-4"><Math>{"CT(q) = 100 + 20q + 2q^2"}</Math></p>

        <p className="mb-2"><strong>Coûts :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"CF = 100"}</Math></li>
          <li><Math>{"CV(q) = 20q + 2q^2"}</Math></li>
          <li><Math>{"CVM(q) = 20 + 2q"}</Math></li>
          <li><Math>{"Cm(q) = 20 + 4q"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Prix de fermeture :</strong> <Math>{"P_f = \\min CVM = 20"}</Math></p>

        <p className="mb-2"><strong>Offre CT :</strong></p>
        <p className="mb-4"><Math>{"q^S(P) = \\frac{P - 20}{4}"}</Math> si <Math>{"P \\geq 20"}</Math>, sinon <Math>{"q = 0"}</Math></p>

        <p className="mb-2"><strong>Si P = 40 :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"q^* = (40-20)/4 = 5"}</Math></li>
          <li><Math>{"\\pi = 40 \\times 5 - (100 + 100 + 50) = 200 - 250 = -50"}</Math></li>
          <li>Perte de 50, mais <Math>{"P > CVM"}</Math> donc on produit</li>
        </ul>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre CVM et CM</strong> — Le seuil de fermeture CT est min CVM, pas min CM</li>
          <li><strong>Oublier la libre entrée</strong> — C'est ce qui force le profit à zéro en LT</li>
          <li><strong>Confondre Rm et P</strong> — En CPP, Rm = P (price-taker)</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-5', label: '← Chapitre précédent', title: 'Théorie du Producteur' }}
        next={{ path: '/micro/chapitre-7', label: 'Chapitre suivant →', title: 'Monopole & Oligopole' }}
      />
    </main>
  );
}
