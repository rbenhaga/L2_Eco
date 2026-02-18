import { Section, Callout, Math, FormulaBox } from '../../../../../components';
import { BarChart3 } from 'lucide-react';

/** Section 2 — L'équilibre financier et la mobilité des capitaux */
export function Ch2Section2() {
    return (
        <section id="ch2-section-2" data-section-title="2. Équilibre financier et mobilité des capitaux" className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 2 — L'équilibre financier et la mobilité des capitaux
            </h2>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Contrairement au marché des biens, les marchés financiers réagissent <em>à la seconde</em>. Cette section explore les mécanismes d'arbitrage qui lient les taux d'intérêt aux taux de change, et qui constituent le fondement de la courbe BP du modèle Mundell-Fleming.
            </p>

            {/* 2.1 Parfaite mobilité */}
            <div id="ch2-s2-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.1 La parfaite mobilité des capitaux</h3>
                <Section type="definition" title="Hypothèse fondamentale">
                    <p>Les investisseurs déplacent leurs fonds <strong>instantanément</strong> et <strong>sans coût</strong> entre les pays. Il n'existe que deux actifs dans le monde : des actifs européens (taux <Math>{'i_t'}</Math>) et des actifs américains (taux <Math>{'i^*_t'}</Math>). Pour les comparer, il faut les exprimer dans la même monnaie.</p>
                </Section>
            </div>

            {/* 2.2 Spot et Forward */}
            <div id="ch2-s2-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.2 Cours Spot et cours Forward</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Le cours Spot (<Math>{'E_t'}</Math>)</strong> est le taux de change pour une transaction dont le règlement et la livraison interviennent immédiatement (sous 2 jours ouvrés). Exemple : j'échange 100€ contre des $ maintenant.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Le cours Forward (<Math>{'F_{t,T}'}</Math>)</strong> est le taux de change fixé aujourd'hui pour une transaction qui sera exécutée à une date future précise. Exemple : je m'engage aujourd'hui à acheter des $ dans 3 mois à un prix fixé.
                </p>
                <Section type="exemple" title="Exemple : Spot vs Forward">
                    <p className="mb-1">Une entreprise dispose de 1 000€. Cours Spot : 1€ = 1,10$. Cours Forward à 1 an : 1€ = 1,05$.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Choix 1 (Spot) :</strong> Échange immédiat → 1 000 × 1,10 = <strong>1 100$</strong> tout de suite.</li>
                        <li><strong>Choix 2 (Forward) :</strong> Contrat signé aujourd'hui, exécuté dans 1 an → <strong>1 050$</strong> dans 1 an (couverture contre le risque de change).</li>
                    </ul>
                </Section>
            </div>

            {/* 2.3 Arbitrage */}
            <div id="ch2-s2-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.3 Le mécanisme d'arbitrage financier</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    L'<strong>arbitrage</strong> est l'action de tirer profit d'un écart de prix entre deux marchés pour réaliser un gain <strong>sans prendre de risque</strong> (<em>free lunch</em>). Sur le marché des changes, si le cours Spot et le cours Forward ne sont pas cohérents entre eux, les investisseurs achètent la devise là où elle est peu chère et la revendent là où elle est plus chère.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>La force de rappel du marché :</strong> en se précipitant sur l'opportunité, les arbitragistes font varier l'offre et la demande. Leurs actions font monter le prix bas et baisser le prix haut jusqu'à ce que l'opportunité disparaisse. C'est le principe du <em>« no free lunch »</em> (Milton Friedman).
                </p>
                <Section type="exemple" title="Exemple d'arbitrage">
                    <p className="mb-1"><strong>Données :</strong> <Math>{'E_t = 1{,}10'}</Math> (Spot), <Math>{'F_t = 1{,}05'}</Math> (Forward). Investisseur : 1 000€.</p>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li><strong>Étape 1 :</strong> Change au comptant → 1 000 × 1,10 = 1 100$.</li>
                        <li><strong>Étape 2 :</strong> Signe un contrat Forward pour revendre 1 100$ dans 1 an à 1,05.</li>
                        <li><strong>Étape 3 :</strong> Un an plus tard, il reçoit 1 100 ÷ 1,05 = 1 047,62€.</li>
                    </ol>
                    <p className="mt-2"><strong>Bilan :</strong> 1 000€ → 1 047,62€. Gain de +4,76% <strong>sans risque</strong>. → Free lunch !</p>
                </Section>
            </div>

            {/* 2.4 PTIC */}
            <div id="ch2-s2-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.4 La parité des taux d'intérêt couverte (PTIC)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Si l'investisseur utilise un contrat Forward pour <strong>éliminer le risque de change</strong> (couverture/hedging), l'arbitrage impose que les deux placements rapportent exactement la même chose :
                </p>
                <Section type="key" title="Parité des taux d'intérêt couverte (PTIC)">
                    <FormulaBox highlight>{`1 + i_t = \\frac{E_t}{F_t} \\times (1 + i^*_t)`}</FormulaBox>
                    <p className="mb-2">Placer 1€ en Europe rapporte <Math>{'(1 + i)'}</Math>. Placer 1€ aux USA couvert rapporte : conversion Spot (1€ → <Math>{'E_t'}</Math> $), placement US (<Math>{'E_t(1+i^*)'}</Math>), reconversion Forward (<Math>{'E_t(1+i^*)/F_t'}</Math> €).</p>
                    <p>C'est une relation d'<strong>arbitrage pure</strong>, vérifiée en permanence.</p>
                </Section>

                <Callout type="tip" title="Mécanisme de rééquilibrage">
                    <p>Si le placement US couvert rapporte plus que le placement européen, les arbitragistes vendent des euros au Spot (<Math>{'E \\downarrow'}</Math>) et achètent des euros au Forward (<Math>{'F \\uparrow'}</Math>). Le ratio <Math>{'E/F'}</Math> diminue jusqu'à ce que le profit disparaisse.</p>
                </Callout>

                <Section type="exemple" title="Vérification numérique de la PTIC">
                    <p className="mb-1"><strong>Données :</strong> i = 2%, i* = 5%, <Math>{'E_t = 1{,}10'}</Math>, <Math>{'F_t = 1{,}1323'}</Math></p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Rendement européen : <Math>{'1 + 0{,}02 = 1{,}02€'}</Math></li>
                        <li>Rendement US couvert : <Math>{'(1{,}10/1{,}1323) \\times 1{,}05 \\approx 1{,}02€'}</Math></li>
                    </ul>
                    <p className="mt-2">Bien que le taux US soit plus attractif (5% vs 2%), le <strong>coût de la couverture</strong> annule exactement cet avantage. Pas de free lunch !</p>
                </Section>
            </div>

            {/* 2.5 PTINC */}
            <div id="ch2-s2-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.5 La parité des taux d'intérêt non couverte (PTINC)</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Dans la réalité, tous les investisseurs ne se couvrent pas. Beaucoup acceptent de prendre un <strong>risque de change</strong> en pariant sur l'avenir. On remplace le taux certain du contrat (<Math>{'F_t'}</Math>) par le taux de change <strong>anticipé</strong> (<Math>{'E^e_{t+1}'}</Math>).
                </p>
                <Section type="key" title="PTINC">
                    <p className="mb-2"><strong>Relation exacte :</strong></p>
                    <FormulaBox highlight>{`1 + i_t = \\frac{E_t}{E^e_{t+1}} \\times (1 + i^*_t)`}</FormulaBox>
                    <p className="mb-2"><strong>Approximation linéaire</strong> (pour des taux et variations faibles) :</p>
                    <FormulaBox>{`i_t \\approx i^*_t - \\frac{E^e_{t+1} - E_t}{E_t}`}</FormulaBox>
                    <p>Interprétation : pour qu'un investisseur accepte de garder ses fonds en Europe alors que <Math>{'i < i^*'}</Math>, il doit <strong>s'attendre à ce que l'Euro s'apprécie</strong> (<Math>{'E^e > E'}</Math>). Le manque à gagner sur les intérêts est compensé par le gain sur le change.</p>
                </Section>
                <p className="text-[15px] leading-relaxed mb-3 mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                    L'hypothèse de <strong>neutralité au risque</strong> : en macroéconomie, on suppose souvent que les investisseurs sont neutres au risque. Pour eux, un profit espéré est équivalent à un profit certain.
                </p>
            </div>

            {/* 2.6 Graphique PTINC */}
            <div id="ch2-s2-6" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.6 Représentation graphique de la PTINC</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En isolant <Math>{'E_t'}</Math> de la relation exacte : <Math>{'E_t = E^e_{t+1} \\times \\frac{1+i_t}{1+i^*_t}'}</Math>. C'est une <strong>droite croissante</strong> dans le repère (i, E). La pente est <Math>{'E^e/(1+i^*) > 0'}</Math>.
                </p>
                <Callout type="key" title="Propriété remarquable">
                    <p>La courbe passe par le point <Math>{'(i = i^*,\\, E = E^e)'}</Math>. Si les taux sont identiques, il n'y a aucune raison que le change varie.</p>
                </Callout>
                {/* Figure 3 */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 3 — La courbe PTINC dans le repère (i, E)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « PTINC line in (i,E): upward sloping line passing through (i*=3%, E^e), with labeled axes and point annotation. Academic macro chart. »
                    </p>
                </div>
            </div>

            {/* 2.7 Effets sur la PTINC */}
            <div id="ch2-s2-7" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.7 Effets sur la PTINC</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Hausse du taux d'intérêt domestique (<Math>{'i \\uparrow'}</Math>) :</strong> Les capitaux affluent vers l'Europe (arbitrage), la demande d'Euro augmente, provoquant une <strong>appréciation immédiate</strong> (<Math>{'E \\uparrow'}</Math>). On se déplace le long de la courbe PTINC vers le haut.
                </p>
                {/* Figure 4 */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 4 — Hausse de i et appréciation de E
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « PTINC chart in (i,E): show movement along the same upward-sloping PTINC from point A (lower i, lower E) to point B (higher i, higher E), with arrow A→B. Academic style. »
                    </p>
                </div>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Hausse des anticipations (<Math>{'E^e \\uparrow'}</Math>) :</strong> Si les investisseurs deviennent plus optimistes sur l'Euro demain, la droite PTINC se déplace vers le haut et devient plus raide. À taux i constant, l'Euro est devenu trop attractif, provoquant une <strong>appréciation immédiate</strong> du cours Spot.
                </p>
                {/* Figure 5 */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 5 — Hausse des anticipations et déplacement de la PTINC
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « Two PTINC curves in (i,E): initial PTINC0 and shifted-up PTINC1 after expected future exchange rate E^e rises; indicate appreciation at constant i. Academic style. »
                    </p>
                </div>
            </div>

            {/* 2.8 Application 2022 */}
            <div id="ch2-s2-8" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.8 Application : le basculement monétaire de 2022</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    En 2022, la Fed a agi plus tôt et plus fort que la BCE face à l'inflation (hausse de 0,25% à 5,5% en 18 mois). Trois raisons : surchauffe par la demande (plans de relance massifs), risque de boucle prix-salaires (chômage historiquement bas), et un mandat centré sur la stabilité des prix.
                </p>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Sur la PTINC : la hausse massive de <Math>{'i^*'}</Math> (taux US) a <strong>déplacé la courbe vers le bas et l'a aplatie</strong>. Même si la BCE a relevé ses taux (de −0,50% à 0,75%), l'effet Fed l'a emporté : l'Euro a chuté de 1,05$ à 0,96$.
                </p>
                {/* Figure 6 */}
                <div className="my-6 rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}>
                    <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                        <BarChart3 className="h-4 w-4" />
                        Figure 6 — Le choc PTINC de 2022 : Fed vs BCE
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Prompt : « Two PTINC curves (May 2022 vs Sept 2022), downward shift from Fed tightening, highlight observed points (i_BCE, E) for both dates. »
                    </p>
                </div>
            </div>
        </section>
    );
}
