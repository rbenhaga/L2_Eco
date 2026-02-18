/**
 * SearchModal - Recherche globale premium
 * Design: Modal full-screen avec filtres et résultats
 * Shortcuts: Cmd/Ctrl + K pour ouvrir
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, BookOpen, FileText, HelpCircle, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'cours' | 'td' | 'qcm' | 'annales';
  module: string;
  semester: string;
  year: string;
  path: string;
  excerpt?: string;
  chapter?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Chapitre 1 : Introduction à la macroéconomie',
    type: 'cours',
    module: 'Macroéconomie',
    semester: 'S3',
    year: 'L2',
    path: '/s3/macro/chapitre-1',
    excerpt: 'Les grands agrégats économiques et le circuit économique...',
    chapter: 'Chapitre 1',
  },
  {
    id: '2',
    title: 'TD 1 : Exercices sur le PIB',
    type: 'td',
    module: 'Macroéconomie',
    semester: 'S3',
    year: 'L2',
    path: '/s3/macro?tab=td&td=1',
    excerpt: 'Calculs et applications sur le PIB nominal et réel...',
  },
  {
    id: '3',
    title: 'QCM : Offre et demande',
    type: 'qcm',
    module: 'Microéconomie',
    semester: 'S3',
    year: 'L2',
    path: '/s3/micro?tab=qcm&qcm=1',
    excerpt: '20 questions sur les mécanismes de marché...',
  },
];

const TYPE_ICONS = {
  cours: BookOpen,
  td: FileText,
  qcm: HelpCircle,
  annales: GraduationCap,
};

const TYPE_LABELS = {
  cours: 'Cours',
  td: 'TD',
  qcm: 'QCM',
  annales: 'Annales',
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Filter results based on query and filters
  const filteredResults = useMemo(() => {
    let results = MOCK_RESULTS;

    // Filter by query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(lowerQuery) ||
          r.excerpt?.toLowerCase().includes(lowerQuery) ||
          r.module.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by year
    if (selectedYear !== 'all') {
      results = results.filter((r) => r.year === selectedYear);
    }

    // Filter by semester
    if (selectedSemester !== 'all') {
      results = results.filter((r) => r.semester === selectedSemester);
    }

    // Filter by module
    if (selectedModule !== 'all') {
      results = results.filter((r) => r.module === selectedModule);
    }

    // Filter by type
    if (selectedType !== 'all') {
      results = results.filter((r) => r.type === selectedType);
    }

    return results;
  }, [query, selectedYear, selectedSemester, selectedModule, selectedType]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setShowFilters(false);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleSelectResult(filteredResults[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose]);

  const handleSelectResult = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          style={{
            background: 'var(--color-accent-subtle)',
            color: 'var(--color-accent)',
            fontWeight: 600,
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
          style={{ background: 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-full max-w-2xl mt-8 sm:mt-16 rounded-2xl overflow-hidden"
          style={{
            background: 'var(--color-bg-raised)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--color-border-default)',
            maxHeight: 'calc(100vh - 8rem)',
          }}
        >
          {/* Search Input */}
          <div
            className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4"
            style={{ borderBottom: `1px solid var(--color-border-default)` }}
          >
            <Search className="h-5 w-5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher des cours, TD, QCM..."
              className="flex-1 bg-transparent text-base outline-none"
              style={{ color: 'var(--color-text-primary)' }}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 h-8 px-3 text-sm font-medium rounded-lg transition"
              style={{
                background: showFilters ? 'var(--color-accent-subtle)' : 'var(--color-panel)',
                color: showFilters ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                border: `1px solid ${showFilters ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-panel)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
                style={{ borderBottom: `1px solid var(--color-border-default)` }}
              >
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Year Filter */}
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="h-9 px-3 text-sm rounded-lg outline-none transition"
                      style={{
                        background: 'var(--color-panel)',
                        color: 'var(--color-text-primary)',
                        border: `1px solid var(--color-border-default)`,
                      }}
                    >
                      <option value="all">Toutes années</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                    </select>

                    {/* Semester Filter */}
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="h-9 px-3 text-sm rounded-lg outline-none transition"
                      style={{
                        background: 'var(--color-panel)',
                        color: 'var(--color-text-primary)',
                        border: `1px solid var(--color-border-default)`,
                      }}
                    >
                      <option value="all">Tous semestres</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="S4">S4</option>
                      <option value="S5">S5</option>
                      <option value="S6">S6</option>
                    </select>

                    {/* Module Filter */}
                    <select
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                      className="h-9 px-3 text-sm rounded-lg outline-none transition col-span-2 sm:col-span-1"
                      style={{
                        background: 'var(--color-panel)',
                        color: 'var(--color-text-primary)',
                        border: `1px solid var(--color-border-default)`,
                      }}
                    >
                      <option value="all">Toutes matières</option>
                      <option value="Macroéconomie">Macroéconomie</option>
                      <option value="Microéconomie">Microéconomie</option>
                      <option value="Statistiques">Statistiques</option>
                      <option value="Sociologie">Sociologie</option>
                      <option value="Management">Management</option>
                    </select>

                    {/* Type Filter */}
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="h-9 px-3 text-sm rounded-lg outline-none transition col-span-2 sm:col-span-1"
                      style={{
                        background: 'var(--color-panel)',
                        color: 'var(--color-text-primary)',
                        border: `1px solid var(--color-border-default)`,
                      }}
                    >
                      <option value="all">Tous types</option>
                      <option value="cours">Cours</option>
                      <option value="td">TD</option>
                      <option value="qcm">QCM</option>
                      <option value="annales">Annales</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
            {filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'var(--color-panel)' }}
                >
                  <Search className="h-8 w-8" style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  Aucun résultat
                </p>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Essayez d'autres mots-clés ou ajustez les filtres
                </p>
              </div>
            ) : (
              <div className="py-2">
                {filteredResults.map((result, index) => {
                  const Icon = TYPE_ICONS[result.type];
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelectResult(result)}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left transition"
                      style={{
                        background: isSelected ? 'var(--color-panel)' : 'transparent',
                        borderLeft: isSelected ? `3px solid var(--color-accent)` : '3px solid transparent',
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div
                        className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'var(--color-accent-subtle)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                            {highlightText(result.title, query)}
                          </p>
                        </div>
                        {result.excerpt && (
                          <p className="text-xs line-clamp-1 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                            {highlightText(result.excerpt, query)}
                          </p>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded"
                            style={{
                              background: 'var(--color-accent-subtle)',
                              color: 'var(--color-accent)',
                            }}
                          >
                            {TYPE_LABELS[result.type]}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {result.year} · {result.semester}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {result.module}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-2 text-xs"
            style={{
              borderTop: `1px solid var(--color-border-default)`,
              background: 'var(--color-panel)',
              color: 'var(--color-text-muted)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">↑↓ Naviguer</span>
              <span className="hidden sm:inline">↵ Sélectionner</span>
              <span>ESC Fermer</span>
            </div>
            <span>{filteredResults.length} résultat{filteredResults.length !== 1 ? 's' : ''}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
