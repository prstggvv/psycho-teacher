import type { Variants } from 'framer-motion';
import { MOTION_EASE, createStaggerContainer } from '../../../../../shared/lib/motion';

export const gridVariants: Variants = createStaggerContainer(0.12, 0.1);

export const cardVariants: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.7,
      ease: MOTION_EASE,
      when: 'beforeChildren',
      staggerChildren: 0.09,
    },
  },
};

export const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: MOTION_EASE } },
};

export const numVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.6, ease: MOTION_EASE } },
};

export const titleLineVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: MOTION_EASE } },
};

export const arrowVariants: Variants = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.5, ease: MOTION_EASE } },
};
