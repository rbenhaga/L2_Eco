import { Section, Callout, Math, FormulaBox } from '../../../../../components';

export function Section4() {
    return (
        <section id="section-4" data-section-title="4. Parite de Pouvoir d'Achat (PPA)" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 4 - La Parite de Pouvoir d'Achat (PPA)
            </h2>

            <div id="s4-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.1 Au-dela du nominal : le taux de change reel</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Le taux nominal ne suffit pas pour juger la competitivite. Il faut tenir compte des niveaux de prix internes et etrangers.
                </p>
                <FormulaBox label="Taux de change reel" highlight>{`\\varepsilon_{\\$/\\euro} = E_{\\$/\\euro} \\times \\frac{P}{P^*}`}</FormulaBox>
            </div>

            <div id="s4-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.2 Interpretation : lien avec la competitivite-prix</h3>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Situation</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Interpretation</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5 font-medium"><Math>{'\\varepsilon < 1'}</Math></td><td className="px-4 py-2.5">Prix domestiques relativement faibles : competitivite-prix forte</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium"><Math>{'\\varepsilon = 1'}</Math></td><td className="px-4 py-2.5">Parite de pouvoir d'achat</td></tr>
                                <tr><td className="px-4 py-2.5 font-medium"><Math>{'\\varepsilon > 1'}</Math></td><td className="px-4 py-2.5">Prix domestiques relativement eleves : competitivite-prix faible</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="s4-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.3 Application : competitivite "pure" (hors taxes)</h3>
                <Section type="exemple" title="Exemple vin France / USA">
                    <p className="mb-2">Donnees : <Math>{'P=20\\,\\euro'}</Math>, <Math>{'P^*=30\\,\\$'}</Math>, <Math>{'E=1{,}17\\,$/\\euro'}</Math>.</p>
                    <FormulaBox>{`\\varepsilon = \\frac{1{,}17 \\times 20}{30} \\approx 0{,}78`}</FormulaBox>
                    <p>Le produit francais est moins cher une fois converti : avantage de competitivite-prix.</p>
                </Section>
            </div>

            <div id="s4-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.4 Diagnostic : deux causes d'une perte de competitivite-prix</h3>
                <ul className="list-disc pl-6 space-y-2 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Cause monetaire : appreciation du taux nominal <Math>{'E'}</Math>.</li>
                    <li>Cause structurelle : inflation domestique superieure ou baisse relative des prix etrangers.</li>
                </ul>
                <Callout type="exam" title="Point cle">
                    <p>Meme avec change fixe, un differentiel d'inflation degrade le taux reel et donc la competitivite.</p>
                </Callout>
            </div>

            <div id="s4-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.5 Fondement theorique : la loi du prix unique</h3>
                <Section type="definition" title="LPU">
                    <p>Sans friction (transport, taxes, barrieres), un meme bien doit avoir le meme prix en monnaie commune.</p>
                    <FormulaBox highlight>{`E_{\\$/\\euro} \\times P = P^*`}</FormulaBox>
                </Section>
            </div>

            <div id="s4-6" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.6 Indice Big Mac : la PPA a l'epreuve des faits</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    The Economist utilise le Big Mac comme proxy de panier de biens pour rendre la PPA observable.
                </p>
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>4.6.1 Calcul du taux PPA</h4>
                <FormulaBox>{`E^{PPA} = \\frac{P^*_{BigMac}}{P_{BigMac}}`}</FormulaBox>
                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>4.6.2 Verdict marche vs realite</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'ecart entre taux de marche et taux PPA suggere une sur/sous-evaluation de la monnaie.
                </p>
            </div>

            <div id="s4-7" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.7 Agence de voyages : ou partir grace a la PPA ?</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Pour un resident de la zone euro, les destinations a monnaie sous-evaluee offrent un pouvoir d'achat relatif plus eleve.
                </p>
            </div>

            <div id="s4-8" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.8 Puzzle empirique : richesse et niveau des prix</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Les pays a faible revenu ont en general un niveau de prix plus bas que ce que predirait une PPA stricte.
                </p>
            </div>

            <div id="s4-9" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.9 L'explication : effet Balassa-Samuelson</h3>
                <Section type="key" title="Mecanisme">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Productivite forte dans le secteur expose des pays riches.</li>
                        <li>Salaires tires vers le haut dans toute l'economie.</li>
                        <li>Secteurs abrites plus chers a productivite comparable.</li>
                        <li>Niveau general des prix plus eleve dans les pays riches.</li>
                    </ol>
                </Section>
            </div>

            <div id="s4-10" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.10 Consequences de Balassa-Samuelson sur le change</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Le taux nominal reflète surtout les biens echangeables. Il ignore une partie importante des services non echangeables, ce qui cree des ecarts persistants a la PPA.
                </p>
                <FormulaBox>{`\\varepsilon = E \\times \\frac{P}{P^*}`}</FormulaBox>
            </div>

            <div id="s4-11" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.11 Limites de l'indice Big Mac</h3>
                <ul className="list-disc pl-6 space-y-2 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Poids des couts non echangeables (loyers, salaires locaux).</li>
                    <li>Fiscalite, reglementation et barrieres commerciales.</li>
                    <li>Strategies de marque et positionnement prix local.</li>
                </ul>
            </div>

            <div id="s4-12" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.12 Biais de mesure induit par le taux de change nominal</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Le PIB nominal converti au taux de marche peut sous-estimer le poids reel des economies en developpement.
                </p>
                <Callout type="important" title="Correction par la PPA">
                    <p>La mesure en PPA neutralise une partie de ce biais et donne une comparaison plus proche des volumes reels produits et consommes.</p>
                </Callout>
            </div>
        </section>
    );
}

