import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "../../pages/InfoPages.css";

type InfoPageShellProps = {
  kicker: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

const TYPING_SPEED_MS = 48;

export function InfoPageShell({ kicker, title, lead, children }: InfoPageShellProps) {
  const [typedCount, setTypedCount] = useState(0);

  const titleFontSize =
    title.length >= 30
      ? "clamp(1.18rem, 5.2vw, 2.9rem)"
      : title.length >= 22
        ? "clamp(1.4rem, 6vw, 3.9rem)"
        : "clamp(2.2rem, 8vw, 5rem)";

  useEffect(() => {
    window.scrollTo(0, 0);
    setTypedCount(0);

    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= title.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED_MS);

    return () => window.clearInterval(timer);
  }, [title]);

  return (
    <div className="info-page-shell">
      <Header />

      <main className="info-page-main">
        <section className="info-page-hero" aria-labelledby="info-page-title">
          <p className="info-page-kicker">{kicker}</p>
          <h1 id="info-page-title" className="info-page-title" style={{ fontSize: titleFontSize }}>
            {title.slice(0, typedCount).split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={`info-page-title-letter ${index === typedCount - 1 && typedCount < title.length ? "is-fresh" : ""}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="info-page-title-cursor" aria-hidden="true" />
          </h1>
          {lead ? <p className="info-page-lead">{lead}</p> : null}
        </section>

        <section className="info-page-content" aria-label={title}>
          {children}
        </section>
      </main>

      <Footer className="mt-0 border-t" />
    </div>
  );
}