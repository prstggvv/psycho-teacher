import { motion, type Variants } from 'framer-motion';
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
  tags?: string[];
}

const cards: ICard[] = [
  {
    num: '01',
    title: 'Работаю со спортсменами, их родителями и тренерами',
    variant: 'feature',
    tags: ['Спортсмены', 'Родители', 'Тренеры'],
  },
  { num: '02', title: 'Помогаю прийти к оптимальному боевому состоянию', variant: 'default' },
  { num: '03', title: 'Контроль и коррекция психологического состояния', variant: 'default' },
  { num: '04', title: 'Развитие и поддержание индивидуально-психологических особенностей', variant: 'default' },
  { num: '05', title: 'Профилактика и коррекция неблагоприятных изменений', variant: 'default' },
  { num: '06', title: 'Психологическая реабилитация после травм и заболеваний', variant: 'wide' },
];

const containerVariants: Variants = createStaggerContainer(0.1, 0.1);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: MOTION_EASE },
  },
};

export const WhatIDoing = ({ className }: IWhatIDoingProps) => {
  return (
    <section
      id="help"
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
            <motion.article
              key={card.num}
              className={classNames(cls.card, {
                [cls.cardFeature]: card.variant === 'feature',
                [cls.cardWide]: card.variant === 'wide',
              }, [])}
              variants={cardVariants}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};
