## 🧠 UTILISATION DE CETTE ANNEXE

<aside>
🛠️

**MÉTHODES DE RÉSOLUTION SYSTÉMATIQUES**

Cette annexe contient des **méthodes pas à pas** pour résoudre tous les types d'exercices du cours.

Chaque méthode suit le même plan :

1. **Identification** : Reconnaître le type de problème
2. **Programme** : Écrire le problème mathématique
3. **Résolution** : Étapes détaillées
4. **Vérification** : Conditions du second ordre
5. **Interprétation** : Sens économique des résultats
</aside>

---

## MÉTHODE 1 : OPTIMISATION DU CONSOMMATEUR (DEMAND MARSHALLIENNE)

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- On te donne une fonction d'utilité $U(x_1, x_2)$
- On te donne des prix $p_1, p_2$ et un revenu $R$
- On te demande les quantités optimales consommées

### 📝 ÉTAPE 2 : ÉCRIRE LE PROGRAMME

$$
\max_{x_1, x_2} U(x_1, x_2)
$$

Sous la contrainte :

$$
p_1 x_1 + p_2 x_2 = R
$$

### ⚙️ ÉTAPE 3 : RÉSOLUTION PAR LAGRANGIEN

**3.1 - Écrire le Lagrangien** :

$$
\mathcal{L} = U(x_1, x_2) + \lambda(R - p_1 x_1 - p_2 x_2)
$$

**3.2 - Calculer les CPO (Conditions du Premier Ordre)** :

$$
\begin{cases}
\frac{\partial \mathcal{L}}{\partial x_1} = \frac{\partial U}{\partial x_1} - \lambda p_1 = 0 \\
\frac{\partial \mathcal{L}}{\partial x_2} = \frac{\partial U}{\partial x_2} - \lambda p_2 = 0 \\
\frac{\partial \mathcal{L}}{\partial \lambda} = R - p_1 x_1 - p_2 x_2 = 0
\end{cases}
$$

**3.3 - Diviser les deux premières équations** :

$$
\frac{\partial U / \partial x_1}{\partial U / \partial x_2} = \frac{p_1}{p_2}
$$

Cela donne : $TMS = \frac{p_1}{p_2}$

**3.4 - Résoudre le système** :

- Extraire $x_2$ en fonction de $x_1$ depuis le TMS
- Substituer dans la contrainte budgétaire
- Résoudre pour $x_1^*$
- Déduire $x_2^*$

### 🔍 ÉTAPE 4 : CONDITIONS DU SECOND ORDRE

Vérifier que le Hessien bordé est négatif :

$$
\bar{H} = \begin{vmatrix}
0 & -p_1 & -p_2 \\
-p_1 & U_{11} & U_{12} \\
-p_2 & U_{12} & U_{22}
\end{vmatrix} > 0
$$

Pour les fonctions usuelles (Cobb-Douglas, CES), c'est toujours vérifié.

### 💬 ÉTAPE 5 : INTERPRÉTATION

- Vérifier que $x_1^*, x_2^* > 0$
- Calculer l'utilité optimale : $U^* = U(x_1^*, x_2^*)$
- Interpréter $\lambda^*$ : utilité marginale du revenu

---

## MÉTHODE 2 : MINIMISATION DES DÉPENSES (DEMANDE HICKSIENNE)

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- On te demande la demande compensatrice (hicksienne)
- On te donne un niveau d'utilité cible $\bar{U}$
- On cherche la dépense minimale pour atteindre $\bar{U}$

### 📝 ÉTAPE 2 : ÉCRIRE LE PROGRAMME

$$
\min_{x_1, x_2} p_1 x_1 + p_2 x_2
$$

Sous la contrainte :

$$
U(x_1, x_2) = \bar{U}
$$

### ⚙️ ÉTAPE 3 : RÉSOLUTION PAR LAGRANGIEN

**3.1 - Écrire le Lagrangien** :

$$
\mathcal{L} = p_1 x_1 + p_2 x_2 + \mu(\bar{U} - U(x_1, x_2))
$$

**3.2 - CPO** :

$$
\begin{cases}
p_1 - \mu \frac{\partial U}{\partial x_1} = 0 \\
p_2 - \mu \frac{\partial U}{\partial x_2} = 0 \\
\bar{U} - U(x_1, x_2) = 0
\end{cases}
$$

**3.3 - Diviser** pour obtenir le TMS :

$$
\frac{\partial U / \partial x_1}{\partial U / \partial x_2} = \frac{p_1}{p_2}
$$

*(Même condition que pour Marshall !)*

**3.4 - Résoudre** :

- Extraire la relation entre $x_1$ et $x_2$ du TMS
- Substituer dans $U(x_1, x_2) = \bar{U}$
- Résoudre pour $h_1(p_1, p_2, \bar{U})$ et $h_2(p_1, p_2, \bar{U})$

### 💬 LIEN AVEC MARSHALL

Les demandes Marshallienne et Hicksienne coïncident à l'équilibre :

$$
h_i(p_1, p_2, U^*) = x_i^*(p_1, p_2, R^*)
$$

Où $U^* = U(x_1^*, x_2^*)$ et $R^* = e(p_1, p_2, U^*)$

---

## MÉTHODE 3 : DÉCOMPOSITION DE SLUTSKY

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- On te demande de décomposer l'effet d'une variation de prix
- On parle d'effet substitution et effet revenu
- On mentionne des biens normaux/inférieurs ou Giffen

### 📝 ÉTAPE 2 : FORMULE DE SLUTSKY

$$
\underbrace{\frac{\partial x_i}{\partial p_j}}_{\text{Effet total}} = \underbrace{\frac{\partial h_i}{\partial p_j}}_{\text{Effet substitution}} - \underbrace{\frac{\partial x_i}{\partial R} \cdot x_j}_{\text{Effet revenu}}
$$

### ⚙️ ÉTAPE 3 : RÉSOLUTION GRAPHIQUE

**3.1 - Situation initiale** :

- Point A : équilibre initial $(x_1^0, x_2^0)$ au prix $p_1^0$

**3.2 - Nouvelle situation** :

- Point C : nouvel équilibre $(x_1^1, x_2^1)$ au prix $p_1^1$

**3.3 - Point intermédiaire B (effet substitution)** :

- Tracer la droite parallèle à la nouvelle contrainte mais tangente à $U^0$
- Point B : $(x_1^B, x_2^B)$

**3.4 - Décomposition** :

$$
\begin{cases}
\text{Effet substitution : } A \to B \text{ (le long de } U^0 \text{)} \\
\text{Effet revenu : } B \to C \text{ (changement de courbe d'indifférence)}
\end{cases}
$$

### 💡 RÈGLES DE SIGNE

| **Type de bien** | **Effet substitution** | **Effet revenu** | **Effet total** |
| --- | --- | --- | --- |
| Bien normal | $-$ (toujours) | $-$ | $-$ (démonstration) |
| Bien inférieur | $-$ (toujours) | $+$ | $?$ (ambigu) |
| Bien de Giffen | $-$ (toujours) | $++$ (très fort) | $+$ (paradoxe) |

---

## MÉTHODE 4 : MINIMISATION DES COÛTS DE PRODUCTION

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- On te donne une fonction de production $Q = f(K, L)$
- On te donne les prix des facteurs $r$ (capital) et $w$ (travail)
- On te demande la combinaison optimale pour produire $\bar{Q}$

### 📝 ÉTAPE 2 : ÉCRIRE LE PROGRAMME

$$
\min_{K, L} C = wL + rK
$$

Sous la contrainte :

$$
f(K, L) = \bar{Q}
$$

### ⚙️ ÉTAPE 3 : RÉSOLUTION PAR LAGRANGIEN

**3.1 - Lagrangien** :

$$
\mathcal{L} = wL + rK + \lambda(\bar{Q} - f(K, L))
$$

**3.2 - CPO** :

$$
\begin{cases}
w - \lambda \frac{\partial f}{\partial L} = 0 \\
r - \lambda \frac{\partial f}{\partial K} = 0 \\
\bar{Q} - f(K, L) = 0
\end{cases}
$$

**3.3 - Condition TMST** :

$$
\frac{Pm_L}{Pm_K} = \frac{w}{r}
$$

Ou de manière équivalente :

$$
\frac{Pm_L}{w} = \frac{Pm_K}{r}
$$

### 🔧 CAS PARTICULIER : COBB-DOUGLAS $Q = AK^\alpha L^\beta$

**Étape 1** : Calculer les productivités marginales :

$$
Pm_K = \alpha \frac{Q}{K} \quad \text{et} \quad Pm_L = \beta \frac{Q}{L}
$$

**Étape 2** : TMST :

$$
\frac{Pm_L}{Pm_K} = \frac{\beta}{\alpha} \frac{K}{L} = \frac{w}{r}
$$

Donc :

$$
K = \frac{\beta}{\alpha} \frac{w}{r} L
$$

**Étape 3** : Substituer dans $Q = AK^\alpha L^\beta$ et résoudre.

**Résultat général** (demandes conditionnelles de facteurs) :

$$
L^*(w, r, Q) = \left(\frac{\alpha}{\beta}\right)^{\alpha/(\alpha+\beta)} \left(\frac{r}{w}\right)^{\alpha/(\alpha+\beta)} \frac{Q}{A^{1/(\alpha+\beta)}}
$$

$$
K^*(w, r, Q) = \left(\frac{\beta}{\alpha}\right)^{\beta/(\alpha+\beta)} \left(\frac{w}{r}\right)^{\beta/(\alpha+\beta)} \frac{Q}{A^{1/(\alpha+\beta)}}
$$

### 📊 FONCTION DE COÛT

$$
C(w, r, Q) = wL^*(w, r, Q) + rK^*(w, r, Q)
$$

Pour Cobb-Douglas avec rendements constants ($\alpha + \beta = 1$) :

$$
C(Q) = kQ \quad \text{(coût linéaire)}
$$

Où $k$ dépend de $w, r, \alpha, \beta, A$.

---

## MÉTHODE 5 : OFFRE DE LA FIRME EN CPP

### 📌 COURT TERME

**Étape 1** : Écrire le profit :

$$
\pi = PQ - CT(Q) = PQ - CF - CV(Q)
$$

**Étape 2** : CPO :

$$
\frac{d\pi}{dQ} = P - Cm(Q) = 0 \implies P = Cm(Q)
$$

**Étape 3** : Vérifier la condition de production :

$$
P \geq CVM(Q^*)
$$

Sinon, la firme arrête de produire ($Q = 0$).

**Étape 4** : Courbe d'offre CT :

$$
S^{CT}(P) = \begin{cases}
Q^* \text{ tel que } P = Cm(Q^*) & \text{si } P \geq CVM_{min} \\
0 & \text{si } P < CVM_{min}
\end{cases}
$$

### 🕒 LONG TERME

**Condition d'entrée/sortie** :

$$
P \geq CM(Q)
$$

**Équilibre LT** : Les firmes entrent/sortent jusqu'à ce que :

$$
P = CM_{min} = Cm(Q^*)
$$

Donc **profit nul** à l'équilibre LT.

---

## MÉTHODE 6 : MONOPOLE

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- Une seule firme sur le marché
- La firme fait face à toute la demande $P = P(Q)$
- On te demande prix et quantité optimaux

### 📝 ÉTAPE 2 : PROGRAMME

$$
\max_Q \pi(Q) = P(Q) \cdot Q - C(Q)
$$

### ⚙️ ÉTAPE 3 : RÉSOLUTION

**3.1 - Calculer la recette totale** :

$$
RT(Q) = P(Q) \cdot Q
$$

**3.2 - Calculer la recette marginale** :

$$
Rm(Q) = \frac{dRT}{dQ} = P(Q) + Q \frac{dP}{dQ}
$$

Ou avec l'élasticité :

$$
Rm = P\left(1 + \frac{1}{\varepsilon}\right)
$$

**3.3 - CPO** :

$$
Rm(Q^*) = Cm(Q^*)
$$

**3.4 - Trouver le prix** :

$$
P^* = P(Q^*)
$$

### 🔧 CAS PARTICULIER : DEMANDE LINÉAIRE $P = a - bQ$

**Recette marginale** :

$$
Rm = a - 2bQ \quad \text{(pente 2x)}
$$

**Si coût marginal constant** $Cm = c$ :

$$
a - 2bQ^* = c \implies Q^* = \frac{a-c}{2b}
$$

$$
P^* = a - bQ^* = \frac{a+c}{2}
$$

### 📊 INDICE DE LERNER

$$
L = \frac{P - Cm}{P} = \frac{1}{|\varepsilon|}
$$

Mesure le **pouvoir de marché** :

- $L = 0$ : CPP (prix = coût marginal)
- $L \to 1$ : Monopole pur (grand pouvoir)

---

## MÉTHODE 7 : OLIGOPOLE DE COURNOT

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- Duopole (ou oligopole à $n$ firmes)
- Firmes choisissent simultanément leurs **quantités**
- Demande inverse : $P = P(Q_1 + Q_2)$

### 📝 ÉTAPE 2 : FONCTIONS DE RÉACTION

**Pour la firme 1** :

$$
\max_{q_1} \pi_1(q_1, q_2) = P(q_1 + q_2) \cdot q_1 - C_1(q_1)
$$

**CPO** :

$$
\frac{\partial \pi_1}{\partial q_1} = P + q_1 \frac{dP}{dQ} - Cm_1 = 0
$$

Résoudre pour $q_1$ en fonction de $q_2$ : **fonction de réaction** $R_1(q_2)$.

Idem pour la firme 2 : $R_2(q_1)$.

### ⚙️ ÉTAPE 3 : ÉQUILIBRE DE NASH

Résoudre le système :

$$
\begin{cases}
q_1^* = R_1(q_2^*) \\
q_2^* = R_2(q_1^*)
\end{cases}
$$

### 🔧 CAS PARTICULIER : $P = a - b(q_1 + q_2)$, $Cm_1 = Cm_2 = c$

**Fonction de réaction firme 1** :

$$
q_1 = R_1(q_2) = \frac{a - c}{2b} - \frac{q_2}{2}
$$

Par symétrie :

$$
q_2 = R_2(q_1) = \frac{a - c}{2b} - \frac{q_1}{2}
$$

**Équilibre** (substituer et résoudre) :

$$
q_1^* = q_2^* = \frac{a-c}{3b}
$$

$$
Q^* = q_1^* + q_2^* = \frac{2(a-c)}{3b}
$$

$$
P^* = a - bQ^* = \frac{a + 2c}{3}
$$

### 📊 COMPARAISON

| **Structure** | **Production** | **Prix** |
| --- | --- | --- |
| Monopole | $Q_m = \frac{a-c}{2b}$ | $P_m = \frac{a+c}{2}$ |
| Cournot | $Q_c = \frac{2(a-c)}{3b}$ | $P_c = \frac{a+2c}{3}$ |
| CPP | $Q_{cpp} = \frac{a-c}{b}$ | $P_{cpp} = c$ |

Relation : $Q_m < Q_c < Q_{cpp}$ et $P_m > P_c > P_{cpp}$

---

## MÉTHODE 8 : OLIGOPOLE DE STACKELBERG

### 📌 ÉTAPE 1 : IDENTIFICATION

**Tu reconnais ce problème quand** :

- Duopole avec structure **séquentielle**
- Firme 1 (leader) choisit $q_1$ en premier
- Firme 2 (suiveur) observe $q_1$ puis choisit $q_2$

### 📝 ÉTAPE 2 : RÉSOLUTION PAR INDUCTION À REBOURS

**Étape 2.1 - Résolution du suiveur** (firme 2) :

Pour $q_1$ donné, maximiser :

$$
\max_{q_2} \pi_2(q_1, q_2)
$$

Obtenir la **fonction de réaction** : $q_2^* = R_2(q_1)$

**Étape 2.2 - Résolution du leader** (firme 1) :

Le leader anticipe la réaction : maximiser :

$$
\max_{q_1} \pi_1(q_1, R_2(q_1))
$$

**CPO** :

$$
\frac{d\pi_1}{dq_1} = \frac{\partial \pi_1}{\partial q_1} + \frac{\partial \pi_1}{\partial q_2} \cdot \frac{dR_2}{dq_1} = 0
$$

Résoudre pour $q_1^*$.

**Étape 2.3 - Déduire** $q_2^*$ :

$$
q_2^* = R_2(q_1^*)
$$

### 🔧 CAS PARTICULIER : $P = a - b(q_1 + q_2)$, $Cm = c$

**Étape 1** : Réaction du suiveur :

$$
q_2 = R_2(q_1) = \frac{a - c}{2b} - \frac{q_1}{2}
$$

**Étape 2** : Leader maximise :

$$
\pi_1 = [a - b(q_1 + R_2(q_1))] q_1 - cq_1
$$

Substituer $R_2(q_1)$ et maximiser.

**Résultat** :

$$
q_1^* = \frac{a-c}{2b} \quad \text{(leader)}
$$

$$
q_2^* = \frac{a-c}{4b} \quad \text{(suiveur)}
$$

**Comparaison** : $q_1^* > q_1^{Cournot} > q_2^*$ et $\pi_1^* > \pi_1^{Cournot} > \pi_2^*$

---

## 🛠️ CHECK-LIST DE RÉSOLUTION

<aside>
✅

**AVANT DE RENDRE TA COPIE**

☐ J'ai **identifié le type de problème** correctement

☐ J'ai **écrit le programme** (max/min + contrainte)

☐ J'ai **utilisé le Lagrangien** si nécessaire

☐ J'ai **vérifié les CPO** (toutes les dérivées partielles)

☐ J'ai **résolu le système** complètement

☐ J'ai **vérifié les CSO** (Hessien si demandé)

☐ J'ai **vérifié les contraintes** de positivité

☐ J'ai **calculé les valeurs numériques** demandées

☐ J'ai **interprété économiquement** les résultats

☐ J'ai **comparé** avec d'autres structures si demandé

☐ J'ai **vérifié la cohérence** des résultats

☐ J'ai **encadré les réponses finales**

</aside>

---

<aside>
🚀

**CONSEIL FINAL**

**En examen, procède toujours dans cet ordre** :

1. Lire l'énoncé entièrement (2 fois)
2. Identifier le modèle (« C'est du Cournot », « C'est de l'optimisation du consommateur »...)
3. Écrire le programme formel AVANT de calculer
4. Résoudre méthodiquement étape par étape
5. Vérifier (CSO, positivité, cohérence)
6. Interpréter économiquement

**Ton avantage prépa** : Tu maîtrises déjà le Lagrangien, les dérivées, l'optimisation. Utilise-le à fond !

</aside>