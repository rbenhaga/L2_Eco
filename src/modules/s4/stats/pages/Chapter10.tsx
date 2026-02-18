import { Section, PageHeader, ChapterNav } from '../../../../components';

export function Chapter10() {
    return (
        <main className="max-w-6xl px-6">
            <PageHeader
                number="Chapitre 10"
                title="Estimation par intervalle de confiance"
                description="Intervalles de confiance pour les moyennes, proportions et variances."
            />

            <Section type="key" title="Contenu à venir">
                <p>Ce chapitre sera disponible prochainement. Il couvrira la construction d'intervalles de confiance et leur interprétation.</p>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-9', label: '← Chapitre 9', title: 'Estimation Ponctuelle' }}
                next={{ path: '/s4/stats/chapitre-11', label: 'Chapitre 11 →', title: 'Tests d\'hypothèses' }}
            />
        </main>
    );
}
