# Agora — Quality Gates (Definition of Done)

## Gate 1: Tokens (BLOQUANT)

- [ ] Aucune couleur Tailwind hardcoded (text-slate-*, bg-zinc-*, etc.)
- [ ] Toutes les couleurs via CSS variables (--color-*)
- [ ] Spacing = multiples de 8px uniquement
- [ ] Radius parmi les 4 autorisés (8/12/16/full)
- [ ] Shadows = tokens custom, pas shadow-md/lg vanilla

**Si échec → refactorer avant d'avancer.**

---

## Gate 2: UI States (BLOQUANT)

Pour tout composant data-driven:
- [ ] Empty state implémenté (pas juste "vide")
- [ ] Loading state implémenté (skeleton ou spinner)
- [ ] Error state implémenté (message + retry)
- [ ] Success state avec transition fluide

**Voir:** `.claude/docs/UX_SPEC.md` section 4 pour patterns.

---

## Gate 3: Accessibility

### Contraste
- [ ] Texte normal >= 4.5:1
- [ ] Texte large (18px+) >= 3:1
- [ ] UI components >= 3:1

### Navigation
- [ ] Focus visible sur TOUS les éléments interactifs
- [ ] Tab order logique
- [ ] Escape ferme modals/dropdowns

### Touch
- [ ] Zones cliquables >= 44px × 44px
- [ ] Espacement suffisant entre targets

---

## Gate 4: Responsive

- [ ] Mobile (< 640px) testé
- [ ] Tablet (640-1024px) testé
- [ ] Desktop (> 1024px) testé
- [ ] Pas de horizontal scroll accidentel
- [ ] Images responsive (srcset ou CSS)

---

## Gate 5: Motion

- [ ] `prefers-reduced-motion` respecté
- [ ] Durées conformes aux tokens (100/200/300ms)
- [ ] Pas d'animation sur scroll (sauf hero si justifié)
- [ ] Max 1 élément animé simultanément par viewport

---

## Gate 6: Performance

- [ ] Pas de blur gigantesque sur toute la page
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Pas de re-renders inutiles
- [ ] Bundle size raisonnable

---

## Gate 7: Code Quality

- [ ] Pas de code mort
- [ ] Pas de magic values (constantes centralisées)
- [ ] Niveaux d'abstraction séparés
- [ ] Edge cases gérés (listes vides, inputs invalides)

---

## Gate 8: Cohérence

- [ ] Mêmes radius partout (cards, buttons, inputs)
- [ ] Mêmes paddings (16px default, 24px large)
- [ ] Mêmes shadows (md pour cards, lg pour raised)
- [ ] Mêmes transitions (200ms ease-out default)

---

## Process

1. **Avant PR/commit:** Passer toutes les gates
2. **Si échec:** Corriger avant d'ajouter de nouvelles features
3. **Priorité:** Gates 1-2 sont BLOQUANTES, les autres sont importantes

---

## Checklist Rapide (Copier-coller)

```markdown
## Quality Gates Check
- [ ] G1: Tokens only (no hardcoded colors/shadows)
- [ ] G2: All UI states implemented
- [ ] G3: A11y OK (focus, contrast, touch)
- [ ] G4: Responsive tested
- [ ] G5: Reduced motion respected
- [ ] G6: Perf OK
- [ ] G7: Clean code
- [ ] G8: Consistent design
```
