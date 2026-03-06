import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ShuffledQuestion {
  original: Question;
  shuffledOptions: string[];
  correctIndex: number;
}

interface ChapterQCMProps {
  chapter: number;
  title: string;
  questions: Question[];
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleQuestionOptions(q: Question): ShuffledQuestion {
  const correctAnswer = q.options[q.correct];
  const shuffledOptions = shuffleArray(q.options);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  return { original: q, shuffledOptions, correctIndex };
}

export default function ChapterQCM({ chapter, title, questions }: ChapterQCMProps) {
  const [started, setStarted] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [showResult, setShowResult] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffledQuestions = useMemo(() => {
    return shuffleArray(questions).map(shuffleQuestionOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, shuffleKey]);

  const question = shuffledQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (answered[currentQuestion]) return;
    setSelectedAnswer(index);
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
    setShuffleKey(k => k + 1);
  };

  const percentage = Math.round((score / shuffledQuestions.length) * 100);

  // Card d'intro - pas encore commencé
  if (!started) {
    return (
      <div className="mt-12 mb-8">
        <div className="bg-linear-to-br from-[var(--color-accent-subtle)] via-[var(--color-accent-subtle)] to-transparent rounded-2xl border border-[var(--color-accent)] overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-accent-subtle)] shrink-0">
                <span className="text-[var(--color-bg-raised)] font-bold text-lg">QCM</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">Testez vos connaissances</h3>
                <p className="text-[var(--color-text-secondary)] mb-4">{questions.length} questions sur le chapitre {chapter} : {title}</p>
                <button
                  onClick={() => { setStarted(true); setShuffleKey(k => k + 1); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-bg-raised)] rounded-xl hover:from-[var(--color-accent-hover)] hover:to-[var(--color-accent)] transition-all font-medium shadow-lg shadow-[var(--color-accent-subtle)]"
                >
                  Commencer le QCM
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de résultat
  if (showResult) {
    const getMessage = () => {
      if (percentage >= 90) return { text: "Excellent ! Tu maîtrises ce chapitre !", color: "text-[var(--color-success)]", bg: "from-[var(--color-success-subtle)] to-[var(--color-success)]" };
      if (percentage >= 70) return { text: "Très bien ! Quelques révisions et c'est parfait.", color: "text-[var(--color-info)]", bg: "from-[var(--color-info)] to-[var(--color-accent-hover)]" };
      if (percentage >= 50) return { text: "Pas mal ! Continue à réviser.", color: "text-[var(--color-warning)]", bg: "from-[var(--color-warning-subtle)] to-[var(--color-warning)]" };
      return { text: "Relis le chapitre et réessaie !", color: "text-[var(--color-error)]", bg: "from-[var(--color-error)] to-[var(--color-error)]" };
    };
    const message = getMessage();

    return (
      <div className="mt-12 mb-8">
        <div className="bg-[var(--color-bg-raised)] rounded-2xl border border-[var(--color-border-default)] shadow-xl overflow-hidden">
          <div className="p-8 text-center">
            <div className={`w-20 h-20 bg-linear-to-br ${message.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <Trophy className="text-[var(--color-bg-raised)]" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Résultat - Chapitre {chapter}</h3>
            <p className="text-4xl font-bold bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent mb-2">{score}/{shuffledQuestions.length}</p>
            <p className="text-[var(--color-text-muted)] mb-1">{percentage}% de bonnes réponses</p>
            <p className={`font-medium mb-6 ${message.color}`}>{message.text}</p>
            <button 
              onClick={restart} 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-bg-raised)] rounded-xl hover:from-[var(--color-accent-hover)] hover:to-[var(--color-accent)] transition-all font-medium shadow-lg shadow-[var(--color-accent-subtle)]"
            >
              <RotateCcw size={18} /> Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QCM en cours
  return (
    <div className="mt-12 mb-8">
      <div className="bg-[var(--color-bg-raised)] rounded-2xl border border-[var(--color-border-default)] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[var(--color-accent-subtle)] via-[var(--color-accent-subtle)] to-transparent px-6 py-4 border-b border-[var(--color-accent)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-bg-raised)] rounded-lg text-sm font-semibold">
                QCM Ch.{chapter}
              </span>
              <span className="text-[var(--color-text-secondary)] text-sm">Question {currentQuestion + 1}/{shuffledQuestions.length}</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--color-bg-raised)] px-4 py-2 rounded-xl border border-[var(--color-accent)]">
              <span className="text-sm text-[var(--color-accent)]">Score</span>
              <span className="text-xl font-bold text-[var(--color-accent)]">{score}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-[var(--color-accent-subtle)] rounded-full h-2 overflow-hidden">
            <div 
              className="bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] h-2 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }} 
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 sm:p-8">
          <h4 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-6">{question.original.question}</h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.shuffledOptions.map((option, index) => {
              let className = "w-full p-4 text-left rounded-xl border-2 transition-all cursor-pointer ";
              if (answered[currentQuestion]) {
                if (index === question.correctIndex) {
                  className += "border-[var(--color-success)] bg-linear-to-r from-[var(--color-success-subtle)] to-[var(--color-success-subtle)]";
                } else if (index === selectedAnswer) {
                  className += "border-[var(--color-error)] bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent";
                } else {
                  className += "border-[var(--color-border-default)] opacity-50";
                }
              } else {
                className += "border-[var(--color-border-default)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]";
              }

              return (
                <button key={index} onClick={() => handleAnswer(index)} className={className} disabled={answered[currentQuestion]}>
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                      answered[currentQuestion] && index === question.correctIndex ? 'bg-[var(--color-success-subtle)]0 text-[var(--color-bg-raised)]' :
                      answered[currentQuestion] && index === selectedAnswer ? 'bg-[var(--color-error-subtle)] text-[var(--color-bg-raised)]' : 'bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)]'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-[var(--color-text-secondary)]">{option}</span>
                    {answered[currentQuestion] && index === question.correctIndex && <CheckCircle className="text-[var(--color-success)] shrink-0" size={22} />}
                    {answered[currentQuestion] && index === selectedAnswer && index !== question.correctIndex && <XCircle className="text-[var(--color-error)] shrink-0" size={22} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered[currentQuestion] && (
            <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === question.correctIndex ? 'bg-linear-to-r from-[var(--color-success-subtle)] to-[var(--color-success-subtle)] border border-[var(--color-success)]' : 'bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)]'}`}>
              <p className={`font-semibold mb-1 ${selectedAnswer === question.correctIndex ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {selectedAnswer === question.correctIndex ? '✓ Correct !' : '✗ Incorrect'}
              </p>
              <p className="text-[var(--color-text-secondary)]">{question.original.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {answered[currentQuestion] && (
            <button 
              onClick={nextQuestion} 
              className="w-full py-3.5 bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-bg-raised)] rounded-xl hover:from-[var(--color-accent-hover)] hover:to-[var(--color-accent)] font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--color-accent-subtle)]"
            >
              {currentQuestion < shuffledQuestions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
