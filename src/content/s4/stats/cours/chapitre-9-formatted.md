# Chapitre 9 : Estimation Ponctuelle

---

## 📋 Sommaire

| N° | Contenu | Page |
|----|---------|------|
| — | Fiche de synthèse | 239 |
| 1 | Application du principe du maximum de vraisemblance à une loi binomiale | 239 |
| 2 | Application du principe du maximum de vraisemblance à une densité quelconque | 246 |
| 3 | Application du principe du maximum de vraisemblance à une densité quelconque avec utilisation de la fonction Gamma | 250 |
| 4 | Application du principe du maximum de vraisemblance à une densité quelconque avec utilisation de la fonction Gamma | 254 |
| 5 | Application du principe du maximum de vraisemblance à la loi de Bernoulli | 257 |
| 6 | Application du principe du maximum de vraisemblance à la loi normale afin d'identifier un biais | 261 |

---

## 📖 Introduction

Au chapitre précédent, nous avons constaté que le calcul de probabilités était dépendant de certains paramètres. Par exemple, dans le cadre des calculs de probabilités relevant de la loi normale, il est nécessaire de connaître les paramètres $m$ et $\sigma$ lorsque $X \sim N(m; \sigma)$.

Jusqu'ici, ces paramètres de la population ont été considérés comme **connus**. Or en réalité, la connaissance de $m$ et $\sigma$ n'est pas systématique car les populations ont des tailles parfois trop grandes et les enquêtes sont trop coûteuses pour pouvoir sonder une population.

> [!IMPORTANT]
> Il est donc possible de faire l'approximation de certains paramètres en recourant aux informations relatives à l'échantillon.

Par conséquent, si $X \sim N(m; \sigma)$ ne peut être utilisé car $m$ et $\sigma$ sont inconnus, il faut alors chercher des **estimateurs** pour $m$ et $\sigma$, tout en vérifiant que ces estimateurs respectent certaines **propriétés désirables**.

Dans la pratique, la moyenne arithmétique est un bon estimateur de la moyenne de la population. Cependant, certains estimateurs connus ne sont pas toujours adaptés. La **méthode du maximum de vraisemblance**, utilisée tout au long de ce chapitre, permet précisément de trouver des estimateurs (qui fournissent des estimations ponctuelles et non des intervalles de valeurs possibles comme nous le verrons au Chapitre 11).

### Objectif de la méthode

La méthode du maximum de vraisemblance permet de trouver la **forme mathématique d'un estimateur** grâce aux informations relatives à l'échantillon. Une fois cet estimateur obtenu, il est nécessaire de vérifier dans un second temps le respect des propriétés désirables :

| Propriété | Description |
|-----------|-------------|
| **Sans biais** | En moyenne, l'estimateur donne la vraie valeur de la statistique recherchée |
| **Efficacité** | L'estimateur possède une variance minimale |
| **Convergence** | L'estimateur tend vers la vraie valeur quand la taille de l'échantillon augmente |
| **Exhaustivité** | L'estimateur utilise toute l'information contenue dans l'échantillon |

### Intuition de la méthode

La méthode est intuitive. Elle consiste à trouver un (ou plusieurs) estimateur(s) tel que la probabilité (la vraisemblance) d'observer l'échantillon *a posteriori* est **maximale**. Ainsi, l'échantillon doit fournir la meilleure information possible.

**Maximiser la vraisemblance** consiste à maximiser le produit des densités ou des probabilités individuelles, i.e., la probabilité d'obtenir l'image $x_1$ « et » l'image $x_2$, « et » l'image $x_n$.

La technique exige donc la connaissance de la **loi de probabilité** suivie par $X$ afin de procéder à la maximisation de la vraisemblance. Les lois de probabilités peuvent être de plusieurs types : **continues** ou **discrètes**.

---

## 📝 Fiche de Synthèse

### Le maximum de vraisemblance : les étapes de la méthode

#### Étape 1 : La fonction de vraisemblance

Afin de trouver un estimateur de $\theta$, paramètre inconnu d'une loi de probabilité, la fonction de vraisemblance est construite en prenant :

**Cas continu** (produit des densités de probabilités) :
$$L(x_1, \ldots, x_n; \theta) = f(x_1) \times \cdots \times f(x_n)$$

**Cas discret** (produit des probabilités individuelles) :
$$L(x_1, \ldots, x_n; \theta) = P(X = x_1) \times \cdots \times P(X = x_n)$$

#### Étape 2 : La fonction de Log-vraisemblance

La fonction de vraisemblance en logarithme est ensuite déduite afin de **linéariser** l'expression précédente :

$$\ln L(x_1, \ldots, x_n; \theta) = \sum_{i=1}^{n} \ln f(x_i)$$

ou

$$\ln L(x_1, \ldots, x_n; \theta) = \sum_{i=1}^{n} \ln P(X = x_i)$$

#### Étape 3 : Maximisation

La fonction de Log-vraisemblance est ensuite maximisée de manière à trouver l'estimateur $\hat{\theta}$.

**Condition de premier ordre :**
$$\frac{\partial \ln L(x_1, \ldots, x_n; \theta)}{\partial \theta} = 0$$

**Condition de second ordre :**
$$\frac{\partial^2 \ln L(x_1, \ldots, x_n; \theta)}{\partial \theta^2} \leq 0$$

---

## 📘 Exercice 1 : Application du principe du maximum de vraisemblance à une loi binomiale

### Énoncé

On souhaite étudier les entreprises françaises dont l'effectif est de 10 salariés. En particulier, on s'intéresse aux personnes gagnant plus de 3 000 euros nets/mois. Pour cela :

1. Quelles lois proposez-vous pour les variables aléatoires $X_i$ et $K$ ? Justifier.
2. On étudie $m$ entreprises de 10 salariés pour lesquelles on dispose d'un échantillon empirique de la variable $K$ : $(k_1, \ldots, k_m)$. Déterminez le(s) estimateur(s) du maximum de vraisemblance du (ou des) paramètre(s) de la loi de $K$.
3. Démontrer les propriétés du (ou des) estimateur(s).

---

### Question 1 : Quelles lois proposez-vous pour les variables aléatoires $X_i$ et $K$ ?

#### Loi de $X_i$

- **Épreuve aléatoire** : « prendre un salarié au hasard dans une entreprise de 10 salariés ».
- **Variable aléatoire $X$** : « salaire en euros nets/mois ».

| Valeur | Événement | Probabilité |
|--------|-----------|-------------|
| $x_i = 1$ | $(A)$ : « le salarié gagne au moins 3 000 euros nets/mois » | $p = P(A)$ |
| $x_i = 0$ | $(\bar{A})$ : « le salarié gagne moins de 3 000 euros nets/mois » | $(1 - p) = P(\bar{A}) = q$ |

On a **2 événements mutuellement exclusifs** et un seul tirage (une seule épreuve), d'où :

> [!NOTE]
> $$X_i \sim B(1; p) \quad \text{avec} \quad P(X_i = x_i) = p^{x_i} (1 - p)^{1-x_i}$$

#### Loi de $K$

Si on a $n = 10$ variables aléatoires indépendantes de Bernoulli, alors la somme donne une variable aléatoire suivant une **loi binomiale** :

$$K \sim B(10; p) \quad \text{avec} \quad P(K = k) = C_{10}^k \cdot p^k \cdot (1 - p)^{10-k}$$

---

### Question 2 : Détermination de l'estimateur du maximum de vraisemblance

#### Pourquoi utiliser la méthode du maximum de vraisemblance ?

Si on souhaite calculer une probabilité pour un événement $k_i$, il est nécessaire de connaître la valeur de $p$. Il faut donc une **forme analytique** pour $p$, i.e., un estimateur que l'on notera $\hat{p}$. Les calculs effectués sur l'échantillon doivent donner une **estimation ponctuelle** de $p$.

> [!TIP]
> **Pourquoi « estimation ponctuelle » ?**
> 
> Pour calculer une probabilité nous avons besoin d'une estimation issue de $\hat{p}$. Dans le chapitre suivant, nous verrons qu'il est possible d'estimer un paramètre en lui donnant un intervalle. Notons qu'il n'est pas possible de munir $\hat{p}$ d'un intervalle de valeurs, ceci impliquerait une infinité de probabilités estimées avec $P(K = k_i)$.

#### Construction de la fonction de vraisemblance

L'estimateur issu de la méthode du maximum de vraisemblance (EMV) de $p$ est basé sur le principe suivant : on va chercher l'estimateur $\hat{p}$ qui rend la fonction de vraisemblance **maximale** (c'est-à-dire qui rend la probabilité d'apparition de l'échantillon observé *a posteriori* maximale).

La fonction de vraisemblance $L(\cdot)$ se construit par le **produit des probabilités individuelles** :

$$L(k_1, \ldots, k_m; p) = P(k_1) \times \cdots \times P(k_m) = \prod_{i=1}^{m} C_{10}^{k_i} \cdot p^{k_i} \cdot (1 - p)^{10-k_i}$$

> [!NOTE]
> **Remarques :**
> - La fonction de vraisemblance peut s'écrire $L(k_1, \ldots, k_m; p)$ ou $L(\cdot)$ pour raccourcir la notation.
> - La fonction de vraisemblance est définie sur un **échantillon empirique** $(k_1, k_2, \ldots, k_m)$, puisque nous devons rendre la probabilité d'apparition de l'échantillon observé *a posteriori* maximale.
> - Les propriétés liées aux estimateurs seront au contraire démontrées dans le cadre d'**échantillons théoriques**.

#### Passage à la Log-vraisemblance

Pour maximiser la vraisemblance, la fonction Log-vraisemblance $(\ln L)$ est retenue car le logarithme permet de **linéariser un produit** (il s'agit aussi d'une transformation monotone et croissante laissant l'extremum inchangé).

$$\ln L(k_1, \ldots, k_m; p) = \sum_{i=1}^{m} \left[ \ln C_{10}^{k_i} + k_i \ln p + (10 - k_i) \ln (1 - p) \right]$$

> [!TIP]
> Le passage en logarithme n'est pas nécessaire si la forme mathématique de $L(\cdot)$ est suffisamment simple pour trouver instantanément $\hat{p}$. Dans la pratique, il est quasiment impératif de passer en logarithme afin de travailler avec l'opérateur **somme** qui est plus facile à manier que l'opérateur **produit**.

#### Calcul de la dérivée

La dérivée par rapport à $p$ est :

$$\frac{\partial \ln L(\cdot)}{\partial p} = \sum_{i=1}^{m} \left[ \frac{k_i}{p} - \frac{10 - k_i}{1 - p} \right]$$

#### Équation du maximum de vraisemblance

$$\frac{\partial \ln L(\cdot)}{\partial p} = 0 \Rightarrow \sum_{i=1}^{m} \left[ \frac{k_i}{\hat{p}} - \frac{10 - k_i}{1 - \hat{p}} \right] = 0$$

D'où :
$$\frac{\sum_{i=1}^{m} k_i}{\hat{p}} - \frac{\sum_{i=1}^{m} (10 - k_i)}{1 - \hat{p}} = 0$$

On trouve :
$$\sum_{i=1}^{m} k_i - m \cdot 10 \cdot \hat{p} = 0$$

La solution existe, donc l'estimateur s'écrit :

> [!IMPORTANT]
> $$\boxed{\hat{p}(k_1, \ldots, k_m) = \frac{\sum_{i=1}^{m} k_i}{10m} = \frac{\bar{k}}{10}}$$

Ce résultat signifie que pour calculer la probabilité $P(K = k) = C_{10}^k \cdot p^k \cdot (1 - p)^{10-k}$ dont la seule inconnue est $p$, il faut remplacer $p$ par son estimateur $\hat{p}$.

#### Vérification des conditions de second ordre

Le résultat que nous avons trouvé correspond à un maximum si les conditions de second ordre sont vérifiées :

$$\frac{\partial^2 \ln L(\cdot)}{\partial p^2} = - \sum_{i=1}^{m} \left[ \frac{k_i}{p^2} + \frac{10 - k_i}{(1 - p)^2} \right]$$

Par définition, $10 \geq k_i$. Par conséquent :

$$\frac{\partial^2 \ln L(k_1, \ldots, k_m; p)}{\partial p^2} = - \sum_{i=1}^{m} \left[ \frac{k_i}{\hat{p}^2} + \frac{10 - k_i}{(1 - \hat{p})^2} \right] \leq 0$$

✅ La dérivée seconde est négative, nous sommes bien en présence d'un **maximum**.

Ainsi, l'estimateur relatif à $p$ sur l'**échantillon théorique** s'écrit :

$$\hat{p}(K_1, \ldots, K_m) = \frac{\sum_{i=1}^{m} K_i}{10m} = \frac{\bar{K}}{10}$$

---

### Question 3 : Démonstration des propriétés de l'estimateur

Soit un échantillon théorique aléatoire de taille $m$, $(K_1, K_2, \ldots, K_m)$. Nous travaillons désormais avec $(K_1, K_2, \ldots, K_m)$ et non plus avec $(k_1, k_2, \ldots, k_m)$ de manière à montrer que les propriétés de l'estimateur $\hat{p}(K_1, \ldots, K_m)$ sont valables quel que soit l'échantillon.

> [!NOTE]
> **Hypothèse fondamentale :**
> 
> Les $K_i$ sont supposés **indépendants et identiquement distribués (i.i.d.)**. Cette hypothèse sera systématiquement utilisée.

Si les $K_i$ sont identiquement distribués, cela signifie que pour tout $i = 1, \ldots, m$ : $K_i \equiv K$, donc :

- $E(K_i) = E(K) = 10p$ [puisque $K \sim B(10; p)$ : l'espérance d'une v.a. suivant une loi binomiale est $np$]
- $V(K_i) = V(K) = 10p(1 - p)$ [la variance d'une v.a. suivant une loi binomiale est $npq$]

---

#### Propriété 1 : $\hat{p}(K_1, \ldots, K_m)$ est un estimateur sans biais (ESB)

L'estimateur $\hat{p}$ est **sans biais** si son espérance est égale à sa vraie valeur, c'est-à-dire si :

$$E[\hat{p}(K_1, \ldots, K_m)] = p$$

**Démonstration :**

$$E[\hat{p}(K_1, \ldots, K_m)] = E\left[ \frac{\sum_{i=1}^{m} K_i}{10m} \right] = \frac{1}{10m} \sum_{i=1}^{m} E[K_i] = \frac{1}{10m} \cdot m \cdot 10p = p$$

> [!IMPORTANT]
> $$E[\hat{p}(K_1, \ldots, K_m)] = p$$
> 
> Donc $\hat{p}(K_1, \ldots, K_m)$ est un **estimateur sans biais**.

**Interprétation :** En prenant plusieurs échantillons et en calculant autant de fois $\hat{p}(K_1, \ldots, K_m)$, la moyenne de ces estimations donne le « vrai » paramètre $p$ (celui qui serait estimé sur l'ensemble de la population). C'est la première exigence que l'on se fixe : obtenir en moyenne le vrai paramètre.

Cependant la moyenne n'a de signification que si la variance est faible. Ce qui nous conduit à examiner la seconde propriété.

---

#### Propriété 2 : $\hat{p}(K_1, \ldots, K_m)$ est un estimateur convergent

$\hat{p}(K_1, \ldots, K_m)$ est un estimateur **convergent** s'il converge en limite de probabilité vers sa vraie valeur :

$$\lim_{m \to \infty} P(\hat{p} = p) = 1$$

Cela signifie que :

$$\forall \varepsilon > 0, \exists \eta > 0 \text{ tel que } P(|\hat{p} - p| > \varepsilon) < \eta$$

Autrement dit, lorsque la taille de l'échantillon est grande, la probabilité pour que l'estimateur s'éloigne de sa vraie valeur est nulle mais infinitésimale.

**Démonstration :**

Comme $\hat{p}$ est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0, soit :

$$\lim_{m \to \infty} V(\hat{p}(K_1, \ldots, K_m)) = 0$$

On a :

$$V[\hat{p}(K_1, \ldots, K_m)] = V\left[ \frac{\sum_{i=1}^{m} K_i}{10m} \right] = \frac{1}{(10m)^2} \sum_{i=1}^{m} V[K_i] = \frac{1}{100m^2} \cdot m \cdot 10p(1 - p) = \frac{pq}{10m}$$

On a bien :

$$\lim_{m \to \infty} V(\hat{p}(K_1, \ldots, K_m)) = 0$$

> [!IMPORTANT]
> $\hat{p}(K_1, \ldots, K_m)$ est un **estimateur convergent**. Comme il est sans biais, on dit qu'il est **absolument convergent**.

On pourrait s'arrêter ici et se contenter d'avoir un estimateur absolument convergent. En effet si la variance tend vers 0, cela signifie qu'à chaque fois que l'on prend au hasard un échantillon assez grand, on est pratiquement sûr de ne pas s'éloigner de la vraie valeur $p$.

Il est néanmoins possible d'être un peu plus exigeant en se demandant si la variance (mesurant la dispersion entre l'estimateur et sa vraie valeur) est bien la plus faible possible. Il s'agit de la troisième propriété : **l'efficacité**.

---

#### Propriété 3 : L'estimateur $\hat{p}(K_1, \ldots, K_m)$ est efficace

$\hat{p}(K_1, \ldots, K_m)$ est **efficace** s'il est un estimateur sans biais possédant une **variance minimale**.

L'**inégalité de Fréchet-Rao-Cramér-Darmois (FRCD)** indique que tout estimateur sans biais vérifie :

$$V(\hat{p}) \geq \frac{1}{I(p)}$$

avec $I(p)$ la **quantité d'information de Fisher** :

$$I(p) = - E\left[ \frac{\partial^2 \ln L(\cdot)}{\partial p^2} \right]$$

La variance de l'estimateur est minimale si celle-ci est égale à la **borne inférieure** de l'inégalité de FRCD, i.e. :

$$V(\hat{p}) = \frac{1}{I(p)}$$

**Démonstration :**

La quantité d'information de Fisher est donnée par :

$$I(p) = - E\left[ \frac{\partial^2 \ln L(\cdot)}{\partial p^2} \right] = - E\left[ - \sum_{i=1}^{m} \frac{K_i}{p^2} + \sum_{i=1}^{m} \frac{10 - K_i}{(1 - p)^2} \right]$$

$$= \sum_{i=1}^{m} \frac{E[K_i]}{p^2} + \sum_{i=1}^{m} \frac{E[10 - K_i]}{(1 - p)^2}$$

$$= \frac{1}{p^2} \sum_{i=1}^{m} E[K_i] + \frac{1}{(1 - p)^2} \sum_{i=1}^{m} E[10 - K_i]$$

$$= \frac{10mp}{p^2} + \frac{10m(1 - p)}{(1 - p)^2}$$

$$= \frac{10m}{p(1 - p)}$$

Et donc :

$$\frac{1}{I(p)} = \frac{p(1 - p)}{10m}$$

Or, nous avons vu que :

$$V(\hat{p}) = \frac{p(1 - p)}{10m}$$

Donc :

$$V(\hat{p}) = \frac{1}{I(p)}$$

> [!IMPORTANT]
> L'estimateur $\hat{p}$ est **efficace**.

---

#### Conclusion sur l'exercice 1

> [!TIP]
> **Résultat final :**
> 
> L'estimateur $\hat{p}(K_1, \ldots, K_m) = \frac{\sum_{i=1}^{m} K_i}{10m}$ est un estimateur :
> - ✅ **Sans biais**
> - ✅ **Convergent** (absolument convergent)
> - ✅ **Efficace**

---

## 📘 Exercice 2 : Application du principe du maximum de vraisemblance à une densité quelconque

### Énoncé

Soit $(x_1, \ldots, x_n)$ un échantillon aléatoire de taille $n$ provenant d'une variable aléatoire de densité $f(x; \theta)$ telle que :

$$f(x; \theta) = \frac{1}{\theta} e^{-\frac{x}{\theta}}; \quad x > 0 \text{ et } \theta > 0$$

1. En détaillant votre démarche, déterminez l'estimateur du maximum de vraisemblance.
2. Démontrez les propriétés de l'estimateur obtenu.

---

### Question 1 : Détermination de l'EMV

L'EMV de $\theta$, seul paramètre de la loi de $X$ à estimer, est basé sur le principe suivant : on cherche l'estimateur $\hat{\theta}$ qui rend la fonction de vraisemblance **maximale**.

#### Fonction de vraisemblance

La fonction de vraisemblance se construit par le produit des densités de probabilités :

$$L(x_1, \ldots, x_n; \theta) = f(x_1) \times \cdots \times f(x_n)$$

#### Fonction de Log-vraisemblance

$$\ln L(x_1, \ldots, x_n; \theta) = -n \ln \theta - \sum_{i=1}^n \frac{x_i}{\theta}$$

#### Condition de premier ordre

$$\frac{\partial \ln L(x_1, \ldots, x_n; \theta)}{\partial \theta} = 0$$

On a :

$$\frac{\partial \ln L(x_1, \ldots, x_n; \theta)}{\partial \theta} = -\frac{n}{\theta} + \sum_{i=1}^n \frac{x_i}{\theta^2} = 0$$

On obtient :

> [!IMPORTANT]
> $$\boxed{\hat{\theta} = \frac{\sum_{i=1}^n x_i}{n} = \bar{x}}$$

Donc $\hat{\theta}(x_1, \ldots, x_n) = \bar{x}$. On suppose que les conditions de second ordre sont remplies :

$$\frac{\partial^2 \ln L(x_1, \ldots, x_n; \theta)}{\partial \theta^2} \leq 0$$

---

### Question 2 : Propriétés de l'estimateur

Soit un échantillon aléatoire de taille $n$, $(X_1, \ldots, X_n)$, associé à la densité de probabilité $f(x; \theta)$. Nous supposons que les $X_i$ sont **indépendantes et identiquement distribuées (i.i.d)**.

Cela implique que pour tout $i = 1, \ldots, n$ : $X_i \equiv X$ où :
- $E(X_i) = E(X)$ et $V(X_i) = V(X)$
- $X_i$ et $X_j$ sont indépendantes pour tout $i \neq j$

---

#### Propriété 1 : L'estimateur $\hat{\theta}$ est sans biais

$\hat{\theta}(X_1, \ldots, X_n)$ est sans biais si son espérance est égale à sa vraie valeur : $E[\hat{\theta}(X_1, \ldots, X_n)] = \theta$.

**Démonstration :**

$$E[\hat{\theta}(X_1, \ldots, X_n)] = E\left[\frac{1}{n} \sum_{i=1}^n X_i\right] = \frac{1}{n} \sum_{i=1}^n E(X_i) = \frac{1}{n} \cdot n E(X) = E(X)$$

Or, nous avons vu au Chapitre 3 que :

$$E(X) = \int_0^{\infty} x f(x) dx = \int_0^{\infty} x \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = \theta \Gamma(2) = \theta \cdot 1! = \theta$$

> [!IMPORTANT]
> Donc $E[\hat{\theta}(X_1, \ldots, X_n)] = \theta$.
> 
> $\hat{\theta}(X_1, \ldots, X_n)$ est un **estimateur sans biais**.

---

#### Propriété 2 : L'estimateur $\hat{\theta}$ est efficace

$\hat{\theta}(X_1, \ldots, X_n)$ est un estimateur efficace s'il est sans biais et s'il possède une **variance minimale**.

D'après l'inégalité de **Fréchet-Rao-Cramér-Darmois**, tout estimateur sans biais vérifie :

$$V(\hat{\theta}) \geq \frac{1}{I(\theta)}$$

avec $I(\theta)$ la quantité d'information de Fisher :

$$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right]$$

La variance de l'estimateur sera minimale si :

$$V(\hat{\theta}) = \frac{1}{I(\theta)}$$

**Calcul de $V(\hat{\theta})$ :**

$$V(\hat{\theta}(X_1, \ldots, X_n)) = V\left[\frac{1}{n} \sum_{i=1}^n X_i\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i) = \frac{1}{n^2} \cdot n V(X) = \frac{V(X)}{n}$$

Or, nous savons que $V(X) = E(X^2) - [E(X)]^2$, donc :

$$E(X^2) = \int_0^{\infty} x^2 \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = \theta^2 \Gamma(3) = 2 \theta^2$$

Donc :

$$V(X) = E(X^2) - [E(X)]^2 = 2 \theta^2 - \theta^2 = \theta^2$$

On en déduit alors :

$$V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{1}{n} V(X) = \frac{\theta^2}{n}$$

**Calcul de $I(\theta)$ :**

$$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right] = -E\left[\frac{n}{\theta^2} - 2 \frac{\sum_{i=1}^n X_i}{\theta^3}\right] = -\frac{n}{\theta^2} + 2 \frac{n \theta}{\theta^3} = \frac{n}{\theta^2}$$

**Vérification :**

$$V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{\theta^2}{n} = \frac{1}{I(\theta)}$$

> [!IMPORTANT]
> L'estimateur $\hat{\theta}(X_1, \ldots, X_n)$ est donc **efficace**, car sa variance est minimale.

---

#### Propriété 3 : $\hat{\theta}$ est un estimateur convergent

$\hat{\theta}(X_1, \ldots, X_n)$ est un estimateur convergent si :

$$\lim_{n \to \infty} P(|\hat{\theta} - \theta| > \epsilon) = 0$$

Autrement dit :

$$\forall \eta > 0, \exists \eta > 0 \text{ et } \exists \epsilon > 0 \text{ tels que } P(|\hat{\theta} - \theta| > \epsilon) < \eta$$

---

## 📘 Exercice 4 : Application du principe du maximum de vraisemblance à une densité quelconque avec utilisation de la fonction Gamma

### Énoncé

Soit $(x_1, \ldots, x_n)$ un échantillon aléatoire de taille $n$ provenant d'une variable aléatoire $X$ de densité $f(x, \theta)$ suivante :

$$f(x ; \theta) = \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} ; \quad x > 0 \text{ et } \theta > 0$$

1. En détaillant votre démarche, déterminez l'estimateur du maximum de vraisemblance.
2. Démontrez les propriétés de l'estimateur obtenu.

---

### Question 1 : Détermination de l'EMV

L'EMV de $\theta$, seul paramètre de la loi de $X$ à estimer, est basé sur le principe suivant : on cherche l'estimateur $\hat{\theta}$ qui rend la fonction de vraisemblance **maximale**.

#### Fonction de vraisemblance

$$L(x_1, \ldots, x_n ; \theta) = f(x_1) \times \cdots \times f(x_n)$$

#### Fonction de Log-vraisemblance

$$\ln L(x_1, \ldots, x_n ; \theta) = n \ln 2 - n \ln \theta + \sum_{i=1}^n \ln x_i - \sum_{i=1}^n \frac{x_i^2}{\theta}$$

#### Condition de premier ordre

$$\frac{\partial \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta} = 0$$

On a :

$$\frac{\partial \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta} = -\frac{n}{\theta} + \sum_{i=1}^n \frac{x_i^2}{\theta^2} = 0$$

On obtient :

> [!IMPORTANT]
> $$\boxed{\hat{\theta} = \frac{\sum_{i=1}^n x_i^2}{n} = \overline{x^2}}$$

Donc $\hat{\theta}(x_1, \ldots, x_n) = \overline{x^2}$. On suppose que les conditions de second ordre sont remplies :

$$\frac{\partial^2 \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta^2} \leq 0$$

---

### Question 2 : Propriétés de l'estimateur

Soit un échantillon théorique aléatoire de taille $n$, $(X_1, \ldots, X_n)$, associé à la densité de probabilité $f(x ; \theta)$. Nous supposons que les $X_i$ sont **indépendantes et identiquement distribuées (i.i.d)**.

Cela implique que pour tout $i = 1, \ldots, n$ : $X_i \equiv X$ où :
- $E(X_i) = E(X)$ et $V(X_i) = V(X)$
- $X_i$ et $X_j$ sont indépendantes pour tout $i \neq j$

---

#### Propriété 1 : L'estimateur $\hat{\theta}$ est sans biais

$\hat{\theta}(X_1, \ldots, X_n)$ est sans biais si son espérance est égale à sa vraie valeur : $E[\hat{\theta}(X_1, \ldots, X_n)] = \theta$.

**Démonstration :**

$$E[\hat{\theta}(X_1, \ldots, X_n)] = E\left[\frac{1}{n} \sum_{i=1}^n X_i^2\right] = \frac{1}{n} \sum_{i=1}^n E(X_i^2) = \frac{1}{n} \cdot n E(X^2) = E(X^2)$$

Or, nous avons vu au Chapitre 3 que :

$$E(X^2) = \int_0^{\infty} x^2 f(x) dx = \int_0^{\infty} x^2 \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} dx = \theta \Gamma(2) = \theta \cdot 1! = \theta$$

> [!IMPORTANT]
> Donc $E[\hat{\theta}(X_1, \ldots, X_n)] = \theta$.
> 
> $\hat{\theta}(X_1, \ldots, X_n)$ est un **estimateur sans biais**.

---

#### Propriété 2 : L'estimateur $\hat{\theta}$ est efficace

$\hat{\theta}(X_1, \ldots, X_n)$ est un estimateur efficace s'il est sans biais et s'il possède une **variance minimale**.

D'après l'inégalité de **Fréchet-Rao-Cramér-Darmois**, tout estimateur sans biais vérifie :

$$V(\hat{\theta}) \geq \frac{1}{I(\theta)}$$

avec $I(\theta)$ la quantité d'information de Fisher :

$$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right]$$

La variance de l'estimateur sera minimale si :

$$V(\hat{\theta}) = \frac{1}{I(\theta)}$$

**Calcul de $V(\hat{\theta})$ :**

$$V(\hat{\theta}(X_1, \ldots, X_n)) = V\left[\frac{1}{n} \sum_{i=1}^n X_i^2\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i^2) = \frac{1}{n^2} \cdot n V(X^2) = \frac{V(X^2)}{n}$$

Or, nous savons que $V(X^2) = E(X^4) - [E(X^2)]^2$, donc :

$$E(X^4) = \int_0^{\infty} x^4 \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} dx = \theta^2 \Gamma(3) = 2 \theta^2$$

Donc :

$$V(X^2) = E(X^4) - [E(X^2)]^2 = 2 \theta^2 - \theta^2 = \theta^2$$

On en déduit alors :

$$V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{1}{n} V(X^2) = \frac{\theta^2}{n}$$

**Calcul de $I(\theta)$ :**

$$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right] = -E\left[\frac{n}{\theta^2} - 2 \frac{\sum_{i=1}^n X_i^2}{\theta^3}\right] = -\frac{n}{\theta^2} + 2 \frac{n \theta}{\theta^3} = \frac{n}{\theta^2}$$

**Vérification :**

$$V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{\theta^2}{n} = \frac{1}{I(\theta)}$$

> [!IMPORTANT]
> L'estimateur $\hat{\theta}(X_1, \ldots, X_n)$ est donc **efficace**, car sa variance est minimale.

---

#### Propriété 3 : $\hat{\theta}$ est un estimateur convergent

$\hat{\theta}(X_1, \ldots, X_n)$ est un estimateur convergent s'il converge en limite de probabilité vers sa vraie valeur :

$$\lim_{n \to \infty} P(\hat{\theta} = \theta) = 1$$

Cela signifie que :

$$\forall \epsilon > 0, \exists \eta > 0 \text{ tel que } P(|\hat{\theta} - \theta| > \epsilon) < \eta$$

**Démonstration :**

Comme $\hat{\theta}$ est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0, soit :

$$\lim_{n \to \infty} V(\hat{\theta}(X_1, \ldots, X_n)) = 0$$

On a :

$$\lim_{n \to \infty} V(\hat{\theta}(X_1, \ldots, X_n)) = \lim_{n \to \infty} \frac{\theta^2}{n} = 0$$

> [!IMPORTANT]
> L'estimateur est donc **convergent**. De plus, comme il est sans biais, il est **absolument convergent**.

---

## 📘 Exercice 5 : Application du principe du maximum de vraisemblance à la loi de Bernoulli

### Énoncé

Un institut de sondage se propose d'étudier la population française au mois de janvier 2005. Il définit pour cela la variable aléatoire suivante :

$X_i$ prend la valeur **1** si le i-ème individu de la population française est atteint par la grippe, et **0** sinon.

1. Quelle loi proposez-vous pour $X_i$ ? Justifiez votre choix.
2. Soit un échantillon $(x_1, \ldots, x_n)$ provenant de la loi de $X_i$. Déterminez l'estimateur du maximum de vraisemblance du paramètre issu de la loi de $X_i$.
3. Démontrez les propriétés de cet estimateur.

---

### Question 1 : Quelle loi proposez-vous pour $X_i$ ?

- **Épreuve aléatoire** : « prendre un individu au hasard ».
- **Variable aléatoire $X_i$** : « état de l'individu i ».

De l'épreuve aléatoire, on déduit deux événements :

| Valeur | Événement | Probabilité |
|--------|-----------|-------------|
| $x_i = 1$ | $(A)$ : « l'individu est malade » | $p = P(A)$ |
| $x_i = 0$ | $(\bar{A})$ : « l'individu est sain » | $(1 - p) = q = P(\bar{A})$ |

L'ensemble des possibles : $X(\Omega) = \{0 ; 1\}$.

Il y a **2 probabilités mutuellement exclusives** et une seule épreuve. La variable aléatoire suit donc une **loi de Bernoulli** :

> [!NOTE]
> $$X_i \sim B(1 ; p) \quad \text{avec} \quad P(X_i = x_i) = p^{x_i} (1 - p)^{1 - x_i}$$

---

### Question 2 : Détermination de l'EMV

On dispose d'un échantillon $(x_1, \ldots, x_n)$. L'estimateur par maximum de vraisemblance (EMV) de $p$, seul paramètre de la loi de $X_i$ à estimer, est basé sur le principe suivant : on va chercher l'estimateur $\hat{p}$ qui rend la fonction de vraisemblance **maximale**.

#### Fonction de vraisemblance

$$L(x_1, \ldots, x_n ; p) = P(X = x_1) \times \cdots \times P(X = x_n)$$

#### Log-vraisemblance

$$\ln L(x_1, \ldots, x_n ; p) = \sum_{i=1}^n x_i \ln p + \left(n - \sum_{i=1}^n x_i\right) \ln (1 - p)$$

#### Calcul de la dérivée

$$\frac{\partial \ln L(\cdot)}{\partial p} = \frac{\sum_{i=1}^n x_i}{p} - \frac{n - \sum_{i=1}^n x_i}{1 - p}$$

#### Condition de premier ordre

$$\frac{\partial \ln L(\cdot)}{\partial p} = 0 \Rightarrow \hat{p} = \frac{\sum_{i=1}^n x_i}{n} = \bar{x}$$

> [!IMPORTANT]
> $$\boxed{\hat{p}(x_1, \ldots, x_n) = \bar{x}}$$

---

### Question 3 : Propriétés de l'estimateur

On suppose que les $X_i$ sont **indépendantes et identiquement distribuées**, cela signifie que pour tout $i = 1, \ldots, n$ : $X_i \equiv X$, donc :

- $E(X_i) = E(X) = p$ [puisque $X \sim B(1 ; p)$ : l'espérance d'une v.a. de Bernoulli est $p$]
- $V(X_i) = V(X) = p(1 - p)$ [la variance d'une v.a. de Bernoulli est $pq$]

---

#### Propriété 1 : $\hat{p}(X_1, \ldots, X_n)$ est un estimateur sans biais (ESB)

L'estimateur $\hat{p}(X_1, \ldots, X_n)$ est sans biais si son espérance est égale à sa vraie valeur :

$$E[\hat{p}(X_1, \ldots, X_n)] = p$$

**Démonstration :**

$$E[\hat{p}(X_1, \ldots, X_n)] = E\left[\frac{\sum_{i=1}^n X_i}{n}\right] = \frac{1}{n} \sum_{i=1}^n E[X_i] = \frac{1}{n} \cdot n p = p$$

✅ L'estimateur est **sans biais**.

---

#### Propriété 2 : L'estimateur $\hat{p}(X_1, \ldots, X_n)$ est efficace

L'inégalité de **Fréchet-Rao-Cramér-Darmois** indique que tout estimateur sans biais vérifie :

$$V(\hat{p}) \geq \frac{1}{I(p)}$$

avec $I(p)$ la quantité d'information de Fisher :

$$I(p) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial p^2}\right]$$

La variance de l'estimateur est minimale si :

$$V(\hat{p}) = \frac{1}{I(p)}$$

**Calcul de $V(\hat{p})$ :**

$$V(\hat{p}(X_1, \ldots, X_n)) = V\left[\frac{\sum_{i=1}^n X_i}{n}\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i) = \frac{1}{n^2} \cdot n p(1 - p) = \frac{p(1 - p)}{n}$$

**Calcul de $I(p)$ :**

$$I(p) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial p^2}\right] = -E\left[-\frac{\sum_{i=1}^n X_i}{p^2} - \frac{n - \sum_{i=1}^n X_i}{(1 - p)^2}\right] = \frac{n}{p(1 - p)}$$

**Vérification :**

$$V(\hat{p}(X_1, \ldots, X_n)) = \frac{1}{I(p)}$$

> [!IMPORTANT]
> L'estimateur $\hat{p}(X_1, \ldots, X_n)$ est donc **efficace**.

---

#### Propriété 3 : L'estimateur $\hat{p}$ est convergent

$\hat{p}(X_1, \ldots, X_n)$ est un estimateur convergent s'il converge en limite de probabilité vers sa vraie valeur :

$$\lim_{n \to \infty} P(\hat{p} = p) = 1$$

Cela signifie que :

$$\forall \epsilon > 0, \exists \eta > 0 \text{ tel que } P(|\hat{p} - p| > \epsilon) < \eta$$

**Démonstration :**

Comme $\hat{p}$ est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0 :

$$\lim_{n \to \infty} V(\hat{p}(X_1, \ldots, X_n)) = 0$$

On a :

$$\lim_{n \to \infty} V(\hat{p}(X_1, \ldots, X_n)) = \lim_{n \to \infty} \frac{p(1 - p)}{n} = 0$$

> [!IMPORTANT]
> L'estimateur est donc **convergent**. De plus, comme il est sans biais, il est **absolument convergent**.

---

## 📘 Exercice 6 : Application du principe du maximum de vraisemblance à la loi normale afin d'identifier un biais

### Énoncé

Soit $X$ la variable aléatoire continue : « taille des individus » avec $X \sim N(m ; \sigma)$.

Déterminez le(s) estimateur(s) du maximum de vraisemblance du (des) paramètre(s) issu(s) de la loi de $X$.

> [!NOTE]
> **Objectifs de cet exercice :**
> 
> (i) Le maximum de vraisemblance peut permettre de trouver **plus d'un EMV**.
> 
> (ii) Il est possible qu'un EMV **ne remplisse pas** la condition minimale « sans biais ».

---

### Résolution

Si $X$ suit une loi normale, la densité de probabilité est donnée par :

$$f(x) = \frac{1}{\sigma \sqrt{2 \pi}} \exp \left(-\frac{1}{2} \left(\frac{x - m}{\sigma}\right)^2\right)$$

Les EMV de $\sigma$ et $m$, seuls paramètres de la loi de $X$ à estimer sont basés sur le principe suivant : on cherche les estimateurs $\hat{\sigma}$ et $\hat{m}$ qui rendent la fonction de vraisemblance maximale.

#### Fonction de vraisemblance

$$L(x_1, \ldots, x_n ; m ; \sigma) = f(x_1) \times \cdots \times f(x_n) = \left(\frac{1}{\sigma \sqrt{2 \pi}}\right)^n \exp \left(-\frac{1}{2} \sum_{i=1}^n \left(\frac{x_i - m}{\sigma}\right)^2\right)$$

#### Log-vraisemblance

$$\ln L(x_1, \ldots, x_n ; m ; \sigma) = -n \ln \sigma - n \ln[\sqrt{2 \pi}] - \frac{1}{2} \sum_{i=1}^n \left(\frac{x_i - m}{\sigma}\right)^2$$

#### EMV de $m$

$$\frac{\partial \ln L(\cdot)}{\partial m} = 0 \Rightarrow \left(-\frac{2}{2 \sigma^2} \sum_{i=1}^n (x_i - m)\right) = 0$$

D'où :

> [!IMPORTANT]
> $$\boxed{\hat{m} = \frac{1}{n} \sum_{i=1}^n x_i = \bar{x}}$$

#### EMV de $\sigma$

$$\frac{\partial \ln L(\cdot)}{\partial \sigma} = -\frac{n}{\sigma} + \frac{4 \delta \sum_{i=1}^n (x_i - m)^2}{4 \sigma^3} = 0$$

Alors :

> [!IMPORTANT]
> $$\boxed{\hat{\sigma}^2 = \frac{1}{n} \sum_{i=1}^n (x_i - \hat{m})^2 = s^2}$$

---

### Propriétés de $\hat{m}(X_1, \ldots, X_n)$

On peut démontrer que $\hat{m}(X_1, \ldots, X_n)$ satisfait **toutes les propriétés** :

| Propriété | Démonstration |
|-----------|---------------|
| **Sans biais** | $E[\hat{m}(X_1, \ldots, X_n)] = m$ |
| **Efficace** | $I(m) = 1/V[\hat{m}(X_1, \ldots, X_n)] = n/\sigma^2$ |
| **Convergent** | $\lim_{n \to \infty} V[\hat{m}(X_1, \ldots, X_n)] = \lim_{n \to \infty} \frac{\sigma^2}{n} = 0$ |
| **Exhaustif** | $m^* = c \frac{\sum_{i=1}^n \alpha(X_i)}{n} = c \bar{X}$. Pour $c = 1$, $\hat{m}(X_1, \ldots, X_n)$ appartient à la famille $m^*$ |

---

### Le problème du biais de la variance empirique $S^2$

> [!WARNING]
> On peut démontrer que la **variance empirique $S^2$ est biaisée** !

En effet :

$$E(S^2) = \sigma^2 - \frac{\sigma^2}{n}$$

Le biais est donc $-\frac{\sigma^2}{n}$.

On effectue une mise en facteur :

$$E(S^2) = \sigma^2 - \frac{\sigma^2}{n} = \sigma^2 \left(\frac{n - 1}{n}\right)$$

#### Correction du biais

Pour neutraliser le biais, il suffit de multiplier la variance $S^2$ par l'inverse du terme entre parenthèses afin de trouver une **variance non biaisée** (variance empirique corrigée du biais que l'on notera $\hat{S}^2$) :

> [!IMPORTANT]
> $$\boxed{\hat{S}^2 = S^2 \left(\frac{n}{n - 1}\right) = \frac{1}{n - 1} \sum_{i=1}^n (X_i - \hat{m})^2}$$

---

## 💡 Conseils Pratiques

> [!TIP]
> **Conseil 1 : Échantillon empirique vs théorique**
> 
> La méthode du maximum de vraisemblance s'applique à l'**échantillon empirique** $(x_1, \ldots, x_n)$. Les propriétés de l'estimateur ainsi trouvé sont vérifiées sur l'**échantillon théorique** $(X_1, \ldots, X_n)$.

> [!TIP]
> **Conseil 2 : Que faire si un estimateur est biaisé ?**
> 
> Si $E[\hat{\theta}(X_1, \ldots, X_n)] = k \theta$, alors le biais est neutralisé en concevant un nouvel ESB $\tilde{\theta}$ tel que :
> 
> $$\tilde{\theta} = \frac{1}{k} \hat{\theta}$$

---

## 📊 Tableau récapitulatif des résultats

| Exercice | Loi | Paramètre | Estimateur | Sans biais | Efficace | Convergent |
|----------|-----|-----------|------------|------------|----------|------------|
| 1 | $B(10; p)$ | $p$ | $\hat{p} = \frac{\bar{K}}{10}$ | ✅ | ✅ | ✅ |
| 2 | $f(x) = \frac{1}{\theta}e^{-x/\theta}$ | $\theta$ | $\hat{\theta} = \bar{x}$ | ✅ | ✅ | ✅ |
| 4 | $f(x) = \frac{2}{\theta}xe^{-x^2/\theta}$ | $\theta$ | $\hat{\theta} = \overline{x^2}$ | ✅ | ✅ | ✅ |
| 5 | $B(1; p)$ | $p$ | $\hat{p} = \bar{x}$ | ✅ | ✅ | ✅ |
| 6 | $N(m; \sigma)$ | $m$ | $\hat{m} = \bar{x}$ | ✅ | ✅ | ✅ |
| 6 | $N(m; \sigma)$ | $\sigma^2$ | $S^2 = \frac{1}{n}\sum(x_i - \bar{x})^2$ | ❌ | — | — |
| 6 | $N(m; \sigma)$ | $\sigma^2$ | $\hat{S}^2 = \frac{1}{n-1}\sum(x_i - \bar{x})^2$ | ✅ | — | — |

---

*Chapitre 9 — Estimation Ponctuelle*
