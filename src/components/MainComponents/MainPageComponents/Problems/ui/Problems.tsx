import { motion } from 'framer-motion';
import cls from './Problems.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import { useIsMobile } from '../../../../../shared/lib/hooks/useIsMobile';
import TitleFirstPage from '../../../../../shared/ui/TitleFirstPage/TitleFirstPage';
import ArrowIcon from '../../../../../shared/ui/icons/ArrowIcon';
import { problems, type CardVariant } from '../model/problems';
import {
  gridVariants,
  cardVariants,
  ruleVariants,
  numVariants,
  titleLineVariants,
  arrowVariants,
} from '../model/motion';

interface IProblemsProps {
  className?: string;
}

const variantClass: Record<CardVariant, string> = {
  cream: cls.cardCream,
  dark: cls.cardDark,
  ghost: cls.cardGhost,
};

export const Problems = ({ className }: IProblemsProps) => {
  const isMobile = useIsMobile();

  const motionProps = isMobile
    ? { initial: false as const, animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT_ONCE };

  return (
    <section id="problems" className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <TitleFirstPage
          title='Какие проблемы решает спортивная психология?'
          subtitle='01 - 06'
        />

        <motion.div
          className={classNames(cls.grid, {}, [])}
          variants={gridVariants}
          {...motionProps}
        >
          {problems.map((problem) => (
            <motion.article
              key={problem.num}
              className={classNames(cls.card, {}, [variantClass[problem.variant]])}
              variants={cardVariants}
            >

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
