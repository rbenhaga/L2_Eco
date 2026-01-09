## 📄 UTILISATION DE CETTE ANNEXE

<aside>
⚡

**FEUILLE ULTRA-CONDENSÉE**

Cette feuille contient **UNIQUEMENT les formules essentielles** à connaître par cœur.

**Format optimisé** :

- **1 page recto** : Théorie du consommateur
- **1 page verso** : Théorie du producteur + Marchés

**À imprimer** et à avoir avec toi pour réviser dans le bus/métro !

**Le jour J** : Recopie ces formules sur ton brouillon dès le début de l'épreuve (2 minutes).

</aside>

---

# 📄 RECTO : THÉORIE DU CONSOMMATEUR

## 🎯 OPTIMISATION DU CONSOMMATEUR

### Programme

$$
\max_{x_1, x_2} U(x_1, x_2) \quad \text{s.c.} \quad p_1 x_1 + p_2 x_2 = R
$$

### Condition d'optimalité

$$
\boxed{TMS = \frac{p_1}{p_2} \iff \frac{Um_{x_1}}{Um_{x_2}} = \frac{p_1}{p_2} \iff \frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}}
$$

### Lagrangien

$$
\mathcal{L} = U(x_1, x_2) + \lambda(R - p_1 x_1 - p_2 x_2)
$$

### Cobb-Douglas : $U = x_1^\alpha x_2^\beta$ avec $\alpha + \beta = 1$

$$
\boxed{p_1 x_1^* = \alpha R \quad \text{et} \quad p_2 x_2^* = \beta R}
$$

---

## ⏳ CHOIX INTERTEMPORELS

### Contrainte intertemporelle

$$
\boxed{c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r}}
$$

### Condition d'optimalité

$$
\boxed{\frac{Um_{c_1}}{Um_{c_2}} = 1 + r}
$$

### Taux réel (Fisher)

$$
\boxed{1 + \rho = \frac{1 + i}{1 + \pi} \approx 1 + i - \pi}
$$

---

## 💎 SURPLUS ET SLUTSKY

### Surplus du consommateur

$$
SC = \int_0^{Q^*} P(q) dq - P^* Q^*
$$

### Équation de Slutsky

$$
\boxed{\underbrace{\frac{\partial x_i}{\partial p_j}}_{\text{Effet total}} = \underbrace{\frac{\partial h_i}{\partial p_j}}_{\text{ES (-)}} - \underbrace{\frac{\partial x_i}{\partial R} \cdot x_j}_{\text{ER}}}
$$

**Bien normal** : ES < 0, ER < 0 → Effet total < 0

**Bien inférieur** : ES < 0, ER > 0 → Effet total ambigu

---

# 📄 VERSO : THÉORIE DU PRODUCTEUR + MARCHÉS

## ⚙️ MINIMISATION DES COÛTS

### Programme

$$
\min_{K, L} C = wL + rK \quad \text{s.c.} \quad f(K, L) = \bar{Q}
$$

### Condition d'optimalité

$$
\boxed{\frac{Pm_L}{Pm_K} = \frac{w}{r} \iff \frac{Pm_L}{w} = \frac{Pm_K}{r}}
$$

### Cobb-Douglas : $Q = AK^\alpha L^\beta$

$$
Pm_K = \alpha \frac{Q}{K} \quad Pm_L = \beta \frac{Q}{L}
$$

$$
TMST = \frac{\beta}{\alpha} \frac{K}{L}
$$

**Rendements d'échelle** : $\alpha + \beta$ $\begin{cases} > 1 : \text{croissants} \\ = 1 : \text{constants} \\ < 1 : \text{décroissants} \end{cases}$

### Coûts

$$
CT = CF + CV \quad CM = \frac{CT}{Q} \quad Cm = \frac{dCT}{dQ}
$$

**Relation** : $Cm < CM \implies CM \downarrow$ et $Cm > CM \implies CM \uparrow$

---

## 🏭 CONCURRENCE PURE ET PARFAITE

### Court terme

$$
P = Cm(Q^*) \quad \text{si} \quad P \geq CVM
$$

### Long terme

$$
\boxed{P = Cm(Q^*) = CM_{min}} \quad \text{et} \quad \pi = 0
$$

### Surplus du producteur

$$
SP = \int_0^{Q^*} [P^* - Cm(q)] dq
$$

---

## 👑 MONOPOLE

### Recette marginale

$$
\boxed{Rm = P\left(1 + \frac{1}{\varepsilon}\right)}
$$

**Demande linéaire** : Si $P = a - bQ$ alors $Rm = a - 2bQ$

### Condition d'équilibre

$$
\boxed{Rm = Cm}
$$

Puis $P^* = P(Q^*)$ avec $P^* > Cm$

### Indice de Lerner

$$
\boxed{L = \frac{P - Cm}{P} = \frac{1}{|\varepsilon|}}
$$

### Perte sèche

$$
PS = \frac{1}{2}(P_m - Cm)(Q_{cpp} - Q_m)
$$

---

## 🤝 OLIGOPOLE DE COURNOT

### Fonction de réaction

Pour la firme $i$ :

$$
\max_{q_i} \pi_i(q_i, q_j) \implies q_i^* = R_i(q_j)
$$

### Équilibre de Nash

$$
\boxed{q_1^* = R_1(q_2^*) \quad \text{et} \quad q_2^* = R_2(q_1^*)}
$$

**Cas linéaire** : $P = a - b(q_1 + q_2)$, $Cm = c$

$$
q_1^* = q_2^* = \frac{a-c}{3b} \quad P^* = \frac{a+2c}{3}
$$

---

## 📊 TABLEAU RÉCAPITULATIF DES MARCHÉS

| **Marché** | **Q** | **P** | **π (LT)** |
| --- | --- | --- | --- |
| CPP | $Q_{cpp}$ | $Cm$ | 0 |
| Bertrand | $Q_{cpp}$ | $Cm$ | 0 |
| Cournot | $Q_c$ | $P_c$ | $+$ |
| Stackelberg | $Q_s$ | $P_s$ | $++$ (leader) |
| Monopole | $Q_m$ | $P_m$ | $+++$ |

**Relation** : $Q_m < Q_c < Q_{cpp}$ et $P_m > P_c > P_{cpp}$

---

## 🎯 LES 5 FORMULES ABSOLUMENT CRITIQUES

<aside>
🔥

**À CONNAÎTRE PAR CŒUR**

1. **Cobb-Douglas** : $p_i x_i^* = \alpha_i R$ (si $\sum \alpha_i = 1$)
2. **Condition optimale** : $\frac{Um_{x_1}}{p_1} = \frac{Um_{x_2}}{p_2}$
3. **Monopole** : $Rm = P(1 + 1/\varepsilon) = Cm$
4. **Indice de Lerner** : $L = \frac{P-Cm}{P} = \frac{1}{|\varepsilon|}$
5. **Slutsky** : $\frac{\partial x_i}{\partial p_j} = \frac{\partial h_i}{\partial p_j} - \frac{\partial x_i}{\partial R} x_j$
</aside>

---

<aside>
✅

**MODE D'EMPLOI LE JOUR J**

**T = 0 min** : Reçois le sujet

**T = 0-2 min** : Recopie les 5 formules critiques sur le brouillon

**T = 2-5 min** : Lis tout le sujet, identifie les modèles

**T = 5-120 min** : Résous dans l'ordre stratégique (voir ANNEXE E)

**Astuce** : Si tu bloques, reviens à cette feuille mentalement !

</aside>