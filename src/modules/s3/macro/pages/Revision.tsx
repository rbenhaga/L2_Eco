import { Link } from 'react-router-dom';
import { Section, Callout, PageHeader, ChapterNav, Math, Table, TableRow, TableCell, Graph } from '../../../../components';
import { CheckSquare, Dumbbell, ClipboardList, BookOpen } from 'lucide-react';

export function Revision() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Synthèse"
        title="Fiche de Révision"
        description="Tout ce qu'il faut maîtriser pour le jour J."
      />

      <Section type="key" title="Formules essentielles">
        <Table headers={['Chapitre', 'Formule', 'Nom']}>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-info-subtle)', color: 'var(--color-info)' }}>IS-LM</span></TableCell>
            <TableCell><Math>{"k = \\frac{1}{1-c_1}"}</Math></TableCell>
            <TableCell>Multiplicateur keynésien</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-info-subtle)', color: 'var(--color-info)' }}>IS-LM</span></TableCell>
            <TableCell><Math>{"Y = C(Y-T) + I(i) + G"}</Math></TableCell>
            <TableCell>Équation IS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-info-subtle)', color: 'var(--color-info)' }}>IS-LM</span></TableCell>
            <TableCell><Math>{"\\frac{M}{P} = L(Y, i)"}</Math></TableCell>
            <TableCell>Équation LM</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>WS-PS</span></TableCell>
            <TableCell><Math>{"\\frac{W}{P^e} = F(u, z)"}</Math></TableCell>
            <TableCell>Wage Setting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>WS-PS</span></TableCell>
            <TableCell><Math>{"\\frac{W}{P} = \\frac{1}{1+\\mu}"}</Math></TableCell>
            <TableCell>Price Setting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-success-subtle)', color: 'var(--color-success)' }}>AS-AD</span></TableCell>
            <TableCell><Math>{"P = P^e(1+\\mu)F(1-Y/L, z)"}</Math></TableCell>
            <TableCell>Courbe AS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-warning-subtle)', color: 'var(--color-warning)' }}>Phillips</span></TableCell>
            <TableCell><Math>{"\\pi = \\pi^e - \\alpha(u - u_n)"}</Math></TableCell>
            <TableCell>Courbe de Phillips</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>Dette</span></TableCell>
            <TableCell><Math>{"\\Delta(B/Y) = (r-g)(B/Y) + \\frac{G-T}{Y}"}</Math></TableCell>
            <TableCell>Dynamique dette</TableCell>
          </TableRow>
        </Table>

        <p className="mt-4 mb-2"><strong>Formules emploi/chômage :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Taux de chômage : <Math>{"u = \\frac{U}{L} = \\frac{L - N}{L} = 1 - \\frac{N}{L}"}</Math></li>
          <li>où <Math>{"U"}</Math> = chômeurs, <Math>{"L"}</Math> = population active, <Math>{"N"}</Math> = employés</li>
          <li>Emploi naturel : <Math>{"N_n = L(1-u_n)"}</Math></li>
          <li>Produit naturel : <Math>{"Y_n = N_n = L(1-u_n)"}</Math> (si <Math>{"Y = N"}</Math>)</li>
          <li>Ratio de sacrifice : <Math>{"\\frac{1}{\\alpha}"}</Math></li>
        </ul>

        <p className="mt-4 mb-2"><strong>Relations population :</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Math>{"\\text{Pop. en âge de travailler} = L + \\text{Inactifs}"}</Math></li>
          <li><Math>{"L = N + U"}</Math> (Population active = Employés + Chômeurs)</li>
          <li>Taux d'activité : <Math>{"\\frac{L}{\\text{Pop. en âge de travailler}}"}</Math></li>
          <li>Taux d'emploi : <Math>{"\\frac{N}{\\text{Pop. en âge de travailler}}"}</Math></li>
        </ul>
      </Section>

      <Section type="intuition" title="Les 4 graphiques fondamentaux">
        <Table headers={['Graphique', 'Axes', 'Pentes', 'Équilibre']}>
          <TableRow>
            <TableCell><strong>IS-LM</strong></TableCell>
            <TableCell>(Y, i)</TableCell>
            <TableCell>IS ↘, LM ↗</TableCell>
            <TableCell><Math>{"(Y^*, i^*)"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>WS-PS</strong></TableCell>
            <TableCell>(u, W/P)</TableCell>
            <TableCell>WS ↘, PS —</TableCell>
            <TableCell><Math>{"u_n"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>AS-AD</strong></TableCell>
            <TableCell>(Y, P)</TableCell>
            <TableCell>AS ↗, AD ↘</TableCell>
            <TableCell><Math>{"(Y^*, P^*)"}</Math></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Phillips</strong></TableCell>
            <TableCell>(u, π)</TableCell>
            <TableCell>CT ↘, LT |</TableCell>
            <TableCell><Math>{"u_n"}</Math></TableCell>
          </TableRow>
        </Table>

        <Callout type="tip" title="Astuce mémorisation">
          IS et AD ont des pentes négatives (demande). LM et AS ont des pentes positives (offre). PS et Phillips LT sont horizontale/verticale.
        </Callout>
      </Section>

      <Section type="intuition" title="Patterns de raisonnement">
        <p className="mb-2"><strong>Pattern 1 — Effet d'un choc</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-6">
          <li>Identifier le modèle pertinent (IS-LM, WS-PS, AS-AD)</li>
          <li>Quelle courbe se déplace ? Dans quel sens ?</li>
          <li>Nouveau point d'équilibre</li>
          <li>Interpréter économiquement</li>
        </ol>

        <p className="mb-2"><strong>Pattern 2 — Court terme vs Moyen terme</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-6">
          <li>CT : <Math>{"P^e"}</Math> fixe, <Math>{"Y \\neq Y_n"}</Math> possible</li>
          <li>Ajustement : révision de <Math>{"P^e"}</Math> si <Math>{"P \\neq P^e"}</Math></li>
          <li>MT : <Math>{"P = P^e"}</Math>, retour à <Math>{"Y_n"}</Math></li>
        </ol>

        <p className="mb-2"><strong>Pattern 3 — Politique économique</strong></p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Identifier l'instrument (G, T, M)</li>
          <li>Effet sur IS, LM ou AD</li>
          <li>Effet CT : variations de Y et i (ou P)</li>
          <li>Effet MT : retour à <Math>{"Y_n"}</Math>, seul P change durablement</li>
        </ol>
      </Section>

      <Section type="key" title="Effets des paramètres">
        <Table headers={['Hausse de...', 'Effet sur uₙ', 'Mécanisme']}>
          <TableRow>
            <TableCell>μ (marge)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>PS ↓, moins d'emplois</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>z (allocations)</TableCell>
            <TableCell>↑</TableCell>
            <TableCell>WS ↑, salaires trop élevés</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Concurrence</TableCell>
            <TableCell>↓</TableCell>
            <TableCell>μ ↓, plus d'emplois</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Productivité</TableCell>
            <TableCell>↓</TableCell>
            <TableCell>PS ↑, plus d'emplois</TableCell>
          </TableRow>
        </Table>

        <Table headers={['Variable ↑', 'Effet sur Y', 'Effet sur i', 'Effet sur u (CT)']}>
          <TableRow><TableCell>G</TableCell><TableCell>↑</TableCell><TableCell>↑</TableCell><TableCell>↓</TableCell></TableRow>
          <TableRow><TableCell>T</TableCell><TableCell>↓</TableCell><TableCell>↓</TableCell><TableCell>↑</TableCell></TableRow>
          <TableRow><TableCell>M</TableCell><TableCell>↑</TableCell><TableCell>↓</TableCell><TableCell>↓</TableCell></TableRow>
        </Table>
      </Section>

      <Section type="warning" title="Les pièges les plus fréquents">
        <ul className="list-disc pl-6 space-y-2">
          <li>Inverser les pentes des courbes</li>
          <li>Oublier le multiplicateur (ΔY ≠ ΔG)</li>
          <li>Négliger l'effet d'éviction</li>
          <li>Confondre nominal et réel</li>
          <li>Penser que PS dépend du chômage (PS est horizontale !)</li>
          <li>Oublier le rôle des anticipations <Math>{"P^e"}</Math></li>
          <li>Croire que les politiques sont efficaces à MT</li>
          <li>Confondre dette (stock) et déficit (flux)</li>
          <li>Négliger le terme (r - g)</li>
          <li>Confondre anticipations nulles et adaptatives</li>
        </ul>
      </Section>

      <Section type="graphique" title="Graphiques récapitulatifs">
        <p className="mb-2"><strong>Modèle WS/PS :</strong></p>
        <Graph
          src="/macro/assets/5.png"
          alt="Équilibre WS-PS"
          figure={5}
          caption="WS décroissante (pouvoir de négociation), PS horizontale à 1/(1+μ). Intersection = uₙ"
        />

        <p className="mb-2 mt-6"><strong>Modèle AS/AD :</strong></p>
        <Graph
          src="/macro/assets/9.png"
          alt="Équilibre AS-AD"
          figure={9}
          caption="AD décroissante (via IS-LM), AS croissante (via WS-PS). Intersection = (Y*, P*)"
        />

        <p className="mb-2 mt-6"><strong>Dynamique CT → MT :</strong></p>
        <Graph
          src="/macro/assets/11.png"
          alt="Convergence vers moyen terme"
          figure={11}
          caption="Après un choc, AS se déplace progressivement jusqu'au retour à Yₙ"
        />

        <Callout type="tip" title="Ajustement après choc de demande positif">
          1. AD → droite : <Math>{"Y_1 > Y_n"}</Math>, <Math>{"P_1 > P_0"}</Math><br />
          2. <Math>{"P_1 > P^e"}</Math> → révision des anticipations<br />
          3. AS → haut : <Math>{"Y_2 < Y_1"}</Math>, <Math>{"P_2 > P_1"}</Math><br />
          4. Répéter jusqu'à <Math>{"Y = Y_n"}</Math>
        </Callout>
      </Section>

      <Section type="intuition" title="Vocabulaire Anglais / Français">
        <Table headers={['Anglais', 'Français']}>
          <TableRow><TableCell>Wage Setting (WS)</TableCell><TableCell>Fixation des salaires</TableCell></TableRow>
          <TableRow><TableCell>Price Setting (PS)</TableCell><TableCell>Fixation des prix</TableCell></TableRow>
          <TableRow><TableCell>Aggregate Supply (AS)</TableCell><TableCell>Offre agrégée</TableCell></TableRow>
          <TableRow><TableCell>Aggregate Demand (AD)</TableCell><TableCell>Demande agrégée</TableCell></TableRow>
          <TableRow><TableCell>Markup</TableCell><TableCell>Taux de marge</TableCell></TableRow>
          <TableRow><TableCell>Natural rate</TableCell><TableCell>Taux naturel</TableCell></TableRow>
          <TableRow><TableCell>Output gap</TableCell><TableCell>Écart de production</TableCell></TableRow>
          <TableRow><TableCell>Crowding out</TableCell><TableCell>Effet d'éviction</TableCell></TableRow>
          <TableRow><TableCell>Liquidity trap</TableCell><TableCell>Trappe à liquidité</TableCell></TableRow>
          <TableRow><TableCell>Quantitative easing</TableCell><TableCell>Assouplissement quantitatif</TableCell></TableRow>
          <TableRow><TableCell>Phillips curve</TableCell><TableCell>Courbe de Phillips</TableCell></TableRow>
          <TableRow><TableCell>Sacrifice ratio</TableCell><TableCell>Ratio de sacrifice</TableCell></TableRow>
          <TableRow><TableCell>Adaptive expectations</TableCell><TableCell>Anticipations adaptatives</TableCell></TableRow>
          <TableRow><TableCell>Wage-price spiral</TableCell><TableCell>Spirale prix-salaires</TableCell></TableRow>
        </Table>
      </Section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md" style={{ background: 'var(--color-success-subtle)', color: 'var(--color-success)' }}>
          <Dumbbell className="w-4 h-4" /> Ton profil
        </span>
        <h2 className="text-2xl font-semibold mb-5 tracking-tight">Avantage compétitif (ex-prépa)</h2>
        <div className="leading-relaxed text-lg" style={{ color: 'var(--color-text-primary)' }}>
          <p className="mb-2"><strong>Ce que tu maîtrises déjà :</strong></p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><strong>Systèmes d'équations</strong> — IS-LM = système 2×2, tu sais le résoudre instantanément</li>
            <li><strong>Séries géométriques</strong> — Le multiplicateur, c'est <Math>{"\\sum c_1^n"}</Math></li>
            <li><strong>Équations différentielles</strong> — La dynamique de la dette, tu connais</li>
            <li><strong>Approximations</strong> — DL pour (r-g) petit</li>
          </ul>

          <Callout type="tip" title="Stratégie">
            Aller plus vite sur les calculs pour avoir plus de temps sur l'intuition économique. Montrer la dérivation complète quand les autres mémorisent.
          </Callout>
        </div>
      </section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md" style={{ background: 'var(--color-info-subtle)', color: 'var(--color-info)' }}>
          <CheckSquare size={14} /> Checklist
        </span>
        <h2 className="text-2xl font-semibold mb-5 tracking-tight">Avant l'examen</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Je sais calculer le multiplicateur keynésien",
            "Je sais résoudre un système IS/LM",
            "Je sais trouver uₙ dans le modèle WS/PS",
            "Je sais calculer Yₙ à partir de uₙ",
            "Je connais les effets de μ, z sur le chômage",
            "Je sais analyser un choc dans AS/AD",
            "Je distingue effets CT et MT",
            "Je connais les instruments de la BCE",
            "Je sais expliquer l'effet d'éviction",
            "Je connais les politiques non conventionnelles",
            "Je sais utiliser la courbe de Phillips",
            "Je sais calculer le ratio de sacrifice",
            "Je comprends la spirale prix-salaires",
            "Je distingue anticipations nulles vs adaptatives",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)', background: 'var(--color-bg-raised)' }}>
              <input type="checkbox" className="w-4 h-4 rounded" style={{ borderColor: 'var(--color-border-default)' }} />
              <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md" style={{ background: 'var(--color-warning-subtle)', color: 'var(--color-warning)' }}>
          <ClipboardList className="w-4 h-4" /> Fiches par chapitre
        </span>
        <h2 className="text-2xl font-semibold mb-5 tracking-tight">Fiches de révision rapide</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { path: '/revision-ch1', num: 'Fiche 01', title: 'Introduction & IS-LM', desc: 'Horizons, multiplicateur, éviction', bg: 'var(--color-info-subtle)', border: 'var(--color-info)' },
            { path: '/revision-ch2', num: 'Fiche 02', title: 'Marché du Travail', desc: 'WS-PS, types de chômage, μ et z', bg: 'var(--color-accent-subtle)', border: 'var(--color-accent)' },
            { path: '/revision-ch3', num: 'Fiche 03', title: 'AS-AD', desc: 'CT vs MT, stagflation, trappe', bg: 'var(--color-success-subtle)', border: 'var(--color-success)' },
            { path: '/revision-ch4', num: 'Fiche 04', title: 'Politique & Phillips', desc: 'BCE, dette, anticipations, spirale', bg: 'var(--color-warning-subtle)', border: 'var(--color-warning)' },
          ].map((ch) => (
            <Link
              key={ch.path}
              to={ch.path}
              className="p-6 rounded-xl transition-all no-underline group"
              style={{ background: ch.bg, borderWidth: '1px', borderStyle: 'solid', borderColor: ch.border }}
            >
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>{ch.num}</p>
              <h3 className="font-semibold transition-colors" style={{ color: 'var(--color-text-primary)' }}>{ch.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{ch.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-4 px-3 py-1.5 rounded-md" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)' }}>
          <BookOpen className="w-4 h-4" /> Navigation
        </span>
        <h2 className="text-2xl font-semibold mb-5 tracking-tight">Accès rapide aux cours</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { path: '/macro/chapitre-1', num: '01', title: 'Introduction & IS-LM', desc: 'Cours complet' },
            { path: '/macro/chapitre-2', num: '02', title: 'Marché du Travail', desc: 'Cours complet' },
            { path: '/macro/chapitre-3', num: '03', title: 'AS-AD', desc: 'Cours complet' },
            { path: '/macro/chapitre-4', num: '04', title: 'Politiques & Phillips', desc: 'Cours complet' },
            { path: '/exercices', num: 'TD', title: 'Exercices', desc: 'Exercices corrigés type TD' },
            { path: '/qcm', num: 'QCM', title: 'QCM', desc: 'QCM interactifs type examen' },
          ].map((ch) => (
            <Link
              key={ch.path}
              to={ch.path}
              className="p-6 rounded-xl transition-all no-underline group"
              style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)', background: 'var(--color-bg-raised)' }}
            >
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>{ch.num}</p>
              <h3 className="font-semibold transition-colors" style={{ color: 'var(--color-text-primary)' }}>{ch.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{ch.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <ChapterNav
        prev={{ path: '/qcm', label: '← QCM', title: 'QCM et Annales' }}
        next={{ path: '/macro', label: 'Accueil →', title: 'Page d\'accueil' }}
      />
    </main>
  );
}
