# UI Baseline Audit — Antigravity Refonte

> Date: 2026-01-09
> Agent: Kiro (Frontend Senior)
> Objectif: Refonte UI/UX style Notion/Apple — sobre, lisible, premium

---

## 1. Inventaire des Pages Clés

| Page | Fichier | Rôle |
|------|---------|------|
| **Home** | `src/App.tsx` / `src/pages/Home.tsx` | Landing avec sélection semestre + matières |
| **Login** | `src/pages/LoginPage.tsx` | Connexion Google OAuth |
| **Subscription** | `src/pages/SubscriptionPage.tsx` | Pricing Free/Premium + Stripe |
| **Design System** | `src/pages/DesignSystemPage.tsx` | Documentation composants |
| **Module Hub** | `src/features/course/components/ModuleHub.tsx` | Hub par matière (Macro, Stats, etc.) |
| **Course Layout** | `src/features/course/layouts/CourseLayout.tsx` | Shell pour contenu cours |
| **App Layout** | `src/layouts/AppLayout.tsx` | Layout global avec sidebar |

### Modules de contenu (S2)
- `/macro` — Macroéconomie
- `/stats` — Statistiques  
- `/micro` — Microéconomie
- `/socio` — Sociologie
- `/maths` — Mathématiques (bientôt)

---

## 2. Composants UI Existants

### Primitives (`src/components/ui/`)
- ✅ `Button.tsx` — Variants: default, secondary, ghost, destructive, outline
- ✅ `Card.tsx` — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- ✅ `Badge.tsx`
- ✅ `Dialog.tsx`
- ✅ `Input.tsx`
- ✅ `Label.tsx`
- ✅ `Skeleton.tsx`
- ✅ `Tabs.tsx`
- ⚠️ `Background.tsx` — Effet blob animé (à simplifier)
- ⚠️ `SolutionBox.tsx`
- ⚠️ `Watermark.tsx`

### Composants métier (`src/components/`)
- `Callout.tsx` — Encarts info/warning/tip
- `ChapterNav.tsx` — Navigation chapitres
- `ConceptCard.tsx` — Cartes concepts
- `ContentProtection.tsx` — Protection anti-copie
- `Exercise.tsx` — Exercices interactifs
- `Graph.tsx` — Graphiques
- `Math.tsx` — Rendu KaTeX
- `MethodBox.tsx` — Encarts méthode
- `PageHeader.tsx`
- `PaywallModal.tsx` — Modal upgrade premium
- `SearchModal.tsx` — Recherche globale (⌘K)
- `Section.tsx`
- `Table.tsx`
- `ThemeToggle.tsx`
- `ViewToggle.tsx`

---

## 3. 🚨 15 Problèmes UI/UX Critiques

### A. Design System & Cohérence

| # | Problème | Fichier(s) | Sévérité |
|---|----------|------------|----------|
| 1 | **Gradients excessifs** — Trop de `bg-linear-to-br`, `bg-linear-to-r` partout. Effet "startup 2020", pas Notion/Apple | `Home.tsx`, `ModuleHub.tsx`, `SubscriptionPage.tsx` | 🔴 Haute |
| 2 | **Backdrop-blur omniprésent** — `backdrop-blur-md/xl` sur quasi tous les éléments. Lourd visuellement et en perf | Tous les layouts | 🔴 Haute |
| 3 | **Animations Framer Motion excessives** — Chaque élément a `initial/animate/transition`. Fatigue visuelle | `Home.tsx`, `SubscriptionPage.tsx`, `PaywallModal.tsx` | 🟠 Moyenne |
| 4 | **Tokens couleurs incohérents** — Mix de `slate-*`, `indigo-*`, `violet-*` hardcodés + CSS vars | Partout | 🔴 Haute |
| 5 | **Border-radius incohérents** — `rounded-3xl`, `rounded-2xl`, `rounded-xl`, `rounded-full` sans logique | Partout | 🟠 Moyenne |

### B. Layout & Responsive

| # | Problème | Fichier(s) | Sévérité |
|---|----------|------------|----------|
| 6 | **Sidebar fixe 64px (w-64)** — Pas de collapse, prend trop de place sur tablet | `AppLayout.tsx` | 🟠 Moyenne |
| 7 | **Max-width inconsistant** — `max-w-6xl`, `max-w-7xl`, `max-w-[896px]` selon les pages | `ModuleHub.tsx`, `SubscriptionPage.tsx` | 🟡 Basse |
| 8 | **Padding excessif sur mobile** — `p-8`, `px-8` sur petits écrans | `CourseLayout.tsx` | 🟠 Moyenne |

### C. Typographie & Lisibilité

| # | Problème | Fichier(s) | Sévérité |
|---|----------|------------|----------|
| 9 | **Tailles de titre incohérentes** — `text-3xl sm:text-5xl md:text-6xl` vs `text-4xl` vs `text-2xl` | `Home.tsx`, `ModuleHub.tsx` | 🟠 Moyenne |
| 10 | **Font-weight excessif** — Trop de `font-bold`, `font-semibold` partout | Partout | 🟡 Basse |
| 11 | **Line-height serré** — `leading-none`, `leading-tight` sur du texte long | `Card.tsx`, `ModuleHub.tsx` | 🟠 Moyenne |

### D. Accessibilité

| # | Problème | Fichier(s) | Sévérité |
|---|----------|------------|----------|
| 12 | **Contraste insuffisant** — `text-slate-400`, `text-slate-500` sur fond clair | Partout | 🔴 Haute |
| 13 | **Focus states manquants** — Certains boutons/liens sans `:focus-visible` | `ModuleHub.tsx`, `Home.tsx` | 🟠 Moyenne |
| 14 | **Touch targets < 44px** — Certains boutons/liens trop petits | `ChapterNav.tsx` | 🟠 Moyenne |

### E. Performance

| # | Problème | Fichier(s) | Sévérité |
|---|----------|------------|----------|
| 15 | **Background blob animation** — Animation CSS `blob 7s infinite` + blur = GPU intensive | `Background.tsx`, `tailwind.config.js` | 🟠 Moyenne |

---

## 4. Proposition d'Architecture (Information Architecture)

### Navigation Simplifiée

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                            │
│  [Logo] [Search ⌘K] [Theme] [User]                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SIDEBAR (collapsible)          MAIN CONTENT               │
│  ┌─────────────────┐           ┌─────────────────────────┐ │
│  │ Semestre 2      │           │                         │ │
│  │  ├─ Macro       │           │  [Page Content]         │ │
│  │  ├─ Stats       │           │                         │ │
│  │  ├─ Micro       │           │  max-width: 768px       │ │
│  │  └─ Socio       │           │  (prose-like)           │ │
│  │                 │           │                         │ │
│  │ Semestre 3      │           │                         │ │
│  │  └─ (bientôt)   │           │                         │ │
│  └─────────────────┘           └─────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Hiérarchie des Pages

```
/                     → Home (sélection matière)
/login                → Login
/subscription         → Pricing

/macro                → Module Hub Macro
/macro/chapitre-1     → Cours Chapitre 1
/macro/chapitre-2     → Cours Chapitre 2
/macro/qcm            → QCM Macro
/macro/exercices      → Exercices Macro

(idem pour /stats, /micro, /socio, /maths)
```

---

## 5. Design Tokens Proposés (Notion/Apple Style)

### Couleurs (simplifiées)

```css
/* Light mode */
--background: 0 0% 100%;        /* Pure white */
--foreground: 222 47% 11%;      /* Near black */
--muted: 210 40% 96%;           /* Light gray */
--muted-foreground: 215 16% 47%; /* Medium gray */
--border: 214 32% 91%;          /* Subtle border */
--primary: 222 47% 11%;         /* Black for primary actions */
--accent: 221 83% 53%;          /* Blue accent (sparingly) */

/* Dark mode */
--background: 222 47% 11%;
--foreground: 210 40% 98%;
/* ... */
```

### Spacing Scale

```
4px  → xs (gaps, small padding)
8px  → sm
12px → md
16px → base
24px → lg
32px → xl
48px → 2xl
64px → 3xl
```

### Border Radius

```
4px  → sm (inputs, small buttons)
8px  → md (cards, buttons)
12px → lg (modals, large cards)
16px → xl (hero sections)
```

### Typography Scale

```
text-xs:   12px / 16px
text-sm:   14px / 20px
text-base: 16px / 24px
text-lg:   18px / 28px
text-xl:   20px / 28px
text-2xl:  24px / 32px
text-3xl:  30px / 36px
text-4xl:  36px / 40px
```

---

## 6. Plan d'Action (Phase A: 0-35%)

### Étape 1: Tokens & Variables (5-10%)
- [ ] Simplifier `tailwind.config.js` — retirer animations blob
- [ ] Créer `src/styles/tokens.css` avec CSS vars propres
- [ ] Définir palette: 1 couleur primaire (noir), 1 accent (bleu), grays

### Étape 2: Composants UI de Base (10-15%)
- [ ] Refactor `Button.tsx` — style plus sobre
- [ ] Refactor `Card.tsx` — retirer backdrop-blur par défaut
- [ ] Créer `Container.tsx` — max-width + padding responsive
- [ ] Créer `Prose.tsx` — wrapper pour contenu texte long

### Étape 3: Layout (15-25%)
- [ ] Refactor `AppLayout.tsx` — sidebar collapsible
- [ ] Simplifier `Background.tsx` — retirer blob, fond uni ou très subtil
- [ ] Responsive: vérifier 390/768/1024/1440

### Étape 4: Pages Clés (25-35%)
- [ ] Refactor `Home.tsx` — retirer gradients, simplifier
- [ ] Refactor `SubscriptionPage.tsx` — pricing sobre
- [ ] Refactor `ModuleHub.tsx` — cards simples
- [ ] Refactor `LoginPage.tsx` — minimal

---

## 7. État Git Actuel

```
Changes not staged for commit:
  modified:   src/components/Navigation/AppSidebar.tsx
  modified:   src/index.css
  modified:   src/layouts/AppLayout.tsx
  modified:   src/pages/Home.tsx
  modified:   tailwind.config.js

5 files changed, 80 insertions(+), 69 deletions(-)
```

> ⚠️ Des modifications non commitées existent. Recommandation: commit ou stash avant de continuer.

---

## 8. Prochaines Étapes

**STOP — Validation requise avant implémentation.**

Questions pour l'utilisateur:
1. Valides-tu cette analyse et le plan d'action?
2. Dois-je commit les changements existants avant de continuer?
3. Par quelle étape veux-tu commencer? (Tokens / Composants / Layout / Pages)
4. Préfères-tu des PRs atomiques ou un gros refactor?

---

*Document généré par Kiro — UI Baseline Audit v1.0*
