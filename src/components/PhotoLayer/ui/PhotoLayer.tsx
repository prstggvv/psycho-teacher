import cls from './PhotoLayer.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { IPhoto } from '../../MainComponents/MainPageComponents/PhotoSection/model/photos';

interface IPhotoLayerProps {
  className?: string;
  photo: IPhoto;
  progress: MotionValue<number>;
}

export const PhotoLayer = ({ className, photo, progress }: IPhotoLayerProps) => {
  const y = useTransform(progress, [0, 1], [`${photo.from}vh`, `${photo.to}vh`]);

  return (
    <motion.figure
      className={classNames(cls.photo, {}, [className ?? ''])}
      style={{
        y,
        x: photo.x,
        width: photo.width,
      }}
    >
      <div
        className={classNames(cls.frame, {}, [])}
        style={{ rotate: `${photo.rotate}deg` }}
      >
        <img
          className={classNames(cls.img, {}, [])}
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
        />
      </div>
    </motion.figure>
  )
};
