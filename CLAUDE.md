# CLAUDE.md — Agora Project Instructions

## Project Overview
Agora est un site de révisions study-grade pour étudiants exigeants.
Stack: React 19 + TypeScript + Vite + Tailwind CSS 4 + Framer Motion

## Architecture Philosophy
Site web (pas app dashboard) : scroll naturel, pas de sidebar.
UI = Apple/Linear/Notion grade : calme, lisible, premium.

---

## CRITICAL RULES (Always Apply)

### 1) Pipeline Anti-Vanilla (NEVER skip)
Avant tout code UI significatif, vérifier l'existence de:
- `.claude/docs/MVP.md` → concept validé
- `.claude/docs/PRD.md` → requirements clairs
- `.claude/docs/UX_SPEC.md` → décisions UX documentées
- `.claude/docs/BUILD_ORDER.md` → séquence de construction

Si un de ces docs manque pour la feature → le créer d'abord.

### 2) Design Contract (Enforce Always)
Lire `.kiro/steering/design-contract.md` avant toute modif UI.
Points non-négociables:
- Grille 8px, max 3 radius (8/12/16px)
- Palette study-grade (#F7F9FF fond, slate-950 texte)
- Shadow Keynote custom (pas shadow-md/lg vanilla)
- États UI obligatoires: empty/loading/error/success
- Motion avec reduced-motion support

### 3) Code Quality (From "98% code mal écrit")
- Nommer l'intention, pas l'action (`canUserCheckout` > `if user && cart`)
- Séparer niveaux d'abstraction (validation ≠ DB ≠ UI)
- Gérer tous les edge cases (listes vides, inputs invalides)
- Architecture clean: constantes centralisées, pas de magic values
- Supprimer le code mort (Git est là pour ça)

### 4) Anti-AI Patterns
INTERDIT:
- Couleurs Tailwind hardcoded (text-slate-*, bg-zinc-*)
- Composants génériques sans raison
- 12 tailles de typo différentes
- Animations sans reduced-motion
- États UI manquants (surtout loading/error)

---

## File Structure Knowledge

```
home-site/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── design-system/   # Primitives UI (Button, Card, Badge)
│   ├── features/        # Features isolées (qcm, course)
│   ├── content/         # Markdown cours
│   └── config/          # Configuration
├── .claude/
│   ├── docs/            # MVP, PRD, UX_SPEC, BUILD_ORDER
│   └── settings.local.json
└── .kiro/
    ├── steering/        # Design contract, workflow, tech
    └── specs/           # Design tokens, UI states
```

---

## Commands Reference

```bash
# Dev
npm run dev          # Vite dev server
npm run build        # TypeScript + Vite build
npm run preview      # Preview production build

# Quality
npm run lint         # ESLint check
```

---

## Task Workflow

### Pour une nouvelle feature UI:
1. Vérifier/créer les docs (MVP → PRD → UX_SPEC)
2. Définir le BUILD_ORDER spécifique
3. Coder séquentiellement: tokens → layout → composants → interactions → polish
4. Valider contre `.kiro/steering/quality-gates.md`

### Pour un fix/refactor:
1. Micro-spec (10 lignes max): Goal, Constraints, Done criteria
2. Diff ciblé, pas de réécriture complète
3. Justifier chaque changement par un principe du Design Contract

---

## Tool Search Settings (MCP)
Si beaucoup de MCP installés: `ENABLE_TOOL_SEARCH=auto`
Si 1-2 MCP must-use: `ENABLE_TOOL_SEARCH=false` pour qu'ils restent en contexte

---

## Skills Ecosystem (Optional)
Pour installer des skills UI/UX premium:
```bash
npx skills add vercel-labs/agent-skills    # React best practices
npx skills add vercel-labs/next-skills     # Si migration Next
npx skills add remotion-dev/skills         # Pour vidéos/animations
```

---

## Documentation Rules
- NE JAMAIS créer de fichiers récapitulatifs (SUMMARY.md, ETAPE_X.md)
- Les changements parlent d'eux-mêmes via le code
- Si résumé nécessaire: 2-3 phrases en chat, pas de fichier
