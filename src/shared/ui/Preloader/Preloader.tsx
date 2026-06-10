import cls from './Preloader.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface IPreloaderProps {
  isActive: boolean;
  className?: string;
}

export const Preloader = ({ isActive, className }: IPreloaderProps) => {
  return (
    <div
      className={classNames(cls.preloader, { [cls.preloaderActive]: isActive }, [className ?? ''])}
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
    >
      <div className={cls.compass} aria-hidden="true">
        <span className={cls.pulse} />
        <span className={cls.pulse} />
        <span className={cls.pulse} />
        <div className={cls.needle} />
        <div className={cls.hub} />
      </div>
    </div>
  );
};
