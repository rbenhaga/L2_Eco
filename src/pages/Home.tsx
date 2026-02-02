import { ArrowRight, FileText, BookOpen, Brain, Calendar, BarChart3, PieChart, Users, Zap, BookText, Check, TrendingUp } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getModuleTheme } from "../design-system/tokens";

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
    <div className="min-h-screen antialiased relative" style={{ background: "var(--color-bg-base)" }} data-theme="light">
      {/* Clean background - NO glows */}
      <div className="fixed inset-0 -z-10">
        {/* Simple gradient bleuté calme */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--color-bg-base) 0%, var(--color-bg-overlay) 100%)" }} />

        {/* Grain texture subtil */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px'
        }} />
      </div>

      {/* Content wrapper */}
      <div className="relative" style={{ zIndex: 1 }}>

        <Header />

        {/* ═══════════════════════════════════════════════════════════
            HERO — Premium, Impactant, Mémorable
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
          {/* Clean gradient background */}
          <div className="absolute inset-0 -z-10">
            {/* Base gradient - using token colors */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-overlay) 100%)"
            }} />

            {/* Subtle animated glow orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%)",
                filter: "blur(80px)",
                opacity: 0.6
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, var(--color-micro-subtle, rgba(139, 92, 246, 0.08)) 0%, transparent 70%)",
                filter: "blur(80px)",
                opacity: 0.5
              }}
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text & CTA */}
              <motion.div {...motionProps} variants={fadeUp} transition={{ duration: 0.6 }}>
                {/* Badge with pulse */}
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full relative"
                  style={{
                    background: "var(--color-accent-subtle)",
                    color: "var(--color-accent)",
                    border: "1px solid var(--color-border-default)"
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--color-accent)" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--color-accent)" }} />
                  </span>
                  L2 Économie — 2025-2026
                </motion.span>

                {/* Hero title */}
                <h1 className="mt-8 font-extrabold leading-[1.05] tracking-[-0.03em]" style={{
                  fontSize: "clamp(2.75rem, 6vw, 4.25rem)",
                }}>
                  <span style={{ color: "var(--color-text-primary)" }}>Tous tes cours,</span>
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-micro) 100%)",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    au même endroit.
                  </span>
                </h1>

                <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
                  Cours complets, fiches de synthèse, QCM d'entraînement et annales corrigées —
                  <span className="font-semibold" style={{ color: "var(--color-accent)" }}>tout ce qu'il te faut</span> pour réussir ta L2.
                </p>

                {/* CTA with micro-interaction */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <motion.button
                    type="button"
                    onClick={handleExploreCourses}
                    className="group h-14 px-8 rounded-2xl font-semibold inline-flex items-center gap-3 relative overflow-hidden"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-accent-foreground)",
                      boxShadow: "var(--shadow-md)"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative">Explorer les cours</span>
                    <ArrowRight className="h-5 w-5 relative transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    type="button"
                    onClick={() => navigate('/pricing')}
                    className="h-14 px-6 rounded-2xl font-medium inline-flex items-center gap-2 transition-all"
                    style={{
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border-default)",
                      background: "var(--color-bg-raised)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-bg-overlay)";
                      e.currentTarget.style.borderColor = "var(--color-border-strong)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-bg-raised)";
                      e.currentTarget.style.borderColor = "var(--color-border-default)";
                    }}
                  >
                    Voir les tarifs
                  </motion.button>
                </div>
              </motion.div>

              {/* Right: Stats Dashboard */}
              <motion.div
                {...motionProps}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:justify-self-end w-full max-w-md"
              >
                <motion.div
                  className="p-8 rounded-3xl relative overflow-hidden"
                  style={{
                    background: "var(--color-bg-raised)",
                    border: "1px solid var(--color-border-default)",
                    boxShadow: "var(--shadow-lg)"
                  }}
                  whileHover={{ boxShadow: "var(--shadow-xl)" }}
                >
                  {/* Decorative accent glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full" style={{
                    background: "radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%)"
                  }} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--color-accent)" }}
                      >
                        <BarChart3 className="h-5 w-5" style={{ color: "var(--color-accent-foreground)" }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                          Contenu disponible
                        </h3>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Mis à jour en continu</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <StatCardPremium value="8" label="Matières" moduleId="macro" icon={<BookOpen className="h-4 w-4" />} />
                      <StatCardPremium value="40+" label="Chapitres" moduleId="micro" icon={<FileText className="h-4 w-4" />} />
                      <StatCardPremium value="200+" label="Fiches" moduleId="stats" icon={<Brain className="h-4 w-4" />} />
                      <StatCardPremium value="500+" label="QCM" moduleId="socio" icon={<Zap className="h-4 w-4" />} />
                    </div>

                    <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid var(--color-border-default)" }}>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" style={{ color: "var(--color-text-muted)" }} />
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Janvier 2026</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{
                        background: "var(--color-success-subtle)",
                        color: "var(--color-success)"
                      }}>
                        ✓ À jour
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RESSOURCES + FONCTIONNALITÉS */}
        <section className="py-20 sm:py-28" style={{ background: "var(--color-bg-overlay)" }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

              {/* Left: Ressources */}
              <motion.div {...motionProps} variants={fadeUp}>
                <div className="mb-10">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--color-accent)" }}>
                    Ressources
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.02em]" style={{ color: "var(--color-text-primary)" }}>
                    Ce que tu trouveras
                  </h2>
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
                <div className="mb-10">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--color-accent)" }}>
                    Fonctionnalités
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.02em]" style={{ color: "var(--color-text-primary)" }}>
                    Comment tu apprends
                  </h2>
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

        {/* ═══════════════════════════════════════════════════════════
            PROGRAMME — Premium Semester Cards
            ═══════════════════════════════════════════════════════════ */}
        <section id="programme" className="py-24 sm:py-32 scroll-mt-20 relative">
          {/* Background accent */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30"
              style={{ background: "radial-gradient(ellipse, var(--color-accent-subtle) 0%, transparent 70%)" }}
            />
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* Title */}
            <motion.div className="text-center mb-16" {...motionProps} variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full mb-4"
                style={{
                  background: "var(--color-accent-subtle)",
                  color: "var(--color-accent)"
                }}
              >
                Programme complet
              </span>
              <h2 className="text-4xl font-bold tracking-[-0.02em]" style={{ color: "var(--color-text-primary)" }}>
                Licence 2 Économie
              </h2>
              <p className="mt-4 text-lg" style={{ color: "var(--color-text-secondary)" }}>
                2 semestres · 8 matières · <span className="font-semibold" style={{ color: "var(--color-accent)" }}>+500 ressources</span>
              </p>
            </motion.div>

            {/* Semester Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Semestre 3 */}
              <motion.div {...motionProps} variants={fadeUp}>
                <div className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: "var(--color-bg-raised)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--color-border-default)",
                    boxShadow: "var(--shadow-md)"
                  }}
                >
                  {/* Semester badge */}
                  <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid var(--color-border-soft)" }}>
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, var(--color-accent) 0%, ${getModuleTheme('micro').color} 100%)` }}
                    >
                      <span className="font-bold text-sm" style={{ color: "#FFFFFF" }}>S3</span>
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: "var(--color-text-primary)" }}>Semestre 3</h3>
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Octobre — Janvier</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <ModuleLink
                      href="/micro"
                      icon={<PieChart className="h-4 w-4" />}
                      title="Microéconomie"
                      description="Consommateur, producteur, équilibre"
                      moduleId="micro"
                    />
                    <ModuleLink
                      href="/macro"
                      icon={<TrendingUp className="h-4 w-4" />}
                      title="Macroéconomie"
                      description="IS-LM, WS-PS, politiques"
                      moduleId="macro"
                    />
                    <ModuleLink
                      href="/stats"
                      icon={<BarChart3 className="h-4 w-4" />}
                      title="Statistiques"
                      description="Probabilités, variables aléatoires"
                      moduleId="stats"
                    />
                    <ModuleLink
                      href="/socio"
                      icon={<Users className="h-4 w-4" />}
                      title="Sociologie"
                      description="Concepts et théories"
                      moduleId="socio"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Semestre 4 */}
              <motion.div {...motionProps} variants={fadeUp} transition={{ delay: 0.1 }}>
                <div className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: "var(--color-bg-raised)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--color-border-default)",
                    boxShadow: "var(--shadow-md)"
                  }}
                >
                  {/* Semester badge */}
                  <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid var(--color-border-soft)" }}>
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${getModuleTheme('micro').color} 0%, ${getModuleTheme('socio').color} 100%)` }}
                    >
                      <span className="font-bold text-sm" style={{ color: "#FFFFFF" }}>S4</span>
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: "var(--color-text-primary)" }}>Semestre 4</h3>
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Février — Mai</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <ModuleLink
                      href="/micro"
                      icon={<PieChart className="h-4 w-4" />}
                      title="Microéconomie"
                      description="Marchés imparfaits, bien-être"
                      moduleId="micro"
                    />
                    <ModuleLink
                      href="/macro"
                      icon={<TrendingUp className="h-4 w-4" />}
                      title="Macroéconomie"
                      description="Équilibre général, conjoncture"
                      moduleId="macro"
                    />
                    <ModuleLink
                      href="/stats"
                      icon={<BarChart3 className="h-4 w-4" />}
                      title="Statistiques"
                      description="Tests, intervalles de confiance"
                      moduleId="stats"
                    />
                    <ModuleLink
                      href="/management"
                      icon={<Users className="h-4 w-4" />}
                      title="Management"
                      description="Organisations et stratégies"
                      moduleId="management"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Coming soon chip */}
            <motion.div
              className="text-center mt-12"
              {...motionProps}
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "var(--color-bg-overlay)",
                  color: "var(--color-text-secondary)"
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-warning)" }} />
                L1 et L3 bientôt disponibles
              </span>
            </motion.div>
          </div>
        </section>


        <Footer />
      </div>{/* End content wrapper */}
    </div>
  );
}



// ============================================
// STAT CARD PREMIUM (coloré, avec icône)
// ============================================
function StatCardPremium({ value, label, moduleId, icon }: {
  value: string;
  label: string;
  moduleId: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
  icon: React.ReactNode;
}) {
  const theme = getModuleTheme(moduleId);
  
  return (
    <motion.div
      className="group p-4 rounded-xl transition-all duration-200 cursor-default"
      style={{
        background: theme.subtle,
        border: `1px solid ${theme.light}`
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 4px 20px ${theme.light}`
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{value}</div>
        <div
          className="h-7 w-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
          style={{
            background: theme.light,
            color: theme.color
          }}
        >
          {icon}
        </div>
      </div>
      <div className="text-xs font-semibold" style={{ color: "var(--color-text-secondary)" }}>{label}</div>
    </motion.div>
  );
}

// ============================================
// RESOURCE CARD — Premium avec dégradé subtil
// ============================================
function ResourceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="group flex flex-col p-6 rounded-2xl relative overflow-hidden"
      style={{
        background: "var(--color-bg-raised)",
        border: "1px solid var(--color-border-default)",
        boxShadow: "var(--shadow-sm)"
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-lg)"
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-subtle) 0%, transparent 50%)"
        }}
      />

      <div className="relative">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-105"
          style={{
            background: "var(--color-accent-subtle)",
            color: "var(--color-accent)"
          }}
        >
          {icon}
        </div>
        <h3 className="text-base font-semibold mb-2 transition-colors duration-200" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================
// FEATURE CARD — Differenciée avec accent fort
// ============================================
function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const microTheme = getModuleTheme('micro');
  
  return (
    <motion.div
      className="group flex flex-col p-6 rounded-2xl relative overflow-hidden"
      style={{
        background: "var(--color-bg-raised)",
        border: `1px solid ${microTheme.light}`,
        boxShadow: "var(--shadow-sm)"
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 32px ${microTheme.subtle}`
      }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%)"
        }}
      />

      <div className="relative">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, var(--color-accent) 0%, ${microTheme.color} 100%)`,
            color: "#FFFFFF",
            boxShadow: `0 4px 12px ${microTheme.subtle}`
          }}
        >
          {icon}
        </div>
        <h3 className="text-base font-semibold mb-2 transition-colors duration-200" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>

        {/* Subtle arrow indicator */}
        <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" style={{ color: "var(--color-accent)" }}>
          <span>En savoir plus</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MODULE LINK — Pour la section Programme
// ============================================
function ModuleLink({ href, icon, title, description, moduleId }: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  moduleId: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
}) {
  const theme = getModuleTheme(moduleId);
  
  return (
    <motion.a
      href={href}
      className="group flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-200"
      style={{
        background: "transparent"
      }}
      whileHover={{
        backgroundColor: theme.subtle,
        x: 4
      }}
    >
      <div
        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
        style={{
          background: theme.light,
          color: theme.color
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold transition-colors duration-200" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h4>
        <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{description}</p>
      </div>
      <ArrowRight
        className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
        style={{ color: theme.color }}
      />
    </motion.a>
  );
}
