## 🎯 L'ESSENTIEL EN 3 LIGNES

> **Le consommateur arbitre entre temps de travail (qui génère du revenu) et temps de loisir (qui génère de l'utilité directe).** Le salaire $w$ représente à la fois la rémunération du travail ET le coût d'opportunité du loisir. L'équilibre : $\frac{Um_\ell}{Um_C} = \frac{w}{p}$. Particularité : l'offre de travail peut être **backward-bending** (décroissante pour des salaires élevés).
> 

---

## 1️⃣ LE MODÈLE DE BASE

<aside>
💡

**INTUITION**

Chaque individu dispose d'un temps total $T$ (24h par jour, ou 168h par semaine). Il doit choisir comment répartir ce temps entre :

- **Travail** $L$ : pénible mais génère un revenu salarial $wL$
- **Loisir** $\ell$ : agréable et source directe d'utilité

Le consommateur fait face à un **arbitrage** : plus de travail = plus de consommation mais moins de loisir. Le salaire $w$ est le "prix" du loisir : en choisissant 1h de loisir, je renonce à $w$ euros de revenu.

</aside>

<aside>
📐

**HYPOTHÈSES DU MODÈLE**

1. **Dotation temporelle** : $T = L + \ell$ (temps total fixé)
2. **Revenu salarial** : $R = wL$ (salaire horaire $w$, pas de revenu non-salarial pour l'instant)
3. **Consommation** : le consommateur achète un bien de consommation $C$ au prix $p$
4. **Fonction d'utilité** : $U(C, \ell)$ dépendant de la consommation ET du loisir
5. **Pas d'épargne** : le consommateur dépense tout son revenu : $pC = wL$
</aside>

---

## 2️⃣ LA CONTRAINTE BUDGÉTAIRE TEMPORELLE

### Formulation Standard

Puisque $L = T - \ell$, le revenu salarial s'écrit :

$$
R = wL = w(T - \ell) = wT - w\ell
$$

La contrainte budgétaire devient :

$$
pC = wT - w\ell
$$

Soit en isolant $C$ :

$$
\boxed{C = \frac{wT}{p} - \frac{w}{p}\ell}
$$

C'est une **droite dans l'espace** $(\ell, C)$ :

- **Ordonnée à l'origine** : $\frac{wT}{p}$ (revenu maximal si $\ell = 0$, i.e. travail $T$ heures)
- **Abscisse à l'origine** : $T$ (si tout le temps est consacré au loisir, $C = 0$)
- **Pente** : $-\frac{w}{p}$ (coût d'opportunité du loisir en termes de consommation)

<aside>
📐

**INTERPRÉTATION DU COÛT D'OPPORTUNITÉ**

Le salaire $w$ a **deux interprétations** :

1. **Rémunération du travail** : chaque heure travaillée rapporte $w$ euros
2. **Coût d'opportunité du loisir** : chaque heure de loisir "coûte" $w$ euros (revenu sacrifié)

C'est pourquoi la pente de la contrainte est $-w/p$ : pour gagner 1h de loisir, il faut renoncer à $w/p$ unités de consommation.

</aside>

**[GRAPHIQUE A INSERER : Contrainte budgétaire temporelle dans l'espace (ℓ, C). Axe vertical : C avec ordonnée à l'origine wT/p. Axe horizontal : ℓ (loisir) avec abscisse à l'origine T. Droite décroissante de pente -w/p. Zone sous la droite = ensemble budgétaire (paniers accessibles).]**

### Avec Revenu Non-Salarial

Si le consommateur dispose d'un revenu non-salarial $m$ (dividendes, allocations...), la contrainte devient :

$$
pC = wL + m = w(T - \ell) + m
$$

$$
\boxed{C = \frac{wT + m}{p} - \frac{w}{p}\ell}
$$

La pente reste $-w/p$, mais l'ordonnée à l'origine augmente de $m/p$.

---

## 3️⃣ L'ÉQUILIBRE INDIVIDUEL

### Condition d'Optimalité

<aside>
📐

**CONDITION D'ÉQUILIBRE**

Le consommateur maximise $U(C, \ell)$ sous contrainte $pC = w(T - \ell) + m$.

Par la méthode du Lagrangien ou du TMS :

$$
\boxed{TMS_{\ell, C} = \frac{Um_\ell}{Um_C} = \frac{w}{p}}
$$

**Interprétation** : Le taux auquel le consommateur accepte de substituer du loisir à de la consommation égale le taux du marché (salaire réel $w/p$).

Formulation équivalente :

$$
\boxed{\frac{Um_\ell}{w} = \frac{Um_C}{p}}
$$

Le dernier euro gagné en travaillant (et dépensé en consommation) apporte la même utilité marginale que le dernier euro "sacrifié" en loisir.

</aside>

### Résolution par Lagrangien

**Programme** :

$$
\max_{C, \ell} U(C, \ell) \quad \text{s.c.} \quad pC + w\ell = wT + m
$$

**Lagrangien** :

$$
\mathcal{L} = U(C, \ell) + \lambda(wT + m - pC - w\ell)
$$

**CPO** :

$$
\begin{cases}
\frac{\partial \mathcal{L}}{\partial C} = Um_C - \lambda p = 0 & (1) \\
\frac{\partial \mathcal{L}}{\partial \ell} = Um_\ell - \lambda w = 0 & (2) \\
\frac{\partial \mathcal{L}}{\partial \lambda} = wT + m - pC - w\ell = 0 & (3)
\end{cases}
$$

De (1) et (2) : $\frac{Um_\ell}{Um_C} = \frac{w}{p}$

Résoudre avec (3) pour obtenir $C^*(w, p, m)$ et $\ell^*(w, p, m)$.

---

## 4️⃣ L'OFFRE DE TRAVAIL

### Définition

L'**offre de travail** est la quantité d'heures que l'individu souhaite travailler :

$$
L^s = T - \ell^*(w, p, m)
$$

On s'intéresse à la relation entre $L^s$ et le salaire $w$ (toutes choses égales par ailleurs).

### Effet d'une Hausse du Salaire : Slutsky

Quand le salaire $w$ augmente, **deux effets opposés** :

<aside>
✅

**1. EFFET DE SUBSTITUTION** (économie mainstream)

Le loisir devient **relativement plus cher** (son coût d'opportunité augmente). Le consommateur substitue de la consommation au loisir :

$$
w \uparrow \implies \text{loisir plus coûteux} \implies \ell \downarrow \implies L^s \uparrow
$$

**Effet substitution toujours positif sur l'offre de travail.**

</aside>

<aside>
❌

**2. EFFET REVENU** (revenu réel augmente)

Pour un nombre d'heures travaillées donné, le salaire plus élevé augmente le revenu réel. Si le loisir est un **bien normal**, le consommateur veut plus de loisir :

$$
w \uparrow \implies R \uparrow \implies \ell \uparrow \implies L^s \downarrow
$$

**Effet revenu négatif sur l'offre de travail** (si loisir = bien normal).

</aside>

**Effet total** :

$$
\frac{dL^s}{dw} = \underbrace{\text{Effet substitution}}_{(+)} + \underbrace{\text{Effet revenu}}_{(-)}
$$

Le signe dépend de l'ampleur relative des deux effets.

### Courbe d'Offre Backward-Bending

<aside>
💡

**PHÉNOMÈNE CONTRE-INTUITIF**

Pour des **salaires faibles** : effet substitution domine → $\frac{dL^s}{dw} > 0$ (offre croissante)

Pour des **salaires élevés** : effet revenu domine → $\frac{dL^s}{dw} < 0$ (offre décroissante)

Résultat : la courbe d'offre de travail peut être **en forme de "C" inversé** (backward-bending).

**Interprétation** : Au-delà d'un certain salaire, les travailleurs préfèrent réduire leurs heures pour profiter de plus de loisir (ils sont "assez riches").

</aside>

![image.png](attachment:91495804-9e01-457b-9708-38e59c461827:image.png)

---

## 5️⃣ EXERCICE TYPE : FONCTION COBB-DOUGLAS

### 🎯 Énoncé

Un individu a une fonction d'utilité $U(C, \ell) = C^{0.6} \ell^{0.4}$. Il dispose de $T = 100$ heures, $m = 0$, $p = 1$, $w = 10$ €/h.

1. Déterminer la consommation optimale $C^*$, le loisir optimal $\ell^*$ et l'offre de travail $L^{s*}$.
2. Calculer l'utilité maximale.
3. Si le salaire passe à $w' = 15$ €/h, calculer les nouvelles valeurs.

---

- **RÉSOLUTION COMPLÈTE**
    
    <aside>
    📝
    
    **SOLUTION**
    
    **Question 1** : $w = 10$, $p = 1$, $m = 0$
    
    Pour Cobb-Douglas $U = C^\alpha \ell^\beta$, on a toujours :
    
    $$
    pC^* = \frac{\alpha}{\alpha + \beta}(wT + m) \quad \text{et} \quad w\ell^* = \frac{\beta}{\alpha + \beta}(wT + m)
    $$
    
    Ici $\alpha = 0.6$, $\beta = 0.4$, $wT + m = 10 \times 100 = 1000$.
    
    $$
    1 \times C^* = \frac{0.6}{1} \times 1000 = 600 \implies C^* = 600
    $$
    
    $$
    10 \times \ell^* = \frac{0.4}{1} \times 1000 = 400 \implies \ell^* = 40 \text{ heures}
    $$
    
    $$
    L^{s*} = T - \ell^* = 100 - 40 = 60 \text{ heures}
    $$
    
    **Question 2** : Utilité maximale
    
    $$
    U^* = (600)^{0.6} \times (40)^{0.4}
    $$
    
    Calcul numérique : $600^{0.6} \approx 51.3$, $40^{0.4} \approx 5.28$
    
    $$
    U^* \approx 51.3 \times 5.28 \approx 270.8
    $$
    
    **Question 3** : Nouveau salaire $w' = 15$
    
    $$
    wT + m = 15 \times 100 = 1500
    $$
    
    $$
    C^* = 0.6 \times 1500 = 900
    $$
    
    $$
    15 \times \ell^* = 0.4 \times 1500 = 600 \implies \ell^* = 40 \text{ heures}
    $$
    
    $$
    L^{s*} = 100 - 40 = 60 \text{ heures}
    $$
    
    **Observation** : $\ell^*$ et $L^{s*}$ ne changent pas ! C'est une propriété des préférences Cobb-Douglas : **la part du temps consacrée au loisir est constante** ($\beta/(\alpha+\beta) = 0.4$).
    
    Seule la consommation augmente (de 600 à 900).
    
    </aside>
    
    <aside>
    ⚠️
    
    **PIÈGE FRÉQUENT**
    
    Avec Cobb-Douglas, **l'offre de travail est insensible au salaire** (effet substitution = effet revenu). C'est un cas particulier ! Ne généralise pas à toutes les fonctions.
    
    </aside>
    

---

## 6️⃣ CAS PARTICULIER : QUASI-LINÉAIRE

### Exemple : $U(C, \ell) = C + \alpha \ln(\ell)$

<aside>
📐

**PROPRIÉTÉ CLÉ**

Avec quasi-linéaire en $C$, le loisir optimal $\ell^*$ **ne dépend pas du revenu** $m$ (pas d'effet revenu sur le loisir).

Seul l'effet substitution opère → l'offre de travail est **toujours croissante** avec le salaire.

</aside>

Condition d'optimalité :

$$
\frac{Um_\ell}{Um_C} = \frac{\alpha / \ell}{1} = \frac{w}{p}
$$

D'où :

$$
\ell^* = \frac{\alpha p}{w}
$$

L'offre de travail :

$$
L^{s*} = T - \frac{\alpha p}{w}
$$

On vérifie :

$$
\frac{dL^{s*}}{dw} = \frac{\alpha p}{w^2} > 0
$$

(toujours croissante).

---

## 🔄 FLASHCARDS DE RÉVISION

- **Question 1 : Écrire la contrainte budgétaire temporelle**
    
    <aside>
    📝
    
    **Réponse** : $pC = w(T - \ell) + m$ ou $C = \frac{wT + m}{p} - \frac{w}{p}\ell$
    
    Pente : $-w/p$ (coût d'opportunité du loisir)
    
    </aside>
    
- **Question 2 : Condition d'équilibre du consommateur ?**
    
    <aside>
    📝
    
    **Réponse** : $TMS_{\ell,C} = \frac{Um_\ell}{Um_C} = \frac{w}{p}$
    
    </aside>
    
- **Question 3 : Effet d'une hausse du salaire sur l'offre de travail ?**
    
    <aside>
    📝
    
    **Réponse** : Deux effets opposés :
    
    - **Effet substitution** (+) : loisir plus cher → plus de travail
    - **Effet revenu** (-) : revenu plus élevé → plus de loisir (si bien normal)
    
    Si effet revenu domine pour $w$ élevé → courbe backward-bending
    
    </aside>
    
- **Question 4 : Avec Cobb-Douglas, l'offre de travail dépend-elle du salaire ?**
    
    <aside>
    📝
    
    **Réponse** : NON ! Pour $U = C^\alpha \ell^\beta$, la part du temps en loisir est constante : $\ell^*/T = \beta/(\alpha+\beta)$
    
    Donc $L^{s*}/T = \alpha/(\alpha+\beta)$ indépendant de $w$.
    
    </aside>
    

---

## 📊 LA CHEAT SHEET

| **Concept** | **Formule** | **Interprétation** |
| --- | --- | --- |
| Contrainte temporelle | $pC = w(T - \ell) + m$ | Budget = salaire + revenu non-salarial |
| Coût d'opportunité loisir | $w$ | Salaire sacrifié par heure de loisir |
| Condition optimalité | $\frac{Um_\ell}{Um_C} = \frac{w}{p}$ | TMS = salaire réel |
| Offre de travail | $L^s = T - \ell^*(w, p, m)$ | Heures de travail optimales |
| Cobb-Douglas | $\ell^* = \frac{\beta}{\alpha+\beta} T$ | Part constante en loisir |
| Effet hausse $w$ | Substitution (+) vs Revenu (-) | Détermine forme de $L^s(w)$ |

---

<aside>
⚡

**🔑 LIEN PRÉPA → ÉCO**

Ce problème est **identique** à un problème d'optimisation sous contrainte en physique (maximiser l'énergie totale d'un système avec contrainte de masse). Tu maîtrises déjà la mécanique !

</aside>

---

**Suite du cours** : 

[MODULE 2 : Choix Intertemporels](https://www.notion.so/MODULE-2-Choix-Intertemporels-2bff9caeaca981ff8985d16fc01ed37d?pvs=21)