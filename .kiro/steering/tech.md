# Agora — Tech Steering

## Stack (must respect)
- React 19 + TypeScript 5.9
- Vite 7 (build)
- Tailwind CSS 4
- Framer Motion
- lucide-react icons
- Design tokens via CSS variables (voir `home-site/src/index.css`)

---

## Core Rule: UI = Tokens

**INTERDIT:** Couleurs Tailwind hardcoded (text-slate-*, bg-zinc-*, etc.)

**OBLIGATOIRE:** Utiliser les CSS custom properties:
```tsx
// Couleurs
className="text-[var(--color-text-primary)]"
className="bg-[var(--color-bg-raised)]"
className="border-[var(--color-border-default)]"

// Spacing (multiples de 8px)
className="p-[var(--space-4)]"  // 16px
className="gap-[var(--space-6)]" // 24px

// Shadows
className="shadow-[var(--shadow-md)]"

// Radius
className="rounded-[var(--radius-md)]" // 12px
```

---

## Tokens Reference

**Source of truth:** `home-site/src/index.css`
**Design rules:** `.kiro/steering/design-contract.md`

All tokens are defined in `home-site/src/index.css` and automatically available throughout the app.

---

## Animations

### Durées
- Hover/focus: `var(--duration-fast)` (100ms)
- Toggles: `var(--duration-normal)` (200ms)
- Modals: `var(--duration-slow)` (300ms)

### Easing
- Default: `var(--ease-default)` — ease-out
- Spring: `var(--ease-spring)` — bouncy

### Règles
- Respect strict de `prefers-reduced-motion`
- Max 1 élément animé par viewport
- Pas d'animations sur scroll (sauf hero justifié)

---

## Accessibility

- Focus visible systématique (ring 2px + offset)
- Contraste minimum 4.5:1 (texte normal)
- Contraste minimum 3:1 (large text, UI)
- Zones cliquables >= 44px × 44px
- Tab order logique
- aria-labels sur icônes-only

---

## File Structure

```
src/
├── components/        # Composants réutilisables
├── design-system/     # Primitives (Button, Card, Badge)
├── features/          # Features isolées (qcm, course)
├── content/           # Markdown cours
├── config/            # Configuration
└── styles/            # CSS global + tokens
```

---

## Performance Guidelines

- Pas de blur gigantesque sur backgrounds
- Images: WebP + lazy loading
- Éviter re-renders inutiles (React.memo, useMemo)
- Bundle splitting pour routes

---

## Skills (optionnel)

Pour installer des skills recommandés:
```bash
npx skills add vercel-labs/agent-skills    # React best practices
```
