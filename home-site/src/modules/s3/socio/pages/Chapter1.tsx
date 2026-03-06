import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter1Questions } from '../data/questions';

export default function Chapter1() {
    const [view, setView] = useState<'quick' | 'full'>('full');

    return (
        <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
                number="Chapitre 01"
                title="Naissance de la sociologie"
                description="De l'Antiquité aux Lumières : les penseurs qui ont préparé l'émergence de la sociologie."
            />

            {/* Toggle version */}
            <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-[var(--color-bg-overlay)] rounded-xl w-full sm:w-fit">
                <button
                    onClick={() => setView('full')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'full'
                        ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] shadow-sm'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}
                >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Cours complet</span>
                    <span className="sm:hidden">Complet</span>
                </button>
                <button
                    onClick={() => setView('quick')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'quick'
                        ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] shadow-sm'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}
                >
                    <Zap className="w-4 h-4" />
                    <span>L'essentiel</span>
                </button>
            </div>

            {/* VERSION RAPIDE - L'ESSENTIEL POUR LA DISSERTATION */}
            {view === 'quick' && (
                <div className="space-y-5 sm:space-y-6">
                    {/* Thèse centrale */}
                    <div className="p-5 sm:p-7 bg-linear-to-br from-[var(--color-accent-subtle)] via-[var(--color-accent-subtle)] to-transparent rounded-2xl border border-[var(--color-accent)]">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-bg-raised)]" />
                            </div>
                            Thèse centrale du chapitre
                        </h3>
                        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
                            La sociologie naît progressivement grâce aux <strong>précurseurs</strong> de l'Antiquité aux Lumières.
                            Ces penseurs posent les bases de la réflexion sur la société, mais la sociologie comme
                            <strong> science autonome</strong> naît au XIXe siècle avec Auguste Comte.
                        </p>
                    </div>

                    {/* Les précurseurs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
                            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm flex items-center gap-2">
                                <span className="text-lg">🏛️</span> Platon
                            </h4>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                <strong>Vision organique et fonctionnaliste</strong>. Trois groupes :
                                les gouvernants, les gardiens, les producteurs. Défend l'éducation des femmes.
                            </p>
                        </div>

                        <div className="p-4 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
                            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm flex items-center gap-2">
                                <span className="text-lg">🏛️</span> Aristote
                            </h4>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                <strong>"L'homme est un animal politique"</strong>.
                                La politique a un rôle central dans l'organisation de la société.
                            </p>
                        </div>

                        <div className="p-4 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
                            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm flex items-center gap-2">
                                <span className="text-lg">📚</span> Ibn Khaldoun
                            </h4>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                Première <strong>analyse scientifique</strong> de la société.
                                <strong>Théorie cyclique</strong> : simplicité → prospérité → décadence → renouveau.
                            </p>
                        </div>

                        <div className="p-4 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
                            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm flex items-center gap-2">
                                <span className="text-lg">👑</span> Hobbes
                            </h4>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                <strong>Contrat social</strong>. État de nature = conflit permanent.
                                Les hommes ne sont pas naturellement sociaux.
                            </p>
                        </div>
                    </div>

                    {/* Les Lumières */}
                    <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent border border-[var(--color-accent)] rounded-2xl">
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
                            <span className="text-lg">💡</span> Les Lumières : naissance de la pensée sociologique
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                            <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                                <p className="font-semibold text-[var(--color-text-primary)] mb-1">Rousseau</p>
                                <p className="text-xs text-[var(--color-text-secondary)]">État de nature <strong>paisible</strong>. Propriété privée source d'inégalités.</p>
                            </div>
                            <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                                <p className="font-semibold text-[var(--color-text-primary)] mb-1">Montesquieu</p>
                                <p className="text-xs text-[var(--color-text-secondary)]">Méthode comparative. <strong>Typologies</strong>. Critique sociale.</p>
                            </div>
                            <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                                <p className="font-semibold text-[var(--color-text-primary)] mb-1">Voltaire</p>
                                <p className="text-xs text-[var(--color-text-secondary)]">Critique des institutions. <strong>Relativisme culturel</strong>. Progrès social.</p>
                            </div>
                        </div>
                    </div>

                    {/* Piège */}
                    <Callout type="warning" title="⚠️ Piège à éviter">
                        Ces penseurs ne sont <strong>PAS des sociologues</strong> mais des <strong>précurseurs</strong>.
                        Pas de méthode scientifique rigoureuse, pas de discipline autonome. La sociologie comme science
                        naît au XIXe avec Auguste Comte.
                    </Callout>

                    <button
                        onClick={() => setView('full')}
                        className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent)] text-sm font-medium transition-colors"
                    >
                        Voir le cours complet <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* VERSION COMPLÈTE */}
            {view === 'full' && (
                <>
                    <Section title="Introduction : De l'Antiquité aux Lumières">
                        <p className="mb-4 text-[var(--color-text-secondary)]">
                            La sociologie comme <strong>science autonome</strong> naît au XIXe siècle, mais ses racines remontent
                            à l'Antiquité. De nombreux penseurs ont préparé son émergence en réfléchissant sur l'organisation
                            de la société.
                        </p>

                        <Callout type="key" title="À retenir">
                            Ces penseurs ne sont <strong>PAS des sociologues</strong> mais des <strong>précurseurs</strong>.
                            La sociologie comme discipline scientifique naîtra avec <strong>Auguste Comte</strong>,
                            puis se développera avec <strong>Durkheim et Weber</strong>.
                        </Callout>
                    </Section>

                    <Section title="I. L'Antiquité grecque">
                        <AuthorCard
                            name="Platon"
                            dates="428-348 av. J.-C."
                            work="La République, Les Lois, Le Politique"
                            color="blue"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg/500px-Plato_Silanion_Musei_Capitolini_MC1377.jpg"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Dans La République, Les Lois et Le Politique, Platon identifie <strong>trois groupes</strong> dans la cité grecque
                                et développe une <strong>vision organique et fonctionnaliste</strong>.
                            </p>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                                    <p className="font-bold text-[var(--color-info)]">Gouvernants</p>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Direction politique</p>
                                </div>
                                <div className="text-center p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                                    <p className="font-bold text-[var(--color-success)]">Gardiens</p>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Protection militaire</p>
                                </div>
                                <div className="text-center p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                                    <p className="font-bold text-[var(--color-warning)]">Producteurs</p>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Activité économique</p>
                                </div>
                            </div>

                            <Callout type="key" title="Vision organique">
                                La cité fonctionne comme un <strong>organisme vivant</strong>.
                                Chaque groupe a une fonction complémentaire.
                                L'ordre social repose sur la <strong>complémentarité</strong>.
                            </Callout>

                            <div className="mt-4 p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Innovation sociale :</p>
                                <p className="text-xs text-[var(--color-text-secondary)]">
                                    Platon défend l'<strong>éducation des femmes</strong>,
                                    vision égalitaire remarquable pour une société patriarcale.
                                </p>
                            </div>
                        </AuthorCard>

                        <AuthorCard
                            name="Aristote"
                            dates="384-322 av. J.-C."
                            work="La Politique"
                            color="emerald"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg"
                        >
                            <blockquote className="text-base italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-success)] pl-4 mb-4">
                                "L'homme est un animal politique"
                            </blockquote>

                            <p className="text-sm sm:text-base mb-4">
                                Cette formule célèbre exprime <strong>deux idées fondamentales</strong> :
                            </p>

                            <ul className="space-y-2 text-sm sm:text-base mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-subtle)]0 mt-2 shrink-0" />
                                    <span>La <strong>politique</strong> a un rôle central dans l'organisation de la société</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-subtle)]0 mt-2 shrink-0" />
                                    <span>L'Homme ne peut pas vivre en dehors des <strong>relations sociales</strong></span>
                                </li>
                            </ul>
                        </AuthorCard>
                    </Section>

                    <Section title="II. Ibn Khaldoun : première analyse scientifique">
                        <AuthorCard
                            name="Ibn Khaldoun"
                            dates="1332-1406"
                            work="Muqaddima (Prolégomènes)"
                            color="amber"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bust_of_Ibn_Khaldun_%28Casbah_of_Bejaia%2C_Algeria%29.jpg/500px-Bust_of_Ibn_Khaldun_%28Casbah_of_Bejaia%2C_Algeria%29.jpg"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Ibn Khaldoun écrit la <strong>Muqaddima</strong>, un texte fondateur.
                                Il pose les bases d'une première <strong>analyse scientifique</strong> de la société
                                avec une méthode empirique : terrain et récolte de données.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)]">
                                    <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Sociétés nomades</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">
                                        Rudesse, simplicité, <strong>forte solidarité</strong>
                                    </p>
                                </div>
                                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)]">
                                    <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Sociétés sédentaires</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">
                                        Richesse, mais aussi <strong>inégalités</strong> et déclin de la cohésion
                                    </p>
                                </div>
                            </div>

                            <Callout type="key" title="Théorie cyclique">
                                <strong>Simplicité et solidarité</strong> → Prospérité → <strong>Luxe et décadence</strong> →
                                Remplacement par de nouvelles sociétés nomades → Le cycle recommence.
                            </Callout>

                            <div className="mt-4 p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Apports majeurs :</p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>• La société <strong>évolue</strong>, elle n'est pas statique</li>
                                    <li>• Anticipe des concepts modernes : cohésion sociale, lutte des classes, dynamiques de pouvoir</li>
                                    <li>• Méthode empirique et comparative</li>
                                </ul>
                            </div>
                        </AuthorCard>
                    </Section>

                    <Section title="III. Thomas Hobbes : le contrat social">
                        <AuthorCard
                            name="Thomas Hobbes"
                            dates="1588-1679"
                            work="Le Léviathan"
                            color="slate"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Thomas_Hobbes_%28portrait%29.jpg/220px-Thomas_Hobbes_%28portrait%29.jpg"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Thomas Hobbes écrit <strong>Le Léviathan</strong>.
                                Il pose les bases du <strong>contrat social</strong> pour justifier l'autorité royale.
                                Son raisonnement suit un mécanisme en trois étapes :
                            </p>

                            <div className="space-y-3 mb-4">
                                <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                                    <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">1. État de nature</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">Conflit permanent, "guerre de tous contre tous"</p>
                                </div>
                                <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                                    <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">2. Contrat social</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">Les hommes renoncent à leur liberté naturelle</p>
                                </div>
                                <div className="p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                                    <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">3. Souverain</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">Devient le garant de la paix et de l'ordre</p>
                                </div>
                            </div>

                            <Callout type="key" title="Concept fondamental">
                                Les hommes ne sont <strong>PAS naturellement sociaux</strong>.
                                La société est le produit d'un <strong>contrat social</strong> nécessaire pour éviter le chaos.
                            </Callout>
                        </AuthorCard>
                    </Section>

                    <Section title="IV. Les Lumières : naissance de la pensée sociologique">
                        <p className="mb-5 text-[var(--color-text-secondary)]">
                            Selon Raymond Aron, c'est au <strong>siècle des Lumières</strong> que naît véritablement la pensée sociologique.
                        </p>

                        <AuthorCard
                            name="Jean-Jacques Rousseau"
                            dates="1712-1778"
                            work="Du contrat social, Discours sur l'inégalité"
                            color="emerald"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg/220px-Jean-Jacques_Rousseau_%28painted_portrait%29.jpg"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Dans Du contrat social, Rousseau s'oppose à Hobbes sur la nature humaine :
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="text-center p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                                    <p className="font-bold text-[var(--color-error)]">Hobbes</p>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">État de nature <strong>violent</strong></p>
                                </div>
                                <div className="text-center p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                                    <p className="font-bold text-[var(--color-success)]">Rousseau</p>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">État de nature <strong>paisible</strong></p>
                                </div>
                            </div>

                            <Callout type="key" title="Thèse de Rousseau">
                                C'est la <strong>propriété privée</strong> qui introduit les inégalités et les conflits.
                                La coopération sociale n'est pas naturelle (parabole des chasseurs).
                            </Callout>
                        </AuthorCard>

                        <AuthorCard
                            name="Montesquieu"
                            dates="1689-1755"
                            work="De l'esprit des lois, Lettres persanes"
                            color="indigo"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Montesquieu_1.png/500px-Montesquieu_1.png"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Dans De l'esprit des lois, Montesquieu apporte des <strong>contributions méthodologiques majeures</strong> :
                            </p>

                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                                    <span>La diversité des sociétés s'explique par l'<strong>adaptation aux circonstances</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                                    <span>Un phénomène social s'explique par une <strong>multitude de causes</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                                    <span>Méthode basée sur l'élaboration de <strong>typologies</strong></span>
                                </li>
                            </ul>

                            <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Critique sociale (Lettres persanes) :</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p>• Absolutisme monarchique</p>
                                        <p>• Église</p>
                                        <p>• Mœurs parisiennes</p>
                                    </div>
                                    <div>
                                        <p>• Justice influencée par le statut</p>
                                        <p>• Hiérarchies sociales</p>
                                        <p>• Condition des femmes</p>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">→ L'oppression est universelle</p>
                            </div>
                        </AuthorCard>

                        <AuthorCard
                            name="Voltaire"
                            dates="1694-1778"
                            work="Candide, Traité sur la tolérance"
                            color="amber"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_Mus%C3%A9e_Carnavalet_-_2.jpg/250px-Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_Mus%C3%A9e_Carnavalet_-_2.jpg"
                        >
                            <p className="text-sm sm:text-base mb-4">
                                Dans Candide, Voltaire critique les institutions sociales et religieuses, défend le progrès social :
                            </p>

                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning-subtle)]0 mt-2 shrink-0" />
                                    <span>Montre comment les structures sociales <strong>maintiennent les inégalités</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning-subtle)]0 mt-2 shrink-0" />
                                    <span>Défend le <strong>relativisme culturel</strong> et la tolérance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning-subtle)]0 mt-2 shrink-0" />
                                    <span>Défend la <strong>liberté individuelle</strong> et la justice sociale</span>
                                </li>
                            </ul>

                            <Callout type="key">
                                La <strong>raison et l'éducation</strong> permettent le progrès social.
                                Ces idées préparent la <strong>Révolution française</strong>.
                            </Callout>
                        </AuthorCard>
                    </Section>

                    <Section title="⚠️ Conclusion : Précurseurs, pas sociologues">
                        <Callout type="warning" title="Piège à éviter">
                            Ces penseurs ne sont <strong>PAS des sociologues</strong> mais des <strong>précurseurs</strong>.
                            Ils n'ont pas de méthode scientifique rigoureuse ni de discipline autonome.
                        </Callout>

                        <div className="mt-4">
                            <Callout type="key" title="À retenir">
                                La sociologie comme <strong>science autonome</strong> naît au XIXe siècle avec <strong>Auguste Comte</strong>,
                                puis se développe avec <strong>Durkheim et Weber</strong> qui établissent ses méthodes scientifiques.
                            </Callout>
                        </div>
                    </Section>
                </>
            )}

            <ChapterQCM chapter={1} title="Naissance de la sociologie" questions={chapter1Questions} />

            <ChapterNav
                prev={{ path: '/socio', label: '← Accueil', title: 'Sociologie' }}
                next={{ path: '/socio/chapitre2', label: 'Chapitre suivant →', title: 'Contexte d\'émergence' }}
            />
        </main>
    );
}

