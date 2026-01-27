import { ArrowRight, FileText, BookOpen, Brain, Calendar, BarChart3, PieChart, Users, Zap, BookText, Check, TrendingUp } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BackgroundBlobs } from "../components/layout/BackgroundBlobs";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ============================================
// MOTION CONFIG
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { user } = useAuth();

  const motionProps = prefersReducedMotion ? {} : {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-40px" },
  };

  // Handle CTA click - redirect to content or login
  const handleExploreCourses = () => {
    if (user) {
      navigate('/macro'); // Redirect to first module if logged in
    } else {
      navigate('/login', { state: { from: { pathname: '/macro' } } });
    }
  };

  return (
    <div className="min-h-screen antialiased relative" data-theme="light">
      <BackgroundBlobs />

      {/* Content wrapper - above blobs */}
      <div className="relative" style={{ zIndex: 1 }}>

        <Header />

        {/* HERO - 2 columns layout */}
        <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Text & CTA */}
              <motion.div {...motionProps} variants={fadeUp} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full" style={{ background: "rgb(var(--accent) / 0.08)", color: "rgb(var(--accent))" }}>
                  L2 Économie — 2025-2026
                </span>

                <h1 className="mt-6 sm:mt-8 text-[clamp(2.25rem,6vw,4rem)] font-semibold tracking-[-0.02em] leading-[1.1]">
                  Tous tes cours,<br />
                  <span className="text-gradient-hero">au même endroit.</span>
                </h1>

                <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                  Cours complets, fiches de synthèse, QCM d'entraînement et annales corrigées pour toutes les matières de L2 Économie.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleExploreCourses}
                    className="btn-primary h-12 sm:h-14 px-8 sm:px-10 rounded-xl text-sm sm:text-base font-semibold inline-flex items-center gap-2 sm:gap-2.5 transition-transform active:scale-[0.98]"
                  >
                    Explorer les cours
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </motion.div>

              {/* Right: Stats Dashboard */}
              <motion.div
                {...motionProps}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:justify-self-end w-full max-w-md"
              >
                <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "rgb(var(--accent) / 0.1)", color: "rgb(var(--accent))" }}>
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--text-muted))" }}>
                      Contenu disponible
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard value="8" label="Matières" />
                    <StatCard value="40+" label="Chapitres" />
                    <StatCard value="200+" label="Fiches" />
                    <StatCard value="500+" label="QCM" />
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" style={{ color: "rgb(var(--text-muted))" }} />
                    <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>
                      Mis à jour · Janvier 2026
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RESSOURCES + FONCTIONNALITÉS - 2 columns layout with section banding */}
        <section className="pt-16 pb-20 sm:pt-20 sm:pb-28 section-band">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Left: Ressources */}
              <motion.div {...motionProps} variants={fadeUp}>
                <div className="mb-8 sm:mb-10">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3 text-accent">
                    Ressources
                  </p>
                  <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-[-0.02em]">Ce que tu trouveras</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6" />}
                    title="Cours complets"
                    description="Tous les chapitres structurés"
                  />
                  <ResourceCard
                    icon={<FileText className="h-6 w-6" />}
                    title="Fiches"
                    description="L'essentiel condensé"
                  />
                  <ResourceCard
                    icon={<Brain className="h-6 w-6" />}
                    title="QCM"
                    description="Centaines de questions"
                  />
                  <ResourceCard
                    icon={<FileText className="h-6 w-6" />}
                    title="Annales"
                    description="Sujets d'examens corrigés"
                  />
                </div>
              </motion.div>

              {/* Right: Fonctionnalités */}
              <motion.div {...motionProps} variants={fadeUp} transition={{ delay: 0.1 }}>
                <div className="mb-8 sm:mb-10">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3 text-accent">
                    Fonctionnalités
                  </p>
                  <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-[-0.02em]">Comment tu apprends</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FeatureCard
                    icon={<Zap className="h-6 w-6" />}
                    title="Écoute audio"
                    description="Cours en format audio pour réviser partout"
                  />
                  <FeatureCard
                    icon={<Brain className="h-6 w-6" />}
                    title="Assistant IA"
                    description="Chatbot intelligent pour t'aider à comprendre"
                  />
                  <FeatureCard
                    icon={<BookText className="h-6 w-6" />}
                    title="Vidéos intro"
                    description="Introduction visuelle de chaque chapitre"
                  />
                  <FeatureCard
                    icon={<Check className="h-6 w-6" />}
                    title="Progression"
                    description="Suivi de tes acquis en temps réel"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* PROGRAMME - Institutional, clean table style */}
        <section id="programme" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* Title */}
            <motion.div className="text-center mb-12 sm:mb-16" {...motionProps} variants={fadeUp}>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3 sm:mb-4 text-accent">
                Programme
              </p>
              <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-semibold tracking-[-0.02em]">Licence 2</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted">
                2 semestres · 8 matières
              </p>
            </motion.div>

            {/* Semester Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Semestre 3 */}
              <motion.div {...motionProps} variants={fadeUp}>
                <div className="rounded-2xl bg-s1 shadow-2 p-6 sm:p-8">
                  <h3 className="text-base font-semibold mb-6 pb-4 border-b border-hairline">
                    Semestre 3
                  </h3>
                  <div className="space-y-1">
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <PieChart className="h-4 w-4 shrink-0 text-purple-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Microéconomie</h4>
                        <p className="text-xs mt-0.5 text-muted">Consommateur, producteur, équilibre</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <TrendingUp className="h-4 w-4 shrink-0 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Macroéconomie</h4>
                        <p className="text-xs mt-0.5 text-muted">IS-LM, WS-PS, politiques</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <BarChart3 className="h-4 w-4 shrink-0 text-green-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Statistiques</h4>
                        <p className="text-xs mt-0.5 text-muted">Probabilités, variables aléatoires</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <Users className="h-4 w-4 shrink-0 text-orange-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Sociologie</h4>
                        <p className="text-xs mt-0.5 text-muted">Concepts et théories</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Semestre 4 */}
              <motion.div {...motionProps} variants={fadeUp} transition={{ delay: 0.1 }}>
                <div className="rounded-2xl bg-s1 shadow-2 p-6 sm:p-8">
                  <h3 className="text-base font-semibold mb-6 pb-4 border-b border-hairline">
                    Semestre 4
                  </h3>
                  <div className="space-y-1">
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <PieChart className="h-4 w-4 shrink-0 text-purple-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Microéconomie</h4>
                        <p className="text-xs mt-0.5 text-muted">Marchés imparfaits, bien-être</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <TrendingUp className="h-4 w-4 shrink-0 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Macroéconomie</h4>
                        <p className="text-xs mt-0.5 text-muted">Équilibre général, conjoncture</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <BarChart3 className="h-4 w-4 shrink-0 text-green-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Statistiques</h4>
                        <p className="text-xs mt-0.5 text-muted">Tests, intervalles de confiance</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                    <a href="#" className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-s2 hover:translate-x-1">
                      <Users className="h-4 w-4 shrink-0 text-orange-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold">Management des organisations</h4>
                        <p className="text-xs mt-0.5 text-muted">Organisations et stratégies</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-accent" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Coming soon notice */}
            <motion.p
              className="text-center mt-12 sm:mt-20 text-xs sm:text-sm text-muted"
              {...motionProps}
              variants={fadeUp}
            >
              L1 et L3 bientôt disponibles
            </motion.p>
          </div>
        </section>


        <Footer />
      </div>{/* End content wrapper */}
    </div>
  );
}



// ============================================
// STAT CARD (for dashboard)
// ============================================
function StatCard({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl transition-colors duration-150 group" style={{ background: "rgb(var(--surface-2))" }}>
      <div className="flex items-start justify-between mb-2">
        <div className="text-2xl font-semibold" style={{ color: "rgb(var(--text))" }}>{value}</div>
        {icon && (
          <div className="opacity-40 group-hover:opacity-60 transition-opacity" style={{ color: "rgb(var(--accent))" }}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-xs font-medium" style={{ color: "rgb(var(--text-muted))" }}>{label}</div>
    </div>
  );
}


// ============================================
// RESOURCE CARD - Premium style (no dot)
// ============================================
function ResourceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col p-6 rounded-2xl bg-s1 border-l-2 border-accent/15 shadow-2 hover:translate-x-0.5 transition-all duration-150">
      <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-4 bg-s2 text-secondary">
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}

// ============================================
// FEATURE CARD - Premium with accent dot
// ============================================
function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col p-6 rounded-2xl bg-s1 border-l-2 border-accent/15 shadow-2 hover:translate-x-0.5 transition-all duration-150">
      <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-4 bg-s2 text-secondary relative">
        {icon}
        {/* Accent dot for features */}
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
