import { motion, useTransform, type MotionValue, type Variants } from 'framer-motion';
import cls from './BentoCard.module.css';
import { classNames } from '../../lib/classNames/classNames';
import { MOTION_EASE } from '../../lib/motion';

export interface ICard {
  num: string;
  title: string;
  variant: 'default' | 'feature' | 'wide';
  offset: number;
  tags?: string[];
}

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
  isMobile: boolean;
}

const BentoCard = ({ card, progress, isMobile }: IBentoCardProps) => {
  const y = useTransform(progress, [0, 1], [card.offset, -card.offset]);

  return (
    <motion.article
      className={classNames(cls.card, {
        [cls.cardFeature]: card.variant === 'feature',
        [cls.cardWide]: card.variant === 'wide',
      }, [])}
      variants={cardVariants}
      style={isMobile ? undefined : { y }}
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

export default BentoCard;
