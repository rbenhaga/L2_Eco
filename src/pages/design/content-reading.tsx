/**
 * Content Reading Page - With Paper Canvas toggle
 * For reading course content, TD, QCM, etc.
 */

import { useState } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import type { ReadingMode } from "../../hooks/useReadingMode";

// Reading Mode Toggle Component
function ReadingModeToggle({ 
    readingMode, 
    onToggle 
}: { 
    readingMode: ReadingMode; 
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300" style={{
            background: readingMode === "paper" ? "rgba(255,255,255,0.95)" : "var(--color-surface-soft)",
            borderColor: readingMode === "paper" ? "var(--paper-border)" : "var(--color-border-soft)"
        }}>
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl border flex items-center justify-center" style={{
                    background: readingMode === "paper" ? "rgba(0,0,0,0.04)" : "var(--color-surface-overlay)",
                    borderColor: readingMode === "paper" ? "var(--paper-border)" : "var(--color-border-soft)"
                }}>
                    <BookOpen size={18} style={{ color: readingMode === "paper" ? "var(--paper-text)" : "var(--color-text-base)" }} />
                </div>
                <div>
                    <div className="text-sm font-semibold" style={{ color: readingMode === "paper" ? "var(--paper-text)" : "var(--color-text-base)" }}>
                        Mode lecture
                    </div>
                    <div className="text-xs" style={{ color: readingMode === "paper" ? "var(--paper-secondary)" : "var(--color-text-secondary)" }}>
                        {readingMode === "paper" ? "Feuille blanche activée" : "Fond sombre actif"}
                    </div>
                </div>
            </div>
            <button
                onClick={onToggle}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                    background: readingMode === "paper" ? "var(--color-accent)" : "rgba(255,255,255,0.08)",
                    color: readingMode === "paper" ? "#FFFFFF" : "var(--color-text-base)",
                    border: `1px solid ${readingMode === "paper" ? "transparent" : "var(--color-border-soft)"}`
                }}
            >
                {readingMode === "paper" ? "Revenir au mode sombre" : "Activer la feuille blanche"}
            </button>
        </div>
    );
}

// Content Reading Page
export function ContentReadingPage({
    readingMode,
    onToggleReading,
    onBack,
}: {
    readingMode: ReadingMode;
    onToggleReading: () => void;
    onBack: () => void;
}) {
    const textColor = readingMode === "paper" ? "var(--paper-text)" : "var(--color-text-base)";
    const secondaryColor = readingMode === "paper" ? "var(--paper-secondary)" : "var(--color-text-secondary)";
    const mutedColor = readingMode === "paper" ? "var(--paper-muted)" : "var(--color-text-muted)";
    const borderColor = readingMode === "paper" ? "var(--paper-border)" : "var(--color-border-soft)";
    const bgSoft = readingMode === "paper" ? "rgba(0,0,0,0.02)" : "var(--color-surface-soft)";

    return (
        <div className="space-y-6">
            {/* Back button */}
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: secondaryColor }}
            >
                <ArrowLeft size={16} />
                Retour à Macroéconomie
            </button>

            {/* Reading Mode Toggle */}
            <ReadingModeToggle readingMode={readingMode} onToggle={onToggleReading} />

            {/* Course Content - Max width for optimal reading */}
            <article className="mx-auto max-w-[72ch] space-y-8" style={{ fontSize: "15px", lineHeight: "1.85" }}>
                {/* Chapter Header */}
                <header className="space-y-4">
                    <div className="text-sm font-semibold" style={{ color: mutedColor }}>
                        Chapitre 5
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: textColor }}>
                        Modèle AS-AD
                    </h1>
                    <p className="text-lg" style={{ color: secondaryColor }}>
                        Le modèle Offre Agrégée - Demande Agrégée permet d'analyser l'équilibre macroéconomique de court et long terme.
                    </p>
                </header>

                {/* Essential Summary */}
                <div className="p-6 rounded-xl border" style={{ background: bgSoft, borderColor }}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🎯</span>
                        <h2 className="text-lg font-semibold" style={{ color: textColor }}>
                            L'ESSENTIEL EN 3 LIGNES
                        </h2>
                    </div>
                    <p style={{ color: textColor }}>
                        Le modèle AS-AD combine l'offre agrégée (AS) et la demande agrégée (AD) pour déterminer le niveau de production et le niveau général des prix dans l'économie. À court terme, les prix sont rigides et la production s'ajuste. À long terme, les prix sont flexibles et l'économie converge vers son niveau de production potentiel.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold mt-10" style={{ color: textColor }}>
                        1️⃣ LA DEMANDE AGRÉGÉE (AD)
                    </h2>

                    <div className="p-5 rounded-xl border" style={{ background: bgSoft, borderColor }}>
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-xl">💡</span>
                            <div>
                                <div className="font-semibold mb-2" style={{ color: textColor }}>INTUITION</div>
                                <p style={{ color: secondaryColor }}>
                                    La courbe de demande agrégée représente la relation inverse entre le niveau général des prix et la quantité de biens et services demandés dans l'économie. Quand les prix baissent, le pouvoir d'achat augmente, stimulant la consommation et l'investissement.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p style={{ color: textColor }}>
                        La demande agrégée est composée de quatre éléments principaux :
                    </p>

                    <div className="space-y-3 ml-4">
                        <div>
                            <strong style={{ color: textColor }}>1. Consommation (C)</strong>
                            <p style={{ color: secondaryColor }}>
                                Dépenses des ménages en biens et services. Elle dépend du revenu disponible, de la richesse et des anticipations.
                            </p>
                        </div>
                        <div>
                            <strong style={{ color: textColor }}>2. Investissement (I)</strong>
                            <p style={{ color: secondaryColor }}>
                                Dépenses des entreprises en capital productif. Sensible au taux d'intérêt et aux anticipations de profit.
                            </p>
                        </div>
                        <div>
                            <strong style={{ color: textColor }}>3. Dépenses publiques (G)</strong>
                            <p style={{ color: secondaryColor }}>
                                Achats de biens et services par l'État. Variable de politique budgétaire.
                            </p>
                        </div>
                        <div>
                            <strong style={{ color: textColor }}>4. Exportations nettes (X - M)</strong>
                            <p style={{ color: secondaryColor }}>
                                Différence entre exportations et importations. Dépend du taux de change et de la compétitivité.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl border" style={{ background: bgSoft, borderColor }}>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">📐</span>
                            <div className="flex-1">
                                <div className="font-semibold mb-2" style={{ color: textColor }}>ÉQUATION</div>
                                <div className="font-mono text-lg p-3 rounded" style={{ background: readingMode === "paper" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", color: textColor }}>
                                    AD = C + I + G + (X - M)
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold mt-10" style={{ color: textColor }}>
                        2️⃣ L'OFFRE AGRÉGÉE (AS)
                    </h2>

                    <p style={{ color: textColor }}>
                        L'offre agrégée représente la quantité totale de biens et services que les entreprises sont prêtes à produire à chaque niveau de prix. On distingue deux horizons temporels :
                    </p>

                    <h3 className="text-xl font-semibold mt-6" style={{ color: textColor }}>
                        Court terme : AS rigide
                    </h3>

                    <p style={{ color: textColor }}>
                        À court terme, les salaires et certains prix sont rigides (contrats, conventions). Les entreprises ajustent leur production en fonction de la demande sans modifier immédiatement les prix. La courbe AS de court terme est relativement plate.
                    </p>

                    <h3 className="text-xl font-semibold mt-6" style={{ color: textColor }}>
                        Long terme : AS verticale
                    </h3>

                    <p style={{ color: textColor }}>
                        À long terme, tous les prix et salaires sont flexibles. L'économie produit à son niveau potentiel (plein emploi des facteurs). La courbe AS de long terme est verticale au niveau du PIB potentiel.
                    </p>

                    <div className="p-5 rounded-xl border" style={{ background: bgSoft, borderColor }}>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⚠️</span>
                            <div>
                                <div className="font-semibold mb-2" style={{ color: textColor }}>POINT CLÉ</div>
                                <p style={{ color: secondaryColor }}>
                                    Le PIB potentiel (Y*) est déterminé par les facteurs de production disponibles (capital, travail, technologie) et non par le niveau des prix. C'est la capacité productive maximale de l'économie.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold mt-10" style={{ color: textColor }}>
                        3️⃣ ÉQUILIBRE ET CHOCS
                    </h2>

                    <p style={{ color: textColor }}>
                        L'équilibre macroéconomique se situe à l'intersection des courbes AS et AD. Cet équilibre détermine simultanément le niveau de production (Y) et le niveau général des prix (P).
                    </p>

                    <h3 className="text-xl font-semibold mt-6" style={{ color: textColor }}>
                        Choc de demande
                    </h3>

                    <p style={{ color: textColor }}>
                        Une augmentation de la demande agrégée (politique budgétaire expansionniste, hausse de la confiance) déplace la courbe AD vers la droite. À court terme : hausse de Y et de P. À long terme : seul P augmente, Y revient à Y*.
                    </p>

                    <h3 className="text-xl font-semibold mt-6" style={{ color: textColor }}>
                        Choc d'offre
                    </h3>

                    <p style={{ color: textColor }}>
                        Un choc d'offre négatif (hausse du prix du pétrole, catastrophe naturelle) déplace la courbe AS vers la gauche. Résultat : stagflation (baisse de Y et hausse de P simultanées).
                    </p>
                </section>

                {/* Applications */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold mt-10" style={{ color: textColor }}>
                        4️⃣ APPLICATIONS PRATIQUES
                    </h2>

                    <div className="p-5 rounded-xl border" style={{ background: bgSoft, borderColor }}>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">💼</span>
                            <div>
                                <div className="font-semibold mb-2" style={{ color: textColor }}>EXEMPLE : CRISE COVID-19</div>
                                <p style={{ color: secondaryColor }}>
                                    Le confinement a provoqué un double choc : choc d'offre négatif (fermeture des entreprises) et choc de demande négatif (baisse de la consommation). Les politiques budgétaires massives ont soutenu la demande pour limiter la récession.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p style={{ color: textColor }}>
                        Le modèle AS-AD permet d'analyser les effets des politiques économiques et des chocs exogènes sur l'activité et l'inflation. C'est un outil central pour comprendre les cycles économiques et guider les décisions de politique macroéconomique.
                    </p>
                </section>
            </article>
        </div>
    );
}
