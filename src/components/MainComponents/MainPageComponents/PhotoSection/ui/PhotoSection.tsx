import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import cls from './PhotoSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import photoOne from '../../../../../shared/assets/images/photoSection/sesta_one.WEBP';
import photoTwo from '../../../../../shared/assets/images/photoSection/sestra_second.WEBP';
import photoThree from '../../../../../shared/assets/images/photoSection/sestra_three.WEBP';
import photoFour from '../../../../../shared/assets/images/photoSection/sestra_four.jpg';

interface IPhotoSectionProps {
  className?: string;
}

interface IPhoto {
  src: string;
  caption: string;
  x: string;
  width: string;
  from: number;
  to: number;
  rotate: number;
}

const photos: IPhoto[] = [
  { src: photoOne, caption: 'Корт', x: '-27vw', width: 'clamp(180px, 22vw, 340px)', from: 135, to: -150, rotate: -4 },
  { src: photoTwo, caption: 'Игра', x: '26vw', width: 'clamp(200px, 26vw, 400px)', from: 180, to: -120, rotate: 5 },
  { src: photoThree, caption: 'Фокус', x: '-9vw', width: 'clamp(220px, 30vw, 460px)', from: 225, to: -115, rotate: -2 },
  { src: photoFour, caption: 'Момент', x: '31vw', width: 'clamp(160px, 19vw, 300px)', from: 270, to: -95, rotate: 6 },
];

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
