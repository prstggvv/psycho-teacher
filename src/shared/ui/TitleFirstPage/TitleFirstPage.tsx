import { motion, type Variants } from 'framer-motion';
import cls from './TitleFirstPage.module.css';
import { classNames } from '../../lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE } from '../../lib/motion';

interface ITitleFirstPageProps {
  className?: string;
  title: string;
  subtitle: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.95, ease: MOTION_EASE },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.85, ease: MOTION_EASE },
  },
};

const TitleFirstPage = ({
  className,
  title,
  subtitle,
}: ITitleFirstPageProps) => {
  return (
    <motion.div
      className={classNames(cls.head, {}, [className ?? ''])}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <motion.h2
        className={classNames(cls.kicker, {}, [])}
        variants={textVariants}
      >
        {title}
      </motion.h2>
      <motion.span
        className={classNames(cls.range, {}, [])}
        variants={textVariants}
      >
        ({subtitle})
      </motion.span>
      <motion.span
        className={classNames(cls.line, {}, [])}
        variants={lineVariants}
        aria-hidden="true"
      />
    </motion.div>
  )
};

export default TitleFirstPage;
