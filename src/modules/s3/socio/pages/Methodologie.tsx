import { useState } from 'react';
import { Zap, BookOpen, ChevronRight, AlertTriangle, CheckCircle, Clock, PenTool } from 'lucide-react';
import { Section, Callout, PageHeader, ChapterNav, AuthorCard } from '../../../../components';

export default function Methodologie() {
  const [view, setView] = useState<'quick' | 'full'>('full');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        number="Méthodologie"
        title="La dissertation : mode d'emploi"
        description="Guide complet pour réussir l'exercice de dissertation en sociologie."
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
          <span className="hidden sm:inline">Guide complet</span>
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
          {/* Définition */}
          <div className="p-5 sm:p-7 bg-linear-to-br from-indigo-50 via-violet-50/50 to-slate-50 rounded-2xl border border-indigo-100/80">
            <h3 className="font-semibold text-slate-900 mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              Qu'est-ce qu'une dissertation ?
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Un exercice qui consiste à produire un <strong>texte structuré</strong> visant à répondre à une question.
              Elle nécessite de mobiliser des <strong>connaissances</strong> directement reliées au sujet et 
              <strong> logiquement articulées</strong> entre elles.
            </p>
          </div>

          {/* 3 caractéristiques */}
          <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🎯</span> 3 caractéristiques essentielles
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 sm:p-4 bg-linear-to-r from-violet-50 to-transparent rounded-xl border-l-3 border-violet-400">
                <strong className="text-violet-700">1. Construction logique</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Toutes les idées doivent s'enchaîner. Rigueur d'un exercice mathématique.</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-sky-50 to-transparent rounded-xl border-l-3 border-sky-400">
                <strong className="text-sky-700">2. Fruit d'un raisonnement</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Pas de recette magique. Chaque sujet est spécifique et doit être traité de façon spécifique.</p>
              </div>
              <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-transparent rounded-xl border-l-3 border-emerald-400">
                <strong className="text-emerald-700">3. Exercice de style</strong>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Qualité de l'expression fondamentale. "Ce qui se conçoit bien s'énonce clairement."</p>
              </div>
            </div>
          </div>

          {/* Structure formelle */}
          <div className="p-4 sm:p-6 bg-linear-to-br from-amber-50/50 to-orange-50/30 border border-amber-100 rounded-2xl">
            <h4 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">📋</span> Structure formelle (barème)
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-indigo-700 mb-1">INTRODUCTION (20%)</p>
                <p className="text-xs text-slate-600">Accroche (3%) + Analyse du sujet (10%) + Problématique + Annonce du plan (7%)</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-emerald-700 mb-1">DÉVELOPPEMENT (80%)</p>
                <p className="text-xs text-slate-600">Clarté des thèses (20%) + Analyse (20%) + Argumentation (40%)</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl">
                <p className="font-semibold text-violet-700 mb-1">CONCLUSION</p>
                <p className="text-xs text-slate-600">Bilan de la démonstration + Ouverture (optionnel)</p>
              </div>
            </div>
          </div>

          {/* Règle des 100/20 */}
          <Callout type="key" title="Règle des 100/20">
            Il faut <strong>savoir 100 pour utiliser 20</strong>. Un "trop-plein" de connaissances est nécessaire. 
            Une dissertation de 8 pages n'est qu'une sélection des arguments les plus importants.
          </Callout>

          {/* Erreurs à éviter */}
          <Callout type="warning" title="⚠️ Piège principal : le HORS-SUJET">
            Relire souvent le sujet au cours du devoir. Après chaque sous-partie, demandez-vous si ce que vous avez 
            écrit répond au sujet. Ne pas changer la nature du sujet, ne pas réduire ou accroître son champ.
          </Callout>

          <button
            onClick={() => setView('full')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            Voir le guide complet <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}


      {/* VERSION COMPLÈTE */}
      {view === 'full' && (
        <>
          <Section title="I. Nature et exigences de la dissertation">
            <p className="mb-4 text-slate-600">
              La dissertation est un exercice qui consiste à produire un <strong>texte structuré</strong> visant à 
              répondre à une question, celle-ci étant explicitement ou implicitement énoncée dans le sujet proposé.
            </p>

            <AuthorCard 
              name="Construction logique" 
              work="Rigueur d'un exercice mathématique" 
              color="violet"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Une dissertation est fondamentalement une <strong>construction logique</strong> dans laquelle toutes 
                les idées doivent s'enchaîner. Les idées principales doivent précéder les idées secondaires.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-rose-50/50 to-pink-50/30 rounded-xl border border-rose-100 mb-4">
                <p className="font-medium text-rose-900 text-sm mb-2">Défauts graves à éviter</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Conséquences évoquées <strong>avant</strong> le phénomène</li>
                  <li>• Causes citées <strong>après</strong> les conséquences</li>
                  <li>• Répétitions, retours en arrière, fuites en avant</li>
                  <li>• Sauts (passer du "coq à l'âne")</li>
                  <li>• Parties <strong>déséquilibrées</strong></li>
                </ul>
              </div>

              <Callout type="key">
                L'effort de structuration doit s'appliquer à l'<strong>ensemble du texte</strong>. 
                L'intérieur des parties doit lui-même être structuré. Chaque phrase doit être à sa place.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Fruit d'un raisonnement" 
              work="Chaque sujet est différent" 
              color="sky"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Chaque sujet est différent et doit être traité de façon <strong>spécifique</strong>. 
                Aucune "recette magique" ne pourra dispenser d'un effort de réflexion.
              </p>

              <div className="p-3 bg-linear-to-r from-sky-50/50 to-transparent rounded-xl border border-sky-100">
                <p className="text-xs sm:text-sm text-slate-600">
                  Le rédacteur doit faire sentir qu'il est le <strong>maître du récit</strong>, qu'il en domine la trame. 
                  Chaque "auteur" reclasse les faits et arguments selon sa conception du monde.
                </p>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Exercice de style" 
              work="Qualité de l'expression fondamentale" 
              color="emerald"
              hideAvatar
            >
              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">Règles de base</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Soignez l'écriture et la présentation</li>
                  <li>• Faites des <strong>phrases courtes</strong> : sujet, verbe, complément</li>
                  <li>• Soyez très attentifs à la <strong>ponctuation</strong></li>
                  <li>• Utilisez les <strong>adverbes de transition</strong> : en effet, toutefois, néanmoins...</li>
                </ul>
              </div>

              <blockquote className="text-sm sm:text-base italic text-slate-600 border-l-4 border-emerald-300 pl-4">
                "Ce qui se conçoit bien s'énonce clairement, et les mots pour le dire arrivent aisément."
              </blockquote>
            </AuthorCard>
          </Section>


          <Section title="II. Structure formelle de la dissertation">
            <p className="mb-4 text-slate-600">
              La dissertation prend une forme particulière composée de plusieurs éléments obligatoires.
            </p>

            {/* Introduction */}
            <AuthorCard 
              name="1. INTRODUCTION (20% de la note)" 
              work="4 piliers obligatoires" 
              color="indigo"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-indigo-50 to-violet-50/30 rounded-xl border border-indigo-100">
                  <p className="font-semibold text-indigo-700 text-sm">Accroche (3%)</p>
                  <p className="text-xs text-slate-600">Citation d'auteur, fait d'actualité ou fait historique marquant</p>
                </div>
                <div className="p-3 bg-linear-to-br from-indigo-50 to-violet-50/30 rounded-xl border border-indigo-100">
                  <p className="font-semibold text-indigo-700 text-sm">Analyse du sujet (10%)</p>
                  <p className="text-xs text-slate-600">Contextualisation, cadre spatio-temporel, enjeux</p>
                </div>
                <div className="p-3 bg-linear-to-br from-indigo-50 to-violet-50/30 rounded-xl border border-indigo-100">
                  <p className="font-semibold text-indigo-700 text-sm">Problématique</p>
                  <p className="text-xs text-slate-600">Fil directeur de l'analyse, pas une simple reformulation</p>
                </div>
                <div className="p-3 bg-linear-to-br from-indigo-50 to-violet-50/30 rounded-xl border border-indigo-100">
                  <p className="font-semibold text-indigo-700 text-sm">Annonce du plan (7%)</p>
                  <p className="text-xs text-slate-600">Grandes parties distinctes et cohérentes avec le sujet</p>
                </div>
              </div>

              <Callout type="method" title="Conseil important">
                Faites d'abord votre plan, et seulement ensuite l'introduction. Vous ne pouvez pas introduire 
                un développement que vous n'avez pas encore conçu ! <strong>15 min maximum</strong> pour l'introduction.
              </Callout>
            </AuthorCard>

            {/* Développement */}
            <AuthorCard 
              name="2. DÉVELOPPEMENT (80% de la note)" 
              work="Cœur de la dissertation" 
              color="emerald"
              hideAvatar
            >
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100 text-center">
                  <p className="font-bold text-emerald-700 text-lg">20%</p>
                  <p className="text-xs text-slate-600">Clarté des thèses</p>
                </div>
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100 text-center">
                  <p className="font-bold text-emerald-700 text-lg">20%</p>
                  <p className="text-xs text-slate-600">Analyse et interprétation</p>
                </div>
                <div className="p-3 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100 text-center">
                  <p className="font-bold text-emerald-700 text-lg">40%</p>
                  <p className="text-xs text-slate-600">Argumentation et cohérence</p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200 mb-4">
                <p className="font-medium text-slate-900 text-sm mb-2">Structure recommandée :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• <strong>2 à 3 parties</strong> maximum</li>
                  <li>• <strong>2 à 3 sous-parties</strong> par partie</li>
                  <li>• Parties <strong>équilibrées</strong></li>
                  <li>• Chaque partie = une étape claire du raisonnement</li>
                </ul>
              </div>

              <Callout type="warning">
                Le but n'est <strong>pas de recracher votre cours</strong>, mais de construire une réponse argumentée 
                à la problématique. Évitez le "plan catalogue" qui enchaîne des arguments sans liens.
              </Callout>
            </AuthorCard>

            {/* Transitions */}
            <AuthorCard 
              name="3. TRANSITIONS" 
              work="Essentielles pour la cohérence" 
              color="amber"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                Textes synthétiques permettant de rappeler le <strong>fil directeur</strong> de la démonstration 
                en lien avec la problématique. Elles prennent place entre les parties et sous-parties.
              </p>

              <div className="p-3 bg-linear-to-r from-amber-50/50 to-transparent rounded-xl border border-amber-100">
                <p className="text-xs sm:text-sm text-slate-600">
                  La première phrase de chaque partie doit <strong>annoncer le plan des sous-parties</strong>. 
                  Ces annonces sont essentielles : elles fournissent le fil directeur qui éclaire le lecteur.
                </p>
              </div>
            </AuthorCard>

            {/* Conclusion */}
            <AuthorCard 
              name="4. CONCLUSION" 
              work="Dernière impression" 
              color="violet"
              hideAvatar
            >
              <p className="mb-3 text-sm sm:text-base">
                La conclusion donne au correcteur la <strong>dernière impression</strong> de votre travail. 
                Même longueur que l'introduction. Construction inverse de l'introduction (on renverse l'entonnoir).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                  <p className="font-semibold text-violet-700 text-sm">Bilan</p>
                  <p className="text-xs text-slate-600">Synthèse des axes du développement, réponse finale à la problématique</p>
                </div>
                <div className="p-3 bg-linear-to-br from-violet-50 to-fuchsia-50/30 rounded-xl border border-violet-100">
                  <p className="font-semibold text-violet-700 text-sm">Ouverture (optionnel)</p>
                  <p className="text-xs text-slate-600">Élargissement du sujet. Mieux vaut ne pas en faire qu'une fausse question !</p>
                </div>
              </div>
            </AuthorCard>
          </Section>


          <Section title="III. Du sujet à la problématique">
            <AuthorCard 
              name="Le sujet, tout le sujet, rien que le sujet" 
              work="Éviter le hors-sujet" 
              color="rose"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                Le premier piège est de "lire" le sujet de manière cursive ou erronée. Il faut prêter une attention 
                particulière à <strong>chaque mot</strong> et à la place que chacun occupe.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-rose-50/50 to-pink-50/30 rounded-xl border border-rose-100 mb-4">
                <p className="font-medium text-rose-900 text-sm mb-2">Erreurs à éviter</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• <strong>Changer la nature</strong> du sujet, se tromper sur son enjeu</li>
                  <li>• <strong>Réduire</strong> le champ d'application (traitement partiel)</li>
                  <li>• <strong>Accroître</strong> le champ d'application (parties hors-sujet)</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100">
                  <p className="font-semibold text-sky-700 text-sm">Délimitation chronologique</p>
                  <p className="text-xs text-slate-600">Le choix des dates n'est jamais anodin. En cas d'absence, définir des dates butoirs.</p>
                </div>
                <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50/30 rounded-xl border border-sky-100">
                  <p className="font-semibold text-sky-700 text-sm">Délimitation géographique</p>
                  <p className="text-xs text-slate-600">Toujours préciser l'espace correspondant au sujet.</p>
                </div>
              </div>

              <Callout type="key">
                <strong>Relire souvent le sujet</strong> au cours du devoir permet d'éviter le principal écueil : 
                le hors-sujet. Demandez-vous après chaque sous-partie si ce que vous avez écrit répond au sujet.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="La problématique" 
              work="Fil directeur de l'analyse" 
              color="violet"
              hideAvatar
            >
              <p className="mb-4 text-sm sm:text-base">
                La problématique n'est <strong>pas une simple reformulation</strong> du sujet mais découle d'une 
                analyse et de la bonne compréhension du sujet. Elle doit être sous forme de <strong>question</strong>.
              </p>

              <div className="p-3 sm:p-4 bg-linear-to-br from-violet-50/50 to-fuchsia-50/30 rounded-xl border border-violet-100 mb-4">
                <p className="font-medium text-violet-900 text-sm mb-2">Exemple</p>
                <p className="text-xs text-slate-500 mb-1">Sujet : Révolutions agricoles et révolutions industrielles</p>
                <p className="text-sm text-violet-700 font-medium">
                  → Dans quelle mesure les révolutions agricoles ont-elles été le support des révolutions industrielles ?
                </p>
              </div>

              <Callout type="warning">
                Évitez la succession ou la liste de questions, cela n'apporte que de la confusion. 
                Une seule problématique claire et précise.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="IV. Conseils pratiques">
            <AuthorCard 
              name="Maîtrise des connaissances" 
              work="Règle des 100/20" 
              color="emerald"
              hideAvatar
            >
              <div className="p-3 sm:p-4 bg-linear-to-br from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100 mb-4">
                <p className="font-medium text-emerald-900 text-sm mb-2">Règle des 100/20</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Il faut <strong>savoir 100 pour utiliser 20</strong>. Un "trop-plein" de connaissances est nécessaire. 
                  Une dissertation de 8 pages n'est qu'une sélection des arguments les plus importants.
                </p>
              </div>

              <Callout type="warning" title="Piège des connaissances">
                Attention à ne pas vouloir trop en mettre et surcharger la copie d'informations peu importantes. 
                Une dissertation n'est <strong>pas une récitation</strong> ou une juxtaposition d'éléments de cours.
              </Callout>
            </AuthorCard>

            <AuthorCard 
              name="Le brouillon" 
              work="En 2 temps" 
              color="amber"
              hideAvatar
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">1. Écrire en vrac</p>
                  <p className="text-xs text-slate-600">Mots-clés, abréviations, idées qui viennent à l'esprit</p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-700 text-sm">2. Élaborer le plan</p>
                  <p className="text-xs text-slate-600">Classer les arguments préalablement dégagés</p>
                </div>
              </div>

              <div className="p-3 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900 text-sm mb-2">Règles du brouillon :</p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• N'écrivez <strong>jamais au verso</strong> des brouillons</li>
                  <li>• Soyez ordonné et <strong>numérotez</strong> vos feuillets</li>
                  <li>• Utilisez des <strong>stylos de couleurs</strong> différentes</li>
                  <li>• <strong>Ne rédigez pas</strong> au brouillon (pas le temps !)</li>
                </ul>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Gestion du temps (examen 2h)" 
              work="Optimiser chaque minute" 
              color="sky"
              hideAvatar
            >
              <div className="p-3 sm:p-4 bg-linear-to-br from-sky-50/50 to-blue-50/30 rounded-xl border border-sky-100 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <p className="text-sky-900 font-semibold">Pour un examen de 2h :</p>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Introduction <strong>réduite</strong> : contextualisation + problématique + plan</li>
                  <li>• Conclusion <strong>non obligatoire</strong> (selon les cas)</li>
                  <li>• Introduction : <strong>15 min maximum</strong></li>
                  <li>• <strong>Faire le plan AVANT l'introduction</strong></li>
                </ul>
              </div>
            </AuthorCard>
          </Section>


          <Section title="V. Barème d'évaluation détaillé">
            <AuthorCard 
              name="Introduction (20%)" 
              work="Critères d'évaluation" 
              color="indigo"
              hideAvatar
            >
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Critère</th>
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">%</th>
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Excellent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-slate-200 font-medium">Accroche</td>
                      <td className="p-3 border border-slate-200 text-indigo-700">3%</td>
                      <td className="p-3 border border-slate-200 text-xs">Originale, engageante, en lien direct avec le sujet</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 border border-slate-200 font-medium">Présentation du sujet</td>
                      <td className="p-3 border border-slate-200 text-indigo-700">10%</td>
                      <td className="p-3 border border-slate-200 text-xs">Contexte, enjeux et problématique clairs et bien articulés</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-medium">Annonce du plan</td>
                      <td className="p-3 border border-slate-200 text-indigo-700">7%</td>
                      <td className="p-3 border border-slate-200 text-xs">Parties distinctes, parfaitement cohérent avec le sujet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AuthorCard>

            <AuthorCard 
              name="Développement (80%)" 
              work="Critères d'évaluation" 
              color="emerald"
              hideAvatar
            >
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Critère</th>
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">%</th>
                      <th className="p-3 text-left font-semibold text-slate-700 border border-slate-200">Excellent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-slate-200 font-medium">Clarté des thèses</td>
                      <td className="p-3 border border-slate-200 text-emerald-700">20%</td>
                      <td className="p-3 border border-slate-200 text-xs">Thèses claires, bien définies, bonne compréhension</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 border border-slate-200 font-medium">Analyse</td>
                      <td className="p-3 border border-slate-200 text-emerald-700">20%</td>
                      <td className="p-3 border border-slate-200 text-xs">Analyse approfondie, interprétation convaincante</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-medium">Argumentation</td>
                      <td className="p-3 border border-slate-200 text-emerald-700">40%</td>
                      <td className="p-3 border border-slate-200 text-xs">Bien développée, exemples convaincants, cohérence</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Callout type="warning" title="Bonus/Malus : Qualité de la langue">
                Nombreuses erreurs de grammaire et syntaxe = <strong>malus</strong>. 
                Grammaire excellente, expression riche et précise = <strong>bonus</strong>.
              </Callout>
            </AuthorCard>
          </Section>

          <Section title="⚠️ Synthèse : les points clés">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-linear-to-br from-emerald-50 to-teal-50/30 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <p className="font-semibold text-emerald-700">À faire</p>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Relire souvent le sujet</li>
                  <li>• Faire le plan AVANT l'introduction</li>
                  <li>• Structurer chaque partie</li>
                  <li>• Utiliser des transitions</li>
                  <li>• Équilibrer les parties</li>
                </ul>
              </div>
              <div className="p-4 bg-linear-to-br from-rose-50 to-pink-50/30 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <p className="font-semibold text-rose-700">À éviter</p>
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Le HORS-SUJET</li>
                  <li>• Réciter son cours</li>
                  <li>• Plan catalogue sans liens</li>
                  <li>• Parties déséquilibrées</li>
                  <li>• Verbiage et bavardage</li>
                </ul>
              </div>
            </div>

            <Callout type="key" title="À retenir pour l'examen">
              La dissertation est une <strong>construction logique</strong> qui répond à une <strong>problématique</strong>. 
              Elle nécessite une <strong>maîtrise des connaissances</strong> (règle des 100/20) et une 
              <strong> structuration rigoureuse</strong>. Le principal piège est le <strong>hors-sujet</strong>.
            </Callout>
          </Section>
        </>
      )}

      <ChapterNav
        prev={{ path: '/socio/qcm', label: '← QCM', title: "QCM d'entraînement" }}
        next={{ path: '/socio', label: 'Accueil →', title: 'Accueil Sociologie' }}
      />
    </main>
  );
}
