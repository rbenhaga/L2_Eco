# Images Chapter 1 (S4 Macro) - Production Guide

Target folder:
- `home-site/public/assets/s4/macro/chapter1/`

Current placeholders implemented in chapter pages:
- 3 graphics to generate

Naming convention:
- `figure-01.png` (floating FX supply-demand shock)
- `figure-02.png` (fixed FX intervention mechanism)
- `figure-03.png` (Mundell impossible trinity)
- Recommended format: PNG
- Recommended size: 1600x1000 or 1920x1200

Global style constraints:
- Academic textbook style
- White/light background
- Axes, curves, and equilibrium points explicitly labeled
- No 3D, no artistic effects
- Consistent color coding across chapter

Detailed prompts:

1. `figure-01.png` (Section 3.7, changes flottants)
Prompt:
"Foreign exchange market supply-demand graph in floating exchange regime. X-axis: quantity of euros. Y-axis: exchange rate E($/EUR). Initial demand D0 (downward) and supply O (upward) intersect at equilibrium A. Then shift demand to D1 to the right (positive demand shock, e.g., capital inflow). Show new equilibrium B with higher E (euro appreciation). Include arrow D0->D1 and annotation 'appreciation'. Clean macroeconomics style."

2. `figure-02.png` (Section 3.9, changes fixes)
Prompt:
"Foreign exchange market graph in fixed exchange regime. X-axis: quantity of euros. Y-axis: E($/EUR). Draw horizontal fixed parity line E_bar = 1.05. Initial curves O and D intersect on E_bar. Then demand shifts right to D1 creating excess demand at fixed parity. Show central bank intervention as supply shift O->O_interv to restore equilibrium on E_bar. Annotate 'reserve accumulation / money creation'. Academic style."

3. `figure-03.png` (Section 3.17, triangle de Mundell)
Prompt:
"Impossible trinity triangle (Mundell-Fleming). Three vertices: fixed exchange rate, monetary policy autonomy, free capital mobility. Highlight that only two goals can be achieved simultaneously. Add policy configurations with examples: (1) USA/UK: autonomy + free capital -> floating exchange; (2) CFA/Hong Kong: fixed exchange + free capital -> no monetary autonomy; (3) China (historical stylized): fixed exchange + monetary autonomy -> capital controls. Minimal clean labels, white background."

Integration note:
- Drop files in this folder with exact names above.
- Placeholders are already present in:
  - `src/modules/s4/macro/pages/chapter1/Section3a.tsx`
  - `src/modules/s4/macro/pages/chapter1/Section3b.tsx`
