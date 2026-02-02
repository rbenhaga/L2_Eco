import { Check, Sparkles, Server, BookOpen, Bot, Globe, Wrench, Clock, CreditCard, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BackgroundBlobs } from "../components/layout/BackgroundBlobs";

export default function PricingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
            <BackgroundBlobs />

            <div className="relative" style={{ zIndex: 1 }}>
                <Header />

                {/* Hero */}
                <section className="py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-accent)' }}>
                            Tarifs S4
                        </p>
                        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-[-0.02em] mb-6" style={{ color: 'var(--color-text-primary)' }}>
                            Choisis ton rythme de paiement
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                            Accès complet à tous les contenus de la Licence Économie.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards - 3 columns */}
                <section className="pb-16 sm:pb-20">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                            {/* Free */}
                            <div className="rounded-2xl p-6 flex flex-col" style={{
                                background: 'var(--color-bg-raised)',
                                border: '1px solid var(--color-border-default)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Gratuit</h3>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Pour découvrir</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>0€</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {[
                                        "Premier chapitre de chaque matière",
                                        "QCM de découverte",
                                        "Fiches limitées",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }} />
                                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors"
                                    style={{
                                        background: 'var(--color-bg-overlay)',
                                        color: 'var(--color-text-secondary)',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                >
                                    Commencer gratuitement
                                </button>
                            </div>

                            {/* Monthly - SEPA */}
                            <div className="rounded-2xl p-6 flex flex-col" style={{
                                background: 'var(--color-bg-raised)',
                                border: '1px solid var(--color-border-default)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Mensuel</h3>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Prélèvement SEPA · 6 mois</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>3,99€</span>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>/ mois</span>
                                    </div>
                                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                        Soit 23,94€ au total
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 p-3 rounded-lg mb-4" style={{
                                    background: 'var(--color-macro-light)',
                                    border: '1px solid color-mix(in srgb, var(--color-macro) 15%, transparent)'
                                }}>
                                    <Building2 className="h-4 w-4" style={{ color: 'var(--color-macro)' }} />
                                    <span className="text-xs" style={{ color: 'var(--color-macro)' }}>RIB requis</span>
                                </div>

                                <div className="p-3 rounded-lg mb-6" style={{
                                    background: 'var(--color-warning-subtle)',
                                    border: '1px solid color-mix(in srgb, var(--color-warning) 20%, transparent)'
                                }}>
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--color-warning)' }} />
                                        <div>
                                            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>Offre limitée</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Jusqu'au 28 février</p>
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
                                            <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }} />
                                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-[10px] text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
                                    Premier prélèvement sous 5-7 jours
                                </p>

                                <button
                                    onClick={() => navigate("/subscription?plan=monthly")}
                                    className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white transition-colors"
                                    style={{ background: 'var(--color-text-primary)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    Choisir mensuel
                                </button>
                            </div>

                            {/* Semester - BEST VALUE */}
                            <div className="rounded-2xl p-8 relative flex flex-col" style={{
                                background: 'var(--color-bg-raised)',
                                border: '2px solid var(--color-accent)',
                                boxShadow: '0 4px 20px color-mix(in srgb, var(--color-accent) 15%, transparent)'
                            }}>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                                        style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-md)' }}>
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Meilleur prix
                                    </span>
                                </div>

                                <div className="mb-6 pt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Semestre</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                                            background: 'var(--color-success-subtle)',
                                            color: 'var(--color-success)'
                                        }}>-33%</span>
                                    </div>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Paiement unique par carte</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>15,99€</span>
                                        <span className="text-lg line-through" style={{ color: 'var(--color-text-muted)' }}>23,94€</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 rounded-lg mb-6" style={{
                                    background: 'var(--color-bg-overlay)',
                                }}>
                                    <CreditCard className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
                                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>CB · Accès immédiat</span>
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
                                            <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate("/subscription?plan=semester")}
                                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-colors"
                                    style={{
                                        background: 'var(--color-accent)',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-accent-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
                                >
                                    Choisir semestriel
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transparency Section */}
                <section className="py-16 sm:py-20 border-y" style={{
                    background: 'var(--color-bg-raised)',
                    borderColor: 'var(--color-border-default)'
                }}>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <h2 className="text-2xl font-semibold text-center mb-8" style={{ color: 'var(--color-text-primary)' }}>
                            À quoi sert votre abonnement ?
                        </h2>
                        <div className="space-y-4">
                            {[
                                { icon: Server, title: 'Hébergement & Infrastructure', desc: 'Serveurs pour stocker et servir tout le contenu (cours, QCM, vidéos, audios) de manière rapide et sécurisée.' },
                                { icon: BookOpen, title: 'Création & Maintenance du Contenu', desc: 'Rédaction, mise à jour et amélioration continue des cours, fiches, QCM et annales corrigés.' },
                                { icon: Bot, title: 'Intelligence Artificielle', desc: "Coût des API IA pour l'assistant chatbot, la génération d'audio, et les vidéos d'introduction." },
                                { icon: Globe, title: 'Noms de Domaine & SSL', desc: 'Frais annuels pour les noms de domaine et certificats SSL pour sécuriser vos données.' },
                                { icon: Wrench, title: 'Développement & Maintenance', desc: 'Amélioration continue de la plateforme, correction de bugs, et ajout de nouvelles fonctionnalités.' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="p-5 rounded-xl" style={{
                                    background: 'var(--color-bg-overlay)',
                                    border: '1px solid var(--color-border-default)'
                                }}>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                                        <Icon className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                        {title}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
                            100% de votre abonnement sert à maintenir et améliorer la plateforme. Aucun profit personnel, juste une plateforme pour les étudiants par les étudiants.
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
