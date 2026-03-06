import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter2Questions } from '../data/questions';

export default function Chapter2() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 02"
        title="Contexte d'émergence de la sociologie"
        description="Révolutions industrielles et politiques : les conditions de naissance de la sociologie comme science."
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
              La sociologie naît à la fin du XVIIIe - début XIXe dans un contexte de <strong>révolutions multiples</strong> 
              (politique, industrielle, scientifique). Elle émerge pour répondre à la <strong>"question sociale"</strong> 
              et recréer du <strong>lien social</strong> dans une société en mutation profonde.
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citation clé pour la dissertation
            </h4>
            <blockquote className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)] text-sm">
              <p className="italic text-[var(--color-text-secondary)]">"La sociologie est une fille des révolutions"</p>
              <p className="text-xs text-[var(--color-accent)] mt-1 font-medium">— Duvignaud</p>
            </blockquote>
          </div>

          {/* Les 3 révolutions */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🔥</span> Les 3 révolutions fondatrices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] text-center">
                <p className="font-bold text-[var(--color-error)] text-lg">1679</p>
                <p className="font-medium text-[var(--color-text-primary)]">Habeas Corpus</p>
                <p className="text-xs text-[var(--color-text-muted)]">Angleterre</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)] text-center">
                <p className="font-bold text-[var(--color-info)] text-lg">1776</p>
                <p className="font-medium text-[var(--color-text-primary)]">Indépendance</p>
                <p className="text-xs text-[var(--color-text-muted)]">USA</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)] text-center">
                <p className="font-bold text-[var(--color-accent)] text-lg">1789</p>
                <p className="font-medium text-[var(--color-text-primary)]">Révolution</p>
                <p className="text-xs text-[var(--color-text-muted)]">France + DDHC</p>
              </div>
            </div>
          </div>

          {/* Concepts clés */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Concepts & auteurs à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)]">
                <strong className="text-[var(--color-warning)]">Révolution industrielle</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Fin des corporations • Naissance du <strong>prolétariat</strong> • Urbanisation/exode rural • <strong>Positivisme</strong></p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-success)]">Villermé</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Enquête ouvriers textiles</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Premiers outils : <strong>observations, entretiens, statistiques</strong></p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-info)]">Le Play</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Ouvriers européens</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Outil statistique : <strong>budgets des ouvriers</strong> • Fonde la Société d'économie sociale</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Saint-Simon</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Science de la société sur modèle sciences naturelles • <strong>"Physiologie sociale"</strong> • Nouveaux détenteurs du pouvoir = dirigeants économiques</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                <div className="flex justify-between items-start">
                  <strong className="text-[var(--color-error)]">Karl Marx</strong>
                  <span className="text-xs text-[var(--color-text-muted)]">Le Capital</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1"><strong>Conflit social</strong> : capitalistes vs prolétariat • <strong>Aliénation</strong> • Sociologie du travail • Sociologie de la connaissance</p>
              </div>
            </div>
          </div>

          {/* Opposition clé */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Opposition clé : Capitalistes vs Prolétariat (Marx)
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl text-center">
                <p className="font-semibold text-[var(--color-text-primary)] mb-1">Capitalistes</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Détiennent les <strong>moyens de production</strong></p>
              </div>
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl text-center">
                <p className="font-semibold text-[var(--color-text-primary)] mb-1">Prolétariat</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Ne possèdent que leur <strong>force de travail</strong></p>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-3 text-center">→ Rapports de production génèrent des <strong>antagonismes sociaux</strong></p>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Limite de la sociologie naissante">
            La sociologie à ses débuts n'est <strong>pas objective</strong> : mélange de découvertes sociologiques 
            et de <strong>conventions morales</strong>. Elle devient une vraie science au XIXe avec la 
            <strong> neutralité axiologique</strong> (Weber).
          </Callout>

          {/* Enjeu */}
          <div className="p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">🎯 Enjeu des premiers sociologues :</strong> Recréer du <strong>lien social</strong> 
              et des repères dans une société en mutation. Reconstituer de nouvelles institutions pour rétablir l'ordre 
              et restaurer un lien social plus <strong>égalitaire</strong>.
            </p>
          </div>

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
          <Section title="Introduction : Contexte d'émergence">
            <p className="mb-4 text-[var(--color-text-secondary)]">
              La sociologie est une science récente qui naît après l'économie, à la <strong>fin du XVIIIe - début XIXe siècle</strong>.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Contexte de naissance</h5>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Révolution industrielle</strong></li>
                  <li>• Retrait et perte de puissance de la <strong>religion</strong></li>
                  <li>• Révolution politique → réorganisation sociale</li>
                  <li>• Fin de la <strong>société d'ordre</strong> (mobilité sociale)</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Enjeu des premiers sociologues</h5>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Recréer du <strong>lien social</strong> et des repères</li>
                  <li>• Reconstituer de nouvelles institutions</li>
                  <li>• Rétablir l'ordre social plus <strong>égalitaire</strong></li>
                  <li>• Fournir des instruments d'observation</li>
                </ul>
              </div>
            </div>

            <Callout type="key" title="La sociologie à ses débuts">
              Cherche à <strong>expliquer</strong> la société et la révolution industrielle, à <strong>découvrir les règles</strong> de la société, 
              et à déterminer les <strong>pratiques convenables</strong>.
            </Callout>

            <div className="mt-4">
              <Callout type="warning" title="Limite principale">
                La sociologie naissante n'est <strong>pas objective</strong> : mélange de découvertes sociologiques 
                et de <strong>conventions morales</strong> (jugements de valeur). Elle deviendra une vraie science 
                au XIXe avec la <strong>neutralité axiologique</strong>.
              </Callout>
            </div>
          </Section>

          <Section title="I. La sociologie fille des révolutions">
            <blockquote className="text-base sm:text-lg italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-accent)] pl-4 mb-6">
              "La sociologie est une fille des révolutions"
              <span className="block text-sm font-medium text-[var(--color-accent)] mt-1">— Duvignaud</span>
            </blockquote>

            <AuthorCard 
              name="Révolutions politiques et démocratiques" 
              work="Fin XVIIIe siècle" 
              color="rose"
              hideAvatar
            >
              <p className="text-sm mb-4 text-[var(--color-text-secondary)]">
                Des régimes démocratiques s'installent dans les sociétés occidentales, entraînant des <strong>changements sociaux profonds</strong>.
              </p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="text-center p-2.5 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-bold text-[var(--color-error)] text-sm sm:text-base">1679</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Habeas Corpus</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Angleterre</p>
                </div>
                <div className="text-center p-2.5 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-bold text-[var(--color-info)] text-sm sm:text-base">1776</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Indépendance</p>
                  <p className="text-xs text-[var(--color-text-muted)]">USA</p>
                </div>
                <div className="text-center p-2.5 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-bold text-[var(--color-accent)] text-sm sm:text-base">1789</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Révolution</p>
                  <p className="text-xs text-[var(--color-text-muted)]">France</p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Conséquences :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• <strong>Fin de la société d'ordre</strong> → mobilité sociale</li>
                  <li>• La position sociale n'est plus héritée</li>
                  <li>• Reconnaissance des <strong>droits et libertés individuelles</strong> (DDHC en France)</li>
                </ul>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Révolution industrielle" 
              work="Transformations économiques et sociales" 
              color="blue"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Transformations économiques</p>
                  <ul className="space-y-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    <li>• <strong>Disparition des corporations</strong> (maître, apprenti, compagnon)</li>
                    <li>• Proclamation de la liberté individuelle</li>
                    <li>• Mariage civil, divorce, réforme des héritages</li>
                    <li>• Développement des usines → <strong>capitalisme</strong></li>
                  </ul>
                </div>
                <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm mb-2">Conséquences sociales</p>
                  <ul className="space-y-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    <li>• Naissance du <strong>prolétariat</strong> (classe ouvrière)</li>
                    <li>• <strong>Urbanisation</strong> et exode rural</li>
                    <li>• <strong>Individualisme</strong>, perte de solidarité</li>
                    <li>• Disparition des cultures paysannes/villageoises</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Progrès technique et essor de la science</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Électricité, train... Le <strong>XIXe est le siècle de la science</strong>. 
                  Émergence de la <strong>"question sociale"</strong> : comment vivent les populations ? Quelles inégalités ?
                </p>
              </div>

              <Callout type="key" title="Le positivisme">
                La science peut tout résoudre, elle a un pouvoir infini. Donc elle va expliquer le social : 
                c'est la naissance de la <strong>sociologie</strong>. On passe de simples réflexions à de véritables 
                réflexions scientifiques avec une méthodologie.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="II. Les débuts des enquêtes sociologiques">
            <p className="mb-5 text-[var(--color-text-secondary)]">
              Les premiers enquêteurs posent les bases méthodologiques de la sociologie, même si elle se mélange 
              encore à d'autres sciences (médecine, psychologie).
            </p>

            <AuthorCard 
              name="Docteur Villermé" 
              work="Enquête sur les ouvriers textiles" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/a/a0/Louis-Ren%C3%A9_Villerm%C3%A9.jpg"
            >
              <p className="text-sm sm:text-base mb-3">
                Mandaté par l'<strong>Académie des sciences morales et politiques</strong> pour étudier 
                l'état physique et moral des ouvriers dans les fabriques textiles.
              </p>
              <div className="p-3 bg-linear-to-r from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)]">
                <p className="text-xs font-semibold text-[var(--color-success)] mb-2">Premiers outils sociologiques :</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[var(--color-success-subtle)] rounded-lg text-xs font-medium text-[var(--color-success)]">Observations</span>
                  <span className="px-3 py-1 bg-[var(--color-success-subtle)] rounded-lg text-xs font-medium text-[var(--color-success)]">Entretiens</span>
                  <span className="px-3 py-1 bg-[var(--color-success-subtle)] rounded-lg text-xs font-medium text-[var(--color-success)]">Statistiques</span>
                </div>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Frédéric Le Play" 
              work="Les ouvriers européens" 
              color="blue"
              image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Frederic_Le_Play.jpg"
            >
              <p className="text-sm sm:text-base mb-3">
                Étudie les ouvriers européens en utilisant l'<strong>outil statistique</strong>, notamment les 
                <strong> budgets des ouvriers</strong> (impact sur les comportements de consommation).
              </p>
              <Callout type="key">
                Fonde la <strong>Société d'économie sociale</strong>, initiatrice de nombreuses enquêtes sociales 
                qui nourrissent les débuts de la sociologie.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Claude Henri de Saint-Simon" 
              work="Science de la société" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Claude_Henri_de_Rouvroy.jpg/500px-Claude_Henri_de_Rouvroy.jpg"
            >
              <p className="text-sm sm:text-base mb-4">
                Propose de construire une <strong>science de la société</strong> sur le modèle des sciences de la nature 
                (biologie, chimie, physique).
              </p>
              <ul className="space-y-2 text-sm sm:text-base mb-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                  <span>Évoque la <strong>"science de l'homme"</strong> et la <strong>"physiologie sociale"</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                  <span>Veut <strong>"soigner les maux de la civilisation"</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                  <span>Identifie les nouveaux détenteurs du pouvoir : les <strong>dirigeants économiques</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] mt-2 shrink-0" />
                  <span>Inégalités : avant héritées, maintenant liées aux <strong>compétences et talents</strong></span>
                </li>
              </ul>
            </AuthorCard>
          </Section>

          <Section title="III. Karl Marx : sociologie du conflit">
            <AuthorCard 
              name="Karl Marx" 
              dates="1818-1883" 
              work="Le Capital" 
              color="rose"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/220px-Karl_Marx_001.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Bien qu'il <strong>ne se revendique pas sociologue</strong>, Marx crée une sociologie fondée sur le 
                <strong> conflit social</strong> et la <strong>théorie de l'exploitation</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-bold text-[var(--color-error)]">Capitalistes</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Détiennent les <strong>moyens de production</strong></p>
                  <p className="text-xs text-[var(--color-text-muted)]">Bourgeoisie</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-bold text-[var(--color-info)]">Prolétariat</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Ne possèdent que leur <strong>force de travail</strong></p>
                  <p className="text-xs text-[var(--color-text-muted)]">Classe ouvrière</p>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Contradictions du système capitaliste :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Système fondé sur la <strong>recherche du profit</strong></li>
                  <li>• Profit passe par l'<strong>exploitation de la force de travail</strong></li>
                  <li>• Les fruits du travail ne reviennent pas à ceux qui produisent → <strong>confiscation</strong></li>
                  <li>• Le profit permet l'enrichissement de la bourgeoisie</li>
                </ul>
              </div>

              <Callout type="warning" title="Processus d'aliénation">
                L'ouvrier est <strong>dépossédé du fruit de son travail</strong>. Il est soumis à la domination 
                du capitaliste qui possède les moyens de production. L'ouvrier devient un <strong>simple exécutant</strong> 
                qui perd tout contrôle sur le processus productif.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Sociologie du travail (Marx)" 
              work="Le travail comme activité sociale" 
              color="amber"
              hideAvatar
            >
              <p className="text-sm mb-3">Le travail est une <strong>activité sociale</strong> :</p>
              <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1 mb-3">
                <li>• Permet à l'homme de <strong>se réaliser</strong> et transformer le monde</li>
                <li>• Suppose une <strong>coopération sociale</strong> (division des tâches)</li>
                <li>• Source d'<strong>émancipation</strong> et principe d'organisation</li>
              </ul>
              <p className="text-xs text-[var(--color-text-muted)] italic">
                Mais dans le capitalisme, le travail devient une simple marchandise qui détruit l'homme.
              </p>
            </AuthorCard>

            <AuthorCard 
              name="Sociologie de la connaissance (Marx)" 
              work="Diffusion des idées" 
              color="indigo"
              hideAvatar
            >
              <p className="text-sm mb-3">Comment les <strong>idées se diffusent</strong> :</p>
              <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                <li>• Les idées dominantes ne sont <strong>pas neutres</strong></li>
                <li>• Elles reflètent des <strong>intérêts</strong> et des <strong>rapports de domination</strong></li>
                <li>• Avec l'aliénation, les idées de la classe dominante sont perçues comme <strong>universelles</strong></li>
              </ul>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Limites et évolution">
            <Callout type="warning" title="Limite de la sociologie naissante">
              La sociologie à ses débuts n'est <strong>pas objective</strong> : mélange de découvertes sociologiques 
              et de <strong>conventions morales</strong>. Elle porte des jugements de valeur qui l'éloignent de l'objectivité scientifique.
            </Callout>

            <div className="mt-4">
              <Callout type="key" title="Évolution vers la science">
                Au XIXe siècle, la sociologie deviendra une vraie science grâce à la <strong>neutralité axiologique</strong> (Weber) : 
                le sociologue doit suspendre ses jugements de valeur pour analyser objectivement les faits sociaux.
              </Callout>
            </div>
          </Section>
        </>
      )}

      <ChapterQCM chapter={2} title="Contexte d'émergence" questions={chapter2Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre1', label: '← Chapitre précédent', title: 'Naissance de la sociologie' }}
        next={{ path: '/socio/chapitre3', label: 'Chapitre suivant →', title: 'Durkheim et Weber' }}
      />
    </main>
  );
}

