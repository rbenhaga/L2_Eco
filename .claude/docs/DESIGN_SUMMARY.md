# Homepage & Pricing Redesign — Summary

## ✅ Design Approach Validée

**Style** : Study-Grade Premium (Notion/Linear/Apple)  
**Accent** : Rouge #D90000 (rare et intentionnel)  
**Respect** : Design Contract v4 + Product Steering v2

---

## 🎨 Visual Identity

```
┌─────────────────────────────────────────┐
│ Fond bleuté calme (#F7F9FF)             │
│ ├─ Cards blanches (#FFFFFF)             │
│ │  ├─ Texte noir (#0F172A)              │
│ │  ├─ Texte gris (#475569)              │
│ │  └─ Accent ROUGE (#D90000) ← rare!    │
│ └─ Shadows Keynote (subtiles)           │
└─────────────────────────────────────────┘
```

---

## 🎯 Key Changes

### Homepage
1. **Hero** : Playfair Display title + CTA rouge
2. **Value Prop** : Merge Ressources + Fonctionnalités (2 cols)
3. **Programme** : Keep S3/S4 cards, refresh design

### Pricing
1. **Remove** : Plan "Mensuel SEPA"
2. **Add** : Plan "Annuel" (29,99€)
3. **Highlight** : "Semestre" avec badge rouge "Meilleur prix"

---

## 📏 Design Tokens (Conformes Design Contract v4)

### Spacing
- Multiples de 8px uniquement
- py-12 à py-16 pour sections
- py-24 à py-32 pour hero

### Radius
- sm: 8px, md: 12px, lg: 16px, full: 9999px
- Pas de radius custom

### Shadows (Keynote)
- Top border subtil + shadow diffuse
- sm/md/lg/xl selon élévation

### Colors
- Fond : #F7F9FF (bleuté calme)
- Cards : #FFFFFF (blanc pur)
- Texte : #0F172A (quasi-noir)
- Accent : #D90000 (rouge rare)

---

## 🚀 Implementation Plan

### Phase 1: Tokens ✅
- [x] Update accent colors (rouge)
- [x] Fix radius (8/12/16/full)
- [x] Fix shadows (Keynote style)
- [x] Verify spacing tokens

### Phase 2: Homepage (Next)
- [ ] Hero section with Playfair
- [ ] Value Proposition merge
- [ ] Programme section refresh
- [ ] CTA rouge primaire

### Phase 3: Pricing
- [ ] Remove Mensuel plan
- [ ] Add Annuel plan
- [ ] Highlight Semestre
- [ ] Transparency section

### Phase 4: Polish
- [ ] Animations (reduced motion)
- [ ] Responsive testing
- [ ] Accessibility audit
- [ ] Performance check

---

## ✅ Quality Gates

- [ ] G1: Tokens only (no hardcoded colors) ← BLOQUANT
- [ ] G2: All UI states implemented ← BLOQUANT
- [ ] G3: A11y OK (contrast 4.5:1+)
- [ ] G4: Responsive tested
- [ ] G5: Reduced motion respected
- [ ] G6: Performance OK
- [ ] G7: Clean code
- [ ] G8: Consistent design

---

**Status** : Phase 1 complete ✅  
**Next** : Implement Homepage Hero with rouge accent
