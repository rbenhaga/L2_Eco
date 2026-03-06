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
  duration: number; // en minutes
  totalPoints: number;
  exercises: Exercise[];
}

const exams: Exam[] = [
  {
    id: '2024-2025',
    year: '2024-2025',
    title: 'Examen Session 1',
    duration: 120,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'QCM Théorique',
        points: 3,
        questions: [
          { id: '1', question: "Une variable aléatoire est :", options: ["Une fonction", "Une application", "Une valeur numérique", "Autre"], correct: 1, explanation: "Une VA est une application de Ω vers ℝ.", points: 0.5 },
          { id: '2', question: "Soit $f(x) = \\frac{3}{x^4}$ pour $x > 1$. La densité linéaire moyenne sur [2,4] vaut (à $10^{-2}$) :", options: ["0.22", "0.11", "0.05", "Autre"], correct: 2, explanation: "DLM = $\\frac{1}{b-a}\\int_a^b f(x)dx = \\frac{1}{2}[F(4)-F(2)] \\approx 0.05$", points: 0.5 },
          { id: '3', question: "$\\int_0^1 x^2(1-x)^3 dx = $ (à $10^{-3}$) :", options: ["0.007", "0.1", "0.029", "Autre"], correct: 0, explanation: "C'est $B(3,4) = \\frac{\\Gamma(3)\\Gamma(4)}{\\Gamma(7)} = \\frac{2! \\cdot 3!}{6!} = \\frac{12}{720} \\approx 0.017$", points: 0.5 },
          { id: '4', question: "La somme de 2 lois de Bernoulli indépendantes de même paramètre p est une loi Binomiale :", options: ["Oui", "Non"], correct: 0, explanation: "$B(1,p) + B(1,p) = B(2,p)$ si indépendantes et même p.", points: 0.5 },
          { id: '5', question: "Si on connaît les densités de 2 VA continues X et Y, on peut déterminer celle de X+Y :", options: ["Oui", "Non"], correct: 1, explanation: "Non, il faut aussi connaître la loi conjointe (sauf si indépendantes).", points: 0.5 },
          { id: '6', question: "Si deux VA ont la même espérance, alors elles ont la même variance :", options: ["Oui", "Non"], correct: 1, explanation: "Faux. Exemple : X uniforme sur [0,2] et Y constante = 1 ont E=1 mais V différentes.", points: 0.5 },
        ]
      },
      {
        id: 'ex2',
        title: 'Algèbre de Boole',
        points: 2,
        context: "Soit Ω = {a, b, c, d, e}. Construire la plus petite algèbre de Boole F contenant (a), (c,d), (a,b,c) et (c).",
        questions: [
          { id: '1', question: "Le cardinal de F est :", options: ["16", "32", "8", "Autre"], correct: 1, explanation: "F = 2^5 = 32 éléments car on génère toute l'algèbre des parties.", points: 2 },
        ]
      },
      {
        id: 'ex3',
        title: 'Probabilités Conditionnelles',
        points: 2,
        context: "Enquête urbanisme : Arr.1 (15%, 12% fav), Arr.2 (32%, 31% fav), Arr.3 (23%, 72% fav), Arr.4 (30%, 55% fav).",
        questions: [
          { id: '1', question: "P(Arr.3 | Favorable) = (à $10^{-2}$) :", options: ["0.17", "0.37", "0.72", "Autre"], correct: 1, explanation: "Par Bayes : $P(A_3|F) = \\frac{0.23 \\times 0.72}{\\sum P(A_i)P(F|A_i)} \\approx 0.37$", points: 2 },
        ]
      },
      {
        id: 'ex4',
        title: 'VA Discrète 2D - Billetterie',
        points: 6,
        context: "4 caisses, 2 clients. X = nb clients caisse 1, Y = nb clients caisse 2.",
        questions: [
          { id: '1', question: "Le mode de X est :", options: ["2", "0", "1", "Autre"], correct: 1, explanation: "X suit B(2, 1/4). P(X=0) = 9/16 est max, donc mode = 0.", points: 0.5 },
          { id: '2', question: "$E[X] = $", options: ["0.5", "0.25", "0.75", "Autre"], correct: 0, explanation: "$E[X] = np = 2 \\times 1/4 = 0.5$", points: 0.5 },
          { id: '3', question: "$V[X] = $", options: ["0.5", "0.25", "0.375", "Autre"], correct: 2, explanation: "$V[X] = npq = 2 \\times 1/4 \\times 3/4 = 0.375$", points: 0.5 },
          { id: '4', question: "$V[Y] = $", options: ["0.375", "0.5625", "0.625", "Autre"], correct: 0, explanation: "Y suit aussi B(2, 1/4), donc V[Y] = 0.375.", points: 0.5 },
          { id: '5', question: "$F(1.2) = P(X \\leq 1, Y \\leq 1) = $", options: ["0.5", "0.875", "0.9375", "Autre"], correct: 2, explanation: "Calcul via le tableau de contingence.", points: 1 },
          { id: '6', question: "$E[X|Y=1] = $ (à $10^{-3}$)", options: ["0.063", "0.333", "0.375", "Autre"], correct: 2, explanation: "Espérance conditionnelle via la loi conditionnelle.", points: 1 },
          { id: '7', question: "Coefficient de corrélation $\\rho_{XY}$ (à $10^{-3}$) :", options: ["-0.333", "0.889", "0.333", "Autre"], correct: 0, explanation: "$\\rho = Cov(X,Y)/(\\sigma_X \\sigma_Y) \\approx -0.333$", points: 1 },
          { id: '8', question: "Borne sup de $P(Y \\geq 1)$ par Markov :", options: ["0.5", "0.4", "0.6", "Autre"], correct: 0, explanation: "Markov : $P(Y \\geq 1) \\leq E[Y]/1 = 0.5$", points: 1 },
        ]
      },
      {
        id: 'ex5',
        title: 'VA Continue 2D',
        points: 6,
        context: "$f(x,y) = k(x+y)$ sur D : $y < x < y+1$, $0 < y < 1$.",
        questions: [
          { id: '1', question: "k = ", options: ["1/3", "1", "3/4", "Autre"], correct: 2, explanation: "$\\iint_D k(x+y) dxdy = 1 \\Rightarrow k = 3/4$", points: 1 },
          { id: '2', question: "$f_X(x)$ pour $0 < x < 1$ :", options: ["$k(x^2+x/3)$", "$k(x-x^2/3)$", "$k(2x)$", "Autre"], correct: 2, explanation: "Intégrer f(x,y) sur y de 0 à x.", points: 1 },
          { id: '3', question: "$E[X] = $", options: ["k·61/12", "k·50/12", "k·35/12", "Autre"], correct: 0, explanation: "Calcul de l'intégrale $\\int x f_X(x) dx$.", points: 1 },
          { id: '4', question: "$f_{X|Y=1/2}(x) = $", options: ["$(4x+1)/5$", "$(4x+1)/7$", "$(4x+1)/3$", "Autre"], correct: 2, explanation: "$f_{X|Y}(x|y) = f(x,y)/f_Y(y)$", points: 1 },
          { id: '5', question: "$E[X|Y=1/2] = $ (à $10^{-3}$)", options: ["0.367", "0.033", "1.067", "Autre"], correct: 2, explanation: "Intégrale de $x \\cdot f_{X|Y=1/2}(x)$.", points: 1 },
          { id: '6', question: "$E[Y] = $", options: ["5k/6", "5k/7", "5k/9", "Autre"], correct: 0, explanation: "Calcul via la marginale de Y.", points: 1 },
        ]
      },
      {
        id: 'ex6',
        title: 'Démonstrations',
        points: 3,
        context: "Démontrer les formules suivantes (questions de compréhension).",
        questions: [
          { id: '1', question: "Pour démontrer la variance d'une loi à partir de $\\varphi(t)$, on utilise :", options: ["$V(X) = \\varphi''(0) - [\\varphi'(0)]^2$", "$V(X) = -\\varphi''(0) - [i\\varphi'(0)]^2$", "$V(X) = \\varphi(1) - \\varphi(0)$", "Autre"], correct: 1, explanation: "$\\varphi'(0) = iE[X]$ et $\\varphi''(0) = -E[X^2]$, donc $V(X) = E[X^2] - (E[X])^2 = -\\varphi''(0) - [i\\varphi'(0)]^2$", points: 1.5 },
          { id: '2', question: "Si $\\mu_{[k]} = 3^k$ pour tout k, alors X suit une loi :", options: ["Poisson(3)", "Binomiale(3, 1/2)", "Géométrique(1/3)", "Autre"], correct: 0, explanation: "Pour Poisson($\\lambda$), $\\mu_{[k]} = \\lambda^k$. Donc $\\lambda = 3$.", points: 1.5 },
        ]
      },
    ]
  },
  {
    id: '2023-2024',
    year: '2023-2024',
    title: 'Examen Session 1',
    duration: 120,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'Algèbre de Boole',
        points: 2,
        context: "Soit Ω = {a,b,c,d,e,f}. Construire la plus petite algèbre de Boole contenant (a), (a,c), (b,d,e) et (f).",
        questions: [
          { id: '1', question: "Le cardinal de F est :", options: ["14", "16", "12", "Autre"], correct: 1, explanation: "En construisant pas à pas avec complémentaires et unions, on obtient 16 éléments.", points: 2 },
        ]
      },
      {
        id: 'ex2',
        title: 'VA Continue',
        points: 3,
        context: "$f(x) = k e^{-(x-2)^2/2}$ pour $x > 2$, 0 ailleurs.",
        questions: [
          { id: '1', question: "k = ", options: ["1/384", "1/16", "$\\sqrt{2/\\pi}$", "Autre"], correct: 2, explanation: "Intégrale de Gauss tronquée : $k = \\sqrt{2/\\pi}$", points: 1 },
          { id: '2', question: "$E[X] = $", options: ["10", "60", "2.5", "Autre"], correct: 2, explanation: "Par changement de variable et propriétés de la gaussienne.", points: 1 },
          { id: '3', question: "$V[X] = $", options: ["116", "16", "106", "Autre"], correct: 1, explanation: "Variance de la demi-normale.", points: 1 },
        ]
      },
      {
        id: 'ex3',
        title: 'Covariance et Variance',
        points: 3,
        context: "E[X]=1, V[X]=2, E[Y]=2, V[Y]=3, E[Z]=1, V[Z]=5, Cov(X,Z)=1, Cov(X,Y)=1, Cov(Y,Z)=0.",
        questions: [
          { id: '1', question: "$E[2X+3Y-4Z] = $", options: ["0", "2", "12", "4"], correct: 3, explanation: "$E[2X+3Y-4Z] = 2(1)+3(2)-4(1) = 2+6-4 = 4$", points: 1 },
          { id: '2', question: "$V[2X+3Y-4Z] = $", options: ["3", "111", "39", "Autre"], correct: 1, explanation: "$V = 4(2)+9(3)+16(5)+2[2·3·1+2·(-4)·1+3·(-4)·0] = 8+27+80+12-16 = 111$", points: 1 },
          { id: '3', question: "$Cov(4X+5Y, Y) = $", options: ["19", "4", "7", "Autre"], correct: 0, explanation: "$Cov(4X+5Y,Y) = 4Cov(X,Y)+5V(Y) = 4(1)+5(3) = 19$", points: 1 },
        ]
      },
      {
        id: 'ex4',
        title: 'Loterie et Espérance',
        points: 5,
        context: "Roue : 2 bleus (gagne), 4 blancs (perd), 2 rouges (rejoue). Si rouge puis bleu = gagne, sinon perd.",
        questions: [
          { id: '1', question: "P(gagner) = ", options: ["0.0625", "0.25", "0.3125", "Autre"], correct: 2, explanation: "$P = 2/8 + 2/8 \\times 2/8 = 1/4 + 1/16 = 5/16 = 0.3125$", points: 1 },
          { id: '2', question: "Pour x secteurs (x≥6), 2 rouges, 4 blancs, reste bleus. Jeu équitable si x = ", options: ["8", "4", "10", "Autre"], correct: 2, explanation: "Résoudre E[G] = 0 pour trouver x = 10.", points: 1 },
          { id: '3', question: "Si x=10, E[G] = (à $10^{-2}$)", options: ["1.36", "0", "-1.36", "Autre"], correct: 0, explanation: "Calcul avec la loi de G.", points: 1 },
          { id: '4', question: "Si x=10, le mode de G est :", options: ["6", "-p", "g", "Autre"], correct: 0, explanation: "La valeur la plus probable.", points: 1 },
          { id: '5', question: "Si x=10, V[G] = (à $10^{-2}$)", options: ["19.60", "25.00", "15.00", "Autre"], correct: 0, explanation: "$V[G] = E[G^2] - (E[G])^2$", points: 1 },
        ]
      },
      {
        id: 'ex5',
        title: 'VA 2D Continue',
        points: 5,
        context: "$f(x,y) = kx e^{-y}$ sur D : $y \\leq x$, $x \\geq 0$, $y \\geq x-5$, $y \\geq 0$.",
        questions: [
          { id: '1', question: "k = ", options: ["3/25", "1/25", "2/35", "Autre"], correct: 2, explanation: "Normalisation : $\\iint_D kx e^{-y} dxdy = 1$", points: 1 },
          { id: '2', question: "$f_X(x)$ pour $0 \\leq x \\leq 5$ :", options: ["$kx(1-e^{-x})$", "$kxe^{-x-5}$", "$kx(1-e^{-x}+e^{-5})$", "Autre"], correct: 2, explanation: "Intégrer sur y selon le domaine.", points: 1 },
          { id: '3', question: "$f_{Y|X=6}(y)$ pour $1 \\leq y \\leq 6$ (à $10^{-2}$) :", options: ["0.37", "0.25", "0.50", "Autre"], correct: 0, explanation: "$f_{Y|X}(y|x) = f(x,y)/f_X(x)$", points: 1 },
          { id: '4', question: "$E[Y|X=6] = $ (à $10^{-3}$)", options: ["1.968", "2.500", "1.500", "Autre"], correct: 0, explanation: "Intégrale de $y \\cdot f_{Y|X=6}(y)$.", points: 1 },
          { id: '5', question: "$P(1 \\leq X \\leq 3, Y \\leq 1) = $ (à $10^{-2}$)", options: ["0.16k", "0.25k", "0.10k", "Autre"], correct: 0, explanation: "Intégrale double sur le sous-domaine.", points: 1 },
        ]
      },
      {
        id: 'ex6',
        title: 'Démonstrations',
        points: 3,
        context: "Démontrer les formules demandées.",
        questions: [
          { id: '1', question: "Pour $X \\sim \\mathcal{P}(\\lambda)$, $E[X]$ via $\\varphi(t)$ s'obtient par :", options: ["$\\varphi'(0)/i$", "$-i\\varphi'(0)$", "$\\varphi(1)$", "Autre"], correct: 1, explanation: "$\\varphi_X(t) = e^{\\lambda(e^{it}-1)}$, $\\varphi'(0) = i\\lambda$, donc $E[X] = -i \\cdot i\\lambda = \\lambda$", points: 1.5 },
          { id: '2', question: "Le mode de $B(n,p)$ vérifie $np - q \\leq x_{Mo} \\leq np + p$. Si np = 3.5 et p = 0.35, le mode est :", options: ["3", "4", "3 et 4", "Autre"], correct: 0, explanation: "$3.5 - 0.65 = 2.85 \\leq x_{Mo} \\leq 3.85$, donc mode = 3.", points: 1.5 },
        ]
      },
    ]
  },
  {
    id: '2022-2023',
    year: '2022-2023',
    title: 'Examen Session 1',
    duration: 120,
    totalPoints: 20,
    exercises: [
      {
        id: 'ex1',
        title: 'QCM Théorique',
        points: 3,
        questions: [
          { id: '1', question: "La fonction caractéristique généralise la fonction génératrice :", options: ["Oui", "Non"], correct: 0, explanation: "$\\varphi_X(t) = G_X(e^{it})$", points: 0.5 },
          { id: '2', question: "Si A et B indépendants, alors $\\bar{A}$ et $\\bar{B}$ sont indépendants :", options: ["Oui", "Non"], correct: 0, explanation: "L'indépendance se conserve par complémentation.", points: 0.5 },
          { id: '3', question: "La différence de 2 lois binomiales est une loi binomiale :", options: ["Oui", "Non"], correct: 1, explanation: "Non, la différence peut prendre des valeurs négatives.", points: 0.5 },
          { id: '4', question: "$E[3X+7Y]$ est une variable aléatoire :", options: ["Oui", "Non"], correct: 1, explanation: "Non, c'est un nombre réel (l'espérance est un nombre).", points: 0.5 },
          { id: '5', question: "A et B incompatibles si :", options: ["$P(A|B) = P(B)$", "$P(A \\cap B) = 0$", "$P(A \\cap B) = P(A)P(B)$", "Autre"], correct: 1, explanation: "Incompatibles = $A \\cap B = \\emptyset$, donc $P(A \\cap B) = 0$.", points: 0.5 },
          { id: '6', question: "Probabilités totales : $P(A \\cup B) = $", options: ["$P(A)+P(B)+P(A \\cap B)$", "$P(A)+P(B)$", "$P(A)+P(B)-P(A \\cap B)$", "Autre"], correct: 2, explanation: "Formule des probabilités totales.", points: 0.5 },
        ]
      },
      {
        id: 'ex2',
        title: 'Algèbre de Boole',
        points: 2,
        context: "Soit Ω = {a,b,c,d}. Construire la plus petite algèbre de Boole contenant (a), (c,d) et (a,b,c).",
        questions: [
          { id: '1', question: "Le cardinal de F est :", options: ["14", "16", "12", "Autre"], correct: 0, explanation: "Construction : 14 éléments.", points: 2 },
        ]
      },
      {
        id: 'ex3',
        title: 'VA Continue Exponentielle',
        points: 4,
        context: "$f(x) = k e^{-x/2}$ pour $x \\geq 1$, 0 ailleurs.",
        questions: [
          { id: '1', question: "k = ", options: ["$2e^{1/2}$", "$e^{1/2}$", "$e^{1/2}/2$", "Autre"], correct: 0, explanation: "$\\int_1^\\infty k e^{-x/2} dx = 1 \\Rightarrow k = 2e^{1/2}$", points: 0.5 },
          { id: '2', question: "$F(x)$ pour $x \\geq 1$ :", options: ["$1-e^{(-x+1)/2}$", "$e^{(-x+1)/2}$", "$1-e^{-x/2}$", "Autre"], correct: 0, explanation: "$F(x) = \\int_1^x f(t)dt = 1 - e^{(-x+1)/2}$", points: 0.5 },
          { id: '3', question: "$E[X] = $", options: ["12", "6", "3", "Autre"], correct: 2, explanation: "Calcul par intégration par parties.", points: 1 },
          { id: '4', question: "Moment centré d'ordre 3 :", options: ["79", "16", "63", "Autre"], correct: 1, explanation: "$\\mu_3 = E[(X-E[X])^3]$", points: 0.5 },
          { id: '5', question: "Médiane (à $10^{-2}$) :", options: ["1.39", "3.39", "2.39", "Autre"], correct: 1, explanation: "$F(x_{med}) = 0.5 \\Rightarrow x_{med} \\approx 3.39$", points: 0.5 },
          { id: '6', question: "$P(6 \\leq X < 9 | X > 5)$ (à $10^{-2}$) :", options: ["0.86", "0.47", "0.78", "Autre"], correct: 1, explanation: "Probabilité conditionnelle : $\\frac{F(9)-F(6)}{1-F(5)}$", points: 1 },
        ]
      },
      {
        id: 'ex4',
        title: 'Tableau de Contingence',
        points: 2,
        context: "Notes économétrie vs prévision (tableau 4×4 avec effectifs).",
        questions: [
          { id: '1', question: "P(éco ≥ 10) = ", options: ["0.93", "0.64", "0.34", "Autre"], correct: 1, explanation: "Somme des colonnes [10,15[ et [15,20[ / total.", points: 0.5 },
          { id: '2', question: "P(prévi < 15 | éco < 15) = ", options: ["0.74", "0.52", "0.64", "Autre"], correct: 2, explanation: "Probabilité conditionnelle sur le sous-tableau.", points: 0.5 },
          { id: '3', question: "P(moyenne dans une seule matière) = ", options: ["0.515", "0.065", "0.450", "Autre"], correct: 2, explanation: "P(éco≥10, prévi<10) + P(éco<10, prévi≥10).", points: 0.5 },
          { id: '4', question: "P(note ≥ 15 dans au moins une) = ", options: ["0.24", "0.28", "0.26", "Autre"], correct: 2, explanation: "Union des événements.", points: 0.5 },
        ]
      },
      {
        id: 'ex5',
        title: 'VA 2D Continue',
        points: 5,
        context: "$f(x,y) = k(x+y)$ sur D : $y \\geq 0$, $y \\leq x$, $x+y \\leq 2$.",
        questions: [
          { id: '1', question: "k = ", options: ["-2/3", "3/4", "1/3", "Autre"], correct: 1, explanation: "Normalisation sur le triangle.", points: 1 },
          { id: '2', question: "$f_Y(y)$ = ", options: ["$k(1-x^2)$", "$k(1+y^2)$", "$2k(1-y^2)$", "Autre"], correct: 2, explanation: "Intégrer f(x,y) sur x de y à 2-y.", points: 1 },
          { id: '3', question: "$E[X] = $", options: ["9/8", "1/2", "-1", "Autre"], correct: 0, explanation: "Calcul de l'intégrale.", points: 1 },
        ]
      },
      {
        id: 'ex6',
        title: 'Deux Dés - Min(X,Y)',
        points: 2,
        context: "X et Y : points des deux dés. Z = min(X,Y).",
        questions: [
          { id: '1', question: "$V[Z] = $", options: ["301/36", "4275/256", "2555/1296", "Autre"], correct: 2, explanation: "Calcul via la loi de Z.", points: 1 },
          { id: '2', question: "Médiane de Z :", options: ["[2,3[", "2", "3", "Autre"], correct: 0, explanation: "Intervalle médian.", points: 0.5 },
          { id: '3', question: "$Q_3$ de Z :", options: ["3", "4", "[3,4[", "Autre"], correct: 0, explanation: "Troisième quartile.", points: 0.5 },
        ]
      },
      {
        id: 'ex7',
        title: 'Démonstrations',
        points: 3,
        context: "Démontrer les formules demandées.",
        questions: [
          { id: '1', question: "Pour $X \\sim B(n,p)$, $E[X]$ via $\\varphi(t)$ utilise $\\varphi(t) = (pe^{it}+q)^n$. On obtient :", options: ["$E[X] = np$", "$E[X] = n/p$", "$E[X] = p^n$", "Autre"], correct: 0, explanation: "$\\varphi'(t) = nip(pe^{it}+q)^{n-1}e^{it}$, donc $\\varphi'(0) = inp$, et $E[X] = -i \\cdot inp = np$", points: 1.5 },
          { id: '2', question: "Le mode de $\\mathcal{P}(\\lambda)$ vérifie $\\lambda - 1 \\leq x_{Mo} \\leq \\lambda$. Si $\\lambda = 4$, le mode est :", options: ["3", "4", "3 et 4", "Autre"], correct: 2, explanation: "$4 - 1 = 3 \\leq x_{Mo} \\leq 4$. Comme $\\lambda$ est entier, il y a deux modes : 3 et 4.", points: 1.5 },
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
  const [showTimer, setShowTimer] = useState(true);

  // Timer
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

  // Vue sélection
  if (view === 'select') {
    return (
      <main className="max-w-6xl px-6 pt-28 pb-12">
        <div className="text-center mb-12">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Mode Examen</p>
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Annales</h1>
          <p className="text-[var(--color-text-secondary)]">Entraîne-toi en conditions réelles avec les sujets d'examen.</p>
        </div>

        <div className="space-y-4">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => startExam(exam)}
              className="w-full p-6 bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-xl hover:border-[var(--color-border-strong)] hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
                    <span className="text-2xl font-bold text-[var(--color-text-primary)]">{exam.year}</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{exam.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {exam.duration} min
                    </span>
                    <span>{exam.exercises.length} exercices</span>
                    <span>{exam.totalPoints} points</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </main>
    );
  }

  // Vue résultats
  if (view === 'results') {
    const { score, total, details } = calculateScore();
    const percentage = Math.round((score / total) * 100);
    
    return (
      <main className="max-w-6xl px-6 pt-28 pb-12">
        <div className="text-center mb-8">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 50 ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]'}`} />
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Examen terminé !</h1>
          <p className="text-[var(--color-text-secondary)]">{selectedExam?.year} - {selectedExam?.title}</p>
        </div>

        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-xl p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-[var(--color-text-primary)] mb-2">
              {score.toFixed(1)} / {total}
            </div>
            <div className={`text-lg font-medium ${percentage >= 50 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
              {percentage}% — {percentage >= 50 ? 'Admis' : 'Non admis'}
            </div>
          </div>

          <div className="space-y-3">
            {details.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[var(--color-bg-overlay)]/50 rounded-lg">
                <span className="font-medium text-[var(--color-text-primary)]">{d.exercise}</span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {d.correct}/{d.total} questions
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-xl p-6 mb-8">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-4">Correction détaillée</h2>
          {selectedExam?.exercises.map((ex) => (
            <div key={ex.id} className="mb-6">
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">{ex.title} ({ex.points} pts)</h3>
              {ex.context && <p className="text-sm text-[var(--color-text-secondary)] mb-3 p-3 bg-[var(--color-bg-overlay)]/50 rounded">{renderWithMath(ex.context)}</p>}
              {ex.questions.map((q) => {
                const key = `${ex.id}-${q.id}`;
                const userAnswer = answers[key];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div key={q.id} className={`p-4 mb-2 rounded-lg border ${isCorrect ? 'bg-[var(--color-success-subtle)] border-[var(--color-success)]' : 'bg-[var(--color-error-subtle)] border-[var(--color-error)]'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? <CheckCircle className="w-5 h-5 text-[var(--color-success)] mt-0.5" /> : <XCircle className="w-5 h-5 text-[var(--color-error)] mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-[var(--color-text-primary)]">{renderWithMath(q.question)}</p>
                        <p className="text-sm mt-1">
                          <span className="text-[var(--color-text-secondary)]">Ta réponse : </span>
                          <span className={isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                            {userAnswer !== null && userAnswer !== undefined ? q.options[userAnswer] : 'Non répondu'}
                          </span>
                          {!isCorrect && (
                            <>
                              <span className="text-[var(--color-text-secondary)]"> — Bonne réponse : </span>
                              <span className="text-[var(--color-success)]">{q.options[q.correct]}</span>
                            </>
                          )}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2">{renderWithMath(q.explanation)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={() => startExam(selectedExam!)} className="flex-1 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] rounded-lg hover:bg-[var(--color-text-primary)] transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Recommencer
          </button>
          <button onClick={() => setView('select')} className="flex-1 py-3 border border-[var(--color-border-strong)] rounded-lg hover:bg-[var(--color-bg-overlay)]/50 transition-colors">
            Autres annales
          </button>
        </div>
      </main>
    );
  }

  // Vue examen
  return (
    <main className="max-w-4xl mx-auto px-6 pt-24 pb-8">
      {/* Header avec timer */}
      <div className="sticky top-16 bg-[var(--color-bg-raised)] border-b border-[var(--color-border-default)] -mx-6 px-6 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[var(--color-text-primary)]">{selectedExam?.year}</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{answeredQuestions}/{totalQuestions} questions</p>
          </div>
          
          {showTimer && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft < 600 ? 'bg-[var(--color-error-subtle)] text-[var(--color-error)]' : 'bg-[var(--color-bg-overlay)]/80 text-[var(--color-text-primary)]'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
          
          <button onClick={() => setShowTimer(!showTimer)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            {showTimer ? 'Masquer' : 'Afficher'} timer
          </button>
        </div>

        {/* Navigation exercices */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {selectedExam?.exercises.map((ex, idx) => {
            const exAnswered = ex.questions.filter(q => answers[`${ex.id}-${q.id}`] !== undefined).length;
            const isComplete = exAnswered === ex.questions.length;
            return (
              <button
                key={ex.id}
                onClick={() => goToExercise(idx)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  idx === currentExercise
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]'
                    : isComplete
                    ? 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]'
                    : 'bg-[var(--color-bg-overlay)]/80 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                Ex.{idx + 1} ({exAnswered}/{ex.questions.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercice courant */}
      {exercise && question && (
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-default)] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Exercice {currentExercise + 1} : {exercise.title}
            </h2>
            <span className="text-sm text-[var(--color-text-secondary)]">{exercise.points} points</span>
          </div>

          {exercise.context && (
            <div className="p-4 bg-[var(--color-bg-overlay)]/50 rounded-lg mb-6 text-sm text-[var(--color-text-primary)]">
              {renderWithMath(exercise.context)}
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-[var(--color-bg-overlay)]/80 rounded text-sm font-medium text-[var(--color-text-secondary)]">
                Q{currentQuestion + 1}/{exercise.questions.length}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">({question.points} pt{question.points > 1 ? 's' : ''})</span>
            </div>
            
            <p className="text-lg text-[var(--color-text-primary)] mb-6">{renderWithMath(question.question)}</p>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = currentAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(question.id, idx)}
                    className={`w-full p-4 text-left rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-border-strong)] bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]'
                        : 'border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {renderWithMath(option)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentExercise === 0 && currentQuestion === 0}
          className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Précédent
        </button>

        <button
          onClick={() => { setTimerActive(false); setView('results'); }}
          className="px-4 py-2 text-[var(--color-error)] hover:text-[var(--color-error)] text-sm"
        >
          Terminer l'examen
        </button>

        <button
          onClick={nextQuestion}
          className="flex items-center gap-2 px-6 py-2 bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] rounded-lg hover:bg-[var(--color-text-primary)] transition-colors"
        >
          {currentExercise === selectedExam!.exercises.length - 1 && currentQuestion === exercise!.questions.length - 1
            ? 'Terminer'
            : 'Suivant'
          }
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
