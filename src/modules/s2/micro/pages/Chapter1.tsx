import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Chapter1() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Chapitre 01"
        title="Arbitrage Travail-Loisir"
        description="Offre de travail, effet substitution et effet revenu, courbe backward-bending."
      />

      <Section type="key" title="L'essentiel en 3 lignes">
        <p>Le consommateur arbitre entre <strong>temps de travail</strong> (qui génère du revenu) et <strong>temps de loisir</strong> (qui génère de l'utilité directe). Le salaire <Math>w</Math> représente à la fois la rémunération du travail ET le coût d'opportunité du loisir. L'équilibre : <Math>{"\\frac{Um_\\ell}{Um_C} = \\frac{w}{p}"}</Math>. Particularité : l'offre de travail peut être <strong>backward-bending</strong>.</p>
      </Section>

      <Section type="intuition" title="Le modèle de base">
        <p className="mb-4">Chaque individu dispose d'un temps total <Math>T</Math> (24h par jour). Il doit choisir comment répartir ce temps entre :</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Travail</strong> <Math>L</Math> : pénible mais génère un revenu salarial <Math>wL</Math></li>
          <li><strong>Loisir</strong> <Math>{"\\ell"}</Math> : agréable et source directe d'utilité</li>
        </ul>

        <Callout type="insight" title="Coût d'opportunité">
          Le salaire <Math>w</Math> a deux interprétations : (1) rémunération du travail, (2) coût d'opportunité du loisir. En choisissant 1h de loisir, je renonce à <Math>w</Math> euros de revenu.
        </Callout>
      </Section>

      <Section type="formule" title="La contrainte budgétaire temporelle">
        <p className="mb-4">Puisque <Math>{"L = T - \\ell"}</Math>, le revenu salarial s'écrit <Math>{"R = w(T - \\ell)"}</Math>.</p>

        <FormulaBox label="Contrainte budgétaire temporelle" highlight>
          {"pC = w(T - \\ell) + m"}
        </FormulaBox>

        <p className="mt-4 mb-2">En isolant <Math>C</Math> :</p>
        <FormulaBox label="Droite de budget">
          {"C = \\frac{wT + m}{p} - \\frac{w}{p}\\ell"}
        </FormulaBox>

        <ul className="list-disc pl-6 space-y-1 mt-4">
          <li><strong>Ordonnée à l'origine</strong> : <Math>{"\\frac{wT + m}{p}"}</Math> (revenu max si <Math>{"\\ell = 0"}</Math>)</li>
          <li><strong>Abscisse à l'origine</strong> : <Math>T</Math> (si tout le temps est en loisir)</li>
          <li><strong>Pente</strong> : <Math>{"-w/p"}</Math> (coût d'opportunité du loisir)</li>
        </ul>
      </Section>

      <Section type="formule" title="L'équilibre individuel">
        <p className="mb-4">Le consommateur maximise <Math>{"U(C, \\ell)"}</Math> sous contrainte budgétaire.</p>

        <FormulaBox label="Condition d'équilibre" highlight>
          {"TMS_{\\ell, C} = \\frac{Um_\\ell}{Um_C} = \\frac{w}{p}"}
        </FormulaBox>

        <Callout type="insight" title="Interprétation">
          Le taux auquel le consommateur accepte de substituer du loisir à de la consommation égale le taux du marché (salaire réel <Math>{"w/p"}</Math>).
        </Callout>
      </Section>

      <Section type="intuition" title="Effet d'une hausse du salaire">
        <p className="mb-4">Quand le salaire <Math>w</Math> augmente, <strong>deux effets opposés</strong> :</p>

        <Table headers={['Effet', 'Mécanisme', 'Impact sur L']}>
          <TableRow>
            <TableCell><strong>Substitution</strong></TableCell>
            <TableCell>Loisir plus cher → substituer vers le travail</TableCell>
            <TableCell><Math>{"L^s \\uparrow"}</Math> (+)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Revenu</strong></TableCell>
            <TableCell>Plus riche → plus de loisir (si bien normal)</TableCell>
            <TableCell><Math>{"L^s \\downarrow"}</Math> (−)</TableCell>
          </TableRow>
        </Table>

        <FormulaBox label="Effet total">
          {"\\frac{dL^s}{dw} = \\underbrace{\\text{Effet substitution}}_{(+)} + \\underbrace{\\text{Effet revenu}}_{(-)}"}
        </FormulaBox>
      </Section>

      <Section type="intuition" title="Courbe d'offre Backward-Bending">
        <Callout type="insight" title="Phénomène contre-intuitif">
          <strong>Salaires faibles</strong> : effet substitution domine → offre croissante<br/>
          <strong>Salaires élevés</strong> : effet revenu domine → offre décroissante<br/><br/>
          Résultat : la courbe d'offre de travail peut être en forme de "C" inversé.
        </Callout>

        <p className="mt-4">Au-delà d'un certain salaire, les travailleurs préfèrent réduire leurs heures pour profiter de plus de loisir (ils sont "assez riches").</p>
      </Section>

      <Section type="formule" title="Cas Cobb-Douglas">
        <p className="mb-4">Pour <Math>{"U(C, \\ell) = C^\\alpha \\ell^\\beta"}</Math> :</p>

        <FormulaBox label="Demandes optimales" highlight>
          {"pC^* = \\frac{\\alpha}{\\alpha + \\beta}(wT + m) \\quad \\text{et} \\quad w\\ell^* = \\frac{\\beta}{\\alpha + \\beta}(wT + m)"}
        </FormulaBox>

        <Callout type="warning" title="Propriété importante">
          Avec Cobb-Douglas, <strong>l'offre de travail est insensible au salaire</strong> ! La part du temps en loisir est constante : <Math>{"\\ell^*/T = \\beta/(\\alpha+\\beta)"}</Math>. C'est un cas particulier où effet substitution = effet revenu.
        </Callout>
      </Section>

      <Section type="formule" title="Cas quasi-linéaire">
        <p className="mb-4">Pour <Math>{"U(C, \\ell) = C + \\alpha \\ln(\\ell)"}</Math> :</p>

        <FormulaBox label="Loisir optimal">
          {"\\ell^* = \\frac{\\alpha p}{w}"}
        </FormulaBox>

        <p className="mt-4">Le loisir optimal <strong>ne dépend pas du revenu</strong> <Math>m</Math> (pas d'effet revenu). Seul l'effet substitution opère → l'offre de travail est <strong>toujours croissante</strong> avec le salaire.</p>
      </Section>

      <Section type="warning" title="Erreurs classiques">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Oublier que le loisir a un coût</strong> — Le coût d'opportunité est <Math>w</Math></li>
          <li><strong>Généraliser Cobb-Douglas</strong> — L'insensibilité au salaire est un cas particulier</li>
          <li><strong>Confondre les effets</strong> — Substitution toujours +, Revenu − si loisir normal</li>
        </ul>
      </Section>

      <ChapterNav
        prev={{ path: '/micro/chapitre-0', label: '← Chapitre précédent', title: 'Théorie du Consommateur' }}
        next={{ path: '/micro/chapitre-2', label: 'Chapitre suivant →', title: 'Choix Intertemporels' }}
      />
    </main>
  );
}
