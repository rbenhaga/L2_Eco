# Repository Guidelines

## Project Structure & Module Organization
This repository has two active apps:
- `home-site/`: React 19 + TypeScript + Vite frontend.
  - `home-site/src/modules/`: course modules (e.g., macro pages and routes).
  - `home-site/src/components/`: shared UI/course components.
  - `home-site/src/content/`: raw course content assets.
  - `home-site/public/assets/`: static images and media.
- `backend/`: Node.js + Express API and utilities.
  - `backend/routes/`: API endpoints (`ai`, `tts`, `checkout`, `progress`, etc.).
  - `backend/scripts/`: operational scripts (`init-db`, TTS helpers).
  - `backend/tts/` and `backend/utils/`: service logic and helpers.

## Build, Test, and Development Commands
Frontend (`home-site/`):
- `npm run dev`: start local Vite dev server.
- `npm run build`: type-check (`tsc -b`) and create production build.
- `npm run lint`: run ESLint across frontend source.
- `npm run validate:content`: validate course content quality.

Backend (`backend/`):
- `npm run dev`: run API with watch mode.
- `npm start`: run API in standard mode.
- `npm run init-db`: initialize local SQLite DB.
- `npm run test-tts` / `npm run test-latex-formatting`: script-based checks.

## Coding Style & Naming Conventions
- Use TypeScript for frontend code and modern ES modules on backend.
- Follow ESLint defaults in `home-site` before opening PRs.
- React components: `PascalCase` filenames and exports (`Chapter1.tsx`).
- Utilities/hooks/helpers: `camelCase` naming.
- Encoding rule: write all code and text in UTF-8.
- Preserve French accents and special characters correctly (`é`, `è`, `à`, `œ`, `—`).
- Avoid mixed encodings (UTF-8/Windows-1252) to prevent corruption/mojibake (`Ã©`, `â€”`).

## Testing Guidelines
- No unified test runner is configured at repo root.
- Frontend quality gate is currently `npm run lint` + `npm run build`.
- Backend validation relies on script checks in `backend/scripts/`.
- When adding tests, prefer colocated `*.test.ts(x)` naming and document run commands in PR.

## Commit & Pull Request Guidelines
- Commit history is not fully accessible from this environment; use clear, imperative commit titles.
- Recommended format: `feat(module): short summary`, `fix(api): short summary`, `docs: ...`.
- PRs should include:
  - scope summary and impacted paths,
  - setup/migration notes (`.env`, DB, scripts),
  - screenshots for UI changes (`home-site`),
  - test/build evidence (commands run and results).
