import { Section, Math } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 4b - Changes fixes, triangle de Mundell, policy mix */
export function Ch2Section4b() {
    return (
        <>
            <div id="ch2-s4-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.2 Regime de changes fixes</h3>
                <Section type="key" title="Proprietes du change fixe">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Parite cible defendue par la banque centrale.</li>
                        <li><Math>{'L^s'}</Math> devient endogene pour tenir la parite.</li>
                        <li>LM est la variable d'ajustement.</li>
                    </ul>
                </Section>
            </div>

            <div id="ch2-s4-2-1" className="mb-12">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.2.1 Relance budgetaire en fixe avec k vers infini</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    G augmente, i depasse i*, pression a l'appreciation, la BC intervient et augmente L^s : LM accompagne la relance.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 18 - Relance budgetaire en changes fixes (k vers infini)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Fixed exchange with high k: IS shifts right, pressure to appreciate, central bank intervention raises reserves and money supply, LM shifts right to final equilibrium."
                    </p>
                </div>
            </div>

            <div id="ch2-s4-2-2" className="mb-12">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.2.2 Politique monetaire en fixe : inefficace</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Une expansion monetaire initiale provoque un deficit externe et force la BC a annuler son action pour conserver la parite.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 19 - Politique monetaire en changes fixes : inefficacite totale
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Fixed exchange: LM shifts right after monetary expansion, i falls below i*, reserve loss forces LM back to initial position, output unchanged."
                    </p>
                </div>
            </div>

            <div id="ch2-s4-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.3 Triangle d'incompatibilite de Mundell</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    On ne peut pas obtenir en meme temps autonomie monetaire, change fixe et libre circulation des capitaux.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 20 - Le triangle d'incompatibilite de Mundell
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Impossible trinity triangle with three vertices: fixed exchange, monetary autonomy, free capital mobility. Show three feasible policy corners with examples."
                    </p>
                </div>
            </div>

            <div id="ch2-s4-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.4 Tableau recapitulatif (k vers infini)</h3>
                <div className="my-6 rounded-xl border-2 overflow-hidden" style={{ borderColor: 'var(--color-border-default)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Regime</th>
                                    <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--color-text-primary)' }}>Budget (G up)</th>
                                    <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--color-text-primary)' }}>Monetaire (L^s up)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Flottants</td>
                                    <td className="px-4 py-3 text-center font-bold" style={{ background: 'var(--callout-warning-bg)', color: 'var(--callout-warning-text)' }}>NULLE</td>
                                    <td className="px-4 py-3 text-center font-bold" style={{ background: 'var(--callout-key-bg)', color: 'var(--callout-key-text)' }}>MAXIMALE</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Fixes</td>
                                    <td className="px-4 py-3 text-center font-bold" style={{ background: 'var(--callout-key-bg)', color: 'var(--callout-key-text)' }}>MAXIMALE</td>
                                    <td className="px-4 py-3 text-center font-bold" style={{ background: 'var(--callout-warning-bg)', color: 'var(--callout-warning-text)' }}>NULLE</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="ch2-s4-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.5 Etude de cas : policy mix americain (2022-2024)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Relance budgetaire et resserrement monetaire ont pousse i a la hausse et soutenu un dollar fort, avec croissance resiliente.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 21 - Policy mix americain 2022-2024
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "IS-LM-BP policy-mix diagram: IS right shift (fiscal), LM left shift (monetary tightening), resulting high i, strong currency and resilient output."
                    </p>
                </div>
            </div>
        </>
    );
}

