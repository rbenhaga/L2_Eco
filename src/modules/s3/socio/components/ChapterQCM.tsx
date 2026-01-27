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
        <div className="bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl border border-violet-200/60 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
                <span className="text-white font-bold text-lg">QCM</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Testez vos connaissances</h3>
                <p className="text-slate-600 mb-4">{questions.length} questions sur le chapitre {chapter} : {title}</p>
                <button
                  onClick={() => { setStarted(true); setShuffleKey(k => k + 1); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-violet-200"
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
      if (percentage >= 90) return { text: "Excellent ! Tu maîtrises ce chapitre !", color: "text-emerald-600", bg: "from-emerald-500 to-teal-500" };
      if (percentage >= 70) return { text: "Très bien ! Quelques révisions et c'est parfait.", color: "text-blue-600", bg: "from-blue-500 to-indigo-500" };
      if (percentage >= 50) return { text: "Pas mal ! Continue à réviser.", color: "text-amber-600", bg: "from-amber-500 to-orange-500" };
      return { text: "Relis le chapitre et réessaie !", color: "text-rose-600", bg: "from-rose-500 to-red-500" };
    };
    const message = getMessage();

    return (
      <div className="mt-12 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 text-center">
            <div className={`w-20 h-20 bg-linear-to-br ${message.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <Trophy className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Résultat - Chapitre {chapter}</h3>
            <p className="text-4xl font-bold bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">{score}/{shuffledQuestions.length}</p>
            <p className="text-slate-500 mb-1">{percentage}% de bonnes réponses</p>
            <p className={`font-medium mb-6 ${message.color}`}>{message.text}</p>
            <button 
              onClick={restart} 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-violet-200"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-violet-50 via-purple-50 to-fuchsia-50 px-6 py-4 border-b border-violet-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-semibold">
                QCM Ch.{chapter}
              </span>
              <span className="text-slate-600 text-sm">Question {currentQuestion + 1}/{shuffledQuestions.length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-violet-200/60">
              <span className="text-sm text-violet-600">Score</span>
              <span className="text-xl font-bold text-violet-700">{score}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-violet-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-linear-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }} 
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 sm:p-8">
          <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">{question.original.question}</h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.shuffledOptions.map((option, index) => {
              let className = "w-full p-4 text-left rounded-xl border-2 transition-all cursor-pointer ";
              if (answered[currentQuestion]) {
                if (index === question.correctIndex) {
                  className += "border-emerald-400 bg-linear-to-r from-emerald-50 to-green-50";
                } else if (index === selectedAnswer) {
                  className += "border-rose-400 bg-linear-to-r from-rose-50 to-red-50";
                } else {
                  className += "border-slate-100 opacity-50";
                }
              } else {
                className += "border-slate-200 hover:border-violet-300 hover:bg-violet-50/50";
              }

              return (
                <button key={index} onClick={() => handleAnswer(index)} className={className} disabled={answered[currentQuestion]}>
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                      answered[currentQuestion] && index === question.correctIndex ? 'bg-emerald-500 text-white' :
                      answered[currentQuestion] && index === selectedAnswer ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-slate-700">{option}</span>
                    {answered[currentQuestion] && index === question.correctIndex && <CheckCircle className="text-emerald-600 shrink-0" size={22} />}
                    {answered[currentQuestion] && index === selectedAnswer && index !== question.correctIndex && <XCircle className="text-rose-600 shrink-0" size={22} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered[currentQuestion] && (
            <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === question.correctIndex ? 'bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200' : 'bg-linear-to-r from-rose-50 to-red-50 border border-rose-200'}`}>
              <p className={`font-semibold mb-1 ${selectedAnswer === question.correctIndex ? 'text-emerald-800' : 'text-rose-800'}`}>
                {selectedAnswer === question.correctIndex ? '✓ Correct !' : '✗ Incorrect'}
              </p>
              <p className="text-slate-700">{question.original.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {answered[currentQuestion] && (
            <button 
              onClick={nextQuestion} 
              className="w-full py-3.5 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-200"
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
