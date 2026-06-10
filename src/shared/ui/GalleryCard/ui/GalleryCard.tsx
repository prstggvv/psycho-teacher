import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './GalleryCard.module.css';
import { classNames } from '../../../lib/classNames/classNames';

export interface IGalleryCardProps {
  title: string;
  description: string;
  to: string;
  image: string;
  ctaLabel?: string;
  className?: string;
}

export const GalleryCard = ({
  title,
  description,
  to,
  image,
  ctaLabel = 'Подробнее',
  className,
}: IGalleryCardProps) => {
  return (
    <article className={classNames(cls.card, {}, [className ?? ''])}>
      <Link to={to} className={classNames(cls.cardLink, {}, [])}>
        <figure className={classNames(cls.figure, {}, [])}>
          <img className={classNames(cls.image, {}, [])} src={image} alt={title} loading="lazy" />
        </figure>

        <div className={classNames(cls.content, {}, [])}>
          <header className={classNames(cls.header, {}, [])}>
            <h3 className={classNames(cls.title, {}, [])}>{title}</h3>
          </header>

          <p className={classNames(cls.description, {}, [])}>{description}</p>

          <footer className={classNames(cls.footer, {}, [])}>
            <span className={classNames(cls.button, {}, [])}>
              <span>{ctaLabel}</span>
              <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={1.5} aria-hidden />
            </span>
          </footer>
        </div>
      </Link>
    </article>
  );
};
