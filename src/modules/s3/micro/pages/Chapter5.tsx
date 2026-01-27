import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter5() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 05"
        title="Théorie du Producteur"
        description="Fonction de production, TMST, isoquantes, minimisation des coûts."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>La firme combine travail <Math>L</Math> et capital <Math>K</Math> pour produire une quantité <Math>Q</Math> selon une fonction de production. Pour minimiser ses coûts, elle égalise le <strong>TMST</strong> au rapport des prix des facteurs. Les isoquantes sont tangentes aux isocoûts. Condition d'optimalité : <Math>{"\\frac{Pm_L}{Pm_K} = \\frac{w}{r}"}</Math>.</p>
      </Section>

      <Section type="formule" title="La fonction de production">
        <FormulaBox label="Fonction de production" highlight>
          {"Q = F(K, L)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Fonctions classiques :</strong></p>

        <FormulaBox label="Cobb-Douglas">
          {"Q = AK^\\alpha L^\\beta \\quad (A > 0, \\alpha, \\beta > 0)"}
        </FormulaBox>

        <FormulaBox label="Leontief (compléments parfaits)">
          {"Q = \\min\\{aK, bL\\}"}
        </FormulaBox>

        <FormulaBox label="Substituts parfaits">
          {"Q = aK + bL"}
        </FormulaBox>
      </Section>

      <Section type="formule" title="Productivités marginales et moyennes">
        <FormulaBox label="Productivité marginale" highlight>
          {"Pm_L = \\frac{\\partial Q}{\\partial L} \\quad \\text{et} \\quad Pm_K = \\frac{\\partial Q}{\\partial K}"}
        </FormulaBox>

        <FormulaBox label="Productivité moyenne">
          {"PM_L = \\frac{Q}{L} \\quad \\text{et} \\quad PM_K = \\frac{Q}{K}"}
        </FormulaBox>

        <Callout type="insight" title="Loi des rendements décroissants">
          <Math>{"\\frac{\\partial^2 Q}{\\partial L^2} < 0"}</Math> : la productivité marginale diminue quand on augmente un facteur (l'autre fixe).
        </Callout>
      </Section>

      <Section type="formule" title="Rendements d'échelle">
        <p className="mb-4">Que se passe-t-il quand on multiplie <strong>tous les facteurs</strong> par <Math>{"\\lambda > 1"}</Math> ?</p>

        <Table headers={['Type', 'Condition', 'Interprétation']}>
          <TableRow>
            <TableCell><strong>Croissants</strong></TableCell>
            <TableCell><Math>{"F(\\lambda K, \\lambda L) > \\lambda F(K, L)"}</Math></TableCell>
            <TableCell>Économies d'échelle</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Constants</strong></TableCell>
            <TableCell><Math>{"F(\\lambda K, \\lambda L) = \\lambda F(K, L)"}</Math></TableCell>
            <TableCell>Homogène degré 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Décroissants</strong></TableCell>
            <TableCell><Math>{"F(\\lambda K, \\lambda L) < \\lambda F(K, L)"}</Math></TableCell>
            <TableCell>Déséconomies d'échelle</TableCell>
          </TableRow>
        </Table>

        <Callout type="tip" title="Méthode rapide Cobb-Douglas">
          Pour <Math>{"Q = AK^\\alpha L^\\beta"}</Math> :<br/>
          • <Math>{"\\alpha + \\beta > 1"}</Math> → rendements croissants<br/>
          • <Math>{"\\alpha + \\beta = 1"}</Math> → rendements constants<br/>
          • <Math>{"\\alpha + \\beta < 1"}</Math> → rendements décroissants
        </Callout>

        <Callout type="warning" title="Ne pas confondre">
          <strong>Rendements d'échelle</strong> : tous les facteurs varient simultanément<br/>
          <strong>Rendements marginaux</strong> : un seul facteur varie (l'autre fixe)
        </Callout>
      </Section>

      <Section type="formule" title="Isoquantes et TMST">
        <p className="mb-4">Une <strong>isoquante</strong> est l'ensemble des combinaisons <Math>{"(K, L)"}</Math> qui produisent une quantité <Math>{"Q_0"}</Math> donnée.</p>

        <FormulaBox label="TMST (Taux Marginal de Substitution Technique)" highlight>
          {"TMST_{L,K} = \\frac{Pm_L}{Pm_K}"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          Le TMST mesure le taux auquel on peut substituer du capital au travail <strong>en maintenant la production constante</strong>.
        </Callout>
      </Section>

      <Section type="formule" title="Isocoûts">
        <p className="mb-4">Un <strong>isocoût</strong> est l'ensemble des combinaisons <Math>{"(K, L)"}</Math> qui ont le même coût total <Math>{"C_0"}</Math>.</p>

        <FormulaBox label="Isocoût">
          {"C = wL + rK = C_0"}
        </FormulaBox>

        <p className="mt-4">Sous forme de droite : <Math>{"K = \\frac{C_0}{r} - \\frac{w}{r}L"}</Math></p>
        <p><strong>Pente</strong> : <Math>{"-w/r"}</Math> (taux de substitution marchand des facteurs)</p>
      </Section>

      <Section type="formule" title="Minimisation des coûts">
        <p className="mb-4"><strong>Programme :</strong></p>
        <FormulaBox label="Minimisation sous contrainte">
          {"\\min_{K, L} C = wL + rK \\quad \\text{s.c.} \\quad F(K, L) = Q_0"}
        </FormulaBox>

        <FormulaBox label="Condition d'optimalité" highlight>
          {"TMST_{L,K} = \\frac{Pm_L}{Pm_K} = \\frac{w}{r}"}
        </FormulaBox>

        <p className="mt-4">Forme équivalente :</p>
        <FormulaBox label="Égalisation des productivités marginales pondérées">
          {"\\frac{Pm_L}{w} = \\frac{Pm_K}{r}"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          Le dernier euro dépensé en travail rapporte autant (en production) que le dernier euro dépensé en capital.
        </Callout>
      </Section>

      <Section type="formule" title="Coûts de court terme vs long terme">
        <Table headers={['Concept', 'Court terme', 'Long terme']}>
          <TableRow>
            <TableCell><strong>Facteurs</strong></TableCell>
            <TableCell>K fixe, L variable</TableCell>
            <TableCell>K et L variables</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Coûts fixes</strong></TableCell>
            <TableCell>CF {'>'} 0</TableCell>
            <TableCell>CF = 0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Flexibilité</strong></TableCell>
            <TableCell>Limitée</TableCell>
            <TableCell>Totale</TableCell>
          </TableRow>
        </Table>

        <FormulaBox label="Coût total">
          {"CT(Q) = CF + CV(Q)"}
        </FormulaBox>

        <FormulaBox label="Coût marginal">
          {"Cm(Q) = \\frac{dCT}{dQ} = \\frac{dCV}{dQ}"}
        </FormulaBox>

        <FormulaBox label="Coût moyen">
          {"CM(Q) = \\frac{CT(Q)}{Q}"}
        </FormulaBox>

        <Callout type="warning" title="Piège">
          Le coût marginal <Math>Cm</Math> ne dépend <strong>pas</strong> des coûts fixes ! La dérivée d'une constante est nulle.
        </Callout>
      </Section>

      <Section type="key" title="Exemple Cobb-Douglas">
        <p className="mb-4"><Math>{"Q = 2K^{0.5}L^{0.5}"}</Math>, <Math>{"w = 16"}</Math>, <Math>{"r = 4"}</Math>, <Math>{"Q_0 = 100"}</Math></p>

        <p className="mb-2"><strong>1. TMST :</strong> <Math>{"TMST = \\frac{K}{L}"}</Math></p>
        
        <p className="mb-2"><strong>2. Condition d'optimalité :</strong></p>
        <p className="mb-2"><Math>{"\\frac{K}{L} = \\frac{w}{r} = \\frac{16}{4} = 4 \\Rightarrow K = 4L"}</Math></p>

        <p className="mb-2"><strong>3. Contrainte de production :</strong></p>
        <p className="mb-2"><Math>{"100 = 2(4L)^{0.5}L^{0.5} = 4L \\Rightarrow L^* = 25"}</Math></p>
        <p className="mb-2"><Math>{"K^* = 4 \\times 25 = 100"}</Math></p>

        <p className="mb-2"><strong>4. Coût minimal :</strong></p>
        <p><Math>{"C^* = 16 \\times 25 + 4 \\times 100 = 800"}</Math></p>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Confondre rendements d'échelle et marginaux</strong></li>
          <li><strong>Oublier la contrainte de production</strong> — Toujours vérifier <Math>{"F(K^*, L^*) = Q_0"}</Math></li>
          <li><strong>Inverser w et r</strong> — w = salaire (travail), r = coût du capital</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-4', label: '← Chapitre précédent', title: 'Demande de Marché' }}
        next={{ path: '/micro/chapitre-6', label: 'Chapitre suivant →', title: 'Concurrence Parfaite' }}
      />
    </main>
  );
}
