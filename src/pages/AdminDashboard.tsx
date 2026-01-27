/**
 * Admin Dashboard - Analytics & Platform Health
 * Only accessible to rayanebenhaga@gmail.com
 * Design: Clean institutional aesthetic matching site's design system
 */

import React, { useState, useEffect } from 'react';
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
    RefreshCw
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

export default function AdminDashboard() {
    const auth = getAuth();
    const navigate = useNavigate();
    const user = auth.currentUser;

    const [data, setData] = useState<AdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'providers'>('overview');
    const [refreshing, setRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('24h');
    const [userFilter, setUserFilter] = useState<string>('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    // Check if user is admin
    useEffect(() => {
        if (!user || user.email !== 'rayanebenhaga@gmail.com') {
            navigate('/');
        }
    }, [user, navigate]);

    // Fetch admin data
    const fetchAdminData = async (showRefreshing = false) => {
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
    };

    useEffect(() => {
        fetchAdminData();
        const interval = setInterval(() => fetchAdminData(), 30000); // Refresh every 30s

        return () => clearInterval(interval);
    }, [user]);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFBFE]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Chargement du dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFBFE]">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Erreur de chargement</h2>
                    <p className="text-slate-600 mb-6">{error || 'Impossible de charger les données'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFBFE]">
            {/* Header */}
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                                aria-label="Retour"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-semibold text-slate-900">Dashboard Admin</h1>
                                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">Analytiques & Santé de la plateforme</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchAdminData(true)}
                                disabled={refreshing}
                                className="p-2 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50"
                                aria-label="Rafraîchir"
                            >
                                <RefreshCw className={`h-5 w-5 text-slate-600 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={exportData}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium"
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export JSON</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 border-b border-slate-200/60 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Vue d\'ensemble', shortLabel: 'Stats', icon: BarChart3 },
                            { id: 'users', label: 'Utilisateurs', shortLabel: 'Users', icon: Users },
                            { id: 'providers', label: 'Providers', shortLabel: 'AI', icon: Activity }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id as any)}
                                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedTab === tab.id
                                    ? 'text-indigo-700'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.shortLabel}</span>
                                {selectedTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {selectedTab === 'overview' && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {/* Total Users */}
                            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 rounded-xl bg-indigo-50">
                                        <Users className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    {data.stats.users.active > 0 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
                                            {data.stats.users.active} en ligne
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {data.stats.users.total}
                                </h3>
                                <p className="text-sm text-slate-500">Utilisateurs</p>
                            </div>

                            {/* AI Requests */}
                            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 rounded-xl bg-purple-50">
                                        <MessageSquare className="h-5 w-5 text-purple-600" />
                                    </div>
                                    {data.stats.ai.todayRequests > 0 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-700">
                                            {data.stats.ai.todayRequests} aujourd'hui
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {data.stats.ai.totalRequests}
                                </h3>
                                <p className="text-sm text-slate-500">Requêtes IA</p>
                            </div>

                            {/* Tokens Used - show from pool quota */}
                            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2.5 rounded-xl bg-amber-50">
                                        <Zap className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        / {(data.poolQuota.tokensTotal / 1000000).toFixed(1)}M
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {data.poolQuota.tokensUsed > 1000000
                                        ? `${(data.poolQuota.tokensUsed / 1000000).toFixed(2)}M`
                                        : `${(data.poolQuota.tokensUsed / 1000).toFixed(1)}K`}
                                </h3>
                                <p className="text-xs text-slate-500">Tokens utilisés aujourd'hui</p>
                                <div className="mt-2">
                                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                                        <div
                                            className="bg-amber-500 h-1.5 rounded-full transition-all"
                                            style={{ width: `${Math.min((data.poolQuota.tokensUsed / data.poolQuota.tokensTotal) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pool Quota - Requests */}
                            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2.5 rounded-xl bg-blue-50">
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        / {data.poolQuota.requestsTotal.toLocaleString()}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {data.poolQuota.requestsRemaining.toLocaleString()}
                                </h3>
                                <p className="text-xs text-slate-500">Requêtes restantes</p>
                                <div className="mt-2">
                                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                                            style={{ width: `${(data.poolQuota.requestsRemaining / data.poolQuota.requestsTotal) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Activité IA</h3>
                                    <p className="text-sm text-slate-500">
                                        {timeRange === '24h' ? 'Dernières 24 heures' :
                                            timeRange === '7d' ? '7 derniers jours' : '30 derniers jours'}
                                    </p>
                                </div>

                                {/* Time range selector */}
                                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                    {[
                                        { value: '24h', label: '24h' },
                                        { value: '7d', label: '7j' },
                                        { value: '30d', label: '30j' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setTimeRange(option.value as TimeRange)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === option.value
                                                ? 'bg-white text-slate-900 shadow-sm'
                                                : 'text-slate-600 hover:text-slate-900'
                                                }`}
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
                                        data={(() => {
                                            if (timeRange === '24h') {
                                                // Use hourly data
                                                return data.hourlyStats && data.hourlyStats.length > 0
                                                    ? data.hourlyStats
                                                    : Array.from({ length: 24 }, (_, i) => ({
                                                        datetime: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
                                                        hour: (new Date().getHours() - 23 + i + 24) % 24,
                                                        requests: 0,
                                                        tokens: 0
                                                    }));
                                            } else if (timeRange === '7d') {
                                                // Filter daily stats to last 7 days
                                                const sevenDaysAgo = new Date();
                                                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                                                return data.dailyStats
                                                    ?.filter(d => new Date(d.date) >= sevenDaysAgo)
                                                    .reverse() || [];
                                            } else {
                                                // All daily stats (30 days)
                                                return data.dailyStats?.slice().reverse() || [];
                                            }
                                        })()}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey={timeRange === '24h' ? 'hour' : 'date'}
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#e2e8f0' }}
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
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                            tickLine={false}
                                            axisLine={false}
                                            width={30}
                                            allowDecimals={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
                                            stroke="#6366f1"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorRequests)"
                                            dot={timeRange !== '24h'}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Stats summary below chart */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Aujourd'hui:</span>
                                        <span className="font-semibold text-indigo-600">{data.stats.ai.todayRequests}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Total:</span>
                                        <span className="font-semibold text-slate-900">{data.stats.ai.totalRequests}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Tokens:</span>
                                        <span className="font-semibold text-amber-600">{(data.stats.ai.totalTokens / 1000).toFixed(1)}K</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lifetime Stats Row - Clean Design */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistiques Lifetime</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-indigo-600">{data.lifetimeStats?.totalRequests.toLocaleString() || 0}</p>
                                    <p className="text-sm text-slate-500 mt-1">Requêtes totales</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-amber-600">
                                        {((data.lifetimeStats?.totalTokens || 0) / 1000).toFixed(0)}K
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">Tokens utilisés</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-emerald-600">{data.lifetimeStats?.activeDays || 0}</p>
                                    <p className="text-sm text-slate-500 mt-1">Jours actifs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-purple-600">{data.lifetimeStats?.uniqueUsers || 0}</p>
                                    <p className="text-sm text-slate-500 mt-1">Utilisateurs uniques</p>
                                </div>
                            </div>
                            {data.lifetimeStats?.firstRequestAt && (
                                <p className="text-xs text-slate-400 text-center mt-4">
                                    Depuis le {new Date(data.lifetimeStats.firstRequestAt * 1000).toLocaleDateString('fr-FR')}
                                </p>
                            )}
                        </div>

                        {/* Provider Quotas - Real Limits */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Quotas par Provider</h3>
                                    <p className="text-xs text-slate-500">Limites journalières - Reset à minuit UTC</p>
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
                                        <div key={idx} className="p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {provider.provider} / {provider.model?.split('/').pop()?.split('-').slice(-2).join('-') || provider.model}
                                                </p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${provider.circuitState === 'closed' ? 'bg-green-100 text-green-700' :
                                                    provider.circuitState === 'open' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {provider.circuitState === 'closed' ? 'OK' : (provider.circuitState?.toUpperCase() || 'HALF')}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-500">Tokens</span>
                                                        <span className="font-medium text-slate-700">
                                                            {(provider.quota.tokensUsed / 1000).toFixed(1)}K / {(provider.quota.tokensLimit / 1000).toFixed(0)}K
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                                        <div
                                                            className={`h-1.5 rounded-full ${tokenPercent > 80 ? 'bg-red-500' :
                                                                tokenPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                                                                }`}
                                                            style={{ width: `${Math.min(tokenPercent, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-500">Requêtes</span>
                                                        <span className="font-medium text-slate-700">
                                                            {provider.quota.requestsUsed} / {provider.quota.requestsLimit}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                                        <div
                                                            className={`h-1.5 rounded-full ${requestPercent > 80 ? 'bg-red-500' :
                                                                requestPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                                                                }`}
                                                            style={{ width: `${Math.min(requestPercent, 100)}%` }}
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
                        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                            <div className="px-4 sm:px-6 py-4 border-b border-slate-200/60">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">Historique des conversations</h3>
                                        <p className="text-xs text-slate-500 mt-1">Cliquez sur une ligne pour voir la réponse IA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={userFilter}
                                            onChange={(e) => setUserFilter(e.target.value)}
                                            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Tous les utilisateurs</option>
                                            {data.recentActivity && [...new Set(data.recentActivity.map(a => a.userId))].map(uid => (
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
                                    <thead className="bg-slate-50/50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">User</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Question</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Provider</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase">Tokens</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {data.recentActivity && data.recentActivity
                                            .filter(a => !userFilter || a.userId === userFilter)
                                            .map((activity) => (
                                                <React.Fragment key={activity.id}>
                                                    <tr
                                                        className="hover:bg-slate-50/50 cursor-pointer"
                                                        onClick={() => setExpandedRow(expandedRow === activity.id ? null : activity.id)}
                                                    >
                                                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                                                            {new Date(activity.createdAt * 1000).toLocaleString('fr-FR', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-500 text-xs font-mono">
                                                            {activity.userId?.substring(0, 8)}
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-900 max-w-[250px]">
                                                            <p className="truncate">{activity.question}</p>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                                                                {activity.provider}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-slate-600 font-medium">
                                                            {activity.tokens?.toLocaleString() || 0}
                                                        </td>
                                                    </tr>
                                                    {expandedRow === activity.id && (
                                                        <tr key={`${activity.id}-expanded`} className="bg-slate-50">
                                                            <td colSpan={5} className="px-4 py-4">
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <p className="text-xs font-medium text-slate-500 mb-1">Question complète :</p>
                                                                        <p className="text-sm text-slate-900 bg-white p-3 rounded-lg border border-slate-200">
                                                                            {activity.question}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-medium text-slate-500 mb-1">Réponse IA ({activity.model}) :</p>
                                                                        <div className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                                                                            {activity.answer || 'Réponse non disponible'}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-4 text-xs text-slate-500">
                                                                        <span>Latence: <strong className={activity.latencyMs < 1000 ? 'text-green-600' : activity.latencyMs < 2000 ? 'text-amber-600' : 'text-red-600'}>{activity.latencyMs}ms</strong></span>
                                                                        <span>Complexité: <strong>{activity.complexity || 'N/A'}</strong></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        {(!data.recentActivity || data.recentActivity.filter(a => !userFilter || a.userId === userFilter).length === 0) && (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
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
                    <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200/60">
                            <h2 className="text-lg font-semibold text-slate-900">Tous les utilisateurs</h2>
                            <p className="text-sm text-slate-500 mt-1">{data.users.length} utilisateur{data.users.length > 1 ? 's' : ''}</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Utilisateur</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Statut</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Tier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Usage IA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Dernière activité</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/60">
                                    {data.users.map(user => (
                                        <tr key={user.uid} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName}
                                                            className="w-10 h-10 rounded-full border border-slate-200"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                            <Users className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900">{user.displayName}</p>
                                                        <p className="text-xs text-slate-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${isUserOnline(user.lastActive) ? 'bg-green-500' : 'bg-slate-300'}`} />
                                                    <span className="text-sm text-slate-600">
                                                        {isUserOnline(user.lastActive) ? 'En ligne' : 'Hors ligne'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.tier === 'premium' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {user.tier === 'premium' ? 'Premium' : 'Gratuit'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="text-slate-900 font-medium">{user.aiUsage.requestsToday}/{user.aiUsage.requestsLimit}</p>
                                                    <p className="text-xs text-slate-500">{user.aiUsage.tokensUsed.toLocaleString()} tokens</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {user.lastActive ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span className="text-xs">{new Date(user.lastActive).toLocaleString('fr-FR')}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400">Jamais</span>
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
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/60">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">État du Pool de Providers</h2>
                                <p className="text-sm text-slate-500 mt-1">Santé et quotas des modèles IA</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.providers && data.providers.length > 0 ? (
                                    data.providers.map((provider, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/50 hover:bg-white transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold text-slate-900">{provider.provider}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{provider.model}</p>
                                                </div>
                                                {provider.circuitState === 'closed' ? (
                                                    <div className="flex items-center gap-1.5 text-green-600">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        <span className="text-xs font-medium">OK</span>
                                                    </div>
                                                ) : provider.circuitState === 'open' ? (
                                                    <div className="flex items-center gap-1.5 text-red-600">
                                                        <XCircle className="h-4 w-4" />
                                                        <span className="text-xs font-medium">DOWN</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-amber-600">
                                                        <Activity className="h-4 w-4" />
                                                        <span className="text-xs font-medium">HALF</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Taux de succès:</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {provider.successCount + provider.failureCount > 0
                                                            ? Math.round((provider.successCount / (provider.successCount + provider.failureCount)) * 100)
                                                            : 0}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Requêtes:</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {provider.quota.requestsUsed.toLocaleString()} / {provider.quota.requestsLimit.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Tokens:</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {(provider.quota.tokensUsed / 1000).toFixed(1)}K / {(provider.quota.tokensLimit / 1000).toFixed(0)}K
                                                    </span>
                                                </div>

                                                {/* Progress bar - Token usage */}
                                                <div className="pt-1">
                                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                                        <div
                                                            className={`h-1.5 rounded-full transition-all ${provider.quota.tokensUsed / provider.quota.tokensLimit > 0.8 ? 'bg-red-500' :
                                                                provider.quota.tokensUsed / provider.quota.tokensLimit > 0.5 ? 'bg-amber-500' :
                                                                    'bg-green-500'
                                                                }`}
                                                            style={{
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
                                        <Activity className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 text-sm">Aucune donnée de provider disponible</p>
                                        <p className="text-slate-400 text-xs mt-1">Les providers apparaîtront après les premières requêtes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
