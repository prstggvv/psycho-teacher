import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import cls from './WaySection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { fadeUp, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';

interface IWaySection {
  className?: string;
}

interface IPoint {
  x: number;
  y: number;
}

interface ITimelineItem {
  year: string;
  role: string;
  meta: string;
  point: IPoint;
  progress: number;
  side: 'left' | 'right';
}

const VIEWBOX_W = 100;
const VIEWBOX_H = 160;

const PATH_D =
  'M50 4 C50 10 28 10 28 16 C28 33 72 33 72 50 C72 67 28 67 28 84 C28 101 72 101 72 118 C72 134 28 134 28 150';

const TIMELINE: ITimelineItem[] = [
  {
    year: '2018 — 2020',
    role: 'Тренер по теннису, клуб Viccourt',
    meta: 'г. Евпатория',
    point: { x: 28, y: 16 },
    progress: 0.1,
    side: 'left',
  },
  {
    year: 'Июнь — июль 2019',
    role: 'Тренер Федерации тенниса России',
    meta: 'Международный детский центр «Артек»',
    point: { x: 72, y: 50 },
    progress: 0.32,
    side: 'right',
  },
  {
    year: '2021 — 2024',
    role: 'Тренер Федерации тенниса Республики Татарстан',
    meta: 'Казанская академия тенниса · дети от 3 до 5 лет',
    point: { x: 28, y: 84 },
    progress: 0.52,
    side: 'left',
  },
  {
    year: '2023 — 2024',
    role: 'Тренер экспериментальных групп Республики Татарстан',
    meta: 'Казанская академия тенниса · дети 2013–2017 годов рождения',
    point: { x: 72, y: 118 },
    progress: 0.74,
    side: 'right',
  },
  {
    year: 'С 2024 — по сей день',
    role: 'Тренер теннисного клуба «Пироговский»',
    meta: 'Работаем здесь сейчас — приходите знакомиться',
    point: { x: 28, y: 150 },
    progress: 0.96,
    side: 'left',
  },
];

interface ICourtNodeProps {
  point: IPoint;
  progress: number;
  scrollYProgress: MotionValue<number>;
}

const CourtNode = ({ point, progress, scrollYProgress }: ICourtNodeProps) => {
  const opacity = useTransform(scrollYProgress, [progress - 0.09, progress], [0.18, 1]);
  const ringOpacity = useTransform(scrollYProgress, [progress - 0.09, progress], [0, 0.55]);

  return (
    <g>
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={5}
        className={classNames(cls.nodeRing, {}, [])}
        style={{ opacity: ringOpacity }}
      />
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={2.4}
        className={classNames(cls.node, {}, [])}
        style={{ opacity }}
      />
    </g>
  );
};

const cardVariants = {
  hidden: (side: 'left' | 'right') => ({
    opacity: 0,
    x: side === 'left' ? -44 : 44,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.36, 1] as const },
  },
};

export const WaySection = ({ className }: IWaySection) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.78', 'end 0.62'],
  });

  const ballDistance = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <TitleSecondPage
          title='Путь на корте'
          subtitle='Семь лет тренерской работы — от детских лагерей Крыма до академий и
            клубов.'
          isWhite={true}
        />

        <div ref={trackRef} className={classNames(cls.track, {}, [])}>
          <div className={classNames(cls.court, {}, [])} aria-hidden="true">
            <span className={classNames(cls.courtSingleLeft, {}, [])} />
            <span className={classNames(cls.courtSingleRight, {}, [])} />
            <span className={classNames(cls.courtServiceTop, {}, [])} />
            <span className={classNames(cls.courtServiceBottom, {}, [])} />
            <span className={classNames(cls.courtCenter, {}, [])} />
            <span className={classNames(cls.courtNet, {}, [])} />
          </div>

          <svg
            className={classNames(cls.svg, {}, [])}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path d={PATH_D} className={classNames(cls.trajectoryGhost, {}, [])} />
            <motion.path
              d={PATH_D}
              className={classNames(cls.trajectory, {}, [])}
              style={{ pathLength: scrollYProgress }}
            />

            {TIMELINE.map((item) => (
              <CourtNode
                key={item.year}
                point={item.point}
                progress={item.progress}
                scrollYProgress={scrollYProgress}
              />
            ))}

            <motion.g
              style={{ offsetPath: `path("${PATH_D}")`, offsetDistance: ballDistance }}
            >
              <circle r={4.2} className={classNames(cls.ballGlow, {}, [])} />
              <circle r={2.6} className={classNames(cls.ball, {}, [])} />
              <path d="M-2.4 -1 Q0 1.4 2.4 -1" className={classNames(cls.ballSeam, {}, [])} />
            </motion.g>
          </svg>

          <ul className={classNames(cls.cards, {}, [])}>
            {TIMELINE.map((item) => (
              <motion.li
                key={item.year}
                className={classNames(cls.card, { [cls.cardRight]: item.side === 'right' }, [])}
                style={{ top: `${(item.point.y / VIEWBOX_H) * 100}%` }}
                custom={item.side}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
              >
                <span className={classNames(cls.year, {}, [])}>{item.year}</span>
                <span className={classNames(cls.role, {}, [])}>{item.role}</span>
                <span className={classNames(cls.meta, {}, [])}>{item.meta}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
