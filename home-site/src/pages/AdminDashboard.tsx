import {
    startTransition,
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    BarChart3,
    Bell,
    CheckSquare,
    Download,
    MessageSquare,
    RefreshCw,
    Search,
    Settings,
    Square,
    TrendingUp,
    Users,
    Zap,
    Newspaper,
    type LucideIcon,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { usePresenceHeartbeat } from '../hooks/usePresenceHeartbeat';
import { authFetch } from '../utils/authFetch';
import { DEFAULT_SITE_CONFIG, type SiteConfig, type TopbarNotification } from '../types/siteConfig';
import { macroChapters } from '../modules/s3/macro/data/macroData';
import { microChapters } from '../modules/s3/micro/data/microData';
import { statsChapters } from '../modules/s3/stats/data/statsData';
import { socioChapters } from '../modules/s3/socio/data/socioData';
import { chapters as macroS4Chapters } from '../modules/s4/macro/data/chapters';
import { chapters as microS4Chapters } from '../modules/s4/micro/data/chapters';
import { chapters as statsS4Chapters } from '../modules/s4/stats/data/chapters';
import { chapters as managementS4Chapters } from '../modules/s4/management/data/chapters';
import './AdminDashboard.css';
import { OikoNewsAdminModule } from '../components/admin/OikoNewsAdminModule';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function normalizeSiteConfigPayload(result: unknown): SiteConfig {
    const payload = (result && typeof result === 'object') ? result as Partial<SiteConfig> : {};
    return {
        courseBadges: payload.courseBadges && typeof payload.courseBadges === 'object'
            ? payload.courseBadges
            : DEFAULT_SITE_CONFIG.courseBadges,
        notifications: Array.isArray(payload.notifications) ? payload.notifications : [],
    };
}

interface ProviderHealth {
    provider: string;
    model: string;
    status: 'healthy' | 'degraded' | 'down';
    circuitState: 'closed' | 'open' | 'half-open';
    successCount: number;
    failureCount: number;
    quota: {
        requestsUsed: number;
        requestsRemaining: number;
        requestsLimit: number;
        tokensUsed: number;
        tokensRemaining: number;
        tokensLimit: number;
    };
}

interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string | null;
    createdAt: number;
    lastActive?: number;
    tier: 'free' | 'premium';
    studyTimeSeconds: number;
    completedLessons: number;
    aiUsage: {
        requestsToday: number;
        requestsLimit: number;
        tokensUsed: number;
    };
}

interface DailyStats {
    date: string;
    requests: number;
    tokens: number;
}

interface HourlyStats {
    datetime: string;
    hour: number;
    requests: number;
    tokens: number;
}

interface LifetimeStats {
    totalRequests: number;
    totalTokens: number;
    firstRequestAt: number | null;
    uniqueUsers: number;
    activeDays: number;
}

interface RecentActivity {
    id: number;
    userId: string;
    question: string;
    answer: string;
    provider: string;
    model: string;
    tokens: number;
    latencyMs: number;
    complexity: string;
    createdAt: number;
}

interface TodayByProvider {
    provider: string;
    model: string;
    requests: number;
    tokens: number;
    avgLatency: number;
}

type TimeRange = '24h' | '7d' | '30d';
type BadgeValue = '' | 'new' | 'soon';
type NotificationViewFilter = 'active' | 'expired' | 'all';
type UserSegment = 'all' | 'online' | 'premium' | 'power';
type UserSort = 'activity' | 'premium' | 'online' | 'studyTime' | 'tokens' | 'requests' | 'createdAt' | 'name';
type ProviderTone = 'healthy' | 'watch' | 'critical';
type ProviderStatusFilter = 'all' | ProviderTone;

interface AdminData {
    stats: {
        users: {
            total: number;
            active: number;
            premium: number;
        };
        ai: {
            totalRequests: number;
            todayRequests: number;
            totalTokens: number;
        };
        subscriptions: {
            active: number;
            mrr: number;
        };
    };
    users: User[];
    providers: ProviderHealth[];
    dailyStats: DailyStats[];
    hourlyStats: HourlyStats[];
    lifetimeStats: LifetimeStats;
    recentActivity: RecentActivity[];
    todayByProvider: TodayByProvider[];
    poolQuota: {
        requestsTotal: number;
        requestsUsed: number;
        requestsRemaining: number;
        tokensTotal: number;
        tokensUsed: number;
        tokensRemaining: number;
        resetsAt: string;
        note: string;
    };
}

type CourseCatalogEntry = {
    semester: 'S3' | 'S4';
    subject: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
    subjectLabel: string;
    chapterLabel: string;
    chapterTitle: string;
    key: string;
};

type DashboardTab = {
    id: 'overview' | 'users' | 'providers' | 'content' | 'notifications' | 'oiko';
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
};

type ChartPoint = {
    key: string;
    label: string;
    tooltipLabel: string;
    requests: number;
};

type ProviderViewModel = ProviderHealth & {
    tone: ProviderTone;
    tokenRatio: number;
    requestRatio: number;
    usageRatio: number;
    successRate: number;
    shortModel: string;
    todayRequests: number;
    todayLatency: number;
};

type NotificationViewModel = {
    notification: TopbarNotification;
    index: number;
    createdAt: number;
    expiresAt: number | null;
    isExpired: boolean;
    hours: number;
};

type ActivityUserOption = {
    uid: string;
    label: string;
    email: string;
};

const DASHBOARD_TABS: DashboardTab[] = [
    { id: 'overview', label: 'Pilotage', shortLabel: 'Pilotage', description: 'Vue globale et arbitrage rapide.', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', shortLabel: 'Users', description: 'Comptes actifs, premium et usage.', icon: Users },
    { id: 'providers', label: 'Providers', shortLabel: 'IA', description: 'Sante et capacite du pool IA.', icon: Activity },
    { id: 'content', label: 'Contenu', shortLabel: 'Contenu', description: 'Badges, organisation et publication des cours.', icon: Settings },
    { id: 'notifications', label: 'Notifications', shortLabel: 'Notif', description: 'Topbar, annonces actives et previsualisation.', icon: Bell },
    { id: 'oiko', label: 'Oiko News', shortLabel: 'Oiko', description: 'Quotas, usage quotidien et preview site / email.', icon: Newspaper },
];

const TIME_RANGE_OPTIONS: Array<{ value: TimeRange; label: string }> = [
    { value: '24h', label: '24 h' },
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
];

const USER_SEGMENTS: Array<{ value: UserSegment; label: string }> = [
    { value: 'all', label: 'Tous' },
    { value: 'online', label: 'En ligne' },
    { value: 'premium', label: 'Premium' },
    { value: 'power', label: 'Usage élevé' },
];

const USER_SORT_OPTIONS: Array<{ value: UserSort; label: string }> = [
    { value: 'activity', label: 'Activité récente' },
    { value: 'premium', label: 'Premium d’abord' },
    { value: 'online', label: 'En ligne d’abord' },
    { value: 'studyTime', label: 'Temps étudié' },
    { value: 'tokens', label: 'Tokens IA' },
    { value: 'requests', label: 'Requêtes du jour' },
    { value: 'createdAt', label: 'Plus récents' },
    { value: 'name', label: 'Nom A-Z' },
];

const PROVIDER_STATUS_FILTERS: Array<{ value: ProviderStatusFilter; label: string }> = [
    { value: 'all', label: 'Tous' },
    { value: 'critical', label: 'Critiques' },
    { value: 'watch', label: 'Sous tension' },
    { value: 'healthy', label: 'Sains' },
];

const NOTIFICATION_FILTERS: Array<{ value: NotificationViewFilter; label: string }> = [
    { value: 'active', label: 'Actives' },
    { value: 'expired', label: 'Expirées' },
    { value: 'all', label: 'Toutes' },
];

const BADGE_OPTIONS: Array<{ value: BadgeValue; label: string }> = [
    { value: '', label: 'Aucun' },
    { value: 'new', label: 'Nouveau' },
    { value: 'soon', label: 'Bientôt' },
];

const NOTIFICATION_EXPIRY_OPTIONS = [
    { value: 24, label: '24 heures' },
    { value: 72, label: '3 jours' },
    { value: 168, label: '7 jours' },
    { value: 720, label: '30 jours' },
    { value: -1, label: 'Sans expiration' },
];

function createS3Entries(
    subject: 'macro' | 'micro' | 'stats' | 'socio',
    subjectLabel: string,
    chapters: Array<{ number: string; title: string; path: string }>
): CourseCatalogEntry[] {
    return chapters.map((chapter) => {
        const chapterSlug = chapter.path.split('/').filter(Boolean).pop() || '';
        return {
            semester: 'S3',
            subject,
            subjectLabel,
            chapterLabel: `Chapitre ${chapter.number}`,
            chapterTitle: chapter.title,
            key: `s3:${subject}:${chapterSlug}`,
        };
    });
}

function createS4Entries(
    subject: 'macro' | 'micro' | 'stats' | 'management',
    subjectLabel: string,
    chapters: Array<{ id: string; title: string; subtitle?: string; description?: string }>
): CourseCatalogEntry[] {
    return chapters.map((chapter) => {
        const chapterNumber = chapter.id.replace('ch', '');
        return {
            semester: 'S4',
            subject,
            subjectLabel,
            chapterLabel: `Chapitre ${chapterNumber}`,
            chapterTitle: chapter.subtitle || chapter.description || chapter.title,
            key: `s4:${subject}:chapitre-${chapterNumber}`,
        };
    });
}

const COURSE_CATALOG: CourseCatalogEntry[] = [
    ...createS3Entries('macro', 'Macro', macroChapters),
    ...createS3Entries('micro', 'Micro', microChapters),
    ...createS3Entries('stats', 'Stats', statsChapters),
    ...createS3Entries('socio', 'Sociologie', socioChapters),
    ...createS4Entries('macro', 'Macro', macroS4Chapters),
    ...createS4Entries('micro', 'Micro', microS4Chapters),
    ...createS4Entries('stats', 'Stats', statsS4Chapters),
    ...createS4Entries('management', 'Management', managementS4Chapters),
];

function safeRatio(value: number, total: number) {
    if (!Number.isFinite(total) || total <= 0) return 0;
    if (!Number.isFinite(value) || value <= 0) return 0;
    return value / total;
}

function clampPercent(value: number) {
    return `${Math.min(Math.max(value, 0), 100)}%`;
}

function formatPercent(ratio: number) {
    return `${Math.round(Math.max(0, ratio) * 100)} %`;
}

function formatCompactNumber(value: number) {
    return new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(
        Number.isFinite(value) ? value : 0
    );
}

function formatTokenNumber(value: number) {
    const safeValue = Number.isFinite(value) ? value : 0;
    if (safeValue >= 1_000_000) return `${(safeValue / 1_000_000).toFixed(1)} M`;
    if (safeValue >= 1_000) return `${(safeValue / 1_000).toFixed(1)} k`;
    return safeValue.toLocaleString('fr-FR');
}

function formatStudyTime(seconds: number) {
    const safeSeconds = Math.max(0, Math.round(Number(seconds) || 0));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    if (hours <= 0) return `${minutes} min`;
    return `${hours} h ${String(minutes).padStart(2, '0')}`;
}

function formatDate(value?: number | null, unit: 'ms' | 's' = 'ms') {
    if (!value) return 'Jamais';
    const timestamp = unit === 's' ? value * 1000 : value;
    return new Date(timestamp).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatHoursLabel(hours: number) {
    if (hours < 0) return 'Sans expiration';
    if (hours === 24) return '24 heures';
    if (hours === 72) return '3 jours';
    if (hours === 168) return '7 jours';
    if (hours === 720) return '30 jours';
    return `${hours} heures`;
}

function normalizeModelLabel(model: string) {
    const lastSegment = model.split('/').pop() || model;
    return lastSegment.replace(/-/g, ' ');
}

function isUserOnline(lastActive?: number) {
    if (!lastActive) return false;
    return Date.now() - lastActive < 5 * 60 * 1000;
}

function getProviderTone(provider: ProviderHealth, tokenRatio: number, requestRatio: number): ProviderTone {
    const usageRatio = Math.max(tokenRatio, requestRatio);
    if (provider.circuitState === 'open' || provider.status === 'down' || usageRatio >= 0.9) return 'critical';
    if (provider.circuitState === 'half-open' || provider.status === 'degraded' || usageRatio >= 0.65) return 'watch';
    return 'healthy';
}

function getProviderToneLabel(tone: ProviderTone) {
    if (tone === 'critical') return 'Critique';
    if (tone === 'watch') return 'Sous tension';
    return 'Sain';
}

function getNotificationMeta(notification: TopbarNotification, index: number): NotificationViewModel {
    const createdAt = Number(notification.createdAt) > 0 ? Number(notification.createdAt) : Date.now();
    const hours = Number(notification.expiresInHours);
    const finiteHours = Number.isFinite(hours) ? hours : 168;
    const expiresAt = finiteHours >= 0 ? createdAt + finiteHours * 60 * 60 * 1000 : null;
    return {
        notification,
        index,
        createdAt,
        expiresAt,
        isExpired: Boolean(expiresAt && Date.now() > expiresAt),
        hours: finiteHours,
    };
}

function providerLookupKey(provider: string, model: string) {
    return `${provider}::${model}`;
}

type SectionHeaderProps = { title: string; description?: string; action?: ReactNode };

function SectionHeader({ title, description, action }: SectionHeaderProps) {
    return (
        <div className="admin-section-header">
            <div className="admin-section-copy">
                <h2 className="admin-section-title">{title}</h2>
                {description ? <p className="admin-section-description">{description}</p> : null}
            </div>
            {action ? <div className="admin-section-actions">{action}</div> : null}
        </div>
    );
}

type MetricCardProps = {
    icon: LucideIcon;
    label: string;
    value: string;
    helper: string;
    tone?: 'accent' | 'success' | 'warning' | 'info';
};

function MetricCard({ icon: Icon, label, value, helper, tone = 'accent' }: MetricCardProps) {
    return (
        <article className={clsx('admin-metric-card', `admin-metric-card--${tone}`)}>
            <div className="admin-metric-card__icon">
                <Icon className="h-5 w-5" />
            </div>
            <div className="admin-metric-card__body">
                <p className="admin-metric-card__label">{label}</p>
                <p className="admin-metric-card__value">{value}</p>
                <p className="admin-metric-card__helper">{helper}</p>
            </div>
        </article>
    );
}

type StatusPillProps = { tone: 'healthy' | 'watch' | 'critical' | 'neutral'; children: ReactNode };

function StatusPill({ tone, children }: StatusPillProps) {
    return <span className={clsx('admin-status-pill', `admin-status-pill--${tone}`)}>{children}</span>;
}

type FilterChipProps = { active: boolean; onClick: () => void; children: ReactNode };

function FilterChip({ active, onClick, children }: FilterChipProps) {
    return (
        <button type="button" onClick={onClick} className={clsx('admin-filter-chip', active && 'is-active')}>
            {children}
        </button>
    );
}

type ProgressStatProps = {
    label: string;
    valueLabel: string;
    helper?: string;
    ratio: number;
    tone?: 'accent' | 'success' | 'warning' | 'critical';
};

function ProgressStat({ label, valueLabel, helper, ratio, tone = 'accent' }: ProgressStatProps) {
    return (
        <div className="admin-progress-stat">
            <div className="admin-progress-stat__row">
                <span>{label}</span>
                <strong>{valueLabel}</strong>
            </div>
            <div className="admin-progress-bar">
                <span
                    className={clsx('admin-progress-bar__fill', `admin-progress-bar__fill--${tone}`)}
                    style={{ width: clampPercent(ratio * 100) }}
                />
            </div>
            {helper ? <p className="admin-progress-stat__helper">{helper}</p> : null}
        </div>
    );
}

type EmptyStateProps = { icon: LucideIcon; title: string; description: string };

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
    return (
        <div className="admin-empty-state">
            <div className="admin-empty-state__icon">
                <Icon className="h-5 w-5" />
            </div>
            <p className="admin-empty-state__title">{title}</p>
            <p className="admin-empty-state__description">{description}</p>
        </div>
    );
}

type BadgeSelectorProps = { value: BadgeValue; onChange: (value: BadgeValue) => void };

function BadgeSelector({ value, onChange }: BadgeSelectorProps) {
    return (
        <div className="admin-badge-selector" role="group" aria-label="Choisir un badge">
            {BADGE_OPTIONS.map((option) => (
                <button
                    key={option.value || 'empty'}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={clsx(
                        'admin-badge-selector__button',
                        `admin-badge-selector__button--${option.value || 'none'}`,
                        value === option.value && 'is-active'
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

type ActivityStreamPanelProps = {
    activityUserFilter: string;
    activityUsers: ActivityUserOption[];
    expandedActivityId: number | null;
    filteredActivity: RecentActivity[];
    setActivityUserFilter: (value: string) => void;
    setExpandedActivityId: (value: number | null) => void;
    userDirectory: Map<string, User>;
};

function ActivityStreamPanel({
    activityUserFilter,
    activityUsers,
    expandedActivityId,
    filteredActivity,
    setActivityUserFilter,
    setExpandedActivityId,
    userDirectory,
}: ActivityStreamPanelProps) {
    return (
        <article className="admin-panel">
            <SectionHeader
                title="Flux des conversations"
                description="100 dernières interactions, filtrables par compte, avec la réponse IA complète."
                action={(
                    <select
                        value={activityUserFilter}
                        onChange={(event) => setActivityUserFilter(event.target.value)}
                        className="admin-select"
                    >
                        <option value="">Tous les utilisateurs</option>
                        {activityUsers.map((activityUser) => (
                            <option key={activityUser.uid} value={activityUser.uid}>
                                {activityUser.label}{activityUser.email ? ` • ${activityUser.email}` : ''}
                            </option>
                        ))}
                    </select>
                )}
            />

            <div className="admin-activity-stream">
                {filteredActivity.length === 0 ? (
                    <EmptyState
                        icon={MessageSquare}
                        title="Aucune conversation"
                        description="Aucune interaction ne correspond au filtre courant."
                    />
                ) : (
                    filteredActivity.map((activity) => {
                        const activityUser = userDirectory.get(activity.userId);
                        const isExpanded = expandedActivityId === activity.id;
                        return (
                            <article key={activity.id} className={clsx('admin-activity-card', isExpanded && 'is-open')}>
                                <button
                                    type="button"
                                    className="admin-activity-card__summary"
                                    onClick={() => setExpandedActivityId(isExpanded ? null : activity.id)}
                                >
                                    <div className="admin-activity-card__main">
                                        <div className="admin-activity-card__head">
                                            <p className="admin-activity-card__title">
                                                {activityUser?.displayName || `${activity.userId.slice(0, 8)}…`}
                                            </p>
                                            <p className="admin-activity-card__meta">
                                                {formatDate(activity.createdAt, 's')}
                                                <span>•</span>
                                                <span>{activity.provider}</span>
                                                <span>•</span>
                                                <span>{activity.model}</span>
                                            </p>
                                        </div>
                                        <p className="admin-activity-card__question">{activity.question}</p>
                                    </div>
                                    <div className="admin-activity-card__stats">
                                        <span>{activity.tokens.toLocaleString('fr-FR')} tokens</span>
                                        <span>{activity.latencyMs} ms</span>
                                    </div>
                                </button>

                                {isExpanded ? (
                                    <div className="admin-activity-card__details">
                                        <div className="admin-activity-card__detail-block">
                                            <p className="admin-activity-card__detail-label">Question complète</p>
                                            <p>{activity.question}</p>
                                        </div>
                                        <div className="admin-activity-card__detail-block">
                                            <p className="admin-activity-card__detail-label">Réponse IA</p>
                                            <div className="admin-activity-card__answer">
                                                {activity.answer || 'Réponse non disponible.'}
                                            </div>
                                        </div>
                                        <div className="admin-activity-card__detail-row">
                                            <span>Complexité : <strong>{activity.complexity || 'N/A'}</strong></span>
                                            <span>Utilisateur : <strong>{activityUser?.email || activity.userId}</strong></span>
                                        </div>
                                    </div>
                                ) : null}
                            </article>
                        );
                    })
                )}
            </div>
        </article>
    );
}

export default function AdminDashboard() {
    const { user } = useAuth();
    usePresenceHeartbeat(user?.uid);

    const [data, setData] = useState<AdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<DashboardTab['id']>('overview');
    const [refreshing, setRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('24h');
    const [activityUserFilter, setActivityUserFilter] = useState('');
    const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
    const [expandedActivityId, setExpandedActivityId] = useState<number | null>(null);
    const [userSearch, setUserSearch] = useState('');
    const [userSegment, setUserSegment] = useState<UserSegment>('all');
    const [userSort, setUserSort] = useState<UserSort>('activity');
    const [providerSearch, setProviderSearch] = useState('');
    const [providerStatusFilter, setProviderStatusFilter] = useState<ProviderStatusFilter>('all');
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
    const [savedSiteConfig, setSavedSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
    const [siteConfigLoading, setSiteConfigLoading] = useState(false);
    const [siteConfigSaving, setSiteConfigSaving] = useState(false);
    const [siteConfigError, setSiteConfigError] = useState<string | null>(null);
    const [badgeSemesterFilter, setBadgeSemesterFilter] = useState<'all' | 'S3' | 'S4'>('all');
    const [badgeSubjectFilter, setBadgeSubjectFilter] = useState<'all' | 'macro' | 'micro' | 'stats' | 'socio' | 'management'>('all');
    const [badgeSearch, setBadgeSearch] = useState('');
    const [selectedCourseKeys, setSelectedCourseKeys] = useState<string[]>([]);
    const [bulkBadgeValue, setBulkBadgeValue] = useState<BadgeValue>('');
    const [notificationViewFilter, setNotificationViewFilter] = useState<NotificationViewFilter>('active');

    const deferredUserSearch = useDeferredValue(userSearch);
    const deferredProviderSearch = useDeferredValue(providerSearch);
    const deferredBadgeSearch = useDeferredValue(badgeSearch);

    const fetchAdminData = useCallback(async (showRefreshing = false) => {
        if (!user?.uid) return;

        try {
            if (showRefreshing) setRefreshing(true);
            const response = await authFetch(`${API_URL}/api/admin/stats`);
            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.message || 'Impossible de charger les données admin');
            }

            const result = await response.json();
            setData(result);
            setLastSyncedAt(Date.now());
            setError(null);
        } catch (fetchError: unknown) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue');
        } finally {
            setLoading(false);
            if (showRefreshing) setRefreshing(false);
        }
    }, [user?.uid]);

    const fetchSiteConfig = useCallback(async () => {
        try {
            setSiteConfigLoading(true);
            setSiteConfigError(null);
            const response = await fetch(`${API_URL}/api/site-config?ts=${Date.now()}`, {
                cache: 'no-store',
            });
            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.message || 'Impossible de charger la configuration');
            }

            const result = await response.json();
            const nextConfig = normalizeSiteConfigPayload(result);
            setSiteConfig(nextConfig);
            setSavedSiteConfig(nextConfig);
        } catch (fetchError: unknown) {
            setSiteConfigError(fetchError instanceof Error ? fetchError.message : 'Erreur de configuration');
        } finally {
            setSiteConfigLoading(false);
        }
    }, []);

    const saveSiteConfig = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setSiteConfigSaving(true);
            const response = await authFetch(`${API_URL}/api/admin/site-config`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(siteConfig),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.message || 'Impossible d’enregistrer la configuration');
            }

            const result = await response.json();
            const nextConfig: SiteConfig = {
                courseBadges: result?.config?.courseBadges || {},
                notifications: Array.isArray(result?.config?.notifications) ? result.config.notifications : [],
            };
            setSiteConfig(nextConfig);
            setSavedSiteConfig(nextConfig);
            setSiteConfigError(null);
        } catch (saveError: unknown) {
            setSiteConfigError(saveError instanceof Error ? saveError.message : 'Erreur de sauvegarde');
        } finally {
            setSiteConfigSaving(false);
        }
    }, [siteConfig, user?.uid]);

    useEffect(() => {
        if (!user?.uid) return;
        void fetchAdminData();
        void fetchSiteConfig();
        const interval = window.setInterval(() => {
            void fetchAdminData();
        }, 15000);
        return () => window.clearInterval(interval);
    }, [fetchAdminData, fetchSiteConfig, user?.uid]);

    useEffect(() => {
        document.body.classList.add('admin-route');
        return () => {
            document.body.classList.remove('admin-route');
        };
    }, []);

    const handleTabChange = (tabId: DashboardTab['id']) => {
        startTransition(() => {
            setSelectedTab(tabId);
        });
    };

    const exportData = () => {
        if (!data) return;
        const payload = {
            exportedAt: new Date().toISOString(),
            analytics: data,
            siteConfig,
        };
        const json = JSON.stringify(payload, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `admin-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const chartData = useMemo<ChartPoint[]>(() => {
        if (!data) return [];

        if (timeRange === '24h') {
            if (data.hourlyStats?.length > 0) {
                return data.hourlyStats.map((point) => ({
                    key: point.datetime,
                    label: `${point.hour}h`,
                    tooltipLabel: formatDate(new Date(point.datetime).getTime()),
                    requests: point.requests || 0,
                }));
            }

            return Array.from({ length: 24 }, (_, index) => {
                const date = new Date(Date.now() - (23 - index) * 60 * 60 * 1000);
                return {
                    key: date.toISOString(),
                    label: `${date.getHours()}h`,
                    tooltipLabel: formatDate(date.getTime()),
                    requests: 0,
                };
            });
        }

        const dailyPoints = [...(data.dailyStats || [])].sort(
            (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime()
        );
        const rangeStart = new Date();
        rangeStart.setDate(rangeStart.getDate() - (timeRange === '7d' ? 7 : 30));

        return dailyPoints
            .filter((point) => new Date(point.date) >= rangeStart)
            .map((point) => {
                const date = new Date(point.date);
                return {
                    key: point.date,
                    label: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                    tooltipLabel: date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
                    requests: point.requests || 0,
                };
            });
    }, [data, timeRange]);

    const chartPeak = useMemo(() => {
        return chartData.reduce<ChartPoint | null>((currentPeak, point) => {
            if (!currentPeak || point.requests > currentPeak.requests) return point;
            return currentPeak;
        }, null);
    }, [chartData]);

    const chartTotalRequests = useMemo(
        () => chartData.reduce((total, point) => total + point.requests, 0),
        [chartData]
    );

    const chartAverageRequests = useMemo(
        () => (chartData.length > 0 ? chartTotalRequests / chartData.length : 0),
        [chartData, chartTotalRequests]
    );

    const userDirectory = useMemo(() => new Map((data?.users || []).map((item) => [item.uid, item])), [data]);

    const activityUsers = useMemo<ActivityUserOption[]>(() => {
        if (!data?.recentActivity) return [];
        const uniqueIds = [...new Set(data.recentActivity.map((activity) => activity.userId))];
        return uniqueIds.map((uid) => {
            const knownUser = userDirectory.get(uid);
            return {
                uid,
                label: knownUser?.displayName || `${uid.slice(0, 8)}…`,
                email: knownUser?.email || '',
            };
        });
    }, [data, userDirectory]);

    const filteredActivity = useMemo(() => {
        if (!data?.recentActivity) return [];
        return data.recentActivity.filter((activity) => !activityUserFilter || activity.userId === activityUserFilter);
    }, [activityUserFilter, data]);

    const providerTodayMap = useMemo(
        () => new Map((data?.todayByProvider || []).map((item) => [providerLookupKey(item.provider, item.model), item])),
        [data]
    );

    const providerCards = useMemo<ProviderViewModel[]>(() => {
        if (!data?.providers) return [];

        return data.providers
            .map((provider) => {
                const todayStats = providerTodayMap.get(providerLookupKey(provider.provider, provider.model));
                const tokenRatio = safeRatio(provider.quota.tokensUsed, provider.quota.tokensLimit);
                const requestRatio = safeRatio(provider.quota.requestsUsed, provider.quota.requestsLimit);
                const successRate = safeRatio(provider.successCount, provider.successCount + provider.failureCount);

                return {
                    ...provider,
                    tone: getProviderTone(provider, tokenRatio, requestRatio),
                    tokenRatio,
                    requestRatio,
                    usageRatio: Math.max(tokenRatio, requestRatio),
                    successRate,
                    shortModel: normalizeModelLabel(provider.model),
                    todayRequests: todayStats?.requests || 0,
                    todayLatency: todayStats?.avgLatency || 0,
                };
            })
            .sort((left, right) => {
                const toneRank: Record<ProviderTone, number> = { critical: 0, watch: 1, healthy: 2 };
                if (toneRank[left.tone] !== toneRank[right.tone]) return toneRank[left.tone] - toneRank[right.tone];
                return right.usageRatio - left.usageRatio;
            });
    }, [data, providerTodayMap]);

    const providerCounts = useMemo(
        () => ({
            healthy: providerCards.filter((provider) => provider.tone === 'healthy').length,
            watch: providerCards.filter((provider) => provider.tone === 'watch').length,
            critical: providerCards.filter((provider) => provider.tone === 'critical').length,
        }),
        [providerCards]
    );

    const poolRequestsRatio = safeRatio(data?.poolQuota.requestsUsed || 0, data?.poolQuota.requestsTotal || 0);
    const poolTokensRatio = safeRatio(data?.poolQuota.tokensUsed || 0, data?.poolQuota.tokensTotal || 0);

    const poolTone: ProviderTone = useMemo(() => {
        if (providerCounts.critical > 0 || Math.max(poolRequestsRatio, poolTokensRatio) >= 0.9) return 'critical';
        if (providerCounts.watch > 0 || Math.max(poolRequestsRatio, poolTokensRatio) >= 0.65) return 'watch';
        return 'healthy';
    }, [poolRequestsRatio, poolTokensRatio, providerCounts.critical, providerCounts.watch]);

    const premiumShare = useMemo(() => safeRatio(data?.stats.users.premium || 0, data?.stats.users.total || 0), [data]);
    const activeShare = useMemo(() => safeRatio(data?.stats.users.active || 0, data?.stats.users.total || 0), [data]);
    const aiAdoptionShare = useMemo(
        () => safeRatio(data?.lifetimeStats.uniqueUsers || 0, data?.stats.users.total || 0),
        [data]
    );
    const poolPeakUsage = Math.max(poolRequestsRatio, poolTokensRatio);
    const poolAvailablePercent = Math.max(0, 100 - Math.round(poolPeakUsage * 100));
    const activityTone: StatusPillProps['tone'] =
        activeShare >= 0.4 ? 'healthy' : activeShare >= 0.15 ? 'watch' : activeShare > 0 ? 'neutral' : 'critical';
    const poolResetLabel = useMemo(() => {
        if (!data?.poolQuota.resetsAt) return 'Réinitialisation inconnue';
        const resetAt = new Date(data.poolQuota.resetsAt);
        if (Number.isNaN(resetAt.getTime())) return 'Réinitialisation inconnue';
        return `Réinitialisation ${resetAt.toLocaleString('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    }, [data]);

    const filteredUsers = useMemo(() => {
        if (!data?.users) return [];
        const search = deferredUserSearch.trim().toLowerCase();

        return data.users
            .filter((item) => {
                if (userSegment === 'online' && !isUserOnline(item.lastActive)) return false;
                if (userSegment === 'premium' && item.tier !== 'premium') return false;
                if (userSegment === 'power' && safeRatio(item.aiUsage.requestsToday, item.aiUsage.requestsLimit) < 0.7) return false;
                if (!search) return true;
                return `${item.displayName} ${item.email} ${item.uid}`.toLowerCase().includes(search);
            })
            .sort((left, right) => {
                switch (userSort) {
                    case 'premium':
                        if (Number(right.tier === 'premium') !== Number(left.tier === 'premium')) {
                            return Number(right.tier === 'premium') - Number(left.tier === 'premium');
                        }
                        break;
                    case 'online':
                        if (Number(isUserOnline(right.lastActive)) !== Number(isUserOnline(left.lastActive))) {
                            return Number(isUserOnline(right.lastActive)) - Number(isUserOnline(left.lastActive));
                        }
                        break;
                    case 'studyTime':
                        if (right.studyTimeSeconds !== left.studyTimeSeconds) {
                            return right.studyTimeSeconds - left.studyTimeSeconds;
                        }
                        break;
                    case 'tokens':
                        if (right.aiUsage.tokensUsed !== left.aiUsage.tokensUsed) {
                            return right.aiUsage.tokensUsed - left.aiUsage.tokensUsed;
                        }
                        break;
                    case 'requests':
                        if (right.aiUsage.requestsToday !== left.aiUsage.requestsToday) {
                            return right.aiUsage.requestsToday - left.aiUsage.requestsToday;
                        }
                        break;
                    case 'createdAt':
                        if (right.createdAt !== left.createdAt) {
                            return right.createdAt - left.createdAt;
                        }
                        break;
                    case 'name':
                        return left.displayName.localeCompare(right.displayName, 'fr', { sensitivity: 'base' });
                    case 'activity':
                    default:
                        if ((right.lastActive || 0) !== (left.lastActive || 0)) {
                            return (right.lastActive || 0) - (left.lastActive || 0);
                        }
                        break;
                }

                if ((right.lastActive || 0) !== (left.lastActive || 0)) {
                    return (right.lastActive || 0) - (left.lastActive || 0);
                }
                return right.aiUsage.tokensUsed - left.aiUsage.tokensUsed;
            });
    }, [data, deferredUserSearch, userSegment, userSort]);

    const filteredProviders = useMemo(() => {
        const search = deferredProviderSearch.trim().toLowerCase();
        return providerCards.filter((provider) => {
            if (providerStatusFilter !== 'all' && provider.tone !== providerStatusFilter) return false;
            if (!search) return true;
            return `${provider.provider} ${provider.model} ${provider.shortModel}`.toLowerCase().includes(search);
        });
    }, [deferredProviderSearch, providerCards, providerStatusFilter]);

    const filteredCourses = useMemo(() => {
        const search = deferredBadgeSearch.trim().toLowerCase();
        return COURSE_CATALOG.filter((course) => {
            if (badgeSemesterFilter !== 'all' && course.semester !== badgeSemesterFilter) return false;
            if (badgeSubjectFilter !== 'all' && course.subject !== badgeSubjectFilter) return false;
            if (!search) return true;
            return `${course.semester} ${course.subjectLabel} ${course.chapterLabel} ${course.chapterTitle} ${course.key}`
                .toLowerCase()
                .includes(search);
        });
    }, [badgeSemesterFilter, badgeSubjectFilter, deferredBadgeSearch]);

    const visibleCourseKeys = useMemo(() => filteredCourses.map((course) => course.key), [filteredCourses]);

    const selectedVisibleCount = useMemo(
        () => visibleCourseKeys.filter((key) => selectedCourseKeys.includes(key)).length,
        [selectedCourseKeys, visibleCourseKeys]
    );

    const allVisibleSelected = visibleCourseKeys.length > 0 && visibleCourseKeys.every((key) => selectedCourseKeys.includes(key));

    const badgeStats = useMemo(() => {
        return COURSE_CATALOG.reduce(
            (accumulator, course) => {
                const badge = siteConfig.courseBadges[course.key] || '';
                if (badge === 'new') accumulator.new += 1;
                if (badge === 'soon') accumulator.soon += 1;
                if (!badge) accumulator.none += 1;
                return accumulator;
            },
            { new: 0, soon: 0, none: 0 }
        );
    }, [siteConfig.courseBadges]);

    const notificationItems = useMemo(
        () => siteConfig.notifications.map((notification, index) => getNotificationMeta(notification, index)),
        [siteConfig.notifications]
    );

    const filteredNotifications = useMemo(() => {
        return notificationItems.filter((item) => {
            if (notificationViewFilter === 'active') return !item.isExpired;
            if (notificationViewFilter === 'expired') return item.isExpired;
            return true;
        });
    }, [notificationItems, notificationViewFilter]);

    const activeNotifications = useMemo(
        () => notificationItems.filter((item) => !item.isExpired),
        [notificationItems]
    );

    const hasUnsavedChanges = useMemo(
        () => JSON.stringify(siteConfig) !== JSON.stringify(savedSiteConfig),
        [savedSiteConfig, siteConfig]
    );

    const selectedTabMeta = DASHBOARD_TABS.find((tab) => tab.id === selectedTab) || DASHBOARD_TABS[0];

    const setBadgeForCourse = (key: string, value: BadgeValue) => {
        setSiteConfig((previous) => ({
            ...previous,
            courseBadges: {
                ...previous.courseBadges,
                [key]: value,
            },
        }));
    };

    const toggleCourseSelection = (courseKey: string) => {
        setSelectedCourseKeys((previous) => (
            previous.includes(courseKey)
                ? previous.filter((key) => key !== courseKey)
                : [...previous, courseKey]
        ));
    };

    const toggleSelectVisible = () => {
        if (allVisibleSelected) {
            setSelectedCourseKeys((previous) => previous.filter((key) => !visibleCourseKeys.includes(key)));
            return;
        }
        setSelectedCourseKeys((previous) => Array.from(new Set([...previous, ...visibleCourseKeys])));
    };

    const applyBulkBadge = () => {
        if (selectedCourseKeys.length === 0) return;
        setSiteConfig((previous) => {
            const nextBadges = { ...previous.courseBadges };
            for (const key of selectedCourseKeys) nextBadges[key] = bulkBadgeValue;
            return { ...previous, courseBadges: nextBadges };
        });
    };

    const updateNotification = (
        index: number,
        field: 'subject' | 'chapter' | 'time' | 'subjectKey' | 'expiresInHours',
        value: string | number
    ) => {
        setSiteConfig((previous) => ({
            ...previous,
            notifications: previous.notifications.map((notification, notificationIndex) => (
                notificationIndex === index ? { ...notification, [field]: value } : notification
            )),
        }));
    };

    const addNotification = () => {
        setSiteConfig((previous) => ({
            ...previous,
            notifications: [
                {
                    id: Date.now(),
                    subject: 'S4',
                    chapter: 'Nouveau contenu disponible',
                    time: 'À l’instant',
                    subjectKey: 'macro',
                    createdAt: Date.now(),
                    expiresInHours: 168,
                },
                ...previous.notifications,
            ],
        }));
    };

    const removeNotification = (index: number) => {
        setSiteConfig((previous) => ({
            ...previous,
            notifications: previous.notifications.filter((_, notificationIndex) => notificationIndex !== index),
        }));
    };

    if (loading) {
        return (
            <div className="admin-dashboard-page admin-clean admin-dashboard-page--centered">
                <div className="admin-state-card">
                    <div className="admin-state-card__spinner" />
                    <p className="admin-state-card__title">Chargement du cockpit admin…</p>
                    <p className="admin-state-card__description">
                        Synchronisation des statistiques, des providers et de la configuration publique.
                    </p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="admin-dashboard-page admin-clean admin-dashboard-page--centered">
                <div className="admin-state-card admin-state-card--error">
                    <div className="admin-state-card__icon">
                        <AlertCircle className="h-7 w-7" />
                    </div>
                    <p className="admin-state-card__title">Le dashboard n’a pas pu démarrer</p>
                    <p className="admin-state-card__description">
                        {error || 'Impossible de charger les données admin.'}
                    </p>
                    <button type="button" className="admin-button admin-button--primary" onClick={() => window.location.reload()}>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-page admin-clean">
            <div className="admin-dashboard-shell">
                <header className="admin-hero-panel">
                    <div className="admin-hero-panel__top">
                        <div className="admin-hero-panel__copy">
                            <p className="admin-hero-panel__eyebrow">Administration</p>
                            <h1 className="admin-hero-panel__title">Panel admin</h1>
                            <p className="admin-hero-panel__subtitle">
                                Lecture d'exploitation dense, rapide et sans bruit pour piloter la plateforme.
                            </p>
                        </div>
                        <div className="admin-hero-panel__actions">
                            <Link to="/" className="admin-button admin-button--ghost">
                                Revenir au site
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <button
                                type="button"
                                className="admin-button admin-button--ghost"
                                onClick={() => fetchAdminData(true)}
                                disabled={refreshing}
                            >
                                <RefreshCw className={clsx('h-4 w-4', refreshing && 'animate-spin')} />
                                Rafraîchir
                            </button>
                            <button type="button" className="admin-button admin-button--primary" onClick={exportData}>
                                <Download className="h-4 w-4" />
                                Export JSON
                            </button>
                        </div>
                    </div>

                    <div className="admin-hero-panel__status-row">
                        <StatusPill tone={poolTone}>
                            {poolTone === 'critical'
                                ? 'Attention immédiate'
                                : poolTone === 'watch'
                                    ? 'Sous surveillance'
                                    : 'Plateforme stable'}
                        </StatusPill>
                        <p className="admin-hero-panel__meta">
                            <span>{selectedTabMeta.label}</span>
                            <span>•</span>
                            <span>Sync auto toutes les 15 s</span>
                            <span>•</span>
                            <span>{lastSyncedAt ? `Dernière sync : ${formatDate(lastSyncedAt)}` : 'Première sync en attente'}</span>
                            <span>•</span>
                            <span>{user?.email || 'admin'}</span>
                        </p>
                    </div>

                    <div className="admin-metric-grid admin-metric-grid--compact">
                        <MetricCard
                            icon={Users}
                            label="Utilisateurs"
                            value={data.stats.users.total.toLocaleString('fr-FR')}
                            helper={`${data.stats.users.active} en ligne • ${data.stats.users.premium} premium`}
                            tone="accent"
                        />
                        <MetricCard
                            icon={MessageSquare}
                            label="Demandes aujourd’hui"
                            value={data.stats.ai.todayRequests.toLocaleString('fr-FR')}
                            helper={`${formatCompactNumber(data.stats.ai.totalRequests)} au total`}
                            tone="info"
                        />
                        <MetricCard
                            icon={TrendingUp}
                            label="Providers critiques"
                            value={providerCounts.critical.toLocaleString('fr-FR')}
                            helper={`${providerCounts.watch} sous tension`}
                            tone={providerCounts.critical > 0 ? 'warning' : 'success'}
                        />
                        <MetricCard
                            icon={Zap}
                            label="Configuration"
                            value={activeNotifications.length.toLocaleString('fr-FR')}
                            helper={hasUnsavedChanges ? 'Modifications en attente' : 'Configuration synchronisée'}
                            tone={hasUnsavedChanges ? 'warning' : 'success'}
                        />
                    </div>

                    <nav className="admin-tab-bar" aria-label="Sections du dashboard">
                        {DASHBOARD_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabChange(tab.id)}
                                className={clsx('admin-tab-pill', selectedTab === tab.id && 'is-active')}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="admin-workspace">
                    <aside className="admin-sidebar">
                        <nav className="admin-sidebar-card admin-tab-nav" aria-label="Sections du dashboard">
                            {DASHBOARD_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => handleTabChange(tab.id)}
                                    className={clsx('admin-tab-button', selectedTab === tab.id && 'is-active')}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    <div className="admin-tab-button__copy">
                                        <span className="admin-tab-button__label">{tab.label}</span>
                                        <span className="admin-tab-button__description">{tab.description}</span>
                                    </div>
                                </button>
                            ))}
                        </nav>

                        <section className="admin-sidebar-card">
                            <p className="admin-sidebar-card__eyebrow">Vue active</p>
                            <h2 className="admin-sidebar-card__title">{selectedTabMeta.label}</h2>
                            <p className="admin-sidebar-card__description">{selectedTabMeta.description}</p>

                            {selectedTab === 'overview' ? (
                                <div className="admin-sidebar-list">
                                    <div className="admin-sidebar-list__item">
                                        <span>Providers critiques</span>
                                        <strong>{providerCounts.critical}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Utilisateurs en ligne</span>
                                        <strong>{data.stats.users.active}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Notifications actives</span>
                                        <strong>{activeNotifications.length}</strong>
                                    </div>
                                </div>
                            ) : null}

                            {selectedTab === 'users' ? (
                                <div className="admin-sidebar-list">
                                    <div className="admin-sidebar-list__item">
                                        <span>Résultats</span>
                                        <strong>{filteredUsers.length}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Premium</span>
                                        <strong>{data.stats.users.premium}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Usage élevé</span>
                                        <strong>{data.users.filter((item) => safeRatio(item.aiUsage.requestsToday, item.aiUsage.requestsLimit) >= 0.7).length}</strong>
                                    </div>
                                </div>
                            ) : null}

                            {selectedTab === 'providers' ? (
                                <div className="admin-sidebar-list">
                                    <div className="admin-sidebar-list__item">
                                        <span>Sains</span>
                                        <strong>{providerCounts.healthy}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Sous tension</span>
                                        <strong>{providerCounts.watch}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Critiques</span>
                                        <strong>{providerCounts.critical}</strong>
                                    </div>
                                </div>
                            ) : null}

                            {selectedTab === 'content' ? (
                                <div className="admin-sidebar-list">
                                    <div className="admin-sidebar-list__item">
                                        <span>Badges actifs</span>
                                        <strong>{badgeStats.new + badgeStats.soon}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Cours visibles</span>
                                        <strong>{filteredCourses.length}</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Modifs en attente</span>
                                        <strong>{hasUnsavedChanges ? 'Oui' : 'Non'}</strong>
                                    </div>
                                </div>
                            ) : null}

                            {selectedTab === 'oiko' ? (
                                <div className="admin-sidebar-list">
                                    <div className="admin-sidebar-list__item">
                                        <span>Objectif</span>
                                        <strong>Newsletter media</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Suivi</span>
                                        <strong>Quotas et previews</strong>
                                    </div>
                                    <div className="admin-sidebar-list__item">
                                        <span>Rendu</span>
                                        <strong>Site vs email</strong>
                                    </div>
                                </div>
                            ) : null}
                        </section>

                        <section className="admin-sidebar-card">
                            <p className="admin-sidebar-card__eyebrow">Raccourcis</p>
                            <div className="admin-shortcut-stack">
                                <button type="button" className="admin-shortcut" onClick={() => handleTabChange('overview')}>
                                    Voir le pilotage global
                                </button>
                                <button type="button" className="admin-shortcut" onClick={() => handleTabChange('providers')}>
                                    Vérifier les providers
                                </button>
                                <button type="button" className="admin-shortcut" onClick={() => handleTabChange('content')}>
                                    Publier du contenu
                                </button>
                                <button type="button" className="admin-shortcut" onClick={() => handleTabChange('oiko')}>
                                    Controler Oiko News
                                </button>
                            </div>

                            <div className="admin-sidebar-note">
                                <p className="admin-sidebar-note__title">Statut configuration</p>
                                <p className="admin-sidebar-note__value">
                                    {siteConfigSaving
                                        ? 'Enregistrement en cours…'
                                        : hasUnsavedChanges
                                            ? 'Des changements attendent une validation.'
                                            : 'Tout est synchronisé.'}
                                </p>
                            </div>
                        </section>
                    </aside>

                    <main className="admin-main">
                        {selectedTab === 'overview' ? (
                            <div className="admin-main-stack">
                                <section className="admin-overview-grid">
                                    <article className="admin-panel admin-panel--featured">
                                        <SectionHeader
                                            title="Trafic IA"
                                            description={
                                                timeRange === '24h'
                                                    ? 'Lecture fine sur les dernières 24 heures.'
                                                    : timeRange === '7d'
                                                        ? 'Vision de la dernière semaine.'
                                                        : 'Lecture longue sur les 30 derniers jours.'
                                            }
                                            action={(
                                                <div className="admin-segmented-control">
                                                    {TIME_RANGE_OPTIONS.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            className={clsx('admin-segmented-control__button', timeRange === option.value && 'is-active')}
                                                            onClick={() => setTimeRange(option.value)}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        />

                                        <div className="admin-chart">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData} margin={{ top: 12, right: 12, left: -12, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="adminChartFill" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.32} />
                                                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                                                    <XAxis
                                                        dataKey="label"
                                                        tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />
                                                    <YAxis
                                                        tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        allowDecimals={false}
                                                        width={28}
                                                    />
                                                    <Tooltip
                                                        labelFormatter={(_value, payload) => {
                                                            const firstPoint = payload?.[0]?.payload as ChartPoint | undefined;
                                                            return firstPoint?.tooltipLabel || '';
                                                        }}
                                                        formatter={(value) => {
                                                            const numericValue = Number(value) || 0;
                                                            return [`${numericValue.toLocaleString('fr-FR')} requêtes`, 'Volume'];
                                                        }}
                                                        contentStyle={{
                                                            background: 'var(--color-bg-raised)',
                                                            border: '1px solid var(--color-border-default)',
                                                            borderRadius: '16px',
                                                            boxShadow: 'var(--shadow-lg)',
                                                        }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="requests"
                                                        stroke="var(--color-accent)"
                                                        strokeWidth={2.5}
                                                        fill="url(#adminChartFill)"
                                                        fillOpacity={1}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="admin-inline-stats">
                                            <div className="admin-inline-stat admin-inline-stat--accent">
                                                <span className="admin-inline-stat__label">Volume</span>
                                                <strong className="admin-inline-stat__value">{chartTotalRequests.toLocaleString('fr-FR')}</strong>
                                            </div>
                                            <div className="admin-inline-stat admin-inline-stat--neutral">
                                                <span className="admin-inline-stat__label">Moyenne</span>
                                                <strong className="admin-inline-stat__value">
                                                    {Math.round(chartAverageRequests).toLocaleString('fr-FR')} req / point
                                                </strong>
                                            </div>
                                            <div className="admin-inline-stat admin-inline-stat--warning">
                                                <span className="admin-inline-stat__label">Pic</span>
                                                <strong className="admin-inline-stat__value">
                                                    {chartPeak ? `${chartPeak.requests.toLocaleString('fr-FR')} • ${chartPeak.tooltipLabel}` : 'Aucun pic'}
                                                </strong>
                                            </div>
                                        </div>
                                    </article>

                                </section>

                                <section className="admin-overview-compact-grid">
                                    <article className={clsx('admin-panel admin-panel--compact admin-overview-focus-card', `admin-overview-focus-card--${poolTone}`)}>
                                        <SectionHeader
                                            title="Pool IA"
                                            description="État global, marge réelle et tension du pool."
                                        />

                                        <div className="admin-diagnostic-layout">
                                            <div className="admin-diagnostic-lead">
                                                <StatusPill tone={poolTone}>
                                                    {poolTone === 'critical'
                                                        ? 'Critique'
                                                        : poolTone === 'watch'
                                                            ? 'Sous surveillance'
                                                            : 'Sain'}
                                                </StatusPill>
                                                <strong className="admin-diagnostic-value">{poolAvailablePercent}%</strong>
                                                <p className="admin-diagnostic-caption">capacité disponible</p>
                                                <p className="admin-diagnostic-note">
                                                    {providerCounts.critical} critique(s) • {providerCounts.watch} sous tension
                                                </p>
                                            </div>

                                            <dl className="admin-kpi-list">
                                                <div className="admin-kpi-list__row">
                                                    <dt>Requêtes restantes</dt>
                                                    <dd>{data.poolQuota.requestsRemaining.toLocaleString('fr-FR')}</dd>
                                                    <small>{formatPercent(1 - poolRequestsRatio)} disponibles</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Tokens restants</dt>
                                                    <dd>{formatTokenNumber(data.poolQuota.tokensRemaining)}</dd>
                                                    <small>{formatPercent(1 - poolTokensRatio)} disponibles</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Providers critiques</dt>
                                                    <dd>{providerCounts.critical}</dd>
                                                    <small>{providerCounts.watch} sous tension</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Charge max observée</dt>
                                                    <dd>{formatPercent(poolPeakUsage)}</dd>
                                                    <small>{poolResetLabel}</small>
                                                </div>
                                            </dl>
                                        </div>

                                        <ProgressStat
                                            label="Consommation du pool"
                                            valueLabel={formatPercent(poolPeakUsage)}
                                            helper={`Requêtes ${formatPercent(poolRequestsRatio)} • Tokens ${formatPercent(poolTokensRatio)} • ${poolResetLabel}`}
                                            ratio={poolPeakUsage}
                                            tone={poolTone === 'critical' ? 'critical' : poolTone === 'watch' ? 'warning' : 'success'}
                                        />
                                    </article>

                                    <article className={clsx('admin-panel admin-panel--compact admin-overview-focus-card', `admin-overview-focus-card--${activityTone}`)}>
                                        <SectionHeader
                                            title="Base utilisateurs"
                                            description="Taille de base, activité réelle, premium et adoption IA."
                                        />
                                        <div className="admin-diagnostic-layout">
                                            <div className="admin-diagnostic-lead">
                                                <StatusPill tone={activityTone}>{formatPercent(activeShare)} actifs</StatusPill>
                                                <strong className="admin-diagnostic-value">
                                                    {data.stats.users.active} / {data.stats.users.total}
                                                </strong>
                                                <p className="admin-diagnostic-caption">comptes actifs</p>
                                                <p className="admin-diagnostic-note">
                                                    {data.stats.users.premium} premium • {data.lifetimeStats.uniqueUsers} utilisateurs IA
                                                </p>
                                            </div>

                                            <dl className="admin-kpi-list">
                                                <div className="admin-kpi-list__row">
                                                    <dt>Base totale</dt>
                                                    <dd>{data.stats.users.total.toLocaleString('fr-FR')}</dd>
                                                    <small>{data.stats.users.active} actifs maintenant</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Premium</dt>
                                                    <dd>{data.stats.users.premium.toLocaleString('fr-FR')}</dd>
                                                    <small>{formatPercent(premiumShare)} de la base</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Utilisateurs IA</dt>
                                                    <dd>{data.lifetimeStats.uniqueUsers.toLocaleString('fr-FR')}</dd>
                                                    <small>{formatPercent(aiAdoptionShare)} de pénétration</small>
                                                </div>
                                                <div className="admin-kpi-list__row">
                                                    <dt>Tokens générés</dt>
                                                    <dd>{formatTokenNumber(data.lifetimeStats.totalTokens)}</dd>
                                                    <small>{formatCompactNumber(data.lifetimeStats.totalRequests)} requêtes à vie</small>
                                                </div>
                                            </dl>
                                        </div>

                                        <ProgressStat
                                            label="Part active"
                                            valueLabel={formatPercent(activeShare)}
                                            helper={`Premium ${formatPercent(premiumShare)} • Adoption IA ${formatPercent(aiAdoptionShare)} • ${data.lifetimeStats.activeDays} jours actifs`}
                                            ratio={activeShare}
                                            tone={activityTone === 'healthy' ? 'success' : activityTone === 'watch' ? 'warning' : activityTone === 'critical' ? 'critical' : 'accent'}
                                        />
                                    </article>
                                </section>

                                <article className="admin-panel admin-panel--compact">
                                    <SectionHeader title="Points de tension IA" description="Les modèles qui portent le trafic ou commencent à saturer." />
                                    {providerCards.length === 0 ? (
                                        <EmptyState
                                            icon={Activity}
                                            title="Aucun provider disponible"
                                            description="Les providers apparaîtront ici dès que des données remonteront du backend."
                                        />
                                    ) : (
                                        <div className="admin-table-wrap">
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Provider</th>
                                                        <th>Statut</th>
                                                        <th>Aujourd’hui</th>
                                                        <th>Latence</th>
                                                        <th>Charge</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {providerCards.slice(0, 6).map((provider) => (
                                                        <tr key={`overview-${providerLookupKey(provider.provider, provider.model)}`}>
                                                            <td>
                                                                <div className="admin-provider-cell">
                                                                    <strong>{provider.provider}</strong>
                                                                    <span>{provider.shortModel}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <StatusPill tone={provider.tone}>{getProviderToneLabel(provider.tone)}</StatusPill>
                                                            </td>
                                                            <td>{provider.todayRequests.toLocaleString('fr-FR')} req</td>
                                                            <td>{provider.todayLatency > 0 ? `${provider.todayLatency} ms` : 'N/A'}</td>
                                                            <td>{Math.round(provider.usageRatio * 100)}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </article>

                            </div>
                        ) : null}

                        {selectedTab === 'users' ? (
                            <div className="admin-main-stack">
                                <article className="admin-panel">
                                    <SectionHeader
                                        title="Utilisateurs"
                                        description="Cherche, filtre et trie les comptes sans perdre la lecture d'usage."
                                    />

                                    <div className="admin-toolbar">
                                        <label className="admin-search">
                                            <Search className="h-4 w-4" />
                                            <input
                                                value={userSearch}
                                                onChange={(event) => setUserSearch(event.target.value)}
                                                placeholder="Rechercher par nom, email ou UID…"
                                                className="admin-input"
                                            />
                                        </label>

                                        <div className="admin-filter-row">
                                            {USER_SEGMENTS.map((segment) => (
                                                <FilterChip
                                                    key={segment.value}
                                                    active={userSegment === segment.value}
                                                    onClick={() => setUserSegment(segment.value)}
                                                >
                                                    {segment.label}
                                                </FilterChip>
                                            ))}
                                        </div>

                                        <select
                                            value={userSort}
                                            onChange={(event) => setUserSort(event.target.value as UserSort)}
                                            className="admin-select admin-select--auto"
                                        >
                                            {USER_SORT_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    Trier: {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </article>

                                <section className="admin-users-layout">
                                    <article className="admin-panel">
                                        <div className="admin-users-summary">
                                            <div className="admin-inline-badge admin-inline-badge--neutral">
                                                {filteredUsers.length} compte(s) affiché(s)
                                            </div>
                                            <div className="admin-inline-badge admin-inline-badge--success">
                                                {filteredUsers.filter((account) => isUserOnline(account.lastActive)).length} en ligne
                                            </div>
                                            <div className="admin-inline-badge admin-inline-badge--accent">
                                                {filteredUsers.filter((account) => account.tier === 'premium').length} premium
                                            </div>
                                            <div className="admin-inline-badge admin-inline-badge--warning">
                                                {formatStudyTime(filteredUsers.reduce((total, account) => total + account.studyTimeSeconds, 0))} étudié
                                            </div>
                                        </div>

                                        {filteredUsers.length === 0 ? (
                                            <EmptyState
                                                icon={Users}
                                                title="Aucun utilisateur trouvé"
                                                description="Essaie une autre recherche ou change le segment affiché."
                                            />
                                        ) : (
                                            <>
                                                <div className="admin-table-wrap admin-table-wrap--users">
                                                    <table className="admin-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Utilisateur</th>
                                                                <th>Plan</th>
                                                                <th>Statut</th>
                                                                <th>Temps étudié</th>
                                                                <th>Usage du jour</th>
                                                                <th>Tokens</th>
                                                                <th>Dernière activité</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredUsers.map((account) => {
                                                                const usageRatio = safeRatio(account.aiUsage.requestsToday, account.aiUsage.requestsLimit);
                                                                const usageTone =
                                                                    usageRatio >= 0.85 ? 'critical' : usageRatio >= 0.65 ? 'warning' : 'success';

                                                                return (
                                                                    <tr key={account.uid}>
                                                                        <td>
                                                                            <div className="admin-table-user">
                                                                                {account.photoURL ? (
                                                                                    <img
                                                                                        src={account.photoURL}
                                                                                        alt={account.displayName}
                                                                                        className="admin-user-card__avatar"
                                                                                        referrerPolicy="no-referrer"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="admin-user-card__avatar admin-user-card__avatar--placeholder">
                                                                                        <Users className="h-4 w-4" />
                                                                                    </div>
                                                                                )}
                                                                                <div className="admin-table-user__identity">
                                                                                    <strong>{account.displayName}</strong>
                                                                                    <span>{account.email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <StatusPill tone={account.tier === 'premium' ? 'healthy' : 'neutral'}>
                                                                                {account.tier === 'premium' ? 'Premium' : 'Gratuit'}
                                                                            </StatusPill>
                                                                        </td>
                                                                        <td>
                                                                            <span className={clsx('admin-table-status', isUserOnline(account.lastActive) && 'is-online')}>
                                                                                {isUserOnline(account.lastActive) ? 'En ligne' : 'Hors ligne'}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="admin-table-study">
                                                                                <strong>{formatStudyTime(account.studyTimeSeconds)}</strong>
                                                                                <span>{account.completedLessons} contenus terminés</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="admin-table-usage">
                                                                                <div className="admin-table-usage__meta">
                                                                                    <strong>{account.aiUsage.requestsToday}/{account.aiUsage.requestsLimit}</strong>
                                                                                    <span>{Math.round(usageRatio * 100)}%</span>
                                                                                </div>
                                                                                <div className="admin-progress-bar admin-progress-bar--compact">
                                                                                    <span
                                                                                        className={clsx('admin-progress-bar__fill', `admin-progress-bar__fill--${usageTone}`)}
                                                                                        style={{ width: clampPercent(usageRatio * 100) }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>{formatTokenNumber(account.aiUsage.tokensUsed)}</td>
                                                                        <td>{formatDate(account.lastActive)}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="admin-mobile-user-list">
                                                    {filteredUsers.map((account) => {
                                                        const usageRatio = safeRatio(account.aiUsage.requestsToday, account.aiUsage.requestsLimit);
                                                        const usageTone =
                                                            usageRatio >= 0.85 ? 'critical' : usageRatio >= 0.65 ? 'warning' : 'success';

                                                        return (
                                                            <article key={`mobile-${account.uid}`} className="admin-mobile-user-row">
                                                                <div className="admin-mobile-user-row__top">
                                                                    <div className="admin-table-user">
                                                                        {account.photoURL ? (
                                                                            <img
                                                                                src={account.photoURL}
                                                                                alt={account.displayName}
                                                                                className="admin-user-card__avatar"
                                                                                referrerPolicy="no-referrer"
                                                                            />
                                                                        ) : (
                                                                            <div className="admin-user-card__avatar admin-user-card__avatar--placeholder">
                                                                                <Users className="h-4 w-4" />
                                                                            </div>
                                                                        )}
                                                                        <div className="admin-table-user__identity">
                                                                            <strong>{account.displayName}</strong>
                                                                            <span>{account.email}</span>
                                                                        </div>
                                                                    </div>
                                                                    <StatusPill tone={account.tier === 'premium' ? 'healthy' : 'neutral'}>
                                                                        {account.tier === 'premium' ? 'Premium' : 'Gratuit'}
                                                                    </StatusPill>
                                                                </div>

                                                                <div className="admin-mobile-user-row__meta">
                                                                    <span>{isUserOnline(account.lastActive) ? 'En ligne' : 'Hors ligne'}</span>
                                                                    <span>{formatDate(account.lastActive)}</span>
                                                                    <span>{formatTokenNumber(account.aiUsage.tokensUsed)} tokens</span>
                                                                    <span>{formatStudyTime(account.studyTimeSeconds)} étudié</span>
                                                                </div>

                                                                <div className="admin-table-usage">
                                                                    <div className="admin-table-usage__meta">
                                                                        <strong>{account.aiUsage.requestsToday}/{account.aiUsage.requestsLimit}</strong>
                                                                        <span>{Math.round(usageRatio * 100)}%</span>
                                                                    </div>
                                                                    <div className="admin-progress-bar admin-progress-bar--compact">
                                                                        <span
                                                                            className={clsx('admin-progress-bar__fill', `admin-progress-bar__fill--${usageTone}`)}
                                                                            style={{ width: clampPercent(usageRatio * 100) }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </article>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </article>

                                </section>

                                <ActivityStreamPanel
                                    activityUserFilter={activityUserFilter}
                                    activityUsers={activityUsers}
                                    expandedActivityId={expandedActivityId}
                                    filteredActivity={filteredActivity}
                                    setActivityUserFilter={setActivityUserFilter}
                                    setExpandedActivityId={setExpandedActivityId}
                                    userDirectory={userDirectory}
                                />
                            </div>
                        ) : null}

                        {selectedTab === 'providers' ? (
                            <div className="admin-main-stack">
                                <article className="admin-panel">
                                    <SectionHeader
                                        title="Providers IA"
                                        description="Santé, quotas, latence et saturation par modèle."
                                    />

                                    <div className="admin-toolbar">
                                        <label className="admin-search">
                                            <Search className="h-4 w-4" />
                                            <input
                                                value={providerSearch}
                                                onChange={(event) => setProviderSearch(event.target.value)}
                                                placeholder="Rechercher un provider ou un modèle…"
                                                className="admin-input"
                                            />
                                        </label>

                                        <div className="admin-filter-row">
                                            {PROVIDER_STATUS_FILTERS.map((filter) => (
                                                <FilterChip
                                                    key={filter.value}
                                                    active={providerStatusFilter === filter.value}
                                                    onClick={() => setProviderStatusFilter(filter.value)}
                                                >
                                                    {filter.label}
                                                </FilterChip>
                                            ))}
                                        </div>
                                    </div>
                                </article>

                                <div className="admin-users-summary">
                                    <div className="admin-inline-badge admin-inline-badge--success">{providerCounts.healthy} sains</div>
                                    <div className="admin-inline-badge admin-inline-badge--warning">{providerCounts.watch} sous tension</div>
                                    <div className="admin-inline-badge admin-inline-badge--critical">{providerCounts.critical} critiques</div>
                                </div>

                                <article className="admin-panel">
                                    {filteredProviders.length === 0 ? (
                                        <EmptyState
                                            icon={Activity}
                                            title="Aucun provider à afficher"
                                            description="Change les filtres ou attends les prochaines remontées d’activité."
                                        />
                                    ) : (
                                        <div className="admin-table-wrap">
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Provider</th>
                                                        <th>Statut</th>
                                                        <th>Circuit</th>
                                                        <th>Succès</th>
                                                        <th>Aujourd’hui</th>
                                                        <th>Latence</th>
                                                        <th>Requêtes</th>
                                                        <th>Tokens</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredProviders.map((provider) => {
                                                        const requestTone =
                                                            provider.requestRatio >= 0.9 ? 'critical' : provider.requestRatio >= 0.65 ? 'warning' : 'success';
                                                        const tokenTone =
                                                            provider.tokenRatio >= 0.9 ? 'critical' : provider.tokenRatio >= 0.65 ? 'warning' : 'success';

                                                        return (
                                                            <tr key={providerLookupKey(provider.provider, provider.model)}>
                                                                <td>
                                                                    <div className="admin-provider-cell">
                                                                        <strong>{provider.provider}</strong>
                                                                        <span>{provider.shortModel}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <StatusPill tone={provider.tone}>{getProviderToneLabel(provider.tone)}</StatusPill>
                                                                </td>
                                                                <td>{provider.circuitState}</td>
                                                                <td>{Math.round(provider.successRate * 100)}%</td>
                                                                <td>{provider.todayRequests.toLocaleString('fr-FR')} req</td>
                                                                <td>{provider.todayLatency > 0 ? `${provider.todayLatency} ms` : 'N/A'}</td>
                                                                <td>
                                                                    <div className="admin-table-quota">
                                                                        <div className="admin-table-usage__meta">
                                                                            <strong>{provider.quota.requestsUsed}/{provider.quota.requestsLimit}</strong>
                                                                            <span>{Math.round(provider.requestRatio * 100)}%</span>
                                                                        </div>
                                                                        <div className="admin-progress-bar admin-progress-bar--compact">
                                                                            <span
                                                                                className={clsx('admin-progress-bar__fill', `admin-progress-bar__fill--${requestTone}`)}
                                                                                style={{ width: clampPercent(provider.requestRatio * 100) }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="admin-table-quota">
                                                                        <div className="admin-table-usage__meta">
                                                                            <strong>{formatTokenNumber(provider.quota.tokensUsed)}</strong>
                                                                            <span>{Math.round(provider.tokenRatio * 100)}%</span>
                                                                        </div>
                                                                        <div className="admin-progress-bar admin-progress-bar--compact">
                                                                            <span
                                                                                className={clsx('admin-progress-bar__fill', `admin-progress-bar__fill--${tokenTone}`)}
                                                                                style={{ width: clampPercent(provider.tokenRatio * 100) }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </article>
                            </div>
                        ) : null}

                        {selectedTab === 'content' ? (
                            <div className="admin-main-stack">
                                <article className="admin-panel admin-panel--sticky">
                                    <SectionHeader
                                        title="Contenu & badges"
                                        description="Badges, filtres et publication des cours."
                                        action={(
                                            <div className="admin-actions-inline">
                                                <button
                                                    type="button"
                                                    className="admin-button admin-button--ghost"
                                                    onClick={() => fetchSiteConfig()}
                                                    disabled={siteConfigLoading}
                                                >
                                                    Recharger
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-button admin-button--primary"
                                                    onClick={saveSiteConfig}
                                                    disabled={siteConfigSaving || !hasUnsavedChanges}
                                                >
                                                    {siteConfigSaving ? 'Enregistrement…' : 'Enregistrer'}
                                                </button>
                                            </div>
                                        )}
                                    />

                                    <div className="admin-inline-stats">
                                        <div className="admin-inline-stat admin-inline-stat--accent">
                                            <span className="admin-inline-stat__label">Badges actifs</span>
                                            <strong className="admin-inline-stat__value">{badgeStats.new + badgeStats.soon}</strong>
                                        </div>
                                        <div className="admin-inline-stat admin-inline-stat--neutral">
                                            <span className="admin-inline-stat__label">Cours visibles</span>
                                            <strong className="admin-inline-stat__value">{filteredCourses.length}</strong>
                                        </div>
                                        <div className="admin-inline-stat admin-inline-stat--warning">
                                            <span className="admin-inline-stat__label">Sélection</span>
                                            <strong className="admin-inline-stat__value">{selectedCourseKeys.length} cours</strong>
                                        </div>
                                        <div className={clsx('admin-inline-stat', hasUnsavedChanges ? 'admin-inline-stat--warning' : 'admin-inline-stat--success')}>
                                            <span className="admin-inline-stat__label">État</span>
                                            <strong className="admin-inline-stat__value">{hasUnsavedChanges ? 'Modifs en attente' : 'Synchronisé'}</strong>
                                        </div>
                                    </div>

                                    {siteConfigError ? (
                                        <div className="admin-alert admin-alert--error">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{siteConfigError}</span>
                                        </div>
                                    ) : null}
                                </article>

                                <section className="admin-content-layout">
                                    <article className="admin-panel">
                                        <SectionHeader
                                            title="Badges des cours"
                                            description="Travaille par semestre, matière ou recherche puis applique en lot."
                                        />

                                        <fieldset className="admin-fieldset" disabled={siteConfigLoading || siteConfigSaving}>
                                            <div className="admin-toolbar admin-toolbar--grid">
                                                <select
                                                    value={badgeSemesterFilter}
                                                    onChange={(event) => setBadgeSemesterFilter(event.target.value as 'all' | 'S3' | 'S4')}
                                                    className="admin-select"
                                                >
                                                    <option value="all">Tous les semestres</option>
                                                    <option value="S3">S3</option>
                                                    <option value="S4">S4</option>
                                                </select>

                                                <select
                                                    value={badgeSubjectFilter}
                                                    onChange={(event) => setBadgeSubjectFilter(event.target.value as 'all' | 'macro' | 'micro' | 'stats' | 'socio' | 'management')}
                                                    className="admin-select"
                                                >
                                                    <option value="all">Toutes les matières</option>
                                                    <option value="macro">Macro</option>
                                                    <option value="micro">Micro</option>
                                                    <option value="stats">Stats</option>
                                                    <option value="socio">Sociologie</option>
                                                    <option value="management">Management</option>
                                                </select>

                                                <label className="admin-search admin-search--wide">
                                                    <Search className="h-4 w-4" />
                                                    <input
                                                        value={badgeSearch}
                                                        onChange={(event) => setBadgeSearch(event.target.value)}
                                                        placeholder="Rechercher un chapitre…"
                                                        className="admin-input"
                                                    />
                                                </label>
                                            </div>

                                            <div className="admin-bulk-toolbar">
                                                <button type="button" className="admin-button admin-button--ghost" onClick={toggleSelectVisible}>
                                                    {allVisibleSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                                    {allVisibleSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                                                </button>
                                                <span className="admin-inline-badge admin-inline-badge--accent">
                                                    {selectedVisibleCount} visible(s) • {selectedCourseKeys.length} au total
                                                </span>
                                                <BadgeSelector value={bulkBadgeValue} onChange={setBulkBadgeValue} />
                                                <button
                                                    type="button"
                                                    className="admin-button admin-button--primary"
                                                    onClick={applyBulkBadge}
                                                    disabled={selectedCourseKeys.length === 0}
                                                >
                                                    Appliquer
                                                </button>
                                            </div>

                                            {filteredCourses.length === 0 ? (
                                                <EmptyState
                                                    icon={Search}
                                                    title="Aucun cours ne correspond"
                                                    description="Élargis les filtres ou modifie la recherche pour retrouver les chapitres."
                                                />
                                            ) : (
                                                <div className="admin-table-wrap">
                                                    <table className="admin-table admin-table--content">
                                                        <thead>
                                                            <tr>
                                                                <th>Sélection</th>
                                                                <th>Semestre</th>
                                                                <th>Matière</th>
                                                                <th>Chapitre</th>
                                                                <th>Badge</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredCourses.map((course) => (
                                                                <tr key={course.key}>
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedCourseKeys.includes(course.key)}
                                                                            onChange={() => toggleCourseSelection(course.key)}
                                                                        />
                                                                    </td>
                                                                    <td>{course.semester}</td>
                                                                    <td>{course.subjectLabel}</td>
                                                                    <td>
                                                                        <div className="admin-course-cell">
                                                                            <strong>{course.chapterLabel}</strong>
                                                                            <span>{course.chapterTitle}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <BadgeSelector
                                                                            value={siteConfig.courseBadges[course.key] || ''}
                                                                            onChange={(value) => setBadgeForCourse(course.key, value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </fieldset>
                                    </article>
                                </section>
                            </div>
                        ) : null}

                        {selectedTab === 'oiko' ? (
                            <OikoNewsAdminModule />
                        ) : null}

                        {selectedTab === 'notifications' ? (
                            <div className="admin-main-stack">
                                <article className="admin-panel admin-panel--sticky">
                                    <SectionHeader
                                        title="Notifications"
                                        description="Annonces visibles, expiration, prévisualisation et édition."
                                        action={(
                                            <div className="admin-actions-inline">
                                                <button
                                                    type="button"
                                                    className="admin-button admin-button--ghost"
                                                    onClick={() => fetchSiteConfig()}
                                                    disabled={siteConfigLoading}
                                                >
                                                    Recharger
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-button admin-button--primary"
                                                    onClick={saveSiteConfig}
                                                    disabled={siteConfigSaving || !hasUnsavedChanges}
                                                >
                                                    {siteConfigSaving ? 'Enregistrement…' : 'Enregistrer'}
                                                </button>
                                            </div>
                                        )}
                                    />

                                    <div className="admin-inline-stats">
                                        <div className="admin-inline-stat admin-inline-stat--success">
                                            <span className="admin-inline-stat__label">Actives</span>
                                            <strong className="admin-inline-stat__value">{activeNotifications.length}</strong>
                                        </div>
                                        <div className="admin-inline-stat admin-inline-stat--warning">
                                            <span className="admin-inline-stat__label">Expirées</span>
                                            <strong className="admin-inline-stat__value">{notificationItems.filter((item) => item.isExpired).length}</strong>
                                        </div>
                                        <div className="admin-inline-stat admin-inline-stat--accent">
                                            <span className="admin-inline-stat__label">Matières</span>
                                            <strong className="admin-inline-stat__value">{new Set(activeNotifications.map((item) => item.notification.subjectKey)).size}</strong>
                                        </div>
                                        <div className={clsx('admin-inline-stat', hasUnsavedChanges ? 'admin-inline-stat--warning' : 'admin-inline-stat--success')}>
                                            <span className="admin-inline-stat__label">État</span>
                                            <strong className="admin-inline-stat__value">{hasUnsavedChanges ? 'Modifs en attente' : 'Synchronisé'}</strong>
                                        </div>
                                    </div>

                                    {siteConfigError ? (
                                        <div className="admin-alert admin-alert--error">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{siteConfigError}</span>
                                        </div>
                                    ) : null}
                                </article>

                                <article className="admin-panel">
                                    <SectionHeader
                                        title="Prévisualisation active"
                                        description="Ce que voit l'utilisateur en haut de page."
                                        action={(
                                            <button type="button" className="admin-button admin-button--primary" onClick={addNotification}>
                                                <Bell className="h-4 w-4" />
                                                Ajouter
                                            </button>
                                        )}
                                    />

                                    <div className="admin-toolbar admin-toolbar--stack">
                                        <div className="admin-filter-row">
                                            {NOTIFICATION_FILTERS.map((filter) => (
                                                <FilterChip
                                                    key={filter.value}
                                                    active={notificationViewFilter === filter.value}
                                                    onClick={() => setNotificationViewFilter(filter.value)}
                                                >
                                                    {filter.label}
                                                </FilterChip>
                                            ))}
                                        </div>

                                        <div className="admin-inline-list">
                                            {activeNotifications.length === 0 ? (
                                                <div className="admin-inline-list__empty">Aucune notification visible côté utilisateur.</div>
                                            ) : (
                                                activeNotifications.slice(0, 4).map((item) => (
                                                    <div key={`preview-${item.notification.id}-${item.index}`} className="admin-inline-list__item">
                                                        <StatusPill tone="healthy">{item.notification.subjectKey}</StatusPill>
                                                        <div className="admin-inline-list__copy">
                                                            <strong>{item.notification.subject}</strong>
                                                            <span>{item.notification.chapter}</span>
                                                        </div>
                                                        <span>{item.notification.time}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <div className="admin-notification-list">
                                        {filteredNotifications.length === 0 ? (
                                            <EmptyState
                                                icon={Bell}
                                                title="Aucune notification"
                                                description="Ajoute une annonce ou change le filtre affiché."
                                            />
                                        ) : (
                                            filteredNotifications.map((item) => (
                                                <article key={`${item.notification.id}-${item.index}`} className="admin-notification-card">
                                                    <div className="admin-notification-card__header">
                                                        <div>
                                                            <StatusPill tone={item.isExpired ? 'watch' : 'healthy'}>
                                                                {item.isExpired ? 'Expirée' : 'Active'}
                                                            </StatusPill>
                                                            <p className="admin-notification-card__meta">
                                                                {item.expiresAt ? `Expire le ${formatDate(item.expiresAt)}` : 'Sans expiration'}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="admin-button admin-button--danger"
                                                            onClick={() => removeNotification(item.index)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>

                                                    <div className="admin-form-grid">
                                                        <select
                                                            value={item.notification.subjectKey}
                                                            onChange={(event) => updateNotification(item.index, 'subjectKey', event.target.value)}
                                                            className="admin-select"
                                                        >
                                                            <option value="macro">Macro</option>
                                                            <option value="micro">Micro</option>
                                                            <option value="stats">Stats</option>
                                                            <option value="socio">Sociologie</option>
                                                            <option value="management">Management</option>
                                                        </select>

                                                        <input
                                                            value={item.notification.subject}
                                                            onChange={(event) => updateNotification(item.index, 'subject', event.target.value)}
                                                            placeholder="Sujet"
                                                            className="admin-input"
                                                            maxLength={60}
                                                        />

                                                        <textarea
                                                            value={item.notification.chapter}
                                                            onChange={(event) => updateNotification(item.index, 'chapter', event.target.value)}
                                                            placeholder="Message affiché dans la cloche…"
                                                            className="admin-textarea"
                                                            rows={3}
                                                            maxLength={180}
                                                        />

                                                        <input
                                                            value={item.notification.time}
                                                            onChange={(event) => updateNotification(item.index, 'time', event.target.value)}
                                                            placeholder="Label temporel"
                                                            className="admin-input"
                                                            maxLength={40}
                                                        />

                                                        <select
                                                            value={String(item.hours)}
                                                            onChange={(event) => updateNotification(item.index, 'expiresInHours', Number(event.target.value))}
                                                            className="admin-select"
                                                        >
                                                            {NOTIFICATION_EXPIRY_OPTIONS.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="admin-notification-card__footer">
                                                        <span>{item.notification.subjectKey}</span>
                                                        <span>{formatHoursLabel(item.hours)}</span>
                                                    </div>
                                                </article>
                                            ))
                                        )}
                                    </div>
                                </article>
                            </div>
                        ) : null}
                    </main>
                </div>
            </div>
        </div>
    );
}
