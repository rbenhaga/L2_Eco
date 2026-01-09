import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter4() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 04"
        title="Demande de Marché"
        description="Agrégation des demandes, élasticités prix/revenu/croisée, classification des biens."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>La demande de marché est la <strong>somme horizontale des demandes individuelles</strong>. L'élasticité-prix mesure la sensibilité de la quantité demandée au prix : <Math>{"\\varepsilon_p = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}"}</Math>. Si <Math>{"|\\varepsilon_p| > 1"}</Math> : demande élastique. Si <Math>{"|\\varepsilon_p| < 1"}</Math> : demande inélastique.</p>
      </Section>

      <Section type="formule" title="Agrégation des demandes">
        <p className="mb-4">Soit <Math>n</Math> consommateurs avec des demandes individuelles <Math>{"x_i^1(p_1, p_2, m_i)"}</Math>.</p>

        <FormulaBox label="Demande de marché" highlight>
          {"X^1(p_1, p_2) = \\sum_{i=1}^{n} x_i^1(p_1, p_2, m_i)"}
        </FormulaBox>

        <Callout type="insight" title="Agrégation horizontale">
          Pour chaque prix, on <strong>additionne les quantités</strong> que tous les consommateurs veulent acheter.
        </Callout>

        <Callout type="warning" title="Kink points">
          La demande de marché peut avoir des <strong>points de cassure</strong> là où certains consommateurs entrent ou sortent du marché.
        </Callout>
      </Section>

      <Section type="formule" title="Élasticité-prix de la demande">
        <FormulaBox label="Élasticité-prix" highlight>
          {"\\varepsilon_p = \\frac{dQ}{dP} \\cdot \\frac{P}{Q} = \\frac{\\Delta Q / Q}{\\Delta P / P}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Interprétation :</strong> Si <Math>{"\\varepsilon_p = -0.5"}</Math>, une hausse de prix de 1% entraîne une baisse de quantité de 0.5%.</p>

        <Table headers={['Type', 'Condition', 'Exemples']}>
          <TableRow>
            <TableCell><strong>Élastique</strong></TableCell>
            <TableCell><Math>{"|\\varepsilon_p| > 1"}</Math></TableCell>
            <TableCell>Biens de luxe, voyages</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Inélastique</strong></TableCell>
            <TableCell><Math>{"|\\varepsilon_p| < 1"}</Math></TableCell>
            <TableCell>Essence, médicaments</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Unitaire</strong></TableCell>
            <TableCell><Math>{"|\\varepsilon_p| = 1"}</Math></TableCell>
            <TableCell>Recette constante</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="intuition" title="Élasticité et recette totale">
        <p className="mb-4">Recette totale : <Math>{"RT = P \\times Q"}</Math></p>

        <Table headers={['Élasticité', 'Hausse de prix', 'Effet sur RT']}>
          <TableRow>
            <TableCell><Math>{"|\\varepsilon_p| > 1"}</Math></TableCell>
            <TableCell>↑P</TableCell>
            <TableCell><strong>RT diminue</strong></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"|\\varepsilon_p| < 1"}</Math></TableCell>
            <TableCell>↑P</TableCell>
            <TableCell><strong>RT augmente</strong></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"|\\varepsilon_p| = 1"}</Math></TableCell>
            <TableCell>↑P</TableCell>
            <TableCell><strong>RT constante</strong></TableCell>
          </TableRow>
        </Table>

        <Callout type="tip" title="Application : taxe sur l'essence">
          L'essence a une demande <strong>inélastique</strong> à court terme (<Math>{"\\varepsilon_p \\approx -0.2"}</Math>). Une hausse de taxe augmente la recette fiscale car la quantité baisse peu.
        </Callout>
      </Section>

      <Section type="formule" title="Élasticité-revenu">
        <FormulaBox label="Élasticité-revenu" highlight>
          {"\\varepsilon_R = \\frac{dQ}{dR} \\cdot \\frac{R}{Q}"}
        </FormulaBox>

        <Table headers={['Type de bien', 'Condition', 'Exemples']}>
          <TableRow>
            <TableCell><strong>Bien de luxe</strong></TableCell>
            <TableCell><Math>{"\\varepsilon_R > 1"}</Math></TableCell>
            <TableCell>Voitures de luxe, restaurants</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bien de nécessité</strong></TableCell>
            <TableCell><Math>{"0 < \\varepsilon_R < 1"}</Math></TableCell>
            <TableCell>Pain, sel</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bien inférieur</strong></TableCell>
            <TableCell><Math>{"\\varepsilon_R < 0"}</Math></TableCell>
            <TableCell>Transports en commun, discount</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Élasticité croisée">
        <FormulaBox label="Élasticité croisée" highlight>
          {"\\varepsilon_{12} = \\frac{dQ_1}{dP_2} \\cdot \\frac{P_2}{Q_1}"}
        </FormulaBox>

        <Table headers={['Relation', 'Condition', 'Exemples']}>
          <TableRow>
            <TableCell><strong>Substituts</strong></TableCell>
            <TableCell><Math>{"\\varepsilon_{12} > 0"}</Math></TableCell>
            <TableCell>Coca et Pepsi, beurre et margarine</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Complémentaires</strong></TableCell>
            <TableCell><Math>{"\\varepsilon_{12} < 0"}</Math></TableCell>
            <TableCell>Café et sucre, voiture et essence</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Indépendants</strong></TableCell>
            <TableCell><Math>{"\\varepsilon_{12} = 0"}</Math></TableCell>
            <TableCell>Aucune relation</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Calcul pour demande linéaire">
        <p className="mb-4">Pour <Math>{"Q = a - bP + cR"}</Math> :</p>

        <FormulaBox label="Élasticités">
          {"\\varepsilon_p = -b \\cdot \\frac{P}{Q} \\quad \\text{et} \\quad \\varepsilon_R = c \\cdot \\frac{R}{Q}"}
        </FormulaBox>

        <Callout type="warning" title="Attention">
          Pour une demande linéaire, l'élasticité <strong>varie le long de la courbe</strong> ! Prix bas → inélastique, prix élevés → élastique.
        </Callout>
      </Section>

      <Section type="formule" title="Modèle log-log (isoélastique)">
        <p className="mb-4">Spécification : <Math>{"\\ln(Q) = a + b\\ln(P) + c\\ln(R)"}</Math></p>

        <Callout type="tip" title="Avantage">
          Les coefficients <strong>sont directement les élasticités</strong> !<br/>
          <Math>{"\\varepsilon_p = b"}</Math> et <Math>{"\\varepsilon_R = c"}</Math>
        </Callout>

        <p className="mt-4"><strong>Exemple :</strong> Si on estime <Math>{"\\ln(Q) = 5 - 0.34\\ln(P) + 1.32\\ln(R)"}</Math> :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"\\varepsilon_p = -0.34"}</Math> → demande inélastique</li>
          <li><Math>{"\\varepsilon_R = 1.32"}</Math> → bien de luxe</li>
        </ul>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Oublier le signe</strong> — <Math>{"\\varepsilon_p"}</Math> est toujours négatif (demande décroissante)</li>
          <li><strong>Confondre élastique/inélastique</strong> — Élastique = sensible au prix</li>
          <li><strong>Généraliser l'élasticité</strong> — Elle varie le long de la courbe (sauf log-log)</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-3', label: '← Chapitre précédent', title: 'Surplus du Consommateur' }}
        next={{ path: '/micro/chapitre-5', label: 'Chapitre suivant →', title: 'Théorie du Producteur' }}
      />
    </main>
  );
}
