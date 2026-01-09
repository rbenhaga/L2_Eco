import { BarChart3, BookOpen, FileText, CheckSquare, GraduationCap } from 'lucide-react';
import { ModuleHub } from '../../../../features/course/components/ModuleHub';

const chapters = [
  { path: '/stats/chapitre-1', number: '01', title: 'Probabilités & Algèbre de Boole', desc: "Axiomes, probabilités conditionnelles, Bayes, indépendance." },
  { path: '/stats/chapitre-2', number: '02', title: 'Variables Aléatoires Discrètes', desc: 'Loi de probabilité, espérance, variance, fonction génératrice.' },
  { path: '/stats/chapitre-3', number: '03', title: 'Variables Aléatoires Continues', desc: 'Densité, fonction de répartition, moments, fonction Gamma.' },
  { path: '/stats/chapitre-4', number: '04', title: 'Lois Usuelles', desc: 'Binomiale, Poisson, Hypergéométrique, Bienaymé-Tchebychev.' },
  { path: '/stats/chapitre-5', number: '05', title: 'VA à 2 Dimensions', desc: 'Loi conjointe, marginales, conditionnelles, covariance.' },
];

export function StatsHome() {
  return (
    <ModuleHub
      title="Maîtrise les Statistiques"
      description="Un guide de révision complet : cours, TD corrigés et QCM pour comprendre les probabilités, VA discrètes/continues et VA 2D."
      icon={BarChart3}
      themeColor="blue"
      stats={[
        { label: 'chapitres', value: '5' },
        { label: 'TD corrigés', value: '10' },
        { label: 'questions QCM', value: '50+' }
      ]}
      actions={[
        { label: 'Commencer la révision', path: '/stats/chapitre-1', variant: 'primary' },
        { label: "S'entraîner aux QCM", path: '/stats/qcm', variant: 'outline', icon: CheckSquare }
      ]}
      sections={[
        {
          title: "Les 5 chapitres du cours",
          items: chapters
        }
      ]}
      extras={{
        title: "S'entraîner",
        items: [
          { path: '/stats/td', icon: FileText, title: 'TD Corrigés', desc: 'Exercices par année avec corrections' },
          { path: '/stats/qcm', icon: CheckSquare, title: 'QCM', desc: 'QCM interactifs type examen' },
          { path: '/stats/revision', icon: BookOpen, title: 'Fiches', desc: 'Fiches de révision par chapitre' },
          { path: '/stats/annales', icon: GraduationCap, title: 'Annales', desc: 'Examens des années précédentes' },
        ]
      }}
      finalCta={{
        label: "Accéder aux fiches de révision",
        path: '/stats/revision',
        icon: BookOpen
      }}
    />
  );
}
