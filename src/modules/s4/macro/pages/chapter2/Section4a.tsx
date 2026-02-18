import { Section, Callout, Math } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 4a - Efficacite en changes flottants */
export function Ch2Section4a() {
    return (
        <section id="ch2-section-4" data-section-title="4. Efficacite des politiques en economie ouverte" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 4 - Efficacite des politiques economiques en economie ouverte
            </h2>

            <div id="ch2-s4-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.1 Regime de changes flottants</h3>
                <Section type="key" title="Proprietes du flottement pur">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>La banque centrale n'intervient pas systematiquement sur le change.</li>
                        <li>Le taux de change s'ajuste pour restaurer BP=0.</li>
                        <li><Math>{'L^s'}</Math> est exogene : autonomie monetaire.</li>
                    </ul>
                </Section>
            </div>

            <div id="ch2-s4-1-1" className="mb-12">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.1.1 Relance budgetaire (G up) en changes flottants</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Avec k eleve, la relance pousse i vers le haut, attire les capitaux, apprecie la monnaie et freine NX : eviction externe partielle.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 15 - Relance budgetaire en changes flottants (k eleve)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "IS shifts right after G increase, temporary point A above BP, appreciation shifts IS back left to final point. Floating exchange with high k."
                    </p>
                </div>

                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En parfaite mobilite (<Math>{'k \\to \\infty'}</Math>), l'eviction devient totale : Y final est inchange.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 16 - Relance budgetaire avec k vers infini : eviction totale
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Horizontal BP at i*, fiscal IS shift fully offset by appreciation, final equilibrium returns to initial output (Omega0=Omega1)."
                    </p>
                </div>
            </div>

            <div id="ch2-s4-1-2" className="mb-12">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.1.2 Role de la mobilite des capitaux</h4>
                <Callout type="exam" title="Condition de bascule">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Si BP plus pentue que LM (k faible) : depreciation et amplification de la relance.</li>
                        <li>Si LM plus pentue que BP (k eleve) : appreciation et frein de la relance.</li>
                        <li>Seuil : <Math>{'k = m l_2 / l_1'}</Math>.</li>
                    </ul>
                </Callout>
            </div>

            <div id="ch2-s4-1-3" className="mb-12">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.1.3 Politique monetaire (L^s up) en changes flottants</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    LM se deplace a droite, i baisse, le change se deprecie, NX augmente : effet amplifie.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 17 - Politique monetaire en changes flottants
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "LM shifts right after monetary expansion, i falls below BP, depreciation boosts NX and shifts IS right; final equilibrium at higher Y."
                    </p>
                </div>
                <Callout type="remember" title="A retenir">
                    <p>En flottant : la politique monetaire est tres efficace ; la politique budgetaire peut etre freinee par le change.</p>
                </Callout>
            </div>
        </section>
    );
}

