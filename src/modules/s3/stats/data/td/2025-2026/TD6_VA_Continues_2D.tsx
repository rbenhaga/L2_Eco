import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD6_2526: TDSheet = {
  id: 'td6-2526',
  title: 'TD6 - Variables aléatoires continues à deux dimensions',
  chapter: 'CH5',
  year: '2025-2026',
  reminders: [
    { title: 'Densité marginale a(x)', formula: 'a(x) = \\int_{D_{Y/X}} f(x,y)\\,dy' },
    { title: 'Densité conditionnelle', formula: 'b^x(y) = \\frac{f(x,y)}{a(x)}' },
    { title: 'Espérance conditionnelle', formula: 'E(Y|X=x) = \\int y \\cdot b^x(y)\\,dy' },
    { title: 'Méthode des 4 bornes', formula: 'D_{0X}, D_{0Y}, D_{Y/X}, D_{X/Y}' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Densité conjointe kxy²',
      difficulty: 3,
      tags: ['VA 2D', 'Densité', 'Loi marginale', 'Loi conditionnelle', 'Méthode des 4 bornes'],
      hint: 'D_{Y/X} change selon x → marginale par morceaux. Dessinez le domaine !',
      content: (
        <div>
          <p>Densité: <M>{"f(x,y) = kxy^2"}</M> sur D = {'{'} y ≤ x, 0 ≤ y ≤ 2, x ≤ 3 {'}'}</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>Lois marginales a(x) et b(y)</li>
            <li>Loi conditionnelle <M>{"a^y(x)"}</M></li>
            <li>E(Y|X=x)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          {/* Méthode du professeur */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="font-semibold text-amber-800 mb-3">📐 Méthode : Détermination des 4 bornes</p>
            <div className="text-sm text-amber-900 space-y-2">
              <M>{"\\begin{cases} D_{0X} = [0, 3] & \\text{(projection sur } x\\text{)} \\\\ D_{0Y} = [0, 2] & \\text{(projection sur } y\\text{)} \\\\ D_{Y/X} = [0, \\min(x, 2)] & \\text{(bloquer } x\\text{, bornes de } y\\text{)} \\\\ D_{X/Y} = [y, 3] & \\text{(bloquer } y\\text{, bornes de } x\\text{)} \\end{cases}"}</M>
              <p className="mt-2 text-red-700 font-medium">⚠️ D_{'{Y/X}'} change selon x → marginale par morceaux !</p>
            </div>
          </div>

          <p><strong>1. Déterminer k :</strong></p>
          <M>{"\\iint_D kxy^2 \\, dxdy = k \\int_0^2 \\int_y^3 xy^2 \\, dx\\, dy = \\frac{44k}{5} = 1 \\Rightarrow \\boxed{k = \\frac{5}{44}}"}</M>
          
          <p><strong>2. Marginale a(x) :</strong></p>
          <p className="text-sm text-slate-700 mb-2">On intègre sur D_{'{Y/X}'} qui dépend de x :</p>
          
          <div className="pl-4 border-l-2 border-blue-300 space-y-2">
            <p><strong>Si 0 ≤ x ≤ 2</strong> : y ∈ [0, x]</p>
            <M>{"a(x) = \\int_0^x \\frac{5}{44}xy^2 dy = \\frac{5x}{44} \\cdot \\frac{x^3}{3} = \\frac{5x^4}{132}"}</M>
            
            <p><strong>Si 2 {'<'} x ≤ 3</strong> : y ∈ [0, 2]</p>
            <M>{"a(x) = \\int_0^2 \\frac{5}{44}xy^2 dy = \\frac{5x}{44} \\cdot \\frac{8}{3} = \\frac{10x}{33}"}</M>
          </div>
          
          <div className="p-3 bg-emerald-50 rounded border border-emerald-200 mt-2">
            <M>{"a(x) = \\begin{cases} \\frac{5x^4}{132} & 0 \\leq x \\leq 2 \\\\ \\frac{10x}{33} & 2 < x \\leq 3 \\end{cases}"}</M>
          </div>

          <p><strong>Marginale b(y) :</strong></p>
          <p className="text-sm text-slate-700 mb-2">On intègre sur D_{'{X/Y}'} = [y, 3] :</p>
          <M>{"b(y) = \\int_y^3 \\frac{5}{44}xy^2 dx = \\frac{5y^2(9-y^2)}{88} \\quad \\text{pour } 0 \\leq y \\leq 2"}</M>
          
          <p><strong>3. Loi conditionnelle <M>{"a^y(x)"}</M> :</strong></p>
          <M>{"a^y(x) = \\frac{f(x,y)}{b(y)} = \\frac{\\frac{5}{44}xy^2}{\\frac{5y^2(9-y^2)}{88}} = \\frac{2x}{9-y^2} \\quad \\text{pour } y \\leq x \\leq 3"}</M>
          
          <p><strong>4. E(Y|X=x) :</strong></p>
          <p className="text-sm text-slate-700 mb-2">Formule : <M>{"E(Y|X=x) = \\int y \\cdot b^x(y) dy"}</M></p>
          
          <div className="pl-4 border-l-2 border-blue-300 space-y-2">
            <p><strong>Si 0 {'<'} x ≤ 2</strong> : <M>{"b^x(y) = \\frac{3y^2}{x^3}"}</M></p>
            <M>{"E(Y|X=x) = \\int_0^x y \\cdot \\frac{3y^2}{x^3} dy = \\frac{3x}{4}"}</M>
            
            <p><strong>Si 2 {'<'} x ≤ 3</strong> : <M>{"b^x(y) = \\frac{3y^2}{8}"}</M></p>
            <M>{"E(Y|X=x) = \\int_0^2 y \\cdot \\frac{3y^2}{8} dy = \\frac{3}{2}"}</M>
          </div>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 (Novembre 2024) - Densité ax² + 2xy²',
      difficulty: 3,
      tags: ['VA 2D', 'Densité', 'Loi marginale', 'Méthode des 4 bornes', 'Intégration'],
      hint: 'Utilisez Chasles pour découper l\'intégrale : ∫₀² = ∫₀¹ + ∫₁²',
      content: (
        <div>
          <p>Densité: <M>{"f(x,y) = ax^2 + 2xy^2"}</M> sur D = {'{'} y ≤ 1, 0 ≤ x ≤ 2, 0 ≤ y ≤ x {'}'}</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer a</li>
            <li>Loi marginale a(x)</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          {/* Méthode du professeur */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="font-semibold text-amber-800 mb-3">📐 Méthode : Les 4 bornes</p>
            <div className="text-sm text-amber-900">
              <M>{"\\begin{cases} D_{0X} = [0, 2] \\\\ D_{0Y} = [0, 1] \\\\ D_{Y/X} = [0, \\min(x, 1)] & \\text{change à } x=1 \\\\ D_{X/Y} = [y, 2] \\end{cases}"}</M>
              <p className="mt-2 text-red-700 font-medium">⚠️ Découper avec Chasles : ∫₀² = ∫₀¹ + ∫₁²</p>
            </div>
          </div>

          <p><strong>1. Déterminer a :</strong></p>
          <M>{"\\int_0^1 \\int_0^x (ax^2 + 2xy^2) dy\\, dx + \\int_1^2 \\int_0^1 (ax^2 + 2xy^2) dy\\, dx = 1"}</M>
          
          <p className="text-sm">Première intégrale (x ∈ [0,1], y ∈ [0,x]) :</p>
          <M>{"\\int_0^1 \\left(ax^3 + \\frac{2x^4}{3}\\right) dx = \\frac{a}{4} + \\frac{2}{15}"}</M>
          
          <p className="text-sm">Deuxième intégrale (x ∈ [1,2], y ∈ [0,1]) :</p>
          <M>{"\\int_1^2 \\left(ax^2 + \\frac{2x}{3}\\right) dx = \\frac{7a}{3} + 1"}</M>
          
          <M>{"\\frac{a}{4} + \\frac{2}{15} + \\frac{7a}{3} + 1 = 1 \\Rightarrow \\frac{31a}{12} = -\\frac{2}{15} \\Rightarrow \\boxed{a = -\\frac{8}{155}}"}</M>
          
          <p><strong>2. Marginale a(x) par morceaux :</strong></p>
          <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
            <M>{"a(x) = \\begin{cases} ax^3 + \\frac{2x^4}{3} & 0 \\leq x \\leq 1 \\\\ ax^2 + \\frac{2x}{3} & 1 < x \\leq 2 \\end{cases}"}</M>
          </div>
          
          <p><strong>3. E(X) :</strong></p>
          <p className="text-sm text-slate-700 mb-2">Découper aussi : <M>{"E(X) = \\int_0^1 x \\cdot a(x) dx + \\int_1^2 x \\cdot a(x) dx"}</M></p>
          <M>{"E(X) = \\boxed{1.463}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Densité exponentielle ke^(-y)',
      difficulty: 2,
      tags: ['VA 2D', 'Densité', 'Loi marginale', 'Loi conditionnelle', 'Loi Exponentielle'],
      hint: 'Reconnaissez les lois usuelles dans les marginales et conditionnelles.',
      content: (
        <div>
          <p>Densité: <M>{"f(x,y) = ke^{-y}"}</M> sur D = {'{'} y ≥ 0, y ≤ x, y ≥ x - 4, x ≥ 0 {'}'}</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>Lois marginales a(x) et b(y)</li>
            <li>Lois conditionnelles</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          {/* Méthode du professeur */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="font-semibold text-amber-800 mb-3">📐 Méthode : Les 4 bornes</p>
            <div className="text-sm text-amber-900">
              <M>{"\\begin{cases} D_{0X} = [0, +\\infty[ \\\\ D_{0Y} = [0, +\\infty[ \\\\ D_{Y/X} = [\\max(0, x-4), x] & \\text{change à } x=4 \\\\ D_{X/Y} = [y, y+4] \\end{cases}"}</M>
            </div>
          </div>

          <p><strong>1. Déterminer k :</strong></p>
          <M>{"k \\int_0^4 \\int_0^x e^{-y} dy\\, dx + k \\int_4^{+\\infty} \\int_{x-4}^x e^{-y} dy\\, dx = 1"}</M>
          <M>{"k(3 + e^{-4}) + k(1 - e^{-4}) = 4k = 1 \\Rightarrow \\boxed{k = \\frac{1}{4}}"}</M>
          
          <p><strong>2. Marginale a(x) :</strong></p>
          <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
            <M>{"a(x) = \\begin{cases} \\frac{1-e^{-x}}{4} & 0 \\leq x \\leq 4 \\\\ \\frac{(e^4-1)e^{-x}}{4} & x > 4 \\end{cases}"}</M>
          </div>
          
          <p><strong>Marginale b(y) :</strong></p>
          <p className="text-sm text-slate-700 mb-2">D_{'{X/Y}'} = [y, y+4] (largeur constante = 4)</p>
          <M>{"b(y) = \\frac{1}{4} \\int_y^{y+4} e^{-y} dx = \\frac{e^{-y}}{4} \\times 4 = e^{-y}"}</M>
          <p className="text-emerald-700 font-semibold">→ Y ~ Exp(1) !</p>
          
          <p><strong>3. Lois conditionnelles :</strong></p>
          
          <p><strong><M>{"a^y(x)"}</M> :</strong></p>
          <M>{"a^y(x) = \\frac{f(x,y)}{b(y)} = \\frac{\\frac{1}{4}e^{-y}}{e^{-y}} = \\frac{1}{4} \\quad \\text{pour } x \\in [y, y+4]"}</M>
          <p className="text-emerald-700 font-semibold">→ X|Y=y ~ U([y, y+4]) !</p>
          
          <p><strong><M>{"b^x(y)"}</M> pour x = 2 :</strong></p>
          <M>{"b^2(y) = \\frac{f(2,y)}{a(2)} = \\frac{\\frac{1}{4}e^{-y}}{\\frac{1-e^{-2}}{4}} = \\frac{e^{-y}}{1-e^{-2}} \\quad \\text{pour } y \\in [0, 2]"}</M>
        </div>
      ),
    },
  ],
};
