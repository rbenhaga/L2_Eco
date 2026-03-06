## 🎯 L'ESSENTIEL EN 3 LIGNES

> **Le monopole est un price-maker** qui contrôle le prix (contrairement à la CPP). Condition d'équilibre : $Rm = Cm$ avec $Rm = P(1 + 1/\varepsilon)$ où $\varepsilon < -1$ (demande élastique). Le monopole crée une **perte sèche** (inefficacité) par rapport à la CPP. En **oligopole**, les firmes interagissent stratégiquement : Cournot (quantités), Bertrand (prix), Stackelberg (leader-suiveur), Collusion (entente).
> 

---

# PARTIE A : LE MONOPOLE

# 1. INTRODUCTION AU MONOPOLE

<aside>
💡

**INTUITION**

Le monopole est l'opposé de la concurrence parfaite : au lieu d'être un **price-taker**, le monopole est un **price-maker**. Il est seul sur son marché et décide du prix. Mais attention : il ne peut pas fixer n'importe quel prix car il doit tenir compte de la demande des consommateurs !

</aside>

## 1.1 Les 4 Caractéristiques du Monopole

<aside>
📐

**DÉFINITION**

Un **monopole** est un marché caractérisé par :

1. **Producteur unique** : Une seule firme face à une multitude d'acheteurs
2. **Produit spécifique** : Pas de biens substituables proches
3. **Barrières à l'entrée** : Impossibilité pour d'autres firmes d'entrer sur le marché
4. **Pouvoir de marché** : La firme est **price-maker** (fixe le prix)
</aside>

**Sources des barrières à l'entrée** :

- Monopole légal (brevet, licence, réglementation)
- Monopole naturel (coûts fixes très élevés → économies d'échelle)
- Contrôle d'une ressource essentielle
- Effets de réseau

<aside>
⚠️

**DIFFÉRENCE CLÉS : MONOPOLE vs CPP**

</aside>

| Critère | CPP | Monopole |
| --- | --- | --- |
| **Nombre de firmes** | Très nombreuses | Une seule |
| **Rôle** | Price-taker | Price-maker |
| **Demande perçue** | Horizontale ($P = Rm$) | Décroissante ($Rm < P$) |
| **Condition équilibre** | $P = Cm$ | $Rm = Cm$ |
| **Profit LT** | Nul ($\pi = 0$) | Positif ($\pi > 0$) |
| **Efficacité** | Oui | Non (perte sèche) |

---

# 2. MAXIMISATION DU PROFIT DU MONOPOLE

## 2.1 Le Programme du Monopole

Le monopole maximise son profit en choisissant la quantité $y$ :

$$
\max_y \pi(y) = R(y) - C(y) = P(y) \cdot y - C(y)
$$

**Différence avec la CPP** : Le prix $P(y)$ dépend de la quantité produite (fonction de demande inverse).

## 2.2 Condition de Premier Ordre

$$
\frac{d\pi}{dy} = 0 \iff \frac{dR}{dy} - \frac{dC}{dy} = 0
$$

$$
\boxed{Rm(y^*) = Cm(y^*)}
$$

Où $Rm = \frac{dR}{dy}$ est la **recette marginale**.

<aside>
💡

**INTUITION**

Le monopole produit jusqu'à ce que la recette marginale égalise le coût marginal. C'est la **même logique** qu'en CPP, sauf que $Rm \neq P$ pour le monopole (alors qu'en CPP, $Rm = P$).

</aside>

[GRAPHIQUE À INSÉRER : Plan (y, P). Tracer : (1) Demande D décroissante, (2) Recette marginale Rm en-dessous de D (pente double), (3) Coût marginal Cm croissant, (4) Coût moyen CM. Point d'équilibre : intersection $Rm = Cm$ en $y^*$. Prix monopole $P_m$ sur la courbe de demande au-dessus de $y^*$. Comparer avec équilibre CPP : intersection $P = Cm$ en $y_c > y^*$ et $P_c < P_m$. Zones : Profit du monopole = rectangle $(P_m - CM) \times y^*$ coloré en vert. Perte sèche = triangle entre demande, Cm, et production monopole, coloré en rouge.]

---

# 3. RECETTE MARGINALE ET ÉLASTICITÉ

## 3.1 Formule de la Recette Marginale

<aside>
📐

**FORMULE FONDAMENTALE**

Pour un monopole face à une demande d'élasticité $\varepsilon$ :

</aside>

$$
\boxed{Rm(y) = P(y) \left(1 + \frac{1}{\varepsilon}\right)}
$$

Où $\varepsilon = \frac{dQ}{dP} \cdot \frac{P}{Q} < 0$ est l'élasticité-prix de la demande.

**Démonstration** :

$$
Rm = \frac{dR}{dy} = \frac{d(Py)}{dy} = P + y\frac{dP}{dy}
$$

$$
= P\left(1 + \frac{y}{P}\frac{dP}{dy}\right) = P\left(1 + \frac{1}{\varepsilon}\right)
$$

Car $\varepsilon = \frac{dy}{dP} \cdot \frac{P}{y}$, donc $\frac{y}{P}\frac{dP}{dy} = \frac{1}{\varepsilon}$.

## 3.2 Relation Rm - P selon l'Élasticité

| **Élasticité** | **Relation Rm - P** | **Interprétation** |
| --- | --- | --- |
| $|\varepsilon| > 1$ (élastique) | $Rm > 0$ | Augmenter $y$ augmente $R$ |
| $|\varepsilon| = 1$ (unitaire) | $Rm = 0$ | $R$ maximale |
| $|\varepsilon| < 1$ (inélastique) | $Rm < 0$ | Augmenter $y$ diminue $R$ |

## 3.3 Théorème Important

<aside>
📐

**THÉORÈME**

Un monopole qui maximise son profit produit **toujours** dans la zone où la demande est **élastique** : $|\varepsilon| > 1$ ou $\varepsilon < -1$.

</aside>

**Preuve** : À l'optimum, $Rm = Cm > 0$ (coût marginal positif).

Or $Rm = P(1 + 1/\varepsilon) > 0$ et $P > 0$, donc :

$$
1 + \frac{1}{\varepsilon} > 0 \implies \frac{1}{\varepsilon} > -1 \implies \varepsilon < -1
$$

(Car $\varepsilon < 0$ par définition)

<aside>
⚠️

**PIÈGE FRÉQUENT**

Ne jamais produire en zone inélastique ($|\varepsilon| < 1$) ! Le monopole pourrait augmenter son profit en **réduisant** la production (ce qui ferait monter le prix plus que proportionnellement).

</aside>

---

# 4. POUVOIR DE MONOPOLE ET INDICE DE LERNER

## 4.1 Formule du Prix en Fonction du Coût Marginal

De $Rm = Cm$ et $Rm = P(1 + 1/\varepsilon)$, on tire :

$$
P\left(1 + \frac{1}{\varepsilon}\right) = Cm
$$

$$
\boxed{P = \frac{Cm}{1 + 1/\varepsilon} = \frac{Cm \cdot \varepsilon}{\varepsilon + 1}}
$$

Ou encore (en réarrangeant) :

$$
\boxed{P = \frac{Cm}{1 - 1/|\varepsilon|}}
$$

**Exemple** : Si $\varepsilon = -2$ (demande élastique), alors :

$$
P = \frac{Cm}{1 - 1/2} = 2 \cdot Cm
$$

Le prix est le **double** du coût marginal !

## 4.2 Indice de Lerner

<aside>
📐

**DÉFINITION**

L'**indice de Lerner** mesure le pouvoir de marché d'une firme :

</aside>

$$
L = \frac{P - Cm}{P} = -\frac{1}{\varepsilon}
$$

**Interprétation** :

- $L = 0$ : Pas de pouvoir de marché (CPP, car $P = Cm$)
- $L$ élevé : Fort pouvoir de marché (prix >> coût marginal)
- $0 < L < 1$ : Plus $L$ est proche de 1, plus le monopole a du pouvoir

**Relation avec l'élasticité** : Plus la demande est élastique ($|\varepsilon|$ élevé), plus $L$ est faible.

<aside>
💡

**INTUITION**

Si les consommateurs sont très sensibles au prix (demande élastique), le monopole ne peut pas fixer un prix très au-dessus de son coût marginal, sinon il perd trop de clients. Son pouvoir de marché est limité.

</aside>

---

# 5. INEFFICACITÉ DU MONOPOLE

## 5.1 Comparaison Monopole vs CPP

<aside>
📐

**RÉSULTAT FONDAMENTAL**

Par rapport à la CPP, le monopole :

1. **Produit moins** : $y_m < y_c$
2. **Prix plus élevé** : $P_m > P_c = Cm$
3. **Profit positif** : $\pi_m > 0$ (alors que $\pi_c = 0$ en CPP)
4. **Crée une perte sèche** : inefficacité sociale
</aside>

## 5.2 La Perte Sèche (Deadweight Loss)

**Définition** : La perte sèche est la perte de surplus total (surplus consommateur + surplus producteur) par rapport à l'optimum social (CPP).

$$
PS = \frac{1}{2}(P_m - Cm(y_m))(y_c - y_m)
$$

C'est l'aire du **triangle** entre la courbe de demande, la courbe de coût marginal, et la production du monopole.

[GRAPHIQUE À INSÉRER : Plan (y, P). Tracer D, Rm, Cm. Marquer : (1) Équilibre monopole : $y_m$ où $Rm = Cm$, prix $P_m$ sur D. (2) Équilibre CPP : $y_c$ où $D = Cm$, prix $P_c$. Zones colorées : (a) Rectangle vert = Profit monopole $(P_m - CM) \times y_m$. (b) Triangle rouge = Perte sèche entre D, Cm, et $y_m$. (c) Zone bleue = Surplus consommateur restant (triangle au-dessus de $P_m$, sous D).]

## 5.3 Surplus en Monopole vs CPP

| **Surplus** | **CPP** | **Monopole** |
| --- | --- | --- |
| **Surplus Consommateur** | $SC_c$ (élevé) | $SC_m < SC_c$ |
| **Surplus Producteur** | $SP_c = 0$ (LT) | $SP_m = \pi_m > 0$ |
| **Surplus Total** | $ST_c$ (maximum) | $ST_m < ST_c$ |
| **Perte Sèche** | 0 | $PS = ST_c - ST_m > 0$ |

<aside>
⚡

**CONCLUSION**

Le monopole est **inefficace** du point de vue social : il produit trop peu et vend trop cher. Mais cette inefficacité peut être compensée par l'innovation (brevets) ou les économies d'échelle (monopole naturel).

</aside>

---

# PARTIE B : L'OLIGOPOLE

# 6. INTRODUCTION À L'OLIGOPOLE

<aside>
💡

**INTUITION**

L'oligopole est une **structure intermédiaire** entre monopole et CPP. Quelques grandes firmes dominent le marché et leurs décisions sont **stratégiquement interdépendantes** : chaque firme doit anticiper les réactions de ses concurrents.

</aside>

## 6.1 Caractéristiques de l'Oligopole

1. **Petit nombre de firmes** (typiquement 2 à 10)
2. **Interdépendance stratégique** : les décisions d'une firme affectent les autres
3. **Barrières à l'entrée** importantes (mais pas insurmontables)
4. **Produits homogènes ou différenciés**
5. **Théorie des jeux** : outil d'analyse

## 6.2 Variables Stratégiques

Les firmes peuvent se concurrencer sur :

- **Quantités** → Modèle de Cournot
- **Prix** → Modèle de Bertrand
- **Timing** (qui joue en premier) → Modèle de Stackelberg
- **Collusion** → Cartels

---

# 7. MODÈLE DE COURNOT (Concurrence en Quantités)

## 7.1 Hypothèses

1. Deux firmes (duopole) : firme 1 et firme 2
2. Produit **homogène**
3. Les firmes choisissent **simultanément** leurs quantités $q_1$ et $q_2$
4. Prix de marché : $P(Q)$ où $Q = q_1 + q_2$
5. Coûts : $C_i(q_i)$ pour chaque firme

## 7.2 Fonction de Meilleure Réponse

La firme 1 maximise :

$$
\max_{q_1} \pi_1 = P(q_1 + q_2) \cdot q_1 - C_1(q_1)
$$

Condition de premier ordre :

$$
\frac{\partial \pi_1}{\partial q_1} = P + q_1 \frac{dP}{dQ} - Cm_1 = 0
$$

Cela donne la **fonction de réaction** (ou meilleure réponse) de la firme 1 : $q_1 = R_1(q_2)$.

De même pour la firme 2 : $q_2 = R_2(q_1)$.

## 7.3 Équilibre de Nash-Cournot

<aside>
📐

**DÉFINITION**

L'**équilibre de Nash-Cournot** est le couple $(q_1^*, q_2^*)$ tel que :

</aside>

$$
\begin{cases}
q_1^* = R_1(q_2^*) \\
q_2^* = R_2(q_1^*)
\end{cases}
$$

Chaque firme produit sa meilleure réponse étant donné la production de l'autre.

**Exemple (Duopole symétrique linéaire)** :

Demande inverse : $P = a - b(q_1 + q_2)$

Coûts marginaux constants : $Cm_1 = Cm_2 = c$

**Résolution** :

Firme 1 : $\pi_1 = [a - b(q_1 + q_2)]q_1 - cq_1$

CPO : $a - b(q_1 + q_2) - bq_1 - c = 0$

$$
q_1 = \frac{a - c - bq_2}{2b} = R_1(q_2)
$$

Par symétrie : $q_2 = \frac{a - c - bq_1}{2b}$

Équilibre : $q_1^* = q_2^* = \frac{a - c}{3b}$

Production totale : $Q^* = \frac{2(a - c)}{3b}$

Prix : $P^* = \frac{a + 2c}{3}$

## 7.4 Comparaison Monopole - Cournot - CPP

| **Structure** | **Production** | **Prix** | **Profit** |
| --- | --- | --- | --- |
| **Monopole** | $Q_m = \frac{a-c}{2b}$ | $P_m = \frac{a+c}{2}$ | Maximal |
| **Cournot** | $Q_c = \frac{2(a-c)}{3b}$ | $P_c = \frac{a+2c}{3}$ | Intermédiaire |
| **CPP** | $Q_{cpp} = \frac{a-c}{b}$ | $P_{cpp} = c$ | Nul |

**Relation** : $Q_m < Q_c < Q_{cpp}$ et $P_m > P_c > P_{cpp}$

---

# 8. MODÈLE DE COLLUSION (Cartel)

<aside>
💡

**INTUITION**

Si les firmes **coopèrent** et forment un **cartel**, elles peuvent maximiser leur profit joint en se comportant comme un monopole. Mais chaque firme a une incitation à **tricher** (produire plus que sa quota).

</aside>

## 8.1 Maximisation du Profit Joint

Le cartel maximise le profit total :

$$
\max_{q_1, q_2} \pi_1 + \pi_2 = P(Q)Q - C_1(q_1) - C_2(q_2)
$$

Si les firmes sont symétriques, elles se partagent la production monopole :

$$
q_1^{cartel} = q_2^{cartel} = \frac{Q_m}{2}
$$

## 8.2 Instabilité du Cartel

**Problème** : Chaque firme a intérêt à **dévier** (produire plus que son quota) si l'autre respecte l'accord.

**Exemple** : Si firme 2 produit $q_2^{cartel}$, la firme 1 peut augmenter son profit en produisant $q_1 > q_1^{cartel}$.

C'est un **dilemme du prisonnier** : l'équilibre de Nash (Cournot) domine l'accord de cartel.

<aside>
⚠️

**RÉSULTAT**

Les cartels sont **instables** sans mécanisme d'application (punitions, monitoring). C'est pourquoi ils sont souvent illégaux (lois antitrust).

</aside>

---

# 9. MODÈLE DE STACKELBERG (Leader-Suiveur)

## 9.1 Hypothèses

1. **Timing séquentiel** : La firme 1 (leader) choisit $q_1$ en premier
2. La firme 2 (suiveur) observe $q_1$ puis choisit $q_2$
3. Résolution par **induction à rebours** (backward induction)

## 9.2 Résolution

**Étape 1** : Le suiveur (firme 2) maximise son profit étant donné $q_1$ :

$$
q_2 = R_2(q_1) = \frac{a - c - bq_1}{2b}
$$

**Étape 2** : Le leader (firme 1) anticipe la réaction de 2 et maximise :

$$
\max_{q_1} \pi_1 = [a - b(q_1 + R_2(q_1))]q_1 - cq_1
$$

Substitution : $q_2 = \frac{a - c - bq_1}{2b}$

$$
\pi_1 = \left[a - b\left(q_1 + \frac{a - c - bq_1}{2b}\right)\right]q_1 - cq_1
$$

CPO : $\frac{d\pi_1}{dq_1} = 0$

**Résultat** : $q_1^S = \frac{a-c}{2b}$ (leader produit comme un monopole sur demande résiduelle)

$q_2^S = \frac{a-c}{4b}$ (suiveur produit moitié moins)

## 9.3 Comparaison

**Avantage du leader** : $\pi_1^S > \pi_1^C > \pi_2^S$

Le leader obtient un profit plus élevé qu'en Cournot, le suiveur moins.

---

# 10. MODÈLE DE BERTRAND (Concurrence en Prix)

## 10.1 Hypothèses

1. Les firmes choisissent **simultanément** leurs prix $p_1$ et $p_2$
2. Produit **homogène** : les consommateurs achètent chez la firme au prix le plus bas
3. Si $p_1 = p_2$, les consommateurs se partagent également

## 10.2 Paradoxe de Bertrand

<aside>
📐

**RÉSULTAT SURPRENANT**

L'**équilibre de Nash-Bertrand** avec deux firmes identiques et coûts marginaux constants $c$ est :

</aside>

$$
\boxed{p_1^* = p_2^* = c = Cm}
$$

**Profit** : $\pi_1 = \pi_2 = 0$ (comme en CPP !)

**Paradoxe** : Deux firmes suffisent pour obtenir le résultat de concurrence parfaite.

**Explication** : Si $p_1 > c$, la firme 2 peut fixer $p_2$ légèrement inférieur à $p_1$ et capter tout le marché. Par itération, on arrive à $p_1 = p_2 = c$.

<aside>
⚠️

**LIMITE DU MODÈLE**

En réalité, la concurrence en prix n'est jamais aussi féroce car :

- Produits différenciés (pas parfaitement homogènes)
- Contraintes de capacité
- Collusion tacite
</aside>

---

# 11. EXERCICE TYPE RÉSOLU

## 📝 ÉNONCÉ

Considérons un duopole de Cournot avec demande inverse $P = 100 - Q$ où $Q = q_1 + q_2$.

Les deux firmes ont des coûts marginaux constants : $Cm_1 = Cm_2 = 10$.

**Questions** :

1. Déterminer les fonctions de réaction $R_1(q_2)$ et $R_2(q_1)$
2. Calculer l'équilibre de Nash-Cournot $(q_1^*, q_2^*)$
3. Déterminer le prix d'équilibre $P^*$ et les profits
4. Comparer avec l'équilibre de monopole
5. Comparer avec l'équilibre de CPP

---

## ✅ SOLUTION DÉTAILLÉE

### **Question 1** : Fonctions de réaction

**Firme 1** : $\pi_1 = P(Q) \cdot q_1 - Cm_1 \cdot q_1 = (100 - q_1 - q_2)q_1 - 10q_1$

CPO : $\frac{\partial \pi_1}{\partial q_1} = 100 - 2q_1 - q_2 - 10 = 0$

$$
\boxed{R_1(q_2) = \frac{90 - q_2}{2} = 45 - \frac{q_2}{2}}
$$

Par symétrie :

$$
\boxed{R_2(q_1) = 45 - \frac{q_1}{2}}
$$

---

### **Question 2** : Équilibre de Nash-Cournot

À l'équilibre : $q_1^* = R_1(q_2^*)$ et $q_2^* = R_2(q_1^*)$

Par symétrie : $q_1^* = q_2^* = q^*$

Donc : $q^* = 45 - \frac{q^*}{2}$

$$
\frac{3q^*}{2} = 45 \implies q^* = 30
$$

$$
\boxed{q_1^* = q_2^* = 30}
$$

---

### **Question 3** : Prix et profits

**Production totale** : $Q^* = q_1^* + q_2^* = 60$

**Prix** : $P^* = 100 - Q^* = 100 - 60 = 40$

**Profit de chaque firme** :

$$
\pi_i^* = (P^* - Cm) \cdot q_i^* = (40 - 10) \times 30 = 900
$$

$$
\boxed{\pi_1^* = \pi_2^* = 900}
$$

---

### **Question 4** : Comparaison avec le monopole

**Monopole** : $\max_Q \pi = (100 - Q)Q - 10Q$

CPO : $100 - 2Q - 10 = 0 \implies Q_m = 45$

$$
P_m = 100 - 45 = 55
$$

$$
\pi_m = (55 - 10) \times 45 = 2025
$$

**Comparaison** : $Q_m = 45 < Q_c = 60$ et $P_m = 55 > P_c = 40$

---

### **Question 5** : Comparaison avec la CPP

**CPP** : $P = Cm \implies 100 - Q = 10 \implies Q_{cpp} = 90$

$$
P_{cpp} = 10, \quad \pi_{cpp} = 0
$$

**Tableau récapitulatif** :

| **Modèle** | **Production** | **Prix** | **Profit total** |
| --- | --- | --- | --- |
| Monopole | 45 | 55 | 2025 |
| Cournot | 60 | 40 | 1800 |
| CPP | 90 | 10 | 0 |

---

# 12. FLASHCARDS DE RÉVISION

- **Question 1 : Quelle est la condition d'équilibre du monopole ?**
    
    <aside>
    📝
    
    **Réponse** : $Rm = Cm$ avec $Rm = P(1 + 1/\varepsilon)$
    
    Le monopole produit moins que la CPP : $Rm < P$.
    
    </aside>
    
- **Question 2 : Pourquoi le monopole produit-il en zone élastique ?**
    
    <aside>
    📝
    
    **Réponse** : Car $Rm = P(1 + 1/\varepsilon) = Cm > 0$
    
    Donc $1 + 1/\varepsilon > 0$ ce qui implique $\varepsilon < -1$ (zone élastique).
    
    </aside>
    
- **Question 3 : Qu'est-ce que l'indice de Lerner ?**
    
    <aside>
    📝
    
    **Réponse** : $L = \frac{P - Cm}{P} = -\frac{1}{\varepsilon}$
    
    Mesure du pouvoir de marché : $L = 0$ (CPP) à $L \to 1$ (monopole pur).
    
    </aside>
    
- **Question 4 : Différence entre Cournot et Bertrand ?**
    
    <aside>
    📝
    
    **Réponse** :
    
    - **Cournot** : Concurrence en quantités → Profit positif
    - **Bertrand** : Concurrence en prix → Profit nul ($P = Cm$)
    </aside>
    
- **Question 5 : Pourquoi les cartels sont-ils instables ?**
    
    <aside>
    📝
    
    **Réponse** : Chaque firme a intérêt à **tricher** (produire plus que son quota) si les autres respectent l'accord.
    
    C'est un dilemme du prisonnier : équilibre de Nash ≠ optimum collectif.
    
    </aside>
    

---

# 13. CHEAT SHEET RÉCAPITULATIF

| **Structure** | **Condition équilibre** | **Production** | **Profit LT** |
| --- | --- | --- | --- |
| **CPP** | $P = Cm$ | Maximale | Nul |
| **Cournot** | $Rm_i = Cm_i$ pour chaque $i$ | Intermédiaire | Positif |
| **Stackelberg** | Leader > Suiveur | Entre Cournot et Monopole | $\pi_L > \pi_C > \pi_S$ |
| **Bertrand** | $p_1 = p_2 = Cm$ | Maximale (= CPP) | Nul |
| **Collusion** | Max profit joint | Minimale (= Monopole) | Maximal (instable) |
| **Monopole** | $Rm = Cm$, $Rm < P$ | Minimale | Maximal (stable) |

---

<aside>
⚡

**CLÉ DE COMPRÉHENSION : STRUCTURES DE MARCHÉ**

**Spectre** : CPP (efficace, profit nul) ← Bertrand ← Cournot ← Stackelberg ← Collusion ← Monopole (inefficace, profit max)

**Production** : Plus il y a de concurrence, plus la production est élevée et le prix bas.

**Efficacité** : Seule la CPP est socialement efficace (pas de perte sèche).

</aside>

---