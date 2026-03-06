import { Callout } from '../../../../../components';

export function Introduction() {
    return (
        <section id="introduction" className="mb-16">
            <h2
                className="text-2xl sm:text-3xl font-bold mb-6"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}
            >
                Introduction au cours
            </h2>

            <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Ce cours de macroéconomie (30h CM + 15h TD) porte sur l'<strong>économie ouverte</strong> et la{' '}
                <strong>macroéconomie financière</strong>. Il représente un coefficient 6 et la note finale est calculée
                selon la formule :
            </p>

            <div
                className="rounded-xl p-4 my-4 text-center font-semibold"
                style={{ background: 'var(--color-bg-overlay)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-primary)' }}
            >
                Note totale = (2/3) × Note de Partiel + (1/3) × Note de TD
            </div>

            <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                <strong>Modalités de contrôle des connaissances (MCC) :</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                <li><strong>Partiel</strong> : 1h30 d'exercices et de réflexions intenses</li>
                <li><strong>TD</strong> : Modalités à préciser par l'enseignant</li>
            </ul>

            <p className="text-[15px] leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                <strong>Le cours est organisé en deux grandes parties :</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px]" style={{ color: 'var(--color-text-secondary)' }}>
                <li><strong>Partie 1</strong> : Macroéconomie ouverte (Chapitres 1 et 2)</li>
                <li><strong>Partie 2</strong> : Macroéconomie financière (Chapitres 3 et 4)</li>
            </ul>

            <Callout type="tip" title="Structure du chapitre 1">
                <p>Ce chapitre pose les fondations de la macroéconomie ouverte à travers 4 sections : l'équilibre emplois-ressources, la balance des paiements, le taux de change, et la parité de pouvoir d'achat.</p>
            </Callout>
        </section>
    );
}
