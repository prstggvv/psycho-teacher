import { motion } from 'framer-motion';
import cls from './HeroSecondSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import heroPhoto from '../../../../../shared/assets/images/secondPage/hero.jpg';

interface IHeroSecondSectionProps {
  className?: string;
}

const VK_LINK = 'https://vk.com/ibolvan123';
const TG_LINK = '#';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
});

export const HeroSecondSection = ({ className }: IHeroSecondSectionProps) => {
  return (
    <section
      id="hero"
      className={classNames(cls.hero, {}, [className ?? ''])}
    >
      <div className={classNames(cls.bg, {}, [])}>
        <img
          className={classNames(cls.bgImg, {}, [])}
          src={heroPhoto}
          alt="Тренер и юная теннисистка дают пять после тренировки"
        />
      </div>

      <div className={classNames(cls.inner, {}, [])}>
        <motion.div className={classNames(cls.tag, {}, [])} {...fadeUp(0.15)}>
          <span className={classNames(cls.tagItem, {}, [])}>Теннисный клуб</span>
          <span className={classNames(cls.tagItem, {}, [cls.tagItemAccent])}>
            Дети от 3 лет
          </span>
        </motion.div>

        <div className={classNames(cls.foot, {}, [])}>
          <motion.h1 className={classNames(cls.title, {}, [])} {...fadeUp(0.28)}>
            Тренируем
            <br />
            <span className={classNames(cls.titleAccent, {}, [])}>детей</span>
          </motion.h1>

          <motion.div className={classNames(cls.cta, {}, [])} {...fadeUp(0.42)}>
            <a
              className={classNames(cls.btn, {}, [cls.btnSolid])}
              href={VK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label="Записаться во ВКонтакте"
            >
              <svg
                className={classNames(cls.btnIcon, {}, [])}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.79 18.5c-6.55 0-10.29-4.5-10.45-11.96h3.29c.11 5.48 2.52 7.8 4.43 8.28V6.54h3.1v4.73c1.89-.2 3.87-2.36 4.54-4.73h3.1c-.51 2.92-2.66 5.08-4.19 5.96 1.53.72 3.97 2.62 4.9 6h-3.41c-.73-2.11-2.54-3.75-4.94-3.99v3.99h-.37z" />
              </svg>
              Записаться во ВКонтакте
            </a>

            <a
              className={classNames(cls.btn, {}, [cls.btnGhost])}
              href={TG_LINK}
              tabIndex={0}
              aria-label="Написать в Telegram"
            >
              <svg
                className={classNames(cls.btnIcon, {}, [])}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.9 4.6 18.6 19.8c-.25 1.07-.9 1.34-1.82.83l-5.03-3.71-2.43 2.34c-.27.27-.49.49-1.01.49l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.84 13.2.9 11.66c-1.07-.34-1.09-1.07.22-1.59L20.5 2.7c.9-.33 1.68.2 1.4 1.9z" />
              </svg>
              Telegram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
