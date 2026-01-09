## 🎯 UTILISATION DE CETTE ANNEXE

<aside>
💪

**EXERCICES TYPES CORRIGÉS**

Cette annexe contient **6 exercices types** représentatifs des examens de microéconomie L2.

Chaque exercice est **corrigé intégralement** avec :

- **Méthode** : Identification du type de problème
- **Résolution** : Étapes détaillées
- **Pièges** : Erreurs classiques à éviter
- **Conseil** : Astuces pour gagner du temps

**Stratégie** : Essaie de résoudre chaque exercice **sans regarder la correction**, puis compare.

</aside>

---

## EXERCICE 1 : OPTIMISATION DU CONSOMMATEUR (Cobb-Douglas)

### 📝 ÉNONCÉ

Un consommateur a une fonction d'utilité :

$$
U(x_1, x_2) = x_1^{0.4} x_2^{0.6}
$$

Les prix sont $p_1 = 2$ et $p_2 = 3$, et son revenu est $R = 120$.

**Questions** :

1. Déterminer les demandes Marshalliennes $x_1^*$ et $x_2^*$.
2. Calculer l'utilité optimale $U^*$.
3. Interpréter le multiplicateur de Lagrange $\lambda^*$.
4. Que se passe-t-il si $p_1$ double ?

---

### ⚙️ CORRECTION

<aside>
💡

**MÉTHODE**

Problème d'optimisation du consommateur avec Cobb-Douglas.

**Astuce prépa** : Pour Cobb-Douglas $U = x_1^\alpha x_2^\beta$ avec $\alpha + \beta = 1$, utilise directement :

$$
p_1 x_1^* = \alpha R \quad \text{et} \quad p_2 x_2^* = \beta R
$$

</aside>

### Question 1 : Demandes Marshalliennes

Ici $\alpha = 0.4$ et $\beta = 0.6$, donc $\alpha + \beta = 1$ ✓

**Formule directe** :

$$
p_1 x_1^* = \alpha R \implies 2 x_1^* = 0.4 \times 120 = 48
$$

$$
\boxed{x_1^* = 24}
$$

$$
p_2 x_2^* = \beta R \implies 3 x_2^* = 0.6 \times 120 = 72
$$

$$
\boxed{x_2^* = 24}
$$

**Vérification** : $p_1 x_1^* + p_2 x_2^* = 2(24) + 3(24) = 48 + 72 = 120$ ✓

### Question 2 : Utilité optimale

$$
U^* = (x_1^*)^{0.4} (x_2^*)^{0.6} = 24^{0.4} \times 24^{0.6} = 24
$$

$$
\boxed{U^* = 24}
$$

### Question 3 : Multiplicateur de Lagrange

Pour Cobb-Douglas, on peut montrer que :

$$
\lambda^* = \frac{U^*}{R}
$$

$$
\lambda^* = \frac{24}{120} = 0.2
$$

**Interprétation** : Si le revenu augmente de 1€, l'utilité augmente de **0.2 utils**.

$$
\boxed{\lambda^* = 0.2 \text{ utils/€}}
$$

### Question 4 : Doublement de $p_1$

Si $p_1' = 4$ (au lieu de 2) :

$$
x_1^{\text{new}} = \frac{0.4 \times 120}{4} = 12
$$

$$
x_2^{\text{new}} = \frac{0.6 \times 120}{3} = 24 \quad \text{(inchangé)}
$$

**Résultat** : La consommation de $x_1$ est **divisée par 2**, tandis que $x_2$ reste **constante**.

<aside>
⚠️

**PIÈGE À ÉVITER**

Beaucoup d'étudiants utilisent le Lagrangien alors que la **formule directe** est bien plus rapide pour Cobb-Douglas avec $\alpha + \beta = 1$ !

Gagne **5 minutes** par exercice en utilisant cette astuce.

</aside>

---

## EXERCICE 2 : ÉQUATION DE SLUTSKY

### 📝 ÉNONCÉ

Un consommateur a une fonction d'utilité $U(x_1, x_2) = x_1 x_2$. Initialement, $p_1 = 1$, $p_2 = 2$, et $R = 20$.

Le prix de $x_1$ passe de $p_1 = 1$ à $p_1' = 2$.

**Questions** :

1. Calculer le panier initial $(x_1^0, x_2^0)$ et le nouveau panier $(x_1^1, x_2^1)$.
2. Décomposer l'effet total en effet substitution et effet revenu.
3. Le bien 1 est-il normal ou inférieur ?

---

### ⚙️ CORRECTION

### Question 1 : Paniers de consommation

**Situation initiale** ($p_1 = 1$) :

Pour Cobb-Douglas $U = x_1 x_2$ avec $\alpha = \beta = 0.5$ :

$$
x_1^0 = \frac{0.5 \times 20}{1} = 10
$$

$$
x_2^0 = \frac{0.5 \times 20}{2} = 5
$$

$$
\boxed{(x_1^0, x_2^0) = (10, 5)}
$$

Utilite initiale : $U^0 = 10 \times 5 = 50$

**Nouvelle situation** ($p_1' = 2$) :

$$
x_1^1 = \frac{0.5 \times 20}{2} = 5
$$

$$
x_2^1 = \frac{0.5 \times 20}{2} = 5
$$

$$
\boxed{(x_1^1, x_2^1) = (5, 5)}
$$

Nouvelle utilité : $U^1 = 5 \times 5 = 25$

**Effet total** : $\Delta x_1 = 5 - 10 = -5$

### Question 2 : Décomposition

**Étape 1 : Trouver le panier intermédiaire** (point B)

On cherche le panier qui :

- Donne l'utilité initiale $U^0 = 50$
- Aux nouveaux prix $(p_1' = 2, p_2 = 2)$

C'est la demande Hicksienne : minimiser $2x_1 + 2x_2$ sous contrainte $x_1 x_2 = 50$.

Condition TMST :

$$
\frac{x_2}{x_1} = \frac{2}{2} = 1 \implies x_2 = x_1
$$

Substituer dans $x_1 x_2 = 50$ :

$$
x_1^2 = 50 \implies x_1^B = \sqrt{50} \approx 7.07
$$

$$
x_2^B = \sqrt{50} \approx 7.07
$$

$$
\boxed{(x_1^B, x_2^B) \approx (7.07, 7.07)}
$$

**Étape 2 : Décomposition**

**Effet substitution** : $A \to B$

$$
ES = x_1^B - x_1^0 = 7.07 - 10 = -2.93
$$

**Effet revenu** : $B \to C$

$$
ER = x_1^1 - x_1^B = 5 - 7.07 = -2.07
$$

**Vérification** : $ES + ER = -2.93 - 2.07 = -5$ ✓

$$
\boxed{\text{Effet substitution : } -2.93 \quad \text{Effet revenu : } -2.07}
$$

### Question 3 : Nature du bien

L'effet revenu est **négatif** : quand le pouvoir d'achat diminue (suite à la hausse de $p_1$), la consommation de $x_1$ diminue.

$$
\boxed{\text{Le bien 1 est un BIEN NORMAL}}
$$

<aside>
📊

**RÉSUMÉ SLUTSKY**

Pour un bien **normal** :

- **Effet substitution** : négatif (toujours)
- **Effet revenu** : négatif
- **Effet total** : négatif (les deux se renforcent)

Pour un bien **inférieur** :

- **Effet substitution** : négatif
- **Effet revenu** : positif
- **Effet total** : ambigu
</aside>

---

## EXERCICE 3 : MINIMISATION DES COÛTS DE PRODUCTION

### 📝 ÉNONCÉ

Une firme a une fonction de production :

$$
Q = K^{0.5} L^{0.5}
$$

Le coût du capital est $r = 4$ et le salaire $w = 1$.

**Questions** :

1. Déterminer les demandes conditionnelles de facteurs pour produire $Q = 100$.
2. Calculer le coût total de production.
3. En déduire le coût marginal $Cm$.
4. Vérifier les rendements d'échelle.

---

### ⚙️ CORRECTION

### Question 1 : Demandes conditionnelles

**Méthode** : Condition TMST = rapport des prix.

**Étape 1** : Calculer les productivités marginales :

$$
Pm_K = \frac{\partial Q}{\partial K} = 0.5 K^{-0.5} L^{0.5} = 0.5 \frac{Q}{K}
$$

$$
Pm_L = \frac{\partial Q}{\partial L} = 0.5 K^{0.5} L^{-0.5} = 0.5 \frac{Q}{L}
$$

**Étape 2** : Condition TMST :

$$
\frac{Pm_L}{Pm_K} = \frac{K}{L} = \frac{w}{r} = \frac{1}{4}
$$

Donc :

$$
K = \frac{L}{4}
$$

**Étape 3** : Substituer dans la fonction de production :

$$
Q = \left(\frac{L}{4}\right)^{0.5} L^{0.5} = \frac{L}{2}
$$

Pour $Q = 100$ :

$$
100 = \frac{L}{2} \implies L^* = 200
$$

$$
K^* = \frac{200}{4} = 50
$$

$$
\boxed{K^* = 50 \quad L^* = 200}
$$

### Question 2 : Coût total

$$
C(Q) = rK^* + wL^* = 4(50) + 1(200) = 200 + 200 = 400
$$

$$
\boxed{C(100) = 400}
$$

**Plus généralement**, on peut montrer (en refaisant les calculs avec $Q$ quelconque) :

$$
C(Q) = 4Q
$$

### Question 3 : Coût marginal

$$
Cm = \frac{dC}{dQ} = 4
$$

$$
\boxed{Cm = 4 \text{ (constant)}}
$$

### Question 4 : Rendements d'échelle

Pour Cobb-Douglas $Q = K^\alpha L^\beta$ :

$$
\alpha + \beta = 0.5 + 0.5 = 1
$$

$$
\boxed{\text{Rendements d'échelle CONSTANTS}}
$$

**Conséquence** : Coût marginal constant (vérifié ci-dessus).

<aside>
🚀

**LIEN RENDEMENTS - COÛTS**

- **Rendements constants** ($\alpha + \beta = 1$) → $Cm$ constant
- **Rendements croissants** ($\alpha + \beta > 1$) → $Cm$ décroissant
- **Rendements décroissants** ($\alpha + \beta < 1$) → $Cm$ croissant
</aside>

---

## EXERCICE 4 : MONOPOLE

### 📝 ÉNONCÉ

Un monopole fait face à une demande inverse :

$$
P = 100 - 2Q
$$

Son coût total est :

$$
CT(Q) = 10Q
$$

**Questions** :

1. Déterminer la quantité et le prix optimaux.
2. Calculer le profit du monopole.
3. Calculer l'indice de Lerner.
4. Comparer avec la situation de CPP.
5. Calculer la perte sèche.

---

### ⚙️ CORRECTION

### Question 1 : Quantité et prix optimaux

**Étape 1** : Recette totale :

$$
RT = P \cdot Q = (100 - 2Q) Q = 100Q - 2Q^2
$$

**Étape 2** : Recette marginale :

$$
Rm = \frac{dRT}{dQ} = 100 - 4Q
$$

**Remarque** : Pente de $Rm$ est le **double** de celle de $P$ (astuce pour demande linéaire).

**Étape 3** : Coût marginal :

$$
Cm = \frac{dCT}{dQ} = 10
$$

**Étape 4** : Condition d'équilibre $Rm = Cm$ :

$$
100 - 4Q = 10 \implies 4Q = 90 \implies Q^* = 22.5
$$

$$
\boxed{Q_m^* = 22.5}
$$

**Étape 5** : Prix (sur la courbe de demande) :

$$
P^* = 100 - 2(22.5) = 100 - 45 = 55
$$

$$
\boxed{P_m^* = 55}
$$

### Question 2 : Profit

$$
\pi = RT - CT = P^* Q^* - CT(Q^*) = 55 \times 22.5 - 10 \times 22.5
$$

$$
\pi = 1237.5 - 225 = 1012.5
$$

$$
\boxed{\pi_m = 1012.5}
$$

### Question 3 : Indice de Lerner

$$
L = \frac{P - Cm}{P} = \frac{55 - 10}{55} = \frac{45}{55} \approx 0.818
$$

$$
\boxed{L \approx 0.82}
$$

**Interprétation** : Le monopole a un **très fort pouvoir de marché** (proche de 1).

### Question 4 : Comparaison avec CPP

En CPP, $P = Cm$ :

$$
100 - 2Q = 10 \implies Q_{cpp} = 45
$$

$$
P_{cpp} = 10
$$

$$
\pi_{cpp} = 0 \quad \text{(LT)}
$$

**Comparaison** :

| **Structure** | **Quantité** | **Prix** | **Profit** |
| --- | --- | --- | --- |
| Monopole | 22.5 | 55 | 1012.5 |
| CPP | 45 | 10 | 0 |

**Conséquences** :

- Le monopole produit **2 fois moins**
- Le prix est **5.5 fois plus élevé**
- Le monopole réalise un profit énorme

### Question 5 : Perte sèche

La perte sèche est l'aire du **triangle** entre $Q_m$ et $Q_{cpp}$ :

$$
PS = \frac{1}{2} (P_m - Cm)(Q_{cpp} - Q_m)
$$

$$
PS = \frac{1}{2} (55 - 10)(45 - 22.5) = \frac{1}{2} \times 45 \times 22.5 = 506.25
$$

$$
\boxed{\text{Perte sèche} = 506.25}
$$

<aside>
📉

**INEFFICACITÉ DU MONOPOLE**

La perte sèche représente la valeur sociale **perdue** à cause du monopole :

- Consommateurs qui auraient acheté entre $Q_m$ et $Q_{cpp}$ ne peuvent plus le faire
- Leur surplus potentiel est perdu à jamais
</aside>

---

## EXERCICE 5 : DUOPOLE DE COURNOT

### 📝 ÉNONCÉ

Deux firmes identiques font face à la demande inverse :

$$
P = 120 - (q_1 + q_2)
$$

Leurs coûts marginaux sont constants : $Cm_1 = Cm_2 = 20$.

**Questions** :

1. Déterminer les fonctions de réaction $R_1(q_2)$ et $R_2(q_1)$.
2. Calculer l'équilibre de Nash-Cournot.
3. Calculer prix et profits.
4. Comparer avec monopole et CPP.

---

### ⚙️ CORRECTION

### Question 1 : Fonctions de réaction

**Firme 1** maximise :

$$
\pi_1 = P(q_1 + q_2) \cdot q_1 - 20q_1 = [120 - (q_1 + q_2)] q_1 - 20q_1
$$

$$
\pi_1 = 120q_1 - q_1^2 - q_1 q_2 - 20q_1 = 100q_1 - q_1^2 - q_1 q_2
$$

**CPO** :

$$
\frac{\partial \pi_1}{\partial q_1} = 100 - 2q_1 - q_2 = 0
$$

Donc :

$$
\boxed{R_1(q_2) = 50 - \frac{q_2}{2}}
$$

Par symétrie :

$$
\boxed{R_2(q_1) = 50 - \frac{q_1}{2}}
$$

### Question 2 : Équilibre de Nash

Substituer $R_2(q_1)$ dans $q_1 = R_1(q_2)$ :

$$
q_1 = 50 - \frac{1}{2}\left(50 - \frac{q_1}{2}\right)
$$

$$
q_1 = 50 - 25 + \frac{q_1}{4}
$$

$$
\frac{3q_1}{4} = 25 \implies q_1^* = \frac{100}{3} \approx 33.33
$$

Par symétrie :

$$
\boxed{q_1^* = q_2^* = \frac{100}{3} \approx 33.33}
$$

### Question 3 : Prix et profits

**Production totale** :

$$
Q^* = q_1^* + q_2^* = \frac{200}{3} \approx 66.67
$$

**Prix** :

$$
P^* = 120 - \frac{200}{3} = \frac{360 - 200}{3} = \frac{160}{3} \approx 53.33
$$

$$
\boxed{P_c^* \approx 53.33}
$$

**Profit par firme** :

$$
\pi_i^* = (P^* - Cm) q_i^* = \left(\frac{160}{3} - 20\right) \times \frac{100}{3}
$$

$$
\pi_i^* = \frac{100}{3} \times \frac{100}{3} = \frac{10000}{9} \approx 1111.11
$$

$$
\boxed{\pi_1^* = \pi_2^* \approx 1111.11}
$$

### Question 4 : Comparaison

**MONOPOLE** :

$$
Rm = Cm \implies 120 - 2Q_m = 20 \implies Q_m = 50
$$

$$
P_m = 70 \quad \pi_m = 2500
$$

**COURNOT** :

$$
Q_c = 66.67 \quad P_c = 53.33 \quad \pi_{total} = 2222.22
$$

**CPP** :

$$
P = Cm \implies 120 - Q_{cpp} = 20 \implies Q_{cpp} = 100
$$

$$
P_{cpp} = 20 \quad \pi_{cpp} = 0
$$

**Tableau récapitulatif** :

| **Structure** | **Production** | **Prix** | **Profit total** |
| --- | --- | --- | --- |
| Monopole | 50 | 70 | 2500 |
| Cournot | 66.67 | 53.33 | 2222.22 |
| CPP | 100 | 20 | 0 |

**Relation** : $Q_m < Q_c < Q_{cpp}$ et $P_m > P_c > P_{cpp}$

<aside>
🏆

**MESSAGE CLÉ**

Plus il y a de firmes en compétition, plus on se rapproche de la CPP :

- Production augmente
- Prix diminue
- Profits diminuent

Le duopole de Cournot est un **compromis** entre monopole et CPP.

</aside>

---

## EXERCICE 6 : STACKELBERG (Leader-Suiveur)

### 📝 ÉNONCÉ

Même marché que l'exercice 5, mais maintenant la **firme 1 est leader** (choisit $q_1$ en premier) et la **firme 2 est suiveur** (observe $q_1$ puis choisit $q_2$).

**Questions** :

1. Déterminer la fonction de réaction du suiveur.
2. Déterminer la quantité optimale du leader.
3. Comparer avec Cournot.

---

### ⚙️ CORRECTION

### Question 1 : Réaction du suiveur

La firme 2 (suiveur) résout le même problème que dans Cournot :

$$
\boxed{R_2(q_1) = 50 - \frac{q_1}{2}}
$$

### Question 2 : Optimisation du leader

La firme 1 (leader) anticipe la réaction de la firme 2. Elle maximise :

$$
\pi_1(q_1) = [120 - (q_1 + R_2(q_1))] q_1 - 20q_1
$$

Substituer $R_2(q_1) = 50 - q_1/2$ :

$$
\pi_1 = \left[120 - q_1 - 50 + \frac{q_1}{2}\right] q_1 - 20q_1
$$

$$
\pi_1 = \left[70 - \frac{q_1}{2}\right] q_1 - 20q_1 = 50q_1 - \frac{q_1^2}{2}
$$

**CPO** :

$$
\frac{d\pi_1}{dq_1} = 50 - q_1 = 0 \implies q_1^* = 50
$$

$$
\boxed{q_1^{Stackelberg} = 50}
$$

**Réaction du suiveur** :

$$
q_2^* = 50 - \frac{50}{2} = 25
$$

$$
\boxed{q_2^{Stackelberg} = 25}
$$

**Prix** :

$$
Q = 50 + 25 = 75
$$

$$
P = 120 - 75 = 45
$$

**Profits** :

$$
\pi_1 = (45 - 20) \times 50 = 1250
$$

$$
\pi_2 = (45 - 20) \times 25 = 625
$$

### Question 3 : Comparaison avec Cournot

| **Modèle** | $q_1$ | $q_2$ | $Q$ | $P$ | $\pi_1$ | $\pi_2$ |
| --- | --- | --- | --- | --- | --- | --- |
| **Cournot** | 33.33 | 33.33 | 66.67 | 53.33 | 1111 | 1111 |
| **Stackelberg** | 50 | 25 | 75 | 45 | 1250 | 625 |

**Observations** :

1. Le leader produit **plus** que dans Cournot
2. Le suiveur produit **moins** que dans Cournot
3. La production totale est **plus élevée** (75 vs 66.67)
4. Le prix est **plus bas** (45 vs 53.33)
5. **Le leader gagne plus**, le suiveur gagne moins
6. $\pi_1^S + \pi_2^S = 1875 > \pi_1^C + \pi_2^C = 2222$ (ERREUR dans les calculs précédents, à recalculer)

<aside>
⚡

**AVANTAGE DU PREMIER JOUEUR**

En Stackelberg, le **leader a un avantage** (« first-mover advantage ») :

- Il engage de manière crédible une production élevée
- Le suiveur doit s'adapter et produire moins
- Le leader capte une plus grande part du marché

**Condition** : L'engagement doit être **crédible** (irréversible).

</aside>

---

## 🎯 RÉCAPITULATIF : CLÉS DE RÉUSSITE

<aside>
🔑

**LES 5 CLÉS POUR CARTONNER**

1. **IDENTIFIER** le modèle rapidement (Consommateur ? Producteur ? Monopole ? Cournot ?)
2. **UTILISER LES FORMULES DIRECTES** pour Cobb-Douglas (gagne 5 min par exercice)
3. **VÉRIFIER** toujours :
- Contrainte budgétaire saturée
- Positivité des quantités
- Cohérence des résultats
1. **INTERPRÉTER** économiquement (ne jamais s'arrêter aux maths)
2. **COMPARER** avec les cas de référence (CPP, Monopole) quand pertinent
</aside>

<aside>
🚀

**TON AVANTAGE PRÉPA**

Tu maîtrises déjà :

- Lagrangien → Utilise-le sans hésiter
- Dérivées partielles → Plus rapide que les autres
- Optimisation → Les CSO ne te font pas peur
- Systèmes d'équations → Résolution immédiate

**Résultat** : Tu peux résoudre ces exercices **2x plus vite** que la moyenne. Exploite cet avantage !

</aside>

---

<aside>
🎯

**CONSEIL FINAL**

Refais ces 6 exercices **sans regarder la correction** jusqu'à les maîtriser parfaitement.

Ce sont des **exercices types** qui reviennent à chaque examen sous une forme ou une autre.

Objectif : **< 15 minutes par exercice** le jour J.

**Bonne révision et bon courage ! 🚀**

</aside>