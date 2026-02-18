import { Section, Callout, FormulaBox } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 3 — Le Taux de Change (3.11 -> 3.19) */
export function Section3b() {
    return (
        <>
            <section
                id="section-3b"
                data-section-title="3.11 Changement de parité"
                className="mb-16"
            >
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.11 Le changement de parite
                </h3>
                <Callout type="warning" title="Point de vocabulaire">
                    <p className="mb-2">
                        En changes flottants : appreciation / depreciation.
                        En changes fixes : reevaluation / devaluation.
                    </p>
                </Callout>

                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    3.11.1 La devaluation
                </h4>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Competitivite-prix : nos exportations deviennent moins cheres en devises etrangeres.</li>
                    <li>Inflation importee : l'energie et les intrants importes coutent plus cher.</li>
                </ul>

                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    3.11.2 La reevaluation
                </h4>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Desinflation importee : les biens importes deviennent moins chers.</li>
                    <li>Perte de competitivite-prix : nos exportations deviennent plus cheres.</li>
                </ul>
            </section>

            <section id="s3-12" data-section-title="3.12 Asymetrie d'intervention" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.12 L'asymetrie de l'intervention dans un systeme de change fixe
                </h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Defendre la monnaie n'a pas le meme cout selon que la pression est a la hausse ou a la baisse.
                </p>

                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    3.12.1 Contre une pression a la hausse
                </h4>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Action : la banque centrale vend sa propre monnaie.</li>
                    <li>Munitions : quasi illimitees (creation monetaire).</li>
                </ul>

                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    3.12.2 Contre une pression a la baisse
                </h4>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Action : la banque centrale rachete sa monnaie.</li>
                    <li>Munitions : limitees (reserves de change finies).</li>
                </ul>

                <Callout type="key" title="Conclusion">
                    <p>Un regime fixe devient intenable quand les reserves de change s'epuisent.</p>
                </Callout>
            </section>

            <section id="s3-13" data-section-title="3.13 Illustration Mercredi Noir" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.13 Illustration historique : le Mercredi Noir (1992)
                </h3>
                <Section type="exemple" title="Soros vs Banque d'Angleterre">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>La livre est jugee surevaluee dans le SME.</li>
                        <li>Soros vend massivement des livres empruntees.</li>
                        <li>La Banque d'Angleterre defend la parite en brulant ses reserves.</li>
                        <li>Le Royaume-Uni quitte le SME, la livre chute fortement.</li>
                    </ol>
                </Section>
            </section>

            <section id="s3-14" data-section-title="3.14 Mecanique du gain de Soros" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.14 La mecanique du gain de Soros
                </h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Il vend d'abord des livres a un taux eleve, puis les rachete apres devaluation a un taux plus faible pour rembourser son emprunt.
                </p>
                <FormulaBox highlight>{`\\text{Gain} = \\text{Prix de vente} - \\text{Prix de rachat}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'ordre de grandeur du gain net cite dans le cours est proche de 1 milliard de dollars apres couts.
                </p>
            </section>

            <section id="s3-15" data-section-title="3.15 Synthese ajustement de demande de monnaie" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.15 Synthese : quel ajustement a une hausse de la demande de monnaie nationale ?
                </h3>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Regime</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Ajustement</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Role de la BC</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr>
                                    <td className="px-4 py-2.5 font-medium">Flottant</td>
                                    <td className="px-4 py-2.5">Par le prix : appreciation du change</td>
                                    <td className="px-4 py-2.5">Pas d'intervention systematique</td>
                                </tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <td className="px-4 py-2.5 font-medium">Fixe</td>
                                    <td className="px-4 py-2.5">Par les quantites : parite maintenue</td>
                                    <td className="px-4 py-2.5">Intervient et accumule/perd des reserves</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="s3-16" data-section-title="3.16 Changes fixes ou flexibles" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.16 Changes fixes ou flexibles ?
                </h3>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Critere</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Changes flottants</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Changes fixes</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5 font-medium">Atout principal</td><td className="px-4 py-2.5">Autonomie monetaire</td><td className="px-4 py-2.5">Stabilite du change</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Limite principale</td><td className="px-4 py-2.5">Volatilite</td><td className="px-4 py-2.5">Perte d'autonomie</td></tr>
                                <tr><td className="px-4 py-2.5 font-medium">Risque majeur</td><td className="px-4 py-2.5">Surréactions de marche</td><td className="px-4 py-2.5">Attaques speculatives</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Callout type="insight" title="Verdict theorique">
                    <p>On arbitre entre stabilite du change et independance monetaire.</p>
                </Callout>
            </section>

            <section id="s3-17" data-section-title="3.17 Triangle de Mundell" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.17 Le Triangle d'incompatibilite (Mundell)
                </h3>
                <Section type="key" title="Incompatibilite des 3 objectifs">
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>Autonomie monetaire</li>
                        <li>Libre circulation des capitaux</li>
                        <li>Stabilite du change</li>
                    </ol>
                    <p className="mt-2">Un pays ne peut en atteindre que deux simultanement.</p>
                </Section>
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Graphique a generer
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : "Academic impossible trinity triangle (Mundell). Three vertices: fixed exchange rate, monetary policy autonomy, free capital mobility. Show the three feasible policy corners with concrete examples: USA/UK (float + free capital), CFA/Hong Kong (fixed + free capital), China (fixed + monetary autonomy with capital controls). Clean white background, clear labels, no decorative effects."
                    </p>
                </div>
            </section>

            <section id="s3-18" data-section-title="3.18 Reperes historiques" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.18 Reperes historiques : l'evolution du systeme monetaire
                </h3>
                <div className="space-y-3 mb-4">
                    {[
                        { year: '1870-1914', title: 'Etalon-or', desc: 'Parites fixes en or.' },
                        { year: '1918-1939', title: 'Entre-deux-guerres', desc: 'Instabilite et devaluations competitives.' },
                        { year: '1944-1971', title: 'Bretton Woods', desc: 'Systeme fixe centre sur le dollar.' },
                        { year: '1976', title: 'Jamaique', desc: 'Officialisation des changes flottants.' },
                        { year: '1979-1999', title: 'SME puis Euro', desc: 'Reponse europeenne a la volatilite.' },
                    ].map(item => (
                        <div key={item.year} className="flex gap-4 items-start">
                            <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>{item.year}</span>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.title}</p>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="s3-19" data-section-title="3.19 Change fixe en 2026" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    3.19 En 2026 : le change fixe est-il de l'histoire ancienne ?
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    Non. Les regimes fixes et intermediaires restent tres presents (Danemark, Hong Kong, Arabie Saoudite, regimes de type peg ou currency board).
                </p>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Type</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Exemples</th>
                                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Ancre</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5 font-medium">Currency board</td><td className="px-4 py-2.5">Hong Kong, Bulgarie</td><td className="px-4 py-2.5">USD / EUR</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Peg conventionnel</td><td className="px-4 py-2.5">Danemark, Arabie Saoudite, zone CFA</td><td className="px-4 py-2.5">EUR / USD</td></tr>
                                <tr><td className="px-4 py-2.5 font-medium">Intermediaire</td><td className="px-4 py-2.5">Chine (flottement gere)</td><td className="px-4 py-2.5">Panier de devises</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Flottement libre</td><td className="px-4 py-2.5">USD, EUR, JPY, GBP</td><td className="px-4 py-2.5">Marche</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
