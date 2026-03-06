Voici un **cours complet (niveau L2 S4)** sur les **distributions d'echantillonnage**, enrichi (explications + methodes + points d'examen + demonstrations exigibles), puis **un unique exercice type** (enonce + correction guidee) qui **fusionne toutes les notions/methodes des exercices 1 a 5**.

---

# Chapitre 8 - Distributions d'echantillonnage (Cours complet)

## 1) Idee centrale : une statistique d'echantillon est une variable aleatoire

On observe une population decrite par une variable aleatoire \(X\) (moyenne \(m\), variance \(\sigma^2\), proportion \(p\), etc.).
On preleve un echantillon aleatoire i.i.d. :
\[
(X_1,\dots,X_n)\quad \text{avec } X_i \stackrel{\text{i.i.d.}}{\sim} X
\]
A partir de l'echantillon, on calcule des **statistiques** (moyenne, proportion, variance empirique).
Ces statistiques dependent du tirage : **elles varient d'un echantillon a l'autre**, donc **elles ont une loi**.

### Notations (hyper importantes en redaction)

- **Population** : \(m=E[X]\), \(\sigma\), \(\sigma^2\), \(p\)
- **Echantillon (observe)** : \((x_1,\dots,x_n)\)
- **Statistiques (variables aleatoires)** :

  - moyenne : \(\overline{X}=\frac{1}{n}\sum_{i=1}^n X_i\) (realisation \(\bar{x}\))
  - variance empirique (au sens avec \(n\) comme dans ton cours) :
    \[
    S^2=\frac{1}{n}\sum_{i=1}^n (X_i-\overline{X})^2
    \]
  - variance corrigee (souvent notee \(\hat{S}^2\)) :
    \[
    \hat{S}^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\overline{X})^2=\frac{n}{n-1}S^2
    \]
  - proportion : si \(X_i\in\{0,1\}\) (succes/echec), alors
    \[
    F=\frac{1}{n}\sum_{i=1}^n X_i=\frac{X}{n}\quad \text{où } X=\sum X_i \text{ est un nombre de succes}
    \]

---

## 2) Le triptyque du chapitre : Normal / Student / Proportions

Tu dois savoir reconnaitre **quelle loi utiliser** selon :

- la **normalite** (donnee, ou via TCL),
- si \(\sigma\) est **connu** ou **inconnu**,
- si tu es sur des **moyennes** ou des **proportions**,
- si c'est **1 echantillon** ou **2 echantillons**.

---

# A) Lois liees a la moyenne \(\overline{X}\)

## A.1) Cas population normale et \(\sigma\) connu

**Hypothese :** \(X\sim \mathcal N(m,\sigma)\) et \(\sigma\) connu.

### Resultat a connaitre (et souvent a demontrer)

\[
\overline{X}\sim \mathcal N\!\left(m,\frac{\sigma}{\sqrt{n}}\right)
\]
Donc la variable centree-reduite :
\[
U=\frac{\overline{X}-m}{\sigma/\sqrt{n}}\sim \mathcal N(0,1)
\]

### Methode-type (probabilite sur une moyenne)

1. Identifier \(m,\sigma,n\)
2. Ecrire la loi de \(\overline{X}\)
3. Centrer-reduire vers \(U\sim \mathcal N(0,1)\)
4. Lire dans la table de la normale : \(F_U(z)=\mathbb P(U\le z)\)

---

## A.2) Cas \(\sigma\) inconnu : loi de Student

**Hypothese :** \(X\sim \mathcal N(m,\sigma)\), mais \(\sigma\) inconnu.
On remplace \(\sigma\) par l'ecart-type empirique (ou corrige selon convention de cours) : apparition de **Student**.

Forme utilisee dans ton poly (tres frequente en controle) :
\[
T=\frac{\overline{X}-m}{S/\sqrt{n-1}}=\frac{\overline{X}-m}{\hat{S}/\sqrt{n}}\sim t(n-1)
\]

### Methode-type (probabilite sur une moyenne avec \(\sigma\) inconnu)

1. Loi normale + \(\sigma\) inconnu : **Student**
2. Construire \(T\)
3. Ecrire la probabilite \(\mathbb P(T>t_0)\) ou \(\mathbb P(T<t_0)\)
4. Lecture table Student : \(F_T(t)=\mathbb P(T\le t)\)

---

## A.3) Si la normalite n'est pas donnee : TCL (theoreme central limite)

Si \(n\) est grand (en pratique, on l'admet souvent des \(n\ge 30\)) et \(X_i\) i.i.d. de moyenne \(m\) et variance \(\sigma^2\) :
\[
\overline{X}\approx \mathcal N\!\left(m,\frac{\sigma}{\sqrt{n}}\right)
\]

- Si \(\sigma\) inconnu et \(n\) grand, on utilise souvent la normale **avec** \(S\) en approximation.
- Dans ton chapitre, on reste surtout sur **Normal imposee** ou **Student** quand \(\sigma\) inconnu.

---

# B) Proportions et binomiale (pont exercice 3 & 5)

## B.1) Modelisation : binomiale

Si chaque individu est defectueux / non defectueux :

- \(X_i\in\{0,1\}\) avec \(\mathbb P(X_i=1)=p\)
- alors \(X=\sum_{i=1}^n X_i\sim \mathcal B(n,p)\)

Et la proportion observee :
\[
F=\frac{X}{n}
\]

## B.2) Approximation normale de la binomiale : loi de \(F\)

Sous conditions usuelles (dans ton cours : typiquement \(n\) assez grand, et souvent \(np\) et \(n(1-p)\) pas trop petits) :
\[
X \approx \mathcal N(np,\sqrt{np(1-p)})
\]
Donc en divisant par \(n\) :
\[
F=\frac{X}{n}\approx \mathcal N\!\left(p,\sqrt{\frac{p(1-p)}{n}}\right)
\]

### Methode-type (probabilite sur une proportion)

1. Identifier \(p\), \(n\)
2. Utiliser \(F\approx \mathcal N\left(p,\sqrt{\frac{pq}{n}}\right)\) avec \(q=1-p\)
3. Centrer-reduire :
   \[
   U=\frac{F-p}{\sqrt{pq/n}}\approx \mathcal N(0,1)
   \]

---

# C) Differences entre deux echantillons (moyennes / proportions)

## C.1) Difference de moyennes : \(\sigma_1,\sigma_2\) connus

Deux populations normales independantes :
\[
X_1\sim \mathcal N(m_1,\sigma_1),\quad X_2\sim \mathcal N(m_2,\sigma_2)
\]
Echantillons independants de tailles \(n_1,n_2\). Alors :
\[
\overline{X}_1-\overline{X}_2 \sim \mathcal N\!\left(m_1-m_2,\ \sqrt{\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}}\right)
\]
Et centrage-reduction :
\[
U=\frac{(\overline{X}_1-\overline{X}_2)-(m_1-m_2)}{\sqrt{\sigma_1^2/n_1+\sigma_2^2/n_2}}\sim \mathcal N(0,1)
\]

## C.2) Difference de moyennes : \(\sigma_1,\sigma_2\) inconnus (cas variances egales du cours)

Ton chapitre donne le cas **\(\sigma_1=\sigma_2\)** (hypothese cruciale !) :
\[
T=\frac{(\overline{X}_1-\overline{X}_2)-(m_1-m_2)}{\sqrt{\frac{1}{n_1}+\frac{1}{n_2}}\ \sqrt{\frac{n_1S_1^2+n_2S_2^2}{n_1+n_2-2}}}\sim t(n_1+n_2-2)
\]
C'est la Student a variance poolee.

### Erreur classique a eviter

Ne pas utiliser cette formule si l'enonce **ne permet pas** \(\sigma_1=\sigma_2\).
(Si on avait le cas general, on utiliserait une autre approche, souvent appelee Welch, mais **ce n'est pas ce que ton cours met en avant**.)

---

## C.3) Difference de proportions

Deux echantillons independants, proportions theoriques \(p_1,p_2\) :
\[
F_1-F_2 \approx \mathcal N\!\left(p_1-p_2,\ \sqrt{\frac{p_1q_1}{n_1}+\frac{p_2q_2}{n_2}}\right)
\]
avec \(q_i=1-p_i\).

---

# D) Demonstrations exigibles (coeur de chapitre)

## D.1) Demonstration : loi de \(\overline{X}\) quand \(X\) est normale

**Hypothese :** \(X_i \stackrel{i.i.d.}{\sim} \mathcal N(m,\sigma)\)

1. Somme de normales independantes = normale
   \[
   S_n=\sum_{i=1}^n X_i \sim \mathcal N\!\left(\sum m,\ \sqrt{\sum \sigma^2}\right)=\mathcal N(nm,\ \sigma\sqrt{n})
   \]
2. Or \(\overline{X}=S_n/n\). Si \(Y\sim \mathcal N(a,b)\), alors \(cY\sim \mathcal N(ca,|c|b)\).
   Donc :
   \[
   \overline{X}=\frac{S_n}{n}\sim \mathcal N\!\left(\frac{nm}{n},\frac{\sigma\sqrt{n}}{n}\right)
   =\mathcal N\!\left(m,\frac{\sigma}{\sqrt{n}}\right)
   \]
   CQFD.

---

## D.2) Demonstration (idee) : pourquoi Student apparait quand \(\sigma\) est inconnu

Sous normalite :

- \(\overline{X}\) est normale.
- La variance empirique (corrigee) est liee a un khi-deux.
- Et \(\overline{X}\) est independante de \(\hat{S}^2\) (propriete speciale de la normale).

On admet (resultat fondamental) :
\[
\frac{(n-1)\hat{S}^2}{\sigma^2}\sim \chi^2(n-1)
\]
et
\[
\frac{\overline{X}-m}{\sigma/\sqrt{n}}\sim \mathcal N(0,1)
\]
En combinant normale / racine de khi-deux on obtient une Student :
\[
T=\frac{\frac{\overline{X}-m}{\sigma/\sqrt{n}}}{\sqrt{\frac{(n-1)\hat{S}^2}{\sigma^2(n-1)}}}
=\frac{\overline{X}-m}{\hat{S}/\sqrt{n}}\sim t(n-1)
\]
CQFD (au niveau attendu : **construction** + **admission** du resultat khi-deux).

---

## D.3) Demonstration : loi (approchee) de la proportion \(F\)

On pose \(X_i\in\{0,1\}\) et \(\mathbb P(X_i=1)=p\).
Alors \(X=\sum X_i\sim \mathcal B(n,p)\). On a :
\[
E[X]=np,\quad V[X]=npq
\]
avec \(q=1-p\).
Donc :
\[
E[F]=E[X/n]=p,\quad V[F]=V[X]/n^2=\frac{pq}{n}
\]
Et pour \(n\) grand (approximation normale de la binomiale) :
\[
F \approx \mathcal N\!\left(p,\sqrt{\frac{pq}{n}}\right)
\]
CQFD (niveau examen : calcul \(E,V\) + argument d'approximation normale).

---

# 3) Comment lire les tables (Normal / Student) sans te tromper

- **Normale** : table donne quasi toujours \(F_U(z)=\mathbb P(U\le z)\).

  - \(\mathbb P(U>z)=1-F_U(z)\)
  - Symetrie : \(F_U(-z)=1-F_U(z)\)
- **Student** : meme logique : table donne souvent \(F_T(t)=\mathbb P(T\le t)\).

  - Symetrie : \(F_T(-t)=1-F_T(t)\)
  - ddl = degres de liberte : \(n-1\) ou \(n_1+n_2-2\)

---

# 4) Exercice type integral (fusion exercices 1 a 5)

## ENONCE (tout-en-un)

Une entreprise de services etudie ses performances sur deux sites **A** et **B**.

### Partie I : Moyenne, \(\sigma\) connu puis inconnu (methode ex.1)

On modelise le **temps d'attente (en minutes)** d'un client sur le site A par une variable normale \(X\sim\mathcal N(m=20,\sigma=8)\).

1. On preleve un echantillon de taille \(n=64\). Calculer
   \(\mathbb P(\overline{X}>21)\) en supposant \(\sigma\) **connu**.
2. Meme question si \(\sigma\) est **inconnu** et si l'echantillon donne \(s=7{,}6\) (ecart-type empirique).

---

### Partie II : Moyenne avec \(\sigma\) inconnu (methode ex.2)

Sur le site B, on suppose aussi un temps d'attente normal d'esperance \(m_B=22\), \(\sigma_B\) inconnu.
Un echantillon de taille \(n_B=49\) donne \(\bar{x}_B=23{,}5\) et \(s_B=6\).
Calculer \(\mathbb P(\overline{X}_B>23)\).

---

### Partie III : Nombres de defauts et approximation normale (methode ex.3)

Sur une semaine, la proportion de reclamations est :

- \(p_A=0{,}06\) sur A, \(p_B=0{,}05\) sur B.
  On observe \(n_A=n_B=500\) demandes sur chaque site.
  On note \(X_A\) et \(X_B\) le nombre de reclamations.

1. Donner la loi exacte de \(X_A\) et \(X_B\).
2. Approcher \(X_A-X_B\) par une normale et calculer \(\mathbb P(X_A-X_B\ge 1)\).
3. En notant \(F_A=X_A/n_A\), \(F_B=X_B/n_B\), calculer \(\mathbb P(F_A-F_B>0{,}02)\).

---

### Partie IV : Difference de moyennes (methode ex.4)

On compare des **revenus mensuels** (en EUR) :

- Region A : \(m_A=2500\), \(\sigma_A=1100\)
- Region B : \(m_B=3200\), \(\sigma_B=1000\)
  Echantillons independants \(n_A=n_B=62\).

1. Calculer \(\mathbb P(\overline{X}_B-\overline{X}_A\ge 900)\) si \(\sigma_A,\sigma_B\) **connus**.
2. Meme question si \(\sigma_A,\sigma_B\) **inconnus**, et si \(s_A=s_B=1000\), avec l'hypothese \(\sigma_A=\sigma_B\).

---

### Partie V : Proportions (methode ex.5)

Une usine A produit une proportion \(p_A=0{,}04\) de pieces defectueuses. Un client recoit \(n=600\) pieces.

1. Calculer \(\mathbb P(F_A<0{,}01)\) puis \(\mathbb P(F_A>0{,}05)\).
2. Une autre usine B a \(p_B=0{,}11\) et le client recoit \(n_B=500\). Calculer
   \(\mathbb P(F_B-F_A>0{,}10)\).

---

## CORRECTION GUIDEE (methode + calculs)

### Partie I-1 : \(\sigma\) connu : normale

\[
\overline{X}\sim \mathcal N\!\left(20,\frac{8}{\sqrt{64}}\right)=\mathcal N(20,1)
\]
Donc
\[
\mathbb P(\overline{X}>21)=\mathbb P\left(U>\frac{21-20}{1}\right)=\mathbb P(U>1)=1-F_U(1)
\]
A la table, \(F_U(1)\approx 0{,}8413\) donc :
\[
\boxed{\mathbb P(\overline{X}>21)\approx 0{,}1587}
\]

### Partie I-2 : \(\sigma\) inconnu : Student

\[
T=\frac{\overline{X}-20}{S/\sqrt{n-1}}\sim t(63)
\]
Ici, seuil :
\[
t_0=\frac{21-20}{7{,}6/\sqrt{63}}
\]
Or \(\sqrt{63}\approx 7{,}94\), donc \(7{,}6/7{,}94\approx 0{,}957\).
Ainsi \(t_0\approx 1/0{,}957\approx 1{,}045\).
\[
\mathbb P(\overline{X}>21)=\mathbb P(T>1{,}045)=1-F_{t(63)}(1{,}045)
\]
Table Student (ddl 63 ~ proche normale) : valeur proche de \(\approx 0{,}15\)-\(0{,}16\).
\[
\boxed{\mathbb P(\overline{X}>21)\approx 0{,}15\ \text{(ordre de grandeur attendu)}}
\]
*(En examen, si tu justifies ddl grand : proche normale, tu peux aussi approximer par 0,1587.)*

---

### Partie II : moyenne, \(\sigma\) inconnu (Student)

\[
T=\frac{\overline{X}_B-22}{S_B/\sqrt{n_B-1}}\sim t(48)
\]
On veut \(\mathbb P(\overline{X}_B>23)\) :
\[
\mathbb P\left(T>\frac{23-22}{6/\sqrt{48}}\right)
\]
\(\sqrt{48}\approx 6{,}93\) donc \(6/6{,}93\approx 0{,}866\).
Seuil \(t_0\approx 1/0{,}866\approx 1{,}155\).
\[
\boxed{\mathbb P(\overline{X}_B>23)=1-F_{t(48)}(1{,}155)}
\]
(A la table, tu trouves une probabilite autour de 0,12-0,14 selon table/arrondis.)

---

### Partie III-1 : lois exactes

\[
X_A\sim \mathcal B(500,0{,}06),\quad X_B\sim \mathcal B(500,0{,}05)
\]

### Partie III-2 : approx normale de \(X_A-X_B\)

On approxime \(X_A\approx \mathcal N(n p_A,\sqrt{n p_A q_A})\) et idem pour B.
Difference de normales independantes : normale :
\[
X_A-X_B \approx \mathcal N\Big(500(0{,}06-0{,}05),\ \sqrt{500\cdot 0{,}06\cdot 0{,}94 + 500\cdot 0{,}05\cdot 0{,}95}\Big)
\]
Moyenne : \(500\cdot 0{,}01=5\).
Variance : \(500(0{,}0564+0{,}0475)=500(0{,}1039)=51{,}95\).
Ecart-type : \(\sqrt{51{,}95}\approx 7{,}21\).
\[
\mathbb P(X_A-X_B\ge 1)\approx \mathbb P\left(U\ge \frac{1-5}{7{,}21}\right)=\mathbb P(U\ge -0{,}555)
\]
\[
=F_U(0{,}555)\approx 0{,}709
\]
\[
\boxed{\mathbb P(X_A-X_B\ge 1)\approx 0{,}709}
\]

### Partie III-3 : difference de proportions

\[
F_A-F_B \approx \mathcal N\left(0{,}01,\ \sqrt{\frac{0{,}06\cdot 0{,}94}{500}+\frac{0{,}05\cdot 0{,}95}{500}}\right)
\]
Ecart-type :
\[
\sqrt{\frac{0{,}0564+0{,}0475}{500}}=\sqrt{\frac{0{,}1039}{500}}=\sqrt{0{,}0002078}\approx 0{,}0144
\]
Donc
\[
\mathbb P(F_A-F_B>0{,}02)=\mathbb P\left(U>\frac{0{,}02-0{,}01}{0{,}0144}\right)=\mathbb P(U>0{,}694)
\]
\[
\approx 1-F_U(0{,}694)\approx 1-0{,}755 \approx 0{,}245
\]
\[
\boxed{\mathbb P(F_A-F_B>0{,}02)\approx 0{,}245}
\]

---

### Partie IV-1 : difference de moyennes, \(\sigma\) connus

\[
\overline{X}_B-\overline{X}_A \sim \mathcal N\left(m_B-m_A,\ \sqrt{\frac{\sigma_B^2}{n}+\frac{\sigma_A^2}{n}}\right)
\]
Moyenne : \(3200-2500=700\).
Ecart-type :
\[
\sqrt{\frac{1000^2}{62}+\frac{1100^2}{62}}=\sqrt{\frac{1,000,000+1,210,000}{62}}
=\sqrt{\frac{2,210,000}{62}}\approx \sqrt{35,645}\approx 188{,}8
\]
Donc
\[
\mathbb P(\overline{X}_B-\overline{X}_A\ge 900)=\mathbb P\left(U\ge \frac{900-700}{188{,}8}\right)
=\mathbb P(U\ge 1{,}06)
\]
\[
\approx 1-F_U(1{,}06)\approx 1-0{,}8554\approx 0{,}1446
\]
\[
\boxed{\approx 0{,}145}
\]

### Partie IV-2 : \(\sigma\) inconnus + hypothese \(\sigma_A=\sigma_B\) : Student poolee

ddl : \(62+62-2=122\).
\[
T=\frac{(\overline{X}_A-\overline{X}_B)-(m_A-m_B)}{\sqrt{\frac{1}{62}+\frac{1}{62}}\ \sqrt{\frac{62s_A^2+62s_B^2}{122}}}\sim t(122)
\]
Avec \(s_A=s_B=1000\), le terme poole :
\[
\sqrt{\frac{62\cdot 10^6+62\cdot 10^6}{122}}=\sqrt{10^6}=1000
\]
Donc denominateur :
\[
\sqrt{\tfrac{2}{62}}\cdot 1000
\]
On veut \(\mathbb P(\overline{X}_B-\overline{X}_A\ge 900)\), donc equivalent a \(\overline{X}_A-\overline{X}_B\le -900\).
Comme \(m_A-m_B=-700\), seuil :
\[
t_0=\frac{-900-(-700)}{1000\sqrt{2/62}}
=\frac{-200}{1000\sqrt{0{,}03226}}=\frac{-200}{1000\cdot 0{,}1796}\approx -1{,}11
\]
Donc
\[
\mathbb P(\overline{X}_A-\overline{X}_B\le -900)=\mathbb P(T\le -1{,}11)=F_{t(122)}(-1{,}11)
\]
Par symetrie, \(F(-a)=1-F(a)\). ddl grand : proche normale : \(\approx 0{,}133\)-\(0{,}136\).
\[
\boxed{\approx 0{,}136\ \text{(ordre de grandeur attendu)}}
\]

---

### Partie V-1 : proportion sur A, \(p_A=0{,}04\), \(n=600\)

\[
F_A\approx \mathcal N\left(0{,}04,\sqrt{\frac{0{,}04\cdot 0{,}96}{600}}\right)
\]
Ecart-type :
\[
\sqrt{\frac{0{,}0384}{600}}=\sqrt{0{,}000064}=0{,}008
\]
a) \(\mathbb P(F_A<0{,}01)\) :
\[
\mathbb P\left(U<\frac{0{,}01-0{,}04}{0{,}008}\right)=\mathbb P(U<-3{,}75)\approx 0
\]
\[
\boxed{\approx 0}
\]
b) \(\mathbb P(F_A>0{,}05)\) :
\[
\mathbb P\left(U>\frac{0{,}05-0{,}04}{0{,}008}\right)=\mathbb P(U>1{,}25)\approx 1-0{,}8944=0{,}1056
\]
\[
\boxed{\approx 0{,}106}
\]

### Partie V-2 : difference de proportions

\[
F_B-F_A \approx \mathcal N\left(p_B-p_A,\ \sqrt{\frac{p_Bq_B}{n_B}+\frac{p_Aq_A}{n_A}}\right)
\]
Ici \(p_B-p_A=0{,}07\).
Ecart-type :
\[
\sqrt{\frac{0{,}11\cdot 0{,}89}{500}+\frac{0{,}04\cdot 0{,}96}{600}}
=\sqrt{\frac{0{,}0979}{500}+\frac{0{,}0384}{600}}
=\sqrt{0{,}0001958+0{,}000064}
=\sqrt{0{,}0002598}\approx 0{,}0161
\]
Donc
\[
\mathbb P(F_B-F_A>0{,}10)=\mathbb P\left(U>\frac{0{,}10-0{,}07}{0{,}0161}\right)
=\mathbb P(U>1{,}86)\approx 0{,}031
\]
\[
\boxed{\approx 0{,}03}
\]

---

# 5) Ce que tu dois absolument savoir refaire sans reflechir (checklist examen)

- **1 moyenne, \(\sigma\) connu** : \(\overline{X}\) normale + centrage-reduction.
- **1 moyenne, \(\sigma\) inconnu** : Student (\(t(n-1)\)).
- **Proportion** : binomiale puis \(F\approx \mathcal N\left(p,\sqrt{pq/n}\right)\).
- **Difference de proportions** : normale avec somme des variances.
- **Difference de moyennes, \(\sigma\) connus** : normale avec \(\sigma_1^2/n_1+\sigma_2^2/n_2\).
- **Difference de moyennes, \(\sigma\) inconnus & \(\sigma_1=\sigma_2\)** : Student poolee (\(t(n_1+n_2-2)\)).
- Tables : toujours ramener a \(F(z)=\mathbb P(\le z)\), utiliser symetrie et complement.

---

Si tu veux, je peux aussi te fournir une **fiche ultra compacte (1 page)** : formules + conditions + methode 4 lignes a apprendre par coeur, **avec un arbre de decision** (est-ce une moyenne ? une proportion ? 1 ou 2 echantillons ? \(\sigma\) connu ?).
