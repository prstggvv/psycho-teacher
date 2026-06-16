import { motion, type Variants } from 'framer-motion';
import cls from './Problems.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE, createStaggerContainer } from '../../../../../shared/lib/motion';

interface IProblemsProps {
  className?: string;
}

interface IProblem {
  num: string;
  title: string;
}

const problems: IProblem[] = [
  { num: '01', title: 'Адаптация к нагрузкам' },
  { num: '02', title: 'Готовность к спортивной деятельности — уровень энергии, самоотдача, снятие напряжения' },
  { num: '03', title: 'Проблема спортивной одарённости' },
  { num: '04', title: 'Взаимоотношение спортсмена и тренера' },
  { num: '05', title: 'Восстановление после травм и поражений' },
  { num: '06', title: 'Потеря мотивации' },
];

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: MOTION_EASE } },
};

const gridVariants: Variants = createStaggerContainer(0.12, 0.1);

// Each card slides in from the side it sits on, then releases its inner parts.
const cardVariants: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: 64 * dir }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: MOTION_EASE,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

// The number pops into place.
const numVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: MOTION_EASE } },
};

// The title unfolds from the left, following the number.
const titleLineVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: MOTION_EASE } },
};

// The arrow rotates and scales in last.
const arrowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -90 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: MOTION_EASE } },
};

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const Problems = ({ className }: IProblemsProps) => {
  return (
    <section id="problems" className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <header className={classNames(cls.head, {}, [])}>
          <motion.h2
            className={classNames(cls.title, {}, [])}
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            Какие проблемы решит спортивная психология?
          </motion.h2>
        </header>

        <motion.div
          className={classNames(cls.grid, {}, [])}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {problems.map((problem, index) => {
            const isDark = index % 2 === 1;
            return (
              <motion.article
                key={problem.num}
                className={classNames(cls.card, {
                  [cls.cardDark]: isDark,
                  [cls.cardLight]: !isDark,
                }, [])}
                variants={cardVariants}
                custom={isDark ? 1 : -1}
              >
                {isDark && <span className={classNames(cls.dots, {}, [])} aria-hidden="true" />}

                <motion.span className={classNames(cls.num, {}, [])} variants={numVariants}>
                  {problem.num}
                </motion.span>

                <motion.h3 className={classNames(cls.cardTitle, {}, [])} variants={titleLineVariants}>
                  {problem.title}
                </motion.h3>

                <motion.span className={classNames(cls.arrowWrap, {}, [])} variants={arrowVariants}>
                  <span className={classNames(cls.arrow, {}, [])}>
                    <ArrowIcon />
                  </span>
                </motion.span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
