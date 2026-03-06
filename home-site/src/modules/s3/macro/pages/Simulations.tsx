import { PageHeader, ChapterNav } from '../../../../components';
import { InteractiveISLM, InteractiveWSPS, InteractiveASAD, InteractivePhillips, QuizCourbes } from '../components/interactive';

export function Simulations() {
  return (
    <main className="max-w-7xl mx-auto px-6">
      <PageHeader
        number="Simulations"
        title="Modèles Interactifs"
        description="Visualise les effets des politiques économiques. Basé sur les formules du cours."
      />

      {/* Mode d'emploi */}
      <div className="mb-8 p-5 rounded-xl" style={{ background: 'var(--color-bg-overlay)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
        <p className="text-sm mb-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>Comment utiliser les simulateurs</p>
        <ul className="text-sm space-y-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <li><span className="mr-2" style={{ color: 'var(--color-text-muted)' }}>1.</span>Choisis un <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>événement</span> (ex: ↑G, ↑M) pour voir son effet sur les courbes</li>
          <li><span className="mr-2" style={{ color: 'var(--color-text-muted)' }}>2.</span>Clique sur <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Intuition</span> pour comprendre pourquoi les courbes ont cette forme</li>
        </ul>
      </div>

      {/* Synthèse des modèles - À retravailler */}
      {/* <section id="synthesis" className="scroll-mt-20">
        <ModelSynthesis />
      </section> */}

      <section id="islm" className="scroll-mt-20">
        <InteractiveISLM />
      </section>

      <section id="wsps" className="scroll-mt-20">
        <InteractiveWSPS />
      </section>

      <section id="asad" className="scroll-mt-20">
        <InteractiveASAD />
      </section>

      <section id="phillips" className="scroll-mt-20">
        <InteractivePhillips />
      </section>

      {/* Quiz */}
      <section id="quiz" className="scroll-mt-20 mt-12">
        <QuizCourbes />
      </section>

      <div className="max-w-4xl mx-auto">
        <ChapterNav
          prev={{ path: '/revision', label: '← Synthèse', title: 'Fiche de Révision' }}
          next={{ path: '/macro', label: 'Accueil →', title: "Page d'accueil" }}
        />
      </div>
    </main>
  );
}
