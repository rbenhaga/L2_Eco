# PRD.md — Product Requirements Document

## 1. Problem Statement

Les étudiants en économie L2/L3 ont besoin de ressources de révision de qualité.
Les solutions existantes sont soit:
- Trop gamifiées (Duolingo-style) → distraction
- Trop austères (PDFs bruts) → décourageant
- Trop complexes (LMS universitaires) → friction

**Opportunity**: Un site study-grade qui combine qualité de contenu et expérience premium.

---

## 2. Target Users

### Primary: Étudiant L2/L3 Économie
- **Age**: 19-22 ans
- **Context**: Révisions partiels/finals
- **Pain points**:
  - Cours éparpillés (slides, notes, livres)
  - Pas de feedback sur progression
  - Interfaces moches qui cassent la concentration
- **Goals**:
  - Comprendre les concepts
  - S'exercer efficacement
  - Réviser sans stress

### Secondary: Étudiant prépa ECG
- Besoins similaires mais niveau plus exigeant
- Contenu plus dense, exercices plus difficiles

---

## 3. User Stories

### Epic 1: Découverte
```
US1.1: En tant qu'étudiant, je veux voir toutes les matières disponibles
       pour choisir quoi réviser.

US1.2: En tant qu'étudiant, je veux voir ma progression globale
       pour savoir où j'en suis.

US1.3: En tant qu'étudiant, je veux accéder rapidement aux derniers
       contenus consultés pour reprendre ma révision.
```

### Epic 2: Apprentissage
```
US2.1: En tant qu'étudiant, je veux lire un cours structuré par chapitres
       pour comprendre progressivement.

US2.2: En tant qu'étudiant, je veux voir les formules mathématiques
       correctement rendues (LaTeX) pour ne pas perdre de temps.

US2.3: En tant qu'étudiant, je veux écouter le cours en audio
       pour réviser en mobilité.
```

### Epic 3: Évaluation
```
US3.1: En tant qu'étudiant, je veux faire des QCM par chapitre
       pour tester ma compréhension.

US3.2: En tant qu'étudiant, je veux un feedback immédiat sur mes réponses
       pour apprendre de mes erreurs.

US3.3: En tant qu'étudiant, je veux voir mon score et revoir mes erreurs
       pour cibler mes révisions.
```

---

## 4. Functional Requirements

### FR1: Navigation
| ID | Requirement | Priority |
|----|-------------|----------|
| FR1.1 | Header sticky avec navigation matières | Must |
| FR1.2 | Breadcrumbs sur pages internes | Should |
| FR1.3 | Navigation clavier (raccourcis) | Could |

### FR2: Content Display
| ID | Requirement | Priority |
|----|-------------|----------|
| FR2.1 | Markdown rendering avec math support | Must |
| FR2.2 | Syntax highlighting pour code | Should |
| FR2.3 | Images et schémas responsives | Must |

### FR3: QCM System
| ID | Requirement | Priority |
|----|-------------|----------|
| FR3.1 | Questions single/multiple choice | Must |
| FR3.2 | Timer optionnel | Could |
| FR3.3 | Score calculation et display | Must |
| FR3.4 | Review mode (voir corrections) | Must |

### FR4: Persistence
| ID | Requirement | Priority |
|----|-------------|----------|
| FR4.1 | Progression stockée en localStorage | Must |
| FR4.2 | Sync multi-device (auth) | Won't (v1) |

---

## 5. Non-Functional Requirements

### NFR1: Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

### NFR2: Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation complète
- Screen reader compatible
- Contraste minimum 4.5:1

### NFR3: Responsiveness
- Mobile-first design
- Breakpoints: 640px / 768px / 1024px / 1280px
- Touch targets >= 44px

### NFR4: Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari/Chrome

---

## 6. Success Criteria

### Quantitative
| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 2.5s | Lighthouse |
| Accessibility Score | > 90 | Lighthouse |
| Performance Score | > 80 | Lighthouse |
| QCM Completion Rate | > 60% | Analytics |

### Qualitative
- Feedback utilisateurs positif sur la lisibilité
- Retours sur le "calme" de l'interface
- Facilité perçue de navigation

---

## 7. Out of Scope (v1)

- Authentification/comptes utilisateurs
- Paiement/abonnements
- Contenu généré par utilisateurs
- Forums/commentaires
- Notifications push
- App mobile native

---

## 8. Dependencies

### Technical
- Vite build system
- Tailwind CSS 4
- React 19 + TypeScript
- Framer Motion for animations

### Content
- Cours markdown préparés
- Questions QCM validées
- Images/schémas optimisés

### Design
- Design tokens définis (.kiro/specs)
- Component library établie
- Motion guidelines validées
