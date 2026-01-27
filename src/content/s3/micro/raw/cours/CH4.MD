## 🎯 L'ESSENTIEL EN 3 LIGNES

> **La demande de marché est la somme horizontale des demandes individuelles**. L'élasticité-prix mesure la **sensibilité de la quantité demandée au prix** : $\varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q}$. Si $|\varepsilon_p| > 1$ : demande élastique (sensible au prix). Si $|\varepsilon_p| < 1$ : demande inélastique. L'élasticité-revenu $\varepsilon_R$ distingue les biens normaux ($\varepsilon_R > 0$) et inférieurs ($\varepsilon_R < 0$).
> 

---

## 1️⃣ AGRÉGATION DES DEMANDES INDIVIDUELLES

<aside>
💡

**INTUITION**

Imagine un marché avec **n consommateurs**. Chacun a sa propre demande individuelle $x_i(p_1, p_2, m_i)$ qui dépend de **ses** prix et **son** revenu.

La **demande de marché** $X^1(p_1, p_2)$ est simplement la **somme** de toutes les quantités que les consommateurs veulent acheter au prix $p_1$ :

$$
X^1 = \sum_{i=1}^{n} x_i^1
$$

C'est une **agrégation horizontale** : on additionne les quantités pour chaque niveau de prix.

</aside>

![image.png](attachment:9e94ac31-8fdc-4819-ae1b-9a19aea98ee2:image.png)

### Formalisation

Soit $n$ consommateurs avec des demandes individuelles :

$$
x_i^1(p_1, p_2, m_i) \quad \text{pour } i = 1, 2, ..., n
$$

**Demande de marché** (ou demande agrégée) :

$$
\boxed{X^1(p_1, p_2, m_1, ..., m_n) = \sum_{i=1}^{n} x_i^1(p_1, p_2, m_i)}
$$

<aside>
📐

**PROPRIÉTÉS**

1. **Additivité** : La demande de marché est linéaire dans les demandes individuelles
2. **Dépendance aux revenus** : En général, $X^1$ dépend de la **distribution** des revenus $(m_1, ..., m_n)$
3. **Consommateur représentatif** : Si tous les consommateurs ont les **mêmes préférences** et des **revenus identiques** $m$, alors :

$$
X^1(p_1, p_2, M) = n \cdot x^1(p_1, p_2, m)
$$

où $M = n \cdot m$ est le revenu total.

Dans ce cas, on peut écrire la demande de marché comme celle d'un **consommateur représentatif** avec revenu $M$.

</aside>

### Exemple Numérique

**Marché avec 2 consommateurs** :

- Consommateur 1 : $x_1^1(p_1) = 10 - p_1$ si $p_1 \leq 10$, sinon $x_1^1 = 0$
- Consommateur 2 : $x_2^1(p_1) = 20 - 2p_1$ si $p_1 \leq 10$, sinon $x_2^1 = 0$

**Demande de marché** :

Pour $p_1 \leq 10$ :

$$
X^1(p_1) = x_1^1 + x_2^1 = (10 - p_1) + (20 - 2p_1) = 30 - 3p_1
$$

Pour $p_1 > 10$ : $X^1(p_1) = 0$ (aucun consommateur n'achète)

<aside>
⚠️

**ATTENTION : KINK POINTS**

La demande de marché peut avoir des **points de cassure** ("kinks") là où certains consommateurs entrent ou sortent du marché.

Exemple : si le consommateur 1 n'achète que si $p_1 \leq 10$, la demande de marché change de pente à $p_1 = 10$.

</aside>

### Effet de Composition

**Définition** : L'effet de composition est le changement dans la demande de marché causé par une **modification de la distribution des revenus** (même si le revenu total reste constant).

**Exemple** :

- Situation A : 2 consommateurs avec $m_1 = m_2 = 50$ → Revenu total $M = 100$
- Situation B : 2 consommateurs avec $m_1 = 20$, $m_2 = 80$ → Revenu total $M = 100$

Même si $M$ est identique, la demande de marché peut être différente !

**Pourquoi ?** Parce que les effets revenu ne sont pas nécessairement linéaires (sauf pour les biens de Cobb-Douglas).

<aside>
🔗

**LIEN PRÉPA → ÉCO**

L'agrégation de demandes ressemble à la **somme vectorielle** en physique :

- En physique : $\vec{F}_{total} = \sum_i \vec{F}_i$ (principe de superposition)
- En économie : $X^1 = \sum_i x_i^1$ (agrégation des comportements)

Ton avantage prépa : cette intuition d'additionner des contributions individuelles !

</aside>

---

## 2️⃣ ÉLASTICITÉS DE LA DEMANDE

<aside>
💡

**INTUITION**

L'élasticité mesure la **sensibilité** de la demande à une variable (économique) :

- **Élasticité-prix** : "De combien la demande diminue si le prix augmente de 1% ?"
- **Élasticité-revenu** : "De combien la demande augmente si le revenu augmente de 1% ?"

L'élasticité est **sans unité** (pourcentage / pourcentage) : on peut comparer les élasticités du pain, des voitures, etc.

</aside>

### A. Élasticité-Prix de la Demande

**Définition** : L'élasticité-prix mesure la variation relative de la quantité demandée suite à une variation relative du prix.

$$
\boxed{\varepsilon_p = \frac{dQ/Q}{dP/P} = \frac{dQ}{dP} \cdot \frac{P}{Q}}
$$

**Interprétation** : Si $\varepsilon_p = -0.5$, une hausse de prix de **1%** entraîne une baisse de quantité de **0.5%**.

**Signe** : $\varepsilon_p < 0$ (toujours négatif car demande décroissante)

On parle souvent de la **valeur absolue** $|\varepsilon_p|$.

<aside>
📐

**CLASSIFICATION**

**Demande élastique** : $|\varepsilon_p| > 1$

- La quantité réagit **fortement** au prix
- Exemple : biens de luxe, voyages, loisirs
- Hausse de prix → Forte baisse de quantité → **Recette diminue**

**Demande inélastique** : $|\varepsilon_p| < 1$

- La quantité réagit **faiblement** au prix
- Exemple : biens de première nécessité (pain, essence, médicaments)
- Hausse de prix → Faible baisse de quantité → **Recette augmente**

**Demande à élasticité unitaire** : $|\varepsilon_p| = 1$

- Variation proportionnelle
- Hausse de prix → **Recette constante**

**Demande parfaitement inélastique** : $\varepsilon_p = 0$

- Quantité fixe (verticale)
- Exemple : médicaments vitaux

**Demande parfaitement élastique** : $\varepsilon_p = -\infty$

- Horizontale (prix fixé)
- Exemple : marché en concurrence parfaite
</aside>

### Relation entre Élasticité et Recette

**Recette totale** : $RT = P \times Q$

**Variation de la recette** :

$$
dRT = Q \cdot dP + P \cdot dQ = P \cdot Q \left(\frac{dP}{P} + \frac{dQ}{Q}\right)
$$

En réarrangeant :

$$
\frac{dRT}{RT} = \frac{dP}{P} + \frac{dQ}{Q} = \frac{dP}{P}(1 + \varepsilon_p)
$$

**Règle** :

- Si $|\varepsilon_p| > 1$ : hausse de prix → **recette diminue** ($1 + \varepsilon_p < 0$)
- Si $|\varepsilon_p| < 1$ : hausse de prix → **recette augmente** ($1 + \varepsilon_p > 0$)
- Si $|\varepsilon_p| = 1$ : hausse de prix → **recette constante** ($1 + \varepsilon_p = 0$)

<aside>
✅

**EXEMPLE : TAXE SUR L'ESSENCE**

L'essence a une demande **inélastique** à court terme : $\varepsilon_p \approx -0.2$.

Si le gouvernement augmente la taxe (donc le prix) de 10% :

- Quantité baisse de $0.2 \times 10\% = 2\%$
- Recette fiscale **augmente** (car $|\varepsilon_p| < 1$)

C'est pourquoi l'essence est fortement taxée : recette garantie même avec hausse de prix !

</aside>

### Calcul de l'Élasticité

**Cas 1 : Demande linéaire** $Q = a - bP$

$$
\frac{dQ}{dP} = -b
$$

Donc :

$$
\varepsilon_p = -b \cdot \frac{P}{Q} = -b \cdot \frac{P}{a - bP}
$$

**Propriété** : L'élasticité varie le long de la courbe !

- Si $P \to 0$ : $\varepsilon_p \to 0$ (inélastique)
- Si $P \to a/b$ : $\varepsilon_p \to -\infty$ (élastique)
- Au **milieu** de la courbe : $|\varepsilon_p| = 1$

**Cas 2 : Demande isoélastique** $Q = A \cdot P^{\varepsilon_p}$

$$
\frac{dQ}{dP} = A \cdot \varepsilon_p \cdot P^{\varepsilon_p - 1} = \varepsilon_p \cdot \frac{Q}{P}
$$

Donc :

$$
\varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q} = \varepsilon_p \quad \checkmark
$$

L'élasticité est **constante** le long de la courbe.

<aside>
🔗

**LIEN PRÉPA → ÉCO**

L'élasticité ressemble aux **dérivées logarithmiques** en maths :

$$
\varepsilon_p = \frac{d\ln Q}{d\ln P}
$$

C'est comme calculer la pente en **échelle log-log** ! Ton avantage prépa : tu connais déjà cette notion de sensibilité relative.

</aside>

### B. Élasticité-Revenu

**Définition** : L'élasticité-revenu mesure la sensibilité de la quantité demandée au revenu.

$$
\boxed{\varepsilon_R = \frac{dQ}{dR} \cdot \frac{R}{Q}}
$$

**Interprétation** : Si $\varepsilon_R = 1.5$, une hausse de revenu de **1%** entraîne une hausse de quantité de **1.5%**.

<aside>
📐

**CLASSIFICATION DES BIENS**

**Bien normal** : $\varepsilon_R > 0$

- La demande augmente avec le revenu
- Cas général pour la plupart des biens

**Bien de luxe** (ou bien supérieur) : $\varepsilon_R > 1$

- La demande augmente **plus que proportionnellement** au revenu
- Exemple : voyages, voitures de luxe, restaurants gastronomiques
- Part du budget consacrée au bien **augmente** avec le revenu

**Bien de nécessité** : $0 < \varepsilon_R < 1$

- La demande augmente **moins que proportionnellement** au revenu
- Exemple : pain, sel, produits de base
- Part du budget consacrée au bien **diminue** avec le revenu

**Bien inférieur** : $\varepsilon_R < 0$

- La demande **diminue** quand le revenu augmente
- Exemple : transports en commun, produits discount, alimentation bas de gamme
- Les consommateurs substituent vers des alternatives supérieures
</aside>

**Loi d'Engel** : Pour la plupart des biens, $\varepsilon_R$ varie avec le niveau de revenu.

Exemple : un bien peut être de luxe pour les pauvres ($\varepsilon_R > 1$) et de nécessité pour les riches ($\varepsilon_R < 1$).

### C. Élasticité Croisée

**Définition** : L'élasticité croisée mesure la sensibilité de la demande du bien 1 au prix du bien 2.

$$
\boxed{\varepsilon_{12} = \frac{dQ_1}{dP_2} \cdot \frac{P_2}{Q_1}}
$$

<aside>
📐

**CLASSIFICATION**

**Biens substituts** : $\varepsilon_{12} > 0$

- Hausse du prix du bien 2 → Hausse de la demande du bien 1
- Exemple : beurre et margarine, Coca et Pepsi
- Les consommateurs **substituent** vers le bien 1 quand 2 devient cher

**Biens complémentaires** : $\varepsilon_{12} < 0$

- Hausse du prix du bien 2 → Baisse de la demande du bien 1
- Exemple : café et sucre, voiture et essence
- Les biens sont consommés **ensemble**

**Biens indépendants** : $\varepsilon_{12} = 0$

- Le prix du bien 2 n'affecte pas la demande du bien 1
- Aucune relation de consommation
</aside>

**Application** : Les entreprises utilisent $\varepsilon_{12}$ pour :

- **Stratégie de prix** : baisser le prix d'un complément pour stimuler la demande
- **Analyse concurrentielle** : identifier les vrais concurrents (substituts avec $\varepsilon_{12}$ élevé)

---

## 3️⃣ ESTIMATION ÉCONOMÉTRIQUE

<aside>
💡

**EN PRATIQUE**

Comment estimer les élasticités dans le monde réel ? On utilise l'**économétrie** avec des données observées (prix, quantités, revenus).

</aside>

### Modèle Linéaire

**Spécification** : $Q = a - bP + cR$

**Élasticités** (varient avec P, Q, R) :

$$
\varepsilon_p = -b \cdot \frac{P}{Q} \quad \text{et} \quad \varepsilon_R = c \cdot \frac{R}{Q}
$$

### Modèle Log-Log (Isoélastique)

**Spécification** : $\ln(Q) = a + b\ln(P) + c\ln(R)$

**Avantage** : Les élasticités sont **directement** les coefficients !

$$
\boxed{\varepsilon_p = b \quad \text{et} \quad \varepsilon_R = c}
$$

**Interprétation** : Si on estime $\ln(Q) = 5 - 0.34\ln(P) + 1.32\ln(R)$, alors :

- $\varepsilon_p = -0.34$ (demande inélastique)
- $\varepsilon_R = 1.32$ (bien de luxe)

<aside>
✅

**EXEMPLE : DEMANDE DE LOGEMENT**

Une étude économétrique donne :

$$
\ln(Q_{logement}) = 2.3 - 0.8\ln(P_{loyer}) + 0.6\ln(R)
$$

**Résultats** :

- **Élasticité-prix** : $\varepsilon_p = -0.8$ → demande **inélastique** (nécessité)
- **Élasticité-revenu** : $\varepsilon_R = 0.6$ → bien **normal** mais pas de luxe

**Politique publique** : Une taxe sur les loyers augmentera les recettes (demande inélastique).

</aside>

<aside>
⚠️

**ATTENTION : BIAIS D'ENDOGÉNÉITÉ**

Problème : Les prix et quantités sont déterminés **simultanément** par l'offre ET la demande.

Solution : Utiliser des **variables instrumentales** ou des **expériences naturelles** pour identifier la demande.

Ce sera vu en détail en économétrie L3 !

</aside>

---

## 4️⃣ EXERCICE TYPE : ÉLASTICITÉS

<aside>
⚡

**ÉNONCÉ**

La demande de marché pour un bien est donnée par :

$$
Q = 100 - 2P + 0.5R
$$

où $Q$ est la quantité demandée, $P$ est le prix, et $R$ est le revenu moyen.

Actuellement : $P = 10$, $R = 200$.

**Questions** :

1. Calculer la quantité demandée actuelle
2. Calculer l'élasticité-prix de la demande au point actuel
3. Calculer l'élasticité-revenu de la demande
4. Classifier le bien (luxe, nécessité, inférieur)
5. Si le prix augmente de 10%, quelle sera la variation de la quantité ?
6. Si le prix augmente de 10%, que se passe-t-il pour la recette totale ?
</aside>

### 📝 SOLUTION DÉTAILLÉE

**ÉTAPE 1** : Quantité demandée actuelle

$$
Q = 100 - 2(10) + 0.5(200) = 100 - 20 + 100 = 180
$$

**ÉTAPE 2** : Élasticité-prix

$$
\frac{dQ}{dP} = -2
$$

Donc :

$$
\varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q} = -2 \cdot \frac{10}{180} = -0.111
$$

**ÉTAPE 3** : Élasticité-revenu

$$
\frac{dQ}{dR} = 0.5
$$

Donc :

$$
\varepsilon_R = 0.5 \cdot \frac{200}{180} = 0.556
$$

**ÉTAPE 4** : Classification

- $\varepsilon_R > 0$ → **Bien normal**
- $0 < \varepsilon_R < 1$ → **Bien de nécessité**
- $|\varepsilon_p| < 1$ → **Demande inélastique**

---

## 4️⃣ EXERCICE TYPE : ÉLASTICITÉS

<aside>
⚡

**ÉNONCÉ**

La demande de marché pour un bien est donnée par :

$$
Q = 100 - 2P + 0.5R
$$

où $Q$ est la quantité demandée, $P$ est le prix, et $R$ est le revenu moyen.

Actuellement : $P = 10$, $R = 200$.

**Questions** :

1. Calculer la quantité demandée actuelle
2. Calculer l'élasticité-prix de la demande au point actuel
3. Calculer l'élasticité-revenu de la demande
4. Classifier le bien (luxe, nécessité, inférieur)
5. Si le prix augmente de 10%, quelle sera la variation de la quantité ?
6. Si le prix augmente de 10%, que se passe-t-il pour la recette totale ?
</aside>

### 📝 SOLUTION DÉTAILLÉE

**ÉTAPE 1** : Quantité demandée actuelle

$$
Q = 100 - 2(10) + 0.5(200) = 100 - 20 + 100 = 180
$$

**ÉTAPE 2** : Élasticité-prix

$$
\frac{dQ}{dP} = -2
$$

Donc :

$$
\varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q} = -2 \cdot \frac{10}{180} = -\frac{20}{180} = -\frac{1}{9} \approx -0.111
$$

**ÉTAPE 3** : Élasticité-revenu

$$
\frac{dQ}{dR} = 0.5
$$

Donc :

$$
\varepsilon_R = \frac{dQ}{dR} \cdot \frac{R}{Q} = 0.5 \cdot \frac{200}{180} = \frac{100}{180} = \frac{5}{9} \approx 0.556
$$

**ÉTAPE 4** : Classification

- $\varepsilon_R > 0$ → **Bien normal**
- $0 < \varepsilon_R < 1$ → **Bien de nécessité** (pas de luxe)
- $|\varepsilon_p| < 1$ → **Demande inélastique**

**Interprétation** : C'est un bien essentiel (ex : alimentation de base) dont la demande réagit peu au prix.

**ÉTAPE 5** : Variation de quantité si prix augmente de 10%

Utiliser l'élasticité :

$$
\varepsilon_p = \frac{\Delta Q / Q}{\Delta P / P}
$$

Donc :

$$
\frac{\Delta Q}{Q} = \varepsilon_p \cdot \frac{\Delta P}{P} = -0.111 \times 10\% = -1.11\%
$$

**Réponse** : La quantité diminue de **1.11%**.

En valeur absolue :

$$
\Delta Q = -0.0111 \times 180 = -2 \text{ unités}
$$

Nouvelle quantité : $Q' = 180 - 2 = 178$

**ÉTAPE 6** : Effet sur la recette totale

**Recette initiale** : $RT = P \times Q = 10 \times 180 = 1800$

**Nouveau prix** : $P' = 11$ (hausse de 10%)

**Nouvelle quantité** : $Q' = 178$

**Nouvelle recette** : $RT' = 11 \times 178 = 1958$

**Variation** : $\Delta RT = 1958 - 1800 = 158$ (+8.8%)

**Conclusion** : La recette **augmente** car la demande est **inélastique** ($|\varepsilon_p| < 1$) ✓

<aside>
🔗

**FORMULE EXPRESS**

Pour une demande linéaire $Q = a - bP + cR$ :

$$
\varepsilon_p = -b \cdot \frac{P}{Q} \quad \text{et} \quad \varepsilon_R = c \cdot \frac{R}{Q}
$$

Ton avantage prépa : tu peux calculer ça **en 30 secondes** pendant l'examen en utilisant directement les coefficients !

</aside>

### Alternative : Vérification Directe

On peut aussi calculer la nouvelle quantité **directement** avec la formule :

$$
Q' = 100 - 2(11) + 0.5(200) = 100 - 22 + 100 = 178 \quad \checkmark
$$

Les deux méthodes donnent le même résultat !

---

## 🎴 FLASHCARDS

- **Question 1** : Qu'est-ce que la demande de marché ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    La demande de marché est l'**agrégation horizontale** des demandes individuelles :
    
    $$
    X^1(p_1, p_2) = \sum_{i=1}^{n} x_i^1(p_1, p_2, m_i)
    $$
    
    Pour chaque prix, on **additionne les quantités** que tous les consommateurs veulent acheter.
    
    </aside>
    
- **Question 2** : Définir l'élasticité-prix de la demande
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    L'élasticité-prix mesure la sensibilité de la quantité au prix :
    
    $$
    \varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q}
    $$
    
    **Interprétation** : Si $\varepsilon_p = -0.5$, une hausse de prix de 1% → baisse de quantité de 0.5%
    
    **Toujours négatif** (demande décroissante)
    
    </aside>
    
- **Question 3** : Demande élastique vs inélastique ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Demande élastique** : $|\varepsilon_p| > 1$
    
    - Quantité très sensible au prix
    - Hausse de prix → **Recette diminue**
    - Ex : biens de luxe, voyages
    
    **Demande inélastique** : $|\varepsilon_p| < 1$
    
    - Quantité peu sensible au prix
    - Hausse de prix → **Recette augmente**
    - Ex : essence, médicaments
    </aside>
    
- **Question 4** : Qu'est-ce qu'un bien de luxe ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Un bien de luxe a une **élasticité-revenu** $\varepsilon_R > 1$
    
    $$
    \varepsilon_R = \frac{dQ}{dR} \cdot \frac{R}{Q} > 1
    $$
    
    La demande augmente **plus que proportionnellement** au revenu.
    
    Exemples : voitures de luxe, restaurants gastronomiques, voyages
    
    </aside>
    
- **Question 5** : Qu'est-ce qu'un bien inférieur ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Un bien inférieur a $\varepsilon_R < 0$ : la demande **diminue** quand le revenu augmente.
    
    Les consommateurs substituent vers des alternatives supérieures.
    
    Exemples : transports en commun, produits discount, alimentation bas de gamme
    
    </aside>
    
- **Question 6** : Biens substituts vs complémentaires ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Biens substituts** : $\varepsilon_{12} > 0$
    
    - Hausse du prix du bien 2 → Hausse de la demande du bien 1
    - Ex : Coca et Pepsi
    
    **Biens complémentaires** : $\varepsilon_{12} < 0$
    
    - Hausse du prix du bien 2 → Baisse de la demande du bien 1
    - Ex : café et sucre
    </aside>
    
- **Question 7** : Comment estimer les élasticités en pratique ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Modèle log-log** : $\ln(Q) = a + b\ln(P) + c\ln(R)$
    
    Avantage : Les coefficients **sont directement** les élasticités !
    
    $$
    \varepsilon_p = b \quad \text{et} \quad \varepsilon_R = c
    $$
    
    Très utilisé en économétrie pour sa simplicité d'interprétation.
    
    </aside>
    
- **Question 8** : Pour une demande linéaire $Q = a - bP$, comment varie l'élasticité ?
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    L'élasticité **varie le long de la courbe** :
    
    $$
    \varepsilon_p = -b \cdot \frac{P}{a - bP}
    $$
    
    - Prix bas → demande **inélastique**
    - Prix élevés → demande **élastique**
    - Au milieu : $|\varepsilon_p| = 1$
    </aside>
    

---

## 📊 CHEAT SHEET

<aside>
🔥

**DEMANDE DE MARCHÉ - FORMULES ESSENTIELLES**

**Agrégation** :

$$
X^1 = \sum_{i=1}^{n} x_i^1
$$

**Élasticité-prix** :

$$
\varepsilon_p = \frac{dQ}{dP} \cdot \frac{P}{Q} < 0
$$

**Élasticité-revenu** :

$$
\varepsilon_R = \frac{dQ}{dR} \cdot \frac{R}{Q}
$$

**Élasticité croisée** :

$$
\varepsilon_{12} = \frac{dQ_1}{dP_2} \cdot \frac{P_2}{Q_1}
$$

**Relation recette** :

$$
\frac{dRT}{RT} = \frac{dP}{P}(1 + \varepsilon_p)
$$

**Modèle log-log** :

$$
\ln(Q) = a + \varepsilon_p \ln(P) + \varepsilon_R \ln(R)
$$

</aside>

<aside>
⚡

**CLASSIFICATION RAPIDE**

**Par élasticité-prix** :

- $|\varepsilon_p| > 1$ : Élastique (luxe)
- $|\varepsilon_p| < 1$ : Inélastique (nécessité)
- $|\varepsilon_p| = 1$ : Unitaire

**Par élasticité-revenu** :

- $\varepsilon_R > 1$ : Bien de **luxe**
- $0 < \varepsilon_R < 1$ : Bien de **nécessité**
- $\varepsilon_R < 0$ : Bien **inférieur**

**Par élasticité croisée** :

- $\varepsilon_{12} > 0$ : **Substituts**
- $\varepsilon_{12} < 0$ : **Complémentaires**
</aside>