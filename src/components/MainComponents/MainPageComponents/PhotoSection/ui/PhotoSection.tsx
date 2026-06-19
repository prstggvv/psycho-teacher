import { motion, type Variants } from 'framer-motion';
import cls from './PhotoSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import photoOne from '../../../../../shared/assets/images/photoSection/sesta_one.WEBP';
import photoTwo from '../../../../../shared/assets/images/photoSection/sestra_second.WEBP';
import photoThree from '../../../../../shared/assets/images/photoSection/sestra_three.WEBP';
import photoFour from '../../../../../shared/assets/images/photoSection/sestra_four.WEBP';
import TitleFirstPage from '../../../../../shared/ui/TitleFirstPage/TitleFirstPage';

interface IPhotoSectionProps {
  className?: string;
}

type RevealFrom = 'left' | 'right' | 'up';
type Align = 'start' | 'end' | 'center';

interface IPhoto {
  src: string;
  num: string;
  caption: string;
  from: RevealFrom;
  align: Align;
}

const photos: IPhoto[] = [
  { src: photoOne, num: '01', caption: 'Корт', from: 'left', align: 'start' },
  { src: photoTwo, num: '02', caption: 'Игра', from: 'right', align: 'end' },
  { src: photoThree, num: '03', caption: 'Фокус', from: 'up', align: 'center' },
  { src: photoFour, num: '04', caption: 'Момент', from: 'right', align: 'end' },
];

const REVEAL_OFFSET: Record<RevealFrom, { x?: number; y?: number }> = {
  left: { x: -120 },
  right: { x: 120 },
  up: { y: 90 },
};

const createRevealVariant = (from: RevealFrom): Variants => ({
  hidden: { opacity: 0, scale: 0.96, ...REVEAL_OFFSET[from] },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.85, ease: MOTION_EASE },
  },
});

export const PhotoSection = ({ className }: IPhotoSectionProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <TitleFirstPage
          title='Фотографии'
          subtitle='01 - 04'
        />

        <div className={classNames(cls.gallery, {}, [])}>
          {photos.map((photo) => (
            <motion.figure
              key={photo.num}
              className={classNames(cls.figure, {
                [cls.alignStart]: photo.align === 'start',
                [cls.alignEnd]: photo.align === 'end',
                [cls.alignCenter]: photo.align === 'center',
              }, [])}
              variants={createRevealVariant(photo.from)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <div className={classNames(cls.frame, {}, [])}>
                <img
                  className={classNames(cls.img, {}, [])}
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                />
              </div>
              <figcaption className={classNames(cls.caption, {}, [])}>
                <span className={classNames(cls.captionNum, {}, [])}>{photo.num}</span>
                <span className={classNames(cls.captionLine, {}, [])} aria-hidden="true" />
                <span className={classNames(cls.captionText, {}, [])}>{photo.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
