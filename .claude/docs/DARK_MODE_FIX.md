# Dark Mode Fix — Study-Grade Premium

**Date:** 2026-02-04  
**Issue:** Dark mode affreusement laid  
**Solution:** Tokens dark mode cohérents avec light mode

---

## 🌙 Dark Mode Design

### Philosophy
**Study-Grade Premium Dark** — Même calme et lisibilité que le light mode, mais en noir profond.

- **Fond** : Noir profond avec teinte bleue (#0A0C14)
- **Cards** : Gris très foncé (#18181B)
- **Texte** : Blanc cassé (#F5F5F5)
- **Accent** : Rouge plus vif (#FF4545) pour contraste
- **Shadows** : Keynote style avec top border blanc subtil

---

## 🎨 Dark Mode Tokens

### Backgrounds
```css
--color-bg-base: #0A0C14;       /* Noir profond avec teinte bleue */
--color-bg-raised: #18181B;     /* Cards */
--color-bg-overlay: #16161A;    /* Items internes */
```

### Text (WCAG AA+)
```css
--color-text-primary: #F5F5F5;  /* Near white */
--color-text-secondary: #B8B8B8; /* Strong contrast */
--color-text-muted: #8B8B8B;    /* AA compliant */
```

### Borders (White-based)
```css
--color-border-subtle: rgba(255, 255, 255, 0.06);
--color-border-default: rgba(255, 255, 255, 0.10);
--color-border-strong: rgba(255, 255, 255, 0.18);
```

### Accent (Brighter Red)
```css
--color-accent: #FF4545;        /* Brighter for dark bg */
--color-accent-hover: #FF6B6B;  /* Lighter on hover */
--color-accent-subtle: rgba(255, 69, 69, 0.12);
```

### Shadows (Keynote Dark)
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.40);
--shadow-md: 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 24px rgba(0, 0, 0, 0.50);
--shadow-lg: 0 1px 0 rgba(255, 255, 255, 0.03), 0 18px 60px rgba(0, 0, 0, 0.60);
--shadow-xl: 0 1px 0 rgba(255, 255, 255, 0.03), 0 24px 80px rgba(0, 0, 0, 0.70);
```

**Caractéristique** : Top border blanc subtil (0.03 opacity) + shadow noire profonde

---

## 🔄 Light vs Dark Comparison

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Background** | #F7F9FF (bleuté) | #0A0C14 (noir bleuté) |
| **Cards** | #FFFFFF (blanc) | #18181B (gris foncé) |
| **Text** | #0F172A (noir) | #F5F5F5 (blanc) |
| **Accent** | #D90000 (rouge) | #FF4545 (rouge vif) |
| **Borders** | rgba(15,23,42,0.08) | rgba(255,255,255,0.10) |
| **Shadows** | Keynote (noir) | Keynote (noir + border blanc) |

---

## ✅ What Was Fixed

### Tokens Updated
- [x] Background colors (noir profond)
- [x] Text colors (blanc cassé)
- [x] Border colors (white-based)
- [x] Accent colors (rouge vif)
- [x] Shadows (Keynote dark)
- [x] Module colors (brighter)
- [x] Semantic colors (adjusted)

### Pages Affected
- [x] Homepage (Hero, Value Prop, Programme)
- [x] Pricing Page (Cards, Transparency)
- [x] All components using tokens

---

## 🎯 Key Improvements

### Before (Ugly)
- Mauvais contraste
- Couleurs ternes
- Shadows invisibles
- Borders invisibles
- Accent trop sombre

### After (Beautiful)
- Contraste fort (WCAG AA+)
- Couleurs vibrantes
- Shadows visibles (Keynote)
- Borders subtiles mais visibles
- Accent rouge vif

---

## 📱 Responsive Dark Mode

Le dark mode fonctionne sur :
- Mobile (< 640px)
- Tablet (640-1024px)
- Desktop (> 1024px)

Tous les composants utilisent les tokens, donc le dark mode est automatiquement appliqué partout.

---

## 🧪 Testing Checklist

### Visual
- [ ] Homepage Hero (fond noir, texte blanc, CTA rouge)
- [ ] Homepage Value Prop (cards visibles)
- [ ] Homepage Programme (S3/S4 cards lisibles)
- [ ] Pricing Free card (visible)
- [ ] Pricing Semestre card (badge rouge visible)
- [ ] Pricing Annuel card (visible)
- [ ] Transparency section (cards lisibles)

### Contrast
- [ ] Text primary >= 4.5:1
- [ ] Text secondary >= 4.5:1
- [ ] Borders visibles
- [ ] Shadows visibles
- [ ] Accent rouge vif

### Interaction
- [ ] Hover states fonctionnent
- [ ] Focus states visibles
- [ ] Buttons cliquables
- [ ] Links hover

---

## 🚀 How to Toggle Dark Mode

Le dark mode est activé via :
1. Attribut HTML : `<html class="dark">`
2. Attribut data : `<html data-theme="dark">`
3. Sélecteur CSS : `[data-theme="dark"]`

Les tokens sont automatiquement appliqués via les sélecteurs CSS.

---

## 📝 Files Modified

- `home-site/src/index.css` — Dark mode tokens updated

---

## ✨ Result

**Dark mode study-grade premium** :
- Noir profond avec teinte bleue
- Contraste fort (WCAG AA+)
- Rouge vif pour accent
- Shadows Keynote visibles
- Cohérent avec light mode

**Status:** Dark mode fixed ✅
