# 🎓 RevP2 - Plateforme de Révision Économie

Plateforme d'apprentissage pour étudiants L1-L2 Économie avec cours, exercices, assistant IA et audio TTS.

## Stack

- **Frontend** : React 19 + TypeScript + Vite + Tailwind CSS
- **Backend** : Node.js + Express + SQLite
- **Auth** : Firebase (Google OAuth)
- **Paiements** : Stripe
- **IA** : Groq / Gemini (multi-provider avec fallback)
- **TTS** : Azure Cognitive Services

## Démarrage

```bash
# Frontend
cd home-site
npm install
cp .env.example .env  # Configurer les variables
npm run dev           # http://localhost:5173

# Backend (terminal séparé)
cd backend
npm install
cp .env.example .env  # Configurer les variables
npm start             # http://localhost:3001
```

## Structure

```
RevP2/
├── home-site/          # Frontend React
│   ├── src/
│   │   ├── pages/      # Pages (Home, Pricing, Legal, FAQ, Contact, 404)
│   │   ├── modules/    # Modules pédagogiques (macro, micro, stats, socio)
│   │   ├── features/   # Fonctionnalités (QCM, Audio, Chat IA)
│   │   ├── components/ # Composants UI
│   │   └── content/    # Cours en Markdown
│   └── package.json
│
├── backend/            # Backend Node.js
│   ├── routes/         # API (Stripe, IA, TTS)
│   ├── ai/             # Système IA multi-provider
│   ├── tts/            # Text-to-Speech Azure
│   └── package.json
│
└── README.md
```

## Matières disponibles (S2 L1)

- Macroéconomie (10 chapitres)
- Microéconomie (8 chapitres + annexes)
- Statistiques (6 chapitres)
- Sociologie (5 chapitres)

## Tarifs

- **Semestriel** : 15,99€ (paiement unique)
- **Mensuel** : 3,99€/mois × 6 (SEPA)

## Licence

Propriétaire - © 2026 RevP2
