import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import cls from './WhatIDoing.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE, createStaggerContainer } from '../../../../../shared/lib/motion';
import TitleFirstPage from '../../../../../shared/ui/TitleFirstPage/TitleFirstPage';

interface IWhatIDoingProps {
  className?: string;
}

interface ICard {
  num: string;
  title: string;
  variant: 'default' | 'feature' | 'wide';
  offset: number;
  tags?: string[];
}

const cards: ICard[] = [
  {
    num: '01',
    title: 'Работаю со спортсменами, их родителями и тренерами',
    variant: 'feature',
    offset: 14,
    tags: ['Спортсмены', 'Родители', 'Тренеры'],
  },
  { num: '02', title: 'Помогаю прийти к оптимальному боевому состоянию', variant: 'default', offset: 56 },
  { num: '03', title: 'Контроль и коррекция психологического состояния', variant: 'default', offset: 30 },
  { num: '04', title: 'Развитие и поддержание индивидуально-психологических особенностей', variant: 'default', offset: 64 },
  { num: '05', title: 'Профилактика и коррекция неблагоприятных изменений', variant: 'default', offset: 40 },
  { num: '06', title: 'Психологическая реабилитация после травм и заболеваний', variant: 'wide', offset: 22 },
];

const containerVariants: Variants = createStaggerContainer(0.12, 0.05);

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
};

interface IBentoCardProps {
  card: ICard;
  progress: MotionValue<number>;
}

const BentoCard = ({ card, progress }: IBentoCardProps) => {
  const y = useTransform(progress, [0, 1], [card.offset, -card.offset]);

  return (
    <motion.article
      className={classNames(cls.card, {
        [cls.cardFeature]: card.variant === 'feature',
        [cls.cardWide]: card.variant === 'wide',
      }, [])}
      variants={cardVariants}
      style={{ y }}
    >
      {card.variant === 'feature' && (
        <span className={classNames(cls.dots, {}, [])} aria-hidden="true" />
      )}

      {card.variant === 'feature' ? (
        <>
          <div className={classNames(cls.featTop, {}, [])}>
            <span className={classNames(cls.num, {}, [])}>{card.num}</span>
            <span className={classNames(cls.featKicker, {}, [])}>Командный подход</span>
          </div>
          <div className={classNames(cls.featBottom, {}, [])}>
            <h3 className={classNames(cls.cardTitle, {}, [])}>{card.title}</h3>
            {card.tags && (
              <div className={classNames(cls.featTags, {}, [])}>
                {card.tags.map((tag) => (
                  <span key={tag} className={classNames(cls.tag, {}, [])}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <span className={classNames(cls.num, {}, [])}>{card.num}</span>
          <h3 className={classNames(cls.cardTitle, {}, [])}>{card.title}</h3>
        </>
      )}
    </motion.article>
  );
};

export const WhatIDoing = ({ className }: IWhatIDoingProps) => {
  const sectionRef = useRef<HTMLElement>(null);

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
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {cards.map((card) => (
            <BentoCard key={card.num} card={card} progress={progress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
