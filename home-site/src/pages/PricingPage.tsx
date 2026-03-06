import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Smile, Sparkles, Users } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { createCheckoutSession } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Home.css";
import "./PricingPage.css";

const HERO_TITLE = "Tarifs";
const TYPING_SPEED_MS = 62;
const SEMESTER_PRICE = 14.99;
const ANNUAL_PRICE = 24.99;
const SEMESTER_MONTHS = 6;
const ANNUAL_MONTHS = 12;
const PRICING_SLIDES = [0, 1, 2] as const;

export default function PricingPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const [typedCount, setTypedCount] = useState(0);
    const [isSemesterLoading, setIsSemesterLoading] = useState(false);
    const [isAnnualLoading, setIsAnnualLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [activeSlide, setActiveSlide] = useState(1);
    const carouselRef = useRef<HTMLElement | null>(null);
    const mobileCarouselInitialized = useRef(false);

    const success = searchParams.get("success") === "true";
    const canceled = searchParams.get("canceled") === "true";
    const semesterMonthly = SEMESTER_PRICE / SEMESTER_MONTHS;
    const annualMonthly = ANNUAL_PRICE / ANNUAL_MONTHS;
    const yearlySemesterEquivalent = SEMESTER_PRICE * 2;
    const annualSavingsPercent = Math.round(((yearlySemesterEquivalent - ANNUAL_PRICE) / yearlySemesterEquivalent) * 100);

    useEffect(() => {
        if (!success && !canceled) return;
        const next = new URLSearchParams(searchParams);
        next.delete("success");
        next.delete("canceled");
        next.delete("session_id");
        setSearchParams(next, { replace: true });
    }, [success, canceled, searchParams, setSearchParams]);

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

    const handleCheckout = async (plan: "semester" | "annual") => {
        if (!user?.uid) {
            navigate("/login");
            return;
        }

        setCheckoutError(null);
        if (plan === "semester") setIsSemesterLoading(true);
        if (plan === "annual") setIsAnnualLoading(true);

        try {
            const { url } = await createCheckoutSession(user.uid, plan);
            if (!url) throw new Error("URL de paiement non reçue");
            window.location.href = url;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Impossible de lancer le paiement";
            setCheckoutError(message);
            setIsSemesterLoading(false);
            setIsAnnualLoading(false);
        }
    };

    const handleCarouselScroll = () => {
        const container = carouselRef.current;
        if (!container) return;

        const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-pricing-slide]"));
        if (cards.length === 0) return;

        const viewportCenter = container.scrollLeft + container.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.clientWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveSlide(closestIndex);
    };

    const scrollToSlide = (index: number) => {
        const container = carouselRef.current;
        if (!container) return;
        const target = container.querySelector<HTMLElement>(`[data-pricing-slide=\"${index}\"]`);
        target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    };

    useEffect(() => {
        if (mobileCarouselInitialized.current) return;
        if (!window.matchMedia("(max-width: 767px)").matches) return;

        mobileCarouselInitialized.current = true;
        requestAnimationFrame(() => {
            scrollToSlide(1);
            setActiveSlide(1);
        });
    }, []);

    return (
        <div className="home-min-shell min-h-screen antialiased">
            <Header />

            <main className="pricing-min-main">
                <section className="pricing-min-hero" aria-label="Tarifs">
                    <p className="home-min-kicker">Abonnement Premium</p>
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
                        Votre abonnement sert uniquement à maintenir la plateforme et ses frais divers (hébergements, nom de domaine, IA, etc.).
                    </p>

                    {(success || canceled || checkoutError) && (
                        <div className="pricing-min-alert" data-state={success ? "success" : canceled ? "warn" : "error"}>
                            {success
                                ? "Paiement confirmé. Ton abonnement Premium est activé."
                                : canceled
                                    ? "Paiement annulé. Tu peux reprendre quand tu veux."
                                    : checkoutError}
                        </div>
                    )}
                </section>

                <section
                    ref={carouselRef}
                    className="pricing-min-grid"
                    aria-label="Plans"
                    onScroll={handleCarouselScroll}
                >
                    <article className="pricing-min-card pricing-min-card-free" data-pricing-slide="0">
                        <p className="pricing-min-card-name">Gratuit</p>
                        <p className="pricing-min-card-sub">Pour découvrir</p>
                        <p className="pricing-min-price">0€</p>
                        <ul className="pricing-min-list">
                            {[
                                "Premier chapitre de chaque matière",
                                "QCM de découverte",
                                "Fiches limitées",
                            ].map((feature) => (
                                <li key={feature}>
                                    <Check className="h-4 w-4" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={() => navigate("/login")} className="home-min-cta-secondary pricing-min-btn">
                            Commencer gratuitement
                        </button>
                    </article>

                    <article className="pricing-min-card pricing-min-card-semester" data-pricing-slide="1">
                        <div className="pricing-min-badge">
                            <Users className="h-3 w-3" />
                            Populaire
                        </div>
                        <p className="pricing-min-card-name">Semestriel</p>
                        <p className="pricing-min-card-sub">Abonnement 6 mois</p>
                        <p className="pricing-min-price">{SEMESTER_PRICE.toFixed(2).replace(".", ",")}€</p>
                        <p className="pricing-min-rate">{semesterMonthly.toFixed(2).replace(".", ",")}€/mois</p>
                        <ul className="pricing-min-list">
                            {[
                                "Accès complet à toutes les matières",
                                "Fiches + QCM illimités (500+)",
                                "Annales corrigées",
                                "Audio, IA et vidéos intro",
                                "Mises à jour continues",
                            ].map((feature) => (
                                <li key={feature}>
                                    <Check className="h-4 w-4" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => handleCheckout("semester")}
                            disabled={isSemesterLoading || isAnnualLoading}
                            className="home-min-cta-secondary pricing-min-btn"
                        >
                            {isSemesterLoading ? "Redirection..." : "Choisir semestriel"}
                            {!isSemesterLoading && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </article>

                    <article className="pricing-min-card pricing-min-card-annual" data-pricing-slide="2">
                        <div className="pricing-min-badge pricing-min-badge-accent">
                            <Sparkles className="h-3 w-3" />
                            Meilleur prix
                        </div>
                        <div className="pricing-min-title-row">
                            <p className="pricing-min-card-name">Annuel</p>
                            <span className="pricing-min-title-discount">-{annualSavingsPercent}%</span>
                        </div>
                        <p className="pricing-min-card-sub">Abonnement 12 mois</p>
                        <div className="pricing-min-price-row">
                            <p className="pricing-min-price">{ANNUAL_PRICE.toFixed(2).replace(".", ",")}€</p>
                            <span className="pricing-min-price-strike">{yearlySemesterEquivalent.toFixed(2).replace(".", ",")}€</span>
                        </div>
                        <p className="pricing-min-rate">{annualMonthly.toFixed(2).replace(".", ",")}€/mois</p>
                        <ul className="pricing-min-list">
                            {[
                                "Tout le contenu semestriel mais moins cher",
                            ].map((feature) => (
                                <li key={feature}>
                                    <Smile className="h-4 w-4" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => handleCheckout("annual")}
                            disabled={isSemesterLoading || isAnnualLoading}
                            className="home-min-cta-primary pricing-min-btn"
                        >
                            {isAnnualLoading ? "Redirection..." : "Choisir annuel"}
                            {!isAnnualLoading && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </article>
                </section>

                <div className="pricing-min-carousel-nav md:hidden" aria-label="Navigation des offres">
                    {PRICING_SLIDES.map((index) => (
                        <button
                            key={index}
                            type="button"
                            className="pricing-min-carousel-dot"
                            data-active={activeSlide === index ? "true" : "false"}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Voir l'offre ${index + 1}`}
                            aria-pressed={activeSlide === index}
                        />
                    ))}
                </div>

            </main>

            <Footer className="mt-0 border-t" />
        </div>
    );
}
