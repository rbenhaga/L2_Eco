import { PieChart, CheckSquare, BookOpen, Target, FileText } from 'lucide-react';
import { ModuleHub } from '../../../../features/course/components/ModuleHub';

const chapters = [
  { path: '/micro/chapitre-0', number: '00', title: 'Théorie du Consommateur', desc: 'Contrainte budgétaire, préférences, TMS, équilibre, Cobb-Douglas.' },
  { path: '/micro/chapitre-1', number: '01', title: 'Arbitrage Travail-Loisir', desc: 'Offre de travail, effet substitution/revenu, backward-bending.' },
  { path: '/micro/chapitre-2', number: '02', title: 'Choix Intertemporels', desc: 'Épargne, emprunt, taux réel vs nominal, équation de Fisher.' },
  { path: '/micro/chapitre-3', number: '03', title: 'Surplus du Consommateur', desc: 'Disposition à payer, gain à l\'échange, perte sèche.' },
  { path: '/micro/chapitre-4', number: '04', title: 'Demande de Marché', desc: 'Agrégation, élasticités prix/revenu/croisée, biens normaux/inférieurs.' },
  { path: '/micro/chapitre-5', number: '05', title: 'Théorie du Producteur', desc: 'Fonction de production, TMST, isoquantes, minimisation des coûts.' },
  { path: '/micro/chapitre-6', number: '06', title: 'Concurrence Parfaite', desc: 'Price-taker, offre CT/LT, équilibre de long terme, surplus.' },
  { path: '/micro/chapitre-7', number: '07', title: 'Monopole & Oligopole', desc: 'Price-maker, Lerner, Cournot, Bertrand, Stackelberg.' },
];

export function MicroHome() {
  return (
    <ModuleHub
      title="Maîtrise la Microéconomie"
      description="Un guide de révision complet : consommateur, producteur, marchés. Du Lagrangien à l'équilibre de Cournot."
      icon={PieChart}
      themeColor="emerald"
      stats={[
        { label: 'chapitres', value: '8' },
        { label: 'questions QCM', value: '100+' },
        { label: 'exercices', value: '20+' }
      ]}
      actions={[
        { label: 'Commencer la révision', path: '/micro/chapitre-0', variant: 'primary' },
        { label: "S'entraîner aux QCM", path: '/micro/qcm', variant: 'outline', icon: CheckSquare }
      ]}
      sections={[
        {
          title: "Les 8 chapitres du cours",
          items: chapters
        }
      ]}
      extras={{
        title: "Outils de révision",
        items: [
          { path: '/micro/td', icon: FileText, title: 'TD Corrigés', desc: 'Exercices par année' },
          { path: '/micro/annales', icon: FileText, title: 'Annales', desc: 'Sujets d\'examens' },
          { path: '/micro/fiches', icon: BookOpen, title: 'Fiches de révision', desc: 'Résumés de cours' },
          { path: '/micro/methodes', icon: Target, title: 'Méthodes pas à pas', desc: 'Guides de résolution' }
        ]
      }}
    />
  );
}
