import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, BarChart3, PieChart, TrendingUp, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { getModuleTheme } from "../design-system/tokens";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type ModuleId = "macro" | "micro" | "stats" | "socio" | "management";
type SemesterId = "s3" | "s4";

type ModuleEntry = {
  path: string;
  title: string;
  hint: string;
  moduleId: ModuleId;
  icon: ReactNode;
};

const modulesBySemester: Record<SemesterId, ModuleEntry[]> = {
  s3: [
    {
      path: "/s3/micro",
      title: "Microeconomie",
      hint: "Consommateur, producteur, equilibre",
      moduleId: "micro",
      icon: <PieChart className="h-4 w-4" />,
    },
    {
      path: "/s3/macro",
      title: "Macroeconomie",
      hint: "IS-LM, WS-PS, politiques",
      moduleId: "macro",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      path: "/s3/stats",
      title: "Statistiques",
      hint: "Probabilites et variables aleatoires",
      moduleId: "stats",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      path: "/s3/socio",
      title: "Sociologie",
      hint: "Concepts et analyses sociales",
      moduleId: "socio",
      icon: <Users className="h-4 w-4" />,
    },
  ],
  s4: [
    {
      path: "/s4/micro",
      title: "Microeconomie",
      hint: "Concurrence imparfaite et bien-etre",
      moduleId: "micro",
      icon: <PieChart className="h-4 w-4" />,
    },
    {
      path: "/s4/macro",
      title: "Macroeconomie",
      hint: "Conjoncture, croissance, politiques",
      moduleId: "macro",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      path: "/s4/stats",
      title: "Statistiques",
      hint: "Tests, estimation, inference",
      moduleId: "stats",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      path: "/s4/management",
      title: "Management",
      hint: "Organisation et strategie",
      moduleId: "management",
      icon: <Users className="h-4 w-4" />,
    },
  ],
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [preferredSemester, setPreferredSemester] = useState<SemesterId>("s3");
  const [activeSemester, setActiveSemester] = useState<SemesterId>("s3");
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-40px" },
      };

  useEffect(() => {
    if (!user?.uid) return;

    authFetch(`${apiUrl}/api/user/${user.uid}/semester`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const semester = String(data?.semester || "").toLowerCase();
        const value: SemesterId = semester === "s4" ? "s4" : "s3";
        setPreferredSemester(value);
        setActiveSemester(value);
      })
      .catch(() => {
        setPreferredSemester("s3");
        setActiveSemester("s3");
      });
  }, [user?.uid, apiUrl]);

  const list = useMemo(() => modulesBySemester[activeSemester], [activeSemester]);

  const openPath = (path: string) => {
    if (user) {
      navigate(path);
      return;
    }
    navigate("/login", { state: { from: { pathname: path } } });
  };

  return (
    <div className="min-h-screen antialiased relative" style={{ background: "var(--color-canvas)" }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 8%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 38%), linear-gradient(180deg, var(--color-canvas) 0%, var(--color-bg-overlay) 100%)",
          }}
        />
      </div>

      <Header />

      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...motionProps} variants={fadeUp} transition={{ duration: 0.4 }} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--color-accent)" }}>
              Licence Economie
            </p>
            <h1
              className="mt-5 text-[clamp(2.2rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--color-text-primary)" }}
            >
              Licence Enocomie
            </h1>
            <p className="mt-6 text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Cours complets, QCM, annales corrigées et TD corrigées.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openPath(`/${preferredSemester}/macro`)}
                className="h-12 px-6 rounded-xl inline-flex items-center gap-2 text-sm sm:text-base font-semibold"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-accent-foreground)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/pricing")}
                className="h-12 px-5 rounded-xl border text-sm sm:text-base font-medium"
                style={{
                  borderColor: "var(--color-border-default)",
                  color: "var(--color-text-secondary)",
                  background: "var(--color-bg-raised)",
                }}
              >
                Voir les tarifs
              </button>
            </div>

          </motion.div>
        </div>
      </section>

      <section id="programme" className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            {...motionProps}
            variants={fadeUp}
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-8"
            style={{
              background: "var(--color-bg-raised)",
              border: "1px solid var(--color-border-default)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
                Programme L2
              </h2>

              <div className="inline-flex rounded-xl p-1" style={{ background: "var(--color-bg-overlay)", border: "1px solid var(--color-border-subtle)" }}>
                <SemesterSwitchButton
                  active={activeSemester === "s3"}
                  label="S3"
                  onClick={() => setActiveSemester("s3")}
                />
                <SemesterSwitchButton
                  active={activeSemester === "s4"}
                  label="S4"
                  onClick={() => setActiveSemester("s4")}
                />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 space-y-2">
              {list.map((entry) => (
                <ModuleLine key={entry.path} entry={entry} onOpen={openPath} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer className="mt-0 border-t" />
    </div>
  );
}

function SemesterSwitchButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 min-w-12 px-4 rounded-lg text-sm font-semibold transition-colors"
      style={{
        background: active ? "var(--color-text-primary)" : "transparent",
        color: active ? "var(--color-canvas)" : "var(--color-text-secondary)",
      }}
    >
      {label}
    </button>
  );
}

function ModuleLine({ entry, onOpen }: { entry: ModuleEntry; onOpen: (path: string) => void }) {
  const theme = getModuleTheme(entry.moduleId);

  return (
    <button
      type="button"
      onClick={() => onOpen(entry.path)}
      className="w-full rounded-xl px-3 sm:px-4 py-3 text-left border transition-colors"
      style={{ borderColor: "var(--color-border-subtle)", background: "transparent" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme.subtle;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span className="flex items-center gap-3">
        <span className="h-8 w-8 rounded-lg inline-flex items-center justify-center" style={{ background: theme.light, color: theme.color }}>
          {entry.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm sm:text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
            {entry.title}
          </span>
          <span className="block text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            {entry.hint}
          </span>
        </span>
        <ArrowRight className="h-4 w-4" style={{ color: theme.color }} />
      </span>
    </button>
  );
}
