import { motion } from 'framer-motion';
import cls from './BurgerButton.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface BurgerButtonProps {
  className?: string;
  variant?: 'dark' | 'light';
  menuOpen: boolean;
  handleBurgerClick: () => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  controlsId?: string;
}

const transition = {
  duration: 0.28,
  ease: [0.22, 0.61, 0.36, 1] as const,
};

const BurgerButton = ({
  className,
  variant = 'dark',
  menuOpen,
  handleBurgerClick,
  handleKeyDown,
  controlsId = 'header-menu',
}: BurgerButtonProps) => {
  return (
    <button
      className={classNames(cls.button, { [cls.light]: variant === 'light' }, [className ?? ''])}
      aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={menuOpen}
      aria-controls={controlsId}
      onClick={handleBurgerClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <span className={classNames(cls.icon, {}, [])}>
        <motion.span
          className={classNames(cls.line, {}, [])}
          animate={menuOpen ? { rotate: 45, y: 7, width: 22 } : { rotate: 0, y: 0, width: 18 }}
          transition={transition}
        />
        <motion.span
          className={classNames(cls.line, {}, [])}
          animate={menuOpen ? { opacity: 0, x: 8, width: 22 } : { opacity: 1, x: 0, width: 24 }}
          transition={transition}
        />
        <motion.span
          className={classNames(cls.line, {}, [])}
          animate={menuOpen ? { rotate: -45, y: -7, width: 22 } : { rotate: 0, y: 0, width: 14 }}
          transition={transition}
        />
      </span>
    </button>
  );
};

export default BurgerButton;
