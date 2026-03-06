import type { ReactNode } from 'react';
import { Lightbulb, Target } from 'lucide-react';

interface MethodBoxProps {
  title: string;
  children: ReactNode;
}

export function MethodBox({ title, children }: MethodBoxProps) {
  return (
    <div
      className="my-6 rounded-xl border-2 overflow-hidden"
      style={{
        borderColor: 'var(--color-warning)',
        background: 'var(--color-warning-subtle)',
      }}
    >
      <div
        className="px-6 py-4 border-b flex items-center gap-3"
        style={{
          background: 'var(--color-warning-subtle)',
          borderColor: 'var(--color-warning)',
        }}
      >
        <Lightbulb className="w-5 h-5" style={{ color: 'var(--color-warning)' }} />
        <span className="font-semibold" style={{ color: 'color-mix(in srgb, var(--color-warning) 80%, black)' }}>{title}</span>
      </div>
      <div className="p-6 leading-relaxed" style={{ color: 'color-mix(in srgb, var(--color-warning) 70%, black)' }}>
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
      <div
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
        style={{
          background: 'var(--color-info)',
          color: 'var(--color-accent-foreground)',
        }}
      >
        {number}
      </div>
      <div className="flex-1">
        <p className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</p>
        <div style={{ color: 'var(--color-text-secondary)' }}>{children}</div>
      </div>
    </div>
  );
}

interface DomainMethodProps {
  title?: string;
}

export function DomainMethod({ title = "Methode pour determiner les bornes d'integration" }: DomainMethodProps) {
  return (
    <MethodBox title={title}>
      <div className="space-y-4">
        <Step number={1} title="Identifier les domaines marginaux globaux">
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>D0x</strong> : Projection du domaine D sur l'axe des x (intervalle total de x)</li>
            <li><strong>D0y</strong> : Projection du domaine D sur l'axe des y (intervalle total de y)</li>
          </ul>
        </Step>

        <Step number={2} title="Technique du blocage de variable">
          <p className="mb-2">Pour trouver <strong>D_{'{Y/X}'}</strong> (bornes de y quand x est fixe) :</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>On <strong>bloque x</strong> (on le considere comme une constante)</li>
            <li>On regarde comment varie y en fonction de ce x bloque</li>
            <li>Les bornes de y seront des fonctions de x (ex: de y=0 a y=x)</li>
          </ul>
          <p className="mt-2 text-sm italic">`&gt;` Sert à calculer la marginale a(x) = ∫ f(x,y)dy</p>
        </Step>

        <Step number={3} title="Gestion des domaines complexes (union)">
          <p className="mb-2">Si la borne change de formule selon la valeur de la variable bloquee :</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Decouper l'integrale (Relation de Chasles)</li>
            <li>La marginale sera definie <strong>par morceaux</strong></li>
          </ul>
        </Step>
      </div>

      <div
        className="mt-4 p-4 rounded-lg"
        style={{ background: 'var(--color-warning-subtle)' }}
      >
        <p className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'color-mix(in srgb, var(--color-warning) 80%, black)' }}>
          <Target size={16} /> Analogie du pain
        </p>
        <p className="text-sm">
          Imaginez le domaine comme une tranche de pain irreguliere. D0x est la largeur totale.
          Pour D_{'{Y/X}'}, plantez un couteau a une position x fixe et mesurez la hauteur a cet endroit.
          Si la forme change brusquement, mesurez en deux temps.
        </p>
      </div>
    </MethodBox>
  );
}

export function LinearityMethod() {
  return (
    <MethodBox title="Calcul de E(X+Y) par linearite">
      <div className="space-y-3">
        <p className="font-semibold">Propriete fondamentale :</p>
        <div
          className="p-4 rounded-lg border text-center"
          style={{
            background: 'var(--color-bg-raised)',
            borderColor: 'var(--color-warning)',
          }}
        >
          <span className="text-lg font-mono">E(X+Y) = E(X) + E(Y)</span>
        </div>
        <p className="text-sm italic">Valable que X et Y soient independantes ou non !</p>

        <div className="mt-4">
          <p className="font-semibold mb-2">Methode :</p>
          <ol className="list-decimal ml-4 space-y-2">
            <li>Calculer E(X) avec la marginale a(x) : <span className="font-mono">E(X) = integrate x*a(x)dx</span></li>
            <li>Calculer E(Y) avec la marginale b(y) : <span className="font-mono">E(Y) = integrate y*b(y)dy</span></li>
            <li>Faire la somme des deux resultats</li>
          </ol>
        </div>
      </div>
    </MethodBox>
  );
}
