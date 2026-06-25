import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type MotionStyle,
} from 'framer-motion';
import cls from './Contact.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import ContactPhoto from '../../../../../shared/assets/images/contact.jpg';

interface IContactProps {
  className?: string;
}

const PHONE_DISPLAY = '+7 978 005 252';
const PHONE_HREF = 'tel:+7978005252';
const EMAIL = 'erkeeva.sport@gmail.com';

const TITLE = 'СВЯЖЕМСЯ';

const LETTERS_START = 0.46;
const LETTERS_END = 0.72;

const CONTACTS_START = 0.74;
const CONTACTS_END = 1;

const contacts: { label: string; value: string; href: string }[] = [
  { label: 'Телефон', value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: 'Почта', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Telegram', value: '@erkeeva', href: '#' },
  { label: 'ВКонтакте', value: 'erkeeva.sport', href: '#' },
];

interface ILetterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Letter = ({ char, progress, range }: ILetterProps) => {
  const y = useTransform(progress, range, ['120%', '0%']);
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={classNames(cls.letterMask, {}, [])}>
      <motion.span className={classNames(cls.letter, {}, [])} style={{ y, opacity }}>
        {char}
      </motion.span>
    </span>
  );
};

interface IContactItemProps {
  label: string;
  value: string;
  href: string;
  index: number;
  progress: MotionValue<number>;
}

const ContactItem = ({ label, value, href, index, progress }: IContactItemProps) => {
  const span = (CONTACTS_END - CONTACTS_START) / contacts.length;
  const start = CONTACTS_START + index * span;
  const end = Math.min(CONTACTS_END, start + span * 1.6);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);

  return (
    <motion.a
      className={classNames(cls.item, {}, [])}
      href={href}
      style={{ opacity, y }}
      aria-label={`${label}: ${value}`}
    >
      <span className={classNames(cls.itemLabel, {}, [])}>
        <span className={classNames(cls.itemIndex, {}, [])}>0{index + 1}</span>
        {label}
      </span>
      <span className={classNames(cls.itemValue, {}, [])}>{value}</span>
    </motion.a>
  );
};

export const Contact = ({ className }: IContactProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Photo morphs from an upward arch (dome) into a full-width rectangle that
  // then stays in place — fed into the CSS var --p (0 → 1). It never fades.
  const shape = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const photoStyle = { '--p': shape } as MotionStyle;

  // Distribute each title letter's reveal across the title timeline.
  const span = (LETTERS_END - LETTERS_START) / TITLE.length;
  const letters = Array.from(TITLE).map((char, i) => {
    const start = LETTERS_START + i * span;
    const end = Math.min(LETTERS_END, start + span * 2);
    return { char, range: [start, end] as [number, number] };
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-label="Контакты"
    >
      <div className={classNames(cls.sticky, {}, [])}>
        <div className={classNames(cls.stage, {}, [])}>
          <motion.figure className={classNames(cls.media, {}, [])} style={photoStyle}>
            <img src={ContactPhoto} alt="Александра Еркеева" />
            <span className={classNames(cls.scrim, {}, [])} aria-hidden="true" />
          </motion.figure>

          <div className={classNames(cls.content, {}, [])}>
            <h2 className={classNames(cls.title, {}, [])}>
              {letters.map((item, i) => (
                <Letter
                  key={i}
                  char={item.char}
                  progress={scrollYProgress}
                  range={item.range}
                />
              ))}
            </h2>

            <div className={classNames(cls.contacts, {}, [])}>
              {contacts.map((item, i) => (
                <ContactItem
                  key={item.label}
                  index={i}
                  label={item.label}
                  value={item.value}
                  href={item.href}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
