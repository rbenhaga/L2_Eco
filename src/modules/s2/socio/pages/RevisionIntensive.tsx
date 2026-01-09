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
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-slate-100 rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setView('theme1')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'theme1'
            ? 'bg-white dark:bg-slate-900/80 text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Thème 1</span>
        </button>
        <button
          onClick={() => setView('theme2')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${view === 'theme2'
            ? 'bg-white dark:bg-slate-900/80 text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
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
                <div className="p-3 bg-linear-to-r from-indigo-50 to-transparent rounded-xl border-l-3 border-indigo-400">
                  <strong className="text-indigo-700">Jaya</strong>
                  <p className="text-slate-600 text-xs sm:text-sm">Ensemble des recherches positives sur l'organisation et le fonctionnement des sociétés.</p>
                </div>
                <div className="p-3 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                  <strong className="text-violet-700">Ferréol & Noreck</strong>
                  <p className="text-slate-600 text-xs sm:text-sm">Projet d'analyse "objective" des faits sociaux.</p>
                </div>
                <div className="p-3 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                  <strong className="text-sky-700">Berthelot</strong>
                  <p className="text-slate-600 text-xs sm:text-sm">Entreprise de connaissance scientifique du social.</p>
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
                <div className="p-3 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                  <p className="font-semibold text-violet-700 text-sm">Platon</p>
                  <p className="text-xs text-slate-600">Conception organique et fonctionnaliste (3 groupes)</p>
                </div>
                <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100">
                  <p className="font-semibold text-sky-700 text-sm">Aristote</p>
                  <p className="text-xs text-slate-600">"L'homme est un animal politique"</p>
                </div>
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100">
                  <p className="font-semibold text-emerald-700 text-sm">Ibn Khaldoun</p>
                  <p className="text-xs text-slate-600">Théorie cyclique, cohésion sociale</p>
                </div>
                <div className="p-3 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-xl border border-slate-200">
                  <p className="font-semibold text-slate-700 text-sm">Hobbes</p>
                  <p className="text-xs text-slate-600">Contrat social, état de nature violent</p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">Rousseau</p>
                  <p className="text-xs text-slate-600">Contrat social, état de nature paisible</p>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">Montesquieu</p>
                  <p className="text-xs text-slate-600">Lettres persanes, critique sociale</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚔️ Durkheim vs Weber (ESSENTIEL)">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Aspect</th>
                    <th className="p-3 text-left font-semibold text-rose-700 border border-slate-200">Durkheim</th>
                    <th className="p-3 text-left font-semibold text-violet-700 border border-slate-200">Weber</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Objectif</td>
                    <td className="p-3 border border-slate-200 text-rose-800">Expliquer</td>
                    <td className="p-3 border border-slate-200 text-violet-800">Comprendre</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Objet</td>
                    <td className="p-3 border border-slate-200 text-rose-800">Fait social</td>
                    <td className="p-3 border border-slate-200 text-violet-800">Action sociale</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Méthode</td>
                    <td className="p-3 border border-slate-200 text-rose-800">Statistiques</td>
                    <td className="p-3 border border-slate-200 text-violet-800">Idéaux-types</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Niveau</td>
                    <td className="p-3 border border-slate-200 text-rose-800">Macro (holisme)</td>
                    <td className="p-3 border border-slate-200 text-violet-800">Micro (individualisme)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Individu</td>
                    <td className="p-3 border border-slate-200 text-rose-800">Déterminisme social</td>
                    <td className="p-3 border border-slate-200 text-violet-800">Autonomie de l'acteur</td>
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
                <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100">
                  <p className="font-semibold text-sky-700 text-sm">Altruiste</p>
                  <p className="text-xs text-slate-500">Intégration forte</p>
                  <p className="text-xs text-slate-600">Ex: kamikazes</p>
                </div>
                <div className="p-3 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-xl border border-slate-200">
                  <p className="font-semibold text-slate-700 text-sm">Égoïste</p>
                  <p className="text-xs text-slate-500">Intégration faible</p>
                  <p className="text-xs text-slate-600">Ex: célibataires</p>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">Fataliste</p>
                  <p className="text-xs text-slate-500">Régulation forte</p>
                  <p className="text-xs text-slate-600">Ex: mariage forcé</p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">Anomique</p>
                  <p className="text-xs text-slate-500">Régulation faible</p>
                  <p className="text-xs text-slate-600">Ex: crise 1929</p>
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
              <p className="text-xs text-slate-600">Stigmates = attributs socialement disqualifiants.</p>
            </AuthorCard>

            <AuthorCard
              name="Becker"
              work="Théorie de la déviance"
              color="rose"
              hideAvatar
            >
              <p className="text-sm mb-2">On ne naît pas déviant, on le devient par <strong>étiquetage</strong>.</p>
              <div className="p-3 bg-linear-to-r from-rose-50/50 to-transparent rounded-xl border border-rose-100">
                <p className="font-medium text-rose-900 text-xs mb-1">4 étapes :</p>
                <p className="text-xs text-slate-600">1. Transgression → 2. Apprentissage → 3. Désignation publique → 4. Affiliation</p>
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
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
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
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
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
                <div className="p-3 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                  <strong className="text-emerald-700">Steiner</strong>
                  <p className="text-slate-600 text-xs sm:text-sm">"La sociologie économique étudie les faits économiques en les considérant comme des faits sociaux."</p>
                </div>
                <div className="p-3 bg-linear-to-r from-teal-50 to-transparent rounded-xl border-l-3 border-teal-400">
                  <strong className="text-teal-700">Polanyi</strong>
                  <p className="text-slate-600 text-xs sm:text-sm">Notion d'<strong>encastrement</strong> : l'économie est encastrée dans le social.</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="La monnaie">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-700 mb-2">Économistes</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Instrument des échanges</li>
                  <li>• <strong>Neutralité</strong> de la monnaie</li>
                  <li>• "Voile sur les échanges"</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                <p className="font-semibold text-violet-700 mb-2">Sociologues</p>
                <ul className="text-xs text-slate-600 space-y-1">
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
                <div className="p-2 bg-linear-to-r from-violet-50/50 to-transparent rounded-lg">
                  <strong className="text-violet-700 text-sm">Simmel</strong> : Pouvoir d'attraction, effets sur les consciences
                </div>
                <div className="p-2 bg-linear-to-r from-rose-50/50 to-transparent rounded-lg">
                  <strong className="text-rose-700 text-sm">Marx & Weber</strong> : Vision pessimiste, destruction du lien social
                </div>
                <div className="p-2 bg-linear-to-r from-emerald-50/50 to-transparent rounded-lg">
                  <strong className="text-emerald-700 text-sm">Simiand</strong> : Critique TQM, fait social fondé sur croyances
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
              <p className="text-xs text-slate-600">Classe des loisirs : luxe, confort, temps improductif.</p>
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
                <div className="p-2 bg-linear-to-r from-rose-50/50 to-transparent rounded-lg">
                  <strong className="text-rose-700 text-sm">Marcuse</strong> : <strong>Faux besoins</strong> fabriqués par rendement + publicité
                </div>
                <div className="p-2 bg-linear-to-r from-violet-50/50 to-transparent rounded-lg">
                  <strong className="text-violet-700 text-sm">Debord</strong> : Spectacle = religion de la marchandise
                </div>
                <div className="p-2 bg-linear-to-r from-amber-50/50 to-transparent rounded-lg">
                  <strong className="text-amber-700 text-sm">Adorno & Horkheimer</strong> : Dépravation de la culture
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
              <div className="p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100 mb-3">
                <p className="text-sm text-slate-700">
                  Le marché est une <strong>institution sociale</strong> construite par la société.
                  Il doit être <strong>légitime</strong> (équité, pas seulement efficience).
                </p>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-linear-to-r from-rose-50/50 to-transparent rounded-lg">
                  <strong className="text-rose-700 text-sm">Polanyi</strong> : Pouvoir destructeur, "erreur économiste", encastrement
                </div>
                <div className="p-2 bg-linear-to-r from-teal-50/50 to-transparent rounded-lg">
                  <strong className="text-teal-700 text-sm">Titmuss</strong> : Don du sang &gt; marché (sélection adverse, valeurs éthiques)
                </div>
                <div className="p-2 bg-linear-to-r from-violet-50/50 to-transparent rounded-lg">
                  <strong className="text-violet-700 text-sm">Bourdieu</strong> : Marché du logement, habitus de classe moyenne
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
              <p className="text-xs text-slate-600">L'Homme n'est pas seulement économique : besoin de <strong>considération</strong>.</p>
            </AuthorCard>

            <AuthorCard
              name="Granovetter"
              work="Employabilité et réseau"
              color="emerald"
              hideAvatar
            >
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-lg text-center">
                  <p className="font-bold text-slate-700">19%</p>
                  <p className="text-xs text-slate-500">Démarche directe</p>
                </div>
                <div className="p-2 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-lg text-center">
                  <p className="font-bold text-slate-700">6%</p>
                  <p className="text-xs text-slate-500">Annonces</p>
                </div>
                <div className="p-2 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-lg text-center">
                  <p className="font-bold text-emerald-700">56%</p>
                  <p className="text-xs text-slate-500">Contacts personnels</p>
                </div>
              </div>
              <p className="text-xs text-slate-600">Le <strong>réseau social</strong> est déterminant pour l'employabilité.</p>
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
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">Théorie X</p>
                  <p className="text-xs text-slate-600">Homme paresseux, contrôle, cercle vicieux</p>
                </div>
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100">
                  <p className="font-semibold text-emerald-700 text-sm">Théorie Y</p>
                  <p className="text-xs text-slate-600">Travail enrichissant, cercle vertueux</p>
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
      <div className="mt-12 bg-linear-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl">
        <h3 className="text-xl font-bold mb-2">Prêt à tester tes connaissances ?</h3>
        <p className="text-violet-100 mb-6">Passe au QCM pour vérifier ta maîtrise des concepts</p>
        <Link
          to="/socio/qcm"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900/80 text-violet-700 rounded-xl font-semibold hover:bg-violet-50 transition-colors no-underline shadow-lg"
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
