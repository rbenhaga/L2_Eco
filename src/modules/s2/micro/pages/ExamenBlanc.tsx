import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { Math as MathDisplay } from '../../../../components';

function M({ children }: { children: string }) {
  return <MathDisplay>{children}</MathDisplay>;
}

interface QCMQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QCMSectionProps {
  title: string;
  points: number;
  questions: QCMQuestion[];
  answers: Record<number, number>;
  onAnswer: (qId: number, optIdx: number) => void;
}

function QCMSection({ title, points, questions, answers, onAnswer }: QCMSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <span className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-white/5 px-3 py-1 rounded-full">{points} points</span>
      </div>
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct;
          const hasAnswered = userAnswer !== undefined;
          
          return (
            <div key={q.id} className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl">
              <p className="font-medium text-slate-900 dark:text-white mb-3">
                <span className="text-blue-600">{idx + 1}.</span> {q.question.includes('$') ? (
                  q.question.split(/(\$[^$]+\$)/g).map((part, i) => 
                    part.startsWith('$') && part.endsWith('$') 
                      ? <M key={i}>{part.slice(1, -1)}</M> 
                      : <span key={i}>{part}</span>
                  )
                ) : q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isCorrectOption = optIdx === q.correct;
                  
                  let optionClass = "p-3 rounded-lg border transition-all ";
                  if (hasAnswered) {
                    if (isCorrectOption) {
                      optionClass += "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800";
                    } else if (isSelected && !isCorrect) {
                      optionClass += "bg-red-50 dark:bg-red-950/30 border-red-300 text-red-800";
                    } else {
                      optionClass += "bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400";
                    }
                  } else {
                    optionClass += "bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100/80 dark:bg-white/5 text-slate-800 dark:text-slate-200 cursor-pointer";
                  }
                  
                  return (
                    <button
                      key={optIdx}
                      onClick={() => !hasAnswered && onAnswer(q.id, optIdx)}
                      disabled={hasAnswered}
                      className={optionClass + " w-full text-left flex items-center gap-3"}
                    >
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium shrink-0">
                        {String.fromCharCode(97 + optIdx)}
                      </span>
                      <span className="flex-1">
                        {opt.includes('$') ? (
                          opt.split(/(\$[^$]+\$)/g).map((part, i) => 
                            part.startsWith('$') && part.endsWith('$') 
                              ? <M key={i}>{part.slice(1, -1)}</M> 
                              : <span key={i}>{part}</span>
                          )
                        ) : opt}
                      </span>
                      {hasAnswered && isCorrectOption && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {hasAnswered && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <strong>Explication :</strong> {q.explanation.includes('$') ? (
                    q.explanation.split(/(\$[^$]+\$)/g).map((part, i) => 
                      part.startsWith('$') && part.endsWith('$') 
                        ? <M key={i}>{part.slice(1, -1)}</M> 
                        : <span key={i}>{part}</span>
                    )
                  ) : q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const questionsCours: QCMQuestion[] = [
  { id: 1, question: "Sur un marché concurrentiel, quand une firme cesse-t-elle sa production à court terme ?", options: ["Lorsque le prix est inférieur au coût marginal", "Lorsque le prix est inférieur au coût variable moyen", "Lorsque le coût marginal dépasse le coût total", "Lorsque le prix est inférieur au coût moyen"], correct: 1, explanation: "À court terme, la firme produit tant que P ≥ CVM. Si P < CVM, elle ne couvre même pas ses coûts variables et préfère fermer." },
  { id: 2, question: "Dans un duopole de Cournot, les entreprises...", options: ["Décident du prix en coopération", "Décident de la quantité de biens à produire indépendamment l'une de l'autre", "Décident de la production simultanément en coopérant", "Décident du prix l'une après l'autre"], correct: 1, explanation: "En Cournot, chaque firme choisit sa quantité indépendamment et simultanément, en anticipant la quantité de l'autre." },
  { id: 3, question: "La courbe d'offre de travail est :", options: ["Toujours croissante", "Toujours décroissante", "Croissante au début puis décroissante (backward-bending)", "Décroissante au début puis croissante"], correct: 2, explanation: "Pour des salaires faibles, l'effet substitution domine (offre ↑). Pour des salaires élevés, l'effet revenu peut dominer (offre ↓)." },
  { id: 4, question: "Le surplus du consommateur est maximisé lorsque :", options: ["Le monopole produit à un prix supérieur à son coût marginal", "La production atteint son efficacité Pareto", "Le prix égale le coût marginal (P = Cm)", "Le monopole maximise son profit"], correct: 2, explanation: "Le surplus total (et donc celui du consommateur) est maximisé quand P = Cm, c'est-à-dire en concurrence parfaite." },
  { id: 5, question: "L'indice de Lerner mesure :", options: ["Le surplus du consommateur", "Le pouvoir de marché d'une firme", "L'élasticité de la demande", "Le coût marginal"], correct: 1, explanation: "L'indice de Lerner L = (P - Cm)/P mesure le pouvoir de marché. En CPP, L = 0. En monopole, L = 1/|ε|." },
  { id: 6, question: "Une augmentation du salaire d'un individu rationnel entraînera :", options: ["Une augmentation de son offre de travail", "Une diminution de son offre de travail", "Une augmentation de son offre de travail si l'effet de substitution domine l'effet de revenu", "Un maintien de l'offre de travail constante"], correct: 2, explanation: "L'effet net dépend de la force relative des deux effets. ES pousse à travailler plus, ER pousse à travailler moins (si loisir normal)." },
];

const questionsExo1: QCMQuestion[] = [
  { id: 7, question: "Soit un consommateur avec $U(x_1, x_2) = x_1^{0.4} x_2^{0.6}$, $p_1 = 2$, $p_2 = 3$, $R = 120$. La quantité optimale $x_1^*$ est :", options: ["24", "16", "20", "30"], correct: 0, explanation: "Cobb-Douglas avec α + β = 1 : $p_1 x_1^* = \\alpha R$ → $2 x_1^* = 0.4 × 120 = 48$ → $x_1^* = 24$." },
  { id: 8, question: "Avec les mêmes données, la quantité optimale $x_2^*$ est :", options: ["16", "24", "20", "30"], correct: 1, explanation: "$p_2 x_2^* = \\beta R$ → $3 x_2^* = 0.6 × 120 = 72$ → $x_2^* = 24$." },
  { id: 9, question: "Si le prix $p_1$ passe à 4, la nouvelle quantité $x_1^{new}$ est :", options: ["12", "24", "16", "8"], correct: 0, explanation: "$p_1 x_1^* = \\alpha R$ → $4 x_1^* = 0.4 × 120 = 48$ → $x_1^* = 12$." },
  { id: 10, question: "L'élasticité-prix de la demande de $x_1$ pour cette fonction Cobb-Douglas est :", options: ["-0.5", "-1", "-2", "0"], correct: 1, explanation: "Pour Cobb-Douglas, l'élasticité-prix propre est toujours égale à -1 (demande à élasticité unitaire)." },
];

const questionsExo2: QCMQuestion[] = [
  { id: 11, question: "Soit un monopole avec demande $P = 100 - 2Q$ et coût $C(Q) = Q^2/4$. La recette marginale est :", options: ["$Rm = 100 - 4Q$", "$Rm = 100 - 2Q$", "$Rm = 50 - Q$", "$Rm = 100 - Q$"], correct: 0, explanation: "$RT = P × Q = (100 - 2Q)Q = 100Q - 2Q^2$. Donc $Rm = dRT/dQ = 100 - 4Q$." },
  { id: 12, question: "Le coût marginal du monopole est :", options: ["$Cm = Q/2$", "$Cm = Q$", "$Cm = 2Q$", "$Cm = Q^2/4$"], correct: 0, explanation: "$C(Q) = Q^2/4$. Donc $Cm = dC/dQ = Q/2$." },
  { id: 13, question: "La quantité qui maximise le profit du monopole est :", options: ["$Q^* = 22.2$", "$Q^* = 20$", "$Q^* = 25$", "$Q^* = 30$"], correct: 0, explanation: "$Rm = Cm$ → $100 - 4Q = Q/2$ → $100 = 4.5Q$ → $Q^* ≈ 22.2$." },
  { id: 14, question: "Le prix de monopole correspondant est environ :", options: ["$P^* ≈ 55.6$", "$P^* ≈ 60$", "$P^* ≈ 50$", "$P^* ≈ 45$"], correct: 0, explanation: "$P^* = 100 - 2(22.2) = 100 - 44.4 ≈ 55.6$." },
  { id: 15, question: "Le surplus du consommateur en situation de monopole est environ :", options: ["493", "600", "400", "550"], correct: 0, explanation: "$SC = \\frac{1}{2}(100 - 55.6) × 22.2 = \\frac{1}{2} × 44.4 × 22.2 ≈ 493$." },
];

const questionsExo3: QCMQuestion[] = [
  { id: 16, question: "Une firme en CPP a $CT(Q) = Q^2 + 10Q + 100$. Le coût variable moyen est :", options: ["$CVM = Q + 10$", "$CVM = 2Q + 10$", "$CVM = Q^2 + 10Q$", "$CVM = 100/Q + Q + 10$"], correct: 0, explanation: "$CV = Q^2 + 10Q$ (sans le coût fixe 100). Donc $CVM = CV/Q = Q + 10$." },
  { id: 17, question: "Le seuil de fermeture (prix minimum de CT) est :", options: ["P = 10", "P = 20", "P = 30", "P = 0"], correct: 0, explanation: "Le seuil de fermeture est le minimum du CVM. $CVM = Q + 10$ est croissant, donc min CVM = 10 (en Q = 0)." },
  { id: 18, question: "Le coût marginal de cette firme est :", options: ["$Cm = 2Q + 10$", "$Cm = Q + 10$", "$Cm = 2Q$", "$Cm = Q^2 + 10$"], correct: 0, explanation: "$Cm = dCT/dQ = 2Q + 10$." },
  { id: 19, question: "Si le prix de marché est P = 30, la quantité offerte par la firme est :", options: ["Q = 10", "Q = 15", "Q = 20", "Q = 5"], correct: 0, explanation: "En CPP, $P = Cm$ → $30 = 2Q + 10$ → $Q = 10$." },
  { id: 20, question: "Le seuil de rentabilité (prix minimum de LT) est environ :", options: ["P ≈ 30", "P ≈ 20", "P ≈ 40", "P ≈ 25"], correct: 0, explanation: "Min CM quand $Cm = CM$. $CM = Q + 10 + 100/Q$. $dCM/dQ = 1 - 100/Q^2 = 0$ → $Q = 10$. $CM(10) = 30$." },
];

export function ExamenBlanc() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  const handleAnswer = (qId: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };
  
  const resetExam = () => {
    setAnswers({});
  };
  
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-red-600 mb-3 font-medium">
          <Clock className="w-4 h-4" />
          <span>EXAMEN BLANC - FORMAT QCM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Examen Blanc</h1>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          Examen type CM de Microéconomie L2 - Format QCM comme les vrais examens de Montpellier. Durée : 1h30.
        </p>
      </div>

      {/* Consignes */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">Consignes</h3>
            <ul className="text-sm text-amber-900 space-y-1">
              <li>• Durée : 1h30</li>
              <li>• Documents autorisés : Aucun</li>
              <li>• Calculatrice non programmable autorisée</li>
              <li>• Chaque question a une seule réponse correcte</li>
              <li>• La correction s'affiche après chaque réponse</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={resetExam}
          className="py-2 px-4 bg-slate-100/80 dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-200 dark:bg-white/10 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Recommencer
        </button>
      </div>

      {/* Questions de cours */}
      <QCMSection
        title="Questions de cours"
        points={6}
        questions={questionsCours}
        answers={answers}
        onAnswer={handleAnswer}
      />

      {/* Exercice 1 */}
      <QCMSection
        title="Exercice 1 : Optimisation du Consommateur"
        points={4}
        questions={questionsExo1}
        answers={answers}
        onAnswer={handleAnswer}
      />

      {/* Exercice 2 */}
      <QCMSection
        title="Exercice 2 : Monopole"
        points={5}
        questions={questionsExo2}
        answers={answers}
        onAnswer={handleAnswer}
      />

      {/* Exercice 3 */}
      <QCMSection
        title="Exercice 3 : Firme en CPP"
        points={5}
        questions={questionsExo3}
        answers={answers}
        onAnswer={handleAnswer}
      />
    </main>
  );
}
