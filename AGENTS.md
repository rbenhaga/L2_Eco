# AGENTS.md — Steering & Conventions

> Priority order:
> 1) User instructions in chat (highest)
> 2) This AGENTS.md (project steering)
> 3) Tool defaults / agent defaults (lowest)

## 1) Core Objectives (Non-Negotiable)

**Goal**: Refactor UI/UX to a Notion/Apple aesthetic: sober, readable, premium, highly polished.

### ⛔ Prohibited (Zero Tolerance)
- **NO gamification**: points, badges, levels, streaks, leaderboards, XP.
- **NO fake stats**: never invent numbers. If data isn’t real, remove it.
- **NO dark patterns**: clear limits, clear pricing, no trick wording.
- **NO “secure/production-ready” claims** without evidence (tests/config/screenshots).

### 🔒 Security & Safety
- **Secrets**: never open/print `.env*`, keys, tokens, Stripe secrets, Firebase service accounts.
- **Terminal**:
  - OK to run: lint/build/tests, formatting, typecheck.
  - Ask before running anything destructive: rm, clean, migrations, dependency changes.
- **Dependencies**: do NOT add new libraries without explicit user approval.

## 2) UI/UX Rules (Notion/Apple style)

### Layout & Density
- **Mobile-first**: 320/390/768/1024/1440 breakpoints must be checked.
- **No horizontal scroll** on body. If a table/code overflows, contain it locally.
- **Avoid fixed layout offsets** (no hard `ml-[xxx]` for global layout). Prefer responsive grid/shell.
- **Reading width**: main content should have a comfortable max-width for long text.
- **Reduce visual noise**: gradients/glass only as subtle accents, never behind long reading content.

### Typography & Accessibility
- Default to **system font stack** (Inter only if already configured).
- **Touch targets** ≈ 44px min for interactive elements.
- Visible focus states (`:focus-visible`), keyboard navigable.
- Respect `prefers-reduced-motion` (disable heavy animations).

### Components
- Centralize primitives in `src/components/ui/` (Button, Input, Card, Badge, Tabs, Dialog, Skeleton).
- Consistent spacing/radius/shadows via tokens (CSS vars or Tailwind theme).

## 3) Engineering Standards

- TypeScript strict, no `any`.
- Keep components < 200 LOC when reasonable (extract subcomponents).
- Keep changes incremental: 1 task = 1 PR/commit group.

## 4) Proof & Verification (Mandatory)

Before finishing any task, always provide:
1) `git status`
2) `git diff --stat`
3) `git diff` (or patch file)
4) **CUMULATIVE DIFF**: Maintain `changes.patch` or `git_report.md` updated at EVERY interaction to show all modifications since the start of the task.
5) Screenshots (390/768/1440) for UI changes
6) Commands run + outputs (lint/build/tests if applicable)
7) Short changelog: what changed, where, why

Recommended commands:
- `npm run lint`
- `npm run build`
