import { Users, CheckSquare, BookOpen, FileText, Clock } from 'lucide-react';
import { ModuleHub } from '../../../../features/course/components/ModuleHub';

const theme1Chapters = [
  { path: '/socio/chapitre1', number: '01', title: 'Naissance de la sociologie', desc: 'Précurseurs : Ibn Khaldoun, Lumières, Comte, Saint-Simon.' },
  { path: '/socio/chapitre2', number: '02', title: "Contexte d'émergence", desc: 'Révolutions industrielles et politiques, question sociale.' },
  { path: '/socio/chapitre3', number: '03', title: 'Durkheim et Weber', desc: 'Pères fondateurs, holisme vs individualisme méthodologique.' },
  { path: '/socio/chapitre4', number: '04', title: 'École de Chicago', desc: 'Sociologie urbaine, interactionnisme, observation participante.' },
  { path: '/socio/chapitre5', number: '05', title: 'Débat contemporain', desc: 'Bourdieu vs Lahire : structures vs individus.' },
];

const theme2Chapters = [
  { path: '/socio/chapitre6', number: '06', title: 'La monnaie', desc: 'Simmel, Zelizer, Marx, Weber, Simiand : approches sociologiques.' },
  { path: '/socio/chapitre7', number: '07', title: 'La consommation', desc: 'Veblen, Halbwachs, Hirschman : distinction et besoins.' },
  { path: '/socio/chapitre8', number: '08', title: 'Société de consommation', desc: 'Baudrillard, Marcuse, Debord, culture de masse.' },
  { path: '/socio/chapitre9', number: '09', title: 'Le marché', desc: 'Polanyi, Zelizer, Titmuss : construction sociale et légitimité.' },
  { path: '/socio/chapitre10', number: '10', title: 'Le travail', desc: 'Mayo, Friedmann, Rifkin, Granovetter : employabilité.' },
];

export default function SocioHome() {
  return (
    <ModuleHub
      title="Maîtrise la Sociologie"
      description="Un guide de révision complet : histoire de la pensée sociologique et sociologie économique. De Durkheim à Bourdieu."
      icon={Users}
      themeColor="violet"
      stats={[
        { label: 'chapitres', value: '10' },
        { label: 'thèmes', value: '2' },
        { label: 'questions QCM', value: '24' }
      ]}
      actions={[
        { label: 'Commencer la révision', path: '/socio/chapitre1', variant: 'primary' },
        { label: "S'entraîner aux QCM", path: '/socio/qcm', variant: 'outline', icon: CheckSquare }
      ]}
      sections={[
        {
          title: "Histoire de la pensée sociologique",
          description: "Les premiers courants et naissance de la sociologie",
          items: theme1Chapters,
          badge: "I",
          badgeColor: "bg-blue-600 dark:bg-blue-950/30"
        },
        {
          title: "Sociologie économique",
          description: "Un bref aperçu : monnaie, consommation, marché, travail",
          items: theme2Chapters,
          badge: "II",
          badgeColor: "bg-green-600"
        }
      ]}
      extras={{
        title: "Outils de révision",
        items: [
          { path: '/socio/revision-intensive', icon: Clock, title: 'Révision intensive', desc: 'Fiches ultra-concises' },
          { path: '/socio/methodologie', icon: FileText, title: 'Méthodologie', desc: 'Guide dissertation' }
        ]
      }}
      finalCta={{
        label: "Accéder à la révision intensive",
        path: '/socio/revision-intensive',
        icon: BookOpen
      }}
    />
  );
}
