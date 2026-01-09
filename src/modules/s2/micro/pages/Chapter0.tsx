import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter0() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 00"
        title="Théorie du Consommateur"
        description="Contrainte budgétaire, préférences, TMS, équilibre du consommateur et demandes Marshalliennes."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>Le consommateur <strong>maximise son utilité sous contrainte budgétaire</strong>. L'équilibre est atteint quand le TMS (taux auquel il accepte de substituer un bien à l'autre) égale le rapport des prix. Mathématiquement : on résout avec le Lagrangien, et on obtient les demandes Marshalliennes <Math>{"x_1^*(p_1, p_2, R)"}</Math> et <Math>{"x_2^*(p_1, p_2, R)"}</Math>.</p>
      </Section>

      <Section type="formule" title="La contrainte budgétaire">
        <p className="mb-4">Le consommateur ne peut pas dépenser plus que son revenu. Avec un revenu <Math>R</Math> et des prix <Math>{"p_1, p_2"}</Math>, l'ensemble des paniers accessibles forme une droite.</p>

        <FormulaBox label="Contrainte budgétaire" highlight>
          {"p_1 x_1 + p_2 x_2 = R"}
        </FormulaBox>

        <p className="mt-4 mb-2">En isolant <Math>{"x_2"}</Math> (forme "droite de budget") :</p>
        <FormulaBox label="Droite de budget">
          {"x_2 = \\frac{R}{p_2} - \\frac{p_1}{p_2} x_1"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><strong>Ordonnée à l'origine</strong> : <Math>{"R/p_2"}</Math> (quantité max de bien 2 si <Math>{"x_1=0"}</Math>)</li>
          <li><strong>Abscisse à l'origine</strong> : <Math>{"R/p_1"}</Math> (quantité max de bien 1 si <Math>{"x_2=0"}</Math>)</li>
          <li><strong>Pente</strong> : <Math>{"-p_1/p_2"}</Math> (taux d'échange marchand)</li>
        </ul>

        <Callout type="warning" title="Piège d'examen">
          Si tous les prix ET le revenu sont multipliés par <Math>{"\\lambda > 0"}</Math>, la contrainte budgétaire <strong>ne change pas</strong> (homogénéité de degré 0).
        </Callout>
      </Section>

      <Section type="intuition" title="Les préférences et courbes d'indifférence">
        <p className="mb-4">Une courbe d'indifférence regroupe tous les paniers qui donnent <strong>le même niveau de satisfaction</strong>. Plus la courbe est éloignée de l'origine, plus le niveau de satisfaction est élevé.</p>

        <p className="mb-2"><strong>Axiomes des préférences :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Complétude</strong> : Pour tous paniers A et B, soit A ≽ B, soit B ≽ A</li>
          <li><strong>Réflexivité</strong> : Tout panier A est au moins aussi bon que lui-même</li>
          <li><strong>Transitivité</strong> : Si A ≽ B et B ≽ C, alors A ≽ C</li>
          <li><strong>Monotonie</strong> : "Plus c'est mieux"</li>
        </ul>

        <p className="mb-2"><strong>Propriétés des courbes d'indifférence :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Décroissantes</li>
          <li>Convexes (préférence pour la diversification)</li>
          <li>Ne se croisent jamais</li>
        </ul>
      </Section>

      <Section type="formule" title="La fonction d'utilité">
        <p className="mb-4">Une fonction d'utilité <Math>{"U: \\mathbb{R}^2_+ \\to \\mathbb{R}"}</Math> associe à chaque panier un nombre représentant le niveau de satisfaction. L'utilité est <strong>ordinale</strong> (seul l'ordre compte).</p>

        <p className="mb-2"><strong>Fonctions classiques :</strong></p>
        
        <FormulaBox label="Cobb-Douglas">
          {"U(x_1, x_2) = x_1^\\alpha x_2^\\beta \\quad (\\alpha, \\beta > 0)"}
        </FormulaBox>

        <FormulaBox label="Quasi-linéaire">
          {"U(x_1, x_2) = v(x_1) + x_2"}
        </FormulaBox>

        <Callout type="insight" title="Utilité marginale">
          <Math>{"Um_{x_i} = \\frac{\\partial U}{\\partial x_i}"}</Math> = variation d'utilité pour une unité supplémentaire du bien i.
        </Callout>
      </Section>

      <Section type="formule" title="Le Taux Marginal de Substitution (TMS)">
        <p className="mb-4">Le TMS mesure <strong>combien d'unités du bien 2 le consommateur accepte de sacrifier</strong> pour obtenir une unité supplémentaire du bien 1, en restant sur la même courbe d'indifférence.</p>

        <FormulaBox label="TMS" highlight>
          {"TMS_{1,2} = \\frac{Um_{x_1}}{Um_{x_2}} = \\frac{\\partial U/\\partial x_1}{\\partial U/\\partial x_2}"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          Le TMS est le "taux de change subjectif" du consommateur, à comparer au "taux de change objectif du marché" qui est <Math>{"p_1/p_2"}</Math>.
        </Callout>

        <p className="mt-4"><strong>Cas Cobb-Douglas</strong> <Math>{"U = x_1^\\alpha x_2^\\beta"}</Math> :</p>
        <FormulaBox label="TMS Cobb-Douglas">
          {"TMS = \\frac{\\alpha x_2}{\\beta x_1}"}
        </FormulaBox>
      </Section>

      <Section type="formule" title="L'équilibre du consommateur">
        <p className="mb-4">Le consommateur maximise son utilité quand la courbe d'indifférence est <strong>tangente</strong> à la droite de budget.</p>

        <FormulaBox label="Condition d'optimalité" highlight>
          {"TMS_{1,2} = \\frac{p_1}{p_2}"}
        </FormulaBox>

        <p className="mt-4 mb-2">Formes équivalentes :</p>
        <FormulaBox label="Égalisation des utilités marginales pondérées">
          {"\\frac{Um_{x_1}}{p_1} = \\frac{Um_{x_2}}{p_2}"}
        </FormulaBox>

        <Callout type="tip" title="Interprétation">
          Le dernier euro dépensé pour chaque bien apporte la même utilité marginale.
        </Callout>
      </Section>

      <Section type="key" title="Méthode du Lagrangien">
        <p className="mb-4"><strong>Programme :</strong></p>
        <FormulaBox label="Maximisation sous contrainte">
          {"\\max_{x_1, x_2} U(x_1, x_2) \\quad \\text{s.c.} \\quad p_1 x_1 + p_2 x_2 = R"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Étapes :</strong></p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Écrire le Lagrangien : <Math>{"\\mathcal{L} = U(x_1, x_2) + \\lambda(R - p_1 x_1 - p_2 x_2)"}</Math></li>
          <li>CPO : <Math>{"\\frac{\\partial \\mathcal{L}}{\\partial x_1} = 0"}</Math>, <Math>{"\\frac{\\partial \\mathcal{L}}{\\partial x_2} = 0"}</Math>, <Math>{"\\frac{\\partial \\mathcal{L}}{\\partial \\lambda} = 0"}</Math></li>
          <li>De (1) et (2), tirer <Math>{"\\frac{Um_{x_1}}{Um_{x_2}} = \\frac{p_1}{p_2}"}</Math></li>
          <li>Résoudre le système pour obtenir <Math>{"x_1^*, x_2^*"}</Math></li>
        </ol>
      </Section>

      <Section type="formule" title="Formule Cobb-Douglas (à retenir !)">
        <p className="mb-4">Pour <Math>{"U = x_1^\\alpha x_2^\\beta"}</Math> :</p>

        <FormulaBox label="Demandes Marshalliennes Cobb-Douglas" highlight>
          {"p_1 x_1^* = \\frac{\\alpha}{\\alpha + \\beta} R \\quad \\text{et} \\quad p_2 x_2^* = \\frac{\\beta}{\\alpha + \\beta} R"}
        </FormulaBox>

        <Callout type="tip" title="Gain de temps">
          Si <Math>{"\\alpha + \\beta = 1"}</Math>, alors <Math>{"p_1 x_1^* = \\alpha R"}</Math> et <Math>{"p_2 x_2^* = \\beta R"}</Math>. Apprends cette formule par cœur !
        </Callout>
      </Section>

      <Section type="intuition" title="Demandes Marshalliennes vs Hicksiennes">
        <Table headers={['Caractéristique', 'Marshall (Primal)', 'Hicks (Dual)']}>
          <TableRow>
            <TableCell><strong>Objectif</strong></TableCell>
            <TableCell>Maximiser U</TableCell>
            <TableCell>Minimiser la dépense</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Contrainte</strong></TableCell>
            <TableCell><Math>{"p_1 x_1 + p_2 x_2 = R"}</Math></TableCell>
            <TableCell><Math>{"U(x_1, x_2) = \\bar{U}"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Résultat</strong></TableCell>
            <TableCell><Math>{"x_i^*(p, R)"}</Math></TableCell>
            <TableCell><Math>{"h_i(p, \\bar{U})"}</Math></TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Élasticités">
        <FormulaBox label="Élasticité-prix de la demande">
          {"\\varepsilon_{x_i, p_i} = \\frac{\\partial x_i}{\\partial p_i} \\cdot \\frac{p_i}{x_i}"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4 mb-4">
          <li><Math>{"|\\varepsilon| > 1"}</Math> : Demande <strong>élastique</strong> (bien de luxe)</li>
          <li><Math>{"|\\varepsilon| < 1"}</Math> : Demande <strong>inélastique</strong> (bien de nécessité)</li>
        </ul>

        <FormulaBox label="Élasticité-revenu">
          {"\\varepsilon_{x_i, R} = \\frac{\\partial x_i}{\\partial R} \\cdot \\frac{R}{x_i}"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><Math>{"\\varepsilon > 0"}</Math> : Bien <strong>normal</strong></li>
          <li><Math>{"\\varepsilon < 0"}</Math> : Bien <strong>inférieur</strong></li>
        </ul>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Oublier la contrainte</strong> — Toujours vérifier que <Math>{"p_1 x_1^* + p_2 x_2^* = R"}</Math></li>
          <li><strong>Confondre TMS et rapport des prix</strong> — À l'équilibre ils sont égaux, mais ce sont deux concepts différents</li>
          <li><strong>Oublier l'homogénéité</strong> — Si tous les prix et R sont multipliés par λ, les demandes ne changent pas</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro', label: '← Retour', title: 'Accueil' }}
        next={{ path: '/micro/chapitre-1', label: 'Chapitre suivant →', title: 'Arbitrage Travail-Loisir' }}
      />
    </main>
  );
}
