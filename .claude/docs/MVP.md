# MVP.md — Agora Concept

## One-liner
Site de révisions study-grade pour étudiants L2/L3 économie.

## Core Concept
Un site web (pas une app) qui offre une expérience de révision calme et concentrée.
Pas de dashboard complexe, pas de gamification excessive — juste du contenu de qualité.

---

## User Flows

### Flow 1: Découverte (Homepage)
```
Arrivée → Hero + value prop → Browse matières → Sélection cours → Page cours
```

### Flow 2: Révision active (Course)
```
Page cours → Navigation chapitres → Lecture contenu → Exercices/QCM → Progression
```

### Flow 3: Évaluation (QCM)
```
Sélection QCM → Questions séquentielles → Feedback immédiat → Score final → Révision erreurs
```

---

## Features (v1)

### Must-Have
- [ ] Homepage avec grid de matières
- [ ] Pages de cours avec markdown rendering
- [ ] Système QCM fonctionnel
- [ ] Navigation simple (header sticky)
- [ ] Design study-grade (calme, lisible)

### Should-Have
- [ ] Progression tracking (localStorage)
- [ ] Mode audio (écoute des cours)
- [ ] Exercices interactifs

### Could-Have
- [ ] Dark mode
- [ ] Export PDF fiches
- [ ] Système de révision espacée

### Won't-Have (v1)
- Authentification complexe
- Social features
- Gamification heavy

---

## Constraints

### Technical
- React 19 + Vite (fast builds)
- Tailwind CSS 4 (utility-first)
- Framer Motion (animations)
- No backend required for v1 (static content)

### Design
- Mobile-first responsive
- Accessibility WCAG AA minimum
- Performance: LCP < 2.5s

### Business
- Gratuit pour les étudiants
- Monétisation future via premium content

---

## Success Metrics

1. **Engagement**: Temps moyen sur page cours > 5 min
2. **Completion**: Taux de completion QCM > 60%
3. **Return**: Visiteurs récurrents > 30%
4. **UX**: Score SUS > 70

---

## Non-Goals (Explicit)

- Ne pas devenir une app type Duolingo
- Ne pas ajouter de features "cool" sans besoin validé
- Ne pas sur-engineerer (KISS)
