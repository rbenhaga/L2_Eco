/**
 * Agora Premium - Animated Components (Framer Motion)
 * Reusable animated wrappers with Apple-grade interactions
 */

import { motion, type HTMLMotionProps } from "framer-motion";
import { SPRING, hoverLift, tapScale, fadeInUp, scaleIn } from "./animations";

/* ============================================
   ANIMATED BUTTON
   ============================================ */

export function AnimatedButton({
    children,
    className,
    onClick,
    disabled,
    ...props
}: HTMLMotionProps<"button">) {
    return (
        <motion.button
            className={className}
            onClick={onClick}
            disabled={disabled}
            whileHover={disabled ? undefined : hoverLift}
            whileTap={disabled ? undefined : tapScale}
            transition={SPRING.snappy}
            {...props}
        >
            {children}
        </motion.button>
    );
}

/* ============================================
   ANIMATED CARD
   ============================================ */

export function AnimatedCard({
    children,
    className,
    onClick,
    hover = true,
    ...props
}: HTMLMotionProps<"div"> & { hover?: boolean }) {
    return (
        <motion.div
            className={className}
            onClick={onClick}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={
                hover
                    ? {
                          y: -4,
                          transition: SPRING.smooth,
                      }
                    : undefined
            }
            whileTap={tapScale}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ============================================
   ANIMATED SURFACE
   ============================================ */

export function AnimatedSurface({
    children,
    className,
    hover = false,
    ...props
}: HTMLMotionProps<"div"> & { hover?: boolean }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={
                hover
                    ? {
                          y: -2,
                          boxShadow: "var(--shadow-md)",
                          transition: SPRING.smooth,
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ============================================
   ANIMATED MODAL/POPOVER
   ============================================ */

export function AnimatedModal({
    children,
    className,
    ...props
}: HTMLMotionProps<"div">) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
            transition={SPRING.smooth}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ============================================
   ANIMATED LIST CONTAINER
   ============================================ */

export function AnimatedList({
    children,
    className,
    stagger = true,
    ...props
}: HTMLMotionProps<"div"> & { stagger?: boolean }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={
                stagger
                    ? {
                          hidden: { opacity: 0 },
                          visible: {
                              opacity: 1,
                              transition: {
                                  staggerChildren: 0.08,
                                  delayChildren: 0.1,
                              },
                          },
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ============================================
   ANIMATED LIST ITEM
   ============================================ */

export function AnimatedListItem({
    children,
    className,
    ...props
}: HTMLMotionProps<"div">) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: SPRING.smooth,
                },
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ============================================
   ANIMATED ICON
   ============================================ */

export function AnimatedIcon({
    children,
    className,
    hover = true,
    ...props
}: HTMLMotionProps<"span"> & { hover?: boolean }) {
    return (
        <motion.span
            className={className}
            whileHover={
                hover
                    ? {
                          scale: 1.1,
                          rotate: 5,
                          transition: SPRING.bouncy,
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.span>
    );
}

/* ============================================
   ANIMATED BADGE (with pulse)
   ============================================ */

export function AnimatedBadge({
    children,
    className,
    pulse = false,
    ...props
}: HTMLMotionProps<"span"> & { pulse?: boolean }) {
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: SPRING.bouncy,
            }}
            whileHover={
                pulse
                    ? {
                          scale: 1.05,
                          transition: SPRING.snappy,
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.span>
    );
}

/* ============================================
   ANIMATED PAGE WRAPPER
   ============================================ */

export function AnimatedPage({
    children,
    className,
    ...props
}: HTMLMotionProps<"div">) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={SPRING.gentle}
            {...props}
        >
            {children}
        </motion.div>
    );
}
