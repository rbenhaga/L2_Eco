/**
 * AI Chat Widget - "Oiko"
 *
 * Clean ChatGPT-style chat interface for students.
 */

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, X, AlertCircle, Bot, User, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import {
    sendChatMessage,
    getContextFromURL,
    extractPageContent,
    RateLimitError,
    ServiceUnavailableError,
    type ChatResponse
} from '../../../services/ai';
import { MarkdownMessage } from './MarkdownMessage';

// ============================================
// Types
// ============================================

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    displayedContent?: string;
    isStreaming?: boolean;
    timestamp: number;
    metadata?: ChatResponse;
}

// ============================================
// User Avatar Component
// ============================================

function UserAvatar() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user?.photoURL) {
        return (
            <img
                src={user.photoURL}
                alt="Vous"
                referrerPolicy="no-referrer"
                className="shrink-0 w-8 h-8 rounded-full object-cover"
            />
        );
    }

    return (
        <div
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-bg-overlay)' }}
        >
            <User className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
        </div>
    );
}

// ============================================
// Main Component
// ============================================

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const streamingRef = useRef<{ cancel: boolean }>({ cancel: false });

    // Typewriter effect
    useEffect(() => {
        if (!streamingMessageId) return;

        const message = messages.find(m => m.id === streamingMessageId);
        if (!message || !message.isStreaming) return;

        const fullContent = message.content;
        const currentLength = message.displayedContent?.length || 0;

        if (currentLength >= fullContent.length) {
            setMessages(prev => prev.map(m =>
                m.id === streamingMessageId
                    ? { ...m, isStreaming: false, displayedContent: fullContent }
                    : m
            ));
            setStreamingMessageId(null);
            return;
        }

        const nextSpace = fullContent.indexOf(' ', currentLength + 1);
        const chunkEnd = nextSpace === -1 ? fullContent.length : nextSpace + 1;

        const timer = setTimeout(() => {
            if (streamingRef.current.cancel) return;
            setMessages(prev => prev.map(m =>
                m.id === streamingMessageId
                    ? { ...m, displayedContent: fullContent.slice(0, chunkEnd) }
                    : m
            ));
        }, 15);

        return () => clearTimeout(timer);
    }, [streamingMessageId, messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messages.length]);

    // Additional scroll on content change (for LaTeX rendering)
    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages.map(m => m.displayedContent || m.content).join('')]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)');
        const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
        setIsDesktop(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const context = getContextFromURL();

            // Extract page content only on first message for efficiency
            const pageContent = messages.length === 0 ? extractPageContent() : undefined;

            // Prepare conversation history (last 6 messages max to limit tokens - reduced from 10)
            const MAX_HISTORY_MESSAGES = 6;
            const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES).map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await sendChatMessage({
                question: userMessage.content,
                context: {
                    ...context,
                    pageContent
                },
                conversationHistory: recentMessages.length > 0 ? recentMessages : undefined
            });

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.answer,
                displayedContent: '',
                isStreaming: true,
                timestamp: Date.now(),
                metadata: response
            };

            setMessages(prev => [...prev, assistantMessage]);
            setStreamingMessageId(assistantMessage.id);

        } catch (error: any) {
            console.error('Chat error:', error);

            if (error instanceof RateLimitError) {
                setError(`Limite atteinte. Reessayez dans ${error.retryAfter}s.`);
            } else if (error instanceof ServiceUnavailableError) {
                setError('Service temporairement indisponible.');
            } else {
                setError('Une erreur est survenue. Veuillez reessayer.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => {
                    setIsOpen(true);
                    setIsExpanded(false);
                }}
                className="fixed bottom-24 right-4 sm:right-6 lg:bottom-6 rounded-full p-4 transition-all hover:scale-105 z-[70]"
                style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-accent-foreground)',
                    boxShadow: 'var(--shadow-lg)',
                }}
                aria-label="Ouvrir Oiko"
            >
                <Bot className="w-6 h-6" />
            </button>
        );
    }

    return (
        <>
        {isExpanded && (
            <div
                className="fixed z-50"
                style={{
                    background: 'color-mix(in srgb, var(--color-text-primary) 16%, transparent)',
                    left: isDesktop ? 'var(--sidebar-width, 0px)' : '0',
                    top: isDesktop ? '56px' : '0',
                    width: isDesktop ? 'calc(100vw - var(--sidebar-width, 0px))' : '100vw',
                    height: isDesktop ? 'calc(100vh - 56px)' : '100vh',
                }}
                onClick={() => setIsExpanded(false)}
            />
        )}
        <div
            className={`fixed rounded-2xl flex flex-col z-[70] overflow-hidden transition-all duration-200 ${
                isExpanded ? '' : 'bottom-24 right-3 sm:right-6 lg:bottom-6 w-[min(94vw,380px)] h-[min(76vh,550px)]'
            }`}
            style={{
                background: 'var(--color-bg-raised)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                ...(isExpanded
                    ? {
                        left: isDesktop
                            ? 'calc(var(--sidebar-width, 0px) + ((100vw - var(--sidebar-width, 0px)) / 2))'
                            : '50%',
                        top: isDesktop ? 'calc(56px + ((100vh - 56px) / 2))' : '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isDesktop ? 'min(92vw, 980px)' : 'min(94vw, 980px)',
                        maxWidth: isDesktop ? 'calc(100vw - var(--sidebar-width, 0px) - 32px)' : 'calc(100vw - 24px)',
                        height: isDesktop ? 'min(88vh, 760px)' : 'min(92vh, 760px)',
                        maxHeight: isDesktop ? 'calc(100vh - 56px - 24px)' : 'calc(100vh - 24px)',
                    }
                    : {}),
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{
                    borderColor: 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                    background: 'linear-gradient(to right, var(--color-accent-subtle), var(--color-bg-raised))',
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(to bottom right, var(--color-accent-subtle), color-mix(in srgb, var(--callout-formula-text) 15%, transparent))' }}
                    >
                        <Bot className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Oiko</h3>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Assistant pedagogique</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                        title={isExpanded ? 'Reduire' : 'Agrandir'}
                        aria-label={isExpanded ? 'Reduire la fenetre du chatbot' : 'Agrandir la fenetre du chatbot'}
                    >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    {/* New Conversation Button */}
                    {messages.length > 0 && (
                        <button
                            onClick={() => {
                                setMessages([]);
                                setError(null);
                                streamingRef.current.cancel = true;
                                setStreamingMessageId(null);
                            }}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--color-text-muted)' }}
                            title="Nouvelle conversation"
                            aria-label="Nouvelle conversation"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setIsExpanded(false);
                        }}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: 'var(--color-bg-overlay)' }}>
                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <div
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(to bottom right, var(--color-accent-subtle), color-mix(in srgb, var(--callout-formula-text) 15%, transparent))' }}
                        >
                            <Bot className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <h4 className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Bonjour ! Je suis Oiko</h4>
                        <p className="text-sm max-w-[240px] mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            Posez-moi vos questions sur le cours, je suis la pour vous aider.
                        </p>
                    </div>
                )}

                {messages.map(message => (
                    <div key={message.id} className="flex gap-3">
                        {/* Avatar */}
                        {message.role === 'assistant' ? (
                            <div
                                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: 'linear-gradient(to bottom right, var(--color-accent-subtle), color-mix(in srgb, var(--callout-formula-text) 15%, transparent))' }}
                            >
                                <Bot className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            </div>
                        ) : (
                            <UserAvatar />
                        )}

                        {/* Message content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                                {message.role === 'assistant' ? 'Oiko' : 'Vous'}
                            </p>
                            <div
                                className="rounded-2xl px-4 py-3"
                                style={message.role === 'user'
                                    ? {
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-accent-foreground)',
                                    }
                                    : {
                                        background: 'var(--color-bg-raised)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                                        boxShadow: 'var(--shadow-sm)',
                                    }
                                }
                            >
                                {message.role === 'assistant' ? (
                                    <div className="text-sm leading-relaxed">
                                        <MarkdownMessage
                                            content={message.displayedContent ?? message.content}
                                        />
                                        {message.isStreaming && (
                                            <span
                                                className="inline-block w-1.5 h-4 ml-0.5 animate-pulse rounded-sm"
                                                style={{ background: 'var(--color-accent)' }}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading */}
                {isLoading && (
                    <div className="flex gap-3">
                        <div
                            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(to bottom right, var(--color-accent-subtle), color-mix(in srgb, var(--callout-formula-text) 15%, transparent))' }}
                        >
                            <Bot className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Oiko</p>
                            <div
                                className="rounded-2xl px-4 py-3"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '1px solid color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent)', animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent)', animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-accent)', animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Error */}
            {error && (
                <div
                    className="mx-4 mb-2 p-3 rounded-xl flex items-start gap-2"
                    style={{
                        background: 'var(--color-error-subtle)',
                        border: '1px solid color-mix(in srgb, var(--color-error) 20%, transparent)',
                    }}
                >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--color-error)' }} />
                    <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>
                </div>
            )}

            {/* Input */}
            <div
                className="p-4 border-t"
                style={{
                    borderColor: 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                    background: 'var(--color-bg-raised)',
                }}
            >
                <div className="flex gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Posez votre question..."
                        className="flex-1 resize-none px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent min-h-[44px] max-h-32 text-sm transition-colors"
                        style={{
                            borderColor: 'var(--color-border-default)',
                            background: 'var(--color-bg-overlay)',
                            color: 'var(--color-text-primary)',
                            /* focus ring via CSS variable not easily done inline; kept as functional */
                        }}
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-4 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)',
                        }}
                        aria-label="Envoyer"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="text-[11px] mt-2 text-center" style={{ color: 'var(--color-text-muted)' }}>
                    Oiko peut faire des erreurs. Verifiez les informations importantes.
                </p>
            </div>
        </div>
        </>
    );
}

export default AIChatWidget;
