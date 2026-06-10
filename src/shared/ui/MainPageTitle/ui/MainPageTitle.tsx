import cls from './MainPageTitle.module.css';
import { classNames } from '../../../lib/classNames/classNames';
// import AboutImage from '../../../assets/images/CompasPhotos/about.png';
// import UslugiImage from '../../../assets/images/CompasPhotos/uslugi.png';
// import ProductsImage from '../../../assets/images/CompasPhotos/tovari.png';

interface MainPageTitleProps {
  className?: string;
  id?: string;
  title: string;
  sectionLabel?: string;
  sectionDescription?: string;
  as?: 'h1' | 'h2';
}

export const MainPageTitle = ({
  className,
  id,
  title,
  sectionLabel,
  sectionDescription,
  as = 'h2',
}: MainPageTitleProps) => {
  const TitleTag = as;
  // const normalizedTitle = title.trim().toLowerCase();

  /*
  const titleImage =
    normalizedTitle === 'о компании'
      ? AboutImage
      : normalizedTitle === 'наши услуги'
        ? UslugiImage
        : normalizedTitle === 'наша продукция'
          ? ProductsImage
          : AboutImage;
  */
  // const titleImageAlt = normalizedTitle === 'о компании' ? 'About' : normalizedTitle === 'наши услуги' ? 'Услуги' : normalizedTitle === 'наша продукция' ? 'Продукция' : 'About';

  return (
    <div className={classNames(cls.wrap, {}, [className ?? ''])}>
      <div className={classNames(cls.titleWrap, {}, [])}>
        {/* <img src={titleImage} alt={titleImageAlt} className={classNames(cls.titleImage, {}, [])} /> */}
        <TitleTag id={id} className={classNames(cls.title, {}, [])}>
          {title}
        </TitleTag>
      </div>
      {(sectionLabel || sectionDescription) ? (
        <div className={classNames(cls.meta, {}, [])}>
          {sectionLabel ? <span className={classNames(cls.sectionLabel, {}, [])}>{sectionLabel}</span> : null}
          {sectionDescription ? (
            <span className={classNames(cls.sectionDescription, {}, [])}>{sectionDescription}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
