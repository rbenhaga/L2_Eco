/**
 * MOBILE DRAWER — Bottom Sheet Navigation
 * 
 * Replaces hidden sidebar on mobile with a swipeable drawer
 * that provides access to all navigation features.
 * 
 * Design: Bottom sheet (not side drawer) for better thumb reach
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, Menu, ChevronRight, GraduationCap, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { semesters } from '../../config/semesters';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
  currentSemester?: string;
}

export function MobileDrawer({ isOpen, onClose, currentModule, currentSemester = 's3' }: MobileDrawerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState(currentSemester);
  const [expandedModule, setExpandedModule] = useState<string | null>(currentModule || null);

  const semester = semesters[selectedSemester];

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle drag to close
  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'color-mix(in srgb, var(--color-text-primary) 40%, transparent)' }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
            style={{
              maxHeight: '85vh',
              background: 'var(--color-bg-raised)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div
                className="w-12 h-1 rounded-full"
                style={{ background: 'var(--color-border-default)' }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
                <span className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Navigation
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-overlay)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border transition-all"
                  style={{
                    background: 'var(--color-bg-overlay)',
                    borderColor: 'var(--color-border-default)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              {/* Semester selector */}
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Semestre
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(semesters).map(([id, sem]) => (
                    <button
                      key={id}
                      onClick={() => setSelectedSemester(id)}
                      className="py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: selectedSemester === id ? 'var(--color-accent)' : 'var(--color-bg-overlay)',
                        color: selectedSemester === id ? 'var(--color-accent-foreground)' : 'var(--color-text-secondary)',
                        border: selectedSemester === id ? 'none' : '1px solid var(--color-border-default)',
                      }}
                    >
                      {sem.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  Matières
                </div>
                <div className="space-y-2">
                  {semester?.subjects.map((subject) => {
                    const isActive = location.pathname.startsWith(subject.basePath);
                    const isExpanded = expandedModule === subject.id;
                    const Icon = subject.icon;

                    return (
                      <div key={subject.id}>
                        {/* Module button */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(subject.basePath)}
                            className="flex-1 flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                            style={{
                              background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                              color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                            }}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="text-sm font-medium">{subject.name}</span>
                          </button>

                          {/* Expand button */}
                          <button
                            onClick={() => setExpandedModule(isExpanded ? null : subject.id)}
                            className="p-2 rounded-lg transition-all"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </motion.div>
                          </button>
                        </div>

                        {/* Sections (expanded) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-8 mt-1 space-y-1"
                            >
                              {['Cours', 'TD', 'QCM', 'Annales'].map((section) => (
                                <button
                                  key={section}
                                  onClick={() => navigate(`${subject.basePath}?tab=${section.toLowerCase()}`)}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                                  style={{
                                    color: 'var(--color-text-secondary)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-surface-overlay)';
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                  }}
                                >
                                  {section}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="border-t px-4 py-3" style={{ borderColor: 'var(--color-border-default)' }}>
              <button
                onClick={() => {
                  navigate('/');
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'var(--color-bg-overlay)',
                  color: 'var(--color-text-primary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-overlay)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
              >
                Retour à l'accueil
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * MOBILE NAV BUTTON — Floating action button
 * 
 * Appears on mobile to open the drawer
 */

interface MobileNavButtonProps {
  onClick: () => void;
}

export function MobileNavButton({ onClick }: MobileNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
      style={{
        background: 'var(--color-accent)',
        color: 'var(--color-accent-foreground)',
        boxShadow: '0 8px 24px color-mix(in srgb, var(--color-accent) 30%, transparent)',
      }}
      aria-label="Ouvrir le menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}
