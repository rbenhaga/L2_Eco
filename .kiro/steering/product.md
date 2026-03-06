# Agora — Product Steering v2

## One-liner
Agora est un site de révisions study-grade : calme, lisible, premium.

## North Star
Un site web (pas une app) qui ressemble à Notion/Linear/Apple :
- fond off-white bleuté apaisant
- surfaces blanches avec shadows Keynote
- contraste fort (texte quasi-noir)
- accent indigo rare et intentionnel

## Target user
Étudiant exigeant qui veut se concentrer sans distraction visuelle.

## UX priorities (ordered)
1. Lisibilité parfaite (contraste fort, pas de gris clair)
2. Calme visuel (fond study-grade, pas de néon)
3. Navigation simple (header sticky, sections scroll)
4. Hiérarchie claire (1 CTA par section)
5. Performance perçue (scroll fluide, hover instantané)

## Architecture Decision
- **Public pages**: Site web style (Header + Sections + Footer)
- **App pages**: Dashboard style (Sidebar + Content) — Better for complex navigation
- **Mobile**: Bottom drawer (better thumb reach than side drawer)

## Non-goals
- Pas de dark mode pour l'instant (light-first, mais tokens prêts)
- Pas d'effets lourds (glow partout, blur gigantesque)
- Pas de gamification (badges, streaks, points)
