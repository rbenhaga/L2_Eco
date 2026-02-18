# Images Chapter 2 (S4 Macro) - Production Guide (Complete + Efficient)

Official count in source:
- 21 figures (Figure 1 -> Figure 21) in `content/s4/macro/raw/cours/chapitre2.py`.

Important:
- "Complet" = les 21 figures existent dans le site.
- "Efficient" = plusieurs figures peuvent etre derivees d'un meme gabarit graphique (petites variations).

Target folder:
- `home-site/public/assets/s4/macro/chapter2/`

Final file names required by convention:
- `figure-01.png` ... `figure-21.png`

Recommended specs:
- PNG, fond clair
- 1600x1000 (ou 1920x1200)
- Style manuel de cours (axes, labels, courbes nommees)

---

## A. Strategie rigoureuse (familles de graphes)

Tu peux generer 10 "masters" puis deriver/copier pour couvrir les 21 figures sans perte de contenu.

Famille F1 - J-curve
- Couvre: 1, 2

Famille F2 - PTINC
- Couvre: 3, 4, 5, 6

Famille F3 - IS
- Couvre: 7, 8

Famille F4 - LM
- Couvre: 9, 10

Famille F5 - Equilibre ferme
- Couvre: 11

Famille F6 - BP
- Couvre: 12, 13

Famille F7 - Equilibre global ouvert
- Couvre: 14

Famille F8 - Politiques en flottant
- Couvre: 15, 16, 17

Famille F9 - Politiques en fixe
- Couvre: 18, 19

Famille F10 - Triangle + policy mix
- Couvre: 20, 21

---

## B. Prompts "Master" (detailles)

### F1 (figures 1-2)
Prompt master:
"Create a clean academic macroeconomics chart set (2 panels). Panel A: J-curve of net exports NX after a currency depreciation; x-axis=time, y-axis=NX, initial NX=0, short-run dip below zero (price effect), medium-run rebound above zero (volume effect), vertical marker at depreciation date. Panel B: bar chart for t0=0 EUR, t1=-25 EUR (red), t2=+40 EUR (green), values labeled above bars. White background, textbook style, no decorations."

### F2 (figures 3-6)
Prompt master:
"Create a 2x2 panel set for uncovered interest parity PTINC in (i,E). Panel 1: upward PTINC line through (i*=3%, E^e). Panel 2: movement along PTINC from A to B when domestic i rises (E appreciates). Panel 3: upward shift of PTINC when expected future exchange rate E^e rises. Panel 4: comparison May 2022 vs Sept 2022 with downward PTINC shift due to higher US i*, points marked for observed BCE rate and EUR/USD. Label axes and points clearly."

### F3 (figures 7-8)
Prompt master:
"Create 2 panels for IS in (Y,i). Panel 1: single downward IS curve with one reference point. Panel 2: IS0 to IS1 rightward shift after fiscal expansion G up, with equilibrium points marked."

### F4 (figures 9-10)
Prompt master:
"Create 2 panels for LM in (Y,i). Panel 1: single upward LM curve with one reference point. Panel 2: LM0 to LM1 right/down shift after expansionary monetary policy L^s up, equilibria marked."

### F5 (figure 11)
Prompt:
"IS and LM in one chart crossing at Omega(Y*,i*), both curves labeled, textbook macro style."

### F6 (figures 12-13)
Prompt master:
"Create 2 panels for BP in (Y,i). Panel 1: one BP curve with zones BP>0 above and BP<0 below. Panel 2: family of BP curves by capital mobility k (near-vertical for k→0, flatter for higher k, horizontal for k→infinity)."

### F7 (figure 14)
Prompt:
"IS-LM-BP full equilibrium chart in (Y,i), IS (blue, down), LM (red, up), BP (green), common intersection Omega labeled."

### F8 (figures 15-17)
Prompt master:
"Create 3 panels for floating exchange regime policies. Panel 1 (fig15): fiscal expansion with high k, IS right then partial crowding-out via appreciation (IS partially back). Panel 2 (fig16): perfect capital mobility, horizontal BP at i*, fiscal effect fully crowded out, Omega0=Omega1. Panel 3 (fig17): monetary expansion, LM right, i down, depreciation boosts NX, IS right, higher final Y."

### F9 (figures 18-19)
Prompt master:
"Create 2 panels for fixed exchange regime. Panel 1 (fig18): fiscal expansion with high k, appreciation pressure, central bank intervention raises reserves and money supply, LM right. Panel 2 (fig19): monetary expansion initially shifts LM right, reserve loss forces LM back, policy ineffective."

### F10 (figures 20-21)
Prompt master:
"Create 2 panels. Panel 1: Mundell impossible trinity triangle with vertices fixed exchange, monetary autonomy, free capital mobility, and policy corner examples. Panel 2: US 2022-2024 policy mix IS-LM-BP diagram, IS right shift and LM left shift, high i and stronger dollar, resilient output."

---

## C. Mapping exact (required files)

- `figure-01.png` <- F1 panel A
- `figure-02.png` <- F1 panel B
- `figure-03.png` <- F2 panel 1
- `figure-04.png` <- F2 panel 2
- `figure-05.png` <- F2 panel 3
- `figure-06.png` <- F2 panel 4
- `figure-07.png` <- F3 panel 1
- `figure-08.png` <- F3 panel 2
- `figure-09.png` <- F4 panel 1
- `figure-10.png` <- F4 panel 2
- `figure-11.png` <- F5
- `figure-12.png` <- F6 panel 1
- `figure-13.png` <- F6 panel 2
- `figure-14.png` <- F7
- `figure-15.png` <- F8 panel 1
- `figure-16.png` <- F8 panel 2
- `figure-17.png` <- F8 panel 3
- `figure-18.png` <- F9 panel 1
- `figure-19.png` <- F9 panel 2
- `figure-20.png` <- F10 panel 1
- `figure-21.png` <- F10 panel 2

Integration note:
- Tu peux produire des images "multi-panels" puis exporter/crop chaque panneau vers les noms ci-dessus.
- Ainsi tu gardes 100% du cours sans refaire 21 prompts independants.
