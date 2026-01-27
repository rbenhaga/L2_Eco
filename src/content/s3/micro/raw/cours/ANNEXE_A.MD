## 🎯 UTILISATION DE CETTE ANNEXE

<aside>
💡

**COMMENT UTILISER CE FORMULAIRE**

Ce formulaire contient **toutes les formules essentielles** des 8 modules. À apprendre **par cœur** !

**Stratégie de révision** :

- **2 semaines avant l'examen** : Révise ce formulaire tous les jours
- **1 semaine avant** : Teste-toi en cachant les formules
- **La veille** : Relis uniquement ce formulaire + pièges d'examen
- **Le jour J** : Recopie les formules clés sur ton brouillon dès le début de l'épreuve
</aside>

---

## 🎯 PARTIE I : THÉORIE DU CONSOMMATEUR

### MODULE 0 : Rappels Fondamentaux

### Contrainte Budgétaire

$$
p_1 x_1 + p_2 x_2 = R
$$

$$
x_2 = \frac{R}{p_2} - \frac{p_1}{p_2} x_1
$$

**Pente** : $-p_1/p_2$

### Taux Marginal de Substitution (TMS)

$$
TMS_{1,2} = \frac{Um_{x_1}}{Um_{x_2}} = \frac{\partial U / \partial x_1}{\partial U / \partial x_2}
$$

### Condition d'Optimalité

$$
\boxed{TMS = \frac{p_1}{p_2} \iff \frac{Um_{x_1}}{Um_{x_2}} = \frac{p_1}{p_2} \iff \frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}}
$$

### Lagrangien

$$
\mathcal{L} = U(x_1, x_2) + \lambda(R - p_1 x_1 - p_2 x_2)
$$

**CPO** :

$$
\begin{cases}
Um_{x_1} - \lambda p_1 = 0 \\
Um_{x_2} - \lambda p_2 = 0 \\
R - p_1 x_1 - p_2 x_2 = 0
\end{cases}
$$

### Cobb-Douglas : $U = x_1^\alpha x_2^\beta$

$$
\boxed{p_1 x_1^* = \frac{\alpha}{\alpha + \beta} R}
$$

$$
\boxed{p_2 x_2^* = \frac{\beta}{\alpha + \beta} R}
$$

Cas particulier $\alpha + \beta = 1$ :

$$
p_1 x_1^* = \alpha R \quad \text{et} \quad p_2 x_2^* = \beta R
$$

### Élasticités

**Élasticité-prix** :

$$
\varepsilon_{x_i, p_i} = \frac{\partial x_i}{\partial p_i} \cdot \frac{p_i}{x_i}
$$

**Élasticité-revenu** :

$$
\varepsilon_{x_i, R} = \frac{\partial x_i}{\partial R} \cdot \frac{R}{x_i}
$$

---

### MODULE 1 : Arbitrage Travail-Loisir

### Contrainte Temporelle

$$
T = L + \ell \quad \text{(temps total)}
$$

$$
pC = w(T - \ell) + m
$$

$$
C = \frac{wT + m}{p} - \frac{w}{p}\ell
$$

**Pente** : $-w/p$ (coût d'opportunité du loisir)

### Condition d'Optimalité

$$
\boxed{\frac{Um_\ell}{Um_C} = \frac{w}{p}}
$$

### Offre de Travail

$$
L^s = T - \ell^*(w, p, m)
$$

**Effet d'une hausse de** $w$ :

- **Effet substitution** : loisir plus cher → $L^s \uparrow$
- **Effet revenu** : revenu plus élevé → $L^s \downarrow$ (si loisir = bien normal)

### Cobb-Douglas : $U = C^\alpha \ell^\beta$

$$
\ell^* = \frac{\beta}{\alpha + \beta} T \quad \text{(indépendant de } w \text{)}
$$

---

### MODULE 2 : Choix Intertemporels

### Contrainte Intertemporelle

**Valeur présente** :

$$
\boxed{c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r} = W}
$$

**Valeur future** :

$$
c_2 = m_2 + (1+r)(m_1 - c_1)
$$

**Pente** : $-(1+r)$

### Condition d'Optimalité

$$
\boxed{\frac{Um_{c_1}}{Um_{c_2}} = 1 + r}
$$

### Épargne / Emprunt

$$
s = m_1 - c_1^* \quad \begin{cases} s > 0 : \text{épargnant} \\ s < 0 : \text{emprunteur} \end{cases}
$$

### Taux d'Intérêt Réel

$$
\boxed{1 + \rho = \frac{1 + i}{1 + \pi}}
$$

**Approximation de Fisher** : $\rho \approx i - \pi$

---

### MODULE 3 : Surplus du Consommateur

### Surplus du Consommateur

$$
SC = \int_0^{Q^*} P(q) dq - P^* Q^*
$$

Graphiquement : **aire sous la courbe de demande** moins **dépense effective**.

### Variation du Surplus

Si le prix passe de $P_0$ à $P_1$ :

$$
\Delta SC = \int_{Q_1}^{Q_0} P(q) dq
$$

**Perte de surplus** si $P$ augmente = **aire du trapèze**.

### Variation Compensatoire (VC) et Variation Équivalente (VE)

**VC** : combien donner au consommateur **après** la hausse de prix pour qu'il retrouve son utilité initiale.

$$
VC = e(p_1, u_1) - e(p_1, u_0)
$$

**VE** : combien retirer au consommateur **avant** la hausse de prix pour qu'il atteigne le même niveau d'utilité.

$$
VE = e(p_0, u_1) - e(p_0, u_0)
$$

### Équation de Slutsky

$$
\frac{\partial x_i}{\partial p_j} = \underbrace{\frac{\partial h_i}{\partial p_j}}_{\text{Effet substitution}} - \underbrace{\frac{\partial x_i}{\partial R} x_j}_{\text{Effet revenu}}
$$

---

## 🎯 PARTIE II : THÉORIE DU PRODUCTEUR

### MODULE 5 : Minimisation des Coûts

### Fonction de Production Cobb-Douglas

$$
Q = AK^\alpha L^\beta
$$

### Productivités Marginales

$$
Pm_L = \frac{\partial Q}{\partial L} \quad \text{et} \quad Pm_K = \frac{\partial Q}{\partial K}
$$

**Pour Cobb-Douglas** :

$$
Pm_L = \beta \frac{Q}{L} \quad \text{et} \quad Pm_K = \alpha \frac{Q}{K}
$$

### Taux Marginal de Substitution Technique (TMST)

$$
TMST_{L,K} = \frac{Pm_L}{Pm_K}
$$

**Pour Cobb-Douglas** :

$$
TMST = \frac{\beta}{\alpha} \frac{K}{L}
$$

### Rendements d'Échelle (Cobb-Douglas)

$$
\begin{cases}
\alpha + \beta > 1 : \text{rendements croissants} \\
\alpha + \beta = 1 : \text{rendements constants} \\
\alpha + \beta < 1 : \text{rendements décroissants}
\end{cases}
$$

### Condition de Minimisation des Coûts

$$
\boxed{\frac{Pm_L}{Pm_K} = \frac{w}{r} \iff \frac{Pm_L}{w} = \frac{Pm_K}{r}}
$$

### Isocoût

$$
C = wL + rK
$$

$$
K = \frac{C}{r} - \frac{w}{r} L
$$

**Pente** : $-w/r$

### Coûts

**Coût Total** : $CT(Q) = CF + CV(Q)$

**Coût Moyen** : $CM(Q) = \frac{CT(Q)}{Q}$

**Coût Marginal** : $Cm(Q) = \frac{dCT}{dQ}$

**Relation** : Si $Cm < CM$, alors $CM$ décroît. Si $Cm > CM$, alors $CM$ croît.

---

### MODULE 6 : Offre de la Branche (CPP)

### Condition d'Offre Court Terme

La firme produit si :

$$
P \geq CVM(Q)
$$

Quantité optimale : $P = Cm(Q)$ (si profit positif)

### Condition d'Offre Long Terme

La firme entre/reste sur le marché si :

$$
P \geq CM(Q)
$$

À l'équilibre LT : $P = Cm(Q) = CM(Q)$ (au minimum de $CM$)

### Surplus du Producteur

$$
SP = \int_0^{Q^*} [P^* - Cm(q)] dq
$$

Graphiquement : **aire au-dessus de** $Cm$ **et en dessous de** $P^*$.

---

### MODULE 7 : Monopole et Oligopole

### MONOPOLE

**Recette Marginale** :

$$
Rm = P + Q \cdot \frac{dP}{dQ} = P\left(1 + \frac{1}{\varepsilon}\right)
$$

Où $\varepsilon < 0$ est l'élasticité-prix de la demande.

**Condition d'Équilibre** :

$$
\boxed{Rm = Cm}
$$

Le prix est donné par la demande : $P^* = P(Q^*)$ avec $P^* > Cm$.

**Indice de Lerner** :

$$
\boxed{L = \frac{P - Cm}{P} = \frac{1}{|\varepsilon|}}
$$

**Demande linéaire** : Si $P = a - bQ$, alors $Rm = a - 2bQ$ (pente 2x).

### OLIGOPOLE DE COURNOT

Chaque firme $i$ choisit $q_i$ pour maximiser $\pi_i$ en prenant $q_j$ comme donné.

**Fonction de réaction** : $q_i^* = R_i(q_j)$

**Équilibre de Nash-Cournot** : $(q_1^*, q_2^*)$ tel que :

$$
q_1^* = R_1(q_2^*) \quad \text{et} \quad q_2^* = R_2(q_1^*)
$$

### OLIGOPOLE DE STACKELBERG

**Leader** (firme 1) choisit $q_1$ **en premier**.

**Suiveur** (firme 2) réagit : $q_2^* = R_2(q_1)$.

Le leader maximise $\pi_1(q_1, R_2(q_1))$ (rétroduction).

**Résultat** : $q_1^* > q_2^*$ et $\pi_1^* > \pi_2^*$ (avantage au leader)

### OLIGOPOLE DE BERTRAND

Firmes choisissent simultanément leur prix.

Avec bien homogène et $Cm$ constants identiques :

$$
\boxed{P^* = Cm \quad \text{et} \quad \pi_i^* = 0}
$$

(Paradoxe : résultat de CPP avec seulement 2 firmes)

### COLLUSION

Firmes maximisent le profit **joint** :

$$
\max \pi_1 + \pi_2
$$

Équivalent à un monopole multi-établissements.

**Résultat** : Profits plus élevés que Cournot, mais instable (incitation à tricher).

---

## 📊 TABLEAU RÉCAPITULATIF : MARCHÉS

| **Marché** | **Condition** | **Prix** | **Profit LT** | **Efficacité** |
| --- | --- | --- | --- | --- |
| **CPP** | $P = Cm$ | $P = CM_{min}$ | Nul | Optimale |
| **Monopole** | $Rm = Cm$ | $P > Cm$ | Positif | Perte sèche |
| **Cournot** | $q_i^* = R_i(q_j^*)$ | $P > Cm$ | Positif | Perte sèche |
| **Stackelberg** | Rétroduction | $P > Cm$ | Positif (leader > suiveur) | Perte sèche |
| **Bertrand** | $p_i^* = Cm$ | $P = Cm$ | Nul | Optimale |
| **Collusion** | Max $\pi_{joint}$ | $P > Cm$ (comme monopole) | Positif (max) | Perte sèche |

---

## ⚠️ PIÈGES D'EXAMEN LES PLUS FRÉQUENTS

<aside>
⚠️

**TOP 10 DES ERREURS À ÉVITER**

1. **Confondre** $Rm$ **et** $P$ **en monopole** : $Rm = Cm$, **PAS** $P = Cm$
2. **Oublier les conditions du second ordre** (Hessien pour vérifier max/min)
3. **Confondre demandes Marshalliennes et Hicksiennes** :
- Marshall : max $U$ s.c. budget → $x_i^*(p, R)$
- Hicks : min dépense s.c. utilité $\bar{U}$ → $h_i(p, \bar{U})$
1. **Oublier que pour Cobb-Douglas** avec $\alpha + \beta = 1$ :

$$
p_i x_i^* = \alpha_i R \quad \text{(formule directe)}
$$

1. **Confondre rendements d'échelle et rendements marginaux**
2. **Ne pas vérifier les contraintes de positivité** : $x \geq 0$, $K \geq 0$, $L \geq 0$
3. **Confondre CT et LT** pour l'offre de la firme :
- CT : $P \geq CVM$ (capital fixe)
- LT : $P \geq CM$ (tous facteurs variables)
1. **Oublier d'interpréter économiquement** les résultats mathématiques
2. **Pour Stackelberg**, oublier de faire la rétroduction (partir du suiveur)
3. **En Slutsky**, confondre le signe des effets :
- Effet substitution : toujours négatif sur le bien dont le prix augmente
- Effet revenu : dépend si bien normal/inférieur
</aside>

---

## 📝 CHECKLIST AVANT L'EXAMEN

- ☐ Je connais par cœur toutes les formules Cobb-Douglas
- ☐ Je sais écrire et résoudre un Lagrangien en moins de 5 minutes
- ☐ Je distingue parfaitement Marshall vs Hicks
- ☐ Je maîtrise la décomposition Slutsky (effet substitution + effet revenu)
- ☐ Je sais calculer TMST pour n'importe quelle fonction
- ☐ Je connais la condition $Rm = Cm$ pour le monopole
- ☐ Je maîtrise Cournot (courbes de réaction, équilibre de Nash)
- ☐ Je sais faire la rétroduction pour Stackelberg
- ☐ Je connais le paradoxe de Bertrand
- ☐ Je sais calculer les coûts (CT, CV, CF, CM, Cm, CVM)
- ☐ Je distingue CT vs LT pour la firme
- ☐ Je sais calculer surplus du consommateur et du producteur
- ☐ Je connais l'indice de Lerner par cœur
- ☐ Je maîtrise les rendements d'échelle
- ☐ J'ai refait tous les exercices types sans regarder la correction

---

<aside>
✅

**BON COURAGE POUR TON PARTIEL !**

Avec ce formulaire et ta rigueur mathématique de prépa, tu as tous les outils pour cartonner.

N'oublie pas :

1. **Lire l'énoncé attentivement** (2 fois minimum)
2. **Identifier le modèle** (Consommateur ? Producteur ? Quel type de marché ?)
3. **Écrire le programme** (max ou min + contrainte)
4. **Résoudre méthodiquement** (Lagrangien si besoin)
5. **Interpréter économiquement** (ne jamais s'arrêter aux maths)
6. **Vérifier les conditions du second ordre**

🚀 **Objectif : 16-18/20 !**

</aside>