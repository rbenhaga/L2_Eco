import { Callout, FormulaBox } from '../../../../../components';

/** Conclusion du Chapitre 2 */
export function Ch2Conclusion() {
    return (
        <section id="ch2-conclusion" data-section-title="Conclusion du chapitre 2" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Conclusion du Chapitre 2
            </h2>

            <Callout type="remember" title="Les 5 messages-clés du chapitre">
                <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>La courbe en J :</strong> Une dépréciation dégrade d'abord le solde (effet prix), puis l'améliore (effet volume) — si la condition de Marshall-Lerner est vérifiée (<em>|ηₓ| + |ηₘ| &gt; 1</em>).</li>
                    <li><strong>La PTINC :</strong> Le taux de change reflète le différentiel de taux d'intérêt et les anticipations. Un pays à taux élevé voit sa monnaie s'apprécier.</li>
                    <li><strong>La courbe BP :</strong> Sa pente (m/k) résume le conflit commerce vs finance. Plus k est grand, plus BP est plate.</li>
                    <li><strong>Le régime de change détermine l'outil efficace :</strong> Changes flottants → monétaire efficace. Changes fixes → budgétaire efficace (avec k→∞).</li>
                    <li><strong>Le triangle de Mundell :</strong> Un pays ne peut avoir simultanément la libre circulation des capitaux, un taux fixe et l'autonomie monétaire.</li>
                </ol>
            </Callout>

            <h3 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Les formules essentielles à retenir
            </h3>
            <div className="space-y-4">
                <FormulaBox label="1. Exportations nettes" highlight>{`NX = X - \\frac{M}{\\varepsilon}`}</FormulaBox>
                <FormulaBox label="2. Marshall-Lerner">{`|\\eta_x| + |\\eta_m| > 1`}</FormulaBox>
                <FormulaBox label="3. PTIC">{`1 + i = \\frac{E_t}{F_t} \\times (1 + i^*)`}</FormulaBox>
                <FormulaBox label="4. PTINC">{`1 + i = \\frac{E_t}{E^e_{t+1}} \\times (1 + i^*)`}</FormulaBox>
                <FormulaBox label="5. Courbe BP">{`i = \\frac{m}{k} \\times Y + \\text{const.}`}</FormulaBox>
            </div>
        </section>
    );
}
