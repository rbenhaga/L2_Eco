## 🎯 L'ESSENTIEL EN 3 LIGNES

> **Le consommateur maximise son utilité sous contrainte budgétaire.** L'équilibre est atteint quand le TMS (taux auquel il accepte de substituer un bien à l'autre) égale le rapport des prix. Mathématiquement : on résout avec le Lagrangien, et on obtient les demandes Marshalliennes $x_1^*(p_1, p_2, R)$ et $x_2^*(p_1, p_2, R)$.
> 

---

## 1️⃣ LA CONTRAINTE BUDGÉTAIRE

<aside>
💡

**INTUITION**

Le consommateur ne peut pas dépenser plus que son revenu. Avec un revenu $R$ et des prix $p_1, p_2$, l'ensemble des paniers accessibles forme une droite dans l'espace $(x_1, x_2)$. La pente de cette droite $-p_1/p_2$ représente le "taux de change" entre les deux biens : combien d'unités de bien 2 je dois sacrifier pour obtenir une unité de bien 1.

</aside>

<aside>
📐

**DÉFINITION RIGOUREUSE**

La **contrainte budgétaire** s'écrit :

$$
p_1 x_1 + p_2 x_2 \leq R
$$

Sous forme d'égalité (le consommateur dépense tout son revenu) :

$$
p_1 x_1 + p_2 x_2 = R
$$

En isolant $x_2$ (forme "droite de budget") :

$$
x_2 = \frac{R}{p_2} - \frac{p_1}{p_2} x_1
$$

- **Ordonnée à l'origine** : $R/p_2$ (quantité maximale de bien 2 si $x_1=0$)
- **Abscisse à l'origine** : $R/p_1$ (quantité maximale de bien 1 si $x_2=0$)
- **Pente** : $-p_1/p_2$ (taux d'échange marchand)
</aside>

![image.png](attachment:bdf17265-cf17-4317-b2b3-180dfe56d30b:image.png)

### 🔄 Déplacements de la Droite de Budget

| **Changement** | **Effet graphique** | **Interprétation** |
| --- | --- | --- |
| $R$ augmente | Translation parallèle vers le haut | Plus de pouvoir d'achat |
| $p_1$ augmente | Rotation autour de l'ordonnée (vers la gauche) | Bien 1 plus cher, moins accessible |
| $p_2$ augmente | Rotation autour de l'abscisse (vers le bas) | Bien 2 plus cher, moins accessible |
| Tous les prix $\times 2$ | Homothétie de centre O, rapport 1/2 | Équivalent à diviser $R$ par 2 |

<aside>
⚠️

**PIÈGE D'EXAMEN**

Si tous les prix ET le revenu sont multipliés par $\lambda > 0$, **la contrainte budgétaire ne change pas** (homogénéité de degré 0). Le consommateur peut toujours acheter exactement les mêmes paniers.

$$
\lambda p_1 x_1 + \lambda p_2 x_2 = \lambda R \iff p_1 x_1 + p_2 x_2 = R
$$

</aside>

---

## 2️⃣ LES PRÉFÉRENCES ET COURBES D'INDIFFÉRENCE

<aside>
💡

**INTUITION**

Une courbe d'indifférence regroupe tous les paniers qui donnent **le même niveau de satisfaction** au consommateur. Si tu es sur une courbe, tu es indifférent entre tous les points de cette courbe. Plus la courbe est éloignée de l'origine, plus le niveau de satisfaction est élevé.

</aside>

<aside>
📐

**AXIOMES DES PRÉFÉRENCES**

Pour modéliser rationnellement les choix, on impose 4 axiomes :

1. **Complétude** : Pour tous paniers A et B, soit A ≽ B, soit B ≽ A, soit les deux (indifférence)
2. **Réflexivité** : Tout panier A est au moins aussi bon que lui-même : A ≽ A
3. **Transitivité** : Si A ≽ B et B ≽ C, alors A ≽ C
4. **Monotonie (non-satiété locale)** : "Plus c'est mieux" → si $x' > x$, alors $x' \succ x$

Ces axiomes garantissent l'existence d'une **fonction d'utilité** $U(x_1, x_2)$ qui représente les préférences.

</aside>

## Propriétés des Courbes d'Indifférence

✅ **Décroissantes** : pour rester sur la même courbe, si $x_1$ augmente, $x_2$ doit diminuer

✅ **Convexes** : le consommateur préfère les paniers diversifiés aux paniers extrêmes

✅ **Ne se croisent jamais** : conséquence de la transitivité

✅ **Plus éloignées de l'origine = satisfaction plus élevée**

![image.png](attachment:932fdd0d-9098-4af1-8ac4-dd23fe1e8680:image.png)

### Cas Particuliers

- **Biens parfaitement substituables**
    - Courbes d'indifférence **linéaires** (pente constante)
    - Exemple : Coca vs Pepsi pour un consommateur indifférent
    - Fonction d'utilité : $U(x_1, x_2) = ax_1 + bx_2$
- **Biens parfaitement complémentaires**
    - Courbes d'indifférence en **"L"** (angles droits)
    - Exemple : chaussures gauches et droites
    - Fonction d'utilité : $U(x_1, x_2) = \min(x_1, x_2)$

---

## 3️⃣ LA FONCTION D'UTILITÉ

<aside>
📐

**DÉFINITION**

Une **fonction d'utilité** $U: \mathbb{R}^2_+ \to \mathbb{R}$ associe à chaque panier $(x_1, x_2)$ un nombre réel représentant le niveau de satisfaction.

**Important** : L'utilité est **ordinale** (seul l'ordre compte), pas cardinale. Si $U(A) > U(B)$, le consommateur préfère A à B, mais la différence numérique $U(A) - U(B)$ n'a pas de sens économique.

</aside>

### Fonctions d'Utilité Classiques

### 1. Cobb-Douglas

$$
U(x_1, x_2) = x_1^\alpha x_2^\beta \quad (\alpha, \beta > 0)
$$

- **Propriété** : Part constante du revenu dépensée pour chaque bien
- **Cas particulier** : Si $\alpha + \beta = 1$, on a $p_1 x_1^* = \alpha R$ et $p_2 x_2^* = \beta R$

### 2. Quasi-linéaire

$$
U(x_1, x_2) = v(x_1) + x_2
$$

où $v$ est souvent $\ln(x_1)$ ou $\sqrt{x_1}$

- **Propriété** : Pas d'effet revenu sur le bien 1 (seulement effet substitution)
- **Exemple** : $U(x_1, x_2) = \sqrt{x_1} + x_2$ (courante aux examens)

### 3. CES (Constant Elasticity of Substitution)

$$
U(x_1, x_2) = (x_1^\rho + x_2^\rho)^{1/\rho} \quad (\rho < 1, \rho \neq 0)
$$

- Généralise Cobb-Douglas, biens substituables et complémentaires

### Utilité Marginale

<aside>
📐

**DÉFINITION**

L'**utilité marginale** du bien $i$ est la variation d'utilité lorsqu'on consomme une unité supplémentaire de ce bien (toutes choses égales par ailleurs) :

$$
Um_{x_i} = \frac{\partial U}{\partial x_i}
$$

**Loi des utilités marginales décroissantes** : $\frac{\partial^2 U}{\partial x_i^2} < 0$ (la satisfaction d'une unité supplémentaire diminue)

</aside>

---

## 4️⃣ LE TAUX MARGINAL DE SUBSTITUTION (TMS)

<aside>
💡

**INTUITION**

Le TMS mesure **combien d'unités du bien 2 le consommateur accepte de sacrifier pour obtenir une unité supplémentaire du bien 1**, en restant sur la même courbe d'indifférence (même niveau de satisfaction).

C'est le "taux de change subjectif" du consommateur, à comparer au "taux de change objectif du marché" qui est $p_1/p_2$.

</aside>

<aside>
📐

**DÉFINITION MATHÉMATIQUE**

Le TMS est la **pente de la courbe d'indifférence** (en valeur absolue) :

$$
TMS_{1,2} = -\frac{dx_2}{dx_1}\bigg|_{U=\text{cste}} = \frac{Um_{x_1}}{Um_{x_2}} = \frac{\partial U/\partial x_1}{\partial U/\partial x_2}
$$

**Démonstration** : Sur une courbe d'indifférence, $dU = 0$. Or :

$$
dU = \frac{\partial U}{\partial x_1} dx_1 + \frac{\partial U}{\partial x_2} dx_2 = 0
$$

D'où :

$$
\frac{dx_2}{dx_1} = -\frac{\partial U/\partial x_1}{\partial U/\partial x_2}
$$

Donc :

$$
TMS_{1,2} = \frac{\partial U/\partial x_1}{\partial U/\partial x_2}
$$

</aside>

### Propriétés du TMS

1. **TMS décroissant** : convexité des préférences → plus on consomme de $x_1$, moins on est prêt à sacrifier de $x_2$
2. **Invariance par transformation monotone** : Si $V = f(U)$ avec $f' > 0$, alors $TMS_V = TMS_U$
3. **Cas Cobb-Douglas** : Pour $U = x_1^\alpha x_2^\beta$

$$
TMS = \frac{\alpha x_2}{\beta x_1}
$$

<aside>
⚡

**🔑 LIEN PRÉPA → ÉCO**

Le TMS est analogue au **gradient d'une surface de niveau** en mathématiques ou au **taux de transformation** en mécanique. C'est exactement la même notion que tu as déjà vue en prépa !

</aside>

---

## 5️⃣ L'ÉQUILIBRE DU CONSOMMATEUR

### Méthode 1 : Condition TMS = Rapport des Prix

<aside>
📐

**CONDITION D'OPTIMALITÉ**

Le consommateur maximise son utilité quand la courbe d'indifférence est **tangente** à la droite de budget :

$$
\boxed{TMS_{1,2} = \frac{p_1}{p_2}}
$$

Formes équivalentes :

$$
\frac{Um_{x_1}}{Um_{x_2}} = \frac{p_1}{p_2}
$$

$$
\frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}
$$

**Interprétation** : Le taux de substitution subjectif du consommateur égale le taux de substitution objectif du marché. Dernière formulation : "le dernier euro dépensé pour chaque bien apporte la même utilité marginale".

</aside>

![image.png](attachment:874187da-0515-4cdb-88b8-f11d8003f287:image.png)

### Méthode 2 : Lagrangien (Méthode PRÉPA)

<aside>
✅

**MÉTHODE LAGRANGIEN (TON ARME SECRÈTE)**

**Programme** :

$$
\max_{x_1, x_2} U(x_1, x_2) \quad \text{s.c.} \quad p_1 x_1 + p_2 x_2 = R
$$

**Étape 1** : Écrire le Lagrangien

$$
\mathcal{L}(x_1, x_2, \lambda) = U(x_1, x_2) + \lambda(R - p_1 x_1 - p_2 x_2)
$$

**Étape 2** : Conditions du Premier Ordre (CPO)

$$
\begin{cases}
\frac{\partial \mathcal{L}}{\partial x_1} = \frac{\partial U}{\partial x_1} - \lambda p_1 = 0 & (1) \\
\frac{\partial \mathcal{L}}{\partial x_2} = \frac{\partial U}{\partial x_2} - \lambda p_2 = 0 & (2) \\
\frac{\partial \mathcal{L}}{\partial \lambda} = R - p_1 x_1 - p_2 x_2 = 0 & (3)
\end{cases}
$$

**Étape 3** : De (1) et (2), on tire

$$
\lambda = \frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}
$$

D'où la condition TMS :

$$
\frac{Um_{x_1}}{Um_{x_2}} = \frac{p_1}{p_2}
$$

**Étape 4** : Résoudre le système pour obtenir $x_1^*(p_1, p_2, R)$ et $x_2^*(p_1, p_2, R)$

**Étape 5** : Vérifier les conditions du second ordre (Hessien bordé défini négatif)

</aside>

### 🎯 Exercice Type : Cobb-Douglas

**ÉNONCÉ** : Soit $U(x_1, x_2) = x_1^{0.4} x_2^{0.6}$ avec $p_1 = 2$, $p_2 = 3$, $R = 120$

Calculer les demandes optimales $x_1^*$ et $x_2^*$.

- **RÉSOLUTION COMPLÈTE**
    
    <aside>
    📝
    
    **Méthode directe** : Pour Cobb-Douglas $U = x_1^\alpha x_2^\beta$, on a toujours :
    
    $$
    p_1 x_1^* = \frac{\alpha}{\alpha + \beta} R
    $$
    
    $$
    p_2 x_2^* = \frac{\beta}{\alpha + \beta} R
    $$
    
    **Application** : Avec $\alpha = 0.4$, $\beta = 0.6$, $\alpha + \beta = 1$ :
    
    $$
    2 x_1^* = 0.4 \times 120 = 48
    $$
    
    $$
    x_1^* = 24
    $$
    
    $$
    3 x_2^* = 0.6 \times 120 = 72
    $$
    
    $$
    x_2^* = 24
    $$
    
    **Vérification** : $2 \times 24 + 3 \times 24 = 48 + 72 = 120$ ✅
    
    **Utilité maximale** : $U^* = 24^{0.4} \times 24^{0.6} = 24^1 = 24$
    
    </aside>
    
    <aside>
    ⚠️
    
    **PIÈGE FRÉQUENT**
    
    Pour Cobb-Douglas, **apprends par cœur la formule** :
    
    $$
    \boxed{p_i x_i^* = \frac{\alpha_i}{\sum_j \alpha_j} R}
    $$
    
    Gain de temps énorme aux examens !
    
    </aside>
    

---

## 6️⃣ DEMANDES MARSHALLIENNES VS HICKSIENNES

<aside>
📐

**DÉFINITIONS**

**Demandes Marshalliennes** $x_i^*(p_1, p_2, R)$ : résultent de la **maximisation de l'utilité** sous contrainte budgétaire.

$$
\max_{x_1, x_2} U(x_1, x_2) \quad \text{s.c.} \quad p_1 x_1 + p_2 x_2 = R
$$

**Demandes Hicksiennes** $h_i(p_1, p_2, \bar{U})$ : résultent de la **minimisation de la dépense** pour atteindre un niveau d'utilité donné $\bar{U}$.

$$
\min_{x_1, x_2} p_1 x_1 + p_2 x_2 \quad \text{s.c.} \quad U(x_1, x_2) = \bar{U}
$$

</aside>

### Dualité Primal-Dual

| **Caractéristique** | **Programme Primal (Marshall)** | **Programme Dual (Hicks)** |
| --- | --- | --- |
| **Objectif** | Maximiser $U$ | Minimiser $C = p_1 x_1 + p_2 x_2$ |
| **Contrainte** | $p_1 x_1 + p_2 x_2 = R$ | $U(x_1, x_2) = \bar{U}$ |
| **Résultat** | Demandes Marshalliennes $x_i^*(p, R)$ | Demandes Hicksiennes $h_i(p, \bar{U})$ |
| **Fonction associée** | Utilité indirecte $V(p, R)$ | Fonction de dépense $e(p, \bar{U})$ |

### Liens Fondamentaux

$$
h_i(p_1, p_2, \bar{U}) = x_i^*(p_1, p_2, e(p_1, p_2, \bar{U}))
$$

$$
x_i^*(p_1, p_2, R) = h_i(p_1, p_2, V(p_1, p_2, R))
$$

---

## 7️⃣ ÉLASTICITÉS

<aside>
💡

**INTUITION**

L'élasticité mesure la **sensibilité en pourcentage** d'une variable à la variation d'une autre. C'est un outil sans dimension, comparable entre biens et pays.

</aside>

### Élasticité-Prix de la Demande

$$
\varepsilon_{x_i, p_i} = \frac{\partial x_i}{\partial p_i} \cdot \frac{p_i}{x_i} = \frac{\text{variation en % de } x_i}{\text{variation en % de } p_i}
$$

**Interprétation** :

- $|\varepsilon| > 1$ : Demande **élastique** (sensible au prix) → bien de luxe
- $|\varepsilon| < 1$ : Demande **inélastique** (peu sensible au prix) → bien de première nécessité
- $|\varepsilon| = 1$ : Élasticité unitaire

### Élasticité-Revenu

$$
\varepsilon_{x_i, R} = \frac{\partial x_i}{\partial R} \cdot \frac{R}{x_i}
$$

**Interprétation** :

- $\varepsilon > 0$ : Bien **normal** (demande augmente avec le revenu)
    - Si $\varepsilon > 1$ : Bien de **luxe**
    - Si $0 < \varepsilon < 1$ : Bien de **nécessité**
- $\varepsilon < 0$ : Bien **inférieur** (demande diminue avec le revenu)

---

## 🔄 FLASHCARDS DE RÉVISION

- **Question 1 : Quelle est l'équation de la contrainte budgétaire ?**
    
    <aside>
    📝
    
    **Réponse** : $p_1 x_1 + p_2 x_2 = R$ ou sous forme de droite : $x_2 = \frac{R}{p_2} - \frac{p_1}{p_2} x_1$
    
    </aside>
    
- **Question 2 : Définir le TMS et donner sa formule**
    
    <aside>
    📝
    
    **Réponse** : Le TMS mesure le taux auquel le consommateur accepte de substituer le bien 2 au bien 1 en restant sur la même courbe d'indifférence.
    
    $$
    TMS_{1,2} = \frac{Um_{x_1}}{Um_{x_2}} = \frac{\partial U/\partial x_1}{\partial U/\partial x_2}
    $$
    
    </aside>
    
- **Question 3 : Condition d'optimalité du consommateur ?**
    
    <aside>
    📝
    
    **Réponse** : $TMS = \frac{p_1}{p_2}$ ou de manière équivalente : $\frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}$
    
    </aside>
    
- **Question 4 : Formule Cobb-Douglas** $U = x_1^\alpha x_2^\beta$ **?**
    
    <aside>
    📝
    
    **Réponse** : $p_1 x_1^* = \frac{\alpha}{\alpha + \beta} R$ et $p_2 x_2^* = \frac{\beta}{\alpha + \beta} R$
    
    Si $\alpha + \beta = 1$ : $p_1 x_1^* = \alpha R$ et $p_2 x_2^* = \beta R$
    
    </aside>
    
- **Question 5 : Différence Marshall vs Hicks ?**
    
    <aside>
    📝
    
    **Réponse** :
    
    - **Marshall** : Max $U$ s.c. budget → demandes $x_i^*(p, R)$
    - **Hicks** : Min dépense s.c. utilité $\bar{U}$ → demandes $h_i(p, \bar{U})$
    </aside>
    

---

## 📊 LA CHEAT SHEET

| **Concept** | **Formule** | **Interprétation** |
| --- | --- | --- |
| Contrainte budgétaire | $p_1 x_1 + p_2 x_2 = R$ | Le consommateur dépense tout son revenu |
| TMS | $\frac{Um_{x_1}}{Um_{x_2}}$ | Taux de substitution subjectif |
| Condition optimalité | $TMS = \frac{p_1}{p_2}$ | Tangence CI/budget |
| Cobb-Douglas | $p_i x_i^* = \frac{\alpha_i}{\sum \alpha} R$ | Part constante du revenu |
| Élasticité-prix | $\frac{\partial x_i}{\partial p_i} \frac{p_i}{x_i}$ | Sensibilité au prix (en %) |
| Élasticité-revenu | $\frac{\partial x_i}{\partial R} \frac{R}{x_i}$ | Sensibilité au revenu (en %) |

---

**Suite du cours** : 

[MODULE 1 : Arbitrage Travail-Loisir](https://www.notion.so/MODULE-1-Arbitrage-Travail-Loisir-2bff9caeaca98106b05cea26d83fbeec?pvs=21)