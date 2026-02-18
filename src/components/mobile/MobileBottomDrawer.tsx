/**
 * MobileBottomDrawer - Navigation mobile avec swipe gestures
 * Design: Bottom sheet swipeable (mobile only)
 * Touch-friendly: Zones >= 44px
 */

import { useState, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileBottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const DRAWER_HEIGHT = '85vh';
const DRAG_THRESHOLD = 100;

export function MobileBottomDrawer({ isOpen, onClose, children, title }: MobileBottomDrawerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    
    // Si on drag vers le bas de plus de DRAG_THRESHOLD, on ferme
    if (info.offset.y > DRAG_THRESHOLD) {
      onClose();
    }
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] lg:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
          style={{
            background: 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)',
            backdropFilter: 'blur(4px)',
            opacity,
          }}
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ 
            y,
            height: DRAWER_HEIGHT,
            background: 'var(--color-bg-raised)',
            boxShadow: 'var(--shadow-xl)',
            touchAction: 'none',
          }}
          className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden"
        >
          {/* Drag Handle */}
          <div
            className="flex items-center justify-center py-3"
            style={{
              borderBottom: `1px solid var(--color-border-default)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <div
              className="w-12 h-1 rounded-full"
              style={{ background: 'var(--color-border-strong)' }}
            />
          </div>

          {/* Header */}
          {title && (
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: `1px solid var(--color-border-default)` }}
            >
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition"
                style={{ color: 'var(--color-text-muted)' }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = 'var(--color-panel)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
