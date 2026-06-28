import { useRef } from 'react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import cls from './WhatIDoing.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { VIEWPORT_ONCE, createStaggerContainer } from '../../../../../shared/lib/motion';
import { useIsMobile } from '../../../../../shared/lib/hooks/useIsMobile';
import TitleFirstPage from '../../../../../shared/ui/TitleFirstPage/TitleFirstPage';
import BentoCard from '../../../../../shared/ui/BentoCard/BentoCard';
import { cards } from '../model/cardsElemet';

interface IWhatIDoingProps {
  className?: string;
}

const containerVariants: Variants = createStaggerContainer(0.12, 0.05);

export const WhatIDoing = ({ className }: IWhatIDoingProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="help"
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.inner, {}, [])}>
        <TitleFirstPage
          title='Чем я занимаюсь'
          subtitle='01 - 06'
        />

        <motion.div
          className={classNames(cls.bento, {}, [])}
          variants={containerVariants}
          {...(isMobile
            ? { initial: false as const, animate: 'visible' }
            : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT_ONCE })}
        >
          {cards.map((card) => (
            <BentoCard key={card.num} card={card} progress={progress} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
