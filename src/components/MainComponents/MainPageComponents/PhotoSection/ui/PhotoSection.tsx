import { useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import cls from './PhotoSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { photos } from '../model/photos';
import { PhotoLayer } from '../../../../PhotoLayer';

interface IPhotoSectionProps {
  className?: string;
}

export const PhotoSection = ({ className }: IPhotoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.sticky, {}, [])}>
        <div className={classNames(cls.stage, {}, [])}>
          {photos.map((photo) => (
            <PhotoLayer key={photo.caption} photo={photo} progress={progress} />
          ))}
          <div className={classNames(cls.text, {}, [])}>
          </div>
        </div>
      </div>
    </section>
  );
};
