import cls from './Footer.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface IFooterProps {
  className?: string;
}

export const Footer = ({ className }: IFooterProps) => {
  return (
    <footer className={classNames(cls.footer, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <div className={classNames(cls.block, {}, [])}>
          <span className={classNames(cls.span, {}, [])}>АЕ</span>
          <span className={classNames(cls.spanSecond, {}, [])}>
            Александра Еркеева
            <small className={classNames(cls.small, {}, [])}>
              Спортивный психолог
            </small>
          </span>
        </div>
        <p className={classNames(cls.text, {}, [])}>
          © 2026 Александра Еркеева
          < br />
          Все права защищены
        </p >
      </div >
    </footer >
  )
};
