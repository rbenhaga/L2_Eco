import { Section, Callout, FormulaBox, PageHeader, ChapterNav, Math, Table, TableRow, TableCell } from '../../../../components';

export function Exercices() {
  return (
    <main className="max-w-6xl px-6">
      <PageHeader
        number="Exercices"
        title="Exercices et Méthodes"
        description="Exercices corrigés type TD et méthodes de résolution."
      />

      <Section type="key" title="Exercice 1 : Offre de travail (Modèle classique)">
        <p className="mb-4"><strong>Énoncé :</strong> M. Smith peut travailler avec un salaire nominal de 10€/h. Le coût de son panier de consommation est de 5€/h. Il dort 8h/jour.</p>

        <p className="mb-2"><strong>Questions :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Calculer le salaire réel</li>
          <li>Tracer la contrainte budgétaire</li>
          <li>S'il travaille 7h/jour, quel est son TMS à l'optimum ?</li>
        </ol>

        <p className="mb-2"><strong>Correction :</strong></p>
        
        <p className="mb-2"><strong>1. Salaire réel :</strong></p>
        <p className="mb-4"><Math>{"\\frac{w}{P} = \\frac{10}{5} = 2"}</Math> unités de consommation par heure de travail</p>

        <p className="mb-2"><strong>2. Contrainte budgétaire :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Temps disponible (hors sommeil) : 24 - 8 = 16 heures</li>
          <li>Si Z = heures de loisir, L = 16 - Z = heures de travail</li>
          <li>Consommation max : <Math>{"C = 2 \\times (16 - Z) = 32 - 2Z"}</Math></li>
          <li>Pente de la contrainte = -2 (= salaire réel)</li>
        </ul>

        <p className="mb-2"><strong>3. TMS à l'optimum :</strong></p>
        <p className="mb-4">À l'optimum, le TMS (Taux Marginal de Substitution) égale le salaire réel :</p>
        <p className="mb-4"><strong>TMS = 2</strong></p>
        
        <Callout type="insight" title="Interprétation">
          M. Smith est prêt à renoncer à <strong>2 unités de consommation</strong> pour obtenir <strong>1 heure de loisir supplémentaire</strong>. C'est exactement le "prix" du loisir (= salaire réel).
        </Callout>
      </Section>

      <Section type="key" title="Exercice 2 : Modèle IS/LM complet">
        <p className="mb-4"><strong>Données :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"C = 150 + 0,6(Y-T)"}</Math></li>
          <li><Math>{"I = 300 - 700i"}</Math></li>
          <li><Math>{"G = 250"}</Math>, <Math>{"T = 250"}</Math></li>
          <li><Math>{"\\frac{M^S}{P} = 1800"}</Math></li>
          <li><Math>{"\\frac{M^D}{P} = 1,5Y - 8000i"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Étape 1 : Équation IS</strong></p>
        <p className="mb-2"><Math>{"Y = 150 + 0,6(Y-250) + 300 - 700i + 250"}</Math></p>
        <p className="mb-2"><Math>{"Y = 550 - 150 + 0,6Y - 700i"}</Math></p>
        <p className="mb-2"><Math>{"0,4Y = 550 - 700i"}</Math></p>
        <FormulaBox label="Équation IS">
          {"Y = 1375 - 1750i"}
        </FormulaBox>

        <p className="mb-2 mt-4"><strong>Étape 2 : Équation LM</strong></p>
        <p className="mb-2"><Math>{"1800 = 1,5Y - 8000i"}</Math></p>
        <p className="mb-2"><Math>{"8000i = 1,5Y - 1800"}</Math></p>
        <FormulaBox label="Équation LM">
          {"i = \\frac{3Y}{16000} - 0,225"}
        </FormulaBox>

        <p className="mb-2 mt-4"><strong>Étape 3 : Équilibre</strong></p>
        <p className="mb-2">Substituer LM dans IS :</p>
        <p className="mb-2"><Math>{"Y = 1375 - 1750 \\times \\left(\\frac{3Y}{16000} - 0,225\\right)"}</Math></p>
        <p className="mb-2"><Math>{"Y \\approx 1331,76"}</Math></p>
        <p className="mb-4"><Math>{"i^* \\approx 2,47\\%"}</Math></p>

        <p className="mb-2"><strong>Étape 4 : Vérification</strong></p>
        <p className="mb-2"><Math>{"C^* = 150 + 0,6(1331,76 - 250) = 799,06"}</Math></p>
        <p className="mb-2"><Math>{"I^* = 300 - 700 \\times 0,0247 = 282,71"}</Math></p>
        <p><Math>{"C^* + I^* + G = 799,06 + 282,71 + 250 = 1331,77 \\approx Y^*"}</Math> ✓</p>
      </Section>

      <Section type="key" title="Exercice 3 : Modèle WS/PS">
        <p className="mb-4"><strong>Données :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"P = 1,2W"}</Math> (marge de 20%)</li>
          <li><Math>{"\\frac{W}{P^e} = z(1-3u)"}</Math> avec <Math>{"z = 1"}</Math></li>
          <li>Population active <Math>{"L = 520"}</Math></li>
        </ul>

        <p className="mb-2"><strong>1. Salaire réel PS :</strong></p>
        <p className="mb-4"><Math>{"\\frac{W}{P} = \\frac{1}{1+\\mu} = \\frac{1}{1,2} = 0,833"}</Math></p>

        <p className="mb-2"><strong>2. Taux de chômage naturel :</strong></p>
        <p className="mb-2"><Math>{"1 - 3u_n = 0,833"}</Math></p>
        <p className="mb-2"><Math>{"3u_n = 0,167"}</Math></p>
        <p className="mb-4"><Math>{"u_n = 5,56\\%"}</Math></p>

        <p className="mb-2"><strong>3. Produit naturel :</strong></p>
        <p className="mb-2"><Math>{"N_n = 520 \\times (1 - 0,0556) = 491,1"}</Math></p>
        <p className="mb-4"><Math>{"Y_n = 491,1"}</Math></p>

        <p className="mb-2"><strong>4. Effet d'une hausse de la marge à 25% :</strong></p>
        <p className="mb-2"><Math>{"\\frac{W}{P} = \\frac{1}{1,25} = 0,80"}</Math></p>
        <p className="mb-2"><Math>{"1 - 3u'_n = 0,80"}</Math></p>
        <p><Math>{"u'_n = 6,67\\%"}</Math> → Le chômage augmente</p>
      </Section>

      <Section type="key" title="Exercice 4 : Courbe de Phillips">
        <p className="mb-4"><strong>Données :</strong> <Math>{"\\pi_t = \\pi^e_t + 0.4 - 4u_t"}</Math></p>

        <p className="mb-2"><strong>1. Ratio de sacrifice :</strong></p>
        <p className="mb-4"><Math>{"\\text{Ratio} = \\frac{1}{\\alpha} = \\frac{1}{4} = 0.25"}</Math></p>

        <p className="mb-2"><strong>2. Taux de chômage naturel :</strong></p>
        <p className="mb-4"><Math>{"u_n = \\frac{0.4}{4} = 10\\%"}</Math></p>

        <p className="mb-2"><strong>3. Anticipations nulles, <Math>{"u_t = 4\\%"}</Math> :</strong></p>
        <p className="mb-4"><Math>{"\\pi_t = 0 + 0.4 - 4 \\times 0.04 = 24\\%"}</Math> (constant chaque année)</p>

        <p className="mb-2"><strong>4. Anticipations adaptatives, <Math>{"u_t = 4\\%"}</Math> :</strong></p>
        <Table headers={['Année t', 'uₜ (%)', 'πₜᵉ (%)', 'πₜ (%)']}>
          <TableRow><TableCell>0</TableCell><TableCell>10</TableCell><TableCell>0</TableCell><TableCell>0</TableCell></TableRow>
          <TableRow><TableCell>1</TableCell><TableCell>4</TableCell><TableCell>0</TableCell><TableCell>24</TableCell></TableRow>
          <TableRow><TableCell>2</TableCell><TableCell>4</TableCell><TableCell>24</TableCell><TableCell>48</TableCell></TableRow>
          <TableRow><TableCell>3</TableCell><TableCell>4</TableCell><TableCell>48</TableCell><TableCell>72</TableCell></TableRow>
          <TableRow><TableCell>4</TableCell><TableCell>4</TableCell><TableCell>72</TableCell><TableCell>96</TableCell></TableRow>
          <TableRow><TableCell>5</TableCell><TableCell>4</TableCell><TableCell>96</TableCell><TableCell>120</TableCell></TableRow>
        </Table>
        <p className="mt-2">L'inflation augmente de <strong>24 points de % chaque année</strong> → Spirale inflationniste</p>
      </Section>

      <Section type="key" title="Exercice 5 : Politique monétaire restrictive (AS/AD)">
        <p className="mb-4"><strong>Situation :</strong> Économie à l'équilibre (<Math>{"Y = Y_n"}</Math>), la BC diminue M.</p>

        <p className="mb-2"><strong>Effets à court terme :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li><Math>{"M \\downarrow \\Rightarrow \\frac{M}{P} \\downarrow"}</Math></li>
          <li>Marché monétaire : excès de demande → <Math>{"i \\uparrow"}</Math></li>
          <li><Math>{"i \\uparrow \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}</Math></li>
          <li><Math>{"Y \\downarrow \\Rightarrow u \\uparrow \\Rightarrow P \\downarrow"}</Math></li>
        </ol>
        <p className="mb-4"><strong>Graphiquement :</strong> AD → gauche, nouvel équilibre CT : <Math>{"Y_1 < Y_n"}</Math>, <Math>{"P_1 < P_0"}</Math></p>

        <p className="mb-2"><strong>Ajustement vers le moyen terme :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li><Math>{"P_1 < P^e"}</Math> → Agents révisent : <Math>{"P^e \\downarrow"}</Math></li>
          <li>AS → bas</li>
          <li>Nouvel équilibre : <Math>{"Y_2 > Y_1"}</Math>, <Math>{"P_2 < P_1"}</Math></li>
          <li>Processus continue jusqu'à <Math>{"Y = Y_n"}</Math></li>
        </ol>

        <Callout type="tip" title="Conclusion">
          <Math>{"Y_{MT} = Y_n"}</Math> (retour au produit naturel)<br/>
          <Math>{"P_{MT} < P_0"}</Math> (niveau des prix plus bas)<br/>
          La politique monétaire est <strong>neutre sur Y à moyen terme</strong>.
        </Callout>
      </Section>

      <Section type="intuition" title="Exercice 6 : Trappe à liquidité">
        <p className="mb-4"><strong>Situation :</strong> Suite à un choc négatif, <Math>{"Y < Y_n"}</Math> et <Math>{"i = 0"}</Math>.</p>

        <p className="mb-2"><strong>Différences avec le cas normal :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>La politique monétaire est <strong>inefficace</strong> (taux déjà à 0)</li>
          <li>Le mécanisme d'ajustement par la baisse des prix ne fonctionne pas</li>
          <li><Math>{"P \\downarrow \\Rightarrow \\frac{M}{P} \\uparrow"}</Math> mais i ne peut pas baisser</li>
          <li>Pas de relance de l'investissement</li>
          <li>L'économie peut rester durablement sous <Math>{"Y_n"}</Math></li>
        </ul>

        <Callout type="warning" title="Implication">
          En trappe à liquidité, la politique budgétaire restrictive est <strong>contre-productive</strong>.<br/>
          Il faudrait au contraire une politique budgétaire <strong>expansionniste</strong>.
        </Callout>
      </Section>

      <Section type="warning" title="Astuces pour les exercices">
        <p className="mb-2"><strong>Reconnaître les formules :</strong></p>
        <Table headers={['Si on vous donne...', "C'est..."]}>
          <TableRow>
            <TableCell><Math>{"C = a + c(Y-T)"}</Math></TableCell>
            <TableCell>Fonction de consommation, c = PMC</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"P = (1+\\mu)W"}</Math></TableCell>
            <TableCell>Relation PS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"W = P^eF(u,z)"}</Math></TableCell>
            <TableCell>Relation WS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Math>{"\\frac{M}{P} = L(Y,i)"}</Math></TableCell>
            <TableCell>Équilibre marché monétaire</TableCell>
          </TableRow>
        </Table>

        <p className="mb-2 mt-4"><strong>Sens des effets :</strong></p>
        <Table headers={['Variable ↑', 'Effet sur Y', 'Effet sur i', 'Effet sur u']}>
          <TableRow><TableCell>G</TableCell><TableCell>↑</TableCell><TableCell>↑</TableCell><TableCell>↓ (CT)</TableCell></TableRow>
          <TableRow><TableCell>T</TableCell><TableCell>↓</TableCell><TableCell>↓</TableCell><TableCell>↑ (CT)</TableCell></TableRow>
          <TableRow><TableCell>M</TableCell><TableCell>↑</TableCell><TableCell>↓</TableCell><TableCell>↓ (CT)</TableCell></TableRow>
          <TableRow><TableCell>μ</TableCell><TableCell>-</TableCell><TableCell>-</TableCell><TableCell>↑</TableCell></TableRow>
          <TableRow><TableCell>z</TableCell><TableCell>-</TableCell><TableCell>-</TableCell><TableCell>↑</TableCell></TableRow>
        </Table>
      </Section>

      <Section type="key" title="Exercice 7 : Politique de rigueur budgétaire">
        <p className="mb-4"><strong>Situation initiale :</strong> <Math>{"Y = Y_n"}</Math>, anticipations adaptatives</p>

        <p className="mb-2"><strong>Court terme (G ↓) :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li><Math>{"G \\downarrow"}</Math> → AD se déplace vers la <strong>gauche</strong></li>
          <li>Nouvel équilibre CT : <Math>{"Y_1 < Y_n"}</Math>, <Math>{"P_1 < P_0"}</Math></li>
          <li>Chômage augmente (<Math>{"u_1 > u_n"}</Math>)</li>
          <li>Inflation temporairement plus basse</li>
        </ol>

        <p className="mb-2"><strong>Moyen terme :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li><Math>{"P_1 < P^e"}</Math> → Agents révisent <Math>{"P^e"}</Math> à la baisse</li>
          <li>AS se déplace vers le <strong>bas</strong></li>
          <li>Y augmente progressivement vers <Math>{"Y_n"}</Math></li>
          <li>P continue de baisser</li>
        </ol>

        <p className="mb-2"><strong>Mécanisme de retour à <Math>{"Y_n"}</Math> :</strong></p>
        <p className="mb-4">Baisse des prix anticipés → Baisse des salaires nominaux → Baisse des coûts → Baisse des prix → Hausse de <Math>{"\\frac{M}{P}"}</Math> → Baisse de i → Hausse de I → Retour à <Math>{"Y_n"}</Math></p>

        <Callout type="warning" title="En trappe à liquidité">
          Si i = 0, le mécanisme d'ajustement ne fonctionne pas :<br/>
          • <Math>{"P \\downarrow \\Rightarrow \\frac{M}{P} \\uparrow"}</Math> mais i ne peut pas baisser<br/>
          • Pas de relance de l'investissement<br/>
          • La politique de rigueur budgétaire est <strong>contre-productive</strong>
        </Callout>
      </Section>

      <Section type="key" title="Exercice d'entraînement 1 : IS/LM">
        <p className="mb-4"><strong>Données :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"C = 200 + 0,5(Y-T)"}</Math></li>
          <li><Math>{"I = 250 - 800i"}</Math></li>
          <li><Math>{"G = 200"}</Math>, <Math>{"T = 200"}</Math></li>
          <li><Math>{"\\frac{M^S}{P} = 1500"}</Math></li>
          <li><Math>{"\\frac{M^D}{P} = 2Y - 10000i"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Questions :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Trouver l'équation IS</li>
          <li>Trouver l'équation LM</li>
          <li>Calculer <Math>{"Y^*"}</Math> et <Math>{"i^*"}</Math></li>
          <li>Calculer le multiplicateur keynésien</li>
        </ol>

        <Callout type="tip" title="Réponses attendues">
          1. <Math>{"Y = 1100 - 1600i"}</Math><br/>
          2. <Math>{"i = \\frac{Y}{5000} - 0,15"}</Math><br/>
          3. <Math>{"Y^* \\approx 1015"}</Math>, <Math>{"i^* \\approx 5,3\\%"}</Math><br/>
          4. <Math>{"k = 2"}</Math>
        </Callout>
      </Section>

      <Section type="key" title="Exercice d'entraînement 2 : WS/PS avec syndicats">
        <p className="mb-4"><strong>Données :</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><Math>{"P = 1,30W"}</Math> (marge 30%)</li>
          <li><Math>{"\\frac{W}{P^e} = z(1-3u)"}</Math> avec <Math>{"z = 1"}</Math></li>
          <li><Math>{"L = 300"}</Math></li>
        </ul>

        <p className="mb-2"><strong>Questions :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Calculer <Math>{"u_n"}</Math></li>
          <li>Calculer <Math>{"Y_n"}</Math></li>
          <li>Effet si z passe à 1,1 (hausse du pouvoir syndical)</li>
        </ol>

        <Callout type="tip" title="Réponses attendues">
          1. <Math>{"u_n = 7,69\\%"}</Math><br/>
          2. <Math>{"Y_n = 276,93"}</Math><br/>
          3. Nouveau <Math>{"u_n = 10,26\\%"}</Math> (le chômage augmente)
        </Callout>
      </Section>

      <Section type="key" title="Exercice d'entraînement 3 : Choc de demande AS/AD">
        <p className="mb-4"><strong>Situation initiale :</strong> Économie à l'équilibre de moyen terme (<Math>{"Y = Y_n"}</Math>, <Math>{"P = P^e"}</Math>)</p>
        <p className="mb-4"><strong>Choc :</strong> Le gouvernement augmente les dépenses publiques G</p>

        <p className="mb-2"><strong>Questions :</strong></p>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          <li>Représenter graphiquement l'effet de court terme</li>
          <li>Décrire le mécanisme d'ajustement vers le moyen terme</li>
          <li>Comparer l'équilibre final à l'équilibre initial</li>
        </ol>

        <Callout type="tip" title="Éléments de réponse">
          1. AD → droite, nouvel équilibre CT avec <Math>{"Y_1 > Y_n"}</Math> et <Math>{"P_1 > P_0"}</Math><br/>
          2. <Math>{"P_1 > P^e"}</Math> → révision des anticipations → AS → haut → Y ↓ vers <Math>{"Y_n"}</Math><br/>
          3. MT : <Math>{"Y_{MT} = Y_n"}</Math> (inchangé), <Math>{"P_{MT} > P_0"}</Math> (plus élevé)
        </Callout>
      </Section>

      <ChapterNav
        prev={{ path: '/macro/chapitre-4', label: '← Chapitre précédent', title: 'Politique Économique' }}
        next={{ path: '/qcm', label: 'QCM →', title: 'QCM et Annales' }}
      />
    </main>
  );
}
