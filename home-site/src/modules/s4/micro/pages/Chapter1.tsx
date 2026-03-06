
import { PageHeader, ChapterNav, Section, Callout, Math, FormulaBox } from '../../../../components';
import { AudioPlayer } from '../../../../components/audio/AudioPlayer';
import { TableOfContents } from '../../../../components/course/TableOfContents';
import { VideoPlayer } from '../../../../components/video/VideoPlayer';
import { AIChatWidget } from '../../../../features/ai-chat/components/AIChatWidget';
import { useChapterProgress } from '../../../../hooks/useChapterProgress';

export function Chapter1() {
    useChapterProgress({
        moduleId: 's4:micro',
        chapterId: 'micro-s4-ch1',
        estimatedMinutes: 80,
    });

    return (
        <main className="course-page w-full flex justify-center px-6" style={{ background: 'var(--color-bg-paper)', minHeight: '100vh' }}>
            <div className="course-zoom-scope w-full max-w-4xl">
                <PageHeader
                    number="Chapitre 1"
                    title="La theorie du consommateur (complements)"
                    description="Fonctions d'utilite, dualite, equations de Slutsky et variations de bien-etre."
                />

                <div className="space-y-4 mb-8">
                    <VideoPlayer title="Video de cours - Chapitre 1" badge="Micro S4" duration="A venir" />
                    <AudioPlayer segmentId="s4-micro-chapitre-1" />
                </div>

                <div className="course-flow">
                    <section id="introduction" data-section-title="Introduction" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            Introduction
                        </h2>
                        <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                            Ce chapitre propose des complements sur la theorie du consommateur. Il approfondit les notions de Licence 1
                            en introduisant les outils mathematiques necessaires a une analyse rigoureuse du comportement du consommateur.
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mb-6 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Varian H., Analyse microeconomique (2008)</li>
                            <li>Varian H., Introduction a la microeconomie (2006)</li>
                            <li>Mas-Colell, Whinston &amp; Green, Microeconomic Theory (1995)</li>
                        </ul>
                        <ol className="list-decimal pl-6 space-y-2 mb-6 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Rappels sur l'equilibre du consommateur</li>
                            <li>La dualite</li>
                            <li>Equations de Slutsky</li>
                            <li>Les variations de bien-etre</li>
                            <li>Synthese examen</li>
                        </ol>
                        <Callout type="important" title="Prerequis">
                            <p>Preferences, courbes d'indifference, contrainte budgetaire et optimisation sous contrainte (Lagrangien).</p>
                        </Callout>
                    </section>

                    <section id="section-1" data-section-title="1. Rappels sur l'equilibre du consommateur" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            1. Rappels sur l'equilibre du consommateur
                        </h2>

                        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>1.1 La fonction d'utilite</h3>
                        <Section type="definition" title="Definition - Fonction d'utilite">
                            <p className="mb-2">La fonction <Math>{'u(x)=u(x_1,\\dots,x_n)'}</Math> associe a chaque panier un niveau de satisfaction.</p>
                            <p>Elle est definie a transformation monotone croissante pres.</p>
                        </Section>
                        <FormulaBox>{`\\frac{\\partial u}{\\partial x_i}dx_i + \\frac{\\partial u}{\\partial x_j}dx_j = 0`}</FormulaBox>
                        <FormulaBox label="TMS">{`TMS_{ij}=-\\frac{dx_j}{dx_i}=\\frac{\\partial u/\\partial x_i}{\\partial u/\\partial x_j}=\\frac{Um_i}{Um_j}`}</FormulaBox>
                        <Callout type="insight" title="Invariance du TMS">
                            <p>Le TMS depend de la forme des courbes d'indifference, pas de la numerotation des niveaux d'utilite.</p>
                        </Callout>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>1.2 Programme de maximisation du consommateur</h3>
                        <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li><Math>{'x=(x_1,\\dots,x_n)'}</Math></li>
                            <li><Math>{'p=(p_1,\\dots,p_n)'}</Math></li>
                            <li><Math>{'B=\\{x\\in X: p\\cdot x\\le R\\}'}</Math></li>
                        </ul>
                        <FormulaBox label="Programme primal" highlight>{`\\max_{x\\in X}u(x)\\quad s.c.\\quad p\\cdot x\\le R`}</FormulaBox>
                        <FormulaBox>{`\\mathcal{L}(x,\\lambda)=u(x)-\\lambda(p\\cdot x-R)`}</FormulaBox>
                        <FormulaBox>{`\\frac{\\partial u(x^*)}{\\partial x_i}=\\lambda p_i\\quad \\forall i,\\qquad p\\cdot x^*=R`}</FormulaBox>
                        <Section type="definition" title="Demandes marshalliennes">
                            <p><Math>{'x_i(p,R)'}</Math> donnent les quantites optimales en fonction de <Math>{'p'}</Math> et <Math>{'R'}</Math>.</p>
                        </Section>
                        <FormulaBox>{`\\frac{\\partial u/\\partial x_i}{\\partial u/\\partial x_j}=\\frac{p_i}{p_j}`}</FormulaBox>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>1.3 Fonction d'utilite indirecte</h3>
                        <Section type="definition" title="Definition - Utilite indirecte">
                            <p><Math>{'v(p,R)=u(x^*(p,R))'}</Math> est le maximum d'utilite atteignable.</p>
                        </Section>
                        <ol className="list-decimal pl-6 space-y-1 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Non croissante en prix, non decroissante en revenu</li>
                            <li><Math>{'v(tp,tR)=v(p,R)'}</Math></li>
                            <li>Quasi-convexe en prix</li>
                            <li>Continue pour <Math>{'p\\gg0, R>0'}</Math></li>
                        </ol>
                    </section>

                    <section id="section-2" data-section-title="2. La dualite" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            2. La dualite
                        </h2>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.1 Fonction de depense et demandes hicksiennes</h3>
                        <FormulaBox label="Fonction de depense" highlight>{`e(p,u)=\\min p\\cdot x\\quad s.c.\\quad u(x)\\ge u`}</FormulaBox>
                        <Section type="definition" title="Demandes hicksiennes">
                            <p><Math>{'h_i(p,u)'}</Math> minimisent la depense pour utilite cible <Math>{'u'}</Math>.</p>
                        </Section>
                        <ol className="list-decimal pl-6 space-y-1 text-[15px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Non decroissante en prix</li>
                            <li><Math>{'e(tp,u)=te(p,u)'}</Math></li>
                            <li>Concave en prix</li>
                            <li>Continue pour <Math>{'p\\gg0'}</Math></li>
                            <li>Lemme de Shephard: <Math>{'h_i(p,u)=\\partial e/\\partial p_i'}</Math></li>
                        </ol>
                        <Callout type="key" title="Matrice de substitution">
                            <p><Math>{'\\left[\\partial h_i/\\partial p_j\\right]=\\left[\\partial^2 e/\\partial p_i\\partial p_j\\right]'}</Math> est symetrique et semi-definie negative.</p>
                        </Callout>
                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>2.2 Les 4 identites fondamentales</h3>
                        <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr style={{ background: 'var(--color-bg-overlay)' }}>
                                            <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>N</th>
                                            <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Identite</th>
                                            <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Interpretation</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                        <tr><td className="px-4 py-2.5">1</td><td className="px-4 py-2.5"><Math>{'e(p,v(p,R))=R'}</Math></td><td className="px-4 py-2.5">Depense min au niveau indirect</td></tr>
                                        <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">2</td><td className="px-4 py-2.5"><Math>{'v(p,e(p,u))=u'}</Math></td><td className="px-4 py-2.5">Utilite retrouvee apres compensation</td></tr>
                                        <tr><td className="px-4 py-2.5">3</td><td className="px-4 py-2.5"><Math>{'x_i(p,R)=h_i(p,v(p,R))'}</Math></td><td className="px-4 py-2.5">Marshallienne = Hicksienne au bon niveau d'utilite</td></tr>
                                        <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">4</td><td className="px-4 py-2.5"><Math>{'h_i(p,u)=x_i(p,e(p,u))'}</Math></td><td className="px-4 py-2.5">Hicksienne = Marshallienne avec revenu compense</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.3 Identite de Roy</h3>
                        <FormulaBox label="Roy" highlight>{`x_i(p,R)=-\\frac{\\partial v/\\partial p_i}{\\partial v/\\partial R}`}</FormulaBox>
                        <FormulaBox>{`0=\\frac{\\partial v}{\\partial p_i}+\\frac{\\partial v}{\\partial R}\\frac{\\partial e}{\\partial p_i}`}</FormulaBox>
                        <FormulaBox>{`\\frac{\\partial e}{\\partial p_i}=h_i(p,u)=x_i(p,R)`}</FormulaBox>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>2.4 Application Cobb-Douglas</h3>
                        <FormulaBox>{`u(x_1,x_2)=x_1^{\\alpha}x_2^{1-\\alpha}`}</FormulaBox>
                        <FormulaBox>{`x_1^*=\\alpha\\frac{R}{p_1},\\qquad x_2^*=(1-\\alpha)\\frac{R}{p_2}`}</FormulaBox>
                        <FormulaBox>{`v(p,R)=\\frac{R}{p_1^{\\alpha}p_2^{1-\\alpha}}`}</FormulaBox>
                        <FormulaBox>{`e(p,u)=u\\,p_1^{\\alpha}p_2^{1-\\alpha}`}</FormulaBox>
                        <FormulaBox>{`h_1^*=u\\alpha\\left(\\frac{p_2}{p_1}\\right)^{1-\\alpha},\\qquad h_2^*=u(1-\\alpha)\\left(\\frac{p_1}{p_2}\\right)^{\\alpha}`}</FormulaBox>
                    </section>

                    <section id="section-3" data-section-title="3. Equations de Slutsky" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            3. Equations de Slutsky
                        </h2>
                        <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                            Effet total = effet de substitution + effet de revenu.
                        </p>
                        <FormulaBox>{`dx_i=\\sum_j\\frac{\\partial x_i}{\\partial p_j}dp_j+\\frac{\\partial x_i}{\\partial R}dR`}</FormulaBox>
                        <FormulaBox>{`dR=\\sum_j x_jdp_j+p\\cdot dx`}</FormulaBox>
                        <FormulaBox>{`S_{ij}=\\frac{\\partial x_i}{\\partial p_j}+\\frac{\\partial x_i}{\\partial R}x_j`}</FormulaBox>
                        <FormulaBox label="Slutsky" highlight>{`\\frac{\\partial x_i}{\\partial p_j}=\\frac{\\partial h_i}{\\partial p_j}-\\frac{\\partial x_i}{\\partial R}x_j(p,R)`}</FormulaBox>
                        <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li><Math>{'\\partial h_i/\\partial p_i\\le0'}</Math> (demande compensee)</li>
                            <li>Bien normal: <Math>{'\\partial x_i/\\partial R>0'}</Math></li>
                            <li>Giffen possible si l'effet revenu domine</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>3.3 Verification Cobb-Douglas</h3>
                        <FormulaBox>{`\\frac{\\partial x_1}{\\partial p_1}=-\\alpha R/p_1^2`}</FormulaBox>
                        <FormulaBox>{`\\frac{\\partial h_1}{\\partial p_1}=\\alpha(\\alpha-1)R/p_1^2`}</FormulaBox>
                        <FormulaBox>{`-(\\partial x_1/\\partial R)x_1=-\\alpha^2R/p_1^2`}</FormulaBox>
                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>3.4 Dotations</h3>
                        <FormulaBox label="Slutsky avec dotations" highlight>{`\\frac{\\partial x_i}{\\partial p_j}=\\frac{\\partial h_i}{\\partial p_j}+\\frac{\\partial x_i}{\\partial R}(\\omega_j-x_j^*)`}</FormulaBox>
                    </section>

                    <section id="section-4" data-section-title="4. Les variations de bien-etre du consommateur" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            4. Les variations de bien-etre du consommateur
                        </h2>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>4.1 Surplus du consommateur</h3>
                        <FormulaBox>{`\\Delta SC=\\int_{p^1}^{p^0}x(p)dp`}</FormulaBox>
                        <Callout type="warning" title="Limite">
                            <p>Exact seulement si l'utilite marginale du revenu est constante (cas quasi-lineaire).</p>
                        </Callout>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>4.2 Equivalent monetaire</h3>
                        <FormulaBox>{`R(p,x)=e(p,u(x))`}</FormulaBox>
                        <FormulaBox>{`\\mu(p;q,R)=e(p,v(q,R))`}</FormulaBox>
                        <FormulaBox>{`R(p,x)=p_1^{\\alpha}p_2^{1-\\alpha}x_1^{\\alpha}x_2^{1-\\alpha}`}</FormulaBox>
                        <FormulaBox>{`\\mu(p;q,R)=\\frac{p_1^{\\alpha}p_2^{1-\\alpha}}{q_1^{\\alpha}q_2^{1-\\alpha}}R`}</FormulaBox>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>4.3 VE et VC</h3>
                        <FormulaBox label="VE" highlight>{`VE=e(p,u')-R`}</FormulaBox>
                        <FormulaBox label="VC" highlight>{`VC=R-e(p',u)`}</FormulaBox>

                        <h3 className="text-xl font-semibold mb-4 mt-10" style={{ color: 'var(--color-text-primary)' }}>4.4 Relation VE, VC, VSC</h3>
                        <FormulaBox>{`VE=\\int_{p^1}^{p^0}h(p,u')dp,\\qquad VC=\\int_{p^1}^{p^0}h(p,u)dp`}</FormulaBox>
                        <Callout type="remember" title="Hierarchie (bien normal, baisse de prix)">
                            <p><Math>{'VC < VSC < VE'}</Math></p>
                        </Callout>
                    </section>

                    <section id="section-5" data-section-title="5. Synthese a savoir pour l'examen" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            5. Synthese a savoir pour l'examen
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>Programme primal: Lagrangien, CPO, demandes marshalliennes, utilite indirecte</li>
                            <li>Programme dual: depense, hicksiennes, Shephard</li>
                            <li>4 identites fondamentales + Roy</li>
                            <li>Slutsky: ES/ER, Cobb-Douglas, dotations</li>
                            <li>Bien-etre: VE, VC, VSC et hierarchie</li>
                        </ul>
                    </section>

                    <section id="annexe" data-section-title="Annexe - Prompts graphiques" className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                            Annexe - Prompts Gemini pour les graphiques
                        </h2>
                        <Section type="graphique" title="Graphique 1 - Dualite maximisation/minimisation">
                            <p>
                                Genere un graphique economique 2D. Axes: GOOD 1 (horizontal) et GOOD 2 (vertical). Montre la dualite
                                du programme du consommateur: (1) deux droites de budget decroissantes en trait plein, (2) trois
                                courbes d'indifference convexes en tirets, (3) un point de tangence unique marque "Maximizes utility /
                                minimizes expenditure". Style academique, noir et blanc, fond blanc.
                            </p>
                        </Section>
                        <Section type="graphique" title="Graphique 2 - Decomposition Slutsky-Hicks">
                            <p>
                                Genere deux graphiques cote a cote montrant la decomposition de Hicks suite a une baisse de p1. Axes:
                                x1 (horizontal) et x2 (vertical). Gauche: droite de budget bleue, courbe d'indifference rose, panier
                                initial. Droite: nouvelle droite de budget plus plate, droite compensatoire cyan passant par le panier
                                initial avec la nouvelle pente, trois paniers optimaux. Fleches "Substitution Effect" et
                                "Income Effect" le long de x1. Style colore, pedagogique.
                            </p>
                        </Section>
                        <Section type="graphique" title="Graphique 3 - Surplus du consommateur">
                            <p>
                                Graphique avec axe vertical "prix" et horizontal "quantite". Courbe de demande decroissante (trait
                                epais). Deux niveaux de prix p0 (haut) et p1 (bas). Aire grisee entre p0 et p1 sous la courbe =
                                variation du surplus (VSC). Style academique, noir et blanc.
                            </p>
                        </Section>
                        <Section type="graphique" title="Graphique 4 - VE et VC (espace des biens)">
                            <p>
                                Deux graphiques cote a cote dans l'espace (GOOD 1, GOOD 2). Baisse du prix du bien 1. Chaque
                                graphique: 2 droites de budget (pentes differentes, etiquetees p et p'), 2 courbes d'indifference
                                (u et u'). VE (gauche): droite supplementaire parallele a p tangente a u' avec accolade EV sur axe
                                vertical. VC (droite): droite parallele a p' tangente a u avec accolade CV sur axe vertical.
                                Noir et blanc, tirets.
                            </p>
                        </Section>
                        <Section type="graphique" title="Graphique 5 - Comparaison VC, VSC, VE">
                            <p>
                                Graphique axes PRICE (vertical) et QUANTITY (horizontal). Trois courbes de demande decroissantes:
                                h(p,u) a gauche, x(p,m) au milieu, h(p,u') a droite. Deux niveaux p0 et p1. Aire sous h(p,u) = VC,
                                sous x(p,m) = consumer surplus, sous h(p,u') = VE. Les trois courbes se croisent a p0.
                                Etiquettes claires. Style academique, noir et blanc.
                            </p>
                        </Section>
                    </section>
                </div>

                <ChapterNav next={{ path: '/s4/micro/chapitre-2', label: 'Chapitre suivant ->', title: 'Chapitre 2' }} />
            </div>

            <TableOfContents />
            <AIChatWidget />
        </main>
    );
}
