/**
 * AI Chat Service
 * 
 * Client-side API for interacting with the AI chatbot backend.
 * Handles authentication, request/response formatting, and error handling.
 */

import { getAuth } from 'firebase/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ============================================
// Types
// ============================================

export interface ChatRequest {
    question: string;
    context?: {
        courseId?: string;
        chapterId?: string;
        pageId?: string;
        pageContent?: string;
    };
    conversationHistory?: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
}

export interface ChatResponse {
    answer: string;
    source: 'cache' | 'llm';
    provider: string;
    model: string | null;
    responseTime: number;
    tokensUsed: number;
    similarity?: number;
    cacheId?: string;
    complexity?: 'simple' | 'medium' | 'complex';
    complexityScore?: number;
    quotaRemaining: {
        requests: number;
        limit: number;
        resetsAt: number;
    };
}

export interface QuotaStatus {
    userId: string;
    tier: 'free' | 'premium';
    quota: {
        requestsUsed: number;
        requestsLimit: number;
        requestsRemaining: number;
        tokensUsed: number;
        resetsAt: number;
    };
    cooldown: {
        active: boolean;
        secondsRemaining?: number;
        reason?: string;
    };
    poolStats: {
        quotaRemaining: string;
    };
}

export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'error';
    timestamp: number;
    providers: Record<string, any>;
    pool: {
        capacity: number;
        used: number;
        remaining: number;
        usagePercent: string;
    };
    cache: {
        available: boolean;
    };
}

// ============================================
// Custom Errors
// ============================================

export class RateLimitError extends Error {
    constructor(
        message: string,
        public retryAfter: number,
        public quotaInfo?: ChatResponse['quotaRemaining']
    ) {
        super(message);
        this.name = 'RateLimitError';
    }
}

export class ServiceUnavailableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServiceUnavailableError';
    }
}

export class ValidationError extends Error {
    constructor(message: string, public field?: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get Firebase auth token (or skip in dev mode)
 */
async function getAuthToken(): Promise<string | null> {
    // In development, we can skip auth if no user is logged in
    // The backend will use dev-user-123 in development mode
    const isDev = import.meta.env.DEV;
    
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            if (isDev) {
                return null; // Backend will handle dev mode
            }
            throw new Error('User not authenticated');
        }
        return await user.getIdToken();
    } catch (error) {
        if (isDev) {
            return null;
        }
        throw error;
    }
}

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
): Promise<T> {
    const token = await getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Only add Authorization header if we have a token
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Add internal API key if configured (for same-server security)
    const internalApiKey = import.meta.env.VITE_AI_INTERNAL_API_KEY;
    if (internalApiKey) {
        headers['X-API-Key'] = internalApiKey;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Rate limit error
        if (response.status === 429) {
            throw new RateLimitError(
                errorData.message || 'Rate limit exceeded',
                errorData.retryAfter || 60,
                errorData.quota
            );
        }

        // Service unavailable
        if (response.status === 503) {
            throw new ServiceUnavailableError(
                errorData.message || 'Service temporarily unavailable'
            );
        }

        // Validation error
        if (response.status === 400) {
            throw new ValidationError(
                errorData.message || 'Invalid request',
                errorData.field
            );
        }

        // Generic error
        throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
}

// ============================================
// API Functions
// ============================================

/**
 * Send a chat message
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    return await apiRequest<ChatResponse>('/api/ai/chat', 'POST', request);
}

/**
 * Submit feedback for a chat response
 */
export async function submitFeedback(
    chatHistoryId: string | number,
    feedback: 'positive' | 'negative'
): Promise<void> {
    await apiRequest('/api/ai/feedback', 'POST', {
        chatHistoryId,
        feedback
    });
}

/**
 * Get current quota status
 */
export async function getQuotaStatus(): Promise<QuotaStatus> {
    return await apiRequest<QuotaStatus>('/api/ai/quota');
}

/**
 * Get AI service health status (public endpoint)
 */
export async function getHealthStatus(): Promise<HealthStatus> {
    const response = await fetch(`${API_URL}/api/ai/health`);
    if (!response.ok) {
        throw new Error('Failed to fetch health status');
    }
    return await response.json();
}

/**
 * Extract text content from the current page's main content area
 * Preserves LaTeX formulas and structured content
 */
export function extractPageContent(): string {
    // Try to get the main content area
    const mainContent = document.querySelector('main');
    if (!mainContent) return '';

    // Clone to avoid modifying the real DOM
    const clone = mainContent.cloneNode(true) as HTMLElement;

    // Remove unwanted elements (buttons, navigation, chat widget, etc.)
    const elementsToRemove = clone.querySelectorAll(
        'button, nav, .chat-widget, [role="navigation"], [aria-label*="navigation"], header, footer'
    );
    elementsToRemove.forEach(el => el.remove());

    // Try to preserve structured content (formulas, lists, etc.)
    let text = '';
    
    // Look for specific content sections (course content)
    const contentSections = clone.querySelectorAll('article, section, [class*="content"], [class*="course"]');
    
    if (contentSections.length > 0) {
        // Extract from structured sections
        contentSections.forEach(section => {
            // Get headings
            const headings = section.querySelectorAll('h1, h2, h3, h4');
            headings.forEach(h => {
                text += '\n\n## ' + h.textContent?.trim() + '\n';
            });
            
            // Get paragraphs and preserve structure
            const paragraphs = section.querySelectorAll('p, li, td');
            paragraphs.forEach(p => {
                const content = p.textContent?.trim();
                if (content && content.length > 3) {
                    text += content + '\n';
                }
            });
        });
    } else {
        // Fallback: get all text content
        text = clone.textContent || '';
    }

    // Clean up: normalize whitespace but preserve structure
    text = text
        .replace(/\s+/g, ' ')  // Multiple spaces → single space
        .replace(/\n\s*\n\s*\n+/g, '\n\n') // Multiple line breaks → double line break
        .trim();

    // CRITICAL: Limit size to avoid token explosion
    // Keep first 4000 chars ≈ 1000 tokens (reduced from 12000)
    if (text.length > 4000) {
        text = text.substring(0, 4000) + '\n\n[... contenu tronqué pour économiser les tokens ...]';
    }

    return text;
}

/**
 * Extract context from current URL and page content
 */
export function getContextFromURL(): ChatRequest['context'] {
    const path = window.location.pathname;

    // Course name mappings
    const courseNames: Record<string, string> = {
        'macro': 'Macroéconomie',
        'micro': 'Microéconomie',
        'stats': 'Statistiques',
        'psycho': 'Psychologie',
        'socio': 'Sociologie'
    };

    // Match patterns like /macro/chapitre-1 or /s2/macro/ch1
    const macroMatch = path.match(/\/(macro|micro|stats|psycho|socio)(?:\/chapitre-?(\d+)|\/ch(\d+))?/i);

    if (macroMatch) {
        const [, subject, chapterNum1, chapterNum2] = macroMatch;
        const chapterNum = chapterNum1 || chapterNum2;
        const courseName = courseNames[subject.toLowerCase()] || subject;

        // Try to get page title for more context
        const pageTitle = document.querySelector('h1')?.textContent || '';

        return {
            courseId: courseName,
            chapterId: chapterNum ? `Chapitre ${chapterNum}` : undefined,
            pageId: pageTitle || undefined
        };
    }

    // Fallback: try semester pattern /s2/macro/...
    const semesterMatch = path.match(/\/(s\d+)\/([\w-]+)(?:\/(ch\d+|chapitre-?\d+|[\w-]+))?/i);

    if (semesterMatch) {
        const [, semester, subject, chapter] = semesterMatch;
        const courseName = courseNames[subject.toLowerCase()] || subject;
        const pageTitle = document.querySelector('h1')?.textContent || '';

        return {
            courseId: `${courseName} (${semester.toUpperCase()})`,
            chapterId: chapter || undefined,
            pageId: pageTitle || undefined
        };
    }

    return {};
}

export default {
    sendChatMessage,
    submitFeedback,
    getQuotaStatus,
    getHealthStatus,
    getContextFromURL,
    extractPageContent,
    RateLimitError,
    ServiceUnavailableError,
    ValidationError
};
