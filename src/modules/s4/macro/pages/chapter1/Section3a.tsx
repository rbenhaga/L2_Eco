import { Section, Callout, Math, FormulaBox } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 3 — Le Taux de Change (3.1 → 3.10) */
export function Section3a() {
    return (
        <section
            id="section-3"
            data-section-title="3. Le Taux de Change"
            className="mb-16"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 3 — Le Taux de Change
            </h2>

            {/* 3.1 */}
            <div id="s3-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.1 Le problème monétaire de l'économie ouverte</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Le constat : La double transaction.</strong> Les flux de la Balance des Paiements (Biens, Services, Capitaux) se heurtent à une <strong>frontière monétaire</strong>.
                </p>
                <Callout type="example" title="Exemple concret">
                    <p>Pour acheter un bien américain, je ne peux pas payer en Euros.<br />
                        <strong>Conséquence :</strong> Je dois d'abord vendre mes Euros pour acheter des Dollars.</p>
                </Callout>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>Cette incompatibilité monétaire crée une tension :</p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>L'Euro n'a pas cours légal aux USA</li>
                    <li>⇒ Nécessité de Vendre des € pour Acheter des $</li>
                    <li>⇒ Cette confrontation Offre/Demande engendre une tension sur la valeur relative des monnaies</li>
                </ul>
                <Section type="definition" title="Le taux de change">
                    <p>C'est le <strong>prix</strong> qui résout cette tension. C'est la valeur relative d'une monnaie par rapport à une autre, déterminée par la rareté créée par ces échanges.</p>
                </Section>
            </div>

            {/* 3.2 */}
            <div id="s3-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.2 Comment lire le taux de change ?</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>Il existe deux conventions de marché. Exemple au 05/01/2026 :</p>
                <h4 className="text-lg font-medium mb-3 mt-4" style={{ color: 'var(--color-text-primary)' }}>3.2.1 La cotation au certain (Zone Euro, UK)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>On fixe 1 unité nationale :</p>
                <FormulaBox highlight>{`1\\,\\text{€} = 1{,}17\\,\\$`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>→ Avec 1 euro (certain), j'obtiens 1,17 dollars.</p>

                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>3.2.2 La cotation à l'incertain (USA, Japon)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>On fixe 1 unité étrangère :</p>
                <FormulaBox>{`1\\,\\$ = 0{,}86\\,\\text{€}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>→ Il me faut 0,86 euros (incertain) pour avoir 1 dollar.</p>
                <Callout type="insight" title="Relation mathématique">
                    <p><Math>{'\\text{Cotation incertain} = \\dfrac{1}{\\text{Cotation certain}}'}</Math></p>
                </Callout>
            </div>

            {/* 3.3 */}
            <div id="s3-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.3 Notation technique : Comment lire <Math>{'E_{A/B}'}</Math> ?</h3>
                <FormulaBox highlight>{`E_{\\$/\\text{€}} = 1{,}17`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Décomposition :</strong></p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Le dénominateur (€)</strong> : C'est la base fixe (= 1)</li>
                    <li><strong>Le numérateur ($)</strong> : C'est le prix variable</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Lecture :</strong> « 1 unité de dénominateur (€) vaut 1,17 unités de numérateur ($) »
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Pour un Européen :</strong> Notre monnaie (€) est au dénominateur. On exprime ce qu'on obtient pour 1 €. → C'est une cotation au <strong>CERTAIN</strong>.</li>
                    <li><strong>Pour un Américain :</strong> Leur monnaie ($) est au numérateur. Ils expriment combien de $ il faut pour acheter 1 €. → C'est une cotation à l'<strong>INCERTAIN</strong>.</li>
                </ul>
            </div>

            {/* 3.4 */}
            <div id="s3-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.4 Qui gagne, qui perd quand l'Euro s'apprécie ?</h3>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr style={{ background: 'var(--color-bg-overlay)' }}>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Agent (Zone Euro)</th>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Mécanisme</th>
                                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--color-text-primary)' }}>Effet</th>
                            </tr></thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5 font-medium">Exportateurs (Airbus, LVMH)</td><td className="px-4 py-2.5">Les prix français convertis en $ augmentent. Baisse des volumes.</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-warning-text)' }}>Négatif</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Consommateurs (Importations)</td><td className="px-4 py-2.5">Le pétrole et les iPhone coûtent moins d'euros.</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-key-text)' }}>Positif</td></tr>
                                <tr><td className="px-4 py-2.5 font-medium">Touristes (Voyage aux USA)</td><td className="px-4 py-2.5">Gain de pouvoir d'achat à New York.</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-key-text)' }}>Positif</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Épargnants (Actions US)</td><td className="px-4 py-2.5">La valeur des actions US diminue une fois convertie en euros.</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-warning-text)' }}>Négatif</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 3.5 */}
            <div id="s3-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.5 Les forces du marché des changes (Forex)</h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>Le <strong>Forex</strong> (Foreign Exchange Market) est le marché mondial des devises.</p>
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>3.5.1 La Demande d'Euros (<Math>{'D_e'}</Math>)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Qui achète de l'Euro ? (Flux entrants)</strong></p>
                <ul className="list-decimal pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Motif Commercial (SC + KA) :</strong> Non-résidents achetant nos Biens/Services ou transférant des revenus</li>
                    <li><strong>Motif Financier (SF hors réserves) :</strong> Non-résidents investissant chez nous (Entrées de capitaux)</li>
                </ul>
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>3.5.2 L'Offre d'Euros (<Math>{'O_e'}</Math>)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Qui vend de l'Euro ? (Flux sortants)</strong></p>
                <ul className="list-decimal pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Motif Commercial (SC + KA) :</strong> Résidents achetant des importations ou envoyant des revenus</li>
                    <li><strong>Motif Financier (SF hors réserves) :</strong> Résidents investissant à l'étranger (Sorties de capitaux)</li>
                </ul>
                <Callout type="key" title="Bilan">
                    <p>La tension sur la monnaie dépend du solde net de ces flux privés (avant intervention de la BC).</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Si Solde Global &gt; 0 : <Math>{'D_e > O_e'}</Math> → La monnaie est rare → <strong>Tension haussière</strong></li>
                        <li>Si Solde Global &lt; 0 : <Math>{'O_e > D_e'}</Math> → La monnaie est abondante → <strong>Tension baissière</strong></li>
                    </ul>
                </Callout>
            </div>

            {/* 3.6 */}
            <div id="s3-6" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.6 Choix institutionnel : Flexible ou Fixe ?</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-xl p-5 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-default)' }}>
                        <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>3.6.1 Changes flexibles (flottants)</h4>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Exemples : Euro, Dollar, Yen</p>
                        <p className="text-[15px] mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Mécanisme :</strong> L'offre et la demande fixent le prix. La BC n'intervient pas (ou peu).</p>
                        <p className="text-[15px] mb-1" style={{ color: 'var(--callout-key-text)' }}>⊕ <strong>Avantages :</strong> Autonomie — La politique monétaire est libre pour gérer l'inflation/chômage interne</p>
                        <p className="text-[15px]" style={{ color: 'var(--callout-warning-text)' }}>⊖ <strong>Inconvénients :</strong> Incertitude — Le risque de change freine les échanges internationaux</p>
                    </div>
                    <div className="rounded-xl p-5 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-default)' }}>
                        <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>3.6.2 Changes fixes (ancrage/peg)</h4>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Exemples : Franc CFA (sur Euro), Danemark</p>
                        <p className="text-[15px] mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Mécanisme :</strong> La BC garantit une parité via ses réserves de change.</p>
                        <p className="text-[15px] mb-1" style={{ color: 'var(--callout-key-text)' }}>⊕ <strong>Avantages :</strong> Stabilité — Favorise le commerce et importe la crédibilité de la monnaie d'ancrage</p>
                        <p className="text-[15px]" style={{ color: 'var(--callout-warning-text)' }}>⊖ <strong>Inconvénients :</strong> Mains liées — Perte de l'instrument monétaire (on subit les chocs)</p>
                    </div>
                </div>
                <Callout type="exam" title="Le verdict théorique">
                    <p>Il faut choisir entre <strong>stabilité du change</strong> (Fixe) et <strong>l'indépendance monétaire</strong> (Flottant).</p>
                </Callout>
            </div>

            {/* 3.7 */}
            <div id="s3-7" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.7 Le système de changes flottants (le marché libre)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}><strong>Contexte :</strong> Les Jeux Olympiques en France attirent les capitaux américains.</p>
                <ol className="list-decimal pl-6 space-y-2 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Les acteurs du marché :</strong> La <strong>Demande (<Math>{'D_e'}</Math>)</strong> : les Américains qui veulent acheter des euros. L'<strong>Offre (<Math>{'O_e'}</Math>)</strong> : les Européens qui vendent leurs euros.</li>
                    <li><strong>Le mécanisme (Choc) :</strong> Hausse de l'attractivité de la France → La demande se déplace vers la droite (<Math>{'D_0 \\to D_1'}</Math>) → Résultat : Le prix de l'euro monte → C'est une <strong>appréciation</strong>.</li>
                </ol>

                {/* PLACEHOLDER: Graphique changes flottants */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Graphique a generer
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « Graphique offre-demande de devises sur le marché des changes (Forex). Axe X : Quantité d'euros. Axe Y : Taux de change E($/€). Courbe de demande D₀ décroissante et courbe d'offre O croissante, avec un point d'équilibre initial. Puis une seconde courbe D₁ déplacée vers la droite (choc de demande), montrant un nouveau point d'équilibre plus haut. Flèche d'appréciation. Style académique épuré, couleurs bleues. »
                    </p>
                </div>
            </div>

            {/* 3.8 */}
            <div id="s3-8" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.8 L'instabilité des changes flottants : le risque de change</h3>
                <Section type="exemple" title="Cas pratique : PME française exportatrice de vin">
                    <p className="mb-2">Une PME française vend du vin aux USA avec un délai de paiement de 3 mois.</p>
                    <p className="mb-1"><strong>Le contrat (montant fixé en dollars) :</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Montant de la facture : 1 000 $</li>
                        <li>Date T₀ (signature) : 1 € = 1 $</li>
                        <li>Recette prévue : <strong>1 000 €</strong></li>
                    </ul>
                    <p className="mb-1"><strong>La surprise à T₁ (paiement) :</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Le taux change brutalement : 1 € = 1,50 $ (L'euro s'est apprécié / Le dollar a faibli)</li>
                        <li>Recette réelle convertie : <Math>{'1\\,000\\,\\$ \\div 1{,}50 = 666{,}67\\,€'}</Math></li>
                    </ul>
                </Section>
                <Callout type="warning" title="Pourquoi est-ce un problème ?">
                    <p>Ici, l'entreprise subit une <strong>perte de change massive (−33%)</strong>. Si sa marge bénéficiaire était de 20%, cette opération devient déficitaire.</p>
                </Callout>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Le risque de change :</strong> L'incertitude sur la valeur future de la monnaie peut négativement impacter le commerce international.
                </p>
            </div>

            {/* 3.9 */}
            <div id="s3-9" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.9 Le système de changes fixes</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Contexte :</strong> Reprenons l'exemple de l'organisation des JO par la France en imaginant (cas hypothétique) que nous soyons dans un régime où la Banque Centrale (BCE) s'engage à défendre une parité officielle.
                </p>
                <ol className="list-decimal pl-6 space-y-3 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>La règle du jeu (Le Peg) :</strong> La BCE fixe un prix intangible : <Math>{'\\bar{E}_{\\$/\\text{€}} = 1{,}05'}</Math> (→ 1 € = 1,05 $). Elle s'interdit de laisser le cours monter au-dessus (ou descendre en-dessous).</li>
                    <li><strong>Le choc :</strong> Même scénario : les JO attirent les capitaux américains. La demande privée d'Euros explose (<Math>{'D \\to D\\prime'}</Math>). Le marché veut aller à 1,20$. Il y a une pénurie d'Euros au cours officiel de 1,05$.</li>
                    <li><strong>L'intervention de la BC :</strong> La BC agit comme un barrage. Elle doit contenir la pression pour maintenir le niveau constant.</li>
                </ol>

                {/* PLACEHOLDER: Graphique changes fixes */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Graphique a generer
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « Graphique offre-demande de devises en changes fixes. Axe X : Quantité d'euros. Axe Y : E($/€). Ligne horizontale de parité fixe Ē = 1,05. Courbes O et D initiales en équilibre sur Ē. Puis D' déplacée à droite montrant un excès de demande au cours officiel. Flèche montrant l'intervention BC qui déplace O vers la droite pour combler l'excès. Style académique. »
                    </p>
                </div>
            </div>

            {/* 3.10 */}
            <div id="s3-10" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.10 Mécanisme de défense de la parité</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="rounded-xl p-4 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-default)' }}>
                        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-accent)' }}>Temps 1 : Situation initiale</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Le marché (O, D) est à l'équilibre sur la cible de la BC (<Math>{'\\bar{E}'}</Math>)</p>
                    </div>
                    <div className="rounded-xl p-4 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-default)' }}>
                        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--callout-warning-text)' }}>Temps 2 : Choc de demande</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>La demande augmente (<Math>{'D \\to D_{choc}'}</Math>). Pression à la hausse. À 1,05$, D &gt; O : Pénurie.</p>
                    </div>
                    <div className="rounded-xl p-4 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-default)' }}>
                        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--callout-key-text)' }}>Temps 3 : Intervention BC</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>La BC vend des Euros (création monétaire). L'offre se déplace (<Math>{'O \\to O_{interv}'}</Math>). Retour à la cible. (<Math>{'\\Delta M > 0'}</Math>)</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
