/**
 * Microeconomics QCM Data
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
        id: 'ch0',
        title: 'Chapitre 0',
        subtitle: 'Théorie du consommateur',
        color: 'var(--color-success)',
        gradient: 'from-[var(--color-success-subtle)] to-[var(--color-success)]',
        questions: [
            { id: 1, question: "La condition d'équilibre du consommateur est :", options: ["TMS = p₂/p₁", "TMS = p₁/p₂", "TMS = R/p₁", "TMS = Um₁ × Um₂"], correct: 1, explanation: "À l'équilibre, le TMS (taux marginal de substitution) égale le rapport des prix $p_1/p_2$. C'est la condition de tangence entre la courbe d'indifférence et la droite de budget." },
            { id: 2, question: "Pour une fonction Cobb-Douglas $U = x_1^\\alpha x_2^\\beta$ avec $\\alpha + \\beta = 1$, la demande optimale de bien 1 est :", options: ["$x_1^* = \\alpha R/p_1$", "$x_1^* = \\beta R/p_1$", "$x_1^* = R/(\\alpha p_1)$", "$x_1^* = \\alpha p_1/R$"], correct: 0, explanation: "Pour Cobb-Douglas avec $\\alpha + \\beta = 1$, on a $p_1 x_1^* = \\alpha R$, donc $x_1^* = \\alpha R/p_1$. Le consommateur dépense une part $\\alpha$ de son revenu pour le bien 1." },
            { id: 3, question: "Si tous les prix et le revenu sont multipliés par $\\lambda > 0$, les demandes Marshalliennes :", options: ["Sont multipliées par λ", "Sont divisées par λ", "Ne changent pas", "Sont multipliées par λ²"], correct: 2, explanation: "Les demandes Marshalliennes sont homogènes de degré 0 en $(p_1, p_2, R)$. Si on multiplie tous les prix et le revenu par $\\lambda$, la contrainte budgétaire ne change pas." },
            { id: 4, question: "Le TMS (taux marginal de substitution) mesure :", options: ["Le rapport des prix", "La quantité de bien 2 qu'on accepte de céder pour une unité de bien 1", "La productivité marginale", "Le coût d'opportunité du travail"], correct: 1, explanation: "Le TMS mesure la quantité de bien 2 que le consommateur est prêt à sacrifier pour obtenir une unité supplémentaire de bien 1, tout en restant sur la même courbe d'indifférence." },
            { id: 5, question: "La contrainte budgétaire $p_1 x_1 + p_2 x_2 = R$ a une pente égale à :", options: ["$-p_1/p_2$", "$-p_2/p_1$", "$R/p_1$", "$p_1 \\times p_2$"], correct: 0, explanation: "La pente de la droite de budget est $-p_1/p_2$. Elle représente le taux d'échange sur le marché entre les deux biens." },
            { id: 6, question: "Un bien est dit « normal » si :", options: ["Sa demande diminue quand le revenu augmente", "Sa demande augmente quand le revenu augmente", "Sa demande est indépendante du revenu", "Son prix est constant"], correct: 1, explanation: "Un bien normal a une élasticité-revenu positive : quand le revenu augmente, la demande de ce bien augmente aussi." },
            { id: 7, question: "L'effet de substitution suite à une hausse de $p_1$ :", options: ["Augmente toujours la demande de bien 1", "Diminue toujours la demande de bien 1", "Peut augmenter ou diminuer la demande", "N'a aucun effet"], correct: 1, explanation: "L'effet de substitution est toujours négatif : quand le prix d'un bien augmente, on substitue vers l'autre bien, donc la demande diminue." },
            { id: 8, question: "Pour $U = x_1^{0.4} x_2^{0.6}$ avec $p_1 = 2$, $p_2 = 3$, $R = 120$, la quantité optimale $x_1^*$ est :", options: ["24", "12", "48", "20"], correct: 0, explanation: "Cobb-Douglas avec α + β = 1 : $p_1 x_1^* = \\alpha R$ → $2 x_1^* = 0.4 \\times 120 = 48$ → $x_1^* = 24$." },
            { id: 9, question: "Le multiplicateur de Lagrange $\\lambda^*$ représente :", options: ["Le prix du bien 1", "L'utilité marginale du revenu", "Le TMS à l'équilibre", "Le coût d'opportunité du loisir"], correct: 1, explanation: "$\\lambda^*$ mesure de combien l'utilité augmente si le revenu augmente de 1€. C'est l'utilité marginale du revenu." },
            { id: 10, question: "Un bien de Giffen est caractérisé par :", options: ["Un effet substitution positif", "Un effet revenu très fort qui domine l'effet substitution", "Une élasticité-prix positive", "Les deux dernières réponses"], correct: 3, explanation: "Pour un bien de Giffen, l'effet revenu (positif car bien inférieur) est si fort qu'il domine l'effet substitution (négatif), donnant une élasticité-prix positive." },
            { id: 11, question: "Le consommateur continue à augmenter ses dépenses d'un bien jusqu'à l'égalisation des utilités marginales pondérées par les prix :", options: ["Vrai", "Faux"], correct: 0, explanation: "À l'équilibre, $Um_1/p_1 = Um_2/p_2$. Le consommateur ajuste ses dépenses jusqu'à cette égalisation." },
            { id: 12, question: "Le panier optimal du consommateur est caractérisé par l'égalisation du TMS et :", options: ["Du rapport des utilités marginales", "Du rapport des prix", "Du rapport des variations de chaque bien"], correct: 1, explanation: "À l'optimum, TMS = $p_1/p_2$. Le TMS égale le rapport des prix." },
            { id: 13, question: "Sur une même courbe d'indifférence, les préférences des consommateurs peuvent être différentes :", options: ["Vrai", "Faux"], correct: 1, explanation: "Une courbe d'indifférence représente un même niveau d'utilité pour UN consommateur donné. Différents consommateurs ont des courbes différentes." },
            { id: 14, question: "L'utilité marginale représente le taux d'accroissement de l'utilité lorsqu'on reçoit une unité supplémentaire d'un bien, l'autre bien restant constant :", options: ["Vrai", "Faux"], correct: 0, explanation: "L'utilité marginale $Um_i = \\partial U/\\partial x_i$ mesure la variation d'utilité pour une unité supplémentaire du bien i, ceteris paribus." },
            { id: 15, question: "Le panier optimal du consommateur se situe :", options: ["Au point de tangence entre la CI et la droite de budget", "Au point maximal de la CI", "Où le panier de biens est le plus grand en quantité"], correct: 0, explanation: "L'optimum est au point de tangence entre la courbe d'indifférence la plus élevée atteignable et la droite de budget." },
            { id: 16, question: "Une augmentation de revenu entraîne :", options: ["Un déplacement parallèle vers le haut de la droite de budget", "Un déplacement parallèle vers le bas de la droite de budget", "Un changement de pente de la droite de budget"], correct: 0, explanation: "Une hausse de R déplace la droite de budget parallèlement vers le haut (vers l'extérieur), sans changer sa pente." },
        ]
    },
    {
        id: 'ch1',
        title: 'Chapitre 1',
        subtitle: 'Travail-Loisir',
        color: 'blue',
        gradient: 'from-[var(--color-info)] to-[var(--color-info)]',
        questions: [
            { id: 1, question: "Le coût d'opportunité du loisir est :", options: ["Le prix des biens de consommation", "Le salaire w", "Le revenu total", "Le temps de travail"], correct: 1, explanation: "Le salaire $w$ représente le coût d'opportunité du loisir : chaque heure de loisir 'coûte' $w$ euros de revenu sacrifié." },
            { id: 2, question: "Une courbe d'offre de travail 'backward-bending' signifie que :", options: ["L'offre de travail est toujours croissante", "L'offre de travail est toujours décroissante", "L'offre de travail décroît pour des salaires élevés", "L'offre de travail est indépendante du salaire"], correct: 2, explanation: "Pour des salaires élevés, l'effet revenu peut dominer l'effet substitution : les travailleurs préfèrent plus de loisir car ils sont 'assez riches'." },
            { id: 3, question: "La contrainte budgétaire travail-loisir s'écrit :", options: ["$C = w \\cdot L$", "$C = w(T - L)$", "$C = w \\cdot T$", "$C + wL = wT$"], correct: 3, explanation: "La contrainte est $C + wL = wT$ où $T$ est le temps total, $L$ le loisir. On peut aussi l'écrire $C = w(T-L)$ où $(T-L)$ est le temps de travail." },
            { id: 4, question: "L'effet substitution d'une hausse du salaire pousse à :", options: ["Travailler moins", "Travailler plus", "Ne pas changer son offre", "Consommer moins"], correct: 1, explanation: "L'effet substitution : $w \\uparrow$ → le loisir devient plus cher → on substitue loisir par travail → offre de travail $\\uparrow$." },
            { id: 5, question: "L'effet revenu d'une hausse du salaire pousse à :", options: ["Travailler plus", "Travailler moins", "Épargner davantage", "Consommer moins"], correct: 1, explanation: "L'effet revenu : $w \\uparrow$ → plus riche → on peut s'offrir plus de loisir (bien normal) → offre de travail $\\downarrow$." },
            { id: 6, question: "Si l'effet revenu domine l'effet substitution, une hausse du salaire :", options: ["Augmente l'offre de travail", "Diminue l'offre de travail", "N'a pas d'effet", "Augmente la demande de travail"], correct: 1, explanation: "Quand l'effet revenu domine, la hausse du salaire conduit à moins travailler : c'est la partie décroissante de la courbe d'offre de travail." },
            { id: 7, question: "Pour $U = C^\\alpha \\ell^\\beta$ avec $\\alpha + \\beta = 1$, le loisir optimal $\\ell^*$ :", options: ["Dépend du salaire w", "Est indépendant du salaire w", "Augmente toujours avec w", "Diminue toujours avec w"], correct: 1, explanation: "Pour Cobb-Douglas, $\\ell^* = \\frac{\\beta}{\\alpha + \\beta} T = \\beta T$. Le loisir optimal ne dépend pas de w (effets substitution et revenu s'annulent)." },
            { id: 8, question: "L'utilité marginale du travail correspond à :", options: ["La variation d'utilité provoquée par 1h de travail en plus", "La variation d'utilité totale", "La variation d'utilité suite à l'augmentation d'une unité de revenu"], correct: 0, explanation: "L'utilité marginale du travail mesure la variation d'utilité quand on travaille une heure de plus." },
            { id: 9, question: "Le TMS de la consommation au travail se définit comme la quantité de bien qu'il faut accorder pour travailler 1h de plus sans changer la satisfaction :", options: ["Vrai", "Faux"], correct: 0, explanation: "Le TMS mesure le taux d'échange entre consommation et loisir (ou travail) à utilité constante." },
            { id: 10, question: "Le revenu exogène correspond au salaire de l'individu dans le modèle travail-loisirs :", options: ["Vrai", "Faux"], correct: 1, explanation: "Le revenu exogène $R_0$ est un revenu non lié au travail (rentes, allocations...). Le salaire est le revenu du travail." },
            { id: 11, question: "Un « salaire de réservation » correspond au taux de salaire minimum en deçà duquel un individu renonce à travailler :", options: ["Vrai", "Faux"], correct: 0, explanation: "Le salaire de réservation est le salaire minimum pour lequel l'individu accepte de travailler." },
            { id: 12, question: "Si le loisir est un bien normal, une augmentation du salaire entraîne :", options: ["On ne peut pas conclure car ES et ER sont de sens inverse", "Une augmentation de l'offre de travail", "Une baisse de l'offre de travail"], correct: 0, explanation: "ES > 0 (travail ↑) et ER < 0 (loisir ↑ car bien normal). L'effet net est ambigu." },
        ]
    },
    {
        id: 'ch2',
        title: 'Chapitre 2',
        subtitle: 'Choix intertemporels',
        color: 'purple',
        gradient: 'from-[var(--color-accent)] to-[var(--color-accent-hover)]',
        questions: [
            { id: 1, question: "La pente de la contrainte budgétaire intertemporelle est :", options: ["$-r$", "$-(1+r)$", "$-1/r$", "$-1/(1+r)$"], correct: 1, explanation: "La pente est $-(1+r)$. Renoncer à 1€ de consommation aujourd'hui permet d'obtenir $(1+r)$€ demain." },
            { id: 2, question: "L'équation de Fisher approximative est :", options: ["$\\rho \\approx i \\times \\pi$", "$\\rho \\approx i + \\pi$", "$\\rho \\approx i - \\pi$", "$\\rho \\approx i / \\pi$"], correct: 2, explanation: "Le taux réel $\\rho \\approx i - \\pi$ (taux nominal moins inflation). C'est le taux qui compte pour les décisions d'épargne." },
            { id: 3, question: "Un épargnant net est quelqu'un qui :", options: ["Consomme plus que son revenu en période 1", "Consomme moins que son revenu en période 1", "A un taux d'escompte nul", "N'a pas de préférence pour le présent"], correct: 1, explanation: "Un épargnant net consomme moins que son revenu en période 1 ($C_1 < Y_1$) et place la différence pour consommer plus en période 2." },
            { id: 4, question: "Une hausse du taux d'intérêt pour un épargnant net :", options: ["Le rend toujours plus pauvre", "Le rend toujours plus riche", "A un effet ambigu sur son bien-être", "N'a aucun effet"], correct: 1, explanation: "Un épargnant net bénéficie d'une hausse de $r$ : son épargne rapporte plus. L'effet revenu est positif." },
            { id: 5, question: "Le taux d'escompte psychologique $\\delta$ mesure :", options: ["Le taux d'intérêt du marché", "L'impatience du consommateur", "L'inflation anticipée", "Le coût du capital"], correct: 1, explanation: "Le taux d'escompte $\\delta$ mesure l'impatience : plus $\\delta$ est élevé, plus le consommateur préfère le présent au futur." },
            { id: 6, question: "La valeur actuelle de 100€ reçus dans 2 ans au taux $r$ est :", options: ["$100(1+r)^2$", "$100/(1+r)^2$", "$100 \\times 2r$", "$100 - 2r$"], correct: 1, explanation: "La valeur actuelle est $\\frac{100}{(1+r)^2}$. On actualise les flux futurs en les divisant par $(1+r)^n$." },
            { id: 7, question: "Si le taux de préférence pour le présent $r$ est très grand, l'individu est :", options: ["Très patient", "Très impatient", "Indifférent au temps"], correct: 1, explanation: "Un taux de préférence élevé signifie que l'individu valorise fortement le présent : il est impatient." },
            { id: 8, question: "$(1+r)$ représente :", options: ["Le taux de préférence pour le futur", "L'inflation des prix", "Le coût d'opportunité de consommer aujourd'hui"], correct: 2, explanation: "$(1+r)$ est le coût d'opportunité de consommer aujourd'hui : 1€ consommé aujourd'hui = $(1+r)$€ de moins demain." },
            { id: 9, question: "La valeur future des revenus est $m_1(1+r) + m_2$ :", options: ["Vrai", "Faux"], correct: 0, explanation: "En valeur future, on capitalise le revenu de période 1 : $m_1(1+r) + m_2$." },
            { id: 10, question: "Si $m_1/p_1 < C_1$, l'individu est en situation d'emprunt :", options: ["Vrai", "Faux"], correct: 0, explanation: "Si la consommation dépasse le revenu en période 1, l'individu emprunte." },
            { id: 11, question: "L'optimum est atteint lorsque le taux de préférence pour le présent égale le taux d'intérêt :", options: ["Vrai", "Faux"], correct: 0, explanation: "À l'optimum, le TMS intertemporel égale $(1+r)$, ce qui équivaut à égaliser le taux de préférence et le taux d'intérêt." },
            { id: 12, question: "Si le taux d'intérêt réel est positif, alors $r > \\pi$ :", options: ["Vrai", "Faux"], correct: 0, explanation: "Taux réel $\\rho = r - \\pi > 0$ implique $r > \\pi$." },
        ]
    },
    {
        id: 'ch3',
        title: 'Chapitre 3',
        subtitle: 'Surplus et bien-être',
        color: 'amber',
        gradient: 'from-[var(--color-warning-subtle)] to-[var(--color-warning)]',
        questions: [
            { id: 1, question: "Le surplus du consommateur est graphiquement :", options: ["L'aire sous la courbe d'offre", "L'aire sous la courbe de demande et au-dessus du prix", "L'aire au-dessus de la courbe de demande", "Le rectangle prix × quantité"], correct: 1, explanation: "Le surplus est l'aire entre la courbe de demande (disposition à payer) et le prix de marché, jusqu'à la quantité consommée." },
            { id: 2, question: "La perte sèche (deadweight loss) d'une taxe représente :", options: ["La recette fiscale totale", "La perte de surplus non récupérée par personne", "La baisse de prix", "Le profit des entreprises"], correct: 1, explanation: "La perte sèche est la perte de bien-être qui n'est récupérée ni par les consommateurs, ni par les producteurs, ni par l'État. C'est l'inefficience pure de la taxe." },
            { id: 3, question: "Le surplus du producteur est :", options: ["L'aire au-dessus de la courbe d'offre et sous le prix", "L'aire sous la courbe de demande", "Le chiffre d'affaires total", "Le coût total de production"], correct: 0, explanation: "Le surplus du producteur est l'aire entre le prix de marché et la courbe d'offre (coût marginal), jusqu'à la quantité vendue." },
            { id: 4, question: "Une taxe unitaire de $t$ euros :", options: ["Augmente le surplus total", "Crée une perte sèche proportionnelle à $t^2$", "N'affecte pas les quantités échangées", "Bénéficie toujours aux consommateurs"], correct: 1, explanation: "La perte sèche est proportionnelle au carré de la taxe : $DWL \\propto t^2$. Doubler la taxe quadruple la perte sèche." },
            { id: 5, question: "À l'équilibre concurrentiel, le surplus total est :", options: ["Nul", "Minimal", "Maximal", "Égal à la recette fiscale"], correct: 2, explanation: "L'équilibre concurrentiel maximise le surplus total (efficience de Pareto). Toute intervention crée une perte sèche." },
            { id: 6, question: "Le surplus des consommateurs est une évaluation monétaire de la satisfaction qu'ils retirent de leur consommation sur un marché donné :", options: ["Vrai", "Faux"], correct: 0, explanation: "Le surplus mesure en termes monétaires le gain de bien-être des consommateurs : la différence entre ce qu'ils sont prêts à payer et ce qu'ils paient effectivement." },
            { id: 7, question: "On peut interpréter la fonction de demande de chaque consommateur comme une fonction de « disposition marginale à payer » :", options: ["Vrai", "Faux"], correct: 0, explanation: "La courbe de demande indique le prix maximum que le consommateur est prêt à payer pour chaque unité supplémentaire." },
            { id: 8, question: "À l'optimum, le consommateur demande la quantité qui égalise sa disposition marginale à payer au prix de marché :", options: ["Vrai", "Faux"], correct: 0, explanation: "Le consommateur achète jusqu'à ce que sa disposition marginale à payer égale le prix. Au-delà, il ne serait plus prêt à payer le prix demandé." },
            { id: 9, question: "Suite à une hausse du prix de marché, le surplus diminue. Le rectangle R représente la baisse du surplus due à la hausse du prix sur la quantité encore achetée :", options: ["Vrai", "Faux"], correct: 0, explanation: "La partie rectangulaire représente la perte sur les unités toujours consommées (on paie plus cher). Le triangle représente la perte sur les unités non consommées." },
            { id: 10, question: "La variation compensatoire (CV) mesure la somme supplémentaire que le gouvernement devrait donner au consommateur pour le dédommager exactement de la variation de prix :", options: ["Vrai", "Faux"], correct: 0, explanation: "La CV est le montant qui permettrait au consommateur de retrouver son niveau d'utilité initial après un changement de prix." },
            { id: 11, question: "Si CV > 0, cela représente :", options: ["Le montant auquel on serait prêt à renoncer pour une amélioration", "Le montant qui pourrait compenser le ménage pour une détérioration"], correct: 1, explanation: "Une CV positive indique une compensation nécessaire pour une perte de bien-être (détérioration de la situation)." },
        ]
    },
    {
        id: 'ch4',
        title: 'Chapitre 4',
        subtitle: 'Demande de marché et élasticités',
        color: 'rose',
        gradient: 'from-[var(--color-error)] to-[var(--color-error)]',
        questions: [
            { id: 1, question: "Si $|\\varepsilon_p| < 1$, la demande est dite :", options: ["Élastique", "Inélastique", "Unitaire", "Parfaitement élastique"], correct: 1, explanation: "Si $|\\varepsilon_p| < 1$, la demande est inélastique : la quantité réagit faiblement au prix. Exemples : biens de première nécessité." },
            { id: 2, question: "Un bien inférieur a une élasticité-revenu :", options: ["$\\varepsilon_R > 1$", "$0 < \\varepsilon_R < 1$", "$\\varepsilon_R < 0$", "$\\varepsilon_R = 0$"], correct: 2, explanation: "Un bien inférieur a $\\varepsilon_R < 0$ : la demande diminue quand le revenu augmente. Les consommateurs substituent vers des alternatives supérieures." },
            { id: 3, question: "L'élasticité-prix croisée entre deux biens substituts est :", options: ["Négative", "Nulle", "Positive", "Infinie"], correct: 2, explanation: "Pour des substituts, $\\varepsilon_{xy} > 0$ : si le prix de $y$ augmente, la demande de $x$ augmente (on substitue vers $x$)." },
            { id: 4, question: "L'élasticité-prix croisée entre deux biens complémentaires est :", options: ["Positive", "Nulle", "Négative", "Unitaire"], correct: 2, explanation: "Pour des compléments, $\\varepsilon_{xy} < 0$ : si le prix de $y$ augmente, la demande de $x$ diminue (on consomme moins des deux)." },
            { id: 5, question: "Si la demande est élastique ($|\\varepsilon_p| > 1$), une hausse du prix :", options: ["Augmente la recette totale", "Diminue la recette totale", "N'affecte pas la recette", "Double la recette"], correct: 1, explanation: "Demande élastique : $P \\uparrow$ → $Q \\downarrow\\downarrow$ (forte baisse) → $RT = P \\times Q$ diminue." },
            { id: 6, question: "Un bien de luxe a une élasticité-revenu :", options: ["$\\varepsilon_R < 0$", "$0 < \\varepsilon_R < 1$", "$\\varepsilon_R > 1$", "$\\varepsilon_R = 1$"], correct: 2, explanation: "Un bien de luxe a $\\varepsilon_R > 1$ : la demande augmente plus que proportionnellement au revenu." },
        ]
    },
    {
        id: 'ch5',
        title: 'Chapitre 5',
        subtitle: 'Théorie du producteur',
        color: 'cyan',
        gradient: 'from-[var(--color-info)] to-[var(--color-info)]',
        questions: [
            { id: 1, question: "La condition de minimisation des coûts est :", options: ["$Pm_L/Pm_K = r/w$", "$Pm_L/Pm_K = w/r$", "$Pm_L \\times Pm_K = w \\times r$", "$Pm_L + Pm_K = w + r$"], correct: 1, explanation: "$TMST = Pm_L/Pm_K = w/r$. Le taux technique de substitution égale le rapport des prix des facteurs." },
            { id: 2, question: "Pour $Q = AK^\\alpha L^\\beta$, les rendements d'échelle sont constants si :", options: ["$\\alpha + \\beta > 1$", "$\\alpha + \\beta < 1$", "$\\alpha + \\beta = 1$", "$\\alpha = \\beta$"], correct: 2, explanation: "Pour Cobb-Douglas, $\\alpha + \\beta = 1$ implique des rendements constants. Si on double tous les inputs, on double l'output." },
            { id: 3, question: "Le coût marginal ($Cm$) est :", options: ["Le coût total divisé par la quantité", "La dérivée du coût total par rapport à la quantité", "Le coût fixe plus le coût variable", "Le prix de vente"], correct: 1, explanation: "$Cm = \\frac{dCT}{dQ}$ : c'est le coût de production d'une unité supplémentaire." },
            { id: 4, question: "Le coût moyen ($CM$) est minimal quand :", options: ["$CM = CF$", "$CM = CV$", "$CM = Cm$", "$Cm = 0$"], correct: 2, explanation: "Le coût moyen est minimal quand $CM = Cm$. C'est le point où la courbe de $Cm$ coupe celle de $CM$." },
            { id: 5, question: "Des rendements d'échelle croissants signifient que :", options: ["Doubler les inputs double l'output", "Doubler les inputs moins que double l'output", "Doubler les inputs plus que double l'output", "L'output est constant"], correct: 2, explanation: "Rendements croissants : $f(\\lambda K, \\lambda L) > \\lambda f(K,L)$. Doubler les inputs plus que double l'output." },
            { id: 6, question: "L'isoquante représente :", options: ["Les combinaisons de facteurs de même coût", "Les combinaisons de facteurs produisant la même quantité", "La courbe de coût total", "La fonction de profit"], correct: 1, explanation: "L'isoquante est le lieu des combinaisons $(K, L)$ qui produisent le même niveau d'output $Q$." },
            { id: 7, question: "Le TMST (taux marginal de substitution technique) mesure :", options: ["Le rapport des prix des facteurs", "La quantité de K qu'on peut remplacer par une unité de L à output constant", "Le coût marginal", "La productivité totale"], correct: 1, explanation: "$TMST = -\\frac{dK}{dL}|_{Q=cte} = \\frac{Pm_L}{Pm_K}$ : c'est le taux d'échange entre facteurs le long de l'isoquante." },
            { id: 8, question: "Pour $Q = K^{0.5} L^{0.5}$ avec $r = 4$, $w = 1$, la relation optimale K/L est :", options: ["K = 4L", "K = L/4", "K = L", "K = 2L"], correct: 1, explanation: "TMST = K/L = w/r = 1/4, donc K = L/4. Le capital est 4 fois moins cher que le travail, on utilise relativement moins de K." },
            { id: 9, question: "Si $CT(Q) = 10 + 2Q + 0.5Q^2$, le coût marginal $Cm(Q)$ est :", options: ["$2 + Q$", "$10/Q + 2 + 0.5Q$", "$2 + 0.5Q$", "$10 + 2Q$"], correct: 0, explanation: "$Cm = \\frac{dCT}{dQ} = 2 + Q$. Le coût marginal est la dérivée du coût total." },
            { id: 10, question: "Sur une très courte période (un ou deux mois) :", options: ["De nombreux coûts sont variables", "La plupart des coûts sont fixes", "La plupart des coûts sont irrécupérables"], correct: 1, explanation: "À très court terme, la plupart des coûts sont fixes car l'entreprise n'a pas le temps d'ajuster ses facteurs de production." },
            { id: 11, question: "La production totale est une fonction des inputs (facteurs de production) :", options: ["Vrai", "Faux"], correct: 0, explanation: "La fonction de production $Q = f(K, L)$ exprime l'output en fonction des inputs (capital et travail)." },
            { id: 12, question: "Le coût moyen est l'accroissement du coût correspondant à la production d'une unité supplémentaire :", options: ["Vrai", "Faux"], correct: 1, explanation: "C'est la définition du coût MARGINAL, pas du coût moyen. Le coût moyen est $CM = CT/Q$." },
            { id: 13, question: "Quand les suppléments de production se réduisent alors que l'utilisation d'un facteur augmente, on parle de rendements marginaux décroissants :", options: ["Vrai", "Faux"], correct: 0, explanation: "Les rendements marginaux décroissants signifient que la productivité marginale diminue quand on augmente un facteur (l'autre restant fixe)." },
            { id: 14, question: "Une productivité marginale du travail faible ($Pm_L$) implique un coût marginal élevé ($Cm$) :", options: ["Vrai", "Faux"], correct: 0, explanation: "$Cm = w/Pm_L$. Si $Pm_L$ est faible, il faut plus de travail pour produire une unité supplémentaire, donc le coût marginal est élevé." },
            { id: 15, question: "Le coût marginal croît avec des rendements marginaux décroissants :", options: ["Vrai", "Faux"], correct: 0, explanation: "Quand $Pm_L$ diminue (rendements décroissants), $Cm = w/Pm_L$ augmente." },
            { id: 16, question: "Quand $Cm > CM$, alors $CM$ augmente :", options: ["Vrai", "Faux"], correct: 0, explanation: "Si le coût de la dernière unité ($Cm$) est supérieur à la moyenne ($CM$), la moyenne augmente." },
            { id: 17, question: "La droite d'isocoût indique toutes les combinaisons de capital $K$ et de travail $L$ qui peuvent être achetées pour un coût donné :", options: ["Vrai", "Faux"], correct: 0, explanation: "L'isocoût $C = wL + rK$ représente toutes les combinaisons $(K, L)$ de même coût total." },
            { id: 18, question: "La pente de la droite d'isocoût est $-w/r$ :", options: ["Vrai", "Faux"], correct: 0, explanation: "La pente de l'isocoût est $-w/r$, le rapport des prix des facteurs." },
            { id: 19, question: "Si $w = 20$, $r = 10$ et $Pm_L = Pm_K$, le producteur doit privilégier le facteur travail :", options: ["Vrai", "Faux"], correct: 1, explanation: "Si $Pm_L = Pm_K$ mais $w > r$, le capital est plus rentable (même productivité mais moins cher). Il faut privilégier le capital." },
            { id: 20, question: "Le sentier d'expansion indique les combinaisons de capital et de travail choisies par l'entreprise pour minimiser ses coûts à chaque niveau de production :", options: ["Vrai", "Faux"], correct: 0, explanation: "Le sentier d'expansion relie tous les points de tangence entre isoquantes et isocoûts pour différents niveaux de production." },
            { id: 21, question: "Dans le long terme, les rendements d'échelle sont d'abord croissants, puis décroissants :", options: ["Vrai", "Faux"], correct: 0, explanation: "Typiquement, on observe d'abord des économies d'échelle (rendements croissants) puis des déséconomies (rendements décroissants) à partir d'une certaine taille." },
            { id: 22, question: "Quand la productivité marginale est supérieure à la productivité moyenne, la productivité moyenne augmente :", options: ["Vrai", "Faux"], correct: 0, explanation: "Si $Pm > PM$, la dernière unité de facteur est plus productive que la moyenne, donc la moyenne augmente." },
            { id: 23, question: "Une entreprise parfaitement concurrentielle doit choisir son niveau de production tel que $Cm = Rm = P$ :", options: ["Vrai", "Faux"], correct: 0, explanation: "En CPP, la firme est price-taker donc $Rm = P$. La maximisation du profit donne $Cm = Rm = P$." },
        ]
    },
    {
        id: 'ch6',
        title: 'Chapitre 6',
        subtitle: 'Concurrence pure et parfaite',
        color: 'teal',
        gradient: 'from-[var(--color-success)] to-[var(--color-success)]',
        questions: [
            { id: 1, question: "En CPP, le prix de fermeture de court terme est :", options: ["min CM", "min CVM", "min Cm", "max CM"], correct: 1, explanation: "Le prix de fermeture CT est min $CVM$. Si $P < $ min $CVM$, la firme ne couvre même pas ses coûts variables et doit fermer." },
            { id: 2, question: "À l'équilibre de long terme en CPP :", options: ["Le profit est maximal", "Le profit est nul", "Le prix est supérieur au coût moyen", "Il n'y a pas d'entrée de nouvelles firmes"], correct: 1, explanation: "La libre entrée/sortie force le profit à zéro en LT. Si $\\pi > 0$, de nouvelles firmes entrent, l'offre augmente, le prix baisse jusqu'à $\\pi = 0$." },
            { id: 3, question: "En CPP, la condition de maximisation du profit est :", options: ["$P = CM$", "$P = Cm$", "$Rm = CM$", "$P = CF$"], correct: 1, explanation: "En CPP, la firme est price-taker donc $Rm = P$. La condition $Rm = Cm$ devient $P = Cm$." },
            { id: 4, question: "La courbe d'offre de court terme de la firme en CPP est :", options: ["La courbe de coût moyen", "La courbe de coût marginal au-dessus du CVM minimum", "La courbe de demande", "La courbe de coût fixe"], correct: 1, explanation: "L'offre CT est la partie de la courbe $Cm$ située au-dessus du minimum du $CVM$ (seuil de fermeture)." },
            { id: 5, question: "Le seuil de rentabilité correspond à :", options: ["$P = $ min $CVM$", "$P = $ min $CM$", "$P = $ min $Cm$", "$P = CF$"], correct: 1, explanation: "Le seuil de rentabilité est $P = $ min $CM$. À ce prix, la firme fait un profit nul ($\\pi = 0$)." },
            { id: 6, question: "Si $P > CM$ en CPP, la firme :", options: ["Fait des pertes", "Fait un profit positif", "Doit fermer", "Est au seuil de rentabilité"], correct: 1, explanation: "Si $P > CM$, alors $RT > CT$ donc $\\pi = RT - CT > 0$. La firme fait un profit positif." },
            { id: 7, question: "À long terme en CPP, le prix d'équilibre est égal à :", options: ["Le coût marginal maximum", "Le minimum du coût moyen", "Le coût fixe moyen", "Le coût variable total"], correct: 1, explanation: "À LT, la libre entrée/sortie conduit à $P = $ min $CM$ et $\\pi = 0$. C'est l'efficience productive." },
        ]
    },
    {
        id: 'ch7',
        title: 'Chapitre 7',
        subtitle: 'Monopole et oligopole',
        color: 'indigo',
        gradient: 'from-[var(--color-accent)] to-[var(--color-accent)]',
        questions: [
            { id: 1, question: "La condition d'équilibre du monopole est :", options: ["$P = Cm$", "$Rm = Cm$", "$P = CM$", "$Rm = P$"], correct: 1, explanation: "Le monopole maximise son profit en égalisant recette marginale et coût marginal : $Rm = Cm$. Contrairement à la CPP, $Rm \\neq P$." },
            { id: 2, question: "L'indice de Lerner mesure :", options: ["L'élasticité de la demande", "Le pouvoir de marché", "Le coût marginal", "La recette totale"], correct: 1, explanation: "$L = \\frac{P - Cm}{P} = -\\frac{1}{\\varepsilon}$ mesure le pouvoir de marché. $L = 0$ en CPP (pas de pouvoir), $L$ élevé = fort pouvoir de marché." },
            { id: 3, question: "Dans le modèle de Bertrand avec produits homogènes :", options: ["Les firmes font un profit positif", "Le prix égale le coût marginal", "Les firmes se partagent le marché équitablement", "Le prix est supérieur au monopole"], correct: 1, explanation: "Paradoxe de Bertrand : avec deux firmes, la concurrence en prix conduit à $P = Cm$ et profit nul, comme en CPP !" },
            { id: 4, question: "Dans le modèle de Cournot, les firmes choisissent :", options: ["Les prix simultanément", "Les quantités simultanément", "Les prix séquentiellement", "Les quantités séquentiellement"], correct: 1, explanation: "En Cournot, les firmes choisissent simultanément leurs quantités. Chaque firme maximise son profit étant donné la production de l'autre." },
            { id: 5, question: "Un cartel est instable car :", options: ["Les firmes n'ont pas d'incitation à coopérer", "Chaque firme a intérêt à tricher", "Le profit joint est minimal", "Les consommateurs refusent d'acheter"], correct: 1, explanation: "C'est un dilemme du prisonnier : chaque firme a intérêt à produire plus que son quota si les autres respectent l'accord. L'équilibre de Nash domine la collusion." },
            { id: 6, question: "La recette marginale du monopole est :", options: ["Égale au prix", "Supérieure au prix", "Inférieure au prix", "Égale au coût marginal"], correct: 2, explanation: "Pour le monopole, $Rm = P(1 + 1/\\varepsilon) = P(1 - 1/|\\varepsilon|) < P$ car $|\\varepsilon| > 0$. La Rm est toujours inférieure au prix." },
            { id: 7, question: "Le monopole crée une perte sèche car :", options: ["Il produit trop", "Il produit moins que l'optimum social", "Il fixe un prix trop bas", "Il maximise le surplus total"], correct: 1, explanation: "Le monopole restreint la production ($Q_m < Q_{CPP}$) et fixe un prix élevé ($P_m > Cm$), créant une perte sèche (triangle de Harberger)." },
            { id: 8, question: "Dans le modèle de Stackelberg :", options: ["Les firmes jouent simultanément", "Le leader choisit en premier, le suiveur réagit", "Les deux firmes sont identiques", "Le prix est fixé par le marché"], correct: 1, explanation: "En Stackelberg, le leader (first-mover) choisit sa quantité en premier, anticipant la réaction du suiveur. Le leader a un avantage stratégique." },
            { id: 9, question: "La discrimination par les prix du 1er degré permet au monopole de :", options: ["Fixer un prix unique", "Capturer tout le surplus du consommateur", "Maximiser la quantité produite", "Minimiser ses coûts"], correct: 1, explanation: "Discrimination parfaite (1er degré) : le monopole fait payer à chaque consommateur sa disposition maximale à payer, capturant tout le surplus." },
            { id: 10, question: "En duopole de Cournot symétrique, chaque firme produit :", options: ["La moitié de la quantité de monopole", "La moitié de la quantité concurrentielle", "Un tiers de la quantité concurrentielle", "Deux tiers de la quantité concurrentielle"], correct: 2, explanation: "En Cournot avec $n$ firmes identiques, chaque firme produit $\\frac{1}{n+1}$ de la quantité concurrentielle. Avec $n=2$ : $\\frac{1}{3}$ chacune, soit $\\frac{2}{3}$ au total." },
            { id: 11, question: "Pour $P = 100 - 2Q$ et $Cm = 10$, la quantité de monopole $Q_m^*$ est :", options: ["22.5", "45", "25", "20"], correct: 0, explanation: "$Rm = 100 - 4Q$. $Rm = Cm$ → $100 - 4Q = 10$ → $Q_m^* = 22.5$. Le prix sera $P^* = 100 - 45 = 55$." },
            { id: 12, question: "L'indice de Lerner pour un monopole avec $P = 55$ et $Cm = 10$ est :", options: ["0.18", "0.45", "0.82", "0.55"], correct: 2, explanation: "$L = \\frac{P - Cm}{P} = \\frac{55 - 10}{55} = \\frac{45}{55} \\approx 0.82$. Fort pouvoir de marché." },
            { id: 13, question: "En Cournot avec $P = 120 - (q_1 + q_2)$ et $Cm = 20$, la fonction de réaction de la firme 1 est :", options: ["$q_1 = 50 - q_2/2$", "$q_1 = 50 - q_2$", "$q_1 = 100 - q_2$", "$q_1 = 25 - q_2/4$"], correct: 0, explanation: "CPO : $120 - 2q_1 - q_2 - 20 = 0$ → $q_1 = 50 - q_2/2$. C'est la fonction de réaction (best response)." },
            { id: 14, question: "En Stackelberg, le leader produit généralement :", options: ["Moins que le suiveur", "Autant que le suiveur", "Plus que le suiveur", "La même quantité qu'en Cournot"], correct: 2, explanation: "Le leader a un avantage stratégique (first-mover advantage) : il s'engage sur une quantité élevée, forçant le suiveur à produire moins." },
        ]
    },
];

// Total questions count for display
export const totalQuestions = chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
