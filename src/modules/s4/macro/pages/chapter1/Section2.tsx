import { Section, Callout, Math, FormulaBox } from '../../../../../components';

export function Section2() {
    return (
        <section
            id="section-2"
            data-section-title="2. La Balance des Paiements"
            className="mb-16"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                Section 2 — La Balance des Paiements
            </h2>

            {/* 2.1 */}
            <div id="s2-1" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.1 Définition de la Balance des Paiements</h3>
                <Section type="definition" title="Balance des Paiements (BdP)">
                    <p>La Balance des Paiements (BdP) est un <strong>état statistique</strong> retraçant les flux économiques et financiers entre résidents et non-résidents au cours d'une période donnée.</p>
                </Section>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>Trois propriétés essentielles :</p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>C'est un <strong>FLUX</strong> (mesuré par an)</li>
                    <li>Le critère est la <strong>RÉSIDENCE</strong>, pas la nationalité</li>
                    <li>Comptabilité en <strong>PARTIE DOUBLE</strong> (comme en comptabilité d'entreprise)</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.1.1 Le critère de résidence</h4>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Règle générale :</strong> Un agent est considéré comme résident s'il a une présence ou une intention de rester supérieure à 1 an.
                </p>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr style={{ background: 'var(--color-bg-overlay)' }}>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Situation</th>
                                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--color-text-primary)' }}>Résident ?</th>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Explication</th>
                            </tr></thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5">Filiale Google à Paris</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-key-text)' }}>OUI</td><td className="px-4 py-2.5">Activité sur le territoire</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">Touriste américain (2 mois)</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-warning-text)' }}>NON</td><td className="px-4 py-2.5">Séjour &lt; 1 an</td></tr>
                                <tr><td className="px-4 py-2.5">Étudiant étranger (Master)</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-key-text)' }}>OUI</td><td className="px-4 py-2.5">Présence durable (&gt; 1 an)</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">Frontalier (Vit en Belgique)</td><td className="px-4 py-2.5 text-center font-bold" style={{ color: 'var(--callout-warning-text)' }}>NON</td><td className="px-4 py-2.5">Centre d'intérêt = Domicile</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.1.2 Le cas particulier du tourisme : une exportation « immobile »</h4>
                <Callout type="insight" title="Principe comptable">
                    <p><strong>La RÉSIDENCE prime sur le TERRITOIRE.</strong></p>
                    <p>Toute dépense effectuée sur le sol français par un non-résident est une <strong>EXPORTATION</strong> de service.</p>
                </Callout>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Exemple concret :</strong> Un touriste américain achète une baguette à Montpellier.
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Le pain ne quitte pas la France (pas d'exportation physique)</li>
                    <li>MAIS des devises étrangères sont entrées dans l'économie française</li>
                    <li>⇒ Comptablement, c'est une <strong>EXPORTATION</strong></li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Comment mesurer ces flux invisibles aux douanes ? La Banque de France croise trois sources :
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Flux financiers</strong> : Données agrégées des paiements par cartes bancaires étrangères</li>
                    <li><strong>Enquêtes</strong> : Sondages aux frontières (aéroports/gares) pour estimer les dépenses en espèces</li>
                    <li><strong>Big Data</strong> : Données de téléphonie mobile (Roaming) pour la durée des séjours</li>
                </ul>
            </div>

            {/* 2.2 */}
            <div id="s2-2" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.2 Structure de la Balance des Paiements (Norme BPM6 du FMI)</h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>La balance se divise en <strong>3 grands comptes</strong> :</p>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.2.1 Le Compte des Transactions Courantes (SC)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>C'est l'économie <strong>RÉELLE</strong>. Il comprend :</p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Biens</strong> (Balance commerciale) : Exportations − Importations de marchandises</li>
                    <li><strong>Services</strong> : Tourisme, transports, services financiers, etc.</li>
                    <li><strong>Revenus primaires</strong> : Dividendes, intérêts, salaires transfrontaliers</li>
                    <li><strong>Revenus secondaires</strong> : Transferts sans contrepartie (envois de fonds, aides)</li>
                </ul>
                <FormulaBox>{`SC = (\\text{Biens} + \\text{Services}) + (\\text{Revenus Primaires} + \\text{Revenus Secondaires})`}</FormulaBox>
                <Callout type="important" title="Note importante">
                    <p><strong>Solde Extérieur (NX)</strong> = Biens + Services uniquement.<br />Le <strong>Solde Courant (SC)</strong> est plus large car il inclut les revenus.</p>
                </Callout>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.2.2 Le Compte de Capital (KA)</h4>
                <Callout type="warning" title="Attention à la confusion !">
                    <p>Ce compte ne recense <strong>PAS</strong> les flux boursiers ou bancaires (qui vont au Compte Financier). Il enregistre les transferts de patrimoine exceptionnels (sans contrepartie).</p>
                </Callout>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Deux composantes majeures :</strong></p>
                <p className="text-[15px] leading-relaxed mb-1" style={{ color: 'var(--color-text-secondary)' }}><strong>➣ Transferts de capital :</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Aides à l'investissement (Fonds structurels européens)</li>
                    <li>Remises de dettes (Créancier → Débiteur)</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-1" style={{ color: 'var(--color-text-secondary)' }}><strong>➣ Actifs non financiers :</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Achat/Vente de brevets (propriété intellectuelle)</li>
                    <li>Quotas d'émission CO₂</li>
                    <li>Terrains d'ambassades</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Le cas de la France (2024) :</strong> Solde +5,4 Mds €. Pourquoi un excédent ? Les versements du plan européen NextGenerationEU pour financer la relance et la transition écologique. En général, le compte de capital est négligeable pour les pays développés.
                </p>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.2.3 Le Compte Financier (SF)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    C'est la contrepartie <strong>FINANCIÈRE</strong> de l'économie réelle. Il enregistre la variation du patrimoine financier national (= propriété des actifs).
                </p>
                <FormulaBox highlight>{`SF = \\Delta\\text{Avoirs} - \\Delta\\text{Engagements}`}</FormulaBox>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Avoirs</strong> : Actifs financiers détenus par les résidents à l'étranger</li>
                    <li><strong>Engagements</strong> : Actifs domestiques détenus par des étrangers</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Interprétation :</strong></p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><Math>{'SF > 0'}</Math> : <strong>Capacité de financement</strong> → Sorties nettes de capitaux → On achète plus d'actifs étrangers qu'ils ne nous en achètent → La France prête au monde</li>
                    <li><Math>{'SF < 0'}</Math> : <strong>Besoin de financement</strong> → Entrées nettes de capitaux → On vend nos actifs ou on s'endette auprès de l'étranger → La France emprunte au monde</li>
                </ul>

                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Les 2 postes principaux à retenir :</strong></p>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr style={{ background: 'var(--color-bg-overlay)' }}>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Poste</th>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Seuil</th>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Logique</th>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Exemple</th>
                            </tr></thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5 font-medium">IDE</td><td className="px-4 py-2.5">&gt; 10% du capital</td><td className="px-4 py-2.5">Industrielle (Contrôle, filiales, long terme)</td><td className="px-4 py-2.5">Renault ouvre une usine en Chine</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5 font-medium">Portefeuille</td><td className="px-4 py-2.5">Actions &lt; 10% ou Obligations</td><td className="px-4 py-2.5">Financière (Rendement pur, arbitrage)</td><td className="px-4 py-2.5">Un Français achète des actions Apple</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>+ Autres postes :</strong> Dérivés, Prêts bancaires, Réserves de change
                </p>
            </div>

            {/* 2.3 */}
            <div id="s2-3" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.3 Comprendre la mécanique du Compte Financier</h3>
                <Section type="exemple" title="Cas pratique : Achat d'une BMW">
                    <p className="mb-2">Un concessionnaire français achète une BMW en Allemagne pour 30 000 €.</p>
                    <p className="mb-1"><strong>Analyse des flux :</strong></p>
                    <ol className="list-decimal pl-5 space-y-1 mb-3">
                        <li><strong>Compte Courant :</strong> La France reçoit un bien (Import) → Débit (−)</li>
                        <li><strong>Compte Financier :</strong> La France livre de la monnaie en contrepartie. La monnaie est un Actif financier. La France cède (exporte) cet actif à l'Allemagne. Une cession d'actif s'enregistre au Crédit (+).</li>
                    </ol>
                </Section>
                <div className="my-6 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-card)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr style={{ background: 'var(--color-bg-overlay)' }}>
                                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--color-text-primary)' }}>Opération (Vue de la France)</th>
                                <th className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>Débit (−)</th>
                                <th className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>Crédit (+)</th>
                            </tr></thead>
                            <tbody style={{ color: 'var(--color-text-secondary)' }}>
                                <tr><td className="px-4 py-2.5">Compte Courant (Import Marchandise)</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-warning-text)' }}>30 000 €</td><td className="px-4 py-2.5 text-right">—</td></tr>
                                <tr style={{ background: 'var(--color-bg-overlay)' }}><td className="px-4 py-2.5">Compte Financier (Baisse des Avoirs)</td><td className="px-4 py-2.5 text-right">—</td><td className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--callout-key-text)' }}>30 000 €</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 2.4 */}
            <div id="s2-4" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.4 Focus sur le Solde Courant français (2024)</h3>
                <FormulaBox>{`SC = (\\text{Biens} + \\text{Services}) + \\text{Revenus (Primaires + Secondaires)}`}</FormulaBox>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <strong>Décomposition France (2024)</strong> selon la Banque de France :
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Biens (Commercial)</strong> : ≈ −60 Mds € (Poids de la facture énergétique & industrie)</li>
                    <li><strong>Services</strong> : ≈ +56,6 Mds € (Tourisme, Luxe, Transports)</li>
                    <li><strong>Revenus nets</strong> : ≈ +6,1 Mds € (Dividendes reçus des filiales du CAC40 à l'étranger)</li>
                </ul>
                <Section type="key" title="Le Paradoxe Français">
                    <p className="mb-2"><strong>Résultat final (SC) : +2,7 Mds €</strong></p>
                    <p className="mb-1">Malgré un déficit commercial lourd, la France dégage une <strong>Capacité de Financement</strong> (<Math>{'S > I'}</Math>).</p>
                    <p>Le déficit des échanges physiques est compensé par la <strong>rente financière</strong> de ses multinationales.</p>
                </Section>
            </div>

            {/* 2.5 */}
            <div id="s2-5" className="mb-12">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>2.5 L'identité comptable fondamentale</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>Comptablement, la Balance des Paiements est toujours à l'équilibre :</p>
                <FormulaBox label="Identité BdP" highlight>{`SC + KA - SF + EO \\equiv 0`}</FormulaBox>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><Math>{'SC + KA'}</Math> = Compte Réel (Économie réelle)</li>
                    <li><Math>{'SF'}</Math> = Compte Financier (Contrepartie financière)</li>
                    <li><Math>{'EO'}</Math> = Erreurs et Omissions (Résidu statistique)</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.5.1 La cohérence économique d'ensemble</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>Le Compte Financier est le miroir de l'économie réelle :</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Si Capacité de Financement (<Math>{'SC + KA > 0'}</Math>)</strong> : Le pays gagne plus qu'il ne dépense → utilise cet excédent pour acheter des actifs étrangers → <Math>{'\\Delta\\text{Avoirs} \\nearrow'}</Math> ⇒ Solde Financier Positif</li>
                    <li><strong>Si Besoin de Financement (<Math>{'SC + KA < 0'}</Math>)</strong> : Le pays dépense plus qu'il ne gagne → doit s'endetter auprès de l'étranger → <Math>{'\\Delta\\text{Engagements} \\nearrow'}</Math> ⇒ Solde Financier Négatif</li>
                </ul>
                <Callout type="key" title="Principe fondamental">
                    <p>(<Math>{'SC + KA'}</Math>) et <Math>{'SF'}</Math> ont (théoriquement) le même signe ! Tout flux réel est compensé par un flux financier en sens inverse.</p>
                </Callout>

                <h4 className="text-lg font-medium mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>2.5.2 Erreurs et Omissions (EO)</h4>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Cas de la France 2024 :</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>Théorie : <Math>{'SC + KA = +2,7 + 5,4 = +8,1'}</Math> Mds €</li>
                    <li>Réalité statistique : <Math>{'SF = -6,9'}</Math> Mds €</li>
                    <li>Écart : <Math>{'EO = SF - (SC + KA) = -6,9 - 8,1 = -15,0'}</Math> Mds €</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    D'où vient EO ? Le poste Erreurs et Omissions n'est pas une variable économique réelle. C'est un <strong>résidu statistique</strong> nécessaire pour faire « tomber juste » l'égalité comptable.
                </p>
                <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}><strong>Les 3 causes structurelles des écarts :</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><strong>Le Timing</strong> : Douanes, banques et entreprises n'enregistrent pas les opérations exactement au même moment (Décalages de dates)</li>
                    <li><strong>Les Sources</strong> : On mélange des données hétérogènes (relevés bancaires précis vs enquêtes ou estimations pour le tourisme)</li>
                    <li><strong>La Couverture</strong> : Certains flux échappent aux radars (économie souterraine, actifs numériques)</li>
                </ul>
                <Callout type="remember" title="Message à retenir">
                    <p>EO ne change pas la réalité économique, il change la <strong>mesure</strong>. C'est la « variable d'ajustement » qui permet de boucler la comptabilité.</p>
                </Callout>
            </div>
        </section>
    );
}
