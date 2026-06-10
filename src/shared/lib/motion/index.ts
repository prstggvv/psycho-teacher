import type { Variants } from 'framer-motion';

export const MOTION_EASE = [0.23, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.25,
} as const;

export const VIEWPORT_DEEP = {
  once: true,
  amount: 0.35,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: MOTION_EASE,
    },
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const scaleFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: MOTION_EASE,
    },
  },
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const createStaggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
