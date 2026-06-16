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
        <a className={classNames(cls.link, {}, [])} href="#" aria-label="Наверх" >
          <svg className={classNames(cls.svg, {}, [])} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="6 11 12 5 18 11" /></svg>
          Наверх
        </a >
        <p className={classNames(cls.text, {}, [])}>
          © 2026 Александра Еркеева
          < br />
          Все права защищены
        </p >
      </div >
    </footer >
  )
};
