import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter7Questions } from '../data/questions';

export default function Chapter7() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 07"
        title="La consommation"
        description="Des enquêtes budgétaires aux théories de la distinction et des besoins."
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
              La consommation n'est pas qu'un acte économique individuel. Elle répond à une <strong>structuration collective</strong> : 
              appartenance à une <strong>classe sociale</strong> et famille. La consommation est un outil de <strong>distinction</strong> 
              et de <strong>démonstration du statut social</strong>.
            </p>
          </div>

          {/* Citations clés */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-amber-50 to-transparent rounded-xl border-l-3 border-amber-400 text-sm">
                <p className="italic text-slate-700">"La consommation ostentatoire vise à faire la démonstration de la richesse"</p>
                <p className="text-xs text-amber-600 mt-1 font-medium">— Veblen (effet de snobisme)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400 text-sm">
                <p className="italic text-slate-700">"Les ouvriers prennent conscience de leur infériorité par leur consommation"</p>
                <p className="text-xs text-violet-600 mt-1 font-medium">— Halbwachs (classe ouvrière)</p>
              </blockquote>
            </div>
          </div>

          {/* Opposition économistes vs sociologues */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-rose-50/50 to-amber-50/30 border border-rose-100 rounded-2xl">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">⚔️</span> Opposition : Économistes vs Sociologues
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-amber-700 mb-2">Économistes (micro)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Choix = <strong>préférences individuelles</strong></li>
                  <li>• Rationalité de l'agent</li>
                  <li>• Maximisation de l'utilité</li>
                </ul>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-violet-700 mb-2">Sociologues (macro)</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• <strong>Structuration collective</strong></li>
                  <li>• Appartenance classe sociale</li>
                  <li>• Distinction et démonstration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Auteurs à maîtriser */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> Auteurs & concepts à maîtriser
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-amber-50 to-transparent rounded-xl border-l-3 border-amber-400">
                <strong className="text-amber-700">Veblen</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Consommation ostentatoire • Effet Veblen (snobisme) • Classe des loisirs</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                <strong className="text-violet-700">Halbwachs</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Classe ouvrière • Critique loi d'Engel • Imitation des classes supérieures</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                <strong className="text-emerald-700">Hirschman</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Préférences construites socialement • Évolutives et réversibles • Dimension relationnelle</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                <strong className="text-sky-700">Le Play & Ducpétiaux</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Enquêtes budgétaires • Loi d'Engel • Précurseurs empiriques</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas confondre <strong>effet Veblen</strong> (snobisme : prix élevé = valeur) et <strong>effet d'imitation</strong> 
            (Halbwachs : classes populaires imitent les supérieures). Les deux sont liés à la distinction mais avec des 
            mécanismes différents.
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
          <Section title="Introduction : état des lieux">
            <p className="mb-4 text-slate-600">
              La consommation (marchande ou non) a été très tôt un sujet d'analyse des sociologues. Mais elle n'a 
              <strong> pas donné une sous-discipline institutionnalisée</strong> pendant longtemps.
            </p>

            <div className="p-4 bg-linear-to-br from-rose-50/50 to-amber-50/30 rounded-xl border border-rose-100 mb-4">
              <p className="font-medium text-rose-900 text-sm mb-2">Pourquoi ce retard ?</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• <strong>Connotation négative</strong> liée à la consommation marchande</li>
                <li>• Thèse commune (Veblen, Simmel, Goblot) : consommation = stratégie de <strong>distinction</strong> des classes bourgeoises</li>
                <li>• Consommation assimilée au <strong>superflu, luxe, démonstration</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-linear-to-br from-sky-50/50 to-blue-50/30 rounded-xl border border-sky-100 mb-4">
              <p className="font-medium text-sky-900 text-sm mb-2">Évolution après les Trente Glorieuses</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Classe ouvrière connaît une <strong>hausse des revenus</strong></li>
                <li>• Consommation marchande et de <strong>loisir</strong></li>
                <li>• Perception négative : temps de loisir = temps où on ne travaille pas</li>
                <li>• Le travail = facteur de production selon les classiques</li>
              </ul>
            </div>

            <Callout type="key">
              Pendant longtemps : champ bien documenté <strong>empiriquement</strong> (statistiques) mais 
              <strong> théoriquement pauvre</strong>. La sociologie de la consommation prend naissance dans les 
              <strong> années 80</strong> et devient enfin une sous-discipline.
            </Callout>
          </Section>

          <Section title="I. Les enquêtes précurseurs">
            <AuthorCard 
              name="Frédéric Le Play" 
              dates="1806-1882" 
              work="Les Ouvriers Européens" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Frederic_Le_Play.jpg"
            >
              <p className="mb-3 text-sm sm:text-base">
                S'intéresse au <strong>budget des ménages ouvriers français</strong> dans les années 1850. 
                Études empiriques et statistiques (quantitatif).
              </p>
            </AuthorCard>

            <AuthorCard 
              name="Édouard Ducpétiaux" 
              work="Enquêtes budgétaires en Belgique (XIXe)" 
              color="sky"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Enquête sur le budget des familles en Belgique au XIXe siècle. Ses données seront étudiées par <strong>Engel</strong>.
              </p>

              <div className="p-3 bg-linear-to-r from-sky-50/50 to-transparent rounded-xl border border-sky-100">
                <p className="font-medium text-sky-900 text-sm mb-2">Loi d'Engel</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  La part de consommation <strong>alimentaire diminue</strong> quand le revenu augmente. 
                  Cela libère des revenus pour d'autres types de consommation.
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Enquêtes budgétaires modernes (XXe)" 
              work="Clair Brown, Herpin & Verger" 
              color="emerald"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Enquêtes systématiques (chaque année) dans les pays développés, initiées par les USA. 
                En France : enquête annuelle de l'<strong>INSEE "Budgets des familles"</strong> après la 2GM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100">
                  <p className="font-semibold text-emerald-700 text-sm">Clair Brown</p>
                  <p className="text-xs text-slate-600">Enquêtes USA 1918-1988</p>
                  <p className="text-xs text-slate-500 mt-1">Changement des normes de consommation relié au <strong>statut social</strong></p>
                </div>
                <div className="p-3 bg-linear-to-br from-teal-50 to-cyan-50/30 rounded-xl border border-teal-100">
                  <p className="font-semibold text-teal-700 text-sm">Herpin & Verger</p>
                  <p className="text-xs text-slate-600">Enquêtes INSEE 1981-1996</p>
                  <p className="text-xs text-slate-500 mt-1">Importance du <strong>mode de vie</strong> dans les décisions</p>
                </div>
              </div>
            </AuthorCard>
          </Section>

          <Section title="II. Veblen et la consommation ostentatoire">
            <AuthorCard 
              name="Thorstein Veblen" 
              dates="1857-1929" 
              work="Théorie de la classe de loisir" 
              color="amber"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Veblen3a.jpg/500px-Veblen3a.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Veblen s'appuie sur des travaux <strong>anthropologiques</strong>. Il remet en cause les analyses 
                basées sur la profession, le travail, le revenu pour définir les classes sociales.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 mb-4">
                <p className="font-medium text-amber-900 text-sm mb-2">Constat de départ</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Le travail était jugé <strong>avilissant</strong> (dégradant) par les classes aisées</li>
                  <li>• Le <strong>loisir</strong> permettait de s'attirer le respect des autres</li>
                  <li>• Il évoque la <strong>"classe des loisirs"</strong> : luxe, confort, temps improductif</li>
                  <li>• ≠ Classes industrieuses : consommation de nécessité, subsistance</li>
                </ul>
              </div>

              <Callout type="key" title="Effet Veblen (snobisme)">
                Les individus ont tendance à désirer des biens dont le <strong>prix élevé fait la valeur</strong>, 
                en dépit d'une valeur pratique éventuellement faible. Pour les plus riches, la consommation a une 
                <strong> utilité sociale</strong> et est une preuve de pouvoir.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Consommation ostentatoire" 
              work="3 éléments définissants" 
              color="rose"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                La consommation ostentatoire vise à faire la <strong>démonstration de la richesse</strong> 
                auprès des classes les plus faibles. C'est une véritable <strong>discipline</strong> qui suppose 
                un travail d'éducation du goût.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">1. Capacité de dépenser</p>
                  <p className="text-xs text-slate-600">Sans compter, libérée de la contrainte des besoins fondamentaux</p>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">2. Effet de démonstration</p>
                  <p className="text-xs text-slate-600">Se distinguer, la consommation symbolise le statut social</p>
                </div>
                <div className="p-3 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                  <p className="font-semibold text-rose-700 text-sm">3. Liberté du temps</p>
                  <p className="text-xs text-slate-600">Long moment à table, spectacles, capacité à dépenser</p>
                </div>
              </div>

              <Callout type="warning">
                C'est une classe <strong>oisive</strong> qui ne produit pas. La production est assimilée au travail. 
                Veblen insiste sur la variable de <strong>temps</strong>.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="III. Halbwachs et la classe ouvrière">
            <AuthorCard 
              name="Maurice Halbwachs" 
              dates="1877-1945" 
              work="La classe ouvrière et les niveaux de vie" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Portrait_de_Maurice_Halbwachs.jpg/500px-Portrait_de_Maurice_Halbwachs.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Comme Veblen, il remet en cause les analyses basées sur la profession et le revenu pour définir 
                les classes sociales. Il cherche à les définir à partir de la <strong>consommation</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">Thèse principale</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Les ouvriers prennent conscience de leur <strong>infériorité</strong> par leur consommation et le fait 
                  que leurs supérieurs hiérarchiques ne sont pas obligés aux <strong>mêmes sacrifices</strong> qu'eux.
                </p>
              </div>

              <div className="p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200 mb-4">
                <p className="font-medium text-slate-900 text-sm mb-2">Position spécifique des ouvriers :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• L'activité de production oblige à une <strong>dépense physique</strong></li>
                  <li>• Maintien dans l'obligation de subvenir aux <strong>besoins essentiels</strong> (se nourrir)</li>
                  <li>• <strong>Incapacité</strong> de développer des besoins sociaux supérieurs</li>
                  <li>• Il leur faudrait une <strong>éducation</strong> pour cela</li>
                </ul>
              </div>

              <Callout type="key">
                Position spécifique des ouvriers dans la hiérarchie sociale fondée sur leur <strong>incapacité 
                matérielle et culturelle</strong> à participer à la vie sociale par la consommation.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Critique de la loi d'Engel" 
              work="Enquêtes statistiques en Allemagne (XXe)" 
              color="sky"
              hideAvatar
            >
              <div className="p-3 sm:p-4 bg-linear-to-br from-sky-50/50 to-blue-50/30 rounded-xl border border-sky-100 mb-4">
                <p className="font-medium text-sky-900 text-sm mb-2">Loi d'Engel (version complète)</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Quand le revenu ↑ : part alimentation <strong>↓</strong></li>
                  <li>• Part logement, habillement, éclairage, chauffage : <strong>constante</strong></li>
                  <li>• Part autres dépenses (santé, éducation, loisir, luxe) : <strong>↑</strong></li>
                </ul>
              </div>

              <Callout type="warning" title="Critique de Halbwachs">
                Il n'y a <strong>pas de stagnation</strong> des dépenses de logement et d'habillement. 
                Il y a une <strong>baisse</strong> des dépenses de logement et une <strong>hausse</strong> des 
                dépenses de vêtements. Quand on monte dans la hiérarchie sociale, on vise les <strong>besoins sociaux</strong> 
                plutôt que primaires.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-violet-50/50 to-transparent rounded-xl border border-violet-100">
                <p className="font-medium text-slate-900 text-sm mb-2">Imitation des classes supérieures :</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Tentative d'imitation qui passe par le <strong>paraître</strong> (dépenses vêtements). 
                  Cette idée sera reprise par <strong>Bourdieu</strong>.
                </p>
              </div>
            </AuthorCard>
          </Section>

          <Section title="IV. Les thèmes au cœur de la consommation">
            <AuthorCard 
              name="La distinction" 
              work="Veblen, Bourdieu" 
              color="rose"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                La consommation des plus riches est <strong>distinctive</strong>. Les classes inférieures aspirent 
                à les <strong>imiter</strong>.
              </p>

              <div className="p-3 bg-linear-to-r from-rose-50/50 to-transparent rounded-xl border border-rose-100">
                <p className="text-xs sm:text-sm text-slate-600">
                  Idée de <strong>domination intellectuelle et morale</strong> des classes aisées avec des pratiques 
                  jugées comme <strong>légitimes</strong> par les classes inférieures.
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Les besoins" 
              work="Évolution selon le contexte" 
              color="emerald"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                En économie : besoins <strong>primaires</strong> (vitaux) vs <strong>secondaires</strong> (envies). 
                Les sociologues démontrent que c'est plus <strong>complexe</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">3 éléments de contexte qui modifient les besoins</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Extension du <strong>système de production</strong></li>
                  <li>• Développement <strong>technique et scientifique</strong></li>
                  <li>• <strong>Enrichissement</strong> des ménages</li>
                </ul>
              </div>

              <p className="text-sm text-slate-600 mb-3">
                La notion de besoin n'a cessé d'<strong>évoluer</strong> en fonction du mode de vie et de la société : 
                double revenu, choix d'avoir des enfants ou non, lieu d'habitation (développement des banlieues).
              </p>
            </AuthorCard>

            <AuthorCard 
              name="Albert Hirschman" 
              dates="1915-2012" 
              work="Critique de l'homo economicus" 
              color="teal"
              image="https://upload.wikimedia.org/wikipedia/commons/6/63/Albert_O._Hirschman%2C_1945_%28cropped%29.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Hirschman remet en cause l'<strong>homo economicus rationnel</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-teal-50/50 to-cyan-50/30 rounded-xl border border-teal-100 mb-4">
                <p className="font-medium text-teal-900 text-sm mb-2">Thèses sur les préférences</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Les préférences ne sont <strong>pas stables</strong></li>
                  <li>• Elles sont <strong>construites socialement</strong></li>
                  <li>• Elles sont <strong>évolutives et réversibles</strong></li>
                </ul>
              </div>

              <Callout type="key" title="Dimension sociale et relationnelle">
                Les choix de consommation et les besoins sont induits par les <strong>décisions des membres du ménage</strong>. 
                Exemple : la décision d'avoir un enfant oriente les besoins pendant 10-20 ans (éducation, vacances, résidence).
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : les approches de la consommation">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Auteur</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Approche</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Concept clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-violet-700">Le Play</td>
                    <td className="p-3 border border-slate-200">Empirique</td>
                    <td className="p-3 border border-slate-200">Budgets ménages ouvriers</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-amber-700">Veblen</td>
                    <td className="p-3 border border-slate-200">Distinction</td>
                    <td className="p-3 border border-slate-200">Consommation ostentatoire, effet Veblen</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-sky-700">Halbwachs</td>
                    <td className="p-3 border border-slate-200">Classe sociale</td>
                    <td className="p-3 border border-slate-200">Infériorité ouvrière, imitation</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-teal-700">Hirschman</td>
                    <td className="p-3 border border-slate-200">Relationnelle</td>
                    <td className="p-3 border border-slate-200">Préférences construites, évolutives</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La consommation n'est pas qu'un acte économique individuel. Elle répond à une <strong>structuration 
              collective</strong> et est un outil de <strong>distinction sociale</strong>. Les besoins évoluent 
              selon le contexte et les préférences sont <strong>construites socialement</strong>.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={7} title="La consommation" questions={chapter7Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre6', label: '← Chapitre précédent', title: 'La monnaie' }}
        next={{ path: '/socio/chapitre8', label: 'Chapitre suivant →', title: 'Société de consommation' }}
      />
    </main>
  );
}
