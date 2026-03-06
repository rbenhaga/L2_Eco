# Agora — Design Contract v4 (Learning Platform Premium)

## Architecture
**Hybrid architecture:**
- **Public pages** (landing, pricing, legal): Header sticky + Hero + Sections + Footer
- **App pages** (modules, chapters): Fixed sidebar + Content area
- **Mobile**: Bottom drawer navigation (swipeable)

---

## 1) Grille & Spacing (8px System)

```
--space-1: 4px    (micro)
--space-2: 8px    (base unit)
--space-3: 12px   (tight)
--space-4: 16px   (default)
--space-6: 24px   (medium)
--space-8: 32px   (large)
--space-12: 48px  (section)
--space-16: 64px  (hero)
```

**Rule:** TOUJOURS utiliser multiples de 8px pour spacing.

---

## 2) Radius (3 valeurs MAX)

```
--radius-sm: 8px    (inputs, small cards)
--radius-md: 12px   (cards, modals)
--radius-lg: 16px   (hero cards, header)
--radius-full: 9999px (pills, avatars)
```

**Rule:** Pas de radius custom. Choisir parmi ces 4.

---

## 3) Palette (Study-Grade)

### Light Mode (default)
```
--color-bg-base: #F7F9FF          (fond global, bleuté calme)
--color-bg-raised: #FFFFFF        (cards, header)
--color-bg-overlay: #FAFBFF       (items internes)

--color-text-primary: #0f172a     (slate-950, quasi-noir)
--color-text-secondary: #475569   (slate-600, lisible)
--color-text-muted: #94a3b8       (slate-400, hints only)

--color-border-default: rgba(15,23,42,0.06)
--color-border-strong: rgba(15,23,42,0.12)

--color-accent: #4f46e5           (indigo-600, rare)
--color-accent-hover: #4338ca     (indigo-700)
```

### Semantic Colors
```
--color-success: #22c55e
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #3b82f6
```

**Rule:** Couleurs Tailwind hardcoded INTERDITES.

---

## 4) Shadows (Keynote Style)

```
--shadow-sm: 0 1px 2px rgba(15,23,42,0.04);
--shadow-md: 0 1px 0 rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08);
--shadow-lg: 0 1px 0 rgba(15,23,42,0.06), 0 18px 60px rgba(15,23,42,0.10);
--shadow-xl: 0 1px 0 rgba(15,23,42,0.06), 0 24px 80px rgba(15,23,42,0.12);
```

**Rule:** Pas de shadow-md/lg Tailwind vanilla.

---

## 5) Typography Scale

```
--text-xs: 12px / 16px    (captions)
--text-sm: 14px / 20px    (body small)
--text-base: 16px / 24px  (body)
--text-lg: 18px / 28px    (lead)
--text-xl: 20px / 28px    (h4)
--text-2xl: 24px / 32px   (h3)
--text-3xl: 30px / 36px   (h2)
--text-4xl: 36px / 40px   (h1)
```

**Weight:** `font-medium` (500) pour titres, `font-normal` (400) pour body.
**Max width lecture:** `max-w-[65ch]`

---

## 6) Motion

### Durations
```
--duration-fast: 100ms    (hover, focus)
--duration-normal: 200ms  (toggles, small)
--duration-slow: 300ms    (modals, panels)
--duration-slower: 400ms  (page transitions)
```

### Easing
```
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Reduced Motion (OBLIGATOIRE)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7) Surfaces (3 niveaux)

| Level | Use | Style |
|-------|-----|-------|
| Base | Page background | `bg-[var(--color-bg-base)]` |
| Raised | Cards, header | `bg-white/80 backdrop-blur-xl` + shadow-md + border |
| Overlay | Dropdowns, modals | `bg-white` + shadow-lg |

---

## 8) Interaction States

### Hover
- Cards: shadow upgrade (md → lg)
- Buttons: bg darken or lighten
- Links: underline appear

### Focus
- Ring visible: `ring-2 ring-offset-2 ring-[var(--color-accent)]`
- JAMAIS outline: none sans alternative

### Active/Pressed
- Scale: `scale-[0.98]`
- Duration: 100ms

### Disabled
- Opacity: `opacity-50`
- Cursor: `cursor-not-allowed`
- Pas de hover effects

---

## 9) UI States (TOUS OBLIGATOIRES)

Chaque composant data-driven DOIT implémenter:

| State | Visual Pattern |
|-------|----------------|
| Empty | Illustration + message + CTA |
| Loading | Skeleton ou spinner contextuel |
| Error | Icon + message + retry button |
| Success | Contenu normal, transition fluide |

**Voir:** `.claude/docs/UX_SPEC.md` section 4 pour patterns.

---

## 10) Layout Rules

### Header
- Position: sticky top-0
- Height: 64px
- Style: glass effect (bg-white/80 backdrop-blur-xl)
- Border-radius: rounded-2xl (avec margin)

### Sections
- Spacing: py-12 à py-16
- Title: text-2xl font-medium
- Subtitle: text-secondary, mt-2

### Grid
- Mobile: 1 col
- Tablet: 2 cols
- Desktop: 3 cols
- Gap: 16px (gap-4)

### Footer
- Simple, même style que header
- Links groupés par catégorie

---

## Anti-Patterns (INTERDIT)

- ❌ Couleurs Tailwind hardcoded (text-slate-*, bg-zinc-*)
- ❌ Shadows vanilla (shadow-md, shadow-lg)
- ❌ Plus de 3 radius différents
- ❌ Animations sans reduced-motion
- ❌ États UI manquants
- ❌ Spacing non-multiples de 8px
- ❌ Typo scale custom
- ❌ Blur gigantesque sur toute la page
