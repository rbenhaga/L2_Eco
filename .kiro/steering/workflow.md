# Agora — Workflow (Kiro + Agents + Claude Code)

## Pipeline Anti-Vanilla (CRITICAL)

### Avant TOUT code UI significatif:
1. Vérifier `.claude/docs/MVP.md` → concept validé?
2. Vérifier `.claude/docs/PRD.md` → requirements clairs?
3. Vérifier `.claude/docs/UX_SPEC.md` → décisions UX?
4. Vérifier `.claude/docs/BUILD_ORDER.md` → séquence définie?

**Si un doc manque → le créer d'abord, ne pas coder.**

---

## Modes de travail

### Mode 1: Micro-spec (défaut pour petites modifs)
Pour modif UI < 1h de travail:
```
Goal: [1 ligne]
Constraints: [2-3 lignes]
Done criteria: [3 bullets max]
```
Ensuite seulement on code.

### Mode 2: Full spec (grandes features)
À utiliser si:
- Nouvelle feature complète
- Refonte dark mode
- Refonte navigation
- Extraction design system

**Process:**
1. Créer/update MVP.md si nouveau concept
2. Créer/update PRD.md avec requirements
3. Créer/update UX_SPEC.md avec décisions
4. Définir BUILD_ORDER spécifique
5. Exécuter phase par phase

### Mode 3: Task List (Claude Code)
Pour gros refactors multi-fichiers:
- Utiliser Ctrl+T dans Claude Code
- Task 1: tokens + theme
- Task 2: composants core
- Task 3: layout + responsive
- etc.

---

## Output rules (agents)

### Toujours
- Proposer des diffs ciblés, pas réécrire tout
- Justifier par un principe du Design Contract
- Préserver l'existant quand il est bon
- Valider contre `.kiro/steering/quality-gates.md`

### Jamais
- Coder sans avoir lu le fichier d'abord
- Ignorer les états UI (loading/error/empty)
- Hardcoder des couleurs ou valeurs
- Skip la validation responsive

---

## Documentation rules (CRITICAL)

- **NE JAMAIS créer de documents récapitulatifs** (ETAPE_X.md, SUMMARY.md, PHASE_X_COMPLETE.md)
- **NE JAMAIS créer de fichiers markdown** sauf demande explicite de l'utilisateur
- **NE JAMAIS créer de README.md, MIGRATION.md, CHANGELOG.md** dans les dossiers de composants
- Les changements parlent d'eux-mêmes via le code
- Si résumé nécessaire: 2-3 phrases en chat, pas de fichier

**Exception:** Les docs de conception (MVP.md, PRD.md, UX_SPEC.md, BUILD_ORDER.md) sont autorisés AVANT le code, pas après.

**INTERDIT:**
- README.md dans /components
- MIGRATION.md
- CHANGELOG.md
- Documentation technique inline (le code doit être self-explanatory)

---

## Skills ecosystem (optionnel)

Pour installer des skills UI/UX premium:
```bash
npx skills add vercel-labs/agent-skills    # React best practices
npx skills add vercel-labs/next-skills     # Si migration Next
npx skills add remotion-dev/skills         # Pour vidéos/animations
```

---

## Tool Search (MCP)

- Si beaucoup de MCP: `ENABLE_TOOL_SEARCH=auto`
- Si 1-2 MCP must-use: `ENABLE_TOOL_SEARCH=false`
