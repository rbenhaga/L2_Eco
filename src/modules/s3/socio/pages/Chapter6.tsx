import { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';
import ChapterQCM from '../components/ChapterQCM';
import { chapter6Questions } from '../data/questions';

export default function Chapter6() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Chapitre 06"
        title="La monnaie : approches sociologiques"
        description="Thème 2 : Sociologie économique. Vision institutionnaliste vs économiste de la monnaie."
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
              La monnaie n'est pas qu'un simple <strong>instrument économique</strong>. Pour les sociologues, elle est une 
              <strong> construction sociale</strong> fondée sur la <strong>confiance collective</strong>. Elle véhicule des 
              affects, des représentations sociales et peut être source de <strong>lien ou de destruction sociale</strong>.
            </p>
          </div>

          {/* Citations clés */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">💬</span> Citations clés pour la dissertation
            </h4>
            <div className="space-y-3">
              <blockquote className="p-3 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400 text-sm">
                <p className="italic text-slate-700">"Le désir de la monnaie habiterait chaque acteur"</p>
                <p className="text-xs text-violet-600 mt-1 font-medium">— Simmel (pouvoir d'attraction de la monnaie)</p>
              </blockquote>
              <blockquote className="p-3 bg-linear-to-r from-rose-50 to-transparent rounded-xl border-l-3 border-rose-400 text-sm">
                <p className="italic text-slate-700">"L'argent est un agent de destruction du lien social"</p>
                <p className="text-xs text-rose-600 mt-1 font-medium">— Marx (fétichisme de l'argent)</p>
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
                <p className="font-semibold text-amber-700 mb-2">Économistes</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Monnaie = <strong>voile</strong> sur échanges</li>
                  <li>• <strong>Neutralité</strong> de la monnaie</li>
                  <li>• Valeur = utilité ou travail</li>
                  <li>• Théorie <strong>quantitative</strong></li>
                </ul>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-violet-700 mb-2">Sociologues</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Monnaie = <strong>institution</strong> sociale</li>
                  <li>• Fondée sur la <strong>confiance</strong></li>
                  <li>• Affects et représentations</li>
                  <li>• Construction <strong>collective</strong></li>
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
              <div className="p-3 sm:p-4 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                <strong className="text-violet-700">Simmel</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Pouvoir d'attraction • Effets sur les consciences • Représentations sociales</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                <strong className="text-sky-700">Zelizer</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Signification sociale de l'argent • Monnaie = agent moralisateur • "Doux commerce" (Montesquieu)</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-rose-50 to-transparent rounded-xl border-l-3 border-rose-400">
                <strong className="text-rose-700">Marx & Weber</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Vision pessimiste • Fétichisme • Aliénation • Désenchantement social</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                <strong className="text-emerald-700">Simiand</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Critique TQM • Effets de croyance • Monnaie = fait social fondé sur croyances partagées</p>
              </div>
            </div>
          </div>

          {/* Piège */}
          <Callout type="warning" title="⚠️ Piège classique en dissertation">
            Ne pas réduire la monnaie à sa fonction économique. Les sociologues montrent qu'elle est 
            <strong> symbolique et relationnelle</strong>, fondée sur un <strong>consensus social</strong>. 
            La TQM a été abandonnée par les économistes eux-mêmes.
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
          <Section title="Introduction : Monnaie et valeur">
            <p className="mb-4 text-slate-600">
              La monnaie est au cœur de la <strong>sociologie économique</strong>. Deux visions s'opposent sur la relation 
              entre monnaie et valeur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                <p className="font-semibold text-amber-700 mb-2">Vision économiste (orthodoxe)</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• <strong>Classiques</strong> : valeur = quantité de travail incorporée</li>
                  <li>• <strong>Néoclassiques</strong> : valeur = utilité + rareté</li>
                  <li>• Point commun : pas de monnaie dans la théorie de la valeur</li>
                  <li>• Monnaie = technique pour dépasser la double coïncidence des besoins</li>
                </ul>
                <div className="mt-3 p-2 bg-white/60 rounded-lg">
                  <p className="text-xs text-amber-800 font-medium">→ Neutralité de la monnaie : "voile sur les échanges"</p>
                </div>
              </div>
              <div className="p-4 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                <p className="font-semibold text-violet-700 mb-2">Vision institutionnaliste (hétérodoxe)</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Monnaie et valeur sont <strong>liées</strong></li>
                  <li>• Monnaie = <strong>institution fondatrice</strong> de la valeur</li>
                  <li>• Sans monnaie, pas de valeur</li>
                  <li>• Économie marchande = fondamentalement <strong>monétaire</strong></li>
                </ul>
                <div className="mt-3 p-2 bg-white/60 rounded-lg">
                  <p className="text-xs text-violet-800 font-medium">→ Fonction d'unité de compte = centrale</p>
                </div>
              </div>
            </div>

            <Callout type="key">
              L'économie marchande basée sur le <strong>troc ne peut pas fonctionner</strong>. À chaque crise financière, 
              on n'est jamais revenu au troc. Toute l'économie repose sur la monnaie et l'<strong>adhésion collective</strong> à celle-ci.
            </Callout>
          </Section>

          <Section title="I. Georg Simmel : le pouvoir d'attraction de la monnaie">
            <AuthorCard 
              name="Georg Simmel" 
              dates="1858-1918" 
              work="Philosophie de l'argent" 
              color="violet"
              image="https://upload.wikimedia.org/wikipedia/commons/4/4f/Simmel_01.JPG"
            >
              <p className="mb-4 text-sm sm:text-base">
                Simmel propose une analyse <strong>psychologique et sociale</strong> de la monnaie. Il met en évidence 
                le <strong>pouvoir d'attraction</strong> qu'elle exerce sur les individus.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">Thèses principales</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Le <strong>désir de monnaie</strong> habiterait chaque acteur</li>
                  <li>• Les individus ne cherchent pas l'utilité mais la <strong>monnaie en tant que telle</strong></li>
                  <li>• L'agent est <strong>dépendant</strong> de la monnaie</li>
                  <li>• Preuve empirique : fascination depuis tout temps pour l'<strong>or</strong></li>
                </ul>
              </div>

              <Callout type="key" title="Effets sur les consciences">
                La monnaie exerce des <strong>effets sur les consciences individuelles</strong>. Ce sont les 
                <strong> représentations sociales</strong> de la monnaie qui en font un phénomène intégralement social.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900 text-sm mb-2">La monnaie n'est pas que économique :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Elle est aussi <strong>affects et sentiments</strong> : espoir, crainte, désir</li>
                  <li>• Représentations sociales : bonheur, crainte, désir</li>
                  <li>• Ces effets jouent un rôle sur le plan économique</li>
                </ul>
              </div>

              <Callout type="warning" title="Critique de la TQM">
                Simmel remet en cause la <strong>théorie quantitative de la monnaie</strong> : l'idée que la valeur 
                de la monnaie est inversement proportionnelle à sa quantité est trop réductrice.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="II. Viviana Zelizer : la signification sociale de l'argent">
            <AuthorCard 
              name="Viviana Zelizer" 
              work="La signification sociale de l'argent" 
              color="sky"
              image="https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2023/06/20160803_ZelizerV_DJA_086_3000x1688.jpg?itok=-7yyCJnI"
            >
              <p className="mb-4 text-sm sm:text-base">
                Zelizer analyse l'<strong>évolution historique</strong> des représentations de la monnaie et les 
                <strong> deux visions opposées</strong> chez les sociologues.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-sky-50/50 to-blue-50/30 rounded-xl border border-sky-100 mb-4">
                <p className="font-medium text-sky-900 text-sm mb-2">Évolution historique</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Jusqu'au XVIIIe : penseurs très <strong>critiques</strong> vis-à-vis de la monnaie</li>
                  <li>• Moyen Âge / Renaissance : <strong>condamnation</strong> du prêt à intérêt par l'Église</li>
                  <li>• Basculement : la monnaie devient plus <strong>morale</strong></li>
                </ul>
              </div>

              <blockquote className="text-sm sm:text-base italic text-slate-600 border-l-4 border-sky-300 pl-4 mb-4">
                "La monnaie comme un agent moralisateur permettant un doux commerce"
                <span className="block text-xs font-medium text-sky-600 mt-1">— Montesquieu</span>
              </blockquote>
            </AuthorCard>
          </Section>

          <Section title="III. Vision pessimiste : Marx et Weber">
            <AuthorCard 
              name="Karl Marx" 
              dates="1818-1883" 
              work="Fondement de la critique de l'économie politique, Le Capital" 
              color="rose"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/220px-Karl_Marx_001.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Marx voit l'argent comme un <strong>agent de destruction du lien social</strong>. Il développe une 
                critique radicale du <strong>fétichisme de l'argent</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-rose-50/50 to-pink-50/30 rounded-xl border border-rose-100 mb-4">
                <p className="font-medium text-rose-900 text-sm mb-2">Thèses de Marx sur l'argent</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• La société voue un <strong>fétichisme</strong> à l'argent (admiration sans réserve)</li>
                  <li>• L'argent a un <strong>pouvoir de transformation</strong> et subvertit la réalité</li>
                  <li>• Les relations personnelles sont réduites à des <strong>rapports monétaires</strong></li>
                  <li>• Analogie : argent = <strong>prostitution</strong> (condamnable moralement)</li>
                </ul>
              </div>

              <Callout type="key" title="Fétichisme de l'argent">
                Le fétichisme de l'argent est la <strong>forme la plus aveuglante</strong> de toutes les formes de 
                fétichisme de marchandises. L'argent transforme les choses dépourvues de conscience, d'honneur et 
                de moralité en des <strong>marchandises ordinaires</strong>.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-rose-50/50 to-transparent rounded-xl border border-rose-100">
                <p className="font-medium text-slate-900 text-sm mb-2">Théorie de l'aliénation :</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Avec l'argent, l'<strong>inestimable a un prix</strong> (même les choses les plus condamnables). 
                  Problème de la <strong>marchandisation</strong> du corps (prostitution, don d'organes, sang) et de la nature.
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Max Weber" 
              dates="1864-1920" 
              work="L'Éthique protestante et l'esprit du capitalisme" 
              color="amber"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Max_Weber_1894.jpg/220px-Max_Weber_1894.jpg"
            >
              <p className="mb-4 text-sm sm:text-base">
                Weber analyse l'argent dans le cadre du <strong>processus de rationalisation</strong> de la société moderne.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 mb-4">
                <p className="font-medium text-amber-900 text-sm mb-2">L'argent et la rationalisation</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• L'argent = <strong>fer de lance</strong> du processus de rationalisation</li>
                  <li>• Évolution du système productif avec les aspects <strong>calculateurs</strong></li>
                  <li>• Entrepreneurs qui calculent la meilleure combinaison productive</li>
                  <li>• L'argent = élément le plus <strong>abstrait et impersonnel</strong> de l'existence humaine</li>
                </ul>
              </div>

              <Callout type="warning" title="Désenchantement social">
                L'argent est générateur du <strong>désenchantement social</strong>. Il y a un <strong>antagonisme</strong> 
                (opposition radicale) entre l'économie monétaire et les liens sociaux. La logique <strong>quantitative</strong> 
                détruit les liens sociaux et les remplace par des rapports <strong>instrumentaux</strong> fondés sur le calcul.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="IV. François Simiand : la valeur des signes monétaires">
            <AuthorCard 
              name="François Simiand" 
              dates="1873-1935" 
              work="Critique de la théorie quantitative de la monnaie" 
              color="emerald"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/F_Simiand.jpg/500px-F_Simiand.jpg"
            >
              <p className="mb-4 text-slate-600">
                Les sociologues s'accordent : la monnaie n'est <strong>pas rattachée à la religion</strong> et a 
                totalement perdu son <strong>fondement précieux</strong> (métaux précieux). D'où vient alors sa valeur ?
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">Critique de la Théorie Quantitative de la Monnaie (TQM)</p>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  <strong>Équation TQM :</strong> MV = P × T (la valeur de la monnaie est inversement proportionnelle à sa quantité)
                </p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Cette théorie est <strong>fausse</strong> pour Simiand</li>
                  <li>• Testée empiriquement : <strong>non vérifiée</strong></li>
                  <li>• Il faut tenir compte de la <strong>diversité des dates d'achat</strong></li>
                  <li>• La valeur <strong>future</strong> impacte la valeur présente</li>
                </ul>
              </div>

              <Callout type="key" title="Effets de croyance">
                Les <strong>anticipations</strong> de la valeur future de la monnaie créent des <strong>effets de croyance</strong>. 
                On passe d'une évaluation objective (TQM) à un <strong>jugement individuel</strong>. Grande place donnée à 
                l'<strong>opinion</strong>, la subjectivité et les anticipations.
              </Callout>

              <div className="mt-4 p-3 bg-linear-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100">
                <p className="font-medium text-slate-900 text-sm mb-2">Rôle du contexte social :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• La monnaie n'a <strong>pas de valeur intrinsèque</strong></li>
                  <li>• Elle ne repose pas sur des éléments physiques et mesurables</li>
                  <li>• La monnaie n'est pas naturelle ni objective mais <strong>symbolique et relationnelle</strong></li>
                </ul>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="La monnaie comme fait social" 
              work="Construction collective fondée sur la confiance" 
              color="indigo"
              hideAvatar
            >
              <div className="p-3 sm:p-4 bg-linear-to-br from-indigo-50/50 to-violet-50/30 rounded-xl border border-indigo-100 mb-4">
                <p className="font-medium text-indigo-900 text-sm mb-2">Conclusion de Simiand</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• La monnaie est une <strong>construction collective</strong> fondée sur la confiance</li>
                  <li>• C'est un <strong>fait social</strong> fondé sur les croyances partagées</li>
                  <li>• Ce n'est pas l'État ou la banque centrale qui fonde la valeur</li>
                  <li>• C'est l'<strong>ensemble du corps social</strong> qui l'accepte et la reconnaît</li>
                </ul>
              </div>

              <Callout type="key" title="Consensus social">
                La monnaie repose sur un <strong>consensus social</strong> = contrat tacite. La TQM a été 
                <strong> abandonnée</strong> par les économistes eux-mêmes. Pour prendre en compte les variations 
                de la valeur dans le temps, ils font appel à des <strong>modèles à génération imbriquée</strong>.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : les approches sociologiques de la monnaie">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Auteur</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Vision</th>
                    <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Concept clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-violet-700">Simmel</td>
                    <td className="p-3 border border-slate-200">Psychologique</td>
                    <td className="p-3 border border-slate-200">Pouvoir d'attraction, représentations</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-sky-700">Zelizer</td>
                    <td className="p-3 border border-slate-200">Historique</td>
                    <td className="p-3 border border-slate-200">Signification sociale, doux commerce</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-rose-700">Marx</td>
                    <td className="p-3 border border-slate-200">Pessimiste</td>
                    <td className="p-3 border border-slate-200">Fétichisme, aliénation, destruction</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium text-amber-700">Weber</td>
                    <td className="p-3 border border-slate-200">Pessimiste</td>
                    <td className="p-3 border border-slate-200">Rationalisation, désenchantement</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium text-emerald-700">Simiand</td>
                    <td className="p-3 border border-slate-200">Constructiviste</td>
                    <td className="p-3 border border-slate-200">Fait social, croyances, confiance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La monnaie n'est pas un simple <strong>instrument technique</strong>. Elle est une <strong>institution sociale</strong> 
              fondée sur la confiance collective. Les sociologues montrent qu'elle véhicule des <strong>affects</strong>, 
              des <strong>représentations</strong> et peut être source de <strong>lien ou de destruction sociale</strong>.
            </Callout>
          </Section>
        </>
      )}

      <ChapterQCM chapter={6} title="La monnaie" questions={chapter6Questions} />

      <ChapterNav
        prev={{ path: '/socio/chapitre5', label: '← Chapitre précédent', title: 'Débat contemporain' }}
        next={{ path: '/socio/chapitre7', label: 'Chapitre suivant →', title: 'La consommation' }}
      />
    </main>
  );
}
