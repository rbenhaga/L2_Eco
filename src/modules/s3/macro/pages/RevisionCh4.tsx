import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';
import { CheckSquare } from 'lucide-react';

export function RevisionCh4() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Fiche 04"
        title="Politique Économique & Phillips"
        description="Fiche de révision rapide du Chapitre 4"
      />

      <Section type="key" title="Les deux leviers">
        <Table headers={['Politique', 'Acteur', 'Instruments', 'Effet']}>
          <TableRow>
            <TableCell><strong>Budgétaire</strong></TableCell>
            <TableCell>Gouvernement</TableCell>
            <TableCell>G, T</TableCell>
            <TableCell>Direct sur Y (IS)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Monétaire</strong></TableCell>
            <TableCell>Banque centrale</TableCell>
            <TableCell>M, i</TableCell>
            <TableCell>Indirect via i (LM)</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="La BCE">
        <p className="mb-2"><strong>Objectif principal :</strong> Stabilité des prix (inflation ≈ 2%)</p>
        
        <p className="mt-4 mb-2"><strong>Les 3 taux directeurs :</strong></p>
        <FormulaBox label="Corridor des taux">
          {"\\text{Taux dépôt} < \\text{Taux MRO} < \\text{Taux prêt marginal}"}
        </FormulaBox>

        <Table headers={['Taux', 'Description']}>
          <TableRow>
            <TableCell><strong>Dépôt</strong></TableCell>
            <TableCell>Plancher (rémunération des dépôts à la BCE)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MRO</strong></TableCell>
            <TableCell>Taux principal (refinancement hebdomadaire)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Prêt marginal</strong></TableCell>
            <TableCell>Plafond (prêts d'urgence 24h)</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Opérations REPO (prise en pension) :</strong></p>
        <p className="text-sm text-slate-700 mb-4">BCE prête aux banques contre titres en garantie, avec rachat ultérieur. Taux REPO = (Prix rachat - Prix vente) / Prix vente</p>

        <p className="mb-2"><strong>Politiques non conventionnelles (i ≈ 0) :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>QE</strong> : Achats massifs de titres pour injecter des liquidités</li>
          <li><strong>Forward Guidance</strong> : Communication sur trajectoire future des taux pour ancrer les anticipations</li>
          <li><strong>Taux négatifs</strong> : Pénalise les réserves excédentaires</li>
          <li><strong>LTRO</strong> : Refinancement long terme (3 mois à 3 ans)</li>
        </ul>
      </Section>

      <Section type="formule" title="Dynamique de la dette">
        <FormulaBox label="Évolution de la dette">
          {"B_t = (1+r)B_{t-1} + (G_t - T_t)"}
        </FormulaBox>

        <FormulaBox label="Variation du ratio dette/PIB" highlight>
          {"\\Delta\\left(\\frac{B}{Y}\\right) = (r-g)\\frac{B}{Y} + \\frac{G-T}{Y}"}
        </FormulaBox>

        <Table headers={['Situation', 'Effet']}>
          <TableRow>
            <TableCell><Math>{"r > g"}</Math></TableCell>
            <TableCell>Effet boule de neige (dette explose)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"r < g"}</Math></TableCell>
            <TableCell>Effet stabilisateur (dette se résorbe)</TableCell>
          </TableRow>
        </Table>

        <Callout type="warning" title="Critères de Maastricht">
          Déficit &lt; 3% du PIB | Dette &lt; 60% du PIB
        </Callout>
      </Section>

      <Section type="formule" title="Courbe de Phillips">
        <FormulaBox label="Phillips augmentée" highlight>
          {"\\pi_t = \\pi^e_t + (m+z) - \\alpha u_t"}
        </FormulaBox>

        <FormulaBox label="Taux de chômage naturel">
          {"u_n = \\frac{m+z}{\\alpha}"}
        </FormulaBox>

        <FormulaBox label="Ratio de sacrifice">
          {"\\text{Ratio} = \\frac{1}{\\alpha}"}
        </FormulaBox>
        <p className="text-sm text-slate-700">Hausse de u nécessaire pour réduire π de 1 point</p>
      </Section>

      <Section type="key" title="Types d'anticipations">
        <Table headers={['Type', 'Formule', 'Si u &lt; uₙ', 'Spirale ?']}>
          <TableRow>
            <TableCell><strong>Nulles</strong></TableCell>
            <TableCell><Math>{"\\pi^e = 0"}</Math></TableCell>
            <TableCell>π constante</TableCell>
            <TableCell>Non</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Adaptatives</strong></TableCell>
            <TableCell><Math>{"\\pi^e_t = \\pi_{t-1}"}</Math></TableCell>
            <TableCell>π accélère</TableCell>
            <TableCell>Oui</TableCell>
          </TableRow>
        </Table>

        <Callout type="insight" title="Exemple avec anticipations adaptatives">
          Si <Math>{"u = 4\\%"}</Math> maintenu (avec <Math>{"u_n = 10\\%"}</Math>) et <Math>{"\\alpha = 4"}</Math> :<br/>
          Chaque année : <Math>{"\\pi_t = \\pi_{t-1} + 24\\%"}</Math><br/>
          L'inflation augmente de 24 points par an !
        </Callout>
      </Section>

      <Section type="key" title="Spirale prix-salaires">
        <FormulaBox label="Le cercle vicieux">
          {"u < u_n \\Rightarrow W \\uparrow \\Rightarrow P \\uparrow \\Rightarrow \\pi^e \\uparrow \\Rightarrow W \\uparrow \\Rightarrow ..."}
        </FormulaBox>

        <Callout type="warning" title="Conclusion fondamentale">
          <strong>Court terme</strong> : Arbitrage inflation/chômage possible (Phillips décroissante)<br/>
          <strong>Long terme</strong> : Pas d'arbitrage (Phillips verticale en <Math>{"u_n"}</Math>)
        </Callout>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-1">
          <li>Confondre dette (stock) et déficit (flux)</li>
          <li>Négliger le terme (r - g)</li>
          <li>Confondre anticipations nulles et adaptatives</li>
          <li>Croire qu'on peut maintenir u &lt; uₙ sans inflation</li>
          <li>Oublier que Phillips LT est verticale</li>
        </ul>
      </Section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md bg-amber-50 text-amber-700">
          <CheckSquare className="w-4 h-4" /> Checklist Chapitre 4
        </span>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Je connais les instruments de la BCE",
            "Je connais les 3 taux directeurs",
            "Je sais expliquer le terme (r-g)",
            "Je connais les critères de Maastricht",
            "Je sais écrire la courbe de Phillips",
            "Je sais calculer le ratio de sacrifice",
            "Je distingue anticipations nulles vs adaptatives",
            "Je comprends la spirale prix-salaires",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-100/50 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-800">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <ChapterNav
        prev={{ path: '/revision-ch3', label: '← Fiche Ch.3', title: 'AS-AD' }}
        next={{ path: '/revision', label: 'Synthèse →', title: 'Fiche générale' }}
      />
    </main>
  );
}
