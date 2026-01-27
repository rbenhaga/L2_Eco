## 🎯 L'ESSENTIEL EN 3 LIGNES

> **Le consommateur répartit sa consommation entre deux périodes (aujourd'hui et demain) en fonction de ses revenus** $m_1$ **et** $m_2$ **et du taux d'intérêt** $r$. S'il épargne en période 1, il consomme moins aujourd'hui mais plus demain (avec intérêts). La pente de la contrainte est $-(1+r)$. Équilibre : $TMS = 1+r$. Le taux d'intérêt **réel** (corrigé de l'inflation) est crucial, pas le taux nominal.
> 

---

## 1️⃣ LE MODÈLE DE BASE

<aside>
💡

**INTUITION**

Le consommateur vit sur **deux périodes** :

- **Période 1 ("aujourd'hui")** : revenu $m_1$, consommation $c_1$
- **Période 2 ("demain")** : revenu $m_2$, consommation $c_2$

Il peut **transférer du pouvoir d'achat** entre les périodes via l'épargne ou l'emprunt. Le **taux d'intérêt** $r$ est le "prix" de ce transfert :

- **Épargner** $s$ en période 1 → Recevoir $(1+r)s$ en période 2
- **Emprunter** $b$ en période 1 → Rembourser $(1+r)b$ en période 2
</aside>

<aside>
📐

**HYPOTHÈSES**

1. Deux périodes : "aujourd'hui" (1) et "demain" (2)
2. Revenus exogènes : $m_1$ et $m_2$ (salaires, héritages...)
3. Taux d'intérêt $r$ constant (marché parfait du crédit)
4. Fonction d'utilité $U(c_1, c_2)$ (le consommateur valorise la consommation des deux périodes)
5. Prix du bien de consommation = 1 dans les deux périodes (pour simplifier)
</aside>

---

## 2️⃣ LA CONTRAINTE BUDGÉTAIRE INTERTEMPORELLE

![image.png](attachment:f9922594-824f-4888-97a9-c05b5e1fb9bc:image.png)

### Dérivation de la Contrainte

**Période 1** : Le consommateur reçoit $m_1$, consomme $c_1$, et épargne (ou emprunte) $s = m_1 - c_1$

**Période 2** : Il reçoit $m_2$ + intérêts sur l'épargne (ou rembourse la dette)

$$
c_2 = m_2 + (1+r)(m_1 - c_1)
$$

En réarrangeant :

$$
c_2 = m_2 + (1+r)m_1 - (1+r)c_1
$$

Ou encore :

$$
\boxed{c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r}}
$$

Cette dernière forme est la **contrainte en valeur présente** : la somme des consommations actualisées égale la somme des revenus actualisés.

<aside>
📐

**INTERPRÉTATIONS**

**Forme 1** (valeur future) : $c_2 + (1+r)c_1 = m_2 + (1+r)m_1$

- Tout est exprimé en "€ de la période 2"
- **RHS** : valeur future totale des revenus
- **LHS** : valeur future totale des consommations

**Forme 2** (valeur présente) : $c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r}$

- Tout est exprimé en "€ de la période 1" (actualisé)
- **RHS** : richesse totale actualisée $W$
- **LHS** : dépense totale actualisée

**Pente** : $-\frac{dc_2}{dc_1} = 1+r$ (coût d'opportunité de la consommation présente)

</aside>

**Point clé** : Le consommateur peut **toujours** choisir $(c_1, c_2) = (m_1, m_2)$ (ne rien épargner ni emprunter). Ce point est appelé **dotation initiale**.

---

## 3️⃣ ÉPARGNANT VS EMPRUNTEUR

<aside>
💡

**INTUITION**

Selon la position de l'équilibre optimal $(c_1^*, c_2^*)$ par rapport au point de dotation $(m_1, m_2)$ :

- **ÉPARGNANT** : $c_1^* < m_1$ → consomme moins qu'il ne gagne aujourd'hui, épargne $s = m_1 - c_1^* > 0$
- **EMPRUNTEUR** : $c_1^* > m_1$ → consomme plus qu'il ne gagne aujourd'hui, emprunte $b = c_1^* - m_1 > 0$
- **AUTARCIQUE** : $c_1^* = m_1$ → ne fait ni épargne ni emprunt
</aside>

### Typologie selon les Revenus

**Cas 1** : **Revenu croissant** ($m_2 > m_1$)

- Exemple : jeune actif dont le salaire va augmenter
- Incitation à **emprunter** en période 1 (anticiper le revenu futur)

**Cas 2** : **Revenu décroissant** ($m_1 > m_2$)

- Exemple : personne en fin de carrière approchant la retraite
- Incitation à **épargner** en période 1 (préparer la baisse de revenu)

**Cas 3** : **Revenu constant** ($m_1 = m_2$)

- Dépend des préférences (patience, impatience)

---

## 4️⃣ ÉQUILIBRE DU CONSOMMATEUR

<aside>
📐

**PROBLÈME D'OPTIMISATION**

$$
\max_{c_1, c_2} U(c_1, c_2)
$$

sous contrainte :

$$
c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r}
$$

</aside>

### Méthode 1 : Condition TMS = Prix Relatif

**Condition d'équilibre** :

$$
\boxed{TMS_{c_1, c_2} = 1 + r}
$$

où :

$$
TMS_{c_1, c_2} = \frac{Um_{c_1}}{Um_{c_2}} = \frac{\partial U / \partial c_1}{\partial U / \partial c_2}
$$

<aside>
💡

**INTERPRÉTATION**

Le **TMS** mesure le taux auquel le consommateur est prêt à échanger $c_1$ contre $c_2$ (selon ses préférences).

Le **taux d'intérêt** $(1+r)$ mesure le taux auquel le **marché** permet d'échanger $c_1$ contre $c_2$ :

- Renoncer à 1€ aujourd'hui → Obtenir $(1+r)$ € demain

À l'équilibre : le taux subjectif d'échange = le taux de marché.

</aside>

### Méthode 2 : Lagrangien (5 étapes)

**ÉTAPE 1** : Écrire le Lagrangien

$$
\mathcal{L} = U(c_1, c_2) + \lambda \left(m_1 + \frac{m_2}{1+r} - c_1 - \frac{c_2}{1+r}\right)
$$

**ÉTAPE 2** : Calculer les CPO (Conditions de Premier Ordre)

$$
\begin{cases}
\frac{\partial \mathcal{L}}{\partial c_1} = \frac{\partial U}{\partial c_1} - \lambda = 0 \\
\frac{\partial \mathcal{L}}{\partial c_2} = \frac{\partial U}{\partial c_2} - \frac{\lambda}{1+r} = 0 \\
\frac{\partial \mathcal{L}}{\partial \lambda} = m_1 + \frac{m_2}{1+r} - c_1 - \frac{c_2}{1+r} = 0
\end{cases}
$$

**ÉTAPE 3** : Éliminer $\lambda$

Des deux premières équations :

$$
\frac{\partial U / \partial c_1}{\partial U / \partial c_2} = 1 + r
$$

**ÉTAPE 4** : Résoudre le système

Combiner avec la contrainte budgétaire.

**ÉTAPE 5** : Déduire l'épargne

$$
s^* = m_1 - c_1^*
$$

<aside>
🔗

**LIEN PRÉPA → ÉCO**

C'est **exactement le même Lagrangien** que tu as utilisé en mécanique pour les liaisons :

- En mécanique : maximiser l'énergie sous contrainte de liaison
- En économie : maximiser l'utilité sous contrainte budgétaire

La méthode est identique. Ton avantage prépa te permet d'aller **2× plus vite** que les autres sur ces exos !

</aside>

---

## 5️⃣ EFFET D'UNE VARIATION DU TAUX D'INTÉRÊT

<aside>
⚠️

**ATTENTION**

L'effet d'une hausse de $r$ est **ambigu** et dépend de la position initiale du consommateur (épargnant ou emprunteur). On applique **l'équation de Slutsky** comme dans le MODULE 0.

</aside>

### Décomposition de Slutsky

Variation totale de $c_1$ suite à une hausse de $r$ :

$$
\frac{dc_1}{dr} = \underbrace{\frac{\partial c_1^H}{\partial r}}_{\text{Effet substitution} < 0} + \underbrace{\frac{\partial c_1}{\partial W} \cdot \frac{dW}{dr}}_{\text{Effet revenu : ambigu}}
$$

**Effet de substitution** : $\frac{\partial c_1^H}{\partial r} < 0$ (toujours négatif)

- La consommation présente devient **plus chère** relativement à la consommation future
- Le consommateur **substitue** $c_2$ à $c_1$ → $c_1 \downarrow$, $c_2 \uparrow$

**Effet revenu** : dépend de la situation initiale

**CAS A : ÉPARGNANT** ($s^* > 0$, donc $c_1^* < m_1$)

La hausse de $r$ **augmente** la richesse :

$$
W = m_1 + \frac{m_2}{1+r} \quad \text{diminue car } \frac{m_2}{1+r} \downarrow
$$

MAIS l'épargnant **bénéficie** d'un meilleur rendement sur son épargne :

- Effet revenu **positif** si $c_1$ bien normal → $c_1 \uparrow$

**Résultat net** : ambigu (dépend de l'ampleur relative des deux effets)

**CAS B : EMPRUNTEUR** ($s^* < 0$, donc $c_1^* > m_1$)

La hausse de $r$ **diminue** le pouvoir d'achat (coût de l'emprunt augmente) :

- Effet revenu **négatif** → $c_1 \downarrow$

**Résultat net** : $\frac{dc_1}{dr} < 0$ (les deux effets vont dans le même sens)

<aside>
💡

**INTUITION GRAPHIQUE**

**Hausse de** $r$ **:**

- La contrainte budgétaire **pivote** autour du point de dotation $(m_1, m_2)$ (qui reste accessible)
- Elle devient **plus pentue** : $`-(1+r)` $ plus négatif
- L'épargnant peut atteindre des $c_2$ plus élevés
- L'emprunteur voit son ensemble budgétaire **rétréci**
</aside>

### Sur l'Épargne

$$
s = m_1 - c_1
$$

Donc :

$$
\frac{ds}{dr} = -\frac{dc_1}{dr}
$$

**Pour un épargnant** : effet ambigu (peut épargner plus OU moins)

**Pour un emprunteur** : $\frac{dc_1}{dr} < 0$ donc $\frac{ds}{dr} > 0$ → il emprunte **moins** (ou épargne davantage)

---

## 6️⃣ TAUX RÉEL VS TAUX NOMINAL

<aside>
⚠️

**PIÈGE CLASSIQUE**

Ce n'est PAS le **taux d'intérêt nominal** $i$ qui compte, mais le **taux d'intérêt réel** $\rho$ ("rhô") corrigé de l'**inflation** $\pi$.

Si tu épargnes 100€ à un taux nominal de 5% mais que l'inflation est de 3%, ton pouvoir d'achat n'augmente réellement que de ~2%.

</aside>

### Équation de Fisher

**Relation exacte** :

$$
1 + \rho = \frac{1 + i}{1 + \pi}
$$

En développant :

$$
\rho = \frac{i - \pi}{1 + \pi}
$$

**Approximation** (valable si $\pi$ est faible) :

$$
\boxed{\rho \approx i - \pi}
$$

### Définitions

**Taux nominal** $i$ : taux affiché par la banque (en euros courants)

**Taux réel** $\rho$ : taux en termes de **pouvoir d'achat** (en euros constants)

**Inflation** $\pi$ : taux de croissance des prix entre période 1 et période 2

$$
\pi = \frac{p_2 - p_1}{p_1}
$$

<aside>
✅

**EXEMPLE NUMÉRIQUE**

- Taux nominal : $i = 7\%$
- Inflation : $\pi = 4\%$

**Taux réel exact** :

$$
\rho = \frac{1.07}{1.04} - 1 = \frac{0.03}{1.04} \approx 2.88\%
$$

**Approximation** :

$$
\rho \approx 7\% - 4\% = 3\%
$$

L'approximation est très bonne si $\pi$ est faible.

</aside>

### Reformulation de la Contrainte

Avec inflation, les prix sont :

- Période 1 : $p_1 = 1$ (normalisé)
- Période 2 : $p_2 = 1 + \pi$

La contrainte devient :

$$
c_1 + \frac{p_2 c_2}{(1+i)p_1} = m_1 + \frac{m_2}{1+i}
$$

En simplifiant avec $p_1 = 1$ :

$$
c_1 + \frac{(1+\pi) c_2}{1+i} = m_1 + \frac{m_2}{1+i}
$$

Or $\frac{1+\pi}{1+i} = \frac{1}{1+\rho}$, donc :

$$
\boxed{c_1 + \frac{c_2}{1+\rho} = m_1 + \frac{m_2}{1+i}}
$$

**Conclusion** : Dans la condition d'équilibre, c'est le **taux réel** qui apparaît :

$$
TMS_{c_1, c_2} = 1 + \rho
$$

<aside>
💡

**INTUITION**

Le consommateur se soucie du **pouvoir d'achat**, pas des euros nominaux. Si les prix doublent entre les deux périodes, avoir 2€ en période 2 équivaut à avoir 1€ en période 1 (même panier de biens).

Donc le taux d'intérêt pertinent pour les décisions d'épargne est le **taux réel**, qui mesure l'augmentation du **pouvoir d'achat** entre les deux périodes.

</aside>

---

## 7️⃣ EXERCICE TYPE : COBB-DOUGLAS

<aside>
⚡

**ÉNONCÉ**

Un consommateur a une fonction d'utilité :

$$
U(c_1, c_2) = c_1^{0.6} c_2^{0.4}
$$

Ses revenus sont $m_1 = 100$ et $m_2 = 50$. Le taux d'intérêt est $r = 10\%$.

**Questions** :

1. Déterminer les consommations optimales $c_1^*$ et $c_2^*$
2. L'épargne optimale $s^*$
3. L'individu est-il épargnant ou emprunteur ?
4. Calculer l'utilité maximale
</aside>

### 📝 SOLUTION DÉTAILLÉE

**ÉTAPE 1** : Calculer la richesse totale actualisée

$$
W = m_1 + \frac{m_2}{1+r} = 100 + \frac{50}{1.1} = 100 + 45.45 = 145.45
$$

**ÉTAPE 2** : Appliquer la formule Cobb-Douglas

Pour $U = c_1^\alpha c_2^\beta$ avec $\alpha + \beta = 1$ :

$$
c_1^* = \frac{\alpha}{\alpha + \beta} \cdot \frac{W \cdot (1+r)}{1+r} = \alpha \cdot W
$$

MAIS ATTENTION : ici la "dépense" en $c_2$ doit être divisée par $(1+r)$.

Formule correcte :

$$
c_1^* = \frac{\alpha}{\alpha + \beta} \cdot W = 0.6 \times 145.45 = 87.27
$$

$$
c_2^* = \frac{\beta}{\alpha + \beta} \cdot W \cdot (1+r) = 0.4 \times 145.45 \times 1.1 = 64
$$

**Vérification** : Contrainte budgétaire satisfaite ?

$$
c_1^* + \frac{c_2^*}{1+r} = 87.27 + \frac{64}{1.1} = 87.27 + 58.18 = 145.45 = W \quad \checkmark
$$

**ÉTAPE 3** : Épargne

$$
s^* = m_1 - c_1^* = 100 - 87.27 = 12.73 > 0
$$

**Réponse Q3** : L'individu est **épargnant** (il consomme moins que son revenu en période 1).

**ÉTAPE 4** : Utilité maximale

$$
U^* = (87.27)^{0.6} \times (64)^{0.4} = 78.36
$$

<aside>
🔗

**FORMULES EXPRESS COBB-DOUGLAS**

Pour $U = c_1^\alpha c_2^\beta$ avec $\alpha + \beta = 1$ :

$$
\boxed{
\begin{cases}
c_1^* = \alpha \cdot W \\
c_2^* = \beta \cdot W \cdot (1+r)
\end{cases}
}
$$

où $W = m_1 + \frac{m_2}{1+r}$ est la richesse totale actualisée.

**Part du revenu** :

- Le consommateur dépense une part $\alpha$ de sa richesse en $c_1$
- Une part $\beta$ en valeur présente de $c_2$

Ton avantage prépa : ces formules ressemblent aux **coordonnées barycentriques** en géométrie !

</aside>

### Alternative : Méthode Lagrangien

**ÉTAPE 1** : Écrire le Lagrangien

$$
\mathcal{L} = c_1^{0.6} c_2^{0.4} + \lambda \left(145.45 - c_1 - \frac{c_2}{1.1}\right)
$$

**ÉTAPE 2** : CPO

$$
\begin{cases}
0.6 c_1^{-0.4} c_2^{0.4} = \lambda \\
0.4 c_1^{0.6} c_2^{-0.6} = \frac{\lambda}{1.1} \\
c_1 + \frac{c_2}{1.1} = 145.45
\end{cases}
$$

**ÉTAPE 3** : Diviser (1) par (2)

$$
\frac{0.6 c_2}{0.4 c_1} = 1.1 \quad \Rightarrow \quad \frac{c_2}{c_1} = \frac{0.4 \times 1.1}{0.6} = \frac{0.44}{0.6}
$$

Donc :

$$
c_2 = \frac{0.44}{0.6} c_1 = 0.733 c_1
$$

**ÉTAPE 4** : Injecter dans la contrainte

$$
c_1 + \frac{0.733 c_1}{1.1} = 145.45
$$

$$
c_1 (1 + 0.667) = 145.45 \quad \Rightarrow \quad c_1 = \frac{145.45}{1.667} = 87.27
$$

Puis $c_2 = 0.733 \times 87.27 = 64$.

**Conclusion** : Les deux méthodes donnent le même résultat (comme toujours !). La méthode "formule express" est **2× plus rapide** en examen.

---

## 🎯 FLASHCARDS DE RÉVISION

### Question 1 : Contrainte Budgétaire

- **Quelle est la forme en valeur présente de la contrainte budgétaire intertemporelle ?**
    
    <aside>
    📝
    
    $$
    c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r}
    $$
    
    **Interprétation** : La somme actualisée des consommations = richesse totale actualisée $W$.
    
    **Pente** : $-(1+r)$ dans l'espace $(c_1, c_2)$.
    
    </aside>
    

### Question 2 : Condition d'Équilibre

- **Quelle est la condition d'équilibre du consommateur intertemporel ?**
    
    <aside>
    📝
    
    </aside>
    

### Question 3 : Épargnant vs Emprunteur

- **Comment déterminer si un consommateur est épargnant ou emprunteur ?**
    
    <aside>
    📝
    
    </aside>
    

### Question 4 : Effet Hausse Taux d'Intérêt

- **Quels sont les effets d'une hausse du taux d'intérêt sur $c_1$ ?**
    
    <aside>
    📝
    
    </aside>
    

### Question 5 : Taux Réel vs Nominal

- **Quelle est la relation entre taux nominal, taux réel et inflation ?**
    
    <aside>
    📝
    
    </aside>
    

---

## 📊 CHEAT SHEET RÉCAPITULATIF

| **Concept** | **Formule** | **Interprétation** |
| --- | --- | --- |
| **Contrainte (VP)** | $c_1 + \frac{c_2}{1+r} = W$ | Richesse actualisée $W = m_1 + \frac{m_2}{1+r}$ |
| **Contrainte (VF)** | $(1+r)c_1 + c_2 = (1+r)m_1 + m_2$ | Tout exprimé en "€ de période 2" |
| **Pente contrainte** | $-(1+r)$ | Coût d'opportunité de $c_1$ |
| **Condition équilibre** | $TMS_{c_1,c_2} = 1+r$ | Taux subjectif = taux marché |
| **Épargne** | $s = m_1 - c_1$ | $s > 0$ : épargnant ; $s < 0$ : emprunteur |
| **Cobb-Douglas** | $c_1^* = \alpha W$ | Part $\alpha$ de richesse en $c_1$ |
|  | $c_2^* = \beta W(1+r)$ | Part $\beta$ en $c_2$ |
| **Taux réel** | $\rho \approx i - \pi$ | Taux corrigé de l'inflation |
| **Effet hausse** $r$ | ES : $c_1 \downarrow$ toujours | Substitution temporelle |
|  | ER : ambigu si épargnant | Dépend position initiale |
|  | ER : $c_1 \downarrow$ si emprunteur | Coût emprunt augmente |

<aside>
✨

**CLÉS DU SUCCÈS**

1. **Toujours actualiser** : utiliser la valeur présente $W$ pour simplifier
2. **Pente =** $-(1+r)$ : le "prix" de $c_1$ en termes de $c_2$
3. **Taux réel** : c'est $\rho$ (pas $i$) qui compte !
4. **Cobb-Douglas** : formules directes avec $\alpha$ et $\beta$ (gain de temps massif)
5. **Slutsky** : toujours décomposer ES + ER pour analyser les effets
</aside>

<aside>
🔗

**LIENS AVEC AUTRES MODULES**

- **MODULE 0** : Mêmes outils (Lagrangien, TMS, Slutsky) appliqués au temps au lieu de biens
- **MODULE 1** : Arbitrage travail-loisir = cas particulier avec dotation temporelle
- **MODULE 3** : Le surplus peut se calculer intertemporellement (gains à l'échange dans le temps)
- **MACRO** : Modèle intertemporel fondamental pour épargne, investissement, dette publique
</aside>

---

**Suite du cours** : 

[MODULE 3 : Surplus du Consommateur](https://www.notion.so/MODULE-3-Surplus-du-Consommateur-9a2a63351ad446d9946c19f9160039c1?pvs=21)