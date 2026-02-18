import { useState } from 'react';
import { Zap, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';

export default function RevisionIntensive() {
  const [view, setView] = useState<'theme1' | 'theme2'>('theme1');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Révision"
        title="Révision Intensive"
        description="Synthèse des concepts clés pour le partiel - Thèmes 1 et 2"
      />

      {/* Toggle thème */}
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-[var(--color-bg-overlay)] rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setView('theme1')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'theme1'
              ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] shadow-sm'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Thème 1</span>
        </button>
        <button
          onClick={() => setView('theme2')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'theme2'
              ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] shadow-sm'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
        >
          <Zap className="w-4 h-4" />
          <span>Thème 2</span>
        </button>
      </div>


      {/* THÈME 1 */}
      {view === 'theme1' && (
        <>
          <Section title="Thème 1 : Histoire de la pensée sociologique">
            {/* Définitions */}
            <AuthorCard
              name="Définitions de la sociologie"
              work="3 définitions à connaître"
              color="indigo"
              hideAvatar
            >
              <div className="space-y-2">
                <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                  <strong className="text-[var(--color-accent)]">Jaya</strong>
                  <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm">Ensemble des recherches positives sur l'organisation et le fonctionnement des sociétés.</p>
                </div>
                <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                  <strong className="text-[var(--color-accent)]">Ferréol & Noreck</strong>
                  <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm">Projet d'analyse "objective" des faits sociaux.</p>
                </div>
                <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                  <strong className="text-[var(--color-info)]">Berthelot</strong>
                  <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm">Entreprise de connaissance scientifique du social.</p>
                </div>
              </div>
            </AuthorCard>

            {/* Précurseurs */}
            <AuthorCard
              name="Précurseurs à retenir"
              work="De l'Antiquité aux Lumières"
              color="violet"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm">Platon</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Conception organique et fonctionnaliste (3 groupes)</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Aristote</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">"L'homme est un animal politique"</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Ibn Khaldoun</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Théorie cyclique, cohésion sociale</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                  <p className="font-semibold text-[var(--color-text-secondary)] text-sm">Hobbes</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Contrat social, état de nature violent</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Rousseau</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Contrat social, état de nature paisible</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Montesquieu</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Lettres persanes, critique sociale</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚔️ Durkheim vs Weber (ESSENTIEL)">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Aspect</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-error)] border border-[var(--color-border-default)]">Durkheim</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-accent)] border border-[var(--color-border-default)]">Weber</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Objectif</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-error)]">Expliquer</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-accent)]">Comprendre</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Objet</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-error)]">Fait social</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-accent)]">Action sociale</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Méthode</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-error)]">Statistiques</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-accent)]">Idéaux-types</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Niveau</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-error)]">Macro (holisme)</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-accent)]">Micro (individualisme)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Individu</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-error)]">Déterminisme social</td>
                    <td className="p-3 border border-[var(--color-border-default)] text-[var(--color-accent)]">Autonomie de l'acteur</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4 types de suicide */}
            <AuthorCard
              name="Durkheim : Les 4 types de suicide"
              work="Intégration et régulation"
              color="rose"
              hideAvatar
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Altruiste</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Intégration forte</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ex: kamikazes</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                  <p className="font-semibold text-[var(--color-text-secondary)] text-sm">Égoïste</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Intégration faible</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ex: célibataires</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Fataliste</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Régulation forte</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ex: mariage forcé</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Anomique</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Régulation faible</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ex: crise 1929</p>
                </div>
              </div>
            </AuthorCard>
          </Section>


          <Section title="École de Chicago & Sociologie contemporaine">
            <AuthorCard
              name="Goffman"
              work="Dramaturgie sociale"
              color="amber"
              hideAvatar
            >
              <p className="text-sm mb-2">Vie sociale = <strong>jeu de rôle</strong>. Identité virtuelle vs réelle.</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Stigmates = attributs socialement disqualifiants.</p>
            </AuthorCard>

            <AuthorCard
              name="Becker"
              work="Théorie de la déviance"
              color="rose"
              hideAvatar
            >
              <p className="text-sm mb-2">On ne naît pas déviant, on le devient par <strong>étiquetage</strong>.</p>
              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                <p className="font-medium text-[var(--color-error)] text-xs mb-1">4 étapes :</p>
                <p className="text-xs text-[var(--color-text-secondary)]">1. Transgression → 2. Apprentissage → 3. Désignation publique → 4. Affiliation</p>
              </div>
            </AuthorCard>

            {/* Bourdieu vs Lahire */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AuthorCard
                name="Bourdieu"
                work="Reproduction sociale"
                color="violet"
                hideAvatar
              >
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• 3 capitaux : économique, culturel, social</li>
                  <li>• <strong>Habitus unique</strong> de classe</li>
                  <li>• École = reproduction des inégalités</li>
                </ul>
              </AuthorCard>
              <AuthorCard
                name="Lahire"
                work="Critique de Bourdieu"
                color="emerald"
                hideAvatar
              >
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Homme pluriel</strong></li>
                  <li>• Habitus contradictoires selon contextes</li>
                  <li>• École = ascension sociale possible</li>
                </ul>
              </AuthorCard>
            </div>
          </Section>

          <Callout type="key" title="À retenir Thème 1">
            Opposition <strong>Durkheim/Weber</strong> (expliquer vs comprendre). <strong>4 types de suicide</strong> (intégration/régulation).
            <strong>Becker</strong> : déviance par étiquetage. <strong>Bourdieu</strong> : habitus et capitaux. <strong>Lahire</strong> : homme pluriel.
          </Callout>
        </>
      )}

      {/* THÈME 2 */}
      {view === 'theme2' && (
        <>
          <Section title="Thème 2 : Sociologie économique">
            <AuthorCard
              name="Définition et naissance"
              work="Steiner, Polanyi"
              color="emerald"
              hideAvatar
            >
              <div className="space-y-2 mb-4">
                <div className="p-3 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                  <strong className="text-[var(--color-success)]">Steiner</strong>
                  <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm">"La sociologie économique étudie les faits économiques en les considérant comme des faits sociaux."</p>
                </div>
                <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                  <strong className="text-[var(--color-success)]">Polanyi</strong>
                  <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm">Notion d'<strong>encastrement</strong> : l'économie est encastrée dans le social.</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="La monnaie">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                <p className="font-semibold text-[var(--color-warning)] mb-2">Économistes</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Instrument des échanges</li>
                  <li>• <strong>Neutralité</strong> de la monnaie</li>
                  <li>• "Voile sur les échanges"</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                <p className="font-semibold text-[var(--color-accent)] mb-2">Sociologues</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Institution sociale</strong></li>
                  <li>• Construction collective</li>
                  <li>• Fondée sur la <strong>confiance</strong></li>
                </ul>
              </div>
            </div>

            <AuthorCard
              name="Auteurs clés"
              work="Simmel, Marx, Weber, Simiand"
              color="violet"
              hideAvatar
            >
              <div className="space-y-2">
                <div className="p-2 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-lg">
                  <strong className="text-[var(--color-accent)] text-sm">Simmel</strong> : Pouvoir d'attraction, effets sur les consciences
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-lg">
                  <strong className="text-[var(--color-error)] text-sm">Marx & Weber</strong> : Vision pessimiste, destruction du lien social
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-lg">
                  <strong className="text-[var(--color-success)] text-sm">Simiand</strong> : Critique TQM, fait social fondé sur croyances
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="La consommation">
            <AuthorCard
              name="Veblen"
              work="Consommation ostentatoire"
              color="amber"
              hideAvatar
            >
              <p className="text-sm mb-2">
                <strong>Effet Veblen</strong> (snobisme) : on désire des biens PARCE QUE leur prix est élevé.
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">Classe des loisirs : luxe, confort, temps improductif.</p>
            </AuthorCard>

            <AuthorCard
              name="Halbwachs"
              work="Classe ouvrière"
              color="sky"
              hideAvatar
            >
              <p className="text-sm">
                Incapacité <strong>matérielle et culturelle</strong> à participer à la vie sociale par la consommation.
                Critique de la loi d'Engel. Imitation des classes supérieures par le <strong>paraître</strong>.
              </p>
            </AuthorCard>

            <AuthorCard
              name="Société de consommation"
              work="Baudrillard, Marcuse, Debord"
              color="rose"
              hideAvatar
            >
              <div className="space-y-2">
                <div className="p-2 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-lg">
                  <strong className="text-[var(--color-error)] text-sm">Marcuse</strong> : <strong>Faux besoins</strong> fabriqués par rendement + publicité
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-lg">
                  <strong className="text-[var(--color-accent)] text-sm">Debord</strong> : Spectacle = religion de la marchandise
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-warning-subtle)]/50 to-transparent rounded-lg">
                  <strong className="text-[var(--color-warning)] text-sm">Adorno & Horkheimer</strong> : Dépravation de la culture
                </div>
              </div>
            </AuthorCard>
          </Section>


          <Section title="Le marché">
            <AuthorCard
              name="Vision sociologique"
              work="Institution sociale légitime"
              color="emerald"
              hideAvatar
            >
              <div className="p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)] mb-3">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Le marché est une <strong>institution sociale</strong> construite par la société.
                  Il doit être <strong>légitime</strong> (équité, pas seulement efficience).
                </p>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-lg">
                  <strong className="text-[var(--color-error)] text-sm">Polanyi</strong> : Pouvoir destructeur, "erreur économiste", encastrement
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-lg">
                  <strong className="text-[var(--color-success)] text-sm">Titmuss</strong> : Don du sang &gt; marché (sélection adverse, valeurs éthiques)
                </div>
                <div className="p-2 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-lg">
                  <strong className="text-[var(--color-accent)] text-sm">Bourdieu</strong> : Marché du logement, habitus de classe moyenne
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="Le travail">
            <AuthorCard
              name="Mayo"
              work="Expérience Hawthorne (1949)"
              color="amber"
              hideAvatar
            >
              <p className="text-sm mb-2">
                L'<strong>attention</strong> portée aux salariés (positive ou négative) augmente la productivité.
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">L'Homme n'est pas seulement économique : besoin de <strong>considération</strong>.</p>
            </AuthorCard>

            <AuthorCard
              name="Granovetter"
              work="Employabilité et réseau"
              color="emerald"
              hideAvatar
            >
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-lg text-center">
                  <p className="font-bold text-[var(--color-text-secondary)]">19%</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Démarche directe</p>
                </div>
                <div className="p-2 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-lg text-center">
                  <p className="font-bold text-[var(--color-text-secondary)]">6%</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Annonces</p>
                </div>
                <div className="p-2 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-lg text-center">
                  <p className="font-bold text-[var(--color-success)]">56%</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Contacts personnels</p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">Le <strong>réseau social</strong> est déterminant pour l'employabilité.</p>
            </AuthorCard>

            <AuthorCard
              name="Rifkin"
              work="La fin du travail"
              color="rose"
              hideAvatar
            >
              <p className="text-sm">
                Automatisation, IA → <strong>polarisation</strong> du marché du travail.
                <strong>Prosommateurs</strong> = producteurs/consommateurs. Économie du partage.
              </p>
            </AuthorCard>

            <AuthorCard
              name="McGregor"
              work="Théorie X vs Y"
              color="teal"
              hideAvatar
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Théorie X</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Homme paresseux, contrôle, cercle vicieux</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Théorie Y</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Travail enrichissant, cercle vertueux</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Callout type="key" title="À retenir Thème 2">
            <strong>Monnaie</strong> = institution sociale (Simiand). <strong>Veblen</strong> : effet de snobisme.
            <strong>Marcuse</strong> : faux besoins. <strong>Polanyi</strong> : encastrement. <strong>Granovetter</strong> : 56% contacts personnels.
            <strong>Mayo</strong> : effet Hawthorne.
          </Callout>
        </>
      )}

      {/* CTA */}
      <div className="mt-12 bg-linear-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-2xl p-8 text-[var(--color-bg-raised)] text-center shadow-xl">
        <h3 className="text-xl font-bold mb-2">Prêt à tester tes connaissances ?</h3>
        <p className="text-[var(--color-accent)] mb-6">Passe au QCM pour vérifier ta maîtrise des concepts</p>
        <Link
          to="/socio/qcm"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-raised)] text-[var(--color-accent)] rounded-xl font-semibold hover:bg-[var(--color-accent-subtle)] transition-colors no-underline shadow-lg"
        >
          Lancer le QCM
          <ArrowRight size={18} />
        </Link>
      </div>

      <ChapterNav
        prev={{ path: '/socio/chapitre10', label: '← Chapitre 10', title: 'Le travail' }}
        next={{ path: '/socio/qcm', label: 'QCM →', title: "QCM d'entraînement" }}
      />
    </main>
  );
}
