import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';
import { CheckSquare } from 'lucide-react';

export function RevisionCh2() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Fiche 02"
        title="Le Marché du Travail"
        description="Fiche de révision rapide du Chapitre 2"
      />

      <Section type="key" title="Définitions fondamentales">
        <FormulaBox label="Population active">
          {"L = N + U \\quad (\\text{Employés} + \\text{Chômeurs})"}
        </FormulaBox>

        <FormulaBox label="Taux de chômage">
          {"u = \\frac{U}{L} = \\frac{L-N}{L} = 1 - \\frac{N}{L}"}
        </FormulaBox>

        <Callout type="insight" title="Définition BIT du chômage">
          3 conditions simultanées : Sans emploi + Disponible (15j) + Recherche active (1 mois)
        </Callout>
      </Section>

      <Section type="key" title="Types de chômage">
        <Table headers={['Type', 'Cause', 'Politique']}>
          <TableRow>
            <TableCell><strong>Frictionnel</strong></TableCell>
            <TableCell>Temps d'appariement</TableCell>
            <TableCell>Information (Pôle Emploi)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Structurel</strong></TableCell>
            <TableCell>Inadéquation, rigidités</TableCell>
            <TableCell>Formation, flexibilité</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Naturel</strong></TableCell>
            <TableCell>Frictionnel + Structurel</TableCell>
            <TableCell>Réformes structurelles</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Conjoncturel</strong></TableCell>
            <TableCell>Cycle économique</TableCell>
            <TableCell>Politiques de relance</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="Concepts complémentaires">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Taux d'activité</strong> : <Math>{"\\frac{L}{\\text{Pop. en âge de travailler}}"}</Math></li>
          <li><strong>Taux d'emploi</strong> : <Math>{"\\frac{N}{\\text{Pop. en âge de travailler}}"}</Math></li>
          <li><strong>Halo du chômage</strong> : Personnes voulant travailler mais hors critères BIT</li>
          <li><strong>Sous-emploi</strong> : Temps partiel subi + chômage technique</li>
          <li><strong>Marché dual</strong> : Primaire (stable, bien payé) vs Secondaire (précaire)</li>
        </ul>
      </Section>

      <Section type="formule" title="Modèle classique">
        <FormulaBox label="Condition d'optimalité (firme)">
          {"F'_L = \\frac{w}{P} \\quad \\text{(Productivité marginale = Salaire réel)}"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Offre de travail :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Effet substitution</strong> : w/P↑ → loisir plus cher → travail↑</li>
          <li><strong>Effet revenu</strong> : w/P↑ → plus riche → loisir↑ → travail↓</li>
          <li>Généralement : substitution &gt; revenu → offre croissante</li>
        </ul>

        <Callout type="warning" title="Résultat classique">
          Équilibre = Plein emploi. Chômage = volontaire uniquement.
        </Callout>
      </Section>

      <Section type="formule" title="Modèle WS-PS">
        <FormulaBox label="WS (Wage Setting)" highlight>
          {"\\frac{W}{P^e} = F(u, z) \\quad \\text{ou} \\quad \\frac{W}{P^e} = z(1 - \\alpha u)"}
        </FormulaBox>
        <p className="text-sm text-slate-700">u↑ → W↓ (moins de pouvoir de négociation) | z↑ → W↑ (allocations, syndicats)</p>

        <FormulaBox label="PS (Price Setting)" highlight>
          {"\\frac{W}{P} = \\frac{1}{1 + \\mu}"}
        </FormulaBox>
        <p className="text-sm text-slate-700">μ = taux de marge. PS est HORIZONTALE (ne dépend pas de u)</p>
      </Section>

      <Section type="key" title="Structures de marché et μ">
        <Table headers={['Structure', 'μ', 'W/P']}>
          <TableRow>
            <TableCell>Concurrence parfaite</TableCell>
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Concurrence monopolistique</TableCell>
            <TableCell>Faible</TableCell>
            <TableCell>Proche de 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Oligopole</TableCell>
            <TableCell>Moyen</TableCell>
            <TableCell>Intermédiaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monopole</TableCell>
            <TableCell>Élevé</TableCell>
            <TableCell>Faible</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="Effets sur le chômage naturel">
        <Table headers={['Hausse de...', 'Effet sur uₙ', 'Mécanisme']}>
          <TableRow>
            <TableCell>μ (marge)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>PS↓ → salaire réel↓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>z (allocations)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>WS↑ → salaires demandés↑</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Concurrence</TableCell>
            <TableCell>↓</TableCell>
            <TableCell>μ↓ → PS↑</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Productivité</TableCell>
            <TableCell>↓</TableCell>
            <TableCell>PS↑ (à μ constant)</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="Du chômage au produit naturel">
        <FormulaBox label="Emploi naturel">
          {"N_n = L(1 - u_n)"}
        </FormulaBox>
        <FormulaBox label="Produit naturel (si Y = N)">
          {"Y_n = N_n = L(1 - u_n)"}
        </FormulaBox>
      </Section>

      <Section type="key" title="Méthode de calcul WS-PS">
        <ol className="list-decimal pl-6 space-y-2">
          <li>Calculer le salaire réel PS : <Math>{"\\frac{W}{P} = \\frac{1}{1+\\mu}"}</Math></li>
          <li>Égaliser WS = PS (à l'équilibre <Math>{"P = P^e"}</Math>)</li>
          <li>Résoudre pour <Math>{"u_n"}</Math></li>
          <li>Calculer <Math>{"Y_n = L(1-u_n)"}</Math></li>
        </ol>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-1">
          <li>PS est HORIZONTALE (ne dépend pas de u)</li>
          <li>WS dépend de <Math>{"P^e"}</Math>, PS dépend de P</li>
          <li>À l'équilibre : <Math>{"P = P^e"}</Math></li>
          <li>Ne pas confondre WS et offre de travail classique</li>
        </ul>
      </Section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md bg-purple-50 text-purple-700">
          <CheckSquare className="w-4 h-4" /> Checklist Chapitre 2
        </span>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Je connais la définition BIT du chômage",
            "Je distingue les 4 types de chômage",
            "Je sais écrire WS et PS",
            "Je sais que PS est horizontale",
            "Je connais les effets de μ et z sur uₙ",
            "Je sais calculer Yₙ à partir de uₙ",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-100/50 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-800">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <ChapterNav
        prev={{ path: '/revision-ch1', label: '← Fiche Ch.1', title: 'Introduction & IS-LM' }}
        next={{ path: '/revision-ch3', label: 'Fiche Ch.3 →', title: 'AS-AD' }}
      />
    </main>
  );
}
