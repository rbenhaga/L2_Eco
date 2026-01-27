/**
 * AI Chat Widget - "Οἶκο" (Oiko)
 * 
 * Clean ChatGPT-style chat interface for students.
 */

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, X, AlertCircle, Bot, User, RotateCcw } from 'lucide-react';
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
        <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-500" />
        </div>
    );
}

// ============================================
// Main Component
// ============================================

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
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
                setError(`Limite atteinte. Réessayez dans ${error.retryAfter}s.`);
            } else if (error instanceof ServiceUnavailableError) {
                setError('Service temporairement indisponible.');
            } else {
                setError('Une erreur est survenue. Veuillez réessayer.');
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
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 z-50"
                aria-label="Ouvrir Oiko"
            >
                <Bot className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col z-50 border border-black/5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 bg-gradient-to-r from-indigo-50 to-white">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-sm">Οἶκο</h3>
                        <p className="text-xs text-slate-500">Assistant pédagogique</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {/* New Conversation Button */}
                    {messages.length > 0 && (
                        <button
                            onClick={() => {
                                setMessages([]);
                                setError(null);
                                streamingRef.current.cancel = true;
                                setStreamingMessageId(null);
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Nouvelle conversation"
                            aria-label="Nouvelle conversation"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFBFF]">
                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                            <Bot className="w-8 h-8 text-indigo-500" />
                        </div>
                        <h4 className="font-medium text-slate-900 mb-1">Bonjour ! Je suis Οἶκο</h4>
                        <p className="text-sm text-slate-500 max-w-[240px] mx-auto">
                            Posez-moi vos questions sur le cours, je suis là pour vous aider.
                        </p>
                    </div>
                )}

                {messages.map(message => (
                    <div key={message.id} className="flex gap-3">
                        {/* Avatar */}
                        {message.role === 'assistant' ? (
                            <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-indigo-500" />
                            </div>
                        ) : (
                            <UserAvatar />
                        )}

                        {/* Message content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-500 mb-1">
                                {message.role === 'assistant' ? 'Οἶκο' : 'Vous'}
                            </p>
                            <div className={`rounded-2xl px-4 py-3 ${
                                message.role === 'user'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white border border-black/5 text-slate-700 shadow-sm'
                            }`}>
                                {message.role === 'assistant' ? (
                                    <div className="text-sm leading-relaxed">
                                        <MarkdownMessage 
                                            content={message.displayedContent ?? message.content}
                                        />
                                        {message.isStreaming && (
                                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-indigo-500 animate-pulse rounded-sm" />
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
                        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-slate-500 mb-1">Οἶκο</p>
                            <div className="bg-white border border-black/5 rounded-2xl px-4 py-3 shadow-sm">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Error */}
            {error && (
                <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-black/5 bg-white">
                <div className="flex gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Posez votre question..."
                        className="flex-1 resize-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white min-h-[44px] max-h-32 text-sm transition-colors"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Envoyer"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Οἶκο peut faire des erreurs. Vérifiez les informations importantes.
                </p>
            </div>
        </div>
    );
}

export default AIChatWidget;
