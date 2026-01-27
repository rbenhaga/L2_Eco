import type { ReactNode } from 'react';
import { Lightbulb, Target } from 'lucide-react';

interface MethodBoxProps {
  title: string;
  children: ReactNode;
}

export function MethodBox({ title, children }: MethodBoxProps) {
  return (
    <div className="my-6 rounded-xl border-2 border-amber-300 bg-amber-50 overflow-hidden">
      <div className="px-6 py-4 bg-amber-100 border-b border-amber-200 flex items-center gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600" />
        <span className="font-semibold text-amber-800">{title}</span>
      </div>
      <div className="p-6 text-amber-900 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-2">{title}</p>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}

interface DomainMethodProps {
  title?: string;
}

export function DomainMethod({ title = "Méthode pour déterminer les bornes d'intégration" }: DomainMethodProps) {
  return (
    <MethodBox title={title}>
      <div className="space-y-4">
        <Step number={1} title="Identifier les domaines marginaux globaux">
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>D₀ₓ</strong> : Projection du domaine D sur l'axe des x (intervalle total de x)</li>
            <li><strong>D₀ᵧ</strong> : Projection du domaine D sur l'axe des y (intervalle total de y)</li>
          </ul>
        </Step>
        
        <Step number={2} title="Technique du « blocage » de variable">
          <p className="mb-2">Pour trouver <strong>D_{'{Y/X}'}</strong> (bornes de y quand x est fixé) :</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>On <strong>bloque x</strong> (on le considère comme une constante)</li>
            <li>On regarde comment varie y en fonction de ce x bloqué</li>
            <li>Les bornes de y seront des fonctions de x (ex: de y=0 à y=x)</li>
          </ul>
          <p className="mt-2 text-sm italic">→ Sert à calculer la marginale a(x) = ∫f(x,y)dy</p>
        </Step>
        
        <Step number={3} title="Gestion des domaines complexes (union)">
          <p className="mb-2">Si la borne change de formule selon la valeur de la variable bloquée :</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Découper l'intégrale (Relation de Chasles)</li>
            <li>La marginale sera définie <strong>par morceaux</strong></li>
          </ul>
        </Step>
      </div>
      
      <div className="mt-4 p-4 bg-amber-100 rounded-lg">
        <p className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <Target size={16} /> Analogie du pain
        </p>
        <p className="text-sm">
          Imaginez le domaine comme une tranche de pain irrégulière. D₀ₓ est la largeur totale. 
          Pour D_{'{Y/X}'}, plantez un couteau à une position x fixe et mesurez la hauteur à cet endroit.
          Si la forme change brusquement, mesurez en deux temps.
        </p>
      </div>
    </MethodBox>
  );
}

export function LinearityMethod() {
  return (
    <MethodBox title="Calcul de E(X+Y) par linéarité">
      <div className="space-y-3">
        <p className="font-semibold">Propriété fondamentale :</p>
        <div className="p-4 bg-white rounded-lg border border-amber-200 text-center">
          <span className="text-lg font-mono">E(X+Y) = E(X) + E(Y)</span>
        </div>
        <p className="text-sm italic">Valable que X et Y soient indépendantes ou non !</p>
        
        <div className="mt-4">
          <p className="font-semibold mb-2">Méthode :</p>
          <ol className="list-decimal ml-4 space-y-2">
            <li>Calculer E(X) avec la marginale a(x) : <span className="font-mono">E(X) = ∫x·a(x)dx</span></li>
            <li>Calculer E(Y) avec la marginale b(y) : <span className="font-mono">E(Y) = ∫y·b(y)dy</span></li>
            <li>Faire la somme des deux résultats</li>
          </ol>
        </div>
      </div>
    </MethodBox>
  );
}
