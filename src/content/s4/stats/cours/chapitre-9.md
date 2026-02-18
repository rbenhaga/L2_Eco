# ESTIMATION PONCTUELLE

## SOMMAIRE

**Fiche de synthèse** 239

**Exercice 1 : Application du principe du maximum de vraisemblance à une loi binomiale** 239

**Exercice 2 : Application du principe du maximum de vraisemblance à une densité quelconque** 246

**Exercice 3 : Application du principe du maximum de vraisemblance à une densité quelconque avec utilisation de la fonction Gamma** 250

**Exercice 4 : Application du principe du maximum de vraisemblance à une densité quelconque avec utilisation de la fonction Gamma** 254

**Exercice 5 : Application du principe du maximum de vraisemblance à la loi de Bernoulli** 257

**Exercice 6 : Application du principe du maximum de vraisemblance à la loi normale afin d'identifier un biais** 261

---

Au chapitre précédent, nous avons constaté que le calcul de probabilités était dépendant de certains paramètres. Par exemple, dans le cadre des calculs de probabilités relevant de la loi normale, il est nécessaire de connaître les paramètres m et σ lorsque X ~ N(m; σ). Jusqu'ici, ces paramètres de la population ont été considérés comme connus. Or en réalité, la connaissance de m et σ n'est pas systématique car les populations ont des tailles parfois trop grandes et les enquêtes sont trop coûteuses pour pouvoir sonder une population. Il est donc possible de faire l'approximation de certains paramètres en recourant aux informations relatives à l'échantillon. Par conséquent, si X ~ N(m; σ) ne peut être utilisé car m et σ sont inconnus, il faut alors chercher des estimateurs pour m et σ, tout en vérifiant que ces estimateurs respectent certaines propriétés désirables. Dans la pratique, la moyenne arithmétique est un bon estimateur de la moyenne de la population. Cependant, certains estimateurs connus ne sont pas toujours adaptés. La méthode du maximum de vraisemblance, utilisée tout au long de ce chapitre, permet précisément de trouver des estimateurs (qui fournissent des estimations ponctuelles et non des intervalles de valeurs possibles comme nous le verrons au Chapitre 11).

La méthode du maximum de vraisemblance permet de trouver la forme mathématique d'un estimateur grâce aux informations relatives à l'échantillon. Une fois cet estimateur obtenu, il est nécessaire de vérifier dans un second temps le respect des propriétés désirables. La première propriété est celle d'un estimateur sans biais. Elle signifie qu'en moyenne, l'estimateur donne la vraie valeur de la statistique recherchée. Les autres propriétés examinées dans ce chapitre sont : l'efficacité, la convergence et l'exhaustivité.

La méthode est intuitive. Elle consiste à trouver un (ou plusieurs) estimateur(s) tel que la probabilité (la vraisemblance) d'observer l'échantillon (a posteriori) est maximale. Ainsi, l'échantillon doit fournir la meilleure information possible. Maximiser la vraisemblance consiste à maximiser le produit des densités ou des probabilités individuelles, i.e., la probabilité d'obtenir l'image x₁ « et » l'image x₂, « et » l'image xₙ. La technique exige donc la connaissance de la loi de probabilité suivie par X afin de procéder à la maximisation de la vraisemblance. Nous avons notamment vu, dans les chapitres précédents, que les lois de probabilités pouvent être de plusieurs types : continues ou discrètes. Dans les exercices qui suivent, nous aborderons ces différents cas. Nous examinons en détail la méthode du maximum de vraisemblance et les propriétés désirables dans le premier exercice (les explications seront omises dans les exercices suivants).

## FICHE DE SYNTHÈSE

### Le maximum de vraisemblance : les étapes de la méthode

#### La fonction de vraisemblance

Afin de trouver un estimateur de θ, paramètre inconnu d'une loi de probabilité, la fonction de vraisemblance est construite en prenant le produit des densités de probabilités (dans le cas continu) ou le produit des probabilités individuelles (dans le cas discret), respectivement :

L(x₁, ..., xₙ; θ) = f(x₁) x ... x f(xₙ)

L(x₁, ..., xₙ; θ) = P(X = x₁) x ... x P(X = xₙ)

#### La fonction de Log-vraisemblance

La fonction de vraisemblance en logarithme est ensuite déduite afin de linéariser l'expression précédente :

ln L(x₁, ..., xₙ; θ) = Σ ln f(xᵢ)

ou

ln L(x₁, ..., xₙ; θ) = Σ ln P(X = xᵢ)

#### Maximisation

La fonction de Log-vraisemblance est ensuite maximisée de manière à trouver l'estimateur θ. On calcule l'équation du maximum de vraisemblance de la manière suivante (condition de premier ordre) :

∂ ln L(x₁, ..., xₙ; θ) / ∂θ = 0.

Les conditions du second ordre doivent être vérifiées :

∂² ln L(x₁, ..., xₙ; θ) / ∂θ² ≤ 0.

### EXERCICE 1 : APPLICATION DU PRINCIPE DU MAXIMUM DE VRAISEMBLANCE À UNE LOI BINOMIALE

On souhaite étudier les entreprises françaises dont l'effectif est de 10 salariés. En particulier, on s'intéresse aux personnes gagnant plus de 3 000 euros nets/mois. Pour cela,

1) Quelles lois proposez-vous pour les variables aléatoires Xᵢ et K ? Justifier.

2) On étudie m entreprises de 10 salariés pour lesquelles on dispose d'un échantillon empirique de la variable K : (k₁, ..., kₘ). Déterminez le(s) estimateur(s) du maximum de vraisemblance du (ou des) paramètre(s) de la loi de K.

3) Démontrer les propriétés du (ou des) estimateur(s).

#### 1) Quelles lois proposez-vous pour les variables aléatoires Xᵢ et K ? Justifier.

**Loi de Xᵢ ?**

- Épreuve aléatoire : « prendre un salarié au hasard dans une entreprise de 10 salariés ».
- La variable aléatoire X : « salaire en euros nets/mois ».
  - xᵢ = 1, (A) : « le salarié gagne au moins 3 000 euros nets/mois », p = P(A).
  - xᵢ = 0, (A̅) : « le salarié gagne moins de 3 000 euros nets/mois », avec (1 - p) = P(A̅) = q.

On a 2 événements mutuellement exclusifs et un seul tirage (une seule épreuve), d'où :

Xᵢ ~ B(1; p) avec P(Xᵢ = xᵢ) = pˣⁱ (1 - p)¹⁻ˣⁱ

**Loi de K ?**

Si on a 10 = n variables aléatoires indépendantes de Bernoulli, alors la somme donne une variable aléatoire suivant une loi binomiale :

K ~ B(10; p) avec P(K = k) = C₁₀ᵏ pᵏ (1 - p)¹⁰⁻ᵏ

#### 2) On étudie m entreprises de 10 salariés pour lesquelles on dispose d'un échantillon empirique de la variable K : (k₁, ..., kₘ). Déterminez le(s) estimateur(s) du maximum de vraisemblance du (ou des) paramètre(s) de la loi de K.

- À quoi sert l'utilisation de la méthode du maximum de vraisemblance ?

Si on souhaite calculer une probabilité pour un événement kᵢ, il est nécessaire de connaître la valeur de p. Il faut donc une forme analytique pour p, i.e., un estimateur que l'on notera p̂. Les calculs effectués sur l'échantillon doivent donner une estimation ponctuelle de p.

- Pourquoi « estimation ponctuelle » ?

Pour calculer une probabilité nous avons besoin d'une estimation issue de p̂. Dans le chapitre suivant, nous verrons qu'il est possible d'estimer un paramètre en lui donnant un intervalle. Notons qu'il n'est pas possible de munir p̂ d'un intervalle de valeurs, ceci impliquerait une infinité de probabilités estimées avec P(K = kᵢ).

L'estimateur issu de la méthode du maximum de vraisemblance (EMV) de p, seul paramètre de la loi de K à estimer, est basé sur le principe suivant : on va chercher l'estimateur p̂ qui rend la fonction de vraisemblance maximale (c'est-à-dire qui rend la probabilité d'apparition de l'échantillon observé a posteriori maximale). La fonction de vraisemblance L(.) se construit par le produit des probabilités individuelles, i.e., la probabilité d'observer x₁ « et » la probabilité d'observer x₂, « et » la probabilité d'observer xₘ :

L(k₁, ..., kₘ; p) = p(k₁) x ... x p(kₘ)
= Π C₁₀ᵏᵢ pᵏᵢ (1 - p)¹⁰⁻ᵏᵢ

- Remarque : La fonction de vraisemblance peut s'écrire L(k₁, ..., kₘ; p) ou L(.) pour raccourcir la notation.

- Remarque : La fonction de vraisemblance L(k₁, ..., kₘ; p) est définie sur un échantillon (k₁, k₂, ..., kₘ), puisque nous devons rendre la probabilité d'apparition de l'échantillon observé a posteriori maximale. Il s'agit de l'échantillon empirique. Les propriétés liées aux estimateurs seront au contraire démontrées dans le cadre d'échantillons théoriques.

Pour maximiser la vraisemblance, la fonction Log-vraisemblance (ln L) est retenue car le logarithme permet de linéariser un produit (il s'agit aussi d'une transformation monotone et croissante laissant l'extremum inchangé).

ln L(k₁, ..., kₘ; p) = Σ [ln C₁₀ᵏᵢ + kᵢ ln p + (10 - kᵢ) ln (1 - p)]

Le passage en logarithme n'est pas nécessaire si la forme mathématique de L(.) est suffisamment simple pour trouver instantanément p̂. Dans la pratique, il est quasiment impératif de passer en logarithme afin de travailler avec l'opérateur somme qui est plus facile à manier que l'opérateur produit.

La dérivée par rapport à p est :

∂ ln L(.) / ∂p = Σ [kᵢ / p - (10 - kᵢ) / (1 - p)]

L'équation du maximum de vraisemblance s'écrit :

∂ ln L(.) / ∂p = 0 ⇒ Σ [kᵢ / p̂ - (10 - kᵢ) / (1 - p̂)] = 0

D'où :

Σ kᵢ / p̂ - Σ (10 - kᵢ) / (1 - p̂) = 0

On trouve :

Σ kᵢ - m10 p̂ = 0

La solution existe, donc l'estimateur s'écrit :

p̂(k₁, ..., kₘ) = Σ kᵢ / m10 = k̅ / 10

Ce résultat signifie que pour calculer la probabilité P(K = k) = C₁₀ᵏ pᵏ (1 - p)¹⁰⁻ᵏ dont la seule inconnue est p, il faut remplacer p par son estimateur p̂.

Le résultat que nous avons trouvé correspond à un maximum si les conditions de second ordre sont vérifiées :

∂² ln L(.) / ∂p² = - Σ [kᵢ / p² + (10 - kᵢ) / (1 - p)²]

Par définition, 10 ≥ kᵢ. Par conséquent :

∂² ln L(k₁, ..., kₘ; p) / ∂p² = - Σ [kᵢ / p̂² + (10 - kᵢ) / (1 - p̂)²] ≤ 0

La dérivée seconde est négative, nous sommes bien en présence d'un maximum. Ainsi, l'estimateur relatif à p sur l'échantillon théorique s'écrit :

p̂(K₁, ..., Kₘ) = Σ Kᵢ / m10 = K̅ / 10

#### 3) Démontrez les propriétés du (ou des) estimateur(s).

Soit un échantillon théorique aléatoire de taille m, (K₁, K₂, ..., Kₘ). Nous travaillons désormais avec (K₁, K₂, ..., Kₘ) et non plus avec (k₁, k₂, ..., kₘ) de manière à montrer que les propriétés de l'estimateur p̂(K₁, ..., Kₘ) sont valables quelle soit l'échantillon.

- Hypothèse : Les Kᵢ sont supposés indépendants et identiquement distribués (i.i.d.). Cette hypothèse sera systématiquement utilisée (voir exercices suivants).

Il est nécessaire d'analyser immédiatement les propriétés qu'elle implique. Si les Kᵢ sont identiquement distribués, cela signifie que pour tout i = 1, ..., m : Kᵢ ≡ K donc :

E(Kᵢ) = E(K) = 10p [puisque K ~ B(10; p) : on rappelle que l'espérance d'une variable aléatoire suivant une loi binomiale est np].

V(Kᵢ) = V(K) = 10p(1 - p) [la variance d'une variable aléatoire suivant une loi binomiale est npq].

p̂(K₁, ..., Kₘ) est un estimateur sans biais (ESB).

L'estimateur p̂ est sans biais si son espérance est égale à sa vraie valeur, c'est-à-dire si :

E[p̂(K₁, ..., Kₘ)] = p

On a :

E[p̂(K₁, ..., Kₘ)] = E[Σ Kᵢ / 10m] = 1 / 10m Σ E[Kᵢ] = 1 / 10m * m10p = p

Donc :

E[p̂(K₁, ..., Kₘ)] = p, autrement dit, p̂(K₁, ..., Kₘ) est un ESB.

Interprétation : en prenant plusieurs échantillons et en calculant autant de fois p̂(K₁, ..., Kₘ), la moyenne de ces estimations donne le « vrai » paramètre p (celui qui serait estimé sur l'ensemble de la population). C'est la première exigence que l'on se fixe : obtenir en moyenne le vrai paramètre. Cependant la moyenne n'a de signification que si la variance est faible. Ce qui nous conduit à examiner la seconde propriété.

- p̂(K₁, ..., Kₘ) est un estimateur convergent.

p̂(K₁, ..., Kₘ) est un estimateur convergent s'il converge en limite de probabilité vers sa vraie valeur :

lim P(p̂ = p) = 1

Cela signifie que :

∀ ε > 0, ∃ η > 0 tel que P(|p̂ - p| > ε) < η

Autrement dit, lorsque la taille de l'échantillon est grande, la probabilité pour que l'estimateur s'éloigne de sa vraie valeur est nulle mais infinitésimale.

Comme p̂ est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0, soit :

lim V(p̂(K₁, ..., Kₘ)) = 0

On a :

V[p̂(K₁, ..., Kₘ)] = V[Σ Kᵢ / 10m] = 1 / (10m)² Σ V[Kᵢ] = 1 / 10²m² * m10p(1 - p) = pq / 10m

On a bien :

lim V(p̂(K₁, ..., Kₘ)) = 0

En définitive, p̂(K₁, ..., Kₘ) est un estimateur convergent (comme il est sans biais, on dit qu'il est absolument convergent).

On pourrait s'arrêter ici et se contenter d'avoir un estimateur absolument convergent. En effet si la variance tend vers 0, cela signifie qu'à chaque fois que l'on prend au hasard un échantillon assez grand, on est pratiquement sûr de ne pas s'éloigner de la vraie valeur p. Il est néanmoins possible d'être un peu plus exigeant en se demandant si la variance (mesurant la dispersion entre l'estimateur et sa vraie valeur) est bien la plus faible possible (il se peut que celle-ci ne tende pas vers 0 lorsque l'échantillon est de petite taille). Il s'agit de la troisième propriété : l'efficacité.

- L'estimateur p̂(K₁, ..., Kₘ) est efficace.

p̂(K₁, ..., Kₘ) est efficace s'il est un estimateur sans biais possédant une variance minimale. L'inégalité de Fréchet-Rao-Cramér-Darmois (FRCD) indique que tout estimateur sans biais vérifie :

V(p̂) ≥ 1 / I(p)

avec I(p) la quantité d'information de Fisher,

I(p) = - E[∂² ln L(.) / ∂p²]

La variance de l'estimateur est minimale si celle-ci est égale à la borne inférieure de l'inégalité de FRCD, i.e. :

V(p̂) = 1 / I(p)

Démontrons cette égalité. La quantité d'information de Fisher est donnée par :

I(p) = - E[∂² ln L(.) / ∂p²] = - E[- Σ Kᵢ / p² + Σ (10 - Kᵢ) / (1 - p)²]

= Σ E[Kᵢ / p²] + Σ E[(10 - Kᵢ) / (1 - p)²]

= 1 / p² Σ E[Kᵢ] + 1 / (1 - p)² Σ E[10 - Kᵢ]

= 10mp / p² + 10m(1 - p) / (1 - p)²

= 10mp / p² + 10m(1 - p) / (1 - p)²

= 10m / p(1 - p)

Et donc,

1 / I(p) = p(1 - p) / 10m

Or, nous avons vu que :

V(p̂) = p(1 - p) / 10m

Donc,

V(p̂) = 1 / I(p)

Ainsi, l'estimateur p̂ est efficace.

En conclusion, l'estimateur p̂(K₁, ..., Kₘ) = Σ Kᵢ / 10m est un estimateur sans biais, convergent et efficace.

Soit $(x_1, ..., x_n)$ un échantillon aléatoire de taille $n$ provenant d'une variable aléatoire de densité $f(x; \theta)$ telle que :

$$f(x; \theta) = \frac{1}{\theta} e^{-\frac{x}{\theta}}; x > 0 \text{ et } \theta > 0.$$

1) En détaillant votre démarche, déterminez l'estimateur du maximum de vraisemblance.

L'EMV de $\theta$, seul paramètre de la loi de X à estimer, est basé sur le principe suivant : on cherche l'estimateur $\hat{\theta}$ qui rend la fonction de vraisemblance maximale (c'est-à-dire qui rend la probabilité d'apparition de l'échantillon observé a posteriori maximale). La fonction de vraisemblance se construit par le produit des densités de probabilités :

$$L(x_1, ..., x_n; \theta) = f(x_1) \times \cdots \times f(x_n).$$

La fonction de Log-vraisemblance est :

$$\ln L(x_1, ..., x_n; \theta) = -n \ln \theta - \sum_{i=1}^n \frac{x_i}{\theta}.$$

On applique la condition de premier ordre :

$$\frac{\partial \ln L(x_1, ..., x_n; \theta)}{\partial \theta} = 0.$$

On a :

$$\frac{\partial \ln L(x_1, ..., x_n; \theta)}{\partial \theta} = -\frac{n}{\theta} + \sum_{i=1}^n \frac{x_i}{\theta^2} = 0.$$

On obtient :

$$\hat{\theta} = \frac{\sum_{i=1}^n x_i}{n} = \bar{x}.$$

Donc $\hat{\theta}(x_1, ..., x_n) = \bar{x}$. On suppose que les conditions de second ordre sont remplies :

$$\frac{\partial^2 \ln L(x_1, ..., x_n; \theta)}{\partial \theta^2} \leq 0.$$

2) Démontrez les propriétés de l'estimateur obtenu.

Soit un échantillon aléatoire de taille $n, (X_1, ..., X_n)$, associé à la densité de probabilité $f(x; \theta)$. Nous supposons que les $X_i$ sont indépendantes et identiquement distribuées (i.i.d). Cela implique que pour tout $i = 1, ..., n; X_i \equiv X$ où :

$$E(X_i) = E(X) \text{ et } V(X_i) = V(X);$$

$X_i$ et $X_j$ sont indépendantes pour tout $i \neq j$.

- **L'estimateur $\hat{\theta}$ est sans biais.**

  $\hat{\theta}(X_1, ..., X_n)$ est sans biais si son espérance est égale à sa vraie valeur : $E[\hat{\theta}(X_1, ..., X_n)] = \theta.$

  On a :

  $$E[\hat{\theta}(X_1, ..., X_n)] = E\left[\frac{1}{n} \sum_{i=1}^n X_i\right] = \frac{1}{n} \sum_{i=1}^n E(X_i) = \frac{1}{n} \cdot n E(X) = E(X).$$

  Or, nous avons vu au Chapitre 3 que :

  $$E(X) = \int_0^{\infty} x f(x) dx = \int_0^{\infty} x \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = \theta \Gamma(2) = \theta \cdot 1! = \theta.$$

  Donc $E[\hat{\theta}(X_1, ..., X_n)] = \theta$.

  Donc $\hat{\theta}(X_1, ..., X_n)$ est un estimateur sans biais.

- **L'estimateur $\hat{\theta}$ est efficace.**

  $\hat{\theta}(X_1, ..., X_n)$ est un estimateur efficace s'il est sans biais et s'il possède une variance minimale. D'après l'inégalité de Fréchet-Rao-Cramér-Darmois, tout estimateur sans biais vérifie :

  $$V(\hat{\theta}) \geq \frac{1}{I(\theta)},$$

  avec $I(\theta)$ la quantité d'information de Fisher,

  $$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right].$$

  La variance de l'estimateur sera minimale si celle-ci est égale à la borne inférieure de l'inégalité de FRCD :

  $$V(\hat{\theta}) = \frac{1}{I(\theta)}.$$

  Déterminons $I(\theta)$ en recherchant $V(\hat{\theta}(X_1, ..., X_n))$ :

  $$V(\hat{\theta}(X_1, ..., X_n)) = V\left[\frac{1}{n} \sum_{i=1}^n X_i\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i) = \frac{1}{n^2} \cdot n V(X) = \frac{V(X)}{n}.$$

  Or, nous savons que $V(X) = E(X^2) - [E(X)]^2$, donc en effectuant le même changement de variable que précédemment :

  $$E(X^2) = \int_0^{\infty} x^2 \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = \theta^2 \Gamma(3) = 2 \theta^2.$$

  Donc :

  $$V(X) = E(X^2) - [E(X)]^2 = 2 \theta^2 - \theta^2 = \theta^2.$$

  On en déduit alors :

  $$V(\hat{\theta}(X_1, ..., X_n)) = \frac{1}{n} V(X) = \frac{\theta^2}{n}.$$

  Nous avons trouvé la première partie de l'égalité que nous voulons démontrer. Cherchons désormais la quantité d'information de Fisher :

  $$I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right] = -E\left[\frac{n}{\theta^2} - 2 \frac{\sum_{i=1}^n X_i}{\theta^3}\right] = -\frac{n}{\theta^2} + 2 \frac{n \theta}{\theta^3} = \frac{n}{\theta^2}.$$

  En rassemblant les résultats précédents, on a :

  $$V(\hat{\theta}(X_1, ..., X_n)) = \frac{\theta^2}{n} = \frac{1}{I(\theta)}.$$

  L'estimateur $\hat{\theta}(X_1, ..., X_n)$ est donc efficace, car sa variance est minimale.

- **$\hat{\theta}$ est un estimateur convergent.**

  $\hat{\theta}(X_1, ..., X_n)$ est un estimateur convergent si $\lim_{n \to \infty} P(|\hat{\theta} - \theta| > \epsilon) = 0.$

  Autrement dit :

  $$\forall \eta > 0, \exists \eta > 0 \text{ et } \exists \epsilon > 0 \text{ tels que } P(|\hat{\theta} - \theta| > \epsilon) < \eta.$$

  # EXERCICE 4 : APPLICATION DU PRINCIPE DU MAXIMUM DE VRAISEMBLANCE À UNE DENSITÉ QUELCONQUE AVEC UTILISATION DE LA FONCTION GAMMA

Soit \((x_1, \ldots, x_n)\) un échantillon aléatoire de taille \(n\) provenant d'une variable aléatoire X de densité \(f(x, \theta)\) suivante :

\[f(x ; \theta) = \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} ; x > 0 \text{ et } \theta > 0.\]

1) En détaillant votre démarche, déterminez l'estimateur du maximum de vraisemblance.

2) Démontrez les propriétés de l'estimateur obtenu.

## 1) En détaillant votre démarche, déterminez l'estimateur du maximum de vraisemblance.

L'EMV de \(\theta\), seul paramètre de la loi de X à estimer, est basé sur le principe suivant : on cherche l'estimateur \(\hat{\theta}\) qui rend la fonction de vraisemblance maximale (c'est-à-dire qui rend la probabilité d'apparition de l'échantillon observé a posteriori maximale). La fonction de vraisemblance se construit par le produit des densités de probabilités :

\[L(x_1, \ldots, x_n ; \theta) = f(x_1) \times \cdots \times f(x_n).\]

La fonction de Log-vraisemblance est :

\[\ln L(x_1, \ldots, x_n ; \theta) = n \ln 2 - n \ln \theta + \sum_{i=1}^n \ln x_i - \sum_{i=1}^n \frac{x_i^2}{\theta}.\]

On applique la condition de premier ordre :

\[\frac{\partial \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta} = 0.\]

On a :

\[\frac{\partial \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta} = -\frac{n}{\theta} + \sum_{i=1}^n \frac{x_i^2}{\theta^2} = 0.\]

On obtient :

\[\hat{\theta} = \frac{\sum_{i=1}^n x_i^2}{n} = \bar{x^2}.\]

Donc \(\hat{\theta}(x_1, \ldots, x_n) = \bar{x^2}\). On suppose que les conditions de second ordre sont remplies :

\[\frac{\partial^2 \ln L(x_1, \ldots, x_n ; \theta)}{\partial \theta^2} \leq 0.\]

## 2) Démontrez les propriétés de l'estimateur obtenu.

Soit un échantillon théorique aléatoire de taille \(n, (X_1, \ldots, X_n)\), associé à la densité de probabilité \(f(x ; \theta)\). Nous supposons que les \(X_i\) sont indépendantes et identiquement distribuées (i.i.d). Cela implique que pour tout \(i = 1, \ldots, n ; X_i \equiv X\) où :

\[E(X_i) = E(X) \text{ et } V(X_i) = V(X) ;\]

\(X_i\) et \(X_j\) sont indépendantes pour tout \(i \neq j\).

- L'estimateur \(\hat{\theta}\) est sans biais.

  \(\hat{\theta}(X_1, \ldots, X_n)\) est sans biais si son espérance est égale à sa vraie valeur : \(E[\hat{\theta}(X_1, \ldots, X_n)] = \theta\).

  On a :

  \[E[\hat{\theta}(X_1, \ldots, X_n)] = E\left[\frac{1}{n} \sum_{i=1}^n X_i^2\right] = \frac{1}{n} \sum_{i=1}^n E(X_i^2) = \frac{1}{n} \cdot n E(X^2) = E(X^2).\]

  Or, nous avons vu au Chapitre 3 que :

  \[E(X^2) = \int_0^{\infty} x^2 f(x) dx = \int_0^{\infty} x^2 \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} dx = \theta \Gamma(2) = \theta \cdot 1! = \theta.\]

  Donc \(E[\hat{\theta}(X_1, \ldots, X_n)] = \theta\).

  Donc \(\hat{\theta}(X_1, \ldots, X_n)\) est un estimateur sans biais.

- L'estimateur \(\hat{\theta}\) est efficace.

  \(\hat{\theta}(X_1, \ldots, X_n)\) est un estimateur efficace s'il est sans biais et s'il possède une variance minimale. D'après l'inégalité de Fréchet-Rao-Cramér-Darmois, tout estimateur sans biais vérifie :

  \[V(\hat{\theta}) \geq \frac{1}{I(\theta)},\]

  avec \(I(\theta)\) la quantité d'information de Fisher,

  \[I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right].\]

  La variance de l'estimateur sera minimale si celle-ci est égale à la borne inférieure de l'inégalité de FRCD :

  \[V(\hat{\theta}) = \frac{1}{I(\theta)}.\]

  Déterminons \(I(\theta)\) en recherchant \(V(\hat{\theta}(X_1, \ldots, X_n))\) :

  \[V(\hat{\theta}(X_1, \ldots, X_n)) = V\left[\frac{1}{n} \sum_{i=1}^n X_i^2\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i^2) = \frac{1}{n^2} \cdot n V(X^2) = \frac{V(X^2)}{n}.\]

  Or, nous savons que \(V(X^2) = E(X^4) - [E(X^2)]^2\), donc en effectuant le même changement de variable que précédemment :

  \[E(X^4) = \int_0^{\infty} x^4 \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} dx = \theta^2 \Gamma(3) = 2 \theta^2.\]

  Donc :

  \[V(X^2) = E(X^4) - [E(X^2)]^2 = 2 \theta^2 - \theta^2 = \theta^2.\]

  On en déduit alors :

  \[V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{1}{n} V(X^2) = \frac{\theta^2}{n}.\]

  Nous avons trouvé la première partie de l'égalité que nous voulons démontrer. Cherchons désormais la quantité d'information de Fisher :

  \[I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right] = -E\left[\frac{n}{\theta^2} - 2 \frac{\sum_{i=1}^n X_i^2}{\theta^3}\right] = -\frac{n}{\theta^2} + 2 \frac{n \theta}{\theta^3} = \frac{n}{\theta^2}.\]

  En rassemblant les résultats précédents, on a :

  \[V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{\theta^2}{n} = \frac{1}{I(\theta)}.\]

  L'estimateur \(\hat{\theta}(X_1, \ldots, X_n)\) est donc efficace, car sa variance est minimale.

- \(\hat{\theta}\) est un estimateur convergent.

  \(\hat{\theta}(X_1, \ldots, X_n)\) est un estimateur convergent si \(\lim_{n \to \infty} P(|\hat{\theta} - \theta| > \epsilon) = 0\).

  Autrement dit :

  \[\forall \eta > 0, \exists \eta > 0 \text{ et } \exists \epsilon > 0 \text{ tels que } P(|\hat{\theta} - \theta| > \epsilon) < \eta.\]

avec \(I(\theta)\) la quantité d'information de Fisher,

\[I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right].\]

La variance de l'estimateur est minimale si :

\[V(\hat{\theta}) = \frac{1}{I(\theta)}.\]

On a :

\[V(\hat{\theta}(X_1, \ldots, X_n)) = V\left[\frac{\sum_{i=1}^n X_i^2}{n}\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i^2) = \frac{1}{n^2} \cdot n V(X^2) = \frac{V(X^2)}{n}.\]

L'expression de \(V(X^2)\) est donnée par :

\[V(X^2) = E(X^4) - [E(X^2)]^2.\]

Avec le même changement de variable vu précédemment, on a :

\[E(X^4) = \int_0^{\infty} x^4 f(x) dx = \int_0^{\infty} x^4 \frac{2}{\theta} x e^{-\frac{x^2}{\theta}} dx = \theta^2 \Gamma(3) = 2 \theta^2.\]

Donc :

\[V(X^2) = E(X^4) - [E(X^2)]^2 = 2 \theta^2 - \theta^2 = \theta^2.\]

D'où :

\[V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{\theta^2}{n}.\]

Calculons maintenant \(I(\theta)\) :

\[I(\theta) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial \theta^2}\right] = -E\left[\frac{n}{\theta^2} - 2 \frac{\sum_{i=1}^n X_i^2}{\theta^3}\right] = -\frac{n}{\theta^2} + 2 \frac{n \theta}{\theta^3} = \frac{n}{\theta^2}.\]

On trouve au final :

\[V(\hat{\theta}(X_1, \ldots, X_n)) = \frac{1}{I(\theta)}.\]

L'estimateur \(\hat{\theta}(X_1, \ldots, X_n)\) est donc efficace, car sa variance atteint la borne inférieure de l'inégalité de FRCD.

- \(\hat{\theta}\) est un estimateur convergent.

  \(\hat{\theta}(X_1, \ldots, X_n)\) est un estimateur convergent s'il converge en limite de probabilité vers sa vraie valeur :

  \[\lim_{n \to \infty} P(\hat{\theta} = \theta) = 1.\]

  Cela signifie que :

  \[\forall \epsilon > 0, \exists \eta > 0 \text{ tel que } P(|\hat{\theta} - \theta| > \epsilon) < \eta.\]

  Comme \(\hat{\theta}\) est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0, soit :

  \[\lim_{n \to \infty} V(\hat{\theta}(X_1, \ldots, X_n)) = 0.\]

  On a :

  \[\lim_{n \to \infty} V(\hat{\theta}(X_1, \ldots, X_n)) = \lim_{n \to \infty} \frac{\theta^2}{n} = 0.\]

  L'estimateur est donc convergent. De plus, comme il est sans biais, il est absolument convergent.

# EXERCICE 5 : APPLICATION DU PRINCIPE DU MAXIMUM DE VRAISEMBLANCE À LA LOI DE BERNOULLI

Un institut de sondage se propose d'étudier la population française au mois de janvier 2005. Il définit pour cela la variable aléatoire suivante :

\(X_i\) prend la valeur 1 si le ième individu de la population française est atteint par la grippe, et 0 sinon.

1) Quelle loi proposez-vous pour \(X_i\) ? Justifiez votre choix.

2) Soit un échantillon \((x_1, \ldots, x_n)\) provenant de la loi de \(X_i\). Déterminez l'estimateur du maximum de vraisemblance du paramètre issu de la loi de \(X_i\).

3) Démontrez les propriétés de cet estimateur.

## 1) Quelle loi proposez-vous pour \(X_i\) ? Justifiez votre choix.

- Épreuve aléatoire : « prendre un individu au hasard ».
- La variable aléatoire \(X_i\) : « état de l'individu i ».

De l'épreuve aléatoire, on déduit deux événements :
- \(x_i = 1, A\) : « l'individu est malade » ; \(p = P(A)\) ;
- \(x_i = 0, \overline{A}\) : « l'individu est sain » ; \((1 - p) = q = P(\overline{A})\).

L'ensemble des possibles : \(X(\Omega) = \{0 ; 1\}\).

Il y a 2 probabilités mutuellement exclusives et une seule épreuve. La variable aléatoire suit donc une loi de Bernoulli : \(X_i \sim B(1 ; p)\), avec :

\[P(X_i = x_i) = p^{x_i} (1 - p)^{1 - x_i}.\]

## 2) Soit un échantillon \((x_1, \ldots, x_n)\) provenant de la loi de \(X_i\). Déterminez l'estimateur du maximum de vraisemblance du paramètre issu de la loi de \(X_i\).

On dispose d'un échantillon \((x_1, \ldots, x_n)\). L'estimateur par maximum de vraisemblance (EMV) de p, seul paramètre de la loi de \(X_i\) à estimer, est basé sur le principe suivant : on va chercher l'estimateur \(\hat{p}\) qui rend la fonction de vraisemblance maximale (c'est-à-dire qui rend la probabilité d'apparition de l'échantillon observé a posteriori maximale). La fonction de vraisemblance \(L(\cdot)\) se construit par le produit des probabilités individuelles :

\[L(x_1, \ldots, x_n ; p) = P(X = x_1) \times \cdots \times P(X = x_n).\]

La Log-vraisemblance est :

\[\ln L(x_1, \ldots, x_n ; p) = \sum_{i=1}^n x_i \ln p + (n - \sum_{i=1}^n x_i) \ln (1 - p).\]

On calcule la dérivée par rapport à p :

\[\frac{\partial \ln L(\cdot)}{\partial p} = \frac{\sum_{i=1}^n x_i}{p} - \frac{n - \sum_{i=1}^n x_i}{1 - p}.\]

On applique la condition de premier ordre (les conditions du second ordre étant faciles à vérifier) :

\[\frac{\partial \ln L(\cdot)}{\partial p} = 0 \Rightarrow \hat{p} = \frac{\sum_{i=1}^n x_i}{n} = \bar{x}.\]

On a donc : \(\hat{p}(x_1, \ldots, x_n) = \bar{x}\).

## 3) Démontrez les propriétés de cet estimateur.

On suppose que les \(X_i\) sont indépendantes et identiquement distribuées, cela signifie que pour tout \(i = 1, \ldots, n ; X_i \equiv X\), donc :

\[E(X_i) = E(X) = p \text{ [puisque X ~ B(1 ; p) : on rappelle que l'espérance d'une variable aléatoire de Bernoulli est p]} ;\]

\[V(X_i) = V(X) = p(1 - p) \text{ [la variance d'une variable aléatoire de Bernoulli est pq]}.\]

- \(\hat{p}(X_1, \ldots, X_n)\) est un estimateur sans biais (ESB).

  L'estimateur \(\hat{p}(X_1, \ldots, X_n)\) est sans biais si son espérance est égale à sa vraie valeur :

  \[E[\hat{p}(X_1, \ldots, X_n)] = p.\]

  On a :

  \[E[\hat{p}(X_1, \ldots, X_n)] = E\left[\frac{\sum_{i=1}^n X_i}{n}\right] = \frac{1}{n} \sum_{i=1}^n E[X_i] = \frac{1}{n} \cdot n p = p.\]

- L'estimateur \(\hat{p}(X_1, \ldots, X_n)\) est efficace.

  L'inégalité de Fréchet-Rao-Cramér-Darmois indique que tout estimateur sans biais vérifie :

  \[V(\hat{p}) \geq \frac{1}{I(p)},\]

  avec \(I(p)\) la quantité d'information de Fisher,

  \[I(p) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial p^2}\right].\]

  La variance de l'estimateur est minimale si :

  \[V(\hat{p}) = \frac{1}{I(p)}.\]

  On a :

  \[V(\hat{p}(X_1, \ldots, X_n)) = V\left[\frac{\sum_{i=1}^n X_i}{n}\right] = \frac{1}{n^2} \sum_{i=1}^n V(X_i) = \frac{1}{n^2} \cdot n p(1 - p) = \frac{p(1 - p)}{n}.\]

  Par ailleurs, la quantité d'information de Fisher est donnée par :

  \[I(p) = -E\left[\frac{\partial^2 \ln L(\cdot)}{\partial p^2}\right] = -E\left[-\frac{\sum_{i=1}^n X_i}{p^2} - \frac{n - \sum_{i=1}^n X_i}{(1 - p)^2}\right] = \frac{n}{p(1 - p)}.\]

  Donc :

  \[V(\hat{p}(X_1, \ldots, X_n)) = \frac{1}{I(p)}.\]

  L'estimateur \(\hat{p}(X_1, \ldots, X_n)\) est donc efficace.

- L'estimateur \(\hat{p}\) est convergent.

  \(\hat{p}(X_1, \ldots, X_n)\) est un estimateur convergent s'il converge en limite de probabilité vers sa vraie valeur :

  \[\lim_{n \to \infty} P(\hat{p} = p) = 1.\]

  Cela signifie que :

  \[\forall \epsilon > 0, \exists \eta > 0 \text{ tel que } P(|\hat{p} - p| > \epsilon) < \eta.\]

  Comme \(\hat{p}\) est un ESB, montrer qu'il est convergent revient à montrer que lorsque la taille de l'échantillon augmente, la variance de l'estimateur tend vers 0, soit :

  \[\lim_{n \to \infty} V(\hat{p}(X_1, \ldots, X_n)) = 0.\]

  On a :

  \[\lim_{n \to \infty} V(\hat{p}(X_1, \ldots, X_n)) = \lim_{n \to \infty} \frac{p(1 - p)}{n} = 0.\]

  L'estimateur est donc convergent. De plus, comme il est sans biais, il est absolument convergent.

  # EXERCICE 6 : APPLICATION DU PRINCIPE DU MAXIMUM DE VRAISEMBLANCE À LA LOI NORMALE AFIN D'IDENTIFIER UN BIAS

Soit \(X\) la variable aléatoire continue : « taille des individus » avec \(X \sim N(m ; \sigma)\). Déterminez le(s) estimateur(s) du maximum de vraisemblance du (des) paramètre(s) issu(s) de la loi de \(X\).

Cet exercice a pour but de montrer deux choses par rapport aux exercices vus précédemment :

(i) le maximum de vraisemblance peut permettre de trouver plus d'un EMV ;

(ii) il est possible qu'un EMV ne remplisse pas la condition minimale « sans biais ».

Si \(X\) suit une loi normale, la densité de probabilité est donnée par :

\[f(x) = \frac{1}{\sigma \sqrt{2 \pi}} \exp \left(-\frac{1}{2} \left(\frac{x - m}{\sigma}\right)^2\right).\]

Les EMV de \(\sigma\) et \(m\), seuls paramètres de la loi de \(X\) à estimer sont basés sur le principe suivant : on cherche les estimateurs \(\hat{\sigma}\) et \(\hat{m}\) qui rendent la fonction de vraisemblance maximale. On cherche tout d'abord la fonction de vraisemblance :

\[L(x_1, \ldots, x_n ; m ; \sigma) = f(x_1) \times \cdots \times f(x_n) = \left(\frac{1}{\sigma \sqrt{2 \pi}}\right)^n \exp \left(-\frac{1}{2} \sum_{i=1}^n \left(\frac{x_i - m}{\sigma}\right)^2\right).\]

On détermine ensuite la Log-vraisemblance :

\[\ln L(x_1, \ldots, x_n ; m ; \sigma) = -n \ln \sigma - n \ln[\sqrt{2 \pi}] - \frac{1}{2} \sum_{i=1}^n \left(\frac{x_i - m}{\sigma}\right)^2.\]

On applique la condition de premier ordre :

\[\frac{\partial \ln L(\cdot)}{\partial m} = 0 \Rightarrow \left(-\frac{2}{2 \sigma^2} \sum_{i=1}^n (x_i - m)\right) = 0.\]

D'où :

\[\hat{m} = \frac{1}{n} \sum_{i=1}^n x_i = \bar{x}.\]

On fait de même pour \(\sigma\) :

\[\frac{\partial \ln L(\cdot)}{\partial \sigma} = -\frac{n}{\sigma} + \frac{4 \delta \sum_{i=1}^n (x_i - m)^2}{4 \sigma^3} = 0.\]

Alors :

\[\hat{\sigma}^2 = \frac{1}{n} \sum_{i=1}^n (x_i - \hat{m})^2 = s^2.\]

On peut démontrer que \(\hat{m}(X_1, \ldots, X_n)\) satisfait toutes les propriétés :

- \(E[\hat{m}(X_1, \ldots, X_n)] = m\) ;

- \(I(m) = 1/V[\hat{m}(X_1, \ldots, X_n)] = n/\sigma^2\) ;

- \(\lim_{n \to \infty} V[\hat{m}(X_1, \ldots, X_n)] = \lim_{n \to \infty} \frac{\sigma^2}{n} = 0\) ;

- \(m^* = c \frac{\sum_{i=1}^n \alpha(X_i)}{n} = c \bar{X}\). Pour \(c = 1\), \(\hat{m}(X_1, \ldots, X_n)\) appartient à la famille \(m^*\).

On peut démontrer que la variance empirique \(S^2\) est biaisée, en effet :

\[E(S^2) = \hat{\sigma}^2 - \frac{\sigma^2}{n}.\]

Le biais est donc \(-\frac{\sigma^2}{n}\). On effectue une mise en facteur :

\[E(S^2) = \hat{\sigma}^2 - \frac{\sigma^2}{n} = \hat{\sigma}^2 \left(\frac{n - 1}{n}\right).\]

Pour neutraliser le biais, il suffit de multiplier la variance \(S^2\) par l'inverse du terme entre parenthèses afin de trouver une variance non biaisée (variance empirique corrigée du biais que l'on notera \(\hat{S}^2\)) :

\[\hat{S}^2 = \hat{\sigma}^2 \left(\frac{n}{n - 1}\right) = \frac{1}{n - 1} \sum_{i=1}^n (X_i - \hat{m})^2.\]

# CONSEILS PRATIQUES

1) La méthode du maximum de vraisemblance s'applique à l'échantillon empirique \((x_1, \ldots, x_n)\). Les propriétés de l'estimateur ainsi trouvé sont vérifiées sur l'échantillon théorique \((X_1, \ldots, X_n)\).

2) Que fait-on si un estimateur ne satisfait pas la première propriété « sans biais » ?

Si \(E[\hat{\theta}(X_1, \ldots, X_n)] = k \theta\), alors le biais est neutralisé en concevant un nouvel ESB \(\hat{\theta}\) tel que : \(\hat{\theta} = \frac{1}{k} \hat{\theta}\).