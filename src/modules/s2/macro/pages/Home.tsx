import { TrendingUp, BookOpen, FileText, CheckSquare, Play } from 'lucide-react';
import { ModuleHub } from '../../../../features/course/components/ModuleHub';

const chapters = [
  { path: '/macro/chapitre-1', number: '01', title: 'Introduction & IS-LM', desc: "Court/moyen/long terme, équilibre macroéconomique, multiplicateur." },
  { path: '/macro/chapitre-2', number: '02', title: 'Le Marché du Travail', desc: 'Modèle classique, WS-PS, chômage naturel et ses déterminants.' },
  { path: '/macro/chapitre-3', number: '03', title: "L'Équilibre AS-AD", desc: 'Synthèse IS-LM et WS-PS, dynamique CT/MT, stagflation.' },
  { path: '/macro/chapitre-4', number: '04', title: 'Politiques & Phillips', desc: 'BCE, dette publique, courbe de Phillips, anticipations.' },
];

export function MacroHome() {
  return (
    <ModuleHub
      title="Maîtrise la Macroéconomie"
      description="Un guide de révision complet : cours, exercices corrigés et QCM pour comprendre IS-LM, WS-PS, AS-AD et la courbe de Phillips."
      icon={TrendingUp}
      themeColor="blue"
      stats={[
        { label: 'chapitres', value: '4' },
        { label: 'questions', value: '120' },
        { label: 'simulations', value: '4' }
      ]}
      actions={[
        { label: 'Commencer la révision', path: '/macro/chapitre-1', variant: 'primary' },
        { label: "S'entraîner aux QCM", path: '/macro/qcm', variant: 'outline', icon: CheckSquare }
      ]}
      sections={[
        {
          title: "Les 4 chapitres du cours",
          items: chapters
        }
      ]}
      extras={{
        title: "S'entraîner",
        items: [
          { path: '/macro/exercices', icon: FileText, title: 'Exercices', desc: 'Exercices corrigés type TD' },
          { path: '/macro/qcm', icon: CheckSquare, title: 'QCM', desc: 'QCM interactifs type examen' },
          { path: '/macro/simulations', icon: Play, title: 'Simulations', desc: 'Graphiques interactifs animés' }
        ]
      }}
      finalCta={{
        label: "Accéder à la fiche de synthèse",
        path: '/macro/revision',
        icon: BookOpen
      }}
    />
  );
}
