import cls from './Hero.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import ArrowIcon from '../../../../../shared/ui/icons/ArrowIcon';
import heroPhoto from '../../../../../shared/assets/images/hero_phoyo.jpg';
import { HERO_LABEL, HERO_NAME, HERO_SURNAME, HERO_SUBTITLE } from '../model/content';
import LineHero from '../../../../../shared/ui/LineHero/LineHero';
import TelegramIcon from '../../../../../shared/ui/TelegramIcon/TelegramIcon';

interface IHeroProps {
  className?: string;
}

export const Hero = ({ className }: IHeroProps) => {
  return (
    <section
      id="hero"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <span className={classNames(cls.vlabel, {}, [])}>
          {HERO_LABEL}
        </span>

        <div className={classNames(cls.content, {}, [])}>
          <h1 className={classNames(cls.title, {}, [])}>
            {HERO_NAME}
            <br />
            <span className={classNames(cls.titleSurname, {}, [])}>
              {HERO_SURNAME}
              <LineHero className={classNames(cls.svgAnim, {}, [])} />
            </span>
          </h1>

          <p className={classNames(cls.subtitle, {}, [])}>
            {HERO_SUBTITLE}
          </p>

          <a
            className={classNames(cls.cta, {}, [])}
            href="#contact"
            tabIndex={0}
            aria-label="Записаться на консультацию"
          >
            <span className={classNames(cls.ctaCircle, {}, [])}>
              <ArrowIcon size={22} strokeWidth={1.7} className={classNames(cls.ctaIcon, {}, [])} />
            </span>
            <span className={classNames(cls.ctaText, {}, [])}>
              Записаться
              <br />
              на консультацию
            </span>
          </a>

          <div className={classNames(cls.blockSocial, {}, [])}>
            <h2 className={classNames(cls.socialsLabel, {}, [])}>
              Я в соцсетях
            </h2>
            <ul className={classNames(cls.socialList, {}, [])}>
              <li className={classNames(cls.socialItem, {}, [])}>
                <a 
                  className={classNames(cls.socialLink, {}, [])}
                  href='https://t.me/tennis1coachmoscow' 
                  target='_blank'   
                >
                  <TelegramIcon />
                </a>
              </li>
              <li className={classNames(cls.socialItem, {}, [])}>
                <a 
                  className={classNames(cls.socialLink, {}, [cls.socialVk])}
                  href='https://vk.com/id138932826'
                  target='_blank'
                >
                  VK
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={classNames(cls.photo, {}, [])}>
          <img
            className={classNames(cls.photoImg, {}, [])}
            src={heroPhoto}
            alt="Александра Еркеева"
          />
        </div>
      </div>
    </section>
  );
};
