import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import cls from './PhotoSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { photos, type IPhoto } from '../model/photos';

interface IPhotoSectionProps {
  className?: string;
}

interface IPhotoLayerProps {
  photo: IPhoto;
  progress: MotionValue<number>;
}

const PhotoLayer = ({ photo, progress }: IPhotoLayerProps) => {
  const y = useTransform(progress, [0, 1], [`${photo.from}vh`, `${photo.to}vh`]);

  return (
    <motion.figure
      className={classNames(cls.photo, {}, [])}
      style={{
        y,
        x: photo.x,
        width: photo.width,
        rotate: photo.rotate,
      }}
    >
      <div className={classNames(cls.frame, {}, [])}>
        <img
          className={classNames(cls.img, {}, [])}
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
        />
      </div>
    </motion.figure>
  );
};

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
