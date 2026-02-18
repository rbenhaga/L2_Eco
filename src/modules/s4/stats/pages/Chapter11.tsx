import { Section, PageHeader, ChapterNav } from '../../../../components';

export function Chapter11() {
    return (
        <main className="max-w-6xl px-6">
            <PageHeader
                number="Chapitre 11"
                title="Tests d'hypothèses"
                description="Tests paramétriques sur les moyennes, proportions et variances."
            />

            <Section type="key" title="Contenu à venir">
                <p>Ce chapitre sera disponible prochainement. Il couvrira les tests d'hypothèses (bilatéraux et unilatéraux) et les risques associés.</p>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-10', label: '← Chapitre 10', title: 'Estimation par intervalle de confiance' }}
                next={{ path: '/s4/stats', label: 'Accueil →', title: 'Module Stats S4' }}
            />
        </main>
    );
}
