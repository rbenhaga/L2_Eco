## 🎯 L'ESSENTIEL EN 3 LIGNES

> **Le surplus du consommateur mesure le "gain à l'échange" : la différence entre ce que le consommateur est** ***prêt à payer*** **(disposition marginale à payer) et ce qu'il** ***paie effectivement*** **(prix de marché).** C'est une **évaluation monétaire du bien-être**. Graphiquement, c'est l'**aire sous la courbe de demande et au-dessus du prix**. Formule : $CS = \int_{0}^{x_1^*} p_1(x) dx - p_1^* x_1^*$ où $p_1(x)$ est la demande inverse.
> 

---

## 1️⃣ INTUITION : LE GAIN À L'ÉCHANGE

<aside>
💡

**SITUATION DE BASE**

Imagine que tu veux acheter des **tickets de concert**. Tu es prêt à payer :

- **20€** pour le 1er ticket (tu en rêves !)
- **18€** pour le 2ème ticket
- **16€** pour le 3ème ticket
- **14€** pour le 4ème ticket
- etc.

Mais le **prix de marché** est seulement **14€**.

**Ton surplus** :

- Sur le 1er ticket : $20 - 14 = 6$€
- Sur le 2ème ticket : $18 - 14 = 4$€
- Sur le 3ème ticket : $16 - 14 = 2$€
- Sur le 4ème ticket : $14 - 14 = 0$€

**SURPLUS TOTAL** = $6 + 4 + 2 + 0 = 12$€

Tu gagnes **12€ de satisfaction nette** grâce à l'échange ! C'est ça, le surplus du consommateur.

</aside>

![image.png](attachment:af5b68f9-bf0f-4f91-be7a-42eb6cb21e15:image.png)

### Définition Formelle

**Disposition marginale à payer** (DMP) : le prix maximal que le consommateur accepte de payer pour une unité supplémentaire.

**Surplus sur l'unité** $x$ :

$$
Surplus(x) = DMP(x) - p^*
$$

où $p^*$ est le prix de marché.

**Surplus total** : somme des surplus sur toutes les unités achetées.

<aside>
📐

**PROPRIÉTÉ CLÉ**

Le consommateur achète jusqu'à ce que la disposition marginale à payer égale le prix de marché :

$$
DMP(x_1^*) = p_1^*
$$

Au-delà, le surplus devient négatif (DMP < prix), donc il n'achète plus.

</aside>

---

## 2️⃣ SURPLUS AVEC DEMANDE CONTINUE

### Passage au Continu

Quand on passe d'unités **discrètes** (tickets 1, 2, 3...) à une **quantité continue** $x_1$, la disposition marginale à payer devient la **demande inverse** $p_1(x_1)$.

**Demande inverse** : $p_1(x_1)$ donne le prix que le consommateur accepte de payer pour la quantité $x_1$.

**Relation avec la demande marshallienne** :

- Demande directe : $x_1(p_1, p_2, R)$ → quantité en fonction des prix
- Demande inverse : $p_1 = p_1(x_1)$ → prix en fonction de la quantité (on "inverse" la fonction)

### Formule du Surplus

**Surplus du consommateur** (Consumer Surplus = CS) :

$$
\boxed{CS = \int_{0}^{x_1^*} p_1(x) \, dx - p_1^* x_1^*}
$$

**Interprétation** :

- $\int_{0}^{x_1^*} p_1(x) dx$ : somme des dispositions marginales à payer (aire sous la demande inverse)
- $p_1^* x_1^*$ : dépense réelle
- **CS** = Disposition totale à payer - Dépense réelle = **Gain net**

**[GRAPHIQUE A INSERER : Courbe de demande inverse p₁(x₁) décroissante. Axe vertical : prix p₁. Axe horizontal : quantité x₁. Prix de marché p₁ *horizontal. Quantité optimale x₁* où demande coupe le prix. Aire sous la demande jusqu'à x₁ *= intégrale. Rectangle p₁* × x₁* = dépense. Triangle au-dessus du prix = surplus (hachuré).]**

<aside>
💡

**INTERPRÉTATION GÉOMÉTRIQUE**

Le surplus est l'**aire du triangle** entre :

- La courbe de demande (en haut)
- Le prix de marché (en bas)
- L'axe vertical (à gauche)
- La quantité optimale (à droite)

Formule simplifiée si demande **linéaire** :

$$
CS = \frac{1}{2} (p_{max} - p_1^*) \times x_1^*
$$

où $p_{max}$ est le prix d'ordonnée à l'origine (quand $x_1 = 0$).

</aside>

![image.png](attachment:2609360e-71d2-4bdd-84f2-7e9fc974e281:image.png)

---

## 3️⃣ SURPLUS ET FONCTION D'UTILITÉ QUASI-LINÉAIRE

<aside>
🔗

**LIEN PRÉPA → ÉCO**

Le surplus du consommateur se calcule facilement avec une fonction d'utilité **quasi-linéaire** :

$$
U(x_1, x_2) = v(x_1) + x_2
$$

C'est l'équivalent d'une **fonction linéaire par morceaux** en maths. Le bien $x_2$ joue le rôle de "numéraire" (unité monétaire).

</aside>

### Hypothèses

1. **Fonction d'utilité** : $U(x_1, x_2) = v(x_1) + x_2$
    - $v(x_1)$ est **strictement concave** : $v' > 0$, $v'' < 0$
    - $x_2$ est le **numéraire** (bien composite représentant "tout le reste")
2. **Prix normalisé** : On pose $p_2 = 1$
3. **Contrainte budgétaire** : $p_1 x_1 + x_2 = R$

### Optimisation

**Problème** :

$$
\max_{x_1, x_2} v(x_1) + x_2 \quad \text{s.c.} \quad p_1 x_1 + x_2 = R
$$

**Substitution** : $x_2 = R - p_1 x_1$

$$
\max_{x_1} v(x_1) + R - p_1 x_1
$$

**CPO** :

$$
v'(x_1^*) = p_1
$$

<aside>
✅

**INTERPRÉTATION**

Condition d'optimalité : $v'(x_1^*) = p_1$

**Mais** $v'(x_1)$ **est exactement la disposition marginale à payer !**

Donc : $p_1(x_1) = v'(x_1)$ est la **demande inverse**.

Et la condition devient : **DMP = Prix** ✓

</aside>

### Calcul du Surplus

**Utilité maximale** :

$$
U^* = v(x_1^*) + R - p_1 x_1^*
$$

**Définition du surplus** :

$$
\boxed{CS = v(x_1^*) - p_1 x_1^*}
$$

C'est exactement l'utilité nette retirée du bien $x_1$ après déduction de la dépense.

**Relation avec l'intégrale** :

Puisque $p_1(x) = v'(x)$ :

$$
\int_{0}^{x_1^*} p_1(x) dx = \int_{0}^{x_1^*} v'(x) dx = v(x_1^*) - v(0)
$$

Si $v(0) = 0$, alors :

$$
CS = \int_{0}^{x_1^*} p_1(x) dx - p_1 x_1^*
$$

On retrouve la formule générale !

<aside>
⚠️

**ATTENTION**

Le surplus $CS = v(x_1^*) - p_1 x_1^*$ ne dépend **pas du revenu** $R$ dans le cas quasi-linéaire !

C'est une propriété spéciale : pas d'**effet revenu** sur la demande de $x_1$ (effet revenu nul car l'utilité marginale du revenu est constante égale à 1).

</aside>

---

## 4️⃣ VARIATION DU SURPLUS

### Effet d'une Variation de Prix

Soit une hausse de prix : $p_1'$ → $p_1''$ avec $p_1'' > p_1'$.

La quantité consommée diminue : $x_1''$ < $x_1'$.

**Variation du surplus** :

$$
\Delta CS = CS'' - CS' = \int_{0}^{x_1''} p_1(x) dx - p_1'' x_1'' - \left(\int_{0}^{x_1'} p_1(x) dx - p_1' x_1'\right)
$$

En simplifiant :

$$
\Delta CS = -\int_{x_1''}^{x_1'} p_1(x) dx - p_1'' x_1'' + p_1' x_1'
$$

### Décomposition de la Perte

**Perte totale** = **Effet prix** + **Effet quantité**

1. **Effet prix (rectangle R)** :
    - Sur les unités encore consommées ($x_1''$), on paie plus cher
    - Perte = $(p_1'' - p_1') \times x_1''$
2. **Effet quantité (triangle T)** :
    - On renonce aux unités entre $x_1''$ et $x_1'$
    - Perte = $\int_{x_1''}^{x_1'} [p_1(x) - p_1''] dx$ (surplus perdu sur ces unités)

<aside>
💡

**INTERPRÉTATION**

Une **hausse de prix** :

- Diminue le surplus (perte de bien-être)
- La perte a deux composantes :
- **Rectangulaire** : surcout sur quantité maintenue
- **Triangulaire** : perte sur quantité abandonnée

C'est comme en physique quand tu décomposes un vecteur en composantes horizontale et verticale !

</aside>

![image.png](attachment:80185e72-a1fb-4234-9a1a-4a1e0f3c1243:image.png)

### Formule Approximative (Demande Linéaire)

Si la demande est linéaire, la perte de surplus est approximativement :

$$
\Delta CS \approx -\frac{1}{2}(p_1'' - p_1')(x_1' + x_1'')
$$

C'est l'aire du **trapèze**.

---

## 5️⃣ APPLICATIONS : TAXES, SUBVENTIONS, RATIONNEMENT

### A. Taxe sur un Bien

**Situation** : Le gouvernement impose une **taxe** $t$ par unité sur le bien $x_1$.

Le prix payé par le consommateur devient : $p_1 + t$.

**Effet sur le surplus** :

$$
\Delta CS = -\int_{x_1^{new}}^{x_1^{old}} p_1(x) dx - t \cdot x_1^{new}
$$

**Recette fiscale** : $T = t \times x_1^{new}$

**Perte sèche** (deadweight loss) : $DWL = |\Delta CS| - T$

C'est la **perte nette de bien-être** (le surplus perdu qui n'est récupéré par personne).

![image.png](attachment:73188288-d7e7-4f89-be78-ec8712f13610:image.png)

<aside>
✅

**EXEMPLE NUMÉRIQUE**

Demande : $p_1(x_1) = 100 - 2x_1$

Prix initial : $p_1 = 20$ → $x_1^{old} = 40$

Taxe : $t = 10$ → Prix après taxe : $p_1 + t = 30$ → $x_1^{new} = 35$

**Surplus avant taxe** :

$$
CS^{old} = \frac{1}{2}(100 - 20) \times 40 = 1600
$$

**Surplus après taxe** :

$$
CS^{new} = \frac{1}{2}(100 - 30) \times 35 = 1225
$$

**Perte de surplus** : $\Delta CS = 1225 - 1600 = -375$

**Recette fiscale** : $T = 10 \times 35 = 350$

**Perte sèche** : $DWL = 375 - 350 = 25$

</aside>

### B. Subvention

Une **subvention** $s$ par unité diminue le prix : $p_1 - s$.

**Effet** : le surplus augmente, mais coûte au gouvernement (financement par impôts ailleurs).

### C. Rationnement

**Situation** : Le gouvernement limite la quantité à $\bar{x}_1 < x_1^*$.

**Perte de surplus** :

$$
\Delta CS = -\int_{\bar{x}_1}^{x_1^*} [p_1(x) - p_1^*] dx
$$

C'est l'aire du **triangle** entre la demande et le prix, de $\bar{x}_1$ à $x_1^*$.

---

## 6️⃣ EXERCICE TYPE : FONCTION QUASI-LINÉAIRE

<aside>
⚡

**ÉNONCÉ**

Un consommateur a une fonction d'utilité :

$$
U(x_1, x_2) = 10\sqrt{x_1} + x_2
$$

Le prix du bien 1 est $p_1 = 4$, le prix du bien 2 est $p_2 = 1$, et le revenu est $R = 100$.

**Questions** :

1. Déterminer la demande optimale $x_1^*$ et $x_2^*$
2. Calculer le surplus du consommateur pour le bien 1
3. Si le prix du bien 1 augmente à $p_1' = 9$, quelle est la variation du surplus ?
</aside>

### 📝 SOLUTION DÉTAILLÉE

**ÉTAPE 1** : Déterminer la demande optimale

Fonction à maximiser (après substitution $x_2 = R - p_1 x_1$) :

$$
\max_{x_1} 10\sqrt{x_1} + 100 - 4x_1
$$

**CPO** :

$$
\frac{d}{dx_1}\left[10\sqrt{x_1} + 100 - 4x_1\right] = 0
$$

$$
\frac{10}{2\sqrt{x_1}} - 4 = 0
$$

$$
\frac{5}{\sqrt{x_1}} = 4 \quad \Rightarrow \quad \sqrt{x_1} = \frac{5}{4}
$$

$$
\boxed{x_1^* = \left(\frac{5}{4}\right)^2 = \frac{25}{16} = 1.5625}
$$

Puis :

$$
x_2^* = 100 - 4 \times 1.5625 = 100 - 6.25 = 93.75
$$

**ÉTAPE 2** : Calculer le surplus

$$
v(x_1) = 10\sqrt{x_1}
$$

Donc :

$$
CS = v(x_1^*) - p_1 x_1^* = 10\sqrt{1.5625} - 4 \times 1.5625
$$

$$
CS = 10 \times 1.25 - 6.25 = 12.5 - 6.25 = 6.25
$$

**ÉTAPE 3** : Variation du surplus si $p_1' = 9$

Nouvelle demande avec $p_1' = 9$ :

$$
\frac{5}{\sqrt{x_1'}} = 9 \quad \Rightarrow \quad \sqrt{x_1'} = \frac{5}{9}
$$

$$
x_1' = \left(\frac{5}{9}\right)^2 = \frac{25}{81} \approx 0.3086
$$

Nouveau surplus :

$$
CS' = 10\sqrt{0.3086} - 9 \times 0.3086 = 10 \times 0.5556 - 2.7778 = 5.556 - 2.778 = 2.778
$$

**Variation** :

$$
\Delta CS = CS' - CS = 2.778 - 6.25 = -3.472
$$

**Réponse** : Le surplus **diminue de 3.47** suite à la hausse de prix.

<aside>
🔗

**MÉTHODE EXPRESS**

Pour une fonction quasi-linéaire $v(x_1) = a\sqrt{x_1}$ :

**Demande** : Résoudre $v'(x_1) = p_1$

$$
\frac{a}{2\sqrt{x_1}} = p_1 \quad \Rightarrow \quad x_1^* = \left(\frac{a}{2p_1}\right)^2
$$

**Surplus** :

$$
CS = a\sqrt{x_1^*} - p_1 x_1^* = a \cdot \frac{a}{2p_1} - p_1 \cdot \frac{a^2}{4p_1^2} = \frac{a^2}{2p_1} - \frac{a^2}{4p_1} = \frac{a^2}{4p_1}
$$

Formule directe : $\boxed{CS = \frac{a^2}{4p_1}}$

Application : $CS = \frac{10^2}{4 \times 4} = \frac{100}{16} = 6.25$ ✓

Ton avantage prépa : ces formules ressemblent aux **dérivées de fonctions composées** !

</aside>

---

## 🎯 FLASHCARDS DE RÉVISION

- **Question 1** : Qu'est-ce que le surplus du consommateur ? Donnez la formule.
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Définition** : Le surplus mesure le **gain à l'échange**, c'est-à-dire la différence entre ce que le consommateur est prêt à payer (disposition marginale) et ce qu'il paie effectivement.
    
    **Formule** :
    
    $$
    CS = \int_{0}^{x_1^*} p_1(x) dx - p_1^* x_1^*
    $$
    
    **Interprétation géométrique** : Aire sous la courbe de demande inverse, au-dessus du prix de marché.
    
    **Formule triangle (demande linéaire)** :
    
    $$
    CS = \frac{1}{2}(p_{max} - p_1^*) \times x_1^*
    $$
    
    </aside>
    
- **Question 2** : Quelle est la relation entre demande inverse et disposition marginale à payer ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    La **demande inverse** $p_1(x_1)$ représente le prix que le consommateur est prêt à payer pour obtenir la quantité $x_1$.
    
    C'est **exactement** la **disposition marginale à payer** (DMP) pour l'unité $x_1$.
    
    **Relation avec fonction d'utilité quasi-linéaire** :
    
    Si $U = v(x_1) + x_2$, alors :
    
    $$
    p_1(x_1) = v'(x_1)
    $$
    
    La demande inverse est la **dérivée** de la sous-utilité $v(x_1)$.
    
    </aside>
    
- **Question 3** : Comment calculer le surplus avec une fonction d'utilité quasi-linéaire ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Pour $U(x_1, x_2) = v(x_1) + x_2$ avec $p_2 = 1$ :
    
    **Condition d'optimalité** :
    
    $$
    v'(x_1^*) = p_1
    $$
    
    **Surplus** :
    
    $$
    \boxed{CS = v(x_1^*) - p_1 x_1^*}
    $$
    
    **Propriété clé** : Le surplus ne dépend **pas du revenu** $R$ (pas d'effet revenu sur $x_1$).
    
    **Cas particulier** $v(x_1) = a\sqrt{x_1}$ :
    
    $$
    CS = \frac{a^2}{4p_1}
    $$
    
    </aside>
    
- **Question 4** : Quels sont les deux effets d'une hausse de prix sur le surplus ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Une hausse de prix $p_1' \to p_1''$ diminue le surplus selon deux composantes :
    
    **1. Effet prix (rectangle R)** :
    
    - Sur les unités encore consommées, le consommateur paie plus cher
    - Perte = $(p_1'' - p_1') \times x_1''$
    
    **2. Effet quantité (triangle T)** :
    
    - Perte de surplus sur les unités non consommées (entre $x_1''$ et $x_1'$)
    - Perte = $\int_{x_1''}^{x_1'} [p_1(x) - p_1''] dx$
    
    **Perte totale** = R + T
    
    </aside>
    
- **Question 5** : Qu'est-ce que la perte sèche (deadweight loss) suite à une taxe ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Définition** : La perte sèche est la **perte nette de bien-être** qui n'est récupérée par personne.
    
    **Calcul** :
    
    $$
    DWL = |\Delta CS| - \text{Recette fiscale}
    $$
    
    où :
    
    - $\Delta CS$ = perte de surplus du consommateur
    - Recette fiscale = $t \times x_1^{new}$
    
    **Interprétation** : C'est le "coût social" de la taxation (inefficience créée par la distorsion des comportements).
    
    **Forme géométrique** : Petit triangle entre la courbe de demande et la quantité échangée.
    
    </aside>
    

---

## 📊 CHEAT SHEET RÉCAPITULATIF

| **Concept** | **Formule** | **Interprétation** |
| --- | --- | --- |
| **Surplus général** | $CS = \int_{0}^{x_1^*} p_1(x) dx - p_1^* x_1^*$ | Aire sous demande - Dépense |
| **Surplus linéaire** | $CS = \frac{1}{2}(p_{max} - p_1^*) x_1^*$ | Aire du triangle |
| **Demande inverse** | $p_1(x) = v'(x)$ (si $U = v(x_1) + x_2$) | DMP = Dérivée de $v$ |
| **Surplus quasi-linéaire** | $CS = v(x_1^*) - p_1 x_1^*$ | Utilité nette du bien 1 |
| **Cas** $v = a\sqrt{x_1}$ | $CS = \frac{a^2}{4p_1}$ | Formule directe |
| **Condition optimalité** | $v'(x_1^*) = p_1$ ou $p_1(x_1^*) = p_1$ | DMP = Prix |
| **Variation surplus** | $\Delta CS < 0$ si $p_1 \uparrow$ | Perte = Rectangle + Triangle |
| **Recette taxe** | $T = t \times x_1^{new}$ | Ce que reçoit le gouvernement |
| **Perte sèche** | $`DWL = | Delta CS |

<aside>
✨

**CLÉS DU SUCCÈS**

1. **Demande inverse** = Disposition marginale à payer : $p_1(x)$ dit combien tu acceptes de payer
2. **Surplus = Aire** : Toujours visualiser graphiquement (triangle ou trapèze)
3. **Quasi-linéaire** : $CS = v(x_1^*) - p_1 x_1^*$ (pas d'effet revenu !)
4. **Formule directe** $v = a\sqrt{x_1}$ : $CS = \frac{a^2}{4p_1}$ (gain de temps massif)
5. **Variation** : Décomposer en effet prix (rectangle) + effet quantité (triangle)
6. **Perte sèche** : Ce qui est perdu ET non récupéré (inefficience pure)
</aside>

<aside>
🔗

**LIENS AVEC AUTRES MODULES**

- **MODULE 0** : Le surplus utilise la demande marshallienne $x_1(p_1, p_2, R)$ inversée
- **MODULE 2** : On peut calculer un "surplus intertemporel" (gains à l'épargne)
- **MODULE 4** : Surplus de marché = somme des surplus individuels
- **MODULE 6-7** : Surplus du consommateur vs surplus du producteur (commerce, monopole)
- **MACRO** : Bien-être social, politiques publiques, taxation optimale
</aside>

<aside>
📊

**EXERCICES TYPES**

**Type 1** : Fonction quasi-linéaire $U = v(x_1) + x_2$

- Trouver $x_1^*$ avec $v'(x_1^*) = p_1$
- Calculer $CS = v(x_1^*) - p_1 x_1^*$
- Analyser variation si prix change

**Type 2** : Demande inverse donnée $p_1(x_1) = a - bx_1$

- Trouver $x_1^*$ : résoudre $p_1(x_1^*) = p_1^*$
- Calculer $CS = \frac{1}{2}(a - p_1^*) x_1^*$

**Type 3** : Taxe ou subvention

- Nouveau prix : $p_1 + t$ (taxe) ou $p_1 - s$ (subvention)
- Nouvelle quantité : résoudre avec nouveau prix
- Calculer $\Delta CS$, recette fiscale $T$, perte sèche $DWL$
</aside>

---

**Suite du cours** : 

[MODULE 4 : Demande de Marché](https://www.notion.so/MODULE-4-Demande-de-March-430ea44267da4ce9b441ff2e3afce1b9?pvs=21)