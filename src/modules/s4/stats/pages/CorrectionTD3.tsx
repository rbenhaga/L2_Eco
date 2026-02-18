import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function CorrectionTD3() {
    return (
        <main className="max-w-4xl mx-auto px-6">
            <PageHeader
                number="TD 3 — Correction"
                title="Estimation Ponctuelle"
                description="5 exercices complets · EMV, biais, convergence, efficacité, exhaustivité"
            />

            {/* ── Rappels Gamma ── */}
            <Callout type="key" title="Rappels sur la fonction Gamma (prérequis du cours, Chapitre 3)">
                <p className="mb-2"><strong>Définition.</strong> La fonction Gamma est définie pour tout <Math>{"\\alpha > 0"}</Math> par :</p>
                <FormulaBox>{"\\Gamma(\\alpha) = \\int_0^{+\\infty} u^{\\alpha - 1}\\,e^{-u}\\,du."}</FormulaBox>

                <p className="mb-2 mt-4"><strong>Propriétés fondamentales :</strong></p>
                <ol className="list-decimal pl-6 space-y-1">
                    <li><strong>Relation de récurrence :</strong> <Math>{"\\Gamma(\\alpha + 1) = \\alpha\\,\\Gamma(\\alpha)"}</Math> pour tout <Math>{"\\alpha > 0"}</Math>.</li>
                    <li><strong>Lien avec la factorielle :</strong> Pour tout <Math>{"n \\in \\mathbb{N}^*"}</Math>, <Math>{"\\Gamma(n) = (n-1)!"}</Math></li>
                    <li><strong>Valeurs utiles :</strong> <Math>{"\\Gamma(1) = 1,\\; \\Gamma(2) = 1,\\; \\Gamma(3) = 2,\\; \\Gamma(4) = 6,\\; \\Gamma(5) = 24."}</Math></li>
                </ol>

                <p className="mb-2 mt-4"><strong>Utilisation dans ce TD.</strong> Pour calculer les moments <Math>{"\\mathbb{E}(X^p)"}</Math> d'une variable aléatoire <Math>{"X"}</Math> de densité <Math>{"f(x;\\theta)"}</Math>, on effectue un <strong>changement de variable</strong> qui ramène l'intégrale à la forme <Math>{"\\int_0^{+\\infty} u^{\\alpha-1}\\,e^{-u}\\,du = \\Gamma(\\alpha)"}</Math>. La technique générale est la suivante :</p>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>On pose un changement de variable <Math>{"u = \\varphi(x)/\\theta"}</Math> (ou similaire) pour faire apparaître <Math>{"e^{-u}"}</Math>.</li>
                    <li>On exprime <Math>{"x"}</Math>, <Math>{"dx"}</Math>, et la puissance de <Math>{"x"}</Math> en fonction de <Math>{"u"}</Math>.</li>
                    <li>On identifie <Math>{"\\int_0^{+\\infty} u^{\\alpha-1}\\,e^{-u}\\,du = \\Gamma(\\alpha)"}</Math>.</li>
                    <li>On conclut avec les valeurs de <Math>{"\\Gamma(\\alpha)"}</Math>.</li>
                </ol>
            </Callout>

            {/* ═══════════════════ EXERCICE 1 ═══════════════════ */}
            <Section type="formule" title="Exercice 1 : Densité f(x;θ) = (4/θ)·x³·exp(−x⁴/θ)">
                <p className="mb-4">Soit <Math>{"(x_1, \\ldots, x_n)"}</Math> un échantillon aléatoire de taille <Math>{"n"}</Math> provenant d'une variable aléatoire <Math>{"X"}</Math> de densité :</p>
                <FormulaBox>{"f(x;\\theta) = \\frac{4}{\\theta}\\,x^3\\,e^{-\\frac{x^4}{\\theta}}, \\quad x > 0,\\;\\theta > 0."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">1) Déterminer un estimateur de θ par la méthode du maximum de vraisemblance</p>
                <p className="mb-2">L'EMV de <Math>{"\\theta"}</Math>, seul paramètre de la loi de <Math>{"X"}</Math> à estimer, est basé sur le principe suivant : on cherche <Math>{"\\hat\\theta"}</Math> de sorte à maximiser la fonction de vraisemblance, c'est-à-dire l'estimateur qui rend la probabilité d'apparition de l'échantillon observé <em>a posteriori</em> maximale. La fonction de vraisemblance se construit par le produit des densités de probabilités :</p>
                <FormulaBox>{"L(x_1, \\ldots, x_n;\\theta) = \\prod_{i=1}^{n} \\frac{4}{\\theta}\\,x_i^3\\,e^{-\\frac{x_i^4}{\\theta}}."}</FormulaBox>

                <p className="mt-4 mb-2">La fonction <Math>{"\\ln"}</Math> étant une fonction monotone strictement croissante et continue, maximiser <Math>{"L"}</Math> revient à maximiser <Math>{"\\ln L"}</Math> : le maximum ne change pas d'abscisse. La fonction de Log-vraisemblance est :</p>
                <FormulaBox>{"\\ln L = n\\ln 4 - n\\ln\\theta + 3\\sum_{i=1}^{n}\\ln x_i - \\frac{1}{\\theta}\\sum_{i=1}^{n}x_i^4."}</FormulaBox>

                <p className="mt-4 mb-2">Condition de premier ordre :</p>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat\\theta} = -\\frac{n}{\\hat\\theta} + \\frac{\\sum x_i^4}{\\hat\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\sum x_i^4 = n\\hat\\theta."}</FormulaBox>

                <FormulaBox label="EMV de θ" highlight>{"\\hat\\theta(x_1,\\ldots,x_n) = \\frac{\\sum_{i=1}^{n}x_i^4}{n} = \\overline{x^4}."}</FormulaBox>
                <p className="mt-2 mb-4">On admet que les conditions de second ordre sont vérifiées (dérivée seconde négative). Sur l'échantillon théorique : <Math>{"\\hat\\theta(X_1,\\ldots,X_n) = \\overline{X^4}"}</Math>.</p>

                <p className="mt-6 mb-2 font-semibold">2) Démontrer que l'estimateur est sans biais, convergent, efficace et exhaustif</p>
                <p className="mb-2"><strong>Hypothèse :</strong> Les <Math>{"X_i"}</Math> sont i.i.d. donc <Math>{"\\mathbb{E}(X_i) = \\mathbb{E}(X)"}</Math>, <Math>{"V(X_i) = V(X)"}</Math>, et <Math>{"X_i, X_j"}</Math> indépendantes pour <Math>{"i \\neq j"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>• Sans biais :</strong> On a <Math>{"\\mathbb{E}[\\hat\\theta] = \\frac{1}{n}\\sum \\mathbb{E}(X_i^4) = \\mathbb{E}(X^4)"}</Math>.</p>
                <p className="mb-2">Calcul de <Math>{"\\mathbb{E}(X^4)"}</Math> par changement de variable <Math>{"u = x^4/\\theta"}</Math>, d'où <Math>{"x = (\\theta u)^{1/4}"}</Math>, <Math>{"dx = \\frac{\\theta^{1/4}}{4}u^{-3/4}du"}</Math> :</p>
                <FormulaBox>{"\\mathbb{E}(X^4) = \\frac{4}{\\theta}\\cdot\\frac{\\theta^{7/4+1/4}}{4}\\int_0^{+\\infty} u^{7/4-3/4}\\,e^{-u}\\,du = \\theta\\,\\Gamma(2) = \\theta."}</FormulaBox>
                <p className="mb-2">Donc <Math>{"\\mathbb{E}[\\hat\\theta] = \\theta"}</Math> : <strong>ESB</strong>.</p>
                <p className="mb-2 text-sm italic">Interprétation : en prenant plusieurs échantillons et en calculant autant de fois <Math>{"\\hat\\theta"}</Math>, la moyenne de ces estimations donne le « vrai » paramètre <Math>{"\\theta"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>• Convergent :</strong> On a <Math>{"V[\\hat\\theta] = \\frac{V(X^4)}{n}"}</Math>. On calcule <Math>{"\\mathbb{E}(X^8)"}</Math> avec le même changement de variable :</p>
                <FormulaBox>{"\\mathbb{E}(X^8) = \\theta^2\\,\\Gamma(3) = 2\\theta^2 \\quad\\Rightarrow\\quad V(X^4) = 2\\theta^2 - \\theta^2 = \\theta^2."}</FormulaBox>
                <FormulaBox>{"V[\\hat\\theta] = \\frac{\\theta^2}{n} \\xrightarrow{n\\to\\infty} 0."}</FormulaBox>
                <p className="mb-2">Sans biais et convergent : <strong>absolument convergent</strong>.</p>

                <p className="mt-4 mb-2"><strong>• Efficace :</strong> FRCD : <Math>{"V(\\hat\\theta) \\geq 1/I(\\theta)"}</Math>. On calcule :</p>
                <FormulaBox>{"\\frac{\\partial^2 \\ln L}{\\partial \\theta^2} = \\frac{n}{\\theta^2} - \\frac{2\\sum X_i^4}{\\theta^3} \\quad\\Rightarrow\\quad I(\\theta) = -\\mathbb{E}[\\cdot] = \\frac{n}{\\theta^2}."}</FormulaBox>
                <FormulaBox>{"V(\\hat\\theta) = \\frac{\\theta^2}{n} = \\frac{1}{I(\\theta)}."}</FormulaBox>
                <p className="mb-2">Variance = borne FRCD : <strong>efficace</strong>.</p>

                <p className="mt-4 mb-2"><strong>• Exhaustif :</strong> Décomposition de la densité :</p>
                <FormulaBox>{"\\ln f(x_i;\\theta) = x_i^4\\cdot\\left(-\\frac{1}{\\theta}\\right) + 3\\ln x_i + (-\\ln\\theta) + \\ln 4."}</FormulaBox>
                <p className="mb-2">Par identification : <Math>{"\\alpha(x_i) = x_i^4"}</Math>, <Math>{"A(\\theta) = -1/\\theta"}</Math>, <Math>{"\\beta(x_i) = 3\\ln x_i"}</Math>, <Math>{"B(\\theta) = -\\ln\\theta"}</Math>, <Math>{"C = \\ln 4"}</Math>.</p>
                <p className="mb-2">Famille des estimateurs exhaustifs : <Math>{"\\theta^* = c\\,\\overline{X^4}"}</Math>. En posant <Math>{"c=1"}</Math>, <Math>{"\\hat\\theta = \\theta^*"}</Math> : <strong>exhaustif</strong>.</p>

                <Callout type="remember" title="Conclusion Exercice 1">
                    <Math>{"\\hat\\theta = \\overline{X^4}"}</Math> est un estimateur <strong>sans biais</strong>, <strong>absolument convergent</strong>, <strong>efficace</strong> et <strong>exhaustif</strong>.
                </Callout>
            </Section>

            {/* ═══════════════════ EXERCICE 2 ═══════════════════ */}
            <Section type="formule" title="Exercice 2 : Densité f(x;θ) = x²/(2θ³)·exp(−x/θ)">
                <p className="mb-4">Soit <Math>{"(x_1,\\ldots,x_n)"}</Math> un échantillon de taille <Math>{"n"}</Math> d'une v.a. <Math>{"X"}</Math> de densité :</p>
                <FormulaBox>{"f(x;\\theta) = \\frac{x^2}{2\\theta^3}\\,e^{-\\frac{x}{\\theta}}, \\quad x \\geq 0,\\;\\theta > 0."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">1) EMV</p>
                <FormulaBox>{"\\ln L = 2\\sum\\ln x_i - n\\ln 2 - 3n\\ln\\theta - \\frac{1}{\\theta}\\sum x_i."}</FormulaBox>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat\\theta} = -\\frac{3n}{\\hat\\theta} + \\frac{\\sum x_i}{\\hat\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\sum x_i = 3n\\hat\\theta."}</FormulaBox>
                <FormulaBox label="EMV de θ" highlight>{"\\hat\\theta = \\frac{\\bar{x}}{3}."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">2) Propriétés</p>
                <p className="mb-2"><strong>• Sans biais :</strong> <Math>{"\\mathbb{E}[\\hat\\theta] = \\frac{\\mathbb{E}(X)}{3}"}</Math>. Changement de variable <Math>{"u = x/\\theta"}</Math> :</p>
                <FormulaBox>{"\\mathbb{E}(X) = \\frac{1}{2\\theta^3}\\cdot\\theta^4\\,\\Gamma(4) = \\frac{\\theta}{2}\\cdot 3! = 3\\theta \\quad\\Rightarrow\\quad \\mathbb{E}[\\hat\\theta] = \\frac{3\\theta}{3} = \\theta."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Convergent :</strong> On calcule <Math>{"\\mathbb{E}(X^2)"}</Math> :</p>
                <FormulaBox>{"\\mathbb{E}(X^2) = \\frac{\\theta^2}{2}\\,\\Gamma(5) = 12\\theta^2 \\quad\\Rightarrow\\quad V(X) = 12\\theta^2 - 9\\theta^2 = 3\\theta^2."}</FormulaBox>
                <FormulaBox>{"V[\\hat\\theta] = \\frac{V(X)}{9n} = \\frac{3\\theta^2}{9n} = \\frac{\\theta^2}{3n} \\to 0."}</FormulaBox>
                <p className="mb-2"><strong>Absolument convergent.</strong></p>

                <p className="mt-4 mb-2"><strong>• Efficace :</strong></p>
                <FormulaBox>{"I(\\theta) = -\\frac{3n}{\\theta^2} + \\frac{2}{\\theta^3}\\cdot n\\cdot 3\\theta = \\frac{3n}{\\theta^2} \\quad\\Rightarrow\\quad V(\\hat\\theta) = \\frac{\\theta^2}{3n} = \\frac{1}{I(\\theta)}."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Exhaustif :</strong> Décomposition : <Math>{"\\alpha(x_i) = x_i"}</Math>, <Math>{"A(\\theta) = -1/\\theta"}</Math>, <Math>{"\\beta(x_i) = 2\\ln x_i"}</Math>, <Math>{"B(\\theta) = -3\\ln\\theta"}</Math>, <Math>{"C = -\\ln 2"}</Math>.</p>
                <p className="mb-2">Famille : <Math>{"\\theta^* = c\\,\\bar{X}"}</Math>. Avec <Math>{"c = 1/3"}</Math>, <Math>{"\\hat\\theta = \\theta^*"}</Math> : <strong>exhaustif</strong>.</p>

                <Callout type="remember" title="Conclusion Exercice 2">
                    <Math>{"\\hat\\theta = \\bar{X}/3"}</Math> est un estimateur <strong>sans biais</strong>, <strong>absolument convergent</strong>, <strong>efficace</strong> et <strong>exhaustif</strong>.
                </Callout>
            </Section>

            {/* ═══════════════════ EXERCICE 3 ═══════════════════ */}
            <Section type="formule" title="Exercice 3 : Loi Gamma — f(x;θ) = [1/Γ(k)]·(k/θ)ᵏ·xᵏ⁻¹·exp(−kx/θ)">
                <p className="mb-4"><Math>{"k"}</Math> est un paramètre connu, seul <Math>{"\\theta"}</Math> est à estimer.</p>
                <FormulaBox>{"f(x;\\theta) = \\frac{1}{\\Gamma(k)}\\left(\\frac{k}{\\theta}\\right)^k x^{k-1}\\,e^{-\\frac{k}{\\theta}x}, \\quad x \\geq 0."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">1) EMV</p>
                <FormulaBox>{"\\ln L = -n\\ln\\Gamma(k) + nk\\ln k - nk\\ln\\theta + (k-1)\\sum\\ln x_i - \\frac{k}{\\theta}\\sum x_i."}</FormulaBox>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat\\theta} = -\\frac{nk}{\\hat\\theta} + \\frac{k\\sum x_i}{\\hat\\theta^2} = 0 \\quad\\Longrightarrow\\quad \\sum x_i = n\\hat\\theta."}</FormulaBox>
                <FormulaBox label="EMV de θ" highlight>{"\\hat\\theta = \\bar{x}."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">2) Propriétés</p>
                <p className="mb-2">Rappel : <Math>{"\\Gamma(k+1)/\\Gamma(k) = k"}</Math> et <Math>{"\\Gamma(k+2)/\\Gamma(k) = k(k+1)"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>• Sans biais :</strong> Changement de variable <Math>{"u = kx/\\theta"}</Math> :</p>
                <FormulaBox>{"\\mathbb{E}(X) = \\frac{1}{\\Gamma(k)}\\cdot\\frac{\\theta}{k}\\cdot\\Gamma(k+1) = \\frac{\\theta}{k}\\cdot k = \\theta \\quad\\Rightarrow\\quad \\mathbb{E}[\\hat\\theta] = \\theta."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Convergent :</strong></p>
                <FormulaBox>{"\\mathbb{E}(X^2) = \\frac{\\theta^2}{k^2}\\cdot k(k+1) = \\frac{\\theta^2(k+1)}{k} \\quad\\Rightarrow\\quad V(X) = \\frac{\\theta^2}{k}."}</FormulaBox>
                <FormulaBox>{"V[\\hat\\theta] = \\frac{\\theta^2}{kn} \\to 0."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Efficace :</strong></p>
                <FormulaBox>{"I(\\theta) = \\frac{nk}{\\theta^2} \\quad\\Rightarrow\\quad V(\\hat\\theta) = \\frac{\\theta^2}{kn} = \\frac{1}{I(\\theta)}."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Exhaustif :</strong> <Math>{"\\alpha(x_i) = x_i"}</Math>, <Math>{"A(\\theta) = -k/\\theta"}</Math>, <Math>{"\\beta(x_i) = (k-1)\\ln x_i"}</Math>, <Math>{"B(\\theta) = -k\\ln\\theta"}</Math>, <Math>{"C = -\\ln\\Gamma(k) + k\\ln k"}</Math>.</p>
                <p className="mb-2">Famille : <Math>{"\\theta^* = c\\,\\bar{X}"}</Math>. Avec <Math>{"c=1"}</Math>, <Math>{"\\hat\\theta = \\theta^*"}</Math> : <strong>exhaustif</strong>.</p>

                <Callout type="remember" title="Conclusion Exercice 3">
                    <Math>{"\\hat\\theta = \\bar{X}"}</Math> est un estimateur <strong>sans biais</strong>, <strong>absolument convergent</strong>, <strong>efficace</strong> et <strong>exhaustif</strong>.
                </Callout>
            </Section>

            {/* ═══════════════════ EXERCICE 4 ═══════════════════ */}
            <Section type="formule" title="Exercice 4 : Loi de Bernoulli — Estimation de la proportion p">
                <p className="mb-4"><Math>{"X_i = 1"}</Math> si l'individu <Math>{"i"}</Math> est atteint de la grippe, 0 sinon. <Math>{"X_i \\sim B(1;p)"}</Math>, <Math>{"P(X_i = x_i) = p^{x_i}(1-p)^{1-x_i}"}</Math>.</p>

                <p className="mt-6 mb-2 font-semibold">1) EMV</p>
                <FormulaBox>{"L(x_1,\\ldots,x_n;p) = \\prod_{i=1}^{n} p^{x_i}(1-p)^{1-x_i}."}</FormulaBox>
                <FormulaBox>{"\\ln L = \\sum x_i \\ln p + \\sum(1-x_i)\\ln(1-p) = \\sum x_i \\ln p + (n - \\sum x_i)\\ln(1-p)."}</FormulaBox>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat{p}} = \\frac{\\sum x_i}{\\hat{p}} - \\frac{n - \\sum x_i}{1-\\hat{p}} = 0."}</FormulaBox>
                <p className="mb-2">D'où : <Math>{"(1-\\hat{p})\\sum x_i = \\hat{p}(n - \\sum x_i)"}</Math>, soit <Math>{"\\sum x_i = n\\hat{p}"}</Math>.</p>
                <FormulaBox label="EMV de p" highlight>{"\\hat{p}(x_1,\\ldots,x_n) = \\frac{\\sum_{i=1}^{n}x_i}{n} = \\bar{x}."}</FormulaBox>
                <p className="mt-2 mb-4">Sur l'échantillon théorique : <Math>{"\\hat{p}(X_1,\\ldots,X_n) = \\bar{X}"}</Math>.</p>

                <p className="mt-6 mb-2 font-semibold">2) Propriétés</p>
                <p className="mb-2"><strong>Hypothèse :</strong> Les <Math>{"X_i \\sim B(1;p)"}</Math> sont i.i.d. On a <Math>{"\\mathbb{E}(X_i) = p"}</Math> et <Math>{"V(X_i) = p(1-p)"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>• Sans biais :</strong></p>
                <FormulaBox>{"\\mathbb{E}[\\hat{p}] = \\frac{1}{n}\\sum \\mathbb{E}(X_i) = \\frac{1}{n}\\cdot n \\cdot p = p."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Convergent :</strong></p>
                <FormulaBox>{"V[\\hat{p}] = \\frac{1}{n^2}\\cdot n\\cdot V(X) = \\frac{p(1-p)}{n} \\xrightarrow{n\\to\\infty} 0."}</FormulaBox>
                <p className="mb-2"><strong>Absolument convergent</strong> (ESB + convergent).</p>

                <p className="mt-4 mb-2"><strong>• Efficace :</strong></p>
                <FormulaBox>{"\\frac{\\partial^2 \\ln L}{\\partial p^2} = -\\frac{\\sum X_i}{p^2} - \\frac{n - \\sum X_i}{(1-p)^2}."}</FormulaBox>
                <FormulaBox>{"I(p) = -\\mathbb{E}[\\cdot] = \\frac{np}{p^2} + \\frac{n-np}{(1-p)^2} = \\frac{n}{p} + \\frac{n}{1-p} = \\frac{n}{p(1-p)}."}</FormulaBox>
                <FormulaBox>{"V(\\hat{p}) = \\frac{p(1-p)}{n} = \\frac{1}{I(p)}."}</FormulaBox>
                <p className="mb-2">Variance = borne FRCD : <strong>efficace</strong>.</p>

                <p className="mt-4 mb-2"><strong>• Exhaustif :</strong></p>
                <FormulaBox>{"\\ln f(x_i;p) = x_i \\ln p + (1-x_i)\\ln(1-p) = x_i\\cdot\\ln\\frac{p}{1-p} + \\ln(1-p)."}</FormulaBox>
                <p className="mb-2"><Math>{"\\alpha(x_i) = x_i"}</Math>, <Math>{"A(p) = \\ln\\frac{p}{1-p}"}</Math>, <Math>{"\\beta(x_i) = 0"}</Math>, <Math>{"B(p) = \\ln(1-p)"}</Math>, <Math>{"C = 0"}</Math>.</p>
                <p className="mb-2">Famille : <Math>{"p^* = c\\,\\bar{X}"}</Math>. Avec <Math>{"c=1"}</Math>, <Math>{"\\hat{p} = p^*"}</Math> : <strong>exhaustif</strong>.</p>

                <Callout type="remember" title="Conclusion Exercice 4">
                    <Math>{"\\hat{p} = \\bar{X}"}</Math> est un estimateur <strong>sans biais</strong>, <strong>absolument convergent</strong>, <strong>efficace</strong> et <strong>exhaustif</strong>.
                </Callout>

                <p className="mt-6 mb-2 font-semibold">3) Application numérique</p>
                <p className="mb-2">Données : 1000 individus, 150 grippés. <Math>{"\\sum x_i = 150"}</Math>, <Math>{"n = 1000"}</Math>.</p>
                <FormulaBox label="Estimation" highlight>{"\\hat{p} = \\frac{150}{1000} = 0{,}15."}</FormulaBox>
                <p className="mb-2">La part estimée de la population grippée est <strong>15 %</strong>.</p>
            </Section>

            {/* ═══════════════════ EXERCICE 5 ═══════════════════ */}
            <Section type="formule" title="Exercice 5 : Loi Normale — Estimation de m et σ²">
                <p className="mb-4">Variable <Math>{"Z"}</Math> = masse d'un objet, <Math>{"Z \\sim N(m;\\sigma)"}</Math>. On observe un échantillon <Math>{"(Z_1,\\ldots,Z_n)"}</Math> i.i.d.</p>
                <FormulaBox>{"f(z_i;m,\\sigma^2) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\,\\exp\\left(-\\frac{(z_i - m)^2}{2\\sigma^2}\\right)."}</FormulaBox>

                <p className="mt-6 mb-2 font-semibold">1) EMV de m et σ²</p>
                <FormulaBox>{"\\ln L = -\\frac{n}{2}\\ln(2\\pi) - \\frac{n}{2}\\ln(\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum(z_i - m)^2."}</FormulaBox>
                <p className="mb-2">Condition de premier ordre par rapport à <Math>{"m"}</Math> :</p>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat{m}} = \\frac{1}{\\sigma^2}\\sum(z_i - \\hat{m}) = 0 \\quad\\Rightarrow\\quad \\sum z_i - n\\hat{m} = 0."}</FormulaBox>
                <FormulaBox label="EMV de m" highlight>{"\\hat{m} = \\frac{\\sum z_i}{n} = \\bar{z}."}</FormulaBox>

                <p className="mt-4 mb-2">Condition de premier ordre par rapport à <Math>{"\\sigma^2"}</Math> :</p>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\hat{\\sigma}^2} = -\\frac{n}{2\\hat{\\sigma}^2} + \\frac{1}{2\\hat{\\sigma}^4}\\sum(z_i - \\bar{z})^2 = 0."}</FormulaBox>
                <FormulaBox label="EMV de σ²" highlight>{"\\hat{\\sigma}^2 = S^2 = \\frac{1}{n}\\sum_{i=1}^{n}(z_i - \\bar{z})^2."}</FormulaBox>

                <Callout type="insight" title="Remarque">
                    <p>Les moments de la loi normale sont des résultats connus du cours (<Math>{"\\mathbb{E}(Z) = m"}</Math>, <Math>{"V(Z) = \\sigma^2"}</Math>). Le calcul direct par intégrale ne nécessite pas la fonction Gamma ici (contrairement aux exercices 1, 2, 3) car la densité gaussienne se traite par complétion du carré.</p>
                </Callout>

                <p className="mt-6 mb-2 font-semibold">2) Propriétés de m̂ = Z̄</p>

                <p className="mt-4 mb-2"><strong>• Sans biais :</strong></p>
                <FormulaBox>{"\\mathbb{E}[\\hat{m}] = \\frac{1}{n}\\sum \\mathbb{E}(Z_i) = \\frac{1}{n}\\cdot n\\cdot m = m."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Convergent :</strong></p>
                <FormulaBox>{"V[\\hat{m}] = \\frac{1}{n^2}\\cdot n\\cdot V(Z) = \\frac{\\sigma^2}{n} \\xrightarrow{n\\to\\infty} 0."}</FormulaBox>
                <p className="mb-2"><strong>Absolument convergent.</strong></p>

                <p className="mt-4 mb-2"><strong>• Efficace :</strong></p>
                <FormulaBox>{"\\frac{\\partial^2 \\ln L}{\\partial m^2} = -\\frac{n}{\\sigma^2} \\quad\\Rightarrow\\quad I(m) = \\frac{n}{\\sigma^2}."}</FormulaBox>
                <FormulaBox>{"V(\\hat{m}) = \\frac{\\sigma^2}{n} = \\frac{1}{I(m)}."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>• Exhaustif :</strong> Décomposition de <Math>{"\\ln f(z_i;m)"}</Math> (pour <Math>{"\\sigma"}</Math> fixé) :</p>
                <FormulaBox>{"\\ln f(z_i;m) = z_i\\cdot\\frac{m}{\\sigma^2} + \\left(-\\frac{z_i^2}{2\\sigma^2}\\right) + \\left(-\\frac{m^2}{2\\sigma^2}\\right) + \\left(-\\ln(\\sigma\\sqrt{2\\pi})\\right)."}</FormulaBox>
                <p className="mb-2"><Math>{"\\alpha(z_i) = z_i"}</Math>, <Math>{"A(m) = m/\\sigma^2"}</Math>. Famille : <Math>{"m^* = c\\,\\bar{Z}"}</Math>. Avec <Math>{"c=1"}</Math> : <strong>exhaustif</strong>.</p>

                <Callout type="remember" title="Conclusion sur m̂">
                    <Math>{"\\hat{m} = \\bar{Z}"}</Math> est un estimateur <strong>sans biais</strong>, <strong>absolument convergent</strong>, <strong>efficace</strong> et <strong>exhaustif</strong>.
                </Callout>

                <p className="mt-6 mb-2 font-semibold">3) Propriétés de σ̂² = S²</p>

                <Callout type="warning" title="σ̂² = S² est un estimateur biaisé !">
                    <p className="mb-2">Démontrons que <Math>{"\\mathbb{E}(S^2) \\neq \\sigma^2"}</Math>.</p>
                </Callout>

                <p className="mt-4 mb-2"><strong>Étape 1 : Décomposition algébrique.</strong></p>
                <p className="mb-2">On introduit la vraie moyenne <Math>{"m"}</Math> : <Math>{"(Z_i - \\bar{Z}) = (Z_i - m) - (\\bar{Z} - m)"}</Math>.</p>
                <FormulaBox label="Décomposition fondamentale" highlight>{"\\sum_{i=1}^{n}(Z_i - \\bar{Z})^2 = \\sum_{i=1}^{n}(Z_i - m)^2 - n(\\bar{Z} - m)^2."}</FormulaBox>
                <p className="mb-2 text-sm italic">On a utilisé : <Math>{"\\sum(Z_i - m) = n(\\bar{Z} - m)"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>Étape 2 :</strong> <Math>{"\\mathbb{E}[\\sum(Z_i - m)^2] = n\\sigma^2"}</Math> (car <Math>{"\\mathbb{E}[(Z_i - m)^2] = V(Z_i) = \\sigma^2"}</Math>).</p>

                <p className="mt-4 mb-2"><strong>Étape 3 :</strong> <Math>{"\\mathbb{E}[n(\\bar{Z} - m)^2] = n \\cdot V(\\bar{Z}) = n \\cdot \\sigma^2/n = \\sigma^2"}</Math>.</p>

                <p className="mt-4 mb-2"><strong>Étape 4 :</strong> En prenant l'espérance de la décomposition :</p>
                <FormulaBox>{"\\mathbb{E}\\left[\\sum(Z_i - \\bar{Z})^2\\right] = n\\sigma^2 - \\sigma^2 = (n-1)\\sigma^2."}</FormulaBox>
                <FormulaBox>{"\\mathbb{E}(S^2) = \\frac{(n-1)\\sigma^2}{n} = \\sigma^2\\cdot\\frac{n-1}{n}."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>Étape 5 : Conclusion sur le biais.</strong></p>
                <FormulaBox>{"\\text{Biais}(S^2) = \\mathbb{E}(S^2) - \\sigma^2 = -\\frac{\\sigma^2}{n} \\neq 0."}</FormulaBox>
                <p className="mb-2">L'estimateur <Math>{"S^2"}</Math> <strong>n'est pas sans biais</strong> : il sous-estime systématiquement la vraie variance <Math>{"\\sigma^2"}</Math>.</p>

                <Callout type="warning" title="Conclusion sur σ̂²">
                    <p>L'EMV <Math>{"S^2 = \\frac{1}{n}\\sum(Z_i-\\bar{Z})^2"}</Math> est <strong>biaisé</strong>. Son biais vaut <Math>{"-\\sigma^2/n"}</Math> : il sous-estime systématiquement la vraie variance <Math>{"\\sigma^2"}</Math>.</p>
                </Callout>

                <p className="mt-6 mb-2 font-semibold">4) Application numérique</p>
                <p className="mb-4">On utilise les centres de classes <Math>{"z_j^*"}</Math> et les effectifs <Math>{"n_j"}</Math> :</p>

                <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <th className="text-left py-2 px-3" style={{ color: 'var(--color-text-primary)' }}>Classe</th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}>Centre <Math>{"z_j^*"}</Math></th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}>Effectif <Math>{"n_j"}</Math></th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}><Math>{"n_j \\cdot z_j^*"}</Math></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['[214–216[', '215', '10', '2 150'],
                                ['[216–218[', '217', '75', '16 275'],
                                ['[218–220[', '219', '110', '24 090'],
                                ['[220–222[', '221', '200', '44 200'],
                                ['[222–224[', '223', '85', '18 955'],
                                ['[224–226[', '225', '20', '4 500'],
                            ].map(([cl, c, n, prod], i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                    <td className="py-2 px-3">{cl}</td>
                                    <td className="text-center py-2 px-3">{c}</td>
                                    <td className="text-center py-2 px-3">{n}</td>
                                    <td className="text-center py-2 px-3">{prod}</td>
                                </tr>
                            ))}
                            <tr style={{ borderTop: '2px solid var(--color-border-default)' }}>
                                <td className="py-2 px-3 font-semibold">Total</td>
                                <td className="text-center py-2 px-3"></td>
                                <td className="text-center py-2 px-3 font-semibold">n = 500</td>
                                <td className="text-center py-2 px-3 font-semibold">110 170</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mb-2"><strong>Estimation de m :</strong></p>
                <FormulaBox label="m̂" highlight>{"\\hat{m} = \\bar{z} = \\frac{110\\,170}{500} = 220{,}34\\text{ g}."}</FormulaBox>

                <p className="mt-4 mb-2"><strong>Estimation de σ² :</strong></p>
                <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <th className="text-left py-2 px-3" style={{ color: 'var(--color-text-primary)' }}>Classe</th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}><Math>{"z_j^*"}</Math></th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}><Math>{"n_j"}</Math></th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}><Math>{"(z_j^* - \\bar{z})^2"}</Math></th>
                                <th className="text-center py-2 px-3" style={{ color: 'var(--color-text-primary)' }}><Math>{"n_j(z_j^*-\\bar{z})^2"}</Math></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['[214–216[', '215', '10', '28,5156', '285,156'],
                                ['[216–218[', '217', '75', '11,1556', '836,670'],
                                ['[218–220[', '219', '110', '1,7956', '197,516'],
                                ['[220–222[', '221', '200', '0,4356', '87,120'],
                                ['[222–224[', '223', '85', '7,0756', '601,426'],
                                ['[224–226[', '225', '20', '21,7156', '434,312'],
                            ].map(([cl, c, n, sq, prod], i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                    <td className="py-2 px-3">{cl}</td>
                                    <td className="text-center py-2 px-3">{c}</td>
                                    <td className="text-center py-2 px-3">{n}</td>
                                    <td className="text-center py-2 px-3">{sq}</td>
                                    <td className="text-center py-2 px-3">{prod}</td>
                                </tr>
                            ))}
                            <tr style={{ borderTop: '2px solid var(--color-border-default)' }}>
                                <td className="py-2 px-3" colSpan={3}></td>
                                <td className="text-center py-2 px-3 font-semibold">Total</td>
                                <td className="text-center py-2 px-3 font-semibold">2 442,200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <FormulaBox label="σ̂² (biaisée)" highlight>{"\\hat{\\sigma}^2 = S^2 = \\frac{2\\,442{,}200}{500} = 4{,}8844\\text{ g}^2."}</FormulaBox>
                <FormulaBox>{"\\hat{\\sigma} = \\sqrt{S^2} \\approx 2{,}21\\text{ g}."}</FormulaBox>

                <Callout type="remember" title="Récapitulatif des estimations">
                    <p><Math>{"\\hat{m} = 220{,}34"}</Math> g · <Math>{"\\hat{\\sigma}^2 = 4{,}88"}</Math> g² (biaisée) · <Math>{"\\hat{\\sigma} \\approx 2{,}21"}</Math> g.</p>
                </Callout>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-9', label: '← Chapitre 9', title: 'Estimation Ponctuelle' }}
                next={{ path: '/s4/stats/chapitre-10', label: 'Chapitre 10 →', title: 'Estimation par Intervalle de Confiance' }}
            />
        </main>
    );
}
