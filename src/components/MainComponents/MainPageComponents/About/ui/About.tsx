import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { useIsMobile } from '../../../../../shared/lib/hooks/useIsMobile';
import { words, type IWord } from '../model/words';
import { Word } from '../../Word';

interface IAboutProps {
  className?: string;
}

const REVEAL_END = 0.9;

export const About = ({ className }: IAboutProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.sticky, {}, [])}>
        <div className={classNames(cls.inner, {}, [])}>
          <p className={classNames(cls.text, {}, [])}>
            {words.map((word, i) => {
              const start = (i / words.length) * REVEAL_END;
              const end = ((i + 1) / words.length) * REVEAL_END;

              return (
                <Fragment key={i}>
                  <Word
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isMobile={isMobile}
                  />
                  {i < words.length - 1 && ' '}
                </Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
