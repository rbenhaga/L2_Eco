# Agora — Repo Structure v3 (Site Study-Grade avec Tokens)

# Agora — Repo Structure v3 (Hybrid Architecture with Tokens)

## Architecture actuelle
- **Hybrid architecture** (per design-contract v4):
  - **Public pages** (landing, pricing, legal): Header sticky + Hero + Sections + Footer
  - **App pages** (modules, chapters): Fixed sidebar + Content area
  - **Mobile**: Bottom drawer navigation (swipeable)
- **Token system unifié** : CSS custom properties (`var(--color-*)`) pour toutes les couleurs
- **Format unique** : HEX/RGBA uniquement (pas de RGB triplets)
- **Namespace** : `--color-*` pour les couleurs, `--shadow-*` pour les ombres

## Système de tokens (OBLIGATOIRE)

### Tokens principaux
```css
/* Backgrounds */
--color-bg-base: #F7F9FF
--color-bg-raised: #FFFFFF
--color-bg-overlay: #FAFBFF

/* Text */
--color-text-primary: #0F172A
--color-text-secondary: #475569
--color-text-muted: #94A3B8

/* Borders */
--color-border-default: rgba(15, 23, 42, 0.08)
--color-border-soft: rgba(15, 23, 42, 0.05)
--color-border-strong: rgba(15, 23, 42, 0.12)

/* Accent */
--color-accent: #4F46E5
--color-accent-hover: #4338CA

/* Shadows */
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04)
--shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.06)
--shadow-lg: 0 8px 24px rgba(15, 23, 42, 0.10), 0 4px 12px rgba(15, 23, 42, 0.08)
```

### Règles d'usage
1. **ZERO hardcoded colors** : Pas de `#hex`, `rgba()`, ou classes Tailwind (`text-slate-*`) dans les composants
2. **Toujours via tokens** : Utiliser Tailwind arbitrary values avec CSS vars
3. **Hover states** : Utiliser CSS hover avec tokens (ex: `hover:bg-[var(--color-bg-overlay)]`)
4. **Format unifié** : HEX pour opaques, RGBA pour transparents

**Exemples corrects:**
```tsx
// ✅ BON - CSS hover avec tokens
<button className="bg-[var(--color-bg-raised)] hover:bg-[var(--color-bg-overlay)] transition-colors">

// ✅ BON - Focus avec tokens
<input className="focus:ring-2 focus:ring-[var(--color-accent)]">

// ❌ MAUVAIS - onMouseEnter pour du style (anti-pattern a11y/perf)
<button onMouseEnter={(e) => e.currentTarget.style.background = "...">
```

## Structure des composants

### Pages principales
- `home-site/src/pages/Home.tsx` : Landing page
- `home-site/src/components/layout/Header.tsx` : Navigation sticky
- `home-site/src/components/layout/Footer.tsx` : Footer simple

### Composants réutilisables
- `home-site/src/components/ProgrammeSection.tsx` : Section semestre (S3/S4)
- `home-site/src/design-system/components/` : Primitives (Button, Card, Badge)

### Tokens
- `home-site/src/index.css` : Source of truth pour tous les tokens

## Anti-patterns (INTERDIT)

❌ **Hardcoded colors**
```tsx
// MAUVAIS
<div className="text-slate-900 bg-white border-gray-200">
<div style={{ color: "#0F172A" }}>

// BON
<div className="text-[var(--color-text-primary)] bg-[var(--color-bg-raised)] border-[var(--color-border-default)]">
```

❌ **Hover avec onMouseEnter (anti-pattern)**
```tsx
// MAUVAIS - JS pour du style
<button onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-overlay)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>

// BON - CSS hover
<button className="bg-transparent hover:bg-[var(--color-bg-overlay)] transition-colors">
```

❌ **Shadows Tailwind vanilla**
```tsx
// MAUVAIS
<div className="shadow-md">

// BON
<div className="shadow-[var(--shadow-md)]">
```

## Migration depuis legacy

Si tu vois du code avec :
- `rgb(var(--text))` → Remplacer par `var(--color-text-primary)`
- `text-slate-*` → Remplacer par `style={{ color: "var(--color-text-*)" }}`
- `shadow-md` → Remplacer par `style={{ boxShadow: "var(--shadow-md)" }}`

## Checklist avant commit

- [ ] Aucune couleur hardcoded (#hex, rgba() direct)
- [ ] Aucune classe Tailwind de couleur (text-*, bg-*, border-*)
- [ ] Tous les hovers utilisent onMouseEnter/Leave avec tokens
- [ ] Shadows via `var(--shadow-*)`
- [ ] Spacing multiples de 8px
- [ ] Radius parmi les 4 autorisés (8/12/16/full)
