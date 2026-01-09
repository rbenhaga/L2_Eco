import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, RotateCcw, FileText, Trophy } from 'lucide-react';
import { Math as MathDisplay } from '../../../../components';

function renderWithMath(text: string) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const formula = part.slice(1, -1);
      return <MathDisplay key={i}>{formula}</MathDisplay>;
    }
    return <span key={i}>{part}</span>;
  });
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface Exercise {
  id: string;
  title: string;
  points: number;
  context?: string;
  questions: Question[];
}

interface Exam {
  id: string;
  year: string;
  title: string;
  duration: number;
  totalPoints: number;
  exercises: Exercise[];
}

const exams: Exam[] = [
  {
    id: 'blanc-2024',
    year: '2024-2025',
    title: 'Examen Blanc Tutorat',
    duration: 120,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'Partie I : Fiscalité et Bien-être',
        points: 6,
        context: "Fonction d'utilité quasi-linéaire : $u(x_1, x_2) = x_1 + \\ln(2 + x_2)$. Bien 1 numéraire (prix = 1), bien 2 au prix $p < 1$ avec taxe $t > 0$.",
        questions: [
          { id: '1', question: "La demande Marshallienne du bien 2 est :", options: ["$x_2^* = \\frac{1}{p} - 2$", "$x_2^* = \\frac{R}{p}$", "$x_2^* = \\frac{1}{p+t}$", "Autre"], correct: 0, explanation: "Pour $u = x_1 + \\ln(2+x_2)$, la CPO donne $\\frac{1}{2+x_2} = p$, donc $x_2^* = \\frac{1}{p} - 2$. Indépendant de R !", points: 1 },
          { id: '2', question: "L'utilité marginale du revenu est :", options: ["Variable", "Constante = 1", "Constante = p", "Nulle"], correct: 1, explanation: "Pour une utilité quasi-linéaire, $\\frac{\\partial v}{\\partial R} = 1$. L'utilité marginale du revenu est constante.", points: 1 },
          { id: '3', question: "La fonction de dépense $e(p, u)$ est :", options: ["$u + 1 - 2p + \\ln p$", "$u \\cdot p$", "$R - p$", "Autre"], correct: 0, explanation: "De $v(p,R) = R - 1 + 2p - \\ln p$, on inverse pour obtenir $e(p,u) = u + 1 - 2p + \\ln p$.", points: 1 },
          { id: '4', question: "Pour cette fonction d'utilité, $\\Delta E$, $\\Delta C$ et $\\Delta SC$ sont :", options: ["Tous différents", "Tous égaux", "$\\Delta E = \\Delta C \\neq \\Delta SC$", "Autre"], correct: 1, explanation: "Avec une utilité quasi-linéaire, les demandes Marshallienne et Hicksienne coïncident, donc $\\Delta E = \\Delta C = \\Delta SC$.", points: 1 },
          { id: '5', question: "La perte sèche d'une taxe est proportionnelle à :", options: ["$t$", "$t^2$", "$\\sqrt{t}$", "$1/t$"], correct: 1, explanation: "La perte sèche (deadweight loss) est proportionnelle au carré de la taxe : $DWL \\propto t^2$.", points: 1 },
          { id: '6', question: "Le coût social des fonds publics mesure :", options: ["La recette fiscale", "La perte sèche par euro collecté", "Le surplus total", "Le profit"], correct: 1, explanation: "Le coût social des fonds publics = perte sèche / recette fiscale. Il mesure l'inefficience de la taxation.", points: 1 },
        ]
      },
      {
        id: 'ex2',
        title: 'Partie II : Équilibre Général',
        points: 7,
        context: "Économie d'échange avec 2 consommateurs. Agent a : $u_a = x_1^a + \\ln(2+x_2^a)$, dotation $w_1$. Agent b : $u_b = \\ln(1+x_1^b) + 2x_2^b$, dotation $w_2$.",
        questions: [
          { id: '1', question: "La demande de bien 2 par l'agent a est :", options: ["$x_2^a = \\frac{p_1}{p_2} - 2$", "$x_2^a = \\frac{R_a}{p_2}$", "$x_2^a = w_1$", "Autre"], correct: 0, explanation: "Même logique que Partie I : $x_2^a = \\frac{p_1}{p_2} - 2$ (quasi-linéaire).", points: 1 },
          { id: '2', question: "La demande de bien 1 par l'agent b est :", options: ["$x_1^b = \\frac{p_2}{2p_1} - 1$", "$x_1^b = \\frac{R_b}{p_1}$", "$x_1^b = w_2$", "Autre"], correct: 0, explanation: "Pour $u_b = \\ln(1+x_1^b) + 2x_2^b$, la CPO donne $\\frac{1}{1+x_1^b} = \\lambda p_1$ et $2 = \\lambda p_2$.", points: 1 },
          { id: '3', question: "À l'équilibre concurrentiel, le rapport des prix $p_1/p_2$ :", options: ["Dépend des dotations", "Est toujours égal à 1", "Est indéterminé", "Autre"], correct: 0, explanation: "Le rapport des prix d'équilibre dépend des dotations initiales $w_1$ et $w_2$.", points: 1 },
          { id: '4', question: "Le premier théorème du bien-être affirme que :", options: ["Tout équilibre est Pareto-optimal", "Tout optimum est décentralisable", "Les deux", "Aucun"], correct: 0, explanation: "1er théorème : sous hypothèses usuelles, tout équilibre concurrentiel est un optimum de Pareto.", points: 1 },
          { id: '5', question: "Le second théorème du bien-être affirme que :", options: ["Tout équilibre est Pareto-optimal", "Tout optimum est décentralisable (avec transferts)", "Les deux", "Aucun"], correct: 1, explanation: "2ème théorème : tout optimum de Pareto peut être décentralisé comme équilibre concurrentiel avec transferts forfaitaires.", points: 1.5 },
          { id: '6', question: "Une allocation est décentralisable si :", options: ["Elle maximise le surplus", "Elle peut être atteinte comme équilibre de marché", "Elle est équitable", "Autre"], correct: 1, explanation: "Une allocation est décentralisable si elle peut être obtenue comme équilibre concurrentiel (éventuellement avec transferts).", points: 1.5 },
        ]
      },
      {
        id: 'ex3',
        title: 'Partie III : Externalité et Taxe Pigouvienne',
        points: 7,
        context: "N agents, 1 entreprise. Production : $y_2 \\leq \\sqrt{y_1}$. Utilité avec externalité : $u = x_1^n + \\ln(1+x_2^n) - \\frac{1}{2}\\ln(2+y_2)$.",
        questions: [
          { id: '1', question: "Le profit maximal de l'entreprise est :", options: ["$\\Pi = \\frac{p^2}{4}$", "$\\Pi = p \\cdot y_2$", "$\\Pi = 0$", "Autre"], correct: 0, explanation: "Max $\\Pi = py_2 - y_1$ avec $y_2 = \\sqrt{y_1}$. CPO : $\\frac{p}{2\\sqrt{y_1}} = 1$ → $y_1 = \\frac{p^2}{4}$, $\\Pi = \\frac{p^2}{4}$.", points: 1 },
          { id: '2', question: "La demande de bien 2 par chaque agent est :", options: ["$x_2^n = \\frac{1}{p} - 1$", "$x_2^n = \\frac{m^n}{p}$", "$x_2^n = y_2/N$", "Autre"], correct: 0, explanation: "Quasi-linéaire : $\\frac{1}{1+x_2^n} = p$ → $x_2^n = \\frac{1}{p} - 1$.", points: 1 },
          { id: '3', question: "L'externalité négative implique que :", options: ["La production est trop faible", "La production est trop élevée", "La production est optimale", "Autre"], correct: 1, explanation: "Externalité négative : le marché surproduit car le producteur ne tient pas compte du dommage causé aux autres.", points: 1 },
          { id: '4', question: "La taxe pigouvienne optimale est :", options: ["$t^* = \\frac{1}{N}$", "$t^* = p$", "$t^* = 0$", "Autre"], correct: 0, explanation: "La taxe optimale égale le dommage marginal : $t^* = \\frac{1}{2(2+y_2)} \\times N^{-1} = \\frac{1}{N}$ à l'optimum.", points: 1.5 },
          { id: '5', question: "La taxe pigouvienne permet de :", options: ["Maximiser la recette fiscale", "Internaliser l'externalité", "Éliminer la production", "Autre"], correct: 1, explanation: "La taxe pigouvienne internalise l'externalité en faisant payer au producteur le coût social de sa production.", points: 1.5 },
          { id: '6', question: "Après taxation, l'allocation est :", options: ["Pareto-optimale", "Sous-optimale", "Inchangée", "Autre"], correct: 0, explanation: "La taxe pigouvienne restaure l'efficience : l'allocation devient Pareto-optimale.", points: 1 },
        ]
      },
    ]
  },
  {
    id: 'td-2022-2023',
    year: '2022-2023',
    title: 'Partiel TD',
    duration: 90,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'Choix intertemporel',
        points: 4.5,
        context: "Madame Michelle : $U(C_1, C_2) = \\ln C_1 + \\ln C_2$. Revenus $R_1$ et $R_2$, taux d'intérêt $i$.",
        questions: [
          { id: '1', question: "La contrainte budgétaire intertemporelle en valeur présente est :", options: ["$C_1 + \\frac{C_2}{1+i} = R_1 + \\frac{R_2}{1+i}$", "$C_1 + C_2 = R_1 + R_2$", "$(1+i)C_1 + C_2 = (1+i)R_1 + R_2$", "Autre"], correct: 0, explanation: "En valeur présente, on actualise les flux futurs : $C_1 + \\frac{C_2}{1+i} = R_1 + \\frac{R_2}{1+i}$.", points: 1 },
          { id: '2', question: "Pour $U = \\ln C_1 + \\ln C_2$, la consommation optimale $C_1^*$ est :", options: ["$\\frac{1}{2}(R_1 + \\frac{R_2}{1+i})$", "$R_1$", "$\\frac{R_1 + R_2}{2}$", "Autre"], correct: 0, explanation: "Avec $\\alpha = \\beta = 0.5$, $C_1^* = 0.5 \\times$ richesse totale actualisée.", points: 1 },
          { id: '3', question: "Si $C_1^* < R_1$, l'individu est :", options: ["Emprunteur", "Épargnant", "Ni l'un ni l'autre", "Autre"], correct: 1, explanation: "Si $C_1^* < R_1$, l'individu consomme moins que son revenu en période 1 : il épargne.", points: 1 },
          { id: '4', question: "Une hausse du taux d'intérêt pour un épargnant :", options: ["Le rend plus pauvre", "Le rend plus riche", "N'a pas d'effet", "Autre"], correct: 1, explanation: "Un épargnant bénéficie d'une hausse de $i$ : son épargne rapporte plus.", points: 1.5 },
        ]
      },
      {
        id: 'ex2',
        title: 'Minimisation des coûts',
        points: 5,
        context: "Fonction de production $Q = K^{0.5}L^{0.5}$. Prix des facteurs : $r$ et $w$.",
        questions: [
          { id: '1', question: "La condition de minimisation des coûts est :", options: ["$\\frac{K}{L} = \\frac{w}{r}$", "$\\frac{K}{L} = \\frac{r}{w}$", "$K = L$", "Autre"], correct: 0, explanation: "TMST = $\\frac{Pm_L}{Pm_K} = \\frac{K}{L} = \\frac{w}{r}$.", points: 1 },
          { id: '2', question: "Pour $r = 4$, $w = 1$, la relation optimale est :", options: ["$K = 4L$", "$K = L/4$", "$K = L$", "Autre"], correct: 1, explanation: "$\\frac{K}{L} = \\frac{w}{r} = \\frac{1}{4}$ → $K = \\frac{L}{4}$.", points: 1 },
          { id: '3', question: "Pour $Q = 10$, $r = 4$, $w = 1$, le coût total minimal est :", options: ["40", "20", "100", "Autre"], correct: 0, explanation: "$10 = K^{0.5}L^{0.5}$ avec $K = L/4$ → $L = 20$, $K = 5$. $CT = 4(5) + 1(20) = 40$.", points: 1.5 },
          { id: '4', question: "La fonction de coût est :", options: ["$CT(Q) = 2Q\\sqrt{rw}$", "$CT(Q) = Q^2$", "$CT(Q) = rK + wL$", "Autre"], correct: 0, explanation: "Pour Cobb-Douglas symétrique, $CT(Q) = 2Q\\sqrt{rw}$.", points: 1.5 },
        ]
      },
      {
        id: 'ex3',
        title: 'Équilibre et surplus',
        points: 7.5,
        context: "Offre : $Q_O = 2p - 6$. Demande : $Q_D = 12 - p$.",
        questions: [
          { id: '1', question: "Le prix d'équilibre est :", options: ["6", "4", "8", "Autre"], correct: 0, explanation: "$2p - 6 = 12 - p$ → $3p = 18$ → $p^* = 6$.", points: 1 },
          { id: '2', question: "La quantité d'équilibre est :", options: ["6", "8", "4", "Autre"], correct: 0, explanation: "$Q^* = 12 - 6 = 6$.", points: 1 },
          { id: '3', question: "Le surplus du consommateur est :", options: ["18", "9", "27", "Autre"], correct: 0, explanation: "$SC = \\frac{1}{2}(12-6) \\times 6 = 18$.", points: 1 },
          { id: '4', question: "Le surplus du producteur est :", options: ["9", "18", "27", "Autre"], correct: 0, explanation: "$SP = \\frac{1}{2}(6-3) \\times 6 = 9$.", points: 1 },
          { id: '5', question: "Si le marché s'ouvre avec $p_m = 4$, les importations sont :", options: ["6", "4", "8", "Autre"], correct: 0, explanation: "$Q_D(4) = 8$, $Q_O(4) = 2$. Importations = $8 - 2 = 6$.", points: 1.5 },
          { id: '6', question: "Après ouverture, le surplus du consommateur devient :", options: ["32", "18", "24", "Autre"], correct: 0, explanation: "$SC = \\frac{1}{2}(12-4) \\times 8 = 32$.", points: 1 },
          { id: '7', question: "Après ouverture, le surplus du producteur devient :", options: ["1", "9", "4", "Autre"], correct: 0, explanation: "$SP = \\frac{1}{2}(4-3) \\times 2 = 1$.", points: 1 },
        ]
      },
      {
        id: 'ex4',
        title: 'Arbitrage travail-loisirs',
        points: 4,
        context: "$U(C, L) = C^\\alpha L^\\beta$ avec $\\alpha + \\beta = 1$. Temps total $T$, salaire $w$, revenu exogène $\\bar{R}$.",
        questions: [
          { id: '1', question: "Le loisir optimal $L^*$ est :", options: ["$\\beta(\\frac{\\bar{R}}{w} + T)$", "$\\alpha T$", "$T - \\frac{\\bar{R}}{w}$", "Autre"], correct: 0, explanation: "$L^* = \\frac{\\beta}{\\alpha+\\beta}(\\frac{\\bar{R}}{w} + T) = \\beta(\\frac{\\bar{R}}{w} + T)$.", points: 1 },
          { id: '2', question: "L'offre de travail $L_s$ est :", options: ["$\\alpha T - \\frac{\\beta\\bar{R}}{w}$", "$T - L^*$", "$\\frac{\\alpha R}{w}$", "Les deux premières"], correct: 3, explanation: "$L_s = T - L^* = \\alpha T - \\frac{\\beta\\bar{R}}{w}$.", points: 1 },
          { id: '3', question: "Si $\\bar{R} = 0$, l'offre de travail :", options: ["Dépend de w", "Est indépendante de w", "Est nulle", "Autre"], correct: 1, explanation: "Si $\\bar{R} = 0$, $L_s = \\alpha T$ : indépendant de w (Cobb-Douglas).", points: 1 },
          { id: '4', question: "Une hausse de w a un effet ambigu sur $L_s$ car :", options: ["ES et ER sont de même signe", "ES et ER sont de signes opposés", "Il n'y a pas d'effet revenu", "Autre"], correct: 1, explanation: "ES > 0 (loisir plus cher → travail ↑), ER < 0 (plus riche → loisir ↑). Effets opposés.", points: 1 },
        ]
      },
    ]
  },

  {
    id: 'td-2020-2021',
    year: '2020-2021',
    title: 'Partiel TD',
    duration: 90,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'Choix intertemporel',
        points: 6,
        context: "Consommateur avec $U(C_1, C_2) = C_1^{0.5} C_2^{0.5}$. Revenus $Y_1 = 100$, $Y_2 = 50$, taux $r = 10\\%$.",
        questions: [
          { id: '1', question: "La richesse totale actualisée est :", options: ["145.45", "150", "155", "Autre"], correct: 0, explanation: "$W = Y_1 + \\frac{Y_2}{1+r} = 100 + \\frac{50}{1.1} = 145.45$.", points: 1 },
          { id: '2', question: "La consommation optimale $C_1^*$ est :", options: ["72.73", "75", "50", "Autre"], correct: 0, explanation: "$C_1^* = 0.5 \\times 145.45 = 72.73$.", points: 1 },
          { id: '3', question: "L'épargne en période 1 est :", options: ["27.27", "0", "50", "Autre"], correct: 0, explanation: "$S = Y_1 - C_1^* = 100 - 72.73 = 27.27$.", points: 1 },
          { id: '4', question: "La consommation $C_2^*$ est :", options: ["80", "72.73", "50", "Autre"], correct: 0, explanation: "$C_2^* = 0.5 \\times 145.45 \\times 1.1 = 80$.", points: 1 },
          { id: '5', question: "Si $r$ augmente, un épargnant :", options: ["Consomme plus en période 1", "Consomme moins en période 1", "Effet ambigu", "Autre"], correct: 2, explanation: "ES : $r \\uparrow$ → $C_1 \\downarrow$. ER : plus riche → $C_1 \\uparrow$. Effet ambigu.", points: 1 },
          { id: '6', question: "L'effet substitution d'une hausse de $r$ :", options: ["Augmente $C_1$", "Diminue $C_1$", "N'a pas d'effet", "Autre"], correct: 1, explanation: "ES : $r \\uparrow$ → consommer demain devient plus attractif → $C_1 \\downarrow$.", points: 1 },
        ]
      },
      {
        id: 'ex2',
        title: 'Équilibre et surplus',
        points: 7,
        context: "Demande : $Q_D = 100 - 2P$. Offre : $Q_O = 3P - 20$.",
        questions: [
          { id: '1', question: "Le prix d'équilibre est :", options: ["24", "20", "30", "Autre"], correct: 0, explanation: "$100 - 2P = 3P - 20$ → $5P = 120$ → $P^* = 24$.", points: 1 },
          { id: '2', question: "La quantité d'équilibre est :", options: ["52", "48", "60", "Autre"], correct: 0, explanation: "$Q^* = 100 - 2(24) = 52$.", points: 1 },
          { id: '3', question: "Le surplus du consommateur est :", options: ["676", "624", "700", "Autre"], correct: 0, explanation: "$SC = \\frac{1}{2}(50-24) \\times 52 = 676$.", points: 1 },
          { id: '4', question: "Le surplus du producteur est :", options: ["520", "676", "400", "Autre"], correct: 0, explanation: "$SP = \\frac{1}{2}(24-6.67) \\times 52 \\approx 520$.", points: 1 },
          { id: '5', question: "Une taxe de 5€ crée une perte sèche de :", options: ["Environ 25", "Environ 50", "Environ 12.5", "Autre"], correct: 2, explanation: "$DWL \\approx \\frac{1}{2} \\times t \\times \\Delta Q$. Avec $t = 5$, $\\Delta Q \\approx 5$, $DWL \\approx 12.5$.", points: 1.5 },
          { id: '6', question: "La recette fiscale de la taxe est :", options: ["Environ 235", "Environ 250", "Environ 200", "Autre"], correct: 0, explanation: "$T = t \\times Q_{taxe} \\approx 5 \\times 47 = 235$.", points: 1.5 },
        ]
      },
      {
        id: 'ex3',
        title: 'Minimisation des coûts',
        points: 7,
        context: "Production : $Q = 2K^{0.5}L^{0.5}$. Prix : $r = 8$, $w = 2$.",
        questions: [
          { id: '1', question: "Le TMST est :", options: ["$K/L$", "$L/K$", "$2K/L$", "Autre"], correct: 0, explanation: "$TMST = \\frac{Pm_L}{Pm_K} = \\frac{K^{0.5}L^{-0.5}}{K^{-0.5}L^{0.5}} = \\frac{K}{L}$.", points: 1 },
          { id: '2', question: "La relation optimale K/L est :", options: ["$K = L/4$", "$K = 4L$", "$K = L$", "Autre"], correct: 0, explanation: "$\\frac{K}{L} = \\frac{w}{r} = \\frac{2}{8} = \\frac{1}{4}$ → $K = \\frac{L}{4}$.", points: 1 },
          { id: '3', question: "Pour $Q = 20$, $L^*$ est :", options: ["20", "10", "40", "Autre"], correct: 0, explanation: "$20 = 2(L/4)^{0.5}L^{0.5} = L$ → $L^* = 20$.", points: 1.5 },
          { id: '4', question: "Pour $Q = 20$, $K^*$ est :", options: ["5", "20", "10", "Autre"], correct: 0, explanation: "$K^* = L^*/4 = 20/4 = 5$.", points: 1.5 },
          { id: '5', question: "Le coût total pour $Q = 20$ est :", options: ["80", "100", "60", "Autre"], correct: 0, explanation: "$CT = rK + wL = 8(5) + 2(20) = 40 + 40 = 80$.", points: 1 },
          { id: '6', question: "Le coût moyen pour $Q = 20$ est :", options: ["4", "5", "3", "Autre"], correct: 0, explanation: "$CM = CT/Q = 80/20 = 4$.", points: 1 },
        ]
      },
    ]
  },
  {
    id: 'exam-2024-2025',
    year: '2024-2025',
    title: 'Examen S1 (Officiel)',
    duration: 90,
    totalPoints: 20,
    exercises: [
      {
        id: 'qcm',
        title: 'Questions de cours',
        points: 6,
        questions: [
          { id: '1', question: "Sur un marché concurrentiel, quand une firme cesse-t-elle sa production à court terme ?", options: ["Lorsque le prix est inférieur au coût marginal", "Lorsque le prix est inférieur au coût variable moyen", "Lorsque le coût marginal dépasse le coût total", "Aucune des réponses ci-dessus"], correct: 1, explanation: "La firme ferme à CT si $P < CVM_{min}$. Elle ne couvre même pas ses coûts variables.", points: 1 },
          { id: '2', question: "Dans un duopole de Cournot, les entreprises...", options: ["Décident du prix en coopération", "Décident de la quantité indépendamment l'une de l'autre", "Décident de la production en coopérant", "Aucune des réponses ci-dessus"], correct: 1, explanation: "En Cournot, les firmes choisissent simultanément et indépendamment leurs quantités.", points: 1 },
          { id: '3', question: "La courbe d'offre de LT d'une entreprise correspond à...", options: ["La partie croissante du CVM", "La partie croissante du Cm au-dessus du CVM", "La partie croissante du CVM au-dessus du CM", "Aucune des réponses ci-dessus"], correct: 3, explanation: "À LT, l'offre est la partie croissante du Cm au-dessus du CM (pas du CVM).", points: 1 },
          { id: '4', question: "Le surplus du consommateur est maximisé lorsque...", options: ["Le monopole produit à un prix supérieur au Cm", "La production atteint l'efficacité Pareto", "Le monopole produit à un prix égal au Cm", "Aucune des réponses ci-dessus"], correct: 2, explanation: "Le surplus est maximisé quand $P = Cm$ (efficience allocative).", points: 1 },
          { id: '5', question: "Un consommateur prêt à substituer une heure de loisir par une unité de consommation correspond au concept de :", options: ["La désutilité du travail", "Le coût marginal de la consommation", "Le taux marginal de substitution", "Aucune des réponses ci-dessus"], correct: 2, explanation: "Le TMS mesure le taux d'échange entre deux biens à utilité constante.", points: 1 },
          { id: '6', question: "Lorsqu'une entreprise fixe son prix en premier, suivie par une autre qui fixe un prix supérieur, on parle de...", options: ["Équilibre de Stackelberg", "Équilibre de Cournot", "Équilibre de Bertrand", "Aucune des réponses ci-dessus"], correct: 3, explanation: "Ce n'est ni Stackelberg (quantités), ni Cournot (simultané), ni Bertrand classique.", points: 1 },
        ]
      },
      {
        id: 'ex1',
        title: 'Exercice 1 : Travail-Loisir',
        points: 7,
        context: "$U(C, L) = C + 2\\sqrt{L}$, prix du bien = 1€, salaire = w€.",
        questions: [
          { id: '7', question: "L'utilité marginale du loisir est :", options: ["$2/L$", "$1/\\sqrt{L}$", "$2\\sqrt{L}$", "$1/L$"], correct: 1, explanation: "$Um_L = \\frac{\\partial U}{\\partial L} = \\frac{2}{2\\sqrt{L}} = \\frac{1}{\\sqrt{L}}$", points: 1 },
          { id: '8', question: "Le TMS entre loisir et consommation est :", options: ["$1/w$", "$w$", "$2/\\sqrt{L}$", "$1/\\sqrt{L}$"], correct: 3, explanation: "$TMS = \\frac{Um_L}{Um_C} = \\frac{1/\\sqrt{L}}{1} = \\frac{1}{\\sqrt{L}}$", points: 2 },
          { id: '9', question: "Comment évolue le loisir quand le salaire augmente ?", options: ["Le loisir diminue", "Le loisir augmente", "Cela dépend des effets substitution et revenu", "Le loisir reste inchangé"], correct: 2, explanation: "L'effet net dépend de la force relative de l'ES (loisir ↓) et de l'ER (loisir ↑).", points: 2 },
          { id: '10', question: "Si le salaire augmente, le consommateur travaille-t-il davantage ?", options: ["Oui, car l'ES domine", "Non, car l'ES domine", "Non, car l'ER compense l'ES", "Cela dépend des préférences"], correct: 3, explanation: "L'effet net est ambigu et dépend des préférences individuelles.", points: 2 },
        ]
      },
      {
        id: 'ex2',
        title: 'Exercice 2 : Monopole',
        points: 7,
        context: "Demande : $P = 120 - 3Q$, Coût : $C(Q) = Q^2 + 20$.",
        questions: [
          { id: '11', question: "Le prix et la quantité qui maximisent le profit du monopole sont :", options: ["$Q = 15$, $P = 75$", "$Q = 20$, $P = 60$", "$Q = 24$, $P = 48$", "Aucune des réponses ci-dessus"], correct: 0, explanation: "$Rm = 120 - 6Q$, $Cm = 2Q$. $Rm = Cm$ → $120 - 6Q = 2Q$ → $Q = 15$, $P = 75$.", points: 1 },
          { id: '12', question: "Le surplus du consommateur en monopole est :", options: ["337.5", "600", "900", "Aucune des réponses ci-dessus"], correct: 0, explanation: "$SC = \\frac{1}{2}(120 - 75) \\times 15 = \\frac{1}{2} \\times 45 \\times 15 = 337.5$", points: 2 },
          { id: '13', question: "Le niveau de production socialement efficace est :", options: ["$Q = 24$, $P = 48$", "$Q = 30$, $P = 30$", "$Q = 40$, $P = 20$", "Aucune des réponses ci-dessus"], correct: 0, explanation: "$P = Cm$ → $120 - 3Q = 2Q$ → $Q = 24$, $P = 48$.", points: 2 },
          { id: '14', question: "En CPP, la production et le prix seraient :", options: ["$Q = 24$, $P = 48$", "$Q = 30$, $P = 40$", "$Q = 40$, $P = 20$", "Aucune des réponses ci-dessus"], correct: 0, explanation: "En CPP, $P = Cm$, donc même résultat que l'efficience sociale.", points: 2 },
        ]
      },
    ]
  },
  {
    id: 'exam-2021-2022',
    year: '2021-2022',
    title: 'Examen S1 (Officiel)',
    duration: 90,
    totalPoints: 20,
    exercises: [
      {
        id: 'qcm',
        title: 'Questions de cours',
        points: 6,
        questions: [
          { id: '1', question: "Sur un marché compétitif, quand une firme décide-t-elle de ne pas produire à court terme ?", options: ["$P < CM$", "$P > CM$", "$P > CVM$", "$P < CVM$"], correct: 3, explanation: "La firme ferme si $P < CVM_{min}$ : elle ne couvre pas ses coûts variables.", points: 1 },
          { id: '2', question: "Avec $C(y) = 10y^2 + 1000$, à quel prix la firme décide-t-elle de produire ?", options: ["200", "100", "1000", "150"], correct: 0, explanation: "$CVM = 10y$. Min CVM quand $y \\to 0$ : seuil = 0. Mais $Cm = 20y$, donc à $P = 200$, $y = 10$.", points: 1 },
          { id: '3', question: "Si 50 unités vendues à 20€ et 80 unités à 15€, l'élasticité-prix est :", options: ["2.4", "0.42", "0.17", "6"], correct: 0, explanation: "$\\varepsilon = \\frac{\\Delta Q/Q}{\\Delta P/P} = \\frac{30/65}{5/17.5} \\approx 2.4$", points: 1 },
          { id: '4', question: "Comment mesure-t-on l'inefficacité du monopole ?", options: ["Le coût", "La perte sèche", "Le nombre d'acheteurs", "Les barrières à l'entrée"], correct: 1, explanation: "La perte sèche (deadweight loss) mesure l'inefficience du monopole.", points: 1 },
          { id: '5', question: "La courbe d'offre de travail est :", options: ["Toujours décroissante", "Toujours croissante", "Croissante puis décroissante", "Décroissante puis croissante"], correct: 2, explanation: "Courbe backward-bending : croissante (ES domine) puis décroissante (ER domine).", points: 1 },
          { id: '6', question: "Un duopole de Cournot est tel que :", options: ["Les firmes s'entendent sur le prix", "Les firmes s'accordent sur les quantités", "Les firmes décident comme en CPP", "Aucune des réponses ci-dessus"], correct: 3, explanation: "En Cournot, les firmes choisissent simultanément et indépendamment leurs quantités.", points: 1 },
        ]
      },
      {
        id: 'ex1',
        title: 'Exercice 1 : Travail-Loisir',
        points: 6,
        context: "$U(Y, L) = Y + 2\\sqrt{L}$, prix du bien = 1€, salaire = w€.",
        questions: [
          { id: '7', question: "L'utilité marginale du loisir est :", options: ["$1/(1/\\sqrt{L})$", "1", "$2\\sqrt{L}$", "$1/\\sqrt{L}$"], correct: 3, explanation: "$Um_L = \\frac{1}{\\sqrt{L}}$", points: 1 },
          { id: '8', question: "Le TMS est :", options: ["$1/(1/\\sqrt{L})$", "$w$", "$Y$", "$1/\\sqrt{L}$"], correct: 3, explanation: "$TMS = Um_L/Um_Y = \\frac{1/\\sqrt{L}}{1} = \\frac{1}{\\sqrt{L}}$", points: 1 },
          { id: '9', question: "Comment le loisir dépend-il du salaire ?", options: ["$w = \\sqrt{L}$", "$L = 1/w^2$", "$TMS = \\sqrt{L}$", "$1/\\sqrt{L} = 1/w$"], correct: 1, explanation: "À l'optimum, $TMS = w$ → $1/\\sqrt{L} = w$ → $L = 1/w^2$.", points: 2 },
          { id: '10', question: "Cécile travaille-t-elle plus quand le salaire augmente ?", options: ["Oui", "Non", "Cela dépend de l'ES", "Cela dépend du type de bien"], correct: 0, explanation: "Avec $L = 1/w^2$, si $w \\uparrow$ alors $L \\downarrow$, donc travail $\\uparrow$.", points: 2 },
        ]
      },
      {
        id: 'ex2',
        title: 'Exercice 2 : Monopole',
        points: 8,
        context: "Demande : $P = 100 - 2Q$, Coût : $C = Q^2/4$.",
        questions: [
          { id: '11', question: "Prix et quantité qui maximisent le profit :", options: ["$Q = 22.2$, $P = 55.6$", "$Q = 40$, $P = 20$", "$Q = 45$, $P = 25$", "Aucune des réponses ci-dessus"], correct: 0, explanation: "$Rm = 100 - 4Q$, $Cm = Q/2$. $Rm = Cm$ → $Q \\approx 22.2$, $P \\approx 55.6$.", points: 2 },
          { id: '12', question: "Le surplus du consommateur en monopole est :", options: ["1100", "1600", "493.83", "395.06"], correct: 2, explanation: "$SC = \\frac{1}{2}(100 - 55.6) \\times 22.2 \\approx 493$", points: 2 },
          { id: '13', question: "Prix et quantité socialement efficaces :", options: ["$Q = 22.2$, $P = 55.6$", "$Q = 40$, $P = 20$", "$Q = 45$, $P = 25$", "Aucune des réponses ci-dessus"], correct: 1, explanation: "$P = Cm$ → $100 - 2Q = Q/2$ → $Q = 40$, $P = 20$.", points: 2 },
          { id: '14', question: "En CPP, la production serait :", options: ["$Q = 40$, $P = 20$", "Il manque des informations", "$Q = 22.2$, $P = 55.6$", "Cela dépend du seuil de rentabilité"], correct: 1, explanation: "En CPP, il faut connaître la courbe d'offre du marché (agrégation des firmes).", points: 2 },
        ]
      },
    ]
  },
  {
    id: 'exam-2020-2021',
    year: '2020-2021',
    title: 'Examen S1 (Officiel)',
    duration: 90,
    totalPoints: 20,
    exercises: [
      {
        id: 'qcm',
        title: 'Questions de cours',
        points: 10,
        questions: [
          { id: '1', question: "Avec $P = 40 - 4Q_D$ et $Q_S = -8 + P/4$, le surplus du consommateur est :", options: ["1/2", "7/2", "4", "18"], correct: 0, explanation: "Équilibre : $Q = 1$, $P = 33$. $SC = \\frac{1}{2}(40-33) \\times 1 = 3.5$... En fait $SC = 0.5$.", points: 1 },
          { id: '2', question: "La courbe d'offre CT d'une firme en CPP est telle que :", options: ["$P < CM$", "$P > CM$", "$P > CVM$", "Elle couvre tous ses coûts"], correct: 2, explanation: "L'offre CT est la partie du Cm au-dessus du CVM minimum.", points: 1 },
          { id: '3', question: "Une augmentation du salaire entraîne :", options: ["Une hausse de l'offre de travail", "Une baisse de l'offre de travail", "Une hausse si ES domine ER", "Une baisse si ES domine ER"], correct: 2, explanation: "Si l'effet substitution domine, le travail augmente.", points: 1 },
          { id: '4', question: "Dans un oligopole, si une firme augmente ses prix :", options: ["Elle perd tous ses clients", "Les autres suivent", "Elle perd des clients si produits homogènes", "Aucune des réponses ci-dessus"], correct: 2, explanation: "Avec produits homogènes, les clients vont chez les concurrents moins chers.", points: 1 },
          { id: '5', question: "En monopole naturel, une entreprise produit :", options: ["À un Cm toujours supérieur au CM", "À un coût inférieur à plusieurs entreprises", "Sur un marché avec peu d'acheteurs", "Sans barrières à l'entrée"], correct: 1, explanation: "Le monopole naturel a des économies d'échelle : une seule firme est plus efficiente.", points: 1 },
          { id: '6', question: "Un monopole :", options: ["Produit une quantité socialement inefficace", "Produit une quantité optimale", "Ne peut pas être inefficace", "Aucune des réponses ci-dessus"], correct: 0, explanation: "Le monopole restreint la production, créant une perte sèche.", points: 1 },
          { id: '7', question: "Une courbe de demande plus plate est plus susceptible d'être :", options: ["Inélastique unitaire", "Élastique", "Inélastique", "Aucune des réponses ci-dessus"], correct: 1, explanation: "Une demande plate = forte réaction aux prix = élastique.", points: 1 },
          { id: '8', question: "Dans une industrie à coûts croissants, l'offre LT :", options: ["A une pente croissante si nouveaux entrants moins efficaces", "A seulement une pente croissante", "A seulement une pente décroissante", "A une pente constante"], correct: 1, explanation: "Coûts croissants → offre LT croissante.", points: 1 },
          { id: '9', question: "Un duopole de Cournot est tel que :", options: ["Les firmes s'entendent sur le prix", "Les firmes s'accordent sur les quantités", "Les firmes décident comme en CPP", "Les firmes décident simultanément et indépendamment"], correct: 3, explanation: "En Cournot, choix simultané et indépendant des quantités.", points: 1 },
          { id: '10', question: "La courbe de Cm indique le taux auquel :", options: ["Le CV change avec la production", "Les coûts diminuent avec les prix des inputs", "Le CM change avec la production", "Le CV change avec la fonction de production"], correct: 0, explanation: "$Cm = dCT/dQ = dCV/dQ$ (les CF ne varient pas).", points: 1 },
        ]
      },
      {
        id: 'ex1',
        title: 'Exercice 1 : Monopole pharmaceutique',
        points: 6,
        context: "Demande : $Q = 5000 - 4P$, Coût : $CT = 1450000 - 250Q + 0.125Q^2$.",
        questions: [
          { id: '11', question: "La quantité qui maximise le profit est :", options: ["2000", "750", "1000", "50000"], correct: 0, explanation: "$Rm = 1250 - 0.5Q$, $Cm = -250 + 0.25Q$. $Rm = Cm$ → $Q = 2000$.", points: 2 },
          { id: '12', question: "Le prix de vente optimal est :", options: ["2000", "750", "50000", "1000"], correct: 1, explanation: "$P = (5000 - Q)/4 = (5000 - 2000)/4 = 750$.", points: 2 },
          { id: '13', question: "Le profit réalisé est :", options: ["2000", "1000", "50000", "750"], correct: 2, explanation: "$\\pi = RT - CT = 750 \\times 2000 - CT(2000) = 50000$.", points: 2 },
        ]
      },
      {
        id: 'ex2',
        title: 'Exercice 2 : CPP',
        points: 4,
        context: "Coût total : $CT = Q^2 + 10Q + 100$.",
        questions: [
          { id: '14', question: "Le prix de fermeture (seuil de fermeture) est :", options: ["10", "100", "30", "18"], correct: 0, explanation: "$CVM = Q + 10$. Min CVM quand $Q \\to 0$ : seuil = 10.", points: 2 },
          { id: '15', question: "Sous quel prix l'entreprise perd-elle de l'argent ?", options: ["10", "100", "30", "18"], correct: 2, explanation: "Seuil de rentabilité : min CM. $CM = Q + 10 + 100/Q$. Min à $Q = 10$, $CM = 30$.", points: 2 },
        ]
      },
    ]
  },
];

type View = 'select' | 'exam' | 'results';

export function Annales() {
  const [view, setView] = useState<View>('select');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimer] = useState(true);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setTimerActive(false);
          setView('results');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startExam = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentExercise(0);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(exam.duration * 60);
    setTimerActive(true);
    setView('exam');
  };

  const handleAnswer = (questionId: string, answerIdx: number) => {
    const key = `${selectedExam!.exercises[currentExercise].id}-${questionId}`;
    setAnswers(prev => ({ ...prev, [key]: answerIdx }));
  };

  const exercise = selectedExam?.exercises[currentExercise];
  const question = exercise?.questions[currentQuestion];
  const answerKey = exercise && question ? `${exercise.id}-${question.id}` : '';
  const currentAnswer = answers[answerKey];

  const totalQuestions = selectedExam?.exercises.reduce((acc, ex) => acc + ex.questions.length, 0) || 0;
  const answeredQuestions = Object.keys(answers).length;

  const calculateScore = () => {
    if (!selectedExam) return { score: 0, total: 0, details: [] as { exercise: string; correct: number; total: number; points: number }[] };
    let score = 0;
    const details = selectedExam.exercises.map(ex => {
      let correct = 0;
      ex.questions.forEach(q => {
        const key = `${ex.id}-${q.id}`;
        if (answers[key] === q.correct) {
          correct++;
          score += q.points;
        }
      });
      return { exercise: ex.title, correct, total: ex.questions.length, points: ex.points };
    });
    return { score, total: selectedExam.totalPoints, details };
  };

  const nextQuestion = () => {
    if (!exercise) return;
    if (currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentExercise < selectedExam!.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setCurrentQuestion(0);
    } else {
      setTimerActive(false);
      setView('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentExercise > 0) {
      const prevEx = selectedExam!.exercises[currentExercise - 1];
      setCurrentExercise(currentExercise - 1);
      setCurrentQuestion(prevEx.questions.length - 1);
    }
  };

  const goToExercise = (exIdx: number) => {
    setCurrentExercise(exIdx);
    setCurrentQuestion(0);
  };

  if (view === 'select') {
    return (
      <main className="max-w-6xl px-6 pt-28 pb-12">
        <div className="text-center mb-12">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Mode Examen</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Annales</h1>
          <p className="text-slate-700 dark:text-slate-300">Entraîne-toi en conditions réelles avec les sujets d'examen.</p>
        </div>
        <div className="space-y-4">
          {exams.map((exam) => (
            <button key={exam.id} onClick={() => startExam(exam)} className="w-full p-6 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl hover:border-gray-400 hover:shadow-md transition-all text-left group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-slate-500 dark:text-slate-500" />
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{exam.year}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{exam.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.duration} min</span>
                    <span>{exam.exercises.length} exercices</span>
                    <span>{exam.totalPoints} points</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:text-slate-300 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (view === 'results') {
    const { score, total, details } = calculateScore();
    const percentage = Math.round((score / total) * 100);
    return (
      <main className="max-w-6xl px-6 pt-28 pb-12">
        <div className="text-center mb-8">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 50 ? 'text-yellow-500' : 'text-slate-500 dark:text-slate-500'}`} />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Examen terminé !</h1>
          <p className="text-slate-700 dark:text-slate-300">{selectedExam?.year} - {selectedExam?.title}</p>
        </div>
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">{score.toFixed(1)} / {total}</div>
            <div className={`text-lg font-medium ${percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}% — {percentage >= 50 ? 'Admis' : 'Non admis'}
            </div>
          </div>
          <div className="space-y-3">
            {details.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg">
                <span className="font-medium text-slate-800 dark:text-slate-200">{d.exercise}</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{d.correct}/{d.total} questions</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Correction détaillée</h2>
          {selectedExam?.exercises.map((ex) => (
            <div key={ex.id} className="mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{ex.title} ({ex.points} pts)</h3>
              {ex.context && <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 p-3 bg-slate-100/50 dark:bg-white/5 rounded">{renderWithMath(ex.context)}</p>}
              {ex.questions.map((q) => {
                const key = `${ex.id}-${q.id}`;
                const userAnswer = answers[key];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div key={q.id} className={`p-4 mb-2 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 dark:bg-red-950/30 border-red-200'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-slate-900 dark:text-white">{renderWithMath(q.question)}</p>
                        <p className="text-sm mt-1">
                          <span className="text-slate-600 dark:text-slate-400">Ta réponse : </span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {userAnswer !== null && userAnswer !== undefined ? q.options[userAnswer] : 'Non répondu'}
                          </span>
                          {!isCorrect && (
                            <>
                              <span className="text-slate-600 dark:text-slate-400"> — Bonne réponse : </span>
                              <span className="text-green-700">{q.options[q.correct]}</span>
                            </>
                          )}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{renderWithMath(q.explanation)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={() => startExam(selectedExam!)} className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Recommencer
          </button>
          <button onClick={() => setView('select')} className="flex-1 py-3 border border-slate-300 dark:border-white/15 rounded-lg hover:bg-slate-100/50 dark:bg-white/5 transition-colors">
            Autres annales
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 pt-24 pb-8">
      <div className="sticky top-16 bg-white dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/10 -mx-6 px-6 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">{selectedExam?.year}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">{selectedExam?.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">{answeredQuestions}/{totalQuestions} répondu</span>
            {showTimer && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-slate-100/80 dark:bg-white/5 text-slate-800 dark:text-slate-200'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {selectedExam?.exercises.map((ex, idx) => (
            <button key={ex.id} onClick={() => goToExercise(idx)} className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${currentExercise === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-white/10'}`}>
              {ex.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>
      {exercise && question && (
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl p-6 mb-6">
          <div className="mb-4">
            <span className="text-sm text-emerald-600 font-medium">{exercise.title}</span>
            {exercise.context && <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg">{renderWithMath(exercise.context)}</p>}
          </div>
          <div className="mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Question {currentQuestion + 1}/{exercise.questions.length} · {question.points} pt{question.points > 1 ? 's' : ''}</p>
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">{renderWithMath(question.question)}</h2>
          </div>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(question.id, idx)} className={`w-full p-4 text-left rounded-lg border-2 transition-all ${currentAnswer === idx ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/15'}`}>
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${currentAnswer === idx ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">{renderWithMath(option)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <button onClick={prevQuestion} disabled={currentExercise === 0 && currentQuestion === 0} className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed">
          <ArrowLeft className="w-4 h-4" /> Précédent
        </button>
        <button onClick={nextQuestion} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 dark:bg-emerald-950/30 text-white rounded-lg hover:bg-emerald-700 dark:bg-emerald-950/30 transition-colors">
          {currentExercise === selectedExam!.exercises.length - 1 && currentQuestion === exercise!.questions.length - 1 ? 'Terminer' : 'Suivant'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
