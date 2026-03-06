import { useState, useEffect } from 'react';
import { Math as MathDisplay } from '../../../../../components/Math';
import { RotateCcw, Info, Play, Lightbulb } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IntuitionPanel } from './IntuitionPanel';

type Scenario = 'none' | 'fiscal' | 'monetary' | 'supply_neg' | 'supply_pos';
type Mode = 'theorique' | 'numerique';

export function InteractiveASAD() {
  const [scenario, setScenario] = useState<Scenario>('none');
  const [phase, setPhase] = useState<0|1|2>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [mode, /* setMode */] = useState<Mode>('theorique');
  const [showIntuition, setShowIntuition] = useState(false);

  const W = 450, H = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  // Paramètres numériques
  const params = {
    Yn0: 1000,    // Production naturelle initiale
    P0: 100,      // Niveau des prix initial
    alpha: 0.5,   // Pente de AS
    beta: 1.2,    // Pente de AD (inverse)
  };

  const Ymax = mode === 'numerique' ? 1400 : 120;
  const Pmax = mode === 'numerique' ? 160 : 120;
  const toX = (Y: number) => margin.left + (Y / Ymax) * w;
  const toY = (P: number) => margin.top + h - (P / Pmax) * h;

  const maxPhase = (scenario === 'supply_neg' || scenario === 'supply_pos') ? 1 : 2;

  useEffect(() => {
    if (isPlaying && phase < maxPhase) {
      const t = setTimeout(() => setPhase(p => (p+1) as 0|1|2), 1500);
      return () => clearTimeout(t);
    } else if (phase >= maxPhase) setIsPlaying(false);
  }, [isPlaying, phase, maxPhase]);

  useEffect(() => { setPhase(0); setIsPlaying(false); }, [scenario]);

  // Calculs numériques
  const getNumericState = () => {
    if (scenario === 'none') return { adShift: 0, asShift: 0, YnShift: 0 };
    switch (scenario) {
      case 'fiscal':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
               phase === 1 ? { adShift: 150, asShift: 0, YnShift: 0 } :
                             { adShift: 150, asShift: 30, YnShift: 0 };
      case 'monetary':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
               phase === 1 ? { adShift: 120, asShift: 0, YnShift: 0 } :
                             { adShift: 120, asShift: 24, YnShift: 0 };
      case 'supply_neg':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
                             { adShift: 0, asShift: 25, YnShift: -80 };
      case 'supply_pos':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
                             { adShift: 0, asShift: -20, YnShift: 100 };
      default: return { adShift: 0, asShift: 0, YnShift: 0 };
    }
  };

  // Mode théorique
  const getTheoreticState = () => {
    if (scenario === 'none') return { adShift: 0, asShift: 0, YnShift: 0 };
    switch (scenario) {
      case 'fiscal':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
               phase === 1 ? { adShift: 20, asShift: 0, YnShift: 0 } :
                             { adShift: 20, asShift: 15, YnShift: 0 };
      case 'monetary':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
               phase === 1 ? { adShift: 18, asShift: 0, YnShift: 0 } :
                             { adShift: 18, asShift: 12, YnShift: 0 };
      case 'supply_neg':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
                             { adShift: 0, asShift: 20, YnShift: -12 };
      case 'supply_pos':
        return phase === 0 ? { adShift: 0, asShift: 0, YnShift: 0 } :
                             { adShift: 0, asShift: -15, YnShift: 12 };
      default: return { adShift: 0, asShift: 0, YnShift: 0 };
    }
  };

  const state = mode === 'numerique' ? getNumericState() : getTheoreticState();
  const { adShift, asShift, YnShift } = state;
  
  const Yn0 = mode === 'numerique' ? params.Yn0 : 60;
  const P0 = mode === 'numerique' ? params.P0 : 60;
  const Yn = Yn0 + YnShift;

  // Équations AD et AS
  const calcAD = (Y: number, s: number) => {
    if (mode === 'numerique') {
      // AD: P = P0 + adShift - beta*(Y - Yn0)
      return params.P0 + s * 0.2 - params.beta * (Y - params.Yn0) / 10;
    }
    return 120 - Y + s;
  };

  const calcAS = (Y: number, s: number, yn: number) => {
    if (mode === 'numerique') {
      // AS: P = P0 + asShift + alpha*(Y - Yn)
      return params.P0 + s + params.alpha * (Y - yn) / 10;
    }
    return P0 + s + 0.8 * (Y - yn);
  };

  const calcEq = (adS: number, asS: number, yn: number) => {
    if (mode === 'numerique') {
      // Résolution AD = AS
      const a = params.P0 + adS * 0.2 + params.beta * params.Yn0 / 10;
      const b = params.P0 + asS - params.alpha * yn / 10;
      const denom = params.beta / 10 + params.alpha / 10;
      const Yeq = (a - b) / denom;
      return { Y: Yeq, P: calcAD(Yeq, adS) };
    }
    const Yeq = (120 + adS - P0 - asS + 0.8 * yn) / 1.8;
    return { Y: Yeq, P: calcAD(Yeq, adS) };
  };

  const eq0 = calcEq(0, 0, Yn0);
  const eq = calcEq(adShift, asShift, Yn);

  const genAD = (s: number) => {
    const pts: string[] = [];
    for (let Y = 0; Y <= Ymax; Y += Ymax / 60) {
      const P = calcAD(Y, s);
      if (P >= 0 && P <= Pmax) pts.push(`${toX(Y)},${toY(P)}`);
    }
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  };

  const genAS = (s: number, yn: number) => {
    const pts: string[] = [];
    for (let Y = 0; Y <= Ymax; Y += Ymax / 60) {
      const P = calcAS(Y, s, yn);
      if (P >= 0 && P <= Pmax) pts.push(`${toX(Y)},${toY(P)}`);
    }
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  };

  const events = [
    { id: 'fiscal', label: '↑G (budgétaire)', color: 'var(--color-info)' },
    { id: 'monetary', label: '↑M (monétaire)', color: 'var(--color-success)' },
    { id: 'supply_neg', label: 'Choc offre -', color: 'var(--color-error)' },
    { id: 'supply_pos', label: 'Choc offre +', color: 'var(--color-stats)' },
  ] as const;

  const isADMoving = adShift !== 0;
  const isASMoving = asShift !== 0;

  const getExplanation = () => {
    const numericDetails = mode === 'numerique' ? {
      fiscal: phase === 1 
        ? `G↑ de 150 → AD se déplace. Y passe de ${eq0.Y.toFixed(0)} à ${eq.Y.toFixed(0)} (+${(eq.Y - eq0.Y).toFixed(0)}). P passe de ${eq0.P.toFixed(0)} à ${eq.P.toFixed(0)}.`
        : phase === 2 
        ? `MT : Y > Yₙ → spirale prix-salaires → AS monte. Y revient vers Yₙ = ${Yn.toFixed(0)}, P = ${eq.P.toFixed(0)}.`
        : '',
      monetary: phase === 1
        ? `M↑ de 120 → AD se déplace. Y passe de ${eq0.Y.toFixed(0)} à ${eq.Y.toFixed(0)}. P passe de ${eq0.P.toFixed(0)} à ${eq.P.toFixed(0)}.`
        : phase === 2
        ? `MT : Neutralité de la monnaie. Y revient à Yₙ = ${Yn.toFixed(0)}, seul P augmente à ${eq.P.toFixed(0)}.`
        : '',
      supply_neg: `Choc d'offre négatif : AS↑ de ${asShift} et Yₙ↓ de ${-YnShift}. Stagflation : Y = ${eq.Y.toFixed(0)} (↓), P = ${eq.P.toFixed(0)} (↑).`,
      supply_pos: `Choc d'offre positif : AS↓ de ${-asShift} et Yₙ↑ de ${YnShift}. Croissance non-inflationniste : Y = ${eq.Y.toFixed(0)} (↑), P = ${eq.P.toFixed(0)} (↓).`,
    } : null;

    switch (scenario) {
      case 'fiscal':
        return {
          title: 'Politique budgétaire expansionniste',
          phases: [
            { name: 't₀', desc: 'Équilibre initial : Y = Yₙ, P = Pᵉ (anticipations correctes)' },
            { name: 'CT', desc: 'AD dérive de IS-LM. Dans IS : Y = C + I + G. Si G↑, pour chaque P, le Y d\'équilibre IS-LM est plus grand → AD se déplace vers la droite.' },
            { name: 'MT', desc: 'Y > Yₙ signifie u < uₙ (WS-PS). Les salariés négocient W↑ → entreprises augmentent P → Pᵉ s\'ajuste → AS monte jusqu\'à Y = Yₙ.' },
          ],
          conclusion: phase === 0 ? 'Cliquez Play pour voir l\'effet' :
                      phase === 1 ? 'CT : Y↑ temporairement au-dessus de Yₙ' :
                                    'MT : Retour à Yₙ avec P plus élevé. Effet réel NUL à moyen terme.',
          numeric: numericDetails?.fiscal
        };
      case 'monetary':
        return {
          title: 'Politique monétaire expansionniste',
          phases: [
            { name: 't₀', desc: 'Équilibre initial : Y = Yₙ' },
            { name: 'CT', desc: 'AD dérive de IS-LM. Dans LM : M/P = L(Y,i). Si M↑, pour chaque P, le Y d\'équilibre IS-LM est plus grand → AD droite.' },
            { name: 'MT', desc: 'Même mécanisme : Y > Yₙ → spirale prix-salaires → AS monte jusqu\'à Y = Yₙ.' },
          ],
          conclusion: phase === 0 ? 'Cliquez Play pour voir l\'effet' :
                      phase === 1 ? 'CT : Y↑ temporairement' :
                                    'MT : NEUTRALITÉ DE LA MONNAIE → Y = Yₙ, seul P↑',
          numeric: numericDetails?.monetary
        };
      case 'supply_neg':
        return {
          title: 'Choc d\'offre négatif (ex: hausse pétrole)',
          phases: [
            { name: 't₀', desc: 'Équilibre initial' },
            { name: 'Choc', desc: 'AS : P = Pᵉ(1+μ)F(...). Si μ↑ (marges) ou coûts↑, pour chaque Y, P est plus élevé → AS monte. De plus, uₙ↑ (WS-PS) donc Yₙ↓.' },
          ],
          conclusion: phase === 0 ? 'Cliquez Play pour voir l\'effet' :
                                    'STAGFLATION : Y↓ et P↑ simultanément (le pire des deux mondes)',
          numeric: numericDetails?.supply_neg
        };
      case 'supply_pos':
        return {
          title: 'Choc d\'offre positif (ex: progrès technique)',
          phases: [
            { name: 't₀', desc: 'Équilibre initial' },
            { name: 'Choc', desc: 'AS : Si productivité A↑, coûts unitaires↓ → pour chaque Y, P est plus bas → AS descend. De plus, uₙ↓ donc Yₙ↑.' },
          ],
          conclusion: phase === 0 ? 'Cliquez Play pour voir l\'effet' :
                                    'Croissance non-inflationniste : Y↑ et P↓ (le meilleur des deux mondes)',
          numeric: numericDetails?.supply_pos
        };
      default: return null;
    }
  };

  const expl = getExplanation();

  // Intuition sur la forme des courbes
  const intuitionContent = {
    AD: {
      title: 'AD décroissante',
      steps: [
        { text: 'Quand les prix montent, la monnaie en circulation perd de sa valeur réelle', formula: 'P \\uparrow \\Rightarrow \\frac{M}{P} \\downarrow' },
        { text: 'Moins de monnaie réelle = taux d\'intérêt plus élevés (LM se déplace)' },
        { text: 'Les taux élevés découragent l\'investissement' },
        { text: 'Résultat : la demande globale et la production baissent', formula: 'Y \\downarrow' },
      ]
    },
    AS: {
      title: 'AS croissante (court terme)',
      steps: [
        { text: 'Quand la production augmente, les entreprises embauchent' },
        { text: 'Le chômage baisse, les salariés gagnent en pouvoir de négociation', formula: 'Y \\uparrow \\Rightarrow u \\downarrow' },
        { text: 'Ils obtiennent des hausses de salaires' },
        { text: 'Les entreprises répercutent ces coûts sur leurs prix', formula: 'W \\uparrow \\Rightarrow P \\uparrow' },
      ]
    }
  };

  // Positions des labels
  const adLabelY = mode === 'numerique' ? 400 + adShift : 30 + adShift;
  const adLabelP = calcAD(adLabelY, adShift);
  const asLabelY = mode === 'numerique' ? 1200 : 90;
  const asLabelP = calcAS(asLabelY, asShift, Yn);

  return (
    <div className="rounded-2xl p-6 my-8" style={{ background: 'var(--color-bg-raised)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Modèle AS-AD</h3>
        <div className="flex items-center gap-2">
          {/* Toggle Mode - Désactivé pour production
          <div className="flex bg-[var(--color-bg-overlay)] rounded-lg p-1">
            <button onClick={() => setMode('theorique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'theorique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-warning)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <BookOpen size={14} /> Théorique
            </button>
            <button onClick={() => setMode('numerique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'numerique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-success)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <Calculator size={14} /> Numérique
            </button>
          </div>
          */}
          <button onClick={() => setShowLegend(!showLegend)}
            className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
            style={showLegend ? { background: 'var(--color-warning-subtle)', color: 'var(--color-warning)' } : { background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
            <Info size={16} /> {showLegend ? 'Masquer' : 'Variables'}
          </button>
        </div>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Offre et demande agrégées : dynamique CT → MT
      </p>

      {showLegend && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'var(--color-warning-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-warning)' }}>
          <div className="grid grid-cols-4 gap-2" style={{ color: 'var(--color-warning)' }}>
            <span><strong>Y</strong> = Production</span>
            <span><strong>P</strong> = Niveau des prix</span>
            <span><strong>Yₙ</strong> = Production naturelle</span>
            <span><strong>AD</strong> = Demande agrégée</span>
            <span><strong>AS</strong> = Offre agrégée</span>
            <span><strong>CT</strong> = Court terme</span>
            <span><strong>MT</strong> = Moyen terme</span>
            <span><strong>Pᵉ</strong> = Prix anticipé</span>
          </div>
          {mode === 'numerique' && (
            <div className="mt-3 pt-3 grid grid-cols-3 gap-2" style={{ borderTop: '1px solid var(--color-warning)', color: 'var(--color-success)' }}>
              <span>Yₙ₀ = {params.Yn0}</span>
              <span>P₀ = {params.P0}</span>
              <span>α = {params.alpha}, β = {params.beta}</span>
            </div>
          )}
        </div>
      )}

      {/* Bouton Intuition */}
      <div className="mb-4">
        <button onClick={() => setShowIntuition(!showIntuition)}
          className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          style={showIntuition ? { background: 'var(--color-text-primary)', color: 'var(--color-bg-raised)' } : { background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
          <Lightbulb size={16} /> {showIntuition ? 'Masquer' : 'Intuition'}
        </button>
      </div>

      {showIntuition && (
        <IntuitionPanel
          sections={[
            { title: intuitionContent.AD.title, color: 'var(--color-info)', steps: intuitionContent.AD.steps },
            { title: intuitionContent.AS.title, color: 'var(--color-warning)', steps: intuitionContent.AS.steps },
          ]}
        />
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => { setScenario('none'); setPhase(0); }}
          className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
          style={scenario === 'none' ? { background: 'var(--color-text-primary)', color: 'var(--color-bg-raised)' } : { background: 'var(--color-bg-overlay)' }}>
          <RotateCcw size={14} /> Reset
        </button>
        {events.map(e => (
          <button key={e.id} onClick={() => setScenario(e.id)}
            style={{ backgroundColor: scenario === e.id ? e.color : `color-mix(in srgb, ${e.color} 14%, transparent)`, color: scenario === e.id ? 'var(--color-bg-raised)' : e.color }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium">
            {e.label}
          </button>
        ))}
      </div>

      {scenario !== 'none' && (
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setPhase(0); setIsPlaying(true); }}
            disabled={isPlaying}
            className="px-4 py-2 bg-[var(--color-warning)] text-[var(--color-bg-raised)] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[var(--color-warning)] disabled:opacity-50">
            <Play size={16} /> Play
          </button>
          <div className="flex gap-1">
            {[0, 1, 2].slice(0, maxPhase + 1).map(p => (
              <button key={p} onClick={() => { setPhase(p as 0|1|2); setIsPlaying(false); }}
                className="px-3 py-1.5 rounded text-sm font-medium"
                style={phase === p ? { background: 'var(--color-warning)', color: 'var(--color-bg-raised)' } : { background: 'var(--color-bg-overlay)' }}>
                {p === 0 ? 't₀' : p === 1 ? 'CT' : 'MT'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
            {/* Grille */}
            {(mode === 'numerique' ? [0, 350, 700, 1050, 1400] : [0, 30, 60, 90, 120]).map(v => (
              <line key={`gx${v}`} x1={toX(v)} y1={margin.top} x2={toX(v)} y2={margin.top + h} stroke="var(--color-border-default)" />
            ))}
            {(mode === 'numerique' ? [0, 40, 80, 120, 160] : [0, 30, 60, 90, 120]).map(v => (
              <line key={`gy${v}`} x1={margin.left} y1={toY(v)} x2={margin.left + w} y2={toY(v)} stroke="var(--color-border-default)" />
            ))}
            
            {/* Axes */}
            <line x1={margin.left} y1={margin.top + h} x2={margin.left + w} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <polygon points={`${margin.left + w},${margin.top + h} ${margin.left + w - 8},${margin.top + h - 4} ${margin.left + w - 8},${margin.top + h + 4}`} fill="var(--color-text-secondary)" />
            <polygon points={`${margin.left},${margin.top} ${margin.left - 4},${margin.top + 8} ${margin.left + 4},${margin.top + 8}`} fill="var(--color-text-secondary)" />
            <text x={margin.left + w + 10} y={margin.top + h + 5} className="text-sm font-semibold fill-[var(--color-text-secondary)]">Y</text>
            <text x={margin.left - 8} y={margin.top - 8} className="text-sm font-semibold fill-[var(--color-text-secondary)]">P</text>

            {/* Graduations en mode numérique */}
            {mode === 'numerique' && (
              <>
                {[0, 350, 700, 1050, 1400].map(v => (
                  <text key={`lx${v}`} x={toX(v)} y={margin.top + h + 15} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="middle">{v}</text>
                ))}
                {[40, 80, 120, 160].map(v => (
                  <text key={`ly${v}`} x={margin.left - 8} y={toY(v) + 4} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="end">{v}</text>
                ))}
              </>
            )}

            {/* Yₙ verticale */}
            <line x1={toX(Yn)} y1={margin.top} x2={toX(Yn)} y2={margin.top + h}
              stroke="var(--color-error)" strokeWidth="2" strokeDasharray="8,4" className="transition-all duration-500" />
            <text x={toX(Yn) + 5} y={margin.top + 15} className="text-xs font-bold fill-[var(--color-error)]">
              Yₙ{mode === 'numerique' ? `=${Yn.toFixed(0)}` : ''}
            </text>

            {/* Courbes initiales si elles bougent */}
            {scenario !== 'none' && phase > 0 && (
              <>
                {isADMoving && (
                  <>
                    <path d={genAD(0)} fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={toX(mode === 'numerique' ? 350 : 30)} y={toY(calcAD(mode === 'numerique' ? 350 : 30, 0)) - 8} className="text-xs fill-[var(--color-text-muted)]" textAnchor="middle">AD</text>
                  </>
                )}
                {isASMoving && (
                  <>
                    <path d={genAS(0, Yn0)} fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={toX(mode === 'numerique' ? 1150 : 90)} y={toY(calcAS(mode === 'numerique' ? 1150 : 90, 0, Yn0)) - 8} className="text-xs fill-[var(--color-text-muted)]" textAnchor="middle">AS</text>
                  </>
                )}
                <circle cx={toX(eq0.Y)} cy={toY(eq0.P)} r="7" fill="var(--color-bg-raised)" />
                <circle cx={toX(eq0.Y)} cy={toY(eq0.P)} r="5" fill="var(--color-text-muted)" />
                <text x={toX(eq0.Y)} y={toY(eq0.P) - 12} className="text-xs font-medium" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">E₀</text>
                <text x={toX(eq0.Y)} y={toY(eq0.P) - 12} className="text-xs font-medium fill-[var(--color-text-muted)]" textAnchor="middle">E₀</text>
              </>
            )}

            {/* AD (bleue) */}
            <path d={genAD(adShift)} fill="none" stroke="var(--color-info)" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(adLabelY)} y={toY(adLabelP) - 10} className="text-sm font-bold" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="4" paintOrder="stroke">
              AD{isADMoving ? "'" : ''}
            </text>
            <text x={toX(adLabelY)} y={toY(adLabelP) - 10} className="text-sm font-bold fill-[var(--color-info)]" textAnchor="middle">
              AD{isADMoving ? "'" : ''}
            </text>

            {/* AS (orange) */}
            <path d={genAS(asShift, Yn)} fill="none" stroke="var(--color-warning)" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(asLabelY)} y={toY(asLabelP) - 10} className="text-sm font-bold" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="4" paintOrder="stroke">
              AS{isASMoving ? "'" : ''}
            </text>
            <text x={toX(asLabelY)} y={toY(asLabelP) - 10} className="text-sm font-bold fill-[var(--color-warning)]" textAnchor="middle">
              AS{isASMoving ? "'" : ''}
            </text>

            {/* Équilibre */}
            <line x1={toX(eq.Y)} y1={toY(eq.P)} x2={toX(eq.Y)} y2={margin.top + h} stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            <line x1={margin.left} y1={toY(eq.P)} x2={toX(eq.Y)} y2={toY(eq.P)} stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            
            {mode === 'numerique' ? (
              <>
                <text x={toX(eq.Y)} y={margin.top + h + 28} className="text-xs font-bold fill-[var(--color-error)]" textAnchor="middle">Y*={eq.Y.toFixed(0)}</text>
                <text x={margin.left - 5} y={toY(eq.P) + 4} className="text-xs font-bold fill-[var(--color-error)]" textAnchor="end">P*={eq.P.toFixed(0)}</text>
              </>
            ) : (
              <>
                <text x={toX(eq.Y)} y={margin.top + h + 15} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="middle">Y*</text>
                <text x={margin.left - 8} y={toY(eq.P) + 4} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="end">P*</text>
              </>
            )}
            
            <circle cx={toX(eq.Y)} cy={toY(eq.P)} r="9" fill="var(--color-bg-raised)" className="transition-all duration-500" />
            <circle cx={toX(eq.Y)} cy={toY(eq.P)} r="7" fill="var(--color-error)" className="transition-all duration-500" />
            {(() => {
              const eqLabel = scenario === 'none' ? 'E*' : phase === 0 ? 'E₀' : phase === 1 ? 'E₁' : 'E₂';
              return <>
                <text x={toX(eq.Y) + 15} y={toY(eq.P) + 4} className="text-sm font-bold" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">{eqLabel}</text>
                <text x={toX(eq.Y) + 15} y={toY(eq.P) + 4} className="text-sm font-bold fill-[var(--color-error)]">{eqLabel}</text>
              </>;
            })()}
          </svg>

          {/* Encadré valeurs numériques */}
          {mode === 'numerique' && scenario !== 'none' && phase > 0 && (
            <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--color-success-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-success)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-success)' }}>📊 Calcul numérique</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Avant (E₀) :</p>
                  <p className="font-mono" style={{ color: 'var(--color-success)' }}>Y₀ = {eq0.Y.toFixed(0)}, P₀ = {eq0.P.toFixed(0)}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Après ({phase === 1 ? 'E₁' : 'E₂'}) :</p>
                  <p className="font-mono" style={{ color: 'var(--color-success)' }}>Y = {eq.Y.toFixed(0)}, P = {eq.P.toFixed(0)}</p>
                </div>
              </div>
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--color-success)' }}>
                <p className="text-sm" style={{ color: 'var(--color-success)' }}>
                  <strong>ΔY = {(eq.Y - eq0.Y).toFixed(0)}</strong> ({((eq.Y - eq0.Y) / eq0.Y * 100).toFixed(1)}%) | 
                  <strong> ΔP = {(eq.P - eq0.P).toFixed(0)}</strong> ({((eq.P - eq0.P) / eq0.P * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {expl ? (
            <div className="rounded-xl p-4" style={{ background: 'var(--color-warning-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-warning)' }}>
              <p className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>{expl.title}</p>
              <div className="space-y-3">
                {expl.phases.slice(0, phase + 1).map((p, i) => (
                  <div key={i} className={`flex items-start gap-2 ${i === phase ? '' : 'opacity-50'}`}>
                    <span className="px-2 py-0.5 rounded text-xs font-bold"
                      style={i === phase ? { background: 'var(--color-warning)', color: 'var(--color-bg-raised)' } : { background: 'var(--color-warning-subtle)', color: 'var(--color-warning)' }}>
                      {p.name}
                    </span>
                    <p className="text-sm" style={{ color: 'var(--color-warning)' }}>{p.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-3 text-base font-bold" style={{ borderTop: '1px solid var(--color-warning)', color: 'var(--color-text-primary)' }}>{expl.conclusion}</p>
              {mode === 'numerique' && expl.numeric && (
                <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--color-success-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-success)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-success)' }}>{expl.numeric}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl p-4" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
              <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>État initial</p>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>Clique sur un événement pour voir la dynamique CT → MT.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-info)] rounded" /><span><strong>AD</strong> : Demande agrégée</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-warning)] rounded" /><span><strong>AS</strong> : Offre agrégée</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-error-subtle)]0 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-error) 0, var(--color-error) 6px, transparent 6px, transparent 10px)' }} /><span><strong>Yₙ</strong> : Production naturelle</span></div>
              </div>
              {mode === 'numerique' && (
                <div className="mt-3 pt-3 text-sm" style={{ borderTop: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>
                  <p>Équilibre initial : Y₀={eq0.Y.toFixed(0)}, P₀={eq0.P.toFixed(0)}</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className="p-4 rounded-lg relative" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
              <Tooltip term="AD (Demande agrégée)" formula={"Y = Y(\\frac{M}{P}, G, T)"}>
                AD est la relation Y-P issue de IS-LM. Pourquoi est-elle <strong>décroissante</strong> ?
                <br/>• Si P↑ → M/P↓ (pouvoir d'achat de la monnaie↓)
                <br/>• → LM se déplace vers la gauche
                <br/>• → Y↓
                <br/>Donc quand P↑, Y↓ : AD est décroissante.
              </Tooltip>
              <MathDisplay>{"Y = Y(\\frac{M}{P}, G, T)"}</MathDisplay>
            </div>
            <div className="p-4 rounded-lg relative" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
              <Tooltip term="AS (Offre agrégée)" formula={"P = P^e(1+\\mu)F(1-\\frac{Y}{L}, z)"}>
                AS vient de WS-PS. Pourquoi est-elle <strong>croissante</strong> à CT ?
                <br/>• Les entreprises fixent P = (1+μ)×W
                <br/>• Les salaires W dépendent de Pᵉ et de u
                <br/>• Si Y↑ → u↓ → W↑ → P↑
                <br/>Donc quand Y↑, P↑ : AS est croissante.
              </Tooltip>
              <MathDisplay>{"P = P^e(1+\\mu)F(1-\\frac{Y}{L}, z)"}</MathDisplay>
            </div>
            <div className="p-4 rounded-lg relative" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
              <Tooltip term="Équilibre MT" formula={"Y = Y_n, \\quad P = P^e"}>
                À <strong>moyen terme</strong>, les anticipations s'ajustent : Pᵉ = P.
                <br/>Cela implique que Y = Yₙ (production naturelle).
                <br/>Conséquence majeure : les politiques de demande (G↑, M↑) n'ont <strong>pas d'effet réel</strong> à MT.
                <br/>Elles ne font qu'augmenter P (inflation).
              </Tooltip>
              <MathDisplay>{"Y = Y_n, \\quad P = P^e"}</MathDisplay>
            </div>
            <div className="p-4 rounded-lg relative" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
              <Tooltip term="Spirale prix-salaires">
                Mécanisme d'ajustement vers le moyen terme :
                <br/>1. Production au-dessus du potentiel → chômage bas
                <br/>2. Salariés en position de force → hausse des salaires
                <br/>3. Entreprises répercutent sur les prix
                <br/>4. Anticipations d'inflation s'ajustent à la hausse
                <br/>5. La courbe AS monte progressivement
                <br/>6. Retour à la production naturelle avec prix plus élevés
              </Tooltip>
              <div className="space-y-1 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                <p>Si <strong>Y &gt; Yₙ</strong> (production au-dessus du potentiel) :</p>
                <p className="pl-3">→ Chômage bas → Salaires↑ → Prix↑ → Pᵉ↑ → AS↑ → Retour à Yₙ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

