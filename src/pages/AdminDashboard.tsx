/**
 * Admin Dashboard - Analytics & Platform Health
 * Only accessible to rayanebenhaga@gmail.com
 * Design: Clean institutional aesthetic matching site's design system
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
    Users,
    MessageSquare,
    TrendingUp,
    Clock,
    AlertCircle,
    ArrowLeft,
    Download,
    Activity,
    CheckCircle2,
    XCircle,
    Zap,
    BarChart3,
    RefreshCw,
    Settings,
    Bell,
    Search,
    CheckSquare,
    Square
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '../types/siteConfig';
import { macroChapters } from '../modules/s3/macro/data/macroData';
import { microChapters } from '../modules/s3/micro/data/microData';
import { statsChapters } from '../modules/s3/stats/data/statsData';
import { socioChapters } from '../modules/s3/socio/data/socioData';
import { chapters as macroS4Chapters } from '../modules/s4/macro/data/chapters';
import { chapters as microS4Chapters } from '../modules/s4/micro/data/chapters';
import { chapters as statsS4Chapters } from '../modules/s4/stats/data/chapters';
import { chapters as managementS4Chapters } from '../modules/s4/management/data/chapters';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
    photoURL?: string;
    createdAt: number;
    lastActive?: number;
    tier: 'free' | 'premium';
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

interface WeeklyStats {
    week: string;
    requests: number;
    tokens: number;
    unique_users: number;
}

interface MonthlyStats {
    month: string;
    requests: number;
    tokens: number;
    unique_users: number;
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

type TimeRange = '24h' | '7d' | '30d' | 'all';

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
    weeklyStats: WeeklyStats[];
    monthlyStats: MonthlyStats[];
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

const DASHBOARD_TABS = [
    { id: 'overview', label: "Vue d'ensemble", shortLabel: 'Stats', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', shortLabel: 'Users', icon: Users },
    { id: 'providers', label: 'Providers', shortLabel: 'AI', icon: Activity },
    { id: 'content', label: 'Contenu', shortLabel: 'Contenu', icon: Settings },
] as const;

const TIME_RANGE_OPTIONS: Array<{ value: TimeRange; label: string }> = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7j' },
    { value: '30d', label: '30j' },
];

type BadgeValue = '' | 'new' | 'soon';
type NotificationViewFilter = 'active' | 'expired' | 'all';

type CourseCatalogEntry = {
    semester: 'S3' | 'S4';
    subject: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
    subjectLabel: string;
    chapterLabel: string;
    chapterTitle: string;
    key: string;
};

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
    chapters: Array<{ id: string; title: string; subtitle: string }>
): CourseCatalogEntry[] {
    return chapters.map((chapter) => {
        const chapterNumber = chapter.id.replace('ch', '');
        return {
            semester: 'S4',
            subject,
            subjectLabel,
            chapterLabel: `Chapitre ${chapterNumber}`,
            chapterTitle: chapter.subtitle || chapter.title,
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

export default function AdminDashboard() {
    const auth = getAuth();
    const navigate = useNavigate();
    const user = auth.currentUser;

    const [data, setData] = useState<AdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'providers' | 'content'>('overview');
    const [refreshing, setRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('24h');
    const [userFilter, setUserFilter] = useState<string>('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
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

    // Check if user is admin
    useEffect(() => {
        if (!user || user.email !== 'rayanebenhaga@gmail.com') {
            navigate('/');
        }
    }, [user, navigate]);

    // Fetch admin data
    const fetchAdminData = useCallback(async (showRefreshing = false) => {
        if (!user || user.email !== 'rayanebenhaga@gmail.com') return;

        try {
            if (showRefreshing) setRefreshing(true);

            const token = await user.getIdToken();
            const response = await fetch(`${API_URL}/api/admin/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admin data');
            }

            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            if (showRefreshing) setRefreshing(false);
        }
    }, [user]);

    const fetchSiteConfig = useCallback(async () => {
        if (!user || user.email !== 'rayanebenhaga@gmail.com') return;

        try {
            setSiteConfigLoading(true);
            const token = await user.getIdToken();
            const response = await fetch(`${API_URL}/api/admin/site-config`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch site config');
            }

            const result = await response.json();
            const nextConfig: SiteConfig = {
                courseBadges: result?.courseBadges || DEFAULT_SITE_CONFIG.courseBadges,
                notifications: Array.isArray(result?.notifications) ? result.notifications : [],
            };
            setSiteConfig(nextConfig);
            setSavedSiteConfig(nextConfig);
            setSiteConfigError(null);
        } catch (err: any) {
            setSiteConfigError(err.message || 'Erreur chargement config');
        } finally {
            setSiteConfigLoading(false);
        }
    }, [user]);

    const saveSiteConfig = useCallback(async () => {
        if (!user || user.email !== 'rayanebenhaga@gmail.com') return;

        try {
            setSiteConfigSaving(true);
            const token = await user.getIdToken();
            const response = await fetch(`${API_URL}/api/admin/site-config`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(siteConfig),
            });

            if (!response.ok) {
                throw new Error('Failed to save site config');
            }

            const result = await response.json();
            const nextConfig: SiteConfig = {
                courseBadges: result?.config?.courseBadges || {},
                notifications: Array.isArray(result?.config?.notifications) ? result.config.notifications : [],
            };
            setSiteConfig(nextConfig);
            setSavedSiteConfig(nextConfig);
            setSiteConfigError(null);
        } catch (err: any) {
            setSiteConfigError(err.message || 'Erreur sauvegarde config');
        } finally {
            setSiteConfigSaving(false);
        }
    }, [siteConfig, user]);

    useEffect(() => {
        fetchAdminData();
        fetchSiteConfig();
        const interval = setInterval(() => fetchAdminData(), 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [fetchAdminData, fetchSiteConfig]);

    const exportData = () => {
        if (!data) return;
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const isUserOnline = (lastActive?: number) => {
        if (!lastActive) return false;
        return Date.now() - lastActive < 5 * 60 * 1000; // 5 minutes
    };

    const chartData = useMemo(() => {
        if (!data) return [];

        if (timeRange === '24h') {
            return data.hourlyStats && data.hourlyStats.length > 0
                ? data.hourlyStats
                : Array.from({ length: 24 }, (_, i) => ({
                    datetime: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
                    hour: (new Date().getHours() - 23 + i + 24) % 24,
                    requests: 0,
                    tokens: 0,
                }));
        }

        if (timeRange === '7d') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return data.dailyStats?.filter((d) => new Date(d.date) >= sevenDaysAgo).reverse() || [];
        }

        return data.dailyStats?.slice().reverse() || [];
    }, [data, timeRange]);

    const activityUsers = useMemo(() => {
        if (!data?.recentActivity) return [];
        return [...new Set(data.recentActivity.map((activity) => activity.userId))];
    }, [data]);

    const filteredActivity = useMemo(() => {
        if (!data?.recentActivity) return [];
        return data.recentActivity.filter((activity) => !userFilter || activity.userId === userFilter);
    }, [data, userFilter]);

    const setBadgeForCourse = (key: string, value: BadgeValue) => {
        setSiteConfig((prev) => ({
            ...prev,
            courseBadges: {
                ...prev.courseBadges,
                [key]: value,
            },
        }));
    };

    const updateNotification = (index: number, field: 'subject' | 'chapter' | 'time' | 'subjectKey' | 'expiresInHours', value: string | number) => {
        setSiteConfig((prev) => ({
            ...prev,
            notifications: prev.notifications.map((notif, i) => (
                i === index ? { ...notif, [field]: value } : notif
            )),
        }));
    };

    const addNotification = () => {
        setSiteConfig((prev) => ({
            ...prev,
            notifications: [
                ...prev.notifications,
                {
                    id: Date.now(),
                    subject: 'S4',
                    chapter: 'Nouveau contenu disponible',
                    time: 'Recent',
                    subjectKey: 'macro',
                    createdAt: Date.now(),
                    expiresInHours: 168,
                },
            ],
        }));
    };

    const removeNotification = (index: number) => {
        setSiteConfig((prev) => ({
            ...prev,
            notifications: prev.notifications.filter((_, i) => i !== index),
        }));
    };

    const filteredCourses = useMemo(() => {
        const search = badgeSearch.trim().toLowerCase();
        return COURSE_CATALOG.filter((course) => {
            if (badgeSemesterFilter !== 'all' && course.semester !== badgeSemesterFilter) return false;
            if (badgeSubjectFilter !== 'all' && course.subject !== badgeSubjectFilter) return false;
            if (!search) return true;
            const haystack = `${course.semester} ${course.subjectLabel} ${course.chapterLabel} ${course.chapterTitle} ${course.key}`.toLowerCase();
            return haystack.includes(search);
        });
    }, [badgeSearch, badgeSemesterFilter, badgeSubjectFilter]);

    const groupedFilteredCourses = useMemo(() => {
        const grouped: Record<string, Record<string, CourseCatalogEntry[]>> = {};
        for (const course of filteredCourses) {
            if (!grouped[course.semester]) grouped[course.semester] = {};
            if (!grouped[course.semester][course.subjectLabel]) grouped[course.semester][course.subjectLabel] = [];
            grouped[course.semester][course.subjectLabel].push(course);
        }
        return grouped;
    }, [filteredCourses]);

    const visibleCourseKeys = useMemo(() => filteredCourses.map((course) => course.key), [filteredCourses]);

    const toggleCourseSelection = (courseKey: string) => {
        setSelectedCourseKeys((prev) => prev.includes(courseKey) ? prev.filter((key) => key !== courseKey) : [...prev, courseKey]);
    };

    const toggleSelectVisible = () => {
        const allVisibleSelected = visibleCourseKeys.every((key) => selectedCourseKeys.includes(key));
        if (allVisibleSelected) {
            setSelectedCourseKeys((prev) => prev.filter((key) => !visibleCourseKeys.includes(key)));
            return;
        }
        setSelectedCourseKeys((prev) => Array.from(new Set([...prev, ...visibleCourseKeys])));
    };

    const applyBulkBadge = () => {
        if (selectedCourseKeys.length === 0) return;
        setSiteConfig((prev) => {
            const nextBadges = { ...prev.courseBadges };
            for (const key of selectedCourseKeys) {
                nextBadges[key] = bulkBadgeValue;
            }
            return { ...prev, courseBadges: nextBadges };
        });
    };

    const filteredNotifications = useMemo(() => {
        const now = Date.now();
        return siteConfig.notifications.filter((notif) => {
            const createdAt = Number(notif.createdAt) > 0 ? Number(notif.createdAt) : now;
            const expiresInHours = Number(notif.expiresInHours);
            const hasFiniteExpiry = Number.isFinite(expiresInHours) && expiresInHours >= 0;
            const isExpired = hasFiniteExpiry && now > createdAt + expiresInHours * 60 * 60 * 1000;
            if (notificationViewFilter === 'active') return !isExpired;
            if (notificationViewFilter === 'expired') return isExpired;
            return true;
        });
    }, [siteConfig.notifications, notificationViewFilter]);

    const hasUnsavedChanges = useMemo(() => (
        JSON.stringify(siteConfig) !== JSON.stringify(savedSiteConfig)
    ), [siteConfig, savedSiteConfig]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}></div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Chargement du dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-error-subtle)' }}>
                        <AlertCircle className="h-8 w-8" style={{ color: 'var(--color-error)' }} />
                    </div>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Erreur de chargement</h2>
                    <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>{error || 'Impossible de charger les données'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-base)' }}>
            {/* Header */}
            <header
                className="sticky top-0 z-40 backdrop-blur-xl"
                style={{
                    background: 'color-mix(in srgb, var(--color-bg-raised) 88%, transparent)',
                    borderBottom: '1px solid var(--color-border-default)',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 rounded-xl transition-colors hover:bg-[var(--color-bg-overlay)]"
                                aria-label="Retour"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Dashboard Admin</h1>
                                <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>Analytiques & Santé de la plateforme</p>
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto items-center justify-end gap-2">
                            <button
                                onClick={() => fetchAdminData(true)}
                                disabled={refreshing}
                                className="p-2 rounded-xl transition-colors disabled:opacity-50 hover:bg-[var(--color-bg-overlay)]"
                                aria-label="Rafraîchir"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={exportData}
                                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-colors text-sm font-medium"
                                style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export JSON</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div
                        className="flex gap-1 mt-4 overflow-x-auto rounded-xl p-1"
                        style={{
                            border: '1px solid var(--color-border-default)',
                            background: 'var(--color-bg-overlay)',
                        }}
                    >
                        {DASHBOARD_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                                style={{
                                    background: selectedTab === tab.id ? 'var(--color-bg-raised)' : 'transparent',
                                    color: selectedTab === tab.id
                                        ? 'var(--color-accent)'
                                        : 'var(--color-text-secondary)',
                                    borderRadius: '10px',
                                    boxShadow: selectedTab === tab.id ? 'var(--shadow-sm)' : 'none',
                                }}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.shortLabel}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {selectedTab === 'overview' && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {/* Total Users */}
                            <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 rounded-xl" style={{ background: 'var(--color-accent-subtle)' }}>
                                        <Users className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                    {data.stats.users.active > 0 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--color-success-subtle)', color: 'var(--color-success)' }}>
                                            {data.stats.users.active} en ligne
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {data.stats.users.total}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Utilisateurs</p>
                            </div>

                            {/* AI Requests */}
                            <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 rounded-xl" style={{ background: 'var(--callout-formula-bg)' }}>
                                        <MessageSquare className="h-5 w-5" style={{ color: 'var(--callout-formula-text)' }} />
                                    </div>
                                    {data.stats.ai.todayRequests > 0 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--callout-formula-bg)', color: 'var(--callout-formula-text)' }}>
                                            {data.stats.ai.todayRequests} aujourd'hui
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {data.stats.ai.totalRequests}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Requêtes IA</p>
                            </div>

                            {/* Tokens Used - show from pool quota */}
                            <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2.5 rounded-xl" style={{ background: 'var(--color-warning-subtle)' }}>
                                        <Zap className="h-5 w-5" style={{ color: 'var(--color-warning)' }} />
                                    </div>
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        / {(data.poolQuota.tokensTotal / 1000000).toFixed(1)}M
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {data.poolQuota.tokensUsed > 1000000
                                        ? `${(data.poolQuota.tokensUsed / 1000000).toFixed(2)}M`
                                        : `${(data.poolQuota.tokensUsed / 1000).toFixed(1)}K`}
                                </h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Tokens utilisés aujourd'hui</p>
                                <div className="mt-2">
                                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-bg-overlay)' }}>
                                        <div
                                            className="h-1.5 rounded-full transition-all"
                                            style={{ background: 'var(--color-warning)', width: `${Math.min((data.poolQuota.tokensUsed / data.poolQuota.tokensTotal) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pool Quota - Requests */}
                            <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2.5 rounded-xl" style={{ background: 'var(--color-info-subtle)' }}>
                                        <TrendingUp className="h-5 w-5" style={{ color: 'var(--color-info)' }} />
                                    </div>
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        / {data.poolQuota.requestsTotal.toLocaleString()}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {data.poolQuota.requestsRemaining.toLocaleString()}
                                </h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Requêtes restantes</p>
                                <div className="mt-2">
                                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-bg-overlay)' }}>
                                        <div
                                            className="h-1.5 rounded-full transition-all"
                                            style={{ background: 'var(--color-info)', width: `${(data.poolQuota.requestsRemaining / data.poolQuota.requestsTotal) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Activité IA</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        {timeRange === '24h' ? 'Dernières 24 heures' :
                                            timeRange === '7d' ? '7 derniers jours' : '30 derniers jours'}
                                    </p>
                                </div>

                                {/* Time range selector */}
                                <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: 'var(--color-bg-overlay)' }}>
                                    {TIME_RANGE_OPTIONS.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setTimeRange(option.value)}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md transition-all"
                                            style={{
                                                background: timeRange === option.value ? 'var(--color-bg-raised)' : 'transparent',
                                                color: timeRange === option.value ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                boxShadow: timeRange === option.value ? 'var(--shadow-sm)' : 'none'
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recharts Area Chart */}
                            <div className="h-64 min-h-[200px]">
                                <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                                    <AreaChart
                                        data={chartData}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                                        <XAxis
                                            dataKey={timeRange === '24h' ? 'hour' : 'date'}
                                            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                                            tickLine={false}
                                            axisLine={{ stroke: 'var(--color-border-default)' }}
                                            tickFormatter={(value) => {
                                                if (timeRange === '24h') {
                                                    return `${value}h`;
                                                }
                                                const date = new Date(value);
                                                return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
                                            }}
                                            interval={timeRange === '24h' ? 2 : 'preserveStartEnd'}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                                            tickLine={false}
                                            axisLine={false}
                                            width={30}
                                            allowDecimals={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-bg-raised)',
                                                border: '1px solid var(--color-border-default)',
                                                borderRadius: '12px',
                                                boxShadow: 'var(--shadow-md)',
                                            }}
                                            labelFormatter={(value) => {
                                                if (timeRange === '24h') {
                                                    return `${value}h00`;
                                                }
                                                const date = new Date(value);
                                                return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
                                            }}
                                            formatter={(value) => {
                                                const numValue = Number(value) || 0;
                                                return [`${numValue} requête${numValue > 1 ? 's' : ''}`, 'Requêtes'];
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="requests"
                                            stroke="var(--color-accent)"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorRequests)"
                                            dot={timeRange !== '24h'}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Stats summary below chart */}
                            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ color: 'var(--color-text-muted)' }}>Aujourd'hui:</span>
                                        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{data.stats.ai.todayRequests}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ color: 'var(--color-text-muted)' }}>Total:</span>
                                        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{data.stats.ai.totalRequests}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ color: 'var(--color-text-muted)' }}>Tokens:</span>
                                        <span className="font-semibold" style={{ color: 'var(--color-warning)' }}>{(data.stats.ai.totalTokens / 1000).toFixed(1)}K</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lifetime Stats Row - Clean Design */}
                        <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Statistiques Lifetime</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{data.lifetimeStats?.totalRequests.toLocaleString() || 0}</p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Requêtes totales</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold" style={{ color: 'var(--color-warning)' }}>
                                        {((data.lifetimeStats?.totalTokens || 0) / 1000).toFixed(0)}K
                                    </p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Tokens utilisés</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold" style={{ color: 'var(--color-success)' }}>{data.lifetimeStats?.activeDays || 0}</p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Jours actifs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold" style={{ color: 'var(--callout-formula-text)' }}>{data.lifetimeStats?.uniqueUsers || 0}</p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Utilisateurs uniques</p>
                                </div>
                            </div>
                            {data.lifetimeStats?.firstRequestAt && (
                                <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>
                                    Depuis le {new Date(data.lifetimeStats.firstRequestAt * 1000).toLocaleDateString('fr-FR')}
                                </p>
                            )}
                        </div>

                        {/* Provider Quotas - Real Limits */}
                        <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Quotas par Provider</h3>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Limites journalières - Reset à minuit UTC</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {data.providers && data.providers.map((provider, idx) => {
                                    const tokenPercent = provider.quota.tokensLimit > 0
                                        ? (provider.quota.tokensUsed / provider.quota.tokensLimit) * 100
                                        : 0;
                                    const requestPercent = provider.quota.requestsLimit > 0
                                        ? (provider.quota.requestsUsed / provider.quota.requestsLimit) * 100
                                        : 0;

                                    return (
                                        <div key={idx} className="p-3 rounded-xl" style={{ background: 'var(--color-bg-overlay)' }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                                    {provider.provider} / {provider.model?.split('/').pop()?.split('-').slice(-2).join('-') || provider.model}
                                                </p>
                                                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                                                    background: provider.circuitState === 'closed' ? 'var(--color-success-subtle)' :
                                                        provider.circuitState === 'open' ? 'var(--color-error-subtle)' :
                                                            'var(--color-warning-subtle)',
                                                    color: provider.circuitState === 'closed' ? 'var(--color-success)' :
                                                        provider.circuitState === 'open' ? 'var(--color-error)' :
                                                            'var(--color-warning)'
                                                }}>
                                                    {provider.circuitState === 'closed' ? 'OK' : (provider.circuitState?.toUpperCase() || 'HALF')}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span style={{ color: 'var(--color-text-muted)' }}>Tokens</span>
                                                        <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                                            {(provider.quota.tokensUsed / 1000).toFixed(1)}K / {(provider.quota.tokensLimit / 1000).toFixed(0)}K
                                                        </span>
                                                    </div>
                                                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-border-default)' }}>
                                                        <div
                                                            className="h-1.5 rounded-full"
                                                            style={{
                                                                background: tokenPercent > 80 ? 'var(--color-error)' :
                                                                    tokenPercent > 50 ? 'var(--color-warning)' : 'var(--color-success)',
                                                                width: `${Math.min(tokenPercent, 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span style={{ color: 'var(--color-text-muted)' }}>Requêtes</span>
                                                        <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                                            {provider.quota.requestsUsed} / {provider.quota.requestsLimit}
                                                        </span>
                                                    </div>
                                                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-border-default)' }}>
                                                        <div
                                                            className="h-1.5 rounded-full"
                                                            style={{
                                                                background: requestPercent > 80 ? 'var(--color-error)' :
                                                                    requestPercent > 50 ? 'var(--color-warning)' : 'var(--color-success)',
                                                                width: `${Math.min(requestPercent, 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="px-4 sm:px-6 py-4" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Historique des conversations</h3>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Cliquez sur une ligne pour voir la réponse IA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={userFilter}
                                            onChange={(e) => setUserFilter(e.target.value)}
                                            className="text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2"
                                            style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                        >
                                            <option value="">Tous les utilisateurs</option>
                                            {activityUsers.map(uid => (
                                                <option key={uid} value={uid}>
                                                    {uid?.substring(0, 8)}...
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0" style={{ background: 'var(--color-bg-overlay)' }}>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>User</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>Question</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>Provider</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>Tokens</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ borderColor: 'var(--color-border-default)' }}>
                                        {filteredActivity.map((activity) => (
                                                <React.Fragment key={activity.id}>
                                                    <tr
                                                        className="cursor-pointer"
                                                        style={{ borderBottom: '1px solid var(--color-border-default)' }}
                                                        onClick={() => setExpandedRow(expandedRow === activity.id ? null : activity.id)}
                                                    >
                                                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                                                            {new Date(activity.createdAt * 1000).toLocaleString('fr-FR', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                        <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                                                            {activity.userId?.substring(0, 8)}
                                                        </td>
                                                        <td className="px-4 py-3 max-w-[250px]" style={{ color: 'var(--color-text-primary)' }}>
                                                            <p className="truncate">{activity.question}</p>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                                                                {activity.provider}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                                            {activity.tokens?.toLocaleString() || 0}
                                                        </td>
                                                    </tr>
                                                    {expandedRow === activity.id && (
                                                        <tr key={`${activity.id}-expanded`} style={{ background: 'var(--color-bg-overlay)' }}>
                                                            <td colSpan={5} className="px-4 py-4">
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Question complète :</p>
                                                                        <p className="text-sm p-3 rounded-lg" style={{ color: 'var(--color-text-primary)', background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                                                            {activity.question}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Réponse IA ({activity.model}) :</p>
                                                                        <div className="text-sm p-3 rounded-lg max-h-[200px] overflow-y-auto whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)', background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                                                                            {activity.answer || 'Réponse non disponible'}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                                        <span>Latence: <strong style={{ color: activity.latencyMs < 1000 ? 'var(--color-success)' : activity.latencyMs < 2000 ? 'var(--color-warning)' : 'var(--color-error)' }}>{activity.latencyMs}ms</strong></span>
                                                                        <span>Complexité: <strong>{activity.complexity || 'N/A'}</strong></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        {filteredActivity.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
                                                    Aucune activité enregistrée
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'users' && (
                    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                        <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Tous les utilisateurs</h2>
                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{data.users.length} utilisateur{data.users.length > 1 ? 's' : ''}</p>
                        </div>
                        <div className="md:hidden px-4 py-4 space-y-3">
                            {data.users.map(user => (
                                <div
                                    key={`mobile-${user.uid}`}
                                    className="rounded-xl p-4"
                                    style={{
                                        border: '1px solid var(--color-border-default)',
                                        background: 'var(--color-bg-overlay)',
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-10 h-10 rounded-full shrink-0"
                                                    style={{ border: '1px solid var(--color-border-default)' }}
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-bg-raised)' }}>
                                                    <Users className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{user.displayName}</p>
                                                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 text-xs font-medium rounded-full shrink-0" style={{
                                            background: user.tier === 'premium' ? 'var(--color-accent-subtle)' : 'var(--color-bg-raised)',
                                            color: user.tier === 'premium' ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                                        }}>
                                            {user.tier === 'premium' ? 'Premium' : 'Gratuit'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                                        <div>
                                            <p style={{ color: 'var(--color-text-muted)' }}>Statut</p>
                                            <p className="font-medium mt-0.5" style={{ color: isUserOnline(user.lastActive) ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
                                                {isUserOnline(user.lastActive) ? 'En ligne' : 'Hors ligne'}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ color: 'var(--color-text-muted)' }}>Usage IA</p>
                                            <p className="font-medium mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
                                                {user.aiUsage.requestsToday}/{user.aiUsage.requestsLimit}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead style={{ background: 'var(--color-bg-overlay)' }}>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Utilisateur</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Statut</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Tier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Usage IA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Dernière activité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.map(user => (
                                        <tr key={user.uid} className="transition-colors" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName}
                                                            className="w-10 h-10 rounded-full"
                                                            style={{ border: '1px solid var(--color-border-default)' }}
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-bg-overlay)' }}>
                                                            <Users className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{user.displayName}</p>
                                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full" style={{ background: isUserOnline(user.lastActive) ? 'var(--color-success)' : 'var(--color-border-default)' }} />
                                                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                        {isUserOnline(user.lastActive) ? 'En ligne' : 'Hors ligne'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full" style={{
                                                    background: user.tier === 'premium' ? 'var(--color-accent-subtle)' : 'var(--color-bg-overlay)',
                                                    color: user.tier === 'premium' ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                                                }}>
                                                    {user.tier === 'premium' ? 'Premium' : 'Gratuit'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{user.aiUsage.requestsToday}/{user.aiUsage.requestsLimit}</p>
                                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user.aiUsage.tokensUsed.toLocaleString()} tokens</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                                {user.lastActive ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span className="text-xs">{new Date(user.lastActive).toLocaleString('fr-FR')}</span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Jamais</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {selectedTab === 'providers' && (
                    <div className="space-y-4">
                        <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>État du Pool de Providers</h2>
                                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Santé et quotas des modèles IA</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.providers && data.providers.length > 0 ? (
                                    data.providers.map((provider, idx) => (
                                        <div key={idx} className="p-4 rounded-xl transition-colors" style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{provider.provider}</p>
                                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{provider.model}</p>
                                                </div>
                                                {provider.circuitState === 'closed' ? (
                                                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-success)' }}>
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        <span className="text-xs font-medium">OK</span>
                                                    </div>
                                                ) : provider.circuitState === 'open' ? (
                                                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-error)' }}>
                                                        <XCircle className="h-4 w-4" />
                                                        <span className="text-xs font-medium">DOWN</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-warning)' }}>
                                                        <Activity className="h-4 w-4" />
                                                        <span className="text-xs font-medium">HALF</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center">
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Taux de succès:</span>
                                                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                        {provider.successCount + provider.failureCount > 0
                                                            ? Math.round((provider.successCount / (provider.successCount + provider.failureCount)) * 100)
                                                            : 0}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Requêtes:</span>
                                                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                        {provider.quota.requestsUsed.toLocaleString()} / {provider.quota.requestsLimit.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Tokens:</span>
                                                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                        {(provider.quota.tokensUsed / 1000).toFixed(1)}K / {(provider.quota.tokensLimit / 1000).toFixed(0)}K
                                                    </span>
                                                </div>

                                                {/* Progress bar - Token usage */}
                                                <div className="pt-1">
                                                    <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-border-default)' }}>
                                                        <div
                                                            className="h-1.5 rounded-full transition-all"
                                                            style={{
                                                                background: provider.quota.tokensUsed / provider.quota.tokensLimit > 0.8 ? 'var(--color-error)' :
                                                                    provider.quota.tokensUsed / provider.quota.tokensLimit > 0.5 ? 'var(--color-warning)' :
                                                                        'var(--color-success)',
                                                                width: `${Math.min((provider.quota.tokensUsed / provider.quota.tokensLimit) * 100, 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-12">
                                        <Activity className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-border-default)' }} />
                                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Aucune donnée de provider disponible</p>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Les providers apparaîtront après les premières requêtes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'content' && (
                    <div className="space-y-4">
                        <div
                            className="sticky top-24 z-30 rounded-2xl p-4"
                            style={{
                                background: 'color-mix(in srgb, var(--color-bg-raised) 92%, transparent)',
                                border: '1px solid var(--color-border-default)',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                        Configuration contenu (badges + notifications)
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: hasUnsavedChanges ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
                                        {hasUnsavedChanges ? 'Modifications non enregistrees' : 'Aucune modification en attente'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => fetchSiteConfig()}
                                        className="px-4 py-2 rounded-lg text-sm font-medium"
                                        style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)' }}
                                    >
                                        Recharger
                                    </button>
                                    <button
                                        onClick={saveSiteConfig}
                                        disabled={siteConfigSaving || !hasUnsavedChanges}
                                        className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                                        style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                                    >
                                        {siteConfigSaving ? 'Enregistrement...' : 'Enregistrer les changements'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Badges de cours</h2>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                        Configuration par semestre, matiere et chapitre (titres reels des cours).
                                    </p>
                                </div>
                                <button
                                    onClick={() => fetchSiteConfig()}
                                    disabled={siteConfigLoading}
                                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                                    style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)' }}
                                >
                                    Recharger config
                                </button>
                            </div>

                            <div className="rounded-xl p-3 mb-4" style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    <select
                                        value={badgeSemesterFilter}
                                        onChange={(e) => setBadgeSemesterFilter(e.target.value as 'all' | 'S3' | 'S4')}
                                        className="h-10 px-3 rounded-lg text-sm"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                    >
                                        <option value="all">Tous semestres</option>
                                        <option value="S3">S3</option>
                                        <option value="S4">S4</option>
                                    </select>
                                    <select
                                        value={badgeSubjectFilter}
                                        onChange={(e) => setBadgeSubjectFilter(e.target.value as any)}
                                        className="h-10 px-3 rounded-lg text-sm"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                    >
                                        <option value="all">Toutes matieres</option>
                                        <option value="macro">Macro</option>
                                        <option value="micro">Micro</option>
                                        <option value="stats">Stats</option>
                                        <option value="socio">Sociologie</option>
                                        <option value="management">Management</option>
                                    </select>
                                    <div className="relative md:col-span-2">
                                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                                        <input
                                            value={badgeSearch}
                                            onChange={(e) => setBadgeSearch(e.target.value)}
                                            placeholder="Rechercher un cours..."
                                            className="h-10 w-full pl-9 pr-3 rounded-lg text-sm"
                                            style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <button
                                        onClick={toggleSelectVisible}
                                        className="inline-flex items-center gap-2 h-9 px-3 rounded-lg text-sm font-medium"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                    >
                                        {visibleCourseKeys.every((key) => selectedCourseKeys.includes(key)) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                        {visibleCourseKeys.every((key) => selectedCourseKeys.includes(key)) ? 'Tout deselectionner (filtres)' : 'Tout selectionner (filtres)'}
                                    </button>
                                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>
                                        {selectedCourseKeys.length} selectionne(s)
                                    </span>
                                    <select
                                        value={bulkBadgeValue}
                                        onChange={(e) => setBulkBadgeValue(e.target.value as BadgeValue)}
                                        className="h-9 px-3 rounded-lg text-sm"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                    >
                                        <option value="">Aucun badge</option>
                                        <option value="new">Nouveau</option>
                                        <option value="soon">Bientot</option>
                                    </select>
                                    <button
                                        onClick={applyBulkBadge}
                                        disabled={selectedCourseKeys.length === 0}
                                        className="h-9 px-3 rounded-lg text-sm font-medium disabled:opacity-60"
                                        style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                                    >
                                        Appliquer le badge ({selectedCourseKeys.length} selectionne(s))
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(groupedFilteredCourses).map(([semester, subjects]) => (
                                    <div key={semester} className="rounded-xl p-3" style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}>
                                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>{semester}</p>
                                        <div className="space-y-3">
                                            {Object.entries(subjects).map(([subjectName, courses]) => (
                                                <div key={`${semester}-${subjectName}`} className="rounded-lg p-3" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-raised)' }}>
                                                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>{subjectName}</p>
                                                    <div className="space-y-2">
                                                        {courses.map((course) => (
                                                            <div key={course.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                                <label className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedCourseKeys.includes(course.key)}
                                                                        onChange={() => toggleCourseSelection(course.key)}
                                                                    />
                                                                    <span className="font-medium">{course.chapterLabel}</span>
                                                                    <span style={{ color: 'var(--color-text-muted)' }}>- {course.chapterTitle}</span>
                                                                </label>
                                                                <select
                                                                    value={siteConfig.courseBadges[course.key] || ''}
                                                                    onChange={(e) => setBadgeForCourse(course.key, e.target.value as BadgeValue)}
                                                                    className="h-9 px-3 rounded-lg text-sm"
                                                                    style={{ background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}
                                                                >
                                                                    <option value="">Aucun badge</option>
                                                                    <option value="new">Nouveau</option>
                                                                    <option value="soon">Bientot</option>
                                                                </select>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {filteredCourses.length === 0 && (
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Aucun cours ne correspond aux filtres.</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-default)' }}>
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Notifications TopBar</h2>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                        Gere les notifications visibles dans la cloche.
                                    </p>
                                </div>
                                <button
                                    onClick={addNotification}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                                >
                                    <Bell className="h-4 w-4" />
                                    Ajouter
                                </button>
                            </div>

                            <div className="mb-3 flex items-center gap-2">
                                <select
                                    value={notificationViewFilter}
                                    onChange={(e) => setNotificationViewFilter(e.target.value as NotificationViewFilter)}
                                    className="h-9 px-3 rounded-lg text-sm"
                                    style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)' }}
                                >
                                    <option value="active">Actives</option>
                                    <option value="expired">Expirees</option>
                                    <option value="all">Toutes</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                {filteredNotifications.map((notif) => {
                                    const index = siteConfig.notifications.findIndex((n) => n.id === notif.id);
                                    if (index < 0) return null;
                                    return (
                                    <div
                                        key={`${notif.id}-${index}`}
                                        className="p-3 rounded-xl"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                                            <select
                                                value={notif.subjectKey}
                                                onChange={(e) => updateNotification(index, 'subjectKey', e.target.value)}
                                                className="h-10 px-3 rounded-lg text-sm"
                                                style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                            >
                                                <option value="macro">Macro</option>
                                                <option value="micro">Micro</option>
                                                <option value="stats">Stats</option>
                                                <option value="socio">Sociologie</option>
                                                <option value="management">Management</option>
                                            </select>
                                            <input
                                                value={notif.subject}
                                                onChange={(e) => updateNotification(index, 'subject', e.target.value)}
                                                placeholder="Sujet"
                                                className="h-10 px-3 rounded-lg text-sm"
                                                style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                            />
                                            <input
                                                value={notif.chapter}
                                                onChange={(e) => updateNotification(index, 'chapter', e.target.value)}
                                                placeholder="Message"
                                                className="h-10 px-3 rounded-lg text-sm md:col-span-2"
                                                style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                            />
                                            <input
                                                value={notif.time}
                                                onChange={(e) => updateNotification(index, 'time', e.target.value)}
                                                placeholder="Label temps"
                                                className="h-10 px-3 rounded-lg text-sm"
                                                style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                value={Number(notif.expiresInHours ?? 168)}
                                                onChange={(e) => updateNotification(index, 'expiresInHours', Number(e.target.value || 0))}
                                                placeholder="Expiration (h)"
                                                className="h-10 px-3 rounded-lg text-sm"
                                                style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', color: 'var(--color-text-primary)' }}
                                            />
                                            <button
                                                onClick={() => removeNotification(index)}
                                                className="h-10 px-3 rounded-lg text-sm font-medium"
                                                style={{ background: 'var(--color-error-subtle)', color: 'var(--color-error)' }}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                )})}

                                {filteredNotifications.length === 0 && (
                                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        Aucune notification pour ce filtre.
                                    </p>
                                )}
                            </div>

                            {siteConfigError && (
                                <p className="text-sm mt-4" style={{ color: 'var(--color-error)' }}>
                                    {siteConfigError}
                                </p>
                            )}

                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    onClick={() => fetchSiteConfig()}
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)' }}
                                >
                                    Annuler modifications
                                </button>
                                <button
                                    onClick={saveSiteConfig}
                                    disabled={siteConfigSaving || !hasUnsavedChanges}
                                    className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                                >
                                    {siteConfigSaving ? 'Enregistrement...' : 'Enregistrer les changements'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
