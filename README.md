# 🎓 RevP2 - Plateforme de Révision L2 Économie

Plateforme web de révision study-grade pour étudiants en L2 Économie : cours interactifs, QCM, chatbot IA, et suivi de progression.

## Architecture Monorepo

```
RevP2/
├── home-site/          # Frontend React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── modules/    # Modules de cours (S3/S4: macro, micro, stats, socio, management)
│   │   ├── components/ # Composants UI réutilisables
│   │   ├── features/   # Features isolées (QCM, AI chat, audio)
│   │   └── content/    # Contenu brut des cours
│   └── public/         # Assets statiques
│
├── backend/            # API Node.js + Express
│   ├── routes/         # Endpoints API (ai, tts, checkout, progress)
│   ├── ai/             # Système AI multi-provider (Groq, Gemini, OpenRouter)
│   ├── db/             # Base de données SQLite + migrations
│   └── tts/            # Service Text-to-Speech Azure
│
├── .kiro/              # Configuration Kiro (steering, specs)
└── .claude/            # Documentation de conception
```

## Installation & Développement

### Prérequis
- Node.js 18+
- npm ou pnpm

### Frontend
```bash
cd home-site
npm install
npm run dev          # Dev server sur http://localhost:5173
npm run build        # Build production
npm run lint         # Linter ESLint
```

### Backend
```bash
cd backend
cp .env.example .env # Configurer les variables d'environnement
npm install
npm run init-db      # Initialiser la base de données
npm run dev          # API sur http://localhost:3001
```

## Stack Technique

### Frontend
- React 19 + TypeScript 5.9
- Vite 7 (build)
- Tailwind CSS 4 (design tokens CSS custom properties)
- Framer Motion (animations)
- KaTeX (formules mathématiques)
- Firebase Auth

### Backend
- Node.js + Express
- SQLite (base de données)
- AI multi-provider (Groq, Gemini, OpenRouter)
- Azure Speech TTS
- Stripe (paiements)
- Upstash Vector (cache sémantique)

## Design System

Le projet utilise un système de tokens CSS strict :
- Couleurs via `var(--color-*)` uniquement
- Spacing multiples de 8px
- 4 radius autorisés (8/12/16/full)
- Shadows custom Keynote-style

Voir `.kiro/steering/design-contract.md` pour les règles complètes.

## Matières disponibles

### Semestre 3 (S3)
- Macroéconomie (4 chapitres)
- Microéconomie (8 chapitres)
- Statistiques (5 chapitres)
- Sociologie (10 chapitres)

### Semestre 4 (S4)
- Macroéconomie (4 chapitres)
- Microéconomie (4 chapitres)
- Statistiques (11 chapitres)
- Management (4 chapitres)

## Documentation

- [Frontend README](./home-site/README.md)
- [Backend README](./backend/README.md)
- [Design Contract](./.kiro/steering/design-contract.md)
- [Product Steering](./.kiro/steering/product.md)
- [Quality Gates](./.kiro/steering/quality-gates.md)
- [Workflow](./.kiro/steering/workflow.md)

## Sécurité

Les fichiers sensibles sont exclus du repo :
- `.env` (clés API)
- `*-adminsdk-*.json` (Firebase credentials)
- `*.db` (bases de données)

Voir `.gitignore` pour la liste complète.

## Tarifs

- **Semestriel** : 15,99€ (paiement unique)
- **Mensuel** : 3,99€/mois × 6 (SEPA)

## Licence

Propriétaire - © 2026 RevP2
