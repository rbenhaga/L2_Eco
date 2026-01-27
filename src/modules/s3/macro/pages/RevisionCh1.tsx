import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';
import { CheckSquare } from 'lucide-react';

export function RevisionCh1() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Fiche 01"
        title="Introduction & IS-LM"
        description="Fiche de révision rapide du Chapitre 1"
      />

      <Section type="key" title="Les 3 horizons temporels">
        <Table headers={['Horizon', 'Durée', 'Déterminant principal', 'Ajustement']}>
          <TableRow>
            <TableCell><strong>Court terme</strong></TableCell>
            <TableCell>Quelques trimestres</TableCell>
            <TableCell>Demande globale</TableCell>
            <TableCell>Par les quantités (prix rigides)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Moyen terme</strong></TableCell>
            <TableCell>1 à plusieurs années</TableCell>
            <TableCell>Offre + Demande</TableCell>
            <TableCell>Par les prix (ajustement progressif)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Long terme</strong></TableCell>
            <TableCell>Plusieurs décennies</TableCell>
            <TableCell>Innovation, capital</TableCell>
            <TableCell>Croissance structurelle</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="PIB nominal, réel et déflateur">
        <Table headers={['Concept', 'Définition']}>
          <TableRow>
            <TableCell><strong>PIB nominal</strong></TableCell>
            <TableCell>Valeur aux prix courants</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>PIB réel</strong></TableCell>
            <TableCell>Valeur aux prix constants (année de base)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Déflateur</strong></TableCell>
            <TableCell><Math>{"\\frac{\\text{PIB nominal}}{\\text{PIB réel}} \\times 100"}</Math></TableCell>
          </TableRow>
        </Table>
        <p className="mt-2 text-sm text-slate-700">Le déflateur mesure l'inflation. PIB réel = prix constants (pas courants !)</p>
      </Section>

      <Section type="key" title="Classiques vs Keynésiens">
        <Table headers={['', 'Classiques', 'Keynésiens']}>
          <TableRow>
            <TableCell>Chômage</TableCell>
            <TableCell>Volontaire</TableCell>
            <TableCell>Involontaire possible</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ajustement</TableCell>
            <TableCell>Par les prix</TableCell>
            <TableCell>Par les quantités</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Politique éco.</TableCell>
            <TableCell>Neutre</TableCell>
            <TableCell>Efficace à CT</TableCell>
          </TableRow>
        </Table>
        <p className="mt-2 text-sm text-slate-700">Synthèse moderne : Keynésiens à CT, Classiques à MT/LT</p>
      </Section>

      <Section type="formule" title="Formules IS-LM">
        <FormulaBox label="Équilibre marché des biens (IS)">
          {"Y = C(Y-T) + I(Y, i) + G"}
        </FormulaBox>

        <FormulaBox label="Équilibre marché monétaire (LM)">
          {"\\frac{M}{P} = L(Y, i)"}
        </FormulaBox>

        <FormulaBox label="Multiplicateur keynésien" highlight>
          {"k = \\frac{1}{1 - c_1}"}
        </FormulaBox>
        <p className="text-sm text-slate-700">où <Math>{"c_1"}</Math> = propension marginale à consommer</p>
      </Section>

      <Section type="key" title="Propriétés des courbes">
        <Table headers={['Courbe', 'Pente', 'Déplacement droite', 'Mécanisme']}>
          <TableRow>
            <TableCell><strong>IS</strong></TableCell>
            <TableCell>Négative ↘</TableCell>
            <TableCell>G↑ ou T↓</TableCell>
            <TableCell>i↑ → I↓ → Y↓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>LM</strong></TableCell>
            <TableCell>Positive ↗</TableCell>
            <TableCell>M↑</TableCell>
            <TableCell>Y↑ → L↑ → i↑</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="warning" title="L'effet d'éviction">
        <FormulaBox label="Mécanisme">
          {"G \\uparrow \\Rightarrow Y \\uparrow \\Rightarrow i \\uparrow \\Rightarrow I \\downarrow"}
        </FormulaBox>
        <p className="mt-2">La hausse de G fait monter i, ce qui réduit I. L'effet sur Y est atténué.</p>
        
        <Callout type="tip" title="Solution">
          Policy mix : G↑ + M↑ simultanément pour neutraliser l'éviction.
        </Callout>
      </Section>

      <Section type="key" title="Méthode de résolution IS-LM">
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Écrire IS</strong> : <Math>{"Y = C + I + G"}</Math>, résoudre pour Y(i)</li>
          <li><strong>Écrire LM</strong> : <Math>{"M/P = L(Y,i)"}</Math>, résoudre pour i(Y)</li>
          <li><strong>Substituer</strong> LM dans IS (ou résoudre le système)</li>
          <li><strong>Vérifier</strong> : <Math>{"C^* + I^* + G = Y^*"}</Math></li>
        </ol>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-1">
          <li>Multiplicateur = <Math>{"\\frac{1}{1-c}"}</Math> et NON <Math>{"\\frac{1}{c}"}</Math></li>
          <li>IS décroissante, LM croissante (pas l'inverse !)</li>
          <li>ΔY ≠ ΔG (ne pas oublier le multiplicateur)</li>
          <li>L'éviction réduit l'effet de G sur Y</li>
        </ul>
      </Section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700">
          <CheckSquare className="w-4 h-4" /> Checklist Chapitre 1
        </span>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Je connais les 3 horizons temporels",
            "Je sais calculer le multiplicateur",
            "Je sais écrire les équations IS et LM",
            "Je connais les pentes des courbes",
            "Je sais expliquer l'effet d'éviction",
            "Je sais résoudre un système IS-LM",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-100/50 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-800">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <ChapterNav
        prev={{ path: '/revision', label: '← Synthèse', title: 'Fiche générale' }}
        next={{ path: '/revision-ch2', label: 'Fiche Ch.2 →', title: 'Marché du Travail' }}
      />
    </main>
  );
}
