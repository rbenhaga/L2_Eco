import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';
import { CheckSquare } from 'lucide-react';

export function RevisionCh3() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Fiche 03"
        title="L'Équilibre AS-AD"
        description="Fiche de révision rapide du Chapitre 3"
      />

      <Section type="key" title="Origine des courbes">
        <Table headers={['Courbe', 'Dérivée de', 'Pente', 'Ce qu\'elle capture']}>
          <TableRow>
            <TableCell><strong>AD</strong></TableCell>
            <TableCell>IS-LM</TableCell>
            <TableCell>Négative ↘</TableCell>
            <TableCell>Effet de P sur Y via marché monétaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>AS</strong></TableCell>
            <TableCell>WS-PS</TableCell>
            <TableCell>Positive ↗</TableCell>
            <TableCell>Effet de Y sur P via marché du travail</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="formule" title="La courbe AD">
        <FormulaBox label="Demande Agrégée">
          {"Y = \\gamma \\left(G - cT + \\frac{M}{P}\\right)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Mécanisme (pourquoi AD est décroissante) :</strong></p>
        <FormulaBox label="Effet Keynes">
          {"P \\uparrow \\Rightarrow \\frac{M}{P} \\downarrow \\Rightarrow i \\uparrow \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}
        </FormulaBox>

        <Table headers={['Choc', 'Effet sur AD']}>
          <TableRow><TableCell>G↑ ou M↑</TableCell><TableCell>AD → droite</TableCell></TableRow>
          <TableRow><TableCell>T↑</TableCell><TableCell>AD → gauche</TableCell></TableRow>
        </Table>
      </Section>

      <Section type="formule" title="La courbe AS">
        <FormulaBox label="Offre Agrégée">
          {"P = P^e(1+\\mu)F\\left(1 - \\frac{Y}{L}, z\\right)"}
        </FormulaBox>

        <p className="mt-4 mb-2"><strong>Propriétés :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Passe par le point <Math>{"(Y_n, P^e)"}</Math></li>
          <li><Math>{"P^e \\uparrow"}</Math> → AS se déplace vers le <strong>haut</strong></li>
          <li><Math>{"\\mu \\uparrow"}</Math> ou <Math>{"z \\uparrow"}</Math> → AS vers la <strong>gauche</strong></li>
        </ul>
      </Section>

      <Section type="key" title="Court terme vs Moyen terme">
        <Table headers={['', 'Court terme', 'Moyen terme']}>
          <TableRow>
            <TableCell><strong>Y</strong></TableCell>
            <TableCell><Math>{"\\neq Y_n"}</Math> possible</TableCell>
            <TableCell><Math>{"= Y_n"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>P</strong></TableCell>
            <TableCell><Math>{"\\neq P^e"}</Math> possible</TableCell>
            <TableCell><Math>{"= P^e"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Anticipations</strong></TableCell>
            <TableCell>Peuvent être fausses</TableCell>
            <TableCell>Correctes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Politique éco.</strong></TableCell>
            <TableCell>Efficace sur Y</TableCell>
            <TableCell>Neutre sur Y</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="key" title="Dynamique d'ajustement">
        <Callout type="tip" title="Après un choc de demande positif (G↑)">
          1. <strong>CT</strong> : AD→droite → <Math>{"Y_1 > Y_n"}</Math>, <Math>{"P_1 > P_0"}</Math><br/>
          2. <Math>{"P_1 > P^e"}</Math> → révision des anticipations<br/>
          3. AS→haut → <Math>{"Y_2 < Y_1"}</Math>, <Math>{"P_2 > P_1"}</Math><br/>
          4. Répéter jusqu'à <Math>{"Y = Y_n"}</Math><br/>
          5. <strong>MT</strong> : <Math>{"Y_{MT} = Y_n"}</Math>, <Math>{"P_{MT} > P_0"}</Math>
        </Callout>
      </Section>

      <Section type="key" title="Identifier les chocs">
        <Table headers={['Choc', 'Courbe', 'Direction', 'Effet CT']}>
          <TableRow>
            <TableCell>G↑ ou M↑</TableCell>
            <TableCell>AD</TableCell>
            <TableCell>Droite</TableCell>
            <TableCell>Y↑, P↑</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>T↑</TableCell>
            <TableCell>AD</TableCell>
            <TableCell>Gauche</TableCell>
            <TableCell>Y↓, P↓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pᵉ↑</TableCell>
            <TableCell>AS</TableCell>
            <TableCell>Haut</TableCell>
            <TableCell>Y↓, P↑</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>μ↑ ou z↑</TableCell>
            <TableCell>AS</TableCell>
            <TableCell>Gauche</TableCell>
            <TableCell>Y↓, P↑ (stagflation)</TableCell>
          </TableRow>
        </Table>
      </Section>

      <Section type="warning" title="Cas particuliers">
        <p className="mb-2"><strong>Stagflation :</strong></p>
        <p className="mb-4">Choc d'offre négatif (ex: pétrole↑) → AS→gauche → P↑ ET Y↓ simultanément. Dilemme pour la politique économique.</p>

        <p className="mb-2"><strong>Trappe à liquidité (i = 0) :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Politique monétaire inefficace</li>
          <li>AD devient verticale</li>
          <li>Seule la politique budgétaire reste efficace</li>
          <li>Politiques non conventionnelles nécessaires (QE, Forward Guidance)</li>
        </ul>
      </Section>

      <Section type="warning" title="Pièges à éviter">
        <ul className="list-disc pl-6 space-y-1">
          <li>AD négative, AS positive (pas l'inverse !)</li>
          <li>AS dépend de <Math>{"P^e"}</Math></li>
          <li>Les politiques sont efficaces à CT mais neutres à MT</li>
          <li>Effets CT et MT peuvent être opposés</li>
        </ul>
      </Section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700">
          <CheckSquare className="w-4 h-4" /> Checklist Chapitre 3
        </span>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Je connais l'origine de AD (IS-LM) et AS (WS-PS)",
            "Je sais pourquoi AD est décroissante",
            "Je sais que AS passe par (Yₙ, Pᵉ)",
            "Je distingue effets CT et MT",
            "Je sais analyser un choc de demande",
            "Je sais expliquer la stagflation",
            "Je connais la trappe à liquidité",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-100/50 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-800">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <ChapterNav
        prev={{ path: '/revision-ch2', label: '← Fiche Ch.2', title: 'Marché du Travail' }}
        next={{ path: '/revision-ch4', label: 'Fiche Ch.4 →', title: 'Politique & Phillips' }}
      />
    </main>
  );
}
