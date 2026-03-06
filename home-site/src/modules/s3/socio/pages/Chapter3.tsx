import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter3Questions } from '../data/questions';

export default function Chapter3() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 03"
        title="Durkheim et Weber : les pères fondateurs"
        description="Les débuts de la sociologie en tant que science à part entière avec deux approches opposées."
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
              Deux approches fondatrices s'opposent : <strong>Durkheim</strong> (expliquer objectivement les faits sociaux, 
              holisme, déterminisme) vs <strong>Weber</strong> (comprendre le sens des actions, individualisme méthodologique).
              La querelle des méthodes oppose sciences de la nature et sciences de l'esprit.
            </p>
          </div>

          {/* Citations clés */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Nous expliquons la nature et nous comprenons la vie psychique"</p>
                <p className="text-xs text-[var(--color-info)] mt-1 font-medium">— Dilthey (querelle des méthodes)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Les faits sociaux sont des manières d'agir, de penser et de sentir, extérieures à l'homme"</p>
                <p className="text-xs text-[var(--color-accent)] mt-1 font-medium">— Durkheim</p>
              </blockquote>
            </div>
          </div>

          {/* Opposition Durkheim vs Weber */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Opposition fondamentale : Durkheim vs Weber
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-accent)] mb-2">Durkheim</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Logique <strong>explicative</strong></li>
                  <li>• Science du <strong>fait social</strong></li>
                  <li>• <strong>Holisme</strong> / Macrosociologie</li>
                  <li>• <strong>Déterminisme</strong> social</li>
                  <li>• Méthode <strong>quantitative</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-success)] mb-2">Weber</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Logique <strong>compréhensive</strong></li>
                  <li>• Science de l'<strong>action sociale</strong></li>
                  <li>• <strong>Individualisme</strong> méthodologique</li>
                  <li>• <strong>Autonomie</strong> de l'individu</li>
                  <li>• Méthode des <strong>idéaux-types</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Concepts Durkheim */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Durkheim : concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Faits sociaux</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Manières d'agir/penser/sentir • <strong>Extérieurs</strong> à l'individu • <strong>Contraignants</strong> • Collectifs</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <strong className="text-[var(--color-info)]">Le Suicide (4 types)</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Égoïste</strong> (intégration faible) • <strong>Altruiste</strong> (intégration forte) • <strong>Anomique</strong> (régulation faible) • <strong>Fataliste</strong> (régulation forte)</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)]">
                <strong className="text-[var(--color-warning)]">Division du travail</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Solidarité mécanique</strong> (sociétés traditionnelles, ressemblance) vs <strong>Solidarité organique</strong> (sociétés industrielles, complémentarité)</p>
              </div>
            </div>
          </div>

          {/* Concepts Weber */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Weber : concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <strong className="text-[var(--color-success)]">Approche compréhensive</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Comprendre le <strong>sens</strong> que les individus donnent à leurs actions • Se mettre à la place de l'acteur</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                <strong className="text-[var(--color-error)]">Éthique protestante et capitalisme</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Prédestination</strong> • <strong>Beruf</strong> (vocation au travail) • <strong>Ascèse</strong> (pas de consommation ostentatoire) → Accumulation du capital</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Idéaux-types</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Modèles abstraits pour comprendre la réalité • Ex : idéal-type du capitaliste, du protestant</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas confondre <strong>expliquer</strong> (Durkheim : rechercher les causes, déterminisme) et 
            <strong> comprendre</strong> (Weber : saisir le sens subjectif). Les deux approches sont complémentaires, 
            pas exclusives.
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
          <Section title="Introduction : La querelle des méthodes">
            <p className="mb-4 text-[var(--color-text-secondary)]">
              La querelle des méthodes prend naissance en <strong>Allemagne au XIXe siècle</strong>. Elle s'intéresse 
              à la méthodologie et à l'<strong>épistémologie</strong> (comment se construit la science).
            </p>

            <blockquote className="text-base sm:text-lg italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-info)] pl-4 mb-6">
              "Nous expliquons la nature et nous comprenons la vie psychique"
              <span className="block text-sm font-medium text-[var(--color-info)] mt-1">— Wilhelm Dilthey</span>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Sciences de la nature</h5>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Faits <strong>naturels</strong></li>
                  <li>• <strong>Déterminisme</strong></li>
                  <li>• On cherche à <strong>expliquer</strong></li>
                  <li>• Lois <strong>universelles</strong></li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Sciences de l'esprit</h5>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Faits <strong>humains</strong></li>
                  <li>• <strong>Indétermination</strong> (être humain imprévisible)</li>
                  <li>• On cherche à <strong>comprendre</strong></li>
                  <li>• Lois <strong>contextuelles</strong></li>
                </ul>
              </div>
            </div>

            <AuthorCard 
              name="Deux écoles s'affrontent" 
              work="Quelle méthode pour la sociologie ?" 
              color="slate"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm">École autrichienne</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Méthode <strong>différente</strong> pour chaque science</p>
                </div>
                <div className="p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm">École historique allemande</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Méthode <strong>commune</strong> pour toutes les sciences</p>
                </div>
              </div>
              <Callout type="key">
                La sociologie adopte finalement les méthodes des <strong>sciences de la nature</strong> car elles sont 
                censées être objectives grâce à leurs outils.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="I. Durkheim : la sociologie du fait social">
            <AuthorCard 
              name="Émile Durkheim" 
              dates="1858-1917" 
              work="Les règles de la méthode sociologique (1895)" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/%C3%89mile_Durkheim.jpg/500px-%C3%89mile_Durkheim.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                <strong>Père de la sociologie française</strong>. Son enjeu : faire de la sociologie une vraie science 
                <strong> autonome</strong>, à part entière. Il insiste sur l'<strong>objectivité scientifique</strong> : 
                laisser de côté convictions, préjugés, subjectivité, aspects moraux.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Les faits sociaux sont :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Des manières d'<strong>agir, penser et sentir</strong></li>
                  <li>• <strong>Extérieurs</strong> aux individus (existent en dehors des consciences individuelles)</li>
                  <li>• <strong>Contraignants et coercitifs</strong> (normes, mœurs, sanctions)</li>
                  <li>• <strong>Collectifs</strong> (répandus, partagés par l'ensemble de la société)</li>
                </ul>
              </div>

              <Callout type="key" title="Règle fondamentale">
                <strong>Traiter les faits sociaux comme des choses</strong> : rompre avec le sens commun et les prénotions. 
                Les faits sociaux s'expliquent par d'autres faits sociaux (pas par la psychologie).
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Méthode durkheimienne" 
              work="Statistiques et corrélations" 
              color="blue"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-3">
                Le sociologue cherche des <strong>régularités</strong> grâce aux <strong>statistiques</strong>. 
                Ces dernières mettent en évidence des <strong>corrélations statistiques</strong> → <strong>corrélations sociologiques</strong>.
              </p>
              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  <strong>Conséquence majeure :</strong> Les faits sociaux <strong>déterminent</strong> l'individu = 
                  <strong> déterminisme social</strong>. Le monde social obéit à des lois. C'est une approche 
                  <strong> holiste / macrosociologique</strong> (on s'intéresse aux agrégats : familles, classes sociales...).
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Division du travail social" 
              work="Deux types de solidarité" 
              color="amber"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm mb-1">Solidarité mécanique</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Sociétés <strong>traditionnelles</strong> à faible division du travail</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Lien social repose sur la <strong>ressemblance</strong> (même mode de vie)</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm mb-1">Solidarité organique</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Sociétés <strong>industrielles</strong> à forte division du travail</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Lien social repose sur la <strong>complémentarité</strong> (comme un corps avec ses organes)</p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] italic">
                La solidarité organique favorise l'individualisme mais crée aussi du lien social par l'interdépendance.
              </p>
            </AuthorCard>
          </Section>

          <Section title="II. Le Suicide : application de la méthode">
            <p className="mb-5 text-[var(--color-text-secondary)]">
              Durkheim applique sa méthode sur le suicide pour démontrer que même un acte apparemment 
              <strong> individuel</strong> a des <strong>causes sociales</strong>. Il utilise des statistiques européennes 
              et la méthode <strong>hypothético-déductive</strong>.
            </p>

            <AuthorCard 
              name="Hypothèses testées et rejetées" 
              work="Ce qui n'explique PAS le suicide" 
              color="slate"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <div className="p-2 bg-[var(--color-error-subtle)] rounded-lg text-center border border-[var(--color-error)]">
                  <p className="text-xs text-[var(--color-text-secondary)]">❌ Folie</p>
                </div>
                <div className="p-2 bg-[var(--color-error-subtle)] rounded-lg text-center border border-[var(--color-error)]">
                  <p className="text-xs text-[var(--color-text-secondary)]">❌ Race / Hérédité</p>
                </div>
                <div className="p-2 bg-[var(--color-error-subtle)] rounded-lg text-center border border-[var(--color-error)]">
                  <p className="text-xs text-[var(--color-text-secondary)]">❌ Climat / Température</p>
                </div>
              </div>
              <Callout type="key">
                Le suicide s'explique par l'<strong>intégration sociale</strong> et le degré de <strong>régulation sociale</strong> 
                (lois, réglementations qui créent des repères).
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Les 4 types de suicide" 
              work="Selon intégration et régulation" 
              color="rose"
              hideAvatar
            >
              <p className="text-sm mb-4 font-medium text-[var(--color-text-secondary)]">1. Selon le degré d'intégration sociale :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Suicide égoïste</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Intégration <strong>faible</strong></p>
                  <p className="text-xs text-[var(--color-text-secondary)]">L'individu prime sur la société, repli sur soi</p>
                  <p className="text-xs text-[var(--color-text-muted)] italic mt-1">Ex : célibataires</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm">Suicide altruiste</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Intégration <strong>forte</strong></p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Le groupe prime sur l'individu</p>
                  <p className="text-xs text-[var(--color-text-muted)] italic mt-1">Ex : kamikazes</p>
                </div>
              </div>

              <p className="text-sm mb-4 font-medium text-[var(--color-text-secondary)]">2. Selon le degré de régulation sociale :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Suicide anomique</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Régulation <strong>faible</strong></p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Société en crise, désorientation</p>
                  <p className="text-xs text-[var(--color-text-muted)] italic mt-1">Ex : crise de 1929, passage autoritarisme → libéralisme</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                  <p className="font-semibold text-[var(--color-text-secondary)] text-sm">Suicide fataliste</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Régulation <strong>forte</strong></p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Passions trop réglementées, pas d'échappatoire</p>
                  <p className="text-xs text-[var(--color-text-muted)] italic mt-1">Ex : condamné à perpétuité, mariage forcé</p>
                </div>
              </div>
            </AuthorCard>

            <Callout type="key" title="Conclusion sur Durkheim">
              Durkheim <strong>explique le social par le social</strong>. La sociologie est une science objective 
              sur le modèle des sciences dures. Les statistiques permettent l'objectivité et de traiter le collectif. 
              Approche <strong>holiste</strong> et <strong>déterministe</strong> s'opposant à l'autonomie de l'individu.
            </Callout>
          </Section>

          <Section title="III. Weber : une sociologie compréhensive">
            <AuthorCard 
              name="Max Weber" 
              dates="1864-1920" 
              work="L'éthique protestante et l'esprit du capitalisme" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Max_Weber_1894.jpg/220px-Max_Weber_1894.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Weber cherche à <strong>comprendre</strong> et non à expliquer. L'<strong>approche compréhensive</strong> 
                consiste à comprendre le <strong>sens</strong> que les individus donnent à leurs actions et comportements.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Caractéristiques de l'approche :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Le sociologue <strong>se met à la place</strong> des agents</li>
                  <li>• Comprend les <strong>raisons</strong> de l'action</li>
                  <li>• L'enjeu est l'<strong>action sociale</strong></li>
                  <li>• L'<strong>individu est central</strong></li>
                </ul>
              </div>

              <Callout type="key">
                Approche <strong>microsociologique</strong> avec l'<strong>individualisme méthodologique</strong> 
                (≠ holisme de Durkheim). On ne cherche plus le "pourquoi" mais le "comment".
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="L'éthique protestante et l'esprit du capitalisme" 
              work="Comment est né le capitalisme ?" 
              color="teal"
              hideAvatar
            >
              <p className="text-sm sm:text-base mb-4">
                Weber constate que le capitalisme naît au <strong>XVI-XVIIe siècle</strong> en Allemagne et Prusse 
                (protestants), mais pas en Italie, Espagne, France (catholiques). Il y a un <strong>lien entre 
                religion protestante et capitalisme</strong>.
              </p>

              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Méthode des idéaux-types :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm mb-1">Idéal-type du capitaliste</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Ne poursuit pas que l'argent</li>
                    <li>• Comportement <strong>rationnel</strong></li>
                    <li>• Anticipations, prévisions, calculs</li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm mb-1">Idéal-type du protestant</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• <strong>Prédestination</strong> (élu ou pas)</li>
                    <li>• <strong>Beruf</strong> : vocation au travail</li>
                    <li>• <strong>Ascèse</strong> : pas de luxe</li>
                  </ul>
                </div>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Le mécanisme protestant → capitalisme" 
              work="Accumulation du capital" 
              color="indigo"
              hideAvatar
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 text-sm mb-4">
                <div className="flex-1 p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl text-center border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-xs">Prédestination</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Chercher des signes d'élection</p>
                </div>
                <span className="text-[var(--color-text-muted)] font-bold text-center hidden sm:block">→</span>
                <div className="flex-1 p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl text-center border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-xs">Beruf</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Investissement décuplé dans le travail</p>
                </div>
                <span className="text-[var(--color-text-muted)] font-bold text-center hidden sm:block">→</span>
                <div className="flex-1 p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl text-center border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-xs">Ascèse</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Salaire réinvesti, pas de luxe</p>
                </div>
              </div>

              <Callout type="key" title="Résultat">
                <strong>Accumulation de richesses sans consommation</strong> = accumulation du capital. 
                Les valeurs religieuses protestantes ont façonné l'émergence du capitalisme moderne.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : Durkheim vs Weber">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]"></th>
                    <th className="p-3 text-left font-semibold text-[var(--color-accent)] border border-[var(--color-border-default)]">Durkheim</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-success)] border border-[var(--color-border-default)]">Weber</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Objectif</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Expliquer</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Comprendre</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Objet</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Fait social</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Action sociale</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Approche</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Holisme / Macro</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Individualisme / Micro</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Vision</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Déterminisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Autonomie</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium">Méthode</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Statistiques</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Idéaux-types</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <Callout type="warning" title="À retenir pour l'examen">
                Ces deux approches ne sont pas exclusives mais <strong>complémentaires</strong>. La sociologie moderne 
                utilise les deux selon l'objet d'étude. Durkheim = le collectif détermine l'individu. 
                Weber = l'individu donne sens à ses actions.
              </Callout>
            </div>
          </Section>
        </>
      )}

      <ChapterQCM chapter={3} title="Durkheim et Weber" questions={chapter3Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre2', label: '← Chapitre précédent', title: "Contexte d'émergence" }}
        next={{ path: '/socio/chapitre4', label: 'Chapitre suivant →', title: "L'école de Chicago" }}
      />
    </main>
  );
}

