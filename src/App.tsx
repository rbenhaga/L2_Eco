import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  Calculator,
  Users,
  PieChart,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Background } from './components/ui/Background';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
  semester: 2 | 3;
  color: string; // Tailwind color class for gradient e.g. "from-blue-500 to-cyan-500"
}

function SubjectCard({ title, description, icon, href, available, color }: SubjectCardProps) {
  if (!available) {
    return (
      <div className="relative p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-lg opacity-60 cursor-not-allowed overflow-hidden">
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 bg-slate-200/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-300 dark:border-white/5">
          Bientôt
        </span>
        <div className="w-14 h-14 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-5 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-white/5">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-400 dark:text-slate-500 mb-2">{title}</h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <Link to={href} className="block group relative">
      <div className="absolute inset-0 bg-linear-to-br from-white/[0.07] to-white/2 rounded-3xl -z-10" />
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md hover:border-indigo-200 dark:hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 overflow-hidden">
        {/* Glow effect on hover */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10 bg-linear-to-br ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-white/70 group-hover:text-indigo-700 dark:group-hover:text-white transition-colors">
          <span>Accéder au cours</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

const subjects: SubjectCardProps[] = [
  {
    title: "Macroéconomie",
    description: "Modèles IS-LM, WS-PS, AS-AD et politiques économiques",
    icon: <TrendingUp size={24} />,
    href: "/macro",
    available: true,
    semester: 2,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Statistiques",
    description: "Probabilités, variables aléatoires et lois usuelles",
    icon: <BarChart3 size={24} />,
    href: "/stats",
    available: true,
    semester: 2,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Microéconomie",
    description: "Théorie du consommateur, du producteur et équilibre",
    icon: <PieChart size={24} />,
    href: "/micro",
    available: true,
    semester: 2,
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "Sociologie",
    description: "Concepts fondamentaux et théories sociologiques",
    icon: <Users size={24} />,
    href: "/socio",
    available: true,
    semester: 2,
    color: "from-violet-500 to-purple-600"
  },
  {
    title: "Mathématiques",
    description: "Analyse, algèbre linéaire et optimisation",
    icon: <Calculator size={24} />,
    href: "/maths",
    available: false,
    semester: 2,
    color: "from-pink-500 to-rose-600"
  },
];

export function Home() {
  const [semester, setSemester] = useState<2 | 3>(2);
  const filteredSubjects = subjects.filter(sub => sub.semester === semester);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30">
      <Background />

      {/* Hero */}
      <header className="pt-16 sm:pt-20 pb-12 text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-indigo-500 to-violet-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20"
        >
          <GraduationCap size={28} strokeWidth={2} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3"
        >
          Partiels 2025-2026 · L2 Économie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
        >
          Guides de <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Révision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Fiches synthétiques, exercices corrigés et QCM pour réussir tes partiels.
        </motion.p>

        {/* Semester Toggle - Glass Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex p-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full mb-12 relative shadow-lg"
        >
          {[2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setSemester(s as 2 | 3)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${semester === s ? 'text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Semestre {s}
              {semester === s && (
                <motion.div
                  layoutId="active-semester"
                  className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 rounded-full z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </header>

      {/* Subjects Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={semester}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, idx) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <SubjectCard {...subject} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white/40 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-white/5 border-dashed backdrop-blur-sm">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Le contenu du Semestre 3 arrive bientôt...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-200 dark:border-white/5 relative z-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <p className="text-xs text-slate-500 font-medium">
          Fait avec <span className="text-red-500">❤️</span> pour réussir tes partiels
        </p>
      </footer>
    </div>
  );
}

export default Home;
