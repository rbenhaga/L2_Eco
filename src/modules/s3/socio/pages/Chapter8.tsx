import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter8Questions } from '../data/questions';

export default function Chapter8() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 08"
        title="Société de consommation et culture de masse"
        description="Baudrillard, Marcuse, Debord et la critique de l'industrie culturelle."
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
              La société de consommation de masse (Trente Glorieuses) crée un <strong>malaise social</strong>. 
              La <strong>publicité</strong> dépossède le consommateur de sa subjectivité. La <strong>culture de masse</strong> 
              formate l'individu et homogénéise les goûts au service du <strong>capitalisme</strong>.
            </p>
          </div>

          {/* Citations clés */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Faux besoins fabriqués par le rendement et la publicité"</p>
                <p className="text-xs text-[var(--color-error)] mt-1 font-medium">— Marcuse (L'homme unidimensionnel)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Le spectacle est l'appareil de propagande et la religion de la marchandise"</p>
                <p className="text-xs text-[var(--color-accent)] mt-1 font-medium">— Debord (La Société du spectacle)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Dépravation de la culture : l'art transformé en business"</p>
                <p className="text-xs text-[var(--color-warning)] mt-1 font-medium">— Adorno & Horkheimer (La dialectique de la raison)</p>
              </blockquote>
            </div>
          </div>

          {/* Caractéristiques société de consommation */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-error)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🛒</span> 5 caractéristiques de la société de consommation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-error)]">1.</strong> Jouissance immédiate (crédit)
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-error)]">2.</strong> Abondance de biens (production de masse)
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-error)]">3.</strong> Marchandisation des modes de vie
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-error)]">4.</strong> Émergence de nouveaux besoins (publicité)
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg col-span-1 sm:col-span-2 text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-error)]">5.</strong> Extension des aspirations (publicité nous fait rêver)
              </div>
            </div>
          </div>

          {/* Auteurs à maîtriser */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <strong className="text-[var(--color-info)]">Baudrillard</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Société de consommation de masse • Puissance de l'objet à séduire • Disparition du réel</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                <strong className="text-[var(--color-error)]">Marcuse</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">L'homme unidimensionnel • Faux besoins • Rendement + publicité</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Debord</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">La Société du spectacle • Aliénation • Religion de la marchandise</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)]">
                <strong className="text-[var(--color-warning)]">Adorno & Horkheimer</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Dialectique de la raison • Industrie culturelle • Dépravation de la culture</p>
              </div>
            </div>
          </div>

          {/* Opposition culture */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent border border-[var(--color-accent)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Culture de masse : d'en haut ou d'en bas ?
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-accent)] mb-2">Top-down (d'en haut)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Industrie <strong>standardise</strong> les goûts</li>
                  <li>• <strong>Uniformise</strong> les comportements</li>
                  <li>• Consommateur = acteur <strong>passif</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-[var(--color-bg-raised)]/80 rounded-xl">
                <p className="font-semibold text-[var(--color-success)] mb-2">Bottom-up (d'en bas)</p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Public <strong>pas passif</strong></li>
                  <li>• Crée ses pratiques <strong>populaires</strong></li>
                  <li>• Repris par l'industrie (profit)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas confondre <strong>culture de masse</strong> (formatée pour plaire à tous) et <strong>démocratisation 
            de la culture cultivée</strong>. Selon Lasch, la culture de masse a <strong>accru le fossé</strong> culturel 
            entre classes populaires et aisées.
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
          <Section title="I. La société de consommation de masse">
            <AuthorCard 
              name="Jean Baudrillard" 
              dates="1929-2007" 
              work="La Société de consommation" 
              color="sky"
              image="https://upload.wikimedia.org/wikipedia/commons/e/ef/WikipediaBaudrillard20040612-cropped.png"
            >
              <p className="mb-4 text-sm sm:text-base">
                Baudrillard analyse la <strong>société de consommation de masse</strong> née pendant les Trente Glorieuses.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)] mb-4">
                <p className="font-medium text-[var(--color-info)] text-sm mb-2">Contexte des Trente Glorieuses (1945-1975)</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Période d'<strong>abondance</strong> et de prospérité (plein emploi, croissance ×3)</li>
                  <li>• Capitalisme industriel : <strong>taylorisme</strong> et <strong>fordisme</strong></li>
                  <li>• Standardisation et travail à la chaîne → <strong>baisse des coûts et des prix</strong></li>
                  <li>• <strong>Démocratisation</strong> de la consommation → consommation de masse</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Évolutions positives</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Création super/hypermarchés</li>
                    <li>• Hausse espérance de vie (+14 ans)</li>
                    <li>• Arrivée des femmes sur le marché du travail</li>
                    <li>• Double salaire → plus de consommation</li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Facteurs clés</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• <strong>Crédit à la consommation</strong></li>
                    <li>• <strong>Publicité</strong> (persuasion)</li>
                    <li>• Alimentation : 20-25% → baisse</li>
                    <li>• Vacances, loisirs → hausse</li>
                  </ul>
                </div>
              </div>

              <Callout type="warning" title="Critique de la publicité">
                La publicité <strong>dépossède le consommateur</strong> de sa subjectivité et de son libre arbitre. 
                Elle crée du sens là où il n'y en a pas nécessairement.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Caractéristiques de la société de consommation" 
              work="Nouvelle culture matérielle" 
              color="rose"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Émergence d'une nouvelle <strong>culture matérielle</strong> en rupture radicale avec les générations passées. 
                Nouveau style de vie <strong>urbain</strong> : hausse de la sphère marchande, baisse de la sphère domestique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm mb-2">5 caractéristiques</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>1. <strong>Jouissance immédiate</strong> (crédit)</li>
                    <li>2. <strong>Abondance</strong> de biens et services</li>
                    <li>3. <strong>Marchandisation</strong> des modes de vie</li>
                    <li>4. Émergence de <strong>nouveaux besoins</strong></li>
                    <li>5. <strong>Extension des aspirations</strong></li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm mb-2">Baudrillard : disparition du réel</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Puissance de l'objet à <strong>séduire</strong>. Critique des technologies de l'information 
                    qui font basculer vers une société globale avec une <strong>prolifération excessive de sens</strong>.
                  </p>
                </div>
              </div>

              <Callout type="key">
                Cette société de consommation crée un <strong>malaise social</strong> étudié par les sociologues. 
                De plus en plus de <strong>rejet</strong> de cette consommation de masse.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="II. Critiques de la société de consommation">
            <AuthorCard 
              name="Herbert Marcuse" 
              dates="1898-1979" 
              work="L'homme unidimensionnel" 
              color="rose"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Herbert_Marcuse_in_Newton%2C_Massachusetts_1955.jpeg/250px-Herbert_Marcuse_in_Newton%2C_Massachusetts_1955.jpeg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Marcuse parle de <strong>faux besoins</strong> fabriqués par deux principes.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] text-center">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Toujours plus de rendements</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Logique productiviste</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] text-center">
                  <p className="font-semibold text-[var(--color-error)] text-sm">Publicité</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Création de besoins artificiels</p>
                </div>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Guy Debord" 
              dates="1931-1994" 
              work="La Société du spectacle" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Guy_Debord%2C_painted_portrait.jpg/500px-Guy_Debord%2C_painted_portrait.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Debord parle d'<strong>aliénation</strong> de la société de consommation. Il critique la 
                <strong> marchandise</strong> et la domination qu'elle exerce sur la vie des individus.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">Thèses principales</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Mode de reproduction basé sur des marchandises toujours plus <strong>nombreuses et semblables</strong></li>
                  <li>• Le <strong>spectacle</strong> = stade achevé du capitalisme</li>
                  <li>• Le spectacle = <strong>appareil de propagande</strong> (publicité)</li>
                  <li>• Le spectacle = <strong>religion de la marchandise</strong></li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="III. La culture de masse">
            <AuthorCard 
              name="Définition et émergence" 
              work="Culture formatée pour plaire à tous" 
              color="indigo"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                La culture de masse est accessible par un grand nombre car elle est <strong>formatée pour plaire à tout le monde</strong>. 
                Elle est très <strong>critiquée</strong> par les sociologues.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">Émergence</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• <strong>USA années 30</strong> : cinéma hollywoodien</li>
                  <li>• <strong>France années 60</strong></li>
                  <li>• Canaux : télévision, radio, presse à gros tirage</li>
                  <li>• Développement grâce à la <strong>publicité</strong> et les médias</li>
                  <li>• Derrière : le <strong>capitalisme</strong></li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                  <p className="font-semibold text-[var(--color-text-secondary)] text-sm mb-2">Cultures traditionnelles</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• <strong>Scolaire</strong> : école obligatoire</li>
                    <li>• <strong>Nationale</strong> : service militaire</li>
                    <li>• <strong>Religieuse</strong> : plus ou moins imposée</li>
                    <li>→ Souvent <strong>gratuites</strong></li>
                  </ul>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm mb-2">Culture de masse</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Proposée sur un <strong>marché</strong></li>
                    <li>• Faite pour être <strong>consommée</strong></li>
                    <li>• Produite <strong>industriellement</strong></li>
                    <li>• But : <strong>plaire et séduire</strong></li>
                  </ul>
                </div>
              </div>

              <Callout type="warning" title="Critiques">
                Elle <strong>formate</strong> l'individu, oriente sa pensée vers des achats massifs. 
                Question des <strong>valeurs</strong> : toujours plus de quantitatif, moins de qualitatif. 
                <strong>Homogénéisation</strong> de la culture, plus de diversité.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="IV. Adorno, Horkheimer et l'industrie culturelle">
            <AuthorCard 
              name="Theodor Adorno & Max Horkheimer" 
              work="La dialectique de la raison" 
              color="amber"
              image="https://assets.change.org/photos/3/dx/ll/KNdXLLtznAaOqfz-800x450-noPad.jpg?1522639739"
            >
              <p className="mb-4 text-sm sm:text-base">
                Sociologues <strong>marxistes</strong>. Ils parlent de <strong>dépravation de la culture</strong> : 
                transformation négative, excès négatif. La culture transforme l'art en <strong>business</strong> : produits standardisés.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">La dialectique de la raison</p>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-2">
                  Une <strong>dialectique</strong> = méthode qui met en évidence une contradiction pour la dépasser.
                </p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Opposition entre ce qui serait <strong>rationnel</strong> et la culture de masse</li>
                  <li>• La raison est formatée et mise au service de l'<strong>industrie culturelle</strong></li>
                  <li>• Seul but : la <strong>rentabilité</strong></li>
                </ul>
              </div>

              <Callout type="key" title="Fusion industrie culturelle et divertissement">
                La <strong>publicité</strong> est érigée au rang de culture populaire, en art (cf. Andy Warhol). 
                Liaison entre <strong>propagande et publicité</strong> : mêmes moyens, agissent sur la volonté. 
                Affiches, couleurs similaires (vives, rouge et jaune).
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Christopher Lasch" 
              dates="1932-1994" 
              work="La culture du narcissisme" 
              color="teal"
              image="https://upload.wikimedia.org/wikipedia/en/f/f8/Christopher_Lasch.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Il n'y a <strong>pas eu démocratisation</strong> de la culture cultivée avec la culture de masse. 
                Certes l'école diffuse cette dernière mais pas par envie, c'est <strong>imposé</strong>.
              </p>

              <Callout type="warning">
                La culture de masse est venue <strong>accroître le fossé culturel</strong> entre les classes 
                populaires et aisées. Seule démocratisation : les <strong>romans</strong> (livre de poche).
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Michel Clouscard" 
              dates="1928-2009" 
              work="Le capitalisme de la séduction" 
              color="rose"
              image="https://cdn.kontrekulture.com/wp-content/uploads/20200626230529/index.jpg"
            >
              <p className="text-sm sm:text-base">
                Il reprend l'idée que les biens accessibles à tous ne sont <strong>pas des biens de luxe</strong>. 
                La culture de masse <strong>cache les disparités sociales</strong>.
              </p>
            </AuthorCard>
          </Section>

          <Section title="V. Culture de masse : d'en haut ou d'en bas ?">
            <AuthorCard 
              name="Deux visions de la culture de masse" 
              work="Top-down vs Bottom-up" 
              color="indigo"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] mb-2">D'en haut (top-down)</p>
                  <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                    <li>• L'industrie culturelle <strong>standardise</strong> les goûts</li>
                    <li>• <strong>Uniformise</strong> les comportements</li>
                    <li>• Transforme le consommateur en acteur <strong>passif</strong></li>
                    <li>• Il ne choisit pas vraiment</li>
                  </ul>
                </div>
                <div className="p-4 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] mb-2">D'en bas (bottom-up)</p>
                  <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                    <li>• Le public n'est <strong>pas passif</strong></li>
                    <li>• Il <strong>crée</strong> et développe ses pratiques populaires</li>
                    <li>• Opportunité de <strong>profits</strong></li>
                    <li>• Repris par ceux d'en haut</li>
                  </ul>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="VI. Et aujourd'hui ? Culture mainstream">
            <AuthorCard 
              name="Culture mainstream" 
              work="Américanisation et mondialisation" 
              color="sky"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                On parle plus de culture de masse mais de <strong>culture mainstream</strong> : culture dominante 
                que l'élite n'aime pas mais que "monsieur tout le monde" adore.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)] mb-4">
                <p className="font-medium text-[var(--color-info)] text-sm mb-2">Deux forces derrière</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg text-center">
                    <p className="font-semibold text-[var(--color-info)] text-sm">Américanisation</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Valeurs USA mondialisées</p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg text-center">
                    <p className="font-semibold text-[var(--color-info)] text-sm">Mondialisation</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Culture internationalisée</p>
                  </div>
                </div>
              </div>

              <Callout type="key" title="Soft power">
                Pouvoir <strong>doux</strong> et non via la force. Capacité d'influencer à travers séries, films, loisirs. 
                Déséquilibre dans le rapport de forces entre les USA et les autres pays. Concurrence qui se développe 
                (pays arabes, Inde, Chine).
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Conséquences :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Culture <strong>banalisée</strong>, cache les disparités sociales</li>
                  <li>• Partout dans le monde, on aime les <strong>mêmes choses</strong></li>
                  <li>• Si on ne s'inclut pas dans la masse, on est <strong>stigmatisé</strong></li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : société de consommation et culture de masse">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Auteur</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Œuvre</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Concept clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-info)]">Baudrillard</td>
                    <td className="p-3 border border-[var(--color-border-default)]">La Société de consommation</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Disparition du réel, séduction</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-error)]">Marcuse</td>
                    <td className="p-3 border border-[var(--color-border-default)]">L'homme unidimensionnel</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Faux besoins</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-accent)]">Debord</td>
                    <td className="p-3 border border-[var(--color-border-default)]">La Société du spectacle</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Aliénation, religion marchandise</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-warning)]">Adorno & Horkheimer</td>
                    <td className="p-3 border border-[var(--color-border-default)]">La dialectique de la raison</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Industrie culturelle, dépravation</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-success)]">Lasch</td>
                    <td className="p-3 border border-[var(--color-border-default)]">La culture du narcissisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Fossé culturel accru</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La société de consommation crée un <strong>malaise social</strong>. La culture de masse 
              <strong> formate</strong> l'individu et <strong>homogénéise</strong> les goûts au service du capitalisme. 
              Aujourd'hui : <strong>soft power</strong> américain et culture <strong>mainstream</strong> mondialisée.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={8} title="Société de consommation" questions={chapter8Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre7', label: '← Chapitre précédent', title: 'La consommation' }}
        next={{ path: '/socio/chapitre9', label: 'Chapitre suivant →', title: 'Le marché' }}
      />
    </main>
  );
}
