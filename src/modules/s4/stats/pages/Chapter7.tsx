import { Section, PageHeader, ChapterNav } from '../../../../components';

export function Chapter7() {
    return (
        <main className="max-w-6xl px-6">
            <PageHeader
                number="Chapitre 07"
                title="Approximation de lois discrètes"
                description="Théorème Central Limite et approximations normales."
            />

            <Section type="key" title="Contenu à venir">
                <p>Ce chapitre sera disponible prochainement. Il couvrira l'approximation de lois discrètes par la loi normale.</p>
            </Section>

            <ChapterNav
                prev={{ path: '/s4/stats/chapitre-6', label: '← Chapitre 6', title: 'Lois continues usuelles' }}
                next={{ path: '/s4/stats/chapitre-8', label: 'Chapitre 8 →', title: 'Distributions d\'échantillonnage' }}
            />
        </main>
    );
}
