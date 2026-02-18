import { Callout, FormulaBox } from '../../../../../components';

export function Conclusion() {
    return (
        <section
            id="conclusion"
            data-section-title="Conclusion"
            className="mb-16"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Conclusion du Chapitre 1
            </h2>

            <Callout type="remember" title="Les 4 messages-clés du chapitre">
                <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>L'ouverture change TOUT :</strong> Le financement n'est plus un jeu à somme nulle interne. Un pays peut consommer plus qu'il ne produit en empruntant à l'étranger (ou inversement).</li>
                    <li><strong>La Balance des Paiements est un miroir :</strong> Chaque flux réel (achat d'une BMW) est reflété par un flux financier (sortie de monnaie). SC + KA − SF + EO ≡ 0.</li>
                    <li><strong>Le taux de change est un prix crucial :</strong> Il détermine qui gagne et qui perd dans les échanges mondiaux. Le choix Fixed/Float a des conséquences majeures (Triangle de Mundell).</li>
                    <li><strong>La PPA est un repère imparfait :</strong> La Loi du Prix Unique est un idéal. Le Big Mac, l'effet Balassa-Samuelson et les barrières au commerce expliquent les écarts persistants.</li>
                </ol>
            </Callout>

            <h3 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Les 5 formules essentielles à retenir
            </h3>
            <div className="space-y-3">
                <FormulaBox label="1. Identité ouverte" highlight>{`Y \\equiv C + I + G + (X - M)`}</FormulaBox>
                <FormulaBox label="2. Solde extérieur">{`NX \\equiv Y - A`}</FormulaBox>
                <FormulaBox label="3. Identité BdP" highlight>{`SC + KA - SF + EO \\equiv 0`}</FormulaBox>
                <FormulaBox label="4. TCR">{`\\varepsilon = E_{\\$/\\text{€}} \\times \\frac{P_{FR}}{P_{US}}`}</FormulaBox>
                <FormulaBox label="5. PPA" highlight>{`E^{PPA}_{\\$/\\text{€}} = \\frac{P^{US}}{P^{FR}}`}</FormulaBox>
            </div>
        </section>
    );
}
