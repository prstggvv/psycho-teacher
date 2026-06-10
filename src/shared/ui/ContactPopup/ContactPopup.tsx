import type { ChangeEvent, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cls from './ContactPopup.module.css';
import { classNames } from '../../lib/classNames/classNames';
import type { ContactFormState } from '../../../types';
import { Link } from 'react-router-dom';

interface ContactPopupProps {
  isOpen: boolean;
  values: ContactFormState;
  canSubmit: boolean;
  isSubmitted: boolean;
  isLoading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

export const ContactPopup = ({
  isOpen,
  values,
  canSubmit,
  isSubmitted,
  isLoading = false,
  error = null,
  onClose,
  onSubmit,
  onNameChange,
  onPhoneChange,
}: ContactPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div className={classNames(cls.root, {}, [])}>
          <motion.div
            className={classNames(cls.overlay, {}, [])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />

          <motion.div
            className={classNames(cls.shell, {}, [])}
            initial={{ y: -80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -48, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
          >
            <motion.span
              className={classNames(cls.line, {}, [])}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className={classNames(cls.content, {}, [])}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className={classNames(cls.head, {}, [])} variants={itemVariants}>
                <h2 id="contact-popup-title" className={classNames(cls.title, {}, [])}>
                  Оставить заявку
                </h2>
                <button type="button" className={classNames(cls.closeButton, {}, [])} onClick={onClose} aria-label="Закрыть">
                  <span className={classNames(cls.closeLine, {}, [])} />
                  <span className={classNames(cls.closeLine, {}, [])} />
                </button>
              </motion.div>

              <motion.form className={classNames(cls.form, {}, [])} onSubmit={onSubmit} variants={contentVariants}>
                <motion.label className={classNames(cls.field, {}, [])} variants={itemVariants}>
                  <span className={classNames(cls.label, {}, [])}>Ваше имя</span>
                  <input
                    className={classNames(cls.input, {}, [])}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={values.name}
                    onChange={(e) => onNameChange(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </motion.label>

                <motion.label className={classNames(cls.field, {}, [])} variants={itemVariants}>
                  <span className={classNames(cls.label, {}, [])}>Телефон</span>
                  <input
                    className={classNames(cls.input, {}, [])}
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={values.phone}
                    onChange={onPhoneChange}
                    autoComplete="tel"
                    required
                  />
                </motion.label>

                <motion.p className={classNames(cls.policy, {}, [])} variants={itemVariants}>
                  Отправляя заявку, вы соглашаетесь с{' '}
                  <Link to='/policy' className={classNames(cls.policyLink, {}, [])}>
                    политикой конфиденциальности
                  </Link>
                </motion.p>

                <motion.div className={classNames(cls.footer, {}, [])} variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className={classNames(cls.submitButton, { [cls.submitButtonDisabled]: !canSubmit || isLoading }, [])}
                    disabled={!canSubmit || isLoading}
                    whileHover={canSubmit && !isLoading ? { scale: 1.03, filter: 'brightness(1.04)' } : undefined}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {isLoading ? 'Отправка…' : 'Отправить'}
                  </motion.button>
                </motion.div>

                {error ? (
                  <motion.div
                    className={classNames(cls.errorMsg, {}, [])}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {error}
                  </motion.div>
                ) : null}

                {isSubmitted ? (
                  <motion.div
                    className={classNames(cls.success, {}, [])}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Заявка принята. Мы свяжемся с вами в ближайшее время.
                  </motion.div>
                ) : null}
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
