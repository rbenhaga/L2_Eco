import { Check, Sparkles, Server, BookOpen, Bot, Globe, Wrench, Clock, CreditCard, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BackgroundBlobs } from "../components/layout/BackgroundBlobs";

export default function PricingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen antialiased relative" data-theme="light">
            <BackgroundBlobs />

            <div className="relative" style={{ zIndex: 1 }}>
                <Header />

                {/* Hero */}
                <section className="py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-4">
                            Tarifs S4
                        </p>
                        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-[-0.02em] mb-6 text-slate-900">
                            Choisis ton rythme de paiement
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Accès complet à tous les contenus de la Licence Économie.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards - 3 columns */}
                <section className="pb-16 sm:pb-20">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            
                            {/* Free */}
                            <div className="rounded-2xl p-6 bg-white/70 border border-black/5 backdrop-blur-sm flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900">Gratuit</h3>
                                    <p className="text-sm text-slate-600 mb-4">Pour découvrir</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight text-slate-900">0€</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {[
                                        "Premier chapitre de chaque matière",
                                        "QCM de découverte",
                                        "Fiches limitées",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                                            <span className="text-sm text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                >
                                    Commencer gratuitement
                                </button>
                            </div>

                            {/* Monthly - SEPA (middle, decoy) */}
                            <div className="rounded-2xl p-6 bg-white/70 border border-black/5 backdrop-blur-sm flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900">Mensuel</h3>
                                    <p className="text-sm text-slate-600 mb-4">Prélèvement SEPA · 6 mois</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight text-slate-900">3,99€</span>
                                        <span className="text-slate-600">/ mois</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Soit 23,94€ au total
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100 mb-4">
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs text-blue-700">RIB requis</span>
                                </div>

                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-6">
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold text-amber-800">Offre limitée</p>
                                            <p className="text-xs text-amber-700">Jusqu'au 28 février</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {[
                                        "Tout le contenu Premium",
                                        "Paiement étalé sur 6 mois",
                                        "Prélèvement tous les 31 jours",
                                        "Engagement 6 mois",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                                            <span className="text-sm text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-[10px] text-slate-500 text-center mb-3">
                                    Premier prélèvement sous 5-7 jours
                                </p>

                                <button
                                    onClick={() => navigate("/subscription?plan=monthly")}
                                    className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                                >
                                    Choisir mensuel
                                </button>
                            </div>

                            {/* Semester - BEST VALUE - HIGHLIGHTED */}
                            <div className="rounded-2xl p-8 bg-white border-2 border-indigo-500 shadow-[0_4px_20px_rgba(99,102,241,0.15)] relative flex flex-col">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-lg">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Meilleur prix
                                    </span>
                                </div>

                                <div className="mb-6 pt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-semibold text-slate-900">Semestre</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                                            -33%
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">Paiement unique par carte</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold tracking-tight text-slate-900">15,99€</span>
                                        <span className="text-lg text-slate-400 line-through">23,94€</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 mb-6">
                                    <CreditCard className="h-4 w-4 text-slate-500" />
                                    <span className="text-xs text-slate-600">CB · Accès immédiat</span>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {[
                                        "Tous les cours complets (8 matières)",
                                        "Toutes les fiches de synthèse",
                                        "QCM illimités (500+ questions)",
                                        "Annales d'examens corrigés",
                                        "Écoute audio des cours",
                                        "Assistant IA pour t'aider",
                                        "Vidéos intro de chaque chapitre",
                                        "Suivi de progression détaillé",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                                            <span className="text-sm text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate("/subscription?plan=semester")}
                                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
                                >
                                    Choisir semestriel
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Transparency Section */}
                <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm border-y border-black/5">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <h2 className="text-2xl font-semibold text-center mb-8 text-slate-900">
                            À quoi sert votre abonnement ?
                        </h2>
                        <div className="space-y-4">
                            <div className="p-5 rounded-xl bg-white/70 border border-black/5">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-900">
                                    <Server className="h-5 w-5 text-indigo-600" />
                                    Hébergement & Infrastructure
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Serveurs pour stocker et servir tout le contenu (cours, QCM, vidéos, audios) de manière rapide et sécurisée.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/70 border border-black/5">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-900">
                                    <BookOpen className="h-5 w-5 text-indigo-600" />
                                    Création & Maintenance du Contenu
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Rédaction, mise à jour et amélioration continue des cours, fiches, QCM et annales corrigés.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/70 border border-black/5">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-900">
                                    <Bot className="h-5 w-5 text-indigo-600" />
                                    Intelligence Artificielle
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Coût des API IA pour l'assistant chatbot, la génération d'audio, et les vidéos d'introduction.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/70 border border-black/5">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-900">
                                    <Globe className="h-5 w-5 text-indigo-600" />
                                    Noms de Domaine & SSL
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Frais annuels pour les noms de domaine et certificats SSL pour sécuriser vos données.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/70 border border-black/5">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-900">
                                    <Wrench className="h-5 w-5 text-indigo-600" />
                                    Développement & Maintenance
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Amélioration continue de la plateforme, correction de bugs, et ajout de nouvelles fonctionnalités.
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-sm text-slate-600 mt-8">
                            100% de votre abonnement sert à maintenir et améliorer la plateforme. Aucun profit personnel, juste une plateforme pour les étudiants par les étudiants. 💙
                        </p>
                    </div>
                </section>

                <div className="-mt-12 sm:-mt-20">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
