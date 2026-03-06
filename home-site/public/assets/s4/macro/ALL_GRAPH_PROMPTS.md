# Prompts Graphiques - Cours Macro S4

Ce fichier consolide tous les prompts graphiques detailles presents dans les cours (chapitre 1 et chapitre 2).

## Chapitre 1

### CH1-F01 - Forex en changes flottants (Section 3.7)
Prompt:
"Graphique offre-demande de devises sur le marche des changes (Forex). Axe X : Quantite d'euros. Axe Y : Taux de change E($/EUR). Courbe de demande D0 decroissante et courbe d'offre O croissante, avec un point d'equilibre initial. Puis une seconde courbe D1 deplacee vers la droite (choc de demande), montrant un nouveau point d'equilibre plus haut. Fleche d'appreciation. Style academique epure, couleurs bleues."

### CH1-F02 - Forex en changes fixes (Section 3.9)
Prompt:
"Graphique offre-demande de devises en changes fixes. Axe X : Quantite d'euros. Axe Y : E($/EUR). Ligne horizontale de parite fixe E_bar = 1,05. Courbes O et D initiales en equilibre sur E_bar. Puis D' deplacee a droite montrant un exces de demande au cours officiel. Fleche montrant l'intervention BC qui deplace O vers la droite pour combler l'exces. Style academique."

### CH1-F03 - Triangle de Mundell (Section 3.17)
Prompt:
"Academic impossible trinity triangle (Mundell). Three vertices: fixed exchange rate, monetary policy autonomy, free capital mobility. Show the three feasible policy corners with concrete examples: USA/UK (float + free capital), CFA/Hong Kong (fixed + free capital), China (fixed + monetary autonomy with capital controls). Clean white background, clear labels, no decorative effects."

## Chapitre 2

### CH2-F01 - Courbe en J
Prompt:
"J-curve showing trade balance (NX) over time after a depreciation. Initial equilibrium at 0, dip below 0 in the short-run (price effect), then rises above 0 in the medium-run (volume effect). Academic style with labeled phases."

### CH2-F02 - Exemple numerique NX
Prompt:
"Bar chart with 3 states: t0 (0 EUR), t1 (-25 EUR, red), t2 (+40 EUR, green). Clean academic style, labels above each bar."

### CH2-F03 - PTINC de base
Prompt:
"PTINC line in (i,E): upward sloping line passing through (i*=3%, E^e), with labeled axes and point annotation. Academic macro chart."

### CH2-F04 - Hausse de i sur PTINC
Prompt:
"PTINC chart in (i,E): show movement along the same upward-sloping PTINC from point A (lower i, lower E) to point B (higher i, higher E), with arrow A->B. Academic style."

### CH2-F05 - Hausse des anticipations
Prompt:
"Two PTINC curves in (i,E): initial PTINC0 and shifted-up PTINC1 after expected future exchange rate E^e rises; indicate appreciation at constant i. Academic style."

### CH2-F06 - Choc PTINC 2022
Prompt:
"Two PTINC curves (May 2022 vs Sept 2022), downward shift from Fed tightening, highlight observed points (i_BCE, E) for both dates."

### CH2-F07 - Courbe IS
Prompt:
"IS curve in (Y,i): downward sloping line, axes labeled Y and i, one equilibrium point. Clean macroeconomics textbook style."

### CH2-F08 - Deplacement IS
Prompt:
"IS0 and IS1 in (Y,i), IS shifts right after fiscal expansion (G up), annotate initial and new equilibrium with unchanged LM as reference."

### CH2-F09 - Courbe LM
Prompt:
"LM curve in (Y,i): upward sloping line, monetary equilibrium representation, axes labeled Y and i."

### CH2-F10 - Deplacement LM
Prompt:
"LM0 and LM1 in (Y,i), LM shifts right/down after expansionary monetary policy (L^s up), IS fixed."

### CH2-F11 - Equilibre IS-LM
Prompt:
"One IS (downward) and one LM (upward) crossing in (Y,i), highlight equilibrium Omega(Y*, i*)."

### CH2-F12 - Courbe BP + zones
Prompt:
"BP curve in (Y,i) with areas labeled BP>0 above and BP<0 below, include one point on BP where external balance holds."

### CH2-F13 - Influence de k sur BP
Prompt:
"Family of BP lines in (Y,i): near-vertical for k->0, flatter for larger k, horizontal for k->infinity."

### CH2-F14 - Equilibre global IS-LM-BP
Prompt:
"Three curves IS (down), LM (up), BP (up or flat depending k) crossing at Omega in (Y,i)."

### CH2-F15 - Budgetaire flottant k eleve
Prompt:
"IS shifts right after G increase, temporary point A above BP, appreciation shifts IS back left to final point. Floating exchange with high k."

### CH2-F16 - Budgetaire flottant k infini
Prompt:
"Horizontal BP at i*, fiscal IS shift fully offset by appreciation, final equilibrium returns to initial output (Omega0=Omega1)."

### CH2-F17 - Monetaire flottant
Prompt:
"LM shifts right after monetary expansion, i falls below BP, depreciation boosts NX and shifts IS right; final equilibrium at higher Y."

### CH2-F18 - Budgetaire fixe
Prompt:
"Fixed exchange with high k: IS shifts right, pressure to appreciate, central bank intervention raises reserves and money supply, LM shifts right to final equilibrium."

### CH2-F19 - Monetaire fixe
Prompt:
"Fixed exchange: LM shifts right after monetary expansion, i falls below i*, reserve loss forces LM back to initial position, output unchanged."

### CH2-F20 - Triangle de Mundell
Prompt:
"Impossible trinity triangle with three vertices: fixed exchange, monetary autonomy, free capital mobility. Show three feasible policy corners with examples."

### CH2-F21 - Policy mix US 2022-2024
Prompt:
"IS-LM-BP policy-mix diagram: IS right shift (fiscal), LM left shift (monetary tightening), resulting high i, strong currency and resilient output."

---

Sources cours:
- `home-site/src/modules/s4/macro/pages/chapter1/Section3a.tsx`
- `home-site/src/modules/s4/macro/pages/chapter1/Section3b.tsx`
- `home-site/src/modules/s4/macro/pages/chapter2/Section1.tsx`
- `home-site/src/modules/s4/macro/pages/chapter2/Section2.tsx`
- `home-site/src/modules/s4/macro/pages/chapter2/Section3.tsx`
- `home-site/src/modules/s4/macro/pages/chapter2/Section4a.tsx`
- `home-site/src/modules/s4/macro/pages/chapter2/Section4b.tsx`
