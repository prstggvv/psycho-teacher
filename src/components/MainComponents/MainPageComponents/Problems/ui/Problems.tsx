import { motion, type Variants } from 'framer-motion';
import cls from './Problems.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE, createStaggerContainer } from '../../../../../shared/lib/motion';
import TitleFirstPage from '../../../../../shared/ui/TitleFirstPage/TitleFirstPage';

interface IProblemsProps {
  className?: string;
}

type CardVariant = 'cream' | 'dark' | 'ghost';

interface IProblem {
  num: string;
  title: string;
  variant: CardVariant;
}


const problems: IProblem[] = [
  { num: '01', title: 'Адаптация к нагрузкам', variant: 'cream' },
  { num: '02', title: 'Готовность к спортивной деятельности — уровень энергии, самоотдача, снятие напряжения', variant: 'ghost' },
  { num: '03', title: 'Проблема спортивной одарённости', variant: 'dark' },
  { num: '04', title: 'Взаимоотношение спортсмена и тренера', variant: 'dark' },
  { num: '05', title: 'Восстановление после травм и поражений', variant: 'ghost' },
  { num: '06', title: 'Потеря мотивации', variant: 'cream' },
];

const gridVariants: Variants = createStaggerContainer(0.12, 0.1);

// Each card unmasks with a top-down clip wipe, then releases its parts in order.
const cardVariants: Variants = {
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

// A hairline rule draws across the top of the card.
const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: MOTION_EASE } },
};

// The number slides up from behind its mask — a clean editorial type reveal.
const numVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.6, ease: MOTION_EASE } },
};

const titleLineVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: MOTION_EASE } },
};

const arrowVariants: Variants = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.5, ease: MOTION_EASE } },
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const variantClass: Record<CardVariant, string> = {
  cream: cls.cardCream,
  dark: cls.cardDark,
  ghost: cls.cardGhost,
};

export const Problems = ({ className }: IProblemsProps) => {
  return (
    <section id="problems" className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <header className={classNames(cls.head, {}, [])}>
        </header>
        <TitleFirstPage
          title='Какие проблемы решает спортивная психология?'
          subtitle='01 - 06'
        />

        <motion.div
          className={classNames(cls.grid, {}, [])}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {problems.map((problem) => (
            <motion.article
              key={problem.num}
              className={classNames(cls.card, {}, [variantClass[problem.variant]])}
              variants={cardVariants}
            >
              {/* flat colour panel that wipes up on hover */}
              <span className={classNames(cls.fill, {}, [])} aria-hidden="true" />

              {problem.variant === 'ghost' && (
                <span className={classNames(cls.watermark, {}, [])} aria-hidden="true">
                  {problem.num}
                </span>
              )}

              <motion.span className={classNames(cls.rule, {}, [])} variants={ruleVariants} aria-hidden="true" />

              <div className={classNames(cls.cardTop, {}, [])}>
                <span className={classNames(cls.numMask, {}, [])}>
                  <motion.span className={classNames(cls.num, {}, [])} variants={numVariants}>
                    {problem.num}
                  </motion.span>
                </span>

                <motion.span className={classNames(cls.arrowWrap, {}, [])} variants={arrowVariants}>
                  <span className={classNames(cls.arrow, {}, [])}>
                    <ArrowIcon />
                  </span>
                </motion.span>
              </div>

              <motion.h3 className={classNames(cls.cardTitle, {}, [])} variants={titleLineVariants}>
                {problem.title}
              </motion.h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
