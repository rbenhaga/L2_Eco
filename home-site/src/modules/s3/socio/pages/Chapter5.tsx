import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter5Questions } from '../data/questions';

export default function Chapter5() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 05"
        title="Débat contemporain : individus vs structures"
        description="Bourdieu (structuralisme) vs Boudon (individualisme) et la sociologie nuancée de Lahire."
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
              La sociologie française post-2GM est divisée entre <strong>Bourdieu</strong> (structures sociales, déterminisme, 
              habitus) et <strong>Boudon</strong> (choix individuels rationnels). <strong>Lahire</strong> propose une synthèse 
              nuancée avec l'<strong>homme pluriel</strong> et la diversité des contextes de socialisation.
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citation clé pour la dissertation
            </h4>
            <blockquote className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)] text-sm">
              <p className="italic text-[var(--color-text-secondary)]">"Structures structurées prédisposées à fonctionner comme des structures structurantes"</p>
              <p className="text-xs text-[var(--color-accent)] mt-1 font-medium">— Bourdieu (définition de l'habitus)</p>
            </blockquote>
          </div>

          {/* Opposition Bourdieu vs Boudon */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Opposition : Bourdieu vs Boudon
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-accent)] mb-2">Bourdieu</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Structuralisme</strong> / Holisme</li>
                  <li>• <strong>Déterminisme</strong> social</li>
                  <li>• Héritage <strong>marxiste</strong></li>
                  <li>• <strong>Habitus</strong> de classe</li>
                  <li>• Méthode <strong>quantitative</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-success)] mb-2">Boudon</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Individualisme</strong> méthodologique</li>
                  <li>• <strong>Autonomie</strong> de l'acteur</li>
                  <li>• Inspiration <strong>néoclassique</strong></li>
                  <li>• Choix <strong>rationnels</strong></li>
                  <li>• Stratégies coûts/bénéfices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Concepts Bourdieu */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Bourdieu : concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">3 types de capital</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Économique</strong> (ressources financières) • <strong>Culturel</strong> (connaissances, le + important) • <strong>Social</strong> (réseaux, contacts)</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <strong className="text-[var(--color-info)]">Habitus</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Dispositions durables intériorisées par la socialisation • Agissent de manière <strong>inconsciente</strong> • Habitus de <strong>classe</strong></p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)]">
                <strong className="text-[var(--color-warning)]">Reproduction sociale</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">École = instrument de <strong>légitimation</strong> de la domination • Méritocratie = <strong>illusion</strong> • Capital culturel transmis avant l'école</p>
              </div>
            </div>
          </div>

          {/* Lahire */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🔄</span> Lahire : vers une sociologie nuancée
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <strong className="text-[var(--color-success)]">L'Homme Pluriel</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Critique l'<strong>homogénéité</strong> de l'habitus • Multiplicité des influences sociales • <strong>Transfuges de classe</strong></p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Approche contextuelle</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">L'individu adapte ses comportements selon les <strong>contextes</strong> • Pluralité de dispositions • École = <strong>ascension sociale</strong> possible</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas opposer radicalement Bourdieu et Boudon. Même Boudon reconnaît que les stratégies sont 
            <strong> corrélées au milieu social</strong>. La sociologie actuelle est plus <strong>nuancée</strong> 
            et combine les deux approches selon l'objet d'étude.
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
              La sociologie française se développe après la 2GM. Elle est animée par le débat <strong>individus vs société</strong> 
              (structures sociales). Ce débat a aussi une dimension <strong>politique</strong> : libéral/droite (autonomie individuelle) 
              vs socialiste/gauche (contraintes sociales).
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)] text-center">
                <p className="font-semibold text-[var(--color-accent)]">Bourdieu</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Associé à <strong>Durkheim</strong></p>
                <p className="text-xs text-[var(--color-text-muted)]">Structures sociales</p>
              </div>
              <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)] text-center">
                <p className="font-semibold text-[var(--color-success)]">Boudon</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Associé à <strong>Weber</strong></p>
                <p className="text-xs text-[var(--color-text-muted)]">Individus</p>
              </div>
            </div>
          </Section>

          <Section title="I. Bourdieu : le poids des structures sociales">
            <AuthorCard 
              name="Pierre Bourdieu" 
              dates="1930-2002" 
              work="La Distinction, Les Héritiers, La Reproduction" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pierre_Bourdieu_%281%29.jpg/500px-Pierre_Bourdieu_%281%29.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Associé au <strong>structuralisme</strong>. Très influencé par la pensée <strong>marxiste</strong> 
                (dominante en France après la 2GM). 3 grands apports : sociologie de l'école, de la culture/art, des classes sociales.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">Héritage marxiste : les 3 types de capital</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-semibold text-[var(--color-warning)] text-xs">Capital économique</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Ressources financières et patrimoniales</p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-semibold text-[var(--color-accent)] text-xs">Capital culturel ⭐</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Connaissances, compétences (le + important)</p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-semibold text-[var(--color-info)] text-xs">Capital social</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Réseaux, contacts personnels/professionnels</p>
                  </div>
                </div>
              </div>

              <Callout type="key">
                Notre place dans la société dépend de la <strong>quantité</strong> et du <strong>type</strong> de capital possédé. 
                Le <strong>capital culturel</strong> est le plus important pour s'élever socialement.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="La notion d'habitus" 
              work="Concept central chez Bourdieu" 
              color="indigo"
              hideAvatar
            >
              <blockquote className="text-sm sm:text-base italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-accent)] pl-4 mb-4">
                "Structures structurées prédisposées à fonctionner comme des structures structurantes"
                <span className="block text-xs font-medium text-[var(--color-accent)] mt-1">— Bourdieu</span>
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm mb-1">Structures structurées</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Famille, école, amis nous <strong>structurent</strong> via la socialisation</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm mb-1">Structures structurantes</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Les habitus nous <strong>guident</strong> dans notre manière d'agir</p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)] mb-3">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Caractéristiques des habitus :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Dispositions <strong>durables</strong> intériorisées par la socialisation (primaire + secondaire)</li>
                  <li>• Fonctionnent de manière <strong>inconsciente</strong> (on n'est pas conscient d'être déterminé)</li>
                  <li>• Reflètent l'expérience passée et l'<strong>appartenance sociale</strong></li>
                  <li>• Créent des <strong>habitus de classe</strong> (mêmes pratiques dans une même classe)</li>
                </ul>
              </div>

              <Callout type="warning" title="Hystérésis de l'habitus">
                Les dispositions acquises <strong>perdurent dans le temps</strong> même si le contexte a changé. 
                L'individu continue à perpétuer les mêmes pratiques même quand il s'élève socialement. 
                Force d'<strong>inertie</strong> de l'habitus.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Champs et reproduction sociale" 
              work="Homologie structurale" 
              color="rose"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                Le monde social = imbrication de <strong>champs</strong> (sport, culture, économie...). 
                Dans chaque champ, même <strong>hiérarchie sociale</strong> = <strong>homologie structurale</strong>.
              </p>
              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] mb-3">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Les classes supérieures sont <strong>dominantes dans tous les champs</strong>. Les capitaux d'un champ 
                  peuvent être <strong>convertis</strong> dans un autre → transfert de domination. 
                  Mécanisme de <strong>reproduction des inégalités</strong>.
                </p>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] italic">
                Position du sociologue : "tour d'ivoire", au-dessus de la mêlée → sociologie du <strong>dévoilement</strong>.
              </p>
            </AuthorCard>
          </Section>

          <Section title="II. La Distinction et Les Héritiers">
            <AuthorCard 
              name="La Distinction" 
              work="Critique sociale du jugement de goût" 
              color="amber"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                Bourdieu déconstruit le mythe du goût. Nos goûts ne sont <strong>pas personnels</strong>, 
                ils sont le produit d'<strong>habitus de classe</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Classes populaires</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">"Franc manger" • Force, corpulence</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Travail physique → aliments nourrissants</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm">Classes supérieures</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Alimentation raffinée • Finesse, minceur</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Travail intellectuel → aliments légers</p>
                </div>
              </div>

              <Callout type="key" title="Hiérarchie des goûts">
                Pratiques <strong>légitimes</strong> (classes supérieures : opéra, théâtre) vs pratiques 
                <strong> sans intérêt</strong> (classes populaires). La classe dominante impose la 
                <strong> légitimité de sa propre culture</strong>.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Les Héritiers / La Reproduction" 
              work="Inégalités scolaires" 
              color="sky"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                Bourdieu remet en cause la <strong>méritocratie</strong> et l'<strong>idéologie du don</strong>. 
                L'échec scolaire est corrélé aux classes sociales.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Pourquoi les classes supérieures réussissent ?</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Socialisation familiale <strong>pré-ajustée</strong> aux attentes scolaires</li>
                  <li>• <strong>Capital culturel</strong> transmis avant l'école</li>
                  <li>• Habitués à travailler, être évalués dès l'enfance</li>
                  <li>• Culture <strong>légitime</strong> transmise de manière précoce</li>
                </ul>
              </div>

              <Callout type="warning" title="L'école = instrument de domination">
                L'école <strong>légitime</strong> la domination des classes supérieures car elle transmet la culture légitime. 
                La méritocratie est une <strong>illusion</strong>. L'épreuve de culture générale des concours est 
                "aveugle et hypocrite" : elle repose sur l'<strong>héritage</strong>, pas le mérite.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)]">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Actualisation de l'analyse :</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Le <strong>capital social</strong> est aussi important : 2 étudiants avec un capital scolaire équivalent 
                  mais différenciés par des <strong>CV différents</strong> expliqués par le capital social différent.
                </p>
              </div>
            </AuthorCard>
          </Section>

          <Section title="III. Boudon : la sociologie de l'acteur">
            <AuthorCard 
              name="Raymond Boudon" 
              dates="1934-2013" 
              work="L'inégalité des chances" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Raymond_Boudon.jpg/960px-Raymond_Boudon.jpg?20110801180305"
            >
              <p className="mb-4 text-sm sm:text-base">
                Critique le holisme de Bourdieu. S'inspire de l'économie <strong>néoclassique</strong> (micro) 
                et de l'<strong>individualisme méthodologique</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Critiques de Bourdieu :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Pas assez de place faite à l'<strong>acteur</strong></li>
                  <li>• L'individu est assimilé à un <strong>"idiot culturel"</strong> (Garfinkel)</li>
                  <li>• L'individu croit être libre mais ne l'est pas</li>
                  <li>• La subjectivité de l'acteur n'a pas de poids</li>
                </ul>
              </div>

              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Facteur contextuel (années 90-2000) :</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Montée en puissance de l'<strong>économie néoclassique</strong> dans toutes les sphères. 
                  Redonne un rôle central à l'<strong>individualisme méthodologique</strong> inspiré de la micro-économie.
                </p>
              </div>

              <Callout type="key">
                Les phénomènes sociaux doivent être expliqués par les <strong>choix individuels</strong>. 
                Ces choix sont <strong>rationnels</strong> (stratégies d'optimisation, utilité subjective). 
                On part de l'individu pour expliquer le collectif.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Thèses sur l'école (Boudon)" 
              work="Stratégies des familles" 
              color="teal"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                Le choix des filières se fait à partir des <strong>stratégies des familles</strong> 
                (pas de classes sociales ici). Calculs <strong>coûts / bénéfices / risques</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Catégories supérieures</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Choix scolaires <strong>ambitieux</strong></li>
                    <li>• Plus informés</li>
                    <li>• Coûts du choix <strong>moindres</strong></li>
                    <li>• Risque d'échec <strong>faible</strong></li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Catégories populaires</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Choix de filières <strong>courtes</strong></li>
                    <li>• Moins d'informations</li>
                    <li>• Coûts <strong>importants</strong></li>
                    <li>• Risque d'échec <strong>surestimé</strong></li>
                  </ul>
                </div>
              </div>

              <Callout type="warning" title="Limites de l'analyse de Boudon">
                <ul className="text-xs space-y-1">
                  <li>• Les stratégies sont elles-mêmes <strong>déterminées</strong> par le milieu social</li>
                  <li>• N'évoque pas la notion de <strong>classe sociale</strong> alors que son analyse en est empreinte</li>
                  <li>• Analyse principalement <strong>théorique</strong>, peu d'apports empiriques</li>
                </ul>
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="IV. Lahire : vers une sociologie plus nuancée">
            <p className="mb-5 text-[var(--color-text-secondary)]">
              La sociologie actuelle est moins clivée (Bourdieu vs Boudon) et plus <strong>diversifiée</strong>. 
              La société a changé (déclin du secteur ouvrier, développement des classes moyennes), les grands modèles 
              ont dû s'<strong>adoucir</strong>.
            </p>

            <AuthorCard 
              name="Bernard Lahire" 
              work="L'Homme Pluriel, Culture des individus" 
              color="teal"
              image="https://upload.wikimedia.org/wikipedia/commons/f/fb/Bernard_Lahire.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Critique mais aussi <strong>extension</strong> des thèses de Bourdieu. Remet en cause 
                l'<strong>homogénéité de l'habitus</strong>. Propose une conception <strong>plurielle et fragmentée</strong> 
                des dispositions individuelles.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-success)] mb-4">
                <p className="font-medium text-[var(--color-success)] text-sm mb-2">Multiplicité des influences sociales</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  L'individu est traversé par une multiplicité de logiques <strong>sociales, culturelles et professionnelles</strong>. 
                  Reproche à Bourdieu la <strong>généralisation</strong> qui entraîne une homogénéisation.
                </p>
              </div>

              <Callout type="key" title="Transfuges de classe">
                Individus qui changent de classe sociale (ascension). Ils vivent des <strong>tensions identitaires</strong> 
                entre origine sociale et nouveau statut. Double socialisation → <strong>habitus contradictoires</strong> 
                (aller à l'opéra ET regarder la télé-réalité).
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="L'Homme Pluriel" 
              work="Approche contextuelle de la socialisation" 
              color="indigo"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                La socialisation est plus <strong>complexe et diffuse</strong>. Diversité des contextes 
                (famille, école, travail, amis). Chaque individu est traversé par une <strong>multiplicité de registres</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm">Bourdieu</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Importance centrale à l'appartenance à une <strong>classe</strong></p>
                  <p className="text-xs text-[var(--color-text-muted)]">Une seule disposition de classe</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Lahire</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Diversité des <strong>contextes</strong> rencontrés</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Pluralité de dispositions</p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)]">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Conséquences :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• L'individu <strong>adapte</strong> ses comportements selon les contextes</li>
                  <li>• Pluralité de contextes → pluralité de comportements et goûts</li>
                  <li>• L'école peut permettre l'<strong>ascension sociale</strong> (≠ Bourdieu)</li>
                  <li>• Diversité des trajectoires, l'individu n'est <strong>pas totalement déterminé</strong></li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : évolution de la sociologie française">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]"></th>
                    <th className="p-3 text-left font-semibold text-[var(--color-accent)] border border-[var(--color-border-default)]">Bourdieu</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-success)] border border-[var(--color-border-default)]">Boudon</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-success)] border border-[var(--color-border-default)]">Lahire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Approche</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Holisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Individualisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Contextuelle</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Vision</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Déterminisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Autonomie</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Nuancée</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Habitus</td>
                    <td className="p-3 border border-[var(--color-border-default)]">De classe</td>
                    <td className="p-3 border border-[var(--color-border-default)]">—</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Pluriels</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">École</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Reproduction</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Stratégies</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Ascension possible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La sociologie actuelle a une approche plus <strong>fine et nuancée</strong>. Les méthodes et outils 
              se sont diversifiés. On ne peut plus avoir des explications aussi <strong>catégoriques</strong>. 
              Les deux approches (structures vs individus) sont <strong>complémentaires</strong>.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={5} title="Bourdieu, Boudon, Lahire" questions={chapter5Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre4', label: '← Chapitre précédent', title: 'École de Chicago' }}
        next={{ path: '/socio/chapitre6', label: 'Thème 2 →', title: 'Sociologie économique' }}
      />
    </main>
  );
}

