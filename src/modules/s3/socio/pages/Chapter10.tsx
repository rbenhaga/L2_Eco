import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter10Questions } from '../data/questions';

export default function Chapter10() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 10"
        title="Le travail"
        description="Histoire de la sociologie du travail, marché du travail et employabilité."
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
              Le travail a une place <strong>centrale</strong> dans la société. La sociologie du travail étudie les 
              <strong> conditions de vie</strong> des travailleurs, l'<strong>organisation du travail</strong> et les 
              <strong> relations sociales</strong> dans l'entreprise. L'<strong>employabilité</strong> dépend fortement 
              du <strong>réseau social</strong>.
            </p>
          </div>

          {/* Citations clés */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Le travail est une manifestation de la liberté individuelle"</p>
                <p className="text-xs text-[var(--color-accent)] mt-1 font-medium">— Locke (droit de propriété sur son corps)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)] text-sm">
                <p className="italic text-[var(--color-text-secondary)]">"Ce ne sont pas les conditions matérielles mais l'attention portée aux salariés"</p>
                <p className="text-xs text-[var(--color-warning)] mt-1 font-medium">— Mayo (effet Hawthorne)</p>
              </blockquote>
            </div>
          </div>

          {/* Évolution historique */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent border border-[var(--color-info)] rounded-2xl">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">📅</span> Évolution de la sociologie du travail
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-info)]">1949</strong> : Fondation par Mayo (USA) - sociologie industrielle
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-info)]">Années 60</strong> : Progrès technique, conséquences sur classe ouvrière
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-info)]">Après 70</strong> : Employés, cadres, professions libérales (tertiarisation)
              </div>
              <div className="p-2 bg-[var(--color-bg-raised)]/80 rounded-lg text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-info)]">Aujourd'hui</strong> : Fusion avec sociologie des organisations
              </div>
            </div>
          </div>

          {/* Auteurs à maîtriser */}
          <div className="p-4 sm:p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-2xl shadow-sm">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-warning-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-warning)]">
                <strong className="text-[var(--color-warning)]">Elton Mayo</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Effet Hawthorne • Attention aux salariés • Besoin de considération</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-accent-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-accent)]">
                <strong className="text-[var(--color-accent)]">Georges Friedmann</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Critique taylorisme/fordisme • Rationalisation du travail</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-error)]">
                <strong className="text-[var(--color-error)]">Jeremy Rifkin</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">La fin du travail • Automation, IA • Société à deux vitesses</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-success-subtle)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <strong className="text-[var(--color-success)]">Mark Granovetter</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Contacts personnels (56%) • Force des liens faibles • Réseau social</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-success)]">
                <strong className="text-[var(--color-success)]">Douglas McGregor</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">Théorie X (traditionnel) vs Théorie Y (moderne) • Gestion des hommes</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-[var(--color-bg-overlay)] to-transparent rounded-xl border-l-3 border-[var(--color-info)]">
                <strong className="text-[var(--color-info)]">Laurent Cordonnier</strong>
                <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">5 profils types du travailleur • Poltron, roublard, paresseux, primesautier, méchant</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas réduire le marché du travail à l'<strong>offre et demande</strong>. Granovetter montre que 
            <strong> 56% des emplois</strong> sont obtenus via les contacts personnels. Le <strong>réseau social</strong> 
            est déterminant pour l'employabilité.
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
          <Section title="I. Histoire de la sociologie du travail">
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Le travail n'a pas été un parent pauvre de la sociologie. Elle s'y est intéressée très tôt avec les 
              <strong> monographies</strong> sur la condition ouvrière, développées avant la naissance de la sociologie 
              en tant que science.
            </p>

            <AuthorCard 
              name="Elton Mayo" 
              dates="1880-1949" 
              work="Fondateur de la sociologie du travail (1949)" 
              color="amber"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Elton_Mayo.jpeg/500px-Elton_Mayo.jpeg"
            >
              <p className="mb-4 text-sm sm:text-base">
                La sociologie du travail est créée aux <strong>USA</strong>. On parle plutôt de <strong>sociologie industrielle</strong> 
                car on étudie les usines, l'industrie. C'est au départ une sociologie <strong>empirique</strong> avec collecte 
                de données dans les organisations.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Enquête de Hawthorne : 2 expériences</p>
                <div className="space-y-3">
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-semibold text-[var(--color-warning)] text-xs">1. Éclairage</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      3 tests : ↑ éclairage → ↑ productivité | ↓ éclairage → ↑ productivité | normal → ↑ productivité
                    </p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-semibold text-[var(--color-warning)] text-xs">2. Conditions de travail</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Variation pauses, collations, heures, rémunération → même résultat : ↑ productivité
                    </p>
                  </div>
                </div>
              </div>

              <Callout type="key" title="Effet Hawthorne">
                Ce ne sont pas les <strong>conditions matérielles</strong> de travail qui permettent les meilleurs résultats 
                mais l'<strong>attention portée aux salariés</strong> (bonne ou mauvaise). L'Homme n'est pas seulement un 
                être économique, il a aussi des <strong>motivations et des besoins</strong> : besoin de considération.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Georges Friedmann" 
              dates="1902-1977" 
              work="Le travail en miettes" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/6/68/George_Friedman.jpg?20170811001626"
            >
              <p className="mb-4 text-sm sm:text-base">
                Il s'intéresse à l'<strong>organisation scientifique du travail</strong> : taylorisme et fordisme. 
                La sociologie européenne vient <strong>critiquer la rationalisation</strong> du travail.
              </p>

              <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)]">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  La sociologie française s'est développée autour du développement de l'<strong>action syndicale</strong>. 
                  Étude de la division du travail, comportements informels et contestataires.
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Pierre Naville" 
              dates="1904-1993" 
              work="L'automation et le travail humain" 
              color="sky"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Fin des années 50 : destructions d'emplois avec le développement de la technologie. 
                Le <strong>progrès technique détruit le travail humain</strong> = automation.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Conclusion 1</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Remplacement de l'ouvrier par la machine</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">Conclusion 2</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Travail d'entretien &gt; travail de fabrication</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="II. Jeremy Rifkin : la fin du travail">
            <AuthorCard 
              name="Jeremy Rifkin" 
              dates="1945-" 
              work="La fin du travail, La troisième révolution industrielle" 
              color="rose"
              image="https://upload.wikimedia.org/wikipedia/commons/b/b8/Jeremy_Rifkin%2C_2009_%28cropped%29.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Rifkin réactualise les thèses de Naville par rapport à l'<strong>informatisation</strong> et 
                l'<strong>intelligence artificielle</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] mb-4">
                <p className="font-medium text-[var(--color-error)] text-sm mb-2">Ouvrage 1 : La fin du travail</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Automatisation, informatisation, IA → <strong>destruction de l'emploi traditionnel</strong></li>
                  <li>• Pas seulement industrie mais aussi <strong>services répétitifs</strong></li>
                  <li>• Changement <strong>structurel</strong> : économie à faible intensité de travail humain</li>
                  <li>• Valeur ajoutée repose sur <strong>connaissance, donnée, technologie</strong></li>
                </ul>
              </div>

              <Callout type="warning" title="Société à deux vitesses">
                <strong>Polarisation</strong> du marché du travail : minorité de travailleurs hautement qualifiés 
                face à une majorité <strong>précarisée</strong>. Exclusion d'une partie de la population active. 
                Recomposition du lien social autour du loisir, temps libre, solidaire, bénévolat.
              </Callout>

              <div className="mt-4 p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-success)]">
                <p className="font-medium text-[var(--color-success)] text-sm mb-2">Ouvrage 2 : La troisième révolution industrielle</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Convergence <strong>technologies numériques</strong> et <strong>énergies renouvelables</strong></li>
                  <li>• Internet = réseau d'information, énergétique et productif</li>
                  <li>• <strong>Prosommateurs</strong> : producteurs/consommateurs (produire sa propre énergie)</li>
                  <li>• Travail salarié perd sa centralité → économie du partage, travail gratuit</li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="III. Le travail en sociologie">
            <AuthorCard 
              name="Évolution historique de la vision du travail" 
              work="De l'Antiquité à aujourd'hui" 
              color="indigo"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                Le travail a une place <strong>centrale</strong> dans la société. Sa vision a beaucoup évolué.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)]">
                  <p className="font-semibold text-[var(--color-text-secondary)] text-sm">Antiquité</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Vision <strong>négative</strong></p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] text-sm">Locke</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Vision <strong>positive</strong> : liberté individuelle</p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">Smith</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Travail = créateur de <strong>richesses</strong></p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Aujourd'hui :</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Travail = activité productive + <strong>relations sociales</strong></li>
                  <li>• Certains penseurs : travail = facteur d'<strong>aliénation</strong> (Marx)</li>
                  <li>• Restructuration : industrialisation → <strong>tertiarisation</strong></li>
                  <li>• Élargissement du salariat (85% aujourd'hui)</li>
                </ul>
              </div>
            </AuthorCard>
          </Section>

          <Section title="IV. Marché du travail et employabilité">
            <AuthorCard 
              name="Mark Granovetter" 
              dates="1943-" 
              work="Getting a Job (enquête sur 256 cadres USA)" 
              color="emerald"
              image="https://www.premiosfronterasdelconocimiento.es/wp-content/uploads/sites/2/2022/04/FXIV-7-HCS-Granovetter-Web.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                La sociologie économique n'étudie pas le travail en tant qu'offre et demande. Elle déplace la problématique : 
                <strong> de quelle manière les individus trouvent-ils un emploi ?</strong>
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-success-subtle)]/50 to-transparent rounded-xl border border-[var(--color-success)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Résultats de l'enquête</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• <strong>30%</strong> n'ont pas cherché de travail avant d'obtenir leur poste (on est allé les chercher)</li>
                  <li>• Parmi eux, <strong>35%</strong> ont pourvu un poste qui n'était pas à pourvoir (créé pour eux)</li>
                </ul>
              </div>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">3 mécanismes d'accès à l'emploi</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg text-center">
                    <p className="font-bold text-[var(--color-accent)] text-lg">19%</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Démarche directe</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Candidature spontanée</p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg text-center">
                    <p className="font-bold text-[var(--color-accent)] text-lg">6%</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Médiations formelles</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Annonces publiées</p>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg text-center">
                    <p className="font-bold text-[var(--color-success)] text-lg">56%</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Contacts personnels</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Réseau social</p>
                  </div>
                </div>
              </div>

              <Callout type="key" title="Importance du réseau social">
                <strong>56%</strong> des emplois sont obtenus via les <strong>contacts personnels</strong>. 
                Cela remet en cause le rôle de certaines institutions comme Pôle Emploi. De plus, ces personnes 
                ont un emploi <strong>mieux rémunéré</strong> avec un indice de satisfaction plus élevé.
              </Callout>

              <Callout type="warning" title="Renforcement des inégalités">
                Le poids des variables sociologiques renforce les <strong>inégalités</strong>. Ceux qui ont un bon 
                réseau social ont accès à de meilleurs emplois.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="V. Théorie du salaire d'efficience">
            <AuthorCard 
              name="Théorie du salaire d'efficience" 
              work="Marshall, Yellen, Shapiro, Stiglitz" 
              color="amber"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                Cette théorie est liée au basculement de la Théorie X vers la Théorie Y. L'employeur met des 
                <strong> salaires plus élevés</strong> que le taux de marché et d'équilibre.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-warning-subtle)]/50 to-transparent rounded-xl border border-[var(--color-warning)] mb-4">
                <p className="font-medium text-[var(--color-text-primary)] text-sm mb-2">Objectifs</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Attirer des travailleurs plus <strong>qualifiés</strong></li>
                  <li>• Que le travailleur fournisse un <strong>effort supplémentaire</strong></li>
                  <li>• Obtenir le <strong>maximum de productivité</strong></li>
                </ul>
              </div>

              <Callout type="key" title="Comportement social juste">
                Un comportement social s'enclenche et est considéré comme <strong>juste</strong>. Il est juste de proposer 
                un salaire plus élevé pour motiver. Il est juste que le travailleur fournisse plus d'efforts s'il est plus payé.
              </Callout>

              <Callout type="warning">
                Cette théorie est <strong>contre-intuitive</strong> pour les économistes car elle crée un <strong>déséquilibre</strong> 
                et du <strong>chômage</strong> (comportements opportunistes des agents).
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="VI. La qualité du travailleur : Théorie X et Y">
            <AuthorCard 
              name="Douglas McGregor" 
              dates="1906-1964" 
              work="The Human Side of Enterprise" 
              color="teal"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Douglas_Macgregor_in_2020.jpg/500px-Douglas_Macgregor_in_2020.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                La valeur d'un travailleur peu consciencieux diffère de celle d'un travailleur investi. 
                McGregor identifie <strong>2 modèles de gestion des hommes</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] mb-2">Théorie X (traditionnel)</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">Modèle dépassé, cercle vicieux</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• L'homme est <strong>paresseux</strong>, n'aime pas le travail</li>
                    <li>• Doit être <strong>contrôlé, dirigé, sanctionné</strong></li>
                    <li>• Seul le salaire compense la désutilité</li>
                    <li>• Préfère être dirigé, évite les responsabilités</li>
                    <li>• Peu d'ambitions, préfère la sécurité</li>
                  </ul>
                  <div className="mt-2 p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="text-xs text-[var(--color-error)]">→ Règles strictes, contrôles sévères</p>
                    <p className="text-xs text-[var(--color-error)]">→ Employés travaillent au minimum</p>
                  </div>
                </div>
                <div className="p-4 bg-linear-to-br from-[var(--color-success-subtle)] to-transparent rounded-xl border border-[var(--color-success)]">
                  <p className="font-semibold text-[var(--color-success)] mb-2">Théorie Y (moderne)</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">Modèle majoritaire, cercle vertueux</p>
                  <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                    <li>• Le travail est <strong>indispensable</strong> comme le repos</li>
                    <li>• L'homme peut s'<strong>auto-diriger</strong></li>
                    <li>• Recherche de <strong>responsabilités</strong></li>
                    <li>• Créativité et imagination</li>
                    <li>• Motivation intrinsèque</li>
                  </ul>
                  <div className="mt-2 p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="text-xs text-[var(--color-success)]">→ Fonction sociale positive</p>
                    <p className="text-xs text-[var(--color-success)]">→ Travail enrichissant</p>
                  </div>
                </div>
              </div>

              <Callout type="key">
                La Théorie X crée un <strong>cercle vicieux</strong> : l'employeur a une vision négative → système répressif 
                → le travailleur devient ce que l'employeur pensait. La Théorie Y crée un <strong>cercle vertueux</strong>.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="VII. Laurent Cordonnier : 5 profils types du travailleur">
            <AuthorCard 
              name="Laurent Cordonnier" 
              work="Pas de pitié pour les gueux" 
              color="rose"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                Cordonnier décrit le travailleur qui est <strong>tout sauf parfait</strong>. Il utilise des présupposés 
                sociologiques autour des comportements individuels, motivations, normes, représentations et rapports sociaux.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)]">
                  <p className="font-semibold text-[var(--color-error)] text-sm">1. Le poltron</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    <strong>Aversion au risque</strong> très forte. Préfère un salaire mensuel régulier plutôt qu'un 
                    salaire variable. Renonce aux primes en croissance mais a un salaire en récession.
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-warning-subtle)] to-transparent rounded-xl border border-[var(--color-warning)]">
                  <p className="font-semibold text-[var(--color-warning)] text-sm">2. Le roublard</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Défend ses propres intérêts. Tire avantage de l'<strong>asymétrie d'information</strong> à l'embauche 
                    → <strong>sélection adverse</strong> (risque d'employer un incompétent).
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-accent-subtle)] to-transparent rounded-xl border border-[var(--color-accent)]">
                  <p className="font-semibold text-[var(--color-accent)] text-sm">3. Le paresseux</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    <strong>Désutilité à l'effort</strong>. Quel intérêt de s'acharner pour le même salaire ? 
                    Solution : <strong>salaire d'efficience</strong>.
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-info)]">
                  <p className="font-semibold text-[var(--color-info)] text-sm">4. Le primesautier</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Agit par <strong>impulsion</strong>, peu attaché à l'entreprise. Problématique de <strong>fidélisation</strong>. 
                    Solutions : salaire d'efficience, avantages en nature, culture d'entreprise.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-border-default)] mb-4">
                <p className="font-semibold text-[var(--color-text-secondary)] text-sm">5. Le méchant (modèle insider/outsider)</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Insider</strong> : salariés de l'organisation. <strong>Outsider</strong> : extérieurs tentés de 
                  proposer des salaires bas pour être embauchés → <strong>concurrence déloyale</strong>.
                </p>
              </div>
            </AuthorCard>
          </Section>

          <Section title="VIII. Thèmes d'études en sociologie du travail">
            <AuthorCard 
              name="L'entreprise du travail" 
              work="Lieu d'expression des rapports sociaux" 
              color="indigo"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Pour la sociologie des organisations, l'entreprise représente un lieu d'expression des <strong>rapports sociaux</strong>, 
                un lieu d'<strong>enjeu de pouvoir</strong> et un outil au service des marchés.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-medium text-[var(--color-accent)] text-sm mb-2">Travailleurs extériorisés</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Montée de la <strong>sous-traitance</strong> et du <strong>travail intérimaire</strong></li>
                  <li>• <strong>Modèle hybride</strong> : partie interne + partie externe</li>
                  <li>• Fort contrôle sur les internes, moins sur les externes</li>
                  <li>• Développé d'abord dans l'<strong>automobile</strong>, puis tous secteurs</li>
                  <li>• Ce modèle accroît la <strong>précarité</strong></li>
                </ul>
              </div>

              <Callout type="warning">
                Les formes d'emploi <strong>atypiques</strong> (CDD, intérim) ont donné naissance à une sous-discipline : 
                la <strong>sociologie de l'emploi</strong>.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Travail des hommes, travail des femmes" 
              work="Assignation sexuelle des emplois" 
              color="rose"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Pendant longtemps, les sociologues ont fait comme s'il n'existait qu'un type de travailleurs : les <strong>hommes</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-bg-overlay)] to-transparent rounded-xl border border-[var(--color-error)] mb-4">
                <p className="font-medium text-[var(--color-error)] text-sm mb-2">Inégalités H/F</p>
                <ul className="text-xs sm:text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• H et F ne travaillent pas dans les <strong>mêmes secteurs</strong></li>
                  <li>• <strong>Assignation sexuelle</strong> des emplois → inégalités de salaire</li>
                  <li>• Femmes : services liés à la personne, éducation, santé</li>
                  <li>• <strong>Temps partiel</strong> plus souvent chez les femmes</li>
                  <li>• Parcours de carrière différents, accès aux responsabilités</li>
                  <li>• Femmes plus <strong>diplômées</strong> mais salaires et responsabilités plus faibles</li>
                </ul>
              </div>

              <div className="p-3 sm:p-4 bg-linear-to-br from-[var(--color-accent-subtle)]/50 to-transparent rounded-xl border border-[var(--color-accent)] mb-4">
                <p className="font-semibold text-[var(--color-accent)] text-sm mb-2">Joyce Fletcher - Secteur hautes technologies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-medium text-[var(--color-text-secondary)] text-xs mb-1">Critères masculins (valorisés)</p>
                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-0.5">
                      <li>• Compétences techniques</li>
                      <li>• Autonomie</li>
                      <li>• Promotion de soi</li>
                      <li>• Héroïsme individuel</li>
                    </ul>
                  </div>
                  <div className="p-2 bg-[var(--color-bg-raised)]/60 rounded-lg">
                    <p className="font-medium text-[var(--color-text-secondary)] text-xs mb-1">Critères féminins (dévalorisés)</p>
                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-0.5">
                      <li>• Responsabilité mutuelle</li>
                      <li>• Collaboration d'équipe</li>
                      <li>• Contribution au programme</li>
                      <li>• → Perçus comme faiblesse</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Callout type="warning">
                Les critères de promotion valorisent les <strong>représentations masculines</strong> (individuel) 
                au détriment des <strong>représentations féminines</strong> (collectif, relationnel).
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : la sociologie du travail">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Auteur</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Apport</th>
                    <th className="p-3 text-left font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">Concept clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-warning)]">Mayo</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Fondateur (1949)</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Effet Hawthorne, attention</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-accent)]">Friedmann</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Critique taylorisme</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Rationalisation du travail</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-info)]">Naville</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Automation</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Remplacement par la machine</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-error)]">Rifkin</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Fin du travail</td>
                    <td className="p-3 border border-[var(--color-border-default)]">IA, polarisation, prosommateurs</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-success)]">Granovetter</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Employabilité</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Contacts personnels (56%)</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-success)]">McGregor</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Gestion des hommes</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Théorie X vs Y</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-warning)]">Salaire d'efficience</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Marshall, Stiglitz</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Salaire &gt; marché, motivation</td>
                  </tr>
                  <tr className="bg-[var(--color-bg-overlay)]">
                    <td className="p-3 border border-[var(--color-border-default)] font-medium text-[var(--color-error)]">Cordonnier</td>
                    <td className="p-3 border border-[var(--color-border-default)]">5 profils types</td>
                    <td className="p-3 border border-[var(--color-border-default)]">Poltron, roublard, paresseux...</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              Le travail a une place <strong>centrale</strong> dans la société. La sociologie du travail a évolué avec 
              les mutations du système productif. L'<strong>employabilité</strong> dépend fortement du <strong>réseau social</strong> 
              (56% via contacts personnels). Les modèles de gestion (X/Y) influencent la productivité.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={10} title="Le travail" questions={chapter10Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre9', label: '← Chapitre précédent', title: 'Le marché' }}
        next={{ path: '/socio', label: 'Retour à l\'accueil →', title: 'Sociologie' }}
      />
    </main>
  );
}
