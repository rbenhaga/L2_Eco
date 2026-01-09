import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter9Questions } from '../data/questions';

export default function Chapter9() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 09"
        title="Le marché dans la sociologie économique"
        description="Construction sociale du marché, légitimité et analyse sociologique des marchés."
      />

      {/* Toggle version */}
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-slate-100 rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setView('full')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            view === 'full' 
              ? 'bg-white dark:bg-slate-900/80 text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Cours complet</span>
          <span className="sm:hidden">Complet</span>
        </button>
        <button
          onClick={() => setView('quick')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            view === 'quick' 
              ? 'bg-white dark:bg-slate-900/80 text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>L'essentiel</span>
        </button>
      </div>

      {/* VERSION RAPIDE - L'ESSENTIEL */}
      {view === 'quick' && (
        <div className="space-y-5 sm:space-y-6">
          {/* Thèse centrale */}
          <div className="p-5 sm:p-7 bg-linear-to-br from-indigo-50 via-violet-50/50 to-slate-50 rounded-2xl border border-indigo-100/80">
            <h3 className="font-semibold text-slate-900 mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              Thèse centrale du chapitre
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Le marché n'est pas qu'un mécanisme économique d'offre et demande. C'est une <strong>institution sociale</strong> 
              construite par la société. Son émergence dépend de facteurs <strong>culturels, politiques et relationnels</strong>. 
              Un marché ne peut être efficient que s'il est <strong>légitime</strong>.
            </p>
          </div>

          {/* Opposition économistes vs sociologues */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-rose-50/50 to-amber-50/30 border border-rose-100 rounded-2xl">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Opposition : Économistes vs Sociologues
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-amber-700 mb-2">Économistes (néoclassiques)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Marché = <strong>O/D</strong>, équilibre</li>
                  <li>• Acteurs <strong>a-sociaux</strong></li>
                  <li>• <strong>Autorégulation</strong> par les prix</li>
                  <li>• Comportement <strong>maximisateur</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-violet-700 mb-2">Sociologues</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Marché = <strong>institution sociale</strong></li>
                  <li>• <strong>Construit</strong> par la société</li>
                  <li>• Doit être <strong>légitime</strong></li>
                  <li>• Facteurs culturels, politiques</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Auteurs à maîtriser */}
          <div className="p-4 sm:p-6 bg-white dark:bg-slate-900/80 border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                <strong className="text-violet-700">Foucault</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Marché = dispositif politique et social • Intérêts divergents des parties prenantes</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                <strong className="text-sky-700">Zelizer</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Marché assurance décès • Poids du contexte culturel et moral • Marché électricité (Edison)</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-rose-50 to-transparent rounded-xl border-l-3 border-rose-400">
                <strong className="text-rose-700">Polanyi</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Vision pessimiste • Pouvoir destructeur • "Erreur économiste" • Encastrement</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                <strong className="text-emerald-700">Titmuss</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Don du sang • Marché pas toujours la meilleure solution • Marchés tabous</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-amber-50 to-transparent rounded-xl border-l-3 border-amber-400">
                <strong className="text-amber-700">Bourdieu</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Marché du logement • O/D insuffisant • Habitus de classe moyenne</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas réduire le marché à un mécanisme <strong>purement économique</strong>. Les sociologues montrent que 
            l'émergence et le fonctionnement des marchés dépendent de facteurs <strong>sociaux, culturels et politiques</strong>. 
            L'<strong>équité</strong> (pas seulement l'efficience) permet la légitimité.
          </Callout>

          <button
            onClick={() => setView('full')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            Voir le cours complet <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}


      {/* VERSION COMPLÈTE */}
      {view === 'full' && (
        <>
          <Section title="Introduction">
            <p className="mb-4 text-slate-600">
              Cette problématique est très <strong>récente</strong>. Le marché a été longtemps gardé par les économistes 
              car les sociologues ne se sentaient pas <strong>légitimes</strong> pour intervenir sur cette institution 
              centrale de la science économique.
            </p>

            <AuthorCard 
              name="Michel Foucault" 
              dates="1926-1984" 
              work="Naissance de la biopolitique" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/7/76/Michel_Foucault_1974_Brasil.jpg"
            >
              <p className="mb-3 text-sm sm:text-base">
                Foucault travaille sur l'idée de marché comme <strong>dispositif politique et social</strong>. 
                Il évoque les <strong>intérêts divergents</strong> des parties prenantes dont l'objectif est d'arriver à leurs fins.
              </p>
            </AuthorCard>

            <div className="p-4 bg-linear-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 mb-4">
              <p className="font-medium text-amber-900 text-sm mb-2">Le marché pour les économistes</p>
              <p className="text-sm text-slate-600 mb-3">
                Mode de coordination qui passe par des <strong>prix librement négociés</strong> entre offre et demande.
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                <li>• Les prix déterminent les rapports entre les choses et les individus</li>
                <li>• Échanges <strong>mutuellement avantageux</strong> pour les parties prenantes</li>
                <li>• Résultats sociaux appréciables : <strong>équilibre, optimalité</strong></li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100 text-center">
                <p className="font-semibold text-sky-700 text-sm">Micro social</p>
                <p className="text-xs text-slate-600">Transactions dans un contexte et lieu précis</p>
              </div>
              <div className="p-3 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100 text-center">
                <p className="font-semibold text-violet-700 text-sm">Macro social</p>
                <p className="text-xs text-slate-600">Société de marché</p>
              </div>
            </div>
          </Section>

          <Section title="I. Le marché comme structure sociale">
            <AuthorCard 
              name="Joseph Schumpeter" 
              dates="1883-1950" 
              work="Question fondamentale" 
              color="indigo"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Joseph_Schumpeter_ekonomialaria.jpg/500px-Joseph_Schumpeter_ekonomialaria.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Schumpeter expose un problème fondamental : les institutions répondent-elles à un comportement 
                <strong> intéressé, individuel et maximisateur</strong> tel que les économistes le perçoivent ?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">Si OUI</p>
                  <p className="text-xs text-slate-600">Pas de structure sociale → pas de sociologie</p>
                  <p className="text-xs text-slate-500 mt-1">Vision des économistes</p>
                </div>
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100">
                  <p className="font-semibold text-emerald-700 text-sm">Si NON ✓</p>
                  <p className="text-xs text-slate-600">Le marché est une <strong>structure sociale</strong></p>
                  <p className="text-xs text-slate-500 mt-1">Construit par la société</p>
                </div>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Viviana Zelizer" 
              work="Conditions sociales d'émergence des marchés" 
              color="sky"
              image="https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2023/06/20160803_ZelizerV_DJA_086_3000x1688.jpg?itok=-7yyCJnI"
            >
              <p className="mb-4 text-sm sm:text-base">
                Quels sont les facteurs explicatifs de l'émergence des marchés ? Il n'y a pas que des facteurs économiques, 
                il y en a aussi <strong>culturels, politiques et relationnels</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-sky-50/50 to-blue-50/30 rounded-xl border border-sky-100 mb-4">
                <p className="font-medium text-sky-900 text-sm mb-2">Exemple 1 : Marché de l'assurance décès</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• A pris beaucoup de temps à s'implanter aux <strong>USA</strong> (moins en Europe)</li>
                  <li>• Société américaine majoritairement <strong>conservatrice</strong></li>
                  <li>• Poids de la <strong>religion</strong> : sujet tabou (prix sur la vie)</li>
                  <li>• Développement quand failles dans religion et famille</li>
                </ul>
              </div>

              <Callout type="key">
                On voit ici le poids du <strong>contexte culturel et moral</strong> dans l'émergence des marchés. 
                Ce n'est pas qu'une question économique.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Thomas Edison et le marché de l'électricité" 
              work="Relations sociales et politiques" 
              color="amber"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Aux USA au XIXe : soit centrales électriques, soit générateurs locaux par quartier.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-xl border border-slate-200">
                  <p className="font-semibold text-slate-700 text-sm">Vision économiste</p>
                  <p className="text-xs text-slate-600">Centrales = optimisation, moindres coûts, plus de personnes touchées</p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">Réalité (Edison)</p>
                  <p className="text-xs text-slate-600">Relations sociales et politiques pour imposer sa solution</p>
                </div>
              </div>

              <Callout type="warning">
                Les <strong>relations sociales et personnelles</strong> jouent un rôle important dans l'émergence 
                et la structure d'un marché. Les producteurs de générateurs n'ont pas pu rivaliser.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="II. Le marché selon les sociologues">
            <AuthorCard 
              name="Vision sociologique du marché" 
              work="Institution sociale vs théorie néoclassique" 
              color="violet"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                La sociologie remet en cause le fait que le marché était un sujet <strong>monopolisé</strong> par les économistes.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 mb-4">
                <p className="font-medium text-amber-900 text-sm mb-2">Théorie néoclassique (critique)</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Marché = lieu de rencontre O/D avec recherche d'équilibre</li>
                  <li>• Marché <strong>autonome</strong>, autorégulation via les prix</li>
                  <li>• Acteurs <strong>a-sociaux</strong> (absence d'entente, de collusion)</li>
                  <li>• Marché <strong>efficient</strong>, satisfait les préférences</li>
                </ul>
              </div>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">Les sociologues insistent sur 2 éléments</p>
                <div className="space-y-3">
                  <div className="p-2 bg-white/60 rounded-lg">
                    <p className="font-semibold text-violet-700 text-xs">1. Institution sociale</p>
                    <p className="text-xs text-slate-600">
                      Ensemble de <strong>règles</strong> établies en vue de la satisfaction d'<strong>intérêts collectifs</strong>. 
                      Contraintes, régulations, caractère dynamique.
                    </p>
                  </div>
                  <div className="p-2 bg-white/60 rounded-lg">
                    <p className="font-semibold text-violet-700 text-xs">2. Légitimité</p>
                    <p className="text-xs text-slate-600">
                      Le marché doit être <strong>socialement accepté</strong>. C'est l'<strong>équité</strong> qui permet 
                      la légitimité (pas seulement l'efficience).
                    </p>
                  </div>
                </div>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Karl Polanyi" 
              dates="1886-1964" 
              work="La Grande Transformation" 
              color="rose"
              image="https://upload.wikimedia.org/wikipedia/commons/8/8b/Pol%C3%A1nyi_K%C3%A1roly.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Vision très <strong>pessimiste</strong> des marchés. Il insiste sur leur <strong>pouvoir destructeur</strong> 
                de la société. Il dénonce le système et l'approche économique.
              </p>

              <Callout type="warning" title="L'erreur économiste">
                Les économistes pensent que tous les comportements peuvent s'expliquer en termes de marché. 
                Pour Polanyi, l'économie a pris une <strong>mauvaise voie</strong>. Il faudrait insérer des 
                <strong> normes sociales et culturelles</strong> → notion d'<strong>encastrement</strong>.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-rose-50/50 to-transparent rounded-xl border border-rose-100">
                <p className="font-medium text-slate-900 text-sm mb-2">Question centrale :</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Jusqu'à quel point le marché peut-il se libérer des réglementations sociales, politiques, culturelles 
                  sans que son fonctionnement ne soit lui-même <strong>compromis</strong> ?
                </p>
              </div>
            </AuthorCard>
          </Section>

          <Section title="III. Efficience et légitimité des marchés">
            <AuthorCard 
              name="Critique du modèle néoclassique" 
              work="CPP et irréalisme des hypothèses" 
              color="amber"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                Le modèle dominant pour décrire les marchés en économie repose sur la <strong>CPP</strong> 
                (Concurrence Pure et Parfaite) : agent rationnel, atomicité, etc.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 mb-4">
                <p className="font-medium text-amber-900 text-sm mb-2">Critiques</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• <strong>Irréalisme des hypothèses</strong> : toutes les conditions de CPP sont rarement réunies</li>
                  <li>• Depuis 30 ans : introduction de la concurrence imparfaite, incertitude, asymétrie d'information</li>
                  <li>• Le marché tend à <strong>dissoudre le lien social</strong> et favoriser l'individualisme</li>
                </ul>
              </div>

              <Callout type="key">
                Pour les sociologues, un marché ne peut être <strong>efficient</strong> que s'il est <strong>légitime</strong>. 
                Le marché n'est pas toujours légitime.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Richard Titmuss" 
              dates="1907-1973" 
              work="The Gift Relationship" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/0/0e/Richard_Titmuss.jpg?20110803162659"
            >
              <p className="mb-4 text-sm sm:text-base">
                Pour certains problèmes de société, le marché n'est <strong>pas la meilleure solution</strong>. 
                Exemple : pour la pauvreté, on substitue par des associations avec dons et bénévoles.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">Exemple : le don du sang</p>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  Le don et le volontariat sont <strong>plus efficaces</strong> que payer des gens pour obtenir du sang.
                </p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Risque de <strong>sélection adverse</strong> : populations pauvres, donneurs de mauvaise qualité</li>
                  <li>• Mettre un prix sur le vital va contre les valeurs de <strong>solidarité</strong></li>
                  <li>• Perçu comme <strong>immoral</strong></li>
                </ul>
              </div>

              <Callout type="warning" title="Marchés tabous / répugnants">
                Don du sang, d'organes, prostitution, nature... L'enjeu n'est pas l'intérêt individuel ou la rationalité 
                mais des <strong>valeurs éthiques</strong>.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900 text-sm mb-2">Formes d'interactions extra-économiques :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• <strong>Règles sociales</strong> en complément du marché (solidarité, réciprocité)</li>
                  <li>• <strong>Règles politiques</strong> pour suppléer le marché (intervention État, institutions)</li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="IV. L'analyse sociologique des marchés">
            <p className="mb-4 text-slate-600">
              Comment passer du niveau <strong>individuel</strong> au niveau <strong>structurel</strong> (macro) ? 
              Comment passer des décisions des chefs d'entreprises au marché ?
            </p>

            <AuthorCard 
              name="Pierre Bourdieu" 
              dates="1930-2002" 
              work="Les structures sociales de l'économie (marché du logement)" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pierre_Bourdieu_%281%29.jpg/500px-Pierre_Bourdieu_%281%29.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Bourdieu étudie le <strong>marché du logement</strong> et le développement de la maison individuelle.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">Thèse principale</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Les concepts économiques (<strong>O/D</strong>) sont <strong>insuffisants</strong> pour illustrer 
                  la complexité du marché. Il faut revenir au niveau individuel.
                </p>
              </div>

              <Callout type="key">
                L'agent est doté de <strong>capitaux</strong> (économique, culturel, social) dont on déduit des 
                <strong> habitus</strong> qui forgent les comportements. Le choix de logement relève d'un 
                <strong> habitus de classe moyenne</strong>. Les variables vont au-delà de l'économie : rationalité, prix, utilité, rareté.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="V. Prolongements : l'analyse des marchandises">
            <AuthorCard 
              name="Processus de marchandisation" 
              work="Extension de la logique marchande" 
              color="teal"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                La nature marchande des biens est un <strong>construit social</strong> et non quelque chose de naturel. 
                Des biens produits dans la sphère domestique basculent dans la sphère marchande.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-teal-50/50 to-cyan-50/30 rounded-xl border border-teal-100 mb-4">
                <p className="font-medium text-teal-900 text-sm mb-2">Basculement</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <p className="font-semibold text-slate-700 text-xs">Avant</p>
                    <p className="text-xs text-slate-600">Biens et services</p>
                    <p className="text-xs text-slate-500">Valeur d'<strong>usage</strong></p>
                  </div>
                  <div className="p-2 bg-white/60 rounded-lg text-center">
                    <p className="font-semibold text-teal-700 text-xs">Après</p>
                    <p className="text-xs text-slate-600">Marchandises</p>
                    <p className="text-xs text-slate-500">Valeur d'<strong>échange</strong></p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200 mb-4">
                <p className="font-medium text-slate-900 text-sm mb-2">Implications centrales :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Ce qui entre ou non dans la sphère marchande est déterminé <strong>socialement</strong></li>
                  <li>• Déterminé par les <strong>rapports de pouvoir</strong>, les normes et valeurs</li>
                  <li>• Il existe d'autres formes d'échanges <strong>non marchands</strong> (secteur public, biens collectifs)</li>
                </ul>
              </div>

              <Callout type="example" title="Exemples de basculement">
                Biens et services de base : fourniture d'eau, d'électricité, transports en commun. 
                Les décisions de basculement s'expliquent par les <strong>rapports de pouvoir</strong> et la société elle-même.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : le marché en sociologie économique">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Auteur</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Apport</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Concept clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-violet-700">Foucault</td>
                    <td className="p-3 border border-slate-200">Dispositif politique</td>
                    <td className="p-3 border border-slate-200">Intérêts divergents</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-sky-700">Zelizer</td>
                    <td className="p-3 border border-slate-200">Émergence des marchés</td>
                    <td className="p-3 border border-slate-200">Contexte culturel et moral</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-rose-700">Polanyi</td>
                    <td className="p-3 border border-slate-200">Critique radicale</td>
                    <td className="p-3 border border-slate-200">Encastrement, erreur économiste</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-emerald-700">Titmuss</td>
                    <td className="p-3 border border-slate-200">Limites du marché</td>
                    <td className="p-3 border border-slate-200">Don du sang, marchés tabous</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-amber-700">Bourdieu</td>
                    <td className="p-3 border border-slate-200">Marché du logement</td>
                    <td className="p-3 border border-slate-200">Habitus, capitaux</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La sociologie <strong>enrichit</strong> l'approche des économistes en allant au-delà des concepts habituels. 
              Prise en compte des <strong>systèmes de relations</strong> et meilleure compréhension des <strong>motifs 
              de l'action</strong> des agents. Le marché est une <strong>institution sociale</strong> qui doit être légitime.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={9} title="Le marché" questions={chapter9Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre8', label: '← Chapitre précédent', title: 'Société de consommation' }}
        next={{ path: '/socio/chapitre10', label: 'Chapitre suivant →', title: 'Le travail' }}
      />
    </main>
  );
}
