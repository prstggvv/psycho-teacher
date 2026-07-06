import { motion } from 'framer-motion';
import cls from './Hero.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { useIsMobile } from '../../../../../shared/lib/hooks/useIsMobile';
import ArrowIcon from '../../../../../shared/ui/icons/ArrowIcon';
import heroPhoto from '../../../../../shared/assets/images/hero_phoyo.jpg';
import { HERO_LABEL, HERO_NAME, HERO_SURNAME, HERO_SUBTITLE } from '../model/content';
import LineHero from '../../../../../shared/ui/LineHero/LineHero';

interface IHeroProps {
  className?: string;
}

export const Hero = ({ className }: IHeroProps) => {
  const isMobile = useIsMobile();

  const fadeUp = (delay: number) =>
    isMobile
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: 'easeOut' as const, delay },
        };

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
          <motion.h1
            className={classNames(cls.title, {}, [])}
            {...fadeUp(0.18)}>
            {HERO_NAME}
            <br />
            <span className={classNames(cls.titleSurname, {}, [])}>
              {HERO_SURNAME}
              <LineHero className={classNames(cls.svgAnim, {}, [])} />
            </span>
          </motion.h1>

          <motion.p className={classNames(cls.subtitle, {}, [])} {...fadeUp(0.32)}>
            {HERO_SUBTITLE}
          </motion.p>

          <motion.a
            className={classNames(cls.cta, {}, [])}
            href="#contact"
            tabIndex={0}
            aria-label="Записаться на консультацию"
            {...fadeUp(0.44)}
          >
            <span className={classNames(cls.ctaCircle, {}, [])}>
              <ArrowIcon size={22} strokeWidth={1.7} className={classNames(cls.ctaIcon, {}, [])} />
            </span>
            <span className={classNames(cls.ctaText, {}, [])}>
              Записаться
              <br />
              на консультацию
            </span>
          </motion.a>

          <motion.div
            className={classNames(cls.socials, {}, [])} {...fadeUp(0.56)}>
            <span className={classNames(cls.socialsLabel, {}, [])}>Я в соцсетях</span>
            <a
              className={classNames(cls.socialLink, {}, [])}
              href="#"
              aria-label="Telegram"
              tabIndex={0}
            >
              <svg
                className={classNames(cls.socialLinkIcon, {}, [])}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 3 11 14" />
                <path d="M22 3 15 21l-4-7-7-4 18-7z" />
              </svg>
            </a>
            <a
              className={classNames(cls.socialLink, {}, [])}
              href="#"
              aria-label="ВКонтакте"
              tabIndex={0}
            >
              <span className={classNames(cls.socialVk, {}, [])}>VK</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className={classNames(cls.photo, {}, [])}
          {...(isMobile
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1.0, ease: 'easeOut' as const, delay: 0.2 },
              })}
        >
          <img
            className={classNames(cls.photoImg, {}, [])}
            src={heroPhoto}
            alt="Александра Еркеева"
          />
        </motion.div>
      </div>
    </section>
  );
};
