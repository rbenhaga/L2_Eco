import { Section, Callout, Math, FormulaBox } from '../../../../../components';

export function Section1() {
    return (
        <section
            id="section-1"
            data-section-title="1. Équilibre emplois-ressources"
            className="mb-16"
        >
            <h2
                className="text-2xl sm:text-3xl font-bold mb-8"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}
            >
                Section 1 — Équilibre emplois-ressources en économie ouverte
            </h2>

            {/* 1.1 */}
            <div id="s1-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    1.1 Rappel : La contrainte de l'économie fermée
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    En économie fermée (autarcie), l'identité comptable fondamentale repose sur l'égalité entre les ressources et les emplois.
                </p>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.1.1 L'identité comptable de départ
                </h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En autarcie, tout ce qui est produit est soit consommé, soit investi, soit dépensé par l'État :
                </p>
                <FormulaBox label="Identité comptable" highlight>{`Y \\equiv C + G + I`}</FormulaBox>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><Math>{'Y'}</Math> = Production nationale (PIB)</li>
                    <li><Math>{'C'}</Math> = Consommation privée</li>
                    <li><Math>{'G'}</Math> = Dépenses publiques</li>
                    <li><Math>{'I'}</Math> = Investissement (FBCF + variation de stocks)</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.1.2 La contrainte financière
                </h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'Épargne Nationale (<Math>{'S_{nat}'}</Math>) est ce qui reste du revenu national une fois les dépenses de consommation (privées et publiques) effectuées :
                </p>
                <FormulaBox>{`S_{nat} = Y - C - G`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En économie fermée, cette épargne doit nécessairement financer l'investissement :
                </p>
                <FormulaBox highlight>{`S_{nat} \\equiv I`}</FormulaBox>

                <Callout type="insight" title="Intuition économique">
                    <p>Le financement est un jeu à somme nulle. Pour construire une usine (<Math>{'I\\uparrow'}</Math>), la société doit nécessairement renoncer à une consommation immédiate (<Math>{'C\\downarrow'}</Math>) pour dégager de l'épargne. Les ressources disponibles étant limitées, tout investissement se fait au détriment de la consommation présente.</p>
                </Callout>
            </div>

            {/* 1.2 */}
            <div id="s1-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    1.2 L'ouverture des économies
                </h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Dans la réalité, les économies interagissent sur trois marchés principaux :
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Le marché des biens et services</strong> : Exportations (X) et Importations (M)</li>
                    <li><strong>Le marché des capitaux</strong> : Actifs financiers, obligations, actions</li>
                    <li><strong>Le marché du travail</strong> : Migrations de main-d'œuvre</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.2.1 Nouvelle identité ressources-emplois
                </h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En économie ouverte, l'identité comptable devient :
                </p>
                <FormulaBox label="Éco. ouverte" highlight>{`Y \\equiv C + I + G + (X - M)`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>Ou encore :</p>
                <FormulaBox>{`Y \\equiv A + NX`}</FormulaBox>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><Math>{'A = C + I + G'}</Math> = Demande Intérieure (Absorption)</li>
                    <li><Math>{'NX = X - M'}</Math> = Solde Extérieur (Net Exports)</li>
                </ul>

                <Callout type="warning" title="Précision comptable">
                    <p>L'investissement <Math>{'I'}</Math> inclut la variation de stocks (<Math>{'I = FBCF + \\Delta Stocks'}</Math>). Une production non vendue est considérée comme investie en stocks, ce qui garantit l'égalité comptable.</p>
                </Callout>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.2.2 L'équation fondamentale du solde extérieur
                </h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    On peut réécrire l'égalité pour isoler le Solde Extérieur :
                </p>
                <FormulaBox label="Fondamentale" highlight>{`NX \\equiv Y - A`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Cette équation révèle trois situations possibles :
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Déficit (<Math>{'NX < 0'}</Math>)</strong> : <Math>{'A > Y'}</Math> → On consomme plus qu'on ne produit</li>
                    <li><strong>Excédent (<Math>{'NX > 0'}</Math>)</strong> : <Math>{'A < Y'}</Math> → On produit plus qu'on ne consomme</li>
                    <li><strong>Équilibre (<Math>{'NX = 0'}</Math>)</strong> : <Math>{'A = Y'}</Math> → Situation analogue à l'autarcie</li>
                </ul>
            </div>

            {/* 1.3 */}
            <div id="s1-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    1.3 Point de vigilance : Solde Commercial vs Solde Extérieur
                </h3>

                <Callout type="warning" title="Ne confondez pas !">
                    <p>Beaucoup d'étudiants font cette erreur. Soyez précis :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Solde Commercial</strong> = Uniquement les Marchandises (Biens)</li>
                        <li><strong>Solde Extérieur (NX)</strong> = Marchandises + Services</li>
                    </ul>
                </Callout>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.3.1 Le cas de la France (2024)
                </h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Selon l'INSEE, les données pour 2024 sont les suivantes :
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Balance Commerciale</strong> : ≈ −60 Mds € (Lourd Déficit)</li>
                    <li><strong>Balance des Services</strong> : ≈ +56,6 Mds € (Excédent record)</li>
                    <li><strong>Solde Extérieur</strong> : ≈ −3,4 Mds € (Le déficit est bien moindre !)</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Ce cas illustre parfaitement l'importance de la distinction : la France affiche un lourd déficit commercial sur les marchandises, mais son excédent dans les services (tourisme, luxe, transports) compense en grande partie ce déficit.
                </p>
            </div>

            {/* 1.4 */}
            <div id="s1-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    1.4 Les déséquilibres mondiaux
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    Le tableau suivant présente les principaux excédents et déficits mondiaux (estimations 2024, en milliards de dollars, source : Banque Mondiale) :
                </p>

                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Pays (Excédent)</th>
                                    <th className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>Mds $</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Pays (Déficit)</th>
                                    <th className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>Mds $</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5">1. Chine</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>+533</td><td className="px-4 py-2.5">1. États-Unis</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>−906</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">2. Irlande*</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>+254</td><td className="px-4 py-2.5">2. Inde</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>−91</td></tr>
                                <tr><td className="px-4 py-2.5">3. Singapour</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>+192</td><td className="px-4 py-2.5">3. Philippines</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>−66</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">4. Allemagne</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>+177</td><td className="px-4 py-2.5">4. Ukraine</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>−36</td></tr>
                                <tr><td className="px-4 py-2.5">5. Pays-Bas</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>+134</td><td className="px-4 py-2.5">5. Japon</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>−35</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                    1.4.1 Explications des principaux déséquilibres
                </h4>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>États-Unis</strong> : Le déficit massif s'explique par des taux d'épargne bas, une forte dépendance énergétique et le statut du dollar comme monnaie de réserve mondiale.</li>
                    <li><strong>Chine / Allemagne</strong> : Ces pays présentent des modèles économiques tirés par l'export, avec une forte compétitivité industrielle.</li>
                    <li><strong>*Le cas irlandais</strong> : Un « mirage statistique » dû à la domiciliation des GAFAM (voir encadré « Leprechaun Economics »).</li>
                </ul>

                <Section type="exemple" title="Cas d'étude : Leprechaun Economics">
                    <p className="mb-2">
                        L'Irlande présente un solde extérieur de +254 Mds € en raison de la domiciliation des GAFAM (Google, Apple, Meta) et des grandes entreprises pharmaceutiques. Ces entreprises exportent des services informatiques et des brevets facturés au monde entier depuis l'Irlande.
                    </p>
                    <p className="mb-2">
                        Cependant, le <strong>Solde des Revenus Primaires</strong> est de <strong>−230 Mds €</strong>. Pourquoi ? Car ces entreprises appartiennent à des actionnaires américains, et les profits repartent immédiatement en dividendes vers les USA.
                    </p>
                    <FormulaBox>{`\\text{Solde Courant réel} : +254 - 230 = +24 \\text{ Mds €}`}</FormulaBox>
                    <Callout type="important" title="Leçon">
                        <p>Ne jamais juger la richesse d'un pays ouvert à son seul PIB ou ses exportations.</p>
                    </Callout>
                </Section>
            </div>
        </section>
    );
}
