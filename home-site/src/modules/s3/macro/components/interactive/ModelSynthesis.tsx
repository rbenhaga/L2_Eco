import { useState } from 'react';
import { ArrowRight, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Math as MathDisplay } from '../../../../../components/Math';

type Tab = 'links' | 'traps' | 'history';

export function ModelSynthesis() {
  const [activeTab, setActiveTab] = useState<Tab>('links');
  const [expandedTrap, setExpandedTrap] = useState<number | null>(null);

  const traps = [
    {
      title: 'Déplacement DE vs SUR la courbe',
      wrong: 'Si i↑, IS se déplace vers la gauche',
      correct: 'Si i↑, on se déplace le long de IS. IS ne bouge que si G, T ou confiance changent.',
      formula: 'IS : Y = f(i, \\underbrace{G, T}_{\\text{déplacent IS}})'
    },
    {
      title: 'Court terme vs Moyen terme',
      wrong: 'M↑ augmente Y de façon permanente',
      correct: 'À MT, Y revient à Yₙ. Seul P augmente. Neutralité de la monnaie.',
      formula: 'MT : Y = Y_n'
    },
    {
      title: 'Effet d\'éviction',
      wrong: 'G↑ augmente Y du montant G × multiplicateur',
      correct: 'G↑ fait monter i, ce qui réduit I. L\'effet net est plus faible.',
      formula: 'G\\uparrow \\Rightarrow i\\uparrow \\Rightarrow I\\downarrow'
    },
    {
      title: 'Phillips CT vs LTJ',
      wrong: 'On peut maintenir u < uₙ en acceptant plus d\'inflation',
      correct: 'Si u < uₙ maintenu, π accélère sans fin. Pas d\'arbitrage stable.',
      formula: '\\pi^e_{t+1} = \\pi_t'
    },
    {
      title: 'WS-PS et la demande',
      wrong: 'G↑ peut réduire le chômage naturel',
      correct: 'uₙ dépend uniquement de μ, z, α. G et M n\'affectent pas uₙ.',
      formula: 'u_n = f(\\mu, z)'
    },
  ];

  const historicalExamples = [
    { event: 'Crise 2008', year: '2008', model: 'IS-LM', desc: 'I↓↓ → IS gauche. Réponse : M↑↑ + G↑', color: 'var(--color-info)' },
    { event: 'Choc pétrolier', year: '1973', model: 'AS-AD', desc: 'Coûts↑ → AS↑, Yₙ↓. Stagflation.', color: 'var(--color-error)' },
    { event: 'Volcker', year: '1980', model: 'Phillips', desc: 'M↓↓ → u↑↑ pour casser πᵉ', color: 'var(--color-micro)' },
    { event: 'Réformes Hartz', year: '2005', model: 'WS-PS', desc: 'z↓ → WS↓ → uₙ↓', color: 'var(--color-success)' },
  ];

  return (
    <div className="bg-[var(--color-bg-raised)] rounded-2xl border border-[var(--color-border-default)] p-6 my-8 shadow-sm">
      {/* Tabs minimalistes */}
      <div className="flex gap-1 mb-8 border-b border-[var(--color-border-default)] pb-4">
        {[
          { id: 'links', label: 'Liens' },
          { id: 'traps', label: 'Pièges' },
          { id: 'history', label: 'Histoire' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-overlay)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Liens entre modèles */}
      {activeTab === 'links' && (
        <div className="space-y-10">
          {/* Schéma central minimaliste */}
          <div className="flex items-center justify-center gap-2 py-6">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl border border-[var(--color-border-default)] flex items-center justify-center mb-2 group-hover:border-[var(--color-border-strong)] transition-colors">
                <span className="text-[var(--color-text-secondary)] font-semibold text-sm">IS-LM</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">Prix fixe</p>
            </div>
            
            <div className="flex flex-col items-center px-2">
              <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              <span className="text-[9px] text-[var(--color-text-muted)] mt-1">varier P</span>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl border border-[var(--color-border-default)] flex items-center justify-center mb-2 group-hover:border-[var(--color-border-strong)] transition-colors">
                <span className="text-[var(--color-text-secondary)] font-semibold text-sm">AD</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">Demande</p>
            </div>

            <div className="w-8 flex justify-center">
              <span className="text-[var(--color-text-muted)] text-lg">+</span>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl border border-[var(--color-border-default)] flex items-center justify-center mb-2 group-hover:border-[var(--color-border-strong)] transition-colors">
                <span className="text-[var(--color-text-secondary)] font-semibold text-sm">WS-PS</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">Équilibre uₙ</p>
            </div>
            
            <div className="flex flex-col items-center px-2">
              <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              <span className="text-[9px] text-[var(--color-text-muted)] mt-1">varier Y</span>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl border border-[var(--color-border-default)] flex items-center justify-center mb-2 group-hover:border-[var(--color-border-strong)] transition-colors">
                <span className="text-[var(--color-text-secondary)] font-semibold text-sm">AS</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">Offre</p>
            </div>

            <div className="w-8 flex justify-center">
              <span className="text-[var(--color-text-muted)] text-lg">=</span>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-text-primary)] flex items-center justify-center mb-2">
                <span className="text-[var(--color-bg-raised)] font-semibold text-sm">Y, P</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">Équilibre</p>
            </div>
          </div>

          {/* Deux mécanismes clés */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Comment AD est décroissante</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                P↑ → M/P↓ → i↑ → I↓ → Y↓
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">Les prix élevés réduisent la demande</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Comment AS est croissante</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Y↑ → u↓ → W↑ → P↑
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">La production élevée fait monter les prix</p>
            </div>
          </div>

          {/* Timeline CT → MT → LT */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="text-center px-6 py-4 rounded-xl bg-[var(--color-bg-overlay)] border border-[var(--color-border-default)]">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Court terme</p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Y peut ≠ Yₙ</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
            <div className="text-center px-6 py-4 rounded-xl bg-[var(--color-bg-overlay)] border border-[var(--color-border-default)]">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Moyen terme</p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Y → Yₙ</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
            <div className="text-center px-6 py-4 rounded-xl bg-[var(--color-text-primary)]">
              <p className="text-xs font-medium text-[var(--color-bg-raised)] mb-1">Long terme</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">Y = Yₙ toujours</p>
            </div>
          </div>
        </div>
      )}

      {/* Pièges à éviter */}
      {activeTab === 'traps' && (
        <div className="space-y-3">
          {traps.map((trap, idx) => (
            <div 
              key={idx} 
              className="border border-[var(--color-border-default)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedTrap(expandedTrap === idx ? null : idx)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-[var(--color-bg-overlay)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--color-warning)]" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{trap.title}</span>
                </div>
                {expandedTrap === idx ? (
                  <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
                )}
              </button>
              
              {expandedTrap === idx && (
                <div className="px-4 pb-4 pt-2 border-t border-[var(--color-border-default)]">
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-[var(--color-error-subtle)]">
                      <p className="text-xs font-medium text-[var(--color-error)] mb-1">✗ Faux</p>
                      <p className="text-sm text-[var(--color-error)]">{trap.wrong}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--color-success-subtle)]">
                      <p className="text-xs font-medium text-[var(--color-success)] mb-1">✓ Vrai</p>
                      <p className="text-sm text-[var(--color-success)]">{trap.correct}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-overlay)] rounded-lg inline-block">
                    <MathDisplay>{trap.formula}</MathDisplay>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Exemples historiques */}
      {activeTab === 'history' && (
        <div className="grid md:grid-cols-2 gap-3">
          {historicalExamples.map((ex, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <span className="text-xs text-[var(--color-text-secondary)]">{ex.year}</span>
                </div>
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${ex.color}15`, color: ex.color }}
                >
                  {ex.model}
                </span>
              </div>
              <p className="font-medium text-[var(--color-text-primary)] mb-1">{ex.event}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{ex.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
