import cls from './Word.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { type IWord } from '../../About/model/words';

interface IWordProps {
  className?: string;
  word: IWord;
  progress: MotionValue<number>;
  range: [number, number];
  isMobile: boolean;
}

export const Word = ({
  className,
  word,
  progress,
  range,
  isMobile,
}: IWordProps) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <motion.span
      className={classNames(cls.word, {
        [cls.wordStrong]: word.style === 'strong',
        [cls.wordHighlight]: word.style === 'highlight',
      }, [className ?? ''])}
      style={isMobile ? undefined : { opacity, y }}
    >
      {word.text}
    </motion.span>
  )
};
