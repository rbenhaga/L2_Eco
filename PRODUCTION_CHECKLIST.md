# Production Go-Live Checklist

## 1. Secrets
- Supprimer le fichier local `backend/revision-hub-l2-firebase-adminsdk-fbsvc-6865887f4e.json` du serveur.
- Utiliser uniquement `FIREBASE_SERVICE_ACCOUNT_JSON` (ou `GOOGLE_APPLICATION_CREDENTIALS` securise).
- Verifier que les fichiers `.env` ne sont pas commit et que leurs permissions sont strictes.

## 2. Variables d'environnement (obligatoire)
- `NODE_ENV=production`
- `FRONTEND_URL=https://ton-domaine`
- `FRONTEND_URL_WWW=https://www.ton-domaine` (si utilise)
- `ADMIN_EMAILS=email1@example.com,email2@example.com`
- `ALLOW_DEV_AUTH_BYPASS=false` (ou non defini)

## 3. Acces backend uniquement via le site
- Placer le backend derriere un reverse proxy (Nginx/Cloudflare).
- Bloquer l'acces direct au port backend depuis Internet (firewall/security group).
- Autoriser seulement le proxy vers le backend.

## 4. Auth renforcee
- Activer Firebase App Check cote frontend + verification cote backend.
- Conserver `requireAuth` sur toutes les routes sensibles (user/progress/subscription/admin/ai/tts).

## 5. CORS et headers
- Verifier que seuls `FRONTEND_URL`/`FRONTEND_URL_WWW` sont autorises.
- Conserver `helmet` et `x-powered-by` desactive.

## 6. Rate limiting et anti-abus
- Verifier les limites API globales et AI (`/api`, `/api/ai/*`).
- Ajouter une limite specifique sur `/api/progress/:userId/learning/sync` si trafic eleve.

## 7. Base de donnees et performance
- Activer des sauvegardes automatiques SQLite + rotation.
- Prevoir une evolution vers un delta sync pour la progression (optimisation reseau/CPU).

## 8. Observabilite
- Activer des logs structures (auth, CORS, 403, 429, 5xx).
- Mettre des alertes sur:
  - pic de `401/403`
  - erreurs `5xx`
  - latence API
  - saturation disque (DB/logs/cache audio)

## 9. Smoke tests avant bascule
- Login utilisateur.
- Acces aux cours et dashboard `/mes-cours`.
- Persistance annee/semestre apres refresh.
- QCM: tentative enregistree et stats visibles apres reload.
- Admin: acces reserve aux emails presents dans `ADMIN_EMAILS`.
- TTS metadata inaccessible sans token.

## 10. Verification post-deploiement
- Verifier les endpoints publics attendus:
  - `/health` (minimal)
  - `/api/site-config` (public)
- Monitorer pendant 24h: erreurs auth, CORS, rate-limit, 5xx.
