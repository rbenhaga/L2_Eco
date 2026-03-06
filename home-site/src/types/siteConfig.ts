export type CourseBadgeType = 'new' | 'soon' | '';

export interface TopbarNotification {
  id: number | string;
  subject: string;
  chapter: string;
  time: string;
  subjectKey: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
  createdAt?: number;
  expiresInHours?: number;
}

export interface SiteConfig {
  courseBadges: Record<string, CourseBadgeType>;
  notifications: TopbarNotification[];
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  courseBadges: {
    's4:macro:chapitre-1': 'new',
    's4:micro:chapitre-1': 'soon',
    's4:micro:chapitre-2': 'soon',
    's4:micro:chapitre-3': 'soon',
    's4:micro:chapitre-4': 'soon',
    's4:management:chapitre-1': 'soon',
    's4:management:chapitre-2': 'soon',
    's4:management:chapitre-3': 'soon',
    's4:management:chapitre-4': 'soon',
  },
  notifications: [],
};
