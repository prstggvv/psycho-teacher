import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import cls from './Education.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  fadeUp,
  itemReveal,
  createStaggerContainer,
  VIEWPORT_ONCE,
} from '../../../../../shared/lib/motion';
import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';

interface IEducationProps {
  className?: string;
}

type MetaIcon = 'org' | 'fed' | 'date' | 'psych';

interface IMetaRow {
  icon?: MetaIcon;
  code?: boolean;
  text: string;
}

type CardSpan = 'wide' | 'full';

interface IEduCard {
  year: string;
  noYear?: boolean;
  kind: string;
  title: string;
  span?: CardSpan;
  meta: IMetaRow[];
}

interface ITeacher {
  id: string;
  kicker: string;
  name: string;
  avatar: string;
  cards: IEduCard[];
}

const TEACHERS: ITeacher[] = [
  {
    id: 'a',
    kicker: 'Тренер',
    name: 'Александра',
    avatar: sashaPhoto,
    cards: [
      {
        year: '2021',
        kind: 'Бакалавриат',
        title: 'Физическая культура',
        span: 'wide',
        meta: [
          { code: true, text: '49.03.01' },
          { icon: 'org', text: 'ПГУФКСиТ' },
          { icon: 'date', text: '7 июля 2021' },
        ],
      },
      {
        year: '2022',
        kind: 'Курс RTF',
        title: 'Entry Level Coaches Course: Play Tennis & Tennis 10’s',
        meta: [
          { icon: 'fed', text: 'Федерация тенниса России' },
          { icon: 'date', text: '30 мая 2022' },
        ],
      },
      {
        year: '—',
        noYear: true,
        kind: 'Квалификация',
        title: 'RTF Level 1 — слушатель',
        meta: [{ icon: 'fed', text: 'Федерация тенниса России' }],
      },
      {
        year: '—',
        noYear: true,
        kind: 'Магистратура',
        title: 'Спорт',
        span: 'wide',
        meta: [
          { code: true, text: '49.04.03' },
          { icon: 'org', text: 'ПГУФКСиТ' },
        ],
      },
      {
        year: '2025',
        kind: 'Переподготовка',
        title: 'Психолог-консультант',
        span: 'full',
        meta: [
          { icon: 'psych', text: 'Спортивная психология' },
          { icon: 'date', text: '20 февраля 2025' },
        ],
      },
    ],
  },
  {
    id: 'e',
    kicker: 'Тренер',
    name: 'Эрнест',
    avatar: ernestPhoto,
    cards: [
      {
        year: '2009',
        kind: 'Высшее',
        title: 'Высшее образование',
        span: 'wide',
        meta: [{ icon: 'org', text: 'РГУФКСиТ' }],
      },
      {
        year: '2022',
        kind: 'Курс RTF',
        title: 'Entry Level Coaches Course: Play Tennis & Tennis 10s',
        meta: [{ icon: 'fed', text: 'Федерация тенниса России' }],
      },
      {
        year: '2023',
        kind: 'Курс RTF',
        title: 'Level 1 Coaches Course: Coaching Beginner and Intermediate Players',
        span: 'full',
        meta: [
          { icon: 'fed', text: 'Федерация тенниса России' },
          { icon: 'date', text: '1 мая 2023' },
        ],
      },
    ],
  },
];

const MetaIconSvg = ({ icon }: { icon: MetaIcon }) => {
  if (icon === 'org') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 10-10-5L2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    );
  }

  if (icon === 'fed') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 9a6 6 0 0 0 12 0M6 9V4h12v5M8 21h8m-4-4v4" />
      </svg>
    );
  }

  if (icon === 'psych') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
};

const cardStagger = createStaggerContainer(0.12);

export const Education = ({ className }: IEducationProps) => {
  const [activeId, setActiveId] = useState(TEACHERS[0].id);

  const activeTeacher = useMemo(
    () => TEACHERS.find((teacher) => teacher.id === activeId) ?? TEACHERS[0],
    [activeId],
  );

  const handleSelect = (id: string) => () => {
    setActiveId(id);
  };

  const handleKeyDown = (id: string) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActiveId(id);
  };

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <TitleSecondPage
          title='Дипломы и квалификация'
          subtitle='Выберите тренера, чтобы посмотреть его образование, курсы и сертификаты.'
          isWhite={false}
        />

        <motion.div
          className={classNames(cls.tabs, {}, [])}
          role="tablist"
          aria-label="Выбор тренера"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {TEACHERS.map((teacher) => {
            const isActive = teacher.id === activeId;

            return (
              <button
                key={teacher.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Образование тренера ${teacher.name}`}
                tabIndex={0}
                className={classNames(cls.tab, { [cls.tabActive]: isActive }, [])}
                onClick={handleSelect(teacher.id)}
                onKeyDown={handleKeyDown(teacher.id)}
              >
                <span className={classNames(cls.av, {}, [])}>
                  <img src={teacher.avatar} alt={teacher.name} />
                </span>
                <span className={classNames(cls.tabMeta, {}, [])}>
                  <span className={classNames(cls.kicker, {}, [])}>{teacher.kicker}</span>
                  <span className={classNames(cls.nm, {}, [])}>{teacher.name}</span>
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          className={classNames(cls.counter, {}, [])}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <span className={classNames(cls.num, {}, [])}>{activeTeacher.cards.length}</span>
          <span className={classNames(cls.lbl, {}, [])}>
            документов · {activeTeacher.name}
          </span>
        </motion.div>

        <motion.ul
          key={activeTeacher.id}
          className={classNames(cls.grid, {}, [])}
          variants={cardStagger}
          initial="hidden"
          animate="visible"
        >
          {activeTeacher.cards.map((card) => (
            <motion.li
              key={card.title}
              className={classNames(cls.card, {
                [cls.wide]: card.span === 'wide',
                [cls.full]: card.span === 'full',
              }, [])}
              variants={itemReveal}
            >
              <div className={classNames(cls.cardHead, {}, [])}>
                <span className={classNames(cls.kind, {}, [])}>{card.kind}</span>
                {!card.noYear ? (
                  <span className={classNames(cls.year, {}, [])}>{card.year}</span>
                ) : null}
              </div>

              <h3 className={classNames(cls.cardTitle, {}, [])}>{card.title}</h3>

              <div className={classNames(cls.meta, {}, [])}>
                {card.meta.map((row) => (
                  <div
                    key={row.text}
                    className={classNames(cls.row, { [cls.code]: !!row.code }, [])}
                  >
                    {row.icon ? <MetaIconSvg icon={row.icon} /> : null}
                    {row.text}
                  </div>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
