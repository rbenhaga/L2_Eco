export const DEFAULT_ACADEMIC_YEAR = 'L2' as const;

const ENABLED_ACADEMIC_YEARS = [DEFAULT_ACADEMIC_YEAR] as const;

export type AcademicYearValue = 'L1' | 'L2' | 'L3';
export type EnabledAcademicYearValue = typeof ENABLED_ACADEMIC_YEARS[number];

export interface AcademicYearOption {
    value: AcademicYearValue;
    label: AcademicYearValue;
    title: string;
    subtitle: string;
    disabled: boolean;
    availabilityLabel?: string;
}

export const YEAR_OPTIONS: readonly AcademicYearOption[] = [
    {
        value: 'L1',
        label: 'L1',
        title: 'Licence 1',
        subtitle: 'Ouverture prochaine',
        disabled: true,
        availabilityLabel: 'Bientot',
    },
    {
        value: 'L2',
        label: 'L2',
        title: 'Licence 2',
        subtitle: 'Disponible maintenant',
        disabled: false,
    },
    {
        value: 'L3',
        label: 'L3',
        title: 'Licence 3',
        subtitle: 'Ouverture prochaine',
        disabled: true,
        availabilityLabel: 'Bientot',
    },
] as const;

export function isEnabledAcademicYear(year: string): year is EnabledAcademicYearValue {
    return (ENABLED_ACADEMIC_YEARS as readonly string[]).includes(year);
}

export function normalizeAcademicYear(year?: string | null): EnabledAcademicYearValue {
    const normalized = String(year || '').toUpperCase();
    return isEnabledAcademicYear(normalized) ? normalized : DEFAULT_ACADEMIC_YEAR;
}
