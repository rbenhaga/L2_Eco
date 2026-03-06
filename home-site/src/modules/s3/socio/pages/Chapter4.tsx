import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter4Questions } from '../data/questions';

export default function Chapter4() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 04"
        title="L'École de Chicago"
        description="Sociologie urbaine, interactionnisme symbolique et observation participante."
      />

      {/* Toggle version */}
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-[var(--color-bg-overlay)] rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setView('full')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            view === 'full' 
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
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            view === 'quick' 
              ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] shadow-sm' 
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
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
          <div className="p-5 sm:p-7 bg-linear-to-br from-[var(--color-accent-subtle)] via-[var(--color-accent-subtle)] to-transparent rounded-2xl border border-[var(--color-accent)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-bg-raised)]" />
              </div>
              Thèse centrale du chapitre
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
              L'École de Chicago développe une <strong>sociologie compréhensive</strong> centrée sur le terrain et l'expérience vécue.
              <strong> 1ère école</strong> (1920-1930) : sociologie urbaine, Chicago comme "laboratoire social".
              <strong> 2ème école</strong> (1940-1960) : <strong>interactionnisme symbolique</strong> avec Goffman et Becker.
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Si les hommes définissent des situations comme réelles, alors elles sont réelles dans leurs conséquences"</p>
                <p className="text-xs text-[var(--color-warning)] mt-1 font-medium">— Théorème de Thomas</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"On ne naît pas déviant, on le devient"</p>
                <p className="text-xs text-[var(--color-success)] mt-1 font-medium">— Becker (théorie de l'étiquetage)</p>
              </blockquote>
            </div>
          </div>

          {/* Deux écoles */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> 1ère école vs 2ème école
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-accent)] mb-2">1ère école (1920-1930)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Transformations <strong>urbaines</strong></li>
                  <li>• Effets sur les <strong>groupes sociaux</strong></li>
                  <li>• Pauvreté, délinquance</li>
                  <li>• Approche <strong>ethnographique</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-warning)] mb-2">2ème école (1940-1960)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Interactions</strong> individuelles</li>
                  <li>• Construction de l'<strong>identité</strong></li>
                  <li>• Comportements <strong>déviants</strong></li>
                  <li>• <strong>Interactionnisme</strong> symbolique</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Concepts clés */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-info)]">Whyte</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Street Corner Society</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Observation participante • Gangs = <strong>structures d'organisation sociale</strong> (identité, protection, appartenance)</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-accent)]">Goffman</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Mise en scène de la vie quotidienne</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Métaphore théâtrale</strong> • Identité virtuelle vs réelle • <strong>Stigmates</strong> = attributs socialement disqualifiants</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-success)]">Becker</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Outsiders</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Théorie de l'étiquetage</strong> • Entrepreneurs de moral • 4 étapes de la carrière déviante</p>
              </div>
            </div>
          </div>

          {/* 4 étapes Becker */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">📋</span> Les 4 étapes de la carrière déviante (Becker)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-[var(--color-success-subtle)]/50 rounded-lg">
                <span className="w-6 h-6 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]"><strong>Transgression</strong> de la norme (volontaire ou non)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-[var(--color-success-subtle)]/50 rounded-lg">
                <span className="w-6 h-6 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]"><strong>Apprentissage</strong> avec le groupe (répétition)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-[var(--color-success-subtle)]/50 rounded-lg">
                <span className="w-6 h-6 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]"><strong>Désignation publique</strong> (étiquetage par la société)</p>
              </div>
              <div className="flex items-center gap-3 p-2 bg-[var(--color-success-subtle)]/50 rounded-lg">
                <span className="w-6 h-6 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]"><strong>Affiliation</strong> au groupe déviant (appartenance)</p>
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
            className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent)] text-sm font-medium transition-colors"
          >
            Voir le cours complet <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}


      {/* VERSION COMPLÈTE */}
      {view === 'full' && (
        <>
          <Section title="Introduction">
            <p className="mb-4 text-[var(--color-text-secondary)]">
              L'École de Chicago n'est pas un tout unifié mais regroupe plusieurs sous-courants. Points communs : 
              <strong> filiation compréhensive</strong> (individualisme méthodologique, sens de l'action sociale) 
              et passage par Chicago ou initiation à ce qui s'y fait.
            </p>
          </Section>

          <Section title="I. Contexte historique de Chicago">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="text-center p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">1837</p>
                <p className="text-[var(--color-text-secondary)] text-sm">4 000 habitants</p>
              </div>
              <div className="text-center p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--color-info)]">1930</p>
                <p className="text-[var(--color-info)] text-sm">3,5 millions d'habitants</p>
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
            <p className="mb-5 text-[var(--color-text-secondary)]">
              Accent sur le <strong>terrain</strong> et l'<strong>expérience vécue</strong>. Sociologie compréhensive 
              centrée sur le point de vue de l'acteur (individualisme méthodologique).
            </p>

            <AuthorCard 
              name="Théorème de Thomas" 
              work="Subjectivité de l'acteur" 
              color="indigo"
              hideAvatar
            >
              <blockquote className="text-base sm:text-lg italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-accent)] pl-4 mb-4">
                "Si les hommes définissent des situations comme réelles, alors elles sont réelles dans leurs conséquences."
              </blockquote>
              <p className="text-sm text-[var(--color-text-secondary)]">
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
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm mb-1">Approche inductive</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">On part du <strong>terrain</strong> pour construire des hypothèses (≠ déductive)</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm mb-1">Méthodes qualitatives</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Témoignages, récits de vie, observations (participantes ou non)</p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] italic">Pas ou peu de méthodes quantitatives (statistiques).</p>
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
              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)] mb-3">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Observations :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
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
            <p className="mb-5 text-[var(--color-text-secondary)]">
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
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm mb-1">Variables étudiées</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• <strong>Langage</strong> et manière de décrire les expériences</li>
                    <li>• <strong>Gestes</strong> et posture corporelle</li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm mb-1">Méthodes</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Observations <strong>participantes</strong></li>
                    <li>• <strong>Immersions</strong> (parfois clandestines)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] italic">
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

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">🎭 Métaphore théâtrale</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  La vie sociale est un <strong>jeu de rôle</strong> où chacun joue dans une pièce avec un 
                  <strong> scénario</strong> et une part d'<strong>improvisation</strong>. On a des attentes vis-à-vis 
                  d'autrui et autrui a des attentes vis-à-vis de nous.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)] text-center">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Ordre social (75%)</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Scénario suivi</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] text-center">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Désordre social (25%)</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Malaise, rôles mal interprétés</p>
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
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Identité virtuelle</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ce que les autres se représentent de moi</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Identité réelle</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Ce qu'on est véritablement</p>
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

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Entrepreneurs de moral</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Groupes d'individus ou institutions qui mènent un combat pour <strong>imposer leurs normes sociales</strong> 
                  (parfois matérialisées par des lois). Ex : lutte contre la drogue dans les années 1960 aux USA.
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-2 italic">
                  Parfois, il y a un caractère <strong>arbitraire</strong> dans les normes défendues.
                </p>
              </div>

              <blockquote className="text-base sm:text-lg italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-success)] pl-4 mb-4">
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
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                  <span className="w-7 h-7 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">Transgression de la norme</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Première fois où un individu enfreint une règle (volontaire ou involontaire). Début du processus d'étiquetage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                  <span className="w-7 h-7 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">Apprentissage avec le groupe</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Répétition d'expériences. Le groupe renforce le comportement déviant. À l'intérieur du groupe, le comportement devient <strong>normal</strong>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                  <span className="w-7 h-7 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">Désignation publique (étiquetage)</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Le déviant est <strong>reconnu comme tel</strong> par la société. La déviance ne devient pleine et entière que si elle est identifiée par les autres.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                  <span className="w-7 h-7 bg-[var(--color-success)] text-[var(--color-bg-raised)] rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">Affiliation au groupe déviant</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Déjà étiqueté, on renforce le comportement avec le groupe qui partage et valide ce comportement. Le groupe devient un <strong>lieu d'appartenance</strong>.</p>
                  </div>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : École de Chicago">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                <p className="font-semibold text-[var(--color-accent)] text-sm mb-2">1ère école (1920-1930)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Bases de la <strong>sociologie urbaine</strong></li>
                  <li>• Approche <strong>ethnographique</strong> (immersion)</li>
                  <li>• Approche <strong>anthropologique</strong> (interactions entre communautés)</li>
                  <li>• Création de normes et valeurs propres</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                <p className="font-semibold text-[var(--color-warning)] text-sm mb-2">2ème école (1940-1960)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
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

