import { Section, Callout, FormulaBox, PageHeader, Math, Table, TableRow, TableCell } from '../../../../components';

export function RevisionIntensive() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Formulaire"
        title="Fiches de Révision"
        description="Toutes les formules essentielles à connaître par cœur. Recopie-les sur ton brouillon dès le début de l'épreuve !"
      />

      <Section type="key" title="Les 5 Formules Critiques">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="font-semibold text-emerald-800 mb-2">1. Cobb-Douglas (α + β = 1)</p>
            <Math>{"p_i x_i^* = \\alpha_i R"}</Math>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="font-semibold text-emerald-800 mb-2">2. Condition optimale</p>
            <Math>{"\\frac{Um_{x_1}}{p_1} = \\frac{Um_{x_2}}{p_2}"}</Math>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="font-semibold text-emerald-800 mb-2">3. Monopole</p>
            <Math>{"Rm = Cm"}</Math>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="font-semibold text-emerald-800 mb-2">4. Indice de Lerner</p>
            <Math>{"L = \\frac{P-Cm}{P} = \\frac{1}{|\\varepsilon|}"}</Math>
          </div>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="font-semibold text-amber-800 mb-2">5. Équation de Slutsky</p>
          <Math>{"\\frac{\\partial x_i}{\\partial p_j} = \\frac{\\partial h_i}{\\partial p_j} - \\frac{\\partial x_i}{\\partial R} x_j"}</Math>
        </div>
      </Section>

      <Section type="formule" title="Théorie du Consommateur">
        <FormulaBox label="Contrainte budgétaire" highlight>
          {"p_1 x_1 + p_2 x_2 = R"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Pente : <Math>{"-p_1/p_2"}</Math></p>

        <FormulaBox label="TMS et Condition d'Optimalité" highlight>
          {"TMS_{1,2} = \\frac{Um_{x_1}}{Um_{x_2}} = \\frac{p_1}{p_2}"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Équivalent : <Math>{"\\frac{Um_{x_1}}{p_1} = \\frac{Um_{x_2}}{p_2}"}</Math></p>

        <FormulaBox label="Lagrangien">
          {"\\mathcal{L} = U(x_1, x_2) + \\lambda(R - p_1 x_1 - p_2 x_2)"}
        </FormulaBox>

        <FormulaBox label="Cobb-Douglas : U = x₁^α x₂^β" highlight>
          {"p_1 x_1^* = \\frac{\\alpha}{\\alpha+\\beta} R \\quad \\text{et} \\quad p_2 x_2^* = \\frac{\\beta}{\\alpha+\\beta} R"}
        </FormulaBox>

        <Callout type="tip" title="Gain de temps">
          Si <Math>{"\\alpha + \\beta = 1"}</Math>, alors <Math>{"p_1 x_1^* = \\alpha R"}</Math> et <Math>{"p_2 x_2^* = \\beta R"}</Math>.
        </Callout>

        <FormulaBox label="Élasticité-prix">
          {"\\varepsilon_{x_i, p_i} = \\frac{\\partial x_i}{\\partial p_i} \\cdot \\frac{p_i}{x_i}"}
        </FormulaBox>

        <FormulaBox label="Élasticité-revenu">
          {"\\varepsilon_{x_i, R} = \\frac{\\partial x_i}{\\partial R} \\cdot \\frac{R}{x_i}"}
        </FormulaBox>
      </Section>

      <Section type="formule" title="Travail-Loisir">
        <FormulaBox label="Contrainte temporelle" highlight>
          {"C + w\\ell = wT + R_0"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Pente : <Math>{"-w/p"}</Math> (coût d'opportunité du loisir)</p>

        <FormulaBox label="Condition d'optimalité">
          {"\\frac{Um_\\ell}{Um_C} = \\frac{w}{p}"}
        </FormulaBox>

        <Callout type="insight" title="Effets d'une hausse de w">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Effet substitution</strong> : loisir plus cher → travail ↑</li>
            <li><strong>Effet revenu</strong> : plus riche → loisir ↑ (si bien normal)</li>
          </ul>
          <p className="mt-2 text-amber-700">⚠️ Courbe backward-bending si effet revenu domine</p>
        </Callout>
      </Section>

      <Section type="formule" title="Choix Intertemporels">
        <FormulaBox label="Contrainte intertemporelle (valeur présente)" highlight>
          {"c_1 + \\frac{c_2}{1+r} = m_1 + \\frac{m_2}{1+r} = W"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Pente : <Math>{"-(1+r)"}</Math></p>

        <FormulaBox label="Condition d'optimalité">
          {"\\frac{Um_{c_1}}{Um_{c_2}} = 1 + r"}
        </FormulaBox>

        <FormulaBox label="Taux d'intérêt réel (Fisher)" highlight>
          {"1 + \\rho = \\frac{1 + i}{1 + \\pi} \\quad \\Rightarrow \\quad \\rho \\approx i - \\pi"}
        </FormulaBox>

        <FormulaBox label="Épargne">
          {"s = m_1 - c_1^*"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">s {'>'} 0 : épargnant | s {'<'} 0 : emprunteur</p>
      </Section>

      <Section type="formule" title="Surplus et Slutsky">
        <FormulaBox label="Surplus du consommateur">
          {"SC = \\int_0^{Q^*} P(q) dq - P^* Q^*"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Aire sous la courbe de demande moins dépense effective</p>

        <FormulaBox label="Équation de Slutsky" highlight>
          {"\\frac{\\partial x_i}{\\partial p_j} = \\underbrace{\\frac{\\partial h_i}{\\partial p_j}}_{\\text{ES (-)}} - \\underbrace{\\frac{\\partial x_i}{\\partial R} \\cdot x_j}_{\\text{ER}}"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Bien normal</strong> : ES {'<'} 0, ER {'<'} 0 → Effet total {'<'} 0</li>
            <li><strong>Bien inférieur</strong> : ES {'<'} 0, ER {'>'} 0 → Effet total ambigu</li>
          </ul>
        </Callout>

        <p className="mt-4 mb-2"><strong>VC et VE :</strong></p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>VC</strong> : combien donner après hausse pour retrouver U₀</li>
          <li><strong>VE</strong> : combien retirer avant hausse pour atteindre U₁</li>
        </ul>
      </Section>

      <Section type="formule" title="Théorie du Producteur">
        <FormulaBox label="Fonction de production Cobb-Douglas">
          {"Q = AK^\\alpha L^\\beta"}
        </FormulaBox>

        <FormulaBox label="Productivités marginales">
          {"Pm_L = \\beta \\frac{Q}{L} \\quad Pm_K = \\alpha \\frac{Q}{K}"}
        </FormulaBox>

        <FormulaBox label="TMST et minimisation des coûts" highlight>
          {"TMST_{L,K} = \\frac{Pm_L}{Pm_K} = \\frac{w}{r}"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Équivalent : <Math>{"\\frac{Pm_L}{w} = \\frac{Pm_K}{r}"}</Math></p>

        <Callout type="insight" title="Rendements d'échelle (Cobb-Douglas)">
          <ul className="list-disc pl-4 space-y-1">
            <li>α + β {'>'} 1 : rendements croissants</li>
            <li>α + β = 1 : rendements constants</li>
            <li>α + β {'<'} 1 : rendements décroissants</li>
          </ul>
        </Callout>

        <p className="mt-4 mb-2"><strong>Coûts :</strong></p>
        <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
          <li>CT = CF + CV(Q)</li>
          <li>CM = CT/Q | Cm = dCT/dQ</li>
        </ul>

        <Callout type="warning" title="Règle importante">
          Si Cm {'<'} CM → CM décroît | Si Cm {'>'} CM → CM croît
        </Callout>
      </Section>

      <Section type="formule" title="Concurrence Pure et Parfaite">
        <FormulaBox label="Court terme" highlight>
          {"P = Cm(Q^*) \\quad \\text{si} \\quad P \\geq CVM"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Seuil de fermeture : P = min CVM</p>

        <FormulaBox label="Long terme" highlight>
          {"P = Cm(Q^*) = CM_{min} \\quad \\text{et} \\quad \\pi = 0"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Seuil de rentabilité : P = min CM</p>

        <FormulaBox label="Surplus du producteur">
          {"SP = \\int_0^{Q^*} [P^* - Cm(q)] dq"}
        </FormulaBox>
      </Section>

      <Section type="formule" title="Monopole et Oligopole">
        <FormulaBox label="Recette marginale du monopole" highlight>
          {"Rm = P\\left(1 + \\frac{1}{\\varepsilon}\\right)"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Demande linéaire P = a - bQ → Rm = a - 2bQ</p>

        <FormulaBox label="Équilibre du monopole" highlight>
          {"Rm = Cm"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-4">Puis P* = P(Q*) avec P* {'>'} Cm</p>

        <FormulaBox label="Indice de Lerner" highlight>
          {"L = \\frac{P - Cm}{P} = \\frac{1}{|\\varepsilon|}"}
        </FormulaBox>

        <FormulaBox label="Cournot - Équilibre de Nash">
          {"q_1^* = R_1(q_2^*) \\quad \\text{et} \\quad q_2^* = R_2(q_1^*)"}
        </FormulaBox>
        <p className="text-sm text-slate-700 mb-2">Cas linéaire (P = a - b(q₁+q₂), Cm = c) :</p>
        <FormulaBox label="Solution Cournot symétrique">
          {"q_1^* = q_2^* = \\frac{a-c}{3b} \\quad P^* = \\frac{a+2c}{3}"}
        </FormulaBox>

        <Callout type="insight" title="Stackelberg et Bertrand">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Stackelberg</strong> : Leader choisit en premier, résolution par rétroduction</li>
            <li><strong>Bertrand</strong> : Paradoxe → P = Cm et π = 0 (comme CPP !)</li>
          </ul>
        </Callout>
      </Section>

      <Section type="intuition" title="Tableau Récapitulatif des Marchés">
        <Table headers={['Marché', 'Condition', 'Prix', 'Profit LT']}>
          <TableRow>
            <TableCell><strong>CPP</strong></TableCell>
            <TableCell>P = Cm</TableCell>
            <TableCell>P = CM<sub>min</sub></TableCell>
            <TableCell>Nul</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Monopole</strong></TableCell>
            <TableCell>Rm = Cm</TableCell>
            <TableCell>P {'>'} Cm</TableCell>
            <TableCell>Positif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Cournot</strong></TableCell>
            <TableCell>q<sub>i</sub>* = R<sub>i</sub>(q<sub>j</sub>*)</TableCell>
            <TableCell>P {'>'} Cm</TableCell>
            <TableCell>Positif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Stackelberg</strong></TableCell>
            <TableCell>Rétroduction</TableCell>
            <TableCell>P {'>'} Cm</TableCell>
            <TableCell>Positif</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bertrand</strong></TableCell>
            <TableCell>p<sub>i</sub>* = Cm</TableCell>
            <TableCell>P = Cm</TableCell>
            <TableCell>Nul</TableCell>
          </TableRow>
        </Table>
        <p className="text-sm text-slate-600 mt-4">Relation : Q<sub>m</sub> {'<'} Q<sub>c</sub> {'<'} Q<sub>cpp</sub> et P<sub>m</sub> {'>'} P<sub>c</sub> {'>'} P<sub>cpp</sub></p>
      </Section>

      <Section type="warning" title="Top 10 des Pièges d'Examen">
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Confondre Rm et P en monopole</strong> : Rm = Cm, PAS P = Cm</li>
          <li><strong>Oublier les CSO</strong> (Hessien pour vérifier max/min)</li>
          <li><strong>Confondre Marshall et Hicks</strong> : Marshall max U s.c. budget, Hicks min dépense s.c. U</li>
          <li><strong>Oublier la formule directe Cobb-Douglas</strong> avec α + β = 1</li>
          <li><strong>Confondre rendements d'échelle et rendements marginaux</strong></li>
          <li><strong>Ne pas vérifier les contraintes de positivité</strong> : x ≥ 0, K ≥ 0, L ≥ 0</li>
          <li><strong>Confondre CT et LT</strong> : CT → P ≥ CVM, LT → P ≥ CM</li>
          <li><strong>Oublier d'interpréter économiquement</strong> les résultats</li>
          <li><strong>Pour Stackelberg</strong>, oublier la rétroduction (partir du suiveur)</li>
          <li><strong>En Slutsky</strong>, confondre le signe des effets</li>
        </ol>
      </Section>

    </main>
  );
}
