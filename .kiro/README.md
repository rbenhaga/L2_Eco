# .kiro — Agent Steering Files

Ce dossier contient les fichiers de configuration pour les agents IA (Kiro, Claude Code, etc.).

## Structure

```
.kiro/
├── steering/           # Règles et guidelines
│   ├── design-contract.md   # Contrat de design (tokens, patterns)
│   ├── workflow.md          # Pipeline de travail
│   ├── quality-gates.md     # Critères de validation
│   ├── tech.md              # Stack technique
│   ├── product.md           # Vision produit
│   └── structure.md         # Structure du repo
│
├── specs/              # Spécifications techniques
│   ├── DESIGN_TOKENS.json   # Tokens exportables
│   ├── tokens.css           # CSS custom properties
│   └── UI_STATES.md         # États obligatoires
│
└── README.md           # Ce fichier
```

## Usage

### Pour les agents
Les fichiers `steering/` sont lus par les agents pour comprendre les contraintes du projet.
L'agent DOIT:
1. Lire `design-contract.md` avant toute modif UI
2. Suivre `workflow.md` pour le processus de travail
3. Valider contre `quality-gates.md` avant livraison

### Pour les développeurs
Les fichiers `specs/` contiennent les spécifications techniques:
- `DESIGN_TOKENS.json` : Tokens au format JSON (exportable)
- `tokens.css` : CSS custom properties prêtes à l'emploi
- `UI_STATES.md` : Patterns pour les états obligatoires

## Pipeline complet

Voir aussi `.claude/docs/` pour le pipeline documentaire:
- `MVP.md` → Concept et flows
- `PRD.md` → Requirements produit
- `UX_SPEC.md` → Spécifications UX
- `BUILD_ORDER.md` → Ordre de construction

## Mise à jour

Quand modifier ces fichiers:
- `design-contract.md` : Nouvelle palette, nouveaux tokens
- `workflow.md` : Nouveau process de travail
- `quality-gates.md` : Nouveaux critères de qualité
- `DESIGN_TOKENS.json` : Nouveaux tokens → régénérer `tokens.css`
