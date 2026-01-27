## 🎯 L'ESSENTIEL EN 3 LIGNES

> **La firme combine travail**  $L$  **et capital**  $K$  **pour produire une quantité**  $Q$  **selon une fonction de production.** Pour minimiser ses coûts, elle égalise le TMST (taux technique de substitution) au rapport des prix des facteurs. Les isoquantes (courbes d'isoproduction) sont tangentes aux isocoûts (droites de budget de la firme). À long terme, tous les facteurs sont variables ; à court terme, le capital est fixe.
> 

**Condition d'optimalité** :

$$
\frac{Pm_L}{Pm_K} = \frac{w}{r}
$$

---

## 1️⃣ LA FONCTION DE PRODUCTION

<aside>
💡

**INTUITION**

La fonction de production décrit la **technologie** de la firme : comment transformer des inputs (facteurs de production) en output (production). C'est l'analogue de la fonction d'utilité pour le consommateur, mais ici on parle de **quantités physiques** mesurables (pas de satisfaction subjective).

</aside>

<aside>
📐

**DÉFINITION**

La **fonction de production** associe à chaque combinaison de facteurs  $(K, L)$  la quantité maximale d'output  $Q$  réalisable avec la technologie disponible :

$$
Q = F(K, L)
$$

Où :

- $K$  = capital (machines, bâtiments...)
- $L$  = travail (heures de main d'œuvre)
- $Q$  = output (quantité produite)

**Hypothèses standards** :

1.  $F$  croissante en  $K$  et  $L$  (plus de facteurs → plus de production)
2.  $F$  concave (rendements marginaux décroissants)
</aside>

### Fonctions de Production Classiques

### 1. **Cobb-Douglas**

$$
Q = AK^\alpha L^\beta \quad (A > 0, \alpha, \beta > 0)
$$

Où  $A$  est un paramètre de **productivité globale des facteurs** (technologie).

**Propriétés** :

- Élasticités constantes
- Isoquantes convexes
- Facteurs **substituables** (mais pas parfaitement)

**Rendements d'échelle** :

- Si  $\alpha + \beta > 1$  : rendements **croissants**
- Si  $\alpha + \beta = 1$  : rendements **constants** (fonction homogène de degré 1)
- Si  $\alpha + \beta < 1$  : rendements **décroissants**

### 2. **Leontief (Compléments Parfaits)**

$$
Q = \min\{aK, bL\}
$$

**Propriétés** :

- Facteurs **complémentaires** (proportions fixes)
- Isoquantes en "L"
- Exemple : 1 conducteur + 1 camion, pas de substitution possible

### 3. **Substituts Parfaits**

$$
Q = aK + bL
$$

**Propriétés** :

- Facteurs parfaitement **substituables**
- Isoquantes linéaires
- TMST constant

---

## 2️⃣ PRODUCTIVITÉS MARGINALES ET MOYENNES

<aside>
📐

**DÉFINITIONS**

**Productivité Marginale** du facteur  $i$  : variation de l'output quand on augmente ce facteur d'une unité (toutes choses égales par ailleurs)

$$
Pm_L = \frac{\partial Q}{\partial L} \quad \text{et} \quad Pm_K = \frac{\partial Q}{\partial K}
$$

**Productivité Moyenne** du facteur  $i$  : output par unité de facteur

$$
PM_L = \frac{Q}{L} \quad \text{et} \quad PM_K = \frac{Q}{K}
$$

**Loi des rendements marginaux décroissants** :  $\frac{\partial^2 Q}{\partial L^2} < 0$  et  $\frac{\partial^2 Q}{\partial K^2} < 0$

</aside>

### Exemple : Cobb-Douglas  $Q = K^{0.5} L^{0.5}$

**Productivités marginales** :

$$
Pm_L = \frac{\partial Q}{\partial L} = 0.5 K^{0.5} L^{-0.5} = \frac{0.5 K^{0.5}}{L^{0.5}} = \frac{Q}{2L}
$$

$$
Pm_K = \frac{\partial Q}{\partial K} = 0.5 K^{-0.5} L^{0.5} = \frac{0.5 L^{0.5}}{K^{0.5}} = \frac{Q}{2K}
$$

**Productivités moyennes** :

$$
PM_L = \frac{Q}{L} = \frac{K^{0.5} L^{0.5}}{L} = \frac{K^{0.5}}{L^{0.5}}
$$

$$
PM_K = \frac{Q}{K} = \frac{K^{0.5} L^{0.5}}{K} = \frac{L^{0.5}}{K^{0.5}}
$$

---

## 3️⃣ RENDEMENTS D'ÉCHELLE

<aside>
💡

**INTUITION**

Les rendements d'échelle mesurent ce qui se passe quand on multiplie **tous les facteurs** par un même coefficient  $\lambda > 1$ . Si la production augmente :

- Plus que  $\lambda$  → rendements **croissants** (économies d'échelle)
- Exactement de  $\lambda$  → rendements **constants**
- Moins que  $\lambda$  → rendements **décroissants** (déséconomies d'échelle)
</aside>

<aside>
📐

**DÉFINITION MATHÉMATIQUE**

On considère  $F(\lambda K, \lambda L)$  pour  $\lambda > 1$  :

- **Rendements croissants** :  $F(\lambda K, \lambda L) > \lambda F(K, L)$
- **Rendements constants** :  $F(\lambda K, \lambda L) = \lambda F(K, L)$  (fonction **homogène de degré 1**)
- **Rendements décroissants** :  $F(\lambda K, \lambda L) < \lambda F(K, L)$

**Méthode rapide pour Cobb-Douglas**  $Q = AK^\alpha L^\beta$  :

$$
F(\lambda K, \lambda L) = A(\lambda K)^\alpha (\lambda L)^\beta = \lambda^{\alpha + \beta} AK^\alpha L^\beta = \lambda^{\alpha + \beta} Q
$$

Donc :

- $\alpha + \beta > 1$  → rendements **croissants**
- $\alpha + \beta = 1$  → rendements **constants**
- $\alpha + \beta < 1$  → rendements **décroissants**
</aside>

<aside>
⚠️

**PIÈGE FRÉQUENT**

Ne pas confondre :

- **Rendements d'échelle** : tous les facteurs varient simultanément
- **Rendements marginaux** : un seul facteur varie (l'autre fixe)
</aside>

---

## 4️⃣ ISOQUANTES ET ISOCOÛTS

### Les Isoquantes

<aside>
📐

**DÉFINITION**

Une **isoquante** est l'ensemble des combinaisons  $(K, L)$  qui permettent de produire une quantité  $Q_0$  donnée :

$$
\{(K, L) : F(K, L) = Q_0\}
$$

C'est l'analogue des courbes d'indifférence pour le consommateur.

</aside>

**Propriétés** (si facteurs substituables) :

- Décroissantes
- Convexes (TMST décroissant)
- Ne se croisent jamais
- Plus éloignées de l'origine = production plus élevée

![Carte d'isoquantes dans le plan (L, K). Axe horizontal : travail L, axe vertical : capital K. Trois courbes convexes décroissantes représentant Q₁ < Q₂ < Q₃ (production croissante en s'éloignant de l'origine). Les isoquantes ne se croisent jamais. Flèche indiquant l'augmentation de la production vers le nord-est.](attachment:766a1df5-bb9d-42dc-91df-2bf009cb97e7:image.png)

Carte d'isoquantes dans le plan (L, K). Axe horizontal : travail L, axe vertical : capital K. Trois courbes convexes décroissantes représentant Q₁ < Q₂ < Q₃ (production croissante en s'éloignant de l'origine). Les isoquantes ne se croisent jamais. Flèche indiquant l'augmentation de la production vers le nord-est.

### Le TMST (Taux Marginal de Substitution Technique)

<aside>
📐

**DÉFINITION**

Le **TMST** mesure le taux auquel on peut substituer du capital au travail **en maintenant la production constante** :

$$
TMST_{L,K} = -\frac{dK}{dL}\bigg|_{Q=\text{cste}} = \frac{Pm_L}{Pm_K}
$$

**Démonstration** : Sur une isoquante,  $dQ = 0$ . Or :

$$
dQ = \frac{\partial Q}{\partial L} dL + \frac{\partial Q}{\partial K} dK = Pm_L \cdot dL + Pm_K \cdot dK = 0
$$

D'où :

$$
\frac{dK}{dL} = -\frac{Pm_L}{Pm_K} \implies TMST_{L,K} = \frac{Pm_L}{Pm_K}
$$

</aside>

### Les Isocoûts

<aside>
📐

**DÉFINITION**

Un **isocoût** (ou droite d'isocoût) est l'ensemble des combinaisons  $(K, L)$  qui ont le **même coût total**  $C_0$  :

$$
C = wL + rK = C_0
$$

Où :

- $w$  = salaire (coût du travail)
- $r$  = taux de location du capital (coût du capital)

Sous forme de droite (en isolant  $K$ ) :

$$
K = \frac{C_0}{r} - \frac{w}{r} L
$$

**Pente** :  $-w/r$  (taux de substitution **marchand** des facteurs)

</aside>

![Isoquante Q₀ (courbe convexe décroissante) et isocoût C₀ (droite décroissante). Axe horizontal : L (travail), axe vertical : K (capital). Point de tangence entre l'isoquante et l'isocoût représente l'optimum (K*, L*). L'ordonnée à l'origine de l'isocoût est C₀/r, l'abscisse à l'origine est C₀/w. Pente de l'isocoût = -w/r. Flèche indiquant que pour minimiser le coût, on cherche l'isocoût le plus proche de l'origine qui touche Q₀.](attachment:7cda58a5-2adb-46b3-bf5a-a9d8d750aae6:image.png)

Isoquante Q₀ (courbe convexe décroissante) et isocoût C₀ (droite décroissante). Axe horizontal : L (travail), axe vertical : K (capital). Point de tangence entre l'isoquante et l'isocoût représente l'optimum (K*, L*). L'ordonnée à l'origine de l'isocoût est C₀/r, l'abscisse à l'origine est C₀/w. Pente de l'isocoût = -w/r. Flèche indiquant que pour minimiser le coût, on cherche l'isocoût le plus proche de l'origine qui touche Q₀.

---

## 5️⃣ MINIMISATION DES COÛTS

<aside>
💡

**INTUITION**

La firme veut produire une quantité  $Q_0$  donnée **au moindre coût**. Graphiquement, elle cherche l'isocoût le plus proche de l'origine qui touche l'isoquante  $Q_0$ . Le point optimal est le point de **tangence** entre l'isoquante et l'isocoût.

</aside>

### Programme de Minimisation

<aside>
📐

**PROGRAMME DU PRODUCTEUR**

$$
\min_{K, L} C = wL + rK \quad \text{s.c.} \quad F(K, L) = Q_0
$$

**Condition d'optimalité** (méthode du TMS ou Lagrangien) :

$$
\boxed{TMST_{L,K} = \frac{Pm_L}{Pm_K} = \frac{w}{r}}
$$

Ou de manière équivalente :

$$
\boxed{\frac{Pm_L}{w} = \frac{Pm_K}{r}}
$$

**Interprétation** : Le taux technique de substitution (capacité technique) égale le rapport des prix (taux du marché). La dernière unité monétaire dépensée en travail rapporte autant (en production) que la dernière unité monétaire dépensée en capital.

</aside>

### Résolution par Lagrangien

**Lagrangien** :

$$
\mathcal{L} = wL + rK + \lambda(Q_0 - F(K, L))
$$

**CPO** :

$$
\begin{cases}
\frac{\partial \mathcal{L}}{\partial L} = w - \lambda Pm_L = 0 & (1) \\
\frac{\partial \mathcal{L}}{\partial K} = r - \lambda Pm_K = 0 & (2) \\
\frac{\partial \mathcal{L}}{\partial \lambda} = Q_0 - F(K, L) = 0 & (3)
\end{cases}
$$

De (1) et (2) :  $\frac{Pm_L}{Pm_K} = \frac{w}{r}$ 

<aside>
⚡

**🔑 LIEN PRÉPA → ÉCO**

Ce problème est **identique** à la minimisation d'une fonction sous contrainte d'égalité en mathématiques. Le Lagrangien est exactement le même outil que tu as utilisé en PTSI/PT ! L'isoquante = surface de niveau de  $F(K,L)$ .

</aside>

---

## 6️⃣ DEMANDES CONDITIONNELLES ET FONCTION DE COÛT

### Demandes Conditionnelles de Facteurs

<aside>
📐

**DÉFINITION**

Les **demandes conditionnelles** (ou demandes hicksiennes) sont les quantités optimales de facteurs qui minimisent le coût pour produire  $Q$  :

$$
L^*(w, r, Q) \quad \text{et} \quad K^*(w, r, Q)
$$

Ce sont les solutions du programme de minimisation.

</aside>

### Fonction de Coût

<aside>
📐

**DÉFINITION**

La **fonction de coût**  $C(w, r, Q)$  est le coût minimal pour produire  $Q$  :

$$
C(w, r, Q) = wL^*(w, r, Q) + rK^*(w, r, Q)
$$

Elle dépend des prix des facteurs et de la quantité produite.

</aside>

### Sentier d'Expansion

<aside>
📐

**DÉFINITION**

Le **sentier d'expansion** (ou chemin d'expansion) est le lieu géométrique des combinaisons optimales  $(K^*, L^*)$  quand la quantité  $Q$  varie (prix des facteurs constants).

Pour Cobb-Douglas, le sentier d'expansion est une **droite passant par l'origine** : le rapport  $K/L$  est constant.

</aside>

![Plan (L, K) avec plusieurs isoquantes Q₁, Q₂, Q₃ et plusieurs isocoûts parallèles. Le sentier d'expansion est une droite passant par l'origine qui relie tous les points de tangence entre isoquantes et isocoûts. Pour Cobb-Douglas, cette droite a une pente constante K/L = (α/β)(w/r).](attachment:6a8c9f07-208e-4509-8bbd-c1376e8d90ca:image.png)

Plan (L, K) avec plusieurs isoquantes Q₁, Q₂, Q₃ et plusieurs isocoûts parallèles. Le sentier d'expansion est une droite passant par l'origine qui relie tous les points de tangence entre isoquantes et isocoûts. Pour Cobb-Douglas, cette droite a une pente constante K/L = (α/β)(w/r).

---

## 7️⃣ COÛTS DE COURT TERME VS LONG TERME

<aside>
📐

**DÉFINITIONS**

**Long terme** : Tous les facteurs sont **variables**. La firme peut ajuster  $K$  et  $L$  librement.

**Court terme** : Au moins un facteur est **fixe** (généralement le capital  $\bar{K}$ ). Seul  $L$  est variable.

**Fonction de coût de long terme** :  $C_{LT}(Q) = \min_{K,L} \{wL + rK : F(K,L) = Q\}$ 

**Fonction de coût de court terme** :  $C_{CT}(Q) = \min_L \{wL + r\bar{K} : F(\bar{K},L) = Q\}$ 

Toujours :  $C_{LT}(Q) \leq C_{CT}(Q)$  (plus de flexibilité = coût plus faible)

</aside>

### Décomposition des Coûts

<aside>
📐

**Coût Total** :

$$
CT(Q) = CF + CV(Q)
$$

Où :

- $CF$  = **Coût Fixe** (indépendant de  $Q$ , ex: loyer, machines)
- $CV(Q)$  = **Coût Variable** (dépend de  $Q$ , ex: matières premières, salaires)

**Coût Marginal** :

$$
Cm(Q) = \frac{dCT}{dQ} = \frac{dCV}{dQ}
$$

**Coût Moyen** :

$$
CM(Q) = \frac{CT(Q)}{Q} = \frac{CF}{Q} + \frac{CV(Q)}{Q}
$$

**Coût Variable Moyen** :

$$
CVM(Q) = \frac{CV(Q)}{Q}
$$

</aside>

<aside>
⚠️

**PIÈGE FRÉQUENT**

Le coût marginal  $Cm$  ne dépend **pas** des coûts fixes !  $Cm = \frac{dCT}{dQ} = \frac{dCV}{dQ}$  (la dérivée d'une constante est nulle).

</aside>

---

## 8️⃣ EXERCICE TYPE : COBB-DOUGLAS

### 📝 ÉNONCÉ

Une firme a une fonction de production  $Q = 2K^{0.5} L^{0.5}$ . Le salaire est  $w = 16$  et le taux de location du capital  $r = 4$ .

1. Calculer les productivités marginales.
2. Vérifier les rendements d'échelle.
3. Calculer le TMST.
4. Si la firme veut produire  $Q_0 = 100$ , quelle combinaison  $(K^*, L^*)$  minimise ses coûts ?
5. Calculer le coût total minimal.
6. Déterminer l'équation du sentier d'expansion.

---

- **Voir la résolution complète**
    
    <aside>
    ✅
    
    **SOLUTION DÉTAILLÉE**
    
    **Question 1** : Productivités marginales
    
    $$
    Pm_L = \frac{\partial Q}{\partial L} = 2 \times 0.5 K^{0.5} L^{-0.5} = K^{0.5} L^{-0.5} = \frac{K^{0.5}}{L^{0.5}}
    $$
    
    $$
    Pm_K = \frac{\partial Q}{\partial K} = 2 \times 0.5 K^{-0.5} L^{0.5} = K^{-0.5} L^{0.5} = \frac{L^{0.5}}{K^{0.5}}
    $$
    
    **Question 2** : Rendements d'échelle
    
    Pour  $Q = AK^\alpha L^\beta$  avec  $A = 2$ ,  $\alpha = 0.5$ ,  $\beta = 0.5$  :
    
    $$
    \alpha + \beta = 0.5 + 0.5 = 1
    $$
    
    → **Rendements constants** (fonction homogène de degré 1).
    
    **Question 3** : TMST
    
    $$
    TMST = \frac{Pm_L}{Pm_K} = \frac{K^{0.5}/L^{0.5}}{L^{0.5}/K^{0.5}} = \frac{K^{0.5}}{L^{0.5}} \times \frac{K^{0.5}}{L^{0.5}} = \frac{K}{L}
    $$
    
    **Question 4** : Combinaison optimale pour  $Q_0 = 100$ 
    
    Condition d'optimalité :
    
    $$
    \frac{Pm_L}{Pm_K} = \frac{w}{r} \implies \frac{K}{L} = \frac{16}{4} = 4
    $$
    
    Donc :  $K = 4L$ 
    
    En remplaçant dans la contrainte de production :
    
    $$
    Q_0 = 2K^{0.5} L^{0.5} = 2(4L)^{0.5} L^{0.5} = 2 \times 2 L^{0.5} \times L^{0.5} = 4L
    $$
    
    $$
    100 = 4L \implies L^* = 25
    $$
    
    $$
    K^* = 4L^* = 4 \times 25 = 100
    $$
    
    **Question 5** : Coût total minimal
    
    $$
    C^* = wL^* + rK^* = 16 \times 25 + 4 \times 100 = 400 + 400 = 800
    $$
    
    **Question 6** : Sentier d'expansion
    
    De la condition d'optimalité, on a toujours :  $K = 4L$ 
    
    C'est une **droite passant par l'origine** de pente  $4$ . Pour toute quantité  $Q$ , le rapport  $K/L = 4$  reste constant.
    
    </aside>
    
    <aside>
    ⚠️
    
    **PIÈGE FRÉQUENT**
    
    Pour Cobb-Douglas avec rendements constants ( $\alpha + \beta = 1$ ), la fonction de coût est **linéaire** en  $Q$  :
    
    $$
    C(Q) = cQ
    $$
    
    Où  $c$  est le coût marginal constant. Ici :  $c = 800/100 = 8$ .
    
    </aside>
    

---

## 🔄 FLASHCARDS DE RÉVISION

- **Question 1 : Définir le TMST et donner sa formule**
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Le TMST (Taux Marginal de Substitution Technique) mesure le taux auquel on peut substituer du capital au travail en maintenant la production constante :
    
    $$
    TMST_{L,K} = \frac{Pm_L}{Pm_K}
    $$
    
    C'est le taux technique auquel on peut remplacer  $K$  par  $L$  sans modifier  $Q$ .
    
    </aside>
    
- **Question 2 : Condition de minimisation des coûts ?**
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    $$
    \frac{Pm_L}{Pm_K} = \frac{w}{r}
    $$
    
    Ou de manière équivalente :
    
    $$
    \frac{Pm_L}{w} = \frac{Pm_K}{r}
    $$
    
    Interprétation : Le dernier euro dépensé en travail doit rapporter autant (en production) que le dernier euro dépensé en capital.
    
    </aside>
    
- **Question 3 : Rendements d'échelle pour Cobb-Douglas ?**
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Pour  $Q = AK^\alpha L^\beta$  :
    
    - $\alpha + \beta > 1$  : rendements **croissants**
    - $\alpha + \beta = 1$  : rendements **constants**
    - $\alpha + \beta < 1$  : rendements **décroissants**
    </aside>
    
- **Question 4 : Différence entre coût marginal et coût moyen ?**
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    **Coût marginal**  $Cm$  : coût d'une unité supplémentaire
    
    $$
    Cm(Q) = \frac{dCT}{dQ}
    $$
    
    **Coût moyen**  $CM$  : coût par unité produite
    
    $$
    CM(Q) = \frac{CT(Q)}{Q}
    $$
    
    Règle : Si  $Cm < CM$ , alors  $CM$  décroît. Si  $Cm > CM$ , alors  $CM$  croît.  $Cm$  coupe  $CM$  en son minimum.
    
    </aside>
    
- **Question 5 : Qu'est-ce que le sentier d'expansion ?**
    
    <aside>
    ✅
    
    **RÉPONSE**
    
    Le sentier d'expansion est le lieu géométrique des combinaisons optimales  $(K^*, L^*)$  quand  $Q$  varie (avec  $w$  et  $r$  constants).
    
    Pour Cobb-Douglas : droite passant par l'origine avec  $\frac{K}{L} = \text{constante}$ .
    
    </aside>
    

---

## 📊 LA CHEAT SHEET

| **Concept** | **Formule** | **Interprétation** |
| --- | --- | --- |
| Fonction de production |  $Q = F(K, L)$  | Technologie de la firme |
| Productivité marginale |  $Pm_i = \frac{\partial Q}{\partial i}$  | Production supplémentaire d'une unité |
| TMST |  $\frac{Pm_L}{Pm_K}$  | Taux de substitution technique |
| Isocoût |  $C = wL + rK$  | Budget de la firme |
| Condition optimalité |  $\frac{Pm_L}{Pm_K} = \frac{w}{r}$  | Tangence isoquante/isocoût |
| Cobb-Douglas |  $Q = AK^\alpha L^\beta$  | Fonction classique |
| Rendements d'échelle |  $\alpha + \beta$  | > 1 croissants, = 1 constants, < 1 décroissants |
| Coût marginal |  $Cm = \frac{dCT}{dQ}$  | Coût d'une unité supplémentaire |
| Coût moyen |  $CM = \frac{CT}{Q}$  | Coût par unité produite |

---

<aside>
⚡

**🔑 LIEN PRÉPA → ÉCO**

Ce problème est **identique** à la minimisation d'une fonction sous contrainte d'égalité que tu as vue en prépa. Le Lagrangien est exactement le même outil ! Les isoquantes sont des surfaces de niveau de la fonction de production, et l'optimum est au point de tangence (gradient de  $F$  colinéaire au gradient de  $C$ ).

</aside>

---

**Suite du cours** : 

[MODULE 6 : Offre de la Branche (CPP)](https://www.notion.so/MODULE-6-Offre-de-la-Branche-CPP-75fb5323efa847de8f60f5d940c993c0?pvs=21)