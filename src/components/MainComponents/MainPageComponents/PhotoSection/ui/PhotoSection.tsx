import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import cls from './PhotoSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { photos, type IPhoto } from '../model/photos';
import { PhotoLayer } from '../../../../PhotoLayer';

interface IPhotoSectionProps {
  className?: string;
}

interface IPhotoLayerProps {
  photo: IPhoto;
  progress: MotionValue<number>;
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
            <h2 className={classNames(cls.title, {}, [])}>Это&nbsp;я</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
