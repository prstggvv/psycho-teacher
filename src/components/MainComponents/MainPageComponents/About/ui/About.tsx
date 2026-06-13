import { Fragment } from 'react';
import { motion, type Variants } from 'framer-motion';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface IAboutProps {
  className?: string;
}

type WordStyle = 'normal' | 'strong' | 'highlight';

interface IWord {
  text: string;
  style: WordStyle;
}

const words: IWord[] = [
  { text: 'Меня', style: 'normal' },
  { text: 'зовут', style: 'normal' },
  { text: 'Александра', style: 'strong' },
  { text: 'Еркеева', style: 'strong' },
  { text: '(Чернышева)', style: 'strong' },
  { text: '—', style: 'normal' },
  { text: 'спортивный', style: 'normal' },
  { text: 'тренер', style: 'normal' },
  { text: 'с', style: 'normal' },
  { text: 'опытом', style: 'normal' },
  { text: 'работы', style: 'normal' },
  { text: 'более', style: 'normal' },
  { text: '10 лет', style: 'highlight' },
  { text: 'и', style: 'normal' },
  { text: 'спортивный', style: 'normal' },
  { text: 'психолог.', style: 'normal' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: MOTION_EASE,
    },
  },
};

export const About = ({ className }: IAboutProps) => {
  return (
    <section
      id="about"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.inner, {}, [])}>
        <motion.p
          className={classNames(cls.text, {}, [])}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                className={classNames(cls.word, {
                  [cls.wordStrong]: word.style === 'strong',
                  [cls.wordHighlight]: word.style === 'highlight',
                }, [])}
                variants={wordVariants}
              >
                {word.text}
              </motion.span>
              {i < words.length - 1 && ' '}
            </Fragment>
          ))}
        </motion.p>
      </div>
    </section>
  );
};
