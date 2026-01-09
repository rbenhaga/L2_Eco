import { Section, Callout, FormulaBox, PageHeader, Math, Table, TableRow, TableCell } from '../../../../components';

export function Methodes() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Méthodes"
        title="Méthodes de Résolution"
        description="Méthodes systématiques pour résoudre tous les types d'exercices. Chaque méthode suit : Identification → Programme → Résolution → Vérification → Interprétation."
      />

      <Section type="key" title="Méthode 1 : Optimisation du Consommateur (Demande Marshallienne)">
        <p className="mb-4"><strong>Tu reconnais ce problème quand :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>On te donne une fonction d'utilité U(x₁, x₂)</li>
          <li>On te donne des prix p₁, p₂ et un revenu R</li>
          <li>On te demande les quantités optimales consommées</li>
        </ul>

        <FormulaBox label="Programme" highlight>
          {"\\max_{x_1, x_2} U(x_1, x_2) \\quad \\text{s.c.} \\quad p_1 x_1 + p_2 x_2 = R"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Résolution par Lagrangien :</strong></p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>Écrire le Lagrangien : <Math>{"\\mathcal{L} = U(x_1, x_2) + \\lambda(R - p_1 x_1 - p_2 x_2)"}</Math></li>
          <li>Calculer les CPO : <Math>{"\\frac{\\partial U}{\\partial x_1} = \\lambda p_1"}</Math>, <Math>{"\\frac{\\partial U}{\\partial x_2} = \\lambda p_2"}</Math></li>
          <li>Diviser pour obtenir TMS = p₁/p₂</li>
          <li>Résoudre le système avec la contrainte budgétaire</li>
        </ol>

        <Callout type="tip" title="Astuce Cobb-Douglas">
          Si U = x₁^α x₂^β avec α + β = 1, utilise directement <Math>{"p_1 x_1^* = \\alpha R"}</Math> et <Math>{"p_2 x_2^* = \\beta R"}</Math>. Gagne 5 minutes !
        </Callout>
      </Section>

      <Section type="formule" title="Méthode 2 : Minimisation des Dépenses (Demande Hicksienne)">
        <p className="mb-4"><strong>Tu reconnais ce problème quand :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>On te demande la demande compensatrice (hicksienne)</li>
          <li>On te donne un niveau d'utilité cible Ū</li>
          <li>On cherche la dépense minimale pour atteindre Ū</li>
        </ul>

        <FormulaBox label="Programme" highlight>
          {"\\min_{x_1, x_2} p_1 x_1 + p_2 x_2 \\quad \\text{s.c.} \\quad U(x_1, x_2) = \\bar{U}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Résolution :</strong></p>
        <p>Même condition TMS = p₁/p₂, mais on substitue dans U = Ū au lieu de la contrainte budgétaire.</p>

        <Callout type="insight" title="Lien Marshall-Hicks">
          Les demandes coïncident à l'équilibre : h(p, U*) = x*(p, R*)
        </Callout>
      </Section>

      <Section type="formule" title="Méthode 3 : Décomposition de Slutsky">
        <FormulaBox label="Équation de Slutsky" highlight>
          {"\\underbrace{\\frac{\\partial x_i}{\\partial p_j}}_{\\text{Effet total}} = \\underbrace{\\frac{\\partial h_i}{\\partial p_j}}_{\\text{Effet substitution}} - \\underbrace{\\frac{\\partial x_i}{\\partial R} \\cdot x_j}_{\\text{Effet revenu}}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Résolution Graphique :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Point A :</strong> équilibre initial (x₁⁰, x₂⁰)</li>
          <li><strong>Point C :</strong> nouvel équilibre (x₁¹, x₂¹)</li>
          <li><strong>Point B :</strong> panier intermédiaire (même U⁰, nouveaux prix)</li>
        </ul>
        <p className="mb-4">Effet substitution : A → B | Effet revenu : B → C</p>

        <Table headers={['Type de bien', 'ES', 'ER', 'Effet Total']}>
          <TableRow>
            <TableCell>Bien normal</TableCell>
            <TableCell>−</TableCell>
            <TableCell>−</TableCell>
            <TableCell>−</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bien inférieur</TableCell>
            <TableCell>−</TableCell>
            <TableCell>+</TableCell>
            <TableCell>?</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bien de Giffen</TableCell>
            <TableCell>−</TableCell>
            <TableCell>++</TableCell>
            <TableCell>+</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Méthode 4 : Minimisation des Coûts de Production">
        <p className="mb-4"><strong>Tu reconnais ce problème quand :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>On te donne une fonction de production Q = f(K, L)</li>
          <li>On te donne les prix des facteurs r (capital) et w (travail)</li>
          <li>On te demande la combinaison optimale pour produire Q̄</li>
        </ul>

        <FormulaBox label="Programme" highlight>
          {"\\min_{K, L} C = wL + rK \\quad \\text{s.c.} \\quad f(K, L) = \\bar{Q}"}
        </FormulaBox>

        <FormulaBox label="Condition TMST">
          {"\\frac{Pm_L}{Pm_K} = \\frac{w}{r} \\quad \\text{ou} \\quad \\frac{Pm_L}{w} = \\frac{Pm_K}{r}"}
        </FormulaBox>

        <Callout type="tip" title="Cobb-Douglas Q = AK^α L^β">
          TMST = (β/α)(K/L) = w/r → K = (β/α)(w/r)L
        </Callout>

        <p className="mt-4 mb-2"><strong>Lien Rendements - Coûts :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Rendements constants (α + β = 1) → Cm constant</li>
          <li>Rendements croissants (α + β {'>'} 1) → Cm décroissant</li>
          <li>Rendements décroissants (α + β {'<'} 1) → Cm croissant</li>
        </ul>
      </Section>

      <Section type="formule" title="Méthode 5 : Offre de la Firme en CPP">
        <p className="mb-2"><strong>Court Terme :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Profit : π = PQ − CT(Q) = PQ − CF − CV(Q)</li>
          <li>CPO : P = Cm(Q)</li>
          <li>Condition de production : P ≥ CVM(Q*)</li>
        </ul>

        <FormulaBox label="Offre de court terme" highlight>
          {"S^{CT}(P) = \\begin{cases} Q^* \\text{ tel que } P = Cm(Q^*) & \\text{si } P \\geq CVM_{min} \\\\ 0 & \\text{si } P < CVM_{min} \\end{cases}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Long Terme :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Condition d'entrée/sortie : P ≥ CM(Q)</li>
          <li>Équilibre LT : P = CM<sub>min</sub> = Cm(Q*) et π = 0</li>
        </ul>
      </Section>

      <Section type="key" title="Méthode 6 : Monopole">
        <FormulaBox label="Programme du monopole">
          {"\\max_Q \\pi(Q) = P(Q) \\cdot Q - C(Q)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Résolution :</strong></p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>Calculer RT(Q) = P(Q) × Q</li>
          <li>Calculer Rm(Q) = dRT/dQ</li>
          <li>CPO : Rm(Q*) = Cm(Q*)</li>
          <li>Trouver le prix : P* = P(Q*)</li>
        </ol>

        <Callout type="tip" title="Demande linéaire P = a − bQ">
          Rm = a − 2bQ (pente 2×). Si Cm = c constant : Q* = (a−c)/(2b), P* = (a+c)/2
        </Callout>

        <FormulaBox label="Indice de Lerner" highlight>
          {"L = \\frac{P - Cm}{P} = \\frac{1}{|\\varepsilon|}"}
        </FormulaBox>
        <p className="text-sm text-slate-700 dark:text-slate-300">L = 0 : CPP | L → 1 : Monopole pur</p>
      </Section>

      <Section type="formule" title="Méthode 7 : Oligopole de Cournot">
        <p className="mb-4"><strong>Fonctions de Réaction :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Pour la firme 1 : max π₁(q₁, q₂) → CPO → q₁ = R₁(q₂)</li>
          <li>Idem pour firme 2 : q₂ = R₂(q₁)</li>
        </ul>

        <FormulaBox label="Équilibre de Nash-Cournot" highlight>
          {"q_1^* = R_1(q_2^*) \\quad \\text{et} \\quad q_2^* = R_2(q_1^*)"}
        </FormulaBox>

        <Callout type="tip" title="Cas linéaire P = a − b(q₁+q₂), Cm = c">
          R₁(q₂) = (a−c)/(2b) − q₂/2<br/>
          Équilibre : q₁* = q₂* = (a−c)/(3b), P* = (a+2c)/3
        </Callout>
      </Section>

      <Section type="formule" title="Méthode 8 : Oligopole de Stackelberg">
        <p className="mb-4"><strong>Résolution par Induction à Rebours :</strong></p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>Résoudre le suiveur (firme 2) → q₂* = R₂(q₁)</li>
          <li>Le leader anticipe : max π₁(q₁, R₂(q₁))</li>
          <li>Déduire q₂* = R₂(q₁*)</li>
        </ol>

        <Callout type="insight" title="Résultat">
          q₁* {'>'} q₁<sup>Cournot</sup> {'>'} q₂* et π₁* {'>'} π₁<sup>Cournot</sup> {'>'} π₂* (avantage au leader)
        </Callout>
      </Section>

      <Section type="intuition" title="Récapitulatif : Comparaison des Marchés">
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
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">Relation : Q<sub>m</sub> {'<'} Q<sub>c</sub> {'<'} Q<sub>cpp</sub> et P<sub>m</sub> {'>'} P<sub>c</sub> {'>'} P<sub>cpp</sub></p>
      </Section>
    </main>
  );
}
