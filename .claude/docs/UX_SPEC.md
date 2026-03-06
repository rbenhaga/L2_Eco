# UX_SPEC.md — Specification UX Complète

## 1. Mental Model Alignment

### Ce que l'utilisateur PENSE que l'app fait
> "Un site de cours bien organisé où je trouve facilement ce que je cherche,
> je lis tranquillement, et je peux tester mes connaissances."

### Comment l'UI doit CONFIRMER ce mental model

| Attente utilisateur | Confirmation UI |
|---------------------|-----------------|
| "Je trouve facilement" | Navigation claire, pas de sous-menus cachés |
| "Cours organisé" | Chapitres visibles, progression explicite |
| "Je lis tranquillement" | Fond calme, typo lisible, pas de distractions |
| "Je teste mes connaissances" | QCM accessibles depuis chaque chapitre |

### Métaphore visuelle
**Bibliothèque personnelle** (pas une app, pas un LMS)
- Calme d'une bibliothèque
- Organisation d'étagères (matières → cours → chapitres)
- Focus d'un bureau de travail

---

## 2. Information Architecture

### Hiérarchie des objets

```
Site
├── Homepage
│   ├── Hero (value prop)
│   ├── Section: Matières récentes
│   ├── Section: Progression
│   └── Footer
│
├── Matière (ex: Macroéconomie)
│   ├── Header matière
│   ├── Liste chapitres
│   └── Ressources associées
│
├── Chapitre
│   ├── Navigation locale (sections)
│   ├── Contenu markdown
│   ├── Exercices inline
│   └── QCM lié
│
└── QCM
    ├── Questions
    ├── Feedback
    └── Score/Review
```

### Relations entre objets

```
Matière 1──n Chapitre 1──n Section 1──n Exercice
                │
                └──1 QCM 1──n Question
```

### États des objets

| Objet | États possibles |
|-------|-----------------|
| Chapitre | not_started / in_progress / completed |
| QCM | not_attempted / in_progress / completed |
| Question | unanswered / answered / correct / incorrect |

---

## 3. Affordances & Actions

### Éléments interactifs

| Élément | Affordance visuelle | Action |
|---------|---------------------|--------|
| Card matière | hover: shadow + scale subtle | click → page matière |
| Card chapitre | hover: border accent | click → page chapitre |
| Bouton CTA | bg accent, full width | click → action principale |
| Lien navigation | underline on hover | click → navigation |
| Toggle view | pills selected state | click → switch view |
| QCM option | radio/checkbox visual | click → select answer |

### Zones de clic minimum
- Boutons: 44px × 44px minimum
- Cards: zone entière cliquable
- Navigation: padding généreux (12px+)

### Feedback visuel

| Action | Feedback immédiat |
|--------|-------------------|
| Hover | shadow/border change (0ms) |
| Click | scale 0.98 + opacity (100ms) |
| Submit | loading state → success/error |
| Error | shake animation + message |

---

## 4. États Système (OBLIGATOIRES)

### Chaque composant data-driven DOIT gérer:

```typescript
type ComponentState =
  | { status: 'empty'; message: string }
  | { status: 'loading' }
  | { status: 'error'; error: string; retry?: () => void }
  | { status: 'success'; data: T }
  | { status: 'incomplete'; missing: string[] }
```

### Patterns visuels par état

#### Empty State
```
┌─────────────────────────────┐
│                             │
│     [Illustration]          │
│                             │
│   Aucun cours commencé      │
│   Commencez par choisir     │
│   une matière.              │
│                             │
│   [ Voir les matières ]     │
│                             │
└─────────────────────────────┘
```
- Illustration ou icône contextuelle
- Message explicatif (pas juste "Vide")
- CTA vers l'action suivante

#### Loading State
```
┌─────────────────────────────┐
│                             │
│   ████░░░░░░░░░░░░          │
│   Chargement du cours...    │
│                             │
└─────────────────────────────┘
```
- Skeleton ou spinner selon durée attendue
- Texte informatif optionnel
- Pas de flash (min 200ms avant hide)

#### Error State
```
┌─────────────────────────────┐
│  ⚠ Erreur de chargement     │
│                             │
│  Impossible de charger      │
│  le contenu.                │
│                             │
│  [ Réessayer ]              │
└─────────────────────────────┘
```
- Icône d'erreur visible
- Message compréhensible (pas de code technique)
- Action de retry si applicable

#### Success State
- Transition fluide depuis loading
- Pas de célébration excessive
- Focus sur le contenu

---

## 5. Microcopie

### Principes
- Concis (< 10 mots pour labels)
- Actionnable (verbes actifs)
- Positif (pas "Ne pas..." mais "Faire...")

### Exemples

| Context | Mauvais | Bon |
|---------|---------|-----|
| Bouton QCM | "Soumettre" | "Vérifier mes réponses" |
| Empty state | "Pas de données" | "Commencez votre première révision" |
| Error | "Error 404" | "Cette page n'existe pas" |
| Loading | "..." | "Chargement du cours..." |
| Success QCM | "Correct!" | "Bonne réponse" |

### Ton
- **Encourageant** mais pas condescendant
- **Professionnel** mais pas froid
- **Clair** avant d'être clever

---

## 6. Navigation Patterns

### Header (sticky)
```
┌─────────────────────────────────────────┐
│  Logo    Matières  QCM  [Progress]      │
└─────────────────────────────────────────┘
```
- Toujours visible (sticky)
- Max 4 items principaux
- État actif évident

### Breadcrumbs (pages internes)
```
Accueil > Macroéconomie > Chapitre 1
```
- Clickable sauf dernier
- Truncate si trop long

### Navigation latérale (cours)
```
┌──────────────────┐
│ Chapitre 1       │
│ ├ Section 1.1  ● │ ← current
│ ├ Section 1.2    │
│ └ Section 1.3    │
│ Chapitre 2       │
└──────────────────┘
```
- Collapse/expand chapitres
- Indicateur position actuelle
- Progression visible (●/○)

---

## 7. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, nav bottom |
| Tablet | 640-1024px | 2 columns, nav side |
| Desktop | > 1024px | 3 columns, full nav |

### Adaptations critiques

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Header | Hamburger menu | Full nav |
| Cards grid | 1 col | 3 cols |
| Course nav | Bottom sheet | Sidebar |
| QCM | Full screen | Modal/inline |

---

## 8. Motion Guidelines

### Durées

| Type | Duration | Use case |
|------|----------|----------|
| Micro | 100-150ms | Hover, focus |
| Small | 200-300ms | Toggles, tabs |
| Medium | 300-400ms | Modals, panels |
| Large | 400-500ms | Page transitions |

### Easing

```css
/* Default (most interactions) */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);

/* Entrées */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Spring-like (special) */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Règles

1. **Reduced motion obligatoire**
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

2. **Pas d'animation sur scroll (sauf hero)**
3. **Pas de parallax (performance mobile)**
4. **Max 1 élément animé par viewport**

---

## 9. Accessibility Checklist

### Keyboard
- [ ] Tab order logique
- [ ] Focus visible sur tous éléments
- [ ] Escape ferme modals/dropdowns
- [ ] Enter/Space activent boutons

### Screen Readers
- [ ] Headings hiérarchiques (h1 → h2 → h3)
- [ ] Alt text sur images
- [ ] aria-labels sur icônes-only
- [ ] Live regions pour updates dynamiques

### Visual
- [ ] Contraste 4.5:1 minimum (texte normal)
- [ ] Contraste 3:1 minimum (large text, UI)
- [ ] Pas de couleur seule pour info
- [ ] Focus ring visible (3px+)

---

## 10. Error Prevention

### Formulaires (QCM)
- Confirmation avant soumission définitive
- Possibilité de revenir en arrière
- Sauvegarde automatique progression

### Navigation
- Avertissement si quitter avec données non sauvées
- Historique navigable (back button works)

### Feedback
- Message d'erreur près du problème
- Suggestion de correction quand possible
