export const DEFAULT_ENABLED_SEMESTER = 's4' as const;
export const DEFAULT_ENABLED_SEMESTER_LABEL = 'S4' as const;

const ENABLED_SEMESTERS = [DEFAULT_ENABLED_SEMESTER] as const;

export type SemesterKey = 's3' | 's4';
export type SemesterLabel = Uppercase<SemesterKey>;
export type EnabledSemesterKey = typeof ENABLED_SEMESTERS[number];
export type EnabledSemesterLabel = Uppercase<EnabledSemesterKey>;

export interface SemesterAccessOption {
    key: SemesterKey;
    value: SemesterLabel;
    label: SemesterLabel;
    title: string;
    subtitle: string;
    disabled: boolean;
    availabilityLabel?: string;
}

export const SEMESTER_ACCESS_OPTIONS: readonly SemesterAccessOption[] = [
    {
        key: 's3',
        value: 'S3',
        label: 'S3',
        title: 'Semestre S3',
        subtitle: 'Ouverture prochaine',
        disabled: true,
        availabilityLabel: 'Bientot',
    },
    {
        key: 's4',
        value: 'S4',
        label: 'S4',
        title: 'Semestre S4',
        subtitle: 'Disponible maintenant',
        disabled: false,
    },
] as const;

export function isEnabledSemester(value: string): value is EnabledSemesterKey {
    return (ENABLED_SEMESTERS as readonly string[]).includes(value);
}

export function normalizeEnabledSemester(value?: string | null): EnabledSemesterKey {
    const normalized = String(value || '').toLowerCase();
    return isEnabledSemester(normalized) ? normalized : DEFAULT_ENABLED_SEMESTER;
}

export function normalizeEnabledSemesterLabel(value?: string | null): EnabledSemesterLabel {
    return normalizeEnabledSemester(value).toUpperCase() as EnabledSemesterLabel;
}

export function getDefaultLearningPath(): string {
    return `/${DEFAULT_ENABLED_SEMESTER}/macro`;
}