/**
 * Statistics QCM Data
 * Extracted from QCM.tsx for use with unified QCMPlayer
 */

export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

export interface Chapter {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    gradient: string;
    questions: Question[];
}

export const chapters: Chapter[] = [
    {
        id: 'ch1',
        title: 'CH1 - Probabilités',
        subtitle: 'Algèbre de Boole, Bayes, Conditionnement',
        color: 'blue',
        gradient: 'from-blue-500 to-blue-600',
        questions: [
            { id: 1, question: "Une algèbre de Boole doit être stable par :", options: ["Union uniquement", "Intersection uniquement", "Complémentaire et union finie", "Complémentaire uniquement"], correct: 2, explanation: "Une algèbre de Boole est stable par complémentation et par union finie (donc aussi par intersection via De Morgan)." },
            { id: 2, question: "Si $P(A) = 0.3$ et $P(B) = 0.5$ avec A et B indépendants, $P(A \\cap B) = $", options: ["0.8", "0.15", "0.2", "0.35"], correct: 1, explanation: "Indépendance : $P(A \\cap B) = P(A) \\times P(B) = 0.3 \\times 0.5 = 0.15$" },
            { id: 3, question: "La formule de Bayes permet de :", options: ["Calculer $P(A \\cup B)$", "Inverser le conditionnement", "Calculer la variance", "Trouver le mode"], correct: 1, explanation: "Bayes permet de calculer $P(A_k|B)$ à partir de $P(B|A_k)$ : $P(A_k|B) = \\frac{P(A_k) \\cdot P(B|A_k)}{\\sum_i P(A_i) \\cdot P(B|A_i)}$" },
            { id: 4, question: "Si A et B sont incompatibles, alors :", options: ["$P(A \\cap B) = P(A) \\times P(B)$", "$P(A \\cap B) = 0$", "A et B sont indépendants", "$P(A \\cup B) = 0$"], correct: 1, explanation: "Incompatibles (ou disjoints) signifie $A \\cap B = \\emptyset$, donc $P(A \\cap B) = 0$." },
            { id: 5, question: "Pour une partition $(B_1, ..., B_n)$, la formule des probabilités totales donne $P(A) = $", options: ["$\\sum P(A|B_i)$", "$\\sum P(B_i|A)$", "$\\sum P(A|B_i) P(B_i)$", "$\\prod P(A|B_i)$"], correct: 2, explanation: "Formule des probabilités totales : $P(A) = \\sum_{i=1}^{n} P(A|B_i) \\cdot P(B_i)$" },
            { id: 6, question: "La probabilité conditionnelle $P(B|A)$ est définie par :", options: ["$P(A) \\cdot P(B)$", "$\\frac{P(A \\cap B)}{P(A)}$", "$\\frac{P(A \\cup B)}{P(B)}$", "$P(A) + P(B)$"], correct: 1, explanation: "$P(B|A) = \\frac{P(A \\cap B)}{P(A)}$ avec $P(A) \\neq 0$" },
            { id: 7, question: "Si $A \\subset B$, alors :", options: ["$P(A) \\geq P(B)$", "$P(A) \\leq P(B)$", "$P(A) = P(B)$", "Aucune relation"], correct: 1, explanation: "P est une fonction croissante : si $A \\subset B$ alors $P(A) \\leq P(B)$ (démonstration exigible)." },
            { id: 8, question: "$P(\\bar{A}) = $", options: ["$P(A)$", "$1 - P(A)$", "$1 + P(A)$", "$P(A)^2$"], correct: 1, explanation: "$P(\\bar{A}) = 1 - P(A)$ car $P(A) + P(\\bar{A}) = P(\\Omega) = 1$" },
            { id: 9, question: "Le théorème des probabilités totales s'écrit $P(A \\cup B) = $", options: ["$P(A) + P(B)$", "$P(A) \\cdot P(B)$", "$P(A) + P(B) - P(A \\cap B)$", "$P(A|B) \\cdot P(B)$"], correct: 2, explanation: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ (démonstration exigible)." },
            { id: 10, question: "L'identité de Morgan affirme que $\\overline{A \\cup B} = $", options: ["$\\bar{A} \\cup \\bar{B}$", "$\\bar{A} \\cap \\bar{B}$", "$A \\cap B$", "$\\overline{A \\cap B}$"], correct: 1, explanation: "Identité de Morgan : $\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$ et $\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}$" },
            { id: 11, question: "Deux événements A et B sont indépendants si et seulement si :", options: ["$P(A \\cap B) = 0$", "$P(A \\cap B) = P(A) \\cdot P(B)$", "$P(A \\cup B) = P(A) + P(B)$", "$P(A|B) = P(B|A)$"], correct: 1, explanation: "Indépendance : $P(A \\cap B) = P(A) \\cdot P(B)$, équivalent à $P(B|A) = P(B)$." },
            { id: 12, question: "$P(\\emptyset) = $", options: ["1", "0", "$P(\\Omega)$", "Indéfini"], correct: 1, explanation: "$P(\\emptyset) = 0$ car $\\Omega = \\Omega \\cup \\emptyset$ et $P(\\Omega) = P(\\Omega) + P(\\emptyset) = 1$." },
            { id: 13, question: "Un corps de Borel (σ-algèbre) est une algèbre de Boole qui est aussi stable par :", options: ["Intersection finie", "Union finie", "Union infinie dénombrable", "Complémentation double"], correct: 2, explanation: "Un corps de Borel (ou tribu) est stable par union infinie dénombrable, pas seulement finie." },
            { id: 14, question: "Si $P(A) = 0.4$, $P(B) = 0.5$ et $P(A \\cap B) = 0.2$, alors $P(A \\cup B) = $", options: ["0.9", "0.7", "0.5", "0.3"], correct: 1, explanation: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.5 - 0.2 = 0.7$" },
            { id: 15, question: "Dans un jeu de 52 cartes, $P(\\text{roi}|\\text{cœur}) = $", options: ["$\\frac{1}{52}$", "$\\frac{4}{52}$", "$\\frac{1}{13}$", "$\\frac{13}{52}$"], correct: 2, explanation: "$P(\\text{roi}|\\text{cœur}) = \\frac{P(\\text{roi} \\cap \\text{cœur})}{P(\\text{cœur})} = \\frac{1/52}{13/52} = \\frac{1}{13}$" },
        ]
    },
    {
        id: 'ch2',
        title: 'CH2 - VA Discrètes',
        subtitle: 'Espérance, variance, fonction génératrice',
        color: 'emerald',
        gradient: 'from-emerald-500 to-emerald-600',
        questions: [
            { id: 1, question: "Si $E(X) = 3$ et $V(X) = 4$, alors $E(X^2) = $", options: ["7", "9", "13", "12"], correct: 2, explanation: "$V(X) = E(X^2) - [E(X)]^2$, donc $E(X^2) = V(X) + [E(X)]^2 = 4 + 9 = 13$" },
            { id: 2, question: "Si $Y = 2X + 5$ avec $V(X) = 3$, alors $V(Y) = $", options: ["6", "11", "12", "17"], correct: 2, explanation: "$V(aX + b) = a^2 V(X) = 2^2 \\times 3 = 12$. La constante $b$ n'affecte pas la variance." },
            { id: 3, question: "$g_X(1) = $", options: ["0", "1", "$E(X)$", "$V(X)$"], correct: 1, explanation: "$g_X(1) = E(1^X) = E(1) = 1$ pour toute VA." },
            { id: 4, question: "$g'_X(1)$ donne :", options: ["$V(X)$", "$E(X)$", "$E(X^2)$", "Le mode"], correct: 1, explanation: "$g'_X(1) = E(X)$ (moment factoriel d'ordre 1 = espérance)." },
            { id: 5, question: "Le mode d'une VA discrète est :", options: ["La valeur moyenne", "La médiane", "La valeur la plus probable", "L'écart-type"], correct: 2, explanation: "Le mode est la valeur $x_k$ où $P(X = x_k)$ est maximum." },
            { id: 6, question: "La fonction de répartition $F(x) = P(X \\leq x)$ est :", options: ["Décroissante", "Croissante", "Constante", "Périodique"], correct: 1, explanation: "$F(x)$ est toujours croissante : si $x_1 \\leq x_2$ alors $F(x_1) \\leq F(x_2)$." },
            { id: 7, question: "$E(aX + b) = $", options: ["$aE(X)$", "$E(X) + b$", "$aE(X) + b$", "$a^2E(X) + b$"], correct: 2, explanation: "Linéarité de l'espérance : $E(aX + b) = aE(X) + b$." },
            { id: 8, question: "Pour une VA discrète, $\\sum_i P_i = $", options: ["0", "1", "$E(X)$", "$V(X)$"], correct: 1, explanation: "La somme de toutes les probabilités vaut toujours 1 (normalisation)." },
            { id: 9, question: "$P(a < X \\leq b) = $", options: ["$F(b) + F(a)$", "$F(b) - F(a)$", "$F(a) - F(b)$", "$F(b) \\cdot F(a)$"], correct: 1, explanation: "$P(a < X \\leq b) = F(b) - F(a)$ par définition de la fonction de répartition." },
            { id: 10, question: "Le moment non-centré d'ordre 2 est :", options: ["$E(X)$", "$E(X^2)$", "$V(X)$", "$E[(X-E(X))^2]$"], correct: 1, explanation: "$m_2 = E(X^2)$ est le moment non-centré d'ordre 2." },
            { id: 11, question: "Le moment centré d'ordre 2 est :", options: ["$E(X)$", "$E(X^2)$", "$V(X)$", "$E(X)^2$"], correct: 2, explanation: "$\\mu_2 = E[(X-E(X))^2] = V(X)$ est la variance." },
            { id: 12, question: "$E(X - E(X)) = $", options: ["$E(X)$", "0", "$V(X)$", "1"], correct: 1, explanation: "$E(X - E(X)) = E(X) - E(X) = 0$ (variable centrée)." },
            { id: 13, question: "Si X et Y sont indépendantes, $E(XY) = $", options: ["$E(X) + E(Y)$", "$E(X) \\cdot E(Y)$", "$E(X) - E(Y)$", "0"], correct: 1, explanation: "Pour des VA indépendantes : $E(XY) = E(X) \\cdot E(Y)$." },
            { id: 14, question: "La relation entre moments : $\\mu_2 = $", options: ["$m_2 + m_1^2$", "$m_2 - m_1^2$", "$m_2 \\cdot m_1$", "$m_1 - m_2$"], correct: 1, explanation: "$\\mu_2 = m_2 - m_1^2$, c'est-à-dire $V(X) = E(X^2) - [E(X)]^2$." },
            { id: 15, question: "Pour une VA de Bernoulli avec $P(X=1) = p$, $E(X) = $", options: ["$p$", "$1-p$", "$p(1-p)$", "$p^2$"], correct: 0, explanation: "$E(X) = 0 \\cdot (1-p) + 1 \\cdot p = p$." },
            { id: 16, question: "$g''_X(1)$ donne le moment factoriel :", options: ["$E(X)$", "$E(X(X-1))$", "$E(X^2)$", "$V(X)$"], correct: 1, explanation: "$g''_X(1) = M_{[2]} = E(X(X-1))$ (moment factoriel d'ordre 2)." },
            { id: 17, question: "Si $\\bar{X} = \\frac{1}{n}\\sum X_i$ avec $E(X_i) = m$, alors $E(\\bar{X}) = $", options: ["$nm$", "$m/n$", "$m$", "$m^n$"], correct: 2, explanation: "$E(\\bar{X}) = \\frac{1}{n} \\sum E(X_i) = \\frac{1}{n} \\cdot nm = m$." },
        ]
    },
    {
        id: 'ch3',
        title: 'CH3 - VA Continues',
        subtitle: 'Densité, répartition, Gamma, Beta',
        color: 'purple',
        gradient: 'from-purple-500 to-purple-600',
        questions: [
            { id: 1, question: "Pour une VA continue, $P(X = a) = $", options: ["$f(a)$", "$F(a)$", "0", "1"], correct: 2, explanation: "Pour une VA continue, la probabilité d'un point est toujours nulle : $P(X = a) = 0$." },
            { id: 2, question: "$\\Gamma(4) = $", options: ["4", "6", "24", "3"], correct: 1, explanation: "$\\Gamma(n) = (n-1)!$, donc $\\Gamma(4) = 3! = 6$." },
            { id: 3, question: "$\\Gamma(1/2) = $", options: ["$1/2$", "$\\sqrt{\\pi}$", "$\\pi$", "1"], correct: 1, explanation: "$\\Gamma(1/2) = \\sqrt{\\pi}$ (valeur remarquable à connaître)." },
            { id: 4, question: "Si $f(x) = 2x$ pour $x \\in [0,1]$, alors $F(0.5) = $", options: ["0.25", "0.5", "1", "0.125"], correct: 0, explanation: "$F(x) = \\int_0^x 2t \\, dt = x^2$, donc $F(0.5) = 0.25$." },
            { id: 5, question: "La médiane $x_m$ vérifie :", options: ["$f(x_m) = 0.5$", "$F(x_m) = 0.5$", "$E(X) = x_m$", "$F(x_m) = 1$"], correct: 1, explanation: "La médiane est définie par $F(x_m) = 0.5$ (partage la distribution en deux)." },
            { id: 6, question: "La densité de probabilité $f(x)$ est :", options: ["La primitive de $F(x)$", "La dérivée de $F(x)$", "Égale à $F(x)$", "L'inverse de $F(x)$"], correct: 1, explanation: "$f(x) = F'(x)$ : la densité est la dérivée de la fonction de répartition." },
            { id: 7, question: "$\\int_{-\\infty}^{+\\infty} f(x) dx = $", options: ["0", "1", "$E(X)$", "$V(X)$"], correct: 1, explanation: "Condition de normalisation : l'intégrale de la densité vaut 1." },
            { id: 8, question: "$P(a < X < b) = $", options: ["$f(b) - f(a)$", "$F(b) - F(a)$", "$\\int_a^b F(x) dx$", "$f(a) + f(b)$"], correct: 1, explanation: "$P(a < X < b) = \\int_a^b f(x) dx = F(b) - F(a)$." },
            { id: 9, question: "La propriété de récurrence de Gamma est :", options: ["$\\Gamma(a) = a \\cdot \\Gamma(a-1)$", "$\\Gamma(a) = (a-1) \\cdot \\Gamma(a-1)$", "$\\Gamma(a) = \\Gamma(a+1)$", "$\\Gamma(a) = a!$"], correct: 1, explanation: "$\\Gamma(a) = (a-1) \\cdot \\Gamma(a-1)$ (relation de récurrence fondamentale)." },
            { id: 10, question: "$\\Gamma(1) = $", options: ["0", "1", "$\\sqrt{\\pi}$", "Indéfini"], correct: 1, explanation: "$\\Gamma(1) = \\int_0^{\\infty} e^{-t} dt = 1$." },
            { id: 11, question: "La fonction Beta $B(p,q) = $", options: ["$\\frac{\\Gamma(p) + \\Gamma(q)}{\\Gamma(p+q)}$", "$\\frac{\\Gamma(p) \\cdot \\Gamma(q)}{\\Gamma(p+q)}$", "$\\Gamma(p) \\cdot \\Gamma(q)$", "$\\frac{\\Gamma(p+q)}{\\Gamma(p) \\cdot \\Gamma(q)}$"], correct: 1, explanation: "$B(p,q) = \\frac{\\Gamma(p) \\cdot \\Gamma(q)}{\\Gamma(p+q)}$." },
            { id: 12, question: "Si $f(x) = 2x$ sur $[0,1]$, alors $E(X) = $", options: ["$1/2$", "$2/3$", "$1/3$", "$1$"], correct: 1, explanation: "$E(X) = \\int_0^1 x \\cdot 2x \\, dx = \\int_0^1 2x^2 \\, dx = \\frac{2}{3}$." },
            { id: 13, question: "Le quartile $Q_1$ vérifie :", options: ["$F(Q_1) = 0.5$", "$F(Q_1) = 0.25$", "$F(Q_1) = 0.75$", "$f(Q_1) = 0.25$"], correct: 1, explanation: "$Q_1$ est le premier quartile : $F(Q_1) = 0.25$." },
            { id: 14, question: "$\\Gamma(5) = $", options: ["5", "24", "120", "4"], correct: 1, explanation: "$\\Gamma(5) = 4! = 24$." },
            { id: 15, question: "Pour une VA continue, $P(X \\leq a) = P(X < a)$ car :", options: ["$F$ est continue", "$P(X = a) = 0$", "$f(a) = 0$", "Les deux sont faux"], correct: 1, explanation: "Comme $P(X = a) = 0$ pour une VA continue, $P(X \\leq a) = P(X < a) + P(X = a) = P(X < a)$." },
            { id: 16, question: "L'écart absolu moyen par rapport à la médiane minimise :", options: ["$E[(X-a)^2]$", "$E[|X-a|]$", "$V(X)$", "$E(X)$"], correct: 1, explanation: "La médiane minimise $E[|X-a|]$, tandis que la moyenne minimise $E[(X-a)^2]$." },
            { id: 17, question: "$\\int_0^1 t^2(1-t)^4 dt = B(3,5) = $", options: ["$\\frac{1}{105}$", "$\\frac{1}{35}$", "$\\frac{2}{105}$", "$\\frac{1}{21}$"], correct: 0, explanation: "$B(3,5) = \\frac{\\Gamma(3)\\Gamma(5)}{\\Gamma(8)} = \\frac{2! \\cdot 4!}{7!} = \\frac{2 \\cdot 24}{5040} = \\frac{1}{105}$." },
        ]
    },
    {
        id: 'ch4',
        title: 'CH4 - Lois Usuelles',
        subtitle: 'Binomiale, Poisson, Hypergéométrique',
        color: 'amber',
        gradient: 'from-amber-500 to-amber-600',
        questions: [
            { id: 1, question: "Pour $X \\sim B(10, 0.3)$, $E(X) = $", options: ["3", "0.3", "10", "2.1"], correct: 0, explanation: "$E(X) = np = 10 \\times 0.3 = 3$." },
            { id: 2, question: "Pour $X \\sim \\mathcal{P}(5)$, $V(X) = $", options: ["25", "5", "$\\sqrt{5}$", "10"], correct: 1, explanation: "Pour Poisson, $E(X) = V(X) = \\lambda = 5$." },
            { id: 3, question: "La fonction génératrice de Poisson($\\lambda$) est :", options: ["$(pu + q)^n$", "$e^{\\lambda u}$", "$e^{\\lambda(u-1)}$", "$\\lambda^u$"], correct: 2, explanation: "$g_X(u) = e^{\\lambda(u-1)}$ pour une loi de Poisson." },
            { id: 4, question: "L'inégalité de Bienaymé-Tchebychev donne :", options: ["Une valeur exacte", "Une borne supérieure de $P(|X-\\mu| \\geq \\varepsilon)$", "Une borne inférieure de $P(|X-\\mu| \\geq \\varepsilon)$", "Le mode"], correct: 1, explanation: "$P(|X-\\mu| \\geq \\varepsilon) \\leq \\frac{\\sigma^2}{\\varepsilon^2}$ (borne supérieure)." },
            { id: 5, question: "L'hypergéométrique s'applique pour :", options: ["Tirage avec remise", "Tirage sans remise", "Événements rares", "VA continues"], correct: 1, explanation: "L'hypergéométrique modélise le tirage sans remise dans une population finie." },
            { id: 6, question: "Pour $X \\sim B(n, p)$, $V(X) = $", options: ["$np$", "$np(1-p)$", "$n(1-p)$", "$p(1-p)$"], correct: 1, explanation: "$V(X) = npq = np(1-p)$ pour une loi binomiale." },
            { id: 7, question: "La fonction génératrice de $B(n,p)$ est :", options: ["$e^{\\lambda(u-1)}$", "$(pu + q)^n$", "$(p + qu)^n$", "$np$"], correct: 1, explanation: "$g_X(u) = (pu + q)^n$ avec $q = 1-p$." },
            { id: 8, question: "Pour $X \\sim H(N, n, K)$, $E(X) = $", options: ["$nK$", "$\\frac{nK}{N}$", "$\\frac{NK}{n}$", "$n + K$"], correct: 1, explanation: "$E(X) = n \\cdot \\frac{K}{N}$ pour l'hypergéométrique." },
            { id: 9, question: "Si $X \\sim \\mathcal{P}(\\lambda)$, alors $P(X = k) = $", options: ["$C_n^k p^k q^{n-k}$", "$e^{-\\lambda} \\frac{\\lambda^k}{k!}$", "$\\frac{C_K^k C_{N-K}^{n-k}}{C_N^n}$", "$\\lambda^k e^{-k}$"], correct: 1, explanation: "$P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}$ pour Poisson." },
            { id: 10, question: "Le mode de $\\mathcal{P}(\\lambda)$ est :", options: ["$\\lambda + 1$", "$\\lfloor \\lambda \\rfloor$ (partie entière)", "$\\lambda^2$", "$e^{\\lambda}$"], correct: 1, explanation: "Le mode de Poisson est $\\lfloor \\lambda \\rfloor$ (ou $\\lambda$ et $\\lambda-1$ si $\\lambda$ entier)." },
            { id: 11, question: "Si on observe 3 événements/semaine en moyenne, sur 5 semaines $\\lambda = $", options: ["3", "8", "15", "0.6"], correct: 2, explanation: "Additivité de Poisson : $\\lambda' = 3 \\times 5 = 15$." },
            { id: 12, question: "Pour $X \\sim B(5, 0.4)$, $P(X = 2) = $", options: ["$C_5^2 \\cdot 0.4^2 \\cdot 0.6^3$", "$C_5^2 \\cdot 0.4^3 \\cdot 0.6^2$", "$0.4^2 \\cdot 0.6^3$", "$5 \\cdot 0.4^2$"], correct: 0, explanation: "$P(X = k) = C_n^k p^k (1-p)^{n-k} = C_5^2 \\cdot 0.4^2 \\cdot 0.6^3$." },
            { id: 13, question: "L'inégalité de Markov pour $X \\geq 0$ donne :", options: ["$P(X \\geq t) \\leq \\frac{E(X)}{t}$", "$P(X \\geq t) \\geq \\frac{E(X)}{t}$", "$P(X \\leq t) \\leq \\frac{E(X)}{t}$", "$P(X = t) = \\frac{E(X)}{t}$"], correct: 0, explanation: "Inégalité de Markov : $P(X \\geq t) \\leq \\frac{E(X)}{t}$ pour $X \\geq 0$ et $t > 0$." },
            { id: 14, question: "La fonction caractéristique de Poisson($\\lambda$) est :", options: ["$e^{\\lambda(u-1)}$", "$e^{\\lambda(e^{it}-1)}$", "$(pe^{it} + q)^n$", "$e^{it\\lambda}$"], correct: 1, explanation: "$\\varphi_X(t) = e^{\\lambda(e^{it}-1)}$ pour Poisson." },
            { id: 15, question: "Bienaymé-Tchebychev : $P(|X-\\mu| < \\varepsilon) \\geq $", options: ["$\\frac{\\sigma^2}{\\varepsilon^2}$", "$1 - \\frac{\\sigma^2}{\\varepsilon^2}$", "$1 - \\frac{\\varepsilon^2}{\\sigma^2}$", "$\\frac{\\varepsilon^2}{\\sigma^2}$"], correct: 1, explanation: "Forme minorant : $P(|X-\\mu| < \\varepsilon) \\geq 1 - \\frac{V(X)}{\\varepsilon^2}$." },
            { id: 16, question: "Le mode de $B(n,p)$ est approximativement :", options: ["$np$", "$\\lfloor (n+1)p \\rfloor$", "$n(1-p)$", "$\\sqrt{np}$"], correct: 1, explanation: "Le mode de la binomiale est $\\lfloor (n+1)p \\rfloor$ ou proche de $np$." },
            { id: 17, question: "Pour l'hypergéométrique, le facteur de correction est :", options: ["$\\frac{N-n}{N-1}$", "$\\frac{n}{N}$", "$\\frac{K}{N}$", "$\\frac{N}{n}$"], correct: 0, explanation: "Le facteur $\\frac{N-n}{N-1}$ corrige pour la population finie (tirage sans remise)." },
        ]
    },
    {
        id: 'ch5',
        title: 'CH5 - VA 2D',
        subtitle: 'Marginales, conditionnelles, covariance',
        color: 'rose',
        gradient: 'from-rose-500 to-rose-600',
        questions: [
            { id: 1, question: "La loi marginale de X s'obtient en :", options: ["Intégrant $f(x,y)$ sur $x$", "Intégrant $f(x,y)$ sur $y$", "Dérivant $F(x,y)$", "Multipliant par $y$"], correct: 1, explanation: "$f_X(x) = \\int f(x,y) \\, dy$ (on intègre sur l'autre variable)." },
            { id: 2, question: "$Cov(X,Y) = 0$ implique :", options: ["X et Y indépendantes", "Pas de liaison linéaire", "$r = 1$", "$E(XY) = 0$"], correct: 1, explanation: "$Cov = 0$ signifie pas de liaison linéaire, mais n'implique pas l'indépendance." },
            { id: 3, question: "$V(X + Y) = $", options: ["$V(X) + V(Y)$", "$V(X) + V(Y) + 2Cov(X,Y)$", "$V(X) + V(Y) - 2Cov(X,Y)$", "$V(X) \\times V(Y)$"], correct: 1, explanation: "$V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)$." },
            { id: 4, question: "Le coefficient de corrélation $r$ vérifie :", options: ["$r \\geq 0$", "$r \\leq 1$", "$-1 \\leq r \\leq 1$", "$r = Cov(X,Y)$"], correct: 2, explanation: "$r \\in [-1, 1]$ toujours." },
            { id: 5, question: "$f_{Y|X=x}(y) = $", options: ["$f(x,y) \\times f_X(x)$", "$\\frac{f(x,y)}{f_X(x)}$", "$\\frac{f(x,y)}{f_Y(y)}$", "$\\frac{f_X(x)}{f(x,y)}$"], correct: 1, explanation: "Loi conditionnelle : $f_{Y|X=x}(y) = \\frac{f(x,y)}{f_X(x)}$." },
            { id: 6, question: "$Cov(X,Y) = $", options: ["$E(X) \\cdot E(Y)$", "$E(XY) - E(X)E(Y)$", "$E(X+Y)$", "$E(XY)$"], correct: 1, explanation: "$Cov(X,Y) = E(XY) - E(X)E(Y)$." },
            { id: 7, question: "Si X et Y sont indépendantes, alors :", options: ["$Cov(X,Y) \\neq 0$", "$f(x,y) = f_X(x) \\cdot f_Y(y)$", "$r = 1$", "$E(XY) = 0$"], correct: 1, explanation: "Indépendance : $f(x,y) = f_X(x) \\cdot f_Y(y)$ (la densité conjointe se factorise)." },
            { id: 8, question: "$r(X,Y) = $", options: ["$\\frac{Cov(X,Y)}{V(X) \\cdot V(Y)}$", "$\\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y}$", "$Cov(X,Y) \\cdot \\sigma_X \\cdot \\sigma_Y$", "$\\frac{\\sigma_X}{\\sigma_Y}$"], correct: 1, explanation: "$r = \\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y}$ (corrélation normalisée)." },
            { id: 9, question: "$V(X - Y) = $", options: ["$V(X) - V(Y)$", "$V(X) + V(Y) + 2Cov(X,Y)$", "$V(X) + V(Y) - 2Cov(X,Y)$", "$V(X) \\cdot V(Y)$"], correct: 2, explanation: "$V(X-Y) = V(X) + V(Y) - 2Cov(X,Y)$ (attention au signe !)." },
            { id: 10, question: "Si X et Y indépendantes, $V(X+Y) = $", options: ["$V(X) - V(Y)$", "$V(X) + V(Y)$", "$V(X) \\cdot V(Y)$", "$2V(X)$"], correct: 1, explanation: "Si indépendantes, $Cov(X,Y) = 0$ donc $V(X+Y) = V(X) + V(Y)$." },
            { id: 11, question: "$E(Y|X=x)$ est :", options: ["Une constante", "Une fonction de $x$", "Égal à $E(Y)$", "Égal à $E(X)$"], correct: 1, explanation: "$E(Y|X=x)$ est une fonction de $x$ (courbe de régression)." },
            { id: 12, question: "Pour une densité conjointe, $\\iint_D f(x,y) \\, dx \\, dy = $", options: ["0", "1", "$E(XY)$", "$Cov(X,Y)$"], correct: 1, explanation: "Condition de normalisation : l'intégrale double vaut 1." },
            { id: 13, question: "$Cov(aX, bY) = $", options: ["$ab \\cdot Cov(X,Y)$", "$(a+b) \\cdot Cov(X,Y)$", "$a^2b^2 \\cdot Cov(X,Y)$", "$Cov(X,Y)$"], correct: 0, explanation: "$Cov(aX, bY) = ab \\cdot Cov(X,Y)$ (bilinéarité)." },
            { id: 14, question: "$|r| = 1$ signifie :", options: ["Indépendance", "Liaison linéaire parfaite", "Pas de liaison", "$Cov = 0$"], correct: 1, explanation: "$|r| = 1$ indique une liaison linéaire parfaite entre X et Y." },
            { id: 15, question: "Le Jacobien sert à :", options: ["Calculer $E(X)$", "Faire un changement de variable", "Trouver la médiane", "Calculer $V(X)$"], correct: 1, explanation: "Le Jacobien $|J|$ intervient dans le changement de variable : $f_{U,V}(u,v) = f_{X,Y}(x,y) \\cdot |J|$." },
            { id: 16, question: "$V(aX + bY) = $", options: ["$aV(X) + bV(Y)$", "$a^2V(X) + b^2V(Y)$", "$a^2V(X) + b^2V(Y) + 2ab \\cdot Cov(X,Y)$", "$(a+b)^2 V(X)$"], correct: 2, explanation: "$V(aX + bY) = a^2V(X) + b^2V(Y) + 2ab \\cdot Cov(X,Y)$." },
            { id: 17, question: "$Cov(X,X) = $", options: ["0", "1", "$V(X)$", "$E(X)$"], correct: 2, explanation: "$Cov(X,X) = E(X^2) - [E(X)]^2 = V(X)$." },
        ]
    },
    {
        id: 'annales',
        title: 'Annales',
        subtitle: 'Questions type partiel et examen',
        color: 'slate',
        gradient: 'from-slate-600 to-slate-700',
        questions: [
            { id: 1, question: "Soit $f(x,y) = kxy^2$ sur $D = \\{0 \\leq y \\leq x, x \\leq 3\\}$. Pour que $f$ soit une densité, $k = $", options: ["$\\frac{5}{81}$", "$\\frac{1}{81}$", "$\\frac{3}{81}$", "$\\frac{81}{5}$"], correct: 0, explanation: "On résout $\\iint_D kxy^2 \\, dy \\, dx = 1$. Après calcul : $k = \\frac{5}{81}$." },
            { id: 2, question: "Avec $f(x,y) = \\frac{5}{81}xy^2$ sur $D$, la loi marginale $f_X(x) = $", options: ["$\\frac{5x^4}{243}$", "$\\frac{5x^3}{81}$", "$\\frac{x^4}{81}$", "$\\frac{5x^2}{243}$"], correct: 0, explanation: "$f_X(x) = \\int_0^x \\frac{5}{81}xy^2 \\, dy = \\frac{5x}{81} \\cdot \\frac{x^3}{3} = \\frac{5x^4}{243}$." },
            { id: 3, question: "La loi conditionnelle $f_{Y|X=x}(y) = \\frac{3y^2}{x^3}$ pour $0 \\leq y \\leq x$. Alors $E(Y|X=x) = $", options: ["$\\frac{x}{2}$", "$\\frac{3x}{4}$", "$\\frac{2x}{3}$", "$x$"], correct: 1, explanation: "$E(Y|X=x) = \\int_0^x y \\cdot \\frac{3y^2}{x^3} \\, dy = \\frac{3}{x^3} \\cdot \\frac{x^4}{4} = \\frac{3x}{4}$." },
            { id: 4, question: "Si $g_X(u) = e^{-10(u-1)}$, alors X suit une loi :", options: ["Binomiale", "Poisson de paramètre 10", "Normale", "Exponentielle"], correct: 1, explanation: "$g_X(u) = e^{\\lambda(u-1)}$ avec $\\lambda = 10$ : c'est une loi de Poisson." },
            { id: 5, question: "Pour $X \\sim \\mathcal{P}(15)$, une borne inférieure de $P(9 \\leq X \\leq 21)$ par Bienaymé est :", options: ["$\\frac{5}{12}$", "$\\frac{7}{12}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"], correct: 1, explanation: "$\\varepsilon = 6$, $V(X) = 15$. Borne $= 1 - \\frac{15}{36} = 1 - \\frac{5}{12} = \\frac{7}{12}$." },
            { id: 6, question: "Urne : 20 boules dont 7 noires. Tirage de 5 sans remise. $E(X) = $", options: ["1.75", "2.5", "3.5", "1.4"], correct: 0, explanation: "$X \\sim H(20, 5, 7)$. $E(X) = 5 \\times \\frac{7}{20} = 1.75$." },
            { id: 7, question: "Si $\\alpha = 0.5$ dans la courbe de Phillips, le ratio de sacrifice vaut :", options: ["0.5", "1", "2", "4"], correct: 2, explanation: "Ratio de sacrifice $= \\frac{1}{\\alpha} = \\frac{1}{0.5} = 2$." },
            { id: 8, question: "Soit $E(X) = 2$, $E(Y) = 3$, $V(X) = 4$, $V(Y) = 5$, $Cov(X,Y) = 1$. Si $Z = 2X + 3Y$, alors $V(Z) = $", options: ["61", "73", "49", "85"], correct: 1, explanation: "$V(Z) = 4V(X) + 9V(Y) + 2 \\cdot 2 \\cdot 3 \\cdot Cov = 16 + 45 + 12 = 73$." },
            { id: 9, question: "X et Y indépendantes avec $V(X) = 4$, $V(Y) = 9$. Si $A = 2X - Y$ et $B = X + 2Y$, alors $Cov(A,B) = $", options: ["$-10$", "$10$", "$8$", "$-8$"], correct: 0, explanation: "$Cov(A,B) = 2 \\cdot 1 \\cdot V(X) + (-1) \\cdot 2 \\cdot V(Y) = 8 - 18 = -10$." },
            { id: 10, question: "Pour $f(x) = \\frac{a}{x}$ sur $[-e^{0.5}, -1]$, la constante $a = $", options: ["$-2$", "$2$", "$-1$", "$1$"], correct: 0, explanation: "$\\int_{-e^{0.5}}^{-1} \\frac{a}{x} dx = a[\\ln|x|]_{-e^{0.5}}^{-1} = a(0 - 0.5) = -0.5a = 1$, donc $a = -2$." },
            { id: 11, question: "2% des étudiants acceptent de ne pas rester anonymes. Sur 20 étudiants, $P(X \\leq 2) \\approx $", options: ["0.67", "0.99", "0.85", "0.50"], correct: 1, explanation: "$X \\sim B(20, 0.02)$. $P(X \\leq 2) = P(0) + P(1) + P(2) \\approx 0.9929$." },
            { id: 12, question: "Si $f(x,y) = e^{-x-y}$ sur $\\{x > 0, y > 0\\}$ et $U = X/Y$, alors $f_U(u) = $", options: ["$\\frac{1}{(1+u)^2}$", "$e^{-u}$", "$\\frac{u}{(1+u)^2}$", "$\\frac{1}{1+u}$"], correct: 0, explanation: "Après changement de variable et intégration : $f_U(u) = \\frac{1}{(1+u)^2}$ pour $u > 0$." },
            { id: 13, question: "La démonstration que P est croissante ($A \\subset B \\Rightarrow P(A) \\leq P(B)$) utilise :", options: ["L'identité de Morgan", "L'additivité restreinte", "Le théorème de Bayes", "La fonction génératrice"], correct: 1, explanation: "On écrit $B = A \\cup (B \\cap \\bar{A})$ avec ensembles disjoints, puis on applique l'additivité." },
            { id: 14, question: "Pour $X \\sim \\mathcal{P}(\\lambda)$, si $E(X) = V(X) = 10$, alors $\\lambda = $", options: ["5", "10", "100", "$\\sqrt{10}$"], correct: 1, explanation: "Pour Poisson, $E(X) = V(X) = \\lambda$, donc $\\lambda = 10$." },
            { id: 15, question: "Le moment factoriel $M_{[2]} = E(X(X-1))$ est relié à $m_2$ par :", options: ["$M_{[2]} = m_2$", "$M_{[2]} = m_2 - m_1$", "$M_{[2]} = m_2 + m_1$", "$M_{[2]} = m_2 \\cdot m_1$"], correct: 1, explanation: "$M_{[2]} = E(X^2 - X) = E(X^2) - E(X) = m_2 - m_1$." },
            { id: 16, question: "La fonction caractéristique $\\varphi_X(t) = E(e^{itX})$ vérifie $|\\varphi_X(t)| \\leq $", options: ["0", "1", "$E(X)$", "$\\infty$"], correct: 1, explanation: "$|\\varphi_X(t)| = |E(e^{itX})| \\leq E(|e^{itX}|) = E(1) = 1$." },
            { id: 17, question: "Si $\\varphi_{X+Y}(t) = \\varphi_X(t) \\cdot \\varphi_Y(t)$, alors X et Y sont :", options: ["Corrélées", "Indépendantes", "De même loi", "De variance nulle"], correct: 1, explanation: "La factorisation de la fonction caractéristique implique l'indépendance." },
            { id: 18, question: "Pour une VA continue 2D, $P((X,Y) \\in A) = $", options: ["$\\sum_{(x,y) \\in A} p_{xy}$", "$\\iint_A f(x,y) \\, dx \\, dy$", "$F(A)$", "$f(A)$"], correct: 1, explanation: "Pour une VA continue 2D : $P((X,Y) \\in A) = \\iint_A f(x,y) \\, dx \\, dy$." },
        ]
    },
];

// Total questions count for display
export const totalQuestions = chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
