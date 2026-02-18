import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math } from '../../../../components';

export function Chapter8() {
    return (
        <main className="max-w-4xl mx-auto px-6">
            <PageHeader
                number="Chapitre 08"
                title="Distributions d'echantillonnage"
                description="Cours complet L2 S4 : normal, Student, proportions, demonstrations exigibles et exercice type integral."
            />

            <Section type="intuition" title="1) Idee centrale : une statistique d'echantillon est une variable aleatoire">
                <p className="mb-2">
                    On observe une population decrite par une variable aleatoire <Math>{"X"}</Math> (moyenne <Math>{"m"}</Math>, variance <Math>{"\\sigma^2"}</Math>, proportion <Math>{"p"}</Math>). On preleve un echantillon i.i.d. :
                </p>
                <FormulaBox>{"(X_1,\\dots,X_n)\\quad \\text{avec } X_i \\stackrel{\\text{i.i.d.}}{\\sim} X"}</FormulaBox>
                <p className="mb-2 text-sm">
                    Les statistiques calculees sur l'echantillon varient d'un tirage a l'autre : elles ont donc une loi.
                </p>

                <p className="mb-1 font-semibold text-sm">Notations essentielles :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li>Population : <Math>{"m=E[X],\\ \\sigma,\\ \\sigma^2,\\ p"}</Math></li>
                    <li>Echantillon observe : <Math>{"(x_1,\\dots,x_n)"}</Math></li>
                    <li>Moyenne : <Math>{"\\overline{X}=\\frac{1}{n}\\sum_{i=1}^n X_i"}</Math> (realisation <Math>{"\\bar{x}"}</Math>)</li>
                    <li>Variance empirique : <Math>{"S^2=\\frac{1}{n}\\sum_{i=1}^n (X_i-\\overline{X})^2"}</Math></li>
                    <li>Variance corrigee : <Math>{"\\hat{S}^2=\\frac{1}{n-1}\\sum_{i=1}^n (X_i-\\overline{X})^2=\\frac{n}{n-1}S^2"}</Math></li>
                    <li>Proportion : si <Math>{"X_i\\in\\{0,1\\}"}</Math>, alors <Math>{"F=\\frac{1}{n}\\sum X_i=\\frac{X}{n}"}</Math> avec <Math>{"X=\\sum X_i"}</Math></li>
                </ul>
            </Section>

            <Section type="key" title="2) Le triptyque : Normal / Student / Proportions">
                <p className="mb-2 text-sm">Reconnaissance du bon modele selon :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>normalite donnee ou approximation via TCL ;</li>
                    <li><Math>{"\\sigma"}</Math> connu ou inconnu ;</li>
                    <li>moyennes ou proportions ;</li>
                    <li>un ou deux echantillons.</li>
                </ul>
            </Section>

            <Section type="formule" title="A) Lois liees a la moyenne (Xbar)">
                <p className="mb-1 font-semibold text-sm">A.1) Population normale et sigma connu</p>
                <FormulaBox highlight>{"\\overline{X}\\sim \\mathcal N\\!\\left(m,\\frac{\\sigma}{\\sqrt{n}}\\right)"}</FormulaBox>
                <FormulaBox>{"U=\\frac{\\overline{X}-m}{\\sigma/\\sqrt{n}}\\sim \\mathcal N(0,1)"}</FormulaBox>
                <p className="mb-1 mt-2 font-semibold text-sm">Methode-type :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li>Identifier <Math>{"m,\\sigma,n"}</Math>.</li>
                    <li>Ecrire la loi de <Math>{"\\overline{X}"}</Math>.</li>
                    <li>Centrer-reduire vers <Math>{"U\\sim\\mathcal N(0,1)"}</Math>.</li>
                    <li>Lire la table : <Math>{"F_U(z)=\\mathbb P(U\\le z)"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">A.2) Sigma inconnu : Student</p>
                <FormulaBox highlight>{"T=\\frac{\\overline{X}-m}{S/\\sqrt{n-1}}=\\frac{\\overline{X}-m}{\\hat{S}/\\sqrt{n}}\\sim t(n-1)"}</FormulaBox>
                <p className="mb-1 mt-2 font-semibold text-sm">Methode-type :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li>Normalite + <Math>{"\\sigma"}</Math> inconnu : Student.</li>
                    <li>Construire <Math>{"T"}</Math>.</li>
                    <li>Ecrire la probabilite cherchee.</li>
                    <li>Lire <Math>{"F_T(t)=\\mathbb P(T\\le t)"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">A.3) Normalite non donnee : TCL</p>
                <FormulaBox>{"\\overline{X}\\approx \\mathcal N\\!\\left(m,\\frac{\\sigma}{\\sqrt{n}}\\right)\\quad (n\\ge 30\\text{ en pratique})"}</FormulaBox>
                <p className="text-sm">Dans ce chapitre, on privilegie surtout normalite imposee ou Student si <Math>{"\\sigma"}</Math> inconnu.</p>
            </Section>

            <Section type="formule" title="B) Proportions et binomiale">
                <p className="mb-1 font-semibold text-sm">B.1) Modelisation</p>
                <FormulaBox>{"X_i\\in\\{0,1\\},\\ \\mathbb P(X_i=1)=p,\\ X=\\sum_{i=1}^n X_i\\sim \\mathcal B(n,p),\\ F=\\frac{X}{n}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">B.2) Approximation normale</p>
                <FormulaBox>{"X \\approx \\mathcal N(np,\\sqrt{np(1-p)})"}</FormulaBox>
                <FormulaBox highlight>{"F\\approx \\mathcal N\\!\\left(p,\\sqrt{\\frac{p(1-p)}{n}}\\right)"}</FormulaBox>
                <p className="mb-1 mt-2 font-semibold text-sm">Methode-type :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Identifier <Math>{"p,n"}</Math>.</li>
                    <li>Utiliser <Math>{"F\\approx \\mathcal N\\left(p,\\sqrt{pq/n}\\right)"}</Math> avec <Math>{"q=1-p"}</Math>.</li>
                    <li>Centrer-reduire : <Math>{"U=\\frac{F-p}{\\sqrt{pq/n}}\\approx\\mathcal N(0,1)"}</Math>.</li>
                </ul>
            </Section>

            <Section type="formule" title="C) Differences entre deux echantillons">
                <p className="mb-1 font-semibold text-sm">C.1) Difference de moyennes, sigma1 sigma2 connus</p>
                <FormulaBox highlight>{"\\overline{X}_1-\\overline{X}_2 \\sim \\mathcal N\\!\\left(m_1-m_2,\\ \\sqrt{\\frac{\\sigma_1^2}{n_1}+\\frac{\\sigma_2^2}{n_2}}\\right)"}</FormulaBox>
                <FormulaBox>{"U=\\frac{(\\overline{X}_1-\\overline{X}_2)-(m_1-m_2)}{\\sqrt{\\sigma_1^2/n_1+\\sigma_2^2/n_2}}\\sim\\mathcal N(0,1)"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">C.2) Difference de moyennes, sigmas inconnus, variances egales</p>
                <FormulaBox highlight>{"T=\\frac{(\\overline{X}_1-\\overline{X}_2)-(m_1-m_2)}{\\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}}\\ \\sqrt{\\frac{n_1S_1^2+n_2S_2^2}{n_1+n_2-2}}}\\sim t(n_1+n_2-2)"}</FormulaBox>
                <Callout type="warning" title="Erreur classique a eviter">
                    Ne pas utiliser cette formule si l'enonce ne permet pas l'hypothese <Math>{"\\sigma_1=\\sigma_2"}</Math>.
                </Callout>

                <p className="mb-1 mt-2 font-semibold text-sm">C.3) Difference de proportions</p>
                <FormulaBox>{"F_1-F_2 \\approx \\mathcal N\\!\\left(p_1-p_2,\\ \\sqrt{\\frac{p_1q_1}{n_1}+\\frac{p_2q_2}{n_2}}\\right),\\ q_i=1-p_i"}</FormulaBox>
            </Section>

            <Section type="key" title="D) Demonstrations exigibles">
                <p className="mb-1 font-semibold text-sm">D.1) Loi de Xbar quand X est normale</p>
                <FormulaBox>{"S_n=\\sum_{i=1}^n X_i \\sim \\mathcal N(nm,\\sigma\\sqrt{n})"}</FormulaBox>
                <FormulaBox>{"\\overline{X}=\\frac{S_n}{n}\\sim \\mathcal N\\!\\left(m,\\frac{\\sigma}{\\sqrt{n}}\\right)"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">D.2) Pourquoi Student apparait si sigma est inconnu</p>
                <FormulaBox>{"\\frac{(n-1)\\hat{S}^2}{\\sigma^2}\\sim\\chi^2(n-1),\\quad \\frac{\\overline{X}-m}{\\sigma/\\sqrt{n}}\\sim\\mathcal N(0,1)"}</FormulaBox>
                <FormulaBox highlight>{"T=\\frac{\\frac{\\overline{X}-m}{\\sigma/\\sqrt{n}}}{\\sqrt{\\frac{(n-1)\\hat{S}^2}{\\sigma^2(n-1)}}}=\\frac{\\overline{X}-m}{\\hat{S}/\\sqrt{n}}\\sim t(n-1)"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">D.3) Loi approchee de la proportion F</p>
                <FormulaBox>{"E[X]=np,\\ V[X]=npq,\\ E[F]=p,\\ V[F]=\\frac{pq}{n}"}</FormulaBox>
                <FormulaBox highlight>{"F \\approx \\mathcal N\\!\\left(p,\\sqrt{\\frac{pq}{n}}\\right)"}</FormulaBox>
            </Section>

            <Section type="warning" title="3) Lecture des tables (Normal / Student)">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Normale : <Math>{"F_U(z)=\\mathbb P(U\\le z)"}</Math>, <Math>{"\\mathbb P(U>z)=1-F_U(z)"}</Math>, <Math>{"F_U(-z)=1-F_U(z)"}</Math>.</li>
                    <li>Student : <Math>{"F_T(t)=\\mathbb P(T\\le t)"}</Math>, <Math>{"F_T(-t)=1-F_T(t)"}</Math>, ddl <Math>{"n-1"}</Math> ou <Math>{"n_1+n_2-2"}</Math>.</li>
                </ul>
            </Section>

            <Section type="formule" title="4) Exercice type integral (fusion exercices 1 a 5) : enonce">
                <p className="mb-2 text-sm">
                    Une entreprise etudie deux sites A et B.
                </p>
                <p className="mb-1 font-semibold text-sm">Partie I - Moyenne, sigma connu puis inconnu</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li><Math>{"X\\sim\\mathcal N(m=20,\\sigma=8)"}</Math> sur A, <Math>{"n=64"}</Math> : calculer <Math>{"\\mathbb P(\\overline{X}>21)"}</Math> avec <Math>{"\\sigma"}</Math> connu.</li>
                    <li>Meme question si <Math>{"\\sigma"}</Math> inconnu avec <Math>{"s=7{,}6"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">Partie II - Moyenne avec sigma inconnu (B)</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li><Math>{"m_B=22,\\ n_B=49,\\ \\bar{x}_B=23{,}5,\\ s_B=6"}</Math> : calculer <Math>{"\\mathbb P(\\overline{X}_B>23)"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">Partie III - Defauts et approximation normale</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li><Math>{"p_A=0{,}06,\\ p_B=0{,}05,\\ n_A=n_B=500"}</Math>, variables <Math>{"X_A, X_B"}</Math>.</li>
                    <li>Donner les lois exactes de <Math>{"X_A, X_B"}</Math>.</li>
                    <li>Approcher <Math>{"X_A-X_B"}</Math> et calculer <Math>{"\\mathbb P(X_A-X_B\\ge 1)"}</Math>.</li>
                    <li>Avec <Math>{"F_A=X_A/n_A,\\ F_B=X_B/n_B"}</Math>, calculer <Math>{"\\mathbb P(F_A-F_B>0{,}02)"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">Partie IV - Difference de moyennes</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-2">
                    <li>A : <Math>{"m_A=2500,\\sigma_A=1100"}</Math>, B : <Math>{"m_B=3200,\\sigma_B=1000"}</Math>, <Math>{"n_A=n_B=62"}</Math>.</li>
                    <li>Calculer <Math>{"\\mathbb P(\\overline{X}_B-\\overline{X}_A\\ge 900)"}</Math> si sigmas connus.</li>
                    <li>Meme question si sigmas inconnus avec <Math>{"s_A=s_B=1000"}</Math> et hypothese <Math>{"\\sigma_A=\\sigma_B"}</Math>.</li>
                </ul>

                <p className="mb-1 font-semibold text-sm">Partie V - Proportions</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Usine A : <Math>{"p_A=0{,}04,\\ n=600"}</Math> : calculer <Math>{"\\mathbb P(F_A<0{,}01)"}</Math> puis <Math>{"\\mathbb P(F_A>0{,}05)"}</Math>.</li>
                    <li>Usine B : <Math>{"p_B=0{,}11,\\ n_B=500"}</Math> : calculer <Math>{"\\mathbb P(F_B-F_A>0{,}10)"}</Math>.</li>
                </ul>
            </Section>

            <Section type="key" title="Correction guidee (methodes + calculs)">
                <p className="mb-1 font-semibold text-sm">Partie I-1 : sigma connu</p>
                <FormulaBox>{"\\overline{X}\\sim\\mathcal N\\!\\left(20,\\frac{8}{\\sqrt{64}}\\right)=\\mathcal N(20,1)"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(\\overline{X}>21)=\\mathbb P(U>1)=1-F_U(1)=\\boxed{0{,}1587}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie I-2 : sigma inconnu (Student)</p>
                <FormulaBox>{"T=\\frac{\\overline{X}-20}{S/\\sqrt{63}}\\sim t(63),\\quad t_0=\\frac{21-20}{7{,}6/\\sqrt{63}}\\approx 1{,}045"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(\\overline{X}>21)=\\mathbb P(T>1{,}045)\\approx 0{,}15\\text{ a }0{,}16"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie II : Student sur B</p>
                <FormulaBox>{"T=\\frac{\\overline{X}_B-22}{S_B/\\sqrt{48}}\\sim t(48),\\quad t_0=\\frac{23-22}{6/\\sqrt{48}}\\approx 1{,}155"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(\\overline{X}_B>23)=1-F_{t(48)}(1{,}155)\\approx 0{,}12\\text{ a }0{,}14"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie III-1 : lois exactes</p>
                <FormulaBox>{"X_A\\sim\\mathcal B(500,0{,}06),\\quad X_B\\sim\\mathcal B(500,0{,}05)"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie III-2 : approximation de X_A - X_B</p>
                <FormulaBox>{"X_A-X_B\\approx\\mathcal N(5,\\sqrt{51{,}95})\\approx\\mathcal N(5,7{,}21)"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(X_A-X_B\\ge 1)=\\mathbb P(U\\ge -0{,}555)=F_U(0{,}555)\\approx\\boxed{0{,}709}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie III-3 : difference de proportions</p>
                <FormulaBox>{"F_A-F_B\\approx\\mathcal N(0{,}01,0{,}0144)"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(F_A-F_B>0{,}02)=\\mathbb P(U>0{,}694)\\approx\\boxed{0{,}245}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie IV-1 : difference de moyennes, sigmas connus</p>
                <FormulaBox>{"\\overline{X}_B-\\overline{X}_A\\sim\\mathcal N(700,188{,}8)"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(\\overline{X}_B-\\overline{X}_A\\ge 900)=\\mathbb P(U\\ge 1{,}06)\\approx\\boxed{0{,}145}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie IV-2 : sigmas inconnus, hypothese d'egalite</p>
                <FormulaBox>{"T\\sim t(122),\\quad t_0=\\frac{-900-(-700)}{1000\\sqrt{2/62}}\\approx -1{,}11"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(\\overline{X}_B-\\overline{X}_A\\ge 900)\\approx\\mathbb P(T\\le -1{,}11)\\approx\\boxed{0{,}136}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie V-1 : proportion A</p>
                <FormulaBox>{"F_A\\approx\\mathcal N\\left(0{,}04,\\sqrt{0{,}04\\times0{,}96/600}\\right)=\\mathcal N(0{,}04,0{,}008)"}</FormulaBox>
                <FormulaBox>{"\\mathbb P(F_A<0{,}01)=\\mathbb P(U<-3{,}75)\\approx\\boxed{0}"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(F_A>0{,}05)=\\mathbb P(U>1{,}25)\\approx\\boxed{0{,}106}"}</FormulaBox>

                <p className="mb-1 mt-2 font-semibold text-sm">Partie V-2 : difference de proportions</p>
                <FormulaBox>{"F_B-F_A\\approx\\mathcal N(0{,}07,0{,}0161)"}</FormulaBox>
                <FormulaBox highlight>{"\\mathbb P(F_B-F_A>0{,}10)=\\mathbb P(U>1{,}86)\\approx\\boxed{0{,}03}"}</FormulaBox>
            </Section>

            <Section type="warning" title="5) Checklist examen">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Une moyenne, sigma connu : normale + centrage-reduction.</li>
                    <li>Une moyenne, sigma inconnu : Student <Math>{"t(n-1)"}</Math>.</li>
                    <li>Proportion : binomiale puis <Math>{"F\\approx\\mathcal N(p,\\sqrt{pq/n})"}</Math>.</li>
                    <li>Difference de proportions : normale avec somme des variances.</li>
                    <li>Difference de moyennes, sigmas connus : <Math>{"\\sigma_1^2/n_1+\\sigma_2^2/n_2"}</Math>.</li>
                    <li>Difference de moyennes, sigmas inconnus et <Math>{"\\sigma_1=\\sigma_2"}</Math> : Student poolee <Math>{"t(n_1+n_2-2)"}</Math>.</li>
                    <li>Tables : toujours ramener a <Math>{"F(z)=\\mathbb P(\\le z)"}</Math>, utiliser symetrie et complement.</li>
                </ul>
            </Section>

            <Callout type="tip" title="Fiche ultra compacte">
                Je peux aussi fournir une fiche 1 page avec arbre de decision (moyenne/proportion, 1 ou 2 echantillons, sigma connu/inconnu).
            </Callout>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-7', label: '<- Chapitre 7', title: 'Approximation de lois discretes' }}
                next={{ path: '/s4/stats/chapitre-9', label: 'Chapitre 9 ->', title: 'Estimation Ponctuelle' }}
            />
        </main>
    );
}
