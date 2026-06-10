import cls from './Footer.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface FooterProps {
  className?: string;
}
export const Footer = ({ className }: FooterProps) => {
  return (
    <footer id="contact" className={classNames(cls.footer, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>

      </div>
    </footer>
  );
};
