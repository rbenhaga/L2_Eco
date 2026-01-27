import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter2() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 02"
        title="Choix Intertemporels"
        description="Épargne, emprunt, taux d'intérêt réel vs nominal, équation de Fisher."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>Le consommateur répartit sa consommation entre deux périodes (aujourd'hui et demain) en fonction de ses revenus <Math>{"m_1"}</Math> et <Math>{"m_2"}</Math> et du taux d'intérêt <Math>r</Math>. S'il épargne en période 1, il consomme moins aujourd'hui mais plus demain (avec intérêts). La pente de la contrainte est <Math>{"-(1+r)"}</Math>. Équilibre : <Math>{"TMS = 1+r"}</Math>.</p>
      </Section>

      <Section type="intuition" title="Le modèle de base">
        <p className="mb-4">Le consommateur vit sur <strong>deux périodes</strong> :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Période 1</strong> ("aujourd'hui") : revenu <Math>{"m_1"}</Math>, consommation <Math>{"c_1"}</Math></li>
          <li><strong>Période 2</strong> ("demain") : revenu <Math>{"m_2"}</Math>, consommation <Math>{"c_2"}</Math></li>
        </ul>

        <p className="mb-4">Il peut <strong>transférer du pouvoir d'achat</strong> entre les périodes :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Épargner</strong> <Math>s</Math> en période 1 → Recevoir <Math>{"(1+r)s"}</Math> en période 2</li>
          <li><strong>Emprunter</strong> <Math>b</Math> en période 1 → Rembourser <Math>{"(1+r)b"}</Math> en période 2</li>
        </ul>
      </Section>

      <Section type="formule" title="La contrainte budgétaire intertemporelle">
        <FormulaBox label="Forme en valeur présente" highlight>
          {"c_1 + \\frac{c_2}{1+r} = m_1 + \\frac{m_2}{1+r}"}
        </FormulaBox>

        <p className="mt-4 mb-2">Forme en valeur future :</p>
        <FormulaBox label="Valeur future">
          {"(1+r)c_1 + c_2 = (1+r)m_1 + m_2"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><strong>RHS</strong> : Richesse totale actualisée <Math>{"W = m_1 + \\frac{m_2}{1+r}"}</Math></li>
          <li><strong>Pente</strong> : <Math>{"-(1+r)"}</Math> (coût d'opportunité de la consommation présente)</li>
        </ul>

        <Callout type="insight" title="Point de dotation">
          Le consommateur peut toujours choisir <Math>{"(c_1, c_2) = (m_1, m_2)"}</Math> (ne rien épargner ni emprunter). Ce point est appelé <strong>dotation initiale</strong>.
        </Callout>
      </Section>

      <Section type="intuition" title="Épargnant vs Emprunteur">
        <Table headers={['Situation', 'Condition', 'Interprétation']}>
          <TableRow>
            <TableCell><strong>Épargnant</strong></TableCell>
            <TableCell><Math>{"c_1^* < m_1"}</Math></TableCell>
            <TableCell>Consomme moins qu'il ne gagne aujourd'hui</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Emprunteur</strong></TableCell>
            <TableCell><Math>{"c_1^* > m_1"}</Math></TableCell>
            <TableCell>Consomme plus qu'il ne gagne aujourd'hui</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Autarcique</strong></TableCell>
            <TableCell><Math>{"c_1^* = m_1"}</Math></TableCell>
            <TableCell>Ni épargne ni emprunt</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Équilibre du consommateur">
        <FormulaBox label="Condition d'équilibre" highlight>
          {"TMS_{c_1, c_2} = \\frac{Um_{c_1}}{Um_{c_2}} = 1 + r"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          Le <strong>TMS</strong> mesure le taux auquel le consommateur est prêt à échanger <Math>{"c_1"}</Math> contre <Math>{"c_2"}</Math>. Le <strong>taux d'intérêt</strong> <Math>{"(1+r)"}</Math> mesure le taux auquel le marché permet cet échange. À l'équilibre : taux subjectif = taux de marché.
        </Callout>
      </Section>

      <Section type="intuition" title="Effet d'une hausse du taux d'intérêt">
        <p className="mb-4">Quand <Math>r</Math> augmente :</p>

        <Table headers={['Effet', 'Mécanisme', 'Impact sur c₁']}>
          <TableRow>
            <TableCell><strong>Substitution</strong></TableCell>
            <TableCell><Math>{"c_1"}</Math> plus cher → substituer vers <Math>{"c_2"}</Math></TableCell>
            <TableCell><Math>{"c_1 \\downarrow"}</Math> (toujours)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Revenu (épargnant)</strong></TableCell>
            <TableCell>Meilleur rendement → plus riche</TableCell>
            <TableCell>Ambigu</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Revenu (emprunteur)</strong></TableCell>
            <TableCell>Coût emprunt augmente → plus pauvre</TableCell>
            <TableCell><Math>{"c_1 \\downarrow"}</Math></TableCell>
          </TableRow>
        </Table>

        <Callout type="warning" title="Résultat clé">
          Pour un <strong>emprunteur</strong> : les deux effets vont dans le même sens → <Math>{"c_1"}</Math> diminue toujours.<br/>
          Pour un <strong>épargnant</strong> : effet ambigu (dépend de l'ampleur relative).
        </Callout>
      </Section>

      <Section type="formule" title="Taux réel vs Taux nominal">
        <p className="mb-4">Ce n'est PAS le taux nominal <Math>i</Math> qui compte, mais le <strong>taux réel</strong> <Math>{"\\rho"}</Math> corrigé de l'inflation <Math>{"\\pi"}</Math>.</p>

        <FormulaBox label="Équation de Fisher" highlight>
          {"\\rho \\approx i - \\pi"}
        </FormulaBox>

        <p className="mt-4 mb-2">Relation exacte :</p>
        <FormulaBox label="Relation exacte">
          {"1 + \\rho = \\frac{1 + i}{1 + \\pi}"}
        </FormulaBox>

        <Callout type="tip" title="Exemple">
          Taux nominal <Math>{"i = 7\\%"}</Math>, inflation <Math>{"\\pi = 4\\%"}</Math> → Taux réel <Math>{"\\rho \\approx 3\\%"}</Math>
        </Callout>
      </Section>

      <Section type="formule" title="Formules Cobb-Douglas">
        <p className="mb-4">Pour <Math>{"U = c_1^\\alpha c_2^\\beta"}</Math> avec <Math>{"\\alpha + \\beta = 1"}</Math> :</p>

        <FormulaBox label="Consommations optimales" highlight>
          {"c_1^* = \\alpha W \\quad \\text{et} \\quad c_2^* = \\beta W(1+r)"}
        </FormulaBox>

        <p className="mt-4">où <Math>{"W = m_1 + \\frac{m_2}{1+r}"}</Math> est la richesse totale actualisée.</p>

        <Callout type="insight" title="Interprétation">
          Le consommateur dépense une part <Math>{"\\alpha"}</Math> de sa richesse en <Math>{"c_1"}</Math> et une part <Math>{"\\beta"}</Math> en valeur présente de <Math>{"c_2"}</Math>.
        </Callout>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Utiliser le taux nominal</strong> — C'est le taux réel qui compte pour les décisions</li>
          <li><strong>Oublier le point de dotation</strong> — La contrainte pivote autour de <Math>{"(m_1, m_2)"}</Math></li>
          <li><strong>Confondre épargnant/emprunteur</strong> — Comparer <Math>{"c_1^*"}</Math> à <Math>{"m_1"}</Math></li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-1', label: '← Chapitre précédent', title: 'Arbitrage Travail-Loisir' }}
        next={{ path: '/micro/chapitre-3', label: 'Chapitre suivant →', title: 'Surplus du Consommateur' }}
      />
    </main>
  );
}
