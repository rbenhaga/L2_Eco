  /**
 * Sidebar - Navigation latérale avec modules + notifications + user
 * Design: Fixed left, slide-in animation
 * UX: Toggle on/off, always closable with X button
 */

import { GraduationCap, ArrowRight, X, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Module {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  active?: boolean;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  modules: Module[];
  userName?: string;
  userEmail?: string;
  userPlan?: string;
  userPhoto?: string;
  onUpgrade?: () => void;
}

export function Sidebar({ 
  open, 
  onClose, 
  modules, 
  userName, 
  userEmail,
  userPlan, 
  userPhoto,
  onUpgrade,
}: SidebarProps) {
  const [selectedYear, setSelectedYear] = useState('L2');
  const [selectedSemester, setSelectedSemester] = useState('S3');
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop - only on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'color-mix(in srgb, var(--color-text-primary) 35%, transparent)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar - side by side on desktop, overlay on mobile */}
      {open && (
        <aside
          className="h-screen flex-shrink-0 flex flex-col overflow-hidden lg:relative lg:z-0 fixed left-0 top-0 bottom-0 z-50"
          style={{
            width: '280px',
            background: 'var(--color-card)',
            borderRight: `1px solid var(--color-border-default)`,
          }}
          aria-label="Navigation"
        >
          <div className="w-[280px] h-full flex flex-col">
            {/* Header */}
            <div
              className="p-3 shrink-0"
              style={{ borderBottom: `1px solid var(--color-border-default)` }}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 transition-opacity duration-150"
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  aria-label="Retour à l'accueil"
                >
                  <div
                    className="h-10 w-10 rounded-2xl grid place-items-center relative overflow-hidden"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-border-default)',
                    }}
                  >
                    <GraduationCap className="h-5 w-5 relative z-10" style={{ color: 'var(--color-text-primary)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Οἰκονομία
                    </p>
                  </div>
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-panel)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Context Switcher - Modern Pills */}
              <div className="mt-3 space-y-3">
                {/* Année Selector - Horizontal Pills */}
                <div>
                  <p className="px-1 mb-2 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                    Année
                  </p>
                  <div className="flex gap-1.5">
                    {['L1', 'L2', 'L3'].map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          // Auto-select first semester for the year
                          if (year === 'L1') setSelectedSemester('S1');
                          else if (year === 'L2') setSelectedSemester('S3');
                          else setSelectedSemester('S5');
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200"
                        style={{
                          background: selectedYear === year 
                            ? 'var(--color-accent)' 
                            : 'var(--color-panel)',
                          color: selectedYear === year ? 'var(--color-accent-foreground)' : 'var(--color-text-secondary)',
                          border: `1px solid ${selectedYear === year ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                          boxShadow: selectedYear === year ? '0 2px 8px var(--color-accent-subtle)' : 'none',
                          transform: selectedYear === year ? 'translateY(-1px)' : 'translateY(0)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedYear !== year) {
                            e.currentTarget.style.background = 'var(--color-bg-overlay)';
                            e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedYear !== year) {
                            e.currentTarget.style.background = 'var(--color-panel)';
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {year}
                        {selectedYear === year && (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Semestre Selector - Horizontal Pills */}
                <div>
                  <p className="px-1 mb-2 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                    Semestre
                  </p>
                  <div className="flex gap-1.5">
                    {(selectedYear === 'L1' ? ['S1', 'S2'] : 
                      selectedYear === 'L2' ? ['S3', 'S4'] : 
                      ['S5', 'S6']).map((semester) => (
                      <button
                        key={semester}
                        onClick={() => setSelectedSemester(semester)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200"
                        style={{
                          background: selectedSemester === semester 
                            ? 'var(--color-accent)' 
                            : 'var(--color-panel)',
                          color: selectedSemester === semester ? 'var(--color-accent-foreground)' : 'var(--color-text-secondary)',
                          border: `1px solid ${selectedSemester === semester ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                          boxShadow: selectedSemester === semester ? '0 2px 8px var(--color-accent-subtle)' : 'none',
                          transform: selectedSemester === semester ? 'translateY(-1px)' : 'translateY(0)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedSemester !== semester) {
                            e.currentTarget.style.background = 'var(--color-bg-overlay)';
                            e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedSemester !== semester) {
                            e.currentTarget.style.background = 'var(--color-panel)';
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {semester}
                        {selectedSemester === semester && (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Modules */}
              <div className="p-3">
                <p
                  className="px-2 py-2 text-xs font-semibold tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  MATIÈRES
                </p>
                <nav className="space-y-1">
                  {modules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <button
                        key={module.id}
                        className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200"
                        style={{
                          background: module.active ? 'var(--color-bg-raised)' : 'transparent',
                          color: module.active ? 'var(--color-text-primary)' : 'var(--color-text-primary)',
                          border: module.active ? '1px solid var(--color-border-default)' : 'none',
                          boxShadow: module.active ? 'var(--shadow-sm)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!module.active) {
                            e.currentTarget.style.background = 'var(--color-bg-raised)';
                          }
                          // Change text color to red on hover
                          const textSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement;
                          if (textSpan) {
                            textSpan.style.color = 'var(--color-accent)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!module.active) {
                            e.currentTarget.style.background = 'transparent';
                          }
                          // Reset text color
                          const textSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement;
                          if (textSpan) {
                            textSpan.style.color = 'var(--color-text-primary)';
                          }
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            className="h-4 w-4"
                            style={{
                              color: module.active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                            }}
                          />
                          <span className="transition-colors duration-200">
                            {module.label}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4"
                          style={{
                            color: module.active
                              ? 'var(--color-text-secondary)'
                              : 'var(--color-text-muted)',
                          }}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* User section */}
            <div
              className="shrink-0 p-3"
              style={{
                borderTop: `1px solid var(--color-border-default)`,
                background: 'var(--color-card)',
              }}
            >
              <div className="flex items-center gap-3">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={userName || 'User'}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full border-2"
                    style={{ borderColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}
                  />
                ) : (
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                      border: `2px solid color-mix(in srgb, var(--color-accent) 20%, transparent)`,
                    }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                      {userName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {userName || 'Utilisateur'}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                    {userEmail || userPlan || 'FREE'}
                  </p>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {userPlan !== 'premium' && (
                  <button
                    onClick={onUpgrade}
                    className="w-full inline-flex items-center justify-center gap-2 h-9 px-3 text-sm font-semibold rounded-xl transition"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'var(--color-accent-foreground)',
                      border: '1px solid var(--color-accent)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ background: 'color-mix(in srgb, var(--color-bg-raised) 80%, transparent)' }} />
                    <span>Passer à Premium</span>
                  </button>
                )}
              </div>
            </div>
            </div>
          </aside>
        )}
      </>
    );
  }
