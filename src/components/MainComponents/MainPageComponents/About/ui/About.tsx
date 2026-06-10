import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import aboutImg from '../../../../../shared/assets/images/about/about.jpg';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';
import { MOTION_EASE, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

const marqueeItems = [
  'Дорожные знаки',
  'Дорожная разметка',
  'Барьерные ограждения',
  'Металлоконструкции',
  'Мафы',
  'Остановки',
  'Ограждения',
  'Материалы',
  'Крепеж и метизы',
  'СИЗ и спецодежда',
];


interface IAboutProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const keyFeatures = [
  {
    title: 'Устройство дорог, проездов, парковок',
    text: 'Строим и приводим в порядок дорожные покрытия под жилые, коммерческие и инфраструктурные объекты.',
  },
  {
    title: 'Монтаж барьерных и пешеходных ограждений',
    text: 'Устанавливаем системы безопасности и направляющие элементы под требования участка и трафика.',
  },
  {
    title: 'Установка дорожных знаков, ТОДД, светофоров',
    text: 'Подготавливаем и монтируем оборудование организации движения с учетом норм и схем.',
  },
  {
    title: 'Устройство тротуаров, велодорожек, съездов',
    text: 'Формируем безопасные пешеходные и транспортные связи вокруг объекта и внутри территории.',
  },
  {
    title: 'Благоустройство въездных групп и уличного освещения',
    text: 'Комплексно оформляем входные зоны и повышаем удобство эксплуатации пространства.',
  },
  {
    title: 'Производство и монтаж остановок, МАФ',
    text: 'Изготавливаем и устанавливаем остановочные павильоны и малые архитектурные формы.',
  },
  {
    title: 'Спортивные площадки',
    text: 'Обустраиваем функциональные площадки с покрытием, ограждениями и сопутствующей инфраструктурой.',
  },
  {
    title: 'Шумозащитные экраны',
    text: 'Подбираем и монтируем решения для снижения шумовой нагрузки на прилегающие территории.',
  },
] as const;

const aboutViewport = {
  ...VIEWPORT_ONCE,
  amount: 0.18,
} as const;

const aboutRevealSoft = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: MOTION_EASE,
    },
  },
} as const;

export const About = ({ className, onOpenContactPopup }: IAboutProps) => {
  return (
    <section
      id="about"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="about-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <MainPageTitle
            id="about-title"
            title="О компании"
            sectionLabel="Раздел 01"
            sectionDescription="Строительство, ОДД и благоустройство"
          />
        </div>
        <div className={classNames(cls.introLayout, {}, [])}>
          <div className={classNames(cls.copyColumn, {}, [])}>
            <div className={classNames(cls.copyStack, {}, [])}>
              <motion.p
                className={classNames(cls.primaryLead, {}, [])}
                initial="hidden"
                whileInView="visible"
                viewport={aboutViewport}
                variants={aboutRevealSoft}
              >
                «Компас» — это системный подход к созданию городской и транспортной инфраструктуры. Мы превращаем
                строительные площадки в готовую жизненную среду.
              </motion.p>
              <motion.p
                className={classNames(cls.secondaryLead, {}, [])}
                initial="hidden"
                whileInView="visible"
                viewport={aboutViewport}
                variants={aboutRevealSoft}
              >
                Как комплексный подрядчик, мы берем на себя полную ответственность за жизненный цикл проекта: от
                проектирования схем движения до финального благоустройства и установки малых архитектурных форм.
              </motion.p>
            </div>

            <button
              type="button"
              className={classNames(cls.ctaButton, {}, [])}
              onClick={onOpenContactPopup}
            >
              Записаться
              <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} />
            </button>
          </div>

          <div className={classNames(cls.visualPanel, {}, [])} aria-hidden>
            <img
              src={aboutImg}
              alt="картинка с космонавтами "
              className={classNames(cls.visualImage, {}, [])}
              loading="lazy"
            />
            <div className={classNames(cls.visualBadge, {}, [])}>
              <span className={classNames(cls.visualBadgeYear, {}, [])}>2022</span>
              <span className={classNames(cls.visualBadgeLabel, {}, [])}>год основания</span>
            </div>
          </div>
        </div>

        <div className={classNames(cls.marqueeWrap, {}, [])} aria-hidden>
          <div className={classNames(cls.marqueeTrack, {}, [])}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={classNames(cls.marqueeItem, {}, [])}>
                {item}
                <span className={classNames(cls.marqueeDot, {}, [])}>●</span>
              </span>
            ))}
          </div>
        </div>

        <div className={classNames(cls.featuresSection, {}, [])}>
          <div className={classNames(cls.featuresHeading, {}, [])}>
            <span className={classNames(cls.featuresIndex, {}, [])}>*</span>
            <h3 className={classNames(cls.featuresHeadingTitle, {}, [])}>Что мы предлагаем</h3>
          </div>

          <ul className={classNames(cls.featuresGrid, {}, [])}>
            <>
              {keyFeatures.map((feature, index) => {
                return (
                  <li
                    key={feature.title}
                    className={classNames(
                      cls.featureCard,
                      { [cls.featureCardAccent]: index % 2 === 0 && index < keyFeatures.length - 1 },
                      [],
                    )}
                  >
                    <div className={classNames(cls.featureHead, {}, [])}>
                      <h4 className={classNames(cls.featureTitle, {}, [])}>{feature.title}</h4>
                      <span className={classNames(cls.featureNumber, {}, [])}>
                        ({String(index + 1).padStart(2, '0')})
                      </span>
                    </div>
                    <p className={classNames(cls.featureText, {}, [])}>{feature.text}</p>
                    <span className={classNames(cls.featureLine, {}, [])} aria-hidden />
                  </li>
                )
              })}
              <li className={classNames(cls.featureCard, { [cls.featureCardCta]: true }, [])}>
                <a
                  href="https://www.trafsaf.ru/"
                  target="_blank"
                  rel="noreferrer"
                  className={classNames(cls.featureCardCtaLink, {}, [])}
                >
                  <div className={classNames(cls.featureCtaContent, {}, [])}>
                    <div className={classNames(cls.featureHead, {}, [])}>
                      <h4 className={classNames(cls.featureCtaTitle, {}, [])}>Проектирование ОДД</h4>
                      <ArrowRight className={classNames(cls.ctaIconNumber, {}, [])} strokeWidth={2} />
                    </div>
                    <span className={classNames(cls.featureCtaText, {}, [])}>
                      Переход на внешний ресурс по тематике проектирования организации дорожного движения.
                    </span>
                  </div>
                </a>
              </li>
            </>
          </ul>
        </div>
      </div>
    </section>
  );
};
