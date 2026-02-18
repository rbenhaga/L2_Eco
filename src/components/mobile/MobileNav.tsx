/**
 * MobileNav - Navigation mobile avec bottom drawer
 * Design: Touch-friendly, swipeable
 * Pattern: Bottom navigation bar + drawer
 */

import { useState } from 'react';
import { Home, BookOpen, Search, User } from 'lucide-react';
import { MobileBottomDrawer } from './MobileBottomDrawer';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
  onSearchClick?: () => void;
}

export function MobileNav({ onSearchClick }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home, path: '/' },
    { id: 'courses', label: 'Cours', icon: BookOpen, onClick: () => setIsMenuOpen(true) },
    { id: 'search', label: 'Recherche', icon: Search, onClick: onSearchClick },
    { id: 'profile', label: 'Profil', icon: User, path: '/subscription' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Bottom Navigation Bar - Mobile only */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{
          background: 'color-mix(in srgb, var(--color-bg-raised) 95%, transparent)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid var(--color-border-default)`,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === location.pathname;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center justify-center gap-1 min-w-[64px] h-14 rounded-xl transition"
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                }}
                onTouchStart={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--color-panel)';
                  }
                }}
                onTouchEnd={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Menu Drawer */}
      <MobileBottomDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Mes cours"
      >
        <div className="p-4 space-y-3">
          {/* Modules */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
              SEMESTRE 3
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Macroéconomie', path: '/s3/macro' },
                { name: 'Microéconomie', path: '/s3/micro' },
                { name: 'Statistiques', path: '/s3/stats' },
                { name: 'Sociologie', path: '/s3/socio' },
              ].map((module) => (
                <button
                  key={module.path}
                  onClick={() => {
                    navigate(module.path);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between h-14 px-4 rounded-xl transition text-left"
                  style={{
                    background: 'var(--color-panel)',
                    border: `1px solid var(--color-border-default)`,
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.background = 'var(--color-panel)';
                    e.currentTarget.style.borderColor = 'var(--color-border-default)';
                  }}
                >
                  <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {module.name}
                  </span>
                  <svg
                    className="h-5 w-5"
                    style={{ color: 'var(--color-text-muted)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Semestre 4 */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
              SEMESTRE 4
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Macroéconomie', path: '/s4/macro' },
                { name: 'Microéconomie', path: '/s4/micro' },
                { name: 'Statistiques', path: '/s4/stats' },
                { name: 'Management', path: '/s4/management' },
              ].map((module) => (
                <button
                  key={module.path}
                  onClick={() => {
                    navigate(module.path);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between h-14 px-4 rounded-xl transition text-left"
                  style={{
                    background: 'var(--color-panel)',
                    border: `1px solid var(--color-border-default)`,
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.background = 'var(--color-panel)';
                    e.currentTarget.style.borderColor = 'var(--color-border-default)';
                  }}
                >
                  <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {module.name}
                  </span>
                  <svg
                    className="h-5 w-5"
                    style={{ color: 'var(--color-text-muted)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MobileBottomDrawer>
    </>
  );
}
