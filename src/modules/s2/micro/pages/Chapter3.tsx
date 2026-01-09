import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter3() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 03"
        title="Surplus du Consommateur"
        description="Disposition à payer, gain à l'échange, perte sèche et applications."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>Le surplus du consommateur mesure le <strong>"gain à l'échange"</strong> : la différence entre ce que le consommateur est prêt à payer (disposition marginale à payer) et ce qu'il paie effectivement (prix de marché). Graphiquement, c'est l'<strong>aire sous la courbe de demande et au-dessus du prix</strong>.</p>
      </Section>

      <Section type="intuition" title="Intuition : le gain à l'échange">
        <p className="mb-4">Imagine que tu veux acheter des tickets de concert. Tu es prêt à payer :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>20€ pour le 1er ticket</li>
          <li>18€ pour le 2ème ticket</li>
          <li>16€ pour le 3ème ticket</li>
          <li>14€ pour le 4ème ticket</li>
        </ul>

        <p className="mb-4">Mais le <strong>prix de marché</strong> est seulement 14€. Ton surplus :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>1er ticket : 20 − 14 = 6€</li>
          <li>2ème ticket : 18 − 14 = 4€</li>
          <li>3ème ticket : 16 − 14 = 2€</li>
          <li>4ème ticket : 14 − 14 = 0€</li>
        </ul>

        <Callout type="insight" title="Surplus total">
          <strong>6 + 4 + 2 + 0 = 12€</strong> de satisfaction nette grâce à l'échange !
        </Callout>
      </Section>

      <Section type="formule" title="Formule du surplus">
        <FormulaBox label="Surplus du consommateur" highlight>
          {"CS = \\int_{0}^{x_1^*} p_1(x) \\, dx - p_1^* x_1^*"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><Math>{"\\int_{0}^{x_1^*} p_1(x) dx"}</Math> : somme des dispositions marginales à payer</li>
          <li><Math>{"p_1^* x_1^*"}</Math> : dépense réelle</li>
          <li><strong>CS</strong> = Disposition totale − Dépense = Gain net</li>
        </ul>

        <Callout type="tip" title="Demande linéaire">
          Si la demande est linéaire, le surplus est un <strong>triangle</strong> :<br/>
          <Math>{"CS = \\frac{1}{2}(p_{max} - p_1^*) \\times x_1^*"}</Math>
        </Callout>
      </Section>

      <Section type="formule" title="Surplus avec utilité quasi-linéaire">
        <p className="mb-4">Pour <Math>{"U(x_1, x_2) = v(x_1) + x_2"}</Math> avec <Math>{"p_2 = 1"}</Math> :</p>

        <FormulaBox label="Condition d'optimalité">
          {"v'(x_1^*) = p_1"}
        </FormulaBox>

        <FormulaBox label="Surplus" highlight>
          {"CS = v(x_1^*) - p_1 x_1^*"}
        </FormulaBox>

        <Callout type="warning" title="Propriété clé">
          Le surplus <strong>ne dépend pas du revenu</strong> <Math>R</Math> dans le cas quasi-linéaire ! Pas d'effet revenu sur la demande de <Math>{"x_1"}</Math>.
        </Callout>

        <p className="mt-4"><strong>Cas particulier</strong> <Math>{"v(x_1) = a\\sqrt{x_1}"}</Math> :</p>
        <FormulaBox label="Formule directe">
          {"CS = \\frac{a^2}{4p_1}"}
        </FormulaBox>
      </Section>

      <Section type="intuition" title="Variation du surplus">
        <p className="mb-4">Une hausse de prix <Math>{"p_1' \\to p_1''"}</Math> diminue le surplus selon deux composantes :</p>

        <Table headers={['Effet', 'Description', 'Forme géométrique']}>
          <TableRow>
            <TableCell><strong>Effet prix</strong></TableCell>
            <TableCell>Sur les unités encore consommées, on paie plus cher</TableCell>
            <TableCell>Rectangle</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Effet quantité</strong></TableCell>
            <TableCell>Perte de surplus sur les unités non consommées</TableCell>
            <TableCell>Triangle</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Perte totale">
          Perte = Rectangle + Triangle
        </Callout>
      </Section>

      <Section type="formule" title="Applications : Taxes et perte sèche">
        <p className="mb-4">Une <strong>taxe</strong> <Math>t</Math> par unité augmente le prix payé par le consommateur à <Math>{"p_1 + t"}</Math>.</p>

        <FormulaBox label="Recette fiscale">
          {"T = t \\times x_1^{new}"}
        </FormulaBox>

        <FormulaBox label="Perte sèche (Deadweight Loss)" highlight>
          {"DWL = |\\Delta CS| - T"}
        </FormulaBox>

        <Callout type="warning" title="Perte sèche">
          La perte sèche est la <strong>perte nette de bien-être</strong> qui n'est récupérée par personne. C'est le "coût social" de la taxation (inefficience créée par la distorsion des comportements).
        </Callout>
      </Section>

      <Section type="key" title="Exemple numérique">
        <p className="mb-4">Demande : <Math>{"p_1(x_1) = 100 - 2x_1"}</Math>, Prix initial : <Math>{"p_1 = 20"}</Math></p>
        
        <p className="mb-2"><strong>Quantité initiale :</strong> <Math>{"x_1 = (100-20)/2 = 40"}</Math></p>
        
        <p className="mb-2"><strong>Surplus avant taxe :</strong></p>
        <p className="mb-4"><Math>{"CS = \\frac{1}{2}(100 - 20) \\times 40 = 1600"}</Math></p>

        <p className="mb-2"><strong>Avec taxe t = 10 :</strong> Prix = 30, Quantité = 35</p>
        <p className="mb-2"><Math>{"CS' = \\frac{1}{2}(100 - 30) \\times 35 = 1225"}</Math></p>
        <p className="mb-2">Perte de surplus : <Math>{"\\Delta CS = -375"}</Math></p>
        <p className="mb-2">Recette fiscale : <Math>{"T = 10 \\times 35 = 350"}</Math></p>
        <p><strong>Perte sèche :</strong> <Math>{"DWL = 375 - 350 = 25"}</Math></p>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre demande et demande inverse</strong> — Le surplus utilise la demande inverse <Math>{"p(x)"}</Math></li>
          <li><strong>Oublier la perte sèche</strong> — La taxe ne récupère pas tout le surplus perdu</li>
          <li><strong>Négliger l'effet quantité</strong> — La hausse de prix réduit aussi la quantité consommée</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-2', label: '← Chapitre précédent', title: 'Choix Intertemporels' }}
        next={{ path: '/micro/chapitre-4', label: 'Chapitre suivant →', title: 'Demande de Marché' }}
      />
    </main>
  );
}
