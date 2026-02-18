/**
 * GlobalSearchModal - Modal de recherche globale
 * Design: Command palette style (Cmd+K)
 */

import { Search, X, FileText, BookOpen, HelpCircle, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { searchResources, type SearchResult } from '../../utils/searchIndex';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  cours: BookOpen,
  td: FileText,
  qcm: HelpCircle,
  annales: Calendar,
  chapter: BookOpen,
};

const typeLabels = {
  cours: 'Cours',
  td: 'TD',
  qcm: 'QCM',
  annales: 'Annales',
  chapter: 'Chapitre',
};

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchResources(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
          style={{ background: 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)', backdropFilter: 'blur(4px)' }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
          style={{
            background: 'var(--color-bg-raised)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--color-border-default)',
          }}
        >
          {/* Search Input */}
          <div
            className="flex items-center gap-3 px-4 py-4 border-b"
            style={{ borderColor: 'var(--color-border-default)' }}
          >
            <Search className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un chapitre, une matière, un concept..."
              className="flex-1 text-base outline-none"
              style={{
                background: 'transparent',
                color: 'var(--color-text-primary)',
              }}
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors flex-shrink-0"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-overlay)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-text-muted)', strokeWidth: 1.5 }} />
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Tapez au moins 2 caractères pour rechercher
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-text-muted)', strokeWidth: 1.5 }} />
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  Aucun résultat
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = typeIcons[result.type];
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-4 px-4 py-3 text-left transition-all"
                      style={{
                        background: isSelected ? 'var(--color-bg-overlay)' : 'transparent',
                        borderLeft: isSelected ? '3px solid var(--color-accent)' : '3px solid transparent',
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {/* Icon */}
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'var(--color-bg-overlay)',
                          border: '1px solid var(--color-border-default)',
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
                            style={{
                              background: 'var(--color-accent-subtle)',
                              color: 'var(--color-accent)',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {typeLabels[result.type]}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {result.module} • {result.semester}
                          </span>
                        </div>
                        <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                          {result.title}
                        </p>
                        {result.description && (
                          <p className="text-xs line-clamp-1" style={{ color: 'var(--color-text-muted)' }}>
                            {result.description}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0"
                        style={{
                          color: isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)',
                          opacity: isSelected ? 1 : 0,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{
              borderColor: 'var(--color-border-default)',
              background: 'var(--color-bg-overlay)',
            }}
          >
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <div className="flex items-center gap-1.5">
                <kbd
                  className="px-2 py-1 rounded font-semibold"
                  style={{
                    background: 'var(--color-bg-raised)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  ↑↓
                </kbd>
                <span>Naviguer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd
                  className="px-2 py-1 rounded font-semibold"
                  style={{
                    background: 'var(--color-bg-raised)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  ↵
                </kbd>
                <span>Sélectionner</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd
                  className="px-2 py-1 rounded font-semibold"
                  style={{
                    background: 'var(--color-bg-raised)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  Esc
                </kbd>
                <span>Fermer</span>
              </div>
            </div>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {results.length} résultat{results.length > 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
