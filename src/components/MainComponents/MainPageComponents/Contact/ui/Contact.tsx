import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import cls from './Contact.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import ContactPhoto from '../../../../../shared/assets/images/contact.jpg';
import { contacts, TITLE } from '../model/contacts';

interface IContactProps {
  className?: string;
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const smoothstep = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};

interface IContactItemProps {
  label: string;
  value: string;
  href: string;
  index: number;
  expand: MotionValue<number>;
}

const ContactItem = ({ label, value, href, index, expand }: IContactItemProps) => {
  const reveal = useTransform(expand, (e) =>
    smoothstep((e - (0.55 + index * 0.05)) / 0.4),
  );
  const opacity = reveal;
  const y = useTransform(reveal, (v) => `${(1 - v) * 22}px`);

  return (
    <motion.a
      target='_blank'
      className={cls.item}
      href={href}
      style={{ opacity, y }}
      aria-label={`${label}: ${value}`}
    >
      <span className={cls.itemValue}>{value}</span>
    </motion.a>
  );
};

export const Contact = ({ className }: IContactProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const expand = useTransform(scrollYProgress, (p) =>
    smoothstep((3 * p - 0.5) / 0.9),
  );

  const frameWidth = useTransform(expand, (e) => `${40 + 60 * e}%`);
  const frameHeight = useTransform(expand, (e) => `${12 + 88 * e}vh`);
  const imageY = useTransform(expand, (e) => `${(e - 0.5) * 8}vh`);
  const scrimOpacity = useTransform(expand, (e) => clamp((e - 0.28) / 0.5));

  const titleReveal = useTransform(expand, (e) => smoothstep((e - 0.5) / 0.42));
  const titleY = useTransform(titleReveal, (v) => `${(1 - v) * 115}%`);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-label="Контакты"
    >
      <div className={cls.sticky}>
        <motion.figure
          className={cls.media}
          style={{ width: frameWidth, height: frameHeight }}
        >
          <motion.img src={ContactPhoto} alt="Александра Еркеева" style={{ y: imageY }} />
          <motion.span
            className={cls.scrim}
            style={{ opacity: scrimOpacity }}
            aria-hidden="true"
          />
        </motion.figure>

        <div className={cls.content}>
          <div className={cls.titleMask}>
            <motion.h2 className={cls.title} style={{ y: titleY }}>
              {TITLE}
            </motion.h2>
          </div>

          <div className={cls.contacts}>
            {contacts.map((item, i) => (
              <ContactItem
                key={item.label}
                index={i}
                label={item.label}
                value={item.value}
                href={item.href}
                expand={expand}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
