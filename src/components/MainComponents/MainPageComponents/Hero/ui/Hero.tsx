import { motion } from 'framer-motion';
import cls from './Hero.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import heroPhoto from '../../../../../shared/assets/images/hero_phoyo.jpg';

interface IHeroProps {
  className?: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

export const Hero = ({ className }: IHeroProps) => {
  return (
    <section
      id="hero"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <span className={classNames(cls.vlabel, {}, [])}>
          СПОРТИВНАЯ ПСИХОЛОГИЯ · ТЕННИС
        </span>

        <div className={classNames(cls.content, {}, [])}>
          <motion.h1
            className={classNames(cls.title, {}, [])}
            {...fadeUp(0.18)}>
            Александра
            <br />
            <span className={classNames(cls.titleSurname, {}, [])}>
              Еркеева
              <svg
                className={classNames(cls.swash, {}, [])}
                viewBox="0 0 360 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className={classNames(cls.swashPath, {}, [])}
                  d="M5 12 C 70 4, 150 17, 240 8 C 300 2, 340 10, 356 6"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p className={classNames(cls.subtitle, {}, [])} {...fadeUp(0.32)}>
            Помогаю спортсменам и любителям справляться с волнением, возвращать
            уверенность и снова получать удовольствие от игры — на корте и за
            его пределами.
          </motion.p>

          <motion.a
            className={classNames(cls.cta, {}, [])}
            href="#contact"
            tabIndex={0}
            aria-label="Записаться на консультацию"
            {...fadeUp(0.44)}
          >
            <span className={classNames(cls.ctaCircle, {}, [])}>
              <svg
                className={classNames(cls.ctaIcon, {}, [])}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
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
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            className={classNames(cls.photoImg, {}, [])}
            src={heroPhoto}
            alt="Александра Еркеева"
          />
          <span className={classNames(cls.ball, {}, [])} />
        </motion.div>
      </div>
    </section>
  );
};
