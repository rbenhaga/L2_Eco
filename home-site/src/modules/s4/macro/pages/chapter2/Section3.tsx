import { Section, Callout, Math, FormulaBox } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 3 - Le modele Mundell-Fleming (IS-LM-BP) */
export function Ch2Section3() {
    return (
        <section id="ch2-section-3" data-section-title="3. Le modele Mundell-Fleming (IS-LM-BP)" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 3 - Le modele Mundell-Fleming (IS-LM-BP)
            </h2>

            <div id="ch2-s3-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.1 Rappel : le modele IS-LM en economie fermee</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Le modele IS-LM determine l'equilibre simultane sur le marche des biens et le marche monetaire a court terme.
                </p>

                <h4 className="text-lg font-medium mb-2 mt-6" style={{ color: 'var(--color-text-primary)' }}>La courbe IS</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    IS est decroissante : une baisse de i stimule I puis Y par multiplicateur.
                </p>
                <FormulaBox label="Equation de IS (eco. fermee)">{`i = \\frac{1}{d_2}(\\bar{C} - cT + \\bar{I} + \\bar{G}) - \\frac{1 - c - d_1}{d_2}Y`}</FormulaBox>

                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 7 - La courbe IS dans le repere (Y, i)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "IS curve in (Y,i): downward sloping line, axes labeled Y and i, one equilibrium point. Clean macroeconomics textbook style."
                    </p>
                </div>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 8 - Deplacements de IS (politique budgetaire)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "IS0 and IS1 in (Y,i), IS shifts right after fiscal expansion (G up), annotate initial and new equilibrium with unchanged LM as reference."
                    </p>
                </div>

                <h4 className="text-lg font-medium mb-2 mt-8" style={{ color: 'var(--color-text-primary)' }}>La courbe LM</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    LM est croissante : quand Y augmente, la demande de monnaie augmente et i doit monter pour equilibrer.
                </p>
                <FormulaBox label="Equation de LM">{`i = \\frac{l_1}{l_2}Y - \\frac{1}{l_2}\\bar{L}`}</FormulaBox>

                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 9 - La courbe LM dans le repere (Y, i)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "LM curve in (Y,i): upward sloping line, monetary equilibrium representation, axes labeled Y and i."
                    </p>
                </div>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 10 - Deplacements de LM (politique monetaire)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "LM0 and LM1 in (Y,i), LM shifts right/down after expansionary monetary policy (L^s up), IS fixed."
                    </p>
                </div>

                <h4 className="text-lg font-medium mb-2 mt-8" style={{ color: 'var(--color-text-primary)' }}>L'equilibre IS-LM</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'intersection IS-LM donne l'equilibre conjoint des biens et de la monnaie.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 11 - L'equilibre IS-LM
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "One IS (downward) and one LM (upward) crossing in (Y,i), highlight equilibrium Omega(Y*, i*)."
                    </p>
                </div>
            </div>

            <div id="ch2-s3-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.2 Vers l'economie ouverte : la contrainte exterieure</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En economie ouverte, l'analyse doit integrer les importations et les flux de capitaux, donc la balance des paiements (BP).
                </p>
                <Callout type="warning" title="Point de methode">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Le compte financier SF suit la convention BPM6.</li>
                        <li>A court terme dans le modele, on prend souvent <Math>{'P=P^*=1'}</Math> donc <Math>{'\\varepsilon=E'}</Math>.</li>
                    </ul>
                </Callout>
            </div>

            <div id="ch2-s3-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.3 Construction de la courbe BP</h3>
                <FormulaBox highlight>{`BP = NX - SF_{priv}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    En ecriture lineaire :
                </p>
                <FormulaBox>{`NX = \\bar{X} - mY + v\\varepsilon, \\quad SF_{priv}=\\bar{SF} - ki`}</FormulaBox>
                <FormulaBox label="Droite BP" highlight>{`i = \\frac{m}{k}Y + \\frac{\\bar{SF} - \\bar{X} - v\\varepsilon}{k}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    La pente de BP est <Math>{'m/k'}</Math> : plus k est grand, plus BP est plate.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 12 - La courbe BP et les zones de desequilibre
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "BP curve in (Y,i) with areas labeled BP&gt;0 above and BP&lt;0 below, include one point on BP where external balance holds."
                    </p>
                </div>
            </div>

            <div id="ch2-s3-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.4 Influence de la mobilite des capitaux (k)</h3>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 13 - Influence du parametre k sur BP
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Family of BP lines in (Y,i): near-vertical for k→0, flatter for larger k, horizontal for k→infinity."
                    </p>
                </div>
            </div>

            <div id="ch2-s3-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.5 Impact de l'ouverture sur IS et LM</h3>
                <Section type="key" title="Resultat central">
                    <p className="mb-2"><strong>Change flottant :</strong> BP se reequilibre surtout par E, donc via IS.</p>
                    <p><strong>Change fixe :</strong> BP se reequilibre via les reserves et L^s, donc via LM.</p>
                </Section>
            </div>

            <div id="ch2-s3-6" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.6 Equilibre global IS-LM-BP</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'equilibre macro complet exige la satisfaction simultanee de IS, LM et BP.
                </p>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 14 - L'equilibre global IS-LM-BP
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Three curves IS (down), LM (up), BP (up or flat depending k) crossing at Omega in (Y,i)."
                    </p>
                </div>
            </div>

            <div id="ch2-s3-7" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.7 Resolution algebrique du modele</h3>
                <Section type="formule" title="Systeme a resoudre">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>(IS) : <Math>{'Y = C + I + G + NX'}</Math></li>
                        <li>(LM) : <Math>{'L^s = L^d'}</Math></li>
                        <li>(BP) : <Math>{'NX - SF_{priv} = 0'}</Math></li>
                    </ul>
                    <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--color-bg-overlay)' }}>
                        <p className="mb-1"><strong>Flottant :</strong> Y, i, E endogenes ; <Math>{'L^s'}</Math> exogene.</p>
                        <p><strong>Fixe :</strong> Y, i, <Math>{'L^s'}</Math> endogenes ; parite <Math>{'\\bar{\\varepsilon}'}</Math> exogene.</p>
                    </div>
                </Section>
            </div>
        </section>
    );
}
