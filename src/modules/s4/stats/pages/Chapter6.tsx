import { Section, PageHeader, ChapterNav } from '../../../../components';

export function Chapter6() {
    return (
        <main className="max-w-6xl px-6">
            <PageHeader
                number="Chapitre 06"
                title="Lois continues usuelles"
                description="Loi normale, Khi-deux, Student et Fisher-Snedecor."
            />

            <Section type="key" title="Contenu à venir">
                <p>Ce chapitre sera disponible prochainement. Il couvrira les lois continues fondamentales utilisées en statistiques inférentielles.</p>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats', label: '← Accueil', title: 'Module Stats S4' }}
                next={{ path: '/s4/stats/chapitre-7', label: 'Chapitre 7 →', title: 'Approximation de lois discrètes' }}
            />
        </main>
    );
}
