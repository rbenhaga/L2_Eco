# Homepage & Pricing Redesign — Design Vision

**Date:** 2026-02-04  
**Accent:** Rouge (#D90000) — rare et intentionnel  
**Style:** Study-grade premium (Notion/Linear/Apple)  
**Respect:** Design Contract v4 + Product Steering v2

---

## 🎨 Design Direction

### Aesthetic Identity
**Study-Grade Premium** — Calme, lisible, focus-friendly.

- **Typography:** Playfair Display (titres) + Inter (body)
- **Palette:** Fond bleuté calme, surfaces blanches, texte noir, **rouge rare**
- **Philosophy:** Lisibilité > Décoration. Calme > Flashy.
- **Inspiration:** Notion, Linear, Apple Keynote

### Core Principles (Design Contract v4)
1. **Contraste fort** — Texte #0F172A sur fond #F7F9FF pour lisibilité parfaite
2. **Calme visuel** — Fond bleuté apaisant, pas de néon
3. **Hiérarchie claire** — 1 message par section, 1 CTA dominant
4. **Rouge intentionnel** — Accent rare (CTAs, badges), pas partout
5. **Shadows Keynote** — Subtiles avec top border

---

## 🔴 Color System — Red Accent (Study-Grade)

### Primary Palette (Design Contract v4)
```css
/* Canvas & Surfaces — Study-Grade Calm */
--color-bg-base: #F7F9FF;          /* Fond bleuté calme */
--color-bg-raised: #FFFFFF;        /* Cards, header */
--color-bg-overlay: #FAFBFF;       /* Items internes */

/* Text — WCAG AA+ Compliant */
--color-text-primary: #0F172A;     /* slate-950, quasi-noir */
--color-text-secondary: #475569;   /* slate-600, lisible */
--color-text-muted: #94A3B8;       /* slate-400, hints */

/* Borders — Subtle */
--color-border-default: rgba(15,23,42,0.08);
--color-border-strong: rgba(15,23,42,0.12);

/* RED ACCENT — Rare et intentionnel */
--color-accent: #D90000;           /* Rouge signature */
--color-accent-hover: #B80000;     /* Darker red hover */
--color-accent-subtle: rgba(217, 0, 0, 0.08);
```

### Usage Rules
- **Rouge** : CTAs primaires, badge "Meilleur prix", focus states, liens hover
- **Bleuté** : Fond principal (#F7F9FF) pour calme visuel
- **Blanc** : Cards, header (glass effect)
- **Noir** : Titres, texte principal

---

## 📐 Spacing & Radius (Design Contract v4)

### Spacing (8px System)
```css
--space-4: 16px   /* default */
--space-6: 24px   /* medium */
--space-8: 32px   /* large */
--space-12: 48px  /* section */
--space-16: 64px  /* hero */
```

### Radius (4 valeurs MAX)
```css
--radius-sm: 8px      /* inputs, small cards */
--radius-md: 12px     /* cards, modals */
--radius-lg: 16px     /* hero cards, header */
--radius-full: 9999px /* pills, avatars */
```

---

## 🎭 Shadows (Keynote Style - Design Contract v4)

```css
--shadow-sm: 0 1px 2px rgba(15,23,42,0.04);
--shadow-md: 0 1px 0 rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08);
--shadow-lg: 0 1px 0 rgba(15,23,42,0.06), 0 18px 60px rgba(15,23,42,0.10);
--shadow-xl: 0 1px 0 rgba(15,23,42,0.06), 0 24px 80px rgba(15,23,42,0.12);
```

**Caractéristique** : Top border subtil (0 1px 0) + shadow diffuse

---

## 📐 Layout Architecture

### Homepage Structure
```
┌─────────────────────────────────────────┐
│ Header (sticky, glass effect)           │
├─────────────────────────────────────────┤
│ Hero Section                            │
│ - Playfair Display title (huge)        │
│ - Subtitle (Inter)                      │
│ - CTA rouge primaire                    │
│ - Stats dashboard (card)                │
├─────────────────────────────────────────┤
│ Value Proposition (merged)              │
│ - Ressources (left)                     │
│ - Fonctionnalités (right)               │
│ - 2 columns, cards with icons          │
├─────────────────────────────────────────┤
│ Programme Section (KEEP)                │
│ - S3 / S4 cards                         │
│ - Module links with colors             │
├─────────────────────────────────────────┤
│ Footer (simple, links)                  │
└─────────────────────────────────────────┘
```

### Pricing Page Structure
```
┌─────────────────────────────────────────┐
│ Header (same as homepage)               │
├─────────────────────────────────────────┤
│ Hero                                    │
│ - "Choisis ton plan" (Playfair)        │
│ - Subtitle                              │
├─────────────────────────────────────────┤
│ Pricing Cards (3 columns)               │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ Free │ │Semes │ │Annual│             │
│ │  0€  │ │15,99€│ │29,99€│             │
│ └──────┘ └──────┘ └──────┘             │
│          (badge rouge "Meilleur prix")  │
├─────────────────────────────────────────┤
│ Transparency Section                    │
│ - "À quoi sert votre abonnement ?"     │
│ - 5 items with icons                    │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

---

## 🎯 Key Components

### 1. Hero Section (Homepage)
**Goal:** Impactant, mémorable, clair.

**Visual:**
- **Title:** Playfair Display, 4.25rem (clamp), noir, tracking tight
- **Gradient text:** "au même endroit" en rouge gradient
- **Subtitle:** Inter, 1.125rem, gris secondaire
- **CTA primaire:** Fond rouge, texte blanc, shadow, hover lift
- **CTA secondaire:** Fond blanc, border, hover subtle
- **Stats card:** Blanc, shadow-lg, 4 mini-cards colorées (modules)

**Spacing:**
- pt-24 pb-32 (desktop)
- pt-16 pb-24 (mobile)
- gap-12 entre colonnes

### 2. Value Proposition (Merged)
**Goal:** Montrer ce qu'on offre ET comment on aide.

**Visual:**
- **2 colonnes** (Ressources left, Fonctionnalités right)
- **Section title:** Playfair, 2xl, noir
- **Cards:** 2x2 grid, blanc, shadow-sm, hover lift
- **Icons:** Rouge subtle background, rouge icon
- **Spacing:** py-20 sm:py-28

### 3. Programme Section (KEEP but refresh)
**Goal:** Montrer S3/S4 avec modules.

**Visual:**
- **Badge:** "Programme complet" rouge subtle
- **Title:** Playfair, 4xl, noir
- **Semester cards:** Blanc, shadow-md, border subtle
- **Module links:** Hover translate-x, colored icons
- **Spacing:** py-24 sm:py-32

### 4. Pricing Cards
**Goal:** Clair, honnête, "Semestre" mis en avant.

**Plans:**
1. **Free (0€)** — Découverte
   - Premier chapitre de chaque matière
   - QCM de découverte
   - Fiches limitées
   - CTA: "Commencer gratuitement" (gris)

2. **Semestre (15,99€)** — BEST VALUE ⭐
   - Badge rouge "Meilleur prix"
   - Border rouge 2px
   - Shadow rouge subtle
   - Tout le contenu Premium
   - CTA: "Choisir semestriel" (rouge)

3. **Annuel (29,99€)** — Économie
   - Badge vert "-33%"
   - Tout le contenu Premium
   - 12 mois d'accès
   - CTA: "Choisir annuel" (noir)

**Visual:**
- **Cards:** Blanc, shadow-md, rounded-2xl
- **Prices:** Playfair Display, 3xl-4xl, noir
- **Features:** Liste avec Check icons rouges
- **Spacing:** gap-6 entre cards

### 5. Transparency Section
**Goal:** Montrer où va l'argent.

**Visual:**
- **Title:** Playfair, 2xl, centré
- **Items:** 5 cards avec icônes
- **Icons:** Rouge, h-5 w-5
- **Background:** Gris surface (#F4F4F6)
- **Spacing:** py-16 sm:py-20

---

## 🎨 Typography Scale

### Display (Playfair)
```css
.text-display {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-text-primary);
}
```

### Headings (Playfair)
```css
h1 { font-size: 3.5rem; font-weight: 700; }  /* Hero */
h2 { font-size: 2.25rem; font-weight: 600; } /* Sections */
h3 { font-size: 1.75rem; font-weight: 600; } /* Cards */
h4 { font-size: 1.125rem; font-weight: 600; }
```

### Body (Inter)
```css
.text-body-lg { font-size: 1.125rem; line-height: 1.6; }
.text-body { font-size: 1rem; line-height: 1.6; }
.text-body-sm { font-size: 0.875rem; line-height: 1.5; }
```

---

## 🎭 Shadows & Depth

### Shadow Scale
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 12px 48px rgba(0, 0, 0, 0.1);

/* Red accent shadow (for "Meilleur prix" card) */
--shadow-accent: 0 4px 20px rgba(217, 0, 0, 0.15);
```

### Usage
- **Cards:** shadow-sm default, shadow-md hover
- **Header:** shadow-md (glass effect)
- **Pricing "Semestre":** shadow-accent
- **Modals:** shadow-xl

---

## 🎬 Motion & Interactions

### Durations
```css
--duration-fast: 100ms;    /* Hover, focus */
--duration-normal: 200ms;  /* Toggles, small */
--duration-slow: 300ms;    /* Modals, panels */
```

### Easing
```css
--ease-default: cubic-bezier(0.33, 1, 0.68, 1);  /* Ease-out */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy */
```

### Hover Effects
- **Cards:** translateY(-4px) + shadow upgrade
- **Buttons:** translateY(-1px) + shadow-lg
- **Links:** color change + underline appear
- **Icons:** scale(1.05) + rotate(3deg)

### Focus States
```css
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-canvas),
              0 0 0 5px var(--color-accent);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Layout Adjustments
- **Hero:** 1 col mobile, 2 cols desktop
- **Value Prop:** 1 col mobile, 2 cols desktop
- **Pricing:** 1 col mobile, 3 cols desktop
- **Programme:** 1 col mobile, 2 cols desktop

---

## ✅ Quality Gates

### Before Implementation
- [ ] Tokens updated (rouge accent)
- [ ] Playfair Display font loaded
- [ ] Shadow scale defined
- [ ] Motion tokens ready

### During Implementation
- [ ] No hardcoded colors
- [ ] All spacing multiples of 8px
- [ ] Radius from 4 allowed values
- [ ] Shadows from token scale
- [ ] Focus states visible
- [ ] Hover states smooth

### After Implementation
- [ ] Contrast ratio >= 4.5:1 (text)
- [ ] Touch targets >= 44px
- [ ] Reduced motion respected
- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Tablet tested

---

## 🚀 Implementation Order

### Phase 1: Tokens & Foundation
1. Update `index.css` with red accent tokens
2. Add Playfair Display font import
3. Update shadow scale
4. Test token system

### Phase 2: Homepage
1. Hero section redesign
2. Value Proposition merge
3. Programme section refresh
4. Footer update

### Phase 3: Pricing
1. Remove "Mensuel SEPA" plan
2. Add "Annuel" plan
3. Update "Semestre" as best value
4. Transparency section refresh

### Phase 4: Polish
1. Animations & transitions
2. Responsive testing
3. Accessibility audit
4. Performance check

---

## 🎯 Success Metrics

### Visual Quality
- Contraste texte >= 4.5:1 ✓
- Shadows visibles mais subtiles ✓
- Rouge utilisé avec intention ✓
- Hiérarchie claire ✓

### UX Quality
- CTA primaire évident ✓
- Navigation fluide ✓
- Hover states réactifs ✓
- Focus states accessibles ✓

### Performance
- LCP < 2.5s ✓
- CLS < 0.1 ✓
- FID < 100ms ✓

---

**Next Step:** Implémenter Phase 1 (Tokens & Foundation)
