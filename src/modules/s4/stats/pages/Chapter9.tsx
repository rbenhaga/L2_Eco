import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter9() {
    return (
        <main className="max-w-4xl mx-auto px-6">
            <PageHeader
                number="Chapitre 09"
                title="Estimation Ponctuelle"
                description="Méthode du maximum de vraisemblance et propriétés des estimateurs. 6 exercices corrigés avec démonstrations complètes."
            />

            {/* ── Introduction ── */}
            <Section type="intuition" title="Introduction">
                <p className="mb-2">
                    Les paramètres <Math>{"m"}</Math> et <Math>{"\\sigma"}</Math> d'une population ne sont pas toujours connus (coût, taille).
                    On cherche donc des <strong>estimateurs</strong> pour les approximer à partir d'un échantillon.
                </p>
                <p className="mb-2">
                    La <strong>méthode du maximum de vraisemblance (EMV)</strong> fournit la forme mathématique d'un estimateur.
                    Une fois obtenu, on vérifie s'il respecte les <strong>propriétés désirables</strong>.
                </p>
                <Callout type="insight" title="Intuition de la méthode">
                    On cherche l'estimateur <Math>{"\\hat{\\theta}"}</Math> qui rend la probabilité d'observer l'échantillon <em>a posteriori</em> <strong>maximale</strong>.
                </Callout>
            </Section>

            {/* ── Propriétés désirables ── */}
            <Section type="key" title="I. Propriétés désirables d'un estimateur">
                <div className="space-y-2.5 mb-3">
                    <div className="p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--border))' }}>
                        <p className="font-semibold text-sm mb-0.5">1. Sans biais (ESB)</p>
                        <p className="text-sm mb-1">En moyenne, l'estimateur donne la vraie valeur.</p>
                        <FormulaBox>{"E[\\hat{\\theta}] = \\theta"}</FormulaBox>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--border))' }}>
                        <p className="font-semibold text-sm mb-0.5">2. Efficace</p>
                        <p className="text-sm mb-1">Variance minimale parmi les ESB (borne de FRCD atteinte).</p>
                        <FormulaBox>{"V(\\hat{\\theta}) = \\frac{1}{I(\\theta)} \\quad\\text{où}\\quad I(\\theta) = -E\\left[\\frac{\\partial^2 \\ln L}{\\partial \\theta^2}\\right]"}</FormulaBox>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--border))' }}>
                        <p className="font-semibold text-sm mb-0.5">3. Convergent</p>
                        <p className="text-sm mb-1">En augmentant la taille de l'échantillon, l'estimateur tend vers la vraie valeur.</p>
                        <FormulaBox>{"\\lim_{n \\to \\infty} V(\\hat{\\theta}) = 0"}</FormulaBox>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2))', border: '1px solid rgb(var(--border))' }}>
                        <p className="font-semibold text-sm mb-0.5">4. Exhaustif</p>
                        <p className="text-sm">L'estimateur utilise toute l'information contenue dans l'échantillon.</p>
                    </div>
                </div>
            </Section>

            {/* ── Méthode EMV ── */}
            <Section type="formule" title="II. Étapes de la méthode du maximum de vraisemblance">
                <p className="mb-1 font-semibold text-sm">Étape 1 — Fonction de vraisemblance :</p>
                <FormulaBox label="Cas continu">{"L(x_1, \\ldots, x_n;\\theta) = \\prod_{i=1}^n f(x_i;\\theta)"}</FormulaBox>
                <FormulaBox label="Cas discret">{"L(x_1, \\ldots, x_n;\\theta) = \\prod_{i=1}^n P(X = x_i;\\theta)"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Étape 2 — Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L(\\cdot) = \\sum_{i=1}^n \\ln f(x_i;\\theta)"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Étape 3 — Maximisation :</p>
                <FormulaBox label="CPO" highlight>{"\\frac{\\partial \\ln L}{\\partial \\theta} = 0 \\quad\\Rightarrow\\quad \\hat{\\theta}"}</FormulaBox>
                <FormulaBox label="CSO">{"\\frac{\\partial^2 \\ln L}{\\partial \\theta^2} \\leq 0"}</FormulaBox>
            </Section>

            {/* ══════════ EXERCICE 1 ══════════ */}
            <Section type="formule" title="Exercice 1 — Loi binomiale B(10;p)">
                <p className="mb-2"><strong>Énoncé :</strong> Étude de <Math>{"m"}</Math> entreprises de 10 salariés. <Math>{"K_i"}</Math> = nombre de salariés gagnant {">"} 3 000 € dans l'entreprise <Math>{"i"}</Math>. On a <Math>{"K \\sim B(10;p)"}</Math>.</p>

                <p className="mt-3 mb-1 font-semibold text-sm">Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L = \\sum_{i=1}^m \\left[\\ln C_{10}^{k_i} + k_i \\ln p + (10-k_i)\\ln(1-p)\\right]"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">Dérivée et CPO :</p>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial p} = \\frac{\\sum k_i}{p} - \\frac{\\sum(10-k_i)}{1-p} = 0"}</FormulaBox>
                <FormulaBox highlight>{"\\boxed{\\hat{p} = \\frac{\\sum_{i=1}^m k_i}{10m} = \\frac{\\bar{k}}{10}}"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Propriété 1 — Sans biais :</p>
                <FormulaBox>{"E[\\hat{p}] = \\frac{1}{10m}\\sum_{i=1}^m E[K_i] = \\frac{1}{10m} \\cdot m \\cdot 10p = p \\;\\checkmark"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">Propriété 2 — Convergent :</p>
                <FormulaBox>{"V(\\hat{p}) = \\frac{1}{(10m)^2} \\cdot m \\cdot 10p(1-p) = \\frac{pq}{10m} \\xrightarrow{m \\to \\infty} 0 \\;\\checkmark"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">Propriété 3 — Efficace :</p>
                <FormulaBox>{"I(p) = \\frac{10m}{p(1-p)} \\;\\Rightarrow\\; \\frac{1}{I(p)} = \\frac{pq}{10m} = V(\\hat{p}) \\;\\checkmark"}</FormulaBox>
            </Section>

            {/* ══════════ EXERCICE 2 ══════════ */}
            <Section type="formule" title="Exercice 2 — Densité exponentielle">
                <p className="mb-2"><strong>Densité :</strong> <Math>{"f(x;\\theta) = \\frac{1}{\\theta}e^{-x/\\theta}"}</Math>, <Math>{"x > 0, \\theta > 0"}</Math></p>

                <p className="mt-2 mb-1 font-semibold text-sm">Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L = -n\\ln\\theta - \\frac{\\sum x_i}{\\theta}"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">CPO :</p>
                <FormulaBox>{"\\frac{\\partial \\ln L}{\\partial \\theta} = -\\frac{n}{\\theta} + \\frac{\\sum x_i}{\\theta^2} = 0"}</FormulaBox>
                <FormulaBox highlight>{"\\boxed{\\hat{\\theta} = \\bar{x}}"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Sans biais :</p>
                <p className="text-sm mb-1"><Math>{"E[\\hat{\\theta}] = E[\\bar{X}] = E(X)"}</Math>. Or <Math>{"E(X) = \\int_0^\\infty x \\cdot \\frac{1}{\\theta}e^{-x/\\theta}dx = \\theta\\Gamma(2) = \\theta"}</Math> ✓</p>

                <p className="mt-2 mb-1 font-semibold text-sm">Efficace :</p>
                <p className="text-sm mb-1"><Math>{"V(\\hat{\\theta}) = \\frac{V(X)}{n} = \\frac{\\theta^2}{n}"}</Math> et <Math>{"\\frac{1}{I(\\theta)} = \\frac{\\theta^2}{n}"}</Math> → borne atteinte ✓</p>

                <p className="mt-2 mb-1 font-semibold text-sm">Convergent :</p>
                <p className="text-sm"><Math>{"\\lim_{n\\to\\infty} \\frac{\\theta^2}{n} = 0"}</Math> ✓</p>
            </Section>

            {/* ══════════ EXERCICE 4 ══════════ */}
            <Section type="formule" title="Exercice 4 — Densité avec terme en x·exp(−x²/θ)">
                <p className="mb-2"><strong>Densité :</strong> <Math>{"f(x;\\theta) = \\frac{2}{\\theta}x\\,e^{-x^2/\\theta}"}</Math>, <Math>{"x > 0, \\theta > 0"}</Math></p>

                <p className="mt-2 mb-1 font-semibold text-sm">Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L = n\\ln 2 - n\\ln\\theta + \\sum \\ln x_i - \\frac{\\sum x_i^2}{\\theta}"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">CPO → EMV :</p>
                <FormulaBox highlight>{"\\boxed{\\hat{\\theta} = \\frac{\\sum x_i^2}{n} = \\overline{x^2}}"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Sans biais :</p>
                <p className="text-sm mb-1"><Math>{"E[\\hat{\\theta}] = E(X^2) = \\theta\\Gamma(2) = \\theta"}</Math> ✓</p>

                <p className="mt-2 mb-1 font-semibold text-sm">Efficace :</p>
                <p className="text-sm mb-1"><Math>{"V(X^2) = E(X^4) - [E(X^2)]^2 = 2\\theta^2 - \\theta^2 = \\theta^2"}</Math></p>
                <p className="text-sm mb-1"><Math>{"V(\\hat{\\theta}) = \\frac{\\theta^2}{n} = \\frac{1}{I(\\theta)}"}</Math> ✓</p>

                <p className="mt-2 mb-1 font-semibold text-sm">Convergent :</p>
                <p className="text-sm"><Math>{"\\lim_{n\\to\\infty} \\frac{\\theta^2}{n} = 0"}</Math> ✓</p>
            </Section>

            {/* ══════════ EXERCICE 5 ══════════ */}
            <Section type="formule" title="Exercice 5 — Loi de Bernoulli (grippe)">
                <p className="mb-2"><strong>Énoncé :</strong> <Math>{"X_i = 1"}</Math> si le i-ème individu est grippé, 0 sinon → <Math>{"X_i \\sim B(1;p)"}</Math>.</p>

                <p className="mt-2 mb-1 font-semibold text-sm">Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L = \\sum x_i \\ln p + \\left(n - \\sum x_i\\right)\\ln(1-p)"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">CPO → EMV :</p>
                <FormulaBox highlight>{"\\boxed{\\hat{p} = \\bar{x}}"}</FormulaBox>

                <p className="mt-3 mb-1 font-semibold text-sm">Sans biais :</p>
                <FormulaBox>{"E[\\hat{p}] = \\frac{1}{n}\\sum E[X_i] = \\frac{1}{n} \\cdot np = p \\;\\checkmark"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">Efficace :</p>
                <FormulaBox>{"V(\\hat{p}) = \\frac{p(1-p)}{n} = \\frac{1}{I(p)} \\;\\checkmark"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">Convergent :</p>
                <p className="text-sm"><Math>{"\\lim_{n\\to\\infty} \\frac{p(1-p)}{n} = 0"}</Math> ✓</p>
            </Section>

            {/* ══════════ EXERCICE 6 ══════════ */}
            <Section type="formule" title="Exercice 6 — Loi Normale N(m;σ) — Biais de S²">
                <p className="mb-2"><strong>Densité :</strong> <Math>{"f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\left(-\\frac{(x-m)^2}{2\\sigma^2}\\right)"}</Math></p>

                <p className="mt-2 mb-1 font-semibold text-sm">Log-vraisemblance :</p>
                <FormulaBox>{"\\ln L = -n\\ln\\sigma - \\frac{n}{2}\\ln(2\\pi) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - m)^2"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">EMV de m :</p>
                <FormulaBox highlight>{"\\boxed{\\hat{m} = \\bar{x}}"}</FormulaBox>

                <p className="mt-2 mb-1 font-semibold text-sm">EMV de σ² :</p>
                <FormulaBox highlight>{"\\boxed{\\hat{\\sigma}^2 = S^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2}"}</FormulaBox>

                <p className="mt-3 font-semibold text-sm">Propriétés de <Math>{"\\hat{m}"}</Math> :</p>
                <div className="overflow-x-auto my-2">
                    <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Sans biais</td>
                                <td className="py-1 px-2"><Math>{"E[\\hat{m}] = m"}</Math></td>
                                <td className="py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Efficace</td>
                                <td className="py-1 px-2"><Math>{"V(\\hat{m}) = \\frac{\\sigma^2}{n} = \\frac{1}{I(m)}"}</Math></td>
                                <td className="py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Convergent</td>
                                <td className="py-1 px-2"><Math>{"\\lim_{n\\to\\infty} \\frac{\\sigma^2}{n} = 0"}</Math></td>
                                <td className="py-1 px-2">✅</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="warning" title="⚠️ La variance empirique S² est BIAISÉE !">
                    <p className="mb-1"><Math>{"E(S^2) = \\sigma^2 - \\frac{\\sigma^2}{n} = \\sigma^2\\left(\\frac{n-1}{n}\\right) \\neq \\sigma^2"}</Math></p>
                    <p className="text-sm">Le biais vaut <Math>{"-\\frac{\\sigma^2}{n}"}</Math>.</p>
                </Callout>

                <p className="mt-3 mb-1 font-semibold text-sm">Correction du biais — Variance corrigée :</p>
                <FormulaBox highlight>{"\\boxed{\\hat{S}^2 = S^2 \\cdot \\frac{n}{n-1} = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2}"}</FormulaBox>
                <Callout type="tip" title="À retenir">
                    On divise par <Math>{"n-1"}</Math> (et non <Math>{"n"}</Math>) pour obtenir un estimateur <strong>sans biais</strong> de la variance.
                </Callout>
            </Section>

            {/* ── Tableau récapitulatif ── */}
            <Section type="key" title="Tableau récapitulatif des résultats">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--color-border-default)' }}>
                                <th className="text-left py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>Ex.</th>
                                <th className="text-left py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>Loi</th>
                                <th className="text-left py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>Estimateur</th>
                                <th className="text-center py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>ESB</th>
                                <th className="text-center py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>Eff.</th>
                                <th className="text-center py-1.5 px-2" style={{ color: 'var(--color-text-primary)' }}>Conv.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2">1</td>
                                <td className="py-1 px-2"><Math>{"B(10;p)"}</Math></td>
                                <td className="py-1 px-2"><Math>{"\\hat{p} = \\bar{K}/10"}</Math></td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2">2</td>
                                <td className="py-1 px-2"><Math>{"\\frac{1}{\\theta}e^{-x/\\theta}"}</Math></td>
                                <td className="py-1 px-2"><Math>{"\\hat{\\theta} = \\bar{x}"}</Math></td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2">4</td>
                                <td className="py-1 px-2"><Math>{"\\frac{2}{\\theta}xe^{-x^2/\\theta}"}</Math></td>
                                <td className="py-1 px-2"><Math>{"\\hat{\\theta} = \\overline{x^2}"}</Math></td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2">5</td>
                                <td className="py-1 px-2"><Math>{"B(1;p)"}</Math></td>
                                <td className="py-1 px-2"><Math>{"\\hat{p} = \\bar{x}"}</Math></td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <td className="py-1 px-2">6</td>
                                <td className="py-1 px-2"><Math>{"N(m;\\sigma)"}</Math> → m</td>
                                <td className="py-1 px-2"><Math>{"\\hat{m} = \\bar{x}"}</Math></td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                                <td className="text-center py-1 px-2">✅</td>
                            </tr>
                            <tr>
                                <td className="py-1 px-2">6</td>
                                <td className="py-1 px-2"><Math>{"N(m;\\sigma)"}</Math> → σ²</td>
                                <td className="py-1 px-2"><Math>{"S^2"}</Math></td>
                                <td className="text-center py-1 px-2">❌</td>
                                <td className="text-center py-1 px-2">—</td>
                                <td className="text-center py-1 px-2">—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Conseils ── */}
            <Section type="warning" title="Conseils pratiques">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Échantillon empirique vs théorique :</strong> EMV sur <Math>{"(x_1,\\ldots,x_n)"}</Math>, propriétés sur <Math>{"(X_1,\\ldots,X_n)"}</Math></li>
                    <li><strong>Estimateur biaisé ?</strong> Si <Math>{"E[\\hat{\\theta}] = k\\theta"}</Math>, corriger : <Math>{"\\tilde{\\theta} = \\frac{1}{k}\\hat{\\theta}"}</Math></li>
                    <li><strong>Fonction Gamma :</strong> <Math>{"\\Gamma(n) = (n-1)!"}</Math> pour les intégrales du type <Math>{"\\int_0^\\infty x^a e^{-bx}dx"}</Math></li>
                </ul>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-8', label: '← Chapitre 8', title: "Distributions d'échantillonnage" }}
                next={{ path: '/s4/stats/chapitre-10', label: 'Chapitre 10 →', title: 'Estimation par intervalle de confiance' }}
            />
        </main>
    );
}
