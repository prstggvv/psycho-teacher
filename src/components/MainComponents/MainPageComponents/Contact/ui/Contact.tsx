import { motion, type Variants } from 'framer-motion';
import cls from './Contact.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE, createStaggerContainer } from '../../../../../shared/lib/motion';
import ContactPhoto from '../../../../../shared/assets/images/contact.jpg';

interface IContactProps {
  className?: string;
}

// Contact details — edit here, the markup reads from these values.
const PHONE_DISPLAY = '+7 978 005 252';
const PHONE_HREF = 'tel:+7978005252';
const EMAIL = 'erkeeva.sport@gmail.com';

// Title reveals line by line, each sliding up from behind a mask.
const titleGroup: Variants = createStaggerContainer(0.14, 0.05);

const titleLine: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: MOTION_EASE } },
};

// The divider grows out from the left.
const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: MOTION_EASE } },
};

// The photo settles in from a gentle zoom.
const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: MOTION_EASE } },
};

// Rows cascade, each releasing its label and value in turn.
const rowsGroup: Variants = createStaggerContainer(0.12, 0.1);

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: MOTION_EASE } },
};

const valueVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: MOTION_EASE } },
};

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 3 11 14" />
    <path d="M22 3 15 21l-4-7-7-4 18-7z" />
  </svg>
);

export const Contact = ({ className }: IContactProps) => {
  return (
    <section id="contact" className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <header className={classNames(cls.header, {}, [])}>
          <motion.h2
            className={classNames(cls.title, {}, [])}
            variants={titleGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <span className={classNames(cls.titleMask, {}, [])}>
              <motion.span className={classNames(cls.titleInner, {}, [])} variants={titleLine}>
                Будем
              </motion.span>
            </span>
            <span className={classNames(cls.titleMask, {}, [])}>
              <motion.span className={classNames(cls.titleInner, {}, [])} variants={titleLine}>
                <em>на связи</em>
              </motion.span>
            </span>
          </motion.h2>

          <motion.hr
            className={classNames(cls.divider, {}, [])}
            variants={dividerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          />
        </header>

        <motion.div
          className={classNames(cls.photo, {}, [])}
          variants={photoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <img src={ContactPhoto} alt="Александра Еркеева" />
        </motion.div>

        <motion.div
          className={classNames(cls.rows, {}, [])}
          variants={rowsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.div className={classNames(cls.row, {}, [])} variants={rowVariants}>
            <motion.span className={classNames(cls.label, {}, [])} variants={labelVariants}>
              Телефон
            </motion.span>
            <motion.span className={classNames(cls.value, {}, [])} variants={valueVariants}>
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            </motion.span>
          </motion.div>

          <motion.div className={classNames(cls.row, {}, [])} variants={rowVariants}>
            <motion.span className={classNames(cls.label, {}, [])} variants={labelVariants}>
              Почта
            </motion.span>
            <motion.span className={classNames(cls.value, {}, [])} variants={valueVariants}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </motion.span>
          </motion.div>

          <motion.div className={classNames(cls.row, {}, [])} variants={rowVariants}>
            <motion.span className={classNames(cls.label, {}, [])} variants={labelVariants}>
              Соцсети
            </motion.span>
            <motion.div className={classNames(cls.value, {}, [cls.socials])} variants={valueVariants}>
              <a
                className={classNames(cls.socBtn, {}, [])}
                href="#"
                aria-label="Telegram"
                tabIndex={0}
              >
                <TelegramIcon />
                Telegram
              </a>
              <a
                className={classNames(cls.socBtn, {}, [])}
                href="#"
                aria-label="ВКонтакте"
                tabIndex={0}
              >
                <span className={classNames(cls.socVk, {}, [])}>VK</span>
                ВКонтакте
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
