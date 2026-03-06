# BUILD_ORDER.md — Ordre de Construction Séquencé

## Principe
**Ne jamais balancer tout le PRD/UX_SPEC en vrac.**
Construire séquentiellement pour garder le contrôle qualité.

---

## Phase 0: Foundation (Tokens + Config)

### Step 0.1: Design Tokens
```
Input: .kiro/specs/DESIGN_TOKENS.json
Output: src/styles/tokens.css ou tailwind.config.ts
```
**Prompt template:**
> "Implémente les design tokens du fichier DESIGN_TOKENS.json
> en CSS custom properties. Utilise la nomenclature --color-*, --space-*, etc."

### Step 0.2: Base Styles
```
Input: Design contract (.kiro/steering/design-contract.md)
Output: src/styles/base.css
```
**Ce qui doit être là:**
- Reset CSS minimal
- Typography scale
- Focus styles globaux
- Reduced motion media query

---

## Phase 1: Layout Shell

### Step 1.1: App Shell
```
Output: src/components/layout/Shell.tsx
```
**Scope:**
- Container max-width
- Background (study-grade)
- Pas de contenu encore

### Step 1.2: Header
```
Output: src/components/layout/Header.tsx
```
**Scope:**
- Structure sticky
- Glass effect
- Navigation slots (vides)
- États: default, scrolled

### Step 1.3: Footer
```
Output: src/components/layout/Footer.tsx
```
**Scope:**
- Structure simple
- Links slots
- Pas de contenu dynamique

---

## Phase 2: Primitives (Design System)

### Step 2.1: Button
```
Output: src/design-system/components/Button.tsx
```
**Variants:**
- primary, secondary, ghost
- sizes: sm, md, lg
- states: default, hover, active, disabled, loading

### Step 2.2: Card
```
Output: src/design-system/components/Card.tsx
```
**Variants:**
- elevated (shadow Keynote)
- outlined
- interactive (hover state)

### Step 2.3: Badge
```
Output: src/design-system/components/Badge.tsx
```
**Variants:**
- status: success, warning, error, info
- style: solid, subtle

### Step 2.4: Input Elements
```
Output: src/design-system/components/Input.tsx
Output: src/design-system/components/Select.tsx
Output: src/design-system/components/Checkbox.tsx
```
**States obligatoires:**
- default, focus, error, disabled

---

## Phase 3: Composants Feature

### Step 3.1: Course Card
```
Output: src/features/course/components/CourseCard.tsx
```
**Props:**
- title, description, progress, image
- onClick handler

**États:**
- not_started, in_progress, completed

### Step 3.2: Chapter Navigation
```
Output: src/features/course/components/ChapterNav.tsx
```
**Features:**
- Liste chapters
- Current indicator
- Progress dots

### Step 3.3: QCM Components
```
Output: src/features/qcm/components/Question.tsx
Output: src/features/qcm/components/AnswerOption.tsx
Output: src/features/qcm/components/ScoreBoard.tsx
```
**États:**
- unanswered, answered, revealed (correct/incorrect)

---

## Phase 4: Pages

### Step 4.1: Homepage
```
Output: src/pages/HomePage.tsx
```
**Sections (ordre):**
1. Hero
2. Matières grid
3. Continue learning (si progression)
4. Footer

### Step 4.2: Course Page
```
Output: src/pages/CoursePage.tsx
```
**Layout:**
- Sidebar nav (desktop) / bottom sheet (mobile)
- Content area (markdown)
- Progress bar

### Step 4.3: QCM Page
```
Output: src/pages/QCMPage.tsx
```
**Flow:**
1. Intro (nombre questions, temps estimé)
2. Questions séquentielles
3. Results summary
4. Review mode

---

## Phase 5: Interactions

### Step 5.1: Hover Effects
**Scope:** Toutes les cards, boutons, liens
**Rule:** Transition 150ms ease-out

### Step 5.2: Page Transitions
**Scope:** Navigation entre pages
**Rule:** Fade + subtle slide, 300ms

### Step 5.3: Micro-interactions
**Scope:**
- Button press (scale 0.98)
- Success checkmark
- Error shake
**Rule:** Spring easing pour feeling naturel

---

## Phase 6: Polish

### Step 6.1: Loading States
**Où:** Toutes les pages avec data fetching
**Pattern:** Skeleton matching content layout

### Step 6.2: Error States
**Où:** Tous les composants data-driven
**Pattern:** Message + retry button

### Step 6.3: Empty States
**Où:** Listes, grids, progression
**Pattern:** Illustration + message + CTA

### Step 6.4: Reduced Motion
**Vérifier:** Toutes les animations respectent prefers-reduced-motion

### Step 6.5: A11y Audit
**Checklist:**
- [ ] Keyboard nav complete
- [ ] Focus visible everywhere
- [ ] Contrast ratios OK
- [ ] Screen reader tested

---

## Validation Checklist (Chaque Phase)

Avant de passer à la phase suivante:

- [ ] Code compile sans erreur
- [ ] Pas de couleurs hardcoded (utilise tokens)
- [ ] États UI tous implémentés
- [ ] Responsive testé (mobile + desktop)
- [ ] Réduit motion respecté
- [ ] Contrast minimum 4.5:1

---

## Anti-Patterns à Éviter

### ❌ Ne pas faire
- Coder toute l'app d'un coup
- Ignorer les états loading/error
- Hardcoder des valeurs (couleurs, spacing)
- Skip la phase tokens

### ✅ Toujours faire
- Une phase à la fois
- Valider avant d'avancer
- Utiliser les tokens
- Documenter les décisions

---

## Template Prompt (Copier-coller)

```markdown
## Context
Je travaille sur [PHASE X - STEP X.X].
Voir .kiro/steering/design-contract.md pour les constraints.

## Goal
[Description claire de ce qui doit être fait]

## Constraints
- Utiliser tokens de DESIGN_TOKENS.json
- Respecter le Design Contract
- Implémenter les états: [empty/loading/error/success]

## Done Criteria
- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]
```
