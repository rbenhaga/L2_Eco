import { Section, Callout, Math, FormulaBox } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 1 — Le marché des biens et services en économie ouverte */
export function Ch2Section1() {
    return (
        <section id="ch2-section-1" data-section-title="1. Marché des biens en économie ouverte" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 1 — Le marché des biens et services en économie ouverte
            </h2>

            <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Lorsque l'on passe d'une économie fermée à une économie ouverte, le marché des biens et services intègre deux flux supplémentaires : les <strong>exportations</strong> (X) et les <strong>importations</strong> (M). L'équilibre macroéconomique ne dépend plus uniquement de la demande intérieure, mais aussi de la <strong>compétitivité-prix</strong> et de la <strong>conjoncture mondiale</strong>.
            </p>

            {/* 1.1 Importations */}
            <div id="ch2-s1-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.1 Les déterminants des importations (M)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>1. Le revenu national (Y) :</strong> Plus le revenu national est élevé, plus les agents économiques consomment, y compris des B&S étrangers. La sensibilité des importations au revenu est mesurée par la <strong>propension marginale à importer</strong> (notée <Math>{'m'}</Math>), qui correspond à la part de chaque euro supplémentaire de revenu consacrée à l'achat de produits étrangers.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>2. Le taux de change réel (ε) :</strong> Si ε est élevé (monnaie nationale forte / prix nationaux élevés), les B&S étrangers deviennent relativement moins chers, ce qui incite les résidents à importer davantage.
                </p>
                <FormulaBox label="Fonction d'importation" highlight>{`M = M(Y, \\varepsilon) \\quad \\text{avec} \\quad \\frac{\\partial M}{\\partial Y} > 0 \\; (m) \\quad \\text{et} \\quad \\frac{\\partial M}{\\partial \\varepsilon} > 0`}</FormulaBox>
                <Callout type="warning" title="Remarque sur la notation">
                    <p>On considère que <Math>{'\\varepsilon = \\varepsilon_{\\text{devise}/\\text{€}}'}</Math>. Ainsi, une <strong>hausse de ε</strong> correspond à une <strong>appréciation de l'Euro</strong>. À court terme dans le modèle IS-LM-BP, on suppose les prix fixes (<Math>{'P = P^* = 1'}</Math>), de sorte que le taux de change réel ε se confond avec le taux de change nominal E.</p>
                </Callout>
            </div>

            {/* 1.2 Exportations */}
            <div id="ch2-s1-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.2 Les déterminants des exportations (X)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Les exportations sont, par symétrie, les importations du reste du monde. Elles dépendent de :
                </p>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>1. Le revenu étranger (<Math>{'Y^{RDM}'}</Math>) :</strong> Si nos partenaires commerciaux sont en phase de croissance, ils consomment davantage et nous achètent plus de B&S.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>2. Le taux de change réel (ε) :</strong> Si ε est <em>faible</em> (monnaie nationale dépréciée), nos produits sont compétitifs à l'étranger et les exportations augmentent.
                </p>
                <FormulaBox label="Fonction d'exportation" highlight>{`X = X(Y^{RDM}, \\varepsilon) \\quad \\text{avec} \\quad \\frac{\\partial X}{\\partial Y^{RDM}} > 0 \\quad \\text{et} \\quad \\frac{\\partial X}{\\partial \\varepsilon} < 0`}</FormulaBox>
            </div>

            {/* 1.3 Solde extérieur & Courbe en J */}
            <div id="ch2-s1-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.3 Le solde extérieur (NX) et les effets d'une dépréciation</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Le solde extérieur (ou exportations nettes) est défini par :
                </p>
                <FormulaBox highlight>{`NX = X - \\frac{M}{\\varepsilon}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Une baisse de la valeur de l'Euro (<Math>{'\\varepsilon \\downarrow'}</Math>, dépréciation) déclenche <strong>deux phases distinctes</strong> :
                </p>

                <h4 className="text-lg font-medium mb-2 mt-4" style={{ color: 'var(--color-text-primary)' }}>Phase 1 — Court terme : l'effet prix</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Les contrats commerciaux sont déjà signés. Les volumes (X, M) sont rigides à très court terme. Les importations sont souvent libellées en devises étrangères : si ε↓, la facture s'alourdit en euros. <strong>Résultat :</strong> <strong>dégradation du solde NX</strong>.
                </p>

                <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Phase 2 — Moyen terme : l'effet volume</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Les agents économiques ajustent leurs comportements aux nouveaux prix relatifs. Nos produits sont devenus moins chers pour les étrangers : X↑. Les produits importés sont plus chers : M↓. <strong>Résultat :</strong> <strong>amélioration du solde NX</strong>.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Cette séquence temporelle — dégradation puis amélioration — est à l'origine de la célèbre <strong>courbe en J</strong>.
                </p>

                {/* Graph placeholder: J-curve */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 1 — La courbe en J
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « J-curve showing trade balance (NX) over time after a depreciation. Initial equilibrium at 0, dip below 0 in the short-run (price effect), then rises above 0 in the medium-run (volume effect). Academic style with labeled phases. »
                    </p>
                </div>
            </div>

            {/* 1.4 Exemple chiffré */}
            <div id="ch2-s1-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.4 Exemple chiffré : dépréciation de l'euro</h3>
                <Section type="exemple" title="Exemple numérique">
                    <p className="mb-2"><strong>Données initiales (t₀) :</strong> <Math>{'E_{\\$/\\text{€}} = 1'}</Math>, <Math>{'P = 10\\,\\text{€}'}</Math>, <Math>{'P^* = 10\\,\\$'}</Math>, donc <Math>{'\\varepsilon = 1'}</Math>. X = 100 et M = 100.</p>
                    <p className="mb-2"><strong>État initial :</strong> <Math>{'NX_0 = X - M/\\varepsilon = 100 - 100/1 = 0\\,\\text{€}'}</Math> (équilibre commercial)</p>
                    <p className="mb-2"><strong>Court terme (t₁), ε' = 0,8 :</strong> Les volumes ne bougent pas.</p>
                    <FormulaBox>{`NX_{CT} = 100 - \\frac{100}{0{,}8} = 100 - 125 = -25\\,\\text{€}`}</FormulaBox>
                    <p className="mb-2"><strong>Moyen terme (t₂) :</strong> Ajustement des comportements : X = 140, M = 80.</p>
                    <FormulaBox>{`NX_{MT} = 140 - \\frac{80}{0{,}8} = 140 - 100 = +40\\,\\text{€}`}</FormulaBox>
                </Section>

                {/* Graph placeholder: depreciation example */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 2 — Évolution du solde NX dans l'exemple chiffré
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « Bar chart with 3 states: t0 (0 EUR), t1 (-25 EUR, red), t2 (+40 EUR, green). Clean academic style, labels above each bar. »
                    </p>
                </div>
            </div>

            {/* 1.5 Marshall-Lerner */}
            <div id="ch2-s1-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.5 La condition de Marshall-Lerner</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Pour déterminer si, à moyen terme, une dépréciation réelle améliore ou dégrade le solde extérieur, on utilise le <strong>théorème des élasticités critiques</strong>. Il arbitre entre deux forces opposées : l'<strong>effet prix</strong> (négatif) et l'<strong>effet volume</strong> (positif).
                </p>
                <Section type="key" title="Condition de Marshall-Lerner">
                    <p className="mb-2">En partant d'un solde initial <strong>équilibré</strong>, une dépréciation réelle (<Math>{'\\varepsilon \\downarrow'}</Math>) <strong>améliore</strong> le solde extérieur (<Math>{'NX \\uparrow'}</Math>) si et seulement si :</p>
                    <FormulaBox highlight>{`|\\eta_x| + |\\eta_m| > 1`}</FormulaBox>
                    <p>Où <Math>{'|\\eta_x|'}</Math> est l'élasticité-prix des exportations et <Math>{'|\\eta_m|'}</Math> l'élasticité-prix des importations (en valeur absolue).</p>
                </Section>
                <Callout type="insight" title="Intuition du seuil de 1">
                    <p>Le chiffre 1 représente l'effet prix (la perte de valeur unitaire sur les importations). Pour que NX s'améliore, la <em>réaction des quantités</em> (hausse de X et baisse de M) doit plus que compenser cette perte.</p>
                </Callout>
            </div>

            {/* 1.6 Puzzle 2022 */}
            <div id="ch2-s1-6" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.6 Le puzzle de la dépréciation : le choc de 2022</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En 2022, le différentiel de taux d'intérêt entre les USA et la Zone Euro, couplé à la crise énergétique (guerre en Ukraine), a entraîné une chute historique de la monnaie unique : l'euro est passé de 1,15$ (janvier 2022) à 0,96$ (septembre 2022).
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'<strong>effet prix immédiat</strong> a été particulièrement violent car le pétrole et le gaz sont libellés en dollars. La facture énergétique payée en euros a bondi de ~20% par pur effet de change. La question centrale : à quelle condition ce renchérissement sera-t-il compensé par un regain de nos exportations ? → Condition de Marshall-Lerner.
                </p>
            </div>

            {/* 1.7 Démonstration ML */}
            <div id="ch2-s1-7" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.7 Démonstration de la condition de Marshall-Lerner</h3>
                <Section type="formule" title="Démonstration">
                    <p className="mb-2">On part de la définition du solde extérieur :</p>
                    <FormulaBox>{`NX = X(\\varepsilon) - \\frac{M(\\varepsilon)}{\\varepsilon}`}</FormulaBox>
                    <p className="mb-2">On dérive par rapport à ε :</p>
                    <FormulaBox>{`\\frac{dNX}{d\\varepsilon} = \\frac{dX}{d\\varepsilon} - \\frac{1}{\\varepsilon}\\frac{dM}{d\\varepsilon} + \\frac{M}{\\varepsilon^2}`}</FormulaBox>
                    <p className="mb-2">En multipliant par <Math>{'\\varepsilon / X'}</Math> et en supposant un solde initial équilibré (<Math>{'X = M/\\varepsilon'}</Math>) :</p>
                    <FormulaBox>{`\\frac{dNX}{d\\varepsilon} \\cdot \\frac{\\varepsilon}{X} = \\eta_x - \\eta_m + 1`}</FormulaBox>
                    <p>Pour qu'une dépréciation (<Math>{'d\\varepsilon < 0'}</Math>) améliore NX (<Math>{'dNX > 0'}</Math>), il faut <Math>{'dNX/d\\varepsilon < 0'}</Math>, donc <Math>{'\\eta_m - \\eta_x > 1'}</Math>, soit <Math>{'|\\eta_x| + |\\eta_m| > 1'}</Math>.</p>
                </Section>
            </div>
        </section>
    );
}
