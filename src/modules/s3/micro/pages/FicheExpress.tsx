import { useState } from 'react';
import { Zap, Target, AlertTriangle, CheckCircle, Clock, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Math as MathDisplay } from '../../../../components';

function M({ children }: { children: string }) {
  return <MathDisplay>{children}</MathDisplay>;
}

function Formula({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-3 p-3 rounded-lg overflow-x-auto" style={{ background: 'var(--color-info-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-info)' }}>
      {label && <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-info)' }}>{label}</p>}
      <div className="text-center">{children}</div>
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  colorStyle: React.CSSProperties;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, colorStyle, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left"
        style={{ ...colorStyle, borderWidth: '1px', borderStyle: 'solid' }}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        {icon}
        <span className="font-semibold flex-1">{title}</span>
      </button>
      {open && (
        <div className="mt-2 p-4 rounded-xl" style={{ background: 'var(--color-bg-raised)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function QuestionCours({ num, question, answer, trap }: { num: number; question: string; answer: string; trap?: string }) {
  return (
    <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--color-bg-overlay)', borderLeft: '4px solid var(--color-success)' }}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-7 h-7 text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-success)' }}>
          {num}
        </span>
        <div className="flex-1">
          <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{question}</p>
          <p className="font-semibold" style={{ color: 'var(--color-success)' }}>✓ {answer}</p>
          {trap && (
            <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--color-error)' }}>
              <AlertTriangle size={14} /> Piège : {trap}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FicheExpress() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm mb-3 font-medium" style={{ color: 'var(--color-error)' }}>
          <Zap className="w-4 h-4" />
          <span>RÉVISION EXPRESS • 30 MIN</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Fiche Partiel CM</h1>
        <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Basée sur les examens 2020, 2022, 2025. Uniquement ce qui tombe VRAIMENT au partiel.
        </p>
      </div>

      {/* Timer suggestion */}
      <div className="rounded-xl p-4 mb-8 flex items-center gap-3" style={{ background: 'var(--color-warning-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-warning)' }}>
        <Clock className="w-5 h-5 shrink-0" style={{ color: 'var(--color-warning)' }} />
        <div>
          <p className="font-medium" style={{ color: 'var(--color-warning)' }}>Temps recommandé : 30 min</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>15 min questions de cours + 15 min méthodes exercices</p>
        </div>
      </div>

      {/* Questions de cours */}
      <Section
        title="Les 6 Questions de Cours (6 pts)"
        icon={<BookOpen className="w-5 h-5" />}
        colorStyle={{ background: 'var(--color-success-subtle)', borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
        defaultOpen={true}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Ces questions reviennent CHAQUE ANNÉE. Apprends les réponses par cœur.</p>

        <QuestionCours
          num={1}
          question="Quand une firme ferme-t-elle à court terme ?"
          answer="Quand P < CVM (coût variable moyen minimum)"
          trap="Ce n'est PAS P < CM ! CM c'est pour le long terme."
        />

        <QuestionCours
          num={2}
          question="Qu'est-ce qu'un duopole de Cournot ?"
          answer="Les firmes choisissent leurs QUANTITÉS, simultanément et indépendamment"
          trap="Bertrand = prix, Stackelberg = séquentiel, Cartel = coopération"
        />

        <QuestionCours
          num={3}
          question="Effet d'une hausse de salaire sur l'offre de travail ?"
          answer="AMBIGU : ES pousse à travailler plus, ER pousse à travailler moins"
          trap="Ne jamais dire 'le travail augmente forcément'"
        />

        <QuestionCours
          num={4}
          question="Pourquoi le monopole est-il inefficace ?"
          answer="Il produit MOINS que l'optimum social et crée une PERTE SÈCHE"
        />

        <QuestionCours
          num={5}
          question="Qu'est-ce que le TMS ?"
          answer="Quantité de bien 2 qu'on sacrifie pour 1 unité de bien 1 (= Um₁/Um₂)"
        />

        <QuestionCours
          num={6}
          question="Courbe d'offre de long terme ?"
          answer="Partie croissante du Cm au-dessus du CM minimum"
          trap="À CT c'est au-dessus du CVM, pas du CM"
        />

        <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--color-bg-overlay)' }}>
          <p className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>📊 Tableau des seuils (à connaître !)</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                <th className="text-left py-2">Horizon</th>
                <th className="text-left py-2">Seuil</th>
                <th className="text-left py-2">Condition fermeture</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                <td className="py-2 font-medium">Court terme</td>
                <td className="py-2">min CVM</td>
                <td className="py-2">P {'<'} CVM</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Long terme</td>
                <td className="py-2">min CM</td>
                <td className="py-2">P {'<'} CM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Exercice Travail-Loisir */}
      <Section
        title="Exercice Type : Travail-Loisir (7 pts)"
        icon={<Target className="w-5 h-5" />}
        colorStyle={{ background: 'var(--color-info-subtle)', borderColor: 'var(--color-info)', color: 'var(--color-info)' }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Fonction classique : <M>{"U(C, L) = C + 2\\sqrt{L}"}</M></p>

        <div className="space-y-4">
          <div className="p-3 rounded-lg" style={{ background: 'var(--color-info-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-info)' }}>Étape 1 : Utilité marginale du loisir</p>
            <Formula><M>{"Um_L = \\frac{\\partial U}{\\partial L} = \\frac{1}{\\sqrt{L}}"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-info-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-info)' }}>Étape 2 : TMS</p>
            <Formula><M>{"TMS = \\frac{Um_L}{Um_C} = \\frac{1/\\sqrt{L}}{1} = \\frac{1}{\\sqrt{L}}"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-info-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-info)' }}>Étape 3 : Condition d'équilibre</p>
            <Formula><M>{"TMS = w \\quad \\Rightarrow \\quad \\frac{1}{\\sqrt{L}} = w \\quad \\Rightarrow \\quad L^* = \\frac{1}{w^2}"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-warning-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-warning)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-warning)' }}>⚠️ Question piège : "Le travail augmente-t-il si w augmente ?"</p>
            <p style={{ color: 'var(--color-text-primary)' }}>Réponse : <strong>AMBIGU</strong> (ES et ER de sens opposés)</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Mais si on peut calculer : L = 1/w² → si w↑, L↓ → donc travail↑</p>
          </div>
        </div>
      </Section>

      {/* Exercice Monopole */}
      <Section
        title="Exercice Type : Monopole (7 pts)"
        icon={<Target className="w-5 h-5" />}
        colorStyle={{ background: 'var(--color-accent-subtle)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Données classiques : <M>{"P = a - bQ"}</M>, <M>{"CT = cQ^2 + d"}</M></p>

        <div className="space-y-4">
          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 1 : Recette marginale (PENTE DOUBLE !)</p>
            <Formula><M>{"RT = P \\times Q = (a - bQ)Q = aQ - bQ^2"}</M></Formula>
            <Formula label="⚠️ Formule clé"><M>{"Rm = a - 2bQ"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 2 : Coût marginal</p>
            <Formula><M>{"Cm = \\frac{dCT}{dQ}"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 3 : Quantité monopole</p>
            <Formula label="Condition d'équilibre"><M>{"Rm = Cm \\quad \\Rightarrow \\quad \\text{résoudre pour } Q^*"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 4 : Prix monopole</p>
            <Formula><M>{"P^* = a - bQ^* \\quad \\text{(remplacer dans la demande)}"}</M></Formula>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 5 : Surplus consommateur</p>
            <Formula label="Triangle sous la demande"><M>{"SC = \\frac{1}{2} \\times (P_{max} - P^*) \\times Q^*"}</M></Formula>
            <p className="text-sm" style={{ color: 'var(--color-accent)' }}>où P<sub>max</sub> = a (prix quand Q = 0)</p>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent-subtle)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>Étape 6 : Optimum social (CPP)</p>
            <Formula><M>{"P = Cm \\quad \\Rightarrow \\quad a - bQ = Cm \\quad \\Rightarrow \\quad Q_{social}"}</M></Formula>
          </div>
        </div>

        {/* Exemple concret */}
        <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
          <p className="font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>📝 Exemple Exam 2025</p>
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}><M>{"P = 120 - 3Q"}</M>, <M>{"CT = Q^2 + 20"}</M></p>
          <div className="space-y-2 text-sm">
            <p><strong>Rm</strong> = 120 - 6Q</p>
            <p><strong>Cm</strong> = 2Q</p>
            <p><strong>Rm = Cm</strong> → 120 - 6Q = 2Q → <strong>Q* = 15</strong></p>
            <p><strong>P*</strong> = 120 - 45 = <strong>75</strong></p>
            <p><strong>SC</strong> = ½ × (120 - 75) × 15 = <strong>337.5</strong></p>
            <p><strong>Optimum</strong> : 120 - 3Q = 2Q → Q = 24, P = 48</p>
          </div>
        </div>
      </Section>

      {/* Formules essentielles */}
      <Section
        title="Formules Essentielles"
        icon={<Zap className="w-5 h-5" />}
        colorStyle={{ background: 'var(--color-error-subtle)', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-error-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-error)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-error)' }}>Cobb-Douglas (α + β = 1)</p>
            <Formula><M>{"x_1^* = \\frac{\\alpha R}{p_1}"}</M></Formula>
            <Formula><M>{"x_2^* = \\frac{\\beta R}{p_2}"}</M></Formula>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'var(--color-error-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-error)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-error)' }}>Surplus (triangle)</p>
            <Formula><M>{"SC = \\frac{1}{2} \\times base \\times hauteur"}</M></Formula>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'var(--color-error-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-error)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-error)' }}>Élasticité</p>
            <Formula><M>{"\\varepsilon = \\frac{\\Delta Q / Q}{\\Delta P / P}"}</M></Formula>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'var(--color-error-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-error)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--color-error)' }}>Indice de Lerner</p>
            <Formula><M>{"L = \\frac{P - Cm}{P} = \\frac{1}{|\\varepsilon|}"}</M></Formula>
          </div>
        </div>
      </Section>

      {/* Pièges à éviter */}
      <Section
        title="⚠️ Pièges Classiques"
        icon={<AlertTriangle className="w-5 h-5" />}
        colorStyle={{ background: 'var(--color-error-subtle)', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
        defaultOpen={false}
      >
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>1</span>
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Offre LT ≠ Offre CT</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>CT : Cm au-dessus de CVM | LT : Cm au-dessus de CM</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>2</span>
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Rm ≠ P en monopole</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En CPP : Rm = P | En monopole : Rm {'<'} P (pente double)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>3</span>
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Cournot = quantités, Bertrand = prix</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Ne pas confondre !</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>4</span>
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>ES et ER opposés pour le travail</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Ne jamais dire "le travail augmente forcément"</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}>5</span>
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Quasi-linéaire : demande indépendante du revenu</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>U = x₁ + f(x₂) → x₂* ne dépend pas de R</p>
            </div>
          </li>
        </ol>
      </Section>

      {/* Checklist */}
      <div className="mt-8 p-6 rounded-xl" style={{ background: 'var(--color-success-subtle)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-success)' }}>
        <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-success)' }}>
          <CheckCircle className="w-5 h-5" /> Checklist avant l'exam
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { id: 'rm', label: 'Je sais calculer Rm (pente × 2)' },
            { id: 'seuils', label: 'Je connais CVM vs CM pour les seuils' },
            { id: 'cournot', label: 'Cournot = quantités simultanées' },
            { id: 'travail', label: 'ES et ER opposés pour le travail' },
            { id: 'surplus', label: 'Surplus = ½ × base × hauteur' },
            { id: 'cobb', label: 'Formules Cobb-Douglas par cœur' },
          ].map(item => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist[item.id] || false}
                onChange={() => toggleCheck(item.id)}
                className="rounded"
                style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
              />
              <span className={`text-sm ${checklist[item.id] ? 'line-through' : ''}`} style={{ color: 'var(--color-success)' }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Résumé ultra-condensé */}
      <div className="mt-8 p-6 rounded-xl" style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg-raised)' }}>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: 'var(--color-warning)' }} /> Résumé Ultra-Condensé
        </h3>
        <div className="font-mono text-sm space-y-2" style={{ color: 'var(--color-text-muted)' }}>
          <p><span style={{ color: 'var(--color-success)' }}>SEUILS:</span> CT → P {'<'} CVM ferme | LT → P {'<'} CM sort</p>
          <p><span style={{ color: 'var(--color-info)' }}>COURNOT:</span> quantités, simultané, indépendant</p>
          <p><span style={{ color: 'var(--color-accent)' }}>TRAVAIL:</span> ES↑ vs ER↓ → AMBIGU</p>
          <p><span style={{ color: 'var(--color-error)' }}>MONOPOLE:</span> Rm = Cm (pas P = Cm !)</p>
          <p><span style={{ color: 'var(--color-warning)' }}>DEMANDE:</span> P = a - bQ → Rm = a - 2bQ</p>
          <p><span style={{ color: 'var(--color-info)' }}>SURPLUS:</span> SC = ½(Pmax - P*)Q*</p>
          <p><span style={{ color: 'var(--color-error)' }}>COBB-DOUGLAS:</span> x₁* = αR/p₁</p>
        </div>
      </div>

      <p className="text-center mt-8" style={{ color: 'var(--color-text-secondary)' }}>Bonne chance ! 🍀</p>
    </main>
  );
}
