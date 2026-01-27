import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter4Questions } from '../data/questions';

export default function Chapter4() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 04"
        title="L'École de Chicago"
        description="Sociologie urbaine, interactionnisme symbolique et observation participante."
      />

      {/* Toggle version */}
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-slate-100 rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setView('full')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            view === 'full' 
              ? 'bg-white text-slate-900 shadow-sm' 
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
              ? 'bg-white text-slate-900 shadow-sm' 
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
              L'École de Chicago développe une <strong>sociologie compréhensive</strong> centrée sur le terrain et l'expérience vécue.
              <strong> 1ère école</strong> (1920-1930) : sociologie urbaine, Chicago comme "laboratoire social".
              <strong> 2ème école</strong> (1940-1960) : <strong>interactionnisme symbolique</strong> avec Goffman et Becker.
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-amber-50 to-transparent rounded-xl border-l-3 border-amber-400 text-sm">
                <p className="italic text-slate-700">"Si les hommes définissent des situations comme réelles, alors elles sont réelles dans leurs conséquences"</p>
                <p className="text-xs text-amber-600 mt-1 font-medium">— Théorème de Thomas</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400 text-sm">
                <p className="italic text-slate-700">"On ne naît pas déviant, on le devient"</p>
                <p className="text-xs text-emerald-600 mt-1 font-medium">— Becker (théorie de l'étiquetage)</p>
              </blockquote>
            </div>
          </div>

          {/* Deux écoles */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-rose-50/50 to-amber-50/30 border border-rose-100 rounded-2xl">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> 1ère école vs 2ème école
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-violet-700 mb-2">1ère école (1920-1930)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Transformations <strong>urbaines</strong></li>
                  <li>• Effets sur les <strong>groupes sociaux</strong></li>
                  <li>• Pauvreté, délinquance</li>
                  <li>• Approche <strong>ethnographique</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-amber-700 mb-2">2ème école (1940-1960)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• <strong>Interactions</strong> individuelles</li>
                  <li>• Construction de l'<strong>identité</strong></li>
                  <li>• Comportements <strong>déviants</strong></li>
                  <li>• <strong>Interactionnisme</strong> symbolique</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Concepts clés */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                <div className="flex justify-between items-start">
                  <strong className="text-sky-700">Whyte</strong>
                  <span className="text-xs text-slate-500">Street Corner Society</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Observation participante • Gangs = <strong>structures d'organisation sociale</strong> (identité, protection, appartenance)</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                <div className="flex justify-between items-start">
                  <strong className="text-violet-700">Goffman</strong>
                  <span className="text-xs text-slate-500">Mise en scène de la vie quotidienne</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1"><strong>Métaphore théâtrale</strong> • Identité virtuelle vs réelle • <strong>Stigmates</strong> = attributs socialement disqualifiants</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                <div className="flex justify-between items-start">
                  <strong className="text-emerald-700">Becker</strong>
                  <span className="text-xs text-slate-500">Outsiders</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1"><strong>Théorie de l'étiquetage</strong> • Entrepreneurs de moral • 4 étapes de la carrière déviante</p>
              </div>
            </div>
          </div>

          {/* 4 étapes Becker */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">📋</span> Les 4 étapes de la carrière déviante (Becker)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-emerald-50/50 rounded-lg">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <p className="text-xs sm:text-sm text-slate-700"><strong>Transgression</strong> de la norme (volontaire ou non)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-emerald-50/50 rounded-lg">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <p className="text-xs sm:text-sm text-slate-700"><strong>Apprentissage</strong> avec le groupe (répétition)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-emerald-50/50 rounded-lg">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <p className="text-xs sm:text-sm text-slate-700"><strong>Désignation publique</strong> (étiquetage par la société)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-emerald-50/50 rounded-lg">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <p className="text-xs sm:text-sm text-slate-700"><strong>Affiliation</strong> au groupe déviant (appartenance)</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            L'interactionnisme symbolique ne s'intéresse ni à l'individu seul, ni à la société, mais à 
            l'<strong>interaction en tant que telle</strong>. Le stigmate n'est pas naturel : c'est la 
            <strong> société qui stigmatise</strong> (processus de stigmatisation).
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
              L'École de Chicago n'est pas un tout unifié mais regroupe plusieurs sous-courants. Points communs : 
              <strong> filiation compréhensive</strong> (individualisme méthodologique, sens de l'action sociale) 
              et passage par Chicago ou initiation à ce qui s'y fait.
            </p>
          </Section>

          <Section title="I. Contexte historique de Chicago">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="text-center p-4 bg-linear-to-br from-slate-50 to-gray-50/30 rounded-xl border border-slate-200">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">1837</p>
                <p className="text-slate-600 text-sm">4 000 habitants</p>
              </div>
              <div className="text-center p-4 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-200">
                <p className="text-2xl sm:text-3xl font-bold text-sky-700">1930</p>
                <p className="text-sky-600 text-sm">3,5 millions d'habitants</p>
              </div>
            </div>

            <AuthorCard 
              name="Caractéristiques de Chicago" 
              work="Explosion démographique et immigration" 
              color="amber"
              hideAvatar
            >
              <ul className="space-y-2 text-sm sm:text-base mb-4">
                <li>• <strong>Immigration massive</strong> : Europe de l'Ouest, puis Est, puis afro-américaine</li>
                <li>• Population immigrante dans une <strong>extrême pauvreté</strong>, salaires de misère</li>
                <li>• <strong>Tensions raciales</strong> → émeutes régulières</li>
                <li>• <strong>Délinquance organisée</strong> : Al Capone, prohibition (années 1920)</li>
              </ul>

              <Callout type="key">
                Chicago devient un <strong>laboratoire social</strong>. Les travailleurs sociaux mènent des enquêtes 
                pour identifier les problèmes sociaux et poser des diagnostics (approche médicale, pas moralisatrice).
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="II. 1ère École de Chicago (1920-1930)">
            <p className="mb-5 text-slate-600">
              Accent sur le <strong>terrain</strong> et l'<strong>expérience vécue</strong>. Sociologie compréhensive 
              centrée sur le point de vue de l'acteur (individualisme méthodologique).
            </p>

            <AuthorCard 
              name="Théorème de Thomas" 
              work="Subjectivité de l'acteur" 
              color="indigo"
              hideAvatar
            >
              <blockquote className="text-base sm:text-lg italic text-slate-600 border-l-4 border-indigo-300 pl-4 mb-4">
                "Si les hommes définissent des situations comme réelles, alors elles sont réelles dans leurs conséquences."
              </blockquote>
              <p className="text-sm text-slate-600">
                Ce qui importe n'est pas la position objective mais ce que l'individu <strong>perçoit</strong>. 
                On étudie la <strong>subjectivité de l'acteur</strong>.
              </p>
            </AuthorCard>

            <AuthorCard 
              name="Méthodes de la 1ère école" 
              work="Approche inductive et qualitative" 
              color="teal"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-br from-teal-50 to-cyan-50/30 rounded-xl border border-teal-100">
                  <p className="font-semibold text-teal-700 text-sm mb-1">Approche inductive</p>
                  <p className="text-xs text-slate-600">On part du <strong>terrain</strong> pour construire des hypothèses (≠ déductive)</p>
                </div>
                <div className="p-3 bg-linear-to-br from-teal-50 to-cyan-50/30 rounded-xl border border-teal-100">
                  <p className="font-semibold text-teal-700 text-sm mb-1">Méthodes qualitatives</p>
                  <p className="text-xs text-slate-600">Témoignages, récits de vie, observations (participantes ou non)</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Pas ou peu de méthodes quantitatives (statistiques).</p>
            </AuthorCard>

            <AuthorCard 
              name="William Whyte" 
              work="Street Corner Society" 
              color="blue"
              image="https://upload.wikimedia.org/wikipedia/commons/9/99/William_Whyte.jpg?20080219111241"
            >
              <p className="text-sm sm:text-base mb-3">
                <strong>Terrain :</strong> Boston (quartier italien). <strong>Méthode :</strong> Intégration progressive 
                dans les bandes de jeunes. Terrain d'étude = la rue, l'espace public (centres de sociabilité).
              </p>
              <div className="p-3 bg-linear-to-r from-sky-50/50 to-transparent rounded-xl border border-sky-100 mb-3">
                <p className="font-medium text-slate-900 text-sm mb-2">Observations :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Étude des <strong>hiérarchies</strong>, solidarités locales, dynamiques sociales</li>
                  <li>• Les gangs = <strong>structures d'organisation sociale</strong></li>
                  <li>• Offrent : identité, protection, sentiment d'appartenance</li>
                </ul>
              </div>
              <Callout type="key">
                L'engagement des jeunes ne relève pas juste de comportements déviants mais reflète des 
                <strong> rêves et obstacles</strong> que le groupe permet de réaliser ou dépasser.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="III. 2ème École de Chicago (1940-1960)">
            <p className="mb-5 text-slate-600">
              On passe de l'étude des transformations urbaines à l'analyse des <strong>interactions individuelles</strong> 
              et de la <strong>construction de l'identité sociale</strong>. Thème dominant : les <strong>comportements déviants</strong>.
            </p>

            <AuthorCard 
              name="L'interactionnisme symbolique" 
              work="Au cœur de la 2ème école" 
              color="rose"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-4">
                On ne s'intéresse pas à l'individu ni à la société mais à l'<strong>interaction en tant que telle</strong>. 
                Question : <strong>comment</strong> devient-on déviant ? (pas pourquoi)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm mb-1">Variables étudiées</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• <strong>Langage</strong> et manière de décrire les expériences</li>
                    <li>• <strong>Gestes</strong> et posture corporelle</li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm mb-1">Méthodes</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Observations <strong>participantes</strong></li>
                    <li>• <strong>Immersions</strong> (parfois clandestines)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Les sociologues intègrent parfois les réseaux illégaux (prostitution, mafia) en dissimulant leur identité.
              </p>
            </AuthorCard>
          </Section>

          <Section title="IV. Goffman : la dramaturgie du social">
            <AuthorCard 
              name="Erving Goffman" 
              work="La mise en scène de la vie quotidienne" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/5/57/E._Goffman_c._1940.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Pilier de l'interactionnisme symbolique. S'intéresse à la problématique de l'<strong>ordre social</strong> : 
                qu'est-ce qui fait que la société est ordonnée et fonctionne ?
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">🎭 Métaphore théâtrale</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  La vie sociale est un <strong>jeu de rôle</strong> où chacun joue dans une pièce avec un 
                  <strong> scénario</strong> et une part d'<strong>improvisation</strong>. On a des attentes vis-à-vis 
                  d'autrui et autrui a des attentes vis-à-vis de nous.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100 text-center">
                  <p className="font-semibold text-emerald-700 text-sm">Ordre social (75%)</p>
                  <p className="text-xs text-slate-600">Scénario suivi</p>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100 text-center">
                  <p className="font-semibold text-rose-700 text-sm">Désordre social (25%)</p>
                  <p className="text-xs text-slate-600">Malaise, rôles mal interprétés</p>
                </div>
              </div>

              <Callout type="key">
                L'ordre social n'est <strong>pas naturel</strong>, il se construit à partir des interactions des acteurs. 
                Opposition totale avec Durkheim : le monde se construit au fur et à mesure, il n'est pas déterminé.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Stigmates (Goffman)" 
              work="Théorie de l'identité sociale" 
              color="slate"
              hideAvatar
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100">
                  <p className="font-semibold text-sky-700 text-sm">Identité virtuelle</p>
                  <p className="text-xs text-slate-600">Ce que les autres se représentent de moi</p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">Identité réelle</p>
                  <p className="text-xs text-slate-600">Ce qu'on est véritablement</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                L'identité virtuelle peut <strong>impacter</strong> l'identité réelle. Les impressions des autres 
                influencent la manière dont on se perçoit → dimension <strong>interactive</strong> de l'identité.
              </p>
              <Callout type="warning" title="Définition du stigmate">
                <strong>Attributs socialement disqualifiants</strong> aux yeux des autres. Le stigmate n'est 
                <strong> pas naturel</strong>, c'est la société qui stigmatise. Ce sont des différences jugées 
                comme telles par les "normaux" → <strong>processus de stigmatisation</strong>.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="V. Becker : la théorie de l'étiquetage">
            <AuthorCard 
              name="Howard Becker" 
              work="Outsiders" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Howard-S.-Becker-EHESS.JPG/500px-Howard-S.-Becker-EHESS.JPG"
            >
              <p className="mb-4 text-sm sm:text-base">
                Explique la déviance par la <strong>sociologie</strong> (pas la psychologie). 
                Question centrale : <strong>comment devient-on déviant ?</strong>
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">Entrepreneurs de moral</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Groupes d'individus ou institutions qui mènent un combat pour <strong>imposer leurs normes sociales</strong> 
                  (parfois matérialisées par des lois). Ex : lutte contre la drogue dans les années 1960 aux USA.
                </p>
                <p className="text-xs text-slate-500 mt-2 italic">
                  Parfois, il y a un caractère <strong>arbitraire</strong> dans les normes défendues.
                </p>
              </div>

              <blockquote className="text-base sm:text-lg italic text-slate-600 border-l-4 border-emerald-300 pl-4 mb-4">
                "On ne naît pas déviant, on le devient."
              </blockquote>

              <Callout type="key">
                <strong>Aucun comportement n'est par nature déviant</strong>, il le devient parce qu'on le juge comme tel. 
                Devenir déviant prend du temps, demande une transformation de soi → <strong>socialisation</strong>.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Les 4 étapes de la carrière déviante" 
              work="Processus d'étiquetage (Becker)" 
              color="teal"
              hideAvatar
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100">
                  <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Transgression de la norme</p>
                    <p className="text-xs text-slate-600">Première fois où un individu enfreint une règle (volontaire ou involontaire). Début du processus d'étiquetage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100">
                  <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Apprentissage avec le groupe</p>
                    <p className="text-xs text-slate-600">Répétition d'expériences. Le groupe renforce le comportement déviant. À l'intérieur du groupe, le comportement devient <strong>normal</strong>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100">
                  <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Désignation publique (étiquetage)</p>
                    <p className="text-xs text-slate-600">Le déviant est <strong>reconnu comme tel</strong> par la société. La déviance ne devient pleine et entière que si elle est identifiée par les autres.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100">
                  <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Affiliation au groupe déviant</p>
                    <p className="text-xs text-slate-600">Déjà étiqueté, on renforce le comportement avec le groupe qui partage et valide ce comportement. Le groupe devient un <strong>lieu d'appartenance</strong>.</p>
                  </div>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : École de Chicago">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                <p className="font-semibold text-violet-700 text-sm mb-2">1ère école (1920-1930)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Bases de la <strong>sociologie urbaine</strong></li>
                  <li>• Approche <strong>ethnographique</strong> (immersion)</li>
                  <li>• Approche <strong>anthropologique</strong> (interactions entre communautés)</li>
                  <li>• Création de normes et valeurs propres</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-700 text-sm mb-2">2ème école (1940-1960)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• <strong>Interactionnisme symbolique</strong></li>
                  <li>• <strong>Identité sociale</strong> (Goffman)</li>
                  <li>• <strong>Théorie de l'étiquetage</strong> (Becker)</li>
                  <li>• Méthodes qualitatives : enquêtes de terrain</li>
                </ul>
              </div>
            </div>

            <Callout type="key" title="Mot d'ordre de l'École de Chicago">
              Les <strong>interactions humaines</strong> sont au cœur de l'analyse. L'École de Chicago initie de 
              nouveaux instruments et approfondit la démarche compréhensive héritée de Weber.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={4} title="École de Chicago" questions={chapter4Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre3', label: '← Chapitre précédent', title: 'Durkheim et Weber' }}
        next={{ path: '/socio/chapitre5', label: 'Chapitre suivant →', title: 'Débat contemporain' }}
      />
    </main>
  );
}
