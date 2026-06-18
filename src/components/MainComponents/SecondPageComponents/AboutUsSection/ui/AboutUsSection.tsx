import { motion } from 'framer-motion';
import cls from './AboutUsSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { fadeUp, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';

interface IAboutUsSection {
  className?: string;
}

interface ICoach {
  index: string;
  surname: string;
  name: string;
  desc: string;
  photo: string;
  alt: string;
  link: string;
  reverse?: boolean;
}

const COACHES: ICoach[] = [
  {
    index: '01',
    surname: 'Еркеева',
    name: 'Александра',
    desc: 'Детский тренер по теннису. Внимание, терпение и игра — в каждой тренировке.',
    photo: sashaPhoto,
    alt: 'Еркеева Александра',
    link: 'https://vk.com/ibolvan123',
  },
  {
    index: '02',
    surname: 'Еркеев',
    name: 'Эрнест',
    desc: 'Тренер по теннису с опытом работы в федерациях и академиях — от Артека до Казани.',
    photo: ernestPhoto,
    alt: 'Еркеев Эрнест',
    link: 'https://vk.com/ibolvan123',
    reverse: true,
  },
];

export const AboutUsSection = ({ className }: IAboutUsSection) => {
  return (
    <section
      id="about"
      className={classNames(cls.about, {}, [className ?? ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className={classNames(cls.head, {}, [])}>
            <span className={classNames(cls.headRule, {}, [])} />
            <span className={classNames(cls.headLabel, {}, [])}>О нас</span>
          </div>

          <h2 className={classNames(cls.title, {}, [])}>
            Два тренера —
            <br />
            одна команда
          </h2>

          <p className={classNames(cls.intro, {}, [])}>
            Мы работаем с детьми каждый день: от первого знакомства с ракеткой до
            уверенной игры на корте.
          </p>
        </motion.div>

        <ul className={classNames(cls.list, {}, [])}>
          {COACHES.map((coach) => (
            <motion.article
              key={coach.index}
              className={classNames(cls.spotlight, { [cls.reverse]: !!coach.reverse }, [])}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <div className={classNames(cls.text, {}, [])}>
                <div className={classNames(cls.spLabel, {}, [])}>
                  <span className={classNames(cls.spRule, {}, [])} />
                  <span className={classNames(cls.spLabelText, {}, [])}>Тренер</span>
                </div>

                <h3 className={classNames(cls.name, {}, [])}>
                  <span className={classNames(cls.nameLine, {}, [cls.nameLine1])}>
                    {coach.surname}
                  </span>
                  <span className={classNames(cls.nameLine, {}, [cls.nameLine2])}>
                    {coach.name}
                  </span>
                </h3>

                <p className={classNames(cls.desc, {}, [])}>{coach.desc}</p>

                <a
                  className={classNames(cls.spCta, {}, [])}
                  href={coach.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  aria-label={`Связаться — ${coach.surname} ${coach.name}`}
                >
                  <span className={classNames(cls.spCtaCircle, {}, [])}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                  <span className={classNames(cls.spCtaWord, {}, [])}>Связаться</span>
                </a>
              </div>

              <div className={classNames(cls.media, {}, [])}>
                <span className={classNames(cls.frame, {}, [])} aria-hidden="true" />
                <div className={classNames(cls.img, {}, [])}>
                  <img src={coach.photo} alt={coach.alt} />
                  <span className={classNames(cls.shade, {}, [])} aria-hidden="true" />
                  <span className={classNames(cls.corner, {}, [cls.cornerTlV])} aria-hidden="true" />
                  <span className={classNames(cls.corner, {}, [cls.cornerTlH])} aria-hidden="true" />
                  <span className={classNames(cls.corner, {}, [cls.cornerBrV])} aria-hidden="true" />
                  <span className={classNames(cls.corner, {}, [cls.cornerBrH])} aria-hidden="true" />
                </div>
                <span className={classNames(cls.index, {}, [])} aria-hidden="true">
                  {coach.index}
                </span>
              </div>
            </motion.article>
          ))}
        </ul>
      </div>
    </section>
  );
};
