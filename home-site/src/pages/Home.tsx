import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

type SemesterId = "s3" | "s4";
const HERO_TITLE = "Licence Eco";
const TYPING_SPEED_MS = 62;

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<SemesterId>("s3");
  const [typedCount, setTypedCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    if (!user?.uid) return;

    authFetch(`${apiUrl}/api/user/${user.uid}/semester`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const semester = String(data?.semester || "").toLowerCase();
        setSelectedSemester(semester === "s4" ? "s4" : "s3");
      })
      .catch(() => {
        setSelectedSemester("s3");
      });
  }, [user?.uid, apiUrl]);

  useEffect(() => {
    setTypedCount(0);
    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= HERO_TITLE.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED_MS);

    return () => window.clearInterval(timer);
  }, []);

  const openStart = () => {
    const target = `/${selectedSemester}/macro`;
    if (user) {
      navigate(target);
      return;
    }
    navigate("/login", { state: { from: { pathname: target } } });
  };

  return (
    <div className="home-min-shell min-h-screen antialiased">
      <Header />

      <main className="home-min-main">
        <section className="home-min-hero" aria-label="Introduction">
          <p className="home-min-kicker">Plateforme L2 Économie</p>
          <h1 className="home-min-title">
            {HERO_TITLE.slice(0, typedCount).split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={`home-min-letter ${index === typedCount - 1 && typedCount < HERO_TITLE.length ? "is-fresh" : ""}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="home-min-cursor" aria-hidden="true" />
          </h1>
          <p className="home-min-lead">
            Contenus disponibles: cours, TD, corrigés, fiches, QCM, annales, vidéos, audio.
          </p>

          <div className="home-min-actions">
            <button type="button" onClick={openStart} className="home-min-cta-primary">
              {user ? "Accéder à mes cours" : "Commencer"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="/pricing" className="home-min-cta-secondary">
              Voir les tarifs
            </a>
          </div>
        </section>
      </main>

      <Footer className="mt-0 border-t" />
    </div>
  );
}
