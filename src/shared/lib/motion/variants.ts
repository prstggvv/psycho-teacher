export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export const viewportOnce = { once: true, amount: 0.2 };
export const transitionFast = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] };
export const transitionMedium = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };
export const transitionSlow = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] };
