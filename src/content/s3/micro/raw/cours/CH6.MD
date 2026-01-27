## 🎯 L'ESSENTIEL EN 3 LIGNES

> **En concurrence parfaite (CPP), les firmes sont price-takers** : elles subissent le prix du marché. **Court terme** : la firme produit si $P \geq \min CVM$ (coût variable moyen), ferme sinon. **Long terme** : libre entrée/sortie → profit nul → $P = \min CM$. L'offre de la branche est la **somme horizontale** des offres individuelles. Le surplus du producteur mesure $SP = \pi + CF$.
> 

---

# 1. LA CONCURRENCE PARFAITE : RAPPELS

## 1.1 Les 5 Hypothèses de la CPP

<aside>
💡

**INTUITION**

La CPP est le **marché de référence** en microéconomie. C'est un marché où aucun agent (ni producteur, ni consommateur) n'a de pouvoir de marché. Chaque firme est trop petite par rapport au marché pour influencer le prix.

</aside>

<aside>
📐

**LES 5 HYPOTHÈSES**

1. **Atomicité** : Grand nombre de petits producteurs et consommateurs
2. **Homogénéité** : Produit parfaitement identique (pas de différenciation)
3. **Libre entrée/sortie** : Aucune barrière à l'entrée ou à la sortie du marché
4. **Information parfaite** : Tous les agents connaissent les prix et les caractéristiques
5. **Mobilité parfaite** : Les facteurs de production (L, K) sont parfaitement mobiles
</aside>

## 1.2 Conséquence : La Firme est Price-Taker

**Résultat fondamental** : En CPP, chaque firme subit le prix du marché $P$ et ne peut pas l'influencer.

La **demande perçue** par la firme est **horizontale** (parfaitement élastique) au prix $P$ :

$$
Rm = P = \text{constante}
$$

Où $Rm$ est la recette marginale.

[GRAPHIQUE À INSÉRER : Deux graphiques côte à côte. **Gauche** : "Marché" avec axes (Q, P), courbe de demande décroissante D et courbe d'offre croissante S se croisant en équilibre $(Q^*, P^*)$. **Droite** : "Firme individuelle" avec axes (q, P), demande horizontale à $P^*$ (droite parfaitement élastique). La firme prend $P^*$ comme donné et choisit $q$.]

<aside>
⚠️

**PIÈGE FRÉQUENT**

Ne pas confondre :

- **Demande de marché** : Décroissante (loi de la demande)
- **Demande perçue par la firme** : Horizontale (price-taker)
</aside>

---

# 2. MAXIMISATION DU PROFIT EN CPP

## 2.1 Le Programme de la Firme

<aside>
📐

**PROGRAMME**

La firme choisit la quantité $q$ qui maximise son profit :

</aside>

$$
\max_q \pi(q) = R(q) - C(q) = P \cdot q - C(q)
$$

Où :

- $R(q) = P \cdot q$ : Recette totale
- $C(q)$ : Coût total
- $P$ : Prix de marché (exogène pour la firme)

## 2.2 Conditions d'Optimalité

**Condition de premier ordre (CPO)** :

$$
\frac{d\pi}{dq} = 0 \iff P - Cm(q) = 0
$$

$$
\boxed{P = Cm(q)}
$$

**Condition de second ordre (CSO)** :

$$
\frac{d^2\pi}{dq^2} < 0 \iff -Cm'(q) < 0 \iff Cm'(q) > 0
$$

La courbe de coût marginal doit être **croissante** au point optimal.

<aside>
💡

**INTUITION**

En CPP, $Rm = P$ (constant). Donc la condition $Rm = Cm$ devient $P = Cm$. La firme produit jusqu'à ce que le prix égalise le coût de production de la dernière unité.

</aside>

---

# 3. OFFRE DE COURT TERME DE LA FIRME

## 3.1 Décision de Production

Au court terme, au moins un facteur est **fixe** (généralement le capital K). La firme a des **coûts fixes** $CF$ qui ne peuvent être évités même si $q = 0$.

**Structure des coûts de court terme** :

$$
CT(q) = CF + CV(q)
$$

Où :

- $CF$ : Coûts fixes (indépendants de q)
- $CV(q)$ : Coûts variables (dépendent de q)

<aside>
📐

**RÈGLE DE DÉCISION (COURT TERME)**

La firme compare le prix $P$ aux coûts moyens :

**Trois cas possibles** :

1. **Si** $P > CM$ : Profit positif ($\pi > 0$) → **Produire** $q^*$ tel que $P = Cm$
2. **Si** $CVM < P < CM$ : Perte inférieure à CF ($-CF < \pi < 0$) → **Produire** $q^*$ (minimiser la perte)
3. **Si** $P < CVM$ : Perte supérieure à CF ($\pi < -CF$) → **Fermer** temporairement ($q = 0$)
</aside>

**Pourquoi produire si** $CVM < P < CM$ **?**

Si la firme produit : $\pi = Pq - CF - CV = (P - CVM)q - CF$

Si $P > CVM$, alors $(P - CVM)q > 0$, donc $\pi > -CF$.

La firme **couvre tous ses coûts variables** et une **partie de ses coûts fixes**. C'est mieux que de fermer (perte = $-CF$).

## 3.2 Prix de Fermeture

<aside>
📐

**DÉFINITION**

Le **prix de fermeture** $P_f$ est le seuil en-dessous duquel la firme ferme temporairement :

</aside>

$$
P_f = \min CVM
$$

- Si $P < P_f$ : la firme **ferme** ($q = 0$)
- Si $P \geq P_f$ : la firme **produit** selon $P = Cm$

## 3.3 Courbe d'Offre de Court Terme

<aside>
📐

**DÉFINITION**

La **courbe d'offre de court terme** de la firme est :

</aside>

$$
q^S_{CT}(P) = \begin{cases}
0 & \text{si } P < \min CVM \\
q^* \text{ tel que } P = Cm(q^*) & \text{si } P \geq \min CVM
\end{cases}
$$

C'est la portion de la courbe $Cm$ **au-dessus** du minimum de $CVM$.

[GRAPHIQUE À INSÉRER : Plan (q, P). Tracer trois courbes en forme de U : $CM$ (coût moyen), $CVM$ (coût variable moyen), et $Cm$ (coût marginal croissant). Marquer le point A au minimum de $CVM$ (prix de fermeture $P_f$). La courbe d'offre de court terme est la portion ÉPAISSE de $Cm$ au-dessus de A (en rouge/gras). Zones colorées : (1) Si $P < P_f$ : zone grise = fermeture. (2) Si $P_f < P < \min CM$ : zone orange = production à perte. (3) Si $P > \min CM$ : zone verte = profit positif.]

<aside>
⚠️

**PIÈGE FRÉQUENT**

**Fermeture ≠ Sortie du marché**

- **Fermeture** (court terme) : La firme ne produit plus ($q = 0$) mais reste dans l'industrie et conserve ses coûts fixes.
- **Sortie** (long terme) : La firme quitte définitivement l'industrie.
</aside>

---

# 4. OFFRE DE LONG TERME DE LA FIRME

## 4.1 Différence Court Terme vs Long Terme

Au **long terme**, tous les facteurs sont **variables** (L et K). Il n'y a plus de coûts fixes :

$$
CT_{LT}(q) = CV_{LT}(q)
$$

(Tous les coûts sont variables au long terme)

**Profit de long terme** :

$$
\pi_{LT}(q) = Pq - C_{LT}(q)
$$

## 4.2 Décision de Production

<aside>
📐

**RÈGLE DE DÉCISION (LONG TERME)**

La firme ne produit que si elle peut couvrir **tous** ses coûts :

- **Si** $P \geq CM_{LT}$ : Produire $q^*$ tel que $P = Cm_{LT}$
- **Si** $P < CM_{LT}$ : **Sortir du marché** (quitter l'industrie définitivement)
</aside>

Au long terme, il n'y a plus de distinction entre CF et CV, donc le seuil est $\min CM$ (et non $\min CVM$).

## 4.3 Courbe d'Offre de Long Terme

<aside>
📐

**DÉFINITION**

La **courbe d'offre de long terme** de la firme est :

</aside>

$$
q^S_{LT}(P) = \begin{cases}
0 & \text{si } P < \min CM_{LT} \\
q^* \text{ tel que } P = Cm_{LT}(q^*) & \text{si } P \geq \min CM_{LT}
\end{cases}
$$

C'est la portion de la courbe $Cm_{LT}$ **au-dessus** du minimum de $CM_{LT}$.

[GRAPHIQUE À INSÉRER : Plan (q, P). Tracer $CM_{LT}$ et $Cm_{LT}$ (en forme de U). Marquer le point B au minimum de $CM_{LT}$ (prix de sortie). La courbe d'offre de long terme est la portion de $Cm_{LT}$ au-dessus de B (en bleu épais). Zones : (1) Si $P < \min CM_{LT}$ : sortie du marché. (2) Si $P \geq \min CM_{LT}$ : production.]

<aside>
⚠️

**COMPARAISON CT vs LT**

</aside>

| Concept | Court Terme | Long Terme |
| --- | --- | --- |
| **Seuil** | $P_f = \min CVM$ | $P_s = \min CM_{LT}$ |
| **Décision** | Fermeture temporaire | Sortie définitive |
| **Coûts fixes** | Existent (CF > 0) | N'existent pas (CF = 0) |

---

# 5. OFFRE DE LA BRANCHE

## 5.1 Agrégation des Offres Individuelles

<aside>
📐

**DÉFINITION**

L'**offre de la branche** (industrie) est la **somme horizontale** des offres individuelles des $n$ firmes présentes sur le marché :

</aside>

$$
Q^S(P) = \sum_{i=1}^{n} q_i^S(P)
$$

Pour chaque prix $P$, on additionne les quantités offertes par toutes les firmes.

**Procédure graphique** : Pour un prix donné, on somme les abscisses (quantités) de chaque courbe d'offre individuelle.

## 5.2 Court Terme vs Long Terme

**Court terme** :

- Nombre de firmes $n$ **fixe** (pas d'entrée/sortie possible)
- Offre de la branche : $Q^S_{CT}(P) = \sum_{i=1}^{n} q_i^S(P)$

**Long terme** :

- Nombre de firmes $n$ **variable** (libre entrée/sortie)
- Si $P > \min CM$ : nouvelles firmes **entrent** → $n$ augmente → $Q^S$ augmente
- Si $P < \min CM$ : firmes **sortent** → $n$ diminue → $Q^S$ diminue

## 5.3 Élasticité de l'Offre

<aside>
📐

**DÉFINITION**

L'**élasticité-prix de l'offre** mesure la sensibilité de la quantité offerte au prix :

</aside>

$$
\varepsilon_S = \frac{dQ^S}{dP} \cdot \frac{P}{Q^S} = \frac{\Delta Q^S / Q^S}{\Delta P / P}
$$

**Interprétation** :

- $\varepsilon_S > 0$ toujours (offre croissante)
- $\varepsilon_S > 1$ : offre **élastique** (variation de Q > variation de P)
- $\varepsilon_S < 1$ : offre **inélastique** (variation de Q < variation de P)

---

# 6. ÉQUILIBRE DE LONG TERME

## 6.1 Théorème Fondamental

<aside>
📐

**THÉORÈME (ÉQUILIBRE DE LONG TERME EN CPP)**

À l'équilibre de long terme en CPP :

1. **Profit économique nul** : $\pi = 0$ pour toutes les firmes
2. **Prix = Coût moyen minimum** : $P^* = \min CM_{LT}$
3. **Production efficace** : Chaque firme produit au minimum de $CM_{LT}$
</aside>

**Pourquoi le profit est-il nul ?**

Le mécanisme de **libre entrée/sortie** ajuste le nombre de firmes jusqu'à ce que le profit soit nul :

- Si $\pi > 0$ → Nouvelles firmes **entrent** → Offre $Q^S$ augmente → Prix $P$ baisse → $\pi$ diminue
- Si $\pi < 0$ → Firmes **sortent** → Offre $Q^S$ diminue → Prix $P$ monte → $\pi$ augmente
- À l'équilibre : $\pi = 0$ → Plus d'incitation à entrer ou sortir

## 6.2 Conditions d'Équilibre

<aside>
📐

**CONDITIONS**

L'équilibre de long terme satisfait :

</aside>

$$
\begin{cases}
P = Cm_{LT}(q^*) & \text{(maximisation du profit)} \\
P = CM_{LT}(q^*) & \text{(profit nul)} \\
Q^D(P^*) = Q^S(P^*) & \text{(équilibre offre = demande)}
\end{cases}
$$

Les deux premières conditions impliquent : $Cm_{LT} = CM_{LT}$ → Production au **minimum de** $CM_{LT}$.

[GRAPHIQUE À INSÉRER : Plan (q, P) pour une firme. Tracer $CM_{LT}$ et $Cm_{LT}$ en forme de U. Point d'équilibre au **minimum** de $CM_{LT}$ où $Cm = CM = P^*$. À ce point : rectangle de recette $P^* q^*$ = rectangle de coût total $CM \cdot q^*$ → profit nul. Ajouter des flèches indiquant : (1) Si $P > P^*$ : profit positif → entrée de nouvelles firmes → P baisse. (2) Si $P < P^*$ : pertes → sortie de firmes → P monte. L'équilibre est stable.]

<aside>
💡

**INTUITION**

Le long terme en CPP impose une **discipline de marché** : seules les firmes qui produisent au coût minimum peuvent survivre. C'est un résultat d'**efficacité productive**.

</aside>

---

# 7. SURPLUS DU PRODUCTEUR

## 7.1 Définition

<aside>
💡

**INTUITION**

Le **surplus du producteur** mesure le gain des firmes au-dessus de leur coût variable. C'est la différence entre ce que les firmes reçoivent (recette) et ce qu'elles auraient été prêtes à accepter au minimum (coût variable).

</aside>

<aside>
📐

**DÉFINITION**

Le surplus du producteur est l'aire **entre le prix de marché et la courbe d'offre** :

</aside>

$$
SP = \int_0^{Q^*} \left(P^* - Cm(q)\right) dq
$$

Ou de manière équivalente :

$$
SP = P^* Q^* - CV(Q^*)
$$

Où :

- $P^* Q^*$ = Recette totale
- $CV(Q^*)$ = Coût variable total

## 7.2 Relation avec le Profit

**Lien entre SP et profit** :

$$
\pi = R - CT = R - CF - CV = (R - CV) - CF = SP - CF
$$

Donc :

$$
\boxed{SP = \pi + CF}
$$

**Interprétation** : Le surplus du producteur inclut le profit **plus** les coûts fixes.

## 7.3 Court Terme vs Long Terme

**Court terme** :

$$
SP_{CT} = P^* Q^* - CV(Q^*) = \pi + CF
$$

Le surplus est positif même si $\pi < 0$ (tant que $\pi > -CF$).

**Long terme** :

À l'équilibre de long terme, $P^* = \min CM_{LT}$ et $\pi = 0$, et $CF = 0$ :

$$
SP_{LT} = \pi + CF = 0 + 0 = 0
$$

(Pas de surplus à l'équilibre de long terme)

[GRAPHIQUE À INSÉRER : Plan (Q, P). Tracer courbe d'offre croissante S et demande décroissante D, équilibre en $(Q^*, P^*)$. Le surplus du producteur est la **zone triangulaire** entre l'axe des prix (ou le point de départ de l'offre) et le prix $P^*$, de $Q = 0$ à $Q = Q^*$, SOUS la ligne $P^*$ et AU-DESSUS de la courbe d'offre. Colorier cette zone en vert ou orange. Annoter : "SP = aire entre prix et offre".]

---

# 8. EXERCICE TYPE RÉSOLU

## 📝 ÉNONCÉ

Une firme en concurrence parfaite a une fonction de coût total de court terme :

$$
CT(q) = 100 + 20q + 2q^2
$$

**Questions** :

1. Calculer $CF$, $CV(q)$, $CM(q)$, $CVM(q)$, $Cm(q)$
2. Déterminer la fonction d'offre de court terme
3. Si $P = 40$, quelle quantité produit la firme ? Quel est son profit ?
4. Quel est le prix de fermeture ?
5. À long terme, si $P = 40$, que se passe-t-il ?

---

## ✅ SOLUTION DÉTAILLÉE

### **Question 1** : Calcul des coûts

**Coût fixe** :

$$
CF = 100
$$

**Coût variable** :

$$
CV(q) = 20q + 2q^2
$$

**Coût moyen** :

$$
CM(q) = \frac{CT(q)}{q} = \frac{100 + 20q + 2q^2}{q} = \frac{100}{q} + 20 + 2q
$$

**Coût variable moyen** :

$$
CVM(q) = \frac{CV(q)}{q} = \frac{20q + 2q^2}{q} = 20 + 2q
$$

**Coût marginal** :

$$
Cm(q) = \frac{dCT}{dq} = 20 + 4q
$$

---

### **Question 2** : Offre de court terme

La firme produit si $P = Cm$ et $P \geq \min CVM$.

**Minimum de CVM** :

$$
\frac{dCVM}{dq} = 2 > 0
$$

$CVM$ est **strictement croissant**, donc son minimum est atteint en $q \to 0$ :

$$
\min CVM = \lim_{q \to 0} CVM(q) = 20
$$

Donc $P_f = 20$.

**De la condition** $P = Cm$ :

$$
P = 20 + 4q \implies q = \frac{P - 20}{4}
$$

**Offre de court terme** :

$$
q^S(P) = \begin{cases}
0 & \text{si } P < 20 \\
\frac{P - 20}{4} & \text{si } P \geq 20
\end{cases}
$$

---

### **Question 3** : Production et profit si $P = 40$

**Quantité produite** :

$$
q^* = \frac{40 - 20}{4} = \frac{20}{4} = 5
$$

**Profit** :

$$
\pi = P \cdot q - CT(q) = 40 \times 5 - (100 + 20 \times 5 + 2 \times 25)
$$

$$
= 200 - (100 + 100 + 50) = 200 - 250 = -50
$$

**Perte de 50**.

Mais $P = 40 > CVM(5) = 20 + 2 \times 5 = 30$, donc la firme **produit** pour minimiser sa perte (elle couvre ses CV et une partie de CF).

---

### **Question 4** : Prix de fermeture

$$
P_f = \min CVM = 20
$$

---

### **Question 5** : Long terme si $P = 40$

À $q = 5$ :

$$
CM(5) = \frac{100}{5} + 20 + 2 \times 5 = 20 + 20 + 10 = 50
$$

On a $P = 40 < CM(5) = 50$.

La firme fait une perte ($\pi < 0$) et ne peut pas couvrir tous ses coûts.

Au long terme : **sortie du marché** (quitte l'industrie définitivement).

<aside>
⚠️

**SYNTHÈSE**

- **Court terme** : $P = 40 > P_f = 20$ → Produire $q = 5$ (perte < CF)
- **Long terme** : $P = 40 < CM$ → Sortir du marché
</aside>

---

# 9. FLASHCARDS DE RÉVISION

- **Question 1 : Quelle est la condition d'équilibre en CPP ?**
    
    <aside>
    📝
    
    **Réponse** : $P = Cm(q^*)$
    
    La firme produit jusqu'à ce que le prix égalise le coût marginal.
    
    </aside>
    
- **Question 2 : Qu'est-ce que la courbe d'offre de court terme de la firme ?**
    
    <aside>
    📝
    
    **Réponse** : C'est la portion de la courbe $Cm$ **au-dessus** de $\min CVM$.
    
    Si $P < \min CVM$ → Fermeture ($q = 0$).
    
    </aside>
    
- **Question 3 : Qu'est-ce que la courbe d'offre de long terme de la firme ?**
    
    <aside>
    📝
    
    **Réponse** : C'est la portion de la courbe $Cm_{LT}$ **au-dessus** de $\min CM_{LT}$.
    
    Si $P < \min CM_{LT}$ → Sortie du marché.
    
    </aside>
    
- **Question 4 : Que se passe-t-il à l'équilibre de long terme en CPP ?**
    
    <aside>
    📝
    
    **Réponse** :
    
    - Profit économique nul : $\pi = 0$
    - Prix = Coût moyen minimum : $P^* = \min CM_{LT}$
    - Production efficace : chaque firme produit au minimum de $CM$
    - Libre entrée/sortie ajuste le nombre de firmes
    </aside>
    
- **Question 5 : Qu'est-ce que le surplus du producteur ?**
    
    <aside>
    📝
    
    **Réponse** : Aire entre le prix et la courbe d'offre :
    
    $SP = P^* Q^* - CV(Q^*) = \pi + CF$
    
    Au long terme à l'équilibre : $SP = 0$.
    
    </aside>
    

---

# 10. CHEAT SHEET RÉCAPITULATIF

| **Concept** | **Court Terme** | **Long Terme** |
| --- | --- | --- |
| **Condition production** | $P = Cm$ si $P \geq \min CVM$ | $P = Cm_{LT}$ si $P \geq \min CM_{LT}$ |
| **Seuil fermeture/sortie** | $P_f = \min CVM$ | $P_s = \min CM_{LT}$ |
| **Courbe d'offre** | $Cm$ au-dessus de $\min CVM$ | $Cm_{LT}$ au-dessus de $\min CM_{LT}$ |
| **Nombre de firmes** | Fixe ($n$ donné) | Variable (libre entrée/sortie) |
| **Profit d'équilibre** | Quelconque ($\pi \gtrless 0$) | Nul ($\pi = 0$) |
| **Prix d'équilibre** | Quelconque | $P^* = \min CM_{LT}$ |
| **Surplus producteur** | $SP = \pi + CF$ | $SP = 0$ (à l'équilibre) |

---

<aside>
⚡

**CLÉ DE COMPRÉHENSION : COURT TERME VS LONG TERME**

- **CT** : Facteur fixe → CF existent → Décision : produire si $P > CVM$ (minimiser perte)
- **LT** : Tous facteurs variables → Pas de CF → Décision : rester si $P > CM$
- **LT équilibre** : Libre entrée/sortie → $\pi = 0$ → $P = \min CM$ → Efficacité productive
</aside>

---

**Prochaine étape** : 

[MODULE 7 : Monopole et Oligopole](https://www.notion.so/MODULE-7-Monopole-et-Oligopole-2bff9caeaca981cc8d5bc424f1bf60b4?pvs=21)